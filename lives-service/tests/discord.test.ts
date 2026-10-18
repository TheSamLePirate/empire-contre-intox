import { test, expect } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DiscordNotifier, liveMessage } from "../discord.ts";
import { LiveRegistry } from "../watcher.ts";
import { MediaManager } from "../media.ts";
import type { PublicLive, Provider, RoomInfo } from "../protocol.ts";
const live = (state: PublicLive["state"] = "live", roomId = "123"): PublicLive => ({
  id: "alice-id", username: "alice", displayName: "Alice", state, roomId,
  title: "Les étoiles", avatarUrl: "https://p.tiktokcdn.com/avatar.jpg", coverUrl: "https://p.tiktokcdn.com/cover.jpg",
  checkedAt: "2026-10-18T12:00:00Z", startedAt: "2026-10-18T11:59:00Z", viewers: 42, likes: 0,
  tiktokUrl: "https://www.tiktok.com/@alice/live", qualities: [], playback: { state: "idle", quality: null }, chatState: "unavailable",
});
test("embed contains metadata, images and both links; obeys limits and suppresses mentions", () => {
  const payload = liveMessage(live(), "https://empire-contre-intox.com");
  const embed = payload.embeds[0];
  expect(embed.title).toBe("Les étoiles");
  expect(embed.description).toContain("https://empire-contre-intox.com/lives/?live=alice-id");
  expect(embed.description).toContain(live().tiktokUrl);
  expect(embed.image?.url).toBe(live().coverUrl!);
  expect(embed.thumbnail?.url).toBe(live().avatarUrl!);
  expect(embed.fields.find(f => f.name === "J’aime")?.value).toBe("0");
  expect(payload.allowed_mentions.parse).toEqual([]);
  const sparse = liveMessage({ ...live(), title: "x".repeat(1000), displayName: "y".repeat(1000), startedAt: "invalid", viewers: null, likes: null, coverUrl: null }, "https://example.com").embeds[0];
  expect(sparse.title.length).toBeLessThanOrEqual(256);
  expect(sparse.author.name.length).toBeLessThanOrEqual(256);
  expect(sparse.fields.map(f => f.name)).toEqual(["Créateur", "Plateforme"]);
});
test("durable transition, baseline, retries, visibility, same-room blips and room changes", async () => {
  const dir = await mkdtemp(join(tmpdir(), "eci-discord-"));
  let clock = 1_000_000, eligible = true, status = 429;
  const requests: { url: string; body: any }[] = [];
  const request = (async (url, init) => {
    requests.push({ url: String(url), body: JSON.parse(String(init?.body)) });
    return new Response(JSON.stringify({ retry_after: 3 }), { status });
  }) as typeof fetch;
  const create = () => new DiscordNotifier(join(dir, "state.sqlite"), "fake", "https://example.com", () => eligible, request, () => clock);
  let notifier = create();
  try {
    notifier.observe(live()); // Already live at first activation.
    await notifier.flush(); expect(requests.length).toBe(0);
    notifier.observe(live("offline")); notifier.observe(live());
    await notifier.flush(); expect(requests.length).toBe(0); // Same room baseline.
    notifier.observe(live("offline")); notifier.observe(live("live", "456"));
    eligible = false; await notifier.flush(); expect(requests.length).toBe(0);
    eligible = true; await notifier.flush(); expect(requests.length).toBe(1);
    expect(requests[0].url).toEndWith("/channels/1443295072605962300/messages");
    clock += 2001; await notifier.flush(); expect(requests.length).toBe(1);
    clock += 1000; status = 200; await notifier.flush(); expect(requests.length).toBe(2);
    expect(requests[0].body.nonce).toBe(requests[1].body.nonce);
    expect(requests[1].body.enforce_nonce).toBe(true);
    await notifier.close(); notifier = create();
    notifier.observe(live("live", "456")); clock += 60000;
    await notifier.flush(); expect(requests.length).toBe(2);
    notifier.observe(live("offline", "456")); notifier.observe(live("live", "456"));
    await notifier.flush(); expect(requests.length).toBe(2);
    notifier.observe(live("live", "789")); await notifier.flush(); expect(requests.length).toBe(3);
  } finally { await notifier.close(); await rm(dir, { recursive: true, force: true }); }
});
test("registry observes confirmed public probes only, never polling errors", async () => {
  let clock = 1_000_000, failing = false, isLive = false;
  const observed: string[] = [];
  const room: RoomInfo = { roomId: "123", live: false, title: null, displayName: "Alice", avatarUrl: null, coverUrl: null, startedAt: null, viewers: null, likes: null, variants: [] };
  const provider: Provider = { async probe() { if (failing) throw Error(); return { ...room, live: isLive }; }, async connect() { return () => {}; } };
  const registry = new LiveRegistry(provider, new MediaManager("/tmp/eci-unused"), () => clock, 20, l => { observed.push(l.state); });
  const accounts = [true, false].map((published, i) => ({ id: String(i), username: String(i), displayName: "", enabled: true, published, sortOrder: i, version: 1 }));
  try {
    registry.validateConfig(accounts); await registry.tick(); expect(observed).toEqual(["offline"]);
    clock += 60001; registry.validateConfig(); failing = true; await registry.tick(); expect(observed).toEqual(["offline"]);
    clock += 60001; registry.validateConfig(); failing = false; isLive = true; await registry.tick(); expect(observed).toEqual(["offline", "live"]);
  } finally { registry.close(); }
});

test("pending announcements survive restart and permanent permission failures stop retries", async () => {
  const dir = await mkdtemp(join(tmpdir(), "eci-discord-restart-"));
  let clock = 1_000_000, requests = 0;
  const request = async () => { requests++; return new Response("{}", { status: 403 }); };
  const create = () => new DiscordNotifier(join(dir, "state.sqlite"), "fake", "https://example.com", () => true, request, () => clock);
  let notifier = create();
  try {
    notifier.observe(live("offline")); notifier.observe(live());
    await notifier.close(); notifier = create();
    await notifier.flush(); expect(requests).toBe(1);
    clock += 60001; await notifier.flush(); expect(requests).toBe(1);
  } finally { await notifier.close(); await rm(dir, { recursive: true, force: true }); }
});
