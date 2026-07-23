import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { formatNumber, mulberry32 } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

type Side = "left" | "right";
export type MaxwellParticle = {
  attempted: boolean;
  fast: boolean;
  gate: number;
  origin: Side;
  passed: boolean;
  vx: number;
  vy: number;
  x: number;
  y: number;
};
type Simulation = {
  elapsed: number;
  observations: number;
  particles: MaxwellParticle[];
  sorted: number;
};
type ParticleAdvance = {
  observed: boolean;
  particle: MaxwellParticle;
  sorted: boolean;
};

const PARTICLE_COUNT = 48;
const KTLN2 = Math.LN2;
const X_MIN = 3;
const X_DIVIDER = 50;
const X_MAX = 97;
const Y_MIN = 14;
const Y_MAX = 98;
const DOOR_MIN = 43;
const DOOR_MAX = 65;
const COLLISION_EPSILON = 1e-5;
const MAX_FRAME_DELTA = 0.1;
const MAX_PHYSICS_STEP = 1 / 120;

const sideOf = (x: number): Side => (x < X_DIVIDER ? "left" : "right");

export function binaryMixingEntropy(items: MaxwellParticle[]) {
  if (!items.length) return 0;
  const fastFraction =
    items.filter((particle) => particle.fast).length / items.length;
  const slowFraction = 1 - fastFraction;
  const term = (probability: number) =>
    probability > 0 ? -probability * Math.log(probability) : 0;
  return items.length * (term(fastFraction) + term(slowFraction));
}

export function createMaxwellParticles(seed: number): MaxwellParticle[] {
  const random = mulberry32(seed);
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const fast = random() > 0.5;
    const speed = fast ? 18 : 10;
    const angle = 0.22 + random() * (Math.PI - 0.44);
    const direction = random() > 0.5 ? 1 : -1;
    const origin: Side = index % 2 ? "right" : "left";
    return {
      attempted: false,
      fast,
      gate: random(),
      origin,
      passed: false,
      vx: Math.cos(angle) * speed * direction,
      vy: Math.sin(angle) * speed * (random() > 0.5 ? 1 : -1),
      x:
        origin === "left"
          ? X_MIN + 2 + random() * 41
          : X_DIVIDER + 2 + random() * 43,
      y: Y_MIN + 2 + random() * 80,
    };
  });
}

/**
 * Advances one ideal point particle to its next exact wall events. The only
 * branch that changes chamber is a divider impact inside the open doorway.
 */
