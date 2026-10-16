import { createHash } from "node:crypto";
import type { LiveRegistry } from "./watcher.ts";
import type { Cursor } from "./protocol.ts";
import { LiveProblem } from "./media.ts";
import { RateLimiter } from "../counter/lib.ts";
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
export function createLivesApp(
  registry: LiveRegistry,
  internalToken: string,
  origins: string[],
) {
  const reads = new RateLimiter({ maxPerClient: 180, maxGlobal: 12000 });
  const writes = new RateLimiter({ maxPerClient: 30, maxGlobal: 600 });
  const connections = new Map<string, number>();
  let globalConnections = 0,
    lastSweep = 0;
  const json = (body: unknown, status = 200) =>
    Response.json(body, {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Access-Control-Allow-Origin": "*",
      },
    });
  const requireOrigin = (req: Request) => {
    if (!origins.includes(req.headers.get("origin") ?? ""))
      throw new LiveProblem(403, "Origine refusée.");
  };
  return {
    async fetch(req: Request): Promise<Response> {
      const url = new URL(req.url),
        path = url.pathname;
      const ip = (req.headers.get("x-real-ip") ?? "direct").slice(0, 128);
      if (Date.now() - lastSweep > 60000) {
        reads.sweep(Date.now());
        writes.sweep(Date.now());
        lastSweep = Date.now();
      }
      try {
        if (path === "/internal/status") {
          if (
            !internalToken ||
            hash(req.headers.get("authorization") ?? "") !==
              hash(`Bearer ${internalToken}`)
          )
            throw new LiveProblem(404, "Route introuvable.");
          return json(registry.diagnostics());
        }
        if (path === "/api/lives/health")
          return json({ ok: true, configured: registry.fresh() });
        if (!reads.check(ip, Date.now()).allowed)
          throw new LiveProblem(429, "Trop de requêtes.");
        if (req.method === "OPTIONS") {
          requireOrigin(req);
          return new Response(null, {
            status: 204,
            headers: {
              "Access-Control-Allow-Origin": req.headers.get("origin")!,
              "Access-Control-Allow-Methods":
                "GET,HEAD,POST,PUT,DELETE,OPTIONS",
              "Access-Control-Allow-Headers":
                "Content-Type, X-Playback-Lease, Last-Event-ID",
              "Access-Control-Max-Age": "600",
              Vary: "Origin",
            },
          });
        }
        if (path === "/api/lives/public" && req.method === "GET")
          return json(registry.list());
        const media =
          /^\/media\/lives\/([-a-zA-Z0-9_]{1,80})\/(\d{1,30})\/([-a-zA-Z0-9_]{1,80})\/(live\.m3u8|seg_\d{9}\.ts)$/.exec(
            path,
          );
        if (media && ["GET", "HEAD"].includes(req.method)) {
          registry.get(media[1]);
          return await registry.media.file(
            media[1],
            media[2],
            media[3],
            media[4],
            req.method === "HEAD",
          );
        }
        const match =
          /^\/api\/lives\/([-a-zA-Z0-9_]{1,80})(?:\/(events|playback))?$/.exec(
            path,
          );
        if (!match) throw new LiveProblem(404, "Route introuvable.");
        const [, id, action] = match;
        registry.get(id);
        if (!action && req.method === "GET") return json(registry.snapshot(id));
        if (
          action === "playback" &&
          ["POST", "PUT", "DELETE"].includes(req.method)
        ) {
          requireOrigin(req);
          if (!writes.check(ip, Date.now()).allowed)
            throw new LiveProblem(429, "Trop de demandes vidéo.");
          if (req.method !== "POST")
            return json(
              registry.media.renew(
                id,
                req.headers.get("x-playback-lease") ?? "",
                req.method === "DELETE",
              ),
            );
          const length = Number(req.headers.get("content-length") ?? 0);
          if (length > 1024)
            throw new LiveProblem(413, "Demande trop volumineuse.");
          const data = (await req.json().catch(() => null)) as Record<
            string,
            unknown
          > | null;
          if (!data || typeof data !== "object" || Array.isArray(data))
            throw new LiveProblem(400, "Demande invalide.");
          const result = await registry.playback(id);
          return json(result, result.playbackState === "ready" ? 200 : 202);
        }
        if (action === "events" && req.method === "GET") {
          if ((connections.get(ip) ?? 0) >= 8 || globalConnections >= 1000)
            throw new LiveProblem(429, "Trop de connexions ouvertes.");
          const raw =
            req.headers.get("last-event-id") ?? url.searchParams.get("cursor");
          let cursor: Cursor | null = null;
          if (raw && raw.length < 160) {
            const [epoch, roomId, sequence] = raw.split(":");
            if (epoch && roomId && /^\d+$/.test(sequence))
              cursor = {
                epoch,
                roomId: roomId === "none" ? null : roomId,
                sequence: Number(sequence),
              };
          }
          let cleanup = () => {};
          const stream = new ReadableStream<Uint8Array>(
            {
              start(controller) {
                let closed = false;
                let unsubscribe = () => {};
                let heartbeat: ReturnType<typeof setInterval> | undefined;
                const finish = () => {
                  if (closed) return;
                  closed = true;
                  clearInterval(heartbeat);
                  unsubscribe();
                  req.signal.removeEventListener("abort", finish);
                  connections.set(
                    ip,
                    Math.max(0, (connections.get(ip) ?? 1) - 1),
                  );
                  if (!connections.get(ip)) connections.delete(ip);
                  globalConnections--;
                  try {
                    controller.close();
                  } catch {}
                };
                cleanup = finish;
                connections.set(ip, (connections.get(ip) ?? 0) + 1);
                globalConnections++;
                const send = (text: string) => {
                  if (closed) return;
                  if ((controller.desiredSize ?? 0) < 0) {
                    finish();
                    return;
                  }
                  controller.enqueue(new TextEncoder().encode(text));
                };
                try {
                  unsubscribe = registry.subscribe(id, cursor, (e) =>
                    send(
                      `id: ${e.id}\nevent: ${e.type}\ndata: ${JSON.stringify(e.data)}\n\n`,
                    ),
                  );
                } catch {
                  finish();
                  return;
                }
                if (closed) {
                  unsubscribe();
                  return;
                }
                heartbeat = setInterval(() => {
                  try {
                    registry.get(id);
                    send(": heartbeat\n\n");
                  } catch {
                    finish();
                  }
                }, 5000);
                req.signal.addEventListener("abort", finish, { once: true });
                if (req.signal.aborted) finish();
              },
              cancel() {
                cleanup();
              },
            },
            {
              highWaterMark: 1024 * 1024,
              size: (chunk) => chunk?.byteLength ?? 0,
            },
          );
          return new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-store",
              "Access-Control-Allow-Origin": "*",
              "X-Accel-Buffering": "no",
              "X-Content-Type-Options": "nosniff",
            },
          });
        }
        throw new LiveProblem(405, "Méthode non autorisée.");
      } catch (e) {
        const problem =
          e instanceof LiveProblem
            ? e
            : new LiveProblem(500, "Service temporairement indisponible.");
        const response = json({ error: problem.message }, problem.status);
        if (problem.status === 429) response.headers.set("Retry-After", "30");
        return response;
      }
    },
  };
}
