import type { WatchAccount } from "./protocol.ts";
import type { LiveRegistry } from "./watcher.ts";
export function parseAccounts(value: unknown): WatchAccount[] {
  if (
    !value ||
    typeof value !== "object" ||
    !Array.isArray((value as { accounts?: unknown }).accounts)
  )
    throw new Error("INVALID_CONFIG");
  const list = (value as { accounts: unknown[] }).accounts;
  if (list.length > 30) throw new Error("CONFIG_LIMIT");
  const ids = new Set<string>(),
    names = new Set<string>();
  return list.map((v) => {
    if (!v || typeof v !== "object") throw new Error("INVALID_ACCOUNT");
    const a = v as WatchAccount;
    if (
      typeof a.id !== "string" ||
      !/^[-a-zA-Z0-9_]{1,80}$/.test(a.id) ||
      typeof a.username !== "string" ||
      !/^[a-z0-9_][a-z0-9_.]{0,23}$/.test(a.username) ||
      typeof a.displayName !== "string" ||
      a.displayName.length > 80 ||
      typeof a.enabled !== "boolean" ||
      typeof a.published !== "boolean" ||
      !Number.isInteger(a.sortOrder) ||
      !Number.isInteger(a.version) ||
      ids.has(a.id) ||
      names.has(a.username)
    )
      throw new Error("INVALID_ACCOUNT");
    ids.add(a.id);
    names.add(a.username);
    return {
      id: a.id,
      username: a.username,
      displayName: a.displayName,
      enabled: a.enabled,
      published: a.published,
      sortOrder: a.sortOrder,
      version: a.version,
    };
  });
}
export function configClient(
  registry: LiveRegistry,
  url: string,
  token: string,
) {
  let etag = "",
    busy = false;
  return async () => {
    if (busy) return;
    busy = true;
    try {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };
      if (etag) headers["If-None-Match"] = etag;
      const response = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(1500),
        // Manual mode refuses redirects without misclassifying Bun 304 responses.
        redirect: "manual",
      });
      if (response.status === 304) {
        registry.validateConfig();
        return;
      }
      if (!response.ok) throw new Error("CONFIG_UNAVAILABLE");
      const raw = await response.text();
      if (raw.length > 64000) throw new Error("CONFIG_TOO_LARGE");
      registry.validateConfig(parseAccounts(JSON.parse(raw)));
      etag = response.headers.get("etag") ?? "";
    } catch {
      /* Freshness deadline in the registry closes public access. Never log tokens. */
    } finally {
      busy = false;
    }
  };
}
