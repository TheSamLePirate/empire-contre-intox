import { useId, useState } from "react";
import { VizFrame } from "../shared/VizFrame";
import type { VisualizationProps } from "../shared/types";

type EntropyId =
  "clausius" | "boltzmann" | "gibbs" | "shannon" | "vonneumann" | "bekenstein";
type Entry = {
  name: string;
  formula: string;
  object: string;
  unit: string;
  assumptions: string;
  example: string;
  meaning: string;
  trap: string;
  chapter: string;
};
const ENTRIES: Record<EntropyId, Entry> = {
  clausius: {
    name: "Clausius",
    formula: "dS = δQrev / T",
    object: "état thermodynamique à l’équilibre",
    unit: "J·K⁻¹",
    assumptions:
      "chemin réversible de référence ; température thermodynamique définie",
    example: "chauffer un corps ou traverser un changement de phase",
    meaning:
      "variation d’une fonction d’état reconstruite par un chemin réversible",
    trap: "δQ/T n’est pas dS pour n’importe quel processus irréversible",
    chapter: "V6 · bilan thermodynamique",
  },
  boltzmann: {
    name: "Boltzmann",
    formula: "S = kB ln Ω",
    object: "multiplicité d’un macro-état",
    unit: "J·K⁻¹",
    assumptions:
      "micro-états accessibles équiprobables ; macrovariables déclarées",
    example: "répartition de particules entre deux compartiments",
    meaning: "logarithme du nombre de micro-états compatibles",
    trap: "Ω ne signifie pas « nombre d’objets mal rangés »",
    chapter: "V8–V9 · multiplicité",
  },
  gibbs: {
    name: "Gibbs",
    formula: "S = −kB Σᵢ pᵢ ln pᵢ",
    object: "distribution statistique classique",
    unit: "J·K⁻¹",
    assumptions: "ensemble d’états et probabilités pᵢ précisés",
    example: "ensemble canonique en contact avec un thermostat",
    meaning: "incertitude pondérée sur les micro-états classiques",
    trap: "changer le découpage des états peut changer la valeur",
    chapter: "V10 · distributions",
  },
  shannon: {
    name: "Shannon",
    formula: "H = −Σᵢ pᵢ log₂ pᵢ",
    object: "source de symboles",
    unit: "bit par symbole",
    assumptions: "alphabet et distribution de la source précisés",
    example: "limite moyenne de compression d’un message",
    meaning: "information moyenne nécessaire pour coder l’issue",
    trap: "une même forme mathématique ne suffit pas à en faire une chaleur physique",
    chapter: "V17 · codage",
  },
  vonneumann: {
    name: "von Neumann",
    formula: "S(ρ) = −Tr(ρ log₂ρ)",
    object: "état quantique ou sous-système",
    unit: "bit (ou kB avec ln)",
    assumptions: "matrice de densité ρ et partition du système précisées",
    example: "entropie réduite d’un qubit intriqué",
    meaning: "entropie spectrale donnée par les valeurs propres de ρ",
    trap: "l’incertitude quantique ne se réduit pas toujours à une ignorance classique",
    chapter: "V20 · paire quantique",
  },
  bekenstein: {
    name: "Bekenstein–Hawking",
    formula: "SBH = kB c³A / (4Gℏ)",
    object: "horizon d’un trou noir",
    unit: "J·K⁻¹",
    assumptions: "gravitation semi-classique ; horizon stationnaire idéal",
    example: "horizon d’un trou noir de Schwarzschild",
    meaning: "entropie proportionnelle à l’aire, pas au volume",
    trap: "la formule ne fournit pas à elle seule tous les micro-états quantiques de l’espace-temps",
    chapter: "V23–V24 · trous noirs",
  },
};
type Relation = {
  from: EntropyId;
  to: EntropyId;
  kind: "généralise" | "analogie" | "pont physique" | "distinction";
  label: string;
};
const RELATIONS: Relation[] = [
  {
    from: "boltzmann",
    to: "gibbs",
    kind: "généralise",
    label: "Gibbs retrouve Boltzmann si les Ω états sont équiprobables",
  },
  {
    from: "gibbs",
    to: "shannon",
    kind: "analogie",
    label: "même fonction des probabilités, constantes et objets différents",
  },
  {
    from: "gibbs",
    to: "vonneumann",
    kind: "généralise",
    label: "von Neumann remplace la distribution par le spectre de ρ",
  },
  {
    from: "clausius",
    to: "boltzmann",
    kind: "pont physique",
    label: "la mécanique statistique relie macroétats et thermodynamique",
  },
  {
    from: "vonneumann",
    to: "bekenstein",
    kind: "pont physique",
    label: "intrication, aire et gravitation quantique se rencontrent",
  },
  {
    from: "shannon",
    to: "clausius",
    kind: "distinction",
    label: "analogie informationnelle ≠ identité thermodynamique automatique",
  },
];
const POSITION: Record<EntropyId, [number, number]> = {
  clausius: [25, 35],
  boltzmann: [245, 35],
  gibbs: [465, 35],
  shannon: [465, 245],
  vonneumann: [245, 245],
  bekenstein: [25, 245],
};

