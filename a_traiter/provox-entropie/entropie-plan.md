# Plan éditorial et visuel du dossier sur l’entropie

## 1. Ambition du dossier

Produire un dossier de vulgarisation scientifique exigeante qui permette à un lecteur non spécialiste de comprendre :

- pourquoi la notion d’entropie a été créée ;
- ce qu’elle mesure réellement ;
- pourquoi elle augmente dans un système isolé ;
- comment ses définitions thermodynamique, statistique et informationnelle se répondent sans se confondre ;
- comment elle intervient dans les machines, la matière, le vivant, l’information, le temps et la cosmologie ;
- quelles affirmations relèvent d’un résultat établi, d’un modèle pédagogique, d’une analogie ou d’une hypothèse spéculative.

Niveau proposé : accessible à partir du lycée, avec des encadrés mathématiques permettant une lecture de niveau licence. Le récit principal doit rester compréhensible sans effectuer tous les calculs.

## 2. Question directrice

> Pourquoi un café refroidit-il spontanément, alors qu’il ne se réchauffe jamais seul en absorbant la chaleur de la pièce ?

Cette question conduit successivement aux machines thermiques, au second principe, à la multiplicité des micro-états, à l’information et à la flèche du temps.

Le dossier ne doit pas présenter l’entropie comme un simple « désordre ». Cette image peut être introduite, testée, puis dépassée au profit de définitions précises.

## 3. Principes éditoriaux

Chaque chapitre doit distinguer quatre niveaux :

1. **Observation** — phénomène mesurable ou expérience reproductible ;
2. **Modèle** — représentation simplifiée et hypothèses utilisées ;
3. **Loi ou résultat** — relation scientifique et domaine de validité ;
4. **Interprétation** — image mentale, conséquence philosophique ou hypothèse.

Chaque formule doit être accompagnée :

- de la définition de ses symboles et de leurs unités ;
- de ses hypothèses d’application ;
- d’un exemple numérique ou graphique ;
- d’une phrase expliquant ce qu’elle signifie physiquement ;
- d’une mise en garde contre l’interprétation abusive la plus fréquente.

Les portraits biographiques seront courts, neutres et placés près de la notion concernée. Les versions longues resteront en annexe.

## 4. Architecture détaillée du contenu

## Ouverture — Le film qui ne passe que dans un sens

### Contenu nécessaire

- café chaud qui refroidit ;
- gaz qui se mélangent ;
- verre qui se brise ;
- moteur incapable de convertir toute la chaleur en travail ;
- distinction entre une loi de conservation et une loi d’évolution.

### Visualisation V1 — Reconnaître la flèche du temps

Présenter plusieurs animations réversibles en lecture avant/arrière. Le lecteur doit décider dans quel sens le phénomène paraît naturel.

- Cas : trajectoire d’une planète, collisions idéales, diffusion d’un gaz, glaçon dans l’eau, frottement.
- Résultat affiché : lois microscopiques réversibles ou non, évolution de l’entropie macroscopique.
- Objectif : montrer que la flèche du temps ne se réduit pas au mouvement.

## Partie I — De la machine à vapeur au second principe

### Chapitre 1 — Chaleur, travail et révolution industrielle

- Newcomen et Watt ;
- différence entre chaleur, température et énergie interne ;
- travail mécanique ;
- problème historique du rendement.

### Chapitre 2 — Carnot et la machine idéale

- sources chaude et froide ;
- cycle thermodynamique ;
- réversibilité ;
- rendement de Carnot ;
- nécessité des températures absolues ;
- distinction entre moteur idéal et machine réelle.

### Visualisation V2 — Machine thermique et flux

Schéma interactif d’un moteur entre deux réservoirs.

- Paramètres : températures chaude et froide, chaleur reçue, degré d’irréversibilité.
- Sorties : travail, chaleur rejetée, rendement maximal, rendement réel, entropie échangée et créée.
- Représentation : flux énergétiques et entropiques côte à côte.
- Message : l’énergie se conserve, mais sa capacité à produire du travail diminue.

### Visualisation V3 — Cycle de Carnot synchronisé

