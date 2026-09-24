# -*- coding: utf-8 -*-
"""Source unique des 56 ateliers du dossier « Le Son ».

Chaque atelier porte : son mode d'emploi (`usage`), ce qu'il montre (`montre`) et son sens
de lecture (`lecture`). Deux sorties :
  python3 ateliers.py catalogue   → réécrit 01-experiences-interactives.md (§1-7)
  python3 ateliers.py injecter    → (ré)injecte les blocs « Atelier » dans script-live-son.md
Les blocs injectés sont délimités par <!-- atelier:Sxx --> … <!-- /atelier --> : l'opération
est idempotente (les anciens blocs sont retirés avant réinjection).
"""
import re, sys, io
from pathlib import Path

FAM = {
 1:'Physique fondamentale et ondes',
 2:'Analyse du signal, FFT, spectrogramme',
 3:'Musique : gammes, accords, timbres, DAW',
 4:'Psychoacoustique, oreille, voix (le micro comme instrument)',
 5:'Bioacoustique, infra, ultra (simuler ce qu’on ne peut pas rejouer)',
 6:'Hors de l’air : phonons, plasma, étoiles',
}

A = [
dict(id='S01', nom='Onde longitudinale', fam=1, h='#### Grandeurs', prio=3, effort='S', audio='🔊',
 cmd='fréquence 20 Hz–2 kHz, amplitude, pause, « suivre une molécule »',
 usage='Choisir une fréquence avec le curseur, lancer le son, puis cliquer « suivre une molécule » : une particule de la rangée se colore. Mettre en pause pour mesurer λ entre deux zones serrées.',
 montre='Une rangée de particules d’air qui oscillent sur place pendant que les zones de compression avancent ; la courbe de pression p(x) dessous, et λ qui rétrécit quand f monte (c = λ f).',
 lecture='Regarder d’abord la particule colorée : elle ne part jamais. Puis suivre une zone sombre (compression) : c’est elle qui traverse. La leçon tient dans l’écart entre les deux.'),
dict(id='S02', nom='Newton–Laplace', fam=1, h='#### Équation de Newton–Laplace', prio=2, effort='S', audio='🔊',
 cmd='milieu (air, hélium, CO₂, eau, acier, tissu mou), température −40 → +40 °C, « isotherme / adiabatique »',
 usage='Sélectionner un milieu et une température ; basculer entre « Newton (isotherme) » et « Laplace (adiabatique) ». L’option « flûte dans l’hélium » rejoue la même note simulée dans le gaz choisi.',
 montre='La célérité de petites perturbations dans chaque milieu, avec les hypothèses affichées ; dans l’air, comparaison isotherme/adiabatique et courbe c(T). Les 295–298 m/s publiés par Newton sont un repère historique distinct du calcul moderne isotherme à 280 m/s.',
 lecture='Comparer les deux valeurs pour l’air à 0 °C : 280 contre 331 m/s, l’écart de 16 % que Laplace referme avec γ. Ensuite seulement changer de milieu.'),
dict(id='S03', nom='Cloche de Boyle', fam=1, h='#### Robert Boyle (1627–1691) et la pompe à vide', prio=3, effort='S', audio='🔊',
 cmd='pompe (pression 1 atm → 10⁻⁴), milieu : air / vide / Mars (6 mbar)',
 usage='Lancer la montre sous la cloche, puis actionner la pompe par paliers. L’option Mars est une simulation annoncée, ou un enregistrement documenté explicitement identifié ; elle ne transforme pas le modèle de cloche en données de Perseverance.',
 montre='Le niveau sonore qui chute avec la densité du gaz (transfert d’impédance), un filtre qui assourdit les aigus, une jauge en décibels.',
 lecture='Écouter le tic-tac disparaître avant la fin du pompage : l’air est un milieu, pas un décor. Retenir que la cloche frappée, elle, ne fait que faiblir (fil, air résiduel).'),
dict(id='S04', nom='La corde de d’Alembert', fam=1, h='#### Corde de Mersenne', prio=3, effort='L', audio='🔊',
 cmd='pincer n’importe où (glisser), longueur L, tension τ, masse linéique µ (matière), amortissement',
 usage='Pincer la corde à la souris, écouter, lire la fréquence mesurée. Multiplier la tension par quatre (la fréquence double), puis doubler la longueur (elle est divisée par deux) ; pincer au milieu, puis près du chevalet.',
 montre='Une corde résolue numériquement (équation d’onde 1D) : deux ondes qui partent et se réfléchissent, les modes affichés en barres, et f₁ = (1/2L)√(τ/µ) confrontée à la mesure. Le son sort de la simulation, pas d’un sample.',
 lecture='D’abord la forme de la corde juste après le pincement (deux fronts qui s’éloignent), puis les barres de modes : pincer au milieu éteint les harmoniques pairs. Enfin vérifier que quadrupler τ monte d’une octave.'),
dict(id='S05', nom='Tuyaux ouverts et fermés', fam=1, h='#### Tuyaux', prio=2, effort='M', audio='🔊',
 cmd='longueur, ouvert-ouvert / fermé-ouvert, correction d’embouchure, température',
 usage='Choisir la longueur, basculer ouvert / fermé, écouter le timbre. Faire monter la température pour voir un orgue se désaccorder.',
 montre='Les profils de pression et de vitesse des modes, la série n c/2L contre (2n−1) c/4L, le spectre du son joué.',
 lecture='Comparer les deux séries à longueur égale : le fermé sonne une octave plus bas et n’a que les impairs, d’où la couleur « creuse » de la clarinette.'),
dict(id='S06', nom='Chladni', fam=1, h='#### Cordes, tuyaux, plaques', prio=3, effort='L', audio='🔊',
 cmd='fréquence (+ « mode suivant »), forme (carré / cercle / rectangle), point d’excitation, « sable »',
 usage='Verser le sable, monter la fréquence lentement ou cliquer « mode suivant ». Changer de forme de plaque à fréquence fixe.',
 montre='Les modes propres calculés d’une plaque, le sable qui migre vers les lignes nodales, la liste des (m, n) rencontrés.',
 lecture='Observer que le sable s’immobilise là où la plaque ne bouge pas. Puis garder la fréquence et changer la plaque : la figure change. C’est la réponse à la « cymatique créatrice ».'),
dict(id='S07', nom='Tube de Kundt', fam=1, h='#### Cordes, tuyaux, plaques', prio=2, effort='M', audio='🔊',
 cmd='fréquence, longueur, gaz (air, He, CO₂), « mesurer λ » (deux repères)',
 usage='Régler la fréquence jusqu’à ce que la poudre forme des tas nets, poser deux repères sur deux tas voisins, lire λ/2 et la vitesse déduite.',
 montre='Une onde stationnaire dans un tube, la poudre aux nœuds de déplacement (ventres de pression), la valeur de c déduite de deux tas voisins espacés de λ/2.',
 lecture='Deux tas voisins = une demi-longueur d’onde. Changer de gaz sans toucher la fréquence : les tas s’écartent dans l’hélium (c plus grand).'),
dict(id='S08', nom='Tube de Rubens', fam=1, h='#### Cordes, tuyaux, plaques', prio=1, effort='M', audio='🔊',
 cmd='fréquence, longueur, débit de gaz',
 usage='Allumer la rampe, envoyer une fréquence, la faire glisser jusqu’à voir les flammes dessiner des bosses stables.',
 montre='Un profil de flammes schématique lié à l’onde stationnaire ; débit, régime de combustion et pression influencent la hauteur, qui ne suit pas universellement la pression instantanée. Il s’agit d’une simulation, sans gaz ni flamme réels.',
 lecture='Chercher la fréquence où les bosses sont nettes, compter les ventres, retrouver λ. Encadré sécurité : gaz et flamme, jamais improvisé chez soi.'),
dict(id='S09', nom='Bac à ondes 2D', fam=1, h='#### 4. Interférence et ondes stationnaires — les modes de la pièce', prio=3, effort='XL', audio='👁 (+🔊 sonde)',
 cmd='dessiner des murs, placer une source (impulsion / continu), fréquence, absorption ; présets : salle, Épidaure, fente simple, double fente, coin de rue',
 usage='Choisir un préset ou dessiner ses murs, poser la source, lancer une impulsion. Déplacer la sonde pour lire p(t) à un endroit ; passer en source continue pour voir les modes.',
 montre='Une simulation d’ondes (FDTD) où réflexion, diffraction, interférence et stationnaires se produisent d’elles-mêmes ; la sonde trace la pression et son spectre.',
 lecture='Une impulsion d’abord : suivre le front, ses rebonds, son contournement du coin. Puis une source continue à basse fréquence : les taches fixes sont les modes de la pièce ; monter la fréquence, elles se multiplient et se brouillent.'),
dict(id='S10', nom='Gradins d’Épidaure', fam=1, h='#### Grèce : Pythagore, Archytas, Aristote, Épidaure', prio=2, effort='M', audio='🔊',
 cmd='pas des gradins, angle, hauteur de marche ; « bruit de fond / voix »',
 usage='Jouer la voix seule, puis le bruit de fond, puis les deux à travers le filtre des gradins. Modifier le pas des marches pour déplacer la coupure.',
 montre='La réponse en fréquence d’un réseau périodique de marches : atténuation sous ~500 Hz, passage de la bande de la voix (Declercq & Dekeyser 2007).',
 lecture='Lire la courbe de gauche à droite : le creux dans les graves, le plateau dans la bande 500–3 000 Hz. Puis écouter : le vent baisse, la voix reste. Ce n’est pas de la magie, c’est de la diffraction.'),
dict(id='S11', nom='Inverse du carré et décibels', fam=1, h='#### 6. Distance et atténuation — inverse du carré, addition, absorption', prio=3, effort='S', audio='🔊',
 cmd='distance 1–1 000 m, niveau de source, nombre de sources 1–100, « additionner »',
 usage='Éloigner la source et lire le niveau ; ajouter des sources identiques une à une et regarder le total.',
 montre='L(r) = L₁ − 20 log(r/r₁), la somme énergétique des niveaux (60 + 60 = 63 dB), une échelle de référence chuchotement → réacteur.',
 lecture='Chaque doublement de distance retire 6 dB ; chaque doublement de sources n’ajoute que 3 dB. Retenir les deux nombres, ils suffisent à démonter la plupart des « dB » de presse.'),
dict(id='S12', nom='Absorption dans l’air', fam=1, h='#### 6. Distance et atténuation — inverse du carré, addition, absorption', prio=2, effort='M', audio='🔊',
 cmd='fréquence 100 Hz–100 kHz, humidité, température, distance',
 usage='Choisir une distance et une humidité, écouter un bruit blanc « après d mètres » ; monter la fréquence du curseur jusqu’à 40 kHz.',
 montre='Le coefficient α(f) de l’ISO 9613-1 en dB/km, le spectre du bruit filtré par la distance.',
 lecture='À 1 kHz, la courbe est plate (5 dB/km) ; à 8 kHz elle grimpe (78 dB/km) ; à 40 kHz elle dépasse 1 dB par mètre. Le tonnerre lointain et la courte portée du sonar aérien se lisent sur la même courbe.'),
dict(id='S13', nom='Doppler — qui bouge ?', fam=1, h='#### 3. Les deux à la fois + vent', prio=3, effort='M', audio='🔊',
 cmd='vitesse source, vitesse observateur, vent, « source / observateur / les deux », angle de passage',
 usage='Faire passer la source devant l’observateur, écouter ; échanger les rôles (observateur mobile) à vitesse égale ; ajouter du vent ; pousser la source vers c.',
 montre='Les fronts circulaires nés là où la source était, f′ calculée avec les bons signes, la courbe f′(t) du passage ; le cône de Mach quand v → c. Le glissement de hauteur est produit par la géométrie (retard = distance/c), pas par un effet de pitch.',
 lecture='Comparer les espacements des fronts devant et derrière la source, puis source mobile et observateur mobile. Les vitesses Doppler se définissent relativement au milieu ; avec du vent, préciser ce référentiel et les composantes le long du trajet.'),
dict(id='S14', nom='Battements', fam=1, h='#### 1. Battement acoustique du premier ordre', prio=3, effort='M', audio='🔊 (binaural : casque)',
 cmd='f_a, f_b (molettes fines), amplitudes, présets 440/441, 440/448, quinte juste vs tempérée, tierce ; mode « 2ᵉ ordre » ; mode casque (binaural)',
 usage='Choisir 440 et 441 Hz, écouter, compter les pouls ; laisser le compteur automatique les compter aussi. Passer à 448 Hz, puis aux présets quinte et tierce. En casque, séparer les oreilles pour le binaural, puis repasser en mono.',
 montre='Forme d’onde et enveloppe, f_batt = |f_a − f_b|, la zone pouls / rugosité / deux sons (Plomp & Levelt) ; en 2ᵉ ordre, les partiels qui se ratent (3f_g contre 2f_a) ; en binaural, aucune enveloppe dans l’air.',
 lecture='Compter à 1 Hz puis comparer à 8 Hz : la frontière entre pulsation et rugosité dépend de l’auditeur. Pour le binaural, couper un seul canal supprime l’interaction entre oreilles. Mélanger les deux canaux en mono produit au contraire un battement acoustique, visible sur leur somme ; ce ne sont pas les mêmes mécanismes.'),
dict(id='S15', nom='Résonateur de Helmholtz', fam=1, h='#### Instruments = machines à conditions aux limites', prio=2, effort='S', audio='🔊',
 cmd='volume, section et longueur du col, « remplir d’eau »',
 usage='Souffler (bruit blanc) dans la bouteille virtuelle, écouter la note ; remplir d’eau par paliers.',
 montre='f ≈ (c/2π)√(S/VL), la courbe de réponse du résonateur, la note qui monte quand V baisse.',
 lecture='Le résonateur renforce une région du spectre du bruit excitateur. La bouteille et certains pièges à basses illustrent ce modèle, avec longueur effective du col ; le pavillon de l’oreille a une géométrie et des résonances plus complexes.'),
dict(id='S16', nom='Sonar à impulsion', fam=1, h='#### Physique du geste', prio=3, effort='M', audio='🔊 (ping ralenti)',
 cmd='fréquence, durée d’impulsion, distance de la cible, milieu (air / eau / tissu), deux cibles rapprochées',
 usage='Placer la cible, émettre, lire Δt et la distance déduite. Rapprocher deux cibles jusqu’à ce que leurs échos fusionnent, puis raccourcir l’impulsion.',
 montre='d = cΔt/2, la résolution axiale cτ/2, la portée qui s’effondre quand f monte dans l’air.',
 lecture='Lire Δt sur l’oscillogramme, faire le calcul à voix haute (2 ms dans l’eau : 1,5 m). Puis voir les deux échos se séparer quand l’impulsion raccourcit : c’est le compromis de tout échographe.'),
dict(id='S17', nom='Fourier à la main', fam=2, h='#### Série de Fourier', prio=3, effort='L', audio='🔊',
 cmd='dessiner une période, ou carré / dent de scie / triangle / impulsion ; N harmoniques 1–64 ; « reconstruire » ; vue « épicycles »',
 usage='Dessiner une période au doigt, ou choisir un carré. Augmenter N harmonique par harmonique et écouter la reconstruction à la fréquence choisie.',
 montre='Les coefficients a_n, b_n calculés, la somme partielle superposée au dessin, le phénomène de Gibbs aux angles, les épicycles qui tournent.',
 lecture='Partir de N = 1 (un sinus) et monter : le dessin se remplit et le timbre s’épaissit en même temps. Les oreilles suivent les yeux ; c’est le sens même de « le timbre est un dosage ».'),
dict(id='S18', nom='Le spectrogramme', fam=2, h='#### 4. Analyser — la transformée de Fourier discrète et la FFT (1965)', prio=3, effort='XL', audio='🎙🔊',
 cmd='source : micro / fichier / générateurs ; taille de fenêtre 256–8 192 ; type de fenêtre ; échelle linéaire / log / mel ; plage dB',
 usage='Autoriser le micro, parler ou siffler, lire le spectrogramme qui défile. Changer la taille de fenêtre en gardant le même son ; survoler pour lire fréquence, temps et niveau.',
 montre='Une FFT maison (fenêtre et recouvrement au choix), un spectrogramme, le spectre instantané et la forme d’onde ; le compromis temps / fréquence rendu visible.',
 lecture='Siffler : une ligne fine. Claquer des doigts : une barre verticale. Puis agrandir la fenêtre : la ligne s’affine, la barre s’étale. C’est Gabor (Δt·Δf ≳ 1) en une manipulation.'),
dict(id='S19', nom='Échantillonnage et Nyquist', fam=2, h='#### 2. Le repliement (aliasing) — ce que le filtre anti-repliement empêche', prio=3, effort='M', audio='🔊',
 cmd='f du signal, f_s 1–96 kHz, bits 1–24, dither on/off, filtre anti-repliement on/off',
 usage='Lancer un glissando montant, couper le filtre anti-repliement et écouter ; puis baisser le nombre de bits, avec et sans dither.',
 montre='Les points d’échantillonnage sur la sinusoïde, la reconstruction en sinus cardinal, le repliement (30 kHz → 14,1 kHz à 44,1 kHz), le bruit de quantification (6,02 n + 1,76 dB).',
 lecture='Écouter le glissando « redescendre » quand il dépasse f_s/2 : ce son n’existait pas dans le signal. Puis à 4 bits, entendre la distorsion devenir un souffle quand on ajoute le dither.'),
dict(id='S20', nom='Filtres et égaliseur', fam=2, h='#### 4. Analyser — la transformée de Fourier discrète et la FFT (1965)', prio=2, effort='M', audio='🎙🔊',
 cmd='type (passe-bas / haut / bande, shelf, peak), f_c, Q, ordre ; source : bruit / musique / micro',
 usage='Choisir un passe-bas, déplacer f_c en écoutant un bruit blanc ; monter le Q d’un filtre peak jusqu’à entendre une résonance.',
 montre='La réponse en amplitude et en phase d’un biquad, le spectre avant / après.',
 lecture='À chaque fréquence, lire le gain de la réponse : 0 dB conserve l’amplitude, une valeur négative l’atténue, une valeur positive l’amplifie. Ne pas confondre cette courbe de transfert avec un seuil de masquage.'),
dict(id='S21', nom='Compression perceptive (MP3)', fam=2, h='#### 6. Jeter ce que l’oreille ignorera — MP3 (1993), AAC (1997), Opus (2012)', prio=2, effort='L', audio='🔊',
 cmd='débit cible, « montrer ce qui est jeté », seuil de masquage on/off',
 usage='Comparer original et version décodée à niveau égal, baisser le débit, puis écouter la différence après alignement temporel et de gain. Afficher le modèle de masquage et ses hypothèses.',
 montre='Le spectre, la courbe de masquage calculée (bandes critiques), les partiels grisés sous le seuil, le résidu écoutable seul.',
 lecture='Le modèle estime ce qui peut être masqué dans le signal complet. Un résidu écouté seul peut être audible et musical ; cela ne prouve ni la transparence ni son absence. Revenir à une comparaison aveugle des extraits complets.'),
dict(id='S22', nom='Accordeur (détection de hauteur)', fam=2, h='#### 3. Battements du second ordre — consonances désaccordées', prio=3, effort='M', audio='🎙',
 cmd='micro ; algorithme (autocorrélation / YIN / cepstre) ; référence 415 / 432 / 440 / 442',
 usage='Chanter ou jouer une note tenue, lire la note et l’écart en cents ; changer d’algorithme sur le même son ; changer la référence.',
 montre='f₀ estimée, l’aiguille en cents, l’historique ; le fait que la hauteur n’est pas « le pic de la FFT ».',
 lecture='Lire la fréquence mesurée et les cents relativement au diapason choisi. Passer la référence à 432 Hz conserve le signal entrant mais change son écart à la cible et peut changer la note affichée ; cela ne retend pas l’instrument.'),
dict(id='S23', nom='Convolution et réverbération (T60 au clap)', fam=2, h='### Faire taire la pierre — acoustique architecturale', prio=3, effort='L', audio='🎙🔊',
 cmd='réponse impulsionnelle : synthétique / enregistrée par un clap au micro / fichier ; source : voix, clap, musique',
 usage='Enregistrer un clap dans la pièce où l’on se trouve, lire le T60 mesuré, puis convoluer sa voix avec cette réponse ou avec une réponse synthétique de cathédrale.',
 montre='La réponse impulsionnelle, la courbe de décroissance de Schroeder, le T60 par régression, la comparaison avec le calcul de Sabine.',
 lecture='Lire la décroissance par bande ; estimer T20 ou T30 puis extrapoler T60 seulement si la dynamique utile et la linéarité le permettent. Un clap et un micro ordinaire donnent une estimation dépendante de la source, du bruit, du placement et des traitements automatiques.'),
dict(id='S24', nom='Calculateur de Sabine', fam=2, h='### Faire taire la pierre — acoustique architecturale', prio=3, effort='M', audio='🔊',
 cmd='dimensions, matériaux par paroi (α par bande), « ajouter 100 personnes »',
 usage='Entrer une salle, choisir ses matériaux, lire T60 par bande ; ajouter le public ; comparer aux présets Boston Symphony Hall / studio / cathédrale.',
 montre='A = Σ αᵢSᵢ et T60 ≈ 0,161 V/A pour Sabine ; comparaison avec Eyring T60 ≈ 0,161 V/[−S ln(1−α moyen)] dans le modèle diffus sans absorption de l’air, et réponse impulsionnelle synthétique annoncée.',
 lecture='Regarder T60 par bande avant de regarder la moyenne : une salle « sèche » dans l’aigu peut « boomer » dans le grave. Puis ajouter le public : la salle sèche, comme chez Sabine.'),
dict(id='S25', nom='Vocodeur de phase', fam=2, h='#### 5. Modéliser la voix — vocodeur (1939) et LPC (1971)', prio=1, effort='L', audio='🎙🔊',
 cmd='étirement 0,25×–4×, transposition ±12 demi-tons, « préserver les formants »',
 usage='Enregistrer une phrase, la ralentir sans changer sa hauteur, puis la transposer avec et sans préservation des formants.',
 montre='La STFT modifiée puis resynthétisée et les spectrogrammes avant/après ; des opérations de durée et de hauteur, sans prétendre reproduire l’algorithme propriétaire d’Auto-Tune.',
 lecture='En étirement, les événements durent plus longtemps sans transposition ; en transposition, les fréquences changent. Le maintien des phases et la reconstruction distinguent ce traitement d’une simple lecture accélérée.'),
dict(id='S26', nom='Karplus-Strong et modèles physiques', fam=3, h='#### Instruments = machines à conditions aux limites', prio=1, effort='M', audio='🔊',
 cmd='longueur du buffer, amortissement, position du pincement, « corde / tube / peau »',
 usage='Pincer, écouter, changer la longueur du buffer et lire la note ; augmenter l’amortissement.',
 montre='Une ligne à retard bouclée qui sonne comme une corde (1983), son spectre, le lien avec la corde simulée S04.',
 lecture='Une boucle de retard de 100 échantillons à 44,1 kHz donne un repère idéal de 441 Hz ; le retard de phase du filtre de la boucle Karplus–Strong modifie la fréquence réelle. Comparer estimation et mesure, puis observer la décroissance des aigus.'),
dict(id='S27', nom='Monocorde de Pythagore', fam=3, h='#### Grèce : Pythagore, Archytas, Aristote, Épidaure', prio=3, effort='S', audio='🔊',
 cmd='chevalet mobile, tension, « comparer à la corde entière »',
 usage='Glisser le chevalet aux repères 1/2, 2/3, 3/4, 4/5 ; jouer la portion et la corde entière ensemble.',
 montre='Le rapport de longueurs, l’intervalle nommé, les cents, les battements entre les deux notes.',
 lecture='Aux rapports simples, les deux notes fusionnent ; entre les repères, ça frotte. La légende du forgeron est fausse ; la corde, elle, dit vrai.'),
dict(id='S28', nom='Timbre additif', fam=3, h='#### Analyse du timbre', prio=3, effort='M', audio='🔊',
 cmd='16 curseurs d’harmoniques, enveloppe ADSR, inharmonicité, présets (flûte, clarinette, hautbois, voix, cloche, carré), « fondamentale manquante »',
 usage='Choisir un préset, écouter, puis modifier un harmonique à la fois. Cliquer « fondamentale manquante » pour couper le premier harmonique.',
 montre='Spectre, forme d’onde, spectrogramme ; la hauteur perçue qui reste quand f₀ disparaît ; les cloches inharmoniques.',
 lecture='Même f₀, timbres différents : la note ne bouge pas, la couleur oui. Puis couper f₀ : la note ne bouge toujours pas — l’oreille l’a reconstruite.'),
dict(id='S29', nom='Tempéraments', fam=3, h='#### Systèmes dans le monde — ne pas occidentalo-centrer', prio=3, effort='L', audio='🔊',
 cmd='système (pythagoricien, juste, mésotonique, Werckmeister III, 12-TET, 19/31/53-TET), tonalité, clavier, « quinte du loup », « cycle des quintes »',
 usage='Jouer le même accord dans chaque système ; ouvrir le cycle des quintes en pythagoricien et empiler douze quintes ; chercher la quinte du loup en mésotonique.',
 montre='La table des fréquences et des écarts en cents, le cercle qui ne se ferme pas (comma), la quinte du loup surlignée, les battements de chaque accord.',
 lecture='Regarder d’abord le cercle : le douzième maillon ne retombe pas sur le premier. Puis écouter la tierce juste (calme) et la tierce tempérée (qui bat) : le piano est un compromis, pas une loi.'),
dict(id='S30', nom='Accords et rugosité', fam=3, h='#### Étage 1 — la rugosité (Helmholtz → Plomp & Levelt → Sethares)', prio=3, effort='L', audio='🔊',
 cmd='construire un accord (≤ 6 notes), renversement, système d’accord, timbre, « courbe de dissonance »',
 usage='Jouer une triade majeure puis mineure, lire le score de rugosité ; changer le timbre pour une cloche ; ouvrir la courbe de dissonance et déplacer la seconde note.',
 montre='Le modèle de Sethares (somme des rugosités entre partiels), la courbe de dissonance avec ses creux sur 3/2, 4/3, 5/4 pour un timbre harmonique, la racine perçue (Terhardt).',
 lecture='Les minima du modèle correspondent à une faible rugosité pour le spectre choisi ; ils ne résument pas toute la consonance. Comparer majeur et mineur selon le timbre et la disposition, puis distinguer rugosité, fondamentale virtuelle et contexte culturel.'),
dict(id='S31', nom='Le clavier des systèmes du monde', fam=3, h='#### Systèmes dans le monde — ne pas occidentalo-centrer', prio=1, effort='M', audio='🔊',
 cmd='exemples documentés de maqâm, raga, pélog, slendro, lü ou blues, avec source et accordage affichés',
 usage='Choisir une échelle, jouer la gamme sur le clavier ré-étiqueté, comparer chaque degré au 12-TET.',
 montre='Les cents par degré et l’écart au demi-ton tempéré.',
 lecture='Repérer les degrés entre les touches du piano. Les 22 shruti sont un cadre théorique, pas une gamme uniforme applicable à tous les ragas ; les accordages de gamelan varient selon l’ensemble. Chaque préset doit nommer l’exemple retenu.'),
dict(id='S32', nom='Inharmonicité et accord du piano', fam=3, h='#### Instruments = machines à conditions aux limites', prio=1, effort='M', audio='🔊',
 cmd='raideur de la corde (B), registre, « octaves étirées »',
 usage='Augmenter la raideur, écouter l’octave « juste » battre, puis activer l’étirement des octaves.',
 montre='Les partiels f_n = n f₁ √[(1 + Bn²)/(1 + B)] lorsque f₁ désigne la fondamentale réelle, la courbe de Railsback et les battements de partiels. Afficher la convention de B et le modèle de corde raide.',
 lecture='Suivre le deuxième partiel qui monte au-dessus de 2f₁ quand B augmente : l’octave « mathématique » bat, l’octave étirée ne bat plus. Fourier n’est pas violé, la corde est raide.'),
dict(id='S33', nom='Synthèse FM (Chowning)', fam=3, h='#### XXe siècle musical où l’acoustique redevient explicite', prio=1, effort='M', audio='🔊',
 cmd='porteuse, modulante, indice, ratio, enveloppes',
 usage='Partir d’un ratio 1:1 et monter l’indice ; passer à 1:1,41 pour une cloche ; ajouter une enveloppe sur l’indice pour un cuivre.',
 montre='Le spectre en fonctions de Bessel, les timbres cloche / cuivre / piano électrique.',
 lecture='Regarder le spectre se remplir quand l’indice monte, puis se disperser quand le ratio devient irrationnel : le spectre se compose comme un accord.'),
dict(id='S34', nom='Le studio (mini-DAW)', fam=3, h='#### 7. Depuis 1990 — streaming, normalisation et synthèse', prio=2, effort='XL', audio='🎙🔊',
 cmd='4–8 pistes (générateurs, Karplus, micro, fichier) ; timeline, boucle, tempo ; par piste gain, pan, EQ, délai, réverbération, compresseur ; master : limiteur, LUFS, spectre ; export WAV',
 usage='Lancer la lecture (barre d’espace), choisir un motif prêt ou poser des pas : un clic pose, un deuxième accentue, un troisième retire ; la grille des hauteurs choisit les notes. Dans la table de mixage, régler volumes, panoramique, compression et départs vers la réverbération et le délai ; essayer le délai Haas de 10 ms. Le motif « One drop » rejoue le rythme du reggae, et son délai l’écho du dub ([fiche Bob Marley](portraits.html#marley)). Enregistrer sa voix, puis exporter deux boucles en WAV. Tout reste dans le navigateur.',
 montre='Tout le dossier assemblé dans l’outil qui a remplacé le studio de Schaeffer : séquenceur, console, effets, et le LUFS-mètre qui rend visible la loudness war.',
 lecture='Regarder le master : le crête-mètre et le LUFS-mètre ne disent pas la même chose. Charger « Mur de son » : la crête reste collée sous 0 dBFS, la sonie monte, l’écart entre les deux fond. Activer la normalisation à −14 LUFS : le master écrasé est baissé d’autant ; il ne gagne plus rien, il reste seulement plus plat.'),
dict(id='S35', nom='Loudness war', fam=3, h='#### 7. Depuis 1990 — streaming, normalisation et synthèse', prio=1, effort='M', audio='🔊',
 cmd='même extrait, compression 0 → extrême, normalisation LUFS on/off (−14, −23)',
 usage='Écraser progressivement l’extrait, puis activer la normalisation à −14 LUFS et réécouter les deux versions.',
 montre='La forme d’onde « saucisse », la plage dynamique, le LUFS intégré, l’égalisation de niveau perçu après normalisation.',
 lecture='Comparer les extraits avant puis après normalisation de la sonie : l’avantage de niveau se réduit, mais la dynamique et le timbre restent modifiés. Une cible de −14 LUFS est un réglage de démonstration, pas la norme de tous les services ni la fin historique de la loudness war.'),
dict(id='S36', nom='Courbes isosoniques', fam=4, h='#### Sonie et masquage', prio=3, effort='M', audio='🔊',
 cmd='fréquence de test (31,5 Hz → 16 kHz), niveau de référence à 1 kHz ; ajustement « aussi fort que la référence »',
 usage='À faible niveau et sans chercher à compenser un grave inaudible par une forte augmentation de volume, comparer quelques fréquences à une référence à 1 kHz. Garder un plafond de gain et une commande d’arrêt.',
 montre='Des égalisations subjectives en gain numérique relatif ; courbes ISO 226 montrées comme référence indépendante. Sans étalonnage du casque, on ne mesure ni des phones ni une courbe isosonique personnelle absolue.',
 lecture='Une différence de sensation combine l’audition et la réponse du casque. Lire le repère ISO pour comprendre le principe, pas pour diagnostiquer ni déduire une pression sonore réelle de la position d’un curseur.'),
dict(id='S37', nom='Masquage', fam=4, h='#### Sonie et masquage', prio=2, effort='M', audio='🔊',
 cmd='sinus faible (f, niveau), masqueur (bruit étroit ou sinus fort), pré / post-masquage temporel',
 usage='Écouter le sinus faible, allumer le masqueur centré dessus et dire quand le sinus disparaît ; répéter avec un masqueur décalé en fréquence.',
 montre='Le seuil masqué calculé (bande critique) et le seuil personnel obtenu par oui / non.',
 lecture='Le masquage dépend de l’écart fréquentiel, du niveau et du temps. Il est particulièrement fort autour de la bande du masqueur ; il ne s’arrête pas à une frontière parfaitement nette.'),
dict(id='S38', nom='Shepard, Risset, triton', fam=4, h='#### Hauteur', prio=2, effort='M', audio='🔊',
 cmd='vitesse, sens, « Risset (continu) », « paradoxe du triton »',
 usage='Lancer la gamme de Shepard et la laisser tourner trois cycles avant d’expliquer ; passer en glissando de Risset ; jouer les paires du triton et voter « monte / descend ».',
 montre='Les dix octaves sous enveloppe (visibles au spectrogramme), le vote du public sur le triton.',
 lecture='Regarder le spectrogramme pendant qu’on écoute : les composantes montent, s’éteignent en haut et renaissent en bas. L’oreille suit la montée, jamais la chute. La hauteur est une construction.'),
dict(id='S39', nom='Où est le son ? (ITD / ILD / HRTF)', fam=4, h='#### Où est le son ? — localisation spatiale (ITD, ILD, HRTF)', prio=2, effort='L', audio='🔊 casque obligatoire',
 cmd='position de la source autour de la tête, rayon de tête, « ITD seul / ILD seul / HRTF », fréquence',
 usage='Au casque, faire tourner la source ; activer ITD seul avec un grave, puis ILD seul avec un aigu ; passer en HRTF pour le haut / bas.',
 montre='Δt ≈ (r/c)(θ + sin θ), l’ombre de la tête en dB, le cône de confusion, un filtrage par HRTF publique (KEMAR).',
 lecture='Comparer les indices séparés : l’ITD de structure fine est surtout utile dans le grave, l’ILD augmente dans l’aigu. Les signaux complexes portent aussi des indices d’enveloppe ; ne pas conclure qu’aucune localisation des aigus n’est possible par le temps.'),
dict(id='S40', nom='Précédence (Haas)', fam=4, h='#### Où est le son ? — localisation spatiale (ITD, ILD, HRTF)', prio=1, effort='S', audio='🔊 casque',
 cmd='délai gauche / droite 0–50 ms, différence de niveau',
 usage='Envoyer deux clics, droite retardée d’abord de 1 à 3 ms ; explorer ensuite les délais avec de la parole ou du bruit. Inverser le côté retardé et ajuster les niveaux modérément.',
 montre='Fusion et dominance de la source arrivée la première, puis éventuelle séparation en deux événements. Les résultats et seuils dépendent du signal, du délai, des niveaux et de l’auditeur.',
 lecture='Identifier le canal arrivé en premier avant de juger la localisation. Ne pas donner 30 ms comme seuil universel : un clic peut se dédoubler bien avant un extrait de parole.'),
dict(id='S41', nom='Source-filtre : la voix', fam=4, h='#### Voix — deux étages, pas un tuyau magique', prio=3, effort='L', audio='🔊',
 cmd='f₀ (glotte), forme du conduit ([a] ↔ [i] ↔ [u] ou quatre sections), « chuchoter », « formant du chanteur »',
 usage='Choisir une voyelle, faire varier f₀ sans toucher au conduit ; puis garder f₀ et changer de voyelle ; activer le formant du chanteur sur un accompagnement d’orchestre. Passer la voix de « Naturelle » à « Brute (machine) » : une source parfaitement périodique sonne comme une machine.',
 montre='Une source glottique, des résonances de tube (F1, F2, F3), la carte F1/F2 des voyelles, la voyelle rayonnée.',
 lecture='Sur la carte F1/F2, le point ne bouge pas quand f₀ change et bouge quand la voyelle change : deux étages indépendants. Le formant du chanteur est une bosse vers 3 kHz qui passe au-dessus de l’orchestre.'),
dict(id='S42', nom='Vos propres voyelles', fam=4, h='#### Voix — deux étages, pas un tuyau magique', prio=3, effort='L', audio='🎙',
 cmd='micro ; « tenir un [a] », « [i] », « [u] » ; référence homme / femme / enfant',
 usage='Tenir un [a] dans le micro, regarder le point apparaître sur la carte des voyelles, puis passer à [i] et [u]. Sans micro, écouter la voix synthétique, naturelle ou brute, et comparer le point estimé au viseur doré.',
 montre='Les formants F1, F2 estimés par LPC en temps réel, f₀, le spectrogramme avec les formants surlignés ; jitter et shimmer affichés sans interprétation clinique.',
 lecture='À voyelle et articulation approximativement fixes, f₀ peut varier sans déplacement comparable des formants. Dans la voix réelle, posture et registre peuvent aussi modifier les résonances ; la LPC devient moins fiable pour certaines voix aiguës. Aucune interprétation clinique.'),
dict(id='S43', nom='L’oreille de bout en bout, puis la cochlée', fam=4, h='### Entendre — de Helmholtz à la neuroacoustique', prio=2, effort='L', audio='🔊',
 cmd='coupe de l’oreille (survol de chaque organe : pavillon, conduit, tympan, osselets, fenêtre ovale, cochlée, nerf), « dérouler la cochlée », fréquence ou son complexe, « ampli actif on/off », niveau',
 usage='Survoler chaque organe de la coupe pour lire son rôle et son gain, puis cliquer « dérouler la cochlée » ; envoyer un sinus, regarder où l’onde culmine sur la membrane basilaire ; monter la fréquence ; couper l’amplificateur actif.',
 montre='La chaîne complète pavillon → tympan → osselets → cochlée → nerf (impédance air → liquide, ×20 environ), puis l’onde progressive de Békésy, la tonotopie base → apex, la sélectivité avec et sans cellules ciliées externes (Kemp 1978).',
 lecture='Lire la coupe de gauche à droite comme un trajet ; puis, sur la cochlée déroulée, voir le maximum se déplacer vers la base quand f monte : la cochlée est un analyseur de Fourier mécanique. Sans l’ampli actif, le pic s’aplatit : l’oreille n’est pas un micro passif.'),
dict(id='S44', nom='Jusqu’où entendez-vous ?', fam=4, h='### Entendre — de Helmholtz à la neuroacoustique', prio=2, effort='S', audio='🔊 (niveau plafonné)',
 cmd='balayage limité à la bande réellement disponible, niveau numérique plafonné, arrêt immédiat, repère théorique de Nyquist affiché',
 usage='Lancer le balayage montant à volume modéré et cliquer dès que le son disparaît ; recommencer vers le grave.',
 montre='La fréquence où le son n’est plus perçu sur cette chaîne de restitution, sans la présenter comme une limite auditive personnelle isolée. L’échantillonnage, le codec, le casque et l’audition peuvent tous limiter la restitution.',
 lecture='Ne pas augmenter le volume pour retrouver un son disparu. Le test n’est ni un audiogramme ni un estimateur d’âge ; afficher seulement la fréquence du signal de test et les limites de l’expérience.'),
dict(id='S45', nom='Sécurité : la dose de bruit', fam=4, h='### Entendre — de Helmholtz à la neuroacoustique', prio=2, effort='S', audio='👁',
 cmd='niveau dB(A), durée, « concert / casque / chantier »',
 usage='Entrer une journée type (trajet, casque, concert), lire la dose cumulée et son équivalent sur 8 heures.',
 montre='La règle des 3 dB, la dose en pourcentage, les seuils réglementaires (80 / 85 / 87 dB(A)).',
 lecture='Dans le modèle à énergie égale choisi, 100 dB(A) pendant 15 minutes correspondent à la même dose que 85 dB(A) pendant huit heures. Cela ne garantit pas l’absence de risque ; niveaux d’action et limite réglementaire sont des notions distinctes.'),
dict(id='S46', nom='La chauve-souris', fam=5, h='#### Chauves-souris — environ 1 500 espèces, ~20 % des mammifères', prio=3, effort='L', audio='🔊 time-expansion ×10, annoncé',
 cmd='type (FM Myotis / CF rhinolophe), distance de la proie, vitesse relative, humidité, « compensation Doppler on/off »',
 usage='Choisir Myotis, approcher la proie et écouter les cris s’accélérer jusqu’au buzz ; passer en rhinolophe, lancer le vol et couper la compensation Doppler.',
 montre='Cri, écho, Δt, portée limitée par l’absorption de l’air, les trois phases search / approach / buzz, le spectrogramme du cri ; en CF, l’écho qui sort de la fovéa à 83 kHz sans compensation.',
 lecture='Suivre l’intervalle entre les cris, distinct de leur fréquence porteuse. Observer la compensation Doppler du rhinolophe. La lecture audio est ralentie dix fois : temps ×10 et fréquences ÷10 ; l’écran l’annonce.'),
dict(id='S47', nom='Le cachalot', fam=5, h='#### Odontocètes — le même algorithme dans l’eau', prio=2, effort='M', audio='🔊 transposé ou enregistrement NOAA',
 cmd='profondeur, distance, « on-axis / off-axis », mode (usual click / creak / coda / slow click)',
 usage='Choisir un mode, éloigner l’hydrophone, lire le niveau reçu ; sortir de l’axe du faisceau.',
 montre='Un niveau de source référé à 1 m et un niveau reçu à la distance choisie, calculés avec divergence et absorption. Afficher séparément distance, axe, bande et métrique RMS ou crête-à-crête ; ne pas écrire « à 1 m » pour le niveau reçu ailleurs.',
 lecture='Lire le niveau en même temps que l’unité : 236 dB re 1 µPa n’est pas « plus fort qu’un avion ». Hors axe, le clic devient multiple et faible : c’est ce que l’on enregistre le plus souvent.'),
dict(id='S48', nom='Le canal SOFAR', fam=5, h='#### Guerre, souveraineté, mer', prio=2, effort='M', audio='👁',
 cmd='profil c(z) (température, salinité, pression), profondeur de la source, angles de départ',
 usage='Placer la source à 1 000 m, lancer des rayons à plusieurs angles ; remonter la source en surface et recommencer.',
 montre='Le tracé de rayons dans le profil de célérité, l’axe du canal, les rayons piégés sur des milliers de kilomètres, les zones d’ombre.',
 lecture='Regarder les rayons se recourber vers la zone lente : c’est la même réfraction que le son qui « porte » le soir. Une baleine sur l’axe s’entend à l’échelle d’un océan.'),
dict(id='S49', nom='Infrasons : l’échelle', fam=5, h='#### Échelle', prio=2, effort='M', audio='👁 (option 🔊 30–60 Hz)',
 cmd='fréquence 0,01–20 Hz, « obstacle » (humain, maison, immeuble, colline)',
 usage='Baisser la fréquence et regarder la longueur d’onde grandir à côté de l’obstacle choisi ; ouvrir la courbe de seuil d’audition sous 20 Hz.',
 montre='λ comparée à l’obstacle, diffraction marquée quand l’obstacle est petit devant λ, sans prétendre que tout matériau devient transparent ; seuils infrasonores de référence et distinction Schumann/pression.',
 lecture='À 1 Hz, l’onde fait 343 m : une maison est un point pour elle. Le trait n’est pas un infrason « vu », c’est sa géométrie ; l’enceinte ne rejouera pas ceci, et l’écran le dit.'),
dict(id='S50', nom='Hunga Tonga fait le tour du monde', fam=5, h='#### Sources naturelles — catalogue à tenir propre', prio=1, effort='M', audio='👁',
 cmd='station IMS (menu), heure',
 usage='Lancer l’horloge du 15 janvier 2022 et regarder l’onde de pression traverser la carte ; choisir une station et lire son barogramme.',
 montre='Les fronts circulaires à ~310 m/s, les passages successifs, le signal d’une station (données publiques ou reconstruction annoncée comme telle).',
 lecture='Compter les passages : l’onde repasse plusieurs fois, comme celle du Krakatoa en 1883. L’infrason est une oreille diplomatique avant d’être un mystère.'),
dict(id='S51', nom='Échographe', fam=5, h='#### Impédance et écho — pourquoi le gel', prio=3, effort='L', audio='👁',
 cmd='fréquence 2–15 MHz, gel on/off, fantôme (foie + os + kyste + poumon), gain, mode A / B / M',
 usage='Poser la sonde sur le fantôme sans gel : écran noir ; mettre le gel ; monter la fréquence ; passer en mode A pour lire une seule ligne.',
 montre='Une image B reconstruite depuis une carte d’impédance : ombre acoustique derrière l’os, renforcement derrière le kyste, atténuation 0,5 dB/cm/MHz, R ≈ 1 à l’air.',
 lecture='Lire l’image comme des échos traités : un pixel sombre peut correspondre à peu de diffusion, à de l’atténuation ou à une ombre. Le gain et les interfaces interviennent ; ce n’est pas une carte directe de l’impédance. Comparer le compromis résolution/portée à fréquence croissante.'),
dict(id='S52', nom='Doppler médical', fam=5, h='#### 5. Double trajet — le sang, la pluie, la mite', prio=2, effort='M', audio='🔊 (la Δf est audible)',
 cmd='vitesse du sang, angle θ, f₀ 2–8 MHz, « continu / pulsé »',
 usage='Régler l’angle à 45°, écouter le « souffle » ; tourner vers 90° ; changer f₀.',
 montre='Δf = 2 v f₀ cos θ / c jouée telle quelle, le spectre Doppler défilant, l’erreur d’angle.',
 lecture='Le son que l’on entend est la Δf elle-même, pas une transposition : quelques MHz émis, quelques kHz de décalage. À 90°, le silence : cos θ = 0, d’où les erreurs cliniques.'),
dict(id='S53', nom='La chaîne d’atomes (phonons)', fam=6, h='### Le son devient particule — phonons et acoustique quantique', prio=2, effort='M', audio='👁 (+🔊 branche acoustique transposée)',
 cmd='nombre d’atomes, masses (une ou deux espèces), raideur, vecteur d’onde k',
 usage='Lancer la chaîne monoatomique, faire varier k et lire ω ; passer à deux masses pour faire apparaître la branche optique.',
 montre='La relation de dispersion ω(k) calculée, la branche acoustique dont la pente à l’origine est la vitesse du son, la branche optique, la zone de Brillouin.',
 lecture='Près de k = 0, la pente de la branche acoustique donne une célérité. Une chaîne classique possède déjà une dispersion à k élevé ; les phonons apparaissent lorsque les modes sont quantifiés, à toute valeur de k. Ne pas placer une frontière classique/quantique à un point arbitraire de la courbe.'),
dict(id='S54', nom='Les trois familles', fam=6, h='#### Tableau de cohérence — où ranger chaque « son de l’espace »', prio=3, effort='L', audio='🔊 natif (Voyager, LIGO) / transposé (Persée), facteur affiché',
 cmd='objet (modes p, sunquake, CMB, Persée, type III, héliopause Voyager, LIGO), « transposer de N octaves »',
 usage='Choisir un objet, lire sa famille et sa fréquence native, régler la transposition et écouter. Pour Voyager, faire varier n_e et écouter f_pe.',
 montre='La nature physique (pression, plasma, gravitation) et l’opération de mise en audio, sur deux lignes distinctes ; fréquences natives, facteurs 2⁵⁷/2⁵⁸ pour Persée, f_pe selon la densité et chirp LIGO explicitement simulé.',
 lecture='Avant lecture, annoncer ce qui oscille, le capteur ou le modèle et la transformation audio. Certains signaux Voyager et LIGO sont dans la bande audible sans transposition ; la sonification de Persée est une reconstruction accélérée de données spatiales, pas une prise de son au microphone.'),
dict(id='S55', nom='Le Soleil comme salle de Mersenne', fam=6, h='#### Famille A1 — héliosismologie : le Soleil comme salle de Mersenne', prio=1, effort='L', audio='🔊 transposé de 15–16 octaves, facteur dit',
 cmd='profil c_s(r), degré ℓ, ordre n',
 usage='Lancer un rayon depuis la surface, regarder sa remontée ; changer ℓ ; lire Δν sur le spectre.',
 montre='Les rayons acoustiques réfractés dans le Soleil (c croît avec la profondeur), le spectre ℓ–ν, la grande séparation Δν ≈ 135 µHz calculée par (2∫dr/c_s)⁻¹.',
 lecture='Comparer la réfraction à celle du canal SOFAR, puis lire Δν en hertz : c’est approximativement l’inverse du temps d’un aller-retour acoustique, pas ce temps lui-même.'),
dict(id='S56', nom='La règle des fréquences', fam=1, h='#### Spectre utile pour le live', prio=2, effort='S', audio='🔊 (dans l’audible seulement)',
 cmd='axe logarithmique 0,01 Hz → 1 GHz, curseur de fréquence, calques : infrasons / audible / ultrasons, animaux, instruments, machines et médecine',
 usage='Glisser le curseur le long de l’axe et lire ce qui vit à cette fréquence ; activer les calques ; écouter la fréquence quand elle est dans l’audible (le bouton se grise ailleurs).',
 montre='Un seul axe pour tout le dossier : microbaroms à 0,2 Hz, éléphants, orgue de 32 pieds, voix, oreille (20 Hz–20 kHz, maximum 2–5 kHz), chauve-souris, échographe, fréquence plasma de Voyager — avec λ dans l’air affichée pour chaque position.',
 lecture='Repérer d’abord la fenêtre humaine, étroite au milieu de l’axe ; puis voir combien d’êtres et de machines vivent à sa gauche et à sa droite. Les frontières 20 Hz / 20 kHz sont des repères statistiques, pas des murs.'),
]

