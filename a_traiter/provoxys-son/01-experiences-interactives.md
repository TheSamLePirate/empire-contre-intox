# Ateliers interactifs du dossier « Le Son » — 55 fiches

Source structurée : `ateliers.py`, synchronisée avec le maître éditorial `script-live-son.md` ; ce catalogue et les blocs Atelier sont générés depuis cette source. Les fiches décrivent des composants à réaliser, pas des ateliers déjà opérationnels. Le dossier intègre les ateliers **dans les chapitres** : chaque fiche donne le **mode d’emploi** (ce que fait le lecteur), **ce que ça montre** (ce qui est calculé et affiché) et le **sens de lecture** (où regarder d’abord, ce qui doit changer, ce qu’on en conclut). Même pipeline que Lumière / Entropie (composants React bundlés par esbuild, `mount.tsx` + `IntersectionObserver`, `noscript` de repli, `prefers-reduced-motion`), plus le moteur audio partagé du §8.

Légende : ★★★ indispensable pour la thèse du dossier · ★★ confort · ★ bonus. Effort S/M/L/XL. Audio : 🔊 le navigateur fait entendre ; 🎙 le micro est utilisé ; 👁 visualisation seule.

## Vue d’ensemble

| # | Atelier | Chapitre d’accueil (script) | Prio | Effort | Audio | Plein écran |
|---|---|---|---|---|---|---|
| S01 | Onde longitudinale | Grandeurs | ★★★ | S | 🔊 | — |
| S02 | Newton–Laplace | Équation de Newton–Laplace | ★★ | S | 🔊 | — |
| S03 | Cloche de Boyle | Robert Boyle (1627–1691) et la pompe à vide | ★★★ | S | 🔊 | — |
| S04 | La corde de d’Alembert | Corde de Mersenne | ★★★ | L | 🔊 | oui |
| S05 | Tuyaux ouverts et fermés | Tuyaux | ★★ | M | 🔊 | — |
| S06 | Chladni | Cordes, tuyaux, plaques | ★★★ | L | 🔊 | oui |
| S07 | Tube de Kundt | Cordes, tuyaux, plaques | ★★ | M | 🔊 | — |
| S08 | Tube de Rubens | Cordes, tuyaux, plaques | ★ | M | 🔊 | — |
| S09 | Bac à ondes 2D | 4. Interférence et ondes stationnaires — les modes de la pièce | ★★★ | XL | 👁 (+🔊 sonde) | oui |
| S10 | Gradins d’Épidaure | Grèce : Pythagore, Archytas, Aristote, Épidaure | ★★ | M | 🔊 | — |
| S11 | Inverse du carré et décibels | 6. Distance et atténuation — inverse du carré, addition, absorption | ★★★ | S | 🔊 | — |
| S12 | Absorption dans l’air | 6. Distance et atténuation — inverse du carré, addition, absorption | ★★ | M | 🔊 | — |
| S13 | Doppler — qui bouge ? | 3. Les deux à la fois + vent | ★★★ | M | 🔊 | oui |
| S14 | Battements | 1. Battement acoustique du premier ordre | ★★★ | M | 🔊 (binaural : casque) | — |
| S15 | Résonateur de Helmholtz | Instruments = machines à conditions aux limites | ★★ | S | 🔊 | — |
| S16 | Sonar à impulsion | Physique du geste | ★★★ | M | 🔊 (ping ralenti) | — |
| S17 | Fourier à la main | Série de Fourier | ★★★ | L | 🔊 | oui |
| S18 | Le spectrogramme | 4. Analyser — la transformée de Fourier discrète et la FFT (1965) | ★★★ | XL | 🎙🔊 | oui |
| S19 | Échantillonnage et Nyquist | 2. Le repliement (aliasing) — ce que le filtre anti-repliement empêche | ★★★ | M | 🔊 | — |
| S20 | Filtres et égaliseur | 4. Analyser — la transformée de Fourier discrète et la FFT (1965) | ★★ | M | 🎙🔊 | oui |
| S21 | Compression perceptive (MP3) | 6. Jeter ce que l’oreille ignorera — MP3 (1993), AAC (1997), Opus (2012) | ★★ | L | 🔊 | oui |
| S22 | Accordeur (détection de hauteur) | 3. Battements du second ordre — consonances désaccordées | ★★★ | M | 🎙 | — |
| S23 | Convolution et réverbération (T60 au clap) | Faire taire la pierre — acoustique architecturale | ★★★ | L | 🎙🔊 | oui |
| S24 | Calculateur de Sabine | Faire taire la pierre — acoustique architecturale | ★★★ | M | 🔊 | oui |
| S25 | Vocodeur de phase | 5. Modéliser la voix — vocodeur (1939) et LPC (1971) | ★ | L | 🎙🔊 | oui |
| S26 | Karplus-Strong et modèles physiques | Instruments = machines à conditions aux limites | ★ | M | 🔊 | — |
| S27 | Monocorde de Pythagore | Grèce : Pythagore, Archytas, Aristote, Épidaure | ★★★ | S | 🔊 | — |
| S28 | Timbre additif | Analyse du timbre | ★★★ | M | 🔊 | — |
| S29 | Tempéraments | Systèmes dans le monde — ne pas occidentalo-centrer | ★★★ | L | 🔊 | oui |
| S30 | Accords et rugosité | Étage 1 — la rugosité (Helmholtz → Plomp & Levelt → Sethares) | ★★★ | L | 🔊 | oui |
| S31 | Le clavier des systèmes du monde | Systèmes dans le monde — ne pas occidentalo-centrer | ★ | M | 🔊 | — |
| S32 | Inharmonicité et accord du piano | Instruments = machines à conditions aux limites | ★ | M | 🔊 | — |
| S33 | Synthèse FM (Chowning) | XXe siècle musical où l’acoustique redevient explicite | ★ | M | 🔊 | — |
| S34 | Le studio (mini-DAW) | 7. Depuis 1990 — streaming, normalisation et synthèse | ★★ | XL | 🎙🔊 | oui |
| S35 | Loudness war | 7. Depuis 1990 — streaming, normalisation et synthèse | ★ | M | 🔊 | — |
| S36 | Courbes isosoniques | Sonie et masquage | ★★★ | M | 🔊 | — |
| S37 | Masquage | Sonie et masquage | ★★ | M | 🔊 | — |
| S38 | Shepard, Risset, triton | Hauteur | ★★ | M | 🔊 | — |
| S39 | Où est le son ? (ITD / ILD / HRTF) | Où est le son ? — localisation spatiale (ITD, ILD, HRTF) | ★★ | L | 🔊 casque obligatoire | oui |
| S40 | Précédence (Haas) | Où est le son ? — localisation spatiale (ITD, ILD, HRTF) | ★ | S | 🔊 casque | — |
| S41 | Source-filtre : la voix | Voix — deux étages, pas un tuyau magique | ★★★ | L | 🔊 | oui |
| S42 | Vos propres voyelles | Voix — deux étages, pas un tuyau magique | ★★★ | L | 🎙 | oui |
| S43 | L’oreille de bout en bout, puis la cochlée | Entendre — de Helmholtz à la neuroacoustique | ★★ | L | 🔊 | — |
| S44 | Jusqu’où entendez-vous ? | Entendre — de Helmholtz à la neuroacoustique | ★★ | S | 🔊 (niveau plafonné) | — |
| S45 | Sécurité : la dose de bruit | Entendre — de Helmholtz à la neuroacoustique | ★★ | S | 👁 | — |
| S46 | La chauve-souris | Chauves-souris — environ 1 500 espèces, ~20 % des mammifères | ★★★ | L | 🔊 time-expansion ×10, annoncé | oui |
| S47 | Le cachalot | Odontocètes — le même algorithme dans l’eau | ★★ | M | 🔊 transposé ou enregistrement NOAA | — |
| S48 | Le canal SOFAR | Guerre, souveraineté, mer | ★★ | M | 👁 | oui |
| S49 | Infrasons : l’échelle | Échelle | ★★ | M | 👁 (option 🔊 30–60 Hz) | — |
| S50 | Hunga Tonga fait le tour du monde | Sources naturelles — catalogue à tenir propre | ★ | M | 👁 | — |
| S51 | Échographe | Impédance et écho — pourquoi le gel | ★★★ | L | 👁 | oui |
| S52 | Doppler médical | 5. Double trajet — le sang, la pluie, la mite | ★★ | M | 🔊 (la Δf est audible) | — |
| S53 | La chaîne d’atomes (phonons) | Le son devient particule — phonons et acoustique quantique | ★★ | M | 👁 (+🔊 branche acoustique transposée) | — |
| S54 | Les trois familles | Tableau de cohérence — où ranger chaque « son de l’espace » | ★★★ | L | 🔊 natif (Voyager, LIGO) / transposé (Persée), facteur affiché | oui |
| S55 | Le Soleil comme salle de Mersenne | Famille A1 — héliosismologie : le Soleil comme salle de Mersenne | ★ | L | 🔊 transposé de 15–16 octaves, facteur dit | oui |
| S56 | La règle des fréquences | Spectre utile pour le live | ★★ | S | 🔊 (dans l’audible seulement) | — |

