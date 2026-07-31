import { charModel, normalize, MAX_CTX, letterStats } from './model.js';
import { LANGUAGES } from './data.js';

/* ============================================================
   CODAGE — vérifier expérimentalement la limite de Shannon
   ------------------------------------------------------------
   Théorème 9 (§9) : on peut coder une source d'entropie H en
   H bits/symbole en moyenne, et pas moins. Le paragraphe §9
   construit même le code : classer les messages par probabilité
   décroissante et donner au message s un mot de code de
   longueur mₛ telle que  log₂(1/pₛ) ≤ mₛ < 1 + log₂(1/pₛ).

   On implémente ici deux codeurs réels :

     • Huffman — code préfixe optimal symbole par symbole.
       Longueur moyenne garantie dans [H, H+1).

     • Codage arithmétique — code le message entier comme un seul
       nombre dans [0,1). Il atteint −log₂ P(message) bits à
       deux bits près, donc l'entropie exacte du modèle, et
       accepte des probabilités qui changent à chaque caractère.
       C'est le seul moyen d'exploiter un modèle contextuel.

   Le test décisif : compresser un texte avec le modèle n-gramme,
   puis le décompresser et vérifier qu'on retrouve l'original.
   ============================================================ */

/* ============================================================
   1. Code de Huffman
   ============================================================ */

/**
 * @param {Array<{sym:string,p:number}>} dist
 * @returns {{codes:Map<string,string>, avgLen:number, H:number, tree:object}}
 */
export function huffman(dist) {
  const items = dist.filter(d => d.p > 0);
  if (items.length === 0) return { codes: new Map(), avgLen: 0, H: 0 };
  if (items.length === 1) return { codes: new Map([[items[0].sym, '0']]), avgLen: 1, H: 0 };

  let nodes = items.map(d => ({ sym: d.sym, p: d.p, leaf: true }));
  const all = [...nodes];
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.p - b.p);
    const a = nodes.shift(), b = nodes.shift();
    const parent = { p: a.p + b.p, left: a, right: b, leaf: false };
    all.push(parent);
    nodes.push(parent);
  }
  const root = nodes[0];

  const codes = new Map();
  (function walk(n, prefix) {
    if (n.leaf) { codes.set(n.sym, prefix || '0'); return; }
    walk(n.left, prefix + '0');
    walk(n.right, prefix + '1');
  })(root, '');

  let avgLen = 0, H = 0;
  for (const d of items) {
    avgLen += d.p * codes.get(d.sym).length;
    H -= d.p * Math.log2(d.p);
  }
  return { codes, avgLen, H, root };
}

/** L'exemple du §10 : A,B,C,D de probabilités 1/2, 1/4, 1/8, 1/8 → H = 7/4. */
export const SHANNON_EXAMPLE = [
  { sym: 'A', p: 1 / 2 }, { sym: 'B', p: 1 / 4 },
  { sym: 'C', p: 1 / 8 }, { sym: 'D', p: 1 / 8 }
];

/** Code de Huffman sur les lettres d'une langue (modèle d'ordre 1). */
export function letterCode(lang) {
  const { rows, F1, F0 } = letterStats(lang);
  const h = huffman(rows.map(r => ({ sym: r.ch, p: r.p })));
  return { ...h, rows, F1, F0 };
}

/* ============================================================
   2. Codage arithmétique (Witten–Neal–Cleary)
   ------------------------------------------------------------
   Entiers 32 bits, fréquences cumulées quantifiées sur TOT.
   Le décodeur reconstruit exactement la même distribution que
   l'encodeur, puisqu'elle ne dépend que des symboles déjà connus.
   ============================================================ */

const BITS = 32;
const TOP = 2 ** BITS;
const HALF = TOP / 2;
const QUARTER = TOP / 4;
const TOT_BITS = 14;
const TOT = 2 ** TOT_BITS;          // somme des fréquences quantifiées