MISE_EN_PAGE = """
## 10. Mise en page des ateliers — pleine largeur, mobile et PC, plein écran

Exigences fixées le 23 septembre 2026 (elles priment sur les conventions héritées de Lumière).

- **Pleine largeur de la page.** Le bloc `.atelier` sort de la colonne de lecture `--max` et occupe 100 % de la largeur utile de la fenêtre (gouttières de 16 px sur mobile), recentré par `margin-inline: calc((100% - <largeur>) / 2)` comme les `.viz-section` de la charte — jamais par `transform`, jamais avec un défilement horizontal. À 360 px comme à 3 840 px, le composant remplit la largeur ; au-delà de 1 800 px, le canvas garde un ratio lisible (plafond de hauteur à ~70 vh) et les commandes se placent à côté plutôt que dessous.
- **Deux dispositions, une seule logique.** Sous 760 px : commandes empilées sous le canvas, une par ligne, curseurs sur toute la largeur, boutons d’au moins 44 × 44 px, texte à 16 px minimum, aucune fonction accessible seulement au survol. Au-dessus : canvas à gauche (60–70 %), panneau de commandes à droite, lecture « Ce qu’on voit / Ce qu’on en conclut » sous les deux. Les gestes tactiles remplacent la souris partout (glisser pour pincer la corde S04, poser le chevalet S27, dessiner les murs S09, tracer la période S17) ; `touch-action: none` sur les canvas interactifs, pas ailleurs.
- **Lisibilité.** Étiquettes SVG mesurées (`getComputedTextLength()`) à 360 px ; axes et légendes en Cinzel/Fraunces aux tailles du codex, jamais sous 12 px effectifs ; contraste des courbes vérifié sur le fond nuit ; valeurs numériques recalculées, pas codées en dur ; état de départ déjà parlant (jamais d’écran vide).
- **Plein écran pour les gros ateliers** (liste `FULL` dans `ateliers.py`, marqués « plein écran » dans les fiches et dans le script) : bouton ⛶ dans l’angle du bloc → `element.requestFullscreen()` sur le conteneur de l’atelier ; en plein écran, le canvas prend toute la surface, les commandes passent en tiroir latéral (PC) ou en barre inférieure repliable (mobile), Échap ou le même bouton ferment. Repli sans Fullscreen API (iOS Safari sur iPhone) : superposition CSS `position: fixed; inset: 0` du même composant, avec le même bouton de fermeture — **pas de page compagnon** : tous les ateliers vivent dans `index.html` (décision du 23 septembre 2026). Sur mobile, suggérer l’orientation paysage pour S09, S18, S34 (message discret, pas de verrouillage).
- **Activation et extinction.** Un atelier ne consomme rien tant que le lecteur ne l’a pas activé : au chargement, chaque bloc affiche une image statique (la même que le `noscript`) et un bouton « Activer l’atelier » ; le composant n’est monté, et le calcul (worker, AudioContext, boucle d’animation) lancé, qu’à ce clic. Un bouton « Éteindre » démonte le composant, arrête le worker et l’audio et remet l’image. Un atelier sorti de la fenêtre depuis plus d’une minute se met en pause de lui-même (`IntersectionObserver`), et un seul atelier audio joue à la fois. Aucun lien de retour vers un compagnon : le repli plein écran est la superposition CSS ci-dessus.
- **Audio et micro en plein écran** : le bouton « couper tout » reste visible ; la demande de permission micro se fait au clic, jamais à l’entrée en plein écran.
- **Contrôle** : chaque atelier vérifié à 360 / 768 / 1 280 / 1 920 / 2 560 / 3 840 px, en portrait et paysage sur mobile, avec `scrollX === 0` après `scrollTo(9999,0)`, et une capture par état (repos, en action, plein écran) dans `a_traiter/provoxys-son/captures/`.
"""

