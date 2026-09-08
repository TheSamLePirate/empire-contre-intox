import { describe, expect, it } from 'vitest';
import { airIndex, buildLayers, indexGradientAt, PRESETS, R_EARTH, resolvedImages, trace } from '../src/lib/mirage-optics';

const rad = (v: number) => v * Math.PI / 180;
function image(preset: keyof typeof PRESETS, resolution: number, field = .7, center = -.06, D = 1200, H = 4) {
  const layers = buildLayers(PRESETS[preset].p, 240, true);
  const hits = Array.from({ length: resolution }, (_, r) => trace(layers, 1.6, rad(center + field * (.5 - r / (resolution - 1))), D, 40000));
  return resolvedImages(hits, H);
}

describe('Mirage optics and observer measurements', () => {
  it('has the expected air index, density response and visible dispersion', () => {
    expect(airIndex(15, 0, .589)).toBeCloseTo(1.000277, 6);
    expect(airIndex(50, 0, .589)).toBeLessThan(airIndex(15, 0, .589));
    expect(airIndex(15, 0, .460)).toBeGreaterThan(airIndex(15, 0, .620));
    expect(indexGradientAt(PRESETS.route.p, .05)).toBeGreaterThan(0);
    expect(indexGradientAt(PRESETS.calme.p, .05)).toBeLessThan(0);
  });
  it('keeps Earth curvature when refraction is disabled', () => {
    const air = buildLayers(PRESETS.route.p, 240, true);
    const vacuum = { ...air, n: air.n.map(() => 1), nb: air.nb.map(() => 1) };
    const eye = 1.6, D = 1200, theta = rad(.1);
    const h = trace(vacuum, eye, theta, D, 40000);
    expect(h.hasD).toBe(true);
    expect(h.yD).toBeCloseTo((R_EARTH + eye) * Math.cos(theta) / Math.cos(theta + D/R_EARTH) - R_EARTH, 6);
    expect(h.thf).toBeCloseTo(theta, 9);
    const ground = trace(vacuum, eye, rad(-.1), D, 40000);
    expect(ground.kind).toBe('ground');
    expect((R_EARTH + eye) * Math.cos(rad(-.1)) / Math.cos(rad(-.1) + ground.xg/R_EARTH) - R_EARTH).toBeCloseTo(0, 6);
  });
  it.each([240, 1080, 2160])('resolves the road reflection at %i rows', (rows) => {
    const result = image('route', rows);
    expect(result.n).toBe(2);
    expect(result.inv).toBe(1);
    expect(result.droites).toBe(1);
  });
  it.each([240, 1080, 2160])('resolves all three Fata Morgana branches at %i rows', (rows) => {
    const result = image('fata', rows, 1.15, .22, 8000, 60);
    expect(result.n).toBe(3);
    expect(result.inv).toBe(1);
    expect(result.droites).toBe(2);
  });
  it('reports no resolved object if the view points above it', () => {
    expect(image('route', 480, .2, 2).n).toBe(0);
    expect(image('route', 480, .2, 2).topRow).toBeNull();
  });
  it.each(Object.keys(PRESETS) as (keyof typeof PRESETS)[])('traces finite rays for %s in every layer mode', (preset) => {
    for (const count of [3, 6, 12, 24, 60]) {
      const L = buildLayers(PRESETS[preset].p, count, count === 60);
      for (const angle of [-.8, -.2, 0, .2, .8]) {
        const h = trace(L, 1.6, rad(angle), 8000, 40000, true, 500);
        expect(Number.isFinite(h.thf)).toBe(true);
        expect(h.yMin).toBeGreaterThanOrEqual(-1e-7);
        expect(h.pts!.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y))).toBe(true);
      }
    }
  });
});

