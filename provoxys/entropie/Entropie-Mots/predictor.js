import { TRAIN, DEV, TEST } from './corpus.js';
import { LANGUAGES } from './data.js';
import {
  charModel, wordModel, normalize, tokenize, trainChars,
  MAX_CTX, WORD_CTX
} from './model.js';

/* ============================================================
   PRÉDICTEUR DE MOT SUIVANT — modèle à quatre composantes
   ------------------------------------------------------------
   Un trigramme de mots seul est condamné par la rareté : dans un
   corpus de 2 400 mots, moins de 1 % des trigrammes apparaissent
   deux fois. Le lissage leur retire alors tout crédit et il ne
   reste qu'un modèle de fréquences.

   On combine donc quatre sources d'information complémentaires :

     1. N-GRAMME    P(w | w₋₂ w₋₁)  — Kneser–Ney, l'ordre des mots
     2. CACHE       P(w | ce que vous venez d'écrire) — un mot déjà
                    employé redevient probable (Kuhn & De Mori 1990)
     3. CLASSES     P(classe | classe précédente) × P(w | classe),
                    les classes étant les terminaisons : le modèle
                    généralise aux formes fléchies jamais vues
     4. ORTHOGRAPHE P(w) lettre à lettre par le modèle de caractères,
                    conditionné par le texte qui précède : n'importe
                    quelle suite de lettres reçoit une probabilité,
                    ce qui supprime la falaise du hors-vocabulaire

   Les poids λ ne sont pas choisis à la main : ils sont estimés par
   l'algorithme EM sur un jeu de DÉVELOPPEMENT distinct du jeu de
   test (interpolation supprimée, Jelinek & Mercer 1980). Chaque
   itération augmente la vraisemblance ; l'ensemble converge.

   C'est, à cette échelle de données, l'architecture qui donne la
   plus faible entropie — et c'est aussi la généalogie directe des
   modèles de langage : mélange d'experts, contexte, sous-mots.
   ============================================================ */

const script = lang => (LANGUAGES[lang] ? LANGUAGES[lang].script : 'latin');
const SUFFIX_LEN = 3;
const suffixOf = w => (w.length <= SUFFIX_LEN ? '#' + w : w.slice(-SUFFIX_LEN));

/* ============================================================
   1. Modèle de classes (terminaisons)
   ============================================================ */
const CLASS_CACHE = new Map();

function classModel(lang) {
  if (CLASS_CACHE.has(lang)) return CLASS_CACHE.get(lang);
  const words = tokenize(TRAIN[lang], script(lang));

  const clsOf = new Map();                 // mot -> classe
  const members = new Map();               // classe -> Map(mot -> compte)
  const clsCount = new Map();              // classe -> effectif
  const trans = new Map();                 // classe précédente -> Map(classe -> compte)

  let prev = null;
  for (const w of words) {
    const c = suffixOf(w);
    clsOf.set(w, c);
    clsCount.set(c, (clsCount.get(c) || 0) + 1);
    let m = members.get(c);
    if (!m) { m = new Map(); members.set(c, m); }
    m.set(w, (m.get(w) || 0) + 1);
    if (prev !== null) {
      let t = trans.get(prev);
      if (!t) { t = { total: 0, counts: new Map() }; trans.set(prev, t); }
      t.total++; t.counts.set(c, (t.counts.get(c) || 0) + 1);
    }
    prev = c;
  }

  const nClasses = clsCount.size;
  const total = words.length;
  const m = { clsOf, members, clsCount, trans, nClasses, total };
  CLASS_CACHE.set(lang, m);
  return m;
}

/** P_classe(w | mot précédent) : transition de classe × choix dans la classe. */
function classProb(lang, prevWord, word) {
  const cm = classModel(lang);
  const c = suffixOf(word);
  const pc = suffixOf(prevWord || '');
  const node = cm.trans.get(pc);
  // transition entre classes, lissée vers la fréquence marginale des classes
  const marg = (cm.clsCount.get(c) || 0.5) / cm.total;
  const pTrans = node
    ? 0.75 * ((node.counts.get(c) || 0) / node.total) + 0.25 * marg
    : marg;
  // choix du mot dans sa classe : fréquence relative, sans plancher.
  // Un mot jamais vu n'est pas couvert ici mais par l'orthographe :
  // les composantes restent ainsi complémentaires plutôt que redondantes.
  const mem = cm.members.get(c);
  if (!mem) return 0;
  const pWord = (mem.get(word) || 0) / cm.clsCount.get(c);
  return pTrans * pWord;
}

