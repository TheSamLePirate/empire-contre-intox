# Dossier XXV — L'Entropie, le temps et l'Univers (Provoxys × Samlepirate)

Audit de vérification du live sur l'entropie (thermodynamique, mécanique statistique,
information, flèche du temps, trous noirs, cosmologie). Transcription conservée mot
pour mot ; les nuances vérifiées sont ajoutées **en encadrés « anti-intox »** sans
toucher au verbatim.

Vérifié le **23 juillet 2026** par recherche web (4 agents parallèles), sources
autoritatives d'abord (IUPAC/NIST, universités, articles à comité de lecture,
NASA/COBE, IUGS ; encyclopédies en appoint). Tous les DOI cités ont été résolus et
vérifiés via `api.crossref.org` — voir [`refs-doi-25-entropie.md`](refs-doi-25-entropie.md).

**Légende :** ✅ confirmé · ⚠️ approximatif/à nuancer · 🔶 débattu · ❌ erroné

---

## Partie I–II — Machines, Carnot, Clausius (thermodynamique classique)

| Affirmation du dossier | Verdict | Référence |
|---|---|---|
| Sadi Carnot publie *Réflexions sur la puissance motrice du feu* en 1824 | ✅ | Museo Galileo ; Kostic, *Entropy* 2025, DOI 10.3390/e27050502 |
| Rendement de Carnot = 1 − T_froid/T_chaud (kelvins) ; 600/300 K → 50 % | ✅ | calcul exact (1 − 300/600 = 0,5) ; nuclear-power.com |
| Source chaude à 600 K cédant 1000 J perd ≈ 1,67 J/K | ✅ | 1000/600 = 1,667 J/K |
| Cycle de Carnot = 2 isothermes + 2 adiabatiques ; aire T–S = chaleur si trajet réversible | ✅ | SFU ENSC 388 ; Q = ∫T dS pour processus intérieurement réversible |
| Newcomen puis Watt ; Carnot travaille encore avec le calorique | ✅ | Museo Galileo |
| Joule (palettes/eau) ; Mayer & Helmholtz : conservation de l'énergie (milieu XIXe) | ✅ | LibreTexts |
| Premier principe ΔU = Q + W (travail **reçu** > 0) | ✅ (convention) | convention IUPAC/physique, tenue partout dans la page |
| Énoncés de Clausius et de Kelvin-Planck, équivalents ; dS = δQ_rev/T ; inégalité de Clausius | ✅ | LibreTexts ; CU Boulder ; SFU |
| Bilan ΔS = S_échangée + S_créée, S_créée ≥ 0 ; unité J/K ≠ énergie | ✅ | SFU ENSC 388 |
| Mélange 1 kg 80 °C + 1 kg 20 °C isolé → T_f ≈ 50 °C ; ΔS_total > 0 | ✅ | T_f = 50 °C ; ΔS ≈ +36,5 J/K (recalculé) |
| Troisième principe (Nernst) : cristal parfait, entropie → cte (=0) ; entropie résiduelle possible ; fluctuations de point zéro ; zéro absolu inatteignable en nombre fini d'opérations | ✅ | LibreTexts ; Masanes & Oppenheim, *Nat. Commun.* 2017, DOI 10.1038/ncomms14538 |
| Exergie ; Gouy-Stodola : exergie détruite = T₀ · S_créée | ✅ | Reini & Casisi, *Energy* 2020, DOI 10.1016/j.energy.2020.118486 |
| Systèmes fermé / adiabatique / isolé ; « seul un isolé » a une entropie qui ne diminue pas | ⚠️ | voir correction ↓ |

**⚠️ Correction (systèmes) — encadré anti-intox ajouté (Chapitre 5).** La phrase
« c'est seulement pour ce dernier [isolé] que l'on peut affirmer directement : son
entropie totale ne diminue pas » est trop restrictive. La propriété dS ≥ 0 vaut
**dès qu'aucune chaleur n'est échangée** : elle s'applique aussi à tout système
**adiabatique** (δQ = 0 ⟹ dS = S_créée ≥ 0). « Isolé » = cas de référence,
« adiabatique » = cas plus général. → encadré ajouté sans modifier le verbatim.

