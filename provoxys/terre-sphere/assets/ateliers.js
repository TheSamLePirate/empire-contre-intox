
const CLAIMS = [
{tag:"horizon", t:"On ne voit pas la courbure / l’horizon monte à l’œil", o:"Rowbotham, Dubay, forums", e:"Faux. h≈d²/2R : 8 cm à 1 km, 8 m à 10 km. L’œil n’est pas un théodolite.", r:"1 calcul atelier A. 2 photo ballon. 3 phare qui « remonte » si tu gagnes de l’altitude."},
{tag:"horizon", t:"Les navires disparaissent par perspective, le zoom les ramène", o:"Dubay / vidéos zoom", e:"La perspective rétrécit l’objet entier. Un zoom n’invente pas la coque cachée. Les « retours » sont des mirages supérieurs.", r:"1 animation B. 2 Ptolémée Almageste I.4. 3 jour sans inversion vs Fata Morgana."},
{tag:"horizon", t:"8 inches per mile squared prouve un plat ou une trop grosse courbe", o:"slogan anglais", e:"C’est une approximation de d²/2R pour petits d, souvent mal convertie et appliquée à 1000 miles comme si c’était une flèche visible d’un jardin.", r:"1 atelier A. 2 domaine de validité d≪R. 3 réfraction 7/6 R."},
{tag:"horizon", t:"Skyline de Chicago vue du Michigan = Terre plate", o:"photos virales", e:"Mirage supérieur sur inversion thermique. Plus loin, la ville disparaît. Physics World / McIntyre.", r:"1 météo du jour. 2 distance + drop. 3 reproduction optique."},
{tag:"horizon", t:"Bedford Level 1838 a « prouvé » le plat", o:"Rowbotham", e:"Visée rase + réfraction. Wallace 1870 place les jalons plus haut : le médian dépasse. Rowbotham refuse le protocole.", r:"1 récit Wallace. 2 théodolite moderne. 3 modèle de réfraction."},
{tag:"soleil", t:"Ératosthène marche aussi avec un Soleil proche sur un disque", o:"modèles FE contemporains", e:"Un Soleil à 5 000 km changerait de diamètre apparent de façon brutale. On mesure ~32′ quasi constant.", r:"1 filtre solaire. 2 parallaxe diurne nulle à cette échelle. 3 éclipses."},
{tag:"soleil", t:"Le Soleil se couche par perspective / projecteur", o:"cartes AE + spot", e:"Sur l’AE le Soleil ne passe jamais sous le plan. Un spot n’a pas de bord net ni de retour par gain d’altitude.", r:"1 atelier F. 2 monter après le coucher. 3 Soleil de minuit."},
{tag:"soleil", t:"Le Soleil et la Lune ont la même taille donc ils sont à la même distance", o:"forums", e:"Même diamètre apparent (~30–32′) ≠ même distance. Éclipses anulaires vs totales le prouvent. Parallaxe lunaire mesurable en une nuit.", r:"1 éclipse annulaire. 2 occultations. 3 missions lunaires / laser rétro."},
{tag:"soleil", t:"La Lune est une projection / une hologramme", o:"variantes FE", e:"On vise la Lune au laser depuis 1969 (Apollo reflectors) et on photométrise des cratères. Une projection n’a pas de parallaxe ni de libration.", r:"1 libration binoculaire. 2 LLR. 3 occultation d’une étoile."},
{tag:"ciel", t:"Polaris est toujours là, donc pas de boule", o:"hémisphère nord seulement", e:"Polaris a une hauteur ≈ latitude. Invisible sous l’équateur. Croix du Sud au sud.", r:"1 appel Lille vs La Réunion. 2 atelier G. 3 catalogues Gaia."},
{tag:"ciel", t:"Les étoiles sont sur un dôme à quelques milliers de km", o:"firmament FE", e:"Parallaxes Hipparcos/Gaia en millièmes de seconde d’arc. Un dôme proche donnerait des parallaxes énormes et un décalage d’heure stellaire faux.", r:"1 Gaia DR3. 2 jour sidéral 23h56. 3 occultations."},
{tag:"ciel", t:"L’ombre d’une éclipse lunaire peut être ronde même avec un disque", o:"objection classique", e:"Un disque ne projette un cercle que s’il est face à la Lune à chaque éclipse. Or les éclipses arrivent à toutes les heures sidérales : l’ombre reste un arc de cercle.", r:"1 archives d’éclipses. 2 largeur d’ombre ~2,6 diamètres lunaires. 3 géométrie 3D."},
{tag:"phys", t:"L’eau est plate donc la Terre est plate", o:"slogan", e:"L’eau suit une équipotentielle. Localement « plate » sur 100 m, globale courbe. Les écarts géoïde–ellipsoïde sont de l’ordre de dizaines de mètres, jusqu’à environ cent mètres.", r:"1 Bedford contrôlé. 2 altimétrie Jason. 3 module marées."},
{tag:"phys", t:"La gravité n’existe pas, seulement densité / flottabilité", o:"Dubay", e:"La flottabilité présuppose un poids (Archimède : poussée = poids du fluide déplacé). Sans g, pas de « haut » ni de sédimentation.", r:"1 cavendish / Eötvös. 2 orbites. 3 marées 1/r³."},
{tag:"phys", t:"Si ça tourne à 1670 km/h on devrait s’envoler", o:"forums", e:"On sent les accélérations, pas les vitesses. Air, sol, avion co-rotent. Reste Coriolis, Eötvös, Foucault.", r:"1 train à 300 km/h. 2 gyrolaser 15,04°/h. 3 module Hafele–Keating."},
{tag:"phys", t:"Les gyroscopes d’avion ne voient pas 15°/h", o:"pilotes cités hors contexte", e:"Les INS compensent précisément cette dérive (earth-rate). Les gyrolasers de labo la mesurent (Sagnac).", r:"1 notice INS. 2 Wettzell. 3 Foucault public."},
{tag:"phys", t:"Les avions ne baissent pas le nez donc pas de boule", o:"argument pilote FE", e:"La correction est ~0,0022°/s, tenue par le pilote auto sur une surface isobare qui enveloppe le globe.", r:"1 manuel de navigation. 2 altitude pression. 3 routes orthodromiques."},
{tag:"vol", t:"Les vols sud-sud sont impossibles / truqués", o:"carte AE", e:"Durées et carburant = orthodromie ~8 000–12 000 km, pas les 20–30 000 km de l’AE.", r:"1 atelier H. 2 ADS-B. 3 plans de vol publics."},
{tag:"vol", t:"On ne peut pas aller en Antarctique, mur de glace, traité secret", o:"Shenton / Johnson / YouTube", e:"Traité 1959 = démilitarisation, pas interdit. ~100 000 visiteurs/an. Bases Concordia, DDU, McMurdo, pôle.", r:"1 webcams IPEV. 2 vols. 3 nuit polaire de 6 mois au pôle Sud."},
{tag:"vol", t:"Personne n’a fait pôle à pôle", o:"variante", e:"Circumnavigations polaires GPS (One More Orbit 2019, jets d’affaires). Distances cohérentes avec ~40 000 km.", r:"1 traces GPS. 2 records homologués. 3 carburant."},
{tag:"espace", t:"Toutes les photos NASA sont du CGI", o:"Johnson dès les années 1960, relance web", e:"Non sequitur. Composites avoués ≠ tout est faux. AS17-148-22727 argentique. Himawari/GOES/Météosat hors NASA.", r:"1 EPIC du jour. 2 transit ISS amateur. 3 ballon lycée."},
{tag:"espace", t:"L’ISS est un ballon / un drone", o:"forums", e:"Magnitude, vitesse angulaire, période 92 min, Doppler ±3,6 kHz en 2 m, transits solaires photographiés par des indépendants.", r:"1 Heavens-Above. 2 radioamateur. 3 silhouette sur le Soleil."},
{tag:"espace", t:"Le GPS marche avec des antennes au sol, pas des satellites", o:"variante", e:"Un émetteur au sol n’explique pas 4+ horloges en visibilité mondiale, ni les corrections relativistes Hafele–Keating généralisées, ni les éphémérides de navigation diffusées.", r:"1 TLE + antenne. 2 module HK. 3 SLR."},
{tag:"espace", t:"On ne peut pas traverser la ceinture de Van Allen donc pas d’Apollo", o:"glissement Apollo → platisme", e:"Les ceintures se traversent en choisissant trajectoire et temps. De toute façon la forme de la Terre était mesurée 2 200 ans avant Apollo.", r:"1 dosimétrie Apollo. 2 satellites en GTO. 3 Ératosthène."},
{tag:"espace", t:"LAGEOS / lasers sont une fiction", o:"rare mais présent", e:"Stations ILRS civiles, dont Grasse. Temps de vol public. Les mesures sont confrontées entre stations indépendantes ; les points normaux et les corrections sont documentés.", r:"1 module LAGEOS. 2 ILRS. 3 J₂ + ITRF."}
];
function renderClaims(list){
  const box = document.getElementById('claims');
  box.innerHTML = list.map(c => `<div class="card claim3 searchhit show" data-tag="${c.tag}" data-text="${(c.t+' '+c.o).toLowerCase()}">
    <div class="col-intox"><strong>Intox</strong><p>${c.t}</p><p style="color:#9bb0c9">Origine type : ${c.o}</p></div>
    <div class="col-etat"><strong>État</strong><p>${c.e}</p></div>
    <div class="col-eci"><strong>Méthodes ECI</strong><p>${c.r}</p></div>
  </div>`).join('');
}
renderClaims(CLAIMS);
function filterClaims(tag){
  document.querySelectorAll('.chip').forEach(ch => ch.classList.toggle('on', ch.dataset.tag===tag));
  renderClaims(tag==='all'?CLAIMS:CLAIMS.filter(c=>c.tag===tag));
  searchClaims();
}
function searchClaims(){
  const q = (document.getElementById('qClaim').value||'').toLowerCase();
  document.querySelectorAll('#claims .searchhit').forEach(el=>{
    el.classList.toggle('show', !q || el.dataset.text.includes(q));
  });
}
const Rmean=6371;
function calcDrop(){
  const d=parseFloat(document.getElementById('dropD').value);
  const h=(d*d)/(2*Rmean);
  const miles=d/1.60934;
  const inches=8*miles*miles;
  const hFromSlogan=inches*0.0254/1000;
  document.getElementById('dropOut').textContent=
    `Formule sphère  h = d²/2R = ${(h*1000).toFixed(1)} m
`+
    `Slogan 8 in/mi² ≈ ${(hFromSlogan*1000).toFixed(1)} m sur cette distance
`+
    `Les deux coïncident à peu près en local. Le slogan n’est pas une « autre physique ».`;
}
function erato(){
  const th=parseFloat(document.getElementById('th').value);
  const d=parseFloat(document.getElementById('erD').value);
  const C=(360/th)*d;
  document.getElementById('erOut').textContent=`C = ${C.toFixed(0)} km  (méridien moderne ≈ 40008 km, écart ${(100*(C-40008)/40008).toFixed(1)} %).`;
}
function foucaud(){
  const lat=parseFloat(document.getElementById('lat').value);
  const rate=15.041*Math.sin(lat*Math.PI/180);
  const period=Math.abs(Math.sin(lat*Math.PI/180))<1e-6?Infinity:23.934469/Math.abs(Math.sin(lat*Math.PI/180));
  const sens=lat>0?'horaire (nord)':lat<0?'antihoraire (sud)':'nulle';
  document.getElementById('fouOut').textContent=`φ=${lat.toFixed(1)}°  Ωp=${rate.toFixed(2)} °/h   tour≈${isFinite(period)?period.toFixed(2)+' h':'∞'}   sens ${sens}`;
  const c=document.getElementById('fouCanvas'),ctx=c.getContext('2d');
  ctx.fillStyle='#081425';ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle='#3ad7ff';ctx.beginPath();ctx.arc(160,120,80,0,7);ctx.stroke();
  const a=(90-lat)*Math.PI/180;
  ctx.strokeStyle='#e8c15a';ctx.beginPath();ctx.moveTo(160,120);ctx.lineTo(160+80*Math.sin(a),120-80*Math.cos(a));ctx.stroke();
  const t=(Date.now()/1000)%20, ang=t*(rate||0.001)*Math.PI/180*8;
  ctx.save();ctx.translate(620,120);ctx.rotate(ang);ctx.strokeStyle='#ff4d5a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-80,0);ctx.lineTo(80,0);ctx.stroke();ctx.restore();
}
function horizon(){
  const h=parseFloat(document.getElementById('eye').value);
  const d=Math.sqrt(2*Rmean*(h/1000));
  document.getElementById('hzOut').textContent=`h=${h.toFixed(0)} m → horizon ≈ ${d.toFixed(1)} km`;
}
function spot(){document.getElementById('spotBox').style.setProperty('--sx', document.getElementById('sx').value+'%');}
function polaris(){
 const lat=Number(document.getElementById('plat').value);
 document.getElementById('polOut').textContent=lat>0?`Le pôle céleste nord est à ${lat.toFixed(1)}° au-dessus de l’horizon nord. Polaris en est proche, mais son altitude dépend aussi de l’heure sidérale et de la réfraction.`:lat<0?`Le pôle céleste nord est sous l’horizon. Le pôle céleste sud est à ${(-lat).toFixed(1)}° au-dessus de l’horizon sud. La visibilité de Polaris près de l’équateur demande aussi de tenir compte de la réfraction.`:'À l’équateur, les pôles célestes sont géométriquement sur l’horizon. Polaris est légèrement décalée du pôle nord.';
}
function drawMaps(){
  const c=document.getElementById('mapCanvas'),ctx=c.getContext('2d');
  ctx.fillStyle='#081425';ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle='#e8c15a';ctx.fillText('GLOBE — route courte',30,24);
  ctx.fillStyle='#ff4d5a';ctx.fillText('AE platiste — sud déchiré',480,24);
  ctx.strokeStyle='#3ad7ff';ctx.beginPath();ctx.arc(180,200,110,0,7);ctx.stroke();
  ctx.strokeStyle='#3dd68c';ctx.beginPath();ctx.arc(180,200,110,-0.9,0.2);ctx.stroke();
  ctx.strokeStyle='#e8c15a';ctx.beginPath();ctx.arc(620,200,130,0,7);ctx.stroke();
  ctx.strokeStyle='#ff4d5a';ctx.beginPath();ctx.moveTo(500,310);ctx.lineTo(740,318);ctx.stroke();
}
function calcTide(){
  const dM=parseFloat(document.getElementById('dMoon').value)*1e3;
  const dS=parseFloat(document.getElementById('dSun').value)*1e9;
  const MM=7.342e22, MS=1.98892e30, G=6.6743e-11, R=6.371e6;
  const aM=2*G*MM*R/(dM**3), aS=2*G*MS*R/(dS**3);
  document.getElementById('tideOut').textContent=
    `a_Lune = ${aM.toExponential(3)} m/s²
a_Soleil = ${aS.toExponential(3)} m/s²
rapport Lune/Soleil = ${(aM/aS).toFixed(2)}  (attendu ≈ 2.2)`;
}
function j2calc(){
  const i=parseFloat(document.getElementById('inc').value)*Math.PI/180;
  const a=parseFloat(document.getElementById('asat').value)*1000;
  const J2=1.0826e-3, R=6378137, mu=3.986004418e14;
  const n=Math.sqrt(mu/(a**3));
  const dO=-1.5*n*J2*((R/a)**2)*Math.cos(i);
  const degJ=dO*180/Math.PI*86400;
  document.getElementById('j2Out').textContent=
    `i=${(i*180/Math.PI).toFixed(1)}°  a=${(a/1000).toFixed(0)} km
`+
    `dΩ/dt ≈ ${degJ.toFixed(3)} °/jour
`+
    `Héliosynchrone visé ~ +0.986°/jour : on règle i près de 98° en LEO.`;
}
function hk(){
  const e=document.getElementById('hkSel').value==='e';
  document.getElementById('hkOut').textContent=e?
    `Est : prédit −40±23 ns, mesuré −59±10 ns. Sens : les horloges perdent (vitesse s’ajoute à la rotation).`:
    `Ouest : prédit +275±21 ns, mesuré +273±7 ns. Sens : on « remonte » le courant de rotation + on gagne encore le terme d’altitude.`;
}
function slr(){
  const rho=parseFloat(document.getElementById('rho').value)*1000;
  const tau=2*rho/299792458;
  document.getElementById('slrOut').textContent=`τ = 2ρ/c = ${(tau*1e3).toFixed(3)} ms  (${(tau*1e9).toFixed(0)} ns). Une erreur de 1 ns sur le temps aller-retour correspond à ≈15 cm sur la distance station−satellite.`;
}
calcDrop();erato();foucaud();horizon();polaris();drawMaps();calcTide();j2calc();hk();slr();spot();



