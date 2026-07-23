import { useEffect, useMemo, useState } from "react";
import {
  Metric,
  RangeControl,
  TransportControl,
  VizFrame,
} from "../shared/VizFrame";
import { formatNumber, lerp, linspace } from "../shared/math";
type VisualizationProps = { className?: string; seed?: number };
type State = { V: number; T: number; P: number; S: number };

const R = 8.314,
  gamma = 1.4,
  cv = R / (gamma - 1);
const names = [
  "Détente isotherme chaude",
  "Détente adiabatique",
  "Compression isotherme froide",
  "Compression adiabatique",
];
export function sampleCarnotSegment(a: State, b: State, index: number) {
  return linspace(0, 1, 32).map((u) => {
    const V = lerp(a.V, b.V, u);
    if (index === 0 || index === 2) {
      const T = a.T;
      return { V, T, P: (R * T) / V, S: a.S + R * Math.log(V / a.V) };
    }
    const invariant = a.T * Math.pow(a.V, gamma - 1);
    const T = invariant / Math.pow(V, gamma - 1);
    return { V, T, P: (R * T) / V, S: a.S };
  });
}
function Diagram({
  states,
  current,
  type,
}: {
  states: State[];
  current: State;
  type: "pv" | "ts";
}) {
  const width = 440,
    height = 250,
    pad = 42;
  const points = states.flatMap((s, i) =>
    i < 4 ? sampleCarnotSegment(s, states[i + 1]!, i) : [],
  );
  const xs = points.map((p) => (type === "pv" ? p.V : p.S)),
    ys = points.map((p) => (type === "pv" ? p.P : p.T)),
    minX = Math.min(...xs),
    maxX = Math.max(...xs),
    minY = Math.min(...ys),
    maxY = Math.max(...ys);
  const sx = (x: number) =>
      pad + ((x - minX) / (maxX - minX)) * (width - pad * 1.5),
    sy = (y: number) =>
      height - pad - ((y - minY) / (maxY - minY)) * (height - pad * 1.5);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="entropy-viz__plot"
      role="img"
      aria-label={
        type === "pv"
          ? "Diagramme pression volume du cycle de Carnot"
          : "Diagramme température entropie du cycle de Carnot"
      }
    >
      <title>
        {type === "pv"
          ? "Cycle sur le plan pression-volume"
          : "Cycle sur le plan température-entropie"}
      </title>
      <path
        d={`M${pad} 16V${height - pad}H${width - 16}`}
        className="entropy-viz__axis"
      />
      {[0, 1, 2, 3].map((i) => {
        const segment = sampleCarnotSegment(states[i]!, states[i + 1]!, i);
        const d = segment
          .map(
            (p, j) =>
              `${j ? "L" : "M"}${sx(type === "pv" ? p.V : p.S)},${sy(type === "pv" ? p.P : p.T)}`,
          )
          .join("");
        return (
          <path
            key={i}
            d={d}
            className={`entropy-viz__series entropy-viz__series--${i + 1}`}
          />
        );
      })}
      <circle
        cx={sx(type === "pv" ? current.V : current.S)}
        cy={sy(type === "pv" ? current.P : current.T)}
        r="7"
        fill="var(--ev-text)"
        stroke="var(--ev-gold)"
        strokeWidth="3"
      />
      {states.slice(0, 4).map((s, i) => (
        <text
          key={i}
          className="entropy-viz__label"
          x={sx(type === "pv" ? s.V : s.S) + 7}
          y={sy(type === "pv" ? s.P : s.T) - 8}
        >
          {i + 1}
        </text>
      ))}
      <text
        className="entropy-viz__label"
        x={width - 18}
        y={height - 10}
        textAnchor="end"
      >
        {type === "pv" ? "V (L)" : "S−S₁ (J·K⁻¹·mol⁻¹)"}
      </text>
      <text className="entropy-viz__label" x="8" y="15">
        {type === "pv" ? "P (kPa)" : "T (K)"}
      </text>
    </svg>
  );
}