Animation simultanée de quatre vues : piston, diagramme `P–V`, diagramme `T–S` et tableau `P, V, T, Q, W, S`.

- L’utilisateur sélectionne chaque étape du cycle.
- L’aire sous la courbe `T–S` n’est interprétée comme chaleur que sous les hypothèses indiquées.
- Comparaison entre cycle réversible et cycle comportant frottement ou échange à écart de température fini.

### Chapitre 3 — Joule, Mayer et le premier principe

- expérience des palettes ;
- équivalence chaleur-travail ;
- énergie interne ;
- convention de signe unique pour tout le dossier.

### Visualisation V4 — Expérience de Joule

Des masses entraînent des palettes dans un calorimètre.

- Paramètres : masse, hauteur, capacité thermique et pertes.
- Sorties : travail fourni et augmentation de température.
- Mode idéal puis mode réel.
- Message : la conservation de l’énergie ne prédit pas le sens spontané du processus.

## Partie II — L’entropie thermodynamique

### Chapitre 4 — Le vocabulaire indispensable

- système ouvert, fermé, isolé et adiabatique ;
- état, variable d’état et équilibre ;
- transformation quasi statique, réversible et irréversible ;
- chaleur, travail et température de frontière.

### Visualisation V5 — Laboratoire des frontières

Un système central permet d’activer ou de bloquer les flux de matière, de chaleur et de travail.

- L’utilisateur construit un système ouvert, fermé, isolé ou seulement adiabatique.
- Des exemples concrets sont proposés : thermos, piston, turbine, organisme vivant.
- Message : « adiabatique » et « isolé » ne sont pas synonymes.

### Chapitre 5 — Clausius, Kelvin-Planck et le second principe

- énoncé de Clausius ;
- énoncé de Kelvin-Planck ;
- équivalence logique ;
- inégalité de Clausius ;
- entropie comme fonction d’état.

### Chapitre 6 — Entropie échangée et entropie créée

Équation directrice :

\[
\Delta S = S_{\text{échangée}} + S_{\text{créée}}, \qquad S_{\text{créée}} \geq 0
\]

- l’entropie d’un sous-système peut diminuer ;
- l’entropie créée est nulle dans la limite réversible ;
- l’entropie totale d’un système isolé ne diminue pas.

### Visualisation V6 — Mélange calorimétrique

Deux quantités d’eau à des températures différentes sont mélangées dans une enceinte isolée.

- Paramètres : masses, températures initiales, capacités thermiques et pertes éventuelles.
- Sorties : température finale, `ΔS` de chaque portion, `ΔS_total`.
- Courbes : température et entropie en fonction du temps.
- Message : une partie peut perdre de l’entropie pendant que le total augmente.

### Chapitre 7 — Troisième principe et zéro absolu

- cristal parfait ;
- limite lorsque `T → 0` ;
- entropies absolues ;
- impossibilité pratique d’atteindre le zéro absolu ;
- prudence avec l’image d’une agitation moléculaire totalement nulle.

## Partie III — L’explication statistique

### Chapitre 8 — Macro-états, micro-états et multiplicité

- différence entre description microscopique et macroscopique ;
- multiplicité d’un macro-état ;
- équilibre comme macro-état dominant ;
- rôle de la taille du système.

### Visualisation V7 — Grille de configurations

Réutiliser et fiabiliser `app-react.jsx`, qui propose une grille de 100 cases avec :

- placement ordonné, aléatoire ou manuel ;
- nombre de cases actives ;
- entropie binaire par case ;
- entropie des motifs locaux `2×2` ;
- multiplicité combinatoire `log₂ C(100,n)` ;
- histogramme des motifs `2×2`.

Améliorations nécessaires :

- corriger le bouton d’ajustement du nombre de pions, qui ne met actuellement pas l’état de la grille à jour ;
- expliquer qu’à nombre de pions fixé, l’entropie binaire et `log₂ C(100,n)` restent identiques pour une grille rangée et une grille aléatoire ;
- montrer que l’entropie de blocs mesure une structure spatiale locale différente de la seule multiplicité globale ;
- nommer explicitement chaque macro-état et la question à laquelle répond chaque mesure ;
- ajouter une comparaison côte à côte « même composition, organisations différentes » ;
- fournir un mode pas à pas et des infobulles sur les formules ;
- garantir navigation clavier, contrastes suffisants et équivalent textuel des graphiques.

