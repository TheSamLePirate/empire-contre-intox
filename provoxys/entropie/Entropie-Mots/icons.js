import { createIcons, icons } from 'https://cdn.jsdelivr.net/npm/lucide@latest/+esm';

/* Remplace les <i data-lucide> par des SVG. Groupé sur une frame pour
   éviter de rescanner le document à chaque rendu partiel. */
let queued = false;
export function refreshIcons() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    try { createIcons({ icons }); } catch { /* icône inconnue : sans effet */ }
  });
}
