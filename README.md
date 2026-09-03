# Empire contre Intox — site éducatif statique

Mini-site HTML qui transforme des **déroulés de live** (transcriptions, scripts d'émission) en pages éducatives immersives, rassemblées dans un index commun et publiées en site statique.

🌐 **Site principal :** https://empire-contre-intox.com/
(stack Portainer `empire-contre-intox-site`, Nginx statique — voir « Déploiement ».)

🪞 **Miroir secondaire :** https://thesamlepirate.github.io/empire-contre-intox/
(dépôt `TheSamLePirate/empire-contre-intox`, GitHub Pages servi depuis `main`.)

📡 **Flux RSS :** https://empire-contre-intox.com/rss.xml — généré depuis `index.html`, jamais édité à la main.

## Organisation

Chaque créateur ou équipe a **son propre dossier** à la racine ; `index.html` rassemble une carte par dossier, regroupées en **sept parcours thématiques**. Le **sceau ECI** est partagé : `ymir-lalie/assets/logo-eci.jpg`.

## Dossiers (28)

| Nº | Dossier | Page | Auteur(s) |
|----|---------|------|-----------|
| I | Le Résumé des Ères | `ymir-lalie/resume-eres.html` | Lalie & Ymir |
| II | L'Édiacarien | `ymir-lalie/edicarien.html` | Lalie & Ymir |
| III | Artemis II — l'Odyssée Lunaire | `provoxys/Artemis2.html` | Provoxys, avec la participation de Samlepirate |
| IV | La Grande Horloge de l'Univers | `horloge-univers/chronos.html` | Samlepirate |
| V | Le Tableau Périodique | `jorge-zalex/elements.html` | Jorge & Zalex, d'après le cours de Jorge |
| VI | La Vie de la Terre | `la-vie-de-la-terre/` | Samlepirate |
| VII | Le langage des champs | `samlepirate/champs-vecteurs.html` | Samlepirate, d'après 3Blue1Brown |
| VIII | Adam & Ève génétiques | `ymir-lalie/ancetres-genetiques/` | Lalie & Ymir |
| IX | Comprendre la Politique Française en 2026 | `lalie-ymir-sam/` | Lalie, Ymir & Sam |
| X | Le Singe Aquatique | `ymir-lalie/singe-aquatique/` | Lalie & Ymir |
| XI | L'Esclavage triangulaire | `ymir-lalie/esclavage/` | Lalie & Ymir |
| XII | Tornades, Typhons & Ouragans | `provoxys/tornades/` | Provoxys, avec le soutien de Samlepirate |
| XIII | L'Abeille — Apis mellifera | `phantom/abeilles/` | PhantomBlast, avec Abeillaud |
| XIV | Les Formules de l'Empire | `formules/` | Samlepirate |
| XV | Les Résistants | `ymir-lalie/la-resistance/` | Lalie & Ymir |
| XVI | Briser le Silence | `provoxys/briser-le-silence/` | Provoxys & Lalie |
| XVII | Atmosphères & Mondes Lointains | `provoxys/exoplanetes/` | Provoxys, avec le soutien de Samlepirate (Atlas) |
| XVIII | Les Premières Cités | `ymir-lalie/premieres-cites/` | Lalie & Ymir |
| XIX | L'Odyssée des Machines | `provoxys/sondes/` | Provoxys, Lalie & Samlepirate |
| XX | Les Premiers Empires | `ymir-lalie/premier-empires/` | Lalie & Ymir, avec l'aide précieuse de Phantom |
| XXI | Le Danger des Thérapies de Conversion | `provoxys/therapie-conversion/` | Provoxys |
| XXII | Ordre Divin ou Démocratie ? | `ymir-lalie/egypte-grece/` | Ymir & Lalie |
| XXIII | L'Évolution — Fin des idées reçues | `ymir-lalie/evolution/` | Lalie & Ymir |
| XXIV | Pirates : mythe, droit & diplomatie | `ymir-lalie-phantom/pirates/` | Lalie, Ymir & Phantom |
| XXV | L'Entropie, le temps et l'Univers | `provoxys/entropie/` | Provoxys, avec la participation de Samlepirate |
| XXVI | Alexandre le Grand | `ymir-lalie/alexandre-le-grand/` | Ymir & Lalie |
| XXVII | L'Ordinateur de 1983 | `samlepirate/ordinateur-1983/` | Samlepirate |
| XXVIII | Les Sources | `sources/sources.html` | Empire contre Intox (collectif) |

> La numérotation suit **l'ordre d'affichage** de l'index : si l'on réordonne, on renumérote partout (cartes, nav de pied, eyebrows des pages, `sources/sources.html`). « Les Sources » reste **le dernier numéro**. La carte « Calendrier des lives » est un agenda externe, pas un dossier numéroté.

### Dossiers particuliers

Le **Dossier IV** est multi-pages et piloté par des données (une seule carte d'index pointe vers ses trois vues) :

- `horloge-univers/chronos.html` — dossier complet (frise logarithmique + horloge de la Terre) ;
- `horloge-univers/calendrier.html` — Calendrier Cosmique interactif plein écran ;
- `horloge-univers/clock.html` — horloge temps réel où **00:00:00 = Big Bang** et **23:59:59 = maintenant** (toute l'histoire de l'univers sur 24 h) ;
- `horloge-univers/assets/events.json` — **source canonique** des 46 événements (du Big Bang à aujourd'hui), reflétée à l'identique dans les tableaux inline de `clock.html` et `calendrier.html`, chaque événement ayant une image dans `assets/super-images/`.

Le **Dossier XXVII** est le premier écrit non pas d'après un déroulé, mais d'après un **objet technique** — le *Simulateur Logique Nodal*, un ordinateur 8 bits complet dans une page web. Sa source primaire est donc le **code source** du simulateur, et sa vérification s'est faite **par exécution** plutôt que par recherche web (voir « Vérification & sources »).

Le **Dossier XXVIII — « Les Sources »** est l'appareil critique commun : il vérifie et source **chaque affirmation et donnée** de tous les dossiers.

- `sources/sources.html` — page codex avec **barre de recherche**, fiches (donnée → résumé → verdict → source → image), section **« Références scientifiques »** (articles à comité de lecture, **DOI vérifiés**) et bibliographie ;
- `sources/dossier-*.md` — audit par dossier (affirmation → verdict → source avec URL) ;
- `sources/refs-*.md` / `refs-doi-*.md` — références primaires (DOI vérifiés, **jamais inventés**) ;
- `sources/README.md` — index des fichiers et bilan d'audit.

## Ajouter un nouveau dossier

Le process complet est automatisé par la **skill `/nouveau-dossier`** (`.claude/skills/nouveau-dossier/`), qui déroule les 15 étapes et fournit les outils prêts (contrôle du verbatim, gabarit d'images, optimisation PNG). En résumé :

1. Lire le document **en entier**.
2. Identifier titre, ton, chapitres naturels, passages forts, chute.
3. Créer une page HTML autonome **dans le dossier de son auteur** (en créer un si besoin), CSS + JS intégrés.
4. Conserver la transcription **complète et mot pour mot** — contrôle obligatoire par `.claude/skills/nouveau-dossier/scripts/check-coverage.py` jusqu'à **0 manquant**. (Sans transcription — cf. Dossier XXVII —, cette étape ne s'applique pas : le dire explicitement.)
5. Structure : hero, nav sticky, intro, objectifs pédagogiques, chapitres, encadrés ; **toute formule en LaTeX/KaTeX**, écrite, expliquée *et* accompagnée de sa ligne **« Se lit »** — comment elle se prononce en français (voir « Formules » dans `AGENT.md`).
6. Images **obligatoires** : hero (qui sert de vignette d'index) **+ 3 à 5 illustrations de chapitre**, dans `<dossier-auteur>/assets/`.
7. **Intégration ECI** : retour `../index.html` + footer/bandeau ECI (sceau, devise « Veritas omnia vincit »), cartouche de licence et compteur de visites.
8. **Créditer** l'auteur (dans la page **et** sur la carte d'index).
9. **Vérifier & sourcer** chaque information, affirmation et donnée, puis alimenter le **dossier `sources/`** (audit `.md` + références DOI + fiches dans `sources/sources.html`). **Obligatoire** — voir « Vérification & sources ».
10. Mettre à jour `index.html` : carte dans le bon parcours thématique, `group-count`, numérotation, compteurs du hero et du sec-head, nav de pied.
11. **Déclarer tous les fichiers dans `config/legacy-public-manifest.json`** — sans quoi ils ne sont pas publiés, et le build Astro échoue si l'image de la carte d'index manque. Vérifier avec `npx tsx scripts/prepare-legacy.ts`.
12. **Régénérer le flux RSS** : `python3 scripts/generate-rss.py` (relit `index.html` → réécrit `rss.xml`).
13. Reprendre tel quel le bloc `<style id="eci-wide-style">` d'un dossier récent, **juste avant `</head>`** : c'est lui qui élargit la page et grossit le texte par paliers, du mobile au 4K.
14. Vérifier en local **de 360 px à 3840 px** : images chargées, liens corrects, pas de scroll horizontal, rien de coupé, aucune erreur console.

> ℹ️ Les instructions détaillées (charte visuelle « codex impérial », règles de contenu, exactitude scientifique, vérification & sources, licence, déploiement) sont dans **`AGENT.md`** (`CLAUDE.md` est un lien symbolique vers `AGENT.md`).

## Vérification & sources (obligatoire)

**Chaque dossier** doit refaire le même travail de vérification, centralisé dans le **Dossier XXVIII `sources/`** :

1. **Vérifier** chaque information, affirmation et donnée par **recherche web** (plusieurs agents en parallèle), avec des sources autoritatives (NASA, ESA, USGS, IUGS/ICS, Smithsonian, articles à comité de lecture). Verdict par claim : ✅ confirmé · ⚠️ à nuancer · 🔶 débattu · ❌ erroné — **corriger / nuancer la page** en conséquence, sans jamais toucher au texte transcrit (les nuances vont dans des encadrés « anti-intox »).
2. **Documenter** dans `sources/` : un audit `dossier-<n>.md` (affirmation → verdict → source) et un `refs-<n>.md` / `refs-doi-<n>.md` (littérature primaire, **DOI vérifiés**). **Ne jamais inventer de DOI** : vérifier chacun (doi.org / Crossref) ou écrire « DOI non trouvé ».
3. **Surfacer** dans `sources/sources.html` : une fiche (donnée → résumé → verdict → source → image) + une référence scientifique (titre, DOI, abstract) ; la page possède une **barre de recherche** (attribut `data-search`). Mettre à jour `sources/README.md` et les compteurs.

Quand un dossier est écrit d'après un **objet** plutôt qu'un déroulé, la source primaire est cet objet — son code, ses données — et non sa documentation : si les deux se contredisent, **le code fait foi**, et l'écart se signale. La vérification se fait alors autant que possible **par exécution**.

## Licence de contenu

Sauf mention contraire, textes, transcriptions, images et médias sont publiés sous **CC BY-NC-ND 4.0** : partage autorisé avec attribution, sans usage commercial ni modification. Voir `LICENCE-CONTENU.md`. Chaque page porte les métadonnées de licence et un cartouche `.eci-license` en pied de page. Les contenus tiers (vidéos, articles, polices) sont crédités séparément et ne relèvent pas de cette licence.

## Lancer en local

Depuis la racine :

```bash
python3 -m http.server 8080
```

Puis ouvrir http://127.0.0.1:8080/index.html

L'aperçu partagé de l'accueil (`assets/og-index.jpg`) est un **rendu du hero**, pas une
image du dépôt : le régénérer avec `node scripts/generate-og-hero.mjs` dès que ce hero change.

## Déploiement

- **GitHub Pages** (miroir) : automatique au `push` sur `main`. Vérifier avec
  `gh api repos/TheSamLePirate/empire-contre-intox/pages/builds/latest --jq .status` → `built`.
- **Portainer** (domaine principal) : image Nginx statique, stack `empire-contre-intox-site`, port `3004` → `80`.

  ```bash
  scripts/deploy-portainer.sh --check   # préflight : RSS, XML, docker compose
  scripts/deploy-portainer.sh           # régénère le RSS, déploie, vérifie les URLs
  ```

Le site expose aussi un **compteur public de visites par page** (service Bun + SQLite dans `counter/`, proxifié par Nginx sur `/api/`) : nombre total de visites, sans IP, sans cookie, sans identifiant.

## Checklist qualité

- texte source lu en entier ; transcription complète et **vérifiée mot pour mot** (pas un copier-coller brut) ;
- design conforme à l'identité Empire contre Intox ; sceau ECI présent ;
- **formules rendues en KaTeX**, expliquées, et chacune dotée de sa ligne **« Se lit »** (autant de `.fb-say` que de `.formula-block`) ; aucune formule en texte brut ;
- images générées et intégrées ; index à jour ; liens internes OK ;
- **testé de 360 px à 3840 px** : pas de débordement horizontal, rien de coupé, bloc `<style id="eci-wide-style">` présent (voir « Largeurs d'écran » dans `AGENT.md`) ;
- objectifs pédagogiques présents ;
- **contenu scientifique défendable** : datations standard, fourchettes plutôt qu'affirmations absolues ;
- **toutes les affirmations / données sourcées** dans `sources/` (audit + DOI vérifiés) et visibles dans `sources/sources.html` ;
- **`config/legacy-public-manifest.json` complété** et `scripts/prepare-legacy.ts` qui passe ;
- **`rss.xml` régénéré**, bien formé, contenant le nouveau dossier ;
- licence visible sur chaque page touchée.
