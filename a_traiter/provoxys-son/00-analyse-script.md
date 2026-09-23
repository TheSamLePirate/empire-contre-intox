# Analyse du script « Le Son » (script-live-son-encyclopedique-1.html)

Analyse du 23 septembre 2026, **sans création du dossier**. Objet : juger la complétude,
critiquer le plan, relever ce qui manque, préparer la décision sur les ateliers
interactifs (voir `01-experiences-interactives.md`).

## 1. Ce qu'est le document

- Un **script encyclopédique sans timing** (169 ko de HTML, ≈120 000 signes de texte
  utile, 22 sections H2, ~90 sous-sections, ~45 formules KaTeX toutes munies d'un
  cartouche « Prononciation » entre guillemets, 12 schémas SVG/CSS, 3 tableaux
  d'ordres de grandeur, 23 prompts d'images, ~90 références bibliographiques).
- Ce n'est **pas une transcription de live** : c'est un « atlas » pré-live. Le dossier
  ECI qui en sortira relève donc du **cas particulier « dossier sans transcription »**
  de la charte (comme le Dossier XXVII) : pas de verbatim à conserver au mot près,
  `check-coverage.py` sans objet, mais **tout le reste s'applique** (vérification
  factuelle, `sources/`, images, formules avec « Se lit », index, RSS, manifeste).
  À dire explicitement dans le récapitulatif final le jour où le dossier se construit.
- Identité : Provoxys (Cormorant Garamond / Source Sans 3 / JetBrains Mono, teal + or
  sur nuit). Même situation que Lumière et Entropie : **voie A codex ECI avec un
  accent secondaire** (le teal du script convient : il fait écho à l'idée d'oscilloscope).

## 2. Complétude — verdict global

**Le fond est très complet, plus large que n'importe quel dossier existant.** Il couvre
onze domaines que la plupart des « histoires du son » séparent : physique, maths,
préhistoire, histoire des sciences, musique et tempéraments, battements, psychoacoustique,
société/droit/cinéma, enregistrement, sonar/ultrasons/Doppler, oreille et voix, salles,
bioacoustique (infra et ultra), phonons, espace et astronomie.

Points forts à conserver tels quels :

- la **discipline des « trois familles »** (acoustique de fluide / plasma / sonification)
  au chapitre 18, qui est le meilleur outil anti-intox du script ;
- la **règle d'unités** dB SPL (air) ≠ dB re 1 µPa (eau), répétée à chaque fois qu'il le faut ;
- les **trois portraits** (Mersenne, Langevin, Gurnett) qui portent trois sauts
  (mesurer / interroger l'écho / changer d'onde) : c'est le fil, il est bon ;
- les sections « ce qu'il faut refuser sur le plateau » (infrasons, ultrasons animaux) ;
- la chaîne des **formules dites à voix haute** — déjà conforme à la ligne « Se lit »
  de la charte, il n'y aura qu'à les transformer en `.fb-say` avec la glose des symboles.

Ce qui faisait défaut, par ordre d'importance — **les neuf ajouts ont été faits dans le
script le 23 septembre 2026** (sauvegarde : `script-live-son-encyclopedique-1.avant-ajouts.html`) :
M1+M7 → `#numerique` (7b) · M2 → `#intox` (12b) · M3 → `#accords` (6b3) · M4 → `#phenomenes`
(1c) · M5 → sous-section « Transduction » du ch. 7 · M6 → sous-section « Où est le son ? »
du ch. 6c · M8 → ch. 11 réécrit · M9 → encadré « Sécurité auditive » du ch. 9. Nav, fil
unique, frise, glossaire (16 entrées), prompts (3) et sources (19 références) mis à jour.
Les erreurs factuelles et coquilles du §4 ont été **corrigées dans le script le 23 septembre 2026**. La **vérification factuelle complète** (237 affirmations, 11 agents) est faite : bilan et corrections dans `06-verification-factuelle.md` ; le script de référence est désormais **`script-live-son.md`** (version Markdown de Codex, corrigée et complétée), le HTML restant l'atlas des schémas.

