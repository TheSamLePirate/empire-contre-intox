# Simulateur Logique Nodal — build embarqué

Copie du **build de production** du *Simulateur Logique Nodal* de **Samlepirate**,
hébergée avec le Dossier XXVII (« L'Ordinateur de 1983 »). Le dossier ne pointe plus
vers `computer-1983.puter.site` : le compagnon interactif est servi par le site
lui-même, à `samlepirate/ordinateur-1983/simulateur/`.

## Ce que contient ce dossier

| Fichier | Rôle |
|---|---|
| `index.html` | page d'entrée, **modifiée après le build** (voir plus bas) |
| `assets/index-*.js` | bundle applicatif (React + React Flow + le processeur 8 bits) |
| `assets/index-*.css` | feuille de styles compilée (Tailwind) |

Aucune dépendance externe : ni CDN, ni police distante, ni service tiers. Les seules
requêtes réseau que l'application peut émettre sont celles que **vous** déclenchez
depuis la machine simulée, par ses instructions `HTTPGET` / `HTTPPOST` (les programmes
d'exemple appellent `open-meteo` et `jsonplaceholder`).

## Régénérer le build

Depuis le dépôt source du simulateur :

```bash
npx vite build --base=./          # ← le --base est indispensable :
                                  #    sans lui, Vite écrit /assets/… (racine du domaine)
                                  #    et rien ne se charge depuis un sous-dossier
```

puis recopier le contenu de `dist/` ici :

```bash
rm -rf samlepirate/ordinateur-1983/simulateur/assets
cp -R <repo-simulateur>/dist/. samlepirate/ordinateur-1983/simulateur/
```

**Trois retouches à réappliquer sur `index.html` après chaque rebuild** (elles ne sont
pas produites par Vite) :

1. `lang="fr"`, `<title>` et `<meta name="description">` aux couleurs du dossier ;
2. `<meta name="rights">` + `<link rel="icon">` vers le sceau ECI ;
3. le bloc `<style>.eci-back{…}</style>` et le lien `<a class="eci-back">` en fin de
   `<body>` — le retour discret vers le dossier, en bas au centre de l'écran ;
4. retirer les attributs `crossorigin` des balises `<script>` et `<link>` générées :
   ils ne servent à rien en même origine et ajoutent un mode d'échec inutile.

Penser aussi à **déclarer les nouveaux noms de fichiers** dans
`config/legacy-public-manifest.json` : le hash du bundle change à chaque build, et un
fichier absent de l'allowlist n'est **pas publié**.

## Une limite à connaître

Le build est un **module ES**. Les navigateurs refusent de charger un module depuis
`file://` (origine `null`), donc ouvrir `simulateur/index.html` par double-clic affiche
une page blanche. Ce n'est pas un bug de la copie : il faut un serveur HTTP.

- En local : `python3 -m http.server 8899` à la racine du dépôt, puis
  <http://127.0.0.1:8899/samlepirate/ordinateur-1983/simulateur/>.
- En production, les deux canaux du site servent en HTTP — Nginx/Portainer sur
  `empire-contre-intox.com` et GitHub Pages sur le miroir : le simulateur y fonctionne
  normalement.

Le reste du dossier (`../index.html`, ses quinze expériences, son processeur 8 bits)
reste, lui, entièrement autonome en `file://`.

## Droits

Le simulateur est un **logiciel écrit par Samlepirate**. La licence de contenu du site
(CC BY-NC-ND 4.0) couvre les contenus éditoriaux — textes, transcriptions, images — et
**pas le code** : voir `LICENCE-CONTENU.md` à la racine du dépôt.
