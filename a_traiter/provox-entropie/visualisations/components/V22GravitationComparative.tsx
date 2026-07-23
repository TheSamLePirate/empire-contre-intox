import { useEffect, useMemo, useState } from "react";
import {
  Metric,
  RangeControl,
  TransportControl,
  VizFrame,
} from "../shared/VizFrame";
import { formatNumber, mulberry32 } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

type SeedPoint = { x: number; y: number; angle: number; cluster: number };
const MILESTONES = [
  {
    at: 0,
    label: "Même départ",
    insight:
      "Les deux systèmes partent de la même fluctuation de densité : seule la dynamique change.",
  },
  {
    at: 0.28,
    label: "Dispersion",
    insight:
      "Sans force attractive, les trajectoires se dispersent et les écarts de densité s’atténuent.",
  },
  {
    at: 0.58,
    label: "Effondrement",
    insight:
      "Avec gravitation, une surdensité attire davantage de matière : la fluctuation s’amplifie.",
  },
  {
    at: 0.82,
    label: "Amas formés",
    insight:
      "Le schéma concentre progressivement les points vers trois surdensités ; il n’intègre pas leurs équations du mouvement.",
  },
  {
    at: 1,
    label: "État tardif",
    insight:
      "Le gaz occupe presque uniformément l’espace, tandis que la matière autogravitante conserve des structures très contrastées.",
  },
];

function densityContrast(points: { x: number; y: number }[], cells = 6) {
  const counts = Array(cells * cells).fill(0) as number[];
  points.forEach(({ x, y }) => {
    const index =
      Math.min(cells - 1, Math.floor(y * cells)) * cells +
      Math.min(cells - 1, Math.floor(x * cells));
    counts[index] = (counts[index] ?? 0) + 1;
  });
  const mean = points.length / counts.length;
  return (
    Math.sqrt(
      counts.reduce((sum, count) => sum + (count - mean) ** 2, 0) /
        counts.length,
    ) / mean
  );
}

