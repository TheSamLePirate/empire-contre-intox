# Proposition de plan — Dossier « Sondes & satellites » (Provoxys)

> Document de travail. **Aucun dossier n'est créé** : ceci est une proposition de
> structure issue de la lecture intégrale des 7 fichiers de `a_traiter/provox-sondes/`.
> À valider / amender avant de lancer la skill `/nouveau-dossier`.

---

## 1. Ce que contient le corpus (lecture des 7 fichiers)

Le dossier source mélange **un script narratif** (la vraie « transcription ») et
**plusieurs dossiers de fiches techniques** qui se recoupent largement. Cartographie :

| Fichier | Rôle | Contenu unique | Statut |
|---|---|---|---|
| `script_complet_odyssee_univers_1957_2030.txt` (192 l.) | **Script maître — colonne vertébrale** | Récit en **6 actes**, fiches Sputnik/Telstar/Hubble/Starlink/Voyager/Cassini, **différences satellite/sonde/télescope**, télescopes au sol, futur 2026-2030 | Le « déroulé » à conserver verbatim |
| `Dossier_Sondes.txt` (188 l.) | Recherche détaillée — sondes « pionnières » | Fiches **Luna 3, Luna 9, Mars 3, Mars Express, Rosetta** (absentes du script), + détails New Horizons/Pioneer/Voyager | Apparat technique |
| `Dossier_Satellites_Complet_2026.md` (328 l.) | Recherche détaillée — compilation | Fiches **Lunokhod 1/2, Parker Solar Probe, JWST, SMILE, Europa Clipper, Mars Sample Return** | Apparat technique |
| `Dossier_Sondes_Futures_Principales_MMX…txt` (128 l.) | Futur — 5 sondes phares | **MMX, Dragonfly, Rosalind Franklin, Tianwen-3, DESTINY+** | Apparat technique |
| `Dossier_Complet_Sondes_Futures…4K…txt` (150 l.) | Futur — 6 missions | **NEO Surveyor, Comet Interceptor, EnVision, DAVINCI, VERITAS, Chang'e-7/8 & Chandrayaan-4** | Apparat technique |
| `Dossier_SOHO_Complet…txt` (45 l.) | Une sonde isolée | Fiche **SOHO** (observatoire solaire à L1) | Apparat technique |
| `Sources_Completes…txt` (107 l.) | Appareil critique | **Toutes les URLs sources** (NASA/ESA/JAXA/CNSA/ISRO + Wikipédia) | Base du Dossier V |

**Constat clé :** il n'y a pas UN transcript propre mais **un script + 6 annexes de
recherche** rédigées par une IA (les fichiers portent des chemins `/home/workdir/...`,
des prompts 4K copie-collé, des formules « sans aucun résumé », « je génère sans
restriction »). Le **script maître** est le texte narratif à préserver ; les annexes
sont la **matière des fiches techniques** à fondre dans la page.

---

## 2. Identité du dossier proposée

- **Auteur / voie de design :** **Provoxys** → **Voie B** (identité visuelle propre,
  comme `provoxys/Artemis2.html` : Bricolage Grotesque / Newsreader / JetBrains Mono,
  accents orange/teal sur nuit). **Intégration ECI obligatoire** (lien « Accueil ECI »
  + bandeau collectif + devise *Veritas omnia vincit*).
- **Dossier n° :** ce serait le **VI** (après V « Les Sources »). Mettre à jour
  compteurs (`<b>VI</b> dossiers`, « Six dossiers… »), nav, décret, RSS.
- **Emplacement :** `provoxys/` (nouveau fichier HTML + `provoxys/assets/` pour les hero).
- **Titres possibles** (à trancher) :
  1. **« L'Odyssée de l'humanité vers l'Univers »** (titre du script) — *Sputnik 1957 → 2030+*
  2. **« Sentinelles, voyageuses et grands yeux »** — satellites · sondes · télescopes
  3. **« 1957 → 2030 : la machinerie de l'exploration »**