export function advanceMaxwellParticle(
  source: MaxwellParticle,
  delta: number,
  efficiency: number,
): ParticleAdvance {
  const particle = { ...source };
  let remaining = Math.max(0, delta);
  let observed = false;
  let sorted = false;
  let events = 0;

  while (remaining > 1e-9 && events < 24) {
    const side = sideOf(particle.x);
    const tx =
      particle.vx > 0
        ? ((side === "left" ? X_DIVIDER : X_MAX) - particle.x) / particle.vx
        : particle.vx < 0
          ? ((side === "right" ? X_DIVIDER : X_MIN) - particle.x) / particle.vx
          : Number.POSITIVE_INFINITY;
    const ty =
      particle.vy > 0
        ? (Y_MAX - particle.y) / particle.vy
        : particle.vy < 0
          ? (Y_MIN - particle.y) / particle.vy
          : Number.POSITIVE_INFINITY;
    const hitX = tx >= -1e-9 && tx <= ty && tx <= remaining;
    const hitY = ty >= -1e-9 && ty < tx && ty <= remaining;
    const travel = Math.max(
      0,
      Math.min(remaining, hitX ? tx : hitY ? ty : remaining),
    );
    particle.x += particle.vx * travel;
    particle.y += particle.vy * travel;
    remaining -= travel;

    if (!hitX && !hitY) break;
    events += 1;
    if (hitY) {
      particle.y = Math.max(Y_MIN, Math.min(Y_MAX, particle.y));
      particle.vy *= -1;
      particle.y += Math.sign(particle.vy) * COLLISION_EPSILON;
      continue;
    }

    const atDivider = Math.abs(particle.x - X_DIVIDER) < 1e-3;
    if (!atDivider) {
      particle.x = Math.max(X_MIN, Math.min(X_MAX, particle.x));
      particle.vx *= -1;
      particle.x += Math.sign(particle.vx) * COLLISION_EPSILON;
      continue;
    }

    const radius = particle.fast ? 1.65 : 1.25;
    const insideDoor =
      particle.y >= DOOR_MIN + radius && particle.y <= DOOR_MAX - radius;
    const movingToDesiredSide = particle.fast
      ? particle.vx > 0
      : particle.vx < 0;
    if (insideDoor && !particle.attempted) {
      particle.attempted = true;
      observed = true;
    }
    const mayPass =
      insideDoor && movingToDesiredSide && particle.gate < efficiency;
    if (mayPass) {
      particle.x = X_DIVIDER + Math.sign(particle.vx) * COLLISION_EPSILON;
      if (!particle.passed && sideOf(particle.x) !== particle.origin) {
        particle.passed = true;
        sorted = true;
      }
    } else {
      particle.vx *= -1;
      particle.x = X_DIVIDER + Math.sign(particle.vx) * COLLISION_EPSILON;
    }
  }

  particle.x = Math.max(X_MIN, Math.min(X_MAX, particle.x));
  particle.y = Math.max(Y_MIN, Math.min(Y_MAX, particle.y));
  return { observed, particle, sorted };
}

export function advanceMaxwellSimulation(
  simulation: Simulation,
  delta: number,
  efficiency: number,
): Simulation {
  let observations = simulation.observations;
  let sorted = simulation.sorted;
  let particles = simulation.particles;
  let remaining = Math.max(0, delta);
  while (remaining > 1e-9) {
    const step = Math.min(MAX_PHYSICS_STEP, remaining);
    particles = particles.map((particle) => {
      const advanced = advanceMaxwellParticle(particle, step, efficiency);
      if (advanced.observed) observations += 1;
      if (advanced.sorted) sorted += 1;
      return advanced.particle;
    });
    remaining -= step;
  }
  return {
    elapsed: simulation.elapsed + delta,
    observations,
    particles,
    sorted,
  };
}

