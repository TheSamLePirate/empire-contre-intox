import { el, esc, COLORS } from './ui.js';
import { refreshIcons } from './icons.js';

/* ============================================================
   CHAPITRE 1 — L'information, c'est de la surprise
   ------------------------------------------------------------
   i(x) = −log₂ P(x) : le nombre de questions oui/non qu'il faut
   poser, en moyenne, pour lever l'incertitude sur l'événement.
   ============================================================ */

const MIN_P = 0.0005;                       // 0,05 % — borne basse du curseur
const STEPS = 1000;
const pOf = v => MIN_P * Math.pow(1 / MIN_P, v / STEPS);   // échelle logarithmique
const vOf = p => Math.round(STEPS * Math.log(p / MIN_P) / Math.log(1 / MIN_P));
const bitsOf = p => -Math.log2(p);

const fmtP = p =>
  p >= 0.1 ? (p * 100).toFixed(0) + ' %'
    : p >= 0.01 ? (p * 100).toFixed(1) + ' %'
      : (p * 100).toFixed(2) + ' %';

const EXAMPLES = [
  { icon: 'circle', label: 'Une pièce tombe sur pile', sub: '1 chance sur 2', p: 1 / 2 },
  { icon: 'dice-5', label: 'Un dé donne 6', sub: '1 chance sur 6', p: 1 / 6 },
  { icon: 'type', label: 'La lettre « e » en français', sub: 'la plus fréquente', p: 0.1472 },
  { icon: 'type', label: 'La lettre « t » en français', sub: 'fréquence moyenne', p: 0.0724 },
  { icon: 'type', label: 'La lettre « z » en français', sub: 'très rare', p: 0.0014 },
  { icon: 'spade', label: 'Tirer l\'as de pique', sub: '1 carte sur 52', p: 1 / 52 },
  { icon: 'sun', label: 'Le soleil se lève demain', sub: 'quasi certain', p: 0.9999 }
];

function explain(p) {
  const b = bitsOf(p);
  if (p > 0.9) return `Un événement quasi certain n'apprend presque rien : <b style="color:var(--txt)">${b.toFixed(2)} bit</b>. Apprendre que le soleil s'est levé ne change rien à ce que vous saviez déjà.`;
  if (p > 0.55) return `Événement probable : <b style="color:var(--txt)">${b.toFixed(2)} bit</b>. Vous vous y attendiez, la nouvelle apporte peu.`;
  if (p > 0.4) return `Une chance sur deux : exactement <b style="color:var(--txt)">1 bit</b>. C'est l'unité de base — la réponse à une seule question oui/non.`;
  if (p > 0.1) return `<b style="color:var(--txt)">${b.toFixed(2)} bits</b> : il faudrait environ ${Math.round(b)} questions oui/non bien choisies pour deviner cet événement.`;
  if (p > 0.01) return `Événement rare : <b style="color:var(--txt)">${b.toFixed(2)} bits</b>. Apprendre qu'il s'est produit est très informatif — donc coûteux à coder.`;
  return `Événement très improbable : <b style="color:var(--txt)">${b.toFixed(2)} bits</b>. Un code optimal lui réserverait une très longue séquence, justement parce qu'il ne sert presque jamais.`;
}

