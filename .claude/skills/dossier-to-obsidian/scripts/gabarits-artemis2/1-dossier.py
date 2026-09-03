#!/usr/bin/env python3
"""Dossier III « Artemis II » → Obsidian — les 9 notes de lecture.

Voie B (identité invitée Provoxys) : les classes ne sont PAS celles du codex.
    section.chapter   → div.chap-head (.num + h2) puis div.part*
    div.part          → .part-label + h3 + blocs
    div.provoxy       → .who (b + span.ts) + p        (verbatim, 86 blocs)
    div.show-ts       → « Repère original · MM:SS »
    div.formula-block → .fb-head + .formula* + .fb-say + .fb-note
    section.sam-chapter → p.intro* + (div.sim-act + div.sim-timeline)*
    div.moment[.key]  → .ts-pill + .body (p + .what)
"""
from __future__ import annotations

import re
import shutil
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

REPO = Path("/Users/olivierveinand/Documents/DEV/empire-contre-intox")
SRC = REPO / "provoxys/Artemis2.html"
VAULT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox")
OUT = VAULT / "Dossier III — Artemis II"
ASSETS = OUT / "_assets"

SITE = "https://empire-contre-intox.com"
PAGE = f"{SITE}/provoxys/Artemis2.html"
SIM = "https://thesamlepirate.github.io/NebulaSim/artemis2-multistage.fr.html"

MOC = "Dossier III — Artemis II, l'Odyssée Lunaire"
IMPORTE = "2026-08-26"

# nom de fichier (sans .md) par index de section
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
ALIASES = [
    ["Ouverture Artemis", "Introduction au live"],
    ["Chapitre 1 Artemis", "D'Apollo à Artemis", "Genèse du programme"],
    ["Chapitre 2 Artemis", "Financements Artemis", "Coûts du SLS"],
    ["Chapitre 3 Artemis", "Artemis I et II", "Déroulement des missions"],
    ["Chapitre 4 Artemis", "HLS Starship", "Gateway"],
    ["Chapitre 5 Artemis", "Expériences Artemis", "Accords Artemis"],
    ["Chapitre 6 Artemis", "Impacts d'Artemis", "Perspectives 2030"],
    ["Chapitre 7 Artemis", "LC-39B", "Le pas de tir"],
    ["Sam prend l'antenne", "Nebula Orbit", "Le vol en vingt minutes"],
]

# ───────────────────────────── inline ─────────────────────────────

NBSP = "\xa0"


def esc_tex(t: str) -> str:
    return t.strip()


def inline(node) -> str:
    """Convertit un nœud HTML en Markdown inline, sans AJOUTER d'espace."""
    if isinstance(node, NavigableString):
        return str(node)
    if not isinstance(node, Tag):
        return ""

    cls = node.get("class") or []

    if node.name == "br":
        return "\n"
    if "imath" in cls and node.get("data-tex"):
        return f"${esc_tex(node['data-tex'])}$"
    if node.name in ("b", "strong"):
        inner = "".join(inline(c) for c in node.children).strip()
        return f"**{inner}**" if inner else ""
    if node.name in ("em", "i"):
        inner = "".join(inline(c) for c in node.children).strip()
        return f"*{inner}*" if inner else ""
    if node.name == "sub":
        return f"_{node.get_text(strip=True)}"
    if node.name == "sup":
        return f"^{node.get_text(strip=True)}"
    if node.name == "a":
        href = node.get("href", "")
        label = node.get_text(" ", strip=True)
        if href.startswith("../index.html") or href == "../index.html":
            href = f"{SITE}/"
        elif href.startswith("../LICENCE"):
            href = f"{SITE}/LICENCE-CONTENU.md"
        elif href.startswith("#"):
            href = PAGE + href
        elif href.startswith("../"):
            href = f"{SITE}/" + href[3:]
        return f"[{label}]({href})"
    return "".join(inline(c) for c in node.children)


def txt(node) -> str:
    """Markdown inline nettoyé — ne touche qu'aux espaces SIMPLES."""
    s = inline(node)
    s = s.replace("​", "")
    s = re.sub(r"[ \t]+", " ", s)          # jamais \s : garde les insécables
    s = re.sub(r" *\n *", "\n", s)
    return s.strip()


def norm_nbsp(s: str) -> str:
    """Pour les titres de fichiers/ancres : l'insécable devient une espace."""
    return s.replace(NBSP, " ")


def safe(name: str) -> str:
    return name.replace(":", " —").replace("/", "-").replace("|", "-")


# ───────────────────────────── blocs ─────────────────────────────

FORMULA_N = 0
RETENIR_N = 0


