# Dossier XXVII — L'Ordinateur de 1983 · audit des affirmations

**Page auditée :** `samlepirate/ordinateur-1983/index.html`
**Auteur du dossier :** Samlepirate
**Date de l'audit :** 1er août 2026

## Nature de ce dossier et méthode de vérification

Ce dossier n'est pas issu d'une transcription de live : il est **écrit à partir d'un
objet technique précis**, le *Simulateur Logique Nodal* de Samlepirate — un ordinateur
8 bits complet (portes logiques, processeur, mémoire, assembleur, compilateur C,
amorceur, disque, système) tournant dans une page web.

La **source primaire est donc le code source du simulateur lui-même**, pas sa
documentation. Chaque affirmation portant sur la machine a été vérifiée en lisant le
fichier concerné, et, quand c'était possible, en **exécutant** le code : les sept
programmes assembleur et les trois compilations C présentés dans le dossier ont été
assemblés puis exécutés sur le processeur d'origine, et leurs sorties comparées
octet pour octet à celles affichées dans la page.

Quand la documentation du projet diverge de son propre code, **c'est le code qui fait
foi** — deux divergences ont été relevées et corrigées à ce titre (voir ⚠️ ci-dessous).

Les affirmations d'histoire et de théorie de l'informatique (De Morgan, Sheffer, von
Neumann, 6502, Ariane 5, endianness…) ont été vérifiées séparément, sur sources
primaires ou institutionnelles — voir `refs-XXVII-ordinateur-1983.md`.

- Dépôt du simulateur : https://github.com/TheSamLePirate/Simulateur-Logique-Nodal
- Application en ligne : https://computer-1983.puter.site
- Miroir : https://1983-computer.puter.site — https://puter.com/app/1983-computer

---

## A. La machine simulée — vérifié dans le code source

### A1. Les six portes logiques
> « Les six portes du simulateur, telles qu'elles sont définies dans son code source. »

**Verdict : ✅ confirmé.** `src/logic/gates.ts` définit exactement six fonctions :
`AND (a & b)`, `OR (a | b)`, `XOR (a ^ b)`, `NAND (!(a & b))`, `NOR (!(a | b))`,
`NOT (a ? 0 : 1)`. Les tables de vérité affichées dans l'expérience 1 sont calculées
avec les mêmes opérateurs.

### A2. Le transistor est un interrupteur idéalisé
> « OUT = IN si GATE = 1 ; OUT = 0 si GATE = 0 »

**Verdict : ✅ confirmé** (modèle du nœud `transistor`, décrit dans
`docs/how-the-hardware-works.md` §2). Le dossier signale explicitement, dans un encadré,
que ce modèle ignore seuils, courants de fuite et temps de commutation d'un MOSFET réel.

### A3. ⚠️ Le nombre de portes de l'additionneur complet
> Documentation du simulateur : « *3 XOR + 2 AND + 1 OR = 6 gates* ».

**Verdict : ⚠️ documentation inexacte — corrigé dans le dossier.**
Le circuit réellement construit par `make1BitAdderCircuit()` dans
`src/data/prebuiltModules.ts` contient les nœuds `xor1`, `xor2`, `and1`, `and2`, `or1`,
soit **2 OU-X + 2 ET + 1 OU = 5 portes**. C'est aussi le décompte classique de
l'additionneur complet en théorie des circuits.

**Conséquence :** l'additionneur 8 bits, qui chaîne 8 copies de ce module, compte
**40 portes** et non 48 comme l'annonce la documentation.
Le dossier retient 5 et 40, et signale l'écart dans un encadré « anti-intox ».

### A4. Les formules de l'additionneur complet
> `S = A ⊕ B ⊕ Cin` et `Cout = (A·B) + ((A⊕B)·Cin)`

**Verdict : ✅ confirmé.** Formules commentées en tête de `make1BitAdderCircuit()`, et
implémentation identique dans `src/logic/adder.ts` (`add8`), qui enchaîne pour chaque
bit deux demi-additionneurs et réunit les deux retenues par un OU.

### A5. Le verrou D — 1 NOT + 4 NAND
> « Montage identique au module “Mémoire 1-bit” du simulateur. »