## 1. Physique fondamentale et ondes

### S01 — Onde longitudinale

*★★★ · effort S · 🔊 · remplace le schéma V01 · chapitre : Grandeurs*

- **Commandes** : fréquence 20 Hz–2 kHz, amplitude, pause, « suivre une molécule »
- **Comment l’utiliser** : Choisir une fréquence avec le curseur, lancer le son, puis cliquer « suivre une molécule » : une particule de la rangée se colore. Mettre en pause pour mesurer λ entre deux zones serrées.
- **Ce que ça montre** : Une rangée de particules d’air qui oscillent sur place pendant que les zones de compression avancent ; la courbe de pression p(x) dessous, et λ qui rétrécit quand f monte (c = λ f).
- **Sens de lecture** : Regarder d’abord la particule colorée : elle ne part jamais. Puis suivre une zone sombre (compression) : c’est elle qui traverse. La leçon tient dans l’écart entre les deux.

### S02 — Newton–Laplace

*★★ · effort S · 🔊 · chapitre : Équation de Newton–Laplace*

- **Commandes** : milieu (air, hélium, CO₂, eau, acier, tissu mou), température −40 → +40 °C, « isotherme / adiabatique »
- **Comment l’utiliser** : Sélectionner un milieu et une température ; basculer entre « Newton (isotherme) » et « Laplace (adiabatique) ». L’option « flûte dans l’hélium » rejoue la même note simulée dans le gaz choisi.
- **Ce que ça montre** : La célérité de petites perturbations dans chaque milieu, avec les hypothèses affichées ; dans l’air, comparaison isotherme/adiabatique et courbe c(T). Les 295–298 m/s publiés par Newton sont un repère historique distinct du calcul moderne isotherme à 280 m/s.
- **Sens de lecture** : Comparer les deux valeurs pour l’air à 0 °C : 280 contre 331 m/s, l’écart de 16 % que Laplace referme avec γ. Ensuite seulement changer de milieu.

### S03 — Cloche de Boyle

*★★★ · effort S · 🔊 · chapitre : Robert Boyle (1627–1691) et la pompe à vide*

- **Commandes** : pompe (pression 1 atm → 10⁻⁴), milieu : air / vide / Mars (6 mbar)
- **Comment l’utiliser** : Lancer la montre sous la cloche, puis actionner la pompe par paliers. L’option Mars est une simulation annoncée, ou un enregistrement documenté explicitement identifié ; elle ne transforme pas le modèle de cloche en données de Perseverance.
- **Ce que ça montre** : Le niveau sonore qui chute avec la densité du gaz (transfert d’impédance), un filtre qui assourdit les aigus, une jauge en décibels.
- **Sens de lecture** : Écouter le tic-tac disparaître avant la fin du pompage : l’air est un milieu, pas un décor. Retenir que la cloche frappée, elle, ne fait que faiblir (fil, air résiduel).

### S04 — La corde de d’Alembert

*★★★ · effort L · 🔊 · plein écran · remplace le schéma V03 · chapitre : Corde de Mersenne*

- **Commandes** : pincer n’importe où (glisser), longueur L, tension τ, masse linéique µ (matière), amortissement
- **Comment l’utiliser** : Pincer la corde à la souris, écouter, lire la fréquence mesurée. Doubler la tension, puis la longueur ; pincer au milieu, puis près du chevalet.
- **Ce que ça montre** : Une corde résolue numériquement (équation d’onde 1D) : deux ondes qui partent et se réfléchissent, les modes affichés en barres, et f₁ = (1/2L)√(τ/µ) confrontée à la mesure. Le son sort de la simulation, pas d’un sample.
- **Sens de lecture** : D’abord la forme de la corde juste après le pincement (deux fronts qui s’éloignent), puis les barres de modes : pincer au milieu éteint les harmoniques pairs. Enfin vérifier que quadrupler τ monte d’une octave.

### S05 — Tuyaux ouverts et fermés

*★★ · effort M · 🔊 · chapitre : Tuyaux*

- **Commandes** : longueur, ouvert-ouvert / fermé-ouvert, correction d’embouchure, température
- **Comment l’utiliser** : Choisir la longueur, basculer ouvert / fermé, écouter le timbre. Faire monter la température pour voir un orgue se désaccorder.
- **Ce que ça montre** : Les profils de pression et de vitesse des modes, la série n c/2L contre (2n−1) c/4L, le spectre du son joué.
- **Sens de lecture** : Comparer les deux séries à longueur égale : le fermé sonne une octave plus bas et n’a que les impairs, d’où la couleur « creuse » de la clarinette.

### S06 — Chladni

*★★★ · effort L · 🔊 · plein écran · chapitre : Cordes, tuyaux, plaques*

- **Commandes** : fréquence (+ « mode suivant »), forme (carré / cercle / rectangle), point d’excitation, « sable »
- **Comment l’utiliser** : Verser le sable, monter la fréquence lentement ou cliquer « mode suivant ». Changer de forme de plaque à fréquence fixe.
- **Ce que ça montre** : Les modes propres calculés d’une plaque, le sable qui migre vers les lignes nodales, la liste des (m, n) rencontrés.
- **Sens de lecture** : Observer que le sable s’immobilise là où la plaque ne bouge pas. Puis garder la fréquence et changer la plaque : la figure change. C’est la réponse à la « cymatique créatrice ».

### S07 — Tube de Kundt

*★★ · effort M · 🔊 · chapitre : Cordes, tuyaux, plaques*

- **Commandes** : fréquence, longueur, gaz (air, He, CO₂), « mesurer λ » (deux repères)
- **Comment l’utiliser** : Régler la fréquence jusqu’à ce que la poudre forme des tas nets, poser deux repères sur deux tas voisins, lire λ/2 et la vitesse déduite.
- **Ce que ça montre** : Une onde stationnaire dans un tube, la poudre aux nœuds de déplacement (ventres de pression), la valeur de c déduite de deux tas voisins espacés de λ/2.
- **Sens de lecture** : Deux tas voisins = une demi-longueur d’onde. Changer de gaz sans toucher la fréquence : les tas s’écartent dans l’hélium (c plus grand).

### S08 — Tube de Rubens

*★ · effort M · 🔊 · chapitre : Cordes, tuyaux, plaques*

- **Commandes** : fréquence, longueur, débit de gaz
- **Comment l’utiliser** : Allumer la rampe, envoyer une fréquence, la faire glisser jusqu’à voir les flammes dessiner des bosses stables.
- **Ce que ça montre** : Un profil de flammes schématique lié à l’onde stationnaire ; débit, régime de combustion et pression influencent la hauteur, qui ne suit pas universellement la pression instantanée. Il s’agit d’une simulation, sans gaz ni flamme réels.
- **Sens de lecture** : Chercher la fréquence où les bosses sont nettes, compter les ventres, retrouver λ. Encadré sécurité : gaz et flamme, jamais improvisé chez soi.

### S09 — Bac à ondes 2D

*★★★ · effort XL · 👁 (+🔊 sonde) · plein écran · remplace le schéma V04, V05 · chapitre : 4. Interférence et ondes stationnaires — les modes de la pièce*

- **Commandes** : dessiner des murs, placer une source (impulsion / continu), fréquence, absorption ; présets : salle, Épidaure, fente simple, double fente, coin de rue
- **Comment l’utiliser** : Choisir un préset ou dessiner ses murs, poser la source, lancer une impulsion. Déplacer la sonde pour lire p(t) à un endroit ; passer en source continue pour voir les modes.
- **Ce que ça montre** : Une simulation d’ondes (FDTD) où réflexion, diffraction, interférence et stationnaires se produisent d’elles-mêmes ; la sonde trace la pression et son spectre.
- **Sens de lecture** : Une impulsion d’abord : suivre le front, ses rebonds, son contournement du coin. Puis une source continue à basse fréquence : les taches fixes sont les modes de la pièce ; monter la fréquence, elles se multiplient et se brouillent.

### S10 — Gradins d’Épidaure

*★★ · effort M · 🔊 · chapitre : Grèce : Pythagore, Archytas, Aristote, Épidaure*

