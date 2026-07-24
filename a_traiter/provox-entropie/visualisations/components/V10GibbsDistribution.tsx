import { useMemo, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import { entropyNatural } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

const labels = ["A", "B", "C", "D"];
const energies = [0, 1, 2, 3];

function redistribute(probabilities: number[], changed: number, next: number) {
  const clamped = Math.max(0.001, Math.min(0.997, next));
  const oldRemainder = 1 - probabilities[changed]!;
  const nextRemainder = 1 - clamped;
  if (oldRemainder < 1e-9)
    return probabilities.map((_, index) =>
      index === changed ? clamped : nextRemainder / 3,
    );
  return probabilities.map((value, index) =>
    index === changed ? clamped : (value * nextRemainder) / oldRemainder,
  );
}

function boltzmann(temperature: number) {
  const weights = energies.map((energy) => Math.exp(-energy / temperature));
  const z = weights.reduce((sum, value) => sum + value, 0);
  return weights.map((value) => value / z);
}

export function V10GibbsDistribution({ className }: VisualizationProps) {
  const [manual, setManual] = useState([0.7, 0.15, 0.1, 0.05]);
  const [thermal, setThermal] = useState(false);
  const [temperature, setTemperature] = useState(1);
  const probabilities = useMemo(
    () => (thermal ? boltzmann(temperature) : manual),
    [manual, temperature, thermal],
  );
  const entropy = entropyNatural(probabilities);
  const effective = Math.exp(entropy);
  const meanEnergy = probabilities.reduce(
    (sum, p, index) => sum + p * energies[index]!,
    0,
  );
  const merged = [
    probabilities[0]!,
    probabilities[1]!,
    probabilities[2]! + probabilities[3]!,
  ];
  const mergedEntropy = entropyNatural(merged);

  return (
    <VizFrame
      id="V10"
      title="Entropie de Gibbs"
      question="Que mesure l’entropie lorsque les états n’ont pas la même probabilité ?"
      caveat="S/kB est ici sans dimension. Le mode thermique suppose quatre niveaux non dégénérés, à l’équilibre canonique, avec kB = 1. Fusionner C et D change la résolution de l’observateur, pas nécessairement l’état physique."
      className={className}
      stats={
        <>
          <Metric label="S / kB" value={entropy.toFixed(3)} />
          <Metric label="Maximum ln 4" value={Math.log(4).toFixed(3)} />
          <Metric label="États effectifs eˢ" value={effective.toFixed(2)} />
          <Metric
            label="Énergie moyenne"
            value={meanEnergy.toFixed(2)}
            unit="ε"
          />
        </>
      }
      controls={
        <>
          <button
            type="button"
            aria-pressed={!thermal}
            onClick={() => setThermal(false)}
          >
            Distribution libre
          </button>
          <button
            type="button"
            aria-pressed={thermal}
            onClick={() => setThermal(true)}
          >
            Équilibre de Boltzmann
          </button>
          {thermal ? (
            <RangeControl
              label="Température kBT/ε"
              value={temperature}
              min={0.15}
              max={5}
              step={0.05}
              onChange={setTemperature}
            />
          ) : null}
          <button
            type="button"
            onClick={() => {
              setThermal(false);
              setManual([1, 0, 0, 0]);
            }}
          >
            État certain
          </button>
          <button
            type="button"
            onClick={() => {
              setThermal(false);
              setManual([0.25, 0.25, 0.25, 0.25]);
            }}
          >
            Équiprobable
          </button>
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <strong>Probabilités et surprise</strong>
          <div
            className="entropy-viz__bars"
            role="img"
            aria-label={probabilities
              .map(
                (p, i) =>
                  `${labels[i]} ${(100 * p).toFixed(1)} pour cent, surprise ${-Math.log(Math.max(p, 1e-12)).toFixed(2)}`,
              )
              .join(" ; ")}
          >
            {probabilities.map((probability, index) => (
              <label className="entropy-viz__bar-item" key={labels[index]}>
                <span>{(100 * probability).toFixed(1)} %</span>
                <span
                  className={`entropy-viz__bar entropy-viz__bar--${index + 1}`}
                  style={{ height: `${Math.max(1, probability * 100)}%` }}
                />
                <strong>{labels[index]}</strong>
                <span>E = {energies[index]} ε</span>
                {!thermal ? (
                  <input
                    aria-label={`Probabilité de l’état ${labels[index]}`}
                    type="range"
                    min={0.001}
                    max={0.997}
                    step={0.001}
                    value={probability}
                    onChange={(event) => {
                      // React libère `currentTarget` après le gestionnaire :
                      // capturer la valeur avant le callback différé du setter.
                      const nextProbability = Number(event.currentTarget.value);
                      setManual((values) =>
                        redistribute(values, index, nextProbability),
                      );
                    }}
                  />
                ) : null}
              </label>
            ))}
          </div>
        </div>
        <div className="entropy-viz__panel">
          <strong>Contribution de chaque état</strong>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th scope="col">État</th>
                <th scope="col">pi</th>
                <th scope="col">−ln pi</th>
                <th scope="col">−pi ln pi</th>
              </tr>
            </thead>
            <tbody>
              {probabilities.map((p, i) => (
                <tr key={labels[i]}>
                  <th scope="row">{labels[i]}</th>
                  <td>{p.toFixed(3)}</td>
                  <td>{p > 0 ? (-Math.log(p)).toFixed(3) : "∞"}</td>
                  <td>{p > 0 ? (-p * Math.log(p)).toFixed(3) : "0"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Après regroupement C+D :{" "}
            <strong>S/kB = {mergedEntropy.toFixed(3)}</strong> (
            {(entropy - mergedEntropy).toFixed(3)} d’information perdue).
          </p>
        </div>
      </div>
      <p className="entropy-viz__legend">
        S/kB = −Σ pi ln pi. Une température plus haute aplatit la distribution
        de Boltzmann ; les états accessibles deviennent plus nombreux au sens
        effectif.
      </p>
    </VizFrame>
  );
}

export default V10GibbsDistribution;
