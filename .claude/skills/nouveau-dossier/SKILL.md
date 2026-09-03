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
>   + **formules LaTeX/KaTeX obligatoires (§7)** + **lecture orale « Se lit » (§7 d bis)**
> - `reference/sources-and-index.md` — vérification, `sources/`, `sources.html`, index
> - `reference/images-template.md` — gabarit `images_a_generer.md`
> - `scripts/check-coverage.py` — **contrôle obligatoire** des 100 % verbatim
> - `scripts/optimize-pngs.sh` — optimisation PNG du site

Les chemins ci-dessous sont relatifs à la racine du dépôt et à
`.claude/skills/nouveau-dossier/`.

---

## Vue d'ensemble — les 15 étapes

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
   **correctif de révélation** (design-system §4) **et le bloc grands écrans
   `<style id="eci-wide-style">`** (design-system §9), copié tel quel du même dossier.
   Voir « Construction » ci-dessous.
6. **100 % du transcript, mot pour mot.** Puis **vérifier** avec `check-coverage.py`
   et **corriger jusqu'à 0 manquant** (hors coquilles légères signalées).
   **+ Formules en LaTeX (OBLIGATOIRE)** : toute formule prononcée, rappelée ou à
   expliquer est rendue en **KaTeX** (inline `.imath` à l'endroit exact + bloc
   `.formula-block` titré et **expliqué** à sa 1ʳᵉ occurrence). Jamais de formule en
   texte brut. Setup + CSS + script + validation : **`reference/design-system.md` §7**.
   **+ Lecture orale (OBLIGATOIRE)** : chaque `.formula-block` porte une ligne
   `.fb-say` — **comment la formule se dit en français**, plus une glose des symboles
   qui se prononcent mal (`∂` = « d rond », `Tr` = « trace », `ħ` = « h barre »…).
   Du français écrit, jamais de phonétique. Les `.imath` inline n'en reçoivent pas —
   le signaler dans le récapitulatif. Détail : **§7 d bis**.
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
11 bis. **Déclarer les fichiers dans `config/legacy-public-manifest.json`.**
    **OBLIGATOIRE** — sans ça le build casse (« Missing social image for dossier »).
    Voir « Manifeste public » ci-dessous.
12. **Régénérer le flux RSS** : `python3 scripts/generate-rss.py` (depuis la racine
    du dépôt) relit `index.html` et réécrit `rss.xml`. **OBLIGATOIRE dès que l'index
    change** (ajout/modif/réordonnancement). Vérifier que le flux est bien formé et
    contient le nouveau dossier — voir « Flux RSS » ci-dessous.
13. **(Quand les images sont générées)** vérifier visuellement, intégrer (hero +
    figures), **optimiser** (`scripts/optimize-pngs.sh`), réutiliser dans `sources.html`.
14. **(Optionnel) Dataviz SVG interactives** dans le langage codex (design-system §5).
15. **Publier seulement si demandé** : commit (FR, co-author) + push, puis vérifier
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
- **Bloc grands écrans** `<style id="eci-wide-style">` — **juste avant `</head>`**,
  donc *après* le `<style>` de la page : c'est ce qui lui donne le dernier mot sur la
  cascade. Sans lui, la page n'occupe que 40–45 % d'un écran 2560/3840 px. Le copier
  tel quel (design-system §9) ; une page dont le conteneur n'est pas `--max` reçoit le
  même escalier appliqué à **son** conteneur.
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
  `.imath` inline + `.formula-block` expliqué **et doté de sa ligne « Se lit »**
  (`.fb-say`) — voir `reference/design-system.md` §7 et §7 d bis.
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

**Balayage de largeurs (obligatoire)** — à **360 / 768 / 1280 / 1920 / 2560 / 3840 px**,
sur chaque page touchée : `window.scrollTo(9999,0)` doit laisser `window.scrollX === 0`,
et aucun élément ne doit avoir `getBoundingClientRect().right > clientWidth` — sauf à
l'intérieur d'un conteneur volontairement défilant (`.dtable-wrap`, `.formula`, `.nav`).
Vérifier au passage que la ligne de lecture reste sous ~100 signes aux grands paliers.
Détail et pièges connus : design-system §9.

