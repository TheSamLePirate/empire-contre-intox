# Symboles des formules — lumiere

Format et règles : .claude/skills/nouveau-dossier/reference/formules-symboles.md
Blocs repris de a_traiter/lumiere/build/formules_symboles.py (fiches vérifiées le 25 septembre 2026, audit section F).

## Bloc : La vitesse de la lumière dans le vide
dit: Dans le vide, la lumière parcourt exactement 299 792 458 mètres chaque seconde : près de 300 000 km/s, environ sept fois et demie le tour de la Terre en une seconde. Cette vitesse est la même pour tous les observateurs, quel que soit le mouvement de la source ; c’est aussi la vitesse limite de toute information.
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement
symbole: \text{m/s} | mètre par seconde : distance parcourue en une seconde | unité SI de vitesse (m·s⁻¹) | c ≈ 1,08 milliard de km/h

## Bloc : Fréquence et longueur d'onde
dit: À chaque oscillation, l’onde avance d’une longueur d’onde. En une seconde elle oscille $\nu$ fois, donc parcourt $\nu$ longueurs d’onde : c’est sa vitesse. Dans le vide cette vitesse est fixée, égale à $c$ ; longueur d’onde et fréquence ne sont donc pas indépendantes. Connaître l’une, c’est connaître l’autre.
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement
symbole: \lambda | longueur d’onde : distance entre deux crêtes successives de l’onde | mètre (m), souvent en nanomètres (nm) | 380 à 780 nm pour le visible
symbole: \nu | fréquence : nombre d’oscillations par seconde | hertz (Hz = s⁻¹) | ≈ 600 THz à 500 nm (bleu-vert)

## Bloc : La vitesse dans un milieu
dit: L’indice de réfraction dit combien de fois la lumière va moins vite dans un milieu que dans le vide : un indice de 1,5 divise la vitesse par 1,5. Ce ralentissement effectif vient de la matière elle-même : l’onde fait osciller les charges du milieu, qui réémettent une onde légèrement en retard, et la somme des deux avance moins vite.
symbole: v | vitesse de la lumière dans le milieu (vitesse de phase) | mètre par seconde (m/s) | ≈ 225 000 km/s dans l’eau · ≈ 200 000 km/s dans le verre
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement
symbole: n | indice de réfraction du milieu : combien de fois la lumière y va moins vite que dans le vide | sans unité | 1 vide · 1,000 28 air · 1,33 eau · ≈ 1,5 verre

## Bloc : Miroir ou diffuseur : le critère de rugosité de Rayleigh
dit: Une surface agit comme un miroir tant que ses bosses restent assez petites pour que les rayons réfléchis au sommet et au creux d’une aspérité ressortent presque en phase. La différence de chemin entre ces deux rayons vaut $2h\cos\theta$ ; Rayleigh la tolère jusqu’à un quart de longueur d’onde, soit un déphasage de π/2, d’où le 8. La rugosité n’est donc pas absolue : elle se compare à la longueur d’onde et dépend de l’angle sous lequel on regarde.
symbole: h | hauteur des aspérités de la surface, du creux au sommet ; dans la forme statistique du critère, l’écart quadratique moyen σ du relief | mètre (m), souvent en nanomètres | < 62,5 nm pour un miroir de lumière visible (0,5 µm) vu de face
symbole: < | « est strictement inférieur à » | — | 
symbole: \lambda | longueur d’onde : distance entre deux crêtes successives de l’onde | mètre (m), souvent en nanomètres (nm) | 380 à 780 nm pour le visible
symbole: \cos | cosinus d’un angle : côté adjacent sur hypoténuse | sans unité, entre −1 et 1 | cos 0° = 1 · cos 60° = 0,5 · cos 90° = 0
symbole: \theta | angle d’incidence, mesuré depuis la normale (la perpendiculaire à la surface) | degré (°) ou radian (rad) | 0° de face · proche de 90° en lumière rasante

