# Design du dossier « Le Son » — un thème sonore riche dans le codex ECI

Même ambition que Entropie, Lumière et l'Ordinateur de 1983 : la page **est** son sujet. Ici le sujet est une onde de pression qu'on ne voit pas ; le dossier la rend visible partout où elle passe, avec les outils que le script décrit lui-même (oscilloscope, spectrogramme, figures de Chladni, sonar, membrane basilaire), jamais avec un décor. **Règle d'or : chaque effet est une vraie représentation d'un signal, calculée, et il coûte moins qu'une frame.**

Voie **A** : jetons codex intacts (nuit, or, parchemin, Cinzel / Fraunces, rayons 2–3 px, filets or, sceau conique, équerres, fil de progression, atmosphère + grain). Un seul accent secondaire, **`--phos`**, le vert-turquoise du phosphore d'oscilloscope. Les rampes de couleur des spectrogrammes ne sont pas un accent : ce sont des **données**, réservées aux endroits où un spectre est réellement affiché.

**Prototype vivant à produire avant la page** : `design-preview.html` (autonome, `file://`), comme pour Lumière — hero, un bandeau d'acte, un chapitre, un bloc de formule, un bloc d'atelier éteint puis activé, à valider sur mobile et PC avant d'écrire la page.

---

## 1. Palette et jetons

```css
--phos:#5fe3c8; --phos-deep:#1f9c86; --phos-glow:rgba(95,227,200,.35);   /* trace d'oscilloscope, sonde, curseur de lecture */
--sonar:#4ee38a;                                                          /* balayage sonar, acte VI seulement */
--spectro: linear-gradient(90deg,#050811,#1c1c5c 25%,#7a1f8f 50%,#e0552b 75%,#ffe9a8);   /* rampe de spectrogramme (données) */
--plasma: linear-gradient(90deg,#0b1a3a,#1e5aa8 40%,#5fe3c8 70%,#f3d98a);               /* rampe PWS Voyager (acte IX, données) */
--grid: rgba(95,227,200,.10);                                              /* quadrillage d'oscilloscope */
```

Fond : `--void` → `--abyss` en dégradé vertical, halo `--phos-deep` à 12 % **en bas** de l'écran (le son monte du sol, de la membrane, du sub). Le fil de progression est une **trace d'oscilloscope** : un trait `--phos` qui avance, avec un léger halo, et dont l'épaisseur pulse au rythme d'un LFO très lent (0,2 Hz) — coupé en `prefers-reduced-motion`.

## 2. Catalogue des effets (où, comment, coût)

