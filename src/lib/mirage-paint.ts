/** Peinture de la vue de l'observateur — module PUR (sans DOM), partagé par
 *  l'atelier L34 et son worker. Une ligne de l'image = un rayon remonté depuis
 *  l'œil (`Hit`) ; la couleur de chaque pixel dépend de ce que ce rayon a fini
 *  par rencontrer : le ciel (direction vraie, Soleil compris), le sol (distance
 *  au sol), l'objet (silhouette vectorielle, ou texture dessinée ensuite par la
 *  page) ou rien de résolu (hachures). */
import { farFieldRefraction, tempAt, LAMBDA_REF, LAMBDA_RGB, R_EARTH, DOMAIN_TOP, type Hit, type Profile } from "./mirage-optics";
import { surfaceMix, geometricGround } from "./mirage-composite";

export type SceneId = "bateau" | "phare" | "palmiers" | "camion";
export type SolId = "mer" | "route" | "sable";
export type RGB = [number, number, number];
export type RowSet = { G: Hit[]; R: (Hit | null)[]; B: (Hit | null)[] };

export const SUN_R = 0.2665;                                 // rayon angulaire du Soleil, en degrés (32′ de diamètre)
export const SUN_LAT = -0.42;                                // décalé sur la gauche, pour ne pas se cacher derrière l'objet
export const HAZE: RGB = [177, 192, 195];
const SUN_C: RGB = [255, 250, 232], SUN_E: RGB = [255, 222, 160];
const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const mix = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

/** Élévation VRAIE de la source céleste d'un rayon sorti du domaine : sa direction de
 *  sortie moins la réfraction restante au-dessus du domaine (raccord de Bennett tabulé
 *  sur la colonne standard à la température de l'œil — voir `farFieldRefraction`). */
export function trueElevation(h: Hit, lambda: number, profile: Profile, Ps: number, eye: number, xFar: number): number {
  const exitDeg = toDeg(h.thf);
  return exitDeg - farFieldRefraction({ exitDeg, exitX: h.end?.x ?? xFar, exitY: h.end?.y ?? DOMAIN_TOP, eye, T: tempAt(profile, eye), P: Ps, lambda });
}

export function skyRGB(el: number): RGB {                    // élévation apparente, en degrés
  if (el <= 0) return [232, 190, 132];
  if (el < 0.8) return mix([232, 190, 132], [198, 184, 166], el / 0.8);
  if (el < 3) return mix([198, 184, 166], [122, 158, 204], (el - 0.8) / 2.2);
  return mix([122, 158, 204], [58, 92, 156], clamp((el - 3) / 6, 0, 1));
}
export const plainSkyRGB = (elApp: number): RGB => mix([211, 220, 219], [80, 153, 197], clamp(Math.max(0, elApp) / 0.65, 0, 1));
/** Masque du disque solaire (0 → 1) avec assombrissement du bord, pour une direction VRAIE (el, lat). */
export function sunMask(elTrue: number, lat: number, sunEl: number): number {
  const d = Math.hypot(lat - SUN_LAT, elTrue - sunEl);
  if (d >= SUN_R) return 0;
  const u = d / SUN_R;
  return 1 - 0.35 * u * u;
}
export function sunGlow(elTrue: number, lat: number, sunEl: number): number {
  const d = Math.hypot(lat - SUN_LAT, elTrue - sunEl);
  return d < SUN_R ? 1 : Math.exp(-(d - SUN_R) / 0.16);
}
export function groundRGB(sol: SolId, xg: number, latM: number, footprint = 0): RGB {
  if (sol === "mer") {
    const f = 1 - Math.exp(-xg / 16000);
    const w = Math.sin(xg * .065 + 1.7 * Math.sin(latM * .03)) * Math.sin(xg * .029 - latM * .024);
    const fine = Math.sin(xg * 2.17 + latM * .29) * Math.sin(latM * .17 - xg * 1.41);
    const light = (12 * w + 13 * Math.pow(Math.max(0, w), 9)) / (1 + footprint * .06) + 4 * fine / (1 + footprint * .8);
    return mix([56 + light, 96 + light, 111 + light], [173, 196, 204], f * .75);
  }
  if (sol === "route") {
    const f = 1 - Math.exp(-xg / 5500);
    const grit = 4 * Math.sin(xg * 13.73 + latM * 39.8) * Math.sin(xg * 5.3 - latM * 57);
    let base: RGB = [57 + grit, 61 + grit, 65 + grit];
    const m = Math.abs(latM);
    if (m > 3.6) base = [169 + grit, 148 + grit, 105 + grit];
    else if (Math.abs(m - 3.35) < 0.12) base = [188, 186, 176];
    else if (m < 0.13 && Math.floor(xg / 12) % 2 === 0) base = [200, 198, 186];
    return mix(base, HAZE, f * 0.85);
  }
  const f = 1 - Math.exp(-xg / 12000);
  const u = 6 * Math.sin(xg / 37 + latM * 0.05) + 2 * Math.sin(xg * 3.4 + latM * 1.9);
  return mix([206 + u, 175 + u, 120 + u], HAZE, f * 0.8);
}

