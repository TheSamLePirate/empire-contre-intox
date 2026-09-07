/* Optique de l'air stratifié — le moteur de l'atelier L34 « Les mirages ».

   L'atmosphère est décrite par un PROFIL DE TEMPÉRATURE T(z) : soit paramétrique
   (air ambiant + couche de surface chauffée ou refroidie + couche d'inversion +
   gradient standard), soit dessiné à la main (onze nœuds). Il est converti en
   indice de réfraction par la formule d'air standard de Ciddor (1996), qui donne
   la réfractivité (n − 1) en fonction de la longueur d'onde à 15 °C et 101 325 Pa,
   puis mise à l'échelle par la densité (loi de Gladstone–Dale, n − 1 ∝ P/T).
   Résultat : 2,77 × 10⁻⁴ à 15 °C et 589 nm, 2,92 × 10⁻⁴ à 0 °C — et une dispersion
   d'environ 1,5 % entre le bleu et le rouge, ce qui suffit à colorer le bord du
   Soleil couchant (le « rayon vert »).

   Le profil est ensuite DÉCOUPÉ EN COUCHES. Deux modes :
   · « marches » — indice constant par couche, le rayon est droit dans la couche
     et obéit à Snell-Descartes à chaque interface (n cos θ = constante, θ mesuré
     depuis l'horizontale) ; il peut s'y réfléchir totalement. Avec trois couches
     on voit les cassures ; c'est le modèle des manuels ;
   · « continu » — indice linéaire dans chaque couche : le rayon y est une
     parabole exacte, la pente est continue aux interfaces, et l'on retrouve la
     courbe lisse de l'atmosphère réelle. C'est le mode par défaut.

   La rondeur de la Terre est prise en compte dans le repère « Terre plate » :
   le sol y est plan, et tout rayon droit du monde réel y devient une parabole
   qui s'ÉLOIGNE du sol avec la courbure +1/R (R = 6 371 km) — c'est ce qui
   fait l'horizon. Un rayon que l'air courbe vers le bas d'exactement 1/R
   suit alors la surface : c'est le CONDUIT (duct) des mirages supérieurs.
   Au-delà du domaine local (40 km, 400 m), la réfraction astronomique
   restante est prise dans la formule de Bennett (1982). Rien n'est codé en
   dur : tout est recalculé depuis le profil. */

export const R_EARTH = 6_371_000;           // m
export const P0 = 101_325;                  // Pa
export const LAPSE_STD = -0.0065;           // K/m, gradient standard
export const Y_TOP = 60;                    // m, sommet du profil éditable
export const NODE_H = [0, 0.15, 0.4, 1, 2, 4, 8, 15, 25, 40, 60] as const;
export const LAMBDA_REF = 0.55;             // µm, longueur d'onde de référence (vert)
export const LAMBDA_RGB = [0.62, 0.55, 0.46] as const;   // µm : rouge, vert, bleu

/** Réfractivité de l'air standard (15 °C, 101 325 Pa, 450 ppm CO₂, sec) — Ciddor 1996, éq. 1. λ en µm. */
export function refractivityStd(lambdaUm: number): number {
  const s2 = 1 / (lambdaUm * lambdaUm);
  return 1e-8 * (5_792_105 / (238.0185 - s2) + 167_917 / (57.362 - s2));
}
/** Pression hydrostatique approchée (échelle de hauteur 8,4 km). */
export const pressureAt = (y: number, Ps = P0) => Ps * Math.exp(-Math.max(0, y) / 8400);
/** Indice de l'air à la température T (°C), hauteur y (m), longueur d'onde λ (µm), pression au sol Ps (Pa). */
export const airIndex = (T_C: number, y = 0, lambdaUm = LAMBDA_REF, Ps = P0) =>
  1 + refractivityStd(lambdaUm) * (288.15 / (T_C + 273.15)) * (pressureAt(y, Ps) / P0);

