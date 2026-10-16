# Symboles des formules — terre-sphere

## Bloc : Observation
# TeX : T_{\mathrm{sid}} = 86164{,}0905\,\mathrm{s}
dit: Une rotation sidérale ramène un méridien face aux mêmes étoiles. Elle dure un peu moins de 24 heures car la Terre avance aussi sur son orbite solaire.
symbole: T_{\mathrm{sid}} | durée d’une rotation terrestre par rapport aux étoiles | seconde (s) | ≈ 86 164,0905 s

## Bloc : Calcul déroulé — vitesse linéaire à l’équateur
# TeX : a_c = \omega^2 R = \left(\frac{2\pi}{T_{\mathrm{sid}}}\right)^2 a \approx 0{,}0339\,\mathrm{m\,s^{-2}} \approx 0{,}0034\,g
dit: À l’équateur, la rotation impose une accélération centripète proportionnelle au rayon et au carré de la vitesse angulaire. Elle reste petite devant la pesanteur ; une vitesse constante n’est pas en elle-même une accélération ressentie.
symbole: a_c | accélération centripète liée à la rotation à l’équateur | mètre par seconde carrée (m/s²) | ≈ 0,0339 m/s²
symbole: \omega | vitesse angulaire de rotation terrestre | radian par seconde (rad/s) | ≈ 7,292115 × 10⁻⁵ rad/s
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs
symbole: T_{\mathrm{sid}} | durée d’une rotation terrestre par rapport aux étoiles | seconde (s) | ≈ 86 164,0905 s
symbole: a | rayon équatorial de référence terrestre | mètre (m) | WGS 84 : 6 378 137 m
symbole: g | accélération gravitationnelle locale | mètre par seconde carrée (m/s²) | ≈ 9,8 m/s² à la surface terrestre

## Bloc : Géométrie — pourquoi l’angle d’ombre = angle au centre
# TeX : \frac{\theta}{360^\circ} = \frac{d}{C} \quad\Rightarrow\quad C = d \times \frac{360}{\theta} = 5\,000 \times 50 = 250\,000\ \text{stades}
dit: Des rayons solaires presque parallèles permettent de relier la différence des angles zénithaux à l’angle entre les verticales. La distance entre les sites représente alors la même fraction d’un méridien que l’angle représente d’un tour.
symbole: \theta | différence d’angle zénithal, égale à l’angle au centre dans le modèle | degré (°) | convertir en radians si une fonction trigonométrique l’exige
symbole: d | distance méridienne entre les deux sites d’observation | mètre (m), ou stade dans le calcul antique | employer la même unité que la circonférence
symbole: C | circonférence terrestre mesurée le long du méridien | mètre (m) | dans le calcul antique, exprimée en stades

## Bloc : Samuel Birley Rowbotham (1816–1884)
# TeX : h \approx \frac{8}{12\times5280}\,\mathrm{mi} \times \left(\frac{d}{1\,\mathrm{mi}}\right)^2
dit: Le slogan de huit pouces par mile carré convertit une approximation locale de la courbure sphérique dans des unités anglo-saxonnes. Il décrit l’écart à une tangente, sans suffire à calculer ce qu’un observateur peut voir.
symbole: h | écart vertical à la tangente locale | mètre (m) | ne représente pas directement la hauteur masquée pour un observateur surélevé
symbole: d | distance horizontale mesurée dans le plan tangent local | mètre (m) | petite devant le rayon terrestre ; ce n’est pas ici une distance laser

## Bloc : Samuel Birley Rowbotham (1816–1884) #2
# TeX : h = \frac{d^2}{2R} \quad\text{avec}\quad R=6\,371\,\mathrm{km}
dit: L’écart de la surface à sa tangente croît approximativement comme le carré de la distance. Cette expression demande une distance petite devant le rayon terrestre et ne tient pas compte de la hauteur des yeux.
symbole: h | écart vertical à la tangente locale | mètre (m) | ne représente pas directement la hauteur masquée pour un observateur surélevé
symbole: d | distance horizontale mesurée dans le plan tangent local | mètre (m) | petite devant le rayon terrestre ; ce n’est pas ici une distance laser
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs

## Bloc : Carte AE (azimuthal equidistant, pôle Nord au centre)
# TeX : k = \frac{\pi/2-\varphi}{\cos\varphi}
dit: Une carte azimutale équidistante polaire conserve les distances radiales depuis son centre. Son étirement est-ouest augmente fortement vers les latitudes australes ; ce défaut de projection ne démontre pas à lui seul une forme physique.
symbole: k | facteur local d’étirement est-ouest sur la projection azimutale équidistante polaire | sans unité | une projection ne conserve pas toutes les distances
symbole: \varphi | latitude du lieu | radian (rad) | positive au nord, négative au sud ; une latitude en degrés doit être convertie pour les calculs

