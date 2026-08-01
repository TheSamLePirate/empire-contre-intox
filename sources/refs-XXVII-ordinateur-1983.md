# Dossier XXVII — L'Ordinateur de 1983 · références

Références du dossier `samlepirate/ordinateur-1983/index.html`.

**Nature du dossier :** informatique fondamentale. La traçabilité repose sur deux
piliers de nature différente :

1. **Le code source du simulateur** — source primaire pour tout ce qui concerne la
   machine décrite. Il est public, versionné, exécutable et testé ; chaque affirmation
   du dossier renvoie à un fichier et à un symbole précis (voir
   `dossier-XXVII-ordinateur-1983.md`, section A).
2. **La littérature et les sources institutionnelles** — pour les affirmations
   d'histoire et de théorie de l'informatique (section B). Trois DOI ont été
   **vérifiés via l'API Crossref** ; les autres références sont institutionnelles ou
   documentaires, sans DOI.

> ### ⚠️ Note anti-hallucination
> Aucun DOI n'a été deviné ni reconstitué. Les trois DOI cités ci-dessous ont été
> résolus par `https://api.crossref.org/works/<doi>`, et le titre, les auteurs, la
> revue, le volume, le numéro et la pagination retournés par Crossref ont été comparés
> à ce qui est écrit ici. Les sources sans DOI vérifiable sont signalées comme telles
> et citées par leur URL institutionnelle.

---

## 1. Source primaire — le simulateur

| Ressource | URL |
|---|---|
| Dépôt du code source | https://github.com/TheSamLePirate/Simulateur-Logique-Nodal |
| **Build embarqué dans le site** | [`../samlepirate/ordinateur-1983/simulateur/`](../samlepirate/ordinateur-1983/simulateur/) |
| Application hébergée par l'auteur | https://computer-1983.puter.site |
| Miroir | https://1983-computer.puter.site |
| Page d'application Puter | https://puter.com/app/1983-computer |

**Fichiers cités dans l'audit :**