/* ---------------- le profil de température ---------------- */
export type ParamProfile = {
  kind: "param";
  Ta: number;      // °C, air ambiant (hors couche de surface, au niveau du sol)
  dTs: number;     // K, excès (ou déficit) de température au ras du sol
  hInv: number;    // m, hauteur de la couche d'inversion
  dInv: number;    // m, épaisseur de la couche d'inversion
  aInv: number;    // K, amplitude de l'inversion (T au-dessus − T en dessous)
};
export type NodeProfile = { kind: "nodes"; temps: number[] };
export type Profile = ParamProfile | NodeProfile;

const Z0 = 0.005, ZS = 4;                   // rugosité et épaisseur de la couche de surface (m)
/** Couche de surface : excès logarithmique, comme au-dessus d'un sol chauffé (1 au sol, 0 à ZS). */
const fSurface = (z: number) => z >= ZS ? 0 : 1 - Math.log(1 + z / Z0) / Math.log(1 + ZS / Z0);
/** Couche d'inversion : marche lissée (tanh) centrée sur hInv, de largeur dInv. */
const fInversion = (z: number, h: number, d: number) => 0.5 * (1 + Math.tanh((z - h) / Math.max(0.1, d / 2)));

export function tempAt(p: Profile, y: number): number {
  const z = Math.max(0, y);
  if (p.kind === "param") {
    return p.Ta + LAPSE_STD * z + p.dTs * fSurface(z) + p.aInv * (fInversion(z, p.hInv, p.dInv) - fInversion(0, p.hInv, p.dInv));
  }
  const H = NODE_H, t = p.temps;
  if (z >= H[H.length - 1]) return t[t.length - 1] + LAPSE_STD * (z - H[H.length - 1]);
  let i = 0;
  while (H[i + 1] < z) i++;
  const f = (z - H[i]) / (H[i + 1] - H[i]);
  return t[i] + (t[i + 1] - t[i]) * f;
}
/** Les onze températures aux nœuds (pour l'éditeur et pour passer en mode manuel). */
export const profileNodes = (p: Profile): number[] => NODE_H.map((h) => tempAt(p, h));

/** Gradient d'indice (par mètre) par différences finies. */
export function indexGradientAt(p: Profile, y: number, dy = 0.1, Ps = P0): number {
  const y0 = Math.max(0, y - dy / 2), y1 = y0 + dy;
  return (airIndex(tempAt(p, y1), y1, LAMBDA_REF, Ps) - airIndex(tempAt(p, y0), y0, LAMBDA_REF, Ps)) / dy;
}
/** Zones de conduit : là où dn/dz < −1/R, un rayon horizontal suit la surface (ou reste piégé). */
export function ducts(p: Profile, Ps = P0): { z1: number; z2: number }[] {
  const out: { z1: number; z2: number }[] = [];
  let inside = false, z1 = 0;
  for (let z = 0; z <= Y_TOP; z += 0.1) {
    const g = indexGradientAt(p, z + 0.05, 0.1, Ps);
    const duct = g < -1 / R_EARTH;
    if (duct && !inside) { inside = true; z1 = z; }
    if (!duct && inside) { inside = false; out.push({ z1, z2: z }); }
  }
  if (inside) out.push({ z1, z2: Y_TOP });
  return out.filter((d) => d.z2 - d.z1 >= 0.3);
}

/* ---------------- couches ---------------- */
export type Layers = {
  yb: Float64Array;      // N+1 frontières, croissantes, yb[0] = 0
  n: Float64Array;       // N indices (constants par couche — mode « marches »)
  nb: Float64Array;      // N+1 indices AUX frontières (mode « continu » : n linéaire dans la couche)
  T: Float64Array;       // N températures (°C) au milieu de chaque couche
  nFine: number;         // nombre de couches dans le profil éditable (0 → Y_TOP)
  continuous: boolean;   // true : gradient continu par morceaux ; false : marches d'indice + Snell
  lambda: number;        // µm
};

