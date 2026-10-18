# Lives TikTok ECI

Bun 1.3.14 et TypeScript ; FFmpeg pour convertir le FLV en HLS sans enregistrement permanent. Le service utilise `tiktok-live-connector` 2.5.0 et le lecteur hls.js 1.7.3. Aucun abonnement, aucune clé payante nécessaire sur le chemin testé localement.

## Fonctionnement

Le calendrier stocke la liste surveillée dans sa base SQLite. La migration ajoute une seule fois `provoxys` et `ghost.navigator.ghost`, actifs et publiés. Le marqueur d’amorce empêche de recréer un compte retiré par un admin. L’onglet **Lives TikTok** de l’administration existante permet ajout, édition, retrait, ordre, surveillance et publication. Seul le rôle admin y a accès ; les protections du calendrier (session, origine, CSRF, changement initial, révocation et versions) s’appliquent.

Le worker lit sa configuration interne toutes les deux secondes avec ETag. Après quinze secondes sans validation, il cesse d’exposer les comptes, coupe les médias et le chat ; un 304 valide la fraîcheur. Le diagnostic admin et le healthcheck séparent disponibilité du processus et fraîcheur de configuration.

Il surveille au maximum trente comptes, avec deux vérifications concurrentes, timeout de trois secondes et retour progressif après erreur. La vérification de chaque compte reprend au bout de soixante secondes après une réponse ; le délai d’apparition dépend donc de la durée des requêtes et de la file (objectif nominal environ 75 secondes, pas une garantie sous charge). Si les détails `room/info` sont indisponibles (notamment pour une ancienne salle), le worker se replie sur les statuts de la page TikTok puis de `api-live/user/room`, sans passer par Euler. Seuls les statuts explicites 2 (en direct, avec identifiant de salle valide) et 4 (hors ligne) sont acceptés. Ce repli peut confirmer un live sans fournir de flux vidéo ; les détails sont retentés à la prochaine vérification. Une erreur réseau ou un statut inconnu n’est jamais traduit en « hors ligne » ; après 150 secondes les anciennes informations live ne sont plus considérées comme confirmées.

L’accueil affiche toutes les diffusions confirmées et publiées. Le lecteur `/lives/?live=UUID` utilise un chat SSE partagé, avec avatars et pseudos, défilement suspendable et mémoire bornée (200 messages, dix minutes). Une reconnexion reprend depuis un curseur ; une reprise trop ancienne, une nouvelle salle ou un redémarrage réinitialisent explicitement le chat. Les messages restent en mémoire, sans archive ni journal de leur contenu.

La vidéo se prépare à l’ouverture du live et tente de démarrer automatiquement avec le son. Si le navigateur refuse la lecture, un grand bouton Play accessible apparaît sur la vidéo ; les commandes natives restent disponibles, sans bouton séparé sous le lecteur. SD2 est prioritaire. Si SD2 manque, le lecteur choisit automatiquement la plus basse qualité compatible disponible. La qualité est choisie automatiquement, sans avertissement ni confirmation. Les rafraîchissements conservent les cartes et leurs images en place ; les valeurs modifiées sont actualisées sans recréer le lecteur ni interrompre la lecture. Il n’y a pas de transcodage vers une fausse « SD2 ». Quatre pipelines vidéo maximum, partagés entre lecteurs ; baux de soixante secondes renouvelés toutes les vingt secondes. Le dernier bail expiré arrête son pipeline. Les dossiers HLS sont isolés par compte/salle/génération ; fenêtre glissante de trente segments et limite de 128 Mo par pipeline. Les segments déjà téléchargés par un navigateur ne peuvent pas être retirés après masquage.

## Annonces Discord

