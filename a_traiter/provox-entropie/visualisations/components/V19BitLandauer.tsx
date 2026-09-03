import { useEffect, useState } from "react";
import {
  Metric,
  RangeControl,
  TransportControl,
  VizFrame,
} from "../shared/VizFrame";
import { KB, formatNumber, linspace } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

type Operation = "erase" | "swap";
const ERASE_STEPS = [
  "État inconnu",
  "Abaisser la barrière",
  "Incliner vers 0",
  "Restaurer la barrière",
];
const SWAP_STEPS = [
  "Entrées distinctes",
  "Déformer le potentiel",
  "Échanger les puits",
  "Sorties distinctes",
];
const STEP_INSIGHTS: Record<Operation, string[]> = {
  erase: [
    "Le bit peut occuper l’un des deux puits : son état logique contient encore un bit d’information.",
    "La barrière diminue : les fluctuations thermiques peuvent faire passer le bit d’un puits à l’autre.",
    "L’inclinaison guide progressivement le bit vers 0 ; aller plus lentement réduit la dissipation excédentaire.",
    "Le potentiel redevient bistable : deux histoires initiales aboutissent désormais au même état 0.",
  ],
  swap: [
    "Les états 0 et 1 sont distincts et chacun possède une sortie identifiable.",
    "Le potentiel se déforme sans fusionner les deux histoires logiques.",
    "La particule représentative change de puits ; l’autre entrée suivrait le trajet réciproque.",
    "La correspondance reste bijective : connaître la sortie permet toujours de retrouver l’entrée.",
  ],
};
const STEP_PLAIN: Record<Operation, string[]> = {
  erase: [
    "La bille est quelque part — 0 ou 1, on ne sait pas lequel. C’est précisément ce « on ne sait pas » (un bit) qu’il va falloir payer pour l’effacer.",
    "On rabote la bosse du milieu : la bille peut maintenant sauter d’un creux à l’autre au gré des secousses thermiques. Le bit « fond ».",
    "On penche le moule vers la gauche : où qu’elle ait été, la bille roule vers 0. C’est ici que la chaleur part vers le bain — d’autant moins qu’on penche lentement.",
    "On redresse tout : la bille est à gauche, à coup sûr. La mémoire affiche 0… et le bain a empoché au moins kBT ln 2.",
  ],
  swap: [
    "Deux creux, deux états bien distincts : la bille pleine code une histoire, la bille fantôme l’autre.",
    "On déforme le moule sans jamais fusionner les deux chemins : chaque histoire garde sa voie propre.",
    "La bille glisse vers l’autre creux ; celle partie de l’autre côté fait exactement le trajet inverse. Les deux histoires se croisent sans se confondre.",
    "0 est devenu 1, et 1 est devenu 0. Rien n’est perdu : refaire l’opération ramène au départ — d’où une facture thermique quasi nulle.",
  ],
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const bounded = clamp01(value);
  return bounded * bounded * (3 - 2 * bounded);
};