- **Commandes** : pas des gradins, angle, hauteur de marche ; « bruit de fond / voix »
- **Comment l’utiliser** : Jouer la voix seule, puis le bruit de fond, puis les deux à travers le filtre des gradins. Modifier le pas des marches pour déplacer la coupure.
- **Ce que ça montre** : La réponse en fréquence d’un réseau périodique de marches : atténuation sous ~500 Hz, passage de la bande de la voix (Declercq & Dekeyser 2007).
- **Sens de lecture** : Lire la courbe de gauche à droite : le creux dans les graves, le plateau dans la bande 500–3 000 Hz. Puis écouter : le vent baisse, la voix reste. Ce n’est pas de la magie, c’est de la diffraction.

### S11 — Inverse du carré et décibels

*★★★ · effort S · 🔊 · chapitre : 6. Distance et atténuation — inverse du carré, addition, absorption*

- **Commandes** : distance 1–1 000 m, niveau de source, nombre de sources 1–100, « additionner »
- **Comment l’utiliser** : Éloigner la source et lire le niveau ; ajouter des sources identiques une à une et regarder le total.
- **Ce que ça montre** : L(r) = L₁ − 20 log(r/r₁), la somme énergétique des niveaux (60 + 60 = 63 dB), une échelle de référence chuchotement → réacteur.
- **Sens de lecture** : Chaque doublement de distance retire 6 dB ; chaque doublement de sources n’ajoute que 3 dB. Retenir les deux nombres, ils suffisent à démonter la plupart des « dB » de presse.

### S12 — Absorption dans l’air

*★★ · effort M · 🔊 · chapitre : 6. Distance et atténuation — inverse du carré, addition, absorption*

- **Commandes** : fréquence 100 Hz–100 kHz, humidité, température, distance
- **Comment l’utiliser** : Choisir une distance et une humidité, écouter un bruit blanc « après d mètres » ; monter la fréquence du curseur jusqu’à 40 kHz.
- **Ce que ça montre** : Le coefficient α(f) de l’ISO 9613-1 en dB/km, le spectre du bruit filtré par la distance.
- **Sens de lecture** : À 1 kHz, la courbe est plate (5 dB/km) ; à 8 kHz elle grimpe (78 dB/km) ; à 40 kHz elle dépasse 1 dB par mètre. Le tonnerre lointain et la courte portée du sonar aérien se lisent sur la même courbe.

### S13 — Doppler — qui bouge ?

*★★★ · effort M · 🔊 · plein écran · remplace le schéma V11 · chapitre : 3. Les deux à la fois + vent*

- **Commandes** : vitesse source, vitesse observateur, vent, « source / observateur / les deux », angle de passage
- **Comment l’utiliser** : Faire passer la source devant l’observateur, écouter ; échanger les rôles (observateur mobile) à vitesse égale ; ajouter du vent ; pousser la source vers c.
- **Ce que ça montre** : Les fronts circulaires nés là où la source était, f′ calculée avec les bons signes, la courbe f′(t) du passage ; le cône de Mach quand v → c. Le glissement de hauteur est produit par la géométrie (retard = distance/c), pas par un effet de pitch.
- **Sens de lecture** : Comparer les espacements des fronts devant et derrière la source, puis source mobile et observateur mobile. Les vitesses Doppler se définissent relativement au milieu ; avec du vent, préciser ce référentiel et les composantes le long du trajet.

### S14 — Battements

*★★★ · effort M · 🔊 (binaural : casque) · remplace le schéma V06 · chapitre : 1. Battement acoustique du premier ordre*

- **Commandes** : f_a, f_b (molettes fines), amplitudes, présets 440/441, 440/448, quinte juste vs tempérée, tierce ; mode « 2ᵉ ordre » ; mode casque (binaural)
- **Comment l’utiliser** : Choisir 440 et 441 Hz, écouter, compter les pouls ; laisser le compteur automatique les compter aussi. Passer à 448 Hz, puis aux présets quinte et tierce. En casque, séparer les oreilles pour le binaural, puis repasser en mono.
- **Ce que ça montre** : Forme d’onde et enveloppe, f_batt = |f_a − f_b|, la zone pouls / rugosité / deux sons (Plomp & Levelt) ; en 2ᵉ ordre, les partiels qui se ratent (3f_g contre 2f_a) ; en binaural, aucune enveloppe dans l’air.
- **Sens de lecture** : Compter à 1 Hz puis comparer à 8 Hz : la frontière entre pulsation et rugosité dépend de l’auditeur. Pour le binaural, couper un seul canal supprime l’interaction entre oreilles. Mélanger les deux canaux en mono produit au contraire un battement acoustique, visible sur leur somme ; ce ne sont pas les mêmes mécanismes.

### S15 — Résonateur de Helmholtz

*★★ · effort S · 🔊 · chapitre : Instruments = machines à conditions aux limites*

- **Commandes** : volume, section et longueur du col, « remplir d’eau »
- **Comment l’utiliser** : Souffler (bruit blanc) dans la bouteille virtuelle, écouter la note ; remplir d’eau par paliers.
- **Ce que ça montre** : f ≈ (c/2π)√(S/VL), la courbe de réponse du résonateur, la note qui monte quand V baisse.
- **Sens de lecture** : Le résonateur renforce une région du spectre du bruit excitateur. La bouteille et certains pièges à basses illustrent ce modèle, avec longueur effective du col ; le pavillon de l’oreille a une géométrie et des résonances plus complexes.

### S16 — Sonar à impulsion

*★★★ · effort M · 🔊 (ping ralenti) · remplace le schéma V09 · chapitre : Physique du geste*

- **Commandes** : fréquence, durée d’impulsion, distance de la cible, milieu (air / eau / tissu), deux cibles rapprochées
- **Comment l’utiliser** : Placer la cible, émettre, lire Δt et la distance déduite. Rapprocher deux cibles jusqu’à ce que leurs échos fusionnent, puis raccourcir l’impulsion.
- **Ce que ça montre** : d = cΔt/2, la résolution axiale cτ/2, la portée qui s’effondre quand f monte dans l’air.
- **Sens de lecture** : Lire Δt sur l’oscillogramme, faire le calcul à voix haute (2 ms dans l’eau : 1,5 m). Puis voir les deux échos se séparer quand l’impulsion raccourcit : c’est le compromis de tout échographe.

### S56 — La règle des fréquences

*★★ · effort S · 🔊 (dans l’audible seulement) · remplace le schéma V02 · chapitre : Spectre utile pour le live*

- **Commandes** : axe logarithmique 0,01 Hz → 1 GHz, curseur de fréquence, calques : infrasons / audible / ultrasons, animaux, instruments, machines et médecine
- **Comment l’utiliser** : Glisser le curseur le long de l’axe et lire ce qui vit à cette fréquence ; activer les calques ; écouter la fréquence quand elle est dans l’audible (le bouton se grise ailleurs).
- **Ce que ça montre** : Un seul axe pour tout le dossier : microbaroms à 0,2 Hz, éléphants, orgue de 32 pieds, voix, oreille (20 Hz–20 kHz, maximum 2–5 kHz), chauve-souris, échographe, fréquence plasma de Voyager — avec λ dans l’air affichée pour chaque position.
- **Sens de lecture** : Repérer d’abord la fenêtre humaine, étroite au milieu de l’axe ; puis voir combien d’êtres et de machines vivent à sa gauche et à sa droite. Les frontières 20 Hz / 20 kHz sont des repères statistiques, pas des murs.

## 2. Analyse du signal, FFT, spectrogramme

### S17 — Fourier à la main

*★★★ · effort L · 🔊 · plein écran · chapitre : Série de Fourier*

- **Commandes** : dessiner une période, ou carré / dent de scie / triangle / impulsion ; N harmoniques 1–64 ; « reconstruire » ; vue « épicycles »
- **Comment l’utiliser** : Dessiner une période au doigt, ou choisir un carré. Augmenter N harmonique par harmonique et écouter la reconstruction à la fréquence choisie.
- **Ce que ça montre** : Les coefficients a_n, b_n calculés, la somme partielle superposée au dessin, le phénomène de Gibbs aux angles, les épicycles qui tournent.
- **Sens de lecture** : Partir de N = 1 (un sinus) et monter : le dessin se remplit et le timbre s’épaissit en même temps. Les oreilles suivent les yeux ; c’est le sens même de « le timbre est un dosage ».

### S18 — Le spectrogramme

*★★★ · effort XL · 🎙🔊 · plein écran · chapitre : 4. Analyser — la transformée de Fourier discrète et la FFT (1965)*