def formula_block(fb: Tag) -> list[str]:
    global FORMULA_N
    FORMULA_N += 1
    head = fb.find(class_="fb-head")
    tag = head.find(class_="fb-tag")
    tag_txt = tag.get_text(" ", strip=True) if tag else ""
    if tag:
        tag.extract()
    title = head.get_text(" ", strip=True)

    lines = [f"> [!abstract] {title}" + (f" — *{tag_txt}*" if tag_txt else "")]
    for f in fb.find_all(class_="formula"):
        tex = f.get("data-tex")
        if tex:
            lines.append(f"> $${esc_tex(tex)}$$")

    say = fb.find(class_="fb-say")
    if say:
        t = say.find(class_="say-t")
        x = say.find(class_="say-x")
        if x:
            x.extract()
        phrase = txt(t)
        lines.append(">")
        lines.append(f"> **Se lit** — {phrase}")
        if x:
            lines.append(f"> {txt(x)}")

    note = fb.find(class_="fb-note")
    if note:
        lines.append(">")
        for para in txt(note).split("\n"):
            lines.append(f"> {para}" if para else ">")

    return ["\n".join(lines), "", f"^formule-{FORMULA_N}"]


def provoxy_block(d: Tag) -> list[str]:
    who = d.find(class_="who")
    name = who.find("b").get_text(strip=True)
    ts = who.find(class_="ts")
    ts_txt = ts.get_text(strip=True) if ts else ""
    icon = "🎙️" if name == "Provoxys" else "🛰️"
    head = f"**{icon} {name}**" + (f" · `{ts_txt}`" if ts_txt else "")
    body = []
    for p in d.find_all("p", recursive=False):
        body.append(txt(p))
    return [head, "", *[b for pair in ((b, "") for b in body) for b in pair]]


CLE_N = 0


def moment_block(m: Tag) -> list[str]:
    global CLE_N
    key = "key" in (m.get("class") or [])
    pill = m.find(class_="ts-pill").get_text(strip=True)
    body = m.find(class_="body")
    what = body.find(class_="what")
    if what:
        what.extract()
    paras = [txt(p) for p in body.find_all("p", recursive=False)]
    kind = "[!important]" if key else "[!note]"
    star = " ⭐" if key else ""
    lines = [f"> {kind} {pill}{star}"]
    for p in paras:
        lines.append(f"> {p}")
    if what:
        lines.append(">")
        lines.append(f"> {txt(what)}")
    if key:
        CLE_N += 1
        return ["\n".join(lines), "", f"^cle-{CLE_N}", ""]
    return ["\n".join(lines), ""]


# ───────────────────────────── notes ─────────────────────────────


def render_chapter(sec: Tag, idx: int) -> tuple[str, list[str]]:
    """Retourne (markdown du corps, liste des titres de parties)."""
    out: list[str] = []
    heads: list[str] = []

    for part in sec.find_all("div", class_="part", recursive=False):
        lbl = part.find(class_="part-label").get_text(" ", strip=True)
        h3 = part.find("h3")
        title = txt(h3).replace("\n", " ")
        # titre de section : « Partie 1 — Contexte historique complet. »
        htitle = f"{lbl} — {title}"
        heads.append(htitle)
        out.append(f"## {htitle}")
        out.append("")
        for child in part.find_all(True, recursive=False):
            c = child.get("class") or []
            if "part-label" in c or child.name == "h3":
                continue
            if "provoxy" in c:
                out.extend(provoxy_block(child))
            elif "show-ts" in c:
                out.append(f"*⏱ {child.get_text(' ', strip=True)}*")
                out.append("")
            elif "formula-block" in c:
                out.extend(formula_block(child))
                out.append("")
            else:
                t = txt(child)
                if t:
                    out.append(t)
                    out.append("")
    return "\n".join(out).rstrip(), heads


def render_opening(sec: Tag) -> tuple[str, list[str]]:
    out: list[str] = []
    for child in sec.find_all(True, recursive=False):
        c = child.get("class") or []
        if "chap-head" in c:
            continue
        if "provoxy" in c:
            out.extend(provoxy_block(child))
        elif "show-ts" in c:
            out.append(f"*⏱ {child.get_text(' ', strip=True)}*")
            out.append("")
        elif "formula-block" in c:
            out.extend(formula_block(child))
            out.append("")
        else:
            t = txt(child)
            if t:
                out.append(t)
                out.append("")
    return "\n".join(out).rstrip(), []


