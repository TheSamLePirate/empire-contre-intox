import { useEffect, useState } from "react";
import {
  Metric,
  RangeControl,
  TransportControl,
  VizFrame,
} from "../shared/VizFrame";
import { formatNumber } from "../shared/math";
type VisualizationProps = { className?: string; seed?: number };

export const jouleWeightY = (progress: number) => 34 + 150 * progress;

export function V04ExperienceJoule({ className = "" }: VisualizationProps) {
  const [mass, setMass] = useState(5),
    [height, setHeight] = useState(2),
    [drops, setDrops] = useState(10),
    [water, setWater] = useState(1),
    [loss, setLoss] = useState(0),
    [progress, setProgress] = useState(1),
    [playing, setPlaying] = useState(false);
  const g = 9.80665,
    calorimeterC = 250,
    waterC = water * 4180,
    totalC = waterC + calorimeterC,
    initialT = 293.15,
    workTotal = 2 * mass * g * height * drops,
    work = workTotal * progress,
    useful = work * (1 - loss / 100),
    lost = work - useful,
    deltaT = useful / totalC,
    finalT = initialT + deltaT,
    entropyCal = totalC * Math.log(finalT / initialT),
    entropyElsewhere = lost / initialT,
    dropHeight = jouleWeightY(progress);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () =>
        setProgress((value) => {
          const next = value + 0.0125;
          if (next >= 1) {
            setPlaying(false);
            return 1;
          }
          return next;
        }),
      55,
    );
    return () => window.clearInterval(timer);
  }, [playing]);
  const togglePlayback = () => {
    if (!playing && progress >= 1) setProgress(0);
    setPlaying((value) => !value);
  };
  return (
    <VizFrame
      id="V4"
      title="L’expérience de Joule"
      question="Comment une chute mesurable devient-elle une élévation de température ?"
      caveat="L’eau et le calorimètre ont une capacité thermique constante et sont supposés parfaitement mélangés. Les pertes sont thermalisées à 20 °C ; l’appareil historique, ses cycles de remontée et ses corrections expérimentales étaient plus complexes."
      className={className}
      stats={
        <>
          <Metric
            label="Travail cumulé"
            value={formatNumber(work, 1)}
            unit="J"
          />
          <Metric
            label="Élévation de T"
            value={formatNumber(deltaT, 4)}
            unit="K"
          />
          <Metric
            label="S créée estimée"
            value={formatNumber(entropyCal + entropyElsewhere, 4)}
            unit="J/K"
          />
        </>
      }
      controls={
        <>
          <TransportControl
            playing={playing}
            onToggle={togglePlayback}
            onReset={() => {
              setPlaying(false);
              setProgress(0);
            }}
            time={`${formatNumber(drops * progress, 1)} / ${drops} chutes`}
            progress={progress}
            label="Défilement de l’expérience de Joule"
          />
          <RangeControl
            label="Masse de chaque poids"
            value={mass}
            min={1}
            max={30}
            step={1}
            unit="kg"
            onChange={setMass}
          />
          <RangeControl
            label="Hauteur par chute"
            value={height}
            min={0.5}
            max={10}
            step={0.5}
            unit="m"
            onChange={setHeight}
          />
          <RangeControl
            label="Nombre de chutes"
            value={drops}
            min={1}
            max={50}
            step={1}
            onChange={setDrops}
          />
          <RangeControl
            label="Masse d’eau"
            value={water}
            min={0.25}
            max={5}
            step={0.25}
            unit="kg"
            onChange={setWater}
          />
          <RangeControl
            label="Pertes mécaniques"
            value={loss}
            min={0}
            max={50}
            step={5}
            unit="%"
            onChange={setLoss}
          />
          <RangeControl
            label="Avancement"
            value={Math.round(progress * 100)}
            min={0}
            max={100}
            step={5}
            unit="%"
            onChange={(v) => {
              setPlaying(false);
              setProgress(v / 100);
            }}
          />
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <h4>Calorimètre à palettes</h4>
          <svg
            viewBox="0 0 720 350"
            className="entropy-viz__plot"
            role="img"
            aria-label={`Deux masses de ${mass} kilogrammes ont effectué ${formatNumber(drops * progress, 1)} chutes sur ${drops}`}
          >
            <title>Montage de Joule avec deux poids et un calorimètre</title>
            <line x1="102" x2="102" y1="38" y2="267" stroke="var(--ev-muted)" />
            <line x1="618" x2="618" y1="38" y2="267" stroke="var(--ev-muted)" />
            <circle
              cx="102"
              cy="42"
              r="18"
              fill="none"
              stroke="var(--ev-muted)"
              strokeWidth="5"
            />
            <circle
              cx="618"
              cy="42"
              r="18"
              fill="none"
              stroke="var(--ev-muted)"
              strokeWidth="5"
            />
            <path
              d="M102 42 Q360 6 618 42"
              fill="none"
              stroke="var(--ev-muted)"
              strokeWidth="4"
            />
            <rect
              x="55"
              y={dropHeight}
              width="94"
              height="61"
              rx="6"
              fill="var(--ev-gold)"
            />
            <rect
              x="571"
              y={dropHeight}
              width="94"
              height="61"
              rx="6"
              fill="var(--ev-gold)"
            />
            <text
              className="entropy-viz__label"
              x="102"
              y={dropHeight + 36}
              textAnchor="middle"
            >
              {mass} kg
            </text>
            <text
              className="entropy-viz__label"
              x="618"
              y={dropHeight + 36}
              textAnchor="middle"
            >
              {mass} kg
            </text>
            <rect
              x="244"
              y="98"
              width="232"
              height="205"
              rx="18"
              fill="var(--ev-panel-2)"
              stroke="var(--ev-muted)"
              strokeWidth="4"
            />
            <path
              d="M250 165 Q300 148 360 165T470 165V297H250Z"
              fill="var(--ev-cold)"
              opacity=".5"
            />
            <line
              x1="360"
              y1="25"
              x2="360"
              y2="270"
              stroke="var(--ev-useful)"
              strokeWidth="7"
            />
            <g transform={`rotate(${progress * 1440} 360 220)`}>
              <path
                d="M294 194H426M304 230H416M323 265H397"
                stroke="var(--ev-useful)"
                strokeWidth="13"
                strokeLinecap="round"
              />
            </g>
            <path
              d={`M495 275V${275 - 120 * Math.min(1, deltaT / 0.2)}`}
              stroke="var(--ev-hot)"
              strokeWidth="8"
            />
            <circle
              cx="495"
              cy={275 - 120 * Math.min(1, deltaT / 0.2)}
              r="10"
              fill="var(--ev-hot)"
            />
            <text
              className="entropy-viz__label"
              x="360"
              y="333"
              textAnchor="middle"
            >
              énergie potentielle → agitation du fluide
            </text>
          </svg>
        </div>
        <div className="entropy-viz__panel">
          <h4>Bilan énergétique à cet instant</h4>
          <div style={{ display: "grid", gap: ".7rem" }}>
            <div>
              <span>Travail des poids</span>
              <div style={{ height: "14px", background: "var(--ev-line)" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress * 100}%`,
                    background: "var(--ev-gold)",
                  }}
                />
              </div>
            </div>
            <div>
              <span>Vers eau + calorimètre</span>
              <div style={{ height: "14px", background: "var(--ev-line)" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress * (1 - loss / 100) * 100}%`,
                    background: "var(--ev-cold)",
                  }}
                />
              </div>
            </div>
            <div>
              <span>Vers axe, air et roulements</span>
              <div style={{ height: "14px", background: "var(--ev-line)" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress * loss}%`,
                    background: "var(--ev-hot)",
                  }}
                />
              </div>
            </div>
          </div>
          <dl>
            <dt>Énergie potentielle disponible</dt>
            <dd>{formatNumber(workTotal, 1)} J</dd>
            <dt>Reçue par le calorimètre</dt>
            <dd>{formatNumber(useful, 1)} J</dd>
            <dt>Dissipée hors calorimètre</dt>
            <dd>{formatNumber(lost, 1)} J</dd>
            <dt>Capacité thermique</dt>
            <dd>{formatNumber(totalC, 0)} J/K</dd>
            <dt>Température de l’eau</dt>
            <dd>{formatNumber(finalT - 273.15, 4)} °C</dd>
          </dl>
          <p>
            <strong>Premier principe :</strong> {formatNumber(work, 1)} J ={" "}
            {formatNumber(useful, 1)} J + {formatNumber(lost, 1)} J. Le bilan ne
            prédit pas, à lui seul, le sens spontané.
          </p>
        </div>
      </div>
    </VizFrame>
  );
}
export default V04ExperienceJoule;
