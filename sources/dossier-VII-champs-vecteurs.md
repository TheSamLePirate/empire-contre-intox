# Dossier VII — Le langage des champs (Samlepirate, d'après 3Blue1Brown)

Audit de `samlepirate/champs-vecteurs.html` — vérification affirmation par affirmation.
Réalisé le **25 août 2026**.

**Légende des verdicts :** ✅ Confirmé · ⚠️ Approximatif / à nuancer · 🔶 Débattu ou non revérifiable ici · ❌ Erroné (corrigé) · 🛠️ Corrigé après audit

## La méthode, ici : le calcul avant la recherche web

Ce dossier est le **portage français** d'un épisode de 3Blue1Brown. Il n'affirme presque
aucun fait du monde : il pose des **définitions**, des **identités** et des **exemples
analytiques**. L'essentiel de la vérification se fait donc **en recalculant**, pas en
cherchant une source qui dise la même chose — la même logique qu'au Dossier XXVII, où la
vérification passait par l'exécution du code.

Concrètement :

- les **six champs de l'atelier** ont été dérivés symboliquement (SymPy) et leurs
  divergence et rotationnel comparés aux deux nombres que la page affiche ;
- l'**équilibre du modèle proie-prédateur** a été recalculé à partir des coefficients
  réellement câblés dans le JavaScript, et l'existence d'orbites **fermées** démontrée
  par l'invariant du système ;
- les **constantes d'affichage** (nombre de particules, densité de la grille, loi de
  raccourcissement, champ génératif du hero) ont été relevées dans le code, pas dans le
  texte ;
- seules les affirmations **historiques et physiques** — les quatre équations, les
  monopôles, la source elle-même — ont demandé une recherche documentaire.

**39 affirmations auditées : 34 ✅, 3 ⚠️, 1 🔶, 1 ❌ corrigé.** · **4 DOI vérifiés
Crossref** → [`refs-doi-VII-champs-vecteurs.md`](refs-doi-VII-champs-vecteurs.md)

---

## A. Définitions et identités mathématiques *(vérifiées par le calcul)*

### A1 — Norme d'un vecteur en 2D
> « $\lVert\vec v\rVert=\sqrt{v_x^{2}+v_y^{2}}$ »

**✅ Confirmé.** Théorème de Pythagore. La distinction que fait le dossier — un vecteur
porte l'intensité *et* la direction, un scalaire seulement la première — est exacte.
**Source :** géométrie euclidienne élémentaire.

### A2 — Un champ est une fonction
> « $f:\mathbb{R}^2\rightarrow\mathbb{R}$ » (champ scalaire) et
> « $\vec F:\mathbb{R}^2\rightarrow\mathbb{R}^2$ » (champ de vecteurs)

**✅ Confirmé.** Écriture standard. Le dossier a raison d'insister : le mot « champ » ne
dit rien de la nature de la grandeur, c'est l'adjectif qui suit qui la précise.
**Source :** analyse à plusieurs variables, définitions de manuel.

### A3 — Le gradient
> « $\nabla f=\left(\partial f/\partial x,\ \partial f/\partial y\right)$ … pointe partout
> vers la plus forte *montée* »

**✅ Confirmé.** Le gradient est bien le vecteur de plus forte pente ascendante, et il est
partout orthogonal aux lignes de niveau.
**Source :** analyse vectorielle · [`dossier-XIV-formules.md`](dossier-XIV-formules.md), ligne « Gradient ∇f ».

### A4 — Dériver d'un potentiel
> « Un écoulement dérive d'un potentiel quand il s'écrit $\vec F=-\nabla V$ »

**✅ Confirmé.** C'est la convention de physique : le signe moins est ce qui fait qu'une
force *dévale* le potentiel au lieu de le remonter. Le dossier l'explicite (« son opposé
dévale la pente »).
**Source :** mécanique classique, définition du champ conservatif.

### A5 — La divergence, forme calculatoire
> « $\nabla\cdot\vec F=\partial F_x/\partial x+\partial F_y/\partial y$ »

**✅ Confirmé.** Définition standard en coordonnées cartésiennes.

### A6 — La divergence, forme intégrale
> « $\operatorname{div}\vec F(p)=\lim_{A\to 0}\frac{1}{A}\oint_{\partial A}\vec F\cdot\vec n\,\mathrm d\ell$ »

