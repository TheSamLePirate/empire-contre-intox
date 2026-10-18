import { Database } from "bun:sqlite";
import { createHash } from "node:crypto";
import type { PublicLive } from "./protocol.ts";

export const DISCORD_GUILD_ID = "1427507687792443444";
export const DISCORD_CHANNEL_ID = "1443295072605962300";
const api = "https://discord.com/api/v10";
const clean = (value: string, max: number) => value.replace(/([\\`*_~|<>])/g, "\\$1").slice(0, max);
const date = (value: string | null) => value && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;

export function liveMessage(live: PublicLive, origin: string) {
  const player = new URL(`/lives/?live=${encodeURIComponent(live.id)}`, origin).href;
  const started = date(live.startedAt);
  const fields = [
    { name: "Créateur", value: clean(`${live.displayName} (@${live.username})`, 256), inline: true },
    { name: "Plateforme", value: "TikTok LIVE", inline: true },
  ];
  if (started !== null) fields.push({ name: "Début du live", value: `<t:${Math.floor(started / 1000)}:F> · <t:${Math.floor(started / 1000)}:R>`, inline: false });
  for (const [name, count] of [["Spectateurs", live.viewers], ["J’aime", live.likes]] as const)
    if (count !== null && Number.isFinite(count) && count >= 0)
      fields.push({ name, value: Math.floor(count).toLocaleString("fr-FR"), inline: true });
  return {
    allowed_mentions: { parse: [] },
    embeds: [{
      color: 0xfe2c55,
      author: { name: clean(`${live.displayName} est en live !`, 256), url: live.tiktokUrl, ...(live.avatarUrl ? { icon_url: live.avatarUrl } : {}) },
      title: clean(live.title?.trim() || `Le live de ${live.displayName} commence`, 256),
      url: player,
      description: `🔴 **En direct maintenant**\n\n[▶ Regarder sur ECI](${player}) · [Ouvrir TikTok](${live.tiktokUrl})`,
      fields,
      ...(live.avatarUrl ? { thumbnail: { url: live.avatarUrl } } : {}),
      ...(live.coverUrl ? { image: { url: live.coverUrl } } : {}),
      footer: { text: "L’Empire Contre-Intox • Amis en live • Statistiques à la détection" },
      timestamp: live.checkedAt ?? new Date().toISOString(),
    }],
  };
}
interface Delivery { key: string; payload: string; nonce: string; attempts: number; created: number; }

/** Durable transitions and outbox; polling errors never count as an offline observation. */
export class DiscordNotifier {
  private db: Database;
  private running: Promise<void> | null = null;
  private nextSend = 0;
  private disabled = false;
  constructor(
    path: string,
    private token: string,
    private origin: string,
    private eligible: (key: string) => boolean,
    private request: (url: string, init: RequestInit) => Promise<Response> = fetch,
    private now = Date.now,
  ) {
    this.db = new Database(path, { create: true });
    this.db.exec(`PRAGMA journal_mode=WAL;
      CREATE TABLE IF NOT EXISTS discord_observations (username TEXT PRIMARY KEY, room TEXT NOT NULL, live INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS discord_deliveries (key TEXT PRIMARY KEY, payload TEXT NOT NULL, nonce TEXT NOT NULL, status TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL, next_attempt INTEGER NOT NULL);`);
  }
  observe(live: PublicLive) {
    if (live.state !== "live" && live.state !== "offline" && live.state !== "ended") return;
    const key = `${live.username}:${live.roomId}`;
    const isLive = live.state === "live" && !!live.roomId;
    this.db.transaction(() => {
      const previous = this.db.query("SELECT room, live FROM discord_observations WHERE username = ?").get(live.username) as { room: string; live: number } | null;
      this.db.query("INSERT OR REPLACE INTO discord_observations VALUES (?, ?, ?)").run(live.username, live.roomId ?? "", Number(isLive));
      if (!isLive) {
        this.db.query("UPDATE discord_deliveries SET status = 'cancelled' WHERE key = ? AND status = 'pending'").run(key);
        return;
      }
      if (previous && previous.live && previous.room === live.roomId) return;
      const nonce = createHash("sha256").update(key).digest("hex").slice(0, 24);
      // First sighting establishes a baseline: don't announce existing streams on activation.
      this.db.query("INSERT OR IGNORE INTO discord_deliveries (key, payload, nonce, status, created, next_attempt) VALUES (?, ?, ?, ?, ?, ?)")
        .run(key, JSON.stringify(liveMessage(live, this.origin)), nonce, previous ? "pending" : "baseline", this.now(), this.now());
    })();
  }
  flush() {
    if (this.running) return this.running;
    this.running = this.sendNext().catch(() => {
      // Never log request headers, token, upstream bodies or creator data.
      console.error("Discord : envoi temporairement indisponible.");
      this.nextSend = this.now() + 10000;
    }).finally(() => { this.running = null; });
    return this.running;
  }
  private async sendNext() {
    if (this.disabled || this.now() < this.nextSend) return;
    const pending = this.db.query("SELECT key, payload, nonce, attempts, created FROM discord_deliveries WHERE status = 'pending' AND next_attempt <= ? ORDER BY created LIMIT 30").all(this.now()) as Delivery[];
    for (const row of pending) {
      if (this.now() - row.created > 600000) {
        this.db.query("UPDATE discord_deliveries SET status = 'expired' WHERE key = ?").run(row.key);
        continue;
      }
      if (!this.eligible(row.key)) continue;
      this.db.query("UPDATE discord_deliveries SET attempts = attempts + 1, next_attempt = ? WHERE key = ?")
        .run(this.now() + Math.min(60000, 2000 * 2 ** Math.min(row.attempts, 5)), row.key);
      const response = await this.request(`${api}/channels/${DISCORD_CHANNEL_ID}/messages`, {
        method: "POST",
        headers: { Authorization: `Bot ${this.token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ ...JSON.parse(row.payload), nonce: row.nonce, enforce_nonce: true }),
        signal: AbortSignal.timeout(10000),
      });
      if (response.ok) {
        this.db.query("UPDATE discord_deliveries SET status = 'sent' WHERE key = ?").run(row.key);
        const reset = Number(response.headers.get("x-ratelimit-reset-after"));
        this.nextSend = this.now() + (response.headers.get("x-ratelimit-remaining") === "0" && Number.isFinite(reset) ? Math.max(1000, reset * 1000) : 1000);
      } else if (response.status === 429) {
        const body = await response.json().catch(() => ({})) as { retry_after?: number };
        const retry = Number(body.retry_after ?? response.headers.get("retry-after") ?? 1);
        this.nextSend = this.now() + (Number.isFinite(retry) ? Math.max(1000, retry * 1000) : 1000);
      } else {
        console.error(`Discord : échec HTTP ${response.status}.`);
        if ([401, 403, 404].includes(response.status)) this.disabled = true;
        else if (response.status < 500) this.db.query("UPDATE discord_deliveries SET status = 'failed' WHERE key = ?").run(row.key);
      }
      await response.body?.cancel().catch(() => {});
      return;
    }
  }
  async close() { await this.running; this.db.close(); }
}
