# Sources — Dossier V · Le Tableau Périodique des éléments

**Fichier audité :** `jorge-zalex/elements.html`
**Réalisé par :** Jorge & Zalex (d'après la présentation de **Jorge**)
**Date de l'audit :** 1ᵉʳ juin 2026

> Document de type **cours scientifique** (présentation PowerPoint convertie). L'audit vérifie chaque
> donnée chiffrée, date, nom et affirmation. Vérification par recherche web + **4 agents en parallèle**
> (particules, cosmologie, modèles de l'atome, tableau périodique). Sources autoritatives : NIST/CODATA,
> Particle Data Group (PDG/LBL), CERN, ESA, IUPAC, LibreTexts/Britannica/Stanford ; encyclopédies en appoint.

## Légende des verdicts

- ✅ **Confirmé** — exact au regard des sources autoritatives.
- ⚠️ **Approximatif / à nuancer** — globalement correct mais imprécis ou dépendant du contexte.
- 🔶 **Débattu / convention variable** — la valeur dépend d'une convention ou d'une définition.
- ❌ **Erroné** — incorrect ; **corrigé** dans la page.

---

## I — Les particules élémentaires

### 1. Trois propriétés intrinsèques : masse, charge, spin
**Verdict :** ✅ Confirmé — masse, charge électrique et spin sont les propriétés intrinsèques fondamentales d'une particule.
**Sources :** https://en.wikipedia.org/wiki/Elementary_particle

### 2. Unité de charge = coulomb (C) ; charge élémentaire
**Verdict :** ✅ Confirmé — e = **1,602176634 × 10⁻¹⁹ C** (valeur exacte, SI 2019).
**Sources :** https://physics.nist.gov/cgi-bin/cuu/Value?e

### 3. 1 u = 1,6605 × 10⁻²⁷ kg = 931,5 MeV/c²
**Verdict :** ✅ Confirmé — u = **1,66053906892 × 10⁻²⁷ kg** = **931,49410372 MeV/c²** (CODATA 2022).
**Sources :** https://physics.nist.gov/cgi-bin/cuu/Value?eqmuc2mev · https://physics.nist.gov/cgi-bin/cuu/Value?ukg

### 4. Masses de l'électron, du proton et du neutron
**Verdict :** ✅ Confirmé — e⁻ : **0,51099895 MeV/c²** (9,109 × 10⁻³¹ kg) ; p : **938,272 MeV/c²** (1,67262 × 10⁻²⁷ kg) ; n : **939,565 MeV/c²** (1,67493 × 10⁻²⁷ kg). Le neutron est bien légèrement plus lourd que le proton.
**Sources :** https://pdg.lbl.gov/2024/reviews/rpp2024-rev-phys-constants.pdf

### 5. Expérience de Stern et Gerlach — 1922, Francfort — preuve du spin
**Verdict :** ✅ Confirmé — conçue par Stern (1921), réalisée avec Gerlach à **Francfort en 1922** ; première preuve de la quantification spatiale (signature du spin).
**Sources :** https://en.wikipedia.org/wiki/Stern%E2%80%93Gerlach_experiment

### 6. Applications du spin : RMN, IRM, laser, supraconductivité, superfluidité, qubit
**Verdict :** ⚠️ À nuancer — toutes sont liées au spin **ou à la statistique de spin**, mais par des mécanismes différents : RMN/IRM et qubit exploitent *directement* le spin (nucléaire ou électronique) ; **laser** (photons bosons), **supra-** et **superfluidité** relèvent de la *statistique de spin* (caractère bosonique), pas d'une manipulation directe du spin électronique. La page le présente comme « applications du spin » sans surinterpréter.
**Sources :** https://en.wikipedia.org/wiki/Spin%E2%80%93statistics_theorem

### 7. Les éléments du tableau = matière baryonique ; baryon = hadron de 3 quarks
**Verdict :** ✅ Confirmé — la matière ordinaire (protons, neutrons) est dite « baryonique » ; un baryon est composé de 3 quarks.
**Sources :** https://en.wikipedia.org/wiki/Standard_Model

---

## II — Les quatre interactions fondamentales

### 8. « 25 particules élémentaires » du Modèle Standard
**Verdict :** 🔶 Convention variable — le décompte **standard** est **17** (12 fermions + photon + W + Z + gluon + Higgs, le gluon compté une fois). **25** n'est exact que si l'on compte les **8 états de couleur du gluon** individuellement (12 + 8 + W⁺ + W⁻ + Z⁰ + γ + H = 25). **Correction appliquée :** la page indique « **17 particules fondamentales** (ou 25 en comptant les 8 états de couleur du gluon) ».
**Sources :** https://en.wikipedia.org/wiki/Standard_Model · https://www.energy.gov/science/doe-explainsthe-standard-model-particle-physics

### 9. Interaction EM : photon neutre, masse nulle → portée infinie ; neutrino seul insensible
**Verdict :** ⚠️ À nuancer — photon m = 0 → portée infinie ✅. **Reformulation appliquée :** « les neutrinos sont les **seules particules de matière sans charge électrique** » (au lieu de « seul fermion insensible à l'EM », qui prête à confusion — il y a 3 saveurs de neutrinos).
**Sources :** http://hyperphysics.phy-astr.gsu.edu/hbase/Particles/zeromass.html

### 10. Interaction forte : 8 gluons, charge de couleur, portée ~10⁻¹⁵ m, confinement
**Verdict :** ✅ Confirmé — 8 gluons (octet SU(3)) porteurs de couleur ; portée ~10⁻¹⁵ m ; confinement des quarks ; hadrons « blancs » = baryons (qqq) ou mésons (qq̄).
**Sources :** https://en.wikipedia.org/wiki/Standard_Model

### 11. Interaction faible : W ≈ 80 GeV, Z⁰ ≈ 91 GeV, portée ~10⁻¹⁸ m
**Verdict :** ✅ Confirmé (précisé) — **W = 80,369 GeV/c²**, **Z⁰ = 91,188 GeV/c²** (PDG 2024). La page indique « W ≈ 80,4 GeV, Z⁰ ≈ 91,2 GeV ». Seule interaction ressentie par le neutrino (hormis la gravité, négligeable).
**Sources :** https://pdg.lbl.gov/2025/tables/rpp2025-sum-gauge-higgs-bosons.pdf · https://home.cern/science/physics/z-boson

### 12. Historique (QED 1948 ; Yang-Mills 1954 ; Glashow 1961 ; Weinberg-Salam 1967 ; W/Z 1983 ; GIM 1970 ; QCD ; Higgs 2012)
**Verdict :** ✅ Confirmé — QED renormalisée 1947-49 ; Yang-Mills 1954 ; Glashow 1961 ; Weinberg 1967 ; W/Z découverts **1983** (UA1/UA2, CERN) ; GIM 1970 (quark charme) ; QCD/liberté asymptotique 1973 ; **boson de Higgs observé au LHC le 4 juillet 2012** (ATLAS & CMS).
**Sources :** https://en.wikipedia.org/wiki/Electroweak_interaction · https://en.wikipedia.org/wiki/GIM_mechanism

### 13. Radioactivité β⁻ : quark d → u + W⁻ → e⁻ + ν̄ₑ
**Verdict :** ✅ Confirmé.
**Sources :** https://en.wikipedia.org/wiki/Beta_decay

---

## III — La formation des atomes

### 14. Chronologie des ères cosmiques (Planck, GUT, inflation, électrofaible, quarks, hadronique, leptonique, découplage des neutrinos)
**Verdict :** ⚠️ À nuancer (nomenclature) — les ordres de grandeur sont corrects. **Nuances :** fin de l'inflation plus souvent citée ~10⁻³² s ; l'« ère leptonique » au sens strict est généralement **1 s – 10 s** (l'intervalle 10⁻⁶ s–1 s est la transition hadron→lepton). Découplage des neutrinos ~1 s, **T ≈ 10¹⁰ K** ✅.
**Sources :** https://en.wikipedia.org/wiki/Chronology_of_the_universe

### 15. Rapport neutron/proton gelé ≈ 1 pour 6 (→ ~1:7 à l'entrée de la nucléosynthèse)
**Verdict :** ✅ Confirmé — gel à (n/p) ≈ 1/6 (T_f ≈ 0,8 MeV), évoluant vers ≈ 1/7 par désintégration des neutrons libres.
**Sources :** https://people.ast.cam.ac.uk/~pettini/Intro%20Cosmology/Lecture08.pdf

### 16. Nucléosynthèse primordiale : t < 3 min, T < 10⁹ K ; produits ²H, ³He, ⁴He, ⁷Li
**Verdict :** ✅ Confirmé.
**Sources :** https://en.wikipedia.org/wiki/Big_Bang_nucleosynthesis · https://pdg.lbl.gov/

### 17. Recombinaison ≈ 380 000 ans, T ≈ 3000 K → premiers atomes → fond diffus cosmologique
**Verdict :** ✅ Confirmé.
**Sources :** https://www.esa.int/Science_Exploration/Space_Science/Cosmic_eras

### 18. Bilan : ≈ 75 % hydrogène, ≈ 25 % hélium (en masse), traces de D/³He/⁷Li
**Verdict :** ✅ Confirmé — fraction de masse d'⁴He Y_p ≈ 0,247 (~24–25 %). La page précise bien « **en masse** ».
**Sources :** https://en.wikipedia.org/wiki/Big_Bang_nucleosynthesis

### 19. Élément = numéro atomique Z (protons) ; isotope = composition du noyau (p + n)
**Verdict :** ✅ Confirmé.
**Sources :** https://en.wikipedia.org/wiki/Chemical_element

### 20. Abondances : Univers ~H ; croûte terrestre O/Si/Al/Fe ; corps humain O/C/H
**Verdict :** ⚠️ À nuancer — **corrections appliquées** : (a) l'abondance cosmique d'hydrogène est **≈ 90 % des atomes** (et non 93 %) — la page écrit désormais « ≈ 90 % des atomes » ; (b) les pourcentages O ~50 %, Si ~26 %, Al ~7 %, Fe ~4 % correspondent à la **croûte terrestre**, *pas* à la Terre entière (où le fer domine, ~32 %) — la page précise désormais « la **croûte** terrestre ». Composition du corps humain (O 65 %, C 18 %, H 10 %…) ✅.
**Sources :** https://en.wikipedia.org/wiki/Abundance_of_the_chemical_elements · https://en.wikipedia.org/wiki/Composition_of_the_human_body

---

## IV — La stabilité des atomes

### 21. Radioactivités α (noyau d'⁴He), β (n↔p + e∓ + (anti)ν), γ (photon de désexcitation)
**Verdict :** ✅ Confirmé — α : perte de 2 en Z et 4 en A ; β : interaction faible, Z change ; γ : ni Z ni A ne changent.
**Sources :** https://en.wikipedia.org/wiki/Radioactive_decay

### 22. Vallée de la stabilité (diagramme N–Z)
**Verdict :** ✅ Confirmé — les noyaux stables forment une bande étroite ; les noyaux instables y « retombent » par désintégrations.
**Sources :** https://en.wikipedia.org/wiki/Valley_of_stability

---

## V — Les modèles de l'atome

### 23. Leucippe & Démocrite (V<sup>e</sup> s. av. J.-C.) ; Lucrèce (I<sup>er</sup> s. av. J.-C.) ; Aristote (384–322) continuité + 4 éléments
**Verdict :** ✅ Confirmé (date Démocrite nuancée) — attributions correctes. La présentation source datait Démocrite « 450–360 av. J.-C. » ; la valeur standard est **~460–370 av. J.-C.** La page évite la date précise (« V<sup>e</sup> siècle av. J.-C. »).
**Sources :** https://plato.stanford.edu/entries/atomism-ancient/ · https://www.britannica.com/science/atom/Development-of-atomic-theory

### 24. Dalton 1803–1808 (chaque élément = un type d'atome)
**Verdict :** ✅ Confirmé — théorie développée dès 1803, publiée dans *A New System of Chemical Philosophy* (1808).
**Sources :** https://www.britannica.com/biography/John-Dalton/Atomic-theory

### 25. Thomson 1904 — modèle du « plum pudding »
**Verdict :** ✅ Confirmé — *Philosophical Magazine* (1904), Ser. 6, vol. 7, p. 237–265.
**Sources :** https://en.wikipedia.org/wiki/Plum_pudding_model

### 26. Rutherford 1911 — « découverte du proton »
**Verdict :** ⚠️ À nuancer — Rutherford découvre en 1911 le **noyau** (diffusion α sur feuille d'or). Le **proton** est identifié vers **1919** (bombardement de l'azote) et **nommé en 1920**. **Nuance appliquée** dans la page : « le nom et l'identification du proton viendront un peu plus tard, vers 1917–1920 ».
**Sources :** https://www.aps.org/apsnews/2006/05/rutherford-discovery-atomic-nucleus · https://en.wikipedia.org/wiki/Proton

### 27. Bohr 1913 ; modèle quantique (ψ, |ψ|², 3 nombres quantiques) ; Chadwick 1932 (neutron)
**Verdict :** ✅ Confirmé — Bohr 1913 ; règle de Born dP/dV = |ψ|² ; orbitale = (n, l, m) ; neutron annoncé par Chadwick en **mai 1932**.
**Sources :** https://www.britannica.com/science/Bohr-model · https://www.aps.org/apsnews/2007/05/may-1932-chadwick-discovery-neutron

---

## VI — La structure électronique des atomes

### 28. Bohr (H) : L = mvr = n·h/2π ; Eₙ = −13,6/n² eV ; rₙ = a₀n² ; a₀ = 0,529 Å
**Verdict :** ✅ Confirmé — a₀ = **5,29177 × 10⁻¹¹ m = 0,529 Å** (CODATA 2022) ; 13,6 eV = énergie d'ionisation de H.
**Sources :** https://physics.nist.gov/cgi-bin/cuu/Value?bohrrada0 · https://courses.lumenlearning.com/suny-physics/chapter/30-3-bohrs-theory-of-the-hydrogen-atom/

### 29. Niveaux d'énergie de H : E₁ = −13,6 ; E₂ = −3,4 ; **E₃** ; E₄ = −0,85 ; E₅ = −0,54 eV
**Verdict :** ❌ Erroné (corrigé) — la présentation source affichait **E₃ = −1,21 eV**. La valeur correcte est **−13,6/9 = −1,51 eV**. **Correction appliquée** dans la page (E₃ = −1,51 eV). Les autres valeurs sont exactes.
**Sources :** https://courses.lumenlearning.com/suny-physics/chapter/30-3-bohrs-theory-of-the-hydrogen-atom/

### 30. Orbitales : ψ_{n,l,m} (Schrödinger) ; l = 0/1/2/3 → s/p/d/f ; orbitales par sous-couche s:1 p:3 d:5 f:7
**Verdict :** ✅ Confirmé — nombre d'orbitales = 2l + 1.
**Sources :** https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Inorganic_Chemistry_(LibreTexts)/02:_Atomic_Structure

---

## VII — La structure du Tableau périodique

### 31. Règles de remplissage : Klechkowski (n+l croissant), Hund, Pauli
**Verdict :** ✅ Confirmé — ordre 1s, 2s, 2p, 3s, 3p, **4s avant 3d**, … **Nuance appliquée** : la règle de Klechkowski connaît des **exceptions** (Cr = [Ar]3d⁵4s¹, Cu = [Ar]3d¹⁰4s¹), signalées dans la page.
**Sources :** https://en.wikipedia.org/wiki/Aufbau_principle · https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Electronic_Structure_of_Atoms_and_Molecules/Electronic_Configurations/The_Order_of_Filling_3d_and_4s_Orbitals

### 32. Longueur des lignes : 2 (H,He) ; 8 (Li→Ne) ; 8 (Na→Ar, n=3 partiellement rempli) ; 18 (K→Kr)
**Verdict :** ✅ Confirmé — la formulation « n=3 partiellement rempli » pour l'argon ([Ne]3s²3p⁶, 3d vide) est **exacte** ; période 4 = 4s + 3d(10) + 4p = 18.
**Sources :** https://chem.libretexts.org/Bookshelves/General_Chemistry/Map:_Chemistry_-_The_Central_Science_(Brown_et_al.)/02:_Atoms_Molecules_and_Ions/2.05:_The_Periodic_Table

### 33. Symboles & noms Z = 1 → 36
**Verdict :** ✅ Confirmé (1 coquille dans la source) — séquence correcte. La présentation source écrivait « **Souffre** » (Z=16) ; l'orthographe correcte est « **Soufre** ». La page utilise l'orthographe correcte.
**Sources :** https://fr.wikipedia.org/wiki/Soufre

### 34. Familles : alcalins (col. 1), halogènes (col. 17), gaz nobles (col. 18), alcalino-terreux (col. 2), chalcogènes (col. 16)
**Verdict :** ✅ Confirmé (1 nuance) — classification IUPAC correcte. **Nuance appliquée :** « gaz nobles → pas d'ions » est une simplification ; la page écrit « ne forment **quasiment** pas d'ions » (Xe/Kr forment des composés en conditions extrêmes).
**Sources :** https://en.wikipedia.org/wiki/Group_(periodic_table)

### 35. Métaux de transition (Z 21–30), lanthanides (57–71), actinides (89–103), terres rares (Sc+Y+lanthanides), métalloïdes (B, Si, Ge, As, Sb, Te, At)
**Verdict :** ⚠️ À nuancer — lanthanides/actinides/terres rares ✅. **Nuance appliquée :** l'**astate (At)** n'est classé métalloïde que par *certaines* sources (souvent rangé avec les halogènes) ; la page le signale. Les 6 métalloïdes consensuels : B, Si, Ge, As, Sb, Te.
**Sources :** https://en.wikipedia.org/wiki/Metalloid · https://en.wikipedia.org/wiki/Rare-earth_element

### 36. Eₙ = −13,6 · Z*²/n² (charge effective, Slater)
**Verdict :** ✅ Confirmé — formule hydrogénoïde avec Z* = Z − S (écran de Slater).
**Sources :** https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Map:_Inorganic_Chemistry_(Housecroft)

---

## VIII — Les propriétés périodiques

### 37. Rayon atomique, énergie d'ionisation, électronégativité, affinité électronique (directions)
**Verdict :** ✅ Confirmé — à travers une période (→) : rayon ↓, EI ↑, électronégativité ↑ ; en descendant un groupe (↓) : rayon ↑, EI ↓, électronégativité ↓. Électronégativité maximale pour le fluor.
**Sources :** https://www.acs.org/content/dam/acsorg/education/students/highschool/chemistryclubs/infographics/mastering-periodic-trends-infographic.pdf

### 38. Mendeleïev a prédit des éléments à partir des régularités (cases vides)
**Verdict :** ✅ Confirmé — Mendeleïev (1869) a laissé des cases vides et prédit les propriétés d'éléments inconnus (eka-aluminium = gallium, eka-silicium = germanium), confirmés ensuite.
**Sources :** https://www.britannica.com/science/periodic-table/The-periodic-system

---

## Synthèse

**Aucune erreur factuelle franche subsistante.** Sur ~38 affirmations vérifiées, **une seule erreur numérique (❌)** a été détectée et **corrigée**, plus quelques nuances de formulation appliquées :

| # | Point | Nature | Action sur la page |
|---|---|---|---|
| 29 | E₃ de l'hydrogène : −1,21 → **−1,51 eV** | ❌ Erreur numérique (source) | **Corrigé** |
| 33 | « Souffre » → « **Soufre** » (Z=16) | Coquille (source) | Orthographe correcte employée |
| 8 | « 25 particules » | 🔶 Convention | Reformulé « **17** (ou 25 avec les 8 gluons) » |
| 9 | Neutrino « seul fermion insensible à l'EM » | ⚠️ Imprécis | Reformulé « seules particules de matière sans charge » |
| 26 | Proton « découvert en 1911 » | ⚠️ Conflation | Nuance ajoutée (proton ~1919–1920) |
| 20 | H ≈ 93 % cosmique ; Terre O/Si/Al/Fe | ⚠️ Imprécis / croûte | Corrigé « ≈ 90 % » + « **croûte** terrestre » |
| 35 | Astate métalloïde | ⚠️ Débattu | Nuancé « selon certaines sources » |
| 34 | Gaz nobles « pas d'ions » | ⚠️ Simplification | Nuancé « ne forment quasiment pas d'ions » |
| 14 | « Ère leptonique » 10⁻⁶–1 s | ⚠️ Nomenclature | Mentionnée comme transition (ordres de grandeur conservés) |
| 23 | Démocrite « 450–360 av. J.-C. » | ⚠️ Date | Page : « V<sup>e</sup> siècle av. J.-C. » |

Voir les **références primaires (DOI vérifiés)** dans [`refs-doi-V-elements.md`](refs-doi-V-elements.md).
