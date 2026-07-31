import { el, esc, heat, heatA, COLORS, statCard } from './ui.js';
import { predictChar, generateWords, scoreWords } from './model.js';
import {
  predictNext, scoreSequence, generate, tunedWeights, ablation,
  coverage, COMPONENT_META
} from './predictor.js';
import { store, onLang } from './state.js';
import { refreshIcons } from './icons.js';
import { renderMath } from './math.js';

/* ============================================================
   CHAPITRE 7 — Prédire le symbole suivant
   ------------------------------------------------------------
   Le geste d'un modèle de langage, montré à trois échelles :
   la lettre, le mot, et le mélange d'experts qui les combine.
   Tout ce qui est affiché est calculé en direct.
   ============================================================ */

const SEEDS = {
  fr: ['la femme ', 'les enfants ', 'il faut ', 'le boulanger ', 'nous ne '],
  en: ['the woman ', 'the children ', 'we do ', 'the baker ', 'the language '],
  es: ['la mujer ', 'los ninos ', 'el panadero ', 'la lengua '],
  ru: ['женщина ', 'дети ', 'пекарь ', 'язык ']
};

let temp = 0.85, topP = 0.9, penalty = 1.8, mode = 'mix';
let timer = null, lastTop = '';

function split(text) {
  if (/\s$/.test(text) || !text) return { ctx: text, prefix: '' };
  const m = text.match(/([^\s]*)$/);
  const prefix = m ? m[1] : '';
  return { ctx: text.slice(0, text.length - prefix.length), prefix };
}

/* ---------- A. la lettre suivante (le socle) ---------- */
function renderLetters(text) {
  const { top, entropy } = predictChar(store.lang, text, 6, 8);
  const max = top.length ? top[0].p : 1;
  el('wLetters').innerHTML = `
    <div class="flex flex-wrap gap-1.5">
      ${top.map((t, i) => `
        <span class="flex flex-col items-center gap-1" title="${(-Math.log2(t.p)).toFixed(2)} bits">
          <span class="glyph" style="width:2.1rem;height:2.1rem;background:${heatA(-Math.log2(t.p), .18, 6)};border:1px solid ${i === 0 ? 'var(--accent)' : 'var(--line)'};color:${i === 0 ? 'var(--accent)' : 'var(--txt-2)'}">${t.ch === ' ' ? '␣' : esc(t.ch)}</span>
          <span class="mono text-[9px]" style="color:var(--txt-3)">${(t.p / max * 100).toFixed(0)}</span>
        </span>`).join('')}
    </div>
    <p class="text-[11px] mt-2.5" style="color:var(--txt-3)">
      Incertitude sur la lettre : <span class="mono" style="color:${heat(entropy, 4.7)}">${entropy.toFixed(2)} bits</span>
      — soit ${(2 ** entropy).toFixed(1)} lettres également plausibles.
    </p>`;
}

/* ---------- B. le mot suivant : les quatre experts ---------- */
function renderNext(text) {
  const { ctx, prefix } = split(text);
  const p = predictNext(store.lang, ctx, { prefix, topK: 8 });
  lastTop = p.ranked.length ? p.ranked[0].word : '';

  const host = el('wNext');
  if (!p.ranked.length) {
    host.innerHTML = `<p class="text-xs" style="color:var(--txt-3)">Aucun candidat pour « ${esc(prefix)} ».</p>`;
    return;
  }
  const max = p.ranked[0].pn;

  host.innerHTML = `
    <div class="space-y-2">
      ${p.ranked.map((r, i) => {
        const m = COMPONENT_META[r.by];
        // part de chaque expert dans la probabilité finale
        const tot = Object.keys(p.weights).reduce((s, k) => s + p.weights[k] * r.parts[k], 0) || 1;
        const seg = Object.keys(COMPONENT_META).map(k => {
          const share = p.weights[k] * r.parts[k] / tot;
          return share > 0.005 ? `<span style="width:${(share * 100).toFixed(1)}%;background:${COMPONENT_META[k].color};display:block;height:100%"></span>` : '';
        }).join('');
        return `
        <button data-w="${esc(r.word)}" class="w-full flex items-center gap-2.5 text-left">
          <span class="mono text-xs px-2 py-1.5 rounded-lg truncate shrink-0" style="width:7.5rem;background:${i === 0 ? 'rgba(214,172,85,.14)' : 'var(--surface-2)'};border:1px solid ${i === 0 ? 'rgba(214,172,85,.4)' : r.known ? 'var(--line)' : 'rgba(157,134,201,.5)'};color:${i === 0 ? COLORS.coldBright : 'var(--txt-2)'}">${esc(r.word)}${r.known ? '' : '<sup style="color:var(--violet)">✦</sup>'}</span>
          <span class="flex-1 rounded-full overflow-hidden flex" style="height:.55rem;background:var(--bg);width:${(r.pn / max * 100).toFixed(1)}%;min-width:2px">${seg}</span>
          <span class="mono text-[11px] tabular text-right shrink-0" style="width:3rem;color:${i === 0 ? 'var(--accent)' : 'var(--txt-3)'}">${(r.pn * 100).toFixed(1)}%</span>
          <span class="badge shrink-0" style="background:${m.color}1f;color:${m.color}">${m.label}</span>
        </button>`;
      }).join('')}
    </div>
    <div class="grid grid-cols-3 gap-2 mt-4">
      ${statCard(p.entropy.toFixed(2), 'bits d\'incertitude', heat(p.entropy, 10))}
      ${statCard((2 ** p.entropy).toFixed(0), 'mots équivalents', COLORS.violet)}
      ${statCard(p.cacheSize, 'mots en mémoire courte', COLORS.ok)}
    </div>
    <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
      La barre de chaque candidat est découpée selon l'expert qui l'a soutenu.
      <span style="color:var(--violet)">✦</span> signale un mot <b style="color:var(--txt-2)">absent du corpus</b>,
      proposé lettre à lettre par le modèle d'orthographe.
    </p>`;

  host.querySelectorAll('button[data-w]').forEach(b => { b.onclick = () => accept(b.dataset.w); });
}