// This independent RK4 integration evaluates the continuous index profile; it
// does not use layer boundaries, parabola intersections or the rendering code.
import { MIRAGE_STAGES, tempAt, layerBounds } from '../src/lib/mirage-optics';
function integrateProfile(preset: keyof typeof PRESETS, D: number, degrees: number) {
  const profile = PRESETS[preset].p, dx = .5;
  let y = 1.6, slope = rad(degrees);
  const curvature = (z: number) => {
    const d = .00001, lower = Math.max(0, z - d);
    const gradient = (airIndex(tempAt(profile, z + d), z + d) - airIndex(tempAt(profile, lower), lower)) / (z + d - lower);
    return 1 / R_EARTH + gradient / airIndex(tempAt(profile, z), z);
  };
  for (let x = 0; x < D; x += dx) {
    const a = curvature(y), b = curvature(y + slope * dx / 2);
    const c = curvature(y + slope * dx / 2 + a * dx * dx / 4), d = curvature(y + slope * dx + b * dx * dx / 2);
    y += slope * dx + (a + b + c) * dx * dx / 6;
    slope += (a + 2 * b + 2 * c + d) * dx / 6;
    if (y < 0) throw new Error('Test ray intersects ground before object');
  }
  return y;
}
describe('HD experiments match their advertised phenomenon', () => {
  it.each([
    ['route', 800, -.2], ['route', 800, -.3], ['desert', 1500, -.2],
    ['mer', 12000, .04], ['fata', 8000, .08], ['fata', 8000, .16], ['fata', 8000, .22],
  ] as const)('agrees with independent RK4: %s at %s m, %s°', (id, D, angle) => {
    const h = trace(buildLayers(PRESETS[id].p, 240, true), 1.6, rad(angle), D, Math.max(40000, D * 3));
    expect(h.hasD).toBe(true);
    expect(h.tir).toBe(0);
    expect(Math.abs(h.yD - integrateProfile(id, D, angle))).toBeLessThan(.02);
  });
  it('resolves millimetre-scale surface gradients without duplicate boundaries', () => {
    const bounds = layerBounds(PRESETS.route.p, 240);
    expect(bounds[1]).toBeLessThan(.005);
    expect(bounds).toHaveLength(241);
    expect(bounds.at(-1)).toBe(60);
    expect(bounds.every((z, i) => i === 0 || z > bounds[i - 1])).toBe(true);
  });
  it.each(['route', 'desert', 'mer', 'fata', 'calme'] as const)('stages the intended %s effect at full HD', (id) => {
    const st = MIRAGE_STAGES[id], L = buildLayers(PRESETS[id].p, 240, true);
    const rays = Array.from({ length: 1080 }, (_, r) => trace(L, st.eye, rad(st.center + st.fov * (.5 - r / 1079)), st.D, 120000));
    const result = resolvedImages(rays, st.H);
    expect(result.n).toBe({ route: 2, desert: 2, mer: 1, fata: 3, calme: 1 }[id]);
    if (id === 'route' || id === 'desert') {
      expect(result.inv).toBe(1);
      // The inverted branch must be below the upright branch, with genuine
      // sky rays seen below it and actual foreground in the lower image.
      expect(result.branches.map(b => b.dir)).toEqual([1, -1]);
      const inverted = result.branches[1];
      // Beside the silhouette, rays in the inverted band reach the sky after
      // turning above the hot ground: no water plane is involved.
      expect(rays.some((h, i) => i >= inverted.first && h.kind === 'sky' && h.yMin < st.eye - .05)).toBe(true);
      expect(rays.slice(950).every(h => h.kind === 'ground')).toBe(true);
    }
    if (id === 'fata') {
      expect(result.branches.map(b => b.dir)).toEqual([1, -1, 1]);
      const inverted = result.branches[1];
      expect((inverted.hi - inverted.lo) / st.H).toBeGreaterThan(.6);
      expect(inverted.last - inverted.first).toBeGreaterThan(150);
    }
    const vacuum = { ...L, n: L.n.map(() => 1), nb: L.nb.map(() => 1) };
    const reference = rays.map((_, r) => trace(vacuum, st.eye, rad(st.center + st.fov * (.5 - r / 1079)), st.D, 120000));
    expect(resolvedImages(reference, st.H).n).toBe(1);
    if (id === 'mer') {
      const neutral = resolvedImages(reference, st.H);
      const liftMinutes = (neutral.topRow! - result.topRow!) * st.fov * 60 / 1079;
      expect(liftMinutes).toBeGreaterThan(4.5);
      expect(liftMinutes).toBeLessThan(5.5);
    }
  });
});

