import { el, esc, COLORS } from './ui.js';
import { SHANNON_1948 } from './corpus.js';
import { generateChars, generateWords, fnCurve, vocabStats } from './model.js';
import { store, onLang } from './state.js';
import { refreshIcons } from './icons.js';

/* ============================================================
   CHAPITRE 6 — Les approximations successives (Shannon §3)
   ------------------------------------------------------------
   Tirage selon les fréquences empiriques observées, au plus long
   contexte disponible : la procédure exacte du papier, où Shannon
   ouvrait un livre au hasard pour relever la lettre suivante.
   ============================================================ */

const ORDERS = [
  { order: 0, title: 'Ordre 0', desc: 'lettres équiprobables', color: '#ff6b6b' },
  { order: 1, title: 'Ordre 1', desc: 'fréquences des lettres', color: '#f7894a' },
  { order: 2, title: 'Ordre 2', desc: 'digrammes', color: '#f5b544' },
  { order: 3, title: 'Ordre 3', desc: 'trigrammes', color: '#a8cd69' },
  { order: 4, title: 'Ordre 4', desc: '4 lettres de contexte', color: '#35d0a5' },
  { order: 5, title: 'Ordre 5', desc: '5 lettres de contexte', color: '#5b8cff' }
];

const WORDS = [
  { order: 0, title: 'Mots, ordre 1', desc: 'mots tirés selon leur fréquence, sans lien entre eux' },
  { order: 1, title: 'Mots, ordre 2', desc: 'probabilités de transition entre mots consécutifs' },
  { order: 2, title: 'Mots, ordre 3', desc: 'deux mots de contexte' }
];

function block(title, desc, color, meta, text, textColor) {
  return `
    <div class="card-inset p-4 fade">
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <span class="badge" style="background:${color}1f;color:${color}">${title}</span>
        <span class="text-[11px]" style="color:var(--txt-3)">${desc}</span>
        ${meta ? `<span class="mono text-[10px] ml-auto" style="color:var(--txt-3)">${meta}</span>` : ''}
      </div>
      <p class="mono text-[13px] leading-relaxed break-words" style="color:${textColor}">${esc(text)}</p>
    </div>`;
}

function render() {
  const fn = fnCurve(store.lang);
  const byCtx = Object.fromEntries(fn.map(f => [f.ctx, f]));
  const vs = vocabStats(store.lang);

  const chars = ORDERS.map(a => block(
    a.title, a.desc, a.color,
    byCtx[a.order] ? `F${a.order + 1} ≈ ${byCtx[a.order].test.toFixed(2)} bits/car.` : '',
    generateChars(store.lang, a.order, 195),
    'var(--txt-2)'
  )).join('');

  const words = WORDS.map(w => block(
    w.title, w.desc, COLORS.violet,
    w.order === 0 ? `${vs.types} mots au vocabulaire` : '',
    generateWords(store.lang, 26, '', { order: w.order }),
    '#ddd6fe'
  )).join('');

  el('genOut').innerHTML = chars + words + `
    <p class="text-[11px] leading-relaxed px-1" style="color:var(--txt-3)">
      Aux ordres élevés le texte devient localement correct sans jamais rien signifier : le modèle
      n'a que quelques lettres de mémoire. Shannon le note déjà — « la ressemblance avec le texte
      ordinaire augmente nettement à chaque étape ».
    </p>`;
  refreshIcons();
}

function renderShannon() {
  el('genShannon').innerHTML = SHANNON_1948.map(s => `
    <div class="card-inset p-3.5">
      <div class="flex items-center gap-2 mb-1.5 flex-wrap">
        <span class="badge" style="background:rgba(226,232,240,.08);color:var(--txt-2)">${s.label}</span>
        <span class="text-[11px]" style="color:var(--txt-3)">${s.desc}</span>
      </div>
      <p class="mono text-[12px] leading-relaxed break-words" style="color:var(--txt-3)">${esc(s.text)}</p>
    </div>`).join('');
}

export function init() {
  el('genBtn').addEventListener('click', render);
  onLang(render);
  render();
  renderShannon();
}
