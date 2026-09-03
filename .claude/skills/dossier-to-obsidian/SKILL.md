---
name: dossier-to-obsidian
description: >-
  Exporte un dossier Empire contre Intox (page HTML codex) vers le coffre
  Obsidian de l'utilisateur, en reproduisant le process éprouvé sur le
  Dossier XXV (Entropie) : une note-sommaire (MOC) + une note par acte,
  verbatim intégral, formules KaTeX, callouts, lexique, formulaire, fiches
  de personnages, sources vérifiées, tableau de bord, canvas, bases —
  toutes les fonctionnalités natives d'Obsidian. À utiliser dès qu'un
  dossier de ce dépôt doit rejoindre Obsidian (déclencheurs : « ajoute le
  dossier X dans mon obsidian », « exporte ce dossier vers obsidian »,
  « dossier_to_obsidian »).
---

# Skill — Dossier ECI → Obsidian

Reproduit **exactement** ce qui a été fait pour le Dossier XXV « L'entropie, le
temps et l'Univers » (25/08/2026). Les cinq scripts de ce premier export sont
conservés dans `scripts/gabarits-entropie/` : ce sont des **gabarits à adapter**
(chemins, ids de sections, personnages), pas des outils presse-bouton — chaque
dossier a ses sections propres. Le validateur `scripts/check-vault-links.py`,
lui, est **générique et se lance tel quel**.

Un second jeu de gabarits, `scripts/gabarits-ordinateur-1983/` (six scripts), sert
le cas du **dossier sans transcription** — celui qui est écrit d'après un objet
technique et non d'après un live (Dossier XXVII). Sa structure de page est plus
régulière (une `<section class="chapter">` par chapitre, `.prose` + `.side-note` +
`.lab`), et son appareil ne se compose pas de lexique et de portraits mais de ce
que la page contient réellement : formulaire, jeu d'instructions, banc d'essai
des expériences, programmes exécutables.

Un quatrième jeu, `scripts/gabarits-artemis2/` (six scripts + un `README.md`),
sert le **live à deux voix** : le Dossier III alterne les 86 prises de parole de
l'hôte (`div.provoxy` dans `section.chapter` → `div.part`) et la démonstration
de l'invité, qui déroule sa simulation en `section.sam-chapter` →
`div.sim-act` + `div.moment[.key]`. C'est une **troisième structure de voie B**,
distincte des deux autres — la preuve, s'il en fallait, qu'on inventorie les
classes avant d'écrire une ligne. Son `0-add-fb-say.py` montre aussi comment
poser dans une page invitée les lignes « Se lit » qui lui manquent.

Un troisième jeu, `scripts/gabarits-champs-vecteurs/` (cinq scripts + un
`README.md`), sert le cas du dossier en **identité invitée (voie B)** : le
Dossier VII n'emploie pas le codex ECI, donc **aucune des classes habituelles**
(`.body` · `.panel` · `.diagram` · `.plate` · `.triad` · `.recap` · `.coda` au
lieu de `.prose` / `.side-note`). C'était aussi, au départ, le cas d'un dossier dont
`sources/` ne contenait **aucun audit** — écrit depuis, dans la foulée de
l'export. Voir le README du dossier de gabarits : ce qu'on écrit tant que
l'audit manque, et comment on vérifie un dossier mathématique **par le calcul**
plutôt que par recherche web.

Un cinquième jeu, `scripts/gabarits-exoplanetes/` (six scripts + un `README.md`),
sert le **dossier de fusion** : le Dossier XVII ne vient pas d'un déroulé unique
mais de la réunion de tous les documents d'un créateur sur un sujet — donc **pas
de verbatim oral** à préserver, tout le contenu source conservé, et les
corrections en encadrés « anti-intox ». C'est aussi la page de **voie A la plus
riche en blocs** rencontrée jusqu'ici (`.explain-block` · `.viz` · `.scope-card` ·
`.model3d` · `.milestones` · `.atlas-cta`, plus une annexe de **54 fiches
techniques**), et le premier export où **l'annexe joue le rôle des Portraits** :
une note par objet, nom de fichier court, nom complet en H1 et en alias.

## Cible

- Coffre : `/Users/olivierveinand/Documents/Obsidian Vault` (vérifiable dans
  `~/Library/Application Support/obsidian/obsidian.json` ; voir aussi la mémoire
  `obsidian-vault`).
