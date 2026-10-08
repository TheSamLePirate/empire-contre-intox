# Dossier XXXI — Le Son : audit des nouveaux ateliers (S02 à S55) et des labos de formule

Vérification des chiffres affichés par les 27 ateliers ajoutés, faite par recherche web (agent `verif-claims`,
8 octobre 2026). Légende : ✅ confirmé · ⚠️ à nuancer · 🔶 débattu · ❌ erroné. « Calculé » : calcul refait à partir
de la norme ou de la table publiée.

| # | Atelier | Affirmation | Verdict | Valeur de référence et nuance | Source / DOI |
|---|---|---|---|---|---|
| 1 | S02 | Air 331,3 m/s à 0 °C, 343,2 m/s à 20 °C ; He ≈ 972 m/s et CO₂ ≈ 259 m/s à 0 °C | ✅ | Gaz parfaits recalculés ; l'hélium vaut ≈ 1 008 m/s à 20 °C : toujours préciser la température | [HyperPhysics](https://hyperphysics.gsu.edu/hbase/sound/souspe3.html) |
| 2 | S02 | Newton : 968 puis 979 pieds/s (≈ 295 puis 298 m/s) | ✅ | 1re édition 1687, 2e édition 1713 (Livre II, prop. 50) | Finn 1964, *Isis* 55:7-19, DOI 10.1086/349791 |
| 3 | S05, S15 | Correction d'extrémité 0,6133 r (sans bride) ; 0,8216 r (à bride) | ⚠️ | 0,6133 r : Levine & Schwinger 1948. Le ≈ 0,82 r à bride est la valeur statique classique (Rayleigh), pas de L&S ; valable pour ka ≪ 1 | DOI 10.1103/PhysRev.73.383 |
| 4 | S12 | Absorption de l'air 20 °C, 70 % : 5 / 23 / 78 dB/km à 1 / 4 / 8 kHz ; 1,29 dB/m à 40 kHz | ✅ | **Calculé** avec les équations de la norme : 4,98 ; 23,1 ; 77,6 dB/km ; 1 286 dB/km à 40 kHz. Tons purs | ISO 9613-1:1993 (payante ; pas de DOI) |
| 5 | S21 | Retard MP3 : 576 + 529 = 1 105 échantillons | ⚠️ | 576 = retard d'encodeur LAME ; 529 = retard de décodeur conventionnel (LAME dit 528, FFmpeg 528 + 1) | Hydrogenaudio, FFmpeg-devel |
| 6 | S35 | R128 −23 LUFS ; streaming ≈ −14 LUFS ; BS.1770-4 | ⚠️ | BS.1770-4 est remplacée par BS.1770-5 (11/2023). −14 LUFS : Spotify ; Apple ≈ −16 ; YouTube non sourcé | EBU R128 v5 ; ITU-R BS.1770-5 |
| 7 | S45 | 80 / 85 dB(A) actions, 87 limite ; NIOSH 85 dBA/3 dB ; OSHA 90 dBA/5 dB | ✅ | Directive 2003/10/CE art. 3, C. trav. R4431-2 ; NIOSH 1998 (3 dB ; 5 dB avant), 29 CFR 1910.95 | EUR-Lex 2003/10 ; CDC/NIOSH ; OSHA |
| 8 | S33 | Cloche FM de Chowning : 200 Hz, rapport 1:1,4, indice 10 → 0 | ✅ | Le rapport de Chowning est exactement 1:1,4 (porteuse 200, modulante 280), non 1,41 : l'atelier suit le texte de la page (1,41) | Chowning 1973, *JAES* 21(7):526-534 (pas de DOI) ; Karplus & Strong 1983, DOI 10.2307/3680062 ; Fletcher 1964, DOI 10.1121/1.1918933 |
| 9 | S10 | Épidaure : rang 0,746 × 0,367 m ; filtre passe-haut ≈ 500 Hz | 🔶 | Géométrie ✅ (Lokki 2013). Le filtre est celui de Declercq & Dekeyser 2007 (simulation) ; Lokki 2013, d'après des mesures, ne trouve pas d'atténuation notable sous 500 Hz | DOI 10.3813/AAA.918586 ; DOI 10.1121/1.2709842 |
| 10 | S40 | Précédence : sommation 0-1 ms, dominance 1-10 ms, écho 5-10 ms | ⚠️ | Bornes variables (écho 2-4 ms au casque, 5-10 ms au haut-parleur, 15-25 ms après accumulation) | Litovsky et al. 1999, DOI 10.1121/1.427914 |
| 11 | S47 | Clic 236 dB re 1 µPa rms ; DI 26,7 dB ; slow click ≈ 201 dB crête ; coda 161 dB rms | ⚠️ | Niveaux rms et crête mélangés : à préciser pour chacun. Zimmer : valeur modélisée hors axe | DOI 10.1121/1.1586258 (Møhl) ; 10.1121/1.1828501 (Zimmer) ; 10.1242/jeb.246442 (Jacobs) |
| 12 | S48 | SOFAR : axe ≈ 1 000 m, ≈ 1 483 m/s, angle limite 12,9° | ⚠️ | 12,9° est propre au profil du dossier (cos θ = c_axe/c_surface) ; écrire ≈ 12-13°, axe ≈ 900-1 000 m ; l'axe remonte vers la surface aux hautes latitudes | DOSITS (NOAA) |
| 13 | S50 | Hunga Tonga : 04 h 15 UTC, ≈ 310 m/s, ≈ 1,5 hPa, ≥ 3 tours ; Krakatoa : 7 passages à Glasgow | ⚠️ | Le 1,5 hPa vient de la microbarométrie du KNMI (non de Wageningen). 16 400 km par le pôle Nord. Glasgow : 11, 25, 48, 59, 84, 94, 121 h | Assink et al. 2022 (*Meteorologica*) ; Matoza et al., DOI 10.1126/science.abo7063 ; Wright et al., DOI 10.1038/s41586-022-05012-5 ; Gabrielson 2010 |
| 14 | S55 | Δν = (2∫dr/c)⁻¹ : 135 µHz mesuré ; 141,9 µHz sur Model S | ✅ | **Calculé** sur la table `cptrho.l5bi.d.15c` : 3 523 s, 141,9 µHz. L'écart avec le mesuré (135,1 ± 0,1 µHz) vient de la couche de surface. Le texte du dossier qui parle de « ≈ 135 µHz calculée » est à corriger | DOI 10.1126/science.272.5266.1286 ; DOI 10.1088/0004-637X/743/2/143 |
| 15 | S31, S38 | 22 shruti, rast en 53 commas, Caire 1932, douze lü, Shepard, Risset, triton | ⚠️ | Les 22 shruti ne sont pas 22 pas égaux ; 9-8-5-9-9-8-5 = 53, grille théorique ; le Congrès du Caire (28 mars-3 avril 1932) a débattu des quarts de ton sans les imposer ; les douze lü ne referment pas l'octave | Shepard 1964, DOI 10.1121/1.1919362 ; Deutsch 1986, DOI 10.2307/40285337 ; Kak, *22 Śrutis* |
| 16 | S37 | Bark, seuil de Terhardt, étalement de Schroeder, pré 5-20 ms, post 100-200 ms | ⚠️ | Étalement de Schroeder : asymptotes +25 / −10 dB/Bark ; « 14,5 + z » est un décalage seuil/masqueur d'un son pur, pas une pente | DOI 10.1121/1.385079 ; 10.1121/1.383662 ; 10.1109/5.842996 |
| 17 | S52 | Δf = 2 v f₀ cos θ / c ; c = 1 540 m/s ; Nyquist du Doppler pulsé = PRF/2 | ✅ | Angle recommandé < 60° | StatPearls (NBK580539) |

