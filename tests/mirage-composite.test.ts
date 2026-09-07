import {it,expect} from 'vitest';
import {surfaceMix,geometricGround} from '../src/lib/mirage-composite';
import type {Hit} from '../src/lib/mirage-optics';
const hit=(kind:Hit['kind'])=>({kind} as Hit);
it('blends only around actual sky-ground boundaries without altering rays',()=>{
 const rays=Array.from({length:220},(_,i)=>hit(i<110?'sky':'ground')),before=JSON.stringify(rays);
 const result=surfaceMix(rays,1);
 expect(result[0]).toBeNull();expect(result[219]).toBeNull();
 expect(result[109]).toEqual({row:110,weight:.5});expect(result[110]).toEqual({row:109,weight:.5});
 expect(result[100]!.weight).toBeLessThan(result[109]!.weight);
 expect(JSON.stringify(rays)).toBe(before);
 expect(surfaceMix(rays,0).every(v=>v===null)).toBe(true);
 expect(surfaceMix([hit('sky'),hit('unresolved'),hit('sky')],1).every(v=>v===null)).toBe(true);
});

it('projects the visual ground only below the geometric horizon',()=>{
 expect(geometricGround(1.6,0)).toBeNull();
 expect(geometricGround(1.6,.1)).toBeNull();
 const R=6371000,a=-.01,x=geometricGround(1.6,a)!;
 expect(x).toBeGreaterThan(150);expect(x).toBeLessThan(170);
 expect(Math.abs((R+1.6)*Math.cos(a)/Math.cos(a+x/R)-R)).toBeLessThan(1e-6);
});
