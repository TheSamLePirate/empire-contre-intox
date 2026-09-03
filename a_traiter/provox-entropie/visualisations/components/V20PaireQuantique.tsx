import { useEffect, useMemo, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { formatNumber, shannonEntropy } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

type StateKind = "entangled" | "classical" | "product";
type Basis = "z" | "x";
const TITLES: Record<StateKind, string> = {
  entangled: "Paire de Bell |Φ+⟩",
  classical: "Mélange classique 00/11",
  product: "État produit |00⟩",
};
const PLAIN: Record<StateKind, string> = {
  entangled:
    "Le couple sait tout, chacun ne sait rien : l’état global est parfaitement déterminé (S(AB) = 0) alors que chaque qubit isolé est un pur pile-ou-face (S(A) = 1 bit). Ce n’est pas « des gants déjà rangés » : les cases hors diagonale gardent une mémoire de phase entre |00⟩ et |11⟩ — c’est elle que le test en base X révèle.",
  classical:
    "L’histoire des gants : une paire séparée dans deux boîtes, une envoyée à Paris, l’autre à Tokyo. Chaque boîte est une surprise (50/50), mais ouvrir l’une dit aussitôt tout de l’autre. Corrélation parfaite… et pourtant rien de quantique : tout était décidé d’avance.",
  product:
    "Deux qubits chacun proprement posés sur 0 : l’état global est net, chaque qubit est net, et rien ne relie A à B. Mesurer l’un n’apprend strictement rien sur l’autre.",
};

// Probabilités des quatre issues d’une mesure jointe, selon l’état et la base.
// Base Z : « ouvrir les boîtes » (0/1). Base X : la « question diagonale » (+/−),
// seule capable de distinguer la paire de Bell d’un simple mélange de gants.
export function outcomeProbabilities(
  kind: StateKind,
  basis: Basis,
  visibility: number,
): [number, number, number, number] {
  if (kind === "product")
    return basis === "z" ? [1, 0, 0, 0] : [0.25, 0.25, 0.25, 0.25];
  const v = kind === "classical" ? 0 : visibility;
  return basis === "z"
    ? [0.5, 0, 0, 0.5]
    : [(1 + v) / 4, (1 - v) / 4, (1 - v) / 4, (1 + v) / 4];
}

export function V20PaireQuantique({ className }: VisualizationProps) {
  const [kind, setKind] = useState<StateKind>("entangled");
  const [coherence, setCoherence] = useState(100);
  const [basis, setBasis] = useState<Basis>("z");
  const [counts, setCounts] = useState<[number, number, number, number]>([
    0, 0, 0, 0,
  ]);
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
            : "La décohérence réduit progressivement les termes hors diagonale : l’environnement « lit » la paire et efface la mémoire de phase. À 0 %, la paire de Bell est redevenue… une simple paire de gants.",
    };
  }, [coherence, kind]);
  const visibility = kind === "entangled" ? coherence / 100 : 0;
  const purity = state.eigen.reduce((sum, value) => sum + value ** 2, 0);
  const mutualInformation = 2 * state.local - state.global;
  const labels = ["00", "01", "10", "11"];
  const formatCell = (value: number) =>
    Math.abs(value) < 0.001 ? "0" : formatNumber(value, 2);

  // Le décompte repart de zéro dès que l’expérience change (état, base, cohérence).
  useEffect(() => {
    setCounts([0, 0, 0, 0]);
  }, [kind, basis, coherence]);
  const probabilities = outcomeProbabilities(kind, basis, visibility);
  const outcomeLabels =
    basis === "z" ? ["0·0", "0·1", "1·0", "1·1"] : ["+·+", "+·−", "−·+", "−·−"];
  const total = counts[0] + counts[1] + counts[2] + counts[3];
  const agreement = total ? (counts[0] + counts[3]) / total : null;
  const expectedAgreement = probabilities[0] + probabilities[3];
  const measure = (n: number) =>
    setCounts((previous) => {
      const next = [...previous] as [number, number, number, number];
      for (let draw = 0; draw < n; draw += 1) {
        const r = Math.random();
        const index =
          r < probabilities[0]
            ? 0
            : r < probabilities[0] + probabilities[1]
              ? 1
              : r < probabilities[0] + probabilities[1] + probabilities[2]
                ? 2
                : 3;
        next[index] += 1;
      }
      return next;
    });
  const verdict = (() => {
    if (total === 0)
      return basis === "z"
        ? "Mesurez quelques paires : en base Z, chaque tirage « ouvre les deux boîtes » en même temps."
        : "Mesurez quelques paires : la base X pose aux deux qubits la « question diagonale », celle qui départage gants et intrication.";
    const measured = `Accord mesuré : ${formatNumber((agreement ?? 0) * 100)} % (attendu ${formatNumber(expectedAgreement * 100)} %).`;
    if (basis === "z") {
      if (kind === "product")
        return `${measured} Toujours 0·0 : chaque qubit est simplement à 0, aucune corrélation à expliquer.`;
      return `${measured} Corrélation parfaite… mais des gants pré-rangés feraient exactement pareil : en base Z, mélange classique et paire de Bell sont indiscernables. Passez en base X.`;
    }
    if (kind === "product")
      return `${measured} Réponses au hasard et indépendantes : accord ~50 %, sans aucun lien entre A et B.`;
    if (kind === "classical" || visibility === 0)
      return `${measured} Les gants ne savent pas répondre à la question diagonale : accord ~50 %, comme au hasard. La corrélation classique ne survit pas au changement de question.`;
    return `${measured} Des gants pré-rangés plafonneraient à 50 % : cet excès d’accord est la signature de la cohérence — les cases hors diagonale de ρAB, que la base Z ne voyait pas.`;
  })();

  return (
    <VizFrame
      id="V20"
      title="Paire quantique simplifiée"
      question="Comment des statistiques locales identiques cachent-elles des états globaux différents ?"
      className={className}
      caveat="Modèle mathématique idéal de deux qubits dans la base |00⟩, |01⟩, |10⟩, |11⟩. Il ne simule ni appareil de mesure réel, ni dynamique ouverte complète, ni test de Bell (qui exige plusieurs bases et la fermeture d’échappatoires) ; une matrice similaire ne prouve pas expérimentalement l’intrication."
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
          <p className="entropy-viz__legend entropy-viz__legend--prose">
            <span>
              <i className="entropy-viz__dot entropy-viz__dot--info" /> Lire la
              matrice : la <b>diagonale</b> donne les probabilités des quatre
              réponses 00, 01, 10, 11 — le <b>hors diagonale</b> est la
              «&nbsp;mémoire de phase&nbsp;» entre possibilités, la partie
              proprement quantique, celle que la décohérence efface.
            </span>
          </p>
        </div>
        <div className="entropy-viz__panel" aria-live="polite">
          <h4>{TITLES[kind]}</h4>
          <p>
            <strong>En clair :</strong> {PLAIN[kind]}
          </p>
          <p>{state.note}</p>
          <dl>
            <dt>S(AB) — incertitude sur le couple</dt>
            <dd>
              <strong>{formatNumber(state.global)}</strong> bit ·{" "}
              {state.global < 0.05
                ? "le couple est parfaitement connu"
                : "le couple est incertain"}
            </dd>
            <dt>S(A) — incertitude d’un seul qubit</dt>
            <dd>
              <strong>{formatNumber(state.local)}</strong> bit ·{" "}
              {state.local ? "0 ou 1 : 50 % chacun, pile ou face" : "0 : 100 %"}
            </dd>
            <dt>Valeurs propres de ρAB</dt>
            <dd>
              {state.eigen.map((value) => formatNumber(value, 2)).join(" · ")}{" "}
              — pureté Tr(ρ²) : <strong>{formatNumber(purity)}</strong>
            </dd>
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
          <p className="entropy-viz__legend entropy-viz__legend--prose">
            <span>
              L’épaisseur du lien mesure la corrélation : <b>0 bit</b> =
              indépendants · <b>1 bit</b> = corrélation classique parfaite (les
              gants) · <b>2 bits</b> = intrication maximale — deux fois plus que
              tout ce que le classique permet.
            </span>
          </p>
        </div>
      </div>
      <div className="entropy-viz__panel">
        <h4>Le test qui départage — mesurez vous-même</h4>
        <p>
          En <b>base Z</b>, mesurer = « ouvrir les boîtes » et lire 0 ou 1. En{" "}
          <b>base X</b>, on pose aux deux qubits une autre question — la «
          question diagonale » (+ ou −), sensible à la phase. Les gants ont une
          réponse toute prête à la première question, aucune à la seconde ;
          la paire de Bell reste accordée dans les deux.
        </p>
        <div className="ev-measure-controls">
          <button
            type="button"
            aria-pressed={basis === "z"}
            onClick={() => setBasis("z")}
          >
            Base Z · 0/1
          </button>
          <button
            type="button"
            aria-pressed={basis === "x"}
            onClick={() => setBasis("x")}
          >
            Base X · +/−
          </button>
          <button type="button" onClick={() => measure(1)}>
            Mesurer 1 paire
          </button>
          <button type="button" onClick={() => measure(100)}>
            Mesurer 100 paires
          </button>
          <button
            type="button"
            onClick={() => setCounts([0, 0, 0, 0])}
            disabled={total === 0}
          >
            Remettre à zéro
          </button>
        </div>
        <div
          className="ev-tally"
          role="img"
          aria-label={`Résultats de ${total} mesures en base ${basis.toUpperCase()} : ${outcomeLabels
            .map((label, index) => `${label} ${counts[index]}`)
            .join(", ")}.`}
        >
          {outcomeLabels.map((label, index) => (
            <div className="ev-gauge__row" key={label}>
              <span>{label}</span>
              <span className="ev-gauge__bar">
                <i
                  style={{
                    width: `${probabilities[index]! * 100}%`,
                    background: "rgba(214,172,85,.22)",
                  }}
                />
                <i
                  style={{
                    width: total ? `${(counts[index]! / total) * 100}%` : "0%",
                    background:
                      index === 0 || index === 3
                        ? "var(--ev-useful)"
                        : "var(--ev-hot)",
                  }}
                />
              </span>
              <span className="ev-gauge__val">
                {counts[index]}
                <small>
                  {" "}
                  · attendu {formatNumber(probabilities[index]! * 100)} %
                </small>
              </span>
            </div>
          ))}
        </div>
        <p aria-live="polite">
          <strong>
            {total} paire{total > 1 ? "s" : ""} mesurée{total > 1 ? "s" : ""}.
          </strong>{" "}
          {verdict}
        </p>
        <p className="entropy-viz__legend entropy-viz__legend--prose">
          <span>
            Le fond doré indique la proportion attendue, la barre pleine ce que
            vos tirages ont donné (vert = réponses identiques, orange =
            différentes). C’est une expérience de pensée fidèle aux
            probabilités quantiques — pas un test de Bell, qui exige davantage
            de bases et de précautions.
          </span>
        </p>
      </div>
    </VizFrame>
  );
}

export default V20PaireQuantique;