Message central : il n’existe pas une mesure magique du « désordre » ; une entropie dépend des états, probabilités et variables macroscopiques que l’on a définis.

### Visualisation V8 — Multiplicité d’un gaz à deux compartiments

Afficher `N` particules réparties entre gauche et droite.

- Paramètres : nombre de particules et position de la cloison.
- Courbes : `Ω(n_gauche)`, `ln Ω` et probabilité du macro-état.
- Bouton permettant de passer de 10 à 1 000 particules.
- Message : l’équilibre devient écrasant lorsque la taille du système augmente.

### Chapitre 9 — Boltzmann

Introduire :

\[
S = k_B \ln \Omega
\]

- définition précise de `Ω` ;
- rôle du logarithme ;
- additivité et extensivité ;
- entropie maximale à l’équilibre.

### Visualisation V9 — Deux solides d’Einstein

Deux groupes d’oscillateurs échangent un nombre fixé de quanta.

- Paramètres : nombres d’oscillateurs et de quanta.
- Sorties : multiplicités, entropies des deux solides et entropie totale.
- Animation d’échanges aléatoires.
- Message : la répartition la plus probable maximise l’entropie totale, pas nécessairement l’égalité brute des énergies lorsque les systèmes diffèrent.

### Chapitre 10 — Gibbs et les distributions non uniformes

Introduire :

\[
S = -k_B \sum_i p_i \ln p_i
\]

- probabilités non uniformes ;
- cas équiprobable et retour à Boltzmann ;
- aperçu des ensembles microcanonique, canonique et grand canonique.

### Visualisation V10 — Façonner une distribution

Histogramme dont l’utilisateur déplace les probabilités.

- Affichage en direct de l’entropie de Gibbs/Shannon.
- Comparaison entre distribution concentrée et uniforme.
- Conservation automatique de la somme des probabilités.
- Message : l’entropie dépend de la distribution, pas de l’apparence graphique seule.

### Chapitre 11 — Fluctuations et statut statistique du second principe

- fluctuations dans les petits systèmes ;
- probabilités de diminution temporaire ;
- paradoxe de Loschmidt et récurrence de Poincaré en encadrés ;
- passage à la limite macroscopique.

### Visualisation V11 — Marche aléatoire et fluctuations

- Comparer 10, 100 et 10 000 particules.
- Afficher la fraction dans chaque compartiment et son histogramme temporel.
- Permettre de repérer les rares diminutions temporaires d’entropie.
- Message : « ne diminue jamais » est une loi macroscopique ; les petits systèmes fluctuent.

## Partie IV — Entropie dans la matière, la chimie et les machines réelles

### Chapitre 12 — Diffusion, conduction, viscosité et frottements

- disparition des gradients ;
- processus dissipatifs ;
- production locale d’entropie ;
- relations d’Onsager présentées comme prolongement hors équilibre, non comme « quatrième principe ».

### Visualisation V12 — Carte de production d’entropie

Plaque bidimensionnelle avec gradient de température ou écoulement visqueux.

- Afficher champ de température, flux de chaleur et densité locale de production d’entropie.
- Basculer entre conduction, diffusion et viscosité.
- Message : l’entropie est produite là où les flux rencontrent des gradients.

### Chapitre 13 — Changements de phase et chimie

- fusion, vaporisation et chaleur latente ;
- potentiel chimique ;
- enthalpie libre de Gibbs ;
- critère `ΔG < 0` à température et pression constantes ;
- équilibre et réaction chimique.

### Visualisation V13 — Diagramme de phase et bilan d’entropie

- Chauffer de la glace jusqu’à la vapeur.
- Afficher simultanément température, énergie ajoutée, phase et entropie.
- Montrer les plateaux de changement de phase.
- Option avancée : trajectoire sur un diagramme `T–S`.

### Chapitre 14 — Exergie et efficacité réelle

