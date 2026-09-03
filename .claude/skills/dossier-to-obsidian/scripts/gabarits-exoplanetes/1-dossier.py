#!/usr/bin/env python3
"""Dossier XVII « Atmosphères & Mondes Lointains » → notes de lecture Obsidian.

Structure de la page (codex ECI, voie A) :
    section.chapter → div.chapter-head + div.transcript(article.prose + aside.side-note)
    blocs : .explain-block · .formula-block · .viz · .dtable-wrap · figure.chapter-figure
            figure.model3d · .scope-card · .science-block · .atlas-cta · .milestones
    hors chapitre : .intro-band(.manifesto + .timeline) · .learning-panel · .credit-band
                    .annexe(5 details.fiche-cat + dl.glossary) · .closing
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
VAULT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox")
OUT = VAULT / "Dossier XVII — Mondes Lointains"
ASSETS = OUT / "_assets"

SITE = "https://empire-contre-intox.com"
PAGE = f"{SITE}/provoxys/exoplanetes/index.html"
ATLAS_URL = f"{SITE}/provoxys/exoplanetes/atlas.html"

MOC = "Dossier XVII — Atmosphères & Mondes Lointains"
LEXIQUE = "Lexique — les mots des mondes lointains"
ATLAS = "L'atlas des exoplanètes — le compagnon interactif"
FICHES = "Fiches techniques — les cinquante-quatre objets du dossier"
IMPORTE = "2026-08-26"

# id de section → (numéro de note, titre de la note, nom de fichier)
CHAPS = {
    "atmospheres":   (1, "Chapitre 1 — Les atmosphères planétaires", "01 — Chapitre 1 — Les atmosphères planétaires"),
    "sol":           (2, "Chapitre 2 — Les télescopes au sol", "02 — Chapitre 2 — Les télescopes au sol"),
    "spatial":       (3, "Chapitre 3 — Les télescopes spatiaux & les sondes", "03 — Chapitre 3 — Les télescopes spatiaux & les sondes"),
    "spectroscopie": (4, "Chapitre 4 — Lire une atmosphère : la spectroscopie", "04 — Chapitre 4 — Lire une atmosphère, la spectroscopie"),
    "geantes-glace": (5, "Chapitre 5 — Les géantes de glace & les petits corps", "05 — Chapitre 5 — Les géantes de glace & les petits corps"),
    "hot-jupiters":  (6, "Chapitre 6 — Les Jupiters chauds", "06 — Chapitre 6 — Les Jupiters chauds"),
    "super-terres":  (7, "Chapitre 7 — Super-Terres, mini-Neptunes & rocheuses", "07 — Chapitre 7 — Super-Terres, mini-Neptunes & rocheuses"),
    "habitables":    (8, "Chapitre 8 — La zone habitable & les mondes habitables", "08 — Chapitre 8 — La zone habitable & les mondes habitables"),
    "statistiques":  (9, "Chapitre 9 — Diversité des systèmes & statistiques 2026", "09 — Chapitre 9 — Diversité des systèmes & statistiques 2026"),
    "futur":         (10, "Chapitre 10 — Missions futures & perspectives", "10 — Chapitre 10 — Missions futures & perspectives"),
    "sources-live":  (11, "L'appareil critique — Les sources du dossier", "11 — L'appareil critique — Les sources du dossier"),
}

soup = BeautifulSoup(SRC.read_text(encoding="utf-8"), "html.parser")
OUT.mkdir(parents=True, exist_ok=True)
ASSETS.mkdir(exist_ok=True)

counters = {"formule": 0, "repere": 0}
collected: dict = {}


# ───────────────────────────── helpers ─────────────────────────────


def sanitize(name: str) -> str:
    name = name.replace(" : ", ", ").replace(":", "")
    name = re.sub(r'[/\\|#^\[\]?*"<>]', "", name)
    return re.sub(r"\s+", " ", name).strip()


def resolve(href: str, text: str) -> str:
    if not href:
        return text
    if href.startswith("http"):
        return f"[{text}]({href})"
    if href == "../../index.html":
        return f"[{text}]({SITE}/)"
    if href.startswith("../../"):
        return f"[{text}]({SITE}/{href[6:]})"
    if href == "atlas.html":
        return f"[[{ATLAS}|{text}]]"
    if href.startswith("#"):
        return f"[{text}]({PAGE}{href})"
    return f"[{text}]({SITE}/provoxys/exoplanetes/{href})"


def inline(el) -> str:
    """HTML en ligne → Markdown. N'AJOUTE aucune espace : le source porte les siennes."""
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
            parts.append(resolve(c.get("href", ""), c.get_text(" ", strip=True)))
        elif c.name == "br":
            parts.append(" ")
        elif c.name in ("sub", "sup"):
            parts.append(f"<{c.name}>{inline(c).strip()}</{c.name}>")
        elif c.name == "code":
            parts.append(f"`{inline(c).strip()}`")
        else:
            parts.append(inline(c))
    s = "".join(parts)
    s = re.sub(r"[ \t\n\r]+", " ", s)
    return s


