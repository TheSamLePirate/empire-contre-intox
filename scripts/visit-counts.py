#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Affiche les visites enregistrées par le compteur ECI pour chaque dossier.

Par défaut, le script lit les chemins canoniques du domaine principal.
Le miroir GitHub Pages envoie désormais ses visites vers le même compteur et les
mêmes chemins canoniques, afin d'agréger automatiquement les deux canaux :
  - domaine principal : /ymir-lalie/resume-eres.html
  - miroir Pages      : /empire-contre-intox/ymir-lalie/resume-eres.html → /ymir-lalie/resume-eres.html

Usage courant :
  python3 scripts/visit-counts.py                     # inclut l'accueil + les dossiers

Options utiles :
  python3 scripts/visit-counts.py --mode primary       # compteur agrégé canonique
  python3 scripts/visit-counts.py --mode mirror        # diagnostic du chemin miroir
  python3 scripts/visit-counts.py --no-index           # masque la page d'accueil
  python3 scripts/visit-counts.py --include-agenda     # ajoute l'agenda externe si présent
  python3 scripts/visit-counts.py --json               # sortie JSON
  python3 scripts/visit-counts.py --csv                # sortie CSV
"""

from __future__ import annotations

import argparse
import csv
import html
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
DEFAULT_API_BASE = "https://empire-contre-intox.com/api"
GH_PREFIX = "/empire-contre-intox"


@dataclass
class Dossier:
    no: str
    title: str
    href: str
    primary_path: str
    mirror_path: str


def strip_tags(value: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", "", value or "").strip())


def normalize_counter_path(value: str, *, mirror: bool = False) -> str:
    """Reproduit la normalisation du compteur front/back pour un lien d'index."""
    raw = (value or "/").strip() or "/"

    if re.match(r"^https?://", raw, re.I):
        parsed = urllib.parse.urlparse(raw)
        raw = parsed.path or "/"
    else:
        raw = raw.split("#", 1)[0].split("?", 1)[0]
        if not raw.startswith("/"):
            raw = "/" + raw

    raw = re.sub(r"/+", "/", raw)
    raw = re.sub(r"/index\.html$", "/", raw, flags=re.I)

    if mirror and raw != "/" and not raw.startswith(GH_PREFIX + "/"):
        raw = GH_PREFIX + raw
    elif mirror and raw == "/":
        raw = GH_PREFIX + "/"

    return raw or "/"


def parse_dossiers(index_path: Path) -> list[Dossier]:
    src = index_path.read_text(encoding="utf-8")
    cards: list[Dossier] = []

    for block in re.findall(r"<article class=\"dossier[^\"]*\"[^>]*>(.*?)</article>", src, re.S):
        no_m = re.search(r'class="dossier-no">(.*?)<', block, re.S)
        title_m = re.search(r'<h3>(.*?)</h3>', block, re.S)
        link_m = re.search(r'class="dossier-link" href="([^"]+)"', block)
        if not (no_m and title_m and link_m):
            continue

        no = strip_tags(no_m.group(1))
        title = strip_tags(title_m.group(1))
        href = html.unescape(link_m.group(1))

        cards.append(Dossier(
            no=no,
            title=title,
            href=href,
            primary_path=normalize_counter_path(href, mirror=False),
            mirror_path=normalize_counter_path(href, mirror=True),
        ))

    return cards


def fetch_count(api_base: str, path: str, timeout: float) -> tuple[int, str]:
    url = api_base.rstrip("/") + "/count?" + urllib.parse.urlencode({"path": path})
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as res:
        payload = json.loads(res.read().decode("utf-8"))
    visits = payload.get("visits", 0)
    normalized_path = str(payload.get("path") or path)
    return int(visits) if isinstance(visits, int) else int(visits or 0), normalized_path


def should_keep(card: Dossier, *, include_agenda: bool) -> bool:
    if card.no.lower() == "agenda":
        return include_agenda
    return card.no.lower().startswith("dossier")


def dossier_sort_key(card: Dossier) -> tuple[int, str]:
    roman = card.no.replace("Dossier", "").strip()
    values = {
        "I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7,
        "VIII": 8, "IX": 9, "X": 10, "XI": 11, "XII": 12, "XIII": 13,
        "XIV": 14, "XV": 15, "XVI": 16, "XVII": 17, "XVIII": 18,
        "XIX": 19, "XX": 20, "XXI": 21, "XXII": 22, "XXIII": 23,
    }
    return (values.get(roman, 999), card.title)


