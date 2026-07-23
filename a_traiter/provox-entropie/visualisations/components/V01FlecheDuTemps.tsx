import { useEffect, useState } from "react";
import { Metric, VizFrame } from "../shared/VizFrame";

type VisualizationProps = { className?: string; seed?: number };
type SceneKind = "orbit" | "collision" | "diffusion" | "ice" | "friction";

const scenes: {
  name: string;
  kind: SceneKind;
  reversible: boolean;
  entropy: string;
  explanation: string;
}[] = [
  {
    name: "Orbite idéale",
    kind: "orbit",
    reversible: true,
    entropy: "constante",
    explanation:
      "La même ellipse parcourue avec toutes les vitesses inversées satisfait encore le modèle newtonien idéal.",
  },
  {
    name: "Collision élastique",
    kind: "collision",
    reversible: true,
    entropy: "constante dans ce modèle",
    explanation:
      "Sans déformation ni frottement, les vitesses après collision peuvent être exactement renversées.",
  },
  {
    name: "Diffusion d’un gaz",
    kind: "diffusion",
    reversible: false,
    entropy: "augmente",
    explanation:
      "Les molécules pourraient se reconcentrer, mais la fraction de micro-états correspondante devient astronomiquement petite.",
  },
  {
    name: "Glaçon dans l’eau",
    kind: "ice",
    reversible: false,
    entropy: "augmente",
    explanation:
      "La chaleur passe spontanément de l’eau tiède vers la glace. Le film inverse demanderait une fluctuation collective invraisemblable.",
  },
  {
    name: "Glissement avec frottement",
    kind: "friction",
    reversible: false,
    entropy: "augmente",
    explanation:
      "L’énergie cinétique organisée devient énergie interne du bloc et de la piste ; l’inverse n’est pas interdit microscopiquement, mais reste impraticable.",
  },
];

export function keplerPosition(progress: number, eccentricity = 0.65) {
  const meanAnomaly = progress * Math.PI * 2;
  let eccentricAnomaly = meanAnomaly;
  for (let iteration = 0; iteration < 8; iteration += 1) {
    eccentricAnomaly -=
      (eccentricAnomaly -
        eccentricity * Math.sin(eccentricAnomaly) -
        meanAnomaly) /
      (1 - eccentricity * Math.cos(eccentricAnomaly));
  }
  return {
    x: Math.cos(eccentricAnomaly),
    y: Math.sqrt(1 - eccentricity ** 2) * Math.sin(eccentricAnomaly),
  };
}

export function elasticCollisionPositions(progress: number) {
  const approach = 1 - Math.abs(2 * progress - 1);
  return { left: 100 + 218 * approach, right: 580 - 218 * approach };
}

export function diffusionPosition(index: number, progress: number) {
  const row = Math.floor(index / 7),
    col = index % 7;
  const initialX = 94 + col * 9 + Math.sin(index * 9.7) * 2;
  const initialY = 105 + row * 9 + Math.cos(index * 4.3) * 2;
  const finalX = 76 + col * 88 + Math.sin(index * 9.7) * 7;
  const finalY = 61 + row * 27 + Math.cos(index * 4.3) * 5;
  return {
    x: initialX + (finalX - initialX) * progress,
    y: initialY + (finalY - initialY) * progress,
  };
}