- **Commandes** : source : micro / fichier / générateurs ; taille de fenêtre 256–8 192 ; type de fenêtre ; échelle linéaire / log / mel ; plage dB
- **Comment l’utiliser** : Autoriser le micro, parler ou siffler, lire le spectrogramme qui défile. Changer la taille de fenêtre en gardant le même son ; survoler pour lire fréquence, temps et niveau.
- **Ce que ça montre** : Une FFT maison (fenêtre et recouvrement au choix), un spectrogramme, le spectre instantané et la forme d’onde ; le compromis temps / fréquence rendu visible.
- **Sens de lecture** : Siffler : une ligne fine. Claquer des doigts : une barre verticale. Puis agrandir la fenêtre : la ligne s’affine, la barre s’étale. C’est Gabor (Δt·Δf ≳ 1) en une manipulation.

### S19 — Échantillonnage et Nyquist

*★★★ · effort M · 🔊 · chapitre : 2. Le repliement (aliasing) — ce que le filtre anti-repliement empêche*

- **Commandes** : f du signal, f_s 1–96 kHz, bits 1–24, dither on/off, filtre anti-repliement on/off
- **Comment l’utiliser** : Lancer un glissando montant, couper le filtre anti-repliement et écouter ; puis baisser le nombre de bits, avec et sans dither.
- **Ce que ça montre** : Les points d’échantillonnage sur la sinusoïde, la reconstruction en sinus cardinal, le repliement (30 kHz → 14,1 kHz à 44,1 kHz), le bruit de quantification (6,02 n + 1,76 dB).
- **Sens de lecture** : Écouter le glissando « redescendre » quand il dépasse f_s/2 : ce son n’existait pas dans le signal. Puis à 4 bits, entendre la distorsion devenir un souffle quand on ajoute le dither.

### S20 — Filtres et égaliseur

*★★ · effort M · 🎙🔊 · plein écran · chapitre : 4. Analyser — la transformée de Fourier discrète et la FFT (1965)*

- **Commandes** : type (passe-bas / haut / bande, shelf, peak), f_c, Q, ordre ; source : bruit / musique / micro
- **Comment l’utiliser** : Choisir un passe-bas, déplacer f_c en écoutant un bruit blanc ; monter le Q d’un filtre peak jusqu’à entendre une résonance.
- **Ce que ça montre** : La réponse en amplitude et en phase d’un biquad, le spectre avant / après.
- **Sens de lecture** : À chaque fréquence, lire le gain de la réponse : 0 dB conserve l’amplitude, une valeur négative l’atténue, une valeur positive l’amplifie. Ne pas confondre cette courbe de transfert avec un seuil de masquage.

### S21 — Compression perceptive (MP3)

*★★ · effort L · 🔊 · plein écran · chapitre : 6. Jeter ce que l’oreille ignorera — MP3 (1993), AAC (1997), Opus (2012)*

- **Commandes** : débit cible, « montrer ce qui est jeté », seuil de masquage on/off
- **Comment l’utiliser** : Comparer original et version décodée à niveau égal, baisser le débit, puis écouter la différence après alignement temporel et de gain. Afficher le modèle de masquage et ses hypothèses.
- **Ce que ça montre** : Le spectre, la courbe de masquage calculée (bandes critiques), les partiels grisés sous le seuil, le résidu écoutable seul.
- **Sens de lecture** : Le modèle estime ce qui peut être masqué dans le signal complet. Un résidu écouté seul peut être audible et musical ; cela ne prouve ni la transparence ni son absence. Revenir à une comparaison aveugle des extraits complets.

### S22 — Accordeur (détection de hauteur)

*★★★ · effort M · 🎙 · chapitre : 3. Battements du second ordre — consonances désaccordées*

- **Commandes** : micro ; algorithme (autocorrélation / YIN / cepstre) ; référence 415 / 432 / 440 / 442
- **Comment l’utiliser** : Chanter ou jouer une note tenue, lire la note et l’écart en cents ; changer d’algorithme sur le même son ; changer la référence.
- **Ce que ça montre** : f₀ estimée, l’aiguille en cents, l’historique ; le fait que la hauteur n’est pas « le pic de la FFT ».
- **Sens de lecture** : Lire la fréquence mesurée et les cents relativement au diapason choisi. Passer la référence à 432 Hz conserve le signal entrant mais change son écart à la cible et peut changer la note affichée ; cela ne retend pas l’instrument.

### S23 — Convolution et réverbération (T60 au clap)

*★★★ · effort L · 🎙🔊 · plein écran · remplace le schéma V14 · chapitre : Faire taire la pierre — acoustique architecturale*

- **Commandes** : réponse impulsionnelle : synthétique / enregistrée par un clap au micro / fichier ; source : voix, clap, musique
- **Comment l’utiliser** : Enregistrer un clap dans la pièce où l’on se trouve, lire le T60 mesuré, puis convoluer sa voix avec cette réponse ou avec une réponse synthétique de cathédrale.
- **Ce que ça montre** : La réponse impulsionnelle, la courbe de décroissance de Schroeder, le T60 par régression, la comparaison avec le calcul de Sabine.
- **Sens de lecture** : Lire la décroissance par bande ; estimer T20 ou T30 puis extrapoler T60 seulement si la dynamique utile et la linéarité le permettent. Un clap et un micro ordinaire donnent une estimation dépendante de la source, du bruit, du placement et des traitements automatiques.

### S24 — Calculateur de Sabine

*★★★ · effort M · 🔊 · plein écran · chapitre : Faire taire la pierre — acoustique architecturale*

- **Commandes** : dimensions, matériaux par paroi (α par bande), « ajouter 100 personnes »
- **Comment l’utiliser** : Entrer une salle, choisir ses matériaux, lire T60 par bande ; ajouter le public ; comparer aux présets Boston Symphony Hall / studio / cathédrale.
- **Ce que ça montre** : A = Σ αᵢSᵢ et T60 ≈ 0,161 V/A pour Sabine ; comparaison avec Eyring T60 ≈ 0,161 V/[−S ln(1−α moyen)] dans le modèle diffus sans absorption de l’air, et réponse impulsionnelle synthétique annoncée.
- **Sens de lecture** : Regarder T60 par bande avant de regarder la moyenne : une salle « sèche » dans l’aigu peut « boomer » dans le grave. Puis ajouter le public : la salle sèche, comme chez Sabine.

### S25 — Vocodeur de phase

*★ · effort L · 🎙🔊 · plein écran · chapitre : 5. Modéliser la voix — vocodeur (1939) et LPC (1971)*

- **Commandes** : étirement 0,25×–4×, transposition ±12 demi-tons, « préserver les formants »
- **Comment l’utiliser** : Enregistrer une phrase, la ralentir sans changer sa hauteur, puis la transposer avec et sans préservation des formants.
- **Ce que ça montre** : La STFT modifiée puis resynthétisée et les spectrogrammes avant/après ; des opérations de durée et de hauteur, sans prétendre reproduire l’algorithme propriétaire d’Auto-Tune.
- **Sens de lecture** : En étirement, les événements durent plus longtemps sans transposition ; en transposition, les fréquences changent. Le maintien des phases et la reconstruction distinguent ce traitement d’une simple lecture accélérée.

## 3. Musique : gammes, accords, timbres, DAW

### S26 — Karplus-Strong et modèles physiques

*★ · effort M · 🔊 · chapitre : Instruments = machines à conditions aux limites*

- **Commandes** : longueur du buffer, amortissement, position du pincement, « corde / tube / peau »
- **Comment l’utiliser** : Pincer, écouter, changer la longueur du buffer et lire la note ; augmenter l’amortissement.
- **Ce que ça montre** : Une ligne à retard bouclée qui sonne comme une corde (1983), son spectre, le lien avec la corde simulée S04.
- **Sens de lecture** : Une boucle de retard de 100 échantillons à 44,1 kHz donne un repère idéal de 441 Hz ; le retard de phase du filtre de la boucle Karplus–Strong modifie la fréquence réelle. Comparer estimation et mesure, puis observer la décroissance des aigus.

### S27 — Monocorde de Pythagore

*★★★ · effort S · 🔊 · chapitre : Grèce : Pythagore, Archytas, Aristote, Épidaure*

- **Commandes** : chevalet mobile, tension, « comparer à la corde entière »
- **Comment l’utiliser** : Glisser le chevalet aux repères 1/2, 2/3, 3/4, 4/5 ; jouer la portion et la corde entière ensemble.
- **Ce que ça montre** : Le rapport de longueurs, l’intervalle nommé, les cents, les battements entre les deux notes.
- **Sens de lecture** : Aux rapports simples, les deux notes fusionnent ; entre les repères, ça frotte. La légende du forgeron est fausse ; la corde, elle, dit vrai.

### S28 — Timbre additif

*★★★ · effort M · 🔊 · chapitre : Analyse du timbre*

