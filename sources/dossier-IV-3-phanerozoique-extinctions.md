# Dossier IV — Sources & vérifications · Volet 3 : Phanérozoïque, échelle géologique (ICS) & extinctions de masse

**Dossier :** Horloge de l'Univers (Empire contre Intox)
**Fichiers audités :**
- `horloge-univers/chronos.html` (tableau géologique `table.gts`, tableau JS `SEGMENTS`, section « Les cinq grandes extinctions » avec cartes `.ext-card`, événements vie 20–36)
- `horloge-univers/assets/events.json` (événements 20 à 36)

**Date de l'audit :** 1ᵉʳ juin 2026
**Charte de référence :** International Chronostratigraphic Chart, **IUGS / ICS, version v2023/09** (la version officielle la plus récente publiée sur **stratigraphy.org**, mise à jour de septembre 2023, en vigueur jusqu'à présent). Les valeurs ci-dessous sont celles de cette charte.

> Note méthodologique : les valeurs ont été lues directement dans `chronos.html` — tableau de référence `table.gts` (l. 933–948), tableau JS `SEGMENTS` (l. 1235–1311), époques cénozoïques `CENO_EPOCHS` (l. 1314–1315), cartes `.ext-card` (l. 906–910) — et dans `events.json` (événements 20–36). Le tableau `table.gts` et le tableau `SEGMENTS` portent **exactement les mêmes bornes** (cohérence interne vérifiée : 538,8 / 486,85 / 443,1 / 419,62 / 358,9 / 298,9 / 251,902 / 201,4 / 145,0 / 66,0 / 23,03 / 2,58 / 0,0117 ; le `SEGMENTS` détaille 251,902 là où `table.gts` arrondit à 251,9 — équivalent).

## Légende des verdicts

- ✅ **Exact** — conforme aux valeurs officielles / au consensus scientifique actuel.
- ⚠️ **Imprécis / à nuancer** — globalement juste mais formulation ou chiffre approximatif, nuance manquante.
- 🔶 **Contestable / daté** — chiffre obsolète ou contredit par la charte officielle, à corriger.
- ❌ **Faux** — erreur factuelle.

---

## 1. Bornes de l'échelle des temps géologiques (ICS) — tableau récapitulatif

Bornes affichées dans le dossier (base de chaque système, en Ma = millions d'années) comparées à la charte **IUGS/ICS v2023/09**. La colonne « base de » indique la limite datée (le début de la période).

| Système / unité (base) | Valeur dossier (Ma) | Valeur ICS v2023/09 (Ma) | Incertitude ICS | Verdict |
|---|---|---|---|---|
| **Cambrien** (base, = base du Phanérozoïque) | 538,8 | **538,8** | borne GSSP, non chiffrée d'erreur (estimée) | ✅ |
| **Ordovicien** (base) | 486,85 | **486,85 ± 1,5** | ratifiée 2020, datée | ✅ |
| **Silurien** (base) | 443,1 | **443,1 ± 0,9** (souvent arrondi 443,8 dans anciennes chartes) | datée | ✅ |
| **Dévonien** (base) | 419,62 | **419,62 ± 0,86** (anciennes chartes : 419,2 ± 3,2) | datée, valeur révisée | ✅ |
| **Carbonifère** (base) | 358,9 | **358,9 ± 0,4** | datée | ✅ |
| **Permien** (base) | 298,9 | **298,9 ± 0,15** | datée | ✅ |
| **Trias** (base) | 251,902 | **251,902 ± 0,024** | GSSP daté | ✅ |
| **Jurassique** (base) | 201,4 | **201,4 ± 0,2** (≈ 201,3–201,4) | datée | ✅ |
| **Crétacé** (base) | 145,0 | **145,0** | estimée | ✅ |
| **Paléogène** (base, = limite K–Pg) | 66,0 | **66,0** (66,043 ± 0,043 affiné) | GSSP daté | ✅ |
| **Néogène** (base) | 23,03 | **23,03** | GSSP daté | ✅ |
| **Quaternaire** (base) | 2,58 | **2,58** | GSSP daté (Gélasien) | ✅ |
| **Holocène** (base) | 0,0117 | **0,0117** (11 700 ans b2k) | GSSP daté | ✅ |

**Conclusion bornes : les 13 bornes affichées sont conformes à la charte ICS v2023/09.** ✅ Le dossier utilise visiblement la charte la plus récente (et non d'anciennes valeurs comme 443,8 / 419,2 / 145,5).

### Verdict détaillé sur les TROIS bornes signalées comme incertaines

Ce sont précisément les bornes que la commande demandait de trancher. Réponse :

- **Ordovicien — base : 486,85 Ma.** ✅ **Correct.** La valeur officielle ICS (charte v2023/09) est **486,85 ± 1,5 Ma**. Cette borne (limite Cambrien–Ordovicien, GSSP de Green Point, Terre-Neuve) a été redatée et figure à 486,85 Ma. Le dossier est à jour. (Attention : d'anciens supports indiquent 485,4 Ma — c'est la valeur de chartes plus anciennes ; **486,85 est la valeur courante**.)
- **Silurien — base : 443,1 Ma.** ✅ **Correct.** La valeur ICS v2023/09 est **443,1 ± 0,9 Ma** (limite Ordovicien–Silurien, GSSP de Dob's Linn, Écosse). Les chartes antérieures affichaient 443,8 ± 1,5 ; la valeur révisée 443,1 est la valeur officielle actuelle. Le dossier est à jour.
- **Dévonien — base : 419,62 Ma.** ✅ **Correct.** La valeur ICS v2023/09 est **419,62 ± 0,86 Ma** (limite Silurien–Dévonien, GSSP de Klonk, Tchéquie). Les chartes plus anciennes donnaient 419,2 ± 3,2 ; la valeur 419,62, plus précise, est la valeur officielle actuelle. Le dossier est à jour.

> En résumé : **les trois bornes contestées (486,85 / 443,1 / 419,62) sont les valeurs OFFICIELLES de la charte ICS v2023/09 et sont donc correctes dans le dossier.** Le dossier ne s'est pas trompé en choisissant les valeurs révisées plutôt que les anciennes.

**Sources :**
- IUGS / ICS — *International Chronostratigraphic Chart v2023/09* : https://stratigraphy.org/chart et https://stratigraphy.org/ICSchart/ChronostratChart2023-09.pdf
- ICS, GSSP database (bornes ratifiées et datations) : https://stratigraphy.org/gssps/

---

## 2. Explosion cambrienne (événement 20)

**Claim :** « L'explosion cambrienne (538,8 Ma), début du Phanérozoïque ; squelettes, yeux, prédateurs, apparition des grands plans d'organisation animaux. »

- **Verdict : ✅ Exact (formulation prudente, bien tournée).**
- La base du Cambrien (et donc du Phanérozoïque) est fixée à **538,8 Ma** (GSSP de Fortune Head, Terre-Neuve, défini sur la première apparition du fossile-trace *Treptichnus pedum*). ✅
- L'« explosion cambrienne » proprement dite (diversification rapide des grands plans d'organisation, faunes de type Chengjiang / Burgess) culmine plutôt vers **~520–515 Ma** (étages 3–4 du Cambrien) — donc un peu **après** la base à 538,8. La formulation du dossier (« beaucoup des grands plans d'organisation deviennent visibles dans les fossiles ») reste juste car elle ne fige pas une date unique. ⚠️ nuance mineure : le pic de l'explosion n'est pas exactement à 538,8 mais quelques millions d'années plus tard.

**Sources :**
- ICS chart v2023/09 (base Cambrien = 538,8 Ma) : https://stratigraphy.org/chart
- Erwin & Valentine, *The Cambrian Explosion* (2013) ; synthèse vulgarisée : https://www.nhm.ac.uk/discover/the-cambrian-explosion.html

---

## 3. Les cinq grandes extinctions (« Big Five ») — dates et ampleur

Le dossier (cartes `.ext-card` + events 22, 25, 28, 30, 33) annonce : ~85 % fin Ordovicien · ~75 % Dévonien tardif · ~95 % fin Permien (espèces marines) · ~80 % fin Trias · ~76 % fin Crétacé.

| Crise | Date dossier | Date de référence | Ampleur dossier | Ampleur publiée | Verdict |
|---|---|---|---|---|---|
| 1. Fin Ordovicien (Hirnantien) | 443,8 Ma (event 22) | **~445–443 Ma** | ~85 % espèces | ~85 % des espèces (≈57 % des genres marins) | ✅ |
| 2. Dévonien tardif (Frasnien–Famennien) | 372 Ma (event 25) | **~372 Ma** (crise de Kellwasser) | ~75 % espèces | ~70–80 % des espèces (étalé sur plusieurs pulses) | ✅ |
| 3. Fin Permien (« Grande Mort ») | 252 Ma (event 28) | **251,9 Ma** | ~90–96 % marines (event) / ~95 % (cartes) | jusqu'à ~81–96 % des espèces marines | ✅ |
| 4. Fin Trias (Trias–Jurassique) | 201 Ma (event 30) | **201,4 Ma** | ~80 % espèces | ~76–80 % des espèces | ✅ |
| 5. Fin Crétacé (K–Pg) | 66 Ma (event 33) | **66,0 Ma** | ~76 % espèces (cartes) | ~75–76 % des espèces | ✅ |

**Verdict global : ✅ Exact.** Les cinq dates et les cinq ordres de grandeur correspondent aux estimations classiquement publiées (notamment la compilation de référence Raup & Sepkoski 1982, et les synthèses ultérieures). Deux nuances utiles :

- ⚠️ **Préciser le niveau taxonomique.** Les chiffres élevés (~85 %, ~96 %) sont des **pertes d'espèces** estimées ; les compilations fiables portent souvent sur les **genres** marins (la perte en genres est mécaniquement plus faible). Ex. : fin Ordovicien ≈ 85 % des espèces mais ≈ 57 % des genres ; fin Permien ≈ 96 % des espèces mais ≈ 81–83 % des genres. Le dossier a raison de préciser « espèces marines » pour le Permien — appliquer la même précision aux autres cartes serait un plus.
- ⚠️ **Permien : la fourchette est large.** Le chiffre canonique « ~96 % des espèces marines » (Raup 1979) est une estimation haute par calcul de rarefaction ; les estimations récentes vont plutôt de **~81 % à ~96 %**. L'event 28 (« jusqu'à ~90–96 % ») est donc plus prudent et plus correct que la carte affichant un sec « ~95 % ». Recommandé : harmoniser sur « ~81–96 % des espèces marines ».

**Sources :**
- Raup & Sepkoski (1982), *Mass extinctions in the marine fossil record*, Science 215:1501 : https://www.science.org/doi/10.1126/science.215.4539.1501
- Stanley (2016), *Estimates of the magnitudes of major marine mass extinctions in Earth history*, PNAS : https://www.pnas.org/doi/10.1073/pnas.1613094113
- NHM (synthèse Big Five) : https://www.nhm.ac.uk/discover/mass-extinctions.html

---

## 4. Permien–Trias : la « Grande Mort » et les trapps de Sibérie (event 28)

**Claim :** « Volcanisme sibérien (trapps) : une immense majorité des espèces marines disparaît, peut-être jusqu'à ~90–96 %. La pire crise de toute l'histoire. »

- **Verdict : ✅ Exact.**
- La crise est datée à **251,9 Ma** (limite Permien–Trias, GSSP de Meishan, Chine). ✅
- La cause aujourd'hui largement consensuelle est l'éruption des **trapps de Sibérie** (Siberian Traps), épanchements basaltiques massifs synchrones de la crise, ayant injecté CO₂ et autres volatils → réchauffement, acidification et anoxie océaniques, perturbation du cycle du carbone. ✅
- « La pire crise de toute l'histoire » : ✅ correct, c'est l'extinction de masse la plus sévère du Phanérozoïque.

**Sources :**
- Burgess, Bowring & Shen (2014), *High-precision timeline for Earth's most severe extinction*, PNAS : https://www.pnas.org/doi/10.1073/pnas.1317692111
- USGS / NPS, *The Permian–Triassic extinction* : https://www.nps.gov/subjects/geology/permian-extinction.htm

---

## 5. K–Pg : astéroïde de Chicxulub et trapps du Deccan (event 33)

**Claim :** « Un astéroïde de ~10 km frappe le Yucatán : fin des dinosaures non-aviens. » (date 66 Ma)

- **Verdict : ✅ Exact (impact + Deccan déjà bien traités).**
- Limite K–Pg datée à **66,0 Ma** (≈ 66,043 ± 0,043 Ma). ✅
- L'impacteur de **Chicxulub** (cratère ~180 km, péninsule du Yucatán) est estimé à **~10–14 km** de diamètre. « ~10 km » est dans la fourchette. ✅
- Conséquence : disparition des dinosaures **non-aviens**, ammonites, grands reptiles marins, etc. ✅
- ✅ **Rôle discuté des trapps du Deccan : déjà traité, et bien traité.** La carte `.ext-card` K–Pg écrit : « Astéroïde de ~10 km au Yucatán **(cause principale), peut-être conjugué aux trapps du Deccan (rôle discuté)** : un hiver d'impact planétaire. » C'est exactement la formulation scientifiquement honnête : impact = cause principale (cf. Schulte et al. 2010), Deccan = facteur aggravant débattu. Les épanchements du Deccan (Inde) sont contemporains à ~quelques 100 000 ans près de l'impact ; leur contribution exacte (avant/pendant/après) reste discutée. Rien à corriger.

**Sources :**
- Schulte et al. (2010), *The Chicxulub Asteroid Impact and Mass Extinction at the Cretaceous-Paleogene Boundary*, Science 327:1214 : https://www.science.org/doi/10.1126/science.1177265
- Renne et al. (2013), datation K–Pg 66,043 ± 0,043 Ma, Science : https://www.science.org/doi/10.1126/science.1230492
- USGS, Chicxulub : https://www.usgs.gov/news/featured-story/chicxulub-impact-crater

---

## 6. Dinosaures : apparition, domination, extinction ; oiseaux épargnés (events 29, 30, 33)

**Claims :** apparition au Trias (event 29, daté 230 Ma) ; domination après la crise Trias–Jurassique (~201 Ma, event 30) ; jusqu'à 66 Ma (event 33) ; oiseaux (dinosaures aviens) épargnés.

- **Verdict : ✅ Exact (avec une précision sur la date d'apparition).**
- ⚠️ Les premiers dinosaures vrais apparaissent au **Trias moyen–supérieur, ~245–230 Ma** (ex. *Nyasasaurus* ~245 Ma, débattu ; *Eoraptor*, *Herrerasaurus* ~231 Ma). L'event 29 à **230 Ma** est dans la fourchette basse mais correct ; la commande évoque « ~240–230 Ma », cohérent.
- Domination après la crise **Trias–Jurassique (~201,4 Ma)** : ✅ exact — la crise libère des niches occupées par d'autres archosaures et pseudosuchiens, les dinosaures deviennent dominants au Jurassique.
- Règne jusqu'à **66 Ma** (K–Pg) pour les dinosaures non-aviens : ✅.
- **Oiseaux épargnés :** ✅ les oiseaux sont des dinosaures théropodes aviens ; une lignée survit à K–Pg → seul groupe de dinosaures encore vivant. La formulation « fin des dinosaures **non-aviens** » (event 33) est rigoureuse. ✅

**Sources :**
- Brusatte et al. (2010), *The origin and early radiation of dinosaurs*, Earth-Science Reviews : https://doi.org/10.1016/j.earscirev.2010.04.001
- AMNH, *What killed the dinosaurs / birds are dinosaurs* : https://www.amnh.org/dinosaurs

---

## 7. Premiers oiseaux (Archaeopteryx ~150 Ma) & plantes à fleurs ~130 Ma (events 31, 32)

- **Premiers oiseaux — Archaeopteryx ~150 Ma (event 31).** ✅ Exact. *Archaeopteryx* provient du calcaire de Solnhofen (Allemagne), Jurassique supérieur (Tithonien), **~150 Ma**. C'est un des plus anciens « oiseaux » connus (statut de transition théropode↔oiseau). ✅
- **Plantes à fleurs (angiospermes) ~130 Ma (event 32).** ✅ / ⚠️. Les plus anciens pollens et fossiles d'angiospermes incontestés datent du **Crétacé inférieur, ~135–130 Ma** (ex. *Montsechia*, *Archaefructus* ~125 Ma). Des indices moléculaires et quelques pollens controversés suggèrent une origine plus ancienne (Jurassique, voire Trias), mais le **registre fossile solide commence ~130 Ma**. La valeur du dossier est correcte ; la formulation « apparaissent » est juste tant qu'on parle du registre fossile. ⚠️ nuance : origine possible antérieure encore débattue.

**Sources :**
- Rauhut et al. / Foth (Archaeopteryx, âge Solnhofen) : https://www.nhm.ac.uk/discover/archaeopteryx.html
- Herendeen et al. (2017), *Origins of the angiosperms*, Nature Plants : https://www.nature.com/articles/nplants201715

---

## 8. Plantes terrestres ~470 Ma · tétrapodes hors de l'eau ~375 Ma · forêts & O₂ ~35 % au Carbonifère (events 21, 24, 26)

- **Plantes terrestres ~470 Ma (event 21, Ordovicien).** ✅ Exact. Les plus anciennes spores de plantes terrestres (cryptospores, type bryophytes) datent de l'**Ordovicien moyen, ~470 Ma**. Les plantes vasculaires viennent plus tard (Silurien). La formulation « mousses puis plantes colonisent peu à peu » est juste. ✅
- **Tétrapodes / vertébrés sortent de l'eau ~375 Ma (event 24, Dévonien).** ✅ Exact (avec nuance). *Tiktaalik* (~375 Ma) est une forme de transition ; les premiers vrais tétrapodes (*Acanthostega*, *Ichthyostega*) datent de **~365 Ma**. « La transition s'amorce » à ~375 Ma est correct. ✅ ⚠️ (des traces de pas tétrapodes de Zachełmie, Pologne, ~395 Ma, suggèrent une apparition possiblement plus précoce — débat ouvert).
- **Forêts & insectes géants, O₂ ~35 % au Carbonifère (event 26).** ✅ / ⚠️. Les modèles géochimiques (GEOCARBSULF, Berner) estiment un pic d'O₂ atmosphérique au **Carbonifère supérieur–Permien inférieur** pouvant atteindre **~30–35 %** (contre 21 % aujourd'hui). « ~35 % » est la borne haute des estimations — correct mais à présenter comme une estimation de modèle, pas une mesure. Les insectes géants (*Meganeura*, libellule ~70 cm d'envergure) sont bien attestés et corrélés à cette hyperoxie. ✅

**Sources :**
- Wellman et al. (2003), spores ordoviciennes, Nature : https://www.nature.com/articles/nature01337
- Daeschler, Shubin & Jenkins (2006), *Tiktaalik*, Nature : https://www.nature.com/articles/nature04639
- Berner (2006), GEOCARBSULF / O₂ atmosphérique : https://doi.org/10.1016/j.gca.2005.11.032

---

## 9. Antarctique se couvre de glace ~34 Ma · prairies ~20 Ma (et nuance C4) (event 35, 36)

- **Antarctique gèle ~34 Ma (event 35).** ✅ Exact. La première calotte antarctique majeure se met en place à la **transition Éocène–Oligocène, ~34 Ma** (chute du CO₂, passage de l'« icehouse »). ✅
- **Prairies & expansion des milieux herbeux ~20 Ma (event 36, Néogène).** ✅ / ⚠️ très bien nuancé. Les graminées (Poaceae) existent dès le Crétacé/Paléogène, mais l'**expansion des écosystèmes de prairies** s'étend au Miocène (~20 Ma et après). L'expansion des plantes en **photosynthèse C4** (savanes) est **plus tardive, ~8–6 Ma** (Miocène supérieur). Le dossier précise explicitement « les grandes prairies modernes s'étendent surtout plus tard » → ⚠️ nuance correcte et bienvenue. ✅

**Sources :**
- Zachos et al. (2001), *Trends in global climate*, Science (transition E–O ~34 Ma) : https://www.science.org/doi/10.1126/science.1059412
- Edwards et al. (2010), *The origins of C4 grasslands*, Science : https://www.science.org/doi/10.1126/science.1177216

---

## Synthèse

**Nombre de claims audités : 22** (13 bornes ICS + 9 grands claims thématiques : explosion cambrienne, Big Five, Grande Mort/Sibérie, K–Pg/Chicxulub-Deccan, dinosaures, oiseaux+angiospermes, plantes terrestres+tétrapodes+O₂, Antarctique+prairies).

**Bilan : le dossier est scientifiquement solide et globalement très exact.**

- **Bornes ICS (13/13) : ✅ toutes conformes à la charte IUGS/ICS v2023/09.** Le dossier utilise bien les valeurs révisées les plus récentes (et non d'anciennes valeurs).
- **Verdict sur les 3 bornes signalées comme incertaines — toutes CORRECTES :**
  - **Ordovicien (base) = 486,85 Ma** ✅ (ICS v2023/09 : 486,85 ± 1,5 Ma).
  - **Silurien (base) = 443,1 Ma** ✅ (ICS v2023/09 : 443,1 ± 0,9 Ma ; ancienne valeur 443,8).
  - **Dévonien (base) = 419,62 Ma** ✅ (ICS v2023/09 : 419,62 ± 0,86 Ma ; ancienne valeur 419,2).
- **Extinctions, causes, dates, biologie de l'évolution : ✅ exacts** dans l'ensemble.

**Recommandations (améliorations, pas corrections) :**
1. ⚠️ Préciser le **niveau taxonomique** des % d'extinction (espèces vs genres), au moins en note, pour les cinq cartes — comme déjà fait pour le Permien.
2. ⚠️ Harmoniser le Permien : la carte (~95 %) et l'event 28 (~90–96 %) divergent ; préférer « **~81–96 % des espèces marines** » (fourchette publiée).
3. ⚠️ Présenter le **pic d'O₂ ~35 % au Carbonifère** comme une estimation de modèle (GEOCARBSULF), pas une mesure (la cellule `table.gts` « Forêts, insectes géants, O₂ maximal » est correcte mais elliptique).
4. ✅ K–Pg / Deccan : **rien à faire** — la carte mentionne déjà l'impact comme cause principale et le Deccan comme facteur discuté.

**Aucun verdict ❌ (faux) ni 🔶 (contestable/obsolète) émis.** Le dossier est à jour sur l'échelle ICS et fidèle au consensus paléontologique.

---

*Veritas omnia vincit.*
