import { test, expect } from "bun:test";
import { LiveRegistry } from "../watcher.ts";
import { MediaManager } from "../media.ts";
import { createLivesApp } from "../app.ts";
import { parseRoom } from "../tiktok.ts";
import { configClient, parseAccounts } from "../config-client.ts";
import { isPublicAddress, safeImage } from "../security.ts";
import type {
  Provider,
  RoomInfo,
  WatchAccount,
  ChatCallbacks,
  Cursor,
} from "../protocol.ts";
const account = (id: string, published = true): WatchAccount => ({
  id,
  username: id,
  displayName: "",
  enabled: true,
  published,
  sortOrder: 0,
  version: 1,
});
const room = (id = "123"): RoomInfo => ({
  roomId: id,
  live: true,
  title: "Titre",
  displayName: "Hôte",
  avatarUrl: null,
  coverUrl: null,
  startedAt: null,
  viewers: 2,
  likes: null,
  variants: [],
});
const flush = () => Bun.sleep(0);
function setup() {
  let clock = 1_000_000;
  const chats = new Map<string, ChatCallbacks>();
  let current = room();
  let failing = false;
  let stopped = 0;
  const provider: Provider = {
    async probe() {
      if (failing) throw Error();
      return current;
    },
    async connect(name, _id, callbacks) {
      chats.set(name, callbacks);
      callbacks.connected();
      return () => {
        stopped++;
      };
    },
  };
  const media = new MediaManager("/tmp/eci-unused", 4, () => clock);
  const registry = new LiveRegistry(provider, media, () => clock, 20);
  return {
    registry,
    chats,
    media,
    setRoom: (r: RoomInfo) => (current = r),
    advance: (n: number) => (clock += n),
    fail: () => (failing = true),
    stopped: () => stopped,
  };
}
test("isolates accounts, deduplicates chat, replays messages between snapshot and subscribe", async () => {
  const s = setup();
  s.registry.validateConfig([account("alice"), account("bob")]);
  await s.registry.tick();
  await flush();
  const before = s.registry.snapshot("alice");
  const m = {
    id: "one",
    timestamp: new Date(1_000_000).toISOString(),
    username: "u",
    nickname: "U",
    avatarUrl: null,
    text: "<script>text</script>",
  };
  s.chats.get("alice")!.message(m);
  s.chats.get("alice")!.message(m);
  expect(s.registry.snapshot("alice").messages.length).toBe(1);
  expect(s.registry.snapshot("bob").messages).toEqual([]);
  const events: string[] = [];
  const off = s.registry.subscribe("alice", before.cursor, (e) =>
    events.push(e.type),
  );
  expect(events).toEqual(["chat"]);
  off();
  s.registry.validateConfig([account("alice", false), account("bob")]);
  expect(s.registry.list().accounts.map((a) => a.id)).toEqual(["bob"]);
  expect(() => s.registry.snapshot("alice")).toThrow();
  expect(s.stopped()).toBeGreaterThan(0);
  s.registry.close();
});
test("304 freshness, expiry, offline vs errors and room/epoch reset", async () => {
  const s = setup();
  s.registry.validateConfig([account("alice")]);
  await s.registry.tick();
  await flush();
  const cursor = s.registry.snapshot("alice").cursor;
  for (let i = 0; i < 20; i++) {
    s.advance(14000);
    s.registry.validateConfig();
    expect(s.registry.fresh()).toBe(true);
  }
  s.fail();
  await s.registry.tick();
  expect(s.registry.snapshot("alice").live.state).toBe("error");
  s.advance(15001);
  expect(() => s.registry.list()).toThrow();
  s.registry.validateConfig();
  expect(s.registry.fresh()).toBe(true);
  const types: string[] = [];
  s.registry.subscribe("alice", { ...cursor, epoch: "old" }, (e) =>
    types.push(e.type),
  );
  expect(types).toEqual(["reset"]);
  s.registry.close();
});
test("bounds messages and resets buffer for a new room", async () => {
  const s = setup();
  s.registry.validateConfig([account("alice")]);
  await s.registry.tick();
  await flush();
  for (let i = 0; i < 500; i++)
    s.chats.get("alice")!.message({
      id: String(i),
      timestamp: new Date(1_000_000).toISOString(),
      username: "u",
      nickname: "U",
      avatarUrl: null,
      text: "text",
    });
  expect(s.registry.snapshot("alice").messages.length).toBe(200);
  s.advance(60001);
  s.registry.validateConfig();
  s.setRoom(room("456"));
  await s.registry.tick();
  expect(s.registry.snapshot("alice").messages).toEqual([]);
  expect(s.registry.snapshot("alice").live.roomId).toBe("456");
  s.registry.close();
});
test("public API hides private accounts, restricts origins and refuses arbitrary media paths", async () => {
  const s = setup();
  s.registry.validateConfig([account("alice"), account("private", false)]);
  await s.registry.tick();
  const app = createLivesApp(s.registry, "x".repeat(32), ["http://localhost"]);
  const req = (
    path: string,
    method = "GET",
    body?: string,
    origin = "http://localhost",
  ) =>
    app.fetch(
      new Request("http://localhost" + path, {
        method,
        headers: { Origin: origin, "Content-Type": "application/json" },
        body,
      }),
    );
  expect((await req("/api/lives/private")).status).toBe(404);
  expect((await req("/internal/status")).status).toBe(404);
  expect(
    (
      await req(
        "/api/lives/alice/playback",
        "POST",
        '{"allowFallback":true}',
        "https://evil.test",
      )
    ).status,
  ).toBe(403);
  expect(
    (await req("/api/lives/alice/playback", "POST", '{"allowFallback":false}'))
      .status,
  ).toBe(409);
  expect((await req("/api/lives/alice/playback", "POST", "[]")).status).toBe(
    400,
  );
  expect((await req("/media/lives/alice/123/fake/secret.ts")).status).toBe(404);
  expect(
    (await req("/api/lives/public")).headers.get("Access-Control-Allow-Origin"),
  ).toBe("*");
  s.registry.close();
});
test("SSE initial reset and cancellation release the connection quota", async () => {
  const s = setup();
  s.registry.validateConfig([account("alice")]);
  await s.registry.tick();
  const app = createLivesApp(s.registry, "x".repeat(32), ["http://localhost"]);
  for (let i = 0; i < 12; i++) {
    const response = await app.fetch(
      new Request("http://localhost/api/lives/alice/events"),
    );
    expect(response.status).toBe(200);
    const reader = response.body!.getReader();
    const data = await reader.read();
    expect(new TextDecoder().decode(data.value)).toContain("event: reset");
    await reader.cancel();
  }
  s.registry.close();
});
test("provider timeout bounds concurrent blocked probes and eventually visits the whole list", async () => {
  let probes = 0;
  const provider: Provider = {
    probe: async () => {
      probes++;
      return new Promise(() => {});
    },
    connect: async () => () => {},
  };
  const registry = new LiveRegistry(
    provider,
    new MediaManager("/tmp/unused"),
    Date.now,
    2,
  );
  registry.validateConfig(
    Array.from({ length: 30 }, (_, i) => account(`a${i}`)),
  );
  for (let i = 0; i < 15; i++) await registry.tick();
  expect(probes).toBe(30);
  registry.close();
});
test("normalizes provider data and prioritizes SD2 without audio-only fallback", () => {
  const r = parseRoom({
    data: {
      id_str: "123",
      status: 2,
      stream_url: {
        flv_pull_url: {
          HD1: "https://a.tiktokcdn.com/x",
          SD2: "https://a.tiktokcdn.com/y",
        },
        live_core_sdk_data: {
          pull_data: {
            stream_data: JSON.stringify({
              data: { ao: { main: { flv: "https://a.tiktokcdn.com/audio" } } },
            }),
          },
        },
      },
    },
  });
  expect(r.variants.map((v) => v.quality)).toEqual(["SD2", "HD1"]);
  expect(() => parseRoom({ data: { status: 0 } })).toThrow();
  expect(safeImage("https://tiktokcdn.com.evil.test/a")).toBeNull();
  expect(safeImage("http://a.tiktokcdn.com/a")).toBeNull();
  for (const ip of [
    "127.0.0.1",
    "10.0.0.2",
    "169.254.169.254",
    "::1",
    "::ffff:127.0.0.1",
  ])
    expect(isPublicAddress(ip)).toBe(false);
  expect(isPublicAddress("8.8.8.8")).toBe(true);
  expect(() =>
    parseAccounts({ accounts: [{ ...account("alice"), published: "yes" }] }),
  ).toThrow();
});


test("configuration HTTP polling renews freshness on 304 and never follows redirects", async () => {
  const s = setup();
  let redirect = false, leakedRequests = 0;
  const server = Bun.serve({
    hostname: "127.0.0.1", port: 0,
    fetch(req) {
      if (new URL(req.url).pathname === "/unexpected") {
        leakedRequests++;
        return Response.json({ accounts: [] });
      }
      if (redirect) return Response.redirect(new URL("/unexpected", req.url), 302);
      if (req.headers.get("if-none-match") === '"1"')
        return new Response(null, { status: 304, headers: { ETag: '"1"' } });
      return Response.json({ accounts: [account("alice")] }, { headers: { ETag: '"1"' } });
    },
  });
  try {
    const sync = configClient(s.registry, `http://127.0.0.1:${server.port}/config`, "test-token");
    await sync();
    expect(s.registry.fresh()).toBe(true);
    s.advance(16000);
    expect(s.registry.fresh()).toBe(false);
    await sync();
    expect(s.registry.fresh()).toBe(true);
    redirect = true;
    s.advance(16000);
    await sync();
    expect(s.registry.fresh()).toBe(false);
    expect(leakedRequests).toBe(0);
  } finally {
    s.registry.close();
    await server.stop(true);
  }
});