---

## Manifeste public (`config/legacy-public-manifest.json`) — obligatoire

Le site est bâti par **Astro** : `scripts/prepare-legacy.ts` (lancé par `prebuild`)
ne copie dans `dist/` que les fichiers **explicitement listés** dans une allowlist.
Un fichier absent de cette liste **n'est pas publié** — et pire, le build **échoue
en dur** si l'image de la carte d'index n'y est pas :

```
scripts/prepare-legacy.ts:79
    if (!imagePath) throw new Error(`Missing social image for dossier: ${href}`);
```

Ce script construit aussi les métadonnées **Open Graph / Twitter** (`og:image`) de
chaque page à partir de la carte d'index : il cherche l'image pleine taille
(`<nom>-hero.png` / `.jpg`) correspondant à la vignette `<nom>-hero.index.webp`
**dans le manifeste**. Pas d'entrée → pas d'aperçu social, ou build cassé.

**À faire pour chaque dossier**, après avoir mis l'index à jour :

```bash
python3 - <<'PY'
import io, json, os
cfg = json.load(io.open('config/legacy-public.json', encoding='utf-8'))
bad_ext, bad_seg = set(cfg['forbiddenExtensions']), set(cfg['forbiddenSegments'])
p = 'config/legacy-public-manifest.json'
m = set(json.load(io.open(p, encoding='utf-8')))
TARGETS = ['<equipe>/<dossier>', 'sources/dossier-<N>-<nom>.md', 'sources/refs-<N>-<nom>.md']
added = []
for t in TARGETS:
    walk = os.walk(t) if os.path.isdir(t) else [(os.path.dirname(t), [], [os.path.basename(t)])]
    for root, dirs, files in walk:
        dirs[:] = [d for d in dirs if d not in bad_seg and not d.startswith('.')]
        for f in files:
            rel = os.path.join(root, f)
            if f.startswith('.') or os.path.splitext(f)[1].lower() in bad_ext: continue
            if rel not in m: m.add(rel); added.append(rel)
io.open(p, 'w', encoding='utf-8').write(json.dumps(sorted(m), ensure_ascii=False, indent=2) + "\n")
print(len(added), "entrées ajoutées"); [print(" ", a) for a in added]
PY
```

- Les extensions **interdites** (`.txt`, `.odt`, `.docx`, `.pptx`, `.doc`) sont
  filtrées : le **transcript source n'est jamais publié**, c'est voulu — ne pas
  l'ajouter à la main.
- **Vérifier ensuite que le build passe** (obligatoire, ~20 s) :

  ```bash
  npx --yes tsx scripts/prepare-legacy.ts   # → "Prepared N allowlisted legacy files"
  rm -rf .legacy-public                     # dossier de travail, ne pas committer
  ```

- Contrôler au passage que l'`og:image` est bien câblée :
  `grep -o 'og:image" content="[^"]*"' .legacy-public/<equipe>/<dossier>/index.html`
- **Committer `config/legacy-public-manifest.json` avec `index.html` et `rss.xml`.**

> **Vécu :** oublié sur le dossier XXVI (Alexandre le Grand) → déploiement Portainer
> en échec. En le corrigeant, on a découvert que le **dossier XXV (Entropie) n'y
> avait jamais été ajouté non plus** : le build était donc déjà cassé. Si le script
> échoue sur *un autre* dossier que le vôtre, c'est une dette antérieure — la
> corriger aussi, et le dire.

---

## Flux RSS (`rss.xml`) — à régénérer pour chaque dossier

Le site publie un **flux RSS riche** à `rss.xml` (racine), déclaré dans le `<head>`
de `index.html`. Il est **généré**, jamais édité à la main.

- **Source unique = `index.html`.** Le script `scripts/generate-rss.py` parse les
  cartes de dossiers (titre, lien, image hero, résumé, tags, badge, byline) et écrit
  `rss.xml`. Donc : **mettre l'index à jour d'abord** (étape 11), **puis** régénérer.
