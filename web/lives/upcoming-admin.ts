/**
 * Onglet « Prochainement » de l'administration : ajouter, modifier, dupliquer,
 * masquer/publier (un par un ou en lot), réordonner (glisser-déposer, clavier
 * ou position), corbeille avec restauration et historique des versions.
 * Compilé vers empire-calendrier/admin/upcoming-admin.js (bun run build:lives).
 */
interface Upcoming {
  id: string;
  theme: string;
  title: string;
  hook: string;
  duration: string;
  teaser: string[];
  image: string;
  video: string | null;
  published: boolean;
  sortOrder: number;
  version: number;
  updatedAt: string;
  updatedBy: string | null;
  deletedAt?: string | null;
  deletedBy?: string | null;
}
interface Library {
  images: string[];
  videos: string[];
  uploads: { id: string; label: string; path: string }[];
}
interface HistoryEntry {
  id: number;
  action: string;
  actor: string;
  createdAt: string;
  data: Omit<Upcoming, "id" | "sortOrder" | "version" | "updatedAt" | "updatedBy"> | null;
}
interface State {
  lives: Upcoming[];
  trash: Upcoming[];
  revision: number;
  changed?: number;
}
const THEMES: [string, string][] = [
  ["lois", "Lois du réel"],
  ["cosmos", "Cosmos"],
  ["terre", "Terre"],
  ["vivant", "Vivant"],
];
const themeLabel = (id: string) => THEMES.find(([k]) => k === id)?.[1] ?? id;
const ACTIONS: Record<string, string> = {
  create: "Création",
  update: "Modification",
  delete: "Mise à la corbeille",
  restore: "Restauration",
  publish: "Publication",
  hide: "Masqué",
  purge: "Suppression définitive",
  initial: "Version d’origine",
};
const FALLBACK = "assets/prochainement/prochainement-hero.webp";

