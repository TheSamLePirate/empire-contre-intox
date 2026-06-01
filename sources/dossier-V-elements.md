# Audit scientifique — Dossier V · Le Tableau périodique des éléments

**Fichier audité :** `jorge-zalex/elements.html`  
**Dossier :** Jorge & Zalex, d'après la présentation de Jorge  
**Date de l'audit :** 1ᵉʳ juin 2026  
**Méthode :** lecture complète du HTML + recherche bibliographique en 4 lots parallèles : particules/interactions, cosmologie/nucléaire, modèles atomiques/quantique, chimie périodique.

> Les DOI primaires et revues sont dans [`refs-doi-V-elements.md`](refs-doi-V-elements.md). Les constantes et tables vivantes relèvent surtout de NIST/CODATA, PDG, NIST ASD, IUPAC et NNDC : elles sont citées ici par URL, pas forcées dans un DOI d'article.

## Légende

- ✅ **Confirmé** — correct au niveau attendu pour un cours public.
- ⚠️ **À nuancer** — correct dans l'idée, mais formulation trop forte, conventionnelle ou contextuelle.
- 🔶 **Convention variable** — dépend de la définition retenue.
- ❌ **À corriger** — formulation ou donnée incorrecte dans la page.

---

## Synthèse courte

Le dossier est globalement solide et bien structuré : les constantes, les grandes dates, les masses, les abondances primordiales, la chronologie des modèles atomiques, les règles de remplissage et les tendances périodiques sont majoritairement exactes.

Points à corriger ou à renforcer dans le HTML si l'on veut une version scientifiquement stricte :

| Priorité | Passage | Verdict | Correction recommandée |
|---|---|---:|---|
| 1 | Modèle Standard « explique tous les phénomènes observables à l'échelle des particules » | ⚠️ | Dire qu'il décrit très précisément les particules connues et trois interactions, mais reste incomplet : gravité, matière noire, énergie noire, masses des neutrinos. |
| 2 | β : « Z change, la masse non » | ❌ | Remplacer par : « Z change, le nombre de masse **A** ne change pas » ; la masse/énergie nucléaire change. |
| 3 | Born : `dP/dV = |ψ(t)|²` | ❌ | Écrire `dP/dV = |ψ(r,t)|²` ou `dP = |ψ(r,t)|² dV`. |
| 4 | « adresse unique à chaque électron » avec seulement `(n,l,m)` | ⚠️ | Le triplet adresse une orbitale ; l'électron exige aussi `m_s = ±1/2`. |
| 5 | Ions Li⁺/Na⁺/K⁺/F⁻/Cl⁻ « plus stables que l'atome neutre » | ⚠️ | Les cations alcalins sont stabilisés en composé/solution/réseau ; isolément l'ionisation coûte de l'énergie. |
| 6 | `E_n = -13,6·Z*²/n²` avec Slater | ⚠️ | Présenter comme approximation hydrogénoïde avec charge effective estimée, pas loi générale des atomes multiélectroniques. |
| 7 | Gaz nobles « pas de liaison » | ⚠️ | Dire « très peu réactifs » ; Xe et Kr forment des composés sous conditions appropriées. |
| 8 | Métaux de transition `Z=21–30` | 🔶 | Dire « bloc d de la 4ᵉ période » ; selon IUPAC strict, Zn n'est généralement pas un élément de transition. |
| 9 | Affinité électronique « même tendance » | ⚠️ | Ajouter les exceptions majeures : Cl > F, S > O, gaz nobles/alcalino-terreux souvent défavorables. |
| 10 | Stern–Gerlach = preuve directe du spin | ⚠️ | Historiquement : preuve de quantification spatiale ; interprétation moderne : spin de l'électron de valence de l'argent. |

---

## I — Particules élémentaires

### 1. Masse, charge, spin
**Verdict :** ✅/⚠️ Confirmé comme triade pédagogique.  
Une particule élémentaire est caractérisée par des propriétés intrinsèques dont masse, charge et spin. Pour être complet en physique des particules, il faut aussi les nombres quantiques internes : couleur, saveur, isospin faible, hypercharge, etc.  
**Sources :** PDG Review of Particle Physics ; DOE, *The Standard Model of Particle Physics*.

