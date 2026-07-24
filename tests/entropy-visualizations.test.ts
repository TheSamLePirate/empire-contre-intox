import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { entropyVisualizations } from "../a_traiter/provox-entropie/visualisations/registry";
import {
  binaryEntropy,
  entropyNatural,
  logChoose,
  mulberry32,
  normalize,
  shannonEntropy,
} from "../a_traiter/provox-entropie/visualisations/shared/math";
import {
  advanceMaxwellParticle,
  createMaxwellParticles,
  type MaxwellParticle,
} from "../a_traiter/provox-entropie/visualisations/components/V18DemonMaxwell";
import {
  diffusionPosition,
  elasticCollisionPositions,
  keplerPosition,
} from "../a_traiter/provox-entropie/visualisations/components/V01FlecheDuTemps";
import {
  CARNOT_PARTICLE_RADIUS,
  carnotPhaseDurations,
  carnotParticlePosition,
  sampleCarnotSegment,
} from "../a_traiter/provox-entropie/visualisations/components/V03CycleCarnotSynchronise";
import { jouleWeightY } from "../a_traiter/provox-entropie/visualisations/components/V04ExperienceJoule";
import { redistribute } from "../a_traiter/provox-entropie/visualisations/components/V17CodageShannon";
import { configuration } from "../a_traiter/provox-entropie/visualisations/components/V07GrilleConfigurations";
import { oscillatorQuanta } from "../a_traiter/provox-entropie/visualisations/components/V09EinsteinSolids";
import {
  COSMIC_EXPANSION,
  cosmicExpandedPosition,
  createCosmicField,
} from "../a_traiter/provox-entropie/visualisations/components/V25FriseCosmique";
import {
  COARSE_PARTICLE_RADIUS,
  coarseParticleState,
  reflectCoordinate,
  type CoarseParticle,
} from "../a_traiter/provox-entropie/visualisations/components/V21CoarseGraining";

describe("entropy visualization math", () => {
  it("computes binary entropy at its extrema and maximum", () => {
    expect(binaryEntropy(0)).toBe(0);
    expect(binaryEntropy(1)).toBe(0);
    expect(binaryEntropy(0.5)).toBeCloseTo(1, 12);
  });

  it("computes Shannon and natural entropy consistently", () => {
    expect(shannonEntropy([0.25, 0.25, 0.25, 0.25])).toBeCloseTo(2, 12);
    expect(entropyNatural([0.5, 0.5])).toBeCloseTo(Math.log(2), 12);
    expect(Object.is(shannonEntropy([1, 0]), -0)).toBe(false);
    expect(Object.is(entropyNatural([1, 0]), -0)).toBe(false);
  });

  it("computes stable binomial multiplicities", () => {
    expect(Math.exp(logChoose(5, 2))).toBeCloseTo(10, 8);
    expect(logChoose(1000, 500)).toBeGreaterThan(600);
  });

  it("normalizes non-negative weights and handles an empty mass", () => {
    expect(normalize([1, 2, 1])).toEqual([0.25, 0.5, 0.25]);
    expect(normalize([0, 0])).toEqual([0.5, 0.5]);
  });

  it("replays seeded random sequences", () => {
    const first = mulberry32(42);
    const second = mulberry32(42);
    expect(Array.from({ length: 8 }, first)).toEqual(
      Array.from({ length: 8 }, second),
    );
  });
});

describe("Maxwell molecular billiard invariants", () => {
  it("keeps particles confined and preserves kinetic speed through wall collisions", () => {
    for (const initial of createMaxwellParticles(42)) {
      let particle = initial;
      const speedSquared = initial.vx ** 2 + initial.vy ** 2;
      for (let step = 0; step < 400; step += 1) {
        particle = advanceMaxwellParticle(particle, 1 / 120, 0).particle;
        expect(particle.x).toBeGreaterThanOrEqual(3);
        expect(particle.x).toBeLessThanOrEqual(97);
        expect(particle.y).toBeGreaterThanOrEqual(14);
        expect(particle.y).toBeLessThanOrEqual(98);
        expect(particle.vx ** 2 + particle.vy ** 2).toBeCloseTo(
          speedSquared,
          8,
        );
      }
    }
  });

  it("allows a divider crossing only through the open doorway and in the useful direction", () => {
    const base: MaxwellParticle = {
      attempted: false,
      fast: false,
      gate: 0,
      origin: "right",
      passed: false,
      vx: -10,
      vy: 0,
      x: 52,
      y: 54,
    };
    const throughDoor = advanceMaxwellParticle(base, 0.3, 1).particle;
    expect(throughDoor.x).toBeLessThan(50);
    expect(throughDoor.passed).toBe(true);

    const hitsDivider = advanceMaxwellParticle(
      { ...base, y: 30 },
      0.3,
      1,
    ).particle;
    expect(hitsDivider.x).toBeGreaterThan(50);
    expect(hitsDivider.vx).toBeGreaterThan(0);
    expect(hitsDivider.passed).toBe(false);
  });
});

