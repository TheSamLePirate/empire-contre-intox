import { useId, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { C, G, HBAR, KB, SOLAR_MASS, formatNumber } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

const YEAR = 365.25 * 24 * 3600;
const CMB_TODAY = 2.725;
const PRESETS = [
  { label: "Astéroïde · 10¹² kg", value: Math.log10(1e12 / SOLAR_MASS) },
  { label: "Terre", value: Math.log10(5.9722e24 / SOLAR_MASS) },
  { label: "Soleil", value: 0 },
  { label: "Sagittarius A*", value: Math.log10(4.3e6) },
  { label: "M87*", value: Math.log10(6.5e9) },
];

export function V23CalculateurTrouNoir({ className }: VisualizationProps) {
  const gradientId = useId().replace(/:/g, "");
  const [logMass, setLogMass] = useState(0);
  const massRatio = 10 ** logMass;
  const mass = SOLAR_MASS * massRatio;
  const radius = (2 * G * mass) / C ** 2;
  const area = 4 * Math.PI * radius ** 2;
  const temperature = (HBAR * C ** 3) / (8 * Math.PI * G * mass * KB);
  const entropyOverKb = (C ** 3 * area) / (4 * G * HBAR);
  const evaporationYears =
    (5120 * Math.PI * G ** 2 * mass ** 3) / (HBAR * C ** 4) / YEAR;
  const horizonRadius = 13 + ((logMass + 20) / 30) * 44;
  const hotterThanCmb = temperature > CMB_TODAY;
  const equations = [
    {
      label: "Rayon rs",
      exponent: logMass,
      relation: "∝ M",
      value: `${formatNumber(radius)} m`,
      color: "var(--ev-gold)",
    },
    {
      label: "Entropie S/kB",
      exponent: 2 * logMass,
      relation: "∝ M²",
      value: formatNumber(entropyOverKb),
      color: "var(--ev-info)",
    },
    {
      label: "Température TH",
      exponent: -logMass,
      relation: "∝ M⁻¹",
      value: `${formatNumber(temperature)} K`,
      color: "var(--ev-cold)",
    },
    {
      label: "Durée idéale",
      exponent: 3 * logMass,
      relation: "∝ M³",
      value: `${formatNumber(evaporationYears)} ans`,
      color: "var(--ev-hot)",
    },
  ];

  return (
    <VizFrame
      id="V23"
      title="Calculateur de trou noir"
      question="Pourquoi les grands trous noirs sont-ils à la fois plus entropiques et plus froids ?"
      className={className}
      caveat="Formules semi-classiques d’un trou noir de Schwarzschild, isolé, sans charge ni rotation. La durée d’évaporation ignore accrétion, fond cosmologique et détail des espèces rayonnées ; en dessous de l’échelle de Planck, ces formules cessent d’être fiables."
      controls={
        <>
          {PRESETS.map((preset) => (
            <button
              type="button"
              key={preset.label}
              aria-pressed={Math.abs(logMass - preset.value) < 0.02}
              onClick={() => setLogMass(preset.value)}
            >
              {preset.label}
            </button>
          ))}
          <RangeControl
            label="log10 de M/M☉"
            value={logMass}
            min={-20}
            max={10}
            step={0.1}
            onChange={setLogMass}
          />
        </>
      }
      stats={
        <>
          <Metric label="Masse" value={formatNumber(massRatio)} unit="M☉" />
          <Metric
            label="Rayon de Schwarzschild"
            value={formatNumber(radius)}
            unit="m"
          />
          <Metric
            label="Température de Hawking"
            value={formatNumber(temperature)}
            unit="K"
          />
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div
          className="entropy-viz__panel"
          style={{ display: "grid", placeItems: "center", minHeight: "18rem" }}
        >
          <svg
            viewBox="0 0 300 250"
            role="img"
            aria-label={`Horizon schématique. Masse ${formatNumber(massRatio)} masses solaires, rayon ${formatNumber(radius)} mètres`}
          >
            <defs>
              <radialGradient id={gradientId}>
                <stop offset="35%" stopColor="var(--ev-bg)" />
                <stop
                  offset="72%"
                  stopColor="var(--ev-info)"
                  stopOpacity=".25"
                />
                <stop
                  offset="100%"
                  stopColor="var(--ev-gold)"
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>
            <circle
              cx="150"
              cy="112"
              r={horizonRadius + 25}
              fill={`url(#${gradientId})`}
            />
            <circle
              cx="150"
              cy="112"
              r={horizonRadius}
              fill="var(--ev-bg)"
              stroke="var(--ev-gold)"
              strokeWidth="2"
            />
            <path
              d={`M150 112H${150 + horizonRadius}`}
              stroke="var(--ev-gold)"
            />
            <text x="150" y="205" textAnchor="middle" fill="var(--ev-text)">
              rs = {formatNumber(radius)} m
            </text>
            <text
              x="150"
              y="224"
              textAnchor="middle"
              fill="var(--ev-muted)"
              fontSize="12"
            >
              taille visuelle logarithmique, non à l’échelle
            </text>
          </svg>
          <p style={{ margin: 0, textAlign: "center" }}>
            <strong>{hotterThanCmb ? "TH > 2,725 K" : "TH < 2,725 K"}</strong>
            <br />
            <span style={{ color: "var(--ev-muted)" }}>
              {hotterThanCmb
                ? "plus chaud que le fond cosmologique actuel : évaporation nette possible dans ce bilan idéal"
                : "plus froid que le fond cosmologique actuel : l’isolement nécessaire à l’évaporation nette n’est pas encore réalisé"}
            </span>
          </p>
        </div>
        <div className="entropy-viz__panel" aria-live="polite">
          <h4>Échelles et lois de puissance</h4>
          <dl>
            <dt>Masse</dt>
            <dd>{formatNumber(mass)} kg</dd>
            <dt>Aire A = 4πrs²</dt>
            <dd>{formatNumber(area)} m²</dd>
            <dt>Entropie S</dt>
            <dd>{formatNumber(entropyOverKb * KB)} J·K⁻¹</dd>
            <dt>Entropie S/kB</dt>
            <dd>{formatNumber(entropyOverKb)}</dd>
            <dt>Évaporation idéale</dt>
            <dd>{formatNumber(evaporationYears)} ans</dd>
          </dl>
          <div style={{ display: "grid", gap: ".7rem", marginTop: "1rem" }}>
            {equations.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(7rem, auto) 1fr auto",
                  gap: ".6rem",
                  alignItems: "center",
                }}
              >
                <span>
                  {item.label} <small>{item.relation}</small>
                </span>
                <span
                  style={{ height: ".55rem", background: "var(--ev-line)" }}
                >
                  <i
                    style={{
                      display: "block",
                      width: `${Math.max(2, Math.min(100, 50 + item.exponent * 2.5))}%`,
                      height: "100%",
                      background: item.color,
                    }}
                  />
                </span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VizFrame>
  );
}

export default V23CalculateurTrouNoir;