### 2. Charge élémentaire et coulomb
**Verdict :** ✅ Confirmé.  
La charge élémentaire vaut exactement `e = 1,602176634 × 10⁻¹⁹ C` depuis la redéfinition SI.  
**Source :** NIST/CODATA — https://physics.nist.gov/cgi-bin/cuu/Value?e

### 3. Unité de masse atomique
**Verdict :** ✅ Confirmé.  
`1 u = 1,66053906892 × 10⁻²⁷ kg = 931,49410372 MeV/c²` ; les valeurs de la page sont des arrondis corrects.  
**Sources :** NIST/CODATA — https://physics.nist.gov/cgi-bin/cuu/Value?ukg ; https://physics.nist.gov/cgi-bin/cuu/Value?eqmuc2mev

### 4. Masses électron/proton/neutron
**Verdict :** ✅ Confirmé.  
Électron `0,51099895 MeV/c²`, proton `938,272 MeV/c²`, neutron `939,565 MeV/c²`. Le neutron est légèrement plus lourd que le proton ; en β⁻ libre ou nucléaire, l'énergétique dépend aussi des énergies de liaison.  
**Sources :** PDG physical constants ; Fermi 1934 pour la théorie β — DOI `10.1007/BF01351864`.

### 5. Stern–Gerlach
**Verdict :** ✅/⚠️ Confirmé avec nuance historique.  
L'expérience de Stern et Gerlach (Francfort, 1922) montre la quantification spatiale du moment magnétique. L'interprétation en termes de spin électronique est moderne : le concept de spin date de 1925.  
**Source DOI :** Gerlach & Stern 1922 — `10.1007/BF01326983`.

### 6. Applications du spin
**Verdict :** ✅/⚠️ À préciser.  
RMN/IRM et certains qubits exploitent directement le spin. Laser, supraconductivité et superfluidité relèvent plus largement des statistiques quantiques et comportements collectifs.  
**Sources DOI :** Bloch `10.1103/PhysRev.70.460`, Purcell `10.1103/PhysRev.69.37`, Pauli spin-statistique `10.1103/PhysRev.58.716`, BCS `10.1103/PhysRev.108.1175`.

### 7. Matière baryonique
**Verdict :** ✅ Confirmé.  
La matière ordinaire des éléments chimiques est baryonique : protons et neutrons sont des baryons, formés de trois quarks ; la chimie ordinaire combine noyaux et électrons.  
**Sources :** PDG/DOE ; quark model — Gell-Mann `10.1016/S0031-9163(64)92001-3`.

---

## II — Interactions fondamentales

### 8. Modèle Standard et gravité
**Verdict :** ⚠️ Formulation trop forte.  
Le Modèle Standard décrit les particules connues et trois interactions quantiques : électromagnétique, forte, faible. La gravitation n'en fait pas partie ; le modèle minimal ne rend pas compte à lui seul de la matière noire, de l'énergie noire ni des masses de neutrinos.  
**Sources :** DOE, PDG.

### 9. Décompte 17 / 25 particules
**Verdict :** 🔶 Correct si la convention est explicitée.  
Décompte courant : 17 entités fondamentales (12 fermions, photon, gluon, W, Z, Higgs). Décompte 25 si les 8 états de couleur du gluon et W⁺/W⁻ sont séparés.  
**Sources :** PDG particle listings ; DOE Standard Model.

### 10. QED et photon
**Verdict :** ✅ Confirmé.  
Le photon est neutre et de masse nulle ; l'interaction électromagnétique a une portée infinie. Les neutrinos n'ont pas de charge électrique et ne couplent pas à QED.  
**Sources DOI :** Schwinger `10.1103/PhysRev.74.1439`, Feynman `10.1103/PhysRev.76.769`, Dyson `10.1103/PhysRev.75.486`.

