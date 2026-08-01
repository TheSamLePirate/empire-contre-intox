# Agent Instructions — Empire contre Intox

Ce projet transforme des **déroulés de live** (transcriptions, scripts d'émission) en pages HTML éducatives, immersives et partageables, rassemblées dans un index commun et publiées en site statique.

Le site est publié sur deux canaux :

- **Production Portainer / domaine principal** : https://empire-contre-intox.com — stack `empire-contre-intox-site`, port serveur `3004` → Nginx conteneur `80`.
- **Miroir GitHub Pages** : https://thesamlepirate.github.io/empire-contre-intox/ — dépôt `TheSamLePirate/empire-contre-intox`, branche `main`, racine.

> ## ▶ Skill `nouveau-dossier` (process automatisé)
>
> Pour créer un dossier à partir d'un transcript, **utilise la skill `/nouveau-dossier`**
> (`.claude/skills/nouveau-dossier/`). Elle reproduit pas à pas le process éprouvé sur
> les derniers dossiers et fournit les outils prêts :
> - **`SKILL.md`** — le playbook en 15 étapes (lecture intégrale → page codex → 100 %
>   verbatim → vérification factuelle → images → sources → index → publication) ;
> - **`reference/design-system.md`** — jetons codex, structure, chemins relatifs, le
>   **correctif de révélation** des sections hautes (`threshold:0` + filet de sécurité),
>   patterns de dataviz SVG, règles de dignité ;
> - **`reference/sources-and-index.md`** — vérification par agents //, anti-hallucination
>   DOI (Crossref), câblage exact de `sources.html`, numérotation de l'index, piège des
>   « références orphelines » ;
> - **`reference/images-template.md`** — gabarit `images_a_generer.md` (génération
>   des images confiée à **Codex**, lancée **en parallèle** de la construction) ;
> - **`scripts/check-coverage.py`** — contrôle **obligatoire** des 100 % mot pour mot ;
> - **`scripts/optimize-pngs.sh`** — optimisation PNG du site (pngquant + oxipng).
>
> À la racine du dépôt : **`scripts/generate-rss.py`** — régénère **`rss.xml`**
> (flux RSS riche) depuis `index.html` ; à relancer **pour chaque dossier** (voir
> « Flux RSS »).
>
> La présente charte (`AGENT.md`) reste la **référence de fond** ; la skill en est la
> mise en œuvre opérationnelle. En cas de divergence, suivre `AGENT.md`.

## Objectif

Quand un nouveau déroulé (`.txt` ou script) doit être implémenté, produire une page complète qui :

- conserve la transcription **mot pour mot** ;
- structure le contenu en chapitres lisibles ;
- ajoute une vraie mise en scène pédagogique ;
- s'intègre à l'identité **Empire contre Intox** (au minimum : retour à l'index + footer ECI) ;
- crédite ses auteur(s) ;
- est référencée par une carte dans `index.html` ;
- fonctionne comme un site statique autonome.

### Cas particulier — un dossier sans transcription

Le point de départ habituel est un **déroulé de live**, et la règle du **mot pour mot**
s'applique alors sans exception. Mais un dossier peut aussi être écrit à partir d'un
**objet** : une application, un jeu de données, un corpus de documents. C'est le cas du
**Dossier XXVII** (« L'Ordinateur de 1983 »), écrit d'après le *Simulateur Logique Nodal*.

Dans ce cas :

- il n'y a pas de verbatim à conserver, donc **`check-coverage.py` ne s'applique pas** —
  le dire explicitement dans le récapitulatif final plutôt que de laisser croire à un oubli ;
- la **source primaire est l'objet lui-même**, pas sa documentation. Si le code et la doc
  d'un projet se contredisent, **le code fait foi**, et l'écart se signale dans un encadré
  « anti-intox » ;
- la vérification se fait autant que possible **par exécution** : faire tourner le code,
  comparer les sorties affichées dans la page à celles de l'original, et consigner les
  chiffres obtenus (tailles, cycles, sorties) dans l'audit `sources/` ;
- tout le reste de la charte s'applique à l'identique — intégration ECI, crédit auteur,
  images obligatoires, formules en KaTeX, `sources/`, index, manifeste, RSS, licence.

## Organisation des fichiers (par créateur / équipe)

Chaque créateur ou équipe possède **son propre dossier** à la racine du dépôt. Un nouveau déroulé va dans le dossier de son auteur (en créer un si besoin) :

```
index.html                      ← index commun (cartes de tous les dossiers)
AGENT.md                        ← instructions agent (CLAUDE.md = lien symbolique vers AGENT.md)
README.md                       ← même contenu, survol humain
ymir-lalie/                     ← équipe Lalie & Ymir (style codex ECI)
  assets/
    logo-eci.jpg                ← SCEAU ECI PARTAGÉ (référencé par tous)
    ediacaran-hero.png, eres-hero.png
  edicarien.html, resume-eres.html
  lalie.jpeg, ymir.jpeg         ← avatars auteurs
provoxys/                       ← créateur Provoxys (identité visuelle propre)
  assets/artemis2-hero.png
  Artemis2.html
  provoxys.jpeg, samlepirate.jpeg
samlepirate/                    ← créateur Samlepirate
  champs-vecteurs.html          ← Dossier VII (identité propre : Newsreader / JetBrains Mono)
  ordinateur-1983/              ← Dossier XXVII (codex ECI + mono pour le code)
    index.html                  ← 15 chapitres, 15 expériences interactives, CPU 8 bits exécutable
    assets/                     ← hero + 5 illustrations de chapitre + vignette d'index
    simulateur/                 ← BUILD EMBARQUÉ du Simulateur Logique Nodal (Samlepirate)
                                  index.html retouché + assets/ ; voir simulateur/README.md
  samlepirate.jpeg              ← avatar auteur
horloge-univers/                ← Samlepirate — « Horloge de l'Univers » (dossier multi-pages, piloté par des données)
  chronos.html                  ← dossier complet (frise log + horloge de la Terre)
  calendrier.html               ← Calendrier Cosmique plein écran
  clock.html                    ← horloge temps réel (24 h = 13,787 Ga)
  assets/
    events.json                 ← SOURCE CANONIQUE des 46 événements (clock + calendrier)
    super-images/               ← une image par événement (01 → 46)
    extinctions/ · geologie/ · temps-univers.png
sources/                        ← Dossier XXVIII « Les Sources » — vérification & sources de TOUS les dossiers
  sources.html                  ← page codex (fiches donnée→résumé→verdict→source, références DOI, biblio, RECHERCHE)
  README.md                     ← index des fichiers de sources + bilan d'audit
  dossier-*.md                  ← audit par dossier (affirmation → verdict → source avec URL)
  refs-doi-*.md                 ← références primaires à comité de lecture (DOI vérifiés)
  chronos-bibliographie.md · sources_audit_scientifique_chronos.csv
LICENCE-CONTENU.md              ← licence de contenu CC BY-NC-ND 4.0 (textes, transcriptions, images, médias)
Dockerfile · nginx.conf · docker-compose.yml · .dockerignore
                                ← déploiement statique Nginx vers Portainer (`empire-contre-intox-site`)
```

> **XXVIII dossiers** au total — l'index affiche **`<b>XXVIII</b> dossiers`**. Numérotation actuelle (ordre d'affichage) :
> I `ymir-lalie/resume-eres.html` · II `ymir-lalie/edicarien.html` · III `provoxys/Artemis2.html` · IV `horloge-univers/chronos.html` · V `jorge-zalex/elements.html` · VI `la-vie-de-la-terre/index.html` · VII `samlepirate/champs-vecteurs.html` · VIII `ymir-lalie/ancetres-genetiques/index.html` · IX `lalie-ymir-sam/index.html` · X `ymir-lalie/singe-aquatique/index.html` · XI `ymir-lalie/esclavage/index.html` · XII `provoxys/tornades/index.html` · XIII `phantom/abeilles/index.html` · XIV `formules/index.html` · XV `ymir-lalie/la-resistance/index.html` · XVI `provoxys/briser-le-silence/index.html` · XVII `provoxys/exoplanetes/index.html` · XVIII `ymir-lalie/premieres-cites/index.html` · XIX `provoxys/sondes/index.html` · XX `ymir-lalie/premier-empires/index.html` · XXI `provoxys/therapie-conversion/index.html` · XXII `ymir-lalie/egypte-grece/index.html` · XXIII `ymir-lalie/evolution/index.html` · XXIV `ymir-lalie-phantom/pirates/index.html` · XXV `provoxys/entropie/index.html` · XXVI `ymir-lalie/alexandre-le-grand/index.html` · XXVII `samlepirate/ordinateur-1983/index.html` · XXVIII `sources/sources.html` (« Les Sources » — appareil critique commun à tous les dossiers).
>
> **Cette liste est la première chose à relire avant d'ajouter un dossier** : la numérotation bouge à chaque ajout, et « Les Sources » doit rester **le dernier numéro**. En cas de doute, l'`index.html` fait foi — c'est lui qui est publié.
>
> Les cartes sont regroupées en **sept parcours thématiques** (`.dossier-group`) : I Temps profond & Terre · II Vivant, évolution & écosystèmes · III Lois du réel & modèles · IV Cosmos & exploration · V Civilisations, empires & mémoire · VI Société, droits & vigilance · VII Méthode, sources & vie du collectif. Une nouvelle carte se place dans le parcours qui lui correspond, et le `group-count` de ce parcours doit être incrémenté.
>
> La carte « Calendrier des lives » est une carte d'agenda externe, pas un dossier numéroté.

Règles :

- Le **sceau ECI** est unique : `ymir-lalie/assets/logo-eci.jpg`. Le référencer avec le bon chemin relatif depuis le dossier du dossier (ex. depuis `provoxys/` : `../ymir-lalie/assets/logo-eci.jpg`).
- Chaque dossier d'équipe contient ses **avatars auteurs** (`<auteur>.jpeg`) et un `assets/` pour ses images hero.
- Les chemins dans l'index sont relatifs depuis la racine (`provoxys/Artemis2.html`, `ymir-lalie/assets/eres-hero.png`).

## Deux voies de design (les deux sont valides)

### Voie A — Codex scientifique impérial (par défaut, identité ECI)

C'est le système de référence (`index.html`, `ymir-lalie/*.html`). À utiliser pour tout dossier produit dans l'identité ECI. Détails complets ci-dessous (« Style visuel »). Ne JAMAIS retomber dans le « AI slop » (Inter, Georgia, dégradés violet, cartes génériques).

### Voie B — Identité d'un créateur invité

Un créateur invité peut **conserver sa propre identité visuelle** (ex. `provoxys/Artemis2.html` : Bricolage Grotesque / Newsreader / JetBrains Mono, accents orange/teal sur nuit). Dans ce cas, le codex ECI n'est PAS imposé, **mais l'intégration ECI est OBLIGATOIRE**, stylée pour épouser le design de la page :

- un **lien retour « Accueil ECI »** dans la barre de navigation (`href="../index.html"`) ;
- un **bandeau de pied de page « Empire contre Intox »** reprenant les mêmes éléments que les autres dossiers : sceau ECI en cercle, titre « Empire contre Intox », court texte collectif, **liens croisés** (retour index + autres dossiers), devise **« Veritas omnia vincit »** ;
- conserver le pied de page propre de l'auteur s'il en a un (le bandeau ECI vient en complément).
- bonus : si le dossier a un **compagnon interactif externe** (ex. simulation), le lier (voir « Liens externes »).

Voir `provoxys/Artemis2.html` (classes `.eci-home`, `.eci-collective`, `.eci-btn`) comme gabarit, en reprenant les variables CSS de la page hôte.

## Méthode obligatoire

1. Lire **tout** le déroulé avant de coder.
2. Identifier le titre, le ton, les actes/chapitres naturels, les passages forts, la chute.
3. Ne pas corriger ni réécrire la transcription centrale (seules des normalisations typo légères sont tolérées : `$CO_2$`→`CO₂`, accents/espaces, coquilles évidentes — les signaler).
4. Créer la page HTML autonome **dans le dossier de son auteur**, CSS + JS intégrés.
5. Référencer le sceau ECI avec le bon chemin relatif.
6. Créer/placer une **image hero** pertinente dans `<dossier-auteur>/assets/` (nom explicite, ex. `artemis2-hero.png`).
7. Hero fort + nav interne sticky + chapitres + encadrés pédagogiques.
8. **Intégration ECI** : retour à l'index + footer/bandeau ECI (voie A ou voie B selon le design choisi).
9. Liens croisés : `../index.html` + autres dossiers pertinents.
10. **Crédit auteur** dans la page (footer ECI et/ou bandeau crédit après le sommaire) ET sur la carte d'index.
11. **Vérifier & sourcer** chaque information, affirmation et donnée du dossier, puis **alimenter le dossier `sources/`** (audit `.md` + références DOI + page `sources.html`) — voir « Vérification scientifique & sources ». **OBLIGATOIRE pour tout dossier**, existant ou nouveau.
12. Mettre à jour `index.html` (carte + compteurs + numérotation — voir « Mise à jour de l'index »).
13. **Régénérer le flux RSS** : `python3 scripts/generate-rss.py` (relit `index.html` → réécrit `rss.xml`). **OBLIGATOIRE pour tout dossier** ajouté/modifié/réordonné — voir « Flux RSS ».
13 bis. **Déclarer tous les fichiers du dossier dans `config/legacy-public-manifest.json`** (allowlist du build Astro : page, `assets/*`, avatars, fichiers `sources/`). Un fichier absent n'est **pas publié**, et le build **échoue** si l'image de la carte d'index manque (`Missing social image for dossier`) — c'est aussi elle qui alimente l'`og:image`. Le transcript `.txt` est exclu volontairement. Vérifier avec `npx --yes tsx scripts/prepare-legacy.ts`, puis `rm -rf .legacy-public`. **OBLIGATOIRE pour tout dossier** — détails dans la skill `nouveau-dossier` (« Manifeste public »).
14. Ajouter/maintenir la licence de contenu sur la page : métadonnées `<link rel="license">` + `<meta name="rights">`, cartouche `.eci-license` dans le footer, lien relatif vers `LICENCE-CONTENU.md`.
15. Vérifier en local : images chargées, liens corrects, pas de scroll horizontal, licence visible, aucune mention technique obsolète du type « Page HTML autonome créée à partir… ».

## Style visuel — Codex scientifique impérial (voie A)

Capitales romaines gravées, or sur nuit profonde, gravité cérémonielle.

### Typographie

- Display / labels / nav / boutons / titres : **Cinzel** (`--roman`), TOUJOURS en MAJUSCULES, letter-spacing généreux.
- Corps, leads, descriptions, citations italiques : **Fraunces** (`--serif`), `font-optical-sizing: auto`, casse normale.
- Google Fonts : `Cinzel:wght@400..900` + `Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600`.
- INTERDITS : Inter, Roboto, Arial, Space Grotesk, polices système.

### Jetons couleur (`:root`)

```css
--void:#050811; --abyss:#070c1a; --navy:#0e1a2e;
--ink:#f4ecd8; --parch:#e7dcc1; --muted:#c0b59a; --soft:#8f8c78;
--gold:#d6ac55; --gold-bright:#f3d98a; --gold-deep:#9c7228;
--line:rgba(214,172,85,.20);   /* filets or */
--line-2:rgba(244,236,216,.10); /* filets neutres */
--ease:cubic-bezier(.22,1,.36,1);
```

- Dominante : nuit profonde. Accent maître : **or**. Texte : parchemin/ivoire.
- Chaque page ajoute **un seul accent secondaire** qui fait écho à son image hero (ex. Édiacarien : `--verd`, `--algae` ; Ères : `--ember`, `--forest`, `--ocean`).

### Atmosphère (sur chaque page codex)

- `.atmos` fixe : grille gravée masquée + champ d'étoiles scintillant (radial-gradients).
- `.grain` fixe : bruit SVG `feTurbulence`, `opacity:.05`, `mix-blend-mode: overlay`.
- `.frame` : 4 équerres or fixées aux coins (cadre de charte).
- `.progress-top` : fil doré de progression de défilement (`position:fixed`).
- Panneaux : nuit translucide + `backdrop-filter: blur`, jamais d'aplats plats.

### Composants

- **Rayons** : 2–3px (pas 8px).
- **Boutons** : primaire = dégradé or (texte sombre) ; secondaire = fantôme bordé or.
- **Filets** : hairlines `--line`.
- **Liens de nav** : Cinzel + soulignement or animé (`scaleX`).
- **Cartes** : bordure `--line-2`, liseré supérieur 2–3px en accent, survol `translateY(-6px)` + halo.
- **Tags** : Cinzel minuscule, or, fond `rgba(214,172,85,.06)`.
- **Numéros de chapitre** : grand chiffre Cinzel en contour (`-webkit-text-stroke`).
- **Logo ECI** : cercle bordé d'un anneau `conic-gradient` doré.
- **Devise** : « Veritas omnia vincit » / « Ad astra per aspera » en Fraunces italique doré.

### Mouvement

- Entrée hero : `@keyframes rise` en cascade.
- Sous la ligne de flottaison : `.reveal` révélé via `IntersectionObserver` (`.in`), délais `data-d="1..3"`.
- Mot-accent du titre : `.foil` (dégradé or animé).
- TOUJOURS gérer `@media (prefers-reduced-motion: reduce)` + `:focus-visible` (`--gold-bright`).

### Motifs réutilisables

- **Frise / data-viz de temps profond** (cf. `resume-eres.html`) : rail narratif à espacement égal (axe dégradé, nœuds, marqueur « Nous » pulsant) + ruban de proportions réelles (`flex` proportionnel) + légende ; une couleur par segment via `--c`.
- **Horloge SVG** (cf. `resume-eres.html`) : si une métaphore temporelle existe, la rendre en SVG **géométriquement exact** (angles calculés), pas en CSS approximatif.

## Structure recommandée pour une page dossier

- `hero` : titre, sous-titre, image immersive, CTA « Lire la transcription », « Accueil ECI ».
- `topbar` sticky : sceau ECI, titre court, lien accueil, navigation par chapitres + barre de progression.
- `intro` : intention de lecture et fil conducteur.
- `learning-panel` : objectifs pédagogiques (3 blocs).
- `chapter` : sections de transcription, avec aside pédagogique.
- encadrés : script, méthode scientifique, question au public, leçon, anti-intox selon le contenu.
- **bandeau crédit** après le sommaire (`.credit-band` : avatars + « Réalisé par <auteur(s)> »).
- **collective-footer** : sceau ECI, texte collectif, liens vers index et autres dossiers, devise.
- **cartouche licence** `.eci-license` en pied de page : CC BY-NC-ND 4.0, partage avec attribution, sans usage commercial ni modification, lien vers `LICENCE-CONTENU.md`.
- Ne plus ajouter de footer technique du type « Page HTML autonome créée à partir… » ; les détails de provenance/sources doivent être dans le dossier lui-même et dans `sources/`.

## Crédits auteurs (obligatoire)

- Chaque dossier est crédité à **ses** créateurs, avec leurs **avatars** (dossier de l'équipe).
- Format byline : avatars en cercles à anneau or (superposés) + sur-titre « Réalisé par » + noms.
- Variante participation : ajouter une ligne `.note` « avec la participation de <nom> » (ex. *Provoxys, avec la participation de Samlepirate*).
- Le crédit apparaît **sur la carte d'index** ET **dans la page** (bandeau crédit après le sommaire et/ou collective-footer).

## Mise à jour de l'index (`index.html`)

Pour chaque nouveau dossier :

- **Nouvelle carte** dans `.dossiers` (grille `repeat(auto-fit, minmax(300px,1fr))`, elle absorbe N cartes).
- **Image** : `<dossier-auteur>/assets/<nom>-hero.png` en `<img>` 16:10 (mêmes effets que les autres cartes). À défaut d'asset, une scène CSS temporaire est tolérée, mais ajouter une vraie image dès que possible.
- **Numéro** : `Dossier I / II / III…` suivant **l'ordre d'affichage**. Si on réordonne, **renuméroter partout** : les cartes, l'ordre du menu de nav, et l'eyebrow « Dossier N » dans le hero de chaque page concernée.
- **Titre**, **description courte**, **tags** (3), **lien relatif**.
- **Byline** auteur (avatars + « Réalisé par … », + `.note` participation si besoin).
- **Compteurs** : mettre à jour le hero (compteur en chiffres romains, actuellement `<b>XXVIII</b> dossiers`), le sec-head (la phrase qui chiffre le nombre de dossiers, actuellement « Vingt-huit dossiers… ») et le `group-count` du parcours thématique d'accueil. Penser aussi au **Décret méthodologique** (`#decret`), au menu du pied de page, aux eyebrows des pages concernées et à `sources/sources.html` si l'on ajoute/réordonne des dossiers.
- Les nouvelles cartes se placent **avant** le bandeau manifeste `#manifeste` (« Rejoignez l'Empire… »), qui reste juste après la grille des dossiers.

## Flux RSS (`rss.xml`) — obligatoire à chaque dossier

Le site expose un **flux RSS riche** à `rss.xml` (racine), servi sur
`https://empire-contre-intox.com/rss.xml` et sur le miroir
`https://thesamlepirate.github.io/empire-contre-intox/rss.xml`, déclaré dans le
`<head>` de `index.html` (`<link rel="alternate" type="application/rss+xml">`).

- **Ne pas éditer `rss.xml` à la main** : il est **généré** depuis les cartes de
  `index.html` par `scripts/generate-rss.py`. Toute info (titre, lien, image,
  résumé, tags, badge, auteurs) est donc reprise telle quelle de la carte d'index
  → **mettre l'index à jour d'abord**, puis régénérer.
- **Après toute modification de l'index** (ajout, modification, **réordonnancement**
  ou renumérotation d'un dossier), lancer depuis la racine :

  ```bash
  python3 scripts/generate-rss.py   # relit index.html → réécrit rss.xml
  ```

- Le script produit un `<item>` par carte (dossiers + carte « Calendrier des lives ») :
  `title` (« Dossier N — Titre »), `link`/`guid` absolus, `dc:creator` (auteurs +
  mention de participation), `description` + `content:encoded` (HTML riche : image,
  résumé, crédit, tags, lien, rappel de licence CC BY-NC-ND 4.0), `enclosure` +
  `media:content`/`media:thumbnail` (image hero, taille réelle), `category` (tags +
  badge), `pubDate` (date du 1er commit git du dossier ; repli sinon). Le flux porte aussi
  `<creativeCommons:license>` et un copyright « contenu sous licence CC BY-NC-ND 4.0 ».
  Items **antéchronologiques** (récents en tête).
- **Vérifier** que `rss.xml` reste bien formé : `python3 -c "import xml.dom.minidom;
  xml.dom.minidom.parse('rss.xml')"`, et qu'il compte le **bon nombre d'items**.
- À la **publication**, stager `rss.xml` **avec** `index.html` (sinon le flux pointe
  vers un dossier non publié, ou omet le nouveau — cf. piège des références orphelines).

## Licence de contenu (obligatoire)

Sauf mention contraire, les contenus éditoriaux, textes, transcriptions, images et médias du site sont publiés sous licence **Creative Commons Attribution – Pas d’Utilisation Commerciale – Pas de Modification 4.0 International** (**CC BY-NC-ND 4.0**) : https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr

Règles à maintenir :

- Conserver `LICENCE-CONTENU.md` à la racine : il décrit le périmètre (contenus éditoriaux) et les exceptions (code, scripts techniques, marques/logos, avatars ou ressources tierces crédités séparément).
- Chaque page HTML doit contenir dans le `<head>` :
  - `<link rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr">` ;
  - `<meta name="rights" content="… CC BY-NC-ND 4.0 …">`.
- Chaque page HTML doit afficher dans son footer un cartouche `.eci-license` : « partage autorisé avec attribution, sans usage commercial ni modification », avec lien vers la licence officielle et lien relatif vers `LICENCE-CONTENU.md`.
- Le RSS est généré avec un rappel de licence dans chaque item et un élément `<creativeCommons:license>` au niveau du channel.
- Pour tout nouveau contenu tiers (images, modèles 3D, vidéos, polices, extraits), créditer explicitement et ne pas laisser croire qu'il est couvert par la licence ECI si ses droits sont différents.

## Liens externes / compagnons interactifs

Si un dossier a un compagnon externe (ex. simulation `https://thesamlepirate.github.io/NebulaSim/...`) :

- le surfacer à plusieurs endroits (CTA hero, lien nav sticky, mention footer) ;
- toujours `target="_blank" rel="noopener"`.

### Compagnon embarqué (préféré quand c'est possible)

Quand l'application compagnon est **de l'équipe** et que son build tient dans le dépôt,
mieux vaut l'**embarquer** que de dépendre d'un hébergeur tiers : le dossier reste
consultable si l'hébergeur disparaît, et le site n'envoie plus ses lecteurs ailleurs.
Le Dossier XXVII sert de gabarit (`samlepirate/ordinateur-1983/simulateur/`) :

- construire avec des **chemins relatifs** (`vite build --base=./`) — sinon les assets
  sont cherchés à la racine du domaine et rien ne se charge depuis un sous-dossier ;
- copier le `dist/` dans un sous-dossier **nommé autrement que `dist`** : `dist/` est
  couvert par `.gitignore` **et** `.dockerignore`, et le build ne serait jamais publié ;
- retoucher l'`index.html` produit : `lang`, `<title>`, `<meta name="rights">`, favicon
  ECI, et un **lien de retour discret** vers le dossier ;
- **déclarer chaque fichier** dans `config/legacy-public-manifest.json` — les noms de
  bundle portent un hash qui change à chaque rebuild ;
- vérifier avant de conclure qu'aucun secret n'est embarqué dans le bundle, et que le
  build n'appelle ni CDN ni police distante ;
- laisser un `README.md` à côté du build : provenance, commande de rebuild, retouches à
  réappliquer, et limites connues ;
- ne plus laisser traîner l'ancienne URL externe dans le dossier **ni dans `sources/`**
  (page `sources.html` comprise) — sauf à la conserver explicitement comme mention de
  provenance dans l'audit.

Un build **module ES** (cas de Vite) ne se charge pas depuis `file://` : le vérifier
avec un serveur local (`python3 -m http.server`), pas par double-clic.

## Dossiers pilotés par des données (ex. Horloge de l'Univers)

Certains dossiers affichent le **même jeu de données** sur plusieurs pages (`horloge-univers/` : `clock.html`, `calendrier.html`, `chronos.html`). Règles :

- Tenir une **source canonique** versionnée : `horloge-univers/assets/events.json` — les 46 événements du Calendrier Cosmique (`n`, `cat`, `ago` en années, `t`, `d`, `img`), du Big Bang à « Maintenant — vous êtes ici ».
- Pour rester **autonomes en `file://`** (pas de `fetch`), `clock.html` et `calendrier.html` embarquent le tableau `UNI` **inline** ; il doit rester **strictement identique** à `events.json` (mêmes événements, même ordre). Le vérifier par `diff` après chaque modification — clock ↔ calendrier doivent être identiques.
- Chaque événement pointe vers une **super-image existante** dans `assets/super-images/` (index `01 → 46`, dans l'ordre exact du tableau).
- `clock.html` mappe **00:00:00 = Big Bang → 23:59:59 = maintenant** (toute l'histoire de l'univers sur 24 h, pilotée par l'heure locale).

## Exactitude scientifique (contenu pédagogique)

Le contenu doit rester **défendable** :

- Dater chaque événement avec une valeur standard (ex. Terre ≈ 4,54 Ga) ; conserver les **bornes officielles ICS/GTS** là où elles s'appliquent (`chronos.html`).
- Préférer des **fourchettes** et des marqueurs de prudence (« ~90–96 % », « probablement », « selon les estimations », « des indices suggèrent ») aux **affirmations absolues** (« tous », « tout le gaz », « presque tous les plans »).
- En cas de révision des données, la répercuter dans **les trois** vues (`events.json`, `clock.html`, `calendrier.html`) et, si concerné, dans `chronos.html`.

## Vérification scientifique & sources (obligatoire — Dossier XXVIII)

**Pour CHAQUE dossier** — existant ou nouveau —, refaire le **même travail de vérification** et **centraliser toutes les sources dans le dossier `sources/`** (Dossier XXVIII, « Les Sources »). Aucune page ne doit affirmer sans preuve traçable. Le travail déjà réalisé pour les dossiers existants sert de gabarit (voir `sources/*.md`, `sources/README.md` et `sources/sources.html`).

### 1. Vérifier chaque information, affirmation et donnée
- Extraire du dossier **toutes les affirmations factuelles et données chiffrées** : dates, durées, quantités, pourcentages, températures, noms d'espèces / de personnes / de missions, bornes géologiques, etc.
- Les **vérifier par recherche web** en **lançant plusieurs agents en parallèle** (un par thème ou par sous-ensemble de claims) — outil `Agent`, plusieurs appels dans un même message.
- Sources **autoritatives** d'abord : NASA, ESA, USGS, IUGS/ICS (`stratigraphy.org`), Smithsonian, articles à comité de lecture ; encyclopédies (Wikipédia) en dernier recours.
- Attribuer à chaque claim un **verdict** : ✅ confirmé · ⚠️ approximatif / à nuancer · 🔶 débattu · ❌ erroné. **Corriger la page** pour les ❌ ; **nuancer** (fourchettes, « probablement », « selon les estimations ») pour les ⚠️/🔶.

### 2. Documenter dans `sources/` (un ou plusieurs `.md`)
- **Audit par dossier** — `sources/dossier-<n-nom>.md` : une entrée par affirmation → *citation → verdict → valeur de référence → source(s) avec URL réelle*. Terminer par une « ## Synthèse » (items ⚠️/🔶/❌ + corrections).
- **Références primaires (DOI)** — `sources/refs-doi-<n-nom>.md` : littérature à comité de lecture → *donnée → citation complète (auteurs, année, revue, vol., pages) → DOI → ce que l'article établit*.
- **Anti-hallucination — RÈGLE ABSOLUE :** ne **JAMAIS inventer ni deviner un DOI**. Vérifier chaque DOI (résolution `https://doi.org/<doi>` et/ou Crossref `api.crossref.org/works/<doi>` ; concordance titre / auteurs / revue / pages). À défaut de DOI fiable : écrire « DOI non trouvé — [source institutionnelle] » plutôt que d'en fabriquer un.
- Mettre à jour l'**index** `sources/README.md` (table des fichiers + bilan global : ✅/⚠️/🔶/❌ et corrections appliquées).

### 3. Surfacer dans la page `sources/sources.html` (Dossier XXVIII)
Page codex ECI qui rassemble les sources de **tous** les dossiers, avec **barre de recherche** (filtre accents-insensible sur titre / donnée / résumé / auteur / revue / DOI). Pour chaque vérification, ajouter aux tableaux JS de `sources.html` :
- une **fiche** dans la section thématique : *donnée → court résumé → verdict (badge couleur) → source(s) cliquable(s) → image* (réutiliser une `super-image` ou l'image hero du dossier) ;
- une entrée dans **« Références scientifiques »** : *titre (lien DOI) → citation → badge DOI → résumé/abstract* ;
- une entrée dans la **bibliographie** si une nouvelle source institutionnelle est utilisée.
- Chaque élément interrogeable porte un attribut **`data-search`** (généré via `norm()` : minuscule + accents retirés). Mettre à jour les **compteurs** du hero (fiches, DOI). Tous les liens DOI/externes en `target="_blank" rel="noopener"`.

### 4. Boucler
- Répercuter toute **correction de donnée** dans la page d'origine **et** dans ses vues liées (dossiers data-driven : `events.json` + `clock.html` + `calendrier.html` + `chronos.html`).
- Vérifier la cohérence (clock ↔ calendrier identiques ; `diff` à zéro) et que `sources/sources.html` se charge correctement (recherche, images, liens).

## Règles de contenu

- La transcription reste **visible et complète** (jamais réduite à un résumé).
- Les ajouts éditoriaux clarifient/orientent/contextualisent.
- Ne pas supprimer les formulations orales si elles font partie du document.
- Les titres de chapitres peuvent être éditorialisés, le contenu original reste présent.
- Éviter les blocs trop longs sans respiration visuelle.

## Publication GitHub Pages (miroir, via `gh`)

- Dépôt : `TheSamLePirate/empire-contre-intox` — Pages servies depuis `main` / racine.
- **Commit / push uniquement quand l'utilisateur le demande.** Messages en français ; terminer chaque message de commit par :
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- Après push, Pages reconstruit (~1 min). Vérifier :
  - `gh api repos/TheSamLePirate/empire-contre-intox/pages/builds/latest --jq .status` → `built` ;
  - `curl -s -o /dev/null -w "%{http_code}"` sur les URLs touchées → `200`.
- `.gitignore` en place : `.DS_Store`, fichiers verrou office (`.~lock.*#`), `a_traiter/` (sources de travail privées). Ne jamais committer ce genre de fichiers.
- **Toujours stager `rss.xml` avec `index.html`** (régénéré via `scripts/generate-rss.py`) pour que le flux reflète les dossiers publiés.

## Déploiement Portainer (domaine `empire-contre-intox.com`)

En plus de GitHub Pages, le site peut être servi comme site statique Docker/Nginx sur le serveur Portainer.

- Domaine cible : `https://empire-contre-intox.com`
- Port serveur attendu : `3004` → conteneur Nginx `80`
- Stack Portainer : `empire-contre-intox-site`
- Fichiers de déploiement à la racine du dépôt :
  - `Dockerfile` — image Nginx statique ;
  - `nginx.conf` — configuration de cache/headers, service des fichiers et proxy `/api/` ;
  - `docker-compose.yml` — service `site`, mapping `${SITE_PORT:-3004}:80`, service interne `counter`, volume `counter-data` ;
  - `.dockerignore` — exclut `.git`, `.pi`, `.env*`, `a_traiter/` et fichiers locaux privés/hors sujet ;
  - `counter/` — mini-service Bun + SQLite pour le compteur public de visites par page ;
  - `assets/visit-counter.js` — script front qui incrémente et affiche le compteur de la page courante.

Commande recommandée depuis la racine du dépôt :

```bash
scripts/deploy-portainer.sh --check   # préflight : RSS, XML, docker compose
scripts/deploy-portainer.sh           # régénère le RSS, déploie, attend healthy, vérifie les URLs
```

Le script appelle le CLI `../devServerTest` qui construit l'image localement en `linux/amd64`, l'envoie à Portainer, puis crée/met à jour la stack. Ne jamais committer les secrets Portainer (`../devServerTest/.env`).

Options utiles :

```bash
scripts/deploy-portainer.sh --no-rss          # ne pas régénérer rss.xml
scripts/deploy-portainer.sh --no-http-check   # ignorer les curl publics
scripts/deploy-portainer.sh --timeout 300     # attendre plus longtemps le healthcheck
```

Commande manuelle équivalente si le script doit être contourné :

```bash
cd ../devServerTest
bun run port-manager deploy ../empire-contre-intox --name empire-contre-intox-site
```

Après déploiement, le conteneur doit être `running` et `healthy`, et les URLs `https://empire-contre-intox.com/`, `/rss.xml`, `/LICENCE-CONTENU.md` et `/api/count?path=/` doivent répondre `200`.

## Compteur public de visites par page

Le site affiche un compteur public minimal : **nombre total de visites sur cette page**. Il ne s'agit pas d'un compteur de visiteurs uniques.

Architecture :

- `counter/server.ts` : service Bun exposant `POST /visit`, `GET /count?path=/...` et `GET /health` ;
- stockage SQLite persistant dans le volume Docker `counter-data` (`/data/visits.sqlite`) ;
- Nginx proxifie `/api/` vers `http://counter:3001/` ;
- `assets/visit-counter.js` est chargé par chaque page et appelle `POST /api/visit` avec le `location.pathname` normalisé ;
- chaque footer affiche un élément `[data-visit-counter]` avec le libellé `N visites sur cette page`.

Règles de confidentialité :

- ne pas stocker d'IP, d'user-agent, de cookie ou d'identifiant utilisateur ;
- stocker uniquement `path`, `visits`, `created_at`, `updated_at` ;
- accepter que les refreshs, bots ou appels directs incrémentent le compteur : c'est un compteur de **visites totales**, volontairement simple.

Pour un nouveau HTML, vérifier qu'il contient :

```html
<span class="eci-visit-counter" data-visit-counter>— visites sur cette page</span>
<script src="<chemin-relatif>/assets/visit-counter.js" defer></script>
```

## Vérification finale

Avant de terminer :

- ouvrir `index.html` et chaque page HTML référencée ;
- vérifier images chargées, liens (nav, retour accueil, compagnons externes), pas de scroll horizontal ;
- vérifier numérotation et compteurs cohérents (index ↔ eyebrows des pages) ;
- **vérifier que chaque affirmation et donnée du dossier est sourcée** dans `sources/` (audit `.md` + références DOI) **et surfacée** dans `sources/sources.html` (fiche + référence) ;
- **régénérer `rss.xml`** (`python3 scripts/generate-rss.py`) et vérifier qu'il est bien formé + qu'il contient le nouveau dossier (voir « Flux RSS ») ;
- si publication demandée : confirmer build Pages `built` + `200` sur les URLs, puis redéployer Portainer si le domaine principal doit refléter la modification ;
- vérifier que les pages touchées contiennent la licence (`.eci-license`, métadonnées de licence, lien local `LICENCE-CONTENU.md`) ;
- vérifier qu'aucun footer ne contient encore « Page HTML autonome créée à partir… » ;
- mentionner les fichiers créés ou modifiés.
