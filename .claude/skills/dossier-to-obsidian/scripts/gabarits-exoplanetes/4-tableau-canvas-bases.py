#!/usr/bin/env python3
"""Dossier XVII — tableau de bord, 2 canvas, 2 bases.

Rejouable : ne touche qu'à des fichiers entièrement générés, et RECOMPTE tout
depuis la page source et les notes plutôt que d'annoncer des chiffres.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup

REPO = Path("/Users/olivierveinand/Documents/DEV/empire-contre-intox")
SRC = REPO / "provoxys/exoplanetes/index.html"
ATLAS_SRC = REPO / "provoxys/exoplanetes/atlas.html"
VAULT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox")
REL = "Empire contre Intox/Dossier XVII — Mondes Lointains"
OUT = VAULT / "Dossier XVII — Mondes Lointains"
FICHES_DIR = OUT / "Fiches"

SITE = "https://empire-contre-intox.com"
PAGE = f"{SITE}/provoxys/exoplanetes/index.html"
ATLAS_URL = f"{SITE}/provoxys/exoplanetes/atlas.html"

MOC = "Dossier XVII — Atmosphères & Mondes Lointains"
LEXIQUE = "Lexique — les mots des mondes lointains"
FORMULAIRE = "Formulaire — les formules des atmosphères"
FICHES = "Fiches techniques — les cinquante-quatre objets du dossier"
ATLAS = "L'atlas des exoplanètes — le compagnon interactif"
SOURCES = "Sources — la vérification des Mondes Lointains"
TDB = "Tableau de bord — Mondes Lointains"
CANVAS_D = "Carte du dossier — Mondes Lointains"
CANVAS_F = "Trente ans d'exoplanètes — frise"

C = json.loads((Path(__file__).parent / "_collected.json").read_text(encoding="utf-8"))
NOTES = [(f, t) for f, t in C["notes"]]


def counts() -> dict:
    soup = BeautifulSoup(SRC.read_text(encoding="utf-8"), "html.parser")
    asoup = BeautifulSoup(ATLAS_SRC.read_text(encoding="utf-8"), "html.parser")
    c = {
        "chapitres": len(soup.find_all("section", class_="chapter")),
        "formules": len(soup.find_all(class_="formula-block")),
        "says": len(soup.find_all(class_="fb-say")),
        "tex_inline": len([f for f in soup.select("article.prose .imath")
                           if f.get("data-tex") and not f.find_parent(class_="formula-block")]),
        "tex_total": len([f for f in soup.find_all(class_="imath") if f.get("data-tex")]),
        "explications": len(soup.find_all(class_="explain-block")),
        "ateliers": len([v for v in soup.find_all(class_="viz") if v.get("data-viz")]),
        "tables": len(soup.find_all("table", class_="dtable")),
        "figures": len(soup.find_all("figure", class_="chapter-figure")),
        "modeles3d": len(soup.find_all(class_="model3d")),
        "scopes": len(soup.find_all(class_="scope-card")),
        "fiches_tech": len(soup.find_all("article", class_="fiche-tech")),
        "categories": len(soup.find_all("details", class_="fiche-cat")),
        "termes": len(soup.select("dl.glossary dt")),
        "jalons": len(soup.select(".ms-node")),
        "vues_atlas": len(asoup.find_all("section", class_="view")) - 1,
        "vedettes": len(re.findall(r'^\s*\["', re.search(r"const GAL=\[(.*?)\n    \];", ATLAS_SRC.read_text(encoding="utf-8"), re.S).group(1), re.M)),
    }
    mots = 0
    for f, _ in NOTES:
        p = OUT / f"{f}.md"
        if p.exists():
            mots += len(p.read_text(encoding="utf-8").split("---", 2)[-1].split())
    c["mots"] = mots
    allmd = "".join((OUT / f"{f}.md").read_text(encoding="utf-8") for f, _ in NOTES if (OUT / f"{f}.md").exists())
    c["ancres_formule"] = len(re.findall(r"^\^formule-\d+$", allmd, re.M))
    c["ancres_repere"] = len(re.findall(r"^\^repere-\d+$", allmd, re.M))
    c["notes_fiches"] = len(list(FICHES_DIR.glob("*.md")))
    sc = OUT / f"{SOURCES}.md"
    if sc.exists():
        t = sc.read_text(encoding="utf-8")
        c["fiches_verif"] = len(re.findall(r"^> \[!(?:success|warning|help|note|failure)\] [✅⚠🔶✳❌]️? ", t, re.M))
        c["doi"] = len(re.findall(r"^> \[!cite\]", t, re.M))
        m = re.search(r"\*\*(\d+) affirmations\*\*", t)
        c["claims"] = int(m.group(1)) if m else 0
    else:
        c["fiches_verif"] = c["doi"] = c["claims"] = 0
    files = list(OUT.glob("*.md")) + list(FICHES_DIR.glob("*.md"))
    c["passerelles"] = sum(len(re.findall(r"\[!tip\] 🔗 (?:Passerelle|Renvois)", f.read_text(encoding="utf-8")))
                           for f in files)
    return c


# ─────────────────────────── tableau de bord ───────────────────────────


def build_dashboard(c: dict) -> None:
    b = [
        "---",
        'aliases: ["Tableau de bord XVII", "Poste de pilotage des Mondes Lointains"]',
        "projet: Empire contre Intox",
        "dossier: Dossier XVII",
        "numero: 17",
        "type: tableau-de-bord",
        "auteurs: [Provoxys, Samlepirate]",
        f"source: {PAGE}",
        "licence: CC BY-NC-ND 4.0",
        "tags:",
        "  - empire-contre-intox",
        "  - empire-contre-intox/dossier-17",
        "  - tableau-de-bord",
        "---",
        "",
        f"# {TDB}",
        "",
        f"> [!abstract] Le poste de pilotage du [[{MOC}|Dossier XVII]]",
        "> Tout ce qui compose le dossier, recompté depuis la page source — plus la progression",
        "> de lecture, les deux cartes et les deux bases.",
        "",
        "## Accès rapide",
        "",
        "| | Note | Ce qu'on y trouve |",
        "| --- | --- | --- |",
        f"| 🏛 | [[{MOC}\\|Sommaire du dossier]] | le fil conducteur, les {len(NOTES)} notes, les crédits |",
        f"| 📇 | [[{FICHES}\\|Fiches techniques]] | {c['notes_fiches']} objets en {c['categories']} catégories, une note chacun |",
        f"| 📖 | [[{LEXIQUE}\\|Lexique]] | {c['termes']} mots de l'exoplanétologie |",
        f"| ƒ | [[{FORMULAIRE}\\|Formulaire]] | {c['formules']} blocs de formule + {c['tex_inline']} expressions en ligne |",
        f"| 🔍 | [[{SOURCES}\\|Sources]] | {c['claims']} affirmations auditées, {c['doi']} DOI vérifiés |",
        f"| ✦ | [[{ATLAS}\\|L'atlas]] | la page compagnon : {c['vues_atlas']} vues sur 6 298 mondes |",
        f"| 🗺 | [[{CANVAS_D}.canvas\\|Carte du dossier]] | la structure d'un coup d'œil |",
        f"| 🕰 | [[{CANVAS_F}.canvas\\|La frise des jalons]] | {c['jalons']} dates, de 51 Peg b à la Terre 2.0 |",
        "",
        "## Les chiffres",
        "",
        "| | |",
        "| --- | --- |",
        f"| Notes de lecture | **{len(NOTES)}** (ouverture + 10 chapitres + l'appareil + la clôture) |",
        f"| Mots repris | **≈ {c['mots']:,}** |".replace(",", " "),
        f"| Blocs de formule | **{c['formules']}** — dont **{c['says']}** lignes « Se lit » |",
        f"| Formules en ligne | **{c['tex_inline']}** au fil du texte "
        f"(**{c['tex_total']}** expressions KaTeX en tout, gloses comprises) |",
        f"| Encadrés « Explication » | **{c['explications']}** |",
        f"| Repères & anti-intox (marges) | **{c['ancres_repere']}** |",
        f"| Ateliers interactifs | **{c['ateliers']}** (perdus en Markdown, signalés en encadré replié) |",
        f"| Tableaux de données | **{c['tables']}** |",
        f"| Illustrations | **{c['figures']}** · modèles 3D **{c['modeles3d']}** |",
        f"| Fiches d'instruments détaillées | **{c['scopes']}** dans le chapitre 3 |",
        f"| Fiches techniques d'annexe | **{c['fiches_tech']}** en {c['categories']} catégories |",
        f"| Termes au lexique | **{c['termes']}** |",
        f"| Fiches de vérification | **{c['fiches_verif']}** · références DOI **{c['doi']}** |",
        f"| Passerelles posées depuis ce dossier | **{c['passerelles']}** (+ 4 en retour, dans les dossiers XIV, V, XII et XXV) |",
        "",
        "> [!info] Un dossier de fusion, pas un live",
        "> Le Dossier XVII ne vient pas d'un déroulé unique : c'est la **réunion de tous les documents",
        "> que Provoxys a consacrés aux exoplanètes** — un script en vingt chapitres et huit documents",
        "> détaillés — remontés en un seul fil. Tout son contenu est conservé, ses consignes de visuels",
        "> 3D comprises ; l'Empire contre Intox y a ajouté la vérification et les encadrés anti-intox.",
        "",
        "## Progression de lecture",
        "",
    ]
    for f, t in NOTES:
        b.append(f"- [ ] [[{f}|{t}]]")
    b += [
        "",
        "**L'appareil**",
        "",
        f"- [ ] [[{FICHES}|Les {c['notes_fiches']} fiches techniques]]",
        f"- [ ] [[{LEXIQUE}|Le lexique]]",
        f"- [ ] [[{FORMULAIRE}|Le formulaire]]",
        f"- [ ] [[{SOURCES}|Les sources]]",
        f"- [ ] [[{ATLAS}|L'atlas compagnon]]",
        "",
        "---",
        "",
        "## Le dossier en onze repères",
        "",
        "*Les encadrés de marge — repères de lecture et anti-intox — transclus depuis leurs notes.*",
        "",
    ]
    # transclusion des ^repere-N, dans l'ordre des notes
    n = 0
    for f, _ in NOTES:
        p = OUT / f"{f}.md"
        if not p.exists():
            continue
        for _m in re.finditer(r"^\^repere-(\d+)$", p.read_text(encoding="utf-8"), re.M):
            n += 1
            b.append(f"![[{f}#^repere-{_m.group(1)}]]")
            b.append("")
    b += [
        "---",
        "",
        "## Les deux formules du dossier",
        "",
    ]
    for i, (f, _) in enumerate(NOTES):
        p = OUT / f"{f}.md"
        if p.exists():
            for _m in re.finditer(r"^\^formule-(\d+)$", p.read_text(encoding="utf-8"), re.M):
                b.append(f"![[{f}#^formule-{_m.group(1)}]]")
                b.append("")
    b += [
        "---",
        "",
        "## Les bases",
        "",
        "- [[Dossier XVII — lecture.base|📖 Lecture — les notes dans l'ordre]]",
        "- [[Les objets du dossier XVII.base|📇 Les 54 fiches techniques]]",
        "",
        "---",
        "",
        "## Le dossier en ligne",
        "",
        f"- 🌐 [La page du dossier]({PAGE})",
        f"- ✦ [L'atlas des exoplanètes]({ATLAS_URL}) — la page compagnon, sur données réelles",
        f"- 🔍 [La page « Les Sources »]({SITE}/sources/sources.html#exoplanetes)",
        "",
        f"⌂ [[{MOC}|Retour au sommaire]] · [[Empire contre Intox — tableau de bord|Le tableau de bord de l'Empire]]",
        "",
    ]
    (OUT / f"{TDB}.md").write_text("\n".join(b), encoding="utf-8")


# ─────────────────────────── canvas ───────────────────────────


def f(name: str) -> str:
    return f"{REL}/{name}.md"


def build_canvas_dossier(c: dict) -> None:
    nodes, edges = [], []
    nodes.append({
        "id": "titre", "type": "text", "x": 40, "y": 0, "width": 4000, "height": 160, "color": "2",
        "text": f"# Dossier XVII — Atmosphères & Mondes Lointains\n"
                f"**{len(NOTES)} notes · {c['chapitres']} chapitres · {c['fiches_tech']} fiches techniques · "
                f"{c['ateliers']} ateliers · {c['termes']} mots de lexique · {c['doi']} DOI**\n"
                f"Réalisé par *Provoxys*, avec le soutien de *Samlepirate* (Atlas).",
    })
    nodes.append({"id": "moc", "type": "file", "file": f(MOC), "x": 40, "y": 210, "width": 600, "height": 430, "color": "2"})
    nodes.append({"id": "dash", "type": "file", "file": f(TDB), "x": 700, "y": 210, "width": 600, "height": 430, "color": "2"})
    nodes.append({"id": "hero", "type": "file", "file": f"{REL}/_assets/exoplanetes-hero.png",
                  "x": 1360, "y": 210, "width": 600, "height": 430})
    nodes.append({
        "id": "atlas", "type": "file", "file": f(ATLAS), "x": 2020, "y": 210, "width": 600, "height": 430, "color": "4"})
    nodes.append({
        "id": "pass", "type": "text", "x": 2680, "y": 210, "width": 620, "height": 430, "color": "5",
        "text": "## 🔗 Passerelles\nLe profil barométrique et l'équation du transfert radiatif ont leurs jumelles "
                "jouables dans **[[Dossier XIV — Les Formules de l'Empire|le Dossier XIV]]**, "
                "acte XV « Atmosphères & exoplanètes ».\n\n"
                "Les atmosphères de Vénus et de la Terre sont des **machines thermiques** → "
                "**[[Dossier XXV — L'entropie, le temps et l'Univers|Dossier XXV]]**.\n\n"
                "Les spectres qui trahissent les molécules sont ceux du **[[Dossier V — Le Tableau Périodique des éléments|Tableau Périodique]]**.",
    })

    # chaîne des notes de lecture
    x = 40
    for i, (fn, _t) in enumerate(NOTES):
        color = "5" if i == 0 else ("4" if i >= len(NOTES) - 2 else "1")
        nodes.append({"id": f"n{i:02d}", "type": "file", "file": f(fn), "x": x, "y": 740,
                      "width": 420, "height": 470, "color": color})
        x += 460
    labels = ["le socle physique", "voir depuis le sol", "et depuis l'espace", "lire la lumière",
              "le Système solaire externe", "les géantes brûlantes", "les mondes rocheux",
              "l'eau liquide", "tout le catalogue", "et demain", "les sources", "la chute"]
    for i in range(len(NOTES) - 1):
        edges.append({"id": f"e{i}", "fromNode": f"n{i:02d}", "toNode": f"n{i+1:02d}",
                      "fromSide": "right", "toSide": "left",
                      "label": labels[i] if i < len(labels) else ""})
    edges.append({"id": "e_moc", "fromNode": "moc", "toNode": "n00", "fromSide": "bottom", "toSide": "top",
                  "label": "lire le dossier"})
    edges.append({"id": "e_atlas", "fromNode": "n08", "toNode": "atlas", "fromSide": "top", "toSide": "bottom",
                  "label": "les données brutes"})

    # appareil
    w_app = 4 * 480 + 40
    nodes.append({"id": "grp_app", "type": "group", "x": 0, "y": 1290, "width": w_app, "height": 580,
                  "label": "Appareil critique", "color": "3"})
    for j, name in enumerate([FICHES, LEXIQUE, FORMULAIRE, SOURCES]):
        nodes.append({"id": f"a{j}", "type": "file", "file": f(name), "x": 40 + j * 480, "y": 1360,
                      "width": 440, "height": 460, "color": "3"})

    # un échantillon de fiches, une par catégorie
    ECH = [("Instruments au sol", "HARPS"), ("Télescopes & missions spatiales", "JWST"),
           ("Sondes du Système solaire", "Cassini-Huygens"), ("Planètes & corps du Système solaire", "Vénus"),
           ("Exoplanètes", "WASP-39 b"), ("Exoplanètes", "TRAPPIST-1 e")]
    gx = w_app + 60
    nodes.append({"id": "grp_f", "type": "group", "x": gx, "y": 1290, "width": 6 * 470 + 40, "height": 580,
                  "label": "Une fiche par famille d'objets", "color": "6"})
    for j, (_cat, name) in enumerate(ECH):
        p = FICHES_DIR / f"{name}.md"
        if not p.exists():
            continue
        nodes.append({"id": f"fi{j}", "type": "file", "file": f"{REL}/Fiches/{name}.md",
                      "x": gx + 40 + j * 470, "y": 1360, "width": 430, "height": 460, "color": "6"})
    edges.append({"id": "e_fiches", "fromNode": "a0", "toNode": "fi0", "fromSide": "right", "toSide": "left",
                  "label": f"{c['fiches_tech']} objets"})

    (OUT / f"{CANVAS_D}.canvas").write_text(
        json.dumps({"nodes": nodes, "edges": edges}, ensure_ascii=False, indent=2), encoding="utf-8")


def build_canvas_frise(c: dict) -> None:
    jalons = C.get("jalons", [])
    soup = BeautifulSoup(SRC.read_text(encoding="utf-8"), "html.parser")
    caps = [n.find(class_="ms-cap").get_text(" ", strip=True) for n in soup.select(".ms-node")]
    years = [n.find(class_="ms-year").get_text(" ", strip=True) for n in soup.select(".ms-node")]

    nodes, edges = [], []
    nodes.append({
        "id": "titre", "type": "text", "x": 40, "y": 0, "width": 3400, "height": 150, "color": "2",
        "text": f"# Trente ans d'exoplanètes\n**De la première planète autour d'une étoile comme le Soleil "
                f"à l'observatoire qui voudra photographier une Terre** — {len(jalons)} jalons, 1995 → 2030s.",
    })
    nodes.append({"id": "note", "type": "file", "file": f(NOTES[9][0]), "x": 3500, "y": 0,
                  "width": 520, "height": 430, "color": "4"})

    # 11 jalons sur deux rangées
    per_row = 6
    for i, (t, d) in enumerate(jalons):
        row, col = divmod(i, per_row)
        x = 40 + col * 560
        y = 220 + row * 420
        d_short = re.sub(r"\*\*(.*?)\*\*", r"**\1**", d)
        nodes.append({
            "id": f"j{i:02d}", "type": "text", "x": x, "y": y, "width": 520, "height": 360,
            "color": "5" if i in (0, len(jalons) - 1) else "1",
            "text": f"## {years[i] if i < len(years) else ''}\n**{caps[i] if i < len(caps) else ''}**\n\n{d_short}",
        })
        if i:
            edges.append({"id": f"ej{i}", "fromNode": f"j{i-1:02d}", "toNode": f"j{i:02d}",
                          "fromSide": "right" if col else "bottom", "toSide": "left" if col else "top"})

    (OUT / f"{CANVAS_F}.canvas").write_text(
        json.dumps({"nodes": nodes, "edges": edges}, ensure_ascii=False, indent=2), encoding="utf-8")


# ─────────────────────────── bases ───────────────────────────


def build_bases() -> None:
    (OUT / "Dossier XVII — lecture.base").write_text(
        "filters:\n"
        "  and:\n"
        f'    - file.inFolder("{REL}")\n'
        "    - ordre != null\n"
        "views:\n"
        "  - type: table\n"
        "    name: Le dossier dans l'ordre\n"
        "    order:\n"
        "      - file.name\n"
        "      - titre\n"
        "      - ordre\n"
        "    sort:\n"
        "      - property: ordre\n"
        "        direction: ASC\n",
        encoding="utf-8")
    (OUT / "Les objets du dossier XVII.base").write_text(
        "filters:\n"
        "  and:\n"
        f'    - file.inFolder("{REL}/Fiches")\n'
        "views:\n"
        "  - type: table\n"
        "    name: Les 54 objets\n"
        "    order:\n"
        "      - file.name\n"
        "      - categorie\n"
        "      - genre\n"
        "    sort:\n"
        "      - property: categorie\n"
        "        direction: ASC\n"
        "      - property: file.name\n"
        "        direction: ASC\n"
        "  - type: cards\n"
        "    name: En vignettes\n"
        "    order:\n"
        "      - file.name\n"
        "      - categorie\n",
        encoding="utf-8")


def main() -> None:
    c = counts()
    build_dashboard(c)
    build_canvas_dossier(c)
    build_canvas_frise(c)
    build_bases()
    print(f"✓ {TDB}.md")
    print(f"✓ {CANVAS_D}.canvas · {CANVAS_F}.canvas")
    print("✓ Dossier XVII — lecture.base · Les objets du dossier XVII.base")
    print("\nRecompté :")
    for k, v in c.items():
        print(f"   {k:18} {v}")


if __name__ == "__main__":
    main()
