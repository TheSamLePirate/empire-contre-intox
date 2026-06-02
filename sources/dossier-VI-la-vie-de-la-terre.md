# Dossier VI — La Vie de la Terre

Audit léger du dossier et de l'application externe **La Vie de la Terre** (`https://thesamlepirate.github.io/la-vie-de-la-terre/`).

L'utilisateur a précisé que l'application est déjà basée sur des données sourcées : cet audit s'appuie donc principalement sur les documents internes de l'app (`DATA_SOURCES.md`, `data/INVENTORY.md`, page `#sources`) et ne refait pas une recherche web exhaustive.

**Légende :** ✅ confirmé · ⚠️ approximatif / à nuancer · 🔶 débattu · ❌ erroné

## Vérifications principales

| Affirmation / donnée | Verdict | Valeur de référence / nuance | Source(s) |
|---|---:|---|---|
| L'application couvre l'histoire terrestre de **4,54 Ga au présent**. | ✅ | Âge standard de la Terre ≈ 4,54 Ga ; le dossier reprend cette échelle. | USGS — Age of the Earth : https://pubs.usgs.gov/gip/geotime/age.html ; app `DATA_SOURCES.md` |
| Le globe utilise **201 heightmaps PNG 16-bit** de 0 à 1 Ga. | ✅ | `manifest.json` indique `count: 201`, `age_range_Ma: [0, 1000]`, encodage uint16. | App `data/INVENTORY.md` ; `heightmaps/manifest.json` |
| Les cartes 0–540 Ma viennent de **PALEOMAP PaleoDEMs**. | ✅ | 109 cartes topo/bathy, grille 1°×1°, converties en heightmaps. | EarthByte PaleoDEM : https://www.earthbyte.org/paleodem-resource-scotese-and-wright-2018/ ; Zenodo : https://doi.org/10.5281/zenodo.5460860 |
| Les cartes 540–1000 Ma sont des **masques schématiques** issus de Merdith et al. 2021. | ✅ | Les positions continentales sont reconstruites via pyGPlates ; pas de relief fiable sur cette période. | Merdith et al. 2021, Earth-Science Reviews : https://doi.org/10.1016/j.earscirev.2020.103477 ; Zenodo : https://zenodo.org/records/13635864 |
| Avant 1 Ga, le globe est **stylisé** et non cartographique. | ✅ | Formulation prudente : la tectonique profonde est trop incertaine pour prétendre à une carte détaillée. | App page `#sources` ; `DATA_SOURCES.md` |
| Les séries temporelles unifiées sont au nombre de **10**. | ✅ | `timeseries.json` contient : température PhanDA, température temps profond, CO₂ PhanDA/Foster/GEOCARBSULF, O₂ GEOCARBSULF/Précambrien, CH₄, composition, durée du jour. | App `data/INVENTORY.md` ; `data/timeseries.json` |
| La température 0–485 Ma utilise **PhanDA / Judd et al. 2024**. | ✅ | Reconstruction par assimilation de données ; l'app conserve les percentiles d'incertitude. | Judd et al. 2024, *Science* : https://doi.org/10.1126/science.adk3705 ; PhanDA : https://github.com/EJJudd/PhanDA |
| Le CO₂ affiche trois méthodes : PhanDA, Foster 2017, GEOCARBSULF. | ✅ | Bon choix pédagogique : afficher plusieurs reconstructions évite de faire croire à une courbe unique absolue. | Foster et al. 2017 : https://doi.org/10.1038/ncomms14845 ; Berner 2006 : https://doi.org/10.1016/j.gca.2005.11.032 ; Judd et al. 2024 |
| L'O₂ combine GEOCARBSULF pour le Phanérozoïque et des ancrages pour le Précambrien. | ✅ | Les niveaux précambriens sont fortement incertains ; la page les présente comme ancrages / consensus. | Lyons et al. 2014 : https://doi.org/10.1038/nature13068 ; Berner 2006 |
| Le CH₄ et la composition atmosphérique profonde sont **estimés**. | ✅ | Aucune mesure directe possible : les valeurs sont des ancrages de modèles, correctement signalés. | Catling & Zahnle 2020 : https://doi.org/10.1126/sciadv.aax1420 ; Krissansen-Totton et al. 2018 : https://doi.org/10.1073/pnas.1721296115 |
| La durée du jour combine proxies géologiques et modèles Terre-Lune. | ✅ | Rythmites / sclérochronologie + modèles Farhat ; palier protérozoïque ~19 h à présenter comme reconstruction. | Williams 2000 : https://doi.org/10.1029/1999RG900016 ; Farhat et al. 2022 : https://doi.org/10.1051/0004-6361/202243445 ; Mitchell & Kirscher 2023 : https://doi.org/10.1038/s41561-023-01202-6 |
| Le pipeline est reproductible via scripts Python. | ✅ | Les scripts listés couvrent extraction Foster, GEOCARBSULF, heightmaps, masques paléo et unification JSON. | App `scripts/` ; `data/INVENTORY.md` |
| Les événements de l'app sont des repères de narration. | ⚠️ | Certains sujets restent débattus (première vie, Grand bombardement tardif, photosynthèse oxygénique, % d'extinction). Le dossier conserve les formulations prudentes. | Sources déjà listées dans les audits Dossier IV + app `events.ts` |

## Synthèse

- ✅ Le nouveau dossier reprend fidèlement la logique de l'app : **mesuré / modélisé / estimé**.
- ✅ Les chiffres visibles du dossier (4,54 Ga, 201 cartes, 10 séries, 45 événements) correspondent aux fichiers ou au code de l'application.
- ⚠️ Les périodes très anciennes (>1 Ga) et plusieurs événements biologiques/climatiques gardent une incertitude forte ; la page les présente comme reconstructions ou estimations, pas comme mesures directes.
- ❌ Aucune erreur factuelle détectée dans le périmètre de ce dossier léger.