---

## Partie III — Micro-états, Boltzmann, Gibbs, fluctuations

| Affirmation | Verdict | Référence |
|---|---|---|
| Macro-état vs micro-état ; multiplicité Ω | ✅ | Schroeder, *Thermal Physics* |
| S = k_B ln Ω ; k_B = 1,380649×10⁻²³ J/K (exact SI 2019) ; Ω = nb de micro-états, pas « le désordre » | ✅ | BIPM ; Boltzmann's entropy formula |
| Rôle du log : Ω₁·Ω₂ → S₁+S₂ (additivité/extensivité) | ✅ | Schroeder §2.3 |
| S = −k_B Σ p_i ln p_i (Gibbs) ; équiprobable → Boltzmann ; uniforme = max | ✅ | Jaynes 1957, DOI 10.1103/PhysRev.106.620 |
| Détente : ~moitié/moitié écrasant ; retour non interdit mais ~2⁻ᴺ | ✅ | binomiale |
| ~10²³ particules (N_A ≈ 6,022×10²³) → inverse jamais observée | ✅ (ordre de grandeur) | Avogadro |
| Deux compartiments Ω(n) = C(N,n) ; largeur relative ~ 1/√N | ✅ | σ/μ = 1/√N (recalculé) |
| Solides d'Einstein Ω = C(q+N−1, q) ; max de S_total ≠ égalité brute des énergies si tailles ≠ | ✅ | Schroeder §3.1 |
| Grille 100/50 : entropie binaire = 1 bit/case (100 bits) ; log₂ C(100,50) ≈ 96,3 bits | ✅ | recalculé : 96,3487 bits |
| « entropie binaire et combinatoire restent identiques » (rangé vs aléatoire) | ⚠️ | voir correction ↓ |
| Fluctuations : baisses temporaires possibles dans un petit système ; loi statistique | ✅ | Evans-Searles, DOI 10.1080/00018730210155133 ; Crooks 1999, DOI 10.1103/PhysRevE.60.2721 |
| Loschmidt (réversibilité) ; Poincaré (récurrence) en encadrés | ✅ | Steckline, DOI 10.1119/1.13022 ; Poincaré 1890 (Acta Math.) |

**⚠️ Précision (grille) — encadré anti-intox ajouté (Chapitre 7).** « Identiques »
signifie identiques **entre la grille rangée et la grille aléatoire** (à même nombre
de pions), pas identiques *entre elles* : 100 bits (entropie binaire, cases
indépendantes) ≠ 96,3 bits (log₂ C(100,50), macro-état à n fixé). L'écart (≈ 3,65 bits)
est l'information « perdue » en fixant exactement n. → encadré ajouté.

---

## Partie IV–V — Matière, information, démon de Maxwell, quantique

