(() => {
  "use strict";

  const root = document.querySelector("[data-entropy-seal]");
  if (!root) return;

  const canvas = root.querySelector("canvas");
  const stage = root.querySelector(".entropy-seal__stage");
  const phaseNode = root.querySelector("[data-entropy-phase]");
  const progressNode = root.querySelector("[data-entropy-progress]");
  const countNode = root.querySelector("[data-entropy-count]");
  const accelerateButton = root.querySelector("[data-entropy-accelerate]");
  const rebuildButton = root.querySelector("[data-entropy-rebuild]");
  const context = canvas && canvas.getContext("2d", { alpha: true });
  if (!canvas || !stage || !context) return;

  const GRID = 96;
  const SOURCE_CELL = 2;
  const WORLD_COLUMNS = 116;
  const WORLD_ROWS = 132;
  const HOME_LEFT = Math.floor((WORLD_COLUMNS - GRID) / 2);
  const HOME_TOP = 7;
  const FLOOR_ROW = WORLD_ROWS - 7;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const image = new Image();
  image.decoding = "async";
  image.src = root.dataset.logoSrc;

  let particles = [];
  let anchored = new Uint8Array(GRID * GRID);
  let total = 0;
  let anchoredCount = 0;
  let phase = "order";
  let phaseStarted = performance.now();
  let boostUntil = 0;
  let visible = true;
  let animationFrame = 0;
  let lastTime = 0;
  let accumulator = 0;
  let cssWidth = 1;
  let cssHeight = 1;
  let unit = 1;
  let worldOffsetX = 0;
  let worldOffsetY = 0;
  let pointer = null;
  let lastReadout = 0;
  const sourceCanvas = document.createElement("canvas");
  const maskCanvas = document.createElement("canvas");
  const maskedLogoCanvas = document.createElement("canvas");
  let anchoredTextureDirty = true;

  const phaseLabels = {
    order: "Ordre initial",
    erosion: "Érosion des bords",
    fall: "Chute gravitationnelle",
    settled: "État dispersé",
    rebuild: "Reconstruction",
  };

  function index(x, y, columns = GRID) {
    return y * columns + x;
  }

  function easeInOutCubic(value) {
    return value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2;
  }

  function initializeParticles() {
    sourceCanvas.width = GRID * SOURCE_CELL;
    sourceCanvas.height = GRID * SOURCE_CELL;
    maskCanvas.width = GRID;
    maskCanvas.height = GRID;
    maskedLogoCanvas.width = image.naturalWidth;
    maskedLogoCanvas.height = image.naturalHeight;
    const sourceContext = sourceCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    let pixels = null;
    try {
      sourceContext.drawImage(
        image,
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height,
      );
      pixels = sourceContext.getImageData(
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height,
      ).data;
    } catch {
      // En file://, la lecture des couleurs peut être interdite. La texture
      // réelle reste néanmoins utilisable directement pour chaque fragment.
    }

    particles = [];
    anchored = new Uint8Array(GRID * GRID);

    for (let gridY = 0; gridY < GRID; gridY += 1) {
      for (let gridX = 0; gridX < GRID; gridX += 1) {
        let red = 0;
        let green = 0;
        let blue = 0;
        if (pixels) {
          for (let sampleY = 0; sampleY < SOURCE_CELL; sampleY += 1) {
            for (let sampleX = 0; sampleX < SOURCE_CELL; sampleX += 1) {
              const pixel =
                ((gridY * SOURCE_CELL + sampleY) * sourceCanvas.width +
                  gridX * SOURCE_CELL +
                  sampleX) *
                4;
              red += pixels[pixel];
              green += pixels[pixel + 1];
              blue += pixels[pixel + 2];
            }
          }
        }
        const homeX = HOME_LEFT + gridX;
        const homeY = HOME_TOP + gridY;
        const particle = {
          gridX,
          gridY,
          homeX,
          homeY,
          x: homeX,
          y: homeY,
          fromX: homeX,
          fromY: homeY,
          vx: 0,
          vy: 0,
          anchored: true,
          settled: false,
          color: pixels
            ? `rgb(${red >> 2},${green >> 2},${blue >> 2})`
            : null,
          shimmer: Math.random() * Math.PI * 2,
        };
        anchored[index(gridX, gridY)] = 1;
        particles.push(particle);
      }
    }
    total = particles.length;
    anchoredCount = total;
    anchoredTextureDirty = true;
    phase = "order";
    phaseStarted = performance.now();
    root.classList.add("is-ready");
    updateReadout(performance.now(), true);
  }

  function exposedSides(particle) {
    const { gridX: x, gridY: y } = particle;
    let exposed = 0;
    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
      [x - 1, y - 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
      [x + 1, y + 1],
    ];
    for (const [neighborX, neighborY] of neighbors) {
      if (
        neighborX < 0 ||
        neighborY < 0 ||
        neighborX >= GRID ||
        neighborY >= GRID ||
        !anchored[index(neighborX, neighborY)]
      )
        exposed += 1;
    }
    return exposed;
  }

  function detachExposed(now) {
    const age = Math.min(1, (now - phaseStarted) / 7000);
    const boosted = now < boostUntil;
    const probabilityScale = boosted ? 5.2 : 1;
    const candidates = [];

    for (const particle of particles) {
      if (!particle.anchored) continue;
      const exposed = exposedSides(particle);
      if (!exposed) continue;
      const probability =
        (0.042 + age * 0.068) *
        Math.pow(exposed, 1.2) *
        probabilityScale;
      if (Math.random() < probability) candidates.push(particle);
    }

    for (const particle of candidates) {
      if (!particle.anchored) continue;
      particle.anchored = false;
      particle.settled = false;
      particle.vx = (Math.random() - 0.5) * 0.16;
      particle.vy = Math.random() * 0.12;
      anchored[index(particle.gridX, particle.gridY)] = 0;
      anchoredCount -= 1;
      anchoredTextureDirty = true;
    }

    if (anchoredCount === 0) {
      phase = "fall";
      phaseStarted = now;
    }
  }

  function fillOccupancy() {
    const occupancy = new Int32Array(WORLD_COLUMNS * WORLD_ROWS);
    occupancy.fill(-1);
    for (let particleIndex = 0; particleIndex < particles.length; particleIndex += 1) {
      const particle = particles[particleIndex];
      const x = Math.max(0, Math.min(WORLD_COLUMNS - 1, Math.round(particle.x)));
      const y = Math.max(0, Math.min(WORLD_ROWS - 1, Math.round(particle.y)));
      occupancy[index(x, y, WORLD_COLUMNS)] = particleIndex;
    }
    return occupancy;
  }

  function updateFalling(now) {
    const occupancy = fillOccupancy();
    const order = particles
      .map((particle, particleIndex) => ({ particle, particleIndex }))
      .filter(({ particle }) => !particle.anchored)
      .sort((a, b) => b.particle.y - a.particle.y);
    let settledCount = 0;

    for (const { particle, particleIndex } of order) {
      let cellX = Math.round(particle.x);
      let cellY = Math.round(particle.y);
      occupancy[index(cellX, cellY, WORLD_COLUMNS)] = -1;

      if (pointer) {
        const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
        if (distance < 13 && distance > 0.1) {
          const force = (1 - distance / 13) * 0.085;
          particle.vx += ((particle.x - pointer.x) / distance) * force;
          particle.vy += ((particle.y - pointer.y) / distance) * force * 0.45;
          particle.settled = false;
        }
      }

      particle.vy = Math.min(2.15, particle.vy + 0.075);
      particle.vx *= 0.988;
      const verticalSteps = Math.max(1, Math.ceil(Math.abs(particle.vy)));
      let moved = false;

      for (let step = 0; step < verticalSteps; step += 1) {
        const belowY = Math.min(FLOOR_ROW, cellY + 1);
        if (
          belowY > cellY &&
          occupancy[index(cellX, belowY, WORLD_COLUMNS)] === -1
        ) {
          cellY = belowY;
          particle.y = cellY;
          moved = true;
          continue;
        }

        const preferred = particle.vx < -0.02 ? -1 : particle.vx > 0.02 ? 1 : Math.random() < 0.5 ? -1 : 1;
        const directions = [preferred, -preferred];
        let slid = false;
        for (const direction of directions) {
          const diagonalX = cellX + direction;
          const diagonalY = Math.min(FLOOR_ROW, cellY + 1);
          if (
            diagonalX > 0 &&
            diagonalX < WORLD_COLUMNS - 1 &&
            diagonalY > cellY &&
            occupancy[index(diagonalX, diagonalY, WORLD_COLUMNS)] === -1
          ) {
            cellX = diagonalX;
            cellY = diagonalY;
            particle.x = cellX;
            particle.y = cellY;
            particle.vx += direction * 0.025;
            particle.vy *= 0.62;
            particle.settled = false;
            moved = true;
            slid = true;
            break;
          }
        }
        if (!slid) {
          particle.x = cellX;
          particle.y = cellY;
          particle.vy *= -0.08;
          particle.vx *= 0.52;
          particle.settled = true;
          break;
        }
      }

      if (moved) particle.settled = false;
      if (particle.settled) settledCount += 1;
      occupancy[index(cellX, cellY, WORLD_COLUMNS)] = particleIndex;
    }

    if (
      anchoredCount === 0 &&
      settledCount > total * 0.992 &&
      now - phaseStarted > 900
    ) {
      phase = "settled";
      phaseStarted = now;
    }
  }

  function beginRebuild(now) {
    anchored.fill(0);
    anchoredCount = 0;
    anchoredTextureDirty = true;
    for (const particle of particles) {
      particle.fromX = particle.x;
      particle.fromY = particle.y;
      particle.anchored = false;
      particle.settled = false;
    }
    phase = "rebuild";
    phaseStarted = now;
  }

  function resetCycle(now) {
    anchored.fill(0);
    anchoredCount = 0;
    for (const particle of particles) {
      particle.x = particle.homeX;
      particle.y = particle.homeY;
      particle.vx = 0;
      particle.vy = 0;
      particle.anchored = true;
      particle.settled = false;
      anchored[index(particle.gridX, particle.gridY)] = 1;
      anchoredCount += 1;
    }
    phase = "order";
    phaseStarted = now;
    anchoredTextureDirty = true;
  }

  function step(now) {
    if (phase === "order" && now - phaseStarted > 1450) {
      phase = "erosion";
      phaseStarted = now;
    }
    if (phase === "erosion") detachExposed(now);
    if (phase === "erosion" || phase === "fall") updateFalling(now);
    if (phase === "settled" && now - phaseStarted > 1450) beginRebuild(now);
    if (phase === "rebuild" && now - phaseStarted > 2200) resetCycle(now);
  }

  function resize() {
    const rect = stage.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cssWidth = Math.max(1, rect.width);
    cssHeight = Math.max(1, rect.height);
    unit = Math.min(
      cssWidth / WORLD_COLUMNS,
      cssHeight / WORLD_ROWS,
    );
    worldOffsetX = (cssWidth - WORLD_COLUMNS * unit) / 2;
    worldOffsetY = (cssHeight - WORLD_ROWS * unit) / 2;
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.imageSmoothingEnabled = false;
    if (reducedMotion && particles.length) {
      drawBackground(performance.now());
      drawParticles(performance.now());
      updateReadout(performance.now(), true);
    }
  }

  function drawBackground(now) {
    context.clearRect(0, 0, cssWidth, cssHeight);
    const centerX = cssWidth / 2;
    const centerY = cssHeight * 0.38;
    const glow = context.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      cssWidth * 0.58,
    );
    glow.addColorStop(0, "rgba(64,135,165,.16)");
    glow.addColorStop(0.46, "rgba(17,31,58,.08)");
    glow.addColorStop(1, "rgba(2,5,13,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, cssWidth, cssHeight);

    context.save();
    context.translate(centerX, centerY);
    context.strokeStyle = "rgba(214,172,85,.12)";
    context.lineWidth = 0.7;
    for (let ring = 0; ring < 4; ring += 1) {
      const radius = cssWidth * (0.16 + ring * 0.105) + Math.sin(now * 0.0005 + ring) * 2;
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.stroke();
    }
    context.restore();

    const floorY = worldOffsetY + (FLOOR_ROW + 1) * unit;
    const floorGlow = context.createLinearGradient(0, floorY - 32, 0, floorY + 12);
    floorGlow.addColorStop(0, "rgba(214,172,85,0)");
    floorGlow.addColorStop(0.72, "rgba(214,172,85,.08)");
    floorGlow.addColorStop(1, "rgba(214,172,85,.18)");
    context.fillStyle = floorGlow;
    context.fillRect(0, floorY - 32, cssWidth, 44);
    context.strokeStyle = "rgba(214,172,85,.3)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(cssWidth * 0.08, floorY + unit);
    context.lineTo(cssWidth * 0.92, floorY + unit);
    context.stroke();
  }

  function drawParticles(now) {
    const rebuildProgress =
      phase === "rebuild"
        ? Math.min(1, (now - phaseStarted) / 2200)
        : 0;
    const eased = easeInOutCubic(rebuildProgress);
    const block = Math.max(1.25, unit + 0.42);

    drawAnchoredLogo();
    context.save();
    for (const particle of particles) {
      if (particle.anchored) continue;
      let x = particle.x;
      let y = particle.y;
      if (phase === "rebuild") {
        const delay = ((particle.gridX + particle.gridY) / (GRID * 2)) * 0.18;
        const localProgress = Math.max(
          0,
          Math.min(1, (rebuildProgress - delay) / (1 - delay)),
        );
        const localEase = easeInOutCubic(localProgress);
        x = particle.fromX + (particle.homeX - particle.fromX) * localEase;
        y = particle.fromY + (particle.homeY - particle.fromY) * localEase;
        const arc = Math.sin(localProgress * Math.PI) * (3 + particle.shimmer * 0.45);
        x += Math.sin(particle.shimmer) * arc;
        y -= arc * 0.55;
      }
      context.globalAlpha =
        phase === "rebuild" ? 0.72 + eased * 0.28 : 1;
      if (particle.color) {
        context.fillStyle = particle.color;
        context.fillRect(
          worldOffsetX + x * unit,
          worldOffsetY + y * unit,
          block,
          block,
        );
      } else {
        context.drawImage(
          image,
          (particle.gridX * image.naturalWidth) / GRID,
          (particle.gridY * image.naturalHeight) / GRID,
          image.naturalWidth / GRID,
          image.naturalHeight / GRID,
          worldOffsetX + x * unit,
          worldOffsetY + y * unit,
          block,
          block,
        );
      }
    }
    context.restore();

    if (phase === "rebuild") {
      context.save();
      context.globalCompositeOperation = "lighter";
      context.strokeStyle = `rgba(127,212,232,${Math.sin(rebuildProgress * Math.PI) * 0.2})`;
      context.lineWidth = 1;
      context.beginPath();
      context.arc(
        cssWidth / 2,
        worldOffsetY + (HOME_TOP + GRID / 2) * unit,
        GRID * unit * (0.2 + rebuildProgress * 0.33),
        0,
        Math.PI * 2,
      );
      context.stroke();
      context.restore();
    }
  }

  function drawAnchoredLogo() {
    if (!anchoredCount) return;
    if (anchoredTextureDirty) {
      const maskContext = maskCanvas.getContext("2d");
      const maskedContext = maskedLogoCanvas.getContext("2d");
      maskContext.clearRect(0, 0, GRID, GRID);
      maskContext.fillStyle = "#fff";
      for (let gridY = 0; gridY < GRID; gridY += 1) {
        for (let gridX = 0; gridX < GRID; gridX += 1) {
          if (anchored[index(gridX, gridY)])
            maskContext.fillRect(gridX, gridY, 1, 1);
        }
      }
      maskedContext.globalCompositeOperation = "source-over";
      maskedContext.clearRect(
        0,
        0,
        maskedLogoCanvas.width,
        maskedLogoCanvas.height,
      );
      maskedContext.drawImage(
        image,
        0,
        0,
        maskedLogoCanvas.width,
        maskedLogoCanvas.height,
      );
      maskedContext.globalCompositeOperation = "destination-in";
      maskedContext.drawImage(
        maskCanvas,
        0,
        0,
        maskedLogoCanvas.width,
        maskedLogoCanvas.height,
      );
      maskedContext.globalCompositeOperation = "source-over";
      anchoredTextureDirty = false;
    }
    context.drawImage(
      maskedLogoCanvas,
      worldOffsetX + HOME_LEFT * unit,
      worldOffsetY + HOME_TOP * unit,
      GRID * unit,
      GRID * unit,
    );
  }

  function updateReadout(now, force = false) {
    if (!force && now - lastReadout < 100) return;
    lastReadout = now;
    const freedom =
      phase === "rebuild"
        ? Math.max(0, 1 - (now - phaseStarted) / 2200)
        : total
          ? 1 - anchoredCount / total
          : 0;
    const percentage = Math.round(Math.max(0, Math.min(1, freedom)) * 100);
    phaseNode.textContent = reducedMotion
      ? "Ordre préservé"
      : phaseLabels[phase];
    progressNode.style.width = `${percentage}%`;
    countNode.textContent = `${percentage} % LIBRE`;
  }

  function draw(now) {
    animationFrame = 0;
    if (!visible) return;
    if (!lastTime) lastTime = now;
    const delta = Math.min(50, now - lastTime);
    lastTime = now;
    accumulator += delta;
    if (!reducedMotion) {
      while (accumulator >= 1000 / 60) {
        step(now);
        accumulator -= 1000 / 60;
      }
    }
    drawBackground(now);
    drawParticles(now);
    updateReadout(now);
    if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x:
        (((event.clientX - rect.left) / rect.width) * cssWidth -
          worldOffsetX) /
        unit,
      y:
        (((event.clientY - rect.top) / rect.height) * cssHeight -
          worldOffsetY) /
        unit,
    };
  }

  canvas.addEventListener("pointermove", (event) => {
    pointer = pointerPosition(event);
  });
  canvas.addEventListener("pointerleave", () => {
    pointer = null;
  });
  accelerateButton.addEventListener("click", () => {
    if (reducedMotion) return;
    const now = performance.now();
    if (phase === "order") {
      phase = "erosion";
      phaseStarted = now;
    }
    if (phase === "settled" || phase === "rebuild") return;
    boostUntil = now + 3200;
  });
  rebuildButton.addEventListener("click", () => {
    if (reducedMotion) return;
    beginRebuild(performance.now());
  });
  accelerateButton.disabled = reducedMotion;
  rebuildButton.disabled = reducedMotion;

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry && entry.isIntersecting);
    if (visible && !animationFrame) {
      lastTime = performance.now();
      animationFrame = requestAnimationFrame(draw);
    }
    if (!visible && animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
  });
  resizeObserver.observe(stage);
  intersectionObserver.observe(root);
  resize();

  const start = () => {
    if (particles.length) return;
    initializeParticles();
    if (!animationFrame) animationFrame = requestAnimationFrame(draw);
  };
  image.addEventListener("load", start, { once: true });
  image.addEventListener("error", () => {
    phaseNode.textContent = "Logo statique";
  });
  if (image.complete && image.naturalWidth) start();
})();
