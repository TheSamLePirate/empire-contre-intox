import type { Point } from "./types";

export function LinePlot({
  series,
  xLabel,
  yLabel,
  width = 720,
  height = 260,
}: {
  series: { label: string; points: Point[]; className?: string }[];
  xLabel?: string;
  yLabel?: string;
  width?: number;
  height?: number;
}) {
  const all = series.flatMap((item) => item.points);
  const xs = all.map((point) => point.x);
  const ys = all.map((point) => point.y);
  const minX = Math.min(...xs, 0);
  const maxX = Math.max(...xs, 1);
  const minY = Math.min(...ys, 0);
  const maxY = Math.max(...ys, 1);
  const padding = 36;
  const sx = (x: number) =>
    padding +
    ((x - minX) / Math.max(maxX - minX, 1e-9)) * (width - 2 * padding);
  const sy = (y: number) =>
    height -
    padding -
    ((y - minY) / Math.max(maxY - minY, 1e-9)) * (height - 2 * padding);
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const formatTick = (value: number) =>
    new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(value);
  return (
    <svg
      className="entropy-viz__plot"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={series.map((item) => item.label).join(", ")}
    >
      <title>{series.map((item) => item.label).join(" — ")}</title>
      <desc>
        Graphique de {minX} à {maxX} sur l’axe horizontal et de {minY} à {maxY}{" "}
        sur l’axe vertical.
      </desc>
      <path
        className="entropy-viz__axis"
        d={`M${padding},${padding / 2} V${height - padding} H${width - padding / 2}`}
      />
      {ticks.map((fraction) => {
        const y = minY + (maxY - minY) * fraction;
        return (
          <g key={`y-${fraction}`}>
            <path
              className="entropy-viz__gridline"
              d={`M${padding},${sy(y)} H${width - padding / 2}`}
            />
            <text
              className="entropy-viz__tick"
              x={padding - 6}
              y={sy(y) + 4}
              textAnchor="end"
            >
              {formatTick(y)}
            </text>
          </g>
        );
      })}
      {ticks.map((fraction) => {
        const x = minX + (maxX - minX) * fraction;
        return (
          <g key={`x-${fraction}`}>
            <path
              className="entropy-viz__tick-mark"
              d={`M${sx(x)},${height - padding} v4`}
            />
            <text
              className="entropy-viz__tick"
              x={sx(x)}
              y={height - padding + 17}
              textAnchor="middle"
            >
              {formatTick(x)}
            </text>
          </g>
        );
      })}
      {series.map((item, index) => {
        const path = item.points
          .map(
            (point, pointIndex) =>
              `${pointIndex ? "L" : "M"}${sx(point.x)},${sy(point.y)}`,
          )
          .join(" ");
        return (
          <path
            key={item.label}
            aria-label={item.label}
            className={`entropy-viz__series entropy-viz__series--${(index % 6) + 1} ${item.className ?? ""}`}
            d={path}
          />
        );
      })}
      {xLabel ? (
        <text
          className="entropy-viz__label"
          x={width - padding}
          y={height - 8}
          textAnchor="end"
        >
          {xLabel}
        </text>
      ) : null}
      {yLabel ? (
        <text className="entropy-viz__label" x={8} y={16}>
          {yLabel}
        </text>
      ) : null}
    </svg>
  );
}

export function BarPlot({
  values,
  labels,
  max,
}: {
  values: number[];
  labels: string[];
  max?: number;
}) {
  const ceiling = max ?? Math.max(...values, 1);
  return (
    <div
      className="entropy-viz__bars"
      role="img"
      aria-label={values
        .map((value, index) => `${labels[index]} : ${value}`)
        .join(", ")}
    >
      {values.map((value, index) => (
        <div
          className="entropy-viz__bar-item"
          key={`${labels[index]}-${index}`}
        >
          <strong>
            {new Intl.NumberFormat("fr-FR", {
              maximumFractionDigits: 2,
            }).format(value)}
          </strong>
          <div
            className={`entropy-viz__bar entropy-viz__bar--${(index % 6) + 1}`}
            style={{ height: `${Math.max(1, (value / ceiling) * 100)}%` }}
            aria-hidden="true"
          />
          <span title={labels[index]}>{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}
