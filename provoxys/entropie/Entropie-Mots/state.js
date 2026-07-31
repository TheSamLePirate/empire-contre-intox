/* ============================================================
   État partagé entre les chapitres
   ------------------------------------------------------------
   • la langue courante (sélecteur global de la barre du haut)
   • quelques traces du parcours, affichées au chapitre final
   ============================================================ */

const KEY = 'entropia.v2';

export const store = {
  lang: 'fr',
  visited: new Set(),
  chapter: 'intro',
  session: {
    charsTyped: 0,      // caractères analysés au chapitre 2
    lastEntropy: 0,     // dernière entropie mesurée (bits/caractère)
    detected: null,     // dernière langue détectée
    guessHistory: [],   // essais par lettre dans le jeu
    llmAsked: 0         // requêtes envoyées au modèle de langage
  }
};

/** Navigation, branchée par main.js (évite une dépendance circulaire). */
export const nav = { go(_id) {}, reset() {} };

const langSubs = [];

export function onLang(fn) { langSubs.push(fn); }

export function setLang(code) {
  if (code === store.lang) return;
  store.lang = code;
  save();
  langSubs.forEach(fn => { try { fn(code); } catch (e) { console.error(e); } });
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      lang: store.lang,
      chapter: store.chapter,
      visited: [...store.visited]
    }));
  } catch { /* stockage indisponible : le parcours reste en mémoire */ }
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    if (d.lang) store.lang = d.lang;
    if (d.chapter) store.chapter = d.chapter;
    if (Array.isArray(d.visited)) store.visited = new Set(d.visited);
  } catch { /* données illisibles : on repart de zéro */ }
}

export function reset() {
  store.visited = new Set();
  store.chapter = 'intro';
  store.session = { charsTyped: 0, lastEntropy: 0, detected: null, guessHistory: [], llmAsked: 0 };
  save();
}