/** Frontières de couches ADAPTÉES au profil : on répartit les N couches à parts
 *  égales de la variation cumulée de l'indice, ∫|dn/dz| dz (plus un plancher pour ne
 *  pas laisser de zone vide). Trois couches sur une route chaude se retrouvent ainsi
 *  dans le premier mètre — là où tout se joue —, et au niveau de l'inversion s'il y en a une. */
export function layerBounds(p: Profile, N: number, Ps = P0): number[] {
  // Logarithmic sampling resolves the first millimetres of the heated surface.
  // Interpolate quantiles: snapping each one to a 5 cm cell previously skipped
  // most of the optical variation close to the ground, even with more layers.
  const grid = Array.from({ length: 2401 }, (_, i) => Z0 * (Math.exp(Math.log(1 + Y_TOP / Z0) * i / 2400) - 1));
  grid[grid.length - 1] = Y_TOP;
  const weights = grid.slice(1).map((z, i) => Math.abs(airIndex(tempAt(p, z), z, LAMBDA_REF, Ps) - airIndex(tempAt(p, grid[i]), grid[i], LAMBDA_REF, Ps)));
  const variation = weights.reduce((a, b) => a + b, 0);
  const cum = [0];
  weights.forEach((w, i) => cum.push(cum[i] + w + Math.max(variation, 1e-12) * .25 * (grid[i + 1] - grid[i]) / Y_TOP));
  const yb = [0]; let cell = 0;
  for (let k = 1; k < N; k++) {
    const target = cum[cum.length - 1] * k / N;
    while (cell < weights.length - 1 && cum[cell + 1] < target) cell++;
    const f = (target - cum[cell]) / (cum[cell + 1] - cum[cell]);
    yb.push(grid[cell] + f * (grid[cell + 1] - grid[cell]));
  }
  yb.push(Y_TOP);
  return yb;
}

/** Découpe le profil en `N` couches entre 0 et Y_TOP (frontières adaptées au
 *  profil, voir `layerBounds`), puis en couches de 10 m jusqu'à 400 m. */
export function buildLayers(p: Profile, N: number, continuous = false, lambdaUm = LAMBDA_REF, Ps = P0): Layers {
  const yb: number[] = layerBounds(p, N, Ps);
  for (let y = Y_TOP + 10; y <= 400; y += 10) yb.push(y);
  const M = yb.length - 1;
  const n = new Float64Array(M), T = new Float64Array(M), nb = new Float64Array(M + 1);
  for (let k = 0; k < M; k++) {
    const ym = 0.5 * (yb[k] + yb[k + 1]);
    T[k] = tempAt(p, ym);
    n[k] = airIndex(T[k], ym, lambdaUm, Ps);
  }
  for (let k = 0; k <= M; k++) nb[k] = airIndex(tempAt(p, yb[k]), yb[k], lambdaUm, Ps);
  return { yb: Float64Array.from(yb), n, nb, T, nFine: N, continuous, lambda: lambdaUm };
}

/** Plus petite racine strictement positive de a·x² + b·x + c = 0 (Infinity sinon). */
function firstRoot(a: number, b: number, c: number): number {
  const EPS = 1e-9;
  if (Math.abs(a) < 1e-30) { if (Math.abs(b) < 1e-30) return Infinity; const r = -c / b; return r > EPS ? r : Infinity; }
  const disc = b * b - 4 * a * c;
  if (disc < 0) return Infinity;
  const sq = Math.sqrt(disc);
  const q = -0.5 * (b + (b >= 0 ? sq : -sq));
  const r1 = q / a, r2 = q !== 0 ? c / q : Infinity;
  const lo = Math.min(r1, r2), hi = Math.max(r1, r2);
  if (lo > EPS) return lo;
  if (hi > EPS) return hi;
  return Infinity;
}

