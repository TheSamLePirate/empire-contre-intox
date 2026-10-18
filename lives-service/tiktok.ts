import {
  TikTokLiveConnection,
  ControlEvent,
  WebcastEvent,
  RoomIdRouteConfig,
  fetchRoomInfoFromHtmlRoute,
  fetchRoomInfoFromApiLiveRoute,
} from "tiktok-live-connector";
import type { Provider, RoomInfo, Variant, ChatCallbacks } from "./protocol.ts";
import { finiteCount } from "./protocol.ts";
import { safeImage } from "./security.ts";

// Provider payloads are deliberately narrowed at this boundary; none are exposed raw.
type RecordValue = Record<string, unknown>;
const record = (v: unknown): RecordValue =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as RecordValue) : {};
const str = (v: unknown, max = 500): string =>
  typeof v === "string" ? v.slice(0, max) : "";
const image = (v: unknown): string | null => {
  const r = record(v),
    list = r.url_list ?? r.urlList;
  return Array.isArray(list) ? safeImage(list[0]) : null;
};
export function parseRoom(value: unknown): RoomInfo {
  const envelope = record(value),
    d = record(envelope.data ?? envelope),
    owner = record(d.owner),
    stream = record(d.stream_url);
  if (d.status !== 2 && d.status !== 4) throw new Error("INVALID_ROOM_STATUS");
  const variants: Variant[] = [];
  const flv = record(stream.flv_pull_url);
  for (const [quality, url] of Object.entries(flv))
    if (quality !== "AO" && typeof url === "string" && safeImage(url))
      variants.push({ quality, url });
  // Some rooms expose SD2 only through SDK stream_data, not flv_pull_url.
  try {
    const sdk = record(stream.live_core_sdk_data),
      pull = record(sdk.pull_data);
    const parsed = record(JSON.parse(str(pull.stream_data, 1_000_000) || "{}"));
    for (const [quality, v] of Object.entries(record(parsed.data))) {
      const main = record(record(v).main),
        url = main.flv;
      if (
        quality.toUpperCase() !== "AO" &&
        typeof url === "string" &&
        safeImage(url) &&
        !variants.some((x) => x.url === url)
      )
        variants.push({ quality: quality.toUpperCase(), url });
    }
  } catch {
    /* Optional SDK data is not a requirement for room metadata. */
  }
  const rank = (q: string) =>
    q === "SD2"
      ? 0
      : /^(LD|LD1)$/.test(q)
        ? 1
        : /^(SD|SD1)$/.test(q)
          ? 2
          : /^(HD|HD1)$/.test(q)
            ? 3
            : /FULL_HD/.test(q)
              ? 4
              : 5;
  variants.sort((a, b) => rank(a.quality) - rank(b.quality));
  const seconds = Number(d.create_time);
  const roomId = String(d.id_str ?? d.id ?? "");
  if (!/^\d{1,30}$/.test(roomId)) throw new Error("INVALID_ROOM_ID");
  return {
    roomId,
    live: d.status === 2,
    title: str(d.title) || null,
    displayName: str(owner.nickname, 80),
    avatarUrl: image(owner.avatar_thumb),
    coverUrl: image(d.cover),
    startedAt:
      Number.isFinite(seconds) && seconds > 0
        ? new Date(seconds * 1000).toISOString()
        : null,
    viewers: finiteCount(d.user_count),
    likes: finiteCount(d.like_count),
    variants,
  };
}
// The lightweight status routes can still work when the old room/info endpoint
// rejects an ended room. Only explicit 2/4 statuses are authoritative.
export function parseRoomStatus(value: unknown): RoomInfo {
  const envelope = record(value);
  if (envelope.statusCode !== undefined && envelope.statusCode !== 0)
    throw new Error("INVALID_STATUS_RESPONSE");
  const data = record(envelope.data ?? envelope);
  const user = record(data.user), live = record(data.liveRoom);
  if (live.status !== 2 && live.status !== 4)
    throw new Error("INVALID_LIVE_STATUS");
  const roomId = typeof user.roomId === "string" && /^[1-9]\d{0,29}$/.test(user.roomId)
    ? user.roomId : "";
  if (live.status === 2 && !roomId) throw new Error("INVALID_ROOM_ID");
  return {
    roomId,
    live: live.status === 2,
    title: str(live.title) || null,
    displayName: str(user.nickname, 80),
    avatarUrl: image(user.avatarThumb ?? user.avatar_thumb),
    coverUrl: image(live.cover) ?? safeImage(live.coverUrl),
    // Status-only responses use a different schema: leave unsupported fields absent.
    startedAt: null,
    viewers: null,
    likes: null,
    variants: [],
  };
}
export async function probeRoomWithFallback(
  details: () => Promise<unknown>,
  statuses: (() => Promise<unknown>)[],
  signal: AbortSignal,
): Promise<RoomInfo> {
  signal.throwIfAborted();
  try {
    const result = await details();
    signal.throwIfAborted();
    return parseRoom(result);
  } catch (error) {
    signal.throwIfAborted();
    for (const status of statuses) {
      try {
        const result = await status();
        signal.throwIfAborted();
        return parseRoomStatus(result);
      } catch {
        signal.throwIfAborted();
      }
    }
    throw error;
  }
}
export function createTikTokProvider(
  sessionId: string,
  ttTargetIdc = "",
): Provider {
  RoomIdRouteConfig.skipFetchRoomIdFromEulerRoute = true;
  const connection = (username: string, signal: AbortSignal) => {
    const conn = new TikTokLiveConnection(username, {
      authenticateWs: false,
      useMobile: false,
      fetchRoomInfoOnConnect: false,
      enableExtendedGiftInfo: false,
      ...(sessionId
        ? {
            session: {
              cookie: {
                type: "cookie" as const,
                value: { sessionId, ttTargetIdc },
              },
            },
          }
        : {}),
    });
    // Override this instance's documented transport, so cancellation reaches the
    // actual HTTP request instead of merely abandoning a Promise.race.
    const request = conn.webClient.request.bind(conn.webClient);
    conn.webClient.request = (params) =>
      request({
        ...params,
        signal,
        retry: { limit: 0 },
        timeout: { request: 10000 },
      });
    return conn;
  };
  return {
    async probe(username, signal) {
      const conn = connection(username, signal);
      const stop = () => {
        conn.disconnect();
      };
      signal.throwIfAborted();
      signal.addEventListener("abort", stop, { once: true });
      try {
        const args = { uniqueId: username, webClient: conn.webClient };
        return await probeRoomWithFallback(
          () => conn.fetchRoomInfo(),
          [
            () => fetchRoomInfoFromHtmlRoute(args),
            () => fetchRoomInfoFromApiLiveRoute(args),
          ],
          signal,
        );
      } finally {
        signal.removeEventListener("abort", stop);
        conn.disconnect();
      }
    },
    async connect(username, roomId, callbacks: ChatCallbacks, signal) {
      const conn = connection(username, signal);
      let stopped = false;
      const stop = () => {
        if (stopped) return;
        stopped = true;
        conn.disconnect();
        conn.removeAllListeners();
        signal.removeEventListener("abort", stop);
      };
      conn.on(ControlEvent.ERROR, () => {
        /* Parent reconnects on disconnect; never log raw provider errors. */
      });
      conn.on(ControlEvent.CONNECTED, () => {
        if (!stopped) callbacks.connected();
      });
      conn.on(ControlEvent.DISCONNECTED, () => {
        if (!stopped) callbacks.disconnected();
      });
      conn.on(WebcastEvent.STREAM_END, () => {
        if (!stopped) callbacks.ended();
      });
      conn.on(WebcastEvent.CHAT, (raw) => {
        if (stopped) return;
        const m = record(raw),
          user = record(m.user),
          common = record(m.common);
        callbacks.message({
          id: str(common.msgId) || crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          username: str(user.displayId ?? user.uniqueId, 80) || "invité",
          nickname: str(user.nickname, 80) || "Invité",
          avatarUrl: image(user.avatarThumb),
          text: str(m.content ?? m.comment, 2000),
        });
      });
      conn.on(WebcastEvent.ROOM_USER, (raw) => {
        const m = record(raw);
        const v = finiteCount(m.viewerCount ?? m.total);
        if (v !== null) callbacks.stats({ viewers: v });
      });
      conn.on(WebcastEvent.LIKE, (raw) => {
        const m = record(raw);
        const v = finiteCount(m.totalLikeCount ?? m.total);
        if (v !== null) callbacks.stats({ likes: v });
      });
      signal.throwIfAborted();
      signal.addEventListener("abort", stop, { once: true });
      try {
        await conn.connect(roomId);
        if (signal.aborted) {
          stop();
          signal.throwIfAborted();
        }
        return stop;
      } catch {
        stop();
        throw new Error("CHAT_UNAVAILABLE");
      }
    },
  };
}