### 11. Interaction forte / QCD
**Verdict :** ✅/⚠️ Confirmé avec nuance.  
Quarks porteurs de couleur, 8 gluons, auto-interactions, confinement, hadrons incolores : correct. La portée `~10⁻¹⁵ m` est un ordre de grandeur de l'échelle hadronique/force nucléaire résiduelle ; la QCD confinante n'est pas une force de Yukawa simple.  
**Sources DOI :** Yang–Mills `10.1103/PhysRev.96.191`, Gross & Wilczek `10.1103/PhysRevLett.30.1343`, Politzer `10.1103/PhysRevLett.30.1346`.

### 12. Interaction faible
**Verdict :** ✅/⚠️ Confirmé avec qualifier.  
W± et Z⁰ sont les vecteurs faibles ; W ≈ 80,4 GeV et Z ≈ 91,2 GeV ; portée `~10⁻¹⁸ m`. Les neutrinos ressentent l'interaction faible dans le Modèle Standard, et aussi la gravitation.  
**Sources :** PDG physical constants ; CERN W/Z ; Glashow `10.1016/0029-5582(61)90469-2`, Weinberg `10.1103/PhysRevLett.19.1264`.

### 13. Historique QED, jauge, électrofaible, GIM, QCD, Higgs
**Verdict :** ✅ Confirmé.  
Les dates de la page sont de bons repères : QED 1947–49, Yang–Mills 1954, Glashow 1961, BEH/Higgs 1964, Weinberg 1967, Salam 1968, GIM 1970, QCD/liberté asymptotique 1973, W/Z 1983, boson de Higgs 2012.  
**Sources DOI :** voir [`refs-doi-V-elements.md`](refs-doi-V-elements.md) sections particules.

### 14. β⁻ au niveau quark
**Verdict :** ✅ Confirmé.  
`d → u + W⁻`, puis `W⁻ → e⁻ + anti-ν_e` ; à l'échelle nucléaire, neutron → proton.  
**Sources DOI :** Fermi `10.1007/BF01351864`, Weinberg `10.1103/PhysRevLett.19.1264`.

---

## III — Formation des atomes et cosmologie

### 15. Ères cosmologiques très précoces
**Verdict :** ⚠️ Correct comme récit standard, mais modèle-dépendant.  
Ère de Planck, GUT, inflation, transition électrofaible : les ordres de grandeur sont pédagogiquement acceptables. Les phases Planck/GUT et les mécanismes exacts ne sont pas observés directement.  
**Sources DOI :** PDG Review `10.1103/PhysRevD.110.030001`, Planck 2018 `10.1051/0004-6361/201833910`, Guth `10.1103/PhysRevD.23.347`, Linde `10.1103/PhysRevD.28.679`.

### 16. Inflation
**Verdict :** ✅/⚠️ Cadre standard, pas mesure directe du mécanisme.  
L'inflation explique horizon/platitude ; le facteur `~10²⁶` correspond à un ordre de grandeur/minimum en e-folds, non à une valeur observée unique.  
**Sources DOI :** Guth, Linde, Planck 2018.

### 17. Asymétrie matière–antimatière
**Verdict :** ⚠️ À nuancer.  
L'asymétrie baryonique est observée ; son mécanisme reste inconnu. Les scénarios GUT, leptogenèse ou électrofaibles sont des hypothèses au-delà du Modèle Standard établi.  
**Sources DOI :** Sakharov `10.1070/PU1991v034n05ABEH002497`, Dine & Kusenko `10.1103/RevModPhys.76.1`.

### 18. Découplage des neutrinos et rapport n/p
**Verdict :** ✅ Confirmé.  
Découplage autour de `t ~ 1 s`, `T ~ 10¹⁰ K`. Le rapport neutron/proton est environ `1/6` au freeze-out faible, puis évolue vers `~1/7` avant la BBN effective.  
**Sources DOI :** Mangano `10.1016/j.nuclphysb.2005.09.041`, Cyburt `10.1103/RevModPhys.88.015004`.

