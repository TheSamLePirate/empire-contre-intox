#!/usr/bin/env bash
# Reconstruit les ateliers React du Dossier XXVIII « La Lumière » et met à jour
# toutes les empreintes de cache qui en dépendent, en une seule passe :
#
#   1. worker des mirages   src/lib/mirage-worker.ts → provoxys/lumiere/assets/mirage-worker.js
#   2. empreintes embarquées dans les sources (URL du worker et de l'atlas dans le TSX)
#   3. bundle des ateliers  a_traiter/lumiere/visualisations/mount.tsx → assets/lumiere-viz.js
#   4. feuille de style     styles.css → assets/lumiere-viz.css
#   5. empreintes ?v= des pages HTML du dossier (scripts/stamp-assets.py)
#
# À lancer après toute modification d'un atelier, puis committer les fichiers
# produits (assets/ + index.html) avec les sources.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=a_traiter/lumiere/visualisations
OUT=provoxys/lumiere/assets
[[ -f "$SRC/mount.tsx" ]] || { echo "Sources introuvables : $SRC (dossier de travail privé)" >&2; exit 1; }

hash12() { shasum -a 256 "$1" | cut -c1-12; }

echo "▶ 1/5 worker des mirages"
npx esbuild src/lib/mirage-worker.ts --bundle --minify --format=iife --target=es2020 \
  --outfile="$OUT/mirage-worker.js" --log-level=warning

echo "▶ 2/5 empreintes embarquées (worker, atlas)"
wh="$(hash12 "$OUT/mirage-worker.js")"
ah="$(hash12 "$OUT/mirage-objects-hd.png")"
aw="$(hash12 "$OUT/mirage-objects-hd.webp")"
perl -pi -e "s#(assets/mirage-worker\.js\?v=)[0-9a-f]+#\${1}$wh#" "$SRC/components/L34Mirages.tsx"
perl -pi -e "s#(assets/mirage-objects-hd\.png\?v=)[0-9a-f]+#\${1}$ah#" "$SRC/shared/mirage-renderer.ts"
perl -pi -e "s#(assets/mirage-objects-hd\.webp\?v=)[0-9a-f]+#\${1}$aw#" "$SRC/shared/mirage-renderer.ts"
grep -q "mirage-worker.js?v=$wh" "$SRC/components/L34Mirages.tsx" || { echo "Empreinte du worker non posée dans L34Mirages.tsx" >&2; exit 1; }
grep -q "mirage-objects-hd.png?v=$ah" "$SRC/shared/mirage-renderer.ts" || { echo "Empreinte de l'atlas PNG non posée dans mirage-renderer.ts" >&2; exit 1; }
grep -q "mirage-objects-hd.webp?v=$aw" "$SRC/shared/mirage-renderer.ts" || { echo "Empreinte de l'atlas WebP non posée dans mirage-renderer.ts" >&2; exit 1; }

echo "▶ 3/5 bundle des ateliers"
npx esbuild "$SRC/mount.tsx" --bundle --minify --format=iife --jsx=automatic \
  --define:process.env.NODE_ENV='"production"' --target=es2020 \
  --outfile="$OUT/lumiere-viz.js" --log-level=warning

echo "▶ 4/5 feuille de style"
cp "$SRC/styles.css" "$OUT/lumiere-viz.css"

echo "▶ 5/5 empreintes des pages"
python3 scripts/stamp-assets.py provoxys/lumiere

echo "✓ lumiere-viz.js $(hash12 "$OUT/lumiere-viz.js") · lumiere-viz.css $(hash12 "$OUT/lumiere-viz.css") · mirage-worker.js $wh"
