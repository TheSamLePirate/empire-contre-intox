#!/usr/bin/env python3
"""Génère les vignettes d'avatars/sceaux partagées utilisées par `index.html`.

Les avatars sources (`ymir-lalie/lalie.jpeg`, `provoxys/provoxys.jpeg`, …) font
794 → 1254 px de côté et pèsent 110–1150 Ko, alors que l'index les affiche en
cercles de 34 px (44 px pour le sceau de la barre). Chargés tels quels, les ~50
avatars de la page représentent ~5,5 Mo de téléchargement et surtout ~200 Mo de
bitmaps décodés — la principale cause de saccades au défilement.

Ce script produit des vignettes carrées WebP dans `assets/avatars/`, déduplique
les fichiers identiques présents dans plusieurs dossiers d'équipe, et laisse les
originaux intacts (les pages de dossier continuent de les utiliser).

Usage : python3 scripts/build-avatar-thumbs.py
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("Pillow requis : pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "assets" / "avatars"

# slug de sortie -> (source canonique, tailles à générer)
AVATARS: dict[str, tuple[str, tuple[int, ...]]] = {
    "lalie":       ("ymir-lalie/lalie.jpeg", (128,)),
    "ymir":        ("ymir-lalie/ymir.jpeg", (128,)),
    "samlepirate": ("provoxys/samlepirate.jpeg", (128,)),
    "provoxys":    ("provoxys/provoxys.jpeg", (128,)),
    "phantom":     ("phantom/abeilles/phantom-avatar.png", (128,)),
    "jorge":       ("jorge-zalex/jorge.jpeg", (128,)),
    "zalex":       ("jorge-zalex/zalex.astro.jpeg", (128,)),
    # sceau ECI : 128 px pour les pastilles, 640 px pour l'emblème du hero (≈295 px @2x)
    "logo-eci":    ("ymir-lalie/assets/logo-eci.jpg", (128, 640)),
}


def square_cover(img: Image.Image, size: int) -> Image.Image:
    """Recadre au centre en carré puis redimensionne (équivalent object-fit: cover)."""
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return img.crop((left, top, left + side, top + side)).resize(
        (size, size), Image.LANCZOS
    )


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    total_src = total_out = 0

    for slug, (rel_src, sizes) in AVATARS.items():
        src = ROOT / rel_src
        if not src.exists():
            print(f"  ! source manquante : {rel_src}", file=sys.stderr)
            return 1

        total_src += src.stat().st_size
        with Image.open(src) as img:
            img = img.convert("RGB")
            for size in sizes:
                name = f"{slug}.webp" if size == 128 else f"{slug}-{size}.webp"
                dest = OUT_DIR / name
                square_cover(img, size).save(dest, "WEBP", quality=82, method=6)
                total_out += dest.stat().st_size
                print(f"  {rel_src} → assets/avatars/{name} "
                      f"({size}px, {dest.stat().st_size / 1024:.1f} Ko)")

    print(f"\nSources : {total_src / 1024:.0f} Ko → vignettes : {total_out / 1024:.0f} Ko")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
