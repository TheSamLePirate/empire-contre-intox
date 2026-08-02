import { Database } from "bun:sqlite";
import {
  DEFAULT_RATE_LIMIT,
  GITHUB_PAGES_PREFIX,
  MAX_DISTINCT_PATHS,
  RateLimiter,
  clientKey,
  corsOrigin,
  isAcceptablePath,
  isTrustedOrigin,
  normalizePath,
} from "./lib.ts";

const PORT = Number(process.env.PORT || 3001);
const DB_PATH = process.env.DB_PATH || "/data/visits.sqlite";
const MAX_PATHS = Number(process.env.MAX_DISTINCT_PATHS || MAX_DISTINCT_PATHS);

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
const bumpExisting = db.query<{ visits: number }, [string]>(`UPDATE page_visits
  SET visits = visits + 1, updated_at = CURRENT_TIMESTAMP
  WHERE path = ?
  RETURNING visits`);
const insertNew = db.query<
  { visits: number },
  [string]
>(`INSERT INTO page_visits(path, visits)
  VALUES (?, 1)
  RETURNING visits`);
const countDistinctPaths = db.query<{ n: number }, []>(
  "SELECT COUNT(*) AS n FROM page_visits",
);

let distinctPaths = countDistinctPaths.get()?.n ?? 0;

function migrateLegacyGithubPagesRows(): void {
  const legacyRows = db
    .query<
      {
        path: string;
        visits: number;
        created_at: string;
        updated_at: string;
      },
      [string, string]
    >(
      `SELECT path, visits, created_at, updated_at
    FROM page_visits
    WHERE path = ? OR path LIKE ?`,
    )
    .all(GITHUB_PAGES_PREFIX, `${GITHUB_PAGES_PREFIX}/%`);

  if (!legacyRows.length) return;

  const merge = db.query<
    unknown,
    [string, number, string, string]
  >(`INSERT INTO page_visits(path, visits, created_at, updated_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(path) DO UPDATE SET
      visits = page_visits.visits + excluded.visits,
      created_at = CASE
        WHEN excluded.created_at < page_visits.created_at THEN excluded.created_at
        ELSE page_visits.created_at
      END,
      updated_at = CASE
        WHEN excluded.updated_at > page_visits.updated_at THEN excluded.updated_at
        ELSE page_visits.updated_at
      END`);
  const remove = db.query<unknown, [string]>(
    "DELETE FROM page_visits WHERE path = ?",
  );

  for (const row of legacyRows) {
    const canonical = normalizePath(row.path);
    if (canonical === row.path) continue;
    merge.run(canonical, row.visits, row.created_at, row.updated_at);
    remove.run(row.path);
  }

  distinctPaths = countDistinctPaths.get()?.n ?? distinctPaths;
  console.log(
    `Merged ${legacyRows.length} legacy GitHub Pages visit counter row(s) into canonical paths.`,
  );
}

migrateLegacyGithubPagesRows();

/**
 * Incrémente le compteur d'une page.
 * @returns le nouveau total, ou `null` si le plafond de chemins distincts
 *          est atteint et que le chemin est inconnu.
 */
function recordVisit(path: string): number | null {
  const bumped = bumpExisting.get(path);
  if (bumped) return bumped.visits;

  // Chemin inconnu : on ne crée une ligne que sous le plafond, pour que
  // personne ne puisse faire grossir la base indéfiniment.
  if (distinctPaths >= MAX_PATHS) return null;

  const created = insertNew.get(path);
  distinctPaths += 1;
  return created?.visits ?? 1;
}

/** Surcharge d'un quota par variable d'environnement, sans reconstruire l'image. */
function envInt(name: string, fallback: number): number {
  const parsed = Number(process.env[name]);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

const limiter = new RateLimiter({
  windowMs: envInt("RATE_LIMIT_WINDOW_MS", DEFAULT_RATE_LIMIT.windowMs),
  maxPerClient: envInt(
    "RATE_LIMIT_PER_CLIENT",
    DEFAULT_RATE_LIMIT.maxPerClient,
  ),
  maxGlobal: envInt("RATE_LIMIT_GLOBAL", DEFAULT_RATE_LIMIT.maxGlobal),
  maxTrackedClients: envInt(
    "RATE_LIMIT_MAX_CLIENTS",
    DEFAULT_RATE_LIMIT.maxTrackedClients,
  ),
});
setInterval(() => limiter.sweep(Date.now()), 60_000).unref?.();

function corsHeaders(req: Request): HeadersInit {
  return {
    "Access-Control-Allow-Origin": corsOrigin(req.headers),
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(
  req: Request,
  body: unknown,
  status = 200,
  extra: HeadersInit = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(req),
      ...extra,
    },
  });
}

/** Corps JSON borné : au-delà, on refuse sans lire (nginx plafonne déjà à 16k). */
const MAX_BODY_BYTES = 4096;

async function pathFromRequest(req: Request): Promise<string> {
  const url = new URL(req.url);
  const fromQuery = url.searchParams.get("path");
  if (fromQuery) return normalizePath(fromQuery);

  if (req.method === "POST") {
    const declared = Number(req.headers.get("content-length") || 0);
    if (declared > MAX_BODY_BYTES) return "/";
    try {
      const body = await req.json();
      return normalizePath((body as { path?: unknown } | null)?.path);
    } catch {
      return "/";
    }
  }
  return "/";
}

const server = Bun.serve({
  port: PORT,
  maxRequestBodySize: MAX_BODY_BYTES,
  fetch: async (req) => {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(req) });
    }

    // Sonde interne du healthcheck Docker : ni quota, ni contrôle d'origine.
    if (url.pathname === "/health") {
      return json(req, { ok: true });
    }

    // Quota appliqué à tout le reste, lecture comprise.
    const decision = limiter.check(clientKey(req.headers), Date.now());
    if (!decision.allowed) {
      return json(
        req,
        { error: "rate_limited", reason: decision.reason },
        429,
        {
          "Retry-After": String(decision.retryAfter),
        },
      );
    }

    if (url.pathname === "/count" && req.method === "GET") {
      // Lecture seule : ouverte (le total est déjà affiché publiquement),
      // ce qui laisse fonctionner le contrôle de déploiement et
      // scripts/visit-counts.py, qui appellent en curl sans Origin.
      const path = await pathFromRequest(req);
      if (!isAcceptablePath(path))
        return json(req, { error: "invalid_path" }, 400);
      const row = selectCount.get(path);
      return json(req, { path, visits: row?.visits ?? 0 });
    }

    if (url.pathname === "/visit" && req.method === "POST") {
      // Écriture : réservée aux pages du site.
      if (!isTrustedOrigin(req.headers)) {
        return json(req, { error: "forbidden_origin" }, 403);
      }

      const path = await pathFromRequest(req);
      if (!isAcceptablePath(path))
        return json(req, { error: "invalid_path" }, 400);

      const visits = recordVisit(path);
      if (visits === null) {
        return json(req, { error: "path_capacity_reached" }, 507);
      }
      return json(req, { path, visits });
    }

    return json(req, { error: "not_found" }, 404);
  },
});

console.log(
  `ECI page visit counter listening on http://0.0.0.0:${server.port}`,
);
console.log(
  `Limits: ${MAX_PATHS} distinct paths max; writes restricted to site origins; per-IP + global rate limiting.`,
);
console.log(
  "Privacy: stores only normalized page path + aggregate visit count; no IP, cookie, or user-agent.",
);
