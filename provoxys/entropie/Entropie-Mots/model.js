import { TRAIN, TEST } from './corpus.js';
import { LANGUAGES } from './data.js';

/* ============================================================
   MOTEUR STATISTIQUE DE LANGUE
   ------------------------------------------------------------
   Modèle n-gramme à interpolation Kneser–Ney modifiée
   (Chen & Goodman, 1998), appliqué aux caractères et aux mots.

   Pourquoi Kneser–Ney plutôt qu'un simple comptage ?
   Un comptage brut attribue une probabilité nulle à tout
   n-gramme jamais observé — l'entropie devient alors infinie
   dès la première nouveauté. Il faut donc « lisser » : retirer
   une masse δ aux événements vus et la redistribuer aux autres
   selon un modèle d'ordre inférieur. Kneser–Ney va plus loin :
   à l'ordre inférieur, il ne compte pas les occurrences mais le
   nombre de contextes distincts dans lesquels un symbole
   apparaît (comptes de continuation). C'est ce qui empêche un
   mot fréquent mais toujours identique (« Francisco » dans
   « San Francisco ») d'être surestimé hors de son contexte.

   Rôle dans la théorie de Shannon :
     • P(symbole | contexte)  → la source markovienne du §2-4
     • −log₂ P                → l'information d'un symbole (§6)
     • moyenne sur un texte   → Fₙ, entropie conditionnelle (§7,
       théorème 6), mesurée ici sur un texte JAMAIS VU pour
       éviter de mesurer de la mémorisation.
   ============================================================ */

export const MAX_CTX = 6;      // longueur maximale du contexte en caractères
export const WORD_CTX = 2;     // trigramme de mots (2 mots de contexte)

/* ---------- Normalisation ---------- */
const FOLD = {
  'à':'a','â':'a','ä':'a','á':'a','ã':'a','å':'a','æ':'ae','ç':'c',
  'è':'e','é':'e','ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i',
  'ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ø':'o','œ':'oe',
  'ù':'u','ú':'u','û':'u','ü':'u','ý':'y','ÿ':'y','ß':'ss'
};

/**
 * Réduit un texte à l'alphabet du modèle : lettres minuscules + espace,
 * exactement l'alphabet de 27 symboles utilisé par Shannon (§3).
 */
export function normalize(text, script = 'latin') {
  let out = '';
  for (const raw of String(text).toLowerCase()) {
    let ch = raw;
    if (script === 'latin' && FOLD[ch] !== undefined) ch = FOLD[ch];
    if (script === 'cyrillic') out += /^[а-яё]$/.test(ch) ? ch : ' ';
    else if (/^[a-zñ]+$/.test(ch)) out += ch;
    else out += ' ';
  }
  return out.replace(/\s+/g, ' ').trim();
}

export const tokenize = (text, script = 'latin') =>
  normalize(text, script).split(' ').filter(Boolean);

/* ============================================================
   Modèle n-gramme générique à interpolation Kneser–Ney modifiée
   ============================================================ */

/* Separateur de cles de contexte : un octet de controle, impossible
   dans un caractere ou un mot normalise. */
const SEP = '\u0001';