## Bloc : Le « mur de glace » face aux nombres
# TeX : L_{\mathrm{AE}} = 2\pi R\left(\frac{\pi}{2}-\varphi_b\right)
dit: Sur cette projection polaire, un parallèle austral devient un cercle dont le rayon est sa distance depuis le pôle Nord. La longueur de ce cercle projeté ne doit pas être confondue avec le périmètre du littoral antarctique.
symbole: L_{\mathrm{AE}} | circonférence du parallèle sur la projection azimutale équidistante polaire | mètre (m) | ne correspond pas au périmètre du littoral antarctique
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs
symbole: \varphi_b | latitude du parallèle choisi comme bord du disque projeté | radian (rad) | négative au sud ; ce parallèle n’est pas le littoral antarctique

## Bloc : Disparition coque-en-premier
# TeX : d = \sqrt{2Rh+h^2} \approx \sqrt{2Rh}
dit: La ligne de visée vers l’horizon est tangente à la sphère terrestre. Le théorème de Pythagore donne la distance rectiligne de l’œil au point de tangence ; l’approximation suppose une hauteur petite devant le rayon.
symbole: d | distance rectiligne de l’œil au point de tangence de l’horizon | mètre (m) | proche de la distance au sol pour les faibles hauteurs
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs
symbole: h | hauteur de l’œil ou de l’horloge au-dessus de la surface de référence | mètre (m) | petite devant le rayon terrestre

## Bloc : Pendule de Foucault — période du plan
# TeX : T_p = \frac{2\pi}{\Omega|\sin\varphi|} = \frac{23{,}934\,\mathrm{h}}{|\sin\varphi|}
dit: La précession du plan d’oscillation dépend de la composante verticale de la rotation terrestre. Sa période augmente vers l’équateur, où la précession idéale s’annule ; la durée utilise la valeur absolue du sinus.
symbole: T_p | période de précession du plan du pendule de Foucault | heure (h) | la durée physique est positive : utiliser la valeur absolue du sinus ; infinie à l’équateur
symbole: \Omega | vitesse angulaire de rotation terrestre | radian par seconde (rad/s) | ≈ 7,292115 × 10⁻⁵ rad/s, soit 15,041°/h
symbole: \varphi | latitude du lieu | radian (rad) | positive au nord, négative au sud ; une latitude en degrés doit être convertie pour les calculs

## Bloc : Circonférence d’Ératosthène
# TeX : C=\frac{360^\circ}{\theta}\,d
dit: Deux sites du même méridien offrent une mesure de la circonférence si l’on connaît leur séparation et leur différence d’angle zénithal. Le modèle suppose un Soleil assez lointain pour traiter ses rayons comme parallèles.
symbole: C | circonférence terrestre mesurée le long du méridien | mètre (m) | dans le calcul antique, exprimée en stades
symbole: \theta | différence d’angle zénithal, égale à l’angle au centre dans le modèle | degré (°) | convertir en radians si une fonction trigonométrique l’exige
symbole: d | distance méridienne entre les deux sites d’observation | mètre (m), ou stade dans le calcul antique | employer la même unité que la circonférence

## Bloc : Flèche de courbure
# TeX : h\approx\frac{d^2}{2R}
dit: À faible distance, l’écart à la tangente est quadratique en distance et inversement proportionnel au rayon. Cette flèche n’est pas la hauteur masquée d’un objet pour un observateur dont les yeux sont au-dessus du sol.
symbole: h | écart vertical à la tangente locale | mètre (m) | ne représente pas directement la hauteur masquée pour un observateur surélevé
symbole: d | distance horizontale mesurée dans le plan tangent local | mètre (m) | petite devant le rayon terrestre ; ce n’est pas ici une distance laser
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs

## Bloc : Foucault
# TeX : \Omega_p=\Omega\sin\varphi
dit: Le plan du pendule précesse selon la projection verticale de la rotation terrestre. Le taux s’annule à l’équateur et change de signe entre les hémisphères.
symbole: \Omega_p | vitesse angulaire signée de précession du plan du pendule de Foucault | radian par seconde (rad/s) | nulle à l’équateur ; le sens change entre les hémisphères
symbole: \Omega | vitesse angulaire de rotation terrestre | radian par seconde (rad/s) | ≈ 7,292115 × 10⁻⁵ rad/s, soit 15,041°/h
symbole: \varphi | latitude du lieu | radian (rad) | positive au nord, négative au sud ; une latitude en degrés doit être convertie pour les calculs

## Bloc : Pesanteur
# TeX : g=\frac{GM}{R^2}
dit: Dans le modèle d’une masse sphérique, la gravitation à l’extérieur décroît comme l’inverse du carré de la distance au centre. La pesanteur réellement mesurée inclut aussi la rotation et les variations du champ terrestre.
symbole: g | accélération gravitationnelle locale | mètre par seconde carrée (m/s²) | ≈ 9,8 m/s² à la surface terrestre
symbole: G | constante de gravitation universelle | mètre cube par kilogramme par seconde carrée (m³/kg/s²) | ≈ 6,67430 × 10⁻¹¹ m³/kg/s²
symbole: M | masse du corps attracteur | kilogramme (kg) | Terre dans les formules de pesanteur et de Kepler
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs

