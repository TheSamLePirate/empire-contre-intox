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

> Données brutes fournies par l'auteur : `sources_audit_scientifique_chronos.csv`.

### Sources scientifiques — littérature primaire (DOI)

Couche « sources scientifiques » : **~76 articles à comité de lecture, DOI vérifiés** (résolution Crossref + page éditeur ; aucun DOI inventé). C'est l'appareil de référence le plus strict.

| Fichier | DOI | Couverture |
|---|---|---|
| [`refs-doi-1-cosmologie.md`](refs-doi-1-cosmologie.md) | 11 | Planck 2018, Fixsen (CMB), BBN, Guth, Madau & Dickinson, Robertson, Curtis-Lake (JWST), Conselice/Lauer |
| [`refs-doi-2-terre-vie-precambrien.md`](refs-doi-2-terre-vie-precambrien.md) | 18 | Connelly, Patterson, Canup & Asphaug, Wilde/Valley, Nutman/Dodd/Allwood, Lyons, Gumsley, Gibson (Bangiomorpha), Li, Hoffman |
| [`refs-doi-3-phanerozoique-extinctions.md`](refs-doi-3-phanerozoique-extinctions.md) | 15 | GTS2020, Raup & Sepkoski, Stanley, Burgess, Schulte/Alvarez (Chicxulub), Renne/Schoene/Sprain (Deccan), Nesbitt, Zachos |
| [`refs-doi-4-humanite-ediacarien.md`](refs-doi-4-humanite-ediacarien.md) | 15 | Hublin/Richter (Jebel Irhoud), Harmand (Lomekwi), Villmoare, Brunet/Daver, Bobrovskiy, Fedonkin, Bengtson, Knoll, Mills |
| [`refs-doi-5-lune-artemis.md`](refs-doi-5-lune-artemis.md) | 6 | Colaprete (LCROSS), Li, Honniball, Hayne, Pieters (M³), Hauri |
| [`refs-doi-V-elements.md`](refs-doi-V-elements.md) | 11 | Stern-Gerlach 1922, Thomson 1904, Rutherford 1911, Bohr 1913, Chadwick 1932, Englert-Brout & Higgs 1964, ATLAS & CMS 2012, Dyson (QED), Hon & Goldstein |

> Pièges à DOI détectés et corrigés par les agents : Kimberella (Fedonkin) `10.1038/42242` (et non 41048), Daver 2022, Renne 2015 `…aac7549`, Zachos 2001 `…1059412`. Les bornes ICS n'ont pas de DOI d'article unique → référence = GTS2020 (DOI volume) + charte officielle ICS.

## Bilan global

Aucune **erreur factuelle franche (❌)** détectée dans l'ensemble des dossiers. Les grands repères sont corrects et sourcés. Restent des points *à nuancer* et **quelques corrections de cohérence/d'actualisation** :

### Corrections recommandées (concrètes)
1. **`horloge-univers/chronos.html` — reproduction sexuée :** affiche encore **~1,2 Ga** à 3 endroits (carte « cellule complexe » + chip, `SEGMENTS`, tableau des éons), alors que `events.json` porte la valeur à jour **1,047 Ga** (Bangiomorpha, Gibson et al. 2018). → aligner sur **1,047 Ga** (bascule Mésoprotérozoïque → Tonien/Néoprotérozoïque).
2. **`ymir-lalie/resume-eres.html` — base du Cambrien :** indiquée à **541 Ma** ; valeur ICS actuelle = **538,8 Ma**. → actualiser.
3. **`ymir-lalie/edicarien.html` — coquille :** « Vandobiontes » → orthographe correcte **« Vendobionta »** (Seilacher).

### Dossier V — Le Tableau Périodique (corrections déjà appliquées dans la page)
- **E₃ de l'hydrogène : −1,21 → −1,51 eV** (❌ erreur numérique de la présentation source) — **corrigé**.
- **« Souffre » → « Soufre »** (Z=16) — orthographe correcte employée.
- **« 25 particules »** reformulé en « 17 (ou 25 en comptant les 8 gluons) » ; **neutrino** : « seules particules de matière sans charge » ; **proton** : nuance 1911 (noyau) vs ~1919-20 (proton) ; **H ≈ 90 %** cosmique + « **croûte** terrestre » ; **astate** métalloïde nuancé ; gaz nobles « quasiment pas d'ions ». Détail : [`dossier-V-elements.md`](dossier-V-elements.md).

### Points à nuancer (non bloquants)
- **Nombre de galaxies (~2 × 10¹²)** [Dossier IV] : estimation modèle-dépendante, contestée (cf. New Horizons/Lauer 2021) — garder le « ≈ », signaler « estimation ».
- **% d'extinction** [IV & I] : préciser le **niveau taxonomique** (espèces vs genres) ; la « Grande Mort » varie ~81–96 % selon les études — harmoniser carte (~95 %) et JS (~90–96 %).
- **Première vie ~3,8 Ga**, **photosynthèse oxygénique**, **maîtrise du feu ~800 ka**, **statut « animal » de la biote d'Ediacara** : sujets authentiquement débattus — formulations déjà prudentes, à conserver telles quelles.
- **Dossier III — Artemis II :** étonnamment à jour (mission réellement volée du 1ᵉʳ au 11 avril 2026, architecture NASA de février 2026 intégrée). Approximations mineures : poussée RS-25, libellé « 67 signataires » (États ; ESA = agence partenaire).

## Arithmétique vérifiée
- **Calendrier cosmique** (Dossier IV) : sapiens → 23 h 48 min 34 s (≈ « 23 h 49 »), agriculture → 23 h 59 min 32 s, écriture → ~11 s, industrie → ~0,6 s — **tous exacts**.
- **Horloge SVG du Résumé des Ères** (Dossier I) : géométriquement exacte ; proportions de la frise justes au dixième près.
