# L'Odyssée des Machines — soixante-dix ans d'yeux et de voyageuses

**Dossier VI (proposé) · Exploration spatiale — Empire contre Intox**

Un fil unique du premier bip de Sputnik (4 octobre 1957) jusqu'aux rotors de Dragonfly sur Titan : satellites qui veillent, sondes qui s'exilent, télescopes qui scrutent. Chaque masse, chaque date, chaque matériau, chaque instrument — mesuré, vérifié, sourcé.

> « En 1957, l'humanité ne possédait pas un seul objet hors de l'atmosphère. En 2026, elle en compte des dizaines de milliers — et deux d'entre eux, lancés il y a près d'un demi-siècle, murmurent encore depuis l'espace entre les étoiles. »

**Repères :**
- **Le premier** — Sputnik 1 : une sphère de 58 cm, 83,6 kg, un « bip-bip » qui réveille le monde.
- **La voyageuse** — Voyager 1 : objet humain le plus lointain, à ~172 UA, dans l'espace interstellaire.
- **Le plus grand œil** — l'ELT de l'ESO : un miroir de **39 mètres** en 798 éclats de verre.
- **La plus dense** — Starlink : la plus grande constellation de l'histoire, des milliers de satellites en orbite basse.
- **L'ambition suspendue** — Mars Sample Return : le rêve d'un caillou martien sur Terre, mis en pause faute de milliards.

---

