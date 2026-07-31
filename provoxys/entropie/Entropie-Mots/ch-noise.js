import { el, esc, COLORS, statCard } from './ui.js';
import { DEMO_SENTENCES } from './data.js';
import { TEST } from './corpus.js';
import { experiment, eraseAndRestore, channelInfo, binaryEntropy } from './channel.js';
import { charModel } from './model.js';
import { store, onLang } from './state.js';
import { refreshIcons } from './icons.js';
import { renderMath } from './math.js';

/* ============================================================
   CHAPITRE 9 — La redondance protège l'information
   ------------------------------------------------------------
   Partie II du papier. On transmet un texte sur un canal bruité,
   puis on le restaure en cherchant la suite la plus probable
   selon la langue : le modèle source-canal.
   ============================================================ */

let p = 0.08, erase = 0.5;

const seed = lang => (DEMO_SENTENCES[lang] || DEMO_SENTENCES.fr) + ' ' +
  (TEST[lang] || '').split('\n')[0].slice(0, 90);

/** Affiche un texte en surlignant les différences avec la référence. */
function ribbon(text, ref, cls) {
  return [...text].map((c, i) => {
    const same = ref[i] === c;
    const ch = c === ' ' ? '&nbsp;' : esc(c);
    return same ? ch : `<span class="${cls}">${ch}</span>`;
  }).join('');
}

function runChannel() {
  const raw = el('nText').value;
  if (!raw.trim()) return;
  const host = el('nOut');
  host.innerHTML = `<p class="text-xs flex items-center gap-2" style="color:var(--accent)"><i data-lucide="loader-circle" class="w-3.5 h-3.5 animate-spin"></i>Transmission…</p>`;
  refreshIcons();

  setTimeout(() => {
    const r = experiment(store.lang, raw, p, { beam: 44 });
    if (!r) return;

    host.innerHTML = `
      <div class="space-y-3">
        <div>
          <p class="eyebrow mb-1.5">1 · Message émis</p>
          <div class="card-inset p-3 ribbon" style="color:var(--txt-2)">${esc(r.source).replace(/ /g, '&nbsp;')}</div>
        </div>
        <div>
          <p class="eyebrow mb-1.5">2 · Message reçu <span style="color:var(--hot);text-transform:none;letter-spacing:0">— ${r.errBefore} lettre${r.errBefore > 1 ? 's' : ''} altérée${r.errBefore > 1 ? 's' : ''}</span></p>
          <div class="card-inset p-3 ribbon" style="color:var(--txt-2)">${ribbon(r.received, r.source, 'bad')}</div>
        </div>
        <div>
          <p class="eyebrow mb-1.5">3 · Après décodage par la langue
            <span style="color:var(--ok);text-transform:none;letter-spacing:0">— ${r.errBefore - r.errAfter} réparée${r.errBefore - r.errAfter > 1 ? 's' : ''}</span></p>
          <div class="card-inset p-3 ribbon" style="color:var(--txt-2)">${ribbon(r.repaired, r.source, 'miss')}</div>
        </div>
      </div>`;

    el('nStats').innerHTML =
      statCard((r.rateBefore * 100).toFixed(1) + '%', 'erreurs à la réception', COLORS.hot) +
      statCard((r.rateAfter * 100).toFixed(1) + '%', 'erreurs après décodage', COLORS.ok) +
      statCard(r.equivocation.toFixed(2), 'équivocation H(x|y)', COLORS.warn) +
      statCard(r.capacity.toFixed(2), 'capacité C (bits/symbole)', COLORS.accent);
    refreshIcons();
  }, 20);
}