/* ---------- C. le panneau des experts ---------- */
function renderExperts(text) {
  const { ctx, prefix } = split(text);
  const { lam, devBits } = tunedWeights(store.lang);
  // une seule évaluation de la distribution, réutilisée par les quatre experts
  const all = predictNext(store.lang, ctx, { prefix, topK: 1, invent: false }).all;
  const rows = Object.keys(COMPONENT_META).map(k => {
    const m = COMPONENT_META[k];
    // ce que cet expert seul proposerait
    const solo = all
      .map(x => ({ word: x.word, v: x.parts[k] }))
      .sort((a, b) => b.v - a.v)
      .filter(x => x.v > 0)
      .slice(0, 3);
    return `
      <div class="mb-3">
        <div class="flex items-baseline justify-between gap-2 mb-1">
          <span class="text-xs font-semibold" style="color:${m.color}">${m.label}</span>
          <span class="mono text-[11px]" style="color:var(--txt-2)">λ = ${(lam[k] * 100).toFixed(0)} %</span>
        </div>
        <div class="h-1.5 rounded-full overflow-hidden mb-1.5" style="background:var(--bg)">
          <div class="grow h-full rounded-full" style="width:${(lam[k] * 100).toFixed(1)}%;background:${m.color}"></div>
        </div>
        <p class="text-[10px] mb-1" style="color:var(--txt-3)">${m.desc}</p>
        <div class="flex flex-wrap gap-1">
          ${solo.length
            ? solo.map(x => `<span class="mono text-[10px] px-1.5 py-0.5 rounded" style="background:var(--bg);border:1px solid var(--line);color:var(--txt-2)">${esc(x.word)}</span>`).join('')
            : `<span class="text-[10px]" style="color:var(--txt-3)">rien à proposer ici</span>`}
        </div>
      </div>`;
  }).join('');

  el('wExperts').innerHTML = rows + `
    <p class="text-[11px] leading-relaxed pt-2" style="color:var(--txt-3);border-top:1px solid var(--line)">
      Ces poids ne sont pas choisis à la main : ils sont estimés par l'algorithme EM sur un
      jeu de développement séparé, jusqu'à convergence
      (<span class="mono">${devBits.toFixed(2)}</span> bits/mot atteints).
    </p>`;
}

function accept(word) {
  const input = el('wInput');
  const { ctx } = split(input.value);
  input.value = ctx + word + ' ';
  input.focus();
  update();
}