## Bloc : Circonférence d’Ératosthène #2
# TeX : C = d\cdot 360^\circ/\theta
dit: Le rapport entre distance méridienne et circonférence est le rapport entre angle au centre et angle d’un tour. Toutes les longueurs doivent être exprimées dans une unité commune.
symbole: C | circonférence terrestre mesurée le long du méridien | mètre (m) | dans le calcul antique, exprimée en stades
symbole: d | distance méridienne entre les deux sites d’observation | mètre (m), ou stade dans le calcul antique | employer la même unité que la circonférence
symbole: \theta | différence d’angle zénithal, égale à l’angle au centre dans le modèle | degré (°) | convertir en radians si une fonction trigonométrique l’exige

## Bloc : Tangente et flèche : deux géométries
# TeX : h = R - \sqrt{R^2-d^2} = \frac{d^2}{R+\sqrt{R^2-d^2}} \approx \frac{d^2}{2R}
dit: Une coupe circulaire fournit l’écart exact entre la surface et une tangente à une distance horizontale donnée. La forme rationalisée rend visible l’approximation quadratique lorsque la distance reste petite devant le rayon.
symbole: h | écart vertical à la tangente locale | mètre (m) | ne représente pas directement la hauteur masquée pour un observateur surélevé
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs
symbole: d | distance horizontale mesurée dans le plan tangent local | mètre (m) | petite devant le rayon terrestre ; ce n’est pas ici une distance laser

## Bloc : Pesanteur newtonienne
# TeX : g = \frac{GM}{R^2}\qquad GM=3{,}986004418\times10^{14}\,\mathrm{m^3\,s^{-2}}
dit: La partie monopolaire du champ terrestre est fixée par le paramètre gravitationnel GM. Ce calcul sphérique ne comprend ni l’accélération centrifuge ni les harmoniques liées à la distribution des masses.
symbole: g | accélération gravitationnelle locale | mètre par seconde carrée (m/s²) | ≈ 9,8 m/s² à la surface terrestre
symbole: G | constante de gravitation universelle | mètre cube par kilogramme par seconde carrée (m³/kg/s²) | ≈ 6,67430 × 10⁻¹¹ m³/kg/s²
symbole: M | masse du corps attracteur | kilogramme (kg) | Terre dans les formules de pesanteur et de Kepler
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs

## Bloc : WGS 84 — ellipsoïde
# TeX : f = (a-b)/a = 1/298{,}257223563\qquad b=a(1-f)=6\,356\,752{,}314\,\mathrm{m}
dit: L’ellipsoïde WGS 84 décrit un rayon équatorial légèrement supérieur au rayon polaire. L’aplatissement est un rapport sans unité ; il fixe le petit axe à partir du grand axe.
symbole: f | aplatissement de l’ellipsoïde terrestre | sans unité | WGS 84 : 1 / 298,257223563
symbole: a | rayon équatorial de référence terrestre | mètre (m) | WGS 84 : 6 378 137 m
symbole: b | demi-petit axe polaire de l’ellipsoïde terrestre | mètre (m) | WGS 84 : ≈ 6 356 752 m

## Bloc : Loi des aires / Kepler pour un satellite
# TeX : T^2 = \frac{4\pi^2}{GM}a^3
dit: La période d’une orbite képlérienne croît comme le demi-grand axe à la puissance trois demis. Cette relation suppose un problème à deux corps ; la masse du satellite est négligée devant celle de la Terre.
symbole: T | période orbitale du satellite | seconde (s) | loi de Kepler dans l’approximation du problème à deux corps
symbole: G | constante de gravitation universelle | mètre cube par kilogramme par seconde carrée (m³/kg/s²) | ≈ 6,67430 × 10⁻¹¹ m³/kg/s²
symbole: M | masse du corps attracteur | kilogramme (kg) | Terre dans les formules de pesanteur et de Kepler
symbole: a | demi-grand axe de l’orbite | mètre (m) | distance caractéristique mesurée depuis le centre du corps attracteur

## Bloc : Accélération de marée (premier ordre)
# TeX : a_{\mathrm{tid}}\approx\frac{2GM R_\oplus}{d^3}
dit: Les marées résultent des différences d’accélération gravitationnelle à travers la Terre. Au premier ordre sur l’axe du perturbateur, cette différence dépend de sa masse et diminue comme l’inverse du cube de sa distance.
symbole: a_{\mathrm{tid}} | différence radiale d’accélération entre le centre terrestre et sa surface due au perturbateur | mètre par seconde carrée (m/s²) | terme de premier ordre en rayon terrestre / distance
symbole: G | constante de gravitation universelle | mètre cube par kilogramme par seconde carrée (m³/kg/s²) | ≈ 6,67430 × 10⁻¹¹ m³/kg/s²
symbole: M | masse du perturbateur, Lune ou Soleil | kilogramme (kg) | la différence de distance explique la prédominance du gradient lunaire
symbole: R_\oplus | rayon terrestre | mètre (m) | ≈ 6 371 km
symbole: d | distance entre le centre terrestre et le centre du perturbateur | mètre (m) | très supérieure au rayon terrestre