export function V26CarteEntropies({ className }: VisualizationProps) {
  const [selected, setSelected] = useState<EntropyId>("gibbs");
  const markerId = useId().replace(/:/g, "");
  const entry = ENTRIES[selected];
  const relations = RELATIONS.filter(
    ({ from, to }) => from === selected || to === selected,
  );
  const ids = Object.keys(ENTRIES) as EntropyId[];

  return (
    <VizFrame
      id="V26"
      title="Carte interactive des entropies"
      question="Quelle définition choisir — et quelles ressemblances ne faut-il pas transformer en identités ?"
      className={className}
      caveat="Carte d’orientation pédagogique, non taxonomie exhaustive. Elle omet entropies de Rényi, Tsallis, entropie topologique et de nombreux cadres hors équilibre ; chaque pont nécessite des hypothèses supplémentaires."
      controls={
        <>
          {ids.map((id) => (
            <button
              type="button"
              key={id}
              aria-pressed={selected === id}
              onClick={() => setSelected(id)}
            >
              {ENTRIES[id].name}
            </button>
          ))}
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <svg
            viewBox="0 0 660 360"
            role="img"
            aria-label={`Carte des six entropies. ${entry.name} est sélectionnée.`}
          >
            <defs>
              <marker
                id={markerId}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0 0L10 5L0 10z" fill="var(--ev-muted)" />
              </marker>
            </defs>
            {RELATIONS.map((relation) => {
              const [x1, y1] = POSITION[relation.from];
              const [x2, y2] = POSITION[relation.to];
              const active =
                relation.from === selected || relation.to === selected;
              return (
                <path
                  key={`${relation.from}-${relation.to}`}
                  d={`M${x1 + 72} ${y1 + 28} C${(x1 + x2) / 2 + 72} ${y1 + 28},${(x1 + x2) / 2 + 72} ${y2 + 28},${x2 + 72} ${y2 + 28}`}
                  fill="none"
                  stroke={active ? "var(--ev-gold)" : "var(--ev-line)"}
                  strokeWidth={active ? 3 : 1.5}
                  strokeDasharray={
                    relation.kind === "distinction" ? "5 4" : undefined
                  }
                  markerEnd={`url(#${markerId})`}
                />
              );
            })}
            {ids.map((id) => {
              const [x, y] = POSITION[id];
              return (
                <foreignObject key={id} x={x} y={y} width="145" height="58">
                  <button
                    type="button"
                    aria-pressed={selected === id}
                    onClick={() => setSelected(id)}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: `2px solid ${selected === id ? "var(--ev-gold)" : "var(--ev-line)"}`,
                      background:
                        selected === id
                          ? "var(--ev-gold)"
                          : "var(--ev-panel-2)",
                      color:
                        selected === id ? "var(--ev-bg)" : "var(--ev-text)",
                      fontWeight: 600,
                    }}
                  >
                    {ENTRIES[id].name}
                  </button>
                </foreignObject>
              );
            })}
          </svg>
          <div className="entropy-viz__legend">
            <span>trait plein : généralisation ou pont physique</span>
            <span>trait pointillé : distinction indispensable</span>
          </div>
        </div>
        <article className="entropy-viz__panel" aria-live="polite">
          <span className="entropy-viz__id">FICHE ACTIVE</span>
          <h4>{entry.name}</h4>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem" }}>
            <strong>{entry.formula}</strong>
          </p>
          <dl>
            <dt>Objet</dt>
            <dd>{entry.object}</dd>
            <dt>Unité</dt>
            <dd>{entry.unit}</dd>
            <dt>Conditions</dt>
            <dd>{entry.assumptions}</dd>
            <dt>Interprétation</dt>
            <dd>{entry.meaning}</dd>
            <dt>Exemple</dt>
            <dd>{entry.example}</dd>
            <dt>À revoir dans</dt>
            <dd>{entry.chapter}</dd>
          </dl>
          <p
            style={{
              borderInlineStart: "4px solid var(--ev-hot)",
              paddingInlineStart: ".8rem",
            }}
          >
            <strong>Piège :</strong> {entry.trap}
          </p>
        </article>
      </div>
      <div className="entropy-viz__panel" style={{ marginTop: "1rem" }}>
        <h4>Relations de {entry.name}</h4>
        <div className="entropy-viz__grid">
          {relations.map((relation) => {
            const other =
              relation.from === selected ? relation.to : relation.from;
            return (
              <button
                key={`${relation.from}-${relation.to}`}
                type="button"
                onClick={() => setSelected(other)}
                style={{ textAlign: "left" }}
              >
                <small>{relation.kind.toUpperCase()}</small>
                <br />
                <strong>{ENTRIES[other].name}</strong> — {relation.label}
              </button>
            );
          })}
        </div>
        <p>
          <strong>Réflexe avant tout calcul :</strong> quels états ? quelles
          probabilités ? quelle frontière ? quelle unité ?
        </p>
      </div>
    </VizFrame>
  );
}

export default V26CarteEntropies;
