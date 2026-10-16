import type Hls from "../../lives-service/node_modules/hls.js";
import type {
  PublicLive,
  Snapshot,
  ChatMessage,
} from "../../lives-service/protocol.ts";
const root = document.querySelector<HTMLElement>("[data-lives]")!;
const page = root.dataset.lives === "page";
const apiOrigin = ["localhost", "127.0.0.1", "[::1]"].includes(
  location.hostname,
)
  ? root.dataset.api || location.origin
  : "https://empire-contre-intox.com";
const api = (path: string) => `${apiOrigin}${path}`;
const element = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls = "",
  text = "",
) => {
  const el = document.createElement(tag);
  el.className = cls;
  el.textContent = text;
  return el;
};
const label = (s: PublicLive["state"]) =>
  ({
    unknown: "Vérification en cours",
    offline: "Hors ligne",
    live: "En direct",
    ended: "Live terminé",
    error: "Statut à confirmer",
  })[s];
const count = (v: number | null) =>
  v === null
    ? "—"
    : new Intl.NumberFormat("fr-FR", { notation: "compact" }).format(v);
function portrait(name: string, url: string | null) {
  const wrapper = element(
    "span",
    "live-avatar",
    name.slice(0, 2).toUpperCase(),
  );
  if (url) {
    const img = element("img");
    img.src = url;
    img.alt = "";
    img.referrerPolicy = "no-referrer";
    img.loading = "lazy";
    img.addEventListener("error", () => img.remove(), { once: true });
    wrapper.append(img);
  }
  return wrapper;
}
const cards = element("div", "live-cards");
const notice = element("p", "live-notice");
notice.setAttribute("role", "status");
const directoryHeading = element("div", "live-directory-heading");
const directoryTitle = element("h2", "", "Les voix du collectif");
const liveCount = element("span", "live-count");
liveCount.setAttribute("aria-live", "polite");
if (page) {
  directoryHeading.append(directoryTitle, liveCount);
  root.append(notice, directoryHeading, cards);
} else root.append(notice, cards);
let accounts: PublicLive[] = [],
  selectedId = "",
  destroy = () => {},
  loading = false;