| Effet | Où | Technique | Coût / garde-fou |
|---|---|---|---|
| **Onde vivante du hero** | derrière le titre (`#hero-wave`, canvas plein hero) | **signal calculé** : somme de 6 harmoniques d'un la grave (55 Hz) aux amplitudes d'un timbre de corde, tracée comme une trace d'oscilloscope (`--phos`, halo par double tracé), avec un LFO d'amplitude ; à l'entrée, la trace « s'allume » en 1,2 s ; le pointeur ajoute une composante (position x = fréquence, y = amplitude) — la page réagit comme un synthé. Sous le canvas, l'image hero générée (Codex), assombrie à 45 %. | canvas 2D, résolution plafonnée à 1 × DPR ≤ 2 et 1 280 px de large ; **30 i/s**, `requestAnimationFrame` coupé dès que le hero sort de l'écran ; en `reduced-motion`, trace statique. Budget : < 1,5 ms par frame mesuré. |
| **Phosphore** | mot-accent du h1 (`.phos`), numéros d'acte, curseur de lecture des ateliers | `text-shadow` double (`--phos` 0 0 6 px, `--phos-glow` 0 0 24 px) + `background-clip:text` sur un dégradé `--phos` → `--gold-bright` animé 9 s (remplace la foil or de la charte sur ce seul mot ; l'or reste sur les boutons) | jamais sur le corps de texte ; un seul mot phosphore par écran |
| **Quadrillage d'oscilloscope** | fond de `.atmos` (à la place de la grille gravée de la charte), fond des blocs de formule | CSS `repeating-linear-gradient` `--grid` 40 px + axe central plus marqué, masque radial ; sur les formules, le quadrillage à 6 % avec la formule qui « s'affiche » comme une trace (fondu 300 ms au reveal) | zéro JS ; pas d'image |
| **Spectrogramme procédural** | couche fixe très discrète derrière les actes IV, VIII (`#spectro-bg`) | canvas basse résolution (≈ 160 × 90 px, mis à l'échelle avec flou) : quelques « cris » FM (chirps descendants) et une bande de bruit qui défilent lentement, rampe `--spectro` à 18 % d'opacité, `mix-blend-mode:screen` | recalculé **une colonne par 100 ms**, pas par frame ; suspendu hors écran ; figé en `reduced-motion` |
| **Fronts d'onde (membrane)** | bandeaux d'acte (`.act-band`), sous les schémas de propagation | SVG : cercles concentriques nés au centre, rayon = c·t, opacité décroissante en 1/r, **λ vrai à l'échelle annoncée** (le bandeau dit « λ = 34 cm à 1 kHz ») ; animation CSS `r` 4 s en boucle ; en Doppler (acte VI) le centre se déplace et les cercles s'empilent devant | ≤ 8 cercles ; CSS uniquement ; coupé en `reduced-motion` |
| **Numéros d'acte en figure de Chladni** | `.act-num` | chiffre romain en contour or, rempli par un **masque SVG** de lignes nodales calculées (mode (m,n) choisi par acte, `cos(mπx)cos(nπy) ± cos(nπx)cos(mπy)` rendu une fois en SVG path), halo `--phos` au survol | un `<svg>` statique par acte, généré au build (script Python), < 3 ko |
| **Filets « forme d'onde »** | séparateurs entre actes (`hr.wave-rule`), bordure haute des cartes d'atelier | `<svg>` d'un vrai signal (le mot « son » prononcé : forme d'onde exportée d'un enregistrement de l'équipe, ou synthèse annoncée) tracé en `--phos` à 55 %, 1–2 px ; à l'intérieur des chapitres, les filets restent des hairlines or | un seul path partagé par `<use>` |
| **Ping sonar** | acte VI (bandeau et vignette S16) | balayage radial `--sonar` conique animé (CSS `conic-gradient` + `rotate`), un écho qui s'allume au passage | acte VI seulement ; c'est le seul endroit vert |
| **Bits et sillon** | acte V | fond de bandeau : sillon de vinyle en `repeating-radial-gradient` très fin, puis les mêmes anneaux qui se **quantifient** en marches à droite (l'analogique devient numérique en un dégradé) | CSS pur |
| **Onde de plasma** | acte IX, bandeau et bloc Voyager | fond : spectrogramme PWS stylisé (deux tons qui montent de 300 Hz à 2–3 kHz), rampe `--plasma`, tracé SVG statique avec un curseur de temps animé | SVG < 4 ko ; le vrai spectre est dans l'atelier S54 |
| **Vignettes vivantes des ateliers** | grille des ateliers (sommaire) et **image fixe de chaque atelier éteint** | SVG/canvas légers animés par le même moteur que les ateliers (une corde qui vibre, une figure de Chladni qui bascule, deux sinus qui battent, un spectrogramme qui défile) ; au survol : `translateY(-6px)` + halo phosphore | chaque vignette < 2 ko, 15 i/s, arrêtée hors écran ; **jamais** de son sans clic |
| **VU / LUFS** | compteur du `signal-board` (chiffres du hero), cartouche de sécurité auditive | barres qui montent comme un VU-mètre à l'entrée (easing quartique 2,2 s), chiffres tabulaires | une fois, à l'entrée |
| **Fil de progression** | haut de page | trace `--phos` + halo, épaisseur pulsée 0,2 Hz | idem charte, couleur changée |

Effets **exclus** volontairement : particules, « ondes » décoratives en dégradé violet, égaliseur qui danse sans signal, faux spectres aléatoires, parallaxe multi-couches, bokeh, aberration chromatique (c'est l'effet de Lumière : chaque dossier a le sien).

## 3. Identité par acte (une voix par acte)

| Acte | Motif | Couleur de donnée | Bandeau |
|---|---|---|---|
| Ouverture | onde longitudinale (particules sur place, front qui avance) | `--phos` | rangée de points qui se serrent et se desserrent |
| I. Le lieu et le nombre | grotte : écho, fronts qui reviennent d'une paroi | or | fronts d'onde réfléchis par une paroi irrégulière |
| II. Le siècle de la mesure | oscilloscope : quadrillage, trace, curseurs de mesure | `--phos` | trace d'une corde pincée avec cotes Δt |
| III. Le son comme musique | série harmonique : barres 1 f, 2 f, 3 f… | or / phosphore | barres qui s'allument dans l'ordre des partiels, accord en surimpression |
| IV. L'oreille fabrique | cochlée : spirale et onde progressive sur la membrane | `--spectro` (doux) | spirale avec le maximum qui se déplace avec f |
| V. La trace et la machine | sillon → bits | or | sillon qui se quantifie |
| VI. Voir avec le son | sonar : balayage, écho, Doppler | `--sonar` | ping + cercles empilés devant une source mobile |
| VII. Les autres scènes et les intox | carte de bruit : isophones d'une ville, la nuit | or | contours Lden qui pulsent |
| VIII. Les autres auditeurs | spectrogramme : cris FM descendants, chant grave | `--spectro` | spectrogramme procédural, chirps de chauve-souris et bande de baleine |
| IX. Hors de l'air | plasma : deux tons qui montent | `--plasma` | spectre PWS stylisé, curseur de temps |
| Clôture | la trace s'éteint (rémanence de phosphore) | `--phos` → nuit | la trace du hero revient et s'éteint en 2 s |

Règle : **un effet fort par écran**. Le hero et les bandeaux d'acte ont le droit d'être spectaculaires ; les chapitres restent or et parchemin, avec le quadrillage à 6 % derrière les formules pour seul rappel.

## 4. Ateliers : même moteur, deux états

- **Éteint** (état par défaut) : image fixe **vivante** (vignette SVG/canvas légère, 15 i/s, arrêtée hors écran) sous un bouton « Activer l'atelier » et le cartouche ⛶ pour les gros ateliers ; les trois paragraphes (Comment l'utiliser / Ce que ça montre / Sens de lecture) sont visibles dès cet état, pour qu'on sache ce qu'on va lancer. Aucun `AudioContext`, aucun worker, aucun bundle React chargé.
- **Activé** : le bundle des ateliers (`son-viz.js`, ~330 ko avec React) se charge **au premier clic « Activer » de la page**, pas avant ; le composant se monte à la place de la vignette avec un fondu de 300 ms « allumage de phosphore ». Bouton « Éteindre » : démontage, arrêt du worker et de l'audio, retour à la vignette.
- **Rendu** : canvas 2D pour les signaux (traces, enveloppes), **WebGL** pour le spectrogramme (S18, S42, S46 : texture défilante, une colonne par trame audio) et le bac à ondes (S09 : FDTD en WebWorker, upload d'une texture par frame), SVG pour tout ce qui est courbe mesurée et étiquetée (axes, formules, cotes). Résolution plafonnée à DPR 2 ; hors plein écran, hauteur de canvas ≤ 70 vh.
- **Couleurs** : les données gardent leurs conventions (spectrogramme en `--spectro`, trace en `--phos`, mesure et axes en or), jamais de décor à l'intérieur d'un atelier.
- **Plein écran** : Fullscreen API sur le conteneur, repli en superposition CSS ; en plein écran le quadrillage d'oscilloscope remplit l'écran, les commandes passent en tiroir.

## 5. Performance (budget, pas intention)

- **Page seule (aucun atelier activé)** : < 400 ko transférés hors polices et image hero (HTML + CSS + JS d'effets ≤ 60 ko) ; Lighthouse mobile ≥ 90 en performance ; aucune tâche longue > 50 ms au chargement ; `content-visibility:auto` + `contain-intrinsic-size` sur chaque chapitre.
- **Un seul ordonnanceur `requestAnimationFrame`** pour tous les effets de page (hero, spectrogramme de fond, vignettes) ; chaque effet déclare sa cadence (30, 15 ou 10 i/s) et n'est appelé que si son `IntersectionObserver` le dit visible ; onglet masqué → tout s'arrête (`visibilitychange`).
- **Ateliers** : un seul `AudioContext`, un seul atelier audio actif à la fois, workers terminés à l'extinction ; FDTD à 200 × 200 en float32 dans un worker, 60 i/s de calcul mais upload de texture à 30 ; FFT maison en TypedArray, fenêtres précalculées ; pas de `setInterval`.
- **Mesure** : onglet Performance à 1 440 et 390 px, budget ≤ 4 ms de style/layout par frame au scroll, ≤ 8 ms de script par frame pendant un atelier ; profil sur un téléphone d'entrée de gamme avant de valider un effet de page.
- **Images** : hero et illustrations en WebP + PNG de repli, `decoding="async"`, `loading="lazy"` sous la ligne de flottaison, dimensions déclarées ; vignettes d'ateliers en SVG inline, pas en bitmap.
- **Polices** : Cinzel + Fraunces via Google Fonts avec `preconnect`, `font-display:swap` ; aucune police supplémentaire (la mono n'est pas nécessaire ici).

## 6. Accessibilité et largeurs

- `prefers-reduced-motion` : ordonnanceur arrêté, trace du hero statique, fronts d'onde figés, spectrogramme de fond figé, vignettes statiques, plus aucune pulsation ; les ateliers gardent leurs animations **à la demande** (elles sont le contenu), mais sans autoplay.
- Contraste : `--parch` sur `--void` ≥ 7:1 ; `--phos` n'est jamais une couleur de texte courant (seulement titres ≥ 2 rem, traces, curseurs) ; les rampes de spectrogramme ont une légende et une échelle en or.
- Chaque effet SVG/canvas est `aria-hidden` ; chaque atelier a un nom, une description et des commandes clavier (curseurs = `input[type=range]` natifs stylés, boutons = `button`) ; `:focus-visible` or brillant partout.
- Largeurs : bloc `eci-wide-style` de la charte copié tel quel pour la colonne de lecture ; les bandeaux d'acte, les filets d'onde et les ateliers sont **pleine largeur** (`margin-inline: calc((100% - <largeur>) / 2)`, jamais `transform`) ; contrôle à 360 / 768 / 1 280 / 1 920 / 2 560 / 3 840 px, portrait et paysage, `scrollX === 0`.

## 7. À produire, dans l'ordre

1. `design-preview.html` : hero (onde vivante + phosphore), un bandeau d'acte (II, oscilloscope), un chapitre avec une formule sur quadrillage, un bloc d'atelier éteint (vignette S14) puis activé (S14 réel, en Web Audio, sans React), le pied de page. Mesurer le budget par frame et le poids.
2. Générer au build les 10 masques de Chladni des numéros d'acte, le path du filet « forme d'onde » et les **deux seuls schémas SVG conservés** (V07 chaîne pression → percept, V08 chaîne de la trace), au cahier des charges de `09-schemas-decisions.md` ; les 17 autres schémas du script sont remplacés par des ateliers.
3. Vignettes vivantes des 26 ateliers de la première version (SVG/canvas < 2 ko chacune).
4. Bundle `son-viz.js` chargé à la demande ; `scripts/build-son-viz.sh` calqué sur `build-lumiere-viz.sh` (worker FDTD, worklets audio, empreintes, `stamp-assets.py`).
5. Images générées (`images_a_generer.md`) : hero « une onde de pression dans une salle », une illustration par acte, la vignette d'index — le prototype sert de référence de palette aux prompts.