- **Sous-titre / promesse :** distinguer rigoureusement **satellite ≠ sonde ≠ télescope
  (spatial / au sol)**, et dérouler 70 ans d'ingénierie, fiche par fiche, du premier
  bip de Sputnik aux rotors de Dragonfly sur Titan.

---

## 3. Décision éditoriale centrale (à valider)

**Le script maître = texte verbatim** (colonne vertébrale narrative, 6 actes).
**Les 6 fichiers d'annexes = fiches techniques** surfacées en encadrés/cartes le long du récit.

Conséquences à acter avant production :

- **Dédoublonnage assumé.** Plusieurs engins apparaissent dans 2-3 fichiers avec des
  chiffres légèrement différents (voir §7). On retient **une fiche canonique par engin**,
  vérifiée, et on signale les écarts corrigés.
- **Le script ne mentionne pas** Luna 9, Mars 3, Mars Express, Rosetta, Lunokhod,
  Parker, JWST, SMILE, SOHO, ni la plupart des sondes futures détaillées → ce sont des
  **enrichissements** issus des annexes. Choix à faire : **(a)** étendre le récit pour
  les intégrer dans les actes, ou **(b)** les regrouper dans une **galerie de fiches**
  filtrable annexée à chaque acte. → *Recommandation : (b)*, pour ne pas dénaturer le
  script verbatim tout en n'« oubliant » aucun engin.
- **Les « prompts 4K » et chemins `/home/workdir/...` ne sont PAS du contenu éditorial** :
  ce sont des consignes de génération d'images. Ils sortent du verbatim publié et
  alimentent le brief images (§8).

---

## 4. Plan détaillé de la page (structure recommandée)

Page codex immersive **mono-page** (récit) **+ catalogue interactif** (toutes les fiches),
avec topbar sticky, barre de progression, et une **frise temporelle SVG 1957→2030+**.

### Hero
Titre + sous-titre, image hero (champ d'engins en orbite / Voyager dans le noir), CTA
« Lire l'odyssée » + « Accueil ECI ». Eyebrow « Dossier VI ».

### Intro — « Trois familles, une quête »
Pose d'emblée la **distinction pédagogique maîtresse** (le fil rouge anti-intox) :

- **Satellite** : reste en orbite d'un corps, mission continue/répétée, parfois
  réparable/remplaçable.
- **Sonde** : quitte l'attraction terrestre, voyage interplanétaire/interstellaire,
  autonomie extrême, souvent sans retour.
- **Télescope spatial** (Hubble, JWST) : vision parfaite, diamètre limité par le lancement.
- **Télescope au sol** : diamètres géants (39 m), mais corrige l'atmosphère (optique
  adaptative). → *Un encadré « comparateur » récurrent.*

### Acte I — L'aube de l'ère spatiale (1957-1962)
- **Sputnik 1** (URSS, 4 oct. 1957) — fiche complète (AMG6T, batteries Ag-Zn, 20/40 MHz).
- **Explorer 1** (USA, 31 jan. 1958) — ceintures de Van Allen.
- **Telstar 1** (AT&T/Bell/NASA, 10 juil. 1962) — 1ʳᵉ TV transatlantique.
- *Encadré pédagogique :* satellite expérimental → opérationnel.

### Acte II — Les satellites (1957→2026)
- **Orbites** (LEO/MEO/GEO) et **rôles** (com, navigation, observation, science, militaire).
- **Télescope spatial Hubble** (1990, β=2,4 m) — *à reclasser visuellement comme
  télescope spatial, pas simple satellite.*
- **Communications :** Intelsat (1965+), Iridium (66 sats).
- **Observation Terre :** Landsat 1→9 (1972-2021), Copernicus/Sentinel.
- **Navigation :** GPS, Galileo, GLONASS, BeiDou.
- **Starlink V2 mini** (SpaceX, 2019+) — fiche + **dataviz constellation** (⚠ chiffres
  volatils, voir §7).
- *Fiches annexes rattachables :* **SMILE** (ESA/CAS, 2026), **JWST** (télescope spatial).