/* ---------- D. génération avec trace ---------- */
function renderAuto() {
  const seed = el('wInput').value.trim();
  el('wEcho').textContent = seed ? seed + ' ' : '';

  if (mode === 'raw') {
    // fréquences brutes, sans lissage : le modèle rejoue le corpus
    const text = generateWords(store.lang, 26, seed, { order: 2 });
    const sc = scoreWords(store.lang, text);
    el('wAuto').innerHTML = text.split(' ').map((word, i) => {
      const b = sc.words[i] ? sc.words[i].bits : 0;
      return `<span style="color:${heat(b, 12)}" title="${b.toFixed(1)} bits">${esc(word)}</span>`;
    }).join(' ');
    el('wTrace').innerHTML = `
      <p class="text-[11px] leading-relaxed" style="color:var(--txt-3)">
        En mode brut il n'y a rien à arbitrer : à chaque pas le modèle relit ses comptages au plus long
        contexte disponible et tire dedans. Le texte est fluide parce qu'il est <b style="color:var(--txt-2)">emprunté</b>.
        C'est la procédure exacte de Shannon en 1948 — et la définition même du surapprentissage.
      </p>`;
    return;
  }

  const g = generate(store.lang, 26, seed, { temperature: temp, topP, penalty, invent: true });
  el('wAuto').innerHTML = g.trace.map(t =>
    `<span style="color:${heat(t.bits, 12)}" title="${t.bits.toFixed(1)} bits · décidé par ${COMPONENT_META[t.by].label}">${esc(t.word)}</span>`
  ).join(' ');

  const avg = g.trace.reduce((a, t) => a + t.bits, 0) / Math.max(g.trace.length, 1);
  el('wTrace').innerHTML = `
    <table class="tbl">
      <thead><tr><th>pas</th><th>mot tiré</th><th class="num">bits</th><th class="num">incertitude</th><th>décidé par</th><th>autres candidats</th></tr></thead>
      <tbody>
        ${g.trace.slice(0, 8).map((t, i) => `
          <tr>
            <td class="num" style="color:var(--txt-3)">${i + 1}</td>
            <td class="mono" style="color:${heat(t.bits, 12)}">${esc(t.word)}</td>
            <td class="num">${t.bits.toFixed(1)}</td>
            <td class="num" style="color:var(--txt-3)">${t.entropy.toFixed(1)}</td>
            <td><span class="badge" style="background:${COMPONENT_META[t.by].color}1f;color:${COMPONENT_META[t.by].color}">${COMPONENT_META[t.by].label}</span></td>
            <td class="mono" style="color:var(--txt-3)">${t.alternatives.slice(1, 4).map(a => esc(a.word)).join(' · ')}</td>
          </tr>`).join('')}
      </tbody>
    </table>
    <p class="text-[11px] mt-2.5" style="color:var(--txt-3)">
      Coût moyen <span class="mono" style="color:var(--txt-2)">${avg.toFixed(2)}</span> bits/mot sur cette génération.
      Un modèle qui s'écoute parler devient de plus en plus sûr de lui : le cache prend le relais.
    </p>`;
}

/* ---------- E. prévisibilité du texte saisi ---------- */
function renderHeat(text) {
  const res = scoreSequence(store.lang, text);
  const host = el('wHeat');
  if (!res.words.length) {
    host.innerHTML = `<p class="text-xs" style="color:var(--txt-3)">Écrivez une phrase.</p>`;
    el('wStats').innerHTML = '';
    return;
  }
  host.innerHTML = res.words.map(w => `
    <span class="mono text-xs px-2 py-1 rounded-lg" style="background:${heatA(w.bits, .18, 16)};border:1px solid ${w.known ? heatA(w.bits, .38, 16) : 'var(--violet)'};color:${heat(w.bits, 16)}"
      title="« ${esc(w.word)} » — ${w.bits.toFixed(2)} bits\ndécidé par : ${COMPONENT_META[w.by].label}${w.seen ? '\ndéjà vu dans ce texte' : ''}${w.known ? '' : '\nabsent du corpus'}">${esc(w.word)}${w.seen ? '<sup style="color:var(--ok)">↺</sup>' : ''}</span>`).join('');

  const nChars = res.words.reduce((a, w) => a + w.word.length + 1, 0);
  el('wStats').innerHTML =
    statCard(res.bitsPerWord.toFixed(2), 'bits / mot', heat(res.bitsPerWord, 16)) +
    statCard((res.totalBits / Math.max(nChars, 1)).toFixed(2), 'bits / caractère', COLORS.accent) +
    statCard(res.perplexity.toFixed(0), 'perplexité', COLORS.violet) +
    statCard(Math.round(res.totalBits / 8) + ' o', 'poids réel du texte', COLORS.txt2);
}