## Bloc : Loi de Snell-Descartes
dit: Quand la lumière franchit la frontière entre deux milieux, le produit « indice × sinus de l’angle » garde la même valeur des deux côtés. Entrer dans un milieu d’indice plus grand oblige donc le sinus, et l’angle, à diminuer : le rayon se rapproche de la normale. C’est ce changement de direction qui « casse » le bâton plongé dans l’eau et qui fait converger la lumière dans une lentille.
symbole: n_1 | indice de réfraction du milieu d’où vient la lumière | sans unité | 1,00 pour l’air
symbole: \sin | sinus d’un angle : côté opposé sur hypoténuse | sans unité, entre −1 et 1 | sin 0° = 0 · sin 30° = 0,5 · sin 90° = 1
symbole: i | angle d’incidence, mesuré depuis la normale | degré (°) | au-delà de ≈ 49° de l’eau vers l’air : réflexion totale
symbole: n_2 | indice de réfraction du milieu où la lumière entre | sans unité | 1,33 pour l’eau · ≈ 1,5 pour le verre
symbole: r | angle de réfraction, mesuré depuis la normale | degré (°) | i = 45° de l’air vers l’eau → r ≈ 32°

## Bloc : Courbure d'un rayon dans l'air stratifié
dit: Dans un air dont l’indice change avec l’altitude, la lumière ne va pas droit : son rayon se courbe, d’autant plus que l’indice varie vite d’une couche à la suivante, et toujours du côté de l’indice le plus élevé, c’est-à-dire de l’air le plus dense. La seconde relation dit d’où vient cette variation : l’écart $n-1$ suit la densité de l’air, il croît avec la pression et diminue quand la température monte. Un sol surchauffé ou une mer froide créent des gradients assez forts pour plier l’image de ce qu’on regarde.
symbole: \frac{\mathrm{d}\theta}{\mathrm{d}s} | courbure du rayon : de combien sa direction tourne par mètre parcouru | radian par mètre (rad/m) | ≈ 2,7 × 10⁻⁸ rad/m dans l’air standard : un rayon de courbure de ≈ 37 000 km
symbole: \theta | direction du rayon, mesurée depuis l’horizontale | radian (rad) ou degré (°) | presque nulle pour un rayon rasant : cos θ ≈ 1
symbole: \cos | cosinus d’un angle : côté adjacent sur hypoténuse | sans unité, entre −1 et 1 | cos 0° = 1 · cos 60° = 0,5 · cos 90° = 0
symbole: n | indice de réfraction de l’air à l’altitude du rayon | sans unité | ≈ 1,000 28 à 15 °C au niveau de la mer
symbole: \frac{\mathrm{d}n}{\mathrm{d}z} | gradient vertical d’indice : de combien l’indice change quand on monte d’un mètre | par mètre (m⁻¹) | ≈ −2,7 × 10⁻⁸ m⁻¹ dans l’air standard ; positif, des centaines de fois plus fort, au-dessus d’une route brûlante — et davantage encore au ras du bitume
symbole: n-1 | réfractivité de l’air : l’écart de son indice à celui du vide | sans unité | ≈ 2,8 × 10⁻⁴ à 15 °C et 1 013 hPa
symbole: \propto | « est proportionnel à » : égal à un facteur constant près | — | doubler l’un double l’autre
symbole: P | pression de l’air | pascal (Pa) | 101 325 Pa au niveau de la mer
symbole: T | température absolue de l’air | kelvin (K) | 288 K = 15 °C

## Bloc : Principe de Fermat
dit: Le rapport $n/c$ est l’inverse de la vitesse locale de la lumière : le temps qu’elle met à parcourir un mètre à cet endroit. En l’additionnant du point A au point B, l’intégrale donne la durée totale du trajet. Le principe affirme que la lumière suit le trajet dont la durée ne change pas au premier ordre quand on le déforme un peu : un minimum dans les cas simples, parfois un maximum ou un col, comme dans certains miroirs concaves.
symbole: \delta | variation au premier ordre : ce que devient la quantité quand on déforme très peu le trajet | — | δ(…) = 0 : le temps est stationnaire
symbole: \int | intégrale : somme continue des contributions de chaque petit bout du trajet | — | 
symbole: A | point de départ de la lumière | — | 
symbole: B | point d’arrivée de la lumière | — | 
symbole: n(s) | indice de réfraction au point du trajet repéré par s | sans unité | change le long du trajet si le milieu change
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement
symbole: \mathrm{d}s | petit élément de longueur le long du trajet | mètre (m) | 

