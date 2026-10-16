import { mkdir, readdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { validateMediaUrl } from "./security.ts";
import type { Variant } from "./protocol.ts";

export class LiveProblem extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export interface Playback {
  state: "idle" | "preparing" | "ready" | "unavailable";
  quality: string | null;
}
interface Pipeline {
  key: string;
  id: string;
  roomId: string;
  generation: string;
  quality: string;
  directory: string;
  controller: AbortController;
  proc?: Bun.Subprocess;
  state: Playback["state"];
  leases: Map<string, number>;
}
export class MediaManager {
  private pipelines = new Map<string, Pipeline>();
  private leases = new Map<string, Pipeline>();
  constructor(
    readonly root: string,
    readonly maxPipelines = 4,
    private now = Date.now,
    private maxBytes = 512 * 1024 * 1024,
    private openSource: (
      url: string,
      signal: AbortSignal,
    ) => Promise<Response> = async (url, signal) => {
      await validateMediaUrl(url);
      signal.throwIfAborted();
      return fetch(url, { redirect: "error", signal });
    },
  ) {}
  async init() {
    await mkdir(this.root, { recursive: true });
    // The cache root can be a Docker tmpfs mount; only remove stale entries.
    for (const entry of await readdir(this.root))
      await rm(join(this.root, entry), { recursive: true, force: true });
  }
  state(id: string): Playback {
    const p = this.pipelines.get(id);
    return p
      ? { state: p.state, quality: p.quality }
      : { state: "idle", quality: null };
  }
  async acquire(id: string, roomId: string, variants: Variant[]) {
    this.sweep();
    const variant =
      variants.find((v) => v.quality === "SD2") ??
      variants.find((v) => v.quality !== "AO");
    if (!variant)
      throw new LiveProblem(409, "Aucun flux vidéo disponible pour ce live.");
    let p = this.pipelines.get(id);
    if (p && p.roomId !== roomId) {
      this.stop(id);
      p = undefined;
    }
    if (p?.state === "unavailable") {
      this.stop(id);
      p = undefined;
    }
    if (!p) {
      if (this.pipelines.size >= this.maxPipelines)
        throw new LiveProblem(
          429,
          "Capacité vidéo atteinte. Réessayez dans un instant.",
        );
      const generation = crypto.randomUUID();
      p = {
        id,
        roomId,
        generation,
        key: `${id}/${roomId}/${generation}`,
        directory: join(this.root, id, roomId, generation),
        quality: variant.quality,
        state: "preparing",
        controller: new AbortController(),
        leases: new Map(),
      };
      this.pipelines.set(id, p);
      void this.start(p, variant.url);
    }
    if (this.leases.size >= 1000 || p.leases.size >= 500)
      throw new LiveProblem(429, "Trop de lecteurs connectés.");
    const token = crypto.randomUUID() + crypto.randomUUID();
    p.leases.set(token, this.now() + 60000);
    this.leases.set(token, p);
    return this.result(p, token);
  }
  renew(id: string, token: string, release = false) {
    const p = this.leases.get(token);
    if (
      !p ||
      p.id !== id ||
      !p.leases.has(token) ||
      p.leases.get(token)! <= this.now()
    )
      throw new LiveProblem(410, "Lecture expirée. Relancez le lecteur.");
    if (release) {
      p.leases.delete(token);
      this.leases.delete(token);
      return { ok: true };
    }
    p.leases.set(token, this.now() + 60000);
    return this.result(p, token);
  }
  private result(p: Pipeline, token: string) {
    return {
      leaseToken: token,
      expiresAt: new Date(p.leases.get(token)!).toISOString(),
      playbackState: p.state,
      quality: p.quality,
      playlistUrl: `/media/lives/${p.key}/live.m3u8`,
    };
  }
  sweep() {
    for (const p of this.pipelines.values()) {
      for (const [t, expiry] of p.leases)
        if (expiry <= this.now()) {
          p.leases.delete(t);
          this.leases.delete(t);
        }
      if (!p.leases.size) this.stop(p.id);
    }
  }
  stop(id: string) {
    const p = this.pipelines.get(id);
    if (!p) return;
    this.pipelines.delete(id);
    for (const token of p.leases.keys()) this.leases.delete(token);
    p.controller.abort();
    p.proc?.kill();
    void rm(p.directory, { recursive: true, force: true });
  }
  close() {
    for (const id of this.pipelines.keys()) this.stop(id);
  }
  private async start(p: Pipeline, url: string) {
    try {
      // Fetch owns the network boundary. FFmpeg only receives bytes, never URLs or cookies.
      const response = await this.openSource(url, p.controller.signal);
      if (!response.ok || !response.body) throw new Error("MEDIA_FETCH_FAILED");
      await mkdir(p.directory, { recursive: true });
      p.controller.signal.throwIfAborted();
      const proc = Bun.spawn(
        [
          "ffmpeg",
          "-hide_banner",
          "-loglevel",
          "error",
          "-protocol_whitelist",
          "pipe",
          "-i",
          "pipe:0",
          "-map",
          "0:v:0",
          "-map",
          "0:a:0?",
          "-c",
          "copy",
          "-f",
          "hls",
          "-hls_time",
          "2",
          "-hls_list_size",
          "30",
          "-hls_flags",
          "delete_segments+temp_file+program_date_time",
          "-hls_segment_filename",
          join(p.directory, "seg_%09d.ts"),
          join(p.directory, "live.m3u8"),
        ],
        { stdin: "pipe", stdout: "ignore", stderr: "ignore" },
      );
      p.proc = proc;
      const reader = response.body.getReader();
      const pump = (async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            await proc.stdin.write(value);
          }
          await proc.stdin.end();
        } finally {
          await reader.cancel().catch(() => {});
        }
      })();
      const monitor = setInterval(() => {
        void this.checkSize(p).catch(() => {
          p.state = "unavailable";
          p.controller.abort();
          proc.kill();
        });
      }, 1500);
      try {
        await Promise.all([pump, proc.exited]);
      } finally {
        clearInterval(monitor);
      }
      if (!p.controller.signal.aborted) p.state = "unavailable";
    } catch {
      if (!p.controller.signal.aborted) p.state = "unavailable";
    } finally {
      p.controller.abort();
      p.proc?.kill();
      if (this.pipelines.get(p.id) !== p)
        await rm(p.directory, { recursive: true, force: true });
    }
  }
  private async checkSize(p: Pipeline) {
    const names = await readdir(p.directory);
    let total = 0;
    for (const name of names)
      total += (await stat(join(p.directory, name)).catch(() => ({ size: 0 })))
        .size;
    if (total > this.maxBytes / this.maxPipelines)
      throw new Error("MEDIA_DISK_LIMIT");
    if (names.includes("live.m3u8")) p.state = "ready";
  }
  async file(
    id: string,
    roomId: string,
    generation: string,
    name: string,
    head = false,
  ) {
    const p = this.pipelines.get(id);
    if (
      !p ||
      p.roomId !== roomId ||
      p.generation !== generation ||
      p.controller.signal.aborted ||
      !/^live\.m3u8$|^seg_\d{9}\.ts$/.test(name)
    )
      throw new LiveProblem(404, "Média indisponible.");
    const file = Bun.file(join(p.directory, name));
    if (!(await file.exists()))
      throw new LiveProblem(404, "Média en préparation.");
    return new Response(head ? null : file, {
      headers: {
        "Content-Type": name.endsWith(".ts")
          ? "video/mp2t"
          : "application/vnd.apple.mpegurl",
        "Cache-Control": name.endsWith(".ts")
          ? "public, max-age=31536000, immutable"
          : "no-store",
        "Access-Control-Allow-Origin": "*",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
}
