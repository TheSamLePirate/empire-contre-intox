#!/usr/bin/env python3
"""Dossier III « Artemis II » — tableau de bord, 2 canvas, 2 bases.

Rejouable à volonté : ne touche qu'à des fichiers entièrement générés, et
RECOMPTE tout depuis la page source et les notes plutôt que d'annoncer.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup

REPO = Path("/Users/olivierveinand/Documents/DEV/empire-contre-intox")
SRC = REPO / "provoxys/Artemis2.html"
VAULT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox")
REL = "Empire contre Intox/Dossier III — Artemis II"
OUT = VAULT / "Dossier III — Artemis II"

SITE = "https://empire-contre-intox.com"
PAGE = f"{SITE}/provoxys/Artemis2.html"
SIM = "https://thesamlepirate.github.io/NebulaSim/artemis2-multistage.fr.html"

MOC = "Dossier III — Artemis II, l'Odyssée Lunaire"
FORMULAIRE = "Formulaire — les formules d'Artemis II"
LEXIQUE = "Lexique — les mots d'Artemis II"
SOURCES = "Sources — la vérification d'Artemis II"
GALERIE = "Portraits — l'équipage d'Artemis II"
TDB = "Tableau de bord — Artemis II"

NOTES = [
    "00 — Ouverture — Introduction au live",
    "01 — Chapitre 1 — Genèse et histoire, d'Apollo à Artemis",
    "02 — Chapitre 2 — Financements, coûts et technologies de base",
    "03 — Chapitre 3 — Missions Artemis I et II",
    "04 — Chapitre 4 — Alunissage, Gateway et préparations futures",
    "05 — Chapitre 5 — Expériences scientifiques, partenariats et défis",
    "06 — Chapitre 6 — Synthèse, impacts et perspectives futures",
    "07 — Chapitre 7 — Le pas de tir LC-39B et le lancement",
    "08 — Sam prend l'antenne — Le voyage en vingt minutes",
]
CREW = ["Reid Wiseman", "Victor Glover", "Christina Koch", "Jeremy Hansen"]


# ─────────────────────────── recomptage ───────────────────────────


def counts() -> dict:
    soup = BeautifulSoup(SRC.read_text(encoding="utf-8"), "html.parser")
    secs = soup.find_all("section", class_=["chapter", "sam-chapter"])
    c = {
        "sections": len(secs),
        "parts": len(soup.find_all("div", class_="part")),
        "prises": len(soup.find_all(class_="provoxy")),
        "formules": len(soup.find_all(class_="formula-block")),
        "says": len(soup.find_all(class_="fb-say")),
        "tex_display": len([f for f in soup.find_all(class_="formula") if f.get("data-tex")]),
        "tex_inline": len([f for f in soup.find_all(class_="imath") if f.get("data-tex")]),
        "moments": len(soup.find_all(class_="moment")),
        "moments_cles": len(soup.find_all("div", class_="moment key")),
        "actes": len(soup.find_all(class_="sim-act")),
    }
    # mots des notes générées
    mots = 0
    for n in NOTES:
        p = OUT / f"{n}.md"
        if p.exists():
            body = p.read_text(encoding="utf-8").split("---", 2)[-1]
            mots += len(body.split())
    c["mots"] = mots
    # ancres réellement posées
    allmd = "".join((OUT / f"{n}.md").read_text(encoding="utf-8") for n in NOTES if (OUT / f"{n}.md").exists())
    c["ancres_formule"] = len(re.findall(r"^\^formule-\d+$", allmd, re.M))
    c["ancres_cle"] = len(re.findall(r"^\^cle-\d+$", allmd, re.M))
    # lexique / sources
    lx = OUT / f"{LEXIQUE}.md"
    c["termes"] = len(re.findall(r"^## ", lx.read_text(encoding="utf-8"), re.M)) if lx.exists() else 0
    sc = OUT / f"{SOURCES}.md"
    if sc.exists():
        t = sc.read_text(encoding="utf-8")
        # une fiche = un callout de verdict, reconnaissable à son symbole
        c["fiches"] = len(
            re.findall(r"^> \[!(?:success|warning|help|failure)\] [✅⚠️🔶❌] ", t, re.M)
        )
        c["doi"] = len(re.findall(r"^> \[!cite\]", t, re.M))
        m = re.search(r"\*\*(\d+) affirmations\*\*", t)
        c["claims"] = int(m.group(1)) if m else 0
    else:
        c["fiches"] = c["doi"] = c["claims"] = 0
    # passerelles posées depuis ce dossier
    files = list(OUT.glob("*.md")) + list((OUT / "Portraits").glob("*.md"))
    c["passerelles"] = sum(
        len(re.findall(r"\[!tip\] 🔗 (?:Passerelle|Renvois)", f.read_text(encoding="utf-8")))
        for f in files
    )
    return c


# ─────────────────────────── tableau de bord ───────────────────────────


def build_dashboard(c: dict) -> None:
    body = [
        "---",
        'aliases: ["Tableau de bord Artemis", "Poste de pilotage Artemis II"]',
        "projet: Empire contre Intox",
        "dossier: Dossier III",
        "numero: 3",
        "type: tableau-de-bord",
        "auteurs: [Provoxys, Samlepirate]",
        f"source: {PAGE}",
        "licence: CC BY-NC-ND 4.0",
        "tags:",
        "  - empire-contre-intox",
        "  - empire-contre-intox/dossier-3",
        "  - tableau-de-bord",
        "---",
        "",
        "# Tableau de bord — Artemis II",
        "",
        f"> [!abstract] Le poste de pilotage du [[{MOC}|Dossier III]]",
        "> Tout ce qui compose le dossier, recompté depuis la page source — plus la progression",
        "> de lecture et les deux cartes.",
        "",
        "## Accès rapide",
        "",
        "| | Note | Ce qu'on y trouve |",
        "| --- | --- | --- |",
        f"| 🏛 | [[{MOC}\\|Sommaire du dossier]] | le fil conducteur, les 9 chapitres, les crédits |",
        f"| ƒ | [[{FORMULAIRE}\\|Formulaire]] | les {c['formules']} blocs de formule, avec leur lecture orale |",
        f"| 📖 | [[{LEXIQUE}\\|Lexique]] | {c['termes']} termes — le programme parle par sigles |",
        f"| 👥 | [[{GALERIE}\\|L'équipage]] | les 4 astronautes, par leurs propres mots |",
        f"| 🔍 | [[{SOURCES}\\|Sources]] | {c['claims']} affirmations auditées, {c['doi']} DOI vérifiés |",
        f"| 🗺 | [[Carte du dossier — Artemis II.canvas\\|Carte du dossier]] | la structure d'un coup d'œil |",
        f"| 🚀 | [[Le vol en vingt minutes — frise.canvas\\|La frise du vol]] | les 5 actes de la simulation |",
        "",
        "## Les chiffres",
        "",
        "| | |",
        "| --- | --- |",
        f"| Chapitres | **{c['sections']}** (ouverture + 7 chapitres + la démo de Sam) |",
        f"| Parties | **{c['parts']}** |",
        f"| Prises de parole | **{c['prises']}** (Provoxys, verbatim) |",
        f"| Mots repris | **≈ {c['mots']:,}** |".replace(",", " "),
        f"| Blocs de formule | **{c['formules']}** — dont **{c['says']}** lignes « Se lit » |",
        f"| Formules affichées | **{c['tex_display']}** en bloc · **{c['tex_inline']}** en ligne |",
        f"| Moments de vol simulés | **{c['moments']}** sur **{c['actes']}** actes, dont **{c['moments_cles']}** clés |",
        f"| Termes au lexique | **{c['termes']}** |",
        f"| Fiches de vérification | **{c['fiches']}** · références DOI **{c['doi']}** |",
        f"| Passerelles vers d'autres dossiers | **{c['passerelles']}** |",
        "",
        "> [!info] La règle du mot pour mot",
        "> La transcription de Provoxys est reprise **intégralement**, sans coupe ni reformulation.",
        f"> Les {c['prises']} prises de parole sont dans l'ordre de l'émission ; les repères de temps",
        "> de la page (`Ch.1 · P.1`, `suite`) sont conservés tels quels.",
        "",
        "## Progression de lecture",
        "",
    ]
    for n in NOTES:
        short = n.split(" — ", 1)[1]
        body.append(f"- [ ] [[{n}|{short}]]")
    body += [
        "",
        "**L'appareil**",
        "",
        f"- [ ] [[{FORMULAIRE}|Le formulaire]]",
        f"- [ ] [[{LEXIQUE}|Le lexique]]",
        f"- [ ] [[{GALERIE}|L'équipage]]",
        f"- [ ] [[{SOURCES}|Les sources]]",
        "",
        "---",
        "",
        "## Le vol en huit moments",
        "",
        "*Les instants clés de la simulation que Sam déroule — transclus depuis sa note.*",
        "",
    ]
    for i in range(1, c["ancres_cle"] + 1):
        body.append(f"![[{NOTES[8]}#^cle-{i}]]")
        body.append("")

    body += [
        "---",
        "",
        "## L'équipage",
        "",
    ]
    for p in CREW:
        body.append(f"- [[{p}]]")
    body += [
        "",
        "---",
        "",
        "## Les bases",
        "",
        "- [[Dossier III — lecture.base|📖 Lecture — les notes dans l'ordre]]",
        "- [[Portraits de l'équipage.base|👥 L'équipage d'Artemis II]]",
        "",
        "---",
        "",
        "## Le dossier en ligne",
        "",
        f"- 🌐 [La page du dossier]({PAGE})",
        f"- ▶ [La simulation Nebula Orbit]({SIM}) — le compagnon interactif de Sam",
        f"- 🔍 [La page « Les Sources »]({SITE}/sources/sources.html#artemis)",
        "",
        f"⌂ [[{MOC}|Retour au sommaire]] · [[Empire contre Intox — tableau de bord|Le tableau de bord de l'Empire]]",
        "",
    ]
    (OUT / f"{TDB}.md").write_text("\n".join(body), encoding="utf-8")


# ─────────────────────────── canvas ───────────────────────────


def f(name: str) -> str:
    return f"{REL}/{name}.md"


def build_canvas_dossier(c: dict) -> None:
    nodes, edges = [], []
    nodes.append({
        "id": "titre", "type": "text", "x": 40, "y": 0, "width": 4000, "height": 150, "color": "2",
        "text": f"# Dossier III — Artemis II, l'Odyssée Lunaire\n"
                f"**{c['sections']} chapitres · {c['parts']} parties · {c['prises']} prises de parole · "
                f"{c['formules']} formules · {c['moments']} moments de vol simulés**\n"
                f"Réalisé par *Provoxys*, avec la participation de *Samlepirate* (Nebula Orbit).",
    })
    nodes.append({"id": "moc", "type": "file", "file": f(MOC), "x": 40, "y": 200, "width": 600, "height": 420, "color": "2"})
    nodes.append({"id": "dash", "type": "file", "file": f(TDB), "x": 700, "y": 200, "width": 600, "height": 420, "color": "2"})
    nodes.append({
        "id": "hero", "type": "file", "file": f"{REL}/_assets/artemis2-hero.png",
        "x": 1360, "y": 200, "width": 600, "height": 420,
    })

    # chaîne des notes de lecture
    x = 40
    for i, n in enumerate(NOTES):
        color = "5" if i == 0 else ("4" if i == 8 else "1")
        nodes.append({"id": f"n{i:02d}", "type": "file", "file": f(n), "x": x, "y": 720, "width": 420, "height": 460, "color": color})
        x += 460
    labels = [
        "le live commence", "les financements", "les missions I & II", "l'alunissage",
        "la science", "la synthèse", "le pas de tir", "et Sam fait voler la mission",
    ]
    for i in range(8):
        edges.append({"id": f"e{i}", "fromNode": f"n{i:02d}", "toNode": f"n{i+1:02d}",
                      "fromSide": "right", "toSide": "left", "label": labels[i]})
    edges.append({"id": "e_moc", "fromNode": "moc", "toNode": "n00", "fromSide": "bottom", "toSide": "top", "label": "lire le dossier"})

    # appareil
    nodes.append({"id": "grp_app", "type": "group", "x": 0, "y": 1260, "width": 1960, "height": 560, "label": "Appareil critique", "color": "3"})
    for j, (nid, name) in enumerate([("f", FORMULAIRE), ("l", LEXIQUE), ("s", SOURCES), ("g", GALERIE)]):
        nodes.append({"id": f"a_{nid}", "type": "file", "file": f(name), "x": 40 + j * 480, "y": 1330, "width": 440, "height": 440, "color": "3"})

    # portraits
    nodes.append({"id": "grp_crew", "type": "group", "x": 2020, "y": 1260, "width": 2020, "height": 560, "label": "L'équipage d'Artemis II", "color": "6"})
    for j, p in enumerate(CREW):
        nodes.append({"id": f"c{j}", "type": "file", "file": f"{REL}/Portraits/{p}.md",
                      "x": 2060 + j * 490, "y": 1330, "width": 450, "height": 440, "color": "6"})
    edges.append({"id": "e_g", "fromNode": "a_g", "toNode": "c0", "fromSide": "right", "toSide": "left", "label": "les quatre fiches"})

    # compagnon
    nodes.append({
        "id": "sim", "type": "text", "x": 2020, "y": 200, "width": 600, "height": 420, "color": "4",
        "text": f"## ▶ Nebula Orbit\nLe compagnon interactif du dossier — la mission Artemis II rejouée en "
                f"**{c['actes']} actes** et 38 manœuvres, vingt minutes en temps réel.\n\n[Lancer la simulation]({SIM})",
    })
    edges.append({"id": "e_sim", "fromNode": "n08", "toNode": "sim", "fromSide": "top", "toSide": "bottom", "label": "la simulation commentée"})

    # passerelles
    nodes.append({
        "id": "pass", "type": "text", "x": 2680, "y": 200, "width": 600, "height": 420, "color": "5",
        "text": "## 🔗 Passerelles\nNeuf des dix formules d'Artemis ont leur jumelle dans **[[Dossier XIV — Les Formules de l'Empire|le Dossier XIV]]**.\n\n"
                "La loi de Fourier est un champ de vecteurs → **[[Dossier VII — Le langage des champs|Dossier VII]]**.\n\n"
                "Les RS-25 sont des moteurs thermiques → **[[Dossier XXV — L'entropie, le temps et l'Univers|Dossier XXV]]**.",
    })

    (OUT / "Carte du dossier — Artemis II.canvas").write_text(
        json.dumps({"nodes": nodes, "edges": edges}, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def build_canvas_vol() -> None:
    """Frise des 5 actes du vol simulé, avec les moments clés."""
    soup = BeautifulSoup(SRC.read_text(encoding="utf-8"), "html.parser")
    sam = soup.find("section", class_="sam-chapter")
    acts, cur = [], None
    for child in sam.find_all(True, recursive=False):
        cl = child.get("class") or []
        if "sim-act" in cl:
            cur = {
                "roman": child.find(class_="roman").get_text(strip=True),
                "titre": child.find("h3").get_text(" ", strip=True),
                "timing": child.find(class_="timing").get_text(" ", strip=True),
                "moments": [],
            }
            acts.append(cur)
        elif "sim-timeline" in cl and cur is not None:
            for m in child.find_all(class_="moment", recursive=False):
                what = m.find(class_="what")
                cur["moments"].append({
                    "ts": m.find(class_="ts-pill").get_text(strip=True),
                    "key": "key" in (m.get("class") or []),
                    "txt": m.find(class_="body").find("p").get_text(" ", strip=True),
                    "what": what.get_text(" ", strip=True) if what else "",
                })

    nodes, edges = [], []
    nodes.append({
        "id": "titre", "type": "text", "x": 40, "y": 0, "width": 3200, "height": 140, "color": "4",
        "text": "# Le vol en vingt minutes\n**La mission Artemis II rejouée dans Nebula Orbit** — "
                f"{len(acts)} actes, {sum(len(a['moments']) for a in acts)} moments, 38 manœuvres, "
                "du décollage à l'atterrissage propulsif.",
    })
    nodes.append({"id": "note", "type": "file", "file": f(NOTES[8]), "x": 3300, "y": 0, "width": 520, "height": 420, "color": "4"})

    y = 200
    colors = ["1", "2", "3", "5", "6"]
    prev_group = None
    for ai, a in enumerate(acts):
        h = 260
        gw = 200 + len(a["moments"]) * 400
        nodes.append({
            "id": f"g{ai}", "type": "group", "x": 40, "y": y, "width": gw, "height": h + 60,
            "label": f"Acte {a['roman']} — {a['titre']}  ·  {a['timing']}", "color": colors[ai % len(colors)],
        })
        x = 90
        for mi, m in enumerate(a["moments"]):
            nid = f"m{ai}_{mi}"
            txt = m["txt"]
            txt = (txt[:230] + "…") if len(txt) > 230 else txt
            body = f"### {m['ts']}" + (" ⭐" if m["key"] else "") + f"\n{txt}"
            if m["what"]:
                body += f"\n\n`{m['what']}`"
            nodes.append({
                "id": nid, "type": "text", "x": x, "y": y + 50, "width": 360, "height": h - 20,
                "color": colors[ai % len(colors)] if m["key"] else None, "text": body,
            })
            x += 400
        y += h + 140
        if prev_group is not None:
            edges.append({"id": f"eg{ai}", "fromNode": f"g{prev_group}", "toNode": f"g{ai}",
                          "fromSide": "bottom", "toSide": "top"})
        prev_group = ai

    for n in nodes:
        if n.get("color") is None:
            n.pop("color")

    (OUT / "Le vol en vingt minutes — frise.canvas").write_text(
        json.dumps({"nodes": nodes, "edges": edges}, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return len(acts), sum(len(a["moments"]) for a in acts)


# ─────────────────────────── bases ───────────────────────────


def build_bases() -> None:
    (OUT / "Dossier III — lecture.base").write_text(
        "filters:\n"
        "  and:\n"
        f'    - file.inFolder("{REL}")\n'
        "    - ordre != null\n"
        "views:\n"
        "  - type: table\n"
        "    name: Le dossier dans l'ordre\n"
        "    order:\n"
        "      - file.name\n"
        "      - chapitre\n"
        "      - titre\n"
        "      - ordre\n"
        "    sort:\n"
        "      - property: ordre\n"
        "        direction: ASC\n",
        encoding="utf-8",
    )
    (OUT / "Portraits de l'équipage.base").write_text(
        "filters:\n"
        "  and:\n"
        f'    - file.inFolder("{REL}/Portraits")\n'
        "views:\n"
        "  - type: table\n"
        "    name: L'équipage\n"
        "    order:\n"
        "      - file.name\n"
        "      - role\n"
        "      - agence\n"
        "      - epithete\n"
        "    sort:\n"
        "      - property: file.name\n"
        "        direction: ASC\n"
        "  - type: cards\n"
        "    name: Les quatre visages\n"
        "    order:\n"
        "      - file.name\n"
        "      - role\n"
        "      - epithete\n",
        encoding="utf-8",
    )


def main() -> None:
    c = counts()
    build_dashboard(c)
    build_canvas_dossier(c)
    n_actes, n_moments = build_canvas_vol()
    build_bases()
    print(f"✓ {TDB}.md")
    print(f"✓ Carte du dossier — Artemis II.canvas")
    print(f"✓ Le vol en vingt minutes — frise.canvas   ({n_actes} actes, {n_moments} moments)")
    print("✓ Dossier III — lecture.base · Portraits de l'équipage.base")
    print("\nRecompté :")
    for k, v in c.items():
        print(f"   {k:18} {v}")


if __name__ == "__main__":
    main()
