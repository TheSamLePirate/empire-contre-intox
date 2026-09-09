/** Worker persistant de l'atelier L34 : trace les rayons ET peint l'image hors du
 *  fil principal, avec le même moteur testé. Protocole :
 *    → { type:"trace", id, G, R, B, frames, paint, fan }   trace `frames` instantanés
 *        (1 = statique ; > 1 = période d'ondulation, `motion.time` = f/frames) puis
 *        peint chacun ; répond { type:"frame", id, frame, frames, rows, fan, pixels }
 *        par instantané, puis { type:"done", id }.
 *    → { type:"paint", id, paint }   repeint les instantanés du dernier tracé DE MÊME
 *        NATURE (`paint.reference` : atmosphère simulée ou témoin sans réfraction) —
 *        même géométrie, autre apparence : Soleil, sol, fusion… — sans retracer. Les
 *        deux caches sont distincts : tracer le témoin n'efface pas l'atmosphère.
 *    → { type:"cancel" }             abandonne le tracé en cours entre deux instantanés.
 *  Le fil principal ne garde qu'une requête en vol et n'envoie que la dernière
 *  demandée ; les réponses d'un `id` périmé sont ignorées. */
import { trace, type Layers, type Hit } from "./mirage-optics";
import { paintRows, rowElevation, type PaintParams, type RowSet, type FanRay } from "./mirage-paint";

export type FanRequest = { n: number; segLen: number; H: number; objectMask: Float32Array | number[] };
export type TraceRequest = { type: "trace"; id: number; G: Layers; R: Layers | null; B: Layers | null; frames: number; paint: PaintParams; fan?: FanRequest };
export type PaintRequest = { type: "paint"; id: number; paint: PaintParams };
export type CancelRequest = { type: "cancel" };
export type WorkerRequest = TraceRequest | PaintRequest | CancelRequest;
export type FrameReply = { type: "frame"; id: number; frame: number; frames: number; rows: RowSet; fan: FanRay[] | null; pixels: ArrayBuffer; width: number; height: number };
export type DoneReply = { type: "done"; id: number };

type Scope = { onmessage: ((e: MessageEvent<WorkerRequest>) => void) | null; postMessage: (v: unknown, transfer?: Transferable[]) => void };
const scope = globalThis as unknown as Scope;
const yieldToQueue = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

let current = 0;                                             // id de la requête en cours (0 = libre)
type Cached = { G: Layers; R: Layers | null; B: Layers | null; frames: { rows: RowSet; fan: FanRay[] | null }[]; paint: PaintParams };
const last: { atmosphere: Cached | null; reference: Cached | null } = { atmosphere: null, reference: null };
const cacheKey = (p: PaintParams) => (p.reference ? "reference" : "atmosphere") as const;

const withTime = (L: Layers | null, frame: number, frames: number): Layers | null =>
  L && L.motion && frames > 1 ? { ...L, motion: { ...L.motion, frequency: 1, time: frame / frames } } : L;

function traceRows(G: Layers, R: Layers | null, B: Layers | null, p: PaintParams): RowSet {
  const out: RowSet = { G: new Array(p.height), R: new Array(p.height), B: new Array(p.height) };
  for (let r = 0; r < p.height; r++) {
    const a = (rowElevation(p, r) * Math.PI) / 180;
    out.G[r] = trace(G, p.eye, a, p.D, p.xFar);
    out.R[r] = R ? trace(R, p.eye, a, p.D, p.xFar) : null;
    out.B[r] = B ? trace(B, p.eye, a, p.D, p.xFar) : null;
  }
  return out;
}

/** L'éventail de la coupe : `n` rayons enregistrés, arrêtés à l'objet quand ils le touchent. */
function traceFan(G: Layers, p: PaintParams, f: FanRequest): FanRay[] {
  const out: FanRay[] = [];
  const mask = f.objectMask;
  const onObjectAt = (y: number) => { const i = Math.round((y / f.H) * (mask.length - 1)); return i >= 0 && i < mask.length && (mask[i] ?? 0) > 0; };
  for (let i = 0; i < f.n; i++) {
    const e = p.center + p.fov * (0.5 - i / (f.n - 1));
    const h: Hit = trace(G, p.eye, (e * Math.PI) / 180, p.D, p.xFar, true, f.segLen);
    const onObject = h.hasD && h.yD >= 0 && h.yD <= f.H && onObjectAt(h.yD);
    const end = onObject ? p.D : h.end?.x ?? p.xFar;
    const pts = (h.pts ?? []).filter((q) => q.x <= end);
    if (onObject) pts.push({ x: p.D, y: h.yD });
    out.push({ pts, kind: onObject ? "obj" : h.kind, e, turns: (h.turns ?? []).filter((q) => q.x <= end) });
  }
  return out;
}

function reply(id: number, frame: number, frames: number, rows: RowSet, fan: FanRay[] | null, p: PaintParams) {
  const pixels = paintRows(rows, p);
  const buffer = pixels.buffer as ArrayBuffer;
  const msg: FrameReply = { type: "frame", id, frame, frames, rows, fan, pixels: buffer, width: p.width, height: p.height };
  scope.postMessage(msg, [buffer]);
}

async function runTrace(req: TraceRequest) {
  current = req.id;
  const cache: Cached = { G: req.G, R: req.R, B: req.B, frames: [], paint: req.paint };
  last[cacheKey(req.paint)] = cache;
  const frames = Math.max(1, req.frames | 0);
  for (let f = 0; f < frames; f++) {
    if (current !== req.id) break;
    const G = withTime(req.G, f, frames)!, R = withTime(req.R, f, frames), B = withTime(req.B, f, frames);
    const rows = traceRows(G, R, B, req.paint);
    const fan = req.fan ? traceFan(G, req.paint, req.fan) : null;
    if (current !== req.id) break;
    cache.frames[f] = { rows, fan };
    reply(req.id, f, frames, rows, fan, req.paint);
    if (frames > 1) await yieldToQueue();                    // laisse passer un éventuel « cancel » ou une nouvelle requête
  }
  // « done » part toujours, même après un abandon : c'est lui qui libère la file du fil principal
  if (current === req.id) current = 0;
  scope.postMessage({ type: "done", id: req.id } satisfies DoneReply);
}

async function runPaint(req: PaintRequest) {
  current = req.id;
  const cached = last[cacheKey(req.paint)];
  if (cached) {
    cached.paint = req.paint;
    const frames = cached.frames.length;
    for (let f = 0; f < frames; f++) {
      if (current !== req.id) break;
      const fr = cached.frames[f];
      if (!fr) continue;
      reply(req.id, f, frames, fr.rows, fr.fan, req.paint);
      if (frames > 1) await yieldToQueue();
    }
  }
  if (current === req.id) current = 0;
  scope.postMessage({ type: "done", id: req.id } satisfies DoneReply);
}

scope.onmessage = ({ data }) => {
  if (data.type === "cancel") { current = -1; return; }
  if (data.type === "trace") return runTrace(data);
  if (data.type === "paint") return runPaint(data);
  return undefined;
};
