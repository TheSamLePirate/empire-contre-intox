import { describe, it, expect } from 'vitest';
import { buildLayers, PRESETS, traceAdaptive, indexField, displacement, layerHeight, straightAltitude, R_EARTH as R, type AirMotion } from '../src/lib/mirage-optics';
const motion: AirMotion = {amplitude:.7,wavelength:700,frequency:.4,time:1.3};
const rad=(v:number)=>v*Math.PI/180;
describe('Spherical eikonal solver',()=>{
  it.each(Object.keys(PRESETS) as (keyof typeof PRESETS)[])('conserves n r cos(theta) and terminates correctly: %s',id=>{
    const L=buildLayers(PRESETS[id].p,240,true);
    for(let deg=-.8;deg<=.8;deg+=.04){
      const h=traceAdaptive(L,1.6,rad(deg),8000,120000,true,1000);
      expect(h.termination).not.toBe('limit');
      expect(h.invariantDrift!).toBeLessThan(3e-9);
      expect(h.pts!.at(-1)).toEqual(h.end);
      expect(h.pts!.every(p=>Number.isFinite(p.x+p.y)&&p.y>=-1e-8&&p.y<=400+1e-8)).toBe(true);
      expect(h.pts!.every((p,i)=>i===0||p.x>=h.pts![i-1].x)).toBe(true);
      if(h.termination==='ground')expect(h.end!.y).toBe(0);
      if(h.termination==='top')expect(h.end!.y).toBe(400);
      if(h.termination==='range')expect(h.end!.x).toBeCloseTo(120000,5);
    }
  });
  it('matches exact vacuum geometry including near-tangent rays',()=>{
    const L=buildLayers(PRESETS.calme.p,240,true);L.nb.fill(1);
    for(const theta of [-.0001,0,.01,.1]){
      const h=traceAdaptive(L,1.6,theta,1200,120000,true,200);
      for(const p of h.pts!)expect(Math.abs(p.y-straightAltitude(1.6,theta,p.x))).toBeLessThan(2e-6);
    }
  });
  it('distinguishes a numerical limit from sky and ground',()=>{
    const L=buildLayers(PRESETS.fata.p,240,true);
    expect(traceAdaptive(L,1.6,0,8000,100).kind).toBe('unresolved');
    const h=traceAdaptive(L,1.6,0,8000,120000,false,Infinity,{maxSteps:1});
    expect(h.termination).toBe('limit');expect(h.kind).toBe('unresolved');
  });
  it('converges when tolerance is tightened for a strong moving gradient',()=>{
    const L={...buildLayers(PRESETS.route.p,240,true),motion};
    const a=traceAdaptive(L,1.6,rad(-.25),800,10000,true,100);
    const b=traceAdaptive(L,1.6,rad(-.25),800,10000,true,100,{tolerance:.01});
    expect(a.hasD&&b.hasD).toBe(true);
    expect(Math.abs(a.yD-b.yD)).toBeLessThan(.0002);
    expect(Math.abs(a.end!.y-b.end!.y)).toBeLessThan(.001);
    expect(a.invariantDrift).toBeNull();
  });
});
describe('Deformed air field',()=>{
  it('analytic derivatives agree with independent finite differences',()=>{
    for(const z of [.03,.2,1,3,8,20,80])for(const x of [0,130,390]){
      const p=PRESETS.route.p,f=indexField(p,x,z,.55,101325,motion),h=.001;
      const nx=(indexField(p,x+h,z,.55,101325,motion).n-indexField(p,x-h,z,.55,101325,motion).n)/(2*h);
      const nz=(indexField(p,x,z+h,.55,101325,motion).n-indexField(p,x,z-h,.55,101325,motion).n)/(2*h);
      expect(Math.abs(f.nx-nx)).toBeLessThan(3e-12);
      expect(Math.abs(f.nz-nz)).toBeLessThan(Math.abs(f.nz)*.001+3e-12);
    }
  });
  it('keeps the ground anchored and displayed layers ordered at the same temperature',()=>{
    for(let x=0;x<3000;x+=77){
      expect(Math.abs(displacement(x,0,motion).value)).toBe(0);
      let prev=-1;
      for(const base of [0,.15,.4,1,2,4,8,15,25,40,60]){
        const z=layerHeight(x,base,motion);expect(z).toBeGreaterThan(prev);prev=z;
        expect(Math.abs(z-displacement(x,z,motion).value-base)).toBeLessThan(1e-7);
      }
    }
  });
  it('zero amplitude reproduces the stationary field and phase changes the ray',()=>{
    const L=buildLayers(PRESETS.route.p,240,true);
    const a=traceAdaptive(L,1.6,rad(-.2),800,10000);
    const zero=traceAdaptive({...L,motion:{...motion,amplitude:0}},1.6,rad(-.2),800,10000);
    expect(zero).toEqual(a);
    const b=traceAdaptive({...L,motion},1.6,rad(-.2),800,10000);
    const c=traceAdaptive({...L,motion:{...motion,time:2.3}},1.6,rad(-.2),800,10000);
    expect(Math.abs(b.yD-c.yD)).toBeGreaterThan(.001);
  });
});

