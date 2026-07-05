import { Database } from "bun:sqlite";

const PORT = Number(process.env.PORT || 3001);
const DB_PATH = process.env.DB_PATH || "/data/visits.sqlite";
const ALLOWED_ORIGINS = new Set([
  "https://empire-contre-intox.com",
  "https://www.empire-contre-intox.com",
  "https://thesamlepirate.github.io",
]);

const db = new Database(DB_PATH, { create: true });
db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA busy_timeout = 5000");
db.run(`CREATE TABLE IF NOT EXISTS page_visits (
  path TEXT PRIMARY KEY,
  visits INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);

const selectCount = db.query<{ visits: number }, [string]>(
  "SELECT visits FROM page_visits WHERE path = ?",
);
const insertOrIncrement = db.query<{ visits: number }, [string]>(`INSERT INTO page_visits(path, visits, updated_at)
  VALUES (?, 1, CURRENT_TIMESTAMP)
  ON CONFLICT(path) DO UPDATE SET
    visits = visits + 1,
    updated_at = CURRENT_TIMESTAMP
  RETURNING visits`);

function normalizePath(input: unknown): string {
  let raw = typeof input === "string" ? input : "/";
  raw = raw.trim() || "/";

  try {
    if (/^https?:\/\//i.test(raw)) raw = new URL(raw).pathname;
  } catch {
    raw = "/";
  }

  raw = raw.split("#", 1)[0]!.split("?", 1)[0]!;
  if (!raw.startsWith("/")) raw = `/${raw}`;
  try { raw = decodeURI(raw); } catch { /* keep undecoded */ }
  raw = raw.replace(/\/+/g, "/");
  raw = raw.replace(/\/index\.html$/i, "/");
  if (raw.length > 512) raw = raw.slice(0, 512);
  return raw || "/";
}

function corsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://empire-contre-intox.com";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(req: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(req),
    },
  });
}

async function pathFromRequest(req: Request): Promise<string> {
  const url = new URL(req.url);
  const fromQuery = url.searchParams.get("path");
  if (fromQuery) return normalizePath(fromQuery);
  if (req.method === "POST") {
    try {
      const body = await req.json();
      return normalizePath(body?.path);
    } catch {
      return "/";
    }
  }
  return "/";
}

const server = Bun.serve({
  port: PORT,
  fetch: async (req) => {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(req) });
    }

    if (url.pathname === "/health") {
      return json(req, { ok: true });
    }

    if (url.pathname === "/count" && req.method === "GET") {
      const path = await pathFromRequest(req);
      const row = selectCount.get(path);
      return json(req, { path, visits: row?.visits ?? 0 });
    }

    if (url.pathname === "/visit" && req.method === "POST") {
      const path = await pathFromRequest(req);
      const row = insertOrIncrement.get(path);
      return json(req, { path, visits: row?.visits ?? 1 });
    }

    return json(req, { error: "not_found" }, 404);
  },
});

console.log(`ECI page visit counter listening on http://0.0.0.0:${server.port}`);
console.log("Privacy: stores only normalized page path + aggregate visit count; no IP, cookie, or user-agent.");