## Bloc : L'interfrange de Young
dit: Chaque fente renvoie sa propre onde. En un point de l’écran, les deux ondes arrivent tantôt en phase (frange brillante), tantôt en opposition (frange sombre), selon la différence de longueur de leurs chemins. On passe d’une frange brillante à la suivante quand cette différence augmente d’une longueur d’onde. L’interfrange grandit donc avec $\lambda$ et avec la distance à l’écran, et rétrécit quand on écarte les fentes.
symbole: i | interfrange : distance entre deux franges brillantes voisines sur l’écran | mètre (m), souvent en millimètres | ≈ 1,3 mm avec λ = 633 nm, D = 1 m et a = 0,5 mm
symbole: \lambda | longueur d’onde : distance entre deux crêtes successives de l’onde | mètre (m), souvent en nanomètres (nm) | 380 à 780 nm pour le visible
symbole: D | distance entre le plan des fentes et l’écran | mètre (m) | 1 à 3 m sur une paillasse
symbole: a | écart entre les deux fentes, de centre à centre | mètre (m) | de l’ordre de 0,1 à 1 mm

## Bloc : Loi de Malus
dit: Un polariseur ne laisse passer que la part du champ électrique alignée avec son axe : l’amplitude du champ est multipliée par $\cos\theta$. Or l’intensité est proportionnelle au carré de l’amplitude ; elle est donc multipliée par $\cos^2\theta$. Aligné, tout passe ; à 45°, la moitié ; croisé à 90°, plus rien.
symbole: I | intensité transmise par l’analyseur | watt par mètre carré (W/m²) | nulle quand θ = 90°
symbole: I_0 | intensité de la lumière, déjà polarisée, qui arrive sur l’analyseur (une lumière naturelle perd déjà la moitié au premier polariseur) | watt par mètre carré (W/m²) | 
symbole: \cos^2 | cosinus au carré : le carré porte sur le cosinus, pas sur l’angle | sans unité, entre 0 et 1 | cos² 45° = 0,5 · cos² 60° = 0,25
symbole: \theta | angle entre la polarisation de la lumière et l’axe de transmission de l’analyseur | degré (°) | 0° : tout passe · 90° : rien ne passe

## Bloc : Limite de résolution : le critère de Rayleigh
dit: Même parfaite, une optique ne donne pas d’un point une image ponctuelle : la diffraction par l’ouverture l’étale en une petite tache entourée d’anneaux, la tache d’Airy. Deux points sont « juste séparés » quand le centre de l’une tombe sur le premier anneau sombre de l’autre ; cet écart angulaire vaut $1{,}22\,\lambda/D$. Pour voir plus fin, il faut une ouverture plus grande ou une longueur d’onde plus courte.
symbole: \theta_{\min} | plus petit angle entre deux points que l’instrument peut encore séparer | radian (rad) | ≈ 1,3 × 10⁻⁴ rad (≈ 28″) pour une pupille de 5 mm à 550 nm ; l’acuité réelle de l’œil, limitée par la rétine, est plutôt de 1′
symbole: \approx | « est environ égal à » : égalité approchée, valable sous une hypothèse | — | 
symbole: 1{,}22 | facteur propre à une ouverture circulaire : premier zéro de la fonction de Bessel J₁ divisé par π | sans unité | 3,8317 / π ≈ 1,2197
symbole: \lambda | longueur d’onde : distance entre deux crêtes successives de l’onde | mètre (m), souvent en nanomètres (nm) | 380 à 780 nm pour le visible
symbole: D | diamètre de l’ouverture : pupille, objectif, miroir | mètre (m) | 5 mm pour l’œil · 2,4 m pour Hubble · 6,5 m pour James-Webb