class KN {
  /**
   * @param {string[]} seq  suite de symboles (caractères ou mots)
   * @param {number} maxCtx longueur maximale de contexte
   */
  constructor(seq, maxCtx) {
    this.maxCtx = maxCtx;
    this.levels = [];                       // levels[k] : contexte de longueur k
    for (let k = 0; k <= maxCtx; k++) this.levels.push(new Map());
    this.vocab = new Set(seq);
    this.V = Math.max(this.vocab.size, 1);
    this.tokens = seq.length;

    // --- comptes bruts, tous ordres ---
    const key = arr => arr.join(SEP);
    for (let i = 0; i < seq.length; i++) {
      for (let k = 0; k <= maxCtx; k++) {
        if (i - k < 0) continue;
        const ctx = key(seq.slice(i - k, i));
        let node = this.levels[k].get(ctx);
        if (!node) { node = { total: 0, counts: new Map() }; this.levels[k].set(ctx, node); }
        node.total++;
        node.counts.set(seq[i], (node.counts.get(seq[i]) || 0) + 1);
      }
    }

    // Les comptes bruts sont conservés : ils servent aux approximations
    // successives de Shannon (§3), qui tirent selon les fréquences
    // empiriques observées et non selon une distribution lissée.
    this.raw = this.levels.slice();

    // --- comptes de continuation pour les ordres inférieurs ---
    // N₁₊(• ctx w) = nombre de symboles distincts précédant (ctx, w)
    for (let k = maxCtx; k > 0; k--) {
      const lower = new Map();
      for (const [ctx, node] of this.levels[k]) {
        const parts = ctx === '' ? [] : ctx.split(SEP);
        const sub = key(parts.slice(1));     // on retire le symbole le plus ancien
        let n = lower.get(sub);
        if (!n) { n = { total: 0, counts: new Map() }; lower.set(sub, n); }
        for (const w of node.counts.keys()) {
          n.counts.set(w, (n.counts.get(w) || 0) + 1);
          n.total++;
        }
      }
      this.levels[k - 1] = lower;            // remplace les comptes bruts
    }

    // --- statistiques de comptes par niveau (pour les remises δ) ---
    this.D = [];
    for (let k = 0; k <= maxCtx; k++) {
      const cc = [0, 0, 0, 0, 0];            // n1..n4
      for (const node of this.levels[k].values()) {
        for (const c of node.counts.values()) if (c <= 4) cc[c]++;
      }
      const [, n1, n2, n3, n4] = cc;
      const Y = n1 + 2 * n2 > 0 ? n1 / (n1 + 2 * n2) : 0.5;
      const clamp = (v, hi) => Math.min(Math.max(v, 0), hi);
      this.D.push([
        0,
        n1 > 0 ? clamp(1 - 2 * Y * n2 / n1, 1) : 0.5,
        n2 > 0 ? clamp(2 - 3 * Y * n3 / n2, 2) : 0.75,
        n3 > 0 ? clamp(3 - 4 * Y * n4 / n3, 3) : 1.0
      ]);
      // pré-calcul de N1, N2, N3+ par contexte (pour le poids d'interpolation γ)
      for (const node of this.levels[k].values()) {
        let a = 0, b = 0, c3 = 0;
        for (const c of node.counts.values()) {
          if (c === 1) a++; else if (c === 2) b++; else c3++;
        }
        node.n1 = a; node.n2 = b; node.n3 = c3;
      }
    }
  }

  discount(k, c) {
    const d = this.D[k];
    return c >= 3 ? d[3] : c === 2 ? d[2] : d[1];
  }

  /** γ : masse de probabilité renvoyée vers l'ordre inférieur. */
  gamma(k, node) {
    const d = this.D[k];
    return (d[1] * node.n1 + d[2] * node.n2 + d[3] * node.n3) / node.total;
  }

  /** P(sym | ctx) — interpolation récursive jusqu'à l'uniforme. */
  prob(ctxArr, sym, order = this.maxCtx) {
    const k = Math.min(order, this.maxCtx, ctxArr.length);
    return this._p(ctxArr.slice(ctxArr.length - k), sym, k);
  }

  _p(ctxArr, sym, k) {
    if (k <= 0) {
      const node = this.levels[0].get('');
      if (!node || node.total === 0) return 1 / this.V;
      const c = node.counts.get(sym) || 0;
      const d = this.discount(0, c);
      return Math.max(c - d, 0) / node.total + this.gamma(0, node) / this.V;
    }
    const node = this.levels[k].get(ctxArr.join(SEP));
    if (!node || node.total === 0) return this._p(ctxArr.slice(1), sym, k - 1);
    const c = node.counts.get(sym) || 0;
    const d = this.discount(k, c);
    return Math.max(c - d, 0) / node.total + this.gamma(k, node) * this._p(ctxArr.slice(1), sym, k - 1);
  }

  /** Distribution complète P(· | ctx) sur le vocabulaire. */
  dist(ctxArr, order = this.maxCtx) {
    const out = new Map();
    for (const w of this.vocab) out.set(w, this.prob(ctxArr, w, order));
    return out;
  }

