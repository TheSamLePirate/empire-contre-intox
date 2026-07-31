import { el, esc, statCard, COLORS, lineChart } from './ui.js';
import { LANGUAGES } from './data.js';
import {
  learningCurve, fnCurve, trainChars, charModel, normalize, MAX_CTX
} from './model.js';
import { predictNext, scoreSequence } from './predictor.js';
import { TEST } from './corpus.js';
import { LLM, predictWords } from './llm.js';
import { store, onLang } from './state.js';
import { refreshIcons } from './icons.js';

/* ============================================================
   CHAPITRE 10 — Du n-gramme à l'intelligence artificielle
   ------------------------------------------------------------
   On situe d'abord notre modèle sur une échelle d'entropies,
   puis on mesure ce que l'échelle change : plus de données,
   plus de contexte. Enfin on confie le même exercice — prédire
   le mot suivant — à un vrai modèle de langage, interrogé
   directement depuis le navigateur.
   ============================================================ */

/* ---------- l'échelle des entropies : la synthèse du parcours ---------- */
function renderLadder() {
  const lang = store.lang;
  const sc = lang === 'ru' ? 'cyrillic' : 'latin';
  const raw = normalize(TEST[lang], sc);
  const cm = charModel(lang);
  const nChars = raw.length;

  const mesures = [
    { label: 'Alphabet équiprobable', v: Math.log2(cm.V), c: COLORS.txt3, note: 'aucune statistique', ours: true },
    { label: 'Fréquences des lettres', v: cm.crossEntropy([...raw], 0).perSymbol, c: COLORS.hot, note: 'F₁ — ordre 0', ours: true },
    { label: 'N-grammes de lettres', v: cm.crossEntropy([...raw], MAX_CTX).perSymbol, c: COLORS.warn, note: '6 lettres de contexte', ours: true },
    { label: 'Notre modèle complet', v: scoreSequence(lang, TEST[lang]).totalBits / nChars, c: COLORS.ok, note: 'mots + cache + classes + orthographe', ours: true },
    { label: 'Un humain (Shannon 1951)', v: 1.0, c: COLORS.accent, note: 'expérience de devinette', ours: false },
    { label: 'Modèle de langage actuel', v: 0.7, c: COLORS.violet, note: 'ordre de grandeur publié', ours: false }
  ];
  const max = mesures[0].v;

  el('scLadder').innerHTML = mesures.map(m => `
    <div class="mb-2.5">
      <div class="flex justify-between items-baseline text-[11px] mb-1 gap-2">
        <span style="color:${m.ours ? 'var(--txt-2)' : 'var(--txt-3)'}">
          ${m.label} <span style="color:var(--txt-3)">— ${m.note}</span>
          ${m.ours ? '' : '<span class="badge" style="background:rgba(98,108,125,.15);color:var(--txt-3)">référence</span>'}
        </span>
        <span class="mono tabular shrink-0" style="color:${m.c}">${m.v.toFixed(2)} bits</span>
      </div>
      <div class="h-2.5 rounded-full overflow-hidden" style="background:var(--bg)">
        <div class="grow h-full rounded-full" style="width:${(m.v / max * 100).toFixed(1)}%;background:${m.c};${m.ours ? '' : 'opacity:.5;background-image:repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(0,0,0,.25) 4px,rgba(0,0,0,.25) 8px)'}"></div>
      </div>
    </div>`).join('') + `
    <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
      Chaque étape du parcours a fait descendre cette barre. Il reste un écart entre notre modèle
      et un lecteur humain, et un autre entre l'humain et les modèles actuels : ces écarts ne sont
      pas de nature différente, ce sont les mêmes bits — seulement mieux prédits.
    </p>`;
}

