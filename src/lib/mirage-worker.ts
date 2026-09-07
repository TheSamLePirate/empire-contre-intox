/** Precompute a complete HD optical snapshot, with the same tested ray engine. */
import { trace, type Layers, type Hit } from './mirage-optics';
type Request = { G:Layers; R:Layers|null; B:Layers|null; eye:number; D:number; range:number; fov:number; center:number; height:number };
const scope=globalThis as unknown as {onmessage:((e:MessageEvent<Request>)=>void)|null;postMessage:(v:unknown)=>void};
scope.onmessage=({data:p})=>{
  const G:Hit[]=[],R:(Hit|null)[]=[],B:(Hit|null)[]=[];
  for(let r=0;r<p.height;r++){
    const a=(p.center+p.fov*(.5-r/(p.height-1)))*Math.PI/180;
    G.push(trace(p.G,p.eye,a,p.D,p.range));
    R.push(p.R?trace(p.R,p.eye,a,p.D,p.range):null);
    B.push(p.B?trace(p.B,p.eye,a,p.D,p.range):null);
  }
  scope.postMessage({G,R,B});
};
