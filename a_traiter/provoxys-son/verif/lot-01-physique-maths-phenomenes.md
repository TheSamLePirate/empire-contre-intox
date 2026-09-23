# Rapport de vérification — Lot 01 (physique de base, maths, phénomènes)

Agent `verif-claims`, 23 septembre 2026. Claims : `claims/01-physique-maths-phenomenes.md`. Sections : `#physique`, `#maths`, `#phenomenes`. Recalculs faits en Python (formule ISO 9613-1 validée contre la table 10 °C / 70 %).

**Comptes** : 20 ✅ · 5 ⚠️ (n° 8, 15, 18, 23, 24) · 0 🔶 · 0 ❌.

| # | Affirmation | Verdict | Référence / nuance | Sources | DOI |
|---|---|---|---|---|---|
| 1 | Vitesses par milieu (343, 331, 1480, 1500, 5000–6000, 1540) | ✅ | Eau 1481–1482 (20 °C) ; eau de mer 1450–1550 ; acier ~5930–5960 | en.wikipedia.org/wiki/Speed_of_sound ; fr.wikipedia.org/wiki/Vitesse_du_son | — |
| 2 | L_p = 20 log(p/20 µPa) | ✅ | p efficace ; 1 µPa dans l'eau | en.wikipedia.org/wiki/Sound_pressure | — (ANSI S1.1, IEC 61672) |
| 3 | Fletcher–Munson 1933 | ✅ | JASA 5, 82–108 | pubs.aip.org | 10.1121/1.1915637 |
| 4 | Newton 1687 ; 280 m/s modernes ; 968/979 pieds/s | ✅ | √(101325/1,2922) = 280,0 ; Finn 1964 : 968 (1687), 979 (1713) = 295–298 m/s ; écart 15–16 % | academicweb.nd.edu/~powers/ame.20231/finn1964.pdf | 10.1086/349791 (Finn, Isis 1964) |
| 5 | Laplace 1816, dès ~1802 ; γ 1,40 ; 331 | ✅ | Idée dès 1802 (Biot) ; formule 1816 ; exposé complet Mécanique céleste années 1820 | Finn 1964 | 10.1086/349791 |
| 6 | Colladon & Sturm 1826 | ✅ | Rolle–Thonon ~14 km ; cloche 65 kg ; 1435 m/s à ~8 °C ; observateur sur un **second bateau**, pas sur la rive ; prix Académie 1827 | institutions.ville-geneve.ch (brochure Colladon PDF) ; dosits.org (403) | 10.1007/978-3-7643-7990-2_36 (réimpression 2009) |
| 7 | 20 Hz–20 kHz ; parole 300–3400 ; max 2–5 kHz | ✅ | Écrire « bande téléphonique 300–3400 Hz » (ITU-T) plutôt que « bande utile de la parole » | en.wikipedia.org/wiki/Hearing_range ; humanstandards.org | — |
| 8 | Absorption ∝ f² ; 50 kHz meurt en quelques mètres | ⚠️ | f² vrai pour le terme classique seulement (pente réelle f¹–f^1,8 entre 500 Hz et 10 kHz) ; à 50 kHz : 1,7 dB/m (20 °C/70 %) → −17 dB/10 m : « quelques **dizaines** de mètres » | help.emd.dk (annexe windPRO ISO 9613-1) ; dougjam.github.io/demos/atmospheric-absorption | 10.1121/1.412989 (Bass et al. 1995) |
| 9 | Francois–Garrison, borate et magnésium | ✅ | Écrire « acide borique » et « sulfate de magnésium » ; JASA 72 (1982) I et II | resource.npl.co.uk/acoustics/techguides/seaabsorption | 10.1121/1.388170 ; 10.1121/1.388673 |
| 10 | D'Alembert 1747 | ✅ | Mémoire Berlin vol. 3 (1747, imprimé 1749) | en.wikipedia.org/wiki/D'Alembert's_formula | — |
| 11 | Lois de Mersenne, f₁ = (1/2L)√(τ/µ) | ✅ | Proportionnalités chez Mersenne ; forme fermée Taylor 1713 | en.wikipedia.org/wiki/Mersenne's_laws | — |
| 12 | Tuyaux ; clarinette impairs | ✅ | Surtout en registre chalumeau | newt.phys.unsw.edu.au/jw/clarinetacoustics.html | — |
| 13 | 12-TET : 1,05946 ; 1,4983 ; 1,96 cent | ✅ | Recalculé : 1,955 cent | en.wikipedia.org/wiki/Equal_temperament | — |
| 14 | Sabine 0,161 V/A | ✅ | 24 ln10/343 = 0,1611 ; Eyring pour salles mates | en.wikipedia.org/wiki/Reverberation ; acousplan.com | — |
| 15 | Écho distinct ≥ 50–80 ms ↔ mur > 10–15 m | ⚠️ | 50 ms ↔ 8,6 m ; 80 ms ↔ 13,7 m : écrire « ~9–14 m » ou « une dizaine de mètres au moins » | en.wikipedia.org/wiki/Precedence_effect | — |
| 16 | c(T) = 331,3√(1+T/273,15) ; +0,6 m/s/°C | ✅ | Pente 0,596–0,606 | en.wikipedia.org/wiki/Speed_of_sound | — |
| 17 | Réfraction jour / nuit | ✅ | Ajouter le rôle du vent | acs.psu.edu/drussell/demos/refract/refract.html | — |
| 18 | Pavillon ~3 cm, > 3 kHz | ⚠️ | Indices spectraux 4–16 kHz ; amplification 1,5–7 kHz ; hauteur du pavillon plutôt ~6 cm (3 cm = largeur). Écrire « quelques centimètres, au-dessus de 3–4 kHz » | umiacs.umd.edu (pinna notches) ; en.wikipedia.org/wiki/Head-related_transfer_function | — |
| 19 | Lueg 1936 | ✅ | Brevet US 2 043 416 : priorité 27 janv. 1933, délivré 9 juin 1936 → « déposé 1933, délivré 1936 » | patents.google.com/patent/US2043416A | — |
| 20 | Modes de salle ; 4 m → 43 Hz | ✅ | 42,9 Hz | en.wikipedia.org/wiki/Room_modes | — |
| 21 | Schroeder 1962, 2000√(T/V) | ✅ | Facteur 4000 dans les années 1950, révisé 2000 en 1962 ; JASA 34 (deux articles) ; revisité 1996 | pubs.aip.org | 10.1121/1.1909136 ; 10.1121/1.1909022 ; 10.1121/1.414868 |
| 22 | −6 dB / doublement ; 60+60 = 63 ; ×10 = +10 | ✅ | Sources incohérentes ; cohérentes en phase : +6 dB | engineeringtoolbox.com/adding-decibel-d_63.html | — |
| 23 | ISO 9613-1 à 20 °C/70 % : 5, 30, 100 dB/km ; 40 kHz > 1 dB/m | ⚠️ | Recalcul 20 °C/70 % : **5,0 / 23 / 78 dB/km** ; les 30 et 100 sont ceux de 20 °C/**50 %** (29,7 / 105) ; 40 kHz : 1,29 dB/m, hors domaine nominal (50 Hz–10 kHz) | help.emd.dk (windPRO) ; iso.org/standard/17426.html | 10.1121/1.412989 |
| 24 | Tonnerre grave par absorption des aigus | ⚠️ | Vrai en partie : spectre grave à la source, longueur du canal (grondement), réfraction. Écrire « en partie parce que » | weather.gov/safety/lightning-science-thunder | 10.1038/scientificamerican0775-80 (Few 1975, non lu) |
| 25 | Mars, Perseverance 2021, ~6 mbar | ✅ | 19 févr. 2021 ; 8 kHz : −40 dB en 8 m ; deux vitesses du son (~240/250 m/s) | pmc.ncbi.nlm.nih.gov/articles/PMC9132769 ; science.nasa.gov/mission/mars-2020-perseverance/sounds-of-mars | 10.1038/s41586-022-04679-0 (Maurice et al., Nature 605, 2022) |

## Synthèse
- **❌** : aucun.
- **⚠️** : 8 (f² à nuancer, « dizaines de mètres »), 15 (9–14 m), 18 (pavillon 4 kHz, dimension à préciser), 23 (chiffres = 50 % d'humidité ; à 70 % : 5 / 23 / 78), 24 (« en partie »).
- **Nuances** : 6 (second bateau), 7 (bande téléphonique), 12 (chalumeau), 19 (1933/1936), 21 (4000 → 2000), 22 (incohérentes).
- **Graphies** : borate → acide borique ; magnésium → sulfate de magnésium.
- **Limites** : DOSITS et AIP en 403 ; pavillon (dimension) resté sans source chiffrée.

## DOI vérifiés
10.1121/1.1915637 · 10.1121/1.388170 · 10.1121/1.388673 · 10.1121/1.1909022 · 10.1121/1.1909136 · 10.1121/1.414868 · 10.1121/1.412989 · 10.1086/349791 · 10.1038/s41586-022-04679-0 · 10.1038/scientificamerican0775-80 (existence seulement) · 10.1007/978-3-7643-7990-2_36