- Lancer **depuis la racine du dépôt** :

  ```bash
  python3 scripts/generate-rss.py
  # → "rss.xml généré : N items"
  ```

- Chaque carte donne un `<item>` : `title` « Dossier N — Titre », `link`/`guid`
  absolus, `dc:creator` (auteurs + participation), `description` + `content:encoded`
  (HTML riche : image, résumé, crédit, tags, lien), `enclosure` +
  `media:content`/`media:thumbnail` (image hero, taille réelle), `category` (tags +
  badge), `pubDate` (1er commit git ; repli sinon). Tri **antéchronologique**.
- **Vérifier** : `python3 -c "import xml.dom.minidom; xml.dom.minidom.parse('rss.xml')"`
  (bien formé) et que le **nombre d'items** inclut le nouveau dossier.
- **Publication** : stager `rss.xml` **avec** `index.html`.

---

## Vérification finale (checklist)

- [ ] `check-coverage.py` → **0 manquant** sur chaque transcript ;
- [ ] **formules** : toutes en KaTeX (inline + blocs expliqués), rendu réel vérifié
      → **0 failure** (script de validation §7), aucune formule en texte brut ;
- [ ] **lecture orale** : autant de `.fb-say` que de `.formula-block`
      (`grep -c 'class="fb-say"'` = `grep -c 'class="formula-block"'`), en français
      écrit et sans phonétique (§7 d bis) ;
- [ ] images chargées (ou hero briefé si pas encore généré), pas de scroll horizontal ;
- [ ] **grands écrans** : bloc `<style id="eci-wide-style">` présent juste avant
      `</head>`, et balayage **360 → 3840 px** propre (aucun défilement horizontal,
      rien de coupé, ligne de lecture sous ~100 signes) — design-system §9 ;
- [ ] liens : nav interne, retour Accueil, compagnons externes (`target="_blank"
      rel="noopener"`), liens croisés ;
- [ ] numérotation & compteurs cohérents (cartes index ↔ eyebrows des pages ↔ nav
      de pied ↔ `sources.html`) ;
- [ ] chaque affirmation/donnée **sourcée** dans `sources/` (audit + refs) **et
      surfacée** dans `sources.html` (fiche + compteurs) ;
- [ ] **`config/legacy-public-manifest.json` complété** (page, assets, avatars,
      fichiers `sources/`) et `npx tsx scripts/prepare-legacy.ts` **qui passe** ;
- [ ] **`rss.xml` régénéré** (`python3 scripts/generate-rss.py`), bien formé, et
      contenant le nouveau dossier (voir « Flux RSS ») ;
- [ ] encadrés « anti-intox » pour tous les ⚠️/🔶, corrections des ❌ ;
- [ ] JS valide (balises équilibrées, pas d'erreur console), révélation OK sur
      sections hautes ;
- [ ] si publication : `git status` propre côté fichiers du dossier, **pas de
      référence orpheline** ; build Pages `built` + `200` sur les URLs touchées ;
- [ ] mentionner les fichiers créés/modifiés et les corrections de coquilles.

---

## Publication (uniquement quand l'utilisateur le demande)

- Stager **précisément** les fichiers du dossier (page, .txt, avatars, `assets/*.png`
  optimisés, `index.html`, **`rss.xml`**, **`config/legacy-public-manifest.json`**,
  `sources/*`) — **ne pas** balayer les
  dossiers non suivis sans rapport (`.pi/`, `a_traiter/`, etc.). Utiliser
  `git add <chemins explicites>`.
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
- URL publique principale : `https://empire-contre-intox.com/`.
- Miroir secondaire : `https://thesamlepirate.github.io/empire-contre-intox/`.
- Sceau ECI **unique** : `ymir-lalie/assets/logo-eci.jpg` (référencer au bon chemin
  relatif).
- Outils requis (skill) : `codex` (génération des images, `codex exec`), `python3`,
  `node`, `pngquant`, `oxipng` (les deux derniers : `brew install pngquant oxipng`),
  `gh`, et `playwright-core` pour la vérif navigateur.
- Ne jamais committer `.DS_Store`, fichiers verrou office (`.~lock.*#`), ni les
  répertoires de travail non suivis.
