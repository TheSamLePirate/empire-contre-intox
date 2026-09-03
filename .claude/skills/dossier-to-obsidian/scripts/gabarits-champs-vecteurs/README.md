# Gabarits — Dossier VII « Le langage des champs » (25/08/2026)

Le cas du **dossier en identité invitée (voie B)** : `samlepirate/champs-vecteurs.html`
n'utilise pas le codex ECI mais son propre système (Newsreader / JetBrains Mono,
accent iris). Les classes à convertir ne sont donc **pas** celles des autres
gabarits — `.body`, `.panel`, `.diagram`, `.plate`, `.triad`, `.chap-head`,
`.recap`, `.coda` au lieu de `.prose` / `.side-note` / `.lab`.

C'est aussi le cas d'un dossier **sans transcription** (portage français d'un
épisode de 3Blue1Brown) : pas de `check-coverage.py`, et la source primaire est
la vidéo, citée sept fois entre guillemets.

## Ordre d'exécution

| Script | Ce qu'il écrit |
| --- | --- |
| `1-dossier.py` | les 12 notes de lecture (`00 —` … `11 —`), les images dans `_assets/`, les ancres `^formule-N` / `^atelier-N` / `^retenir-N`, les lignes **« Se lit »** et le `quadrantChart` des six champs |
| `2-moc-et-appareil.py` | le MOC, le Formulaire (avec « Se lit »), le Lexique, Les cinq figures, Les voix du dossier |
| `3-tableau-canvas-bases.py` | le tableau de bord (**tout recompté**), les 2 canvas, les 2 bases |
| `4-passerelles.py` | les passerelles bidirectionnelles VII ↔ XIV / XII / XXV et les « Dossiers liés » |
| `5-sources.py` | la note Sources, **extraite** de `sources/sources.html` (`const CHAMPS` + le groupe `REFS` du dossier VII) |

**Ne jamais rejouer `1-dossier.py` après `4-passerelles.py`** : il réécrit les
notes de lecture et efface les passerelles. Pour tout regénérer, relancer 1 → 2
→ 4 → 3 dans cet ordre (`5` est indépendant).

Corollaire : **tout ce qui doit survivre à un rejeu appartient à un script**. Le
`quadrantChart` de la note 06, d'abord inséré à la main, a disparu au premier
rejeu de `1-dossier.py` — il est maintenant produit par le script, à partir des
`div`/`curl` relevés dans le code.

`3-tableau-canvas-bases.py` est rejouable à volonté : il ne touche qu'à des
fichiers entièrement générés, et il **recompte** au lieu d'annoncer.

## L'audit `sources/` — écrit pendant cet export, pas avant

Au moment du **premier** export (25/08/2026), `sources/sources.html` ne contenait
**aucun tableau JS pour le Dossier VII**, ni fichier `sources/dossier-VII-*.md` :
il n'y avait rien à extraire, et la note Sources a d'abord été composée à la main
avec un avertissement disant la lacune.

L'audit a été écrit dans la foulée, le même jour, et la note est depuis
**extraite** comme celle des autres dossiers (`5-sources.py`). Ce qui a été
produit côté dépôt :

- `sources/dossier-VII-champs-vecteurs.md` — 39 affirmations, **34 ✅, 3 ⚠️, 1 🔶,
  1 ❌ corrigé** ;
- `sources/refs-doi-VII-champs-vecteurs.md` — **4 DOI vérifiés Crossref** (Maxwell
  1865, Lotka 1920, Volterra 1926, MoEDAL 2024) ;
- une section `#champs-vecteurs` dans `sources.html` (12 fiches, 1 groupe de
  références, compteur « dossiers audités » 23 → 24) ;
- les lignes de `sources/README.md` et les deux entrées du manifeste public.

**La méthode qui a marché sur un dossier de mathématiques : recalculer plutôt que
chercher.** Les six champs de l'atelier dérivés symboliquement (SymPy), l'équilibre
de Lotka-Volterra recalculé sur les coefficients du code, les orbites fermées
démontrées par l'invariant du système, les constantes d'affichage relevées dans le
JavaScript. Seules l'histoire des quatre équations (Heaviside 1884), l'état de la
recherche sur les monopôles et l'existence de l'épisode source ont demandé une
recherche web.

## Les huit lignes « Se lit »

Le dossier VII était antérieur à la règle de la charte. Les huit lignes ont été
écrites et posées dans la page pendant ce travail, avec un bloc CSS `.fb-say`
**en jetons de la page hôte** — JetBrains Mono pour le libellé, Newsreader
italique pour la phrase, filet à l'accent du chapitre (`--c`), pas l'or du codex.
Vérifié sans débordement à 360 / 768 / 1280 / 1920 / 2560 / 3840 px.

Les scripts 1 et 2 les remontent ensuite dans le coffre : dans le callout
`[!abstract]` de la formule pour les notes de lecture, et dans un callout
`[!quote] 🗣️ Se lit` pour le formulaire.

## Le contenu vivant du JavaScript

Comme au Dossier XXVII, l'essentiel de l'atelier n'est **pas dans le HTML** :

- `const F={…}` — les six champs, leurs expressions, leurs `div`/`curl` et leur
  description ; c'est la matière de la note `06 — Atelier I` ;
- les coefficients de Lotka-Volterra (`al`, `be`, `ga`, `de`, `MX`) du portrait
  de phase — qui donnent l'équilibre exact **(1,8 ; 1,8)** ;
- `const field=(x,y,t)=>…` — le champ génératif du hero, rendu en formule dans
  la note d'ouverture.

Piège : `soup.find_all('script')[0]` attrape le `<script>` KaTeX du `<head>`.
Sélectionner par contenu — `next(s for s in scripts if 'const F={' in ...)`.

## Vérifications passées

- `check-vault-links.py` sur `Empire contre Intox/` — 0 lien cassé, 0 nœud
  canvas manquant, 0 alias redondant ;
- 6 blocs Mermaid validés par `mermaid.parse()` sous JSDOM ;
- 8 `formula-block` du HTML → 8 `^formule-N` ; 16 `data-tex` affichés → 16
  `$$…$$` (+ 1 pour le champ du hero, signalé comme ajout éditorial) ;
- 7 `blockquote.q` + la citation de la coda + le *pull* d'ouverture → 9
  callouts `[!quote]` ; 5 `.panel` → 5 callouts ; 5 `.diagram` → 5 callouts
  « Figure » ; 4 `figure.plate` → 4 images copiées et intégrées.
