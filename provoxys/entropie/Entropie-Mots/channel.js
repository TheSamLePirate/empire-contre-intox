import { charModel, normalize, MAX_CTX } from './model.js';
import { LANGUAGES } from './data.js';

/* ============================================================
   CANAL BRUITÉ — Partie II du papier de Shannon
   ------------------------------------------------------------
   On envoie un texte à travers un canal qui remplace chaque
   symbole par un autre avec probabilité p (canal symétrique à
   V entrées). Le récepteur ne voit que la sortie bruitée.

   Trois quantités, §12 :

     H(p) = −p log p − (1−p) log(1−p)          entropie binaire
     H_y(x) = H(p) + p·log₂(V−1)               équivocation
     C = log₂ V − H_y(x)                       capacité du canal

   L'équivocation est l'information perdue : ce qui manque au
   récepteur pour reconstituer l'entrée. Shannon montre (théorème
   10) qu'un canal auxiliaire de capacité H_y(x) suffirait à
   corriger toutes les erreurs.

   Ici, aucun canal auxiliaire : c'est la REDONDANCE de la langue
   qui joue ce rôle. Le décodeur cherche la suite x qui maximise

       log P_langue(x) + log P(y | x)

   c'est-à-dire le compromis entre « ce texte est plausible » et
   « ce texte ressemble à ce que j'ai reçu ». C'est exactement le
   modèle source-canal utilisé en reconnaissance vocale et en
   traduction automatique — et l'ancêtre direct de la correction
   automatique des modèles de langue actuels.
   ============================================================ */

const log2 = x => Math.log2(x);
export const binaryEntropy = p =>
  p <= 0 || p >= 1 ? 0 : -p * log2(p) - (1 - p) * log2(1 - p);

/** Équivocation et capacité d'un canal symétrique à V symboles. */
export function channelInfo(p, V) {
  const equivocation = p <= 0 ? 0 : binaryEntropy(p) + p * log2(V - 1);
  return {
    p, V,
    inputEntropy: log2(V),
    equivocation,
    capacity: Math.max(0, log2(V) - equivocation)
  };
}

/** Applique le bruit : chaque symbole est remplacé avec probabilité p. */
export function transmit(seq, p, alphabet, rand = Math.random) {
  const out = [];
  const flips = [];
  for (let i = 0; i < seq.length; i++) {
    if (rand() < p) {
      let c = alphabet[Math.floor(rand() * alphabet.length)];
      if (c === seq[i]) c = alphabet[(alphabet.indexOf(c) + 1) % alphabet.length];
      out.push(c);
      flips.push(i);
    } else out.push(seq[i]);
  }
  return { out, flips };
}

/**
 * Décodage par recherche en faisceau (beam search).
 * Maximise  Σ log P_langue(xᵢ | x₁..xᵢ₋₁) + log P(yᵢ | xᵢ).
 *
 * @param {string} lang
 * @param {string[]} received  suite reçue
 * @param {number} p           probabilité d'erreur supposée
 * @param {number} beam        largeur du faisceau
 */
export function decode(lang, received, p, beam = 48, order = MAX_CTX) {
  const m = charModel(lang, MAX_CTX);
  const alphabet = [...m.vocab].sort();
  const V = alphabet.length;
  const logStay = log2(1 - p);
  const logFlip = p > 0 ? log2(p / (V - 1)) : -60;

  let paths = [{ seq: [], score: 0 }];
  for (let i = 0; i < received.length; i++) {
    const y = received[i];
    const next = [];
    for (const path of paths) {
      const ctx = path.seq.slice(Math.max(0, path.seq.length - order));
      // on ne teste que les candidats crédibles : les plus probables
      // selon la langue, plus le symbole effectivement reçu
      const cand = alphabet
        .map(s => ({ s, lp: log2(Math.max(m.prob(ctx, s, order), 1e-12)) }))
        .sort((a, b) => b.lp - a.lp)
        .slice(0, 12);
      if (!cand.some(c => c.s === y)) {
        cand.push({ s: y, lp: log2(Math.max(m.prob(ctx, y, order), 1e-12)) });
      }
      for (const c of cand) {
        next.push({
          seq: [...path.seq, c.s],
          score: path.score + c.lp + (c.s === y ? logStay : logFlip)
        });
      }
    }
    next.sort((a, b) => b.score - a.score);
    // on ne garde qu'un chemin par contexte récent (fusion des états)
    const seen = new Set();
    paths = [];
    for (const n of next) {
      const key = n.seq.slice(-order).join('');
      if (seen.has(key)) continue;
      seen.add(key);
      paths.push(n);
      if (paths.length >= beam) break;
    }
  }
  return paths[0] ? paths[0].seq : received.slice();
}

