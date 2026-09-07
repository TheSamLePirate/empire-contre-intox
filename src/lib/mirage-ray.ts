/** Geometrical optics in a spherical, optionally x-dependent refractive field.
 * x = R·longitude (surface arc), z = altitude, theta = local elevation.
 * dz/dx = (1+z/R) tan(theta)
 * dtheta/dx = 1/R + (1+z/R) nz/n - nx tan(theta)/n.
 * These are the eikonal ray equations, without a small-angle approximation.
 * Adaptive RK4 step doubling controls local error; boundary events are bisected.
 */
import { R_EARTH as R, tempAt, refractivityStd, NODE_H, type Profile, type Layers, type Hit, type Pt } from './mirage-optics';
export type AirMotion = { amplitude: number; wavelength: number; frequency: number; time: number; thermal?: number };
export type RayOptions = { tolerance?: number; maxSteps?: number; top?: number };
const TWO_PI = 2 * Math.PI;
export function displacement(x: number, z: number, m?: AirMotion) {
  if (!m || m.amplitude === 0 || z >= 80) return { value: 0, dx: 0, dz: 0 };
  const A = Math.min(1, Math.max(0, m.amplitude)), k = TWO_PI / Math.max(100, m.wavelength), t = TWO_PI * m.frequency * m.time;
  const a = k * x - t, b = 1.73 * k * x + 1 * t + 1.2, c = 2.91 * k * x - 2 * t + 2.4;
  const w = .55 * Math.sin(a) + .3 * Math.sin(b) + .15 * Math.sin(c);
  const wx = k * (.55 * Math.cos(a) + .519 * Math.cos(b) + .4365 * Math.cos(c));
  const e = Math.exp(-Math.max(0, z) / 60), s = Math.exp(-Math.max(0, z) / 2);
  // Confine this near-surface perturbation to 80 m, with continuous first
  // derivative at 40/80 m; the undisturbed atmosphere remains above it.
  const u = Math.max(0, Math.min(1, (z - 40) / 40));
  const taper = 1 - u*u*(3-2*u), dt = z>40 && z<80 ? -6*u*(1-u)/40 : 0;
  const base = (1-s)*e, envelope=base*taper;
  const dz = e*(s/2-(1-s)/60)*taper+base*dt;
  return { value: A * envelope * w, dx: A * envelope * wx, dz: A * dz * w };
}
/** Inverse material coordinate, for drawing the very same deformed layers. */
export function layerHeight(x: number, base: number, motion?: AirMotion) {
  let z = base;
  for (let i = 0; i < 12; i++) z = base + displacement(x, z, motion).value;
  return z;
}
export function temperatureSlope(p: Profile, z: number) {
  z = Math.max(0, z);
  if (p.kind === 'param') {
    const width = Math.max(.1, p.dInv / 2), u = Math.tanh((z - p.hInv) / width);
    return -.0065 - (z < 4 ? p.dTs / ((z + .005) * Math.log(801)) : 0) + p.aInv * .5 / width * (1 - u * u);
  }
  if (z >= 60) return -.0065;
  let k = 0; while (NODE_H[k + 1] <= z && k < NODE_H.length - 2) k++;
  return (p.temps[k + 1] - p.temps[k]) / (NODE_H[k + 1] - NODE_H[k]);
}
/** Synthetic temperature cells (K), with exact spatial derivatives. They model
 * thermal inhomogeneity, not a post-process on the observer image. */
