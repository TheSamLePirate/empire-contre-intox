import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/** Hostnames are confined to TikTok's CDN, not supplied by a visitor. */
export function safeImage(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 4096) return null;
  try {
    const u = new URL(value);
    const ok = [
      "tiktokcdn.com",
      "tiktokcdn-eu.com",
      "tiktokcdn-us.com",
      "tiktokcdn-eu.net",
      "tiktokcdn-us.net",
      "tiktokcdn.net",
      "byteoversea.com",
      "ibytedtos.com",
      "ibyteimg.com",
      "muscdn.com",
    ].some((d) => u.hostname === d || u.hostname.endsWith(`.${d}`));
    return u.protocol === "https:" &&
      !u.username &&
      !u.password &&
      !u.port &&
      ok
      ? u.href
      : null;
  } catch {
    return null;
  }
}
export function isPublicAddress(address: string): boolean {
  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number);
    return !(
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a >= 224 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 198 && (b === 18 || b === 19))
    );
  }
  // IPv4-mapped and non-global IPv6 are rejected conservatively.
  return (
    isIP(address) === 6 &&
    /^[23][0-9a-f]{3}:/i.test(address) &&
    !address.toLowerCase().startsWith("2001:db8:")
  );
}
export async function validateMediaUrl(value: string): Promise<string> {
  const url = safeImage(value);
  if (!url) throw new Error("MEDIA_HOST_DENIED");
  const records = await lookup(new URL(url).hostname, { all: true });
  if (!records.length || records.some((r) => !isPublicAddress(r.address)))
    throw new Error("MEDIA_ADDRESS_DENIED");
  return url;
}
