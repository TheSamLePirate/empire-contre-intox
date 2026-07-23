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

## Synthèse

Sur **~55 affirmations et données chiffrées** vérifiées : **aucune ❌ erronée**, aucune
🔶 réellement débattue au niveau du dossier. Tous les calculs numériques sont exacts
(50 % Carnot, 1,67 J/K, 50 °C, 96,3 bits, r_s = 2,95 km, T_H = 6×10⁻⁸ K, S = 10⁷⁷ k_B,
inventaire ~10¹⁰⁴ k_B).

**Cinq nuances ⚠️**, toutes traitées par **encadré « anti-intox »** dans la page (le
verbatim reste intact) :
1. **Isolé vs adiabatique** (Ch. 5) — dS ≥ 0 dès que δQ = 0, pas seulement pour un système isolé.
2. **Grille « identiques »** (Ch. 7) — identiques *entre* grilles rangée/aléatoire ; 100 bits ≠ 96,3 bits.
3. **Ising** (Ch. 16) — transition de phase seulement en dimension ≥ 2 (grille 2D dans le dossier).
4. **Trou noir vs CMB** (Ch. 24) — plus froid que le CMB → absorbe aujourd'hui plus qu'il n'émet.
5. **Courbe de Page / îlots** (Ch. 26) — « compatible avec l'unitarité », jamais « paradoxe résolu ».

Vigilance de convention (pas une erreur) : ΔU = Q + W suppose « travail reçu > 0 »,
tenu de façon cohérente dans toute la page.

Références primaires à comité de lecture, DOI vérifiés : [`refs-doi-25-entropie.md`](refs-doi-25-entropie.md).
