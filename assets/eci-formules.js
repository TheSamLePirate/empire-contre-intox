/* Empire contre Intox — formules survolables (composant commun à tous les dossiers).
   Chaque symbole d'une formule (bloc .formula-block ou formule du texte .imath) affiche au survol, au
   toucher ou au clavier sa définition, son unité et un ordre de grandeur. Le TeX a été annoté à la
   construction par .claude/skills/nouveau-dossier/scripts/formules-symboles.py (ou par le générateur du
   dossier) : \htmlData{sym=k}{…} pour les blocs (fiches dans la rangée .fb-syms du bloc), \htmlData{sym=gN}
   pour le texte (fiches dans la table unique <script type="application/json" id="symtab">).
   KaTeX doit rendre \htmlData : ce script redessine, avec l'option trust, toute formule annotée que la
   page aurait rendue sans elle. Aucune dépendance hors KaTeX. */
(function(){
'use strict';
if (window.__eciFormules) return; window.__eciFormules = true;
const TOPBAR = () => document.querySelector('#topbar, .topbar, header.nav, .nav-sticky');
const KX = { throwOnError: false, trust: c => c.command === '\\htmlData', strict: code => code === 'htmlExtension' ? 'ignore' : 'warn' };
/* formules annotées rendues sans l'option trust : on les redessine. La page rend ses formules à son
   rythme (au chargement, après KaTeX venu d'un CDN, parfois à l'apparition) : un observateur repasse
   derrière elle à chaque rendu. `done` retient notre propre rendu, pour ne jamais boucler. */
const done = new WeakMap();
function rerender(){
  if (!window.katex) return;
  document.querySelectorAll('[data-tex]').forEach(el => {
    const t = el.dataset.tex; if (!t || t.indexOf('\\htmlData') < 0 || el.querySelector('[data-sym]')) return;
    if (done.get(el) === el.firstChild && el.firstChild) return;
    try { katex.render(t, el, Object.assign({ displayMode: el.classList.contains('formula') }, KX)); el.dataset.rendered = '1'; } catch (e) { /* le texte de repli reste */ }
    done.set(el, el.firstChild);
  });
}
let queued = false;
function schedule(){ if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; rerender(); }); }
window.ECIFormules = { rerender };
function boot(){
  schedule();
  new MutationObserver(recs => { for (const r of recs) if (r.target.nodeType === 1 && r.target.hasAttribute('data-tex')) return schedule(); }).observe(document.body, { childList: true, subtree: true });
  let n = 0; const wait = setInterval(() => { if (window.katex || ++n > 80) { clearInterval(wait); schedule(); } }, 250);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
addEventListener('load', schedule);
/* ---------------------------------------------------------------- fiches
   Le générateur a marqué chaque occurrence d'un symbole (\htmlData{sym=k}) ; la rangée « Les symboles »
   sous la formule porte, pour chaque k, la définition, l'unité et un ordre de grandeur. Survol, toucher
   ou focus clavier : la fiche s'affiche près du symbole et toutes ses occurrences s'allument. */
{
  const tip = document.createElement('div'); tip.className = 'fs-tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true; document.body.appendChild(tip);
  let cur = null, pinned = false;
  function light(block, k){
    block.querySelectorAll('.formula [data-sym]').forEach(s => s.classList.toggle('sym-on', s.dataset.sym === k));
    block.querySelectorAll('.fb-syms li').forEach(li => li.classList.toggle('on', li.dataset.k === k));
  }
  function show(block, k, anchor0){
    let anchor = anchor0;
    const li = block.querySelector('.fb-syms li[data-k="' + k + '"]'); if (!li) return;
    light(block, k); cur = { block, k };
    tip.innerHTML = li.innerHTML; tip.hidden = false;
    // une occurrence hors de l'écran (formule haute, clic dans la rangée du bas) : on s'accroche à la rangée
    let ar = anchor.getBoundingClientRect();
    if (ar.bottom < 0 || ar.top > innerHeight) { anchor = li; ar = li.getBoundingClientRect(); }
    const r = ar, tw = tip.offsetWidth, th = tip.offsetHeight, vw = document.documentElement.clientWidth;
    let x = r.left + r.width / 2 - tw / 2; x = Math.max(8, Math.min(vw - tw - 8, x));
    const topbar = TOPBAR(), minY = (topbar ? topbar.getBoundingClientRect().bottom : 0) + 8;
    // verticalement, la fiche se pose au-dessus (ou au-dessous) du cadre de la formule : elle ne la cache pas
    const box = anchor.closest && anchor.closest('.formula') ? anchor.closest('.formula').getBoundingClientRect() : r;
    let y = box.top - th - 6; if (y < minY) y = box.bottom + 6;
    y = Math.max(minY, Math.min(innerHeight - th - 8, y));
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function hide(){ if (!cur) return; if (cur.block) light(cur.block, null); if (cur.el) cur.el.classList.remove('sym-on'); cur = null; pinned = false; tip.hidden = true; }
  const symAt = t => t && t.closest && t.closest('.formula [data-sym]');
  /* formules dans le texte : fiches lues dans la table unique #symtab (identifiants « gN ») */
  let SYMTAB = null;
  const table = () => { if (!SYMTAB){ try { SYMTAB = JSON.parse(document.getElementById('symtab').textContent); } catch (e) { SYMTAB = {}; } } return SYMTAB; };
  const inlAt = t => t && t.closest && t.closest('.imath [data-sym^="g"]');
  function showInline(el){
    const c = table()[el.dataset.sym]; if (!c) return;
    if (cur && cur.el) cur.el.classList.remove('sym-on');
    if (cur && cur.block) light(cur.block, null);
    cur = { el, k: el.dataset.sym }; el.classList.add('sym-on');
    tip.innerHTML = '<span class="fs-t"><span class="imath" data-tex=""></span></span><span class="fs-n">' + c[1] + '</span>' + (c[2] ? '<span class="fs-u">' + c[2] + '</span>' : '') + (c[3] ? '<span class="fs-v">' + c[3] + '</span>' : '');
    tip.querySelector('.fs-t .imath').dataset.tex = c[0];
    if (window.katex) tip.querySelectorAll('[data-tex]').forEach(x => { try { katex.render(x.dataset.tex, x, KX); } catch (e) {} });
    tip.hidden = false;
    const r = el.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight, vw = document.documentElement.clientWidth;
    const topbar = TOPBAR(), minY = (topbar ? topbar.getBoundingClientRect().bottom : 0) + 8;
    let x = Math.max(8, Math.min(vw - tw - 8, r.left + r.width / 2 - tw / 2));
    let y = r.top - th - 8; if (y < minY) y = r.bottom + 8;
    y = Math.max(minY, Math.min(innerHeight - th - 8, y));
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  document.addEventListener('pointerover', e => { if (pinned) return; const g = inlAt(e.target); if (g) showInline(g); });
  document.addEventListener('pointerout', e => { if (pinned || !cur || !cur.el) return; if (inlAt(e.target) && !inlAt(e.relatedTarget)) hide(); });
  document.addEventListener('pointerdown', e => { const g = inlAt(e.target); if (!g) return;
    if (pinned && cur && cur.el === g){ hide(); return; } showInline(g); pinned = e.pointerType !== 'mouse'; }, true);
  document.addEventListener('pointerover', e => {
    if (pinned) return;
    const s = symAt(e.target); if (s){ show(s.closest('.formula-block'), s.dataset.sym, s); return; }
    const li = e.target.closest && e.target.closest('.fb-syms li');
    if (li){ const b = li.closest('.formula-block'), first = b.querySelector('.formula [data-sym="' + li.dataset.k + '"]'); show(b, li.dataset.k, first || li); }
  });
  document.addEventListener('pointerout', e => {
    if (pinned || !cur) return;
    const from = symAt(e.target) || (e.target.closest && e.target.closest('.fb-syms li'));
    const to = e.relatedTarget && (symAt(e.relatedTarget) || (e.relatedTarget.closest && e.relatedTarget.closest('.fb-syms li')));
    if (from && !to) hide();
  });
  /* toucher : un appui épingle la fiche, un appui ailleurs la ferme */
  document.addEventListener('pointerdown', e => {
    const s = symAt(e.target), li = e.target.closest && e.target.closest('.fb-syms li');
    if (s || li){
      const b = (s || li).closest('.formula-block'), k = s ? s.dataset.sym : li.dataset.k;
      if (pinned && cur && cur.k === k && cur.block === b){ hide(); return; }
      show(b, k, s || b.querySelector('.formula [data-sym="' + k + '"]') || li); pinned = e.pointerType !== 'mouse'; return;
    }
    if (cur && !inlAt(e.target)) hide();
  });
  document.addEventListener('focusin', e => { const li = e.target.closest && e.target.closest('.fb-syms li');
    if (li){ const b = li.closest('.formula-block'); show(b, li.dataset.k, b.querySelector('.formula [data-sym="' + li.dataset.k + '"]') || li); } });
  document.addEventListener('focusout', e => { if (e.target.closest && e.target.closest('.fb-syms li')) hide(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && cur) hide(); });
  addEventListener('scroll', () => { if (cur) hide(); }, { passive: true });
}
})();
