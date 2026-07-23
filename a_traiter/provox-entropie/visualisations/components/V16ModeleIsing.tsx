import { useEffect, useMemo, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { mulberry32 } from "../shared/math";
import { BarPlot, LinePlot } from "../shared/plots";
import type { VisualizationProps } from "../shared/types";

type Spin = -1 | 1;
const BURN_IN_SWEEPS = 40;
const MIN_MEASUREMENTS = 20;

function initialSpins(size: number, seed: number): Spin[] {
  const random = mulberry32(seed);
  return Array.from({ length: size * size }, (): Spin =>
    random() < 0.5 ? -1 : 1,
  );
}

function observables(spins: Spin[], size: number, field: number) {
  let energy = 0;
  let magnetization = 0;
  for (let y = 0; y < size; y += 1)
    for (let x = 0; x < size; x += 1) {
      const index = y * size + x;
      const spin = spins[index]!;
      magnetization += spin;
      energy -=
        spin *
        (spins[y * size + ((x + 1) % size)]! +
          spins[((y + 1) % size) * size + x]!);
      energy -= field * spin;
    }
  return { e: energy / spins.length, m: magnetization / spins.length };
}

function sweep(
  spins: Spin[],
  size: number,
  temperature: number,
  field: number,
  seed: number,
): Spin[] {
  const next = spins.slice();
  const random = mulberry32(seed);
  for (let attempt = 0; attempt < next.length; attempt += 1) {
    const index = Math.floor(random() * next.length);
    const x = index % size;
    const y = Math.floor(index / size);
    const neighbors =
      next[y * size + ((x + 1) % size)]! +
      next[y * size + ((x - 1 + size) % size)]! +
      next[((y + 1) % size) * size + x]! +
      next[((y - 1 + size) % size) * size + x]!;
    const deltaE = 2 * next[index]! * (neighbors + field);
    if (deltaE <= 0 || random() < Math.exp(-deltaE / temperature))
      next[index] = next[index] === 1 ? -1 : 1;
  }
  return next;
}

export function V16ModeleIsing({ className, seed = 1616 }: VisualizationProps) {
  const [size, setSize] = useState(24);
  const [temperature, setTemperature] = useState(2.1);
  const [field, setField] = useState(0);
  const [spins, setSpins] = useState(() => initialSpins(size, seed));
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState<{ e: number; m: number }[]>([]);
  const [running, setRunning] = useState(false);

  const reset = (nextSize = size) => {
    setSpins(initialSpins(nextSize, seed));
    setStep(0);
    setHistory([]);
  };
  const invalidateMeasurements = () => {
    setRunning(false);
    setStep(0);
    setHistory([]);
  };
  const advance = (count = 1) => {
    let next = spins;
    const nextHistory = history.slice();
    for (let i = 0; i < count; i += 1) {
      next = sweep(
        next,
        size,
        temperature,
        field,
        seed + (step + i + 1) * 65537,
      );
      if (step + i + 1 > BURN_IN_SWEEPS)
        nextHistory.push(observables(next, size, field));
    }
    setSpins(next);
    setStep((value) => value + count);
    setHistory(nextHistory.slice(-120));
  };

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(() => advance(1), 180);
    return () => window.clearInterval(timer);
  });

  const current = observables(spins, size, field);
  const fluctuationStats = useMemo(() => {
    if (history.length < 2) return { heatCapacity: 0, susceptibility: 0 };
    const meanE =
      history.reduce((sum, value) => sum + value.e, 0) / history.length;
    const meanM =
      history.reduce((sum, value) => sum + value.m, 0) / history.length;
    const varE =
      history.reduce((sum, value) => sum + (value.e - meanE) ** 2, 0) /
      history.length;
    const varM =
      history.reduce((sum, value) => sum + (value.m - meanM) ** 2, 0) /
      history.length;
    return {
      heatCapacity: (size * size * varE) / (temperature * temperature),
      susceptibility: (size * size * varM) / temperature,
    };
  }, [history, size, temperature]);
  const histogram = Array.from({ length: 9 }, () => 0);
  history.forEach((value) => {
    const bin = Math.min(8, Math.floor((value.m + 1) * 4.5));
    histogram[bin] = histogram[bin]! + 1;
  });
  const regime =
    Math.abs(field) > 0.05
      ? "symétrie brisée par le champ"
      : temperature < 2.05
        ? "phase ordonnée"
        : temperature > 2.5
          ? "phase désordonnée"
          : "zone critique";
  const thermalized = step >= BURN_IN_SWEEPS;
  const estimable = history.length >= MIN_MEASUREMENTS;

  return (
    <VizFrame
      id="V16"
      title="Modèle d’Ising"
      question="Comment l’ordre collectif et les fluctuations changent-ils près d’une transition de phase ?"
      caveat="Ising 2D carré, conditions périodiques, J = kB = 1 et échantillon court. C et χ estimés sur l’historique ne sont fiables qu’après thermalisation et avec bien davantage de tirages indépendants."
      className={className}
      stats={
        <>
          <Metric label="Régime attendu" value={regime} />
          <Metric label="Énergie E/(NJ)" value={current.e.toFixed(3)} />
          <Metric label="Magnétisation M/N" value={current.m.toFixed(3)} />
          <Metric
            label="Échantillon"
            value={
              estimable
                ? `${history.length} mesures`
                : thermalized
                  ? `collecte ${history.length}/${MIN_MEASUREMENTS}`
                  : `thermalisation ${step}/${BURN_IN_SWEEPS}`
            }
          />
        </>
      }
      controls={
        <>
          <RangeControl
            label="Température kBT/J"
            value={temperature}
            min={0.6}
            max={4.5}
            step={0.05}
            onChange={(value) => {
              setTemperature(value);
              invalidateMeasurements();
            }}
          />
          <RangeControl
            label="Champ h/J"
            value={field}
            min={-0.5}
            max={0.5}
            step={0.05}
            onChange={(value) => {
              setField(value);
              invalidateMeasurements();
            }}
          />
          <label>
            Grille{" "}
            <select
              value={size}
              onChange={(event) => {
                const next = Number(event.currentTarget.value);
                setSize(next);
                reset(next);
              }}
            >
              <option value={16}>16 × 16</option>
              <option value={24}>24 × 24</option>
              <option value={32}>32 × 32</option>
            </select>
          </label>
          <button type="button" onClick={() => advance(1)}>
            1 balayage
          </button>
          <button type="button" onClick={() => advance(20)}>
            20 balayages
          </button>
          <button
            type="button"
            aria-pressed={running}
            onClick={() => setRunning((value) => !value)}
          >
            {running ? "Pause" : "Animer"}
          </button>
          <button
            type="button"
            onClick={() => {
              setTemperature(1.5);
              setField(0);
              reset();
            }}
          >
            Phase ordonnée
          </button>
          <button
            type="button"
            onClick={() => {
              setTemperature(2.269);
              setField(0);
              reset();
            }}
          >
            Point critique
          </button>
          <button
            type="button"
            onClick={() => {
              setTemperature(3.5);
              setField(0);
              reset();
            }}
          >
            Phase désordonnée
          </button>
          <button type="button" onClick={() => reset()}>
            Réinitialiser
          </button>
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <strong>Configuration microscopique</strong>
          <svg
            className="entropy-viz__plot"
            viewBox={`0 0 ${size} ${size}`}
            role="img"
            aria-labelledby="v16-grid-title v16-grid-desc"
            style={{ imageRendering: "pixelated", maxHeight: "22rem" }}
          >
            <title id="v16-grid-title">Grille de spins d’Ising</title>
            <desc id="v16-grid-desc">{`${size} par ${size} spins, magnétisation moyenne ${current.m.toFixed(3)}. Les cases dorées sont plus un et les bleues moins un.`}</desc>
            {spins.map((spin, index) => (
              <rect
                key={index}
                x={index % size}
                y={Math.floor(index / size)}
                width="1"
                height="1"
                fill={spin > 0 ? "var(--ev-gold)" : "var(--ev-cold)"}
              />
            ))}
          </svg>
          <p className="entropy-viz__legend">
            <span>
              <i className="entropy-viz__dot" />
              spin +1
            </span>
            <span>
              <i className="entropy-viz__dot entropy-viz__dot--cold" />
              spin −1
            </span>
          </p>
        </div>
        <div className="entropy-viz__panel">
          <strong>Observables au fil des balayages</strong>
          <LinePlot
            series={[
              {
                label: "énergie",
                points: history.map((value, index) => ({
                  x: index,
                  y: value.e,
                })),
              },
              {
                label: "magnétisation",
                points: history.map((value, index) => ({
                  x: index,
                  y: value.m,
                })),
              },
            ]}
            xLabel="balayages"
            yLabel="E/N, M/N"
            width={500}
            height={210}
          />
          <strong>Distribution récente de M/N</strong>
          <BarPlot
            values={histogram}
            labels={[
              "−1",
              "−.75",
              "−.5",
              "−.25",
              "0",
              ".25",
              ".5",
              ".75",
              "+1",
            ]}
          />
        </div>
      </div>
      <p className="entropy-viz__legend">
        Température critique exacte dans la limite d’une grille infinie et à h =
        0 : Tc ≈ 2,269 J/kB. Après {step} balayages,{" "}
        {estimable ? (
          <>
            C/N ≈ {fluctuationStats.heatCapacity.toFixed(2)} et χ/N ≈{" "}
            {fluctuationStats.susceptibility.toFixed(2)} sur {history.length}{" "}
            mesures post-thermalisation
          </>
        ) : (
          <>
            les estimateurs C/N et χ/N restent masqués jusqu’à{" "}
            {MIN_MEASUREMENTS} mesures après les {BURN_IN_SWEEPS} balayages de
            thermalisation
          </>
        )}
        . Graine : {seed}.
      </p>
    </VizFrame>
  );
}

export default V16ModeleIsing;
