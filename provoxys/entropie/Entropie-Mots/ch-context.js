import { el, esc, heat, heatA, COLORS, lineChart, statCard } from './ui.js';
import { LANGUAGES, DEMO_SENTENCES } from './data.js';
import { predictChar, scoreChars, fnCurve, MAX_CTX } from './model.js';
import { store, onLang } from './state.js';
import { refreshIcons } from './icons.js';
import { renderMath } from './math.js';

/* ============================================================
   CHAPITRE 5 — Le contexte fait fondre l'incertitude
   ------------------------------------------------------------
   Fₙ (théorème 6) mesurée de deux façons : sur le texte appris
   et sur un texte inédit. L'écart est du surapprentissage.
   ============================================================ */

const SEEDS = {
  fr: ['le petit ch', 'nous somm', 'qu', 'la vie est bell', 'inform'],
  en: ['the little c', 'we are g', 'q', 'life is beau', 'inform'],
  es: ['el pequeño g', 'estamos', 'q', 'la vida es bell', 'inform'],
  ru: ['малень', 'мы ид', 'жизнь прекрас', 'инфор']
};

let order = 4;
let timer = null;

const show = ch => (ch === ' ' ? '␣' : esc(ch));

function renderNext(text) {
  const { top, entropy } = predictChar(store.lang, text, order, 6);
  const max = top.length ? top[0].p : 1;
  el('cNext').innerHTML = top.map((t, i) => `
    <button data-ch="${t.ch === ' ' ? '_SP_' : esc(t.ch)}" class="w-full flex items-center gap-2.5 text-left">
      <span class="glyph shrink-0" style="width:2rem;height:2rem;background:${i === 0 ? 'rgba(91,140,255,.16)' : 'var(--surface-2)'};border:1px solid ${i === 0 ? 'rgba(91,140,255,.45)' : 'var(--line)'};color:${i === 0 ? 'var(--accent)' : 'var(--txt-2)'}">${show(t.ch)}</span>
      <span class="flex-1 h-2 rounded-full overflow-hidden" style="background:var(--bg)">
        <span class="block h-full rounded-full grow" style="width:${(t.p / max * 100).toFixed(1)}%;background:${i === 0 ? COLORS.accent : '#3d4658'}"></span>
      </span>
      <span class="mono text-[11px] tabular text-right" style="width:3.4rem;color:${i === 0 ? 'var(--accent)' : 'var(--txt-3)'}">${(t.p * 100).toFixed(1)}%</span>
      <span class="mono text-[10px] tabular text-right shrink-0" style="width:3rem;color:var(--txt-3)">${(-Math.log2(t.p)).toFixed(1)} b</span>
    </button>`).join('');

  el('cNext').querySelectorAll('button[data-ch]').forEach(b => {
    b.onclick = () => {
      const input = el('cInput');
      input.value += b.dataset.ch === '_SP_' ? ' ' : b.dataset.ch;
      input.focus();
      update();
    };
  });

  el('cLocalH').textContent = entropy.toFixed(2) + ' bits';
  el('cLocalH').style.color = heat(entropy, 4.7);
}

function renderHeat(text) {
  const host = el('cHeat');
  const res = scoreChars(store.lang, text, order);
  if (!res.chars.length) {
    host.innerHTML = `<p class="text-xs" style="color:var(--txt-3)">Écrivez quelques mots pour voir leur carte de surprise.</p>`;
    el('cStats').innerHTML = '';
    return;
  }
  host.innerHTML = res.chars.map(c => `
    <span class="glyph" style="width:1.55rem;height:1.85rem;background:${heatA(c.bits, 0.2, 6)};border:1px solid ${heatA(c.bits, 0.4, 6)};color:${heat(c.bits, 6)}"
      title="« ${c.ch === ' ' ? 'espace' : c.ch} » — ${c.bits.toFixed(2)} bits · rang ${c.rank}\nprédictions : ${c.top.map(t => (t.ch === ' ' ? '␣' : t.ch) + ' ' + (t.p * 100).toFixed(0) + '%').join('  ')}">${show(c.ch)}</span>`).join('');

  el('cStats').innerHTML =
    statCard(res.entropy.toFixed(2), 'bits / caractère', heat(res.entropy, 4.7)) +
    statCard(res.perplexity.toFixed(1), 'perplexité', COLORS.violet) +
    statCard(Math.round(res.top1 * 100) + '%', 'devinés du 1ᵉʳ coup', COLORS.ok) +
    statCard(Math.round(res.totalBits / 8) + ' o', 'taille théorique du texte', COLORS.txt2);
}

function renderFn() {
  const data = fnCurve(store.lang);
  el('cFnChart').innerHTML = lineChart({
    series: [
      { label: 'texte inédit (honnête)', color: COLORS.accent, values: data.map(d => d.test) },
      { label: 'texte appris (mémorisé)', color: COLORS.hot, values: data.map(d => d.train) }
    ],
    xLabels: data.map(d => 'F' + d.F),
    xSub: data.map(d => (d.F === 0 ? 'équiprob.' : d.ctx === 0 ? 'lettres seules' : d.ctx + ' lettre' + (d.ctx > 1 ? 's' : ''))),
    ymax: Math.ceil(Math.max(...data.map(d => d.test)) * 2) / 2 + 0.3,
    width: 620, height: 280,
    yLabel: 'bits / caractère',
    refLine: { value: 1, label: '≈ 1 bit — estimation de Shannon (1951)' }
  });
}

function update() {
  const text = el('cInput').value;
  renderNext(text);
  clearTimeout(timer);
  timer = setTimeout(() => renderHeat(text), 120);
}

function renderSeeds() {
  const list = SEEDS[store.lang] || SEEDS.fr;
  el('cSamples').innerHTML = [DEMO_SENTENCES[store.lang], ...list].map(s => `
    <button data-s="${esc(s)}" class="btn btn-sm mono" style="font-size:.6875rem;padding:.25rem .5rem">${esc(s.length > 34 ? s.slice(0, 34) + '…' : s)}</button>`).join('');
  el('cSamples').querySelectorAll('button[data-s]').forEach(b => {
    b.onclick = () => { el('cInput').value = b.dataset.s; update(); };
  });
}

export function init() {
  const slider = el('cOrder');
  slider.max = MAX_CTX;
  slider.value = order;
  slider.addEventListener('input', () => {
    order = Number(slider.value);
    el('cOrderLabel').textContent = order === 0 ? 'aucun contexte' : order + ' lettre' + (order > 1 ? 's' : '');
    update();
  });
  el('cOrderLabel').textContent = order + ' lettres';
  el('cInput').addEventListener('input', update);

  onLang(() => { renderSeeds(); renderFn(); el('cInput').value = DEMO_SENTENCES[store.lang]; update(); });

  renderSeeds();
  renderFn();
  el('cInput').value = DEMO_SENTENCES[store.lang] || DEMO_SENTENCES.fr;
  update();
  renderMath(document.querySelector('section[data-ch="context"]'));
  refreshIcons();
  void LANGUAGES;
}
