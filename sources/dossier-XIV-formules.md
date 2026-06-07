# Dossier XIV — « Les Formules de l'Empire »

Dossier **transversal** : il n'introduit **aucune affirmation factuelle nouvelle**. Il
**rassemble, rend en LaTeX (KaTeX) et met en application interactive** les formules
**déjà présentes et déjà sourcées** dans les dossiers d'origine. La vérification de
chaque formule (valeurs par défaut, constantes, ordres de grandeur) relève donc des
audits de ces dossiers ; on rappelle ici l'origine et une **référence canonique** par
formule. Aucune valeur n'a été inventée : les valeurs par défaut des ateliers sont
celles, vérifiées, des dossiers sources.

## Mécanique & espace — d'après *Artemis II* (Provoxys) → `dossier-XII`… / `refs` Artemis

| Formule | Atelier | Origine | Référence canonique |
|---|---|---|---|
| Vis-viva `v=√(μ(2/r−1/a))` | `#lab-visviva` | Artemis II | Mécanique céleste classique (Bate, Mueller & White, *Fundamentals of Astrodynamics*) ; NASA |
| Vitesses orbitale/libération `√(GM/r)`, `√2·v_orb` | `#lab-orbvel` | Artemis II | idem ; μ⊕ = 398 600 km³/s² (NASA/JPL) |
| 2ᵉ loi de Newton `F=ma` | `#lab-newton` | Artemis II | Newton, *Principia* ; manuels de mécanique |
| Tsiolkovsky `Δv=I_sp·g₀·ln(m₀/m_f)` | `#lab-tsiolkovsky` | Artemis II | Tsiolkovsky 1903 ; NASA Glenn (rocket equation) |
| Puissance d'échappement `P=½ṁv_e²` | `#lab-power` | Artemis II | énergie cinétique du jet (manuels de propulsion) |
| Transfert de Hohmann (Δv, angle de phase) | `#lab-hohmann` | Artemis II | Hohmann 1925 ; astrodynamique |
| Loi de l'inverse du carré `I∝1/r²` | `#lab-invsq` | Artemis II | acoustique/optique géométrique |
| Loi de Fourier `q=−k∇T` | `#lab-fourier` | Artemis II | Fourier 1822, *Théorie analytique de la chaleur* |

## Atome & quantique — d'après *Le Tableau Périodique* (Jorge & Zalex)

| Formule | Atelier | Origine | Référence canonique |
|---|---|---|---|
| Masse-énergie `E=mc²` | `#lab-emc2` | Tableau périodique | Einstein 1905 ; CODATA (c = 299 792 458 m/s) |
| Électrolyse `2H₂O→2H₂+O₂` (Faraday) | `#lab-electrolyse` | Périodique · Artemis (ISRU) | loi de Faraday ; masses molaires (H₂O 18, H₂ 2, O₂ 32) |
| Niveaux de Bohr `Eₙ=−13,6 Z*²/n²` | `#lab-bohr` | Tableau périodique | Bohr 1913 ; énergie de Rydberg 13,6 eV (NIST) |
| Rydberg `1/λ=R_H(1/n₁²−1/n₂²)` | `#lab-rydberg` | Tableau périodique | R_H = 1,097×10⁷ m⁻¹ (NIST) ; séries Lyman/Balmer/Paschen |
| Capacité des couches `Σ2(2ℓ+1)=2n²` | `#lab-capacity` | Tableau périodique | principe d'exclusion de Pauli ; règle 2n² |
| Décroissance radioactive `N=N₀e^{−λt}`, `t½=ln2/λ` | `#lab-decay` | Tableau périodique | loi de décroissance ; datation radiométrique |
| Désintégrations α/β/γ | `#lab-transmute` | Tableau périodique | conservation A, Z ; tables des nucléides |
| Règle de Born `dP/dV=|ψ|²` · Schrödinger `Ĥψ=Eψ` | `#lab-born` | Tableau périodique | Born 1926 ; Schrödinger 1926 |

## Champs & lumière — d'après *Le langage des champs* (Samlepirate, d'après 3Blue1Brown)

| Formule | Atelier | Origine | Référence canonique |
|---|---|---|---|
| Gradient `∇f` | `#lab-gradient` | Champs de vecteurs | analyse vectorielle |
| Divergence & rotationnel `∇·F`, `(∇×F)_z` | `#lab-divcurl` | Champs de vecteurs | analyse vectorielle ; 3Blue1Brown |
| Produits scalaire & vectoriel | `#lab-dotcross` | Champs de vecteurs | algèbre linéaire |
| Équations de Maxwell (4) | `#lab-maxwell` | Champs de vecteurs | Maxwell 1865 ; forme moderne de Heaviside |
| Lotka-Volterra `ẋ=αx−βxy`, `ẏ=δxy−γy` | `#lab-lotka` | Champs de vecteurs | Lotka 1925 / Volterra 1926 |

## Atmosphère & vortex — d'après *Tornades, Typhons & Ouragans* (Provoxys) → `dossier-XII`

| Formule | Atelier | Origine | Référence canonique |
|---|---|---|---|
| Coriolis `f=2Ω sinφ` | `#lab-coriolis` | Tornades & cyclones | Ω = 7,292×10⁻⁵ s⁻¹ ; NOAA/NWS |
| CAPE `∫g·ΔT_v/T_v dz` (et `w≈√(2·CAPE)`) | `#lab-cape` | Tornades & cyclones | NSSL/SPC ; thermodynamique de la convection |
| Hélicité `H=∫v·(∇×v)dz` | `#lab-helicity` | Tornades & cyclones | SRH ; seuil ~150 m²/s² (SPC) |

