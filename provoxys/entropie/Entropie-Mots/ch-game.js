import { el, esc, COLORS } from './ui.js';
import { LANGUAGES, GAME_TEXTS } from './data.js';
import { predictChar, normalize } from './model.js';
import { renderMath } from './math.js';
import { store, onLang } from './state.js';
import { refreshIcons } from './icons.js';

/* ============================================================
   CHAPITRE 6 — Le jeu de devinette de Shannon (1951)
   ------------------------------------------------------------
   On note, pour chaque lettre, le nombre d'essais nécessaires.
   Shannon en tire un encadrement de l'entropie :

     Σ i·(q_i − q_{i+1})·log₂ i  ≤  H  ≤  Σ q_i·log₂( i/(i−1) )

   où q_i est la proportion de lettres trouvées en i essais ou moins.
   ============================================================ */

const LATIN = 'abcdefghijklmnopqrstuvwxyz'.split('');
const CYR = 'абвгдежзийклмнопрстуфхцчшщыьэюя'.split('');

const state = {
  target: '', pos: 0, tries: 0,
  wrong: new Set(), history: [], revealed: [],
  human: [], machine: []      // essais comptabilises separement
};

const alphabet = () =>
  [...(LANGUAGES[store.lang].script === 'cyrillic' ? CYR : LATIN), ' '];

function bounds(history) {
  const N = history.length;
  if (!N) return { lower: 0, upper: 0 };
  const A = alphabet().length;
  const q = new Array(A + 2).fill(0);
  for (const t of history) q[Math.min(t, A)] += 1 / N;

  const Q = new Array(A + 2).fill(0);
  let acc = 0;
  for (let i = A; i >= 1; i--) { acc += q[i]; Q[i] = acc; }

  let lower = 0, upper = 0;
  for (let i = 1; i <= A; i++) {
    const diff = Q[i] - (Q[i + 1] || 0);
    if (diff > 0 && i > 1) lower += i * diff * Math.log2(i);
    if (i > 1 && Q[i] > 0) upper += Q[i] * Math.log2(i / (i - 1));
  }
  return { lower: Math.max(0, Math.min(lower, upper)), upper };
}

function renderText() {
  let html = '';
  state.revealed.forEach(r => {
    const color = r.revealed ? COLORS.txt3 : r.tries === 1 ? COLORS.ok : r.tries <= 3 ? COLORS.warn : COLORS.hot;
    html += `<span title="${r.revealed ? 'révélée' : r.tries + ' essai(s)'}" style="color:${color}">${r.ch === ' ' ? '·' : esc(r.ch)}</span>`;
  });
  if (state.pos < state.target.length) {
    html += `<span class="animate-pulse" style="color:var(--accent);border-bottom:2px solid var(--accent)">?</span>`;
    html += `<span style="color:rgba(214,172,85,.18)">${'·'.repeat(Math.max(0, state.target.length - state.pos - 1))}</span>`;
  } else {
    html += ` <span class="text-xs font-semibold" style="font-family:Inter;color:var(--ok)">✓ texte terminé</span>`;
  }
  el('gText').innerHTML = html;
}

function renderKeys() {
  const done = state.pos >= state.target.length;
  el('gKeys').innerHTML = alphabet().map(ch => {
    const wrong = state.wrong.has(ch);
    return `<button data-k="${ch === ' ' ? '_SP_' : esc(ch)}" ${wrong || done ? 'disabled' : ''}
      class="keycap ${wrong ? 'wrong' : ''}" style="height:2rem;${ch === ' ' ? 'padding:0 .75rem' : 'width:2rem'}">${ch === ' ' ? 'espace' : esc(ch)}</button>`;
  }).join('');
  el('gKeys').querySelectorAll('button[data-k]').forEach(b => {
    b.onclick = () => guess(b.dataset.k === '_SP_' ? ' ' : b.dataset.k);
  });
  el('gTry').textContent = state.tries + 1;
}

