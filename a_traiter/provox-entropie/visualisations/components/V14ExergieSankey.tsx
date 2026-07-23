import { useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import type { VisualizationProps } from "../shared/types";

function Ribbon({
  d,
  color,
  label,
  x,
  y,
}: {
  d: string;
  color: string;
  label: string;
  x: number;
  y: number;
}) {
  return (
    <g>
      <path d={d} fill={color} opacity=".85">
        <title>{label}</title>
      </path>
      <text className="entropy-viz__label" x={x} y={y}>
        {label}
      </text>
    </g>
  );
}

export function V14ExergieSankey({ className }: VisualizationProps) {
  const [hot, setHot] = useState(800);
  const [ambient, setAmbient] = useState(293);
  const [destructionFraction, setDestructionFraction] = useState(0.28);
  const heatInput = 100;
  const carnotEfficiency = Math.max(0, 1 - ambient / hot);
  const exergyInput = heatInput * carnotEfficiency;
  const anergyInput = heatInput - exergyInput;
  const destroyed = exergyInput * destructionFraction;
  const work = exergyInput - destroyed;
  const rejectedHeat = heatInput - work;
  const entropyCreated = destroyed / ambient;
  const secondLawEfficiency = exergyInput ? work / exergyInput : 0;
  const scale = 1.65;
  const y0 = 82;
  const inputH = heatInput * scale;
  const workH = work * scale;
  const rejectH = rejectedHeat * scale;
  const exH = exergyInput * scale;
  const anH = anergyInput * scale;
  const destroyH = destroyed * scale;

  return (
    <VizFrame
      id="V14"
      title="Énergie et exergie d’une source chaude"
      question="Pourquoi 100 MW conservés ne valent-ils pas toujours 100 MW de travail possible ?"
      caveat="Apport de chaleur isotherme unique et environnement uniforme : ExQ = Q(1−T0/Th). Une centrale réelle distribue ses destructions d’exergie entre combustion, échangeurs, turbine, condenseur et auxiliaires."
      className={className}
      stats={
        <>
          <Metric
            label="Rendement énergétique"
            value={`${work.toFixed(1)} %`}
          />
          <Metric
            label="Rendement de 2e loi"
            value={`${(100 * secondLawEfficiency).toFixed(1)} %`}
          />
          <Metric
            label="Exergie détruite"
            value={destroyed.toFixed(1)}
            unit="MW"
          />
          <Metric
            label="S créée"
            value={(1000 * entropyCreated).toFixed(1)}
            unit="kW·K⁻¹"
          />
        </>
      }
      controls={
        <>
          <RangeControl
            label="Source chaude"
            value={hot}
            min={320}
            max={1400}
            step={10}
            unit="K"
            onChange={(value) => setHot(Math.max(value, ambient + 1))}
          />
          <RangeControl
            label="Environnement"
            value={ambient}
            min={250}
            max={315}
            step={1}
            unit="K"
            onChange={(value) => setAmbient(Math.min(value, hot - 1))}
          />
          <RangeControl
            label="Part d’exergie détruite"
            value={destructionFraction}
            min={0}
            max={0.7}
            step={0.01}
            unit=""
            onChange={setDestructionFraction}
          />
          <button type="button" onClick={() => setDestructionFraction(0)}>
            Machine réversible
          </button>
          <button
            type="button"
            onClick={() => {
              setHot(823);
              setAmbient(293);
              setDestructionFraction(0.32);
            }}
          >
            Exemple vapeur
          </button>
        </>
      }
    >
      <svg
        className="entropy-viz__plot"
        viewBox="0 0 780 525"
        role="img"
        aria-labelledby="v14-title v14-desc"
      >
        <title id="v14-title">
          Diagrammes de Sankey d’énergie et d’exergie
        </title>
        <desc id="v14-desc">{`Cent mégawatts thermiques donnent ${work.toFixed(1)} mégawatts de travail, ${rejectedHeat.toFixed(1)} rejetés, dont ${destroyed.toFixed(1)} mégawatts d’exergie détruite.`}</desc>
        <text className="entropy-viz__label" x="34" y="28">
          ÉNERGIE · l’épaisseur totale reste 100 MW
        </text>
        <Ribbon
          color="var(--ev-hot)"
          label="Chaleur entrante · 100 MW"
          x={42}
          y={68}
          d={`M40 ${y0} H300 V${y0 + inputH} H40 Z`}
        />
        <Ribbon
          color="var(--ev-useful)"
          label={`Travail · ${work.toFixed(1)} MW`}
          x={530}
          y={68}
          d={`M300 ${y0} C390 ${y0},420 ${y0},520 ${y0} V${y0 + workH} C420 ${y0 + workH},390 ${y0 + workH},300 ${y0 + workH} Z`}
        />
        <Ribbon
          color="var(--ev-cold)"
          label={`Chaleur rejetée · ${rejectedHeat.toFixed(1)} MW`}
          x={530}
          y={y0 + workH + 24}
          d={`M300 ${y0 + workH} C390 ${y0 + workH},420 ${y0 + workH + 28},520 ${y0 + workH + 28} V${y0 + workH + 28 + rejectH} C420 ${y0 + inputH},390 ${y0 + inputH},300 ${y0 + inputH} Z`}
        />
        <text className="entropy-viz__label" x="34" y="288">
          EXERGIE DE L’APPORT · potentiel de travail maximal
        </text>
        <Ribbon
          color="var(--ev-gold)"
          label={`Exergie · ${exergyInput.toFixed(1)} MW`}
          x={42}
          y={328}
          d={`M40 342 H300 V${342 + exH} H40 Z`}
        />
        <Ribbon
          color="var(--ev-useful)"
          label={`Utile · ${work.toFixed(1)} MW`}
          x={530}
          y={328}
          d={`M300 342 C390 342,420 342,520 342 V${342 + workH} C420 ${342 + workH},390 ${342 + workH},300 ${342 + workH} Z`}
        />
        <Ribbon
          color="var(--ev-info)"
          label={`Détruite · ${destroyed.toFixed(1)} MW`}
          x={530}
          y={370 + workH}
          d={`M300 ${342 + workH} C390 ${342 + workH},420 ${370 + workH},520 ${370 + workH} V${370 + workH + destroyH} C420 ${342 + exH},390 ${342 + exH},300 ${342 + exH} Z`}
        />
        <rect
          x="40"
          y={350 + exH}
          width="260"
          height={Math.max(3, anH / 3)}
          fill="var(--ev-muted)"
          opacity=".6"
        >
          <title>{`Anergie intrinsèque ${anergyInput.toFixed(1)} MW`}</title>
        </rect>
        <text className="entropy-viz__label" x="42" y={372 + exH}>
          Anergie de la chaleur : {anergyInput.toFixed(1)} MW (hors bilan
          d’exergie entrant)
        </text>
      </svg>
      <p className="entropy-viz__legend">
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--useful" />
          travail utile
        </span>
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--cold" />
          énergie rejetée
        </span>
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--info" />
          exergie détruite = T0Scréée
        </span>
        <span>
          Une énergie à la température ambiante possède de l’énergie, mais plus
          de potentiel de travail thermique dans cet environnement.
        </span>
      </p>
    </VizFrame>
  );
}

export default V14ExergieSankey;
