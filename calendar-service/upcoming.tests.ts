import { test, expect } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import sharp from "sharp";
import { Store } from "./store.ts";
import { createApp, createUser } from "./app.ts";
import { seedUpcoming, upcomingLives, upcomingPublic } from "./upcoming.ts";
import { normalizeDossierPath, setLiveDossier, watchAccounts } from "./lives.ts";

const seed = resolve(import.meta.dir, "../empire-calendrier/data/events.json");
const programme = resolve(import.meta.dir, "prochainement-seed.json");

test("imports the historical programme once, never recreating deleted lives", () => {
  const dir = mkdtempSync(join(tmpdir(), "eci-upcoming-"));
  const path = join(dir, "db.sqlite");
  let store = new Store(path, seed);
  expect(seedUpcoming(store, programme)).toBe(48);
  const lives = upcomingLives(store);
  expect(lives[0].title).toBe("Fusion nucléaire — WEST, EAST, ITER");
  expect(lives[23].video).toBe("assets/prochainement/08.mp4");
  store.run("DELETE FROM upcoming_lives WHERE id=?", lives[0].id);
  store.db.close();
  store = new Store(path, seed);
  expect(seedUpcoming(store, programme)).toBe(0);
  expect(upcomingLives(store).length).toBe(47);
  const pub = upcomingPublic(store, "https://example.test");
  expect(pub.lives[0].number).toBe("01");
  expect(pub.lives[0].tag).toBe("COSMOS");
  store.db.close();
  rmSync(dir, { recursive: true, force: true });
});

test("dossier paths stay on the site and never frame the admin or the API", () => {
  expect(normalizeDossierPath("provoxys/son/index.html")).toBe("provoxys/son/index.html");
  expect(normalizeDossierPath("/provoxys/son/")).toBe("provoxys/son/");
  expect(normalizeDossierPath("../provoxys/son/index.html#acte-2")).toBe("provoxys/son/index.html#acte-2");
  expect(normalizeDossierPath("https://empire-contre-intox.com/provoxys/lumiere/index.html")).toBe("provoxys/lumiere/index.html");
  expect(normalizeDossierPath("https://thesamlepirate.github.io/empire-contre-intox/sources/sources.html")).toBe("sources/sources.html");
  for (const bad of [
    "https://evil.test/a.html",
    "javascript:alert(1)",
    "empire-calendrier/admin/index.html",
    "api/calendar/public",
    "lives/index.html",
    "a/../b.html",
    "a//b.html",
    "provoxys/son",
    "a.html?x=1",
    "",
  ])
    expect(() => normalizeDossierPath(bad)).toThrow();
});

