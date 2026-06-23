# Atelier — Préparer les dossiers

Espace de travail **interne** pour construire les dossiers à plusieurs **avant**
publication. Servi par GitHub Pages mais **non lié aux menus** du site et marqué
`noindex`.

> ⚠️ **Pas de secret ici.** GitHub Pages n'a pas d'authentification : toute personne
> qui connaît l'URL peut lire ces pages. C'est un espace « non listé », pas privé.
> Ne pas diffuser le lien, ne pas y déposer de métadonnées sensibles.

## URL (une fois publié)

- Hub : `https://thesamlepirate.github.io/empire-contre-intox/atelier/`
- Projet Sondes : `https://thesamlepirate.github.io/empire-contre-intox/atelier/sondes/`

## Architecture

```
atelier/
├─ index.html        ← hub : liste les dossiers en préparation (lit projects.json)
├─ projects.json     ← un objet par dossier-en-prépa
├─ README.md         ← ce fichier
└─ <slug>/           ← un dossier-en-prépa (ex. sondes/)
   ├─ index.html     ← visionneuse réutilisable (lit manifest.json)
   ├─ manifest.json  ← documents + outils du projet
   ├─ plan.md        ← plan structuré
   ├─ *.html         ← outils interactifs (ex. apercu-modeles-3d.html)
   └─ sources/       ← transcripts & recherche bruts (.txt/.md)
```

La visionneuse charge les fichiers **en direct** (`fetch`) : éditer un `.md`, recharger,
c'est à jour. (Le double-clic `file://` bloque le fetch → ouvrir via Pages, ou lancer
`python3 -m http.server` à la racine du dépôt puis `http://localhost:8000/atelier/`.)

## Ajouter un nouveau dossier

1. `mkdir atelier/<slug>` ; copier `sondes/index.html` dedans (visionneuse générique).
2. Déposer les documents (`plan.md`, `sources/*.txt`, outils HTML…).
3. Écrire `atelier/<slug>/manifest.json` : `title`, `subtitle`, `intro`, `tools[]`,
   `groups[] → docs[]` (chaque doc : `title`, `file`, `badge`, `desc`).
4. Ajouter une entrée dans `atelier/projects.json` pour l'afficher sur le hub.

## Projets

| Slug | Dossier | Auteur | Statut |
|------|---------|--------|--------|
| `sondes` | Sondes, satellites & télescopes (Dossier VI proposé) | Provoxys | en préparation |
