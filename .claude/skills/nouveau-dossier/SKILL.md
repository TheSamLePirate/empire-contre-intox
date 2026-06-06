---
name: nouveau-dossier
description: >-
  Transforme un déroulé / transcription de live (un ou plusieurs .txt) en un
  "dossier" HTML Empire contre Intox — page codex immersive, transcription
  conservée à 100 % mot pour mot, faits vérifiés et sourcés, images briefées,
  intégration à l'index et à l'appareil critique. À utiliser dès qu'un nouveau
  transcript de live doit devenir un dossier du projet empire-contre-intox
  (déclencheurs : "crée le dossier", "fais un dossier à partir de ce transcript",
  "implémente ce déroulé", "nouveau dossier HTML").
---

# Skill — Nouveau dossier Empire contre Intox

Reproduit **exactement** le process éprouvé sur les dossiers récents (Ancêtres
génétiques, Politique française 2026, Le Singe Aquatique, L'Esclavage triangulaire,
+ leurs dataviz). Le but : une page HTML autonome, immersive, **fidèle au mot près**
au transcript, **factuellement vérifiée**, intégrée à l'index et au dossier
`sources/`, et publiable sans casse.

> Lire d'abord `AGENT.md` (à la racine du dépôt) : c'est la charte du projet, ce
> skill en est la mise en œuvre opérationnelle. Ce dossier contient en plus :
> - `reference/design-system.md` — tokens codex + **correctif révélation** + dataviz
>   + **formules LaTeX/KaTeX obligatoires (§7)**
> - `reference/sources-and-index.md` — vérification, `sources/`, `sources.html`, index
> - `reference/images-template.md` — gabarit `images_a_generer.md`
> - `scripts/check-coverage.py` — **contrôle obligatoire** des 100 % verbatim
> - `scripts/optimize-pngs.sh` — optimisation PNG du site

Les chemins ci-dessous sont relatifs à la racine du dépôt et à
`.claude/skills/nouveau-dossier/`.

---

## Vue d'ensemble — les 14 étapes

0. Lire AGENT.md + ce skill.
1. **Lire 100 % du/des transcript(s)** (en entier, vraiment).
2. Repérer titre, ton, actes/chapitres naturels, passages forts, chute. Si plusieurs
   transcripts → plusieurs **Actes** (`section.act-band`).
3. Localiser le **dossier de l'équipe** (`<equipe>/`), le créer si besoin ; copier
   les **avatars** des auteurs dedans ; créer `assets/`.
4. **Lancer la vérification factuelle** : plusieurs agents `Agent` en parallèle
   (voir `reference/sources-and-index.md` §A). Lancer ces agents **tôt**, ils
   tournent pendant qu'on construit la page.
5. **Construire la page** `<equipe>/<dossier>/index.html` (ou `<nom>.html`), CSS+JS
   intégrés, en copiant le framework codex d'un dossier abouti
   (`ymir-lalie/esclavage/index.html`) et en adaptant accents + contenu. Inclure le
   **correctif de révélation** (design-system §4). Voir « Construction » ci-dessous.
6. **100 % du transcript, mot pour mot.** Puis **vérifier** avec `check-coverage.py`
   et **corriger jusqu'à 0 manquant** (hors coquilles légères signalées).
   **+ Formules en LaTeX (OBLIGATOIRE)** : toute formule prononcée, rappelée ou à
   expliquer est rendue en **KaTeX** (inline `.imath` à l'endroit exact + bloc
   `.formula-block` titré et **expliqué** à sa 1ʳᵉ occurrence). Jamais de formule en
   texte brut. Setup + CSS + script + validation : **`reference/design-system.md` §7**.