### Acte III — Les sondes (1959→aujourd'hui)
Types : flyby, orbiter, lander, rover, sample return. Communication via Deep Space Network.
- **Programme Luna** : Luna 1/2/3 (1959) — *Luna 3 : face cachée de la Lune.*
- **Pioneer 10 & 11** (1972-73) — ceinture d'astéroïdes, Jupiter/Saturne, plaque Pioneer.
- **Voyager 1 & 2** (1977) — Grand Tour + interstellaire, **Golden Record**.
- **Viking 1 & 2** (1976) — 1ᵉʳˢ atterrissages Mars réussis.
- **Cassini-Huygens** (1997-2017) — Saturne + Titan.
- **New Horizons** (2006) — Pluton/Charon + Arrokoth.
- **Juno** (2011) — Jupiter, sonde à énergie solaire.
- **Perseverance + Ingenuity** (2020) — rover + 1ᵉʳ vol motorisé extraterrestre.
- *Fiches annexes rattachables :* **Luna 9** (1966, 1ᵉʳ atterrissage mou Lune),
  **Mars 3** (1971), **Lunokhod 1/2** (1970-73, 1ᵉʳˢ rovers), **Mars Express** (2003),
  **Rosetta + Philae** (2004, comète 67P), **Parker Solar Probe** (2018), **SOHO**
  (1995, observatoire solaire à L1), **Europa Clipper** (2024, arrivée 2030).

### Acte IV — Les télescopes au sol
- **Hale** (Palomar, 1948/49, 5,08 m Pyrex).
- **Keck I & II** (1993/96, 10 m segmentés).
- **VLT** (ESO, 4×8,2 m + VLTI).
- **GTC** (10,4 m, 2007).
- **ELT** (ESO, 39 m, 1ᵉʳ jour technique ~2028-2029, science ~2030) — **dataviz
  comparaison de diamètres de miroirs**.
- **GMT** (25,4 m) · **TMT** (30 m, statut incertain).
- **Radio :** Arecibo (305 m, effondré 2020), FAST (500 m, Chine), VLA, SKA.

### Acte V — Missions actuelles 2026 & projets futurs 2026-2030+
- **Habité :** Artemis II (2026), Artemis III (~2027-28), Lunar Gateway, base lunaire.
- **Télescopes :** Nancy Grace Roman (2,4 m), PLATO (ESA, déc. 2026), Xuntian (Chine).
- **Sondes futures** (carte filtrable) : **MMX** (JAXA, 2026, Phobos), **Dragonfly**
  (NASA, 2028, Titan), **Rosalind Franklin/ExoMars** (ESA, 2028), **Tianwen-3** (CNSA,
  2028, retour Mars), **DESTINY+** (JAXA, 2028, Phaethon), **NEO Surveyor** (NASA,
  2027+), **Comet Interceptor** (ESA, 2029), **EnVision/DAVINCI/VERITAS** (Vénus,
  2029-2031), **Chang'e-7/8** (CNSA, 2026/2028), **Chandrayaan-4** (ISRO, 2027).
- **Mars Sample Return** (NASA/ESA) — *en pause/restructuration (coûts >11 Md$)* : à
  traiter avec prudence (statut mouvant).

### Acte VI — Conclusion
« Satellites en orbite, sondes au loin, grands yeux au sol » — synthèse + ouverture.

### Bandeau crédit + collective-footer ECI + footer technique.

---

## 5. Dataviz proposées (force du dossier, style horloge-univers)

1. **Frise temporelle interactive 1957→2030+** — axe log ou segmenté, **3 pistes**
   (satellites / sondes / télescopes), nœuds cliquables ouvrant la fiche. *Pièce
   maîtresse.* Pilotée par un `events.json` (cf. modèle `horloge-univers/`).
2. **Comparateur satellite vs sonde vs télescope** — tableau/diagramme animé des
   différences (orbite, autonomie, retour, communication, durée de vie).
