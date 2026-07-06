(() => {
  const target = document.querySelector("[data-visit-counter]");
  if (!target) return;

  const isGithubMirror = location.hostname === "thesamlepirate.github.io";

  const normalizePath = (value) => {
    const url = new URL(value || location.href, location.origin);
    let path = url.pathname || "/";
    path = path.replace(/\/index\.html$/i, "/");

    // GitHub Pages sert le site sous /empire-contre-intox/ ; le compteur
    // canonise ce préfixe pour agréger miroir + domaine principal.
    if (isGithubMirror) {
      path = path.replace(/^\/empire-contre-intox(?=\/|$)/i, "") || "/";
    }

    return path || "/";
  };

  const path = normalizePath(location.href);
  const apiBase = isGithubMirror
    ? "https://empire-contre-intox.com/api"
    : "/api";

  const label = (n) => `${new Intl.NumberFormat("fr-FR").format(n)} visite${n > 1 ? "s" : ""} sur cette page`;

  fetch(`${apiBase}/visit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path }),
    cache: "no-store",
    keepalive: true,
  })
    .then((res) => res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`)))
    .then((data) => {
      if (typeof data.visits === "number") target.textContent = label(data.visits);
    })
    .catch(() => {
      target.textContent = "";
      target.hidden = true;
    });
})();