function wsIntro(){
  const phi= +document.getElementById('intro-phi').value;
  const v=1674*Math.cos(phi*Math.PI/180);
  const drop10=100/(2*6371);
  document.getElementById('intro-out').textContent=
    'φ = '+phi.toFixed(2)+'°\n'+
    'v = 1674 × cos φ = '+v.toFixed(1)+' km/h\n'+
    'en 1 h la matière au sol parcourt '+v.toFixed(1)+' km vers l’est (référentiel inertiel)\n'+
    'drop sur 10 km : d²/2R = '+ (drop10*1000).toFixed(2)+' m (indépendant de φ au premier ordre)';
}
function wsHist(){
  const s=+document.getElementById('his-stade').value;
  const th=+document.getElementById('his-th').value;
  const d=+document.getElementById('his-d').value;
  const Cstad=d*(360/th);
  const Ckm=Cstad*s/1000;
  const modern=40007.863;
  const err=100*(Ckm-modern)/modern;
  document.getElementById('his-out').textContent=
    'C = '+Cstad.toFixed(0)+' stades = '+Ckm.toFixed(1)+' km\n'+
    'méridien WGS 84 = 40007.9 km\nécart = '+err.toFixed(2)+' %';
}
function wsPlat(){
  const phi=+document.getElementById('pl-phi').value*Math.PI/180;
  const k=(Math.PI/2-phi)/Math.cos(phi);
  document.getElementById('pl-out').textContent=
    'facteur d’étirement AE k = (π/2−φ)/cosφ = '+k.toFixed(3)+'\n'+
    'Un petit segment est-ouest sur ce parallèle est étiré ×'+k.toFixed(2)+'. Ce facteur local ne donne pas une durée de vol.';
}
function wsFes(){
 const lat=+document.getElementById('fes-lat').value,phi=-lat*Math.PI/180,R=6371;
 const ae=2*Math.PI*R*(Math.PI/2-phi),globe=2*Math.PI*R*Math.cos(phi);
 document.getElementById('fes-out').textContent=`Latitude ${lat}°S
Parallèle sur le globe : ${globe.toFixed(0)} km
Parallèle sur carte AE : ${ae.toFixed(0)} km
Étirement : ×${(ae/globe).toFixed(2)}. Le littoral réel est une autre courbe.`;
}
function quizP(btn,ok){
  document.getElementById('per-out').textContent= ok? 'Oui : Foucault mesure Ω sin φ. Les autres nombres sont Ératosthène et Hafele–Keating.':'Non. Réessaie.';
  btn.className='quizbtn '+(ok?'ok':'ko');
}
function quizC(btn,ok){
  document.getElementById('ch-out').textContent= ok? 'Oui : International Laser Ranging Service, stations dans plusieurs pays.':'Non.';
  btn.className='quizbtn '+(ok?'ok':'ko');
}
function wsExp(){
  const h=+document.getElementById('ex-h').value;
  const R=6371000;
  const d=Math.sqrt(2*R*h + h*h)/1000;
  document.getElementById('ex-out').textContent=
    'h = '+h+' m\nhorizon géométrique d ≈ '+d.toFixed(2)+' km\navec réfraction k=0.13 : '+ (d*Math.sqrt(1/0.87)).toFixed(2)+' km';
}
function wsForm(){
  const d=+document.getElementById('fo-d').value;
  const R=6371;
  const approx=d*d/(2*R);
  const exact=d*d/(R+Math.sqrt(R*R-d*d));
  document.getElementById('fo-out').textContent=
    'approx d²/2R = '+(approx*1000).toFixed(2)+' m\n'+
    'exact R−√(R²−d²) = '+(exact*1000).toFixed(2)+' m';
}
function wsTide(){
  const f=+document.getElementById('ma-r').value;
  const aL=1.1e-6/Math.pow(f,3);
  document.getElementById('ma-out').textContent=
    'r = '+f.toFixed(2)+' × r réelle\n'+
    'a_Lune ∝ 1/r³ = '+(aL*1e6).toFixed(3)+' µm/s²\n'+
    'rapport au Soleil (~0.50 µm/s²) = '+(aL/5.0e-7).toFixed(2);
}
function wsJ2(){
  const h=+document.getElementById('j2-h').value;
  const i=+document.getElementById('j2-i').value*Math.PI/180;
  const R=6378.137, a=R+h, GM=398600.4418;
  const n=Math.sqrt(GM/(a*a*a));
  const J2=1.08262668e-3;
  const omdot=-1.5*n*J2*Math.pow(R/a,2)*Math.cos(i);
  const degday=omdot*86400*180/Math.PI;
  document.getElementById('j2-out').textContent=
    'a = '+a.toFixed(1)+' km\n'+
    'Ω̇ = '+degday.toFixed(3)+' °/jour\n'+
    (Math.abs(degday)<1e-9?'Orbite polaire : précession nodale J₂ nulle dans cette approximation.':'tour de nœud en '+(360/Math.abs(degday)).toFixed(1)+' jours');
}
function wsHK(){
  const vg=+document.getElementById('hk-v').value;
  const hours=+document.getElementById('hk-t').value;
  const vrot=465;
  const v=vrot+vg;
  const c=299792458;
  const t=hours*3600;
  const sr=-0.5*(v*v-vrot*vrot)/(c*c)*t*1e9;
  const gr=9.81*10000/(c*c)*t*1e9;
  document.getElementById('hk-out').textContent=
    'v inertielle ≈ '+v.toFixed(0)+' m/s\n'+
    'Différence SR avion−sol ≈ '+sr.toFixed(1)+' ns\n'+
    'GR (altitude fixe 10 km) ≈ '+gr.toFixed(1)+' ns\n'+
    'Total simplifié ≈ '+(sr+gr).toFixed(1)+' ns sur '+hours+' h\n'+
    (vg>=0? 'vers l’est : SR plus fort, horloge retarde':'vers l’ouest : SR plus faible');
}
function wsLag(){
  const rho=+document.getElementById('la-rho').value*1000;
  const dt=2*rho/299792458;
  document.getElementById('la-out').textContent=
    'Δt = 2ρ/c = '+(dt*1000).toFixed(3)+' ms\n'+
    '3 mm de ρ ↔ '+ (2*0.003/299792458*1e12).toFixed(1)+' ps';
}
function wsAntox(){
  const m={
    hor:'Test : photo calibrée depuis >10 km, focale connue, horizon centré. Écart sous la tangente ; contrôler les distorsions optiques.',
    eight:'Test : recalcule d=√(2Rh) avec ta hauteur d’œil, puis sors la visée de la réfraction rase (protocole Wallace).',
    ice:'Test : nuit polaire à Concordia / pôle Sud, vols et campagnes COMNAP, périmètre AE absurde (atelier FES).',
    cgi:'Test : Himawari-8 (Japon), Elektro-L (Russie), Galileo 1990, ballons amateurs. Plusieurs pays.',
    sun:'Test : taille angulaire du Soleil ~32′ constante dans la journée ; un spot à 5000 km gonflerait à midi et rétrécirait au soir.'
  };
  document.getElementById('an-out').textContent=m[document.getElementById('an-sel').value];
}
function visCheck(btn){
  btn.className='quizbtn ok';
}
function wsAtm(){
  const z=+document.getElementById('at-z').value;
  const P=Math.exp(-z/8.5);
  document.getElementById('at-out').textContent=
    'P/P0 ≈ e^(−z/H) = '+P.toFixed(3)+'  (H=8,5 km, isotherme)\nà 5,5 km on est déjà près de 50 %';
}
function wsGloss(){
  const m={geo:'géoïde',sid:'jour sidéral',sag:'flèche entre la corde et l’arc',j2:'J₂'};
  document.getElementById('gl-out').textContent='Terme : '+m[document.getElementById('gl-sel').value];
}
function quizS(btn,ok){
  document.getElementById('so-out').textContent=ok?'Primaire.':'Secondaire ou pamphlet. On s’en sert comme claim à tester, pas comme preuve.';
  btn.className='quizbtn '+(ok?'ok':'ko');
}
window._ctaScore=window._ctaScore||{};
function ctaQ(n,btn,ok){
  window._ctaScore[n]=ok?1:0;
  btn.className='quizbtn '+(ok?'ok':'ko');
  const s=Object.values(window._ctaScore).reduce((a,b)=>a+b,0);
  document.getElementById('cta-out').textContent='Score : '+s+'/5';
}
['wsIntro','wsHist','wsPlat','wsFes','wsExp','wsForm','wsTide','wsJ2','wsHK','wsLag','wsAntox','wsAtm','wsGloss'].forEach(fn=>{
  try{ window[fn] && window[fn](); }catch(e){}
});


