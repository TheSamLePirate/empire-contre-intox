# Données du quizz — Dossier XXIX

Les fichiers de `data/` sont **générés** depuis la base de travail `a_traiter/sophisme-rethorique/quizz/sophismes.db`
(non versionnée : 4,2 Mo) par `a_traiter/sophisme-rethorique/build/make_quizz.py`. Ne pas les éditer à la main.

- `index.json` — la liste des sections, avec le nombre d'items et de questions de chacune.
- `<section>.json` — les questions de la section : discours, quatre réponses (dont une correcte), explication, indice.

**Limite connue :** la page charge ces fichiers par `fetch`, qui ne fonctionne pas depuis `file://`.
Ouverte par double-clic, la page affiche un message explicite et propose le répertoire à la place.
Depuis le site (ou un `python3 -m http.server`), tout fonctionne.

## Regénérer

```bash
python3 a_traiter/sophisme-rethorique/build/make_quizz.py
```

## État du corpus

2950 questions sur les 2 950 prévues, couvrant 295 des 295 procédés (10 questions par procédé, dont une
« Raisonnement valide »). Le corpus est complet : chaque procédé du répertoire a ses dix questions, et son lien profond `quizz.html#<ref>` ouvre directement sa série.
