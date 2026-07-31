import { el, esc, langChips, COLORS, statCard, heat } from './ui.js';
import { LANGUAGES, SAMPLES } from './data.js';
import { normalize, letterStats } from './model.js';
import { store, setLang, onLang } from './state.js';
import { refreshIcons } from './icons.js';
import { renderMath } from './math.js';

/* ============================================================
   CHAPITRE 4 — La signature statistique des langues
   ------------------------------------------------------------
   Identifier une langue revient à choisir le code le moins cher.
   Coder un texte de distribution p avec un code optimisé pour q
   coûte l'entropie croisée

       H(p,q) = −Σ pᵢ log₂ qᵢ  =  H(p) + D(p‖q)

   où D(p‖q) ≥ 0 est la divergence de Kullback–Leibler : les bits
   gaspillés par un mauvais modèle. C'est exactement la fonction
   de coût minimisée pendant l'entraînement d'un modèle de langage.
   ============================================================ */

const REF = {};
let UNION = [];

function buildRefs() {
  const alpha = new Set();
  for (const code of Object.keys(LANGUAGES)) {
    const st = letterStats(code);
    REF[code] = { counts: new Map(st.rows.map(r => [r.ch, r.c])), n: st.n, H: st.F1 };
    for (const r of st.rows) alpha.add(r.ch);
  }
  UNION = [...alpha].sort();
  // lissage additif : aucune probabilité nulle, sinon le coût serait infini
  for (const code of Object.keys(REF)) {
    const { counts, n } = REF[code];
    const q = new Map();
    for (const ch of UNION) q.set(ch, ((counts.get(ch) || 0) + 0.5) / (n + 0.5 * UNION.length));
    REF[code].q = q;
  }
}

/** Distribution empirique du texte de l'utilisateur. */
function profile(text) {
  const sc = /[а-яё]/i.test(text) ? 'cyrillic' : 'latin';
  const s = normalize(text, sc);
  const counts = new Map();
  let n = 0;
  for (const ch of s) { counts.set(ch, (counts.get(ch) || 0) + 1); n++; }
  const p = new Map();
  if (n) for (const [k, v] of counts) p.set(k, v / n);
  return { p, n };
}

/** H(p,q), H(p) et D(p‖q) en bits par lettre. */
function costs(p, code) {
  const q = REF[code].q;
  const floor = 1 / (2 * (REF[code].n + UNION.length));
  let cross = 0, self = 0;
  for (const [ch, pi] of p) {
    if (pi <= 0) continue;
    cross += -pi * Math.log2(q.get(ch) || floor);
    self += -pi * Math.log2(pi);
  }
  return { cross, self, kl: cross - self };
}

const rank = p => Object.keys(LANGUAGES)
  .map(code => ({ code, ...costs(p, code) }))
  .sort((a, b) => a.cross - b.cross);

function renderResult(res, n) {
  const host = el('dResult');
  if (n < 12) {
    host.innerHTML = `<div class="flex items-center gap-2.5 text-xs" style="color:var(--txt-3)">
      <i data-lucide="scan-line" class="w-4 h-4"></i>
      <span>Écrivez au moins une douzaine de lettres pour que la signature se dessine.</span></div>`;
    refreshIcons();
    return;
  }
  const best = res[0], second = res[1];
  const margin = second.cross - best.cross;
  const conf = Math.max(0, Math.min(1, margin / 0.35));
  const label = conf > 0.7 ? 'très sûr' : conf > 0.3 ? 'probable' : 'hésitant';
  const color = conf > 0.7 ? 'var(--ok)' : conf > 0.3 ? 'var(--warn)' : 'var(--hot)';
  const L = LANGUAGES[best.code];

  host.innerHTML = `
    <div class="rise">
      <div class="flex items-center gap-3">
        <span style="font-size:2.25rem;line-height:1">${L.flag}</span>
        <span>
          <span class="block text-xl font-bold" style="color:var(--txt)">${L.name}</span>
          <span class="block text-[11px] mono" style="color:${color}">${label} · ${margin.toFixed(2)} bit/lettre d'avance</span>
        </span>
      </div>
      <div class="grid grid-cols-2 gap-2 mt-4">
        ${statCard(best.cross.toFixed(2), 'bits/lettre pour coder', COLORS.accent)}
        ${statCard(best.kl.toFixed(2), 'divergence D(p‖q)', COLORS.violet)}
      </div>
      <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
        Votre texte a une entropie propre de <span class="mono">${best.self.toFixed(2)}</span> bits/lettre.
        Le code ${L.name.toLowerCase()} le transmet en <span class="mono">${best.cross.toFixed(2)}</span> :
        <span class="mono" style="color:var(--violet)">${best.kl.toFixed(2)}</span> bit de gaspillage.
      </p>
      <button id="dUse" class="btn btn-sm w-full mt-3" style="justify-content:center">
        <i data-lucide="check" class="w-3 h-3"></i>Utiliser ${L.name} pour tout le parcours
      </button>
    </div>`;
  el('dUse').onclick = () => setLang(best.code);
  store.session.detected = best.code;
  refreshIcons();
}