3. **Échelle des miroirs** — Hale 5 m → Keck 10 m → VLT 8,2 m → ELT 39 m → FAST 500 m :
   ruban de proportions réelles (`flex` proportionnel, cf. frise des ères).
4. **Carte du Système solaire** — où est chaque sonde (Vénus, Mars, Jupiter, Saturne,
   Pluton, interstellaire) : petits marqueurs positionnés.
5. **Constellation Starlink** — densité orbitale (chiffres à sourcer/nuancer).

> *Option « dossier piloté par données » : tenir un `provoxys/assets/engins.json`
> canonique (nom, type, agence, année, statut, masse, cible) alimentant frise +
> catalogue filtrable, sur le modèle d'`events.json`.*

---

## 6. Catalogue filtrable (pour n'« oublier » aucun engin)

Vu le volume (**~60 engins**), proposer en complément du récit un **explorateur**
filtrable par : **type** (satellite / sonde / télescope sol / télescope spatial) ·
**agence** (NASA/ESA/URSS-Roscosmos/JAXA/CNSA/ISRO/SpaceX) · **décennie** · **statut**
(actif / terminé / futur). Chaque carte → fiche technique (matériaux, composants,
mission, données). C'est ce qui transforme les 6 annexes en valeur consultable.

**Inventaire complet recensé (à fiche unique chacun) :**

> Sputnik 1 · Explorer 1 · Telstar 1 · Intelsat · Iridium · Landsat 1-9 · Sentinel ·
> GPS · Galileo · GLONASS · BeiDou · Starlink · Hubble · JWST · SMILE · SOHO ·
> Luna 1/2/3 · Luna 9 · Lunokhod 1/2 · Mars 3 · Pioneer 10/11 · Viking 1/2 · Voyager 1/2 ·
> Mars Express · Rosetta-Philae · Cassini-Huygens · New Horizons · Juno · Parker Solar
> Probe · Perseverance-Ingenuity · Europa Clipper · Hale · Keck I/II · VLT · GTC · ELT ·
> GMT · TMT · Arecibo · FAST · VLA · SKA · Artemis II/III · Nancy Grace Roman · PLATO ·
> Xuntian · MMX · Dragonfly · Rosalind Franklin · Tianwen-3 · DESTINY+ · NEO Surveyor ·
> Comet Interceptor · EnVision · DAVINCI · VERITAS · Chang'e-7/8 · Chandrayaan-4 ·
> Mars Sample Return.

---

## 7. Vérification & sources (Dossier V) — points chauds repérés

