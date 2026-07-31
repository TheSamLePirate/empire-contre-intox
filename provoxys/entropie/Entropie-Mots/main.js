import { el, fillLangs } from './ui.js';
import { LANGUAGES } from './data.js';
import { store, nav, onLang, setLang, save, load, reset } from './state.js';
import { refreshIcons } from './icons.js';

import * as chSurprise from './ch-surprise.js';
import * as chEntropy from './ch-entropy.js';
import * as chCode from './ch-code.js';
import * as chSignature from './ch-signature.js';
import * as chContext from './ch-context.js';
import * as chLab from './ch-lab.js';
import * as chWords from './ch-words.js';
import * as chGame from './ch-game.js';
import * as chNoise from './ch-noise.js';
import * as chScaling from './ch-scaling.js';
import * as chEnd from './ch-end.js';
import { renderMath } from './math.js';
import { letterStats, fnCurve } from './model.js';
import { coverage } from './predictor.js';

/* ============================================================
   ENTROPIA — coquille du parcours
   ------------------------------------------------------------
   Router de chapitres, rail de navigation, progression, langue
   globale. Chaque chapitre est initialisé à sa première visite
   (les modèles n-grammes ne sont construits qu'au besoin).
   ============================================================ */

const CHAPTERS = [
  { id: 'intro',     num: 0,  short: 'Introduction', icon: 'home' },
  { id: 'surprise',  num: 1,  short: 'Surprise',     icon: 'zap',               mod: chSurprise },
  { id: 'entropy',   num: 2,  short: 'Entropie',     icon: 'gauge',             mod: chEntropy },
  { id: 'code',      num: 3,  short: 'Codes',        icon: 'file-archive',      mod: chCode },
  { id: 'signature', num: 4,  short: 'Signatures',   icon: 'fingerprint',       mod: chSignature },
  { id: 'context',   num: 5,  short: 'Contexte',     icon: 'link',              mod: chContext },
  { id: 'lab',       num: 6,  short: 'Approximations', icon: 'flask-conical',   mod: chLab },
  { id: 'words',     num: 7,  short: 'Mot suivant',  icon: 'text-cursor-input', mod: chWords },
  { id: 'game',      num: 8,  short: 'Jeu de 1951',  icon: 'gamepad-2',         mod: chGame },
  { id: 'noise',     num: 9,  short: 'Bruit',        icon: 'radio',             mod: chNoise },
  { id: 'scaling',   num: 10, short: 'Echelle & IA', icon: 'brain-circuit',     mod: chScaling },
  { id: 'end',       num: 11, short: 'Conclusion',   icon: 'flag',              mod: chEnd }
];
const TOTAL = CHAPTERS.length - 1;

const BLURBS = {
  surprise: "Pourquoi un evenement rare apprend plus qu'un evenement certain.",
  entropy: "La surprise moyenne, et les trois axiomes qui la rendent unique.",
  code: "Compresser reellement un texte, et atteindre la limite theorique.",
  signature: "Reconnaitre une langue au cout en bits de son codage.",
  context: "Fn : chaque lettre de contexte fait fondre l'incertitude.",
  lab: "Du bruit pur aux phrases presque sensees, ordre par ordre.",
  words: "Predire le mot suivant, avec temperature et top-p.",
  game: "Devinez la suite d'un texte cache : l'experience de 1951.",
  noise: "La redondance repare un message abime par le bruit.",
  scaling: "Plus de donnees, plus de contexte : les lois d'echelle.",
  end: "Compression, correction, cryptographie, IA : une seule idee."
};

const started = new Set();
let current = 'intro';

const meta = id => CHAPTERS.find(c => c.id === id);
const index = id => CHAPTERS.findIndex(c => c.id === id);

