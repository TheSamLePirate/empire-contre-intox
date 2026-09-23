# Grammalecte — moteur vendu avec la skill

- **Fichier** : `Grammalecte-fr-v2.3.0.zip` (6 Mo), archive officielle téléchargée depuis
  <https://grammalecte.net/> (page « Télécharger », module Python).
- **SHA-256** : `aaa4219704857778038ecc1db18f6a907994c0125b8e762dcecc69130280684f`
- **Licence** : GNU GPL v3 (voir `LICENSE.txt` dans l'archive). Grammalecte est un outil de
  travail de la skill ; il n'est ni publié sur le site ni couvert par la licence de contenu.
- **Installation** : aucune. `scripts/grammalecte-check.py` vérifie l'empreinte et décompresse
  l'archive dans `~/.cache/eci-grammalecte/2.3.0/` au premier usage (24 Mo), puis charge le
  module depuis là. Supprimer ce dossier force une réinstallation.
- **Mise à jour** : remplacer l'archive, mettre à jour `SHA256` et `VERSION` en tête de
  `grammalecte-check.py`, relancer sur un dossier connu (Rome) pour comparer.
