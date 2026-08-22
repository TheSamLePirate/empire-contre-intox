#!/usr/bin/env node
// Régénère l'image sociale de l'accueil (og:image) à partir du VRAI hero de `index.html`.
//
//   node scripts/generate-og-hero.mjs
//
// Le hero est une mosaïque de cinq panneaux diagonaux + le sceau : aucune image
// statique du dépôt ne le représente. On le rend donc dans Chrome headless, au
// ratio Open Graph 1,91:1, puis on réduit à 1200×630 (supersampling ×2).
//
// Dépendances : Google Chrome et `sips` (macOS). À relancer si le hero change.

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "assets/og-index.jpg");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 8791;
const debugPort = 9421;

// Le hero mesure 987 px de haut (en-tête comprise) et ne dépend pas de la hauteur
// de fenêtre : on choisit donc la largeur qui donne exactement le ratio 1,91:1.
const captureHeight = 987;
const captureWidth = Math.round(captureHeight * 1.91);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml", ".json": "application/json", ".mp4": "video/mp4" };

if (!existsSync(chrome)) throw new Error(`Google Chrome introuvable : ${chrome}`);

const server = createServer((req, res) => {
  const relative = decodeURIComponent((req.url ?? "/").split("?")[0]).replace(/^\/+/, "") || "index.html";
  const file = path.join(root, relative);
  if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { "content-type": mime[path.extname(file).toLowerCase()] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

const profile = await mkdtemp(path.join(tmpdir(), "eci-og-"));
const browser = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars",
  `--user-data-dir=${profile}`, `--remote-debugging-port=${debugPort}`, "about:blank"], { stdio: "ignore" });

async function waitForBrowser() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try { return await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" })).json(); }
    catch { await new Promise((resolve) => setTimeout(resolve, 250)); }
  }
  throw new Error("Chrome n'a pas ouvert son port de débogage");
}

function rpc(socket, id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      socket.removeEventListener("message", onMessage);
      message.error ? reject(new Error(`${method}: ${message.error.message}`)) : resolve(message.result);
    };
    socket.addEventListener("message", onMessage);
    socket.send(JSON.stringify({ id, method, params }));
  });
}

try {
  const tab = await waitForBrowser();
  const socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
  let id = 0;
  await rpc(socket, ++id, "Page.enable");
  await rpc(socket, ++id, "Runtime.enable");
  await rpc(socket, ++id, "Emulation.setDeviceMetricsOverride",
    { width: captureWidth, height: captureHeight, deviceScaleFactor: 2, mobile: false });
  const loaded = new Promise((resolve) => {
    const onMessage = (event) => {
      if (JSON.parse(event.data).method !== "Page.loadEventFired") return;
      socket.removeEventListener("message", onMessage);
      resolve();
    };
    socket.addEventListener("message", onMessage);
  });
  await rpc(socket, ++id, "Page.navigate", { url: `http://127.0.0.1:${port}/index.html` });
  await loaded;
  // Laisser les polices, la mosaïque et l'animation d'entrée se poser.
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await rpc(socket, ++id, "Runtime.evaluate", {
    expression: "document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')); window.scrollTo(0, 0);",
  });
  await new Promise((resolve) => setTimeout(resolve, 900));
  const shot = await rpc(socket, ++id, "Page.captureScreenshot",
    { format: "png", clip: { x: 0, y: 0, width: captureWidth, height: captureHeight, scale: 1 } });
  const raw = path.join(profile, "hero.png");
  await writeFile(raw, Buffer.from(shot.data, "base64"));
  socket.close();

  await new Promise((resolve, reject) => {
    const sips = spawn("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", "-z", "630", "1200", raw, "--out", output], { stdio: "ignore" });
    sips.on("exit", (code) => (code === 0 ? resolve() : reject(new Error("sips a échoué"))));
  });
  const written = await readFile(output);
  console.log(`assets/og-index.jpg — 1200×630, ${(written.length / 1024).toFixed(0)} ko`);
} finally {
  browser.kill();
  server.close();
  // Chrome vide encore son profil : on lui laisse le temps, et un reliquat dans
  // /tmp ne doit pas faire échouer la génération.
  await new Promise((resolve) => setTimeout(resolve, 600));
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
