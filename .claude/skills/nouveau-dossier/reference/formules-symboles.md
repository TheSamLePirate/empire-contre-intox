# Formules survolables — le composant commun (OBLIGATOIRE)

Chaque formule d'un dossier se **lit symbole par symbole** : au survol (souris), au toucher
(mobile : un appui épingle la fiche, un appui ailleurs la ferme) ou au clavier (Tab dans la rangée
des symboles), chaque lettre affiche **sa définition, son unité et un ordre de grandeur**. Le même
composant sert pour les blocs et pour les formules du texte, sur tous les dossiers : même balisage,
mêmes fichiers, même rendu.

Référence vivante : **`provoxys/son/index.html`** (Dossier « Le Son ») — 136 blocs, 1 812 formules
du texte, toutes les lettres définies. Le composant y a été conçu, puis sorti dans la skill.

## 1. Ce que voit le lecteur

Un bloc `.formula-block` complet contient, dans cet ordre :

| Partie | Classe | Contenu | Obligatoire |
|---|---|---|---|
| En-tête | `.fb-head` | titre + étiquette `.fb-tag` | oui (déjà en §7) |
| Formule | `.formula[data-tex]` | TeX annoté : chaque symbole est survolable | oui |
| Se lit | `.fb-say` | lecture orale + glose (design-system §7 d bis) | oui |
| Ce qu'elle dit | `.fb-dit` | 2 à 4 phrases : ce que la relation affirme | **oui** |
| Les symboles | `.fb-syms` | une fiche par symbole : TeX, définition, unité, remarque | **oui** |

Une formule du texte `.imath` n'a ni « Se lit » ni légende : **chaque lettre y est survolable**,
et sa fiche vient du **contexte** (le bloc, la section, le dossier — voir §4).

Au survol d'un symbole de bloc, **toutes ses occurrences s'allument** dans la formule, et sa fiche
dans la rangée aussi. La fiche flottante se pose au-dessus (ou au-dessous) du cadre de la formule,
jamais dessus, et reste dans la fenêtre, sous la barre sticky.

## 2. Les fichiers

| Fichier | Rôle |
|---|---|
| `assets/eci-formules.css` | styles du composant (surbrillance, « Ce qu'elle dit », rangée, fiche flottante) |
| `assets/eci-formules.js` | fiches (survol, toucher, clavier, Échap) **et** re-rendu KaTeX avec `trust` |
| `.claude/skills/nouveau-dossier/scripts/formules-symboles.py` | l'outil : annote une page HTML en place |
| `…/scripts/formules/fsym.py` | moteur : place `\htmlData{sym=k}{…}` sur chaque occurrence d'un symbole |
| `…/scripts/formules/inline_syms.py` | formules du texte : résolution par contexte, table `#symtab` |
| `…/scripts/formules/blocs.py` | balisage commun (« Ce qu'elle dit », rangée) — aussi pour les générateurs |
| `<equipe>/<dossier>/symboles.md` | **les données** : symboles, explications, dictionnaire du texte (versionné, non publié) |

Les deux assets sont **partagés** : ne jamais les recopier dans une page ni dans un bundle. Un
dossier règle seulement son accent de surbrillance, par un triplet RVB :

```css
:root { --fx-rgb: 95, 227, 200; }   /* Le Son : phosphore. Par défaut : or clair 243,217,138 */
```

Prendre l'accent secondaire de la page (celui du hero). En Voie B, idem avec l'accent de l'hôte ;
le composant reprend `--gold`, `--parch`, `--soft`, `--line`, `--mono`, `--roman`, `--serif` s'ils
existent, et a des valeurs de repli sinon.

## 3. Mode d'emploi (page écrite à la main)

Tout se lance **depuis la racine du dépôt**, une fois la page écrite, avec ses `.formula-block`
(avec `.fb-say`) et ses `.imath`. **Toutes les formules doivent être en `data-tex`** (design-system
§7) : l'outil ne voit ni `$…$` ni `\(…\)` laissés dans le texte.

```bash
S=.claude/skills/nouveau-dossier/scripts/formules-symboles.py
python3 $S <equipe>/<dossier>/index.html --init    # 1. squelette symboles.md (un § par bloc)
#   … remplir symboles.md (§5, agents en parallèle §6) …
python3 $S <equipe>/<dossier>/index.html           # 2. annote la page EN PLACE + rapports
python3 $S <equipe>/<dossier>/index.html --check   # 3. sort en 1 s'il manque quoi que ce soit
python3 $S <equipe>/<dossier>/index.html --retirer # (annule tout : page d'origine à l'octet près)
```

- La passe 2 est **idempotente** : elle repart toujours du TeX d'origine (gardé dans
  `data-tex-src`) et régénère tout. On relance après chaque modification de `symboles.md`, **et
  après chaque modification d'une formule dans la page**.
- Elle ajoute d'elle-même les liens vers `assets/eci-formules.css` et `.js` (chemin relatif calculé).
  Lancer ensuite `python3 scripts/stamp-assets.py` pour leurs empreintes `?v=`.
- Page compagnon (`portraits.html`…) : fichier `symboles-portraits.md`, rapports dans
  `a_traiter/formules/<dossier>-portraits/`.
- Rapports (non publiés) dans `a_traiter/formules/<dossier>/` :
  - `blocs-incomplets.tsv` — bloc, `tex` introuvables, lettres sans définition, explication manquante ;
  - `inline-manquants.tsv` — contexte, symbole, occurrences, exemples : **ce qu'il reste à écrire** ;
  - `inline-relecture.tsv` — chaque formule du texte avec les définitions reçues : **la relecture**.
- La page garde son propre script de rendu KaTeX : `eci-formules.js` redessine derrière lui les
  formules annotées avec l'option `trust` (sans elle, KaTeX refuse `\htmlData` et affiche une
  erreur rouge). Pour éviter ce double rendu, passer directement ces options dans le script de la
  page (design-system §7 b) :

  ```js
  katex.render(tex, node, { throwOnError:false, displayMode:display,
    trust: c => c.command === '\\htmlData', strict: c => c === 'htmlExtension' ? 'ignore' : 'warn' });
  ```