STARS={3:'★★★',2:'★★',1:'★'}
# Ateliers qui offrent un bouton plein écran (Fullscreen API ; repli : superposition CSS plein cadre, pas de page compagnon)
REMPLACE={'S01': 'V01', 'S04': 'V03', 'S09': 'V04, V05', 'S14': 'V06', 'S16': 'V09', 'S51': 'V10', 'S13': 'V11', 'S43': 'V12', 'S41': 'V13', 'S23': 'V14', 'S49': 'V15', 'S46': 'V16', 'S54': 'V17, V18, V19', 'S56': 'V02'}
FULL={'S04','S06','S09','S13','S17','S18','S20','S21','S23','S24','S25','S29','S30','S34','S39','S41','S42','S46','S48','S51','S54','S55'}
BASE=str(Path(__file__).resolve().parent) + '/' 

def bloc_md(a):
    return ('<!-- atelier:%s -->\n> **Atelier %s — %s** · *%s · effort %s · %s%s*\n>\n'
            '> **Comment l’utiliser.** %s\n>\n> **Ce que ça montre.** %s\n>\n> **Sens de lecture.** %s\n<!-- /atelier -->\n'
            % (a['id'],a['id'],a['nom'],STARS[a['prio']],a['effort'],a['audio']+(' · plein écran' if a['id'] in FULL else ''),(' · remplace le schéma '+REMPLACE[a['id']]) if a['id'] in REMPLACE else '',a['usage'],a['montre'],a['lecture']))