- différence entre énergie et énergie disponible ;
- destruction d’exergie ;
- température de l’environnement ;
- turbines, échangeurs, centrales, réfrigérateurs et pompes à chaleur.

### Visualisation V14 — Sankey énergie/exergie

Comparer une centrale idéale et une centrale réelle.

- Les flux d’énergie restent conservés.
- L’exergie utile diminue avec les irréversibilités.
- Les pertes sont reliées à la création d’entropie.
- Message : l’énergie ne disparaît pas ; sa qualité thermodynamique se dégrade.

## Partie V — Ordre local et vivant

### Chapitre 15 — Systèmes ouverts et auto-organisation

- flux de matière et d’énergie ;
- ordre local et production globale d’entropie ;
- métabolisme ;
- rôle du Soleil et du rayonnement terrestre ;
- structures dissipatives, avec prudence sur les extrapolations sociales.

### Visualisation V15 — Bilan d’un organisme simplifié

Schéma de flux montrant nourriture, énergie chimique, travail, chaleur, déchets et entropie.

- Comparer système fermé fictif et organisme ouvert.
- Message : la vie ne viole pas le second principe ; elle maintient une organisation locale en exportant de l’entropie.

### Visualisation V16 — Modèle d’Ising

- Grille de spins et algorithme de Metropolis.
- Paramètres : température, taille et champ magnétique.
- Sorties : énergie, magnétisation, fluctuations et histogrammes.
- Message : ordre, désordre, équilibre et transition de phase ne se réduisent pas à une opposition visuelle simple.
- Niveau : approfondissement, car le calcul direct de l’entropie demande des précautions.

## Partie VI — Entropie et information

### Chapitre 16 — Shannon

Introduire :

\[
H = -\sum_i p_i \log_2 p_i
\]

- information, incertitude et surprise ;
- unité en bits ;
- compression et codage ;
- ressemblance mathématique et différence physique avec l’entropie thermodynamique.

### Visualisation V17 — Atelier de codage

Le lecteur construit un alphabet et modifie la fréquence des symboles.

- Calcul de l’entropie de Shannon ;
- comparaison avec la longueur moyenne d’un code préfixe simple ;
- visualisation de la redondance ;
- message : une source prévisible se compresse mieux.

### Chapitre 17 — Maxwell, Szilard et Landauer

- démon de Maxwell ;
- moteur de Szilard ;
- mesure, mémoire, contrôle et effacement ;
- coût minimal `k_B T ln 2` d’un effacement logique irréversible ;
- distinction entre coût de la mesure et coût de l’effacement.

### Visualisation V18 — Démon de Maxwell complet

Développer la spécification déjà extraite dans le corpus :

- deux compartiments, particules et porte ;
- tri par vitesse ;
- températures et distributions dans chaque compartiment ;
- mémoire du démon représentée explicitement ;
- compteur de bits mémorisés et effacés ;
- bilans séparés : gaz, démon, environnement et total ;
- modes idéal, erreurs de mesure et latence ;
- message : la baisse d’entropie du gaz n’implique pas une baisse de l’entropie totale.

### Visualisation V19 — Un bit physique

Potentiel à double puits représentant `0` et `1`.

- Séquence : état inconnu, mesure, compression logique, effacement.
- Variation de la barrière, de la température et de la vitesse d’opération.
- Affichage du coût minimal de Landauer et du coût réel simulé.

### Chapitre 18 — Entropie quantique

- état pur et état mixte ;
- matrice de densité ;
- entropie de von Neumann ;
- intrication ;
- différence entre incertitude classique et quantique.

### Visualisation V20 — Paire quantique simplifiée

Comparer mélange classique et paire intriquée avec les mêmes probabilités de mesure locales.

- Afficher entropie globale et entropies réduites.
- Présenter la visualisation comme un modèle mathématique, non comme un simulateur complet de laboratoire.

## Partie VII — Entropie et flèche du temps

### Chapitre 19 — Du réversible microscopique à l’irréversible macroscopique

- symétrie temporelle de nombreuses lois ;
- coarse-graining ;
- conditions initiales ;
- croissance de l’entropie et mémoire du passé ;
- décohérence en approfondissement.

### Visualisation V21 — Deux descriptions du même système

