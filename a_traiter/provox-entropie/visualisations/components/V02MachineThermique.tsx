import { useId, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { formatNumber } from "../shared/math";
type VisualizationProps = { className?: string; seed?: number };

function FlowArrow({
  x1,
  y1,
  x2,
  y2,
  width,
  color,
  label,
  marker,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  color: string;
  label: string;
  marker: string;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={width}
        markerEnd={`url(#${marker})`}
      />
      <text
        className="entropy-viz__label"
        x={(x1 + x2) / 2}
        y={(y1 + y2) / 2 - 12}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

export function V02MachineThermique({ className = "" }: VisualizationProps) {
  const [hot, setHot] = useState(600),
    [cold, setCold] = useState(300),
    [qin, setQin] = useState(1000),
    [quality, setQuality] = useState(100);
  const marker = useId().replace(/:/g, "");
  const tc = Math.min(cold, hot - 10),
    etaCarnot = 1 - tc / hot,
    eta = (etaCarnot * quality) / 100;
  const work = qin * eta,
    qout = qin - work,
    sHot = -qin / hot,
    sCold = qout / tc,
    sCreated = Math.max(0, sHot + sCold);
  const lostWork = tc * sCreated,
    exergyIn = qin * etaCarnot;
  return (
    <VizFrame
      id="V2"
      title="Machine thermique et double bilan"
      question="Pourquoi toute la chaleur reçue ne devient-elle pas du travail ?"
      caveat="Moteur cyclique entre deux thermostats idéaux. Le facteur de qualité agrège frottement, échanges à écart fini et autres irréversibilités ; il ne remplace pas la modélisation détaillée d’une machine particulière."
      className={className}
      stats={
        <>
          <Metric
            label="Rendement réel"
            value={formatNumber(100 * eta, 1)}
            unit="%"
          />
          <Metric
            label="Limite de Carnot"
            value={formatNumber(100 * etaCarnot, 1)}
            unit="%"
          />
          <Metric
            label="Travail perdu"
            value={formatNumber(lostWork, 0)}
            unit="J"
          />
        </>
      }
      controls={
        <>
          <RangeControl
            label="Source chaude"
            value={hot}
            min={350}
            max={1000}
            step={10}
            unit="K"
            onChange={(v) => setHot(Math.max(v, cold + 10))}
          />
          <RangeControl
            label="Source froide"
            value={tc}
            min={200}
            max={500}
            step={10}
            unit="K"
            onChange={(v) => setCold(Math.min(v, hot - 10))}
          />
          <RangeControl
            label="Chaleur reçue"
            value={qin}
            min={100}
            max={2000}
            step={100}
            unit="J/cycle"
            onChange={setQin}
          />
          <RangeControl
            label="Qualité du moteur"
            value={quality}
            min={20}
            max={100}
            step={5}
            unit="% de Carnot"
            onChange={setQuality}
          />
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <h4>Flux d’énergie par cycle</h4>
          <svg
            className="entropy-viz__plot"
            viewBox="0 0 720 320"
            role="img"
            aria-label={`${qin} joules de chaleur entrent ; ${work.toFixed(0)} joules de travail et ${qout.toFixed(0)} joules de chaleur sortent`}
          >
            <title>Bilan énergétique de la machine</title>
            <defs>
              <marker
                id={marker}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0L10 5L0 10Z" fill="context-stroke" />
              </marker>
            </defs>
            <rect
              x="22"
              y="75"
              width="155"
              height="118"
              rx="14"
              fill="var(--ev-hot)"
              opacity=".72"
            />
            <rect
              x="282"
              y="62"
              width="156"
              height="144"
              rx="28"
              fill="var(--ev-panel-2)"
              stroke="var(--ev-gold)"
              strokeWidth="3"
            />
            <rect
              x="543"
              y="75"
              width="155"
              height="118"
              rx="14"
              fill="var(--ev-cold)"
              opacity=".72"
            />
            <text
              className="entropy-viz__label"
              x="99"
              y="115"
              textAnchor="middle"
            >
              SOURCE CHAUDE
            </text>
            <text
              className="entropy-viz__label"
              x="99"
              y="150"
              textAnchor="middle"
            >
              {hot} K
            </text>
            <text
              className="entropy-viz__label"
              x="360"
              y="120"
              textAnchor="middle"
            >
              MOTEUR
            </text>
            <text
              className="entropy-viz__label"
              x="360"
              y="151"
              textAnchor="middle"
            >
              η = {formatNumber(eta * 100, 1)} %
            </text>
            <text
              className="entropy-viz__label"
              x="620"
              y="115"
              textAnchor="middle"
            >
              SOURCE FROIDE
            </text>
            <text
              className="entropy-viz__label"
              x="620"
              y="150"
              textAnchor="middle"
            >
              {tc} K
            </text>
            <FlowArrow
              x1={178}
              y1={100}
              x2={270}
              y2={100}
              width={12}
              color="var(--ev-hot)"
              label={`Qₕ ${formatNumber(qin, 0)} J`}
              marker={marker}
            />
            <FlowArrow
              x1={450}
              y1={165}
              x2={530}
              y2={165}
              width={Math.max(5, (14 * qout) / qin)}
              color="var(--ev-cold)"
              label={`Q𝚌 ${formatNumber(qout, 0)} J`}
              marker={marker}
            />
            <FlowArrow
              x1={360}
              y1={218}
              x2={360}
              y2={286}
              width={Math.max(5, (14 * work) / qin)}
              color="var(--ev-useful)"
              label={`W ${formatNumber(work, 0)} J`}
              marker={marker}
            />
            <text
              className="entropy-viz__label"
              x="360"
              y="315"
              textAnchor="middle"
            >
              Énergie : Qₕ = W + Q𝚌 exactement
            </text>
          </svg>
        </div>
        <div className="entropy-viz__panel">
          <h4>Flux d’entropie et exergie</h4>
          <svg
            className="entropy-viz__plot"
            viewBox="0 0 620 190"
            role="img"
            aria-label={`Entropie créée ${sCreated.toFixed(3)} joule par kelvin`}
          >
            <title>Bilan d’entropie</title>
            <line
              x1="48"
              y1="58"
              x2="570"
              y2="58"
              stroke="var(--ev-line)"
              strokeWidth="16"
            />
            <line
              x1="48"
              y1="58"
              x2={
                48 + 522 * Math.min(1, Math.abs(sHot) / Math.max(sCold, 0.001))
              }
              y2="58"
              stroke="var(--ev-hot)"
              strokeWidth="16"
            />
            <text className="entropy-viz__label" x="48" y="34">
              −Qₕ/Tₕ = {formatNumber(sHot, 3)} J/K
            </text>
            <line
              x1="48"
              y1="128"
              x2="570"
              y2="128"
              stroke="var(--ev-line)"
              strokeWidth="16"
            />
            <line
              x1="48"
              y1="128"
              x2={48 + 522 * Math.min(1, sCold / Math.max(sCold, 0.001))}
              y2="128"
              stroke="var(--ev-cold)"
              strokeWidth="16"
            />
            <text className="entropy-viz__label" x="48" y="104">
              +Q𝚌/T𝚌 = {formatNumber(sCold, 3)} J/K
            </text>
            <text
              className="entropy-viz__label"
              x="570"
              y="172"
              textAnchor="end"
            >
              écart = S créée
            </text>
          </svg>
          <dl>
            <dt>Exergie thermique disponible</dt>
            <dd>{formatNumber(exergyIn, 0)} J</dd>
            <dt>Travail utile</dt>
            <dd>{formatNumber(work, 0)} J</dd>
            <dt>Destruction d’exergie T𝚌Scréée</dt>
            <dd>{formatNumber(lostWork, 0)} J</dd>
            <dt>Entropie créée</dt>
            <dd>{formatNumber(sCreated, 3)} J/K</dd>
          </dl>
          <p aria-live="polite">
            <strong>
              {quality === 100 ? "Limite réversible :" : "Machine réelle :"}
            </strong>{" "}
            {quality === 100
              ? "aucune exergie n’est détruite dans ce modèle."
              : "l’énergie est conservée, mais une partie de sa capacité à produire du travail est détruite."}
          </p>
        </div>
      </div>
    </VizFrame>
  );
}
export default V02MachineThermique;