## Bloc : Mesurer un cheveu avec une règle
dit: Derrière un obstacle fin, ou une fente de même largeur, la lumière diffractée s’éteint dans les directions où $a\sin\theta$ vaut un nombre entier de longueurs d’onde. Pour de petits angles, $\sin\theta$ vaut à peu près la position sur le mur divisée par $L$, si bien que deux zones sombres voisines sont séparées de $\lambda L/a$. Mesurer cet écart à la règle suffit pour retrouver l’épaisseur du cheveu.
symbole: a | largeur de l’obstacle : ici le diamètre du cheveu | mètre (m), souvent en micromètres | ≈ 70 µm dans l’exemple ; un cheveu fait typiquement 50 à 100 µm
symbole: \sin | sinus d’un angle : côté opposé sur hypoténuse | sans unité, entre −1 et 1 | sin 0° = 0 · sin 30° = 0,5 · sin 90° = 1
symbole: \theta_m | angle sous lequel on voit la m-ième zone sombre, depuis l’axe du faisceau | radian (rad) | quelques milliradians
symbole: m | numéro de la zone sombre, compté depuis le centre | sans unité, entier non nul | 1, 2, 3…
symbole: \lambda | longueur d’onde : distance entre deux crêtes successives de l’onde | mètre (m), souvent en nanomètres (nm) | 380 à 780 nm pour le visible
symbole: \Rightarrow | « donc » : ce qui suit se déduit de ce qui précède (ici, pour de petits angles) | — | 
symbole: \approx | « est environ égal à » : égalité approchée, valable sous une hypothèse | — | 
symbole: L | distance entre le cheveu et le mur | mètre (m) | 2,5 m dans l’exemple
symbole: \Delta x | écart entre deux zones sombres voisines sur le mur (pas la largeur totale de la tache centrale, qui vaut le double) | mètre (m) | 1,9 cm dans l’exemple

## Bloc : La vitesse des ondes de Maxwell
dit: Les équations de Maxwell admettent des ondes où champ électrique et champ magnétique s’entretiennent mutuellement en se propageant. Leur vitesse ne dépend que de deux constantes du vide : $\varepsilon_0$, qui règle la force entre charges, et $\mu_0$, qui règle la force entre courants. Avec les valeurs mesurées sur des condensateurs et des bobines, on retrouve 300 000 km/s : la lumière est une onde électromagnétique.
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement
symbole: \mu_0 | perméabilité magnétique du vide : elle fixe la force entre deux courants électriques | newton par ampère carré (N/A²), ou henry par mètre (H/m) | ≈ 1,256 637 × 10⁻⁶ N/A² ; valait exactement 4π × 10⁻⁷ jusqu’en 2019, c’est depuis une valeur mesurée
symbole: \varepsilon_0 | permittivité électrique du vide : elle fixe la force entre deux charges électriques | farad par mètre (F/m) | ≈ 8,854 188 × 10⁻¹² F/m

## Bloc : Le quantum d'énergie de Planck-Einstein
dit: La lumière échange son énergie avec la matière par paquets indivisibles, les photons. L’énergie d’un photon est proportionnelle à la fréquence de la lumière, et le coefficient est la constante de Planck. Un photon violet de 400 nm porte ainsi environ 1,75 fois l’énergie d’un photon rouge de 700 nm. L’intensité d’un faisceau, elle, dit combien de photons arrivent, pas ce que chacun transporte.
symbole: E | énergie d’un photon | joule (J), ou électronvolt (eV) | ≈ 3,3 × 10⁻¹⁹ J ≈ 2,1 eV à 500 THz (≈ 600 nm, orange)
symbole: h | constante de Planck | joule-seconde (J·s) | 6,626 070 15 × 10⁻³⁴ J·s, exacte depuis 2019
symbole: \nu | fréquence : nombre d’oscillations par seconde | hertz (Hz = s⁻¹) | ≈ 600 THz à 500 nm (bleu-vert)
symbole: \mathrm{J{\cdot}s} | joule-seconde : une énergie multipliée par une durée (unité d’« action ») | kg·m²/s | 

