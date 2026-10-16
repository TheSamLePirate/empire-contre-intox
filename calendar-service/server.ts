import { join, resolve } from "node:path";
import { Store } from "./store.ts";
import { createApp } from "./app.ts";

const directory = resolve(process.env.CALENDAR_DATA_DIR || "/data");
const calendar = resolve(
  process.env.CALENDAR_FILES || join(import.meta.dir, "../empire-calendrier"),
);
const origin = process.env.CALENDAR_ORIGIN || "https://empire-contre-intox.com";
const dev = process.env.CALENDAR_DEV === "1";
if (
  dev &&
  !["localhost", "127.0.0.1", "[::1]"].includes(new URL(origin).hostname)
)
  throw new Error("Serveur de développement réservé à localhost.");
const store = new Store(
  join(directory, "calendar.sqlite"),
  process.env.CALENDAR_SEED || join(calendar, "data/events.json"),
);
const app = await createApp({
  store,
  publicOrigin: origin,
  uploadsDir: join(directory, "avatars"),
  internalToken: process.env.LIVES_INTERNAL_TOKEN,
  liveStatus: async () => {
    const response = await fetch(`${process.env.LIVES_URL || "http://lives:3003"}/internal/status`, {
      headers: {Authorization: `Bearer ${process.env.LIVES_INTERNAL_TOKEN || ""}`}, signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) throw new Error("Worker unavailable");
    return response.json();
  },
});
const server = Bun.serve({
  hostname: dev ? "127.0.0.1" : "0.0.0.0",
  port: Number(process.env.PORT || 3002),
  maxRequestBodySize: 6 * 1024 * 1024,
  async fetch(req) {
    const path = new URL(req.url).pathname;
    if (path.startsWith("/api/calendar/")) return app.fetch(req);
    if (!dev || !["GET", "HEAD"].includes(req.method))
      return new Response("Introuvable", { status: 404 });
    if (path === "/")
      return Response.redirect(`${origin}/empire-calendrier/`, 302);
    const name = path
      .replace(/^\/empire-calendrier\//, "")
      .replace(/\/$/, "/index.html");
    if (path === "/empire-calendrier")
      return Response.redirect(`${origin}/empire-calendrier/`, 302);
    const rel = name || "index.html";
    if (
      !/^(?:index\.html|data\/events\.json|admin\/(?:index\.html|admin\.js|admin\.css|lives-admin\.js)|[a-zA-Z0-9_.-]+\.(?:jpe?g|png|webp))$/.test(
        rel,
      )
    )
      return new Response("Introuvable", { status: 404 });
    const file = Bun.file(join(calendar, rel));
    const headers: Record<string, string> = {
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    };
    if (rel.startsWith("admin/"))
      headers["Content-Security-Policy"] =
        "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'";
    return (await file.exists())
      ? new Response(req.method === "HEAD" ? null : file, { headers })
      : new Response("Introuvable", { status: 404 });
  },
});
console.log(`Calendrier ECI : ${origin} (port ${server.port})`);
process.on("SIGTERM", async () => {
  await server.stop();
  store.db.close();
  process.exit(0);
});
