import { useEffect, useState } from "react";
import { Metric, TransportControl, VizFrame } from "../shared/VizFrame";
import type { VisualizationProps } from "../shared/types";

type Estimate = { log: number; spread: number } | null;
type Era = {
  id: string;
  label: string;
  time: string;
  status: "reconstruction" | "estimation" | "projection";
  values: [Estimate, Estimate, Estimate, Estimate];
  note: string;
};
const ERAS: Era[] = [
  {
    id: "primordial",
    label: "Plasma primordial",
    time: "secondes → 380 000 ans",
    status: "reconstruction",
    values: [{ log: 88, spread: 1 }, { log: 82, spread: 3 }, null, null],
    note: "L’entropie comobile du rayonnement est approximativement conservée après thermalisation ; faible entropie gravitationnelle ne signifie pas faible entropie thermique.",
  },
  {
    id: "stars",
    label: "Premières structures",
    time: "0,1 → 1 milliard d’années",
    status: "reconstruction",
    values: [
      { log: 88, spread: 1 },
      { log: 83, spread: 3 },
      { log: 76, spread: 3 },
      { log: 91, spread: 5 },
    ],
    note: "Étoiles et premiers trous noirs apparaissent. Le canal gravitationnel devient central mais très dépendant de la population supposée.",
  },
  {
    id: "today",
    label: "Univers observable actuel",
    time: "13,8 milliards d’années",
    status: "estimation",
    values: [
      { log: 88, spread: 1 },
      { log: 82, spread: 3 },
      { log: 78, spread: 2 },
      { log: 103, spread: 2 },
    ],
    note: "Dans les inventaires usuels, les horizons des trous noirs supermassifs dominent de très loin le budget estimé.",
  },
  {
    id: "stellar-end",
    label: "Ère dégénérée",
    time: "10¹⁴ → 10⁴⁰ ans",
    status: "projection",
    values: [
      { log: 89, spread: 2 },
      { log: 82, spread: 4 },
      { log: 74, spread: 5 },
      { log: 104, spread: 3 },
    ],
    note: "La formation stellaire cesse ; la suite dépend notamment de la stabilité du proton, des interactions gravitationnelles et de l’expansion.",
  },
  {
    id: "evaporation",
    label: "Après évaporation",
    time: "jusqu’à ≳ 10¹⁰⁰ ans",
    status: "projection",
    values: [{ log: 104, spread: 4 }, { log: 80, spread: 8 }, null, null],
    note: "Scénario conditionnel : les trous noirs transfèrent leur entropie au rayonnement de Hawking dans un Univers en expansion indéfinie.",
  },
];
const CATEGORIES = [
  { label: "Rayonnement + neutrinos", color: "var(--ev-cold)" },
  { label: "Matière diffuse", color: "var(--ev-useful)" },
  { label: "Étoiles", color: "var(--ev-gold)" },
  { label: "Horizons de trous noirs", color: "var(--ev-info)" },
];
const MIN_LOG = 70;
const MAX_LOG = 108;
const position = (log: number) => ((log - MIN_LOG) / (MAX_LOG - MIN_LOG)) * 100;

