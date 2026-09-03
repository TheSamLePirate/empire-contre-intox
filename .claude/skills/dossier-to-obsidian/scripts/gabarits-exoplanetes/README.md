# Gabarits — Dossier XVII « Atmosphères & Mondes Lointains » (26/08/2026)

Le cas du **dossier de fusion** : `provoxys/exoplanetes/index.html` ne vient pas d'un
déroulé unique. C'est la réunion de tous les documents que Provoxys a consacrés aux
exoplanètes — un script en vingt chapitres plus huit documents détaillés — remontés en
un seul fil. Il n'y a donc **pas de verbatim oral** à préserver (ni `p.speaker`, ni
repères de temps), mais tout le contenu source est conservé et les corrections vivent
en encadrés « anti-intox ».

C'est aussi le premier export d'une page **codex ECI (voie A) très riche en blocs** :

```
section.chapter
  div.chapter-head        → p.section-kicker + h2 + div.chapter-number
  figure.model3d          ← ENFANT DIRECT de la section, hors .transcript
  div.milestones          ← idem, et ses textes vivent dans le JS
  div.transcript
    article.prose         → p.lede · h3.group-title · p · ul
       div.explain-block  → .xb-head + .xb-tag + .xb-body      ×8
       div.formula-block  → .fb-head + .formula + .fb-note      ×2
       div.viz[data-viz]  → atelier interactif                  ×6
       div.dtable-wrap    → table.dtable (td.k / td.mono)       ×8
       figure.chapter-figure · figure.model3d
       div.scope-card     → .sc-head + .sc-specs + .sc-body + .sc-line  ×4
       div.science-block · div.atlas-cta
    aside.side-note       → h3 + p + .tag-list   (« Repère » ou « Anti-intox »)

section#annexe            → 5 details.fiche-cat → 54 article.fiche-tech + dl.glossary
```

## Ordre d'exécution

| Script | Ce qu'il écrit |
| --- | --- |
| `1-dossier.py` | les 13 notes de lecture (`00 —` … `12 —`), `_assets/`, les ancres `^formule-N` et `^repere-N`, plus `_collected.json` (à côté des scripts, pas dans le coffre) |
| `2-appareil.py` | le MOC, les **54 fiches** (`Fiches/<Nom>.md`) + leur galerie, le lexique (25 mots), le formulaire, la note de l'atlas compagnon |
| `3-sources.py` | la note Sources, **extraite** de `sources.html` (`const EXOPLANETES` + 2 groupes REFS) et de l'audit |
| `5-passerelles.py` | les 11 passerelles XVII ↔ XIV / V / XII / XXV + « Dossiers liés » au MOC |
| `6-mermaid.py` | les 2 diagrammes (la chaîne de détection, le bestiaire par rayon) |
| `4-tableau-canvas-bases.py` | le tableau de bord (**tout recompté**), les 2 canvas, les 2 bases |

Ordre réel : **1 → 2 → 3 → 5 → 6 → 4**. Comme ailleurs, `1` et `2` réécrivent leurs
fichiers et **effacent** ce que `5` et `6` y ont posé — les rejouer après. `4` se lance
en dernier : il compte les passerelles et les ancres réellement présentes.

## Ce que l'export a corrigé dans la page

- **2 blocs de formule, 0 ligne « Se lit »** — le dossier était antérieur à la règle.
  Les deux lignes ont été écrites (profil barométrique, transfert radiatif) avec le bloc
  CSS `.fb-say` de la charte, copié tel quel puisque la page est en voie A.
- **Un débordement mobile préexistant** dans l'annexe : `.ft-specs dt { white-space:nowrap }`
  élargissait la colonne `auto` du `dl`, et la fiche débordait de sa grille — **clippée**
  par le `details.fiche-cat` (`overflow:hidden`). Sous 560 px, le `dl` s'empile désormais.
  Voir le piège ci-dessous : ce défaut ne produit **aucun** défilement horizontal.

## Les 54 fiches : l'annexe est l'analogue des Portraits

Là où l'Entropie a des savants et Artemis II un équipage, ce dossier a **54 objets** —
11 instruments au sol, 10 missions spatiales, 7 sondes, 11 corps du Système solaire,
15 exoplanètes. Chacun reçoit sa note : image (les 12 vues d'artiste de l'atlas sont
réutilisées), table de caractéristiques depuis le `<dl>`, source, et une section
**« Dans le dossier »** construite en cherchant le nom de l'objet dans les notes de
lecture déjà écrites.

Le nom de fichier est **court** (`JWST`, `Hubble`, `Keck`, `VLT`, `TRAPPIST-1 e`), le nom
complet reste en H1 et en alias — Obsidian résout par nom de fichier, et
`W. M. Keck Observatory (Keck I & Keck II)` ne se tape pas dans un wikilink.

## Les passerelles : quatre dossiers, pas un

`grep -ril` puis lecture ont donné quatre recoupements réels :

