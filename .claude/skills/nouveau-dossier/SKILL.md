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
> - `reference/formules-symboles.md` — **formules survolables (OBLIGATOIRE)** : chaque
>   symbole affiche sa définition et son unité, « Ce qu'elle dit », rangée des symboles,
>   formules du texte annotées selon leur contexte ; composant commun `assets/eci-formules.*`
> - `reference/sources-and-index.md` — vérification, `sources/`, `sources.html`, index
> - `reference/images-template.md` — gabarit `images_a_generer.md`
> - `scripts/check-coverage.py` — **contrôle obligatoire** des 100 % verbatim
> - `scripts/verify-dossier.py` — **TOUS les contrôles de fin en une commande**
>   (verbatim, formules, page, liens, JS, index, manifeste, RSS, cache, sources)
> - `scripts/formules-symboles.py` (+ modules `scripts/formules/`) — annote les formules
>   d'une page d'après `<dossier>/symboles.md` (`--init`, passe, `--check`, `--retirer`)
> - `scripts/optimize-pngs.sh` — optimisation PNG du site
> - `scripts/grammalecte-check.py` + `scripts/grammalecte-apply.py` + `tools/Grammalecte-fr-v2.3.0.zip`
>   — **orthographe et grammaire** (transcript `.txt` ou page `.html`), trié par l'agent
>   `tri-grammalecte`, trace dans `<dossier>/grammalecte.md` — voir « Orthographe & grammaire »
> - `.claude/agents/verif-claims.md` — **l'agent de vérification factuelle** (format
>   de sortie fixé, DOI Crossref, noms tels qu'écrits dans le transcript, effort `high`)

Les chemins ci-dessous sont relatifs à la racine du dépôt et à
`.claude/skills/nouveau-dossier/`.

---

## Vue d'ensemble — les 15 étapes

0. Lire AGENT.md + ce skill.
1. **Lire 100 % du/des transcript(s)** (en entier, vraiment). Ouvrir dans la
   foulée le **journal de travail** `a_traiter/<dossier>/journal.md` (voir
   « Journal de travail » ci-dessous) : il survit à la compaction, pas le contexte.
2. Repérer titre, ton, actes/chapitres naturels, passages forts, chute. Si plusieurs
   transcripts → plusieurs **Actes** (`section.act-band`).
3. Localiser le **dossier de l'équipe** (`<equipe>/`), le créer si besoin ; copier
   les **avatars** des auteurs dedans ; créer `assets/`.
4. **Lancer la vérification factuelle** : plusieurs agents **`verif-claims`**
   (`subagent_type: "verif-claims"`, défini dans `.claude/agents/`) en parallèle,
   un par thème, **dans un même message** (voir `reference/sources-and-index.md`
   §A). Lancer ces agents **tôt**, en arrière-plan : ils tournent pendant qu'on
   construit la page, et leur rapport arrive en notification. **Jamais à effort
   `low`** : à ce niveau le modèle répond de mémoire au lieu de chercher — l'agent
   fixe `effort: high` dans son frontmatter, ne pas le surcharger vers le bas.
5. **Construire la page** `<equipe>/<dossier>/index.html` (ou `<nom>.html`), CSS+JS
   intégrés, en copiant le framework codex d'un dossier abouti
   (`ymir-lalie/esclavage/index.html`) et en adaptant accents + contenu. Inclure le
   **correctif de révélation** (design-system §4) **et le bloc grands écrans
   `<style id="eci-wide-style">`** (design-system §9), copié tel quel du même dossier.
   Voir « Construction » ci-dessous.