  /**
   * Distribution empirique brute P̂(· | ctx) au sens de Shannon (§3) :
   * fréquences observées au plus long contexte disponible, avec repli
   * sur un contexte plus court si celui-ci n'a jamais été rencontré.
   * C'est la procédure exacte des « approximations successives ».
   */
  mleDist(ctxArr, order = this.maxCtx) {
    for (let k = Math.min(order, this.maxCtx, ctxArr.length); k >= 0; k--) {
      const node = this.raw[k].get(ctxArr.slice(ctxArr.length - k).join(SEP));
      if (node && node.total > 0) {
        const out = new Map();
        for (const [w, c] of node.counts) out.set(w, c / node.total);
        return out;
      }
    }
    const out = new Map();
    for (const w of this.vocab) out.set(w, 1 / this.V);
    return out;
  }

  /** Entropie croisée en bits/symbole d'une suite, sous ce modèle. */
  crossEntropy(seq, order = this.maxCtx) {
    if (!seq.length) return { bits: 0, perSymbol: 0, n: 0 };
    let bits = 0;
    for (let i = 0; i < seq.length; i++) {
      const ctx = seq.slice(Math.max(0, i - order), i);
      bits += -Math.log2(Math.max(this.prob(ctx, seq[i], order), 1e-12));
    }
    return { bits, perSymbol: bits / seq.length, n: seq.length };
  }
}

/* ============================================================
   Instances par langue (construites à la demande, mises en cache)
   ============================================================ */

const CACHE = new Map();
const cacheKey = (...a) => a.join('|');

function script(lang) { return LANGUAGES[lang] ? LANGUAGES[lang].script : 'latin'; }

/** Suite de caractères d'apprentissage, éventuellement tronquée (courbe d'apprentissage). */
export function trainChars(lang, fraction = 1) {
  const full = normalize(TRAIN[lang], script(lang));
  return fraction >= 1 ? full : full.slice(0, Math.max(60, Math.floor(full.length * fraction)));
}
export const testChars = lang => normalize(TEST[lang], script(lang));

export function charModel(lang, order = MAX_CTX, fraction = 1) {
  const key = cacheKey('c', lang, order, fraction);
  if (!CACHE.has(key)) CACHE.set(key, new KN([...trainChars(lang, fraction)], order));
  return CACHE.get(key);
}

export function wordModel(lang, order = WORD_CTX, fraction = 1) {
  const key = cacheKey('w', lang, order, fraction);
  if (!CACHE.has(key)) {
    const words = trainChars(lang, fraction).split(' ').filter(Boolean);
    CACHE.set(key, new KN(words, order));
  }
  return CACHE.get(key);
}

/* ============================================================
   NIVEAU CARACTÈRE
   ============================================================ */

/** Prédictions ordonnées pour la suite d'un contexte. */
export function predictChar(lang, rawCtx, order = MAX_CTX, topK = 8) {
  const m = charModel(lang, MAX_CTX);
  const s = normalize(rawCtx, script(lang));
  const ctx = [...(s + (/\s$/.test(rawCtx) && s ? ' ' : ''))];
  const dist = m.dist(ctx.slice(-order), order);
  const ranked = [...dist.entries()].sort((a, b) => b[1] - a[1]);
  let H = 0;
  for (const [, p] of ranked) if (p > 0) H -= p * Math.log2(p);
  return { top: ranked.slice(0, topK).map(([ch, p]) => ({ ch, p })), all: ranked, entropy: H };
}

/** Analyse caractère par caractère : bits, rang, prédiction attendue. */
export function scoreChars(lang, rawText, order = MAX_CTX) {
  const m = charModel(lang, MAX_CTX);
  const seq = [...normalize(rawText, script(lang))];
  if (!seq.length) return { chars: [], entropy: 0, perplexity: 1, top1: 0, top3: 0, totalBits: 0 };
  const chars = [];
  let bits = 0, hit1 = 0, hit3 = 0;
  for (let i = 0; i < seq.length; i++) {
    const ctx = seq.slice(Math.max(0, i - order), i);
    const dist = m.dist(ctx, order);
    const ranked = [...dist.entries()].sort((a, b) => b[1] - a[1]);
    let rank = ranked.length, p = 1e-9;
    for (let r = 0; r < ranked.length; r++) if (ranked[r][0] === seq[i]) { rank = r + 1; p = ranked[r][1]; break; }
    const b = -Math.log2(p);
    bits += b;
    if (rank === 1) hit1++;
    if (rank <= 3) hit3++;
    chars.push({ ch: seq[i], bits: b, rank, p, top: ranked.slice(0, 3).map(([ch, q]) => ({ ch, p: q })) });
  }
  const n = chars.length;
  return { chars, entropy: bits / n, perplexity: 2 ** (bits / n), top1: hit1 / n, top3: hit3 / n, totalBits: bits };
}

