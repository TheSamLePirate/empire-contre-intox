# Audit éditorial n° 2 — Dossier XXV « L'Entropie, le temps et l'Univers »

**Fichier audité :** `provoxys/entropie/index.html` (2789 lignes, ~210 ko)
**Date :** 23 juillet 2026 — **seconde passe**, après implémentation complète de l'audit n° 1 (`audit-entropie.md`)
**Méthode :** relecture intégrale du fichier dans son état actuel, comptages automatisés, densité éditoriale par chapitre, auto-évaluation critique de la passe de vulgarisation précédente.

---

## 1. Résumé exécutif

> **Questions posées : « Est-ce que le dossier est suffisamment accessible ? Comment le rendre plus accessible ? »**

**Réponse : oui, le dossier est désormais suffisamment accessible pour sa mission — un cours de référence de 4 h ouvert à un lecteur de niveau lycée motivé. La rampe d'entrée est complète et cohérente. Vulgarisation : 8,5/10 (contre 6/10 à l'audit n° 1).**

Il reste **cinq correctifs de finition** (tous éditoriaux, sans toucher la transcription) pour atteindre le plafond de ce format : un TL;DR autoportant, le chemin « Pressé » qui n'utilise pas ses propres « À retenir », deux chapitres sans encadré Définition (ch. 10, ch. 16), une question du chat sans réponse explicite (ch. 3), et une permission « zéro maths » jamais formulée. Au-delà, la seule marge restante serait **structurelle** : une page dérivée courte (« L'entropie en 10 minutes »).

Point de vigilance nouveau, propre à cette seconde passe : **l'appareil éditorial commence par endroits à concurrencer le récit** (jusqu'à 5 objets éditoriaux pour 2 prises de parole au ch. 24). C'est le revers de la passe n° 1 — à régler en repliant les encadrés secondaires, pas en en ajoutant d'autres.

---

## 2. État des lieux mesuré (après passe n° 1)

| Dispositif | Quantité | Détail |
|---|---|---|
| Transcription (intouchée) | 27 chapitres, ~55 prises de parole | verbatim du live Provoxys × Samlepirate |
| Laboratoires interactifs | 26 (V1–V26) | triés par numéro au banc et au sommaire, `noscript` partout |
| **Lexique** | **47 termes** en 5 groupes | `<details>` dépliables, 1 ligne chacun, étiquette d'acte |
| **Encadrés Définition** | **11** | au premier usage : réversible, travail/chaleur/rendement, kelvin, fonction d'état, principe zéro, bit, logarithme, latente/enthalpie, ρ/intrication, Loschmidt, horizon/Schwarzschild |
| **« À retenir »** | **7** | une phrase par acte, teinté or |
| **FAQ dépliables dans le fil** | **5** | frontières, chambre, vivant, démon, trous noirs (+ 9 aux Coulisses) |
| **Blocs anti-intox** | 5 | signature ECI, valeurs recalculées |
| **Blocs « Ordre de grandeur »** | 2 (+ 1 extension fb-note) | multiplicités, trou noir, Landauer |
| **Formules KaTeX** | 11 | **toutes variables légendées** (vérifié par script) |
| **Tableau des six entropies** | 1 | statique, conclusion, visible sans JS |
| **Chemins de lecture** | 3 + note prérequis | Pressé 20 min / Curieux·se 1 h / Complet 4 h |
| **Section « Et dans la vraie vie ? »** | 5 pillars | applications + anti-intox du quotidien |
| **Principes de thermo** | 4/4 en texte | zéro (ch. 5), 1er (ch. 3), 2ᵉ (ch. 4, ×3 formes), 3ᵉ (ch. 6) |
| **Définitions d'entropie** | 6/6 en texte + formule + tableau | Clausius, Boltzmann, Gibbs, Shannon, von Neumann, Bekenstein-Hawking |
| Hero | citation attribuée à Sam + traduction en clair | ✓ |

**La rampe complète, telle qu'un lecteur la traverse :** hero (thèse + traduction) → intro (fil + feuille de route) → objectifs → chemins & prérequis → **lexique** → banc d'essai → 7 actes (Définitions au premier usage, FAQ repliées, Ordres de grandeur, « À retenir » à chaque sortie) → conclusion autoportante (résumé + tableau + devise) → vraie vie → coulisses → footer ECI. Le trajet est sans trou : **aucun terme pivot n'est à plus d'un clic d'une définition.**

---

## 3. Ce que la passe n° 1 a réussi — preuves à la relecture