### Page produite par un générateur (cas du Son)

Un dossier construit par script n'utilise pas la CLI : son générateur importe les mêmes modules.
Il appelle `fsym.annotate(tex, syms)` sur chaque formule de bloc, `blocs.dit_html()` et
`blocs.legend_html()` pour le balisage, pose `data-fsym data-syms="…"` sur le bloc, puis appelle
`inline_syms.process(page, fmt, report, dict_files=[…])` sur la page entière. Gabarit :
`a_traiter/provoxys-son/build/build_page.py` (`render_formula`, et l'appel à `inline_syms.process`).
Les liens vers `assets/eci-formules.*` sont posés par le gabarit de page (`page_parts.py`).

## 4. Formules du texte : le sens vient du contexte

Une même lettre change de sens d'un chapitre à l'autre : `c` est la célérité du son sauf en
cosmologie, `T` une période, une température ou une tension. Chaque symbole d'un `.imath` se
résout donc **par couches, de la plus proche à la plus large** :

1. **le bloc** qui contient la formule (glose « Se lit », « Ce qu'elle dit ») : ses symboles ;
2. la **clé** (`aside.cle[id]`) qui la contient : dictionnaire explicite, puis symboles de ses blocs ;
3. la **section** (`section[id]` la plus proche) : dictionnaire explicite, puis symboles des blocs
   de la section, puis ceux de ses clés. Une formule située dans une clé **n'hérite pas** de la
   section : une clé est autonome, ses notations peuvent différer ;
4. le dictionnaire **global** `*`.

L'héritage se trompe parfois : dans `f(x - ct) + g(x + ct)`, `f` est une fonction quelconque,
pas la fréquence définie par le bloc de Doppler du même chapitre. On corrige **une formule
précise** avec le contexte `section@formule` (formule écrite exactement comme dans la colonne
« formule » de `inline-relecture.tsv`) — cette ligne l'emporte sur toutes les couches.

Les fiches de la rangée « Les symboles » ne sont pas annotées (elles *sont* les définitions).

## 5. `symboles.md` — le format

```markdown
# Symboles des formules — <dossier>

## Bloc : Rendement de Carnot
dit: Un moteur thermique ne peut transformer en travail qu'une partie de la chaleur qu'il prélève ; cette part maximale ne dépend que des deux températures, exprimées en kelvins.
symbole: \eta_{\text{Carnot}} | rendement maximal d'un moteur fonctionnant entre deux sources | sans unité | entre 0 et 1
symbole: T_{\text{froid}} | température absolue de la source froide | kelvin (K) | ≈ 300 K pour l'air ambiant
symbole: T_{\text{chaud}} | température absolue de la source chaude | kelvin (K) |

## Bloc : Énergie d'un photon #2
…

## Texte
# contexte | tex | définition | unité | remarque
thermo   | W | travail fourni par le moteur | joule (J) |
*        | k_B | constante de Boltzmann | joule par kelvin (J/K) | 1,380 649 × 10⁻²³ J/K (valeur exacte)
optique@\lambda D/a | D | distance de la fente à l'écran | mètre (m) |
```

- `## Bloc :` + le **titre exact** de `.fb-head`, sans l'étiquette `.fb-tag`. Deux blocs de même
  titre : `#2`, `#3` à la fin, dans l'ordre de la page. `--init` écrit ces titres, le TeX de la
  formule en commentaire, la note existante, et **une ligne `symbole:` vide par lettre à définir**.
  Le squelette liste les **lettres nues** (`T`, `\eta`) : écrire à leur place le symbole complet
  de la formule (`T_{\text{froid}}`, `T_{\text{chaud}}`, `\eta_{\text{Carnot}}`), une ligne chacun.
- `dit:` — tient sur **une ligne** ; Markdown léger (`**gras**`, `*italique*`, `$TeX$`). Sans
  `dit:`, la `.fb-note` existante du bloc devient « Ce qu'elle dit » : la garder seulement si elle
  dit vraiment ce que dit la formule, sinon écrire un `dit:`.
- `symbole:` — `tex | définition | unité | remarque facultative`. Une ligne laissée vide compte
  comme **non définie**.
- `## Texte` — une ligne par symbole et par contexte, `contexte` = id de section, id de clé, `*`,
  ou `section@formule`.
- `\|` pour une barre verticale littérale dans un champ (`\|\psi\|^2`).
- Les lignes `#` et vides sont ignorées. Le fichier est **versionné et non publié** (comme
  `coquilles.md`) : ne pas le déclarer dans le manifeste.

## 6. Écrire les symboles et les explications (règles de qualité)

**Le `tex`** — le symbole **tel qu'il est écrit dans la formule** : `\rho_0`, `T_{60}`, `\hat{p}`,
`L_p`, `\Delta f`, `\mathrm{d}t`. Un symbole composé (lettre + indice, lettre + accent) se définit
en entier ; l'indice seul non. Un symbole qui revient plusieurs fois se définit une fois (toutes
ses occurrences s'allument). L'outil tolère les écritures équivalentes (`\hat p` / `\hat{p}`,
`{\rm eff}` / `\text{eff}` / `\mathrm{eff}`, `\sqrt K` / `\sqrt{K}`).

**Ce qui se définit** — toute lettre latine ou grecque de la formule. Sont neutres (jamais
réclamés) : les nombres, `\pi`, `\partial`, `\nabla`, `\Delta` devant une grandeur, le `d`
différentiel, le préfixe d'unité `µ`, le texte dans `\text{…}`. Les fonctions (`\log_{10}`,
`\sin`, `\exp`) se définissent si c'est utile au lecteur (« logarithme décimal »).

**Définition** — courte, en français, le **sens physique** (« masse volumique de l'air au repos »),
jamais le nom de la lettre (« rhô zéro » est le travail de « Se lit »).

**Unité** — nom et symbole SI : « pascal (Pa) », « mètre par seconde (m/s) », « radian par seconde
(rad/s) », « sans unité ». Une grandeur qui dépend du cas : « selon la grandeur (Pa, m…) ».

**Remarque** (facultative) — un ordre de grandeur utile (« ≈ 343 m/s dans l'air à 20 °C ») ou un
piège (« valeur efficace, pas crête »). **Les valeurs sont celles du dossier** (vérifiées, §4 de la
skill) ou des constantes standard : jamais un chiffre inventé pour remplir la case.

**« Ce qu'elle dit »** — deux à quatre phrases : ce que la relation **affirme physiquement**, dans
quel sens varient les grandeurs, sous quelles hypothèses elle vaut. Ne pas répéter la lecture à
voix haute, ne pas réénumérer les symboles (la rangée le fait).

**Formules du texte** — lire la **phrase** où la formule apparaît avant de choisir un sens. Une
lettre qui n'est pas un symbole physique (variable muette d'un exemple numérique) se définit
quand même selon ce qu'elle désigne dans la phrase. Une lettre qui trahit une erreur d'écriture
TeX (un mot hors `\text{}`, `\mathrm{Hz}` écrit `Hz`) se **corrige dans la page**, pas dans le
dictionnaire.

**Le TeX des formules, « Se lit » et la glose ne changent pas** pour les besoins de l'annotation.

## 7. Le déroulé dans un dossier (à paralléliser)

1. Page écrite, formules en place (`.formula-block` + `.fb-say` + `.imath`) → `--init`.
2. **Agents en parallèle** (outil `Agent`, plusieurs appels dans un même message) : un par lot de
   blocs (≈ 15 blocs chacun), plus un par lot de sections pour `## Texte`. Chacun écrit **son
   propre fichier** (`a_traiter/formules/<dossier>/lot-<n>.md`, même format) pour éviter les
   conflits ; l'agent principal les fusionne ensuite dans `symboles.md`. Leur donner ce guide, la
   page, et la liste de leur lot (les titres de blocs, ou les lignes de `inline-manquants.tsv`).
   Les blocs d'abord : une fois leurs symboles posés, une grande partie des formules du texte est
   couverte par héritage, et `inline-manquants.tsv` ne liste plus que le reste.
3. Passe → `blocs-incomplets.tsv` vide, `inline-manquants.tsv` vide.
4. **Relecture obligatoire de `inline-relecture.tsv`** (un agent par tranche) : l'héritage donne
   parfois un sens faux (`f` fréquence au lieu de fonction, `T` période au lieu de température).
   Chaque sens faux se corrige par une ligne `section@formule`. Sur le Son, cette relecture a
   corrigé environ 85 fiches : elle n'est pas facultative.
5. `--check` → 0, puis `verify-dossier.py` (section `formules+`) → 0 FAIL.
6. Navigateur : survoler un symbole de bloc et un symbole du texte, à 1280 px et à 390 px (la fiche
   reste dans la fenêtre, ne couvre pas la formule, ne passe pas sous la barre sticky) ; appui
   tactile au mobile ; Tab dans une rangée. Aucune `.katex-error`.

## 8. Pièges déjà rencontrés

- **Garder la classe exacte `class="formula-block"`**, marquer par l'attribut `data-fsym`. Une
  classe ajoutée (`class="formula-block fx-sym"`) fait tomber à 0 le compte de `verify-dossier.py`
  et casse les contrôles « Se lit ».
- **`\sqrt` et `\frac` à argument non braqué** (`\sqrt K`, `\frac 12`) : envelopper un symbole les
  aurait cassés. `fsym` les braque avant d'annoter — ne pas désactiver ce passage.
- **`{\rm X}`** est traité comme `\text{X}` : l'écriture ancienne est tolérée, rien à réécrire.
- **Barre verticale** dans un dictionnaire : `\|`, sinon la ligne est coupée en champs.
- **Sans `trust`**, KaTeX affiche `\htmlData` en rouge. `eci-formules.js` redessine ; si la page
  rend ses formules tard (CDN lent), un observateur repasse derrière elle. Le contrôle KaTeX de
  `verify-dossier.py` rend avec `trust`.
- Une formule **modifiée dans la page après annotation** : relancer la passe (elle repart de
  `data-tex-src`). Ne jamais éditer à la main un `data-tex` qui contient `\htmlData`.
- Une fiche de symbole ne remplace pas la vérification : ses valeurs sont des affirmations du
  dossier et relèvent de `sources/` comme le reste.