Lorsqu’un compte surveillé **et publié** passe hors ligne → en direct, le worker envoie un embed dans [amis-en-live](https://discord.com/channels/1427507687792443444/1443295072605962300). Un changement de salle annonce également une nouvelle diffusion. L’embed contient le titre, le créateur, son avatar, la couverture, la date de début et les nombres de spectateurs/j’aime disponibles à la détection, ainsi que les liens vers le lecteur ECI et TikTok. Aucune mention collective n’est déclenchée.

Définir `DISCORD_TOKEN` côté serveur. En local, lancer Bun depuis la racine pour charger le `.env` de ce dépôt. En Compose, ce token est transmis uniquement à `lives`. Si le jeton interne est dans un fichier séparé, charger **les deux fichiers** :

```sh
docker compose --env-file .env --env-file .secrets/lives.env config --quiet
docker compose --env-file .env --env-file .secrets/lives.env up -d --build lives
```

Dans Portainer, fournir `DISCORD_TOKEN` dans l’environnement de la stack. Le bot doit pouvoir voir le salon, envoyer des messages et intégrer des liens (`VIEW_CHANNEL`, `SEND_MESSAGES`, `EMBED_LINKS`). Sans token, les annonces sont désactivées et le suivi reste opérationnel.

La première observation de chaque compte sert de référence : un live déjà en cours à cette première activation n’est pas annoncé rétroactivement. Une erreur TikTok ne constitue pas un passage hors ligne. SQLite conserve les salles traitées et les envois en attente dans `LIVES_DATA_DIR/discord.sqlite` (par défaut `lives-service/.data`, volume `lives-data` en Compose), y compris après redémarrage. Conserver ce volume lors des mises à jour. Une même salle n’est annoncée qu’une fois, même après un bref statut hors ligne.

Les requêtes ont un délai maximal de dix secondes ; les échecs réseau/5xx sont réessayés avec temporisation, les limites 429 respectent `retry_after`, et un nonce stable protège les réessais rapprochés contre les doublons côté Discord. Les annonces expirent après dix minutes et ne sont envoyées que si le compte est toujours publié et confirmé en direct. Les erreurs 401/403/404 suspendent les envois jusqu’au redémarrage après correction ; les logs contiennent uniquement le code HTTP. Le token, la base et le `.env` restent hors Git et des images Docker.

Contrat API : [messages et embeds Discord](https://docs.discord.com/developers/resources/message), [limites de débit](https://docs.discord.com/developers/topics/rate-limits).

## Secrets et lancement local

Le serveur accepte :

- `LIVES_INTERNAL_TOKEN` : secret aléatoire d’au moins 32 caractères, identique dans calendar et lives.
- `TIKTOK_SESSION_FILE` : fichier contenant uniquement la session TikTok (recommandé en conteneur), ou `TIKTOK_SESSION_ID`.
- `TIKTOK_ENV_FILE` : lecture locale d’une seule variable, `TIKTOK_SESSION_ID`, depuis le .env autorisé d’awesome-jev ; aucun autre secret de ce projet n’est chargé.
- `TIKTOK_TARGET_IDC` : région facultative de la session si nécessaire ; aucune région n’est imposée en dur.
- `CALENDAR_URL`, `LIVES_ORIGIN`, `LIVES_PUBLIC_ORIGINS` (origines séparées par virgules), `LIVES_MEDIA_DIR`, `PORT` et `LIVES_DEV=1` pour limiter l’écoute à 127.0.0.1.

Ne jamais afficher la session ni l’inclure dans les bundles, images Docker, logs ou réponses JSON. `authenticateWs:false` conserve la session hors du service de signature : les requêtes TikTok utilisent le cookie côté serveur, et la connexion au chat utilise la signature gratuite sans lui transmettre le cookie. Le repli de résolution des salles vers Euler est désactivé. Aucune activation automatique d’authentification WebSocket ou d’offre payante.

```sh
bun install --cwd lives-service --frozen-lockfile
bun run build:lives
bun run check:lives
bun run test:lives
```

Pour un lancement hors Compose, démarrer calendar avec le même jeton et `LIVES_URL` pointant sur lives. Démarrer lives avec `CALENDAR_URL` pointant sur calendar, `LIVES_DEV=1`, l’origine du frontal et le chemin de session. Nginx constitue le frontal commun ; ouvrir uniquement le service lives ne sert pas les fichiers du site.

## Docker / Portainer

La stack ajoute le service interne `lives` sans port hôte. Son cache est un tmpfs de 512 Mo ; la configuration persiste dans le volume existant du calendrier. Sauvegarder ce volume via la commande calendrier habituelle ; les comptes surveillés et leur audit sont inclus dans SQLite. Le cache vidéo est jetable. Les sources serveur, les plans et `.secrets/` sont exclus du site public ; les secrets et données runtime sont également exclus du build Docker.

Préparer les fichiers privés sans afficher de valeurs :

```sh
bun scripts/prepare-lives-secrets.ts /chemin/awesome-jev/.env
```

Cette commande lit uniquement TIKTOK_SESSION_ID, crée `.secrets/` en mode 0700, le fichier de session lisible par le montage Docker et un fichier d’environnement en mode 0600 contenant un jeton interne aléatoire. Elle conserve les fichiers déjà présents. Aucun fichier secret n’est suivi par Git ou copié dans une image. Pour changer une session expirée, remplacer le fichier privé sur l’hôte puis redémarrer uniquement lives.

Le fichier contenant uniquement le cookie doit être lisible par l’utilisateur bun du conteneur via les mécanismes de secrets de l’hôte. Par défaut Compose le monte depuis `.secrets/tiktok_session_id`, et le jeton interne est fourni dans l’environnement. Un fichier local `.secrets/lives.env` peut regrouper le jeton interne et le chemin du secret ; ne jamais le committer. Sur Portainer, définir les mêmes valeurs et fournir le fichier sur l’hôte de déploiement. Les chemins locaux macOS ne sont pas transférés automatiquement au serveur.

```sh
docker compose --env-file .secrets/lives.env config --quiet
docker compose --env-file .secrets/lives.env build calendar lives site
```

Après autorisation de déploiement, mettre à jour la stack avec ces images et vérifier : `/api/lives/health` (`configured:true`), `/api/lives/public`, la rubrique et l’accueil, puis une connexion admin, le masquage et la persistance après recréation. `/api/calendar/internal/` doit répondre 404 à travers Nginx ; aucun port lives/calendar ne doit être exposé publiquement. Vérifier le compteur `/api/count?path=/` et le calendrier existant. Un checkout neuf doit récupérer le dépôt imbriqué `empire-calendrier/` comme auparavant.

Les assets publics compilés et `empire-calendrier/admin/lives-admin.js` sont livrés avec les sources TypeScript dans le dépôt parent (`web/lives/`). Après toute modification client, exécuter `bun run build:lives`. Le Dockerfile reconstruit les bundles pendant son build ; le miroir GitHub Pages publie les bundles suivis par le manifeste. Les changements d’administration et son bundle appartiennent au dépôt calendrier séparé : publier les deux dépôts ensemble.

## Vérifications et limites

Tests Bun : rôles et CSRF, amorce et versions, ETag/fraîcheur, deux comptes et deux sources FFmpeg synthétiques, isolement des fichiers, limites/baux, reprise et déduplication du chat, révocation de publication, erreurs et timeout. Les tests média utilisent FFmpeg ; un environnement sans FFmpeg les déclare explicitement ignorés.

Le parcours réel local du 16 octobre 2026 a confirmé métadonnées, réception du chat et HLS de ghost.navigator.ghost avec la session autorisée. Cette salle ne fournissait que HD1, donc aucune lecture SD2 réelle n’a pu être affirmée ; la sélection SD2 est couverte par les fixtures. La lecture depuis l’IP de production et les navigateurs Safari/iOS restent à vérifier au déploiement. Le connecteur est non officiel : un blocage TikTok ou une session expirée donne une indisponibilité explicite.

Références : [connecteur](https://github.com/zerodytrash/TikTok-Live-Connector), [Bun HTTP](https://bun.com/docs/runtime/http/server), [FFmpeg HLS](https://ffmpeg.org/ffmpeg-formats.html#hls), [hls.js](https://github.com/video-dev/hls.js).
