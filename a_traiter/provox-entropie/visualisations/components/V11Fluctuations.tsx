import { useEffect, useMemo, useState } from "react";
import { Metric, TransportControl, VizFrame } from "../shared/VizFrame";
import { binaryEntropy, mulberry32 } from "../shared/math";
import { LinePlot } from "../shared/plots";
import type { VisualizationProps } from "../shared/types";

const sizes = [10, 100, 10_000];

/** Modèle des urnes d'Ehrenfest : une particule choisie au hasard change de côté. */
function ehrenfestRun(n: number, seed: number, points = 121) {
  const random = mulberry32(seed);
  let left = Math.round(n * 0.8);
  const samples = [{ fraction: left / n, entropy: binaryEntropy(left / n) }];
  const movesPerPoint = Math.max(1, Math.round(n / 12));
  for (let point = 1; point < points; point += 1) {
    for (let move = 0; move < movesPerPoint; move += 1) {
      // Probabilité de tirer une particule à gauche = n_gauche / N.
      left += random() < left / n ? -1 : 1;
    }
    const fraction = left / n;
    samples.push({ fraction, entropy: binaryEntropy(fraction) });
  }
  return { samples, movesPerPoint };
}

export function V11Fluctuations({
  className,
  seed = 1111,
}: VisualizationProps) {
  const [trial, setTrial] = useState(0);
  const [standardized, setStandardized] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const runs = useMemo(
    () =>
      sizes.map((n, index) => ({
        n,
        ...ehrenfestRun(n, seed + trial * 104729 + index * 997),
      })),
    [seed, trial],
  );
  const lastSample = runs[0]!.samples.length - 1;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () =>
        setCursor((value) => {
          if (value >= lastSample) {
            setPlaying(false);
            return lastSample;
          }
          return value + 1;
        }),
      50,
    );
    return () => window.clearInterval(timer);
  }, [playing, lastSample]);

  return (
    <VizFrame
      id="V11"
      title="Fluctuations vers l’équilibre"
      question="Pourquoi l’équilibre devient-il presque immobile à l’échelle macroscopique ?"
      caveat="Modèle des urnes d’Ehrenfest : les particules indépendantes changent de compartiment une à une, sans positions ni collisions. N = 10 000 reste microscopique face à un gaz réel (~10²³ particules)."
      className={className}
      stats={
        <>
          <Metric label="Départ" value="80 % à gauche" />
          <Metric label="Équilibre attendu" value="50 %" />
          <Metric label="Écart-type théorique" value="1 / (2√N)" />
        </>
      }
      controls={
        <>
          <TransportControl
            playing={playing}
            onToggle={() => {
              if (!playing && cursor >= lastSample) setCursor(0);
              setPlaying((value) => !value);
            }}
            onReset={() => {
              setPlaying(false);
              setCursor(0);
            }}
            time={`${cursor} / ${lastSample} échantillons`}
            progress={cursor / lastSample}
            label="Défilement des fluctuations"
          />
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setCursor(0);
              setTrial((value) => value + 1);
            }}
          >
            Rejouer avec la graine suivante
          </button>
          <button
            type="button"
            aria-pressed={standardized}
            onClick={() => setStandardized((value) => !value)}
          >
            {standardized
              ? "Voir les fractions"
              : "Comparer en unités d’écart-type"}
          </button>
        </>
      }
    >
      <div className="entropy-viz__fluctuation-list">
        {runs.map((run) => {
          const visibleSamples = run.samples.slice(0, cursor + 1);
          const final = visibleSamples.at(-1)!;
          const relaxed = visibleSamples.slice(30);
          const maxDeviation = relaxed.length
            ? Math.max(
                ...relaxed.map(({ fraction }) => Math.abs(fraction - 0.5)),
              )
            : 0;
          const points = visibleSamples.map(({ fraction }, index) => ({
            x: index * run.movesPerPoint,
            y: standardized
              ? 2 * Math.sqrt(run.n) * (fraction - 0.5)
              : 100 * fraction,
          }));
          return (
            <div
              className="entropy-viz__panel entropy-viz__fluctuation-panel"
              key={run.n}
            >
              <h4>N = {run.n.toLocaleString("fr-FR")} particules</h4>
              <div className="entropy-viz__fluctuation-chart">
                <LinePlot
                  series={[
                    {
                      label: standardized
                        ? "écart à l’équilibre en σ"
                        : "particules à gauche en %",
                      points,
                    },
                  ]}
                  yLabel={standardized ? "écart (σ)" : "à gauche (%)"}
                  xLabel="transferts"
                  width={720}
                  height={230}
                />
              </div>
              <dl className="entropy-viz__fluctuation-stats">
                <div>
                  <dt>État courant</dt>
                  <dd>{(100 * final.fraction).toFixed(2)} % à gauche</dd>
                </div>
                <div>
                  <dt>Entropie binaire</dt>
                  <dd>{final.entropy.toFixed(4)} bit/particule</dd>
                </div>
                <div>
                  <dt>Fluctuation maximale après relaxation</dt>
                  <dd>{(100 * maxDeviation).toFixed(2)} points</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
      <p className="entropy-viz__legend">
        Une trajectoire peut connaître de petites baisses momentanées
        d’entropie. Mais l’amplitude relative typique décroît comme 1/√N :
        doubler l’échelle verticale standardisée révèle que les fluctuations ont
        la même statistique sous-jacente.
      </p>
    </VizFrame>
  );
}

export default V11Fluctuations;