/** Silhouette vectorielle de l'objet : couleur au point (xl latéral, y hauteur), en mètres ; null = transparent. */
export function sceneRGB(s: SceneId, xl: number, y: number, H: number): RGB | null {
  const u = xl / H, v = y / H;
  if (v < 0 || v > 1.02) return null;
  if (s === "bateau") {
    if (Math.abs(u + 1.5) < 0.03 && v < 1.0 && v > 0.2) return [40, 44, 52];
    if (Math.abs(u) < .018 && v > .48 && v < 1.0) return [50, 65, 73];
    if (Math.abs(u) < 0.5 && v > 0.97 && v < 1.0) return [40, 44, 52];
    if (Math.abs(u - 1.45) < 0.08 && v >= 0.75 && v < 0.9) return [178, 58, 58];
    if (Math.abs(u - 1.2) < 0.25 && v >= 0.6 && v < 0.75) return (v > 0.66 && v < 0.71) ? [30, 36, 48] : [214, 220, 226];
    if (Math.abs(u - 1.2) < 0.35 && v >= 0.22 && v < 0.6) return (Math.floor((v - 0.22) / 0.1) % 2 === 1 && Math.abs(((u - 1.2 + 0.35) % 0.14) - 0.07) < 0.02) ? [60, 70, 84] : [200, 206, 212];
    if (Math.abs(u + 0.2) < 1.1 && v >= 0.22 && v < 0.5) {
      const col = Math.floor((u + 1.3) / 0.28), row = Math.floor((v - 0.22) / 0.14);
      const pal: RGB[] = [[168, 72, 56], [56, 120, 128], [190, 150, 70], [88, 96, 110], [120, 60, 80]];
      const base = pal[(col * 3 + row * 5) % pal.length]!;
      return mix(base, [30, 42, 48], .13 + .12 * Math.sin(u * 230) ** 2);
    }
    const bow = u > 1.6 ? clamp((2.4 - u) / 0.8, 0, 1) : 1;
    if (Math.abs(u) < 2.4 && v < 0.22 * bow + 0.02) return v < 0.05 ? [103, 50, 41] : mix([25, 40, 50], [73, 91, 97], v * 3);
    return null;
  }
  if (s === "phare") {
    const w = 0.12 * (1 - 0.3 * v);
    if (Math.abs(u) < 0.9 && v < 0.06 * (1 - (u / 0.9) * (u / 0.9))) return [52, 48, 46];
    if (v < 0.85 && Math.abs(u) < w) return ((v > 0.25 && v < 0.4) || (v > 0.55 && v < 0.7)) ? [178, 58, 58] : [232, 226, 212];
    if (v >= 0.85 && v < 0.95 && Math.abs(u) < 0.15) return (v > 0.87 && v < 0.93) ? [255, 226, 150] : [40, 44, 52];
    if (v >= 0.95 && Math.abs(u) < 0.15 * (1 - (v - 0.95) / 0.07)) return [40, 44, 52];
    return null;
  }
  if (s === "palmiers") {
    if (Math.abs(u) < 3 && v < 0.15 * (1 - (u / 3) * (u / 3))) return [150, 118, 74];
    for (const xc of [-1.2, 0.1, 1.4]) {
      const bend = xc + 0.15 * v * v;
      const cx = bend + 0.15, cy = 0.8;
      const e = ((u - cx) / 0.45) ** 2 + ((v - cy) / 0.24) ** 2;
      if (e < 1 && !(e > 0.55 && Math.sin((u - cx) * 22 + v * 9) > 0.55)) return [42, 104, 62];
      if (v < 0.78 && Math.abs(u - bend) < 0.05) return [104, 76, 44];
    }
    return null;
  }
  // Semi-remorque : carrosserie modelée, vitrage, tôle et roues concentriques.
  for (const xc of [-0.96, 0.72, 1.06]) {
    const rr = Math.hypot(u - xc, v - 0.145);
    if (rr < 0.145) {
      if (rr < 0.035) return [69, 77, 82];
      if (rr < 0.084) return mix([145, 157, 165], [72, 83, 95], rr / 0.084);
      return mix([19, 24, 29], [44, 49, 52], clamp((v + .02) / .3, 0, 1));
    }
  }
  if (u > -.53 && u < 1.3 && v >= .31 && v < 1) {
    if (v > .977 || v < .34 || u > 1.27 || u < -.51) return [115, 128, 135];
    const rib = 6 * Math.sin(u * 170) + (Math.abs(((u + .53) % .30) - .15) < .005 ? -25 : 0);
    const shade = 188 + 36 * v + rib;
    if (v < .40 && Math.floor((u + .53) * 12) % 2 === 0) return [197, 145, 97];
    return [shade - 6, shade, shade + 3];
  }
  if (u > -1.3 && u < -.57 && v > .25 && v < .84) {
    const roof = .84 - Math.max(0, -u - 1.1) * .55;
    if (v > roof) return null;
    if (v > .53 && v < .74 && u < -.68 && u > -1.24 + (v - .53) * .25) return mix([31, 55, 66], [101, 146, 159], (v - .53) / .21);
    if (u < -1.22 && v < .4 && v > .33) return [244, 220, 157];
    if (Math.abs(v - .49) < .009 && u > -.84 && u < -.69) return [51, 64, 66];
    if (Math.abs(u + .64) < .009 || v < .285) return [73, 91, 96];
    const lit = 0.4 + .5 * Math.sin((v - .25) * 2.7);
    return mix([21, 68, 79], [66, 131, 142], lit);
  }
  if (u > -1.35 && u < -1.27 && v > .54 && v < .65) return [38, 51, 57];
  if (u > -.52 && u < 1.3 && v >= .23 && v < .31) return [43, 52, 59];
  return null;
}
/** Colonne la plus haute de chaque silhouette (pour compter les images) et demi-largeur, en unités de H. */
export const PROBE: Record<SceneId, { u: number; half: number }> = { bateau: { u: 1.2, half: 2.4 }, phare: { u: 0, half: 0.9 }, palmiers: { u: 0.25, half: 3 }, camion: { u: 0.35, half: 1.3 } };
/** Profil latéral (vue de côté). */
export function sideProfile(s: SceneId): [number, number][] {
  if (s === "bateau") return [[0, 0], [1, 0], [1, 0.22], [0.75, 0.22], [0.75, 0.6], [0.65, 0.6], [0.65, 0.75], [0.5, 0.75], [0.5, 0.6], [0.2, 0.6], [0.2, 0.5], [0, 0.5]];
  if (s === "phare") return [[0.35, 0], [0.65, 0], [0.62, 0.85], [0.7, 0.85], [0.7, 0.95], [0.5, 1.02], [0.3, 0.95], [0.3, 0.85], [0.38, 0.85]];
  if (s === "palmiers") return [[0.3, 0], [0.42, 0], [0.45, 0.72], [0.8, 0.78], [0.9, 0.9], [0.5, 1.0], [0.15, 0.9], [0.2, 0.78], [0.38, 0.72]];
  return [[0, 0.25], [1, 0.25], [1, 1], [0.35, 1], [0.35, 0.85], [0, 0.85]];
}