export function V22GravitationComparative({
  className,
  seed = 2201,
}: VisualizationProps) {
  const seeds = useMemo(() => {
    const random = mulberry32(seed);
    return Array.from({ length: 54 }, (): SeedPoint => ({
      x: 0.42 + (random() - 0.5) * 0.18,
      y: 0.48 + (random() - 0.5) * 0.18,
      angle: random() * Math.PI * 2,
      cluster: Math.floor(random() * 3),
    }));
  }, [seed]);
  const [evolution, setEvolution] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(
      () =>
        setEvolution((value) => {
          const next = value + 1 / 250;
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
  const centers: [number, number][] = [
    [0.25, 0.3],
    [0.7, 0.35],
    [0.5, 0.74],
  ];
  const plain = seeds.map((point, index) => {
    const targetX = ((index * 0.6180339) % 1) * 0.88 + 0.06;
    const targetY = ((index * 0.4142135) % 1) * 0.88 + 0.06;
    return {
      x: point.x * (1 - evolution) + targetX * evolution,
      y: point.y * (1 - evolution) + targetY * evolution,
    };
  });
  const gravity = seeds.map((point, index) => {
    const center = centers[point.cluster] ?? [0.5, 0.5];
    const radius = 0.025 + (index % 7) * 0.008;
    const targetX = center[0] + Math.cos(point.angle + evolution * 5) * radius;
    const targetY = center[1] + Math.sin(point.angle + evolution * 5) * radius;
    return {
      x: point.x * (1 - evolution) + targetX * evolution,
      y: point.y * (1 - evolution) + targetY * evolution,
    };
  });
  const gasContrast = densityContrast(plain);
  const gravityContrast = densityContrast(gravity);
  const milestoneIndex = MILESTONES.reduce(
    (active, milestone, index) => (evolution >= milestone.at ? index : active),
    0,
  );
  const milestone = MILESTONES[milestoneIndex]!;
  const setTime = (value: number) => {
    setPlaying(false);
    setEvolution(Math.min(1, Math.max(0, value)));
  };
  return (
    <VizFrame
      id="V22"
      title="Gaz et matière autogravitante · schéma comparatif"
      question="Pourquoi la gravitation renverse-t-elle l’intuition d’homogénéisation ?"
      className={className}
      caveat="Interpolation illustrative, pas simulation temporelle ni intégration à N corps. Le contraste de densité n’est pas une entropie gravitationnelle ; le schéma omet collisions réalistes, expansion cosmique, relativité générale et rayonnement."
      controls={
        <>
          <TransportControl
            playing={playing}
            onToggle={() => {
              if (!playing && evolution >= 1) setEvolution(0);
              setPlaying((value) => !value);
            }}
            onReset={() => {
              setPlaying(false);
              setEvolution(0);
            }}
            time={`${Math.round(evolution * 100)} %`}
            progress={evolution}
            label="Défilement du schéma comparatif"
          />
          {MILESTONES.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={milestoneIndex === index}
              onClick={() => setTime(item.at)}
            >
              {index + 1} · {item.label}
            </button>
          ))}
          <RangeControl
            label="Progression illustrative"
            value={Math.round(evolution * 100)}
            min={0}
            max={100}
            step={1}
            unit="%"
            onChange={(value) => setTime(value / 100)}
          />
        </>
      }
      stats={
        <>
          <Metric
            label="Contraste gaz σρ/ρ̄"
            value={formatNumber(gasContrast)}
          />
          <Metric
            label="Contraste gravité σρ/ρ̄"
            value={formatNumber(gravityContrast)}
          />
          <Metric label="Nature" value="interpolation" />
        </>
      }
    >
      <div className="entropy-viz__grid">
        {[
          {
            title: "Sans gravitation · diffusion",
            points: plain,
            color: "var(--ev-cold)",
            contrast: gasContrast,
          },
          {
            title: "Attraction newtonienne stylisée · amas",
            points: gravity,
            color: "var(--ev-hot)",
            contrast: gravityContrast,
          },
        ].map((panel, panelIndex) => (
          <div className="entropy-viz__panel" key={panel.title}>
            <h4>{panel.title}</h4>
            <svg
              viewBox="0 0 100 106"
              role="img"
              aria-label={`${panel.title}, contraste de densité ${formatNumber(panel.contrast)}`}
            >
              <defs>
                <radialGradient id={`v22-halo-${panelIndex}`}>
                  <stop stopColor={panel.color} stopOpacity=".24" />
                  <stop offset="1" stopColor={panel.color} stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect
                x="1"
                y="1"
                width="98"
                height="98"
                fill="none"
                stroke="var(--ev-line)"
              />
              {panelIndex === 1
                ? centers.map(([x, y], index) => (
                    <circle
                      key={index}
                      cx={x * 100}
                      cy={y * 100}
                      r={8 + evolution * 7}
                      fill={`url(#v22-halo-${panelIndex})`}
                    />
                  ))
                : null}
              {panel.points.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x * 100}
                  cy={point.y * 100}
                  r="1.45"
                  fill={panel.color}
                />
              ))}
              <text x="2" y="105" fill="var(--ev-muted)" fontSize="4">
                σρ/ρ̄ = {formatNumber(panel.contrast)} · grille 6×6
              </text>
            </svg>
          </div>
        ))}
      </div>
      <div
        className="entropy-viz__panel"
        aria-live="polite"
        style={{ marginTop: "1rem" }}
      >
        <h4>
          {milestone.label} · progression {Math.round(evolution * 100)} %
        </h4>
        <p>
          <strong>Lecture de la timeline :</strong> {milestone.insight}
        </p>
        <p>
          <strong>Structure visible :</strong>{" "}
          {gravityContrast > gasContrast
            ? "la branche gravitationnelle est plus concentrée"
            : "les deux branches restent encore comparables"}
          .
        </p>
        <p>
          <strong>À ne pas confondre :</strong> le contraste σρ/ρ̄ mesure
          l’inhomogénéité de cette image. Ce n’est pas une entropie
          gravitationnelle.
        </p>
      </div>
    </VizFrame>
  );
}

export default V22GravitationComparative;