/* ---------- lois d'échelle mesurées ---------- */
function renderCurves() {
  const lc = learningCurve(store.lang);
  el('scData').innerHTML = lineChart({
    series: [{ label: 'entropie sur texte inédit', color: COLORS.accent, values: lc.map(d => d.entropy) }],
    xLabels: lc.map(d => (d.chars >= 1000 ? (d.chars / 1000).toFixed(1) + 'k' : d.chars)),
    xSub: lc.map(() => 'car.'),
    ymax: Math.ceil(Math.max(...lc.map(d => d.entropy)) * 2) / 2 + 0.2,
    width: 560, height: 250,
    yLabel: 'bits / caractère'
  });

  const fn = fnCurve(store.lang).filter(d => !d.equiprobable);
  el('scCtx').innerHTML = lineChart({
    series: [{ label: 'entropie sur texte inédit', color: COLORS.violet, values: fn.map(d => d.test) }],
    xLabels: fn.map(d => d.ctx),
    xSub: fn.map(d => 'lettre' + (d.ctx > 1 ? 's' : '')),
    ymax: Math.ceil(Math.max(...fn.map(d => d.test)) * 2) / 2 + 0.2,
    width: 560, height: 250,
    yLabel: 'bits / caractère'
  });

  const first = lc[0], last = lc[lc.length - 1];
  el('scData').insertAdjacentHTML('beforeend', `
    <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
      De ${first.chars} à ${last.chars} caractères appris, l'entropie passe de
      <span class="mono">${first.entropy.toFixed(2)}</span> à <span class="mono">${last.entropy.toFixed(2)}</span> bits.
      La courbe n'est pas encore plate : ce modèle a faim de données, exactement comme les grands modèles.
    </p>`);
  el('scCtx').insertAdjacentHTML('beforeend', `
    <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
      Le gain devient négligeable au-delà de ${MAX_CTX - 2} lettres : au-delà, chaque contexte
      n'a presque plus d'exemples dans ${trainChars(store.lang).length} caractères. Compter ne suffit plus,
      il faut généraliser — c'est ce que font les réseaux de neurones.
    </p>`);
}


/* ============================================================
   Le même exercice, confié à un modèle de langage
   ============================================================ */

let busy = false;

function renderIdle() {
  el('llmOut2').innerHTML = `
    <p class="text-xs flex items-center gap-2" style="color:var(--txt-3)">
      <i data-lucide="mouse-pointer-click" class="w-3.5 h-3.5"></i>
      Cliquez pour envoyer la phrase au modèle et comparer sa réponse à celle du n-gramme local.
    </p>`;
  refreshIcons();
}

function renderLoading() {
  el('llmOut2').innerHTML = `
    <div class="space-y-2">
      ${[1, 2, 3, 4].map(i => `
        <div class="flex items-center gap-3 animate-pulse" style="animation-delay:${i * 90}ms">
          <div class="h-7 rounded-lg" style="width:7rem;background:var(--surface-2)"></div>
          <div class="h-2 flex-1 rounded-full" style="background:var(--surface-2)"></div>
          <div class="h-3 rounded" style="width:2.5rem;background:var(--surface-2)"></div>
        </div>`).join('')}
    </div>
    <p class="text-[11px] mt-3 flex items-center gap-1.5" style="color:var(--accent)">
      <i data-lucide="loader-circle" class="w-3.5 h-3.5 animate-spin"></i>${LLM.label} réfléchit…
    </p>`;
  refreshIcons();
}

function renderError(msg) {
  el('llmOut2').innerHTML = `
    <p class="text-xs flex items-start gap-1.5" style="color:var(--hot)">
      <i data-lucide="triangle-alert" class="w-3.5 h-3.5 shrink-0 mt-0.5"></i><span>${esc(msg)}</span>
    </p>
    <p class="text-[11px] mt-2" style="color:var(--txt-3)">
      Le reste du parcours ne dépend d'aucun service extérieur : tous les autres chiffres
      sont calculés dans votre navigateur.
    </p>`;
  refreshIcons();
}

/** Entropie d'une liste de probabilités, après normalisation. */
function entropyOf(list) {
  const tot = list.reduce((s, x) => s + x, 0) || 1;
  let H = 0;
  for (const p of list) { const q = p / tot; if (q > 0) H -= q * Math.log2(q); }
  return H;
}

