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
    expect(h.yD).toBeCloseTo(eye + theta * D + D * D / (2 * R_EARTH), 6);
    expect(h.thf).toBeCloseTo(theta, 9);
    const ground = trace(vacuum, eye, rad(-.1), D, 40000);
    expect(ground.kind).toBe('ground');
    expect(eye + rad(-.1) * ground.xg + ground.xg ** 2 / (2 * R_EARTH)).toBeCloseTo(0, 6);
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
    const rays = Array.from({ length: 1080 }, (_, r) => trace(L, st.eye, rad(st.center + st.fov * (.5 - r / 1079)), st.D, Math.max(st.D * 3, 40000)));
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
    const reference = rays.map((_, r) => trace(vacuum, st.eye, rad(st.center + st.fov * (.5 - r / 1079)), st.D, Math.max(st.D * 3, 40000)));
    expect(resolvedImages(reference, st.H).n).toBe(1);
    if (id === 'mer') {
      const neutral = resolvedImages(reference, st.H);
      const liftMinutes = (neutral.topRow! - result.topRow!) * st.fov * 60 / 1079;
      expect(liftMinutes).toBeGreaterThan(4.5);
      expect(liftMinutes).toBeLessThan(5.5);
    }
  });
});