**Verdict : ✅ confirmé.** `make1BitMemoryCircuit()` : `not1`, `nand1`, `nand2`,
`nand3`, `nand4`, avec rebouclage croisé `nand4.out → nand3.b` et `nand3.out → nand4.b`.
Soit **5 portes**, et 40 pour la version 8 bits — chiffres cohérents avec la
documentation sur ce point.

### A6. L'ALU — huit opérations, code sur 3 bits
> Table `000 ADD · 001 SUB · 010 AND · 011 OR · 100 XOR · 101 NOT · 110 SHL · 111 SHR`

**Verdict : ✅ confirmé.** Nœud `alu8` dans `src/logic/simulation.ts` : `switch (op)`
sur les huit valeurs, avec troncature `& 0xff`, retenue à 1 si `sum > 255` (ADD) ou
`diff < 0` (SUB), et retenue égale au bit éjecté pour SHL (`a & 0x80`) et SHR (`a & 0x01`).
L'entrée B est bien ignorée par NOT.

### A7. Les trois drapeaux
> « Z si le résultat sur 8 bits est 0 ; C si le calcul complet sort de 0–255 ;
> N si le bit 7 du résultat vaut 1. »

**Verdict : ✅ confirmé.** `updateFlags()` dans `src/cpu/cpu.ts` :
`z = (result & 0xff) === 0`, `n = ((result & 0xff) & 0x80) !== 0`, et
`c = fullResult > 255 || fullResult < 0` lorsqu'un résultat non tronqué est fourni.
L'expérience 5 du dossier reproduit ce calcul à l'identique.

### A8. STA ne modifie pas les drapeaux, POP les modifie
**Verdict : ✅ confirmé.** Dans `cpu.ts`, `case Opcode.STA` appelle uniquement
`this.write(...)` ; `case Opcode.POP` appelle `this.updateFlags(this.state.a)`.
Le piège décrit dans le dossier (un `POP` glissé entre `CMP` et `JZ`) est réel, et il
est également documenté dans `docs/how-the-computer-works.md` §4.

### A9. Mémoire : 8 192 octets, adressage 13 bits
**Verdict : ✅ confirmé.** `src/cpu/isa.ts` : `MEMORY_SIZE = 8192`,
`ADDR_MASK = 0x1fff`. `createInitialState()` initialise `sp = MEMORY_SIZE - 1`,
soit `0x1FFF`.

### A10. Zone de code plafonnée à 4 096 octets
**Verdict : ✅ confirmé.** `isa.ts` : `CODE_SIZE = 4096` (`0x0000..0x0FFF`), utilisé
comme `maxAddress` par défaut de `assemble()`.

### A11. La carte mémoire (globales, brouillon, arguments, cadres, pile)
> `0x1000–0x100F` globales · `0x1010–0x1017` brouillon · `0x1018–0x101F` arguments de
> l'amorceur · `0x1020–0x17FF` cadres · `0x1800–0x1FFF` pile

**Verdict : ✅ confirmé.** En-tête et constantes de `src/cpu/compiler/codegen.ts` :
`globalAddr` part de `0x1000` et est refusé au-delà de `0x100f` (donc **16 globales
maximum**) ; `TEMP_BASE = 0x1010` ; `TEMP_RETVAL = 0x1017` ; `LOCAL_BASE = 0x1020` ;
`STACK_BASE = 0x1800` ; `stackSize: 2048`.

### A12. La pile croît vers le bas ; CALL empile 2 octets
**Verdict : ✅ confirmé.** `push()` écrit à `sp` puis décrémente ; `push16()` empile
l'octet de poids faible puis celui de poids fort ; `CALL` appelle `push16(nextPC)`.
Le coût minimal d'un appel est donc bien de 2 octets de pile, plus les arguments,
plus le cadre sauvegardé pour une fonction récursive.

### A13. Le jeu d'instructions compte 62 instructions
**Verdict : ✅ confirmé par comptage automatique.** `Object.keys(Opcode).length === 62`
et `INSTRUCTION_INFO` contient 62 entrées : **38 sur 1 octet** et **24 sur 3 octets**.
(Le dossier annonce 62 dans le hero, le chapitre XI et son encadré.)