function renderStats() {
  const N = state.history.length;
  if (!N) {
    el('gAcc').textContent = '—';
    el('gGuesses').textContent = '—';
    el('gDone').textContent = '0';
    el('gLower').textContent = el('gUpper').textContent = '—';
    el('gLowerBar').style.width = el('gUpperBar').style.width = '0%';
    el('gHist').innerHTML = `<p class="text-xs" style="color:var(--txt-3)">Devinez quelques lettres pour voir la distribution.</p>`;
    renderVs();
    return;
  }
  const first = state.history.filter(t => t === 1).length;
  const avg = state.history.reduce((a, b) => a + b, 0) / N;
  el('gAcc').textContent = Math.round(first / N * 100) + '%';
  el('gGuesses').textContent = avg.toFixed(2);
  el('gDone').textContent = N;

  const { lower, upper } = bounds(state.history);
  const maxH = Math.log2(alphabet().length);
  el('gLower').textContent = lower.toFixed(2) + ' bits';
  el('gUpper').textContent = upper.toFixed(2) + ' bits';
  el('gLowerBar').style.width = Math.min(100, lower / maxH * 100) + '%';
  el('gUpperBar').style.width = Math.min(100, upper / maxH * 100) + '%';

  const labels = ['1ᵉʳ', '2ᵉ', '3ᵉ', '4ᵉ', '5ᵉ', '6+'];
  const counts = [1, 2, 3, 4, 5].map(b => state.history.filter(t => t === b).length);
  counts.push(state.history.filter(t => t > 5).length);
  const max = Math.max(...counts, 1);
  el('gHist').innerHTML = counts.map((c, i) => `
    <div class="flex items-center gap-2">
      <span class="mono text-[10px]" style="width:1.5rem;color:var(--txt-3)">${labels[i]}</span>
      <span class="flex-1 h-2.5 rounded-full overflow-hidden" style="background:var(--bg)">
        <span class="block h-full rounded-full grow" style="width:${(c / max * 100).toFixed(1)}%;background:${i === 0 ? COLORS.ok : i < 3 ? COLORS.warn : COLORS.hot}"></span>
      </span>
      <span class="mono text-[10px] text-right" style="width:1.25rem;color:var(--txt-2)">${c}</span>
    </div>`).join('');

  store.session.guessHistory = state.human.slice();
  renderVs();
}

/* Comparaison directe : le meme texte, devine par vous et par le modele. */
function renderVs() {
  const rows = [
    { who: 'Vous', hist: state.human, color: COLORS.accent, icon: 'user' },
    { who: 'Le modele n-gramme', hist: state.machine, color: COLORS.violet, icon: 'bot' }
  ];
  const maxH = Math.log2(alphabet().length);
  el('gVs').innerHTML = rows.map(r => {
    if (!r.hist.length) {
      return `<div class="flex items-center gap-2.5 text-xs mb-2" style="color:var(--txt-3)">
        <i data-lucide="${r.icon}" class="w-3.5 h-3.5"></i>${r.who} : pas encore joue</div>`;
    }
    const first = r.hist.filter(t => t === 1).length / r.hist.length;
    const avg = r.hist.reduce((a, b) => a + b, 0) / r.hist.length;
    const b = bounds(r.hist);
    return `
      <div class="mb-3">
        <div class="flex items-center justify-between text-xs mb-1.5 flex-wrap gap-2">
          <span class="flex items-center gap-1.5" style="color:var(--txt-2)">
            <i data-lucide="${r.icon}" class="w-3.5 h-3.5" style="color:${r.color}"></i>${r.who}
            <span style="color:var(--txt-3)">- ${r.hist.length} lettre${r.hist.length > 1 ? 's' : ''}</span>
          </span>
          <span class="mono text-[11px]" style="color:${r.color}">
            ${Math.round(first * 100)} % du 1er coup - ${avg.toFixed(2)} essai/lettre
          </span>
        </div>
        <div class="relative h-2 rounded-full overflow-hidden" style="background:var(--bg)">
          <div class="absolute h-full rounded-full grow" style="left:${(b.lower / maxH * 100).toFixed(1)}%;width:${((b.upper - b.lower) / maxH * 100).toFixed(1)}%;background:${r.color};opacity:.75"></div>
        </div>
        <div class="flex justify-between text-[10px] mono mt-1" style="color:var(--txt-3)">
          <span>H entre ${b.lower.toFixed(2)} et ${b.upper.toFixed(2)} bits</span><span>${maxH.toFixed(2)}</span>
        </div>
      </div>`;
  }).join('') + `
    <p class="text-[11px] leading-relaxed" style="color:var(--txt-3)">
      Les deux barres encadrent l'entropie de la langue estimee a partir des essais. Un devineur
      qui connait mieux la langue produit un encadrement plus bas : c'est ainsi que Shannon a
      mesure l'entropie de l'anglais en 1951, avec des humains pour predicteurs.
    </p>`;
  refreshIcons();
}

