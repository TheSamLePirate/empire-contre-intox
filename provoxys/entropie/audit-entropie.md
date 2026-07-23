# Audit éditorial — Dossier XXV « L'Entropie, le temps et l'Univers »

**Fichier audité :** `provoxys/entropie/index.html` (2259 lignes, ~192 ko)
**Date de l'audit :** 23 juillet 2026
**Méthode :** lecture intégrale du fichier (structure, transcription, encadrés, formules, scripts), comptages automatisés, recalcul des valeurs numériques citées, confrontation avec la charte ECI (`AGENT.md`) et le script source (`a_traiter/provox-entropie/`).

---

## 1. Résumé exécutif

> **Question posée : « N'est-ce pas un peu trop compliqué ? Il manquerait pas un peu de vulgarisation et de définitions ? »**

**Réponse nuancée : non, le dossier n'est pas « trop » compliqué pour ce qu'il prétend être — un grand cours de 4 h — mais oui, sa pente d'entrée est raide, et il lui manque deux choses précises :**

1. **Des définitions de base.** Une quarantaine de termes techniques sont utilisés sans jamais être définis (travail, pression, fonction d'état, enthalpie, bit, quanta, horizon, matrice de densité…). Le dossier définit *remarquablement bien* les concepts centraux (macro/micro-états, systèmes isolé/fermé/adiabatique, exergie) mais suppose acquis tout le vocabulaire de support.
2. **Des dispositifs de vulgarisation d'accueil.** Pas de glossaire, pas de résumé « en une phrase » par acte, pas de chemin de lecture gradué, pas de tableau comparatif des six entropies, peu d'analogies de remplacement après avoir (à juste titre) interdit le cliché de la « chambre en bazar ».

Le fond scientifique, lui, est **excellent** : valeurs recalculées et justes, nuances épistémiques exemplaires, structure narrative bouclée. Le problème n'est pas le contenu, c'est **l'accessibilité de la rampe d'accès** : un lecteur motivé mais non scientifique décrochera entre l'acte II et l'acte III, non parce que c'est faux ou mal expliqué, mais parce que chaque nouveau concept repose sur trois mots jamais définis.

---

## 2. Cartographie du contenu (mesuré)

| Élément | Quantité | Détail |
|---|---|---|
| Actes | 7 + Ouverture + Conclusion + Coulisses | numérotation 00 → 26, 27 chapitres |
| Laboratoires interactifs | **26** (V1–V26) | bundle React externe (`entropie-viz.js`, 347 ko), chacun avec `noscript` de repli |
| Blocs de formules KaTeX | **11** | Carnot, ΔU=Q+W, Clausius/bilan, Boltzmann, Gibbs, L/T & G, Gouy-Stodola, Shannon, Landauer, von Neumann, Bekenstein-Hawking |
| Formules inline (`data-tex`) | 25 occurrences au total | rendues par KaTeX avec repli texte |
| Encadrés anti-intox | **5** | adiabatique⊃isolé, grille « identiques », Ising 1D/2D, trou noir stellaire, établi vs spéculatif |
| Blocs « Respiration » | 2 | fin de première heure, avant la seconde partie |
| Interludes biographiques | 4 | chaîne Carnot→Smolin |
| Questions du chat (FAQ) | **14** | dans « Coulisses », tout en bas de page |
| Prises de parole | ~55 (≈29 Provoxys / 26 Sam) | duo structuré en « partition à deux voix » |
| Durée affichée | « 4 h · 7 actes » | signal-board du hero |
| Tableaux HTML | **0** | (le CSS `.dtable` existe mais n'est utilisé nulle part) |

Intégration ECI : complète et conforme (licence CC BY-NC-ND, compteur de visites, bandeau crédit, collective footer, carte index « Dossier XXV », liens croisés, renvoi vers Les Sources XXVI). Rien à redire sur la charte.

---

## 3. Qualité — points forts (à préserver absolument)

### 3.1 Rigueur factuelle vérifiée

Les valeurs citées ont été **recalculées pendant l'audit et sont justes** :

- Rendement de Carnot à 600 K / 300 K : η = 1 − 300/600 = **50 %** ✓ ; 1000 J → 500 J de travail, ΔS source chaude = 1000/600 ≈ **1,67 J/K** ✓
- log₂ C(100,50) ≈ **96,3 bits** ✓ (et l'écart 100 ≠ 96,3 est explicitement commenté dans l'anti-intox — très fin)
- Landauer : k_B·T·ln 2 à 300 K ≈ **2,9 × 10⁻²¹ J** ✓
- Trou noir d'une masse solaire : rayon ≈ **2,95 km** ✓, T_Hawking ≈ **6 × 10⁻⁸ K** ✓, S ≈ **10⁷⁷ k_B** ✓, comparaison au fond diffus à 2,725 K ✓
- Inventaire entropique de l'Univers observable ~**3 × 10¹⁰⁴ k_B**, dominé par les trous noirs supermassifs (Egan & Lineweaver 2010) ✓
- Ising : pas de transition de phase à 1D (Ising 1925), solution exacte 2D (Onsager 1944) ✓
- Confirmation expérimentale de Landauer : Bérut *et al.*, 2012 ✓

### 3.2 Hygiène épistémique exemplaire (la signature ECI, bien exécutée)

- **Limites de chaque labo affichées** : « cette simulation n'est pas une démonstration », « modèle pédagogique qui sépare les comptes », « ordres de grandeur dépendant du modèle ».
- **Spéculatif clairement badgé** : cosmologie cyclique de Penrose et sélection de Smolin « spéculatives et minoritaires » ; courbe de Page ≠ « paradoxe résolu » ; rayonnement de Hawking « prédiction robuste mais non détectée ».
- **Refus des raccourcis** : « spontané ≠ rapide », « l'entropie n'est pas une énergie », « mort thermique ≠ absence d'énergie », « une boucle T–S ne signifie pas automatiquement entropie créée », coût de Landauer attaché à l'**effacement**, pas à la mesure.
- L'avertissement méthodologique du chapitre 12 (« trompeur de baptiser les relations d'Onsager "quatrième principe" ») montre même une **autocritique des textes préparatoires** — rare et remarquable.

### 3.3 Architecture pédagogique solide

- **Arc bouclé** : le café de l'ouverture revient dans la conclusion ; le mantra « états, probabilités, frontière » résonne 4 fois (hero → objectifs → conclusion → devise) sans jamais être une simple répétition.
- **Progression historique honnête** : « pas l'œuvre d'un seul père fondateur », Carnot encore dans le calorique, interludes biographiques.
- **Distinctions conceptuelles majeures et correctes** : énergie ≠ entropie ; système/milieu/total ; échangée vs créée ; les six entropies « reliées, jamais à confondre ».
- **Rythme** : blocs « Respiration », questions au chat, intertitres d'actes cinématiques.
- **Formules réelles** (KaTeX) avec notes symbole par symbole — le fb-note de Clausius (« L'entropie se mesure en joules par kelvin : ce n'est pas une énergie ») est un modèle du genre.

---

## 4. Analyse de complexité

### 4.1 La courbe de niveau par acte

| Section | Niveau réellement requis | Verdict |
|---|---|---|
| Ouverture (café, films retournés) | Grand public | ✅ Excellent accrochage |
| Acte I — Machines, Carnot, Joule | Lycée (terminale) | ✅ Accessible, bien raconté |
| Acte II — Clausius, bilan, frontières | Lycée+ / début supérieur | ⚠️ Le mot « fonction d'état » tombe sans définition |
| Acte III — Boltzmann, Gibbs, multiplicités | Classes prépa / L1-L2 | ⚠️ Suppose logarithmes, combinatoire, probabilités |
| Acte IV — Production, phases, exergie, Ising | L2-L3 (avec magnétisation, susceptibilité non définies) | ⚠️ Dense : 5 concepts lourds en 5 chapitres |
| Acte V — Shannon, démon, Landauer, von Neumann | L2-L3 | ⚠️ Bien raconté mais « bit » et « matrice de densité » jamais définis |
| Acte VI — Flèche du temps, coarse-graining | L3+ (conceptuel) | ⚠️ « Coarse-graining » en anglais, Loschmidt cité sans contexte |
| Acte VII — Bekenstein-Hawking, Page, cosmos | L3-M1 (vulgarisé) | ⚠️ Bien hedger mais jargon maximal (îlots, surfaces extrémales, unitarité) |
| Conclusion | Grand public | ✅ Retour heureux à la simplicité |

**Constat :** la pente monte régulièrement jusqu'à l'acte VII et ne redescend qu'à la conclusion. Rien d'illégitime pour un « grand dossier », mais rien ne signale au lecteur que c'est prévu ainsi — pas de prérequis déclarés, pas de « vous pouvez sauter l'acte IV et revenir ».

### 4.2 Densité conceptuelle

- **~40 termes techniques non définis** (liste exhaustive § 5).
- Le hero lui-même ouvre sur une citation abstraite : « les états considérés, les probabilités ou variables utilisées, et la frontière du système ». C'est la thèse du dossier — juste — mais **imparsable pour un néophyte** avant d'avoir lu l'acte III. Il manque sa traduction immédiate en langage courant.
- Certains chapitres empilent : le chapitre 13 traite changement de phase + chaleur latente + enthalpie + énergie libre de Gibbs + spontanéité en une page ; le chapitre 24 aligne horizon, aire, quatre constantes, S∝M², T∝1/M en dix lignes.

### 4.3 Prérequis mathématiques non déclarés

Probabilités, logarithmes (ln *vs* log₂ — la différence est mentionnée mais jamais expliquée), puissances de dix, notion d'intégrale/somme. Une note « prérequis » dans le learning-panel suffirait à calibrer les attentes.

---

## 5. Les définitions manquantes — inventaire exhaustif

C'est **le cœur du problème** soulevé. Tableau par ordre d'apparition : terme utilisé, jamais défini, avec la définition qu'une ligne suffirait à donner.

### Actes I–II (thermodynamique classique)

| Terme | Où | Pourquoi ça coince | Définition suggérée (1 ligne) |
|---|---|---|---|
| **travail** | dès l'acte I | Concept central de tout l'acte I, jamais défini | « énergie transférée de façon ordonnée (force × déplacement), par opposition à la chaleur, transfert désordonné » |
| **pression** | diagrammes P–V (ch. 2) | Lue sur un axe sans définition | « force exercée par unité de surface, due aux chocs moléculaires » |
| **rendement** | ch. 1 | Défini par l'exemple (50 %) — acceptable, mais jamais posé | « travail obtenu ÷ chaleur prélevée à la source chaude » |
| **kelvin / échelle absolue** | ch. 2 | « Les températures doivent être exprimées en kelvins » — **pourquoi ?** jamais dit | « échelle dont le zéro est le vrai zéro physique : seuls ses rapports ont un sens, d'où η = 1 − T_f/T_c » |
| **isotherme / adiabatique** | ch. 2 (cycle de Carnot) | Utilisés 4 chapitres **avant** leur définition du ch. 5 | renvoi anticipé ou définition au premier usage (« à température constante » / « sans échange de chaleur ») |
| **théorie calorique** | ch. 2 + interlude A | Nommée deux fois, jamais expliquée | « la théorie d'alors : la chaleur comme un fluide impondérable qui se conserve — fausse, mais compatible avec le raisonnement de Carnot » |
| **réversible / irréversible** | dès l'ouverture | LA paire de concepts du dossier ; ancrage formel seulement au ch. 4 | encadré définition dès l'ouverture : « réversible = qu'on peut remonter le film sans rien laisser changer dehors ; irréversible = le monde a changé pour de bon » |
| **fonction d'état** | ch. 4 | « Clausius introduit une nouvelle fonction d'état » — terme parachuté | « une grandeur qui ne dépend que de l'état du système, pas du chemin suivi pour y arriver » |
| **calorimètre** | ch. 3, 4 | Jamais défini | « enceinte isolée où l'on mesure les échanges de chaleur » |
| **thermostat** | noscript V2 | Jamais défini | « source si grande que sa température ne bouge pas quand on lui prend ou donne de la chaleur » |
| **équiprobabilité** | ch. 9 | Hypothèse-clé de tout Boltzmann, nommée tard et sans insistance | « chaque micro-état compatible a la même chance — c'est LE postulat de départ » |

### Acte III (mécanique statistique)

| Terme | Où | Pourquoi ça coince | Définition suggérée |
|---|---|---|---|
| **logarithme** | ch. 9 | Le *pourquoi* est donné (produit→somme ✓) mais pas le *quoi* | « fonction qui répond : "10 (ou 2, ou e) élevé à quelle puissance donne ce nombre ?" » + une ligne sur ln vs log₂ (unités : J/K vs bits) |
| **combinatoire / coefficient binomial** | ch. 7, 8 | C(100,50) calculé sans dire d'où il sort | « nombre de façons de choisir 50 cases parmi 100 » — c'est dit implicitement, à expliciter |
| **quanta** | ch. 10 | « Les petits points représentent des quanta d'énergie » | « paquets indivisibles d'énergie, imposés par la mécanique quantique » |
| **oscillateurs** (solides d'Einstein) | ch. 10 | « chaque solide est un ensemble d'oscillateurs » | « modèle où chaque atome est un petit ressort qui vibre autour de sa place » |

### Acte IV (matière, machines réelles, vivant)

| Terme | Où | Pourquoi ça coince | Définition suggérée |
|---|---|---|---|
| **gradient** | ch. 12 | « Un gradient de température entraîne un flux » | « un écart entre deux points ; plus la pente est raide, plus le flux est fort » |
| **relations d'Onsager** | ch. 12 | Citées pour être nuancées, jamais dites | « lois qui relient flux et forces près de l'équilibre (prix Nobel de chimie 1968) » |
| **chaleur latente L** | ch. 13 | Nommée dans la formule sans définition préalable | « énergie qu'il faut fournir pour changer de phase *à température constante* — elle casse les liaisons au lieu d'agiter » |
| **enthalpie H** | ch. 13 | **Pire cas du dossier** : H apparaît dans G = H − TS sans aucune définition | « l'énergie totale du système *plus* le travail de place qu'il occupe (H = U + PV) : la bonne grandeur à pression constante » |
| **énergie interne U** | ch. 3 | Semi-définie par contexte | « somme de toutes les agitations microscopiques » — à poser explicitement |
| **spins** | ch. 16 | « variables binaires, souvent appelées spins » | suffisant pour le modèle, mais ajouter « petits aimants élémentaires » donne l'image |
| **magnétisation, capacité thermique, susceptibilité** | ch. 16 (V16) | Trois courbes affichées, aucune définie | une ligne chacune ou un renvoi au glossaire |
| **Metropolis / Monte-Carlo** | ch. 16 | Nommé dans le lede du labo | « tirages au sort répétés qui explorent les configurations probables — l'algorithme qui fait tourner la mosaïque » |

### Acte V (information)

| Terme | Où | Pourquoi ça coince | Définition suggérée |
|---|---|---|---|
| **bit** | ch. 7 (!) puis acte V | Utilisé dès la grille (1 bit/case), jamais défini nulle part | « un chiffre binaire, 0 ou 1 : la plus petite réponse oui/non » |
| **code préfixe** | V17 | Mentionné | « code où aucun mot n'est le début d'un autre — on peut décoder sans espaces » |
| **état pur / mélange** | ch. 20 | Conséquences données (S=0 vs S>0) sans intuition | « pur = on sait tout ce qu'on peut savoir ; mélange = il reste du hasard sur ce qui a été préparé » |
| **matrice de densité ρ** | ch. 20 | Nommée, jamais incarnée | « la fiche d'identité probabiliste complète d'un état quantique » |
| **trace (Tr)** | formule von Neumann | Symbole muet dans la formule | « la somme de ses valeurs propres » (ou renvoyer au glossaire) |
| **intrication** | ch. 20 | Effets décrits, image manquante | « deux particules qui ne forment plus qu'un seul état : les décrire séparément perd de l'information » |

### Actes VI–VII (temps et cosmos)

| Terme | Où | Pourquoi ça coince | Définition suggérée |
|---|---|---|---|
| **coarse-graining** | acte VI | **Anglicisme** — traduit une ligne plus bas (« regroupement »), mais le terme anglais reste le titre | « grain grossier : on regroupe des milliards de détails microscopiques en quelques variables (pression, température) et on perd le reste » |
| **paradoxe de Loschmidt** | ch. 21 | Cité sans aucun contexte | « objection de 1876 : si les lois sont réversibles, renverser toutes les vitesses devrait faire reculer l'entropie » |
| **horizon (de trou noir)** | ch. 24 | « aire de son horizon » jamais défini | « la surface de non-retour : ce qui la franchit ne peut plus rien envoyer, pas même la lumière » |
| **rayon de Schwarzschild** | V23 | Nommé, chiffré, pas défini | « le rayon de l'horizon d'un trou noir sans rotation ni charge : ~3 km par masse solaire » |
| **fond diffus cosmologique** | anti-intox ch. 24 | Nommé sans définition | « la lueur fossile du Big Bang, aujourd'hui à 2,725 K, qui baigne tout l'Univers » |
| **unitarité / évolution unitaire** | ch. 25 | Jargon quantique parachuté | « règle d'or de la mécanique quantique : l'information ne se détruit jamais, elle se brouille » |
| **courbe / temps de Page** | ch. 25 | Utilisés puis nommés | acceptable par le contexte, mais une ligne aiderait : « le moment où le trou noir a rendu la moitié de son entropie » |
| **« îlots », surfaces quantiques extrémales** | ch. 25 | Jargon de recherche 2019+, hedged mais opaque | soit une phrase, soit un renvoi « approfondissement » explicite |
| **ensembles de Gibbs** | interlude B | « généralise par ses ensembles » | « au lieu de suivre UN système, on moyenne sur tous ses clones imaginables » |
| **entropie de Rényi** | interlude C | Mentionnée comme approfondissement | OK car signalé comme hors champ — laisser, mais lier au glossaire |

---

## 6. La vulgarisation manquante — dispositifs absents

Au-delà des définitions, voici ce qui manque **structurellement** pour « bien expliquer ce qu'est l'entropie » à un public plus large.

### 6.1 Pas de glossaire ⭐ (priorité absolue)

~40 termes non définis. Un bloc « Lexique » (liste `<details>` repliable ou section ancrée `#lexique`, lien dans la topbar) transformerait l'accessibilité du dossier sans toucher une ligne de la transcription. **C'est le correctif au meilleur rapport effort/impact.**

### 6.2 Pas de résumé « en une phrase » par acte

Les bandeaux d'actes ont un sous-titre (bien), mais chaque acte mériterait un encart final « **À retenir si vous n'avez que 30 secondes** ». La matière existe déjà : les blocs « Respiration » et les questions au chat la contiennent en germe.

### 6.3 Pas de chemins de lecture gradués

4 h / 7 actes / 26 labos, c'est un mini-cours universitaire. Trois parcours suggérés dans le learning-panel désamorceraient la découragement :

- **Pressé·e (~20 min)** : hero → ouverture → encadrés anti-intox → conclusion ;
- **Curieux·se (~1 h)** : + actes I–III (jusqu'à Boltzmann) ;
- **Complet (4 h)** : tout, dans l'ordre.

### 6.4 Pas de tableau comparatif des six entropies

Le message central du dossier (« Clausius, Boltzmann, Gibbs, Shannon, von Neumann, Bekenstein-Hawking : reliés, jamais à confondre ») n'a **aucune synthèse statique** : il n'existe que dans la prose de la conclusion et dans le labo V26 (donc invisible sans JavaScript). Un vrai tableau — *nom · objet · formule · unité · hypothèse-clé · exemple* — serait la page la plus précieuse du dossier. **Preuve que c'était prévu : le CSS `.dtable` / `.dtable-wrap` est écrit… et utilisé zéro fois.**

### 6.5 Peu d'analogies de remplacement

Le dossier démolit (à juste titre) l'analogie de la « chambre en bazar »… mais ne la remplace que par la grille de pions. Réservoir d'images possibles, compatibles avec la rigueur du propos :

- **multiplicité** → mélange d'un paquet de cartes : il n'existe qu'un « paquet neuf trié », des milliards de « paquets mélangés » ;
- **exergie** → monnaie : 100 € liquides vs 100 € bloqués dans une cave sans clé — même valeur, pas la même disponibilité ;
- **frontière du système** → poupées gigognes : le bilan change selon la poupée qu'on regarde, la physique non ;
- **coarse-graining** → photo floue : on regroupe les pixels, l'image devient simple, le détail est perdu ;
- **irréversibilité** → lait dans le café : rien n'interdit microscopiquement la séparation, mais personne ne l'a jamais vue.

### 6.6 Ordres de grandeur sans comparaisons sensibles

10²³, 10⁷⁷ k_B, 3 × 10¹⁰⁴ k_B, 6 × 10⁻⁸ K, 2,9 × 10⁻²¹ J : tous justes, aucun incarné. Une comparaison par chiffre (« plus de micro-états que… », « un trou noir solaire émet moins qu'une veilleuse refroidie à… », « pour effacer tous les bits d'un data-center au coût de Landauer, il faudrait… ») ferait sentir ce que les exposants racontent.

### 6.7 La FAQ — le meilleur matériau de vulgarisation — est enterrée

Les 14 questions du chat sont **le texte le plus accessible de tout le dossier** (« Une chambre en bazar a-t-elle plus d'entropie ? », « Le vivant combat-il l'entropie ? »)… et elles se trouvent à la toute fin, après les coulisses, où presque personne n'arrivera. À distribuer (3–5 questions en blocs `<details>` dans les chapitres pertinents) ou à surfacer en entrée « Questions fréquentes » dans la topbar.

### 6.8 Pas de section « À quoi ça sert ? »

Les applications sont dispersées mais jamais rassemblées : pompes à chaleur et réfrigérateurs, rendement des centrales, compression de fichiers (Shannon → ZIP), data-centers face à la limite de Landauer, et surtout **le démontage d'intox réelles** (« l'évolution viole le second principe », « l'entropie explique l'effondrement des civilisations »). Un dossier ECI gagnerait à finir sur ce terrain.

---

## 7. Incohérences et finitions techniques

1. **Numérotation des labos non monotone.** Ordre DOM : V1, V2, V3, V4, **V6, V5**, V7, V8, **V10, V9**, V11… Le banc d'essai (construit dans l'ordre DOM) affiche donc V6 avant V5 et V10 avant V9. → Renuméroter les deux paires, ou trier le banc par numéro.
2. **CSS morte** : `.dtable` / `.dtable-wrap` (aucune table dans la page), `.regie` (zéro bloc régie dans le corps — les notes RÉGIE du script ont été retirées, c'est bien, mais le style et la gestion JS `SPOKEN…regie` subsistent), `.dialogue-block` (défini et géré en JS, zéro occurrence). → Nettoyer ou utiliser.
3. **Note de production restante** (section Coulisses, avant la FAQ) : *« Ces réponses sont des repères. Elles doivent être reformulées naturellement et raccourcies selon le rythme du live. »* — C'est une consigne de régie, pas du contenu publié. Elle casse la fiction et doit être retirée.
4. **« Transcription mot pour mot » — vraiment ?** La page affirme « reprendre, mot pour mot, le grand live de Provoxys », mais la présence de la note ci-dessus et la structure du dossier (`a_traiter/provox-entropie/script.md`, avec RÉGIE et réserve de questions) indiquent que la page est bâtie depuis le **script préparatoire** du live, pas d'une captation. Point d'honnêteté éditoriale à trancher : soit le live a eu lieu (alors la note de production saute), soit la formulation devient « issu du script du live ». Pour un collectif dont la devise est *Veritas omnia vincit*, ce n'est pas anecdotique.
5. **Citation du hero non attribuée.** La phrase « On ne peut jamais annoncer "l'entropie" sans préciser trois éléments… » apparaît en hero, dans la conclusion (attribuée à Sam) et en devise finale. Si c'est une formule des auteurs, la donner à Sam dès le hero (« — Sam, en conclusion du live ») éviterait l'impression d'une citation savante anonyme.

---

## 8. Recommandations priorisées

| Priorité | Action | Effort | Impact |
|---|---|---|---|
| **P1** | Ajouter un **lexique** (~40 entrées, 1 ligne chacune, section ancrée + lien topbar) | ~1–2 h | Énorme : lève le problème n° 1 sans toucher à la transcription |
| **P1** | Retirer la **note de production** de la FAQ + trancher « transcription » vs « script » | 5 min | Honnêteté éditoriale |
| **P2** | **Tableau comparatif des six entropies** (utiliser enfin `.dtable`) | ~45 min | Ancre statique du message central, visible sans JS |
| **P2** | **Encarts « À retenir »** en fin d'acte (1 phrase × 7) | ~30 min | Rampe de sortie pour lecteurs fatigués |
| **P2** | **Chemins de lecture** (3 parcours dans le learning-panel) | ~20 min | Désamorce le découragement face aux 4 h |
| **P3** | Distribuer **4–5 questions de la FAQ** en `<details>` dans les chapitres + entrée topbar | ~1 h | Fait remonter le meilleur matériau de vulgarisation |
| **P3** | **Encadrés définition** au premier usage (réversible, fonction d'état, enthalpie, bit, horizon) — 5–8 blocs | ~1 h | Lisse la pente actes II–V |
| **P3** | **Comparaisons d'ordres de grandeur** (5–6 phrases) | ~30 min | Rend les chiffres sensibles |
| **P4** | Corriger l'ordre V5/V6, V9/V10 ; nettoyer la CSS morte | ~15 min | Finition |
| **P4** | Section « À quoi ça sert / démontage d'intox » | ~1–2 h | Mission ECI poussée au bout |

---

## 9. Ce qu'il ne faut PAS changer

- **La rigueur** : les hedges, les limites de modèles, les badges « spéculatif » — c'est ce qui distingue ce dossier de la vulgarisation ordinaire. La vulgarisation doit s'ajouter *autour*, jamais édulcorer le cœur.
- **Le refus du mot « désordre »** comme définition — c'est la thèse du dossier, elle est juste.
- **La structure duo Provoxys/Sam** et la partition à deux voix.
- **Les 26 labos** et leurs `noscript` — modèle à suivre pour les autres dossiers.
- **L'arc café → conclusion** et le mantra « états, probabilités, frontière ».

---

## 10. Verdict final

**Qualité scientifique : 9/10.** Rigueur, honnêteté, couverture (de Carnot aux îlots de Page, c'est le panorama le plus complet du projet).
**Qualité de vulgarisation : 6/10.** Excellent *dans* les encadrés et la FAQ… mais la rampe d'entrée suppose un lecteur déjà à l'aise avec le vocabulaire de la physique statistique.
**Écart entre ambition et accessibilité :** le dossier veut défaire le plus grand malentendu de la vulgarisation (« entropie = désordre ») auprès du grand public, tout en parlant d'emblée la langue de celles et ceux qui ont déjà compris.

**Le diagnostic tient en une phrase :** ce n'est pas un dossier trop compliqué, c'est un excellent cours auquel il manque son **mode d'emploi** — un lexique, des définitions posées au premier usage, et des portes d'entrée graduées. Avec les correctifs P1–P2 (moins d'une journée de travail, zéro modification de la transcription), il passerait de « remarquable pour initiés » à « référence de vulgarisation exigeante accessible à tous ».

---

## 11. État d'implémentation — 23 juillet 2026 ✅

Toutes les recommandations de cet audit ont été implémentées dans `index.html` (2481 → 2783 lignes, structure validée, scripts passés à `node --check`, ancres internes vérifiées). La transcription elle-même n'a pas été touchée&nbsp;: tous les ajouts sont des éléments éditoriaux (encadrés, tableaux, sections).

| Reco | État | Détail |
|---|---|---|
| **P1 · Lexique** | ✅ Fait | Section `#lexique` : **46 termes** en 5 groupes thématiques, `<details>` dépliables, définition en 1 ligne + étiquette d'acte. Liens ajoutés : topbar, sommaire, note prérequis. |
| **P1 · Note de production** | ✅ Fait | La consigne « réponses… repères… reformulées » est retirée ; le kicker « Réserve de questions » devient « Questions & réponses » ; la FAQ est présentée comme rassemblée en fin de live. |
| **P2 · Tableau des six entropies** | ✅ Fait | `.dtable` enfin utilisée : tableau *nom · mesure · formule KaTeX · unité · labo* dans la conclusion (statique, visible sans JS). |
| **P2 · « À retenir » × 7** | ✅ Fait | `.lesson-block.retain` (teinté or) en fin de chaque acte — une phrase de synthèse en langage courant. |
| **P2 · Chemins de lecture** | ✅ Fait | 3 parcours (Pressé ~20 min / Curieux·se ~1 h / Complet 4 h) + note « Prérequis : aucun » dans le learning panel. |
| **P3 · FAQ distribuée** | ✅ Fait | 5 questions déplacées des Coulisses vers leur chapitre en `<details class="faq-details">` dépliables (frontières, chambre, vivant, démon, trous noirs) ; 9 restent aux Coulisses ; ancre `#faq`. |
| **P3 · Encadrés Définition** | ✅ Fait | **10 blocs** `.def-block` au premier usage : réversible (ouverture), travail/chaleur/rendement, kelvin, fonction d'état, bit, logarithme, chaleur latente & enthalpie, ρ/pur/mélange/intrication, Loschmidt, horizon & Schwarzschild. |
| **P3 · Ordres de grandeur** | ✅ Fait | 2 blocs « Ordre de grandeur » (C(100,50) vs secondes depuis le Big Bang ; trou noir : 45 M× plus froid, 10⁶⁷ ans, Sgr A*) + extension de la fb-note Landauer (~3 pW pour 10⁹ bits/s). |
| **P4 · « Et dans la vraie vie ? »** | ✅ Fait | Section `#vraie-vie` : 5 pillars (PAC/frigos, centrales, compression, data-centers, anti-intox quotidien), chiffres prudents (« typiquement », « de l'ordre de »). |
| **P4 · Ordre des labos** | ✅ Fait | `LABS.sort()` par numéro : le banc d'essai et le sommaire affichent V1→V26 malgré les montages V6/V5 et V10/V9. |
| **P4 · CSS morte** | ✅ Fait | `.regie` et `.dialogue-block` supprimés (CSS, sélecteurs de largeur, JS) — 0 référence restante, y compris dans le bundle des viz. |
| **Hero · citation** | ✅ Fait | Attribution « — Sam, synthèse finale du live » + traduction en clair en sous-ligne. |

**Note méthode :** les ajouts chiffrés nouveaux (comparaisons d'ordres de grandeur, COP des pompes à chaleur, part des data-centers) sont volontairement exprimés en fourchettes prudents. À terme, les faire entrer dans l'appareil critique du dossier `sources/` (fiche + référence) comme pour le reste du dossier.