| Fichier | Ce qu'il établit |
|---|---|
| `src/logic/gates.ts` | Les six fonctions logiques (ET, OU, OU-X, NON-ET, NON-OU, NON) |
| `src/logic/adder.ts` | `add8()` — additionneur 8 bits à propagation de retenue |
| `src/logic/simulation.ts` | Le nœud `alu8` : huit opérations, retenue, drapeaux |
| `src/data/prebuiltModules.ts` | Circuits de l'additionneur 1 bit (5 portes) et du verrou D (5 portes) |
| `src/cpu/isa.ts` | 62 instructions, `MEMORY_SIZE = 8192`, `CODE_SIZE = 4096`, `ADDR_MASK = 0x1fff`, `DRIVE_SIZE = 65536`, `DRIVE_PAGE_SIZE = 256` |
| `src/cpu/cpu.ts` | `step()`, `updateFlags()`, `push()` / `push16()`, sémantique de chaque opcode |
| `src/cpu/assembler.ts` | Assembleur deux passes, syntaxe des opérandes et des étiquettes |
| `src/cpu/compiler/` | Préprocesseur, analyseur lexical, analyseur syntaxique, générateur de code |
| `src/cpu/bootloader.ts` | Format de disque partagé : magie `0x42`, version `0x03`, répertoire à `0x10`, 64 entrées de 12 octets, données à partir de la page 4 |
| `src/cpu/linuxUserland.ts` | 7 fichiers et 20 programmes du disque livré |
| `src/cpu/bootArgs.ts` | Bloc d'arguments en `0x1018`–`0x101F` |
| `src/network.ts` | Pont HTTP vers l'API `fetch()` du navigateur hôte |
| `docs/how-the-hardware-works.md` | Documentation du niveau matériel (portes → processeur) |
| `docs/how-the-computer-works.md` | Documentation du niveau logiciel (jeu d'instructions → système) |
| `docs/c-language-guide.md` | Le dialecte C accepté et ses limites |

**Vérifications exécutées** (et non simplement lues) :

- les sept programmes assembleur du chapitre XII ont été assemblés par `assemble()`
  puis exécutés par la classe `CPU` du simulateur ; tailles, nombres d'instructions et
  sorties console figurent dans le tableau A15 de l'audit ;
- les trois exemples C du chapitre XIII ont été passés dans `compile()` puis
  `assemble()` : le texte assembleur affiché dans la page est la sortie littérale du
  compilateur ;
- le nombre d'instructions (62) a été obtenu par `Object.keys(Opcode).length`, pas par
  lecture de la documentation.

---

## 2. Références à comité de lecture — DOI vérifiés

### 2.1 L'universalité du NON-ET

> **Sheffer, Henry Maurice.** « A set of five independent postulates for Boolean
> algebras, with application to logical constants. » *Transactions of the American
> Mathematical Society*, vol. **14**, n° 4, 1913, p. **481–488**.
> **DOI : [10.1090/S0002-9947-1913-1500960-1](https://doi.org/10.1090/S0002-9947-1913-1500960-1)**
> *(vérifié via Crossref : titre, auteur, revue, volume, numéro et pagination concordent)*

**Ce que l'article établit :** qu'un unique opérateur binaire — la « barre » aujourd'hui
appelée *barre de Sheffer*, équivalente au NON-ET — suffit à exprimer toutes les
opérations de l'algèbre de Boole. C'est le fondement théorique de l'universalité du
NON-ET utilisée au chapitre III du dossier.

**Antériorité :** Charles Sanders Peirce avait décrit la même opération (sous le nom
d'*ampheck*) vers 1880, dans un manuscrit resté inédit jusqu'à sa publication en 1933
dans ses *Collected Papers*. Le dossier mentionne cette antériorité.

### 2.2 L'architecture à programme enregistré

> **von Neumann, John.** « First draft of a report on the EDVAC. » *IEEE Annals of the
> History of Computing*, vol. **15**, n° 4, 1993, p. **27–75**.
> **DOI : [10.1109/85.238389](https://doi.org/10.1109/85.238389)**
> *(vérifié via Crossref)*

**Ce que le texte établit :** la description, en juin 1945, d'une machine où les
instructions et les données résident dans la même mémoire adressable — le principe du
**programme enregistré**, base du chapitre IX. La référence citée est la réédition
annotée de 1993 dans les *IEEE Annals*, qui porte un DOI ; le rapport original de 1945
(Moore School of Electrical Engineering, University of Pennsylvania) n'en a pas.

### 2.3 Petit-boutisme et gros-boutisme

> **Cohen, Danny.** « On Holy Wars and a Plea for Peace. » *Computer*, vol. **14**,
> n° 10, octobre 1981, p. **48–54**.
> **DOI : [10.1109/C-M.1981.220208](https://doi.org/10.1109/C-M.1981.220208)**
> *(vérifié via Crossref)*

**Ce que l'article établit :** l'introduction des termes *big-endian* et *little-endian*
pour désigner les deux conventions d'ordre des octets, par analogie avec la querelle
des Gros-Boutiens et des Petits-Boutiens dans *Les Voyages de Gulliver* de Jonathan
Swift. Le texte avait d'abord circulé comme note IEN 137, datée du 1<sup>er</sup> avril
1980. Cité au chapitre XI.

---

## 3. Sources institutionnelles et documentaires — sans DOI

### 3.1 Ariane 5, vol 501

| Source | URL |
|---|---|
| ESA — communiqué de présentation du rapport de la commission d'enquête (PR 33-1996) | https://sci.esa.int/web/cluster/-/36901-pr-33-1996-ariane-501-presentation-of-inquiry-board-report |
| Rapport complet de la commission d'enquête (Lions, 19 juillet 1996), copie hébergée par le MIT | http://sunnyday.mit.edu/nasa-class/Ariane5-report.html |

**Ce que ces sources établissent :** la chronologie exacte (perte du guidage
37 s après le début de la séquence d'allumage du moteur principal, soit 30 s après le
décollage ; destruction du lanceur une quarantaine de secondes après le début de la
séquence de vol) et la cause immédiate — une exception non traitée lors de la
conversion d'un flottant 64 bits en entier signé 16 bits dans le système de référence
inertielle. Le vol emportait les quatre satellites scientifiques **Cluster**.
Cité au chapitre XV. **Pas de DOI** : rapport institutionnel.

### 3.2 Le MOS Technology 6502 et le 6510 du Commodore 64

| Source | URL |
|---|---|
| C64-Wiki — MOS Technology 6502 (jeu d'instructions, 56 instructions) | https://www.c64-wiki.com/wiki/MOS_Technology_6502 |
| Liste des instructions 6502 / 6510 | https://c64os.com/post/6502instructions |
| MOS Technology 6510 — fréquences PAL/NTSC | https://en.wikipedia.org/wiki/MOS_Technology_6510 |

**Ce que ces sources établissent :** le 6502 est présenté en septembre 1975 ; son jeu
d'instructions officiel compte 56 instructions ; il ne dispose ni de multiplication ni
de division matérielles. Le 6510 du Commodore 64 est cadencé à 0,985 MHz (PAL) et
1,023 MHz (NTSC). Cité aux chapitres VI, VIII et XI. **Pas de DOI** : documentation
technique communautaire, recoupée entre plusieurs sources.

### 3.3 Le Z80 du ZX Spectrum

| Source | URL |
|---|---|
| Sinclair Wiki — Z80 | https://sinclair.wiki.zxnet.co.uk/wiki/Z80 |

**Ce que cette source établit :** le Zilog Z80A du ZX Spectrum est cadencé à 3,5 MHz.
Cité au chapitre VIII. **Pas de DOI.**

### 3.4 Note IEN 137 (version pré-publication de Cohen 1981)

| Source | URL |
|---|---|
| IETF — Internet Experiment Note 137 | https://www.ietf.org/rfc/ien/ien137.txt |

Version initiale, datée du 1<sup>er</sup> avril 1980, du texte publié en 1981 dans
*Computer* (voir §2.3). **Pas de DOI.**

---

## 4. Ce qui relève du savoir établi, sans référence spécifique

Certaines affirmations du dossier sont des résultats élémentaires d'algèbre de Boole ou
d'architecture des ordinateurs, enseignés dans tout cours d'introduction et non
attribuables à une publication particulière. Elles ne sont pas sourcées individuellement :

- il existe exactement `2⁴ = 16` fonctions booléennes à deux entrées ;
- les lois de De Morgan ;
- `A − B = A + ¬B + 1` en complément à deux ;
- le temps de propagation d'un additionneur à retenue propagée croît linéairement avec
  le nombre de bits, celui d'un additionneur à anticipation de retenue logarithmiquement ;
- une porte NON-ET CMOS à deux entrées se réalise avec 4 transistors, un ET avec 6 ;
- la cellule SRAM standard compte 6 transistors, la cellule DRAM un transistor et un
  condensateur nécessitant un rafraîchissement ;
- distinction entre architectures von Neumann et Harvard.

Le dossier les présente comme telles, sans les attribuer à une source précise, et sans
en tirer d'affirmation chiffrée qui dépasserait ce consensus.