### A14. Encodage à longueur variable, opérande 16 bits petit-boutiste
> « opcode 0x00–0x7F → 1 octet ; opcode 0x80–0xFF → 3 octets »

**Verdict : ✅ confirmé.** En-tête de `isa.ts` et `isTwoByteOpcode(op) { return op >= 0x80; }`.
Dans `step()`, l'opérande est reconstitué par `(hi << 8) | lo` avec `lo` lu en `pc+1` :
l'octet de poids faible est bien stocké en premier.

### A15. Les sorties des sept programmes assembleur du chapitre XII
**Verdict : ✅ confirmé par exécution sur le processeur d'origine.** Chaque programme
a été assemblé par `assemble()` puis exécuté par la classe `CPU` du simulateur ;
la taille assemblée, le nombre d'instructions exécutées et la sortie console
correspondent exactement à ce qu'affiche la page :

| Programme | Taille | Instructions | Sortie |
|---|---|---|---|
| Bonjour | 22 o | 8 | `BONJOUR` |
| Compter jusqu'à 9 | 18 o | 62 | `0123456789` |
| Fibonacci | 48 o | 168 | `0 1 1 2 3 5 8 13 21 34 55 89 144 ` |
| Table de 7 | 31 o | 103 | `7 14 21 28 35 42 49 56 63 70 ` |
| Factorielle | 37 o | 47 | `120` |
| Sous-programme | 24 o | 16 | `3 17 255 ` |
| Débordement | 16 o | 28 | `250 251 252 253 254 255 ⏎0` |

### A16. Les trois traductions C → assembleur du chapitre XIII
**Verdict : ✅ confirmé par exécution du compilateur d'origine.** Le texte assembleur
affiché est la sortie littérale de `compile()` (`src/cpu/compiler/index.ts`) pour les
trois sources montrées ; les tailles annoncées (24, 35 et 88 octets) sont celles
renvoyées par `assemble()` sur ce texte. Rien n'a été reconstitué à la main.

### A17. Le compilateur réduit la taille du code d'environ 31 %
**Verdict : ✅ confirmé (affirmation du projet, chiffres reproductibles).**
`docs/how-the-computer-works.md` §6 : la taille assemblée cumulée des **36 exemples C**
embarqués passe de `45 299` à `31 220` octets, soit `−14 079` octets = **31,1 %**.
La comparaison est automatisée par `npm run compare:c-sizes`.

### A18. Division et modulo par zéro rendent 0
**Verdict : ✅ confirmé.** `case Opcode.DIVB` et `case Opcode.MODB` dans `cpu.ts` :
`if (this.state.b === 0) { this.state.a = 0; … }`. Aucune exception n'est levée.

### A19. ⚠️ La taille du disque externe
> Documentation : « 8 KB external drive », « 32 drive pages » (how-the-computer-works)
> contre « 64 KB paged external storage » (how-the-hardware-works).

**Verdict : ⚠️ documentation contradictoire — corrigé dans le dossier.**
`src/cpu/isa.ts` : `DRIVE_SIZE = 65536`, `DRIVE_PAGE_SIZE = 256`,
`DRIVE_PAGE_COUNT = 256`. Le dossier retient **64 Ko en 256 pages de 256 octets**, et
signale l'écart dans un encadré « anti-intox ». La mention « 8 Ko / 32 pages » est un
vestige d'une version antérieure du projet.

### A20. Le format de disque partagé
> « octet 0 = marqueur magique ; octet 1 = version ; répertoire à 0x10 ; 64 entrées ;
> données à partir de la page 4 ; type 1 = fichier, type 2 = programme »

**Verdict : ✅ confirmé.** `src/cpu/bootloader.ts` : `BOOT_DISK_MAGIC = 0x42`,
`BOOT_DISK_VERSION = 0x03`, `BOOT_DISK_DIR_OFFSET = 0x10`,
`BOOT_DISK_MAX_ENTRIES = 64`, `BOOT_DISK_ENTRY_SIZE = 12`,
`BOOT_DISK_DATA_START_PAGE = ceil((0x10 + 64×12) / 256) = 4`,
`BOOT_ENTRY_TYPE_FILE = 1`, `BOOT_ENTRY_TYPE_PROGRAM = 2`.

