# Schémas SVG du script — décision par schéma (23 septembre 2026)

Constat de l’auteur : les 19 schémas SVG (`assets/schemas-son/v01…v19.svg`, fiches V01–V19 de `banque-visuelle-son.md`) sont de qualité insuffisante pour le dossier. Règle : **chacun est soit remplacé par un atelier interactif, soit refait**. Aucun n’est publié tel quel.

## Pourquoi ils ne passent pas

- Police Arial / Helvetica et couleurs codées en dur, hors jetons du codex (Cinzel / Fraunces, or, parchemin, `--phos`).
- Géométrie dessinée à la main, pas calculée : boîtes alignées à l’œil, ondes approximatives, étiquettes non mesurées (débordent sous 640 px).
- Animations décoratives (`stroke-dashoffset` qui défile) sans rapport avec une grandeur physique.
- Fond opaque `#0a1220` qui fait une dalle sur l’atmosphère de la page.

## Cahier des charges de tout SVG qui reste

- Généré au build par un script (Python ou TS), jamais dessiné à la main : géométrie calculée, texte mesuré (`getComputedTextLength()` ou métrique équivalente) à 360 px.
- Fond transparent, jetons du codex, Cinzel pour les libellés, Fraunces pour les gloses, or pour les axes et cotes, `--phos` pour les traces ; `role="img"`, `<title>` et `<desc>`.
- Une seule animation, et seulement si elle représente une grandeur (un front qui avance à c, une trace qui se lit dans le temps) ; coupée en `prefers-reduced-motion`.
- `viewBox` fluide, pleine largeur du bloc, jamais de largeur fixe.

## Décision par schéma

| Schéma | Titre | Décision | Détail |
|---|---|---|---|
| V01 | Onde longitudinale — pression représentée schématiquement | **remplacé par l’atelier S01** | L’atelier montre la même rangée de particules, mais calculée, avec λ mesurable et le son joué. |
| V02 | Schéma 2 — Spectre : infra · audible · ultra | **remplacé par l’atelier S56** | Nouvel atelier « La règle des fréquences » : axe logarithmique 0,01 Hz → 1 GHz, bandes infra / audible / ultra, repères animaux, instruments et machines au survol. |
| V03 | Schéma 3 — Modes d’une corde fixée aux deux bouts | **remplacé par l’atelier S04** | La corde calculée affiche ses modes en barres et en profils ; les trois dessins fixes deviennent trois états de l’atelier. |
| V04 | Schéma — la règle de λ | **remplacé par l’atelier S09** | Préset « obstacle contre λ » du bac à ondes : le même mur avec une source à 100 Hz, 1 kHz, 4 kHz. |
| V05 | Schéma — grotte comme instrument | **remplacé par l’atelier S09** | Préset « grotte » du bac à ondes : galerie irrégulière, source vocale, sonde sur la paroi peinte. |
| V06 | Schéma calculé — deux sinus → enveloppe de battement | **remplacé par l’atelier S14** | L’atelier des battements trace la somme réelle, compte les pouls et fait entendre. |
| V07 | Schéma 4 — De la pression au percept | **refaire (SVG codex au build)** | Schéma de chaîne (pression → cochlée → bandes critiques → hauteur · sonie · timbre) généré au build en SVG codex : Cinzel / Fraunces, jetons de couleur, flèches or, texte mesuré ; aucun atelier ne le remplace. |
| V08 | Schéma — la trace | **refaire (SVG codex au build)** | Schéma de chaîne (pression → sillon / champ / bit → copie → droit + mémoire) généré au build, même gabarit que V07. |
| V09 | Schéma 5 — Écho pulsé (Langevin → sonar → échographe) | **remplacé par l’atelier S16** | Le sonar à impulsion rejoue l’aller-retour avec Δt lu à l’écran. |
| V10 | Schéma — chaîne d’un échographe | **remplacé par l’atelier S51** | L’échographe simulé remplace la chaîne PZT → gel → tissu → écho. |
| V11 | Schéma — source en mouvement : λ se comprime vers l’avant | **remplacé par l’atelier S13** | Les fronts nés là où la source était sont dessinés par l’atelier Doppler, en mouvement. |
| V12 | Schéma 7 — Chaîne de l’audition | **remplacé par l’atelier S43** | L’atelier « La cochlée » est élargi à toute la chaîne : coupe de l’oreille avec survol de chaque organe, puis cochlée déroulée. |
| V13 | Schéma — source / filtre | **remplacé par l’atelier S41** | La source-filtre est l’atelier lui-même. |
| V14 | Schéma — réverbération | **remplacé par l’atelier S23** | La décroissance de réverbération est mesurée (clap) ou calculée (Sabine, S24), plus dessinée. |
| V15 | Schéma animé — une seule λ à 1 Hz dans l’air | **remplacé par l’atelier S49** | L’échelle de l’infrason est l’atelier lui-même. |
| V16 | Schéma animé — pulse / écho / buzz (même dessin que Langevin) | **remplacé par l’atelier S46** | Pulse / écho / buzz sont produits par l’atelier chauve-souris. |
| V17 | Schéma 6 — Ce que Gurnett n’écoute pas / ce qu’il écoute | **remplacé par l’atelier S54** | Le contraste « pas un micro / une antenne à plasma » est le premier écran de l’atelier des trois familles. |
| V18 | Infographie — trois familles, un seul mot « son » | **remplacé par l’atelier S54** | Les trois familles sont l’atelier lui-même. |
| V19 | Schéma — type III (Ginzburg → Gurnett → LOFAR) | **remplacé par l’atelier S54** | Objet « type III » de l’atelier : spectre dynamique qui dérive vers le bas avec f_pe. |

Bilan : **17 schémas remplacés par des ateliers** (dont un nouvel atelier S56 et un élargissement de S43), **2 schémas refaits** (V07, V08, chaînes conceptuelles sans grandeur à manipuler). Les fichiers `assets/schemas-son/*.svg` restent des supports de plateau provisoires jusqu’à la livraison des ateliers ; ils ne sont pas copiés dans le dossier publié.