/* ---------- F. ablation ---------- */
function renderAblation() {
  const rows = ablation(store.lang);
  const cov = coverage(store.lang);
  const base = rows[0].test;
  el('wAblation').innerHTML = `
    <table class="tbl">
      <thead><tr><th>modèle</th><th class="num">dev</th><th class="num">test</th><th class="num">gain</th></tr></thead>
      <tbody>
        ${rows.map((r, i) => `
          <tr class="${i === rows.length - 1 ? 'hl' : ''}">
            <td style="color:${i === rows.length - 1 ? 'var(--txt)' : 'var(--txt-2)'}">${r.label}</td>
            <td class="num" style="color:var(--txt-3)">${r.dev.toFixed(2)}</td>
            <td class="num" style="color:${i === rows.length - 1 ? 'var(--ok)' : 'var(--txt-2)'}">${r.test.toFixed(2)}</td>
            <td class="num" style="color:${r.gain > 0 ? 'var(--ok)' : 'var(--txt-3)'}">${i === 0 ? '—' : '−' + r.gain.toFixed(2)}</td>
          </tr>`).join('')}
      </tbody>
    </table>
    <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
      Bits par mot sur texte inédit ; les poids sont réglés sur le jeu de développement, jamais sur le test.
      L'ensemble gagne <b style="color:var(--ok)">${(base - rows[rows.length - 1].test).toFixed(2)} bits/mot</b> sur le n-gramme seul,
      soit une perplexité divisée par <b style="color:var(--txt-2)">${(2 ** (base - rows[rows.length - 1].test)).toFixed(1)}</b>.
      Le corpus couvre ${(cov.testCoverage * 100).toFixed(0)} % des mots du test :
      c'est l'orthographe qui absorbe les ${(100 - cov.testCoverage * 100).toFixed(0)} % restants, et c'est
      pourquoi elle rapporte autant.
    </p>
    <p class="text-[11px] leading-relaxed mt-2" style="color:var(--txt-3)">
      Les classes n'ajoutent presque rien <i>une fois l'orthographe présente</i> : les deux captent la même
      régularité, la forme du mot. On le dit plutôt que de le cacher — une ablation sert exactement à ça.
      Le cache, lui, paraît modeste ici parce que le texte de test est court et peu répétitif ; sur un
      document long il devient la composante décisive.
    </p>`;
}

/* ---------- orchestration ---------- */
function update() {
  const text = el('wInput').value;
  renderLetters(text);
  renderNext(text);
  clearTimeout(timer);
  timer = setTimeout(() => { renderExperts(text); renderHeat(text); }, 140);
}

function renderSeeds() {
  const list = SEEDS[store.lang] || SEEDS.fr;
  el('wSamples').innerHTML = list.map(s => `
    <button data-s="${esc(s)}" class="btn btn-sm mono" style="font-size:.6875rem;padding:.25rem .5rem">${esc(s.trim())}</button>`).join('');
  el('wSamples').querySelectorAll('button[data-s]').forEach(b => {
    b.onclick = () => { el('wInput').value = b.dataset.s; update(); renderAuto(); el('wInput').focus(); };
  });
}

function syncMode() {
  el('wModeMix').setAttribute('aria-current', mode === 'mix');
  el('wModeRaw').setAttribute('aria-current', mode === 'raw');
  el('wModeNote').innerHTML = mode === 'mix'
    ? `Le modèle <b style="color:var(--txt-2)">prudent</b> répartit la probabilité : il hésite, mais ses chiffres sont honnêtes sur du texte inédit.`
    : `Le modèle <b style="color:var(--txt-2)">qui récite</b> suit les fréquences brutes : le texte paraît meilleur parce qu'il rejoue le corpus. Fluidité contre généralisation — le débat sur les modèles de langage tient dans ce bouton.`;
  el('wDecoding').style.opacity = mode === 'raw' ? '.4' : '1';
}

export function init() {
  const input = el('wInput');
  input.addEventListener('input', update);
  input.addEventListener('keydown', e => {
    if (e.key === 'Tab' && lastTop) { e.preventDefault(); accept(lastTop); }
  });

  const slider = (id, labelId, fn, fmt) => {
    el(id).addEventListener('input', () => {
      const v = Number(el(id).value) / 100;
      fn(v);
      el(labelId).textContent = fmt(v);
      renderAuto();
    });
  };
  slider('wTemp', 'wTempLabel', v => { temp = v; }, v => v.toFixed(2));
  slider('wTopP', 'wTopPLabel', v => { topP = v; }, v => v.toFixed(2));
  slider('wPen', 'wPenLabel', v => { penalty = v; }, v => v.toFixed(2));

  el('wModeMix').addEventListener('click', () => { mode = 'mix'; syncMode(); renderAuto(); });
  el('wModeRaw').addEventListener('click', () => { mode = 'raw'; syncMode(); renderAuto(); });
  el('wGenBtn').addEventListener('click', renderAuto);

  onLang(() => {
    renderSeeds();
    input.value = (SEEDS[store.lang] || SEEDS.fr)[0];
    update(); renderAuto(); renderAblation();
  });

  renderSeeds();
  input.value = (SEEDS[store.lang] || SEEDS.fr)[0];
  syncMode();
  update();
  renderAuto();
  renderAblation();
  renderMath(document.querySelector('section[data-ch="words"]'));
  refreshIcons();
}
