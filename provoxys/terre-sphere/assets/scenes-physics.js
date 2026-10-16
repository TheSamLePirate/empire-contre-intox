/** Physical workshop scenes. All distances/periods use the existing controls.
 * A diagram's visual magnification is explicit in its caption; none is a photograph.
 * Three.js API references: https://threejs.org/docs/pages/BufferGeometry.html,
 * Vector3.html, InstancedMesh.html. One scene owns only objects under kit.root.
 */
export function createPhysicsScene(id, kit) {
  const { THREE:T, root, globe, sphere, rod, line, label, ground, read, material, colors:C } = kit;
  const tau=Math.PI*2, rad=Math.PI/180, clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
  const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
  const group=(parent=root)=>{const g=new T.Group();parent.add(g);return g;};
  const mesh=(geo,mat,parent=root)=>{const m=new T.Mesh(geo,mat);m.castShadow=!mat.transparent;m.receiveShadow=true;parent.add(m);return m;};
  const box=(w,h,d,col,parent=root)=>mesh(new T.BoxGeometry(w,h,d),material(col,{roughness:.34,metalness:.35}),parent);
  const text=(value,pos,col=C.white,parent=root)=>{const a=label(value,pos,col,parent);a.userData.last=value;return a;};
  const put=(sprite,value)=>{if(sprite.userData.last!==value){sprite.userData.setText?.(value);sprite.userData.last=value;}};
  const circlePoints=(r,n=128)=>Array.from({length:n+1},(_,i)=>V(r*Math.cos(i/n*tau),0,r*Math.sin(i/n*tau)));
  const path=(r,col,parent=root)=>line(circlePoints(r),col,parent);
  const updateLine=(ln,points)=>{const a=ln.geometry.attributes.position;for(let i=0;i<points.length;i++)a.setXYZ(i,points[i].x,points[i].y,points[i].z);a.needsUpdate=true;ln.geometry.computeBoundingSphere();};
  const arrow=(a,b,col,parent=root)=>{const g=group(parent),shaft=rod(a,b,.014,col,g),tip=mesh(new T.ConeGeometry(.05,.14,12),material(col,{emissive:col,emissiveIntensity:.12}),g);g.userData.set=(start,end)=>{shaft.userData.set(start,end);const d=end.clone().sub(start);tip.position.copy(end);if(d.lengthSq()>1e-12)tip.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());g.visible=start.distanceTo(end)>.006;};g.userData.set(a,b);return g;};
  const hotspot=(object,title,body,control)=>({object,title,body,...(control?{control}:{})});
  const handle=(object,control,sensitivity)=>({object,control,sensitivity});
  const viewpoints=(position,target=[0,0,0])=>[
    {label:'Perspective',position,target},
    {label:'Vue de dessus',position:[.01,7.4,.01],target},
    {label:'Face aux mesures',position:[0,1.1,7.8],target}
  ];
  function graduations(radius,parent,color=C.cyan){
    const g=group(parent);
    for(let i=0;i<36;i++){const a=i*tau/36,r=radius;rod(V(r*Math.cos(a),0,r*Math.sin(a)),V((r+(i%3===0?.055:.025))*Math.cos(a),0,(r+(i%3===0?.055:.025))*Math.sin(a)),.003,color,g);}
    return g;
  }
  function satellite(parent=root,scale=1){
    const g=group(parent);g.scale.setScalar(scale);
    box(.3,.28,.3,0xcdd2db,g);const foil=box(.33,.1,.32,C.gold,g);foil.position.y=.08;
    for(const side of [-1,1]){const wing=box(.7,.025,.45,0x1a436f,g);wing.position.x=side*.65;for(let n=0;n<5;n++){const seam=box(.009,.031,.45,C.cyan,g);seam.position.x=side*.65-.29+n*.145;}rod(V(side*.15,0,0),V(side*.5,0,0),.015,C.white,g);}
    rod(V(0,.12,0),V(0,.5,0),.01,C.gold,g);sphere(.045,C.white,g).position.y=.5;
    return g;
  }
  function laserBall(parent=root,size=.43){
    const g=group(parent);sphere(size,0x929faf,g);
    const geo=new T.CylinderGeometry(.034,.04,.024,6),mat=material(0xcceff7,{metalness:.65,roughness:.16});
    const studs=new T.InstancedMesh(geo,mat,426),dummy=new T.Object3D(),golden=Math.PI*(3-Math.sqrt(5));
    for(let i=0;i<426;i++){const y=1-2*(i+.5)/426,r=Math.sqrt(1-y*y),normal=V(Math.cos(i*golden)*r,y,Math.sin(i*golden)*r);dummy.position.copy(normal).multiplyScalar(size+.014);dummy.quaternion.setFromUnitVectors(V(0,1,0),normal);dummy.updateMatrix();studs.setMatrixAt(i,dummy.matrix);}
    studs.instanceMatrix.needsUpdate=true;g.add(studs);return g;
  }
  function moon(parent=root,r=.3){
    // Terrain and solar illumination are local, procedural diagram assets.
    const geo=new T.SphereGeometry(r,64,40),a=geo.attributes.position;
    const craters=Array.from({length:18},(_,i)=>{const y=1-2*(i+.5)/18,rr=Math.sqrt(1-y*y);return V(Math.cos(i*2.399)*rr,y,Math.sin(i*2.399)*rr);});
    for(let i=0;i<a.count;i++){const n=V().fromBufferAttribute(a,i).normalize();let d=0;for(const c of craters){const ang=n.distanceTo(c);d+=.024*Math.exp(-ang*ang/.014)-.007*Math.exp(-((ang-.16)**2)/.0018);}a.setXYZ(i,n.x*r*(1-d),n.y*r*(1-d),n.z*r*(1-d));}geo.computeVertexNormals();
    const mat=new T.ShaderMaterial({uniforms:{sunDirection:{value:V(1,0,0)}},vertexShader:`varying vec3 n; varying vec3 p; void main(){n=normalize(mat3(modelMatrix)*normal);p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec3 n;varying vec3 p;uniform vec3 sunDirection;void main(){float light=max(dot(normalize(n),sunDirection),0.);float terrain=.82+.08*sin(p.x*53.)*sin(p.z*39.)+.045*cos(p.y*87.);vec3 dark=vec3(.022,.027,.037);vec3 pale=vec3(.78,.79,.76)*terrain;gl_FragColor=vec4(mix(dark,pale,smoothstep(0.,.9,light)),1.);}`,toneMapped:false});
    return mesh(geo,mat,parent);
  }

  // 09 / 10: tidal quadrupole, differential acceleration and r^-3.
  if(id==='atelier-9'||id==='atelier-10'){
    const compare=id==='atelier-9';
    const panels=compare?[-1.55,1.55]:[0];
    const models=panels.map((x,index)=>{
      const g=group();g.position.x=x;const earth=globe(.7,g);
      const waterGeo=new T.SphereGeometry(.73,64,40),base=waterGeo.attributes.position.array.slice();
      const water=mesh(waterGeo,material(index?C.gold:C.cyan,{transparent:true,opacity:.32,roughness:.16,metalness:.24,depthWrite:false}),g);
      const perturb=index?sphere(.2,C.gold,g):moon(g,.17);perturb.position.set(0,0,-1.75);
      const beam=rod(V(0,0,-.73),V(0,0,-1.55),.005,index?C.gold:C.cyan,g);
      const arrows=[-1,1].map(z=>arrow(V(0,0,z*.74),V(0,0,z*.95),index?C.gold:C.cyan,g));
      const lb=text(index?'SOLEIL':'LUNE',V(0,.36,-1.75),index?C.gold:C.cyan,g);
      const value=text('Gradient gravitationnel',V(0,-1.02,.2),C.white,g);
      const reference=path(.74,0x35516a,g);reference.rotation.x=Math.PI/2;
      return {g,earth,water,base,perturb,beam,arrows,lb,value};
    });
    text(compare?'DEUX GRADIENTS · MÊME TERRE':'ÉTIREMENT AXIAL · DEUX RENFLEMENTS',V(0,1.18,0),C.white);
    let ratio=2.2,factor=1;
    return {camera:[3.8,2.4,6.4],viewpoints:viewpoints([3.8,2.4,6.4]),
      hotspots:[hotspot(models[0].perturb,'Lune : distance et gradient','Le gradient lunaire varie comme l’inverse du cube de la distance. Glissez l’astre pour modifier la distance réelle.',compare?'dMoon':'ma-r'),hotspot(models[0].water,'Deux renflements de marée','La différence de gravité avec le centre étire l’océan dans les deux directions. Ce modèle d’équilibre ne décrit pas les bassins côtiers.'),compare?hotspot(models[1].perturb,'Gradient solaire','La masse solaire est immense mais sa distance réduit le gradient. Les deux amplitudes sont comparées au gradient lunaire de référence (384 400 km).','dSun'):hotspot(models[0].arrows[1],'Force différentielle','Les flèches représentent l’accélération relative au centre de la Terre, avec une amplitude visuelle amplifiée.')],
      handles:compare?[handle(models[0].perturb,'dMoon',1000),handle(models[1].perturb,'dSun',.5)]:[handle(models[0].perturb,'ma-r',.005)],caption:()=>compare?`Gradient centre–surface : Lune / Soleil = ${ratio.toFixed(2)}. Déformation fortement amplifiée et distances comprimées ; modèle d’équilibre, pas une prédiction de marée côtière.`:`Distance lunaire ×${factor.toFixed(2)} ; gradient ×${(1/factor**3).toFixed(3)}. Océan amplifié pour rendre les deux renflements visibles ; axes de force relative au centre.`,update(t){
      const dM=clamp(read('dMoon',384400),.001,1e9),dS=clamp(read('dSun',149.6),.001,1e9);
      ratio=(7.342e22/1.98892e30)*(dS*1e6/dM)**3;factor=clamp(read('ma-r',1),.5,2);
      models.forEach((m,index)=>{
        const rel=compare?(index?(149.6/dS)**3:(384400/dM)**3):1/factor**3;
        const visualRel=compare&&index?rel/2.18:rel;const amplitude=.16*Math.tanh(visualRel*.5),pos=m.water.geometry.attributes.position;
        for(let i=0;i<pos.count;i++){const x=m.base[3*i],y=m.base[3*i+1],z=m.base[3*i+2],cos=z/.73,distortion=1+amplitude*(1.5*cos*cos-.5);pos.setXYZ(i,x*distortion,y*distortion,z*distortion);}
        pos.needsUpdate=true;m.water.geometry.computeVertexNormals();
        const distance=compare?clamp(1.1+.65*Math.sqrt(index?dS/149.6:dM/384400),1.15,2.4):1.3+factor*.72;m.perturb.position.z=-distance;m.lb.position.z=-distance;
        m.beam.userData.set(V(0,0,-.73),V(0,0,-distance+.18));
        for(let i=0;i<2;i++){const z=i?1:-1,len=.12+.5*Math.tanh(visualRel*.35);m.arrows[i].userData.set(V(0,0,z*.79),V(0,0,z*(.79+len)));}
        m.earth.rotation.y=t*.08;put(m.value,compare?`Gradient / Lune de référence : ${visualRel.toFixed(3)}`:`Gradient relatif ×${rel.toFixed(3)}`);
      });
    }};
  }

  // 11 / 12: orbital elements and signed J2 node regression.
  if(id==='atelier-11'||id==='atelier-12'){
    const earth=globe(1);earth.scale.y=.96;
    const equator=path(1.04,0x42617a),axis=rod(V(0,-1.45,0),V(0,1.45,0),.009,C.white);
    text('AXE TERRESTRE',V(0,1.67,0),C.white);
    const node=group(),inclined=group(node),orbit=path(1.5,C.cyan,inclined),craft=satellite(inclined,.23);
    const orbitTicks=graduations(1.5,inclined);
    const nodeVector=arrow(V(0,0,0),V(1.6,0,0),C.gold,node);
    const ascending=sphere(.035,C.gold,node),radialGrip=sphere(.075,C.gold,node);
    const altitudeGuide=rod(V(1.5,0,0),V(1.9,0,0),.006,C.gold,node);
    text('RAYON ORBITAL',V(0,.24,0),C.gold,radialGrip);
    const rateLabel=text('Précession du nœud',V(0,-1.42,0),C.gold);
    let rate=0,inc=0,a=7200;let nodeAngle=0,lastT=null;
    return {camera:[3.9,2.6,4.8],viewpoints:viewpoints([3.9,2.6,4.8]),
      hotspots:[hotspot(craft,'Plan orbital : inclinaison','Glissez le satellite pour incliner son plan de 0° à 180°. Une orbite polaire annule la précession nodale de premier ordre J₂.',id==='atelier-11'?'inc':'j2-i'),hotspot(ascending,'Nœud ascendant','Le point où le satellite traverse l’équateur du sud vers le nord. La flèche dorée indique sa longitude.'),hotspot(earth,'Aplatissement et J₂','L’aplatissement est amplifié dans cette maquette. Le calcul utilise le coefficient terrestre J₂ et une orbite circulaire.'),hotspot(radialGrip,'Altitude orbitale','Changer la taille de l’orbite modifie la vitesse et la précession : les distances affichées restent les valeurs physiques.',id==='atelier-11'?'asat':'j2-h')],
      handles:[handle(craft,id==='atelier-11'?'inc':'j2-i',.5),handle(radialGrip,id==='atelier-11'?'asat':'j2-h',id==='atelier-11'?30:20)],caption:()=>`i = ${inc.toFixed(1)}° ; a = ${a.toFixed(0)} km ; nœud ${rate.toFixed(3)}°/jour. Temps nodal accéléré : 4 jours/s. Satellites agrandis ; aplatissement visuel exagéré. Premier ordre J₂, orbite circulaire.`,update(t){
      inc=id==='atelier-11'?read('inc',98):read('j2-i',51.6);
      a=id==='atelier-11'?Math.max(6379,read('asat',7200)):6378.137+Math.max(1,read('j2-h',400));
      const n=Math.sqrt(398600.4418/a**3);rate=-1.5*n*1.08262668e-3*(6378.137/a)**2*Math.cos(inc*rad)/rad*86400;
      const dt=lastT===null?0:clamp(t-lastT,0,.1);lastT=t;nodeAngle+=rate*rad*4*dt;node.rotation.y=nodeAngle;
      inclined.rotation.x=inc*rad;const r=clamp(a/6378.137,1.02,2.6);orbit.scale.setScalar(r/1.5);orbitTicks.scale.setScalar(r/1.5);
      const phase=t*.75*(7200/a)**1.5;craft.position.set(r*Math.cos(phase),0,-r*Math.sin(phase));craft.rotation.y=phase;
      nodeVector.userData.set(V(0,0,0),V(r+.15,0,0));ascending.position.set(r,0,0);radialGrip.position.set(r+.4,0,0);altitudeGuide.userData.set(V(r,0,0),V(r+.4,0,0));earth.rotation.y=t*.08;
      put(rateLabel,Math.abs(rate)<1e-8?'ORBITE POLAIRE · J₂ NODAL NUL':`${rate<0?'RÉGRESSION':'PRÉCESSION'} ${rate.toFixed(3)}° / jour`);
      // Finite, bounded visual radius preserves overview for extreme calculator inputs.
      if(a/6378.137>2.6)put(rateLabel,`Orbite comprimée · a = ${a.toFixed(0)} km`);
    }};
  }

  // 13 / 14: three genuinely readable clock instruments and aircraft direction.
  if(id==='atelier-13'||id==='atelier-14'){
    ground(7);const lab=group();
    const clock=(x,title,col)=>{
      const g=group(lab);g.position.set(x,-.12,.1);
      const chassis=box(1.05,1.05,.35,0x152635,g);chassis.position.z=-.09;
      const dial=mesh(new T.CylinderGeometry(.43,.43,.018,64),material(0xf1e9da,{roughness:.72}),g);dial.rotation.x=Math.PI/2;dial.position.z=.105;
      const bezel=mesh(new T.TorusGeometry(.445,.035,12,64),material(col,{metalness:.75,roughness:.2}),g);bezel.position.z=.12;
      for(let k=0;k<60;k++){const tick=box(k%5===0?.016:.008,k%5===0?.06:.028,.016,0x182939,g);const a=k/60*tau;tick.position.set(.38*Math.sin(a),.38*Math.cos(a),.13);tick.rotation.z=-a;}
      const hand=group(g);rod(V(0,0,.16),V(0,.31,.16),.011,0x172c38,hand);sphere(.03,col,g).position.z=.17;
      text(title,V(0,.73,0),col,g);const val=text('0 ns',V(0,-.76,0),col,g);
      for(const x of [-.45,.45]){const foot=box(.08,.14,.32,0x627786,g);foot.position.set(x,-.59,-.05);}
      return {hand,val,g,dial};
    };
    const clocks=[clock(-1.7,'VERS L’EST',C.red),clock(0,'AU SOL',C.white),clock(1.7,'VERS L’OUEST',C.cyan)];
    const air=group();const body=mesh(new T.CapsuleGeometry(.07,.42,5,12),material(C.white,{metalness:.45,roughness:.22}),air);body.rotation.x=Math.PI/2;
    const wings=box(.72,.025,.12,C.cyan,air);wings.position.z=.02;const tail=box(.27,.035,.08,C.gold,air);tail.position.z=.24;const fin=box(.035,.18,.1,C.gold,air);fin.position.set(0,.06,.23);
    const flightPath=line(Array.from({length:97},(_,i)=>V(2.45*Math.cos(i/96*tau),1.28,.7*Math.sin(i/96*tau))),C.cyan);
    const chosen=text('VOL DE LIGNE · HORLOGES AU CÉSIUM',V(0,1.88,0),C.white);
    let total=0,direction=1,hours=40,velocity=250;
    return {camera:[.5,2.2,6.8],focus:[0,.3,0],viewpoints:viewpoints([.5,2.2,6.8],[0,.3,0]),
      hotspots:[hotspot(air,'Avion et sens du voyage',id==='atelier-13'?'Glissez l’avion pour choisir est ou ouest : les résultats sont les mesures historiques publiées.':'Glissez l’avion pour modifier sa vitesse par rapport au sol. La vitesse inertielle inclut la rotation terrestre.',id==='atelier-13'?'hkSel':'hk-v'),hotspot(clocks[0].g,'Horloge embarquée vers l’est','Le terme cinématique compare les carrés des vitesses inertielles de l’avion et du sol. Les aiguilles amplifient les écarts nanosecondes.'),hotspot(clocks[1].g,'Horloge de référence au sol','La référence suit déjà la rotation terrestre. La durée propre de chaque horloge est comparée à celle du sol.',id==='atelier-14'?'hk-t':undefined),hotspot(clocks[2].g,'Horloge embarquée vers l’ouest','Le mouvement vers l’ouest peut réduire la vitesse inertielle et augmenter le temps propre. L’altitude intervient aussi.')],
      handles:id==='atelier-13'?[handle(air,'hkSel',1)]:[handle(air,'hk-v',2),handle(clocks[1].g,'hk-t',.15)],caption:()=>id==='atelier-13'?`Hafele–Keating : est −59 ±10 ns ; ouest +273 ±7 ns. Aiguilles : écarts grossis et temps accéléré. La sélection change le trajet montré ; instruments reconstruits.`:`Vol équatorial à 10 km : ${velocity.toFixed(0)} m/s au sol, ${hours.toFixed(0)} h, Δτ = ${total.toFixed(1)} ns. Écarts d’aiguilles amplifiés ; chronomètres et altitude ne sont pas à l’échelle.`,update(t){
      if(id==='atelier-13')direction=(typeof document!=='undefined'&&document.getElementById('hkSel')?.value==='w')?-1:1;
      else{velocity=read('hk-v',250);hours=read('hk-t',40);direction=velocity<0?-1:1;}
      const c2=299792458**2,gr=9.81*10000/c2*hours*3600*1e9;
      total=gr-.5*((465+velocity)**2-465**2)/c2*hours*3600*1e9;
      const vals=id==='atelier-13'?[-59,0,273]:[velocity>=0?total:0,0,velocity<0?total:0];
      clocks.forEach((c,i)=>{c.hand.rotation.z=-t*.65-vals[i]*.002;put(c.val,`${vals[i]>0?'+':''}${vals[i].toFixed(1)} ns`);});
      const phase=t*.5*direction*(id==='atelier-14'?Math.abs(velocity)/250:1);air.position.set(2.45*Math.cos(phase),1.28,.7*Math.sin(phase));air.rotation.y=Math.atan2(-2.45*Math.sin(phase)*direction,.7*Math.cos(phase)*direction)+Math.PI;
      put(chosen,`${direction>0?'TRAJET EST →':'← TRAJET OUEST'} · ÉCARTS AMPLIFIÉS`);
      flightPath.material.opacity=.6;flightPath.material.transparent=true;
    }};
  }

  // 15 / 16: a 426-stud LAGEOS model and timed outbound / return photons.
  if(id==='atelier-15'||id==='atelier-16'){
    const earth=globe(.83);earth.position.set(-1.65,-.05,0);
    const station=group();station.position.set(-.99,.44,.12);
    const pedestal=box(.16,.12,.17,0xa7bdc9,station);const tube=mesh(new T.CylinderGeometry(.045,.045,.28,16),material(C.white,{metalness:.6}),station);tube.rotation.z=-Math.PI/3;tube.position.y=.15;
    const target=laserBall(root,.44);target.position.set(1.45,.65,0);
    const beam=rod(station.position.clone(),target.position.clone(),.006,C.cyan),packet=sphere(.035,C.gold);
    const gates=[0,.08,.16].map(x=>{const ring=mesh(new T.TorusGeometry(.06,.008,8,24),material(C.cyan,{emissive:C.cyan,emissiveIntensity:.7}),station);ring.position.set(x,.15,0);return ring;});
    text('STATION LASER',V(-1.9,1.12,0),C.cyan);text('LAGEOS · 426 COINS DE CUBE',V(0,.85,0),C.gold,target);
    const timer=text('ALLER / RETOUR',V(.1,-.76,0),C.white),distanceLabel=text('Distance oblique',V(.1,-1.06,0),C.cyan);
    let rho=5900,ms=0;
    return {camera:[.8,2.1,6.5],focus:[.35,.15,0],viewpoints:viewpoints([.8,2.1,6.5],[.35,.15,0]),
      hotspots:[hotspot(target,'LAGEOS : rétroréflecteurs','La sphère passive porte 426 réflecteurs en coin de cube. Glissez-la pour modifier la distance station–satellite.',id==='atelier-15'?'rho':'la-rho'),hotspot(station,'Station de télémétrie laser','Une station chronomètre le trajet aller-retour. La précision temporelle ne remplace pas la correction atmosphérique et la géométrie orbitale.'),hotspot(packet,'Pulse aller et retour','Le temps de vol suit Δt = 2ρ/c. Le photon dessiné est très ralenti ; une variation de 3 mm correspond à environ 20 ps.')],
      handles:[handle(target,id==='atelier-15'?'rho':'la-rho',50)],caption:()=>`ρ = ${rho.toFixed(0)} km ; aller-retour ${ms.toFixed(3)} ms. Satellites et station agrandis, distance comprimée, pulse très ralenti. ρ est la distance station–satellite, pas le rayon géocentrique.`,update(t){
      rho=Math.max(.001,read(id==='atelier-15'?'rho':'la-rho',5900));ms=2*rho*1000/299792458*1000;
      target.position.x=.8+1.6*clamp(Math.log1p(rho/3000),0,1.7);target.rotation.y=t*.16;
      const end=target.position.clone().add(V(-.38,-.05,0)),start=station.position.clone().add(V(.08,.16,0));beam.userData.set(start,end);
      const cycleSeconds=clamp(ms/20,1.2,8),phase=(t/cycleSeconds)%1,u=phase<.5?phase*2:2-2*phase;packet.position.lerpVectors(start,end,u);
      gates.forEach((g,i)=>{g.material.emissiveIntensity=phase>.93?1.2:.2+i*.08;});
      put(timer,`${phase<.5?'ÉMISSION →':'← RETOUR'} · ${ms.toFixed(3)} ms`);put(distanceLabel,`ρ = ${rho.toFixed(0)} km · 3 mm ↔ 20 ps`);
    }};
  }

  // 31: fixed-axis Earth, distinct solar and sidereal revolutions.
  if(id==='atelier-31'){
    const sun=sphere(.47,C.gold);sun.material.emissive=new T.Color(C.gold);sun.material.emissiveIntensity=.85;
    const orbit=path(2.15,0x42647a),orbitTicks=graduations(2.15,root,0x42647a),world=group(),tilt=group(world),earth=globe(.48,tilt);tilt.rotation.z=23.44*rad;
    rod(V(0,-.72,0),V(0,.72,0),.008,C.white,tilt);const meridian=path(.51,C.gold,earth);meridian.rotation.z=Math.PI/2;
    const sunray=rod(V(),V(2.15,0,0),.007,C.gold);const lbl=text('ROTATION / RÉVOLUTION',V(0,1.12,0),C.white);
    const motion=text('1 jour solaire',V(0,-1.13,0),C.cyan);
    let days=1;
    return {camera:[3.1,2.8,4.7],viewpoints:viewpoints([3.1,2.8,4.7]),
      hotspots:[hotspot(earth,'Rotation terrestre','Glissez la Terre pour avancer le nombre de jours solaires. Un jour solaire correspond à un peu plus d’un tour sidéral.','mt-n'),hotspot(sun,'Direction du Soleil','La révolution change la direction Terre–Soleil : retrouver le midi solaire nécessite une rotation supplémentaire.'),hotspot(meridian,'Méridien de référence','Le repère aide à distinguer rotation par rapport aux étoiles et retour de la direction solaire. L’axe garde sa direction dans cette maquette.')],
      handles:[handle(earth,'mt-n',.1)],caption:()=>`${days.toFixed(0)} jours solaires = ${(days*86400/86164.0905).toFixed(5)} tours sidéraux. Axe incliné 23,44° conservant sa direction ; tailles agrandies, distances comprimées et temps accéléré.`,update(t){
      days=read('mt-n',1);const time=days+t*.09,angle=time/365.25636*tau;world.position.set(2.15*Math.cos(angle),0,2.15*Math.sin(angle));earth.rotation.y=time*86400/86164.0905*tau;
      sunray.userData.set(V(),world.position.clone());put(motion,`${days.toFixed(0)} j solaires · ${(days*86400/86164.0905).toFixed(4)} tours sidéraux`);
    }};
  }

  // 32: synodic catch-up and synchronous lunar rotation.
  if(id==='atelier-32'){
    const earth=globe(.62),lunar=moon(root,.25),orbit=path(1.72,C.cyan),marker=sphere(.025,C.gold);
    const sunlight=Array.from({length:5},(_,i)=>arrow(V(3,0,(i-2)*.35),V(2.15,0,(i-2)*.35),C.gold));
    const solarGrip=sphere(.065,C.gold);solarGrip.position.set(2.62,.22,0);
    text('ANNÉE',V(0,.18,0),C.gold,solarGrip);
    text('SOLEIL LOINTAIN →',V(2.4,.63,0),C.gold);const info=text('SIDÉRAL / SYNODIQUE',V(0,-1.15,0),C.white);
    const sight=rod(V(),V(1.72,0,0),.006,C.cyan);let sid=27.321661,year=365.25636,syn=29.5306;
    return {camera:[1.1,3.7,5.0],viewpoints:viewpoints([1.1,3.7,5.0]),
      hotspots:[hotspot(lunar,'Mois lunaire sidéral','Glissez la Lune pour changer sa période sidérale. Le mois synodique dépend aussi de la période de révolution terrestre.','ml-sid'),hotspot(marker,'Même face vers la Terre','Le repère reste tourné vers la Terre : rotation synchrone dans une orbite circulaire simplifiée.'),hotspot(solarGrip,'Repère solaire','La direction du Soleil est fixe ici. La vitesse angulaire relative vaut la vitesse lunaire moins celle de la Terre.','ml-yr')],
      handles:[handle(lunar,'ml-sid',.05),handle(solarGrip,'ml-yr',1)],caption:()=>`Mois sidéral ${sid.toFixed(4)} j ; synodique ${Number.isFinite(syn)&&syn>0?syn.toFixed(4)+' j':'non défini pour ces paramètres'}. Les rayons viennent de +X ; rotation synchrone, tailles et distances amplifiées/comprimées. Géométrie circulaire simplifiée ; temps accéléré (1,74 jour/s).`,update(t){
      sid=Math.max(.001,read('ml-sid',27.321661));year=Math.max(.001,read('ml-yr',365.25636));syn=1/(1/sid-1/year);
      // A fixed Earth–Sun direction is the solar frame: angular speed = nMoon−nEarth.
      const omega=(1/sid-1/year)*10.95,phase=t*omega;lunar.position.set(1.72*Math.cos(phase),0,1.72*Math.sin(phase));lunar.rotation.y=-phase;
      const face=V(-Math.cos(phase),0,-Math.sin(phase)).multiplyScalar(.255);marker.position.copy(lunar.position).add(face);sight.userData.set(V(),lunar.position.clone());
      put(info,`T sidéral ${sid.toFixed(2)} j · T synodique ${Number.isFinite(syn)&&syn>0?syn.toFixed(2)+' j':'non défini'}`);earth.rotation.y=t*.08;
    }};
  }

  // 33: actual barycentric partition, sizes independent of the mass slider.
  if(id==='atelier-33'){
    const earth=globe(.58),lunar=moon(root,.16),bary=sphere(.038,C.gold);
    const axis=rod(V(-.16,0,0),V(.16,0,0),.012,C.gold),verticalAxis=rod(V(0,-.16,0),V(0,.16,0),.012,C.gold);
    // Annotation visible through the enlarged Earth: this is a mass-centre marker, not a surface object.
    for(const marker of [bary,axis,verticalAxis]){marker.material.depthTest=false;marker.renderOrder=20;}
    const earthOrbit=path(.1,C.cyan),moonOrbit=path(2.1,0x79919f),joining=rod(V(),V(2.1,0,0),.006,0x648a9b);
    const distance=text('BARYCENTRE · CENTRE DE MASSE',V(0,1.03,0),C.gold);const eq=text('M Terre / M Lune = 81,3',V(0,-1.03,0),C.white);
    let q=81.3,rkm=4671;
    return {camera:[1.8,2.9,4.9],viewpoints:viewpoints([1.8,2.9,4.9]),
      hotspots:[hotspot(lunar,'Rapport des masses','Glissez la Lune pour modifier M Terre / M Lune. Les distances au barycentre varient en raison inverse des masses.','it-q'),hotspot(bary,'Barycentre','Les deux astres orbitent autour de leur centre de masse commun. La valeur physique se compare au rayon terrestre, indépendamment de la taille dessinée.'),hotspot(earth,'Mouvement de la Terre','La Terre ne reste pas exactement immobile : son centre décrit une petite orbite autour du barycentre.')],
      handles:[handle(lunar,'it-q',.2)],caption:()=>`M Terre / M Lune = ${q.toFixed(1)} ; barycentre à ${rkm.toFixed(0)} km du centre terrestre. Orbites à même facteur de réduction ; rayons des astres indépendamment agrandis. Repère doré visible par transparence ; “intérieur” se décide sur 6 371 km, indépendamment des sphères dessinées.`,update(t){
      q=Math.max(.001,read('it-q',81.3));rkm=384399/(q+1);const distance=2.3,er=distance/(q+1),mr=distance*q/(q+1),phase=t*.3;
      earth.position.set(-er*Math.cos(phase),0,-er*Math.sin(phase));lunar.position.set(mr*Math.cos(phase),0,mr*Math.sin(phase));lunar.rotation.y=-phase;
      earthOrbit.scale.setScalar(Math.max(er,.0001)/.1);moonOrbit.scale.setScalar(Math.max(mr,.0001)/2.1);joining.userData.set(earth.position,lunar.position);
      put(eq,`q = ${q.toFixed(1)} · r Terre = ${rkm.toFixed(0)} km · ${rkm<6371?'INTERNE':'EXTERNE'}`);
    }};
  }

  // 34: local horizon and declination path; latitude directly rotates sky frame.
  if(id==='atelier-34'){
    const floor=mesh(new T.CylinderGeometry(2.1,2.1,.05,80),material(0x17303b,{roughness:.6,transparent:true,opacity:.32}));floor.position.y=-.03;
    const horizon=path(1.65,C.cyan);graduations(1.65,root,C.cyan);const sky=mesh(new T.SphereGeometry(1.67,48,32,0,tau,0,Math.PI/2),material(C.cyan,{transparent:true,opacity:.06,side:T.DoubleSide,depthWrite:false}));
    const p=box(.06,.22,.06,C.white);p.position.y=.11;
    for(const [name,x,z] of [['N',0,1.85],['S',0,-1.85],['E',1.85,0],['O',-1.85,0]])text(name,V(x,.05,z),C.white);
    const sun=sphere(.095,C.gold);sun.material.emissive=new T.Color(C.gold);sun.material.emissiveIntensity=.65;
    const trajectory=line(Array.from({length:129},()=>V()),C.gold),altitude=rod(V(),V(0,1,0),.008,C.gold);
    const poleArrow=arrow(V(),V(0,1.5,0),C.cyan),info=text('HORIZON LOCAL',V(0,-.43,0),C.white);
    let lat=69.6,dec=23.44,minAlt=0,maxAlt=0;
    const direction=(H,p,d)=>V(-Math.cos(d)*Math.sin(H),Math.sin(p)*Math.sin(d)+Math.cos(p)*Math.cos(d)*Math.cos(H),Math.cos(p)*Math.sin(d)-Math.sin(p)*Math.cos(d)*Math.cos(H));
    let previous='';
    return {camera:[3.0,2.0,4.6],viewpoints:[...viewpoints([3,2,4.6]).slice(0,2),{label:'Depuis l’observateur',position:[0,.24,.18],target:[0,.15,-1.4]}],
      hotspots:[hotspot(sun,'Déclinaison solaire','Glissez le Soleil pour modifier sa déclinaison entre les solstices. Le cercle doré représente son trajet journalier.','ms-dec'),hotspot(p,'Latitude de l’observateur','Glissez le repère au centre pour modifier la latitude. Le pôle céleste s’incline avec la latitude.','ms-phi'),hotspot(horizon,'Horizon géométrique','Au-dessus du cercle : hauteur positive. Relief, réfraction et rayon apparent solaire ne sont pas inclus.'),hotspot(poleArrow,'Axe du ciel','La hauteur du pôle céleste correspond à la latitude. Le jour et la nuit polaires résultent de cette géométrie.')],
      handles:[handle(p,'ms-phi',.5),handle(sun,'ms-dec',.12)],caption:()=>`Latitude ${lat.toFixed(1)}° ; déclinaison ${dec.toFixed(2)}°. Hauteur min ${minAlt.toFixed(2)}°, max ${maxAlt.toFixed(2)}°. Horizon géométrique : réfraction, relief et rayon apparent du Soleil non inclus. Un tour solaire accéléré.`,update(t){
      lat=clamp(read('ms-phi',69.6),-90,90);dec=clamp(read('ms-dec',23.44),-90,90);const p=lat*rad,d=dec*rad,key=`${lat}/${dec}`;
      minAlt=Math.asin(clamp(Math.sin(p)*Math.sin(d)-Math.cos(p)*Math.cos(d),-1,1))/rad;maxAlt=Math.asin(clamp(Math.sin(p)*Math.sin(d)+Math.cos(p)*Math.cos(d),-1,1))/rad;
      if(key!==previous){updateLine(trajectory,Array.from({length:129},(_,i)=>direction(i/128*tau,p,d).multiplyScalar(1.65)));previous=key;}
      const sunPos=direction(t*.3,p,d).multiplyScalar(1.65);sun.position.copy(sunPos);altitude.userData.set(V(),sunPos);poleArrow.userData.set(V(),V(0,Math.sin(p),Math.cos(p)).multiplyScalar(1.55));
      put(info,minAlt>0?'SOLEIL DE MINUIT':maxAlt<0?'NUIT POLAIRE':'LE SOLEIL TRAVERSE L’HORIZON');
      floor.material.transparent=true;floor.material.opacity=.32;
    }};
  }

  // 27: atmospheric pressure, exponentially declining density and balloon altitude.
  if(id==='atelier-27'){
    const base=ground(5),column=group();
    const layers=[];for(let i=0;i<21;i++){
      const y=-1.05+i*.145,layer=mesh(new T.CylinderGeometry(1.18,1.18,.13,48,1,true),material(C.cyan,{transparent:true,opacity:.3*Math.exp(-i*.2),depthWrite:false,side:T.DoubleSide}),column);layer.position.y=y;layers.push(layer);
      if(i%4===0)text(`${(i*2).toFixed(0)} km`,V(1.48,y,0),C.white);
    }
    const sea=mesh(new T.CylinderGeometry(1.2,1.2,.08,48),material(0x155269,{metalness:.35,roughness:.28}));sea.position.y=-1.12;
    const balloon=group();const envelope=mesh(new T.SphereGeometry(.18,32,24),material(C.gold,{roughness:.55,metalness:.02}),balloon);envelope.scale.y=1.2;
    const probe=box(.065,.09,.065,C.white,balloon);probe.position.y=-.38;rod(V(0,-.2,0),V(0,-.335,0),.004,C.white,balloon);
    const columnLine=rod(V(-.3,-1.08,.2),V(-.3,1.85,.2),.006,C.white),mark=path(.19,C.gold,balloon);
    for(let i=0;i<=20;i++){const y=-1.05+i*.145;rod(V(-.39,y,.2),V(i%5===0?-.15:-.23,y,.2),.003,C.white);}mark.position.y=-.1;
    const pressure=text('PRESSION À L’ALTITUDE',V(0,2.27,0),C.gold),formula=text('ATMOSPHÈRE ISOTHERME · H = 8,5 km',V(0,-1.57,0),C.white);
    // Deterministic particles: fewer at high layers, without simulating gas trajectories.
    const dots=new T.InstancedMesh(new T.SphereGeometry(.012,6,4),material(C.cyan,{emissive:C.cyan,emissiveIntensity:.2}),160),dummy=new T.Object3D();
    for(let i=0;i<160;i++){const u=(i+.5)/160,y=-1.03-Math.log(1-u*.94)*.53,ang=i*2.399,r=.98*Math.sqrt((i*.618)%1);dummy.position.set(r*Math.cos(ang),y,r*Math.sin(ang));dummy.updateMatrix();dots.setMatrixAt(i,dummy.matrix);}dots.instanceMatrix.needsUpdate=true;root.add(dots);
    let z=5,pRatio=1;
    return {camera:[3.3,2.5,6],focus:[0,.3,0],viewpoints:viewpoints([3.3,2.5,6],[0,.3,0]),
      hotspots:[hotspot(balloon,'Ballon : altitude mesurée','Glissez le ballon pour modifier l’altitude de 0 à 40 km. Le repère ne flotte pas artificiellement : il suit la mesure.','at-z'),hotspot(column,'Pression et densité','Dans ce modèle isotherme, pression et densité décroissent exponentiellement avec une hauteur caractéristique de 8,5 km. Les couches colorées sont indicatives.'),hotspot(sea,'Référence au niveau de la mer','La pression de référence est 1 013,25 hPa. Température et gravité constantes : cette maquette ne reproduit pas toute l’atmosphère standard.')],
      handles:[handle(balloon,'at-z',.15)],caption:()=>`Altitude ${z.toFixed(1)} km : P/P₀ = ${pRatio.toFixed(3)}, avec H = 8,5 km. Couches verticales et ballon agrandis ; modèle isotherme à g constant. Points : densité indicative, pas trajectoires de molécules.`,update(t){
      z=clamp(read('at-z',5),0,100);pRatio=Math.exp(-z/8.5);balloon.position.set(-.3,-1.05+z*.0725,.2);
      // Keep altitude fixed; no ornamental up/down drift obscures the measurement.
      put(pressure,`${z.toFixed(1)} km · ${(1013.25*pRatio).toFixed(1)} hPa`);mark.rotation.y=t*.12;
    }};
  }
  return null;
}