function Scene({ kind, progress }: { kind: SceneKind; progress: number }) {
  const t = progress;
  const dots = Array.from({ length: 42 }, (_, i) => diffusionPosition(i, t));
  const orbitSemiMajor = 190,
    orbitSemiMinor = 100;
  const orbitEccentricity = Math.sqrt(
    1 - (orbitSemiMinor / orbitSemiMajor) ** 2,
  );
  const orbit = keplerPosition(t, orbitEccentricity);
  const collision = elasticCollisionPositions(t);
  return (
    <svg
      viewBox="0 0 680 270"
      className="entropy-viz__plot"
      role="img"
      aria-label={`État du phénomène à ${Math.round(t * 100)} %`}
    >
      <title>Évolution de la scène sélectionnée</title>
      <rect
        x="14"
        y="14"
        width="652"
        height="224"
        rx="18"
        fill="var(--ev-bg)"
        stroke="var(--ev-line)"
      />
      {kind === "orbit" ? (
        <>
          <ellipse
            cx="340"
            cy="126"
            rx={orbitSemiMajor}
            ry={orbitSemiMinor}
            fill="none"
            stroke="var(--ev-line)"
            strokeWidth="2"
          />
          <path
            d={`M${340 - orbitSemiMajor * orbitEccentricity} 126L${340 + orbitSemiMajor * orbit.x} ${126 + orbitSemiMajor * orbit.y}`}
            stroke="var(--ev-hot)"
            strokeOpacity=".22"
          />
          <circle
            cx={340 - orbitSemiMajor * orbitEccentricity}
            cy="126"
            r="16"
            fill="var(--ev-hot)"
          />
          <circle
            cx={340 + orbitSemiMajor * orbit.x}
            cy={126 + orbitSemiMajor * orbit.y}
            r="10"
            fill="var(--ev-cold)"
          />
          <text
            className="entropy-viz__label"
            x="340"
            y="260"
            textAnchor="middle"
          >
            astre au foyer · loi des aires de Kepler
          </text>
        </>
      ) : null}
      {kind === "collision" ? (
        <>
          <line x1="50" x2="630" y1="168" y2="168" stroke="var(--ev-muted)" />
          <circle cx={collision.left} cy="145" r="22" fill="var(--ev-hot)" />
          <circle cx={collision.right} cy="145" r="22" fill="var(--ev-cold)" />
          <text
            className="entropy-viz__label"
            x="340"
            y="260"
            textAnchor="middle"
          >
            masses égales · contact tangent · échange des vitesses
          </text>
        </>
      ) : null}
      {kind === "diffusion" ? (
        <>
          <rect
            x="55"
            y="45"
            width="570"
            height="160"
            fill="var(--ev-panel-2)"
            stroke="var(--ev-muted)"
          />
          {dots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r="4"
              fill="var(--ev-info)"
              opacity=".86"
            />
          ))}
          <text
            className="entropy-viz__label"
            x="340"
            y="260"
            textAnchor="middle"
          >
            gradient de concentration → mélange homogène
          </text>
        </>
      ) : null}
      {kind === "ice" ? (
        <>
          <path
            d="M55 105 Q190 88 330 105 T625 105 V205 H55Z"
            fill="var(--ev-cold)"
            opacity=".38"
          />
          <rect
            x={270 + 24 * t}
            y={48 + 58 * t}
            width={140 * (1 - 0.72 * t)}
            height={100 * (1 - 0.72 * t)}
            rx="10"
            fill="var(--ev-text)"
            opacity=".9"
          />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M${210 + i * 75} ${68 + (i % 2) * 12} q18 -18 36 0`}
              fill="none"
              stroke="var(--ev-hot)"
              opacity={0.2 + 0.7 * t}
            />
          ))}
          <text
            className="entropy-viz__label"
            x="340"
            y="260"
            textAnchor="middle"
          >
            échange thermique à température finie
          </text>
        </>
      ) : null}
      {kind === "friction" ? (
        <>
          <line
            x1="55"
            x2="625"
            y1="183"
            y2="183"
            stroke="var(--ev-muted)"
            strokeWidth="5"
          />
          <rect
            x={70 + 390 * (1 - Math.exp(-3 * t))}
            y="123"
            width="100"
            height="58"
            rx="6"
            fill="var(--ev-gold)"
          />
          {Array.from({ length: 10 }, (_, i) => (
            <circle
              key={i}
              cx={170 + 42 * i}
              cy={205 + Math.sin(i * 3) * 8}
              r={2 + 5 * t}
              fill="var(--ev-hot)"
              opacity={0.2 + 0.7 * t}
            />
          ))}
          <text
            className="entropy-viz__label"
            x="340"
            y="260"
            textAnchor="middle"
          >
            vitesse organisée → agitation thermique
          </text>
        </>
      ) : null}
    </svg>
  );
}

export function V01FlecheDuTemps({ className = "" }: VisualizationProps) {
  const [selected, setSelected] = useState(0),
    [progress, setProgress] = useState(0),
    [reverse, setReverse] = useState(false),
    [playing, setPlaying] = useState(false),
    [guess, setGuess] = useState<"ambiguous" | "oriented" | null>(null);
  const item = scenes[selected] ?? scenes[0]!;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setProgress((p) => (p >= 1 ? 0 : Math.min(1, p + 0.02))),
      50,
    );
    return () => window.clearInterval(timer);
  }, [playing]);
  const displayed = reverse ? 1 - progress : progress;
  const correct = guess === (item.reversible ? "ambiguous" : "oriented");
  return (
    <VizFrame
      id="V1"
      title="Reconnaître la flèche du temps"
      question="Le sens du film est-il déductible du mouvement seul ?"
      caveat="Les scènes isolent un mécanisme et ne calculent pas une entropie moléculaire complète. Une évolution inverse reste compatible avec la dynamique microscopique, mais sa probabilité macroscopique peut être négligeable."
      className={className}
      stats={
        <>
          <Metric label="Lecture" value={reverse ? "inversée" : "directe"} />
          <Metric
            label="Temps réduit"
            value={`${Math.round(displayed * 100)} %`}
          />
          <Metric
            label="Votre verdict"
            value={guess ? (correct ? "juste" : "à revoir") : "—"}
          />
        </>
      }
      controls={
        <>
          <label>
            Phénomène{" "}
            <select
              value={selected}
              onChange={(e) => {
                setSelected(Number(e.currentTarget.value));
                setProgress(0);
                setGuess(null);
                setPlaying(false);
              }}
            >
              {scenes.map((scene, i) => (
                <option value={i} key={scene.name}>
                  {scene.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            aria-pressed={playing}
            onClick={() => setPlaying((v) => !v)}
          >
            {playing ? "Pause" : "Lecture"}
          </button>
          <button
            type="button"
            aria-pressed={reverse}
            onClick={() => {
              setReverse((v) => !v);
              setGuess(null);
            }}
          >
            Inverser le film
          </button>
          <button
            type="button"
            onClick={() => {
              setProgress(0);
              setPlaying(false);
            }}
          >
            Revenir au début
          </button>
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <Scene kind={item.kind} progress={displayed} />
          <label className="entropy-viz__range">
            Position <strong>{Math.round(displayed * 100)} %</strong>
            <input
              aria-label="Position dans le film"
              type="range"
              min="0"
              max="100"
              value={Math.round(progress * 100)}
              onChange={(e) => {
                setProgress(Number(e.currentTarget.value) / 100);
                setPlaying(false);
              }}
            />
          </label>
        </div>
        <div className="entropy-viz__panel" aria-live="polite">
          <h4>Peut-on reconnaître le sens ?</h4>
          <div style={{ display: "grid", gap: ".55rem" }}>
            <button
              type="button"
              aria-pressed={guess === "ambiguous"}
              onClick={() => setGuess("ambiguous")}
            >
              Non — les deux lectures semblent physiques
            </button>
            <button
              type="button"
              aria-pressed={guess === "oriented"}
              onClick={() => setGuess("oriented")}
            >
              Oui — une lecture paraît spontanée
            </button>
          </div>
          {guess ? (
            <>
              <p>
                <strong>
                  {correct ? "Exact." : "Pas dans le modèle présenté."}
                </strong>{" "}
                {item.explanation}
              </p>
              <dl>
                <dt>Lois microscopiques</dt>
                <dd>
                  {item.reversible ? "réversibles ici" : "souvent réversibles"}
                </dd>
                <dt>Entropie macroscopique</dt>
                <dd>{item.entropy}</dd>
              </dl>
            </>
          ) : (
            <p>Observez d’abord les deux lectures, puis engagez un verdict.</p>
          )}
        </div>
      </div>
    </VizFrame>
  );
}

export default V01FlecheDuTemps;