## Bloc : L'effet photoélectrique
dit: Un photon cède toute son énergie $h\nu$ à un seul électron. Une part, $\Phi$, sert à arracher l’électron au métal ; le reste devient son énergie de mouvement. Si $h\nu$ est plus petit que $\Phi$, rien ne sort, quel que soit le nombre de photons. Tracée en fonction de la fréquence, l’énergie des électrons suit une droite de pente $h$ : c’est ce que Millikan a vérifié en 1916.
symbole: K_{\max} | énergie cinétique maximale d’un électron arraché au métal | joule (J), ou électronvolt (eV) | de 0 à quelques eV
symbole: h | constante de Planck | joule-seconde (J·s) | 6,626 070 15 × 10⁻³⁴ J·s, exacte depuis 2019
symbole: \nu | fréquence : nombre d’oscillations par seconde | hertz (Hz = s⁻¹) | ≈ 600 THz à 500 nm (bleu-vert)
symbole: \Phi | travail d’extraction : l’énergie minimale pour arracher un électron au métal | électronvolt (eV) | ≈ 2,3 eV sodium · ≈ 4,3 eV zinc ; varie avec la face cristalline et l’état de la surface

## Bloc : Quantité de mouvement et pression de radiation
dit: Un photon n’a pas de masse, mais il transporte une quantité de mouvement égale à son énergie divisée par $c$. Une surface qui absorbe la lumière reçoit cette quantité de mouvement : elle est poussée, et la poussée par mètre carré vaut l’irradiance divisée par $c$. Un miroir renvoie le photon en sens inverse ; la variation de quantité de mouvement est doublée, la pression aussi.
symbole: p | quantité de mouvement d’un photon | kilogramme-mètre par seconde (kg·m/s) | ≈ 1,3 × 10⁻²⁷ kg·m/s à 500 nm
symbole: E | énergie du photon | joule (J) | ≈ 4 × 10⁻¹⁹ J à 500 nm
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement
symbole: P_{\text{rad}} | pression de radiation : la force exercée par la lumière sur chaque mètre carré | pascal (Pa) | 4,5 µPa (absorption) · 9 µPa (miroir) au soleil, à la distance de la Terre
symbole: I | irradiance : puissance lumineuse reçue par mètre carré | watt par mètre carré (W/m²) | ≈ 1 361 W/m² de Soleil au-dessus de l’atmosphère

## Bloc : L'effet Compton
dit: Un photon X qui heurte un électron lui cède une part de son énergie et de sa quantité de mouvement, comme une bille qui en percute une autre. Il repart moins énergétique, donc avec une longueur d’onde plus grande. L’allongement ne dépend que de l’angle de déviation : nul si le photon continue tout droit, maximal, deux fois 2,43 pm, s’il repart en arrière.
symbole: \Delta\lambda | allongement de la longueur d’onde du photon après la collision | mètre (m), en picomètres (pm) | de 0 (θ = 0°) à 4,85 pm (θ = 180°)
symbole: h | constante de Planck | joule-seconde (J·s) | 6,626 070 15 × 10⁻³⁴ J·s, exacte depuis 2019
symbole: m_e | masse de l’électron | kilogramme (kg) | 9,109 × 10⁻³¹ kg
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement
symbole: \cos | cosinus d’un angle : côté adjacent sur hypoténuse | sans unité, entre −1 et 1 | cos 0° = 1 · cos 60° = 0,5 · cos 90° = 0
symbole: \theta | angle de diffusion : de combien le photon est dévié | degré (°) | 90° → Δλ = 2,43 pm

