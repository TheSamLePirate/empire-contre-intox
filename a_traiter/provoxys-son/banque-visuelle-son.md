# Le Son — banque visuelle, prompts et schémas

*Annexe de production du [script maître](script-live-son.md) · extraction intégrale et consolidation du 23 septembre 2026.*

Cette banque contient les **26 prompts originaux** de la section visuelle du HTML, ses **dix familles de références**, ses **quatre images déjà citées** et les fiches de ses **19 schémas SVG**, désormais indépendants. Elle est consultable sans le HTML. Les prompts sont des textes de préparation : aucune image générée n’est fournie ou présentée comme une photographie documentaire.

## Mode d’emploi et direction visuelle

Le moteur nommé dans le document source est **Imagine Grok** ; ce nom est conservé comme indication de production d’origine, sans imposer une génération ni garantir les caractéristiques actuelles du service. La direction d’origine est : photographie scientifique détaillée, demande de rendu « 8K », lumière de musée ou de laboratoire, absence de watermark et de texte décoratif. « 8K » décrit une intention dans le prompt, pas la résolution d’un fichier déjà produit.

**Pour produire une image :** copier le prompt source, lui appliquer sa **consigne de production** ci-dessous et le préambule suivant. Les prompts sont conservés mot pour mot pour ne perdre aucune idée ; les formulations visuellement trompeuses sont corrigées par la consigne qui fait autorité.

```text
Créer une illustration ou une reconstitution pédagogique, clairement distincte d’une photographie d’archive ou d’une donnée mesurée. Les fronts d’onde ajoutés sont des conventions graphiques. Respecter l’anatomie et les appareils à partir de références identifiées. Ne pas inventer de logo, de crédit institutionnel, de courbe présentée comme une mesure, ni d’inscription illisible. Prévoir une légende extérieure à l’image pour la nature de la représentation, le milieu et, si pertinent, le facteur de transposition audio. Privilégier une composition lisible en projection, sans texte intégré sauf exception explicitement demandée.
```

**Charte issue du HTML.** Fond nuit `#070b12`, panneaux `#0d1522` / `#121b2b`, traits `#1e2d45`, or `#d4b36a` / `#f0d9a0`, turquoise `#6fd4c7`, texte `#e8eef6`, secondaire `#9aa8bc`, alerte `#e08a6a`. Titres : Cormorant Garamond ; texte : Source Sans 3 ; commandes : JetBrains Mono. Les SVG autonomes utilisent une pile de polices système pour rester lisibles sans chargement externe. Ils embarquent les animations de tirets et de pulsation utiles, désactivables par la préférence système de réduction des animations. Leur version statique conserve l’information de lecture.

**Schémas consolidés.** Les SVG reprennent les sujets et la direction graphique du HTML, avec des corrections de fond : somme de sinusoïdes calculée, fronts Doppler orientés correctement, repères de longueur d’onde cohérents, décroissance de réverbération en dB et légendes sans débordement. Les fiches transcrivent la version corrigée affichée. Les animations de tirets ne représentent pas une vitesse de propagation mesurée.

Les légendes et les crédits se composent hors de l’image générée. Pour les photos, schémas institutionnels et extraits audio/vidéo, conserver la page du fichier choisi, son auteur et ses conditions de réutilisation. La mention Wikimedia ou NASA ne remplace pas cette fiche.

## Index des prompts

