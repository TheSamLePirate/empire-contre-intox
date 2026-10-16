import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import {
  mkdtempSync,
  rmSync,
  readFileSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import sharp from "sharp";
import { Store } from "./store.ts";
import { createApp, createUser } from "./app.ts";

const root = mkdtempSync(join(tmpdir(), "eci-calendar-test-")),
  seed = resolve(import.meta.dir, "../empire-calendrier/data/events.json");
const origin = "http://127.0.0.1:8878",
  password = "Test initial très long 2026!";
let store: Store,
  app: Awaited<ReturnType<typeof createApp>>,
  clock = Date.now();
interface Client {
  cookie: string;
  csrf: string;
  user: { id: string; login: string; role: string; mustChange: boolean };
}
let admin: Client, alice: Client, bob: Client;
const json = (value: unknown) => ({
  "Content-Type": "application/json",
  body: JSON.stringify(value),
});
async function request(
  path: string,
  method = "GET",
  data?: unknown,
  client?: Client,
  extra: Record<string, string> = {},
) {
  const headers: Record<string, string> = { Origin: origin, ...extra };
  if (client) {
    headers.Cookie = client.cookie;
    headers["X-CSRF-Token"] = client.csrf;
  }
  let body: BodyInit | undefined;
  if (data instanceof FormData) body = data;
  else if (data !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  }
  return app.fetch(
    new Request(`${origin}/api/calendar${path}`, { method, headers, body }),
  );
}
async function signIn(login: string, secret = password): Promise<Client> {
  const res = await request("/login", "POST", { login, password: secret });
  expect(res.status).toBe(200);
  const data = await res.json();
  return { ...data, cookie: res.headers.get("set-cookie")!.split(";")[0]! };
}
beforeAll(async () => {
  store = new Store(join(root, "calendar.sqlite"), seed);
  for (const [name, role] of [
    ["sam", "admin"],
    ["alice", "user"],
    ["bob", "user"],
  ] as const)
    await createUser(store, name, password, role);
  app = await createApp({
    store,
    publicOrigin: origin,
    uploadsDir: join(root, "avatars"),
    now: () => clock,
  });
  admin = await signIn("sam");
  alice = await signIn("alice");
  bob = await signIn("bob");
});
afterAll(() => {
  store.db.close();
  rmSync(root, { recursive: true, force: true });
});

describe("calendrier partagé", () => {
  test("importe fidèlement les dates, horaires, titres, notes et liens sans exposer les comptes", async () => {
    const legacy = JSON.parse(readFileSync(seed, "utf8"));
    const res = await request("/public");
    expect(res.headers.get("access-control-allow-origin")).toBe("*");
    const out = await res.json();
    expect(Object.keys(out.months)).toEqual(Object.keys(legacy.months));
    expect(Object.keys(out.hosts)).toHaveLength(10);
    expect(store.events()).toHaveLength(23);
    for (const [month, value] of Object.entries(legacy.months) as [
      string,
      any,
    ][])
      for (const [day, values] of Object.entries(value.events)) {
        const expected = [values].flat() as any[],
          actual = [out.months[month].events[day]].flat();
        expect(actual.length).toBe(expected.length);
        for (let i = 0; i < expected.length; i++)
          for (const field of ["time", "title", "host", "note", "url"])
            expect(actual[i][field]).toBe(expected[i][field]);
      }
    expect(JSON.stringify(out)).not.toContain("password_hash");
    expect(JSON.stringify(out)).not.toContain("csrf");
    expect(out.hosts.Provoxys[0]).toBe(
      `${origin}/empire-calendrier/provoxys.jpeg`,
    );
    const preflight = await request(
      "/public",
      "OPTIONS",
      undefined,
      undefined,
      { Origin: "https://thesamlepirate.github.io" },
    );
    expect(preflight.status).toBe(204);
    expect(preflight.headers.get("access-control-allow-origin")).toBe("*");
    expect(
      preflight.headers.get("access-control-allow-credentials"),
    ).toBeNull();
  });
  test("refuse les visiteurs anonymes et les écritures sans origine ou sans CSRF", async () => {
    expect((await request("/state")).status).toBe(401);
    expect((await request("/hosts", "POST", { name: "Intrus" })).status).toBe(
      401,
    );
    const req = new Request(`${origin}/api/calendar/hosts`, {
      method: "POST",
      headers: { Cookie: alice.cookie, "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Intrus" }),
    });
    expect((await app.fetch(req)).status).toBe(403);
    expect(
      (
        await app.fetch(
          new Request(`${origin}/api/calendar/hosts`, {
            method: "POST",
            headers: {
              Origin: origin,
              Cookie: alice.cookie,
              "Content-Type": "application/json",
            },
            body: '{"name":"Intrus"}',
          }),
        )
      ).status,
    ).toBe(403);
    expect(
      (
        await request("/hosts", "POST", { name: "Intrus" }, alice, {
          Origin: "https://evil.example",
        })
      ).status,
    ).toBe(403);
  });
  let event: any, host: any;
  test("crée un animateur, détecte le doublon normalisé et conserve les horaires libres", async () => {
    const res = await request(
      "/hosts",
      "POST",
      { name: "Équipe Essai", avatarIds: [] },
      alice,
    );
    expect(res.status).toBe(201);
    host = await res.json();
    expect(
      (await request("/hosts", "POST", { name: "equipe-essai" }, bob)).status,
    ).toBe(409);
    const created = await request(
      "/events",
      "POST",
      {
        date: "2026-10-23",
        time: "21H00-22H00",
        title: "Essai collectif",
        hostIds: [host.id],
      },
      alice,
    );
    expect(created.status).toBe(201);
    event = await created.json();
    expect(event.time).toBe("21H00-22H00");
  });
  test("un second utilisateur peut modifier tous les événements et tous les animateurs", async () => {
    let response = await request(
      `/events/${event.id}`,
      "PUT",
      { ...event, title: "Modifié par Bob" },
      bob,
    );
    expect(response.status).toBe(200);
    event = await response.json();
    response = await request(
      `/hosts/${host.id}`,
      "PUT",
      { ...host, name: "Animateur modifié par Bob" },
      bob,
    );
    expect(response.status).toBe(200);
    host = await response.json();
    expect((await request("/users", "GET", undefined, bob)).status).toBe(403);
  });
  test("empêche les écrasements, les dates inexistantes et les liens actifs", async () => {
    expect(
      (
        await request(
          `/events/${event.id}`,
          "PUT",
          { ...event, version: event.version - 1 },
          alice,
        )
      ).status,
    ).toBe(409);
    for (const invalid of [
      { date: "2026-02-30" },
      { date: "2026-99-30" },
      { url: "javascript:alert(1)" },
      { url: "https://sam:secret@example.com" },
      { hostIds: ["unknown"] },
    ]) {
      expect(
        (await request("/events", "POST", { ...event, ...invalid }, bob))
          .status,
      ).toBe(400);
    }
    expect(
      (
        await request(
          `/hosts/${host.id}`,
          "PUT",
          { ...host, version: host.version - 1 },
          alice,
        )
      ).status,
    ).toBe(409);
  });
  test("restaure une ancienne version après suppression et protège les animateurs référencés", async () => {
    const history = await (
      await request(`/events/${event.id}/history`, "GET", undefined, alice)
    ).json();
    expect(history).toHaveLength(2);
    const deleted = await request(
      `/events/${event.id}`,
      "DELETE",
      { version: event.version },
      alice,
    );
    expect(deleted.status).toBe(200);
    event = await deleted.json();
    expect(
      (
        await request(
          `/hosts/${host.id}`,
          "DELETE",
          { version: host.version },
          bob,
        )
      ).status,
    ).toBe(409);
    const restored = await request(
      `/events/${event.id}/restore`,
      "POST",
      { version: event.version, historyId: history[1].id },
      bob,
    );
    expect(restored.status).toBe(200);
    event = await restored.json();
    expect(event.title).toBe("Essai collectif");
    expect(event.deleted).toBe(false);
    const out = await (await request("/public")).json();
    expect(out.months["2026-10"].events["23"].host).toBe(
      "Animateur modifié par Bob",
    );
  });
  test("décode et réencode un portrait, le réutilise et refuse les faux formats", async () => {
    const original = await sharp({
      create: { width: 800, height: 600, channels: 3, background: "#227766" },
    })
      .png()
      .toBuffer();
    const upload = (
      data: Uint8Array,
      name = "avatar.png",
      type = "image/png",
    ) => {
      const form = new FormData();
      form.set("file", new File([new Uint8Array(data)], name, { type }));
      form.set("label", "Portrait essai");
      return form;
    };
    const res = await request("/avatars", "POST", upload(original), alice);
    expect(res.status).toBe(201);
    const avatar = await res.json();
    const second = await request("/avatars", "POST", upload(original), bob);
    expect(second.status).toBe(201);
    expect((await second.json()).id).toBe(avatar.id);
    const media = await request(`/media/${avatar.id}`);
    expect(media.status).toBe(200);
    expect(media.headers.get("content-type")).toBe("image/webp");
    const metadata = await sharp(
      Buffer.from(await media.arrayBuffer()),
    ).metadata();
    expect(metadata.width).toBe(512);
    expect(metadata.height).toBe(512);
    expect(metadata.exif).toBeUndefined();
    const changed = await request(
      `/hosts/${host.id}`,
      "PUT",
      { ...host, avatarIds: [avatar.id] },
      bob,
    );
    expect(changed.status).toBe(200);
    host = await changed.json();
    const out = await (await request("/public")).json();
    expect(out.months["2026-10"].events["23"].avatar).toEqual([avatar.url]);
    expect(
      (
        await request(
          "/avatars",
          "POST",
          upload(
            new TextEncoder().encode('<svg onload="alert(1)"></svg>'),
            "fake.png",
          ),
          alice,
        )
      ).status,
    ).toBe(400);
    expect(
      (
        await request(
          "/avatars",
          "POST",
          upload(new Uint8Array([255, 216, 255, 0])),
          alice,
        )
      ).status,
    ).toBe(400);
    const oversized = await sharp({
      create: { width: 4100, height: 4100, channels: 3, background: "white" },
    })
      .png()
      .toBuffer();
    expect(
      (await request("/avatars", "POST", upload(oversized), alice)).status,
    ).toBe(400);
    expect(
      readdirSync(join(root, "avatars")).every((f) => f.endsWith(".webp")),
    ).toBe(true);
  });
  test("borne la taille réelle des requêtes même sans Content-Length", async () => {
    const req = new Request(`${origin}/api/calendar/hosts`, {
      method: "POST",
      headers: {
        Origin: origin,
        Cookie: alice.cookie,
        "X-CSRF-Token": alice.csrf,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "x".repeat(20000) }),
    });
    expect((await app.fetch(req)).status).toBe(413);
  });
  test("protège le dernier administrateur et interdit l’auto-promotion", async () => {
    const inactive = await request(
      "/users",
      "POST",
      { login: "inactif", password, role: "user", active: false },
      admin,
    );
    expect(inactive.status).toBe(201);
    expect((await inactive.json()).active).toBe(false);
    expect(
      (await request("/login", "POST", { login: "inactif", password })).status,
    ).toBe(401);
    expect(
      (
        await request(
          `/users/${admin.user.id}`,
          "PUT",
          { role: "user", active: true },
          admin,
        )
      ).status,
    ).toBe(409);
    expect(
      (
        await request(
          `/users/${admin.user.id}`,
          "PUT",
          { role: "admin", active: false },
          admin,
        )
      ).status,
    ).toBe(409);
    expect(
      (
        await request(
          `/users/${bob.user.id}`,
          "PUT",
          { role: "admin", active: true },
          bob,
        )
      ).status,
    ).toBe(403);
  });
  test("accepte la connexion par email et conserve un nom affiché distinct", async () => {
    const res = await request(
      "/users",
      "POST",
      {
        login: "Olivier.Veinand@example.test",
        displayName: "SamLePirate",
        password,
        role: "admin",
      },
      admin,
    );
    expect(res.status).toBe(201);
    const user = await res.json();
    expect(user.login).toBe("olivier.veinand@example.test");
    expect(user.displayName).toBe("SamLePirate");
    const client = await signIn("OLIVIER.VEINAND@example.test");
    expect(
      (await (await request("/session", "GET", undefined, client)).json()).user
        .displayName,
    ).toBe("SamLePirate");
    const changed = await request(
      `/users/${user.id}`,
      "PUT",
      { role: "admin", active: true, displayName: "Sam" },
      admin,
    );
    expect(changed.status).toBe(200);
    expect((await changed.json()).displayName).toBe("Sam");
    expect((await request("/state", "GET", undefined, client)).status).toBe(
      401,
    );
  });
  test("impose le changement du mot de passe initial et révoque toutes les sessions", async () => {
    const created = await request(
      "/users",
      "POST",
      { login: "nouveau", password, role: "user" },
      admin,
    );
    expect(created.status).toBe(201);
    const user = await created.json();
    expect(user.mustChange).toBe(true);
    const first = await signIn("nouveau"),
      second = await signIn("nouveau");
    expect((await request("/state", "GET", undefined, first)).status).toBe(403);
    const change = await request(
      "/password",
      "POST",
      { currentPassword: password, password: "Nouveau secret très long 2026!" },
      first,
    );
    expect(change.status).toBe(200);
    expect((await request("/state", "GET", undefined, second)).status).toBe(
      401,
    );
    const fresh = await signIn("nouveau", "Nouveau secret très long 2026!");
    expect((await request("/state", "GET", undefined, fresh)).status).toBe(200);
    expect(
      (
        await request(
          `/users/${user.id}`,
          "PUT",
          { role: "user", active: false },
          admin,
        )
      ).status,
    ).toBe(200);
    expect((await request("/state", "GET", undefined, fresh)).status).toBe(401);
  });
  test("une révocation interrompt aussi une écriture dont le corps arrive lentement", async () => {
    const user = await createUser(store, "lent", password, "user"),
      client = await signIn("lent");
    let finish!: () => void;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        finish = () => {
          controller.enqueue(
            new TextEncoder().encode('{"name":"À refuser après révocation"}'),
          );
          controller.close();
        };
      },
    });
    const pending = app.fetch(
      new Request(`${origin}/api/calendar/hosts`, {
        method: "POST",
        headers: {
          Origin: origin,
          Cookie: client.cookie,
          "X-CSRF-Token": client.csrf,
          "Content-Type": "application/json",
        },
        body: stream,
      }),
    );
    expect(
      (
        await request(
          `/users/${user.id}`,
          "PUT",
          { role: "user", active: false },
          admin,
        )
      ).status,
    ).toBe(200);
    finish();
    expect((await pending).status).toBe(401);
    expect(
      store.hosts().some((h) => h.name === "À refuser après révocation"),
    ).toBe(false);
  });
  test("les sessions de production portent Secure et les origines HTTP distantes sont refusées", async () => {
    const production = await createApp({
      store,
      publicOrigin: "https://empire-contre-intox.com",
      uploadsDir: join(root, "avatars"),
      now: () => clock,
    });
    const res = await production.fetch(
      new Request("http://calendar:3002/api/calendar/login", {
        method: "POST",
        headers: {
          Origin: "https://empire-contre-intox.com",
          "Content-Type": "application/json",
          "X-Real-IP": "test-production",
        },
        body: JSON.stringify({ login: "sam", password }),
      }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("set-cookie")).toContain("; Secure");
    expect(res.headers.get("access-control-allow-origin")).toBeNull();
    expect(
      createApp({
        store,
        publicOrigin: "http://example.com",
        uploadsDir: root,
      }),
    ).rejects.toThrow("HTTPS requis");
  });
  test("persiste après réouverture et ne réimporte pas les événements supprimés", async () => {
    event = store.deleteEvent(event.id, event.version, "test");
    const count = store.events().length,
      version = event.version;
    store.db.close();
    store = new Store(join(root, "calendar.sqlite"), seed);
    expect(store.events()).toHaveLength(count);
    expect(store.event(event.id).version).toBe(version);
    expect(store.event(event.id).deleted).toBe(1);
    expect(store.hosts().find((h) => h.id === host.id)?.avatarIds).toHaveLength(
      1,
    );
    app = await createApp({
      store,
      publicOrigin: origin,
      uploadsDir: join(root, "avatars"),
      now: () => clock,
    });
    expect((await request("/state", "GET", undefined, bob)).status).toBe(200);
  });
  test("expire les sessions et limite les tentatives de connexion", async () => {
    clock += 9 * 60 * 60 * 1000;
    expect((await request("/state", "GET", undefined, bob)).status).toBe(401);
    const valid = await request("/login", "POST", { login: "bob", password });
    expect(valid.status).toBe(200);
    const cookies = valid.headers.get("set-cookie")!;
    expect(cookies).toContain("HttpOnly");
    expect(cookies).toContain("SameSite=Strict");
    for (let i = 0; i < 10; i++)
      await request("/login", "POST", { login: "nobody", password: "wrong" });
    expect(
      (await request("/login", "POST", { login: "nobody", password: "wrong" }))
        .status,
    ).toBe(429);
  });
});
