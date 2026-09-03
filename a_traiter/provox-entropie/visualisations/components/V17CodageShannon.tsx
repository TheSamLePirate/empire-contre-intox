import { useEffect, useMemo, useState } from "react";
import { Metric, VizFrame } from "../shared/VizFrame";
import { shannonEntropy } from "../shared/math";
import type { VisualizationProps } from "../shared/types";

const symbols = ["A", "B", "C", "D"];
const accents = ["#58a6d9", "#6bc78c", "#ef7d57", "#b790df"];

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

type HuffmanNode = {
  key: string;
  probability: number;
  symbol?: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
  /** 0 pour une feuille, rang de fusion (1…n−1) pour un nœud interne. */
  step: number;
};

type MergeStep = {
  step: number;
  leftLabel: string;
  rightLabel: string;
  leftP: number;
  rightP: number;
  mergedP: number;
};

export function buildHuffman(probabilities: number[]) {
  type Work = { node: HuffmanNode; symbols: number[] };
  let pool: Work[] = probabilities.map((probability, index) => ({
    node: { key: `leaf-${index}`, probability, symbol: index, step: 0 },
    symbols: [index],
  }));
  const codes = probabilities.map(() => "");
  const steps: MergeStep[] = [];
  while (pool.length > 1) {
    pool = pool
      .slice()
      .sort(
        (a, b) =>
          a.node.probability - b.node.probability ||
          a.symbols[0]! - b.symbols[0]!,
      );
    const left = pool.shift()!;
    const right = pool.shift()!;
    const step = steps.length + 1;
    left.symbols.forEach((index) => {
      codes[index] = `0${codes[index]!}`;
    });
    right.symbols.forEach((index) => {
      codes[index] = `1${codes[index]!}`;
    });
    steps.push({
      step,
      leftLabel: left.symbols.map((index) => symbols[index]).join("+"),
      rightLabel: right.symbols.map((index) => symbols[index]).join("+"),
      leftP: left.node.probability,
      rightP: right.node.probability,
      mergedP: left.node.probability + right.node.probability,
    });
    pool.push({
      node: {
        key: `merge-${step}`,
        probability: left.node.probability + right.node.probability,
        left: left.node,
        right: right.node,
        step,
      },
      symbols: [...left.symbols, ...right.symbols],
    });
  }
  return { codes, root: pool[0]!.node, steps };
}

type PlacedNode = { node: HuffmanNode; x: number; y: number };
type PlacedEdge = {
  from: PlacedNode;
  to: PlacedNode;
  bit: "0" | "1";
  step: number;
};

const LEAF_W = 116;
const LEAF_H = 52;
const LEAF_GAP = 172;
const PAD_X = 96;
const ROW = 94;
const TOP = 52;

function layoutTree(root: HuffmanNode) {
  const leaves: HuffmanNode[] = [];
  (function collect(node: HuffmanNode) {
    if (node.symbol !== undefined) {
      leaves.push(node);
      return;
    }
    collect(node.left!);
    collect(node.right!);
  })(root);
  const heights = new Map<string, number>();
  (function measure(node: HuffmanNode): number {
    const height =
      node.symbol !== undefined
        ? 0
        : Math.max(measure(node.left!), measure(node.right!)) + 1;
    heights.set(node.key, height);
    return height;
  })(root);
  const maxHeight = heights.get(root.key)!;
  const leafY = TOP + maxHeight * ROW;
  const leafX = new Map<string, number>();
  leaves.forEach((leaf, index) => leafX.set(leaf.key, PAD_X + index * LEAF_GAP));
  const nodes: PlacedNode[] = [];
  const edges: PlacedEdge[] = [];
  (function place(node: HuffmanNode): PlacedNode {
    if (node.symbol !== undefined) {
      const placed = { node, x: leafX.get(node.key)!, y: leafY };
      nodes.push(placed);
      return placed;
    }
    const left = place(node.left!);
    const right = place(node.right!);
    const placed = {
      node,
      x: (left.x + right.x) / 2,
      y: TOP + (maxHeight - heights.get(node.key)!) * ROW,
    };
    nodes.push(placed);
    edges.push({ from: placed, to: left, bit: "0", step: node.step });
    edges.push({ from: placed, to: right, bit: "1", step: node.step });
    return placed;
  })(root);
  return {
    nodes,
    edges,
    width: PAD_X * 2 + LEAF_GAP * (leaves.length - 1),
    height: leafY + LEAF_H / 2 + 42,
  };
}

