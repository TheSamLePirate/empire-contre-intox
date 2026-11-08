import { randomUUID } from "node:crypto";
import type { Store } from "./store.ts";
import { Problem, object, revision } from "./validation.ts";

export interface LiveDossier {
  /** Site-relative page, e.g. `provoxys/son/index.html` or `provoxys/son/#acte-2`. */
  path: string;
  title: string;
  /** The TikTok room this dossier belongs to: a new live never inherits it. */
  roomId: string;
}
export interface WatchAccount {
  id: string;
  username: string;
  displayName: string;
  enabled: boolean;
  published: boolean;
  sortOrder: number;
  version: number;
  dossier: LiveDossier | null;
}
interface Row {
  id: string;
  username: string;
  display_name: string;
  enabled: number;
  published: number;
  sort_order: number;
  version: number;
  dossier_path: string | null;
  dossier_title: string | null;
  dossier_room: string | null;
}
const SITE_HOSTS = [
  "empire-contre-intox.com",
  "www.empire-contre-intox.com",
  "thesamlepirate.github.io",
];
/** Pages that must never be framed as a live dossier. */
const FORBIDDEN = /^(?:api|media|lives|empire-calendrier\/admin|\.)/i;
export function normalizeDossierPath(value: unknown): string {
  let raw = typeof value === "string" ? value.trim() : "";
  if (!raw || raw.length > 400)
    throw new Problem(400, "Choisissez une page du site.");
  if (/^https?:\/\//i.test(raw)) {
    let url: URL;
    try {
      url = new URL(raw);
    } catch {
      throw new Problem(400, "Adresse du dossier invalide.");
    }
    if (!SITE_HOSTS.includes(url.hostname) || url.search)
      throw new Problem(
        400,
        "Le dossier doit être une page du site Empire contre Intox.",
      );
    raw =
      url.pathname.replace(/^\/empire-contre-intox(?=\/)/, "") + url.hash;
  }
  raw = raw.replace(/^(?:\.\.?\/)+/, "").replace(/^\/+/, "");
  const [path, fragment, ...rest] = raw.split("#");
  if (
    rest.length ||
    !/^[A-Za-z0-9_-][A-Za-z0-9._~\/-]{0,199}$/.test(path) ||
    path.includes("..") ||
    path.includes("//") ||
    !/(?:\.html|\/)$/.test(path) ||
    FORBIDDEN.test(path) ||
    (fragment !== undefined && !/^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,79}$/.test(fragment))
  )
    throw new Problem(
      400,
      "Page du dossier invalide : indiquez par exemple provoxys/son/index.html.",
    );
  return fragment === undefined ? path : `${path}#${fragment}`;
}
export function normalizeUsername(value: unknown): string {
  let name = typeof value === "string" ? value.trim() : "";
  if (/^https?:\/\//i.test(name)) {
    let url: URL;
    try {
      url = new URL(name);
    } catch {
      throw new Problem(400, "Adresse TikTok invalide.");
    }
    if (
      url.protocol !== "https:" ||
      !["tiktok.com", "www.tiktok.com"].includes(url.hostname) ||
      url.search ||
      url.hash
    )
      throw new Problem(
        400,
        "Utilisez une adresse https://www.tiktok.com/@pseudo/live.",
      );
    name = /^\/@([^/]+)(?:\/live)?\/?$/.exec(url.pathname)?.[1] ?? "";
  }
  name = name.replace(/^@/, "").toLowerCase();
  if (
    !/^[a-z0-9_](?:[a-z0-9_.]{0,22}[a-z0-9_])?$/.test(name) ||
    name.includes("..")
  )
    throw new Problem(400, "Pseudo TikTok invalide (24 caractères maximum).");
  return name;
}
export function initLives(store: Store) {
  store.db.exec(`CREATE TABLE IF NOT EXISTS live_watch_accounts(
    id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL,
    enabled INTEGER NOT NULL, published INTEGER NOT NULL, sort_order INTEGER NOT NULL,
    version INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_by TEXT);
    CREATE TABLE IF NOT EXISTS live_watch_audit(id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id TEXT NOT NULL, actor TEXT NOT NULL, action TEXT NOT NULL, data TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);`);
  const columns = new Set(
    store
      .all<{ name: string }>("PRAGMA table_info(live_watch_accounts)")
      .map((c) => c.name),
  );
  for (const column of ["dossier_path", "dossier_title", "dossier_room"])
    if (!columns.has(column))
      store.db.exec(`ALTER TABLE live_watch_accounts ADD COLUMN ${column} TEXT`);
  store.atomic(() => {
    if (store.one("SELECT key FROM metadata WHERE key='lives_seeded'")) return;
    for (const [i, username] of ["provoxys", "ghost.navigator.ghost"].entries())
      store.run(
        "INSERT OR IGNORE INTO live_watch_accounts(id,username,display_name,enabled,published,sort_order) VALUES(?,?,?,1,1,?)",
        randomUUID(),
        username,
        "",
        i,
      );
    store.run("INSERT INTO metadata(key,value) VALUES('lives_seeded','1')");
    store.run(
      "INSERT OR IGNORE INTO metadata(key,value) VALUES('lives_revision','1')",
    );
  });
}
export function watchAccounts(store: Store): WatchAccount[] {
  return store
    .all<Row>("SELECT * FROM live_watch_accounts ORDER BY sort_order,id")
    .map((r) => ({
      id: r.id,
      username: r.username,
      displayName: r.display_name,
      enabled: !!r.enabled,
      published: !!r.published,
      sortOrder: r.sort_order,
      version: r.version,
      dossier:
        r.dossier_path && r.dossier_room
          ? {
              path: r.dossier_path,
              title: r.dossier_title || "Le dossier du live",
              roomId: r.dossier_room,
            }
          : null,
    }));
}
export function watchRevision(store: Store) {
  return (
    store.one<{ value: string }>(
      "SELECT value FROM metadata WHERE key='lives_revision'",
    )?.value ?? "0"
  );
}
export function saveWatchAccount(
  store: Store,
  id: string | null,
  input: unknown,
  actor: string,
  remove = false,
) {
  const data = object(input);
  return store.atomic(() => {
    const before = id ? watchAccounts(store).find((a) => a.id === id) : null;
    if (id && !before) throw new Problem(404, "Compte TikTok introuvable.");
    if (before && revision(data.version) !== before.version)
      throw new Problem(409, "Ce compte a été modifié. Rechargez la liste.");
    if (!before && watchAccounts(store).length >= 30)
      throw new Problem(400, "Limite de 30 comptes atteinte.");
    const accountId = id ?? randomUUID();
    if (remove)
      store.run("DELETE FROM live_watch_accounts WHERE id=?", accountId);
    else {
      const username = normalizeUsername(data.username);
      const displayName =
        typeof data.displayName === "string" ? data.displayName.trim() : "";
      if (
        displayName.length > 80 ||
        typeof data.enabled !== "boolean" ||
        typeof data.published !== "boolean" ||
        !Number.isInteger(data.sortOrder) ||
        Number(data.sortOrder) < 0 ||
        Number(data.sortOrder) > 9999
      )
        throw new Problem(400, "Libellé, ordre ou options invalides.");
      if (
        store.one(
          "SELECT id FROM live_watch_accounts WHERE username=? AND id<>?",
          username,
          accountId,
        )
      )
        throw new Problem(409, "Ce compte est déjà surveillé.");
      if (before)
        store.run(
          "UPDATE live_watch_accounts SET username=?,display_name=?,enabled=?,published=?,sort_order=?,version=version+1,updated_at=CURRENT_TIMESTAMP,updated_by=? WHERE id=?",
          username,
          displayName,
          +data.enabled,
          +data.published,
          Number(data.sortOrder),
          actor,
          accountId,
        );
      else
        store.run(
          "INSERT INTO live_watch_accounts(id,username,display_name,enabled,published,sort_order,updated_by) VALUES(?,?,?,?,?,?,?)",
          accountId,
          username,
          displayName,
          +data.enabled,
          +data.published,
          Number(data.sortOrder),
          actor,
        );
    }
    store.run(
      "UPDATE metadata SET value=CAST(value AS INTEGER)+1 WHERE key='lives_revision'",
    );
    store.run(
      "INSERT INTO live_watch_audit(account_id,actor,action,data) VALUES(?,?,?,?)",
      accountId,
      actor,
      remove ? "delete" : before ? "update" : "create",
      JSON.stringify({
        before,
        after: watchAccounts(store).find((a) => a.id === accountId) ?? null,
      }),
    );
    store.run(
      "DELETE FROM live_watch_audit WHERE id NOT IN (SELECT id FROM live_watch_audit ORDER BY id DESC LIMIT 1000)",
    );
    return { accounts: watchAccounts(store), revision: watchRevision(store) };
  });
}

