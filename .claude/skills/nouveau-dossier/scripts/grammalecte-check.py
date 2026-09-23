#!/usr/bin/env python3
"""
grammalecte-check.py — orthographe et grammaire (Grammalecte, français) sur un
transcript .txt OU une page .html de dossier. Ne modifie rien : produit un rapport
que l'agent `tri-grammalecte` examine ensuite (vraies fautes / faux positifs).

Usage (depuis la racine du dépôt) :
    python3 .claude/skills/nouveau-dossier/scripts/grammalecte-check.py <fichier.txt|page.html> [options]

Options :
    --out DIR     dossier de sortie (défaut : a_traiter/grammalecte/<dossier>-<nom>/)
    --all         garder aussi la typographie (apostrophes, espaces insécables, unités…)
    --sugg        calculer les suggestions orthographiques des mots inconnus (lent)

Sorties (dans DIR) :
    rapport.md    lisible : bilan, alertes de grammaire (ligne, extrait, contexte, message,
                  suggestions), mots inconnus groupés par fréquence
    alertes.json  tout, pour les scripts et l'agent
    texte.txt     le texte tel qu'analysé (contrôle de l'extraction)

Ce qui est exclu :
    - par défaut, les catégories purement typographiques (apos, nbsp, esp, typo, unit,
      espaces des grands nombres) : la page a ses propres conventions (entités &nbsp;,
      apostrophes droites) ;
    - les mots de reference/grammalecte-ignore.txt (noms propres, latin, jargon du site) ;
    - les extraits listés dans « ## Faux positifs » du grammalecte.md du dossier ;
    - en HTML : head, script, style, code, pre, template, noscript, éléments masqués,
      attributs (alt, title, data-tex). Le texte injecté par JavaScript (ateliers) n'est
      pas vu : c'est du HTML statique.
"""
import collections
import datetime
import hashlib
import json
import os
import re
import sys
import zipfile
from html.parser import HTMLParser
from pathlib import Path

VERSION = "2.3.0"
SHA256 = "aaa4219704857778038ecc1db18f6a907994c0125b8e762dcecc69130280684f"
HERE = Path(__file__).resolve().parent
SKILL = HERE.parent
ZIP = SKILL / "tools" / f"Grammalecte-fr-v{VERSION}.zip"
CACHE = Path.home() / ".cache" / "eci-grammalecte" / VERSION
IGNORE_FILE = SKILL / "reference" / "grammalecte-ignore.txt"
TYPO_CATEGORIES = {"apos", "nbsp", "esp", "typo", "unit"}
TYPO_RULES = {"num_grand_nombre_avec_espaces"}  # typographie classée « notype »


def ensure_engine():
    if not (CACHE / "grammalecte" / "__init__.py").exists():
        if not ZIP.exists():
            sys.exit(f"archive absente : {ZIP}")
        h = hashlib.sha256(ZIP.read_bytes()).hexdigest()
        if h != SHA256:
            sys.exit(f"empreinte de l'archive inattendue : {h}")
        CACHE.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(ZIP) as z:
            z.extractall(CACHE)
        print(f"Grammalecte {VERSION} décompressé dans {CACHE}", file=sys.stderr)
    sys.path.insert(0, str(CACHE))


class Extract(HTMLParser):
    """Texte visible d'une page, bloc par bloc, avec la ligne HTML de chaque caractère."""
    boundaries = set("address article aside blockquote br button dd div dl dt fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hr li main nav ol p pre section table tbody td th thead tr ul summary details".split())
    excluded = set("head script style code pre template noscript svg".split())
    void = set("area base br col embed hr img input link meta param source track wbr".split())

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.chars, self.lines, self.blocks = [], [], [], []

    def flush(self):
        if not self.chars:
            return
        s = "".join(self.chars)
        a, b = len(s) - len(s.lstrip()), len(s.rstrip())
        if b > a:
            self.blocks.append({"text": s[a:b], "lines": self.lines[a:b]})
        self.chars, self.lines = [], []

    def handle_starttag(self, tag, attrs):
        if tag in self.boundaries:
            self.flush()
        attrs = dict(attrs)
        skip = any(x[1] for x in self.stack) or tag in self.excluded or "hidden" in attrs \
            or bool(re.search(r"(display\s*:\s*none|visibility\s*:\s*hidden)", attrs.get("style", ""), re.I)) \
            or attrs.get("aria-hidden") == "true"
        if tag not in self.void:
            self.stack.append((tag, skip))

    def handle_endtag(self, tag):
        if tag in self.boundaries:
            self.flush()
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                self.stack = self.stack[:i]
                break

    def handle_data(self, data):
        if any(x[1] for x in self.stack):
            return
        line = self.getpos()[0]
        for c in data:
            if c in " \t\r\n\f":
                if self.chars and self.chars[-1] != " ":
                    self.chars.append(" "); self.lines.append(line)
            else:
                self.chars.append(c); self.lines.append(line)
            if c == "\n":
                line += 1


