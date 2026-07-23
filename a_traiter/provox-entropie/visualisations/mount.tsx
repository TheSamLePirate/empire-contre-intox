// Point d'entrée d'intégration au dossier statique « Entropie ».
// Monte chaque visualisation React (V1–V26) dans son conteneur `[data-entropy-viz="Vn"]`
// à l'approche du viewport (IntersectionObserver), pour garder la page fluide.
import { createElement, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { entropyVisualizations } from "./registry";
import type { VisualizationProps } from "./shared/types";

const byId = new Map(entropyVisualizations.map((v) => [v.id, v.component]));

function mount(el: HTMLElement) {
  if (el.dataset.mounted) return;
  const id = el.getAttribute("data-entropy-viz");
  const Comp = id ? byId.get(id as `V${number}`) : undefined;
  if (!Comp) return;
  el.dataset.mounted = "1";
  const seed = el.dataset.seed ? Number(el.dataset.seed) : undefined;
  createRoot(el).render(
    createElement(
      Comp as ComponentType<VisualizationProps>,
      seed !== undefined ? { seed } : {},
    ),
  );
}

function init() {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-entropy-viz]"),
  );
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(mount);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          mount(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "500px 0px" },
  );
  nodes.forEach((n) => io.observe(n));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
