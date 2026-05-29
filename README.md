# Empire contre Intox - Site educatif statique

Ce depot contient un mini-site HTML pour publier des transcriptions scientifiques sous forme de pages educatives immersives.

## Pages disponibles

- `index.html` : accueil du site et index des dossiers.
- `ymir-lalie/edicarien.html` : dossier sur l'Ediacarien.
- `ymir-lalie/resume-eres.html` : dossier sur les grandes eres geologiques.

## Assets

- `ymir-lalie/assets/logo-eci.jpg` : logo Empire contre Intox.
- `ymir-lalie/assets/ediacaran-hero.png` : image hero du dossier Ediacarien.
- `ymir-lalie/assets/eres-hero.png` : image hero du dossier Resume des Eres.

## Ajouter un nouveau document texte

Pour transformer un nouveau `.txt` en page HTML dans le meme style :

1. Placer le fichier texte dans le dossier approprie.
2. Lire le document en entier.
3. Identifier les chapitres naturels, les passages forts et les objectifs pedagogiques.
4. Creer une page HTML autonome a cote du fichier texte.
5. Conserver la transcription complete et mot pour mot.
6. Ajouter une structure claire : hero, navigation, intro, objectifs pedagogiques, chapitres, encadres, footer ECI.
7. Ajouter une image hero dans `ymir-lalie/assets/`.
8. Ajouter le logo ECI dans la navigation et en footer.
9. Ajouter des liens vers `../index.html` et vers les autres dossiers.
10. Mettre a jour `index.html` avec une carte vers la nouvelle page.
11. Verifier le rendu dans un navigateur.

## Lancer en local

Depuis la racine du projet :

```bash
python3 -m http.server 8080
```

Puis ouvrir :

```text
http://127.0.0.1:8080/index.html
```

## Checklist qualite

Avant de considerer une page comme terminee :

- le fichier texte source a ete lu en entier ;
- la transcription est complete ;
- la page n'est pas un simple copier-coller brut ;
- le design suit l'identite Empire contre Intox ;
- le logo ECI est present ;
- les images chargeent correctement ;
- l'index reference la page ;
- les liens internes fonctionnent ;
- il n'y a pas de debordement horizontal ;
- la page contient des objectifs pedagogiques.

## Methode agent

Les instructions detaillees pour reproduire cette methode sont dans `AGENT.md`.

