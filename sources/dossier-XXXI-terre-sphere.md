# Dossier XXXI — Terre sphérique : audit scientifique ciblé

Date de vérification : 30 septembre 2026.

## Portée et méthode

Lecture intégrale du texte scientifique et historique de `terre-sphere-eci-5.html`, après retrait des médias base64, scripts et styles. Audit ciblé des affirmations à risque et des calculs ci-dessous : **ce document ne certifie pas chaque phrase du dossier**. Les affirmations non listées (effectifs historiques, citations de presse, Qantas et horaires actuels, détails du documentaire, Highjump, coraux fossiles, toutes les vidéos et tous les paramètres géodésiques secondaires) ne sont pas validées par cet audit. Les éléments douteux doivent être retirés, sourcés spécifiquement ou présentés avec cette portée.

Sources institutionnelles recherchées puis ouvertes, calculs géométriques recomputés indépendamment, DOI contrôlés avec l’API Crossref. Les notices et résumés d’éditeur visibles par recherche ont été lus pour Science et Nature ; l’accès direct à certaines pages et aux articles complets est resté bloqué. L’histoire déclarée de la Flat Earth Society est une source primaire sur sa propre présentation, pas une preuve scientifique. Aucun long extrait n’est reproduit.

## Vérifications

### 1. « La Terre est un sphéroïde oblate […] plus finement un géoïde. »