def build_rows(cards: Iterable[Dossier], args: argparse.Namespace) -> tuple[list[dict], list[str]]:
    rows: list[dict] = []
    errors: list[str] = []

    if args.include_index:
        cards = [Dossier("Index", "Accueil ECI", "index.html", "/", GH_PREFIX + "/"), *cards]

    for card in cards:
        primary = mirror = 0
        primary_effective_path = card.primary_path
        mirror_effective_path = card.mirror_path
        try:
            if args.mode in ("primary", "both"):
                primary, primary_effective_path = fetch_count(args.api_base, card.primary_path, args.timeout)
            if args.mode in ("mirror", "both"):
                mirror, mirror_effective_path = fetch_count(args.api_base, card.mirror_path, args.timeout)
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, ValueError) as exc:
            errors.append(f"{card.no} — {card.title}: {exc}")

        mirror_aggregated = args.mode == "both" and primary_effective_path == mirror_effective_path
        if args.mode == "primary":
            total = primary
        elif args.mode == "mirror":
            total = mirror
        else:
            total = primary if mirror_aggregated else primary + mirror

        rows.append({
            "no": card.no,
            "title": card.title,
            "primary_path": card.primary_path,
            "primary_effective_path": primary_effective_path,
            "primary_visits": primary,
            "mirror_path": card.mirror_path,
            "mirror_effective_path": mirror_effective_path,
            "mirror_visits": mirror,
            "mirror_aggregated": mirror_aggregated,
            "total_visits": total,
        })

    if args.sort == "count":
        rows.sort(key=lambda r: (-r["total_visits"], r["no"], r["title"]))
    elif args.sort == "title":
        rows.sort(key=lambda r: r["title"].lower())

    return rows, errors


def print_table(rows: list[dict], mode: str) -> None:
    show_primary = mode in ("primary", "both")
    show_mirror = mode in ("mirror", "both")

    headers = ["Dossier", "Titre"]
    if show_primary:
        headers.append("Principal")
    if show_mirror:
        headers.append("Miroir")
    if mode == "both":
        headers.append("Total")
    headers.append("Chemin")

    table = []
    for row in rows:
        line = [row["no"], row["title"]]
        if show_primary:
            line.append(f'{row["primary_visits"]:,}'.replace(",", " "))
        if show_mirror:
            line.append("agrégé" if row.get("mirror_aggregated") else f'{row["mirror_visits"]:,}'.replace(",", " "))
        if mode == "both":
            line.append(f'{row["total_visits"]:,}'.replace(",", " "))
        line.append(row["primary_path"])
        table.append(line)

    widths = [len(h) for h in headers]
    for line in table:
        for i, cell in enumerate(line):
            widths[i] = max(widths[i], len(str(cell)))

    def fmt(line: list[str]) -> str:
        return "  ".join(str(cell).ljust(widths[i]) for i, cell in enumerate(line))

    print(fmt(headers))
    print(fmt(["─" * w for w in widths]))
    for line in table:
        print(fmt(line))

    total = sum(row["total_visits"] if mode == "both" else row["primary_visits"] if mode == "primary" else row["mirror_visits"] for row in rows)
    print("\nTotal affiché : " + f"{total:,}".replace(",", " ") + " visites")


def main() -> int:
    parser = argparse.ArgumentParser(description="Affiche les visites par dossier ECI depuis /api/count.")
    parser.add_argument("--api-base", default=DEFAULT_API_BASE, help=f"Base API du compteur (défaut: {DEFAULT_API_BASE})")
    parser.add_argument("--mode", choices=["primary", "mirror", "both"], default="primary", help="Chemins à interroger (défaut: primary, déjà agrégé principal + miroir)")
    parser.add_argument("--sort", choices=["number", "count", "title"], default="number", help="Tri de sortie (défaut: number)")
    parser.add_argument("--timeout", type=float, default=8.0, help="Timeout HTTP par requête, en secondes")
    parser.set_defaults(include_index=True)
    parser.add_argument("--include-index", action="store_true", help=argparse.SUPPRESS)
    parser.add_argument("--no-index", dest="include_index", action="store_false", help="Masque la page d'accueil /")
    parser.add_argument("--include-agenda", action="store_true", help="Ajoute la carte Agenda si elle est présente dans index.html")
    parser.add_argument("--json", action="store_true", help="Sortie JSON")
    parser.add_argument("--csv", action="store_true", help="Sortie CSV")
    args = parser.parse_args()

    cards = [card for card in parse_dossiers(INDEX) if should_keep(card, include_agenda=args.include_agenda)]
    if args.sort == "number":
        cards.sort(key=dossier_sort_key)

    rows, errors = build_rows(cards, args)

    if args.json:
        print(json.dumps({"rows": rows, "errors": errors}, ensure_ascii=False, indent=2))
    elif args.csv:
        writer = csv.DictWriter(sys.stdout, fieldnames=list(rows[0].keys()) if rows else [])
        writer.writeheader()
        writer.writerows(rows)
    else:
        print_table(rows, args.mode)
        if errors:
            print("\nErreurs :", file=sys.stderr)
            for error in errors:
                print(f"- {error}", file=sys.stderr)

    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
