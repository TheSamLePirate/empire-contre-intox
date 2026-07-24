import { useMemo, useState } from "react";
import { Metric, RangeControl, VizFrame } from "../shared/VizFrame";
import {
  binaryEntropy,
  formatNumber,
  logChoose,
  mulberry32,
  shannonEntropy,
} from "../shared/math";
type VisualizationProps = { className?: string; seed?: number };
type Pattern = "rangée" | "amas" | "bandes" | "pavés 1001" | "mélange";
const SIZE = 100,
  W = 10;
const PATTERNS: Pattern[] = [
  "rangée",
  "amas",
  "bandes",
  "pavés 1001",
  "mélange",
];
export function configuration(n: number, pattern: Pattern, seed: number) {
  const order = Array.from({ length: SIZE }, (_, i) => i);
  if (pattern === "amas")
    order.sort(
      (a, b) =>
        ((a % W) - 4.5) ** 2 +
        (Math.floor(a / W) - 4.5) ** 2 -
        (((b % W) - 4.5) ** 2 + (Math.floor(b / W) - 4.5) ** 2),
    );
  if (pattern === "bandes")
    order.sort((a, b) => ((a % W) % 2) - ((b % W) % 2) || a - b);
  if (pattern === "pavés 1001")
    order.sort((a, b) => {
      const aDiagonal = Number((a % W) % 2 !== Math.floor(a / W) % 2);
      const bDiagonal = Number((b % W) % 2 !== Math.floor(b / W) % 2);
      return aDiagonal - bDiagonal || a - b;
    });
  if (pattern === "mélange") {
    const rng = mulberry32(seed);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [order[i], order[j]] = [order[j]!, order[i]!];
    }
  }
  const cells = Array(SIZE).fill(false) as boolean[];
  order.slice(0, n).forEach((i) => (cells[i] = true));
  return cells;
}
function blocks(cells: boolean[]) {
  const counts = Array(16).fill(0) as number[];
  for (let y = 0; y < 9; y++)
    for (let x = 0; x < 9; x++) {
      const i = y * W + x,
        code =
          (Number(cells[i]) << 3) |
          (Number(cells[i + 1]) << 2) |
          (Number(cells[i + W]) << 1) |
          Number(cells[i + W + 1]);
      counts[code] = (counts[code] ?? 0) + 1;
    }
  return { counts, h: shannonEntropy(counts.map((v) => v / 81)) };
}

