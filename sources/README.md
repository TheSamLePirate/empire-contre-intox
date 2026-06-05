# Sources — Empire contre Intox

Vérification scientifique et **sources** des affirmations et données de chaque dossier.
Vérifié le **1ᵉʳ juin 2026** par recherche web (sources autoritatives : NASA, ESA, USGS, IUGS/ICS, Smithsonian, articles à comité de lecture ; encyclopédies en appoint).

**Légende des verdicts :** ✅ Confirmé · ⚠️ Approximatif/à nuancer · 🔶 Débattu dans la littérature · ❌ Erroné

## Fichiers

| Dossier | Fichier de sources | Couverture |
|---|---|---|
| — | [`chronos-bibliographie.md`](chronos-bibliographie.md) | Bibliographie maîtresse (24 réf.) du Dossier IV — rendu de `sources_audit_scientifique_chronos.csv` |
| IV | [`dossier-IV-1-cosmologie.md`](dossier-IV-1-cosmologie.md) | Big Bang, inflation, Planck, CMB, BBN, galaxies, midi cosmique |
| IV | [`dossier-IV-2-systeme-solaire-vie.md`](dossier-IV-2-systeme-solaire-vie.md) | Soleil, Terre, Lune, océans, première vie, GOE, eucaryotes, Précambrien |
| IV | [`dossier-IV-3-phanerozoique-extinctions.md`](dossier-IV-3-phanerozoique-extinctions.md) | Bornes ICS, explosion cambrienne, 5 extinctions, dinosaures |
| IV | [`dossier-IV-4-humanite-calendrier.md`](dossier-IV-4-humanite-calendrier.md) | Évolution humaine + arithmétique du calendrier cosmique |
| I | [`dossier-I-resume-eres.md`](dossier-I-resume-eres.md) | Le Résumé des Ères (Lalie & Ymir) |
| II | [`dossier-II-ediacarien.md`](dossier-II-ediacarien.md) | L'Édiacarien (Lalie & Ymir) |
| III | [`dossier-III-artemis2.md`](dossier-III-artemis2.md) | Artemis II (Provoxys) |
| V | [`dossier-V-elements.md`](dossier-V-elements.md) | Le Tableau Périodique — particules, interactions, formation des atomes, radioactivité, modèles, orbitales, propriétés (Jorge & Zalex) |
| VI | [`dossier-VI-la-vie-de-la-terre.md`](dossier-VI-la-vie-de-la-terre.md) | La Vie de la Terre — application interactive, paléogéographie, séries climatiques/atmosphériques, pipeline reproductible (SamLePirate) |
| VIII | [`dossier-VIII-ancetres-genetiques.md`](dossier-VIII-ancetres-genetiques.md) | Adam & Ève génétiques — Ève mitochondriale, Adam chromosome Y, LUCA, code génétique, science & foi (Lalie & Ymir) |

> Données brutes fournies par l'auteur : `sources_audit_scientifique_chronos.csv`.

### Sources scientifiques — littérature primaire (DOI)

Couche « sources scientifiques » : **près de 200 articles à comité de lecture, DOI vérifiés ou sourcés par page éditeur** (résolution DOI/éditeur ; aucun DOI inventé), plus quelques DOI de jeux de données. C'est l'appareil de référence le plus strict.

| Fichier | DOI | Couverture |
|---|---|---|
| [`refs-doi-1-cosmologie.md`](refs-doi-1-cosmologie.md) | 11 | Planck 2018, Fixsen (CMB), BBN, Guth, Madau & Dickinson, Robertson, Curtis-Lake (JWST), Conselice/Lauer |
| [`refs-doi-2-terre-vie-precambrien.md`](refs-doi-2-terre-vie-precambrien.md) | 18 | Connelly, Patterson, Canup & Asphaug, Wilde/Valley, Nutman/Dodd/Allwood, Lyons, Gumsley, Gibson (Bangiomorpha), Li, Hoffman |
| [`refs-doi-3-phanerozoique-extinctions.md`](refs-doi-3-phanerozoique-extinctions.md) | 15 | GTS2020, Raup & Sepkoski, Stanley, Burgess, Schulte/Alvarez (Chicxulub), Renne/Schoene/Sprain (Deccan), Nesbitt, Zachos |
| [`refs-doi-4-humanite-ediacarien.md`](refs-doi-4-humanite-ediacarien.md) | 15 | Hublin/Richter (Jebel Irhoud), Harmand (Lomekwi), Villmoare, Brunet/Daver, Bobrovskiy, Fedonkin, Bengtson, Knoll, Mills |
| [`refs-doi-5-lune-artemis.md`](refs-doi-5-lune-artemis.md) | 6 | Colaprete (LCROSS), Li, Honniball, Hayne, Pieters (M³), Hauri |
| [`refs-doi-V-elements.md`](refs-doi-V-elements.md) | 81 | Particules/interactions, cosmologie/BBN/CMB, radioactivité, modèles atomiques, mécanique quantique, règles de remplissage, propriétés périodiques, Mendeleïev |
| [`refs-doi-VI-la-vie-de-la-terre.md`](refs-doi-VI-la-vie-de-la-terre.md) | 12 | Paléogéographie, PhanDA, CO₂/O₂/CH₄, GEOCARBSULF, Grande Oxydation, durée du jour Terre-Lune |
| [`refs-doi-VIII-ancetres-genetiques.md`](refs-doi-VIII-ancetres-genetiques.md) | 48 | Ève mitochondriale, Adam chromosome Y, coalescence, LUCA, code génétique, premières traces de vie, variation humaine, science & foi |

