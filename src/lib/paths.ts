export const CANONICAL_ORIGIN = "https://empire-contre-intox.com";

function normalizeBase(base: string): string {
  const trimmed = base.trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

export function withBase(path: string, base = import.meta.env.BASE_URL): string {
  if (/^(?:[a-z]+:|#)/i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizeBase(base)}${normalizedPath}` || "/";
}

export function canonicalUrl(path: string): URL {
  return new URL(path.startsWith("/") ? path : `/${path}`, CANONICAL_ORIGIN);
}