function wsMT(){
  const n=+document.getElementById('mt-n').value;
  const sid=86164.0905, sol=86400;
  document.getElementById('mt-out').textContent=
    n+' jour(s) solaire(s) = '+(n*sol)+' s\n'+
    'en sidéral : '+(n*sol/sid).toFixed(5)+' tours\n'+
    'avance des étoiles : '+((n*sol-n*sid)/60).toFixed(2)+' min';
}
function wsML(){
  const s=+document.getElementById('ml-sid').value;
  const y=+document.getElementById('ml-yr').value;
  const syn=1/(1/s-1/y);
  document.getElementById('ml-out').textContent=
    'T_syn = '+syn.toFixed(6)+' j  (obs. 29.530589)';
}
function wsIT(){
  const q=+document.getElementById('it-q').value;
  const a=384399;
  const r=a/(q+1);
  const inside=r<6371;
  document.getElementById('it-out').textContent=
    'r⊕ = a/(q+1) = '+r.toFixed(0)+' km depuis le centre Terre\n'+
    (inside? 'à l’intérieur du globe':'à l’extérieur — ce n’est plus notre système');
}
try{wsMT();wsML();wsIT();}catch(e){}

function wsMS(){
  const phi=+document.getElementById('ms-phi').value;
  const dec=+document.getElementById('ms-dec').value;
  const co=90-Math.abs(dec);
  let msg;
  if(phi>=co && dec>0) msg='Soleil de minuit possible (hémisphère nord, été).';
  else if(phi<=-co && dec<0) msg='Soleil de minuit possible (hémisphère sud, été austral).';
  else if(phi>=co && dec<0) msg='Nuit polaire côté nord.';
  else if(phi<=-co && dec>0) msg='Nuit polaire côté sud — exactement l’inverse du modèle anneau AE.';
  else msg='Le Soleil se couche encore à cette latitude / date.';
  document.getElementById('ms-out').textContent=
    'φ='+phi.toFixed(2)+'°  δ='+dec.toFixed(2)+'°\nseuil |φ| > '+(90-Math.abs(dec)).toFixed(2)+'°\n'+msg;
}
function wsER(){
  const d=+document.getElementById('er-d').value;
  const h=+document.getElementById('er-h').value;
  const drop=d*d/(2*6371)*1000;
  const alpha=Math.acos(6371000/(6371000+h));
  const reach=2*6371*alpha;
  const hidden=6371000/Math.cos(Math.max(0,d/6371-alpha))-6371000;
  document.getElementById('er-out').textContent=
    'drop d²/2R = '+drop.toFixed(2)+' m\n'+
    'hauteur minimale de la cible visible ≈ '+hidden.toFixed(2)+' m\n'+
    'portée mutuelle à même hauteur '+h+' m ≈ '+reach.toFixed(2)+' km\n'+
    (d>reach? 'cible de même hauteur masquée sans réfraction.':'cible de même hauteur visible dans le modèle sans réfraction.');
}
try{wsMS();wsER();}catch(e){}


