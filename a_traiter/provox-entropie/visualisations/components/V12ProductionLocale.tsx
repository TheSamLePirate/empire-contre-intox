import { useMemo, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import type { VisualizationProps } from "../shared/types";

type Mode = "conduction" | "diffusion" | "viscosite";
const modeLabels: Record<Mode, string> = {
  conduction: "Conduction thermique",
  diffusion: "Diffusion de matière",
  viscosite: "Écoulement visqueux",
};

export function V12ProductionLocale({ className }: VisualizationProps) {
  const [mode, setMode] = useState<Mode>("conduction");
  const [drive, setDrive] = useState(1);
  const [showFlux, setShowFlux] = useState(true);
  const cells = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => {
        const x = (index + 0.5) / 24;
        if (mode === "conduction") {
          const cold = 290;
          const deltaT = 110 * drive;
          const value = cold + deltaT * (1 - x);
          const gradient = -deltaT; // K/m pour L = 1 m
          const flux = -0.6 * gradient;
          const production = (0.6 * gradient ** 2) / value ** 2;
          return {
            x,
            value,
            normalized: (value - cold) / 110,
            flux,
            production,
          };
        }
        if (mode === "diffusion") {
          const cLow = 0.2;
          const deltaC = 1.8 * drive;
          const value = cLow + deltaC * (1 - x);
          const gradient = -deltaC;
          const diffusivity = 1e-5;
          const flux = -diffusivity * gradient;
          // Mélange idéal dilué : σ ≈ R D (∇c)²/c.
          const production = (8.314 * diffusivity * gradient ** 2) / value;
          return {
            x,
            value,
            normalized: (value - cLow) / 1.8,
            flux,
            production,
          };
        }
        const topSpeed = 3 * drive;
        const value = topSpeed * x;
        const gradient = topSpeed;
        const viscosity = 1e-3;
        const flux = viscosity * gradient; // contrainte tangentielle, Pa
        const production = (viscosity * gradient ** 2) / 300;
        return { x, value, normalized: value / 3, flux, production };
      }),
    [drive, mode],
  );
  const maxProduction = Math.max(
    ...cells.map(({ production }) => production),
    1e-12,
  );
  const averageProduction =
    cells.reduce((sum, { production }) => sum + production, 0) / cells.length;
  const config =
    mode === "conduction"
      ? {
          field: "Température",
          unit: "K",
          flux: "Flux de chaleur",
          fluxUnit: "W·m⁻²",
          formula: "σ = κ(∇T)²/T²",
        }
      : mode === "diffusion"
        ? {
            field: "Concentration",
            unit: "mol·m⁻³",
            flux: "Flux molaire",
            fluxUnit: "mol·m⁻²·s⁻¹",
            formula: "σ ≈ RD(∇c)²/c",
          }
        : {
            field: "Vitesse",
            unit: "m·s⁻¹",
            flux: "Contrainte",
            fluxUnit: "Pa",
            formula: "σ = μ(∂u/∂y)²/T",
          };
  return (
    <VizFrame
      id="V12"
      title="Production locale d’entropie"
      question="Où l’irréversibilité apparaît-elle dans un champ soumis à un gradient ?"
      caveat="Milieu continu unidimensionnel de longueur 1 m, coefficients constants et lois linéaires près de l’équilibre. Les trois cas utilisent des valeurs illustratives et ne constituent pas le dimensionnement d’un procédé réel."
      className={className}
      stats={
        <>
          <Metric
            label={config.field + " à gauche"}
            value={cells[0]!.value.toPrecision(3)}
            unit={config.unit}
          />
          <Metric
            label={config.flux}
            value={Math.abs(cells[0]!.flux).toExponential(2)}
            unit={config.fluxUnit}
          />
          <Metric
            label="Production moyenne"
            value={averageProduction.toExponential(2)}
            unit="W·m⁻³·K⁻¹"
          />
        </>
      }
      controls={
        <>
          {(Object.keys(modeLabels) as Mode[]).map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              {modeLabels[value]}
            </button>
          ))}
          <RangeControl
            label="Intensité du gradient"
            value={drive}
            min={0}
            max={1}
            step={0.02}
            unit="× nominal"
            onChange={setDrive}
          />
          <button
            type="button"
            aria-pressed={showFlux}
            onClick={() => setShowFlux((value) => !value)}
          >
            {showFlux ? "Masquer le flux" : "Afficher le flux"}
          </button>
        </>
      }
    >
      <svg
        className="entropy-viz__plot"
        viewBox="0 0 760 300"
        role="img"
        aria-labelledby="v12-title v12-desc"
      >
        <title id="v12-title">{config.field}, flux et production locale</title>
        <desc id="v12-desc">{`${config.field} de ${cells[0]!.value.toPrecision(3)} à ${cells.at(-1)!.value.toPrecision(3)} ${config.unit}. Production moyenne ${averageProduction.toExponential(2)} watt par mètre cube kelvin.`}</desc>
        {cells.map((cell, index) => {
          const x = 50 + index * 27;
          const productionHeight = (72 * cell.production) / maxProduction;
          return (
            <g key={index}>
              <rect
                x={x}
                y="44"
                width="28"
                height="148"
                fill="var(--ev-cold)"
                opacity=".2"
              />
              <rect
                x={x}
                y="44"
                width="28"
                height="148"
                fill="var(--ev-hot)"
                opacity={Math.max(0, Math.min(0.9, cell.normalized))}
              />
              <rect
                x={x}
                y={268 - productionHeight}
                width="28"
                height={productionHeight}
                fill="var(--ev-info)"
                opacity=".82"
              >
                <title>{`x=${cell.x.toFixed(2)} m ; σ=${cell.production.toExponential(2)} W·m⁻³·K⁻¹`}</title>
              </rect>
              {showFlux && index % 4 === 1 ? (
                <path
                  d={`M${x + 2} 118 H${x + 24} m-7 -6 7 6 -7 6`}
                  fill="none"
                  stroke="var(--ev-text)"
                  strokeWidth="2"
                />
              ) : null}
            </g>
          );
        })}
        <path className="entropy-viz__axis" d="M50 192 H698 M50 268 H698" />
        <text className="entropy-viz__label" x="50" y="25">
          {config.field} ({config.unit})
        </text>
        <text className="entropy-viz__label" x="50" y="218">
          production σ ({"W·m⁻³·K⁻¹"})
        </text>
        <text className="entropy-viz__label" x="50" y="292">
          x = 0 m
        </text>
        <text className="entropy-viz__label" x="698" y="292" textAnchor="end">
          x = 1 m
        </text>
      </svg>
      <p className="entropy-viz__legend">
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--cold" />
          champ faible
        </span>
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--hot" />
          champ élevé
        </span>
        <span>
          <i className="entropy-viz__dot entropy-viz__dot--info" />σ ≥ 0
        </span>
        <span>
          {config.formula}. Quand le gradient s’annule, flux et production
          s’annulent ensemble.
        </span>
      </p>
    </VizFrame>
  );
}

export default V12ProductionLocale;
