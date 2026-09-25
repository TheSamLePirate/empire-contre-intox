# -*- coding: utf-8 -*-
"""Formules inline survolables : chaque symbole d'un <span class="imath"> reçoit sa définition.

Le sens d'une lettre dépend du contexte (c = célérité du son, sauf en cosmologie ; T = période,
température ou tension…). On résout donc chaque symbole par couches, de la plus proche à la plus large :
  1. le dictionnaire explicite de la clé de physique qui contient la formule (complements/symboles-inline.md) ;
  2. les symboles des blocs de formule de cette clé ;
  3. le dictionnaire explicite du chapitre (section) ;
  4. les symboles des blocs de formule du chapitre, hors clés, puis ceux des clés du chapitre ;
     (3 et 4 ne s'appliquent pas à une formule située dans une clé : une clé est autonome)
  5. le dictionnaire explicite global (contexte « * »).
Une formule inline située DANS un bloc de formule (glose « Se lit », explication) prend d'abord les
symboles de son bloc. Les fiches de la rangée « Les symboles » ne sont pas annotées.

Sortie : le TeX de chaque imath est réécrit avec \\htmlData{sym=gN}{…} (gN = identifiant global), et une
table unique <script type="application/json" id="symtab"> porte les fiches {id: [tex, nom, unité, remarque]}.

Format des dictionnaires : lignes `contexte | tex | définition | unité | remarque`,
contexte = identifiant de section (« physique »), de clé (« cle-f05 ») ou « * » (tout le dossier).
Surcharge pour UNE formule : contexte « section@formule » (ex. « maths@f(x - ct) + g(x + ct) »), prioritaire.
Les lignes commençant par # et les lignes vides sont ignorées.
"""
import html as _html
import json
import re
from html.parser import HTMLParser
from pathlib import Path

import fsym

# Fichiers de dictionnaire (lignes « contexte | tex | définition | unité | remarque ») : fournis par l'appelant.
DICT_FILES = []
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr", "param"}


def load_dict():
    d = {}
    lines = []
    for f in DICT_FILES:
        lines += Path(f).read_text(encoding="utf-8").splitlines()
    for line in lines:
        s = line.strip()
        if not s or s.startswith("#") or s.startswith("|--"): continue
        # « \\| » = barre verticale littérale (valeur absolue dans une formule), pas un séparateur
        parts = [p.strip().replace("\x00", "|") for p in s.replace("\\|", "\x00").strip("|").split("|")]
        if len(parts) < 3: continue
        ctx, tex, n = parts[0], parts[1], parts[2]
        u = parts[3] if len(parts) > 3 else ""
        v = parts[4] if len(parts) > 4 else ""
        d.setdefault(ctx, []).append((tex, n, u, v))
    return d


class _Scan(HTMLParser):
    """Relève les imath (position de l'attribut data-tex) et les blocs de formule avec leur contexte."""
    def __init__(self, src):
        super().__init__(convert_charrefs=False)
        self.src = src
        self.lines = [0]
        for m in re.finditer("\n", src): self.lines.append(m.end())
        self.stack = []            # (tag, classes, id, attrs)
        self.imaths = []           # dict(pos, end, tex, ctx)
        self.blocks = []           # dict(syms, ctx)

    def _off(self):
        l, c = self.getpos(); return self.lines[l - 1] + c

    def _ctx(self):
        cle = chap = block = None; in_legend = False
        for tag, cls, id_, attrs in reversed(self.stack):
            if block is None and "formula-block" in cls: block = attrs
            if "fb-syms" in cls or "fs-tip" in cls: in_legend = True
            if cle is None and tag == "aside" and "cle" in cls and id_: cle = id_
            if chap is None and tag == "section" and id_: chap = id_
        return {"cle": cle, "chap": chap, "block": block, "legend": in_legend}

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = (a.get("class") or "").split()
        if tag == "span" and "imath" in cls and a.get("data-tex") is not None:
            off = self._off()
            raw = self.get_starttag_text()
            m = re.search(r'data-tex="([^"]*)"', raw)
            if m:
                self.imaths.append({"pos": off + m.start(1), "end": off + m.end(1), "tex": _html.unescape(m.group(1)), "ctx": self._ctx()})
        if "formula-block" in cls and a.get("data-syms"):
            try:
                syms = json.loads(_html.unescape(a["data-syms"]))
            except Exception:
                syms = []
            ctx = self._ctx(); a["_syms"] = syms
            self.blocks.append({"syms": syms, "ctx": ctx})
        if tag not in VOID:
            self.stack.append((tag, cls, a.get("id"), a))

    def handle_startendtag(self, tag, attrs):
        pass

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]; break


