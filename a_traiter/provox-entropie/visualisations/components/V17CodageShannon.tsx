import { useMemo, useState } from "react";
import { Metric, VizFrame } from "../shared/VizFrame";
import { shannonEntropy } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

const symbols = ["A", "B", "C", "D"];

export function redistribute(
  probabilities: number[],
  changed: number,
  next: number,
) {
  const minimum = 0.01;
  const maximum = 1 - minimum * (probabilities.length - 1);
  const p = Number.isFinite(next)
    ? Math.max(minimum, Math.min(maximum, next))
    : (probabilities[changed] ?? 1 / probabilities.length);
  const distributableTotal = probabilities.reduce(
    (sum, value, index) =>
      sum + (index === changed ? 0 : Math.max(0, value - minimum)),
    0,
  );
  const remaining = 1 - p;
  const otherCount = Math.max(1, probabilities.length - 1);
  const freeMass = Math.max(0, remaining - minimum * otherCount);
  return probabilities.map((value, index) => {
    if (index === changed) return p;
    return (
      minimum +
      (distributableTotal > Number.EPSILON
        ? (Math.max(0, value - minimum) * freeMass) / distributableTotal
        : freeMass / otherCount)
    );
  });
}

function huffman(probabilities: number[]) {
  type Node = { probability: number; symbols: number[] };
  let nodes: Node[] = probabilities.map((probability, index) => ({
    probability,
    symbols: [index],
  }));
  const codes = probabilities.map(() => "");
  while (nodes.length > 1) {
    nodes = nodes
      .slice()
      .sort(
        (a, b) =>
          a.probability - b.probability || a.symbols[0]! - b.symbols[0]!,
      );
    const left = nodes.shift()!;
    const right = nodes.shift()!;
    left.symbols.forEach((index) => {
      codes[index] = `0${codes[index]!}`;
    });
    right.symbols.forEach((index) => {
      codes[index] = `1${codes[index]!}`;
    });
    nodes.push({
      probability: left.probability + right.probability,
      symbols: [...left.symbols, ...right.symbols],
    });
  }
  return codes;
}

export function V17CodageShannon({ className }: VisualizationProps) {
  const [probabilities, setProbabilities] = useState([0.25, 0.25, 0.25, 0.25]);
  const [message, setMessage] = useState("AABACADAAABA");
  const codes = useMemo(() => huffman(probabilities), [probabilities]);
  const entropy = shannonEntropy(probabilities);
  const averageLength = probabilities.reduce(
    (sum, p, index) => sum + p * codes[index]!.length,
    0,
  );
  const cleanMessage = message
    .toUpperCase()
    .replace(/[^ABCD]/g, "")
    .slice(0, 32);
  const encoded = [...cleanMessage]
    .map((symbol) => codes[symbols.indexOf(symbol)] ?? "")
    .join("");
  const fixedLength = cleanMessage.length * 2;
  const saved = fixedLength - encoded.length;
  return (
    <VizFrame
      id="V17"
      title="Atelier de codage de Shannon"
      question="Pourquoi une source plus prévisible peut-elle être codée avec moins de bits en moyenne ?"
      caveat="Code de Huffman binaire, symbole par symbole. Le théorème de codage concerne des suites longues ; un codage par blocs peut s’approcher davantage de H. La redondance de correction d’erreur n’est pas simulée."
      className={className}
      stats={
        <>
          <Metric
            label="Entropie H"
            value={entropy.toFixed(3)}
            unit="bit/symbole"
          />
          <Metric
            label="Longueur moyenne L"
            value={averageLength.toFixed(3)}
            unit="bit/symbole"
          />
          <Metric
            label="Efficacité H/L"
            value={`${((100 * entropy) / averageLength).toFixed(1)} %`}
          />
          <Metric label="Message codé" value={encoded.length} unit="bits" />
        </>
      }
      controls={
        <>
          <button
            type="button"
            onClick={() => setProbabilities([0.25, 0.25, 0.25, 0.25])}
          >
            Équiprobable
          </button>
          <button
            type="button"
            onClick={() => setProbabilities([0.7, 0.15, 0.1, 0.05])}
          >
            Source prévisible
          </button>
          <button
            type="button"
            onClick={() => setProbabilities([0.5, 0.25, 0.125, 0.125])}
          >
            Probabilités dyadiques
          </button>
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <strong>Modèle de la source</strong>
          {probabilities.map((probability, index) => (
            <label className="entropy-viz__range" key={symbols[index]}>
              <span>
                Symbole {symbols[index]}{" "}
                <strong>{(100 * probability).toFixed(1)} %</strong>
              </span>
              <input
                type="range"
                min={0.01}
                max={0.97}
                step={0.01}
                value={probability}
                onChange={(event) => {
                  // Lire la valeur pendant l’événement : `currentTarget` n’est
                  // plus garanti dans le callback différé du setter React.
                  const nextProbability = Number(event.currentTarget.value);
                  setProbabilities((values) =>
                    redistribute(values, index, nextProbability),
                  );
                }}
              />
            </label>
          ))}
        </div>
        <div className="entropy-viz__panel">
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            aria-label="Code de Huffman calculé"
          >
            <caption>Code préfixe instantané</caption>
            <thead>
              <tr>
                <th scope="col">Symbole</th>
                <th scope="col">pi</th>
                <th scope="col">−log₂ pi</th>
                <th scope="col">Code Huffman</th>
              </tr>
            </thead>
            <tbody>
              {probabilities.map((probability, index) => (
                <tr key={symbols[index]}>
                  <th scope="row">{symbols[index]}</th>
                  <td>{probability.toFixed(3)}</td>
                  <td>{(-Math.log2(probability)).toFixed(2)}</td>
                  <td>
                    <code>{codes[index]}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="entropy-viz__panel">
        <label className="entropy-viz__range" htmlFor="v17-message">
          <span>Message à coder · alphabet A–D, 32 symboles maximum</span>
          <input
            id="v17-message"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
        </label>
        <dl>
          <dt>Message retenu</dt>
          <dd>
            <code>{cleanMessage || "—"}</code>
          </dd>
          <dt>Flux Huffman</dt>
          <dd>
            <code style={{ overflowWrap: "anywhere" }}>{encoded || "—"}</code>
          </dd>
          <dt>Code fixe (2 bits/symbole)</dt>
          <dd>{fixedLength} bits</dd>
          <dt>Écart sur ce message</dt>
          <dd>
            {saved >= 0
              ? `${saved} bit${saved > 1 ? "s" : ""} économisé${saved > 1 ? "s" : ""}`
              : `${-saved} bit${saved < -1 ? "s" : ""} supplémentaire${saved < -1 ? "s" : ""}`}
          </dd>
        </dl>
      </div>
      <p className="entropy-viz__legend">
        H = −Σ pi log₂ pi. Pour ce code préfixe symbole par symbole : H ≤ L &lt;
        H + 1, soit {entropy.toFixed(3)} ≤ {averageLength.toFixed(3)} &lt;{" "}
        {(entropy + 1).toFixed(3)}. Le gain d’un message court peut s’écarter de
        la moyenne ; il converge sur des séquences typiques longues.
      </p>
    </VizFrame>
  );
}

export default V17CodageShannon;