- **Verdict** : ⚠️
- **Référence** : WGS 84 : a = 6 378 137 m ; 1/f = 298,257223563 ; b ≈ 6 356 752,314 m.
- **Ce qu’il faut nuancer ou corriger** : L’ellipsoïde est une surface géométrique de référence ; le géoïde est une équipotentielle du champ de pesanteur proche du niveau moyen des mers. Aucun des deux n’est la topographie exacte.
- **Graphie** : RAS
- **Sources** :
  1. [NGA — définition WGS 84](https://earth-info.nga.mil/index.php?action=wgs84&dir=wgs84)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Ellipsoïde et géoïde" · d: "WGS 84 : a = 6 378 137 m ; 1/f = 298,257223563 ; b ≈ 6 356 752,314 m." · v: warn · s: "L’ellipsoïde est une surface géométrique de référence ; le géoïde est une équipotentielle du champ de pesanteur proche du niveau moyen des mers. Aucun des deux n’est la topographie exacte."

### 2. « l’étoile Polaire perd un degré d’altitude tous les ~111 km »

- **Verdict** : ⚠️
- **Référence** : L’altitude du pôle céleste nord égale la latitude astronomique ; Polaris l’approche, sans le coïncider exactement.
- **Ce qu’il faut nuancer ou corriger** : Valable en première approximation sur un déplacement méridien dans l’hémisphère nord. Préciser l’écart de Polaris au pôle, l’heure sidérale et la réfraction, surtout près de l’horizon.
- **Graphie** : RAS
- **Sources** :
  1. [NASA — systèmes de référence](https://science.nasa.gov/learn/basics-of-space-flight/chapter2-1/)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Polaire et latitude" · d: "L’altitude du pôle céleste nord égale la latitude astronomique ; Polaris l’approche, sans le coïncider exactement." · v: warn · s: "Valable en première approximation sur un déplacement méridien dans l’hémisphère nord. Préciser l’écart de Polaris au pôle, l’heure sidérale et la réfraction, surtout près de l’horizon."

### 3. « v(φ)=465,1 cosφ »

- **Verdict** : ⚠️
- **Référence** : v ≈ 465,1 m/s à l’équateur ; accélération centripète ≈ 0,0339 m/s².
- **Ce qu’il faut nuancer ou corriger** : Approximation sphérique. Pour une latitude géodésique sur WGS 84, utiliser v = ω N(φ) cosφ, N = a / √(1−e² sin²φ). La vitesse seule ne produit pas une sensation de freinage.
- **Graphie** : RAS
- **Sources** :
  1. [NGA — définition WGS 84](https://earth-info.nga.mil/index.php?action=wgs84&dir=wgs84)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Rotation terrestre" · d: "v ≈ 465,1 m/s à l’équateur ; accélération centripète ≈ 0,0339 m/s²." · v: warn · s: "Approximation sphérique. Pour une latitude géodésique sur WGS 84, utiliser v = ω N(φ) cosφ, N = a / √(1−e² sin²φ). La vitesse seule ne produit pas une sensation de freinage."

### 4. « Sacrobosco, De sphaera […] Terre sphérique. »

- **Verdict** : ✅
- **Référence** : L’ouvrage médiéval enseigne une Terre sphérique ; exemplaire imprimé de 1490 conservé à la Library of Congress.
- **Ce qu’il faut nuancer ou corriger** : Ne pas généraliser à toutes les populations médiévales ni à toutes les traditions chinoises. La page institutionnelle suffit à réfuter un Moyen Âge savant uniformément platiste ; le rôle précis d’Irving nécessite une source dédiée.
- **Graphie** : RAS
- **Sources** :
  1. [Library of Congress — Sacrobosco et la Terre sphérique](https://www.loc.gov/exhibits/exploring-the-early-americas/documenting-new-knowledge.html)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "La sphère au Moyen Âge" · d: "L’ouvrage médiéval enseigne une Terre sphérique ; exemplaire imprimé de 1490 conservé à la Library of Congress." · v: ok · s: "Ne pas généraliser à toutes les populations médiévales ni à toutes les traditions chinoises. La page institutionnelle suffit à réfuter un Moyen Âge savant uniformément platiste ; le rôle précis d’Irving nécessite une source dédiée."

### 5. « 1/50 de cercle, 5 000 stades → 250/252 000 stades. »

- **Verdict** : ⚠️
- **Référence** : 5 000 × 360/7,2 = 250 000 stades ; avec le choix 157,5 m/stade : 39 375 km.
- **Ce qu’il faut nuancer ou corriger** : Le stade est historiquement incertain et les sites ne sont ni exactement sur le même méridien ni exactement au tropique. Présenter 157,5 m comme une hypothèse illustrative, sans attribuer une précision au pourcent universellement établie. Le récit est postérieur à Ératosthène.
- **Graphie** : RAS
- **Sources** :
  1. [NASA — ombres du solstice](https://science.nasa.gov/solar-system/skywatching/night-sky-network/tropical-solstice-shadows/)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Mesurer la circonférence" · d: "5 000 × 360/7,2 = 250 000 stades ; avec le choix 157,5 m/stade : 39 375 km." · v: warn · s: "Le stade est historiquement incertain et les sites ne sont ni exactement sur le même méridien ni exactement au tropique. Présenter 157,5 m comme une hypothèse illustrative, sans attribuer une précision au pourcent universellement établie. Le récit est postérieur à Ératosthène."

### 6. « Le modèle plat doit retuner la hauteur du Soleil à chaque couple de villes : il n’est pas prédictif. »

- **Verdict** : ❌
- **Référence** : Pour un Soleil à la verticale du premier site sur un plan, un couple peut être ajusté avec H = d / tanθ : 800 km / tan7,2° ≈ 6 333 km.
- **Ce qu’il faut nuancer ou corriger** : Deux ombres seules ne discriminent pas la forme sans hypothèse sur la distance solaire. Ajouter plusieurs lieux simultanés et un ajustement unique des paramètres, ou contraindre indépendamment la distance au Soleil. Cette correction est une déduction géométrique explicite, pas une citation NASA.
- **Graphie** : RAS
- **Sources** :
  1. [NASA — ombres du solstice](https://science.nasa.gov/solar-system/skywatching/night-sky-network/tropical-solstice-shadows/)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Limite du test à deux ombres" · d: "Pour un Soleil à la verticale du premier site sur un plan, un couple peut être ajusté avec H = d / tanθ : 800 km / tan7,2° ≈ 6 333 km." · v: warn · s: "Deux ombres seules ne discriminent pas la forme sans hypothèse sur la distance solaire. Ajouter plusieurs lieux simultanés et un ajustement unique des paramètres, ou contraindre indépendamment la distance au Soleil. Cette correction est une déduction géométrique explicite, pas une citation NASA."

### 7. « À Sydney […] k≈2,03. À −70° […] k≈4,3. »

- **Verdict** : ❌
- **Référence** : Pour AE polaire nord : k = (π/2−φ)/cosφ. k(0°)=1,5708 ; k(−33,9°)=2,6053 ; k(−70°)=8,1648.
- **Ce qu’il faut nuancer ou corriger** : Les deux valeurs source sont erronées. Ce facteur est local est–ouest sur un parallèle ; on ne le multiplie pas directement par une distance entre villes ou une durée de vol. Comparer les distances de leurs coordonnées projetées.
- **Graphie** : RAS
- **Sources** :
  1. [USGS — Map projections: A working manual](https://pubs.usgs.gov/publication/pp1395)
- **DOI** : 10.3133/pp1395 vérifié Crossref — Snyder, 1987, Map projections: A working manual
- **Fiche** : t: "Distorsion AE" · d: "Pour AE polaire nord : k = (π/2−φ)/cosφ. k(0°)=1,5708 ; k(−33,9°)=2,6053 ; k(−70°)=8,1648." · v: warn · s: "Les deux valeurs source sont erronées. Ce facteur est local est–ouest sur un parallèle ; on ne le multiplie pas directement par une distance entre villes ou une durée de vol. Comparer les distances de leurs coordonnées projetées."

### 8. « 1956 […] Samuel Shenton […] 2004 puis 2009 […] Daniel Shenton »

- **Verdict** : ⚠️
- **Référence** : Le site de l’association donne 1956, succession Johnson en 1971, reprise web en 2004, inscriptions réouvertes le 30 octobre 2009.
- **Ce qu’il faut nuancer ou corriger** : Source primaire de ce que l’association affirme sur son histoire, pas validation de ses doctrines. Pas de comptage externe audité des effectifs. La notice Liverpool GB 141 FES n’a pas été retrouvée dans une page de catalogue institutionnelle ouverte lors de cet audit ; ne pas écrire “archive vérifiée”.
- **Graphie** : RAS
- **Sources** :
  1. [Flat Earth Society — histoire déclarée par l’association](https://www.theflatearthsociety.org/home/index.php/about-the-society)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Chronologie de la société" · d: "Le site de l’association donne 1956, succession Johnson en 1971, reprise web en 2004, inscriptions réouvertes le 30 octobre 2009." · v: warn · s: "Source primaire de ce que l’association affirme sur son histoire, pas validation de ses doctrines. Pas de comptage externe audité des effectifs. La notice Liverpool GB 141 FES n’a pas été retrouvée dans une page de catalogue institutionnelle ouverte lors de cet audit ; ne pas écrire “archive vérifiée”."

### 9. « À 10 km […] 7,85 m de flèche. »

- **Verdict** : ⚠️
- **Référence** : Écart à la tangente au départ ≈ d²/(2R) = 7,848 m à 10 km. Flèche au milieu d’une corde de longueur 10 km ≈ d²/(8R) = 1,962 m.
- **Ce qu’il faut nuancer ou corriger** : Le dossier confond les deux géométries sous le mot sagitta. Dessiner la tangente et la corde, préciser si d est projection horizontale, arc ou corde. Une image d’horizon ne se mesure pas directement avec le drop tangent.
- **Graphie** : RAS
- **Sources** :
  1. [NGA — définition WGS 84](https://earth-info.nga.mil/index.php?action=wgs84&dir=wgs84)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Tangente et corde" · d: "Écart à la tangente au départ ≈ d²/(2R) = 7,848 m à 10 km. Flèche au milieu d’une corde de longueur 10 km ≈ d²/(8R) = 1,962 m." · v: warn · s: "Le dossier confond les deux géométries sous le mot sagitta. Dessiner la tangente et la corde, préciser si d est projection horizontale, arc ou corde. Une image d’horizon ne se mesure pas directement avec le drop tangent."

### 10. « Un navire à 12 km a déjà ~7 m de coque sous la tangente. »

- **Verdict** : ❌
- **Référence** : Œil à 2 m ; rayon 6 371 km ; horizon ≈ 5,048 km ; hauteur géométriquement cachée à 12 km ≈ 3,793 m.
- **Ce qu’il faut nuancer ou corriger** : Le chiffre source ignore le recul de l’horizon dû à la hauteur d’œil. Calcul exact sphérique : α = acos(R/(R+h)), β = d/R−α ; caché = max(0, R/cosβ−R), si β>0. Sans réfraction ni vagues.
- **Graphie** : RAS
- **Sources** :
  1. [NGA — définition WGS 84](https://earth-info.nga.mil/index.php?action=wgs84&dir=wgs84)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Hauteur cachée d’un navire" · d: "Œil à 2 m ; rayon 6 371 km ; horizon ≈ 5,048 km ; hauteur géométriquement cachée à 12 km ≈ 3,793 m." · v: warn · s: "Le chiffre source ignore le recul de l’horizon dû à la hauteur d’œil. Calcul exact sphérique : α = acos(R/(R+h)), β = d/R−α ; caché = max(0, R/cosβ−R), si β>0. Sans réfraction ni vagues."

### 11. « Coefficient k standard ~0,13 […] hors de la couche réfractive. »

- **Verdict** : ⚠️
- **Référence** : Un coefficient constant donne R_eff=R/(1−k), mais les gradients réels peuvent changer et produire des mirages.
- **Ce qu’il faut nuancer ou corriger** : k=0,13 est un exemple géodésique, pas une constante atmosphérique universelle. Des jalons élevés réduisent certains biais sans supprimer la réfraction. Rapporter météo, hauteurs, série de visées et incertitudes. Le témoignage Wallace documente le protocole de 1870.
- **Graphie** : RAS
- **Sources** :
  1. [Wallace — documents de l’expérience de Bedford (édition universitaire)](https://people.wku.edu/charles.smith/wallace/S252C.htm)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Réfraction et Bedford" · d: "Un coefficient constant donne R_eff=R/(1−k), mais les gradients réels peuvent changer et produire des mirages." · v: warn · s: "k=0,13 est un exemple géodésique, pas une constante atmosphérique universelle. Des jalons élevés réduisent certains biais sans supprimer la réfraction. Rapporter météo, hauteurs, série de visées et incertitudes. Le témoignage Wallace documente le protocole de 1870."

### 12. « a_tide ≈ 2GMR/r³ » […] « différence de gravité sur un diamètre »

- **Verdict** : ⚠️
- **Référence** : La formule donne la différence entre le centre et une extrémité sur l’axe du perturbateur, au premier ordre en R/r. Lune/Soleil ≈ 2,2.
- **Ce qu’il faut nuancer ou corriger** : La différence d’extrémité à extrémité vaut environ 4GMR/r³. Les deux bourrelets sont un modèle d’équilibre ; les marées observées dépendent aussi des bassins et de leur dynamique.
- **Graphie** : RAS
- **Sources** :
  1. [NASA NSSDCA — Moon Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html)
  2. [NOAA — analyse harmonique et prédictions](https://tidesandcurrents.noaa.gov/about_harmonic_constituents)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Gradient de marée" · d: "La formule donne la différence entre le centre et une extrémité sur l’axe du perturbateur, au premier ordre en R/r. Lune/Soleil ≈ 2,2." · v: warn · s: "La différence d’extrémité à extrémité vaut environ 4GMR/r³. Les deux bourrelets sont un modèle d’équilibre ; les marées observées dépendent aussi des bassins et de leur dynamique."

### 13. « 24 h 50 […] Observé dans tous les marégraphes »

- **Verdict** : ❌
- **Référence** : Le jour lunaire moyen est ≈24 h 50 ; la composante lunaire semi-diurne M₂ ≈12 h 25.
- **Ce qu’il faut nuancer ou corriger** : Il existe des régimes diurnes, semi-diurnes et mixtes. Les heures locales ne suivent pas toutes une périodicité unique ; conserver le modèle simplifié et signaler sa limite.
- **Graphie** : RAS
- **Sources** :
  1. [NOAA — types de cycles de marée](https://oceanservice.noaa.gov/education/tutorial_tides/tides07_cycles.html)
  2. [NOAA — analyse harmonique et prédictions](https://tidesandcurrents.noaa.gov/about_harmonic_constituents)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Des marées différentes" · d: "Le jour lunaire moyen est ≈24 h 50 ; la composante lunaire semi-diurne M₂ ≈12 h 25." · v: warn · s: "Il existe des régimes diurnes, semi-diurnes et mixtes. Les heures locales ne suivent pas toutes une périodicité unique ; conserver le modèle simplifié et signaler sa limite."

### 14. « Un plan plat n’a pas de J₂. »

- **Verdict** : ❌
- **Référence** : J₂ représente une composante quadrupolaire axiale du champ de gravité ; pour la Terre ≈1,0826×10⁻³.
- **Ce qu’il faut nuancer ou corriger** : Un disque massif possède lui aussi un quadrupôle, généralement très différent. La preuve repose sur l’amplitude mesurée, sa cohérence avec l’ellipsoïde et les autres harmoniques, pas sur une impossibilité mathématique. La conclusion sur le disque découle des moments d’inertie d’une distribution plate.
- **Graphie** : RAS
- **Sources** :
  1. [NASA GSFC — GDC Orbit Primer, p. 4](https://science.nasa.gov/wp-content/uploads/2023/05/GDC_OrbitPrimer.pdf)
  2. [NGA — définition WGS 84](https://earth-info.nga.mil/index.php?action=wgs84&dir=wgs84)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Ce que mesure J₂" · d: "J₂ représente une composante quadrupolaire axiale du champ de gravité ; pour la Terre ≈1,0826×10⁻³." · v: warn · s: "Un disque massif possède lui aussi un quadrupôle, généralement très différent. La preuve repose sur l’amplitude mesurée, sa cohérence avec l’ellipsoïde et les autres harmoniques, pas sur une impossibilité mathématique. La conclusion sur le disque découle des moments d’inertie d’une distribution plate."

### 15. « ISS […] Ω̇≈−5,0°/jour »

- **Verdict** : ✅
- **Référence** : Avec a=6 778 km, i=51,6°, e=0 et les constantes données : −5,0027°/jour.
- **Ce qu’il faut nuancer ou corriger** : Formule au premier ordre J₂, non un intégrateur orbital complet. La trace au sol se déplace aussi du fait de la rotation terrestre : ne pas attribuer toute sa dérive à J₂. À i=90°, ce terme nodal est nul.
- **Graphie** : RAS
- **Sources** :
  1. [NASA GSFC — GDC Orbit Primer, p. 4](https://science.nasa.gov/wp-content/uploads/2023/05/GDC_OrbitPrimer.pdf)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Précession des orbites" · d: "Avec a=6 778 km, i=51,6°, e=0 et les constantes données : −5,0027°/jour." · v: ok · s: "Formule au premier ordre J₂, non un intégrateur orbital complet. La trace au sol se déplace aussi du fait de la rotation terrestre : ne pas attribuer toute sa dérive à J₂. À i=90°, ce terme nodal est nul."

### 16. « Est −59 ±10 ns ; Ouest +273 ±7 ns. »

- **Verdict** : ✅
- **Référence** : Quatre horloges au césium, vols d’octobre 1971 ; article observations : Science 177, 168–170 (14 juillet 1972).
- **Ce qu’il faut nuancer ou corriger** : Séparer les deux articles : prédictions pages 166–168 et observations pages 168–170. La notice éditeur/Crossref confirme les chiffres observés ; accès intégral Science non obtenu lors de cet audit.
- **Graphie** : RAS
- **Sources** :
  1. [Hafele & Keating — Observed Relativistic Time Gains](https://doi.org/10.1126/science.177.4044.168)
  2. [Hafele & Keating — Predicted Relativistic Time Gains](https://doi.org/10.1126/science.177.4044.166)
- **DOI** : 10.1126/science.177.4044.166 et 10.1126/science.177.4044.168 vérifiés Crossref, titres, auteurs, volume et pages concordants
- **Fiche** : t: "Hafele–Keating" · d: "Quatre horloges au césium, vols d’octobre 1971 ; article observations : Science 177, 168–170 (14 juillet 1972)." · v: ok · s: "Séparer les deux articles : prédictions pages 166–168 et observations pages 168–170. La notice éditeur/Crossref confirme les chiffres observés ; accès intégral Science non obtenu lors de cet audit."

### 17. « Δτ_SR ≈ −v²t/(2c²) » pour comparaison avion–sol

- **Verdict** : ⚠️
- **Référence** : Au premier ordre : Δτ_avion−sol ≈ ∫[gh/c² − (v_avion²−v_sol²)/(2c²)]dt.
- **Ce qu’il faut nuancer ou corriger** : Les vitesses sont prises dans un même repère approximativement inertiel géocentrique. Une vitesse par rapport au sol seule ne suffit pas ; inclure latitude, altitude, durée et trajet. Le signe est/ouest indique la rotation, pas à lui seul la forme terrestre.
- **Graphie** : RAS
- **Sources** :
  1. [Hafele & Keating — Predicted Relativistic Time Gains](https://doi.org/10.1126/science.177.4044.166)
- **DOI** : 10.1126/science.177.4044.166 vérifié Crossref
- **Fiche** : t: "Comparer deux horloges" · d: "Au premier ordre : Δτ_avion−sol ≈ ∫[gh/c² − (v_avion²−v_sol²)/(2c²)]dt." · v: warn · s: "Les vitesses sont prises dans un même repère approximativement inertiel géocentrique. Une vitesse par rapport au sol seule ne suffit pas ; inclure latitude, altitude, durée et trajet. Le signe est/ouest indique la rotation, pas à lui seul la forme terrestre."

### 18. « LAGEOS […] boule de 60 cm […] 426 miroirs »

- **Verdict** : ✅
- **Référence** : LAGEOS-1 lancé le 4 mai 1976 ; sphère de 60 cm ; 426 réflecteurs en coin de cube, dont quatre en germanium.
- **Ce qu’il faut nuancer ou corriger** : Employer “rétroréflecteurs” plutôt que simples miroirs. Ne pas promettre la précision millimétrique pour chaque photon ou depuis toutes les stations depuis 1976 : les résultats modernes combinent observations et corrections.
- **Graphie** : RAS
- **Sources** :
  1. [ILRS — LAGEOS-1, -2](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/lag1_general.html)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "LAGEOS et le laser" · d: "LAGEOS-1 lancé le 4 mai 1976 ; sphère de 60 cm ; 426 réflecteurs en coin de cube, dont quatre en germanium." · v: ok · s: "Employer “rétroréflecteurs” plutôt que simples miroirs. Ne pas promettre la précision millimétrique pour chaque photon ou depuis toutes les stations depuis 1976 : les résultats modernes combinent observations et corrections."

### 19. « ρ≈12 230 km […] τ de l’ordre de 0,08 s »

- **Verdict** : ❌
- **Référence** : a≈12 271 km depuis le centre ; au zénith ρ≈a−R≈5 893 km ; aller-retour ≈39,313 ms.
- **Ce qu’il faut nuancer ou corriger** : La distance oblique varie selon l’élévation. 12 230 km n’est pas la distance a−R. 3 mm de distance équivalent mathématiquement à 20 ps aller-retour ; cette équivalence n’est pas une spécification universelle des horloges de station.
- **Graphie** : RAS
- **Sources** :
  1. [ILRS — LAGEOS-1, -2](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/lag1_general.html)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Temps de vol laser" · d: "a≈12 271 km depuis le centre ; au zénith ρ≈a−R≈5 893 km ; aller-retour ≈39,313 ms." · v: warn · s: "La distance oblique varie selon l’élévation. 12 230 km n’est pas la distance a−R. 3 mm de distance équivalent mathématiquement à 20 ps aller-retour ; cette équivalence n’est pas une spécification universelle des horloges de station."

### 20. « analyse d’orbite LAGEOS […] mesure du frame-dragging »

- **Verdict** : ⚠️
- **Référence** : Ciufolini & Pavlis (2004) publient 99 % du signal prédit et retiennent ±10 % comme incertitude totale prudente.
- **Ce qu’il faut nuancer ou corriger** : Test avancé dépendant des modèles de gravité et perturbations non gravitationnelles. Ne pas le présenter comme une mesure directe aussi simple que 2ρ/c, ni affirmer une précision finale actuelle sans audit dédié des publications récentes.
- **Graphie** : RAS
- **Sources** :
  1. [Ciufolini & Pavlis — effet Lense–Thirring](https://www.nature.com/articles/nature03007)
- **DOI** : 10.1038/nature03007 vérifié Crossref — Ciufolini & Pavlis, Nature 431, 958–960 (2004)
- **Fiche** : t: "Entraînement des référentiels" · d: "Ciufolini & Pavlis (2004) publient 99 % du signal prédit et retiennent ±10 % comme incertitude totale prudente." · v: warn · s: "Test avancé dépendant des modèles de gravité et perturbations non gravitationnelles. Ne pas le présenter comme une mesure directe aussi simple que 2ρ/c, ni affirmer une précision finale actuelle sans audit dédié des publications récentes."

### 21. « 27,321661 j […] 29,530589 j […] 38 mm/an »

- **Verdict** : ✅
- **Référence** : NASA : période sidérale 27,3217 j ; synodique ≈29,53 j ; recul moyen actuel 3,8 cm/an.
- **Ce qu’il faut nuancer ou corriger** : La distance moyenne de 384 400 km est une distance relative Terre–Lune, ne pas l’appeler rayon orbital de la Lune autour du barycentre. Le taux de recul n’est pas constant sur les temps géologiques.
- **Graphie** : RAS
- **Sources** :
  1. [NASA NSSDCA — Moon Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html)
  2. [NASA — Eclipses and the Saros](https://eclipse.gsfc.nasa.gov/SEsaros/SEsaros.html)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Périodes et recul lunaire" · d: "NASA : période sidérale 27,3217 j ; synodique ≈29,53 j ; recul moyen actuel 3,8 cm/an." · v: ok · s: "La distance moyenne de 384 400 km est une distance relative Terre–Lune, ne pas l’appeler rayon orbital de la Lune autour du barycentre. Le taux de recul n’est pas constant sur les temps géologiques."

### 22. « Saros : 223 mois synodiques = 242 mois draconitiques »

- **Verdict** : ⚠️
- **Référence** : 223 synodiques=6 585,3223 j ; 242 draconitiques=6 585,3575 j ; 239 anomalistiques=6 585,5375 j.
- **Ce qu’il faut nuancer ou corriger** : Employer ≈ entre les périodes. Le Saros n’est pas le cycle de 18,6 ans des nœuds. Les catalogues d’éclipses historiques ont une incertitude sur ΔT : ne pas promettre des positions/contacts à la seconde exacte sur tous les siècles.
- **Graphie** : RAS
- **Sources** :
  1. [NASA — Eclipses and the Saros](https://eclipse.gsfc.nasa.gov/SEsaros/SEsaros.html)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Saros et nœuds" · d: "223 synodiques=6 585,3223 j ; 242 draconitiques=6 585,3575 j ; 239 anomalistiques=6 585,5375 j." · v: warn · s: "Employer ≈ entre les périodes. Le Saros n’est pas le cycle de 18,6 ans des nœuds. Les catalogues d’éclipses historiques ont une incertitude sur ΔT : ne pas promettre des positions/contacts à la seconde exacte sur tous les siècles."

### 23. « Concordia […] Le Soleil y fait une nuit de 6 mois. »

- **Verdict** : ❌
- **Référence** : L’article ESA du 9 août 2013 décrit trois mois de nuit continue à Concordia ; environ six mois au pôle géographique, hors nuances de réfraction et crépuscule.
- **Ce qu’il faut nuancer ou corriger** : Séparer pôle Sud et base Concordia (Dôme C). La durée varie avec la latitude. Les indications ESA vulgarisées varient trois/quatre mois ; éviter une date précise sans éphéméride locale.
- **Graphie** : RAS
- **Sources** :
  1. [ESA — première matinée à Concordia](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Concordia/First_morning_at_Concordia)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Nuit polaire" · d: "L’article ESA du 9 août 2013 décrit trois mois de nuit continue à Concordia ; environ six mois au pôle géographique, hors nuances de réfraction et crépuscule." · v: warn · s: "Séparer pôle Sud et base Concordia (Dôme C). La durée varie avec la latitude. Les indications ESA vulgarisées varient trois/quatre mois ; éviter une date précise sans éphéméride locale."

### 24. « Le traité de 1959 n’interdit pas d’y aller. »

- **Verdict** : ✅
- **Référence** : Le secrétariat du traité documente des visites touristiques et leurs règles.
- **Ce qu’il faut nuancer ou corriger** : Accès encadré par les règles environnementales, autorisations nationales et contraintes logistiques. “Interdiction du continent” est faux ; “accès libre sans aucune règle” le serait aussi.
- **Graphie** : RAS
- **Sources** :
  1. [Secrétariat du traité sur l’Antarctique — tourisme](https://www.ats.aq/f/tourism.html)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Visiter l’Antarctique" · d: "Le secrétariat du traité documente des visites touristiques et leurs règles." · v: ok · s: "Accès encadré par les règles environnementales, autorisations nationales et contraintes logistiques. “Interdiction du continent” est faux ; “accès libre sans aucune règle” le serait aussi."

### 25. « Apollo 17 AS17-148-22727 […] 7 déc. 1972 »

- **Verdict** : ✅
- **Référence** : Photo sur caméra 70 mm par l’équipage Apollo 17, le 7 décembre 1972.
- **Ce qu’il faut nuancer ou corriger** : Conserver la distinction avec composites de surface et rendus calculés. Les images générées pour le dossier sont des illustrations, jamais des observations ou archives. Distance précise de 29 400 km non revalidée ici.
- **Graphie** : RAS
- **Sources** :
  1. [NASA — Blue Marble, AS17-148-22727](https://science.nasa.gov/resource/the-blue-marble/)
- **DOI** : DOI non trouvé — source institutionnelle
- **Fiche** : t: "Une photographie identifiée" · d: "Photo sur caméra 70 mm par l’équipage Apollo 17, le 7 décembre 1972." · v: ok · s: "Conserver la distinction avec composites de surface et rendus calculés. Les images générées pour le dossier sont des illustrations, jamais des observations ou archives. Distance précise de 29 400 km non revalidée ici."

### 26. « Sans Lune massive […] l’obliquité terrestre varie beaucoup plus »

- **Verdict** : ⚠️
- **Référence** : Laskar, Joutel & Robutel (1993) trouvent, dans leurs simulations, une zone chaotique bien plus large sans la Lune.
- **Ce qu’il faut nuancer ou corriger** : Résultat de modèle dépendant de conditions initiales, pas expérience réalisable ni garantie de tout scénario sans Lune. La Lune modifie la précession et les résonances ; “amortisseur” n’est qu’une analogie.
- **Graphie** : RAS
- **Sources** :
  1. [Laskar, Joutel & Robutel — Stabilization of the Earth’s obliquity by the Moon](https://www.nature.com/articles/361615a0)
- **DOI** : 10.1038/361615a0 vérifié Crossref — Nature 361, 615–617 (1993)
- **Fiche** : t: "Lune et stabilité de l’axe" · d: "Laskar, Joutel & Robutel (1993) trouvent, dans leurs simulations, une zone chaotique bien plus large sans la Lune." · v: warn · s: "Résultat de modèle dépendant de conditions initiales, pas expérience réalisable ni garantie de tout scénario sans Lune. La Lune modifie la précession et les résonances ; “amortisseur” n’est qu’une analogie."

## Synthèse

⚠️ 12, ✅ 7, ❌ 7. Aucun verdict 🔶 ne signifie que la forme terrestre est débattue : les incertitudes concernent les méthodes, les modèles fins ou l’histoire.

Corrections ❌ : entrées 6, 7, 10, 13, 14, 19, 23. Nuances pédagogiques : entrées ⚠️, surtout hypothèses des ombres, réfraction, marées réelles, comparaison des horloges et interprétation des tests avancés.

Graphies : rétroréflecteur / coin de cube ; UT1 (chiffre 1), et non UTI ; “normal points” ou points normaux, pas “normals points”. Les noms Hafele, Keating, Ciufolini, Pavlis, Laskar, Joutel et Robutel correspondent aux notices vérifiées.

### DOI vérifiés séparément

- https://doi.org/10.1126/science.177.4044.166 — Hafele & Keating, prédictions, Science 177, 166–168, 1972.
- https://doi.org/10.1126/science.177.4044.168 — Hafele & Keating, observations, Science 177, 168–170, 1972.
- https://doi.org/10.3133/pp1395 — Snyder, USGS Professional Paper 1395, 1987.
- https://doi.org/10.1038/nature03007 — Ciufolini & Pavlis, Nature 431, 958–960, 2004.
- https://doi.org/10.1038/361615a0 — Laskar, Joutel & Robutel, Nature 361, 615–617, 1993.
