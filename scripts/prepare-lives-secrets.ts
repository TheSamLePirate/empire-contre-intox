import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile, chmod } from "node:fs/promises";
import { resolve, join } from "node:path";

const source = process.argv[2];
if (!source)
  throw new Error(
    "Usage : bun scripts/prepare-lives-secrets.ts /chemin/awesome-jev/.env",
  );
const text = await readFile(resolve(source), "utf8");
const raw =
  text.match(/^(?:export\s+)?TIKTOK_SESSION_ID\s*=\s*(.*)$/m)?.[1]?.trim() ??
  "";
const session = raw.replace(/^(['"])(.*)\1$/, "$2");
if (!session || /[\r\n\x00]/.test(session))
  throw new Error("TIKTOK_SESSION_ID est absent ou invalide.");
const directory = resolve(import.meta.dir, "../.secrets");
await mkdir(directory, { recursive: true, mode: 0o700 });
await chmod(directory, 0o700);
async function create(name: string, value: string, mode: number) {
  try {
    await writeFile(join(directory, name), value, { flag: "wx", mode });
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") return false;
    throw error;
  }
}
// Directory 0700 protects the host file; 0444 lets Bun read the Docker secret
// mount without requiring a privileged container or the host's numeric UID.
const sessionCreated = await create("tiktok_session_id", session, 0o444);
const envCreated = await create(
  "lives.env",
  `LIVES_INTERNAL_TOKEN=${randomBytes(32).toString("hex")}\nTIKTOK_SESSION_SECRET_FILE=./.secrets/tiktok_session_id\n`,
  0o600,
);
console.log(
  `Configuration privée préparée. Session : ${sessionCreated ? "créée" : "déjà présente, conservée"}. Jeton interne : ${envCreated ? "créé" : "déjà présent, conservé"}. Aucune valeur affichée.`,
);
