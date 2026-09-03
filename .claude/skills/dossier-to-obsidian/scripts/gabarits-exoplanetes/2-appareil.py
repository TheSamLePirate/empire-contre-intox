#!/usr/bin/env python3
"""Dossier XVII — MOC, lexique, formulaire, les 54 fiches techniques, la note atlas.

À lancer APRÈS 1-dossier.py (qui dépose `_collected.json`).
"""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString

REPO = Path("/Users/olivierveinand/Documents/DEV/empire-contre-intox")
SRCDIR = REPO / "provoxys/exoplanetes"
SRC = SRCDIR / "index.html"
ATLAS_SRC = SRCDIR / "atlas.html"
OUT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/Dossier XVII — Mondes Lointains")
ASSETS = OUT / "_assets"
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
IMPORTE = "2026-08-26"

C = json.loads((Path(__file__).parent / "_collected.json").read_text(encoding="utf-8"))
soup = BeautifulSoup(SRC.read_text(encoding="utf-8"), "html.parser")
FICHES_DIR.mkdir(parents=True, exist_ok=True)

# ── noms de fichiers courts pour les fiches (Obsidian résout par nom de fichier) ──
SHORT = {
    "JWST — James Webb Space Telescope": "JWST",
    "Hubble — Hubble Space Telescope (HST)": "Hubble",
    "Spitzer — Spitzer Space Telescope": "Spitzer",
    "Kepler (et K2)": "Kepler",
    "TESS — Transiting Exoplanet Survey Satellite": "TESS",
    "CHEOPS — CHaracterising ExOPlanet Satellite": "CHEOPS",
    "PLATO — PLAnetary Transits and Oscillations of stars": "PLATO",
    "HWO — Habitable Worlds Observatory": "HWO",
    "W. M. Keck Observatory (Keck I & Keck II)": "Keck",
    "VLT (Very Large Telescope)": "VLT",
    "Subaru Telescope": "Subaru",
    "Voyager 1 & 2": "Voyager 1 et 2",
    "Arrokoth (2014 MU69)": "Arrokoth",
    "TRAPPIST-1 e (système TRAPPIST-1)": "TRAPPIST-1 e",
}

# vignettes de l'atlas, réutilisées par les fiches d'exoplanètes
ATLAS_IMG = {
    "TRAPPIST-1 e": "trappist1e", "WASP-39 b": "wasp39b", "K2-18 b": "k2-18b",
    "Proxima Centauri b": "proxima-b", "51 Pegasi b": "51pegb", "HD 209458 b": "hd209458b",
    "HD 189733 b": "hd189733b", "GJ 1214 b": "gj1214b", "LHS 1140 b": "lhs1140b",
    "TOI-700 d": "toi700d", "Kepler-186 f": "kepler186f", "WASP-121 b": "wasp121b",
}


def inline(el) -> str:
    if isinstance(el, NavigableString):
        return str(el)
    parts = []
    for c in el.children:
        if isinstance(c, NavigableString):
            parts.append(str(c))
            continue
        cls = c.get("class", []) or []
        if c.name in ("b", "strong"):
            t = inline(c).strip()
            parts.append(f"**{t}**" if t else "")
        elif c.name in ("em", "i"):
            t = inline(c).strip()
            parts.append(f"*{t}*" if t else "")
        elif c.name == "span" and "imath" in cls:
            parts.append(f"${c.get('data-tex', '').strip()}$")
        elif c.name == "a":
            parts.append(f"[{c.get_text(' ', strip=True).rstrip(' ↗')}]({c.get('href','')})")
        elif c.name in ("sub", "sup"):
            parts.append(f"<{c.name}>{inline(c).strip()}</{c.name}>")
        else:
            parts.append(inline(c))
    return re.sub(r"[ \t\n\r]+", " ", "".join(parts))


def txt(el) -> str:
    return inline(el).strip()


def front(**kw) -> str:
    lines = ["---"]
    for k, v in kw.items():
        lines.append(f"{k}: {v}")
    lines += ["projet: Empire contre Intox", "dossier: Dossier XVII", "numero: 17",
              "auteurs: [Provoxys, Samlepirate]", f"source: {PAGE}",
              "licence: CC BY-NC-ND 4.0", f"importe: {IMPORTE}",
              "tags:", "  - empire-contre-intox", "  - empire-contre-intox/dossier-17", "---", ""]
    return "\n".join(lines)


NAV = f"\n---\n⌂ [[{MOC}|Retour au sommaire]] · [[{TDB}|Tableau de bord]]\n"


# ═══════════════════════════ 1. les 54 fiches ═══════════════════════════

