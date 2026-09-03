# Ajout-partie — ce que `les_bases/` peut apporter au Dossier « Entropie »

**Analyse du 24 juillet 2026.**
Corpus source : `a_traiter/provox-entropie/les_bases/` (5 fichiers, 946 lignes).
Cible : `provoxys/entropie/index.html` (3 477 lignes, 26 chapitres, 26 visualisations, lexique de 47 mots).

---

## 0. Contrainte préalable — statut du matériau

`les_bases/` **n'est pas une transcription de live** : ce sont deux scripts de
révision (thermochimie ; thermodynamique des gaz) plus trois inventaires de schémas.
La règle du dossier — *transcription conservée à 100 % mot pour mot* — implique donc
que **rien de ce corpus ne peut entrer dans les prises de parole Provoxys / Sam**.

Tout ajout doit passer par les canaux **éditoriaux** déjà en place dans la page :

| canal existant | usage pour `les_bases` |
|---|---|
| `◆ Définition · …` / `◆ Définitions · …` | formules et grandeurs (H, F, G, Z, Λ) |
| `◆ Anti-intox · …` | erreurs classiques du script thermochimie |
| encadré « … & … » (type *Transitions & chimie*, ch. 13) | blocs formules à deux colonnes |
| lexique (« Quarante-sept mots ») | nouveaux termes, avec étiquette d'acte |
| interludes biographiques A–D | lignée des chimistes (aujourd'hui absente) |
| labs V01–V26 | 2 à 3 nouvelles visualisations (V27+) |
| « Et dans la vraie vie ? » | applications chimiques / cryogéniques |

---

## 1. Verdict global

**Oui, il y a du contenu utile — et le recouvrement est plus faible qu'attendu.**

Comptage brut d'occurrences dans `index.html` :

| terme | occurrences | terme | occurrences |
|---|---|---|---|
| Carnot | 22 | loi de Hess | **0** |
| Gibbs | 21 | Helmholtz (*potentiel* F) | **0** ¹ |
| exergie | 18 | relations de Maxwell | **0** ² |
| Landauer | 15 | fonction de partition / `ln Z` | **0** |
| Ising | 13 | van der Waals | **0** |
| enthalpie | 5 | facteur de compressibilité Z | **0** |
| — | — | Joule-Thomson | **0** |
| — | — | gaz parfait / `PV = nRT` | **0** |
| — | — | gaz rares, hélium, superfluidité | **0** |
| — | — | cycle de Rankine | **0** |
| — | — | Kirchhoff, Lavoisier, Black, Berthelot | **0** |

¹ « Helmholtz » apparaît 4 fois, **uniquement comme personnage** (ch. 3 et interlude A) — jamais comme potentiel *F = U − TS*.
² « Maxwell » apparaît 22 fois, **uniquement comme démon** (ch. 18) — jamais comme relations thermodynamiques.

Le dossier est très fort sur l'axe **entropie ↔ information ↔ cosmos**, et sur
l'entropie *produite* (ch. 12, 14). Il est **volontairement mince sur l'axe chimie /
gaz / machines réelles** : `les_bases` remplit exactement ce creux, sans piétiner
l'existant.

---

## 2. Ce qu'il ne faut PAS reprendre (doublons avérés)

À écarter d'emblée, déjà traité et mieux traité dans le dossier :

| bloc source | déjà couvert par |
|---|---|
| Cycle de Carnot, η = 1 − T_c/T_h (`script_thermochimie` l. 440-448) | ch. 2 + **V03** (piston + diagrammes P–V et T–S synchronisés) |
| Premier principe ΔU = Q + W, expérience du calorimètre (l. 20-39) | ch. 3 + **V04** (expérience de Joule) |
| Critères de spontanéité ΔG < 0 / = 0 / > 0 (l. 192-195) | ch. 13, encadré *Transitions & chimie*, y compris la nuance « spontané ≠ rapide » |
| Chaleur latente, changement de phase (l. 175) | ch. 13 + **V13** (plateaux glace→vapeur, trajectoire T–S) |
| Rendement des centrales, pertes (l. 426-438 en partie) | ch. 14 + **V14** (Sankey énergie/exergie) + section « vraie vie » |
| Mécanique statistique généraliste (l. 380-415, partie S = k ln Ω) | ch. 7-9 + **V07**, **V09**, **V10** |
| Lasers He-Ne et à excimères (`script_gaz` l. 178-215) | **hors sujet entropie** — inversion de population, optique. Beau mais c'est un autre dossier |
| Listes d'« Image ID » (`schemas_*.txt`) | identifiants opaques d'une autre conversation, **non résolvables en fichiers** — voir §6 |

---

## 3. Ajouts retenus — priorité A (fort gain de compréhension)

### A1 · La famille des potentiels thermodynamiques (U, H, F, G)
**Source** : `script_thermochimie_complet.txt` l. 258-332, 371-378.
**Manque comblé** : le dossier introduit *G* au ch. 13 comme un objet isolé, sans dire
d'où il vient ni pourquoi il en existe plusieurs. Or les quatre potentiels sont
**la même énergie, corrigée du terme entropique −TS**, selon ce qu'on tient fixe :

| potentiel | fixe | différentielle | critère d'évolution |
|---|---|---|---|
| U(S,V) | S, V | dU = T dS − P dV | — |
| H(S,P) = U + PV | S, P | dH = T dS + V dP | — |
| F(T,V) = U − TS | **T, V** | dF = −S dT − P dV | ΔF ≤ 0 |
| G(T,P) = H − TS | **T, P** | dG = −S dT + V dP | ΔG ≤ 0 |

**Pourquoi c'est le meilleur ajout du lot** : cela répond frontalement à la question
que la page pose ailleurs (« pourquoi une partie peut-elle perdre de l'entropie ? »).
Le terme −TS *est* la comptabilité de l'entropie exportée vers le thermostat. C'est
la version algébrique du raisonnement « système + milieu » du ch. 5.

**Insertion** : encadré `◆ Définitions · les quatre potentiels`, **ch. 13**, juste
après l'encadré *Transitions & chimie*. Deux à trois lignes de lexique (`enthalpie`
existe déjà ; ajouter `énergie libre de Helmholtz (F)`, `potentiel thermodynamique`,
`transformée de Legendre`).
**Viz possible (V27)** : *carré thermodynamique* interactif — on choisit ce qu'on
tient constant (T/V, T/P, S/V, S/P), la page allume le bon potentiel, sa
différentielle et son critère de spontanéité.

### A2 · Les relations de Maxwell — l'entropie devient mesurable
**Source** : l. 334-369.
**Manque comblé** : nulle part la page ne dit **comment on mesure une entropie**
en pratique. Les relations de Maxwell le disent :

> (∂S/∂P)_T = −(∂V/∂T)_P  et  (∂S/∂V)_T = (∂P/∂T)_V

Autrement dit : la variation d'entropie se déduit d'un **coefficient de dilatation**
ou d'une **compressibilité** — deux grandeurs qu'on lit sur un banc de mesure.
L'entropie n'est ni un ressenti ni une métaphore : c'est une grandeur que l'on
obtient à partir d'un volume et d'un thermomètre.

**Insertion** : encadré `◆ Définition · mesurer une entropie` en **ch. 6** (fin de
l'acte II, là où la page insiste déjà sur « J/K, pas J ») ou en ch. 13.
Angle anti-intox naturel : *« l'entropie, c'est du flou / du subjectif »* → non, c'est
tabulé, et tabulé à partir de mesures mécaniques.

### A3 · La fonction de partition — le pont micro → macro
**Source** : l. 380-415.
**Manque comblé** : l'acte III s'arrête à *S = k ln Ω* et à la distribution de Gibbs
(**V10**). Il manque le maillon qui relie les deux et qui explique comment on
*calcule* réellement une entropie à partir de niveaux d'énergie :

> Z = Σ e^(−E_i / k_B T)   puis   F = −k_B T ln Z   puis   S = −(∂F/∂T)_V

**Pourquoi ça compte ici** : **V10** fait déjà déplacer des probabilités pour lire
S/k_B. La fonction de partition est exactement la machine qui *fabrique* ces
probabilités à partir d'une température. L'ajout est un chaînon, pas une redite.
Il relie aussi A1 (F) et A3 en un seul fil.

**Insertion** : encadré `◆ Définition · fonction de partition` en **ch. 9**
(« Boltzmann, Gibbs et le logarithme »), après la formule de Gibbs.
⚠️ Ne pas reprendre le cas explicite du gaz parfait monoatomique (Z = V^N/(N!Λ³)) :
trop technique pour la page, et sans lecture visuelle possible.

### A4 · Bombe calorimétrique vs calorimètre à pression constante
**Source** : l. 76-94, plus le point de vigilance n° 2 (l. 476-479).
**Manque comblé** : le dossier définit `calorimètre` au lexique et montre le
calorimètre de Joule (**V04**), mais ne dit jamais **pourquoi l'enthalpie existe**.
La réponse est expérimentale et très concrète :

- volume constant (bombe) → W = 0 → **Q_V = ΔU** ;
- pression constante (à l'air libre, une casserole) → **Q_P = ΔH** ;
- passage de l'un à l'autre : **ΔH = ΔU + Δn_g RT** (gaz parfaits).

**Insertion** : complément de l'encadré `◆ Définitions · chaleur latente & enthalpie`
au **ch. 13** — deux phrases suffisent, et l'enthalpie cesse d'être une définition
tombée du ciel.

---

## 4. Ajouts retenus — priorité B (bons compléments)

### B1 · L'entropie qui *pilote* une réaction : ΔG = ΔH − TΔS
**Source** : point de vigilance n° 5, l. 487-488.
Une réaction **endothermique** (ΔH > 0) avec ΔS > 0 devient **spontanée au-dessus
d'une certaine température** — et inversement. C'est le contre-exemple parfait au
réflexe « spontané = qui libère de la chaleur », et c'est un cas où l'entropie n'est
pas un sous-produit mais **le moteur**. Excellent matériau `◆ Anti-intox` pour le
ch. 13, dans le ton exact de la page.
*Exemple chiffré déjà prêt dans la source (l. 224-230) : ΔH = −120 kJ, ΔS = −150 J/K,
T = 290 K → ΔG = −76,5 kJ.*

### B2 · Rankine vs Carnot — pourquoi une vraie centrale plafonne
**Source** : l. 426-448.
La page affirme (section « vraie vie ») que les centrales plafonnent à 40–60 % « même
au mieux ». `les_bases` fournit **la raison structurelle** : le cycle réellement
utilisé est celui de **Rankine** (pompe → chaudière → turbine → condenseur), dont les
apports et rejets de chaleur **ne sont pas isothermes** — d'où un rendement
nécessairement inférieur à Carnot entre les mêmes températures extrêmes. Et Carnot
n'est pas industrialisable à la vapeur (compression diphasique).
**Insertion** : encadré au **ch. 14**, adossé au Sankey **V14** qui parle déjà de
« combustion, échangeurs, turbine, condenseur » sans jamais nommer le cycle.
**Viz possible (V28)** : superposition Rankine / Carnot sur le même diagramme T–S,
l'aire entre les deux courbes = exergie détruite. Se branche directement sur V03 et V14.

### B3 · Détente de Joule-Thomson et cryogénie
**Source** : `script_thermodynamique_gaz_et_gaz_rares_complet.txt` l. 123-129, 156-171.
μ_JT = (∂T/∂P)_H : une détente **isenthalpique** qui refroidit ou réchauffe selon le
gaz et la température. C'est **le** procédé irréversible utilisé pour liquéfier les
gaz — donc pour s'approcher du zéro absolu dont parle le ch. 6. Cela donne une
réponse concrète à « comment on descend à 4,2 K », et une illustration d'un processus
qui crée de l'entropie tout en **refroidissant** (contre-intuitif, donc utile).
**Insertion** : encadré en **ch. 6**, ou en ch. 12 (« Où l'entropie est-elle produite ? »)
comme quatrième mode à côté de conduction / diffusion / viscosité.

### B4 · Hélium superfluide et point lambda (2,17 K)
**Source** : l. 156-171.
En dessous de 2,17 K, l'hélium-4 devient superfluide : viscosité nulle, conductivité
thermique extraordinaire, effet fontaine, film de Rollin. **Un état quantique
macroscopique d'entropie très basse** — l'illustration expérimentale du ch. 6 qui
manque à la page. Bonus : l'hélium ne se solidifie pas sous pression atmosphérique,
même à 0 K (fluctuations de point zéro), ce que le ch. 6 mentionne en théorie sans
exemple. Utilisé au LHC et dans les IRM (l. 220) : ancrage « vraie vie » immédiat.

### B5 · L'interlude manquant — la lignée des chimistes
**Source** : l. 9-16.
Les interludes A–D couvrent Carnot/Mayer/Joule/Helmholtz, Clausius/Kelvin/Maxwell/
Boltzmann/Gibbs, Shannon/Rényi/Szilard/Landauer, Bekenstein/Hawking/Penrose/Smolin.
**Aucun chimiste.** Or la chaleur a été *mesurée* avant d'être théorisée :
Black (chaleur latente, 1761) → Lavoisier & Laplace (calorimètre à glace, 1782-83)
→ Hess (loi de la somme constante, 1840) → Kirchhoff (1858) → Berthelot (bombe, 1881).
Ces travaux **précèdent et nourrissent** le premier principe.
**Insertion** : « Interlude A-bis — la voie calorimétrique », avant l'interlude A.
Cohérent avec la galerie de portraits (`portraits.html`) qui pourrait s'enrichir.

### B6 · La loi de Hess comme démonstration d'une fonction d'état
**Source** : l. 98-117.
La page définit « fonction d'état » deux fois (encadré + lexique) avec la métaphore de
l'altitude d'un sommet. La loi de Hess en est la **version vérifiable au laboratoire** :
on mesure séparément C + ½O₂ → CO puis CO + ½O₂ → CO₂, la somme égale la mesure
directe C + O₂ → CO₂. La métaphore devient un protocole.
**Insertion** : deux phrases dans l'encadré `◆ Définition · fonction d'état` existant.

---

## 5. Ajouts retenus — priorité C (optionnels, si la page a la place)

- **C1 · Gaz parfait, relation de Mayer, γ = 5/3** (`script_gaz` l. 7-57). La page fait
  déjà tourner V03 (Carnot) sur ces hypothèses **sans jamais les énoncer**. Un encadré
  « boîte à outils » (PV = nRT ; C_P − C_V = R ; PV^γ = cte en adiabatique réversible)
  rendrait V03 auditable. Risque : alourdir l'acte I, qui est déjà dense.
- **C2 · Van der Waals & facteur de compressibilité Z** (l. 65-121). Explique pourquoi
  « gaz parfait » est un modèle et où il casse. Utile surtout si C1 est retenu.
- **C3 · Grand potentiel Ω = F − μN et potentiel chimique** (l. 371-378). Se branche
  sur le ch. 15 (le vivant, systèmes **ouverts**) : c'est le potentiel des systèmes où
  le nombre de particules varie. Élégant, mais probablement trop abstrait pour la page.
- **C4 · Applications chimiques pour « Et dans la vraie vie ? »** (l. 421-465) :
  contenus caloriques (glucides ≈ 17 kJ/g, lipides ≈ 38 kJ/g), oxydation du glucose
  (ΔG° ≈ −2 870 kJ/mol), Haber-Bosch, batteries, stabilité des minéraux. À doser :
  une ou deux lignes maximum, la section est déjà bien remplie.
- **C5 · Loi de Kirchhoff**, ΔH(T₂) = ΔH(T₁) + ΔC_p(T₂ − T₁) (l. 163-175). Trop
  technique pour la page ; à garder pour `sources/` si un chiffre en dépend.

---

## 6. Les fichiers `schemas_*.txt` — verdict

Les trois inventaires (`schemas_thermochimie_images.txt`,
`schemas_thermochimie_images-1.txt`, `schemas_thermodynamique_gaz_complets.txt`)
listent ~60 « Image ID » du type `IMNlH`, `uWaxY`, `fheJy`. **Ces identifiants
proviennent d'une autre conversation et ne correspondent à aucun fichier du dépôt :
ils sont inexploitables tels quels.**

En revanche, **`schemas_thermochimie_images-1.txt` contient de vraies descriptions
rédigées** (l. 1-51) qui constituent un brief d'image déjà formaté — directement
convertible au gabarit `images_a_generer.md` pour génération par Codex. Les schémas
qui vaudraient le coup, et **uniquement ceux qui accompagnent un ajout retenu** :

| schéma source | sert l'ajout | remarque |
|---|---|---|
| n° 7 — les quatre potentiels (transformées de Legendre) | **A1** | à préférer sous forme de **viz V27**, pas d'image fixe |
| n° 8 — carré thermodynamique de Maxwell | **A2** | image fixe pertinente (mnémotechnique) |
| n° 9 — cycle de Rankine (pompe/chaudière/turbine/condenseur) | **B2** | idem, ou viz V28 |
| n° 3 — loi de Hess (chemin direct vs intermédiaires) | **B6** | petit schéma inline SVG suffirait |
| diagramme de phases de l'hélium / ligne lambda | **B4** | source réelle citée : Wikipédia FR « Superfluidité » |

Les schémas 1, 2, 4, 5, 6, 10 (premier principe, H = U + PV, Gibbs, Helmholtz,
critères ΔG, Carnot) **doublonnent** avec V03/V04/V13 ou avec les encadrés existants.

---

## 7. Points de vigilance sur le matériau source (à corriger avant tout reprise)

1. **« Le premier principe : l'énergie totale de l'Univers est constante »**
   (`script_thermochimie` l. 21). Formulation à **ne pas reprendre telle quelle** :
   le dossier prend explicitement des précautions sur les bilans globaux en
   cosmologie (ch. 26). Reformuler en « pour un système fermé ».
2. **Convention de signe de W** (l. 24-28) : le script utilise ΔU = Q + W avec W
   *reçu*. La page devra fixer et rappeler sa convention, sinon confusion garantie
   avec le rendement de Carnot.
3. **Ω = F − μN = −PV** (l. 374) : l'égalité à −PV n'est vraie que pour un système
   homogène extensif. À nuancer si C3 est retenu.
4. **Coquilles du source** : « états microscologiques » (l. 389), « capillaries »
   (l. 165, anglicisme pour *capillaires*).
5. **Les dates historiques** (Black 1761, Lavoisier-Laplace 1782-83, Hess 1840,
   Kirchhoff 1858, Berthelot 1881) sont **non vérifiées** dans ce corpus : le script
   ne cite que « Wikipédia » en source. Elles devront passer l'audit avant publication.
6. **Les valeurs chiffrées** (ΔfH° de H₂O, CO₂, CH₄ ; coefficients a et b de van der
   Waals ; enthalpies de liaison C–H, C–C, O=O ; 2,17 K ; 632,8 nm ; 0,93 % d'argon)
   sont attribuées à NIST/CRC **sans URL ni DOI**. Même traitement : vérification
   obligatoire, source primaire ou rien.
7. **Enthalpies de liaison** : le script le dit lui-même (l. 159, 484-485), ce sont des
   **moyennes** à ±10-20 kJ/mol. Ne jamais les présenter comme exactes.

---

## 8. Obligations de projet déclenchées par ces ajouts

Conformément à `AGENT.md` (§ *Vérification scientifique & sources*), **tout** ajout
retenu impose :

- une entrée dans `sources/dossier-*.md` (audit entropie) : *affirmation → verdict →
  valeur de référence → source avec URL* ;
- des références primaires dans `sources/refs-doi-*.md` — en particulier pour
  Onsager 1944 (déjà cité en page), le point lambda de l'hélium-4, et Landauer si l'on
  touche au ch. 19. **Aucun DOI inventé** : vérification Crossref systématique ;
- une fiche + une référence dans `sources/sources.html`, avec `data-search` normalisé
  et mise à jour des compteurs du hero ;
- si de nouvelles visualisations (V27, V28) sont créées : les intégrer au bundle
  esbuild des composants React, à `LABS` et au tri par numéro ;
- régénération de `rss.xml` **uniquement** si l'index change (ce n'est pas le cas ici :
  ces ajouts ne modifient ni le titre, ni le résumé, ni les tags de la carte).

---

## 9. Recommandation courte

Si l'on ne devait retenir que **trois** choses :

1. **A1 — les quatre potentiels** : c'est le chaînon manquant qui donne un sens
   algébrique au raisonnement « système + milieu » que la page tient depuis le ch. 5 ;
2. **A2 — les relations de Maxwell** : elles répondent à la question jamais posée
   dans la page, « comment mesure-t-on une entropie ? », et coupent court à l'idée
   que l'entropie serait subjective ;
3. **B2 — Rankine vs Carnot** : la page affirme le plafond des centrales, `les_bases`
   en donne enfin la raison, et le Sankey V14 existe déjà pour l'accueillir.

Les priorités B3/B4 (Joule-Thomson, hélium superfluide) constituent le meilleur
second lot : elles donnent au ch. 6 — aujourd'hui purement théorique — sa matière
expérimentale.
