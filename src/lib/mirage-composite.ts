import type { Hit } from './mirage-optics';
/** Visual subpixel/coverage mixture around an actual sky/ground transition.
 * This does not change the physical ray endpoint or synthesize a water plane. */
export function surfaceMix(hits:Hit[],strength:number){
  const amount=Math.max(0,Math.min(1,strength)),radius=Math.ceil(4+amount*48);
  return hits.map((h,r)=>{
    if(!amount || h.kind==='unresolved')return null;
    for(let d=1;d<=radius;d++)for(const i of [r-d,r+d]){
      const q=hits[i];if(!q || q.kind==='unresolved' || q.kind===h.kind)continue;
      return {row:i,weight:.5*amount*Math.exp(-(d-1)/(3+amount*16))};
    }
    return null;
  });
}

/** Geometrical ground behind an apparent direction, for the visual coverage
 * blend only. Null above the geometric horizon; stable near grazing incidence. */
export function geometricGround(eye:number,angle:number,R=6371000):number|null{
 const r=R+eye,b=-r*Math.sin(angle),c=eye*(2*R+eye),disc=b*b-c;
 if(b<=0 || disc<0)return null;
 const distance=c/(b+Math.sqrt(disc));
 return R*Math.atan2(distance*Math.cos(angle),r+distance*Math.sin(angle));
}