/** Rang du caractère cible (jeu de devinette de Shannon 1951). */
export function rankOfChar(lang, rawCtx, target, order = MAX_CTX) {
  const { all } = predictChar(lang, rawCtx, order, 1);
  for (let i = 0; i < all.length; i++) if (all[i][0] === target) return i + 1;
  return all.length + 1;
}

/* --- échantillonnage --- */
function sampleFrom(entries, { temperature = 1, topK = 0, topP = 1 } = {}) {
  let list = entries.map(([s, p]) => [s, p]);
  if (temperature !== 1) {
    const t = Math.max(temperature, 0.01);
    list = list.map(([s, p]) => [s, Math.exp(Math.log(Math.max(p, 1e-12)) / t)]);
  }
  list.sort((a, b) => b[1] - a[1]);
  if (topK > 0) list = list.slice(0, topK);
  if (topP < 1) {
    const tot = list.reduce((s, x) => s + x[1], 0) || 1;
    let acc = 0; const keep = [];
    for (const x of list) { keep.push(x); acc += x[1] / tot; if (acc >= topP) break; }
    list = keep;
  }
  const tot = list.reduce((s, x) => s + x[1], 0) || 1;
  let r = Math.random() * tot;
  for (const [s, p] of list) { r -= p; if (r <= 0) return s; }
  return list.length ? list[list.length - 1][0] : ' ';
}

/**
 * Approximation d'ordre n de la langue (Shannon §3).
 * Par défaut on tire selon les fréquences empiriques, exactement comme
 * Shannon le faisait en ouvrant un livre au hasard et en relevant la
 * lettre qui suivait le contexte cherché. L'option `smooth` utilise à
 * la place la distribution lissée du modèle.
 */
export function generateChars(lang, order, length = 200, seed = '', opts = {}) {
  const m = charModel(lang, MAX_CTX);
  const ctx = [...normalize(seed, script(lang))];
  let out = '';
  for (let i = 0; i < length; i++) {
    const dist = opts.smooth ? m.dist(ctx.slice(-order), order) : m.mleDist(ctx, order);
    const ch = sampleFrom([...dist.entries()], opts);
    out += ch;
    ctx.push(ch);
  }
  return out.replace(/\s+/g, ' ').trim();
}

/* ============================================================
   NIVEAU MOT — prédire le mot suivant, comme un modèle de langue
   ============================================================ */

/* Vraisemblance orthographique d'un mot inconnu, fournie par le
   modèle de caractères : P(m) = Π P(cᵢ | c₁…cᵢ₋₁) · P(espace | …).
   C'est le repli hors vocabulaire — l'équivalent artisanal de la
   tokenisation en sous-mots des modèles modernes. */
const SPELL = new Map();
export function spellingProb(lang, word) {
  const key = lang + '|' + word;
  if (SPELL.has(key)) return SPELL.get(key);
  const m = charModel(lang, MAX_CTX);
  const seq = [...(word + ' ')];
  let logp = 0;
  const ctx = [' '];
  for (const ch of seq) {
    logp += Math.log2(Math.max(m.prob(ctx.slice(-MAX_CTX), ch, MAX_CTX), 1e-12));
    ctx.push(ch);
  }
  const p = 2 ** logp;
  SPELL.set(key, p);
  return p;
}

/** Masse totale réservée aux mots hors vocabulaire (estimateur de Good–Turing). */
function oovMass(lang) {
  const wm = wordModel(lang);
  const uni = wm.levels[0].get('');
  if (!uni) return 0.05;
  let n1 = 0;
  for (const c of uni.counts.values()) if (c === 1) n1++;
  return Math.min(0.5, Math.max(0.01, n1 / Math.max(uni.total, 1)));
}

