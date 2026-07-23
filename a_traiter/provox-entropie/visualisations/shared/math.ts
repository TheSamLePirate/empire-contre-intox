export const KB = 1.380649e-23;
export const G = 6.6743e-11;
export const C = 299_792_458;
export const HBAR = 1.054571817e-34;
export const SOLAR_MASS = 1.98847e30;

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function linspace(start: number, end: number, count: number) {
  if (count <= 1) return [start];
  return Array.from({ length: count }, (_, i) =>
    lerp(start, end, i / (count - 1)),
  );
}

export function binaryEntropy(p: number) {
  if (p <= 0 || p >= 1) return 0;
  return -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p));
}

export function shannonEntropy(probabilities: number[], base = 2) {
  const denominator = Math.log(base);
  const entropy = -probabilities.reduce(
    (sum, p) => (p > 0 ? sum + (p * Math.log(p)) / denominator : sum),
    0,
  );
  return Object.is(entropy, -0) ? 0 : entropy;
}

export function entropyNatural(probabilities: number[]) {
  const entropy = -probabilities.reduce(
    (sum, p) => (p > 0 ? sum + p * Math.log(p) : sum),
    0,
  );
  return Object.is(entropy, -0) ? 0 : entropy;
}

export function logGamma(z: number): number {
  const coefficients = [
    676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012,
    9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5)
    return (
      Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z)
    );
  const shifted = z - 1;
  let x = 0.9999999999998099;
  coefficients.forEach((coefficient, index) => {
    x += coefficient / (shifted + index + 1);
  });
  const t = shifted + coefficients.length - 0.5;
  return (
    0.5 * Math.log(2 * Math.PI) +
    (shifted + 0.5) * Math.log(t) -
    t +
    Math.log(x)
  );
}

export function logChoose(n: number, k: number) {
  if (k < 0 || k > n) return Number.NEGATIVE_INFINITY;
  return logGamma(n + 1) - logGamma(k + 1) - logGamma(n - k + 1);
}

export function normalize(values: number[]) {
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0);
  if (total === 0) return values.map(() => 1 / values.length);
  return values.map((value) => Math.max(0, value) / total);
}

export function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  if (Object.is(value, -0)) value = 0;
  const abs = Math.abs(value);
  if ((abs !== 0 && abs < 0.001) || abs >= 1e5)
    return value.toExponential(digits);
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: digits,
  }).format(value);
}