### A21. Le bloc d'arguments en 0x1018–0x101F
**Verdict : ✅ confirmé.** `docs/how-the-computer-works.md` §3 et `src/cpu/bootArgs.ts` :
huit octets, du nombre d'arguments (`0x1018`) à l'indice de l'entrée de répertoire
(`0x101F`), écrits par l'amorceur avant de sauter dans le programme.

### A22. Le contenu du disque « Linux-like » livré
**Verdict : ✅ confirmé par lecture du module.** `src/cpu/linuxUserland.ts` exporte :
- **7 fichiers** — `motd`, `readme`, `story`, `DIGITS`, `LETTERS`, `result`, `url` ;
- **20 programmes** — `hello`, `sysinfo`, `uname`, `pwd`, `bootcat`, `argdump`, `wc`,
  `head`, `wget`, `ascii`, `upper`, `echoio`, `plot`, `nano`, `glxnano`, `glxsh`,
  `cp`, `mv`, `grep`, `jsonp`.

*Correction appliquée :* une première version du dossier n'énumérait que quinze
programmes ; la liste affichée dans la page est désormais complète et le texte
annonce « vingt programmes ».

### A23. Le réseau n'est pas une pile TCP/IP en portes logiques
> « Ce n'est pas une pile TCP/IP construite en portes logiques. C'est un pont vers le
> `fetch()` du navigateur hôte. »

**Verdict : ✅ confirmé, et déjà assumé par le projet.**
`docs/how-the-hardware-works.md` §1 : « The HTTP network interface is still a
**software-host bridge**, not a gate-level implementation of TCP/IP. » Les instructions
`HTTPGET` / `HTTPPOST` / `HTTPIN` passent par `src/network.ts` et l'API `fetch()`.
Le dossier reprend cette réserve explicitement, dans un encadré.

### A24. Les tableaux ne sont pas bornés ; les paramètres tableau sont copiés
**Verdict : ✅ confirmé.** `docs/how-the-computer-works.md` §6 (« the compiler does
**not** inject bounds checks for `arr[i]` ») et README du projet (« array parameters
use copy-in / copy-back semantics, not normal C pointer aliasing »).

### A25. Aucune protection contre le débordement de pile
**Verdict : ✅ confirmé.** `docs/how-the-computer-works.md` §6 : « there is no friendly
runtime stack-overflow trap yet, so very deep recursion with large local frames can
corrupt the stack and output before halting ». Le dossier le présente comme une
propriété pédagogique, pas comme un défaut caché.

---

## B. Histoire et théorie de l'informatique

### B1. Il n'existe que 16 fonctions booléennes à deux entrées
**Verdict : ✅ confirmé.** Une fonction à deux entrées binaires est entièrement décrite
par les quatre valeurs de sa colonne de sortie, soit `2⁴ = 16` fonctions distinctes.
Résultat élémentaire d'algèbre de Boole.

### B2. Les lois de De Morgan
**Verdict : ✅ confirmé.** `¬(A ∧ B) = ¬A ∨ ¬B` et `¬(A ∨ B) = ¬A ∧ ¬B`, énoncées sous
forme algébrique par Augustus De Morgan au XIX<sup>e</sup> siècle.

### B3. Le NON-ET est fonctionnellement complet — Sheffer 1913
> « Le résultat est publié par Henry M. Sheffer en 1913 […] Charles Sanders Peirce
> l'avait pourtant établi dès 1880, dans un manuscrit resté inédit jusqu'en 1933. »

