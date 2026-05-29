# Agent Instructions - Empire contre Intox

Ce projet transforme des documents texte en pages HTML educatives, immersives et partageables, dans l'identite visuelle du collectif Empire contre Intox.

## Objectif

Quand un nouveau fichier `.txt` doit etre implemente en HTML, produire une page complete qui :

- conserve la transcription mot pour mot ;
- structure le contenu en chapitres lisibles ;
- ajoute une vraie mise en scene pedagogique ;
- reprend l'identite Empire contre Intox ;
- est referencee depuis `index.html` ;
- fonctionne comme un site statique autonome.

## Methode obligatoire

1. Lire tout le fichier texte avant de coder.
2. Identifier le titre, le ton, les actes ou chapitres naturels, les passages forts et la chute.
3. Ne pas corriger ni reecrire la transcription centrale, sauf pour l'integrer dans une structure HTML lisible.
4. Creer une page HTML autonome dans le dossier du document, avec CSS et JS integres si necessaire.
5. Utiliser le logo ECI depuis `ymir-lalie/assets/logo-eci.jpg`.
6. Creer ou reutiliser une image hero adaptee au sujet dans `ymir-lalie/assets/`.
7. Ajouter une navigation interne sticky, un hero fort, une structure en chapitres, des encadres pedagogiques, et un footer ECI.
8. Ajouter des objectifs pedagogiques explicites.
9. Ajouter des liens croises : retour `../index.html` et lien vers les autres dossiers pertinents.
10. Mettre a jour `index.html` avec une nouvelle carte pour la page.
11. Verifier dans un navigateur local : images chargees, liens corrects, pas de debordement horizontal.

## Style visuel

L'identite doit rester premium, scientifique et sobre :

- fond sombre, grille subtile, panneaux translucides ;
- accents or, bleu nuit, teal, rouge profond, argent ;
- logo ECI arrondi dans la navigation et en footer ;
- grands titres serif pour l'impact editorial ;
- texte courant lisible, contraste fort ;
- cartes et boutons avec rayon de 8px environ ;
- aucune page brute generee automatiquement.

Chaque page peut avoir une palette secondaire adaptee au sujet, mais elle doit rester compatible avec ECI.

## Structure recommandee pour une page dossier

- `hero` : titre, sous-titre, image immersive, CTA "Lire la transcription", "Accueil ECI".
- `topbar` : logo ECI, titre court, lien accueil, navigation par chapitres.
- `intro` : intention de lecture et fil conducteur.
- `learning-panel` : objectifs pedagogiques en 3 blocs.
- `chapter` : sections de transcription, avec aside pedagogique.
- encadres : script, methode scientifique, question au public, lecon, anti-intox selon le contenu.
- `collective-footer` : grand logo ECI, texte collectif, liens vers index et autre dossier.
- footer technique court.

## Regles de contenu

- La transcription doit rester visible et complete.
- Les ajouts editoriaux doivent clarifier, orienter ou contextualiser.
- Ne pas transformer le texte en resume uniquement.
- Ne pas supprimer les formulations orales si elles font partie du document.
- Les titres de chapitres peuvent etre editorialises, mais le contenu original doit rester present.
- Eviter les blocs trop longs sans respiration visuelle.

## Assets

Assets actuels :

- `ymir-lalie/assets/logo-eci.jpg`
- `ymir-lalie/assets/ediacaran-hero.png`
- `ymir-lalie/assets/eres-hero.png`

Pour un nouveau sujet :

- generer ou ajouter une image hero pertinente ;
- la sauvegarder dans `ymir-lalie/assets/` avec un nom explicite ;
- ne jamais referencer une image uniquement depuis un dossier temporaire ;
- verifier que l'image charge dans le navigateur.

## Mise a jour de l'index

Chaque nouvelle page doit etre ajoutee a `index.html` :

- nouvelle carte dans la grille des pages ;
- image de vignette ;
- titre ;
- description courte ;
- tags ;
- lien relatif vers le HTML ;
- si utile, mise a jour du parcours pedagogique.

## Verification finale

Avant de terminer :

- ouvrir `index.html` via un serveur local ;
- ouvrir chaque page HTML referencee ;
- verifier que toutes les images sont chargees ;
- verifier les liens de navigation et retour accueil ;
- verifier qu'il n'y a pas de scroll horizontal ;
- mentionner les fichiers crees ou modifies.