### 19. Nucléosynthèse primordiale
**Verdict :** ✅/⚠️ Confirmé, avec timing à préciser.  
Le deutérium devient stable quand la température descend sous `~10⁹ K`, permettant la production de `²H, ³He, ⁴He, ⁷Li`. « Trois minutes » est une formule pédagogique : l'essentiel de l'hélium est produit dans les premières minutes, mais le gel final peut s'étendre davantage.  
**Source DOI :** Cyburt et al. `10.1103/RevModPhys.88.015004`.

### 20. Abondances primordiales H/He
**Verdict :** ✅ Confirmé.  
En masse : environ 75 % hydrogène et 25 % hélium, avec traces D, ³He, ⁷Li. Par nombre d'atomes, les pourcentages changent ; il faut toujours préciser masse vs nombre.  
**Sources DOI :** Cyburt 2016 ; Planck 2018.

### 21. Recombinaison / FDC
**Verdict :** ✅ Confirmé.  
Âge `~370–380 ka`, température `~3000 K`, redshift `z ~ 1090` : formation des atomes neutres, découplage photonique et fond diffus cosmologique. Transition étalée, pas instant ponctuel.  
**Sources DOI :** Peebles `10.1086/149628`, Seager `10.1086/312250`, `10.1086/313388`, Planck 2018, Penzias & Wilson `10.1086/148307`.

### 22. Élément et isotope
**Verdict :** ✅ Confirmé.  
Un élément est défini par son numéro atomique `Z` ; des isotopes ont même `Z` et nombres de neutrons/nombres de masse différents.  
**Sources DOI :** IUPAC Gold Book `10.1351/goldbook.C01022`, `10.1351/goldbook.I03331`.

### 23. Abondances Univers / croûte / corps humain
**Verdict :** ✅/⚠️ Correct si les conventions sont explicites.  
Univers : distinguer fraction massique primordiale et abondance par nombre. Croûte terrestre : O/Si/Al/Fe dominent ; ne pas confondre avec la Terre entière, dominée par le fer. Corps humain : O/C/H/N dominent par masse.  
**Sources DOI :** Asplund `10.1146/annurev.astro.46.060407.145222`, Wang et al. corps humain `10.1152/ajpendo.1991.261.2.E190`; IUPAC/NIST pour masses et isotopes.

---

## IV — Stabilité nucléaire et radioactivité

### 24. α, β, γ
**Verdict :** ✅/❌.  
α : émission d'un noyau `⁴He`, `Z − 2`, `A − 4`. β : conversion neutron/proton via interaction faible ; **Z change et le nombre de masse A reste inchangé**, pas « la masse ». γ : désexcitation par photon, `Z` et `A` inchangés.  
**Sources DOI :** Rutherford & Soddy `10.1080/14786440309462960`, Fermi `10.1007/BF01351864`, Pfützner `10.1103/RevModPhys.84.567`.

### 25. Vallée de stabilité
**Verdict :** ✅ Confirmé avec métaphore pédagogique.  
Les noyaux stables forment une bande dans le plan `N–Z`; les noyaux instables évoluent vers des états plus stables par β, α, capture électronique, fission, émission n/p selon le cas.  
**Sources :** NNDC NuDat ; Pfützner `10.1103/RevModPhys.84.567`.

### 26. Datation radiométrique
**Verdict :** ✅/⚠️ Correct mais conditions à rappeler.  
La datation radiométrique repose sur demi-vies connues et rapports parent/fils ; elle suppose un système adapté et maîtrisé : fermeture, état initial, corrections et choix du chronomètre.  
**Sources DOI :** Libby `10.1126/science.110.2869.678`, Patterson `10.1016/0016-7037(56)90036-9`, Dickin `10.1017/9781316163009.002`.

---

## V — Modèles de l'atome

### 27. Atomisme antique
**Verdict :** ✅/⚠️ Correct comme récit grec simplifié.  
Leucippe/Démocrite, Lucrèce et Aristote sont correctement situés. Nuance : l'atomisme antique n'est pas expérimental et il existe d'autres traditions atomistes.  
**Source :** Stanford Encyclopedia of Philosophy, *Ancient Atomism* — https://plato.stanford.edu/entries/atomism-ancient/