def txt(el) -> str:
    return inline(el).strip()


def callout(kind: str, title: str, bodies: list[str], fold: str = "") -> str:
    lines = [f"> [!{kind}]{fold} {title}".rstrip()]
    for b in bodies:
        if not b:
            continue
        for ln in b.split("\n"):
            lines.append(("> " + ln).rstrip())
        lines.append(">")
    while lines and lines[-1] == ">":
        lines.pop()
    return "\n".join(lines)


def copy_asset(rel: str) -> str:
    name = os.path.basename(rel)
    src = SRCDIR / rel
    if src.exists():
        shutil.copy2(src, ASSETS / name)
    return name


# ───────────────────────────── blocs ─────────────────────────────


def conv_formula(fb) -> str:
    counters["formule"] += 1
    n = counters["formule"]
    head = fb.find(class_="fb-head")
    tag = head.find(class_="fb-tag") if head else None
    tag_t = txt(tag) if tag else ""
    if tag:
        tag.extract()
    title = txt(head) if head else "Formule"
    full_title = f"{title} · {tag_t}" if tag_t else title
    body = []
    tex = ""
    f = fb.find(class_="formula")
    if f and f.get("data-tex"):
        tex = f["data-tex"].strip()
        body.append(f"$${tex}$$")
    say = fb.find(class_="fb-say")
    if say:
        st = say.find(class_="say-t")
        sx = st.find(class_="say-x") if st else None
        if sx:
            sx.extract()
        if st:
            body.append(f"**Se lit** — {txt(st)}")
        if sx:
            body.append(txt(sx))
    note = fb.find(class_="fb-note")
    if note:
        body.append(txt(note))
    collected.setdefault("formules", []).append(
        {"n": n, "titre": title, "tag": tag_t, "tex": tex,
         "say": txt(st) if say and st else "", "glose": txt(sx) if say and sx else "",
         "note": txt(note) if note else ""}
    )
    return callout("abstract", f"ƒ {full_title}", body) + f"\n^formule-{n}"


def conv_explain(eb) -> str:
    head = eb.find(class_="xb-head")
    tag = head.find(class_="xb-tag") if head else None
    tag_t = txt(tag) if tag else ""
    if tag:
        tag.extract()
    lbl = txt(head) if head else "Explication"
    title = f"💡 {lbl} — {tag_t}" if tag_t else f"💡 {lbl}"
    return callout("info", title, conv_blocks(eb.find(class_="xb-body")))