**✅ Confirmé.** C'est la définition intrinsèque de la divergence, et son égalité avec A5
est le **théorème de la divergence** (Green-Ostrogradski) appliqué à une région qui se
contracte sur un point. La formulation du dossier — « la première se calcule, la seconde
dit ce que ça veut dire » — est juste et pédagogiquement honnête.
**Source :** analyse vectorielle, théorème de flux-divergence.

### A7 — Le rotationnel 2D
> « $(\nabla\times\vec F)_z=\partial F_y/\partial x-\partial F_x/\partial y$ »

**✅ Confirmé.** C'est exactement la composante $z$ du rotationnel d'un champ plan. Le
dossier ne masque pas la simplification : il lui consacre un encadré (« Le vrai
rotationnel est tridimensionnel »).

### A8 — Le rotationnel 3D en déterminant
> Le déterminant symbolique $\vec\imath,\vec\jmath,\vec k$ / $\partial_x,\partial_y,\partial_z$ / $F_x,F_y,F_z$

**✅ Confirmé.** Présentation usuelle et correcte, ligne pour ligne. La mention de la
règle de la main droite est exacte.

### A9 — Le produit scalaire
> « $\vec a\cdot\vec b=\lVert\vec a\rVert\,\lVert\vec b\rVert\cos\theta$ … mesure à quel
> point deux vecteurs sont alignés »

**✅ Confirmé.** Définition standard, interprétation correcte.

### A10 — Le produit vectoriel
> « $\lVert\vec a\times\vec b\rVert=\lVert\vec a\rVert\,\lVert\vec b\rVert\sin\theta$ …
> mesure à quel point deux vecteurs sont perpendiculaires »

**✅ Confirmé.** Définition standard de la norme du produit vectoriel.

### A11 — « La divergence est l'analogue d'une dérivée »
> « elle prend un point et rend un simple nombre, dépendant du comportement du champ dans
> un petit voisinage. En cela, c'est l'analogue d'une dérivée »

**✅ Confirmé.** L'analogie est exacte au sens précis où l'entend le dossier : un opérateur
local, qui ne regarde qu'un voisinage infinitésimal, et qui transforme un champ en une
nouvelle fonction. Le chapitre VIII la précise ensuite formellement, par le produit
scalaire d'un pas et du changement qu'il provoque.

### A12 — Incompressible ⇒ divergence nulle partout
> « Pour un vrai fluide comme l'eau […] s'il est incompressible, son champ de vitesse doit
> avoir une divergence nulle en tout point »

**✅ Confirmé.** C'est l'équation de continuité à masse volumique constante : $\nabla\cdot\vec v=0$.
Le dossier prend soin de distinguer le **vrai** fluide du fluide imaginé qui sert d'image —
la précision est utile, et elle est juste.
**Source :** mécanique des fluides, équation de continuité.

---

## B. L'atelier et le code de la page *(vérifiés par dérivation symbolique et lecture du code)*

### B1 à B6 — Les six champs et leurs deux nombres

**✅ Confirmé — 6 sur 6.** Chacun des six champs proposés par l'atelier a été dérivé
symboliquement, et les valeurs de divergence et de rotationnel affichées à côté par la
page ont été comparées au résultat.

| # | Champ | $\vec F$ | $\nabla\cdot\vec F$ recalculé | $(\nabla\times\vec F)_z$ recalculé | Affiché par la page |
|---|---|---|---|---|---|
| B1 | Source | $(x,\ y)$ | $2$ | $0$ | `+2` / `0` ✅ |
| B2 | Puits | $(-x,\ -y)$ | $-2$ | $0$ | `-2` / `0` ✅ |
| B3 | Tourbillon | $(-y,\ x)$ | $0$ | $2$ | `0` / `+2` ✅ |
| B4 | Cisaillement | $(y,\ 0)$ | $0$ | $-1$ | `0` / `-1` ✅ |
| B5 | Selle | $(x,\ -y)$ | $0$ | $0$ | `0` / `0` ✅ |
| B6 | Spirale | $(x-y,\ x+y)$ | $2$ | $2$ | `+2` / `+2` ✅ |

