/* Instruments and evidence galleries. Three.js geometries use metres only within
 * each scaled exhibit: these are explanatory models, never physical data feeds. */
export function createMethodScene(id, kit) {
  const ids = ['atelier-5','atelier-6','atelier-17','atelier-18','atelier-28','atelier-29','atelier-30'];
  if (!ids.includes(id)) return null;
  const {THREE:T,root,colors:C}=kit, panel=document.getElementById(id);
  const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
  const group=(parent=root)=>{const g=new T.Group();parent.add(g);return g;};
  const metal=kit.material(0xc3d0ce,{metalness:.92,roughness:.26});
  const brass=kit.material(C.gold,{metalness:.85,roughness:.3});
  const black=kit.material(0x102125,{metalness:.55,roughness:.37});
  const ivory=kit.material(0xe0ded2,{roughness:.8});
  const cyan=kit.material(C.cyan,{metalness:.4,roughness:.3,emissive:C.cyan,emissiveIntensity:.15});
  const wood=kit.material(0x6c4432,{roughness:.64});
  const mesh=(geometry,mat,parent=root,pos=[0,0,0])=>{const m=new T.Mesh(geometry,mat);m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  const box=(w,h,d,mat,parent=root,pos=[0,0,0])=>mesh(new T.BoxGeometry(w,h,d),mat,parent,pos);
  const cyl=(r,h,mat,parent=root,pos=[0,0,0],r2=r)=>mesh(new T.CylinderGeometry(r,r2,h,48),mat,parent,pos);
  const tor=(r,t,mat,parent=root,pos=[0,0,0])=>mesh(new T.TorusGeometry(r,t,12,96),mat,parent,pos);
  const bar=(a,b,r=.025,color=C.gold,parent=root)=>kit.rod(V(...a),V(...b),r,color,parent);
  const text=(s,p,color=C.white,parent=root)=>kit.label(s,V(...p),color,parent);
  const setText=(label,s)=>label?.userData?.setText?.(s);
  const glow=(color=C.cyan)=>kit.material(color,{emissive:color,emissiveIntensity:1.8,roughness:.35});
  const state=(index)=>{const b=panel?.querySelectorAll('.quizbtn')[index];return b?.classList.contains('ok')?1:b?.classList.contains('ko')?-1:0;};
  const selection=(name,fallback)=>document.getElementById(name)?.value??fallback;
  const metadata={hotspots:[],actions:[],viewpoints:[]};
  const finish=model=>Object.assign(model,metadata);
  const explain=(object,title,body,control)=>metadata.hotspots.push({object,title,body,...(control?{control}:{})});
  const action=(object,title,run)=>metadata.actions.push({object,title,run});
  const chooseAnswer=index=>panel?.querySelectorAll('.quizbtn')[index]?.click();
  const select=(control,value)=>{const el=document.getElementById(control);if(el){el.value=value;el.dispatchEvent(new Event('change',{bubbles:true}));}};
  const views=(overview,detail,target=[0,0,0])=>{metadata.viewpoints=[{label:'Vue d’ensemble',position:overview,target},{label:'Au plus près',position:detail,target},{label:'Vue de face',position:[0,1.4,5.6],target}];};
  function selectorKeys(control,entries,width=3.8,z=1.35) {
    const keys=entries.map(([value,name],i)=>{
      const x=(i/(entries.length-1)-.5)*width,g=group();g.position.set(x,-.97,z);
      const rim=tor(.115,.02,brass,g);rim.rotation.x=-Math.PI/2;
      const button=cyl(.105,.07,black.clone(),g,[0,.025,0]);
      const label=text(name,[0,.23,.1],C.white,g);label.scale.multiplyScalar(.65);
      action(g,'Afficher '+name,()=>select(control,value));
      explain(button,name,'Sélectionnez cet objet pour afficher le mécanisme associé dans le modèle et la définition dans le panneau.',control);
      return {value,button};
    });
    return ()=>keys.forEach(({value,button})=>{const active=selection(control,'')===value;button.material.color.setHex(active?C.cyan:0x102125);button.position.y=active?.02:.045;});
  }
  const floor=kit.ground(({'atelier-5':3.8,'atelier-6':4.9,'atelier-17':5.8,'atelier-18':4.9,'atelier-28':4.5,'atelier-29':5.5,'atelier-30':6.2})[id],root);
  const plinth=(parent=root,w=2,d=1.4)=>{box(w,.16,d,black,parent,[0,-1.14,0]);box(w*.94,.035,d*.94,metal,parent,[0,-1.04,0]);};
  function dial(r,parent,at=[0,0,0],faceColor=ivory) {
    const d=group(parent);d.position.set(...at);
    const face=cyl(r,.045,faceColor,d);face.rotation.x=Math.PI/2;
    const rim=tor(r,.035,brass,d);rim.position.z=.035;
    for(let i=0;i<60;i++){const a=i*Math.PI/30,l=i%5===0?.12:.06;bar([Math.sin(a)*(r-l),Math.cos(a)*(r-l),.04],[Math.sin(a)*r,Math.cos(a)*r,.04],.008,0x244349,d);}
    const needle=group(d);bar([0,0,.06],[0,r*.72,.06],.018,C.red,needle);cyl(.045,.04,brass,d).rotation.x=Math.PI/2;
    return {group:d,needle};
  }
  function scope(parent=root) {
    const g=group(parent);
    for(let i=0;i<3;i++){const a=i*Math.PI*2/3;bar([0,-.05,0],[Math.cos(a)*.57,-1.02,Math.sin(a)*.57],.045,0xb48957,g);bar([0,-.32,0],[Math.cos(a)*.5,-.88,Math.sin(a)*.5],.022,0x283b3d,g);}
    cyl(.25,.11,brass,g,[0,.02,0]);cyl(.11,.17,black,g,[0,.15,0]);
    const yaw=group(g);yaw.position.y=.23;
    const circle=dial(.29,yaw,[0,.1,.06]);circle.group.rotation.x=-Math.PI/2;
    const head=group(yaw);head.position.y=.43;
    for(const x of [-.21,.21])box(.07,.42,.13,brass,head,[x,-.1,0]);
    const tube=group(head),body=cyl(.11,.65,black,tube);body.rotation.x=Math.PI/2;
    for(const z of [-.3,-.22,.22,.31]){const collar=tor(.115,.018,brass,tube,[0,0,z]);}
    const lens=cyl(.105,.01,cyan,tube,[0,0,.333]);lens.rotation.x=Math.PI/2;
    const eyepiece=cyl(.065,.14,metal,tube,[0,0,-.38]);eyepiece.rotation.x=Math.PI/2;
    for(const x of [-.28,.28]){const knob=cyl(.06,.08,black,head,[x,0,0]);knob.rotation.z=Math.PI/2;}
    return {group:g,yaw,tube};
  }
  function laser(parent=root,small=false) {
    const s=scope(parent);s.group.scale.setScalar(small?.65:1);s.tube.rotation.x=-.5;
    const satellite=group(parent);satellite.position.set(1.7,1.5,-.65);
    const ball=mesh(new T.SphereGeometry(.22,32,24),brass,satellite);
    // Retroreflectors embedded in a metal sphere, with real three-dimensional facets.
    for(let i=0;i<72;i++){const y=1-2*(i+.5)/72,a=i*2.39996323,r=Math.sqrt(1-y*y);const n=V(r*Math.cos(a),y,r*Math.sin(a));const reflector=cyl(.028,.012,cyan,satellite,n.clone().multiplyScalar(.225).toArray());reflector.quaternion.setFromUnitVectors(V(0,1,0),n);}
    const a=V(0,.65,.25),b=satellite.position.clone();
    const beam=kit.rod(a,b,.009,C.cyan,parent),packet=kit.sphere(.035,C.cyan,parent),returnPacket=kit.sphere(.026,C.gold,parent);
    return {group:s.group,satellite,beam,packet,returnPacket,update(t){const phase=(t*.4)%1;packet.position.lerpVectors(a,b,phase);returnPacket.position.lerpVectors(b,a,(phase+.35)%1);satellite.rotation.y=t*.11;}};
  }
  function pendulum(parent=root,scale=1) {
    const g=group(parent);g.scale.setScalar(scale);
    cyl(.78,.08,black,g,[0,-.99,0]);const rim=tor(.74,.022,brass,g,[0,-.94,0]);rim.rotation.x=-Math.PI/2;
    for(let i=0;i<36;i++){const a=i*Math.PI/18;bar([Math.cos(a)*.6,-.94,Math.sin(a)*.6],[Math.cos(a)*.73,-.94,Math.sin(a)*.73],.006,0xc7a67b,g);}
    for(const x of [-.8,.8]){bar([x,-1,0],[x,1.25,0],.045,0xbfa16f,g);box(.17,.04,.3,metal,g,[x,-1,0]);}
    bar([-.8,1.25,0],[.8,1.25,0],.045,C.gold,g);
    const bob=kit.sphere(.12,C.gold,g),wire=bar([0,1.22,0],[0,-.7,0],.009,C.white,g),trace=group(g);
    for(let i=0;i<24;i++){const a=i*Math.PI/24;bar([Math.cos(a)*-.65,-.91,Math.sin(a)*-.65],[Math.cos(a)*.65,-.91,Math.sin(a)*.65],.004,0x234b51,trace);}
    return {group:g,update(t,precess=true){const a=precess?t*.065:0,q=Math.sin(t*2)*.48;const p=V(Math.cos(a)*q,-.73+.06*Math.sin(t*2)**2,Math.sin(a)*q);bob.position.copy(p);wire.userData.set(V(0,1.22,0),p);trace.rotation.y=-a;}};
  }
  function pageCard(parent,x,title,lines=9) {
    const g=group(parent);g.position.set(x,-.42,0);g.rotation.x=-.18;
    box(.91,1.3,.075,black,g);box(.84,1.23,.015,ivory,g,[0,0,.048]);
    for(let n=0;n<lines;n++)box(.58-(n%3)*.06,.012,.008,metal,g,[0,.32-n*.075,.061]);
    text(title,[0,.76,.05],C.white,g);return g;
  }
  if(id==='atelier-5') {
    plinth();const p=pendulum();const h=text('FOUCAULT · 1851',[0,1.55,0]);const result=text('Choisir une mesure',[0,-1.35,.8],C.cyan);
    const correctRing=tor(.88,.03,cyan);correctRing.rotation.x=-Math.PI/2;correctRing.position.y=-.93;
    const arcDial=dial(.18,root,[-1,-.68,.57]);text('C',[-1,-.34,.57],C.gold).scale.multiplyScalar(.7);
    const timeDial=dial(.18,root,[1,-.68,.57]);text('Δτ',[1,-.34,.57],C.gold).scale.multiplyScalar(.7);
    explain(p.group,'Pendule de Foucault','La rotation du plan d’oscillation dépend de la latitude. Le mouvement présenté est accéléré pour la lecture.');
    explain(arcDial.group,'Circonférence','Une circonférence est une longueur géodésique. Elle ne correspond pas à l’observable du pendule de Foucault.');
    explain(timeDial.group,'Écart entre horloges','Un écart de temps propre relève d’une comparaison d’horloges, comme Hafele–Keating.');
    action(p.group,'Choisir Ωp = Ω sin φ',()=>chooseAnswer(1));action(arcDial.group,'Choisir la circonférence',()=>chooseAnswer(0));action(timeDial.group,'Choisir l’écart d’horloges',()=>chooseAnswer(2));
    views([3.5,2.1,4.2],[1.9,1.15,2.9],[0,.15,0]);
    return finish({camera:[3.5,2.1,4.2],focus:[0,.2,0],caption:'Pendule de Foucault · La précession est accélérée pour rendre le mécanisme visible ; ce modèle illustre la réponse au quiz.',update(t){p.update(t,true);const answer=[state(0),state(1),state(2)],latest=panel?.querySelector('.out')?.textContent||'',ok=latest.trim().startsWith('Oui');correctRing.visible=ok;setText(result,answer.some(x=>x)?ok?'ROTATION DU PLAN · Ω sin φ':'Comparer avec le mouvement du pendule':'Choisir une mesure');}});
  }
  if(id==='atelier-6') {
    plinth(root,3.5,2);const l=laser(),display=dial(.3,root,[1,-.35,.6]);text('TÉLÉMÉTRIE LASER',[0,1.95,0]);text('ILRS · temps aller-retour',[1.7,1.95,-.6]);const answer=text('Une impulsion. Un retour. Une durée.',[0,-1.35,.75],C.cyan);
    const tv=group();tv.position.set(-1.18,-.55,.32);box(.48,.34,.09,black,tv);box(.41,.27,.01,cyan,tv,[0,0,.05]);text('TV',[-1.18,-.24,.32],C.white).scale.multiplyScalar(.65);
    const poll=group();poll.position.set(-.65,-.63,.95);for(let i=0;i<3;i++)box(.08,.11+i*.07,.07,brass,poll,[(i-1)*.1,-.09+i*.035,0]);text('SONDAGE',[-.65,-.85,1.10],C.white).scale.multiplyScalar(.65);
    explain(l.satellite,'Réflecteurs LAGEOS','Les réflecteurs renvoient des impulsions à la station. Le satellite ne produit ni image télévisée ni opinion.');
    explain(l.group,'Station laser','Le temps aller-retour d’une impulsion donne une distance avec les corrections nécessaires. Le schéma n’est pas à l’échelle.');
    explain(display.group,'Mesurer une durée','La mesure chronométrée est l’observable du système SLR. Le cadran est un repère pédagogique.');
    action(l.satellite,'Choisir SLR / ILRS',()=>chooseAnswer(0));action(l.group,'Choisir SLR / ILRS',()=>chooseAnswer(0));action(tv,'Choisir NASA TV',()=>chooseAnswer(1));action(poll,'Choisir un sondage',()=>chooseAnswer(2));
    views([3.8,2.6,4.6],[2.4,1.45,3.2],[.6,.2,0]);
    return finish({camera:[3.8,2.6,4.6],caption:'Station optique et satellite passif à rétroréflecteurs · Distance, taille et temps de vol sont schématisés, non à l’échelle.',update(t){l.update(t);display.needle.rotation.z=-t;const ok=(panel?.querySelector('.out')?.textContent||'').trim().startsWith('Oui');setText(answer,ok?'SLR · distance = c × Δt / 2':state(1)||state(2)?'Une image ou une opinion ne mesure pas le temps de vol':'Une impulsion. Un retour. Une durée.');}});
  }
  if(id==='atelier-17') {
    plinth(root,4.6,2.6);const stations={};
    const hor=stations.hor=group();const s=scope(hor);s.group.position.x=-1.2;
    for(let i=0;i<3;i++){const x=.25+i*.72;bar([x,-1,0],[x,.25+(i===1?.15:0),0],.035,C.white,hor);box(.2,.25,.04,i===1?cyan:ivory,hor,[x,.16+(i===1?.15:0),0]);}
    bar([-1.2,.66,.3],[1.7,.66,.3],.007,C.cyan,hor);text('VISÉE ET JALONS',[0,1.25,0],C.white,hor);
    const eight=stations.eight=group();const ruler=box(3,.07,.35,brass,eight,[0,-.4,0]);for(let i=0;i<=30;i++)bar([-1.5+i*.1,-.35,-.12],[-1.5+i*.1,-.35,i%5===0?.08:-.02],.006,0x162c30,eight);
    const arc=Array.from({length:97},(_,i)=>V(-1.5+3*i/96,.35-.55*((i/96-.5)*2)**2,0));kit.line(arc,C.cyan,eight);bar([-1.5,-.2,0],[1.5,-.2,0],.015,C.white,eight);bar([0,-.2,0],[0,.35,0],.015,C.red,eight);text('DISTANCE AU CARRÉ',[0,1.25,0],C.white,eight);
    const ice=stations.ice=group();for(let i=0;i<8;i++){const b=box(.32,.45+i%3*.09,.35,ivory,ice,[-1.4+i*.4,-.75,-.1]);b.rotation.y=i*.14;}box(.85,.25,.5,cyan,ice,[0,-.72,.55]);bar([0,-.6,.55],[0,.65,.55],.025,C.gold,ice);text('EXPÉDITION · POSITION · TRAJET',[0,1.25,0],C.white,ice);
    const cgi=stations.cgi=group();const telescope=scope(cgi);telescope.group.position.x=-.75;const satellite=box(.35,.35,.35,brass,cgi,[1,1,0]);for(const x of [.42,1.58])box(.64,.3,.035,cyan,cgi,[x,1,0]);bar([-.75,.65,.2],[1,1,0],.007,C.cyan,cgi);text('OBSERVATION INDÉPENDANTE',[0,1.5,0],C.white,cgi);
    const sun=stations.sun=group();const lamp=kit.sphere(.26,C.gold,sun);lamp.position.set(0,1.15,0);for(const x of [-1.1,1.1]){bar([x,-1,0],[x,-.05,0],.025,C.white,sun);bar([0,1.15,0],[x,-.05,0],.008,C.gold,sun);}text('DEUX VISÉES · UN MODÈLE',[0,1.65,0],C.white,sun);
    const updateKeys=selectorKeys('an-sel',[['hor','HORIZON'],['eight','FLÈCHE'],['ice','TRAJET'],['cgi','SATELLITE'],['sun','SOLEIL']],3.7);
    explain(s.group,'Théodolite','Une visée contrôlée relie plusieurs jalons. Hauteur, réfraction et alignement font partie du protocole.','an-sel');
    explain(ruler,'Échelle de distance','La flèche et la distance sont deux grandeurs distinctes. Le comportement quadratique est une approximation locale.','an-sel');
    explain(lamp,'Soleil proche','Un modèle de Soleil proche doit satisfaire plusieurs directions observées à la fois.','an-sel');
    views([3.8,2.4,4.8],[2.2,1.4,3.4],[0,-.1,0]);
    let previous='';return finish({camera:[3.8,2.4,4.8],caption:()=>({hor:'Visée élevée, jalons et réfraction : documenter le protocole avant de conclure.',eight:'Flèche, corde et distance : la croissance quadratique vaut dans son domaine d’approximation.',ice:'Un trajet documenté et ses coordonnées permettent de tester un modèle géographique.',cgi:'Un télescope indépendant et les données de passage permettent de comparer plusieurs producteurs d’observations.',sun:'Un Soleil proche doit expliquer simultanément plusieurs directions et tailles apparentes.'}[selection('an-sel','hor')]),update(t){const key=selection('an-sel','hor');if(key!==previous){for(const [k,g] of Object.entries(stations))g.visible=k===key;previous=key;}s.yaw.rotation.y=Math.sin(t*.2)*.04;lamp.scale.setScalar(1+Math.sin(t)*.015);updateKeys();}});
  }
  if(id==='atelier-18') {
    plinth(root,3.3,2);const camera=group();box(.9,.65,.5,black,camera,[0,.05,0]);box(.35,.15,.22,metal,camera,[-.22,.46,0]);
    const lens=cyl(.23,.5,black,camera,[0,.05,.5]);lens.rotation.x=Math.PI/2;for(const z of [.28,.4,.58,.72])tor(.235,.022,metal,camera,[0,.05,z]);const glass=cyl(.2,.01,cyan,camera,[0,.05,.76]);glass.rotation.x=Math.PI/2;
    for(let i=0;i<3;i++){const a=i*2*Math.PI/3;bar([0,-.25,0],[Math.cos(a)*.6,-1,Math.sin(a)*.6],.035,C.gold,camera);}
    const frame=group();frame.position.set(0,.3,-.8);for(const [a,b] of [[[-1,-.5,0],[1,-.5,0]],[[-1,.8,0],[1,.8,0]],[[-1,-.5,0],[-1,.8,0]],[[1,-.5,0],[1,.8,0]]])bar(a,b,.022,C.white,frame);
    bar([-1,.1,.01],[1,.1,.01],.01,C.cyan,frame);bar([0,-.5,.01],[0,.8,.01],.01,C.gold,frame);
    const names=['FOCALE','HORIZON','DATE / LIEU','SOURCE'];const leds=names.map((n,i)=>{const x=-1.15+i*.77;const l=mesh(new T.SphereGeometry(.08,20,12),glow(0x334a4d),root,[x,-.75,1]);const name=text(n,[x,-1.03,1.18],C.white);name.scale.multiplyScalar(.8);return l;});const status=text('0 / 4 CONTRÔLES',[0,1.35,0],C.cyan);
    leds.forEach((object,index)=>{explain(object,names[index],['Une focale connue aide à caractériser le champ et les déformations optiques.','Le réticule fournit un repère de cadrage ; l’horizon doit être documenté.','Heure et lieu permettent de confronter la scène à des conditions précises.','Retrouver le producteur, le fichier d’origine et les métadonnées.'][index]);action(object,'Basculer le contrôle '+names[index],()=>chooseAnswer(index));});
    explain(camera,'Caméra et optique','Les réglages et les métadonnées ne prouvent pas la géométrie : ils rendent l’observation reproductible.');explain(frame,'Réticule','Le repère se redresse lorsque le contrôle de l’horizon est renseigné.');
    views([.35,1.6,5.3],[1.1,.7,3.1],[0,-.1,.25]);
    return finish({camera:[.35,1.6,5.3],focus:[0,-.05,0],caption:'Caméra, réticule et métadonnées · Les quatre contrôles documentent une image ; ils ne suffisent pas à valider sa géométrie.',update(){let n=0;leds.forEach((l,i)=>{const ok=state(i)===1;n+=ok;l.material.color.setHex(ok?C.cyan:0x334a4d);l.material.emissive.setHex(ok?C.cyan:0x18282a);});setText(status,`${n} / 4 CONTRÔLES`);frame.rotation.z=state(1)===1?0:.12;glass.scale.x=state(0)===1?1:1.07;}});
  }
  if(id==='atelier-28') {
    plinth(root,3,2.6);const scenes={},geo=scenes.geo=group();const shell=mesh(new T.SphereGeometry(.85,96,64),kit.material(0x267b88,{roughness:.74,metalness:.15}),geo);shell.scale.y=.96;const gp=shell.geometry.attributes.position;for(let i=0;i<gp.count;i++){const v=V(gp.getX(i),gp.getY(i),gp.getZ(i));const factor=1+.027*Math.sin(v.x*8)*Math.cos(v.z*7)+.013*Math.sin(v.y*11);v.multiplyScalar(factor);gp.setXYZ(i,v.x,v.y,v.z);}gp.needsUpdate=true;shell.geometry.computeVertexNormals();const ell=group(geo);for(let k=0;k<6;k++){const a=k*Math.PI/6;const l=kit.line(Array.from({length:129},(_,i)=>{const q=i*Math.PI*2/128;return V(Math.sin(q)*Math.cos(a)*.895,Math.cos(q)*.86,Math.sin(q)*Math.sin(a)*.895);}),C.gold,ell);l.material.opacity=.5;}const eq=kit.ring(.895,C.gold,ell);eq.material.opacity=.5;text('GÉOÏDE / ELLIPSOÏDE',[0,1.3,0],C.white,geo);
    const sid=scenes.sid=group(),clock=dial(.8,sid,[0,.12,0]);text('JOUR SIDÉRAL',[0,1.3,0],C.white,sid);text('23 h 56 min 4 s',[0,-.94,.1],C.cyan,sid);
    const sag=scenes.sag=group();const arc=Array.from({length:100},(_,i)=>{const a=-.9+1.8*i/99;return V(Math.sin(a)*1.6,Math.cos(a)*1.6-1.3,0);});kit.line(arc,C.gold,sag);const y=Math.cos(.9)*1.6-1.3;bar([Math.sin(-.9)*1.6,y,0],[Math.sin(.9)*1.6,y,0],.012,C.white,sag);bar([0,y,0],[0,.3,0],.025,C.cyan,sag);text('ARC · CORDE · FLÈCHE',[0,1.15,0],C.white,sag);
    const j2=scenes.j2=group();const ellipsoid=mesh(new T.SphereGeometry(.82,64,32),brass,j2);ellipsoid.scale.y=.78;const meridian=tor(.87,.012,cyan,j2);meridian.scale.y=.78;bar([0,-1.05,0],[0,1.1,0],.015,C.white,j2);text('J₂ · DISTRIBUTION DES MASSES',[0,1.45,0],C.white,j2);
    const updateKeys=selectorKeys('gl-sel',[['geo','GÉOÏDE'],['sid','JOUR'],['sag','FLÈCHE'],['j2','J₂']],2.7,1.1);
    explain(shell,'Surface équipotentielle','Le géoïde est lié au potentiel de pesanteur. Les irrégularités sont ici simulées et amplifiées, sans carte gravimétrique.','gl-sel');
    explain(clock.group,'Rotation sidérale','Le cadran représente une rotation par rapport aux étoiles, pas un chronomètre observé.','gl-sel');
    explain(ellipsoid,'Coefficient J₂','Cette composante zonale du potentiel n’est pas égale à l’aplatissement géométrique.','gl-sel');
    views([2.8,1.5,3.8],[1.8,.8,2.9],[0,0,0]);
    return finish({camera:[2.8,1.5,3.8],caption:()=>({geo:'Deux références différentes : surface équipotentielle et ellipsoïde régulier. Écarts et aplatissement amplifiés visuellement.',sid:'Une rotation par rapport aux étoiles : le jour sidéral diffère du jour solaire moyen.',sag:'La flèche est la distance au milieu entre la corde et l’arc. Schéma géométrique.',j2:'Le coefficient J₂ décrit une composante du champ de gravité. Il ne se confond pas avec l’aplatissement géométrique.'}[selection('gl-sel','geo')]),update(t){const key=selection('gl-sel','geo');for(const [k,g]of Object.entries(scenes))g.visible=k===key;geo.rotation.y=t*.08;j2.rotation.y=t*.1;clock.needle.rotation.z=-t*.2;updateKeys();}});
  }
  if(id==='atelier-29') {
    plinth(root,4.5,1.6);const archive=group();const article=pageCard(archive,-1.45,'SCIENCE · 1972'),anonymous=pageCard(archive,0,'COMPILATION',7),data=pageCard(archive,1.45,'ILRS · MESURES');
    const stamps=[article,anonymous,data].map(g=>{const stamp=box(.62,.09,.016,kit.material(0x365159,{roughness:.6}),g,[0,-.46,.068]);return stamp;});
    const status=text('AUTEURS · MÉTHODE · DONNÉES',[0,1.13,.2],C.cyan);
    [article,anonymous,data].forEach((object,index)=>{action(object,['Choisir Science 1972','Choisir la compilation','Choisir les données ILRS'][index],()=>chooseAnswer(index));explain(object,['Article original','Compilation anonyme','Données de mesure'][index],['La publication décrit une expérience et son protocole. Retrouvez auteurs, observations et limites dans le document original.','Une compilation peut orienter une recherche ; sans traçabilité, elle ne remplace pas les observations et méthodes originales.','Les points normaux sont des produits de mesure documentés. Ils se lisent avec leurs conventions et corrections.'][index]);});
    views([3.3,2,5],[1.7,.8,3.5],[0,-.25,0]);
    return finish({camera:[3.3,2,5],caption:'Galerie des sources · Article original, compilation et mesure archivée. L’identité et la traçabilité comptent ; le prestige du support ne suffit pas.',update(t){stamps.forEach((m,i)=>{const a=state(i);m.material.color.setHex(a===1?C.cyan:a===-1?C.red:0x365159);[article,anonymous,data][i].position.z=a===1?.18:0;});const latest=(panel?.querySelector('.out')?.textContent||'').trim();setText(status,latest.startsWith('Primaire')?'SOURCE PRIMAIRE · PROTOCOLE TRAÇABLE':latest.startsWith('Secondaire')?'Compilation : retrouver les observations originales':'AUTEURS · MÉTHODE · DONNÉES');}});
  }
  // Five different instruments compose the final synthesis, each responding to
  // its own pair of answers. A reset clears all of their illuminated bases.
  plinth(root,5.2,2.6);const mounts=[],leds=[];
  for(let i=0;i<5;i++){const g=group();g.position.set(-2+i,0,0);mounts.push(g);cyl(.41,.12,black,g,[0,-.98,0]);const led=tor(.38,.015,glow(0x294447),g,[0,-.9,0]);led.rotation.x=-Math.PI/2;leds.push(led);}
  const earth=kit.sphere(.25,0x4b8493,mounts[0]);earth.position.y=-.1;const moon=kit.sphere(.16,0xa8b4b5,mounts[0]);moon.position.set(.3,-.15,.4);bar([-.3,.1,-.3],[.3,-.15,.4],.007,C.gold,mounts[0]);text('OMBRE',[-2,-1.35,.6]);
  const tide=kit.sphere(.28,C.cyan,mounts[1]);tide.position.y=-.1;tide.scale.x=1.25;tor(.38,.012,brass,mounts[1],[0,-.1,0]);text('MARÉES',[-1,-1.35,.6]);
  const p=pendulum(mounts[2],.4);p.group.position.y=-.52;text('FOUCAULT',[0,-1.35,.6]);
  const route=tor(.3,.028,cyan,mounts[3],[0,-.12,0]);route.rotation.x=.6;const plane=group(mounts[3]);box(.08,.06,.3,ivory,plane);box(.3,.03,.08,ivory,plane);text('TRAJET',[1,-1.35,.6]);
  const l=laser(mounts[4],true);l.group.scale.setScalar(.32);l.group.position.y=-.62;l.satellite.position.set(.2,.2,.1);l.satellite.scale.setScalar(.6);l.beam.visible=false;l.packet.visible=false;l.returnPacket.visible=false;text('LASER',[2,-1.35,.6]);
  const scoreLabel=text('CINQ TESTS · UNE SYNTHÈSE',[0,1.2,0],C.white);
  const correctAnswers=[0,2,5,7,8];
  const titles=['Ombre terrestre','Forces de marée','Foucault à l’équateur','Trajet Sydney–Santiago','Télémétrie laser'];
  const explanations=['Le modèle montre le mécanisme d’une ombre, pas une observation d’éclipse.','Les marées répondent à un gradient de gravitation. Le renflement représenté est amplifié.','À l’équateur, le modèle idéal ne présente pas de précession du plan.','Une route se compare aux distances et aux prévisions d’un modèle géographique.','SLR est une technique de mesure de distance. Le satellite passif renvoie les impulsions.'];
  mounts.forEach((object,index)=>{explain(object,titles[index],explanations[index]);action(object,'Répondre par le mécanisme : '+titles[index],()=>chooseAnswer(correctAnswers[index]));});
  views([4,2.6,6.2],[1.2,1.3,4.8],[0,-.3,0]);
  return finish({camera:[4,2.6,6.2],focus:[0,-.2,0],caption:'Galerie finale · Cinq mécanismes différents, cinq réponses indépendantes. Les objets sont des modèles explicatifs, pas des données observées.',update(t){p.update(t,false);earth.rotation.y=t*.09;plane.position.set(Math.cos(t*.5)*.3,-.12+Math.sin(t*.5)*.2,Math.sin(t*.5)*.3);let score=0;leds.forEach((m,i)=>{const a=state(i*2),b=state(i*2+1),ok=a===1||b===1,wrong=a===-1||b===-1;score+=ok;m.material.color.setHex(ok?C.cyan:wrong?C.red:0x294447);m.material.emissive.setHex(ok?C.cyan:wrong?C.red:0x16282a);});setText(scoreLabel,`${score} / 5 · MÉCANISMES RELIÉS`);}});
}