def conv_viz(v) -> str:
    head = v.find(class_="viz-head")
    tag = head.find(class_="vz-tag") if head else None
    tag_t = txt(tag) if tag else ""
    if tag:
        tag.extract()
    title = txt(head)
    body = []
    ro = v.find(class_="viz-readout")
    if ro:
        body.append(txt(ro))
    presets = [txt(b) for b in v.select("button.viz-btn")]
    if presets:
        body.append("**Réglages disponibles** — " + " · ".join(presets))
    ctrls = []
    for c in v.find_all(class_="viz-ctrl"):
        lab = c.find("label")
        if lab:
            ctrls.append(txt(lab))
    if ctrls:
        body.append("**Curseurs** — " + " · ".join(ctrls))
    body.append(f"Jouable uniquement sur [la page du dossier]({PAGE}#{v.find_parent('section').get('id', '')}).")
    collected.setdefault("ateliers", []).append({"id": v.get("data-viz"), "titre": title, "tag": tag_t})
    return callout("example", f"🧪 {title} · `{tag_t}`", body, fold="-")


def conv_table(wrap) -> str:
    table = wrap.find("table")
    cap = table.find("caption")
    out = []
    if cap:
        out.append(f"**{txt(cap)}**")
        out.append("")
    head = [txt(th) for th in table.find("thead").find_all("th")]
    out.append("| " + " | ".join(head) + " |")
    out.append("|" + " --- |" * len(head))
    for tr in table.find("tbody").find_all("tr"):
        cells = []
        for td in tr.find_all(["td", "th"]):
            t = txt(td).replace("|", "\\|")
            tcls = td.get("class") or []
            if "mono" in tcls:
                t = f"`{t}`"
            elif "k" in tcls:
                t = f"**{t}**"
            cells.append(t)
        out.append("| " + " | ".join(cells) + " |")
    return "\n".join(out)


def conv_figure(fig) -> str:
    cap = fig.find("figcaption")
    img = fig.find("img")
    if img is not None:
        name = copy_asset(img.get("src", ""))
        out = f"![[{name}]]"
        if cap:
            out += f"\n*{txt(cap)}*"
        return out
    iframe = fig.find("iframe")
    if iframe is not None:  # modèle 3D Sketchfab
        title = iframe.get("title", "Modèle 3D")
        hint = cap.find(class_="m3d-hint") if cap else None
        hint_t = txt(hint) if hint else ""
        if hint:
            hint.extract()
        link = cap.find("a") if cap else None
        url = link.get("href") if link else iframe.get("src", "")
        if link:
            link.extract()
        lead = txt(cap) if cap else title
        if hint_t:
            lead += f" — *{hint_t.lstrip('— ').strip()}*"
        body = [lead]
        body.append(f"Le modèle ne survit pas au Markdown : [l'ouvrir sur Sketchfab]({url}) "
                    f"ou [le faire tourner dans le dossier]({PAGE}#spatial).")
        return callout("example", f"🛰 {title}", body, fold="-")
    return txt(cap) if cap else ""


def conv_scope(sc) -> str:
    head = sc.find(class_="sc-head")
    name = txt(head.find(class_="sc-name"))
    full = txt(head.find(class_="sc-full"))
    chip = head.find(class_="sc-chip")
    chip_t = txt(chip) if chip else ""
    specs = sc.find(class_="sc-specs")
    body = []
    if specs:
        pairs, cur = [], None
        for c in specs.children:
            if isinstance(c, NavigableString):
                continue
            if c.name == "span":
                cur = txt(c)
            elif c.name == "b" and cur:
                pairs.append(f"**{cur}** {txt(c)}")
                cur = None
        body.append(" · ".join(pairs))
    for p in sc.select(".sc-body p"):
        body.append(txt(p))
    line = sc.find(class_="sc-line")
    if line:
        tg = line.find(class_="sc-tag")
        tg_t = txt(tg) if tg else ""
        if tg:
            tg.extract()
        body.append(f"**{tg_t}** — {txt(line)}")
    title = f"🔭 {name} — {full}"
    if chip_t:
        title += f" · {chip_t}"
    collected.setdefault("scopes", []).append({"nom": name, "full": full, "chip": chip_t})
    return callout("abstract", title, body)


def conv_science(sb) -> str:
    lbl = sb.find(class_="block-label")
    title = txt(lbl) if lbl else "Repère"
    if lbl:
        lbl.extract()
    return callout("info", f"🔬 {title}", [txt(p) for p in sb.find_all("p")])