> Pièges à DOI détectés et corrigés par les agents : Kimberella (Fedonkin) `10.1038/42242` (et non 41048), Daver 2022, Renne 2015 `…aac7549`, Zachos 2001 `…1059412`. Les bornes ICS n'ont pas de DOI d'article unique → référence = GTS2020 (DOI volume) + charte officielle ICS.

## Bilan global

Les grands repères des dossiers sont corrects et sourcés. Restent des points *à nuancer* et quelques corrections de cohérence/d'actualisation ; pour les dossiers V et VIII, les audits signalent plusieurs formulations à corriger strictement ou à renforcer.

### Corrections recommandées (concrètes)
1. **`horloge-univers/chronos.html` — reproduction sexuée :** affiche encore **~1,2 Ga** à 3 endroits (carte « cellule complexe » + chip, `SEGMENTS`, tableau des éons), alors que `events.json` porte la valeur à jour **1,047 Ga** (Bangiomorpha, Gibson et al. 2018). → aligner sur **1,047 Ga** (bascule Mésoprotérozoïque → Tonien/Néoprotérozoïque).
2. **`ymir-lalie/resume-eres.html` — base du Cambrien :** indiquée à **541 Ma** ; valeur ICS actuelle = **538,8 Ma**. → actualiser.
3. **`ymir-lalie/edicarien.html` — coquille :** « Vandobiontes » → orthographe correcte **« Vendobionta »** (Seilacher).

### Dossier V — Le Tableau Périodique
- Audit scientifique complet : [`dossier-V-elements.md`](dossier-V-elements.md).
- Bibliographie DOI étendue : [`refs-doi-V-elements.md`](refs-doi-V-elements.md) (**81 DOI**) + sources autoritatives sans DOI (NIST/CODATA, PDG, NIST ASD, IUPAC, NNDC, CERN, ESA).
- Points de précision principaux : Modèle Standard formulé trop largement ; β doit dire « nombre de masse A », pas « masse » ; formule de Born à écrire `|ψ(r,t)|²` ; le triplet `(n,l,m)` adresse une orbitale, pas un électron complet ; stabilité des ions et formule de Slater à contextualiser ; gaz nobles, métaux de transition et affinité électronique à nuancer.

### Dossier VI — La Vie de la Terre
- Audit léger : [`dossier-VI-la-vie-de-la-terre.md`](dossier-VI-la-vie-de-la-terre.md), basé sur la page sources et les fichiers internes de l'application.
- Bibliographie DOI : [`refs-doi-VI-la-vie-de-la-terre.md`](refs-doi-VI-la-vie-de-la-terre.md) (**12 références**, dont un DOI Zenodo de jeu de données).
- Points de précision principaux : les cartes >1 Ga sont stylisées, les séries précambriennes sont des ancrages/estimations et les événements biologiques profonds gardent des formulations prudentes.

### Dossier VIII — Adam & Ève, ancêtres génétiques
- Audit complet : [`dossier-VIII-ancetres-genetiques.md`](dossier-VIII-ancetres-genetiques.md) ; bibliographie DOI : [`refs-doi-VIII-ancetres-genetiques.md`](refs-doi-VIII-ancetres-genetiques.md) (**48 DOI uniques, vérifiés Crossref**).
- Points principaux : Ève mitochondriale et Adam-Y sont des **coalescences de lignées**, pas un couple ; dates à donner en fourchettes (Ève ~120–200 ka ; Adam-Y ~120–307 ka selon calibrage, avec A00 comme borne haute discutée) ; LUCA n'est **pas la première cellule** mais le dernier ancêtre commun de la vie actuelle, avec estimation 2024 ~4,2 Ga ; **99,9 %** vaut pour les différences ponctuelles, ~99,5–99,6 % avec variation structurale ; l'héritage mitochondrial est maternel sauf très rares exceptions.
- Corrections de rigueur signalées : « scientifiques ont nommé Adam/Ève pour rejoindre la Bible » n'est pas sourçable ; « Adam et Ève ne se sont jamais rencontrés » doit être formulé « pas un couple, pas nécessairement contemporains » ; « meilleur survit » et les adaptations de forme des yeux sont à nuancer.

### Points à nuancer (non bloquants)
- **Nombre de galaxies (~2 × 10¹²)** [Dossier IV] : estimation modèle-dépendante, contestée (cf. New Horizons/Lauer 2021) — garder le « ≈ », signaler « estimation ».
- **% d'extinction** [IV & I] : préciser le **niveau taxonomique** (espèces vs genres) ; la « Grande Mort » varie ~81–96 % selon les études — harmoniser carte (~95 %) et JS (~90–96 %).
- **Première vie ~3,8 Ga**, **photosynthèse oxygénique**, **maîtrise du feu ~800 ka**, **statut « animal » de la biote d'Ediacara** : sujets authentiquement débattus — formulations déjà prudentes, à conserver telles quelles.
- **Dossier III — Artemis II :** étonnamment à jour (mission réellement volée du 1ᵉʳ au 11 avril 2026, architecture NASA de février 2026 intégrée). Approximations mineures : poussée RS-25, libellé « 67 signataires » (États ; ESA = agence partenaire).

## Arithmétique vérifiée
- **Calendrier cosmique** (Dossier IV) : sapiens → 23 h 48 min 34 s (≈ « 23 h 49 »), agriculture → 23 h 59 min 32 s, écriture → ~11 s, industrie → ~0,6 s — **tous exacts**.
- **Horloge SVG du Résumé des Ères** (Dossier I) : géométriquement exacte ; proportions de la frise justes au dixième près.