export type Pt = { x: number; y: number };
export type Hit = {
  /** le rayon a-t-il traversé le plan de l'objet (x = D) ? hauteur et pente à ce moment */
  hasD: boolean; yD: number; thD: number;
  /** issue finale : sol (à la distance xg) ou ciel (thf = élévation vraie de la direction d'arrivée, vue de l'œil) */
  kind: "ground" | "sky"; xg: number; thf: number;
  /** nombre de réflexions totales rencontrées (mode marches) */
  tir: number;
  /** hauteur minimale et maximale atteintes */
  yMin: number; yMax: number;
  /** points de rebroussement (extrema de hauteur), si le tracé est demandé */
  turns?: Pt[];
  /** tracé, si demandé */
  pts?: Pt[];
};

function layerOf(L: Layers, y: number): number {
  const yb = L.yb; let lo = 0, hi = yb.length - 2;
  if (y >= yb[hi + 1]) return hi;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (yb[m] <= y) lo = m; else hi = m - 1; }
  return lo;
}

/** Trace un rayon depuis l'œil (x = 0, hauteur y0, pente th0 en radians, > 0 vers
 *  le haut) à travers les couches, en remontant la lumière vers sa source.
 *  `D` : distance du plan de l'objet ; `xFar` : distance au-delà de laquelle on
 *  déclare « ciel ». Repère Terre plate : parabole de courbure +1/R dans chaque couche. */
export function trace(L: Layers, y0: number, th0: number, D: number, xFar: number, record = false, segLen = Infinity): Hit {
  const R = R_EARTH, yb = L.yb, n = L.n, M = n.length;
  let x = 0, y = Math.max(1e-6, y0), th = th0, k = layerOf(L, y), tir = 0, yMin = y, yMax = y;
  const hit: Hit = { hasD: false, yD: NaN, thD: NaN, kind: "sky", xg: NaN, thf: NaN, tir: 0, yMin: y, yMax: y };
  const pts: Pt[] | undefined = record ? [{ x, y }] : undefined;
  const turns: Pt[] | undefined = record ? [] : undefined;
  const push = (px: number, py: number) => { if (pts) pts.push({ x: px, y: py }); };
  let kap = 1 / R;                                            // courbure du rayon dans la couche courante (repère Terre plate)
  const curv = (kk: number) => 1 / R + (L.continuous && kk < M ? (L.nb[kk + 1] - L.nb[kk]) / ((yb[kk + 1] - yb[kk]) * n[kk]) : 0);
  const yAt = (dx: number) => y + th * dx + kap * dx * dx / 2;
  const cross = (dx: number) => {          // enregistre le passage au plan de l'objet
    if (!hit.hasD && x < D && x + dx >= D) { const d = D - x; hit.hasD = true; hit.yD = yAt(d); hit.thD = th + kap * d; }
  };
  const advance = (dx: number) => {
    cross(dx);
    if (kap !== 0) {                         // sommet de la parabole à l'intérieur du segment : point de rebroussement
      const dv = -th / kap;
      if (dv > 0 && dv < dx) { const yv = yAt(dv); yMin = Math.min(yMin, yv); yMax = Math.max(yMax, yv); if (turns) turns.push({ x: x + dv, y: yv }); }
    }
    if (pts && dx > segLen) { const m = Math.ceil(dx / segLen); for (let i = 1; i < m; i++) { const d = (dx * i) / m; push(x + d, yAt(d)); } }
    const ny = yAt(dx); yMin = Math.min(yMin, ny); yMax = Math.max(yMax, ny);
    x += dx; y = ny; th += kap * dx; push(x, y);
  };
  for (let guard = 0; guard < 6000; guard++) {
    // un rayon posé exactement sur une frontière appartient à la couche vers laquelle il se dirige
    if (th < 0 && k > 0 && y <= yb[k] + 1e-9) k--;
    else if (th > 0 && k + 1 < M && y >= yb[k + 1] - 1e-9) k++;
    const top = k < M ? yb[k + 1] : Infinity, bot = yb[k];
    kap = curv(k);
    const dxTop = top !== Infinity ? firstRoot(kap / 2, th, y - top) : Infinity;
    const dxBot = firstRoot(kap / 2, th, y - bot);
    const dxEnd = xFar - x;
    const dx = Math.min(dxTop, dxBot, dxEnd);
    if (!(dx > 0) || !Number.isFinite(dx)) break;
    advance(dx);
    // au loin : direction VRAIE par rapport à l'horizontale de l'œil — dans le repère Terre plate,
    // l'angle a grandi de x/R au fil du chemin (l'horizontale locale tourne) ; on le retire
    if (dx === dxEnd) { hit.kind = "sky"; hit.thf = th - x / R; break; }
    y = dx === dxBot ? bot : top;                             // recalage exact sur la frontière
    if (dx === dxBot) {
      if (k === 0) { hit.kind = "ground"; hit.xg = x; hit.thf = th; break; }
      if (L.continuous) { k--; }
      else {
        const c = (n[k] / n[k - 1]) * Math.cos(th);
        if (c > 1) { th = Math.abs(th); tir++; if (turns) turns.push({ x, y }); }
        else { th = -Math.acos(c); k--; }
      }
    } else {
      if (k + 1 >= M) { th = Math.abs(th); }
      else if (L.continuous) { k++; }
      else {
        const c = (n[k] / n[k + 1]) * Math.cos(th);
        if (c > 1) { th = -Math.abs(th); tir++; if (turns) turns.push({ x, y }); }
        else { th = Math.acos(c); k++; }
      }
    }
  }
  hit.tir = tir; hit.yMin = yMin; hit.yMax = yMax; if (pts) hit.pts = pts; if (turns) hit.turns = turns;
  return hit;
}