## Bloc : Approfondissement — marées, gradient 1/r^3 , deux bourrelets, rapport Lune/Soleil
# TeX : a_{\mathrm{tide}} \approx \frac{2GM}{r^3}R
dit: Le gradient de gravitation produit une accélération différentielle sur l’échelle du rayon terrestre. Cette estimation ne prédit pas à elle seule la hauteur locale des marées, qui dépend de la dynamique des bassins.
symbole: a_{\mathrm{tide}} | accélération différentielle radiale de marée | mètre par seconde carrée (m/s²) | premier ordre en rayon terrestre / distance au perturbateur
symbole: G | constante de gravitation universelle | mètre cube par kilogramme par seconde carrée (m³/kg/s²) | ≈ 6,67430 × 10⁻¹¹ m³/kg/s²
symbole: M | masse du perturbateur, Lune ou Soleil | kilogramme (kg) | la différence de distance explique la prédominance du gradient lunaire
symbole: r | distance entre le centre terrestre et le centre du perturbateur | mètre (m) | le gradient de marée diminue comme son inverse au cube
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs

## Bloc : Approfondissement — marées, gradient 1/r^3 , deux bourrelets, rapport Lune/Soleil #2
# TeX : a_L = \frac{2\times6{,}67430\times10^{-11}\times7{,}342\times10^{22}}{(3{,}844\times10^8)^3}\times6{,}371\times10^6 \approx 1{,}1\times10^{-6}\,\mathrm{m\,s^{-2}}
dit: Avec la masse et la distance lunaires moyennes, le gradient radial vaut environ un millionième de mètre par seconde carrée. Cette faible accélération différentielle agit continûment sur l’ensemble des océans.
symbole: a_L | accélération différentielle de marée lunaire | mètre par seconde carrée (m/s²) | ≈ 1,1 × 10⁻⁶ m/s² dans ce modèle

## Bloc : Précession nodale et quadrupôle
# TeX : J_2=\frac{C-A}{M a^2}\approx 1{,}0826\times 10^{-3}
dit: Le terme quadrupolaire relie, dans une approximation axisymétrique, les moments d’inertie terrestre au champ gravitationnel externe. Il caractérise la distribution des masses ; une valeur isolée ne suffit pas à distinguer toutes les géométries possibles.
symbole: J_2 | coefficient zonal quadrupolaire du champ gravitationnel terrestre | sans unité | ≈ 1,0826 × 10⁻³ ; dépend de la distribution des masses
symbole: C | moment principal d’inertie terrestre autour de son axe polaire | kilogramme mètre carré (kg·m²) | différent de la circonférence C utilisée dans les chapitres géométriques
symbole: A | moment principal d’inertie terrestre autour d’un axe équatorial | kilogramme mètre carré (kg·m²) | approximation axisymétrique : les deux moments équatoriaux sont égaux
symbole: M | masse totale de la Terre | kilogramme (kg) | normalise le coefficient quadrupolaire
symbole: a | rayon équatorial de référence terrestre | mètre (m) | WGS 84 : 6 378 137 m

## Bloc : Approfondissement — J_2 , précession nodale, pourquoi une orbite « sent » le bourrelet
# TeX : J_2 = 1{,}08262668\times10^{-3} \quad\text{(EGM2008 / WGS 84)}
dit: Le coefficient quadrupolaire dominant du champ terrestre est proche de 0,00108. Il renseigne sur la distribution non sphérique des masses et intervient dans le mouvement des satellites.
symbole: J_2 | coefficient zonal quadrupolaire du champ gravitationnel terrestre | sans unité | ≈ 1,0826 × 10⁻³ ; dépend de la distribution des masses

## Bloc : Approfondissement — J_2 , précession nodale, pourquoi une orbite « sent » le bourrelet #2
# TeX : \dot{\Omega} = -\frac{3}{2} n J_2 \left(\frac{R}{a}\right)^2 \cos i
dit: L’aplatissement gravitationnel fait précesser le plan orbital d’un satellite. Dans l’approximation de faible excentricité présentée ici, le taux dépend du demi-grand axe et du cosinus de l’inclinaison.
symbole: \dot{\Omega} | vitesse de précession de la longitude du nœud ascendant de l’orbite | radian par seconde (rad/s) | le signe négatif indique une régression pour une orbite prograde
symbole: n | moyen mouvement orbital du satellite | radian par seconde (rad/s) | n = √(GM/a³)
symbole: J_2 | coefficient zonal quadrupolaire du champ gravitationnel terrestre | sans unité | ≈ 1,0826 × 10⁻³ ; dépend de la distribution des masses
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs
symbole: a | demi-grand axe de l’orbite | mètre (m) | distance caractéristique mesurée depuis le centre du corps attracteur
symbole: i | inclinaison du plan orbital par rapport à l’équateur | radian (rad) | les exemples numériques sont souvent exprimés en degrés

## Bloc : Approfondissement — Hafele–Keating, calcul spécial + général, chiffres 1971
# TeX : \Delta\tau_{\mathrm{SR}} \approx -\frac{1}{2}\frac{v^2}{c^2}t
dit: Une horloge mobile accumule moins de temps propre qu’une horloge immobile dans le même référentiel inertiel, à faible vitesse. Pour comparer l’avion et le sol, il faut comparer leurs vitesses inertielles respectives, pas seulement la vitesse de l’avion par rapport au sol.
symbole: \Delta\tau_{\mathrm{SR}} | correction cinématique de temps propre par rapport au temps de référence inertiel | seconde (s) | approximation pour v très inférieur à la vitesse de la lumière
symbole: v | vitesse de l’horloge mobile dans le référentiel inertiel choisi | mètre par seconde (m/s) | pour comparer deux horloges, soustraire leurs deux corrections cinématiques
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, valeur exacte
symbole: t | durée du trajet dans le temps de référence | seconde (s) | employer les mêmes unités de temps pour les corrections