def injecter():
    p=Path(BASE)/'script-live-son.md'
    s=p.read_text(encoding='utf-8')
    s=re.sub(r'\n?<!-- atelier:S\d\d -->.*?<!-- /atelier -->\n','\n',s,flags=re.S)
    from collections import defaultdict
    par=defaultdict(list)
    for a in A: par[a['h']].append(a)
    lines=s.splitlines()
    headings=[]
    for i,line in enumerate(lines):
        m=re.match(r'^(#{2,5}) ',line)
        if m: headings.append((i,len(m.group(1)),line.strip()))
    inserts=defaultdict(list)
    found=set()
    for pos,(i,level,title) in enumerate(headings):
        if title not in par: continue
        j=next((ix for ix,lv,_ in headings[pos+1:] if lv<=level),len(lines))
        # Une ancre de la section suivante doit rester attachée à son titre.
        while j>i+1 and (not lines[j-1].strip() or re.fullmatch(r'<a id="[^"]+"></a>',lines[j-1].strip())):
            j-=1
        for a in par[title]:
            inserts[j].append(bloc_md(a)); found.add(a['id'])
    missing=[a['id'] for a in A if a['id'] not in found]
    if missing: raise ValueError('Titres de rattachement absents : '+', '.join(missing))
    out=[]
    for i in range(len(lines)+1):
        if i in inserts: out.extend(['']+inserts[i]+[''])
        if i<len(lines):out.append(lines[i])
    result=re.sub(r'\n{3,}','\n\n','\n'.join(out)).rstrip()+'\n'
    p.write_text(result,encoding='utf-8')
    print('blocs injectés :',len(found),'| manquants :',missing)

