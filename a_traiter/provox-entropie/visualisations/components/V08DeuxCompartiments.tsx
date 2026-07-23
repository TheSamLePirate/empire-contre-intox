import { useMemo, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { LinePlot } from "../shared/plots";
import { formatNumber, linspace, logChoose, mulberry32 } from "../shared/math";
type VisualizationProps = { className?: string; seed?: number };
const choices = [10, 20, 100, 1000];
function logP(n: number, k: number, p: number) {
  return logChoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p);
}
function binomialDraw(n: number, p: number, rng: () => number) {
  let k = 0;
  for (let i = 0; i < n; i++) if (rng() < p) k++;
  return k;
}
function probabilityLabel(logValue: number) {
  if (logValue < -16) return Math.exp(logValue).toExponential(2);
  return formatNumber(Math.exp(logValue), 5);
}
export function V08DeuxCompartiments({
  className = "",
  seed = 808,
}: VisualizationProps) {
  const [n, setN] = useState(20),
    [p, setP] = useState(0.5),
    [left, setLeft] = useState(10),
    [draw, setDraw] = useState(0);
  const k = Math.max(0, Math.min(n, left)),
    mean = n * p,
    sigma = Math.sqrt(n * p * (1 - p)),
    mode = Math.floor((n + 1) * p),
    currentLogP = logP(n, k, p),
    modeLogP = logP(n, mode, p),
    z = sigma ? Math.abs(k - mean) / sigma : 0;
  const ks = useMemo(() => {
    if (n <= 100) return linspace(0, n, n + 1).map(Math.round);
    return linspace(0, n, 121)
      .map(Math.round)
      .filter((v, i, a) => i === 0 || v !== a[i - 1]);
  }, [n]);
  const probabilityCurve = useMemo(
      () => [
        {
          label: "Probabilité relative",
          points: ks.map((x) => ({ x, y: Math.exp(logP(n, x, p) - modeLogP) })),
        },
      ],
      [ks, n, p, modeLogP],
    ),
    multiplicityCurve = useMemo(
      () => [
        { label: "ln Ω", points: ks.map((x) => ({ x, y: logChoose(n, x) })) },
      ],
      [ks, n],
    );
  const particles = useMemo(() => {
    const rng = mulberry32(seed + n * 31 + k * 17 + draw);
    const shown = Math.min(n, 120),
      shownLeft = Math.round((k * shown) / n);
    return Array.from({ length: shown }, (_, i) => ({
      side: i < shownLeft ? 0 : 1,
      x: rng(),
      y: rng(),
    }));
  }, [seed, n, k, draw]);
  const chooseN = (value: number) => {
      setN(value);
      setLeft(Math.round(value * p));
    },
    sample = () => {
      const rng = mulberry32(seed + draw * 997 + n);
      setLeft(binomialDraw(n, p, rng));
      setDraw((v) => v + 1);
    };
  return (
    <VizFrame
      id="V8"
      title="Gaz à deux compartiments"
      question="Pourquoi l’équilibre statistique devient-il écrasant quand N augmente ?"
      caveat="Particules indépendantes, distinguables et sans interaction. La probabilité de présence à gauche est assimilée à la fraction de volume p. Pour N > 120, les points sont un échantillon graphique, pas toutes les particules."
      className={className}
      stats={
        <>
          <Metric label="Macro-état" value={`${k} gauche · ${n - k} droite`} />
          <Metric
            label="Écart à la moyenne"
            value={formatNumber(z, 2)}
            unit="σ"
          />
          <Metric
            label="P exacte du macro-état"
            value={probabilityLabel(currentLogP)}
          />
        </>
      }
      controls={
        <>
          <label>
            Nombre de particules{" "}
            <select
              value={n}
              onChange={(e) => chooseN(Number(e.currentTarget.value))}
            >
              {choices.map((value) => (
                <option key={value} value={value}>
                  {value.toLocaleString("fr-FR")}
                </option>
              ))}
            </select>
          </label>
          <RangeControl
            label="Fraction de volume à gauche"
            value={Math.round(p * 100)}
            min={10}
            max={90}
            step={5}
            unit="%"
            onChange={(v) => {
              const next = v / 100;
              setP(next);
              setLeft(Math.round(n * next));
            }}
          />
          <RangeControl
            label="Particules à gauche"
            value={k}
            min={0}
            max={n}
            step={1}
            onChange={setLeft}
          />
          <button type="button" onClick={sample}>
            Tirer un macro-état au hasard
          </button>
          <button type="button" onClick={() => setLeft(mode)}>
            Rejoindre le maximum
          </button>
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <h4>Un micro-état compatible</h4>
          <svg
            viewBox="0 0 720 320"
            className="entropy-viz__plot"
            role="img"
            aria-label={`${k} particules sur ${n} sont dans le compartiment gauche occupant ${Math.round(p * 100)} pour cent du volume`}
          >
            <title>
              Particules dans deux compartiments de volumes réglables
            </title>
            <rect
              x="18"
              y="20"
              width="684"
              height="258"
              rx="10"
              fill="var(--ev-bg)"
              stroke="var(--ev-muted)"
              strokeWidth="3"
            />
            <line
              x1={18 + 684 * p}
              x2={18 + 684 * p}
              y1="20"
              y2="278"
              stroke="var(--ev-gold)"
              strokeWidth="6"
            />
            {particles.map((dot, i) => {
              const leftWidth = 684 * p,
                rightWidth = 684 * (1 - p);
              return (
                <circle
                  key={i}
                  cx={
                    dot.side === 0
                      ? 28 + dot.x * Math.max(2, leftWidth - 20)
                      : 28 + leftWidth + dot.x * Math.max(2, rightWidth - 20)
                  }
                  cy={31 + dot.y * 236}
                  r={n > 100 ? 3.5 : 7}
                  fill={dot.side === 0 ? "var(--ev-hot)" : "var(--ev-cold)"}
                  opacity=".9"
                />
              );
            })}
            <text
              className="entropy-viz__label"
              x={18 + 342 * p}
              y="305"
              textAnchor="middle"
            >
              gauche · {k}
            </text>
            <text
              className="entropy-viz__label"
              x={18 + 684 * p + 342 * (1 - p)}
              y="305"
              textAnchor="middle"
            >
              droite · {n - k}
            </text>
          </svg>
          <p>
            {n > 120
              ? `${particles.length} points représentent fidèlement la proportion choisie.`
              : "Chaque point représente une particule."}{" "}
            Un tirage aléatoire utilise la loi binomiale B(N,p).
          </p>
        </div>
        <div className="entropy-viz__panel">
          <h4>Probabilité des macro-états</h4>
          <LinePlot
            series={probabilityCurve}
            xLabel="n à gauche"
            yLabel="P/Pmax"
            height={235}
          />
          <p>
            La largeur typique vaut σ ={" "}
            <strong>{formatNumber(sigma, 2)} particules</strong>, mais la
            largeur relative σ/N ={" "}
            <strong>{formatNumber((100 * sigma) / n, 2)} %</strong> diminue
            comme 1/√N.
          </p>
        </div>
        <div className="entropy-viz__panel">
          <h4>Multiplicité combinatoire</h4>
          <LinePlot
            series={multiplicityCurve}
            xLabel="n à gauche"
            yLabel="ln Ω"
            height={235}
          />
          <dl>
            <dt>ln Ω du macro-état</dt>
            <dd>{formatNumber(logChoose(n, k), 2)}</dd>
            <dt>Maximum de Ω</dt>
            <dd>près de N/2</dd>
            <dt>Maximum de probabilité</dt>
            <dd>près de Np = {formatNumber(mean, 1)}</dd>
          </dl>
          <p>
            Si les volumes diffèrent, les poids pᵏ(1−p)ᴺ⁻ᵏ déplacent le maximum
            probable même si Ω reste symétrique.
          </p>
        </div>
      </div>
    </VizFrame>
  );
}
export default V08DeuxCompartiments;