const panel = document.querySelector<HTMLElement>("#upcoming-panel");
const tab = document.querySelector<HTMLButtonElement>("#upcoming-tab");
if (panel && tab) {
  let session: { user: { mustChange: boolean; role: string }; csrf: string } | null = null;
  let observed = false;
  let lives: Upcoming[] = [];
  let trash: Upcoming[] = [];
  let revision = 0;
  let library: Library = { images: [], videos: [], uploads: [] };
  let editing: Upcoming | null = null;
  let busy = false;
  let loaded = false;
  let showTrash = false;
  const selected = new Set<string>();

  /* ── Outils ── */
  const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls = "", text = "") => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  };
  const button = (text: string, cls = "quiet") => {
    const b = el("button", cls, text);
    b.type = "button";
    return b;
  };
  const field = (label: string, input: HTMLElement, note = "") => {
    const l = el("label", "", label);
    l.append(input);
    if (note) l.append(el("span", "field-note", note));
    return l;
  };
  const src = (path: string) => (path.startsWith("/") ? path : `/${path}`);
  const norm = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  const when = (iso: string | null | undefined) => {
    if (!iso) return "";
    // SQLite CURRENT_TIMESTAMP is UTC without zone.
    const d = new Date(/Z|[+-]\d\d:?\d\d$/.test(iso) ? iso : `${iso.replace(" ", "T")}Z`);
    return Number.isNaN(+d)
      ? iso
      : new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", dateStyle: "short", timeStyle: "short" }).format(d);
  };
  const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? "s" : ""}`;

  async function api(path: string, method = "GET", body?: unknown) {
    if (!session) throw new Error("Connectez-vous pour gérer le programme.");
    const multipart = body instanceof FormData;
    const response = await fetch(`/api/calendar/upcoming${path}`, {
      method,
      credentials: "same-origin",
      cache: "no-store",
      headers: {
        ...(multipart ? {} : { "Content-Type": "application/json" }),
        "X-CSRF-Token": session.csrf,
      },
      body: body === undefined ? undefined : multipart ? body : JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw Object.assign(new Error(data.error || "Programme indisponible."), { status: response.status });
    return data;
  }
  const apply = (data: State) => {
    lives = data.lives;
    trash = data.trash ?? trash;
    revision = data.revision;
    for (const id of [...selected]) if (!lives.some((l) => l.id === id)) selected.delete(id);
  };

  /* ── Bandeau de statut, avec action « Annuler » facultative ── */
  const notice = el("div", "notice upcoming-notice");
  notice.setAttribute("role", "status");
  notice.setAttribute("aria-live", "polite");
  function say(message: string, undo?: { label: string; run: () => void }) {
    notice.replaceChildren(el("span", "", message));
    if (undo) {
      const b = button(undo.label, "quiet upcoming-undo");
      b.onclick = () => {
        b.disabled = true;
        undo.run();
      };
      notice.append(b);
    }
  }

  /* ── Barre d'outils ── */
  const toolbar = el("div", "toolbar");
  const search = el("input");
  search.type = "search";
  search.placeholder = "Titre, thème, mot du teasing…";
  const themeFilter = el("select");
  themeFilter.append(new Option("Tous les thèmes", ""));
  for (const [k, v] of THEMES) themeFilter.append(new Option(v, k));
  const statusFilter = el("select");
  statusFilter.append(new Option("Tous", ""), new Option("Publiés", "on"), new Option("Masqués", "off"));
  const searchField = field("Rechercher", search);
  searchField.classList.add("search-field");
  const trashToggle = button("Corbeille", "quiet upcoming-trash-toggle");
  trashToggle.setAttribute("aria-pressed", "false");
  const view = el("a", "outline", "Voir la page ↗");
  view.href = "/prochainement.html";
  view.target = "_blank";
  view.rel = "noopener";
  const add = button("+ Ajouter un live", "primary");
  toolbar.append(searchField, field("Thème", themeFilter), field("État", statusFilter), trashToggle, view, add);
  const intro = el("p", "field-note upcoming-intro");
  const bulk = el("div", "upcoming-bulk");
  bulk.hidden = true;
  bulk.setAttribute("role", "region");
  bulk.setAttribute("aria-label", "Actions sur la sélection");
  const bulkCount = el("strong");
  const bulkPublish = button("Publier", "outline");
  const bulkHide = button("Masquer", "outline");
  const bulkAll = button("Tout sélectionner");
  const bulkNone = button("Désélectionner");
  bulk.append(bulkCount, bulkPublish, bulkHide, el("span", "spacer"), bulkAll, bulkNone);
  const list = el("ol", "upcoming-list");
  const help = el("p", "sr-only upcoming-sr");
  help.id = "upcoming-drag-help";
  help.textContent =
    "Glissez la poignée pour déplacer le live. Au clavier : flèches haut et bas pour déplacer d’une place, Début et Fin pour le mettre en tête ou en dernier.";
  panel.append(notice, toolbar, intro, bulk, list, help);

  const filters = () => {
    const words = norm(search.value).split(/\s+/).filter(Boolean);
    return {
      words,
      active: !!words.length || !!themeFilter.value || !!statusFilter.value,
      match: (live: Upcoming) => {
        const hay = norm(`${live.title} ${live.hook} ${themeLabel(live.theme)} ${live.duration} ${live.teaser.join(" ")}`);
        return (
          (!themeFilter.value || live.theme === themeFilter.value) &&
          (!statusFilter.value || live.published === (statusFilter.value === "on")) &&
          words.every((w) => hay.includes(w))
        );
      },
    };
  };
  const numbers = () => {
    const map = new Map<string, string>();
    let n = 0;
    for (const l of lives) if (l.published) map.set(l.id, String(++n).padStart(2, "0"));
    return map;
  };

  function render() {
    const f = filters();
    trashToggle.textContent = `Corbeille${trash.length ? ` (${trash.length})` : ""}`;
    trashToggle.setAttribute("aria-pressed", String(showTrash));
    add.hidden = showTrash;
    list.replaceChildren();
    list.classList.toggle("is-trash", showTrash);
    list.setAttribute("aria-label", showTrash ? "Corbeille du programme" : "Programme des futurs lives");
    if (showTrash) {
      intro.textContent =
        "Les lives mis à la corbeille ne sont plus sur la page publique. Restaurez-les à la fin du programme, ou supprimez-les définitivement (administrateurs).";
      bulk.hidden = true;
      const shown = trash.filter(f.match);
      for (const live of shown) list.append(trashRow(live));
      if (!shown.length) list.append(el("li", "empty-state", trash.length ? "Aucun live ne correspond." : "La corbeille est vide."));
      return;
    }
    const published = lives.filter((l) => l.published).length;
    intro.textContent = `${plural(lives.length, "live")} dont ${plural(published, "publié")}. L’ordre de la liste est l’ordre public : le premier live publié passe « À l’affiche », les six suivants « Ensuite ».${f.active ? " Videz la recherche et les filtres pour réordonner." : ""}`;
    const num = numbers();
    let shown = 0;
    lives.forEach((live, index) => {
      if (!f.match(live)) return;
      shown++;
      list.append(row(live, index, num.get(live.id), f.active));
    });
    if (!shown)
      list.append(el("li", "empty-state", lives.length ? "Aucun live ne correspond." : "Le programme est vide : ajoutez un premier live."));
    const count = document.querySelector("#upcoming-count");
    if (count) count.textContent = String(published);
    renderBulk();
  }
  function renderBulk() {
    bulk.hidden = showTrash || !selected.size;
    bulkCount.textContent = `${plural(selected.size, "live")} sélectionné${selected.size > 1 ? "s" : ""}`;
    const chosen = lives.filter((l) => selected.has(l.id));
    bulkPublish.disabled = busy || chosen.every((l) => l.published);
    bulkHide.disabled = busy || chosen.every((l) => !l.published);
  }

  function row(live: Upcoming, index: number, number: string | undefined, filtered: boolean) {
    const li = el("li", `upcoming-row theme-${live.theme}${live.published ? "" : " is-hidden"}`);
    li.dataset.id = live.id;
    const check = el("input");
    check.type = "checkbox";
    check.className = "upcoming-check";
    check.checked = selected.has(live.id);
    check.setAttribute("aria-label", `Sélectionner « ${live.title} »`);
    check.onchange = () => {
      if (check.checked) selected.add(live.id);
      else selected.delete(live.id);
      li.classList.toggle("is-selected", check.checked);
      renderBulk();
    };
    li.classList.toggle("is-selected", check.checked);
    const handle = button("⠿", "upcoming-handle");
    handle.setAttribute("aria-label", `Déplacer « ${live.title} », position ${index + 1} sur ${lives.length}`);
    handle.setAttribute("aria-describedby", help.id);
    handle.disabled = filtered || busy;
    handle.title = filtered ? "Videz la recherche et les filtres pour réordonner." : "Glisser pour déplacer (ou flèches du clavier)";
    handle.addEventListener("pointerdown", (e) => startDrag(e, li, handle));
    handle.addEventListener("keydown", (e) => {
      const target =
        e.key === "ArrowUp" ? index - 1 : e.key === "ArrowDown" ? index + 1 : e.key === "Home" ? 0 : e.key === "End" ? lives.length - 1 : null;
      if (target === null) return;
      e.preventDefault();
      if (target >= 0 && target < lives.length && target !== index) void moveTo(live.id, target);
    });
    const num = el("span", "upcoming-num", number ?? "—");
    num.title = number ? `Live ${number} sur la page publique` : "Masqué : pas de numéro public";
    const thumb = el("img", "upcoming-thumb");
    thumb.alt = "";
    thumb.loading = "lazy";
    thumb.src = src(live.image || FALLBACK);
    const body = el("div", "upcoming-body");
    const meta = el("p", "upcoming-meta");
    meta.append(el("span", "upcoming-theme", themeLabel(live.theme)), el("span", "", live.duration));
    if (!live.published) meta.append(el("span", "badge disabled", "Masqué"));
    if (live.video) meta.append(el("span", "badge", "Vidéo"));
    if (!live.image) meta.append(el("span", "badge", "Sans affiche"));
    const title = button(live.title, "upcoming-title");
    title.onclick = () => open(live);
    body.append(meta, title);
    if (live.hook) body.append(el("p", "upcoming-hook", live.hook));
    body.append(el("p", "upcoming-stamp", `${plural(live.teaser.length, "point")} de teasing · modifié le ${when(live.updatedAt)}${live.updatedBy ? ` par ${live.updatedBy}` : ""}`));
    const actions = el("div", "row-actions");
    const toggle = button(live.published ? "Masquer" : "Publier");
    toggle.onclick = () => void publish([live], !live.published);
    const edit = button("Modifier");
    edit.onclick = () => open(live);
    const copy = button("Dupliquer");
    copy.onclick = () => duplicate(live);
    actions.append(toggle, edit, copy);
    li.append(check, handle, num, thumb, body, actions);
    return li;
  }
  function trashRow(live: Upcoming) {
    const li = el("li", `upcoming-row is-trashed theme-${live.theme}`);
    const thumb = el("img", "upcoming-thumb");
    thumb.alt = "";
    thumb.loading = "lazy";
    thumb.src = src(live.image || FALLBACK);
    const body = el("div", "upcoming-body");
    const meta = el("p", "upcoming-meta");
    meta.append(el("span", "upcoming-theme", themeLabel(live.theme)), el("span", "", live.duration));
    body.append(meta, el("strong", "upcoming-title", live.title));
    body.append(el("p", "upcoming-stamp", `Mis à la corbeille le ${when(live.deletedAt)}${live.deletedBy ? ` par ${live.deletedBy}` : ""}`));
    const actions = el("div", "row-actions");
    const restore = button("Restaurer", "outline");
    restore.onclick = () => void restoreLive(live);
    actions.append(restore);
    if (session?.user.role === "admin") {
      const purge = button("Supprimer définitivement", "danger");
      purge.onclick = async () => {
        if (!confirm(`Supprimer définitivement « ${live.title} » ? Cette action est irréversible.`)) return;
        await run(() => api(`/item/${live.id}/purge`, "POST", { version: live.version }), `« ${live.title} » supprimé définitivement.`);
      };
      actions.append(purge);
    }
    li.append(el("span", "upcoming-num", "—"), thumb, body, actions);
    return li;
  }

  /** Runs a mutation, applies its state and re-renders; reloads on conflict. */
  async function run(task: () => Promise<State>, message: string | ((s: State) => string), undo?: { label: string; run: () => void }) {
    if (busy) return null;
    busy = true;
    try {
      const data = await task();
      apply(data);
      say(typeof message === "function" ? message(data) : message, undo);
      return data;
    } catch (e) {
      say((e as Error).message);
      if ((e as { status?: number }).status === 409 || (e as { status?: number }).status === 404) await load((e as Error).message);
      return null;
    } finally {
      busy = false;
      render();
    }
  }
  search.addEventListener("input", render);
  themeFilter.addEventListener("change", render);
  statusFilter.addEventListener("change", render);
  trashToggle.onclick = () => {
    showTrash = !showTrash;
    render();
  };

  async function load(message = "") {
    if (!session || session.user.mustChange) return;
    try {
      const data = await api("/all");
      apply(data);
      library = data.library;
      loaded = true;
      render();
      if (message) say(message);
    } catch (e) {
      say((e as Error).message);
    }
  }

  /* ── Ordre : clavier, position et glisser-déposer ── */
  async function reorder(order: string[], focusId: string, message: string) {
    await run(() => api("/order", "PUT", { order, revision }), message);
    list.querySelector<HTMLElement>(`[data-id="${focusId}"] .upcoming-handle`)?.focus();
  }
  function moveTo(id: string, target: number) {
    const order = lives.map((l) => l.id).filter((x) => x !== id);
    order.splice(target, 0, id);
    const live = lives.find((l) => l.id === id)!;
    return reorder(order, id, `« ${live.title} » déplacé en position ${target + 1} sur ${lives.length}.`);
  }
  function startDrag(e: PointerEvent, li: HTMLElement, handle: HTMLButtonElement) {
    if (handle.disabled || busy || e.button !== 0) return;
    e.preventDefault();
    // Moving the row in the DOM drops pointer capture: follow the pointer on the document instead.
    const pointer = e.pointerId;
    const id = li.dataset.id!;
    const start = lives.findIndex((l) => l.id === id);
    li.classList.add("is-dragging");
    list.classList.add("is-sorting");
    let scroll = 0,
      lastY = e.clientY;
    const place = (y: number) => {
      const others = [...list.children].filter((c) => c !== li) as HTMLElement[];
      const next = others.find((c) => {
        const r = c.getBoundingClientRect();
        return y < r.top + r.height / 2;
      });
      if (next) {
        if (li.nextElementSibling !== next) list.insertBefore(li, next);
      } else if (list.lastElementChild !== li) list.append(li);
    };
    const autoscroll = () => {
      const edge = 70;
      const speed = lastY < edge ? -14 : lastY > innerHeight - edge ? 14 : 0;
      if (speed) {
        scrollBy(0, speed);
        place(lastY);
      }
      scroll = requestAnimationFrame(autoscroll);
    };
    scroll = requestAnimationFrame(autoscroll);
    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== pointer) return;
      ev.preventDefault();
      lastY = ev.clientY;
      place(ev.clientY);
    };
    const end = (ev: PointerEvent) => {
      if (ev.pointerId !== pointer) return;
      cancelAnimationFrame(scroll);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", end);
      document.removeEventListener("pointercancel", end);
      li.classList.remove("is-dragging");
      list.classList.remove("is-sorting");
      const order = [...list.children].map((c) => (c as HTMLElement).dataset.id!).filter(Boolean);
      const target = order.indexOf(id);
      if (ev.type === "pointercancel" || target === start) {
        render();
        return;
      }
      void reorder(order, id, `« ${lives[start].title} » déplacé en position ${target + 1} sur ${lives.length}.`);
    };
    document.addEventListener("pointermove", move, { passive: false });
    document.addEventListener("pointerup", end);
    document.addEventListener("pointercancel", end);
  }

  /* ── Publication (un ou plusieurs) ── */
  function publish(items: Upcoming[], value: boolean) {
    const targets = items.filter((l) => l.published !== value);
    if (!targets.length) return;
    const verb = value ? "publié" : "masqué";
    return run(
      () => api("/publish", "PUT", { items: targets.map((l) => ({ id: l.id, version: l.version })), published: value }),
      (s) => (targets.length === 1 ? `« ${targets[0].title} » ${verb}.` : `${plural(s.changed ?? targets.length, "live")} ${verb}${targets.length > 1 ? "s" : ""}.`),
      {
        label: "Annuler",
        run: () => {
          const now = lives.filter((l) => targets.some((t) => t.id === l.id));
          void publish(now, !value);
        },
      },
    );
  }
  bulkPublish.onclick = () => void publish(lives.filter((l) => selected.has(l.id)), true);
  bulkHide.onclick = () => void publish(lives.filter((l) => selected.has(l.id)), false);
  bulkAll.onclick = () => {
    const f = filters();
    for (const l of lives) if (f.match(l)) selected.add(l.id);
    render();
  };
  bulkNone.onclick = () => {
    selected.clear();
    render();
  };

  /* ── Corbeille ── */
  function trashLive(live: Upcoming) {
    const position = lives.findIndex((l) => l.id === live.id);
    return run(() => api(`/item/${live.id}`, "DELETE", { version: live.version }), `« ${live.title} » mis à la corbeille.`, {
      label: "Annuler",
      run: () => {
        const back = trash.find((t) => t.id === live.id);
        if (back) void restoreLive(back, position);
      },
    });
  }
  function restoreLive(live: Upcoming, position?: number) {
    return run(
      () => api(`/item/${live.id}/restore`, "POST", { version: live.version, ...(position === undefined ? {} : { position }) }),
      `« ${live.title} » restauré${position === undefined ? " en fin de programme" : ""}.`,
    );
  }

  /* ── Formulaire ── */
  const dialog = el("dialog", "wide upcoming-dialog");
  dialog.setAttribute("aria-labelledby", "upcoming-heading");
  const form = el("form");
  const head = el("header", "dialog-head");
  const headText = el("div");
  const heading = el("h2", "", "Ajouter un live");
  heading.id = "upcoming-heading";
  const headNote = el("p", "field-note");
  headText.append(el("div", "eyebrow", "Prochainement"), heading, headNote);
  const close = button("×", "close");
  close.setAttribute("aria-label", "Fermer");
  head.append(headText, close);
  const title = el("input");
  title.required = true;
  title.maxLength = 160;
  const theme = el("select");
  for (const [k, v] of THEMES) theme.append(new Option(v, k));
  const duration = el("input");
  duration.required = true;
  duration.maxLength = 40;
  duration.placeholder = "≈ 2 h";
  duration.setAttribute("list", "upcoming-durations");
  const durations = el("datalist");
  durations.id = "upcoming-durations";
  for (const d of ["≈ 1 h 30", "≈ 1 h 30–2 h", "≈ 2 h", "≈ 2 h 30", "≈ 3 h"]) durations.append(new Option(d));
  const hook = el("input");
  hook.maxLength = 300;
  hook.placeholder = "Une phrase qui donne envie.";
  const teaser = el("textarea");
  teaser.rows = 9;
  teaser.placeholder = "Un point par ligne : ce qu’on verra, ce qu’on démonte, les sources…";
  const teaserCount = el("span", "field-note");
  teaserCount.setAttribute("aria-live", "polite");
  const position = el("input");
  position.type = "number";
  position.min = "1";
  position.required = true;
  const positionNote = el("span", "field-note");
  const positionField = el("label", "", "Position dans le programme");
  positionField.append(position, positionNote);
  const published = el("input");
  published.type = "checkbox";
  const publishedField = el("label", "inline");
  publishedField.append(published, document.createTextNode(" Publié sur la page Prochainement"));
  const pair = el("div", "fields-pair");
  pair.append(field("Thème", theme), field("Durée", duration));
  const pair2 = el("div", "fields-pair");
  pair2.append(positionField, publishedField);
  const left = el("div", "stack");
  left.append(field("Titre du live", title), pair, field("Accroche", hook), field("Le teasing", teaser), teaserCount, pair2, durations);

  // Aperçu : la carte telle qu'elle apparaîtra sur la page publique.
  const right = el("div", "stack upcoming-media");
  const previewCard = el("article", "upcoming-card-preview");
  previewCard.setAttribute("aria-label", "Aperçu de la carte publique");
  const pMedia = el("div", "ucp-media");
  const previewImg = el("img");
  previewImg.alt = "";
  const previewVid = el("video");
  previewVid.muted = true;
  previewVid.loop = true;
  previewVid.playsInline = true;
  previewVid.setAttribute("aria-hidden", "true");
  const pNum = el("span", "ucp-num");
  const pSoon = el("span", "ucp-soon", "Prochainement");
  pMedia.append(previewImg, previewVid, pNum, pSoon);
  const pBody = el("div", "ucp-body");
  const pKicker = el("p", "ucp-kicker");
  const pTitle = el("h3");
  const pHook = el("p", "ucp-hook");
  const pTeaser = el("details", "ucp-teaser");
  const pTeaserSummary = el("summary", "", "Aperçu du teasing");
  const pTeaserList = el("ul");
  pTeaser.append(pTeaserSummary, pTeaserList);
  pBody.append(pKicker, pTitle, pHook, pTeaser);
  previewCard.append(pMedia, pBody);
  const previewCaption = el("p", "field-note");
  const gallerySearch = el("input");
  gallerySearch.type = "search";
  gallerySearch.placeholder = "Numéro ou nom de l’image…";
  const gallery = el("div", "upcoming-gallery");
  gallery.setAttribute("role", "listbox");
  gallery.setAttribute("aria-label", "Bibliothèque d’affiches");
  const file = el("input");
  file.type = "file";
  file.accept = "image/jpeg,image/png,image/webp";
  const upload = button("Importer cette image", "outline");
  upload.disabled = true;
  const clearImage = button("Sans affiche");
  const video = el("select");
  const mediaActions = el("div", "upcoming-media-actions");
  mediaActions.append(upload, clearImage);
  right.append(
    el("h3", "", "Aperçu"),
    previewCard,
    previewCaption,
    field("L’affiche : rechercher dans la bibliothèque", gallerySearch),
    gallery,
    field("Ou importer une image", file, "JPEG, PNG ou WebP · 5 Mo maximum · recadrée en 960 × 645."),
    mediaActions,
    field("Image animée (facultative)", video, "Les boucles vidéo du programme d’origine."),
  );
  const columns = el("div", "event-columns");
  columns.append(left, right);
  const error = el("div", "form-message");
  error.setAttribute("role", "alert");
  const footer = el("footer", "dialog-footer");
  const remove = button("Mettre à la corbeille", "danger");
  const historyButton = button("Historique");
  const copyButton = button("Dupliquer");
  const cancel = button("Annuler");
  const save = el("button", "primary", "Enregistrer");
  save.type = "submit";
  save.title = "Ctrl + Entrée";
  footer.append(remove, historyButton, copyButton, el("div", "spacer"), cancel, save);
  form.append(head, columns, error, footer);
  dialog.append(form);
  document.body.append(dialog);
  let image = "";
  let snapshot = "";
  let draftPosition = 0;

  const formState = () =>
    JSON.stringify([title.value, theme.value, duration.value, hook.value, teaser.value, position.value, published.checked, image, video.value]);
  const dirty = () => dialog.open && formState() !== snapshot;
  const imageChoices = () => [
    ...library.uploads.map((u) => ({ path: u.path, label: `Import · ${u.label}` })),
    ...library.images.map((p) => ({ path: p, label: p.replace(/^assets\/prochainement\//, "") })),
  ];
  function renderGallery() {
    const words = norm(gallerySearch.value).split(/\s+/).filter(Boolean);
    gallery.replaceChildren();
    for (const choice of imageChoices()) {
      if (!words.every((w) => norm(choice.label).includes(w))) continue;
      const b = button("", "upcoming-choice");
      b.setAttribute("role", "option");
      b.setAttribute("aria-selected", String(choice.path === image));
      b.setAttribute("aria-label", choice.label);
      b.title = choice.label;
      const img = el("img");
      img.alt = "";
      img.loading = "lazy";
      img.src = src(choice.path);
      b.append(img, el("span", "", choice.label));
      b.onclick = () => {
        image = choice.path;
        updatePreview();
        for (const other of gallery.querySelectorAll("[role=option]")) other.setAttribute("aria-selected", String(other === b));
      };
      gallery.append(b);
    }
    if (!gallery.children.length) gallery.append(el("p", "field-note", "Aucune image ne correspond."));
  }
  function updatePreview() {
    const accent = `theme-${theme.value}`;
    previewCard.className = `upcoming-card-preview ${accent}${published.checked ? "" : " is-hidden"}`;
    previewImg.src = src(image || FALLBACK);
    const n = Math.max(1, Number(position.value) || 1);
    pNum.textContent = published.checked ? String(n).padStart(2, "0") : "—";
    pSoon.textContent = published.checked ? "Prochainement" : "Masqué";
    pKicker.textContent = `${themeLabel(theme.value).toUpperCase()} · ${duration.value || "—"}`;
    pTitle.textContent = title.value || "Titre du live";
    pTitle.classList.toggle("is-placeholder", !title.value);
    pHook.textContent = hook.value;
    pHook.hidden = !hook.value;
    const lines = teaser.value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    pTeaserList.replaceChildren(...lines.map((l) => el("li", "", l)));
    pTeaser.hidden = !lines.length;
    pTeaserSummary.textContent = `Aperçu du teasing (${plural(lines.length, "point")})`;
    previewCaption.textContent = image
      ? `Affiche : ${image.replace(/^assets\/prochainement\//, "").replace(/^\/api\/calendar\/upcoming\/media\//, "import · ")}`
      : "Sans affiche : l’image générale du programme est utilisée.";
    clearImage.disabled = !image;
    const v = video.value;
    if (v && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (previewVid.getAttribute("src") !== src(v)) previewVid.src = src(v);
      previewVid.hidden = false;
      void previewVid.play().catch(() => {});
    } else {
      previewVid.pause();
      previewVid.removeAttribute("src");
      previewVid.hidden = true;
    }
    const over = lines.length > 16;
    teaserCount.textContent = `${plural(lines.length, "point")} sur 16 au maximum.`;
    teaserCount.classList.toggle("is-over", over);
    const max = editing ? lives.length : lives.length + 1;
    positionNote.textContent = n === 1 ? "1 = à l’affiche." : n <= 7 ? "Dans « Ensuite »." : `Sur ${max}.`;
  }
  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);
  gallerySearch.addEventListener("input", renderGallery);
  file.addEventListener("change", () => {
    upload.disabled = !file.files?.length;
  });
  clearImage.onclick = () => {
    image = "";
    renderGallery();
    updatePreview();
  };
  upload.onclick = async () => {
    const chosen = file.files?.[0];
    if (!chosen || busy) return;
    const data = new FormData();
    data.append("file", chosen);
    data.append("label", chosen.name.replace(/\.[^.]+$/, "").slice(0, 120) || "Affiche");
    upload.disabled = true;
    error.textContent = "";
    upload.textContent = "Import en cours…";
    try {
      const saved = await api("/media", "POST", data);
      if (!library.uploads.some((u) => u.id === saved.id)) library.uploads.unshift(saved);
      image = saved.path;
      file.value = "";
      renderGallery();
      updatePreview();
    } catch (e) {
      error.textContent = (e as Error).message;
      upload.disabled = false;
    } finally {
      upload.textContent = "Importer cette image";
    }
  };

  type Draft = Partial<Upcoming> & { position?: number };
  function open(live: Upcoming | null, draft: Draft = {}) {
    editing = live;
    const source = { ...(live ?? {}), ...draft };
    heading.textContent = live ? "Modifier le live" : draft.title ? "Dupliquer le live" : "Ajouter un live";
    headNote.textContent = live ? `Modifié le ${when(live.updatedAt)}${live.updatedBy ? ` par ${live.updatedBy}` : ""}` : "";
    title.value = source.title ?? "";
    theme.value = source.theme ?? "lois";
    duration.value = source.duration ?? "≈ 2 h";
    hook.value = source.hook ?? "";
    teaser.value = source.teaser?.join("\n") ?? "";
    published.checked = source.published ?? true;
    image = source.image ?? "";
    video.replaceChildren(new Option("Aucune", ""));
    for (const v of library.videos) video.append(new Option(v.replace(/^assets\/prochainement\//, ""), v));
    video.value = source.video ?? "";
    const index = live ? lives.findIndex((l) => l.id === live.id) : (draft.position ?? lives.length);
    draftPosition = index;
    position.max = String(live ? lives.length : lives.length + 1);
    position.value = String(index + 1);
    remove.hidden = historyButton.hidden = copyButton.hidden = !live;
    save.textContent = live ? "Enregistrer" : published.checked ? "Ajouter et publier" : "Ajouter";
    error.replaceChildren();
    gallerySearch.value = "";
    file.value = "";
    upload.disabled = true;
    renderGallery();
    updatePreview();
    snapshot = formState();
    dialog.showModal();
    title.focus();
    if (draft.title) title.select();
  }
  function duplicate(live: Upcoming) {
    const index = lives.findIndex((l) => l.id === live.id);
    open(null, { ...live, title: `${live.title} (copie)`.slice(0, 160), published: false, position: index + 1 });
  }
  const shut = (force = false) => {
    if (busy) return;
    if (!force && dirty() && !confirm("Fermer sans enregistrer vos modifications ?")) return;
    previewVid.pause();
    dialog.close();
  };
  close.onclick = () => shut();
  cancel.onclick = () => shut();
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    shut();
  });
  dialog.addEventListener("close", () => previewVid.pause());
  dialog.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "Enter" || e.key === "s")) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
  addEventListener("beforeunload", (e) => {
    if (dirty()) e.preventDefault();
  });
  published.addEventListener("change", () => {
    if (!editing) save.textContent = published.checked ? "Ajouter et publier" : "Ajouter";
  });
  const lock = (on: boolean) => {
    busy = on;
    for (const b of [save, remove, cancel, close, historyButton, copyButton]) b.disabled = on;
  };
  form.onsubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    lock(true);
    error.replaceChildren();
    const wanted = Math.max(0, Math.round(Number(position.value || 1)) - 1);
    const body = {
      theme: theme.value,
      title: title.value,
      hook: hook.value,
      duration: duration.value,
      teaser: teaser.value,
      image,
      video: video.value || null,
      published: published.checked,
      position: wanted,
      ...(editing ? { version: editing.version } : {}),
    };
    try {
      const data: State = editing ? await api(`/item/${editing.id}`, "PUT", body) : await api("", "POST", body);
      apply(data);
      lock(false);
      dialog.close();
      const moved = editing && wanted !== draftPosition ? `, déplacé en position ${wanted + 1}` : "";
      say(`« ${body.title.trim()} » ${editing ? "enregistré" : "ajouté"}${body.published ? "" : " (masqué)"}${moved}.`);
      render();
    } catch (err) {
      // The input stays in the form; on conflict, offer the current version.
      error.append(el("span", "", (err as Error).message));
      if ((err as { status?: number }).status === 409 && editing) {
        const reload = button("Voir la version actuelle", "quiet");
        reload.onclick = async () => {
          if (!confirm("Vos modifications non enregistrées seront perdues. Continuer ?")) return;
          const id = editing!.id;
          lock(false);
          dialog.close();
          await load();
          const fresh = lives.find((l) => l.id === id);
          if (fresh) open(fresh);
        };
        error.append(" ", reload);
      }
      lock(false);
    }
  };
  remove.onclick = async () => {
    if (!editing || busy) return;
    const live = editing;
    if (dirty() && !confirm("Vos modifications non enregistrées seront perdues. Mettre ce live à la corbeille ?")) return;
    dialog.close();
    await trashLive(live);
  };
  copyButton.onclick = () => {
    if (!editing) return;
    if (dirty() && !confirm("Vos modifications non enregistrées ne seront pas copiées. Dupliquer la version enregistrée ?")) return;
    const live = editing;
    dialog.close();
    duplicate(live);
  };

  /* ── Historique ── */
  const historyDialog = el("dialog", "upcoming-history");
  historyDialog.setAttribute("aria-labelledby", "upcoming-history-heading");
  const hHead = el("header", "dialog-head");
  const hTitle = el("h2", "", "Historique du live");
  hTitle.id = "upcoming-history-heading";
  const hClose = button("×", "close");
  hClose.setAttribute("aria-label", "Fermer");
  hHead.append(hTitle, hClose);
  const hNote = el(
    "p",
    "field-note",
    "Restaurer une version remet son contenu (texte, thème, affiche, publication) comme nouvelle version. La position dans le programme ne change pas.",
  );
  const hList = el("ol", "upcoming-history-list");
  const hError = el("p", "form-message");
  hError.setAttribute("role", "alert");
  historyDialog.append(hHead, hNote, hList, hError);
  document.body.append(historyDialog);
  hClose.onclick = () => historyDialog.close();
  historyButton.onclick = async () => {
    if (!editing) return;
    if (dirty() && !confirm("Vos modifications non enregistrées seront perdues. Ouvrir l’historique ?")) return;
    const live = editing;
    dialog.close();
    hTitle.textContent = `Historique · ${live.title}`;
    hList.replaceChildren(el("li", "field-note", "Chargement…"));
    hError.textContent = "";
    historyDialog.showModal();
    try {
      const entries: HistoryEntry[] = await api(`/item/${live.id}/history`);
      hList.replaceChildren();
      const currentKey = JSON.stringify([live.title, live.theme, live.duration, live.hook, live.teaser, live.image, live.video, live.published]);
      for (const h of entries) {
        const li = el("li");
        const line = el("p");
        line.append(
          el("strong", "", ACTIONS[h.action] ?? h.action),
          document.createTextNode(h.action === "initial" ? " · programme importé" : ` · ${when(h.createdAt)} · ${h.actor}`),
        );
        li.append(line);
        if (h.data) {
          const d = h.data;
          li.append(el("p", "field-note", `${d.title} · ${themeLabel(d.theme)} · ${d.duration} · ${d.published ? "publié" : "masqué"} · ${plural(d.teaser.length, "point")}`));
          const key = JSON.stringify([d.title, d.theme, d.duration, d.hook, d.teaser, d.image, d.video, d.published]);
          if (key === currentKey) li.append(el("span", "badge", "Version actuelle"));
          else if (h.action !== "delete") {
            const restore = button("Restaurer cette version", "outline");
            restore.onclick = async () => {
              restore.disabled = true;
              const fresh = lives.find((l) => l.id === live.id);
              const data = await run(
                () => api(`/item/${live.id}/revert`, "POST", { historyId: h.id, version: fresh?.version ?? live.version }),
                h.action === "initial"
                  ? `Version d’origine restaurée pour « ${d.title} ».`
                  : `Version du ${when(h.createdAt)} restaurée pour « ${d.title} ».`,
              );
              if (data) historyDialog.close();
              else restore.disabled = false;
            };
            li.append(restore);
          }
        }
        hList.append(li);
      }
      if (!entries.length) hList.append(el("li", "field-note", "Aucune modification enregistrée depuis l’import du programme."));
    } catch (e) {
      hError.textContent = (e as Error).message;
    }
  };

  add.onclick = () => open(null);
  tab.addEventListener("click", () => void load());

  window.addEventListener("eci-calendar-session", (event) => {
    observed = true;
    session = (event as CustomEvent).detail;
    tab.hidden = !session;
    if (!session) {
      if (dialog.open) dialog.close();
      if (historyDialog.open) historyDialog.close();
      lives = [];
      trash = [];
      selected.clear();
      loaded = false;
      list.replaceChildren();
    } else if (!session.user.mustChange) void load();
  });
  void fetch("/api/calendar/session", { credentials: "same-origin", cache: "no-store" })
    .then(async (response) => {
      if (!response.ok || observed) return;
      session = await response.json();
      tab.hidden = false;
      if (!loaded) void load();
    })
    .catch(() => {});
}
