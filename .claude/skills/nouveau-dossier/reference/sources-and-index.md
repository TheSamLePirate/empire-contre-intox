# Vérification, sources & mise à jour de l'index

## A. Vérification factuelle (toujours, avant de figer le contenu)

1. **Extraire** toutes les affirmations factuelles et données chiffrées du/des
   transcript(s) : dates, durées, quantités, %, noms (personnes, lieux, missions,
   espèces), bornes, citations de lois, etc.
2. **Lancer plusieurs agents `Agent` (subagent_type: general-purpose) EN PARALLÈLE**
   (un même message, plusieurs appels), un par thème/sous-ensemble. Leur demander,
   pour chaque claim : **verdict** (✅ confirmé · ⚠️ à nuancer · 🔶 débattu · ❌ erroné)
   + valeur de référence + 1–3 URL réelles vérifiées.
3. **Hiérarchie des sources** selon le type de dossier :
   - **Science** → NASA, ESA, USGS, IUGS/ICS (stratigraphy.org), Smithsonian,
     articles à comité de lecture **avec DOI vérifié** ; Wikipédia en dernier recours.
   - **Civique / institutionnel** (ex. politique FR) → Légifrance, vie-publique.fr,
     service-public.gouv.fr, Conseil constitutionnel, Assemblée, Sénat, CNCCFP, Arcom.
     **Pas de DOI** : références institutionnelles.
   - **Histoire / mémoire** (ex. esclavage) → musées (Château des ducs de Bretagne…),
     fondations (mémoire-esclavage.org), bases (SlaveVoyages), BnF/Gallica,
     Fondation Napoléon, articles. Surtout **muséal/institutionnel**, peu de DOI.
4. **Corriger** la page pour les ❌ ; **nuancer** (fourchettes, prudence) les ⚠️/🔶 —
   via des **encadrés « anti-intox »**, sans toucher au texte transcrit verbatim.

### ⚠️ ANTI-HALLUCINATION DOI — règle absolue
**Ne JAMAIS inventer ni deviner un DOI.** Vérifier chaque DOI par résolution
`https://doi.org/<doi>` et/ou Crossref `https://api.crossref.org/works/<doi>`
(concordance titre / auteurs / revue / volume / pages). À défaut : écrire
« DOI non trouvé — [source institutionnelle] » plutôt que d'en fabriquer un.
Faire vérifier les DOI **par les agents** (ils l'ont fait : Cann 1987
`10.1038/325031a0`, Moody 2024 `10.1038/s41559-024-02461-1` ≠ le News&Views
`…02474-w`, etc.).

## B. Documenter dans `sources/`

- **Audit par dossier** — `sources/dossier-<N>-<nom>.md` : une entrée par
  affirmation → *citation → verdict → valeur de référence → source(s) avec URL*.
  Terminer par une **## Synthèse** (items ⚠️/🔶/❌ + corrections appliquées).
- **Références** :
  - science → `sources/refs-doi-<N>-<nom>.md` : *donnée → citation complète → DOI
    vérifié → ce que l'article établit* + note anti-hallucination.
  - civique/histoire → `sources/refs-<N>-<nom>.md` (ou `refs-institutionnels-…`) :
    liste de sources officielles/muséales avec URL réelles, **sans DOI**, + note
    méthodologique (« dossier civique/d'histoire : traçabilité par textes de loi /
    sources muséales »).
- **Mettre à jour `sources/README.md`** : ajouter la ligne du dossier dans la table
  « Fichiers » (et la table DOI si science), puis un bloc `### Dossier N — <titre>`
  dans le bilan (audit + nuances principales).

## C. Surfacer dans `sources/sources.html` (la page codex « Les Sources »)

C'est du JS data-driven. Pour ajouter un dossier :

1. **Section HTML** après les autres sections de fiches :
   ```html
   <section class="wrap section" id="<slug>"><div class="sec-head reveal">
     <p class="kick">Dossier N · <Équipe></p><h3><Titre></h3>
     <p><sous-titre + nature (DOI / civique / histoire)></p>
   </div><div class="grid" id="g-<slug>"></div></section>
   ```
2. **Tableau de fiches** JS, après les autres `const …= [...]` :
   ```js
   const XX = "../<equipe>/<dossier>/assets/";   // racine images
   const <SLUG> = [
     { t:"Titre fiche", d:"donnée courte", v:"ok|warn|deb|fresh", img:XX+"hero.png",
       s:"résumé (1-2 phrases : la nuance/le verdict)",
       src:[{n:"Nom source",u:"https://…"}, …] },
     … ];
   ```
   `v` : `ok` ✅ · `warn` ⚠️ · `deb` 🔶 · `fresh` corrigé après audit.
3. **Brancher** : ajouter `fill("g-<slug>",<SLUG>);` à la ligne des `fill(...)`.
4. **Compteurs** :
   - ajouter `+<SLUG>.length` à la ligne `const total = …` (fiches du hero).
   - **incrémenter** le stat « Dossiers audités » (chercher
     `<div class="n">N</div><div class="l">Dossiers audités</div>`).
   - pour la science, ajouter un groupe à `REFS` (DOI) → le compteur DOI est auto.
5. **(Science)** ajouter une entrée par DOI dans le tableau `REFS` (groupe dédié) et,
   si nouvelle source institutionnelle, une ligne dans `SOURCES` (bibliographie).
6. Tous les liens externes en `target="_blank" rel="noopener"`. Chaque élément
   interrogeable porte `data-search` (généré via `norm()` — fait par `ficheHTML`).
7. **Valider le JS** : accolades/crochets équilibrés
   (`node -e "..."`), et que la page charge sans erreur console.

## D. Mise à jour de `index.html` (l'index commun)

1. **Lire d'abord l'état courant** — la numérotation **bouge** (d'autres dossiers
   ont pu être ajoutés entre-temps). Repérer : la dernière carte « Dossier … »,
   la carte « Les Sources » (qui doit rester **la dernière numérotée**), le compteur
   romain du hero (`<b>X</b> dossiers`), la phrase du sec-head
   (« Onze/Douze dossiers… »), et la nav de pied (`footer-nav`).
2. **Insérer la nouvelle carte AVANT la carte « Les Sources »** (et avant le bandeau
   `#manifeste`). La carte : `style="--accent:#<hex>"`, image
   `<equipe>/<dossier>/assets/<nom>-hero.png` (16:10), `Dossier N`, badge, titre,
   description courte, 3 tags, byline (avatars + « Réalisé par … » + `.note` si
   participation), `dossier-link` + `stretch` vers la page.
3. **Renuméroter « Les Sources »** au nouveau dernier numéro (carte + nav de pied),
   et **incrémenter** : le compteur romain du hero, la phrase du sec-head, ajouter
   l'entrée dans la nav de pied. Vérifier l'eyebrow « Dossier N » dans
   `sources/sources.html` aussi.
4. Compter les chiffres romains en français : V, VI, VII, VIII, IX, X, XI, XII →
   Cinq, Six, Sept, Huit, Neuf, Dix, Onze, Douze.

## E. ⚠️ Piège « références orphelines »

Si `index.html` / `sources.html` / `README.md` contiennent déjà du câblage
(carte, fiches, lignes) vers **un autre dossier non encore commité** (travail
parallèle de l'équipe), committer ces fichiers partagés **publie des références
vers des fichiers absents du dépôt → 404 en prod**. Avant de pousser : vérifier
`git status` pour les fichiers non suivis référencés ; soit les committer aussi
(pour que les liens résolvent), soit en informer l'utilisateur. (C'est arrivé avec
« Le Singe Aquatique ».)
