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
| S57 | Fabriquer un son | Instruments = machines à conditions aux limites | ★★★ | XL | 🔊 | oui |

## 1. Physique fondamentale et ondes

### S01 — Onde longitudinale

*★★★ · effort S · 🔊 · remplace le schéma V01 · chapitre : Grandeurs*

- **Commandes** : fréquence 20 Hz–2 kHz, amplitude, fenêtre observée, courbe p / u / déplacement, pause, « suivre un volume d’air », « suivre un front »
- **Comment l’utiliser** : Choisir une fréquence, lancer le son, puis suivre séparément le volume d’air coloré et le front de compression marqué d’un triangle. Mettre en pause pour mesurer λ entre deux compressions ; afficher « les trois » courbes pour comparer pression, vitesse et déplacement.
- **Ce que ça montre** : Une rangée de petits volumes d’air qui oscillent sur place pendant que les compressions avancent à c = λ f ; dessous, la pression p(x), la vitesse u(x) ou le déplacement ξ(x). Dans cette onde progressive, p et u culminent ensemble (p = ρc·u) et ξ un quart de période plus tard. Le ralenti (f / 0,5 Hz) et l’exagération du déplacement (rapportée à un son de 60 dB SPL, 25 nm à 440 Hz) sont affichés.
- **Sens de lecture** : Regarder d’abord le volume coloré : il va et vient sans partir. Puis suivre le front : il avance de λ à chaque période. Le mouvement local et la propagation sont deux choses distinctes ; les amplitudes dessinées sont grossies des millions de fois.

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
- **Ce que ça montre** : Trois effets séparés : le niveau transmis par le gaz, qui suit son impédance ρc et perd 20 dB par décade de pression ; la célérité, qui reste 343 m/s à température fixée tant que le gaz se comporte comme un fluide ; le résidu transmis par le fil ou le socle, qui ne dépend pas du gaz. Une courbe de niveau relatif en fonction de la pression, et l’assourdissement des aigus dans la dernière décade.
- **Sens de lecture** : Écouter le tic-tac disparaître avant la fin du pompage : ce n’est pas la vitesse du son qui s’effondre, c’est le couplage entre la source, le gaz et le verre. Retenir aussi que la cloche frappée ne fait que faiblir : le fil transmet encore.

### S04 — La corde de d’Alembert

*★★★ · effort L · 🔊 · plein écran · remplace le schéma V03 · chapitre : Corde de Mersenne*

- **Commandes** : pincer ou frapper n’importe où (glisser), impulsion étroite, longueur L, tension T, masse linéique µ, amortissement τ₁, corde raide
- **Comment l’utiliser** : Pincer la corde à la souris, écouter, lire la fréquence mesurée. Multiplier la tension par quatre (la fréquence double), puis doubler la longueur (elle est divisée par deux) ; pincer au milieu, puis près du chevalet. Lancer une impulsion étroite en « très ralenti » pour suivre ses réflexions.
- **Ce que ça montre** : Une corde idéale calculée mode par mode : la célérité √(T/µ) sur la corde, f₁ = (1/2L)√(T/µ) confrontée à la fréquence mesurée sur le son produit (écart inférieur à 2 cents de 27 Hz à 3 kHz, à 0,3 cent près en dessous de 1 kHz), les amplitudes des modes selon le point d’attaque, et une impulsion qui revient à l’envers après chaque extrémité fixe. L’onde transverse de la corde et le son dans l’air ont la même fréquence, pas la même longueur d’onde.
- **Sens de lecture** : D’abord la forme de la corde juste après le geste (deux fronts qui s’éloignent), puis l’impulsion : chaque réflexion sur un chevalet l’inverse. Ensuite les barres de modes : pincer au milieu éteint les harmoniques pairs. Enfin vérifier que quadrupler T monte d’une octave. Les pertes sont une loi empirique réglée pour l’écoute.

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
- **Ce que ça montre** : Les modes propres d’une plaque d’acier en flexion (pas d’une membrane tendue), avec des bords idéalisés, le sable qui migre vers les lignes nodales, la réponse de la plaque au point d’excitation et la liste des (m, n) rencontrés ; la longueur d’onde de flexion comparée à celle du son dans l’air.
- **Sens de lecture** : Observer que le sable s’immobilise là où la plaque ne bouge pas. Puis garder la fréquence et changer la plaque : la figure change, car elle dépend de la forme, du matériau et des appuis. Les lignes montrent la vibration de la plaque, pas des rayons sonores ; c’est la réponse à la « cymatique créatrice ».

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

- **Commandes** : dessiner des murs, placer une source (impulsion / continu / voix), fréquence, absorption ; présets : obstacle, grotte, deux sources, fente, double fente, réfraction, salle
- **Comment l’utiliser** : Choisir un préset ou dessiner ses murs, poser la source, lancer une impulsion. Déplacer la sonde pour lire p(t) à un endroit ; passer en source continue pour voir les modes. Le préset « Réfraction » fait passer une onde plane de l’air dans du CO₂.
- **Ce que ça montre** : Une simulation des équations de l’acoustique linéaire en deux dimensions (FDTD) où réflexion, réfraction, diffraction, interférence et stationnaires se produisent d’elles-mêmes, vérifiées contre les cas simples : réflexion sans inversion sur un mur rigide, direction réfractée conforme à Snell–Descartes à 1° près, premier minimum de la fente à 31° pour 30° attendus, modes de la salle à 1 % près.
- **Sens de lecture** : Une impulsion d’abord : suivre le front, ses rebonds, son contournement du coin. Puis une source continue à basse fréquence : les taches fixes sont les modes de la pièce. Garder en tête que c’est une tranche en 2D : le niveau n’y baisse que de 3 dB par doublement de distance, contre 6 dB pour une source ponctuelle réelle.