/**
 * Distribution du mot suivant.
 * @param {string} lang
 * @param {string} rawCtx    texte précédent
 * @param {string} prefix    début du mot en cours de frappe (complétion contrainte)
 * @returns {{ranked, entropy, contextWords, levels, oov}}
 */
export function predictWord(lang, rawCtx, topK = 8, prefix = '') {
  const wm = wordModel(lang);
  const sc = script(lang);
  const ctxWords = tokenize(rawCtx, sc);
  const ctx = ctxWords.slice(-WORD_CTX);
  const pre = normalize(prefix, sc).replace(/\s/g, '');

  const ranked = [];
  for (const w of wm.vocab) {
    if (pre && !w.startsWith(pre)) continue;
    ranked.push({ word: w, p: wm.prob(ctx, w, WORD_CTX) });
  }
  // renormalisation si un préfixe restreint le support
  const mass = ranked.reduce((s, x) => s + x.p, 0);
  if (pre && mass > 0) ranked.forEach(x => { x.p /= mass; });

  // quel niveau de contexte explique la prédiction ?
  const nodeTri = ctx.length >= 2 ? wm.levels[2].get(ctx.slice(-2).join(SEP)) : null;
  const nodeBi = ctx.length >= 1 ? wm.levels[1].get(ctx.slice(-1).join(SEP)) : null;
  for (const x of ranked) {
    x.level = nodeTri && nodeTri.counts.get(x.word) ? 'tri'
      : nodeBi && nodeBi.counts.get(x.word) ? 'bi' : 'uni';
    x.count = nodeTri && nodeTri.counts.get(x.word) || nodeBi && nodeBi.counts.get(x.word) || 0;
  }

  ranked.sort((a, b) => b.p - a.p);
  let H = 0;
  for (const x of ranked) if (x.p > 0) H -= x.p * Math.log2(x.p);

  return {
    ranked: ranked.slice(0, topK),
    all: ranked,
    entropy: H,
    contextWords: ctx,
    oov: oovMass(lang),
    levels: {
      tri: { weight: nodeTri ? 1 - wm.gamma(2, nodeTri) : 0, seen: nodeTri ? nodeTri.total : 0, types: nodeTri ? nodeTri.counts.size : 0 },
      bi: { weight: nodeBi ? 1 - wm.gamma(1, nodeBi) : 0, seen: nodeBi ? nodeBi.total : 0, types: nodeBi ? nodeBi.counts.size : 0 },
      uni: { weight: 1, seen: wm.tokens, types: wm.vocab.size }
    }
  };
}

/** P(mot | contexte) y compris hors vocabulaire (repli orthographique). */
export function wordProb(lang, ctxWords, word) {
  const wm = wordModel(lang);
  if (wm.vocab.has(word)) return wm.prob(ctxWords.slice(-WORD_CTX), word, WORD_CTX) * (1 - oovMass(lang));
  return oovMass(lang) * Math.max(spellingProb(lang, word), 1e-12);
}

/** Analyse mot à mot : bits, rang, mot attendu. */
export function scoreWords(lang, rawText) {
  const sc = script(lang);
  const words = tokenize(rawText, sc);
  const wm = wordModel(lang);
  const out = [];
  let bits = 0, hit1 = 0, hit5 = 0;
  for (let i = 0; i < words.length; i++) {
    const ctx = words.slice(Math.max(0, i - WORD_CTX), i);
    const p = wordProb(lang, ctx, words[i]);
    const b = -Math.log2(Math.max(p, 1e-12));
    bits += b;
    // rang parmi les candidats du vocabulaire
    let rank = 1;
    const pi = wm.vocab.has(words[i]) ? wm.prob(ctx, words[i], WORD_CTX) : -1;
    let best = null, bestP = -1;
    for (const w of wm.vocab) {
      const q = wm.prob(ctx, w, WORD_CTX);
      if (q > pi) rank++;
      if (q > bestP) { bestP = q; best = w; }
    }
    if (rank === 1) hit1++;
    if (rank <= 5) hit5++;
    out.push({ word: words[i], bits: b, rank, p, best, oov: !wm.vocab.has(words[i]) });
  }
  const n = Math.max(words.length, 1);
  return { words: out, bitsPerWord: bits / n, perplexity: 2 ** (bits / n), top1: hit1 / n, top5: hit5 / n, totalBits: bits };
}

