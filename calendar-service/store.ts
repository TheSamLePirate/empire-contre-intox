import { initLives } from "./lives.ts";
import { Database, type SQLQueryBindings } from "bun:sqlite";
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import {
  Problem,
  nameKey,
  text,
  ids,
  revision,
  eventData,
  type EventData,
} from "./validation.ts";

export interface UserRow {
  id: string;
  login: string;
  display_name: string;
  password_hash: string;
  role: "admin" | "user";
  active: number;
  must_change: number;
}
export interface HostRow {
  id: string;
  name: string;
  name_key: string;
  avatar_ids: string;
  version: number;
}
export interface AvatarRow {
  id: string;
  label: string;
  path: string;
  hash: string;
  created_by: string | null;
}
export interface EventRow {
  id: string;
  data: string;
  version: number;
  deleted: number;
  created_at: string;
  updated_at: string;
}
export interface HistoryRow {
  id: number;
  event_id: string;
  data: string;
  version: number;
  deleted: number;
  actor: string;
  action: string;
  created_at: string;
}
interface SeedEvent {
  time: string;
  title: string;
  host?: string;
  avatar?: string | string[];
  note?: string;
  url?: string;
}
interface Seed {
  hosts?: Record<string, string[]>;
  months: Record<string, { events: Record<string, SeedEvent | SeedEvent[]> }>;
  [key: string]: unknown;
}
export class Store {
  db: Database;
  constructor(path: string, seedPath?: string) {
    if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
    this.db = new Database(path, { create: true, strict: true });
    this.db
      .exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; PRAGMA foreign_keys=ON;
      CREATE TABLE IF NOT EXISTS metadata(key TEXT PRIMARY KEY, value TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, login TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin','user')), active INTEGER NOT NULL DEFAULT 1, must_change INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE IF NOT EXISTS sessions(hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), csrf TEXT NOT NULL, expires INTEGER NOT NULL);
      CREATE INDEX IF NOT EXISTS session_expiry ON sessions(expires);
      CREATE TABLE IF NOT EXISTS avatars(id TEXT PRIMARY KEY, label TEXT NOT NULL, path TEXT NOT NULL UNIQUE, hash TEXT NOT NULL UNIQUE, created_by TEXT REFERENCES users(id));
      CREATE TABLE IF NOT EXISTS hosts(id TEXT PRIMARY KEY, name TEXT NOT NULL, name_key TEXT NOT NULL UNIQUE, avatar_ids TEXT NOT NULL DEFAULT '[]', version INTEGER NOT NULL DEFAULT 1);
      CREATE TABLE IF NOT EXISTS events(id TEXT PRIMARY KEY, data TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1, deleted INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS history(id INTEGER PRIMARY KEY AUTOINCREMENT, event_id TEXT NOT NULL REFERENCES events(id), data TEXT NOT NULL,
        version INTEGER NOT NULL, deleted INTEGER NOT NULL, actor TEXT NOT NULL, action TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
      CREATE INDEX IF NOT EXISTS event_history ON history(event_id, id);`);
    initLives(this);
    if (
      !this.all<{ name: string }>("PRAGMA table_info(users)").some(
        (c) => c.name === "display_name",
      )
    )
      this.db.exec(
        "ALTER TABLE users ADD COLUMN display_name TEXT NOT NULL DEFAULT ''",
      );
    if (!this.one("SELECT key FROM metadata WHERE key='seeded'")) {
      if (!seedPath || !existsSync(seedPath))
        throw new Error("Source initiale du calendrier introuvable.");
      this.importSeed(JSON.parse(readFileSync(seedPath, "utf8")));
    }
  }
  one<T = Record<string, unknown>>(
    sql: string,
    ...args: SQLQueryBindings[]
  ): T | null {
    return this.db.query<T, SQLQueryBindings[]>(sql).get(...args);
  }
  all<T = Record<string, unknown>>(
    sql: string,
    ...args: SQLQueryBindings[]
  ): T[] {
    return this.db.query<T, SQLQueryBindings[]>(sql).all(...args);
  }
  run(sql: string, ...args: SQLQueryBindings[]) {
    return this.db.query(sql).run(...args);
  }
  atomic<T>(fn: () => T): T {
    return this.db.transaction(fn).immediate();
  }
  importSeed(seed: Seed) {
    this.atomic(() => {
      const hostByName = new Map<string, string>();
      const avatarByPath = new Map<string, string>();
      const image = (path: string) => {
        if (!/^[a-zA-Z0-9_.-]+\.(?:jpe?g|png|webp)$/i.test(path))
          throw new Error("Chemin d'avatar initial invalide.");
        if (!avatarByPath.has(path)) {
          const id = randomUUID();
          avatarByPath.set(path, id);
          this.run(
            "INSERT INTO avatars(id,label,path,hash) VALUES(?,?,?,?)",
            id,
            path.replace(/\.[^.]+$/, ""),
            `/empire-calendrier/${path}`,
            `seed:${path}`,
          );
        }
        return avatarByPath.get(path)!;
      };
      const addHost = (name: string, pictures: string[] = []) => {
        const key = nameKey(name);
        const existing = hostByName.get(key);
        if (existing) return existing;
        const id = randomUUID();
        hostByName.set(key, id);
        const portraitIds = pictures.map(image);
        this.run(
          "INSERT INTO hosts(id,name,name_key,avatar_ids) VALUES(?,?,?,?)",
          id,
          name,
          key,
          JSON.stringify(portraitIds),
        );
        if (portraitIds.length === 1)
          this.run(
            "UPDATE avatars SET label=? WHERE id=?",
            name,
            portraitIds[0],
          );
        return id;
      };
      for (const [name, paths] of Object.entries(seed.hosts ?? {}))
        addHost(name, paths);
      for (const [month, { events }] of Object.entries(seed.months)) {
        for (const [day, values] of Object.entries(events))
          for (const ev of [values].flat()) {
            const inferredHost =
              ev.host || (hostByName.has(nameKey(ev.title)) ? ev.title : "");
            const data = eventData({
              date: `${month}-${day.padStart(2, "0")}`,
              time: ev.time,
              title: ev.title,
              note: ev.note || "",
              url: ev.url || "",
              hostIds: inferredHost ? [addHost(inferredHost)] : [],
              avatarIds: ev.avatar ? [ev.avatar].flat().map(image) : [],
              showHost: !!ev.host,
            });
            const id = randomUUID();
            this.run(
              "INSERT INTO events(id,data) VALUES(?,?)",
              id,
              JSON.stringify(data),
            );
            this.audit(id, "import", "migration");
          }
      }
      const { months, hosts, ...metadata } = seed;
      this.run(
        "INSERT INTO metadata VALUES('branding',?)",
        JSON.stringify(metadata),
      );
      this.run(
        "INSERT INTO metadata VALUES('months',?)",
        JSON.stringify(Object.keys(months)),
      );
      this.run("INSERT INTO metadata VALUES('seeded','1')");
    });
  }
  user(id: string) {
    return this.one<UserRow>("SELECT * FROM users WHERE id=?", id);
  }
  publicUser(user: UserRow) {
    return {
      id: user.id,
      login: user.login,
      displayName: user.display_name || user.login,
      role: user.role,
      active: !!user.active,
      mustChange: !!user.must_change,
    };
  }
  hosts() {
    return this.all<HostRow>(
      "SELECT * FROM hosts ORDER BY name COLLATE NOCASE",
    ).map((h) => ({
      id: h.id,
      name: h.name,
      avatarIds: JSON.parse(h.avatar_ids) as string[],
      version: h.version,
    }));
  }
  avatars(origin: string) {
    return this.all<AvatarRow>(
      "SELECT * FROM avatars ORDER BY label COLLATE NOCASE",
    ).map((a) => ({ id: a.id, label: a.label, url: origin + a.path }));
  }
  events() {
    return this.all<EventRow>(
      "SELECT * FROM events ORDER BY created_at,id",
    ).map((e) => this.presentEvent(e));
  }
  presentEvent(e: EventRow) {
    return {
      id: e.id,
      ...(JSON.parse(e.data) as EventData),
      version: e.version,
      deleted: !!e.deleted,
    };
  }
  event(id: string): EventRow {
    const e = this.one<EventRow>("SELECT * FROM events WHERE id=?", id);
    if (!e) throw new Problem(404, "Événement introuvable.");
    return e;
  }
  audit(id: string, action: string, actor: string) {
    const e = this.event(id);
    this.run(
      "INSERT INTO history(event_id,data,version,deleted,actor,action) VALUES(?,?,?,?,?,?)",
      id,
      e.data,
      e.version,
      e.deleted,
      actor,
      action,
    );
  }
  references(data: EventData) {
    for (const id of data.hostIds)
      if (!this.one("SELECT id FROM hosts WHERE id=?", id))
        throw new Problem(400, "Animateur introuvable.");
    this.checkAvatars(data.avatarIds);
  }
  checkAvatars(values: string[]) {
    for (const id of values)
      if (!this.one("SELECT id FROM avatars WHERE id=?", id))
        throw new Problem(400, "Avatar introuvable.");
  }
  saveEvent(id: string | null, input: unknown, actor: string) {
    const body = input as Record<string, unknown>;
    const data = eventData(input);
    return this.atomic(() => {
      this.references(data);
      if (id) {
        const current = this.event(id);
        if (current.deleted)
          throw new Problem(
            409,
            "Cet événement a été supprimé. Consultez la corbeille.",
          );
        if (current.version !== revision(body.version))
          throw new Problem(
            409,
            "Cet événement a été modifié par un autre utilisateur. Rechargez avant de réessayer.",
          );
        this.run(
          "UPDATE events SET data=?,version=version+1,updated_at=CURRENT_TIMESTAMP WHERE id=?",
          JSON.stringify(data),
          id,
        );
      } else {
        if (
          Number(this.one<{ n: number }>("SELECT COUNT(*) n FROM events")!.n) >=
          20000
        )
          throw new Problem(409, "Capacité du calendrier atteinte.");
        id = randomUUID();
        this.run(
          "INSERT INTO events(id,data) VALUES(?,?)",
          id,
          JSON.stringify(data),
        );
      }
      this.audit(id!, "save", actor);
      return this.presentEvent(this.event(id!));
    });
  }
  deleteEvent(id: string, version: unknown, actor: string) {
    return this.atomic(() => {
      const current = this.event(id);
      if (current.deleted || current.version !== revision(version))
        throw new Problem(
          409,
          "Événement déjà modifié ou supprimé. Rechargez la liste.",
        );
      this.run(
        "UPDATE events SET deleted=1,version=version+1,updated_at=CURRENT_TIMESTAMP WHERE id=?",
        id,
      );
      this.audit(id, "delete", actor);
      return this.presentEvent(this.event(id));
    });
  }
  history(id: string) {
    this.event(id);
    return this.all<HistoryRow>(
      "SELECT * FROM history WHERE event_id=? ORDER BY id DESC LIMIT 100",
      id,
    ).map((h) => ({ ...h, data: JSON.parse(h.data) }));
  }
  restore(id: string, version: unknown, historyId: unknown, actor: string) {
    return this.atomic(() => {
      const current = this.event(id);
      if (current.version !== revision(version))
        throw new Problem(409, "Événement modifié. Rechargez la liste.");
      const previous = this.one<HistoryRow>(
        "SELECT * FROM history WHERE event_id=? AND id=?",
        id,
        revision(historyId),
      );
      if (!previous || previous.deleted)
        throw new Problem(400, "Version restaurable introuvable.");
      const data = eventData(JSON.parse(previous.data));
      this.references(data);
      this.run(
        "UPDATE events SET data=?,deleted=0,version=version+1,updated_at=CURRENT_TIMESTAMP WHERE id=?",
        JSON.stringify(data),
        id,
      );
      this.audit(id, "restore", actor);
      return this.presentEvent(this.event(id));
    });
  }
  saveHost(id: string | null, value: Record<string, unknown>) {
    const name = text(value.name, "Nom", 80);
    const key = nameKey(name);
    if (!key) throw new Problem(400, "Nom invalide.");
    const avatarIds = ids(value.avatarIds ?? []);
    return this.atomic(() => {
      const duplicate = this.one<HostRow>(
        "SELECT * FROM hosts WHERE name_key=?",
        key,
      );
      if (duplicate && duplicate.id !== id)
        throw new Problem(
          409,
          `L'animateur « ${duplicate.name} » existe déjà.`,
        );
      this.checkAvatars(avatarIds);
      if (id) {
        const current = this.one<HostRow>("SELECT * FROM hosts WHERE id=?", id);
        if (!current) throw new Problem(404, "Animateur introuvable.");
        if (current.version !== revision(value.version))
          throw new Problem(409, "Animateur modifié. Rechargez les données.");
        this.run(
          "UPDATE hosts SET name=?,name_key=?,avatar_ids=?,version=version+1 WHERE id=?",
          name,
          key,
          JSON.stringify(avatarIds),
          id,
        );
      } else {
        if (this.hosts().length >= 1000)
          throw new Problem(409, "Capacité des animateurs atteinte.");
        id = randomUUID();
        this.run(
          "INSERT INTO hosts(id,name,name_key,avatar_ids) VALUES(?,?,?,?)",
          id,
          name,
          key,
          JSON.stringify(avatarIds),
        );
      }
      return this.hosts().find((h) => h.id === id)!;
    });
  }
  deleteHost(id: string, version: unknown) {
    this.atomic(() => {
      const host = this.one<HostRow>("SELECT * FROM hosts WHERE id=?", id);
      if (!host) throw new Problem(404, "Animateur introuvable.");
      if (host.version !== revision(version))
        throw new Problem(409, "Animateur modifié. Rechargez la liste.");
      if (
        this.events().some((e) => e.hostIds.includes(id)) ||
        this.all<{ data: string }>("SELECT data FROM history").some((e) =>
          (JSON.parse(e.data) as EventData).hostIds.includes(id),
        )
      )
        throw new Problem(
          409,
          "Cet animateur est utilisé par un événement ou son historique.",
        );
      this.run("DELETE FROM hosts WHERE id=?", id);
    });
  }
  export(origin: string) {
    const branding = JSON.parse(
      this.one<{ value: string }>(
        "SELECT value FROM metadata WHERE key='branding'",
      )!.value,
    );
    const months: Record<string, { events: Record<string, unknown> }> =
      Object.fromEntries(
        JSON.parse(
          this.one<{ value: string }>(
            "SELECT value FROM metadata WHERE key='months'",
          )!.value,
        ).map((m: string) => [m, { events: {} }]),
      );
    const hosts = this.hosts();
    const pictures = new Map(this.avatars(origin).map((a) => [a.id, a.url]));
    const hostMap = new Map(hosts.map((h) => [h.id, h]));
    for (const event of this.events()
      .filter((e) => !e.deleted)
      .sort(
        (a, b) => a.date.localeCompare(b.date) || hour(a.time) - hour(b.time),
      )) {
      const month = event.date.slice(0, 7),
        day = String(Number(event.date.slice(8)));
      months[month] ??= { events: {} };
      const selected = event.hostIds
        .map((id) => hostMap.get(id))
        .filter(Boolean) as ReturnType<Store["hosts"]>;
      const avatarIds = event.avatarIds.length
        ? event.avatarIds
        : [...new Set(selected.flatMap((h) => h.avatarIds))];
      const out = {
        time: event.time,
        title: event.title,
        ...(event.showHost && selected.length
          ? { host: selected.map((h) => h.name).join(" & ") }
          : {}),
        ...(avatarIds.length
          ? { avatar: avatarIds.map((id) => pictures.get(id)!) }
          : {}),
        ...(event.note ? { note: event.note } : {}),
        ...(event.url ? { url: event.url } : {}),
      };
      const existing = months[month].events[day];
      months[month].events[day] = existing
        ? [existing].flat().concat(out)
        : out;
    }
    return {
      ...branding,
      hosts: Object.fromEntries(
        hosts.map((h) => [h.name, h.avatarIds.map((id) => pictures.get(id)!)]),
      ),
      months,
    };
  }
}
function hour(time: string) {
  const m = /^(\d{1,2})\s*[Hh:](\d{2})/.exec(time);
  return m ? Number(m[1]) * 60 + Number(m[2]) : 1440;
}
