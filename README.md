# Empire contre Intox — site éducatif statique

Mini-site HTML qui transforme des **déroulés de live** (transcriptions, scripts d'émission) en pages éducatives immersives, rassemblées dans un index commun et publiées en site statique.

🌐 **En ligne :** https://thesamlepirate.github.io/empire-contre-intox/
(dépôt `TheSamLePirate/empire-contre-intox`, GitHub Pages servi depuis `main` / racine.)

## Organisation

Chaque créateur ou équipe a **son propre dossier** à la racine ; `index.html` rassemble une carte par dossier. Le **sceau ECI** est partagé : `ymir-lalie/assets/logo-eci.jpg`.

## Dossiers (5)

| Nº | Dossier | Page | Auteur(s) |
|----|---------|------|-----------|
| I | Résumé des Ères | `ymir-lalie/resume-eres.html` | Lalie & Ymir |
| II | L'Édiacarien | `ymir-lalie/edicarien.html` | Lalie & Ymir |
| III | Artemis II | `provoxys/Artemis2.html` | Provoxys (avec Samlepirate) |
| IV | L'Horloge de l'Univers | `horloge-univers/chronos.html` | Samlepirate |
| V | Les Sources | `sources/sources.html` | Empire contre Intox (collectif) |

Le **Dossier IV** est multi-pages et piloté par des données (une seule carte d'index pointe vers ses trois vues) :

- `horloge-univers/chronos.html` — dossier complet (frise logarithmique + horloge de la Terre) ;
- `horloge-univers/calendrier.html` — Calendrier Cosmique interactif plein écran ;
- `horloge-univers/clock.html` — horloge temps réel où **00:00:00 = Big Bang** et **23:59:59 = maintenant** (toute l'histoire de l'univers sur 24 h) ;
- `horloge-univers/assets/events.json` — **source canonique** des 46 événements (du Big Bang à aujourd'hui), reflétée à l'identique dans les tableaux inline de `clock.html` et `calendrier.html`, chaque événement ayant une image dans `assets/super-images/`.

Le **Dossier V — « Les Sources »** est l'appareil critique commun : il vérifie et source **chaque affirmation et donnée** de tous les dossiers.

- `sources/sources.html` — page codex avec **barre de recherche**, fiches (donnée → résumé → verdict → source → image), section **« Références scientifiques »** (≈ 66 articles à comité de lecture, **DOI vérifiés**) et bibliographie ;
- `sources/dossier-*.md` — audit par dossier (affirmation → verdict → source avec URL) ;
- `sources/refs-doi-*.md` — références primaires (DOI vérifiés, **jamais inventés**) ;
- `sources/README.md` — index des fichiers et bilan d'audit.

## Ajouter un nouveau document

Pour transformer un nouveau `.txt`/script en page :

1. Lire le document **en entier**.
2. Identifier titre, ton, chapitres naturels, passages forts, chute.
3. Créer une page HTML autonome **dans le dossier de son auteur** (en créer un si besoin), CSS + JS intégrés.
4. Conserver la transcription **complète et mot pour mot**.
5. Structure : hero, nav sticky, intro, objectifs pédagogiques, chapitres, encadrés.
6. Image hero dans `<dossier-auteur>/assets/`.
7. **Intégration ECI** : retour `../index.html` + footer/bandeau ECI (sceau, devise « Veritas omnia vincit »).
8. **Créditer** l'auteur (dans la page **et** sur la carte d'index).
9. **Vérifier & sourcer** chaque information, affirmation et donnée (recherche web, plusieurs agents), puis alimenter le **dossier `sources/`** (audit `.md` + références DOI + fiches dans `sources/sources.html`). **Obligatoire** — voir « Vérification & sources ».
10. Mettre à jour `index.html` (carte + numérotation + compteur de dossiers).
11. Vérifier en local : images chargées, liens corrects, pas de scroll horizontal.

> ℹ️ Les instructions détaillées (charte visuelle « codex impérial », règles de contenu, exactitude scientifique, vérification & sources, publication) sont dans **`AGENT.md`** (`CLAUDE.md` est un lien symbolique vers `AGENT.md`).

## Vérification & sources (obligatoire)

**Chaque dossier** doit refaire le même travail de vérification, centralisé dans le **Dossier V `sources/`** :

1. **Vérifier** chaque information, affirmation et donnée par **recherche web** (plusieurs agents en parallèle), avec des sources autoritatives (NASA, ESA, USGS, IUGS/ICS, Smithsonian, articles à comité de lecture). Verdict par claim : ✅ confirmé · ⚠️ à nuancer · 🔶 débattu · ❌ erroné — **corriger / nuancer la page** en conséquence.
2. **Documenter** dans `sources/` : un audit `dossier-<n>.md` (affirmation → verdict → source) et un `refs-doi-<n>.md` (littérature primaire, **DOI vérifiés**). **Ne jamais inventer de DOI** : vérifier chacun (doi.org / Crossref) ou écrire « DOI non trouvé ».
3. **Surfacer** dans `sources/sources.html` : une fiche (donnée → résumé → verdict → source → image) + une référence scientifique (titre, DOI, abstract) ; la page possède une **barre de recherche** (attribut `data-search`). Mettre à jour `sources/README.md` et les compteurs.

## Lancer en local

Depuis la racine :

```bash
python3 -m http.server 8080
```

Puis ouvrir http://127.0.0.1:8080/index.html

## Checklist qualité

- texte source lu en entier ; transcription complète (pas un copier-coller brut) ;
- design conforme à l'identité Empire contre Intox ; sceau ECI présent ;
- images chargées ; index à jour ; liens internes OK ; pas de débordement horizontal ;
- objectifs pédagogiques présents ;
- **contenu scientifique défendable** : datations standard, fourchettes plutôt qu'affirmations absolues ;
- **toutes les affirmations / données sourcées** dans `sources/` (audit + DOI vérifiés) et visibles dans `sources/sources.html`.