## Bloc : Approfondissement — Hafele–Keating, calcul spécial + général, chiffres 1971 #2
# TeX : \Delta\tau_{\mathrm{GR}} \approx \frac{gh}{c^2}t
dit: Une horloge située plus haut dans le champ terrestre accumule légèrement plus de temps propre. Cette approximation de champ faible utilise une hauteur petite devant le rayon et une pesanteur presque constante.
symbole: \Delta\tau_{\mathrm{GR}} | correction gravitationnelle de temps propre due à la hauteur | seconde (s) | approximation de champ faible avec hauteur petite devant le rayon terrestre
symbole: g | accélération gravitationnelle locale | mètre par seconde carrée (m/s²) | ≈ 9,8 m/s² à la surface terrestre
symbole: h | hauteur de l’œil ou de l’horloge au-dessus de la surface de référence | mètre (m) | petite devant le rayon terrestre
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, valeur exacte
symbole: t | durée du trajet dans le temps de référence | seconde (s) | employer les mêmes unités de temps pour les corrections

## Bloc : Temps d’aller-retour (vide)
# TeX : \tau=\frac{2\rho}{c}
dit: Le temps de vol aller-retour d’un laser est deux fois la distance divisée par la célérité de la lumière. Une mesure réelle doit corriger les retards atmosphériques et instrumentaux.
symbole: \tau | temps d’aller-retour du signal lumineux | seconde (s) | sans retard atmosphérique ni corrections instrumentales
symbole: \rho | distance entre la station laser et le satellite | mètre (m) | distance oblique ; égale à l’altitude seulement au zénith dans le modèle sphérique
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, valeur exacte

## Bloc : Approfondissement — LAGEOS, temps de vol, millimètres, frame-dragging
# TeX : \Delta t = \frac{2\rho}{c}\qquad \rho\approx a-R\approx 5\,900\,\mathrm{km}\qquad \Delta t \approx 39{,}4\,\mathrm{ms}
dit: Un satellite au zénith a une distance oblique proche de son altitude dans le modèle sphérique. Le temps de vol aller-retour correspondant est de quelques dizaines de millisecondes ; aux autres élévations, la distance augmente.
symbole: \Delta t | temps d’aller-retour de l’impulsion laser | seconde (s) | ≈ 39,4 ms pour 5 900 km au zénith
symbole: \rho | distance entre la station laser et le satellite | mètre (m) | distance oblique ; égale à l’altitude seulement au zénith dans le modèle sphérique
symbole: a | demi-grand axe de l’orbite | mètre (m) | distance caractéristique mesurée depuis le centre du corps attracteur
symbole: R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs
symbole: c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, valeur exacte

## Bloc : Rotation sidérale
# TeX : T_{\mathrm{sid}} = 86\,164{,}0905\,\mathrm{s} = 23^{\mathrm{h}}56^{\mathrm{m}}4{,}0905^{\mathrm{s}}
dit: La rotation terrestre mesurée par rapport aux étoiles dure environ 23 heures 56 minutes. Le jour solaire moyen est plus long parce que la Terre avance sur son orbite.
symbole: T_{\mathrm{sid}} | durée d’une rotation terrestre par rapport aux étoiles | seconde (s) | ≈ 86 164,0905 s

## Bloc : Pourquoi synodique > sidéral
# TeX : \frac{1}{T_{\mathrm{syn}}} = \frac{1}{T_{\mathrm{sid}}} - \frac{1}{T_{\oplus,\mathrm{sid}}}
dit: Les phases lunaires dépendent de l’orientation de la Lune par rapport au Soleil, qui évolue aussi au cours de l’année. La fréquence synodique est donc la différence des fréquences orbitales sidérales.
symbole: T_{\mathrm{syn}} | période synodique de la Lune, entre deux phases identiques | jour (j) | ≈ 29,5306 jours
symbole: T_{\mathrm{sid}} | période sidérale de révolution de la Lune autour de la Terre | jour (j) | ≈ 27,321661 jours ; ici ce symbole ne désigne pas la rotation terrestre
symbole: T_{\oplus,\mathrm{sid}} | période sidérale de révolution terrestre autour du Soleil | jour (j) | ≈ 365,25636 jours

## Bloc : Barycentre
# TeX : r_{\oplus} = a_{\mathrm{TL}} \frac{M_L}{M_{\oplus}+M_L}
dit: La Terre et la Lune tournent autour d’un centre de masse commun. Leur rapport de masse place ce barycentre à l’intérieur du volume terrestre, mais loin de son centre.
symbole: r_{\oplus} | distance du centre terrestre au barycentre Terre–Lune | mètre (m) | ≈ 4 671 km en moyenne
symbole: a_{\mathrm{TL}} | demi-grand axe de l’orbite relative Terre–Lune | mètre (m) | ≈ 384 399 km
symbole: M_L | masse de la Lune | kilogramme (kg) | ≈ 7,342 × 10²² kg
symbole: M_{\oplus} | masse de la Terre | kilogramme (kg) | environ 81,3 fois la masse lunaire

