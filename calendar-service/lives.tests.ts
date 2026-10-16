import { test, expect } from "bun:test";
import { Store } from "./store.ts";
import {
  normalizeUsername,
  saveWatchAccount,
  watchAccounts,
  watchRevision,
} from "./lives.ts";
import { createApp, createUser } from "./app.ts";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
const seed = resolve(import.meta.dir, "../empire-calendrier/data/events.json");
test("seeds once, normalizes, versions, audits and preserves deleted seed accounts on reopen", () => {
  const dir = mkdtempSync(join(tmpdir(), "eci-live-store-"));
  const path = join(dir, "db.sqlite");
  let s = new Store(path, seed);
  expect(watchAccounts(s).map((a) => a.username)).toEqual([
    "provoxys",
    "ghost.navigator.ghost",
  ]);
  expect(normalizeUsername("https://www.tiktok.com/@Provoxys/live")).toBe(
    "provoxys",
  );
  expect(() => normalizeUsername("https://evil.test/@test")).toThrow();
  const first = watchAccounts(s)[0];
  saveWatchAccount(s, first.id, { version: first.version }, "sam", true);
  s.db.close();
  s = new Store(path, seed);
  expect(watchAccounts(s).length).toBe(1);
  const a = watchAccounts(s)[0];
  saveWatchAccount(s, a.id, { ...a, displayName: "Ghost" }, "sam");
  expect(() => saveWatchAccount(s, a.id, { ...a }, "sam")).toThrow();
  expect(watchRevision(s)).toBe("3");
  expect(s.all("SELECT * FROM live_watch_audit").length).toBe(2);
  s.db.close();
  rmSync(dir, { recursive: true, force: true });
});
test("admin-only CRUD, CSRF, internal auth/ETag and no session data in configuration", async () => {
  const store = new Store(":memory:", seed);
  const secret = "x".repeat(32);
  const app = await createApp({
    store,
    uploadsDir: "/tmp/eci-no-upload",
    publicOrigin: "http://localhost",
    internalToken: secret,
  });
  const password = "Password for live admin tests!";
  await createUser(store, "sam", password, "admin");
  await createUser(store, "member", password, "user");
  const request = (
    path: string,
    method = "GET",
    data?: unknown,
    cookie = "",
    csrf = "",
    auth = "",
  ) =>
    app.fetch(
      new Request("http://localhost/api/calendar" + path, {
        method,
        headers: {
          Origin: "http://localhost",
          Cookie: cookie,
          "X-CSRF-Token": csrf,
          Authorization: auth,
          "Content-Type": "application/json",
        },
        body: data === undefined ? undefined : JSON.stringify(data),
      }),
    );
  const login = async (name: string) => {
    const r = await request("/login", "POST", { login: name, password });
    const d = await r.json();
    return { cookie: r.headers.get("set-cookie")!.split(";")[0], csrf: d.csrf };
  };
  const admin = await login("sam"),
    member = await login("member");
  expect((await request("/live-watch")).status).toBe(401);
  expect(
    (await request("/live-watch", "GET", undefined, member.cookie, member.csrf))
      .status,
  ).toBe(403);
  const response = await request(
    "/live-watch",
    "GET",
    undefined,
    admin.cookie,
    admin.csrf,
  );
  expect(response.status).toBe(200);
  const account = (await response.json()).accounts[0];
  expect(
    (await request(`/live-watch/${account.id}`, "PUT", account, admin.cookie))
      .status,
  ).toBe(403);
  expect(
    (
      await request(
        `/live-watch/${account.id}`,
        "PUT",
        { ...account, displayName: "Live test" },
        admin.cookie,
        admin.csrf,
      )
    ).status,
  ).toBe(200);
  expect((await request("/internal/live-watch")).status).toBe(404);
  const internal = await request(
    "/internal/live-watch",
    "GET",
    undefined,
    "",
    "",
    `Bearer ${secret}`,
  );
  expect(internal.status).toBe(200);
  expect(await internal.text()).not.toContain("password");
  const cached = await app.fetch(
    new Request("http://localhost/api/calendar/internal/live-watch", {
      headers: {
        Authorization: `Bearer ${secret}`,
        "If-None-Match": internal.headers.get("etag")!,
      },
    }),
  );
  expect(cached.status).toBe(304);
  store.db.close();
});
