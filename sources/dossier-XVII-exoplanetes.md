# Audit — Dossier XVII · « Atmosphères & Mondes Lointains » (Provoxys)

Vérification de chaque donnée chiffrée et affirmation du dossier exoplanètes unifié
(`provoxys/exoplanetes/index.html`), fusion de tous les documents de Provoxys
(script « 20 chapitres » + 8 documents détaillés).

Verdicts : ✅ confirmé · ⚠️ approximatif / à nuancer · 🔶 débattu · ❌ erroné.

> Dossier de **vulgarisation astronomique** : traçabilité par sources autoritatives
> (NASA, ESA, ESO, JPL, NASA Exoplanet Archive, NIST/CODATA) et littérature à comité
> de lecture (DOI vérifiés via Crossref — voir `refs-doi-XVII-exoplanetes.md`).

## A. Physique des atmosphères

| Affirmation | Verdict | Référence | Source(s) |
|---|---|---|---|
| Hydrostatique : `dP/dz = -ρg` | ✅ | Forme standard exacte | [Hydrostatic equilibrium](https://en.wikipedia.org/wiki/Hydrostatic_equilibrium) |
| Gaz parfaits : `P = ρRT/M`, R = 8,31 J·mol⁻¹·K⁻¹ | ✅ | CODATA 2018 : R = 8,314462618 J·mol⁻¹·K⁻¹ | [NIST CODATA](https://physics.nist.gov/cgi-bin/cuu/Value?r) |
| Profil barométrique : `P(z) = P₀ exp(-Mgz/RT)` | ✅ | Cohérent avec hydrostatique + gaz parfaits (T const) ; hauteur d'échelle H = RT/Mg | [Barometric formula](https://en.wikipedia.org/wiki/Barometric_formula) |
| Sans atmosphère, Terre ≈ −18 °C contre +15 °C (effet de serre ≈ 33 °C) | ✅ | T effective 255 K, T surface 288 K (albédo 0,3) | [NASA Earth Observatory](https://earthobservatory.nasa.gov/features/EnergyBalance) |
| Terre 1 bar (78 % N₂, 21 % O₂) ; Mars 0,006 bar (95,3 % CO₂) ; Vénus 92 bar (96,5 % CO₂, ≈ 464 °C) | ✅ | Toutes valeurs conformes aux fiches NASA NSSDCA | [Venus](https://nssdc.gsfc.nasa.gov/planetary/factsheet/venusfact.html) · [Mars](https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html) |
| Couches : troposphère → exosphère ; homosphère/hétérosphère ; ionosphère | ✅ | Terminologie exacte (turbopause ~100 km) | [UCAR SciEd](https://scied.ucar.edu/learning-zone/atmosphere/layers-earths-atmosphere) |
| Transfert radiatif : `dI_ν/dτ_ν = I_ν - S_ν` | ✅ | Forme standard (sans diffusion), fonction source S_ν | [Rybicki & Lightman](https://en.wikipedia.org/wiki/Source_function) |

## B. Instruments & sondes

| Affirmation | Verdict | Référence | Source(s) |
|---|---|---|---|
| HARPS (ESO, 3,6 m, La Silla) ≈ 1 m/s | ✅ | Précision long terme ~1 m/s (≈ 0,97 m/s) | [ESO HARPS](https://www.eso.org/sci/facilities/lasilla/instruments/harps/overview.html) |
| ESPRESSO (VLT) « quelques cm/s » | ⚠️ | **Objectif de conception 10 cm/s** ; démontré ~25 cm/s/nuit, ~50 cm/s sur plusieurs mois | [ESO ESPRESSO](https://www.eso.org/sci/facilities/paranal/instruments/espresso.html) · Pepe et al. 2021 |
| VLT = 4 télescopes de 8,2 m (Paranal) | ✅ | Antu, Kueyen, Melipal, Yepun | [ESO UT](https://www.eso.org/sci/facilities/paranal/telescopes/ut.html) |
| Keck = 2 × 10 m ; Subaru = 8,2 m (Mauna Kea) | ✅ | Keck I (1992), Keck II (1996) ; Subaru (1999) | [Keck](https://en.wikipedia.org/wiki/W._M._Keck_Observatory) |
| JWST : miroir 6,5 m, 18 segments béryllium/or, bouclier 5 couches, point L2, lancé 25 déc. 2021 | ✅ | Tous sous-points confirmés | [Wikipedia JWST](https://en.wikipedia.org/wiki/James_Webb_Space_Telescope) |
| JWST instruments « ~40 K » | ⚠️ | ~40 K = module NIR (ISIM) ; **MIRI < 7 K** (cryorefroidisseur) | [NASA cryocooler](https://science.nasa.gov/mission/webb/cryocooler/) |
| JWST « 10 à 100 000× Spitzer » dans l'IR moyen | ❌→corrigé | Gain réel **10 à 100×** (~100× à 5,6 µm, ~10× à 25 µm). **Page corrigée à « 10 à 100 fois ».** | [A&A MIRI 2024](https://www.aanda.org/articles/aa/full_html/2024/09/aa49451-24/aa49451-24.html) |
| Précisions ppm : Hubble 50-100, Spitzer 100-200, JWST 10-30 | ⚠️ | Ordres de grandeur OK ; distinguer plancher de bruit (HST ~30, Spitzer ~60, JWST < 14 ppm) de la précision/canal (JWST ~50 ppm) | [NIRSpec noise floor](https://arxiv.org/abs/2203.04173) |
| Sondes : MESSENGER (2011-2015), Cassini (1997-2017), New Horizons (Pluton 14 juil. 2015, Arrokoth 1ᵉʳ janv. 2019), Juno (orbite depuis 2016) | ✅ | Dates clés exactes | [Cassini](https://en.wikipedia.org/wiki/Cassini%E2%80%93Huygens) · [New Horizons](https://science.nasa.gov/mission/new-horizons/) |
| BepiColombo (lancée 2018) | ⚠️ | Insertion en orbite de Mercure repoussée au **21 novembre 2026** (JAXA, après la panne propulseur d'avril 2025) | [NASA BepiColombo](https://science.nasa.gov/mission/bepicolombo/) |
| Codes retrieval : petitRADTRANS, TauREx, NEMESIS | ✅ | Tous réels et publiés | [TauREx 3](https://iopscience.iop.org/article/10.3847/1538-4357/ac0252) |
| Vitesses radiales = effet Doppler ; transit = baisse de luminosité | ✅ | Définitions correctes | [ESA — find an exoplanet](https://www.esa.int/Science_Exploration/Space_Science/Exoplanets/How_to_find_an_exoplanet) |

## B-bis. Les quatre télescopes spatiaux pionniers (recherche multi-agents)

| Affirmation | Verdict | Référence | Source(s) |
|---|---|---|---|
| Hubble : lancé 24 avril 1990, miroir 2,4 m, orbite terrestre basse, actif | ✅ (orbite à préciser) | Orbite ~540 km (en déclin ; NASA cite ~483-540 km, déploiement 1990 plus haut). Page : « ~540 km » | [NASA — Hubble](https://science.nasa.gov/mission/hubble/overview/about-hubble/) |
| Hubble : première atmosphère d'exoplanète (sodium, HD 209458 b, 2002) ; carte météo de WASP-43 b (2014) | ✅ | Charbonneau 2002 ; Stevenson 2014 | [DOI 10.1086/338770](https://doi.org/10.1086/338770) · [DOI 10.1126/science.1256758](https://doi.org/10.1126/science.1256758) |
| Spitzer : 2003-2020, miroir 0,85 m, infrarouge ; première chaleur d'exoplanète (2005) ; 7 planètes de TRAPPIST-1 (2017) | ✅ | Charbonneau 2005, Deming 2005, Knutson 2007, Gillon 2017 | [DOI 10.1086/429991](https://doi.org/10.1086/429991) · [DOI 10.1038/nature05782](https://doi.org/10.1038/nature05782) |
| Kepler : lancé 7 mars 2009, retiré 30 oct. 2018, ouverture 0,95 m ; >2 600 planètes ; Kepler-186f (2014) | ✅ | Borucki 2010 ; Quintana 2014 | [DOI 10.1126/science.1185402](https://doi.org/10.1126/science.1185402) · [DOI 10.1126/science.1249403](https://doi.org/10.1126/science.1249403) |
| TESS : lancé 18 avril 2018, 4 caméras (pupille 10,5 cm), orbite 2:1 lunaire ; π Mensae c (2018) | ✅ | Ricker 2015 ; Huang 2018 | [DOI 10.1117/1.JATIS.1.1.014003](https://doi.org/10.1117/1.JATIS.1.1.014003) · [DOI 10.3847/2041-8213/aaef91](https://doi.org/10.3847/2041-8213/aaef91) |
| TESS : « 733 confirmées » | ❌→corrigé | Compteur officiel MIT : **897 confirmées** (juin 2026) et **> 8 000 TOI**. Page : « ~900 confirmées · > 8 000 TOI » | [MIT — TESS](https://tess.mit.edu/publications/) |

## B-ter. Outils au sol — Chapitre 3 enrichi (juin 2026)

Compléments intégrés au chapitre « télescopes au sol » et aux fiches d'annexe (DOI vérifiés via Crossref — voir `refs-doi-XVII-exoplanetes.md`).

| Affirmation | Verdict | Valeur de référence | Source |
|---|---|---|---|
| NIRPS : jumeau infrarouge de HARPS sur le 3,6 m, YJH 0,98–1,8 µm, R≈75–88k, observé simultanément, ~77 cm/s sur Proxima, opérations depuis 2023 | ✅ | Bouchy 2025 ; Proxima : Suárez Mascareño 2025 | [DOI 202453341](https://doi.org/10.1051/0004-6361/202453341) · [DOI 202553728](https://doi.org/10.1051/0004-6361/202553728) |
| ESPRESSO : mode 4-UT = lumière d'un miroir de ~16 m ; 380–686 nm ; < 25 cm/s/nuit ; ~2 mag plus sensible que HARPS | ✅ | Combinaison incohérente des 4 UT ; Pepe et al. 2021 | [ESO ESPRESSO](https://www.eso.org/sci/facilities/paranal/instruments/espresso.html) · [DOI](https://doi.org/10.1051/0004-6361/202038306) |
| GRAVITY : 1ʳᵉ détection d'exoplanète par interférométrie optique (HR 8799 e, 2019), nuages de fer/silicates ; GRAVITY+ en déploiement | ✅ (GRAVITY+ : en cours) | GRAVITY Collaboration 2019 | [DOI 201935253](https://doi.org/10.1051/0004-6361/201935253) |
| HIRES : cellule à iode, 0,3–1,0 µm, ~3 m/s (1996) → ~1,5 m/s (2004) ; GJ 436 b = premier Neptune (2004) | ✅ | Butler et al. 2004 | [DOI 425173](https://doi.org/10.1086/425173) |
| SPHERE : 0,5–2,32 µm ; PDS 70 b et c (planètes en formation) | ✅ | Keppler 2018 (b), Haffert 2019 (c) | [DOI 201832957](https://doi.org/10.1051/0004-6361/201832957) |
| NIRC2 : 1–5 µm, coronographe vortex ; imagerie de HR 8799 | ✅ | Keck NIRC2 | [Keck](https://www2.keck.hawaii.edu/inst/nirc2/) |
| HARPS : > 130 exoplanètes, campagne 2011 (50 planètes / 16 super-Terres), stabilité ~0,01 K, calibration ThAr + peigne laser | ✅ | Communiqué ESO 2011 ; page HARPS | [ESO eso1134](https://www.eso.org/public/news/eso1134/) |
| Proxima b (HARPS, 2016) & Ross 128 b (HARPS, 2018) ; masse de Proxima b affinée par ESPRESSO (~26 cm/s) | ✅ | Anglada-Escudé 2016 ; Bonfils 2018 ; Suárez Mascareño 2020 | [DOI 19106](https://doi.org/10.1038/nature19106) |
| L 98-59 b/c/d rocheuses (HARPS + ESPRESSO) | ✅ | Demangeon et al. 2021 | [DOI 202140728](https://doi.org/10.1051/0004-6361/202140728) |

## C. Statistiques (NASA Exoplanet Archive — valeurs vérifiées au chiffre près)

| Affirmation | Verdict | Référence | Source(s) |
|---|---|---|---|
| 6 298 exoplanètes confirmées (4 juin 2026) | ✅ | Exact (page counts_detail) | [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/docs/counts_detail.html) |
| Par méthode : transit 4 653 (~74 %), VR 1 186, microlentille 278, imagerie 97, TTV 41 | ✅ | Au chiffre près | idem |
| Pics annuels 2014 (1 225) et 2016 (1 671) — validations en masse de Kepler | ✅ | Annonces du 26 fév. 2014 (715) et 10 mai 2016 (1 284) | [Wikipedia — Discoveries](https://en.wikipedia.org/wiki/Discoveries_of_exoplanets) |
| Radius valley : creux à 1,5–2,0 R⊕ (distribution bimodale) | ✅ (à préciser) | Le creux s'étend de ~1,5 à ~2,0 R⊕ (plancher ~1,8) ; pics ~1,3 et ~2,4 R⊕ | [Fulton et al. 2017 (DOI)](https://doi.org/10.3847/1538-3881/aa80eb) |

## C-ter. Géantes de glace & Système solaire externe

| Affirmation | Verdict | Référence | Source(s) |
|---|---|---|---|
| Uranus/Neptune = géantes de glace (noyau rocheux, manteau fluide supercritique eau/ammoniac/méthane, enveloppe H/He) | ✅ | Modèle standard à 3 couches (composition interne exacte = sujet ouvert) | [Ice giant](https://en.wikipedia.org/wiki/Ice_giant) |
| Neptune : vents jusqu'à ~2 100 km/h (record du Système solaire) | ✅ | ≈ 580 m/s, les plus rapides mesurés | [NASA Neptune](https://nssdc.gsfc.nasa.gov/planetary/factsheet/neptunefact.html) |
| Uranus : axe incliné à 98° | ✅ | Obliquité 97,77° | [NASA Uranus](https://nssdc.gsfc.nasa.gov/planetary/factsheet/uranusfact.html) |
| Système solaire formé il y a 4,6 Ga ; petits corps témoins | ✅ | 4,567 Ga (CAI) | [NASA](https://science.nasa.gov/solar-system/our-solar-system-facts/) |
| New Horizons : Pluton (2015), Arrokoth (2019) | ✅ | 14 juillet 2015 ; 1ᵉʳ janvier 2019 | [New Horizons](https://science.nasa.gov/mission/new-horizons/) |

## D. Exoplanètes & découvertes

| Affirmation | Verdict | Référence | Source(s) |
|---|---|---|---|
| 51 Peg b (1995, Mayor & Queloz, OHP, ELODIE, vitesse radiale) — Nobel 2019 | ✅ | Exact ; le Nobel 2019 = **une moitié** (l'autre à J. Peebles) | [Nobel 2019](https://www.nobelprize.org/prizes/physics/2019/summary/) |
| HD 209458 b : premier transit (1999) + première atmosphère (sodium, Hubble STIS) | ⚠️ | Transit observé 1999 (publié 2000) ; **sodium en 2002** (Charbonneau et al.) — dates à séparer | [Charbonneau 2002](https://iopscience.iop.org/article/10.1086/338770) |
| WASP-39 b : CO₂ (1ʳᵉ détection, 2022), SO₂ (1ʳᵉ photochimie), H₂O ; ≈ 1100 K | ✅ | CO₂ : JWST ERS Team, Nature 2022 ; SO₂ : Tsai et al. 2023 ; T ≈ 1116 K | [Nature CO₂](https://www.nature.com/articles/s41586-022-05269-w) · [Nature SO₂](https://www.nature.com/articles/s41586-023-05902-2) |
| WASP-121 b : Fe, Mg, TiO vaporisés ; ≈ 2500 K | ⚠️ | Fe ✅ ; **TiO débattu/probablement absent** ; Mg non détecté directement ; T ≈ 2400 K (équilibre), ~2700 K (jour) | [A&A TiO non-détection](https://www.aanda.org/articles/aa/abs/2020/04/aa37409-19/aa37409-19.html) |
| HD 189733 b : pluies de verre, couleur bleue, vents supersoniques | ✅ | Couleur bleue ✅ (Evans 2013) ; vents 2-5 km/s ✅ (Louden & Wheatley 2015) ; « pluies de verre » = interprétation (silicates) | [Louden & Wheatley 2015](https://doi.org/10.1088/2041-8205/814/2/L24) |
| TRAPPIST-1 : 7 telluriques, naine M ultra-froide, 2016-2017, Gillon, 3 en zone habitable, résonance | ✅ | e/f/g en zone habitable | [Gillon et al. 2017](https://www.nature.com/articles/nature21360) |
| TRAPPIST-1 e « super-Terre » (0,92 R⊕) | ❌→corrigé | 0,92 R⊕ = **taille terrestre**, PAS super-Terre. **Page : encadré anti-intox + tableau « tellurique ».** | [NASA TRAPPIST-1e](https://science.nasa.gov/exoplanet-catalog/trappist-1-e/) |
| JWST sur TRAPPIST-1 b et c : atmosphères très minces/inexistantes | ✅ | Greene et al. 2023 (b) ; Zieba et al. 2023 (c) | [Greene 2023](https://www.nature.com/articles/s41586-023-05951-7) |
| LHS 1140 b : 1,73 R⊕, super-Terre rocheuse enrichie en eau, atmosphère possible | ⚠️ | Rayon ✅ ; « enrichie en eau » = scénario privilégié (monde-océan), non établi ; atmosphère non confirmée | [Cadieux et al. 2024](https://iopscience.iop.org/article/10.3847/2041-8213/ad1691) |
| GJ 1214 b : mini-Neptune, 2,67 R⊕, atmosphère épaisse, nuages/hazes opaques | ✅ | Rayon ✅ ; spectre plat → aérosols opaques (Kreidberg 2014) | [Kreidberg et al. 2014](https://www.nature.com/articles/nature12888) |
| K2-18 b : super-Terre, monde Hycean, DMS détecté par JWST | 🔶→nuancé | **sub-Neptune** (2,6 R⊕, 8,6 M⊕), pas super-Terre ; Hycean = hypothèse ; **DMS contesté (~3σ, non confirmé)**. CH₄/CO₂ ✅. **Page : encadré anti-intox.** | [A&A réanalyse DMS 2025](https://www.aanda.org/articles/aa/full_html/2025/08/aa55580-25/aa55580-25.html) |
| Proxima Centauri b : 2016, ~1,27 M⊕, zone habitable, 4,2 al, étoile éruptive | ✅ | ~1,27 M⊕ = **masse minimale** (m·sin i) ; 4,24 al | [Anglada-Escudé et al. 2016](https://www.nature.com/articles/nature19106) |
| TOI-700 d (TESS, taille terrestre, zone habitable) ; TOI-715 b | ✅ | TOI-700 d ~1,19 R⊕ (1ʳᵉ taille terrestre HZ de TESS) ; TOI-715 b ~1,55 R⊕ (2024) | [NASA TOI-700 d](https://iopscience.iop.org/article/10.3847/1538-3881/aba4b2) |

## E. Statistiques 2026

| Affirmation | Verdict | Référence | Source(s) |
|---|---|---|---|
| « Plus de 5 800 exoplanètes confirmées (juin 2026) » | ⚠️→corrigé | Réel : **6 298 au 4 juin 2026** (cap des 6 000 franchi en 2025). **Page éditoriale : « plus de 6 000 / 6 290 ».** Prompt de Provoxys conservé verbatim. | [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/) |
| Jupiters chauds ≈ 1 % des étoiles de type solaire | ✅ | RV ~1 %, transits Kepler ~0,5 % | [Wright et al. 2012](https://iopscience.iop.org/article/10.1088/0004-637X/753/2/160) |
| Super-Terres/mini-Neptunes les plus fréquentes (naines M) ; Radius Valley ~1,5-2 R⊕ | ✅ | Fulton gap : creux à 1,5-2,0 R⊕ (Fulton et al. 2017, source primaire CKS III) ; se décale selon le type stellaire | [DOI 10.3847/1538-3881/aa80eb](https://doi.org/10.3847/1538-3881/aa80eb) |
| Planètes vagabondes détectées par microlentille | ✅ | Méthode principale (objets non lumineux) | [Science 2026](https://www.science.org/doi/10.1126/science.adv9266) |

## Annexe « Fiches techniques » (recherche multi-agents)

Le dossier comporte une **annexe de 54 fiches techniques sourcées** (11 instruments au sol — dont **NIRPS**, ajouté en juin 2026 —, 10 télescopes/missions spatiales, 7 sondes, 11 planètes du Système solaire, 15 exoplanètes), produites par recherche multi-agents puis vérification adversariale. Chaque fiche porte sa propre source institutionnelle (NASA, ESA, ESO, NASA Exoplanet Archive) et, le cas échéant, un DOI vérifié. Corrections appliquées après vérification : Keck I (1ʳᵉ lumière **1990**, pas 1992) ; HIRES (mise en service **1995**) ; PLATO (lancement **fin 2026**) ; Voyager (vitesses distinctes, V1 ~17 km/s) ; Neptune (période **164,8 ans**) ; Uranus (**84,0 ans**) ; Tau Boötis b (5,95 M_Jup = **masse vraie**, pas minimale) ; 51 Peg b (rayon **~1,07 R_Jup**, estimé). Le reste des valeurs (planètes NSSDC, exoplanètes NASA Exoplanet Archive) a été confirmé au chiffre près.

## Synthèse

- **❌ 2 (corrigés)** : (1) JWST « 10 à 100 000× Spitzer » → **10 à 100×** (page corrigée) ; (2) **TRAPPIST-1 e « super-Terre »** → tellurique de taille terrestre (encadré anti-intox + tableau corrigé).
- **🔶 1 (nuancé)** : **K2-18 b** — sub-Neptune (pas super-Terre), monde Hycean = hypothèse, **DMS contesté** et non confirmé (encadré anti-intox ; prudence du script conservée).
- **⚠️ 7 (nuancés/signalés)** : ESPRESSO (10 cm/s = objectif) ; JWST MIRI < 7 K ; précisions ppm (plancher vs canal) ; BepiColombo (arrivée ~2026) ; HD 209458 b (sodium 2002) ; WASP-121 b (TiO débattu, T ~2400 K) ; LHS 1140 b (« enrichie en eau » = scénario) ; **5 800 → 6 290 exoplanètes** (compteur réel, page éditoriale corrigée).
- **Tout le reste : ✅ confirmé** — les 7 équations de physique, toutes les valeurs d'atmosphères (Terre/Mars/Vénus), les instruments (HARPS, VLT, Keck, Subaru, JWST), les dates de sondes, les découvertes (51 Peg b, WASP-39 b, TRAPPIST-1), les statistiques d'occurrence.
- **Tout le contenu de Provoxys est conservé** (textes, tableaux, prompts « VISUEL 3D DIRECT », sources, légendes). Les corrections sont en **encadrés anti-intox** sans toucher au texte source.