def conv_atlas_cta(cta) -> str:
    kick = cta.find(class_="ac-kick")
    h3 = cta.find("h3")
    p = cta.find("p")
    return callout(
        "tip",
        f"✦ {txt(h3)}",
        [f"*{txt(kick)}*", txt(p), f"→ [[{ATLAS}|La note du compagnon]] · [ouvrir l'atlas en ligne]({ATLAS_URL})"],
    )


def milestones_data() -> list[tuple[str, str]]:
    """La frise vit dans le JS : `const DATA=[["1995 — …","…"], …]`."""
    src = SRC.read_text(encoding="utf-8")
    m = re.search(r"const DATA=\[\s*\n(.*?)\n      \];", src, re.S)
    if not m:
        return []
    js = "[\n" + m.group(1) + "\n]"
    out = subprocess.run(["node", "-e", f"console.log(JSON.stringify({js}))"],
                         capture_output=True, text=True)
    if out.returncode:
        raise SystemExit(out.stderr[:400])
    rows = json.loads(out.stdout)
    clean = []
    for t, d in rows:
        d = re.sub(r"<strong>(.*?)</strong>", r"**\1**", d)
        d = re.sub(r"<[^>]+>", "", d).replace("&amp;", "&")
        clean.append((t.replace("&amp;", "&"), d))
    return clean


def conv_milestones(ms) -> str:
    head = ms.find(class_="ms-head")
    tag = head.find(class_="ms-tag") if head else None
    if tag:
        tag.extract()
    rows = milestones_data()
    collected["jalons"] = rows
    out = [f"### {txt(head)}", "",
           "*Onze jalons, de la première exoplanète à l'observatoire qui voudra photographier une Terre.*",
           "", "| Année | Le jalon | Ce qui s'est joué |", "| --- | --- | --- |"]
    caps = [txt(n.find(class_="ms-cap")) for n in ms.select(".ms-node")]
    years = [txt(n.find(class_="ms-year")) for n in ms.select(".ms-node")]
    for i, (t, d) in enumerate(rows):
        year = years[i] if i < len(years) else t.split("—")[0].strip()
        cap = caps[i] if i < len(caps) else ""
        out.append(f"| **{year}** | {cap} | {d} |")
    out += ["", f"→ La même frise en canvas : [[Trente ans d'exoplanètes — frise.canvas|la frise des jalons]]."]
    return "\n".join(out)


def conv_aside(aside) -> str:
    h3 = aside.find("h3")
    title = txt(h3) if h3 else "Repère"
    if h3:
        h3.extract()
    tl = aside.find(class_="tag-list")
    tags = [txt(t) for t in tl.find_all(class_="tag")] if tl else []
    if tl:
        tl.extract()
    body = [txt(p) for p in aside.find_all("p")]
    if tags:
        body.append("*" + " · ".join(tags) + "*")
    kind = "warning" if title.lower().startswith("anti-intox") else "important"
    emoji = "🛡" if kind == "warning" else "🧭"
    counters["repere"] += 1
    return callout(kind, f"{emoji} {title}", body) + f"\n^repere-{counters['repere']}"


def conv_list(ul) -> str:
    marker = "1." if ul.name == "ol" else "-"
    return "\n".join(f"{marker} {txt(li)}" for li in ul.find_all("li", recursive=False))