### 28. Dalton
**Verdict :** ✅/⚠️ Confirmé.  
Dalton fonde la théorie atomique moderne (1803–1808). « Chaque élément = un type d'atome » est correct chimiquement, mais Dalton ignorait isotopes et numéros atomiques.  
**Source :** Dalton, *A New System of Chemical Philosophy* (ouvrage sans DOI).

### 29. Thomson, Rutherford, Bohr, Schrödinger, Born, Chadwick
**Verdict :** ✅ Confirmé avec nuances historiques.  
Thomson 1904 ; Geiger–Marsden/Rutherford 1909–1911 ; Bohr 1913 pour H et ions hydrogénoïdes ; Schrödinger 1926 ; Born 1926 ; Chadwick 1932.  
**Sources DOI :** Thomson `10.1080/14786440409463107`, Geiger–Marsden `10.1098/rspa.1909.0054`, Rutherford `10.1080/14786440508637080`, Bohr `10.1080/14786441308634955`, Schrödinger `10.1002/andp.19263840404`, Born `10.1007/BF01397477`, Chadwick `10.1038/129312a0` et `10.1098/rspa.1932.0112`.

### 30. Proton après 1911
**Verdict :** ✅ Confirmé.  
1911 établit le noyau ; le proton est identifié/nommé plus tard, autour de 1919–1920.  
**Source DOI :** Rutherford 1919 `10.1080/14786440608635919`.

---

## VI — Structure électronique

### 31. Modèle de Bohr et niveaux de H
**Verdict :** ✅ Confirmé.  
`L = n h/2π`, `E_n = -13,6/n² eV`, `r_n = a₀n²`, `a₀ = 0,529 Å` : correct pour l'hydrogène/ions hydrogénoïdes avec arrondis. Les niveaux affichés `E₁` à `E₅` sont cohérents, notamment `E₃ = -1,51 eV`.  
**Sources DOI/URL :** Bohr `10.1080/14786441308634955`, NIST CODATA `a₀`, NIST Rydberg, NIST ASD `10.18434/T4W30F`.

### 32. Absorption/émission et raies spectrales
**Verdict :** ✅ Confirmé.  
Un photon absorbé/émis correspond à l'écart d'énergie entre niveaux. Les spectres identifient des éléments à distance, avec dépendance aux conditions physiques : température, ionisation, pression, abondances et décalage spectral.  
**Sources :** NIST ASD ; Bohr 1913.

### 33. Orbitales et nombres quantiques
**Verdict :** ✅/⚠️ Confirmé avec précision.  
Orbitales `ψ_{n,l,m_l}` ; `l = 0,1,2,3 → s,p,d,f`; `m_l = -l…+l`, donc `2l+1` orbitales : s 1, p 3, d 5, f 7. Le triplet décrit une orbitale ; le spin `m_s` distingue les deux électrons possibles.  
**Sources DOI :** Schrödinger `10.1002/andp.19263840404`, Born `10.1007/BF01397477`, Pauli `10.1007/BF02980631`, NIST spectroscopy compendium.

---

## VII — Structure du tableau périodique

### 34. Klechkowski/Madelung, Hund, Pauli
**Verdict :** ✅/⚠️ Correct comme règles de remplissage empiriques.  
Elles rationalisent l'essentiel de l'architecture du tableau, mais ne sont pas des lois exactes universelles. Cr et Cu sont correctement notés comme exceptions.  
**Sources DOI :** Pauli `10.1007/BF02980631`, Hund `10.1007/BF01400218` / `10.1007/BF01494853`, Madelung/Aufbau `10.1021/ed056p714`, Schwarz & Rich `10.1021/ed800124m`.

### 35. Configurations Z = 1–36
**Verdict :** ✅ Confirmé.  
La séquence H → Kr est correcte, y compris Cr `[Ar]3d⁵4s¹` et Cu `[Ar]3d¹⁰4s¹`.  
**Source :** NIST Atomic Spectra Database — https://physics.nist.gov/PhysRefData/ASD/levels_form.html