export function V19BitLandauer({ className }: VisualizationProps) {
  const [temperature, setTemperature] = useState(300);
  const [duration, setDuration] = useState(70);
  const [barrier, setBarrier] = useState(7);
  const [operation, setOperation] = useState<Operation>("erase");
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(
      () =>
        setProgress((value) => {
          const next = value + 1 / 300;
          if (next >= 1) {
            setPlaying(false);
            return 1;
          }
          return next;
        }),
      40,
    );
    return () => window.clearInterval(timer);
  }, [playing]);
  const step = Math.min(3, Math.floor(progress * 4));
  const phaseProgress = progress >= 1 ? 1 : progress * 4 - step;
  const eased = smooth(phaseProgress);
  const minimum = KB * temperature * Math.LN2;
  const excessFactor =
    0.08 + (100 - duration) ** 2 / 1700 + Math.max(0, barrier - 5) / 14;
  const dissipated =
    operation === "erase"
      ? minimum * (1 + excessFactor)
      : minimum * excessFactor * 0.18;
  const exported = dissipated * smooth(progress);
  const labels = operation === "erase" ? ERASE_STEPS : SWAP_STEPS;
  const loweredBarrier = barrier * 0.32;
  const stageBarrier =
    step === 0
      ? barrier
      : step === 1
        ? barrier + (loweredBarrier - barrier) * eased
        : step === 2
          ? loweredBarrier
          : loweredBarrier + (barrier - loweredBarrier) * eased;
  const tilt =
    operation === "erase"
      ? step < 2
        ? 0
        : step === 2
          ? 2.8 * eased
          : 2.8 * (1 - eased)
      : 0;
  const potential = (x: number) => stageBarrier * (x * x - 1) ** 2 + tilt * x;
  const points = linspace(-2, 2, 121).map((x) => ({ x, y: potential(x) }));
  const minY = Math.min(...points.map(({ y }) => y));
  const maxY = Math.max(...points.map(({ y }) => y));
  const px = (x: number) => 46 + ((x + 2) / 4) * 622;
  const py = (y: number) =>
    206 - ((y - minY) / Math.max(1e-9, maxY - minY)) * 164;
  const path = points
    .map((point, index) => `${index ? "L" : "M"}${px(point.x)},${py(point.y)}`)
    .join(" ");
  const particleX =
    operation === "erase"
      ? step === 0
        ? 0.96
        : step === 1
          ? 0.96 * (1 - eased)
          : step === 2
            ? -0.96 * eased
            : -0.96
      : step < 2
        ? -0.96
        : step === 2
          ? -0.96 + 1.92 * eased
          : 0.96;
  // La « bille fantôme » : l’autre histoire logique possible. Pour l’effacement,
  // le bit parti de 0 reste à 0 (les deux histoires convergent) ; pour la
  // permutation, elle suit le trajet réciproque (les histoires se croisent).
  const ghostX = operation === "erase" ? -0.96 : -particleX;
  const haloRadius = 12 + temperature / 42;
  const gaugeMax = Math.max(minimum, dissipated) * 1.12;
  const selectOperation = (next: Operation) => {
    setOperation(next);
    setPlaying(false);
    setProgress(0);
  };
  const selectStep = (index: number) => {
    setPlaying(false);
    setProgress(index / 4);
  };

  return (
    <VizFrame
      id="V19"
      title="Un bit physique"
      question="Pourquoi l’effacement logique a-t-il un coût thermodynamique minimal ?"
      className={className}
      caveat="Le potentiel à double puits représente un bit bistable couplé à un bain thermique. La dissipation au-delà de kBT ln 2 est une estimation qualitative du protocole, pas celle d’un transistor réel ; la borne concerne l’effacement logique irréversible cyclique."
      controls={
        <>
          <TransportControl
            playing={playing}
            onToggle={() => {
              if (!playing && progress >= 1) setProgress(0);
              setPlaying((value) => !value);
            }}
            onReset={() => {
              setPlaying(false);
              setProgress(0);
            }}
            time={`${formatNumber(progress * 12)} s · étape ${step + 1}/4`}
            progress={progress}
            label="Défilement du protocole sur un bit physique"
          />
          <button
            type="button"
            aria-pressed={operation === "erase"}
            onClick={() => selectOperation("erase")}
          >
            Effacement 0/1 → 0
          </button>
          <button
            type="button"
            aria-pressed={operation === "swap"}
            onClick={() => selectOperation("swap")}
          >
            Permutation 0 ↔ 1
          </button>
          {labels.map((label, index) => (
            <button
              key={label}
              type="button"
              aria-pressed={step === index}
              aria-label={`Étape ${index + 1} : ${label}`}
              onClick={() => selectStep(index)}
            >
              {index + 1}
            </button>
          ))}
          <RangeControl
            label="Temps du protocole"
            value={Math.round(progress * 120) / 10}
            min={0}
            max={12}
            step={0.1}
            unit="s"
            onChange={(value) => {
              setPlaying(false);
              setProgress(value / 12);
            }}
          />
          <RangeControl
            label="Température du bain"
            value={temperature}
            min={10}
            max={600}
            step={10}
            unit="K"
            onChange={setTemperature}
          />
          <RangeControl
            label="Durée relative"
            value={duration}
            min={5}
            max={100}
            step={5}
            unit="%"
            onChange={setDuration}
          />
          <RangeControl
            label="Barrière initiale"
            value={barrier}
            min={2}
            max={12}
            step={1}
            unit="kBT"
            onChange={setBarrier}
          />
        </>
      }
      stats={
        <>
          <Metric label="Protocole" value={`${step + 1}/4 · ${labels[step]}`} />
          <Metric
            label="Borne kBT ln 2"
            value={formatNumber(minimum * 1e21)}
            unit="zJ"
          />
          <Metric
            label="Chaleur exportée"
            value={formatNumber(exported * 1e21)}
            unit="zJ"
          />
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <svg
            className="entropy-viz__plot"
            viewBox="0 0 700 255"
            role="img"
            aria-label={`Étape ${step + 1} : ${labels[step]}. Potentiel en unités de kBT ; la bille pleine et la bille fantôme montrent les deux histoires logiques possibles.`}
          >
            <path d="M46 28V206H668" fill="none" stroke="var(--ev-muted)" />
            {[0, 0.5, 1].map((fraction) => (
              <path
                key={fraction}
                d={`M46 ${206 - fraction * 164}H668`}
                stroke="var(--ev-line)"
              />
            ))}
            <path
              d={path}
              fill="none"
              stroke="var(--ev-gold)"
              strokeWidth="4"
            />
            {/* hauteur de la barrière, annotée en direct */}
            <text
              x={px(0)}
              y={py(potential(0)) - 12}
              textAnchor="middle"
              fill="var(--ev-muted)"
              fontSize="12"
            >
              barrière ≈ {formatNumber(stageBarrier)} kBT
            </text>
            {tilt > 0.15 ? (
              <text
                x={px(1.55)}
                y={py(potential(1.55)) - 14}
                textAnchor="middle"
                fill="var(--ev-hot)"
                fontSize="12"
              >
                ↙ on penche vers 0
              </text>
            ) : null}
            {/* bille fantôme : l’autre histoire logique */}
            <circle
              cx={px(ghostX)}
              cy={py(potential(ghostX))}
              r="9"
              fill="var(--ev-info)"
              fillOpacity=".28"
              stroke="var(--ev-text)"
              strokeOpacity=".35"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            {/* halo d’agitation thermique autour de la bille pleine */}
            <circle
              cx={px(particleX)}
              cy={py(potential(particleX))}
              r={haloRadius}
              fill="var(--ev-hot)"
              fillOpacity=".12"
              stroke="var(--ev-hot)"
              strokeOpacity=".35"
              strokeDasharray="2 4"
            />
            <circle
              cx={px(particleX)}
              cy={py(potential(particleX))}
              r="9"
              fill="var(--ev-info)"
              stroke="var(--ev-text)"
              strokeWidth="1"
            />
            <text x="190" y="230" textAnchor="middle" fill="var(--ev-muted)">
              0 · puits gauche
            </text>
            <text x="524" y="230" textAnchor="middle" fill="var(--ev-muted)">
              1 · puits droit
            </text>
            <text x="48" y="18" fill="var(--ev-muted)">
              U(x) / kBT
            </text>
            <text x="668" y="248" textAnchor="end" fill="var(--ev-muted)">
              coordonnée physique x
            </text>
          </svg>
          <p className="entropy-viz__legend entropy-viz__legend--prose">
            <span>
              <i className="entropy-viz__dot entropy-viz__dot--info" /> bille
              pleine : le bit parti de 1 · bille en pointillé : le bit parti de
              0 — l’effacement fait <b>converger</b> les deux, la permutation
              les fait <b>se croiser</b>. Le halo est l’agitation thermique :
              montez la température pour le voir grandir.
            </span>
          </p>
        </div>
        <div className="entropy-viz__panel" aria-live="polite">
          <h4>
            Étape {step + 1}/4 · {labels[step]}
          </h4>
          <p>
            <strong>En clair :</strong> {STEP_PLAIN[operation][step]}
          </p>
          <p>
            <strong>À observer :</strong> {STEP_INSIGHTS[operation][step]}
          </p>
          <p>
            <strong>Bilan logique :</strong>{" "}
            {operation === "erase"
              ? "0 ou 1 → 0. Irréversible : la sortie ne dit plus d’où l’on vient."
              : "0 ↔ 1. Réversible : la sortie permet toujours de retrouver l’entrée."}
          </p>
          <div
            className="ev-gauge"
            role="img"
            aria-label={`Borne de Landauer ${formatNumber(minimum * 1e21)} zeptojoules ; coût du protocole ${formatNumber(dissipated * 1e21)} zeptojoules, dont ${formatNumber(exported * 1e21)} déjà exportés.`}
          >
            <div className="ev-gauge__row">
              <span>Borne kBT ln 2</span>
              <span className="ev-gauge__bar">
                <i
                  style={{
                    width: `${(minimum / gaugeMax) * 100}%`,
                    background: "var(--ev-gold)",
                  }}
                />
              </span>
              <span className="ev-gauge__val">
                {formatNumber(minimum * 1e21)} zJ
              </span>
            </div>
            <div className="ev-gauge__row">
              <span>Coût de ce protocole</span>
              <span className="ev-gauge__bar">
                <i
                  style={{
                    width: `${(dissipated / gaugeMax) * 100}%`,
                    background: "rgba(239,125,87,.35)",
                  }}
                />
                <i
                  style={{
                    width: `${(exported / gaugeMax) * 100}%`,
                    background: "var(--ev-hot)",
                  }}
                />
              </span>
              <span className="ev-gauge__val">
                ×{formatNumber(dissipated / minimum)}
              </span>
            </div>
          </div>
          <p>
            <strong>Excès au-dessus du régime idéal :</strong>{" "}
            {formatNumber(excessFactor * 100)} %{" "}
            {duration < 35
              ? "— opération rapide, davantage de dissipation"
              : "— protocole plus proche du régime lent"}
          </p>
          <p>
            {operation === "erase"
              ? "Deux histoires logiques fusionnent : l’information manquante doit être exportée vers l’environnement, en chaleur."
              : "Une permutation conserve l’information logique ; elle n’impose pas à elle seule la borne d’effacement — comparez la jauge ci-dessus avec celle de l’effacement."}
          </p>
        </div>
      </div>
      <div className="entropy-viz__panel">
        <strong>L’image à avoir en tête</strong>
        <div className="ev-explainers">
          <div>
            <h4>La bille et le moule</h4>
            <p>
              Une bille au fond d’un moule à deux creux : à gauche elle code 0,
              à droite 1. Une mémoire d’ordinateur, c’est des milliards de
              moules comme celui-ci. Tant que la bosse du milieu est haute,
              l’agitation thermique ne suffit pas à faire sauter la bille : le
              bit est stable.
            </p>
          </div>
          <div>
            <h4>Pourquoi effacer chauffe</h4>
            <p>
              « Effacer », c’est forcer la bille à gauche <em>sans regarder</em>{" "}
              où elle était : deux passés possibles (0 ou 1) finissent dans le
              même présent (0). Un bit disparaît de la mémoire — et la physique
              n’oublie pas gratuitement : ce bit doit ressortir en chaleur, au
              minimum kBT ln 2 (principe de Landauer, 1961). La permutation
              0 ↔ 1, elle, ne détruit rien : on peut toujours revenir en
              arrière, la borne ne s’applique pas.
            </p>
          </div>
          <div>
            <h4>Et dans la vraie vie ?</h4>
            <p>
              À {formatNumber(temperature)} K, la borne vaut ≈{" "}
              {formatNumber(minimum * 1e21)} zJ par bit — un zeptojoule, c’est
              10⁻²¹ joule. Les puces actuelles dissipent encore de l’ordre de
              10³ à 10⁶ fois cette limite, et la borne a été vérifiée au
              laboratoire en 2012 sur une microbille piégée par laser (Bérut{" "}
              <em>et al.</em>, <em>Nature</em>). Aller lentement rapproche de la
              borne : c’est le curseur « durée relative ».
            </p>
          </div>
        </div>
      </div>
    </VizFrame>
  );
}

export default V19BitLandauer;
