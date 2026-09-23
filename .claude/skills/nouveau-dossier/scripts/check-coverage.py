#!/usr/bin/env python3
"""
check-coverage.py — vérifie que 100 % d'un (ou plusieurs) transcript(s) est
présent, mot pour mot, dans une page HTML de dossier.

C'est LE contrôle obligatoire du process « nouveau-dossier » : la transcription
doit rester intégrale. Le script normalise les deux côtés (accents, guillemets
« » vs " ", apostrophes typographiques, espaces, ponctuation) puis découpe le
transcript en segments de phrase et vérifie que chacun est un sous-ensemble du
texte rendu de la page.

Usage :
    python3 check-coverage.py <page.html> <transcript1.txt> [transcript2.txt ...] [--coquilles <fichier.md>]

Coquilles : si `<dossier de la page>/coquilles.md` et/ou `grammalecte.md` existent
(ou si `--coquilles` est donné), leurs corrections « transcript → page » sont
APPLIQUÉES au transcript avant la comparaison. Une coquille corrigée dans la page et consignée dans coquilles.md ne
compte donc plus comme manquante ; une coquille corrigée mais NON consignée reste
un manquant — c'est voulu, coquilles.md est la seule trace autorisée (la page ne
mentionne jamais la correction). Format attendu : un tableau Markdown dont les deux
premières colonnes de contenu sont « Transcript (verbatim) » et « Page (corrigé) »
(une colonne numéro en tête est tolérée).

Sortie :
    - liste des segments MANQUANTS (avec un extrait), par fichier.
    - code retour 0 si tout est couvert, 1 sinon.

Les « manquants » typiques et leur traitement :
    - différence de guillemets/apostrophe/espace  → faux positif, le contenu EST là.
      (le script normalise déjà la plupart ; s'il en reste, vérifier à l'œil.)
    - préfixe de numérotation ("1.", "2-", "A-") que vous avez retiré d'un titre
      → RESTAURER le préfixe verbatim dans le HTML.
    - titre de section / document éditorialisé → réintroduire le libellé exact.
    - coquille évidente corrigée (ex. "ajoter"→"ajouter", "votreADN"→"votre ADN")
      → ACCEPTABLE, à consigner dans coquilles.md (jamais dans la page) ; une fois
      consignée, elle n'apparaît plus ici.
"""
import os
import re
import sys
import unicodedata


def norm(s: str) -> str:
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn").lower()
    for a, b in [
        ("’", "'"), ("‘", "'"),
        ("“", ""), ("”", ""),
        ("«", ""), ("»", ""), ('"', ""), ("'", ""),
        ("—", "-"), ("–", "-"),
        ("œ", "oe"), ("…", "..."),
        ("⸻", ""),   # ⸻ séparateur
    ]:
        s = s.replace(a, b)
    # toute la ponctuation résiduelle → espace, puis collapse
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def html_text(path: str) -> str:
    html = open(path, encoding="utf-8").read()
    html = re.sub(r"<(script|style).*?</\1>", " ", html, flags=re.S)
    html = re.sub(r"<[^>]+>", " ", html)
    html = (html.replace("&amp;", "&").replace("&nbsp;", " ")
                .replace("&#160;", " ").replace("&eacute;", "é")
                .replace("&lt;", "<").replace("&gt;", ">"))
    return norm(html)


def load_coquilles(path: str):
    """Paires (transcript → page) d'un coquilles.md ou grammalecte.md : seules les
    tables dont l'en-tête contient « Transcript » sont lues (les corrections
    éditoriales et les faux positifs d'un grammalecte.md sont ignorés)."""
    pairs, active = [], False
    lines = open(path, encoding="utf-8").read().splitlines()
    for i, line in enumerate(lines):
        if not line.strip().startswith("|"):
            active = False
            continue
        cells = [c.strip().strip("`").strip() for c in line.strip().strip("|").split("|")]
        nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
        if re.match(r"^\|\s*:?-{2,}", nxt):  # en-tête = ligne suivie du séparateur |---|
            low = " ".join(cells).lower()
            active = "transcript" in low and "page" in low
            continue
        if not active or len(cells) < 2 or set(cells[0]) <= set("-: "):
            continue
        if cells[0].isdigit():
            cells = cells[1:]
        if len(cells) >= 2 and cells[0] and cells[0] != cells[1]:
            pairs.append((cells[0], cells[1]))
    return pairs


def apply_coquilles(text: str, pairs):
    """Applique les corrections au transcript ; renvoie (texte, non trouvées)."""
    unused = []
    for avant, apres in pairs:
        if avant in text:
            text = text.replace(avant, apres)
        else:
            unused.append(avant)
    return text, unused


def chunks(path: str, pairs=()):
    out = []
    text = open(path, encoding="utf-8").read()
    if pairs:
        text, _ = apply_coquilles(text, pairs)
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        for p in re.split(r"(?<=[\.\!\?:])\s+", line):
            p = p.strip(" *•◦.-\t")
            if len(p) >= 16:
                out.append(p)
    return out


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(2)
    argv = sys.argv[1:]
    coq = None
    if "--coquilles" in argv:
        i = argv.index("--coquilles"); coq = argv[i + 1]; del argv[i:i + 2]
    page, transcripts = argv[0], argv[1:]
    sources = [coq] if coq else [f for f in (os.path.join(os.path.dirname(page), n) for n in ("coquilles.md", "grammalecte.md")) if os.path.isfile(f)]
    pairs = []
    cur = "".join(open(t, encoding="utf-8").read() for t in transcripts)
    for f in sources:  # coquilles.md puis grammalecte.md : les paires s'enchaînent
        pf = load_coquilles(f)
        pairs += pf
        cur, unused = apply_coquilles(cur, pf)
        print(f"{os.path.basename(f)} : {len(pf)} correction(s) appliquée(s) depuis {f}")
        for u in unused:
            print(f"   ⚠ entrée introuvable dans le transcript (périmée ?) : {u[:100]}")
    H = html_text(page)
    total_missing = 0
    for t in transcripts:
        segs = chunks(t, pairs)
        missing = [c for c in segs if norm(c) not in H]
        total_missing += len(missing)
        status = "OK" if not missing else f"{len(missing)} MANQUANT(S)"
        print(f"== {t} : {len(segs)} segments · {status} ==")
        for m in missing:
            print("   • " + m[:140])
    print(f"\nTOTAL manquants : {total_missing}")
    sys.exit(0 if total_missing == 0 else 1)


if __name__ == "__main__":
    main()
