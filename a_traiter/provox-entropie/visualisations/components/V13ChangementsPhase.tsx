import { useMemo, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { LinePlot } from "../shared/plots";
import type { VisualizationProps } from "../shared/types";

const T0 = 253.15;
const TM = 273.15;
const TB = 373.15;
const CP_ICE = 0.0376;
const CP_WATER = 0.0753;
const CP_STEAM = 0.0336;
const LF = 6.01;
const LV = 40.65;
const qIce = CP_ICE * (TM - T0);
const qMelt = qIce + LF;
const qWater = qMelt + CP_WATER * (TB - TM);
const qBoil = qWater + LV;
const qMax = qBoil + CP_STEAM * 20;

function stateAt(q: number) {
  let temperature = T0;
  let entropy = 0;
  let phase = "glace";
  let phaseProgress = q / qIce;
  if (q <= qIce) {
    temperature = T0 + q / CP_ICE;
    entropy = CP_ICE * Math.log(temperature / T0);
  } else if (q <= qMelt) {
    temperature = TM;
    entropy = CP_ICE * Math.log(TM / T0) + (q - qIce) / TM;
    phase = "glace + liquide";
    phaseProgress = (q - qIce) / LF;
  } else if (q <= qWater) {
    temperature = TM + (q - qMelt) / CP_WATER;
    entropy =
      CP_ICE * Math.log(TM / T0) +
      LF / TM +
      CP_WATER * Math.log(temperature / TM);
    phase = "liquide";
    phaseProgress = (q - qMelt) / (qWater - qMelt);
  } else if (q <= qBoil) {
    temperature = TB;
    entropy =
      CP_ICE * Math.log(TM / T0) +
      LF / TM +
      CP_WATER * Math.log(TB / TM) +
      (q - qWater) / TB;
    phase = "liquide + vapeur";
    phaseProgress = (q - qWater) / LV;
  } else {
    temperature = TB + (q - qBoil) / CP_STEAM;
    entropy =
      CP_ICE * Math.log(TM / T0) +
      LF / TM +
      CP_WATER * Math.log(TB / TM) +
      LV / TB +
      CP_STEAM * Math.log(temperature / TB);
    phase = "vapeur";
    phaseProgress = (q - qBoil) / (qMax - qBoil);
  }
  return {
    q,
    temperature,
    entropy,
    phase,
    phaseProgress: Math.max(0, Math.min(1, phaseProgress)),
  };
}

export function V13ChangementsPhase({ className }: VisualizationProps) {
  const [energy, setEnergy] = useState(0);
  const current = stateAt(energy);
  const curve = useMemo(
    () =>
      Array.from({ length: 151 }, (_, index) => stateAt((qMax * index) / 150)),
    [],
  );
  const visible = curve.filter((point) => point.q <= energy + qMax / 150);
  return (
    <VizFrame
      id="V13"
      title="De la glace à la vapeur"
      question="Pourquoi l’entropie augmente-t-elle pendant un plateau de température ?"
      caveat="Une mole d’eau à 1 atm, capacités thermiques et chaleurs latentes constantes, sans surchauffe ni surfusion. Des tables thermodynamiques sont nécessaires pour un calcul précis."
      className={className}
      stats={
        <>
          <Metric label="État" value={current.phase} />
          <Metric
            label="Avancement de l’étape"
            value={`${(100 * current.phaseProgress).toFixed(0)} %`}
          />
          <Metric
            label="Température"
            value={(current.temperature - 273.15).toFixed(1)}
            unit="°C"
          />
          <Metric
            label="ΔS molaire"
            value={(1000 * current.entropy).toFixed(1)}
            unit="J·mol⁻¹·K⁻¹"
          />
        </>
      }
      controls={
        <>
          <RangeControl
            label="Chaleur reçue par mole"
            value={energy}
            min={0}
            max={qMax}
            step={0.1}
            unit="kJ·mol⁻¹"
            onChange={setEnergy}
          />
          <button type="button" onClick={() => setEnergy(qIce)}>
            Atteindre 0 °C
          </button>
          <button type="button" onClick={() => setEnergy(qMelt)}>
            Fin de fusion
          </button>
          <button type="button" onClick={() => setEnergy(qWater)}>
            Atteindre 100 °C
          </button>
          <button type="button" onClick={() => setEnergy(qBoil)}>
            Fin d’ébullition
          </button>
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <strong>Courbe de chauffage</strong>
          <LinePlot
            series={[
              {
                label: "parcours complet",
                className: "entropy-viz__series--6",
                points: curve.map((p) => ({
                  x: p.q,
                  y: p.temperature - 273.15,
                })),
              },
              {
                label: "parcours atteint",
                points: visible.map((p) => ({
                  x: p.q,
                  y: p.temperature - 273.15,
                })),
              },
            ]}
            xLabel="Q reçue (kJ/mol)"
            yLabel="T (°C)"
            width={520}
            height={230}
          />
        </div>
        <div className="entropy-viz__panel">
          <strong>Trajectoire température–entropie</strong>
          <LinePlot
            series={[
              {
                label: "trajet complet",
                className: "entropy-viz__series--6",
                points: curve.map((p) => ({
                  x: 1000 * p.entropy,
                  y: p.temperature - 273.15,
                })),
              },
              {
                label: "trajet atteint",
                points: visible.map((p) => ({
                  x: 1000 * p.entropy,
                  y: p.temperature - 273.15,
                })),
              },
            ]}
            xLabel="ΔS (J/mol/K)"
            yLabel="T (°C)"
            width={520}
            height={230}
          />
        </div>
      </div>
      <p className="entropy-viz__legend">
        <span>
          <i className="entropy-viz__dot" />
          trajet atteint
        </span>
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--cold" />
          trajet complet
        </span>
        <span>
          Fusion : ΔS = Lf/T = {((1000 * LF) / TM).toFixed(1)} J·mol⁻¹·K⁻¹ ·
          Vaporisation : ΔS = Lv/T = {((1000 * LV) / TB).toFixed(1)}{" "}
          J·mol⁻¹·K⁻¹. Sur un plateau, l’énergie change les proportions de phase
          plutôt que T.
        </span>
      </p>
    </VizFrame>
  );
}

export default V13ChangementsPhase;
