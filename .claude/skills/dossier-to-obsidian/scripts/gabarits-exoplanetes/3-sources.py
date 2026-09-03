#!/usr/bin/env python3
"""Dossier XVII → note « Sources », EXTRAITE de sources/sources.html et de l'audit.

Extrait `const EXOPLANETES = [...]` (14 fiches) et les DEUX groupes REFS du dossier,
puis l'audit `sources/dossier-XVII-exoplanetes.md` — qui est en **tables Markdown**,
pas en blocs `## N.` comme les autres dossiers.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

REPO = Path("/Users/olivierveinand/Documents/DEV/empire-contre-intox")
SOURCES_HTML = REPO / "sources/sources.html"
AUDIT = REPO / "sources/dossier-XVII-exoplanetes.md"
REFS_MD = REPO / "sources/refs-doi-XVII-exoplanetes.md"
OUT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/Dossier XVII — Mondes Lointains")

SITE = "https://empire-contre-intox.com"
PAGE = f"{SITE}/provoxys/exoplanetes/index.html"
SOURCES_PAGE = f"{SITE}/sources/sources.html#exoplanetes"
MOC = "Dossier XVII — Atmosphères & Mondes Lointains"
NOTE = "Sources — la vérification des Mondes Lointains"
TDB = "Tableau de bord — Mondes Lointains"
FICHES = "Fiches techniques — les cinquante-quatre objets du dossier"
IMPORTE = "2026-08-26"

VERDICT = {
    "ok":    ("success", "✅", "Confirmé"),
    "warn":  ("warning", "⚠️", "À nuancer"),
    "deb":   ("help", "🔶", "Débattu"),
    "fresh": ("note", "✳️", "Corrigé"),
    "err":   ("failure", "❌", "Erroné — corrigé"),
}

REF_GROUPS = [
    "Dossier XVII · Atmosphères & Mondes Lointains (exoplanètes) — 28 DOI",
    "Dossier XVII · Télescopes spatiaux (Hubble, Spitzer, Kepler, TESS) — 9 DOI",
]


def node_json(js: str) -> list:
    out = subprocess.run(["node", "-e", f"const EXO='';console.log(JSON.stringify({js}))"],
                         capture_output=True, text=True, cwd=REPO)
    if out.returncode:
        raise SystemExit(out.stderr[:600])
    return json.loads(out.stdout)


def js_array(src: str, name: str) -> list[dict]:
    m = re.search(r"const\s+" + name + r"\s*=\s*(\[.*?\n    \]);", src, re.S)
    if not m:
        raise SystemExit(f"tableau {name} introuvable")
    # `EXO+"…"` → on remet la vraie racine des images (elles ne sont pas embarquées ici)
    js = m.group(1).replace("EXO+", '"../provoxys/exoplanetes/assets/"+')
    return node_json(js)


def refs_group(src: str, label: str) -> list[dict]:
    m = re.search(r'\{\s*g:"' + re.escape(label) + r'",\s*items:\s*(\[.*?\n      \])\s*\}', src, re.S)
    if not m:
        raise SystemExit(f"groupe REFS « {label} » introuvable")
    return node_json(m.group(1))


def audit_tables() -> tuple[list[dict], dict[str, int]]:
    """L'audit est en tables Markdown : | Affirmation | Verdict | Référence | Source(s) |"""
    rows, counts, section = [], {}, ""
    for line in AUDIT.read_text(encoding="utf-8").splitlines():
        if line.startswith("## "):
            section = line[3:].strip()
            continue
        if not line.startswith("|") or line.startswith("|---") or "| Verdict |" in line:
            continue
        cells = [c.strip() for c in line.strip().strip("|").split(" | ")]
        if len(cells) < 3:
            continue
        claim, verdict = cells[0], cells[1]
        sym = next((s for s in ("❌", "🔶", "⚠️", "✅") if s in verdict), "")
        if not sym:
            continue
        counts[sym] = counts.get(sym, 0) + 1
        rows.append({"section": section, "claim": claim, "sym": sym,
                     "verdict": verdict, "ref": cells[2] if len(cells) > 2 else "",
                     "src": cells[3] if len(cells) > 3 else ""})
    return rows, counts


def synthese() -> list[str]:
    t = AUDIT.read_text(encoding="utf-8")
    syn = t.split("## Synthèse", 1)[-1]
    return [l[2:].strip() for l in syn.splitlines() if l.startswith("- ")]


def refs_md_count() -> int:
    return len(re.findall(r"\]\(https://doi\.org/", REFS_MD.read_text(encoding="utf-8")))