function feedback(msg, color) {
  el('gFeedback').textContent = msg;
  el('gFeedback').style.color = color;
}

function advance(ch, tries, revealed, who) {
  state.revealed.push({ ch, tries, revealed, who });
  state.history.push(tries);
  if (who === 'human') state.human.push(tries);
  if (who === 'machine') state.machine.push(tries);
  state.pos++; state.tries = 0; state.wrong.clear();
  renderText(); renderKeys(); renderStats();
}

function guess(ch) {
  if (state.pos >= state.target.length) return;
  const expected = state.target[state.pos];
  state.tries++;
  if (ch === expected) {
    feedback(state.tries === 1 ? 'Exact, du premier coup !' : `Trouvé en ${state.tries} essais.`,
      state.tries === 1 ? COLORS.ok : COLORS.warn);
    advance(expected, state.tries, false, 'human');
  } else {
    state.wrong.add(ch);
    feedback(`« ${ch === ' ' ? 'espace' : ch} » n'est pas la bonne lettre.`, COLORS.hot);
    renderKeys();
  }
}

function reveal() {
  if (state.pos >= state.target.length) return;
  feedback('Lettre révélée — comptée au maximum d\'essais.', COLORS.txt3);
  advance(state.target[state.pos], alphabet().length, true, null);
}

/* Le modèle joue : il propose ses lettres par ordre de probabilité. */
let autoTimer = null;
function modelPlay() {
  clearTimeout(autoTimer);
  if (state.pos >= state.target.length) return;
  const { all } = predictChar(store.lang, state.target.slice(0, state.pos), 6, 1);
  const expected = state.target[state.pos];
  let n = 1;
  for (const [ch] of all) { if (ch === expected) break; n++; }
  feedback(`Le modèle a trouvé « ${expected === ' ' ? 'espace' : expected} » en ${n} essai${n > 1 ? 's' : ''}.`, COLORS.accent);
  advance(expected, n, false, 'machine');
  if (state.pos < state.target.length) autoTimer = setTimeout(modelPlay, 90);
}

function newText() {
  clearTimeout(autoTimer);
  const list = GAME_TEXTS[store.lang];
  state.target = normalize(list[Math.floor(Math.random() * list.length)], LANGUAGES[store.lang].script);
  state.pos = 0; state.tries = 0;
  state.wrong.clear(); state.history = []; state.revealed = [];
  state.human = []; state.machine = [];
  feedback('', '');
  renderText(); renderKeys(); renderStats();
}

export function init() {
  el('gNew').addEventListener('click', newText);
  el('gReveal').addEventListener('click', reveal);
  el('gAuto').addEventListener('click', modelPlay);
  onLang(newText);

  document.addEventListener('keydown', e => {
    const panel = document.querySelector('section[data-ch="game"]');
    if (!panel || panel.hidden) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === ' ') { e.preventDefault(); guess(' '); return; }
    const k = e.key.toLowerCase();
    if (k.length === 1 && alphabet().includes(k)) { e.preventDefault(); guess(k); }
  });

  newText();
  renderMath(document.querySelector('section[data-ch="game"]'));
  refreshIcons();
}
