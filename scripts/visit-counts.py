#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Affiche et historise les visites enregistrées par le compteur ECI.

Par défaut, le script affiche les compteurs cumulés actuels. Le serveur ne conserve
que ces totaux : pour obtenir des visites par jour, ce script enregistre donc une
photographie locale quotidienne et calcule la différence avec la précédente.

Le miroir GitHub Pages envoie désormais ses visites vers les mêmes chemins
canoniques que le domaine principal :
  - domaine principal : /ymir-lalie/resume-eres.html
  - miroir Pages      : /empire-contre-intox/ymir-lalie/resume-eres.html
                        → /ymir-lalie/resume-eres.html

Usage courant :
  python3 scripts/visit-counts.py                     # compteurs cumulés actuels
  python3 scripts/visit-counts.py --record            # photographie du jour
  python3 scripts/visit-counts.py --daily             # visites quotidiennes
  python3 scripts/visit-counts.py --daily --details   # détail par dossier

Exemple de crontab, tous les jours à 23 h 55 :
  55 23 * * * cd /chemin/vers/empire-contre-intox && \
    /usr/bin/python3 scripts/visit-counts.py --record --quiet

L'historique est local et n'est pas écrit dans le dépôt. Son emplacement par défaut
est ~/.local/share/empire-contre-intox/visit-counts-history.csv. Utiliser
--history-file pour le changer ou le sauvegarder ailleurs.
"""

from __future__ import annotations

import argparse
import csv
import html
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
DEFAULT_API_BASE = "https://empire-contre-intox.com/api"
DEFAULT_HISTORY_FILE = Path(
    os.environ.get(
        "ECI_VISIT_HISTORY",
        "~/.local/share/empire-contre-intox/visit-counts-history.csv",
    )
).expanduser()
GH_PREFIX = "/empire-contre-intox"
HISTORY_FIELDS = ["snapshot_date", "recorded_at", "mode", "no", "title", "path", "visits"]


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

    for block in re.findall(r'<article class="dossier[^"]*"[^>]*>(.*?)</article>', src, re.S):
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


def read_history(path: Path) -> list[dict]:
    if not path.exists():
        return []

    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        missing = set(HISTORY_FIELDS) - set(reader.fieldnames or [])
        if missing:
            raise ValueError(
                f"historique invalide ({path}) : colonnes manquantes : "
                + ", ".join(sorted(missing))
            )
        return [dict(row) for row in reader]


def write_history(path: Path, history: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with NamedTemporaryFile(
        "w",
        newline="",
        encoding="utf-8",
        dir=path.parent,
        prefix=path.name + ".",
        suffix=".tmp",
        delete=False,
    ) as handle:
        writer = csv.DictWriter(handle, fieldnames=HISTORY_FIELDS)
        writer.writeheader()
        writer.writerows(history)
        temporary = Path(handle.name)
    temporary.replace(path)


def record_snapshot(path: Path, rows: list[dict], mode: str, now: datetime) -> int:
    history = read_history(path)
    snapshot_date = now.date().isoformat()
    recorded_at = now.astimezone().isoformat(timespec="seconds")

    history = [
        row for row in history
        if not (row["snapshot_date"] == snapshot_date and row["mode"] == mode)
    ]

    for row in rows:
        effective_path = (
            row["mirror_effective_path"] if mode == "mirror"
            else row["primary_effective_path"]
        )
        history.append({
            "snapshot_date": snapshot_date,
            "recorded_at": recorded_at,
            "mode": mode,
            "no": row["no"],
            "title": row["title"],
            "path": effective_path,
            "visits": str(row["total_visits"]),
        })

    history.sort(key=lambda row: (row["snapshot_date"], row["mode"], row["path"]))
    write_history(path, history)
    return len(rows)


def build_daily_intervals(history: list[dict], mode: str, days: int) -> list[dict]:
    snapshots: dict[date, dict[str, dict]] = {}
    for row in history:
        if row["mode"] != mode:
            continue
        try:
            snapshot_date = date.fromisoformat(row["snapshot_date"])
            visits = int(row["visits"])
        except (TypeError, ValueError):
            continue
        snapshots.setdefault(snapshot_date, {})[row["path"]] = {
            "no": row["no"],
            "title": row["title"],
            "visits": visits,
        }

    dates = sorted(snapshots)
    intervals: list[dict] = []
    for previous_date, current_date in zip(dates, dates[1:]):
        previous = snapshots[previous_date]
        current = snapshots[current_date]
        pages = []
        resets = 0
        new_pages = 0

        for path, current_row in current.items():
            if path not in previous:
                delta = current_row["visits"]
                new_pages += 1
            else:
                previous_visits = previous[path]["visits"]
                if current_row["visits"] < previous_visits:
                    delta = current_row["visits"]
                    resets += 1
                else:
                    delta = current_row["visits"] - previous_visits

            pages.append({
                "date": current_date.isoformat(),
                "since": previous_date.isoformat(),
                "period_days": (current_date - previous_date).days,
                "no": current_row["no"],
                "title": current_row["title"],
                "path": path,
                "visits": delta,
            })

        pages.sort(key=lambda row: (-row["visits"], row["no"], row["title"]))
        intervals.append({
            "date": current_date.isoformat(),
            "since": previous_date.isoformat(),
            "period_days": (current_date - previous_date).days,
            "visits": sum(row["visits"] for row in pages),
            "resets": resets,
            "new_pages": new_pages,
            "pages": pages,
        })

    return intervals[-days:] if days > 0 else intervals


def format_number(value: int) -> str:
    return f"{value:,}".replace(",", " ")


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
            line.append(format_number(row["primary_visits"]))
        if show_mirror:
            line.append("agrégé" if row.get("mirror_aggregated") else format_number(row["mirror_visits"]))
        if mode == "both":
            line.append(format_number(row["total_visits"]))
        line.append(row["primary_path"])
        table.append(line)

    print_text_table(headers, table)
    total = sum(
        row["total_visits"] if mode == "both"
        else row["primary_visits"] if mode == "primary"
        else row["mirror_visits"]
        for row in rows
    )
    print("\nTotal affiché : " + format_number(total) + " visites")


def print_text_table(headers: list[str], table: list[list[str]]) -> None:
    widths = [len(header) for header in headers]
    for line in table:
        for index, cell in enumerate(line):
            widths[index] = max(widths[index], len(str(cell)))

    def fmt(line: list[str]) -> str:
        return "  ".join(str(cell).ljust(widths[index]) for index, cell in enumerate(line))

    print(fmt(headers))
    print(fmt(["─" * width for width in widths]))
    for line in table:
        print(fmt(line))


def print_daily(intervals: list[dict], details: bool) -> None:
    if not intervals:
        print("Pas encore de comparaison quotidienne disponible.")
        print("Enregistrez au moins deux jours avec --record.")
        return

    if not details:
        headers = ["Date", "Période", "Visites", "Note"]
        table = []
        for interval in intervals:
            notes = []
            if interval["period_days"] != 1:
                notes.append(f'{interval["period_days"]} jours entre relevés')
            if interval["resets"]:
                notes.append(f'{interval["resets"]} compteur(s) réinitialisé(s)')
            if interval["new_pages"]:
                notes.append(f'{interval["new_pages"]} nouvelle(s) page(s)')
            table.append([
                interval["date"],
                f'{interval["since"]} → {interval["date"]}',
                format_number(interval["visits"]),
                "; ".join(notes) or "relevé quotidien",
            ])
        print_text_table(headers, table)
        print("\nTotal sur les périodes affichées : " + format_number(sum(i["visits"] for i in intervals)) + " visites")
        return

    headers = ["Date", "Dossier", "Titre", "Visites", "Chemin"]
    table = []
    for interval in intervals:
        for page in interval["pages"]:
            table.append([
                page["date"],
                page["no"],
                page["title"],
                format_number(page["visits"]),
                page["path"],
            ])
    print_text_table(headers, table)


def print_daily_csv(intervals: list[dict], details: bool) -> None:
    if details:
        fieldnames = ["date", "since", "period_days", "no", "title", "path", "visits"]
        rows = [page for interval in intervals for page in interval["pages"]]
    else:
        fieldnames = ["date", "since", "period_days", "visits", "resets", "new_pages"]
        rows = [{key: interval[key] for key in fieldnames} for interval in intervals]

    writer = csv.DictWriter(sys.stdout, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description="Affiche et historise les visites par dossier ECI.")
    parser.add_argument("--api-base", default=DEFAULT_API_BASE, help=f"Base API du compteur (défaut: {DEFAULT_API_BASE})")
    parser.add_argument("--mode", choices=["primary", "mirror", "both"], default="primary", help="Chemins à interroger (défaut: primary, déjà agrégé principal + miroir)")
    parser.add_argument("--sort", choices=["number", "count", "title"], default="number", help="Tri des compteurs actuels (défaut: number)")
    parser.add_argument("--timeout", type=float, default=8.0, help="Timeout HTTP par requête, en secondes")
    parser.set_defaults(include_index=True)
    parser.add_argument("--include-index", action="store_true", help=argparse.SUPPRESS)
    parser.add_argument("--no-index", dest="include_index", action="store_false", help="Masque la page d'accueil /")
    parser.add_argument("--include-agenda", action="store_true", help="Ajoute la carte Agenda si elle est présente dans index.html")
    parser.add_argument("--record", action="store_true", help="Enregistre ou met à jour la photographie locale du jour")
    parser.add_argument("--daily", action="store_true", help="Affiche les différences entre les photographies quotidiennes")
    parser.add_argument("--details", action="store_true", help="Avec --daily, affiche le détail par dossier")
    parser.add_argument("--days", type=int, default=30, help="Nombre de périodes quotidiennes à afficher (défaut: 30, 0 = toutes)")
    parser.add_argument("--history-file", type=Path, default=DEFAULT_HISTORY_FILE, help=f"Fichier CSV local (défaut: {DEFAULT_HISTORY_FILE})")
    parser.add_argument("--quiet", action="store_true", help="N'affiche rien lors d'un relevé réussi (utile avec cron)")
    parser.add_argument("--json", action="store_true", help="Sortie JSON")
    parser.add_argument("--csv", action="store_true", help="Sortie CSV")
    args = parser.parse_args()

    if args.days < 0:
        parser.error("--days doit être positif ou nul")
    if args.json and args.csv:
        parser.error("--json et --csv sont incompatibles")
    if args.details and not args.daily:
        parser.error("--details nécessite --daily")
    if args.mode == "both" and args.record:
        parser.error("--record ne peut pas utiliser --mode both ; utilisez primary ou mirror")

    history_file = args.history_file.expanduser().resolve()

    if args.daily and not args.record:
        try:
            history = read_history(history_file)
        except (OSError, ValueError) as exc:
            print(f"Erreur : {exc}", file=sys.stderr)
            return 1
        intervals = build_daily_intervals(history, args.mode, args.days)
        if args.json:
            print(json.dumps({"mode": args.mode, "history_file": str(history_file), "intervals": intervals}, ensure_ascii=False, indent=2))
        elif args.csv:
            print_daily_csv(intervals, args.details)
        else:
            print_daily(intervals, args.details)
        return 0

    cards = [card for card in parse_dossiers(INDEX) if should_keep(card, include_agenda=args.include_agenda)]
    if args.sort == "number":
        cards.sort(key=dossier_sort_key)

    rows, errors = build_rows(cards, args)

    if args.record:
        if errors:
            print("Relevé annulé : certains compteurs n'ont pas pu être lus.", file=sys.stderr)
        else:
            try:
                count = record_snapshot(history_file, rows, args.mode, datetime.now().astimezone())
            except (OSError, ValueError) as exc:
                print(f"Impossible d'enregistrer le relevé : {exc}", file=sys.stderr)
                return 1
            if not args.quiet and not args.daily:
                print(f"Relevé du {date.today().isoformat()} enregistré : {count} pages dans {history_file}")

    if args.daily:
        if errors:
            return 1
        try:
            intervals = build_daily_intervals(read_history(history_file), args.mode, args.days)
        except (OSError, ValueError) as exc:
            print(f"Erreur : {exc}", file=sys.stderr)
            return 1
        if args.json:
            print(json.dumps({"mode": args.mode, "history_file": str(history_file), "intervals": intervals}, ensure_ascii=False, indent=2))
        elif args.csv:
            print_daily_csv(intervals, args.details)
        elif not args.quiet:
            print_daily(intervals, args.details)
    elif not args.record or (not args.quiet and errors):
        if args.json:
            print(json.dumps({"rows": rows, "errors": errors}, ensure_ascii=False, indent=2))
        elif args.csv:
            writer = csv.DictWriter(sys.stdout, fieldnames=list(rows[0].keys()) if rows else [])
            writer.writeheader()
            writer.writerows(rows)
        elif not args.record:
            print_table(rows, args.mode)

    if errors:
        print("\nErreurs :", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)

    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