1. **La conclusion est désormais autoportante** : la prose de synthèse + le tableau des six entropies + la devise forment un résumé complet du dossier, lisible seul en 5 minutes. C'était le manque majeur de l'audit n° 1 ; il est comblé.
2. **Les formules ne sont plus un mur** : chacune des 11 a sa note en français avec **toutes** ses variables nommées, et 3 encadrés Définition couvrent les maths de support (logarithme, kelvin, ln 2).
3. **La couverture définitionnelle est quasi totale** : les seuls termes techniques encore dépourvus d'encadré dans le fil sont ceux des ch. 10, 12, 14, 16, 17 et 25 — et tous figurent au lexique.
4. **La voix du live est intacte** : aucun ajout n'a touché la transcription ; les 40+ objets éditoriaux sont visuellement distincts (bordures colorées, labels) et ne se confondent pas avec la parole des auteurs.
5. **L'ancrage ECI est resté parfait** : licence, compteur, crédits, index, sources, RSS.

---

## 4. Ce qui limite ENCORE l'accessibilité — inventaire honnête

### 4.1 Le chemin « Pressé » n'utilise pas ses propres « À retenir » ⭐ (contradiction interne)

Le parcours de 20 minutes indique « ouverture + cinq anti-intox + conclusion »… mais **les sept « À retenir » — créés précisément pour ce lecteur — n'y figurent pas**. Ils sont pourtant la colonne vertébrale d'une lecture rapide : une phrase par acte, en langage courant, reliées entre elles elles racontent tout le dossier. Le texte du chemin doit devenir : *« Lisez l'ouverture, les sept « À retenir » (une phrase par acte), les cinq encadrés anti-intox et la conclusion. »* **Effort : 1 ligne.**

### 4.2 Pas de TL;DR autoportant en haut de page ⭐ (le manque structurel restant)

Un visiteur de « 30 secondes » doit scroller jusqu'à la conclusion pour avoir la synthèse. Le dossier mérite, **dans l'intro**, une boîte « **L'entropie en cinq idées** » autonome :

1. L'énergie se conserve toujours ; l'entropie, elle, compte *comment* elle est répartie (en joules par kelvin, pas en joules).
2. Plus un état visible correspond à de configurations microscopiques, plus il est probable : l'équilibre « gagne » toujours — c'est pour ça que le café refroidit.
3. L'entropie d'une *partie* peut baisser (frigo, cristal, vivant) si le *total* augmente : tout dépend où l'on trace la frontière.
4. « Désordre » est une image, pas une définition : une entropie se définit par des états, leurs probabilités et une frontière.
5. Une même idée, six formules — de la machine à vapeur aux trous noirs.

**Effort : ~30 min.** C'est le dernier dispositif qui manque à la promesse « accessible à tous ».

### 4.3 Deux chapitres sans encadré Définition alors que leur vocabulaire est abstrait

