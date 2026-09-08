#!/usr/bin/env python3
"""Empreintes de cache (« cache-busting ») des scripts et feuilles de style.

Parcourt les pages HTML du site et réécrit chaque référence locale à un
fichier .js / .mjs / .css en y ajoutant `?v=<12 premiers hex du SHA-256 du
fichier>`. Le serveur (nginx.conf) ne met en cache longue durée que les URL
qui portent ce `?v=` ; les autres sont revalidées à chaque visite. Une
ressource modifiée change donc d'URL et le navigateur la recharge sans que
personne n'ait à vider son cache.

Usage :
  python3 scripts/stamp-assets.py            # réécrit ce qui est périmé
  python3 scripts/stamp-assets.py --check    # code 1 si quelque chose est périmé
  python3 scripts/stamp-assets.py provoxys/lumiere   # limite à un dossier

Périmètre : fichiers HTML suivis par git (ou nouveaux, non ignorés), hors
`a_traiter/`, `node_modules/`, `dist/`, `.legacy-public/`. Les URL absolues
(http://, https://, //, data:) et les cibles introuvables sont laissées telles
quelles.
"""
from __future__ import annotations

import hashlib
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parent.parent
EXCLUDED_PREFIXES = ("a_traiter/", "node_modules/", "dist/", ".legacy-public/", ".astro/")
STAMPABLE = (".js", ".mjs", ".css")
HASH_LEN = 12

# <script … src="…"> et <link … href="…"> ; l'attribut peut être n'importe où dans la balise.
TAG_RE = re.compile(
    r"""<(script|link)\b[^>]*?\b(src|href)\s*=\s*(["'])(?P<url>[^"']+)\3""",
    re.IGNORECASE,
)


def html_files(filters: list[str]) -> list[Path]:
    out = subprocess.run(
        ["git", "ls-files", "-co", "--exclude-standard", "--", "*.html"],
        cwd=ROOT, capture_output=True, text=True, check=True,
    ).stdout.splitlines()
    files = []
    for rel in out:
        if rel.startswith(EXCLUDED_PREFIXES):
            continue
        if filters and not any(rel == f or rel.startswith(f.rstrip("/") + "/") for f in filters):
            continue
        files.append(ROOT / rel)
    return files


def digest(path: Path, cache: dict[Path, str]) -> str:
    if path not in cache:
        cache[path] = hashlib.sha256(path.read_bytes()).hexdigest()[:HASH_LEN]
    return cache[path]


def stamp_url(url: str, html_dir: Path, cache: dict[Path, str]) -> str | None:
    """Renvoie l'URL restampée, ou None si elle n'est pas concernée."""
    if url.startswith(("http://", "https://", "//", "data:", "#", "/")):
        return None
    parts = urlsplit(url)
    if not parts.path.lower().endswith(STAMPABLE):
        return None
    target = (html_dir / parts.path).resolve()
    if not target.is_file():
        return None
    query = [(k, v) for k, v in parse_qsl(parts.query, keep_blank_values=True) if k != "v"]
    query.append(("v", digest(target, cache)))
    return urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(query), parts.fragment))


def process(path: Path, cache: dict[Path, str]) -> tuple[str, list[tuple[str, str]]]:
    text = path.read_text(encoding="utf-8")
    changes: list[tuple[str, str]] = []

    def repl(m: re.Match) -> str:
        url = m.group("url")
        new = stamp_url(url, path.parent, cache)
        if new is None or new == url:
            return m.group(0)
        changes.append((url, new))
        start, end = m.span("url")
        return m.group(0)[: start - m.start()] + new + m.group(0)[end - m.start():]

    return TAG_RE.sub(repl, text), changes


def main(argv: list[str]) -> int:
    check = "--check" in argv
    filters = [a for a in argv if not a.startswith("--")]
    cache: dict[Path, str] = {}
    stale_files = 0
    stale_refs = 0
    for path in html_files(filters):
        new_text, changes = process(path, cache)
        if not changes:
            continue
        stale_files += 1
        stale_refs += len(changes)
        rel = path.relative_to(ROOT)
        for old, new in changes:
            print(f"  {rel}: {old} -> {new}")
        if not check:
            path.write_text(new_text, encoding="utf-8")
    if stale_refs == 0:
        print("Empreintes à jour : aucune référence à restamper.")
        return 0
    verb = "périmée(s)" if check else "mise(s) à jour"
    print(f"{stale_refs} référence(s) {verb} dans {stale_files} fichier(s).")
    if check:
        print("Lancer : python3 scripts/stamp-assets.py")
        return 1
    print("Committer ces fichiers avec les ressources modifiées.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
