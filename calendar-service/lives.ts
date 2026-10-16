import { randomUUID } from "node:crypto";
import type { Store } from "./store.ts";
import { Problem, object, revision } from "./validation.ts";

export interface WatchAccount {
  id: string;
  username: string;
  displayName: string;
  enabled: boolean;
  published: boolean;
  sortOrder: number;
  version: number;
}
interface Row {
  id: string;
  username: string;
  display_name: string;
  enabled: number;
  published: number;
  sort_order: number;
  version: number;
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
