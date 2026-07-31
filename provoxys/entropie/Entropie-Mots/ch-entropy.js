import { el, esc, heat, heatA, COLORS, langChips } from './ui.js';
import { LANGUAGES, SAMPLES } from './data.js';
import { letterStats } from './model.js';
import { binaryEntropy } from './channel.js';
import { store, onLang } from './state.js';
import { refreshIcons } from './icons.js';
import { renderMath } from './math.js';

/* ============================================================
   CHAPITRE 2 — L'entropie : la surprise moyenne
   ------------------------------------------------------------
   H = −Σ p·log₂ p sur la distribution des lettres du texte saisi.
   Chaque caractère est surligné selon sa propre information.
   ============================================================ */

const LETTER = /[a-zà-öø-ÿœæñа-яё]/i;

/** Distribution des lettres (accents repliés hors cyrillique). */
function distribution(text) {
  const counts = new Map();
  let n = 0;
  for (const raw of text.toLowerCase()) {
    if (!LETTER.test(raw)) continue;
    const ch = /[а-яё]/.test(raw) ? raw : raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!ch) continue;
    counts.set(ch, (counts.get(ch) || 0) + 1);
    n++;
  }
  return { counts, n };
}

function entropyOf(counts, n) {
  let H = 0;
  for (const c of counts.values()) { const p = c / n; H -= p * Math.log2(p); }
  return H;
}

/** Entropie d'ordre 1 d'un profil de langue de référence. */
function refEntropy(code) {
  const f = LANGUAGES[code].freq;
  const tot = Object.values(f).reduce((a, b) => a + b, 0);
  let H = 0;
  for (const v of Object.values(f)) { const p = v / tot; if (p > 0) H -= p * Math.log2(p); }
  return H;
}

function renderBackdrop(text, counts, n) {
  let html = '';
  for (const raw of text) {
    const low = raw.toLowerCase();
    if (!LETTER.test(low)) { html += esc(raw); continue; }
    const ch = /[а-яё]/.test(low) ? low : low.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const p = (counts.get(ch) || 1) / n;
    const bits = -Math.log2(p);
    html += `<mark style="background:${heatA(bits, 0.28, 9)}">${esc(raw)}</mark>`;
  }
  // une ligne vide finale garde le fond aligné sur le curseur
  el('tBackdrop').innerHTML = html + '<br>';
}

function renderFreq(counts, n) {
  const host = el('tFreq');
  if (!n) { host.innerHTML = `<p class="text-xs self-center" style="color:var(--txt-3)">La distribution apparaîtra ici.</p>`; return; }
  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const max = rows[0][1];
  host.innerHTML = rows.map(([ch, c]) => {
    const p = c / n, bits = -Math.log2(p);
    return `
      <div class="flex flex-col items-center gap-1 shrink-0" style="width:22px" title="${esc(ch)} · ${c} fois · ${(p * 100).toFixed(1)} % · ${bits.toFixed(2)} bits">
        <div class="w-full rounded-t grow" style="height:${Math.max(2, c / max * 118)}px;background:${heat(bits, 9)}"></div>
        <span class="mono text-[10px]" style="color:var(--txt-3)">${esc(ch)}</span>
      </div>`;
  }).join('');
}

/* ---------- Figure 7 du papier : H(p) pour deux issues ---------- */
function renderBinary() {
  const W = 560, H = 250, padL = 44, padR = 20, padT = 14, padB = 38;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const xOf = p => padL + plotW * p;
  const yOf = v => padT + plotH * (1 - v);

  let svg = `<svg viewBox="0 0 ${W} ${H}" class="w-full" style="min-width:380px" font-family="Inter">`;
  for (let t = 0; t <= 5; t++) {
    const v = t / 5, y = yOf(v);
    svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${COLORS.line}"/>`;
    svg += `<text x="${padL - 8}" y="${y + 3}" text-anchor="end" font-size="10" fill="${COLORS.txt3}">${v.toFixed(1)}</text>`;
  }
  for (let t = 0; t <= 5; t++) {
    const p = t / 5, x = xOf(p);
    svg += `<text x="${x}" y="${H - padB + 17}" text-anchor="middle" font-size="10" fill="${COLORS.txt3}">${p.toFixed(1)}</text>`;
  }
  svg += `<text x="${padL - 30}" y="${padT + plotH / 2}" transform="rotate(-90 ${padL - 30} ${padT + plotH / 2})" text-anchor="middle" font-size="9" fill="${COLORS.txt3}">H en bits</text>`;
  svg += `<text x="${padL + plotW / 2}" y="${H - 4}" text-anchor="middle" font-size="9" fill="${COLORS.txt3}">p</text>`;

  let d = '';
  for (let i = 0; i <= 200; i++) {
    const p = i / 200;
    d += (i ? 'L' : 'M') + xOf(p).toFixed(1) + ' ' + yOf(binaryEntropy(p)).toFixed(1) + ' ';
  }
  svg += `<path d="${d}" fill="none" stroke="${COLORS.accent}" stroke-width="2.25" stroke-linecap="round"/>`;
  svg += `<circle cx="${xOf(0.5)}" cy="${yOf(1)}" r="4" fill="${COLORS.warn}"/>`;
  svg += `<text x="${xOf(0.5)}" y="${yOf(1) - 9}" text-anchor="middle" font-size="10" font-weight="600" fill="${COLORS.warn}">1 bit</text>`;
  svg += `</svg>`;
  el('eBinary').innerHTML = svg;
}