Une animation de particules conserve toute l’information microscopique tandis qu’une seconde vue regroupe les états en cases macroscopiques.

- Possibilité d’inverser exactement les vitesses dans le modèle idéal.
- Ajout progressif d’incertitude numérique ou de coarse-graining.
- Message : l’irréversibilité observée dépend aussi du niveau de description et de la condition initiale.

### Chapitre 20 — Les flèches du temps

- thermodynamique ;
- cosmologique ;
- radiative ;
- causale ;
- psychologique ;
- liens démontrés, liens plausibles et interprétations.

## Partie VIII — Gravitation, trous noirs et Univers

### Chapitre 21 — Pourquoi la gravitation change l’intuition

- tendance à l’homogénéité d’un gaz sans gravitation ;
- formation de structures dans un système gravitationnel ;
- entropie gravitationnelle et absence d’une définition universelle simple ;
- faible entropie gravitationnelle initiale chez Penrose.

### Visualisation V22 — Gaz sans gravitation / matière autogravitante

Comparaison côte à côte de deux modèles ayant les mêmes positions initiales.

- Sans gravitation : homogénéisation.
- Avec attraction : formation d’amas et échauffement.
- Indicateurs séparés : homogénéité, énergie, structure et proxy d’entropie.
- Avertissement permanent : le proxy de structure n’est pas une entropie gravitationnelle exacte.

### Chapitre 22 — Bekenstein et Hawking

- lois mécaniques des trous noirs ;
- aire de l’horizon ;
- entropie de Bekenstein-Hawking ;
- température et rayonnement de Hawking ;
- second principe généralisé.

### Visualisation V23 — Calculateur de trou noir

- Paramètre principal : masse.
- Sorties : rayon de Schwarzschild, aire, température, entropie et temps d’évaporation approximatif.
- Comparaisons : masse terrestre, solaire et trou noir supermassif.
- Échelles logarithmiques obligatoires.
- Message : plus un trou noir est massif, plus il est froid et plus son entropie est grande.

### Chapitre 23 — Paradoxe de l’information

- évaporation ;
- caractère thermique du rayonnement ;
- information apparente perdue ;
- courbe de Page ;
- statut actuel présenté sans annoncer de solution définitive.

### Visualisation V24 — Courbe de Page conceptuelle

Comparer deux scénarios : information définitivement perdue et évolution unitaire.

- Afficher entropie du trou noir, entropie du rayonnement et entropie totale pertinente.
- Distinguer schéma conceptuel et prédiction directement observable.

### Chapitre 24 — Histoire thermique de l’Univers

- condition initiale ;
- rayonnement primordial ;
- formation des étoiles, galaxies et trous noirs ;
- domination entropique des trous noirs ;
- expansion et scénarios de mort thermique ;
- limites des estimations cosmologiques.

### Visualisation V25 — Frise logarithmique de l’entropie cosmique

Frise allant de l’Univers primordial au futur lointain.

- Contributions séparées : rayonnement, matière, étoiles et trous noirs.
- Incertitudes affichées comme intervalles ou ordres de grandeur.
- Encadrés spéculatifs distincts : Penrose CCC et sélection cosmologique de Smolin.

## Partie IX — Synthèse, exercices et outils de lecture

### Chapitre 25 — Une famille de concepts, pas un mot unique

Comparer dans un tableau final :

- Clausius ;
- Boltzmann ;
- Gibbs ;
- Shannon ;
- von Neumann ;
- Bekenstein-Hawking.

Pour chacune : objet étudié, formule, unité, états considérés, interprétation et domaine de validité.

### Visualisation V26 — Carte interactive des entropies

Graphe conceptuel reliant les six définitions.

- Cliquer sur une définition affiche sa formule, ses hypothèses et un exemple.
- Les liens indiquent « généralise », « analogue mathématique », « relie physiquement » ou « ne doit pas être confondu avec ».
- Cette carte devient la navigation générale du dossier numérique.

### Chapitre 26 — Idées reçues

Traiter explicitement :