6. **100 % du transcript, mot pour mot.** Écrire la page **chapitre par chapitre,
   en une passe chacun** : pas de brouillon complet dans la réflexion puis recopie
   (une page fait souvent plus de cent mille tokens ; la rédiger deux fois double
   le tour sans rien améliorer). Puis **vérifier** avec `check-coverage.py` et
   **corriger jusqu'à 0 manquant**. **Coquilles** : une coquille évidente du
   transcript (`d2 vie` → `de vie`, `ajoter` → `ajouter`) se **corrige dans la page
   sans aucune mention** — ni encadré, ni note, ni parenthèse — et se **consigne
   dans `<equipe>/<dossier>/coquilles.md`** au moment où on la corrige (voir
   « Coquilles » ci-dessous). `check-coverage.py` lit ce fichier et n'y voit plus
   un manquant ; une coquille corrigée mais non consignée reste un manquant.
   **+ Formules en LaTeX (OBLIGATOIRE)** : toute formule prononcée, rappelée ou à
   expliquer est rendue en **KaTeX** (inline `.imath` à l'endroit exact + bloc
   `.formula-block` titré et **expliqué** à sa 1ʳᵉ occurrence). Jamais de formule en
   texte brut. Setup + CSS + script + validation : **`reference/design-system.md` §7**.
   **+ Lecture orale (OBLIGATOIRE)** : chaque `.formula-block` porte une ligne
   `.fb-say` — **comment la formule se dit en français**, plus une glose des symboles
   qui se prononcent mal (`∂` = « d rond », `Tr` = « trace », `ħ` = « h barre »…).
   Du français écrit, jamais de phonétique. Les `.imath` inline n'en reçoivent pas —
   le signaler dans le récapitulatif. Détail : **§7 d bis**.
6 ter. **Formules survolables (OBLIGATOIRE)** — une fois les formules en place, chaque
   symbole doit afficher au survol, au toucher ou au clavier **sa définition, son unité et
   un ordre de grandeur** ; chaque bloc reçoit **« Ce qu'elle dit »** (2 à 4 phrases) et la
   rangée **« Les symboles »** ; chaque lettre des `.imath` reçoit sa fiche, prise dans son
   contexte (bloc → clé → section → dossier). Composant commun `assets/eci-formules.css/.js`
   (jamais recopié), accent par `--fx-rgb`. Déroulé : `formules-symboles.py --init` →
   `symboles.md` rempli par **agents en parallèle** (blocs d'abord, puis `## Texte` sur
   `inline-manquants.tsv`) → passe → **relecture obligatoire de `inline-relecture.tsv`**
   (sens hérités faux → surcharges `section@formule`) → `--check` à 0. Guide complet :
   **`reference/formules-symboles.md`**.
