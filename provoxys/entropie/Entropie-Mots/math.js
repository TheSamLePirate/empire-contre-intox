/* ============================================================
   Rendu des formules (KaTeX, chargé depuis un CDN)
   ------------------------------------------------------------
   Chaque bloc <div class="formula" data-tex="..."> est rendu dès
   que la bibliothèque est disponible. Si elle ne l'est pas — pas
   de réseau, CDN bloqué — on retombe sur une écriture texte
   lisible plutôt que sur une page cassée.
   ============================================================ */

const FALLBACK = [
  [/\\log_2/g, 'log₂'], [/\\frac\{1\}\{p\(x\)\}/g, '1/p(x)'],
  [/\\sum_\{[^}]*\}/g, 'Σ'], [/\\sum/g, 'Σ'],
  [/\\lim_\{[^}]*\}/g, 'lim'], [/\\le/g, '≤'], [/\\ge/g, '≥'],
  [/\\Longrightarrow/g, '⟹'], [/\\to/g, '→'], [/\\infty/g, '∞'],
  [/\\mid/g, '|'], [/\\times/g, '×'], [/\\quad|\\qquad|\\;|\\,/g, ' '],
  [/\\text\{([^}]*)\}/g, '$1'], [/\\underbrace\{([^}]*)\}/g, '$1'],
  [/_\{\\text\{([^}]*)\}\}/g, ' ($1)'], [/\\lambda/g, 'λ'], [/\\hat\{P\}/g, 'P̂'],
  [/\\big|\\Big/g, ''], [/\\max/g, 'max'], [/\\|/g, '‖'],
  [/\\tfrac\{1\}\{V\}/g, '1/V'], [/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)'],
  [/[{}]/g, ''], [/\\\\/g, ' ']
];

function plain(tex) {
  let s = tex;
  for (const [re, to] of FALLBACK) s = s.replace(re, to);
  return s.replace(/\s+/g, ' ').trim();
}

function renderOne(node) {
  const tex = node.dataset.tex;
  if (!tex || node.dataset.done) return;
  if (window.katex) {
    try {
      window.katex.render(tex, node, { displayMode: true, throwOnError: false, output: 'html' });
      node.dataset.done = '1';
      return;
    } catch { /* on bascule sur le texte simple */ }
  }
  node.textContent = plain(tex);
  node.classList.add('raw');
}

/** Rend toutes les formules présentes dans `root`. */
export function renderMath(root = document) {
  const nodes = root.querySelectorAll('.formula[data-tex]');
  if (!nodes.length) return;
  if (window.katex) { nodes.forEach(renderOne); return; }
  // KaTeX est chargé en `defer` : on attend, sans bloquer la page.
  let tries = 0;
  const timer = setInterval(() => {
    if (window.katex || ++tries > 40) {
      clearInterval(timer);
      nodes.forEach(renderOne);
    }
  }, 100);
}