/* ============================================================
   2. Modèle orthographique conditionné par le contexte
   ------------------------------------------------------------
   P(w) = Π P(cᵢ | caractères précédents) · P(espace | …)
   Le contexte de caractères provient du texte réel qui précède :
   le modèle de mots repose donc littéralement sur le modèle de
   lettres, comme un modèle de langage repose sur ses sous-mots.
   ============================================================ */
const SPELL_LRU = new Map();
const SPELL_MAX = 20000;

export function spellProb(lang, ctxTail, word) {
  const key = lang + '|' + ctxTail + '|' + word;
  const hit = SPELL_LRU.get(key);
  if (hit !== undefined) return hit;

  const m = charModel(lang, MAX_CTX);
  const ctx = [...(ctxTail + ' ')].slice(-MAX_CTX);
  let logp = 0;
  for (const ch of word + ' ') {
    logp += Math.log2(Math.max(m.prob(ctx.slice(-MAX_CTX), ch, MAX_CTX), 1e-12));
    ctx.push(ch);
  }
  const p = 2 ** logp;
  if (SPELL_LRU.size > SPELL_MAX) SPELL_LRU.clear();
  SPELL_LRU.set(key, p);
  return p;
}

/* ============================================================
   3. Cache : adaptation au texte en cours
   ------------------------------------------------------------
   Un mot employé récemment redevient probable. Le poids décroît
   avec la distance : c'est ce qui rend un texte de plus en plus
   prévisible à mesure qu'il avance, et ce que fait un modèle de
   langage lorsqu'il « suit » un document long.
   ============================================================ */
const DECAY = 0.995;

export function buildCache(words) {
  const w = new Map();          // frequences recentes
  const bi = new Map();         // mot precedent -> Map(mot -> poids)
  let mass = 0;
  for (let i = 0; i < words.length; i++) {
    const weight = Math.pow(DECAY, words.length - i);
    w.set(words[i], (w.get(words[i]) || 0) + weight);
    mass += weight;
    if (i > 0) {
      let m = bi.get(words[i - 1]);
      if (!m) { m = { total: 0, counts: new Map() }; bi.set(words[i - 1], m); }
      m.total += weight;
      m.counts.set(words[i], (m.counts.get(words[i]) || 0) + weight);
    }
  }
  return { w, bi, mass, size: words.length };
}

/**
 * Cache a deux niveaux : ce qui a deja suivi CE mot dans le texte
 * courant, sinon ce qui est simplement apparu recemment. C'est le
 * mecanisme qui rend un texte de plus en plus previsible a mesure
 * qu'on le lit — et qui fait qu'un LLM « suit » un long document.
 */
function cacheProb(cache, prevWord, word) {
  if (cache.mass <= 0) return 0;
  const uni = (cache.w.get(word) || 0) / cache.mass;
  const node = prevWord !== undefined ? cache.bi.get(prevWord) : null;
  if (!node || node.total <= 0) return uni;
  const bi = (node.counts.get(word) || 0) / node.total;
  const lambda = node.total / (node.total + 4);     // une seule observation ne suffit pas
  return lambda * bi + (1 - lambda) * uni;
}

/* ============================================================
   4. Les quatre composantes, puis leur mélange
   ============================================================ */

/** Probabilités brutes de chaque composante pour un mot donné. */
function components(lang, ctxWords, ctxTail, word, cache) {
  const wm = wordModel(lang);
  return {
    ngram: wm.vocab.has(word) ? wm.prob(ctxWords.slice(-WORD_CTX), word, WORD_CTX) : 0,
    cache: cacheProb(cache, ctxWords[ctxWords.length - 1], word),
    klass: classProb(lang, ctxWords[ctxWords.length - 1], word),
    spell: spellProb(lang, ctxTail, word)
  };
}

const KEYS = ['ngram', 'cache', 'klass', 'spell'];

export const COMPONENT_META = {
  ngram: { label: 'n-gramme', desc: "l'ordre des mots", color: '#d6ac55' },
  cache: { label: 'cache', desc: 'ce que vous venez d\'écrire', color: '#6fb094' },
  klass: { label: 'classes', desc: 'les terminaisons', color: '#ef7d57' },
  spell: { label: 'orthographe', desc: 'lettre à lettre', color: '#9d86c9' }
};