function PatternHistogram({
  counts,
  label,
}: {
  counts: number[];
  label: string;
}) {
  const ceiling = Math.max(...counts, 1);
  const densityColors = [
    "var(--ev-muted)",
    "var(--ev-cold)",
    "var(--ev-gold)",
    "var(--ev-hot)",
    "var(--ev-text)",
  ];
  return (
    <div className="entropy-viz__pattern-histogram" role="img" aria-label={label}>
      {counts.map((value, index) => {
        const code = index.toString(2).padStart(4, "0");
        const bits = [...code].map(Number);
        const density = bits.reduce((sum, bit) => sum + bit, 0);
        return (
          <div
            className="entropy-viz__pattern-bin"
            key={code}
            title={`Motif ${code} : ${value} occurrence${value > 1 ? "s" : ""}`}
          >
            <strong>{value}</strong>
            <span className="entropy-viz__pattern-track" aria-hidden="true">
              <i
                style={{
                  height: `${Math.max(2, (value / ceiling) * 100)}%`,
                  background: densityColors[density],
                }}
              />
            </span>
            <span className="entropy-viz__pattern-code">
              <i className="entropy-viz__pattern-glyph" aria-hidden="true">
                {bits.map((bit, bitIndex) => (
                  <b className={bit ? "is-on" : ""} key={bitIndex} />
                ))}
              </i>
              <code>{code}</code>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MiniGrid({
  cells,
  label,
  selected,
  onSelect,
}: {
  cells: boolean[];
  label: string;
  selected?: number | undefined;
  onSelect?: ((i: number) => void) | undefined;
}) {
  return (
    <div className="entropy-viz__configuration-grid-shell">
      <div
        className="entropy-viz__configuration-grid"
        role="grid"
        aria-label={label}
        aria-rowcount={W}
        aria-colcount={W}
      >
        {cells.map((on, i) => (
          <button
            type="button"
            role="gridcell"
            aria-label={`Ligne ${Math.floor(i / W) + 1}, colonne ${(i % W) + 1}, ${on ? "occupée" : "vide"}`}
            aria-pressed={on}
            key={i}
            onClick={() => onSelect?.(i)}
            style={{
              border:
                selected === i
                  ? "3px solid var(--ev-gold)"
                  : "1px solid var(--ev-line)",
              borderRadius: "22%",
              background: on ? "var(--ev-text)" : "var(--ev-bg)",
              boxShadow: on ? "inset 0 0 0 2px var(--ev-muted)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
export function V07GrilleConfigurations({
  className = "",
  seed = 707,
}: VisualizationProps) {
  const [count, setCount] = useState(50),
    [patternA, setPatternA] = useState<Pattern>("rangée"),
    [patternB, setPatternB] = useState<Pattern>("mélange"),
    [draw, setDraw] = useState(0),
    [manual, setManual] = useState<boolean[] | null>(null),
    [selected, setSelected] = useState<number>();
  const a = useMemo(
      () => manual ?? configuration(count, patternA, seed),
      [manual, count, patternA, seed],
    ),
    b = useMemo(
      () => configuration(count, patternB, seed + draw),
      [count, patternB, seed, draw],
    ),
    ab = blocks(a),
    bb = blocks(b),
    p = count / SIZE,
    hBinary = binaryEntropy(p),
    global = logChoose(SIZE, count) / Math.log(2),
    choose = (i: number) => {
      if (selected === undefined) {
        setSelected(i);
        return;
      }
      const next = [...a];
      if (next[selected] !== next[i]) {
        [next[selected], next[i]] = [next[i]!, next[selected]!];
        setManual(next);
      }
      setSelected(undefined);
    };
  const changeCount = (v: number) => {
    setCount(v);
    setManual(null);
    setSelected(undefined);
  };
  const setA = (p: Pattern) => {
    if (p === "pavés 1001") setCount(50);
    setPatternA(p);
    setManual(null);
    setSelected(undefined);
  };
  return (
    <VizFrame
      id="V7"
      title="Grille de configurations"
      question="Même composition, même “désordre” — ou pas ?"
      caveat="Ces cases sont des variables binaires abstraites. H₂×₂ dépend du découpage, des fenêtres qui se chevauchent et de l’échelle choisie ; ce n’est pas automatiquement une entropie thermodynamique."
      className={className}
      stats={
        <>
          <Metric
            label="Composition"
            value={`${count} pleines · ${100 - count} vides`}
          />
          <Metric
            label="H d’une case"
            value={formatNumber(hBinary, 3)}
            unit="bit/case"
          />
          <Metric
            label="log₂ Ω global"
            value={formatNumber(global, 1)}
            unit="bits"
          />
        </>
      }
      controls={
        <>
          <RangeControl
            label="Cases occupées"
            value={count}
            min={0}
            max={100}
            step={1}
            onChange={changeCount}
          />
          <label>
            Organisation A{" "}
            <select
              value={patternA}
              onChange={(e) => setA(e.currentTarget.value as Pattern)}
            >
              {PATTERNS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label>
            Organisation B{" "}
            <select
              value={patternB}
              onChange={(e) => {
                const pattern = e.currentTarget.value as Pattern;
                if (pattern === "pavés 1001") {
                  setCount(50);
                  setManual(null);
                  setSelected(undefined);
                }
                setPatternB(pattern);
              }}
            >
              {PATTERNS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              setDraw((v) => v + 1);
              setPatternB("mélange");
            }}
          >
            Nouveau mélange B
          </button>
          <button
            type="button"
            onClick={() => {
              setManual(null);
              setSelected(undefined);
            }}
          >
            Annuler les échanges A
          </button>
        </>
      }
    >
      <div className="entropy-viz__configuration-layout">
        <div className="entropy-viz__panel entropy-viz__configuration-panel">
          <h4>A — {manual ? "organisation manuelle" : patternA}</h4>
          <MiniGrid
            cells={a}
            label={`Grille A, organisation ${manual ? "manuelle" : patternA}`}
            selected={selected}
            onSelect={choose}
          />
          <p aria-live="polite">
            {selected === undefined
              ? "Sélectionnez deux cases de couleurs différentes pour les permuter."
              : `Case ${selected + 1} sélectionnée ; choisissez sa destination.`}
          </p>
          <p>
            Entropie des motifs 2×2 :{" "}
            <strong>{formatNumber(ab.h, 3)} bits</strong>
          </p>
        </div>
        <div className="entropy-viz__panel entropy-viz__configuration-panel">
          <h4>B — {patternB}</h4>
          <MiniGrid cells={b} label={`Grille B, organisation ${patternB}`} />
          <p>Même nombre de cases occupées, autre arrangement spatial.</p>
          <p>
            Entropie des motifs 2×2 :{" "}
            <strong>{formatNumber(bb.h, 3)} bits</strong>
          </p>
        </div>
        <div className="entropy-viz__panel entropy-viz__pattern-panel">
          <h4>Motifs locaux de A</h4>
          <PatternHistogram
            counts={ab.counts}
            label="Histogramme des seize motifs locaux 2 par 2 de la grille A"
          />
          <p>
            La miniature montre directement le carré 2×2. Son code se lit de
            gauche à droite, puis de haut en bas.
          </p>
          {patternA === "pavés 1001" && !manual ? (
            <p className="entropy-viz__legend">
              Chaque pavé non chevauchant vaut <strong>1001</strong>. Les
              fenêtres décalées d’une case valent <strong>0110</strong>.
            </p>
          ) : null}
        </div>
        <div className="entropy-viz__panel entropy-viz__pattern-panel">
          <h4>Motifs locaux de B</h4>
          <PatternHistogram
            counts={bb.counts}
            label="Histogramme des seize motifs locaux 2 par 2 de la grille B"
          />
          <p>
            <strong>Invariant global :</strong> H d’une case et log₂ C(100,n).{" "}
            <strong>Variable locale :</strong> fréquence des motifs 2×2.
          </p>
          {patternB === "pavés 1001" ? (
            <p className="entropy-viz__legend">
              Chaque pavé non chevauchant vaut <strong>1001</strong>. Les
              fenêtres décalées d’une case valent <strong>0110</strong>.
            </p>
          ) : null}
        </div>
      </div>
    </VizFrame>
  );
}
export default V07GrilleConfigurations;