/** Attach (or detach) the dossier shown beside one specific live room. */
export function setLiveDossier(
  store: Store,
  id: string,
  input: unknown,
  actor: string,
) {
  const data = object(input);
  return store.atomic(() => {
    const before = watchAccounts(store).find((a) => a.id === id);
    if (!before) throw new Problem(404, "Compte TikTok introuvable.");
    if (revision(data.version) !== before.version)
      throw new Problem(409, "Ce compte a été modifié. Rechargez la liste.");
    let dossier: LiveDossier | null = null;
    if (data.dossier !== null) {
      const value = object(data.dossier);
      const path = normalizeDossierPath(value.path);
      const title = typeof value.title === "string" ? value.title.trim() : "";
      const roomId = typeof value.roomId === "string" ? value.roomId : "";
      if (!title || title.length > 160 || /[\u0000-\u001f]/.test(title))
        throw new Problem(400, "Titre du dossier invalide (160 caractères maximum).");
      if (!/^\d{1,30}$/.test(roomId))
        throw new Problem(
          409,
          "Ce compte n’est pas en direct : le dossier s’associe à un live en cours.",
        );
      dossier = { path, title, roomId };
    }
    store.run(
      "UPDATE live_watch_accounts SET dossier_path=?,dossier_title=?,dossier_room=?,version=version+1,updated_at=CURRENT_TIMESTAMP,updated_by=? WHERE id=?",
      dossier?.path ?? null,
      dossier?.title ?? null,
      dossier?.roomId ?? null,
      actor,
      id,
    );
    store.run(
      "UPDATE metadata SET value=CAST(value AS INTEGER)+1 WHERE key='lives_revision'",
    );
    store.run(
      "INSERT INTO live_watch_audit(account_id,actor,action,data) VALUES(?,?,?,?)",
      id,
      actor,
      "dossier",
      JSON.stringify({ before: before.dossier, after: dossier }),
    );
    return { accounts: watchAccounts(store), revision: watchRevision(store) };
  });
}