| Affirmation | Verdict | Référence |
|---|---|---|
| Onsager (hors équilibre) ≠ « quatrième principe » (numérotation non standard) | ✅ | la page le signale déjà |
| Changement de phase : ΔS = L/T ; Gibbs G = H − TS, (ΔG)_{T,P} ≤ 0 ; « spontané » ≠ « rapide » | ✅ | LibreTexts |
| Shannon 1948 : H = −Σ p_i log₂ p_i (bits) ; 4 symboles équiprobables → 2 bits | ✅ | Shannon 1948, DOI 10.1002/j.1538-7305.1948.tb01338.x |
| Analogie Gibbs↔Shannon, connexion physique via support matériel | ✅ | Jaynes 1957 ; SEP *Information & Entropy* |
| Codage préfixe (Huffman) : H ≤ L < H+1 ; source prévisible se compresse mieux | ✅ | Cover & Thomas |
| Démon de Maxwell ; résolution par le coût de l'information | ✅ | Maruyama, Nori & Vedral 2009, DOI 10.1103/RevModPhys.81.1 |
| Moteur de Szilard (1929) : 1 particule, 1 bit → ~k_B T ln 2 par cycle | ✅ | Szilard 1929, DOI 10.1007/BF01341281 |
| Landauer (1961) : effacer 1 bit ≥ k_B T ln 2 (≈ 2,9×10⁻²¹ J à 300 K) ; ΔS ≥ k_B ln 2 ; coût de l'**effacement**, pas de la mesure | ✅ | Landauer 1961, DOI 10.1147/rd.53.0183 ; Bérut *et al.* 2012, DOI 10.1038/nature10872 |
| Distinction mesure/effacement (Bennett) ; PC réels ≫ limite | ✅ | Bennett 2003, DOI 10.1016/S1355-2198(03)00039-X |
| von Neumann S = −k Tr(ρ ln ρ) ; pur → 0, mixte → > 0 ; intrication (tout pur, parties mixtes) | ✅ | Nielsen & Chuang, DOI 10.1017/CBO9780511976667 |
| Paire intriquée vs mélange classique ; pas un test de Bell | ✅ | Horodecki *et al.* 2009, DOI 10.1103/RevModPhys.81.865 |
| Mesures jointes (V20) : en base Z, Bell et mélange 00/11 donnent les mêmes statistiques (00/11 à 50/50) ; en base X, accord (1+v)/2 pour \|Φ+⟩ de visibilité v (100 % à v=1), 50 % pour le mélange classique et l'état produit | ✅ | Calcul standard sur ρAB (Born) ; Nielsen & Chuang, DOI 10.1017/CBO9780511976667 |
| Ising : spins ±1, alignement basse T, transition de phase, Metropolis ; l'entropie ≠ une seule image | ⚠️ | voir correction ↓ |

**⚠️ Précision (Ising) — encadré anti-intox ajouté (Chapitre 16).** La transition de
phase à température finie n'existe qu'en **dimension ≥ 2** (Onsager 1944, DOI
10.1103/PhysRev.65.117). Le modèle d'Ising **1D n'a aucune transition** à T > 0 (Ising
1925, DOI 10.1007/BF02980577). La grille du dossier est bien 2D. → encadré ajouté.

---

## Partie VI–VII — Flèche du temps, gravitation, trous noirs, cosmos

| Affirmation | Verdict | Référence |
|---|---|---|
| Coarse-graining ; inversion des vitesses fragile (Loschmidt) | ✅ | Lebowitz 1993, DOI 10.1063/1.881363 ; SEP *Time-thermo* |
| Cinq flèches du temps (reliées mais non toutes démontrées) | ✅ | Zeh ; SEP *Time-thermo* |
| Faible entropie gravitationnelle initiale (Penrose, courbure de Weyl) | ✅ | Penrose 1979 ; arXiv:1203.3382 |
| Bekenstein (années 1970) : entropie ∝ aire de l'horizon | ✅ | Bekenstein 1973, DOI 10.1103/PhysRevD.7.2333 |
| Hawking (1974-75) : température + rayonnement thermique | ✅ | Hawking 1975, DOI 10.1007/BF02345020 |
| S = k_B c³ A / (4 G ℏ) ; second principe généralisé | ✅ | Bekenstein 1973/1974, DOI 10.1103/PhysRevD.9.3292 |
| 1 M☉ : r_s ≈ 2,95 km ; T_H ≈ 6×10⁻⁸ K ; S ≈ 10⁷⁷ k_B ; A,S ∝ M² ; T ∝ 1/M ; t_évap ∝ M³ | ✅ | recalculé (r_s = 2954 m, T = 6,17×10⁻⁸ K, S = 1,05×10⁷⁷ k_B) |
| Trou noir stellaire « très en dessous du rayonnement cosmologique » | ⚠️ (à préciser) | voir correction ↓ |
| Inventaire cosmique dominé par les trous noirs supermassifs (~10¹⁰⁴ k_B) | ✅ | Egan & Lineweaver 2010, DOI 10.1088/0004-637X/710/2/1825 |
| Paradoxe de l'information ; courbe de Page ; îlots « compatibles avec l'unitarité » — pas « résolu » | ✅ | Page 1993, DOI 10.1103/PhysRevLett.71.3743 ; RMP 93, 035002 (2021) |
| Mort thermique = raréfaction des gradients exploitables, pas absence d'énergie | ✅ | SEP *Time-thermo* |
| CCC de Penrose & sélection cosmologique de Smolin = spéculatif, étiqueté comme tel | ✅ | Smolin 1992, DOI 10.1088/0264-9381/9/1/016 |