## Bloc : La longueur d'onde de de Broglie
dit: De Broglie retourne la relation du photon : toute particule en mouvement a une longueur d’onde, d’autant plus courte que sa quantité de mouvement est grande. Pour un électron lent, elle est comparable à l’écart entre les atomes d’un cristal, qui le diffracte comme un réseau diffracte la lumière. Pour une balle de tennis, elle est de l’ordre de $10^{-34}$ m : aucun effet d’onde n’est observable.
symbole: \lambda | longueur d’onde associée à la particule | mètre (m) | ≈ 0,17 nm pour un électron de 54 eV (Davisson-Germer)
symbole: h | constante de Planck | joule-seconde (J·s) | 6,626 070 15 × 10⁻³⁴ J·s, exacte depuis 2019
symbole: p | quantité de mouvement de la particule : masse × vitesse pour une particule lente | kilogramme-mètre par seconde (kg·m/s) | 

## Bloc : La diffusion de Rayleigh
dit: Une molécule d’air, bien plus petite que la longueur d’onde, se comporte comme une minuscule antenne : le champ lumineux fait osciller ses charges, qui rayonnent à leur tour dans toutes les directions, d’autant plus que l’oscillation est rapide. La puissance rayonnée suit la fréquence à la puissance quatre, donc $1/\lambda^4$ : le bleu et le violet sont beaucoup plus diffusés que le rouge.
symbole: I_{\text{diffusée}} | intensité de la lumière diffusée par les molécules de l’air | watt par mètre carré (W/m²), en valeur relative | bleu (450 nm) ≈ 5,9 fois le rouge (700 nm)
symbole: \propto | « est proportionnel à » : égal à un facteur constant près | — | doubler l’un double l’autre
symbole: \lambda^{4} | longueur d’onde à la puissance quatre | m⁴ | doubler λ divise la diffusion par 16

## Bloc : L'effet Tcherenkov
dit: Une particule chargée qui traverse un milieu plus vite que la lumière ne s’y propage émet une onde de choc lumineuse, comme un avion supersonique produit un bang. Les ondelettes émises le long de sa trajectoire s’additionnent sur un cône dont l’angle dépend du rapport entre la vitesse de la lumière dans le milieu, $c/n$, et celle de la particule, $v$. Plus la particule est rapide, plus l’angle d’émission s’ouvre, jusqu’à 41° au plus dans l’eau — tandis que le front d’onde, lui, se resserre comme un cône de Mach ; sous le seuil $v = c/n$, aucune lumière n’est émise.
symbole: \cos | cosinus d’un angle : côté adjacent sur hypoténuse | sans unité, entre −1 et 1 | cos 0° = 1 · cos 60° = 0,5 · cos 90° = 0
symbole: \theta_c | demi-angle d’ouverture du cône de lumière Tcherenkov, mesuré depuis la trajectoire | degré (°) | ≈ 41° dans l’eau pour une particule proche de c
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement
symbole: n | indice de réfraction du milieu : combien de fois la lumière y va moins vite que dans le vide | sans unité | 1 vide · 1,000 28 air · 1,33 eau · ≈ 1,5 verre
symbole: v | vitesse de la particule chargée | mètre par seconde (m/s) | doit dépasser ≈ 225 000 km/s dans l’eau
symbole: > | « est strictement supérieur à » | — | 
symbole: c/n | vitesse de la lumière dans le milieu | mètre par seconde (m/s) | ≈ 225 000 km/s dans l’eau

