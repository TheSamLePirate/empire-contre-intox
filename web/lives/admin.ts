import type { WatchAccount, PublicLive } from "../../lives-service/protocol.ts";
const panel = document.querySelector<HTMLElement>("#lives-panel")!;
const button = document.querySelector<HTMLButtonElement>("#lives-tab")!;
let session: {
  user: { role: string; mustChange: boolean };
  csrf: string;
} | null = null;
let observedSession = false;
let accounts: WatchAccount[] = [],
  runtime: PublicLive[] = [],
  busy = false,
  editing: WatchAccount | null = null;
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, text = "") => {
  const e = document.createElement(tag);
  e.textContent = text;
  return e;
};
const notice = el("p");
notice.className = "notice";
notice.setAttribute("role", "status");
const toolbar = el("div");
toolbar.className = "toolbar";
const add = el("button", "Ajouter un compte TikTok"),
  refresh = el("button", "Actualiser les états");
add.type = refresh.type = "button";
toolbar.append(add, refresh);
const list = el("div");
list.className = "record-list";
panel.append(notice, toolbar, list);
const dialog = el("dialog");
dialog.className = "dialog";
dialog.setAttribute("aria-labelledby", "live-edit-title");
const form = el("form");
const title = el("h2", "Compte TikTok");
title.id = "live-edit-title";
const field = (label: string, input: HTMLInputElement) => {
  const l = el("label", label);
  l.append(input);
  return l;
};
const username = el("input");
username.required = true;
username.maxLength = 200;
username.autocomplete = "off";
const displayName = el("input");
displayName.maxLength = 80;
const order = el("input");
order.type = "number";
order.min = "0";
order.max = "9999";
order.required = true;
const enabled = el("input");
enabled.type = "checkbox";
const published = el("input");
published.type = "checkbox";
const save = el("button", "Enregistrer et publier");
save.type = "submit";
const cancel = el("button", "Annuler");
cancel.type = "button";
const preview = el("p");
preview.className = "field-note";
const error = el("p");
error.setAttribute("role", "alert");
form.append(
  title,
  field("@pseudo ou URL TikTok", username),
  field("Nom public (facultatif)", displayName),
  field("Ordre d’affichage", order),
  field("Surveiller ce compte", enabled),
  field("Afficher sur le site", published),
  preview,
  error,
  cancel,
  save,
);
dialog.append(form);
document.body.append(dialog);
const updatePreview = () => {
  preview.textContent = enabled.checked
    ? published.checked
      ? `Visible sur le site : ${displayName.value || username.value || "ce compte"}`
      : "Surveillance privée : absent du site public."
    : "Surveillance arrêtée : absent du site public.";
};
form.addEventListener("input", updatePreview);
cancel.onclick = () => {
  if (!busy) dialog.close();
};
dialog.addEventListener("cancel", (e) => {
  if (busy) e.preventDefault();
});
async function api(path = "", method = "GET", body?: unknown) {
  if (!session || session.user.role !== "admin")
    throw new Error("Gestion réservée aux administrateurs.");
  const response = await fetch(`/api/calendar/live-watch${path}`, {
    method,
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": session.csrf,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Gestion indisponible.");
  return data;
}
function edit(account: WatchAccount | null) {
  editing = account;
  username.value = account?.username ?? "";
  displayName.value = account?.displayName ?? "";
  order.value = String(account?.sortOrder ?? accounts.length);
  enabled.checked = account?.enabled ?? true;
  published.checked = account?.published ?? true;
  error.textContent = "";
  updatePreview();
  dialog.showModal();
  username.focus();
}
async function load() {
  if (!session || session.user.role !== "admin" || session.user.mustChange)
    return;
  try {
    const data = await api();
    accounts = data.accounts;
    runtime = data.runtime?.accounts ?? [];
    render();
    notice.textContent = data.runtime?.fresh
      ? "Configuration enregistrée. États actualisés."
      : "Configuration disponible ; le service de surveillance est indisponible ou en cours de connexion.";
  } catch (e) {
    notice.textContent = (e as Error).message;
  }
}
function render() {
  list.replaceChildren();
  for (const account of accounts) {
    const row = el("article");
    row.className = "record";
    const content = el("div");
    const live = runtime.find((l) => l.id === account.id);
    content.append(
      el(
        "strong",
        `${account.displayName || account.username} · @${account.username}`,
      ),
    );
    content.append(
      el(
        "p",
        `${account.enabled ? "Surveillé" : "Arrêté"} · ${account.published ? "Publié" : "Privé"} · Ordre ${account.sortOrder}`,
      ),
    );
    content.append(
      el(
        "p",
        live
          ? `${{ live: "En direct", offline: "Hors ligne", unknown: "Vérification", ended: "Terminé", error: "Vérification impossible" }[live.state]} · Chat : ${{ connected: "connecté", connecting: "connexion", reconnecting: "reconnexion", unavailable: "indisponible" }[live.chatState]} · Vidéo : ${{ idle: "en attente de lecteur", preparing: "préparation", ready: "prête", unavailable: "indisponible" }[live.playback.state]}${live.checkedAt ? " · Contrôle : " + new Date(live.checkedAt).toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris" }) : ""}`
          : "État pas encore disponible",
      ),
    );
    const modify = el("button", "Modifier"),
      remove = el("button", "Retirer");
    modify.type = remove.type = "button";
    modify.className = remove.className = "quiet";
    modify.onclick = () => edit(account);
    remove.onclick = async () => {
      if (
        !confirm(`Retirer @${account.username} de la surveillance et du site ?`)
      )
        return;
      remove.disabled = true;
      try {
        await api(`/${account.id}`, "DELETE", { version: account.version });
        await load();
      } catch (e) {
        notice.textContent = (e as Error).message;
      } finally {
        remove.disabled = false;
      }
    };
    row.append(content, modify, remove);
    list.append(row);
  }
}
form.onsubmit = async (e) => {
  e.preventDefault();
  if (busy) return;
  busy = true;
  save.disabled = true;
  cancel.disabled = true;
  try {
    await api(editing ? `/${editing.id}` : "", editing ? "PUT" : "POST", {
      username: username.value,
      displayName: displayName.value,
      enabled: enabled.checked,
      published: published.checked,
      sortOrder: Number(order.value),
      ...(editing ? { version: editing.version } : {}),
    });
    dialog.close();
    await load();
  } catch (e) {
    error.textContent = (e as Error).message;
  } finally {
    busy = false;
    save.disabled = false;
    cancel.disabled = false;
  }
};
add.onclick = () => edit(null);
refresh.onclick = () => void load();
button.addEventListener("click", () => void load());
window.addEventListener("eci-calendar-session", (event) => {
  observedSession = true;
  session = (event as CustomEvent).detail;
  button.hidden = !session || session.user.role !== "admin";
  if (!session) {
    dialog.close();
    accounts = [];
    runtime = [];
    list.replaceChildren();
    panel.hidden = true;
  }
});
setInterval(() => {
  if (!document.hidden && !panel.hidden) void load();
}, 15000);

// Deferred scripts and a cached session response may arrive in either order.
void fetch("/api/calendar/session", {
  credentials: "same-origin",
  cache: "no-store",
})
  .then(async (response) => {
    if (!response.ok) return;
    const current = await response.json();
    if (!observedSession) {
      session = current;
      button.hidden = current.user.role !== "admin";
    }
  })
  .catch(() => {});