**⚠️ Précision (trou noir vs CMB) — encadré anti-intox ajouté (Chapitre 24).** Pour
1 M☉, T_H ≈ 6×10⁻⁸ K est ~10⁸ fois **inférieure** au fond diffus cosmologique
(2,725 K, NASA/COBE-FIRAS) : un tel trou noir **absorbe** aujourd'hui plus qu'il
n'émet. L'évaporation nette ne domine que dans un futur très lointain. → encadré ajouté.

**Précision (îlots / courbe de Page) — encadré anti-intox ajouté (Chapitre 26).** Les
calculs récents de surfaces quantiques extrémales et d'« îlots » (Penington 2020 ;
Almheiri *et al.* 2019) reproduisent une courbe compatible avec l'unitarité dans
certains cadres semi-classiques, mais **ne constituent pas** une résolution
universellement admise. La page n'affiche jamais « paradoxe résolu ». CCC/Smolin
présentés comme spéculatifs.

---

## Chiffres éditoriaux ajoutés par l'appareil (ordres de grandeur & « vraie vie »)

Chiffres introduits par les encadrés « Ordre de grandeur », la note Landauer étendue et
la section « Et dans la vraie vie ? » — hors verbatim, tous recalculés (signalé audit
n° 1 §11, intégré ici) :

