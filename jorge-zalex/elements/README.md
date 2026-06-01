# `elements.pdf` → texte + images

Conversion de `../elements.pdf` (présentation PowerPoint « Le Tableau Périodique des éléments chimiques », jorge costa — **156 diapositives**, 4:3) en ressources faciles à réutiliser.

## Contenu

| Chemin | Description |
|---|---|
| `elements.md` | **Document principal** : pour chaque diapositive, son image + le texte extrait. Idéal pour parcourir ou construire une page HTML. |
| `elements-full.txt` | Tout le texte d'un seul bloc (mise en page préservée, diapositives séparées par un saut de page `\f`). |
| `text/slide-NNN.txt` | Texte d'une seule diapositive (001 → 156). |
| `pages/slide-NNN.png` | **Rendu complet de chaque diapositive** (1500×1125 px, 150 DPI). La ressource la plus fidèle — la plupart des diapos sont des infographies. |
| `embedded/img-PPP-NNN.*` | Images sources intégrées, à leur résolution native (`PPP` = n° de diapositive). Fragments décoratifs < 8 Ko retirés. |

## Plan de la présentation

- **I** – Les particules élémentaires
- **II** – Les 4 interactions fondamentales
- **III** – La formation des atomes
- **IV** – La stabilité des atomes
- **V** – Les modèles de l'atome
- **VI** – Structure électronique des atomes
- **VII** – Structure du Tableau périodique
- **VIII** – Propriétés périodiques des éléments chimiques

## Régénérer

```bash
pdftotext -layout elements.pdf elements/elements-full.txt   # texte
pdftoppm -png -r 150 elements.pdf elements/pages/slide       # 1 PNG / diapo
pdfimages -all -p elements.pdf elements/embedded/img         # images natives
```
