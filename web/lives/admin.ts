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
/* ── Le dossier du live ── */
interface CatalogEntry {
  number: string;
  title: string;
  path: string;
  image: string;
}
let catalog: CatalogEntry[] | null = null;
async function loadCatalog(): Promise<CatalogEntry[]> {
  if (catalog) return catalog;
  try {
    const response = await fetch("/index.html", { credentials: "same-origin", cache: "no-cache" });
    const doc = new DOMParser().parseFromString(await response.text(), "text/html");
    catalog = [...doc.querySelectorAll("article.dossier")].flatMap((card) => {
      const link = card.querySelector<HTMLAnchorElement>("a.stretch, a.dossier-link");
      const href = link?.getAttribute("href") ?? "";
      const title = card.querySelector("h3")?.textContent?.trim() ?? "";
      if (!href || !title || /^(?:[a-z]+:|\/\/|#)/i.test(href)) return [];
      return [{
        number: card.querySelector(".dossier-no")?.textContent?.trim() ?? "",
        title,
        path: href.replace(/^\.?\//, ""),
        image: card.querySelector("img")?.getAttribute("src") ?? "",
      }];
    });
  } catch {
    catalog = [];
  }
  return catalog;
}
const dossierDialog = el("dialog");
dossierDialog.className = "dialog wide live-dossier-dialog";
dossierDialog.setAttribute("aria-labelledby", "live-dossier-heading");
const dossierForm = el("form");
const dossierHeading = el("h2", "Le dossier du live");
dossierHeading.id = "live-dossier-heading";
const dossierIntro = el("p");
dossierIntro.className = "field-note";
const dossierSearch = el("input");
dossierSearch.type = "search";
dossierSearch.placeholder = "Titre ou numéro du dossier…";
const dossierChoices = el("div");
dossierChoices.className = "dossier-choices";
dossierChoices.setAttribute("role", "radiogroup");
dossierChoices.setAttribute("aria-label", "Dossiers du site");
const dossierPath = el("input");
dossierPath.required = true;
dossierPath.maxLength = 400;
dossierPath.autocomplete = "off";
dossierPath.spellcheck = false;
dossierPath.placeholder = "provoxys/son/index.html";
const dossierTitle = el("input");
dossierTitle.required = true;
dossierTitle.maxLength = 160;
const dossierError = el("p");
dossierError.className = "form-message";
dossierError.setAttribute("role", "alert");
const dossierRemove = el("button", "Retirer le dossier");
dossierRemove.type = "button";
dossierRemove.className = "danger";
const dossierCancel = el("button", "Annuler");
dossierCancel.type = "button";
dossierCancel.className = "quiet";
const dossierSave = el("button", "Afficher ce dossier pendant le live");
dossierSave.type = "submit";
dossierSave.className = "primary";
const dossierFooter = el("footer");
dossierFooter.className = "dialog-footer";
const spacer = el("div");
spacer.className = "spacer";
dossierFooter.append(dossierRemove, spacer, dossierCancel, dossierSave);
dossierForm.append(
  dossierHeading,
  dossierIntro,
  field("Rechercher un dossier", dossierSearch),
  dossierChoices,
  field("Page du dossier (chemin sur le site, ancre possible)", dossierPath),
  field("Titre affiché aux spectateurs", dossierTitle),
  dossierError,
  dossierFooter,
);
dossierDialog.append(dossierForm);
document.body.append(dossierDialog);
let dossierTarget: { account: WatchAccount; roomId: string } | null = null;
function renderChoices() {
  const words = dossierSearch.value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  dossierChoices.replaceChildren();
  const entries = (catalog ?? []).filter((entry) => {
    const hay = `${entry.number} ${entry.title} ${entry.path}`
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLowerCase();
    return words.every((w) => hay.includes(w));
  });
  if (!entries.length)
    dossierChoices.append(
      el("p", catalog?.length ? "Aucun dossier ne correspond." : "Catalogue indisponible : saisissez le chemin de la page."),
    );
  for (const entry of entries) {
    const label = el("label");
    label.className = "dossier-choice";
    const radio = el("input");
    radio.type = "radio";
    radio.name = "dossier-choice";
    radio.value = entry.path;
    radio.checked = dossierPath.value.split("#")[0] === entry.path;
    radio.onchange = () => {
      dossierPath.value = entry.path;
      dossierTitle.value = entry.title;
      dossierError.textContent = "";
    };
    const thumb = el("img");
    thumb.alt = "";
    thumb.loading = "lazy";
    if (entry.image) thumb.src = `/${entry.image.replace(/^\.?\//, "")}`;
    const text = el("span");
    text.append(el("small", entry.number), el("strong", entry.title));
    label.append(radio, thumb, text);
    dossierChoices.append(label);
  }
}
dossierSearch.addEventListener("input", renderChoices);
dossierPath.addEventListener("input", () => {
  for (const radio of dossierChoices.querySelectorAll<HTMLInputElement>("input[type=radio]"))
    radio.checked = radio.value === dossierPath.value.split("#")[0];
});
dossierCancel.onclick = () => {
  if (!busy) dossierDialog.close();
};
dossierDialog.addEventListener("cancel", (e) => {
  if (busy) e.preventDefault();
});
async function openDossier(account: WatchAccount, live: PublicLive) {
  if (!live.roomId) return;
  dossierTarget = { account, roomId: live.roomId };
  const current = account.dossier?.roomId === live.roomId ? account.dossier : null;
  dossierIntro.textContent = `Live en cours de ${account.displayName || live.displayName || account.username}${live.title ? ` : « ${live.title} »` : ""}. Le dossier choisi s’affiche sur la page du direct, pour ce live uniquement : il disparaît au prochain live.`;
  dossierPath.value = current?.path ?? "";
  dossierTitle.value = current?.title ?? "";
  dossierSearch.value = "";
  dossierRemove.hidden = !account.dossier;
  dossierError.textContent = "";
  dossierChoices.replaceChildren(el("p", "Chargement des dossiers…"));
  dossierDialog.showModal();
  dossierSearch.focus();
  await loadCatalog();
  renderChoices();
}
async function sendDossier(dossier: unknown) {
  if (!dossierTarget || busy) return;
  busy = true;
  dossierSave.disabled = dossierRemove.disabled = dossierCancel.disabled = true;
  try {
    await api(`/${dossierTarget.account.id}/dossier`, "PUT", {
      version: dossierTarget.account.version,
      dossier,
    });
    dossierDialog.close();
    await load();
  } catch (e) {
    dossierError.textContent = (e as Error).message;
  } finally {
    busy = false;
    dossierSave.disabled = dossierRemove.disabled = dossierCancel.disabled = false;
  }
}
dossierForm.onsubmit = (e) => {
  e.preventDefault();
  if (!dossierTarget) return;
  void sendDossier({
    path: dossierPath.value,
    title: dossierTitle.value,
    roomId: dossierTarget.roomId,
  });
};
dossierRemove.onclick = () => {
  if (confirm("Retirer le dossier de la page du live ?")) void sendDossier(null);
};
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
    const onAir = live?.state === "live" && !!live.roomId;
    const attached =
      account.dossier && live?.roomId === account.dossier.roomId ? account.dossier : null;
    const dossierLine = el("p");
    dossierLine.className = "live-dossier-line";
    if (attached) {
      dossierLine.append(el("span", "Dossier du live : "), el("strong", attached.title));
      const path = el("small", ` · ${attached.path}`);
      dossierLine.append(path);
    } else if (onAir) dossierLine.textContent = "Pas de dossier pour ce live (facultatif).";
    else if (account.dossier)
      dossierLine.textContent = `Dossier du dernier live (plus affiché) : ${account.dossier.title}`;
    if (dossierLine.textContent) content.append(dossierLine);
    const dossierButton = el("button", attached ? "Changer le dossier" : "Associer un dossier");
    dossierButton.type = "button";
    dossierButton.className = "quiet";
    dossierButton.hidden = !onAir;
    dossierButton.title = "Afficher un dossier ECI sur la page de ce live";
    dossierButton.onclick = () => {
      if (live) void openDossier(account, live);
    };
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
    const actions = el("div");
    actions.className = "record-actions";
    actions.append(dossierButton, modify, remove);
    row.append(content, actions);
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
    if (dossierDialog.open) dossierDialog.close();
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