| Affirmation (encadrés éditoriaux) | Verdict | Référence / recalcul |
|---|---|---|
| C(100,50) ≈ 10²⁹ arrangements, « cent mille milliards de fois plus » que les secondes depuis le Big Bang (~4×10¹⁷ s) | ✅ | recalculé : C(100,50) = 1,009×10²⁹ ; âge Univers 13,787 Ga ≈ 4,35×10¹⁷ s → ratio ≈ 2,3×10¹¹ (Planck/WMAP pour l'âge) |
| Une gorgée d'eau ≈ 10²⁴ molécules — davantage que de gorgées dans tous les océans | ✅ | ~20 mL ≈ 1,1 mol ≈ 6,7×10²³ molécules ; océans ≈ 1,34×10²¹ L ÷ 0,02 L ≈ 7×10²² gorgées (USGS *Water Science School*) — l'image classique tient |
| Effacer 10⁹ bits/s à la limite de Landauer ≈ 3 pW ; puces réelles à 10³–10⁶× la limite | ✅ | 2,87×10⁻²¹ J × 10⁹ s⁻¹ ≈ 2,9×10⁻¹² W ; énergies/commutation réelles ~10⁻¹⁵–10⁻¹⁸ J (IRDS) |
| 1 M☉ : T_H ~45 millions de fois **sous** le fond diffus cosmologique | ✅ | 2,725 K / 6,17×10⁻⁸ K ≈ 4,4×10⁷ (NASA/COBE-FIRAS) |
| Évaporation d'1 M☉ ≈ 10⁶⁷ ans ≈ 10⁵⁷ × l'âge de l'Univers | ✅ | t ∝ M³, ≈ 2,1×10⁶⁷ ans pour 1 M☉ (Page 1976, DOI 10.1103/PhysRevD.13.198) ; 10⁶⁷ / 1,38×10¹⁰ ≈ 7×10⁵⁶ ≈ 10⁵⁷ |
| Un trou noir supermassif (type Sgr A*) porte plus d'entropie que toutes les étoiles de l'Univers observable | ✅ | Sgr A* ≈ 10⁹¹ k_B ; étoiles ≈ 10⁸¹ k_B (Egan & Lineweaver 2010, DOI 10.1088/0004-637X/710/2/1825) |
| Pompe à chaleur : 1 kWh électrique déplace typiquement 3–5 kWh de chaleur (COP 3–5) | ✅ | ADEME / IEA HPT — COP saisonniers courants 3–5 pour PAC air/eau et air/air modernes |
| Rendement des centrales électriques « autour de 40 à 60 %, même au mieux » | ✅ | cycles combinés gaz ≈ 55–62 %, charbon ≈ 35–45 % (IEA) — « autour de » tient la fourchette |
| Data-centers ≈ 1–2 % de l'électricité mondiale | ✅ | IEA *Data Centres & Networks* : ~240–340 TWh en 2022 ≈ 1–1,3 %, ~2 % avec les actifs numériques |

---

## Ajouts éditoriaux du 24 juillet 2026 — potentiels, Maxwell, Rankine

Trois blocs éditoriaux ajoutés à partir du corpus de révision `les_bases/`
(thermochimie ; thermodynamique des gaz) — voir `a_traiter/provox-entropie/ajout-partie.md`.
**Aucun mot du verbatim n'a été touché** : tout passe par des encadrés `def-block`,
`formula-block`, tableaux, figures SVG et `anti-intox`.

### A1 — La famille des potentiels thermodynamiques (Chapitre 13)

| Affirmation | Verdict | Référence / recalcul |
|---|---|---|
| H = U + PV ; F = U − TS ; G = H − TS = U + PV − TS | ✅ | définitions IUPAC standard ; LibreTexts *Thermodynamic Potentials* |
| Différentielles : dU = T dS − P dV ; dH = T dS + V dP ; dF = −S dT − P dV ; dG = −S dT + V dP | ✅ | transformées de Legendre successives ; HyperPhysics *Thermodynamic Potentials* |
| Variables naturelles : U(S,V), H(S,P), F(T,V), G(T,P) | ✅ | idem |
| Critères de spontanéité : (ΔF)_{T,V} ≤ 0 et (ΔG)_{T,P} ≤ 0 | ✅ | LibreTexts ; cohérent avec l'encadré *Transitions & chimie* déjà en page |
| **ΔS_total = ΔS_syst − ΔH/T = −ΔG/T** à T et P constantes | ✅ | dérivation standard : l'environnement (thermostat à T) perd la chaleur ΔH absorbée par le système, donc ΔS_env = −ΔH/T ; ΔG ≤ 0 ⟺ ΔS_total ≥ 0 |
| « Garder S constante » n'est pas un réglage de paillasse — d'où l'inutilité pratique des critères sur U et H | ✅ | motivation classique de F et G (Callen, *Thermodynamics*, ch. 5–6) |
| F est le potentiel des transformations à volume fixe (bombe calorimétrique) ; G celui à pression fixe | ✅ | LibreTexts ; script source `les_bases/script_thermochimie_complet.txt` l. 258-279 |

### A2 — Mesurer une entropie : calorimétrie (Ch. 6) et relations de Maxwell (Ch. 13)

| Affirmation | Verdict | Référence / recalcul |
|---|---|---|
| S(T) = ∫₀^T C_P(T′)/T′ dT′ + Σ L/T_tr — l'entropie du troisième principe se **mesure** par calorimétrie | ✅ | méthode standard des entropies absolues (« third-law entropies ») ; NIST Chemistry WebBook ; cohérent avec dS = δQ_rev/T déjà en page (Ch. 4) |
| Sans le troisième principe, seules les **variations** d'entropie sont calculables | ✅ | déjà énoncé par le verbatim du Ch. 6 (« définir des entropies absolues et pas seulement des variations ») — l'encadré ne fait qu'expliciter le mécanisme |
| Relations de Maxwell : (∂S/∂P)_T = −(∂V/∂T)_P et (∂S/∂V)_T = (∂P/∂T)_V | ✅ | égalité des dérivées croisées (théorème de Schwarz) appliquée à G(T,P) et F(T,V) ; LibreTexts *Maxwell Relations* ; HyperPhysics |
| Elles viennent de dG = −S dT + V dP ⟹ (∂G/∂T)_P = −S et (∂G/∂P)_T = V | ✅ | dérivation élémentaire, reproduite dans l'encadré dépliant |
| Un corps qui se dilate en chauffant voit son entropie **baisser** quand on le comprime | ✅ | conséquence directe de la 1ʳᵉ relation : (∂V/∂T)_P > 0 ⟹ (∂S/∂P)_T < 0 |
| **L'eau liquide se contracte quand on la chauffe entre 0 et ≈ 4 °C**, donc comprimer de l'eau à 2 °C **augmente** son entropie | ✅ | maximum de densité à **3,98 °C** (0,99997 g/cm³) ; coefficient de dilatation β **négatif** sous 4 °C, nul à 4 °C — tec-science, *Density anomaly of water* ; Wikipedia EN *Negative thermal expansion* |
| C'est la même anomalie qui fait flotter la glace / isole les lacs gelés | ✅ | même source ; formulation prudente conservée en page |
| Nuance « l'entropie n'est pas subjective » : le choix de la description est explicite et physique, la valeur mesurée est reproductible et tabulée | ✅ | cohérent avec la thèse d'ouverture du dossier (« dépend des états qu'on distingue ») — l'encadré distingue *choix de description* et *subjectivité*, sans la contredire. Formulation « aux barres d'erreur près » (pas de sur-précision revendiquée) |

