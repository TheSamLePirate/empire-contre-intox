# Calendrier collaboratif ECI

L’interface reste en HTML/CSS/JS autonome dans `empire-calendrier/admin/`.
Le service Bun conserve les comptes, sessions, animateurs, événements et historique dans SQLite ; les portraits importés sont des fichiers WebP immuables dans le même volume.

**Tous les utilisateurs connectés peuvent créer, modifier, supprimer et restaurer tous les événements, ainsi que gérer les animateurs et choisir/importer leurs portraits.** Les comptes acceptent une adresse email ou un identifiant court, avec un nom affiché distinct (par exemple SamLePirate). Seuls les administrateurs gèrent les comptes. Aucun compte n’est créé automatiquement, aucune inscription publique ni aucun mot de passe par défaut.

## Installer et démarrer en local

Prérequis : Bun 1.3.14 ou version compatible, Node pour les contrôles du dépôt.
Depuis la racine :

```sh
bun install --cwd calendar-service --frozen-lockfile
mkdir -p calendar-service/.data
```

Créer le premier compte depuis un terminal, avec saisie masquée (zsh sur macOS) :

```sh
read -rs 'eci_calendar_password?Mot de passe initial (12 caractères minimum) : '
printf '\n'
printf '%s' "$eci_calendar_password" | CALENDAR_DATA_DIR="$PWD/calendar-service/.data" bun calendar-service/manage.ts create-user sam admin --password-stdin
unset eci_calendar_password
```

Puis démarrer :

```sh
CALENDAR_DATA_DIR="$PWD/calendar-service/.data" \
CALENDAR_ORIGIN=http://127.0.0.1:8878 CALENDAR_DEV=1 PORT=8878 \
bun calendar-service/server.ts
```

Ouvrir <http://127.0.0.1:8878/empire-calendrier/admin/>. Utiliser exactement cette origine, pas `localhost` si `CALENDAR_ORIGIN` indique `127.0.0.1`.
Le serveur de développement écoute uniquement en boucle locale. Les cookies `Secure` sont obligatoires hors localhost, et le service refuse une origine de production en HTTP.

Les tests créent des comptes et des bases temporaires indépendants, supprimés à la fin. Ne pas utiliser leurs identifiants pour la production.

```sh
npm run check:calendar
npm run test:calendar
```

## Portainer et premier administrateur

La stack contient `site`, `counter` et `calendar`. L’API calendrier n’a pas de port hôte : Nginx proxifie `/api/calendar/` vers le service interne.

`CALENDAR_ORIGIN` vaut par défaut `https://empire-contre-intox.com`. Pour changer de domaine, renseigner cette variable dans l’environnement de la stack. Elle fixe l’origine exacte des écritures, les URL des portraits et la configuration des cookies. Le frontal redirige l’administration du miroir et du domaine `www` vers le domaine principal.

Après le déploiement autorisé, créer le premier administrateur depuis le répertoire Compose sur le serveur, ou exécuter l’équivalent dans la console Portainer du conteneur `calendar` :

```sh
read -rs 'eci_calendar_password?Mot de passe initial (12 caractères minimum) : '
printf '\n'
printf '%s' "$eci_calendar_password" | docker compose exec -T calendar bun manage.ts create-user sam admin --password-stdin
unset eci_calendar_password
```

La première création par CLI accepte `--display-name "SamLePirate"` et `--require-password-change` pour imposer le renouvellement d’un mot de passe provisoire. Sans ce dernier argument, le mot de passe personnel choisi reste utilisable. Les comptes créés dans l’interface doivent changer leur mot de passe initial avant d’accéder au contenu. Le changement, la réinitialisation, la désactivation et la modification du rôle révoquent les sessions. Le dernier administrateur actif ne peut pas être désactivé ou rétrogradé.

Pour réinitialiser un compte oublié, même commande avec `reset-password IDENTIFIANT --password-stdin` à la place de `create-user sam admin --password-stdin`. Transmettre le mot de passe provisoire au membre par le canal habituel ; le service n’envoie aucun email.

## Source des données et publications

- À la **première ouverture d’une base**, les événements, mois, animateurs et portraits de `empire-calendrier/data/events.json` sont importés dans une transaction. Le marqueur `metadata.seeded` empêche tout nouvel import, même quand les événements sont supprimés.
- En production, **SQLite est la source de vérité**. Modifier le JSON embarqué ne modifie pas une base déjà initialisée. Un redéploiement conserve le volume `calendar-data` ; ne jamais utiliser `docker compose down -v` pour une mise à jour.
- Le calendrier principal et le miroir lisent `/api/calendar/public` sur le domaine principal. Le JSON public utilise le format historique (branding, `hosts`, `months`) et des URL d’images absolues. Il ne contient ni comptes, ni sessions, ni historique.
- La route historique `/empire-calendrier/data/events.json` est aussi proxifiée vers les données courantes sur Nginx.
- Sur le miroir GitHub Pages, la lecture est en CORS public sans cookies ; l’administration redirige vers le domaine principal. Une panne d’API affiche une indisponibilité explicite, jamais l’ancien programme. Un simple serveur HTTP **local** peut encore utiliser le JSON d’amorce si la route API renvoie 404.
- `empire-calendrier/` est un **dépôt Git indépendant**, ignoré par le dépôt parent. Ses changements (`index.html`, `admin/`, documentation) doivent être publiés dans ce dépôt séparément ; l’image Portainer les copie depuis le contexte local. Un checkout neuf du parent doit récupérer ce dépôt à l’emplacement attendu avant le build Docker.
- `og-image.png` reste un aperçu statique régénéré par le hook du dépôt calendrier avant un commit de fichiers visuels. Une édition en ligne ne régénère pas automatiquement cette image sociale ; le programme affiché dans la page reste à jour.

