import type {
  WatchAccount,
  Provider,
  RoomInfo,
  PublicLive,
  ChatMessage,
  LiveEvent,
  Cursor,
  Snapshot,
} from "./protocol.ts";
import type { MediaManager } from "./media.ts";
import { LiveProblem } from "./media.ts";
interface Runtime {
  account: WatchAccount;
  state: PublicLive["state"];
  room: RoomInfo | null;
  checked: number;
  nextProbe: number;
  failures: number;
  error: string | null;
  busy: boolean;
  alive: boolean;
  controller: AbortController | null;
  chatController: AbortController | null;
  stopChat: (() => void) | null;
  chatState: PublicLive["chatState"];
  nextChat: number;
  chatBusy: boolean;
  messages: ChatMessage[];
  messageIds: Set<string>;
  events: LiveEvent[];
  sequence: number;
  subscribers: Set<(event: LiveEvent) => void>;
}
export class LiveRegistry {
  readonly epoch = crypto.randomUUID();
  private entries = new Map<string, Runtime>();
  private validatedAt: number | null = null;
  private activeProbes = 0;
  private closing = false;
  constructor(
    private provider: Provider,
    readonly media: MediaManager,
    private now = Date.now,
    private probeTimeout = 3000,
    private onObservation?: (live: PublicLive) => void,
  ) {}
  validateConfig(accounts?: WatchAccount[]) {
    this.validatedAt = this.now();
    if (!accounts) return;
    const incoming = new Map(accounts.map((a) => [a.id, a]));
    for (const [id, r] of this.entries) {
      const a = incoming.get(id);
      if (
        !a ||
        a.username !== r.account.username ||
        !a.enabled ||
        (!a.published && r.account.published)
      ) {
        this.dispose(r);
        this.entries.delete(id);
      }
    }
    for (const a of accounts) {
      const current = this.entries.get(a.id);
      if (current) {
        current.account = a;
        continue;
      }
      this.entries.set(a.id, {
        account: a,
        state: "unknown",
        room: null,
        checked: 0,
        nextProbe: this.now(),
        failures: 0,
        error: null,
        busy: false,
        alive: true,
        controller: null,
        chatController: null,
        stopChat: null,
        chatState: "unavailable",
        nextChat: 0,
        chatBusy: false,
        messages: [],
        messageIds: new Set(),
        events: [],
        sequence: 0,
        subscribers: new Set(),
      });
    }
  }
  fresh() {
    return this.validatedAt !== null && this.now() - this.validatedAt < 15000;
  }
  private prune(r: Runtime) {
    const oldest = this.now() - 600000;
    r.messages = r.messages
      .filter((m) => Date.parse(m.timestamp) > oldest)
      .slice(-200);
    r.messageIds = new Set(r.messages.map((m) => m.id));
    r.events = r.events.filter((e) => e.timestamp > oldest).slice(-400);
  }
  private public(r: Runtime): PublicLive {
    const room = r.room;
    const stale = r.checked > 0 && this.now() - r.checked > 150000;
    return {
      id: r.account.id,
      username: r.account.username,
      displayName:
        r.account.displayName || room?.displayName || r.account.username,
      state: stale ? "error" : r.state,
      roomId: room?.roomId ?? null,
      title: room?.title ?? null,
      avatarUrl: room?.avatarUrl ?? null,
      coverUrl: room?.coverUrl ?? null,
      checkedAt: r.checked ? new Date(r.checked).toISOString() : null,
      startedAt: room?.startedAt ?? null,
      viewers: room?.viewers ?? null,
      likes: room?.likes ?? null,
      tiktokUrl: `https://www.tiktok.com/@${r.account.username}/live`,
      qualities: room?.variants.map((v) => v.quality) ?? [],
      playback: this.media.state(r.account.id),
      chatState: r.chatState,
    };
  }
  list() {
    if (!this.fresh())
      throw new LiveProblem(
        503,
        "Le suivi des lives est temporairement indisponible.",
      );
    return {
      schemaVersion: 1,
      epoch: this.epoch,
      generatedAt: new Date(this.now()).toISOString(),
      accounts: [...this.entries.values()]
        .filter((r) => r.account.enabled && r.account.published)
        .sort(
          (a, b) =>
            a.account.sortOrder - b.account.sortOrder ||
            a.account.id.localeCompare(b.account.id),
        )
        .map((r) => this.public(r)),
    };
  }
  get(id: string): Runtime {
    if (!this.fresh())
      throw new LiveProblem(
        503,
        "Le suivi des lives est temporairement indisponible.",
      );
    const r = this.entries.get(id);
    if (!r || !r.alive || !r.account.enabled || !r.account.published)
      throw new LiveProblem(404, "Live introuvable.");
    return r;
  }
  snapshot(id: string): Snapshot {
    const r = this.get(id);
    this.prune(r);
    return {
      live: this.public(r),
      messages: r.messages,
      cursor: {
        epoch: this.epoch,
        roomId: r.room?.roomId ?? null,
        sequence: r.sequence,
      },
    };
  }
  private emit(r: Runtime, type: LiveEvent["type"], data: LiveEvent["data"]) {
    if (!r.alive) return;
    this.prune(r);
    const sequence = ++r.sequence;
    const event = {
      id: `${this.epoch}:${r.room?.roomId ?? "none"}:${sequence}`,
      sequence,
      timestamp: this.now(),
      type,
      data,
    };
    r.events.push(event);
    if (r.events.length > 400) r.events.shift();
    for (const listener of r.subscribers) listener(event);
  }
  subscribe(
    id: string,
    cursor: Cursor | null,
    listener: (event: LiveEvent) => void,
  ): () => void {
    const r = this.get(id);
    this.prune(r);
    if (r.subscribers.size >= 200)
      throw new LiveProblem(429, "Trop de connexions au chat.");
    // This entire operation is synchronous: no event can interleave replay and subscription.
    const oldest = r.events[0]?.sequence ?? r.sequence + 1;
    if (
      !cursor ||
      cursor.epoch !== this.epoch ||
      cursor.roomId !== (r.room?.roomId ?? null) ||
      cursor.sequence < oldest - 1 ||
      cursor.sequence > r.sequence
    )
      listener({
        id: `${this.epoch}:${r.room?.roomId ?? "none"}:${r.sequence}`,
        sequence: r.sequence,
        timestamp: this.now(),
        type: "reset",
        data: this.snapshot(id),
      });
    else
      for (const e of r.events) if (e.sequence > cursor.sequence) listener(e);
    r.subscribers.add(listener);
    return () => r.subscribers.delete(listener);
  }
  private stopChat(r: Runtime) {
    r.chatController?.abort();
    r.stopChat?.();
    r.chatController = null;
    r.stopChat = null;
    r.chatBusy = false;
    r.chatState = "unavailable";
  }
  private dispose(r: Runtime) {
    this.emit(r, "state", { ...this.public(r), state: "ended" });
    r.alive = false;
    r.controller?.abort();
    this.stopChat(r);
    this.media.stop(r.account.id);
    r.subscribers.clear();
  }
  async tick() {
    if (this.closing) return;
    this.media.sweep();
    if (!this.fresh()) {
      for (const r of this.entries.values()) {
        this.stopChat(r);
        this.media.stop(r.account.id);
      }
      return;
    }
    const due = [...this.entries.values()]
      .filter((r) => r.account.enabled && !r.busy && r.nextProbe <= this.now())
      .sort((a, b) => a.nextProbe - b.nextProbe);
    const jobs: Promise<void>[] = [];
    for (const r of due) {
      if (this.activeProbes >= 2) break;
      this.activeProbes++;
      r.busy = true;
      jobs.push(
        this.probe(r).finally(() => {
          this.activeProbes--;
          r.busy = false;
        }),
      );
    }
    for (const r of this.entries.values())
      if (
        r.state === "live" &&
        r.account.enabled &&
        !r.chatBusy &&
        !r.stopChat &&
        this.now() >= r.nextChat
      )
        void this.chat(r);
    await Promise.all(jobs);
  }
  private async probe(r: Runtime) {
    const controller = new AbortController();
    r.controller = controller;
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const room = await Promise.race([
        this.provider.probe(r.account.username, controller.signal),
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => {
            controller.abort();
            reject(new Error("PROBE_TIMEOUT"));
          }, this.probeTimeout);
        }),
      ]);
      if (!r.alive || controller.signal.aborted) return;
      const changed = r.room?.roomId !== room.roomId;
      if (changed) {
        this.stopChat(r);
        this.media.stop(r.account.id);
        r.messages = [];
        r.messageIds.clear();
        r.events = [];
      }
      r.room = room;
      r.checked = this.now();
      r.failures = 0;
      r.error = null;
      r.state = room.live ? "live" : "offline";
      r.nextProbe = this.now() + 60000;
      if (!room.live) {
        this.stopChat(r);
        this.media.stop(r.account.id);
      }
      if (r.account.published && this.fresh()) {
        try { this.onObservation?.(this.public(r)); }
        catch { console.error("Discord : observation non enregistrée."); }
      }
      this.emit(r, "state", this.public(r));
      if (room.live && !r.stopChat && !r.chatBusy && this.now() >= r.nextChat)
        void this.chat(r);
    } catch {
      if (!r.alive) return;
      r.error = "CHECK_UNAVAILABLE";
      r.state = r.state === "live" ? "live" : "error";
      r.failures++;
      r.nextProbe =
        this.now() +
        Math.min(600000, 10000 * 2 ** Math.min(r.failures - 1, 6)) *
          (0.9 + Math.random() * 0.2);
      this.emit(r, "state", this.public(r));
    } finally {
      clearTimeout(timer);
      controller.abort();
      if (r.controller === controller) r.controller = null;
    }
  }
  private async chat(r: Runtime) {
    if (!r.room) return;
    const controller = new AbortController();
    r.chatController = controller;
    r.chatBusy = true;
    r.chatState = "connecting";
    const current = () => r.alive && !controller.signal.aborted && this.fresh();
    const update = () => {
      if (current()) this.emit(r, "state", this.public(r));
    };
    const retry = () => {
      if (!current()) return;
      this.stopChat(r);
      r.chatState = "reconnecting";
      r.nextChat = this.now() + 30000;
      r.nextProbe = Math.min(r.nextProbe, this.now() + 10000);
      this.emit(r, "state", this.public(r));
    };
    const timeout = setTimeout(() => {
      if (current()) {
        controller.abort();
        r.chatBusy = false;
        r.chatState = "unavailable";
        r.nextChat = this.now() + 60000;
      }
    }, 15000);
    try {
      const stop = await this.provider.connect(
        r.account.username,
        r.room.roomId,
        {
          connected: () => {
            if (current()) {
              r.chatState = "connected";
              update();
            }
          },
          disconnected: retry,
          ended: () => {
            if (current()) {
              r.state = "ended";
              r.checked = this.now();
              this.media.stop(r.account.id);
              this.emit(r, "state", this.public(r));
              this.stopChat(r);
              r.nextProbe = this.now() + 60000;
            }
          },
          message: (m) => {
            if (!current() || r.state !== "live" || !m.text) return;
            this.prune(r);
            if (r.messageIds.has(m.id)) return;
            r.messages.push(m);
            r.messageIds.add(m.id);
            this.emit(r, "chat", m);
          },
          stats: (s) => {
            if (current() && r.room) {
              if (s.viewers !== undefined) r.room.viewers = s.viewers;
              if (s.likes !== undefined) r.room.likes = s.likes;
              update();
            }
          },
        },
        controller.signal,
      );
      if (!current()) stop();
      else r.stopChat = stop;
    } catch {
      if (current()) {
        r.chatState = "unavailable";
        r.nextChat = this.now() + 60000;
        update();
      }
    } finally {
      clearTimeout(timeout);
      if (r.chatController === controller) r.chatBusy = false;
    }
  }
  async playback(id: string) {
    const r = this.get(id);
    if (this.public(r).state !== "live" || !r.room)
      throw new LiveProblem(409, "Ce compte n’est pas actuellement en direct.");
    return this.media.acquire(id, r.room.roomId, r.room.variants);
  }
  diagnostics() {
    return {
      fresh: this.fresh(),
      validatedAt: this.validatedAt,
      accounts: [...this.entries.values()].map((r) => ({
        ...this.public(r),
        nextRetryAt: new Date(r.nextProbe).toISOString(),
        error: r.error,
      })),
    };
  }
  close() {
    this.closing = true;
    for (const r of this.entries.values()) this.dispose(r);
    this.media.close();
  }
}