describe("animated physics invariants", () => {
  it("moves Joule's falling masses downward as work accumulates", () => {
    expect(jouleWeightY(0)).toBeLessThan(jouleWeightY(0.5));
    expect(jouleWeightY(0.5)).toBeLessThan(jouleWeightY(1));
  });

  it("keeps diffusion particles in their vessel and equal spheres separated", () => {
    for (let frame = 0; frame <= 100; frame += 1) {
      const progress = frame / 100;
      for (let index = 0; index < 42; index += 1) {
        const point = diffusionPosition(index, progress);
        expect(point.x).toBeGreaterThanOrEqual(59);
        expect(point.x).toBeLessThanOrEqual(621);
        expect(point.y).toBeGreaterThanOrEqual(49);
        expect(point.y).toBeLessThanOrEqual(201);
      }
      const collision = elasticCollisionPositions(progress);
      expect(collision.right - collision.left).toBeGreaterThanOrEqual(
        44 - 1e-10,
      );
    }
  });

  it("closes the Kepler orbit and respects Carnot invariants", () => {
    expect(keplerPosition(1).x).toBeCloseTo(keplerPosition(0).x, 12);
    expect(keplerPosition(1).y).toBeCloseTo(keplerPosition(0).y, 12);
    const isothermal = sampleCarnotSegment(
      { V: 10, T: 600, P: 498.84, S: 0 },
      { V: 20, T: 600, P: 249.42, S: 8.314 * Math.log(2) },
      0,
    );
    for (const state of isothermal) {
      expect(state.T).toBe(600);
      expect(state.S).toBeCloseTo(8.314 * Math.log(state.V / 10), 10);
    }
    const adiabatic = sampleCarnotSegment(
      { V: 20, T: 600, P: 249.42, S: 8.314 * Math.log(2) },
      { V: 80, T: 345, P: 35.85, S: 8.314 * Math.log(2) },
      1,
    );
    const invariant = adiabatic[0]!.T * adiabatic[0]!.V ** 0.4;
    for (const state of adiabatic) {
      expect(state.S).toBeCloseTo(8.314 * Math.log(2), 10);
      expect(state.T * state.V ** 0.4).toBeCloseTo(invariant, 8);
    }
  });

  it("keeps Carnot gas particles below the piston and inside the cylinder", () => {
    for (const pistonY of [49, 86, 132, 174]) {
      for (let index = 0; index < 16; index += 1) {
        const particle = carnotParticlePosition(index, pistonY);
        expect(particle.x - CARNOT_PARTICLE_RADIUS).toBeGreaterThanOrEqual(88);
        expect(particle.x + CARNOT_PARTICLE_RADIUS).toBeLessThanOrEqual(352);
        expect(particle.y - CARNOT_PARTICLE_RADIUS).toBeGreaterThanOrEqual(
          pistonY + 12,
        );
        expect(particle.y + CARNOT_PARTICLE_RADIUS).toBeLessThanOrEqual(214);
      }
    }
  });

  it("synchronizes Carnot phase duration with piston travel", () => {
    const durations = carnotPhaseDurations([10, 20, 113, 57, 10]);
    expect(durations[0]).toBe(850);
    expect(durations[1]).toBeGreaterThan(durations[2]!);
    expect(durations[2]).toBeGreaterThan(durations[3]!);
    expect(durations[3]).toBeGreaterThan(durations[0]!);
  });

  it("keeps coarse-graining particles inside elastic walls without changing their speed", () => {
    const initial = { position: 0.23, velocity: 0.37 };
    for (let frame = 0; frame <= 1000; frame += 1) {
      const state = reflectCoordinate(
        initial.position,
        initial.velocity,
        frame / 37,
      );
      expect(state.position).toBeGreaterThanOrEqual(COARSE_PARTICLE_RADIUS);
      expect(state.position).toBeLessThanOrEqual(1 - COARSE_PARTICLE_RADIUS);
      expect(Math.abs(state.velocity)).toBeCloseTo(
        Math.abs(initial.velocity),
        12,
      );
    }
  });

  it("retraces every wall collision after an exact velocity reversal", () => {
    const particles: CoarseParticle[] = [
      { x: 0.15, y: 0.41, vx: 0.36, vy: -0.31 },
      { x: 0.92, y: 0.08, vx: 1.91, vy: 1.37 },
      { x: 0.5, y: 0.5, vx: -3.4, vy: 2.8 },
    ];
    for (const particle of particles) {
      const returned = coarseParticleState(particle, 1, true, 0, {
        x: 0.42,
        y: -0.27,
      });
      expect(returned.x).toBeCloseTo(particle.x, 12);
      expect(returned.y).toBeCloseTo(particle.y, 12);
      expect(returned.vx).toBeCloseTo(-particle.vx, 12);
      expect(returned.vy).toBeCloseTo(-particle.vy, 12);
    }
  });

  it("applies the announced relative velocity error exactly at reversal", () => {
    const particle: CoarseParticle = {
      x: 0.25,
      y: 0.75,
      vx: 0.31,
      vy: -0.27,
    };
    const before = coarseParticleState(particle, 0.5, false, 0, {
      x: 0,
      y: 0,
    });
    const after = coarseParticleState(particle, 0.5, true, 7.5, {
      x: 0.42,
      y: -0.27,
    });
    const relativeError =
      Math.hypot(after.vx + before.vx, after.vy + before.vy) /
      Math.hypot(before.vx, before.vy);
    expect(relativeError).toBeCloseTo(0.075, 12);
  });
});