/* ---------------- réfraction astronomique au-delà du domaine ---------------- */
/** Bennett (1982) : réfraction R (en minutes d'arc) pour une hauteur APPARENTE h (degrés),
 *  air standard (10 °C, 1010 hPa). Précise à ~0,1′ au-dessus de l'horizon. */
export const bennett = (hDeg: number) => {
  const h = Math.max(-0.6, hDeg);
  return 1 / Math.tan(((h + 7.31 / (h + 4.4)) * Math.PI) / 180);
};
/** Réfraction restante entre la sortie du domaine local et l'espace, en degrés,
 *  pour un rayon qui sort avec l'élévation vraie `elDeg` : Bennett moins la part
 *  déjà intégrée dans le domaine (le fléchissement standard sur xFar), mise à l'échelle
 *  de la densité et de la dispersion. */
export function skyRefraction(elDeg: number, xFar: number, lambdaUm = LAMBDA_REF, T_C = 10, Ps = P0): number {
  const full = bennett(elDeg) / 60;                                       // degrés
  const local = (xFar * 2.7e-8 * 180) / Math.PI;                          // ~ part standard sur le domaine, en degrés
  const scale = (refractivityStd(lambdaUm) / refractivityStd(0.55)) * ((Ps / 101_000) * (283.15 / (T_C + 273.15)));
  return Math.max(0, full * scale - local);
}

/* ---------------- préréglages ---------------- */
export type PresetId = "calme" | "route" | "desert" | "mer" | "fata";
export const PRESETS: Record<PresetId, { label: string; short: string; p: ParamProfile }> = {
  calme:  { label: "Air calme · référence",              short: "Air calme",     p: { kind: "param", Ta: 15, dTs: 0,  hInv: 20, dInv: 6, aInv: 0 } },
  route:  { label: "Route chaude · mirage inférieur",    short: "Route chaude",  p: { kind: "param", Ta: 29, dTs: 24, hInv: 20, dInv: 6, aInv: 0 } },
  desert: { label: "Désert · mirage inférieur fort",     short: "Désert",        p: { kind: "param", Ta: 34, dTs: 32, hInv: 20, dInv: 6, aInv: 0 } },
  mer:    { label: "Mer froide · mirage supérieur",      short: "Mer froide",    p: { kind: "param", Ta: 8,  dTs: 0, hInv: 8, dInv: 20, aInv: 6 } },
  fata:   { label: "Inversion en couche · Fata Morgana", short: "Fata Morgana",  p: { kind: "param", Ta: 6,  dTs: 0,  hInv: 14, dInv: 2, aInv: 10 } },
};