def blocks_from_txt(path):
    out = []
    for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        t = re.sub(r"\s+", " ", line).strip(" \t•◦*")
        if len(t) >= 2:
            out.append({"text": t, "lines": [n] * len(t)})
    return out


def blocks_from_html(path):
    x = Extract()
    x.feed(path.read_text(encoding="utf-8"))
    x.flush()
    return x.blocks


def load_ignore():
    words = set()
    if IGNORE_FILE.exists():
        for l in IGNORE_FILE.read_text(encoding="utf-8").splitlines():
            l = l.split("#")[0].strip()
            if l:
                words.add(l)
    return words


def load_false_positives(md):
    """Extraits de la table « ## Faux positifs » d'un grammalecte.md."""
    frags = set()
    if not md or not md.exists():
        return frags
    active = False
    lines = md.read_text(encoding="utf-8").splitlines()
    for i, line in enumerate(lines):
        if line.startswith("## "):
            active = "faux positifs" in line.lower()
            continue
        if active and line.strip().startswith("|"):
            nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
            if re.match(r"^\|\s*:?-{2,}", nxt):
                continue  # en-tête
            cells = [c.strip().strip("`").strip() for c in line.strip().strip("|").split("|")]
            if cells and cells[0] and not set(cells[0]) <= set("-: "):
                frags.add(cells[0].replace("\u00a0", " "))  # espaces insécables normalisées
    return frags


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]
    if not args:
        print(__doc__); sys.exit(2)
    src = Path(args[0])
    if not src.is_file():
        sys.exit(f"fichier introuvable : {src}")
    out = None
    if "--out" in sys.argv:
        out = Path(sys.argv[sys.argv.index("--out") + 1])
    if out is None:
        out = Path("a_traiter") / "grammalecte" / f"{src.parent.name}-{src.stem}"
    out.mkdir(parents=True, exist_ok=True)
    keep_typo = "--all" in flags
    sugg = "--sugg" in flags

    ensure_engine()
    from grammalecte.grammar_checker import GrammarChecker  # noqa: E402

    is_html = src.suffix.lower() in (".html", ".htm")
    blocks = blocks_from_html(src) if is_html else blocks_from_txt(src)
    ignore = load_ignore()
    fp = load_false_positives(src.parent / "grammalecte.md")
    (out / "texte.txt").write_text("\n\n".join(b["text"] for b in blocks), encoding="utf-8")

    g = GrammarChecker("fr")
    grammar, unknown = [], collections.defaultdict(list)
    excluded = collections.Counter()
    for i, b in enumerate(blocks):
        if i % 200 == 0:
            print(f"  analyse {i}/{len(blocks)} blocs…", file=sys.stderr, flush=True)
        ge, se = g.getParagraphErrors(b["text"], bSpellSugg=sugg)
        lines = b["lines"]
        for e in ge:
            cat = e.get("sType", "")
            frag = b["text"][e["nStart"]:e["nEnd"]]
            if (cat in TYPO_CATEGORIES or e.get("sRuleId", "") in TYPO_RULES) and not keep_typo:
                excluded[cat if cat in TYPO_CATEGORIES else e.get("sRuleId", "")] += 1; continue
            ctx = b["text"][max(0, e["nStart"] - 80):e["nEnd"] + 80].replace("\u00a0", " ")
            nfrag = frag.replace("\u00a0", " ")
            if nfrag in fp or any(nfrag in x and x in ctx for x in fp):
                excluded["faux-positif-consigné"] += 1; continue  # extrait exact, ou extrait consigné englobant le fragment
            grammar.append({
                "line": lines[min(e["nStart"], len(lines) - 1)], "category": cat, "rule": e.get("sRuleId", ""),
                "fragment": frag, "context": b["text"][max(0, e["nStart"] - 60):e["nEnd"] + 60],
                "message": e.get("sMessage", ""), "suggestions": e.get("aSuggestions", []),
            })
        for e in se:
            w = e.get("sValue", "")
            if w in ignore or w.replace("\u00a0", " ") in fp or re.fullmatch(r"[\d\W_]+", w):
                excluded["mot-accepté"] += 1; continue
            unknown[w].append({"line": lines[min(e["nStart"], len(lines) - 1)], "sugg": e.get("aSuggestions", [])})
    grammar.sort(key=lambda r: r["line"])
    unk = sorted(unknown.items(), key=lambda kv: (-len(kv[1]), kv[0]))
    words = sum(len(b["text"].split()) for b in blocks)
    summary = {
        "source": str(src), "kind": "html" if is_html else "txt", "date": datetime.date.today().isoformat(),
        "grammalecte": VERSION, "blocks": len(blocks), "words": words,
        "grammar_alerts": len(grammar), "unknown_words": len(unk), "unknown_occurrences": sum(len(v) for v in unk),
        "excluded": dict(excluded), "categories": dict(collections.Counter(r["category"] for r in grammar)),
    }
    (out / "alertes.json").write_text(json.dumps({"summary": summary, "grammar": grammar, "unknown": [{"word": w, "count": len(v), "lines": [o["line"] for o in v], "suggestions": v[0]["sugg"]} for w, v in unk]}, ensure_ascii=False, indent=1), encoding="utf-8")

    def cell(s):
        return str(s).replace("|", "\\|").replace("\n", " ")
    L = [f"# Grammalecte — {src}", "",
         f"Passe du {summary['date']} · Grammalecte {VERSION} · {words} mots · {len(blocks)} blocs · "
         f"**{len(grammar)} alertes de grammaire** · **{len(unk)} mots inconnus** ({summary['unknown_occurrences']} occurrences) · "
         f"exclu : {', '.join(f'{k} {v}' for k, v in sorted(excluded.items())) or 'rien'}", "",
         "Ce rapport ne décide rien : l'agent `tri-grammalecte` sépare les vraies fautes des faux positifs et consigne le résultat dans `grammalecte.md` (dossier de la page). "
         + ("Texte injecté par JavaScript et attributs non analysés." if is_html else "Transcript brut : le langage oral produit des alertes légitimes à garder."), "",
         "## Alertes de grammaire", "",
         "| # | Ligne | Catégorie | Extrait | Contexte | Message | Suggestions |", "|---|---|---|---|---|---|---|"]
    for n, r in enumerate(grammar, 1):
        L.append(f"| {n} | {r['line']} | {r['category']} | {cell(r['fragment'])} | …{cell(r['context'])}… | {cell(r['message'])} | {cell(', '.join(r['suggestions']))} |")
    L += ["", "## Mots inconnus (par fréquence)", "",
          "Noms propres, latin, jargon : à verser dans `reference/grammalecte-ignore.txt` (projet) ou « Faux positifs » (dossier). Une vraie faute d'orthographe se repère ici (ex. « féminisce »).", "",
          "| Mot | Occurrences | Lignes | Suggestions |", "|---|---|---|---|"]
    for w, v in unk:
        L.append(f"| {cell(w)} | {len(v)} | {', '.join(str(o['line']) for o in v[:6])}{'…' if len(v) > 6 else ''} | {cell(', '.join(v[0]['sugg']))} |")
    (out / "rapport.md").write_text("\n".join(L) + "\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=1))
    print(f"\nRapport : {out / 'rapport.md'}\nDonnées : {out / 'alertes.json'}")


if __name__ == "__main__":
    main()
