import { useState } from "react";
import { Metric, VizFrame } from "../shared/VizFrame";
type VisualizationProps = { className?: string; seed?: number };
type Transfers = { matter: boolean; heat: boolean; work: boolean };
const examples: { name: string; detail: string; state: Transfers }[] = [
  {
    name: "Thermos idéal",
    detail: "Paroi rigide, étanche et parfaitement isolante.",
    state: { matter: false, heat: false, work: false },
  },
  {
    name: "Cylindre-piston",
    detail: "Gaz confiné, paroi diatherme et piston mobile.",
    state: { matter: false, heat: true, work: true },
  },
  {
    name: "Turbine",
    detail: "Fluide traversant, pertes thermiques et travail d’arbre.",
    state: { matter: true, heat: true, work: true },
  },
  {
    name: "Organisme",
    detail:
      "Nutriments, respiration, chaleur et travail traversent la frontière.",
    state: { matter: true, heat: true, work: true },
  },
  {
    name: "Bouteille secouée",
    detail: "Bouteille fermée, isolée thermiquement, recevant du travail.",
    state: { matter: false, heat: false, work: true },
  },
];
function classification({ matter, heat, work }: Transfers) {
  if (!matter && !heat && !work)
    return { main: "Système isolé", tags: ["fermé", "adiabatique", "rigide"] };
  return {
    main: matter ? "Système ouvert" : "Système fermé",
    tags: [
      !heat ? "adiabatique" : "diatherme",
      work ? "travail possible" : "sans travail",
    ],
  };
}
function Transfer({
  label,
  on,
  color,
  detail,
  onClick,
}: {
  label: string;
  on: boolean;
  color: string;
  detail: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: ".7rem",
        alignItems: "center",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "1rem",
          height: "1rem",
          borderRadius: "50%",
          background: on ? color : "var(--ev-line)",
        }}
      />
      <span>
        <strong>{label}</strong>
        <br />
        <small>
          {on ? "traverse la frontière" : "bloqué"} · {detail}
        </small>
      </span>
    </button>
  );
}
export function V05LaboratoireFrontieres({
  className = "",
}: VisualizationProps) {
  const [state, setState] = useState<Transfers>(examples[0]!.state),
    [selected, setSelected] = useState<number | null>(0);
  const result = classification(state),
    example = selected === null ? null : (examples[selected] ?? null);
  const toggle = (key: keyof Transfers) => {
    setSelected(null);
    setState((s) => ({ ...s, [key]: !s[key] }));
  };
  const apply = (i: number) => {
    setSelected(i);
    setState(examples[i]!.state);
  };
  return (
    <VizFrame
      id="V5"
      title="Laboratoire des frontières"
      question="Quels transferts la frontière choisie laisse-t-elle traverser ?"
      caveat="La nature du système dépend de la frontière, de la durée et de la précision retenues. Aucun thermos réel n’est parfaitement isolé et une turbine peut souvent être modélisée adiabatique malgré de faibles pertes."
      className={className}
      stats={
        <>
          <Metric label="Classification" value={result.main} />
          <Metric
            label="Matière"
            value={state.matter ? "traverse" : "bloquée"}
          />
          <Metric label="Chaleur" value={state.heat ? "traverse" : "bloquée"} />
        </>
      }
      controls={
        <>
          {examples.map((item, i) => (
            <button
              type="button"
              key={item.name}
              aria-pressed={selected === i}
              onClick={() => apply(i)}
            >
              {item.name}
            </button>
          ))}
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <h4>Frontière du système</h4>
          <svg
            viewBox="0 0 700 350"
            className="entropy-viz__plot"
            role="img"
            aria-label={`${result.main}; matière ${state.matter ? "autorisée" : "bloquée"}, chaleur ${state.heat ? "autorisée" : "bloquée"}, travail ${state.work ? "autorisé" : "bloqué"}`}
          >
            <title>Flux franchissant la frontière choisie</title>
            <defs>
              <marker
                id="v5arrow"
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
              x="215"
              y="62"
              width="270"
              height="220"
              rx="46"
              fill="var(--ev-panel-2)"
              stroke="var(--ev-gold)"
              strokeWidth="5"
              strokeDasharray="10 6"
            />
            <circle
              cx="350"
              cy="173"
              r="55"
              fill="var(--ev-bg)"
              stroke="var(--ev-line)"
            />
            <text
              className="entropy-viz__label"
              x="350"
              y="165"
              textAnchor="middle"
            >
              SYSTÈME
            </text>
            <text
              className="entropy-viz__label"
              x="350"
              y="191"
              textAnchor="middle"
            >
              observé
            </text>
            {[
              {
                key: "matter",
                on: state.matter,
                x1: 30,
                y1: 122,
                x2: 214,
                y2: 122,
                color: "var(--ev-info)",
                label: "matière ṁ",
              },
              {
                key: "heat",
                on: state.heat,
                x1: 350,
                y1: 25,
                x2: 350,
                y2: 61,
                color: "var(--ev-hot)",
                label: "chaleur Q",
              },
              {
                key: "work",
                on: state.work,
                x1: 486,
                y1: 232,
                x2: 668,
                y2: 232,
                color: "var(--ev-useful)",
                label: "travail W",
              },
            ].map((flow) => (
              <g key={flow.key} opacity={flow.on ? 1 : 0.25}>
                <line
                  x1={flow.x1}
                  y1={flow.y1}
                  x2={flow.x2}
                  y2={flow.y2}
                  stroke={flow.color}
                  strokeWidth="11"
                  markerEnd={flow.on ? "url(#v5arrow)" : undefined}
                />
                <text
                  className="entropy-viz__label"
                  x={(flow.x1 + flow.x2) / 2}
                  y={(flow.y1 + flow.y2) / 2 - 14}
                  textAnchor="middle"
                >
                  {flow.label}
                </text>
                {!flow.on ? (
                  <path
                    d={`M${(flow.x1 + flow.x2) / 2 - 9} ${(flow.y1 + flow.y2) / 2 - 9}l18 18m0-18l-18 18`}
                    stroke="var(--ev-text)"
                    strokeWidth="4"
                  />
                ) : null}
              </g>
            ))}
            <text
              className="entropy-viz__label"
              x="350"
              y="326"
              textAnchor="middle"
            >
              la frontière en pointillés fixe ce que l’on compte
            </text>
          </svg>
          <p>
            {example ? (
              <>
                <strong>{example.name} :</strong> {example.detail}
              </>
            ) : (
              "Configuration personnalisée : les trois permissions ont été réglées directement."
            )}
          </p>
        </div>
        <div className="entropy-viz__panel">
          <h4>Modifier les permissions</h4>
          <div style={{ display: "grid", gap: ".55rem" }}>
            <Transfer
              label="Matière"
              on={state.matter}
              color="var(--ev-info)"
              detail="masse, molécules, débit"
              onClick={() => toggle("matter")}
            />
            <Transfer
              label="Chaleur"
              on={state.heat}
              color="var(--ev-hot)"
              detail="transfert dû à ΔT"
              onClick={() => toggle("heat")}
            />
            <Transfer
              label="Travail"
              on={state.work}
              color="var(--ev-useful)"
              detail="arbre, piston, électrique"
              onClick={() => toggle("work")}
            />
          </div>
          <h4 aria-live="polite">{result.main}</h4>
          <p>{result.tags.join(" · ")}</p>
          <p>
            {!state.heat && state.work ? (
              <>
                <strong>Point clé :</strong> adiabatique signifie Q = 0, mais le
                travail peut encore franchir la frontière.
              </>
            ) : !state.matter && state.heat ? (
              "La masse reste enfermée, mais l’énergie peut passer sous forme de chaleur."
            ) : state.matter ? (
              "Un système ouvert échange de la matière ; il peut aussi échanger chaleur et travail."
            ) : (
              "Aucun transfert n’est autorisé dans le modèle choisi."
            )}
          </p>
        </div>
      </div>
    </VizFrame>
  );
}
export default V05LaboratoireFrontieres;
