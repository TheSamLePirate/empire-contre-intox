import { useEffect, useMemo, useState } from "react";
import {
  Metric,
  RangeControl,
  TransportControl,
  VizFrame,
} from "../shared/VizFrame";
import { formatNumber, mulberry32, shannonEntropy } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

export type CoarseParticle = { x: number; y: number; vx: number; vy: number };
type VelocityNoise = { x: number; y: number };

export const COARSE_PARTICLE_RADIUS = 0.015;

export function reflectCoordinate(
  position: number,
  velocity: number,
  time: number,
  min = COARSE_PARTICLE_RADIUS,
  max = 1 - COARSE_PARTICLE_RADIUS,
) {
  const span = max - min;
  const period = span * 2;
  const raw = position + velocity * time;
  const phase = (((raw - min) % period) + period) % period;
  const movingForward = phase <= span;
  return {
    position: movingForward ? min + phase : max - (phase - span),
    velocity: velocity * (movingForward ? 1 : -1),
  };
}

export function coarseParticleState(
  particle: CoarseParticle,
  time: number,
  reverse: boolean,
  uncertaintyPercent: number,
  noise: VelocityNoise,
) {
  const forwardX = reflectCoordinate(particle.x, particle.vx, time);
  const forwardY = reflectCoordinate(particle.y, particle.vy, time);
  if (!reverse || time < 0.5) {
    return {
      x: forwardX.position,
      y: forwardY.position,
      vx: forwardX.velocity,
      vy: forwardY.velocity,
    };
  }

  const midpointX = reflectCoordinate(particle.x, particle.vx, 0.5);
  const midpointY = reflectCoordinate(particle.y, particle.vy, 0.5);
  const speed = Math.hypot(particle.vx, particle.vy);
  const noiseNorm = Math.hypot(noise.x, noise.y);
  const directionX = noiseNorm === 0 ? 1 : noise.x / noiseNorm;
  const directionY = noiseNorm === 0 ? 0 : noise.y / noiseNorm;
  const errorScale = speed * (uncertaintyPercent / 100);
  const returnX = reflectCoordinate(
    midpointX.position,
    -midpointX.velocity + directionX * errorScale,
    time - 0.5,
  );
  const returnY = reflectCoordinate(
    midpointY.position,
    -midpointY.velocity + directionY * errorScale,
    time - 0.5,
  );
  return {
    x: returnX.position,
    y: returnY.position,
    vx: returnX.velocity,
    vy: returnY.velocity,
  };
}

