import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {buildLayers,PRESETS} from '../src/lib/mirage-optics';
it('precomputes a bounded sequence and waits for the renderer before advancing',async()=>{
 const received:any[]=[];
 const scope:any={postMessage:(message:any)=>received.push(message)};
 runInNewContext(readFileSync('provoxys/lumiere/assets/mirage-worker.js','utf8'),scope);
 const G={...buildLayers(PRESETS.route.p,240,true),motion:{amplitude:.3,thermal:.3,wavelength:1200,frequency:.4,time:0}};
 const pending=scope.onmessage({data:{G,R:null,B:null,eye:1.6,D:800,range:2000,fov:1,center:-.13,height:8,frames:3}});
 expect(received.map(x=>x.frame)).toEqual([0]);
 await Promise.resolve();expect(received).toHaveLength(1);
 await scope.onmessage({data:{ack:true}});expect(received.map(x=>x.frame)).toEqual([0,1]);
 await scope.onmessage({data:{ack:true}});expect(received.map(x=>x.frame)).toEqual([0,1,2]);
 await scope.onmessage({data:{ack:true}});await pending;
 expect(received).toHaveLength(3);
 expect(received.every(x=>x.G.length===8&&x.R.every((v:any)=>v===null))).toBe(true);
});