### S10 — Gradins d’Épidaure

*★★ · effort M · 🔊 · chapitre : Grèce : Pythagore, Archytas, Aristote, Épidaure*

- **Commandes** : pas des gradins, angle, hauteur de marche ; « bruit de fond / voix »
- **Comment l’utiliser** : Jouer la voix seule, puis le bruit de fond, puis les deux à travers le filtre des gradins. Modifier le pas des marches pour déplacer la coupure.
- **Ce que ça montre** : La réponse en fréquence d’un réseau périodique de marches : atténuation sous ~500 Hz, passage de la bande de la voix (Declercq & Dekeyser 2007).
- **Sens de lecture** : Lire la courbe de gauche à droite : le creux dans les graves, le plateau dans la bande 500–3 000 Hz. Puis écouter : le vent baisse, la voix reste. Ce n’est pas de la magie, c’est de la diffraction.

### S11 — Inverse du carré et décibels

*★★★ · effort S · 🔊 · chapitre : 6. Distance et atténuation — inverse du carré, addition, absorption*

- **Commandes** : distance 0,1 m–1 km, niveau de source à 1 m, nombre de sources 1–100, doubler r, doubler la puissance, doubler les sources, addition en énergie ou en phase
- **Comment l’utiliser** : Éloigner la source et lire le niveau au point d’écoute ; puis tester séparément chaque doublement : la distance, la puissance d’une source, le nombre de sources non corrélées, et deux sources cohérentes en phase.
- **Ce que ça montre** : L(r) = L₁ − 20 log(r/r₁) en dB SPL (référence 20 µPa) au point d’écoute, avec r₁ = 1 m ; la somme énergétique des niveaux non corrélés (60 + 60 = 63 dB) et la somme des pressions cohérentes en phase (60 + 60 = 66 dB) ; une échelle de repères. Sous 1 m, la courbe devient pointillée : le modèle ponctuel diverge quand r → 0.
- **Sens de lecture** : Dans le modèle de source ponctuelle en champ libre, doubler la distance enlève environ 6 dB. Doubler le nombre de contributions non corrélées, de même niveau au point de réception, ajoute environ 3 dB. Réflexions, proximité de la source et cohérence changent ces résultats.

### S12 — Absorption dans l’air

*★★ · effort M · 🔊 · chapitre : 6. Distance et atténuation — inverse du carré, addition, absorption*

- **Commandes** : fréquence 100 Hz–100 kHz, humidité, température, distance
- **Comment l’utiliser** : Choisir une distance et une humidité, écouter un bruit blanc « après d mètres » ; monter la fréquence du curseur jusqu’à 40 kHz.
- **Ce que ça montre** : Le coefficient α(f) de l’ISO 9613-1 en dB/km, le spectre du bruit filtré par la distance.
- **Sens de lecture** : À 1 kHz, la courbe est plate (5 dB/km) ; à 8 kHz elle grimpe (78 dB/km) ; à 40 kHz elle dépasse 1 dB par mètre. Le tonnerre lointain et la courte portée du sonar aérien se lisent sur la même courbe.

### S13 — Doppler — qui bouge ?

*★★★ · effort M · 🔊 · plein écran · remplace le schéma V11 · chapitre : 3. Les deux à la fois + vent*

- **Commandes** : vitesse source, vitesse observateur, vent le long de la route, « source / observateur / les deux », distance de passage (géométrie oblique), fréquence, présets dont « tout fixe + vent »
- **Comment l’utiliser** : Faire passer la source devant l’observateur, écouter ; échanger les rôles (observateur mobile) à vitesse égale ; ajouter du vent ; pousser la source vers c.
- **Ce que ça montre** : Les fronts circulaires nés là où la source était, f′ calculée avec les bons signes, la courbe f′(t) du passage ; le cône de Mach quand v → c. Le glissement de hauteur est produit par la géométrie (retard = distance/c), pas par un effet de pitch.
- **Sens de lecture** : Comparer les espacements des fronts devant et derrière la source, puis source mobile et observateur mobile : à 30 m/s, × 1,096 contre × 1,087 à l’approche. Le passage à distance non nulle rend le glissement progressif. Les vitesses Doppler se définissent relativement au milieu ; avec du vent, préciser ce référentiel et les composantes le long du trajet, sans ajouter le vent deux fois. Le préset « tout fixe + vent » le vérifie : un vent uniforme entre deux points fixes change le retard, pas la fréquence. Le double trajet (écho sur le mobile) est affiché à part.

### S14 — Battements

*★★★ · effort M · 🔊 (binaural : casque) · remplace le schéma V06 · chapitre : 1. Battement acoustique du premier ordre*