/** Mélange pondéré, en ignorant les composantes inactives. */
function mix(parts, lam) {
  let p = 0, norm = 0;
  for (const k of KEYS) {
    if (k === 'cache' && parts.cache === 0 && lam.cache > 0) continue; // cache vide
    p += lam[k] * parts[k];
    norm += lam[k];
  }
  return norm > 0 ? p / norm : 0;
}

/* ============================================================
   5. Estimation EM des poids sur le jeu de développement
   ============================================================ */
const WEIGHTS = new Map();

export function tunedWeights(lang, opts = {}) {
  const key = lang + (opts.only ? '|' + opts.only.join(',') : '');
  if (WEIGHTS.has(key)) return WEIGHTS.get(key);

  const active = opts.only || KEYS;
  const words = tokenize(DEV[lang], script(lang));
  const raw = normalize(DEV[lang], script(lang));

  // observations : pour chaque mot du dev, la probabilité de chaque composante
  const obs = [];
  let cache = buildCache([]);
  let charPos = 0;
  for (let i = 0; i < words.length; i++) {
    const ctxWords = words.slice(Math.max(0, i - WORD_CTX), i);
    const ctxTail = raw.slice(Math.max(0, charPos - MAX_CTX), charPos);
    obs.push(components(lang, ctxWords, ctxTail, words[i], cache));
    charPos += words[i].length + 1;
    cache = buildCache(words.slice(0, i + 1));
  }

  // EM (interpolation supprimée) : chaque itération augmente la vraisemblance
  let lam = {};
  for (const k of KEYS) lam[k] = active.includes(k) ? 1 / active.length : 0;

  for (let it = 0; it < 40; it++) {
    const acc = { ngram: 0, cache: 0, klass: 0, spell: 0 };
    let n = 0;
    for (const o of obs) {
      let denom = 0;
      for (const k of active) denom += lam[k] * o[k];
      if (denom <= 0) continue;
      for (const k of active) acc[k] += (lam[k] * o[k]) / denom;
      n++;
    }
    if (!n) break;
    let moved = 0;
    for (const k of active) {
      const nv = acc[k] / n;
      moved += Math.abs(nv - lam[k]);
      lam[k] = nv;
    }
    if (moved < 1e-6) break;
  }

  // entropie de développement atteinte avec ces poids
  let bits = 0;
  for (const o of obs) bits += -Math.log2(Math.max(mix(o, lam), 1e-12));
  const result = { lam, devBits: bits / Math.max(obs.length, 1), n: obs.length };
  WEIGHTS.set(key, result);
  return result;
}

/* ============================================================
   6. API de prédiction
   ============================================================ */

/**
 * Distribution du mot suivant.
 * @param {string} lang
 * @param {string} ctxText  tout le texte qui précède
 * @param {object} opts     { prefix, topK, invent }
 */
export function predictNext(lang, ctxText, opts = {}) {
  const { prefix = '', topK = 8, invent = true } = opts;
  const sc = script(lang);
  const wm = wordModel(lang);
  const { lam } = tunedWeights(lang);

  const words = tokenize(ctxText, sc);
  const raw = normalize(ctxText, sc);
  const ctxWords = words.slice(-WORD_CTX);
  const ctxTail = raw.slice(-MAX_CTX);
  const cache = buildCache(words);
  const pre = normalize(prefix, sc).replace(/\s/g, '');

  const candidates = new Set();
  for (const w of wm.vocab) if (!pre || w.startsWith(pre)) candidates.add(w);
  // mots inventés : le modèle de lettres propose des formes jamais vues
  if (invent) for (const w of inventWords(lang, ctxTail, pre, 6)) candidates.add(w);

  const ranked = [];
  for (const w of candidates) {
    const parts = components(lang, ctxWords, ctxTail, w, cache);
    const p = mix(parts, lam);
    if (p <= 0) continue;
    ranked.push({
      word: w, p, parts,
      known: wm.vocab.has(w),
      // composante dominante : ce qui « explique » la prédiction
      by: KEYS.reduce((a, k) => (lam[k] * parts[k] > lam[a] * parts[a] ? k : a), 'ngram')
    });
  }

  const sum = ranked.reduce((s, x) => s + x.p, 0) || 1;
  ranked.forEach(x => { x.pn = x.p / sum; });
  ranked.sort((a, b) => b.p - a.p);

  let H = 0;
  for (const x of ranked) if (x.pn > 0) H -= x.pn * Math.log2(x.pn);

  return {
    ranked: ranked.slice(0, topK),
    all: ranked,
    entropy: H,
    weights: lam,
    contextWords: ctxWords,
    cacheSize: cache.size,
    covered: sum                 // masse couverte par les candidats retenus
  };
}