function renderRanking(res, n) {
  const max = Math.max(...res.map(r => r.cross), 1);
  el('dRanking').innerHTML = res.map((r, i) => {
    const L = LANGUAGES[r.code];
    return `
      <div>
        <div class="flex justify-between items-baseline text-xs mb-1">
          <span style="color:${i === 0 && n ? 'var(--txt)' : 'var(--txt-2)'}">${L.flag} ${L.name}</span>
          <span class="mono tabular text-[11px]" style="color:${i === 0 && n ? L.color : 'var(--txt-3)'}">
            ${n ? r.cross.toFixed(2) : '—'} <span style="opacity:.55">bits</span>
          </span>
        </div>
        <div class="h-1.5 rounded-full overflow-hidden" style="background:var(--bg)">
          <div class="grow h-full rounded-full" style="width:${n ? (r.cross / max * 100).toFixed(1) : 0}%;background:${L.color};opacity:${i === 0 ? 1 : .45}"></div>
        </div>
      </div>`;
  }).join('');
}

function renderFreq(p, refCode) {
  const ref = REF[refCode].q;
  const keys = UNION.slice().sort((a, b) => (ref.get(b) || 0) - (ref.get(a) || 0));
  const max = Math.max(...keys.map(k => Math.max(ref.get(k) || 0, p.get(k) || 0)), 0.01);
  el('dRefName').textContent = LANGUAGES[refCode].name.toLowerCase();
  el('dFreq').innerHTML = keys.map(k => `
    <div class="flex flex-col items-center gap-1 shrink-0" style="width:24px"
      title="${k === ' ' ? 'espace' : esc(k)} — vous ${((p.get(k) || 0) * 100).toFixed(2)} % · référence ${((ref.get(k) || 0) * 100).toFixed(2)} %">
      <div class="flex items-end gap-[1px] w-full" style="height:118px">
        <div class="flex-1 rounded-t grow" style="height:${Math.max(1, (p.get(k) || 0) / max * 118)}px;background:var(--accent)"></div>
        <div class="flex-1 rounded-t grow" style="height:${Math.max(1, (ref.get(k) || 0) / max * 118)}px;background:rgba(244,236,216,.16)"></div>
      </div>
      <span class="mono text-[10px]" style="color:var(--txt-3)">${k === ' ' ? '␣' : esc(k)}</span>
    </div>`).join('');
}

/** Matrice des entropies croisées entre corpus. */
function renderMatrix() {
  const codes = Object.keys(LANGUAGES);
  const values = codes.map(a => {
    const p = new Map(letterStats(a).rows.map(r => [r.ch, r.p]));
    return codes.map(b => costs(p, b));
  });
  const flat = values.flat().map(v => v.cross);
  const lo = Math.min(...flat), hi = Math.max(...flat);

  const head = `<tr><th>source \\ code</th>${codes.map(c => `<th class="num">${LANGUAGES[c].flag} ${c.toUpperCase()}</th>`).join('')}</tr>`;
  const body = codes.map((a, i) => `
    <tr>
      <td style="color:var(--txt);white-space:nowrap">${LANGUAGES[a].flag} ${LANGUAGES[a].name}</td>
      ${codes.map((b, j) => {
        const v = values[i][j];
        const t = (v.cross - lo) / Math.max(hi - lo, 1e-9);
        return `<td class="num" title="D(${a}‖${b}) = ${v.kl.toFixed(2)} bit gaspillé"
          style="color:${i === j ? 'var(--ok)' : heat(t * 6, 6)};font-weight:${i === j ? 700 : 400}">${v.cross.toFixed(2)}</td>`;
      }).join('')}
    </tr>`).join('');

  el('dMatrix').innerHTML = `<table class="tbl" style="min-width:420px">
      <thead>${head}</thead><tbody>${body}</tbody></table>
    <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
      La diagonale, en vert, est toujours le minimum de sa ligne : c'est l'inégalité de Gibbs
      <span class="mono">D(p‖q) ≥ 0</span>, avec égalité seulement quand les deux distributions coïncident.
      Survolez une case pour lire les bits gaspillés.
    </p>`;
}

function analyze() {
  const { p, n } = profile(el('dInput').value);
  const res = rank(p);
  renderResult(res, n);
  renderRanking(res, n);
  renderFreq(p, n >= 12 ? res[0].code : store.lang);
}

export function init() {
  buildRefs();
  el('dInput').addEventListener('input', analyze);

  const chips = () => langChips(el('dSamples'), LANGUAGES, code => {
    el('dInput').value = SAMPLES[code];
    analyze();
  }, store.lang);
  chips();
  onLang(() => { chips(); analyze(); });

  el('dInput').value = SAMPLES[store.lang] || SAMPLES.fr;
  analyze();
  renderMatrix();
  renderMath(document.querySelector('section[data-ch="signature"]'));
  refreshIcons();
}