- **Commandes** : f_a, f_b (molettes fines), présets 440/441, 440/448, 440/470, quinte juste vs tempérée, tierce ; timbre sinus ou six partiels ; écoute mélangée ou casque séparé ; graphique du bas : zones ou spectre
- **Comment l’utiliser** : Choisir 440 et 441 Hz, écouter, compter les pouls ; laisser le compteur automatique les compter aussi. Passer à 448 Hz, puis aux présets quinte et tierce. En casque, séparer les oreilles pour le binaural, puis repasser en mono.
- **Ce que ça montre** : Forme d’onde, modulation signée cos(πΔf t) et son enveloppe |cos(πΔf t)|, qui culmine |f_a − f_b| fois par seconde ; le spectre de la somme, qui ne montre que f_a et f_b et aucune raie à la différence ; la zone pouls / rugosité / deux sons (Plomp & Levelt) ; en 2ᵉ ordre, les partiels qui se ratent (3f_g contre 2f_a) ; en binaural, aucune enveloppe dans l’air.
- **Sens de lecture** : Compter à 1 Hz puis comparer à 8 Hz : la frontière entre pulsation et rugosité dépend de l’auditeur. Ouvrir le spectre : le battement est une enveloppe, pas une nouvelle fréquence. Pour le binaural, couper un seul canal supprime l’interaction entre oreilles ; mélanger les deux canaux produit au contraire un battement acoustique, visible sur leur somme. Ce ne sont pas les mêmes mécanismes.

### S15 — Résonateur de Helmholtz

*★★ · effort S · 🔊 · chapitre : Instruments = machines à conditions aux limites*

- **Commandes** : volume, section et longueur du col, « remplir d’eau »
- **Comment l’utiliser** : Souffler (bruit blanc) dans la bouteille virtuelle, écouter la note ; remplir d’eau par paliers.
- **Ce que ça montre** : f ≈ (c/2π)√(S/VL), la courbe de réponse du résonateur, la note qui monte quand V baisse.
- **Sens de lecture** : Le résonateur renforce une région du spectre du bruit excitateur. La bouteille et certains pièges à basses illustrent ce modèle, avec longueur effective du col ; le pavillon de l’oreille a une géométrie et des résonances plus complexes.

### S16 — Sonar à impulsion

*★★★ · effort M · 🔊 (ping ralenti) · remplace le schéma V09 · chapitre : Physique du geste*

- **Commandes** : fréquence, durée d’impulsion, distance de la cible, milieu (air / eau / tissu), deux cibles rapprochées (réflectivité de la seconde), période de répétition, bruit ambiant, écho multiple
- **Comment l’utiliser** : Placer la cible, émettre, lire Δt et la distance déduite. Rapprocher deux cibles jusqu’à ce que leurs échos fusionnent, puis raccourcir l’impulsion. Affaiblir la seconde cible, monter le bruit, raccourcir la période de répétition, activer l’écho multiple.
- **Ce que ça montre** : d = cΔt/2 (aller-retour, célérité du milieu), et trois portées distinctes : la résolution axiale cτ/2, la portée non ambiguë cT_rep/2 et la portée détectable, qui dépend de la cible, de la fréquence et du bruit. Une cible faible peut disparaître dans le bruit ; un écho multiple dessine un fantôme à 2d.
- **Sens de lecture** : Lire Δt sur l’oscillogramme, faire le calcul à voix haute (2 ms dans l’eau : 1,5 m). Puis voir les deux échos se séparer quand l’impulsion raccourcit : c’est le compromis de tout échographe. Enfin, un écho qui revient après l’impulsion suivante se lit trop près : pouvoir séparer, lever l’ambiguïté et détecter sont trois questions différentes.

### S56 — La règle des fréquences

*★★ · effort S · 🔊 (dans l’audible seulement) · remplace le schéma V02 · chapitre : Spectre utile pour le live*

- **Commandes** : axe logarithmique 0,01 Hz → 1 GHz, curseur de fréquence, calques : infrasons / audible / ultrasons, animaux, instruments, machines et médecine
- **Comment l’utiliser** : Glisser le curseur le long de l’axe et lire ce qui vit à cette fréquence ; activer les calques ; écouter la fréquence quand elle est dans l’audible (le bouton se grise ailleurs).
- **Ce que ça montre** : Un seul axe pour tout le dossier : microbaroms à 0,2 Hz, éléphants, orgue de 32 pieds, voix, oreille (20 Hz–20 kHz, maximum 2–5 kHz), chauve-souris, échographe, fréquence plasma de Voyager — avec la longueur d’onde qu’aurait un son de même fréquence dans l’air et dans l’eau. Une fréquence seule ne fixe pas λ : il faut un milieu et sa relation de dispersion. Pour le plasma ou le champ électromagnétique, cette λ n’est qu’une comparaison.
- **Sens de lecture** : Repérer d’abord la fenêtre humaine, étroite au milieu de l’axe ; puis voir combien d’êtres et de machines vivent à sa gauche et à sa droite. Les frontières 20 Hz / 20 kHz sont des repères statistiques, pas des murs.

### S57 — Fabriquer un son

*★★★ · effort XL · 🔊 · plein écran · chapitre : Instruments = machines à conditions aux limites*

- **Commandes** : scène (corde, corde et table, membrane, lame ou cloche, colonne d’air, bouteille, voix, haut-parleur, souffle, bulle), geste compatible, un réglage principal par scène, réglages dépliables, comparaisons A/B, écoute à gain commun ou normalisée, ralenti, instant observé, défis
- **Comment l’utiliser** : Choisir ce qui vibre, lancer le geste proposé, puis changer un seul réglage et relancer. Lire les trois cadres : énergie, vibration, rayonnement. Suivre la frise : elle montre quand l’énergie arrive et comment elle décroît. Comparer deux situations dans le panneau A/B, puis tenter les défis.
- **Ce que ça montre** : Dix sources calculées pas à pas : corde pincée, frappée ou frottée, table d’harmonie, peau tendue, lame, cloche, tuyau à jet ou à anche, bouteille de Helmholtz, voix, haut-parleur, souffle, bulle. Pour chacune : le mouvement de ce qui vibre, la pression reçue à 1 m, le spectre et l’énergie stockée.
- **Sens de lecture** : Trois questions pour toute source : d’où vient l’énergie, qu’est-ce qui oscille, comment l’air est mis en mouvement. Un geste bref laisse une décroissance libre. Un apport entretenu compense les pertes, et parfois s’organise lui-même : archet, jet, anche. La table ne crée pas d’énergie, elle transmet mieux celle de la corde.