CAT_META = {
    "Instruments au sol": ("🔭", "instrument-sol"),
    "Télescopes & missions spatiales": ("🛰", "mission-spatiale"),
    "Sondes du Système solaire": ("🚀", "sonde"),
    "Planètes & corps du Système solaire": ("🪐", "corps-solaire"),
    "Exoplanètes": ("✦", "exoplanete"),
}

# texte des notes de lecture, pour retrouver où chaque objet apparaît
LECTURE = {}
for f, t in C["notes"]:
    p = OUT / f"{f}.md"
    if p.exists():
        LECTURE[(f, t)] = p.read_text(encoding="utf-8")

annexe = soup.find("section", id="annexe")
fiches: list[dict] = []
for det in annexe.find_all("details", class_="fiche-cat"):
    summ = det.find("summary")
    cnt = summ.find(class_="fc-count")
    cat = txt(summ).replace(txt(cnt), "").strip()
    for art in det.find_all("article", class_="fiche-tech"):
        name = txt(art.find(class_="ft-name"))
        sub = txt(art.find(class_="ft-sub"))
        specs = []
        dl = art.find("dl", class_="ft-specs")
        if dl:
            dts = dl.find_all("dt")
            dds = dl.find_all("dd")
            specs = [(txt(a), txt(b)) for a, b in zip(dts, dds)]
        note = art.find(class_="ft-note")
        srcs = []
        for a in art.select(".ft-src a"):
            srcs.append((a.get_text(" ", strip=True).rstrip(" ↗"), a.get("href", "")))
        fiches.append({
            "nom": name, "fichier": SHORT.get(name, name), "sub": sub, "cat": cat,
            "specs": specs, "note": txt(note) if note else "", "src": srcs,
        })

# vignettes de l'atlas
(ASSETS).mkdir(exist_ok=True)
for f in fiches:
    key = ATLAS_IMG.get(f["fichier"]) or ATLAS_IMG.get(f["nom"])
    if key:
        src = SRCDIR / "assets/atlas" / f"{key}.jpg"
        if src.exists():
            shutil.copy2(src, ASSETS / f"atlas-{key}.jpg")
            f["img"] = f"atlas-{key}.jpg"

# où l'objet apparaît dans le dossier
NEEDLE = {
    "Voyager 1 et 2": "Voyager", "Keck": "Keck", "Kepler": "Kepler", "Hubble": "Hubble",
    "Arrokoth": "Arrokoth", "TRAPPIST-1 e": "TRAPPIST-1 e", "Observatoire Vera C. Rubin": "Rubin",
    "Terre": None, "Mars": None, "Jupiter": None, "Saturne": None, "Vénus": None,
    "Mercure": None, "Uranus": None, "Neptune": None, "Pluton": None, "Titan": None,
}
for f in fiches:
    needle = NEEDLE.get(f["fichier"], f["fichier"])
    hits = []
    if needle:
        for (fname, title), body in LECTURE.items():
            if re.search(re.escape(needle), body):
                hits.append((fname, title))
    else:  # corps du Système solaire : trop courants, on cible le chapitre thématique
        for (fname, title), body in LECTURE.items():
            if re.search(r"\b" + re.escape(f["nom"]) + r"\b", body):
                hits.append((fname, title))
    f["hits"] = hits

for f in fiches:
    emoji, kind = CAT_META[f["cat"]]
    body = [front(**{
        "aliases": f'["{f["nom"]}"]' if f["fichier"] == f["nom"] else f'["{f["nom"]}", "{f["fichier"]}"]',
        "type": "fiche-technique",
        "categorie": f'"{f["cat"]}"',
        "genre": kind,
    })]
    body.append(f"# {f['nom']}\n")
    body.append(f"*{f['sub']}*\n")
    if f.get("img"):
        body.append(f"![[{f['img']}]]\n*Vue d'artiste — NASA/ESA/ESO, via l'atlas du dossier.*\n")
    if f["specs"]:
        body.append("| | |")
        body.append("| --- | --- |")
        for k, v in f["specs"]:
            body.append(f"| **{k}** | {v.replace('|', '—')} |")
        body.append("")
    if f["note"]:
        body.append(f"> [!info] {emoji} Ce qu'il faut en retenir\n> {f['note']}\n")
    if f["src"]:
        body.append("**Source** — " + " · ".join(f"[{n}]({u})" for n, u in f["src"]) + "\n")
    if f["hits"]:
        body.append("## Dans le dossier\n")
        for fname, title in f["hits"]:
            body.append(f"- [[{fname}|{title}]]")
        body.append("")
    body.append(f"---\n📇 [[{FICHES}|Toutes les fiches]] · ⌂ [[{MOC}|Sommaire du dossier]] · [[{TDB}|Tableau de bord]]\n")
    (FICHES_DIR / f"{f['fichier']}.md").write_text("\n".join(body), encoding="utf-8")

