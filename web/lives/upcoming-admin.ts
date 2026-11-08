/**
 * Onglet « Prochainement » de l'administration : ajouter, modifier, masquer,
 * réordonner et supprimer les futurs lives affichés sur /prochainement.html.
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
}
interface Library {
  images: string[];
  videos: string[];
  uploads: { id: string; label: string; path: string }[];
}
const THEMES: [string, string][] = [
  ["lois", "Lois du réel"],
  ["cosmos", "Cosmos"],
  ["terre", "Terre"],
  ["vivant", "Vivant"],
];
const themeLabel = (id: string) => THEMES.find(([k]) => k === id)?.[1] ?? id;

const panel = document.querySelector<HTMLElement>("#upcoming-panel");
const tab = document.querySelector<HTMLButtonElement>("#upcoming-tab");
if (panel && tab) {
  let session: { user: { mustChange: boolean }; csrf: string } | null = null;
  let observed = false;
  let lives: Upcoming[] = [];
  let revision = 0;
  let library: Library = { images: [], videos: [], uploads: [] };
  let editing: Upcoming | null = null;
  let busy = false;
  let loaded = false;

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
  const norm = (s: string) =>
    s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

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
    if (!response.ok) throw Object.assign(new Error(data.error || "Programme indisponible."), { status: response.status });
    return data;
  }

  /* ── Liste ── */
  const notice = el("p", "notice");
  notice.setAttribute("role", "status");
  notice.setAttribute("aria-live", "polite");
  const toolbar = el("div", "toolbar");
  const search = el("input");
  search.type = "search";
  search.placeholder = "Titre, thème, mot du teasing…";
  const themeFilter = el("select");
  themeFilter.append(new Option("Tous les thèmes", ""));
  for (const [k, v] of THEMES) themeFilter.append(new Option(v, k));
  const searchField = field("Rechercher", search);
  searchField.classList.add("search-field");
  const view = el("a", "outline", "Voir la page ↗");
  view.href = "/prochainement.html";
  view.target = "_blank";
  view.rel = "noopener";
  const add = button("+ Ajouter un live", "primary");
  toolbar.append(searchField, field("Thème", themeFilter), view, add);
  const intro = el(
    "p",
    "field-note upcoming-intro",
    "L’ordre de la liste est l’ordre du programme public : le premier live publié passe « À l’affiche », les six suivants « Ensuite ». Les numéros (01, 02…) suivent cet ordre.",
  );
  const list = el("ol", "upcoming-list");
  list.setAttribute("aria-label", "Programme des futurs lives");
  panel.append(notice, toolbar, intro, list);

  function render() {
    const words = norm(search.value).split(/\s+/).filter(Boolean);
    const filtered = !!words.length || !!themeFilter.value;
    list.replaceChildren();
    let number = 0;
    let shown = 0;
    lives.forEach((live, index) => {
      if (live.published) number++;
      const hay = norm(`${live.title} ${live.hook} ${themeLabel(live.theme)} ${live.teaser.join(" ")}`);
      if ((themeFilter.value && live.theme !== themeFilter.value) || !words.every((w) => hay.includes(w))) return;
      shown++;
      const row = el("li", `upcoming-row theme-${live.theme}${live.published ? "" : " is-hidden"}`);
      const num = el("span", "upcoming-num", live.published ? String(number).padStart(2, "0") : "—");
      num.setAttribute("aria-label", live.published ? `Live ${number}` : "Masqué, sans numéro");
      const thumb = el("img", "upcoming-thumb");
      thumb.alt = "";
      thumb.loading = "lazy";
      if (live.image) thumb.src = src(live.image);
      const body = el("div", "upcoming-body");
      const meta = el("p", "upcoming-meta");
      meta.append(el("span", `upcoming-theme`, themeLabel(live.theme)), el("span", "", live.duration));
      if (!live.published) meta.append(el("span", "badge disabled", "Masqué"));
      if (live.video) meta.append(el("span", "badge", "Vidéo"));
      body.append(meta, el("strong", "upcoming-title", live.title));
      if (live.hook) body.append(el("p", "upcoming-hook", live.hook));
      const actions = el("div", "row-actions");
      const up = button("↑"),
        down = button("↓");
      up.setAttribute("aria-label", `Monter « ${live.title} »`);
      down.setAttribute("aria-label", `Descendre « ${live.title} »`);
      up.disabled = busy || filtered || index === 0;
      down.disabled = busy || filtered || index === lives.length - 1;
      if (filtered) up.title = down.title = "Videz la recherche pour réordonner.";
      up.onclick = () => void move(index, -1, up);
      down.onclick = () => void move(index, 1, down);
      const edit = button("Modifier");
      edit.onclick = () => open(live);
      actions.append(up, down, edit);
      row.append(num, thumb, body, actions);
      row.dataset.id = live.id;
      list.append(row);
    });
    if (!shown)
      list.append(el("li", "empty-state", lives.length ? "Aucun live ne correspond." : "Le programme est vide : ajoutez un premier live."));
    const published = lives.filter((l) => l.published).length;
    const count = document.querySelector("#upcoming-count");
    if (count) count.textContent = String(published);
  }
  search.addEventListener("input", render);
  themeFilter.addEventListener("change", render);

  async function load(message = "") {
    if (!session || session.user.mustChange) return;
    try {
      const data = await api("/all");
      lives = data.lives;
      revision = data.revision;
      library = data.library;
      loaded = true;
      render();
      notice.textContent = message;
    } catch (e) {
      notice.textContent = (e as Error).message;
    }
  }
  async function move(index: number, delta: number, trigger: HTMLButtonElement) {
    const target = index + delta;
    if (busy || target < 0 || target >= lives.length) return;
    const order = lives.map((l) => l.id);
    [order[index], order[target]] = [order[target], order[index]];
    busy = true;
    const id = lives[index].id;
    try {
      const data = await api("/order", "PUT", { order, revision });
      lives = data.lives;
      revision = data.revision;
      notice.textContent = `« ${lives[target].title} » déplacé en position ${target + 1}.`;
    } catch (e) {
      notice.textContent = (e as Error).message;
      if ((e as { status?: number }).status === 409) await load((e as Error).message);
    } finally {
      busy = false;
      render();
      // Keep keyboard focus on the moved row so several moves chain naturally.
      const row = list.querySelector<HTMLElement>(`[data-id="${id}"]`);
      const again = row?.querySelectorAll<HTMLButtonElement>(".row-actions button")[delta < 0 ? 0 : 1];
      (again && !again.disabled ? again : row?.querySelector<HTMLButtonElement>(".row-actions button:last-child") ?? trigger).focus();
    }
  }

  /* ── Formulaire ── */
  const dialog = el("dialog", "wide upcoming-dialog");
  dialog.setAttribute("aria-labelledby", "upcoming-heading");
  const form = el("form");
  const head = el("header", "dialog-head");
  const headText = el("div");
  const heading = el("h2", "", "Ajouter un live");
  heading.id = "upcoming-heading";
  headText.append(el("div", "eyebrow", "Prochainement"), heading);
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
  const positionField = field("Position dans le programme", position, "1 = à l’affiche.");
  const published = el("input");
  published.type = "checkbox";
  const publishedField = el("label", "inline");
  publishedField.append(published, document.createTextNode(" Publié sur la page Prochainement"));
  const pair = el("div", "fields-pair");
  pair.append(field("Thème", theme), field("Durée", duration));
  const left = el("div", "stack");
  left.append(
    field("Titre du live", title),
    pair,
    field("Accroche", hook),
    field("Le teasing", teaser),
    teaserCount,
    positionField,
    publishedField,
    durations,
  );
  // Media column: poster library, upload, optional animated loop.
  const right = el("div", "stack upcoming-media");
  const preview = el("figure", "upcoming-preview");
  const previewImg = el("img");
  previewImg.alt = "Aperçu de l’affiche";
  const previewVid = el("video");
  previewVid.muted = true;
  previewVid.loop = true;
  previewVid.playsInline = true;
  previewVid.setAttribute("aria-hidden", "true");
  const previewCaption = el("figcaption", "field-note");
  preview.append(previewImg, previewVid, previewCaption);
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
  const video = el("select");
  right.append(
    el("h3", "", "L’affiche"),
    preview,
    field("Rechercher dans la bibliothèque", gallerySearch),
    gallery,
    field("Ou importer une image", file, "JPEG, PNG ou WebP · 5 Mo maximum · recadrée en 960 × 645."),
    upload,
    field("Image animée (facultative)", video, "Les boucles vidéo du programme d’origine."),
  );
  const columns = el("div", "event-columns");
  columns.append(left, right);
  const error = el("p", "form-message");
  error.setAttribute("role", "alert");
  const footer = el("footer", "dialog-footer");
  const remove = button("Supprimer", "danger");
  const cancel = button("Annuler");
  const save = el("button", "primary", "Enregistrer et publier");
  save.type = "submit";
  footer.append(remove, el("div", "spacer"), cancel, save);
  form.append(head, columns, error, footer);
  dialog.append(form);
  document.body.append(dialog);
  let image = "";

  const imageChoices = () => [
    ...library.uploads.map((u) => ({ path: u.path, label: u.label })),
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
        for (const other of gallery.querySelectorAll("[role=option]"))
          other.setAttribute("aria-selected", String(other === b));
      };
      gallery.append(b);
    }
  }
  function updatePreview() {
    preview.classList.toggle("is-empty", !image);
    if (image) previewImg.src = src(image);
    else previewImg.removeAttribute("src");
    previewCaption.textContent = image
      ? `Affiche : ${image.replace(/^assets\/prochainement\//, "").replace(/^\/api\/calendar\/upcoming\/media\//, "import · ")}`
      : "Aucune affiche : l’image du programme sera utilisée.";
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
  }
  const countLines = () => {
    const n = teaser.value.split(/\r?\n/).filter((l) => l.trim()).length;
    teaserCount.textContent = `${n} point${n > 1 ? "s" : ""} sur 16 au maximum.`;
    teaserCount.classList.toggle("is-over", n > 16);
  };
  teaser.addEventListener("input", countLines);
  gallerySearch.addEventListener("input", renderGallery);
  video.addEventListener("change", updatePreview);
  file.addEventListener("change", () => {
    upload.disabled = !file.files?.length;
  });
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

  function open(live: Upcoming | null) {
    editing = live;
    heading.textContent = live ? "Modifier le live" : "Ajouter un live";
    title.value = live?.title ?? "";
    theme.value = live?.theme ?? "lois";
    duration.value = live?.duration ?? "≈ 2 h";
    hook.value = live?.hook ?? "";
    teaser.value = live?.teaser.join("\n") ?? "";
    published.checked = live?.published ?? true;
    image = live?.image ?? "";
    video.replaceChildren(new Option("Aucune", ""));
    for (const v of library.videos) video.append(new Option(v.replace(/^assets\/prochainement\//, ""), v));
    video.value = live?.video ?? "";
    positionField.hidden = !!live;
    position.max = String(lives.length + 1);
    position.value = String(lives.length + 1);
    remove.hidden = !live;
    error.textContent = "";
    gallerySearch.value = "";
    file.value = "";
    upload.disabled = true;
    countLines();
    renderGallery();
    updatePreview();
    dialog.showModal();
    title.focus();
  }
  const shut = () => {
    if (busy) return;
    previewVid.pause();
    dialog.close();
  };
  close.onclick = cancel.onclick = shut;
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    shut();
  });
  dialog.addEventListener("close", () => previewVid.pause());
  const lock = (on: boolean) => {
    busy = on;
    for (const b of [save, remove, cancel, close]) b.disabled = on;
  };
  form.onsubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    lock(true);
    error.textContent = "";
    const body = {
      theme: theme.value,
      title: title.value,
      hook: hook.value,
      duration: duration.value,
      teaser: teaser.value,
      image,
      video: video.value || null,
      published: published.checked,
      ...(editing ? { version: editing.version } : { position: Math.max(0, Number(position.value || lives.length + 1) - 1) }),
    };
    try {
      const data = editing
        ? await api(`/item/${editing.id}`, "PUT", body)
        : await api("", "POST", body);
      lives = data.lives;
      revision = data.revision;
      lock(false);
      dialog.close();
      render();
      notice.textContent = `« ${body.title.trim()} » enregistré${body.published ? " et publié" : " (masqué)"}.`;
    } catch (err) {
      // On conflict the input stays in the form: close, reopen to get the latest version.
      error.textContent = (err as Error).message;
      lock(false);
    }
  };
  remove.onclick = async () => {
    if (!editing || busy || !confirm(`Supprimer définitivement « ${editing.title} » du programme ?\nPour le retirer temporairement, décochez plutôt « Publié ».`))
      return;
    lock(true);
    try {
      const data = await api(`/item/${editing.id}`, "DELETE", { version: editing.version });
      lives = data.lives;
      revision = data.revision;
      const name = editing.title;
      lock(false);
      dialog.close();
      render();
      notice.textContent = `« ${name} » supprimé du programme.`;
    } catch (err) {
      error.textContent = (err as Error).message;
      lock(false);
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
      lives = [];
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
