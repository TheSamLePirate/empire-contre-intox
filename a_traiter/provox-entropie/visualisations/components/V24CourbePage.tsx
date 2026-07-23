import { useEffect, useMemo, useState } from "react";
import {
  Metric,
  RangeControl,
  TransportControl,
  VizFrame,
} from "../shared/VizFrame";
import { formatNumber, linspace } from "../shared/math";
import type { Point, VisualizationProps } from "../shared/types";

type Scenario = "unitary" | "loss";
const PAGE_TIME = 1 - 0.5 ** 1.5;
const blackHole = (t: number) => (1 - t) ** (2 / 3);
const thermalRadiation = (t: number) => 1 - blackHole(t);
const pageRadiation = (t: number) =>
  Math.min(thermalRadiation(t), blackHole(t));

export function V24CourbePage({ className }: VisualizationProps) {
  const [progress, setProgress] = useState(0.35);
  const [scenario, setScenario] = useState<Scenario>("unitary");
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () =>
        setProgress((value) => {
          const next = value + 0.006;
          if (next >= 1) {
            setPlaying(false);
            return 1;
          }
          return next;
        }),
      45,
    );
    return () => window.clearInterval(timer);
  }, [playing]);
  const curves = useMemo(() => {
    const xs = linspace(0, 1, 121);
    return {
      bh: xs.map((x) => ({ x, y: blackHole(x) })),
      loss: xs.map((x) => ({ x, y: thermalRadiation(x) })),
      unitary: xs.map((x) => ({ x, y: pageRadiation(x) })),
    };
  }, []);
  const radiationEntropy =
    scenario === "unitary"
      ? pageRadiation(progress)
      : thermalRadiation(progress);
  const blackHoleEntropy = blackHole(progress);
  const globalFineGrained = scenario === "unitary" ? 0 : radiationEntropy;
  const width = 720;
  const height = 310;
  const left = 54;
  const top = 24;
  const right = 18;
  const bottom = 46;
  const sx = (x: number) => left + x * (width - left - right);
  const sy = (y: number) => height - bottom - y * (height - top - bottom);
  const path = (points: Point[]) =>
    points
      .map(
        (point, index) => `${index ? "L" : "M"}${sx(point.x)},${sy(point.y)}`,
      )
      .join(" ");
  const regime =
    progress < PAGE_TIME
      ? "avant le temps de Page"
      : progress === PAGE_TIME
        ? "temps de Page"
        : "après le temps de Page";

  return (
    <VizFrame
      id="V24"
      title="Courbe de Page conceptuelle"
      question="Comment distinguer entropie thermique apparente et entropie d’intrication du rayonnement ?"
      className={className}
      caveat="Toutes les grandeurs sont normalisées et schématiques ; l’abscisse représente la fraction de la durée d’évaporation semi-classique, pas la fraction de masse perdue. La courbe de Page n’est pas une observation directe d’un trou noir astrophysique ; sa forme, le temps de Page et l’interprétation des calculs d’îlots dépendent du cadre théorique."
      controls={
        <>
          <TransportControl
            playing={playing}
            onToggle={() => {
              if (!playing && progress >= 1) setProgress(0);
              setPlaying((value) => !value);
            }}
            onReset={() => {
              setPlaying(false);
              setProgress(0);
            }}
            time={`${Math.round(progress * 100)} % de la durée`}
            progress={progress}
            label="Défilement de l’évaporation"
          />
          <button
            type="button"
            aria-pressed={scenario === "unitary"}
            onClick={() => setScenario("unitary")}
          >
            Évolution globale unitaire
          </button>
          <button
            type="button"
            aria-pressed={scenario === "loss"}
            onClick={() => setScenario("loss")}
          >
            Rayonnement thermique sans récupération
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setProgress(PAGE_TIME);
            }}
          >
            Aller au temps de Page
          </button>
          <RangeControl
            label="Durée d’évaporation écoulée"
            value={progress * 100}
            min={0}
            max={100}
            step={1}
            unit="%"
            onChange={(value) => {
              setPlaying(false);
              setProgress(value / 100);
            }}
          />
        </>
      }
      stats={
        <>
          <Metric
            label="S_BH restante"
            value={formatNumber(blackHoleEntropy)}
            unit="S₀"
          />
          <Metric
            label="S_intrication(ray.)"
            value={formatNumber(radiationEntropy)}
            unit="S₀"
          />
          <Metric label="Régime" value={regime} />
        </>
      }
    >
      <svg
        className="entropy-viz__plot"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Courbe de Page, scénario ${scenario}, temps d’évaporation écoulé ${Math.round(progress * 100)} pour cent, entropie du rayonnement ${formatNumber(radiationEntropy)}`}
      >
        <path
          d={`M${left} ${top}V${height - bottom}H${width - right}`}
          fill="none"
          stroke="var(--ev-muted)"
        />
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
          <g key={tick}>
            <path
              d={`M${left} ${sy(tick)}H${width - right}`}
              stroke="var(--ev-line)"
            />
            <text
              x={left - 9}
              y={sy(tick) + 4}
              textAnchor="end"
              fill="var(--ev-muted)"
              fontSize="11"
            >
              {tick}
            </text>
            <text
              x={sx(tick)}
              y={height - bottom + 19}
              textAnchor="middle"
              fill="var(--ev-muted)"
              fontSize="11"
            >
              {Math.round(tick * 100)} %
            </text>
          </g>
        ))}
        <path
          d={path(curves.bh)}
          fill="none"
          stroke="var(--ev-gold)"
          strokeWidth="3"
        />
        <path
          d={path(curves.loss.filter((point) => point.x <= progress))}
          fill="none"
          stroke="var(--ev-cold)"
          strokeWidth={scenario === "loss" ? 4 : 2}
          opacity={scenario === "loss" ? 1 : 0.35}
        />
        <path
          d={path(curves.unitary.filter((point) => point.x <= progress))}
          fill="none"
          stroke="var(--ev-hot)"
          strokeWidth={scenario === "unitary" ? 4 : 2}
          opacity={scenario === "unitary" ? 1 : 0.35}
        />
        <path
          d={`M${sx(PAGE_TIME)} ${top}V${height - bottom}`}
          stroke="var(--ev-info)"
          strokeDasharray="5 4"
        />
        <text
          x={sx(PAGE_TIME) - 6}
          y={top + 12}
          textAnchor="end"
          fill="var(--ev-muted)"
          fontSize="11"
        >
          temps de Page ≈ 65 %
        </text>
        <path
          d={`M${sx(progress)} ${top}V${height - bottom}`}
          stroke="var(--ev-text)"
          strokeWidth="1.5"
        />
        <circle
          cx={sx(progress)}
          cy={sy(radiationEntropy)}
          r="6"
          fill={scenario === "unitary" ? "var(--ev-hot)" : "var(--ev-cold)"}
          stroke="var(--ev-text)"
        />
        <text x={left} y="14" fill="var(--ev-muted)" fontSize="12">
          entropie normalisée S/S₀
        </text>
        <text
          x={width - right}
          y={height - 8}
          textAnchor="end"
          fill="var(--ev-muted)"
          fontSize="12"
        >
          fraction de la durée d’évaporation
        </text>
      </svg>
      <div className="entropy-viz__legend" aria-live="polite">
        <span>
          <i className="entropy-viz__dot" />
          capacité entropique du trou noir S_BH
        </span>
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--cold" />
          rayonnement thermique sans corrélations récupérables
        </span>
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--hot" />
          entropie d’intrication unitaire (Page)
        </span>
      </div>
      <div
        className="entropy-viz__panel"
        style={{ marginTop: "1rem" }}
        aria-live="polite"
      >
        <strong>Bilan interprétatif :</strong>{" "}
        {scenario === "unitary"
          ? `l’état global reste pur (S fine globale = ${globalFineGrained}), tandis que l’entropie du sous-système rayonnement ${progress < PAGE_TIME ? "augmente" : "redescend lorsque les corrélations tardives deviennent déterminantes"}.`
          : `dans le scénario semi-classique naïf, l’entropie fine attribuée au rayonnement monte à ${formatNumber(globalFineGrained)} S₀ et l’information initiale ne réapparaît pas dans les corrélations.`}
      </div>
    </VizFrame>
  );
}

export default V24CourbePage;
