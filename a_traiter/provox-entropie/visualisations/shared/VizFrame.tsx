import { useId, type ReactNode } from "react";
import type { VisualizationProps } from "./types";

type VizFrameProps = VisualizationProps & {
  id: string;
  title: string;
  question: string;
  caveat: string;
  controls?: ReactNode;
  stats?: ReactNode;
  children: ReactNode;
};

export function VizFrame({
  id,
  title,
  question,
  caveat,
  controls,
  stats,
  children,
  className = "",
}: VizFrameProps) {
  return (
    <section
      className={`entropy-viz ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <header className="entropy-viz__header">
        <div className="entropy-viz__heading">
          <div className="entropy-viz__eyebrow">
            <span className="entropy-viz__id">{id}</span>
            <span>Laboratoire interactif</span>
          </div>
          <h3 id={`${id}-title`}>{title}</h3>
          <p>{question}</p>
        </div>
        {stats ? <div className="entropy-viz__stats">{stats}</div> : null}
      </header>
      {controls ? (
        <div className="entropy-viz__controls">{controls}</div>
      ) : null}
      <div className="entropy-viz__stage">{children}</div>
      <aside
        className="entropy-viz__caveat"
        aria-label="Limite scientifique du modèle"
      >
        <span aria-hidden="true">◇</span>
        <p>
          <strong>Limite du modèle :</strong> {caveat}
        </p>
      </aside>
    </section>
  );
}

export function Metric({
  label,
  value,
  unit,
}: {
  label: string;
  value: ReactNode;
  unit?: string;
}) {
  return (
    <span className="entropy-viz__metric">
      <span>{label}</span>
      <strong>
        {value}
        {unit ? <small> {unit}</small> : null}
      </strong>
    </span>
  );
}

export function RangeControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  const reactId = useId();
  const id = `entropy-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${reactId.replace(/:/g, "")}`;
  return (
    <label className="entropy-viz__range" htmlFor={id}>
      <span>
        <span>{label}</span>
        <output htmlFor={id}>
          {formatNumber(value)}
          {unit ? ` ${unit}` : ""}
        </output>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={`${formatNumber(value)}${unit ? ` ${unit}` : ""}`}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
    </label>
  );
}

export function TransportControl({
  playing,
  onToggle,
  onReset,
  time,
  progress,
  label = "Animation",
}: {
  playing: boolean;
  onToggle: () => void;
  onReset?: () => void;
  time: ReactNode;
  progress: number;
  label?: string;
}) {
  const boundedProgress = Math.min(1, Math.max(0, progress));
  return (
    <div className="entropy-viz__transport" role="group" aria-label={label}>
      <button
        className="entropy-viz__play"
        type="button"
        aria-pressed={playing}
        aria-label={playing ? "Mettre en pause" : "Lancer l’animation"}
        onClick={onToggle}
      >
        <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
      </button>
      {onReset ? (
        <button type="button" onClick={onReset}>
          Recommencer
        </button>
      ) : null}
      <output className="entropy-viz__timecode" aria-live="off">
        {time}
      </output>
      <span className="entropy-viz__progress" aria-hidden="true">
        <i style={{ width: `${boundedProgress * 100}%` }} />
      </span>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(
    value,
  );
}
