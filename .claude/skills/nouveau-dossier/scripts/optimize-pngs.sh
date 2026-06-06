#!/usr/bin/env bash
# optimize-pngs.sh — optimise des PNG (pngquant lossy haute qualité + oxipng
# lossless), SANS jamais agrandir un fichier, et signale le gain.
#
# C'est le standard d'optimisation du site : on garde le format PNG et les
# mêmes chemins (aucune page à modifier), on réduit le poids de ~60 %.
#
# Usage :
#   optimize-pngs.sh fichier1.png [fichier2.png ...]
#   optimize-pngs.sh dossier/            # tous les .png du dossier (récursif)
#   optimize-pngs.sh --tracked           # tous les PNG suivis par git (depuis la racine)
#
# Prérequis : pngquant + oxipng (brew install pngquant oxipng).
set -euo pipefail

command -v pngquant >/dev/null || { echo "pngquant manquant (brew install pngquant)"; exit 1; }
command -v oxipng  >/dev/null || { echo "oxipng manquant (brew install oxipng)"; exit 1; }

# Construire la liste de fichiers
files=()
if [ "${1:-}" = "--tracked" ]; then
  while IFS= read -r f; do files+=("$f"); done < <(git ls-files '*.png' '*.PNG')
else
  for arg in "$@"; do
    if [ -d "$arg" ]; then
      while IFS= read -r f; do files+=("$f"); done < <(find "$arg" -type f -iname '*.png')
    elif [ -f "$arg" ]; then
      files+=("$arg")
    fi
  done
fi
[ ${#files[@]} -gt 0 ] || { echo "Aucun PNG à traiter."; exit 0; }

bytes() { stat -f%z "$1" 2>/dev/null || stat -c%s "$1"; }

before=0; after=0; n=0; bad=0
for f in "${files[@]}"; do
  o=$(bytes "$f"); before=$((before + o))
  tmp="$f.opt.tmp"
  if pngquant --quality=80-97 --speed 1 --strip --force --output "$tmp" "$f" 2>/dev/null; then :; else cp "$f" "$tmp"; fi
  oxipng -o 4 --strip safe -q "$tmp" 2>/dev/null || true
  nw=$(bytes "$tmp")
  if [ "$nw" -gt 0 ] && [ "$nw" -lt "$o" ]; then mv "$tmp" "$f"; else rm -f "$tmp"; fi
  # contrôle d'intégrité : le PNG doit rester décodable
  if command -v sips >/dev/null; then
    sips -g pixelWidth "$f" >/dev/null 2>&1 || { echo "CORROMPU: $f"; bad=$((bad+1)); }
  fi
  a=$(bytes "$f"); after=$((after + a)); n=$((n+1))
done

mb() { awk "BEGIN{printf \"%.1f\", $1/1048576}"; }
pct=$(awk "BEGIN{ if($before>0) printf \"%.0f\", (1-$after/$before)*100; else print 0 }")
echo "Optimisé : $n PNG · $(mb $before) Mo → $(mb $after) Mo (-$pct%) · corrompus: $bad"
[ "$bad" -eq 0 ] || exit 1