export function V18DemonMaxwell({
  className,
  seed = 1801,
}: VisualizationProps) {
  const initialParticles = useMemo(() => createMaxwellParticles(seed), [seed]);
  const [simulation, setSimulation] = useState<Simulation>(() => ({
    elapsed: 0,
    observations: 0,
    particles: initialParticles,
    sorted: 0,
  }));
  const [playing, setPlaying] = useState(
    () =>
      !(
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ),
  );
  const [erased, setErased] = useState(0);
  const [error, setError] = useState(0);
  const [latency, setLatency] = useState(0);
  const [speed, setSpeed] = useState(1);
  const previousFrame = useRef<number | null>(null);
  const uid = useId().replace(/:/g, "");
  const efficiency = (1 - error / 100) * (1 - latency / 125);
  const efficiencyRef = useRef(efficiency);
  efficiencyRef.current = efficiency;

  useEffect(() => {
    setSimulation({
      elapsed: 0,
      observations: 0,
      particles: initialParticles,
      sorted: 0,
    });
    setErased(0);
    previousFrame.current = null;
  }, [initialParticles]);

  useEffect(() => {
    if (!playing) {
      previousFrame.current = null;
      return undefined;
    }
    let frame = 0;
    const animate = (now: number) => {
      if (previousFrame.current === null) previousFrame.current = now;
      const wallDelta = Math.min(
        MAX_FRAME_DELTA,
        Math.max(0, (now - previousFrame.current) / 1000),
      );
      previousFrame.current = now;
      if (wallDelta > 0) {
        setSimulation((value) =>
          advanceMaxwellSimulation(
            value,
            wallDelta * speed,
            efficiencyRef.current,
          ),
        );
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [playing, speed]);

  useEffect(() => {
    if (simulation.observations >= PARTICLE_COUNT) setPlaying(false);
  }, [simulation.observations]);

  const { elapsed, observations, particles, sorted } = simulation;
  const storedBits = Math.max(0, observations - erased);
  const memoryEntropy = storedBits * KTLN2;
  const left = particles.filter((particle) => particle.x < X_DIVIDER);
  const right = particles.filter((particle) => particle.x >= X_DIVIDER);
  const initialLeft = initialParticles.filter(
    (particle) => particle.origin === "left",
  );
  const initialRight = initialParticles.filter(
    (particle) => particle.origin === "right",
  );
  const initialMixingEntropy =
    binaryMixingEntropy(initialLeft) + binaryMixingEntropy(initialRight);
  const gasEntropy =
    binaryMixingEntropy(left) +
    binaryMixingEntropy(right) -
    initialMixingEntropy;
  const environmentEntropy = erased * KTLN2;
  const totalEntropy = gasEntropy + memoryEntropy + environmentEntropy;
  const relativeTemperature = (items: MaxwellParticle[]) =>
    items.length
      ? items.reduce((sum, item) => sum + item.vx ** 2 + item.vy ** 2, 0) /
        items.length
      : 0;
  const leftT = relativeTemperature(left);
  const rightT = relativeTemperature(right);
  const referenceTemperature = (18 ** 2 + 10 ** 2) / 2;
  const separation = Math.min(
    100,
    (Math.abs(rightT - leftT) / referenceTemperature) * 100,
  );
  const sortingFlow = elapsed > 0 ? sorted / elapsed : 0;
  const gatePulse = particles.some(
    (particle) =>
      Math.abs(particle.x - X_DIVIDER) < 2.5 &&
      particle.y > DOOR_MIN &&
      particle.y < DOOR_MAX &&
      (particle.fast ? particle.vx > 0 : particle.vx < 0),
  );
  const phase =
    observations >= PARTICLE_COUNT
      ? storedBits > 0
        ? "Toutes les molécules mesurées · mémoire à effacer"
        : "Cycle informationnel fermé"
      : playing
        ? "Billard moléculaire en temps réel"
        : "Expérience en pause";

  const reset = () => {
    setSimulation({
      elapsed: 0,
      observations: 0,
      particles: createMaxwellParticles(seed),
      sorted: 0,
    });
    setErased(0);
    setPlaying(false);
    previousFrame.current = null;
  };
  const step = () => {
    setPlaying(false);
    setSimulation((value) => advanceMaxwellSimulation(value, 0.2, efficiency));
  };

  return (
    <VizFrame
      id="V18"
      title="Démon de Maxwell · billard moléculaire"
      question="Où passe l’entropie lorsque le démon trie les molécules ?"
      className={className}
      caveat="Billard 2D idéal : trajectoires rectilignes et collisions parfaitement élastiques avec des parois sans épaisseur. Les particules n’interagissent pas entre elles. La vitesse quadratique sert de température cinétique relative ; seule la borne kB ln 2 par bit effacé est générale."
      controls={
        <>
          <button
            type="button"
            aria-pressed={playing}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? "⏸ Pause" : "▶ Lecture"}
          </button>
          <button type="button" onClick={step} disabled={playing}>
            Pas à pas · 0,2 s
          </button>
          <button
            type="button"
            onClick={() => setErased(observations)}
            disabled={storedBits === 0}
          >
            Effacer {storedBits} bit{storedBits > 1 ? "s" : ""}
          </button>
          <button type="button" onClick={reset} disabled={elapsed === 0}>
            Réinitialiser
          </button>
          <RangeControl
            label="Erreurs de mesure"
            value={error}
            min={0}
            max={40}
            step={5}
            unit="%"
            onChange={setError}
          />
          <RangeControl
            label="Latence de porte"
            value={latency}
            min={0}
            max={80}
            step={10}
            unit="%"
            onChange={setLatency}
          />
          <RangeControl
            label="Vitesse du temps"
            value={speed}
            min={0.5}
            max={2}
            step={0.25}
            unit="×"
            onChange={setSpeed}
          />
        </>
      }
      stats={
        <>
          <Metric label="Temps simulé" value={elapsed.toFixed(1)} unit="s" />
          <Metric
            label="Flux de tris"
            value={formatNumber(sortingFlow)}
            unit="s⁻¹"
          />
          <Metric
            label="Mémoire"
            value={`${storedBits}/${PARTICLE_COUNT}`}
            unit="bits"
          />
          <Metric
            label="Écart cinétique"
            value={Math.round(separation)}
            unit="%"
          />
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <svg
            viewBox="0 0 100 116"
            role="img"
            aria-label={`${phase}. ${sorted} tris efficaces sur ${observations} mesures ; températures cinétiques relatives ${formatNumber(leftT)} à gauche et ${formatNumber(rightT)} à droite.`}
          >
            <defs>
              <linearGradient id={`${uid}-left`} x1="0" x2="1">
                <stop stopColor="var(--ev-cold)" stopOpacity=".28" />
                <stop
                  offset="1"
                  stopColor="var(--ev-panel)"
                  stopOpacity=".05"
                />
              </linearGradient>
              <linearGradient id={`${uid}-right`} x1="0" x2="1">
                <stop stopColor="var(--ev-panel)" stopOpacity=".05" />
                <stop offset="1" stopColor="var(--ev-hot)" stopOpacity=".28" />
              </linearGradient>
              <filter id={`${uid}-glow`}>
                <feGaussianBlur stdDeviation="1.25" />
              </filter>
            </defs>
            <rect
              x="1"
              y="12"
              width="48.5"
              height="88"
              rx="2"
              fill={`url(#${uid}-left)`}
              stroke="var(--ev-line)"
            />
            <rect
              x="50.5"
              y="12"
              width="48.5"
              height="88"
              rx="2"
              fill={`url(#${uid}-right)`}
              stroke="var(--ev-line)"
            />
            <path
              d={`M${X_DIVIDER} 12V${DOOR_MIN} M${X_DIVIDER} ${DOOR_MAX}V100`}
              stroke="var(--ev-muted)"
              strokeWidth=".8"
            />
            {gatePulse && (
              <circle
                cx={X_DIVIDER}
                cy={(DOOR_MIN + DOOR_MAX) / 2}
                r="7"
                fill="var(--ev-gold)"
                opacity=".2"
                filter={`url(#${uid}-glow)`}
              />
            )}
            <rect
              x="48"
              y={gatePulse ? DOOR_MIN + 2 : DOOR_MIN}
              width="4"
              height={DOOR_MAX - DOOR_MIN}
              rx="1.5"
              fill="var(--ev-gold)"
              opacity={gatePulse ? 0.25 : 0.92}
            />
            <circle
              cx="50"
              cy="6.2"
              r="4.2"
              fill="var(--ev-panel-2)"
              stroke="var(--ev-gold)"
              strokeWidth=".8"
            />
            <circle
              cx="50"
              cy="6.2"
              r="1.2"
              fill={gatePulse ? "var(--ev-gold)" : "var(--ev-muted)"}
            />
            <path
              d="M50 10.4V16"
              stroke="var(--ev-gold)"
              strokeDasharray="1 1"
            />
            <text
              x="25"
              y="9"
              textAnchor="middle"
              fill="var(--ev-cold)"
              fontSize="4"
              fontWeight="700"
            >
              LENTES ←
            </text>
            <text
              x="75"
              y="9"
              textAnchor="middle"
              fill="var(--ev-hot)"
              fontSize="4"
              fontWeight="700"
            >
              → RAPIDES
            </text>
            {particles.map((particle, index) => (
              <circle
                key={index}
                cx={particle.x}
                cy={particle.y}
                r={particle.fast ? 1.65 : 1.25}
                fill={particle.fast ? "var(--ev-hot)" : "var(--ev-cold)"}
                opacity={particle.attempted ? 1 : 0.72}
              />
            ))}
            <text
              x="25"
              y="106"
              textAnchor="middle"
              fill="var(--ev-muted)"
              fontSize="4.2"
            >
              ⟨v²⟩ {formatNumber(leftT)} · {left.length} particules
            </text>
            <text
              x="75"
              y="106"
              textAnchor="middle"
              fill="var(--ev-muted)"
              fontSize="4.2"
            >
              ⟨v²⟩ {formatNumber(rightT)} · {right.length} particules
            </text>
            <text
              x="50"
              y="114"
              textAnchor="middle"
              fill="var(--ev-gold)"
              fontSize="4"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {playing ? "● EN DIRECT" : "⏸ PAUSE"} · t = {elapsed.toFixed(1)} s
            </text>
          </svg>
          <div className="entropy-viz__legend">
            <span>
              <i className="entropy-viz__dot entropy-viz__dot--cold" />
              lente · |v| = 10
            </span>
            <span>
              <i className="entropy-viz__dot entropy-viz__dot--hot" />
              rapide · |v| = 18
            </span>
            <span>
              porte : <strong>{gatePulse ? "ouverte" : "fermée"}</strong>
            </span>
          </div>
          <div
            aria-label={`${Math.round((observations / PARTICLE_COUNT) * 100)} % des molécules mesurées`}
            style={{
              height: ".45rem",
              background: "var(--ev-line)",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                display: "block",
                width: `${(observations / PARTICLE_COUNT) * 100}%`,
                height: "100%",
                background:
                  "linear-gradient(90deg,var(--ev-cold),var(--ev-gold),var(--ev-hot))",
                transition: "width .18s linear",
              }}
            />
          </div>
        </div>
        <div className="entropy-viz__panel" aria-live="polite">
          <span className="entropy-viz__id">{phase}</span>
          <h4>Comptabilité du cycle</h4>
          <dl>
            <dt>Gaz trié</dt>
            <dd>
              <strong>{formatNumber(gasEntropy)}</strong> kB
            </dd>
            <dt>Mémoire du démon</dt>
            <dd>
              <strong>+{formatNumber(memoryEntropy)}</strong> kB
            </dd>
            <dt>Environnement</dt>
            <dd>
              <strong>+{formatNumber(environmentEntropy)}</strong> kB
            </dd>
            <dt>Total suivi</dt>
            <dd>
              <strong>{formatNumber(totalEntropy)}</strong> kB
            </dd>
          </dl>
          <div
            aria-label={`Mémoire occupée à ${Math.round((storedBits / PARTICLE_COUNT) * 100)} pour cent`}
            style={{
              height: ".65rem",
              background: "var(--ev-line)",
              marginBlock: "1rem .45rem",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                display: "block",
                width: `${(storedBits / PARTICLE_COUNT) * 100}%`,
                height: "100%",
                background: "var(--ev-info)",
                transition: "width .2s ease",
              }}
            />
          </div>
          <p>
            <strong>Lecture : </strong>
            {storedBits
              ? "le gaz se sépare, mais chaque décision reste inscrite dans la mémoire du démon."
              : observations
                ? "l’effacement a exporté au moins kB ln 2 par bit vers l’environnement."
                : "les molécules rebondissent élastiquement ; le contrôleur n’ouvre que pour un passage utile dans l’ouverture."}
          </p>
          <p className="entropy-viz__legend">
            Tri effectif :{" "}
            <strong>
              {sorted}/{observations}
            </strong>{" "}
            · la norme de chaque vitesse est conservée aux collisions ; seules
            les populations des deux boîtes changent.
          </p>
        </div>
      </div>
    </VizFrame>
  );
}

export default V18DemonMaxwell;
