export class Problem extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function text(
  value: unknown,
  label: string,
  max: number,
  required = true,
): string {
  if (
    typeof value !== "string" ||
    (required && !value.trim()) ||
    value.length > max ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)
  ) {
    throw new Problem(400, `${label} invalide (maximum ${max} caractères).`);
  }
  return value.trim();
}
export function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Problem(400, "Objet JSON attendu.");
  return value as Record<string, unknown>;
}
export function ids(value: unknown, max = 8): string[] {
  if (
    !Array.isArray(value) ||
    value.length > max ||
    value.some((v) => typeof v !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(v))
  )
    throw new Problem(400, "Sélection invalide.");
  return [...new Set(value)] as string[];
}
export function revision(value: unknown): number {
  if (!Number.isInteger(value) || Number(value) < 1)
    throw new Problem(400, "Version obligatoire. Rechargez les données.");
  return Number(value);
}
export function nameKey(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
export function password(value: unknown): string {
  if (typeof value !== "string" || value.length < 12 || value.length > 128)
    throw new Problem(
      400,
      "Le mot de passe doit contenir entre 12 et 128 caractères.",
    );
  return value;
}
export function login(value: unknown): string {
  const normalized =
    typeof value === "string" ? value.trim().toLowerCase() : "";
  const username = /^[a-z0-9][a-z0-9._-]{2,39}$/.test(normalized);
  const email =
    normalized.length <= 254 &&
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?\.[a-z]{2,63}$/.test(
      normalized,
    ) &&
    !normalized.includes("..");
  if (!username && !email)
    throw new Problem(
      400,
      "Adresse email valide ou identifiant de 3 à 40 caractères attendu.",
    );
  return normalized;
}
export interface EventData {
  date: string;
  time: string;
  title: string;
  note: string;
  url: string;
  hostIds: string[];
  avatarIds: string[];
  showHost: boolean;
}
export function eventData(value: unknown): EventData {
  const v = object(value);
  const date = text(v.date, "Date", 10);
  const parsedDate = new Date(`${date}T12:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    date < "1900-01-01" ||
    date > "2200-12-31" ||
    !Number.isFinite(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  )
    throw new Problem(400, "Date inexistante.");
  const url = text(v.url ?? "", "Lien", 2048, false);
  if (url) {
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new Problem(400, "Lien HTTP ou HTTPS attendu.");
    }
    if (
      !["https:", "http:"].includes(parsed.protocol) ||
      parsed.username ||
      parsed.password
    )
      throw new Problem(400, "Lien HTTP ou HTTPS attendu, sans identifiants.");
  }
  return {
    date,
    time: text(v.time, "Horaire", 40),
    title: text(v.title, "Titre", 200),
    note: text(v.note ?? "", "Description", 4000, false),
    url,
    hostIds: ids(v.hostIds ?? []),
    avatarIds: ids(v.avatarIds ?? []),
    showHost: v.showHost !== false,
  };
}