- **XVII ↔ XIV** — l'acte XV « Atmosphères & exoplanètes » des *Formules de l'Empire*
  tient **les huit équations** du dossier, chacune avec son atelier à curseurs :
  hydrostatique, gaz parfaits, profil barométrique, transfert radiatif, profondeur de
  transit, effet Doppler, vitesses radiales, température d'équilibre ;
- **XVII ↔ V** — la spectroscopie ne lit quelque chose que parce que les niveaux
  d'énergie sont quantifiés : les **raies spectrales** du Mouvement VI ;
- **XVII ↔ XII** — le même **effet Doppler**, sur une étoile qui tangue de quelques m/s
  et sur l'écho radar d'un mésocyclone ; et la même physique d'atmosphère ;
- **XVII ↔ XXV** — l'effet de serre et l'habitabilité comme **bilan radiatif** : visible
  concentré à l'entrée, infrarouge tiède à la sortie (chapitre 15 de l'Entropie).

Le `PLAN` de `super-dashboard.py` a été mis à jour : la ligne XVII → XIV est passée de
« à poser » à **posée**, et les trois autres paires ont été ajoutées.

## Pièges rencontrés (nouveaux)

- **Un bloc Markdown qui commence par `### ` n'est pas un titre.** Le rendu de la frise
  des jalons commence par `### Frise interactive…` puis enchaîne un tableau de onze
  lignes ; l'extraction des sous-titres du sommaire (`b[4:] for b in blocks if
  b.startswith("### ")`) a donc mis **tout le tableau** dans un wikilink. Le validateur
  ne dit rien — le fragment existe vraiment. Ne retenir que `b.split("\n", 1)[0]`.
- **Une classe de caractères ne gère pas les sélecteurs de variante.**
  `[✅⚠️🔶✳️❌] ` ne matche pas `⚠️ ` : la classe consomme `⚠`, puis attend l'espace et
  tombe sur U+FE0F. Écrire `[✅⚠🔶✳❌]️? `. Trois fiches sur treize manquaient au comptage.
- **`classDef` de Mermaid n'accepte pas `rgba(...)`** — les parenthèses cassent le
  parseur (`Expecting … got 'PS'`). Poser des couleurs hexadécimales.
- **`quadrantChart` ne convient pas à deux grandeurs corrélées.** Masse et rayon sont
  monotones : les 21 mondes tombent tous sur la diagonale, deux quadrants restent vides.
  Il faut deux nombres réellement indépendants — sinon, un `flowchart` de classification
  dit plus.
- **`.capitalize()` détruit les sigles** : « WASP-39 b (JWST) » devient « wasp-39 b (jwst) ».
  Ne majusculer que la première lettre (`s[0].upper() + s[1:]`).
- **Un audit de `sources/` n'a pas toujours la forme d'Artemis.** Celui-ci est en
  **tables Markdown** (`| Affirmation | Verdict | Référence | Source(s) |`), pas en blocs
  `## N.`. Lire le fichier avant d'écrire l'extracteur.
- **`sources.html` a un cinquième verdict** : `fresh` → « Corrigé » (violet), en plus de
  `ok` / `warn` / `deb`. Le mapper (ici `[!note] ✳️`) plutôt que de le laisser retomber
  sur « Confirmé ».
- **Un débordement clippé ne fait pas défiler la page.** Le contrôle habituel
  (`window.scrollTo(9999,0)` puis `scrollX === 0`) était **vert** alors que 54 fiches
  étaient coupées à 360 px : le `details` parent les clippait en `overflow:hidden`.
  Comparer aussi `scrollWidth` et `clientWidth` des conteneurs, et remonter la chaîne
  des ancêtres pour savoir lequel clippe.
- **Ne pas ajouter d'espaces autour de `**…**` ni de `$…$`** (piège déjà connu, confirmé
  ici) : le HTML source porte les siennes, y compris les fines insécables de ` : ` et
  des `« … »`. Le convertisseur d'`inline()` n'ajoute rien du tout, et se contente de
  réduire `[ \t\n\r]+` à une espace simple.

## Vérifications passées

- `check-vault-links.py` sur `Empire contre Intox/` — **213 notes, 15 canvas, 14 bases,
  0 lien cassé, 0 nœud canvas manquant, 0 alias redondant** ;
- 2 `formula-block` → 2 `fb-say` → 2 `^formule-N` → 2 entrées de formulaire ;
  54 `fiche-tech` → 54 notes ; 25 `dt` de glossaire → 25 termes ; 13 fiches de
  vérification et 37 DOI extraits de `sources.html` ; 60 affirmations d'audit ;
- les 2 blocs Mermaid passent `mermaid.parse()` (jsdom + Node 24) ;
- la page ne défile pas horizontalement de 360 à 3840 px, `.fb-say` compris, et les
  deux blocs de formule ont été **capturés** pour contrôler le rendu des gloses ;
- `rss.xml` régénéré : **inchangé au bit près** (la carte d'index n'a pas bougé) et
  `config/legacy-public-manifest.json` déjà complet — aucun fichier ajouté au dépôt.