// UI lifecycle and validation for the original workshops. No hidden media loops.
window.eciMotionPaused = matchMedia('(prefers-reduced-motion: reduce)').matches;
const initialValues = new Map([...document.querySelectorAll('.lab-panel input,.lab-panel select')].map(el => [el, el.value]));
const updateRanges=()=>document.querySelectorAll('input[type=range]').forEach(el=>{const out=el.nextElementSibling;if(out?.matches('.range-value'))out.value=Number(el.value).toLocaleString('fr-FR');});
function setPeda(btn){
 const mode=btn.dataset.peda;document.body.dataset.reading=mode;
 document.querySelectorAll('[data-peda]').forEach(b=>{b.classList.toggle('on',b===btn);b.setAttribute('aria-pressed',b===btn?'true':'false');});
 document.querySelectorAll('.reading-fold').forEach(d=>d.open=mode==='lycee');
 document.getElementById('peda-status').textContent={doute:'Les idées clés et les ateliers, puis les détails à votre rythme.',college:'Les mécanismes et les ateliers ; ouvrez les calculs quand vous le souhaitez.',lycee:'Tous les développements ouverts : protocoles, formules et références.'}[mode];
 window.repaintHD?.();
}
// Development remains available without losing content, at every reading level.
document.querySelectorAll('.deep:not(#lab23)').forEach(el=>{
 const d=document.createElement('details');d.className='reading-fold';const heading=el.querySelector('h3');const sum=document.createElement('summary');sum.textContent=heading?.textContent||'En profondeur';heading?.remove();d.append(sum);el.replaceWith(d);d.append(el);
});
document.body.dataset.reading='doute';
// No exception swallowing: invalid inputs have a visible, specific response.
const validators={wsHist:['his-stade','his-th','his-d'],wsForm:['fo-d'],erato:['th','erD'],calcDrop:['dropD'],calcTide:['dMoon','dSun'],j2calc:['asat'],slr:['rho'],wsML:['ml-sid','ml-yr'],wsER:['er-d','er-h']};
for(const [name,ids] of Object.entries(validators)){
 const original=window[name];if(!original)continue;
 window[name]=function(...args){
  const fields=ids.map(id=>document.getElementById(id));const invalid=fields.find(el=>!el.value.trim()||!Number.isFinite(Number(el.value))||!el.checkValidity());
  if(invalid){const out=invalid.closest('.lab-panel').querySelector('.out,.result');if(out)out.textContent='Saisissez une valeur valide entre '+invalid.min+' et '+invalid.max+'.';return;}
  if(name==='wsML'&&Number(fields[0].value)>=Number(fields[1].value)){fields[0].closest('.lab-panel').querySelector('.out').textContent='Le mois sidéral doit être plus court que l’année sidérale.';return;}
  original(...args);window.repaintHD?.();
 };
}
// Corrected result statements for singularities and illustrative assumptions.
window.wsMS=function(){
 const phi=+document.getElementById('ms-phi').value,dec=+document.getElementById('ms-dec').value;
 const p=phi*Math.PI/180,d=dec*Math.PI/180,A=Math.sin(p)*Math.sin(d),B=Math.cos(p)*Math.cos(d);
 let msg;
 if(Math.abs(B)<1e-12){msg=Math.abs(A)<1e-12?'À l’équinoxe au pôle, le centre du Soleil reste géométriquement sur l’horizon.':A>0?'Jour polaire.':'Nuit polaire.';}
 else if(A-B>1e-12)msg='Jour polaire : le centre du Soleil reste au-dessus de l’horizon.';
 else if(A+B< -1e-12)msg='Nuit polaire : le centre du Soleil reste sous l’horizon.';
 else {const h=Math.acos(Math.max(-1,Math.min(1,-A/B)));msg='Durée géométrique du jour : '+(24*h/Math.PI).toFixed(2)+' h.';}
 document.getElementById('ms-out').textContent=`Latitude ${phi.toFixed(2)}° · Déclinaison ${dec.toFixed(2)}°\n${msg}\nModèle : centre solaire ponctuel, sans réfraction ni relief.`;window.repaintHD?.();
};
window.visCheck=function(btn){btn.classList.toggle('ok');btn.setAttribute('aria-pressed',btn.classList.contains('ok'));const n=btn.closest('.lab-panel').querySelectorAll('.quizbtn.ok').length;document.getElementById('vi-out').textContent=`Contrôles renseignés : ${n}/4. Leur présence aide à documenter l’image ; elle ne suffit pas à valider sa géométrie.`;};
window.ctaQ=function(n,btn,ok){window._ctaScore[n]=ok?1:0;let prev=btn.previousElementSibling;let next=btn.nextElementSibling;btn.className='quizbtn '+(ok?'ok':'ko');if(prev?.matches('button'))prev.className='quizbtn';if(next?.matches('button'))next.className='quizbtn';const score=Object.values(window._ctaScore).reduce((a,b)=>a+b,0);document.getElementById('cta-out').textContent=(ok?'Bonne réponse. ':'Réponse à revoir. ')+`Score : ${score}/5 · ${Object.keys(window._ctaScore).length}/5 réponses renseignées.`;};
const Q23=[
 ['À Tromsø en juin, le Soleil de minuit s’explique par…',['Un effet météorologique','La latitude et la déclinaison solaire'],1,'L’inclinaison de l’axe permet au Soleil de rester au-dessus de l’horizon.'],
 ['L’analemme dépend de…',['L’obliquité et l’excentricité orbitale','La couverture nuageuse'],0,'L’équation du temps et la déclinaison font varier la position à heure fixe.'],
 ['Le Saros décrit…',['Une récurrence de géométrie des éclipses','La distance du Soleil'],0,'Les mois synodique, draconitique et anomalistique sont presque commensurables.'],
 ['Un gyroscope mesure une composante de…',['La rotation terrestre selon son orientation','La forme de l’horizon photographié'],0,'La projection de la vitesse angulaire sur son axe sensible détermine le signal.'],
 ['Une observation au ras de l’eau exige de contrôler…',['La réfraction et les hauteurs','La couleur de l’eau'],0,'Les gradients thermiques peuvent dévier le rayon lumineux.'],
 ['La précision millimétrique SLR concerne…',['Chaque photon depuis 1976','Des points normaux modernes et des corrections'],1,'Un résultat précis combine des observations et un modèle de propagation.']
];
window._q23=0;window._s23=0;let answered23=false;
function show23(){const q=Q23[window._q23];document.getElementById('q23n').textContent=window._q23+1;document.getElementById('q23t').textContent=q[0];['q23a','q23b'].forEach((id,i)=>{const b=document.getElementById(id);b.textContent=q[1][i];b.disabled=false;b.className='quizbtn';});answered23=false;document.getElementById('q23-next').hidden=true;}
function ans23(i){if(answered23)return;answered23=true;const q=Q23[window._q23],ok=i===q[2];if(ok)window._s23++;['q23a','q23b'].forEach((id,k)=>{const b=document.getElementById(id);b.disabled=true;b.className='quizbtn '+(k===q[2]?'ok':k===i?'ko':'');});document.getElementById('q23o').textContent=(ok?'Bonne réponse. ':'Réponse à revoir. ')+q[3]+` Score : ${window._s23}/${window._q23+1}.`;const next=document.getElementById('q23-next');next.hidden=false;next.textContent=window._q23===5?'Recommencer le quiz':'Question suivante →';}
const next23=document.createElement('button');next23.id='q23-next';next23.type='button';next23.className='ghost';next23.hidden=true;next23.onclick=()=>{if(window._q23===5){window._q23=0;window._s23=0;document.getElementById('q23o').textContent='Nouveau quiz : score 0/6.';}else window._q23++;show23();};document.getElementById('q23o').after(next23);show23();
document.querySelectorAll('.lab-reset').forEach(btn=>btn.addEventListener('click',()=>{const panel=btn.closest('.lab-panel');panel.querySelectorAll('input,select').forEach(el=>{el.value=initialValues.get(el)??el.defaultValue;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));});panel.querySelectorAll('.quizbtn').forEach(b=>{b.classList.remove('ok','ko');b.disabled=false;});if(panel.contains(document.getElementById('cta-out'))){window._ctaScore={};document.getElementById('cta-out').textContent='Score : 0/5';}const calculate=panel.querySelector('button[onclick]:not(.quizbtn)');if(calculate)calculate.click();updateRanges();window.repaintHD?.();}));
const motionBtn=document.getElementById('motion-toggle');function updateMotion(){motionBtn.textContent=window.eciMotionPaused?'Reprendre les animations':'Pause des animations';motionBtn.setAttribute('aria-pressed',String(window.eciMotionPaused));document.body.classList.toggle('motion-paused',window.eciMotionPaused);document.dispatchEvent(new CustomEvent('eci-motion-change',{detail:{paused:window.eciMotionPaused}}));window.repaintHD?.();}motionBtn.addEventListener('click',()=>{window.eciMotionPaused=!window.eciMotionPaused;updateMotion();});updateMotion();
document.addEventListener('input',e=>{if(e.target.matches('input')){updateRanges();window.repaintHD?.();}});
// Render readable math using the shared symbol annotations.
document.querySelectorAll('[data-tex]').forEach(el=>{if(!window.katex)return;try{katex.render(el.dataset.tex,el,{displayMode:el.classList.contains('formula'),throwOnError:true,trust:c=>c.command==='\\htmlData',strict:c=>c==='htmlExtension'?'ignore':'warn'});}catch(err){el.classList.add('math-error');console.error('Formule invalide',el.dataset.tex,err);}});
let scrollQueued=false;addEventListener('scroll',()=>{if(scrollQueued)return;scrollQueued=true;requestAnimationFrame(()=>{const d=document.documentElement,max=d.scrollHeight-innerHeight;document.getElementById('reading-progress').style.width=(max>0?100*scrollY/max:0)+'%';scrollQueued=false;});},{passive:true});
// More useful searching includes the explanation and the protocol; category stays combined.
if(!document.getElementById('qClaim')){const label=document.createElement('label');label.htmlFor='qClaim';label.textContent='Rechercher une affirmation ou un protocole';const input=document.createElement('input');input.type='search';input.id='qClaim';input.placeholder='Horizon, gravité, Polaris…';input.addEventListener('input',()=>searchClaims());document.getElementById('claims').before(label,input);}
let activeClaimTag='all';const normalizeSearch=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
window.filterClaims=function(tag){activeClaimTag=tag;document.querySelectorAll('.chip').forEach(b=>{b.classList.toggle('on',b.dataset.tag===tag);b.setAttribute('aria-pressed',String(b.dataset.tag===tag));});searchClaims();};
window.searchClaims=function(){const q=normalizeSearch(document.getElementById('qClaim').value||'');const list=CLAIMS.filter(c=>(activeClaimTag==='all'||c.tag===activeClaimTag)&&normalizeSearch(c.t+' '+c.o+' '+c.e+' '+c.r).includes(q));renderClaims(list);document.getElementById('claim-count').textContent=list.length+' résultat'+(list.length>1?'s':'');if(!list.length){const p=document.createElement('p');p.className='empty-state';p.textContent='Aucun résultat. Essayez « horizon », « gravité » ou une autre catégorie.';document.getElementById('claims').append(p);}};
const claimCount=document.createElement('p');claimCount.id='claim-count';claimCount.setAttribute('aria-live','polite');document.getElementById('claims').before(claimCount);searchClaims();
// Recompute after validated wrappers and corrected implementations are in place.
['wsIntro','wsHist','wsPlat','wsFes','wsExp','wsForm','wsTide','wsJ2','wsHK','wsLag','wsAntox','wsAtm','wsGloss','wsMT','wsML','wsIT','wsMS','wsER'].forEach(fn=>window[fn]?.());updateRanges();
// The ship readout uses surface arc distance and exact spherical line-of-sight geometry.
function updateShip(){const d=Number(document.getElementById('ship-distance').value),h=Number(document.getElementById('ship-eye').value),R=6371000,alpha=Math.acos(R/(R+h)),beta=Math.max(0,d*1000/R-alpha),hidden=R/Math.cos(beta)-R;document.getElementById('ship-out').textContent=`Distance ${d.toFixed(1)} km · Œil ${h.toFixed(0)} m\nHorizon au sol : ${(R*alpha/1000).toFixed(2)} km\nHauteur masquée : ${hidden.toFixed(2)} m ; visible sur un navire de 20 m : ${Math.max(0,20-hidden).toFixed(2)} m.\nSans réfraction ; échelle verticale du dessin amplifiée.`;}
['ship-distance','ship-eye'].forEach(id=>document.getElementById(id).addEventListener('input',updateShip));updateShip();
function updateShadowModels(){const height=Number(document.getElementById('shadow-height').value),third=Number(document.getElementById('shadow-third').value),latitudes=[0,7.2,third],R=6371;const rows=latitudes.map((latitude,i)=>{const d=R*latitude*Math.PI/180,flat=Math.atan(d/height)*180/Math.PI;return {i:i+1,d,latitude,flat,error:flat-latitude};});document.getElementById('shadow-table').innerHTML=rows.map(v=>`<tr><td>Site ${v.i}</td><td>${v.d.toFixed(1)} km</td><td>${v.latitude.toFixed(2)}°</td><td>${v.flat.toFixed(2)}°</td></tr>`).join('');document.getElementById('shadow-out').textContent=`Un seul Soleil à ${height.toLocaleString('fr-FR')} km de hauteur.\nÉcart au site 2 : ${rows[1].error.toFixed(2)}° ; au site 3 : ${rows[2].error.toFixed(2)}°.\nAjuster deux angles contraint le modèle ; le troisième teste sa prédiction.`;}
['shadow-height','shadow-third'].forEach(id=>document.getElementById(id).addEventListener('input',updateShadowModels));document.querySelector('#shadow-models .lab-reset').addEventListener('click',updateShadowModels);updateShadowModels();

// The shared visit API exists on the published service, not on static localhost previews.
if(['empire-contre-intox.com','www.empire-contre-intox.com','thesamlepirate.github.io'].includes(location.hostname)){const original=document.querySelector('[data-production-counter]');const script=document.createElement('script');script.src=original.getAttribute('src');script.defer=true;document.head.append(script);}else{const counter=document.querySelector('[data-visit-counter]');if(counter)counter.hidden=true;}