/** Ce qu'il faut savoir pour peindre une image, indépendamment du DOM. */
export type PaintParams = {
  width: number; height: number;                // résolution du raster
  fov: number; center: number;                  // cadrage (degrés)
  eye: number; D: number; H: number; xFar: number;
  scene: SceneId; sol: SolId;
  sun: boolean; sunEl: number; useRGB: boolean;
  surfaceBlend: number;
  hasSprite: boolean;                           // texture dessinée ensuite par la page : la silhouette vectorielle n'est pas peinte
  reference: boolean;                           // témoin sans réfraction : ciel géométrique, pas de fusion sol/ciel
  profile: Profile; Ps: number;
};

/** Élévation apparente de la ligne r (degrés). */
export const rowElevation = (p: { center: number; fov: number; height: number }, r: number) => p.center + p.fov * (0.5 - r / (p.height - 1));

/** Peint les `height` lignes de `rows` dans un tampon RGBA (nouveau ou fourni). */
export function paintRows(rows: RowSet, p: PaintParams, out?: Uint8ClampedArray): Uint8ClampedArray {
  const { width: W, height: HPX, fov, center, eye, D, H, xFar, scene, sol, sun, sunEl, useRGB, surfaceBlend, profile, Ps } = p;
  const px = out && out.length === W * HPX * 4 ? out : new Uint8ClampedArray(W * HPX * 4);
  const fovH = fov * (W / HPX);
  const hazeObj = 1 - Math.exp(-D / 26000);
  const surface = p.reference ? null : surfaceMix(rows.G, surfaceBlend);
  const dip = -toDeg(Math.acos(R_EARTH / (R_EARTH + eye)));
  const trueEl = (h: Hit, lambda: number) => p.reference ? toDeg(h.thf) : trueElevation(h, lambda, profile, Ps, eye, xFar);
  for (let r = 0; r < HPX; r++) {
    const hG = rows.G[r]!, hR = p.reference ? null : rows.R[r] ?? null, hB = p.reference ? null : rows.B[r] ?? null;
    const elRow = rowElevation({ center, fov, height: HPX }, r);
    const elApp = hG.kind === "sky" ? toDeg(hG.thf) : 0;
    const skyBase = hG.kind === "sky" ? (sun ? skyRGB(elApp) : plainSkyRGB(elApp)) : null;
    const tG = hG.kind === "sky" ? trueEl(hG, LAMBDA_REF) : 0;
    const tR = hR && hR.kind === "sky" ? trueEl(hR, LAMBDA_RGB[0]) : tG;
    const tB = hB && hB.kind === "sky" ? trueEl(hB, LAMBDA_RGB[2]) : tG;
    const adjacent = rows.G[Math.min(HPX - 1, r + 1)]!;
    const footprint = hG.kind === "ground" && adjacent.kind === "ground" ? Math.abs(adjacent.xg - hG.xg) : 10000;
    const distance = p.reference ? null : geometricGround(eye, toRad(elRow));
    const underlay = !p.reference && surfaceBlend > 0 && hG.kind === "sky" && hG.yMin < eye && distance !== null;
    const coverage = underlay ? surfaceBlend * (.15 + .5 * clamp((dip - elRow) / .12, 0, 1)) : 0;
    const blend = surface?.[r] ?? null;
    const other = blend ? rows.G[blend.row]! : null;
    const paintObject = !p.hasSprite && hG.hasD && hG.yD >= 0 && hG.yD <= H * 1.02;
    for (let c = 0; c < W; c++) {
      const la = toRad((c / (W - 1) - 0.5) * fovH);
      let col: RGB | null = null;
      let opaque = false;
      if (paintObject) {
        const o = sceneRGB(scene, la * D, hG.yD, H);
        if (o) { col = mix(o, HAZE, hazeObj * 0.75); opaque = true; }
      }
      if (!col) {
        if (hG.kind === "ground") col = groundRGB(sol, hG.xg, la * hG.xg, footprint);
        else if (hG.kind === "unresolved") col = ((r + c) % 24 < 12) ? [85, 82, 94] : [91, 88, 100];
        else {
          const latD = toDeg(la);
          if (!sun) {
            const cloud = Math.pow(Math.max(0, Math.sin(elApp * 19 + latD * 1.6) * Math.sin(latD * 3.2 - elApp * 5)), 8) * .16;
            col = mix(skyBase!, [244, 243, 231], cloud);
          } else {
            const g = sunGlow(tG, latD, sunEl);
            const base: RGB = [Math.min(255, skyBase![0] + 26 * g), Math.min(255, skyBase![1] + 30 * g), Math.min(255, skyBase![2] + 40 * g)];
            const mR = useRGB && hR?.kind === "ground" ? 0 : sunMask(useRGB ? tR : tG, latD, sunEl), mG = sunMask(tG, latD, sunEl), mB = useRGB && hB?.kind === "ground" ? 0 : sunMask(useRGB ? tB : tG, latD, sunEl);
            col = [mR > 0 ? lerp(SUN_E[0], SUN_C[0], mR) : base[0], mG > 0 ? lerp(SUN_E[1], SUN_C[1], mG) : base[1], mB > 0 ? lerp(SUN_E[2], SUN_C[2], mB) : base[2]];
          }
        }
      }
      // Le sol géométrique reste faiblement lisible à travers la zone de mirage du ciel, jamais à travers le vrai ciel.
      if (!opaque && coverage > 0) col = mix(col, groundRGB(sol, distance!, la * distance!, Math.max(1, distance! * .002)), coverage);
      if (blend && other && !opaque) {
        const alternate: RGB = other.kind === "ground" ? groundRGB(sol, other.xg, la * other.xg, Math.max(1, other.xg * .003)) : (sun ? skyRGB(toDeg(other.thf)) : plainSkyRGB(toDeg(other.thf)));
        const grain = sol === "route" ? .88 + .12 * Math.sin(la * (hG.kind === "ground" ? hG.xg : other.xg) * 2.1) ** 2 : 1;
        col = mix(col, alternate, blend.weight * grain);
      }
      const i = (r * W + c) * 4; px[i] = col[0]; px[i + 1] = col[1]; px[i + 2] = col[2]; px[i + 3] = 255;
    }
  }
  return px;
}

/** Un rayon de l'éventail de la vue de côté (tracé complet, borné à sa fin utile). */
export type FanRay = { pts: { x: number; y: number }[]; kind: "obj" | "ground" | "sky" | "unresolved"; e: number; turns: { x: number; y: number }[] };