/**
 * Expérience complète : transmission bruitée puis restauration.
 * Renvoie de quoi afficher les trois textes et les taux d'erreur.
 */
export function experiment(lang, rawText, p, opts = {}) {
  const sc = LANGUAGES[lang] ? LANGUAGES[lang].script : 'latin';
  const source = [...normalize(rawText, sc)];
  const m = charModel(lang, MAX_CTX);
  const alphabet = [...m.vocab].sort();
  if (!source.length) return null;

  const { out: received, flips } = transmit(source, p, alphabet, opts.rand);
  const repaired = decode(lang, received, p, opts.beam || 48);

  const errBefore = received.reduce((n, c, i) => n + (c !== source[i] ? 1 : 0), 0);
  const errAfter = repaired.reduce((n, c, i) => n + (c !== source[i] ? 1 : 0), 0);
  const info = channelInfo(p, alphabet.length);

  return {
    source: source.join(''),
    received: received.join(''),
    repaired: repaired.join(''),
    flips,
    n: source.length,
    errBefore, errAfter,
    rateBefore: errBefore / source.length,
    rateAfter: errAfter / source.length,
    recovered: errBefore ? (errBefore - errAfter) / errBefore : 1,
    ...info
  };
}

/**
 * Effacement plutôt que substitution : Shannon note (§7) que si l'on
 * peut restaurer un texte anglais dont 50 % des lettres ont été
 * supprimées, sa redondance dépasse 50 %. On reproduit l'expérience.
 */
export function eraseAndRestore(lang, rawText, fraction, opts = {}) {
  const sc = LANGUAGES[lang] ? LANGUAGES[lang].script : 'latin';
  const source = [...normalize(rawText, sc)];
  const m = charModel(lang, MAX_CTX);
  const alphabet = [...m.vocab].sort();
  const rand = opts.rand || Math.random;

  const kept = source.map(() => rand() >= fraction);
  const masked = source.map((c, i) => (kept[i] ? c : '·'));

  // faisceau : à chaque position effacée, tous les symboles sont possibles
  let paths = [{ seq: [], score: 0 }];
  const order = MAX_CTX;
  for (let i = 0; i < source.length; i++) {
    const next = [];
    for (const path of paths) {
      const ctx = path.seq.slice(Math.max(0, path.seq.length - order));
      if (kept[i]) {
        next.push({ seq: [...path.seq, source[i]], score: path.score + log2(Math.max(m.prob(ctx, source[i], order), 1e-12)) });
      } else {
        const cand = alphabet
          .map(s => ({ s, lp: log2(Math.max(m.prob(ctx, s, order), 1e-12)) }))
          .sort((a, b) => b.lp - a.lp).slice(0, 10);
        for (const c of cand) next.push({ seq: [...path.seq, c.s], score: path.score + c.lp });
      }
    }
    next.sort((a, b) => b.score - a.score);
    const seen = new Set();
    paths = [];
    for (const n of next) {
      const key = n.seq.slice(-order).join('');
      if (seen.has(key)) continue;
      seen.add(key);
      paths.push(n);
      if (paths.length >= (opts.beam || 48)) break;
    }
  }
  const restored = paths[0] ? paths[0].seq : source;
  const erased = kept.filter(k => !k).length;
  let good = 0;
  for (let i = 0; i < source.length; i++) if (!kept[i] && restored[i] === source[i]) good++;

  return {
    source: source.join(''),
    masked: masked.join(''),
    restored: restored.join(''),
    kept,
    erased,
    correct: good,
    accuracy: erased ? good / erased : 1
  };
}