## Courbes & motifs — classiques de géométrie / théorie des nombres

| Formule | Atelier | Référence canonique |
|---|---|---|
| Figures de Lissajous `x=sin(at+δ), y=sin(bt)` | `#lab-lissajous` | Lissajous 1857 ; courbes paramétriques (manuels d'optique/oscilloscopie) |
| Spirographe — hypotrochoïde | `#lab-spirograph` | géométrie des roulettes ; hypotrochoïde (Lawrence, *A Catalog of Special Plane Curves*) |
| Spirale d'Ulam (premiers) | `#lab-ulam` | Ulam 1963 ; Stein, Ulam & Wells, *Amer. Math. Monthly* 1964 — DOI non trouvé, source institutionnelle (MAA) |
| Série de Leibniz `π/4=1−1/3+1/5−…` | `#lab-leibniz` | série de Madhava-Leibniz (XVIIᵉ s.) ; analyse classique |
| Coniques `r=l/(1+e·cosθ)` | `#lab-conics` | équation polaire des coniques ; mécanique céleste (foyer) |

## Compléments aux actes existants — physique classique standard

| Formule | Atelier | Acte | Référence canonique |
|---|---|---|---|
| 2ᵉ loi de Kepler (loi des aires) `dA/dt=L/2m` | `#lab-kepler2` | Espace | Kepler 1609, *Astronomia nova* ; conservation du moment cinétique |
| Énergie orbitale `ε=v²/2−μ/r=−μ/2a` | `#lab-orbenergy` | Espace | intégrale de l'énergie (vis-viva) ; Bate, Mueller & White |
| De Broglie `λ=h/(mv)` | `#lab-debroglie` | Atome | de Broglie 1924 (thèse) ; CODATA (h) |
| Heisenberg `Δx·Δp≥ħ/2` | `#lab-heisenberg` | Atome | Heisenberg 1927 ; Kennard 1927 (borne ħ/2) |
| Effet photoélectrique `K_max=hν−W` | `#lab-photoelectric` | Atome | Einstein 1905 (*Ann. Phys.*) ; Nobel 1921 |
| Choc élastique 1D | `#lab-elasticcollision` | Mécanique | conservation impulsion + énergie cinétique (manuels) |
| Plan incliné `a=g(sinθ−μcosθ)` | `#lab-incline` | Mécanique | lois du frottement de Coulomb-Amontons |
| Levier / moment `F₁d₁=F₂d₂` | `#lab-lever` | Mécanique | Archimède, *De l'équilibre des plans* |
| Résistances série/parallèle | `#lab-resistors` | Électricité | lois de Kirchhoff ; manuels d'électrocinétique |
| Effet Joule `P=UI=RI²=U²/R` | `#lab-joule` | Électricité | Joule 1841 (loi de Joule) |
| Circuit RC `V=V₀(1−e^{−t/RC})` | `#lab-rccircuit` | Électricité | régime transitoire du dipôle RC ; τ=RC |
| Solénoïde `B=μ₀nI` | `#lab-solenoid` | Électromag. | théorème d'Ampère ; μ₀ (CODATA) |

## Informatique & algorithmes — Acte XIV (transversal, classiques CS)

| Formule / notion | Atelier | Référence canonique |
|---|---|---|
| Complexité grand O `O(1)<O(log n)<O(n)<O(n log n)<O(n²)<O(2ⁿ)` | `#lab-bigO` | Bachmann 1894 / Landau ; Knuth, *The Art of Computer Programming* (notation O) |
| Crible d'Ératosthène | `#lab-sieve` | Ératosthène (IIIᵉ s. av. J.-C.) ; algorithmique classique |
| Tris (à bulles, insertion, sélection) `O(n²)` | `#lab-sortviz` | Knuth, *TAOCP* vol. 3, *Sorting and Searching* |

> Toutes ces formules sont des **résultats classiques, antérieurs et universellement
> établis** (manuels de référence). Aucun DOI n'a été inventé ; là où un article fondateur
> existe sans DOI accessible, on cite l'auteur + l'année + la source institutionnelle.

## Synthèse
- **Rien de nouveau n'est affirmé** : ce dossier est un **outil pédagogique** (rendu +
  interactivité). La traçabilité de chaque donnée renvoie au dossier d'origine et à son
  audit (`dossier-*` / `refs-*`).
- Les ateliers interactifs sont des **modèles schématiques** (visualisation), pas des
  simulations de précision — signalé sur la page (`prefers-reduced-motion` respecté,
  notes « schématique »).
- Constantes utilisées (toutes standard) : μ⊕ = 398 600 km³/s², R⊕ = 6 371 km,
  c = 299 792 458 m/s, R_H = 1,097×10⁷ m⁻¹, Rydberg 13,6 eV, Ω = 7,292×10⁻⁵ s⁻¹,
  h = 6,626×10⁻³⁴ J·s, ħ = 1,055×10⁻³⁴ J·s, mₑ = 9,109×10⁻³¹ kg, e = 1,602×10⁻¹⁹ C,
  μ₀ = 1,2566×10⁻⁶ H/m, g₀ = 9,81 m/s² (toutes CODATA / valeurs standard).
