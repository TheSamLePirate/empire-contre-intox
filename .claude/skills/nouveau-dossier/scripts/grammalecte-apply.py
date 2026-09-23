#!/usr/bin/env python3
"""
grammalecte-apply.py — applique à une page les corrections retenues dans le
grammalecte.md de son dossier (tables « Corrections du verbatim » et
« Corrections éditoriales »). Le fichier de trace EST la source de l'édition :
rien ne se corrige à la main dans la page.

Usage :
    python3 .claude/skills/nouveau-dossier/scripts/grammalecte-apply.py <page.html> [grammalecte.md] [--dry]

Pour chaque ligne « Avant → Après » :
    - « Avant » présent une fois dans la page  → remplacé ;
    - présent N fois et colonne Occurrences = N → toutes remplacées ;
    - présent N fois sans précision           → ERREUR (allonger l'extrait pour le rendre unique) ;
    - absent, « Après » présent               → déjà appliquée, rien à faire ;
    - absent, « Après » absent                → ERREUR (extrait inexact : le recopier depuis la page).
Les apostrophes droites/typographiques et les &nbsp; sont essayés en variantes.
Code retour 1 s'il reste une erreur. Relancer check-coverage.py ensuite.
"""
import re
import sys
from pathlib import Path


def tables(md_text):
    """Rend {section: [(cells…)]} pour chaque table sous un titre « ## »."""
    out, section, rows = {}, None, None
    lines = md_text.splitlines()
    for i, line in enumerate(lines):
        if line.startswith("## "):
            section = line[3:].strip().lower(); rows = out.setdefault(section, [])
            continue
        if section is None or not line.strip().startswith("|"):
            continue
        nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
        if re.match(r"^\|\s*:?-{2,}", nxt):
            continue  # en-tête (suivi du séparateur)
        cells = [c.strip().strip("`").strip() for c in line.strip().strip("|").split("|")]
        if not cells or set(cells[0]) <= set("-: "):
            continue
        if cells[0].isdigit():
            cells = cells[1:]
        rows.append(cells)
    return out


def variants(s):
    yield s
    yield s.replace("'", "’")
    yield s.replace("’", "'")
    yield s.replace(" ", "&nbsp;")
    yield s.replace(" ", "&nbsp;").replace("'", "’")
    yield s.replace(" ", "&nbsp;")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry" in sys.argv
    if not args:
        print(__doc__); sys.exit(2)
    page = Path(args[0])
    md = Path(args[1]) if len(args) > 1 else page.parent / "grammalecte.md"
    if not md.exists():
        sys.exit(f"pas de {md}")
    src = page.read_text(encoding="utf-8")
    t = tables(md.read_text(encoding="utf-8"))
    rows = []
    for sec, rs in t.items():
        if sec.startswith("corrections"):
            rows += [(sec, r) for r in rs if len(r) >= 2]
    applied = done = 0
    errors = []
    for sec, r in rows:
        avant, apres = r[0], r[1]
        occ = None
        for c in r[2:]:
            m = re.fullmatch(r"(?:occurrences?\s*:?\s*)?(\d+)", c.strip(), re.I)
            if m and c.strip() != apres:
                occ = int(m.group(1))
        hit = next((v for v in variants(avant) if v in src), None)
        if hit is None:
            if len(apres) >= 12 and any(v in src for v in variants(apres)):
                done += 1
            elif any(v in src for v in variants(apres)):
                errors.append(f"introuvable : « {avant[:80]} » (« {apres} » existe, mais trop court pour conclure — allonger les deux extraits)")
            else:
                errors.append(f"introuvable dans la page : « {avant[:80]} »")
            continue
        n = src.count(hit)
        if n > 1 and occ != n:
            errors.append(f"{n} occurrences de « {avant[:60]} » (préciser une colonne Occurrences = {n}, ou allonger l'extrait)")
            continue
        apres_v = apres if hit == avant else next(v for v, a in zip(variants(avant), variants(apres)) if v == hit)
        src = src.replace(hit, apres_v)
        applied += n
        label = "verbatim" if "verbatim" in sec else "éditorial"
        print(f"  ✓ [{label}] « {avant[:60]} » → « {apres[:60]} »" + (f" ×{n}" if n > 1 else ""))
    if not dry and applied:
        page.write_text(src, encoding="utf-8")
    print(f"\n{applied} remplacement(s) {'simulé(s)' if dry else 'appliqué(s)'}, {done} déjà en place, {len(errors)} erreur(s)")
    for e in errors:
        print("  ✗ " + e)
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