Le cas de la **selle** mérite d'être relevé : c'est le seul champ visuellement agité dont
les *deux* nombres sont nuls, et c'est exactement ce que le dossier en dit (« il sort à
droite/gauche, il entre en haut/bas : tout se compense »).
**Source :** `samlepirate/champs-vecteurs.html`, `const F={…}` · dérivation symbolique SymPy.

### B7 — L'équilibre du modèle proie-prédateur
> « Son flot tourne en boucles fermées autour de l'équilibre $(\gamma/\delta,\ \alpha/\beta)$ »

**✅ Confirmé.** C'est bien le point fixe non trivial du système. Avec les coefficients
réellement câblés dans le portrait de phase — $\alpha=0{,}9$, $\beta=0{,}5$, $\gamma=0{,}9$,
$\delta=0{,}5$ — l'équilibre tombe en **$(1{,}8\ ;\ 1{,}8)$**, au centre d'un domaine qui va
de $0$ à $3{,}4$. La page marque ce point d'un disque ambre : il est au bon endroit.
**Source :** code de la page (atelier II) · résolution de $\alpha x-\beta xy=0$ et $\delta xy-\gamma y=0$.

### B8 — L'orientation des ateliers
> « Nos ateliers suivent la convention mathématique » *(axe $y$ vers le haut, antihoraire positif)*

**✅ Confirmé dans le code.** La transformation écran est `H/2-(y/R)*(H/2)` : l'axe $y$
pointe bien vers le haut. Conséquence vérifiable à l'écran : le *Tourbillon* $(-y,\ x)$,
qui tourne dans le sens antihoraire, y porte un rotationnel **positif** $+2$. La convention
annoncée est celle réellement appliquée.

### B9 — La loi de raccourcissement des flèches
> « On raccourcit artificiellement celles qui débordent »

**✅ Confirmé.** Le code applique $L = 28\,m/(1+0{,}6\,m)$ dans l'atelier et une loi de même
forme dans la figure 1 : une fonction croissante et **bornée**, donc les flèches longues
sont comprimées sans jamais être inversées ni tronquées. La couleur, elle, reste indexée
sur la norme réelle — ce que le dossier annonce comme « un petit mensonge » utile est donc
un mensonge *documenté et monotone*, ce qui est la bonne façon de le faire.

### B10 — Ce que l'atelier affiche
> « 440 particules », « une grille de flèches »

**✅ Confirmé.** `const N=440` pour les particules ; `G=13` avec une boucle `i<=G`, soit
**14 × 14 = 196 flèches**. Le portrait de phase, lui, lâche `N=300` trajectoires.

### B11 — Le hero est un champ calculé
> Le hero « rendu en direct »

**✅ Confirmé.** Le champ génératif est
$\theta(x,y,t)=\pi\left[\sin(0{,}0042x+0{,}18t)+\cos(0{,}0039y-0{,}13t)+0{,}6\sin(0{,}0026(x+y)+0{,}09t)\right]$,
et le nombre de particules est plafonné : `Math.round(Math.min(1700, surface/620))` — donc
**au plus 1 700**, moins sur un petit écran. Rien n'est pré-dessiné.

### B12 — « Le cas du chapitre IV » *(champ Cisaillement)*
> Description du champ *Cisaillement* : « Lent en bas, rapide en haut : pas de source, mais
> un rotationnel non nul. **Le cas du chapitre IV.** »

**❌ Erroné → 🛠️ Corrigé.** Le chapitre IV traite de la **divergence**, et ce champ a
précisément une divergence *nulle*. Le cisaillement est l'exemple du **chapitre V — Le
rotationnel**, où il est nommé et discuté (« Un point au cœur d'une zone de cisaillement…
a un rotationnel non nul »). Vraisemblablement un renvoi resté figé après une
renumérotation des chapitres.

**Correction appliquée** dans `samlepirate/champs-vecteurs.html` (`F.cisaillement.d`) :
« Le cas du chapitre **V**. »

---

## C. Électromagnétisme

### C1 — La loi de Gauss
> « La divergence du champ électrique en un point est proportionnelle à la densité de charge
> qui s'y trouve » · $\nabla\cdot\vec E=\rho/\varepsilon_0$

**✅ Confirmé.** Forme différentielle en unités SI, sans faute. La lecture « fluide » —
charges positives = sources, négatives = puits, vide = incompressible — est une image
exacte de ce que dit l'équation, et le dossier la présente comme une image (voir C7).

