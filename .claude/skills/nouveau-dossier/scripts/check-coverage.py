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
    python3 check-coverage.py <page.html> <transcript1.txt> [transcript2.txt ...]

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
      → ACCEPTABLE, mais à signaler dans le récap (normalisation typo légère).
"""
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


def chunks(path: str):
    out = []
    for line in open(path, encoding="utf-8").read().splitlines():
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
    page, transcripts = sys.argv[1], sys.argv[2:]
    H = html_text(page)
    total_missing = 0
    for t in transcripts:
        segs = chunks(t)
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