// Physical anchors from the literature. The standard atmosphere is the `calme`
// preset (15 °C at the ground, −6.5 K/km, 1013.25 hPa), traced exactly as the
// component builds `layersG` (240 layers, continuous mode, 0.55 µm, eye 1.6 m).
import { bennett, bennettScale, farFieldRefraction, skyRefraction, LAMBDA_REF, LAMBDA_RGB, NODE_H, type Hit, type NodeProfile } from '../src/lib/mirage-optics';
const STD = PRESETS.calme.p, PS = 1013.25 * 100, EYE = 1.6, XFAR = 120000;
const layersLike = (lambda = LAMBDA_REF, p = STD) => buildLayers(p, 240, true, lambda, PS);
/** total refraction (arcmin) of a sky ray seen at apparent elevation `deg`: integrated part + far-field remainder */
function totalRefraction(deg: number, L = layersLike(), p = STD, lambda = LAMBDA_REF): { local: number; rem: number; total: number; hit: Hit } {
  const hit = trace(L, EYE, rad(deg), MIRAGE_STAGES.calme.D, XFAR);
  const exitDeg = hit.thf * 180 / Math.PI, local = deg - exitDeg;
  const rem = farFieldRefraction({ exitDeg, exitX: hit.end!.x, exitY: hit.end!.y, eye: EYE, T: tempAt(p, EYE), P: PS, lambda });
  return { local: local * 60, rem: rem * 60, total: (local + rem) * 60, hit };
}
describe('Physical anchors: standard atmosphere, ducting threshold, Bennett and the far-field junction', () => {
  it('(a) standard atmosphere: dn/dz ≈ −2.7e-8 /m near the ground and k = |dn/dz|·R ≈ 0.17', () => {
    const g = indexGradientAt(STD, .5, .1, PS);
    expect(g).toBeGreaterThan(-2.8e-8);
    expect(g).toBeLessThan(-2.6e-8);
    expect(Math.abs(-g * R_EARTH - .17)).toBeLessThan(.02);
  });
  it('(b) ducting threshold: dn/dz = −1/R for a linear profile at 0 °C needs dT/dz ≈ +0.114 K/m', () => {
    // bisection on the lapse rate γ of a linear node profile, through the engine's own gradient
    const gradientFor = (gamma: number) => { const p: NodeProfile = { kind: 'nodes', temps: NODE_H.map((h) => gamma * h) }; return indexGradientAt(p, .7, .1, PS); };
    let lo = 0, hi = .3;
    for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (gradientFor(m) > -1 / R_EARTH) lo = m; else hi = m; }
    expect(Math.abs((lo + hi) / 2 - .114)).toBeLessThan(.005);
  });
  it('(c) Bennett: 34.5′ ± 0.2′ at the apparent horizon, ≈ 0.99′ at 45°', () => {
    expect(Math.abs(bennett(0) - 34.5)).toBeLessThan(.2);
    expect(Math.abs(bennett(45) - .99)).toBeLessThan(.03);
    expect(bennettScale(.55, 10, 101000)).toBeCloseTo(1, 12);
  });
  it('(d) far-field junction: the standard profile lands on Bennett(apparent)·scale — 34′ at the horizon, ≈ 28.4′ at 0.5°', () => {
    const s = bennettScale(LAMBDA_REF, tempAt(STD, EYE), PS);
    const L = layersLike();
    const horizon = totalRefraction(0, L);
    expect(horizon.hit.kind).toBe('sky');
    expect(Math.abs(horizon.total - 34)).toBeLessThan(.7);
    expect(Math.abs(horizon.total - bennett(0) * s)).toBeLessThan(.15);        // 33.99′ for 15 °C, 1013.25 hPa
    expect(horizon.local).toBeGreaterThan(6.5);                                // ≈ 7.1′ integrated over the first 400 m
    expect(horizon.local).toBeLessThan(7.7);
    for (const deg of [.25, .5, 1, 3]) expect(Math.abs(totalRefraction(deg, L).total - bennett(deg) * s)).toBeLessThan(.15);
    const half = totalRefraction(.5, L).total;                                 // 28.35′ : Bennett(0.5°) = 28.7′ scaled to 15 °C
    expect(half).toBeGreaterThan(27.9);
    expect(half).toBeLessThan(29);
    // the legacy junction (Bennett evaluated on the exit direction) overshot by more than 1′ at the horizon
    const legacy = horizon.local + 60 * skyRefraction(horizon.hit.thf * 180 / Math.PI, horizon.hit.end!.x, LAMBDA_REF, tempAt(STD, 400), PS);
    expect(legacy - horizon.total).toBeGreaterThan(1);
    // dispersion: blue is refracted more than red, by about 1.3 % of the total
    const red = totalRefraction(0, layersLike(LAMBDA_RGB[0]), STD, LAMBDA_RGB[0]).total, blue = totalRefraction(0, layersLike(LAMBDA_RGB[2]), STD, LAMBDA_RGB[2]).total;
    expect(blue / red - 1).toBeGreaterThan(.011);
    expect(blue / red - 1).toBeLessThan(.015);
  });
  it('(d′) the junction keeps the extra bending of an inversion instead of collapsing to Bennett', () => {
    const inv = totalRefraction(.15, layersLike(LAMBDA_REF, PRESETS.mer.p), PRESETS.mer.p);
    expect(inv.hit.kind).toBe('sky');
    expect(inv.local).toBeGreaterThan(12);                                     // ≈ 14.3′ through the cold-sea inversion, vs 5.5′ standard
    expect(inv.total - bennett(.15) * bennettScale(LAMBDA_REF, tempAt(PRESETS.mer.p, EYE), PS)).toBeGreaterThan(5);
    expect(inv.rem).toBeGreaterThan(24);                                       // the remainder above 400 m stays of the standard order
    expect(inv.rem).toBeLessThan(30);
  });
  it('(e) the setting Sun with its lower limb on the apparent horizon is squeezed to ≈ 25–27′ vertically', () => {
    const SUN_R = .2665, L = layersLike();                                     // same disc as the component
    const trueEl = (deg: number) => deg - totalRefraction(deg, L).total / 60;
    const centre = trueEl(0) + SUN_R;                                          // lower limb exactly at apparent 0°
    let lo = 0, hi = 1;                                                        // apparent elevation of the upper limb
    for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (trueEl(m) < centre + SUN_R) lo = m; else hi = m; }
    const diameter = 60 * (lo + hi) / 2;
    expect(diameter).toBeGreaterThan(25);
    expect(diameter).toBeLessThan(27);
    expect(diameter).toBeLessThan(2 * SUN_R * 60);
  });
  it('falls back to Bennett seen from the exit point when the ray leaves elsewhere than the domain top', () => {
    const atTop = farFieldRefraction({ exitDeg: 2, exitX: 10000, exitY: 400, eye: EYE, T: 15, P: PS });
    const lower = farFieldRefraction({ exitDeg: 2, exitX: 10000, exitY: 200, eye: EYE, T: 15, P: PS });
    expect(lower).toBeGreaterThan(atTop);                                      // more air left above 200 m than above 400 m
    expect(farFieldRefraction({ exitDeg: NaN, exitX: 1, eye: EYE })).toBe(0);
  });
});