export function V25FriseCosmique({ className }: VisualizationProps) {
  const [selected, setSelected] = useState(2);
  const [speculation, setSpeculation] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () =>
        setSelected((value) => {
          if (value >= ERAS.length - 1) {
            setPlaying(false);
            return value;
          }
          return value + 1;
        }),
      1700,
    );
    return () => window.clearInterval(timer);
  }, [playing]);
  const era = ERAS[selected] ?? ERAS[2]!;
  const dominant = era.values.reduce(
    (best, value, index) =>
      value && (!best.value || value.log > best.value.log)
        ? { value, index }
        : best,
    { value: null as Estimate, index: -1 },
  );

  return (
    <VizFrame
      id="V25"
      title="Frise logarithmique de l’entropie cosmique"
      question="Quels réservoirs dominent — et avec quel degré de certitude — selon l’époque ?"
      className={className}
      caveat="Ordres de grandeur de S/kB dans un volume comobile comparable à l’Univers observable actuel : ils exigent une bibliographie et une convention de volume explicites avant publication. Les bandes ne sont pas des erreurs statistiques ; elles rendent visible la dépendance aux inventaires et scénarios."
      controls={
        <>
          <TransportControl
            playing={playing}
            onToggle={() => {
              if (!playing && selected >= ERAS.length - 1) setSelected(0);
              setPlaying((value) => !value);
            }}
            onReset={() => {
              setPlaying(false);
              setSelected(0);
            }}
            time={`${selected + 1} / ${ERAS.length} époques`}
            progress={selected / (ERAS.length - 1)}
            label="Défilement des époques cosmiques"
          />
          {ERAS.map((item, index) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={selected === index}
              onClick={() => {
                setPlaying(false);
                setSelected(index);
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={speculation}
            onClick={() => setSpeculation((value) => !value)}
          >
            Hypothèses spéculatives
          </button>
        </>
      }
      stats={
        <>
          <Metric label="Époque" value={era.time} />
          <Metric label="Statut" value={era.status} />
          <Metric
            label="Réservoir dominant"
            value={
              dominant.index >= 0
                ? CATEGORIES[dominant.index]?.label
                : "indéterminé"
            }
          />
        </>
      }
    >
      <div className="entropy-viz__panel">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(8rem, 11rem) 1fr",
            gap: ".45rem .8rem",
            alignItems: "center",
          }}
        >
          <span />
          <div
            style={{
              position: "relative",
              height: "2rem",
              borderBottom: "1px solid var(--ev-line)",
            }}
          >
            {[70, 80, 90, 100, 108].map((tick) => (
              <span
                key={tick}
                style={{
                  position: "absolute",
                  left: `${position(tick)}%`,
                  transform: "translateX(-50%)",
                  color: "var(--ev-muted)",
                  fontSize: ".75rem",
                }}
              >
                10<sup>{tick}</sup>
              </span>
            ))}
          </div>
          {CATEGORIES.map((category, index) => {
            const estimate = era.values[index];
            if (!estimate)
              return (
                <div key={category.label} style={{ display: "contents" }}>
                  <span>{category.label}</span>
                  <span style={{ color: "var(--ev-muted)" }}>
                    non pertinent ou non estimé
                  </span>
                </div>
              );
            const low = position(estimate.log - estimate.spread);
            const high = position(estimate.log + estimate.spread);
            const center = position(estimate.log);
            return (
              <div key={category.label} style={{ display: "contents" }}>
                <span>{category.label}</span>
                <span
                  style={{
                    position: "relative",
                    height: "1.5rem",
                    background: "var(--ev-line)",
                  }}
                  aria-label={`${category.label} : 10 puissance ${estimate.log}, intervalle indicatif plus ou moins ${estimate.spread} ordres`}
                >
                  <i
                    style={{
                      position: "absolute",
                      left: `${Math.max(0, low)}%`,
                      width: `${Math.min(100, high) - Math.max(0, low)}%`,
                      top: ".35rem",
                      height: ".8rem",
                      background: category.color,
                      opacity: 0.35,
                    }}
                  />
                  <i
                    style={{
                      position: "absolute",
                      left: `${center}%`,
                      top: ".15rem",
                      width: "3px",
                      height: "1.2rem",
                      background: category.color,
                    }}
                  />
                  <strong
                    style={{
                      position: "absolute",
                      left: `${Math.min(88, center + 2)}%`,
                      top: ".05rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    10<sup>{estimate.log}</sup> kB
                  </strong>
                </span>
              </div>
            );
          })}
        </div>
        <p aria-live="polite">
          <strong>{era.label} :</strong> {era.note}
        </p>
        <p className="entropy-viz__legend">
          Trait = valeur centrale de travail · bande = plage de scénarios · axe
          logarithmique : dix graduations représentent un facteur 10¹⁰.
        </p>
      </div>
      {speculation ? (
        <aside
          className="entropy-viz__panel"
          aria-label="Hypothèses spéculatives"
          style={{
            marginTop: "1rem",
            borderInlineStart: "4px solid var(--ev-info)",
          }}
        >
          <h4>Propositions distinctes du scénario standard</h4>
          <div className="entropy-viz__grid">
            <p>
              <strong>Cosmologie cyclique conforme (Penrose)</strong>
              <br />
              Des éons successifs seraient reliés par une transformation
              conforme. Statut : proposition théorique controversée.
            </p>
            <p>
              <strong>Sélection cosmologique (Smolin)</strong>
              <br />
              Les trous noirs seraient associés à des univers-fils dont les
              paramètres varient. Statut : hypothèse spéculative non établie.
            </p>
          </div>
        </aside>
      ) : null}
    </VizFrame>
  );
}

export default V25FriseCosmique;
