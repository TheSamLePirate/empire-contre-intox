/**
 * « Prochainement » — le programme des futurs lives, géré dans l'administration.
 *
 * SQLite est la source de vérité. À la première ouverture, le programme publié
 * jusqu'ici en dur dans `prochainement.html` est importé depuis
 * `prochainement-seed.json` (une seule fois : le marqueur `upcoming_seeded`
 * empêche de recréer un live supprimé). L'ordre d'affichage donne le numéro
 * public (01, 02…) ; il se réordonne librement.
 */
import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import type { Store } from "./store.ts";
import { reencodeImage } from "./images.ts";
import { Problem, object, revision, text } from "./validation.ts";

export const THEMES = [
  { id: "lois", label: "Lois du réel" },
  { id: "cosmos", label: "Cosmos" },
  { id: "terre", label: "Terre" },
  { id: "vivant", label: "Vivant" },
] as const;
type Theme = (typeof THEMES)[number]["id"];
const THEME_IDS = new Set<string>(THEMES.map((t) => t.id));
export const MAX_UPCOMING = 200;
const MAX_MEDIA = 500;
const MEDIA_PREFIX = "/api/calendar/upcoming/media/";
const ASSET_IMAGE = /^assets\/prochainement\/[A-Za-z0-9_-]{1,60}\.(?:webp|jpe?g|png)$/;
const ASSET_VIDEO = /^assets\/prochainement\/[A-Za-z0-9_-]{1,60}\.mp4$/;
const MEDIA_PATH = /^\/api\/calendar\/upcoming\/media\/[a-zA-Z0-9_-]{1,80}$/;

export interface UpcomingData {
  theme: Theme;
  title: string;
  hook: string;
  duration: string;
  teaser: string[];
  /** Site asset (`assets/prochainement/NN.webp`) or uploaded poster (`/api/calendar/upcoming/media/<id>`). */
  image: string;
  /** Optional animated loop: a site asset only (`assets/prochainement/NN.mp4`). */
  video: string | null;
  published: boolean;
}
export interface Upcoming extends UpcomingData {
  id: string;
  sortOrder: number;
  version: number;
  updatedAt: string;
  updatedBy: string | null;
  deletedAt?: string | null;
  deletedBy?: string | null;
}
interface Row {
  id: string;
  data: string;
  sort_order: number;
  version: number;
  updated_at: string;
  updated_by: string | null;
  deleted: number;
  deleted_at: string | null;
}

export function initUpcoming(store: Store) {
  store.db.exec(`CREATE TABLE IF NOT EXISTS upcoming_lives(
    id TEXT PRIMARY KEY, data TEXT NOT NULL, sort_order INTEGER NOT NULL,
    version INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_by TEXT);
    CREATE TABLE IF NOT EXISTS upcoming_audit(id INTEGER PRIMARY KEY AUTOINCREMENT,
    live_id TEXT NOT NULL, actor TEXT NOT NULL, action TEXT NOT NULL, data TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS upcoming_media(id TEXT PRIMARY KEY, label TEXT NOT NULL,
    hash TEXT NOT NULL UNIQUE, created_by TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
    INSERT OR IGNORE INTO metadata(key,value) VALUES('upcoming_revision','1');`);
  const columns = new Set(
    store.all<{ name: string }>("PRAGMA table_info(upcoming_lives)").map((c) => c.name),
  );
  if (!columns.has("deleted"))
    store.db.exec("ALTER TABLE upcoming_lives ADD COLUMN deleted INTEGER NOT NULL DEFAULT 0");
  if (!columns.has("deleted_at"))
    store.db.exec("ALTER TABLE upcoming_lives ADD COLUMN deleted_at TEXT");
}

/** Imports the historical programme once. Returns the number of imported lives. */
export function seedUpcoming(store: Store, seedPath: string | undefined): number {
  if (store.one("SELECT key FROM metadata WHERE key='upcoming_seeded'")) return 0;
  if (!seedPath || !existsSync(seedPath)) return 0;
  const seed = object(JSON.parse(readFileSync(seedPath, "utf8")));
  if (!Array.isArray(seed.lives)) throw new Error("Programme initial invalide.");
  const lives: unknown[] = seed.lives;
  return store.atomic(() => {
    if (store.one("SELECT key FROM metadata WHERE key='upcoming_seeded'")) return 0;
    lives.forEach((live, i) => {
      const data = upcomingData({ published: true, ...object(live) });
      store.run(
        "INSERT INTO upcoming_lives(id,data,sort_order,updated_by) VALUES(?,?,?,?)",
        randomUUID(),
        JSON.stringify(data),
        i,
        "import",
      );
    });
    store.run("INSERT INTO metadata(key,value) VALUES('upcoming_seeded','1')");
    bump(store);
    return lives.length;
  });
}

