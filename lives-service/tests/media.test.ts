import { test, expect } from "bun:test";
import { mkdtemp, rm, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { MediaManager } from "../media.ts";
const available = !!Bun.which("ffmpeg");
test.skipIf(!available)(
  "two synthetic FLV sources play independently; leases expire and stop only their pipeline",
  async () => {
    const root = await mkdtemp(join(tmpdir(), "eci-multi-media-"));
    let clock = Date.now();
    const sources: Bun.Subprocess[] = [];
    const open = async (_url: string, signal: AbortSignal) => {
      const proc = Bun.spawn(
        [
          "ffmpeg",
          "-hide_banner",
          "-loglevel",
          "error",
          "-re",
          "-f",
          "lavfi",
          "-i",
          "testsrc=size=160x120:rate=10",
          "-f",
          "lavfi",
          "-i",
          "sine=frequency=440",
          "-t",
          "30",
          "-c:v",
          "libx264",
          "-preset",
          "ultrafast",
          "-pix_fmt",
          "yuv420p",
          "-g",
          "10",
          "-c:a",
          "aac",
          "-f",
          "flv",
          "pipe:1",
        ],
        { stdin: "ignore", stdout: "pipe", stderr: "ignore" },
      );
      sources.push(proc);
      signal.addEventListener("abort", () => proc.kill(), { once: true });
      return new Response(proc.stdout);
    };
    const media = new MediaManager(
      root,
      2,
      () => clock,
      50 * 1024 * 1024,
      open,
    );
    await media.init();
    try {
      const variants = [
        { quality: "HD1", url: "https://unused.tiktokcdn.com/synthetic" },
      ];
      await expect(media.acquire("a", "123", [])).rejects.toThrow("Aucun flux");
      const a = await media.acquire("a", "123", variants),
        b = await media.acquire("b", "456", variants);
      await expect(media.acquire("c", "789", variants)).rejects.toThrow(
        "Capacité",
      );
      for (let i = 0; i < 30 && media.state("a").state !== "ready"; i++)
        await Bun.sleep(250);
      expect(media.state("a").state).toBe("ready");
      expect(media.state("b").state).toBe("ready");
      const gen = a.playlistUrl.split("/")[5];
      const response = await media.file("a", "123", gen, "live.m3u8");
      const playlist = await response.text();
      expect(playlist).toContain("#EXTINF");
      media.stop("b");
      expect((await media.file("a", "123", gen, "live.m3u8")).status).toBe(200);
      expect(() => media.renew("a", b.leaseToken)).toThrow();
      media.renew("a", a.leaseToken);
      clock += 60001;
      media.sweep();
      expect(media.state("a").state).toBe("idle");
      expect(() => media.renew("a", a.leaseToken)).toThrow();
    } finally {
      media.close();
      for (const p of sources) p.kill();
      await Promise.all(sources.map((p) => p.exited));
      await rm(root, { recursive: true, force: true });
    }
  },
  15000,
);