### B2 — Cycle de Rankine vs Carnot (Chapitre 14)

| Affirmation | Verdict | Référence / recalcul |
|---|---|---|
| Le cycle de Rankine = pompe (compression du liquide) → chaudière (isobare) → turbine (détente) → condenseur (isobare) | ✅ | cycle de référence des centrales à vapeur ; `les_bases/script_thermochimie_complet.txt` l. 426-438 ; SFU ENSC 388 |
| η_Rankine = (W_turbine − W_pompe) / Q_chaudière | ✅ | définition standard |
| **η_idéal = 1 − T_froid / T̄_chaud, avec T̄_chaud = Q_chaudière / ΔS** | ✅ | exact pour un cycle dont le **rejet** est isotherme (c'est le cas du condenseur) : η = 1 − T_c·ΔS / (T̄_h·ΔS). C'est la reformulation rigoureuse de « Rankine < Carnot » |
| Carnot entre 600 °C (873 K) et 30 °C (303 K) ≈ 65 % | ✅ | recalculé : 1 − 303/873 = **0,6529** |
| Rankine **idéal** (sans aucune irréversibilité) aux mêmes extrêmes : de l'ordre de 45–50 % | ✅ | recalculé sur un cycle 300 bar / 600 °C / condenseur 30 °C : W_net ≈ 1 531 kJ/kg, Q_in ≈ 3 288 kJ/kg → **η ≈ 46,6 %** (tables vapeur standard) |
| T̄_chaud « autour de 300 °C » pour un pic à 600 °C | ✅ | recalculé sur le même cycle : T̄_h = Q_in/ΔS ≈ 3 288 / 5,79 ≈ **568 K ≈ 295 °C** |
| Centrale à charbon ultra-supercritique : 44–46 %, record 47,5 % | ✅ | RDK Block 8 (Karlsruhe), 600/620 °C, ~275 bar → 47,5 % net ; unités 600 °C mono-resurchauffe ≈ 44 % — *Global Energy Monitor*, *Coal power technologies* ; ScienceDirect *Ultrasupercritical Plant* |
| Cycle combiné gaz : de l'ordre de 60 %, record vérifié 64,2 % | ✅ | Keadby-2 (SGT5-9000HL, Siemens Energy) — record Guinness vérifié **mai 2024**, 64,2 % ; précédent : EDF Bouchain (GE 9HA) 62,22 % — *Gas Turbine World* ; *Turbomachinery Magazine* |
| On ne construit pas de machine de Carnot à vapeur : compression d'un mélange diphasique + puissance nulle si réversible | ✅ | `les_bases` l. 440-448 ; argument classique (Çengel & Boles, *Thermodynamics*, ch. 10) |
| Anti-intox « une centrale gaspille la moitié de son énergie » : c'est de l'**exergie** perdue, pas de l'énergie ; l'écart est structurel, pas de l'incompétence | ✅ | cohérent avec Gouy-Stodola déjà en page (Ch. 14) et avec Kelvin-Planck (Ch. 4) |
| Levier réel : cogénération / réseaux de chaleur valorisant la chaleur rejetée | ✅ | formulation prudente ; pratique industrielle établie (IEA *District Heating*) |

**Aucune ❌, aucune 🔶.** Deux points de vigilance traités **avant** publication :
- la sur-affirmation « à la troisième décimale » (entropie standard de l'eau) a été
  ramenée à « aux barres d'erreur près » ;
- les rendements de centrales, initialement écrits « de l'ordre de 45 % / 60 % », ont
  été précisés avec les records réellement vérifiés (47,5 % et 64,2 %).

### C1 — L'article de Shannon (1948) mis à disposition et exploité (Chapitre 17)

Le texte intégral — `provoxys/entropie/Shannon-Mathematical-theory-of-communication.pdf`,
55 pages, réédition corrigée du *Bell System Technical Journal* — était **versionné dans
le dépôt mais jamais lié depuis la page**. Il est désormais présenté, cité et référencé.
Toutes les affirmations ci-dessous sont vérifiables **dans le PDF lui-même**, page par
page (la pagination du PDF coïncide avec la pagination imprimée de l'article).

| Affirmation | Verdict | Référence / vérification |
|---|---|---|
| Publié en deux parties : *Bell Syst. Tech. J.* vol. 27, p. 379-423 (juillet) puis p. 623-656 (octobre) 1948 | ✅ | mention de réédition en tête de la p. 1 du PDF |
| **Théorème 2** : la seule H satisfaisant les trois hypothèses est `H = −K Σ pᵢ log pᵢ`, K fixant l'unité | ✅ | p. 11 du PDF, énoncé littéral ; démonstration en appendice 2 |
| Les trois exigences : continuité en les pᵢ ; croissance monotone avec n si équiprobables ; décomposition d'un choix en choix successifs, **pondérée** par leur fréquence | ✅ | p. 10, points 1-3 et Fig. 6 (exemple ½, ⅓, ⅙ → ½·H(½,½) + ½·H(⅔,⅓)) |
| Shannon relativise lui-même la portée du théorème (« donner une certaine plausibilité » aux définitions, la vraie justification étant dans leurs implications) | ✅ | p. 11, juste après le théorème 2 |
| Citation p. 1 : « These semantic aspects of communication are irrelevant to the engineering problem » | ✅ | p. 1, §2 de l'introduction — citation courte, traduite, référencée en page |
| Le mot **bit** est introduit dans cet article, crédité à J. W. Tukey | ✅ | p. 1, dernier paragraphe |
| Schéma en cinq blocs (source, émetteur, canal + bruit, récepteur, destination) | ✅ | Fig. 1, p. 2 |
| **Approximations de l'anglais** : les cinq échantillons reproduits (ordre 0, fréquences, digrammes, trigrammes, mots de 2ᵉ ordre) | ✅ | p. 7, section 3 — échantillons **transcrits mot pour mot** depuis le PDF |
| « La ressemblance progresse d'environ le double de la portée prise en compte » | ✅ | p. 7, paragraphe suivant les échantillons |
| Shannon les construit à la main, en ouvrant des livres au hasard | ✅ | p. 8, premier paragraphe (méthode décrite explicitement) |
| **Redondance de l'anglais ≈ 50 %**, contexte limité à ~8 lettres ; « obtenue par plusieurs méthodes indépendantes donnant des résultats concordants » | ✅ | p. 14, fin de section 7 |
| Citation p. 14 : « When we write English half of what we write is determined by the structure of the language and half is chosen freely » | ✅ | p. 14, citation courte traduite et référencée |
| Shannon note que la forme de H « sera reconnue comme celle de l'entropie telle que définie dans certaines formulations de la mécanique statistique », et que c'est le H du théorème H de Boltzmann | ✅ | p. 11, avec note 8 renvoyant à R. C. Tolman, *Principles of Statistical Mechanics*, 1938 |
| **L'anecdote von Neumann est de seconde main** : rapportée par Tribus & McIrvine en 1971 (23 ans après), absente de l'article | ⚠️→✅ | Tribus & McIrvine, « Energy and Information », *Sci. Am.* 225(3):179-188, DOI `10.1038/scientificamerican0971-179` — **vérifié Crossref** (titre, auteurs, revue, volume, pages concordants). Présentée en page comme un récit tardif, jamais comme une source primaire |
| « L'entropie de la source est le plancher de toute compression sans perte » | ✅ | théorème du codage de source (Shannon 1948) ; déjà affirmé dans la section « vraie vie » du dossier, désormais rattaché à sa source |

**Droits — point de conformité.** Le PDF est une **œuvre tierce** (Bell Telephone
Laboratories / Nokia Bell Labs) et **n'est pas couvert par la licence CC BY-NC-ND du
dossier**. Conformément à `AGENT.md` (§ Licence de contenu, dernier point), la mention
figure **à deux endroits** : dans la carte « Lire la source » de l'acte V et dans le
cartouche `.eci-license` du pied de page. Les extraits sont de **courtes citations**
traduites, chacune accompagnée de sa référence de page.

**Non repris volontairement du corpus source** — `les_bases/script_thermochimie_complet.txt`
l. 21 énonce « le premier principe : l'énergie totale de l'Univers est constante ».
Formulation écartée : le dossier prend explicitement des précautions sur les bilans
globaux en cosmologie (Ch. 26). Aucun des encadrés ajoutés ne la reprend.

---

## Synthèse

Sur **~64 affirmations et données chiffrées** vérifiées (dont les 9 chiffres éditoriaux
ajoutés par l'appareil — ordres de grandeur, Landauer étendu, « vraie vie ») : **aucune
❌ erronée**, aucune 🔶 réellement débattue au niveau du dossier. Tous les calculs
numériques sont exacts (50 % Carnot, 1,67 J/K, 50 °C, 96,3 bits, r_s = 2,95 km,
T_H = 6×10⁻⁸ K, S = 10⁷⁷ k_B, inventaire ~10¹⁰⁴ k_B, C(100,50) ≈ 10²⁹, ~3 pW, COP 3–5).

**Cinq nuances ⚠️**, toutes traitées par **encadré « anti-intox »** dans la page (le
verbatim reste intact) :
1. **Isolé vs adiabatique** (Ch. 5) — dS ≥ 0 dès que δQ = 0, pas seulement pour un système isolé.
2. **Grille « identiques »** (Ch. 7) — identiques *entre* grilles rangée/aléatoire ; 100 bits ≠ 96,3 bits.
3. **Ising** (Ch. 16) — transition de phase seulement en dimension ≥ 2 (grille 2D dans le dossier).
4. **Trou noir vs CMB** (Ch. 24) — plus froid que le CMB → absorbe aujourd'hui plus qu'il n'émet.
5. **Courbe de Page / îlots** (Ch. 26) — « compatible avec l'unitarité », jamais « paradoxe résolu ».

Vigilance de convention (pas une erreur) : ΔU = Q + W suppose « travail reçu > 0 »,
tenu de façon cohérente dans toute la page.

**Mise à jour du 24 juillet 2026** — les blocs éditoriaux ajoutés (potentiels
thermodynamiques, relations de Maxwell, cycle de Rankine, puis exploitation de l'article
de Shannon 1948) portent l'audit à **~109 affirmations vérifiées**, toujours **aucune ❌**,
et le total à **28 DOI vérifiés Crossref** (ajout de Tribus & McIrvine 1971). Deux formulations ont été
corrigées avant publication (sur-précision sur l'entropie standard de l'eau ;
rendements de centrales précisés avec les records vérifiés) et une formulation du
corpus source a été écartée (« l'énergie totale de l'Univers est constante »).
Détail : section « Ajouts éditoriaux du 24 juillet 2026 » ci-dessus.

Références primaires à comité de lecture, DOI vérifiés : [`refs-doi-25-entropie.md`](refs-doi-25-entropie.md).