- Sortie : `Empire contre Intox/Dossier <N> — <Nom court>/` dans le coffre :

```
Dossier XXV — Entropie/
  Dossier XXV — <Titre complet>.md      ← MOC (sommaire, fil conducteur, crédits)
  00 — Ouverture — ….md … 09 — ….md     ← notes de lecture (une par acte + conclusion…)
  Lexique — ….md · Formulaire — ….md    ← appareil du dossier
  Sources — la vérification du dossier.md
  Tableau de bord — <Dossier>.md        ← poste de pilotage
  Portraits — la galerie ….md + Portraits/<Nom>.md ×N   ← si page compagnon
  Carte du dossier — ….canvas · <personnages> — frise.canvas
  Dossier <N> — lecture.base · Portraits des ….base
  _assets/                              ← images, PDF (préfixer : portrait-*.jpg)
```

## Étapes (dans l'ordre)

1. **Repérage.** Lire la structure de la page : `grep -o '<section[^>]*id=…'` +
   inventaire des classes (`grep -o 'class="…"' | sort | uniq -c`). Lire un acte
   entier pour connaître les gabarits de blocs. Vérifier `python3 -c "import bs4"`.
2. **Conversion principale** (gabarit `1-dossier.py`) : parcourir les sections de
   `<main>` dans l'ordre → MOC + une note par acte + lexique. Table de conversion :

   | HTML (codex ECI) | Markdown Obsidian |
   | --- | --- |
   | `.formula-block` (`data-tex`) | callout `[!abstract]` avec `$$…$$`, ligne **Se lit**, glose, note |
   | `.imath[data-tex]` | `$…$` inline |
   | `.science-block.def-block` | `[!info]` · `.antiintox` → `[!warning]` |
   | `.lesson-block` (À retenir) | `[!important]` |
   | `.question-block` / `details.faq-details` | `[!question]` (+ « — la réponse du live ») |
   | `.viz-mount` | `[!example]-` replié, une ligne + lien vers la page en ligne |
   | `.dtable` | table Markdown (`mono-sample` → backticks) |
   | `figure > img` | copie dans `_assets/` + `![alt](…)` + légende italique |
   | `figure > svg` | callout `aria-label` + légende **puis Mermaid à l'étape 5** |
   | `p.speaker` | `**🔥 Provoxys …**` / `**🧊 Sam …**` |
   | liens `#ancre` / relatifs | URL absolue du site ; `#lex…` → wikilink Lexique |

   Frontmatter sur chaque note (projet, dossier, auteurs, source, licence,
   importé, tags) ; navigation `⌂ Sommaire · ← précédent · suivant →` en pied.
3. **Pages compagnons** (gabarit `2-portraits-formulaire.py`) : une note **par
   personnage** (`Portraits/<Nom>.md` : image, fiche d'identité depuis le `<dl>`,
   récit, épithète) + une note-galerie groupée par acte. **Formulaire** : toutes
   les formules du dossier dans l'ordre, chacune avec « Se lit », glose, note
   repliée `[!note]-` et lien vers sa note d'origine.
4. **Sources** (gabarit `5-sources.py`) : extraire de `sources/sources.html` le
   tableau JS `const <DOSSIER> = […]` (fiches `{t,d,v,s,src}`) et le groupe
   `REFS` du dossier. Verdicts : `ok` → `[!success]` ✅ · `warn` → `[!warning]` ⚠️
   · `deb` → `[!help]` 🔶. Références en `[!cite]-` repliés (citation, type, lien
   DOI, abstract). Copier les PDF cités dans `_assets/` (lisibles dans Obsidian).
   Lier l'audit `sources/dossier-<n>-….md` et `refs-doi-<n>-….md` en ligne.
5. **Enrichissements Obsidian** (gabarit `3-enrichissements.py`) :
   - **aliases** sur toutes les notes (`Carnot`, `Dossier XXV`, `Acte I`…) ;
   - **tags imbriqués** : `empire-contre-intox/dossier-<n>` ;
   - **liens profonds** `[[note#Chapitre N — Titre]]` dans le sommaire et le
     formulaire (titres copiés à l'identique) ;
   - **identifiants de blocs** : `^formule-N` (callout complet), `^eq-N`
     (équation seule), `^retenir-N` (les « À retenir ») — la ligne `^id` se pose
     **immédiatement après** le bloc, sans ligne vide ;
   - **liens automatiques vers les fiches personnages** : 1ʳᵉ occurrence par
     note, alias = mot d'origine (le verbatim affiché ne change pas). Exclure :
     titres, maths, code, intérieur d'un lien, composés (`Bekenstein-Hawking`),
     homonymes d'unités (kelvin/joule minuscules passent d'eux-mêmes) ;
   - **Mermaid** pour chaque figure SVG perdue à la conversion (carte des
     potentiels, carte des entropies…) ;
   - propriétés **ASCII** pour les Bases (`epithete`, pas `épithète`) +
     `acte`/`fiche`/`ordre` pour le tri.