## 2. Analyse du signal, FFT, spectrogramme

### S17 — Fourier à la main

*★★★ · effort L · 🔊 · plein écran · chapitre : Série de Fourier*

- **Commandes** : dessiner une période, ou carré / dent de scie / triangle / impulsion ; N harmoniques 1–64 ; « reconstruire » ; vue « épicycles »
- **Comment l’utiliser** : Dessiner une période au doigt, ou choisir un carré. Augmenter N harmonique par harmonique et écouter la reconstruction à la fréquence choisie.
- **Ce que ça montre** : Les amplitudes et les phases de chaque harmonique n (fréquence n × f₀), la somme partielle superposée à la période dessinée, qui se répète sans fin, et les épicycles. Au voisinage d’un saut de valeur (carré, dents de scie, jonction d’un dessin dont la fin ne rejoint pas le début), la somme dépasse d’environ 9 % du saut : c’est le phénomène de Gibbs. Un angle continu, comme la pointe du triangle, n’est pas ce cas.
- **Sens de lecture** : Partir de N = 1 (un sinus) et monter : le dessin se remplit et le timbre s’épaissit en même temps. Comparer le triangle, qui converge sans dépassement, au carré, dont le dépassement se resserre contre le saut sans disparaître. Changer les phases garde les mêmes fréquences et la même valeur efficace, mais change la forme.

### S18 — Le spectrogramme

*★★★ · effort XL · 🎙🔊 · plein écran · chapitre : 4. Analyser — la transformée de Fourier discrète et la FFT (1965)*

- **Commandes** : source : micro / générateurs (dont deux tons proches et impulsions) ; taille de fenêtre 256–8 192 ; type de fenêtre ; ajout de zéros ×1 / ×4 / ×8 ; échelle linéaire / log, loupe 950–1 100 Hz ; plage dB
- **Comment l’utiliser** : Autoriser le micro, parler ou siffler, lire le spectrogramme qui défile. Changer la taille de fenêtre en gardant le même son ; survoler pour lire fréquence, temps et niveau.
- **Ce que ça montre** : Une FFT maison (fenêtre, recouvrement et ajout de zéros au choix), un spectrogramme (temps horizontal, fréquence verticale, couleur = niveau par case en dB relatifs à la pleine échelle), le spectre instantané et la forme d’onde ; le compromis temps / fréquence rendu visible.
- **Sens de lecture** : Siffler : une ligne fine. Claquer des doigts, ou choisir « Impulsions » : une barre verticale. Puis agrandir la fenêtre : la ligne s’affine, la barre s’étale. C’est Gabor (Δt·Δf ≳ 1) en une manipulation. Avec « Deux tons proches » (25 Hz d’écart) : une seule bosse avec N = 2 048, deux raies nettes avec N = 8 192. L’ajout de zéros resserre les cases sans séparer les deux tons : il densifie l’affichage, il n’allonge pas la durée observée.

### S19 — Échantillonnage et Nyquist

*★★★ · effort M · 🔊 · chapitre : 2. Le repliement (aliasing) — ce que le filtre anti-repliement empêche*

- **Commandes** : f du signal (20 Hz–100 kHz) ou glissando, f_s virtuelle 1–96 kHz, bits 1–16, dither on/off, filtre anti-repliement on/off, niveau
- **Comment l’utiliser** : Lancer un glissando montant, couper le filtre anti-repliement et écouter ; puis baisser le nombre de bits, avec et sans dither.
- **Ce que ça montre** : Les points d’échantillonnage sur la sinusoïde, la reconstruction en sinus cardinal (qui redonne le signal s’il est limité sous f_s/2, et un autre sinus sinon), le repliement (30 kHz → 14,1 kHz à 44,1 kHz), le filtre anti-repliement et son atténuation, le bruit de quantification (6,02 n + 1,76 dB pour un sinus à pleine échelle). Une grille de points n’est pas la forme du son reproduit.
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

- **Commandes** : micro ; algorithme de l’aiguille (YIN / autocorrélation / pic de la FFT) ; durée analysée 21 / 43 / 85 ms ; générateur : fondamentale normale, faible, absente, sinus, bruit ajouté ; référence 415 / 432 / 440 / 442
- **Comment l’utiliser** : Chanter ou jouer une note tenue, lire la note et l’écart en cents ; changer d’algorithme sur le même son ; changer la référence. Avec le générateur, affaiblir puis retirer la fondamentale, ajouter du bruit, raccourcir la durée analysée, et lire la dispersion.
- **Ce que ça montre** : f₀ estimée, l’aiguille en cents, l’historique et la dispersion sur une seconde ; le pic de la FFT, qui désigne la composante la plus forte et saute d’une octave quand la fondamentale est faible ou absente, alors que YIN et l’autocorrélation retrouvent la période. Avec beaucoup de bruit, YIN fait des erreurs d’octave ; une trame courte perd les graves.
- **Sens de lecture** : Lire la fréquence mesurée et les cents relativement au diapason choisi, au cent près : l’affichage ne promet pas plus que la dispersion mesurée. Passer la référence à 432 Hz conserve le signal entrant mais change son écart à la cible et peut changer la note affichée ; cela ne retend pas l’instrument.