## Bloc : L'inégalité CHSH
dit: On mesure, sur des paires de photons intriqués, la corrélation des résultats pour deux orientations d’Alice ($a$, $a'$) et deux de Bob ($b$, $b'$), puis on combine les quatre corrélations. Si chaque photon emportait d’avance des instructions locales, cette combinaison ne pourrait jamais dépasser 2. La mécanique quantique prédit jusqu’à $2\sqrt2 \approx 2{,}83$ pour des orientations bien choisies. Mesurer $S > 2$ exclut donc toute théorie à variables cachées locales.
symbole: S | paramètre CHSH : combinaison des quatre corrélations mesurées | sans unité | ≤ 2 si les variables cachées sont locales
symbole: E | corrélation des résultats (+1 ou −1) d’Alice et de Bob pour un couple d’orientations : moyenne de leur produit | sans unité, entre −1 et +1 | +1 : toujours d’accord · −1 : toujours opposés · 0 : sans lien
symbole: a | première orientation de l’analyseur d’Alice | degré (°) | 0° dans le réglage qui maximise S
symbole: a' | seconde orientation de l’analyseur d’Alice ; le « prime » n’est pas une dérivée | degré (°) | 45°
symbole: b | première orientation de l’analyseur de Bob | degré (°) | 22,5°
symbole: b' | seconde orientation de l’analyseur de Bob | degré (°) | 67,5° ; avec ces quatre angles, S = 2√2
symbole: \le | « est inférieur ou égal à » | — | 
symbole: S_{\text{quantique}} | valeur de S que permet la mécanique quantique | sans unité | au plus 2√2 ≈ 2,83
symbole: 2\sqrt{2} | borne de Tsirelson : le maximum quantique de S | sans unité | ≈ 2,828

## Bloc : Ce qui se conserve dans la SPDC
dit: Dans un cristal non linéaire, un photon de pompe peut, rarement, se scinder en deux photons appelés signal et complémentaire. Deux bilans sont respectés : l’énergie $\hbar\omega$ de la pompe se partage exactement entre les deux, et sa quantité de mouvement $\hbar\vec k$ presque exactement, c’est l’accord de phase, qui fixe les directions d’émission. Ces deux contraintes lient l’énergie et la direction des deux photons de la paire : c’est l’origine de leurs corrélations. Pour les intriquer aussi en polarisation, comme dans les tests de Bell, il faut un montage dédié (deux cristaux croisés, par exemple).
symbole: \hbar | constante de Planck réduite : h divisé par 2π | joule-seconde (J·s) | ≈ 1,054 572 × 10⁻³⁴ J·s
symbole: \omega_p | pulsation du photon de pompe (2π fois sa fréquence) | radian par seconde (rad/s) | ≈ 4,65 × 10¹⁵ rad/s à 405 nm
symbole: \omega_s | pulsation du photon « signal » | radian par seconde (rad/s) | ≈ 2,33 × 10¹⁵ rad/s à 810 nm
symbole: \omega_i | pulsation du photon « complémentaire » (idler) | radian par seconde (rad/s) | ≈ 2,33 × 10¹⁵ rad/s à 810 nm
symbole: \vec{k}_p | vecteur d’onde de la pompe : pointé dans le sens de propagation, de norme 2πn/λ | radian par mètre (rad/m) | 
symbole: \vec{k}_s | vecteur d’onde du photon signal | radian par mètre (rad/m) | 
symbole: \vec{k}_i | vecteur d’onde du photon complémentaire | radian par mètre (rad/m) | 
symbole: \approx | « est environ égal à » : égalité approchée, valable sous une hypothèse | — | 

## Bloc : L'effet Doppler-Fizeau
dit: Quand une source s’éloigne, chaque crête part d’un peu plus loin que la précédente : les crêtes arrivent plus espacées, la longueur d’onde s’allonge. Le décalage relatif égale le rapport entre la vitesse d’éloignement et la vitesse de la lumière. Mesurer le glissement d’une raie connue donne donc la vitesse de la source le long de la ligne de visée, pas sa vitesse de travers.
symbole: \Delta\lambda | décalage de la longueur d’onde : observée moins émise | mètre (m) | +0,066 nm pour Hα à 30 km/s
symbole: \lambda | longueur d’onde émise, mesurée au repos au laboratoire | mètre (m) | 656,3 nm pour la raie Hα de l’hydrogène
symbole: \approx | « est environ égal à » : égalité approchée, valable sous une hypothèse | — | 
symbole: v_r | vitesse radiale : vitesse le long de la ligne de visée, positive quand la source s’éloigne | mètre par seconde (m/s) | ≈ 30 km/s : vitesse orbitale de la Terre
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement

