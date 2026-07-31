/* ============================================================
   Utilitaires d'interface partagés
   ============================================================ */

export const el = id => document.getElementById(id);
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const COLORS = {
  bg: '#07090f', surface: '#0d1017', line: '#1c212c',
  txt: '#e8eaf0', txt2: '#9aa3b2', txt3: '#626c7d',
  accent: '#5b8cff', ok: '#35d0a5', warn: '#f5b544', hot: '#ff6b6b', violet: '#a78bfa'
};

/** Couleur de chaleur : 0 bit = vert (prévisible) → `scale` bits = rouge. */
export function heatRGB(bits, scale = 6) {
  const t = Math.max(0, Math.min(1, bits / scale));
  const stops = [
    [0.00, [53, 208, 165]],
    [0.28, [140, 205, 105]],
    [0.50, [245, 181, 68]],
    [0.74, [247, 137, 74]],
    [1.00, [255, 107, 107]]
  ];
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1], [t1, c1] = stops[i];
      const f = (t - t0) / (t1 - t0);
      return c0.map((v, k) => Math.round(v + (c1[k] - v) * f));
    }
  }
  return [255, 107, 107];
}

export function heat(bits, scale = 6) {
  const c = heatRGB(bits, scale);
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

/** Même échelle, avec transparence — pour les fonds de surlignage. */
export function heatA(bits, alpha, scale = 6) {
  const c = heatRGB(bits, scale);
  return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
}

/** Bloc statistique. */
export function statCard(value, label, color = COLORS.txt) {
  return `<div class="stat"><div class="stat-v" style="color:${color}">${value}</div><div class="stat-l">${label}</div></div>`;
}

/** Remplit un <select> avec les langues. */
export function fillLangs(select, langs) {
  select.innerHTML = Object.keys(langs)
    .map(c => `<option value="${c}">${langs[c].flag} ${langs[c].name}</option>`).join('');
}

/** Boutons d'exemple par langue. */
export function langChips(host, langs, onPick, active) {
  host.innerHTML = Object.keys(langs).map(c => `
    <button data-l="${c}" class="btn btn-sm" style="padding:.25rem .5rem;font-size:.6875rem;${c === active ? 'color:var(--txt);border-color:var(--accent)' : ''}">
      ${langs[c].flag} ${c.toUpperCase()}
    </button>`).join('');
  host.querySelectorAll('button[data-l]').forEach(b => {
    b.onclick = () => onPick(b.dataset.l);
  });
}

/** Graphique en courbes SVG générique. */
export function lineChart({ series, xLabels, xSub = [], ymax, width = 620, height = 280, yLabel = '', refLine = null }) {
  const padL = 44, padR = 26, padT = 14, padB = xSub.length ? 46 : 32;
  const plotW = width - padL - padR, plotH = height - padT - padB;
  const n = xLabels.length - 1;
  const xOf = i => padL + (n ? (plotW * i) / n : plotW / 2);
  const yOf = v => padT + plotH * (1 - v / ymax);

  let svg = `<svg viewBox="0 0 ${width} ${height}" class="w-full" style="min-width:${Math.min(width, 520)}px" font-family="Inter">`;
  for (let t = 0; t <= 4; t++) {
    const val = ymax * t / 4, y = yOf(val);
    svg += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="${COLORS.line}"/>`;
    svg += `<text x="${padL - 8}" y="${y + 3}" text-anchor="end" font-size="10" fill="${COLORS.txt3}">${val.toFixed(1)}</text>`;
  }
  xLabels.forEach((lb, i) => {
    svg += `<text x="${xOf(i)}" y="${height - padB + 17}" text-anchor="middle" font-size="11" font-weight="600" fill="${COLORS.txt2}">${lb}</text>`;
    if (xSub[i]) svg += `<text x="${xOf(i)}" y="${height - padB + 31}" text-anchor="middle" font-size="9" fill="${COLORS.txt3}">${xSub[i]}</text>`;
  });
  if (yLabel) {
    const cy = padT + plotH / 2;
    svg += `<text x="${padL - 31}" y="${cy}" transform="rotate(-90 ${padL - 31} ${cy})" text-anchor="middle" font-size="9" fill="${COLORS.txt3}">${yLabel}</text>`;
  }
  if (refLine) {
    const y = yOf(refLine.value);
    svg += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="${COLORS.txt3}" stroke-dasharray="4 4" opacity=".65"/>`;
    svg += `<text x="${width - padR - 3}" y="${y - 5}" text-anchor="end" font-size="9" fill="${COLORS.txt2}">${refLine.label}</text>`;
  }
  for (const s of series) {
    const pts = s.values.map((v, i) => [xOf(i), yOf(v)]);
    const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    svg += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`;
    pts.forEach((p, i) => {
      svg += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.2" fill="${s.color}"><title>${s.label} · ${xLabels[i]} = ${s.values[i].toFixed(2)}</title></circle>`;
    });
  }
  svg += `</svg>`;

  const legend = series.length > 1
    ? `<div class="flex flex-wrap gap-3 justify-center mt-3">${series.map(s =>
        `<span class="flex items-center gap-1.5 text-[11px]" style="color:var(--txt-2)"><span class="w-3.5 h-[2.5px] rounded-full" style="background:${s.color}"></span>${s.label}</span>`
      ).join('')}</div>`
    : '';
  // le graphique défile horizontalement plutôt que d'élargir la page
  return `<div class="overflow-x-auto">${svg}</div>` + legend;
}

/** Barres horizontales : liste de {label, value, pct, color, meta} */
export function barRows(items, { max } = {}) {
  const m = max ?? Math.max(...items.map(i => i.value), 1e-9);
  return items.map((it, i) => `
    <div class="flex items-center gap-2.5">
      <span class="shrink-0 mono text-xs grid place-items-center rounded-md"
        style="width:1.75rem;height:1.75rem;background:${i === 0 ? it.color + '22' : 'var(--surface-2)'};color:${i === 0 ? it.color : 'var(--txt-2)'};border:1px solid ${i === 0 ? it.color + '55' : 'var(--line)'}">${it.label}</span>
      <span class="flex-1 h-2 rounded-full overflow-hidden" style="background:var(--bg)">
        <span class="block h-full rounded-full grow" style="width:${(it.value / m * 100).toFixed(1)}%;background:${it.color}"></span>
      </span>
      <span class="mono text-[11px] tabular text-right" style="width:3.25rem;color:${i === 0 ? it.color : 'var(--txt-3)'}">${it.meta}</span>
    </div>`).join('');
}
