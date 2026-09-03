import React, { useMemo, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

// === Utils: math helpers ===
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function binaryEntropy(p) {
  if (p <= 0 || p >= 1) return 0;
  return -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p));
}

// Lanczos approximation for log-gamma (natural log)
function gammaln(z) {
  const p = [
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  const g = 7;
  if (z < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - gammaln(1 - z);
  z -= 1;
  let x = 0.99999999999980993;
  for (let i = 0; i < p.length; i++) x += p[i] / (z + i + 1);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

// log2(n choose k) using log-gamma for stability
function log2Choose(n, k) {
  if (k < 0 || k > n) return -Infinity;
  const ln = (x) => gammaln(x + 1);
  const val = ln(n) - ln(k) - ln(n - k); // natural log
  return val / Math.log(2);
}

// 2x2 block entropy (Shannon) over sliding windows
function blockEntropy2x2(cells, W = 10, H = 10) {
  const counts = new Array(16).fill(0);
  for (let y = 0; y < H - 1; y++) {
    for (let x = 0; x < W - 1; x++) {
      const i = y * W + x;
      const a = cells[i] ? 1 : 0; // top-left
      const b = cells[i + 1] ? 1 : 0; // top-right
      const c = cells[i + W] ? 1 : 0; // bottom-left
      const d = cells[i + W + 1] ? 1 : 0; // bottom-right
      const idx = (a << 3) | (b << 2) | (c << 1) | d; // 0..15
      counts[idx]++;
    }
  }
  const total = (W - 1) * (H - 1);
  let Hbits = 0;
  for (let i = 0; i < 16; i++) {
    if (counts[i] === 0) continue;
    const p = counts[i] / total;
    Hbits -= p * Math.log2(p);
  }
  return { Hbits, counts, total };
}

function useGrid(W = 10, H = 10, initialN = 50) {
  const size = W * H;
  const [cells, setCells] = useState(Array(size).fill(false));
  const [target, setTarget] = useState(initialN);

  const countOn = useMemo(() => cells.reduce((a, v) => a + (v ? 1 : 0), 0), [cells]);

  const setOrdered = useCallback(() => {
    const next = Array(size).fill(false);
    for (let i = 0; i < target; i++) next[i] = true;
    setCells(next);
  }, [size, target]);

  const setRandom = useCallback(() => {
    const idxs = Array.from({ length: size }, (_, i) => i);
    for (let i = size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }
    const next = Array(size).fill(false);
    for (let i = 0; i < target; i++) next[idxs[i]] = true;
    setCells(next);
  }, [size, target]);

  const clearAll = useCallback(() => setCells(Array(size).fill(false)), [size]);

  const toggleCell = useCallback((i) => {
    setCells((prev) => {
      const on = prev[i];
      if (on) {
        const next = [...prev];
        next[i] = false;
        return next;
      }
      if (!on && prev.filter(Boolean).length >= target) return prev; // don't exceed target
      const next = [...prev];
      next[i] = true;
      return next;
    });
  }, [target]);

  useEffect(() => {
    // Initialize ordered by default
    setOrdered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { cells, setCells, setOrdered, setRandom, clearAll, toggleCell, countOn, target, setTarget };
}

export default function GridEntropy() {
  const W = 10, H = 10;
  const { cells, setOrdered, setRandom, clearAll, toggleCell, countOn, target, setTarget } = useGrid(W, H, 50);

  const p = countOn / (W * H);
  const H1 = binaryEntropy(p); // per-cell bits
  const { Hbits: H2, counts, total } = useMemo(() => blockEntropy2x2(cells, W, H), [cells]);
  const bitsChoose = useMemo(() => log2Choose(W * H, countOn), [countOn]);

  const handleDrag = useCallback((e) => {
    if (e.buttons !== 1) return; // left mouse only
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp(Math.floor(((e.clientX - rect.left) / rect.width) * W), 0, W - 1);
    const y = clamp(Math.floor(((e.clientY - rect.top) / rect.height) * H), 0, H - 1);
    const idx = y * W + x;
    toggleCell(idx);
  }, [toggleCell]);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center p-6 gap-6">
      <motion.h1 initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="text-2xl font-semibold tracking-tight">Grille 10×10 • 50 pions • Entropie</motion.h1>

      <div className="w-full max-w-5xl grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Grille interactive</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={setRandom}>Placement aléatoire</Button>
              <Button variant="secondary" onClick={setOrdered}>Placement ordonné</Button>
              <Button variant="outline" onClick={clearAll}>Effacer</Button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600">Pions:</span>
                <div className="w-40">
                  <Slider value={[target]} min={0} max={100} step={1} onValueChange={(v)=>setTarget(v[0])} />
                </div>
                <Input className="w-16" type="number" min={0} max={100} value={target} onChange={(e)=>setTarget(clamp(parseInt(e.target.value||"0"),0,100))} />
                <Button onClick={() => { /* redraw keeping exact target count */
                  // Fill or trim to match target
                  const current = [...cells];
                  const idxsOn = current.map((v,i)=>v?i:-1).filter(i=>i>=0);
                  const idxsOff = current.map((v,i)=>!v?i:-1).filter(i=>i>=0);
                  if (idxsOn.length > target) {
                    // turn some off
                    const toOff = idxsOn.slice(0, idxsOn.length - target);
                    toOff.forEach(i=>current[i]=false);
                  } else if (idxsOn.length < target) {
                    const needed = target - idxsOn.length;
                    for (let i = 0; i < needed && i < idxsOff.length; i++) current[idxsOff[i]] = true;
                  }
                  // force update
                  const ev = new Event("force-update");
                  window.dispatchEvent(ev);
                }}>Ajuster au nombre cible</Button>
              </div>
            </div>

            <div className="aspect-square w-full border rounded-2xl bg-white overflow-hidden shadow" onMouseMove={handleDrag}>
              <div className="grid grid-cols-10 grid-rows-10 w-full h-full">
                {Array.from({ length: W * H }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => toggleCell(i)}
                    className={`border border-gray-200 transition-[background-color] ${cells[i] ? "bg-gray-900" : "bg-white"}`}
                    aria-label={`cell-${i}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mesures d'information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">Cases actives: <span className="font-medium text-gray-900">{countOn}</span> / 100</div>
            <div className="text-sm">
              <div className="font-medium">Entropie binaire par case (p = {p.toFixed(2)})</div>
              <div className="text-2xl font-semibold">{H1.toFixed(3)} bits</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Entropie de blocs 2×2</div>
              <div className="text-2xl font-semibold">{H2.toFixed(3)} bits</div>
              <div className="text-xs text-gray-500">{total} fenêtres, 16 motifs possibles</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Information combinatoire log₂(C(100, n))</div>
              <div className="text-2xl font-semibold">{Number.isFinite(bitsChoose) ? bitsChoose.toFixed(1) : "—"} bits</div>
            </div>
            <div className="text-sm text-gray-600">Astuce: cliquez ou glissez pour basculer des cases. Le curseur change le nombre de pions cible (max 100). Les placements aléatoire/ordonné respectent ce nombre.</div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>Histogramme des motifs 2×2</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-2">
            {counts.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-2 bg-white rounded-xl border">
                <div className="grid grid-cols-2 grid-rows-2 w-10 h-10">
                  {[3,2,1,0].map((bit) => (
                    <div key={bit} className={`border ${ (i >> bit) & 1 ? "bg-gray-900" : "bg-white"}`}></div>
                  ))}
                </div>
                <div className="text-xs text-gray-600">{c}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