6 bis. **Orthographe et grammaire (Grammalecte)** — sur la page une fois le verbatim
   en place (et, en option, sur le `.txt` dès l'étape 1) : `grammalecte-check.py`
   → agent **`tri-grammalecte`** (vraies fautes / faux positifs → `grammalecte.md`)
   → `grammalecte-apply.py` → `check-coverage.py` de nouveau. Rien ne se corrige
   à la main : la trace est la source de l'édition. Voir « Orthographe & grammaire ».
7. Intégrer les **nuances** des agents en **encadrés « anti-intox »** (sans toucher
   au verbatim). Crédit auteur (bandeau + collective-footer + carte d'index).
8. Créer **`images_a_generer.md`** (gabarit `reference/images-template.md`).
   **Les images sont OBLIGATOIRES** : le **hero** (= vignette d'index) **+ 3 à 5
   illustrations de chapitre** (une par grand thème). **Le faire TÔT** (dès que le
   plan des chapitres et les noms de fichiers sont arrêtés) puis **confier la
   génération à Codex EN PARALLÈLE** — voir « Parallélisation » ci-dessous.
9. **Vérifier la page en navigateur** — **navigateur intégré** de Claude Code
   (`preview_start` sur la config `site-statique` de `.claude/launch.json`, voir
   « Vérification navigateur ») : sections hautes révélées, balayage de largeurs
   360 → 3840 px sans scroll horizontal, JS sans erreur console, ancres nav OK.
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

1. **Vérification factuelle** — plusieurs agents `verif-claims` lancés tôt
   (étape 4), pendant qu'on construit la page. Leur rapport est déjà au format
   de l'audit et des fiches : l'étape 10 (`sources/`) peut elle aussi être
   **déléguée à un sous-agent** pendant que l'agent principal écrit les chapitres —
   fichiers différents, pas de conflit.
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

Quand Codex a fini (notification du job en arrière-plan), **reprendre l'étape 13** :
vérifier visuellement **chaque** image (Read sur le PNG ; sujets sensibles →
contrôler la **dignité** et la fidélité au propos ; **recadrer avant de juger** les
zones à risque — visages, mains, texte incrusté — avec
`sips -c <h> <w> --cropOffset <y> <x> in.png --out /tmp/crop.png` puis Read, une image
entière lue en petit cache les défauts ; **regénérer** une image ratée
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
- **Ajouts éditoriaux** (asides, encadrés, intro, légendes) : phrases courtes, un
  paragraphe par idée, pas de métaphore ni d'effet de style quand une formulation
  littérale existe.
- Convertir les **tableaux** du transcript en `.dtable`, les **citations orales** en
  `.dialogue-block`, les **articles de loi** en `.article-noir`, le **sommaire** en
  `.pillar`, et **toute formule mathématique** (orale ou à rappeler) en **KaTeX** —
  `.imath` inline + `.formula-block` expliqué **et doté de sa ligne « Se lit »**
  (`.fb-say`) — voir `reference/design-system.md` §7 et §7 d bis — puis rendre toutes
  ces formules **survolables** (étape 6 ter, `reference/formules-symboles.md`). Garder la
  classe exacte `class="formula-block"` (le composant marque par l'attribut `data-fsym`).
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
  **acceptable**, à condition d'être **consignées dans `coquilles.md`** (le script
  les applique alors au transcript avant de comparer) — **jamais commentées dans la
  page**.

```
python3 .claude/skills/nouveau-dossier/scripts/check-coverage.py \
    <equipe>/<dossier>/index.html  <transcript1.txt> [<transcript2.txt> ...]
# → boucler jusqu'à "TOTAL manquants : 0"
```

---

## Vérification navigateur (obligatoire)

**Outil : le navigateur intégré de Claude Code** (`mcp__Claude_Browser__*`), testé
en septembre 2026 sur ce Mac : `preview_start` avec `name: "site-statique"` lance un
`python3 -m http.server 8765` depuis la racine (config dans `.claude/launch.json`),
puis `navigate` vers `http://localhost:8765/<equipe>/<dossier>/index.html`. Un
serveur HTTP est indispensable : les pages à bundle module ES et à `fetch()` ne se
chargent pas en `file://`.

Enchaîner **dans un seul `browser_batch`** (pas un appel par largeur) :

1. `resize_window` à **360 / 768 / 1280 / 1920 / 2560 / 3840 px** ; à chaque palier,
   `javascript_tool` :

   ```js
   window.scrollTo(9999,0);
   const cw=document.documentElement.clientWidth;
   const over=[...document.querySelectorAll('body *')].filter(e=>{
     if(e.closest('svg,.dtable-wrap,.formula,.nav')) return false;      // enfants de SVG et conteneurs défilants
     if(getComputedStyle(e).position==='fixed') return false;          // .grain, .atmos, .frame
     const r=e.getBoundingClientRect(); return r.width>0 && r.right>cw+1;
   }).slice(0,8).map(e=>e.tagName+'.'+e.className);
   const p=document.querySelector('.transcript .prose p');
   ({cw, scrollX, scrollWidth:document.documentElement.scrollWidth, over,
     chars: p ? Math.round(p.getBoundingClientRect().width/(parseFloat(getComputedStyle(p).fontSize)*0.5)) : null})
   ```

   Attendu : `scrollX === 0`, `scrollWidth === cw`, `over` vide, `chars` sous ~100 aux
   grands paliers. Sans le filtre, `.grain` (fixe) et les enfants de `<svg>` sortent
   en faux positifs.
2. Révélation des sections hautes : scroller jusqu'aux premiers chapitres et vérifier
   `classList.contains('in')` + `getComputedStyle(s).opacity === '1'`.
3. `read_console_messages` avec `onlyErrors: true` → aucune entrée.
4. (dataviz) cliquer les éléments interactifs, relire la valeur affichée.
5. `computer` **`zoom`** sur une région (hero, un encadré, une formule) plutôt qu'une
   capture pleine page à 3840 px, qui est réduite à l'échelle du panneau et illisible.
   Envoyer les captures utiles à l'utilisateur.
6. Terminer par `resize_window` preset `desktop`.

Repli si le navigateur intégré est indisponible : Chrome en **CDP brut** (voir la
mémoire `browser-verify-cdp`) — jamais `--virtual-time-budget` (les viz React
bouclent en `requestAnimationFrame`), et écrire les captures **en fichier** puis
`Read`, jamais du base64 dans la sortie d'outil.

Détail et pièges connus des largeurs : design-system §9.

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
  l'ajouter à la main. **`coquilles.md` et `grammalecte.md` ne sont pas déclarés non
  plus** : traces internes versionnées, pas des pages du site (`verify-dossier.py` ne
  les réclame pas dans le manifeste).
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

**Une seule commande** couvre tout ce qui se vérifie hors navigateur — la lancer
depuis la racine, et boucler jusqu'à **0 FAIL** :

```bash
python3 .claude/skills/nouveau-dossier/scripts/verify-dossier.py \
    <equipe>/<dossier>/index.html a_traiter/<dossier>/<transcript>.txt [autres .txt]
# options : --no-build (saute prepare-legacy, ~20 s) · --no-katex · --no-verbatim (dossier sans transcription)
```

Elle enchaîne : verbatim (`check-coverage.py`), formules (compte `.fb-say` =
`.formula-block`, accolades, **rendu KaTeX réel**, caractères combinants), formules
survolables (`formules+` : assets liés, chaque bloc `data-fsym` avec symboles, « Ce
qu'elle dit » et rangée, chaque lettre des formules du texte couverte, `#symtab`), structure
de page (licence, compteur, sceau, devise, `eci-wide-style` en dernier `<style>`,
polices interdites, mention obsolète), **liens locaux et ancres** (chaque `src`/`href`
relatif existe, chaque `#id` a sa cible), équilibre des balises, `node --check` sur
les scripts inline, index (carte, **numéro carte ↔ eyebrow**, cartes I → N sans
trou, compteur du hero, « Les Sources » en dernier, somme des `group-count`),
manifeste (fichiers déclarés + **build `prepare-legacy.ts`** + `og:image`), RSS
(bien formé + dossier présent), empreintes de cache, présence dans `sources.html`,
`README.md` et audit `dossier-*.md`.

Un segment verbatim « manquant » qui correspond à une **coquille corrigée** se règle
en **consignant la coquille dans `coquilles.md`** (le script la prend alors en
compte), pas en réintroduisant la faute, et pas en la commentant dans la page. Le
script signale aussi une coquille consignée mais encore présente dans la page, une
entrée périmée, et le mot « coquille » s'il apparaît dans le texte de la page.

Restent à faire **à la main**, parce qu'ils demandent un navigateur ou un œil :

- [ ] `check-coverage.py` → **0 manquant** sur chaque transcript (via `verify-dossier.py`) ;
- [ ] **formules** : toutes en KaTeX (inline + blocs expliqués), rendu réel vérifié
      → **0 failure** (script de validation §7), aucune formule en texte brut ;
- [ ] **lecture orale** : autant de `.fb-say` que de `.formula-block`
      (`grep -c 'class="fb-say"'` = `grep -c 'class="formula-block"'`), en français
      écrit et sans phonétique (§7 d bis) ;
- [ ] **formules survolables** : `formules-symboles.py --check` → 0, section `formules+`
      de `verify-dossier.py` sans FAIL, `inline-relecture.tsv` relu ; en navigateur, survol
      d'un symbole de bloc et d'un symbole du texte à 1280 et 390 px (fiche dans la
      fenêtre, formule non masquée), aucune `.katex-error` ;
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
- [ ] **Grammalecte** : passe faite sur la page, `grammalecte.md` écrit par l'agent,
      corrections appliquées par script, couverture toujours à 0 manquant ;
- [ ] mentionner les fichiers créés/modifiés ; les coquilles sont dans `coquilles.md`
      et les corrections Grammalecte dans `grammalecte.md` (le récapitulatif en donne
      les comptes et les chemins, pas la liste).

---

## Publication (uniquement quand l'utilisateur le demande)

- `verify-dossier.py` à **0 FAIL** juste avant de stager (il vérifie aussi que
  `rss.xml`, le manifeste et les empreintes sont à jour).
- Stager **précisément** les fichiers du dossier (page, **`coquilles.md`**,
  **`grammalecte.md`**, avatars,
  `assets/*.png` optimisés, `index.html`, **`rss.xml`**,
  **`config/legacy-public-manifest.json`**, `sources/*`) — **ne pas** balayer les
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

## Orthographe & grammaire (Grammalecte → `grammalecte.md`)

Grammalecte (correcteur français, moteur **vendu avec la skill** dans `tools/`,
décompressé dans `~/.cache/eci-grammalecte/` au premier usage) relit un transcript ou
une page. Il signale beaucoup — noms romains, latin, oral — donc **un agent trie**, et
la page n'est corrigée **que par script**, depuis la trace. Trois temps, quatre
commandes :

```bash
# 1. analyser (14 s pour une page de 33 000 mots) — .txt ou .html
python3 .claude/skills/nouveau-dossier/scripts/grammalecte-check.py <equipe>/<dossier>/index.html
#    → a_traiter/grammalecte/<dossier>-index/rapport.md + alertes.json (non versionnés)

# 2. trier : agent `tri-grammalecte` (Agent, subagent_type "tri-grammalecte"), en lui
#    donnant : le rapport, la page, le(s) transcript(s), le chemin de
#    <equipe>/<dossier>/grammalecte.md à écrire. Il décide corriger / laisser, et écrit
#    le fichier. Il ne touche pas à la page. (Type absent de la liste des agents ? Il
#    a été créé dans la session : lancer un agent general-purpose avec le corps de
#    .claude/agents/tri-grammalecte.md en tête de prompt.)

# 3. appliquer, puis re-vérifier le verbatim
python3 .claude/skills/nouveau-dossier/scripts/grammalecte-apply.py <equipe>/<dossier>/index.html
python3 .claude/skills/nouveau-dossier/scripts/check-coverage.py <equipe>/<dossier>/index.html <transcripts…>
```

Règles :

- **Ce qui se corrige** : orthographe avérée, accords, conjugaison, participes,
  infinitifs, homophones — **dans le verbatim aussi** (en silence, comme une coquille).
  **Ce qui reste** : langage oral, tournures d'auteur, noms propres, latin, citations.
  En cas de doute, l'agent laisse et le dit (« à confirmer ») : c'est toi qui tranches,
  en ajoutant la ligne à la table si tu confirmes.
- **`grammalecte.md`** (un par dossier, à côté de la page, versionné, non publié) est
  lu par **trois scripts** : `grammalecte-apply.py` (tables « Corrections ») ;
  `check-coverage.py` (table du verbatim, en plus de `coquilles.md`) ; et
  `grammalecte-check.py` lui-même (table « Faux positifs » = liste d'exclusion des
  passes suivantes). Son format est fixé dans l'agent — ne pas improviser.
- **`coquilles.md`** garde les fautes de frappe repérées à la main pendant la
  construction ; **`grammalecte.md`** reçoit ce que la passe Grammalecte a trouvé.
  Les deux s'appliquent au transcript avant la couverture.
- **Liste d'exclusion du projet** : `reference/grammalecte-ignore.txt` (jargon du site,
  noms du collectif). Les noms propres **d'un** dossier vont dans ses « Faux positifs ».
- Sur un **`.txt`** (avant la page) : mêmes étapes, mais rien à appliquer — on écrit
  directement la forme corrigée dans la page, et la table du verbatim de
  `grammalecte.md` fait le lien pour `check-coverage.py`.
- **Relancer** la passe après toute retouche importante de la page : la liste des faux
  positifs consignés rend la seconde passe courte.
- Le texte injecté par JavaScript (ateliers React) n'est pas analysé : si un atelier
  porte beaucoup de texte, passer sa source `.tsx` en `.txt` temporaire.

---

## Coquilles (`<equipe>/<dossier>/coquilles.md`)

Le transcript est une prise orale retranscrite : il contient des fautes de frappe,
des noms propres déformés, des espaces collées. La règle :

- **La page corrige, en silence.** Aucune mention dans la page — pas d'encadré
  « la coquille X a été corrigée », pas de note de marge, pas de « [sic] ». Le lecteur
  lit un texte propre.
- **`coquilles.md` est la seule trace**, un fichier par dossier, à côté de la page,
  versionné dans git (le transcript, lui, reste dans `a_traiter/`), **non déclaré**
  dans le manifeste public.
- **Se consigne au moment de la correction**, pas à la fin (le journal renvoie
  simplement au fichier et à son compte).
- **Périmètre d'une coquille** : faute de frappe, lettre ou chiffre parasite,
  espace manquante ou en trop, nom propre mal transcrit dont la graphie correcte
  est établie (les agents `verif-claims` la signalent dans leur ligne « Graphie »).
  **N'est pas une coquille** : une formulation orale, un mot familier, une
  répétition, une erreur factuelle — ceux-là restent verbatim (l'erreur factuelle
  se traite en encadré anti-intox).
- `check-coverage.py` **lit ce fichier automatiquement** (même dossier que la page),
  ainsi que la table du verbatim de `grammalecte.md`, et applique les corrections au
  transcript avant de comparer : une coquille consignée ne compte plus comme
  manquante ; non consignée, elle le reste.

Gabarit (les deux premières colonnes de contenu sont lues par le script, le reste
est libre) :

```markdown
# Coquilles — <Titre> (Dossier <N>)

Transcript : `a_traiter/<dossier>/<fichier>.txt` · Page : `index.html`
La page corrige sans le dire ; ce fichier est la seule trace. Non publié.

| # | Transcript (verbatim) | Page (corrigé) | Emplacement | Nature |
|---|---|---|---|---|
| 1 | d2 vie ou de mort | de vie ou de mort | chap. 4 · imperium | chiffre parasite |
| 2 | Tarquin le superb | Tarquin le Superbe | chap. 1 · les rois | nom propre |
| 3 | votreADN | votre ADN | chap. 2 | espace manquante |
```

La colonne « Transcript » doit reproduire la chaîne **exactement** telle qu'elle est
dans le `.txt` (c'est ce que le script remplace) ; assez longue pour être unique si
la faute est courte (« d2 vie ou de mort » plutôt que « d2 »).

---

## Journal de travail (`a_traiter/<dossier>/journal.md`)

Un dossier occupe plusieurs heures de session : la **compaction du contexte
arrive forcément**, et un résumé perd ce qui est précis — décisions, verdicts, numérotation retenue, images à refaire. Le journal met ces faits **sur
disque**, à côté du transcript (dossier `a_traiter/`, non publié, ignoré par git).
`images_a_generer.md` joue déjà ce rôle pour les images ; le journal le généralise.

- **Créé à l'étape 1**, avant de lire le transcript ; **mis à jour au fil des
  étapes**, pas à la fin. Après une compaction, **le relire d'abord**.
- Gabarit :

  ```markdown
  # Journal — <Titre> (Dossier <N>)
  ## Décisions
  - Numéro : <N> · équipe : <equipe> · dossier : <equipe>/<dossier>/ · accent : #xxxxxx
  - Parcours d'index : <nom> (group-count <k> → <k+1>)
  - Voie A/B, compagnons, particularités
  ## Coquilles
  - consignées dans <equipe>/<dossier>/coquilles.md (compte : 3)
  ## Verdicts des agents (résumé)
  - ❌ <affirmation> → corrigée en encadré <id>
  - ⚠️ <affirmation> → nuance en encadré <id>
  ## Images
  - hero : <fichier> ✅ · chap.2 : <fichier> à régénérer (texte illisible)
  ## Étapes faites / restantes
  - [x] 1–7 · [ ] 8 images (Codex lancé 14:02) · [ ] 10 sources · …
  ```

- Le **récapitulatif final** se construit **depuis le journal**, pas de mémoire.

---

## Périmètre et points d'arrêt

**Périmètre** — la skill touche : le dossier `<equipe>/<dossier>/` (page, `assets/`,
`coquilles.md`, `grammalecte.md`, `images_a_generer.md`), les avatars de l'équipe, `index.html` (carte + compteurs + nav de pied), `rss.xml`,
`config/legacy-public-manifest.json`, `sources/` (audit, refs, `README.md`,
`sources.html`), et les `?v=` des pages qui référencent une ressource **modifiée**.
Elle ne touche **pas** : les autres dossiers, `AGENT.md`, les scripts du site, la
config de déploiement. Ce qu'on remarque en passant (bug voisin, page à corriger,
dette) se **signale dans le récapitulatif**, il ne se corrige pas dans la foulée —
**une exception, volontaire** : si `prepare-legacy.ts` échoue sur un *autre* dossier,
le corriger (le site ne se déploie pas sinon) et le dire.

**Points d'arrêt** — on ne s'arrête pour demander que dans deux cas :

1. la **publication** (commit / push / déploiement) : jamais sans demande explicite ;
2. une **image jugée indigne** ou infidèle au propos sur un sujet sensible, quand la
   régénération ne suffit pas : proposer, ne pas trancher seul.

Tout le reste s'enchaîne sans question : les 15 étapes, les boucles de correction,
l'attente des images (en arrière-plan), les corrections ❌ des agents, les
mises à jour d'index / RSS / manifeste. Une étape décidée se **fait**, elle ne
s'annonce pas (« je vais maintenant… » puis fin de tour = étape non faite).
Même chose pour : un long bilan qui se termine sur l'étape suivante sans la lancer ;
« je continue sauf avis contraire » ; une liste de décisions pour l'utilisateur alors
qu'aucune ne bloque la suite ; s'arrêter parce qu'un jalon est atteint ou que le tour
a été long. Un point d'étape s'écrit **dans le même message que l'appel d'outil
suivant**.

**Édition ciblée** — `index.html`, `sources.html` et le manifeste font plusieurs
milliers de lignes, la page en fait autant : **modifier chirurgicalement** (Edit,
`sed`, script Python à remplacement), jamais réécrire un fichier entier pour y
ajouter une carte ou une section. Le nombre de tokens d'édition se minimise quand
le résultat est le même.

**Effort** — dépend du modèle. **Fable 5.1** : `high` pour tout le process.
**Opus 5.5** : `medium` suffit pour construire la page (`high` si la qualité baisse) ;
à niveau égal il réfléchit davantage par tour. Dans les deux cas, les agents de
vérification restent à `high` (fixé dans leur frontmatter) et ne descendent jamais à
`low` (recherche sautée), et la construction de la page ne monte pas à `xhigh`/`max`
(brouillon en double).

---

## Récapitulatif final (format fixe)

Le dernier message doit se lire **seul**, par quelqu'un qui n'a pas suivi la
session. Le construire depuis le journal :

1. **Résultat** en une phrase : dossier N, titre, page, état (prêt à publier / en
   attente d'images / bloqué sur X).
2. **Tableau des fichiers** créés ou modifiés (chemin → ce qui a changé).
3. **Contrôles** : sortie de `verify-dossier.py` (PASS/WARN/FAIL) + résultat du
   balayage navigateur (largeurs, révélation, console).
4. **Coquilles et grammaire** : comptes et chemins de `coquilles.md` et de
   `grammalecte.md` (pas les listes, elles sont dans les fichiers), plus les
   corrections « à confirmer » laissées par l'agent de tri ; s'il y en a, formules inline sans « Se lit » (c'est la règle, le
   dire), bilan des formules survolables (blocs complets, formules du texte annotées,
   fiches corrigées à la relecture, chemin de `symboles.md`), dossier sans transcription (`check-coverage.py` non appliqué, le dire).
5. **Vérification factuelle** : compte des verdicts, corrections ❌ appliquées,
   encadrés anti-intox ajoutés.
6. **Reste à faire / hors périmètre** : images non générées, dette repérée ailleurs,
   publication (non faite sans demande).

Prose littérale : dire ce qui a été fait, pas le mettre en scène.

---

## Conventions du dépôt (rappels)

- Dépôt : `TheSamLePirate/empire-contre-intox` — GitHub Pages, branche `main`, racine.
- URL publique principale : `https://empire-contre-intox.com/`.
- Miroir secondaire : `https://thesamlepirate.github.io/empire-contre-intox/`.
- Sceau ECI **unique** : `ymir-lalie/assets/logo-eci.jpg` (référencer au bon chemin
  relatif).
- Outils requis (skill) : `codex` (génération des images, `codex exec`), `python3`
  (Grammalecte est fourni dans `tools/`, sans dépendance),
  `node`, `pngquant`, `oxipng` (les deux derniers : `brew install pngquant oxipng`),
  `gh`, et le **navigateur intégré** de Claude Code pour la vérif (config
  `.claude/launch.json`, serveur `site-statique`).
- Ne jamais committer `.DS_Store`, fichiers verrou office (`.~lock.*#`), ni les
  répertoires de travail non suivis.