### S23 — Convolution et réverbération (T60 au clap)

*★★★ · effort L · 🎙🔊 · plein écran · remplace le schéma V14 · chapitre : Faire taire la pierre — acoustique architecturale*

- **Commandes** : réponse impulsionnelle h : impulsion seule, écho simple, synthétique (T60 fixés, régie, concert, cathédrale) ou enregistrée par un clap au micro ; source sèche x : voix, clap, note pincée ; dosage sec / réverbéré ; volume V pour Sabine
- **Comment l’utiliser** : Enregistrer un clap dans la pièce où l’on se trouve, lire le T60 mesuré, puis convoluer sa voix avec cette réponse ou avec une réponse synthétique de cathédrale.
- **Ce que ça montre** : Les trois signaux de la convolution : la source sèche x, la réponse impulsionnelle h et la sortie y = x ∗ h. De l’impulsion seule (y = x) à l’écho simple (y = x plus une copie retardée) puis à la réponse d’une pièce ; la courbe de décroissance de Schroeder, le T60 par régression quand la décroissance est exponentielle, la comparaison avec le calcul de Sabine.
- **Sens de lecture** : Identifier x, h et y avant d’écouter. Lire la décroissance par bande ; estimer T20 ou T30 puis extrapoler T60 seulement si la dynamique utile et la linéarité le permettent : un écho simple n’a pas de T60. La durée du fichier h et son niveau normalisé ne sont ni un T60 ni une puissance. Un clap et un micro ordinaire donnent une estimation dépendante de la source, du bruit, du placement et des traitements automatiques.

### S24 — Calculateur de Sabine

*★★★ · effort M · 🔊 · plein écran · chapitre : Faire taire la pierre — acoustique architecturale*

- **Commandes** : dimensions, matériaux par paroi (α par bande), « ajouter 100 personnes »
- **Comment l’utiliser** : Entrer une salle, choisir ses matériaux, lire T60 par bande ; ajouter le public ; comparer aux présets Boston Symphony Hall / studio / cathédrale.
- **Ce que ça montre** : A = Σ αᵢSᵢ (m² sabine, par bande d’octave de 125 Hz à 4 kHz) et T60 ≈ 0,161 V/A pour Sabine (V en m³) ; comparaison avec Eyring T60 ≈ 0,161 V/[−S ln(1−α moyen)], absorption de l’air (4 m V, ISO 9613-1) en option, fréquence de Schroeder et premier mode axial, et réponse impulsionnelle synthétique annoncée.
- **Sens de lecture** : Regarder T60 par bande avant de regarder la moyenne : une salle « sèche » dans l’aigu peut « boomer » dans le grave. Puis ajouter le public : la salle sèche, comme chez Sabine. Le calcul suppose un champ diffus : il ne prédit ni l’isolation entre pièces ni un mode grave isolé sous la fréquence de Schroeder.

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

- **Commandes** : chevalet mobile, tension et masse linéique relatives, point de pincement, « comparer à la corde entière », cycle des quintes
- **Comment l’utiliser** : Glisser le chevalet aux repères 1/2, 2/3, 3/4, 4/5 ; jouer la portion et la corde entière ensemble. Changer la tension ou la masse linéique, puis déplacer le point de pincement et comparer.
- **Ce que ça montre** : Le rapport de longueurs, l’intervalle nommé, les cents, les battements entre les deux notes ; f = (1/2l)√(T/µ) ; les amplitudes des modes selon le point de pincement, avec des fréquences qui ne changent pas.
- **Sens de lecture** : Aux rapports simples, les deux notes fusionnent ; entre les repères, ça frotte. Déplacer le point de pincement change le timbre (les amplitudes des modes), pas la note : les fréquences propres de la corde restent les mêmes. La légende du forgeron est fausse ; la corde, elle, dit vrai.

### S28 — Timbre additif

*★★★ · effort M · 🔊 · chapitre : Analyse du timbre*

- **Commandes** : 16 curseurs d’harmoniques, enveloppe ADSR, inharmonicité, présets (flûte, clarinette, hautbois, voix, cloche, carré), « fondamentale manquante »
- **Comment l’utiliser** : Choisir un préset, écouter, puis modifier un harmonique à la fois. Cliquer « fondamentale manquante » pour couper le premier harmonique.
- **Ce que ça montre** : Spectre, forme d’onde et enveloppe ; quand f₀ est coupée, le signal n’a plus aucune énergie à f₀, sa période reste 1/f₀ et le partiel le plus grave présent est affiché ; les cloches inharmoniques. Chaque son est normalisé sur sa crête ; en coupant f₀, les autres partiels gardent leur niveau.
- **Sens de lecture** : Même f₀, timbres différents : la note ne bouge pas, la couleur oui. Puis couper f₀ : la hauteur peut rester associée à la fondamentale absente, selon les composantes restantes et les conditions d’écoute. Le spectre physique n’a rien à f₀ ; rien n’est recréé dans l’air.

### S29 — Tempéraments

*★★★ · effort L · 🔊 · plein écran · chapitre : Systèmes dans le monde — ne pas occidentalo-centrer*