def conv_blocks(el) -> list[str]:
    out: list[str] = []
    if el is None:
        return out
    for c in el.children:
        if isinstance(c, NavigableString):
            continue
        cls = c.get("class", []) or []
        if c.name == "p" and "lede" in cls:
            out.append(f"*{txt(c)}*")
        elif c.name == "p" and "sub" in cls:
            out.append(f"**{txt(c)}**")
        elif c.name == "p":
            t = txt(c)
            if t:
                out.append(t)
        elif c.name == "h3" and "group-title" in cls:
            out.append(f"### {txt(c)}")
        elif c.name in ("h3", "h4"):
            out.append(f"### {txt(c)}")
        elif c.name in ("ul", "ol"):
            out.append(conv_list(c))
        elif "formula-block" in cls:
            out.append(conv_formula(c))
        elif "explain-block" in cls:
            out.append(conv_explain(c))
        elif "viz" in cls and c.get("data-viz"):
            out.append(conv_viz(c))
        elif "dtable-wrap" in cls:
            out.append(conv_table(c))
        elif "scope-card" in cls:
            out.append(conv_scope(c))
        elif "science-block" in cls:
            out.append(conv_science(c))
        elif "atlas-cta" in cls:
            out.append(conv_atlas_cta(c))
        elif "milestones" in cls:
            out.append(conv_milestones(c))
        elif c.name == "figure":
            out.append(conv_figure(c))
        elif c.name in ("div", "section", "article"):
            out.extend(conv_blocks(c))
    return out


# ───────────────────────────── parcours ─────────────────────────────

main = soup.find("main")
notes: list[tuple[str, str, list[str]]] = []      # (fichier, titre, blocs)
chapters_by_note: dict[str, list[str]] = {}

# hero
hero = soup.find("header", class_="hero")
collected["eyebrow"] = txt(hero.find(class_="eyebrow"))
collected["h1"] = txt(hero.find("h1"))
collected["lead"] = txt(hero.find(class_="hero-lead"))
collected["quote"] = txt(hero.find(class_="hero-quote"))
collected["signals"] = [(txt(s.find("span")), txt(s.find("strong"))) for s in hero.select(".signal")]

for sec in main.find_all("section", recursive=False):
    sid = sec.get("id") or ""
    cls = sec.get("class") or []

    if "intro-band" in cls:
        man = sec.find(class_="manifesto")
        collected["ouverture_kicker"] = txt(man.find(class_="section-kicker"))
        collected["ouverture_titre"] = txt(man.find("h2"))
        collected["ouverture"] = [txt(p) for p in man.find_all("p") if "section-kicker" not in (p.get("class") or [])]
        collected["fil"] = [(txt(r.find("time")), txt(r.find("p"))) for r in sec.select(".timeline-row")]
        continue

    if "learning-panel" in cls:
        collected["objectifs_titre"] = txt(sec.find("h2"))
        collected["objectifs"] = [(txt(i.find("span")), txt(i.find("p"))) for i in sec.select(".learning-item")]
        continue

    if "credit-band" in cls:
        ct = sec.find(class_="credit-text")
        collected["credit"] = txt(ct.find("strong"))
        note = ct.find(class_="note")
        collected["credit_note"] = txt(note) if note else ""
        for img in sec.select(".credit-avatars img"):
            copy_asset(img.get("src", ""))
        collected["avatars"] = [os.path.basename(i.get("src", "")) for i in sec.select(".credit-avatars img")]
        continue

    if sid == "annexe":
        continue  # traité par 2-appareil.py

    if "closing" in cls:
        collected["closing_titre"] = txt(sec.find("h2"))
        collected["closing"] = txt(sec.find("p"))
        continue

    if "collective-footer" in cls:
        m = sec.find(class_="collective-motto")
        collected["devise"] = txt(m) if m else "Veritas omnia vincit"
        continue

    if "chapter" in cls and sid in CHAPS:
        num, title, fname = CHAPS[sid]
        blocks: list[str] = []
        head = sec.find(class_="chapter-head")
        kicker = txt(head.find(class_="section-kicker"))
        blocks.append(f"> [!abstract] {kicker}\n> **{txt(head.find('h2'))}**")
        # enfants directs hors chapter-head / transcript (model3d, milestones)
        for child in sec.find_all(recursive=False):
            ccls = child.get("class") or []
            if "chapter-head" in ccls:
                continue
            if "transcript" in ccls:
                prose = child.find(class_="prose")
                blocks.extend(conv_blocks(prose))
                aside = child.find("aside", class_="side-note")
                if aside:
                    blocks.append(conv_aside(aside))
            elif child.name == "figure":
                blocks.append(conv_figure(child))
            elif "milestones" in ccls:
                blocks.append(conv_milestones(child))
        notes.append((fname, title, blocks))
        chapters_by_note[fname] = [b.split("\n", 1)[0][4:] for b in blocks if b.startswith("### ")]
        collected.setdefault("kickers", {})[fname] = kicker
        continue