function edgePath(edge: PlacedEdge) {
  const fromY = edge.from.y + 24;
  const targetY =
    edge.to.node.symbol !== undefined ? edge.to.y - LEAF_H / 2 : edge.to.y - 24;
  const midY = (fromY + targetY) / 2;
  return `M ${edge.from.x} ${fromY} C ${edge.from.x} ${midY}, ${edge.to.x} ${midY}, ${edge.to.x} ${targetY}`;
}

export function V17CodageShannon({ className }: VisualizationProps) {
  const [probabilities, setProbabilities] = useState([0.25, 0.25, 0.25, 0.25]);
  const [message, setMessage] = useState("AABACADAAABA");
  const mergeCount = symbols.length - 1;
  const [buildStep, setBuildStep] = useState(mergeCount);
  const [playing, setPlaying] = useState(false);
  const [focusSymbol, setFocusSymbol] = useState<number | null>(null);

  const { codes, root, steps } = useMemo(
    () => buildHuffman(probabilities),
    [probabilities],
  );
  const layout = useMemo(() => layoutTree(root), [root]);
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

  const applyProbabilities = (next: number[]) => {
    setProbabilities(next);
    setPlaying(false);
    setBuildStep(mergeCount);
  };

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setBuildStep((step) => Math.min(mergeCount, step + 1)),
      1200,
    );
    return () => window.clearInterval(id);
  }, [playing, mergeCount]);
  useEffect(() => {
    if (buildStep >= mergeCount) setPlaying(false);
  }, [buildStep, mergeCount]);

  // Bits déjà attribués après `buildStep` fusions : les bits d'un code sont
  // posés par les fusions, donc on garde ceux dont le nœud parent existe déjà.
  const shownCodes = useMemo(
    () =>
      probabilities.map((_, index) => {
        let node = root;
        const bits: string[] = [];
        for (const bit of codes[index]!) {
          if (node.step <= buildStep) bits.push(bit);
          node = bit === "0" ? node.left! : node.right!;
        }
        return bits.join("");
      }),
    [probabilities, codes, root, buildStep],
  );

  // Nœuds traversés de la racine à la feuille sélectionnée.
  const focusPath = useMemo(() => {
    if (focusSymbol === null || buildStep < mergeCount) return null;
    const keys = new Set<string>();
    let node = root;
    keys.add(node.key);
    for (const bit of codes[focusSymbol]!) {
      node = bit === "0" ? node.left! : node.right!;
      keys.add(node.key);
    }
    return keys;
  }, [focusSymbol, buildStep, mergeCount, root, codes]);

  const treeComplete = buildStep >= mergeCount;
  const caption = (() => {
    if (focusPath && focusSymbol !== null) {
      const code = codes[focusSymbol]!;
      return `Code de ${symbols[focusSymbol]} — on descend de la racine : ${[...code].join(" · ")} → ${code} (${code.length} bit${code.length > 1 ? "s" : ""}).`;
    }
    if (buildStep === 0) {
      return "Départ — un nœud par symbole, aucun bit attribué. L’algorithme fusionne toujours les deux nœuds les plus faibles.";
    }
    const s = steps[buildStep - 1]!;
    const merge = `Étape ${s.step}/${steps.length} — fusion des deux plus faibles : ${s.leftLabel} (${s.leftP.toFixed(2)}) + ${s.rightLabel} (${s.rightP.toFixed(2)}) → ${s.mergedP.toFixed(2)}. La branche gauche reçoit 0, la droite 1.`;
    return treeComplete
      ? `${merge} L’arbre est complet : la racine porte 1.00 — survolez un symbole pour lire son code de la racine à la feuille.`
      : merge;
  })();

  const focusHandlers = (index: number) => ({
    onMouseEnter: () => setFocusSymbol(index),
    onMouseLeave: () => setFocusSymbol(null),
    onFocus: () => setFocusSymbol(index),
    onBlur: () => setFocusSymbol(null),
  });

  return (
    <VizFrame
      id="V17"
      title="Atelier de codage de Shannon"
      question="Pourquoi une source plus prévisible peut-elle être codée avec moins de bits en moyenne ?"
      caveat="Code de Huffman binaire, symbole par symbole. Le théorème de codage concerne des suites longues ; un codage par blocs peut s’approcher davantage de H. Plusieurs arbres optimaux existent (les égalités sont départagées par ordre alphabétique) : le code n’est pas unique, sa longueur moyenne minimale l’est. La redondance de correction d’erreur n’est pas simulée."
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
            onClick={() => applyProbabilities([0.25, 0.25, 0.25, 0.25])}
          >
            Équiprobable
          </button>
          <button
            type="button"
            onClick={() => applyProbabilities([0.7, 0.15, 0.1, 0.05])}
          >
            Source prévisible
          </button>
          <button
            type="button"
            onClick={() => applyProbabilities([0.5, 0.25, 0.125, 0.125])}
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
                  setPlaying(false);
                  setBuildStep(mergeCount);
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
                <tr
                  key={symbols[index]}
                  className={
                    focusSymbol === index ? "ev-huff-row--focus" : undefined
                  }
                  {...focusHandlers(index)}
                >
                  <th scope="row">
                    <span
                      className="ev-huff-swatch"
                      style={{ background: accents[index] }}
                      aria-hidden="true"
                    />
                    {symbols[index]}
                  </th>
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
      <div className="entropy-viz__panel ev-huff-panel">
        <strong>L’arbre de Huffman — comment le code est fabriqué</strong>
        <div
          className="ev-huff-toolbar"
          role="group"
          aria-label="Construction de l’arbre pas à pas"
        >
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setBuildStep(0);
            }}
          >
            ⟲ Départ
          </button>
          <button
            type="button"
            disabled={treeComplete}
            onClick={() => {
              setPlaying(false);
              setBuildStep((step) => Math.min(mergeCount, step + 1));
            }}
          >
            Étape suivante
          </button>
          <button
            type="button"
            aria-pressed={playing}
            onClick={() => {
              if (playing) {
                setPlaying(false);
              } else {
                setBuildStep(0);
                setPlaying(true);
              }
            }}
          >
            {playing ? "Ⅱ Pause" : "▶ Rejouer la construction"}
          </button>
        </div>
        <div className="ev-huff-scroll">
          <svg
            className="ev-huff"
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            role="img"
            aria-label={`Arbre binaire de Huffman pour la source ${symbols
              .map(
                (symbol, index) =>
                  `${symbol} (${probabilities[index]!.toFixed(2)}, code ${codes[index]})`,
              )
              .join(", ")}.`}
          >
            {layout.edges.map((edge) => {
              const visible = edge.step <= buildStep;
              const onPath =
                focusPath !== null &&
                focusPath.has(edge.from.node.key) &&
                focusPath.has(edge.to.node.key);
              const dim = focusPath !== null && !onPath;
              const midX = (edge.from.x + edge.to.x) / 2;
              const midY = (edge.from.y + edge.to.y) / 2 + 2;
              return (
                <g
                  key={`${edge.from.node.key}-${edge.to.node.key}`}
                  className={`ev-huff__edge${visible ? "" : " is-hidden"}${onPath ? " is-on" : ""}${dim ? " is-dim" : ""}`}
                >
                  <path d={edgePath(edge)} />
                  <g className="ev-huff__bit">
                    <circle cx={midX} cy={midY} r={11} />
                    <text x={midX} y={midY + 4}>
                      {edge.bit}
                    </text>
                  </g>
                </g>
              );
            })}
            {layout.nodes.map((placed) => {
              const { node } = placed;
              const onPath = focusPath?.has(node.key) ?? false;
              const dim = focusPath !== null && !onPath;
              if (node.symbol === undefined) {
                const visible = node.step <= buildStep;
                const isRoot = node.step === mergeCount;
                return (
                  <g
                    key={node.key}
                    className={`ev-huff__node ev-huff__inner${visible ? "" : " is-hidden"}${onPath ? " is-on" : ""}${dim ? " is-dim" : ""}`}
                    style={{
                      transform: `translate(${placed.x}px, ${placed.y}px)`,
                    }}
                  >
                    {isRoot ? (
                      <text className="ev-huff__rootlabel" y={-34}>
                        racine
                      </text>
                    ) : null}
                    <circle r={24} />
                    <text y={5}>{node.probability.toFixed(2)}</text>
                    <g className="ev-huff__order">
                      <circle cx={22} cy={-20} r={8.5} />
                      <text x={22} y={-16.6}>
                        {node.step}
                      </text>
                    </g>
                  </g>
                );
              }
              const index = node.symbol;
              const shown = shownCodes[index]!;
              return (
                <g
                  key={node.key}
                  className={`ev-huff__node ev-huff__leaf${onPath ? " is-on" : ""}${dim ? " is-dim" : ""}`}
                  style={{
                    transform: `translate(${placed.x}px, ${placed.y}px)`,
                    // Couleur du symbole, reprise par le CSS de la feuille.
                    ["--leaf" as string]: accents[index],
                  }}
                  tabIndex={0}
                  role="img"
                  aria-label={`Feuille ${symbols[index]}, probabilité ${probabilities[index]!.toFixed(3)}, code ${codes[index]}`}
                  {...focusHandlers(index)}
                >
                  <rect
                    x={-LEAF_W / 2}
                    y={-LEAF_H / 2}
                    width={LEAF_W}
                    height={LEAF_H}
                    rx={6}
                  />
                  <text className="ev-huff__leafsym" x={-LEAF_W / 2 + 20} y={7}>
                    {symbols[index]}
                  </text>
                  <text className="ev-huff__leafp" x={10} y={6}>
                    {probabilities[index]!.toFixed(3)}
                  </text>
                  <text className="ev-huff__leafcode" y={LEAF_H / 2 + 22}>
                    {shown === "" ? "· · ·" : shown}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="ev-huff-caption" aria-live="polite">
          {caption}
        </p>
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
            <code>
              {cleanMessage
                ? [...cleanMessage].map((symbol, position) => {
                    const index = symbols.indexOf(symbol);
                    return (
                      <span
                        key={`${position}-${symbol}`}
                        className="ev-huff-sym"
                        style={{ color: accents[index] }}
                        {...focusHandlers(index)}
                      >
                        {symbol}
                      </span>
                    );
                  })
                : "—"}
            </code>
          </dd>
          <dt>Flux Huffman</dt>
          <dd>
            <code style={{ overflowWrap: "anywhere" }}>
              {encoded
                ? [...cleanMessage].map((symbol, position) => {
                    const index = symbols.indexOf(symbol);
                    return (
                      <span
                        key={`${position}-${symbol}`}
                        className={`ev-huff-sym${focusSymbol === index ? " is-on" : ""}`}
                        style={{ color: accents[index] }}
                        {...focusHandlers(index)}
                      >
                        {codes[index]}
                      </span>
                    );
                  })
                : "—"}
            </code>
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
