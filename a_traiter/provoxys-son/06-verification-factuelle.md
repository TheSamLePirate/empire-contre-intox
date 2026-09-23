# Vérification factuelle — dossier « Le Son » (Provoxys)

Audit consolidé au format `sources/dossier-*.md`, prêt à déplacer dans `sources/` le jour de la construction du dossier. Base : le script HTML corrigé (`script-live-son-encyclopedique-1.html`) et sa version Markdown de travail (`script-live-son.md`), découpés en **237 affirmations** (`claims/01…11`). Onze agents `verif-claims` (effort high, DOI résolus un par un sur Crossref), 23 septembre 2026. Rapports détaillés, une entrée par affirmation : `verif/lot-01…11.md`.

## Bilan global

| Lot | Thème | ✅ | ⚠️ | 🔶 | ❌ | Non vérifié | DOI vérifiés |
|---|---|---|---|---|---|---|---|
| 01 | Physique, maths, phénomènes | 20 | 5 | 0 | 0 | 0 | 11 |
| 02 | Préhistoire → XVIIe, Mersenne | 15 | 7 | 0 | **1** | 0 | 8 |
| 03 | XVIIIe–XIXe, musique, accords, battements | 16 | 9 | 0 | **1** | 1 | 20 |
| 04 | Psychoacoustique, localisation, sociétés | 18 | 3 | 0 | 0 | 0 | 24 |
| 05 | Enregistrement, transduction, numérique | 14 | 6 | 0 | 0 | 0 | 16 |
| 06 | Sonar, Langevin, ultrasons, Doppler | 18 | 4 | 0 | 0 | 0 | 17 |
| 07 | Oreille, sécurité, voix, salles | 13 | 7 | 0 | 0 | 0 | 20 |
| 08 | Bioacoustique, infrasons | 16 | 6 | 1 | 0 | 0 | 28 |
| 09 | Ultrasons animaux | 7 | 10 | 0 | **2** | 1 | 40 |
| 10 | Bruit, industrie, intox | 11 | 7 | 1 | 0 | 0 | 15 |
| 11 | Phonons, espace, astronomie | 12 | 5 | 0 | 0 | 0 | 35 |
| **Total** | **237** | **160** | **69** | **2** | **4** | **2** | **~230 (uniques ≈ 215)** |

Le lot 10 relève en plus cinq erreurs de chiffre ou d'attribution dans des fiches classées ⚠️ (voir « corrections »).

## ❌ Erreurs corrigées dans les deux scripts

1. **Épidaure** : « ~14 000 puis ~17 000 places » → ≈ 6 000 places au IVe s., 13 000–14 000 après l'extension du IIe s. av. n. è. (Éphorie d'Argolide, Diazoma).
2. **Musaraignes** : « cris 30–100 kHz » → gazouillis tonals surtout audibles, 1er harmonique 4–8 kHz, énergie sous 20 kHz (Siemers et al. 2009, 10.1098/rsbl.2009.0378).
3. **Odorrana tormota, Shen et al. 2008** : ce sont les femelles qui émettent l'appel de cour et les mâles qui le localisent (< 1°), pas l'inverse (10.1038/nature06719).
4. **Rameau et Sauveur** : Rameau n'a pas lu Sauveur en écrivant le Traité (1722) ; il le découvre ensuite (Génération harmonique, 1737).
5. **Emoto, 0,02 Pa** : « vingt millionièmes de la pression atmosphérique » → deux dix-millionièmes (2 × 10⁻⁷).

## ⚠️ Corrections de chiffre, de date ou d'attribution appliquées

