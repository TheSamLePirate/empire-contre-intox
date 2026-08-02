/* ============================================================
   COMPTEUR DE VISITES — logique pure (sans Bun, sans SQLite)
   ------------------------------------------------------------
   Isolé de server.ts pour être testable par vitest (Node), qui
   ne sait pas importer `bun:sqlite`. Aucun effet de bord ici :
   uniquement de la normalisation, de la validation et des
   décisions de quota.
   ============================================================ */

export const GITHUB_PAGES_PREFIX = "/empire-contre-intox";

/** Seules origines autorisées à *incrémenter* le compteur. */
export const ALLOWED_ORIGINS: ReadonlySet<string> = new Set([
  "https://empire-contre-intox.com",
  "https://www.empire-contre-intox.com",
  "https://thesamlepirate.github.io",
]);

export const DEFAULT_ORIGIN = "https://empire-contre-intox.com";

/** Longueur maximale d'un chemin stocké. */
export const MAX_PATH_LENGTH = 256;

/**
 * Nombre maximal de chemins distincts stockés. Borne la taille de la
 * base : sans ce plafond, n'importe qui peut créer une ligne par
 * requête et remplir le volume `counter-data`.
 */
export const MAX_DISTINCT_PATHS = 2000;

/* ------------------------------------------------------------
   Normalisation du chemin
   ------------------------------------------------------------ */

export function normalizePath(input: unknown): string {
  let raw = typeof input === "string" ? input : "/";
  raw = raw.trim() || "/";

  try {
    if (/^https?:\/\//i.test(raw)) raw = new URL(raw).pathname;
  } catch {
    raw = "/";
  }

  raw = raw.split("#", 1)[0]!.split("?", 1)[0]!;
  if (!raw.startsWith("/")) raw = `/${raw}`;
  try {
    raw = decodeURI(raw);
  } catch {
    /* on garde la forme encodée */
  }
  raw = raw.replace(/\/+/g, "/");
  raw = raw.replace(/\/index\.html$/i, "/");

  // GitHub Pages sert le miroir sous /empire-contre-intox/ ; on stocke
  // toujours le chemin canonique du domaine principal pour agréger les visites.
  raw =
    raw.replace(new RegExp(`^${GITHUB_PAGES_PREFIX}(?=/|$)`, "i"), "") || "/";

  if (raw.length > MAX_PATH_LENGTH) raw = raw.slice(0, MAX_PATH_LENGTH);
  return raw || "/";
}

/* ------------------------------------------------------------
   Validation du chemin
   ------------------------------------------------------------
   Le compteur n'accepte que des chemins qui *ressemblent* à une page
   du site. Cela ne remplace pas une allowlist exacte (le conteneur ne
   connaît pas le manifeste), mais élimine le bruit et les tentatives
   d'injection de lignes exotiques. */

const SAFE_PATH_CHARS = /^[\p{L}\p{N}\/\-._~%()'+,;=:@!$&*]*$/u;
const CONTROL_CHARS = /[\x00-\x1f\x7f]/;

export function isAcceptablePath(path: string): boolean {
  if (typeof path !== "string") return false;
  if (path.length === 0 || path.length > MAX_PATH_LENGTH) return false;
  if (!path.startsWith("/")) return false;
  if (CONTROL_CHARS.test(path)) return false;
  if (path.includes("\\")) return false;
  // Pas de remontée de répertoire, même déjà décodée.
  if (path.split("/").includes("..")) return false;
  return SAFE_PATH_CHARS.test(path);
}

/* ------------------------------------------------------------
   Origine de la requête
   ------------------------------------------------------------ */

/** Origine déclarée : en-tête `Origin`, à défaut origine du `Referer`. */
export function requestOrigin(headers: Headers): string | null {
  const origin = headers.get("origin");
  if (origin && origin !== "null") return origin;

  const referer = headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      /* referer illisible */
    }
  }
  return null;
}

/** Vrai seulement si la requête vient d'une origine du site. */
export function isTrustedOrigin(headers: Headers): boolean {
  const origin = requestOrigin(headers);
  return origin !== null && ALLOWED_ORIGINS.has(origin);
}

/** Origine à renvoyer dans `Access-Control-Allow-Origin`. */
export function corsOrigin(headers: Headers): string {
  const origin = headers.get("origin");
  return origin && ALLOWED_ORIGINS.has(origin) ? origin : DEFAULT_ORIGIN;
}