| Repère | Sujet | Chapitre du maître |
| --- | --- | --- |
| [P01](#p01) | ouverture live | [physique](script-live-son.md#physique) |
| [P02](#p02) | Pythagore / monocorde | [antiquite](script-live-son.md#antiquite) |
| [P03](#p03) | Boyle, cloche à vide | [xvii](script-live-son.md#xvii) |
| [P04](#p04) | Chladni | [xviii](script-live-son.md#xviii) |
| [P05](#p05) | tube de Rubens | [xviii](script-live-son.md#xviii) |
| [P06](#p06) | oreille interne | [oreille](script-live-son.md#oreille) |
| [P07](#p07) | Épidaure | [antiquite](script-live-son.md#antiquite) |
| [P08](#p08) | Voyager interstellaire | [espace](script-live-son.md#espace) |
| [P09](#p09) | Persée / trou noir | [espace](script-live-son.md#espace) |
| [P10](#p10) | chirp LIGO | [espace](script-live-son.md#espace) |
| [P11](#p11) | Sabine / salle | [archi](script-live-son.md#archi) |
| [P12](#p12) | bioacoustique | [bio](script-live-son.md#bio) |
| [P13](#p13) | Mersenne | [mersenne](script-live-son.md#mersenne) |
| [P14](#p14) | Langevin | [langevin](script-live-son.md#langevin) |
| [P15](#p15) | Gurnett | [gurnett](script-live-son.md#gurnett) |
| [P16](#p16) | battements | [battements](script-live-son.md#battements) |
| [P17](#p17) | infrason | [infrasons](script-live-son.md#infrasons) |
| [P18](#p18) | biosonar chauve-souris | [ultra-animaux](script-live-son.md#ultra-animaux) |
| [P19](#p19) | clic de cachalot | [ultra-animaux](script-live-son.md#ultra-animaux) |
| [P20](#p20) | Doppler source | [doppler](script-live-son.md#doppler) |
| [P21](#p21) | voix source-filtre | [bio-humaine](script-live-son.md#bio-humaine) |
| [P22](#p22) | modes p du Soleil | [astro-ultra](script-live-son.md#astro-ultra) |
| [P23](#p23) | type III Langmuir | [astro-ultra](script-live-son.md#astro-ultra) |
| [P24](#p24) | spectrogramme (chapitre numérique) | [numerique](script-live-son.md#numerique) |
| [P25](#p25) | tête artificielle et localisation | [psycho](script-live-son.md#psycho) |
| [P26](#p26) | 432 contre 440 (chapitre intox) | [intox](script-live-son.md#intox) |

## Références iconographiques à sélectionner

Les dix familles de la banque source sont conservées ci-dessous. Il s’agit de pistes de sélection ; elles ne constituent pas dix fichiers déjà obtenus ou vérifiés.

- Théâtre d’Épidaure — vues générales du koilon .
- Figures de Chladni historiques et plaques modernes.
- Portrait de Mersenne, Galilée, Chladni, Helmholtz, Rayleigh, Sabine, Langevin, Gurnett.
- Schéma d’oreille interne / organe de Corti.
- Spectrogramme d’un cri de baleine ; d’un chirp LIGO.
- NASA PIA17045 — Voyager interstellar plasma waves.
- Chandra — amas de Persée, ripples.
- Golden Record (couverture et sillons).
- Boston Symphony Hall, intérieur.
- Chambre anéchoïque (coins de mousse).

## Quatre images déjà référencées dans le script

Les liens et les crédits ci-dessous sont ceux du document source, sans téléchargement. Le crédit complet et la licence de chaque fichier doivent être confirmés sur sa page de description avant diffusion ; la légende historique seule ne suffit pas à certifier l’auteur d’une image.

### Photo 01 — Théâtre antique d'Épidaure

![Théâtre antique d'Épidaure](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/The_Ancient_Theatre_of_Epidaurus.jpg/1280px-The_Ancient_Theatre_of_Epidaurus.jpg)

Théâtre d’Épidaure (Péloponnèse). L’agencement périodique des gradins filtre une partie des graves du bruit de fond. Crédit : Wikimedia Commons.

### Photo 02 — Portrait d'Ernst Chladni

![Portrait d'Ernst Chladni](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ernst_Chladni.jpg/800px-Ernst_Chladni.jpg)

Ernst Florens Friedrich Chladni (1756–1827), souvent dit père de l’acoustique moderne. Wikimedia Commons.

### Photo 03 — Figures de Chladni

![Figures de Chladni](https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Chladni_plates.jpg/1280px-Chladni_plates.jpg)

Planche historique de figures de Chladni : le sable dessine les lignes nodales. Wikimedia Commons.

### Photo 04 — Grand rhinolophe en vol

![Grand rhinolophe en vol](https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Greater_horseshoe_bat_%28Rhinolophus_ferrumequinum%29_Hrdovicka.jpg/1280px-Greater_horseshoe_bat_%28Rhinolophus_ferrumequinum%29_Hrdovicka.jpg)

Grand rhinolophe ( Rhinolophus ferrumequinum ), le modèle du sonar à fréquence constante : porteuse ~83 kHz, compensation Doppler. Photo Charles J. Sharp, Wikimedia Commons, CC BY-SA 4.0 — licence différente de celle du site, à créditer à part.

## Les 26 prompts — texte source et consigne de production

<a id="p01"></a>
### P01 — ouverture live

[Chapitre du maître](script-live-son.md#physique).

**Prompt original conservé :**

```text
Photographie scientifique ultra-réaliste 8K, coupe transversale d’une onde sonore sphérique se propageant dans l’air d’une salle baroque abandonnée, fronts de compression visibles comme des peaux de verre concentriques légèrement réfractantes, poussière en suspension figée, lumière volumétrique ambrée provenant d’un oculus, rendu optique cinéma IMAX, netteté d’un objectif macro tilt-shift, aucun texte
```

**Consigne de production faisant autorité.** Employer « illustration de synthèse à rendu photographique ». Les fronts de pression ajoutés sont une convention graphique ; une onde sonore ordinaire n’est pas visible comme du verre dans l’air. Dire ce que la coupe représente.

<a id="p02"></a>
### P02 — Pythagore / monocorde

[Chapitre du maître](script-live-son.md#antiquite).

**Prompt original conservé :**

```text
Photographie de studio archéologique 8K, monocorde de bois patiné et corde de boyau tendue au-dessus d’une caisse de résonance, règle de proportions 2:1 3:2 4:3 gravée à peine dans le bois, lumière naturelle de fenêtre grecque, fond de pierre calcaire d’Épidaure flou, rendu Hasselblad, détails de fibre et de poussière, aucun texte
```

**Consigne de production faisant autorité.** Reconstitution pédagogique d’un monocorde, pas photographie d’un objet ayant appartenu à Pythagore. Les inscriptions 2:1, 3:2, 4:3 sont une exception intentionnelle à la consigne générale sans texte ; pour une meilleure précision, les ajouter en mise en page.

<a id="p03"></a>
### P03 — Boyle, cloche à vide

[Chapitre du maître](script-live-son.md#xvii).

**Prompt original conservé :**

```text
Photographie de laboratoire du XVIIᵉ siècle reconstruite en 8K ultra-réaliste, cloche de verre épais sous laquelle un petit réveil de laiton vibre en silence, pompe à air de Boyle en bois et cuivre au premier plan, condensation intérieure, lumière de chandelles et d’une fenêtre froide, grain de plaque humide, musée des sciences, aucun texte
```

**Consigne de production faisant autorité.** Reconstitution inspirée de Boyle : préférer une montre à sonnerie suspendue à un réveil moderne. Ne pas rendre la vibration visible par un flou prétendument mesuré ; l’atténuation s’explique dans la légende.

<a id="p04"></a>
### P04 — Chladni

[Chapitre du maître](script-live-son.md#xviii).

**Prompt original conservé :**

```text
Photographie macro 8K d’une plaque de laiton carrée recouverte de sable noir ultrafin formant une figure de Chladni parfaitement symétrique en croix étoilée, excitateur au centre hors cadre, éclairage zénithal dur de laboratoire, chaque grain net, fond noir profond, esthétique musée des sciences, aucun texte
```

**Consigne de production faisant autorité.** Image illustrative. Une symétrie décorative n’est pas une solution calculée d’une plaque ; pour expliquer un mode précis, utiliser une expérience documentée ou une simulation avec ses conditions aux limites.

<a id="p05"></a>
### P05 — tube de Rubens

[Chapitre du maître](script-live-son.md#xviii).

**Prompt original conservé :**

```text
Photographie cinéma 8K d’un tube de Rubens en acier brossé dans un labo sombre, rangée de flammes de gaz bleu et or dessinant une sinusoïde parfaite d’onde stationnaire, reflets sur le métal, fumée invisible, lumière uniquement produite par les flammes, ultra-détaillé, aucun texte
```

**Consigne de production faisant autorité.** Remplacer « sinusoïde parfaite » par « profil de flammes schématique évoquant une onde stationnaire ». La hauteur des flammes dépend aussi du débit et de la réponse des orifices ; elle n’est pas un tracé direct universel de la pression instantanée.

<a id="p06"></a>
### P06 — oreille interne

[Chapitre du maître](script-live-son.md#oreille).

**Prompt original conservé :**

```text
Illustration scientifique ultra-réaliste 8K type planche anatomique contemporaine, coupe de la cochlée humaine en limaçon avec membrane basilaire, organe de Corti et cellules ciliées visibles au microscope électronique colorisé avec sobriété, lumière de musée médical, fond sombre, précision de scan 3D médical, aucun texte
```

**Consigne de production faisant autorité.** Indiquer illustration anatomique et séparer coupe macroscopique de la cochlée et détail microscopique de l’organe de Corti. Une seule image 8K n’est pas un scan médical ni une microscopie réelle.

<a id="p07"></a>
### P07 — Épidaure

[Chapitre du maître](script-live-son.md#antiquite).

**Prompt original conservé :**

```text
Photographie grand-angle 8K au lever du soleil du théâtre d’Épidaure vu depuis le haut du koilon, calcaire rose doré, orchestra circulaire vide, air limpide du Péloponnèse, aucun touriste, rendu phase one, profondeur infinie, aucun texte
```

**Consigne de production faisant autorité.** Si générée : légender reconstitution d’ambiance ; pour commenter l’agencement réel des gradins, préférer une photographie documentaire identifiée et créditée.

<a id="p08"></a>
### P08 — Voyager interstellaire

[Chapitre du maître](script-live-son.md#espace).

**Prompt original conservé :**

```text
Image cinématographique 8K ultra-réaliste de la sonde Voyager 1 vue de trois-quarts dans le milieu interstellaire, antenne PWS déployée, faible lueur plasma bleu-vert autour des mâts, Soleil réduit à une étoile lointaine, fond de Voie lactée réel, esthétique photo NASA / IMAX, aucun texte
```

**Consigne de production faisant autorité.** La lueur plasma est une convention ajoutée : ce milieu ne serait pas ainsi visible à l’œil. Identifier les antennes PWS sur une référence de la sonde ; ne pas présenter cette image comme une photographie prise à côté de Voyager.

<a id="p09"></a>
### P09 — Persée / trou noir

[Chapitre du maître](script-live-son.md#espace).

**Prompt original conservé :**

```text
Visualisation scientifique ultra-réaliste 8K du gaz X de l’amas de Persée, ondulations de pression concentriques autour d’un noyau actif, palette Chandra bleu-violet-or, aspect de photographie de télescope spatial retravaillée pour un musée, aucun texte
```

**Consigne de production faisant autorité.** Indiquer illustration inspirée des données X de Chandra. Ne pas attribuer l’image générée à la NASA ni lui faire porter le crédit d’une observation réelle. Utiliser les données originales pour toute mesure.

<a id="p10"></a>
### P10 — chirp LIGO

[Chapitre du maître](script-live-son.md#espace).

**Prompt original conservé :**

```text
Image scientifique 8K, deux trous noirs stellaires en coalescence finale, distorsion d’espace visible en anneaux d’Einstein discrets, waveform de chirp gravitationnel matérialisée en anneaux d’ondulation dans le vide, esthétique simulation numerical relativity / film Interstellar sobre, aucun texte
```

**Consigne de production faisant autorité.** Les anneaux matérialisant une forme d’onde sont un symbole. Une onde gravitationnelle n’est pas une onde de pression dans le vide ; un rendu cinématographique n’est pas une simulation de relativité numérique validée.

<a id="p11"></a>
### P11 — Sabine / salle

[Chapitre du maître](script-live-son.md#archi).

**Prompt original conservé :**

```text
Photographie d’architecture 8K de l’intérieur du Boston Symphony Hall vide, balcons dorés, plafond à caissons, lumière de répétition chaude, une seule partition ouverte sur un pupitre, silence visible, rendu architectural phase one, aucun texte
```

**Consigne de production faisant autorité.** Comparer à une référence documentée de Boston Symphony Hall pour toute affirmation architecturale. Une image d’ambiance générée ne garantit pas l’exactitude des balcons, volumes ou matériaux.

<a id="p12"></a>
### P12 — bioacoustique

[Chapitre du maître](script-live-son.md#bio).

**Prompt original conservé :**

```text
Photographie sous-marine 8K d’une baleine à bosse dont le chant est suggéré par de très faibles ondes de pression dans le plancton lumineux, eau indigo du canal SOFAR, réalisme National Geographic, aucun texte
```

**Consigne de production faisant autorité.** La baleine à bosse peut chanter sans que des fronts lumineux apparaissent. Les ondes sont un ajout explicatif ; ne pas identifier la profondeur du canal SOFAR à partir de la couleur de l’eau.

<a id="p13"></a>
### P13 — Mersenne

[Chapitre du maître](script-live-son.md#mersenne).

**Prompt original conservé :**

```text
Peinture historique ultra-détaillée 8K d’une cellule de minime parisien vers 1636, Marin Mersenne en robe noire penche une oreille vers un monocorde de bois long de plusieurs coudées, papiers de l’Harmonie universelle ouverts, lumière de fenêtre sur Place Royale, rendu Rembrandt réaliste musée, aucun texte
```

**Consigne de production faisant autorité.** Reconstitution historique, non portrait d’après nature. Ne pas demander au modèle de reproduire des pages lisibles de l’Harmonie universelle ; si nécessaires, employer des fac-similés sourcés séparément.

<a id="p14"></a>
### P14 — Langevin

[Chapitre du maître](script-live-son.md#langevin).

**Prompt original conservé :**

```text
Photographie de reconstruction historique 8K, laboratoire de 1917, Paul Langevin ajuste un transducteur de quartz entre deux électrodes face à un bassin d’eau sombre, câbles de cuivre, tableau noir avec d = c Δt / 2, lumière froide d’atelier de guerre, réalisme musée des arts et métiers, aucun texte
```

**Consigne de production faisant autorité.** Langevin au quartz en 1917 ; éviter une attribution du quartz au duo de 1915. L’équation au tableau contredit « aucun texte » : la composer proprement après génération, ou retirer le tableau écrit.

<a id="p15"></a>
### P15 — Gurnett

[Chapitre du maître](script-live-son.md#gurnett).

**Prompt original conservé :**

```text
Photographie documentaire 8K d’une salle de contrôle Iowa / JPL, oscilloscope et haut-parleur branchés sur une courbe de plasma Voyager, spectrogramme 300 Hz vers 2 kHz visible sur un écran CRT, lumière de salle technique, grain photo NASA 2013, aucun texte
```

**Consigne de production faisant autorité.** Reconstitution de salle technique, pas archive NASA 2013. Gurnett et le contexte doivent être correctement légendés ; 300–400 Hz puis 2–3 kHz sont des repères du récit, pas un spectrogramme que le modèle peut certifier.

<a id="p16"></a>
### P16 — battements

[Chapitre du maître](script-live-son.md#battements).

**Prompt original conservé :**

```text
Visualisation scientifique ultra-réaliste 8K, deux sinusoïdes or et turquoise se superposant sur un oscilloscope analogique, enveloppe de battement dessinée en pointillés blancs, labo sombre, reflet sur le verre du tube cathodique, aucun texte
```

**Consigne de production faisant autorité.** Pour une enveloppe mathématiquement exacte, utiliser V06 ou l’atelier S14. L’image d’oscilloscope est une illustration ; étiquettes et courbes quantitatives doivent être tracées ou vérifiées séparément.

<a id="p17"></a>
### P17 — infrason

[Chapitre du maître](script-live-son.md#infrasons).

**Prompt original conservé :**

```text
Image scientifique 8K, coupe de l’atmosphère terrestre de nuit de l’échelle humaine jusqu’à la stratosphère, une seule onde de pression immense de longueur d’onde de trois cents mètres représentée comme un voile à peine lumineux, réseau de microbaromètres au sol comme des points, esthétique NASA Earth Observatory, aucun texte
```

**Consigne de production faisant autorité.** Préciser 1 Hz, air à 20 °C, λ ≈ 343 m. Une coupe allant jusqu’à la stratosphère exige une rupture d’échelle pour rendre un humain visible ; aucun front n’est photographiquement lumineux.

<a id="p18"></a>
### P18 — biosonar chauve-souris

[Chapitre du maître](script-live-son.md#ultra-animaux).

**Prompt original conservé :**

```text
Photographie scientifique ultra-réaliste 8K, grand rhinolophe en vol nocturne, fer à cheval du nez visible, cônes d’émission ultrasonore suggérés par de très fins fronts de pression bleutés devant la tête, mite en contre-jour, forêt européenne de nuit, lumière de lune uniquement, National Geographic, aucun texte
```

**Consigne de production faisant autorité.** Grand rhinolophe : émission nasale et faisceau schématique. Les fronts bleus sont ajoutés ; la photographie générée n’est ni une mesure du diagramme d’émission ni un enregistrement du cri.

<a id="p19"></a>
### P19 — clic de cachalot

[Chapitre du maître](script-live-son.md#ultra-animaux).

**Prompt original conservé :**

```text
Photographie sous-marine 8K d’un cachalot de face, melon et spermaceti lisibles sous la peau, unique faisceau de clic représenté comme un cône étroit dans l’eau noire ponctuée de plancton, esthétique BBC Blue Planet réaliste, aucun texte
```

**Consigne de production faisant autorité.** Le système nasal du cachalot ne se confond pas avec le melon d’un dauphin. Remplacer « melon et spermaceti lisibles sous la peau » par « tête de cachalot, organes internes indiqués seulement dans une coupe séparée ». Le cône lumineux reste une convention.

<a id="p20"></a>
### P20 — Doppler source

[Chapitre du maître](script-live-son.md#doppler).

**Prompt original conservé :**

```text
Schéma scientifique ultra-réaliste 8K devenu image de studio, sirène de locomotive du XIXe en mouvement, cercles d’onde compressés à l’avant et élargis à l’arrière, lumière de gare Buys Ballot, rendu gravure colorisée musée, aucun texte
```

**Consigne de production faisant autorité.** Remplacer « sirène de locomotive » par « source sonore fixée à un véhicule ferroviaire » si l’on veut illustrer le Doppler générique. Pour Buys Ballot, la démonstration historique utilisait des cornistes. Les fronts partent des positions successives de la source.

<a id="p21"></a>
### P21 — voix source-filtre

[Chapitre du maître](script-live-son.md#bio-humaine).

**Prompt original conservé :**

```text
Coupe sagittale ultra-réaliste 8K d’un conduit vocal humain en phonation, plis vocaux et cavités pharyngée buccale visibles, lumière de planche anatomique contemporaine, fond sombre musée médical, aucun texte
```

**Consigne de production faisant autorité.** Illustration anatomique, sans faire croire à une coupe photographique pendant la phonation. Séparer source glottique et cavités résonantes, puis ajouter F1/F2 et f0 en mise en page si nécessaire.

<a id="p22"></a>
### P22 — modes p du Soleil

[Chapitre du maître](script-live-son.md#astro-ultra).

**Prompt original conservé :**

```text
Visualisation scientifique 8K du Soleil en coupe, modes acoustiques p représentés comme des fronts de pression discrets entre cœur et photosphère, palette SDO/HMI sobre, aucun texte dans l’image, rendu agence spatiale
```

**Consigne de production faisant autorité.** Modes p : oscillations de pression globales représentées, pas rayons lumineux photographiés. Les nœuds et ventres dépendent du mode choisi ; ne pas faire passer un motif décoratif pour une inversion héliosismique.

<a id="p23"></a>
### P23 — type III Langmuir

[Chapitre du maître](script-live-son.md#astro-ultra).

**Prompt original conservé :**

```text
Image scientifique 8K, faisceau d’électrons quittant une éruption solaire, paquets d’ondes de Langmuir en stries le long du vent solaire, conversion en radio type III suggérée par un front électromagnétique distinct, esthétique sonde HELIOS / Solar Orbiter, aucun texte
```

**Consigne de production faisant autorité.** Distinguer clairement faisceau d’électrons, oscillations électrostatiques de Langmuir et onde radio électromagnétique. La dérive en fréquence se montre mieux avec V19 et un spectre dynamique documenté.

<a id="p24"></a>
### P24 — spectrogramme (chapitre numérique)

[Chapitre du maître](script-live-son.md#numerique).

**Prompt original conservé :**

```text
Photographie 8K d’un écran d’oscilloscope-analyseur dans un laboratoire de Bell Labs vers 1950, spectrogramme d’une voix humaine gravé en traînées ambrées sur fond noir, formants visibles comme des bandes horizontales, papier thermique du sonagraphe Kay en premier plan, lumière de lampe d’architecte, grain argentique, aucun texte lisible
```

**Consigne de production faisant autorité.** Le sonagraphe Kay est commercialisé en 1951 : pour une reconstitution le montrant, dater la scène du début des années 1950. Un spectrogramme peut être imprimé sur papier, sans prétendre qu’un écran CRT précis faisait partie de cet instrument historique.

<a id="p25"></a>
### P25 — tête artificielle et localisation

[Chapitre du maître](script-live-son.md#psycho).

**Prompt original conservé :**

```text
Photographie de studio 8K d’une tête artificielle de mesure acoustique en résine mate, pavillons d’oreille détaillés avec microphones dans les conduits, chambre anéchoïque à coins de mousse en arrière-plan, deux fronts d’onde très fins suggérés arrivant avec un léger décalage sur chaque oreille, lumière froide de laboratoire, aucun texte
```

**Consigne de production faisant autorité.** La différence de temps est une représentation schématique, pas une onde visible. Pour des valeurs ITD/HRTF quantitatives, utiliser les données et les commandes de S39 ; ne pas mesurer les délais sur l’image.

<a id="p26"></a>
### P26 — 432 contre 440 (chapitre intox)

[Chapitre du maître](script-live-son.md#intox).

**Prompt original conservé :**

```text
Photographie macro 8K de deux diapasons d’acier posés sur une table de luthier, l’un gravé d’un discret 440, l’autre d’un 432, un oscilloscope analogique flou derrière montrant une enveloppe de battement, lumière chaude d’atelier, poussière de bois en suspension, esthétique documentaire sobre, aucun texte lisible autre que les deux nombres
```

**Consigne de production faisant autorité.** Les nombres 440 et 432 sont les deux seules inscriptions autorisées. Un battement à 8 Hz apparaît si les deux signaux sont superposés simultanément, pas si l’on écoute les diapasons successivement. La mesure ne prouve aucun effet thérapeutique.

## Atlas des 19 schémas autonomes

> **État au 23 septembre 2026** : ces 19 SVG sont jugés de qualité insuffisante et ne seront pas publiés tels quels. Dix-sept sont remplacés par des ateliers interactifs, deux (V07, V08) sont refaits au build. Décision par schéma : `09-schemas-decisions.md`. Ils restent des supports de plateau provisoires.

Chaque fichier est intégré au chapitre correspondant du script maître. Les SVG contiennent leurs couleurs, leur description accessible et les animations CSS utilisées, sans dépendre d’une page HTML. Les labels ont été harmonisés lorsque le dessin source entretenait une confusion (diffraction/transmission, interprétation archéoacoustique, femtohertz de Persée, statut de la sonification). Les diagrammes sont pédagogiques ; leurs courbes ne sont pas des données étalonnées.

| Repère | Schéma | Chapitre |
| --- | --- | --- |
| [V01](#v01) | [Onde longitudinale — pression représentée schématiquement](assets/schemas-son/v01-onde-longitudinale.svg) | [physique](script-live-son.md#physique) |
| [V02](#v02) | [Schéma 2 — Spectre : infra · audible · ultra](assets/schemas-son/v02-spectre-acoustique.svg) | [physique](script-live-son.md#physique) |
| [V03](#v03) | [Schéma 3 — Modes d’une corde fixée aux deux bouts](assets/schemas-son/v03-modes-corde.svg) | [maths](script-live-son.md#maths) |
| [V04](#v04) | [Schéma — la règle de λ](assets/schemas-son/v04-longueur-onde-obstacles.svg) | [phenomenes](script-live-son.md#phenomenes) |
| [V05](#v05) | [Schéma — grotte comme instrument](assets/schemas-son/v05-grotte-resonance.svg) | [prehistoire](script-live-son.md#prehistoire) |
| [V06](#v06) | [Schéma calculé — deux sinus → enveloppe de battement](assets/schemas-son/v06-battements.svg) | [battements](script-live-son.md#battements) |
| [V07](#v07) | [Schéma 4 — De la pression au percept](assets/schemas-son/v07-pression-percept.svg) | [psycho](script-live-son.md#psycho) |
| [V08](#v08) | [Schéma — la trace](assets/schemas-son/v08-trace-sonore.svg) | [enregistrement](script-live-son.md#enregistrement) |
| [V09](#v09) | [Schéma 5 — Écho pulsé (Langevin → sonar → échographe)](assets/schemas-son/v09-echo-pulse.svg) | [langevin](script-live-son.md#langevin) |
| [V10](#v10) | [Schéma — chaîne d’un échographe](assets/schemas-son/v10-echographe.svg) | [ultrasons](script-live-son.md#ultrasons) |
| [V11](#v11) | [Schéma — source en mouvement : λ se comprime vers l’avant](assets/schemas-son/v11-doppler.svg) | [doppler](script-live-son.md#doppler) |
| [V12](#v12) | [Schéma 7 — Chaîne de l’audition](assets/schemas-son/v12-audition.svg) | [oreille](script-live-son.md#oreille) |
| [V13](#v13) | [Schéma — source / filtre](assets/schemas-son/v13-voix-source-filtre.svg) | [bio-humaine](script-live-son.md#bio-humaine) |
| [V14](#v14) | [Schéma — réverbération](assets/schemas-son/v14-reverberation.svg) | [archi](script-live-son.md#archi) |
| [V15](#v15) | [Schéma animé — une seule λ à 1 Hz dans l’air](assets/schemas-son/v15-infrason-echelle.svg) | [infrasons](script-live-son.md#infrasons) |
| [V16](#v16) | [Schéma animé — pulse / écho / buzz (même dessin que Langevin)](assets/schemas-son/v16-biosonar.svg) | [ultra-animaux](script-live-son.md#ultra-animaux) |
| [V17](#v17) | [Schéma 6 — Ce que Gurnett n’écoute pas / ce qu’il écoute](assets/schemas-son/v17-gurnett-plasma.svg) | [gurnett](script-live-son.md#gurnett) |
| [V18](#v18) | [Infographie — trois familles, un seul mot « son »](assets/schemas-son/v18-familles-espace.svg) | [astro-ultra](script-live-son.md#astro-ultra) |
| [V19](#v19) | [Schéma — type III (Ginzburg → Gurnett → LOFAR)](assets/schemas-son/v19-type-iii-langmuir.svg) | [astro-ultra](script-live-son.md#astro-ultra) |

<a id="v01"></a>
### V01 — Onde longitudinale — pression représentée schématiquement

**Décision (23 septembre 2026) : remplacé par l’atelier S01** — L’atelier montre la même rangée de particules, mais calculée, avec λ mesurable et le son joué. Voir `09-schemas-decisions.md`.

![Onde longitudinale — pression représentée schématiquement](assets/schemas-son/v01-onde-longitudinale.svg)

[SVG autonome](assets/schemas-son/v01-onde-longitudinale.svg) · [Retour au chapitre](script-live-son.md#physique).

**Lecture.** La courbe représente la pression en fonction de la position à un instant donné, pas une trajectoire des molécules. Deux maxima de compression sont séparés par λ ; les déplacements moléculaires sont longitudinaux. Le mouvement des tirets est décoratif, sans vitesse étalonnée.

**Transcription des indications visibles :**

- Onde longitudinale — pression représentée schématiquement
- compression
- raréfaction
- compression
- λ
- Les molécules oscillent le long de la propagation. L’onde avance, la matière fait du sur-place.

**Légende de plateau conservée.** À projeter dès l’ouverture. Dire : « ce n’est pas le vent, c’est une information de pression. »

<a id="v02"></a>
### V02 — Schéma 2 — Spectre : infra · audible · ultra

**Décision (23 septembre 2026) : remplacé par l’atelier S56** — Nouvel atelier « La règle des fréquences » : axe logarithmique 0,01 Hz → 1 GHz, bandes infra / audible / ultra, repères animaux, instruments et machines au survol. Voir `09-schemas-decisions.md`.

![Schéma 2 — Spectre : infra · audible · ultra](assets/schemas-son/v02-spectre-acoustique.svg)

[SVG autonome](assets/schemas-son/v02-spectre-acoustique.svg) · [Retour au chapitre](script-live-son.md#physique).

**Lecture.** Les frontières sont des repères pour une jeune oreille humaine, pas des murs biologiques. Les bandes très élevées relèvent d’autres transducteurs et de conditions de propagation spécifiques.

**Transcription des indications visibles :**

- Schéma 2 — Spectre : infra · audible · ultra
- infrasons
- audible humain
- ultrasons
- 0,01 Hz
- 20 Hz
- 20 kHz
- MHz–GHz
- séisme · éléphant
- téléphone ~300–3400 Hz · sensibilité max ~2–5 kHz
- chauve-souris · sonar · écho

**Légende de plateau conservée.** Les frontières 20 Hz / 20 kHz sont statistiques, pas des murs. Enfants, chiens, rats, dauphins n’ont pas le même rectangle.

<a id="v03"></a>
### V03 — Schéma 3 — Modes d’une corde fixée aux deux bouts

**Décision (23 septembre 2026) : remplacé par l’atelier S04** — La corde calculée affiche ses modes en barres et en profils ; les trois dessins fixes deviennent trois états de l’atelier. Voir `09-schemas-decisions.md`.

![Schéma 3 — Modes d’une corde fixée aux deux bouts](assets/schemas-son/v03-modes-corde.svg)

[SVG autonome](assets/schemas-son/v03-modes-corde.svg) · [Retour au chapitre](script-live-son.md#maths).

**Lecture.** Nœuds de déplacement aux extrémités ; n = 1, 2, 3 donnent fondamentale, octave et douzième. La corde est idéale ; sa raideur peut déplacer les partiels.

**Transcription des indications visibles :**

- Schéma 3 — Modes d’une corde fixée aux deux bouts
- n=1
- n=2
- n=3

**Légende de plateau conservée.** Nœuds aux extrémités. $n=2$ est l’octave. $n=3$ la douzième (octave + quinte). C’est déjà toute la série harmonique.

<a id="v04"></a>
### V04 — Schéma — la règle de λ

**Décision (23 septembre 2026) : remplacé par l’atelier S09** — Préset « obstacle contre λ » du bac à ondes : le même mur avec une source à 100 Hz, 1 kHz, 4 kHz. Voir `09-schemas-decisions.md`.

![Schéma — la règle de λ](assets/schemas-son/v04-longueur-onde-obstacles.svg)

[SVG autonome](assets/schemas-son/v04-longueur-onde-obstacles.svg) · [Retour au chapitre](script-live-son.md#phenomenes).

**Lecture.** Lire les trois rapports de taille ; ne pas confondre diffraction autour de l’obstacle et transmission à travers une paroi. Le matériau et les conditions aux limites comptent aussi.

**Transcription des indications visibles :**

- Schéma — la règle de λ
- obstacle ≫ λ
- réflexion nette, ombre, écho (aigus, mur)
- obstacle ≈ λ
- diffraction forte, filtrage (gradins, pavillon)
- obstacle ≪ λ
- diffraction marquée (graves, infra)
- 1 kHz : λ = 34 cm. 100 Hz : 3,4 m. 40 kHz : 8,6 mm. Contournement ≠ transmission dans le mur : matériau et montage comptent.

<a id="v05"></a>
### V05 — Schéma — grotte comme instrument

**Décision (23 septembre 2026) : remplacé par l’atelier S09** — Préset « grotte » du bac à ondes : galerie irrégulière, source vocale, sonde sur la paroi peinte. Voir `09-schemas-decisions.md`.

![Schéma — grotte comme instrument](assets/schemas-son/v05-grotte-resonance.svg)

[SVG autonome](assets/schemas-son/v05-grotte-resonance.svg) · [Retour au chapitre](script-live-son.md#prehistoire).

**Lecture.** Schéma d’une hypothèse archéoacoustique, sans reconstitution certaine d’un rite. Une association spatiale ne prouve pas l’intention des peintres ni une règle valable pour toutes les grottes.

**Transcription des indications visibles :**

- Schéma — grotte comme instrument
- galerie sourde
- paroi peinte + résonance
- Archéoacoustique : tester les associations décor / résonance

<a id="v06"></a>
### V06 — Schéma calculé — deux sinus → enveloppe de battement

**Décision (23 septembre 2026) : remplacé par l’atelier S14** — L’atelier des battements trace la somme réelle, compte les pouls et fait entendre. Voir `09-schemas-decisions.md`.

![Schéma calculé — deux sinus → enveloppe de battement](assets/schemas-son/v06-battements.svg)

[SVG autonome](assets/schemas-son/v06-battements.svg) · [Retour au chapitre](script-live-son.md#battements).

**Lecture.** Courbes calculées sur 0,2 seconde : cos(2π·200t), cos(2π·210t), puis leur somme. Les pointillés orange délimitent l’enveloppe ±2|cos(π·10t)| ; les maxima d’amplitude reviennent toutes les 0,1 seconde. Le graphique n’émet aucun son ; S14 décrit la démonstration audio.

**Transcription des indications visibles :**

- Schéma calculé — deux sinus → enveloppe de battement
- fa = 200 Hz
- fb = 210 Hz
- Somme calculée ; enveloppe ±2|cos(π Δf t)| : 10 maxima par seconde.
- 0 s
- 0,1 s
- 0,2 s

**Légende de plateau corrigée.** Ce tracé est un calcul, pas une mesure enregistrée. Sur le plateau, comparer la somme de deux générateurs à l’oscilloscope ; ne pas confondre la vitesse d’une animation et la fréquence du signal.

<a id="v07"></a>
### V07 — Schéma 4 — De la pression au percept

**Décision (23 septembre 2026) : à refaire** en SVG codex généré au build — Schéma de chaîne (pression → cochlée → bandes critiques → hauteur · sonie · timbre) généré au build en SVG codex : Cinzel / Fraunces, jetons de couleur, flèches or, texte mesuré ; aucun atelier ne le remplace. Voir `09-schemas-decisions.md`.

![Schéma 4 — De la pression au percept](assets/schemas-son/v07-pression-percept.svg)

[SVG autonome](assets/schemas-son/v07-pression-percept.svg) · [Retour au chapitre](script-live-son.md#psycho).

**Lecture.** Le trajet est une simplification pédagogique : les filtres cochléaires et le traitement neural contribuent ensemble au percept ; aucune flèche ne signifie une transformation indépendante du niveau ou du contexte.

**Transcription des indications visibles :**

- Schéma 4 — De la pression au percept
- pression p(t)
- →
- cochlée
- →
- bandes critiques
- →
- hauteur · sonie · timbre
- Fletcher–Munson : la sonie dépend de la fréquence. Helmholtz : rugosité entre partiels voisins. Terhardt / Parncutt : modèles de fondamentale virtuelle ; la consonance ne se réduit pas à la rugosité.

**Légende de plateau conservée.** Quatre mots à ne plus confondre : fréquence (Hz), hauteur (mel / bark / note), intensité (W/m²), sonie (sone).

<a id="v08"></a>
### V08 — Schéma — la trace

**Décision (23 septembre 2026) : à refaire** en SVG codex généré au build — Schéma de chaîne (pression → sillon / champ / bit → copie → droit + mémoire) généré au build, même gabarit que V07. Voir `09-schemas-decisions.md`.

![Schéma — la trace](assets/schemas-son/v08-trace-sonore.svg)

[SVG autonome](assets/schemas-son/v08-trace-sonore.svg) · [Retour au chapitre](script-live-son.md#enregistrement).

**Lecture.** La flèche relie plusieurs techniques, pas une seule machine. La copie et la mémoire conduisent à la question des droits, déjà présente avant le phonographe.

**Transcription des indications visibles :**

- Schéma — la trace
- pression
- →
- sillon / champ / bit
- →
- copie
- →
- droit + mémoire

<a id="v09"></a>
### V09 — Schéma 5 — Écho pulsé (Langevin → sonar → échographe)

**Décision (23 septembre 2026) : remplacé par l’atelier S16** — Le sonar à impulsion rejoue l’aller-retour avec Δt lu à l’écran. Voir `09-schemas-decisions.md`.

![Schéma 5 — Écho pulsé (Langevin → sonar → échographe)](assets/schemas-son/v09-echo-pulse.svg)

[SVG autonome](assets/schemas-son/v09-echo-pulse.svg) · [Retour au chapitre](script-live-son.md#langevin).

**Lecture.** Δt est le temps total aller-retour ; un trajet vaut Δt/2 si la cible et le milieu sont immobiles. La profondeur est cΔt/2.

**Transcription des indications visibles :**

- Schéma 5 — Écho pulsé (Langevin → sonar → échographe)
- quartz
- cible
- émission Δt/2
- retour Δt/2 — la forme de l’écho encode la cible

**Légende de plateau conservée.** Même dessin pour un sous-marin, un iceberg, un foie, un fœtus. Seuls changent $f$, la puissance et l’éthique.

<a id="v10"></a>
### V10 — Schéma — chaîne d’un échographe

**Décision (23 septembre 2026) : remplacé par l’atelier S51** — L’échographe simulé remplace la chaîne PZT → gel → tissu → écho. Voir `09-schemas-decisions.md`.

![Schéma — chaîne d’un échographe](assets/schemas-son/v10-echographe.svg)

[SVG autonome](assets/schemas-son/v10-echographe.svg) · [Retour au chapitre](script-live-son.md#ultrasons).

**Lecture.** R désigne ici un coefficient en amplitude à incidence normale. Le gel évite surtout une lame d’air. Une image B représente les échos traités ; elle ne lit pas directement une impédance absolue en chaque pixel.

**Transcription des indications visibles :**

- Schéma — chaîne d’un échographe
- PZT
- →
- gel
- →
- tissu c≈1540 m/s
- →
- écho Z
- →
- coupe B + Doppler
- Lame d’air : réflexion presque totale. Profondeur calculée avec c = 1540 m/s.

<a id="v11"></a>
### V11 — Schéma — source en mouvement : λ se comprime vers l’avant

**Décision (23 septembre 2026) : remplacé par l’atelier S13** — Les fronts nés là où la source était sont dessinés par l’atelier Doppler, en mouvement. Voir `09-schemas-decisions.md`.

![Schéma — source en mouvement : λ se comprime vers l’avant](assets/schemas-son/v11-doppler.svg)

[SVG autonome](assets/schemas-son/v11-doppler.svg) · [Retour au chapitre](script-live-son.md#doppler).

**Lecture.** Chaque cercle part de l’ancienne position de la source. Comparer les espacements devant et derrière ; le déplacement de l’observateur modifie le nombre de fronts reçus sans modifier ces espacements.

**Transcription des indications visibles :**

- Schéma — source en mouvement : λ se comprime vers l’avant
- vs
- λ plus grande
- λ plus petite → f plus haute
- Fronts émis à intervalles égaux ; centres aux anciennes positions. Source vers la droite, milieu immobile.

**Légende de plateau conservée.** Animation mentale : chaque cercle naît là où la sirène était. Vers l’avant les cercles s’empilent. C’est tout le mécanisme.

<a id="v12"></a>
### V12 — Schéma 7 — Chaîne de l’audition

**Décision (23 septembre 2026) : remplacé par l’atelier S43** — L’atelier « La cochlée » est élargi à toute la chaîne : coupe de l’oreille avec survol de chaque organe, puis cochlée déroulée. Voir `09-schemas-decisions.md`.

![Schéma 7 — Chaîne de l’audition](assets/schemas-son/v12-audition.svg)

[SVG autonome](assets/schemas-son/v12-audition.svg) · [Retour au chapitre](script-live-son.md#oreille).

**Lecture.** L’oreille moyenne améliore la transmission entre air et liquide ; la cochlée comprend un mécanisme actif. Le trajet neural réel comporte plusieurs relais avant le cortex.

**Transcription des indications visibles :**

- Schéma 7 — Chaîne de l’audition
- pavillon
- →
- tympan
- →
- osselets
- →
- cochlée
- →
- nerf VIII
- →
- cortex
- Impédance air → liquide. Tonotopie : base = aigus, apex = graves. Cellules ciliées externes = ampli actif (Kemp 1978).

<a id="v13"></a>
### V13 — Schéma — source / filtre

**Décision (23 septembre 2026) : remplacé par l’atelier S41** — La source-filtre est l’atelier lui-même. Voir `09-schemas-decisions.md`.

![Schéma — source / filtre](assets/schemas-son/v13-voix-source-filtre.svg)

[SVG autonome](assets/schemas-son/v13-voix-source-filtre.svg) · [Retour au chapitre](script-live-son.md#bio-humaine).

**Lecture.** À conduit maintenu fixe, déplacer f0 change la hauteur ; déplacer F1/F2 change la voyelle. Dans la voix réelle, les deux systèmes peuvent interagir, surtout dans certains registres chantés.

**Transcription des indications visibles :**

- Schéma — source / filtre
- glotte f0 + harmoniques
- →
- conduit (F1 F2 F3)
- →
- voyelle rayonnée
- On peut changer f0 sans changer F1–F2 (mélodie) et F1–F2 sans changer f0 (articulation).

<a id="v14"></a>
### V14 — Schéma — réverbération

**Décision (23 septembre 2026) : remplacé par l’atelier S23** — La décroissance de réverbération est mesurée (clap) ou calculée (Sabine, S24), plus dessinée. Voir `09-schemas-decisions.md`.

![Schéma — réverbération](assets/schemas-son/v14-reverberation.svg)

[SVG autonome](assets/schemas-son/v14-reverberation.svg) · [Retour au chapitre](script-live-son.md#archi).

**Lecture.** T60 est le temps d’une décroissance de niveau de 60 dB. Il dépend de la bande de fréquence ; la loi de Sabine suppose un champ suffisamment diffus et une absorption modérée.

**Transcription des indications visibles :**

- Schéma — réverbération
- Décroissance idéale après arrêt de la source : −60 dB en T60. Mesurer séparément les bandes de fréquence.
- 0 dB
- −60 dB
- T60
- temps
- Niveau relatif (dB)

<a id="v15"></a>
### V15 — Schéma animé — une seule λ à 1 Hz dans l’air

**Décision (23 septembre 2026) : remplacé par l’atelier S49** — L’échelle de l’infrason est l’atelier lui-même. Voir `09-schemas-decisions.md`.

![Schéma animé — une seule λ à 1 Hz dans l’air](assets/schemas-son/v15-infrason-echelle.svg)

[SVG autonome](assets/schemas-son/v15-infrason-echelle.svg) · [Retour au chapitre](script-live-son.md#infrasons).

**Lecture.** À 1 Hz et 343 m/s, λ = 343 m. La courbe montre un cycle spatial de pression ; l’amplitude verticale est arbitraire. Le repère humain de 1,8 m fait environ 4,3 pixels pour 820 pixels de longueur d’onde. Ce n’est ni la taille d’une source ni une corde accordée ; le mouvement des tirets n’est pas étalonné.

**Transcription des indications visibles :**

- Schéma animé — une seule λ à 1 Hz dans l’air
- λ ≈ 343 m à 1 Hz
- humain 1,8 m (repère minuscule)
- 343 m sur l’axe horizontal ; amplitude de pression agrandie pour la lecture. Aucun infrason émis.

**Légende de plateau conservée.** Le trait orange n’est pas un infrason « vu ». C’est la géométrie. Pour « voir » un 1 Hz, il faut un réseau de microbaromètres, pas une oreille.

<a id="v16"></a>
### V16 — Schéma animé — pulse / écho / buzz (même dessin que Langevin)

**Décision (23 septembre 2026) : remplacé par l’atelier S46** — Pulse / écho / buzz sont produits par l’atelier chauve-souris. Voir `09-schemas-decisions.md`.

![Schéma animé — pulse / écho / buzz (même dessin que Langevin)](assets/schemas-son/v16-biosonar.svg)

[SVG autonome](assets/schemas-son/v16-biosonar.svg) · [Retour au chapitre](script-live-son.md#ultra-animaux).

**Lecture.** Distinguer fréquence du cri et cadence des émissions. Le buzz terminal augmente la cadence, pas nécessairement la fréquence porteuse. Les signaux écoutés sont transposés avec un facteur explicite.

**Transcription des indications visibles :**

- Schéma animé — pulse / écho / buzz (même dessin que Langevin)
- bat
- proie
- search → approach → terminal buzz (Griffin, Webster, Michael 1960)
- Air : λ millimétrique, portée courte. Eau : même f, portée de chasse au calmar.

**Légende de plateau conservée.** Le buzz terminal n’est pas de l’excitation : c’est une montée du taux de clics quand $\Delta t$ devient minuscule. Dauphin : même trois phases.

<a id="v17"></a>
### V17 — Schéma 6 — Ce que Gurnett n’écoute pas / ce qu’il écoute

**Décision (23 septembre 2026) : remplacé par l’atelier S54** — Le contraste « pas un micro / une antenne à plasma » est le premier écran de l’atelier des trois familles. Voir `09-schemas-decisions.md`.

![Schéma 6 — Ce que Gurnett n’écoute pas / ce qu’il écoute](assets/schemas-son/v17-gurnett-plasma.svg)

[SVG autonome](assets/schemas-son/v17-gurnett-plasma.svg) · [Retour au chapitre](script-live-son.md#gurnett).

**Lecture.** Voyager mesure des champs électriques associés à des ondes de plasma avec des antennes, pas la pression d’air avec un microphone. La bande audio du signal permet sa conversion en son de haut-parleur.

**Transcription des indications visibles :**

- Schéma 6 — Ce que Gurnett n’écoute pas / ce qu’il écoute
- Pas un micro
- pas d’onde de pression 20 Hz–20 kHz
- gaz trop raréfié pour un microphone usuel
- Une antenne à plasma
- ondes d’électrons déjà en audio
- haut-parleur = oscilloscope d’oreille

**Légende de plateau conservée.** Répéter ce schéma chaque fois qu’un commentaire parle des « sons de l’espace » sans complément.

<a id="v18"></a>
### V18 — Infographie — trois familles, un seul mot « son »

**Décision (23 septembre 2026) : remplacé par l’atelier S54** — Les trois familles sont l’atelier lui-même. Voir `09-schemas-decisions.md`.

![Infographie — trois familles, un seul mot « son »](assets/schemas-son/v18-familles-espace.svg)

[SVG autonome](assets/schemas-son/v18-familles-espace.svg) · [Retour au chapitre](script-live-son.md#astro-ultra).

**Lecture.** A et B décrivent la physique des exemples ; C décrit une opération de mise en audio. Persée relève de A puis de C ; LIGO mesure une onde gravitationnelle, autre physique, que l’on peut aussi rendre audible.

**Transcription des indications visibles :**

- Infographie — trois familles, un seul mot « son »
- A. Acoustique de fluide
- Soleil, étoiles, amas,
- plasma baryons-photons
- mHz (Soleil) ; fHz (Persée)
- B. Plasma / Langmuir
- fpe, type III, Voyager
- pas une pression d’air
- kHz → MHz = « ultra » chiffré
- C. Sonification
- Persée : +57 / +58 octaves
- LIGO chirp, images NASA
- opération de mise en audio de données de diverses physiques

**Légende de plateau conservée.** Le chapitre 15c (chauve-souris) est de la famille A dans l’air. Le chapitre 8c (échographe) aussi, dans le tissu. Ici A est dans l’étoile ou l’univers primordial. B est Gurnett généralisé. C est un studio.

<a id="v19"></a>
### V19 — Schéma — type III (Ginzburg → Gurnett → LOFAR)

**Décision (23 septembre 2026) : remplacé par l’atelier S54** — Objet « type III » de l’atelier : spectre dynamique qui dérive vers le bas avec f_pe. Voir `09-schemas-decisions.md`.

![Schéma — type III (Ginzburg → Gurnett → LOFAR)](assets/schemas-son/v19-type-iii-langmuir.svg)

[SVG autonome](assets/schemas-son/v19-type-iii-langmuir.svg) · [Retour au chapitre](script-live-son.md#astro-ultra).

**Lecture.** La dérive d’un sursaut de type III renseigne sur le faisceau et le plasma traversé. Les oscillations de Langmuir ne sont pas elles-mêmes l’onde radio qui atteint une antenne distante.

**Transcription des indications visibles :**

- Schéma — type III (Ginzburg → Gurnett → LOFAR)
- faisceau e⁻
- →
- Langmuir fpe
- →
- conversion
- →
- radio type III (dérive f↓)
- Plus le faisceau s’éloigne, plus ne baisse, plus fpe baisse : le sifflement descend. C’est un diagnostic de densité, pas une sirène dans le vide.

## Préparation d’un support de live

- **Schéma mesurable** : utiliser un SVG contrôlé, des données ou un atelier calculé ; noter axes, unités, échelle et conditions.
- **Image d’ambiance** : appliquer la consigne du prompt et légender illustration/reconstitution ; elle installe une scène sans prouver un fait.
- **Photographie documentaire** : retrouver la page source et ses crédits ; une ressemblance produite par génération ne remplace pas l’objet documenté.
- **Audio** : les liens documentaires et les consignes d’écoute sont dans [Expériences et visuels](script-live-son.md#experiences). Dire s’il s’agit d’un enregistrement, d’une simulation ou d’une sonification, et annoncer le facteur de transposition.
- **Texte et sources** : les affirmations suivent le [script maître](script-live-son.md), qui prime sur le vocabulaire évocateur des anciens prompts.
