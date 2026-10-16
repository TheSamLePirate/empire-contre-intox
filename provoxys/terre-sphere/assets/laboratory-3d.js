import * as THREE from './vendor/three.module.js';
import {OrbitControls} from './vendor/OrbitControls.js';
import {createGeometryScene} from './scenes-geometry.js';
import {createPhysicsScene} from './scenes-physics.js';
import {createMethodScene} from './scenes-method.js';
import {attachProtocol} from './protocols-3d.js';
/* One shared WebGL context for the whole dossier. Visible scenes are rendered in turn
   and copied immediately into their presentation canvas (Three.js multiple-scenes manual). */
const colors={cyan:0x75e5f0,gold:0xffbd81,white:0xe9f3f3,red:0xff7e73};
const views=[], motion=matchMedia('(prefers-reduced-motion: reduce)');
let renderer,environment,earthMap,elapsed=0,last=0,queued=false,quality=2;
const v3=p=>p?.isVector3?p.clone():new THREE.Vector3(...(p||[0,0,0]));
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
function makeRenderer(){
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.setClearColor(0x07101a,1);renderer.setPixelRatio(1);
 const room=new THREE.Scene();room.background=new THREE.Color(0x101b27);
 const roomMat=new THREE.MeshBasicMaterial({color:0x273745,side:THREE.BackSide});
 room.add(new THREE.Mesh(new THREE.BoxGeometry(20,20,20),roomMat));
 [[[-4,5,1],0xb9e3ff,8],[ [5,3,-2],0xffce9f,5],[[0,7,0],0xffffff,9]].forEach(([pos,c,strength])=>{const light=new THREE.Mesh(new THREE.PlaneGeometry(5,5),new THREE.MeshBasicMaterial({color:c}));light.material.color.multiplyScalar(strength);light.position.set(...pos);light.lookAt(0,0,0);room.add(light);});
 const pmrem=new THREE.PMREMGenerator(renderer);environment=pmrem.fromScene(room,.04,.1,50).texture;pmrem.dispose();
 earthMap=new THREE.TextureLoader().load(new URL('./earth-nasa.jpg',import.meta.url).href,()=>request());earthMap.colorSpace=THREE.SRGBColorSpace;earthMap.anisotropy=Math.min(16,renderer.capabilities.getMaxAnisotropy());
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();document.body.classList.add('lab-render-lost');views.forEach(v=>v.status.textContent='Rendu interrompu · rechargez la page');});
}
function toolkit(root){
 const material=(color,options={})=>new THREE.MeshStandardMaterial({color,roughness:.32,metalness:.28,envMapIntensity:.65,...options});
 const sphere=(radius,color,parent=root)=>{const mesh=new THREE.Mesh(new THREE.SphereGeometry(radius,64,40),material(color));mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;};
 const line=(points,color=colors.cyan,parent=root)=>{const mesh=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(v3)),new THREE.LineBasicMaterial({color,transparent:true,opacity:.8}));parent.add(mesh);return mesh;};
 const rod=(a,b,radius=.012,color=colors.cyan,parent=root)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,1,16),material(color));mesh.castShadow=true;parent.add(mesh);mesh.userData.set=(a,b)=>{a=v3(a);b=v3(b);const d=b.clone().sub(a);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.scale.y=Math.max(.0001,d.length());mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());};mesh.userData.set(a,b);return mesh;};
 const ring=(radius,color=colors.cyan,parent=root)=>line(Array.from({length:193},(_,i)=>new THREE.Vector3(Math.cos(i/192*Math.PI*2)*radius,0,Math.sin(i/192*Math.PI*2)*radius)),color,parent);
 const label=(text,position,color=colors.white,parent=root)=>{
  const c=document.createElement('canvas');c.width=1024;c.height=128;const ctx=c.getContext('2d');const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false,depthWrite:false,toneMapped:false}));
  sprite.userData.isLabel=true;sprite.userData.setText=(value)=>{if(sprite.userData.text===String(value))return;sprite.userData.text=String(value);ctx.clearRect(0,0,1024,128);ctx.font='500 44px "Bricolage Grotesque",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const width=Math.min(980,ctx.measureText(String(value)).width+44);ctx.fillStyle='rgba(5,13,23,.82)';ctx.beginPath();ctx.roundRect(512-width/2,20,width,88,14);ctx.fill();ctx.strokeStyle='rgba(126,199,224,.28)';ctx.stroke();ctx.fillStyle='#'+new THREE.Color(color).getHexString();ctx.fillText(String(value),512,66,950);texture.needsUpdate=true;};sprite.userData.setText(text);sprite.position.copy(v3(position));sprite.scale.set(2.8,.35,1);parent.add(sprite);return sprite;
 };
 const ground=(size=6,parent=root)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(size/2,size/2,.10,96),material(0x172637,{roughness:.5,metalness:.5}));mesh.position.y=-1.25;mesh.receiveShadow=true;parent.add(mesh);const edge=new THREE.Mesh(new THREE.TorusGeometry(size/2,.012,8,160),material(colors.cyan,{emissive:colors.cyan,emissiveIntensity:.3}));edge.rotation.x=Math.PI/2;edge.position.y=-1.19;parent.add(edge);return mesh;};
 const globe=(radius=1,parent=root)=>{
  const earth=new THREE.Mesh(new THREE.SphereGeometry(radius,128,96),new THREE.MeshPhysicalMaterial({map:earthMap,roughness:.72,metalness:.02,clearcoat:.15,clearcoatRoughness:.5,envMapIntensity:.4}));earth.castShadow=true;earth.receiveShadow=true;parent.add(earth);
  const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(radius*1.028,96,64),new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.BackSide,uniforms:{color:{value:new THREE.Color(0x299bd9)}},vertexShader:'varying vec3 n; varying vec3 p; void main(){n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.0);p=mv.xyz;gl_Position=projectionMatrix*mv;}',fragmentShader:'varying vec3 n;varying vec3 p;uniform vec3 color;void main(){float f=pow(1.0-abs(dot(normalize(n),normalize(-p))),3.0);gl_FragColor=vec4(color,f*0.62);}'}));earth.add(atmosphere);
  const grid=new THREE.Group();grid.userData.isGrid=true;earth.add(grid);
  for(let lat=-60;lat<=60;lat+=30){const a=THREE.MathUtils.degToRad(lat);const l=line(Array.from({length:129},(_,i)=>new THREE.Vector3(Math.cos(a)*Math.cos(i/128*Math.PI*2)*radius*1.003,Math.sin(a)*radius*1.003,Math.cos(a)*Math.sin(i/128*Math.PI*2)*radius*1.003)),0x85cbdc,grid);l.material.opacity=.19;}
  for(let lon=0;lon<180;lon+=30){const a=THREE.MathUtils.degToRad(lon);const l=line(Array.from({length:129},(_,i)=>new THREE.Vector3(Math.sin(i/128*Math.PI*2)*Math.cos(a)*radius*1.003,Math.cos(i/128*Math.PI*2)*radius*1.003,Math.sin(i/128*Math.PI*2)*Math.sin(a)*radius*1.003)),0x85cbdc,grid);l.material.opacity=.19;}
  return earth;
 };
 return {THREE,root,colors,material,sphere,rod,line,ring,label,ground,globe,read:(id,fallback)=>{const e=document.getElementById(id),n=Number(e?.value);return e&&Number.isFinite(n)?n:fallback;},vec:(lat,lon,r=1)=>{lat*=Math.PI/180;lon*=Math.PI/180;return new THREE.Vector3(r*Math.cos(lat)*Math.cos(lon),r*Math.sin(lat),-r*Math.cos(lat)*Math.sin(lon));}};
}
function createView(container,id,title,chapter=false){
 const shell=document.createElement('div');shell.className='scene-shell'+(chapter?' chapter-stage':'');shell.dataset.scene=id;
 shell.innerHTML='<div class="scene-meta"><span class="scene-live"><i></i> MODÈLE 3D</span><span class="scene-status">Préparation de la scène</span></div><div class="scene-viewport" tabindex="0" role="group" aria-label="'+title.replaceAll('"','')+' — scène 3D manipulable"><canvas aria-hidden="true"></canvas><div class="scene-loading"><span></span>Chargement du laboratoire</div><div class="scene-hint">Glisser pour explorer · molette pour zoomer</div></div><div class="scene-toolbar"><button type="button" data-action="run" aria-pressed="true" aria-label="Mettre cette scène en pause">Ⅱ <span>Pause</span></button><button type="button" data-action="reset">↺ <span>Vue initiale</span></button><button type="button" data-action="labels" aria-pressed="true">◉ <span>Repères</span></button><button type="button" data-action="expand">⤢ <span>Plein écran</span></button></div><p class="scene-caption"></p>';
 container.append(shell);
 const v={shell,element:shell.querySelector('.scene-viewport'),canvas:shell.querySelector('canvas'),status:shell.querySelector('.scene-status'),caption:shell.querySelector('.scene-caption'),id,chapter,ready:false,active:false,running:!motion.matches,labels:true,time:0,last:0};views.push(v);
 shell.querySelector('[data-action=run]').addEventListener('click',e=>{v.running=!v.running;v.explicitMotion=true;if(v.running&&window.eciMotionPaused)document.getElementById('motion-toggle').click();e.currentTarget.setAttribute('aria-pressed',String(v.running));e.currentTarget.innerHTML=v.running?'Ⅱ <span>Pause</span>':'▷ <span>Animer</span>';request();});
 shell.querySelector('[data-action=reset]').addEventListener('click',()=>{if(!v.ready)return;v.camera.position.copy(v.initial);v.controls.target.copy(v.focus);v.controls.update();v.time=0;request();});
 shell.querySelector('[data-action=labels]').addEventListener('click',e=>{v.labels=!v.labels;e.currentTarget.setAttribute('aria-pressed',String(v.labels));v.root?.traverse(x=>{if(x.userData.isLabel)x.visible=v.labels;});request();});
 shell.querySelector('[data-action=expand]').addEventListener('click',()=>{shell.classList.toggle('scene-expanded');document.body.classList.toggle('scene-modal-open',shell.classList.contains('scene-expanded'));syncFullscreen();});
 if(!v.running){const b=shell.querySelector('[data-action=run]');b.setAttribute('aria-pressed','false');b.innerHTML='▷ <span>Animer</span>';}
 v.element.addEventListener('dblclick',()=>shell.querySelector('[data-action=expand]').click());
 v.element.addEventListener('keydown',e=>{if(!v.ready)return;const k={ArrowLeft:-.1,ArrowRight:.1,ArrowUp:-.1,ArrowDown:.1};if(!(e.key in k))return;e.preventDefault();const offset=v.camera.position.clone().sub(v.controls.target),s=new THREE.Spherical().setFromVector3(offset);if(e.key==='ArrowLeft'||e.key==='ArrowRight')s.theta+=k[e.key];else s.phi=clamp(s.phi+k[e.key],.1,Math.PI-.1);v.camera.position.setFromSpherical(s).add(v.controls.target);v.controls.update();request();});
 return v;
}
function syncFullscreen(){
 for(const v of views){const full=document.fullscreenElement===v.shell||v.shell.classList.contains('scene-expanded');const params=v.shell.closest('.lab-workbench')?.querySelector('.lab-parameters')||v.shell.querySelector('.lab-parameters');if(full&&params&&!v.parameterHome){v.parameterHome=params.parentElement;v.shell.append(params);v.shell.classList.add('fullscreen-parameters');}else if(!full&&v.parameterHome){const p=v.shell.querySelector('.lab-parameters');if(p)v.parameterHome.append(p);v.parameterHome=null;v.shell.classList.remove('fullscreen-parameters');}v.shell.querySelector('[data-action=expand]').innerHTML=full?'⤡ <span>Fermer</span>':'⤢ <span>Plein écran</span>'; }
 request();
}
document.addEventListener('fullscreenchange',syncFullscreen);
function initialize(v){
 if(v.ready)return;
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x081320);scene.environment=environment;
 const root=new THREE.Group();scene.add(root);const kit=toolkit(root);
 let model=createGeometryScene(v.id,kit)||createPhysicsScene(v.id,kit)||createMethodScene(v.id,kit);
 if(!model)throw new Error('Scène absente : '+v.id);
 const camera=new THREE.PerspectiveCamera(38,1,.05,150);camera.position.set(...(model.camera||[4,2.6,6.5]));
 const focus=new THREE.Vector3(...(model.focus||[0,0,0]));const controls=new OrbitControls(camera,v.element);controls.target.copy(focus);controls.enablePan=true;controls.enableDamping=false;controls.minDistance=1.6;controls.maxDistance=22;controls.update();controls.addEventListener('change',request);
 scene.add(new THREE.HemisphereLight(0xa9d7ff,0x172537,2.1));
 const key=new THREE.DirectionalLight(0xffe4c6,3.8);key.position.set(-3,6,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;key.shadow.bias=-.0003;key.shadow.normalBias=.025;scene.add(key);
 const rim=new THREE.DirectionalLight(0x42b5f5,2.4);rim.position.set(4,2,-4);scene.add(rim);
 const fill=new THREE.PointLight(0x85d8ed,5,20);fill.position.set(0,-1,4);scene.add(fill);
 Object.assign(v,{scene,root,camera,controls,model,focus,initial:camera.position.clone(),key,ctx:v.canvas.getContext('2d',{alpha:false}),ready:true});
 v.shell.classList.add('scene-ready');v.shell.dataset.renderer='webgl';v.caption.textContent=typeof model.caption==='function'?model.caption():model.caption||'Modèle pédagogique · échelles indiquées dans les résultats.';
}
function mount(){
 const panels=[...document.querySelectorAll('.lab-panel')];
 const directory=document.createElement('nav');directory.className='lab-directory';directory.setAttribute('aria-label','Accéder aux expériences 3D');directory.innerHTML=[['atelier-20','01 · GÉOMÉTRIE','Horizon & navire','Voir ce que la courbure masque'],['atelier-21','02 · ROTATION','Pendule de Foucault','Observer le plan d’oscillation'],['atelier-9','03 · GRAVITATION','Marées & orbites','Changer les distances et les masses'],['atelier-16','04 · MÉTROLOGIE','Laser & horloges','Mesurer le monde à distance']].map(([id,n,t,d])=>'<a href="#'+id+'"><span>'+n+'</span><strong>'+t+'</strong>'+d+'</a>').join('');document.querySelector('#ateliers h2')?.after(directory);
 for(const panel of panels){
  panel.classList.add('immersive-lab');const heading=panel.querySelector('h3,h4'),body=document.createElement('div');body.className='lab-workbench';const controls=document.createElement('div');controls.className='lab-parameters';
  [...panel.childNodes].forEach(n=>{if(n!==heading)controls.append(n);});if(heading)panel.append(heading);panel.append(body);
  const v=createView(body,panel.id,heading?.textContent||'Laboratoire');body.append(controls);attachProtocol(v,panel,request);
 }
 const chapterMap={'fil-deroule':'atelier-26',intro:'ws-intro',histoire:'shadow-models',platisme:'atelier-3',fes:'atelier-4',personnes:'atelier-5',chercheurs:'atelier-6',experiences:'atelier-7',formules:'atelier-8',marees:'atelier-9',j2:'atelier-11',hafele:'atelier-14',lageos:'atelier-16','mouv-terre':'atelier-31','mouv-lune':'atelier-32','inter-tl':'atelier-33','exp-ratees':'atelier-35',antox:'atelier-17',visuels:'atelier-18',ateliers:'atelier-21',glossaire:'atelier-28',sources:'atelier-29',conclusion:'atelier-26',cta:'atelier-30'};
 for(const chapter of document.querySelectorAll('.chapter')){const id=chapterMap[chapter.id];if(!id)continue;let mod=chapter.querySelector('.modvis');if(mod){mod.replaceChildren();mod.className='chapter-visual';}else{mod=document.createElement('div');mod.className='chapter-visual';const h=chapter.querySelector('h2');h?.after(mod);}createView(mod,id,chapter.querySelector('h2')?.textContent||'Exploration',true);}
 const allOld=document.querySelectorAll('.animbox,.spot,#shipCanvas,#fouCanvas,#mapCanvas');allOld.forEach(x=>x.hidden=true);
 const selector=document.createElement('label');selector.className='render-quality';selector.innerHTML='Qualité 3D <select aria-label="Qualité du rendu 3D"><option value="1.25">Éco</option><option value="2" selected>HD</option><option value="3">Ultra HD</option></select>';document.querySelector('#peda-status')?.before(selector);selector.querySelector('select').addEventListener('change',e=>{quality=Number(e.target.value);request();});
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){const v=views.find(x=>x.shell===entry.target);v.active=entry.isIntersecting;v.last=0;}request();},{rootMargin:'80px',threshold:0});views.forEach(v=>observer.observe(v.shell));
 window.eci3D={views,renderer,request,quality:()=>quality};
 document.body.classList.add('laboratory-3d');request();
}
function request(){if(queued||document.hidden)return;queued=true;requestAnimationFrame(frame);}
function frame(now){
 queued=false;if(document.hidden)return;const delta=last?Math.min((now-last)/1000,.06):0;last=now;
 let animated=false;
 for(const v of views){
  if(!v.active&&v.key?.shadow.map){v.key.shadow.map.dispose();v.key.shadow.map=null;}
  const rect=v.element.getBoundingClientRect();if(!v.active||rect.width<1||rect.height<1||rect.bottom<0||rect.top>innerHeight)continue;
  try{initialize(v);}catch(e){v.status.textContent='Scène indisponible';v.shell.classList.add('scene-failed');console.error(e);v.active=false;continue;}
  const moving=v.running&&(!motion.matches||v.explicitMotion)&&!window.eciMotionPaused;animated ||= moving;if(moving)v.time+=delta;
  v.model.update?.(v.time);v.root.traverse(x=>{if(x.userData.isLabel)x.visible=v.labels;});
  const dpr=Math.min(quality,Math.sqrt(3500000/(rect.width*rect.height))),w=Math.round(rect.width*dpr),h=Math.round(rect.height*dpr);
  if(v.canvas.width!==w||v.canvas.height!==h){v.canvas.width=w;v.canvas.height=h;}
  renderer.setSize(w,h,false);v.camera.aspect=rect.width/rect.height;v.camera.updateProjectionMatrix();renderer.render(v.scene,v.camera);v.ctx.drawImage(renderer.domElement,0,0,w,h);
  v.shell.dataset.frames=String((Number(v.shell.dataset.frames)||0)+1);v.status.textContent=quality===3?'ULTRA HD · '+w+' × '+h:'HD · '+w+' × '+h;
  if(typeof v.model.caption==='function')v.caption.textContent=v.model.caption();
 }
 if(animated)request();else last=0;
}
try{makeRenderer();mount();}catch(e){console.warn('Laboratoire 3D indisponible',e);document.body.classList.add('lab-render-unavailable');const note=document.createElement('p');note.className='render-fallback-note';note.textContent='Le rendu 3D nécessite WebGL 2. Les calculs et réglages restent disponibles.';document.querySelector('#ateliers h2')?.after(note);}
['scroll','resize'].forEach(event=>addEventListener(event,request,{passive:true}));
['input','change','click','eci-motion-change','fullscreenchange'].forEach(event=>document.addEventListener(event,request));
new ResizeObserver(request).observe(document.body);motion.addEventListener('change',request);document.addEventListener('visibilitychange',()=>{last=0;request();});
addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.scene-expanded').forEach(x=>x.classList.remove('scene-expanded'));document.body.classList.remove('scene-modal-open');syncFullscreen();request();}});
