import { el, esc, heat, COLORS, statCard } from './ui.js';
import { LANGUAGES } from './data.js';
import { TEST } from './corpus.js';
import { huffman, SHANNON_EXAMPLE, letterCode, compress, gzipSize, aep } from './codec.js';
import { store, onLang } from './state.js';
import { refreshIcons } from './icons.js';
import { renderMath } from './math.js';

/* ============================================================
   CHAPITRE 3 — L'entropie est une limite physique
   ------------------------------------------------------------
   On construit de vrais codes et on compresse réellement, pour
   vérifier expérimentalement H ≤ L̄ < H+1 (théorème 9) puis
   l'optimalité du codage arithmétique piloté par le modèle.
   ============================================================ */

let order = 6;

/* ---------- 1. L'exemple du §10 ---------- */
function renderExample() {
  const h = huffman(SHANNON_EXAMPLE);
  const rows = SHANNON_EXAMPLE.map(d => {
    const code = h.codes.get(d.sym);
    return `<tr>
      <td class="mono" style="color:var(--txt)">${d.sym}</td>
      <td class="num">${d.p === 0.5 ? '1/2' : d.p === 0.25 ? '1/4' : '1/8'}</td>
      <td class="num">${(-Math.log2(d.p)).toFixed(0)}</td>
      <td class="code">${code}</td>
      <td class="num">${code.length}</td>
    </tr>`;
  }).join('');

  el('kExample').innerHTML = `
    <table class="tbl">
      <thead><tr><th>symbole</th><th class="num">p</th><th class="num">−log₂p</th><th>code</th><th class="num">bits</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="grid grid-cols-2 gap-2 mt-4">
      ${statCard(h.H.toFixed(2), 'entropie H', COLORS.accent)}
      ${statCard(h.avgLen.toFixed(2), 'longueur moyenne L̄', COLORS.ok)}
    </div>
    <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
      Ici <span class="mono">L̄ = H</span> exactement, parce que toutes les probabilités sont des puissances de 2.
      Dans le cas général le code perd jusqu'à 1 bit par symbole — c'est la borne du théorème 9.
    </p>`;
}

/* ---------- 2. Code de Huffman sur les lettres ---------- */
function renderLetters() {
  const c = letterCode(store.lang);
  const L = LANGUAGES[store.lang];
  el('kLangName').textContent = `${L.flag} ${c.rows.length} symboles`;

  const shown = c.rows.slice(0, 12);
  const rows = shown.map(r => {
    const code = c.codes.get(r.ch);
    return `<tr>
      <td class="mono" style="color:var(--txt)">${r.ch === ' ' ? '␣' : esc(r.ch)}</td>
      <td class="num">${(r.p * 100).toFixed(2)} %</td>
      <td class="num">${r.bits.toFixed(2)}</td>
      <td class="code">${code}</td>
      <td class="num" style="color:${code.length <= 4 ? 'var(--ok)' : code.length >= 7 ? 'var(--hot)' : 'var(--warn)'}">${code.length}</td>
    </tr>`;
  }).join('');

  const gain = (1 - c.avgLen / c.F0) * 100;
  el('kLetters').innerHTML = `
    <div style="max-height:260px;overflow-y:auto">
      <table class="tbl">
        <thead><tr><th>lettre</th><th class="num">fréquence</th><th class="num">−log₂p</th><th>code</th><th class="num">bits</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="grid grid-cols-3 gap-2 mt-4">
      ${statCard(c.H.toFixed(2), 'entropie H', COLORS.accent)}
      ${statCard(c.avgLen.toFixed(2), 'longueur L̄', COLORS.ok)}
      ${statCard(c.F0.toFixed(2), 'code de longueur fixe', COLORS.txt3)}
    </div>
    <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
      <b style="color:var(--ok)">H ≤ L̄ &lt; H+1</b> est vérifié : ${c.H.toFixed(3)} ≤ ${c.avgLen.toFixed(3)} &lt; ${(c.H + 1).toFixed(3)}.
      Par rapport à un code de longueur fixe, ce seul changement économise déjà <b style="color:var(--txt-2)">${gain.toFixed(1)} %</b> — et l'on n'a encore rien exploité du contexte.
    </p>`;
}

