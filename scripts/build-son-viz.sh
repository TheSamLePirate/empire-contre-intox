#!/usr/bin/env bash
# Reconstruit les ateliers React du Dossier XXXI « Le Son » et met à jour les
# empreintes de cache qui en dépendent, en une seule passe :
#
#   1. registre des ateliers   gen-registry.py → registry.gen.tsx
#   2. typage strict           tsc (0 erreur exigée)
#   3. bundle des ateliers     a_traiter/provoxys-son/visualisations/mount.tsx → provoxys/son/assets/son-viz.js
#   4. feuille de style        styles.css → provoxys/son/assets/son-viz.css
#   5. empreintes ?v= des pages HTML du dossier (scripts/stamp-assets.py)
#
# Les workers et worklets n'ont pas de fichier propre : ils sont sérialisés en Blob
# depuis le bundle (shared/worker.ts), donc aucune empreinte embarquée à recalculer.
# Le bundle n'est chargé par la page qu'au premier clic « Activer l'atelier ».
# À lancer après toute modification d'un atelier, puis committer les fichiers
# produits (assets/son-viz.* + index.html) avec les sources.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=a_traiter/provoxys-son/visualisations
OUT=provoxys/son/assets
[[ -f "$SRC/mount.tsx" ]] || { echo "Sources introuvables : $SRC (dossier de travail privé)" >&2; exit 1; }

hash12() { shasum -a 256 "$1" | cut -c1-12; }

echo "▶ 1/5 registre des ateliers"
python3 "$SRC/gen-registry.py"

echo "▶ 2/5 typage strict"
( cd "$SRC" && npx --prefix ../../.. -p typescript tsc -p tsconfig.json )

echo "▶ 3/5 bundle des ateliers"
npx esbuild "$SRC/mount.tsx" --bundle --minify --format=iife --jsx=automatic \
  --define:process.env.NODE_ENV='"production"' --target=es2020 --legal-comments=none \
  --outfile="$OUT/son-viz.js" --log-level=warning

echo "▶ 4/5 feuille de style"
npx esbuild "$SRC/styles.css" --minify --outfile="$OUT/son-viz.css" --log-level=warning

echo "▶ 5/5 empreintes des pages"
python3 scripts/stamp-assets.py provoxys/son

echo "✓ son-viz.js $(hash12 "$OUT/son-viz.js") ($(wc -c < "$OUT/son-viz.js" | tr -d ' ') o) · son-viz.css $(hash12 "$OUT/son-viz.css")"
