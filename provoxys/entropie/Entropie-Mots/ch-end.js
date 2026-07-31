import { el, statCard, COLORS } from './ui.js';
import { LANGUAGES } from './data.js';
import { fnCurve, letterStats, vocabStats, normalize } from './model.js';
import { scoreSequence, coverage } from './predictor.js';
import { TEST } from './corpus.js';
import { store, nav } from './state.js';
import { refreshIcons } from './icons.js';

/* ============================================================
   CHAPITRE 9 — Ce que cette idée a rendu possible
   ============================================================ */

const APPS = [
  { icon: 'archive', color: COLORS.accent, title: 'Compression', text: 'ZIP, PNG, MP3 : coder les symboles fréquents sur peu de bits. La limite théorique est exactement l\'entropie de la source.' },
  { icon: 'spell-check', color: COLORS.ok, title: 'Correction orthographique', text: 'Un mot improbable dans son contexte est signalé. C\'est la surprise de Shannon qui souligne vos fautes en rouge.' },
  { icon: 'keyboard', color: COLORS.warn, title: 'Clavier prédictif', text: 'Votre téléphone propose le mot suivant avec un modèle n-gramme — celui du chapitre 5, en plus gros.' },
  { icon: 'lock', color: COLORS.violet, title: 'Cryptographie', text: 'Shannon a prouvé qu\'un chiffrement est parfait si le message chiffré n\'apporte aucune information sur le clair.' },
  { icon: 'radio', color: COLORS.hot, title: 'Codes correcteurs', text: 'Ajouter de la redondance choisie permet de transmettre sans erreur sur un canal bruité — du Wi-Fi aux sondes spatiales.' },
  { icon: 'brain-circuit', color: '#7fd4e8', title: 'Modèles de langage', text: 'Un LLM est entraîné à minimiser la surprise du token suivant. Sa métrique, la perplexité, vaut 2 puissance l\'entropie.' }
];

export function init() {
  el('endApps').innerHTML = APPS.map(a => `
    <div class="card p-5">
      <div class="w-8 h-8 rounded-lg grid place-items-center mb-3" style="background:${a.color}1f">
        <i data-lucide="${a.icon}" class="w-4 h-4" style="color:${a.color}"></i>
      </div>
      <h4 class="font-semibold text-sm mb-1.5">${a.title}</h4>
      <p class="text-xs leading-relaxed" style="color:var(--txt-2)">${a.text}</p>
    </div>`).join('');

  refresh();
  el('endRestart').addEventListener('click', () => nav.reset());
  el('endToAi').addEventListener('click', () => nav.go('ai'));
  refreshIcons();
}

/** Recalculé à chaque visite : les chiffres dépendent du parcours. */
export function refresh() {
  const fn = fnCurve(store.lang);
  const st = letterStats(store.lang);
  const F0 = st.F0, Fn = fn[fn.length - 1].test;
  const drop = Math.round((1 - Fn / F0) * 100);
  const g = store.session.guessHistory;
  const acc = g.length ? Math.round(g.filter(t => t === 1).length / g.length * 100) + '%' : '—';

  el('endStats').innerHTML =
    statCard(store.visited.size + ' / 11', 'chapitres parcourus', COLORS.accent) +
    statCard(F0.toFixed(2), `F₀ — ${LANGUAGES[store.lang].name} équiprobable`, COLORS.hot) +
    statCard(Fn.toFixed(2), 'F₇ — mesurée sur texte inédit', COLORS.ok) +
    statCard(drop + '%', 'd\'incertitude en moins', COLORS.violet) +
    statCard(store.session.lastEntropy ? store.session.lastEntropy.toFixed(2) : '—', 'entropie de votre texte', COLORS.txt2) +
    statCard(acc, 'vos lettres du 1ᵉʳ coup', COLORS.warn) +
    statCard(g.length || '—', 'lettres devinées', COLORS.txt2) +
    statCard(vocabStats(store.lang).types, 'mots au vocabulaire', COLORS.txt2);
  const sc = store.lang === 'ru' ? 'cyrillic' : 'latin';
  const nChars = Math.max(normalize(TEST[store.lang], sc).length, 1);
  const bpc = scoreSequence(store.lang, TEST[store.lang]).totalBits / nChars;
  el('endStats').insertAdjacentHTML('beforeend',
    statCard(bpc.toFixed(2), 'bits/car. du modèle complet', COLORS.violet) +
    statCard(Math.round(coverage(store.lang).testCoverage * 100) + '%', 'mots du test connus', COLORS.txt2));
}