6. **Tableau de bord + canvas** (gabarit `4-tableau-de-bord-canvas.py`) :
   - `Tableau de bord — <Dossier>.md` : accès rapide (tableau), chiffres réels
     recomptés, **progression de lecture** (cases à cocher), « le dossier en N
     phrases » (**transclusion** des `^retenir-N`), sections embarquées par lien
     de titre (`![[MOC#…]]`), les deux bases ;
   - `Carte du dossier — ….canvas` : notes de lecture en chaîne + groupes
     « Appareil critique » et compagnons, arêtes étiquetées ;
   - une **frise canvas** des personnages (groupes par acte, nœuds fichiers) ;
   - `Dossier <N> — lecture.base` (table triée par `ordre`) et une base
     personnages (vues table + cartes).
7. **Câblage.** Le MOC référence tout (tableau de bord en tête de sommaire,
   formulaire, sources, galerie, canvas) ; le tableau de bord lie tout le reste.
8. **Passerelles inter-dossiers.** Le coffre est un graphe, pas des silos :
   - **enregistrer le dossier** dans les trois pièces de tête du coffre, toutes
     construites depuis `index.html` par `scripts/super-dashboard.py`
     (relancer le script suffit : il redétecte les dossiers exportés, recompte
     tout et régénère) —
     `Empire contre Intox — tableau de bord.md` (le poste de pilotage global :
     chiffres, fiches des dossiers exportés — vignette comprise —, **avancement
     N/28 en cases à cocher**, les 7 parcours en tables, le plan des passerelles,
     le décret),
     `Empire contre Intox — la carte de l'Empire.canvas` (7 groupes de parcours,
     **colorés avec l'accent réel de chaque parcours** ; pour chaque dossier une
     **vignette** au-dessus de sa fiche — nœud **fichier** vers le MOC si le
     dossier est exporté, nœud **texte** — badge, résumé, auteurs, mots-clés,
     lien — sinon ; les **passerelles posées** en arêtes vertes, celles du `PLAN`
     en arêtes « à poser ») et
     `Empire contre Intox — l'index des dossiers.md` (le **catalogue complet** :
     hero de l'accueil, table des 28 dossiers, puis **une fiche par carte** avec
     vignette, badge, résumé, mots-clés, avatars et accent, plus les index
     **par autrice/auteur** et **par mot-clé**, le manifeste et le décret) ;
   - le script **copie dans `_assets/`** les images de cartes de l'accueil
     (`dossier-<NN>-<slug>.webp`), les avatars (`avatar-<nom>.webp`) et
     `og-index.jpg` — les embeds sont des wikilinks, donc visibles dans le graphe
     et vérifiés par `check-vault-links.py` ;
   - **compléter le plan des passerelles** (`PLAN` dans le script) quand l'export
     révèle un recoupement que la table ne prévoyait pas encore ;
   - **chercher les recoupements** avec les dossiers déjà exportés — personnages
     (fiches Portraits) ET concepts : `grep -ril "<terme>"` sur chaque dossier du
     coffre, en partant des mots-clés du nouveau dossier (ex. Entropie ↔ Tableau
     Périodique : fond diffus, spin, quanta, fonction d'onde) ;
   - pour chaque recoupement réel, poser une **passerelle bidirectionnelle** :
     callout `> [!tip] 🔗 Passerelle — Dossier <N> « <Titre> »` inséré **avant le
     pied de navigation** des deux notes concernées, une ou deux phrases qui
     disent *pourquoi* les notes se répondent, wikilink au centre ;
   - ajouter des **renvois du lexique** (s'il existe) vers les notes de l'autre
     dossier qui développent le terme ;
   - donner à chaque MOC une section **« Dossiers liés »** (avant les Crédits)
     vers les MOC voisins et l'index parapluie ;
   - si un personnage du nouveau dossier a déjà sa fiche Portraits ailleurs,
     l'auto-lien de l'étape 5 pointe dessus (vérifier avant de créer un doublon).
9. **Validation (obligatoire)** :

   ```bash
   python3 .claude/skills/dossier-to-obsidian/scripts/check-vault-links.py \
     "/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox"
   ```

   Se lance sur le **dossier parent** `Empire contre Intox/` dès qu'il existe des
   passerelles (les liens traversent les dossiers) ; sur le seul dossier exporté
   sinon.

   Zéro lien/embed/fragment cassé exigé. Compter aussi : formules converties =
   `grep -c 'class="formula-block"'` de la source (+ compagnons), fiches sources
   = entrées du tableau JS, termes du lexique, `^formule-N` = total annoncé.
   Finir en mettant à jour la mémoire `obsidian-vault` si la convention évolue.

## Pièges éprouvés (Dossier XXV — ne pas les redécouvrir)

- **Espaces insécables** : les regex de nettoyage doivent viser l'espace simple
  (`' +'`), jamais `\s` — sinon les `« … »` du verbatim sont avalées.
- **Wikilinks dans les tables Markdown** : l'alias s'échappe `[[Note\|alias]]` —
  et le validateur doit le savoir (faux positifs sinon).
- **Frontmatter** : tester la présence d'une clé avec `^clé:` en début de ligne
  (`fiche:` est une sous-chaîne d'`auteur-fiche:` → clé silencieusement omise).
- **`:` interdit dans un nom de fichier** : ne sanitiser que le nom de fichier,
  jamais le titre H1 ni l'alias.
- **Figures hors `.prose`** : certaines vivent dans une `<section class="reveal">`
  autonome entre deux chapitres — prévoir un repli générique dans la boucle.
- **`[[X|X]]`** : nettoyer les alias redondants en fin de run.
- **Bases** : noms de propriétés ASCII sans espaces ; en cas de doute sur la
  syntaxe d'une vue, rester minimal (filters + order + sort), l'UI corrige.
- **Canvas** : JSON strict (valider par `json.load`), chemins **relatifs au
  coffre**, ids uniques ; pour insérer un nœud dans un groupe existant, agrandir
  le groupe et décaler ce qui suit.
- **Idempotence** : les gabarits ne sont pas tous rejouables (les `^id` se
  dupliqueraient) — regénérer depuis zéro ou garder les gardes `if déjà présent`.
- **`grep` est aliasé `ugrep`** sur cette machine : échapper `[[` (`grep -F`).
- **Collision de noms inter-dossiers** (découverte au Dossier V) : les wikilinks
  Obsidian résolvent par nom de fichier, **tous dossiers confondus**. Les notes
  transverses doivent porter le nom du dossier : `Sources — la vérification du
  Tableau Périodique`, jamais `Sources — la vérification du dossier` (déjà pris
  par l'Entropie). Vérifier avant d'écrire : `ls` des autres dossiers du coffre.
- **Bloc de formule imbriqué dans un autre bloc** (règle de Born, Dossier V) :
  le `^formule-N` posé dans le callout imbriqué devient `> ^formule-N` — invalide.
  Le déplacer **après la fin du callout englobant** (l'ancre couvre alors tout
  l'encadré, ce qui est le bon contexte).
- **Rejeu** : l'ordre des scripts compte (1 → 2 → 3 → 4 → 5) ; les scripts 3+
  patchent les fichiers générés par 1-2 — relancer 1 écrase leurs apports.
- **Ancre de titre vers un autre dossier** (découverte au Dossier XXVII) : les
  titres déjà exportés portent des **espaces insécables** typographiques
  (`Shannon\xa0: mesurer l'incertitude`). Un `[[note#Chapitre 17 — Shannon : …]]`
  tapé avec une espace simple est un **lien mort silencieux**. Copier le titre
  depuis le fichier cible (`grep '^## '` puis `repr()`), jamais le retaper. Seul
  le validateur le voit — c'est exactement ce qu'il est là pour attraper.
- **Typographie française** : ne pas ajouter d'espace après `**…**`, `*…*`,
  `` `…` `` ni autour de `$…$` — le HTML source porte déjà ses espaces. Les
  regex « recolle la ponctuation » du gabarit Entropie mangent alors les espaces
  fines de ` : `, ` ; `, `« … »`. Insérer sans ajouter, et ne nettoyer que `\xa0`.
- **Code fence dans un callout** : passer `['```\n' + txt + '\n```']` en **un
  seul** élément de corps ; trois éléments séparés insèrent une ligne `>` vide
  entre la clôture et le contenu, et la plaque ASCII se disloque.
- **Contenu vivant dans le JS** (Dossier XXVII) : les exemples affichés par
  onglets (`#cc-c`, `#cc-asm`) et les programmes chargeables (`const PROGS`)
  n'existent **pas dans le HTML** — les `<pre>` y sont vides. Les extraire du
  script et les rendre en blocs de code, sinon le dossier perd son contenu le
  plus concret. Piège de regex : la **dernière** entrée d'un objet JS n'est pas
  suivie d'un saut de ligne dans la capture — terminer par `(?:\n|$)`.
- **Mermaid** : vérifiable sans navigateur — `npm i --no-save mermaid jsdom` puis
  `mermaid.parse()` sur chaque bloc dans un `JSDOM` (poser `navigator` par
  `Object.defineProperty`, il n'a qu'un getter sous Node 24).
- **Identité invitée** (voie B, découverte au Dossier VII) : commencer par un
  **inventaire des classes** de `<main>` (`for t in main.find_all(True)` →
  `Counter`) avant d'écrire une ligne de conversion. Une page invitée n'a
  aucune des classes du codex, et un gabarit recopié tel quel produit des notes
  vides sans lever la moindre erreur.
- **Le bon `<script>`** : `soup.find_all('script')[0]` attrape le `<script>` du
  CDN KaTeX dans le `<head>`. Sélectionner par contenu
  (`next(s for s in scripts if 'const F={' in s.get_text())`).
- **Ne pas reconvertir un lien déjà converti** : si le convertisseur `inline()`
  rend les `<a>` en Markdown, réutiliser `txt(a)` pour fabriquer un
  `[label](href)` produit `[[texte](url)](url)`. Prendre `a.get_text()`.
- **Décimales françaises dans le TeX** : un coefficient relevé dans le code
  (`0.9`) doit s'écrire `0{,}9` en KaTeX, pas `0.9`.
- **Un dossier sans audit dans `sources/`** (cas du Dossier VII) : ne rien
  inventer et ne pas sauter l'étape. Composer d'abord la note « Sources » sur ce
  qui existe vraiment — la fiche du dossier transversal qui le cite, les
  références canoniques de `dossier-XIV-formules.md` — y ajouter ce qui **peut se
  vérifier sans recherche** (pour un dossier mathématique : recalculer, SymPy
  fait très bien l'affaire), vérifier les DOI par Crossref, et **signaler la
  lacune à l'utilisateur**. S'il demande de la combler, l'export devient la
  moitié du travail : écrire `sources/dossier-<n>-*.md` et `refs-doi-<n>-*.md`,
  ouvrir la section dans `sources.html`, mettre à jour `sources/README.md` **et
  `config/legacy-public-manifest.json`** (sinon les fichiers ne sont pas
  publiés), puis **régénérer la note Sources par extraction** comme pour les
  autres dossiers — elle cesse d'être écrite à la main.
- **Vérifier un dossier de mathématiques, c'est le recalculer.** Il n'affirme
  presque aucun fait du monde : chercher une source qui répète une définition
  n'apprend rien, refaire le calcul si. Au Dossier VII, SymPy a confirmé les six
  champs de l'atelier (12 nombres), l'équilibre de Lotka-Volterra sur les
  coefficients réels du code, et l'invariant qui ferme les orbites. Seules les
  affirmations **historiques** (Heaviside 1884) et **empiriques** (aucun monopôle
  détecté) demandent une recherche web. Même esprit qu'au Dossier XXVII, où la
  vérification passait par l'exécution du code.
- **Un export peut modifier la page source** — et alors les notes déjà écrites
  mentent. Après une correction dans le HTML (ici : une coquille de renvoi de
  chapitre et huit lignes « Se lit » ajoutées), **rejouer toute la chaîne** et
  relire les avertissements posés par l'export : « ce dossier n'a pas d'audit »,
  « aucune ligne Se lit », « coquille conservée telle quelle » étaient tous
  devenus faux.
- **`[[Portraits/Nom]]` ne résout pas** (Dossier III) : Obsidian résout par nom de
  fichier tous dossiers confondus. Écrire `[[Nom]]` nu, après avoir vérifié
  l'absence d'homonyme (`find . -name "Nom.md"`). Le validateur l'attrape.
- **Garde d'idempotence des passerelles** : viser **la cible**
  (`"Passerelle — Dossier III «"`), jamais le marqueur générique
  `"🔗 Passerelle — Dossier"` — sinon une note portant déjà une passerelle vers un
  *autre* dossier est sautée à tort.
- **Indices et exposants Unicode dans une glose** (`g₀`, `cm⁻²`) : prolongement de
  la règle du caractère combinant. En police de labeur sérif, `g₀` en gras
  s'affiche « go » — poser des `<sub>`/`<sup>` HTML. **Le contrôle de débordement
  ne le voit pas** : il faut une capture d'écran par famille de glose.
- **`quadrantChart`** est le bon Mermaid pour ranger des cas par **deux nombres
  signés** (les six champs par leur divergence et leur rotationnel). Ses
  coordonnées vont de 0 à 1 : normaliser, et **dire l'échelle** sous le
  diagramme. Éviter 0 et 1 exacts, qui collent aux bords.
- **…mais pas pour deux grandeurs corrélées** (Dossier XVII) : masse et rayon sont
  monotones, les 21 mondes tombent tous sur la diagonale et deux quadrants restent
  vides. Le quadrant demande deux nombres **réellement indépendants** ; sinon un
  `flowchart` de classification dit davantage.
- **`classDef` de Mermaid n'accepte pas `rgba(...)`** : les parenthèses cassent le
  parseur (`Expecting … got 'PS'`). Poser des couleurs hexadécimales.
- **Un bloc Markdown qui commence par `### ` n'est pas un titre** (Dossier XVII) :
  la frise des jalons rend `### Titre` **puis un tableau de onze lignes**, et
  l'extraction des sous-titres du sommaire (`b[4:] for b in blocks if
  b.startswith("### ")`) a mis tout le tableau dans un wikilink. Le validateur ne
  dit rien — le fragment existe vraiment. Ne retenir que `b.split("\n", 1)[0]`.
- **Une classe de caractères ne gère pas les sélecteurs de variante** :
  `[✅⚠️🔶✳️❌] ` ne matche pas `⚠️ ` — la classe consomme `⚠`, puis attend l'espace
  et tombe sur U+FE0F. Écrire `[✅⚠🔶✳❌]️? `. Un recomptage silencieusement faux.
- **`.capitalize()` détruit les sigles** : « WASP-39 b (JWST) » devient
  « wasp-39 b (jwst) ». Ne majusculer que la première lettre.
- **L'audit de `sources/` n'a pas toujours la forme de blocs `## N.`** : celui du
  Dossier XVII est en **tables Markdown** (`| Affirmation | Verdict | … |`). Lire
  le fichier avant d'écrire l'extracteur. Et `sources.html` a un **cinquième
  verdict**, `fresh` → « Corrigé » (violet) : le mapper (`[!note] ✳️`) plutôt que
  de le laisser retomber sur « Confirmé ».
- **Un débordement clippé ne fait pas défiler la page** (Dossier XVII) : le
  contrôle habituel (`window.scrollTo(9999,0)` puis `scrollX === 0`) était **vert**
  alors que 54 fiches étaient coupées à 360 px — le `details` parent les clippait
  en `overflow:hidden`, à cause d'un `white-space:nowrap` sur un `dt` de colonne
  `auto`. Comparer aussi `scrollWidth`/`clientWidth` des conteneurs et remonter la
  chaîne des ancêtres pour savoir lequel clippe.
- **Une annexe de fiches est l'analogue des Portraits** (Dossier XVII, 54 objets) :
  une note par objet, **nom de fichier court** (`JWST`, `Keck`, `VLT`), nom complet
  en H1 et en alias, et une section « Dans le dossier » construite en cherchant le
  nom de l'objet dans les notes de lecture **déjà écrites** (donc après le script 1).

## Ce qui reste volontairement de côté

- **Dataview** : plugin communautaire non garanti — les Bases natives couvrent
  le besoin. Proposer des requêtes Dataview seulement si l'utilisateur confirme
  l'avoir.
- **Configs `.obsidian/`** (bookmarks, graphe) : ne pas les éditer, l'application
  peut les écraser à chaud.
- Les **labos interactifs / WebGL** ne survivent pas au Markdown : les signaler
  en callout replié avec lien vers la page en ligne, jamais les omettre en
  silence.