## Bloc : Le décalage vers le rouge cosmologique
dit: Pendant le voyage de la lumière, l’espace s’étire, et les longueurs d’onde avec lui. $1+z$ est ce facteur d’étirement : il est égal au rapport entre la taille de l’Univers au moment de la réception et sa taille au moment de l’émission. $z = 1$ signifie que les distances entre galaxies lointaines, celles qui suivent l’expansion, ont doublé pendant le trajet. Un décalage cosmologique se lit donc comme une époque, plus que comme une vitesse.
symbole: z | décalage vers le rouge cosmologique (redshift) | sans unité | ≈ 1 100 pour le fond diffus · jusqu’à ≈ 14 pour les galaxies les plus lointaines confirmées par James-Webb (2024-2025)
symbole: \lambda_{\text{obs}} | longueur d’onde reçue par le télescope | mètre (m) | 
symbole: \lambda_{\text{ém}} | longueur d’onde émise par la source | mètre (m) | 121,6 nm pour la raie Lyman-α

## Texte
# contexte | tex | définition | unité | remarque
* | c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, exactement
ateliers | \lambda | longueur d’onde de la lumière | mètre (m), souvent en nanomètres (nm) |
ateliers | D | distance entre le plan des fentes et l’écran | mètre (m) |
ateliers | a | écart entre les deux fentes, de centre à centre | mètre (m) |
ch5 | \lambda | longueur d’onde de la lumière | mètre (m) | ≈ 550 nm au milieu du visible
ch5 | L | distance entre le trou du sténopé et l’écran | mètre (m) | 10 cm pour une boîte
ch7 | z | altitude, comptée vers le haut | mètre (m) |
ch7@n/c | n | indice de réfraction du milieu au point considéré du trajet | sans unité |
ch10 | d | pas du réseau : distance entre deux sillons voisins | mètre (m), ici en micromètres | 1,6 µm pour un CD, 0,74 µm pour un DVD
ch10 | \lambda | longueur d’onde de la lumière | mètre (m) | 450 nm (bleu) à 700 nm (rouge)
ch10 | \theta | angle de déviation de la lumière par le réseau, compté depuis la normale | degré (°) | 16° pour le bleu, 26° pour le rouge au premier ordre
ch10 | m | ordre de diffraction : nombre entier de longueurs d’onde de différence de marche | sans unité | 0, ±1, ±2…
ch14@\sin\theta | \theta | angle de diffraction : direction vue depuis le cheveu, comptée depuis l’axe du faisceau | radian (rad) | quelques milliradians
ch14@a\sin\theta | \theta | angle de diffraction : direction vue depuis le cheveu, comptée depuis l’axe du faisceau | radian (rad) | quelques milliradians
ch19 | \hbar | constante de Planck réduite : h divisé par 2π | joule-seconde (J·s) | ≈ 1,054 572 × 10⁻³⁴ J·s
ch19 | \omega | pulsation : 2π fois la fréquence | radian par seconde (rad/s) |
ch19 | E | énergie d’un photon | joule (J), ou électronvolt (eV) |
ch26 | \omega | pulsation de l’onde (2π fois sa fréquence) | radian par seconde (rad/s) |
ch26 | \vec k | vecteur d’onde : pointé dans le sens de propagation, de norme 2πn/λ | radian par mètre (rad/m) |
ch27 | S | paramètre CHSH : combinaison des quatre corrélations mesurées | sans unité | ≤ 2 pour les modèles locaux, jusqu’à 2√2 en quantique
ch28 | v | vitesse radiale de la source, le long de la ligne de visée | mètre par seconde (m/s) |

ch20@\nu_0 = \Phi/h | \nu_0 | fréquence seuil : en dessous, aucun électron n’est arraché, quelle que soit l’intensité | hertz (Hz) | ≈ 5,6 × 10¹⁴ Hz pour le sodium (Φ ≈ 2,3 eV)