const line = (value: unknown, label: string, max: number, required = true) => {
  const v = text(value, label, max, required);
  if (/[\n\r\u2028\u2029]/.test(v)) throw new Problem(400, `${label} : une seule ligne.`);
  return v;
};
export function upcomingData(input: Record<string, unknown>): UpcomingData {
  const theme = input.theme;
  if (typeof theme !== "string" || !THEME_IDS.has(theme))
    throw new Problem(400, "Thème invalide.");
  const teaserInput = Array.isArray(input.teaser)
    ? input.teaser
    : typeof input.teaser === "string"
      ? input.teaser.split(/\r?\n/)
      : null;
  if (!teaserInput) throw new Problem(400, "Teasing invalide.");
  const teaser = teaserInput
    .map((l) => (typeof l === "string" ? l.trim() : ""))
    .filter(Boolean);
  if (teaser.length > 16)
    throw new Problem(400, "Teasing : 16 lignes maximum.");
  teaser.forEach((l) => line(l, "Ligne du teasing", 300));
  const image = typeof input.image === "string" ? input.image.trim() : "";
  if (image && !ASSET_IMAGE.test(image) && !MEDIA_PATH.test(image))
    throw new Problem(400, "Image invalide : choisissez-la dans la bibliothèque.");
  const video =
    typeof input.video === "string" && input.video.trim() ? input.video.trim() : null;
  if (video && !ASSET_VIDEO.test(video))
    throw new Problem(400, "Vidéo invalide : choisissez-la dans la bibliothèque.");
  if (typeof input.published !== "boolean")
    throw new Problem(400, "Publication invalide.");
  return {
    theme: theme as Theme,
    title: line(input.title, "Titre", 160),
    hook: line(input.hook ?? "", "Accroche", 300, false),
    duration: line(input.duration, "Durée", 40),
    teaser,
    image,
    video,
    published: input.published,
  };
}

function bump(store: Store) {
  store.run(
    "UPDATE metadata SET value=CAST(value AS INTEGER)+1 WHERE key='upcoming_revision'",
  );
}
export function upcomingRevision(store: Store): number {
  return Number(
    store.one<{ value: string }>(
      "SELECT value FROM metadata WHERE key='upcoming_revision'",
    )?.value ?? 0,
  );
}
/** Programme in display order. Lives in the trash (`deleted`) are excluded unless asked. */
export function upcomingLives(store: Store, trash = false): Upcoming[] {
  return store
    .all<Row>(
      `SELECT * FROM upcoming_lives WHERE deleted=? ORDER BY ${trash ? "deleted_at DESC," : ""} sort_order, created_at, id`,
      trash ? 1 : 0,
    )
    .map((r) => ({
      id: r.id,
      ...(JSON.parse(r.data) as UpcomingData),
      sortOrder: r.sort_order,
      version: r.version,
      updatedAt: r.updated_at,
      updatedBy: r.updated_by,
      ...(trash ? { deletedAt: r.deleted_at, deletedBy: r.updated_by } : {}),
    }));
}
function audit(store: Store, id: string, actor: string, action: string, data: unknown) {
  store.run(
    "INSERT INTO upcoming_audit(live_id,actor,action,data) VALUES(?,?,?,?)",
    id,
    actor,
    action,
    JSON.stringify(data),
  );
  store.run(
    "DELETE FROM upcoming_audit WHERE id NOT IN (SELECT id FROM upcoming_audit ORDER BY id DESC LIMIT 2000)",
  );
}
/** Keeps only the editable fields of a live (history snapshots, restorations). */
function pick(value: unknown): UpcomingData | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  try {
    return upcomingData({
      theme: v.theme,
      title: v.title,
      hook: v.hook,
      duration: v.duration,
      teaser: v.teaser,
      image: v.image,
      video: v.video,
      published: v.published,
    });
  } catch {
    return null;
  }
}
const state = (store: Store) => ({
  lives: upcomingLives(store),
  trash: upcomingLives(store, true),
  revision: upcomingRevision(store),
});
/** Rewrites sort_order 0..n-1 for the live programme in the given order. */
function writeOrder(store: Store, order: string[]) {
  order.forEach((lid, i) =>
    store.run("UPDATE upcoming_lives SET sort_order=? WHERE id=?", i, lid),
  );
}
const positionOf = (value: unknown, length: number): number | null =>
  Number.isInteger(value) && Number(value) >= 0
    ? Math.min(Number(value), length)
    : null;