/** Quel régime le profil décrit-il ? Sert aux textes de lecture. */
export function regime(p: Profile): "inferieur" | "superieur" | "calme" {
  const dGround = tempAt(p, 0) - tempAt(p, 2);
  const dInv = tempAt(p, 30) - tempAt(p, 1);
  if (dGround > 2.5) return "inferieur";
  if (dInv > 1.5) return "superieur";
  return "calme";
}

/** Count resolved monotonic branches of the object-height transfer function.
 * Input rays are ordered from top to bottom of the observation field. Ignore
 * branches covering <8% of the object or fewer than three samples; this is a
 * finite-resolution count, not a claim about all possible images. */
export function resolvedImages(hits: Hit[], H: number) {
    const runs: { dir: number; lo: number; hi: number; n: number; first: number; last: number }[] = [];
    let prev: number | null = null, top = -Infinity, horizon = 0;
    for (let r = 0; r < hits.length; r++) {
      const h = hits[r];
      if (h.kind === "ground") horizon = Math.max(horizon, h.xg);
      const on = h.hasD && h.yD >= 0 && h.yD <= H;
      if (on) {
        top = Math.max(top, hits.length - 1 - r);
        if (prev === null) runs.push({ dir: 0, lo: h.yD, hi: h.yD, n: 0, first: r, last: r });
        else { const d = Math.abs(prev - h.yD) < H * 1e-7 ? 0 : Math.sign(prev - h.yD); const last = runs[runs.length - 1]; if (last.dir === 0) last.dir = d; else if (d !== 0 && d !== last.dir) runs.push({ dir: d, lo: h.yD, hi: h.yD, n: 0, first: r, last: r }); }
        const rr = runs[runs.length - 1]; rr.lo = Math.min(rr.lo, h.yD); rr.hi = Math.max(rr.hi, h.yD); rr.n++; rr.last = r; prev = h.yD;
      } else prev = null;
    }
    const kept: typeof runs = [];
    for (const r of runs.filter((r) => r.hi - r.lo > H * 0.08 && r.n >= 3)) {
      const last = kept[kept.length - 1];
      if (last && last.dir === r.dir && r.first <= last.last + 1) { last.lo = Math.min(last.lo, r.lo); last.hi = Math.max(last.hi, r.hi); last.n += r.n; last.last = r.last; } else kept.push({ ...r });
    }
    return { branches: kept, topRow: Number.isFinite(top) ? hits.length - 1 - top : null, n: kept.length, droites: kept.filter((r) => r.dir >= 0).length, inv: kept.filter((r) => r.dir < 0).length, top, horizon };
}

/** Default experimental geometry, shared with the regression suite. */
export const MIRAGE_STAGES = {
  calme:  { scene: "bateau",   sol: "mer",   D: 12000, H: 30, eye: 1.6, fov: 0.6, center: 0.10,  cut: 45 },
  route:  { scene: "camion",   sol: "route", D: 800,   H: 4,  eye: 1.6, fov: 1.0, center: -0.13, cut: 5 },
  desert: { scene: "palmiers", sol: "sable", D: 1500,  H: 12, eye: 1.6, fov: 1.3, center: -0.10,  cut: 15 },
  mer:    { scene: "bateau",   sol: "mer",   D: 12000, H: 30, eye: 1.6, fov: 0.5, center: 0.07,  cut: 45 },
  fata:   { scene: "bateau",   sol: "mer",   D: 8000,  H: 18, eye: 1.6, fov: 0.6, center: 0.12, cut: 30 },
} as const;