- « l’entropie est le désordre » ;
- « l’entropie augmente partout et à chaque instant » ;
- « l’énergie finit par disparaître » ;
- « la vie viole le second principe » ;
- « information de Shannon et entropie physique sont identiques » ;
- « une structure plus visible signifie toujours moins d’entropie » ;
- « le second principe interdit toute fluctuation ».

### Chapitre 27 — Exercices progressifs

1. rendement de Carnot ;
2. mélange calorimétrique ;
3. détente isotherme ;
4. multiplicité dans deux compartiments ;
5. deux solides d’Einstein ;
6. cycle Otto corrigé ;
7. cycle Diesel avec taux de coupure fourni ;
8. source de Shannon ;
9. coût de Landauer ;
10. trou noir de Schwarzschild.

Chaque exercice doit comporter données, hypothèses, solution détaillée, unités, contrôle d’ordre de grandeur et interprétation physique.

## 5. Système commun des visualisations

Les visualisations ne doivent pas être des illustrations décoratives. Chacune doit répondre à une question scientifique unique et comporter :

- un objectif formulé avant l’interaction ;
- un état initial déterministe et compréhensible ;
- au plus trois paramètres principaux visibles simultanément ;
- une animation contrôlable : lecture, pause, pas à pas et réinitialisation ;
- un affichage des grandeurs conservées ;
- un bilan d’entropie clairement décomposé ;
- une légende indiquant unités et conventions ;
- une rubrique « ce que le modèle néglige » ;
- un résumé textuel dynamique pour l’accessibilité ;
- une expérience guidée et un mode libre ;
- un bouton permettant de retrouver l’exemple de référence.

### Langage visuel commun

- Bleu : réservoir froid ou flux sortant froid.
- Rouge/orange : réservoir chaud ou apport thermique.
- Vert : travail ou énergie utile.
- Violet : information et mémoire.
- Gris : environnement et dissipation.
- Courbes pleines : résultats calculés.
- Courbes pointillées : limites idéales ou scénarios contrefactuels.
- Badges distincts : `mesuré`, `calculé`, `approximation`, `hypothèse`.

La couleur ne doit jamais être le seul moyen de transmettre une distinction.

### Architecture fonctionnelle proposée

Toutes les visualisations React devraient partager :

- un composant de cadre pédagogique avec titre, question, hypothèses et limites ;
- des contrôles communs de lecture et de vitesse ;
- un système commun de variables, unités et formatage scientifique ;
- des graphiques accessibles et exportables sous forme de données ;
- une graine aléatoire enregistrable pour reproduire une expérience ;
- un panneau de bilan énergétique et entropique ;
- un mode mobile et un mode projection ;
- des tests numériques portant sur les invariants physiques ;
- une couche de contenu séparée du moteur de simulation afin de faciliter la correction scientifique et la traduction.

## 6. Priorisation des visualisations

### Lot A — Noyau indispensable

1. V2 — machine thermique et flux ;
2. V3 — cycle de Carnot synchronisé ;
3. V6 — mélange calorimétrique ;
4. V7 — grille issue de `app-react.jsx` ;
5. V8 — multiplicité à deux compartiments ;
6. V9 — solides d’Einstein ;
7. V18 — démon de Maxwell complet ;
8. V26 — carte des différentes entropies.

Ce lot suffit à construire le fil central : machines → entropie thermodynamique → micro-états → information.

### Lot B — Applications et approfondissements

- V4 — Joule ;
- V5 — frontières des systèmes ;
- V10 — distributions de Gibbs ;
- V11 — fluctuations ;
- V12 — production locale ;
- V13 — changements de phase ;
- V14 — exergie ;
- V17 — Shannon ;
- V19 — Landauer.

### Lot C — Matière complexe et cosmologie

- V15 — organisme ouvert ;
- V16 — Ising ;
- V20 — entropie quantique ;
- V21 — réversibilité et coarse-graining ;
- V22 — gravitation ;
- V23 — calculateur de trou noir ;
- V24 — courbe de Page ;
- V25 — frise cosmique.

## 7. Contenus documentaires à rechercher ou compléter

### Fondements

- définition moderne de l’entropie et conventions de bilan ;
- démonstration du théorème de Carnot ;
- formulation correcte de l’inégalité de Clausius ;
- fondements des ensembles statistiques de Gibbs ;
- fluctuations et théorèmes associés.