const current = (store: Store, id: string) => {
  const live = upcomingLives(store).find((l) => l.id === id);
  if (live) return live;
  if (upcomingLives(store, true).some((l) => l.id === id))
    throw new Problem(409, "Ce live est dans la corbeille. Restaurez-le d’abord.");
  throw new Problem(404, "Live introuvable : il a peut-être été supprimé.");
};

export function saveUpcoming(
  store: Store,
  id: string | null,
  input: unknown,
  actor: string,
  remove = false,
) {
  const body = object(input);
  return store.atomic(() => {
    const all = upcomingLives(store);
    const before = id ? current(store, id) : null;
    if (before && revision(body.version) !== before.version)
      throw new Problem(409, "Ce live a été modifié entre-temps : rouvrez-le pour voir la version actuelle.");
    if (remove) {
      // Soft delete: the live goes to the trash and can be restored.
      store.run(
        "UPDATE upcoming_lives SET deleted=1,deleted_at=CURRENT_TIMESTAMP,version=version+1,updated_at=CURRENT_TIMESTAMP,updated_by=? WHERE id=?",
        actor,
        before!.id,
      );
      writeOrder(store, all.filter((l) => l.id !== before!.id).map((l) => l.id));
      audit(store, before!.id, actor, "delete", { before: pick(before) });
      bump(store);
      return state(store);
    }
    const data = upcomingData(body);
    const order = all.map((l) => l.id);
    if (before) {
      store.run(
        "UPDATE upcoming_lives SET data=?,version=version+1,updated_at=CURRENT_TIMESTAMP,updated_by=? WHERE id=?",
        JSON.stringify(data),
        actor,
        before.id,
      );
      audit(store, before.id, actor, "update", { before: pick(before), after: data });
      // Optional move in the same save (0-based `position`).
      const position = positionOf(body.position, all.length - 1);
      const index = order.indexOf(before.id);
      if (position !== null && position !== index) {
        order.splice(index, 1);
        order.splice(position, 0, before.id);
        writeOrder(store, order);
        audit(store, "*", actor, "reorder", { moved: before.id, from: index, to: position });
      }
    } else {
      if (all.length + upcomingLives(store, true).length >= MAX_UPCOMING)
        throw new Problem(409, `Limite de ${MAX_UPCOMING} lives atteinte (corbeille comprise).`);
      // `position` (0-based) inserts the new live; by default it goes last.
      const position = positionOf(body.position, all.length) ?? all.length;
      const newId = randomUUID();
      order.splice(position, 0, newId);
      store.run(
        "INSERT INTO upcoming_lives(id,data,sort_order,updated_by) VALUES(?,?,?,?)",
        newId,
        JSON.stringify(data),
        position,
        actor,
      );
      writeOrder(store, order);
      audit(store, newId, actor, "create", { after: data });
    }
    bump(store);
    return state(store);
  });
}

/** Brings a live back from the trash, at the end of the programme (or at `position`). */
export function restoreUpcoming(store: Store, id: string, input: unknown, actor: string) {
  const body = object(input);
  return store.atomic(() => {
    const trashed = upcomingLives(store, true).find((l) => l.id === id);
    if (!trashed) throw new Problem(404, "Ce live n’est plus dans la corbeille.");
    if (revision(body.version) !== trashed.version)
      throw new Problem(409, "Ce live a été modifié entre-temps. Rechargez la liste.");
    const order = upcomingLives(store).map((l) => l.id);
    order.splice(positionOf(body.position, order.length) ?? order.length, 0, id);
    store.run(
      "UPDATE upcoming_lives SET deleted=0,deleted_at=NULL,version=version+1,updated_at=CURRENT_TIMESTAMP,updated_by=? WHERE id=?",
      actor,
      id,
    );
    writeOrder(store, order);
    audit(store, id, actor, "restore", { after: pick(trashed) });
    bump(store);
    return state(store);
  });
}

