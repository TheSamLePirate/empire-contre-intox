/* Dossier XXXIII — Souveraines et debout · visualisations.
   Chaque chiffre affiché vient de l'audit sources/dossier-XXXIII-excision.md ;
   la page reste lisible sans JavaScript (les blocs <noscript> portent l'essentiel). */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const SVGNS = "http://www.w3.org/2000/svg";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fr = (n, d = 0) => n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const el = (tag, attrs = {}, parent) => {
    const n = tag.startsWith("svg:") ? document.createElementNS(SVGNS, tag.slice(4)) : document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "text") n.textContent = v; else if (k === "html") n.innerHTML = v; else n.setAttribute(k, v);
    }
    if (parent) parent.appendChild(n);
    return n;
  };
  const onSeen = (node, fn, threshold = 0.2) => {
    if (!("IntersectionObserver" in window)) return fn();
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); fn(); } }), { threshold });
    io.observe(node);
  };

  /* ————————————————————————————— 1. Chiffres clés ————————————————————————————— */
  function countUp(node) {
    const to = parseFloat(node.dataset.to), dec = +(node.dataset.dec || 0);
    const pre = node.dataset.pre || "", suf = node.dataset.suf || "";
    const out = node.querySelector("[data-n]") || node;
    if (reduced) { out.textContent = pre + fr(to, dec) + suf; return; }
    const t0 = performance.now(), dur = 1600;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      out.textContent = pre + fr(to * e, dec) + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* Cadran : 4 500 000 filles à risque sur 525 600 minutes ≈ 8,56 par minute. */
  function minuteDial(host) {
    const W = 220, R = 92, cx = 110, cy = 104;
    const svg = el("svg:svg", { viewBox: `0 0 ${W} 214`, role: "img",
      "aria-label": "Cadran d'une minute : environ 8,6 filles à risque par minute en moyenne en 2026, contre une toutes les quatre minutes annoncée à tort." }, host);
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * 2 * Math.PI - Math.PI / 2, r1 = i % 5 ? R - 4 : R - 9;
      el("svg:line", { x1: cx + Math.cos(a) * r1, y1: cy + Math.sin(a) * r1, x2: cx + Math.cos(a) * R, y2: cy + Math.sin(a) * R,
        stroke: i % 5 ? "rgba(166,211,197,.25)" : "rgba(214,172,85,.6)", "stroke-width": i % 5 ? 1 : 1.4 }, svg);
    }
    const per = 4500000 / 525600; // ≈ 8,56
    const dots = [];
    for (let i = 0; i < 9; i++) {
      const frac = i / per; if (frac >= 1) break;
      const a = frac * 2 * Math.PI - Math.PI / 2;
      dots.push(el("svg:circle", { cx: cx + Math.cos(a) * (R - 22), cy: cy + Math.sin(a) * (R - 22), r: 5.2, fill: "#e5c36f", opacity: reduced ? 1 : 0.12 }, svg));
    }
    /* Ce que le script annonçait : un seul point, à quatre minutes — hors du cadran d'une minute. */
    el("svg:circle", { cx, cy, r: 3, fill: "#e5c36f" }, svg);
    const hand = el("svg:line", { x1: cx, y1: cy, x2: cx, y2: cy - R + 14, stroke: "#f3d98a", "stroke-width": 1.4, "stroke-linecap": "round" }, svg);
    el("svg:text", { x: cx, y: cy + 30, "text-anchor": "middle", "font-size": 22, fill: "#f3d98a", style: "font-family:Cinzel,serif", text: "≈ 8,6" }, svg);
    el("svg:text", { x: cx, y: cy + 46, "text-anchor": "middle", "font-size": 9.5, text: "par minute, en moyenne" }, svg);
    el("svg:text", { x: cx, y: 212, "text-anchor": "middle", "font-size": 9, text: "60 secondes · 4,5 M ÷ 525 600 min" }, svg);
    if (reduced) { hand.setAttribute("transform", `rotate(360 ${cx} ${cy})`); return; }
    let t0 = null;
    const loop = (t) => {
      if (t0 === null) t0 = t;
      const k = ((t - t0) / 12000) % 1; // une « minute » jouée en 12 s
      hand.setAttribute("transform", `rotate(${k * 360} ${cx} ${cy})`);
      dots.forEach((d, i) => d.setAttribute("opacity", i / per <= k ? 1 : 0.12));
      if (document.body.contains(svg)) requestAnimationFrame(loop);
    };
    onSeen(svg, () => requestAnimationFrame(loop));
  }

  /* Deux pentes : rythme de la décennie passée et rythme requis pour 2030 (×27, UNICEF 2024). */
  function slopes(host) {
    const svg = el("svg:svg", { viewBox: "0 0 220 120", role: "img",
      "aria-label": "Deux pentes : le recul observé de la prévalence pendant la décennie précédente, et une pente vingt-sept fois plus forte, nécessaire pour atteindre l'objectif 2030." }, host);
    el("svg:line", { x1: 18, y1: 100, x2: 212, y2: 100, stroke: "rgba(244,236,216,.15)" }, svg);
    el("svg:line", { x1: 18, y1: 12, x2: 18, y2: 100, stroke: "rgba(244,236,216,.15)" }, svg);
    const a = el("svg:path", { d: "M18 22 L212 30", stroke: "#6ca99c", "stroke-width": 2, fill: "none" }, svg);
    const b = el("svg:path", { d: "M18 22 L120 98", stroke: "#e5c36f", "stroke-width": 2, fill: "none", "stroke-dasharray": "4 3" }, svg);
    el("svg:text", { x: 212, y: 44, "text-anchor": "end", "font-size": 9, text: "rythme observé" }, svg);
    el("svg:text", { x: 126, y: 92, "font-size": 9, fill: "#e5c36f", text: "rythme requis ×27" }, svg);
    el("svg:text", { x: 18, y: 114, "font-size": 8.5, text: "prévalence →  temps" }, svg);
    if (!reduced) [a, b].forEach((p) => {
      const L = p.getTotalLength(); p.style.strokeDasharray = p === b ? "4 3" : L; if (p === a) p.style.strokeDashoffset = L;
      onSeen(svg, () => { p.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)"; p.style.strokeDashoffset = 0; });
    });
  }

  function initFigures() {
    const root = $("#xv-chiffres"); if (!root) return;
    const nums = $$("[data-to]", root);
    if (!reduced) nums.forEach((n) => { (n.querySelector("[data-n]") || n).textContent = (n.dataset.pre || "") + "0"; });
    onSeen(root, () => nums.forEach(countUp));
    const rg = $("[data-regions]", root), R = window.ECI_EXCISION_REGIONS_M;
    if (rg && R) {
      /* Gaufre : un point = un million de survivantes, 23 colonnes. */
      const C = ["#e5c36f", "#6ca99c", "#c98e7a"], cols = 23, step = 9.6;
      const tot = R.reduce((a, r) => a + r.m, 0), rows = Math.ceil(tot / cols);
      const svg = el("svg:svg", { viewBox: `0 0 ${cols * step} ${rows * step + 2}`, role: "img",
        "aria-label": "Un point par million : " + R.map((r) => `${r.t} ${fr(r.m)} millions`).join(", ") + ", plus des cas non chiffrés ailleurs." }, rg);
      let k = 0;
      R.forEach((r, ri) => { for (let i = 0; i < r.m; i++, k++) {
        const c = el("svg:circle", { cx: (k % cols) * step + step / 2, cy: Math.floor(k / cols) * step + step / 2, r: 3.3, fill: C[ri] }, svg);
        if (!reduced) { c.style.opacity = 0; c.style.transition = `opacity .4s ${(k * 6)}ms`; }
      } });
      if (!reduced) onSeen(svg, () => $$("circle", svg).forEach((c) => (c.style.opacity = 1)));
      el("div", { class: "xv-regions-l", html: R.map((r, i) => `<span><i style="background:${C[i]}"></i>${r.t} ${fr(r.m)} M</span>`).join("") + "<span>1 point = 1 million</span>" }, rg);
    }
    const dl = $("[data-dial]", root); if (dl) minuteDial(dl);
    const sl = $("[data-slopes]", root); if (sl) slopes(sl);
  }

  /* ————————————————————————————— 2. Carte en tuiles ————————————————————————————— */
  /* Prévalence chez les filles et femmes de 15 à 49 ans — profils pays UNICEF (enquêtes nationales).
     p1519 : même indicateur chez les 15–19 ans, quand l'UNICEF le publie. */
  const PREV = window.ECI_EXCISION_PREV || [];
  /* Tuiles hexagonales, disposition approximativement géographique (colonne, rangée). */
  const LAYOUT = window.ECI_EXCISION_LAYOUT || [];
  const band = (p) => p == null ? null : p >= 85 ? 4 : p >= 60 ? 3 : p >= 30 ? 2 : p >= 10 ? 1 : 0;
  const BANDS = ["var(--xv-band0)", "var(--xv-band1)", "var(--xv-band2)", "var(--xv-band3)", "var(--xv-band4)"];
  const BAND_HEX = ["#173230", "#285955", "#4f8f88", "#a99c62", "#e5c36f"];

  function initMap() {
    const root = $("#xv-carte"); if (!root || !PREV.length) return;
    const byIso = Object.fromEntries(PREV.map((d) => [d.iso, d]));
    const host = $(".xv-map", root), panel = $(".xv-panel", root), wrap = $(".xv-map-wrap", root);
    const S = 24, HW = Math.sqrt(3) * S, VH = 1.5 * S; // hexagone à pointe en haut
    const cols = Math.max(...LAYOUT.map((t) => t.c)) + 2, rows = Math.max(...LAYOUT.map((t) => t.r)) + 1;
    const W = cols * HW + 24, H = rows * VH + S + 30;
    const svg = el("svg:svg", { viewBox: `-6 -18 ${W} ${H}`, role: "group", "aria-label": "Carte en tuiles : prévalence des mutilations génitales féminines par pays" }, host);
    const defs = el("svg:defs", {}, svg);
    const pat = el("svg:pattern", { id: "xvHatch", width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    el("svg:rect", { width: 6, height: 6, fill: "#0b1a1f" }, pat);
    el("svg:line", { x1: 0, y1: 0, x2: 0, y2: 6, stroke: "rgba(166,211,197,.55)", "stroke-width": 2 }, pat);
    (window.ECI_EXCISION_REGIONS || []).forEach((g) => el("svg:text", { class: "xv-region-label", x: g.c * HW + (g.r % 2 ? HW / 2 : 0), y: g.r * VH - 4, text: g.t }, svg));
    const hex = (x, y) => [0, 1, 2, 3, 4, 5].map((i) => { const a = Math.PI / 180 * (60 * i - 90); return `${(x + (S - 1) * Math.cos(a)).toFixed(1)},${(y + (S - 1) * Math.sin(a)).toFixed(1)}`; }).join(" ");
    const tiles = [];
    LAYOUT.forEach((t) => {
      const d = byIso[t.iso]; if (!d) return;
      const x = t.c * HW + (t.r % 2 ? HW / 2 : 0) + HW / 2, y = t.r * VH + S;
      const b = band(d.p);
      const g = el("svg:g", { class: "xv-tile" + (d.p == null ? " local" : ""), tabindex: 0, role: "button",
        "aria-label": d.p == null ? `${d.fr} : données locales seulement` : `${d.fr} : ${fr(d.p, 1)} % des 15–49 ans (${d.enq})` }, svg);
      el("svg:polygon", { points: hex(x, y), fill: b == null ? "url(#xvHatch)" : BAND_HEX[b] }, g);
      el("svg:text", { x, y: d.p == null ? y + 3 : y - 1, class: b == null || b < 2 ? "lt" : "", text: d.iso }, g);
      if (d.p != null) el("svg:text", { x, y: y + 11, class: "v" + (b < 2 ? " lt" : ""), text: (d.p < 1 ? "<1" : fr(Math.round(d.p))) + "%" }, g);
      g._d = d; tiles.push(g);
      const pick = () => show(d, g);
      g.addEventListener("mouseenter", pick); g.addEventListener("focus", pick); g.addEventListener("click", pick);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
    });
    function show(d, g) {
      tiles.forEach((t) => t.classList.toggle("on", t === g));
      $$(".xv-rank li", root).forEach((li) => li.classList.toggle("on", li.dataset.iso === d.iso));
      host.classList.add("dim");
      const gap = d.p1519 != null ? d.p - d.p1519 : null;
      const verdict = gap == null ? "" : gap >= 10 ? "les 15–19 ans sont nettement moins touchées que leurs aînées" : gap >= 3 ? "les 15–19 ans sont un peu moins touchées" : "pas de recul net d'une génération à l'autre";
      const gen = gap != null ? `<div class="xv-gen"><div class="xv-gen-row"><span>15–49 ans</span><span class="bar"><i style="width:${d.p}%"></i></span><b>${fr(d.p, 1)} %</b></div><div class="xv-gen-row"><span>15–19 ans</span><span class="bar"><i style="width:${d.p1519}%"></i></span><b>${fr(d.p1519, 1)} %</b></div></div><p>Dans cette enquête, ${verdict}.</p>` : "";
      panel.innerHTML = d.p == null
        ? `<p class="xv-k">Données locales seulement</p><h4>${d.fr}</h4><p>${d.note || "Des mutilations y sont documentées, sans enquête nationale représentative : aucun taux national n'est affiché."}</p>${d.url ? `<p><a href="${d.url}" target="_blank" rel="noopener">Source ↗</a></p>` : ""}`
        : `<p class="xv-k">${d.enq}</p><h4>${d.fr}</h4><p class="xv-big">${fr(d.p, 1)}<small>%</small></p><p>des filles et femmes de 15 à 49 ans ont subi une mutilation génitale.</p>${gen}${d.note ? `<p>${d.note}</p>` : ""}<p><a href="${d.url}" target="_blank" rel="noopener">${d.src || "Données UNICEF"} ↗</a></p>`;
    }
    host.addEventListener("mouseleave", () => { host.classList.remove("dim"); });
    /* Classement */
    const rank = $(".xv-rank", root);
    PREV.filter((d) => d.p != null).sort((a, b) => b.p - a.p).forEach((d) => {
      const li = el("li", { "data-iso": d.iso, tabindex: 0,
        html: `<span>${d.fr}</span><span class="bar"><i style="width:${d.p}%;background:${BAND_HEX[band(d.p)]}"></i>${d.p1519 != null ? `<u style="left:${d.p1519}%" title="15–19 ans : ${fr(d.p1519, 1)} %"></u>` : ""}</span><b>${fr(d.p, 1)} %</b>` }, rank);
      const g = tiles.find((t) => t._d === d);
      const pick = () => show(d, g);
      li.addEventListener("mouseenter", pick); li.addEventListener("focus", pick); li.addEventListener("click", pick);
    });
    $$(".xv-seg button", root).forEach((b) => b.addEventListener("click", () => {
      $$(".xv-seg button", root).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      wrap.classList.toggle("ranked", b.dataset.view === "rank");
    }));
    const first = byIso.SOM || PREV[0]; show(first, tiles.find((t) => t._d === first)); host.classList.remove("dim");
    /* Sur un petit écran, les tuiles deviennent illisibles : le classement s'affiche d'abord. */
    if (innerWidth < 640) $('.xv-seg button[data-view="rank"]', root).click();
  }

  /* ————————————————————————————— 3. Frise ————————————————————————————— */
  const TL = window.ECI_EXCISION_TL || [];
  const CATS = { histoire: ["Histoire", "#c9a86a"], droit: ["Droit", "#6ca99c"], combat: ["Voix & combat", "#e39a7e"], sante: ["Santé & données", "#9fb7d9"] };
  function initTimeline() {
    const root = $("#xv-frise"); if (!root || !TL.length) return;
    const list = $(".xv-tl", root), filters = $(".xv-filters", root);
    Object.entries(CATS).forEach(([k, [lab, c]]) => {
      const b = el("button", { type: "button", class: "xv-chip", "aria-pressed": "true", "data-cat": k, style: `--c:${c}`, html: `<i></i>${lab}` }, filters);
      b.addEventListener("click", () => { b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")); apply(); });
    });
    TL.forEach((e) => {
      if (e.era) { el("li", { class: "xv-ev era in", html: `<span>${e.era}</span>` }, list); return; }
      const [lab, c] = CATS[e.cat];
      el("li", { class: "xv-ev", "data-cat": e.cat, style: `--c:${c}`,
        html: `<span class="yr">${e.an}</span><span class="cat">${lab}</span><h4>${e.t}</h4><p>${e.d}</p>${e.url ? `<a href="${e.url}" target="_blank" rel="noopener">Source ↗</a>` : ""}` }, list);
    });
    function apply() {
      const on = new Set($$(".xv-chip", filters).filter((b) => b.getAttribute("aria-pressed") === "true").map((b) => b.dataset.cat));
      /* La parité gauche/droite suit les seuls jalons visibles, et repart à chaque ère. */
      let i = 0;
      $$(".xv-ev", list).forEach((li) => {
        if (li.classList.contains("era")) { i = 0; return; }
        const hide = !on.has(li.dataset.cat); li.classList.toggle("hide", hide);
        if (!hide) li.classList.toggle("r", i++ % 2 === 1);
      });
      stagger();
    }
    function stagger() {
      const items = $$(".xv-ev", list).filter((li) => !li.classList.contains("hide"));
      items.forEach((li) => (li.style.marginTop = ""));
      if (innerWidth <= 720) return;
      let prev = null, prev2 = null;
      items.forEach((li) => {
        if (li.classList.contains("era")) { prev = prev2 = null; return; }
        if (prev) {
          const natural = li.offsetTop;
          const want = Math.max(prev.offsetTop + 64, prev2 ? prev2.offsetTop + prev2.offsetHeight + 8 : 0);
          li.style.marginTop = Math.min(0, want - natural) + "px";
        }
        prev2 = prev; prev = li;
      });
    }
    apply();
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(stagger, 150); }, { passive: true });
    document.fonts?.ready.then(stagger);
    if (reduced || !("IntersectionObserver" in window)) { $$(".xv-ev", list).forEach((li) => li.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    $$(".xv-ev", list).forEach((li) => io.observe(li));
  }

  /* ————————————————————————————— 4. Qui alerter ————————————————————————————— */
  const FLOWS = {
    urgence: { note: "Une plaie ou une hémorragie récente : le 15 (SAMU). On ne peut pas parler : le 114, par SMS.",
      steps: [
        { who: "17 / 112", tel: "17", p: "Police-secours, ou le numéro d'urgence européen, gratuit depuis tout téléphone. Danger immédiat, départ imminent.", key: 1 },
        { who: "Le parquet agit", txt: 1, p: "Le procureur peut intervenir sans plainte de la victime, sur un simple signalement." },
        { who: "Mesures d'urgence", txt: 1, p: "Il peut placer l'enfant ou interdire sa sortie du territoire pour deux mois au plus, puis saisir le juge sous huit jours." }] },
    voyage: { note: "Le voyage prévu dans le pays d'origine de la famille est le principal signal : le risque se signale avant le départ, pas après.",
      steps: [
        { who: "119", tel: "119", p: "Allô Enfance en danger : un enfant en danger ou en risque de l'être. Gratuit, 24 h/24, ouvert aux enfants comme aux adultes.", key: 1 },
        { who: "CRIP", txt: 1, p: "La cellule du département recueille l'information préoccupante et la fait évaluer par une équipe pluridisciplinaire." },
        { who: "Procureur", txt: 1, p: "Saisi si le danger est grave et immédiat, si l'évaluation est impossible ou si la famille refuse l'aide." },
        { who: "Juge des enfants", txt: 1, p: "Il peut interdire la sortie du territoire, même sans l'accord des parents. Cette mesure n'est jamais automatique." }] },
    femme: { note: "Une femme concernée n'est pas « à réparer » : chaque parcours se choisit, à son rythme, avec des équipes formées.",
      steps: [
        { who: "3919", tel: "3919", p: "Violences Femmes Info : écoute, information, orientation. Anonyme, gratuit, 24 h/24. Ce n'est pas un numéro d'urgence.", key: 1 },
        { who: "Unité spécialisée", txt: 1, p: "Médecine, psychologie, sexologie : par exemple la Maison des femmes de Saint-Denis ou l'unité de Bicêtre (AP-HP)." },
        { who: "Si elle le souhaite", txt: 1, p: "Une chirurgie réparatrice, remboursée quand des équipes spécialisées la pratiquent. Elle n'est ni systématique ni une promesse de tout effacer." }] },
    pro: { note: "On n'enquête pas soi-même : on transmet. Un changement brutal de comportement évoque plutôt une mutilation déjà pratiquée : c'est un signe d'après coup.",
      steps: [
        { who: "Repérer", txt: 1, p: "Un voyage prévu dans le pays d'origine de la famille, surtout si seules les filles partent ou si le départ a lieu hors des vacances." },
        { who: "CRIP", txt: 1, p: "Risque possible mais pas imminent : transmettre une information préoccupante à la cellule du département." },
        { who: "Procureur", txt: 1, p: "Risque imminent ou mutilation constatée : signalement obligatoire au parquet des mineurs, copie à la CRIP. La loi lève le secret professionnel.", key: 1 }] }
  };
  function initFlow() {
    const root = $("#xv-alerter"); if (!root) return;
    const flow = $(".xv-flow", root), note = $(".xv-flow-note", root), tabs = $$(".xv-tab", root);
    const render = (k) => {
      const f = FLOWS[k]; flow.innerHTML = "";
      f.steps.forEach((s, i) => {
        const who = s.tel ? `<a class="who" href="tel:${s.tel}">${s.who}</a>` : `<span class="who txt">${s.who}</span>`;
        el("div", { class: "xv-step" + (s.key ? " key" : ""), style: `animation-delay:${i * 0.12}s`, html: `${who}<p>${s.p}</p>` }, flow);
      });
      note.textContent = f.note;
      tabs.forEach((t) => { const on = t.dataset.flow === k; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => render(t.dataset.flow));
      t.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (!d) return; e.preventDefault(); const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); render(n.dataset.flow);
      });
    });
    render("voyage");
  }

  /* ————————————————————————————— Couche graphique ————————————————————————————— */
  function initActs() {
    const acts = $$(".act-divider");
    if (!("IntersectionObserver" in window)) return acts.forEach((a) => a.classList.add("in"));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0 });
    acts.forEach((a) => io.observe(a));
  }

  const start = () => { initFigures(); initMap(); initTimeline(); initFlow(); initActs(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
