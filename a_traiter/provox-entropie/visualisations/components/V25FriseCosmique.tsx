import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
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

type CosmicPoint = {
  x: number;
  y: number;
  size: number;
  phase: number;
  drift: number;
};

function randomUnit(index: number, seed: number) {
  const value = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

export function createCosmicField(count: number, seed: number): CosmicPoint[] {
  return Array.from({ length: count }, (_, index) => ({
    x: randomUnit(index * 5 + 1, seed),
    y: randomUnit(index * 5 + 2, seed),
    size: 0.45 + randomUnit(index * 5 + 3, seed) * 1.9,
    phase: randomUnit(index * 5 + 4, seed) * Math.PI * 2,
    drift: 0.35 + randomUnit(index * 5 + 5, seed) * 1.4,
  }));
}

export const COSMIC_EXPANSION = [0.72, 0.88, 1, 1.2, 1.52] as const;
const COSMIC_FIELD = createCosmicField(650, 25);
const COSMIC_NODES = createCosmicField(64, 251);
const STAGE_GLOWS = [
  [178, 77, 42, 0.48],
  [37, 57, 102, 0.34],
  [25, 37, 78, 0.28],
  [13, 22, 45, 0.34],
  [8, 13, 30, 0.22],
] as const;

export function cosmicExpandedPosition(
  point: Pick<CosmicPoint, "x" | "y">,
  width: number,
  height: number,
  expansion: number,
) {
  return {
    x: width / 2 + (point.x - 0.5) * width * expansion,
    y: height / 2 + (point.y - 0.5) * height * expansion,
  };
}

function drawExpandingGrid(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  expansion: number,
  alpha: number,
  color: string,
) {
  const span = Math.max(width, height);
  context.save();
  context.globalCompositeOperation = "lighter";
  context.strokeStyle = color;
  context.lineWidth = 0.7;
  for (let ring = 1; ring <= 8; ring += 1) {
    const pulse = 1 + Math.sin(time * 0.32 + ring) * 0.012;
    const radius = ring * span * 0.075 * expansion * pulse;
    context.globalAlpha = alpha * (0.18 - ring * 0.012);
    context.beginPath();
    context.ellipse(
      width / 2,
      height / 2,
      radius,
      radius * 0.58,
      0,
      0,
      Math.PI * 2,
    );
    context.stroke();
  }
  for (let spoke = 0; spoke < 18; spoke += 1) {
    const angle = (spoke / 18) * Math.PI * 2 + time * 0.004;
    context.globalAlpha = alpha * 0.08;
    context.beginPath();
    context.moveTo(width / 2, height / 2);
    context.lineTo(
      width / 2 + Math.cos(angle) * span * expansion,
      height / 2 + Math.sin(angle) * span * expansion * 0.58,
    );
    context.stroke();
  }
  context.restore();
}

function drawNebula(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
  color: string,
) {
  const cloud = context.createRadialGradient(x, y, 0, x, y, radius);
  cloud.addColorStop(0, color);
  cloud.addColorStop(0.28, `rgba(116,83,189,${alpha * 0.38})`);
  cloud.addColorStop(0.68, `rgba(44,83,137,${alpha * 0.12})`);
  cloud.addColorStop(1, "rgba(0,0,0,0)");
  context.save();
  context.globalCompositeOperation = "lighter";
  context.globalAlpha = alpha;
  context.fillStyle = cloud;
  context.beginPath();
  context.ellipse(x, y, radius, radius * 0.48, -0.35, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function drawGalaxy(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number,
  alpha: number,
  color: string,
) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.globalCompositeOperation = "lighter";
  for (let arm = 0; arm < 3; arm += 1) {
    for (let index = 0; index < 30; index += 1) {
      const progress = index / 29;
      const angle = arm * ((Math.PI * 2) / 3) + progress * 5.4;
      const distance = 3 + progress * radius;
      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance * 0.42;
      context.globalAlpha = alpha * (1 - progress * 0.62);
      context.fillStyle = color;
      context.beginPath();
      context.arc(px, py, Math.max(0.55, 1.7 - progress), 0, Math.PI * 2);
      context.fill();
    }
  }
  const glow = context.createRadialGradient(0, 0, 0, 0, 0, radius * 0.48);
  glow.addColorStop(0, `rgba(255,246,214,${alpha})`);
  glow.addColorStop(0.22, `rgba(214,172,85,${alpha * 0.64})`);
  glow.addColorStop(1, "rgba(214,172,85,0)");
  context.globalAlpha = 1;
  context.fillStyle = glow;
  context.beginPath();
  context.arc(0, 0, radius * 0.48, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function drawBlackHole(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number,
  alpha: number,
) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.globalAlpha = alpha;
  context.globalCompositeOperation = "lighter";
  const disk = context.createRadialGradient(0, 0, radius, 0, 0, radius * 2.9);
  disk.addColorStop(0, "rgba(255,255,255,0)");
  disk.addColorStop(0.34, "rgba(255,201,111,0.95)");
  disk.addColorStop(0.48, "rgba(229,92,47,0.72)");
  disk.addColorStop(0.72, "rgba(116,83,189,0.24)");
  disk.addColorStop(1, "rgba(0,0,0,0)");
  context.scale(1, 0.34);
  context.fillStyle = disk;
  context.beginPath();
  context.arc(0, 0, radius * 3, 0, Math.PI * 2);
  context.fill();
  context.restore();

  context.save();
  context.globalAlpha = alpha;
  const shadow = context.createRadialGradient(x, y, 0, x, y, radius * 1.2);
  shadow.addColorStop(0, "#000");
  shadow.addColorStop(0.72, "#000");
  shadow.addColorStop(0.86, "rgba(0,0,0,.92)");
  shadow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = shadow;
  context.beginPath();
  context.arc(x, y, radius * 1.25, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(255,236,194,.72)";
  context.lineWidth = Math.max(1, radius * 0.08);
  context.beginPath();
  context.arc(x, y, radius * 1.16, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

function drawCosmicWeb(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  expansion: number,
  alpha: number,
  color: string,
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  context.strokeStyle = color;
  context.lineWidth = 0.7;
  for (let first = 0; first < COSMIC_NODES.length; first += 1) {
    const a = COSMIC_NODES[first]!;
    const aPosition = cosmicExpandedPosition(a, width, height, expansion);
    const ax = aPosition.x + Math.sin(time * 0.08 + a.phase) * 3;
    const ay = aPosition.y + Math.cos(time * 0.07 + a.phase) * 2;
    for (let second = first + 1; second < COSMIC_NODES.length; second += 1) {
      const b = COSMIC_NODES[second]!;
      const normalizedDistance = Math.hypot(a.x - b.x, a.y - b.y);
      if (normalizedDistance > 0.16) continue;
      const bPosition = cosmicExpandedPosition(b, width, height, expansion);
      const bx = bPosition.x;
      const by = bPosition.y;
      context.globalAlpha =
        alpha * Math.max(0.06, 1 - normalizedDistance / 0.16);
      context.beginPath();
      context.moveTo(ax, ay);
      context.lineTo(bx, by);
      context.stroke();
    }
  }
  context.restore();
}

function drawCosmicStage(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  stage: number,
  time: number,
  expansion: number,
  alpha: number,
  colors: { cold: string; gold: string; hot: string; info: string },
) {
  context.save();
  context.globalAlpha = alpha;
  drawExpandingGrid(
    context,
    width,
    height,
    time,
    expansion,
    alpha * (stage === 0 ? 0.9 : 0.5),
    stage < 2 ? colors.hot : colors.info,
  );
  if (stage === 0) {
    context.globalCompositeOperation = "lighter";
    for (let ring = 0; ring < 5; ring += 1) {
      const radius =
        ((time * 24 + ring * 92) %
          (Math.max(width, height) * 0.72)) *
        expansion;
      context.strokeStyle = ring % 2 ? colors.hot : colors.cold;
      context.globalAlpha = alpha * (0.22 - radius / Math.max(width, height) * 0.16);
      context.lineWidth = 1.4;
      context.beginPath();
      context.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      context.stroke();
    }
    for (const point of COSMIC_FIELD) {
      const angle = point.phase + time * 0.025 * point.drift;
      const distance =
        (0.04 + point.x * 0.7) *
        Math.min(width, height) *
        expansion;
      const px = width / 2 + Math.cos(angle) * distance;
      const py = height / 2 + Math.sin(angle) * distance * 0.62;
      context.globalAlpha = alpha * (0.25 + point.y * 0.62);
      context.fillStyle = point.x > 0.52 ? colors.hot : colors.cold;
      context.beginPath();
      context.arc(px, py, point.size * 1.3, 0, Math.PI * 2);
      context.fill();
    }
  } else {
    const webAlpha = stage === 1 ? 0.54 : stage === 2 ? 0.66 : stage === 3 ? 0.24 : 0.05;
    drawCosmicWeb(
      context,
      width,
      height,
      time,
      expansion,
      alpha * webAlpha,
      colors.info,
    );
    const nebulaCount = stage === 1 ? 6 : stage === 2 ? 9 : stage === 3 ? 3 : 1;
    for (let index = 0; index < nebulaCount; index += 1) {
      const point = COSMIC_NODES[45 + index]!;
      const position = cosmicExpandedPosition(point, width, height, expansion);
      drawNebula(
        context,
        position.x,
        position.y,
        48 + point.size * 28,
        alpha * (stage === 4 ? 0.08 : 0.16 + point.y * 0.08),
        index % 2 ? "rgba(46,121,165,.58)" : "rgba(202,92,118,.48)",
      );
    }
    const starCount = stage === 1 ? 160 : stage === 2 ? 300 : stage === 3 ? 120 : 45;
    for (let index = 0; index < starCount; index += 1) {
      const point = COSMIC_FIELD[index]!;
      const twinkle = 0.55 + Math.sin(time * point.drift + point.phase) * 0.32;
      const position = cosmicExpandedPosition(point, width, height, expansion);
      const drift = stage === 4 ? 2.8 : 0.9;
      context.globalAlpha = alpha * Math.max(0.12, twinkle);
      context.fillStyle =
        stage === 3 && index % 3 ? "rgba(184,202,226,.72)" : colors.gold;
      context.beginPath();
      context.arc(
        position.x + Math.sin(time * 0.12 + point.phase) * drift,
        position.y + Math.cos(time * 0.1 + point.phase) * drift,
        point.size * (stage === 3 ? 0.72 : 1),
        0,
        Math.PI * 2,
      );
      context.fill();
    }
    const galaxyCount = stage === 1 ? 7 : stage === 2 ? 14 : stage === 3 ? 5 : 0;
    for (let index = 0; index < galaxyCount; index += 1) {
      const point = COSMIC_NODES[index * 3 + 2]!;
      const position = cosmicExpandedPosition(point, width, height, expansion);
      drawGalaxy(
        context,
        position.x,
        position.y,
        11 + point.size * 7,
        point.phase + time * 0.035,
        alpha * (0.55 + point.y * 0.35),
        index % 2 ? colors.cold : colors.gold,
      );
    }
    const holeCount = stage === 1 ? 2 : stage === 2 ? 5 : stage === 3 ? 7 : 2;
    for (let index = 0; index < holeCount; index += 1) {
      const point = COSMIC_NODES[30 + index]!;
      const position = cosmicExpandedPosition(point, width, height, expansion);
      const radius =
        stage === 3 ? 11 + point.size * 7 : stage === 4 ? 7 : 7 + point.size * 4;
      drawBlackHole(
        context,
        position.x,
        position.y,
        radius,
        point.phase + time * 0.08,
        alpha * (stage === 4 ? Math.max(0.08, 0.5 + Math.sin(time) * 0.18) : 0.88),
      );
    }
    if (stage === 4) {
      context.globalCompositeOperation = "lighter";
      for (let index = 0; index < 220; index += 1) {
        const point = COSMIC_FIELD[index]!;
        const progress = (point.x + time * 0.018 * point.drift) % 1;
        const angle = point.phase;
        const distance = progress * Math.max(width, height) * 0.72;
        context.globalAlpha = alpha * (1 - progress) * 0.64;
        context.fillStyle = index % 2 ? colors.cold : colors.info;
        context.beginPath();
        context.arc(
          width * 0.58 + Math.cos(angle) * distance,
          height * 0.48 + Math.sin(angle) * distance * 0.58,
          Math.max(0.4, point.size * 0.62),
          0,
          Math.PI * 2,
        );
        context.fill();
      }
    }
  }
  context.restore();
}

function drawWarpTransition(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  expansion: number,
  color: string,
) {
  const intensity = Math.sin(progress * Math.PI);
  if (intensity <= 0.001) return;
  context.save();
  context.globalCompositeOperation = "lighter";
  context.strokeStyle = color;
  context.lineWidth = 0.75 + intensity * 1.5;
  for (let index = 0; index < 120; index += 1) {
    const point = COSMIC_FIELD[index]!;
    const position = cosmicExpandedPosition(point, width, height, expansion);
    const dx = position.x - width / 2;
    const dy = position.y - height / 2;
    const length = (8 + point.size * 13) * intensity;
    const magnitude = Math.max(1, Math.hypot(dx, dy));
    context.globalAlpha = intensity * (0.05 + point.y * 0.2);
    context.beginPath();
    context.moveTo(position.x, position.y);
    context.lineTo(
      position.x + (dx / magnitude) * length,
      position.y + (dy / magnitude) * length,
    );
    context.stroke();
  }
  context.restore();
}

function CosmicUniverseCanvas({
  selected,
  era,
  dominant,
}: {
  selected: number;
  era: Era;
  dominant: { value: Estimate; index: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousStage = useRef(selected);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const styles = getComputedStyle(canvas);
    const colors = {
      cold: styles.getPropertyValue("--ev-cold").trim() || "#58a6d9",
      gold: styles.getPropertyValue("--ev-gold-bright").trim() || "#e7c778",
      hot: styles.getPropertyValue("--ev-hot").trim() || "#db684a",
      info: styles.getPropertyValue("--ev-info").trim() || "#917ed1",
    };
    const fromStage = previousStage.current;
    previousStage.current = selected;
    const transitionStart = performance.now();
    let width = 1;
    let height = 1;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now: number) => {
      const time = reducedMotion ? selected * 1.7 : now / 1000;
      context.clearRect(0, 0, width, height);
      const rawTransition = reducedMotion
        ? 1
        : Math.min(1, (now - transitionStart) / 1300);
      const transition =
        rawTransition * rawTransition * (3 - 2 * rawTransition);
      const fromExpansion = COSMIC_EXPANSION[fromStage] ?? 1;
      const targetExpansion = COSMIC_EXPANSION[selected] ?? 1;
      const continuousExpansion = reducedMotion
        ? 0
        : Math.min(0.09, Math.max(0, now - transitionStart - 1300) * 0.000026);
      const expansion =
        fromExpansion +
        (targetExpansion - fromExpansion) * transition +
        continuousExpansion;
      const fromGlow = STAGE_GLOWS[fromStage] ?? STAGE_GLOWS[2];
      const targetGlow = STAGE_GLOWS[selected] ?? STAGE_GLOWS[2];
      const glow = fromGlow.map(
        (value, index) =>
          value + ((targetGlow[index] ?? value) - value) * transition,
      );
      const background = context.createRadialGradient(
        width * 0.5,
        height * 0.48,
        0,
        width * 0.5,
        height * 0.48,
        Math.max(width, height) * 0.72,
      );
      background.addColorStop(
        0,
        `rgba(${glow[0]},${glow[1]},${glow[2]},${glow[3]})`,
      );
      background.addColorStop(0.48, "#070d1b");
      background.addColorStop(1, "#02040a");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);
      if (transition < 1 && fromStage !== selected)
        drawCosmicStage(
          context,
          width,
          height,
          fromStage,
          time,
          expansion,
          1 - transition,
          colors,
        );
      drawCosmicStage(
        context,
        width,
        height,
        selected,
        time,
        expansion,
        transition,
        colors,
      );
      if (fromStage !== selected)
        drawWarpTransition(
          context,
          width,
          height,
          transition,
          expansion,
          colors.cold,
        );
      const vignette = context.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.22,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,.66)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
      if (!reducedMotion && visible) frame = requestAnimationFrame(draw);
    };
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(performance.now());
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !frame) frame = requestAnimationFrame(draw);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    resize();
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    frame = requestAnimationFrame(draw);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [selected]);

  const dominantEstimate =
    dominant.index >= 0 && dominant.value ? dominant.value.log : null;
  const expansionLabel = COSMIC_EXPANSION[selected] ?? 1;
  return (
    <div className="entropy-viz__cosmic-universe">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`${era.label}. ${era.note}`}
      >
        État simulé de l’Univers : {era.label}.
      </canvas>
      <div className="entropy-viz__cosmic-hud" aria-hidden="true">
        <span>{era.status.toUpperCase()}</span>
        <strong>{era.label}</strong>
        <small>{era.time}</small>
      </div>
      <div className="entropy-viz__cosmic-dominant">
        <span>ENTROPIE DOMINANTE</span>
        <strong>
          {dominantEstimate === null ? "—" : <>10<sup>{dominantEstimate}</sup> kB</>}
        </strong>
        <small>
          {dominant.index >= 0
            ? CATEGORIES[dominant.index]?.label
            : "indéterminée"}
        </small>
      </div>
      <div className="entropy-viz__cosmic-expansion" aria-hidden="true">
        <span>EXPANSION DE L’ESPACE</span>
        <strong>× {expansionLabel.toFixed(2)}</strong>
        <i
          style={
            {
              "--cosmic-expansion-width": `${(expansionLabel / 1.52) * 100}%`,
            } as CSSProperties
          }
        />
      </div>
      <div className="entropy-viz__cosmic-stage-index" aria-hidden="true">
        {ERAS.map((item, index) => (
          <i className={index <= selected ? "is-past" : ""} key={item.id} />
        ))}
      </div>
    </div>
  );
}

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
      3200,
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
      <CosmicUniverseCanvas
        selected={selected}
        era={era}
        dominant={dominant}
      />
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