export function V21CoarseGraining({
  className,
  seed = 2101,
}: VisualizationProps) {
  const initial = useMemo(() => {
    const random = mulberry32(seed);
    return Array.from({ length: 48 }, (): CoarseParticle => ({
      x: 0.12 + random() * 0.16,
      y: 0.36 + random() * 0.28,
      vx: (random() - 0.5) * 0.72,
      vy: (random() - 0.5) * 0.72,
    }));
  }, [seed]);
  const [time, setTime] = useState(0);
  const [cells, setCells] = useState(6);
  const [uncertainty, setUncertainty] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () =>
        setTime((value) => {
          const next = value + 0.006;
          if (next >= 1) {
            setPlaying(false);
            return 1;
          }
          return next;
        }),
      40,
    );
    return () => window.clearInterval(timer);
  }, [playing]);
  const randomNoise = useMemo(() => {
    const random = mulberry32(seed + 99);
    return initial.map(() => ({ x: random() - 0.5, y: random() - 0.5 }));
  }, [initial, seed]);
  const positions = initial.map((particle, index) =>
    coarseParticleState(
      particle,
      time,
      reverse,
      uncertainty,
      randomNoise[index] ?? { x: 0, y: 0 },
    ),
  );
  const counts = Array(cells * cells).fill(0) as number[];
  positions.forEach((point) => {
    const index =
      Math.min(cells - 1, Math.floor(point.y * cells)) * cells +
      Math.min(cells - 1, Math.floor(point.x * cells));
    counts[index] = (counts[index] ?? 0) + 1;
  });
  const entropy = shannonEntropy(
    counts.map((count) => count / positions.length),
  );
  const maxEntropy = Math.log2(cells * cells);
  const reconstruction =
    reverse && time > 0.5
      ? positions.reduce((sum, point, index) => {
          const origin = initial[index] ?? point;
          return sum + Math.hypot(point.x - origin.x, point.y - origin.y);
        }, 0) / positions.length
      : 0;
  const occupied = counts.filter((count) => count > 0).length;
  const completion =
    reverse && time > 0.5 ? (time - 0.5) * 2 : Math.min(1, time * 2);
  return (
    <VizFrame
      id="V21"
      title="Deux descriptions du même système"
      question="Que perd-on en remplaçant les trajectoires par une densité en cases ?"
      className={className}
      caveat="Les particules subissent des réflexions parfaitement élastiques sur les quatre parois, mais ne collisionnent pas entre elles. L’incertitude est appliquée comme une erreur de vitesse au moment de l’inversion. L’entropie affichée est celle de l’histogramme spatial choisi : elle dépend du nombre de cases et n’est pas l’entropie thermodynamique complète."
      controls={
        <>
          <TransportControl
            playing={playing}
            onToggle={() => {
              if (!playing && time >= 1) setTime(0);
              setPlaying((value) => !value);
            }}
            onReset={() => {
              setPlaying(false);
              setTime(0);
            }}
            time={`t = ${formatNumber(time, 2)}`}
            progress={time}
            label="Défilement des trajectoires microscopiques"
          />
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setTime(0);
            }}
          >
            État initial
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setTime(0.5);
            }}
          >
            Instant de l’inversion
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setTime(1);
            }}
          >
            Tentative de retour
          </button>
          <button
            type="button"
            aria-pressed={reverse}
            onClick={() => setReverse((value) => !value)}
          >
            Inverser vx, vy à t = 0,5
          </button>
          <RangeControl
            label="Temps"
            value={time}
            min={0}
            max={1}
            step={0.01}
            onChange={(value) => {
              setPlaying(false);
              setTime(value);
            }}
          />
          <RangeControl
            label="Cases par côté"
            value={cells}
            min={3}
            max={10}
            step={1}
            onChange={setCells}
          />
          <RangeControl
            label="Erreur de vitesse à l’inversion"
            value={uncertainty}
            min={0}
            max={10}
            step={0.5}
            unit="%"
            onChange={setUncertainty}
          />
        </>
      }
      stats={
        <>
          <Metric label="S grille" value={formatNumber(entropy)} unit="bits" />
          <Metric label="Cases occupées" value={`${occupied}/${cells ** 2}`} />
          <Metric
            label="Erreur retour"
            value={formatNumber(reconstruction, 3)}
            unit="L"
          />
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <h4>Microdescription · positions et vitesses</h4>
          <svg
            viewBox="0 0 100 106"
            role="img"
            aria-label={`Positions et directions de ${positions.length} particules au temps ${time}`}
          >
            <rect
              x="1"
              y="1"
              width="98"
              height="98"
              fill="none"
              stroke="var(--ev-line)"
            />
            {positions.map((point, index) => {
              const x = 2 + point.x * 96;
              const y = 2 + point.y * 96;
              return (
                <g key={index}>
                  <path
                    d={`M${x} ${y}l${point.vx * 3} ${point.vy * 3}`}
                    stroke="var(--ev-muted)"
                    strokeWidth=".45"
                  />
                  <circle cx={x} cy={y} r="1.25" fill="var(--ev-gold)" />
                </g>
              );
            })}
            {reverse ? (
              <path
                d="M50 0V100"
                stroke="var(--ev-info)"
                strokeDasharray="2 2"
                opacity={time === 0.5 ? 1 : 0.25}
              />
            ) : null}
            <text x="2" y="105" fill="var(--ev-muted)" fontSize="4">
              phase du trajet : {Math.round(completion * 100)} %
            </text>
          </svg>
        </div>
        <div className="entropy-viz__panel">
          <h4>Macrodescription · effectifs par cellule</h4>
          <svg
            viewBox={`0 0 ${cells} ${cells}`}
            role="img"
            aria-label={counts
              .map((count, index) => `case ${index + 1}: ${count}`)
              .join(", ")}
          >
            {counts.map((count, index) => (
              <rect
                key={index}
                x={index % cells}
                y={Math.floor(index / cells)}
                width=".94"
                height=".94"
                fill="var(--ev-cold)"
                opacity={0.08 + (0.92 * count) / Math.max(...counts, 1)}
              />
            ))}
          </svg>
          <p aria-live="polite">
            S = {formatNumber(entropy)} / {formatNumber(maxEntropy)} bits.{" "}
            {reverse && time === 1 && uncertainty === 0
              ? "Avec toutes les vitesses exactes, l’état initial est reconstruit."
              : reverse && time > 0.5 && uncertainty > 0
                ? "Dans ce modèle, l’erreur de vitesse dégrade progressivement le retour microscopique."
                : "La valeur dépend du maillage : changer les cases change la description, pas les particules."}
          </p>
        </div>
      </div>
    </VizFrame>
  );
}

export default V21CoarseGraining;