## Événements, animateurs et images

UUID stables et versions sur événements/animateurs. Une édition concurrente renvoie `409` et conserve la saisie de l’utilisateur dans le formulaire ; fermer puis rouvrir pour récupérer la version récente. Dates civiles du programme en heure de Paris et horaires libres conservés (`22H00`, `21H00-22H00`). Plusieurs animateurs et portraits possibles (maximum huit par sélection).

Les animateurs ont un nom unique après normalisation des accents et séparateurs. On peut les créer au milieu d’un événement sans perdre la saisie, puis choisir leur avatar dans la bibliothèque ou en importer un. Un animateur ne crée pas de compte et ne porte aucune permission.

Les événements supprimés restent dans la corbeille. Leur historique conserve les 100 dernières versions consultables, avec auteur et date ; restaurer crée une nouvelle version. Les animateurs et portraits sont référencés par identifiant : restaurer un événement utilise les noms et portraits **actuels** des animateurs. Pour préserver les restaurations, supprimer un animateur référencé par un événement ou son historique est refusé.

Les portraits importés acceptent JPEG/PNG/WebP, 5 Mo maximum, 16 millions de pixels, aucune animation. Le serveur contrôle les signatures, décode l’image, l’oriente, la redimensionne et réencode un carré WebP 512 × 512 sans les métadonnées d’origine. L’interface permet zoom et cadrage horizontal/vertical avant import. Les fichiers identiques réencodés sont dédupliqués. Les images existantes sont réutilisables par tous les membres.

Les images sont immuables, sans suppression depuis l’interface : remplacer un portrait signifie en importer un autre puis l’associer. Limites : 100 imports uniques par compte et 2 000 portraits au total ; 1 000 animateurs, 20 000 événements et 500 comptes. Ces limites sont explicites et ne suppriment aucun contenu automatiquement.

## Sauvegarder et restaurer

Sauvegarder **la base et le dossier `avatars/` ensemble**. Ne pas copier seulement le fichier SQLite à chaud : la base utilise WAL.

Depuis la console du conteneur, vers un dossier **nouveau, hors `/data`** :

```sh
bun manage.ts backup /tmp/sauvegarde-calendrier
```

La commande utilise `VACUUM INTO` pour une copie cohérente, puis copie les portraits. Ils sont immuables et jamais supprimés, ce qui conserve la cohérence avec l’instantané de base. Copier immédiatement ce dossier vers un stockage durable externe au conteneur (ex. `docker compose cp calendar:/tmp/sauvegarde-calendrier ./sauvegarde-calendrier`). L’export contient des données de comptes et doit rester privé.

Restauration : arrêter `calendar`, sauvegarder préalablement l’état courant, restaurer le fichier `calendar.sqlite` et le dossier `avatars/` dans le volume, retirer les anciens fichiers `calendar.sqlite-wal` / `calendar.sqlite-shm` **service arrêté**, rétablir le propriétaire du volume (`bun`), puis exécuter `bun manage.ts revoke-sessions` sur cette base et redémarrer le service. Vérifier une connexion, le JSON public et un portrait importé. Le snapshot ne contient pas les fichiers des portraits d’amorce : ceux-ci restent livrés par le dépôt calendrier dans l’image du site.

## Contrôles de déploiement

```sh
docker compose config --quiet
docker compose build calendar site
docker compose up -d
```

Vérifier le healthcheck `calendar`, `/api/calendar/health`, `/api/calendar/public`, `/empire-calendrier/admin/` et `/api/count?path=/` (compteur inchangé). Tester aussi un refus d’écriture anonyme, une connexion, une création d’événement et un import. Recréer le conteneur `calendar` et vérifier que ce contenu existe toujours : cela valide le montage du volume. Les tests de réouverture SQLite seuls ne prouvent pas le montage Docker.

## Références techniques

[Bun SQLite](https://bun.com/docs/runtime/sqlite), [mots de passe Bun](https://bun.com/docs/runtime/hashing), [Sharp](https://sharp.pixelplumbing.com/api-constructor/), [sessions OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [imports OWASP](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).

## Gestion des lives TikTok

L’onglet « Lives TikTok » est réservé aux administrateurs et conserve sa configuration et son audit dans cette même base. Les routes `/api/calendar/live-watch` réutilisent les sessions et CSRF du calendrier. `/api/calendar/internal/live-watch` est réservé au worker via `LIVES_INTERNAL_TOKEN`, avec ETag ; Nginx bloque son accès public. Voir [le service lives](../lives-service/README.md) pour le lancement de la stack et les secrets supplémentaires.