Physique : absorption d'un 50 kHz en quelques **dizaines** de mètres ; ISO 9613-1 à 20 °C / 70 % : 5 / 23 / 78 dB/km (les 30 et 100 sont ceux de 50 %) ; écho distinct = mur à ~9–14 m ; pavillon « quelques centimètres, au-dessus de 3–4 kHz » ; tonnerre grave « en partie » par absorption ; Lueg brevet déposé 1933, délivré 1936.
Histoire : Jurine (1794) montre le rôle de l'oreille, Spallanzani confirme ; Langevin–Chilowsky = émetteur capacitif 1915, quartz = Langevin seul 1917 ; cornistes de Buys Ballot ; Chladni en tournée à Paris en 1808, prix de l'Institut à Sophie Germain 1816 ; Zarlino codifie la tierce 5/4 ; Sauveur nomme l'acoustique en 1701 ; Boyle : montre à tic-tac éteint, cloche seulement affaiblie ; Cimento, Cassini (1677), Derham 337–351 m/s et Mersenne dispersé ; hertz : CEI années 1930 ; « laiton » et « or » retirés du protocole et des cordes de Mersenne (non retrouvés dans le texte).
Musique : Sethares 1998 (2e éd. 2005) ; moteur = quatre cylindres ; tempo ~85–120 bpm ; seuil pouls / rugosité ~15–30 Hz ; rugosité jusqu'à ~300 Hz et hauteur dès ~30 Hz ; /s/ « riche en aigu (4–10 kHz) » ; règle des intervalles graves donnée en hertz, sans notes (convention d'octave) ; en-tête d'accordeur en notation française (la3 = 440 Hz).
Psychoacoustique : ISO 226 (2003, réédition 2023) ; RASTI obsolète (2011), STIPA ; Lnight.
Numérique : Wente chez Western Electric ; RCA PB-31 (1931) puis 44A ; Denon janvier 1971, DN-023R 1972 ; borne de Gabor 1/(4π) avec des écarts-types ; Opus co-développé avec Skype ; « Exxon » retiré (prospection sismique pétrolière).
Oreille : implants commercialisés dans les années 1980 (FDA 1984–85) ; OMS 53 dB Lden = seuil de gêne forte, risque cardiaque +8 % par 10 dB ; douleur 120–140 dB ; f0 masculine ~90–155 Hz ; Sabine conseiller acoustique de Symphony Hall ; régie 0,2–0,3 s.
Vivant : Heffner — souris ~2–85 kHz, dauphin hors Heffner (sous l'eau) ; grillon 15–100 kHz ; moustique femelle ~400–500 Hz, mâle ~600 ; canons à air 220–230 dB crête par canon ; girafe retirée des infrasons (Baotic 2015) ; ncpaprop ; sub-bass 20–70 Hz, orgue de 32 pieds à 16 Hz ; ~1 500 espèces de chauves-souris ; Griffin & Galambos 1941–42 ; cris (pas clics) de 120–140 dB SPL à 10 cm, Jones & Holderied 2007 ; Blest, Collett & Pye 1963 ; faisceau de Tursiops ~10°, lèvres phoniques sous le melon ; buzz jusqu'à ~500 clics/s ; guacharo = Suthers & Hector 1985, salanganes = Griffin & Suthers 1970 / Griffin & Thompson 1982 ; fovéa du rhinolophe ~83 kHz.
Intox : Horowitz & Puleo 1999 ; Iaccarino 2016 = lumière, Martorell 2019 = son ; essai HOPE achevé été 2026, résultats non publiés ; « OM du Soleil » ×42 000 ≈ 15 octaves ; méta-analyse binaurale 2019 = effet moyen (g ≈ 0,45) dépendant des protocoles, revue EEG 2023 non concluante ; Maxim 1909 = silencieux d'arme ; citation de Tesla sans date ; état des lieux de La Havane daté (mises à jour 2024–2026).
Espace : phonon = concept de Tamm 1930, mot de Frenkel 1932 ; PWS = Plasma Wave Subsystem, PI Scarf puis Gurnett (1988) ; ~300–400 Hz dans l'héliogaine ; whistlers de Jupiter = l'une des deux preuves avec les images de nuit ; modes p ~1–5 mHz, pic ~3 mHz, précision ≈ 3 × 10⁻⁶ ; f_pe de centaines de MHz dans la basse couronne ; Fabian, Sanders et al. 2003.

## Non vérifié (à sourcer avant publication)

- Règle des orchestrateurs sur les intervalles graves (Adler, Piston) — reformulée en ordres de grandeur.
- Répulsifs à ultrasons : « habituation en 3–7 jours » et « > 160 dB » — reformulés (« quelques jours », « niveaux sans rapport avec un appareil domestique »).
- Bande « 30–90 kHz » des clics de *Melese* ; 228 dB p-p du grand dauphin ; pics 115 / 250 kHz du dauphin à bec blanc ; « 103 dB SPL à 10 cm » des petits rongeurs ; audiogramme « 1,5–92 kHz » de la souris — marqués comme ordres de grandeur.
- Dimension du pavillon (~3 cm) ; « 6 000 francs » de Napoléon à Chladni (non chiffré) ; « grêle des anneaux » de Cassini.

## Graphies et attributions corrigées

Louis Jurine · Terfenol-D · Iégor Reznikoff · Polyclète · Lnight · partiels inharmoniques · ncpaprop · ter Hofstede · Krigar-Menzel (tube de Rubens) · Håkansson et al. 2022 · Odorrana tormota · Plasma Wave Subsystem · Fabian, Sanders et al. 2003 · Zheleznyakov (une seule translittération) · glissando de Shepard-Risset.

## Sources qui ont refusé la lecture automatique

DOSITS, AES e-lib, ISO.org, EUR-Lex (lu via INERIS/SSTIE + Légifrance), CTBTO, dni.gov, Genasys, MoMA, OpenLearn, PMC (captcha), Wiley (Gurnett & Anderson 1977), Scholarpedia. Les faits correspondants sont recoupés par d'autres pages ouvertes ; garder l'URL officielle dans `sources.html` en le sachant.

## Références DOI

La liste complète (≈ 215 DOI uniques, tous résolus sur Crossref avec titre / revue / volume concordants) est dans chaque `verif/lot-NN.md`, section « DOI vérifiés » ; elle alimentera `sources/refs-doi-<n>-son.md`.
