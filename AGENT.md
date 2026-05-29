# Agent Instructions - Empire contre Intox

Ce projet transforme des documents texte en pages HTML educatives, immersives et partageables, dans l'identite visuelle du collectif Empire contre Intox.

## Objectif

Quand un nouveau fichier `.txt` doit etre implemente en HTML, produire une page complete qui :

- conserve la transcription mot pour mot ;
- structure le contenu en chapitres lisibles ;
- ajoute une vraie mise en scene pedagogique ;
- reprend l'identite Empire contre Intox ;
- est referencee depuis `index.html` ;
- fonctionne comme un site statique autonome.

## Methode obligatoire

1. Lire tout le fichier texte avant de coder.
2. Identifier le titre, le ton, les actes ou chapitres naturels, les passages forts et la chute.
3. Ne pas corriger ni reecrire la transcription centrale, sauf pour l'integrer dans une structure HTML lisible.
4. Creer une page HTML autonome dans le dossier du document, avec CSS et JS integres si necessaire.
5. Utiliser le logo ECI depuis `ymir-lalie/assets/logo-eci.jpg`.
6. Creer ou reutiliser une image hero adaptee au sujet dans `ymir-lalie/assets/`.
7. Ajouter une navigation interne sticky, un hero fort, une structure en chapitres, des encadres pedagogiques, et un footer ECI.
8. Ajouter des objectifs pedagogiques explicites.
9. Ajouter des liens croises : retour `../index.html` et lien vers les autres dossiers pertinents.
10. Mettre a jour `index.html` avec une nouvelle carte pour la page.
11. Verifier dans un navigateur local : images chargees, liens corrects, pas de debordement horizontal.

## Style visuel — Codex scientifique imperial (OBLIGATOIRE)

Direction arretee : un **codex scientifique imperial** — capitales romaines gravees, or sur nuit profonde, gravite ceremonielle. Toute nouvelle page DOIT appliquer ce systeme pour rester coherente avec `index.html`, `edicarien.html` et `resume-eres.html`. Ne JAMAIS revenir a un theme "AI slop" (Inter, Georgia, degrades violet, cartes generiques).

### Typographie

- Display / labels / nav / boutons / titres : **Cinzel** (`--roman`), TOUJOURS en MAJUSCULES, letter-spacing genereux.
- Corps de lecture, leads, descriptions, citations en italique : **Fraunces** (`--serif`), `font-optical-sizing: auto`, casse normale.
- Charger via Google Fonts :
  `Cinzel:wght@400..900` + `Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600`.
- INTERDITS : Inter, Roboto, Arial, Space Grotesk, polices systeme.

### Jetons couleur (`:root`)

```css
--void:#050811; --abyss:#070c1a; --navy:#0e1a2e;
--ink:#f4ecd8; --parch:#e7dcc1; --muted:#c0b59a; --soft:#8f8c78;
--gold:#d6ac55; --gold-bright:#f3d98a; --gold-deep:#9c7228;
--line:rgba(214,172,85,.20);   /* filets or */
--line-2:rgba(244,236,216,.10); /* filets neutres */
--ease:cubic-bezier(.22,1,.36,1);
```

- Dominante : nuit profonde. Accent unique fort : **or**. Texte : parchemin/ivoire.
- Chaque page ajoute **un seul accent secondaire** qui fait echo a son image hero, expose en variables (ex. Ediacarien : `--verd`, `--algae` ; Eres : `--ember`, `--forest`, `--ocean`). L'or reste partout l'accent maitre.

### Atmosphere (a inclure sur chaque page)

- `.atmos` fixe : grille gravee masquee + champ d'etoiles scintillant (radial-gradients).
- `.grain` fixe : bruit SVG `feTurbulence`, `opacity:.05`, `mix-blend-mode: overlay`.
- `.frame` : 4 equerres or fixees aux coins (cadre de charte).
- `.progress-top` : fil dore de progression de defilement (haut de page, `position:fixed`).
- Fonds des panneaux : nuit translucide + `backdrop-filter: blur`, jamais des aplats plats.

### Composants