### C2 — Pas de source ni de puits pour le champ magnétique
> $\nabla\cdot\vec B=0$

**✅ Confirmé.** Deuxième équation de Maxwell, forme différentielle standard.

### C3 — « Les monopôles magnétiques n'existent pas »
> « Autrement dit, les **monopôles magnétiques** — un pôle nord ou sud isolé — *n'existent
> pas* : rien d'analogue aux charges positives et négatives de l'électricité »

**⚠️ À nuancer.** L'affirmation est trop absolue. Ce qui est établi : **aucun monopôle
magnétique n'a jamais été détecté**, et $\nabla\cdot\vec B=0$ traduit cette absence dans
l'électromagnétisme classique. Mais plusieurs théories au-delà du Modèle standard — les
théories de grande unification, la théorie des cordes — en **prédisent** l'existence, et
la recherche expérimentale est active : l'expérience **MoEDAL** au CERN a publié en 2024
les limites de masse les plus contraignantes à ce jour sur les monopôles produits par
effet Schwinger, sans aucun signal.

**Formulation défendable :** « aucun monopôle magnétique n'a jamais été observé — et
c'est exactement ce que dit $\nabla\cdot\vec B=0$ ».

**Sources :** [MoEDAL Collaboration (2024), *Phys. Rev. Lett.* 133, 071803](https://doi.org/10.1103/PhysRevLett.133.071803) · [CERN — MoEDAL zeroes in on magnetic monopoles](https://home.cern/news/news/physics/moedal-zeroes-magnetic-monopoles)

### C4 — Faraday et Ampère-Maxwell
> $\nabla\times\vec E=-\partial\vec B/\partial t$ et $\nabla\times\vec B=\mu_0\vec J+\mu_0\varepsilon_0\,\partial\vec E/\partial t$

**✅ Confirmé.** Formes différentielles SI correctes, signes compris. Le **terme de courant
de déplacement** $\mu_0\varepsilon_0\,\partial\vec E/\partial t$ — celui qui rend les ondes
possibles, et l'apport propre de Maxwell — est bien présent.

### C5 — « Ce va-et-vient donne naissance aux ondes lumineuses »
**✅ Confirmé.** C'est le résultat central de Maxwell (1865) : la combinaison des deux
équations de rotationnel donne une équation d'onde dont la vitesse de propagation vaut
$1/\sqrt{\mu_0\varepsilon_0}$, soit la vitesse de la lumière — d'où sa conclusion que la
lumière *est* une onde électromagnétique.
**Source :** [Maxwell, J. C. (1865)](https://doi.org/10.1098/rstl.1865.0008), *Phil. Trans. R. Soc. Lond.*, p. 459-512.

### C6 — « L'électricité et le magnétisme tiennent en quatre équations — les équations de Maxwell »
**⚠️ À nuancer — attribution.** Les **quatre** équations vectorielles affichées ne sont pas
la rédaction de Maxwell. Son mémoire de 1865 en compte une vingtaine, écrites en
composantes. C'est **Oliver Heaviside** qui, en 1884 — parallèlement à des travaux voisins
de Gibbs et de Hertz —, les ramène à quatre équations vectorielles en éliminant le
potentiel vecteur, à l'aide du calcul vectoriel qu'il venait lui-même de forger. Le groupe
fut d'ailleurs longtemps appelé « équations de Hertz-Heaviside ».

Ce n'est pas une erreur du dossier — l'usage universel dit « équations de Maxwell » — mais
la précision mérite d'être portée, d'autant que **le dossier parle précisément de la
notation** $\nabla\cdot$ et $\nabla\times$ au chapitre VIII : cette notation-là est
justement celle de Heaviside.

**Sources :** [IEEE Spectrum — The Long Road to Maxwell's Equations](https://spectrum.ieee.org/the-long-road-to-maxwells-equations) · [`dossier-XIV-formules.md`](dossier-XIV-formules.md), ligne « Équations de Maxwell (4) · Maxwell 1865 ; forme moderne de Heaviside »

### C7 — « Il n'existe pas de fluide électrique au sens propre »
> Encadré « Esprit critique » : « Le modèle source/puits est une **image** […] Savoir
> distinguer la **métaphore** du **fait** — et dire laquelle est laquelle — c'est tout l'art
> de bien vulgariser sans tromper »

**✅ Confirmé — et c'est exactement la méthode que la charte du projet demande.** Le
dossier signale lui-même son propre modèle comme modèle. Rien à corriger ; à citer en
exemple.

### C8 — « Une idée purement tridimensionnelle »
> À propos des deux dernières équations de Maxwell

**✅ Confirmé.** Le rotationnel « propre » n'est défini comme vecteur qu'en dimension 3, et
la propagation d'une onde électromagnétique met en jeu trois directions orthogonales
($\vec E$, $\vec B$ et la direction de propagation). La restriction 2D du dossier ne peut
donc pas rendre ces deux équations, et il le dit.

---

## D. Le modèle proie-prédateur

### D1 — L'écriture du système
> $\dot x=\alpha x-\beta xy$ et $\dot y=\delta xy-\gamma y$, avec $x$ les proies et $y$ les prédateurs

**✅ Confirmé.** Forme canonique de Lotka-Volterra, avec la bonne assignation des variables.
**Sources :** [Lotka, A. J. (1920)](https://doi.org/10.1073/pnas.6.7.410), *PNAS* 6, 410-415 · [Volterra, V. (1926)](https://doi.org/10.1038/118558a0), *Nature* 118, 558-560.

### D2 — « Il tourne en boucles fermées autour d'un équilibre : des cycles »
**✅ Confirmé, et démontré.** Le système admet la quantité conservée
$V=\delta x-\gamma\ln x+\beta y-\alpha\ln y$ : sa dérivée le long des trajectoires est
**exactement nulle** (vérifié symboliquement). Les orbites sont donc des courbes de niveau
fermées autour du point fixe, qui est un **centre** — les cycles sont neutralement stables,
d'amplitude fixée par les conditions initiales, ce que le portrait de phase montre bien.

*Détail que le dossier ne relève pas, et qui ne le contredit pas :* le champ de l'espace
des phases n'est pas de divergence nulle — $\nabla\cdot\vec F=\alpha-\beta y+\delta x-\gamma$ —
et cette divergence s'annule sur une droite qui **passe exactement par l'équilibre**. Le
« flot de phase » est donc compressible, ce qui n'empêche nullement les orbites d'être
fermées : c'est l'invariant $V$, et non l'incompressibilité, qui les ferme.

### D3 — « Beaucoup de renards et peu de lapins ? Les renards déclinent, les lapins aussi »
**✅ Confirmé par le calcul.** $\dot x=x(\alpha-\beta y)<0$ quand $y$ est grand, et
$\dot y=y(\delta x-\gamma)<0$ quand $x$ est petit. Les deux populations décroissent
simultanément dans ce quadrant, exactement comme le dit la page.

---

## E. La source et les attributions

### E1 — L'épisode d'origine
> « l'épisode de **3Blue1Brown** (Grant Sanderson) sur la divergence et le rotationnel —
> "le langage des équations de Maxwell, de l'écoulement des fluides, et bien plus" »

**✅ Confirmé.** L'épisode existe et porte ce titre : *« Divergence and curl: The language
of Maxwell's equations, fluid flow, and more »*, publié le **21 juin 2018** par Grant
Sanderson. Le sous-titre repris par le dossier en est la traduction fidèle.
**Sources :** [3blue1brown.com — Divergence and curl](https://www.3blue1brown.com/lessons/divergence-and-curl/) · [YouTube — rB83DpBJQsE](https://www.youtube.com/watch?v=rB83DpBJQsE)

### E2 — Les sept citations entre guillemets
**⚠️ À nuancer — ce sont des traductions.** Les sept `blockquote` attribués à
« 3Blue1Brown — Divergence & rotationnel » sont des **traductions françaises** du
commentaire anglais de l'épisode, pas des citations littérales. Leur contenu est fidèle au
propos, mais un lecteur qui chercherait la phrase exacte dans la vidéo ne la trouverait pas
mot pour mot. Le dossier crédite correctement l'origine (hero, bandeau de crédit, pied de
page, carte d'index) et se présente lui-même comme un « portage en français » — la nuance
est donc portée, mais elle gagnerait à l'être **au niveau des citations elles-mêmes**.

**Formulation suggérée :** ajouter *« traduit de l'anglais »* dans le `.src` des
blockquotes, ou une mention unique en tête de dossier.

### E3 — La convention de signe attribuée à 3Blue1Brown
> « 3Blue1Brown appelle **positif** le sens **horaire**, car l'axe vertical est inversé à
> l'écran »

**🔶 Attribution non revérifiée à la source.** L'affirmation *mathématique* est
irréprochable — inverser l'axe vertical inverse le signe du rotationnel, et c'est bien le
piège que l'encadré signale. Mais l'attribution de cette convention à l'épisode lui-même
n'a pas pu être revérifiée ici : elle demanderait de repasser la vidéo image par image, ce
qui sort du cadre d'un audit documentaire.

Ce qui *est* vérifié : les ateliers du dossier suivent bien la convention mathématique
qu'ils annoncent (voir **B8**), et le Dossier XIV dit la même chose (« la brindille du
rotationnel tourne dans le sens du fluide, convention mathématique, antihoraire positif »).
Le garde-fou reste donc utile et cohérent quelle que soit l'attribution.

### E4 — Le compagnon interactif
> « Le Visualiseur Maths & Physique […] 130 000 particules en WebGPU et les équations de
> Maxwell résolues en direct (FDTD) »

**✅ Confirmé quant à l'existence et à l'accessibilité.** L'application répond en **HTTP
200** à `https://thesamlepirate.github.io/maths-physic-Visuals/`. Les chiffres de
performance annoncés (130 000 particules, FDTD) sont ceux de son auteur, qui est aussi
l'auteur du dossier : ils relèvent de la description d'un outil propre, pas d'une
affirmation scientifique à sourcer.

*Remarque de politique du dépôt :* la charte préfère **embarquer** un compagnon d'équipe
plutôt que de dépendre d'un hébergeur tiers (cf. le simulateur du Dossier XXVII). Ce
compagnon reste externe. Ce n'est pas une erreur, mais c'est un point à trancher un jour.

---

## Synthèse

**39 affirmations auditées.**

| Verdict | Nombre | Détail |
|---|---|---|
| ✅ Confirmé | 34 | dont **12 identités mathématiques** vérifiées par le calcul et **11 constantes** relevées dans le code |
| ⚠️ À nuancer | 3 | **C3** monopôles « n'existent pas » · **C6** les quatre équations sont la forme de Heaviside · **E2** les citations sont des traductions |
| 🔶 Non revérifiable ici | 1 | **E3** la convention de signe attribuée à l'épisode |
| ❌ Erroné | 1 | **B12** « le cas du chapitre IV » pour le cisaillement |

### Corrections appliquées à la page

1. **B12 — le renvoi de chapitre du champ *Cisaillement*** : « chapitre IV » → « chapitre **V** »
   (`samlepirate/champs-vecteurs.html`, `F.cisaillement.d`). Seule erreur factuelle du dossier.

### Corrections de conformité appliquées en même temps

2. **Les huit lignes « Se lit »** ont été ajoutées sous les huit blocs de formules, comme
   la charte l'impose pour toute formule affichée — voie A comme voie B. Elles sont
   rendues dans les jetons de la page hôte (JetBrains Mono pour le libellé, Newsreader
   italique pour la phrase, filet à l'accent du chapitre), et vérifiées sans débordement
   de 360 à 3840 px.

### Ce qui reste ouvert

- **C3** et **C6** sont des **nuances d'écriture**, pas des erreurs : elles peuvent être
  portées par un encadré « anti-intox » (le dossier en a déjà deux, il sait le faire)
  plutôt que par une réécriture.
- **E2** demande soit une mention « traduit de l'anglais » dans les `.src`, soit une
  mention unique en tête de dossier.
- **E4** — le compagnon externe pourrait être embarqué, comme le simulateur du Dossier XXVII.

## Ce que l'audit n'a pas eu à corriger

Aucune donnée chiffrée fausse, aucune formule fautive, aucun signe inversé, aucune
attribution inventée. Pour un dossier de mathématiques qui va du produit scalaire aux
équations de Maxwell, c'est le résultat qu'on espère et qu'on ne trouve pas toujours. Les
deux encadrés d'auto-critique de la page — « Le vrai rotationnel est tridimensionnel » et
« Une fiction utile n'est pas un mensonge » — font une partie du travail de l'auditeur
avant lui.