Le corpus est globalement plausible mais rédigé par IA : **tout re-vérifier** (agents
en parallèle, sources NASA/ESA/JAXA/CNSA/ISRO d'abord). Écarts/risques déjà repérés :

- **Incohérences internes à arbitrer :**
  - Voyager 1, masse : **815 kg** (Dossier_Satellites) vs **~825 kg** (script + Dossier_Sondes).
  - Hubble, observations : **« >1 million »** (script) vs **« >1,5 million »** (Dossier_Satellites).
  - Voyager, distance/vitesse en 2026 (172,6 UA / 17 km·s⁻¹) : à dater précisément.
- **Chiffres volatils (mettre des fourchettes + date) :** comptes **Starlink**
  (~10 400–10 700 en orbite, 12 283 déployés, ~12 M abonnés) ; nombre de comètes SOHO
  (>5 000) ; vols Ingenuity (72) ; km Perseverance (>42).
- **Dates « futures » incertaines (marqueurs de prudence) :** Dragonfly (NET juil. 2028,
  arrivée **2034**) ; MMX (fin 2026) ; ELT (1ʳᵉ lumière ~2028-2030) ; Artemis III
  (~2027-28) ; Roman/PLATO/Xuntian (fin 2026-2027) ; Vénus EnVision/VERITAS (~2031) ;
  **Mars Sample Return en pause** ; TMT/GMT financement incertain.
- **Sources déjà fournies** dans `Sources_Completes…txt` (URLs NASA/ESA/JAXA/CNSA/ISRO) :
  bonne base de départ pour `sources/dossier-VI-sondes.md` + `refs-doi-VI-sondes.md`.
  **Règle absolue anti-hallucination DOI** (vérif Crossref) à appliquer.
- Produire : `sources/dossier-VI-*.md` (affirmation→verdict→source), `refs-doi-VI-*.md`,
  et alimenter `sources/sources.html` (fiches + références + compteurs).

---

## 8. Images à générer (brief Codex, en parallèle)

⚠ **Toutes les images référencées dans les annexes sont inaccessibles** : chemins
`/home/workdir/artifacts/searched_images/*.jpg` et `…/imagine_images/*.jpg` d'un autre
environnement → **à régénérer**. Le corpus fournit déjà des **prompts 4K copie-collé**
réutilisables (Sputnik, Voyager, Cassini, ELT, Hubble, Perseverance, NEO Surveyor,
Comet Interceptor, EnVision, DAVINCI, SOHO, Starlink…).

À briefer dans `images_a_generer.md` (style Provoxys, ratio cohérent) :
- **1 hero** de dossier + **hero de carte d'index** (16:10).
- 1 visuel par **acte** (5-6) + idéalement 1 vignette par **fiche phare** (Sputnik,
  Voyager+Golden Record, Cassini-Huygens, ELT, Starlink, Dragonfly, JWST, Parker…).
- Réutiliser les prompts existants ; **prudence factuelle** (composants réels, pas de
  texte erroné dans l'image).

---

## 9. Intégration ECI, index, RSS, checklist

- **`index.html`** : nouvelle carte (image hero, « Dossier VI », titre, description,
  3 tags, lien `provoxys/<fichier>.html`, byline Provoxys + participation Samlepirate).
  Mettre à jour **compteurs** (`<b>VI</b>`, « Six dossiers… »), nav, `#decret`, menu footer.
- **`rss.xml`** : régénérer via `python3 scripts/generate-rss.py` après l'index, vérifier
  bien formé + bon nombre d'items. Stager `rss.xml` **avec** `index.html`.
- **Intégration ECI Voie B** : `.eci-home` (nav) + `.eci-collective` (bandeau pied) +
  devise, en reprenant les variables CSS de la page Provoxys.
- **Crédit** Provoxys (avatars `provoxys.jpeg` / `samlepirate.jpeg`) sur la carte ET dans
  la page (bandeau crédit + collective-footer).
- **Vérif finale** : images chargées, liens, pas de scroll horizontal, numérotation/
  compteurs cohérents, frise = catalogue (mêmes données), sources surfacées.

---

## 10. Découpage de production proposé (quand on lancera `/nouveau-dossier`)

1. Trancher : titre, voie B confirmée, mono-page + catalogue, intégrer ou annexer les
   engins hors-script (§3).
2. Établir l'**`engins.json` canonique** (~60 entrées) = socle frise + catalogue.
3. Monter la page : script verbatim (6 actes) + fiches en encadrés + dataviz.
4. **Vérification factuelle** (agents //) → corrections + `sources/` + `sources.html`.
5. Brief **images** à Codex (en //) → intégration.
6. Index + RSS + checklist finale.

---

## 11. Décisions à prendre (questions ouvertes)

1. **Titre** du dossier (3 pistes au §2) ?
2. **Engins hors-script** (Luna 9, Rosetta, SOHO, Parker, JWST, futures…) : **intégrés
   au récit** ou regroupés en **catalogue de fiches** ? *(reco : catalogue)*
3. **Mono-page** riche, ou **multi-pages** type `horloge-univers/` (récit + frise +
   catalogue séparés) ? *(reco : mono-page + frise + explorateur intégré)*
4. Niveau de détail des **fiches techniques** : toutes les ~60, ou un **noyau de fiches
   phares** + liste compacte pour le reste ?
5. Profondeur de la **dataviz** : la frise seule, ou frise + comparateur + échelle
   miroirs + carte Système solaire ?