| # | Manque | Pourquoi ça compte | Où l'insérer |
|---|---|---|---|
| M1 | **Le son numérique** : échantillonnage, Nyquist-Shannon (1928/1949), quantification, aliasing, FFT (Cooley-Tukey 1965), spectrogramme (fenêtre, compromis temps/fréquence), compression perceptive (MP3 = masquage appliqué). Aujourd'hui trois lignes éparses (ch. 6c, 7). | C'est le **socle de toutes les expériences interactives** demandées (FFT, DAW, micro). Sans ce chapitre, l'atelier « spectrogramme » n'a pas de texte d'appui. C'est aussi une histoire (Shannon, Bell Labs, Fraunhofer) qui prolonge la « trace » de 1877. | Nouveau **ch. 7b « Le son devient nombre — de Nyquist au MP3 »**, après le ch. 7 (capture). |
| M2 | **Chapitre anti-intox consolidé** : 432 Hz « fréquence de l'univers », « fréquences de guérison / solfège sacré 528 Hz », battements binauraux thérapeutiques, cymatique créationniste (Jenny), Emoto et « l'eau qui écoute », résonance de Schumann « vibration de la Terre », « sons de l'espace » présentés comme audio, armes infrasonores, répulsifs ultrasons, 8D audio, « Tesla 3-6-9 ». Le script en traite **cinq** au passage, en oublie **cinq** (432, 528, Emoto, 8D, 3-6-9). | Identité ECI : c'est le seul dossier où la démonstration peut être **faite à l'oreille** en direct (jouer 432 et 440, compter les battements, montrer qu'aucune « harmonie cosmique » ne change). | Nouveau chapitre (proposé : **ch. 12b « Les intox du son — démonstrations à l'oreille »**), ou un encadré `.anti-intox` par mythe dans les chapitres concernés + une **table récapitulative** en fin de dossier. Je recommande les deux. |
| M3 | **Accords et harmonie** : le script traite les intervalles et les tempéraments, jamais les **accords** (triades majeure/mineure, renversements, pourquoi le mineur « sonne triste » — réponse : rugosité + fondamentale virtuelle de Terhardt, pas une loi de la nature), ni le rythme/tempo/perception du temps. | Demandé explicitement (« génération d'accords ») ; c'est aussi là que Plomp-Levelt et Sethares deviennent audibles. | Nouvelle sous-section dans **6b** (« Des intervalles aux accords ») + atelier dédié. |
| M4 | **Phénomènes ondulatoires en une place** : réflexion, réfraction (gradient de température → SOFAR, son qui « porte » le soir), diffraction, interférence, ondes stationnaires, résonance, loi de l'inverse du carré, absorption atmosphérique ISO 9613. Aujourd'hui répartis entre 1, 1b, 10, 15b, 15c. | Le lecteur qui arrive par « pourquoi j'entends la basse du voisin » doit trouver une réponse en un seul endroit. | Nouveau **ch. 1c « Ce que fait une onde quand elle rencontre le monde »** (court, 6 phénomènes, 1 schéma chacun, renvois). |
| M5 | **Transduction** : comment un micro et un haut-parleur fonctionnent (bobine mobile, condensateur, électret, MEMS ; haut-parleur = même loi de Laplace à l'envers ; pourquoi une enceinte de streaming coupe sous 40 Hz). Le ch. 7 liste les brevets sans la physique. | Nécessaire pour dire honnêtement ce que **le stream et le navigateur ne peuvent pas rejouer** (infra, ultra) — c'est le disclaimer de la moitié des ateliers. | Sous-section dans le ch. 7 ou dans le ch. 7b. |
| M6 | **Localisation spatiale** (ITD/ILD, HRTF, pavillon, cône de confusion, son binaural et « 8D ») : deux lignes au 6c. | Atelier binaural très fort ; pont vers le cinéma (ch. 6d). | Sous-section du **6c**. |
| M7 | **Chronologie 1980-2026** : le script s'arrête, côté technique, au MP3 « années 1990 ». Rien sur le streaming, LUFS/normalisation (fin de la loudness war, 2010s), audio spatial, séparation de sources, synthèse vocale/vocodeur/Auto-Tune (1997, Hildebrand — qui vient de la **sismique**, belle boucle avec les infrasons), microphones MEMS, aides auditives numériques, implants (cité). | Cohérence « du premier tambour à Voyager » : le dernier saut manque. | Fin du **ch. 7b**. |
| M8 | Le ch. 11 (bioacoustique générale) est **maigre** (6 puces) alors que 15b/15c sont profonds. Oiseaux (syrinx), insectes, poissons méritent cinq lignes de plus chacun, ou bien on assume que 11 est un « portail » vers 15b/15c. | Déséquilibre visible à la lecture. | Soit renforcer 11, soit le fondre en tête de 15b. |
| M9 | **Sécurité auditive pratique** : le script cite 80/85 dB(A) mais ne donne ni durée d'exposition (règle des 3 dB : 85 dB → 8 h, 88 → 4 h…), ni conseils concerts/casque. | Un dossier public sur le son qui fait jouer des sons doit le dire. | Encadré dans le **ch. 9** + rappel au-dessus des ateliers. |

Les sections « Mode d'emploi », « Prompts Imagine Grok », « Vidéos » sont des **outils de
plateau** : elles ne passent pas dans le dossier (les prompts seront remplacés par
`images_a_generer.md` au format de la skill, les vidéos par des liens dans `sources/`).

## 3. Le plan — critique et proposition

### Problèmes du plan actuel

1. **Numérotation cassée** : l'ordre réel est 0, 0b, 1, 1b, 2, 3, 4, 5, 5b, 6, 6b, 6b2, 6c,
   6d, 7, 8, 8b, 8c, 8d, 9, 9b, 10, 11, **15b, 15c**, 12, 13, 14, 14b, **18**, 15, 16, 17,
   **18** (deux sections 18), 19, 20. Les infrasons/ultrasons animaux ont été insérés
   après 11 mais gardent leur ancien numéro ; l'astronomie a été numérotée 18 puis les
   annexes ont gardé 15-18. Le « fil unique » de 0b (18 étapes) ne correspond pas non plus
   aux numéros de chapitre. Tout est à renuméroter, c'est mécanique.
2. **Deux logiques qui se croisent** : chronologique (2 → 7) puis thématique (8 → 18).
   C'est défendable (la charte accepte des actes), mais il faut que l'interface le montre :
   deux « livres » ou des actes nommés, pas une suite de 30 chapitres plats.
3. **Redites** : la formule de Sabine apparaît trois fois (1b, 10, glossaire), Doppler
   trois fois (1b, 6, 8d), Fletcher-Munson quatre fois, Kemp 1978 trois fois, la convention
   1540 m/s trois fois. Dans un script de plateau c'est voulu (rappel) ; dans une page,
   une seule occurrence développée + renvois.
4. **Glossaire** avec doublons (« Formant » ×2, « Écholocation » ×2) et sans ordre
   (alphabétique jusqu'à « Tonotopie », puis ajouts en vrac).
5. Le ch. 15 (expériences de plateau) mélange **manips physiques réelles** (cloche à vide,
   Rubens), **démos audio** (battements, Shepard) et **documents à projeter** (IMS,
   spectres HMI). Dans le dossier, la première catégorie devient des encadrés « à refaire
   chez soi / au labo » avec sécurité, la deuxième devient les **ateliers interactifs**,
   la troisième va dans les chapitres.

### Plan proposé pour le dossier (9 actes, 31 chapitres)

Ordre de lecture = ordre du script, réordonné pour que le fil « lieu → nombre → milieu →
équation → machine → oreille → société → étoile » soit linéaire, et pour que chaque
famille d'ateliers ait son chapitre d'appui.

| Acte | Chapitres (numérotation dossier) | Sections du script |
|---|---|---|
| **Ouverture** | 0 Le fil unique · 1 Qu'est-ce que le son · 2 Le minimum rigoureux (maths) · **3 Ce que fait une onde (nouveau, M4)** | 0b, 1, 1b, + nouveau |
| **I. Le lieu et le nombre** | 4 Préhistoire et archéoacoustique · 5 Antiquité · 6 Moyen Âge et Renaissance | 2, 3, 4 |
| **II. Le siècle de la mesure** | 7 XVIIe : Galilée, Boyle, Hooke, Newton, Sauveur · **8 Portrait I — Mersenne** · 9 XVIIIe-XIXe : cordes, plaques, Fourier, Helmholtz, Rayleigh | 5, 5b, 6 |
| **III. Le son comme musique** | 10 Série harmonique, gammes, tempéraments, systèmes du monde · **11 Des intervalles aux accords (nouveau, M3)** · 12 Instruments = conditions aux limites · 13 Battements (1er et 2e ordre) | 6b, nouveau, 6b, 6b2 |
| **IV. L'oreille fabrique** | 14 Psychoacoustique (hauteur, sonie, masquage, consonance) · **15 Où est le son ? (localisation, nouveau, M6)** · 16 Entendre : de Helmholtz à Kemp (+ sécurité auditive, M9) · 17 Le corps comme instrument (voix, bruits, écholocation humaine) | 6c, nouveau, 9, 9b |
| **V. La trace et la machine** | 18 Capturer le son 1857-1982 (+ transduction, M5) · **19 Le son devient nombre — Nyquist, FFT, MP3, 2026 (nouveau, M1, M7)** | 7, nouveau |
| **VI. Voir avec le son** | 20 De Spallanzani à l'échographe · **21 Portrait II — Langevin** · 22 Ultrasons : physique, machines, corps · 23 Doppler déplié | 8, 8b, 8c, 8d |
| **VII. Les autres scènes** | 24 Faire taire la pierre (Sabine) · 25 Le son hors du laboratoire (rite, ville, droit, cinéma, travail) · 26 Bruit, guerre, industrie, art · **27 Les intox du son (nouveau, M2)** | 10, 6d, 12, nouveau |
| **VIII. Les autres auditeurs** | 28 Bioacoustique (portail) · 29 Infrasons · 30 Ultrasons animaux | 11, 15b, 15c |
| **IX. Hors de l'air** | 31 Phonons · 32 Le son et l'espace · **33 Portrait III — Gurnett** · 34 Astronomie : les trois familles | 13, 14, 14b, 18 |
| **Clôture** | Frise · Glossaire (dédoublonné, trié) · phrase de fermeture | 16, 17, 20 |

Ça fait 35 chapitres en comptant l'ouverture et la clôture ; c'est plus que Lumière (30)
mais le script est ~1,6 fois plus long. Compagnons possibles, comme pour Lumière et
Sophismes : `portraits.html` (le script nomme ~60 savants datés, il y a matière à 25
fiches) et **un compagnon « Laboratoire » plein écran** pour la DAW et les ateliers micro
(voir `01-experiences-interactives.md`, §5).

## 4. Points factuels à vérifier ou à corriger (repérés à la lecture)

Ce n'est pas la vérification factuelle de la charte (elle se fera par agents
`verif-claims` à la construction) ; c'est ce qui a sauté aux yeux et **doit être dans
la liste de claims** ce jour-là. **État au 23 septembre 2026** : tout ce qui est marqué
❌ ou ⚠️ ci-dessous a été corrigé ou reformulé dans le script ; les deux 🔶 « à sourcer »
ont été vérifiés par recherche web (Mersenne 84 Hz : confirmé, corde de laiton à
l'unisson d'un tuyau d'orgue ; Videsen et al. 2026 : confirmé, *Annals of the New York
Academy of Sciences*, mai 2026) et précisés ; « Potosky » a été remplacé par le
silencieux de Maxim (1909). Les mentions ✅ restent telles quelles.

| Réf. | Affirmation | Statut pressenti | Note |
|---|---|---|---|
| 6b2 | Tierce majeure tempérée au-dessus de 440 Hz : battement du 2e ordre « ≈ 10 Hz » | ❌ **calcul faux** | 4 × 554,37 = 2217,5 ; 2217,5 − 2200 = **≈ 17,5 Hz**. L'ordre de grandeur « ~10 Hz » vient des tierces du registre médium (fa3-la3 ≈ 14 Hz, fa2-la2 ≈ 7 Hz). Corriger ou changer d'exemple. |
| 8d | Observateur à 30 m/s : « ~9 % — déjà une tierce mineure » | ⚠️ | 9 % ≈ un demi-ton et demi. C'est le **balancement total** approche → éloignement (×1,087 / ×0,913 ≈ 19 %) qui fait une tierce mineure. Reformuler. |
| 5b | « hertz avant le mot hertz (19ᵉ s., en hommage à Heinrich Hertz) » | ❌ | L'unité « hertz » est adoptée par la CEI en **1930**, par la CGPM en 1960. Hertz meurt en 1894 ; le mot est du XXe. |
| 5, 5b | Mersenne : « première détermination absolue d'une fréquence audible (environ 84 Hz) » | 🔶 à sourcer | Valeur qui circule sans source primaire claire ; Sauveur (1700) est souvent crédité de la première détermination absolue fiable (par battements). Chercher la page de l'*Harmonie universelle*. |
| 1 | Newton « trouve ~280 m/s, trop bas d'environ 16 % » | ⚠️ | Newton (1687) calcule 979 pieds/s ≈ **298 m/s** ; l'écart aux mesures d'époque est ~15 %. « 280 » semble un arrondi d'une autre source. |
| 6b2 | Rat, alarme 22 kHz / social 50 kHz | ✅ | Classique (Brudzynski, Knutson, Burgdorf). |
| 15c | Myotis lucifugus « 100 → 50 kHz » en recherche | ⚠️ → corrigé | C'est bien le chiffre de Griffin, Webster & Michael 1960 ; les enregistrements ultérieurs donnent ~80 → 40 kHz. Les deux sont maintenant cités. |
| 15c | « Elemans et al. 2022 » membranes vocales à 250 000 i/s | ⚠️ attribution | L'article est **Håkansson, Mikkelsen, Jakobsen & Elemans, PLOS Biology 2022** ; Elemans est dernier auteur. |
| 15c | Amolops tormotus | ⚠️ nomenclature | Espèce renommée **Odorrana tormota**. Les articles : Feng et al., Nature 2006 (émission ultra) ; Shen et al., Nature 2008 (localisation/réponse). Le script fusionne les deux en « Shen, Feng, Narins, Nature 2006 ». |
| 15c | Écailles de mites « ~67 % » (Neil et al. 2020) | ⚠️ → corrigé | 67 ± 9 % = écailles du **thorax**, Neil et al., *J. R. Soc. Interface* 2020 ; les ailes comme métamatériau = Neil et al., *PNAS* 2020. Les deux sont cités. |
| 15c | « Videsen et al. 2026 — slow clicks, espace actif ~70 km » | 🔶 | Référence de 2026 : à vérifier par DOI Crossref le jour de la construction, ne pas la garder si introuvable. |
| 18 | « Gurnett & Anderson 1977, HELIOS » | ⚠️ → corrigé | Deux articles existent : *Science* 194 (1976, Langmuir + type III) et *JGR* 82 (1977, premiers résultats Helios 1). Les deux sont cités. |
| 12 | « silencieux de Potosky » | 🔶 | Nom introuvable dans la littérature courante ; à vérifier ou supprimer. |
| 3 | Épidaure « ~14 000 puis ~17 000 places », « Polycléte le Jeune » | ✅ / coquille | Polyclète. Capacité à recouper. |
| 14 | Persée « 250 millions d'années-lumière » | ✅ (~240) | OK avec « environ ». |
| 8 | Fessenden 1914, iceberg à ~2 miles | ✅ | Essais d'avril 1914 sur l'USRC *Miami*. |
| 2 | Flûtes de Hohle Fels « ~40 000 ans » | ✅ (35-42 ka) | OK. |
| 13 | Phonon « popularisé dans le sillage de Tamm, 1932 » | ✅ | OK. |
| 6b | Comma pythagoricien 23,5 cents ; écarts 12-TET | ✅ | Vérifiés : quinte −1,96, tierce +13,7, mineure −15,6, ton −3,9, demi-ton −11,7. |
| 1b | Quinte tempérée 1,4983 ; demi-ton 1,05946 | ✅ | OK. |
| 6b2 | 1 cent à 440 Hz ≈ 0,25 Hz | ✅ | 0,254. |
| 1b | Newton-Laplace √1,4 × 280 ≈ 331 | ⚠️ | 331 sort de l'arithmétique **seulement si** on part de 280 ; avec la valeur de Newton (298) on obtient 353. La démonstration est un raccourci pédagogique, à présenter comme tel. |
| 6c | Haas « ~1949 », précédence | ✅ | Thèse 1949, JAES 1951/1972. |
| 7 | Siemens 1874, Wente 1916, Hughes 1878 | ✅ | OK. |

Coquilles vues (à corriger dans le texte au moment de la rédaction, sans mention) :
« Places des Vosges », « Polycléte », « un oreille qui voit », « Un timbale », « le
chauve-souris baisse », « Register » (→ registre), « diagnostique de densité », « vesiculaire »,
« peut rugueux » (→ peut être rugueux), « le sirène de Cagniard », « Maarsen » (→ Maarssen),
« coincidences », « Wilden Munson » (Wilden A. Munson, ok), « sinusoides ».

## 5. Formules : état pour la ligne « Se lit »

- ~45 blocs de formule ; **tous** portent déjà une prononciation entre guillemets. La
  transformation en `.fb-say` est mécanique. Reste à écrire les **gloses** `.say-x`
  (« ∂ se dit d rond », « ∇² se dit nabla deux ou laplacien », « Tr », « f_pe se dit f pé e »,
  « µ se dit mu », « τ se dit tau », « ℓ »).
- Formules **manquantes** que les nouveaux chapitres apporteront : Nyquist (`f_s > 2 f_max`),
  TFD (`X_k = Σ x_n e^{-2iπkn/N}`), incertitude temps-fréquence (`Δt·Δf ≳ 1`), inverse
  du carré (`I ∝ 1/r²`), addition de niveaux (`L = 10 log Σ 10^{L_i/10}`), absorption
  atmosphérique, ITD (`Δt ≈ (r/c)(θ + sin θ)`), cône de Mach (`sin α = c/v`), dissonance
  de Sethares.

## 6. Décisions prises (23 septembre 2026) et points restants

- **Un seul dossier**, tous les ateliers dans `index.html` ; un seul compagnon, `portraits.html` (~20 fiches de savants, comme Lumière et Sophismes). Pas de `laboratoire.html` : le plein écran se fait par l'API Fullscreen, avec une superposition CSS en repli.
- **Périmètre** : les 25 ateliers ★★★ plus la DAW (S34), soit 26 pour la première version ; les autres ensuite.
- **Ateliers pleine largeur, mobile et PC, activables et éteignables** (rien ne tourne avant le clic « Activer », un bouton « Éteindre » démonte le composant) ; plein écran pour les 22 gros ateliers (liste `FULL`). Détail : §10 de `01-experiences-interactives.md`.
- **Crédit** : « Provoxys, avec la participation de Samlepirate ». Titre : « Le Son — de la grotte au milieu interstellaire ». Numéro : XXXII (« Les Sources » repasse en XXXIII). Parcours III « Lois du réel & modèles ». Accent secondaire : teal (oscilloscope), à confirmer sur le hero.
- **Médias** : images générées (hero, illustrations de chapitre, vignettes) via `images_a_generer.md` ; enregistrements du domaine public (NOAA-PMEL pour les cétacés, NASA pour Mars, UIowa pour Voyager) ; photos Wikimedia sous CC BY / CC BY-SA, créditées sous l'image avec leur licence propre. Pas de captations de l'équipe prévues ; les cris de chauves-souris seront synthétisés et annoncés comme tels si aucun enregistrement libre n'est trouvé.
- **Thème visuel** : comme Entropie, Lumière et l'Ordinateur de 1983, un thème riche sur le son avec des rendus de haute qualité et performants — onde vivante calculée dans le hero, phosphore d'oscilloscope comme accent, bandeaux d'acte à fronts d'onde, numéros d'acte en figures de Chladni, spectrogramme procédural, vignettes vivantes ; budget de performance chiffré et bundle des ateliers chargé au premier clic. Brief complet : `08-design-son.md` ; prototype `design-preview.html` à produire avant la page.
- **Micro et DAW** : traitement 100 % local, permission demandée au clic, phrase de confidentialité dans la page.

- **Voix clonée (fiche intox 11)** : démonstration produite **en direct par l'animateur** pendant le live ; le dossier n'embarque aucun clone, la fiche garde les indices et la règle.
- **Activation** : image fixe + bouton « Activer » pour tous les ateliers, « Éteindre » pour démonter.
- **portraits.html** : 20 fiches — Mersenne, Langevin, Gurnett, puis Pythagore, Galilée, Boyle, Hooke, Newton, Sauveur, Laplace, Chladni, Fourier, Helmholtz, Doppler, Rayleigh, Sabine, Békésy, Kemp, Griffin, Shannon — plus un **easter egg Bob Marley** (fiche cachée, déclenchée discrètement ; accroche acoustique défendable : sound systems jamaïcains, dub et King Tubby, l'écho et la réverbération comme instruments, le sub-bass ; à valider avec Provoxys).

Plus rien n'est bloquant : la construction peut commencer quand l'utilisateur le demande (skill `nouveau-dossier`, cas « sans transcription »).