/* ---------- Les trois axiomes du théorème 2 ---------- */
const AXIOMS = [
  { n: 1, t: 'Continuité', d: 'H doit varier continûment avec les probabilités : une variation infime de p ne peut pas faire sauter l\'incertitude.' },
  { n: 2, t: 'Monotonie', d: 'Si les n issues sont équiprobables, H doit croître avec n. Choisir entre dix possibilités est plus incertain qu\'entre deux.' },
  { n: 3, t: 'Décomposition', d: 'Si un choix se décompose en deux choix successifs, H doit être la somme pondérée des deux. C\'est l\'axiome décisif.' }
];

function renderAxioms() {
  el('eAxioms').innerHTML = AXIOMS.map(a => `
    <div class="flex gap-2.5">
      <span class="rail-num shrink-0" style="margin-top:1px">${a.n}</span>
      <span>
        <span class="block text-xs font-semibold" style="color:var(--txt)">${a.t}</span>
        <span class="block text-[11px] leading-relaxed mt-0.5" style="color:var(--txt-3)">${a.d}</span>
      </span>
    </div>`).join('') + `
    <div class="card-inset p-3 mt-1">
      <p class="text-[11px] leading-relaxed" style="color:var(--txt-2)">
        Shannon démontre en appendice 2 qu'une <b style="color:var(--txt)">seule</b> famille de fonctions satisfait ces trois exigences :
        <span class="mono" style="color:var(--accent)">H = −K Σ pᵢ log pᵢ</span>. La constante K ne fait que fixer l'unité ; prendre le logarithme en base 2 donne le bit.
      </p>
    </div>`;
}

function renderCompare(H) {
  const rows = [
    { name: '27 symboles équiprobables', value: Math.log2(27), color: COLORS.txt3 },
    ...Object.keys(LANGUAGES).map(c => ({
      name: `${LANGUAGES[c].flag} ${LANGUAGES[c].name} — corpus`,
      value: letterStats(c).F1,
      color: LANGUAGES[c].color
    }))
  ];
  if (H > 0) rows.push({ name: 'Votre texte', value: H, color: COLORS.accent, me: true });
  const max = Math.max(...rows.map(r => r.value));
  el('tCompare').innerHTML = rows.map(r => `
    <div>
      <div class="flex justify-between items-baseline text-[11px] mb-1">
        <span style="color:${r.me ? 'var(--txt)' : 'var(--txt-2)'};font-weight:${r.me ? 600 : 400}">${r.name}</span>
        <span class="mono tabular" style="color:${r.color}">${r.value.toFixed(2)}</span>
      </div>
      <div class="h-1.5 rounded-full overflow-hidden" style="background:var(--bg)">
        <div class="grow h-full rounded-full" style="width:${(r.value / max * 100).toFixed(1)}%;background:${r.color}"></div>
      </div>
    </div>`).join('');
}

function analyze() {
  const text = el('tInput').value;
  const { counts, n } = distribution(text);
  const words = (text.match(/[^\s]+/g) || []).length;

  el('tChars').textContent = text.length;
  el('tWords').textContent = words;
  el('tLetters').textContent = n;

  const H = n ? entropyOf(counts, n) : 0;
  const Hmax = counts.size > 1 ? Math.log2(counts.size) : 0;
  el('tH').textContent = H.toFixed(2);
  el('tHBar').style.width = (Hmax ? Math.min(100, H / Hmax * 100) : 0) + '%';
  el('tHMax').textContent = 'max ' + (Hmax ? Hmax.toFixed(2) : '0');
  el('tRed').textContent = Hmax ? Math.round((1 - H / Hmax) * 100) + '%' : '—';
  el('tEff').textContent = Hmax ? Math.round(H / Hmax * 100) + '%' : '—';

  renderBackdrop(text, counts, n || 1);
  renderFreq(counts, n);
  renderCompare(H);

  store.session.lastEntropy = H;
  store.session.charsTyped = Math.max(store.session.charsTyped, text.length);
}

export function init() {
  const input = el('tInput'), backdrop = el('tBackdrop');

  input.addEventListener('input', analyze);
  input.addEventListener('scroll', () => {
    backdrop.scrollTop = input.scrollTop;
    backdrop.scrollLeft = input.scrollLeft;
  });
  el('tClear').addEventListener('click', () => { input.value = ''; analyze(); input.focus(); });

  const chips = () => langChips(el('tSamples'), LANGUAGES, code => {
    input.value = SAMPLES[code];
    analyze();
  }, store.lang);
  chips();
  onLang(() => { chips(); renderCompare(store.session.lastEntropy); });

  input.value = SAMPLES[store.lang] || SAMPLES.fr;
  analyze();
  renderBinary();
  renderAxioms();
  renderMath(document.querySelector('section[data-ch="entropy"]'));
  refreshIcons();
}