## Bloc : Conservation
# TeX : L \approx I_{\oplus}\Omega + \mu\sqrt{G(M_{\oplus}+M_L)a(1-e^2)}
dit: Dans un système Terre–Lune approximativement isolé, le moment cinétique total est conservé. Un transfert du spin terrestre vers l’orbite lunaire peut ralentir la rotation terrestre et augmenter le demi-grand axe lunaire.
symbole: L | moment cinétique total de rotation terrestre et d’orbite Terre–Lune dans ce modèle | kilogramme mètre carré par seconde (kg·m²/s) | approximation : néglige les couples externes et les petites contributions omises
symbole: I_{\oplus} | moment d’inertie de la Terre autour de son axe de rotation | kilogramme mètre carré (kg·m²) | relie la vitesse de rotation au moment cinétique terrestre
symbole: \Omega | vitesse angulaire de rotation terrestre | radian par seconde (rad/s) | ≈ 7,292115 × 10⁻⁵ rad/s, soit 15,041°/h
symbole: \mu | masse réduite du système Terre–Lune | kilogramme (kg) | M Terre × M Lune / (M Terre + M Lune)
symbole: G | constante de gravitation universelle | mètre cube par kilogramme par seconde carrée (m³/kg/s²) | ≈ 6,67430 × 10⁻¹¹ m³/kg/s²
symbole: M_{\oplus} | masse de la Terre | kilogramme (kg) | environ 81,3 fois la masse lunaire
symbole: M_L | masse de la Lune | kilogramme (kg) | ≈ 7,342 × 10²² kg
symbole: a | demi-grand axe de l’orbite | mètre (m) | distance caractéristique mesurée depuis le centre du corps attracteur
symbole: e | excentricité de l’orbite | sans unité | 0 pour un cercle ; entre 0 et 1 pour une ellipse

## Bloc : C. Éclipses et prévision — Saros, nœuds, ombre ronde
# TeX : 223 \times 29{,}530589 \approx 6585{,}32\,\mathrm{j} \approx 18^{\mathrm{a}}\,11^{\mathrm{j}}\,8^{\mathrm{h}}
dit: Le Saros rassemble approximativement 223 mois synodiques, soit un peu plus de 18 ans. Ce retour rapproche les configurations de phase, de nœud et de distance lunaires sans reproduire exactement le lieu d’observation.

symbole: 223 | nombre de mois synodiques compris approximativement dans un Saros | sans unité | ces mois sont des cycles de phases lunaires

## Bloc : Approfondissement — atelier supplémentaire : gravité vs densité
# TeX : \frac{\mathrm{d}P}{\mathrm{d}z} = -\rho g
dit: Une couche d’atmosphère au repos est soutenue par la diminution de pression avec l’altitude. La masse volumique détermine le poids de la couche sous l’action de la gravitation ; elle ne remplace pas cette force.
symbole: P | pression atmosphérique à l’altitude considérée | pascal (Pa) | diminue avec l’altitude dans une atmosphère au repos
symbole: z | coordonnée verticale orientée vers le haut | mètre (m) | le signe négatif exprime la diminution de pression avec l’altitude
symbole: \rho | masse volumique de l’atmosphère | kilogramme par mètre cube (kg/m³) | ne désigne pas une distance laser dans cette formule
symbole: g | accélération gravitationnelle locale | mètre par seconde carrée (m/s²) | ≈ 9,8 m/s² à la surface terrestre

