import { mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createTikTokProvider } from "./tiktok.ts";
import { MediaManager } from "./media.ts";
import { LiveRegistry } from "./watcher.ts";
import { configClient } from "./config-client.ts";
import { createLivesApp } from "./app.ts";
import { DiscordNotifier } from "./discord.ts";

const token = process.env.LIVES_INTERNAL_TOKEN ?? "";
if (token.length < 32)
  throw new Error("LIVES_INTERNAL_TOKEN doit contenir au moins 32 caractères.");
// A single named secret may be read from the authorized reference project's env file.
let sessionId = process.env.TIKTOK_SESSION_ID ?? "";
if (!sessionId && process.env.TIKTOK_SESSION_FILE)
  sessionId = (await readFile(process.env.TIKTOK_SESSION_FILE, "utf8")).trim();
if (!sessionId && process.env.TIKTOK_ENV_FILE) {
  const text = await readFile(process.env.TIKTOK_ENV_FILE, "utf8");
  sessionId = (
    text.match(/^(?:export\s+)?TIKTOK_SESSION_ID\s*=\s*(.*)$/m)?.[1] ?? ""
  )
    .trim()
    .replace(/^(['"])(.*)\1$/, "$2");
}
const origin = process.env.LIVES_ORIGIN ?? "https://empire-contre-intox.com";
const origins = [
  origin,
  ...(
    process.env.LIVES_PUBLIC_ORIGINS ?? "https://thesamlepirate.github.io"
  ).split(","),
]
  .filter(Boolean)
  .map((o) => new URL(o).origin);
const media = new MediaManager(
  resolve(process.env.LIVES_MEDIA_DIR ?? "/tmp/eci-lives-media"),
);
await media.init();
let discord: DiscordNotifier | undefined;
const registry = new LiveRegistry(
  createTikTokProvider(sessionId, process.env.TIKTOK_TARGET_IDC ?? ""),
  media,
  Date.now,
  3000,
  (live) => discord?.observe(live),
);
const discordToken = process.env.DISCORD_TOKEN?.trim();
if (discordToken) {
  const directory = resolve(process.env.LIVES_DATA_DIR ?? new URL(".data", import.meta.url).pathname);
  await mkdir(directory, { recursive: true });
  discord = new DiscordNotifier(resolve(directory, "discord.sqlite"), discordToken, origin, (key) => {
    try { return registry.list().accounts.some((live) => live.state === "live" && `${live.username}:${live.roomId}` === key); }
    catch { return false; }
  });
}
const sync = configClient(
  registry,
  `${process.env.CALENDAR_URL ?? "http://calendar:3002"}/api/calendar/internal/live-watch`,
  token,
);
await sync();
const app = createLivesApp(registry, token, origins);
const server = Bun.serve({
  hostname: process.env.LIVES_DEV === "1" ? "127.0.0.1" : "0.0.0.0",
  port: Number(process.env.PORT ?? 3003),
  maxRequestBodySize: 1024,
  idleTimeout: 60,
  fetch(req, server) {
    if (new URL(req.url).pathname.endsWith("/events")) server.timeout(req, 0);
    return app.fetch(req);
  },
});
const configTimer = setInterval(() => void sync(), 2000);
const tickTimer = setInterval(() => { void registry.tick(); void discord?.flush(); }, 1000);
void registry.tick();
const shutdown = async () => {
  clearInterval(configTimer);
  clearInterval(tickTimer);
  registry.close();
  await discord?.close();
  await server.stop(true);
};
process.on("SIGTERM", () => void shutdown());
process.on("SIGINT", () => void shutdown());
console.log(
  `Lives ECI : port ${server.port}, session ${sessionId ? "configurée" : "absente"}, Discord ${discord ? "configuré" : "désactivé"}`,
);
