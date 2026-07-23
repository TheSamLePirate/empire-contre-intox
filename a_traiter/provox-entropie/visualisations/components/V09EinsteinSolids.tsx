import { useCallback, useEffect, useMemo, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { logChoose, mulberry32 } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

function logMultiplicity(oscillators: number, quanta: number) {
  return logChoose(quanta + oscillators - 1, quanta);
}

function inverseTemperature(oscillators: number, quanta: number) {
  // Différence finie de ∂(S/kB)/∂q, donc température en unités ε/kB.
  return (
    logMultiplicity(oscillators, quanta + 1) -
    logMultiplicity(oscillators, quanta)
  );
}

export function V09EinsteinSolids({
  className,
  seed = 9009,
}: VisualizationProps) {
  const [nA, setNA] = useState(6);
  const [nB, setNB] = useState(10);
  const [quanta, setQuanta] = useState(24);
  const [qA, setQA] = useState(9);
  const [sample, setSample] = useState(0);
  const [running, setRunning] = useState(false);

  const distribution = useMemo(() => {
    const rows = Array.from({ length: quanta + 1 }, (_, value) => {
      const lnA = logMultiplicity(nA, value);
      const lnB = logMultiplicity(nB, quanta - value);
      return { qA: value, lnA, lnB, lnTotal: lnA + lnB };
    });
    const maxLog = Math.max(...rows.map(({ lnTotal }) => lnTotal));
    const weights = rows.map(({ lnTotal }) => Math.exp(lnTotal - maxLog));
    const partition = weights.reduce((sum, value) => sum + value, 0);
    return rows.map((row, index) => ({
      ...row,
      probability: weights[index]! / partition,
    }));
  }, [nA, nB, quanta]);
  const current = distribution[qA] ?? distribution[0]!;
  const mostLikely = distribution.reduce((best, row) =>
    row.lnTotal > best.lnTotal ? row : best,
  );
  const meanQA = distribution.reduce(
    (sum, row) => sum + row.qA * row.probability,
    0,
  );
  const maxProbability = Math.max(
    ...distribution.map(({ probability }) => probability),
  );

  const exchange = useCallback(() => {
    const random = mulberry32(seed + sample * 7919);
    const proposal = Math.max(
      0,
      Math.min(quanta, qA + (random() < 0.5 ? -1 : 1)),
    );
    const acceptance = Math.min(
      1,
      Math.exp(distribution[proposal]!.lnTotal - current.lnTotal),
    );
    if (random() < acceptance) setQA(proposal);
    setSample((value) => value + 1);
  }, [current.lnTotal, distribution, qA, quanta, sample, seed]);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(exchange, 280);
    return () => window.clearInterval(timer);
  }, [exchange, running]);

  const setPreset = (a: number, b: number, q: number) => {
    setNA(a);
    setNB(b);
    setQuanta(q);
    setQA(Math.round((q * a) / (a + b)));
    setSample(0);
    setRunning(false);
  };
  const betaA = inverseTemperature(nA, qA);
  const betaB = inverseTemperature(nB, quanta - qA);
  return (
    <VizFrame
      id="V9"
      title="Deux solides d’Einstein"
      question="Quel partage d’énergie domine lorsque deux solides peuvent échanger des quanta ?"
      caveat="Oscillateurs harmoniques indépendants, quanta identiques et énergie totale fixée. La température affichée est une estimation discrète en unités ε/kB ; l’animation Metropolis échantillonne des macro-états, pas les mouvements d’atomes."
      className={className}
      stats={
        <>
          <Metric
            label="Partage le plus probable"
            value={`${mostLikely.qA} / ${quanta - mostLikely.qA}`}
          />
          <Metric
            label="Partage moyen"
            value={meanQA.toFixed(1)}
            unit="quanta dans A"
          />
          <Metric label="S total / kB" value={current.lnTotal.toFixed(2)} />
          <Metric
            label="P du partage"
            value={`${(100 * current.probability).toFixed(2)} %`}
          />
        </>
      }
      controls={
        <>
          <RangeControl
            label="Oscillateurs A"
            value={nA}
            min={2}
            max={20}
            step={1}
            onChange={setNA}
          />
          <RangeControl
            label="Oscillateurs B"
            value={nB}
            min={2}
            max={20}
            step={1}
            onChange={setNB}
          />
          <RangeControl
            label="Quanta totaux"
            value={quanta}
            min={4}
            max={40}
            step={1}
            onChange={(value) => {
              setQuanta(value);
              setQA((q) => Math.min(q, value));
            }}
          />
          <button type="button" onClick={() => setPreset(8, 8, 24)}>
            Solides identiques
          </button>
          <button type="button" onClick={() => setPreset(4, 16, 30)}>
            Tailles différentes
          </button>
          <button type="button" onClick={exchange}>
            Échanger un quantum
          </button>
          <button
            type="button"
            aria-pressed={running}
            onClick={() => setRunning((value) => !value)}
          >
            {running ? "Pause" : "Lancer les échanges"}
          </button>
        </>
      }
    >
      <label className="entropy-viz__range" htmlFor="v09-sharing">
        <span>
          État observé{" "}
          <strong>
            A : {qA} quanta · B : {quanta - qA}
          </strong>
        </span>
        <input
          id="v09-sharing"
          type="range"
          min={0}
          max={quanta}
          value={qA}
          onChange={(event) => setQA(Number(event.currentTarget.value))}
        />
      </label>
      <svg
        className="entropy-viz__plot"
        viewBox="0 0 760 290"
        role="img"
        aria-labelledby="v09-title v09-desc"
      >
        <title id="v09-title">Probabilité des partages d’énergie</title>
        <desc id="v09-desc">{`Maximum pour ${mostLikely.qA} quanta dans A ; état sélectionné ${qA}, probabilité ${(100 * current.probability).toFixed(2)} pour cent.`}</desc>
        <path className="entropy-viz__axis" d="M54 24 V242 H735" />
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <path
              className="entropy-viz__gridline"
              d={`M54 ${242 - 200 * f} H735`}
            />
            <text
              className="entropy-viz__label"
              x="48"
              y={246 - 200 * f}
              textAnchor="end"
            >
              {(100 * maxProbability * f).toFixed(1)} %
            </text>
          </g>
        ))}
        {distribution.map((row) => {
          const w = 660 / distribution.length;
          const h = (200 * row.probability) / maxProbability;
          return (
            <rect
              key={row.qA}
              x={62 + row.qA * w}
              y={242 - h}
              width={Math.max(2, w - 2)}
              height={h}
              fill={
                row.qA === qA
                  ? "var(--ev-info)"
                  : row.qA === mostLikely.qA
                    ? "var(--ev-useful)"
                    : "var(--ev-gold)"
              }
              opacity={row.qA === qA || row.qA === mostLikely.qA ? 1 : 0.72}
            >
              <title>{`A reçoit ${row.qA} quanta : ${(100 * row.probability).toFixed(2)} %`}</title>
            </rect>
          );
        })}
        <text className="entropy-viz__label" x="62" y="265">
          0
        </text>
        <text className="entropy-viz__label" x="722" y="265" textAnchor="end">
          {quanta}
        </text>
        <text
          className="entropy-viz__label"
          x="392"
          y="282"
          textAnchor="middle"
        >
          quanta dans A
        </text>
      </svg>
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <strong>Solide A</strong>
          <dl>
            <dt>ln ΩA</dt>
            <dd>{current.lnA.toFixed(3)}</dd>
            <dt>Température discrète</dt>
            <dd>{(1 / betaA).toFixed(2)} ε/kB</dd>
          </dl>
        </div>
        <div className="entropy-viz__panel">
          <strong>Solide B</strong>
          <dl>
            <dt>ln ΩB</dt>
            <dd>{current.lnB.toFixed(3)}</dd>
            <dt>Température discrète</dt>
            <dd>{(1 / betaB).toFixed(2)} ε/kB</dd>
          </dl>
        </div>
      </div>
      <p className="entropy-viz__legend">
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--info" />
          état observé
        </span>
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--useful" />
          maximum de multiplicité
        </span>
        <span>Ωtot = ΩAΩB et S/kB = ln Ωtot</span>
      </p>
    </VizFrame>
  );
}

export default V09EinsteinSolids;