/* ---------- 3. Compression réelle ---------- */
function bar(label, bytes, max, color, note = '') {
  return `
    <div>
      <div class="flex justify-between items-baseline text-[11px] mb-1">
        <span style="color:var(--txt-2)">${label} ${note ? `<span style="color:var(--txt-3)">${note}</span>` : ''}</span>
        <span class="mono tabular" style="color:${color}">${bytes} o</span>
      </div>
      <div class="h-2.5 rounded-full overflow-hidden" style="background:var(--bg)">
        <div class="grow h-full rounded-full" style="width:${(bytes / max * 100).toFixed(1)}%;background:${color}"></div>
      </div>
    </div>`;
}

async function runCompress() {
  const host = el('kResult');
  const raw = el('kInput').value;
  if (!raw.trim()) { host.innerHTML = `<p class="text-xs" style="color:var(--txt-3)">Écrivez un texte à compresser.</p>`; return; }

  host.innerHTML = `<p class="text-xs flex items-center gap-2" style="color:var(--accent)"><i data-lucide="loader-circle" class="w-3.5 h-3.5 animate-spin"></i>Codage en cours…</p>`;
  refreshIcons();
  await new Promise(r => setTimeout(r, 20));

  const r = compress(store.lang, raw, order);
  if (!r) { host.innerHTML = `<p class="text-xs" style="color:var(--txt-3)">Texte vide après normalisation.</p>`; return; }
  if (r.unsupported) {
    host.innerHTML = `<p class="text-xs" style="color:var(--hot)">Le symbole « ${esc(r.unsupported)} » n'appartient pas à l'alphabet de cette langue.</p>`;
    return;
  }
  const gz = await gzipSize(r.text);
  const max = Math.max(r.rawUtf8, r.fixed27, gz || 0, r.size);

  host.innerHTML = `
    <div class="grid lg:grid-cols-2 gap-6">
      <div class="space-y-2.5">
        ${bar('Texte brut (UTF-8)', r.rawUtf8, max, COLORS.txt3, '8 bits/caractère')}
        ${bar('Code de longueur fixe', r.fixed27, max, COLORS.hot, 'log₂V bits/caractère')}
        ${gz !== null ? bar('gzip', gz, max, COLORS.warn, 'compresseur généraliste') : ''}
        ${bar('Modèle n-gramme + codage arithmétique', r.size, max, COLORS.ok, `contexte ${order}`)}
      </div>
      <div>
        <div class="grid grid-cols-2 gap-2">
          ${statCard(r.bitsPerChar.toFixed(2), 'bits / caractère obtenus', COLORS.ok)}
          ${statCard(r.idealPerChar.toFixed(2), 'entropie du modèle', COLORS.accent)}
          ${statCard(r.overhead.toFixed(1), 'bits de surcoût total', COLORS.txt2)}
          ${statCard(gz !== null ? (gz / r.size).toFixed(2) + '×' : '—', 'plus petit que gzip', COLORS.violet)}
        </div>
        <div class="callout ${r.lossless ? 'callout-ok' : 'callout-warn'} mt-3">
          <i data-lucide="${r.lossless ? 'circle-check-big' : 'triangle-alert'}" class="w-4 h-4 shrink-0 mt-0.5"></i>
          <span>${r.lossless
            ? `<b>Décodage vérifié.</b> Les ${r.size} octets ont été relus et redonnent exactement les ${r.n} caractères d'origine. La compression est sans perte.`
            : `<b>Échec du décodage.</b>`}</span>
        </div>
        <p class="text-[11px] leading-relaxed mt-3" style="color:var(--txt-3)">
          Le codeur arithmétique atteint <span class="mono">−Σ log₂ P</span> à ${r.overhead.toFixed(1)} bits près sur l'ensemble du message,
          soit ${(r.overhead / r.n).toFixed(4)} bit par caractère. <b style="color:var(--txt-2)">La limite de Shannon est atteinte, pas approchée.</b>
          ${gz !== null ? ` gzip, qui ne connaît pas la langue, reste ${(gz / r.size).toFixed(1)} fois plus gros.` : ''}
        </p>
      </div>
    </div>`;
  refreshIcons();
}

/* ---------- 4. Équipartition asymptotique (théorème 3) ---------- */
function renderAep() {
  const a = aep(store.lang, [10, 40, 160, 500], 150);
  const W = 620, H = 260, padL = 46, padR = 20, padT = 16, padB = 42;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const all = a.curves.flatMap(c => c.vals);
  const ymin = Math.max(0, Math.min(...all) - 0.2), ymax = Math.max(...all) + 0.2;
  const xOf = i => padL + plotW * (i + 0.5) / a.curves.length;
  const yOf = v => padT + plotH * (1 - (v - ymin) / (ymax - ymin));

  let svg = `<svg viewBox="0 0 ${W} ${H}" class="w-full" style="min-width:440px" font-family="Inter">`;
  for (let t = 0; t <= 4; t++) {
    const v = ymin + (ymax - ymin) * t / 4, y = yOf(v);
    svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${COLORS.line}"/>`;
    svg += `<text x="${padL - 8}" y="${y + 3}" text-anchor="end" font-size="10" fill="${COLORS.txt3}">${v.toFixed(1)}</text>`;
  }
  const yH = yOf(a.H);
  svg += `<line x1="${padL}" y1="${yH}" x2="${W - padR}" y2="${yH}" stroke="${COLORS.ok}" stroke-dasharray="5 4"/>`;
  svg += `<text x="${W - padR - 3}" y="${yH - 6}" text-anchor="end" font-size="10" fill="${COLORS.ok}">H ≈ ${a.H.toFixed(2)} bits</text>`;

  a.curves.forEach((c, i) => {
    const x = xOf(i);
    c.vals.forEach((v, k) => {
      const jitter = ((k * 2654435761) % 1000 / 1000 - 0.5) * 42;
      svg += `<circle cx="${(x + jitter).toFixed(1)}" cy="${yOf(v).toFixed(1)}" r="1.9" fill="${COLORS.accent}" opacity=".33"/>`;
    });
    svg += `<line x1="${x - 26}" y1="${yOf(c.mean)}" x2="${x + 26}" y2="${yOf(c.mean)}" stroke="${COLORS.warn}" stroke-width="2.5"/>`;
    svg += `<text x="${x}" y="${H - padB + 17}" text-anchor="middle" font-size="11" font-weight="600" fill="${COLORS.txt2}">N = ${c.N}</text>`;
    svg += `<text x="${x}" y="${H - padB + 31}" text-anchor="middle" font-size="9" fill="${COLORS.txt3}">σ = ${c.sd.toFixed(2)}</text>`;
  });
  svg += `<text x="${padL - 32}" y="${padT + plotH / 2}" transform="rotate(-90 ${padL - 32} ${padT + plotH / 2})" text-anchor="middle" font-size="9" fill="${COLORS.txt3}">−log₂P(suite) / N</text>`;
  svg += `</svg>`;
  el('kAep').innerHTML = svg;

  const last = a.curves[a.curves.length - 1];
  const typical = last.N * a.H;
  const possible = last.N * Math.log2(a.V);
  el('kAepStats').innerHTML =
    statCard(a.H.toFixed(2), 'entropie H (bits/car.)', COLORS.ok) +
    statCard(last.sd.toFixed(2), `écart-type à N = ${last.N}`, COLORS.accent) +
    statCard('2^' + Math.round(typical), 'suites typiques', COLORS.violet) +
    statCard('2^' + Math.round(possible), 'suites possibles', COLORS.txt3);
}

/* ---------- init ---------- */
export function init() {
  el('kOrder').addEventListener('input', () => {
    order = Number(el('kOrder').value);
    el('kOrderLabel').textContent = order === 0 ? 'aucun' : order + ' lettre' + (order > 1 ? 's' : '');
  });
  el('kRun').addEventListener('click', runCompress);

  onLang(() => {
    renderLetters();
    el('kInput').value = TEST[store.lang].split('\n')[0];
    el('kResult').innerHTML = '';
    renderAep();
  });

  renderExample();
  renderLetters();
  el('kInput').value = TEST[store.lang].split('\n')[0];
  renderAep();
  runCompress();
  renderMath(document.querySelector('section[data-ch="code"]'));
  refreshIcons();
}
