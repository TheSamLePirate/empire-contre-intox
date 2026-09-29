/* Empire contre Intox — parcours de lecture (composant commun à tous les dossiers).

   Trois parcours : 1 Essentiel · 2 Mécanisme · 3 Complet. Le parcours règle l'ouverture de tous les plis
   de la page ; chaque pli reste ouvrable ou refermable à la main.

   Balisage attendu (produit par le générateur du dossier, rien n'est créé ici) :
     <html data-parcours="2">                    parcours par défaut (CSS utile même sans JS)
     <details class="eci-pli" data-famille="maths|profondeur|histoire|cle|atelier" data-niveau="2|3" data-complexite="1|2|3" open?>
       <summary class="eci-pli-s"><span class="eci-pli-k">…</span><span class="eci-pli-t">…</span><span class="eci-pli-m">…</span></summary>
       <div class="eci-pli-c">…</div>
     </details>                                  ouvert à partir du parcours data-niveau
     [data-niveau="2|3"] (hors .eci-pli)         élément masqué sous ce parcours (petits encadrés)
     <div data-eci-parcours></div>               sélecteur complet (trois choix décrits)
     <div data-eci-parcours="mini"></div>        sélecteur compact (barre du haut)

   Le choix est mémorisé (localStorage « eci-parcours », commun au site) ; ?parcours=essentiel|mecanisme|complet
   dans l'URL l'emporte. Une ancre ou une recherche dans la page ouvre les plis qui contiennent la cible ;
   l'impression déplie tout. */