- **Commandes** : 16 curseurs d’harmoniques, enveloppe ADSR, inharmonicité, présets (flûte, clarinette, hautbois, voix, cloche, carré), « fondamentale manquante »
- **Comment l’utiliser** : Choisir un préset, écouter, puis modifier un harmonique à la fois. Cliquer « fondamentale manquante » pour couper le premier harmonique.
- **Ce que ça montre** : Spectre, forme d’onde, spectrogramme ; la hauteur perçue qui reste quand f₀ disparaît ; les cloches inharmoniques.
- **Sens de lecture** : Même f₀, timbres différents : la note ne bouge pas, la couleur oui. Puis couper f₀ : la note ne bouge toujours pas — l’oreille l’a reconstruite.

### S29 — Tempéraments

*★★★ · effort L · 🔊 · plein écran · chapitre : Systèmes dans le monde — ne pas occidentalo-centrer*

- **Commandes** : système (pythagoricien, juste, mésotonique, Werckmeister III, 12-TET, 19/31/53-TET), tonalité, clavier, « quinte du loup », « cycle des quintes »
- **Comment l’utiliser** : Jouer le même accord dans chaque système ; ouvrir le cycle des quintes en pythagoricien et empiler douze quintes ; chercher la quinte du loup en mésotonique.
- **Ce que ça montre** : La table des fréquences et des écarts en cents, le cercle qui ne se ferme pas (comma), la quinte du loup surlignée, les battements de chaque accord.
- **Sens de lecture** : Regarder d’abord le cercle : le douzième maillon ne retombe pas sur le premier. Puis écouter la tierce juste (calme) et la tierce tempérée (qui bat) : le piano est un compromis, pas une loi.

### S30 — Accords et rugosité

*★★★ · effort L · 🔊 · plein écran · chapitre : Étage 1 — la rugosité (Helmholtz → Plomp & Levelt → Sethares)*

- **Commandes** : construire un accord (≤ 6 notes), renversement, système d’accord, timbre, « courbe de dissonance »
- **Comment l’utiliser** : Jouer une triade majeure puis mineure, lire le score de rugosité ; changer le timbre pour une cloche ; ouvrir la courbe de dissonance et déplacer la seconde note.
- **Ce que ça montre** : Le modèle de Sethares (somme des rugosités entre partiels), la courbe de dissonance avec ses creux sur 3/2, 4/3, 5/4 pour un timbre harmonique, la racine perçue (Terhardt).
- **Sens de lecture** : Les minima du modèle correspondent à une faible rugosité pour le spectre choisi ; ils ne résument pas toute la consonance. Comparer majeur et mineur selon le timbre et la disposition, puis distinguer rugosité, fondamentale virtuelle et contexte culturel.

### S31 — Le clavier des systèmes du monde

*★ · effort M · 🔊 · chapitre : Systèmes dans le monde — ne pas occidentalo-centrer*

- **Commandes** : exemples documentés de maqâm, raga, pélog, slendro, lü ou blues, avec source et accordage affichés
- **Comment l’utiliser** : Choisir une échelle, jouer la gamme sur le clavier ré-étiqueté, comparer chaque degré au 12-TET.
- **Ce que ça montre** : Les cents par degré et l’écart au demi-ton tempéré.
- **Sens de lecture** : Repérer les degrés entre les touches du piano. Les 22 shruti sont un cadre théorique, pas une gamme uniforme applicable à tous les ragas ; les accordages de gamelan varient selon l’ensemble. Chaque préset doit nommer l’exemple retenu.

### S32 — Inharmonicité et accord du piano

*★ · effort M · 🔊 · chapitre : Instruments = machines à conditions aux limites*

- **Commandes** : raideur de la corde (B), registre, « octaves étirées »
- **Comment l’utiliser** : Augmenter la raideur, écouter l’octave « juste » battre, puis activer l’étirement des octaves.
- **Ce que ça montre** : Les partiels f_n = n f₁ √[(1 + Bn²)/(1 + B)] lorsque f₁ désigne la fondamentale réelle, la courbe de Railsback et les battements de partiels. Afficher la convention de B et le modèle de corde raide.
- **Sens de lecture** : Suivre le deuxième partiel qui monte au-dessus de 2f₁ quand B augmente : l’octave « mathématique » bat, l’octave étirée ne bat plus. Fourier n’est pas violé, la corde est raide.

### S33 — Synthèse FM (Chowning)

*★ · effort M · 🔊 · chapitre : XXe siècle musical où l’acoustique redevient explicite*

- **Commandes** : porteuse, modulante, indice, ratio, enveloppes
- **Comment l’utiliser** : Partir d’un ratio 1:1 et monter l’indice ; passer à 1:1,41 pour une cloche ; ajouter une enveloppe sur l’indice pour un cuivre.
- **Ce que ça montre** : Le spectre en fonctions de Bessel, les timbres cloche / cuivre / piano électrique.
- **Sens de lecture** : Regarder le spectre se remplir quand l’indice monte, puis se disperser quand le ratio devient irrationnel : le spectre se compose comme un accord.

### S34 — Le studio (mini-DAW)

*★★ · effort XL · 🎙🔊 · plein écran · chapitre : 7. Depuis 1990 — streaming, normalisation et synthèse*

- **Commandes** : 4–8 pistes (générateurs, Karplus, micro, fichier) ; timeline, boucle, tempo ; par piste gain, pan, EQ, délai, réverbération, compresseur ; master : limiteur, LUFS, spectre ; export WAV
- **Comment l’utiliser** : Enregistrer une voix, ajouter une piste de générateur, poser un délai de 10 ms d’un côté (Haas), une réverbération de S24, puis exporter en WAV. Tout reste dans le navigateur.
- **Ce que ça montre** : Tout le dossier assemblé dans l’outil qui a remplacé le studio de Schaeffer ; le LUFS-mètre qui rend visible la loudness war.
- **Sens de lecture** : Regarder le master : le crête-mètre et le LUFS-mètre ne disent pas la même chose. Écraser une piste au compresseur fait monter le LUFS, pas la musique.

### S35 — Loudness war

*★ · effort M · 🔊 · chapitre : 7. Depuis 1990 — streaming, normalisation et synthèse*

- **Commandes** : même extrait, compression 0 → extrême, normalisation LUFS on/off (−14, −23)
- **Comment l’utiliser** : Écraser progressivement l’extrait, puis activer la normalisation à −14 LUFS et réécouter les deux versions.
- **Ce que ça montre** : La forme d’onde « saucisse », la plage dynamique, le LUFS intégré, l’égalisation de niveau perçu après normalisation.
- **Sens de lecture** : Comparer les extraits avant puis après normalisation de la sonie : l’avantage de niveau se réduit, mais la dynamique et le timbre restent modifiés. Une cible de −14 LUFS est un réglage de démonstration, pas la norme de tous les services ni la fin historique de la loudness war.

## 4. Psychoacoustique, oreille, voix (le micro comme instrument)

### S36 — Courbes isosoniques

*★★★ · effort M · 🔊 · chapitre : Sonie et masquage*

- **Commandes** : fréquence de test (31,5 Hz → 16 kHz), niveau de référence à 1 kHz ; ajustement « aussi fort que la référence »
- **Comment l’utiliser** : À faible niveau et sans chercher à compenser un grave inaudible par une forte augmentation de volume, comparer quelques fréquences à une référence à 1 kHz. Garder un plafond de gain et une commande d’arrêt.
- **Ce que ça montre** : Des égalisations subjectives en gain numérique relatif ; courbes ISO 226 montrées comme référence indépendante. Sans étalonnage du casque, on ne mesure ni des phones ni une courbe isosonique personnelle absolue.
- **Sens de lecture** : Une différence de sensation combine l’audition et la réponse du casque. Lire le repère ISO pour comprendre le principe, pas pour diagnostiquer ni déduire une pression sonore réelle de la position d’un curseur.

### S37 — Masquage

*★★ · effort M · 🔊 · chapitre : Sonie et masquage*

- **Commandes** : sinus faible (f, niveau), masqueur (bruit étroit ou sinus fort), pré / post-masquage temporel
- **Comment l’utiliser** : Écouter le sinus faible, allumer le masqueur centré dessus et dire quand le sinus disparaît ; répéter avec un masqueur décalé en fréquence.
- **Ce que ça montre** : Le seuil masqué calculé (bande critique) et le seuil personnel obtenu par oui / non.
- **Sens de lecture** : Le masquage dépend de l’écart fréquentiel, du niveau et du temps. Il est particulièrement fort autour de la bande du masqueur ; il ne s’arrête pas à une frontière parfaitement nette.

### S38 — Shepard, Risset, triton

*★★ · effort M · 🔊 · chapitre : Hauteur*