7. Intégrer les **nuances** des agents en **encadrés « anti-intox »** (sans toucher
   au verbatim). Crédit auteur (bandeau + collective-footer + carte d'index).
8. Créer **`images_a_generer.md`** (gabarit `reference/images-template.md`).
   **Les images sont OBLIGATOIRES** : le **hero** (= vignette d'index) **+ 3 à 5
   illustrations de chapitre** (une par grand thème). **Le faire TÔT** (dès que le
   plan des chapitres et les noms de fichiers sont arrêtés) puis **confier la
   génération à Codex EN PARALLÈLE** — voir « Parallélisation » ci-dessous.
9. **Vérifier la page en navigateur** (Chrome headless) : sections hautes révélées,
   pas de scroll horizontal, JS sans erreur, ancres nav OK.
10. **Documenter `sources/`** : `dossier-<N>-<nom>.md` + références (DOI ou
    institutionnelles), mettre à jour `sources/README.md`, **surfacer dans
    `sources.html`** (section + fiches + compteurs). Voir `reference/sources-and-index.md`.
11. **Mettre à jour `index.html`** : nouvelle carte, renuméroter « Les Sources »,
    compteurs, nav de pied. (Lire l'état courant d'abord — la numérotation bouge.)
12. **(Quand les images sont générées)** vérifier visuellement, intégrer (hero +
    figures), **optimiser** (`scripts/optimize-pngs.sh`), réutiliser dans `sources.html`.
13. **(Optionnel) Dataviz SVG interactives** dans le langage codex (design-system §5).
14. **Publier seulement si demandé** : commit (FR, co-author) + push, puis vérifier
    build Pages `built` + `200`. Attention au **piège des références orphelines**.

---

## Parallélisation (gagner du temps)

Trois pistes tournent **en parallèle** ; ne pas les attendre l'une l'autre :

1. **Vérification factuelle** — plusieurs agents `Agent` lancés tôt (étape 4),
   pendant qu'on construit la page.
2. **Génération des images par Codex** (`codex` CLI, déjà installé) — dès que le
   plan des chapitres et les **noms de fichiers** sont figés, écrire
   `images_a_generer.md` (étape 8) puis **lancer Codex en arrière-plan** et
   continuer sans l'attendre :

   ```bash
   codex exec --cd <equipe>/<dossier> --sandbox workspace-write \
     "Lis images_a_generer.md et génère TOUTES les images décrites (le hero ET
      chaque illustration de chapitre) aux noms de fichiers EXACTS indiqués, dans
      le sous-dossier assets/. Respecte la charte commune et le prompt de chaque
      image. N'oublie aucune image."
   ```
   - Lancer via l'outil **Bash avec `run_in_background: true`** → le travail
     principal continue, et tu es re-notifié quand Codex a fini.
   - Codex écrit les PNG dans `<equipe>/<dossier>/assets/`.
3. **Construction de la page + sources + index** — le travail principal, en
   parallèle des deux tracks ci-dessus.

Quand Codex a fini (notification du job en arrière-plan), **reprendre l'étape 12** :
vérifier visuellement **chaque** image (Read sur le PNG ; sujets sensibles →
contrôler la **dignité** et la fidélité au propos ; **regénérer** une image ratée
en relançant Codex sur le seul fichier concerné), intégrer (hero déjà câblé +
`figure.chapter-figure` pour les illustrations), **optimiser**
(`scripts/optimize-pngs.sh <equipe>/<dossier>/assets/`), et réutiliser dans les
fiches `sources.html`. Le hero étant déjà référencé (CSS `--hero` + carte d'index
+ fiches), la page reste cohérente même avant l'arrivée des images (emplacement
vide jusqu'à génération — le signaler à l'utilisateur).

> Règle clé : **`images_a_generer.md` tôt + `codex exec` en arrière-plan**, jamais
> en bloquant la construction. Les **images sont obligatoires** (hero + 3 à 5
> illustrations) : ne pas livrer un dossier avec le seul hero.

---

## Construction de la page (détails)

- **Copier** le `<head>` (Google Fonts Cinzel+Fraunces) et tout le `<style>` d'un
  dossier abouti ; remplacer les jetons d'accent secondaire et `--hero`.
- **Hero** : eyebrow « Dossier N · <thème> », `h1` avec un mot en `.foil`, lead,
  éventuelle citation, `hero-actions` (Lire le dossier / lien interne / Accueil ECI),
  `signal-board` (4 repères).
- **Topbar sticky** : sceau ECI (bon chemin relatif), lien Accueil, nav par ancres
  (chaque href `#id` doit correspondre à une `section id`), barre de progression,
  bouton mobile.
- **intro-band** (manifesto + timeline « fil conducteur ») + **learning-panel**
  (3 objectifs).
- **Chapitres** : `chapter-head` (kicker + h2 + `chapter-number`) puis `.transcript`
  = `.prose` (le verbatim, en `<p>`/listes/`group-title`/encadrés) + `aside.side-note`
  (avec un encadré « anti-intox » si nuances). Éditorialiser les **titres**, jamais
  le **corps**.
- Convertir les **tableaux** du transcript en `.dtable`, les **citations orales** en
  `.dialogue-block`, les **articles de loi** en `.article-noir`, le **sommaire** en
  `.pillar`, et **toute formule mathématique** (orale ou à rappeler) en **KaTeX** —
  `.imath` inline + `.formula-block` expliqué (voir `reference/design-system.md` §7).
- **credit-band** après le sommaire ; **collective-footer** (sceau, texte, actions,
  « Veritas omnia vincit ») ; **footer** technique court mentionnant les .txt sources.
- Construire **par ajouts successifs** (Edit) sur une page longue : insérer chaque
  chapitre avant la fermeture `</main></div>`, garder un seul `</main>` de page
  (le `<footer><main>…</main></footer>` en ajoute un second, normal).

### Fidélité au mot près — ce qui fait échouer `check-coverage.py`
- préfixes de numérotation de titres (« 1. », « 2- », « A- ») → **garder verbatim** ;
- intitulés de sections/documents éditorialisés → réintroduire le libellé exact ;
- guillemets/espaces : `« x »` vs `"x"` sont tolérés (le script normalise) ;
- coquilles évidentes corrigées (`ajoter`→`ajouter`, `votreADN`→`votre ADN`) :
  **acceptable**, mais **lister** ces corrections dans le récap final.

```
python3 .claude/skills/nouveau-dossier/scripts/check-coverage.py \
    <equipe>/<dossier>/index.html  <transcript1.txt> [<transcript2.txt> ...]
# → boucler jusqu'à "TOTAL manquants : 0"
```

---

## Vérification navigateur (recommandée)

Avec `playwright-core` (Chrome système, sans téléchargement) :
`cd /tmp/<dir> && npm i playwright-core`, puis un script
`chromium.launch({channel:'chrome'})` qui :
- scrolle jusqu'aux **chapitres les plus hauts** et vérifie `classList.contains('in')`
  et `getComputedStyle(s).opacity === '1'` ;
- (si dataviz) clique les éléments interactifs et vérifie les mises à jour + 0 erreur
  console ;
- prend des **screenshots** pour juger le rendu (et les envoyer à l'utilisateur).

---

## Vérification finale (checklist)

- [ ] `check-coverage.py` → **0 manquant** sur chaque transcript ;
- [ ] **formules** : toutes en KaTeX (inline + blocs expliqués), rendu réel vérifié
      → **0 failure** (script de validation §7), aucune formule en texte brut ;
- [ ] images chargées (ou hero briefé si pas encore généré), pas de scroll horizontal ;
- [ ] liens : nav interne, retour Accueil, compagnons externes (`target="_blank"
      rel="noopener"`), liens croisés ;
- [ ] numérotation & compteurs cohérents (cartes index ↔ eyebrows des pages ↔ nav
      de pied ↔ `sources.html`) ;
- [ ] chaque affirmation/donnée **sourcée** dans `sources/` (audit + refs) **et
      surfacée** dans `sources.html` (fiche + compteurs) ;
- [ ] encadrés « anti-intox » pour tous les ⚠️/🔶, corrections des ❌ ;
- [ ] JS valide (balises équilibrées, pas d'erreur console), révélation OK sur
      sections hautes ;
- [ ] si publication : `git status` propre côté fichiers du dossier, **pas de
      référence orpheline** ; build Pages `built` + `200` sur les URLs touchées ;
- [ ] mentionner les fichiers créés/modifiés et les corrections de coquilles.

---

## Publication (uniquement quand l'utilisateur le demande)

- Stager **précisément** les fichiers du dossier (page, .txt, avatars, `assets/*.png`
  optimisés, `index.html`, `sources/*`) — **ne pas** balayer les dossiers non suivis
  sans rapport (`.pi/`, `a_traiter/`, etc.). Utiliser `git add <chemins explicites>`.
- Message de commit **en français**, terminé par :
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- `git config http.postBuffer 524288000` avant un push lourd d'images.
- Après push : `gh api repos/TheSamLePirate/empire-contre-intox/pages/builds/latest
  --jq .status` → `built` ; `curl -s -o /dev/null -w "%{http_code}"` → `200` sur les
  URLs touchées (page, images, sources).
- **Piège** : committer `index.html`/`sources.html`/`README.md` qui contiennent déjà
  du câblage vers un autre dossier **non commité** publie des liens cassés → vérifier
  les fichiers non suivis référencés et les committer aussi, ou prévenir l'utilisateur
  (cf. `reference/sources-and-index.md` §E).

---

## Conventions du dépôt (rappels)

- Dépôt : `TheSamLePirate/empire-contre-intox` — GitHub Pages, branche `main`, racine.
- URL publique : `https://thesamlepirate.github.io/empire-contre-intox/`.
- Sceau ECI **unique** : `ymir-lalie/assets/logo-eci.jpg` (référencer au bon chemin
  relatif).
- Outils requis (skill) : `codex` (génération des images, `codex exec`), `python3`,
  `node`, `pngquant`, `oxipng` (les deux derniers : `brew install pngquant oxipng`),
  `gh`, et `playwright-core` pour la vérif navigateur.
- Ne jamais committer `.DS_Store`, fichiers verrou office (`.~lock.*#`), ni les
  répertoires de travail non suivis.