- **Rayons** : 2–3px (pas 8px). Sobriete gravee, pas d'arrondis mous.
- **Boutons** : primaire = degrade or (`.button.primary`/`.btn-gold`, texte sombre) ; secondaire = fantome borde or.
- **Filets** : hairlines `--line` (or, 20% alpha) pour separateurs et bordures.
- **Liens de nav** : Cinzel + soulignement or anime (`scaleX`) au survol / actif.
- **Cartes** (dossiers, era-node, learning-item) : bordure `--line-2`, liseré superieur 2–3px en accent, survol = `translateY(-6px)` + halo accent.
- **Tags / chips** : Cinzel minuscule, or, fond `rgba(214,172,85,.06)`.
- **Numeros de chapitre** : grand chiffre Cinzel en contour (`-webkit-text-stroke` or transparent).
- **Logo ECI** : cercle borde d'un anneau `conic-gradient` dore (sceau), dans la nav et en footer.
- **Devise** : « Veritas omnia vincit » / « Ad astra per aspera » en Fraunces italique dore.

### Mouvement

- Entree hero : `@keyframes rise` en cascade (`animation-delay` croissant).
- Sous la ligne de flottaison : classe `.reveal` revelee via `IntersectionObserver` (ajout `.in`), delais `data-d="1..3"`.
- Mot-accent du titre : `.foil` (degrade or anime, "feuille d'or").
- TOUJOURS gerer `@media (prefers-reduced-motion: reduce)` (couper animations/transitions) et `:focus-visible` (contour `--gold-bright`).

### Motif "frise / data-viz de temps profond"

Quand le sujet implique une echelle de temps, privilegier une visualisation a deux niveaux (cf. `resume-eres.html`) :
1. un **rail narratif** a espacement egal (axe degrade, noeuds, marqueur « Nous » pulsant) ;
2. un **ruban de proportions reelles** (`flex` proportionnel) qui revele l'echelle vraie + legende.
Une couleur par segment via une variable `--c` partagee (axe, liseré de carte, pastille de legende).

Toute page peut avoir sa palette secondaire, mais elle DOIT rester dans ce systeme (or maitre, nuit profonde, Cinzel + Fraunces, atmosphere, mouvement).

## Structure recommandee pour une page dossier

- `hero` : titre, sous-titre, image immersive, CTA "Lire la transcription", "Accueil ECI".
- `topbar` : logo ECI, titre court, lien accueil, navigation par chapitres.
- `intro` : intention de lecture et fil conducteur.
- `learning-panel` : objectifs pedagogiques en 3 blocs.
- `chapter` : sections de transcription, avec aside pedagogique.
- encadres : script, methode scientifique, question au public, lecon, anti-intox selon le contenu.
- `collective-footer` : grand logo ECI, texte collectif, liens vers index et autre dossier.
- footer technique court.

## Regles de contenu

- La transcription doit rester visible et complete.
- Les ajouts editoriaux doivent clarifier, orienter ou contextualiser.
- Ne pas transformer le texte en resume uniquement.
- Ne pas supprimer les formulations orales si elles font partie du document.
- Les titres de chapitres peuvent etre editorialises, mais le contenu original doit rester present.
- Eviter les blocs trop longs sans respiration visuelle.

## Assets

Assets actuels :

- `ymir-lalie/assets/logo-eci.jpg`
- `ymir-lalie/assets/ediacaran-hero.png`
- `ymir-lalie/assets/eres-hero.png`

Pour un nouveau sujet :

- generer ou ajouter une image hero pertinente ;
- la sauvegarder dans `ymir-lalie/assets/` avec un nom explicite ;
- ne jamais referencer une image uniquement depuis un dossier temporaire ;
- verifier que l'image charge dans le navigateur.

## Mise a jour de l'index

Chaque nouvelle page doit etre ajoutee a `index.html` :

- nouvelle carte dans la grille des pages ;
- image de vignette ;
- titre ;
- description courte ;
- tags ;
- lien relatif vers le HTML ;
- **byline auteur** : avatars (`.byline`, anneaux or superposes) + « Réalisé par <noms> » ; crediter les createur(s) du contenu (ex. Lalie, Ymir) sur la carte ET dans le `collective-footer` de la page dossier ;
- si utile, mise a jour du parcours pedagogique.

## Verification finale

Avant de terminer :

- ouvrir `index.html` via un serveur local ;
- ouvrir chaque page HTML referencee ;
- verifier que toutes les images sont chargees ;
- verifier les liens de navigation et retour accueil ;
- verifier qu'il n'y a pas de scroll horizontal ;
- mentionner les fichiers crees ou modifies.