def catalogue():
    p=BASE+'01-experiences-interactives.md'; old=open(p,encoding='utf-8').read()
    tail=old[old.index('## 8. Moteur audio partagé'):]
    # Cette section est générée ci-dessous : ne pas la réimporter à chaque passage.
    tail=tail.split('## 10. Mise en page des ateliers', 1)[0].rstrip()+'\n'
    o=io.StringIO()
    o.write('# Ateliers interactifs du dossier « Le Son » — 55 fiches\n\n')
    o.write('Source structurée : `ateliers.py`, synchronisée avec le maître éditorial `script-live-son.md` ; ce catalogue et les blocs Atelier sont générés depuis cette source. Les fiches décrivent des composants à réaliser, pas des ateliers déjà opérationnels. '
            'Le dossier intègre les ateliers **dans les chapitres** : chaque fiche donne le **mode d’emploi** (ce que fait le lecteur), '
            '**ce que ça montre** (ce qui est calculé et affiché) et le **sens de lecture** (où regarder d’abord, ce qui doit changer, ce qu’on en conclut). '
            'Même pipeline que Lumière / Entropie (composants React bundlés par esbuild, `mount.tsx` + `IntersectionObserver`, `noscript` de repli, `prefers-reduced-motion`), '
            'plus le moteur audio partagé du §8.\n\n')
    o.write('Légende : ★★★ indispensable pour la thèse du dossier · ★★ confort · ★ bonus. Effort S/M/L/XL. Audio : 🔊 le navigateur fait entendre ; 🎙 le micro est utilisé ; 👁 visualisation seule.\n\n')
    o.write('## Vue d’ensemble\n\n| # | Atelier | Chapitre d’accueil (script) | Prio | Effort | Audio | Plein écran |\n|---|---|---|---|---|---|---|\n')
    for a in A:
        o.write('| %s | %s | %s | %s | %s | %s | %s |\n'%(a['id'],a['nom'],a['h'].lstrip('# '),STARS[a['prio']],a['effort'],a['audio'],'oui' if a['id'] in FULL else '—'))
    o.write('\n')
    for f in sorted(FAM):
        o.write('## %d. %s\n\n'%(f,FAM[f]))
        for a in [x for x in A if x['fam']==f]:
            o.write('### %s — %s\n\n'%(a['id'],a['nom']))
            o.write('*%s · effort %s · %s%s%s · chapitre : %s*\n\n'%(STARS[a['prio']],a['effort'],a['audio'],' · plein écran' if a['id'] in FULL else '',(' · remplace le schéma '+REMPLACE[a['id']]) if a['id'] in REMPLACE else '',a['h'].lstrip('# ')))
            o.write('- **Commandes** : %s\n'%a['cmd'])
            o.write('- **Comment l’utiliser** : %s\n'%a['usage'])
            o.write('- **Ce que ça montre** : %s\n'%a['montre'])
            o.write('- **Sens de lecture** : %s\n\n'%a['lecture'])
    n3=sum(1 for a in A if a['prio']==3); n2=sum(1 for a in A if a['prio']==2); n1=sum(1 for a in A if a['prio']==1)
    from collections import Counter
    ce=Counter(a['effort'] for a in A)
    o.write('## 7. Ce que ça donne\n\n')
    o.write('- **%d ateliers** : %d ★★★, %d ★★, %d ★. **Périmètre retenu pour la première version (23 septembre 2026) : les 25 ★★★ plus la DAW S34 et les ateliers qui remplacent un schéma (S43, S49, S56)**, soit 29 ateliers ; les autres viennent ensuite. Socle minimal de repli (16) : S01, S03, S04, S06, S09, S13, S14, S17, S18, S19, S22, S23, S28, S29, S30, S41.\n'%(len(A),n3,n2,n1))
    o.write('- **Trois ateliers-tronc** réutilisés par les autres : le moteur audio (§8), la FFT / spectrogramme (S18 → S04, S17, S22, S23, S28, S42, S46), le bac à ondes 2D (S09 → S10, S24).\n')
    o.write('- Ordre de construction : moteur audio → S17/S18/S19 → S04/S06/S09 (workers) → musique S27–S30 → micro S22, S23, S42 → le reste par priorité → S34 en dernier.\n')
    o.write('- Effort estimé : %d S + %d M + %d L + %d XL. Si l’on coupe : d’abord les ★, puis fusionner S07+S08 dans S05, S40 dans S39, S35 dans S34, S32 dans S28.\n'%(ce['S'],ce['M'],ce['L'],ce['XL']))
    o.write('- **Dans la page** : chaque atelier est un bloc `.atelier` inséré à la fin de sa sous-section, avec les trois paragraphes ci-dessus sous le composant (gabarit : titre Cinzel, consigne d’une phrase, commandes, puis « Comment l’utiliser / Ce que ça montre / Sens de lecture »), un bouton « Activer / Éteindre », un bouton plein écran pour les gros ateliers, et un `noscript` avec image statique. Tous les ateliers sont dans `index.html` ; le seul compagnon est `portraits.html`.\n\n')
    o.write(tail)
    o.write(MISE_EN_PAGE)
    open(p,'w',encoding='utf-8').write(o.getvalue()); print('catalogue écrit :',len(o.getvalue()),'octets')

if __name__=='__main__':
    cmd=sys.argv[1] if len(sys.argv)>1 else 'tout'
    if cmd in ('catalogue','tout'): catalogue()
    if cmd in ('injecter','tout'): injecter()