function renderCapacity() {
  const V = charModel(store.lang).V;
  const W = 560, H = 250, padL = 46, padR = 22, padT = 16, padB = 40;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const ymax = Math.log2(V);
  const xOf = q => padL + plotW * q;
  const yOf = v => padT + plotH * (1 - v / ymax);

  let svg = `<svg viewBox="0 0 ${W} ${H}" class="w-full" style="min-width:380px" font-family="Inter">`;
  for (let t = 0; t <= 4; t++) {
    const v = ymax * t / 4, y = yOf(v);
    svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${COLORS.line}"/>`;
    svg += `<text x="${padL - 8}" y="${y + 3}" text-anchor="end" font-size="10" fill="${COLORS.txt3}">${v.toFixed(1)}</text>`;
  }
  for (let t = 0; t <= 5; t++) {
    const q = t / 5;
    svg += `<text x="${xOf(q)}" y="${H - padB + 17}" text-anchor="middle" font-size="10" fill="${COLORS.txt3}">${(q * 100).toFixed(0)} %</text>`;
  }

  let dC = '', dE = '';
  for (let i = 0; i <= 120; i++) {
    const q = i / 120 * 0.99;
    const info = channelInfo(q, V);
    dC += (i ? 'L' : 'M') + xOf(q).toFixed(1) + ' ' + yOf(info.capacity).toFixed(1) + ' ';
    dE += (i ? 'L' : 'M') + xOf(q).toFixed(1) + ' ' + yOf(info.equivocation).toFixed(1) + ' ';
  }
  svg += `<path d="${dE}" fill="none" stroke="${COLORS.hot}" stroke-width="2" stroke-dasharray="4 3"/>`;
  svg += `<path d="${dC}" fill="none" stroke="${COLORS.accent}" stroke-width="2.4"/>`;

  const info = channelInfo(p, V);
  svg += `<line x1="${xOf(p)}" y1="${padT}" x2="${xOf(p)}" y2="${padT + plotH}" stroke="${COLORS.warn}" stroke-dasharray="3 3" opacity=".7"/>`;
  svg += `<circle cx="${xOf(p)}" cy="${yOf(info.capacity)}" r="4.5" fill="${COLORS.warn}" stroke="${COLORS.bg}" stroke-width="2"/>`;
  svg += `<text x="${padL + plotW / 2}" y="${H - 3}" text-anchor="middle" font-size="9" fill="${COLORS.txt3}">probabilité d'erreur p</text>`;
  svg += `</svg>`;

  el('nCapacity').innerHTML = svg + `
    <div class="flex flex-wrap gap-4 justify-center mt-3 text-[11px]" style="color:var(--txt-2)">
      <span class="flex items-center gap-1.5"><span class="w-3.5 h-[2.5px] rounded-full" style="background:${COLORS.accent}"></span>capacité C</span>
      <span class="flex items-center gap-1.5"><span class="w-3.5 h-[2.5px] rounded-full" style="background:${COLORS.hot}"></span>équivocation H(x|y)</span>
    </div>
    <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
      À p = ${(p * 100).toFixed(0)} %, il reste <b style="color:var(--txt-2)">${info.capacity.toFixed(2)} bits</b> transmissibles
      par symbole sur les ${Math.log2(V).toFixed(2)} envoyés. Le théorème 11 garantit qu'en deçà de cette limite,
      un codage permet une transmission d'erreur arbitrairement faible — au-delà, c'est impossible.
      Notre texte, lui, dispose d'une redondance naturelle : c'est elle qui répare.
    </p>`;
}

function runErase() {
  const host = el('nEraseOut');
  host.innerHTML = `<p class="text-xs flex items-center gap-2" style="color:var(--accent)"><i data-lucide="loader-circle" class="w-3.5 h-3.5 animate-spin"></i>Restauration…</p>`;
  refreshIcons();
  setTimeout(() => {
    const src = (DEMO_SENTENCES[store.lang] || DEMO_SENTENCES.fr);
    const r = eraseAndRestore(store.lang, src, erase, { beam: 60 });
    const masked = [...r.masked].map(c => (c === '·' ? `<span class="gap">·</span>` : c === ' ' ? '&nbsp;' : esc(c))).join('');
    const restored = [...r.restored].map((c, i) => {
      const ch = c === ' ' ? '&nbsp;' : esc(c);
      if (r.kept[i]) return ch;
      return c === r.source[i] ? `<span class="fixed">${ch}</span>` : `<span class="bad">${ch}</span>`;
    }).join('');

    host.innerHTML = `
      <div class="space-y-2.5">
        <div><p class="eyebrow mb-1">Texte troué</p><div class="card-inset p-2.5 ribbon" style="color:var(--txt-2)">${masked}</div></div>
        <div><p class="eyebrow mb-1">Reconstruction par le modèle</p><div class="card-inset p-2.5 ribbon" style="color:var(--txt-2)">${restored}</div></div>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-3">
        ${statCard(r.erased, 'lettres effacées', COLORS.txt2)}
        ${statCard(Math.round(r.accuracy * 100) + '%', 'retrouvées', r.accuracy > 0.35 ? COLORS.ok : COLORS.warn)}
        ${statCard('3,7%', 'au hasard', COLORS.txt3)}
      </div>
      <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
        Retrouver ${Math.round(r.accuracy * 100)} % des lettres effacées quand le hasard n'en donnerait que 3,7 %
        signifie que le texte contenait bien plus de contraintes que d'information. C'est la
        définition opératoire de la redondance chez Shannon.
      </p>`;
    refreshIcons();
  }, 20);
}

export function init() {
  el('nP').addEventListener('input', () => {
    p = Number(el('nP').value) / 100;
    el('nPLabel').textContent = (p * 100).toFixed(0) + ' %';
    renderCapacity();
  });
  el('nEraseP').addEventListener('input', () => {
    erase = Number(el('nEraseP').value) / 100;
    el('nErasePLabel').textContent = (erase * 100).toFixed(0) + ' %';
  });
  el('nRun').addEventListener('click', runChannel);
  el('nEraseBtn').addEventListener('click', runErase);

  onLang(() => { el('nText').value = seed(store.lang); renderCapacity(); el('nOut').innerHTML = ''; el('nStats').innerHTML = ''; el('nEraseOut').innerHTML = ''; });

  el('nText').value = seed(store.lang);
  renderCapacity();
  runChannel();
  runErase();
  renderMath(document.querySelector('section[data-ch="noise"]'));
  refreshIcons();
  void binaryEntropy;
}