- **Ch. 10 (solides d'Einstein)** : « oscillateurs » et « quanta » tombent dès la première réplique de Sam, couverts seulement par le lexique. Le chapitre est l'un des plus conceptuels de l'acte III.
- **Ch. 16 (Ising)** : « spins », « magnétisation », « susceptibilité », « capacité thermique » alignés sans encadré (lexique seul) ; le chapitre affiche même un avertissement « ne pas déduire l'entropie d'une image » qui gagnerait un appui définitionnel immédiat.

(Ch. 12 « gradient » et ch. 17 « code préfixe » sont moins critiques : mots quasi courants ou explicités par le contexte du labo.) **Effort : 2 blocs, ~15 min.**

### 4.4 Une question du chat reste sans réponse explicite (ch. 3)

« Si je double la quantité d'eau sans changer les masses, est-ce que l'énergie transférée change, ou seulement l'élévation de température ? » — la réponse (l'énergie transférée est identique, l'élévation de température est divisée par deux) est *dérivable* de la réplique précédente mais jamais posée. Les quatre autres questions du fil ont leur réponse inline. Un mini-`<details>` « la réponse du live » complète la logique quiz du dossier. **Effort : 10 min.**

### 4.5 La permission « zéro maths » n'est jamais formulée

La note prérequis dit que les formules sont expliquées — elle ne dit pas qu'**on peut toutes les sauter sans perdre le fil**. Pour un lecteur mathophobe, c'est LA phrase qui décide de rester ou de partir. Ajouter : *« Et si les équations vous rebutent : sautez-les. Chaque formule est un luxe, jamais un passage obligé — sa note la résume en une phrase. »* **Effort : 1 ligne.**

### 4.6 Vigilance — densité éditoriale (revers de la passe n° 1)

Densité mesurée (objets éditoriaux hors formules et labos) :

- **Ch. 24 (Bekenstein-Hawking) : 5 objets** pour 2 prises de parole — formule + Définition horizon + anti-intox + FAQ (repliée) + Ordre de grandeur. **Le récit s'y efface derrière l'appareil.**
- Ch. 5, 7, 16 : 3 objets chacun — acceptable.
- Ailleurs : 0–2.

Recommandation : dans les chapitres à 4+ objets, **replier les blocs « Ordre de grandeur » en `<details>`** (« pour aller plus loin »), comme les FAQ. Ne rien ajouter d'ouvert dans ces chapitres. **Effort : 15 min.** C'est le signe que la passe n° 1 a atteint sa limite : la suite doit *compacter*, pas empiler.

### 4.7 Détails mineurs (sans impact réel, notés pour exhaustivité)

- « Coarse-grained » en anglais dans le lede du labo V21 (traduit dans le Définition voisin — acceptable).
- Sans JavaScript, les cellules « Formule » du tableau affichent le TeX brut (repli lisible mais brut ; les `<noscript>` des labos, eux, sont soignés).
- Le lexique n'est pas relié depuis le fil (pas de renvoi « ce mot est au lexique » au-delà de la note prérequis) — option : ancres `#lex-machines…` sur les 5 groupes + 3–4 renvois ciblés.
- La timeline d'intro n'indique pas de durées par acte (aiderait à planifier les 4 h).
- Les nouveaux chiffres éditoriaux (comparaisons d'ordres de grandeur, COP, part des data-centers) restent à intégrer à l'appareil critique `sources/` (déjà signalé, audit n° 1 §11 — toujours d'actualité).

---

## 5. Recommandations priorisées

| Priorité | Action | Effort | Impact |
|---|---|---|---|
| **P1 ★** | **Sélecteur de mode de lecture** — interface Pressé / Curieux·se / Complet qui reconfigure *réellement* la page (spec complète §5.1) | 2–3 h | Les chemins statiques deviennent une expérience sur mesure : trois dossiers en un |
| **P1** | Boîte **« L'entropie en cinq idées »** dans l'intro (TL;DR autoportant) | ~30 min | Le dossier devient accessible même au visiteur de 30 secondes |
| **P1** | Chemin « Pressé » : ajouter les **sept « À retenir »** au parcours | 1 ligne | Supprime la contradiction interne, rend le parcours 20 min réellement praticable |
| **P1** | Note prérequis : ajouter la **permission « zéro maths »** | 1 ligne | Décroche le lecteur mathophobe avant qu'il ne parte |
| **P2** | Encadrés Définition **ch. 10** (quanta & oscillateurs) et **ch. 16** (spin & grandeurs d'Ising) | ~15 min | Achève la règle « définition au premier usage » |
| **P2** | Mini-`<details>` **réponse ch. 3** (doublement de l'eau) | ~10 min | Cohérence quiz : 5/5 questions du fil répondues |
| **P3** | Replier les « Ordre de grandeur » en `<details>` au **ch. 24** (et ch. 8 par symétrie) | ~15 min | Rend le récit au chapitre le plus dense |
| **P3** | Ancres de groupes lexique + 3–4 renvois ciblés ; durées dans la timeline | ~30 min | Confort, non bloquant |
| **Option structurelle** | Page dérivée courte `entropie-10-min.html` (version éditoriale nouvelle, liée depuis le hero et l'index) | 2–3 h | Seule voie au-delà du plafond actuel **sans toucher la transcription** |

---

## 5.1 Projet d'évolution — le sélecteur de mode de lecture ⭐

**Constat :** les trois chemins de lecture actuels sont *descriptifs* (ils disent quoi lire) mais pas *opérationnels* — le lecteur doit exécuter le tri lui-même dans 2800 lignes. La suite logique : une **interface qui applique le chemin choisi à la page elle-même**.

### Comportement visé

Trois boutons dans le learning panel — **les trois cartes actuelles deviennent les trois boutons** (cliquables, état actif visible, durée et promesse conservées) — plus un rappel discret dans la topbar une fois la page entamée.

| Mode | Ce qui reste visible | Ce qui est replié |
|---|---|---|
| **Pressé · ~20 min** | Ouverture ; une vue consolidée des **7 « À retenir »** ; les 5 anti-intox ; la Conclusion + tableau des six entropies ; la devise | Tous les chapitres de transcription (repliés, jamais supprimés), les labos, les coulisses |
| **Curieux·se · ~1 h** | Tout le mode Pressé **+ actes I–III complets** (transcription, définitions, labos V1–V11) | Actes IV–VII : chapitres repliés, mais act-bands et « À retenir » visibles |
| **Complet · ~4 h** | Tout (état actuel) | Rien |

Règles d'expérience :

- **Rien n'est masqué sans alternative visible** : chaque zone repliée garde un libellé « Acte IV — Matière & vivant · 5 chapitres · déplier », et un bandeau persistant rappelle le mode actif avec un bouton « Tout afficher ».
- **La jauge et le sommaire suivent le mode** : en mode Pressé, la jauge ne gradue que ce qui reste visible (sinon la progression ment) — appeler `placeMarks()`/`measure()` après chaque bascule.
- **Ancres profondes** : suivre un lien vers un chapitre replié déplie la cible (ou bascule en mode Complet) — jamais de saut dans le vide.
- **Persistance** : `localStorage` mémorise le mode ; **sans JavaScript, tout reste ouvert** (mode Complet par défaut — dégradation gracieuse, rien ne casse).

### Implémentation technique (légère, sans refonte)

- Un attribut `data-mode` sur `<body>` (`presse` / `curieux` / `complet`) ; la sélection est entièrement en CSS : `body[data-mode="presse"] section.chapter:not([data-keep]) { display:none; }` — les chapitres à garder portent `data-keep` en dur (ouverture, conclusion) ou sont marqués par JS selon le mode.
- **Vue consolidée des « À retenir »** (mode Pressé) : les 7 blocs `.retain` vivent au fond de chapitres repliés — JS les **clone** dans un conteneur dédié `#retain-digest` affiché uniquement en mode Pressé (le verbatim n'est pas déplacé, seulement dupliqué à l'affichage).
- Pas de dépendance nouvelle ; le fichier reste autonome ; `prefers-reduced-motion` inchangé.

### Garde-fous

- **Ne pas en faire un mode « court/long » cachant le verbatim** : la transcription reste à un pli de distance, comptée et visible (« 24 chapitres repliés »). C'est un **filtre de lecture**, pas une version alternative — la page dérivée courte (option structurelle du tableau §5) relève, elle, d'une création nouvelle.
- Vérifier après bascule : positions de la jauge, compteur de visites (inchangé), comportement des `<details>` FAQ/lexique (indépendants du mode), aucune régression du `jumpTo` sur les cibles repliées.

### Effort et gain

**2–3 h** (CSS `data-mode` + ~80 lignes de JS + gestion des ancres/jauge + tests). **Gain :** les chemins de lecture cessent d'être un conseil pour devenir une fonction — le même dossier sert réellement le visiteur de 20 minutes, le curieux d'une heure et le lecteur des 4 heures, sans rien dupliquer ni rien cacher. C'est le dernier chaînon de l'accessibilité « pour tous » identifiée par cet audit.

---

## 6. Ce qu'il ne faut pas faire

- **Ne plus ajouter d'encadrés ouverts** au-delà des deux manquants (ch. 10, 16) : la densité maximale tolerable est atteinte (cf. §4.6). Toute nouvelle aide doit être **repliée** (`<details>`) ou **reliée** (lexique), pas empilée.
- **Ne pas simplifier la transcription** — c'est la charte et la force du dossier.
- **Ne pas créer la version courte dans la même page** (un mode « court/long » cacherait le verbatim, contraire à la mission) : si version courte, page séparée.

---

## 7. Verdict final

**Le dossier est accessible.** La promesse faite à l'audit n° 1 — « un excellent cours auquel il manque son mode d'emploi » — est tenue : le mode d'emploi existe, il est complet, et il n'a coûté aucune retouche au verbatim. La note de vulgarisation passe de 6/10 à **8,5/10** ; le plafond du format « transcription intégrale + appareil éditorial » est à ~9/10, atteignable avec les cinq correctifs P1–P2 (≈ 1 h de travail, zéro risque).

La question n'est plus *« comment rendre ce dossier accessible »* mais *« faut-il, en plus, une porte d'entrée de 10 minutes »* — un choix éditorial de création nouvelle, pas une lacune du présent dossier. Et avec le **sélecteur de mode de lecture** (§5.1), les trois chemins cesseraient d'être un conseil pour devenir une fonction : le même dossier servirait réellement le visiteur de 20 minutes, le curieux d'une heure et le lecteur des 4 heures — trois expériences en une page, verbatim intact.

**Qualité scientifique : 9/10 (inchangée). Vulgarisation : 8,5/10 (était 6/10). Risque principal désormais : l'empilement éditorial — compacter plutôt qu'ajouter.**