print(f"✔ {len(fiches)} fiches dans Fiches/")

# ── la galerie groupée ──
intro = annexe.find("p", class_="fiches-intro")
g = [front(aliases=f'["Les fiches du dossier XVII", "Fiches techniques XVII"]', type="appareil")]
g.append(f"# {FICHES}\n")
g.append(f"> [!abstract] L'annexe du dossier\n> {txt(intro)}\n> Chaque objet a sa note ; la page en ligne les filtre par un champ de recherche.\n")
g.append(f"⌂ [[{MOC}|Sommaire du dossier]] · 🌐 [l'annexe en ligne]({PAGE}#annexe)\n")
for cat, (emoji, _) in CAT_META.items():
    sel = [f for f in fiches if f["cat"] == cat]
    g.append(f"## {emoji} {cat} — {len(sel)} fiches\n")
    g.append("| Objet | Ce que c'est |")
    g.append("| --- | --- |")
    for f in sel:
        label = f["nom"] if f["fichier"] == f["nom"] else f["nom"]
        g.append(f"| [[{f['fichier']}\\|{label}]] | {f['sub']} |")
    g.append("")
g.append(NAV)
(OUT / f"{FICHES}.md").write_text("\n".join(g), encoding="utf-8")
print(f"✔ {FICHES}.md")


# ═══════════════════════════ 2. le lexique ═══════════════════════════

gl = annexe.find("dl", class_="glossary")
terms = [(txt(d.find("dt")), txt(d.find("dd"))) for d in gl.find_all("div", recursive=False)]
lx = [front(aliases='["Lexique XVII", "Les mots des mondes lointains"]', type="appareil")]
lx.append(f"# {LEXIQUE}\n")
lx.append(f"> [!abstract] Vingt-cinq mots pour lire le dossier\n"
          f"> Le vocabulaire de l'exoplanétologie, tel que le dossier l'emploie — du transit à la biosignature.\n")
lx.append(f"⌂ [[{MOC}|Sommaire du dossier]] · 📇 [[{FICHES}|Les 54 fiches techniques]]\n")
for t, d in terms:
    lx.append(f"## {t}\n")
    lx.append(f"{d}\n")
lx.append(NAV)
(OUT / f"{LEXIQUE}.md").write_text("\n".join(lx), encoding="utf-8")
print(f"✔ {LEXIQUE}.md  ({len(terms)} termes)")


# ═══════════════════════════ 3. le formulaire ═══════════════════════════

# formules en ligne (hors blocs), avec leur phrase d'accueil
inlines = []
for sp in soup.select("article.prose .imath"):
    if sp.find_parent(class_="formula-block"):
        continue
    par = sp.find_parent("p")
    sec = sp.find_parent("section")
    if par is None:
        continue
    inlines.append({"tex": sp.get("data-tex", "").strip(),
                    "phrase": txt(par), "sec": sec.get("id", "") if sec else ""})

SEC2NOTE = {sid: (fn, t) for sid, (fn, t) in
            zip(["atmospheres", "sol", "spatial", "spectroscopie", "geantes-glace", "hot-jupiters",
                 "super-terres", "habitables", "statistiques", "futur", "sources-live"],
                [(f, t) for f, t in C["notes"] if re.match(r"^(0[1-9]|1[01]) ", f)])}

fo = [front(aliases='["Formulaire XVII", "Les formules des atmosphères"]', type="appareil")]
fo.append(f"# {FORMULAIRE}\n")
fo.append(f"> [!abstract] Deux équations affichées, et le reste en ligne\n"
          f"> Le dossier n'est pas un cours de calcul : il affiche **{len(C['formules'])} blocs de formule** — "
          f"la statique d'une atmosphère, et le transfert radiatif qui permet de la lire à distance. "
          f"Chacun porte sa **lecture orale**, comme l'exige la charte du collectif.\n")
fo.append(f"⌂ [[{MOC}|Sommaire du dossier]]\n")
for f in C["formules"]:
    note = SEC2NOTE.get("atmospheres" if f["n"] == 1 else "spectroscopie")
    fo.append(f"## {f['titre']}\n")
    fo.append(f"*{f['tag']}*\n")
    fo.append(f"$${f['tex']}$$\n")
    if f["say"]:
        fo.append(f"> [!quote] Se lit\n> {f['say']}\n>\n> {f['glose']}\n")
    if f["note"]:
        fo.append(f"> [!note]- Ce que disent les symboles\n> {f['note']}\n")
    if note:
        fo.append(f"→ Dans le dossier : [[{note[0]}#^formule-{f['n']}|{note[1]}]]\n")