/**
 * Génération mot à mot — le geste exact d'un modèle de langue :
 * échantillonner P(mot suivant | contexte), ajouter le mot au contexte,
 * recommencer. `order` = 0 (mots indépendants), 1 (bigrammes) ou 2
 * (trigrammes) reproduit les approximations de mots de Shannon (§3).
 */
export function generateWords(lang, count = 24, seed = '', opts = {}) {
  const wm = wordModel(lang);
  const order = opts.order === undefined ? WORD_CTX : opts.order;
  let ctx = tokenize(seed, script(lang)).slice(-WORD_CTX);
  const out = [];
  for (let i = 0; i < count; i++) {
    const dist = opts.smooth ? wm.dist(ctx.slice(-order), order) : wm.mleDist(ctx, order);
    const w = sampleFrom([...dist.entries()], opts);
    out.push(w);
    ctx = [...ctx, w].slice(-WORD_CTX);
  }
  return out.join(' ');
}

/* ============================================================
   MESURES GLOBALES
   ============================================================ */

/**
 * Fₙ : entropie conditionnelle du caractère suivant sachant les n
 * précédents (Shannon §7, théorème 6), estimée à la fois sur le
 * texte d'apprentissage et sur un texte inédit. L'écart entre les
 * deux courbes EST le surapprentissage.
 */
export function fnCurve(lang) {
  const key = cacheKey('fn', lang);
  if (CACHE.has(key)) return CACHE.get(key);
  const m = charModel(lang, MAX_CTX);
  const train = [...trainChars(lang)];
  const test = [...testChars(lang)];
  const V = m.V;
  // Shannon numérote F₀ = log₂ V (symboles équiprobables), F₁ = fréquences
  // des lettres, F₂ = digrammes… Fₙ utilise donc n−1 lettres de contexte.
  const out = [{ ctx: -1, F: 0, train: Math.log2(V), test: Math.log2(V), equiprobable: true }];
  for (let order = 0; order <= MAX_CTX; order++) {
    out.push({
      ctx: order,
      F: order + 1,
      train: m.crossEntropy(train.slice(0, 2500), order).perSymbol,
      test: m.crossEntropy(test, order).perSymbol
    });
  }
  CACHE.set(key, out);
  return out;
}

/**
 * Courbe d'apprentissage : entropie croisée sur texte inédit en
 * fonction de la quantité de texte d'apprentissage. C'est la
 * version miniature des lois d'échelle des modèles de langue.
 */
export function learningCurve(lang, order = MAX_CTX) {
  const key = cacheKey('lc', lang, order);
  if (CACHE.has(key)) return CACHE.get(key);
  const test = [...testChars(lang)];
  const fractions = [0.02, 0.05, 0.1, 0.2, 0.35, 0.55, 0.75, 1];
  const out = fractions.map(f => {
    const m = charModel(lang, order, f);
    return { chars: trainChars(lang, f).length, entropy: m.crossEntropy(test, order).perSymbol };
  });
  CACHE.set(key, out);
  return out;
}

/** Entropie d'ordre 0 et 1 d'après les fréquences de lettres du corpus. */
export function letterStats(lang) {
  const s = trainChars(lang);
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);
  const n = s.length;
  const rows = [...counts.entries()].map(([ch, c]) => ({ ch, c, p: c / n, bits: -Math.log2(c / n) }))
    .sort((a, b) => b.p - a.p);
  const F1 = rows.reduce((h, r) => h - r.p * Math.log2(r.p), 0);
  return { rows, F1, F0: Math.log2(counts.size), V: counts.size, n };
}

/** Statistiques du vocabulaire. */
export function vocabStats(lang) {
  const wm = wordModel(lang);
  const uni = wm.levels[0].get('');
  const rows = [...uni.counts.entries()].sort((a, b) => b[1] - a[1]);
  return { types: wm.vocab.size, tokens: wm.tokens, top: rows.slice(0, 10).map(([w, c]) => ({ word: w, count: c })) };
}
