export interface WatchAccount {
  id: string;
  username: string;
  displayName: string;
  enabled: boolean;
  published: boolean;
  sortOrder: number;
  version: number;
}
export type LiveState = "unknown" | "offline" | "live" | "ended" | "error";
export interface Variant {
  quality: string;
  url: string;
}
export interface RoomInfo {
  roomId: string;
  live: boolean;
  title: string | null;
  displayName: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  startedAt: string | null;
  viewers: number | null;
  likes: number | null;
  variants: Variant[];
}
export interface ChatMessage {
  id: string;
  timestamp: string;
  username: string;
  nickname: string;
  avatarUrl: string | null;
  text: string;
}
export interface PublicLive {
  id: string;
  username: string;
  displayName: string;
  state: LiveState;
  roomId: string | null;
  title: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  checkedAt: string | null;
  startedAt: string | null;
  viewers: number | null;
  likes: number | null;
  tiktokUrl: string;
  qualities: string[];
  playback: {
    state: "idle" | "preparing" | "ready" | "unavailable";
    quality: string | null;
  };
  chatState: "connecting" | "connected" | "reconnecting" | "unavailable";
}
export interface Cursor {
  epoch: string;
  roomId: string | null;
  sequence: number;
}
export interface Snapshot {
  live: PublicLive;
  messages: ChatMessage[];
  cursor: Cursor;
}
export interface LiveEvent {
  id: string;
  sequence: number;
  timestamp: number;
  type: "chat" | "state" | "reset";
  data: ChatMessage | PublicLive | Snapshot;
}
export interface ChatCallbacks {
  message(message: ChatMessage): void;
  stats(stats: { viewers?: number; likes?: number }): void;
  connected(): void;
  disconnected(): void;
  ended(): void;
}
export interface Provider {
  probe(username: string, signal: AbortSignal): Promise<RoomInfo>;
  connect(
    username: string,
    roomId: string,
    callbacks: ChatCallbacks,
    signal: AbortSignal,
  ): Promise<() => void>;
}
export const finiteCount = (n: unknown): number | null =>
  typeof n === "number" && Number.isFinite(n) && n >= 0 ? n : null;