def main() -> None:
    src = SOURCES_HTML.read_text(encoding="utf-8")
    fiches = js_array(src, "EXOPLANETES")
    refs = {g: refs_group(src, g) for g in REF_GROUPS}
    n_refs = sum(len(v) for v in refs.values())
    rows, counts = audit_tables()
    bilan = " · ".join(f"{s} **{n}**" for s, n in
                       sorted(counts.items(), key=lambda x: "✅⚠️🔶❌".index(x[0])))

    b = [
        "---",
        'aliases: ["Sources XVII", "Vérification des Mondes Lointains", "Sources exoplanètes"]',
        "projet: Empire contre Intox",
        "dossier: Dossier XVII",
        "numero: 17",
        "type: appareil",
        "auteurs: [Provoxys, Samlepirate]",
        f"source: {PAGE}",
        f"audit: {SOURCES_PAGE}",
        "licence: CC BY-NC-ND 4.0",
        f"importe: {IMPORTE}",
        "tags:",
        "  - empire-contre-intox",
        "  - empire-contre-intox/dossier-17",
        "  - sources",
        "---",
        "",
        f"# {NOTE}",
        "",
        "> [!info] Ce que dit l'appareil critique",
        f"> L'audit — `sources/dossier-XVII-exoplanetes.md` — passe en revue **{len(rows)} affirmations** "
        f"réparties en dix sections : {bilan}.",
        f"> La page publique en surface **{len(fiches)} fiches** et **{n_refs} références à DOI vérifié** "
        f"(le fichier de références en compte {refs_md_count()} au total).",
        ">",
        "> Ce dossier est une **fusion** : le script de Provoxys en vingt chapitres plus huit documents",
        "> détaillés, réunis en un seul fil. Rien de son contenu n'a été retiré — les corrections sont",
        "> venues s'ajouter en encadrés « anti-intox », jamais en réécrivant le texte source.",
        "",
        f"⌂ [[{MOC}|Sommaire du dossier]] · [[11 — L'appareil critique — Les sources du dossier|"
        f"Le chapitre « sources » du dossier]] · 🌐 [La page « Les Sources »]({SOURCES_PAGE})",
        "",
        "---",
        "",
        "## Les fiches de vérification",
        "",
        f"*Les {len(fiches)} fiches publiées sur la page du Dossier XXVIII.*",
        "",
    ]

    for f in fiches:
        kind, sym, _ = VERDICT.get(f.get("v", "ok"), VERDICT["ok"])
        b.append(f"> [!{kind}] {sym} {f['t']} — *{f['d']}*")
        b.append(f"> {f['s']}")
        srcs = f.get("src") or []
        if srcs:
            b.append(">")
            b.append("> " + " · ".join(f"[{s['n']}]({s['u']})" for s in srcs))
        b.append("")

    # ── l'audit, section par section ──
    b += ["---", "", "## L'audit, affirmation par affirmation", "",
          f"*Les {len(rows)} lignes de `sources/dossier-XVII-exoplanetes.md`.*", ""]
    cur = None
    for r in rows:
        if r["section"] != cur:
            cur = r["section"]
            b += ["", f"### {cur}", "", "| | Affirmation | Ce que dit la vérification |", "| --- | --- | --- |"]
        ref = r["ref"].replace("|", "—")
        b.append(f"| {r['sym']} | {r['claim'].replace('|', '—')} | {ref} |")
    b.append("")

    b += ["> [!warning] 🛡 Ce que l'audit a corrigé ou nuancé", ""]
    b.pop()
    for s in synthese():
        b.append("> - " + s)
    b.append("")

    # ── les références DOI ──
    b += ["---", "", "## Références scientifiques", "",
          f"*{n_refs} articles à comité de lecture, DOI vérifiés contre Crossref.*", ""]
    for g, items in refs.items():
        short = g.split("·", 1)[-1].strip()
        b += [f"### {short}", ""]
        for r in items:
            kind = {"primary": "article primaire", "review": "revue de synthèse",
                    "data": "jeu de données", "inst": "source institutionnelle"}.get(r.get("k", ""), r.get("k", ""))
            b.append(f"> [!cite]- {r['a']} — *{r['t']}*")
            b.append(f"> **{r['j']}** · {kind}")
            if r.get("doi"):
                b.append(f"> DOI : [{r['doi']}](https://doi.org/{r['doi']})")
            b.append(">")
            b.append(f"> {r['ab']}")
            b.append("")

    b += [
        "---",
        "",
        "## Les fichiers d'audit",
        "",
        "| Fichier | Contenu |",
        "| --- | --- |",
        f"| [`sources/dossier-XVII-exoplanetes.md`]({SITE}/sources/dossier-XVII-exoplanetes.md) | "
        f"l'audit en dix sections ({len(rows)} affirmations) |",
        f"| [`sources/refs-doi-XVII-exoplanetes.md`]({SITE}/sources/refs-doi-XVII-exoplanetes.md) | "
        f"les références primaires, {refs_md_count()} DOI contrôlés via Crossref |",
        f"| [`sources/sources.html#exoplanetes`]({SOURCES_PAGE}) | la page publique du Dossier XXVIII |",
        "",
        "> [!tip] Aucun DOI n'est deviné",
        "> Chaque DOI a été résolu contre la notice de l'éditeur (Nature, Science, A&A, ApJ, AJ) et",
        "> recoupé — titre, auteurs, revue, volume, pages concordants. Quand un DOI n'a pas résolu",
        "> (la découverte de WASP-39 b par Faedi 2011), la donnée est sourcée par une URL",
        "> institutionnelle plutôt que par un identifiant fabriqué. C'est la règle absolue de la charte.",
        "",
        "> [!abstract] 📇 L'annexe est elle aussi sourcée",
        f"> Les **54 fiches techniques** du dossier — [[{FICHES}|une note par objet]] — portent chacune",
        "> leur source institutionnelle (NASA, ESA, ESO, NASA Exoplanet Archive) et, le cas échéant,",
        "> un DOI. Corrections appliquées après vérification adversariale : Keck I (première lumière",
        "> **1990**, pas 1992), HIRES (**1995**), PLATO (lancement **fin 2026**), Neptune (**164,8 ans**),",
        "> Uranus (**84,0 ans**), Tau Boötis b (5,95 M<sub>Jup</sub> = masse **vraie**), 51 Peg b",
        "> (rayon ~1,07 R<sub>Jup</sub>, **estimé**).",
        "",
        "---",
        "",
        f"⌂ [[{MOC}|Retour au sommaire]] · [[{TDB}|Tableau de bord]]",
        "",
    ]

    (OUT / f"{NOTE}.md").write_text("\n".join(b), encoding="utf-8")
    print(f"✓ {NOTE}.md")
    print(f"   {len(fiches)} fiches · {n_refs} références DOI · audit : {len(rows)} affirmations {bilan}")


if __name__ == "__main__":
    main()