/** Permanently removes a live already in the trash (administrators only, checked by the route). */
export function purgeUpcoming(store: Store, id: string, input: unknown, actor: string) {
  const body = object(input);
  return store.atomic(() => {
    const trashed = upcomingLives(store, true).find((l) => l.id === id);
    if (!trashed) throw new Problem(404, "Ce live n’est plus dans la corbeille.");
    if (revision(body.version) !== trashed.version)
      throw new Problem(409, "Ce live a été modifié entre-temps. Rechargez la liste.");
    store.run("DELETE FROM upcoming_lives WHERE id=?", id);
    audit(store, id, actor, "purge", { before: pick(trashed) });
    bump(store);
    return state(store);
  });
}

export interface UpcomingHistoryEntry {
  id: number;
  action: string;
  actor: string;
  createdAt: string;
  /** Content of the live right after this change (before it, for a deletion). */
  data: UpcomingData | null;
}
export function upcomingHistory(store: Store, id: string): UpcomingHistoryEntry[] {
  const rows = store.all<{ id: number; action: string; actor: string; created_at: string; data: string }>(
    "SELECT id,action,actor,created_at,data FROM upcoming_audit WHERE live_id=? ORDER BY id DESC LIMIT 100",
    id,
  );
  const entries: UpcomingHistoryEntry[] = rows.map((r) => {
    const d = JSON.parse(r.data) as { before?: unknown; after?: unknown };
    return { id: r.id, action: r.action, actor: r.actor, createdAt: r.created_at, data: pick(d.after) ?? pick(d.before) };
  });
  // Lives imported from the original programme have no "create" entry: the
  // content before their oldest change stays restorable as « version d'origine ».
  const oldest = rows.at(-1);
  if (oldest && oldest.action !== "create") {
    const before = pick((JSON.parse(oldest.data) as { before?: unknown }).before);
    if (before)
      entries.push({ id: -oldest.id, action: "initial", actor: "import", createdAt: oldest.created_at, data: before });
  }
  return entries;
}
/** Restores the content of a history entry as a new version of a live in the programme. */
export function restoreUpcomingVersion(store: Store, id: string, input: unknown, actor: string) {
  const body = object(input);
  const entry = upcomingHistory(store, id).find((h) => h.id === body.historyId);
  if (!entry?.data) throw new Problem(404, "Version introuvable dans l’historique.");
  return saveUpcoming(store, id, { ...entry.data, version: body.version }, actor);
}

/** Publishes or hides several lives at once; every version must still be current. */
export function publishUpcoming(store: Store, input: unknown, actor: string) {
  const body = object(input);
  if (typeof body.published !== "boolean" || !Array.isArray(body.items) || !body.items.length || body.items.length > MAX_UPCOMING)
    throw new Problem(400, "Sélection invalide.");
  return store.atomic(() => {
    const all = new Map(upcomingLives(store).map((l) => [l.id, l]));
    const items = (body.items as unknown[]).map((i) => object(i));
    for (const item of items) {
      const live = typeof item.id === "string" ? all.get(item.id) : undefined;
      if (!live) throw new Problem(404, "Un des lives sélectionnés n’existe plus. Rechargez la liste.");
      if (revision(item.version) !== live.version)
        throw new Problem(409, `« ${live.title} » a été modifié entre-temps. Rechargez la liste.`);
    }
    let changed = 0;
    for (const item of items) {
      const live = all.get(item.id as string)!;
      if (live.published === body.published) continue;
      const data = { ...pick(live)!, published: body.published };
      store.run(
        "UPDATE upcoming_lives SET data=?,version=version+1,updated_at=CURRENT_TIMESTAMP,updated_by=? WHERE id=?",
        JSON.stringify(data),
        actor,
        live.id,
      );
      audit(store, live.id, actor, body.published ? "publish" : "hide", { before: pick(live), after: data });
      changed++;
    }
    if (changed) bump(store);
    return { ...state(store), changed };
  });
}

