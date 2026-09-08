import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { buildLayers, PRESETS, MIRAGE_STAGES } from '../src/lib/mirage-optics';

/** Le worker publié (bundle esbuild) : tracé + peinture hors du fil principal, une
 *  réponse par instantané puis « done », abandon possible entre deux instantanés. */
function makeWorker() {
  const received: any[] = [];
  const scope: any = { postMessage: (message: any) => received.push(message), setTimeout, console };
  runInNewContext(readFileSync('provoxys/lumiere/assets/mirage-worker.js', 'utf8'), scope);
  return { received, scope };
}
const paint = (height: number, reference = false) => ({
  width: Math.round(height * 2.2), height, fov: 1, center: -.13, eye: 1.6, D: MIRAGE_STAGES.route.D, H: 4, xFar: 2000,
  scene: 'camion', sol: 'route', sun: false, sunEl: -.45, useRGB: false, surfaceBlend: .65, hasSprite: false, reference, profile: PRESETS.route.p, Ps: 101325,
});

it('traces, paints and reports each snapshot, then signals completion', async () => {
  const { received, scope } = makeWorker();
  const G = { ...buildLayers(PRESETS.route.p, 240, true), motion: { amplitude: .3, thermal: .3, wavelength: 1200, frequency: .4, time: 0 } };
  await scope.onmessage({ data: { type: 'trace', id: 1, G, R: null, B: null, frames: 3, paint: paint(8), fan: { n: 4, segLen: 50, H: 4, objectMask: [1, 1, 1, 1] } } });
  expect(received.map((x) => x.type)).toEqual(['frame', 'frame', 'frame', 'done']);
  expect(received.filter((x) => x.type === 'frame').map((x) => x.frame)).toEqual([0, 1, 2]);
  const f = received[0];
  expect(f.rows.G).toHaveLength(8); expect(f.rows.R.every((v: any) => v === null)).toBe(true);
  expect(f.fan).toHaveLength(4); expect(f.fan[0].pts.length).toBeGreaterThan(1);
  expect(f.pixels.byteLength).toBe(Math.round(8 * 2.2) * 8 * 4);
  expect(new Uint8ClampedArray(f.pixels)[3]).toBe(255);
});

it('repaints cached rows without retracing and paints the vacuum reference', async () => {
  const { received, scope } = makeWorker();
  const G = buildLayers(PRESETS.route.p, 240, true);
  await scope.onmessage({ data: { type: 'trace', id: 1, G, R: null, B: null, frames: 1, paint: paint(6) } });
  const before = new Uint8ClampedArray(received[0].pixels).slice();
  await scope.onmessage({ data: { type: 'paint', id: 2, paint: { ...paint(6), sol: 'mer' } } });
  expect(received.map((x) => x.type)).toEqual(['frame', 'done', 'frame', 'done']);
  expect(received[2].id).toBe(2);
  expect(received[2].rows).toEqual(received[0].rows);
  expect(new Uint8ClampedArray(received[2].pixels)).not.toEqual(before);
  const vacuum = { ...G, n: G.n.map(() => 1), nb: G.nb.map(() => 1), continuous: true };
  await scope.onmessage({ data: { type: 'trace', id: 3, G: vacuum, R: null, B: null, frames: 1, paint: paint(6, true) } });
  expect(received.at(-2)).toMatchObject({ type: 'frame', id: 3, frame: 0, frames: 1 });
  expect(received.at(-2).rows.G).toHaveLength(6);
  expect(received.at(-2).rows.G.every((h: any) => h.tir === 0 && h.yMax >= 1.6)).toBe(true);   // dans le vide, les rayons montent en ligne droite (Terre courbe)
});

it('abandons a multi-frame trace when cancelled, still signalling done', async () => {
  const { received, scope } = makeWorker();
  const G = { ...buildLayers(PRESETS.route.p, 240, true), motion: { amplitude: .3, thermal: 0, wavelength: 1200, frequency: .4, time: 0 } };
  const run = scope.onmessage({ data: { type: 'trace', id: 7, G, R: null, B: null, frames: 6, paint: paint(4) } });
  scope.onmessage({ data: { type: 'cancel' } });
  await run;
  const frames = received.filter((x) => x.type === 'frame');
  expect(frames.length).toBeGreaterThanOrEqual(1); expect(frames.length).toBeLessThan(6);
  expect(received.at(-1)).toEqual({ type: 'done', id: 7 });
});