- **Commandes** : système (pythagoricien, juste, mésotonique, Werckmeister III, 12-TET, 19/31/53-TET), tonalité, clavier, « quinte du loup », « cycle des quintes »
- **Comment l’utiliser** : Jouer le même accord dans chaque système ; ouvrir le cycle des quintes en pythagoricien et empiler douze quintes ; chercher la quinte du loup en mésotonique.
- **Ce que ça montre** : La table des fréquences et des écarts en cents, le cercle qui ne se ferme pas (comma), la quinte du loup surlignée, les battements de chaque accord, pour un son harmonique idéal dont le spectre, le registre et le niveau sont annoncés.
- **Sens de lecture** : Regarder d’abord le cercle : le douzième maillon ne retombe pas sur le premier. Puis écouter la tierce juste (calme) et la tierce tempérée (qui bat). Les rapports et les battements se calculent ; préférer l’un ou l’autre est une appréciation qui dépend du timbre, du registre et de l’habitude. Le piano est un compromis, pas une loi.

### S30 — Accords et rugosité

*★★★ · effort L · 🔊 · plein écran · chapitre : Étage 1 — la rugosité (Helmholtz → Plomp & Levelt → Sethares)*

- **Commandes** : construire un accord (≤ 6 notes), renversement, système d’accord, timbre, « courbe de dissonance »
- **Comment l’utiliser** : Jouer une triade majeure puis mineure, lire le score de rugosité ; changer le timbre pour une cloche ; ouvrir la courbe de dissonance et déplacer la seconde note.
- **Ce que ça montre** : Le modèle de Sethares, somme des rugosités entre partiels pondérées par min(aᵢ, aⱼ), avec des partiels d’amplitude 0,88ᵏ⁻¹ ; la courbe de rugosité avec ses creux sur 3/2, 4/3, 5/4 pour un timbre harmonique ; l’écart de rugosité maximale d’une paire de sinus, qui s’élargit en hertz quand la note grave monte (20 Hz à 131 Hz, 27,6 Hz à 523 Hz) ; la racine perçue selon un modèle (Terhardt).
- **Sens de lecture** : Les minima du modèle correspondent à une faible rugosité pour le spectre choisi ; c’est un modèle partiel de la sensation, pas un jugement universel de qualité musicale. Comparer majeur et mineur selon le timbre et la disposition, puis distinguer rugosité, fondamentale virtuelle et contexte culturel.

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
- **Comment l’utiliser** : Choisir une démo dans le menu Projet, ou ajouter une piste avec « + Piste ». Double-cliquer un clip pour l’éditer : piano roll, ou pas à pas pour la batterie. Jouer au clavier virtuel, au clavier d’ordinateur ou en MIDI ; le bouton ● enregistre après un décompte. Régler l’instrument, les effets et la table de mixage, puis exporter en WAV. La démo « One drop » rejoue le rythme du reggae et l’écho du dub ([fiche Bob Marley](portraits.html#marley)). Tout reste dans le navigateur.
- **Ce que ça montre** : Tout le dossier réuni dans l’outil qui a remplacé le studio de Schaeffer : instruments de synthèse, séquenceur, effets, console, avec une chaîne du signal qui se suit d’un bout à l’autre (instrument → effets → volume et panoramique → master → sortie). Gain, égalisation (gain selon la fréquence), saturation (non linéaire, crée des harmoniques) et dynamique (gain selon le niveau) y sont quatre actions distinctes. Au bout de la chaîne, le LUFS-mètre rend visible la guerre du volume ; les dBFS sont relatifs à la pleine échelle numérique et ne garantissent aucun niveau de pression à l’oreille.
- **Sens de lecture** : Regarder le master : le crête-mètre et le LUFS-mètre ne disent pas la même chose. Charger « Mur de son » : la crête reste sous le plafond, la sonie monte vers −9 LUFS, l’écart entre les deux fond. Activer la normalisation à −14 LUFS : le master écrasé est baissé d’autant. Il ne gagne plus rien, il reste seulement plus plat.

### S35 — Loudness war

*★ · effort M · 🔊 · chapitre : 7. Depuis 1990 — streaming, normalisation et synthèse*

- **Commandes** : même extrait, compression 0 → extrême, normalisation LUFS on/off (−14, −23)
- **Comment l’utiliser** : Écraser progressivement l’extrait, puis activer la normalisation à −14 LUFS et réécouter les deux versions.
- **Ce que ça montre** : La forme d’onde « saucisse », la plage dynamique, le LUFS intégré, l’égalisation de niveau perçu après normalisation.
- **Sens de lecture** : Comparer les extraits avant puis après normalisation de la sonie : l’avantage de niveau se réduit, mais la dynamique et le timbre restent modifiés. Une cible de −14 LUFS est un réglage de démonstration, pas la norme de tous les services ni la fin historique de la loudness war.

## 4. Psychoacoustique, oreille, voix (le micro comme instrument)

### S36 — Courbes isosoniques

*★★★ · effort M · 🔊 · chapitre : Sonie et masquage*

- **Commandes** : fréquence de test (63 Hz → 12,5 kHz), courbe ISO de comparaison (20 à 80 phones), pondération A ; ajustement « aussi fort que la référence » à 1 kHz
- **Comment l’utiliser** : À faible niveau et sans chercher à compenser un grave inaudible par une forte augmentation de volume, comparer quelques fréquences à une référence à 1 kHz. Garder un plafond de gain et une commande d’arrêt.
- **Ce que ça montre** : Des égalisations subjectives en gain numérique relatif ; courbes ISO 226 montrées comme référence indépendante. Trois grandeurs restent distinctes : pression (dB SPL), niveau numérique (dBFS, affiché pour la référence) et sonie (phones). Sans étalonnage de la chaîne et du casque, l’écoute dans le navigateur ne réalise pas des courbes isosoniques mesurées : on ne mesure ni des phones ni une courbe personnelle absolue.
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
- **Comment l’utiliser** : Choisir une voyelle, faire varier f₀ sans toucher au conduit ; puis garder f₀ et changer de voyelle ; activer le formant du chanteur sur un accompagnement d’orchestre. Passer la voix de « Naturelle » à « Brute (machine) » : une source parfaitement périodique sonne comme une machine.
- **Ce que ça montre** : Une source glottique (des raies harmoniques, multiples de f₀), des résonances du conduit (F1, F2, F3 : ses modes, qui forment l’enveloppe), la carte F1/F2 des voyelles, la voyelle rayonnée = source × filtre. La raie la plus proche de F1 est affichée : un formant n’est pas une harmonique.
- **Sens de lecture** : Dans ce modèle, le point de la carte F1/F2 ne bouge pas quand f₀ change et bouge quand la voyelle change : deux étages réglables indépendamment. Dans une voix réelle, source et conduit se couplent, surtout dans l’aigu chanté : la séparation est une approximation. Le formant du chanteur est une bosse vers 3 kHz qui passe au-dessus de l’orchestre.

### S42 — Vos propres voyelles

*★★★ · effort L · 🎙 · plein écran · chapitre : Voix — deux étages, pas un tuyau magique*

- **Commandes** : micro ; « tenir un [a] », « [i] », « [u] » ; référence homme / femme / enfant
- **Comment l’utiliser** : Tenir un [a] dans le micro, regarder le point apparaître sur la carte des voyelles, puis passer à [i] et [u]. Sans micro, écouter la voix synthétique, naturelle ou brute, et comparer le point estimé au viseur doré.
- **Ce que ça montre** : Les formants F1, F2 estimés par LPC en temps réel, f₀, le spectre (raies harmoniques) sous son enveloppe LPC, le spectrogramme avec les formants surlignés. Avec la voix synthétique, la vraie valeur est affichée à côté de l’estimation.
- **Sens de lecture** : Distinguer les raies (harmoniques de f₀) de l’enveloppe qui porte les formants. À voyelle et articulation approximativement fixes, f₀ peut varier sans déplacement comparable des formants. Une bosse du spectre n’est pas automatiquement une mesure fiable de formant : registre (voix aiguë, harmoniques espacées), micro et traitements, bruit et durée de la fenêtre d’analyse (≈ 45 ms) limitent l’estimation. Aucune interprétation clinique.

### S43 — L’oreille de bout en bout, puis la cochlée

*★★ · effort L · 🔊 · remplace le schéma V12 · chapitre : Entendre — de Helmholtz à la neuroacoustique*

- **Commandes** : coupe de l’oreille (survol de chaque organe : pavillon, conduit, tympan, osselets, fenêtre ovale, cochlée, nerf), « dérouler la cochlée », fréquence ou son complexe, « ampli actif on/off », niveau
- **Comment l’utiliser** : Survoler chaque organe de la coupe pour lire son rôle et son gain, puis cliquer « dérouler la cochlée » ; envoyer un sinus, regarder où l’onde culmine sur la membrane basilaire ; monter la fréquence ; couper l’amplificateur actif.
- **Ce que ça montre** : La chaîne complète pavillon → tympan → osselets → cochlée → nerf. L’oreille moyenne transforme la relation entre pression et débit de vibration et facilite le transfert vers la cochlée : dans le modèle idéal (surfaces tympan / platine et levier), la pression est multipliée par ≈ 22 et le débit de vibration divisé d’autant, sans création de puissance ; mesuré, ce gain est plus faible et dépend de la fréquence. Puis l’onde progressive de Békésy, la tonotopie base → apex, la sélectivité avec et sans cellules ciliées externes (Kemp 1978), amplification active distincte de la transformation passive.
- **Sens de lecture** : Lire la coupe de gauche à droite comme un trajet, en nommant la grandeur de chaque gain (pression, déplacement). Puis, sur la cochlée déroulée, voir le maximum se déplacer vers la base quand f monte : la cochlée sépare dans l’espace certaines contributions fréquentielles, ce qui évoque une analyse spectrale ; elle reste un système vivant, actif, dépendant du niveau et du temps, pas une FFT. Sans l’ampli actif, le pic s’aplatit : l’oreille n’est pas un micro passif.

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
- **Ce que ça montre** : Cri, écho, Δt, portée limitée par l’absorption de l’air, les trois phases search / approach / buzz, le spectrogramme du cri (bande et durée) ; le bilan aller simple (cri reçu par la proie) distinct du bilan aller-retour (écho reçu par la chauve-souris) ; en CF, l’écho qui sort de la fovéa à 83 kHz sans compensation.
- **Sens de lecture** : Suivre l’intervalle entre les cris, distinct de leur fréquence porteuse. Comparer le niveau du cri sur la proie à celui de l’écho : à la limite de détection, la proie reçoit encore un cri fort. Observer la compensation Doppler du rhinolophe. La lecture audio est une expansion temporelle ralentie dix fois (temps ×10 et fréquences ÷10), ni un détecteur hétérodyne ni une division de fréquence ; l’écran l’annonce.

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

- **Commandes** : fréquence 0,01–20 Hz, « obstacle » (humain, maison, immeuble, tour Eiffel, colline), bande du bas (sources / seuil d’audition), écoute d’un grave audible 30–60 Hz
- **Comment l’utiliser** : Baisser la fréquence et regarder la longueur d’onde grandir à côté de l’obstacle choisi ; ouvrir la courbe de seuil d’audition sous 20 Hz.
- **Ce que ça montre** : λ comparée à l’obstacle, diffraction marquée quand l’obstacle est petit devant λ, sans prétendre que tout matériau devient transparent ; pourquoi une grande λ demande une grande source et porte loin (faible absorption, guidage atmosphérique) ; seuils infrasonores de référence et distinction Schumann/pression.
- **Sens de lecture** : À 1 Hz, l’onde fait 343 m : une maison est un point pour elle. Le trait n’est pas un infrason « vu », c’est sa géométrie ; l’enceinte ne rejouera pas ceci, et l’écran le dit. Ne rien entendre ne prouve ni l’absence de signal ni un niveau : il faut un capteur adapté (microbaromètre).

### S50 — Hunga Tonga fait le tour du monde

*★ · effort M · 👁 · chapitre : Sources naturelles — catalogue à tenir propre*

- **Commandes** : station IMS (menu), heure
- **Comment l’utiliser** : Lancer l’horloge du 15 janvier 2022 et regarder l’onde de pression traverser la carte ; choisir une station et lire son barogramme.
- **Ce que ça montre** : Les fronts circulaires à ~310 m/s, les passages successifs, le signal d’une station (données publiques ou reconstruction annoncée comme telle).
- **Sens de lecture** : Compter les passages : l’onde repasse plusieurs fois, comme celle du Krakatoa en 1883. L’infrason est une oreille diplomatique avant d’être un mystère.

### S51 — Échographe

*★★★ · effort L · 👁 · plein écran · remplace le schéma V10 · chapitre : Impédance et écho — pourquoi le gel*

- **Commandes** : fréquence 2–15 MHz, gel on/off, fantôme (foie + os + kyste + poumon + fils de test), gain et gain en profondeur, célérité supposée par la machine, mode A / B
- **Comment l’utiliser** : Poser la sonde sur le fantôme sans gel : écran noir ; mettre le gel ; monter la fréquence ; passer en mode A pour lire une seule ligne.
- **Ce que ça montre** : Une image B reconstruite depuis une carte d’impédance : ombre acoustique derrière l’os, renforcement derrière le kyste, atténuation 0,5 dB/cm/MHz, R ≈ 1 à l’air. Amplitude d’écho, position estimée (temps de vol × célérité supposée ÷ 2), résolution axiale (≈ cτ/2) et résolution latérale (largeur du faisceau) sont affichées séparément ; des paires de fils de test permettent de les éprouver.
- **Sens de lecture** : Lire l’image comme des échos traités : un pixel sombre peut correspondre à peu de diffusion, à de l’atténuation ou à une ombre. Le gain et les interfaces interviennent ; les niveaux de gris ne sont ni une photographie ni une carte directe de l’impédance. La profondeur suppose une célérité unique (1 540 m/s par convention) : changer cette hypothèse déplace tous les échos. Comparer le compromis résolution/portée à fréquence croissante, dans l’axe et en travers.

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
- **Ce que ça montre** : La nature physique (pression, plasma, gravitation) et l’opération de mise en audio, sur deux lignes distinctes ; pour chaque objet : ce qui oscille, le milieu, la force de rappel, le capteur et la grandeur enregistrée ; fréquences natives, facteurs 2⁵⁷/2⁵⁸ pour Persée, f_pe selon la densité et chirp LIGO explicitement simulé.
- **Sens de lecture** : Avant lecture, annoncer ce qui oscille, la force de rappel, le capteur ou le modèle et la transformation audio. Certains signaux Voyager et LIGO sont dans la bande audible sans transposition, sans être des ondes de pression : l’audibilité d’une piste ne dit pas la nature de l’onde. La sonification de Persée est une reconstruction accélérée de données spatiales, pas une prise de son au microphone.

### S55 — Le Soleil comme salle de Mersenne

*★ · effort L · 🔊 transposé de 15–16 octaves, facteur dit · plein écran · chapitre : Famille A1 — héliosismologie : le Soleil comme salle de Mersenne*

- **Commandes** : profil c_s(r), degré ℓ, ordre n
- **Comment l’utiliser** : Lancer un rayon depuis la surface, regarder sa remontée ; changer ℓ ; lire Δν sur le spectre.
- **Ce que ça montre** : Les rayons acoustiques réfractés dans le Soleil (c croît avec la profondeur), le spectre ℓ–ν, la grande séparation Δν ≈ 135 µHz calculée par (2∫dr/c_s)⁻¹.
- **Sens de lecture** : Comparer la réfraction à celle du canal SOFAR, puis lire Δν en hertz : c’est approximativement l’inverse du temps d’un aller-retour acoustique, pas ce temps lui-même.

## 7. Ce que ça donne

- **57 ateliers** : 26 ★★★, 21 ★★, 10 ★. **Périmètre retenu pour la première version (23 septembre 2026) : les 25 ★★★ plus la DAW S34 et les ateliers qui remplacent un schéma (S43, S49, S56)**, soit 29 ateliers ; les autres viennent ensuite. Socle minimal de repli (16) : S01, S03, S04, S06, S09, S13, S14, S17, S18, S19, S22, S23, S28, S29, S30, S41.
- **Trois ateliers-tronc** réutilisés par les autres : le moteur audio (§8), la FFT / spectrogramme (S18 → S04, S17, S22, S23, S28, S42, S46), le bac à ondes 2D (S09 → S10, S24).
- Ordre de construction : moteur audio → S17/S18/S19 → S04/S06/S09 (workers) → musique S27–S30 → micro S22, S23, S42 → le reste par priorité → S34 en dernier.
- Effort estimé : 10 S + 27 M + 16 L + 4 XL. Si l’on coupe : d’abord les ★, puis fusionner S07+S08 dans S05, S40 dans S39, S35 dans S34, S32 dans S28.
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
