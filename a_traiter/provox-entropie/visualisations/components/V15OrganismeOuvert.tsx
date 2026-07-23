import { useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import type { VisualizationProps } from "../shared/types";

export function V15OrganismeOuvert({ className }: VisualizationProps) {
  const [power, setPower] = useState(100);
  const [workFraction, setWorkFraction] = useState(0.2);
  const [bodyTemperature, setBodyTemperature] = useState(310);
  const [boundary, setBoundary] = useState<"organism" | "universe">("organism");
  const [active, setActive] = useState(true);
  const ambientTemperature = 293;
  const input = active ? power : 0;
  const work = input * workFraction;
  const heat = input - work;
  const entropyOut = heat / bodyTemperature;
  const entropyEnvironment = heat / ambientTemperature;
  const entropyProducedByCooling = Math.max(0, entropyEnvironment - entropyOut);

  return (
    <VizFrame
      id="V15"
      title="Un organisme est un système ouvert"
      question="Comment maintenir une organisation locale tout en augmentant l’entropie totale ?"
      caveat="Bilan stationnaire de puissance, pas un modèle métabolique complet : l’entropie chimique des nutriments et déchets n’est pas calculée. Le terme de refroidissement ne décrit que le transfert de chaleur du corps vers l’air."
      className={className}
      stats={
        <>
          <Metric label="Métabolisme" value={input.toFixed(0)} unit="W" />
          <Metric label="Travail externe" value={work.toFixed(0)} unit="W" />
          <Metric label="Chaleur dissipée" value={heat.toFixed(0)} unit="W" />
          <Metric
            label="S créée au refroidissement"
            value={(1000 * entropyProducedByCooling).toFixed(1)}
            unit="mW·K⁻¹"
          />
        </>
      }
      controls={
        <>
          <button
            type="button"
            aria-pressed={boundary === "universe"}
            onClick={() =>
              setBoundary((value) =>
                value === "organism" ? "universe" : "organism",
              )
            }
          >
            {boundary === "organism"
              ? "Élargir la frontière au milieu"
              : "Revenir à l’organisme seul"}
          </button>
          <button
            type="button"
            aria-pressed={active}
            onClick={() => setActive((value) => !value)}
          >
            {active ? "Couper l’apport métabolique" : "Rétablir les flux"}
          </button>
          <RangeControl
            label="Puissance métabolique"
            value={power}
            min={40}
            max={300}
            step={5}
            unit="W"
            onChange={setPower}
          />
          <RangeControl
            label="Part de travail externe"
            value={workFraction}
            min={0}
            max={0.35}
            step={0.01}
            unit=""
            onChange={setWorkFraction}
          />
          <RangeControl
            label="Température du corps"
            value={bodyTemperature}
            min={295}
            max={315}
            step={1}
            unit="K"
            onChange={setBodyTemperature}
          />
        </>
      }
    >
      <svg
        className="entropy-viz__plot"
        viewBox="0 0 760 330"
        role="img"
        aria-labelledby="v15-svg-title v15-svg-desc"
      >
        <title id="v15-svg-title">
          Flux de puissance et d’entropie d’un organisme
        </title>
        <desc id="v15-svg-desc">{`Apport ${input.toFixed(0)} watts, travail ${work.toFixed(0)} watts et chaleur ${heat.toFixed(0)} watts. Frontière ${boundary === "organism" ? "autour de l’organisme" : "incluant le milieu"}.`}</desc>
        {boundary === "universe" ? (
          <rect
            x="22"
            y="24"
            width="716"
            height="270"
            rx="18"
            fill="none"
            stroke="var(--ev-info)"
            strokeWidth="2"
            strokeDasharray="8 5"
          />
        ) : null}
        <rect
          x="282"
          y="76"
          width="205"
          height="160"
          rx="70"
          fill="var(--ev-panel-2)"
          stroke="var(--ev-gold)"
          strokeWidth="3"
        />
        <text
          className="entropy-viz__label"
          x="385"
          y="130"
          textAnchor="middle"
        >
          ORGANISME · {bodyTemperature} K
        </text>
        <text
          className="entropy-viz__label"
          x="385"
          y="160"
          textAnchor="middle"
        >
          état stationnaire ouvert
        </text>
        <text
          className="entropy-viz__label"
          x="385"
          y="190"
          textAnchor="middle"
        >
          dS/dt ≈ 0 localement
        </text>
        <path
          d="M56 124 H276 m-12 -8 12 8 -12 8"
          stroke="var(--ev-useful)"
          strokeWidth={Math.max(2, input / 14)}
          fill="none"
          opacity={input ? 1 : 0.2}
        />
        <text className="entropy-viz__label" x="60" y="94">
          énergie chimique · {input.toFixed(0)} W
        </text>
        <path
          d="M493 112 H706 m-12 -8 12 8 -12 8"
          stroke="var(--ev-useful)"
          strokeWidth={Math.max(2, work / 7)}
          fill="none"
          opacity={input ? 1 : 0.2}
        />
        <text className="entropy-viz__label" x="515" y="84">
          travail · {work.toFixed(0)} W
        </text>
        <path
          d="M487 198 H706 m-12 -8 12 8 -12 8"
          stroke="var(--ev-hot)"
          strokeWidth={Math.max(2, heat / 11)}
          fill="none"
          opacity={input ? 1 : 0.2}
        />
        <text className="entropy-viz__label" x="515" y="233">
          chaleur · {heat.toFixed(0)} W
        </text>
        <text className="entropy-viz__label" x="42" y="318">
          {boundary === "organism"
            ? "Frontière locale : matière et énergie traversent le système."
            : `Système élargi : la chaleur reçue par l’air crée ${(1000 * entropyProducedByCooling).toFixed(1)} mW/K.`}
        </text>
      </svg>
      <p className="entropy-viz__legend">
        Le changement de frontière ne coupe jamais les flux : il change
        seulement les termes comptés. À régime stationnaire, l’organisme peut
        garder une entropie macroscopique à peu près constante en exportant de
        l’entropie vers son environnement.
      </p>
    </VizFrame>
  );
}

export default V15OrganismeOuvert;