async function read<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(api(path), {
    ...options,
    credentials: "omit",
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Le service est indisponible.");
  return data;
}
function card(live: PublicLive) {
  const card = element(
    "article",
    `live-card ${live.state === "live" ? "is-on-air" : "is-offline"}`,
  );
  card.dataset.liveId = live.id;
  const href = `${page ? "" : location.hostname.endsWith("github.io") ? "./lives/" : "/lives/"}?live=${encodeURIComponent(live.id)}`;
  const cover = element("a", "live-cover");
  cover.href = href;
  cover.tabIndex = -1;
  cover.setAttribute("aria-hidden", "true");
  if (live.coverUrl) {
    const img = element("img");
    img.src = live.coverUrl;
    img.alt = "";
    img.loading = page ? "lazy" : "eager";
    img.referrerPolicy = "no-referrer";
    cover.append(img);
  }
  cover.append(element("span", "live-cover-mark", "ECI"));
  const body = element("div", "live-card-body");
  const top = element("div", "live-card-top");
  top.append(
    element(
      "span",
      `live-badge ${live.state === "live" ? "is-live" : ""}`,
      label(live.state),
    ),
    element("span", "live-card-platform", "TikTok LIVE"),
  );
  const title = element("h3", "");
  const titleLink = element("a", "", live.title || live.displayName);
  titleLink.href = href;
  title.append(titleLink);
  const host = element("div", "live-host");
  host.append(portrait(live.displayName, live.avatarUrl));
  const names = element("div");
  names.append(
    element("strong", "", live.displayName),
    element("small", "", `@${live.username}`),
  );
  host.append(names);
  const footer = element("div", "live-card-footer");
  const metrics = element(
    "span",
    "live-meta",
    live.state === "live"
      ? `${count(live.viewers)} spectateurs`
      : "En attendant le prochain rendez-vous",
  );
  const cta = element(
    "a",
    "live-button",
    live.state === "live" ? "Rejoindre le direct" : "Voir le compte",
  );
  cta.href = href;
  cta.append(element("span", "live-arrow", "↗"));
  cta.setAttribute(
    "aria-label",
    `${live.state === "live" ? "Regarder le live de" : "Voir le compte de"} ${live.displayName}`,
  );
  footer.append(metrics, cta);
  body.append(top, title, host, footer);
  card.append(cover, body);
  if (live.id === selectedId) {
    card.classList.add("is-selected");
    cta.setAttribute("aria-current", "true");
  }
  if (page)
    for (const anchor of [cover, titleLink, cta])
      anchor.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        void select(live.id, true);
      });
  return card;
}
// Keep cards, loaded images and keyboard focus stable between data refreshes.
const cardNodes = new Map<string, HTMLElement>();
const pendingImages = new WeakMap<HTMLElement, string>();
function text(node: Element | null, value: string) {
  if (node && node.textContent !== value) node.textContent = value;
}
function updateImage(parent: HTMLElement, url: string | null) {
  const current = parent.querySelector("img");
  if (!url) {
    pendingImages.delete(parent);
    current?.remove();
    return;
  }
  if (current) {
    const previous = new URL(current.src);
    const next = new URL(url);
    // Renewed CDN signatures do not change the image already on screen.
    if (previous.origin === next.origin && previous.pathname === next.pathname) {
      pendingImages.delete(parent);
      return;
    }
  }
  if (pendingImages.get(parent) === url) return;
  pendingImages.set(parent, url);
  const image = element("img");
  image.alt = "";
  image.referrerPolicy = "no-referrer";
  image.src = url;
  void image.decode().then(() => {
    if (!parent.isConnected || pendingImages.get(parent) !== url) return;
    pendingImages.delete(parent);
    if (current?.parentNode === parent) current.replaceWith(image);
    else parent.prepend(image);
  }).catch(() => {
    if (pendingImages.get(parent) === url) pendingImages.delete(parent);
  });
}
function updateCard(node: HTMLElement, live: PublicLive) {
  const onAir = live.state === "live";
  node.classList.toggle("is-on-air", onAir);
  node.classList.toggle("is-offline", !onAir);
  const badge = node.querySelector(".live-badge")!;
  text(badge, label(live.state));
  badge.classList.toggle("is-live", onAir);
  text(node.querySelector("h3 a"), live.title || live.displayName);
  text(node.querySelector(".live-host strong"), live.displayName);
  text(node.querySelector(".live-host small"), `@${live.username}`);
  text(node.querySelector(".live-meta"), onAir
    ? `${count(live.viewers)} spectateurs`
    : "En attendant le prochain rendez-vous");
  const button = node.querySelector<HTMLAnchorElement>(".live-button")!;
  const caption = onAir ? "Rejoindre le direct" : "Voir le compte";
  if (button.firstChild?.nodeValue !== caption) button.firstChild!.nodeValue = caption;
  button.setAttribute("aria-label", `${onAir ? "Regarder le live de" : "Voir le compte de"} ${live.displayName}`);
  const avatar = node.querySelector<HTMLElement>(".live-avatar")!;
  if (avatar.firstChild?.nodeType === Node.TEXT_NODE)
    avatar.firstChild.nodeValue = live.displayName.slice(0, 2).toUpperCase();
  updateImage(avatar, live.avatarUrl);
  updateImage(node.querySelector<HTMLElement>(".live-cover")!, live.coverUrl);
}
function updateCards(visible: PublicLive[]) {
  const ids = new Set(visible.map((live) => live.id));
  for (const [id, node] of cardNodes) {
    if (!ids.has(id)) {
      node.remove();
      cardNodes.delete(id);
    }
  }
  visible.forEach((live, index) => {
    let node = cardNodes.get(live.id);
    if (!node) {
      node = card(live);
      cardNodes.set(live.id, node);
    } else updateCard(node, live);
    const position = cards.children[index] ?? null;
    if (position !== node) cards.insertBefore(node, position);
  });
}
async function refresh() {
  if (loading) return;
  loading = true;
  try {
    const data = await read<{ accounts: PublicLive[] }>("/api/lives/public");
    accounts = data.accounts;
    const visible = page
      ? accounts
      : accounts.filter((l) => l.state === "live");
    updateCards(visible);
    cards.dataset.count = String(visible.length);
    const active = accounts.filter((l) => l.state === "live").length;
    text(liveCount, active
      ? `${active} direct${active > 1 ? "s" : ""} en cours`
      : "Le collectif");
    const homeCount = root.querySelector<HTMLElement>("[data-live-total]");
    if (homeCount)
      homeCount.textContent =
        active > 1 ? `${active} émissions en cours` : "Une émission en cours";
    text(notice, page
      ? visible.some((l) => l.state === "live")
        ? ""
        : "Aucun live en cours. Retrouvez les rendez-vous dans le calendrier."
      : "");
    root.hidden = !page && !visible.length;
    if (page && !selectedId) {
      const desired = new URL(location.href).searchParams.get("live");
      if (desired) void select(desired, false);
    }
    if (selectedId && !accounts.some((l) => l.id === selectedId)) {
      destroy();
      player.hidden = true;
      notice.textContent = "Ce live a été retiré.";
      selectedId = "";
      document.body.classList.remove("is-watching");
    }
  } catch {
    notice.textContent = "Le suivi des lives est temporairement indisponible.";
    if (!page) {
      root.hidden = false;
      // Keep the last confirmed cards visible during a temporary request failure.
      const total = root.querySelector("[data-live-total]");
      if (total) total.textContent = "Suivi indisponible";
    }
  } finally {
    loading = false;
  }
}
const player = element("section", "live-player");
player.hidden = true;
if (page) {
  player.id = "live-player";
  root.prepend(player);
}
async function select(id: string, push: boolean) {
  if (id === selectedId && !player.hidden && player.querySelector("video")) {
    player.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    return;
  }
  destroy();
  selectedId = id;
  document.body.classList.add("is-watching");
  for (const card of cards.querySelectorAll<HTMLElement>(".live-card")) {
    const selected = card.dataset.liveId === id;
    card.classList.toggle("is-selected", selected);
    const cta = card.querySelector(".live-button");
    if (selected) cta?.setAttribute("aria-current", "true");
    else cta?.removeAttribute("aria-current");
  }
  player.hidden = false;
  player.replaceChildren(element("p", "", "Ouverture du live…"));
  if (push) {
    const url = new URL(location.href);
    url.searchParams.set("live", id);
    history.pushState({}, "", url);
  }
  const controller = new AbortController();
  let source: EventSource | null = null,
    hls: Hls | null = null,
    leaseToken = "",
    renewTimer: ReturnType<typeof setInterval> | undefined,
    statusTimer: ReturnType<typeof setTimeout> | undefined;
  const release = () => {
    if (leaseToken)
      void fetch(api(`/api/lives/${id}/playback`), {
        method: "DELETE",
        headers: { "X-Playback-Lease": leaseToken },
        keepalive: true,
        credentials: "omit",
      }).catch(() => {});
    leaseToken = "";
  };
  destroy = () => {
    controller.abort();
    source?.close();
    hls?.destroy();
    clearInterval(renewTimer);
    clearTimeout(statusTimer);
    release();
    const video = player.querySelector("video");
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  };
  try {
    const initial = await read<Snapshot>(`/api/lives/${id}`);
    if (controller.signal.aborted) return;
    const main = element("div", "live-video-panel"),
      aside = element("aside", "live-chat");
    aside.setAttribute("aria-label", "Chat TikTok en lecture seule");
    const title = element(
        "h2",
        "",
        initial.live.title || initial.live.displayName,
      ),
      meta = element("p", "live-meta");
    const host = element("div", "live-host");
    host.append(
      portrait(initial.live.displayName, initial.live.avatarUrl),
      element(
        "strong",
        "",
        `${initial.live.displayName} · @${initial.live.username}`,
      ),
    );
    const video = element("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    if (initial.live.coverUrl) video.poster = initial.live.coverUrl;
    const state = element("p", "live-notice");
    state.setAttribute("role", "status");
    const tiktok = element("a", "live-external", "Ouvrir sur TikTok ↗");
    tiktok.href = initial.live.tiktokUrl;
    tiktok.target = "_blank";
    tiktok.rel = "noopener noreferrer";
    const programHeader = element("div", "live-program-header");
    const programKicker = element("div", "live-program-kicker");
    const programBadge = element(
      "span",
      "live-badge",
      label(initial.live.state),
    );
    programKicker.append(
      programBadge,
      element("span", "live-program-label", "L’Empire en direct"),
    );
    programHeader.append(programKicker, title, host);
    const videoStage = element("div", "live-video-stage");
    const playButton = element("button", "live-play-overlay");
    playButton.type = "button";
    playButton.hidden = true;
    playButton.setAttribute("aria-label", "Lire le live");
    const playIcon = element("span", "live-play-icon", "▶");
    playIcon.setAttribute("aria-hidden", "true");
    playButton.append(playIcon, element("span", "live-play-caption", "Lire le direct"));
    playButton.addEventListener("click", () => void startPlayback());
    videoStage.append(video, playButton);
    const programFooter = element("div", "live-program-footer");
    programFooter.append(meta, tiktok);
    main.append(programHeader, videoStage, state, programFooter);
    const heading = element("div", "live-chat-heading");
    const chatStatus = element("span", "live-meta");
    heading.append(element("h2", "", "La conversation"), chatStatus);
    const feed = element("div", "live-chat-feed");
    feed.tabIndex = 0;
    feed.setAttribute("aria-label", "Messages TikTok");
    const controls = element("div", "live-chat-controls");
    const newer = element(
      "button",
      "live-button",
      "Revenir aux nouveaux messages ↓",
    );
    newer.hidden = true;
    const pause = element("button", "live-quiet", "Pause du défilement");
    pause.type = "button";
    newer.type = "button";
    let paused = false,
      newCount = 0;
    const ids = new Set<string>();
    const setPaused = (value: boolean) => {
      paused = value;
      pause.textContent = value
        ? "Reprendre le défilement"
        : "Pause du défilement";
      pause.setAttribute("aria-pressed", String(value));
      newer.hidden = !value;
    };
    pause.onclick = () => {
      setPaused(!paused);
      if (!paused) feed.scrollTop = feed.scrollHeight;
    };
    newer.onclick = () => {
      setPaused(false);
      newCount = 0;
      feed.scrollTop = feed.scrollHeight;
    };
    feed.addEventListener("scroll", () => {
      if (feed.scrollHeight - feed.scrollTop - feed.clientHeight > 70)
        setPaused(true);
    });
    function appendMessage(m: ChatMessage) {
      if (ids.has(m.id)) return;
      ids.add(m.id);
      const row = element("article", "live-message");
      row.dataset.messageId = m.id;
      row.dataset.time = m.timestamp;
      row.append(portrait(m.nickname, m.avatarUrl));
      const content = element("div");
      const line = element("div", "live-message-author");
      line.append(
        element("strong", "", m.nickname),
        element("small", "", `@${m.username}`),
      );
      const time = element(
        "time",
        "",
        new Intl.DateTimeFormat("fr-FR", {
          timeZone: "Europe/Paris",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(m.timestamp)),
      );
      time.dateTime = m.timestamp;
      line.append(time);
      content.append(line, element("p", "", m.text));
      row.append(content);
      feed.append(row);
      while (feed.children.length > 200) {
        const first = feed.firstElementChild as HTMLElement;
        ids.delete(first.dataset.messageId!);
        first.remove();
      }
      if (!paused) feed.scrollTop = feed.scrollHeight;
      else {
        newer.textContent = `${++newCount} nouveau${newCount > 1 ? "x" : ""} message${newCount > 1 ? "s" : ""} ↓`;
        newer.hidden = false;
      }
    }
    let currentLive = initial.live;
    let playbackReady = false;
    let preparing = false,
      retries = 0,
      preparedRoom: string | null = null;
    async function startPlayback() {
      if (!playbackReady || controller.signal.aborted || currentLive.state !== "live") return;
      playButton.hidden = true;
      try {
        await video.play();
      } catch (error) {
        if (!controller.signal.aborted && playbackReady && video.paused && currentLive.state === "live" &&
            !(error instanceof DOMException && error.name === "AbortError"))
          playButton.hidden = false;
      }
    }
    function scheduleRetry() {
      if (
        controller.signal.aborted ||
        currentLive.state !== "live" ||
        retries >= 3
      )
        return;
      state.textContent = "Reconnexion de la vidéo…";
      clearTimeout(statusTimer);
      statusTimer = setTimeout(() => void prepare(), 3000 * ++retries);
    }
    video.addEventListener("error", scheduleRetry);
    video.addEventListener("playing", () => {
      retries = 0;
      playButton.hidden = true;
    });
    const renderState = (live: PublicLive) => {
      currentLive = live;
      programBadge.textContent =
        live.state === "live" ? "À l’antenne" : label(live.state);
      programBadge.classList.toggle("is-live", live.state === "live");
      chatStatus.dataset.state = live.chatState;
      meta.textContent = `${count(live.viewers)} spectateurs TikTok · ${count(live.likes)} likes${live.startedAt ? " · Depuis " + new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" }).format(new Date(live.startedAt)) : ""}`;
      title.textContent = live.title || live.displayName;
      chatStatus.textContent = {
        connected: "Connecté",
        connecting: "Connexion…",
        reconnecting: "Reconnexion…",
        unavailable: "Indisponible",
      }[live.chatState];
      if (live.state !== "live") {
        state.textContent = label(live.state);
        playbackReady = false;
        playButton.hidden = true;
        video.pause();
        clearInterval(renewTimer);
        release();
      } else if (
        live.qualities.length &&
        preparedRoom !== live.roomId &&
        !preparing
      ) {
        void prepare();
      } else if (!live.qualities.length)
        state.textContent = "La vidéo est momentanément indisponible.";
    };
    controls.append(newer, pause);
    aside.append(
      heading,
      element(
        "p",
        "live-chat-note",
        "Les voix du direct. Le chat peut précéder l’image de quelques secondes.",
      ),
      feed,
      controls,
    );
    player.replaceChildren(main, aside);
    initial.messages.forEach(appendMessage);
    renderState(initial.live);
    const cursor = `${initial.cursor.epoch}:${initial.cursor.roomId ?? "none"}:${initial.cursor.sequence}`;
    source = new EventSource(
      api(`/api/lives/${id}/events?cursor=${encodeURIComponent(cursor)}`),
    );
    source.addEventListener("chat", (e) => {
      try {
        appendMessage(JSON.parse((e as MessageEvent).data));
      } catch {}
    });
    source.addEventListener("state", (e) => {
      try {
        renderState(JSON.parse((e as MessageEvent).data));
      } catch {}
    });
    source.addEventListener("reset", (e) => {
      try {
        const snap: Snapshot = JSON.parse((e as MessageEvent).data);
        feed.replaceChildren();
        ids.clear();
        snap.messages.forEach(appendMessage);
        renderState(snap.live);
        chatStatus.textContent = "Chat actualisé";
      } catch {}
    });
    source.onerror = () => {
      chatStatus.textContent = "Reconnexion…";
      chatStatus.dataset.state = "reconnecting";
    };
    async function attach(playlistUrl: string) {
      const { default: Hls } =
        await import("../../lives-service/node_modules/hls.js");
      const url = api(playlistUrl);
      if (video.canPlayType("application/vnd.apple.mpegurl")) video.src = url;
      else if (Hls.isSupported()) {
        hls = new Hls({ liveSyncDurationCount: 3, maxBufferLength: 30 });
        hls.loadSource(url);
        hls.attachMedia(video);
        let repairs = 0;
        hls.on(Hls.Events.ERROR, (_e, d) => {
          if (d.fatal) {
            if (repairs++ < 2 && d.type === Hls.ErrorTypes.MEDIA_ERROR)
              hls?.recoverMediaError();
            else {
              state.textContent =
                "Lecture interrompue. Relancez le lecteur ou ouvrez TikTok.";
              hls?.destroy();
              clearInterval(renewTimer);
              release();
              scheduleRetry();
            }
          }
        });
      } else
        throw new Error(
          "Ce navigateur ne prend pas en charge ce format vidéo. Ouvrez TikTok.",
        );
    }
    async function prepare() {
      if (
        preparing ||
        controller.signal.aborted ||
        currentLive.state !== "live"
      )
        return;
      preparing = true;
      const resume = preparedRoom !== currentLive.roomId || !video.paused;
      playbackReady = false;
      playButton.hidden = true;
      preparedRoom = currentLive.roomId;
      state.textContent = "Préparation de la vidéo…";
      hls?.destroy();
      clearInterval(renewTimer);
      release();
      try {
        const result = await read<{
          leaseToken: string;
          playlistUrl: string;
          quality: string;
          playbackState: string;
        }>(`/api/lives/${id}/playback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        if (controller.signal.aborted) {
          leaseToken = result.leaseToken;
          release();
          return;
        }
        leaseToken = result.leaseToken;
        renewTimer = setInterval(() => {
          void read<{ playbackState: string }>(`/api/lives/${id}/playback`, {
            method: "PUT",
            headers: { "X-Playback-Lease": leaseToken },
          })
            .then((s) => {
              if (s.playbackState === "unavailable") {
                state.textContent =
                  "La vidéo est indisponible. Relancez la lecture.";
                clearInterval(renewTimer);
                release();
                scheduleRetry();
              }
            })
            .catch(() => {
              state.textContent =
                "Connexion vidéo perdue. Relancez la lecture.";
              clearInterval(renewTimer);
              release();
              scheduleRetry();
            });
        }, 20000);
        const wait = async (attempt = 0): Promise<void> => {
          if (controller.signal.aborted) return;
          const response = await fetch(api(result.playlistUrl), {
            method: "HEAD",
            credentials: "omit",
            signal: controller.signal,
          });
          if (response.ok) {
            state.textContent = `En direct · ${result.quality}`;
            await attach(result.playlistUrl);
            return;
          }
          if (attempt >= 20)
            throw new Error(
              "La vidéo tarde à démarrer. Réessayez ou ouvrez TikTok.",
            );
          await new Promise<void>((resolve) => {
            statusTimer = setTimeout(resolve, 1000);
          });
          return wait(attempt + 1);
        };
        await wait();
        if (!controller.signal.aborted && currentLive.state === "live") {
          playbackReady = true;
          if (resume) void startPlayback();
          else playButton.hidden = false;
        }
      } catch (e) {
        if (!controller.signal.aborted) {
          state.textContent =
            e instanceof Error ? e.message : "Lecture indisponible.";
          release();
          clearInterval(renewTimer);
          scheduleRetry();
        }
      } finally {
        preparing = false;
      }
    }
    if (push)
      player.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
  } catch (e) {
    if (!controller.signal.aborted)
      player.replaceChildren(
        element(
          "p",
          "live-notice",
          e instanceof Error ? e.message : "Live indisponible.",
        ),
      );
  }
}
const chatExpiryTimer = setInterval(() => {
  for (const row of player.querySelectorAll<HTMLElement>(".live-message"))
    if (Date.parse(row.dataset.time ?? "") < Date.now() - 600000) row.remove();
}, 30000);
const refreshTimer = setInterval(() => {
  if (!document.hidden) void refresh();
}, 15000);
window.addEventListener("popstate", () => {
  const id = new URL(location.href).searchParams.get("live");
  if (id) void select(id, false);
  else {
    destroy();
    selectedId = "";
    document.body.classList.remove("is-watching");
    player.hidden = true;
  }
});
window.addEventListener("pagehide", () => {
  destroy();
  clearInterval(refreshTimer);
  clearInterval(chatExpiryTimer);
});
void refresh();