function curve(p) {
  const W = 620, H = 240, padL = 46, padR = 30, padT = 14, padB = 40;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const ymax = 11;
  const xOf = q => padL + plotW * Math.log(q / MIN_P) / Math.log(1 / MIN_P);
  const yOf = v => padT + plotH * (1 - Math.min(v, ymax) / ymax);

  let svg = `<svg viewBox="0 0 ${W} ${H}" class="w-full" style="min-width:420px" font-family="Inter">`;
  for (let t = 0; t <= 4; t++) {
    const val = ymax * t / 4, y = yOf(val);
    svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${COLORS.line}"/>`;
    svg += `<text x="${padL - 8}" y="${y + 3}" text-anchor="end" font-size="10" fill="${COLORS.txt3}">${val.toFixed(0)}</text>`;
  }
  [0.001, 0.01, 0.1, 1].forEach(q => {
    const x = xOf(q);
    svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${padT + plotH}" stroke="${COLORS.line}" opacity=".55"/>`;
    svg += `<text x="${x}" y="${H - padB + 17}" text-anchor="middle" font-size="10" fill="${COLORS.txt3}">${q * 100 >= 1 ? (q * 100).toFixed(0) : (q * 100).toFixed(1)} %</text>`;
  });
  svg += `<text x="${padL - 32}" y="${padT + plotH / 2}" transform="rotate(-90 ${padL - 32} ${padT + plotH / 2})" text-anchor="middle" font-size="9" fill="${COLORS.txt3}">bits d'information</text>`;
  svg += `<text x="${padL + plotW / 2}" y="${H - 4}" text-anchor="middle" font-size="9" fill="${COLORS.txt3}">probabilité de l'événement (échelle logarithmique)</text>`;

  let d = '';
  for (let i = 0; i <= 160; i++) {
    const q = MIN_P * Math.pow(1 / MIN_P, i / 160);
    d += (i ? 'L' : 'M') + xOf(q).toFixed(1) + ' ' + yOf(bitsOf(q)).toFixed(1) + ' ';
  }
  svg += `<path d="${d}" fill="none" stroke="${COLORS.accent}" stroke-width="2.25" stroke-linecap="round"/>`;

  const cx = xOf(p), cy = yOf(bitsOf(p));
  svg += `<line x1="${cx}" y1="${padT}" x2="${cx}" y2="${padT + plotH}" stroke="${COLORS.warn}" stroke-dasharray="3 3" opacity=".6"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="5" fill="${COLORS.warn}" stroke="${COLORS.bg}" stroke-width="2"/>`;
  svg += `<text x="${Math.min(cx + 9, W - padR - 4)}" y="${Math.max(cy - 9, padT + 10)}" text-anchor="${cx > W - 120 ? 'end' : 'start'}" font-size="10" font-weight="600" fill="${COLORS.warn}">${bitsOf(p).toFixed(2)} bits</text>`;
  svg += `</svg>`;
  return svg;
}

let slider;

function render(p) {
  el('sBits').textContent = bitsOf(p).toFixed(2);
  el('sProbLabel').textContent = fmtP(p);
  el('sExplain').innerHTML = explain(p);
  el('sCurve').innerHTML = curve(p);
}

export function init() {
  slider = el('sProb');
  slider.min = 0; slider.max = STEPS; slider.step = 1;
  slider.value = vOf(0.5);

  el('sExamples').innerHTML = EXAMPLES.map(e => {
    const b = bitsOf(e.p);
    return `
      <button data-p="${e.p}" class="w-full flex items-center gap-3 text-left rounded-xl px-3 py-2.5 transition"
        style="background:var(--bg);border:1px solid var(--line-soft)"
        onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--line-soft)'">
        <i data-lucide="${e.icon}" class="w-4 h-4 shrink-0" style="color:var(--txt-3)"></i>
        <span class="flex-1 min-w-0">
          <span class="block text-xs font-medium truncate" style="color:var(--txt)">${esc(e.label)}</span>
          <span class="block text-[10px] mono" style="color:var(--txt-3)">${esc(e.sub)} · p = ${fmtP(e.p)}</span>
        </span>
        <span class="shrink-0 text-right">
          <span class="mono text-sm font-bold tabular" style="color:${b < 2 ? 'var(--ok)' : b < 5 ? 'var(--warn)' : 'var(--hot)'}">${b.toFixed(2)}</span>
          <span class="block text-[9px]" style="color:var(--txt-3)">bits</span>
        </span>
      </button>`;
  }).join('');

  el('sExamples').querySelectorAll('button[data-p]').forEach(b => {
    b.onclick = () => {
      const p = Number(b.dataset.p);
      slider.value = vOf(p);
      render(p);
    };
  });

  slider.addEventListener('input', () => render(pOf(Number(slider.value))));
  render(0.5);
  refreshIcons();
}