/** Quantifie une distribution en fréquences entières (chacune ≥ 1). */
function quantize(entries) {
  const n = entries.length;
  const freqs = new Array(n);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    freqs[i] = Math.max(1, Math.floor(entries[i][1] * (TOT - n)));
    sum += freqs[i];
  }
  // ajustement pour retomber exactement sur TOT
  let d = TOT - sum;
  let i = 0;
  while (d !== 0) {
    const j = i % n;
    if (d > 0) { freqs[j]++; d--; }
    else if (freqs[j] > 1) { freqs[j]--; d++; }
    i++;
    if (i > 40 * n) break;
  }
  const cum = new Array(n + 1);
  cum[0] = 0;
  for (let k = 0; k < n; k++) cum[k + 1] = cum[k] + freqs[k];
  return { freqs, cum, total: cum[n] };
}

class BitOut {
  constructor() { this.bytes = []; this.cur = 0; this.nb = 0; }
  bit(b) {
    this.cur = (this.cur << 1) | b;
    if (++this.nb === 8) { this.bytes.push(this.cur & 255); this.cur = 0; this.nb = 0; }
  }
  bitPlus(b, pending) { this.bit(b); for (; pending > 0; pending--) this.bit(b ? 0 : 1); }
  finish() { while (this.nb) this.bit(0); return Uint8Array.from(this.bytes); }
}

class BitIn {
  constructor(bytes) { this.b = bytes; this.i = 0; this.nb = 0; this.cur = 0; }
  bit() {
    if (this.nb === 0) { this.cur = this.i < this.b.length ? this.b[this.i++] : 0; this.nb = 8; }
    this.nb--;
    return (this.cur >> this.nb) & 1;
  }
}

/**
 * Encode une suite de symboles.
 * @param {string[]} seq
 * @param {(i:number, prev:string[]) => Array<[string,number]>} distFn
 *        distribution du symbole i connaissant les précédents
 */
export function arithmeticEncode(seq, distFn) {
  const out = new BitOut();
  let low = 0, high = TOP - 1, pending = 0;

  for (let i = 0; i < seq.length; i++) {
    const entries = distFn(i, seq.slice(0, i));
    const idx = entries.findIndex(e => e[0] === seq[i]);
    if (idx < 0) throw new Error('symbole hors alphabet : ' + JSON.stringify(seq[i]));
    const { cum, total } = quantize(entries);

    const range = high - low + 1;
    high = low + Math.floor(range * cum[idx + 1] / total) - 1;
    low = low + Math.floor(range * cum[idx] / total);

    for (;;) {
      if (high < HALF) { out.bitPlus(0, pending); pending = 0; }
      else if (low >= HALF) { out.bitPlus(1, pending); pending = 0; low -= HALF; high -= HALF; }
      else if (low >= QUARTER && high < 3 * QUARTER) { pending++; low -= QUARTER; high -= QUARTER; }
      else break;
      low = low * 2;
      high = high * 2 + 1;
    }
  }
  pending++;
  if (low < QUARTER) out.bitPlus(0, pending); else out.bitPlus(1, pending);
  return out.finish();
}

/** Décode `n` symboles produits par arithmeticEncode avec la même distFn. */
export function arithmeticDecode(bytes, n, distFn) {
  const inp = new BitIn(bytes);
  let low = 0, high = TOP - 1, value = 0;
  for (let i = 0; i < BITS; i++) value = value * 2 + inp.bit();

  const seq = [];
  for (let i = 0; i < n; i++) {
    const entries = distFn(i, seq);
    const { cum, total } = quantize(entries);

    const range = high - low + 1;
    const target = Math.floor(((value - low + 1) * total - 1) / range);
    let idx = 0;
    while (cum[idx + 1] <= target) idx++;

    seq.push(entries[idx][0]);
    high = low + Math.floor(range * cum[idx + 1] / total) - 1;
    low = low + Math.floor(range * cum[idx] / total);

    for (;;) {
      if (high < HALF) { /* rien */ }
      else if (low >= HALF) { low -= HALF; high -= HALF; value -= HALF; }
      else if (low >= QUARTER && high < 3 * QUARTER) { low -= QUARTER; high -= QUARTER; value -= QUARTER; }
      else break;
      low = low * 2;
      high = high * 2 + 1;
      value = value * 2 + inp.bit();
    }
  }
  return seq;
}