- **Commandes** : vitesse, sens, « Risset (continu) », « paradoxe du triton »
- **Comment l’utiliser** : Lancer la gamme de Shepard et la laisser tourner trois cycles avant d’expliquer ; passer en glissando de Risset ; jouer les paires du triton et voter « monte / descend ».
- **Ce que ça montre** : Les dix octaves sous enveloppe (visibles au spectrogramme), le vote du public sur le triton.
- **Sens de lecture** : Regarder le spectrogramme pendant qu’on écoute : les composantes montent, s’éteignent en haut et renaissent en bas. L’oreille suit la montée, jamais la chute. La hauteur est une construction.

### S39 — Où est le son ? (ITD / ILD / HRTF)

*★★ · effort L · 🔊 casque obligatoire · plein écran · chapitre : Où est le son ? — localisation spatiale (ITD, ILD, HRTF)*

- **Commandes** : position de la source autour de la tête, rayon de tête, « ITD seul / ILD seul / HRTF », fréquence
- **Comment l’utiliser** : Au casque, faire tourner la source ; activer ITD seul avec un grave, puis ILD seul avec un aigu ; passer en HRTF pour le haut / bas.
- **Ce que ça montre** : Δt ≈ (r/c)(θ + sin θ), l’ombre de la tête en dB, le cône de confusion, un filtrage par HRTF publique (KEMAR).
- **Sens de lecture** : Comparer les indices séparés : l’ITD de structure fine est surtout utile dans le grave, l’ILD augmente dans l’aigu. Les signaux complexes portent aussi des indices d’enveloppe ; ne pas conclure qu’aucune localisation des aigus n’est possible par le temps.

### S40 — Précédence (Haas)

*★ · effort S · 🔊 casque · chapitre : Où est le son ? — localisation spatiale (ITD, ILD, HRTF)*

- **Commandes** : délai gauche / droite 0–50 ms, différence de niveau
- **Comment l’utiliser** : Envoyer deux clics, droite retardée d’abord de 1 à 3 ms ; explorer ensuite les délais avec de la parole ou du bruit. Inverser le côté retardé et ajuster les niveaux modérément.
- **Ce que ça montre** : Fusion et dominance de la source arrivée la première, puis éventuelle séparation en deux événements. Les résultats et seuils dépendent du signal, du délai, des niveaux et de l’auditeur.
- **Sens de lecture** : Identifier le canal arrivé en premier avant de juger la localisation. Ne pas donner 30 ms comme seuil universel : un clic peut se dédoubler bien avant un extrait de parole.

### S41 — Source-filtre : la voix

*★★★ · effort L · 🔊 · plein écran · remplace le schéma V13 · chapitre : Voix — deux étages, pas un tuyau magique*

- **Commandes** : f₀ (glotte), forme du conduit ([a] ↔ [i] ↔ [u] ou quatre sections), « chuchoter », « formant du chanteur »
- **Comment l’utiliser** : Choisir une voyelle, faire varier f₀ sans toucher au conduit ; puis garder f₀ et changer de voyelle ; activer le formant du chanteur sur un accompagnement d’orchestre.
- **Ce que ça montre** : Une source glottique, des résonances de tube (F1, F2, F3), la carte F1/F2 des voyelles, la voyelle rayonnée.
- **Sens de lecture** : Sur la carte F1/F2, le point ne bouge pas quand f₀ change et bouge quand la voyelle change : deux étages indépendants. Le formant du chanteur est une bosse vers 3 kHz qui passe au-dessus de l’orchestre.

### S42 — Vos propres voyelles

*★★★ · effort L · 🎙 · plein écran · chapitre : Voix — deux étages, pas un tuyau magique*

- **Commandes** : micro ; « tenir un [a] », « [i] », « [u] » ; référence homme / femme / enfant
- **Comment l’utiliser** : Tenir un [a] dans le micro, regarder le point apparaître sur la carte des voyelles, puis passer à [i] et [u].
- **Ce que ça montre** : Les formants F1, F2 estimés par LPC en temps réel, f₀, le spectrogramme avec les formants surlignés ; jitter et shimmer affichés sans interprétation clinique.
- **Sens de lecture** : À voyelle et articulation approximativement fixes, f₀ peut varier sans déplacement comparable des formants. Dans la voix réelle, posture et registre peuvent aussi modifier les résonances ; la LPC devient moins fiable pour certaines voix aiguës. Aucune interprétation clinique.

### S43 — L’oreille de bout en bout, puis la cochlée

*★★ · effort L · 🔊 · remplace le schéma V12 · chapitre : Entendre — de Helmholtz à la neuroacoustique*

- **Commandes** : coupe de l’oreille (survol de chaque organe : pavillon, conduit, tympan, osselets, fenêtre ovale, cochlée, nerf), « dérouler la cochlée », fréquence ou son complexe, « ampli actif on/off », niveau
- **Comment l’utiliser** : Survoler chaque organe de la coupe pour lire son rôle et son gain, puis cliquer « dérouler la cochlée » ; envoyer un sinus, regarder où l’onde culmine sur la membrane basilaire ; monter la fréquence ; couper l’amplificateur actif.
- **Ce que ça montre** : La chaîne complète pavillon → tympan → osselets → cochlée → nerf (impédance air → liquide, ×20 environ), puis l’onde progressive de Békésy, la tonotopie base → apex, la sélectivité avec et sans cellules ciliées externes (Kemp 1978).
- **Sens de lecture** : Lire la coupe de gauche à droite comme un trajet ; puis, sur la cochlée déroulée, voir le maximum se déplacer vers la base quand f monte : la cochlée est un analyseur de Fourier mécanique. Sans l’ampli actif, le pic s’aplatit : l’oreille n’est pas un micro passif.

### S44 — Jusqu’où entendez-vous ?

*★★ · effort S · 🔊 (niveau plafonné) · chapitre : Entendre — de Helmholtz à la neuroacoustique*

- **Commandes** : balayage limité à la bande réellement disponible, niveau numérique plafonné, arrêt immédiat, repère théorique de Nyquist affiché
- **Comment l’utiliser** : Lancer le balayage montant à volume modéré et cliquer dès que le son disparaît ; recommencer vers le grave.
- **Ce que ça montre** : La fréquence où le son n’est plus perçu sur cette chaîne de restitution, sans la présenter comme une limite auditive personnelle isolée. L’échantillonnage, le codec, le casque et l’audition peuvent tous limiter la restitution.
- **Sens de lecture** : Ne pas augmenter le volume pour retrouver un son disparu. Le test n’est ni un audiogramme ni un estimateur d’âge ; afficher seulement la fréquence du signal de test et les limites de l’expérience.

### S45 — Sécurité : la dose de bruit

*★★ · effort S · 👁 · chapitre : Entendre — de Helmholtz à la neuroacoustique*

- **Commandes** : niveau dB(A), durée, « concert / casque / chantier »
- **Comment l’utiliser** : Entrer une journée type (trajet, casque, concert), lire la dose cumulée et son équivalent sur 8 heures.
- **Ce que ça montre** : La règle des 3 dB, la dose en pourcentage, les seuils réglementaires (80 / 85 / 87 dB(A)).
- **Sens de lecture** : Dans le modèle à énergie égale choisi, 100 dB(A) pendant 15 minutes correspondent à la même dose que 85 dB(A) pendant huit heures. Cela ne garantit pas l’absence de risque ; niveaux d’action et limite réglementaire sont des notions distinctes.

## 5. Bioacoustique, infra, ultra (simuler ce qu’on ne peut pas rejouer)

### S46 — La chauve-souris

*★★★ · effort L · 🔊 time-expansion ×10, annoncé · plein écran · remplace le schéma V16 · chapitre : Chauves-souris — environ 1 500 espèces, ~20 % des mammifères*

- **Commandes** : type (FM Myotis / CF rhinolophe), distance de la proie, vitesse relative, humidité, « compensation Doppler on/off »
- **Comment l’utiliser** : Choisir Myotis, approcher la proie et écouter les cris s’accélérer jusqu’au buzz ; passer en rhinolophe, lancer le vol et couper la compensation Doppler.
- **Ce que ça montre** : Cri, écho, Δt, portée limitée par l’absorption de l’air, les trois phases search / approach / buzz, le spectrogramme du cri ; en CF, l’écho qui sort de la fovéa à 83 kHz sans compensation.
- **Sens de lecture** : Suivre l’intervalle entre les cris, distinct de leur fréquence porteuse. Observer la compensation Doppler du rhinolophe. La lecture audio est ralentie dix fois : temps ×10 et fréquences ÷10 ; l’écran l’annonce.

### S47 — Le cachalot

*★★ · effort M · 🔊 transposé ou enregistrement NOAA · chapitre : Odontocètes — le même algorithme dans l’eau*