def process(page, fmt, report=None, dict_files=None, extra=None):
    """fmt(texte) -> HTML (Markdown léger et $…$) pour les champs des fiches.
    dict_files : fichiers de dictionnaire ; extra : dictionnaire déjà lu {contexte: [(tex, n, u, v)…]}."""
    global DICT_FILES
    if dict_files is not None: DICT_FILES = list(dict_files)
    sc = _Scan(page); sc.feed(page); sc.close()
    explicit = load_dict()
    for k, v in (extra or {}).items(): explicit.setdefault(k, []).extend(v)
    # dictionnaires des blocs, par clé et par chapitre
    by_cle, by_chap_direct, by_chap_cles = {}, {}, {}
    for b in sc.blocks:
        c = b["ctx"]
        syms = [tuple(x) for x in b["syms"]]
        if c["cle"]:
            by_cle.setdefault(c["cle"], []).extend(syms)
            if c["chap"]: by_chap_cles.setdefault(c["chap"], []).extend(syms)
        elif c["chap"]:
            by_chap_direct.setdefault(c["chap"], []).extend(syms)
    table, ids = {}, {}                                   # fiche -> id global

    def gid(sy):
        key = json.dumps(sy, ensure_ascii=False)
        if key not in ids:
            ids[key] = len(ids); table[ids[key]] = sy
        return ids[key]

    def ntex(t):
        return " ".join(fsym.canon(fsym.tokens(t)))
    # surcharges par formule précise : contexte « section@formule » (formule écrite telle qu'en source)
    over = {}
    for key, entries in explicit.items():
        if "@" in key:
            c0, _, f0 = key.partition("@")
            over[(c0.strip(), ntex(f0))] = entries

    def layers(ctx, tex=None):
        L = []
        if tex is not None:
            k = ntex(tex)
            for c0 in (ctx["cle"], ctx["chap"], "*"):
                if c0 and (c0, k) in over: L.append(over[(c0, k)])
        if ctx["block"] is not None: L.append([tuple(x) for x in ctx["block"].get("_syms", [])])
        if ctx["cle"]:
            L.append(explicit.get(ctx["cle"], [])); L.append(by_cle.get(ctx["cle"], []))
        # une clé de physique est autonome (ses notations peuvent différer du chapitre) : pas d'héritage du chapitre
        if ctx["chap"] and not ctx["cle"]:
            L.append(explicit.get(ctx["chap"], [])); L.append(by_chap_direct.get(ctx["chap"], [])); L.append(by_chap_cles.get(ctx["chap"], []))
        L.append(explicit.get("*", []))
        # fusion : pour un même TeX (forme canonique), la couche la plus proche l'emporte
        seen, out = set(), []
        for layer in L:
            for sy in layer:
                k = " ".join(fsym.canon(fsym.tokens(sy[0])))
                if k in seen: continue
                seen.add(k); out.append(sy)
        return out

    edits, missing, review = [], {}, {}
    for im in sc.imaths:
        c = im["ctx"]
        if c["legend"]: continue
        cand = layers(c, im["tex"])
        tex_a, _miss, unc = fsym.annotate(im["tex"], cand)
        # renumérotation locale -> identifiants globaux
        def re_id(m):
            k = int(m.group(1)); return r"\htmlData{sym=g%d}{" % gid(tuple(cand[k]))
        tex_g = re.sub(r"\\htmlData\{sym=(\d+)\}\{", re_id, tex_a)
        if unc:
            where = c["cle"] or c["chap"] or "?"
            for u in unc:
                missing.setdefault((where, u), []).append(im["tex"])
        if "\\htmlData" in tex_g:
            edits.append((im["pos"], im["end"], _html.escape(tex_g, quote=True)))
            used = sorted({int(x) for x in re.findall(r"\\htmlData\{sym=(\d+)\}", tex_a)})
            review.setdefault((c["cle"] or c["chap"] or "?", im["tex"]), [cand[k][:2] for k in used])
    # application des remplacements (de la fin vers le début)
    for a, b, rep in sorted(edits, reverse=True):
        page = page[:a] + rep + page[b:]
    def card(sy):
        t, n = sy[0], sy[1]; u = sy[2] if len(sy) > 2 else ""; v = sy[3] if len(sy) > 3 else ""
        return [t, fmt(n), fmt(u) if u else "", fmt(v) if v else ""]
    blob = json.dumps({"g%d" % k: card(v) for k, v in table.items()}, ensure_ascii=False).replace("</", "<\\/")
    page = page.replace("</body>", f'<script type="application/json" id="symtab">{blob}</script>\n</body>', 1)
    if report is not None:
        report["imaths"] = sum(1 for im in sc.imaths if not im["ctx"]["legend"])
        report["annotated"] = len(edits)
        report["missing"] = missing
        report["symtab"] = len(table)
        report["review"] = review
    return page