def render_sam(sec: Tag) -> tuple[str, list[str]]:
    out: list[str] = []
    heads: list[str] = []
    roman_seen = 0
    for child in sec.find_all(True, recursive=False):
        c = child.get("class") or []
        if "head-num" in c or child.name == "h2":
            continue
        if "intro" in c:
            out.append(txt(child))
            out.append("")
        elif "sim-act" in c:
            roman_seen += 1
            roman = child.find(class_="roman").get_text(strip=True)
            h3 = child.find("h3")
            timing = child.find(class_="timing")
            title = txt(h3).replace("\n", " ")
            htitle = f"Acte {roman} — {title}"
            heads.append(htitle)
            out.append(f"## {htitle}")
            out.append("")
            if timing:
                out.append(f"> [!info] Fenêtre de vol")
                out.append(f"> {timing.get_text(' ', strip=True)}")
                out.append("")
        elif "sim-timeline" in c:
            for m in child.find_all(class_="moment", recursive=False):
                out.extend(moment_block(m))
        elif "formula-block" in c:
            out.extend(formula_block(child))
            out.append("")
        else:
            t = txt(child)
            if t:
                out.append(t)
                out.append("")
    return "\n".join(out).rstrip(), heads


def frontmatter(idx: int, titre: str, chapitre: str, heads_count: int) -> str:
    al = ", ".join(f'"{a}"' for a in ALIASES[idx])
    return "\n".join(
        [
            "---",
            f'aliases: [{al}]',
            "projet: Empire contre Intox",
            "dossier: Dossier III",
            "numero: 3",
            f'titre: "{titre}"',
            f'chapitre: "{chapitre}"',
            f"ordre: {idx}",
            "auteurs: [Provoxys, Samlepirate]",
            f"source: {PAGE}",
            "licence: CC BY-NC-ND 4.0",
            f"importe: {IMPORTE}",
            "tags:",
            "  - empire-contre-intox",
            "  - empire-contre-intox/dossier-3",
            "  - artemis",
            "  - exploration-lunaire",
            "---",
            "",
        ]
    )


def nav(idx: int) -> str:
    bits = [f"[[{MOC}|⌂ Sommaire]]"]
    if idx > 0:
        bits.append(f"[[{NOTES[idx-1]}|← {NOTES[idx-1].split(' — ',1)[1]}]]")
    if idx < len(NOTES) - 1:
        bits.append(f"[[{NOTES[idx+1]}|{NOTES[idx+1].split(' — ',1)[1]} →]]")
    return "---\n\n" + " · ".join(bits) + "\n"


def main() -> None:
    soup = BeautifulSoup(SRC.read_text(encoding="utf-8"), "html.parser")
    OUT.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(exist_ok=True)

    # images : hero + avatars
    for src, dst in [
        (REPO / "provoxys/assets/artemis2-hero.png", "artemis2-hero.png"),
        (REPO / "provoxys/provoxys.jpeg", "avatar-provoxys.jpeg"),
        (REPO / "provoxys/samlepirate.jpeg", "avatar-samlepirate.jpeg"),
    ]:
        if src.exists():
            shutil.copy2(src, ASSETS / dst)

    secs = soup.find_all("section", class_=["chapter", "sam-chapter"])
    assert len(secs) == 9, f"attendu 9 sections, trouvé {len(secs)}"

    index: list[tuple[str, list[str]]] = []

    for idx, sec in enumerate(secs):
        num_el = sec.find(class_="num") or sec.find(class_="head-num")
        chapitre = num_el.get_text(" ", strip=True)
        h2 = sec.find("h2")
        titre = txt(h2).replace("\n", " ")
        titre = re.sub(r" +([,.])", r"\1", titre)
        # frontmatter : titre nu (l'italique de la page reste dans le callout)
        titre_fm = titre.replace("**", "").replace("*", "").rstrip(".")

        if idx == 0:
            body, heads = render_opening(sec)
        elif sec.get("class") == ["sam-chapter"]:
            body, heads = render_sam(sec)
        else:
            body, heads = render_chapter(sec, idx)

        name = NOTES[idx]
        h1 = name.split(" — ", 1)[1]
        doc = [
            frontmatter(idx, titre_fm, chapitre, len(heads)),
            f"# {h1}",
            "",
            f"> [!quote] {chapitre}",
            f"> {titre}",
            "",
            body,
            "",
            nav(idx),
        ]
        (OUT / f"{safe(name)}.md").write_text("\n".join(doc), encoding="utf-8")
        index.append((name, heads))
        print(f"✓ {name}.md   ({len(heads)} sections, {len(body.split())} mots)")

    print(f"\n{FORMULA_N} blocs de formule → ^formule-1..{FORMULA_N}")
    # mémo pour les scripts suivants
    (Path("/private/tmp/claude-501/-Users-olivierveinand-Documents-DEV-empire-contre-intox/48033732-fb9f-4e70-84c7-fb0018ea55c5/scratchpad") / "_index.txt").write_text(
        "\n".join(f"{n}\t" + "\t".join(h) for n, h in index), encoding="utf-8"
    )


if __name__ == "__main__":
    main()