// Independent Cartesian formulation, stepped in arc length rather than surface
// longitude. The refractive gradient is estimated from scalar n, not nx/nz.
it('matches Cartesian eikonal integration through horizontally moving air',()=>{
  const L={...buildLayers(PRESETS.route.p,240,true),motion};
  const theta=rad(-.2),D=800, ds=.2;
  const scalar=(X:number,Y:number)=>{const x=R*Math.atan2(X,R+Y),z=Math.hypot(X,R+Y)-R;return indexField(PRESETS.route.p,x,z,.55,101325,motion).n;};
  const derivative=(v:number[])=>{
    const [X,Y,a]=v,h=.001,n=scalar(X,Y);
    const gx=(scalar(X+h,Y)-scalar(X-h,Y))/(2*h),gy=(scalar(X,Y+h)-scalar(X,Y-h))/(2*h);
    return [Math.cos(a),Math.sin(a),(-Math.sin(a)*gx+Math.cos(a)*gy)/n];
  };
  const add=(v:number[],k:number[],h:number)=>v.map((q,i)=>q+h*k[i]);
  let v=[0,1.6,theta],prev=v,arc=0,prevArc=0;
  while(arc<D){
    prev=v;prevArc=arc;
    const a=derivative(v),b=derivative(add(v,a,ds/2)),c=derivative(add(v,b,ds/2)),d=derivative(add(v,c,ds));
    v=v.map((q,i)=>q+ds*(a[i]+2*b[i]+2*c[i]+d[i])/6);
    arc=R*Math.atan2(v[0],R+v[1]);
  }
  const u=(D-prevArc)/(arc-prevArc),X=prev[0]+u*(v[0]-prev[0]),Y=prev[1]+u*(v[1]-prev[1]);
  const z=Math.hypot(X,R+Y)-R;
  const h=traceAdaptive(L,1.6,theta,D,10000);
  expect(Math.abs(h.yD-z)).toBeLessThan(.0001);
});

it('thermal cells change the actual sea-object image and preserve accurate gradients',()=>{
  const p=PRESETS.mer.p, m={...motion,wavelength:1200,frequency:.4,thermal:1};
  for(const z of [.2,1.6,8,45]){
    const x=133,h=.001,f=indexField(p,x,z,.55,101325,m);
    const nx=(indexField(p,x+h,z,.55,101325,m).n-indexField(p,x-h,z,.55,101325,m).n)/(2*h);
    const nz=(indexField(p,x,z+h,.55,101325,m).n-indexField(p,x,z-h,.55,101325,m).n)/(2*h);
    expect(Math.abs(f.nx-nx)).toBeLessThan(3e-12);
    expect(Math.abs(f.nz-nz)).toBeLessThan(3e-12);
  }
  const L={...buildLayers(p,240,true),motion:{...m,time:0}};
  const a=traceAdaptive(L,1.6,rad(.07),12000,120000);
  const b=traceAdaptive({...L,motion:{...m,time:.5}},1.6,rad(.07),12000,120000);
  expect(a.hasD&&b.hasD).toBe(true);
  expect(Math.abs(a.yD-b.yD)).toBeGreaterThan(.5);
  expect(a.invariantDrift).toBeNull();
});

it('closes the precalculated thermal and displacement cycle without a seam',()=>{
  for(const time of [0,.12,.6])for(const z of [.1,1.6,8,45]){
    const m={...motion,thermal:1,time},end={...m,time:time+1/m.frequency};
    const a=indexField(PRESETS.route.p,123,z,.55,101325,m),b=indexField(PRESETS.route.p,123,z,.55,101325,end);
    expect(Math.abs(a.n-b.n)).toBeLessThan(1e-14);
    expect(Math.abs(a.nz-b.nz)).toBeLessThan(1e-14);
    expect(Math.abs(layerHeight(123,z,m)-layerHeight(123,z,end))).toBeLessThan(1e-10);
  }
});