## Texte
# contexte | tex | définition | unité | remarque
* | R | rayon terrestre du modèle sphérique | mètre (m) | ≈ 6 371 km ; employer une unité commune à toutes les longueurs
* | G | constante de gravitation universelle | mètre cube par kilogramme par seconde carrée (m³/kg/s²) | ≈ 6,67430 × 10⁻¹¹ m³/kg/s²
* | g | accélération gravitationnelle locale | mètre par seconde carrée (m/s²) | ≈ 9,8 m/s² à la surface terrestre
* | c | vitesse de la lumière dans le vide | mètre par seconde (m/s) | 299 792 458 m/s, valeur exacte
* | \Omega | vitesse angulaire de rotation terrestre | radian par seconde (rad/s) | ≈ 7,292115 × 10⁻⁵ rad/s, soit 15,041°/h
* | \varphi | latitude du lieu | radian (rad) | positive au nord, négative au sud ; une latitude en degrés doit être convertie pour les calculs
* | J_2 | coefficient zonal quadrupolaire du champ gravitationnel terrestre | sans unité | ≈ 1,0826 × 10⁻³ ; dépend de la distribution des masses
* | M_L | masse de la Lune | kilogramme (kg) | ≈ 7,342 × 10²² kg
* | M_{\oplus} | masse de la Terre | kilogramme (kg) | environ 81,3 fois la masse lunaire
intro | a | rayon équatorial terrestre WGS 84 | mètre (m) | 6 378 137 m
intro | C | circonférence équatoriale terrestre | mètre (m) | ≈ 40 075 km
intro | v | vitesse linéaire due à la rotation terrestre à la latitude considérée | mètre par seconde (m/s) | ≈ 465,1 m/s à l’équateur
histoire | \theta | fraction d’un tour correspondant à la différence d’angle zénithal | tour ou degré (°), selon l’écriture | 1/50 de tour = 7,2°
platisme | r | distance depuis le pôle Nord sur la projection azimutale équidistante | mètre (m) | une distance radiale projetée, pas un rayon physique terrestre
experiences | R' | rayon apparent de courbure dans le modèle de réfraction standard | mètre (m) | R / (1 − k), pour un gradient atmosphérique idéalement constant
experiences | k | coefficient de réfraction terrestre du modèle simplifié | sans unité | ≈ 0,13 ; varie avec les conditions atmosphériques
experiences | H | altitude d’observation au-dessus de la surface terrestre | mètre (m) | distincte de l’échelle de hauteur atmosphérique H
formules | r | distance au centre de la masse attractive | mètre (m) | potentiel central inversement proportionnel à cette distance
marees | M_\odot | masse du Soleil | kilogramme (kg) | ≈ 1,9885 × 10³⁰ kg
marees | r_L | distance centre Terre–centre Lune | mètre (m) | ≈ 3,844 × 10⁸ m
marees | r_\odot | distance centre Terre–centre Soleil | mètre (m) | ≈ 1,496 × 10¹¹ m
marees | a_\odot | accélération différentielle de marée solaire | mètre par seconde carrée (m/s²) | ≈ 5,0 × 10⁻⁷ m/s² dans ce modèle
marees | a_L | accélération différentielle de marée lunaire | mètre par seconde carrée (m/s²) | ≈ 1,1 × 10⁻⁶ m/s² dans ce modèle
j2 | a | demi-grand axe de l’orbite | mètre (m) | distance caractéristique mesurée depuis le centre du corps attracteur
j2 | C | moment principal d’inertie terrestre autour de l’axe polaire | kilogramme mètre carré (kg·m²) | distinct de la circonférence
j2 | g | accélération gravitationnelle locale | mètre par seconde carrée (m/s²) | ≈ 9,8 m/s² à la surface terrestre
lageos | i | inclinaison du plan orbital par rapport à l’équateur | radian (rad) | les exemples numériques sont souvent exprimés en degrés
mouv-terre | a | rayon équatorial terrestre | mètre (m) | ≈ 6 378 137 m
mouv-terre | a_{\oplus} | demi-grand axe de l’orbite terrestre autour du Soleil | unité astronomique (au) | ≈ 1 au
mouv-terre | e | excentricité de l’orbite terrestre | sans unité | ≈ 0,0167
mouv-terre | \Delta\varepsilon | amplitude de la nutation en obliquité | seconde d’arc (″) | ≈ 9,2″ pour le terme principal
mouv-lune | e | excentricité de l’orbite lunaire | sans unité | ≈ 0,0549
inter-tl | a | demi-grand axe de l’orbite relative Terre–Lune | mètre (m) | ≈ 384 399 km
inter-tl | \dot a | taux d’augmentation du demi-grand axe de l’orbite lunaire | millimètre par an (mm/an) | ≈ 38 mm/an
exp-ratees | \delta | déclinaison du Soleil par rapport à l’équateur céleste | degré (°) | ≈ +23,44° au solstice de juin
exp-ratees | \varepsilon | obliquité de l’axe terrestre par rapport à la normale au plan orbital | degré (°) | ≈ 23,44°
exp-ratees | E | équation du temps : temps solaire apparent moins temps solaire moyen | minute (min) | varie au cours de l’année
exp-ratees | e | excentricité de l’orbite terrestre | sans unité | ≈ 0,0167
exp-ratees | r_L | distance entre les centres terrestre et lunaire | mètre (m) | varie entre périgée et apogée
antox | a_c | accélération centripète liée à la rotation à l’équateur | mètre par seconde carrée (m/s²) | ≈ 0,0339 m/s²
antox | h | hauteur des yeux au-dessus de la surface | mètre (m) | sert au calcul de la distance d’horizon
ateliers | P_0 | pression à l’altitude de référence z = 0 | pascal (Pa) | condition initiale du profil barométrique
ateliers | H | échelle de hauteur atmosphérique isotherme | mètre (m) | ≈ 8,5 km dans l’exemple
ateliers | k | constante de Boltzmann | joule par kelvin (J/K) | 1,380649 × 10⁻²³ J/K, valeur exacte
ateliers | T | température absolue de l’atmosphère isotherme | kelvin (K) | supposée constante dans ce modèle
ateliers | m | masse moyenne d’une molécule de l’air | kilogramme (kg) | masse d’une particule, pas d’une colonne atmosphérique
ateliers | e | base du logarithme naturel | sans unité | ≈ 2,71828 ; ne désigne pas une excentricité
cta | r | distance entre le centre terrestre et le centre du perturbateur | mètre (m) | le gradient de marée diminue comme son inverse au cube
formules@a\approx 12\,271\,\mathrm{km} | a | demi-grand axe de l’orbite de LAGEOS | mètre (m) | ≈ 12 271 km ; ne désigne pas le rayon équatorial WGS 84
experiences@h=2\,\mathrm{m} | h | hauteur des yeux au-dessus de la surface | mètre (m) | sert au calcul de l’horizon
experiences@h | h | hauteur des yeux au-dessus de la surface | mètre (m) | sert au calcul de l’horizon

