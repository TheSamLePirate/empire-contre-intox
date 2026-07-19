# Suivi quotidien des visites

Le script [`visit-counts.py`](visit-counts.py) consulte le compteur public d’Empire contre Intox et conserve un historique quotidien **uniquement sur l’ordinateur local**.

## Principe

Le service distant `/api/count` conserve seulement un total cumulé par page. Il ne connaît pas la répartition par jour.

Le suivi quotidien fonctionne donc par photographies successives :

1. le script interroge le total cumulé de l’accueil et de chaque dossier ;
2. il enregistre une photographie locale datée ;
3. le lendemain, il enregistre une nouvelle photographie ;
4. les visites de la période sont calculées par différence entre les deux photographies.

Exemple :

| Date du relevé | Total cumulé | Différence |
|---|---:|---:|
| 19 juillet | 1 000 | photographie initiale |
| 20 juillet | 1 125 | 125 visites |
| 21 juillet | 1 210 | 85 visites |

Il faut donc au moins **deux relevés** avant de pouvoir afficher une première comparaison quotidienne.

## Emplacement de l’historique

Par défaut, les photographies sont enregistrées dans :

```text
~/.local/share/empire-contre-intox/visit-counts-history.csv
```

Ce fichier se trouve en dehors du dépôt Git. Il reste local à la machine et n’est ni publié sur le site ni envoyé vers GitHub.

Il contient une ligne par page et par photographie :

- date du relevé ;
- heure exacte du relevé ;
- mode du compteur ;
- numéro et titre du dossier ;
- chemin canonique de la page ;
- total cumulé au moment du relevé.

Pour utiliser un autre emplacement :

```bash
python3 scripts/visit-counts.py --record \
  --history-file /chemin/vers/mon-historique.csv
```

La variable d’environnement `ECI_VISIT_HISTORY` peut également définir cet emplacement.

## Relevé manuel

Créer ou actualiser la photographie du jour :

```bash
python3 scripts/visit-counts.py --record
```

Si le script est exécuté plusieurs fois le même jour, le dernier relevé **remplace** celui de la journée. Il ne crée pas de doublon.

Le relevé est annulé si une ou plusieurs pages ne peuvent pas être interrogées, afin d’éviter d’enregistrer de faux compteurs à zéro.

## Automatisation actuelle avec cron

Le crontab local contient actuellement cette tâche :

```cron
# BEGIN empire-contre-intox visit counts
55 23 * * * /usr/bin/python3 /Users/olivierveinand/Documents/DEV/empire-contre-intox/scripts/visit-counts.py --record --quiet >> /tmp/eci-visit-counts.log 2>&1
# END empire-contre-intox visit counts
```

Elle s’exécute tous les jours à **23 h 55**, heure locale.

- `--record` enregistre la photographie du jour ;
- `--quiet` masque la sortie lorsqu’elle réussit ;
- les erreurs éventuelles sont écrites dans `/tmp/eci-visit-counts.log`.

Afficher les tâches cron installées :

```bash
crontab -l
```

Consulter le journal :

```bash
less /tmp/eci-visit-counts.log
```

> Sur macOS, cron ne rattrape généralement pas une exécution manquée lorsque l’ordinateur est éteint ou en veille. Le prochain relevé créera alors une période de plusieurs jours, clairement signalée dans le tableau.

## Afficher les visites quotidiennes

Afficher les 30 dernières périodes :

```bash
python3 scripts/visit-counts.py --daily
```

Exemple de sortie :

```text
Date        Période                  Visites  Note
2026-07-20  2026-07-19 → 2026-07-20  125      relevé quotidien
```

La date affichée est la **date de fin de la période**. Avec une exécution quotidienne à heure fixe, elle correspond aux visites enregistrées depuis le relevé de la veille.

Afficher les sept dernières périodes :

```bash
python3 scripts/visit-counts.py --daily --days 7
```

Afficher tout l’historique :

```bash
python3 scripts/visit-counts.py --daily --days 0
```

## Détail par dossier

Afficher les visites quotidiennes pour chaque page :

```bash
python3 scripts/visit-counts.py --daily --details
```

Les pages sont triées par nombre de visites décroissant à l’intérieur de chaque période.

## Exports

### CSV agrégé par jour

```bash
python3 scripts/visit-counts.py --daily --csv > visites-par-jour.csv
```

### CSV détaillé par dossier

```bash
python3 scripts/visit-counts.py --daily --details --csv > visites-par-dossier.csv
```

### JSON

```bash
python3 scripts/visit-counts.py --daily --json > visites-par-jour.json
```

Le JSON contient aussi le détail des pages pour chaque période.

## Afficher les compteurs cumulés actuels

Sans option d’historisation, le comportement historique du script reste disponible :

```bash
python3 scripts/visit-counts.py
```

Options utiles :

```bash
python3 scripts/visit-counts.py --sort count
python3 scripts/visit-counts.py --no-index
python3 scripts/visit-counts.py --include-agenda
python3 scripts/visit-counts.py --json
python3 scripts/visit-counts.py --csv
```

Le mode `primary`, utilisé par défaut, contient déjà les visites agrégées du domaine principal et du miroir GitHub Pages grâce à la normalisation des chemins par le serveur.

## Cas particuliers signalés

Le tableau quotidien peut afficher plusieurs notes :

- **plusieurs jours entre relevés** : une ou plusieurs exécutions ont été manquées ; le résultat couvre toute la période et non une seule journée ;
- **nouvelle page** : la page n’existait pas dans la photographie précédente ; son compteur cumulé est compté dans la période, qui peut donc être surestimée ;
- **compteur réinitialisé** : le total actuel est inférieur au précédent, par exemple après une remise à zéro de la base ; le script utilise le nouveau total comme estimation minimale.

## Sauvegarde et restauration

L’historique quotidien dépend entièrement du fichier CSV local. Il est conseillé de sauvegarder régulièrement :

```text
~/.local/share/empire-contre-intox/visit-counts-history.csv
```

Pour restaurer l’historique, replacer simplement le fichier au même emplacement avant la prochaine exécution.

## Confidentialité

Le système conserve seulement :

- le chemin de la page ;
- son nombre cumulé de visites ;
- la date et l’heure de chaque photographie locale.

Il ne stocke pas d’adresse IP, de cookie, d’identifiant utilisateur ou de user-agent. Les nombres représentent des **visites totales**, pas des visiteurs uniques : les actualisations, robots et accès répétés peuvent être comptabilisés.

## Diagnostic

Vérifier manuellement que le relevé fonctionne :

```bash
/usr/bin/python3 /Users/olivierveinand/Documents/DEV/empire-contre-intox/scripts/visit-counts.py --record
```

Vérifier ensuite que le fichier existe :

```bash
ls -l ~/.local/share/empire-contre-intox/visit-counts-history.csv
```

En cas de problème cron :

1. consulter `/tmp/eci-visit-counts.log` ;
2. vérifier `crontab -l` ;
3. vérifier que macOS autorise le terminal ou Claude Code dans **Réglages Système → Confidentialité et sécurité → Accès complet au disque** ;
4. exécuter la commande de relevé manuellement pour distinguer un problème cron d’un problème réseau/API.
