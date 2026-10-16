import { join, resolve } from "node:path";
import { mkdirSync, cpSync, existsSync } from "node:fs";
import { Store } from "./store.ts";
import { createUser } from "./app.ts";
import { login, password } from "./validation.ts";

const directory = resolve(process.env.CALENDAR_DATA_DIR || "/data");
const store = new Store(
  join(directory, "calendar.sqlite"),
  process.env.CALENDAR_SEED ||
    resolve(import.meta.dir, "../empire-calendrier/data/events.json"),
);
const [command, arg, role = "admin"] = process.argv.slice(2);
try {
  if ((command === "create-user" || command === "reset-password") && arg) {
    if (!process.argv.includes("--password-stdin"))
      throw new Error(
        "Ajoutez --password-stdin ; le mot de passe se lit sur l'entrée standard, jamais en argument.",
      );
    const secret = password((await Bun.stdin.text()).replace(/\r?\n$/, ""));
    if (command === "create-user") {
      if (role !== "admin" && role !== "user")
        throw new Error("Rôle attendu : admin ou user.");
      const nameIndex = process.argv.indexOf("--display-name");
      const displayName = nameIndex >= 0 ? process.argv[nameIndex + 1] : arg;
      if (!displayName) throw new Error("Nom affiché manquant.");
      const user = await createUser(
        store,
        arg,
        secret,
        role,
        displayName,
        process.argv.includes("--require-password-change"),
      );
      console.log(`Compte créé : ${user.login} (${user.role}).`);
    } else {
      const user = store.one<{ id: string }>(
        "SELECT id FROM users WHERE login=?",
        login(arg),
      );
      if (!user) throw new Error("Compte introuvable.");
      const hash = await Bun.password.hash(secret, {
        algorithm: "argon2id",
        memoryCost: 65536,
        timeCost: 3,
      });
      store.atomic(() => {
        store.run(
          "UPDATE users SET password_hash=?,must_change=1 WHERE id=?",
          hash,
          user.id,
        );
        store.run("DELETE FROM sessions WHERE user_id=?", user.id);
      });
      console.log(
        "Mot de passe réinitialisé ; changement requis à la connexion.",
      );
    }
  } else if (command === "backup" && arg) {
    const destination = resolve(arg);
    if (destination === directory || destination.startsWith(directory + "/"))
      throw new Error("Sauvegardez hors du répertoire de données.");
    if (existsSync(destination))
      throw new Error("Le dossier de sauvegarde doit être nouveau.");
    mkdirSync(destination, { recursive: true });
    store.run("VACUUM INTO ?", join(destination, "calendar.sqlite"));
    // Avatars are immutable and never deleted: copying after the DB snapshot is coherent.
    if (existsSync(join(directory, "avatars")))
      cpSync(join(directory, "avatars"), join(destination, "avatars"), {
        recursive: true,
      });
    await Bun.write(
      join(destination, "README.txt"),
      "Sauvegarde ECI : calendar.sqlite + avatars/. Restaurer service arrêté. Les sessions sont révoquées au rétablissement par manage.ts revoke-sessions.\n",
    );
    console.log(`Sauvegarde créée : ${destination}`);
  } else if (command === "revoke-sessions") {
    store.run("DELETE FROM sessions");
    console.log("Sessions révoquées.");
  } else {
    throw new Error(
      "Usage : bun manage.ts create-user LOGIN admin|user --password-stdin | reset-password LOGIN --password-stdin | backup DOSSIER | revoke-sessions",
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "Erreur");
  process.exitCode = 1;
} finally {
  store.db.close();
}