/**
 * Mots « inventés » : recherche en faisceau sur le modèle de lettres.
 * Le modèle produit des formes plausibles absentes du corpus — c'est
 * exactement ce que permet une tokenisation en sous-mots.
 */
export function inventWords(lang, ctxTail, prefix = '', k = 6, maxLen = 13) {
  const m = charModel(lang, MAX_CTX);
  const alphabet = [...m.vocab].filter(c => c !== ' ');
  const pre = normalize(prefix, script(lang)).replace(/\s/g, '');
  let beams = [{ w: pre, lp: 0 }];
  const done = [];

  for (let step = 0; step < maxLen; step++) {
    const next = [];
    for (const b of beams) {
      const ctx = [...(ctxTail + ' ' + b.w)].slice(-MAX_CTX);
      const pSpace = m.prob(ctx, ' ', MAX_CTX);
      if (b.w.length >= Math.max(2, pre.length + 1)) {
        done.push({ w: b.w, lp: b.lp + Math.log2(Math.max(pSpace, 1e-12)) });
      }
      for (const c of alphabet) {
        const p = m.prob(ctx, c, MAX_CTX);
        if (p < 0.02) continue;
        next.push({ w: b.w + c, lp: b.lp + Math.log2(p) });
      }
    }
    if (!next.length) break;
    next.sort((a, b) => b.lp - a.lp);
    beams = next.slice(0, 10);
  }
  done.sort((a, b) => b.lp - a.lp);
  return done.slice(0, k).map(d => d.w);
}

/** Surprise d'un mot précis, avec le détail par composante. */
export function surprisalOf(lang, ctxText, word) {
  const sc = script(lang);
  const { lam } = tunedWeights(lang);
  const words = tokenize(ctxText, sc);
  const raw = normalize(ctxText, sc);
  const w = normalize(word, sc).replace(/\s/g, '');
  const parts = components(lang, words.slice(-WORD_CTX), raw.slice(-MAX_CTX), w, buildCache(words));
  const p = mix(parts, lam);
  return { word: w, p, bits: -Math.log2(Math.max(p, 1e-12)), parts, weights: lam };
}

/** Analyse mot à mot d'un texte, cache compris. */
export function scoreSequence(lang, text) {
  const sc = script(lang);
  const { lam } = tunedWeights(lang);
  const words = tokenize(text, sc);
  const raw = normalize(text, sc);
  const wm = wordModel(lang);

  const out = [];
  let bits = 0, pos = 0;
  for (let i = 0; i < words.length; i++) {
    const ctxWords = words.slice(Math.max(0, i - WORD_CTX), i);
    const ctxTail = raw.slice(Math.max(0, pos - MAX_CTX), pos);
    const cache = buildCache(words.slice(0, i));
    const parts = components(lang, ctxWords, ctxTail, words[i], cache);
    const p = mix(parts, lam);
    const b = -Math.log2(Math.max(p, 1e-12));
    bits += b;
    out.push({
      word: words[i], bits: b, p, parts,
      known: wm.vocab.has(words[i]),
      by: KEYS.reduce((a, k) => (lam[k] * parts[k] > lam[a] * parts[a] ? k : a), 'ngram'),
      seen: i > 0 && words.slice(0, i).includes(words[i])
    });
    pos += words[i].length + 1;
  }
  const n = Math.max(words.length, 1);
  return { words: out, bitsPerWord: bits / n, perplexity: 2 ** (bits / n), totalBits: bits };
}

/** Entropie du modèle sur un texte, pour un sous-ensemble de composantes. */
export function evaluate(lang, text, only) {
  const sc = script(lang);
  const { lam } = tunedWeights(lang, only ? { only } : {});
  const words = tokenize(text, sc);
  const raw = normalize(text, sc);
  let bits = 0, pos = 0;
  for (let i = 0; i < words.length; i++) {
    const parts = components(
      lang, words.slice(Math.max(0, i - WORD_CTX), i),
      raw.slice(Math.max(0, pos - MAX_CTX), pos),
      words[i], buildCache(words.slice(0, i))
    );
    bits += -Math.log2(Math.max(mix(parts, lam), 1e-12));
    pos += words[i].length + 1;
  }
  return bits / Math.max(words.length, 1);
}

