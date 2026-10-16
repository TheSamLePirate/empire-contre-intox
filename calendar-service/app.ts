import { watchAccounts, watchRevision, saveWatchAccount } from "./lives.ts";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { join } from "node:path";
import { RateLimiter } from "../counter/lib.ts";
import { Store, type UserRow, type AvatarRow } from "./store.ts";
import {
  Problem,
  object,
  password,
  login,
  revision,
  text,
} from "./validation.ts";
import { saveAvatar, MAX_IMAGE_BYTES } from "./images.ts";

const PREFIX = "/api/calendar";
const SESSION_MS = 8 * 60 * 60 * 1000;
const COOKIE = "eci_calendar_session";
const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex");
const random = () => randomBytes(32).toString("base64url");
interface Session {
  hash: string;
  user_id: string;
  csrf: string;
  expires: number;
}
export interface AppOptions {
  store: Store;
  publicOrigin: string;
  uploadsDir: string;
  secureCookies?: boolean;
  now?: () => number;
  internalToken?: string;
  liveStatus?: () => Promise<unknown>;
}
export async function createApp(options: AppOptions) {
  const { store, uploadsDir } = options;
  const origin = new URL(options.publicOrigin).origin;
  const local = ["127.0.0.1", "localhost", "[::1]"].includes(
    new URL(origin).hostname,
  );
  if (!local && !origin.startsWith("https://"))
    throw new Error("HTTPS requis hors développement local.");
  if (options.secureCookies === false && !local)
    throw new Error("Cookies non sécurisés interdits en production.");
  const secure = options.secureCookies ?? !local;
  const now = options.now ?? Date.now;
  const limiter = new RateLimiter({ maxPerClient: 240, maxGlobal: 6000 });
  const logins = new RateLimiter({
    windowMs: 15 * 60 * 1000,
    maxPerClient: 10,
    maxGlobal: 300,
    maxTrackedClients: 10000,
  });
  const names = new RateLimiter({
    windowMs: 15 * 60 * 1000,
    maxPerClient: 15,
    maxGlobal: 300,
    maxTrackedClients: 10000,
  });
  const uploads = new RateLimiter({
    windowMs: 60 * 60 * 1000,
    maxPerClient: 20,
    maxGlobal: 200,
    maxTrackedClients: 10000,
  });
  const dummyHash = await Bun.password.hash(random(), {
    algorithm: "argon2id",
    memoryCost: 65536,
    timeCost: 3,
  });
  let processingImages = 0,
    signingIn = 0,
    lastSweep = 0;
  function sweep() {
    if (now() - lastSweep < 60000) return;
    lastSweep = now();
    for (const l of [limiter, logins, names, uploads]) l.sweep(now());
    store.run("DELETE FROM sessions WHERE expires<=?", now());
  }
  function json(data: unknown, status = 200, headers: HeadersInit = {}) {
    return Response.json(data, {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        ...headers,
      },
    });
  }
  function cookie(value: string, age = SESSION_MS / 1000) {
    return `${COOKIE}=${value}; Path=${PREFIX}/; HttpOnly; SameSite=Strict; Max-Age=${age}${secure ? "; Secure" : ""}`;
  }
  function requireOrigin(req: Request) {
    if (req.headers.get("origin") !== origin)
      throw new Problem(403, "Origine de la requête refusée.");
  }
  function identity(req: Request) {
    const token = req.headers
      .get("cookie")
      ?.split(";")
      .map((v) => v.trim())
      .find((v) => v.startsWith(`${COOKIE}=`))
      ?.slice(COOKIE.length + 1);
    if (!token || !/^[a-zA-Z0-9_-]{43}$/.test(token))
      throw new Problem(401, "Connectez-vous pour modifier le calendrier.");
    const session = store.one<Session>(
      "SELECT * FROM sessions WHERE hash=? AND expires>?",
      digest(token),
      now(),
    );
    if (!session) throw new Problem(401, "Session expirée. Reconnectez-vous.");
    const user = store.user(session.user_id);
    if (!user?.active) throw new Problem(401, "Compte désactivé.");
    return { user, session };
  }
  async function bytes(req: Request, max: number) {
    if (Number(req.headers.get("content-length")) > max)
      throw new Problem(413, "Requête trop volumineuse.");
    const reader = req.body?.getReader();
    if (!reader) return new Uint8Array();
    const chunks: Uint8Array[] = [];
    let length = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > max) {
          await reader.cancel();
          throw new Problem(413, "Requête trop volumineuse.");
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    return Buffer.concat(chunks);
  }
  async function body(req: Request) {
    if (!req.headers.get("content-type")?.startsWith("application/json"))
      throw new Problem(415, "Contenu JSON attendu.");
    const raw = await bytes(req, 16384);
    try {
      return object(JSON.parse(new TextDecoder().decode(raw)));
    } catch (error) {
      if (error instanceof Problem) throw error;
      throw new Problem(400, "JSON invalide.");
    }
  }
  function quota(l: RateLimiter, key: string) {
    if (!l.check(key, now()).allowed)
      throw new Problem(429, "Trop de tentatives. Réessayez plus tard.");
  }
  async function fetch(req: Request): Promise<Response> {
    try {
      sweep();
      const url = new URL(req.url),
        path = url.pathname.slice(PREFIX.length);
      if (!url.pathname.startsWith(`${PREFIX}/`))
        throw new Problem(404, "Route introuvable.");
      if (path === "/health" && req.method === "GET") return json({ ok: true });
      if (path === "/internal/live-watch" && req.method === "GET") {
        const token = options.internalToken;
        const supplied = req.headers.get("authorization") ?? "";
        if (!token || digest(supplied) !== digest(`Bearer ${token}`)) throw new Problem(404, "Route introuvable.");
        const etag = `"${watchRevision(store)}"`;
        if (req.headers.get("if-none-match") === etag) return new Response(null, {status:304, headers:{ETag:etag}});
        return json({accounts:watchAccounts(store), revision:watchRevision(store)}, 200, {ETag:etag});
      }
      quota(limiter, (req.headers.get("x-real-ip") || "direct").slice(0, 128));
      if (
        req.method === "OPTIONS" &&
        (path === "/public" || /^\/media\/[a-zA-Z0-9_-]{1,80}$/.test(path))
      )
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "Cache-Control, If-None-Match",
            "Access-Control-Max-Age": "600",
          },
        });
      if (path === "/public" && req.method === "GET")
        return json(store.export(origin), 200, {
          "Access-Control-Allow-Origin": "*",
        });
      const media = /^\/media\/([a-zA-Z0-9_-]{1,80})$/.exec(path);
      if (media && ["GET", "HEAD"].includes(req.method)) {
        const avatar = store.one<AvatarRow>(
          "SELECT * FROM avatars WHERE id=?",
          media[1],
        );
        if (!avatar || avatar.path !== `${PREFIX}/media/${avatar.id}`)
          throw new Problem(404, "Image introuvable.");
        const file = Bun.file(join(uploadsDir, `${avatar.id}.webp`));
        if (!(await file.exists()))
          throw new Problem(404, "Image introuvable.");
        return new Response(req.method === "HEAD" ? null : file, {
          headers: {
            "Content-Type": "image/webp",
            "Cache-Control": "public, max-age=31536000, immutable",
            "Access-Control-Allow-Origin": "*",
            "X-Content-Type-Options": "nosniff",
            "Content-Security-Policy": "default-src 'none'; sandbox",
          },
        });
      }
      if (path === "/login" && req.method === "POST") {
        requireOrigin(req);
        quota(logins, (req.headers.get("x-real-ip") || "direct").slice(0, 128));
        const data = await body(req);
        const username = login(data.login);
        quota(names, username);
        if (signingIn >= 3)
          throw new Problem(
            429,
            "Connexions occupées. Réessayez dans un instant.",
          );
        const user = store.one<UserRow>(
          "SELECT * FROM users WHERE login=?",
          username,
        );
        const supplied =
          typeof data.password === "string" && data.password.length <= 128
            ? data.password
            : "";
        let valid = false;
        signingIn++;
        try {
          valid = await Bun.password.verify(
            supplied,
            user?.password_hash || dummyHash,
          );
        } finally {
          signingIn--;
        }
        // Re-read after password work: disabling/resetting a user must win a race with login.
        const latest = user ? store.user(user.id) : null;
        if (
          !valid ||
          !latest?.active ||
          latest.password_hash !== user?.password_hash
        )
          throw new Problem(401, "Identifiant ou mot de passe incorrect.");
        const token = random(),
          csrf = random();
        store.run(
          "INSERT INTO sessions VALUES(?,?,?,?)",
          digest(token),
          latest.id,
          csrf,
          now() + SESSION_MS,
        );
        store.run(
          "DELETE FROM sessions WHERE user_id=? AND hash NOT IN (SELECT hash FROM sessions WHERE user_id=? ORDER BY expires DESC LIMIT 10)",
          latest.id,
          latest.id,
        );
        return json({ user: store.publicUser(latest), csrf }, 200, {
          "Set-Cookie": cookie(token),
        });
      }
      const { user, session } = identity(req);
      if (path === "/session" && req.method === "GET")
        return json({ user: store.publicUser(user), csrf: session.csrf });
      const mutating = !["GET", "HEAD"].includes(req.method);
      if (mutating) {
        requireOrigin(req);
        if (req.headers.get("x-csrf-token") !== session.csrf)
          throw new Problem(
            403,
            "Jeton de sécurité invalide. Rechargez la page.",
          );
      }
      if (path === "/logout" && req.method === "POST") {
        store.run("DELETE FROM sessions WHERE hash=?", session.hash);
        return json({ ok: true }, 200, { "Set-Cookie": cookie("", 0) });
      }
      if (path === "/password" && req.method === "POST") {
        quota(logins, `password:${user.id}`);
        const data = await body(req);
        const next = password(data.password);
        if (next === data.currentPassword)
          throw new Problem(400, "Choisissez un nouveau mot de passe.");
        if (
          !(await Bun.password.verify(
            typeof data.currentPassword === "string"
              ? data.currentPassword
              : "",
            user.password_hash,
          ))
        )
          throw new Problem(400, "Mot de passe actuel incorrect.");
        const hash = await Bun.password.hash(next, {
          algorithm: "argon2id",
          memoryCost: 65536,
          timeCost: 3,
        });
        store.atomic(() => {
          identity(req);
          const latest = store.user(user.id);
          if (!latest?.active || latest.password_hash !== user.password_hash)
            throw new Problem(409, "Compte modifié. Reconnectez-vous.");
          store.run(
            "UPDATE users SET password_hash=?,must_change=0 WHERE id=?",
            hash,
            user.id,
          );
          store.run("DELETE FROM sessions WHERE user_id=?", user.id);
        });
        return json({ ok: true }, 200, { "Set-Cookie": cookie("", 0) });
      }
      if (user.must_change)
        throw new Problem(
          403,
          "Changez votre mot de passe initial pour continuer.",
        );
      // Body decoding and image processing may yield while an admin revokes a session.
      function authorize() {
        const current = identity(req);
        if (current.session.hash !== session.hash || current.user.must_change)
          throw new Problem(401, "Session modifiée. Reconnectez-vous.");
        return current.user;
      }
      async function contentBody() {
        const value = await body(req);
        authorize();
        return value;
      }
      const watchRoute = /^\/live-watch(?:\/([a-zA-Z0-9_-]{1,80}))?$/.exec(path);
      if (watchRoute) {
        if (authorize().role !== "admin") throw new Problem(403, "Gestion réservée aux administrateurs.");
        if (!watchRoute[1] && req.method === "GET") {
          let runtime: unknown = null;
          try { runtime = await options.liveStatus?.(); } catch { /* The calendar remains usable if the worker is down. */ }
          if (authorize().role !== "admin") throw new Problem(403, "Gestion réservée aux administrateurs.");
          return json({accounts:watchAccounts(store), revision:watchRevision(store), runtime});
        }
        if ((!watchRoute[1] && req.method === "POST") || (watchRoute[1] && ["PUT", "DELETE"].includes(req.method))) {
          const data = await contentBody();
          if (authorize().role !== "admin") throw new Problem(403, "Gestion réservée aux administrateurs.");
          return json(saveWatchAccount(store, watchRoute[1] ?? null, data, user.login, req.method === "DELETE"), req.method === "POST" ? 201 : 200);
        }
        throw new Problem(405, "Méthode non autorisée.");
      }
      if (path === "/state" && req.method === "GET")
        return json({
          events: store.events(),
          hosts: store.hosts(),
          avatars: store.avatars(origin),
        });
      if (path === "/events" && req.method === "POST")
        return json(
          store.saveEvent(null, await contentBody(), user.login),
          201,
        );
      const event =
        /^\/events\/([a-zA-Z0-9_-]{1,80})(?:\/(history|restore))?$/.exec(path);
      if (event) {
        const [, id, action] = event;
        if (action === "history" && req.method === "GET")
          return json(store.history(id));
        if (action === "restore" && req.method === "POST") {
          const data = await contentBody();
          return json(
            store.restore(id, data.version, data.historyId, user.login),
          );
        }
        if (!action && req.method === "PUT")
          return json(store.saveEvent(id, await contentBody(), user.login));
        if (!action && req.method === "DELETE") {
          const data = await contentBody();
          return json(store.deleteEvent(id, data.version, user.login));
        }
      }
      if (path === "/hosts" && req.method === "POST")
        return json(store.saveHost(null, await contentBody()), 201);
      const host = /^\/hosts\/([a-zA-Z0-9_-]{1,80})$/.exec(path);
      if (host && req.method === "PUT")
        return json(store.saveHost(host[1], await contentBody()));
      if (host && req.method === "DELETE") {
        const data = await contentBody();
        store.deleteHost(host[1], data.version);
        return json({ ok: true });
      }
      if (path === "/avatars" && req.method === "POST") {
        quota(uploads, user.id);
        if (processingImages >= 2)
          throw new Problem(
            429,
            "Import d'images occupé. Réessayez dans un instant.",
          );
        const type = req.headers.get("content-type") || "";
        if (!type.startsWith("multipart/form-data;"))
          throw new Problem(415, "Formulaire d'image attendu.");
        const content = await bytes(req, MAX_IMAGE_BYTES + 16384);
        let form: FormData;
        try {
          form = await new Response(content, {
            headers: { "Content-Type": type },
          }).formData();
        } catch {
          throw new Problem(400, "Formulaire illisible.");
        }
        const file = form.get("file");
        if (!(file instanceof File)) throw new Problem(400, "Image manquante.");
        processingImages++;
        try {
          const id = await saveAvatar(
            store,
            uploadsDir,
            file,
            form.get("label"),
            user.id,
            authorize,
          );
          return json(
            store.avatars(origin).find((a) => a.id === id),
            201,
          );
        } finally {
          processingImages--;
        }
      }
      if (path.startsWith("/users")) {
        if (user.role !== "admin")
          throw new Problem(
            403,
            "Gestion des comptes réservée aux administrateurs.",
          );
        if (path === "/users" && req.method === "GET")
          return json(
            store
              .all<UserRow>("SELECT * FROM users ORDER BY login")
              .map((u) => store.publicUser(u)),
          );
        if (path === "/users" && req.method === "POST") {
          const data = await body(req);
          const username = login(data.login),
            secret = password(data.password);
          const displayName = text(
            data.displayName ?? username,
            "Nom affiché",
            80,
          );
          if (data.role !== "admin" && data.role !== "user")
            throw new Problem(400, "Rôle invalide.");
          if (data.active !== undefined && typeof data.active !== "boolean")
            throw new Problem(400, "État du compte invalide.");
          if (store.one("SELECT id FROM users WHERE login=?", username))
            throw new Problem(409, "Identifiant déjà utilisé.");
          const hash = await Bun.password.hash(secret, {
            algorithm: "argon2id",
            memoryCost: 65536,
            timeCost: 3,
          });
          const id = randomUUID();
          store.atomic(() => {
            if (authorize().role !== "admin")
              throw new Problem(403, "Droits administrateur révoqués.");
            if (store.one("SELECT id FROM users WHERE login=?", username))
              throw new Problem(409, "Identifiant déjà utilisé.");
            if (
              store.one<{ n: number }>("SELECT COUNT(*) n FROM users")!.n >= 500
            )
              throw new Problem(409, "Limite de comptes atteinte.");
            store.run(
              "INSERT INTO users(id,login,password_hash,role,active,display_name,must_change) VALUES(?,?,?,?,?,?,1)",
              id,
              username,
              hash,
              data.role as string,
              data.active === false ? 0 : 1,
              displayName,
            );
          });
          return json(store.publicUser(store.user(id)!), 201);
        }
        const target = /^\/users\/([a-zA-Z0-9_-]{1,80})$/.exec(path);
        if (target && req.method === "PUT") {
          const data = await body(req),
            id = target[1];
          const displayName =
            data.displayName === undefined
              ? null
              : text(data.displayName, "Nom affiché", 80);
          if (
            (data.role !== "admin" && data.role !== "user") ||
            typeof data.active !== "boolean"
          )
            throw new Problem(400, "Rôle ou état invalide.");
          const hash = data.password
            ? await Bun.password.hash(password(data.password), {
                algorithm: "argon2id",
                memoryCost: 65536,
                timeCost: 3,
              })
            : null;
          store.atomic(() => {
            const latest = authorize();
            if (!latest?.active || latest.role !== "admin")
              throw new Problem(403, "Droits administrateur révoqués.");
            const current = store.user(id);
            if (!current) throw new Problem(404, "Compte introuvable.");
            if (
              current.active &&
              current.role === "admin" &&
              (!data.active || data.role !== "admin") &&
              store.one<{ n: number }>(
                "SELECT COUNT(*) n FROM users WHERE active=1 AND role='admin'",
              )!.n <= 1
            )
              throw new Problem(
                409,
                "Conservez au moins un administrateur actif.",
              );
            store.run(
              "UPDATE users SET role=?,active=? WHERE id=?",
              data.role as string,
              data.active ? 1 : 0,
              id,
            );
            if (displayName !== null)
              store.run(
                "UPDATE users SET display_name=? WHERE id=?",
                displayName,
                id,
              );
            if (hash)
              store.run(
                "UPDATE users SET password_hash=?,must_change=1 WHERE id=?",
                hash,
                id,
              );
            store.run("DELETE FROM sessions WHERE user_id=?", id);
          });
          return json(store.publicUser(store.user(id)!));
        }
      }
      throw new Problem(404, "Route introuvable.");
    } catch (error) {
      if (error instanceof Problem)
        return json(
          { error: error.message },
          error.status,
          error.status === 429 ? { "Retry-After": "60" } : {},
        );
      console.error(
        "[calendar] Request failed",
        error instanceof Error ? error.name : "unknown",
      );
      return json({ error: "Erreur du serveur. Réessayez plus tard." }, 500);
    }
  }
  return { fetch, store };
}
export async function createUser(
  store: Store,
  username: string,
  secret: string,
  role: "admin" | "user" = "admin",
  displayName: string = username,
  mustChange = false,
) {
  username = login(username);
  secret = password(secret);
  displayName = text(displayName, "Nom affiché", 80);
  if (store.one("SELECT id FROM users WHERE login=?", username))
    throw new Problem(409, "Identifiant déjà utilisé.");
  const hash = await Bun.password.hash(secret, {
    algorithm: "argon2id",
    memoryCost: 65536,
    timeCost: 3,
  });
  const id = randomUUID();
  store.run(
    "INSERT INTO users(id,login,password_hash,role,display_name,must_change) VALUES(?,?,?,?,?,?)",
    id,
    username,
    hash,
    role,
    displayName,
    mustChange ? 1 : 0,
  );
  return store.publicUser(store.user(id)!);
}