- **Commandes** : profondeur, distance, « on-axis / off-axis », mode (usual click / creak / coda / slow click)
- **Comment l’utiliser** : Choisir un mode, éloigner l’hydrophone, lire le niveau reçu ; sortir de l’axe du faisceau.
- **Ce que ça montre** : Un niveau de source référé à 1 m et un niveau reçu à la distance choisie, calculés avec divergence et absorption. Afficher séparément distance, axe, bande et métrique RMS ou crête-à-crête ; ne pas écrire « à 1 m » pour le niveau reçu ailleurs.
- **Sens de lecture** : Lire le niveau en même temps que l’unité : 236 dB re 1 µPa n’est pas « plus fort qu’un avion ». Hors axe, le clic devient multiple et faible : c’est ce que l’on enregistre le plus souvent.

### S48 — Le canal SOFAR

*★★ · effort M · 👁 · plein écran · chapitre : Guerre, souveraineté, mer*

- **Commandes** : profil c(z) (température, salinité, pression), profondeur de la source, angles de départ
- **Comment l’utiliser** : Placer la source à 1 000 m, lancer des rayons à plusieurs angles ; remonter la source en surface et recommencer.
- **Ce que ça montre** : Le tracé de rayons dans le profil de célérité, l’axe du canal, les rayons piégés sur des milliers de kilomètres, les zones d’ombre.
- **Sens de lecture** : Regarder les rayons se recourber vers la zone lente : c’est la même réfraction que le son qui « porte » le soir. Une baleine sur l’axe s’entend à l’échelle d’un océan.

### S49 — Infrasons : l’échelle

*★★ · effort M · 👁 (option 🔊 30–60 Hz) · remplace le schéma V15 · chapitre : Échelle*

- **Commandes** : fréquence 0,01–20 Hz, « obstacle » (humain, maison, immeuble, colline)
- **Comment l’utiliser** : Baisser la fréquence et regarder la longueur d’onde grandir à côté de l’obstacle choisi ; ouvrir la courbe de seuil d’audition sous 20 Hz.
- **Ce que ça montre** : λ comparée à l’obstacle, diffraction marquée quand l’obstacle est petit devant λ, sans prétendre que tout matériau devient transparent ; seuils infrasonores de référence et distinction Schumann/pression.
- **Sens de lecture** : À 1 Hz, l’onde fait 343 m : une maison est un point pour elle. Le trait n’est pas un infrason « vu », c’est sa géométrie ; l’enceinte ne rejouera pas ceci, et l’écran le dit.

### S50 — Hunga Tonga fait le tour du monde

*★ · effort M · 👁 · chapitre : Sources naturelles — catalogue à tenir propre*

- **Commandes** : station IMS (menu), heure
- **Comment l’utiliser** : Lancer l’horloge du 15 janvier 2022 et regarder l’onde de pression traverser la carte ; choisir une station et lire son barogramme.
- **Ce que ça montre** : Les fronts circulaires à ~310 m/s, les passages successifs, le signal d’une station (données publiques ou reconstruction annoncée comme telle).
- **Sens de lecture** : Compter les passages : l’onde repasse plusieurs fois, comme celle du Krakatoa en 1883. L’infrason est une oreille diplomatique avant d’être un mystère.

### S51 — Échographe

*★★★ · effort L · 👁 · plein écran · remplace le schéma V10 · chapitre : Impédance et écho — pourquoi le gel*

- **Commandes** : fréquence 2–15 MHz, gel on/off, fantôme (foie + os + kyste + poumon), gain, mode A / B / M
- **Comment l’utiliser** : Poser la sonde sur le fantôme sans gel : écran noir ; mettre le gel ; monter la fréquence ; passer en mode A pour lire une seule ligne.
- **Ce que ça montre** : Une image B reconstruite depuis une carte d’impédance : ombre acoustique derrière l’os, renforcement derrière le kyste, atténuation 0,5 dB/cm/MHz, R ≈ 1 à l’air.
- **Sens de lecture** : Lire l’image comme des échos traités : un pixel sombre peut correspondre à peu de diffusion, à de l’atténuation ou à une ombre. Le gain et les interfaces interviennent ; ce n’est pas une carte directe de l’impédance. Comparer le compromis résolution/portée à fréquence croissante.

### S52 — Doppler médical

*★★ · effort M · 🔊 (la Δf est audible) · chapitre : 5. Double trajet — le sang, la pluie, la mite*

- **Commandes** : vitesse du sang, angle θ, f₀ 2–8 MHz, « continu / pulsé »
- **Comment l’utiliser** : Régler l’angle à 45°, écouter le « souffle » ; tourner vers 90° ; changer f₀.
- **Ce que ça montre** : Δf = 2 v f₀ cos θ / c jouée telle quelle, le spectre Doppler défilant, l’erreur d’angle.
- **Sens de lecture** : Le son que l’on entend est la Δf elle-même, pas une transposition : quelques MHz émis, quelques kHz de décalage. À 90°, le silence : cos θ = 0, d’où les erreurs cliniques.

## 6. Hors de l’air : phonons, plasma, étoiles

### S53 — La chaîne d’atomes (phonons)

*★★ · effort M · 👁 (+🔊 branche acoustique transposée) · chapitre : Le son devient particule — phonons et acoustique quantique*

- **Commandes** : nombre d’atomes, masses (une ou deux espèces), raideur, vecteur d’onde k
- **Comment l’utiliser** : Lancer la chaîne monoatomique, faire varier k et lire ω ; passer à deux masses pour faire apparaître la branche optique.
- **Ce que ça montre** : La relation de dispersion ω(k) calculée, la branche acoustique dont la pente à l’origine est la vitesse du son, la branche optique, la zone de Brillouin.
- **Sens de lecture** : Près de k = 0, la pente de la branche acoustique donne une célérité. Une chaîne classique possède déjà une dispersion à k élevé ; les phonons apparaissent lorsque les modes sont quantifiés, à toute valeur de k. Ne pas placer une frontière classique/quantique à un point arbitraire de la courbe.

### S54 — Les trois familles

*★★★ · effort L · 🔊 natif (Voyager, LIGO) / transposé (Persée), facteur affiché · plein écran · remplace le schéma V17, V18, V19 · chapitre : Tableau de cohérence — où ranger chaque « son de l’espace »*

- **Commandes** : objet (modes p, sunquake, CMB, Persée, type III, héliopause Voyager, LIGO), « transposer de N octaves »
- **Comment l’utiliser** : Choisir un objet, lire sa famille et sa fréquence native, régler la transposition et écouter. Pour Voyager, faire varier n_e et écouter f_pe.
- **Ce que ça montre** : La nature physique (pression, plasma, gravitation) et l’opération de mise en audio, sur deux lignes distinctes ; fréquences natives, facteurs 2⁵⁷/2⁵⁸ pour Persée, f_pe selon la densité et chirp LIGO explicitement simulé.
- **Sens de lecture** : Avant lecture, annoncer ce qui oscille, le capteur ou le modèle et la transformation audio. Certains signaux Voyager et LIGO sont dans la bande audible sans transposition ; la sonification de Persée est une reconstruction accélérée de données spatiales, pas une prise de son au microphone.

### S55 — Le Soleil comme salle de Mersenne

*★ · effort L · 🔊 transposé de 15–16 octaves, facteur dit · plein écran · chapitre : Famille A1 — héliosismologie : le Soleil comme salle de Mersenne*

- **Commandes** : profil c_s(r), degré ℓ, ordre n
- **Comment l’utiliser** : Lancer un rayon depuis la surface, regarder sa remontée ; changer ℓ ; lire Δν sur le spectre.
- **Ce que ça montre** : Les rayons acoustiques réfractés dans le Soleil (c croît avec la profondeur), le spectre ℓ–ν, la grande séparation Δν ≈ 135 µHz calculée par (2∫dr/c_s)⁻¹.
- **Sens de lecture** : Comparer la réfraction à celle du canal SOFAR, puis lire Δν en hertz : c’est approximativement l’inverse du temps d’un aller-retour acoustique, pas ce temps lui-même.

## 7. Ce que ça donne