**Verdict : ✅ confirmé, avec la nuance de priorité ajoutée après vérification.**
Sheffer, *A set of five independent postulates for Boolean algebras, with application
to logical constants*, **Trans. Amer. Math. Soc. 14 (1913), n° 4, p. 481–488**,
DOI `10.1090/S0002-9947-1913-1500960-1` (vérifié via Crossref). Peirce avait décrit la
même opération (qu'il nommait *ampheck*) vers 1880 dans un manuscrit publié seulement
en 1933 dans ses *Collected Papers*.

*Correction appliquée :* la première rédaction attribuait le résultat à Sheffer sans
mentionner l'antériorité de Peirce.

### B4. Le NON-ET coûte 4 transistors en CMOS, le ET en coûte 6
**Verdict : ✅ confirmé.** Une porte NON-ET CMOS à deux entrées se réalise avec deux
transistors NMOS en série et deux PMOS en parallèle, soit 4 transistors ; un ET
s'obtient en ajoutant un inverseur (2 transistors), soit 6. C'est la raison structurelle
pour laquelle les portes inversées sont les briques natives du silicium.

### B5. Ripple carry en O(n), anticipation de retenue en O(log n)
**Verdict : ✅ confirmé.** Le temps de propagation d'un additionneur à propagation de
retenue croît linéairement avec le nombre de bits ; les additionneurs à anticipation de
retenue (*carry-lookahead*) calculent les retenues en parallèle à partir des signaux de
génération et de propagation, ramenant le délai à une croissance logarithmique, au prix
d'un nombre de portes bien supérieur.

### B6. Soustraire en complément à deux : A − B = A + ¬B + 1
**Verdict : ✅ confirmé.** Propriété fondamentale de la représentation en complément à
deux ; c'est ce qui permet d'utiliser un additionneur comme soustracteur en injectant 1
dans la retenue d'entrée.

### B7. L'architecture de von Neumann, 1945
**Verdict : ✅ confirmé.** John von Neumann, *First Draft of a Report on the EDVAC*,
Moore School of Electrical Engineering, juin 1945 ; réédité dans *IEEE Annals of the
History of Computing* **15** (1993), n° 4, p. 27–75, DOI `10.1109/85.238389`
(vérifié via Crossref). Le principe du **programme enregistré** — instructions et
données dans la même mémoire — y est formulé.

### B8. L'architecture Harvard sépare code et données
**Verdict : ✅ confirmé.** Distinction classique en architecture des ordinateurs ; les
processeurs de bureau actuels sont de type von Neumann au niveau de la mémoire
principale, et de type Harvard au niveau des caches de premier niveau, séparés en
cache d'instructions et cache de données.

### B9. SRAM ≈ 6 transistors par bit, DRAM 1 transistor + 1 condensateur
**Verdict : ✅ confirmé.** La cellule SRAM standard est à six transistors (deux
inverseurs croisés + deux transistors d'accès) et conserve son état tant qu'elle est
alimentée ; la cellule DRAM est un transistor et un condensateur, plus dense mais
nécessitant un rafraîchissement périodique.

*Nuance conservée dans le dossier :* le verrou décrit dans le chapitre VII est un
verrou à portes NON-ET (5 portes), qui est la construction pédagogique du simulateur —
pas la cellule 6T d'une SRAM industrielle. Le dossier ne confond pas les deux.

### B10. Le 6502 : 56 instructions, septembre 1975, sans multiplication ni division
**Verdict : ✅ confirmé.** Le MOS Technology 6502 est présenté en septembre 1975 et
son jeu d'instructions compte 56 instructions ; il ne comporte ni multiplication ni
division matérielles, qui devaient être écrites en logiciel.

### B11. Le 6510 du Commodore 64 tourne à environ 1 MHz
**Verdict : ✅ confirmé.** Le MOS 6510 du Commodore 64 est cadencé à **0,985 MHz** en
PAL et **1,023 MHz** en NTSC — d'où l'approximation « ≈ 1 MHz » retenue dans le dossier.

### B12. Le Z80 du ZX Spectrum tourne à 3,5 MHz
**Verdict : ✅ confirmé.** Le Zilog Z80A du ZX Spectrum est cadencé à 3,5 MHz.

### B13. Petit-boutisme : Danny Cohen, 1980, d'après *Les Voyages de Gulliver*
**Verdict : ✅ confirmé.** Les termes *big-endian* et *little-endian* sont introduits par
Danny Cohen dans *On Holy Wars and a Plea for Peace*, note IEN 137 (1<sup>er</sup> avril
1980), republiée dans *Computer* **14** (1981), n° 10, p. 48–54,
DOI `10.1109/C-M.1981.220208` (vérifié via Crossref). La métaphore vient de la guerre
entre Lilliput et Blefuscu, chez Jonathan Swift, sur le bout par lequel casser un œuf.

*Correction appliquée :* la première rédaction ne créditait pas Cohen.

### B14. Ariane 5, vol 501, 4 juin 1996
> « trente-sept secondes après le début de la séquence d'allumage du moteur principal,
> la conversion d'une valeur de vitesse horizontale d'un flottant 64 bits vers un entier
> signé 16 bits a débordé »

**Verdict : ⚠️ formulation initiale imprécise — corrigée.**
Le rapport de la commission d'enquête (présidée par Jacques-Louis Lions, 19 juillet
1996) établit que la perte totale des informations de guidage et d'attitude survient
**37 secondes après le début de la séquence d'allumage du moteur principal**, soit
**30 secondes après le décollage** ; le lanceur dévie puis se disloque et explose une
quarantaine de secondes après le début de la séquence de vol. La cause immédiate est
une exception logicielle du système de référence inertielle, provoquée par la
conversion d'un flottant 64 bits (une grandeur liée à la vitesse horizontale) vers un
entier signé 16 bits — conversion qui, contrairement à d'autres du même module,
n'était pas protégée.

*Correction appliquée :* la première rédaction disait « détruite 37 secondes après le
décollage » (confusion entre décollage et début de la séquence d'allumage) et citait un
montant de « 370 millions de dollars » non sourcé. La page mentionne désormais la
chronologie exacte et la perte des quatre satellites Cluster, sans chiffrage financier.

### B15. Les processeurs actuels dépassent 4 GHz
**Verdict : ✅ confirmé.** Ordre de grandeur non contesté pour les processeurs de bureau
contemporains ; le dossier l'emploie comme comparaison qualitative (« un milliard de
fois plus vite que le simulateur », qui tourne entre 0,5 et 10 Hz), pas comme une donnée
précise.

---

## Synthèse

| Verdict | Nombre |
|---|---|
| ✅ confirmé | 36 |
| ⚠️ à corriger / à nuancer | 3 |
| 🔶 débattu | 0 |
| ❌ erroné | 0 |

**Les trois points ⚠️ et leur traitement :**

1. **A3 — additionneur complet à 6 portes** (documentation du simulateur) → le code en
   contient 5, et 40 pour la version 8 bits. Le dossier retient les chiffres du code et
   affiche un encadré « anti-intox » qui explique l'écart.
2. **A19 — disque externe de 8 Ko / 32 pages** (documentation du simulateur) → le code
   déclare 65 536 octets en 256 pages. Le dossier retient 64 Ko / 256 pages et signale
   la contradiction interne de la documentation.
3. **B14 — chronologie d'Ariane 5** (rédaction initiale du dossier) → reformulée
   d'après le rapport de la commission d'enquête ; le montant financier non sourcé a
   été retiré.

**Deux nuances ajoutées après vérification externe :**

- **B3** — antériorité de Peirce (1880, publié en 1933) sur Sheffer (1913).
- **B13** — attribution des termes *big-endian* / *little-endian* à Danny Cohen (1980).

**Deux précisions ajoutées après relecture du code :**

- **A22** — la liste des programmes du disque livré est passée de 15 à 20 entrées, et
  les fichiers de données sont désormais distingués des programmes exécutables.
- **A13** — le jeu d'instructions compte 62 instructions (38 sur un octet, 24 sur
  trois), chiffre obtenu par comptage automatique et non par lecture de la
  documentation.

**Réserves méthodologiques assumées dans la page elle-même :**

- La machine étudiée est un **objet pédagogique**, pas la reconstitution d'un
  ordinateur de 1983 ayant existé : son jeu d'instructions est original, et certaines
  de ses commodités (multiplication et division câblées, pont HTTP) n'existaient pas
  sur les micro-ordinateurs familiaux de l'époque. Le dossier le dit explicitement dans
  un encadré du chapitre XV.
- Le shell du simulateur est un système d'exploitation au sens minimal — chargeur de
  programmes et système de fichiers — sans multitâche, processus, protection mémoire ni
  appels système. Le dossier le précise dans un encadré du chapitre XIV.
