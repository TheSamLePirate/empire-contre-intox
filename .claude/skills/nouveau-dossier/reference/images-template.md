# Gabarit `images_a_generer.md`

**Codex** génère les images d'après ce fichier (track **parallèle** — voir
`SKILL.md` § Parallélisation). On y met : la **charte commune** (pour que tout
reste cohérent), puis **un bloc par image** avec son **nom de fichier exact**
(= celui référencé dans le HTML) et un **prompt en anglais** précis.

> **Les images sont OBLIGATOIRES**, pas optionnelles. Tout dossier comporte au
> minimum le **hero** (qui sert aussi de vignette d'index) **et plusieurs
> illustrations de chapitre** (≈ 3 à 5, une par grand thème). Les derniers
> dossiers en ont 3 à 5 : Politique 2026 (hero + institutions + gauche-droite),
> Ancêtres génétiques (5), Esclavage (hero + Code Noir + route atlantique +
> Nantes). Viser un **ensemble riche**, jamais le seul hero.

> **Process :** écrire ce fichier **tôt** (dès que les noms de fichiers sont
> figés), puis lancer **`codex exec`** en arrière-plan (Bash `run_in_background:true`)
> de la construction de la page / des sources / de l'index — commande exacte dans
> `SKILL.md` § Parallélisation. Codex écrit les PNG dans `<equipe>/<dossier>/assets/` ;
> on ne l'attend pas pour continuer. À la fin : vérification visuelle de **chaque**
> image (dignité pour les sujets sensibles, regénérer une image ratée) →
> intégration → optimisation (`scripts/optimize-pngs.sh`).

Placer les images dans `<equipe>/<dossier>/assets/`.

---

```markdown
# Images à générer — Dossier « <Titre> »

Toutes les images vont dans `<equipe>/<dossier>/assets/`.

**Charte visuelle commune** — identité « Codex scientifique impérial » d'Empire
contre Intox[, déclinée en <registre : grave/mémoriel | civique | etc.>] :

- Dominante **nuit profonde** (#050811 → #0e1a2e), atmosphère cérémonielle.
- Accent maître **or** (#d6ac55 / #f3d98a).
- Accent(s) secondaire(s) : <les accents du dossier, ex. #3f6b78 bleu Atlantique>.
- Rendu : illustration/gravure codex élégante, semi-réaliste, lumière volumétrique
  douce, grain léger.
- **Pas** de texte incrusté, pas de logo, pas de watermark, pas de visages réels
  reconnaissables. [Sujets sensibles : dignité absolue, aucune violence graphique.]
- Zone sombre réservée pour superposer du texte clair.

---

## 1. `<nom>-hero.png` — Image héro (et vignette d'index)
**Format :** paysage large, ~2400×1500 px (ratio ~16:10), tiers gauche sombre.

**Prompt :**
> <Prompt anglais cinématographique : sujet central symbolique, palette nuit+or+accent,
> engraved grid, faint stars, volumetric soft light, fine grain. Left third kept dark
> for overlaid title. No text, no logo, no watermark.>

## Illustrations de chapitre (obligatoires) — même charte
**3 à 5 illustrations**, une par grand thème du dossier ; 1 bloc par image
(`<nom>-<sujet>.png`, format 16:9), prompt anglais précis et fidèle au propos.
Intégrées ensuite en `figure.chapter-figure` (avec `<figcaption>` et `alt`
descriptif) dans le chapitre correspondant, et **réutilisées dans les fiches
`sources.html`** (varier les `img:` des fiches).
```

---

## Après génération des images (process)
1. **Vérifier visuellement** chaque image (outil Read sur le PNG) : fidélité au
   brief, charte, et — sujets sensibles — **dignité**.
2. **Brancher** : le hero est déjà référencé (CSS `--hero` + carte d'index + fiches).
   Intégrer les illustrations en `<figure class="chapter-figure">` (avec
   `<figcaption>` et `alt` descriptif) dans les bons chapitres, et varier les
   `img:` des fiches `sources.html`.
3. **Optimiser** : `scripts/optimize-pngs.sh <equipe>/<dossier>/assets/` (≈ −60 %,
   0 corrompu, format/chemins inchangés).
4. Commit/push si demandé, puis vérifier le **200** sur chaque image en prod.