/* ------------------------------------------------------------
   Adresse cliente
   ------------------------------------------------------------
   Nginx pose X-Forwarded-For ; l'entrée la plus à gauche est le client
   réel. Elle reste déclarative (donc falsifiable) : le quota par IP est
   une mesure anti-abus de bonne foi, pas une frontière de sécurité —
   d'où le quota global qui l'accompagne. */

export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const real = headers.get("x-real-ip");
  if (real) return real.trim().slice(0, 64);
  return "unknown";
}

/* ------------------------------------------------------------
   Limitation de débit
   ------------------------------------------------------------ */

export interface RateLimitOptions {
  /** Durée de la fenêtre, en millisecondes. */
  windowMs: number;
  /** Requêtes autorisées par client et par fenêtre. */
  maxPerClient: number;
  /** Requêtes autorisées, tous clients confondus, par fenêtre. */
  maxGlobal: number;
  /** Nombre maximal de clients suivis simultanément (borne mémoire). */
  maxTrackedClients: number;
}

/*
 * Valeurs volontairement larges : un lecteur qui enchaîne les dossiers ne
 * doit jamais être bloqué. Elles coupent l'abus en boucle, pas la lecture.
 *
 * ⚠ `maxPerClient` suppose que le proxy amont transmet bien
 * `X-Forwarded-For`. S'il ne le fait pas, tous les visiteurs partagent la
 * même clé et ce quota devient global : voir RATE_LIMIT_* dans
 * docker-compose.yml pour le relever sans reconstruire l'image.
 */
export const DEFAULT_RATE_LIMIT: RateLimitOptions = {
  windowMs: 60_000,
  maxPerClient: 120,
  maxGlobal: 6_000,
  maxTrackedClients: 10_000,
};

export type RateLimitReason = "client" | "global" | "capacity";

export interface RateLimitResult {
  allowed: boolean;
  reason?: RateLimitReason;
  /** Secondes à attendre avant de réessayer (en-tête Retry-After). */
  retryAfter: number;
}

interface Bucket {
  windowStart: number;
  count: number;
}

/**
 * Compteur à fenêtre fixe, par client et global.
 *
 * La table des clients est bornée : sans cela, un attaquant qui fait
 * varier `X-Forwarded-For` ferait grossir la Map indéfiniment — le
 * limiteur deviendrait lui-même le vecteur d'épuisement mémoire.
 */
export class RateLimiter {
  private readonly opts: RateLimitOptions;
  private readonly clients = new Map<string, Bucket>();
  private global: Bucket = { windowStart: 0, count: 0 };

  constructor(opts: Partial<RateLimitOptions> = {}) {
    this.opts = { ...DEFAULT_RATE_LIMIT, ...opts };
  }

  private retryAfter(windowStart: number, now: number): number {
    const remaining = windowStart + this.opts.windowMs - now;
    return Math.max(1, Math.ceil(remaining / 1000));
  }

  /** Purge les fenêtres expirées. */
  sweep(now: number): void {
    for (const [key, bucket] of this.clients) {
      if (now - bucket.windowStart >= this.opts.windowMs)
        this.clients.delete(key);
    }
  }

  get trackedClients(): number {
    return this.clients.size;
  }

  check(key: string, now: number): RateLimitResult {
    // Quota global d'abord : il protège même quand la clé client est falsifiée.
    if (now - this.global.windowStart >= this.opts.windowMs) {
      this.global = { windowStart: now, count: 0 };
    }
    if (this.global.count >= this.opts.maxGlobal) {
      return {
        allowed: false,
        reason: "global",
        retryAfter: this.retryAfter(this.global.windowStart, now),
      };
    }

    let bucket = this.clients.get(key);
    if (bucket && now - bucket.windowStart >= this.opts.windowMs) {
      this.clients.delete(key);
      bucket = undefined;
    }

    if (!bucket) {
      if (this.clients.size >= this.opts.maxTrackedClients) {
        this.sweep(now);
        // Toujours saturé après purge : on refuse plutôt que de grossir.
        if (this.clients.size >= this.opts.maxTrackedClients) {
          return {
            allowed: false,
            reason: "capacity",
            retryAfter: Math.ceil(this.opts.windowMs / 1000),
          };
        }
      }
      bucket = { windowStart: now, count: 0 };
      this.clients.set(key, bucket);
    }

    if (bucket.count >= this.opts.maxPerClient) {
      return {
        allowed: false,
        reason: "client",
        retryAfter: this.retryAfter(bucket.windowStart, now),
      };
    }

    bucket.count += 1;
    this.global.count += 1;
    return { allowed: true, retryAfter: 0 };
  }
}