# note d'ouverture (00) — le manifeste + le fil conducteur
ouv_blocks = [f"*{collected['ouverture_kicker']}*"]
ouv_blocks += collected["ouverture"]
ouv_blocks.append("### Le fil conducteur du dossier")
ouv_blocks.append("\n".join(f"- **{k}** — {v}" for k, v in collected["fil"]))
ouv_blocks.append("### Ce que ce dossier vous apprend")
ouv_blocks.append(f"*{collected['objectifs_titre'].rstrip('.')}*")
ouv_blocks.append("\n".join(f"- **{k}** — {v}" for k, v in collected["objectifs"]))
ouv_blocks.append(callout("quote", "Le mot du hero", [collected["quote"]]))
notes.insert(0, ("00 — Ouverture — Au-delà du Soleil, des milliers de mondes",
                 f"Ouverture — {collected['ouverture_titre'].rstrip('.')}", ouv_blocks))
chapters_by_note["00 — Ouverture — Au-delà du Soleil, des milliers de mondes"] = [
    "Le fil conducteur du dossier", "Ce que ce dossier vous apprend"]

# note de clôture (12)
notes.append(("12 — Le mot de la fin — Le réel est déjà vertigineux",
              "Le mot de la fin", [f"## {collected['closing_titre']}", collected["closing"],
                                   callout("quote", "Devise du collectif", [f"*{collected['devise']}*"])]))
chapters_by_note["12 — Le mot de la fin — Le réel est déjà vertigineux"] = []

# hero + vignette d'index
for rel in ("assets/exoplanetes-hero.png", "assets/exoplanetes-hero.index.webp"):
    copy_asset(rel)

# ───────────────────────────── écriture ─────────────────────────────


def front(title: str, ordre: int, chapitre: str = "") -> str:
    alias = [title]
    if chapitre:
        alias.append(chapitre)
    alias_s = ", ".join(f'"{a}"' for a in dict.fromkeys(alias))
    return "\n".join([
        "---",
        f"aliases: [{alias_s}]",
        "projet: Empire contre Intox",
        "dossier: Dossier XVII",
        "numero: 17",
        "type: lecture",
        f"titre: \"{title}\"",
        f"ordre: {ordre}",
        "auteurs: [Provoxys, Samlepirate]",
        f"source: {PAGE}",
        "licence: CC BY-NC-ND 4.0",
        f"importe: {IMPORTE}",
        "tags:",
        "  - empire-contre-intox",
        "  - empire-contre-intox/dossier-17",
        "  - exoplanetes",
        "  - astronomie",
        "---",
        "",
    ])


for i, (fname, title, blocks) in enumerate(notes):
    ch = ""
    m = re.match(r"^(Chapitre \d+)", title)
    if m:
        ch = m.group(1)
    body = front(title, i, ch) + f"# {title}\n\n" + "\n\n".join(blocks) + "\n"
    nav = [f"[[{MOC}|⌂ Sommaire du dossier]]"]
    if i > 0:
        nav.append(f"← [[{notes[i-1][0]}|{notes[i-1][1]}]]")
    if i < len(notes) - 1:
        nav.append(f"[[{notes[i+1][0]}|{notes[i+1][1]}]] →")
    body += "\n---\n" + " · ".join(nav) + "\n"
    (OUT / f"{fname}.md").write_text(body, encoding="utf-8")
    print(f"✔ {fname}.md  ({len(body)//1000} k)")

collected["notes"] = [(f, t) for f, t, _ in notes]
collected["chapitres"] = chapters_by_note
(Path(__file__).parent / "_collected.json").write_text(json.dumps(collected, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"\n{len(notes)} notes · {counters['formule']} formules · {counters['repere']} repères")
print("Dossier :", OUT)