- **56 ateliers** : 25 ★★★, 21 ★★, 10 ★. **Périmètre retenu pour la première version (23 septembre 2026) : les 25 ★★★ plus la DAW S34 et les ateliers qui remplacent un schéma (S43, S49, S56)**, soit 29 ateliers ; les autres viennent ensuite. Socle minimal de repli (16) : S01, S03, S04, S06, S09, S13, S14, S17, S18, S19, S22, S23, S28, S29, S30, S41.
- **Trois ateliers-tronc** réutilisés par les autres : le moteur audio (§8), la FFT / spectrogramme (S18 → S04, S17, S22, S23, S28, S42, S46), le bac à ondes 2D (S09 → S10, S24).
- Ordre de construction : moteur audio → S17/S18/S19 → S04/S06/S09 (workers) → musique S27–S30 → micro S22, S23, S42 → le reste par priorité → S34 en dernier.
- Effort estimé : 10 S + 27 M + 16 L + 3 XL. Si l’on coupe : d’abord les ★, puis fusionner S07+S08 dans S05, S40 dans S39, S35 dans S34, S32 dans S28.
- **Dans la page** : chaque atelier est un bloc `.atelier` inséré à la fin de sa sous-section, avec les trois paragraphes ci-dessus sous le composant (gabarit : titre Cinzel, consigne d’une phrase, commandes, puis « Comment l’utiliser / Ce que ça montre / Sens de lecture »), un bouton « Activer / Éteindre », un bouton plein écran pour les gros ateliers, et un `noscript` avec image statique. Tous les ateliers sont dans `index.html` ; le seul compagnon est `portraits.html`.

## 8. Moteur audio partagé (`shared/audio.ts`) — contraintes techniques

- **Un seul `AudioContext`**, créé au premier geste utilisateur (politique d'autoplay),
  suspendu quand l'onglet est masqué, repris au retour. Sample rate lu, jamais supposé
  (44,1 ou 48 kHz selon la machine) : S19 et S44 l'affichent.
- **Chaîne master obligatoire** : gain global (−12 dB par défaut) → limiteur
  (`DynamicsCompressorNode` en mode brickwall) → sortie. Aucun atelier ne branche sa
  sortie ailleurs. Un bouton « couper tout » global, visible dans la nav sticky.
- **Bandeau de sécurité** au-dessus du premier atelier et rappelé sur les ateliers casque :
  baisser le volume avant de lancer, jamais de sinus pur à fort niveau au casque, S44 à
  niveau plafonné et durée limitée.
- **Micro** (`getUserMedia`) : permission demandée par atelier au clic, jamais au
  chargement ; **traitement local, aucun octet envoyé, rien d'enregistré sans bouton
  explicite** — phrase à écrire sur la page et dans la mention de confidentialité (le
  site n'a pas de cookies ni d'analytics : ne pas rompre cette promesse). Repli propre si
  refusé (les ateliers tournent sur générateurs ou fichier importé). `echoCancellation`,
  `noiseSuppression` et `autoGainControl` **désactivés** (sinon les mesures S22/S23/S42
  sont fausses) — à documenter.
- **FFT maison** (radix-2 en TypeScript, fenêtres Hann/Blackman, recouvrement 75 %) dans
  `shared/fft.ts` : `AnalyserNode` ne permet ni de choisir la fenêtre, ni d'analyser un
  buffer hors temps réel (S17, S21, S23). `AnalyserNode` reste pour les animations légères.
- **Calcul lourd hors thread** : S09 (FDTD), S04 (corde), S06 (Chladni), S25 (phase
  vocoder) en **WebWorker** ; génération audio par simulation (S04, S13) en
  **AudioWorklet**. Un worklet est un **fichier séparé** : même mécanique d'empreinte que
  `mirage-worker.js` (hash dans les sources → bundle → `stamp-assets.py`) et déclaration
  dans le manifeste. `scripts/build-son-viz.sh` à calquer sur `build-lumiere-viz.sh`.
- **Ce que le navigateur ne fait pas**, à afficher sur les ateliers concernés : pas
  d'infrason (enceintes, et souvent DAC), pas d'ultrason (48 kHz ⇒ < 24 kHz, et les
  enceintes coupent avant), pas de dB SPL absolus (micro non étalonné : toutes les
  mesures de niveau sont **relatives**), pas de garantie de casque (S39/S40 demandent
  confirmation).
- **Sans JavaScript / reduced-motion** : image statique de repli (`noscript`) par atelier,
  animations gelées sur un état parlant, audio jamais lancé automatiquement.
- **Reproductibilité** : `data-seed` pour les ateliers à aléatoire (S06 sable, S09 bruit,
  S38 sondage), comme pour Lumière.
- **Données et licences** : HRTF KEMAR (MIT, libre), enregistrements de cétacés NOAA/PMEL
  (domaine public), chauve-souris : à enregistrer par l'équipe ou xeno-canto
  (CC BY-NC-SA, compatible avec la licence du site en le créditant à part), Hunga Tonga :
  CTBTO vDEC (accès sur demande) ou reconstruction annoncée. Aucun extrait musical
  protégé : les démos « musique » tournent sur des rendus synthétiques ou des œuvres du
  domaine public rejouées par synthèse.

## 9. Compagnon plein écran (option)

S34 (DAW), S18 (spectrogramme), S09 (bac à ondes) et S42 (voyelles) gagnent à exister
aussi dans une page **`laboratoire.html`** plein écran, avec le même bundle — comme
`simulateur/` pour le Dossier XXVII, mais construit dans le dépôt. La page du dossier
garde les versions « encadrées » ; le compagnon les ouvre en grand avec un lien de retour.

## 10. Mise en page des ateliers — pleine largeur, mobile et PC, plein écran

Exigences fixées le 23 septembre 2026 (elles priment sur les conventions héritées de Lumière).

- **Pleine largeur de la page.** Le bloc `.atelier` sort de la colonne de lecture `--max` et occupe 100 % de la largeur utile de la fenêtre (gouttières de 16 px sur mobile), recentré par `margin-inline: calc((100% - <largeur>) / 2)` comme les `.viz-section` de la charte — jamais par `transform`, jamais avec un défilement horizontal. À 360 px comme à 3 840 px, le composant remplit la largeur ; au-delà de 1 800 px, le canvas garde un ratio lisible (plafond de hauteur à ~70 vh) et les commandes se placent à côté plutôt que dessous.
- **Deux dispositions, une seule logique.** Sous 760 px : commandes empilées sous le canvas, une par ligne, curseurs sur toute la largeur, boutons d’au moins 44 × 44 px, texte à 16 px minimum, aucune fonction accessible seulement au survol. Au-dessus : canvas à gauche (60–70 %), panneau de commandes à droite, lecture « Ce qu’on voit / Ce qu’on en conclut » sous les deux. Les gestes tactiles remplacent la souris partout (glisser pour pincer la corde S04, poser le chevalet S27, dessiner les murs S09, tracer la période S17) ; `touch-action: none` sur les canvas interactifs, pas ailleurs.
- **Lisibilité.** Étiquettes SVG mesurées (`getComputedTextLength()`) à 360 px ; axes et légendes en Cinzel/Fraunces aux tailles du codex, jamais sous 12 px effectifs ; contraste des courbes vérifié sur le fond nuit ; valeurs numériques recalculées, pas codées en dur ; état de départ déjà parlant (jamais d’écran vide).
- **Plein écran pour les gros ateliers** (liste `FULL` dans `ateliers.py`, marqués « plein écran » dans les fiches et dans le script) : bouton ⛶ dans l’angle du bloc → `element.requestFullscreen()` sur le conteneur de l’atelier ; en plein écran, le canvas prend toute la surface, les commandes passent en tiroir latéral (PC) ou en barre inférieure repliable (mobile), Échap ou le même bouton ferment. Repli sans Fullscreen API (iOS Safari sur iPhone) : superposition CSS `position: fixed; inset: 0` du même composant, avec le même bouton de fermeture — **pas de page compagnon** : tous les ateliers vivent dans `index.html` (décision du 23 septembre 2026). Sur mobile, suggérer l’orientation paysage pour S09, S18, S34 (message discret, pas de verrouillage).
- **Activation et extinction.** Un atelier ne consomme rien tant que le lecteur ne l’a pas activé : au chargement, chaque bloc affiche une image statique (la même que le `noscript`) et un bouton « Activer l’atelier » ; le composant n’est monté, et le calcul (worker, AudioContext, boucle d’animation) lancé, qu’à ce clic. Un bouton « Éteindre » démonte le composant, arrête le worker et l’audio et remet l’image. Un atelier sorti de la fenêtre depuis plus d’une minute se met en pause de lui-même (`IntersectionObserver`), et un seul atelier audio joue à la fois. Aucun lien de retour vers un compagnon : le repli plein écran est la superposition CSS ci-dessus.
- **Audio et micro en plein écran** : le bouton « couper tout » reste visible ; la demande de permission micro se fait au clic, jamais à l’entrée en plein écran.
- **Contrôle** : chaque atelier vérifié à 360 / 768 / 1 280 / 1 920 / 2 560 / 3 840 px, en portrait et paysage sur mobile, avec `scrollX === 0` après `scrollTo(9999,0)`, et une capture par état (repos, en action, plein écran) dans `a_traiter/provoxys-son/captures/`.