test("members manage the programme; admins attach a dossier to the current room", async () => {
  const dir = mkdtempSync(join(tmpdir(), "eci-upcoming-app-"));
  const store = new Store(":memory:", seed);
  seedUpcoming(store, programme);
  const app = await createApp({
    store,
    uploadsDir: join(dir, "avatars"),
    upcomingDir: join(dir, "upcoming"),
    publicOrigin: "http://localhost",
  });
  const password = "Password for upcoming tests!";
  await createUser(store, "sam", password, "admin");
  await createUser(store, "member", password, "user");
  const call = (path: string, method = "GET", data?: unknown, who?: { cookie: string; csrf: string }, raw?: BodyInit, type = "application/json") =>
    app.fetch(
      new Request("http://localhost/api/calendar" + path, {
        method,
        headers: {
          Origin: "http://localhost",
          Cookie: who?.cookie ?? "",
          "X-CSRF-Token": who?.csrf ?? "",
          ...(raw ? {} : { "Content-Type": type }),
        },
        body: raw ?? (data === undefined ? undefined : JSON.stringify(data)),
      }),
    );
  const login = async (name: string) => {
    const r = await call("/login", "POST", { login: name, password });
    return { cookie: r.headers.get("set-cookie")!.split(";")[0], csrf: (await r.json()).csrf };
  };
  const admin = await login("sam"),
    member = await login("member");

  // Public JSON, CORS, no account data.
  const pub = await call("/upcoming");
  expect(pub.status).toBe(200);
  expect(pub.headers.get("access-control-allow-origin")).toBe("*");
  expect((await pub.json()).lives.length).toBe(48);

  // Anonymous writes are refused; CSRF is required.
  expect((await call("/upcoming", "POST", {})).status).toBe(401);
  expect((await call("/upcoming/all", "GET", undefined, { ...member, csrf: "" })).status).toBe(200);
  const base = { theme: "terre", title: "Volcans", hook: "Le feu sous nos pieds.", duration: "≈ 2 h", teaser: "Ligne 1\nLigne 2\n", image: "assets/prochainement/09.webp", video: "", published: true };
  expect((await call("/upcoming", "POST", base, { ...member, csrf: "nope" })).status).toBe(403);

  // Create at position 0, edit, conflict, unpublish, reorder, delete.
  let r = await call("/upcoming", "POST", { ...base, position: 0 }, member);
  expect(r.status).toBe(201);
  let state = await r.json();
  const created = state.lives[0];
  expect(created.title).toBe("Volcans");
  expect(created.teaser).toEqual(["Ligne 1", "Ligne 2"]);
  expect(created.video).toBeNull();
  expect((await call("/upcoming", "POST", { ...base, theme: "nope" }, member)).status).toBe(400);
  expect((await call("/upcoming", "POST", { ...base, image: "https://evil.test/x.webp" }, member)).status).toBe(400);
  r = await call(`/upcoming/item/${created.id}`, "PUT", { ...base, title: "Volcans actifs", published: false, version: created.version }, member);
  expect(r.status).toBe(200);
  expect((await call(`/upcoming/item/${created.id}`, "PUT", { ...base, version: created.version }, member)).status).toBe(409);
  const publicNow = await (await call("/upcoming")).json();
  expect(publicNow.lives.length).toBe(48);
  expect(publicNow.lives.some((l: { title: string }) => l.title === "Volcans actifs")).toBe(false);
  state = await (await call("/upcoming/all", "GET", undefined, member)).json();
  const order = state.lives.map((l: { id: string }) => l.id);
  const swapped = [order[1], order[0], ...order.slice(2)];
  expect((await call("/upcoming/order", "PUT", { order: swapped, revision: state.revision - 1 }, member)).status).toBe(409);
  expect((await call("/upcoming/order", "PUT", { order: swapped.slice(1), revision: state.revision }, member)).status).toBe(400);
  r = await call("/upcoming/order", "PUT", { order: swapped, revision: state.revision }, member);
  expect(r.status).toBe(200);
  state = await r.json();
  expect(state.lives[1].id).toBe(created.id);
  r = await call(`/upcoming/item/${created.id}`, "DELETE", { version: state.lives[1].version }, member);
  expect((await r.json()).lives.length).toBe(48);

  // Poster upload: re-encoded WebP served publicly.
  const png = await sharp({ create: { width: 1200, height: 800, channels: 3, background: "#123456" } }).png().toBuffer();
  const form = new FormData();
  form.append("file", new File([png], "affiche.png", { type: "image/png" }));
  form.append("label", "Affiche test");
  r = await call("/upcoming/media", "POST", undefined, member, form);
  expect(r.status).toBe(201);
  const uploaded = await r.json();
  const image = await call(uploaded.path.replace("/api/calendar", ""));
  expect(image.headers.get("content-type")).toBe("image/webp");
  expect((await sharp(Buffer.from(await image.arrayBuffer())).metadata()).width).toBe(960);
  r = await call("/upcoming", "POST", { ...base, image: uploaded.path }, member);
  expect(r.status).toBe(201);
  const pubWithUpload = await (await call("/upcoming")).json();
  expect(pubWithUpload.lives.at(-1).image).toBe(`http://localhost${uploaded.path}`);

  // Live dossier: admin only, version-checked, bound to a room.
  const account = watchAccounts(store)[0];
  const dossier = { path: "provoxys/son/index.html", title: "Le Son", roomId: "7531" };
  expect((await call(`/live-watch/${account.id}/dossier`, "PUT", { version: account.version, dossier }, member)).status).toBe(403);
  expect((await call(`/live-watch/${account.id}/dossier`, "PUT", { version: account.version, dossier: { ...dossier, roomId: "" } }, admin)).status).toBe(409);
  expect((await call(`/live-watch/${account.id}/dossier`, "PUT", { version: account.version, dossier: { ...dossier, path: "empire-calendrier/admin/" } }, admin)).status).toBe(400);
  r = await call(`/live-watch/${account.id}/dossier`, "PUT", { version: account.version, dossier }, admin);
  expect(r.status).toBe(200);
  const saved = (await r.json()).accounts[0];
  expect(saved.dossier).toEqual(dossier);
  expect((await call(`/live-watch/${account.id}/dossier`, "PUT", { version: account.version, dossier: null }, admin)).status).toBe(409);
  // Editing the account itself keeps the dossier.
  r = await call(`/live-watch/${account.id}`, "PUT", { ...saved, displayName: "Provoxys" }, admin);
  expect((await r.json()).accounts[0].dossier).toEqual(dossier);
  setLiveDossier(store, account.id, { version: watchAccounts(store)[0].version, dossier: null }, "sam");
  expect(watchAccounts(store)[0].dossier).toBeNull();
  store.db.close();
  rmSync(dir, { recursive: true, force: true });
});

test("backup copies the database, portraits and Prochainement posters, without unfinished uploads", async () => {
  const dir = mkdtempSync(join(tmpdir(), "eci-backup-"));
  const data = join(dir, "data"), out = join(dir, "save");
  const { mkdirSync, writeFileSync, existsSync } = await import("node:fs");
  new Store(join(data, "calendar.sqlite"), seed).db.close();
  mkdirSync(join(data, "avatars"));
  mkdirSync(join(data, "upcoming"));
  writeFileSync(join(data, "avatars", "a.webp"), "a");
  writeFileSync(join(data, "upcoming", "p.webp"), "p");
  writeFileSync(join(data, "upcoming", "q.tmp"), "partial");
  const run = Bun.spawnSync(["bun", resolve(import.meta.dir, "manage.ts"), "backup", out], {
    env: { ...process.env, CALENDAR_DATA_DIR: data, CALENDAR_SEED: seed },
  });
  expect(run.exitCode).toBe(0);
  expect(existsSync(join(out, "calendar.sqlite"))).toBe(true);
  expect(existsSync(join(out, "avatars", "a.webp"))).toBe(true);
  expect(existsSync(join(out, "upcoming", "p.webp"))).toBe(true);
  expect(existsSync(join(out, "upcoming", "q.tmp"))).toBe(false);
  rmSync(dir, { recursive: true, force: true });
});