fo.append("## Les formules en ligne\n")
fo.append(f"*{len(inlines)} expressions posées au fil du texte, sans encadré — la charte ne leur demande pas "
          "de ligne « Se lit », les gloses des deux blocs couvrent leurs conventions.*\n")
fo.append("| Formule | Ce qu'elle dit | Où |")
fo.append("| --- | --- | --- |")
for it in inlines:
    n = SEC2NOTE.get(it["sec"])
    where = f"[[{n[0]}\\|{n[1]}]]" if n else "—"
    phrase = it["phrase"]
    phrase = (phrase[:150] + "…") if len(phrase) > 150 else phrase
    fo.append(f"| ${it['tex']}$ | {phrase.replace('|', '—')} | {where} |")
fo.append("")
fo.append(NAV)
(OUT / f"{FORMULAIRE}.md").write_text("\n".join(fo), encoding="utf-8")
print(f"✔ {FORMULAIRE}.md  ({len(C['formules'])} blocs · {len(inlines)} en ligne)")


# ═══════════════════════════ 4. la note atlas ═══════════════════════════

asoup = BeautifulSoup(ATLAS_SRC.read_text(encoding="utf-8"), "html.parser")
views = []
for v in asoup.find_all("section", class_="view"):
    views.append({
        "id": v.get("id", ""),
        "num": txt(v.find(class_="vnum")),
        "kick": txt(v.find(class_="vkick")),
        "titre": txt(v.find("h2")),
        "lead": txt(v.find(class_="vlead")),
    })
intox = [txt(n) for n in asoup.find_all(class_="note-intox")]

m = re.search(r"const GAL=\[\s*\n(.*?)\n    \];", ATLAS_SRC.read_text(encoding="utf-8"), re.S)
gal = json.loads(subprocess.run(["node", "-e", f"console.log(JSON.stringify([\n{m.group(1)}\n]))"],
                                capture_output=True, text=True).stdout) if m else []
for w in gal:
    src = SRCDIR / "assets/atlas" / f"{w[1]}.jpg"
    if src.exists():
        shutil.copy2(src, ASSETS / f"atlas-{w[1]}.jpg")

at = [front(aliases='["Atlas des exoplanètes", "Atlas XVII", "Le compagnon interactif"]', type="compagnon")]
at.append(f"# {ATLAS}\n")
at.append(f"> [!tip] Une page à part, sur des données brutes\n"
          f"> `atlas.html` visualise **tout le catalogue confirmé du NASA Exoplanet Archive** — 6 298 mondes au "
          f"4 juin 2026 — en **{len(views)-1} vues interactives** plus une galerie. Rien de tout cela ne survit au "
          f"Markdown : c'est du canvas WebGL et 2D piloté par un fichier de données de près d'un mégaoctet.\n>\n"
          f"> → **[Ouvrir l'atlas]({ATLAS_URL})**\n")
at.append(f"⌂ [[{MOC}|Sommaire du dossier]] · [[09 — Chapitre 9 — Diversité des systèmes & statistiques 2026|"
          f"Le chapitre qui y renvoie]]\n")
at.append("## Les huit vues\n")
for v in views:
    if v["id"] == "vedette":
        continue
    at.append(f"### {v['num']} · {v['titre']}\n")
    at.append(f"*{v['kick']}*\n")
    at.append(f"{v['lead']}\n")
    at.append(f"→ [voir la vue en ligne]({ATLAS_URL}#{v['id']})\n")
at.append("## Mondes en vedette\n")
ved = next((v for v in views if v["id"] == "vedette"), None)
if ved:
    at.append(f"{ved['lead']}\n")
at.append("| Monde | Ce qu'il a de particulier | Vue d'artiste |")
at.append("| --- | --- | --- |")
for w in gal:
    name, key, desc, eyes, credit, cc = w
    fiche = SHORT.get(name, name)
    label = f"[[{fiche}\\|{name}]]" if (FICHES_DIR / f"{fiche}.md").exists() else name
    at.append(f"| {label} | {desc} | ![[atlas-{key}.jpg\\|120]] |")