> ## Ce document — pour les rédacteurs
>
> **Script total v2 (fiches densifiées au maximum).** Réécriture **détaillée, style Provoxys**
> du `script_total_v1.md` : narration immersive **+** fiches techniques ultra-granulaires
> (constructeur, parties pièce par pièce, matériaux, chaque instrument développé, défis
> technologiques, données). Toujours **zéro doublon** ; écarts chiffrés réconciliés (⚠️).
> v1 reste la version courte de référence.
>
> **Conventions.** *Légende en italique* = visuel / **modèle 3D Sketchfab** (voir
> `apercu-modeles-3d.html`) · 📋 **Fiche technique** (sous-rubriques : *Identité · Masse &
> structure · Énergie & propulsion · Parties & fonctions · Matériaux · Instruments · Défis ·
> Données* · 📍 **Où aujourd'hui ?** = localisation / fin de vie / orbite / distance, mi-2026) · `> **Explication —**` = encadré grand public · **Repère ·** = mini-explicateur
> chiffré · **Anti-intox ·** = idée reçue corrigée · *Le fait marquant —* = le clou de l'engin.
>
> **Statut :** brouillon à vérifier intégralement avant publication (Dossier V). Dates futures
> et compteurs volatils portent un marqueur de prudence. **Anti-hallucination :** les fiches
> peu documentées (satellites de service) restent volontairement sobres — aucun chiffre inventé.

---

## Fil conducteur — Trois familles, une seule quête

Tout ce qui vole au-dessus de nos têtes appartient à l'une de quatre familles. Les confondre, c'est s'interdire de comprendre l'aventure spatiale. Ce dossier les distingue d'emblée, puis les déroule, chronologie après chronologie.

- **Comprendre** — Ce qui sépare un **satellite** (qui reste), une **sonde** (qui s'exile), un **télescope spatial** (qui voit sans atmosphère) et un **télescope au sol** (qui voit grand, mais à travers l'air).
- **Suivre** — La grande chaîne 1957 → 2026 → 2030+, des premiers ballons-radio aux miroirs de 39 mètres.
- **Détailler** — Pour chaque engin : qui l'a bâti, en quels matériaux, avec quels instruments, pour quelle moisson de données.
- **Vérifier** — Chaque chiffre recoupé, chaque idée reçue désamorcée — c'est la marque de l'Empire contre Intox.

> **Explication — satellite, sonde, télescope : qui fait quoi ?**
>
> Un **satellite** tourne en rond. Il reste prisonnier de la gravité d'un corps — presque
> toujours la Terre — et y accomplit une mission **continue ou répétée** : téléphoner,
> guider, photographier, surveiller. On peut parfois le réparer ou le remplacer.
>
> Une **sonde**, elle, fait ses adieux. Elle s'arrache à l'attraction terrestre pour un
> voyage vers une autre planète, une comète, ou le vide entre les étoiles. Autonomie
> totale, radiations dures, ordres reçus à des **heures-lumière** de distance via le
> **Deep Space Network**, et, le plus souvent, **aucun retour**. On la décline en *flyby*
> (survol), *orbiter*, *lander* (atterrisseur), *rover* (véhicule) ou *sample return*
> (retour d'échantillons).
>
> Un **télescope** regarde loin. **Dans l'espace** (Hubble, Webb), il jouit d'une vision
> parfaite, sans le voile de l'air — mais son miroir est limité par la coiffe de la fusée.
> **Au sol**, il s'offre des miroirs colossaux et se laisse entretenir et agrandir — au
> prix d'une atmosphère turbulente, qu'il corrige en temps réel par **optique adaptative**.

> **Anti-intox · un satellite ne « flotte » pas, il tombe.**
> On imagine volontiers les satellites « suspendus » dans le vide. Faux : un satellite
> **tombe en permanence** vers la Terre — mais il file si vite de côté (~7,8 km/s en orbite
> basse) que le sol se dérobe sous lui à la même cadence qu'il chute. Cette chute libre
> éternelle, c'est l'**orbite**. L'apesanteur à bord de la Station spatiale n'a rien à voir
> avec une absence de gravité (elle vaut encore ~90 % de celle au sol) : tout y tombe
> ensemble, station et occupants. Voilà pourquoi on flotte.

### Objectifs pédagogiques — du bip de Sputnik aux biosignatures de Titan

- **L'ingénierie** — Matériaux, sources d'énergie (chimique, solaire, **nucléaire/RTG**), propulsion, télécommunications : ce qui permet à une machine de survivre là où l'humain ne peut pas.
- **Les familles** — Orbites (LEO, MEO, GEO), types de sondes, télescopes spatiaux et terrestres : une taxonomie pour ne plus jamais confondre.
- **Les premières** — Premier satellite, première évasion, première face cachée, premier alunissage en douceur, premier atterrissage martien, premier objet interstellaire : la chaîne des records.

> **Explication — le RTG, ou comment alimenter une sonde sans Soleil.**
> Au-delà de Jupiter, la lumière solaire devient trop faible pour des panneaux. La parade :
> le **générateur thermoélectrique à radioisotope (RTG)**. Un bloc de **plutonium-238**, en
> se désintégrant, dégage une chaleur constante ; des centaines de **thermocouples**
> convertissent l'écart de température entre ce bloc brûlant et l'espace glacé en
> électricité — sans aucune pièce mobile, pendant des **décennies**. C'est le cœur nucléaire
> des Voyager, de Cassini, de New Horizons, de Curiosity et de Perseverance.

---

## Chapitre I · L'aube de l'ère spatiale (1957-1962)

Il a suffi de quatre ans. Quatre ans entre une sphère qui ne fait que biper et un satellite qui relaie la télévision à travers un océan. L'ère spatiale ne s'ouvre pas en douceur : elle s'ouvre dans la peur, l'orgueil et la vitesse.

### Sputnik 1 — la sphère qui a réveillé le monde (URSS, 4 octobre 1957)

*Modèle 3D Sketchfab — la sphère polie de 58 cm et ses quatre antennes fouet ; tournez-la pour voir les deux hémisphères boulonnés (modèle « Sputnik 1 », CC Attribution).*

Le 4 octobre 1957, à 19 h 28 UTC, une fusée R-7 s'arrache du désert de Baïkonour. À son sommet, une boule de métal poli grande comme un ballon de plage. Quelques minutes plus tard, les radioamateurs du monde entier captent un son qui n'existait pas la veille : un *bip… bip… bip…* régulier, tombé du ciel. **Sputnik 1**, le premier objet que l'humanité ait jamais placé en orbite, ne transporte presque rien — et change tout. En Occident, c'est l'effroi : si l'URSS peut mettre une sphère sur orbite, elle peut y mettre une ogive. De cette panique naîtra, dix mois plus tard, la NASA.

📋 **Fiche — Sputnik 1**
📍 *Où aujourd'hui ? — N'existe plus : rentrée et désintégration dans l'atmosphère le 4 janvier 1958, après ~3 semaines d'émission et près de 1 400 orbites.*
- **Identité —** Constructeur : OKB-1 (Sergueï Korolev). Lancement : 4 oct. 1957, 19 h 28 UTC, fusée R-7, Baïkonour. Orbite : LEO elliptique, période ~98 min.
- **Masse & structure —** 83,6 kg ; sphère de **58 cm** formée de deux hémisphères de 2 mm assemblés par **36 boulons** et joints toriques, **pressurisée à 1,3 atm d'azote sec**. Quatre antennes fouet externes : deux de 2,4 m, deux de 2,9 m.
- **Énergie —** **batteries argent-zinc** (~51 kg — l'essentiel de la masse !), pour ~3 semaines d'émission.
- **Parties & fonctions —** *coque pressurisée polie* (étanchéité + bouclier thermique réfléchissant) · *émetteur radio* (la charge utile) · *antennes fouet* (diffusion omnidirectionnelle) · *ventilateur + interrupteurs thermiques* (régulation interne) · *interrupteur barométrique de sécurité* (détection d'une éventuelle perte de pression).
- **Matériaux —** alliage **AMG6T** (aluminium-magnésium-titane) poli ; joints toriques d'étanchéité ; azote sec sous pression.
- **Instrument unique —** un **émetteur radio 1 W** émettant alternativement sur **20,005 et 40,002 MHz** ; la durée des bips codait la **température** et la **pression** internes.
- **Défis —** garantir l'étanchéité et la régulation thermique d'une sphère pressurisée lâchée dans le vide ; émettre assez fort pour être capté dans le monde entier.
- **Données —** la propagation de ses signaux a renseigné la **densité électronique de l'ionosphère**. Fin : batteries épuisées vers le 26 oct. 1957 ; **rentrée et désintégration le 4 janvier 1958**.

*Le fait marquant — pour ses créateurs, Sputnik était presque un détail : Korolev rêvait déjà d'un satellite scientifique lourd. C'est la simplicité de la sphère qui en a fait un symbole planétaire.*

> **Anti-intox · Sputnik n'a rien « espionné ».**
> On lui prête parfois des caméras ou des oreilles indiscrètes. En réalité, Sputnik 1 ne
> portait **qu'un émetteur radio** : ni caméra, ni capteur d'espionnage. Sa seule arme
> était symbolique — prouver que l'espace était à portée — et scientifique : sonder
> l'ionosphère. Tout le reste est légende.

### Explorer 1 — la première vraie découverte (États-Unis, 31 janvier 1958)

*Modèle 3D Sketchfab disponible (« Explorer 1 », CC Attribution) — le tube allongé monté sur son dernier étage à poudre.*

La riposte américaine met du temps (l'humiliant échec de Vanguard, qui explose au sol en décembre 1957, est retransmis en direct). Mais quand **Explorer 1** s'envole le 31 janvier 1958 au sommet d'une fusée Juno I, il fait mieux que rattraper : il **découvre**. Son compteur Geiger se met par moments à saturer, comme aveuglé. L'explication viendra de James Van Allen : la Terre est ceinte de **vastes anneaux de particules chargées**, piégées par son champ magnétique. La physique spatiale moderne vient de naître.

📋 **Fiche — Explorer 1**
📍 *Où aujourd'hui ? — N'existe plus : rentrée atmosphérique le 31 mars 1970, après plus de 58 000 orbites.*
- **Identité —** Army Ballistic Missile Agency (von Braun) + JPL (Caltech). Lancement : 1ᵉʳ février 1958 (UTC), fusée **Juno I** (dérivée du missile Redstone), Cap Canaveral. Cadre de l'**Année géophysique internationale**.
- **Masse & structure —** 13,97 kg, dont ~8,3 kg de charge utile ; corps cylindrique allongé, **stabilisé par rotation**, formant le dernier étage en vol.
- **Énergie —** piles chimiques (émission ~4 mois).
- **Instruments —** *compteur Geiger-Müller* (rayons cosmiques) · *capteurs de température* (internes/externes) · *détecteurs de micrométéorites* (fils-jauges + microphone à cristal).
- **Découverte —** les **ceintures de radiation de Van Allen** : le compteur, saturé à haute altitude, révèle des flux de particules bien supérieurs au cosmique attendu.
- **Données & fin —** dernier signal le 23 mai 1958 ; rentrée atmosphérique le 31 mars 1970.

*Le fait marquant — le premier satellite américain n'a pas seulement répondu aux Soviétiques : il a fait la première grande découverte scientifique de l'ère spatiale.*

### Telstar 1 — l'Atlantique aboli (États-Unis, 10 juillet 1962)

Cinq ans après Sputnik, l'espace devient utile. Le 10 juillet 1962, **Telstar 1** — financé par AT&T, lancé par la NASA — inaugure le premier satellite de **communications actif**. Le 23 juillet, des deux côtés de l'Atlantique, des téléspectateurs voient la même image **en direct** : un drapeau américain, puis une allocution de Kennedy, traversent l'océan à la vitesse de la lumière. Le monde vient de rétrécir.

📋 **Fiche — Telstar 1**
📍 *Où aujourd'hui ? — Inerte depuis février 1963, mais toujours en orbite terrestre elliptique (~950 × 5 600 km) — il y restera des siècles.*
- **Identité —** Constructeur : AT&T / Bell Labs. Lancement : 10 juil. 1962, fusée **Thor-Delta**, Cap Canaveral. Orbite elliptique (non géostationnaire — il fallait le suivre).
- **Masse & structure —** 77 kg ; sphère de **~87-88 cm** hérissée de cellules solaires et d'antennes.
- **Parties & fonctions —** *transpondeur micro-ondes* (réception montante, amplification, réémission) · *antennes en couronne* · *~3 600 cellules solaires* (alimentation) · *batteries nickel-cadmium* (stockage).
- **Matériaux —** aluminium, magnésium, placage **or/argent**, silicium des cellules ; plus de **1 000 transistors** — une prouesse électronique pour l'époque.
- **Mission —** relais de télévision, téléphonie et données entre stations au sol.
- **Fin —** tombé en panne le 21 février 1963, victime des radiations artificielles de l'essai nucléaire en haute altitude **Starfish Prime** ; toujours en orbite.

> **Anti-intox · Telstar, victime d'une bombe… américaine.**
> Telstar n'a pas été « usé » par l'espace : il a été tué par une **explosion nucléaire**.
> En juillet 1962, l'essai américain *Starfish Prime* (1,4 mégatonne à 400 km d'altitude)
> a gonflé artificiellement les ceintures de Van Allen. Ce surplus de radiations a grillé
> l'électronique de plusieurs satellites, dont Telstar. Une leçon précoce : l'orbite est un
> milieu que l'on peut soi-même rendre hostile.

**Repère · du prototype à l'industrie.** Les premiers satellites étaient des **expériences** ; en moins d'une décennie, ils deviennent une **infrastructure** — communications, navigation, observation. Le chapitre suivant en fait l'inventaire.

---

## Chapitre II · Les satellites — l'infrastructure invisible (1957 → 2026)

Au-dessus de nous, à chaque instant, des milliers de machines tournent. Elles téléphonent, guident, photographient, préviennent. On ne les voit jamais ; on dépendrait pourtant à peine moins d'elles que de l'électricité. Ce qui les distingue d'une sonde tient en un mot : elles **restent**.

> **Explication — LEO, MEO, GEO : l'altitude fait le métier.**
> Plus un satellite est haut, plus il met de temps à faire le tour de la Terre.
> - **LEO** (orbite basse, ~160-2 000 km) : on y file en ~90 min. Faible latence, vue
>   rapprochée — idéal pour l'observation fine et les méga-constellations (Starlink, ISS).
> - **MEO** (~2 000-35 000 km) : le domaine de la **navigation** (GPS, Galileo) ; un tour
>   en ~12 h.
> - **GEO** (~35 786 km) : à cette altitude précise, un satellite tourne **exactement** à
>   la vitesse de la Terre — il semble **immobile** dans le ciel. Parfait pour la télévision
>   et la météo, qui veulent fixer toujours la même région.

### Hubble — l'œil parfait au-dessus de l'air (NASA/ESA, 24 avril 1990)

*Modèle 3D Sketchfab officiel NASA — le tube argenté de 13 m, ses deux ailes solaires, la trappe ouverte sur le miroir de 2,4 m.*

Le 24 avril 1990, la navette Discovery dépose en orbite un télescope que l'on présente déjà comme une révolution. Les premières images tombent : floues. Le miroir de 2,4 m, pourtant poli à la perfection… selon une mauvaise mesure — une erreur de quelques microns, fatale. Pendant trois ans, Hubble est la risée de l'Amérique. Puis, en 1993, des astronautes lui posent **des lunettes** (l'optique correctrice COSTAR), et l'aveugle devient visionnaire. Piliers de la Création, champs profonds grouillant de galaxies, mesure de l'expansion accélérée de l'Univers : Hubble n'a pas seulement fait de la science, il a changé notre regard sur le cosmos.

📋 **Fiche — Hubble Space Telescope** *(télescope spatial, toujours actif juin 2026)*
📍 *Où aujourd'hui ? — Actif, en orbite terrestre basse à ~515-540 km, en lente décroissance ; rentrée atmosphérique estimée vers 2034-2038 (selon l'activité solaire), sans réhausse possible depuis la fin des navettes.*
- **Identité —** NASA / ESA / Lockheed Martin & Perkin-Elmer (optique). Lancement : 24 avr. 1990 (navette **Discovery**, STS-31). Orbite basse ~540 km.
- **Masse & structure —** 11 110 kg ; télescope de type **Cassegrain** (miroir primaire + secondaire), ~13 m de long.
- **Optique —** miroir primaire de **2,4 m** en **béryllium** allégé ; revêtement aluminium + couche de fluorure de magnésium.
- **Énergie —** deux panneaux solaires (~2,8 kW) + batteries nickel-hydrogène.
- **Parties & fonctions —** *bus* (électronique, ordinateurs) · *cinq baies d'instruments* interchangeables · *antenne haut gain* (liaison via les satellites-relais TDRS) · *senseurs de guidage fin* (pointage à la milliarcseconde) · *gyroscopes + roues à réaction* (orientation sans propulseur).
- **Matériaux —** béryllium (miroir), **graphite-époxy** (structure dilatant peu), isolation multicouche, aluminium.
- **Instruments (générations successives, posés par navette) —** *WFPC puis WFC3* (caméra grand champ visible-UV-proche IR) · *ACS* (caméra à grand champ, surveys profonds) · *STIS* (spectrographe imageur) · *COS* (spectrographe UV) · *NICMOS* (proche IR, retiré).
- **Défis —** **aberration sphérique** du miroir (1990) **corrigée par COSTAR (1993)** ; entretien par **cinq missions de navette** (la dernière en 2009), aujourd'hui impossibles ; gyroscopes vieillissants gérés en mode dégradé.
- **Données —** ⚠️ « **plus d'1 à 1,5 million d'observations** » *(les fichiers sources divergent — à trancher sur une valeur datée)*. Découvertes : accélération de l'expansion, atmosphères d'exoplanètes, galaxies primitives.

*Le fait marquant — pour 1,5 milliard de dollars et un défaut de fabrication, l'humanité a failli rater le télescope le plus célèbre de l'histoire. Une paire de lunettes posée à 540 km d'altitude l'a sauvé.*

### James Webb (JWST) — le successeur infrarouge (NASA/ESA/CSA, 25 décembre 2021)

*Modèle 3D Sketchfab — le miroir doré de 6,5 m en 18 segments hexagonaux, et le bouclier solaire à cinq couches grand comme un court de tennis (plusieurs modèles disponibles).*

Là où Hubble voit surtout en lumière visible, **Webb** voit dans l'**infrarouge** — donc plus loin, et plus tôt. Plus loin dans l'Univers, c'est plus loin dans le temps : Webb capte la lueur des **premières galaxies**, étirée vers le rouge par 13 milliards d'années d'expansion. Pour cela, il lui faut un froid extrême et une obscurité parfaite : il vit à 1,5 million de km de la Terre, au point de Lagrange **L2**, derrière un pare-soleil de cinq voiles de Kapton.

📋 **Fiche — James Webb Space Telescope** *(pleinement opérationnel)*
📍 *Où aujourd'hui ? — Actif, en orbite de halo autour du point de Lagrange L2, à ~1,5 million de km de la Terre (côté opposé au Soleil) ; ergols pour ~20 ans de maintien.*
- **Identité —** NASA / ESA / CSA ; maître d'œuvre Northrop Grumman. Lancement : 25 déc. 2021 (**Ariane 5**, Kourou). Orbite : point de Lagrange **L2** (~1,5 M km).
- **Optique —** miroir primaire de **6,5 m** en **18 segments hexagonaux** de béryllium **plaqués or** (l'or réfléchit l'infrarouge), dépliés et phasés en vol au nanomètre.
- **Refroidissement —** pare-soleil de **5 couches de Kapton** (grand comme un court de tennis) abaissant la température côté instruments à **~40 K** ; MIRI descend encore via un cryoréfrigérateur.
- **Instruments —** *NIRCam* (caméra proche IR, imagerie profonde + front d'onde) · *NIRSpec* (spectrographe multi-objets, jusqu'à ~100 cibles à la fois) · *MIRI* (caméra + spectro infrarouge moyen) · *FGS/NIRISS* (guidage fin + imagerie/spectro proche IR).
- **Défis —** un déploiement à **344 points de défaillance unique** réussi du premier coup ; refroidissement passif ; maintien à L2 (pas de réparation possible).
- **Données —** Univers primitif, formation des étoiles, **atmosphères d'exoplanètes** (CO₂, SO₂, H₂O détectés) ; les images les plus profondes jamais obtenues.

> **Anti-intox · Webb n'a pas « remplacé » Hubble.**
> On lit souvent que Webb a pris la suite de Hubble. C'est inexact : les deux travaillent
> dans des **lumières différentes** (visible/UV pour Hubble, infrarouge pour Webb) et sont
> **complémentaires**. Webb ne « voit » pas le passé par magie : il capte une lumière
> infrarouge que Hubble ne pouvait pas saisir, parce que l'expansion de l'Univers a étiré
> les couleurs des galaxies les plus anciennes vers le rouge, puis l'infrarouge.

### Communiquer, observer, naviguer — les satellites de service

Avant les méga-constellations, trois grands métiers ont structuré le ciel. *(Fiches volontairement sobres : les fichiers source les documentent peu — aucun chiffre n'est inventé ici.)*

📋 **Communications —** **Intelsat** (depuis 1965, premiers satellites **géostationnaires** commerciaux) tisse le réseau téléphonique et télévisuel mondial ; **Iridium** (**66 satellites** en orbite basse, maillés entre eux) couvre la planète entière pour la voix et les données, jusqu'aux pôles.

📋 **Observation de la Terre —** **Landsat** (de Landsat 1 en 1972 à Landsat 9 en 2021) constitue **la plus longue archive continue** de l'aspect changeant de notre planète — un demi-siècle de déforestation, de fonte et d'urbanisation. Le programme européen **Copernicus** y ajoute les **Sentinel** : *Sentinel-1* (radar à synthèse d'ouverture, qui voit la nuit et à travers les nuages), *Sentinel-2* (imageur optique multispectral) — toutes données **gratuites et ouvertes**.

📋 **Navigation —** quatre constellations mondiales en orbite **moyenne** : **GPS** (États-Unis, Block I→III, 31+ satellites), **Galileo** (Union européenne, 30+), **GLONASS** (Russie), **BeiDou** (Chine). Elles diffèrent par la précision, la couverture, les signaux (civils/militaires) et l'interopérabilité. Chaque satellite embarque des **horloges atomiques** d'une stabilité extrême.

> **Anti-intox · le GPS ne sait pas où vous êtes.**
> Contre-intuitif mais essentiel : un satellite GPS **ignore totalement** votre position.
> Il ne fait qu'émettre, en boucle, l'heure ultra-précise de son horloge atomique et sa
> position. C'est **votre récepteur** (téléphone, voiture) qui calcule, en comparant les
> signaux d'au moins quatre satellites, le délai de chacun — donc sa distance à chacun —
> et en déduit où il se trouve. Le système est à sens unique : les satellites ne reçoivent
> rien de vous.

### Starlink — la plus grande constellation de l'histoire (SpaceX, depuis 2019)

*Modèle 3D Sketchfab — le bus plat d'un satellite V2 mini, son unique aile solaire repliable (« Starlink Spacex Satellite », CC Attribution).*

En 2019, SpaceX commence à déployer **Starlink** par grappes de soixante. Le résultat, quelques années plus tard, n'a pas de précédent : la plus grande flotte de machines jamais placée en orbite, fournissant un accès Internet à faible latence aux endroits que la fibre n'atteindra jamais. Le prix de cette prouesse est un ciel transformé — traînées lumineuses pour les astronomes, et une question vertigineuse de gestion du trafic orbital.

📋 **Fiche — satellite Starlink V2 mini**
📍 *Où aujourd'hui ? — Flotte en orbite terrestre basse (~550 km), en renouvellement permanent : chaque exemplaire est désorbité et consumé dans l'atmosphère après ~5 ans.*
- **Identité —** Constructeur : SpaceX. Déploiement par grappes via **Falcon 9** réutilisable (et à terme Starship). Orbite : LEO ~550 km, latence ~20-40 ms.
- **Masse & structure —** ~260-500 kg *(les V2 mini ≈ 740 kg selon les spécifications récentes ⚠️)* ; **bus plat** optimisé pour empiler des dizaines d'exemplaires sous une coiffe.
- **Énergie & propulsion —** un panneau solaire déployable ; **propulseurs ioniques** à effet Hall, au **krypton** puis à l'**argon** sur les versions récentes ⚠️ (maintien d'orbite + désorbitation).
- **Parties & fonctions —** *antennes à réseau phasé* (faisceaux orientables électroniquement vers les usagers) · *liaisons laser inter-satellites* (maillage sans station au sol) · *ordinateurs redondants* · *système de désorbitation automatique* (fin de vie ~5 ans).
- **Matériaux —** alliages d'aluminium haute résistance, composites carbone, cellules solaires **GaAs**, électronique durcie contre les radiations.
- **Échelle (« juin 2026 », selon le fichier source) —** ⚠️ **~10 400-10 700 satellites en orbite** sur **>12 280 déployés**, ~12 millions d'abonnés. *(À recouper : des décomptes indépendants donnaient plutôt « >7 000 actifs » fin 2025 — données très volatiles, à dater précisément.)*

> **Anti-intox · « 12 000 satellites », un chiffre à manier avec des pincettes.**
> Les compteurs Starlink **changent chaque semaine** : satellites lancés, satellites
> opérationnels, satellites déjà désorbités — trois nombres différents que l'on confond
> souvent. Un satellite Starlink ne vit qu'environ **cinq ans**, puis se consume volontairement
> dans l'atmosphère. Toute affirmation chiffrée doit donc porter **une date** ; sans date,
> elle est déjà fausse.

### SMILE — voir le bouclier de la Terre en rayons X (ESA/CAS, 19 mai 2026)

*Visuel — concept ESA/CAS en orbite très elliptique, l'imageur X pointé vers la magnétopause (modèle 3D non encore disponible).*

📋 **Fiche — SMILE (Solar wind Magnetosphere Ionosphere Link Explorer)** *(en mise en service juin 2026 — ⚠️ date à recouper)*
📍 *Où aujourd'hui ? — En mise en service, sur une orbite terrestre très elliptique (~5 000 × 121 000 km) inclinée à 73°.*
- **Identité —** ESA + Académie chinoise des sciences (CAS) — première mission **entièrement conjointe**. Lancement : 19 mai 2026 (Vega-C, Kourou). Orbite : très elliptique, inclinée 73° (~5 000 × 121 182 km, pour reculer assez loin et embrasser toute la magnétosphère d'un coup d'œil).
- **Masse & énergie —** ~2 250 kg au lancement (à vide 708 kg) ; 850 W.
- **Constructeurs —** module de charge utile (Airbus) + instrument SXI côté ESA ; plateforme + instruments LIA/MAG/UVI côté CAS.
- **Instruments —** *SXI* (imageur en rayons X mous — capte l'émission produite quand le vent solaire heurte les gaz de la haute atmosphère) · *UVI* (imageur ultraviolet des aurores) · *LIA* (analyseur d'ions du vent solaire) · *MAG* (magnétomètre sur boom de 3 m).
- **But —** filmer **pour la première fois, globalement**, la rencontre entre le vent solaire et le **bouclier magnétique** terrestre (météo spatiale, aurores). Mission nominale 3 ans.

*Le fait marquant — SMILE ne regarde pas le Soleil ni l'espace lointain : il regarde l'invisible bataille, juste au-dessus de nos têtes, entre le vent solaire et le champ magnétique qui nous protège.*

---

## Chapitre III · Les sondes — l'exil volontaire (1959 → aujourd'hui)

Une sonde ne revient pas. Elle quitte la Terre comme on quitte un port sans billet de retour, emportant juste assez d'énergie, d'instruments et d'intelligence pour survivre seule, des années durant, là où nul humain ne survivrait une seconde. Voici la lignée des grandes voyageuses.

### Programme Luna — les premiers pas robotiques (URSS, dès 1959)

L'Union soviétique ouvre, là encore, toutes les portes. **Luna 1** est le premier objet à s'arracher à l'attraction terrestre (1959) ; **Luna 2**, le premier à toucher un autre monde, en s'écrasant sur la Lune ; **Luna 3**, le premier à nous montrer ce que personne n'avait jamais vu.

#### Luna 3 — le visage caché de la Lune (URSS, 4 octobre 1959)

*Modèle 3D Sketchfab disponible (low-poly) — le cylindre photographique et ses cellules solaires.*

Deux ans jour pour jour après Sputnik, **Luna 3** réussit l'impensable : photographier la **face cachée de la Lune**. Le défi est double. D'abord, y aller — en exploitant la première **assistance gravitationnelle** de l'histoire. Ensuite, ramener les images : pas de capteur numérique en 1959, mais un **laboratoire photographique automatique** embarqué, qui développe le film à bord, dans le vide et l'apesanteur, puis le scanne ligne à ligne pour le transmettre par radio.

📋 **Fiche — Luna 3 (Lunik 3)**
📍 *Fin de vie — N'existe plus : rentrée dans l'atmosphère terrestre vers avril 1960, sur son orbite très allongée Terre-Lune (contact perdu le 22 oct. 1959).*
- **Identité —** OKB-1 (Korolev). Lanceur : R-7 (Luna 8K72), Baïkonour. Photos les 6-7 oct. 1959 entre ~6 200 et 66 700 km ; dernier contact le 22 oct. 1959.
- **Masse & structure —** 278,5 kg ; cylindre de 1,32 × 1,19 m. Stabilisation par rotation, puis basculement 3 axes pour viser la Lune.
- **Énergie —** cellules solaires + batteries. Propulsion : jets de gaz d'attitude seulement.
- **Parties & fonctions —** *compartiment hermétique pressurisé (~0,22 atm)* abritant caméras, processeur de film et scanner · *caméra Yenisey-2* (double objectif 200 et 500 mm) · *unité de développement automatique du film* · *scanner à spot volant* (numérise les négatifs pour transmission radio) · *cellules solaires externes* · *jets de gaz + gyroscopes + photocellules Soleil/Lune* (orientation) · *obturateurs thermiques + ventilateurs* · *détecteurs de micrométéorites et de rayons cosmiques* · *antennes (4 hautes + 2 basses)*.
- **Matériaux —** structure métallique pressurisée ; **film 35 mm isochrome** d'origine américaine (récupéré de ballons-espions *Genetrix*), choisi pour sa résistance à la chaleur et aux radiations ; revêtements thermiques.
- **Défis —** photographier pendant un **black-out radio** (derrière la Lune) ; développer et numériser un film **en apesanteur et sous vide** ; renforcer un signal faible (réorientation + extinction d'équipements pour booster l'émission).
- **Données —** 29 vues prises, **~17 transmises** (~70 % de la face cachée) → premier atlas lunaire (1960-61), catalogue de 500 formations, premier globe lunaire.

*Le fait marquant — l'asymétrie révélée par Luna 3 est réelle et profonde : la face cachée a une croûte plus épaisse et presque pas de « mers » volcaniques. On en débat encore.*

> **Anti-intox · la « face cachée » n'est pas la « face obscure ».**
> *Pink Floyd* a beaucoup fait pour la confusion. La face cachée de la Lune n'est **pas**
> plongée dans une nuit éternelle : elle reçoit **autant de soleil** que la face visible —
> simplement, comme la Lune nous montre toujours le même côté, nous ne la voyons jamais.
> Quand chez nous c'est la pleine lune, la face cachée, elle, est en pleine **nuit** ; à la
> nouvelle lune, c'est l'inverse. « Cachée » pour nos yeux, oui ; « obscure », jamais.

#### Luna 9 — le premier alunissage en douceur (URSS, 31 janvier 1966)

*Modèle 3D Sketchfab — l'atterrisseur sphérique « œuf » aux pétales déployés (« Luna 9 lander », CC Attribution).*

Jusqu'en 1966, une terreur hante les ingénieurs : et si la surface lunaire n'était qu'un **océan de poussière** où tout engin s'enfoncerait sans laisser de trace ? **Luna 9** y répond, à la douzième tentative soviétique. Une capsule sphérique, lâchée juste avant l'impact, rebondit sur ses amortisseurs, s'immobilise, ouvre quatre pétales métalliques — et transmet les **premières images jamais prises depuis le sol d'un autre monde**. Le sol est ferme. La voie est ouverte aux hommes.

📋 **Fiche — Luna 9**
📍 *Fin de vie — Posée pour toujours sur la Lune (Océan des Tempêtes, Oceanus Procellarum), silencieuse depuis le 6 février 1966.*
- **Identité —** Constructeur : GSMZ **Lavochkin** (type Ye-6) — première grande réussite interplanétaire du bureau. Lanceur : Molniya. **Premier atterrissage en douceur sur la Lune** (3 février 1966).
- **Masse & structure —** lancement ~1 584 kg ; **atterrisseur sphérique ~99-100 kg**.
- **Parties & fonctions —** *module de propulsion et de correction de trajectoire* · *atterrisseur encapsulé* à amortisseurs (forme « œuf ») · *pétales métalliques* s'ouvrant après l'arrêt pour stabiliser et déployer les antennes · *caméra panoramique* · *batteries* · *antennes*.
- **Défis —** réussir une vitesse résiduelle quasi nulle au contact ; survivre au choc ; transmettre depuis la surface — et **prouver un sol porteur** (contre la hantise de l'« océan de poussière »).
- **Données —** panoramas 360° (rochers, horizon) sur **5 sessions**, avant épuisement des batteries (6 février 1966).

#### Lunokhod 1 & 2 — les premiers rovers (URSS, 1970-1973)

*Modèles 3D Sketchfab — la « baignoire » à huit roues et son couvercle-radiateur (« Lunokhod 1 » et « Lunokhod-2 », CC).*

Cinq ans après Luna 9, l'URSS pose sur la Lune les **premiers véhicules mobiles** d'un autre monde. Pilotés depuis la Terre malgré un délai-lumière de 2,5 secondes, ces engins à huit roues, semblables à des baignoires sur châssis, roulent des kilomètres au pas, photographiant et analysant le sol. La nuit lunaire venue (quatorze jours de froid à −150 °C), un petit cœur de **polonium-210** les garde au chaud jusqu'à l'aube.

📋 **Fiche — Lunokhod 1 & 2** *(bureau Lavochkin, OKB-301)*
📍 *Où aujourd'hui ? — Immobiles sur la Lune (Lunokhod 1 : mer des Pluies ; Lunokhod 2 : cratère Le Monnier) ; leurs rétroréflecteurs laser sont toujours visés depuis la Terre.*
- **Identité & jalons —** *Lunokhod 1* : déployé par **Luna 17**, 17 nov. 1970 ; **~756 kg** ; **premier rover extraterrestre** ; mer des Pluies, **10,5 km**, **>20 000 images TV** ; arrêt le 4 oct. 1971. *Lunokhod 2* : déployé par **Luna 21**, 15 jan. 1973 ; **~39 km** (record de roulage hors Terre jusqu'en 2014, battu par Opportunity) ; cratère Le Monnier.
- **Parties & fonctions —** *châssis à 8 roues motrices indépendantes* à suspension (mobilité, franchissement) · *couvercle articulé* abritant le panneau solaire le jour, refermé la nuit · *caméras TV stéréo* (navigation + science) · *antennes* (liaison via les orbiteurs Luna) · *rétroréflecteur laser* (expérience française).
- **Énergie —** panneau solaire (jour) + source de **polonium-210** pour le **chauffage** (nuit lunaire), pas pour la puissance électrique.
- **Matériaux —** aluminium et alliages légers (structure, roues), acier (mécanismes), isolants thermiques multicouches, électronique durcie, source radioactive de polonium-210 en conteneur protégé.
- **Instruments scientifiques —** *spectromètre à rayons X* (composition du sol) · *magnétomètre* · *densitomètre/pénétromètre* (propriétés mécaniques du régolithe).
- **Défis —** pilotage à distance avec délai-lumière (~2,5 s) ; poussière abrasive ; amplitude thermique **−150 à +120 °C** ; navigation sur terrain accidenté par caméras + commandes au sol.

*Le fait marquant — le rétroréflecteur de Lunokhod sert encore : on tire dessus au laser depuis la Terre pour mesurer la distance Terre-Lune au millimètre, et vérifier la relativité générale.*

### Mars 3 — le premier contact martien (URSS, 28 mai 1971)

*Modèle 3D Sketchfab — l'orbiteur et sa capsule conique d'atterrissage (« Mars 3 spacecraft », CC Attribution).*

Mars a longtemps été le cimetière des sondes. **Mars 3** y inscrit pourtant une première : le 2 décembre 1971, son atterrisseur se pose **en douceur** sur le sol martien. La victoire dure **moins de deux minutes** : après ~110-120 secondes de transmission — le temps d'amorcer une image grise et brouillée —, le silence se fait. La cause ? Une **tempête de poussière globale**, phénomène alors inconnu, qui ensevelissait la planète entière au pire moment.

📋 **Fiche — Mars 3**
📍 *Fin de vie — Atterrisseur posé sur Mars (région de Ptolemaeus, hémisphère sud), muet depuis décembre 1971 ; orbiteur inerte en orbite martienne.*
- **Identité —** OKB-1 + Lavochkin (programme M-71), jumelle de Mars 2. **Premier atterrissage mou réussi sur Mars** (2 déc. 1971, région de Ptolémée).
- **Masse & structure —** totale **4 650 kg** (orbiteur ~3 440 kg ; module d'atterrissage ~1 210 kg ; masse posée 358 kg). Capsule sphérique Ø 1,2 m + bouclier conique 2,9 m. Orbiteur ~4,1 m de haut × 2 m (5,9 m panneaux déployés).
- **Parties & fonctions (atterrisseur) —** *bouclier aérodynamique* · *parachutes* · *rétrofusées* · *capsule à pétales* · *caméras TV* · *spectromètre de masse* · *capteurs température/pression/vent* · *pelle mécanique* · *mini-rover PrOP-M* (pénétromètre + densitomètre de radiation, relié par câble — jamais déployé avec succès).
- **Matériaux —** mousses amortissantes, isolation thermique, équipements **stérilisés** (protection planétaire).
- **Défis —** entrée atmosphérique à grande vitesse **+** parachute **+** rétrofusées… en pleine **tempête de poussière planétaire** (inconnue à l'époque) ; perte partielle de carburant de l'orbiteur → orbite non nominale.
- **Données —** orbiteur ~60 images (avec Mars 2) ; atmosphère (H, O ; T de −110 à +13 °C ; pression 5,5-6 mbar ; vapeur d'eau très faible). Lander : image partielle de 70 lignes (grise). Débris possibles repérés par **MRO/HiRISE en 2013**. Orbiteur actif ~8 mois (données jusqu'en août 1972).

> **Anti-intox · « atterrir » sur Mars n'a rien d'« atterrir » sur la Lune.**
> Mars a une atmosphère — assez épaisse pour brûler un bouclier thermique, trop ténue
> (~0,6 % de la pression terrestre) pour qu'un simple parachute suffise. Il faut **tout
> combiner** : bouclier, parachute supersonique **et** rétrofusées. C'est ce cocktail
> redoutable qui explique l'hécatombe des sondes martiennes — et pourquoi le succès de
> Mars 3, même bref, fut un exploit.

### Pioneer 10 & 11 — les éclaireurs des géantes (NASA, 1972-1973)

*Modèle 3D Sketchfab officiel NASA (« Pioneer », CC BY-NC) — la grande parabole, les RTG au bout de leur bras, la longue perche du magnétomètre.*

Avant d'envoyer les précieuses Voyager, la NASA dépêche deux éclaireurs. **Pioneer 10** est le premier à franchir la **ceinture d'astéroïdes** — que certains craignaient infranchissable — puis à survoler **Jupiter**. **Pioneer 11** pousse jusqu'à **Saturne**, qu'aucun engin n'avait approchée. Tous deux portent la fameuse **plaque de Pioneer** : un message gravé — silhouettes humaines, position du Soleil — destiné à d'éventuels regards extraterrestres dans des millions d'années.

📋 **Fiche — Pioneer 10 & 11**
📍 *Où aujourd'hui ? — Silencieuses (Pioneer 10 depuis 2003, Pioneer 11 depuis 1995), elles dérivent toujours : Pioneer 10 vers Aldebaran (~68 années-lumière, frôlée dans ~2 millions d'années), Pioneer 11 vers la constellation de l'Aigle (Aquila).*
- **Identité —** Constructeur : TRW pour NASA Ames. *Pioneer 10* : lancée 2 mars 1972, **258 kg** ; survol de **Jupiter** déc. 1973 ; dernier signal **janvier 2003**. *Pioneer 11* : lancée 5 avr. 1973 ; **premier survol de Saturne** (1ᵉʳ sept. 1979, découverte d'un anneau et de deux lunes) ; dernier contact **30 sept. 1995**.
- **Architecture —** **spin-stabilisée** (rotation pour la stabilité) ; grande antenne parabolique ; **4 RTG** au plutonium au bout d'un bras ; longue perche de magnétomètre, éloignée pour fuir les perturbations du corps.
- **Instruments —** *photopolarimètre imageur* (images spin-scan) · *magnétomètre à vapeur d'hélium* · *radiomètre infrarouge* · *analyseur de plasma* · *photomètre UV* · *détecteurs de particules / rayons cosmiques / météoroïdes*.
- **Défis —** ceinture d'astéroïdes inconnue ; et surtout les **ceintures de radiations** de Jupiter, mille fois plus violentes que prévu (Pioneer 10 endommagé, mais survivant).
- **Données —** premières images rapprochées de Jupiter, champs et particules de l'héliosphère lointaine ; la **plaque de Pioneer** comme message à d'éventuels extraterrestres.

### Voyager 1 & 2 — le Grand Tour et l'au-delà (NASA/JPL, 1977)

*Modèle 3D Sketchfab officiel NASA (« Voyager », CC BY-NC) — la parabole de 3,7 m, les trois RTG, la perche du magnétomètre de 13 m, et le Disque d'or.*

Une fois par siècle environ, les quatre planètes géantes s'alignent de telle sorte qu'une seule sonde peut les visiter toutes, de l'une à l'autre, en « rebondissant » sur leur gravité. La NASA saisit l'occasion à l'été 1977. **Voyager 2** part la première (20 août), **Voyager 1** ensuite (5 septembre) mais sur une route plus rapide. Le **Grand Tour** livrera des merveilles : les volcans d'Io, les anneaux tressés de Saturne, les geysers glacés de Triton. Puis les Voyager ne s'arrêtent pas. En 2012, Voyager 1 franchit l'**héliopause** et devient le **premier objet humain dans l'espace interstellaire**.

📋 **Fiche — Voyager 1 & 2** *(NASA/JPL ; ex-programme Mariner Jupiter-Saturn ; bus dérivé Mariner Mark II)*
📍 *Où aujourd'hui ? — Actives, dans l'espace interstellaire : Voyager 1 à ≈ 173 UA (~25,9 milliards de km, en direction d'Ophiuchus, mi-2026), Voyager 2 à ≈ 143 UA. Le signal de Voyager 1 met plus de 23 heures à nous parvenir.*
- **Identité —** Lancements : Voyager 2 le 20 août 1977, Voyager 1 le 5 sept. 1977 (Titan IIIE-Centaur). Voyager 1 à ~172,6 UA en 2026 ; vitesse ~17 km/s.
- **Masse & structure —** ≈ **825 kg** au lancement (à vide ~721,9 kg) ⚠️ *(un fichier indiquait 815 kg)* ; **bus décagonal** ; antenne **Cassegrain de 3,7 m** ; magnétomètre porté par une **perche de 13 m**.
- **Énergie —** **3 RTG MHW** au plutonium-238 (~470 W au lancement ; déclin continu, assez pour l'ingénierie jusqu'à ~2036). Propulsion : 16 propulseurs hydrazine + sous-système **AACS** (gyroscopes + roues redondantes).
- **Parties & fonctions —** *bus décagonal* (électronique, ordinateurs redondants) · *antenne grand gain 3,7 m* (liaison X/S-band via le **Deep Space Network**) · *RTG sur flèche* (à l'écart, pour éloigner les radiations des instruments) · *boom d'instruments* (MAG, PWS) · *enregistreur numérique* (mémoire de **64 Mo** à l'époque).
- **Matériaux —** aluminium (structure **et** blindage anti-radiation), plutonium-238 (sous forme d'oxyde dans les RTG), composites et isolants multicouches (MLI), acier/alliages des mécanismes, câblage blindé.
- **Instruments (11) —** *MAG* (magnétomètre triaxial, **actif**) · *PWS* (ondes de plasma, **actif**) · *ISS* (caméras, **éteint en 1990**) · *IRIS, UVS, CRS, LECP, PLS, PRA, PPS* (IR, UV, rayons cosmiques, particules, plasma, radio — désactivés un à un pour économiser l'énergie). **Le Disque d'or** : disque de cuivre plaqué or (Ø 30 cm), salutations en 55 langues, musiques et images de la Terre.
- **Défis —** radiations extrêmes près de Jupiter (**blindage… en feuille d'aluminium**) ; déclin des RTG ; colmatage des lignes d'hydrazine (résolu par bascules logicielles et activation de propulseurs de secours, 2017-2025) ; délai de communication **>23 h-lumière** ; corruption mémoire de l'ordinateur (**résolue en 2024**).
- **Données & histoire —** V1 : Jupiter (5 mars 1979), Saturne/Titan (12 nov. 1980), **héliopause le 25 août 2012**. V2 : seule à visiter **Uranus (1986)** et **Neptune (1989)**, interstellaire depuis le **5 nov. 2018**. « **Pale Blue Dot** » (1990). Toujours actives en 2026.

> **Anti-intox · les Voyager n'ont pas quitté le Système solaire.**
> On lit partout que Voyager 1 « a quitté le Système solaire ». À nuancer fortement. La
> sonde a quitté l'**héliosphère** (la bulle de vent solaire) — pas le Système solaire au
> sens **gravitationnel**. Au-delà s'étend encore le **nuage d'Oort**, réservoir lointain
> de comètes qui appartient bel et bien au Soleil. Voyager 1 mettra **environ 300 ans** à
> seulement l'atteindre, et ~30 000 ans à le traverser.

*Le fait marquant — le bouclier anti-radiations qui a sauvé l'électronique des Voyager près de Jupiter était, en partie, fait de la même **feuille d'aluminium** que celle de nos cuisines.*

### Viking 1 & 2 — les premiers laboratoires sur Mars (NASA, 1976)

*Modèle 3D Sketchfab — l'atterrisseur tripode et son bras échantillonneur (« Viking I Lander », CC Attribution).*

En 1976, deux atterrisseurs américains se posent là où tant d'autres ont échoué, et accomplissent ce dont l'humanité rêvait : chercher la **vie** sur Mars. Leurs trois expériences de biologie analysent le sol martien. Le verdict, encore discuté aujourd'hui, est troublant : pas de preuve convaincante de vie, mais un sol d'une **réactivité chimique** inattendue. Les perchlorates, découverts bien plus tard, expliqueront en partie le mystère.

📋 **Fiche — Viking 1 & 2**
📍 *Fin de vie — Les deux atterrisseurs reposent sur Mars (Viking 1 à Chryse Planitia, Viking 2 à Utopia Planitia), muets depuis 1982 (V1) et 1980 (V2) ; orbiteurs inertes en orbite martienne.*
- **Identité —** NASA / JPL (orbiteurs) + Martin Marietta (atterrisseurs). Deux paires **orbiteur + atterrisseur**. *Viking 1* lancée le 20 août 1975, **atterrissage le 20 juillet 1976** (Chryse Planitia) : **premier atterrissage américain réussi sur Mars**.
- **Masse & énergie —** atterrisseur ~600 kg, alimenté par **deux RTG** au plutonium-238 (indépendance vis-à-vis du Soleil et des poussières).
- **Parties & fonctions —** *bouclier + parachute + rétrofusées* (entrée-descente-atterrissage) · *deux caméras panoramiques* · *bras robotique + pelle* (prélèvement du sol) · *sismomètre* · *station météo* · *laboratoire de biologie* (trois expériences).
- **Instruments de biologie —** recherche d'un métabolisme dans le sol (échange gazeux, libération marquée, pyrolyse) + chromatographie/spectrométrie de masse (matière organique).
- **Résultat —** **aucune preuve concluante de vie** ; sol chimiquement très réactif (perchlorates soupçonnés bien plus tard). Viking 1 cesse d'émettre en novembre 1982.

### Mars Express — la longévité européenne (ESA, 2 juin 2003)

*Modèle 3D Sketchfab disponible (« Mars Express »).*

Première sonde de l'Europe vers une autre planète, **Mars Express** devait durer un an martien. Vingt-trois ans plus tard, elle veille encore. Son radar **MARSIS** a sondé sous la calotte polaire sud des signaux interprétés comme de possibles **lacs d'eau liquide** ; sa caméra stéréo **HRSC** a dressé un relief martien en trois dimensions d'une beauté saisissante.

📋 **Fiche — Mars Express**
📍 *Où aujourd'hui ? — Active, en orbite elliptique autour de Mars depuis décembre 2003 (mission prolongée plusieurs fois).*
- **Identité —** Maître d'œuvre Astrium + consortium européen. **Première mission planétaire de l'ESA.** Lancement : 2 juin 2003 (Soyouz-FG, Baïkonour) ; insertion martienne le 25 déc. 2003.
- **Masse & énergie —** ~1 120 kg ; panneaux solaires.
- **Instruments —** *HRSC* (caméra stéréo haute résolution, relief 3D) · *OMEGA* (spectromètre de minéralogie visible/proche IR) · *MARSIS* (radar de sondage de subsurface) · *PFS* (spectromètre IR atmosphérique) · *SPICAM* (UV/IR de l'atmosphère) · *ASPERA* (interactions plasma/atmosphère).
- **Passager —** l'atterrisseur britannique **Beagle 2** : échec de déploiement de ses panneaux, retrouvé **intact en 2015** par MRO/HiRISE.
- **Défis & données —** longévité exceptionnelle (>20 ans en 2026) ; eau ancienne, glaces polaires, possibles lacs sous la calotte sud, volcans.

### Rosetta & Philae — rendez-vous avec une comète (ESA, 2 mars 2004)

*Modèles 3D Sketchfab — l'orbiteur aux immenses ailes solaires, et la comète 67P avec le site de Philae (« Rosetta », NASA, CC BY-NC ; « ESA Rosetta », CC).*

Atteindre une comète n'est pas viser une cible : c'est rattraper un boulet de glace lancé à des dizaines de milliers de km/h, après dix ans de course et trois passages par la gravité de la Terre et de Mars. En 2014, l'européenne **Rosetta** y parvient — elle se met en **orbite autour d'une comète**, une première absolue — puis largue **Philae**, qui réalise le **premier atterrissage de l'histoire sur un noyau cométaire**.

📋 **Fiche — Rosetta + Philae**
📍 *Fin de vie — Tous deux posés sur la comète 67P/Churyumov-Gerasimenko, qu'ils accompagnent dans sa course autour du Soleil depuis le 30 septembre 2016.*
- **Identité —** Maître d'œuvre Airbus Defence & Space (consortium européen). Lancement : 2 mars 2004 (Ariane 5). Cible : comète **67P/Churyumov-Gerasimenko** (arrivée 2014).
- **Masse & énergie —** ~3 000 kg (Philae ~100 kg) ; immenses panneaux solaires (pour fonctionner loin du Soleil) ; **hibernation de 31 mois** pendant la croisière pour économiser l'énergie.
- **Instruments —** **11** sur l'orbiteur (dont la caméra **OSIRIS**, spectromètres, analyseurs de poussière et de gaz) + **10** sur **Philae** (caméras, foreuse, analyseurs de surface).
- **Défis —** rendez-vous d'une précision extrême avec un objet minuscule et irrégulier ; atterrissage de Philae en quasi-apesanteur (il **rebondit** et se cale de travers).
- **Données & fin —** composition (eau, molécules organiques), structure et activité d'une « fossile » du Système solaire ; impact contrôlé de Rosetta sur 67P le 30 sept. 2016.

*Le fait marquant — l'eau de la comète 67P ne ressemble pas chimiquement à celle de nos océans : un argument de poids contre l'idée que les comètes auraient, à elles seules, apporté l'eau de la Terre.*

### Cassini-Huygens — le maître de Saturne (NASA/ESA/ASI, 15 octobre 1997 → 2017)

*Modèle 3D Sketchfab officiel NASA (« Cassini », CC BY-NC) — la haute antenne de 4 m, les RTG, et la sonde Huygens accrochée au flanc.*

Treize ans dans le système de Saturne, des centaines de milliers d'images, et deux découvertes qui ont rebattu les cartes de l'astrobiologie. **Cassini** révèle que **Titan** possède des **lacs et des mers de méthane liquide** ; et qu'**Encelade** crache par ses fissures des **geysers d'eau** issus d'un **océan souterrain**. Le 14 janvier 2005, l'atterrisseur européen **Huygens** se pose sur Titan : **l'atterrissage le plus lointain jamais réalisé**. En 2017, à court de carburant, Cassini plonge volontairement dans Saturne pour ne jamais risquer de contaminer Encelade.

📋 **Fiche — Cassini-Huygens**
📍 *Fin de vie — Cassini a été vaporisée dans l'atmosphère de Saturne le 15 septembre 2017 ; la sonde Huygens repose sur Titan depuis le 14 janvier 2005.*
- **Identité —** NASA/JPL (orbiteur Cassini), ESA (sonde Huygens), ASI (radar) ; bus Lockheed Martin. Lancement : 15 oct. 1997 (Titan IVB-Centaur). Fin : 15 sept. 2017.
- **Masse & structure —** au lancement ⚠️ **~5 600-5 712 kg** *(sources divergentes)* ; Cassini ~2 150 kg ; Huygens ~318-350 kg. ~6,8 m de haut × 4 m.
- **Énergie & propulsion —** 3 **GPHS-RTG** au plutonium-238 (~885 W) ; moteur principal bipropergol **R-4D (490 N)** + propulseurs monopropergol ; Δv total ~2 352 m/s.
- **Parties & fonctions —** *bus + module de propulsion* (réservoirs, électronique) · *antenne grand gain de 4 m* (com + occultations radio) · *RTG* (puissance) · *« vault »* d'électronique durcie · *sonde détachable Huygens* (parachutes, batteries chimiques, instruments de descente).
- **Matériaux —** aluminium et titane (structure), plutonium-238 (RTG), composites, isolation multicouche.
- **Instruments Cassini (12) —** *ISS* (caméras) · *CIRS* (spectro IR thermique) · *UVIS* (UV) · *VIMS* (visible/IR) · *CAPS* (plasma) · *CDA* (poussière cosmique) · *INMS* (spectro de masse neutres/ions) · *MAG* (magnétomètre) · *MIMI* (imagerie de la magnétosphère) · *Radar SAR* (cartographie de Titan sous les brumes) · *RPWS* (ondes radio/plasma) · *RSS* (radio-science).
- **Histoire & données —** insertion autour de Saturne le **1ᵉʳ juillet 2004** ; **Huygens se pose sur Titan le 14 janvier 2005** (~350 images de descente, certaines perdues par un bug radio) ; **Grand Finale (2017)** : 22 orbites entre la planète et ses anneaux, puis plongée. Lacs de méthane sur Titan, **geysers et océan d'Encelade**, dynamique des anneaux.

### New Horizons — première lumière sur Pluton (NASA/JHU-APL, 19 janvier 2006)

*Modèle 3D Sketchfab officiel NASA (« New Horizons », CC BY-NC) — la parabole triangulaire, le RTG, la silhouette de piano à queue.*

Pluton n'était, pendant 85 ans, qu'un point flou et froid au bord du connu. **New Horizons** est partie le 19 janvier 2006, plus vite qu'aucun engin n'avait jamais quitté la Terre, pour un rendez-vous fixé **neuf ans et demi** plus tard. Le 14 juillet 2015, après cinq milliards de kilomètres, elle frôle Pluton — et révèle un monde **vivant** : un immense glacier d'azote en forme de cœur (**Sputnik Planitia**), des montagnes de glace d'eau, une atmosphère bleutée.

📋 **Fiche — New Horizons**
📍 *Où aujourd'hui ? — Active, dans la ceinture de Kuiper à ≈ 64 UA du Soleil (~9,6 milliards de km, mi-2026) ; elle quittera la ceinture vers 2028-2029.*
- **Identité —** NASA / Johns Hopkins APL + Southwest Research Institute. PI : Alan Stern. Première mission du programme **New Frontiers**. Lancement : 19 jan. 2006 (Atlas V 551) — **le plus rapide jamais lancé depuis la Terre** (vitesse de libération ~58 500 km/h).
- **Masse & structure —** 478 kg (dont ~77 kg d'hydrazine, ~30 kg d'instruments) ; corps compact ~0,7 × 2,1 × 2,7 m ; **HGA de 2,1 m**.
- **Énergie & propulsion —** **RTG** au plutonium-238 (récupéré de Cassini : ~250 W au lancement, ~200 W à Pluton) ; étage solide **Star 48B** (injection) + 16 propulseurs hydrazine.
- **Parties & fonctions —** *bus compact* (héritage CONTOUR/TIMED) + *plateforme d'instruments orientable* · *HGA grand gain* (télécom **et** expérience REX) · *RTG sur le flanc* · *réservoirs d'hydrazine* · *senseurs d'étoiles + centrale inertielle* (navigation) · *bouclier thermique passif*.
- **Matériaux —** aluminium / composites légers ; isolation multicouche ; modules **GPHS** de plutonium en enveloppe d'**iridium** dans le RTG ; revêtements optiques/thermiques spéciaux ; antenne en aluminium de haute précision.
- **Instruments —** *Ralph* (imageur/spectromètre visible-IR : cartes de couleur, composition, température) · *Alice* (spectromètre UV : atmosphères) · *REX* (radio-science : structure atmosphérique, température, masse) · *LORRI* (téléobjectif haute résolution à longue distance) · *SWAP* (plasma / vent solaire) · *PEPSSI* (particules énergétiques) · *SDC* (compteur de poussière, conçu par des étudiants).
- **Défis —** voyage le plus long pour une reconnaissance planétaire (9+ ans) ; débit **1-2 kbit/s** (≈15 mois pour tout télécharger) ; hibernations répétées ; un mode « safe » inattendu juste avant le survol de Pluton.
- **Histoire —** Jupiter (28 fév. 2007, assistance gravitationnelle), **Pluton-Charon (14 juillet 2015, à 7 800 km)**, **Arrokoth (1ᵉʳ jan. 2019, à 3 500 km)**. Toujours active (réveil prévu fin juin 2026 pour des mesures héliophysiques).

> **Anti-intox · « Pluton n'est plus une planète » — ce que ça veut (et ne veut pas) dire.**
> En 2006, l'Union astronomique internationale a reclassé Pluton en **planète naine** —
> non par mépris, mais parce qu'on a découvert qu'elle partage son orbite avec une nuée
> d'autres objets de la ceinture de Kuiper. Cela ne retire **rien** à sa richesse : New
> Horizons a montré un monde géologiquement actif, doté d'une atmosphère et de cinq lunes.

### Juno — sonder le cœur de Jupiter (NASA, 5 août 2011)

*Modèle 3D Sketchfab officiel NASA (« Juno », CC BY-NC) — le corps hexagonal et ses trois immenses ailes solaires en croix.*

Jupiter cache son cœur sous mille kilomètres de nuages. **Juno** a été conçue pour le sonder — non pas en plongeant, mais en mesurant avec une précision extrême la **gravité** et le **champ magnétique** de la géante, depuis une orbite polaire qui la fait plonger périlleusement près des nuages. Première sonde à **énergie solaire** à s'aventurer aussi loin du Soleil, elle a révélé un noyau « dilué », des vents profonds, et des cyclones polaires en figures géométriques.

📋 **Fiche — Juno**
📍 *Où aujourd'hui ? — Active, en orbite polaire autour de Jupiter (mission étendue « EM2 » depuis octobre 2025).*
- **Identité —** NASA/JPL ; constructeur Lockheed Martin. Lancement : 5 août 2011 (Atlas V 551). Insertion en orbite polaire de Jupiter : 5 juillet 2016.
- **Masse & énergie —** ~3 625 kg au lancement ; **panneaux solaires** géants (3 ailes ~9 m) — premier engin à énergie solaire aussi loin du Soleil. Électronique abritée dans un **caisson en titane** contre les radiations de Jupiter.
- **Instruments —** *MWR* (radiomètre micro-ondes : sonde sous les nuages) · *magnétomètre* · *JADE / JEDI* (particules aurorales) · *JIRAM* (imageur infrarouge) · *gravity science* (oscillations radio) · *JunoCam* (caméra visible, images traitées par le **public**).
- **Résultats —** noyau « dilué » plutôt que compact, vents s'enfonçant à ~3 000 km, cyclones polaires géométriques. Active en 2026 (mission étendue, survols de lunes galiléennes).

### SOHO — la sentinelle du Soleil (ESA/NASA, 2 décembre 1995)

*Modèle 3D Sketchfab disponible (« SOHO ») — la plateforme cubique et son unique panneau solaire face au Soleil.*

Depuis trente ans, un veilleur fixe le Soleil sans jamais cligner. Posté au point de Lagrange **L1**, à 1,5 million de km vers le Soleil, **SOHO** ne le quitte pas des yeux. Il en sonde l'intérieur par héliosismologie, en photographie la couronne en continu, et **détecte les éruptions** des heures avant qu'elles ne frappent la Terre. Conçu pour deux ou trois ans, il fonctionne encore, plus de **trente ans** plus tard.

📋 **Fiche — SOHO (Solar and Heliospheric Observatory)**
📍 *Où aujourd'hui ? — Actif, en orbite de halo autour du point de Lagrange L1, à 1,5 million de km de la Terre en direction du Soleil.*
- **Identité —** ESA (lead) + NASA, programme ISTP ; construction par un consortium dirigé par Matra Marconi Space (Airbus). Lancement : 2 déc. 1995 (Atlas II-AS). Position : orbite halo en **L1**.
- **Masse & structure —** ~1 850 kg (charge utile ~640 kg) ; deux modules — *plateforme (SVM)* en **nid d'abeille aluminium** (propulsion, contrôle d'attitude, communication, alimentation) et *module de charge utile (PLM)* portant les **12 instruments**.
- **Matériaux —** structure en aluminium nid d'abeille, isolation multicouche, optiques et détecteurs UV/EUV de haute précision, refroidissement passif des instruments sensibles. Instruments fournis par **12 consortia** (9 européens, 3 américains).
- **Instruments —** *LASCO* (coronographe : couronne + comètes) · *EIT* (imagerie en UV extrême) · *MDI/SOI* (héliosismologie + cartographie magnétique) · *SUMER, CDS, UVCS* (spectromètres UV de la couronne et de la région de transition) · *GOLF, VIRGO* (oscillations globales + irradiance) · *SWAN, CELIAS, COSTEP, ERNE* (vent solaire, particules, composition).
- **Défis —** stabilité extrême à L1 pour des observations ininterrompues ; survie >30 ans (radiations, micrométéorites) ; coordination de 12 instruments internationaux.
- **Données —** images continues de la couronne, héliosismologie de l'intérieur solaire, vent solaire, **alertes de tempêtes en temps réel**.

*Le fait marquant — SOHO est aussi, à son corps défendant, le plus grand **découvreur de comètes** de l'histoire : plus de **5 000**, repérées par des amateurs scrutant ses images en ligne, alors que ce n'était nullement sa mission.*

### Parker Solar Probe — toucher une étoile (NASA/JHUAPL, 12 août 2018)

*Modèle 3D Sketchfab — la sonde tapie derrière son bouclier blanc (« NASA Parker Solar Probe », CC BY-NC).*

Pour la première fois, une machine humaine est entrée **dans l'atmosphère d'une étoile**. Derrière un bouclier de carbone qui encaisse plus de 1 300 °C, **Parker Solar Probe** plonge périodiquement dans la **couronne** du Soleil. Le 24 décembre 2024, elle est passée à seulement **6,1 millions de km** de la surface — sept fois plus près que Mercure — en devenant, à ~690 000 km/h, **l'objet le plus rapide jamais construit**.

📋 **Fiche — Parker Solar Probe**
📍 *Où aujourd'hui ? — Active, sur une orbite héliocentrique très elliptique (périhélie ~6,1 millions de km, soit ~0,04 UA) ; 28ᵉ passage au plus près du Soleil le 8 juin 2026.*
- **Identité —** NASA ; conçue et construite par le **Johns Hopkins APL**. Lancement : 12 août 2018 (Delta IV Heavy + étage supplémentaire).
- **Masse & protection —** ~685 kg ; **bouclier thermique** (TPS) en **composite carbone-carbone** de ~11 cm, face avant à >1 300 °C tandis que les instruments restent près de l'ambiante. Assistances gravitationnelles répétées de **Vénus** pour resserrer l'orbite.
- **Instruments —** *FIELDS* (champs électriques et magnétiques) · *WISPR* (imageur grand angle de la couronne) · *SWEAP* (électrons, protons, ions du vent solaire) · *IS☉IS* (particules énergétiques).
- **But & records —** origine du vent solaire, chauffage de la couronne, accélération des particules ; **objet humain le plus rapide** et le **plus proche du Soleil**. Toujours active en 2026.

> **Anti-intox · Parker ne « touche » pas la surface du Soleil.**
> Le slogan « toucher le Soleil » est joli mais piégeux : le Soleil **n'a pas de surface
> solide**. Parker traverse sa **couronne** — l'atmosphère extérieure, ténue mais
> paradoxalement brûlante (des millions de degrés). « Toucher » est une métaphore : franchir
> la frontière de l'atmosphère solaire, pas se poser sur une étoile.

### Perseverance & Ingenuity — l'astrobiologie et le premier vol martien (NASA, 2020)

*Modèles 3D Sketchfab — le rover six-roues et son mât, l'hélicoptère à double rotor (« Perseverance », CC0 ; « Mars Ingenuity Helicopter », CC).*

Le rover le plus avancé jamais posé sur Mars a un objectif limpide : chercher des **traces de vie ancienne** dans le cratère **Jezero**, un ancien delta de rivière, et **mettre en cache** des échantillons de roche qu'une future mission viendra chercher. Mais c'est son passager clandestin qui est entré dans l'histoire le 19 avril 2021 : **Ingenuity**, un hélicoptère de 1,8 kg, a réalisé le **premier vol motorisé contrôlé sur une autre planète**.

📋 **Fiche — Perseverance + Ingenuity** *(mission Mars 2020)*
📍 *Où aujourd'hui ? — Perseverance roule toujours dans le cratère Jezero (Mars) ; Ingenuity, cloué au sol depuis janvier 2024, repose près de son dernier site de vol.*
- **Identité —** NASA/JPL. Lancement : 30 juillet 2020 ; **atterrissage le 18 février 2021** (cratère Jezero), par grue volante (sky crane) guidée par **Terrain Relative Navigation**.
- **Masse & énergie (rover) —** masse sèche **1 025 kg** ; **MMRTG** au plutonium-238 (indépendance vis-à-vis du Soleil et des tempêtes de poussière).
- **Instruments (rover) —** *Mastcam-Z* (caméras stéréo à zoom) · *SuperCam* (laser : composition à distance) · *PIXL* (fluorescence X : chimie élémentaire à l'échelle du grain) · *SHERLOC* (Raman/UV : matière organique et minéraux) · *RIMFAX* (radar de sous-sol) · *MEDA* (station météo) · *MOXIE* (production d'**oxygène** à partir du CO₂ — une première) · *microphones*.
- **Système d'échantillonnage —** foret + tubes **stériles** scellés et déposés en caches (« depot ») pour un futur retour d'échantillons.
- **Ingenuity —** 1,8 kg, double rotor contrarotatif tournant à ~2 500 tr/min ; **premier vol motorisé sur une autre planète** (19 avr. 2021) ; **72 vols** (2021-2024) ; mission terminée en janvier 2024 (pale endommagée).
- **Données —** **>42 km** parcourus ; environnement habitable ancien confirmé ; indices de biosignatures potentielles (roche « Cheyava Falls », 2025). Rover toujours actif en 2026.

> **Anti-intox · faire voler un drone sur Mars, un exploit contre-intuitif.**
> L'air martien est **cent fois plus ténu** que le nôtre : un hélicoptère ordinaire n'y
> « mordrait » rien. Pour qu'Ingenuity décolle, il a fallu des pales tournant cinq fois plus
> vite qu'un hélico terrestre et une machine ultralégère. Que ça ait marché, du premier
> coup, sur un autre monde, reste l'un des petits miracles de l'ingénierie récente.

### Europa Clipper — vers l'océan caché d'Europe (NASA, 14 octobre 2024 → arrivée 2030)

*Modèle 3D Sketchfab — l'immense sonde aux ailes solaires de 30 m (« Europa clipper », CC Attribution).*

Sous la croûte de glace d'**Europe**, lune de Jupiter, se cache probablement **plus d'eau liquide que dans tous les océans de la Terre réunis**. Lancée en octobre 2024, **Europa Clipper** — le plus grand vaisseau interplanétaire jamais construit par la NASA — va l'étudier non pas en s'y mettant en orbite (les radiations de Jupiter la tueraient), mais en la **survolant 49 fois**.

📋 **Fiche — Europa Clipper**
📍 *Où aujourd'hui ? — En croisière vers Jupiter (survol de Mars effectué en mars 2025, survol de la Terre en décembre 2026) ; insertion en orbite jovienne prévue en avril 2030.*
- **Identité —** NASA/JPL. Lancement : 14 oct. 2024 (Falcon Heavy). Insertion autour de Jupiter : avril 2030.
- **Masse & structure —** 6 065 kg au lancement (à vide 3 241 kg ; propergol 2 750 kg) ; **envergure 30,5 m** (panneaux solaires géants, pour capter le peu de lumière près de Jupiter) ; ~600 W ; 24 propulseurs.
- **Protection —** un **« vault »** en titane/aluminium/zinc abrite l'électronique d'une dose cumulée de **2,8 Mrad**.
- **Instruments (9 + gravité) —** *EIS* (caméras) · *Europa-UVS* (UV) · *MISE* (spectro IR : composition de la glace) · *E-THEMIS* (IR thermique : points chauds) · *REASON* (radar : sonde la glace et cherche l'océan) · *ECM* (magnétomètre sur boom : confirme l'océan par induction) · *PIMS* (plasma) · *MASPEX* (spectro de masse : gaz) · *SUDA* (poussière éjectée).
- **Trajectoire & but —** assistances Mars (2025) + Terre (déc. 2026) ; **49 survols d'Europe** (2030-2034) pour évaluer l'**habitabilité** de l'océan sous-glaciaire.

---

## Chapitre IV · Les télescopes au sol — les plus grands yeux de l'humanité

Si Hubble et Webb voient net, ils voient **petit** : leur miroir doit tenir dans une fusée. Au sol, on s'affranchit de cette limite — on bâtit des miroirs de dix, vingt, bientôt **quarante mètres**. Le prix à payer est l'atmosphère, qui brouille les images comme le fond d'une piscine agitée. La parade est l'une des plus belles inventions de l'astronomie : l'**optique adaptative**.

> **Explication — l'optique adaptative, ou comment « dégeler » le ciel.**
> Les étoiles scintillent parce que l'air, en bougeant, déforme leur lumière. Pour
> l'annuler, les grands télescopes projettent un **laser** dans le ciel : il crée une
> fausse étoile artificielle, dont on connaît la forme exacte. En mesurant **mille fois
> par seconde** combien l'atmosphère la déforme, un miroir souple se tord en temps réel
> pour appliquer la correction inverse. Résultat : depuis le sol, des images aussi nettes
> que depuis l'espace — parfois plus.

📋 **Hale (Palomar, 1948/49)** — miroir de **5,08 m** en **Pyrex** alvéolaire (faible dilatation) aluminé ; vision de George Ellery Hale (Caltech/Rockefeller). **Le plus grand du monde jusqu'en 1993.**

📋 **Keck I & II (Mauna Kea, 1993/96)** — deux miroirs de **10 m** faits chacun de **36 segments hexagonaux** alignés au nanomètre, équipés d'**optique active et adaptative**. C'est la révolution du miroir segmenté, qui rend possibles les géants à venir.

📋 **VLT (ESO, Cerro Paranal, Chili)** — quatre télescopes de **8,2 m** (Antu, Kueyen, Melipal, Yepun) + quatre auxiliaires mobiles de 1,8 m, combinables en interféromètre (**VLTI**, bases jusqu'à ~200 m, résolution milliarcseconde). L'observatoire au sol le plus productif au monde — première image directe d'une exoplanète, suivi des étoiles autour du trou noir central de notre Galaxie.

*Modèle 3D Sketchfab officiel ESO disponible (« ESO VLT Unit telescope dome », CC).*

📋 **GTC (La Palma, 2007)** — **10,4 m**, longtemps le plus grand télescope optique du monde.

📋 **ELT — Extremely Large Telescope (ESO, Cerro Armazones, 39 m)** — le futur **plus grand œil de l'humanité**. Miroir primaire de **39,3 m** en **798 segments** hexagonaux ; conception à **5 miroirs** avec optique adaptative intégrée (le miroir M4 se déforme des milliers de fois par seconde). Il captera ~**100 millions de fois** plus de lumière que l'œil nu et rendra des images jusqu'à **15 fois plus nettes que Hubble**. **Statut juin 2026 :** miroir secondaire achevé, structure et **dôme de ~80 m** en cours (~2027), **première lumière technique ~2028-2029**, scientifique **~2030**.

📋 **GMT (25,4 m, 7 miroirs de 8,4 m)** — ~40 % de construction en 2026, première lumière dans les années 2030 (sous réserve de financement). **TMT (30 m segmenté)** — statut incertain (financement et site final en débat).

📋 **Radiotélescopes —** *Arecibo* (305 m, 1963 — **effondré le 1ᵉʳ décembre 2020**) · *FAST* (500 m, Chine, 2016 — **plus grand single-dish** du monde, 4 450 panneaux ajustables) · *VLA* (réseau de 27 antennes de 25 m) · *SKA* (en construction — le plus grand projet radio de l'histoire).

*Modèle 3D Sketchfab d'Arecibo (état effondré) disponible — un témoignage 3D de la catastrophe de 2020.*

> **Anti-intox · la fin d'Arecibo n'est pas un mystère.**
> L'effondrement spectaculaire d'Arecibo en 2020 a nourri bien des théories. La réalité
> est prosaïque et documentée : après **57 ans** de service, les **câbles d'acier** qui
> suspendaient la plateforme de 900 tonnes ont cédé, par **fluage du zinc** dans leurs
> ancrages — une fatigue lente des matériaux, aggravée par les ouragans. Pas de sabotage,
> pas de complot : de la métallurgie, et l'usure du temps.

🔭 **Repère · spatial contre terrestre.** Hubble et Webb voient sans atmosphère mais restent
petits ; l'ELT verra à travers l'air mais avec un miroir **seize fois** plus large que Webb.
Les deux approches ne se concurrencent pas — elles se complètent.

---

## Chapitre V · 2026 et au-delà — ce qui s'apprête à partir

L'odyssée ne ralentit pas. Au moment où ce dossier s'écrit, des dizaines de machines s'achèvent en salle blanche, prêtes à reprendre le flambeau — vers la Lune, Mars, Vénus, Titan, et les confins.

### Le retour des humains — Artemis (NASA)

Un demi-siècle après Apollo, l'humanité repart vers la Lune. **Artemis II** (2026) emmènera quatre astronautes en **survol lunaire** — le premier vol habité au-delà de l'orbite basse depuis 1972. **Artemis III** (~2027-28) doit reposer des humains sur le sol lunaire, près du **pôle sud** et de ses glaces. En orbite, la station **Lunar Gateway** servira de relais ; au sol, à terme, une **base**.

*Modèles 3D Sketchfab — la capsule **Orion** (module d'équipage + module de service européen) et la fusée **SLS** Block 1 (~98 m, plus de poussée que Saturn V).*

### Les nouveaux yeux de l'espace

📋 **Nancy Grace Roman** (NASA, fin 2026 / 2027) — un miroir de **2,4 m** comme Hubble, mais un champ **100 à 200 fois** plus large grâce à son *Wide Field Instrument* ; il cartographiera l'énergie noire, recensera des exoplanètes par **microlentille** et en imagera directement via un **coronographe**. Posté en L2.
📋 **PLATO** (ESA, déc. 2026) — une mosaïque de 26 caméras à la chasse aux planètes **habitables** par transit, autour d'étoiles brillantes.
📋 **Xuntian** (Chine, fin 2026) — un télescope de 2 m au champ ~**300× Hubble**, conçu pour voler en formation avec la station chinoise.

### Les voyageuses de demain

📋 **MMX — Martian Moons eXploration (JAXA, fin 2026).** Masse ~4 000 kg, lanceur **H3-24L** (Tanegashima). Mission internationale (JAXA + NASA pour MEGANE + CNES/DLR/ESA). Trois modules (croisière + atterrissage/échantillonnage + retour). Instruments : *TENGOO* (imageur nadir), *OROCHI* (radiomètre multi-couleurs), *LIDAR*, *MIRS* (spectro IR), *MEGANE* (gamma/neutrons), *CMDM* (poussière), *MSA* (spectro de masse) ; **rover franco-allemand Idefix**. But : étudier **Phobos et Deimos** et **rapporter >10 g d'échantillons de Phobos** — astéroïdes capturés ou morceaux de Mars ? Retour ~2031.

📋 **Dragonfly (NASA/JHUAPL, NET juillet 2028 → Titan ~2034).** Un **octocoptère** (8 rotors) nucléaire (**MMRTG**), lancé par Falcon Heavy, 4ᵉ mission New Frontiers (sélectionnée 2019). Masse ⚠️ ~450-500 kg *(fichier source)* / **~875 kg** *(NASA)*. Instruments : *DraMS* (spectro de masse), *DraGNS* (gamma/neutrons), *DrACO* (foreuse), *DragonCam*. Il **volera** de site en site (un vol tous les 1-2 Tsols ≈ 16 jours terrestres), sur 3,3 ans, pour étudier la **chimie prébiotique** de Titan (dunes, cratère Selk).

*Modèle 3D Sketchfab — le drone à huit rotors (« NASA Dragonfly Quadcopter », CC).*

> **Anti-intox · Dragonfly ne va pas « chercher des extraterrestres ».**
> Soyons précis, car la source elle-même insiste : Dragonfly étudie la **chimie
> prébiotique** — les briques chimiques qui *précèdent* la vie — et l'**habitabilité** de
> Titan. Ce n'est **pas** une mission de détection de vie. Titan, riche en molécules
> organiques et baigné d'un froid de −179 °C, est un laboratoire de chimie.

📋 **Rosalind Franklin — ExoMars (ESA, ~2028).** Le **premier rover européen** (~300-310 kg), doté d'une **foreuse de 2 m** pour atteindre des couches protégées des radiations, à **Oxia Planum**. Instruments : *MOMA* (molécules organiques), *Raman*, *MicrOmega*, *PanCam*, *WISDOM* (radar), *Ma_MISS* (dans la foreuse). Programme meurtri par l'abandon du partenariat russe en 2022, **relancé en 2024** avec un atterrisseur européen et le soutien de la NASA. Atterrissage ~2030.

📋 **Tianwen-3 (CNSA, ~2028).** L'ambition chinoise d'un **retour d'échantillons martiens** : architecture en **5 éléments** (atterrisseur, véhicule de remontée, orbiteur, module de service, capsule de rentrée), **deux lancements Longue Marche 5**. Trois méthodes de prélèvement (pelle, forage ~2 m, drone). ≥500 g rapportés vers ~2031 — potentiellement **le premier retour d'échantillons de Mars de l'histoire**. 15 kg réservés à des partenaires.

📋 **DESTINY+ (JAXA, ~2028).** Survol et analyse de poussière de l'astéroïde **(3200) Phaethon**, corps parent des Géminides. Propulsion **électrique solaire** (moteurs ioniques **μ10**, ~60 kg de xénon, Δv ~4 km/s). Instruments : *DDA* (analyseur de poussières), *TCAP*, *MCAP*. Survol ~2030.

📋 **NEO Surveyor (NASA, NET septembre 2027).** Télescope spatial **infrarouge** de défense planétaire (ex-NEOCam), posté en **L1**. Télescope de **50 cm**, deux canaux *MWIR (4-5,2 µm)* + *LWIR (6-10 µm)*, détecteurs Teledyne HAWAII (2 048²), refroidissement passif ~30 K, ~82 Gbit/jour, lanceur Falcon 9. JPL + Teledyne + Space Dynamics Lab. Objectif : ⚠️ repérer **au moins les deux tiers** (~90 % à terme) des géocroiseurs de plus de 140 m.

📋 **Comet Interceptor (ESA/JAXA, ~2029).** Mission **F-class** (~1 000 kg) qui partira **sans connaître sa cible** : elle attendra en **L2** qu'un télescope détecte une **comète vierge** venue du nuage d'Oort (ou un objet interstellaire), puis se lancera. **Trois modules** (un vaisseau principal + deux sous-sondes, dont une **JAXA**) pour une observation **multi-angles** et un profil 3D inédit du noyau.

📋 **Les missions Vénus (2029-2031).** Après des décennies de désintérêt, trois sondes y retournent : *DAVINCI* (NASA, ~2029-30, **sonde de descente** mesurant composition, T, pression et vents jusqu'au sol, visant **Alpha Regio**), *EnVision* (ESA, ~2031, **radar** VenSAR + sondeur de subsurface + spectromètres VenSpec), *VERITAS* (NASA, 2031+, radar **VISAR** + spectromètre **VEM**). Question commune : pourquoi Vénus, jumelle de la Terre par la taille, est-elle devenue un enfer de **464 °C** ?

📋 **La Lune asiatique.** *Chang'e-7* (CNSA, ~mi-2026) explorera le **pôle sud** avec un orbiteur, un atterrisseur, un rover et une **sonde sauteuse** pour traquer la **glace d'eau** (cratère Shackleton). *Chang'e-8* (~2028) testera les technologies d'une future **base** (impression 3D, énergie). *Chandrayaan-4* (ISRO, ~2027) tentera un **retour d'échantillons lunaires** (jusqu'à 3 kg, 5 modules, deux lancements LVM-3).

### Mars Sample Return — l'ambition en suspens (NASA/ESA)

📋 Le projet le plus convoité de la décennie est aussi le plus fragile. Ramener sur Terre les tubes mis en cache par Perseverance suppose un enchaînement vertigineux : un atterrisseur, un **Mars Ascent Vehicle** (première fusée à décoller d'une autre planète), et un **Earth Return Orbiter** européen pour capturer la capsule biocontenue et la rapporter. **Statut juin 2026 :** ⚠️ **en pause / restructuration** depuis 2023, sa facture (>11 milliards $) ayant provoqué des propositions d'annulation côté américain. L'ESA maintient des études. Issue incertaine.

> **Anti-intox · non, le retour d'échantillons martiens n'est pas « pour bientôt ».**
> On présente parfois Mars Sample Return comme imminent. La réalité 2026 est plus rude :
> le programme est **gelé** côté NASA, faute de budget, et son architecture est en pleine
> refonte. Les échantillons de Perseverance attendent toujours, scellés dans leurs tubes,
> sur le sol de Jezero. La Chine (Tianwen-3) pourrait bien rapporter les siens **avant**.

---

## Chapitre VI · Conclusion — ce que les machines nous ont appris

De la sphère bipante de **Sputnik** aux 798 éclats de verre de l'**ELT**, des voyageuses **Voyager** perdues entre les étoiles aux dix mille satellites de **Starlink**, soixante-dix ans d'ingénierie ont tissé autour de la Terre, et bien au-delà, un réseau d'yeux et de messagers.

Trois familles, une seule quête :
- Les **satellites** restent, et veillent — ils nous parlent, nous guident, nous préviennent.
- Les **sondes** s'exilent, et explorent — elles touchent ce que nous ne toucherons jamais.
- Les **télescopes**, du sol ou de l'espace, fouillent l'abîme — et y trouvent des mondes par milliers.

Chacune de ces machines est une question rendue concrète, lancée dans le vide. Et chaque réponse qu'elles renvoient — un sol ferme sur la Lune, un océan sous la glace d'Europe, une atmosphère bleutée sur Pluton — déplace un peu la frontière entre ce que l'on croit et ce que l'on sait. C'est, au fond, exactement le combat de l'**Empire contre Intox** : préférer, toujours, la donnée vérifiée à la légende commode.

> *Veritas omnia vincit.*

*Réalisé par Provoxys.*

---

## Où sont-elles aujourd'hui ? — synthèse (mi-2026)

> Tableau récapitulatif de la **localisation** de chaque objet : en service et où, ou bien
> fin de vie et lieu de repos. ⚠️ Les distances des sondes lointaines **dérivent de quelques
> UA par an** — à rafraîchir via les traqueurs officiels (NASA *Eyes on the Solar System*,
> *theskylive*, JHU-APL pour New Horizons). Statuts : 🟢 actif · ⚪ inerte/terminé · 🔵 futur.

| Objet | Statut | Où / fin de vie | Distance · orbite (mi-2026) |
|---|---|---|---|
| Sputnik 1 | ⚪ | détruit — rentrée atmosphérique 4 jan. 1958 | — |
| Explorer 1 | ⚪ | détruit — rentrée 31 mars 1970 | — |
| Telstar 1 | ⚪ | en orbite terrestre, inerte depuis 1963 | ~950 × 5 600 km |
| Hubble | 🟢 | orbite terrestre basse, en décroissance | ~515-540 km · rentrée ~2034-2038 |
| JWST | 🟢 | halo autour de **L2** | ~1,5 M km de la Terre |
| Starlink | 🟢 | orbite basse (flotte renouvelée) | ~550 km · désorbité à ~5 ans |
| SMILE | 🟢 | orbite terrestre très elliptique | ~5 000 × 121 000 km, 73° |
| Luna 3 | ⚪ | détruit — rentrée terrestre ~avril 1960 | — |
| Luna 9 | ⚪ | sur la Lune (Océan des Tempêtes) | surface lunaire |
| Lunokhod 1 | ⚪ | sur la Lune (mer des Pluies) | surface lunaire |
| Lunokhod 2 | ⚪ | sur la Lune (cratère Le Monnier) | surface lunaire |
| Mars 3 | ⚪ | atterrisseur sur Mars (Ptolemaeus) | surface martienne |
| Pioneer 10 | ⚪ | dérive vers Aldebaran, muette depuis 2003 | héliocentrique, sortante |
| Pioneer 11 | ⚪ | dérive vers l'Aigle, muette depuis 1995 | héliocentrique, sortante |
| Voyager 1 | 🟢 | espace interstellaire (vers Ophiuchus) | **≈ 173 UA** |
| Voyager 2 | 🟢 | espace interstellaire | **≈ 143 UA** |
| Viking 1 / 2 | ⚪ | sur Mars (Chryse / Utopia Planitia) | surface martienne |
| Mars Express | 🟢 | orbite de Mars | elliptique martienne |
| Rosetta / Philae | ⚪ | sur la comète 67P | avec 67P autour du Soleil |
| Cassini | ⚪ | vaporisée dans Saturne (15 sept. 2017) | — |
| Huygens | ⚪ | posée sur Titan (14 jan. 2005) | surface de Titan |
| New Horizons | 🟢 | ceinture de Kuiper | **≈ 64 UA** |
| Juno | 🟢 | orbite polaire de Jupiter | mission étendue EM2 |
| SOHO | 🟢 | halo autour de **L1** | 1,5 M km vers le Soleil |
| Parker Solar Probe | 🟢 | orbite héliocentrique elliptique | périhélie ~0,04 UA (6,1 M km) |
| Perseverance | 🟢 | cratère Jezero (Mars) | surface · >42 km parcourus |
| Ingenuity | ⚪ | au sol près de Jezero (depuis jan. 2024) | surface martienne |
| Europa Clipper | 🔵 | en croisière vers Jupiter | arrivée avril 2030 |
| Hale | 🟢 | Mont Palomar (Californie) | au sol |
| Keck I / II | 🟢 | Mauna Kea (Hawaï) | au sol |
| VLT | 🟢 | Cerro Paranal (Chili) | au sol |
| GTC | 🟢 | La Palma (Canaries) | au sol |
| ELT | 🔵 | en construction, Cerro Armazones (Chili) | 1ʳᵉ lumière ~2028-2030 |
| GMT | 🔵 | en construction, Las Campanas (Chili) | années 2030 |
| TMT | 🔵 | site incertain (Hawaï / Canaries en débat) | — |
| Arecibo | ⚪ | effondré sur site (Porto Rico), 1ᵉʳ déc. 2020 | — |
| FAST | 🟢 | Guizhou (Chine) | au sol |
| VLA | 🟢 | Nouveau-Mexique (USA) | au sol |
| SKA | 🔵 | en construction (Afrique du Sud + Australie) | au sol |
| Artemis II / Orion / SLS | 🔵 | au sol (Kennedy Space Center) | lancement 2026 |
| Nancy Grace Roman | 🔵 | intégration (Goddard) → L2 | lancement fin 2026/2027 |
| PLATO | 🔵 | préparation → L2 | lancement déc. 2026 |
| Xuntian | 🔵 | préparation (co-orbital station chinoise) | lancement fin 2026 |
| MMX | 🔵 | préparation (Tanegashima) → Phobos | lancement fin 2026, retour ~2031 |
| Dragonfly | 🔵 | construction (JHUAPL) → Titan | lancement 2028, arrivée 2034 |
| Rosalind Franklin | 🔵 | tests → Mars | lancement ~2028, arrivée ~2030 |
| Tianwen-3 | 🔵 | développement → Mars (retour) | lancement ~2028, retour ~2031 |
| DESTINY+ | 🔵 | développement → Phaethon | lancement ~2028, survol ~2030 |
| NEO Surveyor | 🔵 | développement (JPL) → L1 | lancement NET sept. 2027 |
| Comet Interceptor | 🔵 | construction → attente en L2 | lancement ~2029 |
| DAVINCI / EnVision / VERITAS | 🔵 | développement → Vénus | 2029-2031 |
| Chang'e-7 / 8 | 🔵 | développement → pôle sud lunaire | 2026 / 2028 |
| Chandrayaan-4 | 🔵 | développement → Lune (retour) | ~2027 |
| Mars Sample Return | 🔵 | **en pause** — échantillons sur Mars (Jezero) | gelé / refonte |

---

## Appareil critique — sources

> Sources officielles et croisées (état des fichiers source : 23 juin 2026). À reverser dans
> l'audit `sources/` du Dossier V, avec **vérification indépendante de chaque donnée et de
> chaque DOI** (règle anti-hallucination : ne jamais inventer de DOI).

- **Sondes & rovers** — science.nasa.gov · jpl.nasa.gov · esa.int · jaxa.jp · cnsa.gov.cn · voyager.jpl.nasa.gov · nssdc.gsfc.nasa.gov (catalogue NSSDCA) · russianspaceweb.com (programmes soviétiques)
- **Télescopes spatiaux & héliophysique** — science.nasa.gov/mission/hubble · /webb · /soho · /parker-solar-probe · esa.int (SMILE, Solar Orbiter)
- **Satellites d'application** — usgs.gov/landsat-missions · esa.int (Copernicus/Sentinel) · gps.gov · eoportal.org (Starlink — chiffres à dater)
- **Télescopes au sol** — eso.org (VLT, ELT) · keckobservatory.org · NSF/Arecibo · english.nao.cas.cn (FAST)
- **Sondes futures** — mmx.jaxa.jp · science.nasa.gov/mission/dragonfly · /neo-surveyor · /davinci · /veritas · esa.int (ExoMars, Comet Interceptor, EnVision) · planetary.org (Tianwen-3) · isas.jaxa.jp (DESTINY+) · sites CNSA/ISRO (Chang'e, Chandrayaan)
- **Positions actuelles (mi-2026)** — NASA *Eyes on the Solar System* (eyes.nasa.gov) · NASA « Where are Voyager 1 and 2 now? » (science.nasa.gov/mission/voyager) · JHU-APL « Where is New Horizons? » (pluto.jhuapl.edu) · *theskylive.com* · *hubblereentry.com* (altitude/rentrée Hubble). **Valeurs datées et dérivantes — à rafraîchir avant publication.**
- **Modèles 3D** — `apercu-modeles-3d.html` (UID Sketchfab vérifiés ; privilégier les modèles **NASA-officiels** et **CC**)
- **Général** — NASA Science · JPL · ESA · JAXA · CNSA · ISRO · Planetary Society · UCS Satellite Database · Wikipédia (recoupement uniquement)

---

## Annexe A — Réconciliation des doublons & écarts (rappel)

Fiches fusionnées depuis plusieurs fichiers ; **écarts à trancher avant publication** :

| Donnée | Valeurs trouvées | Choix v2 |
|---|---|---|
| Voyager — masse au lancement | 815 kg · ~825 kg | **~825 kg** (à vide 721,9) — à confirmer NASA/JPL |
| Hubble — nombre d'observations | « >1 M » · « >1,5 M » | trancher sur une valeur **datée** |
| Cassini — masse au lancement | ~5 600 kg · 5 712 kg | **5 712 kg** — à confirmer |
| Huygens — masse | ~318 kg · ~350 kg | fourchette 318-350 kg |
| Telstar 1 — diamètre | 87 cm · 88 cm | « ~87-88 cm » |
| Starlink — décompte | ~10 400-10 700 (juin 2026) · « >7 000 » (2025) | fourchette **datée** + ⚠️ |
| Dragonfly — masse | ~450-500 kg · ~875 kg | citer les deux, privilégier NASA |
| NEO Surveyor — objectif | « 90 % » · « 2/3 en 5 ans » | « ≥2/3 en 5 ans, ~90 % à terme » |

**Engins ajoutés depuis les dossiers de recherche** (absents du script maître) : Luna 9,
Lunokhod 1/2, Mars 3, Mars Express, Rosetta, JWST, SOHO, Parker, SMILE, Europa Clipper, et
toutes les sondes futures détaillées.

---

## Annexe B — Modèles 3D & visuels par engin

Correspondance script ↔ `apercu-modeles-3d.html` (67 engins, ~90 modèles Sketchfab à UID
vérifié). Pour chaque fiche, l'idéal éditorial : **photo officielle + rendu** + **modèle 3D
interactif** (façon « faites-le pivoter » du dossier *Exoplanètes*). Modèles disponibles
notamment pour : Sputnik, Explorer 1, Vostok 1, Luna 3/9, Lunokhod 1/2, Mars 3, Pioneer,
Voyager, Galileo, Cassini, New Horizons, Juno, Viking, Curiosity, Perseverance, Ingenuity,
Mars Express, MRO, Rosalind Franklin, Zhurong, Hubble, JWST, Spitzer, Kepler, SOHO, Parker,
Solar Orbiter, Roman (ex-WFIRST), Rosetta, OSIRIS-REx, Hayabusa2, DART, Lucy, Europa Clipper,
Dragonfly, Chang'e-6, Chandrayaan-3, Orion, SLS, Starlink, Landsat, Sentinel-2, GPS, ISS, VLT,
Arecibo. **Sans modèle :** Telstar 1, Vanguard 1, SMILE, MMX, Tianwen-3, Mars Sample Return,
NEO Surveyor, Comet Interceptor, EnVision/DAVINCI/VERITAS, Chang'e-7, ELT, Keck, FAST.

> **Prompts visuels 4K.** Les prompts de génération d'images (Sputnik, Voyager, Cassini, SOHO,
> ELT, NEO Surveyor, Vénus, Lune…) restent disponibles dans `script_total_v1.md` (Annexe B) et
> dans les fichiers source `sources/*.txt` — à réutiliser pour les images du dossier, en
> complément des modèles 3D.

---

*Script total v2 — réécriture détaillée façon Provoxys, fiches techniques densifiées au maximum.
0 doublon de fiche, écarts signalés, anti-intox intégrés, modèles 3D câblés. À vérifier
intégralement (Dossier V) avant publication.*