/* ============================================================
   3. Compression d'un texte par le modèle de langue
   ============================================================ */

/**
 * Compresse un texte avec le modèle n-gramme d'ordre donné, puis
 * le décompresse pour vérifier l'identité. Renvoie les tailles
 * réelles obtenues et les points de comparaison.
 */
export function compress(lang, rawText, order = MAX_CTX) {
  const sc = LANGUAGES[lang] ? LANGUAGES[lang].script : 'latin';
  const text = normalize(rawText, sc);
  const seq = [...text];
  if (!seq.length) return null;

  const m = charModel(lang, MAX_CTX);
  const alphabet = [...m.vocab].sort();
  // tout symbole du texte doit exister dans l'alphabet du modèle
  for (const ch of seq) if (!m.vocab.has(ch)) return { unsupported: ch };

  const distFn = (i, prev) => {
    const ctx = prev.slice(Math.max(0, prev.length - order));
    return alphabet.map(s => [s, m.prob(ctx, s, order)]);
  };

  const t0 = performance.now();
  const bytes = arithmeticEncode(seq, distFn);
  const decoded = arithmeticDecode(bytes, seq.length, distFn).join('');
  const ms = performance.now() - t0;

  // longueur idéale : −Σ log₂ P (ce que le codeur doit approcher à 2 bits près)
  let ideal = 0;
  for (let i = 0; i < seq.length; i++) {
    const ctx = seq.slice(Math.max(0, i - order), i);
    ideal += -Math.log2(Math.max(m.prob(ctx, seq[i], order), 1e-12));
  }

  return {
    text, n: seq.length,
    bytes, size: bytes.length,
    bitsPerChar: bytes.length * 8 / seq.length,
    idealBits: ideal,
    idealPerChar: ideal / seq.length,
    overhead: bytes.length * 8 - ideal,
    lossless: decoded === text,
    decoded,
    ms,
    // points de comparaison
    rawUtf8: new TextEncoder().encode(rawText).length,
    fixed27: Math.ceil(seq.length * Math.log2(m.V) / 8),
    order
  };
}

/** Taille réelle après gzip (référence : compresseur généraliste). */
export async function gzipSize(text) {
  if (typeof CompressionStream === 'undefined') return null;
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
  const buf = await new Response(stream).arrayBuffer();
  return buf.byteLength;
}

/* ============================================================
   4. Propriété d'équipartition asymptotique (théorème 3)
   ------------------------------------------------------------
   Presque toutes les suites longues émises par la source ont la
   même probabilité 2^(−NH) : ce sont les suites « typiques ».
   Leur nombre est 2^(NH), à comparer aux V^N suites possibles.
   C'est ce qui rend la compression possible : il suffit de
   numéroter les suites typiques.
   ============================================================ */

export function aep(lang, lengths = [10, 40, 160, 640], trials = 220, order = MAX_CTX) {
  const m = charModel(lang, MAX_CTX);
  const alphabet = [...m.vocab];
  const out = [];
  for (const N of lengths) {
    const vals = [];
    for (let t = 0; t < trials; t++) {
      const ctx = [];
      let bits = 0;
      for (let i = 0; i < N; i++) {
        const entries = alphabet.map(s => [s, m.prob(ctx.slice(-order), s, order)]);
        let r = Math.random(), pick = entries[entries.length - 1][0], p = 1;
        for (const [s, q] of entries) { r -= q; if (r <= 0) { pick = s; p = q; break; } }
        bits += -Math.log2(Math.max(p, 1e-12));
        ctx.push(pick);
      }
      vals.push(bits / N);
    }
    vals.sort((a, b) => a - b);
    const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
    const sd = Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length);
    out.push({ N, vals, mean, sd, min: vals[0], max: vals[vals.length - 1] });
  }
  // L'entropie de la source est la limite de ces moyennes (théorème 3).
  const H = out[out.length - 1].mean;
  return { curves: out, V: m.V, H };
}
