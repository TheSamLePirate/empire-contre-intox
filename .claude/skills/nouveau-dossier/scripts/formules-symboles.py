#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""formules-symboles.py — rend les formules d'une page de dossier SURVOLABLES (composant commun ECI).

Chaque symbole d'une formule affiche au survol / toucher / clavier sa définition, son unité et un ordre de
grandeur ; chaque bloc .formula-block reçoit « Ce qu'elle dit » (l'explication) et la rangée « Les symboles ».
Les formules du texte (.imath) sont annotées aussi, le sens de chaque symbole étant pris dans son contexte
(bloc → clé/section → dictionnaire du dossier). Référence : reference/formules-symboles.md.

Usage (depuis la racine du dépôt) :
    python3 .claude/skills/nouveau-dossier/scripts/formules-symboles.py <page.html> --init
        → écrit un squelette <dossier>/symboles.md (un § par bloc : TeX, note existante, lettres à définir) ;
          pour une page compagnon <nom>.html : <dossier>/symboles-<nom>.md
    python3 .claude/skills/nouveau-dossier/scripts/formules-symboles.py <page.html> [--symboles F] [--check]
        → annote la page EN PLACE (idempotent : une nouvelle passe repart du TeX d'origine), ajoute
          assets/eci-formules.css et .js, et écrit les rapports dans a_traiter/formules/<page>/ :
          blocs-incomplets.tsv, inline-manquants.tsv, inline-relecture.tsv.
          --check : n'écrit rien, sort en 1 si un bloc ou une formule du texte est incomplet.
    python3 ... <page.html> --retirer   → enlève toute annotation (retour à la page d'origine)

Format de <dossier>/symboles.md (versionné, NON publié, comme coquilles.md) :
    ## Bloc : <titre exact de .fb-head, sans l'étiquette>      (« #2 » à la fin pour le 2e bloc de même titre)
    dit: ce que dit la formule (2 à 4 phrases ; facultatif si le bloc a déjà une .fb-note)
    symbole: \\rho_0 | masse volumique de l'air au repos | kilogramme par mètre cube (kg/m³) | ≈ 1,2 kg/m³ à 20 °C
    ## Texte
    contexte | tex | définition | unité | remarque          (contexte = id de section, « * », ou « section@formule »)
    (« \\| » = barre verticale littérale dans un champ)
"""
import html
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE / "formules"))
import fsym          # noqa: E402
import inline_syms   # noqa: E402
import blocs         # noqa: E402

ROOT = HERE.parents[3]


# ------------------------------------------------------------------ outils HTML
def block_spans(page):
    """(début, fin) de chaque <div class="formula-block"…>…</div>, avec comptage des <div>."""
    out = []
    for m in re.finditer(r'<div\s+class="formula-block"[^>]*>', page):
        i, d = m.end(), 1
        for t in re.finditer(r"<div\b|</div>", page[i:]):
            d += 1 if t.group(0) == "<div" else -1
            if d == 0:
                out.append((m.start(), i + t.end())); break
    return out


def text_of(fragment):
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", fragment)).split())


def head_title(block):
    m = re.search(r'<div class="fb-head">(.*?)</div>', block, re.S)
    if not m: return ""
    h = re.sub(r'<span class="fb-tag">.*?</span>', "", m.group(1), flags=re.S)
    return text_of(h)


def norm_title(t):
    return " ".join(t.replace("’", "'").lower().split())


# ------------------------------------------------------------------ retrait d'une passe précédente
def restore(page):
    page = re.sub(r'<div class="fb-(?:dit|syms)" data-fsym-gen>.*?</div>', "", page, flags=re.S)
    page = re.sub(r'<div class="fb-dit" data-fsym-wrap><p class="fb-k">Ce qu’elle dit</p>(<p class="fb-note">.*?</p>)</div>', r"\1", page, flags=re.S)
    page = re.sub(r'\s*<script type="application/json" id="symtab">.*?</script>', "", page, flags=re.S)
    page = re.sub(r'(<div class="formula-block")(?: data-fsym)?(?: data-syms="[^"]*")?', r"\1", page)

    def back(m):
        tag = m.group(0)
        src = re.search(r' data-tex-src="([^"]*)"', tag)
        if not src: return tag
        tag = tag.replace(src.group(0), "")
        return re.sub(r'data-tex="[^"]*"', lambda _: f'data-tex="{src.group(1)}"', tag, count=1)
    return re.sub(r'<(?:[^>"]|"[^"]*")*?data-tex-src="[^"]*"(?:[^>"]|"[^"]*")*>', back, page)


def keep_src(page):
    """Mémorise le TeX d'origine de chaque élément (data-tex-src) avant annotation."""
    def add(m):
        tag = m.group(0)
        if "data-tex-src=" in tag: return tag
        v = re.search(r'data-tex="([^"]*)"', tag)
        return tag[:-1] + f' data-tex-src="{v.group(1)}">' if v else tag
    return re.sub(r'<(?:span|div)\b(?:[^>"]|"[^"]*")*?\bdata-tex="[^"]*"(?:[^>"]|"[^"]*")*>', add, page)


# ------------------------------------------------------------------ fichier de symboles
def read_symbols(path):
    blocks, text_lines, cur = {}, [], None
    if not path.exists():
        return blocks, text_lines
    for line in path.read_text(encoding="utf-8").splitlines():
        s = line.strip()
        m = re.match(r"^##\s+Bloc\s*:\s*(.+?)\s*$", s)
        if m:
            cur = {"dit": "", "syms": []}; blocks[norm_title(m.group(1))] = cur; continue
        if re.match(r"^##\s+Texte\b", s):
            cur = "texte"; continue
        if s.startswith("#") or not s:
            continue
        if cur == "texte":
            text_lines.append(line); continue
        if isinstance(cur, dict):
            k, _, v = s.partition(":")
            k = k.strip().lower()
            if k == "dit": cur["dit"] = v.strip()
            elif k in ("symbole", "sym"):
                parts = [p.strip().replace("\x00", "|") for p in v.replace("\\|", "\x00").split("|")]
                if len(parts) > 1 and parts[1]:
                    cur["syms"].append(tuple(parts))
                elif parts[0]:
                    cur.setdefault("todo", []).append(parts[0])   # ligne du squelette pas encore remplie
    return blocks, text_lines


def text_dict(lines):
    d = {}
    for line in lines:
        parts = [p.strip().replace("\x00", "|") for p in line.replace("\\|", "\x00").strip().strip("|").split("|")]
        if len(parts) >= 3:
            d.setdefault(parts[0], []).append((parts[1], parts[2], parts[3] if len(parts) > 3 else "", parts[4] if len(parts) > 4 else ""))
    return d


# ------------------------------------------------------------------ passes
def assets(page, page_path):
    depth = len(page_path.resolve().relative_to(ROOT).parts) - 1
    pre = "../" * depth
    if "eci-formules.css" not in page:
        page = page.replace("</head>", f'<link rel="stylesheet" href="{pre}assets/eci-formules.css">\n</head>', 1)
    if "eci-formules.js" not in page:
        page = page.replace("</body>", f'<script src="{pre}assets/eci-formules.js" defer></script>\n</body>', 1)
    return page


def annotate_blocks(page, symbols, report):
    spans = block_spans(page)
    counts, order = {}, []
    for a, b in spans:
        key = norm_title(head_title(page[a:b]))
        counts[key] = counts.get(key, 0) + 1
        order.append(key if counts[key] == 1 else f"{key} #{counts[key]}")
    for (a, b), key in reversed(list(zip(spans, order))):
        block = page[a:b]
        entry = symbols.get(key) or {"dit": "", "syms": [], "todo": []}
        syms = entry["syms"]
        fm = re.search(r'(<div class="formula"[^>]*?\bdata-tex=")([^"]*)(")', block)
        miss, unc = [], []
        if fm:
            tex = html.unescape(fm.group(2))
            tex_a, miss, unc = fsym.annotate(tex, syms)
            if not syms: unc = unc or ["(aucun symbole défini)"]
            unc = sorted(set(unc) | set(entry.get("todo", [])))
            block = block[:fm.start(2)] + html.escape(tex_a, quote=True) + block[fm.end(2):]
        has_note = 'class="fb-note"' in block
        if entry["dit"]:
            ins = blocs.dit_html(blocs.md_inline(entry["dit"]))
            say = re.search(r'<p class="fb-say">.*?</p>', block, re.S)
            pos = say.end() if say else block.rfind("</div>")
            block = block[:pos] + ins + block[pos:]
        elif has_note:
            block = re.sub(r'(<p class="fb-note">.*?</p>)', r'<div class="fb-dit" data-fsym-wrap><p class="fb-k">Ce qu’elle dit</p>\1</div>', block, count=1, flags=re.S)
        block = block[:block.rfind("</div>")] + blocs.legend_html(syms) + "</div>"
        block = block.replace('<div class="formula-block"', f'<div class="formula-block" data-fsym data-syms="{blocs.syms_attr(syms)}"', 1)
        page = page[:a] + block + page[b:]
        report.append((key, miss, unc, not entry["dit"] and not has_note))
    return page


def skeleton(page, path):
    out = [f"# Symboles des formules — {path.parent.name}", "",
           "Format et règles : .claude/skills/nouveau-dossier/reference/formules-symboles.md", ""]
    counts = {}
    for a, b in block_spans(page):
        block = page[a:b]
        key = head_title(block)
        n = counts[norm_title(key)] = counts.get(norm_title(key), 0) + 1
        fm = re.search(r'<div class="formula"[^>]*?\bdata-tex="([^"]*)"', block)
        tex = html.unescape(fm.group(1)) if fm else ""
        note = re.search(r'<p class="fb-note">(.*?)</p>', block, re.S)
        _, _, unc = fsym.annotate(tex, [])
        out += [f"## Bloc : {key}" + (f" #{n}" if n > 1 else ""), f"# TeX : {tex}"]
        if note: out.append(f"# note existante (sert d'explication si pas de « dit: ») : {text_of(note.group(1))[:200]}")
        out.append("dit: ")
        out += [f"symbole: {u} |  |  | " for u in unc]
        out.append("")
    out += ["## Texte", "# contexte | tex | définition | unité | remarque   (lancer une passe pour obtenir inline-manquants.tsv)", ""]
    return "\n".join(out)


def main():
    args = sys.argv[1:]
    if not args or args[0].startswith("-"):
        print(__doc__); sys.exit(2)
    page_path = Path(args[0]).resolve()
    # une page compagnon (portraits.html…) a son propre fichier : symboles-portraits.md
    own = "symboles.md" if page_path.stem == "index" else f"symboles-{page_path.stem}.md"
    sym_path = Path(args[args.index("--symboles") + 1]).resolve() if "--symboles" in args else page_path.parent / own
    page = restore(page_path.read_text(encoding="utf-8"))
    if "--retirer" in args:
        page = re.sub(r'<link rel="stylesheet" href="[./]*assets/eci-formules\.css(?:\?v=\w+)?">\n?', "", page)
        page = re.sub(r'<script src="[./]*assets/eci-formules\.js(?:\?v=\w+)?" defer></script>\n?', "", page)
        page_path.write_text(page, encoding="utf-8"); print("annotations retirées :", page_path.relative_to(ROOT)); return
    if "--init" in args:
        if sym_path.exists():
            print("existe déjà :", sym_path.relative_to(ROOT)); sys.exit(1)
        sym_path.write_text(skeleton(page, page_path), encoding="utf-8"); print("squelette écrit :", sym_path.relative_to(ROOT)); return
    symbols, tlines = read_symbols(sym_path)
    page = keep_src(page)
    rep = []
    page = assets(page, page_path)           # avant la table #symtab : ordre stable d'une passe à l'autre
    page = annotate_blocks(page, symbols, rep)
    irep = {}
    page = inline_syms.process(page, blocs.md_inline, irep, dict_files=[], extra=text_dict(tlines))
    bad = [r for r in rep if r[1] or r[2] or r[3]]
    miss = irep.get("missing", {})
    print(f"blocs : {len(rep)} · complets {len(rep) - len(bad)} / {len(rep)}")
    print(f"formules du texte : {irep.get('imaths')} · annotées {irep.get('annotated')} · symboles sans définition {len(miss)} (contexte × symbole)")
    for key, m, u, nd in bad[:40]:
        print(f"  · {key[:60]} :" + (f" introuvables {m}" if m else "") + (f" sans définition {u}" if u else "") + (" · pas d'explication" if nd else ""))
    if "--check" in args:
        sys.exit(1 if bad or miss else 0)
    page_path.write_text(page, encoding="utf-8")
    rdir = ROOT / "a_traiter" / "formules" / (page_path.parent.name + ("" if page_path.stem == "index" else "-" + page_path.stem))
    rdir.mkdir(parents=True, exist_ok=True)
    import csv
    with open(rdir / "blocs-incomplets.tsv", "w", encoding="utf-8", newline="") as fh:
        w = csv.writer(fh, delimiter="\t"); w.writerow(["bloc", "introuvables", "sans définition", "explication manquante"])
        for key, m, u, nd in bad: w.writerow([key, " ".join(m), " ".join(u), "oui" if nd else ""])
    with open(rdir / "inline-manquants.tsv", "w", encoding="utf-8", newline="") as fh:
        w = csv.writer(fh, delimiter="\t"); w.writerow(["contexte", "symbole", "occurrences", "exemples de formules"])
        for (where, s), texs in sorted(miss.items(), key=lambda kv: (kv[0][0], -len(kv[1]))):
            w.writerow([where, s, len(texs), " ; ".join(sorted(set(texs))[:4])])
    with open(rdir / "inline-relecture.tsv", "w", encoding="utf-8", newline="") as fh:
        w = csv.writer(fh, delimiter="\t"); w.writerow(["contexte", "formule", "symboles attribués (tex = définition)"])
        for (where, tex), syms in sorted(irep.get("review", {}).items()):
            w.writerow([where, tex, " ; ".join(f"{t} = {n}" for t, n in syms)])
    print(f"page annotée : {page_path.relative_to(ROOT)} · rapports : {rdir.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