/**
 * Étude d'ablation : ce que chaque composante apporte réellement,
 * mesuré sur le jeu de test, poids réglés sur le jeu de dev.
 */
const ABL = new Map();
export function ablation(lang) {
  if (ABL.has(lang)) return ABL.get(lang);
  const steps = [
    { only: ['ngram'], label: 'n-gramme seul' },
    { only: ['ngram', 'spell'], label: '+ orthographe' },
    { only: ['ngram', 'spell', 'klass'], label: '+ classes' },
    { only: ['ngram', 'spell', 'klass', 'cache'], label: '+ cache' }
  ];
  let prev = null;
  const rows = steps.map(s => {
    const test = evaluate(lang, TEST[lang], s.only);
    const dev = tunedWeights(lang, { only: s.only }).devBits;
    const row = { ...s, test, dev, gain: prev === null ? 0 : prev - test };
    prev = test;
    return row;
  });
  ABL.set(lang, rows);
  return rows;
}

/* ============================================================
   7. Génération
   ============================================================ */

/**
 * Tirage dans une distribution : temperature, troncature top-p / top-k
 * et penalite de repetition. Ce sont exactement les reglages de
 * decodage d'un modele de langage.
 */
function sample(ranked, { temperature = 1, topP = 0.92, topK = 0, penalty = 1, recent = [] } = {}) {
  const seen = new Map();
  // le mot qui vient d'etre produit est le plus penalise : une langue
  // ne repete presque jamais deux fois le meme mot de suite
  recent.forEach((w, i) => seen.set(w, Math.max(seen.get(w) || 0, Math.pow(0.82, recent.length - 1 - i))));
  let list = ranked.map(x => {
    const rep = seen.get(x.word);
    return [x.word, rep ? x.pn / Math.pow(penalty, rep) : x.pn];
  });
  if (temperature !== 1) {
    const t = Math.max(temperature, 0.01);
    list = list.map(([w, p]) => [w, Math.exp(Math.log(Math.max(p, 1e-12)) / t)]);
  }
  list.sort((a, b) => b[1] - a[1]);
  if (topK > 0) list = list.slice(0, topK);
  const tot0 = list.reduce((s, x) => s + x[1], 0) || 1;
  if (topP < 1) {
    let acc = 0; const keep = [];
    for (const x of list) { keep.push(x); acc += x[1] / tot0; if (acc >= topP) break; }
    list = keep;
  }
  const tot = list.reduce((s, x) => s + x[1], 0) || 1;
  let r = Math.random() * tot;
  for (const [w, p] of list) { r -= p; if (r <= 0) return w; }
  return list.length ? list[0][0] : '';
}

/**
 * Génération mot à mot avec la trace complète : à chaque pas, le mot
 * choisi, son coût en bits, l'incertitude locale et la composante qui
 * a décidé. C'est le déroulé exact d'un modèle de langage.
 */
export function generate(lang, count = 24, seed = '', opts = {}) {
  let text = seed;
  const trace = [];
  for (let i = 0; i < count; i++) {
    const pred = predictNext(lang, text, { topK: 60, invent: opts.invent !== false });
    if (!pred.ranked.length) break;
    const w = sample(pred.ranked, { ...opts, recent: trace.slice(-8).map(t => t.word) });
    const hit = pred.ranked.find(x => x.word === w) || pred.ranked[0];
    trace.push({
      word: w,
      bits: -Math.log2(Math.max(hit.pn, 1e-12)),
      entropy: pred.entropy,
      by: hit.by,
      known: hit.known,
      alternatives: pred.ranked.slice(0, 4).map(x => ({ word: x.word, p: x.pn }))
    });
    text = (text ? text + ' ' : '') + w;
  }
  return { text: trace.map(t => t.word).join(' '), trace };
}

/** Statistiques de couverture, pour situer honnêtement le modèle. */
export function coverage(lang) {
  const wm = wordModel(lang);
  const testWords = tokenize(TEST[lang], script(lang));
  const known = testWords.filter(w => wm.vocab.has(w)).length;
  let tri1 = 0, triN = 0;
  for (const node of wm.raw[2].values()) {
    for (const c of node.counts.values()) (c === 1 ? tri1++ : triN++);
  }
  return {
    trainChars: trainChars(lang).length,
    tokens: wm.tokens,
    types: wm.vocab.size,
    testCoverage: known / Math.max(testWords.length, 1),
    triRepeat: triN / Math.max(tri1 + triN, 1)
  };
}