### Information

- travaux de Leo Szilard ;
- article et principe de Rolf Landauer ;
- distinction mesure/effacement ;
- correspondances et limites du rapprochement Boltzmann-Shannon ;
- entropie de von Neumann.

### Applications

- données réalistes de machines thermiques ;
- exergie et théorème de Gouy-Stodola ;
- entropies de changement de phase ;
- thermodynamique des systèmes ouverts et du vivant.

### Cosmologie

- faible entropie gravitationnelle initiale ;
- lois de la mécanique des trous noirs ;
- formule de Bekenstein-Hawking ;
- second principe généralisé ;
- paradoxe de l’information et courbe de Page ;
- estimations de l’inventaire entropique cosmique.

Les sources prioritaires seront les ouvrages de référence, articles originaux, revues scientifiques et cours universitaires. Wikipédia, vidéos, blogs et médias serviront surtout à repérer des formulations ou des pistes, non à établir seuls les affirmations centrales.

## 8. Annexes du dossier

- glossaire ;
- symboles, unités et constantes ;
- conventions de signe ;
- démonstrations longues ;
- solutions des exercices ;
- frise historique ;
- portraits abrégés ;
- bibliographie normalisée ;
- index des notions ;
- index des visualisations ;
- fiche technique de chaque simulation ;
- tableau des idées reçues et corrections.

## 9. Phases de réalisation

### Phase 1 — Consolidation scientifique

- dédupliquer les textes extraits ;
- fixer les définitions et notations ;
- vérifier les affirmations et citations ;
- reconstruire la bibliographie ;
- classer chaque contenu comme établi, modélisé, analogique ou spéculatif.

### Phase 2 — Prototype éditorial

- rédiger l’ouverture et les parties I à III ;
- produire V2, V6, V7, V8 et V9 ;
- tester la compréhension auprès de lecteurs non spécialistes ;
- ajuster le niveau mathématique.

### Phase 3 — Information et applications

- rédiger les parties IV à VI ;
- produire V3, V14, V17, V18 et V19 ;
- harmoniser exercices, graphiques et conventions.

### Phase 4 — Temps et cosmologie

- rédiger les parties VII et VIII ;
- produire V21, V23, V24 et V25 ;
- faire relire la cosmologie et la physique de l’information par des spécialistes.

### Phase 5 — Finalisation

- intégrer portraits, glossaire et annexes ;
- vérifier tous les calculs ;
- effectuer les tests d’accessibilité et de compatibilité mobile ;
- vérifier que chaque visualisation comporte hypothèses et limites ;
- relire l’ensemble pour supprimer contradictions et répétitions.

## 10. Critères d’un dossier réussi

Le dossier sera considéré comme abouti si :

- un lecteur peut expliquer l’entropie sans employer uniquement le mot « désordre » ;
- la différence entre entropie du système, du milieu et de l’ensemble est claire ;
- les approches de Clausius, Boltzmann, Gibbs et Shannon sont reliées sans être confondues ;
- les limites du rendement des machines deviennent intuitives et calculables ;
- les fluctuations et systèmes ouverts ne semblent pas violer le second principe ;
- le démon de Maxwell est expliqué jusqu’au rôle de l’effacement de l’information ;
- les affirmations cosmologiques sont accompagnées de leur degré de certitude ;
- chaque formule possède un exemple, des unités et un domaine de validité ;
- chaque visualisation produit une observation ou un calcul reproductible ;
- toutes les sources importantes sont complètes, vérifiées et accessibles.

## 11. Décisions à confirmer avant rédaction

Les choix recommandés par défaut sont :

- public principal : lycée avancé et grand public scientifique ;
- format : dossier numérique illustré avec visualisations React intégrées ;
- lecture : récit principal sans calcul obligatoire, encadrés mathématiques optionnels ;
- longueur indicative : 50 à 80 pages hors annexes ;
- périmètre initial des développements interactifs : lot A ;
- ton : précis, sobre, narratif, sans hyperboles biographiques ;
- politique scientifique : signaler explicitement hypothèses, approximations et questions ouvertes.