(() => {
  const root = document.documentElement;
  const KEY = 'eci-parcours';
  const LV = {
    1: { nom: 'Essentiel', slug: 'essentiel', desc: 'Le récit et les bilans. Formules, clés, ateliers et développements restent repliés.' },
    2: { nom: 'Mécanisme', slug: 'mecanisme', desc: 'Le récit, les exemples, les clés de physique et les ateliers. Les calculs et les développements restent repliés.' },
    3: { nom: 'Complet', slug: 'complet', desc: 'Tout est déplié : analyse mathématique, développements en profondeur, histoire et sources.' },
  };
  const FAM = { maths: "L'analyse mathématique", profondeur: 'En profondeur', histoire: 'Histoire & sources', cle: 'Clé de physique', atelier: 'Atelier' };
  const plis = [...document.querySelectorAll('details.eci-pli')];
  const niveau = d => Math.min(3, Math.max(1, parseInt(d.dataset.niveau, 10) || 3));
  const clamp = n => (n >= 1 && n <= 3 ? n : 0);

  function initial() {
    const q = new URLSearchParams(location.search).get('parcours');
    if (q) { const k = Object.keys(LV).find(k => LV[k].slug === q.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase() || k === q); if (k) return +k; }
    try { const s = clamp(parseInt(localStorage.getItem(KEY), 10)); if (s) return s; } catch (e) { /* stockage indisponible */ }
    return clamp(parseInt(root.dataset.parcours, 10)) || 2;
  }

  /* élément de repère pour garder la lecture en place quand des plis s'ouvrent au-dessus */
  /* descente géométrique (pas de elementFromPoint : les encadrés pas encore révélés ignorent le pointeur) :
     à chaque niveau, le premier enfant visible qui coupe la ligne de lecture ; on garde le plus profond
     qui tient dans l'écran. Les éléments collants ou masquables par le parcours ne servent pas de repère. */
  function anchorEl() {
    const y = Math.min(innerHeight * 0.3, 240);
    let el = document.querySelector('main') || document.body, best = null;
    for (let depth = 0; el && depth < 40; depth++) {
      let next = null;
      for (const c of el.children) {
        if (/^(SCRIPT|STYLE|TEMPLATE)$/.test(c.tagName) || (c.hasAttribute('data-niveau') && c.tagName !== 'DETAILS')) continue;
        const r = c.getBoundingClientRect();
        if (!(r.height > 0 && r.top <= y && r.bottom > y)) continue;
        const pos = getComputedStyle(c).position;
        if (pos === 'fixed' || pos === 'sticky') continue;
        next = c; break;
      }
      if (!next) break;
      el = next;
      if (el.getBoundingClientRect().height < innerHeight) best = el;
    }
    return best;
  }

  let cur = 0;
  function apply(n, opts = {}) {
    n = clamp(n) || 2;
    const a = opts.keep ? anchorEl() : null, top0 = a ? a.getBoundingClientRect().top : 0;
    cur = n; root.dataset.parcours = String(n);
    for (const d of plis) { const want = niveau(d) <= n; if (d.open !== want) d.open = want; }
    if (a) {
      // si le repère vient d'être replié, on garde en place le titre du pli qui le contient
      let ref = a;
      for (let d = a.closest('details:not([open])'); d; d = d.parentElement && d.parentElement.closest('details:not([open])')) ref = d.querySelector(':scope > summary') || d;
      const dy = ref.getBoundingClientRect().top - top0;
      if (Math.abs(dy) > 1) window.scrollTo({ top: window.scrollY + dy, behavior: 'instant' });
    }
    if (opts.save) { try { localStorage.setItem(KEY, String(n)); } catch (e) { /* rien */ } }
    for (const b of document.querySelectorAll('[data-eci-parcours] [data-n]')) {
      const on = +b.dataset.n === n; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1;
    }
    for (const s of document.querySelectorAll('[data-eci-parcours] .eci-pc-now')) s.textContent = LV[n].nom;
    root.dispatchEvent(new CustomEvent('eci-parcours', { detail: { niveau: n } }));
  }

  /* ------------------------------------------------------------------ sélecteurs */
  const closed = n => plis.filter(d => niveau(d) > n).length;
  function group(label) {
    const g = document.createElement('div');
    g.className = 'eci-pc-g'; g.setAttribute('role', 'radiogroup'); g.setAttribute('aria-label', label);
    g.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return;
      e.preventDefault(); const n = Math.min(3, Math.max(1, cur + k)); apply(n, { save: true, keep: true });
      const b = g.querySelector(`[data-n="${n}"]`); if (b) b.focus();
    });
    return g;
  }
  function button(n, full) {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.n = n; b.setAttribute('role', 'radio');
    const m = closed(n);
    b.innerHTML = `<span class="eci-pc-n">${n}</span><span class="eci-pc-l">${LV[n].nom}</span>` +
      (full ? `<span class="eci-pc-d">${LV[n].desc}</span><span class="eci-pc-c">${m ? m + (m > 1 ? ' blocs repliés' : ' bloc replié') : 'rien de replié'}</span>` : '');
    b.title = LV[n].desc;
    b.addEventListener('click', () => { apply(n, { save: true, keep: true }); const box = b.closest('.eci-pc-mini'); if (box) box.classList.remove('open'); });
    return b;
  }
  for (const host of document.querySelectorAll('[data-eci-parcours]')) {
    host.textContent = '';
    if (host.dataset.eciParcours === 'mini') {
      host.classList.add('eci-pc-mini');
      const t = document.createElement('button');
      t.type = 'button'; t.className = 'eci-pc-tog'; t.setAttribute('aria-expanded', 'false');
      t.innerHTML = '<span class="eci-pc-k">Parcours</span> <span class="eci-pc-now"></span>';
      const g = group('Parcours de lecture');
      for (const n of [1, 2, 3]) g.append(button(n, false));
      t.addEventListener('click', () => { const o = host.classList.toggle('open'); t.setAttribute('aria-expanded', o ? 'true' : 'false'); });
      document.addEventListener('click', e => { if (!host.contains(e.target)) { host.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); } });
      host.addEventListener('keydown', e => { if (e.key === 'Escape') { host.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); t.focus(); } });
      host.append(t, g);
    } else {
      host.classList.add('eci-pc-full');
      const g = group('Choisir son parcours de lecture');
      for (const n of [1, 2, 3]) g.append(button(n, true));
      const fams = {};
      for (const d of plis) fams[d.dataset.famille] = (fams[d.dataset.famille] || 0) + 1;
      const legend = document.createElement('p');
      legend.className = 'eci-pc-leg';
      legend.innerHTML = Object.keys(FAM).filter(f => fams[f]).map(f => `<span class="eci-pc-f" data-famille="${f}">${FAM[f]} <b>${fams[f]}</b></span>`).join('');
      const cx = { 1: 0, 2: 0, 3: 0 };
      for (const d of plis) { const k = +d.dataset.complexite; if (cx[k] !== undefined) cx[k]++; }
      const cxl = document.createElement('p');
      cxl.className = 'eci-pc-cx';
      const bars = k => `<span class="eci-pli-cx" data-cx="${k}" aria-hidden="true"><i></i><i></i><i></i></span>`;
      cxl.innerHTML = '<span class="eci-pc-cxk">Complexité</span>' +
        [[1, 'accessible'], [2, 'intermédiaire'], [3, 'expert']].map(([k, n]) => `<span>${bars(k)} ${n} <b>${cx[k]}</b></span>`).join('');
      if (cx[1] + cx[2] + cx[3]) host.append(g, legend, cxl); else host.append(g, legend);
    }
  }

  /* ------------------------------------------------------------------ cibles : ancre, recherche, impression */
  const openTo = el => { for (let d = el && el.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true; };
  const fromHash = () => { const id = decodeURIComponent(location.hash.slice(1)); if (id) openTo(document.getElementById(id)); };
  addEventListener('hashchange', fromHash);
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    const id = decodeURIComponent(a.getAttribute('href').slice(1)); if (id) openTo(document.getElementById(id));
  }, true);
  let printed = null;
  addEventListener('beforeprint', () => { printed = plis.filter(d => !d.open); printed.forEach(d => { d.open = true; }); });
  addEventListener('afterprint', () => { if (printed) printed.forEach(d => { d.open = false; }); printed = null; });

  apply(initial());
  fromHash();
})();