function rowsFor(items, max, color, mark) {
  return items.map((x, i) => `
    <div class="flex items-center gap-2.5">
      <span class="mono text-xs px-2 py-1.5 rounded-lg truncate shrink-0" style="width:7rem;background:${i === 0 ? color + '22' : 'var(--surface-2)'};border:1px solid ${i === 0 ? color + '66' : 'var(--line)'};color:${i === 0 ? '#c7d6ff' : 'var(--txt-2)'}">${esc(x.word)}</span>
      <span class="flex-1 h-2 rounded-full overflow-hidden" style="background:var(--bg)">
        <span class="block h-full rounded-full grow" style="width:${(x.p / max * 100).toFixed(1)}%;background:${i === 0 ? color : '#3d4658'}"></span>
      </span>
      <span class="mono text-[11px] tabular text-right shrink-0" style="width:2.75rem;color:${i === 0 ? color : 'var(--txt-3)'}">${(x.p * 100).toFixed(0)}%</span>
      <span class="w-4 shrink-0">${mark(x) ? `<i data-lucide="link-2" class="w-3.5 h-3.5" style="color:var(--ok)"></i>` : ''}</span>
    </div>`).join('');
}

async function ask() {
  if (busy) return;
  const ctx = el('aiInput').value;
  if (!ctx.trim()) { renderError('Écrivez d\'abord un début de phrase.'); return; }

  busy = true;
  renderLoading();
  try {
    const res = await predictWords(ctx, LANGUAGES[store.lang].name, 6);

    // distribution locale complète : on veut le rang de CHAQUE mot proposé
    const local = predictNext(store.lang, ctx, { topK: 6, invent: false });
    const localItems = local.ranked.map(x => ({ word: x.word, p: x.pn }));
    const llmSet = new Set(res.items.map(x => x.word));
    const rankOf = new Map();
    local.all.forEach((x, i) => rankOf.set(x.word, { rank: i + 1, p: x.pn }));

    const totLLM = res.items.reduce((s, x) => s + x.p, 0) || 1;
    const llmItems = res.items.map(x => {
      const r = rankOf.get(x.word);
      return { word: x.word, p: x.p / totLLM, rank: r ? r.rank : null, localP: r ? r.p : 0 };
    });
    const agree = llmItems.filter(x => x.rank && x.rank <= 10).length;
    const known = llmItems.filter(x => x.rank).length;

    const hLLM = entropyOf(llmItems.map(x => x.p));
    const hLocal = entropyOf(localItems.map(x => x.p));

    el('llmOut2').innerHTML = `
      <div class="fade grid lg:grid-cols-2 gap-6">
        <div>
          <p class="eyebrow mb-3">${LLM.label} — probabilités <b style="color:var(--warn)">déclarées</b></p>
          <div class="space-y-2">${llmItems.map((x, i) => `
            <div class="flex items-center gap-2.5">
              <span class="mono text-xs px-2 py-1.5 rounded-lg truncate shrink-0" style="width:7rem;background:${i === 0 ? 'rgba(167,139,250,.18)' : 'var(--surface-2)'};border:1px solid ${i === 0 ? 'rgba(167,139,250,.5)' : 'var(--line)'};color:${i === 0 ? '#ddd6fe' : 'var(--txt-2)'}">${esc(x.word)}</span>
              <span class="flex-1 h-2 rounded-full overflow-hidden" style="background:var(--bg)">
                <span class="block h-full rounded-full grow" style="width:${(x.p / llmItems[0].p * 100).toFixed(1)}%;background:${i === 0 ? COLORS.violet : '#3d4658'}"></span>
              </span>
              <span class="mono text-[11px] tabular text-right shrink-0" style="width:2.75rem;color:${i === 0 ? COLORS.violet : 'var(--txt-3)'}">${(x.p * 100).toFixed(0)}%</span>
              <span class="badge shrink-0" style="width:5.5rem;text-align:center;background:${x.rank ? (x.rank <= 10 ? 'rgba(53,208,165,.14)' : 'rgba(245,181,68,.14)') : 'rgba(255,107,107,.12)'};color:${x.rank ? (x.rank <= 10 ? 'var(--ok)' : 'var(--warn)') : 'var(--hot)'}"
                title="${x.rank ? 'rang ' + x.rank + ' sur ' + local.all.length + ' dans notre modèle' : 'mot absent de notre corpus'}">${x.rank ? 'rang ' + x.rank : 'inconnu'}</span>
            </div>`).join('')}</div>
          <p class="text-[11px] mt-2.5" style="color:var(--txt-3)">
            L'étiquette de droite indique où <b style="color:var(--txt-2)">notre</b> modèle classe ce mot :
            c'est une mesure d'accord bien plus fine qu'une simple intersection.
          </p>
        </div>
        <div>
          <p class="eyebrow mb-3">Notre modèle — probabilités <b style="color:var(--ok)">mesurées</b></p>
          <div class="space-y-2">${rowsFor(localItems, localItems[0] ? localItems[0].p : 1, COLORS.accent, x => llmSet.has(x.word))}</div>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5">
        ${statCard(`${agree}/${llmItems.length}`, 'proposés dans notre top 10', COLORS.ok)}
        ${statCard(`${known}/${llmItems.length}`, 'connus de notre corpus', COLORS.txt2)}
        ${statCard(hLLM.toFixed(2), 'bits — distribution du LLM', COLORS.violet)}
        ${statCard(hLocal.toFixed(2), 'bits — distribution locale', COLORS.accent)}
        ${statCard(esc(res.provider), 'fournisseur du calcul', COLORS.txt2)}
      </div>

      <div class="callout callout-warn mt-4">
        <i data-lucide="triangle-alert" class="w-4 h-4 shrink-0 mt-0.5"></i>
        <span>
          <b>Deux natures de chiffres.</b> L'API de ce modèle n'expose pas ses log-probabilités :
          les pourcentages de gauche sont ceux qu'il <b>déclare</b> après ${res.reasoningTokens ?? '—'} jetons
          de raisonnement, pas ceux qu'il calcule. Ceux de droite sont <b>mesurés</b> sur un corpus
          de ${trainChars(store.lang).length.toLocaleString('fr-FR')} caractères. La comparaison reste
          parlante, mais elle ne met pas en regard deux quantités de même statut.
        </span>
      </div>

      <p class="text-[11px] leading-relaxed mt-4 flex items-start gap-1.5" style="color:var(--txt-3)">
        <i data-lucide="lightbulb" class="w-3.5 h-3.5 shrink-0 mt-0.5" style="color:var(--warn)"></i>
        <span>Les deux systèmes font le même calcul : P(mot suivant | contexte). L'un a compté quelques
        milliers de caractères, l'autre a ajusté des milliards de paramètres sur une fraction du web.
        L'objectif optimisé, lui, est resté celui que Shannon a défini en 1948 — minimiser les bits de surprise.</span>
      </p>`;
    refreshIcons();
  } catch (e) {
    renderError(e && e.message ? e.message : 'Requête impossible.');
  } finally {
    busy = false;
  }
}

const seed = lang => {
  const s = { fr: 'le boulanger sortait le pain du', en: 'the baker was taking the bread out of the',
              es: 'el panadero sacaba el pan del', ru: 'пекарь доставал хлеб из' };
  return s[lang] || s.fr;
};

export function init() {
  el('llmAuth').innerHTML = `
    <span class="badge" style="background:rgba(167,139,250,.14);color:var(--violet)">${LLM.label}</span>
    <span class="text-[11px]" style="color:var(--txt-3)">via OpenRouter, appelé depuis votre navigateur</span>`;

  el('llmAsk').addEventListener('click', ask);
  el('aiInput').addEventListener('keydown', e => { if (e.key === 'Enter') ask(); });

  renderLadder();
  renderCurves();
  onLang(() => {
    renderLadder();
    renderCurves();
    el('aiInput').value = seed(store.lang);
    renderIdle();
  });

  el('aiInput').value = seed(store.lang);
  renderIdle();
  refreshIcons();
}