## Synthèse

- 7 ✅ · 9 ⚠️ · 1 ✅/🔶 (Épidaure) · 0 ❌.
- Corrigé dans les ateliers : formulation du 1,5 hPa de S50 (KNMI) ; texte de S55 (141,9 µHz calculé contre 135 µHz mesuré) ; texte de S10 (le filtre à 500 Hz est une hypothèse contestée).
- **Reste à répercuter dans le texte du dossier** : « ≈ 135 µHz calculée » (S55) ; filtre d'Épidaure (S10) ; « 16 % » de l'écart Newton–Laplace (le calcul donne 15,5 %) ; BS.1770-4 → BS.1770-5 ; rapport 1:1,4 de la cloche de Chowning (l'atelier S33 garde 1,41, comme le texte).
- Le contenu des **224 labos de formule** repose sur les formules du dossier et sur ses valeurs ; les modèles ajoutés par les rédacteurs (illustrations, ordres de grandeur) sont dits dans le champ « limites » de chaque labo.

## Enregistrements réels ajoutés (8 octobre 2026)

Deux extraits audio de **NOAA Fisheries** (Northeast Fisheries Science Center, Passive Acoustics Branch), page
« Sounds in the Ocean » — https://www.fisheries.noaa.gov/national/science-data/sounds-ocean. Les fichiers sont publiés
par un organisme fédéral américain ; la page n'indique pas de licence propre (elle propose seulement un format de
citation) : ils restent crédités à NOAA Fisheries et **ne sont pas couverts par la licence CC BY-NC-ND du site**.
Lieu et date de l'enregistrement du cachalot ne sont pas donnés par la source.

| Fichier du dépôt | Source (URL) | Contenu | Taille | Utilisé par |
|---|---|---|---|---|
| `provoxys/son/assets/sons/cachalot-noaa.mp3` | https://www.fisheries.noaa.gov/s3/2023-04/Phma-clicks-NOAA-PAGroup-01-sperm-clip.mp3 | clics de cachalot, 6,4 s, mono 48 kHz, non transposé | 111 Ko | S47, S18, S34 |
| `provoxys/son/assets/sons/rorqual-bleu-noaa-x8.mp3` | https://www.fisheries.noaa.gov/s3/2023-04/Cornell-NY-LongIsland-20090123-000000-LPfilter20-amplified-x8speed-blue-clip.mp3 | appel de rorqual bleu, 93 s, mono 8 kHz, filtré, amplifié et **accéléré ×8 par la source** | 552 Ko | S48, S18, S34 |

Les pages PMEL de NOAA (pmel.noaa.gov/acoustics) ne contiennent pas de cachalot ; seuls des rorquals, accélérés ×10, y figurent.