export function thermalField(x:number,z:number,m?:AirMotion){
  if(!m?.thermal || z>=80)return {value:0,dx:0,dz:0};
  const A=Math.max(0,Math.min(1.5,m.thermal)),k=TWO_PI/Math.max(100,m.wavelength),t=TWO_PI*m.frequency*m.time;
  const u=Math.max(0,Math.min(1,(z-40)/40)), taper=1-u*u*(3-2*u),dt=z>40?-6*u*(1-u)/40:0;
  const e=Math.exp(-z/20),g=Math.exp(-z/.3),base=(1-g)*e;
  const env=base*taper,ez=(g/.3*e-base/20)*taper+base*dt;
  const a=k*x-t,b=2.3*k*x+2*t+1.1,c=z/1.2+.7*Math.sin(b);
  const w=Math.sin(a)*Math.sin(c);
  return {value:A*env*w,dx:A*env*(k*Math.cos(a)*Math.sin(c)+Math.sin(a)*Math.cos(c)*.7*2.3*k*Math.cos(b)),dz:A*(ez*w+env*Math.sin(a)*Math.cos(c)/1.2)};
}
export function indexField(p: Profile, x: number, z: number, lambda = .55, Ps = 101325, motion?: AirMotion) {
  const w = displacement(x, z, motion), q = Math.max(0, z - w.value);
  const thermal=thermalField(x,Math.max(0,z),motion);
  const temperature = tempAt(p, q)+thermal.value, K = temperature + 273.15;
  const ref = refractivityStd(lambda) * 288.15 / K * Math.exp(-Math.max(0, z) / 8400) * Ps / 101325;
  const slope = temperatureSlope(p, q);
  return { n: 1 + ref, nz: ref * (-1 / 8400 - (slope * (1 - w.dz)+thermal.dz) / K), nx: ref * (slope * w.dx-thermal.dx) / K, temperature };
}
export function straightAltitude(eye: number, theta: number, x: number) {
  // Stable evaluation of (R+eye) cos(theta)/cos(theta+x/R) - R.
  const u = x / R, denominator = Math.cos(theta + u);
  return (eye * Math.cos(theta) + R * (2 * Math.sin(u / 2) * Math.sin(theta + u / 2))) / denominator;
}
export function traceAdaptive(L: Layers, eye: number, theta: number, D: number, range: number, record = false, segLen = Infinity, options: RayOptions = {}): Hit {
  const vacuum = L.nb.every(v => v === 1), p = L.profile!;
  const top = options.top ?? 400, tol = options.tolerance ?? 1;
  const field = (x: number, z: number) => vacuum ? { n: 1, nx: 0, nz: 0 } : indexField(p, x, z, L.lambda, L.Ps, L.motion);
  const derivative = (x: number, z: number, a: number): [number, number] => {
    const f = field(x, z), tangent = Math.tan(a), rho = 1 + z / R;
    return [rho * tangent, 1 / R + rho * f.nz / f.n - f.nx * tangent / f.n];
  };
  const rk = (x: number, z: number, a: number, h: number): [number, number] => {
    const k1 = derivative(x, z, a), k2 = derivative(x + h / 2, z + h * k1[0] / 2, a + h * k1[1] / 2);
    const k3 = derivative(x + h / 2, z + h * k2[0] / 2, a + h * k2[1] / 2), k4 = derivative(x + h, z + h * k3[0], a + h * k3[1]);
    return [z + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), a + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])];
  };
  const twice = (x: number, z: number, a: number, h: number) => { const mid = rk(x, z, a, h / 2); return rk(x + h / 2, mid[0], mid[1], h / 2); };
  let x = 0, z = eye, a = theta, step = 20, count = 0, rejected = 0, maxError = 0, drift = 0;
  const invariant = field(0, z).n * (R + z) * Math.cos(a);
  const conserved = !L.motion || (L.motion.amplitude === 0 && !L.motion.thermal);
  const pts: Pt[] = [{ x, y: z }], turns: Pt[] = [];
  const result: Hit = { hasD: false, yD: NaN, thD: NaN, kind: 'unresolved', xg: NaN, thf: a, tir: 0, yMin: z, yMax: z };
  let termination: NonNullable<Hit['termination']> = 'limit';
  for (let attempt = 0; attempt < (options.maxSteps ?? 12000); attempt++) {
    if (x >= range - 1e-8) { termination = 'range'; break; }
    if (Math.abs(a) >= 1.4 || !Number.isFinite(z + a)) break;
    const h = Math.min(step, range - x, (L.motion?.amplitude || L.motion?.thermal) && z < 85 ? Math.max(100,L.motion.wavelength) / 8 : 1500);
    const full = rk(x, z, a, h), half = twice(x, z, a, h);
    const ez = Math.abs(half[0] - full[0]) / 15, ea = Math.abs(half[1] - full[1]) / 15;
    const error = Math.max(ez / (tol * (2e-5 + Math.abs(z) * 1e-8)), ea / (tol * 2e-10));
    if (!Number.isFinite(error)) break;
    if (error > 1) { if (h < 1e-5) break; step = h * Math.max(.1, .85 * error ** -.2); rejected++; continue; }
    let dx = h, next = half;
    const event = half[0] <= 0 ? 0 : half[0] >= top ? top : null;
    if (event !== null) {
      let lo = 0, hi = h;
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2, mz = twice(x, z, a, mid)[0];
        if (event === 0 ? mz > 0 : mz < top) lo = mid; else hi = mid;
      }
      dx = (lo + hi) / 2; next = twice(x, z, a, dx); next[0] = event;
    }
    const events: Pt[] = [];
    if (!result.hasD && x <= D && x + dx >= D) {
      const crossing = twice(x, z, a, D - x);
      result.hasD = true; result.yD = crossing[0]; result.thD = crossing[1]; events.push({ x: D, y: crossing[0] });
    }
    if (a * next[1] < 0) {
      let lo = 0, hi = dx;
      for (let i = 0; i < 32; i++) { const mid = (lo + hi) / 2; if (twice(x, z, a, mid)[1] * a > 0) lo = mid; else hi = mid; }
      const t = (lo + hi) / 2, y = twice(x, z, a, t)[0];
      result.yMin = Math.min(result.yMin, y); result.yMax = Math.max(result.yMax, y);
      if (record) { turns.push({ x: x + t, y }); events.push({ x: x + t, y }); }
    }
    if (record) {
      const samples = Math.min(100, Math.ceil(dx / segLen));
      for (let i = 1; i < samples; i++) { const d = dx * i / samples; events.push({ x: x + d, y: twice(x, z, a, d)[0] }); }
      events.sort((p, q) => p.x - q.x); pts.push(...events, { x: x + dx, y: next[0] });
    }
    x += dx; z = next[0]; a = next[1]; count++; maxError = Math.max(maxError, ez);
    result.yMin = Math.min(result.yMin, z); result.yMax = Math.max(result.yMax, z);
    if (conserved) drift = Math.max(drift, Math.abs(field(x, z).n * (R + z) * Math.cos(a) / invariant - 1));
    if (event !== null) { termination = event === 0 ? 'ground' : 'top'; break; }
    step = h * Math.min(3, Math.max(.5, error > 1e-12 ? .9 * error ** -.2 : 3));
  }
  result.kind = termination === 'ground' ? 'ground' : termination === 'top' ? 'sky' : 'unresolved';
  result.xg = termination === 'ground' ? x : NaN; result.thf = a - x / R;
  result.termination = termination; result.end = { x, y: z }; result.steps = count; result.rejected = rejected;
  result.errorEstimate = maxError; result.invariantDrift = conserved ? drift : null;
  if (record) { result.pts = pts; result.turns = turns; }
  return result;
}