export function V03CycleCarnotSynchronise({
  className = "",
}: VisualizationProps) {
  const [step, setStep] = useState(0),
    [progress, setProgress] = useState(0),
    [playing, setPlaying] = useState(false),
    [hot, setHot] = useState(600),
    [cold, setCold] = useState(300),
    [friction, setFriction] = useState(0);
  const tc = Math.min(cold, hot - 20),
    ratio = 2,
    adiabaticRatio = Math.pow(hot / tc, 1 / (gamma - 1)),
    v1 = 10,
    v2 = v1 * ratio,
    v3 = v2 * adiabaticRatio,
    v4 = v1 * adiabaticRatio,
    ds = R * Math.log(ratio);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () =>
        setProgress((value) => {
          if (value < 0.99) return Math.min(1, value + 0.02);
          setStep((current) => (current + 1) % 4);
          return 0;
        }),
      55,
    );
    return () => window.clearInterval(timer);
  }, [playing]);
  const states: State[] = useMemo(
    () => [
      { V: v1, T: hot, P: (R * hot) / v1, S: 0 },
      { V: v2, T: hot, P: (R * hot) / v2, S: ds },
      { V: v3, T: tc, P: (R * tc) / v3, S: ds },
      { V: v4, T: tc, P: (R * tc) / v4, S: 0 },
      { V: v1, T: hot, P: (R * hot) / v1, S: 0 },
    ],
    [v1, v2, v3, v4, hot, tc, ds],
  );
  const segment = sampleCarnotSegment(states[step]!, states[step + 1]!, step),
    current =
      segment[Math.round(progress * (segment.length - 1))] ?? states[step]!;
  const segmentStart = states[step]!;
  const adiabaticInvariant = current.T * Math.pow(current.V, gamma - 1);
  const qIdeal =
      [R * hot * Math.log(ratio), 0, -R * tc * Math.log(ratio), 0][step] ?? 0,
    wIdeal =
      [
        R * hot * Math.log(ratio),
        cv * (hot - tc),
        -R * tc * Math.log(ratio),
        -cv * (hot - tc),
      ][step] ?? 0,
    lost = (Math.abs(wIdeal) * friction) / 100,
    wBy = wIdeal - lost,
    dissipationTemperature =
      step === 0 ? hot : step === 2 ? tc : (hot - tc) / Math.log(hot / tc),
    sgen = lost / dissipationTemperature,
    cycleWork = R * (hot - tc) * Math.log(ratio),
    eta = 1 - tc / hot;
  return (
    <VizFrame
      id="V3"
      title="Cycle de Carnot synchronisé"
      question="Que racontent simultanément le piston, P–V et T–S ?"
      caveat="Une mole de gaz parfait diatomique, capacités constantes et transformations quasi statiques. Le mode avec frottement est un proxy énergétique : il suppose la perte thermalisée à la température isotherme ou à la température logarithmique moyenne de l’adiabate, sans recalculer une trajectoire irréversible complète."
      className={className}
      stats={
        <>
          <Metric label="Phase" value={`${step + 1}/4`} />
          <Metric
            label="Travail idéal/cycle"
            value={formatNumber(cycleWork, 0)}
            unit="J/mol"
          />
          <Metric
            label="η Carnot"
            value={formatNumber(eta * 100, 1)}
            unit="%"
          />
        </>
      }
      controls={
        <>
          <TransportControl
            playing={playing}
            onToggle={() => setPlaying((value) => !value)}
            onReset={() => {
              setPlaying(false);
              setStep(0);
              setProgress(0);
            }}
            time={`phase ${step + 1}/4 · ${Math.round(progress * 100)} %`}
            progress={(step + progress) / 4}
            label="Défilement du cycle de Carnot"
          />
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep((step + 3) % 4);
              setProgress(0);
            }}
          >
            Étape précédente
          </button>
          {names.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={step === i}
              aria-label={`Étape ${i + 1} : ${names[i]}`}
              onClick={() => {
                setPlaying(false);
                setStep(i);
                setProgress(0);
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep((step + 1) % 4);
              setProgress(0);
            }}
          >
            Étape suivante
          </button>
          <RangeControl
            label="Avancement de l’étape"
            value={Math.round(progress * 100)}
            min={0}
            max={100}
            step={5}
            unit="%"
            onChange={(v) => {
              setPlaying(false);
              setProgress(v / 100);
            }}
          />
          <RangeControl
            label="Source chaude"
            value={hot}
            min={450}
            max={800}
            step={10}
            unit="K"
            onChange={(v) => setHot(Math.max(v, cold + 20))}
          />
          <RangeControl
            label="Source froide"
            value={tc}
            min={250}
            max={450}
            step={10}
            unit="K"
            onChange={(v) => setCold(Math.min(v, hot - 20))}
          />
          <RangeControl
            label="Dissipation indicative"
            value={friction}
            min={0}
            max={25}
            step={5}
            unit="% du |W|"
            onChange={setFriction}
          />
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <h4>{names[step]}</h4>
          <svg
            viewBox="0 0 440 250"
            className="entropy-viz__plot"
            role="img"
            aria-label={`Piston à ${formatNumber(current.V, 1)} litres et ${formatNumber(current.T, 0)} kelvins`}
          >
            <title>Gaz parfait sous piston mobile</title>
            <rect
              x="82"
              y="26"
              width="276"
              height="188"
              fill="var(--ev-bg)"
              stroke="var(--ev-muted)"
              strokeWidth="3"
            />
            <rect
              x="88"
              y={194 - (125 * (current.V - v1)) / (v3 - v1)}
              width="264"
              height="12"
              rx="4"
              fill="var(--ev-gold)"
            />
            <line
              x1="220"
              y1="18"
              x2="220"
              y2={194 - (125 * (current.V - v1)) / (v3 - v1)}
              stroke="var(--ev-muted)"
              strokeWidth="6"
            />
            {Array.from({ length: 16 }, (_, i) => (
              <circle
                key={i}
                cx={110 + (i % 4) * 70 + Math.sin(i * 8) * 8}
                cy={178 - Math.floor(i / 4) * 22 * (current.V / v3)}
                r="5"
                fill={
                  step === 0
                    ? "var(--ev-hot)"
                    : step === 2
                      ? "var(--ev-cold)"
                      : "var(--ev-info)"
                }
              />
            ))}
            <text
              className="entropy-viz__label"
              x="220"
              y="239"
              textAnchor="middle"
            >
              {step % 2 === 0
                ? `contact thermostat ${step === 0 ? "chaud" : "froid"}`
                : "paroi adiabatique"}
            </text>
          </svg>
          <dl>
            <dt>P</dt>
            <dd>{formatNumber(current.P, 1)} kPa</dd>
            <dt>V</dt>
            <dd>{formatNumber(current.V, 1)} L/mol</dd>
            <dt>T</dt>
            <dd>{formatNumber(current.T, 0)} K</dd>
            <dt>S−S₁</dt>
            <dd>{formatNumber(current.S, 2)} J/K/mol</dd>
          </dl>
        </div>
        <div className="entropy-viz__panel">
          <h4>Diagramme P–V</h4>
          <Diagram states={states} current={current} type="pv" />
        </div>
        <div className="entropy-viz__panel">
          <h4>Diagramme T–S</h4>
          <Diagram states={states} current={current} type="ts" />
          <p>
            L’aire sous le trajet T–S vaut Q uniquement pour le trajet
            réversible représenté.
          </p>
        </div>
        <div
          className="entropy-viz__panel entropy-viz__carnot-balance"
          aria-live="polite"
        >
          <h4>Bilan de l’étape complète</h4>
          <dl className="entropy-viz__balance-grid">
            <div>
              <dt>Chaleur reçue Q</dt>
              <dd>{formatNumber(qIdeal, 0)} J/mol</dd>
            </div>
            <div>
              <dt>Travail fourni W</dt>
              <dd>{formatNumber(wBy, 0)} J/mol</dd>
            </div>
            <div>
              <dt>Dissipation proxy</dt>
              <dd>{formatNumber(lost, 0)} J/mol</dd>
            </div>
            <div>
              <dt>Température de thermalisation</dt>
              <dd>{formatNumber(dissipationTemperature, 0)} K</dd>
            </div>
            <div>
              <dt>Entropie créée proxy</dt>
              <dd>{formatNumber(sgen, 3)} J/K/mol</dd>
            </div>
          </dl>
          <p className="entropy-viz__balance-note">
            {step % 2 === 0 ? (
              <>
                Isotherme : ΔS = R ln(V/V<sub>a</sub>) ={" "}
                {formatNumber(R * Math.log(current.V / segmentStart.V), 3)}{" "}
                J/K/mol à la position courante.
              </>
            ) : (
              <>
                Adiabatique réversible : Q = 0, S constante et T·V<sup>γ−1</sup>{" "}
                = {formatNumber(adiabaticInvariant, 2)} K·L<sup>γ−1</sup>.
              </>
            )}
          </p>
        </div>
      </div>
    </VizFrame>
  );
}
export default V03CycleCarnotSynchronise;
