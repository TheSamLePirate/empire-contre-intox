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
8. **Validation (obligatoire)** :

   ```bash
   python3 .claude/skills/dossier-to-obsidian/scripts/check-vault-links.py \
     "/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/Dossier <N> — <Nom>"
   ```

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

## Ce qui reste volontairement de côté

- **Dataview** : plugin communautaire non garanti — les Bases natives couvrent
  le besoin. Proposer des requêtes Dataview seulement si l'utilisateur confirme
  l'avoir.
- **Configs `.obsidian/`** (bookmarks, graphe) : ne pas les éditer, l'application
  peut les écraser à chaud.
- Les **labos interactifs / WebGL** ne survivent pas au Markdown : les signaler
  en callout replié avec lien vers la page en ligne, jamais les omettre en
  silence.
