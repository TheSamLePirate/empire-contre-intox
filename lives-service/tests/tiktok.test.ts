import { test, expect } from "bun:test";
import { parseRoomStatus, probeRoomWithFallback } from "../tiktok.ts";
const offline = { user: { roomId: "7696611442368596768", nickname: "Ymir" }, liveRoom: { status: 4 } };
const signal = () => new AbortController().signal;
test("falls back to explicit offline status when room/info rejects an old room", async () => {
  const result = await probeRoomWithFallback(
    async () => ({ status_code: 4003110, data: { prompts: "" } }),
    [async () => offline], signal(),
  );
  expect(result.live).toBe(false);
  expect(result.roomId).toBe("7696611442368596768");
  expect(result.displayName).toBe("Ymir");
  expect(result.variants).toEqual([]);
});
test("keeps full metadata on successful details; falls through HTML to api-live if needed", async () => {
  let calls = 0;
  const full = await probeRoomWithFallback(
    async () => ({ data: { status: 2, id_str: "123", title: "Titre complet", user_count: 42 } }),
    [async () => { calls++; return offline; }], signal(),
  );
  expect(full.title).toBe("Titre complet"); expect(full.viewers).toBe(42); expect(calls).toBe(0);
  const fallback = await probeRoomWithFallback(
    async () => { throw Error("ROOM_UNAVAILABLE"); },
    [async () => { throw Error("HTML_BLOCKED"); }, async () => ({ statusCode: 0, data: { ...offline, liveRoom: { status: 2, title: "Live" } } })], signal(),
  );
  expect(fallback.live).toBe(true); expect(fallback.title).toBe("Live"); expect(fallback.variants).toEqual([]);
});
test("unavailable or ambiguous status never becomes offline", async () => {
  for (const response of [{}, { liveRoom: {} }, { ...offline, liveRoom: { status: 0 } }, { ...offline, liveRoom: { status: "4" } }, { statusCode: 10201, data: offline }]) {
    expect(() => parseRoomStatus(response)).toThrow();
    await expect(probeRoomWithFallback(async () => { throw Error("ROOM_UNAVAILABLE"); }, [async () => response], signal())).rejects.toThrow("ROOM_UNAVAILABLE");
  }
  expect(parseRoomStatus({ user: {}, liveRoom: { status: 4 } }).live).toBe(false);
  expect(() => parseRoomStatus({ user: {}, liveRoom: { status: 2 } })).toThrow("INVALID_ROOM_ID");
});
test("cancellation never triggers or accepts fallback requests", async () => {
  const controller = new AbortController(); let calls = 0;
  await expect(probeRoomWithFallback(async () => { controller.abort(); throw Error("DETAILS"); }, [async () => { calls++; return offline; }], controller.signal)).rejects.toThrow();
  expect(calls).toBe(0);
  const second = new AbortController();
  await expect(probeRoomWithFallback(async () => ({}), [async () => { second.abort(); return offline; }], second.signal)).rejects.toThrow();
});
