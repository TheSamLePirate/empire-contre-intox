# Gabarits — Dossier III « Artemis II, l'Odyssée Lunaire » (26/08/2026)

Le cas du **live à deux voix** : `provoxys/Artemis2.html` est en identité invitée
(voie B, Bricolage Grotesque / Newsreader / JetBrains Mono, accents orange-teal),
et c'est une **troisième structure** encore différente des deux autres voies B
déjà rencontrées. Ni `.prose`/`.side-note` du codex, ni `.body`/`.panel`/`.plate`
du Dossier VII :

```
section.chapter
  div.chap-head    → .num + h2
  div.part ×N      → .part-label + h3
     div.provoxy   → .who (b + span.ts) + <p>      ← 86 prises de parole, verbatim
     div.show-ts   → « Repère original · MM:SS »
     div.formula-block → .fb-head + .formula* + .fb-say + .fb-note

section.sam-chapter                                 ← l'invité déroule sa simulation
  p.intro ×2
  div.sim-act ×5   → .roman + h3 + .timing
  div.sim-timeline → div.moment[.key] ×36 → .ts-pill + .body (p + .what)
```

**La leçon se confirme : inventorier les classes de la page avant d'écrire une
ligne de conversion.** Chaque page invitée a la sienne, et un gabarit recopié
produit des notes vides sans lever la moindre erreur.

## Ordre d'exécution

| Script | Ce qu'il écrit |
| --- | --- |
| `0-add-fb-say.py` | **côté dépôt** — insère les 10 lignes « Se lit » dans le HTML (voir plus bas) |
| `1-dossier.py` | les 9 notes de lecture (`00 —` … `08 —`), `_assets/`, les ancres `^formule-N` et `^cle-N` |
| `2-moc-et-appareil.py` | le MOC, le Formulaire, le Lexique (35 sigles), les 4 Portraits + la galerie |
| `4-passerelles.py` | les 9 passerelles bidirectionnelles III ↔ XIV / VII / XXV |
| `3-tableau-canvas-bases.py` | le tableau de bord (**tout recompté**), les 2 canvas, les 2 bases |
| `5-sources.py` | la note Sources, **extraite** de `sources.html` (`const ARTEMIS` + le groupe REFS) |

Ordre réel : **0 → 1 → 2 → 4 → 3**, `5` indépendant. Comme ailleurs, `1` et `2`
réécrivent leurs fichiers et **effacent les passerelles** — rejouer `4` après.
`3` est rejouable à volonté : il ne touche qu'à des fichiers générés et recompte.

## Ce que l'export a corrigé dans la page

Le dossier III était antérieur à deux règles de la charte, et l'export les a
rattrapées (sur décision de l'utilisateur) :

- **10 blocs de formule, 0 ligne « Se lit »** — même situation qu'au Dossier VII.
  Les dix lignes ont été écrites et posées par `0-add-fb-say.py`, avec un bloc CSS
  `.fb-say` **en jetons de la page hôte** : JetBrains Mono pour le libellé,
  Newsreader italique pour la phrase, filet à l'accent orange `--core`, pas l'or
  du codex. Vérifié sans débordement à 360 / 768 / 1280 / 1920 / 2560 / 3840 px.
- **La page sautait du « Chapitre 6 » au « Chapitre 8 »** — il n'y avait pas de
  chapitre 7. Corrigé dans le HTML (une seule occurrence, aucun renvoi numéroté
  ailleurs : le seul renvoi disait « le chapitre dédié au pas de tir »).

## Le piège de typographie qui ne se voit qu'à l'écran

Les gloses `.say-x` employaient des **indices/exposants Unicode** (`g₀`, `m₀`,
`H₂O`, `cm⁻²`, `s⁻¹`). En Newsreader gras, `g₀` s'affiche **« go »** et `m₀`
**« mo »** — le lecteur lit un mot, pas un symbole. C'est le prolongement de la
règle « caractère combinant → KaTeX » de la charte : dans une glose, les
indices et exposants se posent en `<sub>` / `<sup>` HTML.

**Le contrôle de débordement ne voit rien de tout cela.** Il a fallu une capture
d'écran d'un bloc pour l'attraper — prévoir une capture par famille de glose.

## Les passerelles : un recoupement exceptionnel

`grep -ril` sur les dossiers déjà exportés a donné un résultat rare : **neuf des
dix formules d'Artemis II ont leur jumelle dans le Dossier XIV**, « Les Formules
de l'Empire » — huit dans `01 — Acte I — Espace & mécanique` (vis-viva, orbite &
libération, 2ᵉ loi de Newton, Tsiolkovsky, puissance d'échappement, Hohmann,
inverse du carré, Fourier) et l'électrolyse dans `02 — Acte II`. Seul le flux de
rayons cosmiques n'a pas d'équivalent.

D'où l'angle des passerelles : **les mêmes équations, ici appliquées à un vol
réel, là-bas jouables au curseur**. Plus deux recoupements de fond — la loi de
Fourier $\vec q=-k\vec\nabla T$ *est* un champ de vecteurs (Dossier VII), et les
RS-25 sont des moteurs thermiques bornés par Carnot (Dossier XXV).

## Deux pièges de coffre

- **`[[Portraits/Nom]]` ne résout pas.** Obsidian résout par nom de fichier tous
  dossiers confondus : écrire `[[Nom]]` nu, après avoir vérifié l'absence
  d'homonyme (`find . -name "Nom.md"`). Le validateur l'attrape.
- **La garde d'idempotence des passerelles doit viser la cible**
  (`"Passerelle — Dossier III «"`), pas le marqueur générique
  `"🔗 Passerelle — Dossier"` — sinon une note portant déjà une passerelle vers un
  *autre* dossier est sautée à tort. C'est arrivé sur `XIV/02` et `XXV/01`.

## Vérifications passées

- `check-vault-links.py` sur `Empire contre Intox/` — **0 lien cassé, 0 nœud
  canvas manquant, 0 alias redondant** ;
- 10 `formula-block` → 10 `^formule-N` → 10 entrées de formulaire → 10 « Se lit » ;
  13 formules affichées → 13 `$$…$$` ; 8 `.moment.key` → 8 `^cle-N` ;
- les 2 canvas valident en `json.load`, ids uniques, aucune arête orpheline ;
- la page ne défile pas horizontalement de 360 à 3840 px, `.fb-say` compris ;
- `rss.xml` régénéré (inchangé au bit près — la carte d'index n'a pas bougé) et
  `config/legacy-public-manifest.json` déjà complet : aucun fichier ajouté au dépôt.