/* ---------- Navigation ---------- */
function go(id, { scroll = true, hash = true } = {}) {
  if (!meta(id)) id = 'intro';
  document.querySelectorAll('section.chapter').forEach(s => { s.hidden = s.dataset.ch !== id; });
  current = id;

  /* Grave le degré en chiffre romain dans la tête du chapitre. */
  const sec = document.querySelector(`section[data-ch="${id}"]`);
  const num = meta(id).num;
  if (sec) {
    if (num > 0) sec.dataset.num = roman(num);
    else delete sec.dataset.num;
  }

  store.chapter = id;
  if (hash && location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
  if (id !== 'intro') store.visited.add(id);
  save();

  const m = meta(id);
  if (m.mod && !started.has(id)) {
    started.add(id);
    try { m.mod.init(); }
    catch (e) { console.error(`Chapitre « ${id} » : initialisation impossible`, e); }
  } else if (id === 'end') {
    chEnd.refresh();
  }

  renderRail();
  renderProgress();
  renderFooter();
  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  renderMath(document.querySelector(`section[data-ch="${id}"]`) || document);
  refreshIcons();
}

nav.go = go;
nav.reset = () => { reset(); started.clear(); location.reload(); };

/* ---------- Rail, chips, progression ---------- */

/* Chiffres romains : le parcours est une séquence réelle, l'ordre porte
   du sens. On grave donc les degrés à la manière du codex. */
const ROMAN = ['·', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
export const roman = n => ROMAN[n] || String(n);

function renderRail() {
  el('rail').innerHTML = CHAPTERS.map(c => `
    <button class="rail-item ${store.visited.has(c.id) ? 'done' : ''}" data-go="${c.id}" aria-current="${c.id === current}">
      <span class="rail-num">${roman(c.num)}</span>
      <span class="truncate">${c.short}</span>
    </button>`).join('');

  el('chipNav').innerHTML = CHAPTERS.map(c => `
    <button class="chip" data-go="${c.id}" aria-current="${c.id === current}">${c.num === 0 ? 'Intro' : roman(c.num) + ' · ' + c.short}</button>`).join('');

  document.querySelectorAll('[data-go]').forEach(b => { b.onclick = () => go(b.dataset.go); });

  const chip = el('chipNav').querySelector('[aria-current="true"]');
  if (chip) chip.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
}

function renderProgress() {
  const n = store.visited.size;
  const pct = n / TOTAL * 100;
  el('progressFill').style.width = pct + '%';
  el('progressLabel').textContent = `${roman(n)} / ${roman(TOTAL)}`;
  /* le fil d'or du rail se remplit au même rythme */
  el('rail').style.setProperty('--rail-progress', pct + '%');
}

function renderFooter() {
  const i = index(current);
  const prev = CHAPTERS[i - 1], next = CHAPTERS[i + 1];
  el('footPrev').disabled = !prev;
  el('footNext').disabled = !next;
  el('navPrev').disabled = !prev;
  el('navNext').disabled = !next;
  el('footPrevLabel').textContent = prev ? prev.short : 'Début';
  el('footNextLabel').textContent = next ? next.short : 'Fin du parcours';
}

function renderIntroList() {
  el('introList').innerHTML = CHAPTERS.filter(c => c.num > 0).map(c => `
    <button data-go="${c.id}" class="card p-4 text-left flex items-start gap-3.5">
      <span class="rail-num shrink-0 mt-0.5">${roman(c.num)}</span>
      <span class="min-w-0">
        <span class="block h-chapter text-[13px]">${c.short}</span>
        <span class="block text-[12px] leading-relaxed mt-1" style="color:var(--txt-3)">${BLURBS[c.id]}</span>
      </span>
    </button>`).join('');
}

/** Les chiffres de la page d'accueil sont mesurés, pas écrits en dur. */
function renderIntroFigures() {
  try {
    const st = letterStats(store.lang);
    const fn = fnCurve(store.lang);
    const f7 = fn[fn.length - 1].test;
    el('introF0').textContent = st.F0.toFixed(2).replace('.', ',');
    el('introF1').textContent = st.F1.toFixed(2).replace('.', ',');
    el('introFn').textContent = f7.toFixed(2).replace('.', ',');

    /* Les barres de la descente sont proportionnelles aux bits mesurés,
       F₀ valant la pleine largeur : l'écart se voit avant de se lire. */
    const bar = (id, bits) => {
      const n = el(id);
      if (n) n.style.width = Math.max(0, Math.min(100, bits / st.F0 * 100)) + '%';
    };
    bar('introF0Bar', st.F0);
    bar('introF1Bar', st.F1);
    bar('introFnBar', f7);
    const cov = coverage(store.lang);
    const nf = n => n.toLocaleString('fr-FR');
    const set = (id, v) => { const n = el(id); if (n) n.textContent = v; };
    set('introCorpus', nf(cov.trainChars));
    set('wCorpusTokens', nf(cov.tokens));
    set('wCorpusTri', (cov.triRepeat * 100).toFixed(1).replace('.', ',') + ' %');
    set('scCorpus', nf(cov.trainChars));
  } catch (e) {
    console.error('figures d\'introduction indisponibles', e);
  }
}

/* ---------- Démarrage ---------- */
function boot() {
  load();

  const sel = el('globalLang');
  fillLangs(sel, LANGUAGES);
  sel.value = store.lang;
  sel.addEventListener('change', () => setLang(sel.value));
  onLang(code => { sel.value = code; renderIntroFigures(); });

  renderIntroList();
  renderIntroFigures();
  el('startBtn').addEventListener('click', () => go('surprise'));
  el('homeBtn').addEventListener('click', () => go('intro'));
  el('resetBtn').addEventListener('click', () => nav.reset());

  const step = d => {
    const t = CHAPTERS[index(current) + d];
    if (t) go(t.id);
  };
  el('navPrev').addEventListener('click', () => step(-1));
  el('navNext').addEventListener('click', () => step(1));
  el('footPrev').addEventListener('click', () => step(-1));
  el('footNext').addEventListener('click', () => step(1));

  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (id && id !== current && meta(id)) go(id, { hash: false });
  });

  const fromHash = location.hash.slice(1);
  go(meta(fromHash) ? fromHash : (store.chapter || 'intro'), { scroll: false });
  refreshIcons();
  resolveTitle();
}

