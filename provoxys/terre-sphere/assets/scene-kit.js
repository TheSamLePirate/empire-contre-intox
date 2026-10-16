import * as THREE from './vendor/three.module.js';
const colors={cyan:0x75e5f0,gold:0xffbd81,white:0xe9f3f3,red:0xff7e73};
let request=()=>{};
let renderer,environment,earthMap,earthRoughness;
const v3=p=>p?.isVector3?p.clone():new THREE.Vector3(...(p||[0,0,0]));
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
function makeRenderer(){
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.02;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.setClearColor(0x07101a,1);renderer.setPixelRatio(1);
 const room=new THREE.Scene();room.background=new THREE.Color(0x101b27);
 const roomMat=new THREE.MeshBasicMaterial({color:0x273745,side:THREE.BackSide});
 room.add(new THREE.Mesh(new THREE.BoxGeometry(20,20,20),roomMat));
 [[[-4,5,1],0xb9e3ff,8],[ [5,3,-2],0xffce9f,5],[[0,7,0],0xffffff,9]].forEach(([pos,c,strength])=>{const light=new THREE.Mesh(new THREE.PlaneGeometry(5,5),new THREE.MeshBasicMaterial({color:c}));light.material.color.multiplyScalar(strength);light.position.set(...pos);light.lookAt(0,0,0);room.add(light);});
 const pmrem=new THREE.PMREMGenerator(renderer);environment=pmrem.fromScene(room,.04,.1,50).texture;pmrem.dispose();
 // Artistic material separation derived from the colour texture, not a terrain dataset.
 earthRoughness=new THREE.DataTexture(new Uint8Array([235,235,235,255]),1,1);earthRoughness.needsUpdate=true;
 earthMap=new THREE.TextureLoader().load(new URL('./earth-nasa.jpg',import.meta.url).href,texture=>{const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;const ctx=canvas.getContext('2d');ctx.drawImage(texture.image,0,0,1024,512);const pixels=ctx.getImageData(0,0,1024,512).data;for(let i=0;i<pixels.length;i+=4){const marine=pixels[i+2]>pixels[i]*1.18&&pixels[i+2]>=pixels[i+1]&&pixels[i+2]<180;const rough=marine?175:235;pixels[i]=pixels[i+1]=pixels[i+2]=rough;pixels[i+3]=255;}earthRoughness.image={data:pixels,width:1024,height:512};earthRoughness.flipY=true;earthRoughness.wrapS=THREE.RepeatWrapping;earthRoughness.needsUpdate=true;request();});earthMap.colorSpace=THREE.SRGBColorSpace;earthMap.anisotropy=Math.min(16,renderer.capabilities.getMaxAnisotropy());
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();document.dispatchEvent(new CustomEvent('eci-webgl-lost'));});
 renderer.domElement.addEventListener('webglcontextrestored',request);
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
 const ground=(size=6,parent=root)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(size/2,size/2,.10,96),material(0x172637,{roughness:.5,metalness:.5}));mesh.position.y=-1.25;mesh.receiveShadow=true;parent.add(mesh);const edge=new THREE.Mesh(new THREE.TorusGeometry(size/2,.012,8,160),material(colors.cyan,{emissive:colors.cyan,emissiveIntensity:.3}));edge.rotation.x=Math.PI/2;edge.position.y=-1.19;parent.add(edge);
  const lower=new THREE.Mesh(new THREE.CylinderGeometry(size/2-.04,size/2+.035,.16,96),material(0x071321,{roughness:.28,metalness:.72}));lower.position.y=-1.37;lower.receiveShadow=true;parent.add(lower);
  const ticks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.006,.006,1,6),material(0xffffff,{roughness:.65,metalness:.2}),48),dummy=new THREE.Object3D();
  for(let i=0;i<48;i++){const a=i/48*Math.PI*2,r=size/2-.10,length=i%4===0?.13:.055;dummy.position.set(Math.cos(a)*(r-length/2),-1.19,Math.sin(a)*(r-length/2));dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(Math.cos(a),0,Math.sin(a)));dummy.scale.set(1,length,1);dummy.updateMatrix();ticks.setMatrixAt(i,dummy.matrix);ticks.setColorAt(i,new THREE.Color(i%4===0?0x7297a8:0x344b5b));}parent.add(ticks);
  return mesh;};
 const globe=(radius=1,parent=root)=>{
  const earth=new THREE.Mesh(new THREE.SphereGeometry(radius,128,96),new THREE.MeshPhysicalMaterial({map:earthMap,roughnessMap:earthRoughness,roughness:.85,metalness:0,clearcoat:.08,clearcoatRoughness:.5,envMapIntensity:.22}));earth.castShadow=true;earth.receiveShadow=true;parent.add(earth);
  const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(radius*1.022,96,64),new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.BackSide,uniforms:{color:{value:new THREE.Color(0x299bd9)}},vertexShader:'varying vec3 n; varying vec3 p; void main(){n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.0);p=mv.xyz;gl_Position=projectionMatrix*mv;}',fragmentShader:'varying vec3 n;varying vec3 p;uniform vec3 color;void main(){float f=pow(1.0-abs(dot(normalize(n),normalize(-p))),3.0);gl_FragColor=vec4(color,f*0.36);}'}));earth.add(atmosphere);
  const grid=new THREE.Group();grid.userData.isGrid=true;earth.add(grid);
  for(let lat=-60;lat<=60;lat+=30){const a=THREE.MathUtils.degToRad(lat);const l=line(Array.from({length:129},(_,i)=>new THREE.Vector3(Math.cos(a)*Math.cos(i/128*Math.PI*2)*radius*1.003,Math.sin(a)*radius*1.003,Math.cos(a)*Math.sin(i/128*Math.PI*2)*radius*1.003)),0x85cbdc,grid);l.material.opacity=.19;}
  for(let lon=0;lon<180;lon+=30){const a=THREE.MathUtils.degToRad(lon);const l=line(Array.from({length:129},(_,i)=>new THREE.Vector3(Math.sin(i/128*Math.PI*2)*Math.cos(a)*radius*1.003,Math.cos(i/128*Math.PI*2)*radius*1.003,Math.sin(i/128*Math.PI*2)*Math.sin(a)*radius*1.003)),0x85cbdc,grid);l.material.opacity=.19;}
  return earth;
 };
 return {THREE,root,colors,material,sphere,rod,line,ring,label,ground,globe,read:(id,fallback)=>{const e=document.getElementById(id),n=Number(e?.value);return e&&Number.isFinite(n)?n:fallback;},vec:(lat,lon,r=1)=>{lat*=Math.PI/180;lon*=Math.PI/180;return new THREE.Vector3(r*Math.cos(lat)*Math.cos(lon),r*Math.sin(lat),-r*Math.cos(lat)*Math.sin(lon));}};
}

export function createRenderKit(onAsset=()=>{}){request=onAsset;makeRenderer();return {THREE,renderer,environment,toolkit};}