antox | d | distance géométrique définie par la formule de courbure ou d’horizon | mètre (m) | voir les précisions propres à chaque formule
exp-ratees | d | distance horizontale mesurée dans le plan tangent local | mètre (m) | petite devant le rayon terrestre
exp-ratees | h | écart vertical à la tangente locale | mètre (m) | ne représente pas directement la hauteur masquée
antox@d^2/2R | d | distance horizontale définissant l’écart à la tangente | mètre (m) | approximation locale ; ce n’est pas une hauteur masquée
antox@d=\sqrt{2Rh} | d | distance rectiligne de l’œil au point d’horizon | mètre (m) | approximation pour une faible hauteur d’œil
experiences@d | d | longueur de la corde entre les deux points considérés | mètre (m) | la sagitta correspond ici à l’écart de la corde à l’arc
experiences@d^2/8R | d | longueur de la corde sous l’arc considéré | mètre (m) | flèche au milieu de la corde ; différente de l’écart à une tangente
formules@d\ll R | d | distance horizontale dans le plan tangent local | mètre (m) | hypothèse de l’approximation de flèche
hafele | h | altitude de l’horloge mobile au-dessus de l’horloge de référence | mètre (m) | approximation de différence de potentiel gh
histoire@\theta | \theta | différence des angles zénithaux égale à l’angle au centre | degré (°) | 7,2° représente 1/50 de tour

# Formules des tableaux : corrections explicites d’héritage.
experiences@\theta=\Delta\varphi | \theta | différence d’angle zénithal entre les deux sites | degré (°) | sites sur le même méridien et rayons solaires parallèles
experiences@\theta=\Delta\varphi | \Delta\varphi | différence de latitude entre les deux sites | degré (°) | pas la latitude d’un lieu isolé
exp-ratees@\theta=\Delta\varphi | \theta | différence d’angle zénithal entre les deux sites | degré (°) | modèle sphérique sous rayons solaires parallèles
exp-ratees@\theta=\Delta\varphi | \Delta\varphi | différence de latitude entre les deux sites | degré (°) | pas une latitude unique
exp-ratees | T_p | période positive de précession du plan du pendule de Foucault | heure (h) | infinie à l’équateur ; le sens du mouvement change entre les hémisphères
experiences@d\approx\sqrt{2Rh} | d | distance rectiligne de l’œil au point de tangence de l’horizon | mètre (m) | approximation pour une hauteur faible devant le rayon terrestre
experiences@d\approx\sqrt{2Rh} | h | hauteur des yeux au-dessus de la surface | mètre (m) | ni sagitta ni hauteur masquée d’un objet
formules@h=\frac{d^2}{2R} | d | distance horizontale dans le plan tangent local | mètre (m) | approximation locale de l’écart à la tangente
formules@h=\frac{d^2}{2R} | h | écart vertical de la surface à la tangente locale | mètre (m) | ne donne pas directement une hauteur masquée
formules@a=\frac{2GMR}{r^3} | a | accélération différentielle radiale de marée | mètre par seconde carrée (m/s²) | premier ordre en rayon terrestre / distance ; ne désigne pas un demi-grand axe
formules@a=\frac{2GMR}{r^3} | M | masse du perturbateur, Lune ou Soleil | kilogramme (kg) | pas la masse terrestre dans cette formule
formules@a=\frac{2GMR}{r^3} | r | distance entre le centre terrestre et le centre du perturbateur | mètre (m) | très supérieure au rayon terrestre
formules@\dot{\Omega}=-\frac{3}{2}nJ_2\left(\frac{R}{a}\right)^2\cos i | a | demi-grand axe de l’orbite du satellite | mètre (m) | ne désigne ni un rayon terrestre ni une accélération
formules@\dot{\Omega}=-\frac{3}{2}nJ_2\left(\frac{R}{a}\right)^2\cos i | n | moyen mouvement orbital du satellite | radian par seconde (rad/s) | n = √(GM/a³)
formules@\dot{\Omega}=-\frac{3}{2}nJ_2\left(\frac{R}{a}\right)^2\cos i | i | inclinaison du plan orbital sur l’équateur | radian (rad) | approximation de faible excentricité
formules@\dot{\Omega}=-\frac{3}{2}nJ_2\left(\frac{R}{a}\right)^2\cos i | \dot{\Omega} | vitesse de précession de la longitude du nœud ascendant | radian par seconde (rad/s) | ne désigne pas la rotation terrestre Ω
formules@\Delta t=\frac{2\rho}{c} | \Delta t | temps d’aller-retour du signal laser | seconde (s) | sans retards atmosphériques ou instrumentaux
formules@\Delta t=\frac{2\rho}{c} | \rho | distance oblique entre la station laser et le satellite | mètre (m) | ne désigne pas une masse volumique
antox@\sqrt{2Rh} | h | hauteur des yeux au-dessus de la surface | mètre (m) | approximation de la distance d’horizon