/* ============================================================
   Le titre se résout hors du bruit.
   ------------------------------------------------------------
   Chaque lettre part d'un tirage uniforme dans l'alphabet même
   du parcours — les 27 symboles de Shannon, équiprobables, soit
   F₀ — puis se fixe. C'est la thèse de la page jouée une fois :
   le bruit s'effondre en structure. Coupé si l'utilisateur a
   demandé moins de mouvement.
   ============================================================ */
function resolveTitle() {
  const host = document.querySelector('.resolve');
  if (!host) return;
  const text = host.dataset.resolve || host.textContent;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    host.textContent = text;
    return;
  }

  const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
  const chars = [...text];
  host.textContent = '';
  const spans = chars.map(ch => {
    const s = document.createElement('span');
    if (ch === ' ') { s.textContent = ' '; return host.appendChild(s), s; }
    s.className = 'noise';
    s.textContent = POOL[(Math.random() * POOL.length) | 0];
    host.appendChild(s);
    return s;
  });

  const start = performance.now();
  const SETTLE = 620;   // date de fixation du dernier caractère
  const SPREAD = 430;   // décalage de gauche à droite
  let raf;

  const tick = now => {
    const t = now - start;
    let pending = 0;
    spans.forEach((s, i) => {
      if (chars[i] === ' ' || !s.classList.contains('noise')) return;
      const due = SPREAD * (i / Math.max(1, spans.length - 1)) + SETTLE;
      if (t >= due) {
        s.classList.remove('noise');
        s.textContent = chars[i];
      } else {
        pending++;
        if ((t | 0) % 2 === 0) s.textContent = POOL[(Math.random() * POOL.length) | 0];
      }
    });
    if (pending) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  /* Si l'onglet passe en arrière-plan, on fixe le titre immédiatement. */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && raf) {
      cancelAnimationFrame(raf);
      host.textContent = text;
    }
  }, { once: true });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
