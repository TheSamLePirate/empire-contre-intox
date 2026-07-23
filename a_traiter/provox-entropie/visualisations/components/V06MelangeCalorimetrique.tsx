import { useEffect, useMemo, useState } from "react";
import {
  Metric,
  RangeControl,
  TransportControl,
  VizFrame,
} from "../shared/VizFrame";
import { LinePlot } from "../shared/plots";
import { formatNumber, linspace } from "../shared/math";
type VisualizationProps = { className?: string; seed?: number };

export function V06MelangeCalorimetrique({
  className = "",
}: VisualizationProps) {
  const [mHot, setMHot] = useState(1),
    [mCold, setMCold] = useState(1),
    [hotC, setHotC] = useState(80),
    [coldC, setColdC] = useState(20),
    [coupling, setCoupling] = useState(0),
    [progress, setProgress] = useState(1),
    [playing, setPlaying] = useState(false);
  const cp = 4180,
    tEnv = 293.15,
    th = hotC + 273.15,
    tc = coldC + 273.15,
    ch = mHot * cp,
    cc = mCold * cp,
    cWater = ch + cc,
    cBath = coupling === 0 ? 0 : (cWater * coupling) / (100 - coupling),
    tf = (ch * th + cc * tc + cBath * tEnv) / (cWater + cBath);
  const relaxationExponent = 7;
  const decay = Math.exp(-relaxationExponent * progress),
    tHot = tf + (th - tf) * decay,
    tCold = tf + (tc - tf) * decay,
    tBath = tf + (tEnv - tf) * decay;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () =>
        setProgress((value) => {
          const next = value + 1 / 150;
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
  const entropy = (u: number) => {
    const decayAt = Math.exp(-relaxationExponent * u),
      hotAt = tf + (th - tf) * decayAt,
      coldAt = tf + (tc - tf) * decayAt,
      bathAt = tf + (tEnv - tf) * decayAt;
    return (
      ch * Math.log(hotAt / th) +
      cc * Math.log(coldAt / tc) +
      (cBath ? cBath * Math.log(bathAt / tEnv) : 0)
    );
  };
  const dsHot = ch * Math.log(tf / th),
    dsCold = cc * Math.log(tf / tc),
    dsBath = cBath ? cBath * Math.log(tf / tEnv) : 0,
    total = dsHot + dsCold + dsBath;
  const tempSeries = useMemo(() => {
    const ts = linspace(0, 1, 41);
    return [
      {
        label: "eau chaude",
        points: ts.map((t) => ({
          x: t * 60,
          y: tf + (th - tf) * Math.exp(-relaxationExponent * t) - 273.15,
        })),
      },
      {
        label: "eau froide",
        points: ts.map((t) => ({
          x: t * 60,
          y: tf + (tc - tf) * Math.exp(-relaxationExponent * t) - 273.15,
        })),
      },
      ...(cBath
        ? [
            {
              label: "environnement effectif",
              points: ts.map((t) => ({
                x: t * 60,
                y:
                  tf + (tEnv - tf) * Math.exp(-relaxationExponent * t) - 273.15,
              })),
            },
          ]
        : []),
    ];
  }, [th, tc, tf, cBath]);
  const entropySeries = useMemo(
    () => [
      {
        label: "ΔS totale",
        points: linspace(0, 1, 41).map((t) => ({ x: t * 60, y: entropy(t) })),
      },
    ],
    [th, tc, tf, cBath],
  );
  return (
    <VizFrame
      id="V6"
      title="Mélange calorimétrique"
      question="Comment une partie perd-elle de l’entropie alors que le total en gagne ?"
      caveat="Eau incompressible à cp constant. La cinétique exponentielle parcourt sept temps de relaxation sur une échelle réduite de 60 s et ne déduit pas un coefficient de convection réel. Le couplage extérieur est représenté par une capacité thermique finie initialement à 20 °C."
      className={className}
      stats={
        <>
          <Metric
            label="T d’équilibre"
            value={formatNumber(tf - 273.15, 2)}
            unit="°C"
          />
          <Metric
            label="ΔS eaux"
            value={formatNumber(dsHot + dsCold, 2)}
            unit="J/K"
          />
          <Metric
            label="ΔS ensemble"
            value={formatNumber(total, 2)}
            unit="J/K"
          />
        </>
      }
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
            time={`t = ${Math.round(progress * 60)} s`}
            progress={progress}
            label="Défilement du mélange calorimétrique"
          />
          <RangeControl
            label="Masse chaude"
            value={mHot}
            min={0.25}
            max={3}
            step={0.25}
            unit="kg"
            onChange={setMHot}
          />
          <RangeControl
            label="Température chaude"
            value={hotC}
            min={30}
            max={95}
            step={5}
            unit="°C"
            onChange={(v) => setHotC(Math.max(v, coldC + 1))}
          />
          <RangeControl
            label="Masse froide"
            value={mCold}
            min={0.25}
            max={3}
            step={0.25}
            unit="kg"
            onChange={setMCold}
          />
          <RangeControl
            label="Température froide"
            value={coldC}
            min={5}
            max={50}
            step={5}
            unit="°C"
            onChange={(v) => setColdC(Math.min(v, hotC - 1))}
          />
          <RangeControl
            label="Couplage à l’extérieur"
            value={coupling}
            min={0}
            max={50}
            step={5}
            unit="% capacité équivalente"
            onChange={setCoupling}
          />
          <RangeControl
            label="Temps"
            value={Math.round(progress * 60)}
            min={0}
            max={60}
            step={2}
            unit="s"
            onChange={(v) => {
              setPlaying(false);
              setProgress(v / 60);
            }}
          />
        </>
      }
    >
      <div className="entropy-viz__grid">
        <div className="entropy-viz__panel">
          <h4>Évolution des températures</h4>
          <LinePlot
            series={tempSeries}
            xLabel="temps réduit (s)"
            yLabel="T (°C)"
            height={245}
          />
          <div className="entropy-viz__legend">
            <span>
              <i className="entropy-viz__dot entropy-viz__dot--hot" />
              eau chaude
            </span>
            <span>
              <i className="entropy-viz__dot entropy-viz__dot--cold" />
              eau froide
            </span>
            {cBath ? (
              <span>
                <i className="entropy-viz__dot entropy-viz__dot--useful" />
                extérieur effectif
              </span>
            ) : null}
          </div>
          <p aria-live="polite">
            À {Math.round(progress * 60)} s : chaude{" "}
            <strong>{formatNumber(tHot - 273.15, 1)} °C</strong>, froide{" "}
            <strong>{formatNumber(tCold - 273.15, 1)} °C</strong>
            {cBath ? `, extérieur ${formatNumber(tBath - 273.15, 1)} °C` : ""}.
          </p>
        </div>
        <div className="entropy-viz__panel">
          <h4>Production d’entropie</h4>
          <LinePlot
            series={entropySeries}
            xLabel="temps réduit (s)"
            yLabel="ΔS (J/K)"
            height={210}
          />
          <dl>
            <dt>Portion chaude</dt>
            <dd>{formatNumber(dsHot, 2)} J/K</dd>
            <dt>Portion froide</dt>
            <dd>
              {dsCold >= 0 ? "+" : ""}
              {formatNumber(dsCold, 2)} J/K
            </dd>
            {cBath ? (
              <>
                <dt>Environnement effectif</dt>
                <dd>
                  {dsBath >= 0 ? "+" : ""}
                  {formatNumber(dsBath, 2)} J/K
                </dd>
              </>
            ) : null}
            <dt>Total à l’équilibre</dt>
            <dd>
              <strong>+{formatNumber(total, 2)} J/K</strong>
            </dd>
          </dl>
          <p>
            La chaleur perdue par la partie chaude est reçue à des températures
            plus basses : le gain d’entropie dépasse la perte.
          </p>
        </div>
      </div>
    </VizFrame>
  );
}
export default V06MelangeCalorimetrique;
