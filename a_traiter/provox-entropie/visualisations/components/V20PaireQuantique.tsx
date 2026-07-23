import { useMemo, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { formatNumber, shannonEntropy } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

type StateKind = "entangled" | "classical" | "product";
const TITLES: Record<StateKind, string> = {
  entangled: "Paire de Bell |Φ+⟩",
  classical: "Mélange classique 00/11",
  product: "État produit |00⟩",
};

export function V20PaireQuantique({ className }: VisualizationProps) {
  const [kind, setKind] = useState<StateKind>("entangled");
  const [coherence, setCoherence] = useState(100);
  const state = useMemo(() => {
    if (kind === "product")
      return {
        matrix: [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        eigen: [1, 0, 0, 0],
        global: 0,
        local: 0,
        note: "État global pur, sous-systèmes purs, aucune corrélation.",
      };
    const visibility = kind === "classical" ? 0 : coherence / 100;
    const eigen = [(1 + visibility) / 2, (1 - visibility) / 2, 0, 0];
    return {
      matrix: [
        [0.5, 0, 0, 0.5 * visibility],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0.5 * visibility, 0, 0, 0.5],
      ],
      eigen,
      global: shannonEntropy(eigen),
      local: 1,
      note:
        visibility === 1
          ? "Le tout est pur alors que chaque qubit isolé est maximalement mixte."
          : visibility === 0
            ? "Corrélations classiques, sans cohérence entre |00⟩ et |11⟩."
            : "La décohérence réduit progressivement les termes hors diagonale.",
    };
  }, [coherence, kind]);
  const purity = state.eigen.reduce((sum, value) => sum + value ** 2, 0);
  const mutualInformation = 2 * state.local - state.global;
  const labels = ["00", "01", "10", "11"];
  const formatCell = (value: number) =>
    Math.abs(value) < 0.001 ? "0" : formatNumber(value, 2);

  return (
    <VizFrame
      id="V20"
      title="Paire quantique simplifiée"
      question="Comment des statistiques locales identiques cachent-elles des états globaux différents ?"
      className={className}
      caveat="Modèle mathématique idéal de deux qubits dans la base |00⟩, |01⟩, |10⟩, |11⟩. Il ne simule ni appareil de mesure, ni dynamique ouverte complète, ni test de Bell ; une matrice similaire ne prouve pas expérimentalement l’intrication."
      controls={
        <>
          {(Object.keys(TITLES) as StateKind[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={kind === key}
              onClick={() => setKind(key)}
            >
              {TITLES[key]}
            </button>
          ))}
          {kind === "entangled" ? (
            <RangeControl
              label="Cohérence quantique"
              value={coherence}
              min={0}
              max={100}
              step={5}
              unit="%"
              onChange={setCoherence}
            />
          ) : null}
        </>
      }
      stats={
        <>
          <Metric label="S(AB)" value={formatNumber(state.global)} unit="bit" />
          <Metric
            label="S(A) = S(B)"
            value={formatNumber(state.local)}
            unit="bit"
          />
          <Metric
            label="Information mutuelle"
            value={formatNumber(mutualInformation)}
            unit="bits"
          />
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <h4>Matrice de densité ρAB</h4>
          <div
            role="table"
            aria-label={`Matrice de densité de ${TITLES[kind]}`}
            style={{
              display: "grid",
              gridTemplateColumns: "2rem repeat(4, minmax(2.5rem, 1fr))",
              gap: ".3rem",
              alignItems: "stretch",
            }}
          >
            <span aria-hidden="true" />
            {labels.map((label) => (
              <strong
                key={`h-${label}`}
                role="columnheader"
                style={{ textAlign: "center", padding: ".35rem" }}
              >
                {label}
              </strong>
            ))}
            {state.matrix.flatMap((row, rowIndex) => [
              <strong
                key={`r-${rowIndex}`}
                role="rowheader"
                style={{ display: "grid", placeItems: "center" }}
              >
                {labels[rowIndex]}
              </strong>,
              ...row.map((value, columnIndex) => (
                <span
                  role="cell"
                  key={`${rowIndex}-${columnIndex}`}
                  style={{
                    padding: ".65rem .35rem",
                    textAlign: "center",
                    background:
                      Math.abs(value) > 0.001
                        ? "color-mix(in srgb, var(--ev-info) 22%, var(--ev-panel))"
                        : "transparent",
                    border: "1px solid var(--ev-line)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatCell(value)}
                </span>
              )),
            ])}
          </div>
          <p className="entropy-viz__legend">
            <span>
              <i className="entropy-viz__dot entropy-viz__dot--info" />
              hors diagonale = cohérence entre amplitudes
            </span>
          </p>
        </div>
        <div className="entropy-viz__panel" aria-live="polite">
          <h4>{TITLES[kind]}</h4>
          <p>{state.note}</p>
          <dl>
            <dt>Valeurs propres de ρAB</dt>
            <dd>
              {state.eigen.map((value) => formatNumber(value, 2)).join(" · ")}
            </dd>
            <dt>Pureté Tr(ρ²)</dt>
            <dd>
              <strong>{formatNumber(purity)}</strong>
            </dd>
            <dt>État réduit ρA = ρB</dt>
            <dd>{state.local ? "diag(½, ½)" : "diag(1, 0)"}</dd>
            <dt>Mesure locale</dt>
            <dd>{state.local ? "0 ou 1 : 50 % chacun" : "0 : 100 %"}</dd>
          </dl>
          <svg
            viewBox="0 0 360 92"
            role="img"
            aria-label={`Corrélation entre A et B, information mutuelle ${formatNumber(mutualInformation)} bits`}
          >
            <circle
              cx="90"
              cy="46"
              r="31"
              fill="var(--ev-cold)"
              fillOpacity=".2"
              stroke="var(--ev-cold)"
            />
            <circle
              cx="270"
              cy="46"
              r="31"
              fill="var(--ev-hot)"
              fillOpacity=".2"
              stroke="var(--ev-hot)"
            />
            <path
              d="M121 46H239"
              stroke="var(--ev-info)"
              strokeWidth={1 + mutualInformation * 3}
            />
            <text x="90" y="51" textAnchor="middle" fill="var(--ev-text)">
              qubit A
            </text>
            <text x="270" y="51" textAnchor="middle" fill="var(--ev-text)">
              qubit B
            </text>
            <text
              x="180"
              y="36"
              textAnchor="middle"
              fill="var(--ev-muted)"
              fontSize="12"
            >
              I(A:B) = {formatNumber(mutualInformation)} bits
            </text>
          </svg>
        </div>
      </div>
    </VizFrame>
  );
}

export default V20PaireQuantique;