at.append("")
at.append("*Crédits images : " + " · ".join(sorted({w[4] for w in gal})) + ".*\n")
at.append("*Chaque monde est aussi explorable en 3D temps réel dans "
          "[NASA Eyes on Exoplanets](https://eyes.nasa.gov/apps/exo/).*\n")
for i, t in enumerate(intox):
    lbl, _, rest = t.partition(" ")
    at.append(f"> [!warning] 🛡 {'À garder en tête' if i == 0 else 'Honnêteté des données'}\n> "
              + t.replace("À garder en tête ", "").replace("Honnêteté des données ", "") + "\n")
at.append(NAV)
(OUT / f"{ATLAS}.md").write_text("\n".join(at), encoding="utf-8")
print(f"✔ {ATLAS}.md  ({len(views)-1} vues · {len(gal)} mondes en vedette)")


# ═══════════════════════════ 5. le MOC ═══════════════════════════

notes = C["notes"]
mo = [front(aliases=f'["Dossier XVII", "Mondes Lointains", "Exoplanètes", "Atmosphères & Mondes Lointains"]',
            type="moc")]
mo.append(f"# {MOC}\n")
mo.append("![[exoplanetes-hero.png]]\n")
mo.append(f"*{C['eyebrow']}*\n")
mo.append(f"**{C['lead']}**\n")
mo.append(f"> [!quote]\n> {C['quote']}\n")
mo.append(f"→ [[{TDB}|**Le tableau de bord du dossier**]] — les chiffres, la progression de lecture et les cartes.\n")

mo.append("## Quatre repères pour commencer\n")
mo.append("| | |")
mo.append("| --- | --- |")
for k, v in C["signals"]:
    mo.append(f"| **{k}** | {v} |")
mo.append("")

mo.append("## L'ouverture\n")
for p in C["ouverture"]:
    mo.append(p + "\n")

mo.append("## Le fil conducteur\n")
for k, v in C["fil"]:
    mo.append(f"- **{k}** — {v}")
mo.append("")

mo.append("## Ce que ce dossier vous apprend\n")
mo.append(f"*{C['objectifs_titre'].rstrip('.')}*\n")
for k, v in C["objectifs"]:
    mo.append(f"- **{k}** — {v}")
mo.append("")

mo.append("## Sommaire\n")
for fname, title in notes:
    kick = C.get("kickers", {}).get(fname, "")
    suffix = f" *({kick.split(' · ')[-1]})*" if " · " in kick else ""
    mo.append(f"- [[{fname}|{title}]]{suffix}")
    for ch in C["chapitres"].get(fname, []):
        mo.append(f"\t- [[{fname}#{ch}|{ch}]]")
mo.append("")

mo.append("## L'appareil du dossier\n")
mo.append(f"- 📇 [[{FICHES}]] — instruments, sondes, planètes et exoplanètes, une note par objet")
mo.append(f"- 📖 [[{LEXIQUE}]] — {len(terms)} termes")
mo.append(f"- ƒ [[{FORMULAIRE}]] — les {len(C['formules'])} blocs, avec leur lecture orale")
mo.append(f"- 🔍 [[{SOURCES}]] — les fiches de vérification et les DOI")
mo.append(f"- ✦ [[{ATLAS}]] — la page compagnon, sur données réelles")
mo.append(f"- 🗺 [[Carte du dossier — Mondes Lointains.canvas|La carte du dossier]]")
mo.append(f"- 🕰 [[Trente ans d'exoplanètes — frise.canvas|La frise des jalons]]")
mo.append("")

mo.append("## Les six ateliers interactifs\n")
mo.append("*Ils ne survivent pas au Markdown — chaque note les signale en encadré replié, avec le lien vers la page.*\n")
mo.append("| Atelier | Ce qu'on y règle |")
mo.append("| --- | --- |")
for a in C["ateliers"]:
    tag = re.sub(r"</?su[bp]>", "", a["tag"])
    label = a["titre"].replace("Atelier interactif · ", "")
    mo.append(f"| {label[0].upper()}{label[1:]} | *{tag}* |")
mo.append("")

mo.append("## Crédits\n")
credit = f"Réalisé par **{C['credit']}**"
if C.get("credit_note"):
    credit += f", {C['credit_note']}"
mo.append(credit + f". Dossier XVII du site [Empire contre Intox]({SITE}/) — "
          f"[la page d'origine]({PAGE}). Contenu sous licence "
          "[CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr).\n")
mo.append(f"> [!quote] Devise du collectif\n> *{C.get('devise', 'Veritas omnia vincit')}*\n")
(OUT / f"{MOC}.md").write_text("\n".join(mo), encoding="utf-8")
print(f"✔ {MOC}.md")