/** Rewrites the whole order. `revision` guards against a concurrent edit of the list. */
export function reorderUpcoming(store: Store, input: unknown, actor: string) {
  const body = object(input);
  return store.atomic(() => {
    if (revision(body.revision) !== upcomingRevision(store))
      throw new Problem(409, "Le programme a changé entre-temps. Rechargez la liste.");
    const current = upcomingLives(store).map((l) => l.id);
    const order = body.order;
    if (
      !Array.isArray(order) ||
      order.length !== current.length ||
      new Set(order).size !== order.length ||
      order.some((id) => typeof id !== "string" || !current.includes(id))
    )
      throw new Problem(400, "Ordre invalide. Rechargez la liste.");
    writeOrder(store, order as string[]);
    audit(store, "*", actor, "reorder", { before: current, after: order });
    bump(store);
    return state(store);
  });
}

/** Public JSON: published lives only, numbered in display order. */
export function upcomingPublic(store: Store, origin: string) {
  const lives = upcomingLives(store).filter((l) => l.published);
  return {
    schemaVersion: 1,
    revision: upcomingRevision(store),
    generatedAt: new Date().toISOString(),
    themes: THEMES,
    lives: lives.map((l, i) => {
      const label = THEMES.find((t) => t.id === l.theme)!.label;
      return {
        id: l.id,
        number: String(i + 1).padStart(2, "0"),
        theme: l.theme,
        tag: label.toUpperCase(),
        title: l.title,
        hook: l.hook,
        duration: l.duration,
        teaser: l.teaser,
        image: l.image.startsWith("/") ? `${origin}${l.image}` : l.image,
        video: l.video,
      };
    }),
  };
}

export interface UpcomingMedia {
  id: string;
  label: string;
  path: string;
}
/** Picture library offered in the editor: historical posters, videos and uploads. */
export function upcomingLibrary(store: Store, origin: string) {
  const lives = upcomingLives(store);
  const images = new Set<string>(),
    videos = new Set<string>();
  for (let n = 1; n <= 48; n++) {
    const nn = String(n).padStart(2, "0");
    images.add(`assets/prochainement/${nn}.webp`);
    if (n !== 24 && n !== 30) videos.add(`assets/prochainement/${nn}.mp4`);
  }
  for (const l of lives) {
    if (l.image && ASSET_IMAGE.test(l.image)) images.add(l.image);
    if (l.video) videos.add(l.video);
  }
  const uploads = store
    .all<{ id: string; label: string }>(
      "SELECT id,label FROM upcoming_media ORDER BY created_at DESC, id",
    )
    .map((m) => ({ id: m.id, label: m.label, path: `${MEDIA_PREFIX}${m.id}`, url: `${origin}${MEDIA_PREFIX}${m.id}` }));
  return {
    images: [...images].sort(),
    videos: [...videos].sort(),
    uploads,
  };
}

export async function saveUpcomingMedia(
  store: Store,
  directory: string,
  file: File,
  label: unknown,
  userId: string,
  authorize: () => void,
): Promise<UpcomingMedia> {
  const title = text(label || file.name || "Affiche", "Nom de l'image", 120);
  // Same 3:2-ish frame as the historical posters (640 × 430), at a sharper size.
  const output = await reencodeImage(file, 960, 645);
  authorize();
  const hash = createHash("sha256").update(output).digest("hex");
  const duplicate = store.one<{ id: string; label: string }>(
    "SELECT id,label FROM upcoming_media WHERE hash=?",
    hash,
  );
  if (duplicate)
    return { ...duplicate, path: `${MEDIA_PREFIX}${duplicate.id}` };
  mkdirSync(directory, { recursive: true });
  const id = randomUUID(),
    temp = join(directory, `${id}.tmp`),
    target = join(directory, `${id}.webp`);
  try {
    await Bun.write(temp, output);
    store.atomic(() => {
      authorize();
      if (store.one<{ n: number }>("SELECT COUNT(*) n FROM upcoming_media")!.n >= MAX_MEDIA)
        throw new Problem(409, "Bibliothèque d'affiches pleine. Contactez un administrateur.");
      renameSync(temp, target);
      store.run(
        "INSERT INTO upcoming_media(id,label,hash,created_by) VALUES(?,?,?,?)",
        id,
        title,
        hash,
        userId,
      );
    });
  } catch (error) {
    for (const path of [temp, target])
      try {
        unlinkSync(path);
      } catch {
        /* Already absent. */
      }
    throw error;
  }
  return { id, label: title, path: `${MEDIA_PREFIX}${id}` };
}
export function upcomingMediaFile(store: Store, directory: string, id: string) {
  if (!store.one("SELECT id FROM upcoming_media WHERE id=?", id)) return null;
  return Bun.file(join(directory, `${id}.webp`));
}
