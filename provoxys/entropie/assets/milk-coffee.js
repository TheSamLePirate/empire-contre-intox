(() => {
  'use strict';

  const canvas = document.getElementById('milkCanvas');
  const section = document.getElementById('hero-simulation');
  const fallback = document.getElementById('milkFallback');
  if (!canvas || !section) return;

  /*
   * Stable Fluids on the GPU (Jos Stam, 1999):
   *  1. semi-Lagrangian velocity advection
   *  2. vorticity confinement
   *  3. divergence measurement
   *  4. Jacobi pressure solve
   *  5. pressure-gradient projection (incompressibility)
   *  6. dye advection + explicit Fick/Laplacian diffusion
   *
   * The simulation is qualitative rather than calibrated to a real cup:
   * viscosity, diffusion and scale are chosen for an intelligible interaction.
   */

  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: 'high-performance'
  });

  if (!gl || !gl.getExtension('EXT_color_buffer_float')) {
    canvas.hidden = true;
    fallback.hidden = false;
    return;
  }

  const ui = {
    pour: document.getElementById('milkPour'),
    pause: document.getElementById('milkPause'),
    reset: document.getElementById('milkReset'),
    agitation: document.getElementById('milkAgitation'),
    agitationValue: document.getElementById('milkAgitationValue'),
    state: document.getElementById('milkState'),
    entropy: document.getElementById('milkEntropy'),
    entropyBar: document.getElementById('milkEntropyBar'),
    prompt: document.getElementById('milkPrompt'),
    spoon: document.getElementById('milkSpoon')
  };

  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = matchMedia('(max-width: 700px)').matches;
  const SIM_SIZE = isMobile ? 256 : 384;
  const PRESSURE_ITERATIONS = isMobile ? 16 : 24;
  const METRIC_SIZE = 32;
  const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

  const baseVertex = `#version 300 es
    precision highp float;
    layout(location = 0) in vec2 position;
    out vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const advectionFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D source;
    uniform sampler2D velocity;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;
    uniform float velocityField;
    void main() {
      vec2 domain = vUv - 0.5;
      float wallDistance = length(domain);
      if (wallDistance >= 0.495) {
        outColor = vec4(0.0);
        return;
      }
      vec2 traced = clamp(vUv - dt * texture(velocity, vUv).xy * texelSize, texelSize, 1.0 - texelSize);
      vec2 tracedDomain = traced - 0.5;
      float tracedDistance = length(tracedDomain);
      if (tracedDistance > 0.493) {
        traced = 0.5 + normalize(tracedDomain) * 0.493;
      }
      vec4 value = texture(source, traced) * dissipation;
      if (velocityField > 0.5 && wallDistance > 0.445) {
        vec2 normal = normalize(domain);
        vec2 tangentOnly = value.xy - normal * dot(value.xy, normal);
        float wallBlend = smoothstep(0.445, 0.493, wallDistance);
        value.xy = mix(value.xy, tangentOnly * 0.78, wallBlend);
      }
      outColor = value;
    }
  `;

  const splatFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D target;
    uniform vec2 point;
    uniform vec3 value;
    uniform float radius;
    uniform float aspect;
    uniform float velocityField;
    void main() {
      vec2 domain = vUv - 0.5;
      float wallDistance = length(domain);
      if (wallDistance >= 0.495) {
        outColor = vec4(0.0);
        return;
      }
      vec2 p = vUv - point;
      p.x *= aspect;
      float influence = exp(-dot(p, p) / max(radius, 0.000001));
      vec4 result = texture(target, vUv) + vec4(value * influence, 0.0);
      if (velocityField > 0.5 && wallDistance > 0.445) {
        vec2 normal = normalize(domain);
        result.xy -= normal * dot(result.xy, normal);
        result.xy *= mix(1.0, 0.72, smoothstep(0.445, 0.493, wallDistance));
      }
      outColor = result;
    }
  `;

  const curlFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D velocity;
    uniform vec2 texelSize;
    void main() {
      if (length(vUv - 0.5) >= 0.493) {
        outColor = vec4(0.0);
        return;
      }
      float left = texture(velocity, vUv - vec2(texelSize.x, 0.0)).y;
      float right = texture(velocity, vUv + vec2(texelSize.x, 0.0)).y;
      float bottom = texture(velocity, vUv - vec2(0.0, texelSize.y)).x;
      float top = texture(velocity, vUv + vec2(0.0, texelSize.y)).x;
      outColor = vec4(0.5 * (right - left - top + bottom), 0.0, 0.0, 1.0);
    }
  `;

  const vorticityFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D velocity;
    uniform sampler2D curl;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float strength;
    void main() {
      vec2 domain = vUv - 0.5;
      float wallDistance = length(domain);
      if (wallDistance >= 0.493) {
        outColor = vec4(0.0);
        return;
      }
      float left = abs(texture(curl, vUv - vec2(texelSize.x, 0.0)).x);
      float right = abs(texture(curl, vUv + vec2(texelSize.x, 0.0)).x);
      float bottom = abs(texture(curl, vUv - vec2(0.0, texelSize.y)).x);
      float top = abs(texture(curl, vUv + vec2(0.0, texelSize.y)).x);
      float center = texture(curl, vUv).x;
      vec2 force = 0.5 * vec2(top - bottom, right - left);
      force /= length(force) + 0.0001;
      force *= strength * center;
      force.y *= -1.0;
      vec2 current = texture(velocity, vUv).xy;
      current += force * dt;
      if (wallDistance > 0.445) {
        vec2 normal = normalize(domain);
        current -= normal * dot(current, normal);
        current *= mix(1.0, 0.76, smoothstep(0.445, 0.493, wallDistance));
      }
      outColor = vec4(current, 0.0, 1.0);
    }
  `;

  const divergenceFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D velocity;
    uniform vec2 texelSize;
    bool outsideCup(vec2 uv) {
      return length(uv - 0.5) >= 0.493;
    }
    void main() {
      if (outsideCup(vUv)) {
        outColor = vec4(0.0);
        return;
      }
      vec2 center = texture(velocity, vUv).xy;
      vec2 uvLeft = vUv - vec2(texelSize.x, 0.0);
      vec2 uvRight = vUv + vec2(texelSize.x, 0.0);
      vec2 uvBottom = vUv - vec2(0.0, texelSize.y);
      vec2 uvTop = vUv + vec2(0.0, texelSize.y);
      vec2 left = outsideCup(uvLeft) ? -center : texture(velocity, uvLeft).xy;
      vec2 right = outsideCup(uvRight) ? -center : texture(velocity, uvRight).xy;
      vec2 bottom = outsideCup(uvBottom) ? -center : texture(velocity, uvBottom).xy;
      vec2 top = outsideCup(uvTop) ? -center : texture(velocity, uvTop).xy;
      float divergence = 0.5 * (right.x - left.x + top.y - bottom.y);
      outColor = vec4(divergence, 0.0, 0.0, 1.0);
    }
  `;

  const pressureFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D pressure;
    uniform sampler2D divergence;
    uniform vec2 texelSize;
    bool outsideCup(vec2 uv) {
      return length(uv - 0.5) >= 0.493;
    }
    void main() {
      if (outsideCup(vUv)) {
        outColor = vec4(0.0);
        return;
      }
      float center = texture(pressure, vUv).x;
      vec2 uvLeft = vUv - vec2(texelSize.x, 0.0);
      vec2 uvRight = vUv + vec2(texelSize.x, 0.0);
      vec2 uvBottom = vUv - vec2(0.0, texelSize.y);
      vec2 uvTop = vUv + vec2(0.0, texelSize.y);
      float left = outsideCup(uvLeft) ? center : texture(pressure, uvLeft).x;
      float right = outsideCup(uvRight) ? center : texture(pressure, uvRight).x;
      float bottom = outsideCup(uvBottom) ? center : texture(pressure, uvBottom).x;
      float top = outsideCup(uvTop) ? center : texture(pressure, uvTop).x;
      float div = texture(divergence, vUv).x;
      outColor = vec4((left + right + bottom + top - div) * 0.25, 0.0, 0.0, 1.0);
    }
  `;

  const gradientFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D pressure;
    uniform sampler2D velocity;
    uniform vec2 texelSize;
    bool outsideCup(vec2 uv) {
      return length(uv - 0.5) >= 0.493;
    }
    void main() {
      vec2 domain = vUv - 0.5;
      float wallDistance = length(domain);
      if (wallDistance >= 0.493) {
        outColor = vec4(0.0);
        return;
      }
      float center = texture(pressure, vUv).x;
      vec2 uvLeft = vUv - vec2(texelSize.x, 0.0);
      vec2 uvRight = vUv + vec2(texelSize.x, 0.0);
      vec2 uvBottom = vUv - vec2(0.0, texelSize.y);
      vec2 uvTop = vUv + vec2(0.0, texelSize.y);
      float left = outsideCup(uvLeft) ? center : texture(pressure, uvLeft).x;
      float right = outsideCup(uvRight) ? center : texture(pressure, uvRight).x;
      float bottom = outsideCup(uvBottom) ? center : texture(pressure, uvBottom).x;
      float top = outsideCup(uvTop) ? center : texture(pressure, uvTop).x;
      vec2 current = texture(velocity, vUv).xy;
      current -= 0.5 * vec2(right - left, top - bottom);
      if (wallDistance > 0.44) {
        vec2 normal = normalize(domain);
        current -= normal * dot(current, normal);
        current *= mix(1.0, 0.72, smoothstep(0.44, 0.493, wallDistance));
      }
      outColor = vec4(current, 0.0, 1.0);
    }
  `;

  const diffusionFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D source;
    uniform vec2 texelSize;
    uniform float coefficient;
    bool outsideCup(vec2 uv) {
      return length(uv - 0.5) >= 0.493;
    }
    void main() {
      if (outsideCup(vUv)) {
        outColor = vec4(0.0);
        return;
      }
      vec4 center = texture(source, vUv);
      vec2 uvLeft = vUv - vec2(texelSize.x, 0.0);
      vec2 uvRight = vUv + vec2(texelSize.x, 0.0);
      vec2 uvBottom = vUv - vec2(0.0, texelSize.y);
      vec2 uvTop = vUv + vec2(0.0, texelSize.y);
      vec4 left = outsideCup(uvLeft) ? center : texture(source, uvLeft);
      vec4 right = outsideCup(uvRight) ? center : texture(source, uvRight);
      vec4 bottom = outsideCup(uvBottom) ? center : texture(source, uvBottom);
      vec4 top = outsideCup(uvTop) ? center : texture(source, uvTop);
      outColor = max(vec4(0.0), center + coefficient * (left + right + bottom + top - 4.0 * center));
    }
  `;

  const boundaryFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D source;
    uniform float velocityField;
    void main() {
      vec2 p = vUv - 0.5;
      float distanceFromCenter = length(p);
      vec4 value = texture(source, vUv);
      if (distanceFromCenter > 0.498) {
        outColor = vec4(0.0);
        return;
      }
      if (velocityField > 0.5 && distanceFromCenter > 0.455) {
        vec2 normal = normalize(p);
        value.xy -= normal * dot(value.xy, normal);
        value.xy *= smoothstep(0.498, 0.45, distanceFromCenter);
      }
      outColor = value;
    }
  `;

  const agitationFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D velocity;
    uniform float dt;
    uniform float level;
    uniform float time;
    uniform float direction;
    void main() {
      vec2 p = vUv - 0.5;
      float radius = length(p);
      if (radius >= 0.493) {
        outColor = vec4(0.0);
        return;
      }
      vec2 current = texture(velocity, vUv).xy;
      vec2 tangent = vec2(-p.y, p.x) / max(radius, 0.025);
      float core = smoothstep(0.025, 0.11, radius);
      float wall = 1.0 - smoothstep(0.34, 0.486, radius);
      float shear = 0.38 + 1.55 * radius;
      float lobes = 0.72 + 0.28 * sin(4.0 * atan(p.y, p.x) - time * 1.55 * direction);
      float torque = level * (90.0 + level * 140.0) * core * wall * shear * lobes;
      current += tangent * torque * direction * dt;

      // Quatre cellules de convection issues d'une fonction de courant.
      // Le champ est antisymétrique : il étire le lait sans translation globale.
      float wobble = 0.42 * sin(time * 0.55 * direction);
      float cosine = cos(wobble);
      float sine = sin(wobble);
      mat2 rotation = mat2(cosine, sine, -sine, cosine);
      mat2 inverseRotation = mat2(cosine, -sine, sine, cosine);
      vec2 q = rotation * p;
      const float TAU = 6.28318530718;
      vec2 cellFlow = vec2(
        sin(TAU * q.x) * cos(TAU * q.y),
        -cos(TAU * q.x) * sin(TAU * q.y)
      );
      cellFlow = inverseRotation * cellFlow;
      float convection = level * (85.0 + level * 170.0);
      current += cellFlow * convection * wall * wall * dt;
      outColor = vec4(current, 0.0, 1.0);
    }
  `;

  const meanVelocityFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D velocity;
    void main() {
      vec2 sum = vec2(0.0);
      float count = 0.0;
      for (int y = 0; y < 24; y++) {
        for (int x = 0; x < 24; x++) {
          vec2 uv = (vec2(float(x), float(y)) + 0.5) / 24.0;
          if (length(uv - 0.5) < 0.485) {
            sum += texture(velocity, uv).xy;
            count += 1.0;
          }
        }
      }
      outColor = vec4(sum / max(count, 1.0), 0.0, 1.0);
    }
  `;

  const momentumFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D velocity;
    uniform sampler2D meanVelocity;
    void main() {
      vec2 domain = vUv - 0.5;
      float wallDistance = length(domain);
      if (wallDistance >= 0.493) {
        outColor = vec4(0.0);
        return;
      }
      vec2 corrected = texture(velocity, vUv).xy - texture(meanVelocity, vec2(0.5)).xy;
      if (wallDistance > 0.44) {
        vec2 normal = normalize(domain);
        corrected -= normal * dot(corrected, normal);
        corrected *= mix(1.0, 0.72, smoothstep(0.44, 0.493, wallDistance));
      }
      outColor = vec4(corrected, 0.0, 1.0);
    }
  `;

  const displayFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D dye;
    uniform sampler2D velocity;
    uniform vec2 resolution;
    uniform vec2 dyeTexel;
    uniform float time;
    uniform vec2 pointer;
    uniform float pointerForce;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
                 mix(hash(i + vec2(0, 1)), hash(i + vec2(1)), f.x), f.y);
    }
    float fbm(vec2 p) {
      float n = 0.0, a = 0.5;
      mat2 r = mat2(0.82, -0.57, 0.57, 0.82);
      for (int i = 0; i < 4; i++) {
        n += noise(p) * a;
        p = r * p * 2.03 + 13.7;
        a *= 0.5;
      }
      return n;
    }
    vec3 coffeePalette(float milk) {
      vec3 espresso = vec3(0.035, 0.010, 0.006);
      vec3 roast = vec3(0.23, 0.054, 0.018);
      vec3 caramel = vec3(0.56, 0.21, 0.055);
      vec3 cream = vec3(1.0, 0.89, 0.69);
      vec3 color = mix(espresso, roast, smoothstep(0.0, 0.22, milk));
      color = mix(color, caramel, smoothstep(0.16, 0.60, milk));
      return mix(color, cream, smoothstep(0.46, 1.0, milk));
    }
    void main() {
      vec2 frag = gl_FragCoord.xy;
      vec2 p = (frag - 0.5 * resolution) / min(resolution.x, resolution.y);
      float mobile = step(resolution.x, resolution.y * 0.88);
      vec2 cupCenter = mix(vec2(0.18, 0.0), vec2(0.0, -0.035), mobile);
      float radius = mix(0.405, 0.37, mobile);
      vec2 cp = p - cupCenter;
      float d = length(cp);
      vec2 fluidUv = cp / (radius * 2.0) + 0.5;

      float grain = fbm(vec2(p.x * 2.0, p.y * 11.0) + vec2(time * 0.006, 0.0));
      float vignette = 1.0 - smoothstep(0.2, 1.08, length(p * vec2(0.72, 1.0)));
      vec3 table = (vec3(0.009, 0.008, 0.010) + vec3(0.025, 0.016, 0.012) * grain) * (0.45 + 0.55 * vignette);
      float shadow = smoothstep(radius + 0.105, radius + 0.018, d);
      table *= 1.0 - shadow * 0.52;

      float concentration = texture(dye, fluidUv).r;
      float cL = texture(dye, fluidUv - vec2(dyeTexel.x, 0.0)).r;
      float cR = texture(dye, fluidUv + vec2(dyeTexel.x, 0.0)).r;
      float cB = texture(dye, fluidUv - vec2(0.0, dyeTexel.y)).r;
      float cT = texture(dye, fluidUv + vec2(0.0, dyeTexel.y)).r;
      vec2 concentrationNormal = vec2(cR - cL, cT - cB);
      vec2 flow = texture(velocity, fluidUv).xy / 900.0;
      float surface = fbm(fluidUv * 7.0 + flow * 1.6 + vec2(time * 0.012, -time * 0.009));
      concentration = clamp(concentration + (surface - 0.5) * 0.012, 0.0, 1.0);
      float opticalMilk = pow(concentration, 0.64);
      vec3 liquid = coffeePalette(opticalMilk);

      vec3 lightDirection = normalize(vec3(-0.38, 0.62, 0.68));
      vec3 surfaceNormal = normalize(vec3(-concentrationNormal * 6.5 + flow * 0.18, 1.0));
      float diffuseLight = max(0.0, dot(surfaceNormal, lightDirection));
      float specular = pow(max(0.0, dot(reflect(-lightDirection, surfaceNormal), vec3(0, 0, 1))), 26.0);
      liquid *= 0.82 + diffuseLight * 0.25;
      liquid += vec3(1.0, 0.82, 0.55) * specular * (0.04 + concentration * 0.09);
      liquid *= 1.0 - smoothstep(radius * 0.62, radius, d) * 0.18;

      float inside = 1.0 - smoothstep(radius - 0.002, radius + 0.002, d);
      vec3 color = mix(table, liquid, inside);
      float angle = atan(cp.y, cp.x);
      float saucer = smoothstep(radius + 0.08, radius + 0.055, d) - smoothstep(radius + 0.027, radius + 0.008, d);
      color = mix(color, vec3(0.17, 0.12, 0.085), saucer * 0.62);
      float rim = smoothstep(radius + 0.02, radius + 0.004, d) - smoothstep(radius - 0.005, radius - 0.018, d);
      float rimLight = 0.32 + 0.68 * smoothstep(-0.75, 0.55, sin(angle + 0.8));
      color = mix(color, vec3(0.88, 0.72, 0.47) * rimLight, rim * 0.88);

      vec2 handleCenter = cp - vec2(radius + 0.075, 0.018);
      float handleOuter = length(handleCenter / vec2(0.15, 0.095));
      float handleInner = length(handleCenter / vec2(0.094, 0.052));
      float handle = (1.0 - smoothstep(0.95, 1.05, handleOuter)) * smoothstep(0.90, 1.04, handleInner) * (1.0 - inside);
      color = mix(color, vec3(0.25, 0.16, 0.095), handle * 0.94);

      float pointerRipple = sin(distance(fluidUv, pointer) * 150.0 - time * 12.0);
      pointerRipple *= exp(-distance(fluidUv, pointer) * 24.0) * pointerForce;
      color += inside * pointerRipple * vec3(0.025, 0.017, 0.009);
      color += (hash(frag + fract(time) * 17.0) - 0.5) * 0.014;
      color = pow(max(color, 0.0), vec3(0.91));
      outColor = vec4(color, 1.0);
    }
  `;

  const metricFragment = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 outColor;
    uniform sampler2D dye;
    void main() {
      float inside = step(length(vUv - 0.5), 0.495);
      float concentration = clamp(texture(dye, vUv).r, 0.0, 1.0);
      outColor = vec4(vec3(concentration), inside);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || 'Shader compilation failed');
    }
    return shader;
  }

  function createProgram(fragmentSource) {
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, baseVertex));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Program link failed');
    }
    const uniforms = {};
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let index = 0; index < count; index += 1) {
      const name = gl.getActiveUniform(program, index).name.replace('[0]', '');
      uniforms[name] = gl.getUniformLocation(program, name);
    }
    return { program, uniforms };
  }

  let programs;
  try {
    programs = {
      advection: createProgram(advectionFragment),
      splat: createProgram(splatFragment),
      curl: createProgram(curlFragment),
      vorticity: createProgram(vorticityFragment),
      divergence: createProgram(divergenceFragment),
      pressure: createProgram(pressureFragment),
      gradient: createProgram(gradientFragment),
      diffusion: createProgram(diffusionFragment),
      boundary: createProgram(boundaryFragment),
      agitation: createProgram(agitationFragment),
      meanVelocity: createProgram(meanVelocityFragment),
      momentum: createProgram(momentumFragment),
      display: createProgram(displayFragment),
      metric: createProgram(metricFragment)
    };
  } catch (error) {
    console.warn('Milk fluid simulation:', error);
    canvas.hidden = true;
    fallback.hidden = false;
    return;
  }

  const vao = gl.createVertexArray();
  const vertexBuffer = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  gl.disable(gl.BLEND);

  function createFBO(width, height, internalFormat = gl.RGBA16F, format = gl.RGBA, type = gl.HALF_FLOAT, filter = gl.LINEAR) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error('Incomplete WebGL fluid framebuffer');
    }
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { texture, fbo, width, height };
  }

  function createDoubleFBO(width, height) {
    let read = createFBO(width, height);
    let write = createFBO(width, height);
    return {
      get read() { return read; },
      get write() { return write; },
      swap() { const temporary = read; read = write; write = temporary; }
    };
  }

  let velocity;
  let dye;
  let pressure;
  let divergence;
  let curl;
  let metric;
  let velocityMean;
  try {
    velocity = createDoubleFBO(SIM_SIZE, SIM_SIZE);
    dye = createDoubleFBO(SIM_SIZE, SIM_SIZE);
    pressure = createDoubleFBO(SIM_SIZE, SIM_SIZE);
    divergence = createFBO(SIM_SIZE, SIM_SIZE);
    curl = createFBO(SIM_SIZE, SIM_SIZE);
    metric = createFBO(METRIC_SIZE, METRIC_SIZE, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    velocityMean = createFBO(1, 1);
  } catch (error) {
    console.warn('Milk fluid buffers:', error);
    canvas.hidden = true;
    fallback.hidden = false;
    return;
  }

  const texel = [1 / SIM_SIZE, 1 / SIM_SIZE];
  const metricPixels = new Uint8Array(METRIC_SIZE * METRIC_SIZE * 4);

  function bindTexture(texture, unit) {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    return unit;
  }

  function use(bundle) {
    gl.useProgram(bundle.program);
    return bundle.uniforms;
  }

  function blit(target = null) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fbo : null);
    gl.viewport(0, 0, target ? target.width : canvas.width, target ? target.height : canvas.height);
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindVertexArray(null);
  }

  function applyBoundary(field, isVelocity) {
    const uniforms = use(programs.boundary);
    gl.uniform1i(uniforms.source, bindTexture(field.read.texture, 0));
    gl.uniform1f(uniforms.velocityField, isVelocity ? 1 : 0);
    blit(field.write);
    field.swap();
  }

  function splat(field, point, value, radius, isVelocity = false) {
    const uniforms = use(programs.splat);
    gl.uniform1i(uniforms.target, bindTexture(field.read.texture, 0));
    gl.uniform2f(uniforms.point, point[0], point[1]);
    gl.uniform3f(uniforms.value, value[0], value[1], value[2] || 0);
    gl.uniform1f(uniforms.radius, radius);
    gl.uniform1f(uniforms.aspect, 1);
    gl.uniform1f(uniforms.velocityField, isVelocity ? 1 : 0);
    blit(field.write);
    field.swap();
  }

  function clearFBO(target) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    gl.viewport(0, 0, target.width, target.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  function clearAll() {
    [velocity.read, velocity.write, dye.read, dye.write, pressure.read, pressure.write, divergence, curl, metric, velocityMean].forEach(clearFBO);
  }

  function removeBulkMomentum() {
    let uniforms = use(programs.meanVelocity);
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 0));
    blit(velocityMean);

    uniforms = use(programs.momentum);
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 0));
    gl.uniform1i(uniforms.meanVelocity, bindTexture(velocityMean.texture, 1));
    blit(velocity.write);
    velocity.swap();
    applyBoundary(velocity, true);
  }

  function step(dt, agitation, time, circulationDirection) {
    let uniforms = use(programs.advection);
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 0));
    gl.uniform1i(uniforms.source, bindTexture(velocity.read.texture, 1));
    gl.uniform2f(uniforms.texelSize, texel[0], texel[1]);
    gl.uniform1f(uniforms.dt, dt);
    gl.uniform1f(uniforms.dissipation, 0.9938 + agitation * 0.002);
    gl.uniform1f(uniforms.velocityField, 1);
    blit(velocity.write);
    velocity.swap();
    applyBoundary(velocity, true);

    // Couple mécanique imposé : champ tangentiel de moyenne vectorielle nulle.
    // Son gradient radial produit le cisaillement qui étire les filaments de lait.
    uniforms = use(programs.agitation);
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 0));
    gl.uniform1f(uniforms.dt, dt);
    gl.uniform1f(uniforms.level, agitation);
    gl.uniform1f(uniforms.time, time);
    gl.uniform1f(uniforms.direction, circulationDirection);
    blit(velocity.write);
    velocity.swap();
    applyBoundary(velocity, true);

    // Momentum diffusion: the Laplacian term ν∇²u models viscosity.
    uniforms = use(programs.diffusion);
    gl.uniform1i(uniforms.source, bindTexture(velocity.read.texture, 0));
    gl.uniform2f(uniforms.texelSize, texel[0], texel[1]);
    gl.uniform1f(uniforms.coefficient, Math.min(0.2, (1.15 - agitation * 0.55) * dt));
    blit(velocity.write);
    velocity.swap();
    applyBoundary(velocity, true);

    uniforms = use(programs.curl);
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 0));
    gl.uniform2f(uniforms.texelSize, texel[0], texel[1]);
    blit(curl);

    uniforms = use(programs.vorticity);
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 0));
    gl.uniform1i(uniforms.curl, bindTexture(curl.texture, 1));
    gl.uniform2f(uniforms.texelSize, texel[0], texel[1]);
    gl.uniform1f(uniforms.dt, dt);
    gl.uniform1f(uniforms.strength, 18 + agitation * 95);
    blit(velocity.write);
    velocity.swap();

    uniforms = use(programs.divergence);
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 0));
    gl.uniform2f(uniforms.texelSize, texel[0], texel[1]);
    blit(divergence);

    clearFBO(pressure.read);
    for (let iteration = 0; iteration < PRESSURE_ITERATIONS; iteration += 1) {
      uniforms = use(programs.pressure);
      gl.uniform1i(uniforms.pressure, bindTexture(pressure.read.texture, 0));
      gl.uniform1i(uniforms.divergence, bindTexture(divergence.texture, 1));
      gl.uniform2f(uniforms.texelSize, texel[0], texel[1]);
      blit(pressure.write);
      pressure.swap();
    }

    uniforms = use(programs.gradient);
    gl.uniform1i(uniforms.pressure, bindTexture(pressure.read.texture, 0));
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 1));
    gl.uniform2f(uniforms.texelSize, texel[0], texel[1]);
    blit(velocity.write);
    velocity.swap();
    applyBoundary(velocity, true);
    removeBulkMomentum();

    uniforms = use(programs.advection);
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 0));
    gl.uniform1i(uniforms.source, bindTexture(dye.read.texture, 1));
    gl.uniform2f(uniforms.texelSize, texel[0], texel[1]);
    gl.uniform1f(uniforms.dt, dt);
    gl.uniform1f(uniforms.dissipation, 0.99994);
    gl.uniform1f(uniforms.velocityField, 0);
    blit(dye.write);
    dye.swap();

    // Explicit finite-difference integration of ∂c/∂t = D∇²c (Fick).
    // DΔt/Δx² for the explicit Fick step. 0.235 stays below the
    // two-dimensional stability limit (1/4) while making diffusion legible.
    const diffusion = Math.min(0.235, (4.0 + agitation * 10.0) * dt);
    for (let iteration = 0; iteration < 2; iteration += 1) {
      uniforms = use(programs.diffusion);
      gl.uniform1i(uniforms.source, bindTexture(dye.read.texture, 0));
      gl.uniform2f(uniforms.texelSize, texel[0], texel[1]);
      gl.uniform1f(uniforms.coefficient, diffusion);
      blit(dye.write);
      dye.swap();
    }
    applyBoundary(dye, false);
  }

  function render(time, pointer, pointerForce) {
    const uniforms = use(programs.display);
    gl.uniform1i(uniforms.dye, bindTexture(dye.read.texture, 0));
    gl.uniform1i(uniforms.velocity, bindTexture(velocity.read.texture, 1));
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.dyeTexel, texel[0], texel[1]);
    gl.uniform1f(uniforms.time, time);
    gl.uniform2f(uniforms.pointer, pointer[0], pointer[1]);
    gl.uniform1f(uniforms.pointerForce, pointerForce);
    blit();
  }

  function cupGeometry() {
    const rect = canvas.getBoundingClientRect();
    const mobile = rect.width <= rect.height * 0.88;
    const minSide = Math.min(rect.width, rect.height);
    return {
      rect,
      centerX: rect.width * 0.5 + (mobile ? 0 : minSide * 0.18),
      centerY: rect.height * 0.5 + (mobile ? minSide * 0.035 : 0),
      radius: minSide * (mobile ? 0.37 : 0.405)
    };
  }

  function pointerInCup(clientX, clientY) {
    const cup = cupGeometry();
    const localX = clientX - cup.rect.left;
    const localY = clientY - cup.rect.top;
    const dx = localX - cup.centerX;
    const dy = localY - cup.centerY;
    return {
      inside: Math.hypot(dx, dy) < cup.radius * 0.975,
      uv: [
        Math.max(0.005, Math.min(0.995, dx / (cup.radius * 2) + 0.5)),
        Math.max(0.005, Math.min(0.995, -dy / (cup.radius * 2) + 0.5))
      ],
      localX,
      localY
    };
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  let visible = false;
  let paused = false;
  let pausedByVisibility = false;
  let lastFrame = performance.now();
  let simulationTime = 0;
  let hasMilk = false;
  let agitation = Number(ui.agitation.value) / 100;
  let pointerDown = false;
  let pointerUv = [0.5, 0.5];
  let pointerForce = 0;
  let previousPointer = null;
  let pointerGesture = null;
  let lastMetricAt = 0;
  let displayedUniformity = 0;
  let pourSequence = [];
  let autoDropTimer = 0;
  let circulationDirection = Math.random() < 0.5 ? -1 : 1;

  function impactDrop(point, amount = 0.82, size = 0.00105) {
    hasMilk = true;
    ui.prompt.classList.add('is-hidden');
    splat(dye, point, [amount, amount * 0.97, amount * 0.88], size);
  }

  function queuePour(point = null) {
    const center = point || [0.5, 0.5];
    const now = performance.now();
    for (let index = 0; index < 6; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.sqrt(Math.random()) * 0.012;
      const candidate = [
        center[0] + Math.cos(angle) * spread,
        center[1] + Math.sin(angle) * spread
      ];
      const offsetX = candidate[0] - 0.5;
      const offsetY = candidate[1] - 0.5;
      const distance = Math.hypot(offsetX, offsetY);
      const scale = distance > 0.478 ? 0.478 / distance : 1;
      pourSequence.push({
        at: now + index * 72,
        point: [0.5 + offsetX * scale, 0.5 + offsetY * scale],
        amount: 0.56 + Math.random() * 0.22,
        size: 0.00045 + Math.random() * 0.00038
      });
    }
  }

  function applyStroke(from, to, elapsedMs) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const distance = Math.hypot(dx, dy);
    if (distance < 0.0001) return;
    const samples = Math.max(1, Math.min(14, Math.ceil(distance / 0.012)));
    const seconds = Math.max(0.008, elapsedMs / 1000);
    const rawX = dx / seconds * SIM_SIZE;
    const rawY = dy / seconds * SIM_SIZE;
    const magnitude = Math.hypot(rawX, rawY);
    const cap = 480 + agitation * 920;
    const scale = Math.min(1, cap / Math.max(1, magnitude));
    const velocityValue = [rawX * scale * (0.72 + agitation * 0.9), rawY * scale * (0.72 + agitation * 0.9), 0];
    const centerX = (from[0] + to[0]) * 0.5 - 0.5;
    const centerY = (from[1] + to[1]) * 0.5 - 0.5;
    const angularImpulse = centerX * dy - centerY * dx;
    if (Math.abs(angularImpulse) > 0.000025) {
      circulationDirection = angularImpulse < 0 ? -1 : 1;
    }
    for (let index = 1; index <= samples; index += 1) {
      const ratio = index / samples;
      const point = [from[0] + dx * ratio, from[1] + dy * ratio];
      if (Math.hypot(point[0] - 0.5, point[1] - 0.5) < 0.487) {
        splat(velocity, point, velocityValue, 0.0012 + agitation * 0.0011, true);
      }
    }
    pointerForce = Math.min(1, magnitude / 440);
  }

  function measureMixing(now) {
    if (!hasMilk || pourSequence.length || now - lastMetricAt < 520) return;
    lastMetricAt = now;
    const uniforms = use(programs.metric);
    gl.uniform1i(uniforms.dye, bindTexture(dye.read.texture, 0));
    blit(metric);
    gl.bindFramebuffer(gl.FRAMEBUFFER, metric.fbo);
    gl.readPixels(0, 0, METRIC_SIZE, METRIC_SIZE, gl.RGBA, gl.UNSIGNED_BYTE, metricPixels);

    let count = 0;
    let sum = 0;
    let squared = 0;
    for (let index = 0; index < metricPixels.length; index += 4) {
      if (metricPixels[index + 3] < 128) continue;
      const value = metricPixels[index] / 255;
      count += 1;
      sum += value;
      squared += value * value;
    }
    const mean = count ? sum / count : 0;
    if (mean < 0.002) {
      updateReadout(0, mean);
      return;
    }
    const variance = Math.max(0, squared / count - mean * mean);
    const maximumVariance = Math.max(0.00001, mean * (1 - Math.min(0.999, mean)));
    const uniformity = Math.max(0, Math.min(1, 1 - Math.sqrt(variance / maximumVariance)));
    displayedUniformity = Math.max(displayedUniformity, uniformity);
    updateReadout(displayedUniformity, mean);
  }

  function updateReadout(uniformity, mean = 0) {
    const percent = Math.round(uniformity * 100);
    let label = 'Café noir';
    if (hasMilk && uniformity < 0.17) label = 'Impact';
    else if (uniformity < 0.42 && hasMilk) label = 'Volutes';
    else if (uniformity < 0.72 && hasMilk) label = 'Diffusion';
    else if (hasMilk) label = 'Quasi uniforme';
    if (mean > 0.82) label = 'Café au lait';
    ui.state.textContent = label;
    ui.entropy.textContent = `${percent}%`;
    ui.entropyBar.style.width = `${percent}%`;
  }

  function updateAgitation() {
    agitation = Number(ui.agitation.value) / 100;
    ui.agitationValue.value = agitation < 0.08 ? 'Nulle' : agitation < 0.3 ? 'Faible' : agitation < 0.62 ? 'Intense' : 'Vortex';
  }

  function togglePause() {
    paused = !paused;
    ui.pause.setAttribute('aria-pressed', String(paused));
    ui.pause.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
    ui.pause.querySelector('b').textContent = paused ? 'Reprendre' : 'Pause';
    lastFrame = performance.now();
  }

  function reset() {
    clearAll();
    hasMilk = false;
    pointerDown = false;
    previousPointer = null;
    pointerGesture = null;
    pointerForce = 0;
    pourSequence = [];
    simulationTime = 0;
    displayedUniformity = 0;
    circulationDirection = Math.random() < 0.5 ? -1 : 1;
    if (paused) togglePause();
    ui.prompt.classList.remove('is-hidden');
    ui.spoon?.classList.remove('is-visible', 'is-stirring');
    updateReadout(0, 0);
  }

  function moveSpoon(event, point) {
    if (!ui.spoon || event.pointerType === 'touch') return;
    ui.spoon.style.transform = `translate3d(${point.localX}px, ${point.localY}px, 0)`;
    ui.spoon.classList.toggle('is-visible', point.inside);
  }

  canvas.addEventListener('pointerdown', (event) => {
    const point = pointerInCup(event.clientX, event.clientY);
    if (!point.inside) return;
    canvas.setPointerCapture(event.pointerId);
    pointerDown = true;
    pointerUv = point.uv;
    previousPointer = { uv: point.uv, time: performance.now() };
    pointerGesture = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startUv: point.uv,
      startedAt: performance.now(),
      dragged: false
    };
    ui.spoon?.classList.add('is-stirring');
  });

  canvas.addEventListener('pointermove', (event) => {
    const events = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : [event];
    for (const sample of events) {
      const point = pointerInCup(sample.clientX, sample.clientY);
      moveSpoon(sample, point);
      if (!pointerDown) continue;
      if (pointerGesture && !pointerGesture.dragged) {
        pointerGesture.dragged =
          Math.hypot(
            sample.clientX - pointerGesture.startX,
            sample.clientY - pointerGesture.startY
          ) >= (sample.pointerType === 'touch' ? 10 : 6);
        if (!pointerGesture.dragged) continue;
        previousPointer = {
          uv: pointerGesture.startUv,
          time: pointerGesture.startedAt
        };
      }
      if (!point.inside) {
        previousPointer = null;
        continue;
      }
      const now = performance.now();
      if (!previousPointer) {
        pointerUv = point.uv;
        previousPointer = { uv: point.uv, time: now };
        continue;
      }
      applyStroke(previousPointer.uv, point.uv, now - previousPointer.time);
      pointerUv = point.uv;
      previousPointer = { uv: point.uv, time: now };
    }
  });

  function endPointer(event) {
    const gesture = pointerGesture;
    if (
      pointerDown &&
      gesture &&
      !gesture.dragged &&
      performance.now() - gesture.startedAt < 650
    ) {
      const release = pointerInCup(
        event?.clientX ?? gesture.startX,
        event?.clientY ?? gesture.startY
      );
      if (release.inside) {
        pointerUv = release.uv;
        queuePour(release.uv);
      }
    }
    pointerDown = false;
    previousPointer = null;
    pointerGesture = null;
    ui.spoon?.classList.remove('is-stirring');
    if (event?.pointerType === 'touch') ui.spoon?.classList.remove('is-visible');
  }

  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);
  canvas.addEventListener('pointerleave', (event) => {
    if (!pointerDown) ui.spoon?.classList.remove('is-visible');
    if (event.buttons === 0) endPointer(event);
  });
  canvas.addEventListener('contextmenu', (event) => event.preventDefault());
  ui.pour.addEventListener('click', () => queuePour());
  ui.pause.addEventListener('click', togglePause);
  ui.reset.addEventListener('click', reset);
  ui.agitation.addEventListener('input', updateAgitation);
  window.addEventListener('resize', resize, { passive: true });

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    canvas.hidden = true;
    fallback.hidden = false;
  });

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) {
      lastFrame = now;
      return;
    }
    resize();
    const elapsed = Math.min(0.033, Math.max(0.001, (now - lastFrame) / 1000));
    lastFrame = now;

    if (!paused) {
      while (pourSequence.length && pourSequence[0].at <= now) {
        const drop = pourSequence.shift();
        impactDrop(drop.point, drop.amount, drop.size);
      }
      const substeps = elapsed > 0.021 ? 2 : 1;
      const stableAgitation = Math.min(agitation, 0.7);
      for (let substep = 0; substep < substeps; substep += 1) {
        step(elapsed / substeps, stableAgitation, simulationTime, circulationDirection);
      }
      simulationTime += elapsed;
      pointerForce *= Math.pow(0.055, elapsed);
      measureMixing(now);
    }
    render(simulationTime, pointerUv, pointerForce);
  }

  const observer = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    lastFrame = performance.now();
    if (visible && !autoDropTimer && !prefersReducedMotion) {
      autoDropTimer = window.setTimeout(() => {
        if (!hasMilk && visible) queuePour();
      }, 1500);
    }
  }, { rootMargin: '120px 0px' });
  observer.observe(section);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !paused) {
      pausedByVisibility = true;
      togglePause();
    } else if (!document.hidden && pausedByVisibility) {
      pausedByVisibility = false;
      togglePause();
    }
  });

  updateAgitation();
  updateReadout(0, 0);
  resize();
  requestAnimationFrame(frame);
})();