### 36. 4s avant 3d
**Verdict :** ✅/⚠️ Correct pour construire la 4ᵉ période, mais simplifié.  
K et Ca remplissent 4s avant 3d ; dans les métaux de transition et lors de l'ionisation, les relations d'énergie 4s/3d dépendent de l'atome/ion.  
**Sources DOI :** Schwarz & Rich `10.1021/ed800124m`, Wang & Schwarz `10.1002/chem.200500945`.

### 37. Stabilité des ions et charge effective
**Verdict :** ⚠️ À reformuler.  
Les configurations de gaz nobles expliquent la stabilité en composés, mais un cation alcalin isolé n'est pas plus stable que l'atome neutre : l'ionisation coûte de l'énergie. Slater donne un écran effectif semi-empirique ; la formule hydrogénoïde avec `Z*` est approximative.  
**Sources DOI/URL :** Slater `10.1103/PhysRev.36.57`, NIST ionization energies, Hotop & Lineberger electron affinities.

### 38. Familles chimiques
**Verdict :** ✅/⚠️ Correct.  
Groupes IUPAC : alcalins 1, alcalino-terreux 2, chalcogènes 16, halogènes 17, gaz nobles 18. Nuances : gaz nobles très peu réactifs mais pas « sans liaison » ; « métaux de transition » dépend de la définition ; astatine est un halogène et son statut de métalloïde est controversé.  
**Sources DOI/URL :** IUPAC periodic table ; group numbering `10.1351/pac198860030431`, metalloids `10.1021/ed3008457`, astatine `10.1021/ed100308w`.

---

## VIII — Propriétés périodiques

### 39. Rayon, ionisation, électronégativité
**Verdict :** ✅ Confirmé comme tendances générales.  
Rayon augmente vers bas/gauche ; énergie d'ionisation et électronégativité augmentent globalement vers haut/droite. Les rayons dépendent de la définition (covalent, métallique, van der Waals).  
**Sources DOI/URL :** Cordero covalent radii `10.1039/B801115J`, NIST ionization energies, Pauling `10.1021/ja01348a011`, Allen `10.1021/ja00207a003`, IUPAC electronegativity `10.1351/goldbook.E01990`.

### 40. Affinité électronique
**Verdict :** ⚠️ Trop simplifié dans la page.  
La tendance générale existe, mais les exceptions sont pédagogiquement importantes : Cl a une affinité électronique plus exothermique que F, S plus que O ; gaz nobles et alcalino-terreux sont atypiques. Il faut préciser la convention de signe.  
**Sources DOI :** Hotop & Lineberger `10.1063/1.555524`, `10.1063/1.555735`, `10.1063/1.556047`; Rienstra-Kiracofe `10.1021/cr990044u`.

### 41. Mendeleïev et prédictions
**Verdict :** ✅ Confirmé.  
Mendeleïev a laissé des cases vides et prédit des propriétés d'éléments inconnus, confirmées ensuite : eka-aluminium/gallium, eka-bore/scandium, eka-silicium/germanium.  
**Source DOI :** historique moderne `10.1098/rsta.2019.0537`; les publications originales du XIXᵉ siècle n'ont pas de DOI usuel.

---

## Sources autoritatives sans DOI à citer directement

- **PDG — Review of Particle Physics :** https://pdg.lbl.gov/
- **NIST/CODATA constants :** https://physics.nist.gov/cuu/Constants/
- **NIST Atomic Spectra Database :** https://physics.nist.gov/PhysRefData/ASD/
- **NIST ionization energies :** https://physics.nist.gov/PhysRefData/ASD/ionEnergy.html
- **IUPAC periodic table :** https://iupac.org/what-we-do/periodic-table-of-elements/
- **IUPAC Gold Book :** https://goldbook.iupac.org/
- **NNDC NuDat :** https://www.nndc.bnl.gov/nudat3/
- **CERN — W/Z/Higgs :** https://home.cern/science/physics/
- **DOE — Standard Model :** https://www.energy.gov/science/doe-explainsthe-standard-model-particle-physics
- **ESA — Cosmic eras :** https://www.esa.int/Science_Exploration/Space_Science/Cosmic_eras
