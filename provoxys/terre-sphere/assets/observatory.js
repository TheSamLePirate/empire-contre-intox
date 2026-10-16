/* Local Three.js observatory. Geometry is an explanatory model, not observational evidence. */
const host = document.getElementById('earth-observatory');
const slot = document.getElementById('observatory-controls');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const defaults = { hour: 12, tilt: 23.44, flatten: 1, season: 45 };
const state = { ...defaults, running: !motion.matches, visible: false };
let api = null;
const fallback = () => {
  host.dataset.renderer = 'fallback';
  host.innerHTML = `<svg viewBox="0 0 600 500" role="img" aria-labelledby="obs-svg-title obs-svg-desc"><title id="obs-svg-title">Schéma de la Terre éclairée</title><desc id="obs-svg-desc">Une moitié du globe est éclairée par le Soleil. L’axe est incliné. Ce schéma géométrique ne constitue pas une preuve.</desc><defs><linearGradient id="obs-shade"><stop stop-color="#164b59"/><stop offset=".5" stop-color="#195462"/><stop offset=".51" stop-color="#08161d"/><stop offset="1" stop-color="#08161d"/></linearGradient></defs><g transform="translate(300 245) rotate(-23.44)" id="obs-fallback-body"><ellipse rx="154" ry="154" fill="url(#obs-shade)" stroke="#77d5df" stroke-width="1.5" id="obs-fallback-earth"/><ellipse rx="154" ry="40" fill="none" stroke="#77d5df" opacity=".45"/><ellipse rx="62" ry="154" fill="none" stroke="#77d5df" opacity=".45"/><path d="M0-201V201" stroke="#efaf78" stroke-dasharray="5 7"/><text y="-215" text-anchor="middle" fill="#efaf78" font-size="13">N</text></g><path d="M20 190h80m-20-10 20 10-20 10M20 245h80m-20-10 20 10-20 10M20 300h80m-20-10 20 10-20 10" stroke="#efaf78" fill="none"/><text x="26" y="160" fill="#efaf78" font-size="13">LUMIÈRE</text><text x="300" y="465" text-anchor="middle" fill="#b5c4c5" font-size="13">Vue schématique · WebGL indisponible</text></svg>`;
  state.running = false;
  if(slot)slot.querySelector('.obs-live').textContent='SCHÉMA';
  if (slot) {
    slot.querySelector('[data-obs="pause"]').disabled = true;
    slot.querySelector('[data-obs="hour"]').disabled = true;
    slot.querySelector('[data-obs="season"]').disabled = true;
  }
  api = { update() {
    host.querySelector('#obs-fallback-body').setAttribute('transform', `translate(300 245) rotate(${-state.tilt})`);
    host.querySelector('#obs-fallback-earth').setAttribute('ry', 154 * (1 - state.flatten / 298.257223563));
  }, schedule() {}, reset() { state.running = false; } };
  update();
};
function update() {
  if (slot) {
    slot.querySelector('[data-value="hour"]').textContent = `${state.hour.toFixed(1)} h`;
    slot.querySelector('[data-value="tilt"]').textContent = `${state.tilt.toFixed(2).replace('.', ',')}°`;
    slot.querySelector('[data-value="flatten"]').textContent = `× ${state.flatten}`;
    slot.querySelector('[data-value="season"]').textContent = `${Math.round(state.season)}°`;
    const button = slot.querySelector('[data-obs="pause"]');
    button.textContent = state.running ? 'Pause rotation' : 'Lancer la rotation';
    button.setAttribute('aria-pressed', String(state.running));
    slot.querySelector('[data-obs="note"]').textContent = state.flatten === 1 ? 'Aplatissement réel : 1 / 298,257. Presque imperceptible à cette échelle.' : `Aplatissement amplifié × ${state.flatten} : déformation volontaire pour la lecture.`;
  }
  api?.update();
}
async function initialize() {
  if (!host) return;
  host.setAttribute('aria-label', 'Observatoire 3D de la Terre : faire glisser pour changer le point de vue');
  if (slot) {
    slot.innerHTML = `<div class="obs-control-header"><span>EXPÉRIMENTER LE MODÈLE</span><span class="obs-live"><i></i> 3D</span></div><label class="obs-control">Rotation terrestre <output data-value="hour"></output><input data-obs="hour" type="range" min="0" max="24" step="0.1" value="12"></label><label class="obs-control">Obliquité de l’axe <output data-value="tilt"></output><input data-obs="tilt" type="range" min="0" max="45" step="0.01" value="23.44"></label><label class="obs-control">Aplatissement WGS 84 <output data-value="flatten"></output><input data-obs="flatten" type="range" min="1" max="60" step="1" value="1"></label><label class="obs-control">Position sur l’orbite <output data-value="season"></output><input data-obs="season" type="range" min="0" max="360" step="1" value="45"></label><p class="obs-note" data-obs="note"></p><div class="obs-actions"><button type="button" data-obs="pause"></button><button type="button" data-obs="reset">Réinitialiser</button></div><p class="obs-explainer">Glisser pour orbiter · molette pour zoomer · flèches sur le globe pour orienter la vue. Modèle géométrique éclairé : illustration, pas une photographie ni une preuve. Carte : composite NASA Blue Marble, janvier 2004. Halo atmosphérique, nuages et étoiles simulés pour la lecture, sans données météo. À 0°/180° : solstices ; à 90°/270° : équinoxes. Changer l’obliquité explore des Terres hypothétiques.</p>`;
    slot.querySelectorAll('input').forEach(input => input.addEventListener('input', () => {
      state[input.dataset.obs] = Number(input.value);
      if (input.dataset.obs === 'hour') state.running = false;
      update(); api?.schedule();
    }));
    slot.querySelector('[data-obs="pause"]').addEventListener('click', () => { state.running = !state.running; update(); api?.schedule(); });
    slot.querySelector('[data-obs="reset"]').addEventListener('click', () => {
      Object.assign(state, defaults, { running: !motion.matches });
      slot.querySelectorAll('input').forEach(input => { input.value = state[input.dataset.obs]; });
      api?.reset(); update(); api?.schedule();
    });
  }
  update();
  try {
    const THREE = await import('./vendor/three.module.js');
    const { OrbitControls } = await import('./vendor/OrbitControls.js');
    const gl=document.createElement('canvas');const context=gl.getContext('webgl2',{antialias:true,alpha:true});if(!context){fallback();return;}
    const renderer = new THREE.WebGLRenderer({ canvas:gl,context,antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio || 1, 1.5), 2.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    host.dataset.renderer = 'webgl';
    host.replaceChildren(renderer.domElement);
    const canvas = renderer.domElement;
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Globe terrestre en trois dimensions. Glisser ou utiliser les flèches pour orienter la vue. Réglages disponibles sous le globe.');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(39, 1, .1, 100);
    camera.position.set(0, .48, 3.75);
    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.minDistance = 2.5; controls.maxDistance = 6;
    controls.minPolarAngle = .2; controls.maxPolarAngle = Math.PI - .2;
    const axis = new THREE.Group(); scene.add(axis);
    const body = new THREE.Group(); axis.add(body);
    const material = new THREE.MeshPhysicalMaterial({ color: 0xb4d9df, roughness: .82, metalness: 0, clearcoat: .12, clearcoatRoughness: .24, ior: 1.333 });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(1, 192, 128), material); body.add(globe);
    const texture = new THREE.TextureLoader().load(new URL('./earth-nasa.jpg', import.meta.url).href, tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy());
      material.color.set(0xffffff); material.map = tex; material.needsUpdate = true;
      schedule();
    }, undefined, () => { host.dataset.texture = 'unavailable'; const note = document.createElement('p'); note.className = 'obs-texture-note'; note.textContent = 'Carte indisponible : sphéroïde géométrique sans continents.'; host.append(note); schedule(); });
    const gridMat = new THREE.LineBasicMaterial({ color: 0x77d5df, transparent: true, opacity: .075 });
    function line(points, mat = gridMat, parent = body) {
      const obj = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), mat); parent.add(obj); return obj;
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const a = lat * Math.PI / 180, r = Math.cos(a) * 1.005;
      line(Array.from({ length: 129 }, (_, i) => new THREE.Vector3(r * Math.cos(i / 128 * Math.PI * 2), Math.sin(a) * 1.005, r * Math.sin(i / 128 * Math.PI * 2))));
    }
    for (let lon = 0; lon < 180; lon += 30) {
      const a = lon * Math.PI / 180;
      line(Array.from({ length: 129 }, (_, i) => { const t = i / 128 * Math.PI * 2; return new THREE.Vector3(Math.sin(t) * Math.cos(a) * 1.005, Math.cos(t) * 1.005, Math.sin(t) * Math.sin(a) * 1.005); }));
    }
    const axisMat = new THREE.LineDashedMaterial({ color: 0xefaf78, dashSize: .055, gapSize: .045, transparent: true, opacity: .48 });
    line([new THREE.Vector3(0, -1.4, 0), new THREE.Vector3(0, 1.4, 0)], axisMat, axis).computeLineDistances();
    const ringMat = new THREE.LineBasicMaterial({ color: 0x526970, transparent: true, opacity: .22 });
    line(Array.from({ length: 193 }, (_, i) => new THREE.Vector3(1.6 * Math.cos(i / 192 * Math.PI * 2), 0, 1.6 * Math.sin(i / 192 * Math.PI * 2))), ringMat, scene);
    scene.add(new THREE.AmbientLight(0x83acc0, .12));
    const sunlight = new THREE.DirectionalLight(0xfff2df, 3.0); scene.add(sunlight);
    const sunMarker = new THREE.Mesh(new THREE.SphereGeometry(.036, 16, 12), new THREE.MeshBasicMaterial({ color: 0xefaf78 })); scene.add(sunMarker);
    // The ocean mask is a visual blue-channel heuristic on the NASA composite;
    // it changes only the material, never geography or the geometric controls.
    material.onBeforeCompile = shader => {
      shader.fragmentShader = shader.fragmentShader.replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
      float oceanMask = smoothstep(0.02, 0.20, diffuseColor.b - max(diffuseColor.r, diffuseColor.g * 0.82));
      roughnessFactor = mix(roughnessFactor, 0.28, oceanMask * 0.85);`);
    };
    material.customProgramCacheKey = () => 'eci-ocean-glint-v1';
    const opticalVertex = `varying vec3 vN; varying vec3 vEye; varying vec3 vLocal;
      void main(){vec4 p=modelViewMatrix*vec4(position,1.0);vN=normalize(normalMatrix*normal);vEye=-p.xyz;vLocal=position;gl_Position=projectionMatrix*p;}`;
    const sunView = new THREE.Vector3();
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms:{sunDirection:{value:sunView}},vertexShader:opticalVertex,
      fragmentShader:`uniform vec3 sunDirection; varying vec3 vN; varying vec3 vEye;
        void main(){vec3 n=normalize(vN);float rim=pow(1.0-abs(dot(n,normalize(vEye))),3.6);
        float light=smoothstep(-0.3,0.65,dot(n,normalize(sunDirection)));
        vec3 blue=mix(vec3(.035,.15,.30),vec3(.16,.59,1.0),light);
        gl_FragColor=vec4(blue,rim*(.06+.48*light));}`,
      transparent:true,depthWrite:false,side:THREE.BackSide,blending:THREE.AdditiveBlending
    });
    const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(1.045,160,96),atmosphereMaterial);body.add(atmosphere);
    const cloudMaterial=new THREE.ShaderMaterial({
      uniforms:{sunDirection:{value:sunView}},vertexShader:opticalVertex,
      fragmentShader:`uniform vec3 sunDirection;varying vec3 vN;varying vec3 vEye;varying vec3 vLocal;
        float hash(vec3 p){p=fract(p*.3183099+vec3(.11,.37,.53));p*=17.0;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
        float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
          return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
        float fbm(vec3 p){float n=0.0,a=.5;for(int i=0;i<5;i++){n+=a*noise(p);p=p*2.03+vec3(4.3,1.7,7.1);a*=.5;}return n;}
        void main(){vec3 p=normalize(vLocal);float warp=fbm(p*4.0);float wisps=fbm(p*16.0+vec3(warp*3.0));
          float coverage=smoothstep(.54,.72,wisps)*.48;float detail=smoothstep(.25,.75,fbm(p*61.0));
          float light=max(dot(normalize(vN),normalize(sunDirection)),0.0);
          vec3 color=mix(vec3(.065,.13,.18),vec3(.96,.98,1.0),pow(light,.5));
          gl_FragColor=vec4(color,coverage*(.55+.45*detail));}`,
      transparent:true,depthWrite:false,side:THREE.FrontSide
    });
    const clouds=new THREE.Mesh(new THREE.SphereGeometry(1.006,160,96),cloudMaterial);body.add(clouds);
    // A stable low-density star field. Seeded once: no per-frame randomness,
    // no astronomical catalogue claimed, and no motion when the globe is paused.
    let seed=731;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    const starPositions=[],starColors=[];
    for(let i=0;i<650;i++){const y=random()*2-1,a=random()*Math.PI*2,r=Math.sqrt(1-y*y),radius=30+random()*12;starPositions.push(r*Math.cos(a)*radius,y*radius,r*Math.sin(a)*radius);const brightness=.18+random()**3*.6;starColors.push(brightness*.8,brightness*.9,brightness);}
    const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(starPositions,3));starGeometry.setAttribute('color',new THREE.Float32BufferAttribute(starColors,3));
    const stars=new THREE.Points(starGeometry,new THREE.ShaderMaterial({vertexColors:true,transparent:true,depthWrite:false,
      vertexShader:`varying vec3 tint;void main(){tint=color;vec4 p=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*p;gl_PointSize=1.8;}`,
      fragmentShader:`varying vec3 tint;void main(){float d=length(gl_PointCoord-.5);float a=1.0-smoothstep(.15,.5,d);gl_FragColor=vec4(tint,a*.7);}`}));scene.add(stars);
    const glowCanvas=document.createElement('canvas');glowCanvas.width=128;glowCanvas.height=128;const ctx=glowCanvas.getContext('2d');
    const gradient=ctx.createRadialGradient(64,64,0,64,64,64);gradient.addColorStop(0,'rgba(255,244,215,1)');gradient.addColorStop(.08,'rgba(255,221,166,.8)');gradient.addColorStop(.25,'rgba(255,197,130,.15)');gradient.addColorStop(1,'rgba(255,185,100,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
    const sunGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(glowCanvas),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));sunGlow.scale.set(.6,.6,1);sunMarker.add(sunGlow);
    scene.add(new THREE.HemisphereLight(0x45738a,0x070a10,.10));
    let last = 0, scheduled = false;
    function render(time = 0) {
      scheduled = false;
      if (!state.visible || document.hidden) { last = 0; return; }
      if (state.running && !window.eciMotionPaused) {
        const delta = last ? Math.min((time - last) / 1000, .08) : 0;
        state.hour = (state.hour + delta * .3) % 24;
        if (slot) slot.querySelector('[data-obs="hour"]').value = state.hour;
        update();
      }
      last = time;
      camera.updateMatrixWorld();
      sunView.copy(sunlight.position).transformDirection(camera.matrixWorldInverse);
      renderer.render(scene, camera);
      if (state.running && !window.eciMotionPaused) schedule();
    }
    function schedule() { if (!scheduled && state.visible && !document.hidden) { scheduled = true; requestAnimationFrame(render); } }
    api = {
      schedule,
      update() {
        axis.rotation.z = -THREE.MathUtils.degToRad(state.tilt);
        body.rotation.y = state.hour / 24 * Math.PI * 2;
        body.scale.y = 1 - state.flatten / 298.257223563;
        const phase = THREE.MathUtils.degToRad(state.season);
        sunlight.position.set(Math.cos(phase) * 8, 0, Math.sin(phase) * 8);
        sunMarker.position.copy(sunlight.position).multiplyScalar(.2);
      },
      reset() { camera.position.set(0, .48, 3.75); controls.target.set(0, 0, 0); controls.update(); }
    };
    controls.addEventListener('change', schedule);
    canvas.addEventListener('keydown', event => {
      const angles = { ArrowLeft: -.12, ArrowRight: .12, ArrowUp: -.1, ArrowDown: .1 };
      if (!(event.key in angles)) return;
      event.preventDefault();
      const spherical = new THREE.Spherical().setFromVector3(camera.position);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') spherical.theta += angles[event.key];
      else spherical.phi = THREE.MathUtils.clamp(spherical.phi + angles[event.key], .2, Math.PI - .2);
      camera.position.setFromSpherical(spherical); controls.update(); schedule();
    });
    new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); schedule();
    }).observe(host);
    new IntersectionObserver(entries => { state.visible = entries[0].isIntersecting; last = 0; schedule(); }, { threshold: .05 }).observe(host);
    document.addEventListener('visibilitychange', () => { last = 0; schedule(); });
    document.addEventListener('eci-motion-change', () => { last=0; schedule(); });
    motion.addEventListener('change', () => { if (motion.matches) state.running = false; update(); schedule(); });
    canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); renderer.dispose(); controls.dispose(); texture.dispose(); fallback(); });
    update();
  } catch (error) { console.warn('Observatoire : vue schématique disponible.', error); fallback(); }
}
initialize();