describe("configuration grid patterns", () => {
  it("tiles the 10 by 10 board with non-overlapping 1001 blocks", () => {
    const cells = configuration(50, "pavés 1001", 707);
    for (let y = 0; y < 10; y += 2) {
      for (let x = 0; x < 10; x += 2) {
        const index = y * 10 + x;
        expect([
          cells[index],
          cells[index + 1],
          cells[index + 10],
          cells[index + 11],
        ]).toEqual([true, false, false, true]);
      }
    }
  });
});

describe("Einstein solid oscillator scene", () => {
  it("distributes every displayed quantum across the oscillators", () => {
    for (const oscillators of [2, 6, 10, 20]) {
      for (const quanta of [0, 1, 9, 24, 40]) {
        const displayed = Array.from({ length: oscillators }, (_, index) =>
          oscillatorQuanta(oscillators, quanta, index),
        );
        expect(displayed.reduce((sum, value) => sum + value, 0)).toBe(quanta);
        expect(
          Math.max(...displayed) - Math.min(...displayed),
        ).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe("cosmic entropy canvas field", () => {
  it("creates a deterministic normalized universe field", () => {
    const first = createCosmicField(32, 25);
    const second = createCosmicField(32, 25);
    expect(first).toEqual(second);
    expect(first).toHaveLength(32);
    for (const point of first) {
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThan(1);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThan(1);
      expect(point.size).toBeGreaterThan(0);
    }
  });

  it("moves comoving objects away from the center as space expands", () => {
    const point = { x: 0.8, y: 0.2 };
    const distances = COSMIC_EXPANSION.map((expansion) => {
      const position = cosmicExpandedPosition(point, 1000, 500, expansion);
      return Math.hypot(position.x - 500, position.y - 250);
    });
    expect(distances).toEqual([...distances].sort((a, b) => a - b));
    expect(distances.at(-1)).toBeGreaterThan(distances[0]! * 2);
  });
});

describe("Shannon coding workshop interactions", () => {
  it("keeps every slider redistribution finite and normalized", () => {
    let probabilities = [0.25, 0.25, 0.25, 0.25];
    for (let iteration = 0; iteration < 200; iteration += 1) {
      probabilities = redistribute(
        probabilities,
        iteration % probabilities.length,
        iteration % 2 ? 0.01 : 0.97,
      );
      expect(probabilities.every(Number.isFinite)).toBe(true);
      expect(probabilities.every((value) => value >= 0.01 - 1e-12)).toBe(true);
      expect(probabilities.reduce((sum, value) => sum + value, 0)).toBeCloseTo(
        1,
        12,
      );
    }
  });
});

describe("entropy visualization catalogue", () => {
  it("contains the complete V1–V26 series without duplicate identifiers", () => {
    const ids = entropyVisualizations.map(({ id }) => id);

    expect(ids).toHaveLength(26);
    expect(new Set(ids).size).toBe(26);
    expect(ids).toEqual(
      Array.from({ length: 26 }, (_, index) => `V${index + 1}`),
    );
  });

  it("renders every visualization server-side with its pedagogical caveat", () => {
    for (const item of entropyVisualizations) {
      const markup = renderToStaticMarkup(createElement(item.component));

      expect(markup, item.id).toContain("Limite du modèle");
      expect(markup, `${item.id} doit exposer une région nommée`).toContain(
        "aria-labelledby",
      );
      expect(markup, `${item.id} doit proposer au moins un contrôle`).toMatch(
        /<(?:button|input|select)\b/,
      );
      expect(markup.length, item.id).toBeGreaterThan(500);
    }
  });
});
