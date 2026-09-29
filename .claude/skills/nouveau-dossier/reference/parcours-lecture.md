# Parcours de lecture — plis dévoilables (composant commun)

Une page de dossier longue se lit à plusieurs profondeurs. Le composant commun
`assets/eci-parcours.css` + `assets/eci-parcours.js` donne au lecteur **trois parcours** et
**des blocs repliables** qu'il ouvre un par un. Référence vivante : `provoxys/son/index.html`
(générateur `a_traiter/provoxys-son/build/plis.py`).

| parcours | ce qui est ouvert |
|---|---|
| **1 Essentiel** | le récit (texte du dossier), les bilans, les voix du live ; tout le reste est replié |
| **2 Mécanisme** (défaut) | + clés de physique, ateliers, encadrés « Pour entrer » |
| **3 Complet** | + tous les plis de niveau 3 : analyse mathématique, en profondeur, histoire & sources |

Le parcours règle l'**ouverture initiale** de tous les plis ; chaque pli reste ouvrable et refermable
à la main dans tous les parcours. Le choix est mémorisé (`localStorage` « eci-parcours », commun au
site) ; `?parcours=essentiel|mecanisme|complet` dans l'URL l'emporte.

## Balisage

```html
<html lang="fr" data-parcours="2">                       <!-- parcours par défaut : utile sans JS -->
<link rel="stylesheet" href="<rel>/assets/eci-parcours.css?v=0">
…
<details class="eci-pli" id="pli-doppler-maths" data-famille="maths" data-niveau="3">
  <summary class="eci-pli-s"><span class="eci-pli-k">L'analyse mathématique</span>
    <span class="eci-pli-t">Titre du bloc</span><span class="eci-pli-m">2 formules</span></summary>
  <div class="eci-pli-c">…</div>
</details>
<div data-eci-parcours></div>          <!-- sélecteur complet (section « Choisir son parcours ») -->
<div data-eci-parcours="mini"></div>   <!-- sélecteur compact (barre du haut) -->
<script src="<rel>/assets/eci-parcours.js?v=0" defer></script>
```

- **Familles** (`data-famille`) : `maths` « L'analyse mathématique » · `profondeur` « En profondeur » ·
  `histoire` « Histoire & sources » · `cle` « Clé de physique » · `atelier` « Atelier ». Le libellé de
  `.eci-pli-k` est écrit par le générateur (texte présent sans JS).
- **Niveau** (`data-niveau`) : `2` ouvert dès Mécanisme, `3` ouvert seulement en Complet.
- **Complexité** (`data-complexite="1|2|3"` + pictogramme `<span class="eci-pli-cx" data-cx="N" role="img"
  aria-label="Complexité N sur 3 : …"><i></i><i></i><i></i></span>` dans le `<summary>`) : trois barres,
  **verte** accessible · **ambre** intermédiaire · **corail** expert (`--cx1-rgb`…`--cx3-rgb`). À ne pas
  confondre avec le niveau d'ouverture. Estimée par le générateur d'après la famille et la densité de formules
  (blocs et formules du texte), imposable bloc par bloc ; le mini-résumé `.eci-pli-m` porte aussi un temps de
  lecture « ≈ N min » (200 mots/min). Le sélecteur complet affiche la légende et le décompte par niveau.
- **`open` dans le HTML** = état du parcours par défaut : présent si `data-niveau` ≤ `data-parcours`
  de `<html>`, absent sinon. Sans JavaScript la page est donc lisible dans le parcours par défaut.
- **Petits éléments** (encadrés de marge) : `data-niveau="2|3"` sur un élément qui n'est pas un pli le
  masque sous ce parcours (sans bloc repliable). À réserver aux encadrés secondaires.
- Les plis s'imbriquent (un pli `maths` dans une clé `cle`).
- Couleur d'une famille réglable par dossier : `--pli-maths-rgb`, `--pli-profondeur-rgb`,
  `--pli-histoire-rgb`, `--pli-cle-rgb`, `--pli-atelier-rgb` (triplets RVB, sur `:root`).
- Formules dans un pli rédigé à part : poser `data-fctx="pli-<id>"` sur `.eci-pli-c` pour en faire un
  **contexte de symboles autonome** (lu par `scripts/formules/inline_syms.py`, comme une clé).

## Comportements (assurés par le JS)

- changement de parcours : la lecture reste en place (repère pris au tiers haut de l'écran ; s'il est
  replié, c'est le titre du pli qui reste en place) ;
- une ancre (`#…`, lien interne, arrivée par URL) ouvre tous les plis qui contiennent la cible ;
- la recherche dans la page (Ctrl+F) ouvre le `<details>` qui contient le mot (natif dans Chrome,
  Edge, Firefox récents, Safari récent) ;
- impression : tout est déplié, puis l'état est rétabli ;
- clavier : le sélecteur est un `radiogroup` (flèches), le mini-sélecteur se ferme par Échap ;
- un évènement `eci-parcours` (`detail.niveau`) est émis sur `<html>` à chaque changement.

## Ce qu'on replie — et ce qu'on ne replie jamais

- **Le texte du dossier reste dans la page**, replié ou non : un passage très calculatoire du
  verbatim peut aller dans un pli `maths` (son titre devient celui du pli), jamais en être retiré.
- Les **voix du live**, bilans, questions au public et encadrés anti-intox restent visibles dans
  tous les parcours.
- Chaque bloc rédigé pour un pli est un **ajout éditorial** soumis à toute la charte : vérification
  factuelle (agents `verif-claims`), `sources/`, ligne « Se lit », formules survolables, Grammalecte.

## Contrôle

- `verify-dossier.py` section `parcours` : assets liés, `<html data-parcours>`, familles et niveaux
  valides, `open` conforme au parcours par défaut, `<summary class="eci-pli-s">` en premier, ids uniques ;
- en navigateur, à 390 et 1440 px : les trois parcours (`?parcours=…`), le mini-sélecteur de la barre
  du haut, un lien vers une ancre située dans un pli fermé, aucun défilement horizontal.
