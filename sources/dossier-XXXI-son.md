# Dossier XXXI — Le Son : de la grotte au milieu interstellaire

**Dossier :** [`provoxys/son/index.html`](../provoxys/son/index.html)  
**Équipe :** Provoxys, avec la participation de Samlepirate  
**Audit :** 23 septembre 2026 (onze agents `verif-claims` en parallèle, effort élevé), consolidé le 24 septembre 2026 pour l'appareil critique.

**Méthode.** Le texte de référence du dossier (le script du live, `script-live-son.md`, et sa version encyclopédique) a été découpé en **237 affirmations**, réparties en onze lots thématiques. Chaque lot a été confié à un agent de vérification : recherche des sources primaires ou institutionnelles, recalcul des valeurs numériques en Python quand c'était possible (absorption ISO 9613-1, écarts en cents, battements, longueurs d'onde, écart interaural, rapport signal/bruit, Doppler), et résolution de chaque DOI sur l'API Crossref (titre, revue, auteurs, volume, pages). Les 220 DOI distincts ont été **résolus une seconde fois** le 24 septembre 2026 à la rédaction de ce fichier : tous répondent, aucun n'a été retiré. Le détail des références est dans [`refs-doi-XXXI-son.md`](refs-doi-XXXI-son.md).

**Légende des verdicts :** ✅ confirmé · ⚠️ nuancé ou corrigé · 🔶 débattu · ❌ erroné (corrigé dans le dossier) · non vérifié (marqué comme tel, reformulé en ordre de grandeur)

**Décompte.** **609 affirmations : 489 ✅ · 109 ⚠️ · 5 🔶 · 4 ❌ · 2 non vérifiées**, dont 362 ajoutées le 24 septembre 2026 avec l'audit de complétude physique (347 dans les 42 clés de physique, 15 dans le glossaire complémentaire : 320 ✅ · 39 ⚠️ · 3 🔶 · 0 ❌), plus **10 corrections complémentaires** (C02–C15) documentées à part. Premier audit : 247 affirmations, **169 ✅ · 70 ⚠️ · 2 🔶 · 4 ❌ · 2 non vérifiées** — les 237 du script en onze lots, plus les 10 de la fiche 21 du compagnon *Portraits* (Bob Marley et les ingénieurs du dub), vérifiées le 24 septembre 2026. Trois lignes que les rapports d'agent notaient ✅ ont quand même donné lieu à une correction du script (Sethares 1998, Opus co-développé avec Skype, « Exxon » retiré de l'histoire de l'Auto-Tune) : elles sont comptées ⚠️ ici, ce qui recale le total sur le bilan consolidé. La répartition par lot peut différer d'une unité de celle des rapports.

Les URL ont été contrôlées le 24 septembre 2026. Plusieurs sites refusent la lecture automatique (DOSITS, AES, ISO, EUR-Lex, Légifrance, CTBTO, PubMed par moments, AIP, Science) : les faits correspondants ont été recoupés sur d'autres pages ouvertes, et l'URL officielle est gardée.

---

## Lot 01 — Physique, maths & phénomènes

**Comptes :** 20 ✅ · 5 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 1.1 | Vitesses par milieu (343, 331, 1480, 1500, 5000–6000, 1540) | ✅ | Eau 1481–1482 (20 °C) ; eau de mer 1450–1550 ; acier ~5930–5960 | [en.wikipedia.org/wiki/Speed_of_sound](https://en.wikipedia.org/wiki/Speed_of_sound) · [fr.wikipedia.org/wiki/Vitesse_du_son](https://fr.wikipedia.org/wiki/Vitesse_du_son) |
| 1.2 | L_p = 20 log(p/20 µPa) | ✅ | p efficace ; 1 µPa dans l'eau | [en.wikipedia.org/wiki/Sound_pressure](https://en.wikipedia.org/wiki/Sound_pressure) · (ANSI S1.1, IEC 61672) |
| 1.3 | Fletcher–Munson 1933 | ✅ | JASA 5, 82–108 | [pubs.aip.org](https://pubs.aip.org) · DOI [10.1121/1.1915637](https://doi.org/10.1121/1.1915637) |
| 1.4 | Newton 1687 ; 280 m/s modernes ; 968/979 pieds/s | ✅ | √(101325/1,2922) = 280,0 ; Finn 1964 : 968 (1687), 979 (1713) = 295–298 m/s ; écart 15–16 % | [academicweb.nd.edu/~powers/ame.20231/finn1964.pdf](https://academicweb.nd.edu/~powers/ame.20231/finn1964.pdf) · DOI [10.1086/349791](https://doi.org/10.1086/349791) · (Finn, Isis 1964) |
| 1.5 | Laplace 1816, dès ~1802 ; γ 1,40 ; 331 | ✅ | Idée dès 1802 (Biot) ; formule 1816 ; exposé complet Mécanique céleste années 1820 | Finn 1964 · DOI [10.1086/349791](https://doi.org/10.1086/349791) |
| 1.6 | Colladon & Sturm 1826 | ✅ | Rolle–Thonon ~14 km ; cloche 65 kg ; 1435 m/s à ~8 °C ; observateur sur un **second bateau**, pas sur la rive ; prix Académie 1827 | [institutions.ville-geneve.ch (brochure Colladon PDF)](https://institutions.ville-geneve.ch) · [dosits.org (403)](https://dosits.org) · DOI [10.1007/978-3-7643-7990-2_36](https://doi.org/10.1007/978-3-7643-7990-2_36) · (réimpression 2009) |
| 1.7 | 20 Hz–20 kHz ; parole 300–3400 ; max 2–5 kHz | ✅ | Écrire « bande téléphonique 300–3400 Hz » (ITU-T) plutôt que « bande utile de la parole » | [en.wikipedia.org/wiki/Hearing_range](https://en.wikipedia.org/wiki/Hearing_range) · [humanstandards.org](https://humanstandards.org) |
| 1.8 | Absorption ∝ f² ; 50 kHz meurt en quelques mètres | ⚠️ | f² vrai pour le terme classique seulement (pente réelle f¹–f^1,8 entre 500 Hz et 10 kHz) ; à 50 kHz : 1,7 dB/m (20 °C/70 %) → −17 dB/10 m : « quelques **dizaines** de mètres » | [help.emd.dk (annexe windPRO ISO 9613-1)](https://help.emd.dk) · [dougjam.github.io/demos/atmospheric-absorption](https://dougjam.github.io/demos/atmospheric-absorption) · DOI [10.1121/1.412989](https://doi.org/10.1121/1.412989) · (Bass et al. 1995) |
| 1.9 | Francois–Garrison, borate et magnésium | ✅ | Écrire « acide borique » et « sulfate de magnésium » ; JASA 72 (1982) I et II | [resource.npl.co.uk/acoustics/techguides/seaabsorption](http://resource.npl.co.uk/acoustics/techguides/seaabsorption/) · DOI [10.1121/1.388170](https://doi.org/10.1121/1.388170) · DOI [10.1121/1.388673](https://doi.org/10.1121/1.388673) |
| 1.10 | D'Alembert 1747 | ✅ | Mémoire Berlin vol. 3 (1747, imprimé 1749) | [en.wikipedia.org/wiki/D'Alembert's_formula](https://en.wikipedia.org/wiki/D'Alembert's_formula) |
| 1.11 | Lois de Mersenne, f₁ = (1/2L)√(τ/µ) | ✅ | Proportionnalités chez Mersenne ; forme fermée Taylor 1713 | [en.wikipedia.org/wiki/Mersenne's_laws](https://en.wikipedia.org/wiki/Mersenne's_laws) |
| 1.12 | Tuyaux ; clarinette impairs | ✅ | Surtout en registre chalumeau | [newt.phys.unsw.edu.au/jw/clarinetacoustics.html](https://newt.phys.unsw.edu.au/jw/clarinetacoustics.html) |
| 1.13 | 12-TET : 1,05946 ; 1,4983 ; 1,96 cent | ✅ | Recalculé : 1,955 cent | [en.wikipedia.org/wiki/Equal_temperament](https://en.wikipedia.org/wiki/Equal_temperament) |
| 1.14 | Sabine 0,161 V/A | ✅ | 24 ln10/343 = 0,1611 ; Eyring pour salles mates | [en.wikipedia.org/wiki/Reverberation](https://en.wikipedia.org/wiki/Reverberation) · [acousplan.com](https://acousplan.com) |
| 1.15 | Écho distinct ≥ 50–80 ms ↔ mur > 10–15 m | ⚠️ | 50 ms ↔ 8,6 m ; 80 ms ↔ 13,7 m : écrire « ~9–14 m » ou « une dizaine de mètres au moins » | [en.wikipedia.org/wiki/Precedence_effect](https://en.wikipedia.org/wiki/Precedence_effect) |
| 1.16 | c(T) = 331,3√(1+T/273,15) ; +0,6 m/s/°C | ✅ | Pente 0,596–0,606 | [en.wikipedia.org/wiki/Speed_of_sound](https://en.wikipedia.org/wiki/Speed_of_sound) |
| 1.17 | Réfraction jour / nuit | ✅ | Ajouter le rôle du vent | [acs.psu.edu/drussell/demos/refract/refract.html](https://acs.psu.edu/drussell/demos/refract/refract.html) |
| 1.18 | Pavillon ~3 cm, > 3 kHz | ⚠️ | Indices spectraux 4–16 kHz ; amplification 1,5–7 kHz ; hauteur du pavillon plutôt ~6 cm (3 cm = largeur). Écrire « quelques centimètres, au-dessus de 3–4 kHz » | [umiacs.umd.edu (pinna notches)](https://umiacs.umd.edu) · [en.wikipedia.org/wiki/Head-related_transfer_function](https://en.wikipedia.org/wiki/Head-related_transfer_function) |
| 1.19 | Lueg 1936 | ✅ | Brevet US 2 043 416 : priorité 27 janv. 1933, délivré 9 juin 1936 → « déposé 1933, délivré 1936 » | [patents.google.com/patent/US2043416A](https://patents.google.com/patent/US2043416A) |
| 1.20 | Modes de salle ; 4 m → 43 Hz | ✅ | 42,9 Hz | [en.wikipedia.org/wiki/Room_modes](https://en.wikipedia.org/wiki/Room_modes) |
| 1.21 | Schroeder 1962, 2000√(T/V) | ✅ | Facteur 4000 dans les années 1950, révisé 2000 en 1962 ; JASA 34 (deux articles) ; revisité 1996 | [pubs.aip.org](https://pubs.aip.org) · DOI [10.1121/1.1909136](https://doi.org/10.1121/1.1909136) · DOI [10.1121/1.1909022](https://doi.org/10.1121/1.1909022) · DOI [10.1121/1.414868](https://doi.org/10.1121/1.414868) |
| 1.22 | −6 dB / doublement ; 60+60 = 63 ; ×10 = +10 | ✅ | Sources incohérentes ; cohérentes en phase : +6 dB | [engineeringtoolbox.com/adding-decibel-d_63.html](https://engineeringtoolbox.com/adding-decibel-d_63.html) |
| 1.23 | ISO 9613-1 à 20 °C/70 % : 5, 30, 100 dB/km ; 40 kHz > 1 dB/m | ⚠️ | Recalcul 20 °C/70 % : **5,0 / 23 / 78 dB/km** ; les 30 et 100 sont ceux de 20 °C/**50 %** (29,7 / 105) ; 40 kHz : 1,29 dB/m, hors domaine nominal (50 Hz–10 kHz) | [help.emd.dk (windPRO)](https://help.emd.dk) · [iso.org/standard/17426.html](https://iso.org/standard/17426.html) · DOI [10.1121/1.412989](https://doi.org/10.1121/1.412989) |
| 1.24 | Tonnerre grave par absorption des aigus | ⚠️ | Vrai en partie : spectre grave à la source, longueur du canal (grondement), réfraction. Écrire « en partie parce que » | [weather.gov/safety/lightning-science-thunder](https://weather.gov/safety/lightning-science-thunder) · DOI [10.1038/scientificamerican0775-80](https://doi.org/10.1038/scientificamerican0775-80) · (Few 1975, non lu) |
| 1.25 | Mars, Perseverance 2021, ~6 mbar | ✅ | 19 févr. 2021 ; 8 kHz : −40 dB en 8 m ; deux vitesses du son (~240/250 m/s) | [pmc.ncbi.nlm.nih.gov/articles/PMC9132769](https://pmc.ncbi.nlm.nih.gov/articles/PMC9132769) · [science.nasa.gov/mission/mars-2020-perseverance/sounds-of-mars](https://science.nasa.gov/mission/mars-2020-perseverance/sounds-of-mars) · DOI [10.1038/s41586-022-04679-0](https://doi.org/10.1038/s41586-022-04679-0) · (Maurice et al., Nature 605, 2022) |

**Synthèse du lot**

- **❌** : aucun.
- **⚠️** : 8 (f² à nuancer, « dizaines de mètres »), 15 (9–14 m), 18 (pavillon 4 kHz, dimension à préciser), 23 (chiffres = 50 % d'humidité ; à 70 % : 5 / 23 / 78), 24 (« en partie »).
- **Nuances** : 6 (second bateau), 7 (bande téléphonique), 12 (chalumeau), 19 (1933/1936), 21 (4000 → 2000), 22 (incohérentes).
- **Graphies** : borate → acide borique ; magnésium → sulfate de magnésium.
- **Limites** : DOSITS et AIP en 403 ; pavillon (dimension) resté sans source chiffrée.

## Lot 02 — Préhistoire, Antiquité, XVIIe siècle & Mersenne

**Comptes :** 15 ✅ · 7 ⚠️ · 0 🔶 · 1 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 2.1 | Flûtes de Hohle Fels ~40 000 ans | ✅ | Radius de vautour, 5 trous, Nature 460 (2009) : ≥ 35 000 ¹⁴C ≈ 40 000 cal. ; Geißenklösterle 42–43 ka (Higham 2012) ; les flûtes en ivoire ne sont pas « en os d'oiseau » | [en.wikipedia.org/wiki/Paleolithic_flute](https://en.wikipedia.org/wiki/Paleolithic_flute) · [en.wikipedia.org/wiki/Hohle_Fels](https://en.wikipedia.org/wiki/Hohle_Fels) · DOI [10.1038/nature08169](https://doi.org/10.1038/nature08169) · DOI [10.1016/j.jhevol.2012.03.003](https://doi.org/10.1016/j.jhevol.2012.03.003) |
| 2.2 | Archéoacoustique : Reznikoff & Dauvois 1980s ; Artsoundscapes (Díaz-Andreu), Till ; corrélation statistique | ⚠️ | BSPF 1988 (campagnes 1983, 1985) ; Reznikoff : 80–90 % par comptage, pas un test statistique → « corrélation mesurée » ; première approche quantitative Díaz-Andreu & García Benito 2012 (Valltorta, abris) ; Artsoundscapes = ERC 2018–2025 ; **Till non vérifié comme membre** (site UB en 500) → « et, en parallèle, Rupert Till ». Graphie : **Iégor** Reznikoff | [persee.fr/doc/bspf_0249-7638_1988_num_85_8_9349](https://www.persee.fr/doc/bspf_0249-7638_1988_num_85_8_9349) · [cordis.europa.eu/project/id/787842](https://cordis.europa.eu/project/id/787842) · [pure.hud.ac.uk/en/persons/rupert-till](https://pure.hud.ac.uk/en/persons/rupert-till) · DOI [10.3406/bspf.1988.9349](https://doi.org/10.3406/bspf.1988.9349) · DOI [10.1016/j.jas.2012.06.034](https://doi.org/10.1016/j.jas.2012.06.034) |
| 2.3 | Yangshao, vaguelettes, frise Année du son | ✅ | sound2020.org date 6000 av. (antérieur à la culture, 5000–3000) : ne pas reprendre ce chiffre | [sound2020.org/acoustics/history](https://sound2020.org/acoustics/history) |
| 2.4 | Bianzhong du marquis Yi, Ve s. ; lü et calendrier | ✅ | 64 cloches, 433 av. n. è., C2–D7, 3 755 caractères (UNESCO) ; lien lü–mois postérieur (Han) | [unesco.org/en/memory-world/suizhou-bianzhong-marquis-yi-zeng](https://unesco.org/en/memory-world/suizhou-bianzhong-marquis-yi-zeng) · [soundingchina.fas.harvard.edu](https://soundingchina.fas.harvard.edu) |
| 2.5 | Nada, svara, 22 shruti | ✅ | Nātyaśāstra (~200 av.–200 apr.) ; « classique », pas « védique » | [en.wikipedia.org/wiki/Shruti_(music)](https://en.wikipedia.org/wiki/Shruti_(music)) |
| 2.6 | Lyres d'Ur ; trompettes de Toutânkhamon | ✅ | ≈ 2550–2450 av. ; argent et bronze, jouées BBC 16 avril 1939 | [en.wikipedia.org/wiki/Lyres_of_Ur](https://en.wikipedia.org/wiki/Lyres_of_Ur) · [en.wikipedia.org/wiki/Tutankhamun's_trumpets](https://en.wikipedia.org/wiki/Tutankhamun's_trumpets) |
| 2.7 | Pythagore c. 570–490 ; forgeron ; 2:1, 3:2, 4:3 | ✅ | SEP : la forge est « clairement fausse » physiquement (hauteur ∝ poids du marteau : non) ; rapports attestés chez Philolaos ; bon encadré anti-intox | [plato.stanford.edu/entries/pythagoras](https://plato.stanford.edu/entries/pythagoras) · [en.wikipedia.org/wiki/Pythagorean_hammers](https://en.wikipedia.org/wiki/Pythagorean_hammers) |
| 2.8 | Archytas c. 428–347 ; Aristote De anima, Problèmes | ⚠️ | SEP : Archytas né 435–410, mort 360–350 → « c. 430–350 » ; *Problèmes* pseudo-aristotéliciens | [plato.stanford.edu/entries/archytas](https://plato.stanford.edu/entries/archytas) · [philarchive.org/archive/JOHAOS](https://philarchive.org/archive/JOHAOS) |
| 2.9 | Épidaure : Polyclète le Jeune, 330–300, **14 000 puis 17 000** ; Declercq < 500 Hz | ❌ (capacité) | Cavea basse fin IVe s. (≈ 6 000), extension IIe s. → **13 000–14 000** (Éphorie d'Argolide, Diazoma) ; attribution à Polyclète = Pausanias seul ; Declercq & Dekeyser JASA 121 (2007) : ~500 Hz confirmé + hauteur virtuelle | [argolisculture.gr](https://argolisculture.gr) · [diazoma.gr](https://diazoma.gr) · [sciencedaily.com/releases/2007/04/070404162237.htm](https://sciencedaily.com/releases/2007/04/070404162237.htm) · DOI [10.1121/1.2709842](https://doi.org/10.1121/1.2709842) |
| 2.10 | Vitruve, livre V | ✅ | c. 30–20 av. ; V.3, V.5 (vases, d'après Aristoxène), V.8 ; aucun vestige certain de vases, Vitruve dit qu'ils n'étaient pas utilisés à Rome | [perseus.tufts.edu (Vitr. 5.3, 5.5, 5.8)](https://www.perseus.tufts.edu/hopper/) |
| 2.11 | Boèce c. 480–524 | ✅ | IEP ; certains 525/526 | [iep.utm.edu/boethius](https://iep.utm.edu/boethius) |
| 2.12 | Notre-Dame ; Al-Fârâbî, Avicenne (médecine) | ⚠️ | Le lien médecine est **avicennien** (pouls / consonances dans le Canon), pas documenté chez al-Fârâbî | [en.wikipedia.org/wiki/Notre-Dame_school](https://en.wikipedia.org/wiki/Notre-Dame_school) · [en.wikipedia.org/wiki/Kitab_al-Musiqa_al-Kabir](https://en.wikipedia.org/wiki/Kitab_al-Musiqa_al-Kabir) · [musicologie.org (ibn_sina)](https://musicologie.org) |
| 2.13 | Vincenzo Galilei mesure ; Benedetti 1585 | ✅ | Dialogo 1581 ; mesures de tension c. 1588–89 (octave = poids ×4) ; Benedetti : lettres c. 1563, imprimées 1585 | [lindahall.org (Vincenzo Galilei)](https://lindahall.org) · [arxiv.org/pdf/2512.23259](https://arxiv.org/pdf/2512.23259) |
| 2.14 | Galilée, Discorsi 1638, Première Journée | ✅ | Elzevier, Leyde | [en.wikipedia.org/wiki/Two_New_Sciences](https://en.wikipedia.org/wiki/Two_New_Sciences) |
| 2.15 | Mersenne 1588–1648, Oizé, Harmonie universelle 1636–37, lois, 84 Hz (**laiton**, tuyau d'orgue), octave 1:2, vitesse dispersée | ✅ (laiton à contrôler) | 8 sept. 1588 – 1er sept. 1648 ; 84 Hz confirmé ; **l'OCR lu montre « une chorde de boyau à l'unisson d'un tuyau d'orgue de deux pieds ouvert »** : ne pas écrire « laiton » sans l'avoir retrouvé dans le Livre des instrumens ; vitesse : 1 036 et 1 470 pieds/s ≈ 316 et 448 m/s (Finn) | [en.wikipedia.org/wiki/Marin_Mersenne](https://en.wikipedia.org/wiki/Marin_Mersenne) · [archive.org — Harmonie universelle (OCR)](https://archive.org/details/bub_gal_ark_12148_bpt6k5471093v) · Finn 1964 · DOI [10.1007/bf00327447](https://doi.org/10.1007/bf00327447) · (Dostrovsky 1975, référence de fond) |
| 2.16 | Place Royale ; correspondants ; Académie 1666 | ✅ | Universalis ; Haak non re-sourcé ; « Huygens » = Constantijn puis Christiaan | [universalis.fr/encyclopedie/marin-mersenne](https://universalis.fr/encyclopedie/marin-mersenne) |
| 2.17 | Hertz : IEC 1930, CGPM 1960 | ⚠️ | 1960 ferme (11e CGPM, rés. 12) ; IEC **1930 ou 1935** selon les sources (page IEC en 403) → « dans les années 1930 » | [bipm.org/en/committees/cg/cgpm/11-1960/resolution-12](https://bipm.org/en/committees/cg/cgpm/11-1960/resolution-12) · [en.wikipedia.org/wiki/Hertz](https://en.wikipedia.org/wiki/Hertz) |
| 2.18 | Boyle 1660, exp. 27, cloche/réveil ; Hooke assiste | ⚠️ | West 2005 : **montre** suspendue, le tic-tac disparaît ; la **cloche** frappée s'affaiblit seulement (fil, air résiduel) ; pompe construite par Hooke | [journals.physiology.org (West 2005)](https://journals.physiology.org) · [royalsociety.org/blog/2024/11/making-waves](https://royalsociety.org/blog/2024/11/making-waves) · DOI [10.1152/japplphysiol.00759.2004](https://doi.org/10.1152/japplphysiol.00759.2004) |
| 2.19 | Hooke : roue 1681 ; farine 1680 | ✅ | Roue commencée 1676 (Tompion), démo juillet 1681 ; 8 juillet 1680 plaque farinée | [royalsociety.org (Making waves)](https://royalsociety.org) · [en.wikipedia.org/wiki/Savart_wheel](https://en.wikipedia.org/wiki/Savart_wheel) |
| 2.20 | Sirène de Cagniard de La Tour 1819 | ✅ | Annales de chimie et de physique t. 12 (1819) ; à confirmer sur Gallica d'un clic | [gallica.bnf.fr/ark:/12148/cb343780820/date1819](https://gallica.bnf.fr/ark:/12148/cb343780820/date1819) |
| 2.21 | Cimento, Mersenne, Derham, Cassini → 330–350 m/s | ⚠️ | Finn : Cimento 350 ; Cassini 1677 351 ; Derham 1708 348 ; Cassini de Thury 1738 337 ; **Mersenne dispersé 316–448** ; deux Cassini distincts → « Cimento, Cassini, Derham : 337–351 ; Mersenne dispersé » | Finn 1964 · DOI [10.1098/rstl.1708.0001](https://doi.org/10.1098/rstl.1708.0001) · (Derham 1708) |
| 2.22 | Sauveur 1653–1716, « acoustique » 1696–1701 | ✅ | Académie 1696 ; mémoire lu 1701 (imprimé 1704) : dire « 1701 » pour le mot | [encyclopedia.com (DSB Sauveur)](https://encyclopedia.com) · [gallica.bnf.fr/ark:/12148/bpt6k1510877z](https://gallica.bnf.fr/ark:/12148/bpt6k1510877z) |
| 2.23 | Cordes de boyau, métal, **or**, soie | ⚠️ | OCR : « airain, fer, autre métal, soye, chanvre, boyau » ; **« or » non retrouvé** ; passage sur intensité/rupture plus que timbre → « boyau, chanvre, laiton, fer, soie » | [archive.org — Harmonie universelle (OCR)](https://archive.org/details/bub_gal_ark_12148_bpt6k5471093v) |

**Synthèse du lot**

- **❌** : n° 9 → « ≈ 6 000 places au IVe s., puis 13 000–14 000 après l'extension du IIe s. av. n. è. ».
- **⚠️** : 2 (corrélation mesurée ; Till séparé ; Iégor), 8 (c. 430–350 ; pseudo-Aristote), 12 (Avicenne), 17 (années 1930), 18 (montre vs cloche), 21 (Mersenne dispersé ; deux Cassini ; Newton 295), 23 (pas d'or).
- **À contrôler d'un clic** : laiton du 84 Hz (n° 15), Gallica 1819 (n° 20), équipe Artsoundscapes (n° 2), page IEC (n° 17).
- **Graphies** : Iegor → Iégor Reznikoff.

## Lot 03 — XVIIIe–XIXe siècles, musique, accords & battements

**Comptes :** 17 ✅ · 8 ⚠️ · 0 🔶 · 1 ❌ · 1 non vérifié

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 3.1 | Taylor 1713 ; d'Alembert 1747 ; Bernoulli 1738 | ✅ | Taylor trouve le mode fondamental, pas l'EDP ; Hydrodynamica = fluides, le rapprochement est rétrospectif (acoustique de D. Bernoulli : 1750–60) | [royalsocietypublishing.org](https://royalsocietypublishing.org) · [persee.fr (dhs 1984)](https://www.persee.fr) · [mathshistory.st-andrews.ac.uk](https://mathshistory.st-andrews.ac.uk) · DOI [10.1098/rstl.1713.0004](https://doi.org/10.1098/rstl.1713.0004) |
| 3.2 | Chladni 1787, 1802 ; Napoléon le fait venir ; l'Institut le couronne | ⚠️ | Tournée européenne, Paris **1808** ; Napoléon finance la traduction (1809) et fait ouvrir un concours → prix à **Sophie Germain 1816**, pas à Chladni ; « souvent dit » père de l'acoustique | [en.wikipedia.org/wiki/Ernst_Chladni](https://en.wikipedia.org/wiki/Ernst_Chladni) · [encyclopedia.com (DSB)](https://encyclopedia.com) · [lindahall.org](https://lindahall.org) |
| 3.3 | Kundt 1866 ; Rubens 1905 | ✅ | Rubens **& Krigar-Menzel** | Crossref · DOI [10.1002/andp.18662030402](https://doi.org/10.1002/andp.18662030402) · DOI [10.1002/andp.19053220608](https://doi.org/10.1002/andp.19053220608) |
| 3.4 | Fourier 1807/1822 ; Ohm 1843 | ✅ | Mémoire 21 déc. 1807 non publié ; Ohm contesté par Seebeck 1844 | [MacTutor History of Mathematics](https://mathshistory.st-andrews.ac.uk/) · [france-memoire.fr](https://www.france-memoire.fr) · DOI [10.1002/andp.18431350802](https://doi.org/10.1002/andp.18431350802) |
| 3.5 | Helmholtz 1863 ; Békésy corrige | ✅ | « partiellement confirmé, partiellement réfuté » | [nobelprize.org (Békésy lecture)](https://nobelprize.org) |
| 3.6 | Doppler 1842 ; Buys Ballot 1845 | ✅ | Cornistes ; voulait réfuter Doppler | [muurformules.sites.uu.nl](https://muurformules.sites.uu.nl) · DOI [10.1002/andp.18451421102](https://doi.org/10.1002/andp.18451421102) |
| 3.7 | Rayleigh, Nobel 1904 argon, Theory of Sound, rayl | ✅ | Ondes de Rayleigh 1885 | [en.wikipedia.org/wiki/Rayl](https://en.wikipedia.org/wiki/Rayl) · DOI [10.1112/plms/s1-17.1.4](https://doi.org/10.1112/plms/s1-17.1.4) · DOI [10.1017/CBO9781139058087](https://doi.org/10.1017/CBO9781139058087) · DOI [10.1017/CBO9781139058094](https://doi.org/10.1017/CBO9781139058094) |
| 3.8 | Laennec 1816 | ✅ | Necker ; traité 1819 | [hekint.org](https://hekint.org) |
| 3.9 | Écarts 12-TET vs juste | ✅ | −1,96 ; +1,96 ; +13,69 ; −15,64 ; −3,91 ; −11,73 | calcul |
| 3.10 | Comma 1,0136, 23,5 cents | ✅ | 23,46 | calcul |
| 3.11 | Zarlino introduit 5/4 ; Werckmeister, Kirnberger ; 12-TET XIXe | ⚠️ | Zarlino **codifie** (1558 ; déjà Ramos 1482) ; Werckmeister 1691 ; Kirnberger 1771/79 ; 12-TET dominant en théorie dès le XVIIIe | [medieval.org/emfaq/zarlino](https://medieval.org/emfaq/zarlino) · [teoria.com](https://teoria.com) |
| 3.12 | Pélog, slendro, shruti, quarts de ton, lü | ✅ | Congrès du Caire 1932 (24 quarts, sans consensus) ; Shiji ch. 25 | [en.wikipedia.org (Slendro, Shruti, Cairo Congress, Shi'er lü)](https://en.wikipedia.org) |
| 3.13 | Inharmonicité, Railsback | ✅ | JASA 9 (1938) ; Giordano 2015 | [pubs.aip.org](https://pubs.aip.org) · DOI [10.1121/1.1902056](https://doi.org/10.1121/1.1902056) · DOI [10.1121/1.4931439](https://doi.org/10.1121/1.4931439) |
| 3.14 | Fant source-filtre | ✅ | 1960 ; garder « dans une large mesure » | [en.wikipedia.org/wiki/Gunnar_Fant](https://en.wikipedia.org/wiki/Gunnar_Fant) · DOI [10.1515/9783110873429](https://doi.org/10.1515/9783110873429) |
| 3.15 | Schaeffer 1948 ; Chowning 1967–73 ; Risset ; spectralisme | ✅ | Cinq études 5 oct. 1948 ; JAES 1973 ; « glissando de Shepard-Risset » | [ccrma.stanford.edu](https://ccrma.stanford.edu) |
| 3.16 | Triades 4:5:6, 10:12:15, 7/4 à 31 cents | ✅ | 386,31 ; 701,96 ; 315,64 ; 968,83 (−31,17) | calcul |
| 3.17 | Rameau 1722 fonde sur la triade et **lit Sauveur** | ❌ | Rameau ne connaissait pas Sauveur en 1722 ; il le découvre ensuite → Génération harmonique 1737 | [Wikipédia — Traité de l'harmonie](https://fr.wikipedia.org/wiki/Trait%C3%A9_de_l%27harmonie_r%C3%A9duite_%C3%A0_ses_principes_naturels) · gallica (Génération harmonique) |
| 3.18 | Plomp & Levelt 25 % ; Sethares formule | ⚠️ (correction appliquée : 1998, 2ᵉ éd. 2005) | 25 % confirmé ; paramètres exacts 0,24 / 0,0207 / 18,96 / −3,51 / −5,75 ; livre **1998, 2e éd. 2005** | [mpi.nl (PDF 1965)](https://mpi.nl) · [sethares.engr.wisc.edu/comprog.html](https://sethares.engr.wisc.edu/comprog.html) · DOI [10.1121/1.1909741](https://doi.org/10.1121/1.1909741) · DOI [10.1121/1.408175](https://doi.org/10.1121/1.408175) |
| 3.19 | Terhardt 1974 ; Parncutt 1989 | ✅ | JASA 55 | [PubMed 4833699](https://pubmed.ncbi.nlm.nih.gov/4833699/) · DOI [10.1121/1.1914648](https://doi.org/10.1121/1.1914648) · DOI [10.1007/978-3-642-74831-8](https://doi.org/10.1007/978-3-642-74831-8) |
| 3.20 | Fritz 2009 ; Huron 2008 | ✅ | Curr. Biol. 19 ; EMR 3(2) (DOI Crossref discordant, ne pas afficher) | [stefan-koelsch.de (PDF)](https://stefan-koelsch.de) · [doaj.org](https://doaj.org) · DOI [10.1016/j.cub.2009.02.058](https://doi.org/10.1016/j.cub.2009.02.058) |
| 3.21 | Règle des orchestrateurs (tierce sous la2, seconde sous la3) | non vérifié | Aucune page ouverte ; à sourcer (Adler, Piston) ; **convention d'octave** à fixer | — |
| 3.22 | Kontakte 1960 ; moteur 1200 tr/min = 40 explosions/s | ⚠️ | Kontakte exact ; moteur : 10/s par cylindre → **4 cylindres** nécessaires ; 40 Hz ≈ mi0 (E1 41,2 Hz) | [en.wikipedia.org/wiki/Kontakte](https://en.wikipedia.org/wiki/Kontakte) · [stockhausenspace.blogspot.com](https://stockhausenspace.blogspot.com) |
| 3.23 | Tempo 100–120 bpm (Fraisse) ; Hirsh 2 ms / 20 ms | ⚠️ | Fraisse : 500–700 ms = **86–120 bpm** ; Hirsh exact (15–20 ms) | [frontiersin.org fpsyg.2023.1135988](https://frontiersin.org) · [pubs.aip.org](https://pubs.aip.org) · DOI [10.1016/b978-0-12-213562-0.50010-3](https://doi.org/10.1016/b978-0-12-213562-0.50010-3) · DOI [10.1121/1.1907782](https://doi.org/10.1121/1.1907782) |
| 3.24 | Formule des battements ; rugosité > 15–20/s | ⚠️ | Formule exacte ; seuil **~15–30/s selon le registre** | [animations.physics.unsw.edu.au/jw/beats.htm](https://animations.physics.unsw.edu.au/jw/beats.htm) · DOI [10.1121/1.1909741](https://doi.org/10.1121/1.1909741) |
| 3.25 | 0,25 Hz ; 659,3 / 1,5 Hz ; 554,4 / 17,5 Hz ; fa3–la3 14 Hz ; fa2–la2 7 Hz | ⚠️ | Tous les nombres exacts (0,254 ; 1,49 ; 17,46 ; 13,86 ; 6,93) mais **convention d'octave incohérente** : « la4 = 440 » (scientifique) vs « fa3–la3 » (française, la3 = 440). Harmoniser. | [en.wikipedia.org/wiki/Piano_key_frequencies](https://en.wikipedia.org/wiki/Piano_key_frequencies) |
| 3.26 | Oster 1973 | ✅ | Sci. Am. 229(4) | [scientificamerican.com](https://scientificamerican.com) · DOI [10.1038/scientificamerican1073-94](https://doi.org/10.1038/scientificamerican1073-94) |
| 3.27 | « s » proche de l'ultra ; consonnes = transitoires | ⚠️ | /s/ culmine **4–8 kHz**, énergie jusqu'à ~10 kHz → « riche en aigu (4–10 kHz) » | [home.cc.umanitoba.ca/~krussll](https://home.cc.umanitoba.ca/~krussll) · Shadle 2023 · DOI [10.1121/10.0021075](https://doi.org/10.1121/10.0021075) |

**Synthèse du lot**

- **❌** : 17 (Rameau / Sauveur → « il lira Sauveur peu après ; Génération harmonique 1737 »).
- **⚠️** : 2 (Chladni 1808, prix Germain), 11 (codifie), 18 (1998/2005), 22 (4 cylindres), 23 (85–120), 24 (15–30), 25 (convention d'octave), 27 (4–10 kHz) ; non vérifié 21.
- **Crédits** : Otto Krigar-Menzel ; glissando de Shepard-Risset.

## Lot 04 — Psychoacoustique, localisation & sociétés

**Comptes :** 18 ✅ · 3 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 4.1 | Échelle mel : Stevens, Volkmann & Newman 1937 | ✅ | JASA 8, 185–190 (1937) | Crossref · DOI [10.1121/1.1915893](https://doi.org/10.1121/1.1915893) |
| 4.2 | Fondamentale manquante : Seebeck, Schouten, Licklider | ✅ | Seebeck 1841 (Ann. Phys. 53) ; Schouten 1940 (Proc. KNAW 43) ; Licklider 1951 (Experientia 7). L'exemple 200/400/600/800 est une illustration générique. | [en.wikipedia.org/wiki/Missing_fundamental](https://en.wikipedia.org/wiki/Missing_fundamental) · [arxiv.org/pdf/1306.6458](https://arxiv.org/pdf/1306.6458) · DOI [10.1007/BF02156143](https://doi.org/10.1007/BF02156143) · (Licklider 1951) ; Seebeck, Schouten : DOI non trouvé |
| 4.3 | Shepard 1964 ; Risset ; triton de Deutsch | ✅ | Shepard JASA 36 (1964) ; Risset, Mutations 1969 ; Deutsch Music Perception 3 (1986) et 8 (1991) : corrélation avec le dialecte, hypothèse statistique | [fr.wikipedia.org/wiki/Gamme_de_Shepard](https://fr.wikipedia.org/wiki/Gamme_de_Shepard) · [en.wikipedia.org/wiki/Tritone_paradox](https://en.wikipedia.org/wiki/Tritone_paradox) · DOI [10.1121/1.1919362](https://doi.org/10.1121/1.1919362) · DOI [10.2307/40285337](https://doi.org/10.2307/40285337) · DOI [10.2307/40285517](https://doi.org/10.2307/40285517) |
| 4.4 | Isosoniques : Fletcher–Munson 1933, Robinson–Dadson, ISO 226 (2003) | ⚠️ | Dernière édition **ISO 226:2023** (écarts ≤ 0,6 dB vs 2003). Écrire « ISO 226 (2003, réédition 2023) ». Robinson–Dadson 1956 s'écartait de 10–15 dB dans le grave. | [jstage.jst.go.jp/article/ast/45/1/45_e23.66](https://www.jstage.jst.go.jp/article/ast/45/1/45_e23.66/_article) · [iso.org/standard/83117.html](https://iso.org/standard/83117.html) · DOI [10.1121/1.1915637](https://doi.org/10.1121/1.1915637) · DOI [10.1088/0508-3443/7/5/302](https://doi.org/10.1088/0508-3443/7/5/302) · DOI [10.1250/ast.e23.66](https://doi.org/10.1250/ast.e23.66) |
| 4.5 | Masquage : Bark (Zwicker), ERB (Moore) ; MP3 ; pré/post-masquage | ✅ | Zwicker JASA 33 (1961) ; Glasberg & Moore Hear. Res. 47 (1990) ; pré ≈ 5–20 ms, post ≈ 100–200 ms | [en.wikipedia.org/wiki/Critical_band](https://en.wikipedia.org/wiki/Critical_band) · [mp3-tech.org/programmer/docs/audiopaper1.pdf](http://www.mp3-tech.org/programmer/docs/audiopaper1.pdf) · DOI [10.1121/1.1908630](https://doi.org/10.1121/1.1908630) · DOI [10.1016/0378-5955(90)90170-T](https://doi.org/10.1016/0378-5955(90)90170-T) |
| 4.6 | Haas ~1949, délai 1–30 ms | ✅ | Wallach, Newman & Rosenzweig nomment le « precedence effect » en 1949 (Am. J. Psychol. 62) ; Haas thèse 1949, Acustica 1 (1951) ; fenêtre jusqu'à ~40–50 ms pour la parole | [en.wikipedia.org/wiki/Precedence_effect](https://en.wikipedia.org/wiki/Precedence_effect) · DOI [10.2307/1418275](https://doi.org/10.2307/1418275) · (Wallach 1949) ; Haas 1951 : DOI non trouvé |
| 4.7 | Cherry 1953 ; McGurk & MacDonald 1976 | ✅ | JASA 25 (1953) ; Nature 264, 746 (1976), exemple ba/ga → da original | Crossref · DOI [10.1121/1.1907229](https://doi.org/10.1121/1.1907229) · DOI [10.1038/264746a0](https://doi.org/10.1038/264746a0) |
| 4.8 | Duplex theory de Rayleigh 1907 | ✅ | Phil. Mag. 13, 214–232 (1907) | [en.wikipedia.org/wiki/Sound_localization](https://en.wikipedia.org/wiki/Sound_localization) · DOI [10.1080/14786440709463595](https://doi.org/10.1080/14786440709463595) |
| 4.9 | ITD Woodworth : (r/c)(θ + sin θ), max ~0,65 ms, seuil ~10 µs, < 1,5 kHz | ✅ | Calcul : 0,656 ms (r = 87,5 mm) ; Aaronson & Hartmann 2014 : 654 µs ; Klumpp & Eady 1956 : 9–11 µs ; ITD réel en BF jusqu'à 700–800 µs | [pmc.ncbi.nlm.nih.gov/articles/PMC3985894](https://pmc.ncbi.nlm.nih.gov/articles/PMC3985894) · [en.wikipedia.org/wiki/Interaural_time_difference](https://en.wikipedia.org/wiki/Interaural_time_difference) · DOI [10.1121/1.4861243](https://doi.org/10.1121/1.4861243) · DOI [10.1121/1.1908493](https://doi.org/10.1121/1.1908493) |
| 4.10 | ILD 15–20 dB à 8 kHz, ~0 à 200 Hz ; caisson non localisable | ✅ | « jusqu'à ~20 dB dans l'aigu » ; écrire « se localise très mal » (évents, distorsions) | [OpenLearn — Hearing (Open University)](https://www.open.edu/openlearn/) · DOI non trouvé (Feddersen 1957) |
| 4.11 | HRTF : Wightman & Kistler 1989 ; KEMAR/MIT 1994 ; cône de confusion | ✅ | JASA 85, 858 et 868 (1989) ; Gardner & Martin, MIT Media Lab mai 1994, JASA 97 (1995) | [sound.media.mit.edu/resources/KEMAR.html](https://sound.media.mit.edu/resources/KEMAR.html) · DOI [10.1121/1.397557](https://doi.org/10.1121/1.397557) · DOI [10.1121/1.397558](https://doi.org/10.1121/1.397558) · DOI [10.1121/1.412407](https://doi.org/10.1121/1.412407) |
| 4.12 | KU 100 ; Ambisonics (Gerzon 1970s) ; Atmos 2012 ; « 8D » | ✅ | KU 100 : 1992 (KU 80 ~1973, KU 81 1982) ; Gerzon JAES 21 (1973) ; Atmos annoncé avril 2012 (Brave) ; « 8D » = autopan + réverb, pas un format | [neumann.com](https://neumann.com) · [en.wikipedia.org/wiki/Ambisonics](https://en.wikipedia.org/wiki/Ambisonics) · [en.wikipedia.org/wiki/Dolby_Atmos](https://en.wikipedia.org/wiki/Dolby_Atmos) · DOI non trouvé (Gerzon 1973, AES e-lib 2012) |
| 4.13 | Cage, 4′33″, 1952 | ✅ | Création 29 août 1952, Maverick Concert Hall, David Tudor | [en.wikipedia.org/wiki/4′33″](https://en.wikipedia.org/wiki/4′33″) · DOI non trouvé |
| 4.14 | Cloche : partiels inharmoniques accordés (prime, tierce, quinte) | ✅ | hum, prime, tierce mineure, quinte, nominale ; accordage au tour (Hemony XVIIe). Coquille script : « partielle inharmoniques » → « partiels inharmoniques » | [hibberts.co.uk](https://hibberts.co.uk) · [keltektrust.org.uk/sob04.html](https://keltektrust.org.uk/sob04.html) · DOI non trouvé |
| 4.15 | STI, RASTI, %ALcons | ⚠️ | STI : Houtgast & Steeneken 1971/JASA 67 (1980) ; RASTI 1979, **obsolète IEC 2011** (remplacé par STIPA) ; %ALcons : Peutz 1971 | [museumwaalsdorp.nl](https://museumwaalsdorp.nl) · [en.wikipedia.org/wiki/Speech_transmission_index](https://en.wikipedia.org/wiki/Speech_transmission_index) · DOI [10.1121/1.384464](https://doi.org/10.1121/1.384464) |
| 4.16 | Directive 2002/49/CE, Lden et Ln ; OMS | ✅ | Indicateur officiel **Lnight** ; OMS 2018 : < 53 dB Lden, < 45 dB Lnight (routier) ; seuils de déclaration directive 55/50 | [EUR-Lex — directive 2002/49/CE](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32002L0049) · [eea.europa.eu](https://eea.europa.eu) · [who.int/europe/publications/i/item/9789289053563](https://who.int/europe/publications/i/item/9789289053563) · [PMC 5923855](https://pmc.ncbi.nlm.nih.gov/articles/PMC5923855/) · DOI non trouvé (institutionnel) |
| 4.17 | Seuils au travail 80 / 85 dB(A) sur 8 h | ✅ | R4431-2 : 80/135, 85/137, limite 87/140 dB(C) ; harmonisé UE | [legifrance.gouv.fr LEGIARTI000018530386](https://legifrance.gouv.fr) · [EUR-Lex — directive 2003/10/CE](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32003L0010) · DOI non trouvé |
| 4.18 | SOFAR : Ewing & Worzel WWII ; SOSUS | ✅ | Essai 1944 (R/V Saluda, ~900 milles) ; GSA Memoir 27 (1948) ; découverte parallèle de Brekhovskikh ; SOSUS 1951–52, déclassifié 1991 | [en.wikipedia.org/wiki/SOFAR_channel](https://en.wikipedia.org/wiki/SOFAR_channel) · [en.wikipedia.org/wiki/SOSUS](https://en.wikipedia.org/wiki/SOSUS) · DOI [10.1130/MEM27-3-p1](https://doi.org/10.1130/MEM27-3-p1) |
| 4.19 | Dolby, 5.1, Atmos ; Foley | ✅ | AC-3 1991, Batman Returns 1992 ; Jack Foley, Universal, Show Boat 1929 | [en.wikipedia.org/wiki/Dolby_Digital](https://en.wikipedia.org/wiki/Dolby_Digital) · [en.wikipedia.org/wiki/Jack_Foley_(sound_effects_artist)](https://en.wikipedia.org/wiki/Jack_Foley_(sound_effects_artist)) · DOI non trouvé |
| 4.20 | NVH : son de portière décidé en comité | ✅ | Jurys d'écoute et cibles spectrales (SAE) ; « en comité » est une image | [thedrive.com/news/35871](https://www.thedrive.com) · [sae.org 10-04-03-0016](https://sae.org) · DOI non trouvé |
| 4.21 | Fusion : < 10–15 Hz pouls ; 15–20 Hz rugosité ; > 20 Hz hauteur | ⚠️ | Hauteur mélodique ≥ ~30 Hz (Pressnitzer et al. 2001) ; transition 16–64 Hz (Krumbholz 2000) ; rugosité 15–300 Hz, max ~70 Hz ; fluctuation max ~4 Hz. Reformuler : trois sensations qui se chevauchent. | [acoustics.salford.ac.uk (roughness)](https://acoustics.salford.ac.uk) · DOI [10.1121/1.1359797](https://doi.org/10.1121/1.1359797) · DOI [10.1121/1.1287843](https://doi.org/10.1121/1.1287843) |

**Synthèse du lot**

- **❌ à corriger** : aucun.
- **⚠️** : n° 4 (ISO 226:2023), n° 15 (RASTI obsolète, ajouter STIPA), n° 21 (rugosité jusqu'à ~300 Hz, hauteur dès ~30 Hz).
- **Nuances mineures** : n° 6 (Wallach 1949 nomme l'effet, Haas publie 1951), n° 10 (« très mal » plutôt que « pas »), n° 17 (ajouter 87 dB(A)), n° 18 (Brekhovskikh).
- **Graphies** : « partielle inharmoniques » → « partiels inharmoniques » (#secteurs) ; « Ln » → « Lnight ».
- **Limites** : DOSITS, AES e-lib, MoMA, ISO.org, OpenLearn bloqués (403/JS), faits confirmés par d'autres sources.

## Lot 05 — Enregistrement, transduction & numérique

**Comptes :** 13 ✅ · 7 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 5.1 | Scott de Martinville 1857 ; 1860 ; 2008 LBNL | ✅ | Brevet 25 mars 1857 ; phonautogramme 9 avril 1860 ; First Sounds + LBNL 2008 (numérisation optique) | [loc.gov (National Recording Registry)](https://loc.gov) · [firstsounds.org](https://firstsounds.org) |
| 5.2 | Cros 1877 ; Edison 1877/1878 ; Bell 1876 ; Berliner 1887 | ✅ | Cros pli 30 avril 1877 ; Edison US 200 521 (19 févr. 1878) ; Bell US 174 465 (7 mars 1876) ; Berliner US 372 786 (8 nov. 1887) | [universalis.fr](https://universalis.fr) · [patents.google.com/patent/US200521A](https://patents.google.com/patent/US200521A) · [loc.gov/item/berl0124](https://loc.gov/item/berl0124) · [si.edu](https://si.edu) |
| 5.3 | Micros : Siemens 1874, Hughes 1878, Wente 1916, Sessler & West 1962, Knowles 2003 ; ruban 1924, RCA 44 1931 | ⚠️ | Wente était chez **Western Electric** (Bell Labs n'existe qu'en 1925) ; RCA : PB-31 en 1931, **44A en 1931–1933** selon sources ; Schottky brevet DE 434 855 (déc. 1924) | [patents.google.com/patent/US149797A](https://patents.google.com/patent/US149797A) · [fohonline.com](https://fohonline.com) · [aps.org (electret)](https://aps.org) · [aearibbonmics.com](https://aearibbonmics.com) · DOI [10.1103/physrev.10.39](https://doi.org/10.1103/physrev.10.39) · DOI [10.1121/1.1909130](https://doi.org/10.1121/1.1909130) · (Wente 1917) ;  (Sessler & West 1962) |
| 5.4 | Hertz 1887–88 ; Fessenden « souvent datée 1906 » | ⚠️ (deb) | Hertz Ann. Phys. 270 (1888) ; la veillée de Noël 1906 est un récit tardif (biographie 1940) ; démonstration du **21 déc. 1906** attestée (NYT) ; voix sur 1,6 km dès déc. 1900 | [ethw.org (deux jalons)](https://ethw.org) · [thebdr.net](https://thebdr.net) · DOI [10.1002/andp.18882700708](https://doi.org/10.1002/andp.18882700708) |
| 5.5 | Pfleumer 1928, AEG ; CD 1982 ; MP3 1990s | ✅ | Licence AEG 1932, K1 à l'IFA 1935 ; CDP-101 le 1er oct. 1982 ; .mp3 le 14 juillet 1995 | [computerhistory.org](https://computerhistory.org) · [en.wikipedia.org/wiki/Sony_CDP-101](https://en.wikipedia.org/wiki/Sony_CDP-101) |
| 5.6 | Rice & Kellogg 1925 ; e = Bℓv ; F = BIℓ ; rendement ~1 % | ✅ | Trans. AIEE 44, 461–480 ; 0,5–2 % rayonnement direct | [aes-media.org/historical](https://aes-media.org/historical) · DOI [10.1109/t-aiee.1925.5061127](https://doi.org/10.1109/t-aiee.1925.5061127) |
| 5.7 | Déplacement ∝ 1/f² ; téléphone < 150–200 Hz ; tweeter 20–25 kHz | ⚠️ | Loi exacte ; les seuils sont des ordres de grandeur non adossés à une mesure → « sous quelques centaines de hertz », « vers 20 kHz, parfois davantage » | [diyaudio.com](https://diyaudio.com) · [en.wikipedia.org/wiki/Loudspeaker](https://en.wikipedia.org/wiki/Loudspeaker) |
| 5.8 | Nyquist 1928 ; Whittaker 1915 ; Kotelnikov 1933 ; Shannon 1949 | ✅ | Trans. AIEE 47 ; Proc. RSE 35 ; Proc. IRE 37 | [sites.bu.edu/mark/files/2018/02/196.pdf](https://sites.bu.edu/mark/files/2018/02/196.pdf) · DOI [10.1109/t-aiee.1928.5055024](https://doi.org/10.1109/t-aiee.1928.5055024) · DOI [10.1017/s0370164600017806](https://doi.org/10.1017/s0370164600017806) · DOI [10.1109/jrproc.1949.232969](https://doi.org/10.1109/jrproc.1949.232969) |
| 5.9 | 44,1 kHz ↔ U-matic ; 48 kHz | ✅ | Sony PCM-1600 (1979), 3 échantillons × lignes PAL/NTSC ; 48 kHz DAT 1987, Opus interne | [en.wikipedia.org/wiki/44,100_Hz](https://en.wikipedia.org/wiki/44,100_Hz) · [en.wikipedia.org/wiki/PCM_adaptor](https://en.wikipedia.org/wiki/PCM_adaptor) |
| 5.10 | 30 kHz à 44,1 → 14,1 kHz | ✅ | Exact | [allaboutcircuits.com](https://allaboutcircuits.com) |
| 5.11 | SNR 6,02n+1,76 ; 98 ; 146 ; ~120 réel | ✅ | 98,08 ; 146,24 ; meilleurs ADC ~120–123 dB | [analog.com MT-001](https://analog.com) · [en.wikipedia.org/wiki/Audio_bit_depth](https://en.wikipedia.org/wiki/Audio_bit_depth) |
| 5.12 | Reeves 1938 ; Denon 1972 | ⚠️ | Brevet FR 1938, US 2 272 070 (1942) ; **premiers enregistrements commerciaux Denon janvier 1971**, DN-023R en 1972 | [ethw.org/Pulse_Code_Modulation](https://ethw.org/Pulse_Code_Modulation) · [aes-media.org (Fine)](https://aes-media.org) · DOI [10.1109/mspec.1965.5212943](https://doi.org/10.1109/mspec.1965.5212943) · (Deloraine & Reeves 1965) |
| 5.13 | FFT 1965 ; Gauss 1805 ; N log N ; Gabor Δt·Δf ≳ 1 | ⚠️ | Cooley & Tukey Math. Comp. 19 ; Gauss reconstitué par Heideman et al. 1984 ; N = 4096 → 341× ; **avec des écarts-types la borne est 1/(4π)**, « ≳ 1 » vaut pour des largeurs | [cis.rit.edu (Gauss_History_FFT.pdf)](https://www.cis.rit.edu) · [arxiv.org/pdf/2204.01596](https://arxiv.org/pdf/2204.01596) · DOI [10.1090/s0025-5718-1965-0178586-1](https://doi.org/10.1090/s0025-5718-1965-0178586-1) · DOI [10.1109/massp.1984.1162257](https://doi.org/10.1109/massp.1984.1162257) · DOI [10.1049/ji-3-2.1946.0074](https://doi.org/10.1049/ji-3-2.1946.0074) |
| 5.14 | Visible Speech 1947 ; Kay 1951 | ✅ | Spectrographe : Koenig, Dunn & Lacy JASA 18 (1946) ; livre 1947 ; Sona-Graph 1951 | [sova.si.edu](https://sova.si.edu) · [waywiser.fas.harvard.edu](https://waywiser.fas.harvard.edu) · DOI [10.1121/1.1916342](https://doi.org/10.1121/1.1916342) |
| 5.15 | Dudley 1939 ; Atal & Hanauer 1971 ; Itakura ; GSM 1991 | ✅ | Vocoder conçu dès 1928, brevets 1939 ; Itakura-Saito 1966–68 ; GSM 1er juillet 1991, RPE-LTP ordre 8, 13 kbit/s | [en.wikipedia.org/wiki/Vocoder](https://en.wikipedia.org/wiki/Vocoder) · [en.wikipedia.org/wiki/Full_Rate](https://en.wikipedia.org/wiki/Full_Rate) · DOI [10.1121/1.1916020](https://doi.org/10.1121/1.1916020) · DOI [10.1121/1.1912679](https://doi.org/10.1121/1.1912679) |
| 5.16 | MP3 1993 ; Tom's Diner ; AAC 1997 ; Opus 2012 ; MDCT | ⚠️ (correction appliquée : Skype ajouté) | ISO/IEC 11172-3 ; AAC avril/déc. 1997 ; RFC 6716 10 sept. 2012 ; ajouter **Skype (SILK)** à Xiph/Mozilla | [rfc-editor.org/info/rfc6716](https://rfc-editor.org/info/rfc6716) · DOI [10.17487/rfc6716](https://doi.org/10.17487/rfc6716) |
| 5.17 | Aides auditives numériques 1996 | ✅ | Widex Senso, Oticon DigiFocus (JUMP-1 1995) | [medicaldevice-network.com](https://medicaldevice-network.com) · [hearingreview.com](https://hearingreview.com) |
| 5.18 | Auto-Tune 1997, Hildebrand, Exxon, autocorrélation ; Believe 1998 | ⚠️ (correction appliquée : « Exxon » retiré) | Sortie 19 sept. 1997 ; « Exxon » non confirmé par source primaire → « prospection sismique pétrolière » | [en.wikipedia.org/wiki/Auto-Tune](https://en.wikipedia.org/wiki/Auto-Tune) · [antarestech.com/blog](https://antarestech.com/blog) · (un article d'histoire de l'Auto-Tune, 10.1080/07341512.2024.2402580, n'a pas pu être ouvert : non cité) |
| 5.19 | BS.1770 2006 ; R128 2010 −23 LUFS ; ~−14 | ✅ | BS.1770-0 juillet 2006 ; R 128 février 2010 | [itu.int/rec/R-REC-BS.1770](https://itu.int/rec/R-REC-BS.1770) · [tech.ebu.ch/docs/r/r128.pdf](https://tech.ebu.ch/docs/r/r128.pdf) |
| 5.20 | WaveNet 2016 ; Demucs 2019–21 ; SoundStream 2021 ; EnCodec 2022 ; clonage 2023 | ✅ | arXiv 1609.03499 ; 1909.01174 / 2111.03600 ; 2107.03312 (TASLP 2022) ; 2210.13438 ; VALL-E 2301.02111 (3 s) | [arxiv.org](https://arxiv.org) · DOI [10.1109/taslp.2021.3129994](https://doi.org/10.1109/taslp.2021.3129994) |

**Synthèse du lot**

- **❌** : aucun.
- **⚠️** : 3 (Western Electric ; RCA PB-31 puis 44A), 4 (Noël 1906 = récit tardif, 21 déc. attesté), 7 (seuils = ordres de grandeur), 12 (Denon janvier 1971), 13 (borne 1/(4π) en écarts-types), mineurs 15 (1928/1939), 16 (Skype), 18 (Exxon non sourcé).
- **Graphies** : aucune.
- **Hors lot, remarqué** : « Curie 1880 » et « Faraday 1831 » dans la sous-section transduction, non vérifiés ici (Curie couvert par le lot 06).

## Lot 06 — Sonar, Langevin, ultrasons & Doppler

**Comptes :** 18 ✅ · 4 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 6.1 | Spallanzani 1793–94 ; Jurine confirme | ⚠️ | Ordre inversé : Spallanzani 1793 (aveuglées, volent) ; **Jurine 1794** (oreilles bouchées, s'écrasent) ; Spallanzani confirme avec de meilleurs bouchons. Prénom : **Louis** Jurine. | [aaas.org/discovering-sonar-bats](https://aaas.org/discovering-sonar-bats) · [en.wikipedia.org/wiki/Louis_Jurine](https://en.wikipedia.org/wiki/Louis_Jurine) · DOI [10.1086/347764](https://doi.org/10.1086/347764) · (Galambos, Isis 1942) |
| 6.2 | Galton, sifflet, 1876 | ✅ | Brochure 1876 ; limite humaine ~18 kHz ; animaux = usage second | [pdf.galton.org/essays/1870-1879/galton-1876-whistles.pdf](https://pdf.galton.org/essays/1870-1879/galton-1876-whistles.pdf) · DOI non trouvé |
| 6.3 | Curie 1880 / Lippmann 1881 | ✅ | Bull. Soc. minéral. France 3 (1880) ; Lippmann J. Phys. 10 (1881) | Crossref · DOI [10.3406/bulmi.1880.1564](https://doi.org/10.3406/bulmi.1880.1564) · DOI [10.1051/jphystap:0188100100038100](https://doi.org/10.1051/jphystap:0188100100038100) |
| 6.4 | Fessenden 1912–14, iceberg ~2 miles | ✅ | Brevet 29 janv. 1913 ; essais 27 avril 1914 (cutter Miami) : 2 à 2,5 milles ; 540 Hz–1 kHz (pas ultra) | [sciencehistory.org](https://sciencehistory.org) · [ethw.org](https://ethw.org) · [en.wikipedia.org/wiki/Fessenden_oscillator](https://en.wikipedia.org/wiki/Fessenden_oscillator) · DOI non trouvé |
| 6.5 | Langevin & Chilowsky 1915–17, quartz, premier transducteur de puissance | ⚠️ | 1915 : émetteur **capacitif** (duo) ; Chilowsky part en 1916 ; **quartz = Langevin seul, avril–nov. 1917**, brevet 1918, sous-marins à ~1 300 m en 1918. « Hydrophone à quartz » → « transducteur à quartz » ; « premier transducteur de puissance » → « premier transducteur piézoélectrique à quartz, base de la technique moderne » | [physicstoday.aip.org (Duck 2022)](https://physicstoday.aip.org) · [ethw.org/Milestones:Invention_of_Sonar,_1915-1918](https://ethw.org/Milestones:Invention_of_Sonar,_1915-1918) · [blog.piezo.com](https://blog.piezo.com) · DOI [10.1063/PT.3.5122](https://doi.org/10.1063/PT.3.5122) · DOI [10.1121/10.0041881](https://doi.org/10.1121/10.0041881) · (Duck, JASA 2025) |
| 6.6 | Sokolov 1929, CND | ✅ | Proposition 1928, mise en œuvre 1929, publication 1935 ; par transmission (Firestone 1940 : écho). Écrire « 1928–1929 » | [ob-ultrasound.net/ndt.html](https://ob-ultrasound.net/ndt.html) · [qualitymag.com](https://qualitymag.com) · DOI non trouvé |
| 6.7 | Dussik 1942, hyperphonographie | ✅ | Z. ges. Neurol. Psychiat. 174 (1942) ; images 1947 ; invalidées comme artefacts par Güttner 1952 | [ob-ultrasound.net/dussikbio.html](https://ob-ultrasound.net/dussikbio.html) · [radiopaedia.org](https://radiopaedia.org) · DOI [10.1007/BF02877929](https://doi.org/10.1007/BF02877929) |
| 6.8 | Howry, Wild, Donald 1950s–70s | ✅ | Wild & Reid Science 1952 ; Howry 1952/1954 ; Donald Lancet 1958 ; Diasonograph 1963 | [ob-ultrasound.net/howry.html](https://ob-ultrasound.net/howry.html) · [embryo.asu.edu](https://embryo.asu.edu) · DOI [10.1126/science.115.2983.226](https://doi.org/10.1126/science.115.2983.226) · DOI [10.1016/S0140-6736(58)91905-6](https://doi.org/10.1016/S0140-6736(58)91905-6) · DOI [10.1002/1097-0142(195403)7:2<354::aid-cncr2820070220>3.0.co;2-9](https://doi.org/10.1002/1097-0142(195403)7:2%3C354::aid-cncr2820070220%3E3.0.co;2-9) |
| 6.9 | SOFAR années 1940 ; SOSUS ; milliers de km | ✅ | Ewing & Worzel 1944, GSA Memoir 27 (1948) ; Brekhovskikh ; Jezebel 1950, réseau 1952, déclassifié 1991 ; Heard Island 1991 | [en.wikipedia.org/wiki/SOFAR_channel](https://en.wikipedia.org/wiki/SOFAR_channel) · [archive.navalsubleague.org](https://archive.navalsubleague.org) · DOI [10.1130/MEM27-3-p1](https://doi.org/10.1130/MEM27-3-p1) |
| 6.10 | Langevin 1872–1946, élève de Curie, Collège de France | ✅ | Thèse 1902 sous P. Curie ; chaire 1909–1946 ; révoqué par Vichy, rétabli 1944 | [college-de-france.fr/en/person/paul-langevin](https://college-de-france.fr/en/person/paul-langevin) · DOI non trouvé |
| 6.11 | d = cΔt/2 ; 2 ms ≈ 1,5 m | ✅ | Recalculé | [courses.lumenlearning.com/suny-physics/chapter/17-7-ultrasound](https://courses.lumenlearning.com/suny-physics/chapter/17-7-ultrasound) · DOI non trouvé |
| 6.12 | Quartz, PZT, PVDF ; magnétostriction ; CMUT ; f ≈ c/(2e) | ✅ | Graphie : **Terfenol-D** | [machinedesign.com](https://machinedesign.com) · [en.wikipedia.org/wiki/Capacitive_micromachined_ultrasonic_transducers](https://en.wikipedia.org/wiki/Capacitive_micromachined_ultrasonic_transducers) · DOI non trouvé |
| 6.13 | Z = ρc ; R ; Z_air ≈ 400 rayl ; gel | ✅ | Air 400–430 rayl ; R amplitude ≈ 0,9995, intensité > 99,9 % ; préciser « R en amplitude » | [Lumen Learning — College Physics](https://courses.lumenlearning.com/suny-physics/) · [echopedia.org](https://echopedia.org) · DOI [10.3390/gels12050447](https://doi.org/10.3390/gels12050447) · (appui secondaire) |
| 6.14 | Bandes d'usage | ✅ | Nettoyage typiquement 20–40 kHz ; abdomen 2–5 MHz ; sein 7–14 ; œil 35–50 MHz ; ESWL ; HIFU > 55 °C | [intechopen.com/chapters/65515](https://intechopen.com/chapters/65515) · [eyewiki.org](https://eyewiki.org) · [urology-textbook.com/eswl.html](https://urology-textbook.com/eswl.html) · DOI [10.1080/02656730601186138](https://doi.org/10.1080/02656730601186138) |
| 6.15 | 0,5 dB/cm/MHz ; résolution cτ/2 | ✅ | Usuellement 0,5–1 dB/cm/MHz | [stroke-manual.com](https://stroke-manual.com) · [echopedia.org](https://echopedia.org) · DOI [10.1093/bjaceaccp/mkr030](https://doi.org/10.1093/bjaceaccp/mkr030) |
| 6.16 | Modes A/B/M/Doppler, harmonique ; TI, MI, ALARA | ✅ | Santé Canada | [canada.ca (guidelines safe use diagnostic ultrasound)](https://canada.ca) · [radiopaedia.org/articles/harmonic-imaging](https://radiopaedia.org/articles/harmonic-imaging) · DOI non trouvé |
| 6.17 | Doppler 1842 Prague ; Buys Ballot 1845 trompettistes Utrecht–Maarssen | ⚠️ | 25 mai 1842 ; 3 juin 1845 : **cornistes** (hoornblazers), pas trompettistes ; Ann. Phys. 142 (1845) | [knmi.nl](https://knmi.nl) · [muurformules.sites.uu.nl](https://muurformules.sites.uu.nl) · DOI [10.1002/andp.18451421102](https://doi.org/10.1002/andp.18451421102) |
| 6.18 | Formule Doppler ; 9 % ; 19 % | ✅ | 30/343 = 8,75 % ; 1,192 ≈ 2^(3/12) = 1,189 | [Lumen Learning — College Physics 17-7-the-doppler-effect](https://courses.lumenlearning.com/suny-physics/chapter/17-7-the-doppler-effect/) · DOI non trouvé |
| 6.19 | Cône de Mach, N-wave | ✅ | sin θ = 1/M | [Lumen Learning — College Physics 17-8-shock-waves](https://courses.lumenlearning.com/suny-physics/chapter/17-8-shock-waves/) · DOI non trouvé |
| 6.20 | Δf = 2vf₀cosθ/c ; 90° | ✅ | Angle recommandé 30–60° | [openanesthesia.org](https://openanesthesia.org) · [stroke-manual.com](https://stroke-manual.com) · DOI non trouvé |
| 6.21 | Rhinolophe, Schnitzler 1968, fovéa ~82 kHz | ⚠️ | Valeur canonique **~83 kHz** (fovéa 83,0–84,5 kHz, Schuller & Pollak 1979), variable 69–83 selon populations | [PLOS ONE — grand rhinolophe](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0062710) · [en.wikipedia.org/wiki/Greater_horseshoe_bat](https://en.wikipedia.org/wiki/Greater_horseshoe_bat) · DOI [10.1007/bf00303062](https://doi.org/10.1007/bf00303062) · DOI [10.1007/BF00617731](https://doi.org/10.1007/BF00617731) · DOI [10.1007/s00359-010-0569-6](https://doi.org/10.1007/s00359-010-0569-6) |
| 6.22 | 1540 m/s ; graisse, os, poumon | ✅ | Graisse ~1450 ; os ~4080 ; poumon ~500 m/s | [nysora.com/pocus/physics](https://nysora.com/pocus/physics) · DOI non trouvé |

**Synthèse du lot**

- **❌** : aucun.
- **⚠️** : 1 (Jurine avant Spallanzani, Louis Jurine), 5 (quartz = Langevin seul 1917, capacitif 1915), 17 (cornistes), 21 (~83 kHz).
- **Nuances** : 4 (2–2,5 milles), 6 (1928–1929), 13 (R amplitude), 14 (20–40 kHz), 15 (0,5–1).
- **Graphies** : Louis Jurine ; Terfenol-D ; cornistes ; Chilowsky (cohérent).
- **Non lus en direct** : DOSITS, PMC, BJA Education, ScienceDirect Topics, MDPI Gels (recoupés ailleurs).

## Lot 07 — Oreille, sécurité auditive, voix & salles

**Comptes :** 13 ✅ · 7 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 7.1 | Étrier plus petit os ; chaîne auditive | ✅ | Conforme | [teachmeanatomy.info](https://teachmeanatomy.info) · [nobelprize.org/prizes/medicine/1961/summary](https://nobelprize.org/prizes/medicine/1961/summary) |
| 7.2 | Békésy, onde progressive, Nobel 1961 | ✅ | Seul lauréat 1961 | [nobelprize.org](https://nobelprize.org) |
| 7.3 | Kemp 1978 ; CCE ampli actif ; TEOAE/DPOAE néonatal | ✅ | JASA 64 (1978) ; électromotilité décrite années 1980 ; dépistage = OAE + PEA automatisés | [PubMed 12324396](https://pubmed.ncbi.nlm.nih.gov/12324396/) · [nhs.uk newborn hearing test](https://nhs.uk) · DOI [10.1121/1.382104](https://doi.org/10.1121/1.382104) · DOI [10.1093/bmb/63.1.223](https://doi.org/10.1093/bmb/63.1.223) |
| 7.4 | Fletcher–Munson 1933 ; sone 1936 ; Bark | ✅ | Psychol. Rev. 43 (1936) ; JASA 33 (1961). Raccourci « d'où la loudness war » à assouplir (le bouton loudness oui, la guerre non) | Crossref · DOI [10.1121/1.1915637](https://doi.org/10.1121/1.1915637) · DOI [10.1037/h0058773](https://doi.org/10.1037/h0058773) · DOI [10.1121/1.1908630](https://doi.org/10.1121/1.1908630) |
| 7.5 | Implants : House, Simmons, Chouard, Clark ; commercialisation 1970–80 | ⚠️ | House 1961 ; Simmons 1964 ; Chouard 22 sept. 1976 (multiélectrodes) ; Clark 1978 ; **FDA 1984–85** → « essais 1961–1978, commercialisation années 1980 » | [enttoday.org](https://enttoday.org) · [fr.wikipedia.org/wiki/Claude-Henri_Chouard](https://fr.wikipedia.org/wiki/Claude-Henri_Chouard) · [ncbi.nlm.nih.gov/books/NBK232047](https://ncbi.nlm.nih.gov/books/NBK232047) |
| 7.6 | OMS : risque cardiovasculaire ; 53 dB Lden, 45 Lnight | ⚠️ | Chiffres exacts, mais **53 dB est fixé sur la gêne forte** (10 % à 53,3 dB), le +5 % de risque cardiaque est à 59,3 dB Lden ; RR 1,08 / 10 dB. Phrase du script « seuils de risque, pas de gêne » à inverser | [iris.who.int (PDF 2018)](https://iris.who.int) · [PMC 5858448](https://pmc.ncbi.nlm.nih.gov/articles/PMC5858448/) |
| 7.7 | 2003/10/CE, R4431-2 : 80/85/87 ; 135/137/140 ; 3 dB | ✅ | Art. 3 ; crêtes 112/140/200 Pa ; ISO 1999 (échange 3 dB) | [Légifrance — Code du travail, art. R4431-2](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000018530386) · [sstie.ineris.fr](https://sstie.ineris.fr) · [EUR-Lex — directive 2003/10/CE (lecture automatique refusée)](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32003L0010) |
| 7.8 | Table des durées ; 120 dB douleur | ⚠️ | Table NIOSH 1998 exacte ; douleur **120–140 dB** (Franks et al. 1996) ; exemples = ordres de grandeur | [nonoise.org/hearing/criteria](https://nonoise.org/hearing/criteria) · [cdc.gov/niosh/noise](https://cdc.gov/niosh/noise) |
| 7.9 | Décret 2017-1244 : 102 dB(A), 118 dB(C) sur 15 min | ✅ | Art. R. 1336-1 CSP ; enfants ≤ 6 ans : 94/104 ; « glissant » vient de l'arrêté d'application ; existant au 1er oct. 2018 | [Légifrance — décret n° 2017-1244](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000035388481) |
| 7.10 | Bouchons musicien −15/−20 ; mousse SNR 25–35 ; 60/60 empirique | ⚠️ | Filtres ER-9/15/25 (9–25 dB) ; mousse 3M 1100 SNR 35–37 → « ~28–37 » ; 60/60 issue de **Fligor & Cox 2004** (baladeurs CD, casque supra-aural) | [hearingreview.com](https://hearingreview.com) · [3m.com](https://www.3m.com) · [PubMed 15604913](https://pubmed.ncbi.nlm.nih.gov/15604913/) · DOI [10.1097/00003446-200412000-00001](https://doi.org/10.1097/00003446-200412000-00001) |
| 7.11 | Surdité brutale : urgence sous 48 h | ⚠️ | AAO-HNS 2019, SFORL 2020 : urgence, traitement précoce ; « 48 h » n'est pas dans les guidelines → « 24–72 h ; efficacité maintenue jusqu'à deux semaines » | [PubMed 31369359](https://pubmed.ncbi.nlm.nih.gov/31369359/) · [sforl.org (PDF corticothérapie)](https://sforl.org) · DOI [10.1177/0194599819859885](https://doi.org/10.1177/0194599819859885) |
| 7.12 | f0 homme 85–180, femme 165–255 | ⚠️ | Fitch & Holbrook 1970 : hommes **90–155** ; femmes 165–255 exact ; Holmberg 1988 : 116 / 205 Hz | [en.wikipedia.org/wiki/Voice_frequency](https://en.wikipedia.org/wiki/Voice_frequency) · [voicescience.org](https://voicescience.org) · DOI [10.1001/archotol.1970.04310040067012](https://doi.org/10.1001/archotol.1970.04310040067012) · DOI [10.1121/1.396829](https://doi.org/10.1121/1.396829) · DOI [10.1016/s0095-4470(19)31188-x](https://doi.org/10.1016/s0095-4470(19)31188-x) · (Hollien 1974) |
| 7.13 | Formant du chanteur 2,5–3 kHz | ✅ | Sundberg 1974, 2001 : ~3 kHz (2,4–3,6 selon voix) | [PubMed 11411472](https://pubmed.ncbi.nlm.nih.gov/11411472/) · DOI [10.1121/1.1914609](https://doi.org/10.1121/1.1914609) · DOI [10.1016/S0892-1997(01)00019-4](https://doi.org/10.1016/S0892-1997(01)00019-4) |
| 7.14 | Téléphone 300–3400 Hz | ✅ | UIT-T P.310 | [itu.int/rec/T-REC-P.310](https://itu.int/rec/T-REC-P.310) |
| 7.15 | Motherese reproductible | ✅ | Fernald 1989 (6 langues) ; Hilton 2022 (21 sociétés) ; amplitude variable (japonais) | Crossref · [journals.sagepub.com ManyBabies](https://journals.sagepub.com) · DOI [10.1017/S0305000900010679](https://doi.org/10.1017/S0305000900010679) · DOI [10.1038/s41562-022-01410-x](https://doi.org/10.1038/s41562-022-01410-x) · DOI [10.1177/2515245919900809](https://doi.org/10.1177/2515245919900809) |
| 7.16 | Écholocation humaine : Thaler, Kish ; clics audibles | ✅ | Clics ~3 ms, pics 2–4 kHz, cône 60° | [PMC 5578488](https://pmc.ncbi.nlm.nih.gov/articles/PMC5578488/) · DOI [10.1371/journal.pone.0020162](https://doi.org/10.1371/journal.pone.0020162) · DOI [10.1371/journal.pcbi.1005670](https://doi.org/10.1371/journal.pcbi.1005670) |
| 7.17 | B1 B2 ; phonocardiographie ; Weber/Rinne | ✅ | Diapason 512 Hz | [merckmanuals.com](https://merckmanuals.com) · [thebsa.org.uk (procédure 2022)](https://thebsa.org.uk) |
| 7.18 | Jitter, shimmer, VRP | ✅ | Protocole ELS, Dejonckere 2001 | [PubMed 15144022](https://pubmed.ncbi.nlm.nih.gov/15144022/) · DOI [10.1007/s004050000299](https://doi.org/10.1007/s004050000299) |
| 7.19 | Sabine 1868–1919 ; Fogg 1895 ; coussins ; 0,161 ; BSH 1900 | ✅ | Symphony Hall 15 oct. 1900 ; Sabine **conseiller acoustique** (architecte McKim, Mead & White) ; 0,161 = forme métrique moderne (0,049 en pieds) | [bso.org](https://bso.org) · [aps.org](https://aps.org) · [lindahall.org](https://lindahall.org) |
| 7.20 | Eyring, Norris, Beranek, Barron, Hidaka ; anéchoïque ; RT60 < 0,3 s | ⚠️ | Eyring JASA 1 (1930) ; Beranek forge « anechoic » ; Hidaka & Beranek 2000 ; EBU Tech 3276 : régie 0,2–0,4 s selon volume → « régie ou cabine : 0,2–0,3 s » ; Norris non vérifié séparément | [tech.ebu.ch/docs/tech/tech3276.pdf](https://tech.ebu.ch/docs/tech/tech3276.pdf) · DOI [10.1121/1.1915175](https://doi.org/10.1121/1.1915175) · DOI [10.1121/1.428309](https://doi.org/10.1121/1.428309) |

**Synthèse du lot**

- **❌** : aucun. Deux retouches de texte : 6 (53 dB = gêne, pas risque) ; 19 (« conseiller acoustique », pas « conçoit »).
- **⚠️** : 5, 6, 8, 10, 11, 12, 20.
- **Graphies** : aucune (Wilden A. Munson correct).
- **Vigilance** : EUR-Lex non lisible automatiquement, garder l'URL officielle mais recoupée via INERIS + Légifrance.

## Lot 08 — Bioacoustique & infrasons

**Comptes :** 16 ✅ · 6 ⚠️ · 1 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 8.1 | Audiogrammes Heffner : chien, chat, souris, éléphant, dauphin | ⚠️ | Chien 67 Hz–45 kHz ; chat 55 Hz–79 kHz ; **souris 2,3–85,5 kHz** (Heffner 2007) ; éléphant 17 Hz ; **dauphin absent de Heffner** (sous l'eau, re 1 µPa) → « ~75–150 Hz à ~150 kHz, sous l'eau » | [vogelabwehr.at (PDF Heffner 2007)](https://vogelabwehr.at) · [lsu.edu/vetmed/deafness/hearingrange.php](https://lsu.edu/vetmed/deafness/hearingrange.php) · [en.wikipedia.org/wiki/Hearing_range](https://en.wikipedia.org/wiki/Hearing_range) · (PMID 17203911) |
| 8.2 | Pigeon 0,05 Hz, Kreithen & Quine 1979 | ✅ | Audiogramme cardiaque 0,05–200 Hz ; +50 dB de sensibilité sous 10 Hz | [link.springer.com/article/10.1007/BF00679906](https://link.springer.com/article/10.1007/BF00679906) · DOI [10.1007/BF00679906](https://doi.org/10.1007/BF00679906) |
| 8.3 | Grillon : 4–5 kHz et 20–40 kHz | ⚠️ | Voie « chauve-souris » **15–100 kHz** → « ~20 kHz et au-delà, jusqu'à ~100 kHz » | [en.wikipedia.org/wiki/Ultrasound_avoidance](https://en.wikipedia.org/wiki/Ultrasound_avoidance) |
| 8.4 | Syrinx (Suthers) ; apprentissage vocal 7 lignées ; Thorpe 1954 | ✅ | Nature 347 (1990) ; Nature 173 (1954) ; primates : « continuum » débattu | [frontiersin.org fevo.2023.1193903](https://frontiersin.org) · DOI [10.1038/347473a0](https://doi.org/10.1038/347473a0) · DOI [10.1038/173465a0](https://doi.org/10.1038/173465a0) |
| 8.5 | Dolbear 1897 | ✅ | Am. Nat. 31 ; Oecanthus fultoni, 55–100 °F | [noaa.gov/education (crickets temperature)](https://noaa.gov/education) · DOI [10.1086/276739](https://doi.org/10.1086/276739) |
| 8.6 | Cigales ~106 dB à 50 cm ; tympans repliés | ✅ | Brevisana brevis 106,7 dB ; « désactive » ses tympans | [guinnessworldrecords.com](https://guinnessworldrecords.com) · [en.wikipedia.org/wiki/Cicada](https://en.wikipedia.org/wiki/Cicada) · DOI [10.1093/aesa/88.4.479](https://doi.org/10.1093/aesa/88.4.479) |
| 8.7 | Moustique Johnston, femelle 400–600 Hz | ⚠️ | Femelle ~400–500 Hz, **mâle ~600** (Cator 2009, convergence 1 200 Hz) | [science.org/doi/10.1126/science.1166541](https://science.org/doi/10.1126/science.1166541) · DOI [10.1126/science.1166541](https://doi.org/10.1126/science.1166541) |
| 8.8 | Osselets de Weber ~65 % ; ligne latérale ; tambours ; larves de récif | ✅ | « environ deux tiers (65–70 %) » ; tambour noir 94/188/282 Hz ; Simpson 2005 | [en.wikipedia.org/wiki/Ostariophysi](https://en.wikipedia.org/wiki/Ostariophysi) · DOI [10.1126/science.adr4494](https://doi.org/10.1126/science.adr4494) · DOI [10.1121/1.3621514](https://doi.org/10.1121/1.3621514) · DOI [10.1577/t05-207.1](https://doi.org/10.1577/t05-207.1) · DOI [10.1126/science.1107406](https://doi.org/10.1126/science.1107406) |
| 8.9 | Baleines bleue/rorqual 10–40 Hz, 180–190 dB ; Payne & McVay 1971 ; Noad 2000 | ✅ | Širović 2007 : 189 ± 3 dB (25–29 Hz), 189 ± 4 (15–28 Hz) | [PubMed 17672667](https://pubmed.ncbi.nlm.nih.gov/17672667/) · DOI [10.1121/1.2749452](https://doi.org/10.1121/1.2749452) · DOI [10.1126/science.173.3997.585](https://doi.org/10.1126/science.173.3997.585) · DOI [10.1038/35046199](https://doi.org/10.1038/35046199) |
| 8.10 | +3 dB/décennie, Andrew 2002 | ✅ | +~10 dB à 20–80 Hz entre 1963–65 et 1994–2001 ; plateau après 2000 sur certains sites | [dosits.org (ocean noise variability)](https://dosits.org) · DOI [10.1121/1.1461915](https://doi.org/10.1121/1.1461915) |
| 8.11 | Lombard 1911 ; Slabbekoorn & Peet 2003 | ✅ | Ann. Mal. Oreille Larynx 37 ; Nature 424 | [nature.com/articles/424267a](https://nature.com/articles/424267a) · DOI [10.1038/424267a](https://doi.org/10.1038/424267a) · DOI [10.1163/000579511x605759](https://doi.org/10.1163/000579511x605759) |
| 8.12 | Canons à air ~230 dB ; échouages baleines à bec | ⚠️ | 220–230 dB **crête par canon** ; 240–260 = équivalents de réseau ; Bahamas 2000, Canaries 2002 ; Jepson 2003 (bulles) | [geoexpro.com](https://geoexpro.com) · [repository.library.noaa.gov/view/noaa/16198](https://repository.library.noaa.gov/view/noaa/16198) · DOI [10.1038/425575a](https://doi.org/10.1038/425575a) · DOI [10.47536/jcrm.v7i3.729](https://doi.org/10.47536/jcrm.v7i3.729) |
| 8.13 | Éléphants 14–35 Hz ; O'Connell-Rodwell sol | ✅ | Payne 1986 (14–24) ; Poole 1988 (14–35, 103 dB à 5 m) ; Physiology 2007 | [journals.physiology.org](https://journals.physiology.org) · DOI [10.1007/BF00300007](https://doi.org/10.1007/BF00300007) · DOI [10.1007/BF00294975](https://doi.org/10.1007/BF00294975) · DOI [10.1152/physiol.00008.2007](https://doi.org/10.1152/physiol.00008.2007) |
| 8.14 | λ : 17 m ; 343 m ; 34 km | ✅ | Recalculé | — |
| 8.15 | Microbaroms ~0,2 Hz | ✅ | Houles opposées ~10 s | [en.wikipedia.org/wiki/Microbarom](https://en.wikipedia.org/wiki/Microbarom) |
| 8.16 | Krakatoa tour du monde ; Hunga Tonga IMS ; Chelyabinsk | ✅ | 7 passages (1883) ; Lamb 4+3 passages (Matoza 2022) ; 20 stations (Le Pichon 2013) | [science.org/doi/10.1126/science.abo7063](https://science.org/doi/10.1126/science.abo7063) · DOI [10.1126/science.abo7063](https://doi.org/10.1126/science.abo7063) · DOI [10.1016/j.epsl.2022.117639](https://doi.org/10.1016/j.epsl.2022.117639) · DOI [10.1002/grl.50619](https://doi.org/10.1002/grl.50619) · DOI [10.1002/2015GL063482](https://doi.org/10.1002/2015GL063482) · DOI [10.1007/s00024-024-03507-y](https://doi.org/10.1007/s00024-024-03507-y) |
| 8.17 | Alligators, girafes, tigres, hippopotames | 🔶 | Alligator, hippo : publiés ; tigre : congrès ; **girafe : Baotic 2015, rien sous 20 Hz** → retirer ou « supposé, infirmé » | [bmcresnotes.biomedcentral.com (Baotic 2015)](https://bmcresnotes.biomedcentral.com) · DOI [10.1186/s13104-015-1394-3](https://doi.org/10.1186/s13104-015-1394-3) · DOI [10.1016/j.anbehav.2003.10.034](https://doi.org/10.1016/j.anbehav.2003.10.034) |
| 8.18 | Seuil sous 20 Hz monte vite ; non spécifique | ✅ | Møller & Pedersen 2004 ; chiffres (≈80 dB à 20 Hz, ≈100 à 10 Hz) non relus | [PubMed 15273023](https://pubmed.ncbi.nlm.nih.gov/15273023/) |
| 8.19 | CTBTO, dizaines de stations IS | ✅ | 53 stations (41 certifiées 2019), 60 prévues (non relu, ctbto.org 403) | [en.wikipedia.org/wiki/Infrasound](https://en.wikipedia.org/wiki/Infrasound) · DOI [10.1002/grl.50619](https://doi.org/10.1002/grl.50619) |
| 8.20 | Modèles NCPAC, infraGA | ⚠️ | **« NCPAC » n'existe pas : ncpaprop** (NCPA, Mississippi) ; infraGA (Los Alamos) | [github.com/chetzer-ncpa/ncpaprop-release](https://github.com/chetzer-ncpa/ncpaprop-release) · [github.com/LANL-Seismoacoustics/infraGA](https://github.com/LANL-Seismoacoustics/infraGA) |
| 8.21 | Schumann 7,8 Hz, EM | ✅ | 7,83 ; 14,1 ; 20,3 ; 26,3 ; 32,5 Hz | [en.wikipedia.org/wiki/Schumann_resonances](https://en.wikipedia.org/wiki/Schumann_resonances) |
| 8.22 | Pondération G ISO 7196 ; LRAD audible | ✅ | ISO 7196:1995 ; LRAD 2–4 kHz, ~160 dB à 1 m | [knowledge.bsigroup.com](https://knowledge.bsigroup.com) · [en.wikipedia.org/wiki/Long-range_acoustic_device](https://en.wikipedia.org/wiki/Long-range_acoustic_device) |
| 8.23 | Orgue/sub/drop 30–60 Hz, rarement infra | ⚠️ | Sub-bass 20–70 Hz ; **orgue 32′ → 16 Hz, 64′ → 8 Hz** : vrai pour la sono, pas pour les grandes orgues | [en.wikipedia.org/wiki/Sub-bass](https://en.wikipedia.org/wiki/Sub-bass) · [en.wikipedia.org/wiki/Organ_stop](https://en.wikipedia.org/wiki/Organ_stop) |

**Synthèse du lot**

- **❌** : aucun.
- **⚠️/🔶** : 1 (dauphin hors Heffner ; souris 2–85), 3 (jusqu'à 100 kHz), 7 (400–500 femelle), 12 (crête par canon), 17 (girafe à retirer), 20 (ncpaprop), 23 (sub-bass 20–70 ; orgue 16 Hz).
- **Graphies** : NCPAC → ncpaprop.
- **Limites** : ctbto.org, iso.org, dosits.org, scholarpedia inaccessibles.

## Lot 09 — Ultrasons chez les animaux

**Comptes :** 7 ✅ · 10 ⚠️ · 0 🔶 · 2 ❌ · 1 non vérifié

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 9.1 | λ 40 kHz : 8,6 mm air ; 37 mm eau | ✅ | Recalculé | — |
| 9.2 | Griffin, Webster & Michael 1960 : search/approach/buzz | ✅ | Anim. Behav. 8 ; buzz ~200 cris/s (chauves-souris), ~500 clics/s (odontocètes, Vance 2021) | Crossref · DOI [10.1016/0003-3472(60)90022-1](https://doi.org/10.1016/0003-3472(60)90022-1) · DOI [10.7554/eLife.68825](https://doi.org/10.7554/eLife.68825) |
| 9.3 | Pierce & Griffin 1938 (~45–50 kHz) ; Griffin & Galambos 1940–42 ; « echolocation » 1944 | ⚠️ | Références exactes (J. Mammal. 19 ; J. Exp. Zool. 86 et 89 ; Science 100) ; écrire **1941–42** ; « ~45–50 kHz » non sourcé → « des dizaines de kHz » | [en.wikipedia.org/wiki/Donald_Griffin](https://en.wikipedia.org/wiki/Donald_Griffin) · DOI [10.2307/1374231](https://doi.org/10.2307/1374231) · DOI [10.1002/jez.1400860310](https://doi.org/10.1002/jez.1400860310) · DOI [10.1002/jez.1400890308](https://doi.org/10.1002/jez.1400890308) · DOI [10.1126/science.100.2609.589](https://doi.org/10.1126/science.100.2609.589) |
| 9.4 | Schnitzler 1968 | ✅ | Z. vergl. Physiol. 57 | Crossref · DOI [10.1007/BF00303062](https://doi.org/10.1007/BF00303062) |
| 9.5 | Håkansson et al. 2022 : 250 000 i/s, 10–95 kHz, 1–5 kHz, 7 octaves | ✅ | PLOS Biol 20 ; 250 000 i/s = membranes vocales (plis ventriculaires 10–20 000 i/s) | [journals.plos.org/plosbiology 10.1371/journal.pbio.3001881](https://journals.plos.org/plosbiology) · DOI [10.1371/journal.pbio.3001881](https://doi.org/10.1371/journal.pbio.3001881) |
| 9.6 | > 1 400 espèces, ~20 % | ⚠️ | Aujourd'hui **~1 500** (BCI, Wikipedia) ; 20 % confirmé | [batcon.org/about-bats/bats-101](https://batcon.org/about-bats/bats-101) |
| 9.7 | M. lucifugus 100→50 / 80→40 ; 50–100 ms ; buzz 0,5 ms, 5–6 ms, 25–30 kHz | ⚠️ | Fenton & Bell 1979 : 80→40 kHz, ~20 cris/s ; buzz ~200/s ; « 100→50 (Griffin 1960) », « 0,5 ms », « 25–30 kHz » non lus (article 1960 inaccessible) | [en.wikipedia.org/wiki/Little_brown_bat](https://en.wikipedia.org/wiki/Little_brown_bat) · DOI [10.1139/z79-163](https://doi.org/10.1139/z79-163) |
| 9.8 | R. ferrumequinum ~82 kHz, fovéa (Neuweiler) | ✅ | 81–83 kHz ; preuve expérimentale **Schuller & Pollak 1979** à citer | [en.wikipedia.org/wiki/Greater_horseshoe_bat](https://en.wikipedia.org/wiki/Greater_horseshoe_bat) · DOI [10.1007/BF00617731](https://doi.org/10.1007/BF00617731) |
| 9.9 | Clics 120–130 dB SPL à 10 cm (Jones et al. 2007) | ⚠️ | Ce sont des **cris** ; 122–134 dB, > 140 (Noctilio) ; primaires = Holderied & von Helversen 2003, Surlykke & Kalko 2008 ; « Jones et al. » = **Jones & Holderied 2007** (revue) | Europe PMC · DOI [10.1371/journal.pone.0002036](https://doi.org/10.1371/journal.pone.0002036) · DOI [10.1098/rspb.2003.2487](https://doi.org/10.1098/rspb.2003.2487) · DOI [10.1098/rspb.2006.0200](https://doi.org/10.1098/rspb.2006.0200) |
| 9.10 | ≥ 6 ordres d'insectes ; mites 20–50 kHz ; allotonique | ⚠️ | « au moins **six ou sept** ordres » ; noctuelles 20–30 kHz ; **ter** Hofstede ; Yack & Dawson 2008 = chapitre de *The Senses* | [en.wikipedia.org/wiki/Tympanal_organ](https://en.wikipedia.org/wiki/Tympanal_organ) · DOI [10.1242/jeb.086686](https://doi.org/10.1242/jeb.086686) · DOI [10.1016/B978-012370880-9.00003-7](https://doi.org/10.1016/B978-012370880-9.00003-7) |
| 9.11 | Neil 2020 thorax 67 ± 9 % ; PNAS ailes | ✅ | Mites **sans oreilles**, en moyenne | Europe PMC · DOI [10.1098/rsif.2019.0692](https://doi.org/10.1098/rsif.2019.0692) · DOI [10.1073/pnas.2014531117](https://doi.org/10.1073/pnas.2014531117) |
| 9.12 | Arctiidés Blest 1963, Melese 30–90 kHz ; sphinx 57/124 (Kawahara & Barber 2015) | ⚠️ | Sphinx exact ; **Blest, Collett & Pye 1963** ; bande 30–90 kHz **non vérifiée** → « clics ultrasonores » | Europe PMC · DOI [10.1073/pnas.1416679112](https://doi.org/10.1073/pnas.1416679112) · DOI [10.1098/rspb.1963.0042](https://doi.org/10.1098/rspb.1963.0042) |
| 9.13 | Lèvres phoniques dans le melon ; faisceau 6–10° | ⚠️ | Lèvres phoniques **sous** le melon (lentille) ; Tursiops **~10°** à −3 dB (bec blanc 8°) | [PubMed 3745687](https://pubmed.ncbi.nlm.nih.gov/3745687/) · [PubMed 30449667](https://pubmed.ncbi.nlm.nih.gov/30449667/) · DOI [10.1121/1.1775274](https://doi.org/10.1121/1.1775274) · DOI [10.1121/1.394012](https://doi.org/10.1121/1.394012) · DOI [10.1016/j.cub.2018.10.037](https://doi.org/10.1016/j.cub.2018.10.037) |
| 9.14 | Tursiops 228 dB p-p (Au 1974) ; cachalot 236 rms / 240 p-p (Møhl 2003) ; centroïde 10–20 kHz ; bec blanc 115/250 kHz ; buzz 100–1000/s | ⚠️ | 236 dB rms et centroïde 15 kHz confirmés ; **228 dB p-p non vérifié** ; 115/250 kHz non vérifiés ; « 1000/s » → **jusqu'à ~500/s** ; Au, Floyd, Penner & Murchison 1974 | Europe PMC · [PubMed 11865816](https://pubmed.ncbi.nlm.nih.gov/11865816/) · DOI [10.1121/1.1586258](https://doi.org/10.1121/1.1586258) · DOI [10.1121/1.1433814](https://doi.org/10.1121/1.1433814) · DOI [10.7554/eLife.68825](https://doi.org/10.7554/eLife.68825) · DOI [10.1121/1.1903419](https://doi.org/10.1121/1.1903419) |
| 9.15 | Slow clicks 0,1–0,3 Hz, > 200 dB p-p, 70 km (Videsen 2026) | ✅ | Ann. N. Y. Acad. Sci. 1559 (mai 2026) ; « estimé par modélisation » | Europe PMC · DOI [10.1111/nyas.70289](https://doi.org/10.1111/nyas.70289) |
| 9.16 | Guacharo, salanganes 0,5–3 kHz (Thompson & Suthers ; Konishi & Knudsen) ; 3 cm | ⚠️ | Chiffres justes, **citation fausse** : guacharo = Suthers & Hector 1985 (0,5–3 kHz, 3,2 cm), Konishi & Knudsen 1979 ; salanganes = Griffin & Suthers 1970, Griffin & Thompson 1982 (1–10 kHz, 6 mm) | [PMC 3664765 — Brinkløv 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3664765/) · DOI [10.3389/fphys.2013.00123](https://doi.org/10.3389/fphys.2013.00123) · DOI [10.1126/science.441731](https://doi.org/10.1126/science.441731) · DOI [10.1007/BF00610867](https://doi.org/10.1007/BF00610867) · DOI [10.2307/1540368](https://doi.org/10.2307/1540368) · DOI [10.1007/BF00300171](https://doi.org/10.1007/BF00300171) |
| 9.17 | Musaraignes 30–100 kHz | ❌ | Siemers 2009 : gazouillis tonals, 1er harmonique **4–8 kHz, énergie < 20 kHz** ; orientation par échos courte portée → « cris surtout audibles » | [PMC 2781971](https://pmc.ncbi.nlm.nih.gov/articles/PMC2781971/) · DOI [10.1098/rsbl.2009.0378](https://doi.org/10.1098/rsbl.2009.0378) |
| 9.18 | Rongeurs : pups 30–150 kHz, 103 dB à 10 cm ; souris 48–79 kHz ; audition 1,5–92 kHz ; rat 22/50 | ⚠️ | Rat 22/50 confirmé ; chants souris **30–110 kHz** ; audiogramme et 103 dB **non vérifiés** → « ~1–2 kHz à > 80 kHz » | [PubMed 17203913](https://pubmed.ncbi.nlm.nih.gov/17203913/) · [PubMed 16248680](https://pubmed.ncbi.nlm.nih.gov/16248680/) · [PubMed 12204355](https://pubmed.ncbi.nlm.nih.gov/12204355/) · DOI [10.1371/journal.pbio.0030386](https://doi.org/10.1371/journal.pbio.0030386) · DOI [10.1016/S0378-5955(02)00492-6](https://doi.org/10.1016/S0378-5955(02)00492-6) |
| 9.19 | Odorrana tormota : Feng 2006 ; Shen 2008 « femelles localisent » | ❌ | 2006 exact ; 2008 : les **femelles émettent** l'appel de cour, les **mâles localisent** (< 1°) — sens inversé | [PubMed 18469804](https://pubmed.ncbi.nlm.nih.gov/18469804/) · [en.wikipedia.org/wiki/Odorrana_tormota](https://en.wikipedia.org/wiki/Odorrana_tormota) · DOI [10.1038/nature04416](https://doi.org/10.1038/nature04416) · DOI [10.1038/nature06719](https://doi.org/10.1038/nature06719) |
| 9.20 | Répulsifs : habituation 3–7 jours ; anti-cafard > 160 dB | non vérifié | Inefficacité documentée (Nebraska 1995, FTC 2003, Schreck 1984) ; les deux chiffres non retrouvés → « quelques jours » ; « niveaux sans rapport avec un appareil domestique » | [en.wikipedia.org/wiki/Electronic_pest_control](https://en.wikipedia.org/wiki/Electronic_pest_control) · DOI [10.2307/3808417](https://doi.org/10.2307/3808417) · DOI [10.1080/10934528409375178](https://doi.org/10.1080/10934528409375178) · DOI [10.1093/jee/77.6.1507](https://doi.org/10.1093/jee/77.6.1507) |

**Synthèse du lot**

- **❌** : 17 (musaraignes audibles), 19 (femelles appellent, mâles localisent).
- **⚠️** : 3, 6, 7, 9, 10, 12, 13, 14, 16, 18 ; non vérifié : 20.
- **Graphies** : Thompson & Suthers → Suthers & Hector 1985 / Griffin & Suthers 1970 / Griffin & Thompson 1982 ; Jones et al. → Jones & Holderied 2007 ; Blest → Blest, Collett & Pye 1963 ; ter Hofstede ; 1941–42 ; Au, Floyd, Penner & Murchison 1974.

## Lot 10 — Bruit, industrie, art & intox

**Comptes :** 11 ✅ · 7 ⚠️ · 1 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 10.1 | Lighthill 1952, quadripôle | ✅ | Proc. R. Soc. A 211 ; P ∝ U⁸ (subsonique) | [en.wikipedia.org/wiki/Aeroacoustics](https://en.wikipedia.org/wiki/Aeroacoustics) · DOI [10.1098/rspa.1952.0060](https://doi.org/10.1098/rspa.1952.0060) |
| 10.2 | Maxim 1909 ; Lueg 1936 ; Bose 2000s | ⚠️ | 1909 = brevet du silencieux d'**arme** (US 916 885) ; auto « en parallèle, années 1900–1910 » ; Lueg déposé 1933–34, délivré 1936 ; Bose QuietComfort 2000 | [en.wikipedia.org/wiki/Hiram_Percy_Maxim](https://en.wikipedia.org/wiki/Hiram_Percy_Maxim) · [patents.google.com/patent/US2043416A](https://patents.google.com/patent/US2043416A) |
| 10.3 | RCA Mark II ; Moog ; DX7 1983 ; Acousmonium ; Ambisonics ; Atmos | ✅ | 1957 ; 1964/1970 ; licence Yamaha 1973, DX7 1983 ; Acousmonium 1974 (Bayle, GRM) ; Atmos juin 2012 | [en.wikipedia.org (6 pages)](https://en.wikipedia.org) |
| 10.4 | Jenny, Kymatik 1967 | ✅ | Vol. 1 1967, vol. 2 1972 | [en.wikipedia.org/wiki/Hans_Jenny_(cymatics)](https://en.wikipedia.org/wiki/Hans_Jenny_(cymatics)) |
| 10.5 | Diapason 415 / 435 (1859) / 440 (1939) / ISO 16 / ASA 1936 / Verdi 1884 | ⚠️ | Arrêté 16 févr. 1859 ; Vienne 1885 ; ASA 1936 ; Londres mai 1939 ; **ISO R 16 (1955), ISO 16 (1975)** ; Italie : décret 432 Hz en 1884 (it.wikipedia) ; lettre de Verdi et motif « voix » **non retrouvés** → conditionnel ; « Verdi tuning » = campagne Schiller Institute 1988 | [en.wikipedia.org/wiki/Concert_pitch](https://en.wikipedia.org/wiki/Concert_pitch) · [en.wikipedia.org/wiki/A440_(pitch_standard)](https://en.wikipedia.org/wiki/A440_(pitch_standard)) · [it.wikipedia.org/wiki/Diapason](https://it.wikipedia.org/wiki/Diapason) · [en.wikipedia.org/wiki/Scientific_pitch](https://en.wikipedia.org/wiki/Scientific_pitch) |
| 10.6 | Seconde césium 1967 | ✅ | 13e CGPM rés. 1 | [bipm.org/en/committees/cg/cgpm/13-1967/resolution-1](https://bipm.org/en/committees/cg/cgpm/13-1967/resolution-1) |
| 10.7 | Calamassi & Pomponi 2019, 33 personnes | ✅ | Explore 15(4) ; FC −4,79 bpm p = 0,05 ; non randomisé | Europe PMC · DOI [10.1016/j.explore.2019.04.001](https://doi.org/10.1016/j.explore.2019.04.001) |
| 10.8 | 528 Hz : Puleo/Horowitz **1998** ; do5 à 444 | ⚠️ | Livre **1999** (Healing Codes…) ; 444 × 2^(3/12) = 528,0 ; 523,25 à 440 ; 15,6 cents | [openlibrary.org](https://openlibrary.org) · [en.wikipedia.org/wiki/Solfège](https://en.wikipedia.org/wiki/Solfège) |
| 10.9 | Binaural : Oster 1973 ; Garcia-Argibay 2019 « petits, hétérogènes » ; ASSR EEG | 🔶 | Méta-analyse 2019 : effet **moyen g = 0,45**, dépendant des protocoles ; revue EEG Ingendoh et al. PLOS ONE 2023 : entraînement non démontré (5/14) → reformuler : « effet moyen mais très dépendant des protocoles ; entraînement cérébral non démontré » ; ASSR « mesurable mais faible » | [en.wikipedia.org/wiki/Binaural_beats](https://en.wikipedia.org/wiki/Binaural_beats) · DOI [10.1038/scientificamerican1073-94](https://doi.org/10.1038/scientificamerican1073-94) · DOI [10.1007/s00426-018-1066-8](https://doi.org/10.1007/s00426-018-1066-8) · DOI [10.1371/journal.pone.0286023](https://doi.org/10.1371/journal.pone.0286023) |
| 10.10 | Faraday 1831 | ✅ | Phil. Trans. 121 | Crossref · DOI [10.1098/rstl.1831.0018](https://doi.org/10.1098/rstl.1831.0018) |
| 10.11 | Emoto ; Radin 2006 ; Nakaya 1954 ; 0,02 Pa | ⚠️ | 0,02 Pa exact, mais **0,02/101 325 ≈ 2×10⁻⁷ = deux dix-millionièmes** (le script dit « vingt millionièmes » : ×100 trop) ; Radin 2006 co-signé par Emoto, aveugle partiel → « faible et non répliqué indépendamment » | [en.wikipedia.org/wiki/Masaru_Emoto](https://en.wikipedia.org/wiki/Masaru_Emoto) · [en.wikipedia.org/wiki/Ukichiro_Nakaya](https://en.wikipedia.org/wiki/Ukichiro_Nakaya) · DOI [10.1016/j.explore.2006.06.004](https://doi.org/10.1016/j.explore.2006.06.004) |
| 10.12 | Schumann 1952 ; Balser & Wagner 1960 ; 7,83 ; pT ; alpha | ✅ | Pics 7,83 ; 14,1 ; 20,3 ; 26,3 ; 32,5 Hz ; ~1 pT | [en.wikipedia.org/wiki/Schumann_resonances](https://en.wikipedia.org/wiki/Schumann_resonances) · DOI [10.1515/zna-1952-0202](https://doi.org/10.1515/zna-1952-0202) · DOI [10.1038/188638a0](https://doi.org/10.1038/188638a0) |
| 10.13 | LRAD 150 dB ; La Havane ; NASEM 2020 ; ODNI 2023 | ✅ (à dater) | Citations fidèles ; LRAD 137–154 dB (police), 160 (militaire) ; acoustique écartée 2018–19 (grillon *Anurogryllus celerinictus*) ; **depuis** : NIH/JAMA 2024 sans lésion, ODNI janv. 2025 nuancé, presse 2026 non confirmée → dater « au printemps 2023 » et ajouter une phrase | [nationalacademies.org/read/25889/chapter/2](https://nationalacademies.org/read/25889/chapter/2) · [en.wikipedia.org/wiki/Havana_syndrome](https://en.wikipedia.org/wiki/Havana_syndrome) · DOI [10.17226/25889](https://doi.org/10.17226/25889) |
| 10.14 | 7 Hz ≈ 50 m, non focalisable | ✅ | 49 m | calcul |
| 10.15 | FTC 2001 ; Cochrane 2007 | ✅ | FTC 3 mai 2001, > 60 lettres ; CD005434 : 10 essais, 0 effet ; « la femelle ne fuit pas le mâle » = glose, pas résultat | [ftc.gov (press release 2001/05)](https://ftc.gov) · DOI [10.1002/14651858.CD005434.pub2](https://doi.org/10.1002/14651858.CD005434.pub2) |
| 10.16 | Rauscher 1993 ; Pietschnig 2010 | ✅ | 36 étudiants, K. 448, 10–15 min ; méta ~39 études | [en.wikipedia.org/wiki/Mozart_effect](https://en.wikipedia.org/wiki/Mozart_effect) · DOI [10.1038/365611a0](https://doi.org/10.1038/365611a0) · DOI [10.1016/j.intell.2010.03.001](https://doi.org/10.1016/j.intell.2010.03.001) |
| 10.17 | Iaccarino 2016 lumière/son ; Cognito phase 3 en cours | ⚠️ | Iaccarino 2016 = **lumière** seule ; **son** = Martorell et al., Cell 2019 ; essai HOPE NCT05637801 (673 patients) **achevé été 2026, résultats non publiés** au 23 sept. 2026 ; Breakthrough Device ≠ autorisation | [ClinicalTrials.gov — essai HOPE NCT05637801](https://clinicaltrials.gov/study/NCT05637801) · [cognitotx.com](https://cognitotx.com) · DOI [10.1038/nature20587](https://doi.org/10.1038/nature20587) · DOI [10.1016/j.cell.2019.02.014](https://doi.org/10.1016/j.cell.2019.02.014) |
| 10.18 | Tesla 3-6-9 sans source, années 2010 | ⚠️ | Absente de Wikiquote ; « années 2010 » non vérifié → supprimer la date ou conditionnel | [en.wikiquote.org/wiki/Nikola_Tesla](https://en.wikiquote.org/wiki/Nikola_Tesla) |
| 10.19 | Persée 57/58 octaves ; Soleil ~16 octaves | ⚠️ | Persée exact ; Soleil : SOHO/MDI, ×42 000 ≈ **15 octaves** (3 mHz → ~126 Hz) → « une quinzaine » | [nasa.gov (sonifications 2022 ; sounds-of-the-sun)](https://nasa.gov) · [solar-center.stanford.edu/singing](https://solar-center.stanford.edu/singing) |

**Synthèse du lot**

- **À corriger dans les fiches intox** : (11) « vingt millionièmes » → « deux dix-millionièmes » ; (8) 1998 → 1999 ; (17) lumière = Iaccarino 2016, son = Martorell 2019 ; « essais en cours » → « essai pivot achevé été 2026, résultats non publiés » ; (19) seize → une quinzaine d'octaves ; (9) « effets petits » → « effet moyen (g = 0,45) mais dépendant des protocoles », appuyer sur la revue EEG 2023.
- **⚠️** : 2 (Maxim = arme), 5 (ISO R 16 / ISO 16 ; Verdi au conditionnel ; Schiller), 13 (dater), 18 (date à retirer), 11 (Radin co-signé).
- **Graphies** : aucune ; Kymatik / Cymatics à uniformiser.

## Lot 11 — Phonons, espace & astronomie

**Comptes :** 12 ✅ · 5 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| 11.1 | Phonon : Tamm 1932 ; Einstein 1907 ; Debye 1912 ; BCS | ⚠️ | Concept **Tamm 1930** (Z. Phys. 60) ; mot **Frenkel 1932** ; BCS 1957 | [en.wikipedia.org/wiki/Phonon](https://en.wikipedia.org/wiki/Phonon) · DOI [10.1007/bf01339935](https://doi.org/10.1007/bf01339935) · DOI [10.1002/andp.19063270110](https://doi.org/10.1002/andp.19063270110) · DOI [10.1002/andp.19123441404](https://doi.org/10.1002/andp.19123441404) · DOI [10.1103/physrev.108.1175](https://doi.org/10.1103/physrev.108.1175) |
| 11.2 | Optomécanique ; phonon–qubit | ✅ | RMP 86 (2014) ; Chan 2011 ; O'Connell 2010 ; Chu 2017 « Quantum acoustics » | Crossref · DOI [10.1103/RevModPhys.86.1391](https://doi.org/10.1103/RevModPhys.86.1391) · DOI [10.1038/nature10461](https://doi.org/10.1038/nature10461) · DOI [10.1038/nature08967](https://doi.org/10.1038/nature08967) · DOI [10.1126/science.aao1511](https://doi.org/10.1126/science.aao1511) |
| 11.3 | GW150914 : 29 + 36 M☉ ; 1,3 Gal ; 35 → 250 Hz | ✅ | PRL 116 ; 410 Mpc ; grand public dit 35 → ~150 Hz (pic d'amplitude), l'article 35 → 250 (fusion + relaxation) | [arxiv.org/abs/1602.03837](https://arxiv.org/abs/1602.03837) · [ligo.org/science-summaries/GW150914](https://ligo.org/science-summaries/GW150914) · DOI [10.1103/PhysRevLett.116.061102](https://doi.org/10.1103/PhysRevLett.116.061102) |
| 11.4 | PWS « Plasma Wave Science », PI Gurnett ; août 2012 ; 300 Hz / 2–3 kHz ; orages 2012, 2013 | ⚠️ | Science 341 (2013) : 2,2 kHz (oct–nov 2012), 2,6 kHz (avr–mai 2013) ; traversée 25 août 2012 ; **PI d'origine Frederick Scarf**, Gurnett depuis 1988 ; héliogaine 0,002 cm⁻³ → ~400 Hz → « ~300–400 Hz » ; nom : **Plasma Wave Subsystem** | [aaas.org](https://aaas.org) · [kavlifoundation.org](https://kavlifoundation.org) · [nssdc.gsfc.nasa.gov (1977-084A-13)](https://nssdc.gsfc.nasa.gov) · [en.wikipedia.org/wiki/Frederick_Scarf](https://en.wikipedia.org/wiki/Frederick_Scarf) · DOI [10.1126/science.1241681](https://doi.org/10.1126/science.1241681) |
| 11.5 | Voyager 1979 whistlers, première preuve d'éclairs ; Cassini foudre, SKR | ⚠️ | GRL 6 (1979) confirme les **photos de nuit** du même survol (Cook et al., Nature 280) → « l'une des deux premières preuves » ; « grêle des anneaux » non vérifiée | [osti.gov/biblio/6093480](https://osti.gov/biblio/6093480) · [now.uiowa.edu](https://now.uiowa.edu) · [space-audio.org](https://space-audio.org) · DOI [10.1029/GL006i006p00511](https://doi.org/10.1029/GL006i006p00511) · DOI [10.1038/280794a0](https://doi.org/10.1038/280794a0) · DOI [10.1126/science.204.4396.991](https://doi.org/10.1126/science.204.4396.991) |
| 11.6 | Golden Record 1977, Sagan, Bach, Berry, baleine | ✅ | 55 langues ; URL voyager.jpl.nasa.gov/golden-record mortes → podcast JPL | [jpl.nasa.gov/podcasts (A Voyager's View of Earth)](https://jpl.nasa.gov/podcasts) |
| 11.7 | Persée 2003, si♭ −57 octaves, 250 Mal ; 2022 ; 144/288×10¹⁵ | ✅ | ~240–250 Mal ; 2⁵⁷ = 1,44×10¹⁷ ; **Churazov n'est pas coauteur** de MNRAS 344 L43 (Fabian, Sanders, Allen, Crawford, Iwasawa, Johnstone, Schmidt, Taylor) → « Fabian, Sanders et al. » | [chandra.harvard.edu/press/03_releases/press_090903.html](https://chandra.harvard.edu/press/03_releases/press_090903.html) · [chandra.harvard.edu/photo/2022/sonify5](https://chandra.harvard.edu/photo/2022/sonify5) · DOI [10.1046/j.1365-8711.2003.06902.x](https://doi.org/10.1046/j.1365-8711.2003.06902.x) |
| 11.8 | SOHO, SDO, BiSON, GONG ; CoRoT, Kepler, TESS | ✅ | Basu 2016 ; Chaplin & Miglio 2013 | [arxiv.org/abs/1606.07071](https://arxiv.org/abs/1606.07071) · DOI [10.1007/s41116-016-0003-4](https://doi.org/10.1007/s41116-016-0003-4) · DOI [10.1146/annurev-astro-082812-140938](https://doi.org/10.1146/annurev-astro-082812-140938) |
| 11.9 | Gurnett 1940–2022, Van Allen Professor ; space-audio.org | ✅ | 11 avril 1940 – 13 janv. 2022 ; titre exact « James A. Van Allen/Roy J. Carver Professor of Physics » | [physics.uiowa.edu (nécrologie)](https://physics.uiowa.edu) · [space.physics.uiowa.edu/~dag](https://space.physics.uiowa.edu/~dag) |
| 11.10 | Whistlers depuis les années 1950 | ✅ | Entendus dès 1919 (Barkhausen), expliqués Storey 1953 | [frontiersin.org (fspas.2019.00002)](https://frontiersin.org) · DOI [10.1098/rsta.1953.0011](https://doi.org/10.1098/rsta.1953.0011) |
| 11.11 | Modes p 0,3–5 mHz, max 2–5 ; 5 min ; précision < 10⁻⁶ | ⚠️ | Observés **~1–5 mHz, pic ~3 mHz** (ν_max 3090 µHz) ; précision **≈ 3×10⁻⁶** (JCD 2002) → « quelques millionièmes » | [arxiv.org/abs/astro-ph/0207403](https://arxiv.org/abs/astro-ph/0207403) · [en.wikipedia.org/wiki/Helioseismology](https://en.wikipedia.org/wiki/Helioseismology) · DOI [10.1086/147285](https://doi.org/10.1086/147285) · DOI [10.1103/revmodphys.74.1073](https://doi.org/10.1103/revmodphys.74.1073) |
| 11.12 | Δν (Vandakurov) ≈ 135–136 µHz | ✅ | 134,9 (Kjeldsen & Bedding 1995) ; 135,1 ± 0,1 (Huber 2011) → « ≈ 135 » | [arxiv.org/abs/1109.3460](https://arxiv.org/abs/1109.3460) · DOI [10.1088/0004-637X/743/2/143](https://doi.org/10.1088/0004-637X/743/2/143) · DOI [10.1086/190678](https://doi.org/10.1086/190678) · (Tassoul 1980) |
| 11.13 | Sunquakes Kosovichev & Zharkova 1998 ; ~5 mHz ; HMI flares moyennes | ✅ | Nature 393 ; Sharykin & Kosovichev 2020 : 94 sunquakes / 500 flares M–X ; coupure ~5,3 mHz non relue → « environ 5 mHz » | [nature.com/articles/30629](https://nature.com/articles/30629) · [arxiv.org/abs/1911.04197](https://arxiv.org/abs/1911.04197) · DOI [10.1038/30629](https://doi.org/10.1038/30629) · DOI [10.3847/1538-4357/ab88d1](https://doi.org/10.3847/1538-4357/ab88d1) |
| 11.14 | CMB 380 000 ans ; Peebles & Yu 1970 ; c_s ; Silk 1968 | ✅ | Formule standard (Hu & Dodelson 2002) | [esa.int (Planck and the CMB)](https://esa.int) · DOI [10.1086/150713](https://doi.org/10.1086/150713) · DOI [10.1086/149449](https://doi.org/10.1086/149449) · DOI [10.1146/annurev.astro.40.060401.093926](https://doi.org/10.1146/annurev.astro.40.060401.093926) |
| 11.15 | f_pe ; HELIOS 20 kHz à 1 UA ; centaines de MHz près de la photosphère ; ion-acoustique 500 Hz | ⚠️ | 8,98 kHz √n_e ; « photosphère » abusif → « **basse couronne** » (à la photosphère > 30 GHz) ; f_pi = f_pe/42,8 ≈ 0,47 kHz → « autour de la fréquence plasma ionique, quelques centaines de hertz » ; Helios mesurait vers 0,5 UA | [arxiv.org/abs/1404.6117](https://arxiv.org/abs/1404.6117) · [arxiv.org/abs/2601.18495](https://arxiv.org/abs/2601.18495) · DOI [10.1088/1674-4527/14/7/003](https://doi.org/10.1088/1674-4527/14/7/003) · DOI [10.1029/JA082i004p00632](https://doi.org/10.1029/JA082i004p00632) |
| 11.16 | Ginzburg & Zheleznyakov 1958 ; Gurnett & Anderson 1976/77 ; STEREO/WAVES ; Reid & Kontar 2021 ; Solar Orbiter 47–58 kHz | ✅ | Solar Orbiter 22 sept. 2022, 47,2 / 58,5 kHz : **préprint arXiv janv. 2026** (Polanco-Rodríguez, Krafft & Savoini), à citer comme tel | [arxiv.org/abs/2601.18495](https://arxiv.org/abs/2601.18495) · DOI [10.1126/science.194.4270.1159](https://doi.org/10.1126/science.194.4270.1159) · DOI [10.1029/JA082i004p00632](https://doi.org/10.1029/JA082i004p00632) · DOI [10.1007/s11214-007-9298-8](https://doi.org/10.1007/s11214-007-9298-8) · DOI [10.1038/s41550-021-01370-8](https://doi.org/10.1038/s41550-021-01370-8) |
| 11.17 | Frise : Kundt 1866, Rubens 1905, FM 1933, Békésy 1961, Lighthill 1952, Edison 1877, Rayleigh 1877–78 | ✅ | Rubens & Krigar-Menzel Ann. Phys. 322 (1905) ; Edison annonce 21 nov. 1877 | [nobelprize.org](https://nobelprize.org) · [en.wikipedia.org/wiki/Phonograph](https://en.wikipedia.org/wiki/Phonograph) · DOI [10.1002/andp.18662030402](https://doi.org/10.1002/andp.18662030402) · DOI [10.1002/andp.19053220608](https://doi.org/10.1002/andp.19053220608) · DOI [10.1121/1.1915637](https://doi.org/10.1121/1.1915637) · DOI [10.1098/rspa.1952.0060](https://doi.org/10.1098/rspa.1952.0060) |

**Synthèse du lot**

- **❌** : aucun.
- **⚠️** : 1 (Tamm 1930 / Frenkel 1932), 4 (Scarf PI d'origine ; 300–400 Hz ; Plasma Wave Subsystem), 5 (deux preuves ; grêle non vérifiée), 11 (1–5 mHz, pic 3 mHz ; 3×10⁻⁶), 15 (basse couronne ; f_pi).
- **Graphies** : Plasma Wave Science → Plasma Wave Subsystem ; « Fabian, Sanders, Churazov, 2003 » → « Fabian, Sanders et al., 2003 » ; Zheleznyakov / Zhelezniakov à unifier ; URL Golden Record JPL mortes.
- **Non lu** : Gurnett & Anderson 1977 (Wiley) ; valeur 5,3 mHz ; formule c_s dans Hu & Dodelson.

## Compagnon Portraits — fiche 21, Bob Marley et les ingénieurs du dub

**Page :** [`provoxys/son/portraits.html#marley`](../provoxys/son/portraits.html#marley) · **vérifiée le 24 septembre 2026** (agent `verif-claims`, effort élevé ; DOI résolus sur Crossref).

**Comptes :** 9 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| P21.1 | Né le 6 févr. 1945 à Nine Mile (Jamaïque), mort le 11 mai 1981 à Miami | ✅ | Nine Mile, paroisse de Saint Ann | [britannica.com/summary/Bob-Marley](https://www.britannica.com/summary/Bob-Marley) · [history.com (11 mai, Bob Marley dies)](https://www.history.com/this-day-in-history/may-11/bob-marley-dies) |
| P21.2 | Sound systems de Kingston : Dodd (Downbeat), Duke Reid (Trojan) ; Hedley Jones et les caissons « House of Joy » | ⚠️ | **Corrigé dans la page** : *House of Joy* n'est pas le nom des caissons de Hedley Jones mais celui du sound system de **Roy Johnson**, l'un de ses premiers clients. Jones construisait amplificateurs et enceintes (pour Tom the Great Sebastian, Roy Johnson, Duke Reid). Trojan (Duke Reid) et Downbeat (Coxsone Dodd) confirmés | [daily.redbullmusicacademy.com (Hedley Jones, 2019)](https://daily.redbullmusicacademy.com/2019/05/hedley-jones-feature/) · [skabook.com (Pioneer Hedley Jones)](https://skabook.com/2014/12/19/pioneer-hedley-jones/) |
| P21.3 | Faces B « version » dès 1967–1968 ; en 1968, un acétate gravé sans la voix chez Duke Reid fait danser un sound system | ✅ (anecdote) | Acétate de « On the Beach » (Paragons) gravé chez Treasure Isle pour Ruddy Redwood, ingénieur Byron Smith ; la page la présente comme une anecdote. L'article RBMA *The Roots of Dub* ne couvre pas ces dates | [en.wikipedia.org/wiki/Dub_music](https://en.wikipedia.org/wiki/Dub_music) |
| P21.4 | King Tubby = Osbourne Ruddock (1941–1989), réparateur radio, studio de Waterhouse ; filtre passe-haut à onze crans, 70 Hz – 7,5 kHz ; console au MoPOP | ✅ | 28 janv. 1941 – 6 févr. 1989 ; Tubby's Home Town Hi-Fi (1968) ; studio 18 Drumilly Avenue ; le « Big Knob » est un filtre passif **Altec 9069B** à 11 crans, monté sur une console **MCI** achetée en 1972 à Byron Lee, conservée au Museum of Pop Culture (Seattle) | [nlj.gov.jm (King Tubby)](https://www.nlj.gov.jm/REGGAE%20EXHIBITION/King%20Tubby.htm) · [soundonsound.com (filtre KTBK)](https://www.soundonsound.com/news/audio-merge-ktbk-passive-filter) · [mopop.emuseum.com (console MCI)](https://mopop.emuseum.com/objects/95703/mci-mixing-console-formerly-owned-and-operated-by-king-tubby) |
| P21.5 | Lee Perry (1936–2021) produit les Wailers en 1970–1971 ; Black Ark 1973–1979 ; 4 pistes, Space Echo, Echoplex, ressort ; « Punky Reggae Party » (1977) Marley–Perry | ✅ | 20 mars 1936 – 29 août 2021 ; *Soul Rebels* (1970), *Soul Revolution Part II* (1971) ; Black Ark 1973–1979 (MusicRadar dit 1974) ; TEAC 4 pistes, Roland RE-201 ; 45 tours Island crédité Marley–Perry | [en.wikipedia.org/wiki/Black_Ark_Studios](https://en.wikipedia.org/wiki/Black_Ark_Studios) · [musicradar.com (Pioneers : Lee Perry)](https://www.musicradar.com/news/pioneers-lee-scratch-perry) · [bobmarley.com (Soul Rebels)](https://www.bobmarley.com/release/soul-rebels-1970/) · [discogs.com (Jamming / Punky Reggae Party)](https://www.discogs.com/release/554936-Bob-Marley-The-Wailers-Jamming-Punky-Reggae-Party) · [rolandcorp.com.au (RE-201)](https://rolandcorp.com.au/blog/the-roland-re-201-space-echo-story) |
| P21.6 | Écho à bande : retard = distance entre têtes / vitesse ; 2,5 cm à 38 cm/s ≈ 66 ms | ✅ | 1 pouce à 15 ips : 0,025 / 0,38 = 65,8 ms (calcul refait) | [strymon.net (dTape white paper)](https://www.strymon.net/strymon-dtape-technology-white-paper/) · [guitar.com (All about echo)](https://guitar.com/guides/essential-guide/all-about-echo/) |
| P21.7 | Réverbération à ressort : brevet Hammond déposé en 1939, délivré en 1941 | ✅ | US 2 230 836, déposé le 15 juil. 1939, délivré le 4 févr. 1941 | [patents.google.com/patent/US2230836A](https://patents.google.com/patent/US2230836A/en) |
| P21.8 | Henriques (sound systems, vibrations entendues et ressenties) ; étude de 2022 en concert : ~12 % de danse en plus avec des très basses fréquences non détectées | ✅ | Henriques, *Sonic Bodies* (2011) ; Cameron et al. 2022 : **+11,8 %** de mouvement (arrondi à « environ 12 % »), concert d'Orphx au LIVELab, fréquences que le public « ne semblait pas détecter » | DOI [10.5040/9781501382895](https://doi.org/10.5040/9781501382895) · DOI [10.1016/j.cub.2022.09.035](https://doi.org/10.1016/j.cub.2022.09.035) · [sciencedaily.com (7 nov. 2022)](https://www.sciencedaily.com/releases/2022/11/221107114445.htm) |
| P21.9 | Idée reçue : « Bob Marley a inventé le dub » | ✅ (réfutation confirmée) | Faux : le dub vient des ingénieurs et producteurs de studio (King Tubby, Lee Perry, Errol Thompson) ; la page le range dans « Ce qu'on lui prête à tort » | [en.wikipedia.org/wiki/Dub_music](https://en.wikipedia.org/wiki/Dub_music) · [nlj.gov.jm (King Tubby)](https://www.nlj.gov.jm/REGGAE%20EXHIBITION/King%20Tubby.htm) |
| P21.10 | Photo : Dalymount Park, Dublin, 6 juil. 1980, Eddie Mallin, CC BY 2.0 | ✅ | `File:Bob-Marley.jpg`, licence vérifiée sur Flickr en 2014 (revue de licence Commons) | [commons.wikimedia.org/wiki/File:Bob-Marley.jpg](https://commons.wikimedia.org/wiki/File:Bob-Marley.jpg) |

**Synthèse de la fiche**

- **⚠️ corrigé dans la page** : P21.2, *House of Joy* rendu à Roy Johnson (et non aux caissons de Hedley Jones).
- **Anecdote signalée comme telle** : l'acétate de 1968 (P21.3), sourcé par Wikipédia seulement.
- **2 DOI ajoutés** (Crossref) : Henriques 2011, Cameron et al. 2022 → [`refs-doi-XXXI-son.md`](refs-doi-XXXI-son.md), section « Compagnon Portraits ».

---

## Clés de physique (audit de complétude, sept. 2026)

**Origine.** L'audit de complétude physique du dossier (`provoxys/son/audit-completude-physique.md`, fiches F01–F41) a donné lieu à **42 « clés de physique »** insérées dans la page (encadrés à trois profondeurs : comprendre, utiliser, approfondir), plus un glossaire complémentaire et dix corrections de texte (sections suivantes). Les rédacteurs de chaque clé ont ouvert leurs URL, résolu leurs DOI sur Crossref et recalculé leurs exemples.

**Vérification pour l'appareil critique (24 septembre 2026).** Cinq agents ont relu les 42 clés et en ont extrait **347 affirmations spécialisées ou chiffrées** (valeurs de référence, lois avec leur domaine de validité, exemples calculés, attributions) ; **chaque exemple calculable a été recalculé en Python**, chaque URL des sections « Appuis » interrogée (aucune morte ; quelques sites refusent les robots : DOSITS, Légifrance, MathWorks, FDA, analog.com), et les **42 DOI** cités résolus sur Crossref (33 nouveaux, 9 déjà présents dans [`refs-doi-XXXI-son.md`](refs-doi-XXXI-son.md) ; **aucun rejeté**). Un **contrôle d'échantillon indépendant** de 18 affirmations tirées au hasard, source ouverte, clôt la partie (section dédiée plus bas).

**Comptes :** 347 affirmations : **309 ✅ · 35 ⚠️ · 3 🔶 · 0 ❌** — **0 ❌**. Les ⚠️ sont de deux sortes : valeurs justes mais tirées d'un modèle que la clé énonce (loi de masse, champ diffus, onde plane sans pertes…), et petits écarts d'arrondi ou de formulation relevés au recalcul, **corrigés depuis dans les fichiers de clés** (mention « Corrigé dans la clé (sept. 2026) » dans la colonne de référence ; ils restent comptés ⚠️, selon la légende « nuancé ou corrigé »). Les affirmations exactes que les « Appuis » ne couvraient pas ont reçu une source, ajoutée aux Appuis de leur clé : elles passent en ✅ (neuf lignes), sauf trois reformulées en même temps (K09.4, K26.8, K41b.4), qui restent ⚠️. Les 🔶 sont des questions que la clé présente elle-même comme ouvertes.

| Clé | Titre | ✅ | ⚠️ | 🔶 | ❌ |
|---|---|---|---|---|---|
| [F01](../provoxys/son/index.html#cle-f01) | Quatre grandeurs pour une seule onde | 8 | 1 | 0 | 0 |
| [F02](../provoxys/son/index.html#cle-f02) | Pourquoi une perturbation se propage | 6 | 1 | 0 | 0 |
| [F03](../provoxys/son/index.html#cle-f03) | Ce qui fixe la célérité | 10 | 0 | 0 | 0 |
| [F04](../provoxys/son/index.html#cle-f04) | Énergie, puissance, intensité : ce que le son transporte | 8 | 0 | 0 | 0 |
| [F05](../provoxys/son/index.html#cle-f05) | Impédance : ce qui passe une frontière, et à quel angle | 9 | 0 | 0 | 0 |
| [F06](../provoxys/son/index.html#cle-f06) | Phase, cohérence et retard : +3 dB, +6 dB ou silence | 6 | 0 | 0 | 0 |
| [F07](../provoxys/son/index.html#cle-f07) | Conditions aux limites : de quel nœud parle-t-on ? | 9 | 0 | 0 | 0 |
| [F08](../provoxys/son/index.html#cle-f08) | Modes possibles, modes excités, modes mesurés | 7 | 0 | 0 | 0 |
| [F09](../provoxys/son/index.html#cle-f09) | Oscillateur amorti et forcé : fréquence, largeur, durée | 9 | 1 | 0 | 0 |
| [F10](../provoxys/son/index.html#cle-f10) | Couplage, échange d’énergie et résonateur de Helmholtz | 7 | 1 | 0 | 0 |
| [F11](../provoxys/son/index.html#cle-f11) | Vibrer ne suffit pas : comment un objet rayonne du son | 8 | 1 | 0 | 0 |
| [F12](../provoxys/son/index.html#cle-f12) | Directivité : la taille de la source comparée à la longueur d’onde | 9 | 0 | 0 | 0 |
| [F13](../provoxys/son/index.html#cle-f13) | Champ proche, champ lointain et géométrie de la dilution | 8 | 0 | 0 | 0 |
| [F14](../provoxys/son/index.html#cle-f14) | Cordes, membranes, plaques, solides : des forces de rappel différentes | 7 | 1 | 0 | 0 |
| [F15](../provoxys/son/index.html#cle-f15) | Dispersion : quand les fréquences ne voyagent pas à la même vitesse | 7 | 0 | 0 | 0 |
| [F16](../provoxys/son/index.html#cle-f16) | Atténuation : dilution, absorption et redistribution | 9 | 0 | 0 | 0 |
| [F17](../provoxys/son/index.html#cle-f17) | Diffusion : ce que renvoient les petits objets et les surfaces rugueuses | 6 | 1 | 0 | 0 |
| [F18](../provoxys/son/index.html#cle-f18) | Atmosphère et océan : gradients, vent, guides et trajets multiples | 5 | 2 | 0 | 0 |
| [F19](../provoxys/son/index.html#cle-f19) | Traverser une paroi : masse, raideur, fuites et chemins détournés | 6 | 3 | 0 | 0 |
| [F20](../provoxys/son/index.html#cle-f20) | Absorber, diffuser, isoler : où va l’énergie qui ne revient pas | 6 | 2 | 0 | 0 |
| [F21](../provoxys/son/index.html#cle-f21) | Acoustique des salles : ce que T60 ne dit pas | 6 | 2 | 0 | 0 |
| [F22](../provoxys/son/index.html#cle-f22) | Réponse impulsionnelle, fonction de transfert, causalité | 7 | 0 | 0 | 0 |
| [F23](../provoxys/son/index.html#cle-f23) | Pourquoi reconnaître un instrument demande plus qu’une liste d’harmoniques | 8 | 0 | 0 | 0 |
| [F24](../provoxys/son/index.html#cle-f24) | Entretenir une vibration : une réserve d’énergie, une valve, une rétroaction | 8 | 1 | 0 | 0 |
| [F25](../provoxys/son/index.html#cle-f25) | Quand les ondes cessent de s’additionner simplement : harmoniques, intermodulation, chocs | 9 | 1 | 0 | 0 |
| [F26](../provoxys/son/index.html#cle-f26) | Propager, chauffer, faire vibrer des bulles : trois effets distincts des ultrasons | 5 | 3 | 0 | 0 |
| [F27](../provoxys/son/index.html#cle-f27) | Comment une onde qui va et vient peut pousser : force de radiation et écoulement moyen | 6 | 2 | 0 | 0 |
| [F28](../provoxys/son/index.html#cle-f28) | Une grammaire des niveaux : de quoi un décibel est-il le rapport ? | 10 | 0 | 0 | 0 |
| [F29](../provoxys/son/index.html#cle-f29) | Le bruit en physique : une densité spectrale, pas une liste de raies | 7 | 0 | 0 | 0 |
| [F30](../provoxys/son/index.html#cle-f30) | Ce que mesure un microphone : une chaîne, pas un nombre | 8 | 1 | 0 | 0 |
| [F31](../provoxys/son/index.html#cle-f31) | Un écho, quatre questions : détecter, situer, séparer, chiffrer l'incertitude | 6 | 1 | 1 | 0 |
| [F32](../provoxys/son/index.html#cle-f32) | Former un faisceau : retards, ouverture et résolution latérale | 6 | 1 | 0 | 0 |
| [F33](../provoxys/son/index.html#cle-f33) | Portée d'un sonar : suivre l'énergie de l'émission jusqu'au bruit | 7 | 2 | 0 | 0 |
| [F34](../provoxys/son/index.html#cle-f34) | Doppler — une convention de signes, le vent et les échos pulsés | 9 | 0 | 0 | 0 |
| [F35](../provoxys/son/index.html#cle-f35) | L'oreille moyenne transforme, la cochlée amplifie | 8 | 1 | 1 | 0 |
| [F36](../provoxys/son/index.html#cle-f36) | Des nombres à la membrane, et ce que la FFT ne peut pas inventer | 7 | 1 | 0 | 0 |
| [F37](../provoxys/son/index.html#cle-f37) | Moduler, battre, mélanger — cinq transformations à ne pas confondre | 9 | 0 | 0 | 0 |
| [F38](../provoxys/son/index.html#cle-f38) | Du mode de vibration au phonon | 7 | 1 | 0 | 0 |
| [F39](../provoxys/son/index.html#cle-f39) | Étoiles, fluide primordial, plasmas — trois rappels différents | 6 | 3 | 1 | 0 |
| [F40](../provoxys/son/index.html#cle-f40) | Une observation, son modèle et son incertitude | 8 | 0 | 0 | 0 |
| [F41](../provoxys/son/index.html#cle-f41) | Comment fabrique-t-on un son ? | 9 | 0 | 0 | 0 |
| [F41b](../provoxys/son/index.html#cle-f41b) | D'où vient un son : la chaîne complète | 3 | 1 | 0 | 0 |
| **Total** | 42 clés | **309** | **35** | **3** | **0** |

### F01 — Quatre grandeurs pour une seule onde

**Place :** chapitre des bases physiques, après « Repères d’unités » (Hz = cycles par seconde) · [lire la clé](../provoxys/son/index.html#cle-f01)
**Comptes :** 8 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K01.1 | 60 dB SPL ⇒ p = 0,020 Pa efficace (0,028 Pa crête) | ✅ | 20 µPa × 10^(60/20) = 0,0200 Pa ; × √2 = 0,0283 Pa (recalculé) | calcul · [UNSW Physclips — impédance et intensité](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) |
| K01.2 | Vitesse particulaire u = p/(ρ₀c) ≈ 49 µm/s efficace, 69 µm/s crête, avec ρ₀c = 412 rayl | ✅ | 0,020/412 = 4,85 × 10⁻⁵ m/s ; crête 6,87 × 10⁻⁵ m/s. La source arrondit ρ₀c à 420 Pa·s/m (ρ = 1,2 kg/m³) ; 1,20 × 343 = 411,6 | calcul · [UNSW Physclips — impédance et intensité](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K01.3 | Déplacement ξ = u/ω ≈ 7,7 nm efficace, 11 nm crête, à 1 kHz | ✅ | 4,85 × 10⁻⁵ / (2π × 1000) = 7,73 nm ; crête 10,9 nm (recalculé) | calcul · [UNSW Physclips — équation d’onde](https://animations.physics.unsw.edu.au/jw/sound-wave-equation.htm) |
| K01.4 | À 60 dB, p est environ cinq millions de fois plus petite que P₀ = 101 325 Pa | ✅ | 101 325 / 0,020 = 5,07 × 10⁶ (recalculé ; P₀ = atmosphère normale) | calcul |
| K01.5 | Célérité 343 m/s dans l’air sec à 20 °C | ⚠️ | Valeur juste : √(γRT) = 343,2 m/s à 20 °C (recalculé). Contrôle d'échantillon : la page UNSW donne 343 m/s et 1,2 kg/m³ **sans préciser la température** ; la condition « 20 °C » repose sur le calcul | [UNSW Physclips — impédance et intensité](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) · [HyperPhysics — Speed of sound in air](https://hyperphysics.gsu.edu/hbase/Sound/souspe.html) · calcul |
| K01.6 | Agitation thermique moyenne de N₂ à 20 °C de l’ordre de 470 m/s (vitesse moyenne de Maxwell) | ✅ | √(8RT/(πM)) avec T = 293 K, M = 0,028 kg/mol : 470,7 m/s (recalculé) | calcul (formule de Maxwell donnée dans la clé) |
| K01.7 | Onde plane progressive : p et u en phase ; en opposition pour une onde vers l’arrière ; ξ décalé d’un quart de période | ✅ | Conforme aux deux démonstrations citées ; règle limitée à l’onde progressive | [Penn State (Russell) — phase pression-vitesse](https://www.acs.psu.edu/drussell/Demos/phase-p-u-sine/phase-p-u-sine.html) · [UNSW Physclips — équation d’onde](https://animations.physics.unsw.edu.au/jw/sound-wave-equation.htm) |
| K01.8 | À 120 dB : 20 Pa, u ≈ 49 mm/s, ξ ≈ 7,7 µm, λ = 34,3 cm à 1 kHz ; rapport c/u ≈ 7 × 10⁶ à 60 dB | ✅ | 20/412 = 0,0485 m/s ; 7,73 µm ; 343/1000 = 0,343 m ; 343/4,85 × 10⁻⁵ = 7,07 × 10⁶ (recalculé) | calcul |
| K01.9 | À 60 dB, ξ efficace = 77 nm à 100 Hz et 0,77 nm à 10 kHz (varie en 1/f) | ✅ | 77,3 nm et 0,773 nm (recalculé) | calcul · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |

### F02 — Pourquoi une perturbation se propage

**Place :** après le passage sur l’équation d’onde (d’Alembert, 1747) · [lire la clé](../provoxys/son/index.html#cle-f02)
**Comptes :** 6 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K02.1 | Trois relations linéarisées : conservation de la masse, loi de Newton, p = c²ρ′ (compression adiabatique) | ✅ | Équations linéarisées pour un fluide au repos et relation p′ = c₀²ρ′ en écoulement homentropique | [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) · [MIT OCW 6.013 — Acoustic Waves](https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/resources/lec22/) |
| K02.2 | Leur combinaison donne ∂²p/∂t² = c²∇²p, qui ne vaut plus avec vent, milieu stratifié, source ou pertes | ✅ | Dérivation standard ; hypothèses (petites perturbations, fluide homogène au repos, sans pertes) énoncées par la clé | [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) · [MIT OCW 6.013 — Acoustic Waves](https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/resources/lec22/) · [UNSW Physclips — équation d’onde](https://animations.physics.unsw.edu.au/jw/sound-wave-equation.htm) |
| K02.3 | À 1 kHz, k = 2π/0,343 m ≈ 18,3 rad/m | ✅ | 18,32 rad/m (recalculé) | calcul |
| K02.4 | Pente maximale de pression k p̂ ≈ 18,3 × 0,028 ≈ 0,51 Pa/m ; accélération 0,51/1,20 ≈ 0,43 m/s² | ⚠️ | **Corrigé dans la clé (sept. 2026)** : la clé affichait 0,52 Pa/m. Avec les valeurs affichées, 18,3 × 0,028 = 0,512 → 0,51 Pa/m (0,518 avec p̂ non arrondi, 0,0283 Pa) ; 0,512/1,20 = 0,427 → 0,43 m/s². Conclusion inchangée | calcul |
| K02.5 | Accélération crête 0,52/1,20 ≈ 0,43 m/s², confirmée par ω û = 2π × 1000 × 69 µm/s ≈ 0,43 m/s² | ✅ | 0,432 m/s² et 0,434 m/s² (recalculé) ; les deux voies concordent | calcul · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K02.6 | ρ′ = p̂/c² ≈ 2,4 × 10⁻⁷ kg/m³, soit environ deux dix-millionièmes de ρ₀ | ✅ | 0,028/343² = 2,38 × 10⁻⁷ kg/m³ ; rapport à ρ₀ = 1,98 × 10⁻⁷ (recalculé) | calcul |
| K02.7 | La troisième loi fixe c par c² = (∂P/∂ρ) à entropie constante | ✅ | Définition de la célérité isentropique | [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |

### F03 — Ce qui fixe la célérité

**Place :** après l’expérience de Colladon et Sturm (lac Léman, 1826) · [lire la clé](../provoxys/son/index.html#cle-f03)
**Comptes :** 10 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K03.1 | Air sec à 20 °C : √(1,40 × 8,314 × 293,15 / 0,02897) ≈ 343 m/s | ✅ | 343,2 m/s (recalculé) | calcul · [UNSW Physclips — équation d’onde](https://animations.physics.unsw.edu.au/jw/sound-wave-equation.htm) · DOI [10.1121/1.405827](https://doi.org/10.1121/1.405827) |
| K03.2 | Hélium à 20 °C (γ = 5/3, M = 0,004003 kg/mol) : ≈ 1 007 m/s | ✅ | 1 007,4 m/s (recalculé) | calcul · [UNSW Physclips — équation d’onde](https://animations.physics.unsw.edu.au/jw/sound-wave-equation.htm) |
| K03.3 | Gaz parfait de composition fixée : à température constante, la célérité ne dépend pas de la pression | ✅ | c = √(γP/ρ) = √(γRT/M) ; vrai dans le modèle du gaz parfait (les écarts du gaz réel sont minimes, cf. Cramer) | [UNSW Physclips — équation d’onde](https://animations.physics.unsw.edu.au/jw/sound-wave-equation.htm) · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K03.4 | Air saturé à 20 °C : vapeur 2,34 kPa (2,3 %), M = 0,02871 kg/mol, γ ≈ 1,398, c ≈ 344,5 m/s, soit +0,4 % | ✅ | x = 2,34/101,325 = 2,31 % ; M = 0,02872 ; γ = 1,398 (γ vapeur ≈ 1,33) ; c = 344,46 m/s, +0,37 % (recalculé, gaz parfait) | calcul · DOI [10.1121/1.405827](https://doi.org/10.1121/1.405827) |
| K03.5 | Effet de la température : environ +0,6 m/s par degré | ✅ | 0,585 m/s par kelvin autour de 20 °C (recalculé) | calcul |
| K03.6 | Eau : K ≈ 2,2 × 10⁹ Pa ; air : K = γP₀ ≈ 1,4 × 10⁵ Pa ; raideur × 15 000, masse volumique × 830, célérité × 4,3 | ✅ | 998 × 1482² = 2,19 × 10⁹ Pa ; 1,4 × 101 325 = 1,42 × 10⁵ Pa ; rapports 15 450, 829, 4,32 (recalculé). La source donne « 800 fois plus dense, 4,3 fois plus rapide » | calcul · [UNSW Physclips — impédance et intensité](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) · [UNSW Physclips — équation d’onde](https://animations.physics.unsw.edu.au/jw/sound-wave-equation.htm) |
| K03.7 | À 1 kHz dans l’air, couche thermique ≈ 0,08 mm et couche visqueuse ≈ 0,07 mm | ✅ | √(2α/ω) = 0,084 mm (α = 2,2 × 10⁻⁵ m²/s) ; √(2ν/ω) = 0,069 mm (ν = 1,5 × 10⁻⁵ m²/s) (recalculé) | calcul · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K03.8 | Voix à l’hélium : la hauteur (cordes vocales) ne change pas, les résonances du conduit vocal montent | ✅ | Conforme à la page citée, qui met aussi en garde contre l’inhalation | [UNSW Physclips — voix à l’hélium](https://www.phys.unsw.edu.au/jw/speechmodel.html) |
| K03.9 | Dans l’océan, la célérité croît avec la température et la pression, dépend de la salinité ; ses variations courbent les trajets | ✅ | Conforme | [NOAA Ocean Service — le son dans l’océan](https://oceanservice.noaa.gov/facts/sound.html) · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K03.10 | Dans une étoile, c_s² = Γ₁P/ρ avec un Γ₁ qui dépend de l’état local du plasma | ✅ | Revue de Christensen-Dalsgaard (2021) : c² = Γ₁p/ρ (§ 5.1.1, éq. 55), Γ₁ = (∂ln p/∂ln ρ)_ad (§ 2.1), Γ₁ ≃ 5/3 pour un gaz parfait totalement ionisé et plus bas dans les zones d’ionisation de H et He (§ 2.3.1). **Source ajoutée aux Appuis de la clé (sept. 2026)** | DOI [10.1007/s41116-020-00028-3](https://doi.org/10.1007/s41116-020-00028-3) · [arXiv 2007.06488](https://arxiv.org/abs/2007.06488) |

### F04 — Énergie, puissance, intensité : ce que le son transporte

**Place :** après le paragraphe sur les pertes visqueuses et thermiques dans l’air (première clé de ce point d’ancrage) · [lire la clé](../provoxys/son/index.html#cle-f04)
**Comptes :** 8 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K04.1 | e_ac = p²/(2ρ₀c²) + ρ₀u²/2 ; I = ⟨p u⟩ ; puissance = flux de I à travers une surface fermée ; loi de conservation | ✅ | Définitions et loi de conservation (avec termes de source et de dissipation) du fluide au repos | [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K04.2 | I = p_rms²/(ρ₀c) seulement pour une onde plane progressive | ✅ | Même relation chez UNSW ; P²/(2ρ₀c) en amplitude crête chez Oelze | [UNSW Physclips — impédance et intensité](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) · [Illinois ECE/TAM 373 (Oelze), chap. 6a](https://jontallen.ece.illinois.edu/uploads/473.F18/Lectures/Chapter_6a.pdf) |
| K04.3 | À 60 dB SPL en onde progressive : I ≈ 9,7 × 10⁻⁷ W/m², niveau d’intensité 59,9 dB | ✅ | 0,020²/412 = 9,71 × 10⁻⁷ W/m² ; 10 log(I/10⁻¹²) = 59,87 dB (recalculé) | calcul |
| K04.4 | Densité d’énergie moyenne ≈ 2,8 × 10⁻⁹ J/m³ ; multipliée par c, elle redonne I | ✅ | 0,020²/(1,20 × 343²) = 2,83 × 10⁻⁹ J/m³ ; × 343 = 9,72 × 10⁻⁷ W/m² (recalculé) | calcul |
| K04.5 | Onde stationnaire de 0,020 Pa au ventre : deux ondes de 0,010 Pa, 2,4 × 10⁻⁷ W/m² chacune en sens contraires, flux net nul | ✅ | 0,010²/412 = 2,43 × 10⁻⁷ W/m² (recalculé) | calcul · [Penn State (Russell) — ondes stationnaires dans un tuyau](https://www.acs.psu.edu/drussell/Demos/StandingWaves/StandingWaves.html) |
| K04.6 | Source isotrope de 1 mW à 1 m : 12,6 m², I ≈ 8,0 × 10⁻⁵ W/m², p ≈ 0,18 Pa, 79 dB SPL | ✅ | 4π = 12,57 m² ; 7,96 × 10⁻⁵ W/m² ; 0,181 Pa ; 79,1 dB (recalculé ; rendement de 0,1 % posé comme hypothèse) | calcul |
| K04.7 | Aux nœuds de pression d’une onde stationnaire correspondent des ventres de déplacement ; l’énergie y est cinétique | ✅ | Conforme | [Penn State (Russell) — ondes stationnaires dans un tuyau](https://www.acs.psu.edu/drussell/Demos/StandingWaves/StandingWaves.html) |
| K04.8 | Une annulation locale (casque antibruit) ne détruit pas l’énergie, qui se retrouve ailleurs | ✅ | Conforme à la FAQ citée | [UNSW Music Acoustics FAQ](https://www.phys.unsw.edu.au/jw/musFAQ.html) |

### F05 — Impédance : ce qui passe une frontière, et à quel angle

**Place :** même point d’ancrage que la clé précédente (pertes dans l’air), deuxième clé · [lire la clé](../provoxys/son/index.html#cle-f05)
**Comptes :** 9 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K05.1 | Impédance caractéristique : air ≈ 412 rayl ; eau douce ≈ 1,48 × 10⁶ rayl | ✅ | 998 × 1482 = 1,479 × 10⁶ rayl ; la source donne 420 et 1,48 × 10⁶ Pa·s/m | [UNSW Physclips — impédance et intensité](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) · [MIT OCW 2.682 — cours 2](https://ocw.mit.edu/courses/2-682-acoustical-oceanography-spring-2012/58540cfbbdd42be15697f7a1523f343b_MIT2_682S12_bglec02.pdf) |
| K05.2 | Air → eau, incidence normale : r_p ≈ 0,9994, t_p ≈ 1,9994 | ✅ | 0,99944 et 1,99944 (recalculé) | calcul · [Illinois ECE/TAM 373 (Oelze), chap. 6a](https://jontallen.ece.illinois.edu/uploads/473.F18/Lectures/Chapter_6a.pdf) |
| K05.3 | Énergie transmise 0,11 % (−29,5 dB), réfléchie 99,89 % ; R + T = 1 | ✅ | T = 1,114 × 10⁻³ ; −29,53 dB ; R = 0,99889 (recalculé) | calcul · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K05.4 | Eau → air : t_p ≈ 5,6 × 10⁻⁴, même T de 0,11 % | ✅ | 5,57 × 10⁻⁴ (recalculé) ; T symétrique | calcul |
| K05.5 | Cas z₂ = 2z₁ : r_p = 1/3, t_p = 4/3, R = 1/9, T = 8/9 | ✅ | Exact ; exemple identique dans le cours cité | [Illinois ECE/TAM 373 (Oelze), chap. 6a](https://jontallen.ece.illinois.edu/uploads/473.F18/Lectures/Chapter_6a.pdf) |
| K05.6 | Angle critique air → eau : arcsin(343/1482) ≈ 13,4° ; pas d’angle critique de l’eau vers l’air | ✅ | 13,38° (recalculé) | calcul · [Illinois ECE/TAM 373 (Oelze), chap. 6b](https://jontallen.ece.illinois.edu/uploads/473.F18/Lectures/Chapter_6b.pdf) · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K05.7 | Un rayon à 10° de la normale repart dans l’eau à ≈ 48,6° | ✅ | 48,61° (recalculé, loi de Snell) | calcul · [Illinois ECE/TAM 373 (Oelze), chap. 6b](https://jontallen.ece.illinois.edu/uploads/473.F18/Lectures/Chapter_6b.pdf) |
| K05.8 | À 10°, coefficient de Rayleigh : T ≈ 7,5 × 10⁻⁴, moins qu’à incidence normale | ✅ | 7,48 × 10⁻⁴ (recalculé, deux formes concordantes) | calcul · [Illinois ECE/TAM 373 (Oelze), chap. 6b](https://jontallen.ece.illinois.edu/uploads/473.F18/Lectures/Chapter_6b.pdf) |
| K05.9 | Une lame d’air a une impédance environ 3 500 fois plus faible que celle des tissus | ✅ | La source donne eau ≈ 3 500 × air et tissus mous comparables à l’eau ; avec 412 rayl et 1,5–1,6 MRayl, le rapport va de 3 600 à 3 900 : « environ » justifié | [UNSW Physclips — impédance et intensité](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) |

### F06 — Phase, cohérence et retard : +3 dB, +6 dB ou silence

**Place :** après la définition de la diffraction · [lire la clé](../provoxys/son/index.html#cle-f06)
**Comptes :** 6 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K06.1 | Un détour de 34,3 cm donne un retard de 1 ms | ✅ | 0,343/343 = 1,000 ms (recalculé) | calcul |
| K06.2 | Deux contributions égales : +3 dB si non corrélées, +6 dB si cohérentes et en phase, annulation si en opposition | ✅ | 10 log 2 = 3,01 dB ; 20 log 2 = 6,02 dB (recalculé) ; conforme aux sources | [UNSW Physclips — décibels](https://animations.physics.unsw.edu.au/jw/dB.htm) · [UNSW Music Acoustics FAQ](https://www.phys.unsw.edu.au/jw/musFAQ.html) · [Penn State (Russell) — superposition](https://www.acs.psu.edu/drussell/Demos/superposition/superposition.html) |
| K06.3 | Retard de 1 ms : creux à 500, 1 500, 2 500 Hz ; maxima à 0, 1 000, 2 000 Hz | ✅ | f_creux = (2n + 1)/(2τ), maxima à n/τ (recalculé) | calcul |
| K06.4 | Reflet sur mur à 1,343 m, source ponctuelle, mur parfait : a = 1/1,343 ≈ 0,74 | ✅ | 0,745 (recalculé) ; hypothèses énoncées dans la clé | calcul |
| K06.5 | Gain du peigne entre +4,8 dB et −11,9 dB | ✅ | 20 log(1,745) = +4,83 dB ; 20 log(0,255) = −11,86 dB (recalculé) | calcul |
| K06.6 | À 100 Hz, 1 ms = 36° ; pour a = 1, module de H = 2 cos 18° ≈ 1,90, soit +5,6 dB | ✅ | 1,902 ; +5,58 dB (recalculé) | calcul |

### F07 — Conditions aux limites : de quel nœud parle-t-on ?

**Place :** après la section « Tuyaux » · [lire la clé](../provoxys/son/index.html#cle-f07)
**Comptes :** 9 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K07.1 | Fond fermé rigide : nœud de déplacement et de vitesse, ventre de pression ; nœuds de pression = ventres de déplacement | ✅ | Conforme | [Penn State (Russell) — pression et déplacement dans les ondes stationnaires](https://www.acs.psu.edu/drussell/demos/standingwaves/standingwaves.html) |
| K07.2 | Extrémité ouverte : pression presque nulle un peu au-delà du bout, onde réfléchie de pression inversée | ✅ | Conforme (surface libre R = −1 dans le cours MIT pour le cas analogue) | [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) · [MIT OCW 2.682 — cours 2](https://ocw.mit.edu/courses/2-682-acoustical-oceanography-spring-2012/58540cfbbdd42be15697f7a1523f343b_MIT2_682S12_bglec02.pdf) |
| K07.3 | Correction d’extrémité d’un tube circulaire, ka petit : 0,61a (sans rebord) à 0,85a (bride) | ✅ | Encadrement 0,61a ⩽ δ ⩽ 0,85a dans l’ouvrage cité ; ≈ 0,61a pour le tube sans bride (calcul de Levine et Schwinger ; 0,6127a dans l’ouvrage). La valeur 0,85a est l’approximation classique du piston bafflé | [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) · DOI [10.1103/PhysRev.73.383](https://doi.org/10.1103/PhysRev.73.383) |
| K07.4 | Tube ouvert de 60 cm sans correction : f₁ ≈ 285,8 Hz | ✅ | 343/1,20 = 285,83 Hz (recalculé) | calcul |
| K07.5 | Avec δ = 0,61a aux deux bouts (a = 1 cm) : 280,1 Hz, 35 cents plus bas ; avec 0,85a : 278,0 Hz, 48 cents | ✅ | 280,14 Hz, 34,8 cents ; 277,96 Hz, 48,4 cents (recalculé) | calcul · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K07.6 | Même tube fermé à un bout : f₁ ≈ 141,5 Hz, une octave sous le tube ouvert, puis 3f₁, 5f₁ | ✅ | 343/(4 × 0,6061) = 141,48 Hz (recalculé). Octave à 17 cents près face au tube ouvert corrigé (une seule correction d’extrémité au lieu de deux) | calcul |
| K07.7 | Coupure du premier mode transverse d’un tube circulaire : ka = 1,841 ; pour a = 1 cm, ≈ 10 050 Hz | ✅ | 1,84118 dans l’ouvrage cité ; 1,841 × 343/(2π × 0,01) = 10 050 Hz (recalculé) | calcul · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K07.8 | À 5 kHz ce mode est évanescent : κ ≈ 160 m⁻¹, amplitude divisée par e tous les 6,3 mm, par 24 (−28 dB) sur 2 cm | ✅ | k = 91,6 m⁻¹ ; κ = 159,7 m⁻¹ ; 6,26 mm ; facteur 24,4 ; −27,7 dB (recalculé) | calcul |
| K07.9 | Le mode plan (k⊥ = 0) n’a pas de coupure et se propage à toutes les fréquences | ✅ | Le cours cité montre que le mode m = 0 se propage toujours | [MIT OCW 6.013 — Acoustic Waves](https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/resources/lec22/) |

### F08 — Modes possibles, modes excités, modes mesurés

**Place :** après l’encadré « À dire » sur la fréquence de Schroeder · [lire la clé](../provoxys/son/index.html#cle-f08)
**Comptes :** 7 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K08.1 | Pièce de 4 m entre murs parallèles : modes axiaux à 42,9, 85,8, 128,6 et 171,5 Hz | ✅ | nc/(2L) = 42,875 ; 85,75 ; 128,625 ; 171,5 Hz (recalculé) | calcul |
| K08.2 | Forme cos(nπx/L) : au quart, 0,71 (n = 1), 0 (n = 2), −0,71 (n = 3), −1 (n = 4) ; au centre, 0, −1, 0, 1 | ✅ | cos(π/4) = 0,707 (recalculé) | calcul |
| K08.3 | Source au centre et micro au quart : aucun des trois premiers modes n’apparaît, premier pic à 171,5 Hz | ✅ | Produits ψ(source) × ψ(micro) nuls pour n = 1, 2, 3 ; −1 pour n = 4 (recalculé) | calcul · [Penn State (Russell) — excitation des modes d’une pièce](https://www.acs.psu.edu/drussell/Demos/RoomModes/driving.html) |
| K08.4 | Une source sur un nœud d’un mode ne l’excite pas ; sur un ventre, réponse maximale | ✅ | Conforme | [Penn State (Russell) — excitation des modes d’une pièce](https://www.acs.psu.edu/drussell/Demos/RoomModes/driving.html) |
| K08.5 | Les coins sont des ventres de pression pour tous les modes d’une pièce rectangulaire rigide | ✅ | La page citée l’énonce pour les murs et les coins | [Penn State (Russell) — excitation des modes d’une pièce](https://www.acs.psu.edu/drussell/Demos/RoomModes/driving.html) |
| K08.6 | Corde pincée au tiers : modes 3, 6, 9 absents ; pincée au milieu : harmoniques pairs absents | ✅ | Amplitude du mode n ∝ sin(nπd/L) | [Penn State (Russell) — corde pincée et série de Fourier](https://www.acs.psu.edu/drussell/Demos/Pluck-Fourier/Pluck-Fourier.html) |
| K08.7 | Réciprocité : échanger source ponctuelle et capteur de pression laisse la réponse inchangée en milieu linéaire au repos | ✅ | Relation de réciprocité de la fonction de Green (§ 3.1 de l’ouvrage, la clé renvoie au § 5.3) | [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) |

### F09 — Oscillateur amorti et forcé : fréquence, largeur, durée

**Place :** après le passage « Un système qui possède une fréquence propre » (résonance) · [lire la clé](../provoxys/son/index.html#cle-f09)
**Comptes :** 9 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K09.1 | Q = mω₀/b et, pour Q ≫ 1, Q ≈ f₀/Δf (largeur à mi-puissance) | ✅ | Q = ω₀/(2γ) avec γ = b/(2m) ; Q = fréquence centrale / largeur à mi-puissance | [MIT OCW RES.8-009 — cours 4](https://ocw.mit.edu/courses/res-8-009-introduction-to-oscillations-and-waves-summer-2017/mitres_8_009su17_lec4.pdf) · [UMass Lowell — Q factor](https://faculty.uml.edu/pchowdhury/PHYS2690/Supp/Q-factor.pdf) |
| K09.2 | Décroissance : τ_a = Q/(πf₀) pour l’amplitude, τ_E = τ_a/2 pour l’énergie | ✅ | Enveloppe e^(−γt), énergie e^(−2γt), 1/γ = 2Q/ω₀ = Q/(πf₀) | [MIT OCW RES.8-009 — cours 4](https://ocw.mit.edu/courses/res-8-009-introduction-to-oscillations-and-waves-summer-2017/mitres_8_009su17_lec4.pdf) |
| K09.3 | T₆₀ = ln(10⁶) τ_E ≈ 13,8 τ_E pour une décroissance exponentielle simple | ✅ | ln(10⁶) = 13,82 (recalculé) | calcul |
| K09.4 | Diapason du modèle : f₀ = 440 Hz, Q ≈ 4 000, présenté comme valeur de modèle ; Q typique d’un diapason de l’ordre du millier, abaissé par la caisse | ⚠️ | **Corrigé dans la clé (sept. 2026)** : la clé disait Q ≈ 4 000 « dans l’ordre de grandeur de diapasons sur caisse ». Acoustics Today (ASA) donne un Q d’environ 1 000 pour un diapason typique ; la caisse, qui rayonne plus vite l’énergie, abaisse Q. La clé présente désormais 4 000 comme un choix de modèle et donne le cas Q ≈ 1 000 : largeur 0,44 Hz, −60 dB en 5,0 s (recalculé) | calcul · [Acoustics Today (A. Pyzdek) — Resonance](https://acousticstoday.org/8-the-world-through-sound-resonance/) |
| K09.5 | Δf ≈ 0,11 Hz ; τ_a ≈ 2,9 s, τ_E ≈ 1,45 s ; −60 dB en ≈ 20 s | ✅ | 0,110 Hz ; 2,894 s ; 1,447 s ; ln(1000) × 2,894 = 19,99 s (recalculé) | calcul |
| K09.6 | Désaccord de 4 Hz = 36 largeurs de pic ; réponse ≈ 1/73 de la réponse accordée, −37 dB | ✅ | 36,4 ; 1/72,7 ; −37,2 dB (recalculé) | calcul |
| K09.7 | Fréquence libre amortie f₀√(1 − 1/(4Q²)), maximum de déplacement f₀√(1 − 1/(2Q²)) ; Q = 5 : 0,995 et 0,990 f₀ ; Q = 4 000 : écarts ~10⁻⁸ | ✅ | 0,99499 et 0,98995 ; 7,8 × 10⁻⁹ et 1,6 × 10⁻⁸ (recalculé) | calcul · [MIT OCW RES.8-009 — cours 4](https://ocw.mit.edu/courses/res-8-009-introduction-to-oscillations-and-waves-summer-2017/mitres_8_009su17_lec4.pdf) · [MIT OCW RES.8-009 — cours 5](https://ocw.mit.edu/courses/res-8-009-introduction-to-oscillations-and-waves-summer-2017/mitres_8_009su17_lec5.pdf) |
| K09.8 | À f₀, déplacement déphasé d’un quart de période par rapport à la force ; maximum de vitesse exactement à f₀ | ✅ | Conforme | [MIT OCW RES.8-009 — cours 5](https://ocw.mit.edu/courses/res-8-009-introduction-to-oscillations-and-waves-summer-2017/mitres_8_009su17_lec5.pdf) |
| K09.9 | Trois régions : raideur sous f₀, amortissement au pic, masse au-dessus | ✅ | Conforme | [Penn State (Russell) — régions de réponse](https://www.acs.psu.edu/drussell/Demos/Resonance-Regions/Resonance.html) |
| K09.10 | Salle de T₆₀ = 2 s : τ_E ≈ 0,14 s | ✅ | 2/13,82 = 0,145 s (recalculé) | calcul |

### F10 — Couplage, échange d’énergie et résonateur de Helmholtz

**Place :** chapitre des diapasons en sympathie, juste avant le pont vers la musique · [lire la clé](../provoxys/son/index.html#cle-f10)
**Comptes :** 7 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K10.1 | Résonateur de Helmholtz : l’air du col fait la masse, celui de la cavité le ressort ; valable si cavité et col sont petits devant λ | ✅ | Modèle masse-ressort acoustique, col compact, corrections d’extrémité aux deux bouts, pertes par frottement | [Rienstra & Hirschberg — An Introduction to Acoustics, § 5.2.3](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K10.2 | Bouteille de 75 cl, col 7,5 cm × 1,9 cm, corrections 0,85a + 0,61a : L_eff ≈ 0,089 m et f_H ≈ 113 Hz | ⚠️ | S = 2,835 × 10⁻⁴ m², L_eff = 0,0889 m, f_H = 112,6 Hz (recalculé, c = 343 m/s). Contrôle d'échantillon : Rienstra et Hirschberg donnent bien 0,85a (bridé, éq. 5.43) et 0,61a (non bridé, éq. 5.44 ; encadrement 6.95), au § 5.2.3.1, mais pas la répartition « côté cavité / côté extérieur », qui est une convention d'usage | calcul · [Rienstra & Hirschberg](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K10.3 | Sans correction d’extrémité, 123 Hz, soit environ 150 cents plus haut | ✅ | 122,6 Hz ; écart 147 cents (recalculé) | calcul |
| K10.4 | Bouteille à moitié remplie : fréquence multipliée par √2, environ 159 Hz | ✅ | 112,6 × √2 = 159,2 Hz (recalculé) | calcul |
| K10.5 | À 113 Hz, λ ≈ 3 m, bien plus grand que la bouteille | ✅ | 343/112,6 = 3,05 m (recalculé) | calcul |
| K10.6 | Deux résonateurs identiques faiblement couplés échangent l’énergie en cos² et sin² ; transfert complet en 1/(2Δf), Δf écart des fréquences collectives | ✅ | Superposition des deux modes normaux ; période de l’énergie 1/Δf, transfert complet à la demi-période | [Penn State — oscillateurs couplés](https://www.acs.psu.edu/drussell/Demos/coupled/coupled.html) · [MIT OCW RES.8-009, cours 6](https://ocw.mit.edu/courses/res-8-009-introduction-to-oscillations-and-waves-summer-2017/mitres_8_009su17_lec6.pdf) |
| K10.7 | Une caisse de résonance n’ajoute pas d’énergie : le son est plus fort et s’éteint plus vite | ✅ | Le corps convertit l’énergie de la corde en son ; la corde s’amortit plus vite que sur une guitare électrique | [UNSW Music Acoustics FAQ](https://www.phys.unsw.edu.au/jw/musFAQ.html) · DOI [10.1119/1.4905808](https://doi.org/10.1119/1.4905808) |
| K10.8 | Un diapason nu rayonne mal : ses branches opposées forment une source peu efficace | ✅ | Mode fondamental rayonnant comme un quadripôle linéaire (Russell 2000) | DOI [10.1119/1.1286661](https://doi.org/10.1119/1.1286661) |

### F11 — Vibrer ne suffit pas : comment un objet rayonne du son

**Place :** chapitre sur le matériel du stream, après le passage sur les petites sources · [lire la clé](../provoxys/son/index.html#cle-f11)
**Comptes :** 8 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K11.1 | Corde d’environ 1 mm ; à 200 Hz, λ ≈ 1,7 m dans l’air : court-circuit acoustique | ✅ | 343/200 = 1,72 m (recalculé) | calcul |
| K11.2 | Monopôle (enceinte close en grave), dipôle (membrane sans caisse), quadripôle (branches d’un diapason) | ✅ | Classification et exemples conformes | [Penn State — sources simples](https://www.acs.psu.edu/drussell/Demos/rad2/mdq.html) |
| K11.3 | Rendement d’un haut-parleur électrodynamique ordinaire de l’ordre du pour cent | ✅ | Enceintes hi-fi et moniteurs de studio : 0,2 % à 2 % au plus, sensibilité = 112 + 10 log₁₀(rendement) (Sengpiel) ; boomers étudiés par Aarts : 0,2 à 10 %, rendement plus faible dans le grave (résistance de rayonnement croissante avec f). **Sources ajoutées aux Appuis de la clé (sept. 2026)** | [Sengpiel — rendement et sensibilité](https://sengpielaudio.com/calculator-efficiency.htm) · [Aarts 2005, JAES 53 (version auteur)](https://www.sps.tue.nl/rmaarts/RMA_papers/aar05pu3.pdf) |
| K11.4 | W_dip/W_mono = 2(1 − sin kd/kd), ≈ (kd)²/3 pour kd petit, → 2 (+3 dB) pour kd grand | ✅ | Développement limité vérifié ; forme générale 2W[1 + cos φ sin kd/kd] | calcul · [Penn State — sources simples](https://www.acs.psu.edu/drussell/Demos/rad2/mdq.html) |
| K11.5 | d = 10 cm : 50 Hz → 0,00279 (−25,5 dB) ; 500 Hz → 0,268 (−5,7 dB) | ✅ | 0,002792 (−25,54 dB) ; 0,2678 (−5,72 dB) (recalculé, c = 343,2 m/s) | calcul |
| K11.6 | d = 10 cm, 1 000 Hz : kd = 1,83, rapport 0,944, −0,25 dB | ⚠️ | **Corrigé dans la clé (sept. 2026)** : la clé affichait 0,95 et −0,2 dB. Recalculé avec c = 343,2 m/s : kd = 1,8308 ; 2(1 − sin kd/kd) = 0,9443 ; 10 log₁₀ 0,9443 = −0,249 dB. La figure ne porte pas cette valeur | calcul |
| K11.7 | 90 dB SPL à 1 m, membrane de 16 cm : ξ̂ ≈ 5,9 µm à 1 kHz, 0,59 mm à 100 Hz, 2,4 mm à 50 Hz (×400) | ✅ | p̂ = 0,894 Pa, S = 0,0201 m² : 5,88 µm ; 0,588 mm ; 2,35 mm ; rapport 400 (recalculé, ρ₀ = 1,204 kg/m³) | calcul · [Penn State — piston bafflé](https://www.acs.psu.edu/drussell/Demos/BaffledPiston/BaffledPiston.html) |
| K11.8 | Efficacité de rayonnement σ ≈ (ka)²/2 ; rayon 15 cm à 200 Hz : ka = 0,55, σ ≈ 0,15 ; corde : ka ≈ 0,002 | ✅ | ka = 0,549, σ = 0,151 ; corde ka = 0,0018 (recalculé) | calcul · [Penn State — piston bafflé](https://www.acs.psu.edu/drussell/Demos/BaffledPiston/BaffledPiston.html) |
| K11.9 | Sous la fréquence critique, une plaque en flexion ne crée qu’un champ évanescent | ✅ | Onde de flexion plus lente que le son : champ évanescent ; au-dessus de la coïncidence, onde plane rayonnée | [Penn State — ondes évanescentes](https://www.acs.psu.edu/drussell/Demos/EvanescentWaves/EvanescentWaves.html) · [MIT OCW 2.067](https://ocw.mit.edu/courses/2-067-advanced-structural-dynamics-and-acoustics-13-811-spring-2004/) |

### F12 — Directivité : la taille de la source comparée à la longueur d’onde

**Place :** chapitre sur le matériel du stream, après le passage sur les petites sources · [lire la clé](../provoxys/son/index.html#cle-f12)
**Comptes :** 9 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K12.1 | À 50 Hz, λ vaut environ 7 m | ✅ | 343/50 = 6,86 m (recalculé) | calcul |
| K12.2 | Piston bafflé : D(θ) = 2J₁(x)/x ; premier zéro à x = 3,83, −3 dB à x = 1,62 | ✅ | Racine de J₁ : 3,8317 ; −3 dB : 1,6163 (recalculé) | calcul · [Penn State — piston bafflé](https://www.acs.psu.edu/drussell/Demos/BaffledPiston/BaffledPiston.html) |
| K12.3 | sin θ₀ = 0,61 λ/a = 1,22 λ/D | ✅ | 3,8317/2π = 0,6098 (recalculé) | calcul |
| K12.4 | Sonde plane de 10 mm à 3 MHz (c = 1 540 m/s) : λ 0,513 mm, ka 61,2, −3 dB à 1,5°, zéro à 3,6° | ✅ | 0,513 mm ; 61,2 ; 1,51° ; 3,59° (recalculé) | calcul |
| K12.5 | À 6 MHz : λ 0,257 mm, ka 122, −3 dB à 0,76°, zéro à 1,8° | ✅ | 0,257 mm ; 122,4 ; 0,757° ; 1,79° (recalculé) | calcul |
| K12.6 | Haut-parleur de 16 cm : ka 0,73 à 500 Hz ; 2,9 et −3 dB vers 34° à 2 kHz ; 5,9, −3 dB vers 16° et zéro vers 41° à 4 kHz | ✅ | 0,73 ; 2,93 et 33,5° ; 5,86, 16,0° et 40,8° (recalculé, c = 343,2 m/s) | calcul |
| K12.7 | Premier lobe secondaire vers −17,6 dB, en opposition de phase avec le lobe principal | ✅ | −17,57 dB (recalculé) ; lobes secondaires de phase opposée | calcul · [Penn State — piston bafflé](https://www.acs.psu.edu/drussell/Demos/BaffledPiston/BaffledPiston.html) |
| K12.8 | Diagramme stabilisé au-delà de a²/λ : 49 mm à 3 MHz, 97 mm à 6 MHz | ✅ | 48,7 mm et 97,4 mm (recalculé) ; N = D²/(4λ) équivalent | calcul · [Evident — Beam characteristics](https://ims.evidentscientific.com/en/learn/ndt-tutorials/flaw-detection/beam-characteristics) |
| K12.9 | Légende : membrane de 16 cm, ka = 1, 4 et 10 ↔ environ 680 Hz, 2,7 kHz et 6,8 kHz | ✅ | 683 Hz ; 2 731 Hz ; 6 828 Hz (recalculé) | calcul |

### F13 — Champ proche, champ lointain et géométrie de la dilution

**Place :** chapitre de la loi de distance, après la formule L(r) = L₁ − 20 log₁₀(r/r₁) · [lire la clé](../provoxys/son/index.html#cle-f13)
**Comptes :** 8 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K13.1 | Onde sphérique −6 dB, cylindrique −3 dB, plane 0 dB par doublement de distance | ✅ | 20 log₁₀ 2 = 6,02 dB ; 10 log₁₀ 2 = 3,01 dB ; source isotrope W/4πr² | [UNSW — Intensity, radiation and dB](https://animations.physics.unsw.edu.au/jw/dB.htm) |
| K13.2 | De 1 m à 100 m : 40 dB en sphérique, 20 dB en cylindrique | ✅ | 40,0 et 20,0 dB (recalculé) | calcul |
| K13.3 | Champ réactif à moins d’environ un sixième de λ ; tan φ = 1/(kr) près d’un monopôle | ✅ | kr = 1 ⇔ r = λ/2π ≈ λ/6,3 ; champ réactif, pression et vitesse en quadrature, intensité nette nulle | calcul · [Brüel & Kjær — Sound intensity](https://www.bksv.com/de/knowledge/blog/sound/sound-intensity) |
| K13.4 | r = λ/2π : 1,09 m à 50 Hz, 5,5 cm à 1 kHz ; environ 0,9 m à 60 Hz | ✅ | 1,092 m ; 5,46 cm ; 0,910 m (recalculé, c = 343,2 m/s) | calcul |
| K13.5 | Dernier maximum sur l’axe vers N = a²/λ : 49 mm (sonde 10 mm, 3 MHz), 0,105 m (haut-parleur 38 cm, 1 kHz) | ✅ | 48,7 mm ; 0,105 m (recalculé) ; Evident donne N = D²/(4λ), identique | calcul · [Evident — Beam characteristics](https://ims.evidentscientific.com/en/learn/ndt-tutorials/flaw-detection/beam-characteristics) |
| K13.6 | Ligne finie de sources non corrélées : niveau en arctan(ℓ/2r)/r, changement de régime en ℓ/π (≈ 3,2 m pour 10 m) | ✅ | Intégrale ∫dx/(r² + x²) = (2/r) arctan(ℓ/2r) ; asymptotes égales en r = ℓ/π = 3,18 m (recalculé) | calcul |
| K13.7 | En local réverbérant, la décroissance par doublement de distance est inférieure à 6 dB | ✅ | −6 dB(A) par doublement en champ libre, moins en local réverbérant | [INRS ED 6103](https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6103.pdf) |
| K13.8 | Près d’une machine, une mesure de pression seule peut surestimer la puissance rayonnée | ✅ | La mesure d’intensité sépare parts active et réactive du champ | [Brüel & Kjær — Sound intensity](https://www.bksv.com/de/knowledge/blog/sound/sound-intensity) |

### F14 — Cordes, membranes, plaques, solides : des forces de rappel différentes

**Place :** chapitre Chladni, après la présentation d’Ernst Chladni (1756–1827) · [lire la clé](../provoxys/son/index.html#cle-f14)
**Comptes :** 7 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K14.1 | Membrane circulaire idéale : rapports 1 ; 1,59 ; 2,14 ; 2,30 | ✅ | Zéros de Bessel : 1,593 ; 2,136 ; 2,295 (recalculé) | calcul · [Penn State — membrane circulaire](https://www.acs.psu.edu/drussell/Demos/MembraneCircle/Circle.html) |
| K14.2 | Lame libre : 1 ; 2,76 ; 5,40 ; lame encastrée d’un côté : 1 ; 6,27 ; 17,5 | ✅ | 2,757 ; 5,404 ; 6,267 ; 17,55 (recalculé) | calcul · [Penn State — flexion d’une barre](https://www.acs.psu.edu/drussell/Demos/Flexural-Bar/flexural.html) |
| K14.3 | Acier (E = 200 GPa, ν = 0,30, ρ = 7 850) : G 76,9 GPa, K 166,7 GPa, c_L ≈ 5 860 m/s, c_T ≈ 3 130 m/s, barre mince ≈ 5 050 m/s | ✅ | 76,92 ; 166,67 ; 5 856 ; 3 130 ; 5 048 m/s (recalculé) | calcul · [MIT OCW 2.067](https://ocw.mit.edu/courses/2-067-advanced-structural-dynamics-and-acoustics-13-811-spring-2004/) |
| K14.4 | Angles critiques vers l’acier (c_L 5 920, c_T 3 240 m/s, célérités mesurées) : eau 14,5° et 27,2° ; acrylique 27,5° et 57,4° | ⚠️ | 14,48° / 27,18° ; 27,46° / 57,41° (recalculé). **Corrigé dans la clé (sept. 2026)** : les deux jeux de célérités sont désormais nommés — 5 860 / 3 130 m/s calculés avec des constantes de manuel (E = 200 GPa, ν = 0,30), 5 920 / 3 240 m/s mesurés et retenus pour les angles et la figure. 5 920 ± 30 m/s est la longitudinale imposée par ISO 2400 aux blocs d’étalonnage (transversale 3 255 ± 15 m/s) ; 3 240 m/s est la transversale Evident des aciers 1020 et 4340 (longitudinales 5 890 et 5 850 m/s). Ces célérités correspondent à E ≈ 212 GPa et ν ≈ 0,29 (recalculé) | calcul · [NDE-Ed — Mode conversion](https://www.nde-ed.org/Physics/Waves/modeconversion.xhtml) · [ISO 2400:2012, extrait](https://cdn.standards.iteh.ai/samples/57041/2db943ab8d4042e9b9cf88068fbd5c62/ISO-2400-2012.pdf) · [Evident — Ultrasonic Transducers Technical Notes 2019, table 2 (copie Imperial College)](https://ccap.hep.ph.ic.ac.uk/trac/raw-attachment/wiki/Research/LhARA/IonAcoustic/Meetings/2023/05-04/UT_Technical_Notes_201907.pdf) |
| K14.5 | Au-delà du premier angle critique, seule l’onde transversale entre dans l’acier (sondes d’angle) | ✅ | Onde réfractée entièrement transversale entre les deux angles critiques | [Evident — Wave front dynamics](https://ims.evidentscientific.com/en/learn/ndt-tutorials/flaw-detection/wave-front) · [NDE-Ed — Mode conversion](https://www.nde-ed.org/Physics/Waves/modeconversion.xhtml) |
| K14.6 | Premier partiel supérieur accordé vers 4 × la fondamentale (marimba), 3 × (xylophone) | ✅ | Lames creusées : rapport 4 (marimba), 3 (xylophone) | [Stanford CCRMA — Percussion](https://ccrma.stanford.edu/CCRMA/Courses/152/percussion.html) |
| K14.7 | Timbales : modes (1,1) à (4,1) proches de 2 : 3 : 4 : 5, surtout grâce à la charge de l’air | ✅ | Christian et al. 1984, avec cuve usuelle | DOI [10.1121/1.391449](https://doi.org/10.1121/1.391449) |
| K14.8 | Légende : onde longitudinale venue de l’eau sous 10° | ✅ | Réfractions recalculées : longitudinale 44,0°, transversale 22,3° (c = 1 480 / 5 920 / 3 240 m/s) | calcul |

### F15 — Dispersion : quand les fréquences ne voyagent pas à la même vitesse

**Place :** chapitre Chladni, après la présentation d’Ernst Chladni (1756–1827) · [lire la clé](../provoxys/son/index.html#cle-f15)
**Comptes :** 7 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K15.1 | En flexion, la vitesse croît comme la racine de la fréquence et v_g = 2 v_φ | ✅ | ω = βk² ⇒ v_φ = βk, v_g = 2βk ; mesure sur barre : basses fréquences en retard | [Penn State — ondes de flexion](https://www.acs.psu.edu/drussell/Demos/Dispersion/Flexural.html) |
| K15.2 | Lame d’acier de 5 mm : β = √(E/ρ) h/√12 ≈ 7,29 m²/s | ✅ | 5 050 × 0,005/3,464 = 7,289 m²/s (recalculé) | calcul |
| K15.3 | 1 kHz : v_φ 214 m/s, v_g 428 m/s, 2,3 ms sur 1 m ; 4 kHz : 428, 856 m/s, 1,2 ms | ✅ | 214,0 / 428,0 / 2,34 ms ; 428,0 / 856,0 / 1,17 ms (recalculé) | calcul |
| K15.4 | Sur 1 m, la bosse à 4 kHz arrive environ 1,2 ms avant celle à 1 kHz ; dans l’air, 2,9 ms pour les deux | ✅ | Écart 1,17 ms ; 1/343 = 2,92 ms (recalculé) | calcul |
| K15.5 | Modèle de poutre mince valable tant que λ de flexion ≫ épaisseur | ✅ | À 4 kHz, λ_flexion = 428/4 000 = 107 mm contre 5 mm d’épaisseur : hypothèse satisfaite (recalculé) | calcul · [Penn State — ondes de flexion](https://www.acs.psu.edu/drussell/Demos/Dispersion/Flexural.html) |
| K15.6 | Mode supérieur d’un conduit : v_φ = c/√(1 − (f_c/f)²), v_g = c√(1 − (f_c/f)²), produit c² | ✅ | Relation de guide standard ; vitesse apparente décroissante avec f | calcul · [Penn State — guides d’ondes](https://www.acs.psu.edu/drussell/Demos/waveguide/waveguides.html) |
| K15.7 | Dans l’air, aux fréquences audibles, la dispersion est très faible ; le tonnerre lointain change surtout par absorption | ✅ | Dispersion de relaxation à 20 °C : m = 6,71×10⁻⁴ (O₂) et 1,26×10⁻⁴ (N₂) entre fréquence nulle et infinie (Blackstock 2000, repris par Chen et Xiang), soit Δc/c de quelques 10⁻⁴ au plus (≈ 0,1 m/s) ; ECCC : le tonnerre lointain paraît plus grave parce que les hautes fréquences sont absorbées sélectivement. **Sources ajoutées aux Appuis de la clé (sept. 2026)** | [ECCC — How thunder sounds](https://www.canada.ca/en/environment-climate-change/services/lightning/science/how-thunder-sounds.html) · [Chen et Xiang, arXiv 2401.11020, § 2.2](https://arxiv.org/pdf/2401.11020) · DOI [10.1121/10.0025686](https://doi.org/10.1121/10.0025686) |

### F16 — Atténuation : dilution, absorption et redistribution

**Place :** chapitre de l’absorption atmosphérique, après la mention de la norme ISO 9613-1 · [lire la clé](../provoxys/son/index.html#cle-f16)
**Comptes :** 9 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K16.1 | 20 log₁₀ e = 8,686 ; 0,01 Np/m = 0,087 dB/m = 87 dB/km | ✅ | 8,6859 ; 0,0869 dB/m (recalculé) | calcul · [NDE-Ed — Attenuation](https://www.nde-ed.org/Physics/Waves/attenuation.xhtml) |
| K16.2 | Air à 20 °C et 70 % HR : 5,0 dB/km à 1 kHz, 77,6 dB/km à 8 kHz | ✅ | Formules ISO 9613-1 recalculées : 4,98 et 77,63 dB/km | calcul · DOI [10.1121/1.412989](https://doi.org/10.1121/1.412989) |
| K16.3 | De 1 m à 100 m : dilution 40 dB ; absorption 0,5 dB (1 kHz) et 7,7 dB (8 kHz) | ✅ | 40,0 ; 0,495 ; 7,68 dB (99 m parcourus, recalculé) | calcul |
| K16.4 | De 1 m à 1 000 m : 60 dB ; 5,0 et 77,5 dB ; 72 dB de plus aux aigus | ✅ | 60,0 ; 5,00 ; 77,52 ; écart 72,5 dB (recalculé) | calcul |
| K16.5 | Sonar actif à 8 kHz, cible à 10 km : 80 + 5 = 85 dB à l’aller, 170 dB aller-retour | ✅ | Exemple DOSITS : 20 log₁₀ R + 0,5 dB/km, compté deux fois | [DOSITS — Sonar equation, active sonar](https://dosits.org/science/advanced-topics/sonar-equation/sonar-equation-example-active-sonar/) |
| K16.6 | Salle de 20 000 m³ (T₆₀ = 2 s) : A = 1 610 m² ; à 8 kHz m = 0,0179 m⁻¹, 4mV ≈ 1 430 m², T₆₀ ≈ 1,06 s | ✅ | 1 610 ; 0,01787 ; 1 429 m² ; 1,059 s (recalculé) | calcul · DOI [10.1121/1.412989](https://doi.org/10.1121/1.412989) |
| K16.7 | En 2 s, le son parcourt 686 m et l’air lui retire environ 53 dB à 8 kHz | ✅ | 77,6 × 0,686 = 53,2 dB (recalculé) | calcul |
| K16.8 | Eau de mer : relaxations de l’acide borique et du sulfate de magnésium aux basses et moyennes fréquences | ✅ | Francois & Garrison 1982 | DOI [10.1121/1.388673](https://doi.org/10.1121/1.388673) |
| K16.9 | Pertes classiques en f² ; relaxation moléculaire fixée par humidité et température ; ISO 9613-1 ajustée sur mesures | ✅ | Bass et al. 1995, formules reprises par ISO 9613-1 | DOI [10.1121/1.412989](https://doi.org/10.1121/1.412989) · [INRS ED 6103](https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6103.pdf) |

### F17 — Diffusion : ce que renvoient les petits objets et les surfaces rugueuses

**Place :** chapitre des phénomènes, après la définition de la diffraction · [lire la clé](../provoxys/son/index.html#cle-f17)
**Comptes :** 6 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K17.1 | Régime de Rayleigh : intensité diffusée ∝ k⁴a⁶/r², hors bulles et hors ka ≈ 1 | ✅ | Petite sphère dure ou fluide ; résultat basse fréquence très sensible aux conditions de surface | DOI [10.1121/1.4774277](https://doi.org/10.1121/1.4774277) |
| K17.2 | Doubler la fréquence : +12 dB ; diviser la taille par deux : −18 dB | ✅ | 10 log₁₀ 16 = 12,04 dB ; 10 log₁₀ 64 = 18,06 dB (recalculé) | calcul |
| K17.3 | Insecte de 2 mm de rayon : ka = 0,73 (20 kHz), 1,46 (40 kHz), 2,9 (80 kHz) | ✅ | 0,732 ; 1,465 ; 2,93 (recalculé, c = 343,2 m/s). La question parle d’un moustique « de 2 mm », l’exemple d’un rayon de 2 mm | calcul |
| K17.4 | À 40 kHz et 20 °C, l’absorption de l’air vaut ≈ 0,46 dB/m à 10 % d’humidité relative, 0,78 à 20 %, dépasse 1 dB/m au-delà d’environ 30 % et culmine vers 1,3 dB/m entre 50 et 60 % | ⚠️ | **Corrigé dans la clé (sept. 2026)** : la clé disait « dépasse 1 dB par mètre » sans humidité. ISO 9613-1 recalculé à 20 °C, 101,325 kPa : 0,32 (5 % HR), 0,46 (10 %), 0,78 (20 %), 1,07 (30 %), 1,32 (50 %), 1,32 (60 %), 1,29 (70 %), 1,23 (80 %) dB/m ; seuil de 1 dB/m franchi vers 28 % HR | calcul · DOI [10.1121/1.412989](https://doi.org/10.1121/1.412989) (désormais aussi dans les Appuis de la clé) |
| K17.5 | En contrôle non destructif, un défaut plus grand qu’une demi-longueur d’onde a une chance raisonnable d’être détecté : règle d’expérience | ✅ | Règle pratique ; la diffusion par les grains augmente avec la fréquence et la pénétration diminue | [NDE-Ed — Defect detection](https://www.nde-ed.org/Physics/Waves/defectdetect.xhtml) |
| K17.6 | L’atténuation mesurée réunit diffusion (énergie renvoyée) et absorption (énergie convertie) | ✅ | Définition conforme | [NDE-Ed — Attenuation](https://www.nde-ed.org/Physics/Waves/attenuation.xhtml) |
| K17.7 | Une bulle de gaz, bien plus petite que λ, peut renvoyer un écho fort par résonance | ✅ | Sphère molle : réponse basse fréquence bien plus forte que la loi en k⁴ | DOI [10.1121/1.4774277](https://doi.org/10.1121/1.4774277) · [Penn State — diffusion par sphères et cylindres](https://www.acs.psu.edu/drussell/Demos/Scatter/Scatter.html) |

### F18 — Atmosphère et océan : gradients, vent, guides et trajets multiples

**Place :** chapitre sur la réfraction, après la lecture de la loi de Snell–Descartes (« sinus thêta un sur cé un… ») · [lire la clé](../provoxys/son/index.html#cle-f18)
**Comptes :** 5 ✅ · 2 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K18.1 | La célérité du son dans l’air gagne environ 0,6 m/s par degré | ✅ | c = 331,36 + 0,6067 T (T en °C) selon la page citée | [Penn State — Refraction of sound waves](https://www.acs.psu.edu/drussell/Demos/refract/refract.html) |
| K18.2 | Sous le vent les rayons sont rabattus vers le sol, face au vent ils montent et laissent une zone d’ombre ; un vent uniforme ne courbe rien | ✅ | Réfraction vers le haut (face au vent, gradient thermique normal) ou vers le bas (sous le vent, inversion) décrite par Embleton | DOI [10.1121/1.415879](https://doi.org/10.1121/1.415879) |
| K18.3 | Un écart de vent de 5 m/s équivaut à un écart de température d’environ 8 °C | ✅ | 5 / 0,6 = 8,3 °C (recalculé) | calcul · [Penn State — Refraction of sound waves](https://www.acs.psu.edu/drussell/Demos/refract/refract.html) |
| K18.4 | Gradient de vent de 0,1 s⁻¹ : rayon de courbure R ≈ 3 430 m ; ombre à ≈ 234 m pour source et récepteur à 2 m | ⚠️ | R = 343/0,1 = 3 430 m ; √(2R)·(√2 + √2) = 234,3 m (recalculé). Géométrie de rayons pure, gradient linéaire, sans diffraction ni turbulence, comme la clé le précise | calcul · DOI [10.1121/1.415879](https://doi.org/10.1121/1.415879) |
| K18.5 | Effet de sol à 50 m, hauteurs 1,5 m : différence de marche 0,090 m, premier creux ≈ 1 900 Hz sur sol dur | ⚠️ | √(50² + 3²) − 50 = 0,0899 m ; 343/(2 × 0,0899) = 1 907 Hz (recalculé). Valable pour un sol parfaitement réfléchissant ; sur sol réel, la réflexion complexe déplace les creux (Embleton) | calcul · DOI [10.1121/1.415879](https://doi.org/10.1121/1.415879) |
| K18.6 | Dans l’océan, la célérité passe par un minimum vers 500 à 1 000 m de profondeur (canal SOFAR) | ✅ | Pêches et Océans Canada : son le plus lent vers 500–1 000 m ; NOAA : minimum à la base de la thermocline | [Pêches et Océans Canada](https://www.dfo-mpo.gc.ca/oceans/noise-bruit/about-a-propos/index-eng.html) · [NOAA Ocean Service](https://oceanservice.noaa.gov/facts/sound.html) |
| K18.7 | Le canal SOFAR porte le son sur des milliers de kilomètres ; célérité dans l’eau de mer de 1 450 à 1 550 m/s | ✅ | NOAA : « thousands of miles » ; MPO : 1 450–1 550 m/s, croissante avec température, pression et salinité | [NOAA Ocean Service](https://oceanservice.noaa.gov/facts/sound.html) · [Pêches et Océans Canada](https://www.dfo-mpo.gc.ca/oceans/noise-bruit/about-a-propos/index-eng.html) |

### F19 — Traverser une paroi : masse, raideur, fuites et chemins détournés

**Place :** chapitre sur le bruit et l’environnement, après « Cartes de bruit européennes (directive 2002/49/CE) » · [lire la clé](../provoxys/son/index.html#cle-f19)
**Comptes :** 6 ✅ · 3 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K19.1 | 𝒯 = 10⁻⁵ correspond à un affaiblissement de 50 dB | ✅ | −10 log₁₀(10⁻⁵) = 50 dB (recalculé) | calcul |
| K19.2 | Loi de masse en incidence normale : plaque de 10 kg/m² à 19,6 dB (125 Hz) et 31,6 dB (500 Hz) | ⚠️ | 20 log₁₀(π f m''/413) = 19,56 et 31,60 dB (recalculé). Paroi infinie, onde plane normale : en champ diffus les valeurs réelles sont plus basses, ce que la clé énonce | calcul · [Penn State — Plane and evanescent waves](https://www.acs.psu.edu/drussell/Demos/EvanescentWaves/EvanescentWaves.html) |
| K19.3 | Béton de 20 cm (460 kg/m²) : 52,8 dB à 125 Hz, 64,9 dB à 500 Hz ; +6 dB par doublement de f ou de m'' | ⚠️ | 52,82 et 64,86 dB (recalculé) ; 20 log₁₀ 2 = 6,02 dB. Mêmes hypothèses de loi de masse ; une dalle de béton a sa coïncidence vers 90 Hz, donc la loi ne s’y applique pas strictement | calcul |
| K19.4 | Double paroi 2 × 10 kg/m², lame d’air 7 cm : résonance f₀ ≈ 101 Hz ; ρ₀c² ≈ 1,42 × 10⁵ Pa | ✅ | ρ₀c² = 1,204 × 343,2² = 1,418 × 10⁵ Pa ; f₀ = 101,3 Hz (recalculé) | calcul |
| K19.5 | Mur de 10 m² à 50 dB avec une fente de 0,01 m² : ≈ 30 dB ; fente dix fois plus petite : 39,6 dB | ✅ | 𝒯moy = 1,009 × 10⁻³ → 29,96 dB ; avec 0,001 m² → 39,59 dB (recalculé) | calcul |
| K19.6 | Fréquence critique : vitrage de 4 mm ≈ 3 000 Hz, dalle de béton de 20 cm ≈ 90 Hz | ✅ | fc = (c²/2π)√(m''/B) : 2 989 Hz et 88 Hz avec les paramètres donnés (recalculé) | calcul · [Penn State — Plane and evanescent waves](https://www.acs.psu.edu/drussell/Demos/EvanescentWaves/EvanescentWaves.html) |
| K19.7 | Plus de 250 cloisons en plaques de plâtre mesurées : l’indépendance des deux faces prime ; isolant inutile sur montants rigides | ✅ | Constat de Warnock et Quirt (NRC, CTU n° 1, 1997) tel que résumé dans la clé | [NRC Canada — Warnock & Quirt 1997](https://nrc-publications.canada.ca/eng/view/object/?id=7c9971a9-227a-433a-8c06-cd00af83a236) |
| K19.8 | Faces désolidarisées : doubler la masse, doubler la cavité ou la remplir d’isolant gagne chacun une dizaine de points d’indice | ⚠️ | Ordre de grandeur rapporté par le NRC pour l’indice étudié (STC) et cette famille de cloisons ; non transposable tel quel à d’autres parois | [NRC Canada — Warnock & Quirt 1997](https://nrc-publications.canada.ca/eng/view/object/?id=7c9971a9-227a-433a-8c06-cd00af83a236) |
| K19.9 | Pièce de réception : L₂ ≈ 90 − 45 + 10 log₁₀(10/10) = 45 dB ; absorber n’est pas isoler | ✅ | 45 dB (recalculé), champ diffus ; INRS : isolation et absorption sont « deux notions distinctes et complémentaires » | calcul · [INRS — Dix points clés](https://www.inrs.fr/demarche/conception-lieux-situations-travail/dix-points-cles.html) |

### F20 — Absorber, diffuser, isoler : où va l’énergie qui ne revient pas

**Place :** chapitre sur l’acoustique des salles, après la définition de T₆₀ (« temps pour que le niveau baisse de 60 dB ») · [lire la clé](../provoxys/son/index.html#cle-f20)
**Comptes :** 6 ✅ · 2 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K20.1 | Mousse de mélamine 20 mm : α = 0,10 (250 Hz), 0,20 (500 Hz), 0,90 (4 kHz) ; 50 mm : 0,28, 0,60, 1,00 | ✅ | Valeurs identiques au tableau 1 de la brochure INRS ED 6103 (mars 2026), contrôlées dans le PDF | [INRS — ED 6103](https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6103.pdf) |
| K20.2 | Salle 10 × 8 × 4 m non traitée, α = 0,05 : V = 320 m³, S = 304 m², A = 15,2 m², T₆₀ = 3,4 s | ⚠️ | 0,161 × 320/15,2 = 3,39 s (recalculé). Le α uniforme de 0,05 est une hypothèse posée par la clé, pas une mesure | calcul |
| K20.3 | Plafond en mélamine 20 mm : 2,7 s (250 Hz), 1,9 s (500 Hz), 0,62 s (4 kHz) ; 50 mm : 1,5 s, 0,87 s, 0,56 s | ✅ | A = 19,2 / 27,2 / 83,2 m² → 2,68 / 1,89 / 0,62 s ; A = 33,6 / 59,2 / 91,2 m² → 1,53 / 0,87 / 0,56 s (recalculé avec les α de l’INRS) | calcul · [INRS — ED 6103](https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6103.pdf) |
| K20.4 | Vitesse de l’air maximale à λ/4 d’une paroi rigide : 34 cm à 250 Hz, 8,6 cm à 1 kHz, 2,1 cm à 4 kHz | ⚠️ | c/4f = 34,3 / 8,58 / 2,14 cm (recalculé). Ordre de grandeur qui explique la tendance, pas un seuil d’efficacité, comme la clé le précise ; l’INRS indique 50 à 100 mm pour le grave | calcul · [INRS — ED 6103](https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6103.pdf) |
| K20.5 | Panneau de 5 kg/m² devant 5 cm d’air : f₀ ≈ 120 Hz | ✅ | (1/2π)√(1,42 × 10⁵/0,25) = 119,9 Hz (recalculé) | calcul |
| K20.6 | Le α de Sabine compte l’énergie dissipée et l’énergie transmise ; une fenêtre ouverte a α voisin de 1 | ✅ | Définition de α comme part non réfléchie ; INRS : « ne pas confondre correction acoustique en absorption et isolation acoustique » | [INRS — ED 6103](https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6103.pdf) · [INRS — Dix points clés](https://www.inrs.fr/demarche/conception-lieux-situations-travail/dix-points-cles.html) |
| K20.7 | Des α mesurés supérieurs à 1 viennent de la méthode (effet de bord, taille de l’échantillon), pas d’un matériau qui absorberait plus qu’il ne reçoit | ✅ | Zhao et al. (2023) : le coefficient en chambre réverbérante dépend de la taille de l’échantillon, surtout par l’effet de bord | DOI [10.1121/10.0022384](https://doi.org/10.1121/10.0022384) |
| K20.8 | Le coefficient dépend du support, du mode de pose et du revêtement (voile, film, tôle perforée) | ✅ | INRS ED 6103 : les revêtements affectent l’efficacité ; influence du montage | [INRS — ED 6103](https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6103.pdf) |

### F21 — Acoustique des salles : ce que T60 ne dit pas

**Place :** chapitre sur l’acoustique des salles, après « Suite : Eyring, Norris, Beranek, Barron, Hidaka » · [lire la clé](../provoxys/son/index.html#cle-f21)
**Comptes :** 6 ✅ · 2 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K21.1 | T₂₀ mesuré entre −5 et −25 dB, T₃₀ entre −5 et −35 dB, avec 35 et 45 dB de marge au-dessus du bruit de fond | ✅ | Définitions et marges de l’ISO 3382-1:2009 (extrait public) | [ISO 3382-1:2009 — extrait](https://cdn.standards.iteh.ai/samples/40979/b0e9f87f3d9f4df6b18f767e3439bfb6/ISO-3382-1-2009.pdf) |
| K21.2 | EDT : extrapolation des 10 premiers décibels, plus sensible aux premières réflexions ; clarté C₈₀ (musique) et C₅₀ (parole) | ✅ | Indicateurs de l’annexe A de l’ISO 3382-1 | [ISO 3382-1:2009 — extrait](https://cdn.standards.iteh.ai/samples/40979/b0e9f87f3d9f4df6b18f767e3439bfb6/ISO-3382-1-2009.pdf) |
| K21.3 | Décroissance purement exponentielle de T₆₀ = 2 s, sans son direct : C₈₀ ≈ −1,3 dB | ✅ | x = e^(−13,8 × 0,08/2) = 0,576 ; 10 log₁₀[(1 − x)/x] = −1,33 dB (recalculé ; −1,32 dB avec ln 10⁶ = 13,816) | calcul · [ISO 3382-1:2009 — extrait](https://cdn.standards.iteh.ai/samples/40979/b0e9f87f3d9f4df6b18f767e3439bfb6/ISO-3382-1-2009.pdf) |
| K21.4 | Distance critique r_c ≈ 0,057 √(QV/T₆₀), avec √(0,161/16π) = 0,0566 | ✅ | √(0,161/16π) = 0,05659 (recalculé) ; formule D_C = 0,057√(QV/RT) chez Arup | calcul · [Arup Strutt — Critical distance](https://strutt.arup.com/help/Electroacoustics/DCritical.htm) |
| K21.5 | Classe de 200 m³, T₆₀ = 0,8 s : r_c ≈ 0,9 m ; salle de 20 000 m³ à 2 s : 5,7 m | ⚠️ | 0,90 m et 5,70 m (recalculé), pour Q = 1 et champ diffus ; repère de modèle statistique, pas frontière physique, comme la clé l’indique | calcul · [Arup Strutt — Critical distance](https://strutt.arup.com/help/Electroacoustics/DCritical.htm) |
| K21.6 | Salle traitée à 4 kHz (ᾱ = 0,30) : Sabine 0,56 s, Eyring 0,48 s | ✅ | −ln(1 − 0,30) = 0,357 ; 0,161 × 320/(304 × 0,357) = 0,475 s ; Sabine 0,565 s (recalculé) | calcul · DOI [10.1121/1.1915175](https://doi.org/10.1121/1.1915175) |
| K21.7 | Sous la fréquence de Schroeder, quelques modes isolés dominent ; c’est une transition progressive | ✅ | Schroeder (1996) : transition entre résonances isolées et modes qui se recouvrent | DOI [10.1121/1.414868](https://doi.org/10.1121/1.414868) |
| K21.8 | Dans les grands halls bas et encombrés, on caractérise plutôt la décroissance du niveau avec la distance (DL) | ⚠️ | INRS ED 6103 : DL par doublement de distance pour les grands locaux, durée de réverbération pour les petits (seuil indicatif lié à la hauteur, < 8 m, dans la brochure) | [INRS — ED 6103](https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6103.pdf) |

### F22 — Réponse impulsionnelle, fonction de transfert, causalité

**Place :** chapitre sur l’acoustique des salles, après « Suite : Eyring, Norris, Beranek, Barron, Hidaka » (deuxième clé à cet endroit) · [lire la clé](../provoxys/son/index.html#cle-f22)
**Comptes :** 7 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K22.1 | Sortie d’un système linéaire invariant = convolution de l’entrée par h ; système causal : h nul avant zéro | ✅ | Représentation par convolution et condition de causalité h(n) = 0 pour n < 0 | [J. O. Smith — Convolution representation](https://www.dsprelated.com/freebooks/filters/Convolution_Representation.html) |
| K22.2 | Écho de 0,8 retardé de 1 ms : détour de 0,34 m ; creux à 500, 1 500, 2 500 Hz | ✅ | 343 × 0,001 = 0,343 m ; creux à (2n + 1)/(2τ) = 500 Hz, 1 500 Hz… (recalculé) | calcul |
| K22.3 | Gain maximal +5,1 dB, minimal −14,0 dB | ✅ | 20 log₁₀ 1,8 = 5,11 dB ; 20 log₁₀ 0,2 = −13,98 dB (recalculé) | calcul |
| K22.4 | Inverser le peigne demande +14 dB (a = 0,8), +26 dB (a = 0,95), +40 dB (a = 0,99) | ✅ | −20 log₁₀(1 − a) = 13,98 / 26,02 / 40,00 dB (recalculé) | calcul |
| K22.5 | Un auditeur à 3,43 m reçoit le son 10 ms après l’émission ; aucun filtre causal ne l’avance | ✅ | 3,43/343 = 0,0100 s (recalculé) | calcul · [J. O. Smith — Convolution representation](https://www.dsprelated.com/freebooks/filters/Convolution_Representation.html) |
| K22.6 | La réponse impulsionnelle vaut pour une position de source et une position de récepteur ; mesure par balayage ou séquence pseudo-aléatoire, pistolet pour une évaluation sommaire | ✅ | ISO 3382-1:2009, définitions et méthodes de mesure | [ISO 3382-1:2009 — extrait](https://cdn.standards.iteh.ai/samples/40979/b0e9f87f3d9f4df6b18f767e3439bfb6/ISO-3382-1-2009.pdf) |
| K22.7 | Réciprocité : pression identique après échange source–récepteur dans un milieu linéaire au repos ; extension fluide–structure | ✅ | Norris et Rebinsky (1993) | DOI [10.1121/1.408260](https://doi.org/10.1121/1.408260) · [PDF de l’auteur](https://coewww.rutgers.edu/~norris/papers/1993_JASA_94_1714-1715.pdf) |

### F23 — Pourquoi reconnaître un instrument demande plus qu’une liste d’harmoniques

**Place :** chapitre sur Fourier et le timbre, après « Joseph Fourier (1807 / publication 1822) » · [lire la clé](../provoxys/son/index.html#cle-f23)
**Comptes :** 8 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K23.1 | Le timbre dépend du spectre, mais aussi fortement de l’évolution de la note dans le temps | ✅ | Position de la page de l’UNSW | [UNSW — Musical sounds, musical instruments](https://newt.phys.unsw.edu.au/jw/musical-sounds-musical-instruments.html) |
| K23.2 | Les transitoires d’attaque aident à identifier un instrument | ✅ | Saldanha et Corso (1964) : identification meilleure quand les transitoires sont présents | DOI [10.1121/1.1919317](https://doi.org/10.1121/1.1919317) |
| K23.3 | L’effet de la phase sur le timbre existe mais reste modeste | ✅ | Plomp et Steeneken (1969) : effet maximal inférieur à celui d’un changement de pente spectrale de 2 dB par octave | DOI [10.1121/1.1911705](https://doi.org/10.1121/1.1911705) |
| K23.4 | Un filtre auditif centré à 2 kHz a une largeur équivalente d’environ 240 Hz | ✅ | ERB = 24,7 (4,37 × 2 + 1) = 240,6 Hz (recalculé, formule de Glasberg et Moore) | calcul · DOI [10.1016/0378-5955(90)90170-T](https://doi.org/10.1016/0378-5955%2890%2990170-T) |
| K23.5 | Décroissance e^(−t/τ) : 8,686/τ dB/s, soit 4,3 dB/s (τ = 2 s) et 17,4 dB/s (τ = 0,5 s) ; écart accru d’environ 13 dB en 1 s | ✅ | 20 log₁₀ e = 8,686 ; 4,34 et 17,37 dB/s ; écart 13,0 dB (recalculé) | calcul |
| K23.6 | Impulsion rectangulaire de 1 ms : premier zéro du spectre à 1 kHz | ✅ | Zéros de sinc(πfT) à f = n/T ; 1/0,001 = 1 000 Hz (recalculé) | calcul |
| K23.7 | Fondamentale absente : 400, 600 et 800 Hz se répètent toutes les 5 ms, la période de 200 Hz | ✅ | PGCD 200 Hz → période 5 ms (recalculé) | calcul |
| K23.8 | Phénomène de Gibbs : dépassement d’environ 9 % de la hauteur du saut, qui ne disparaît pas | ✅ | Si(π)/π − 1/2 = 0,0895, soit 8,95 % du saut (recalculé) ; résultat mathématique classique, sans source dans les Appuis de la clé | calcul |

### F24 — Entretenir une vibration : une réserve d’énergie, une valve, une rétroaction

**Place :** chapitre sur les instruments, après « Cordes frottées : Helmholtz déjà » · [lire la clé](../provoxys/son/index.html#cle-f24)
**Comptes :** 8 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K24.1 | Mouvement de Helmholtz : cycle adhérence–glissement à la période de la corde, déclenché par le passage du coude sous l’archet | ✅ | Description de l’UNSW (Bows and strings) | [UNSW — Bows and strings](https://newt.phys.unsw.edu.au/jw/Bows.html) |
| K24.2 | Corde de la3 d’un violon entier, longueur vibrante 32,5 à 33 cm (L = 0,325 m retenu), 440 Hz : T ≈ 2,27 ms, c_corde ≈ 286 m/s (290 m/s avec 33 cm) | ⚠️ | 1/440 = 2,273 ms ; 2 × 0,325 × 440 = 286,0 m/s ; 2 × 0,33 × 440 = 290,4 m/s (recalculé). **Corrigé dans la clé (sept. 2026)** : la longueur est donnée comme fourchette usuelle et sourcée — Pirastro : 32,5 cm pour un violon 4/4 ; 330 mm sur les Stradivari et Guarneri (Wikipédia, dernier recours) | calcul · [UNSW — Bows and strings](https://newt.phys.unsw.edu.au/jw/Bows.html) · [Pirastro — Vibrating String Length](https://www.pirastro.com/public_pirastro/pages/en/Vibrating-String-Length/) · [Wikipédia — Scale length](https://en.wikipedia.org/wiki/Scale_length_%28string_instruments%29) |
| K24.3 | L’anche de clarinette est une valve commandée par la différence de pression, couplée aux résonances du tuyau | ✅ | Page Clarinet acoustics de l’UNSW | [UNSW — Clarinet acoustics](https://newt.phys.unsw.edu.au/jw/clarinetacoustics.html) |
| K24.4 | L’oscillation entretenue des plis vocaux demande un décalage entre force de l’air et mouvement (onde muqueuse), l’effet Bernoulli seul ne suffit pas | ✅ | Titze (1988), conditions d’oscillation à petite amplitude | DOI [10.1121/1.395910](https://doi.org/10.1121/1.395910) · [UNSW — Voice acoustics](https://newt.phys.unsw.edu.au/jw/voice.html) |
| K24.5 | Condition du Larsen : gain de boucle au moins 1 et phase multiple de 2π | ✅ | Van Waterschoot et Moonen (2011) | DOI [10.1109/JPROC.2010.2090998](https://doi.org/10.1109/JPROC.2010.2090998) · [version auteur](https://ftp.esat.kuleuven.be/pub/sista/vanwaterschoot/reports/08-13.pdf) |
| K24.6 | Micro à 3,43 m : retard 10 ms, fréquences candidates espacées de 100 Hz | ✅ | 3,43/343 = 0,010 s ; 1/τ = 100 Hz (recalculé) | calcul |
| K24.7 | Baisser le gain de 3 dB multiplie G par 0,71 : 1,2 devient 0,85 | ✅ | 10^(−3/20) = 0,708 ; 1,2 × 0,708 = 0,850 (recalculé) | calcul |
| K24.8 | Lighthill (1952) : écoulement turbulent traité comme une distribution de sources dans un air au repos ; puissance en U⁸ pour un jet subsonique | ✅ | Analogie acoustique de Lighthill, Proc. R. Soc. Lond. A 211 | DOI [10.1098/rspa.1952.0060](https://doi.org/10.1098/rspa.1952.0060) |
| K24.9 | Doubler la vitesse du jet : ×256, +24 dB ; la réduire de 20 % : ×0,17, −7,8 dB | ✅ | 2⁸ = 256 → 24,08 dB ; 0,8⁸ = 0,168 → −7,75 dB, soit une division par 5,96 (recalculé) | calcul · DOI [10.1098/rspa.1952.0060](https://doi.org/10.1098/rspa.1952.0060) |

### F25 — Quand les ondes cessent de s’additionner simplement : harmoniques, intermodulation, chocs

**Place :** chapitre sur l’équation d’onde, après « En une dimension : p_tt = c² p_xx » · [lire la clé](../provoxys/son/index.html#cle-f25)
**Comptes :** 9 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K25.1 | 60 dB SPL : 20 mPa efficace, cinq millions de fois moins que la pression atmosphérique | ✅ | 20 µPa × 10³ = 0,020 Pa ; 101 325/0,020 = 5,07 × 10⁶ (recalculé) | calcul |
| K25.2 | 440 et 442 Hz après un élément quadratique : 0, 2, 880, 882 et 884 Hz ; la simple somme ne contient que 440 et 442 Hz | ✅ | Identité 2 cos A cos B = cos(A − B) + cos(A + B) ; carrés → 0 Hz et doubles (recalculé) | calcul |
| K25.3 | Coefficient de non-linéarité : 1,2 dans l’air, environ 3,5 dans l’eau ; distance de choc 1/(βεk) | ✅ | (γ + 1)/2 = 1,2 pour γ = 1,4 ; 1 + B/2A = 3,5 pour B/A = 5 (recalculé) ; valeurs et formule du cours de Cleveland | calcul · [Cleveland — ISNA 2022, Part I](https://isna22.web.ox.ac.uk/sites/default/files/isna22/documents/media/isna_2022_short_course_nonlinear_acoustics_part_i.pdf) |
| K25.4 | Sinus de 1 kHz à 140 dB SPL dans l’air : p̂ ≈ 283 Pa, ε ≈ 2,0 × 10⁻³, x̄ ≈ 23 m ; 230 m à 120 dB | ⚠️ | p̂ = 282,8 Pa ; ε = 2,00 × 10⁻³ ; k = 18,32 rad/m ; x̄ = 22,7 m et 227 m (recalculé). Onde plane sans pertes : dans la réalité la divergence et l’absorption allongent ou empêchent la formation, comme la clé l’indique | calcul · [Cleveland — ISNA 2022, Part I](https://isna22.web.ox.ac.uk/sites/default/files/isna22/documents/media/isna_2022_short_course_nonlinear_acoustics_part_i.pdf) |
| K25.5 | Eau, 1 MHz, 1 MPa : ε ≈ 4,4 × 10⁻⁴, k ≈ 4 190 rad/m, x̄ ≈ 0,15 m | ✅ | 4,44 × 10⁻⁴ ; 4 189 rad/m ; 0,153 m (recalculé) | calcul · [Cleveland — ISNA 2022, Part I](https://isna22.web.ox.ac.uk/sites/default/files/isna22/documents/media/isna_2022_short_course_nonlinear_acoustics_part_i.pdf) |
| K25.6 | Angle du cône de Mach : sin μ = 1/M ; 30° à Mach 2, ≈ 45,6° à Mach 1,4 | ✅ | asin(0,5) = 30,0° ; asin(1/1,4) = 45,58° (recalculé) | calcul · [NASA Glenn — Mach Angle](https://www.grc.nasa.gov/www/k-12/airplane/machang.html) |
| K25.7 | Le bang accompagne tout le vol supersonique et balaie au sol un « tapis » | ✅ | Explication de la NASA sur le X-59 | [NASA — X-59 Explainer](https://www.nasa.gov/blogs/quesst/2026/08/10/nasa-x-59-explainer-science-of-sonic-booms/) |
| K25.8 | Le profil de pression au sol a souvent la forme d’une onde en N | ✅ | Maglieri et Plotkin, *Sonic Boom* (NASA) | [NASA NTRS — Maglieri & Plotkin](https://ntrs.nasa.gov/api/citations/19920001390/downloads/19920001390.pdf) |
| K25.9 | Nombre de Gol’dberg Γ = βεk/α : choc si Γ ≫ 1, profil lisse si Γ ≪ 1 | ✅ | Définition du cours de Cleveland | [Cleveland — ISNA 2022, Part I](https://isna22.web.ox.ac.uk/sites/default/files/isna22/documents/media/isna_2022_short_course_nonlinear_acoustics_part_i.pdf) |
| K25.10 | Sonar paramétrique : deux ultrasons voisins intenses produisent dans l’eau un faisceau à la fréquence de différence | ✅ | Westervelt (1963), « Parametric acoustic array » | DOI [10.1121/1.1918525](https://doi.org/10.1121/1.1918525) |

### F26 — Propager, chauffer, faire vibrer des bulles : trois effets distincts des ultrasons

**Place :** chapitre échographie, après « Sécurité : indices thermique et mécanique » · [lire la clé](../provoxys/son/index.html#cle-f26)
**Comptes :** 5 ✅ · 3 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K26.1 | Puissance déposée q = 2 α_abs I, α en amplitude (Np/m) ; 1 Np = 8,686 dB | ✅ | Relation standard du dépôt de chaleur par absorption d'une onde progressive ; seule l'absorption compte, pas la diffusion | [O'Brien 2007 — texte intégral PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC1995002/) · DOI [10.1016/j.pbiomolbio.2006.07.010](https://doi.org/10.1016/j.pbiomolbio.2006.07.010) |
| K26.2 | 1 W/cm² à 1 MHz, 0,5 dB/cm pris comme absorption ⇒ α ≈ 5,8 Np/m, q ≈ 1,15×10⁵ W/m³ | ⚠️ | Recalculé : α = 5,76 Np/m, q = 1,151×10⁵ W/m³. 0,5 dB/cm est une valeur-type (tissus mous ≈ 0,3 à 1 dB/cm/MHz selon le tissu) ; hypothèse majorante (toute l'atténuation traitée comme absorption) énoncée | calcul · [O'Brien 2007 — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC1995002/) |
| K26.3 | Sans évacuation : ≈ 0,03 K/s, 0,3 K en 10 s, 1,9 K en une minute (ρ = 1 050 kg/m³, c_p = 3 420 J/(kg·K)) | ⚠️ | Recalculé : 0,032 K/s ; 0,32 K ; 1,92 K. Borne haute adiabatique : conduction et perfusion réduisent l'échauffement, ce que la clé dit | calcul · DOI [10.1080/23328940.2022.2088034](https://doi.org/10.1080/23328940.2022.2088034) |
| K26.4 | Capacité thermique massique du muscle ≈ 3 420 J/(kg·K) | ✅ | Valeur tissulaire reprise par Xu, Rioux et Castellani | DOI [10.1080/23328940.2022.2088034](https://doi.org/10.1080/23328940.2022.2088034) |
| K26.5 | Minnaert dans l'eau : f₀R₀ ≈ 3,3 m/s ; bulle de 1 mm → 3,3 kHz ; 40 kHz → R₀ ≈ 80 µm ; isotherme ≈ 2,8 m/s | ✅ | Recalculé (γ = 1,4, P₀ = 101 325 Pa, ρ = 1 000 kg/m³) : 3,28 m/s ; 3,28 kHz ; 82 µm ; 2,77 m/s (γ = 1). Modèle sans tension superficielle ni viscosité, restriction énoncée | calcul · DOI [10.1080/14786443309462277](https://doi.org/10.1080/14786443309462277) |
| K26.6 | MI = p_r,3 / √f_c, pression de détente dératée de 0,3 dB/cm/MHz, en MPa et MHz | ✅ | Définition réglementaire de l'indice mécanique | [FDA — Marketing Clearance of Diagnostic Ultrasound Systems (2023)](https://www.fda.gov/media/71100/download) · [O'Brien 2007 — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC1995002/) |
| K26.7 | 1,5 MPa à 3 MHz ⇒ MI ≈ 0,87 ; à 0,75 MHz ⇒ 1,73 | ✅ | Recalculé : 0,866 et 1,732 | calcul · [FDA (2023)](https://www.fda.gov/media/71100/download) |
| K26.8 | Nettoyage vers 20–80 kHz par cavitation ; soudure des plastiques par frottement, sans cavitation | ⚠️ | **Corrigé dans la clé (sept. 2026)** : la clé disait « 20–100 kHz », borne haute non couverte par les sources ouvertes ; elle dit désormais « environ 20–80 kHz ». Kanegsberg : ≈ 20 kHz (grosses pièces), 40 kHz (précision), 60–80 kHz (pièces délicates), mégasonique 0,36–2 MHz ; NPL : 40 kHz fréquence typique, rôle de la cavitation ; Villegas : soudure des thermoplastiques 20–50 kHz, frottement puis dissipation viscoélastique dans le solide. Sources ajoutées aux Appuis | [Kanegsberg — Ultrasonics vs. Megasonics](https://sst.semiconductor-digest.com/2002/07/ultrasonics-vs-megasonics/) · [NPL Report CMAM 55](https://eprintspublications.npl.co.uk/1617/1/cmam55.pdf) · DOI [10.3389/fmats.2019.00291](https://doi.org/10.3389/fmats.2019.00291) |

### F27 — Comment une onde qui va et vient peut pousser : force de radiation et écoulement moyen

**Place :** chapitre échographie, après « Sécurité : indices thermique et mécanique » · [lire la clé](../provoxys/son/index.html#cle-f27)
**Comptes :** 6 ✅ · 2 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K27.1 | Pression de radiation d'une onde plane sur cible absorbante ⟨Π⟩ = I/c ; double sur cible réfléchissante | ⚠️ | Relation P/c (absorbant) et 2P/c (réflecteur parfait) du principe de la balance de radiation, incidence normale. Contrôle d'échantillon : physique juste, mais le résumé de Gélat et Shaw (texte intégral fermé) ne donne pas la formule ; il porte sur l'écart à P/c des faisceaux focalisés. Source ouverte de l'équation : note A*STAR (P = cF) | DOI [10.1016/j.ultrasmedbio.2014.09.021](https://doi.org/10.1016/j.ultrasmedbio.2014.09.021) · [A*STAR/NMC — balance de force de radiation](https://oar.a-star.edu.sg/storage/o/o13no0z05y/realization-of-medical-ultrasound-power-measurement-by-radiation-force-balance-method.pdf) |
| K27.2 | 120 dB SPL dans l'air : I ≈ 0,97 W/m², Π ≈ 2,8 mPa, ≈ 7 000 fois moins que p_rms | ✅ | Recalculé (ρc = 1,20 × 343) : 0,972 W/m² ; 2,83 mPa ; rapport 7 060 | calcul · DOI [10.1016/j.ultrasmedbio.2014.09.021](https://doi.org/10.1016/j.ultrasmedbio.2014.09.021) |
| K27.3 | Sonde de 1 W dans l'eau, faisceau absorbé : 0,67 mN, poids d'environ 68 mg | ✅ | Recalculé : 1/1 500 = 0,667 mN ; 0,667 mN / 9,81 m/s² = 68,0 mg | calcul · DOI [10.1016/j.ultrasmedbio.2014.09.021](https://doi.org/10.1016/j.ultrasmedbio.2014.09.021) |
| K27.4 | F = 4πΦa³kE_ac sin(2kz), Φ = (1−κ̃)/3 + (ρ̃−1)/(2ρ̃+1) ; Φ > 0 vers les nœuds, Φ < 0 vers les ventres | ✅ | Forme de Bruus (2012) avec E_ac = p_a²/(4ρ₀c₀²) ; la clé signale la convention au facteur 3 près | DOI [10.1039/c2lc21068a](https://doi.org/10.1039/c2lc21068a) |
| K27.5 | Polystyrène dans l'eau : κ̃ ≈ 0,56, ρ̃ ≈ 1,05, Φ ≈ 0,165 | ✅ | Recalculé : 0,556 ; 1,052 ; Φ = 0,1649. Bruus donne Φ ≈ 0,17 | calcul · DOI [10.1039/c2lc21068a](https://doi.org/10.1039/c2lc21068a) |
| K27.6 | Lévitation à 40 kHz d'une bille de polystyrène : k ≈ 733 rad/m, p_a ≈ 1,8 kPa, 1,26 kPa efficaces, ≈ 156 dB SPL | ⚠️ | Recalculé (Φ = 5/6, ρ₀ = 1,20, c₀ = 343) : 732,7 rad/m ; 1 782 Pa ; 1 260 Pa ; 156,0 dB. Modèle de petite sphère sans viscosité, ordre de grandeur annoncé comme tel | calcul · DOI [10.1063/1.4989995](https://doi.org/10.1063/1.4989995) |
| K27.7 | Longueur d'onde de 8,6 mm à 40 kHz dans l'air | ✅ | Recalculé : 343/40 000 = 8,58 mm | calcul |
| K27.8 | Transition radiation/écoulement vers 1,4 µm de diamètre pour du polystyrène dans l'eau à 2 MHz, décroissante avec la fréquence | ✅ | L'article définit un diamètre critique 2a_c ≈ 1,4 µm (corps du texte) ; le rapport des vitesses croît comme a²f | DOI [10.1103/PhysRevE.86.056307](https://doi.org/10.1103/PhysRevE.86.056307) · [arXiv:1208.6534](https://arxiv.org/abs/1208.6534) |

### F28 — Une grammaire des niveaux : de quoi un décibel est-il le rapport ?

**Place :** chapitre des décibels, après la formule du niveau de pression L_p = 20 log₁₀(p/p₀) · [lire la clé](../provoxys/son/index.html#cle-f28)
**Comptes :** 10 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K28.1 | Références : 20 µPa (air), 1 µPa (eau), 1 pW (puissance), 1 pW/m² (intensité) | ✅ | Valeurs normalisées des tableaux de l'ISO 1683 | [ISO 1683:2015, extrait](https://cdn.standards.iteh.ai/samples/64648/cfb8cf9ac504466aafc2683db4c3b782/ISO-1683-2015.pdf) |
| K28.2 | Constantes de temps « Rapide » 125 ms et « Lent » 1 s | ✅ | Valeurs normalisées des sonomètres | [NTi Audio — time weighting](https://www.nti-audio.com/en/support/know-how/fast-slow-impulse-time-weighting-what-do-they-mean) · [IEC 61672-1:2013, extrait](https://cdn.standards.iteh.ai/samples/17900/df52d949fc904f329404e965b6268258/IEC-61672-1-2013.pdf) |
| K28.3 | L_W = 100 dB ⇒ 0,01 W ; à 10 m en champ libre I ≈ 8,0×10⁻⁶ W/m², L ≈ 69 dB ; 10 log(4π) ≈ 11 dB | ✅ | Recalculé : 7,96×10⁻⁶ W/m² ; 69,0 dB ; 10,99 dB. Champ libre, source omnidirectionnelle, restriction énoncée | calcul · [Brüel & Kjær — Handbook](https://www.bksv.com/downloads/svpockethandbook/index.html) |
| K28.4 | Une heure à 60 dB puis une heure à 80 dB ⇒ L_eq,2h ≈ 77,0 dB, pas 70 | ✅ | Recalculé : 77,03 dB | calcul · [Brüel & Kjær — Handbook](https://www.bksv.com/downloads/svpockethandbook/index.html) |
| K28.5 | L_EX,8h : une heure à 94 dB(A) équivaut à huit heures à 85 dB(A) | ✅ | Recalculé : 94 + 10 log(1/8) = 84,97 dB(A) ; définition du niveau d'exposition quotidienne ramené à 8 h | calcul · [Directive 2003/10/CE](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32003L0010) · [Arrêté du 11 décembre 2015](https://www.legifrance.gouv.fr/loda/id/LEGITEXT000031857661/2019-02-23) |
| K28.6 | 94 dB SPL ⇒ 1,00 Pa efficace ; sinus : crête 1,41 Pa, crête à crête 2,83 Pa | ✅ | Recalculé : 1,002 Pa ; 1,418 et 2,835 Pa (1,41 et 2,83 exacts à partir de 1,00 Pa arrondi) | calcul · [ISO 1683:2015, extrait](https://cdn.standards.iteh.ai/samples/64648/cfb8cf9ac504466aafc2683db4c3b782/ISO-1683-2015.pdf) |
| K28.7 | Air/eau : 26 dB à pression égale ; + 35,6 dB à intensité égale (ρc 413 contre 1,5×10⁶) ; ≈ 61,6 dB au total | ✅ | Recalculé : 26,02 ; 35,60 ; 61,62 dB | calcul · [ISO 1683:2015, extrait](https://cdn.standards.iteh.ai/samples/64648/cfb8cf9ac504466aafc2683db4c3b782/ISO-1683-2015.pdf) |
| K28.8 | −10 dB SPL = 6,3 µPa ; p₀²/(ρc) ≈ 10⁻¹² W/m², d'où L_p ≈ L_I dans l'air | ✅ | Recalculé : 6,32 µPa ; 0,97×10⁻¹² W/m² | calcul |
| K28.9 | Pondération G conçue pour les infrasons ; A, C, Z pour l'audible | ✅ | Pondérations normalisées décrites par le manuel B&K et NTi Audio | [Brüel & Kjær — Handbook](https://www.bksv.com/downloads/svpockethandbook/index.html) · [NTi Audio — Frequency weightings](https://www.nti-audio.com/en/support/know-how/frequency-weightings-for-sound-level-measurements) |
| K28.10 | dBFS : certains logiciels font valoir 0 dBFS à un sinus pleine échelle, d'autres à un carré | ✅ | Écart réel de 3,01 dB entre les deux conventions ; la norme AES17 retient le sinus pleine échelle, un carré pleine échelle y lit +3,01 dB FS (B. Katz). **Source ajoutée aux Appuis de la clé (sept. 2026)** | [Digido (B. Katz) — Zero dBFS defined](https://www.digido.com/ufaqs/zero-dbfs-defined/) · [AES17, notice officielle](https://www.aes.org/publications/standards/search.cfm?docID=21) |

### F29 — Le bruit en physique : une densité spectrale, pas une liste de raies

**Place :** chapitre du numérique, après « À bas niveau, l'arrondi n'est plus un bruit » · [lire la clé](../provoxys/son/index.html#cle-f29)
**Comptes :** 7 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K29.1 | Bruit blanc de 10⁻⁶ Pa²/Hz entre 20 Hz et 20 kHz : p_rms ≈ 0,141 Pa, L_p ≈ 77,0 dB | ✅ | Recalculé : 0,1414 Pa ; 76,99 dB | calcul · [Heinzel et al. 2002](https://dcc.ligo.org/public/0111/T1400010/001/FFTanalysis.pdf) |
| K29.2 | Niveau de densité L_S ≈ 34,0 dB ; correction de bande 43,0 dB ; total 77,0 dB | ✅ | Recalculé : 33,98 + 43,01 = 76,99 dB | calcul |
| K29.3 | Octave centrée sur 1 kHz (≈ 707 Hz de large) : 62,5 dB ; sur 2 kHz : 65,5 dB | ✅ | Recalculé : largeur 707,1 Hz ; 62,47 dB et 65,48 dB | calcul |
| K29.4 | f_s = 48 kHz, N = 4 096 : cases de 11,7 Hz ; Hann, largeur équivalente 1,5 case = 17,6 Hz ; 46,4 dB par case | ✅ | Recalculé : 11,72 Hz ; 17,58 Hz ; 46,43 dB. ENBW de Hann = 1,5 case | calcul · [Heinzel et al. 2002](https://dcc.ligo.org/public/0111/T1400010/001/FFTanalysis.pdf) · DOI [10.1109/PROC.1978.10837](https://doi.org/10.1109/PROC.1978.10837) |
| K29.5 | Bruit rose : même puissance K ln 2 par octave ; −3 dB/octave sur une FFT, blanc +3 dB/octave en bandes d'octave | ✅ | Intégrale de K/f entre f et 2f = K ln 2, indépendante de f | calcul · [J. O. Smith — 1/F noise](https://www.dsprelated.com/freebooks/sasp/Example_Synthesis_1_F_Noise.html) · [J. O. Smith — White noise](https://www.dsprelated.com/freebooks/sasp/White_Noise.html) |
| K29.6 | Écart-type d'une case ≈ sa moyenne ; K fenêtres ⇒ ≈ 1/√K ; K = 100 ⇒ 10 %, ±0,4 dB | ✅ | Recalculé : +0,41 dB / −0,46 dB pour ±10 % | calcul · [Heinzel et al. 2002](https://dcc.ligo.org/public/0111/T1400010/001/FFTanalysis.pdf) · [J. O. Smith — Welch](https://ccrma.stanford.edu/~jos/sasp/Welch_s_Method.html) |
| K29.7 | Deux micros à 1 m d'écart sur l'axe : décalage de 2,9 ms, maximum de la corrélation croisée à ce retard | ✅ | Recalculé : 1/343 = 2,92 ms | calcul |

### F30 — Ce que mesure un microphone : une chaîne, pas un nombre

**Place :** chapitre du matériel, après « Ce que le matériel permet réellement au stream » · [lire la clé](../provoxys/son/index.html#cle-f30)
**Comptes :** 8 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K30.1 | Longueur d'onde de 34 mm à 10 kHz ; capsule d'un demi-pouce = 12,7 mm | ✅ | Recalculé : 34,3 mm ; 0,5 × 25,4 = 12,7 mm | calcul · [Brüel & Kjær — Measurement microphones](https://www.bksv.com/de/knowledge/blog/sound/measurement-microphones) |
| K30.2 | Un calibreur applique 94 dB SPL (1 Pa) à 1 kHz ; types champ libre, diffus, pression | ✅ | Valeur usuelle des calibreurs ; trois types de micros de mesure | [Brüel & Kjær — Measurement microphones](https://www.bksv.com/de/knowledge/blog/sound/measurement-microphones) |
| K30.3 | Micro de 50 mV/Pa = −26 dB re 1 V/Pa ; 50 mV à 94 dB SPL, 5 mV à 74 dB SPL | ✅ | Recalculé : −26,02 dB ; 50 mV ; 5,01 mV | calcul · [B&K Type 4189](https://www.bksv.com/-/media/literature/Product-Data/bp2210.ashx) |
| K30.4 | MEMS à −26 dBFS pour 94 dB SPL : pleine échelle à 120 dB SPL ; −40 dBFS ⇒ 80 dB SPL | ✅ | Recalculé : 120 et 80 dB SPL ; exemple de la note AN-1112 | calcul · [Analog Devices AN-1112](https://www.analog.com/media/en/technical-documentation/application-notes/an-1112.pdf) |
| K30.5 | Rapport signal/bruit de 62 dB (référence 94 dB) ⇒ bruit propre ≈ 32 dB SPL ; plage 32–120 dB, soit 88 dB | ✅ | Recalculé : 32 dB SPL ; 88 dB. Convention du SNR rapporté à 94 dB SPL | calcul · [Analog Devices AN-1112](https://www.analog.com/media/en/technical-documentation/application-notes/an-1112.pdf) |
| K30.6 | Effet de proximité : +20,8 dB (100 Hz, 5 cm), +3,4 dB (1 kHz, 5 cm), +1,1 dB (100 Hz, 1 m) | ✅ | Recalculé : 20,80 ; 3,41 ; 1,13 dB. Sound On Sound indique plus de 20 dB pour un bidirectionnel très proche | calcul · [Sound On Sound — Proximity effect](https://www.soundonsound.com/techniques/proximity-effect) |
| K30.7 | Incertitude combinée √(0,3² + 1² + 1²) ≈ 1,4 dB | ✅ | Recalculé : 1,45 dB ; composantes illustratives, combinaison quadratique du GUM | calcul · [BIPM — JCGM 100:2008](https://www.bipm.org/documents/20126/2071204/JCGM_100_2008_E.pdf) |
| K30.8 | L_W = 91 dB à 1 m et 111 dB à 10 m donnent le même L_p de 80 dB en champ libre | ✅ | Recalculé : 80,0 dB dans les deux cas | calcul |
| K30.9 | Graisse ≈ 1 440–1 450 m/s contre 1 540 supposés : écho affiché à 10 cm vient de ≈ 9,4 cm | ⚠️ | Recalculé : 9,42 cm (1 450 m/s) ; 9,35 cm (1 440). Vaut si tout le trajet est dans la graisse, hypothèse énoncée | calcul · [IT'IS — Speed of sound](https://itis.swiss/virtual-population/tissue-properties/database/acoustic-properties/speed-of-sound) |

### F31 — Un écho, quatre questions : détecter, situer, séparer, chiffrer l'incertitude

**Place :** chapitre sonar et écholocation, après « Même dessin pour un sous-marin, un iceberg » · [lire la clé](../provoxys/son/index.html#cle-f31)
**Comptes :** 6 ✅ · 1 ⚠️ · 1 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K31.1 | c = 1 500 ± 15 m/s, Δt = 2,000 ms ± 1 µs : σ_d/d ≈ 1,0 %, d = 1,50 ± 0,015 m ; temps 20 fois plus précis | ✅ | Recalculé : 1,001 % ; 1,500 m ; rapport 20 | calcul · [DOSITS — Active sonar example](https://dosits.org/science/advanced-topics/sonar-equation/sonar-equation-example-active-sonar/) |
| K31.2 | Échographe à 1 540 m/s, trajet dans la graisse à ≈ 1 450 m/s : 10 cm affichés ⇒ ≈ 9,4 cm réels | ⚠️ | Recalculé : 9,42 cm. IT'IS donne ≈ 1 440 m/s en moyenne (9,35 cm) ; trajet entièrement dans la graisse, hypothèse énoncée | calcul · [IT'IS — Speed of sound](https://itis.swiss/virtual-population/tissue-properties/database/acoustic-properties/speed-of-sound) |
| K31.3 | Impulsion de 100 µs dans l'eau : résolution axiale ≈ 7,5 cm | ✅ | Recalculé : 1 500 × 10⁻⁴ / 2 = 7,5 cm ; résolution = moitié de la longueur spatiale de l'impulsion | calcul · [echocardiographer.org — Resolution](https://www.echocardiographer.org/resolution) |
| K31.4 | Chirp de 10 ms sur 10 kHz, filtre adapté : 7,5 cm aussi, 100 fois plus d'énergie (+20 dB), produit BT = 100 | ✅ | Recalculé : c/2B = 7,5 cm ; 10 log(100) = 20 dB ; BT = 100 | calcul · [MathWorks — Ambiguity function](https://www.mathworks.com/help/phased/ug/waveform-analysis-using-the-ambiguity-function.html) · [MathWorks — Pulse compression](https://www.mathworks.com/help/phased/ug/pulse-compression-using-phased-system-objects.html) |
| K31.5 | Émission toutes les 10 ms : d_max ≈ 7,5 m ; cible à 9 m (écho à 12 ms) affichée vers 1,5 m | ✅ | Recalculé : 7,5 m ; 12 ms ; 1,5 m | calcul |
| K31.6 | Transducteur qui sonne 0,2 ms : zone aveugle de 15 cm | ✅ | Recalculé : 15,0 cm | calcul |
| K31.7 | Échographie à 1 540 m/s, cadence 5 kHz : profondeur non ambiguë ≈ 15 cm | ✅ | Recalculé : c/(2 × PRF) = 15,4 cm | calcul · [Radiopaedia — PRF](https://radiopaedia.org/articles/pulse-repetition-frequency) |
| K31.8 | Cris FM à large bande des chauves-souris : finesse physiquement possible, exploitation par l'audition encore étudiée | 🔶 | Non sourcé dans la clé. La précision temporelle réellement exploitée par les chauves-souris est discutée depuis des décennies ; la clé le présente comme ouvert | non sourcé dans la clé |

### F32 — Former un faisceau : retards, ouverture et résolution latérale

**Place :** chapitre échographie, après « Résolution axiale ≈ cτ/2 » · [lire la clé](../provoxys/son/index.html#cle-f32)
**Comptes :** 6 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K32.1 | Ouverture 20 mm, foyer à 60 mm, 1 540 m/s : trajet de bord 60,83 mm, retard central 0,54 µs, près de deux périodes à 3,5 MHz | ✅ | Recalculé : 60,828 mm ; 0,537 µs ; période 0,286 µs ; 1,88 période | calcul · DOI [10.1088/0031-9155/61/17/R206](https://doi.org/10.1088/0031-9155/61/17/R206) |
| K32.2 | λ ≈ 0,44 mm à 3,5 MHz ; F# = 3 ⇒ tache latérale δx ~ 1,3 mm | ⚠️ | Recalculé : 0,440 mm ; 1,32 mm. Ordre de grandeur : le coefficient dépend du critère de largeur, ce que la clé dit | calcul · [Radiology Cafe — Image properties](https://www.radiologycafe.com/frcr-physics-notes/ultrasound-imaging/image-properties/) |
| K32.3 | Impulsion de deux cycles : 0,57 µs, δ_ax ≈ 0,44 mm ; séparation trois fois meilleure dans l'axe | ✅ | Recalculé : 0,571 µs ; 0,440 mm ; rapport 3,0 | calcul · [echocardiographer.org — Resolution](https://www.echocardiographer.org/resolution) |
| K32.4 | Pas d = λ, faisceau à 20° : lobe de réseau à −41° ; d = λ/2 : aucun lobe | ✅ | Recalculé : sin θ_g = −0,658, θ_g = −41,1° ; −1,658 hors de [−1, 1] | calcul · [MWRF — Grating lobes](https://www.mwrf.com/technologies/embedded/systems/article/21141406/analog-devices-phased-array-antenna-patterns-part-4grating-lobes) |
| K32.5 | Pas au plus égal à λ/2 pour orienter dans toutes les directions sans lobe de réseau | ✅ | Condition standard des réseaux phasés | DOI [10.1088/0031-9155/61/17/R206](https://doi.org/10.1088/0031-9155/61/17/R206) · [MWRF — Grating lobes](https://www.mwrf.com/technologies/embedded/systems/article/21141406/analog-devices-phased-array-antenna-patterns-part-4grating-lobes) |
| K32.6 | Piston circulaire : premier zéro à sin θ ≈ 1,22 λ/D (zéro de J₁ à 3,83) | ✅ | Recalculé : 3,8317/π = 1,2197 | calcul · [D. A. Russell — Baffled piston](https://www.acs.psu.edu/drussell/Demos/BaffledPiston/BaffledPiston.html) |
| K32.7 | Résolution axiale fixée par l'impulsion, latérale par la largeur du faisceau, qui croît avec la profondeur | ✅ | Distinction standard en imagerie ultrasonore | [echocardiographer.org — Resolution](https://www.echocardiographer.org/resolution) · [Radiology Cafe — Image properties](https://www.radiologycafe.com/frcr-physics-notes/ultrasound-imaging/image-properties/) |

### F33 — Portée d'un sonar : suivre l'énergie de l'émission jusqu'au bruit

**Place :** chapitre sonar et écholocation, après « Même dessin pour un sous-marin, un iceberg » · [lire la clé](../provoxys/son/index.html#cle-f33)
**Comptes :** 7 ✅ · 2 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K33.1 | Sphère rigide grande devant λ : TS = 10 log(a²/4 m²), nul pour a = 2 m | ✅ | Formule classique (Urick) pour ka ≫ 1 | [Cours « Target Strength » (d'après Urick)](https://www.sonar-info.info/p278/TS.pdf) · [DOSITS — Sonar equation](https://dosits.org/science/advanced-topics/sonar-equation/) |
| K33.2 | Sphère de 1 m à 10 kHz dans l'eau : TS ≈ −6 dB, ka ≈ 42 | ✅ | Recalculé : −6,02 dB ; ka = 41,9 | calcul · [Cours « Target Strength »](https://www.sonar-info.info/p278/TS.pdf) |
| K33.3 | Absorption dans l'eau de mer ≈ 1 dB/km à 10 kHz | ✅ | Recalculé (formule simplifiée d'Ainslie et McColm, dérivée de Francois-Garrison) : 0,99 dB/km à 10 °C ; 0,75 à 20 °C ; 1,17 à 4 °C | DOI [10.1121/1.388170](https://doi.org/10.1121/1.388170) · DOI [10.1121/1.388673](https://doi.org/10.1121/1.388673) |
| K33.4 | SL = 200 dB, TS = −6 dB : TL 61 dB à 1 km, 68 dB à 2 km ; écho 72 dB puis 58 dB | ✅ | Recalculé : 61,0 et 68,0 dB ; 71,98 et 57,94 dB | calcul · [DOSITS — Active sonar example](https://dosits.org/science/advanced-topics/sonar-equation/sonar-equation-example-active-sonar/) |
| K33.5 | Bruit de mer 45–55 dB re 1 µPa²/Hz à 10 kHz ; 80 dB dans 1 kHz ; RSB +12 puis −2 dB ; filtre adapté +10 dB | ⚠️ | Recalculé : 80 ; +12 ; −2 ; +10 dB. Modèle de Stojanovic : 46 dB (vent 5 m/s), 53 dB (10 m/s). Gain d'antenne de 20 dB supposé : ordre de grandeur, annoncé comme pédagogique | calcul · [Stojanovic — modèle de bruit (MIT)](https://www.mit.edu/~millitsa/resources/pdfs/bwdx.pdf) · DOI [10.1121/1.1909155](https://doi.org/10.1121/1.1909155) |
| K33.6 | Exemple DOSITS à 8 kHz et 10 km : 220 − 170 + 25 − (73 − 20) = 22 dB | ✅ | Recalculé : 22 dB | calcul · [DOSITS — Active sonar example](https://dosits.org/science/advanced-topics/sonar-equation/sonar-equation-example-active-sonar/) |
| K33.7 | Cri de chauve-souris de 130 dB SPL à 10 cm, soit ≈ 110 dB ramené à 1 m | ✅ | Dans la fourchette publiée : onze espèces insectivores mesurées en liberté au Panamá, à 10 cm, crient entre 122 et 134 dB SPL (espèces de lisière et de plein air) ; plus de 140 dB chez les *Noctilio*, qui chassent au-dessus de l'eau (Surlykke et Kalko 2008, source ajoutée aux Appuis de la clé). Conversion de 20 dB (10 cm → 1 m) recalculée | calcul · DOI [10.1371/journal.pone.0002036](https://doi.org/10.1371/journal.pone.0002036) |
| K33.8 | Absorption de l'air à 40 kHz ≈ 1,2 dB/m | ✅ | ISO 9613-1 recalculé à 20 °C : 1,25 dB/m (40 % HR), 1,32 (50 %), 1,23 (80 %), mais 0,78 (20 %). La clé précise désormais cette dépendance à l'humidité et cite Bass et al. (1995) dans ses Appuis | calcul · DOI [10.1121/1.412989](https://doi.org/10.1121/1.412989) |
| K33.9 | Papillon à 5 m : TL ≈ 20 dB ; il entend 90 dB SPL, l'écho revient à 24 dB (TS ≈ −46 dB, ka ≈ 7) : 66 dB d'écart | ⚠️ | Recalculé : 19,98 ; 90,0 ; 24,0 ; TS −46,0 ; ka 7,3 ; écart 66,0 dB. Insecte assimilé à une sphère rigide à ka limite, hypothèse énoncée | calcul · [Cours « Target Strength »](https://www.sonar-info.info/p278/TS.pdf) |

### F34 — Doppler — une convention de signes, le vent et les échos pulsés

**Place :** chapitre Doppler, après l'animation mentale de la sirène dont chaque cercle naît là où elle était · [lire la clé](../provoxys/son/index.html#cle-f34)
**Comptes :** 9 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K34.1 | Sirène à 440 Hz passant à 30 m/s : environ 482,2 Hz en approche lointaine, 460,1 Hz à 60°, 404,6 Hz en éloignement | ✅ | 440 × 343/313 = 482,17 Hz ; 440 × 343/328 = 460,12 Hz ; 440 × 343/373 = 404,61 Hz (recalculé) | calcul · [OpenStax § 17.4](https://courses.lumenlearning.com/suny-physics/chapter/17-4-doppler-effect-and-sonic-booms/) |
| K34.2 | À 30 m/s de rapprochement : source mobile 482,2 Hz, auditeur mobile 478,5 Hz ; le milieu rompt la symétrie | ✅ | 440 × 373/343 = 478,48 Hz (recalculé) ; asymétrie source/observateur décrite par la source | calcul · [Penn State, D. Russell — Doppler](https://www.acs.psu.edu/drussell/Demos/doppler/doppler.html) |
| K34.3 | Le 440 Hz émis au plus près (20 m) arrive 0,058 s plus tard, la sirène ayant avancé d'environ 1,75 m | ✅ | 20/343 = 0,0583 s ; 30 × 0,0583 = 1,749 m (recalculé) | calcul |
| K34.4 | Voiture à 30 m/s, vent de 10 m/s dans le même sens : 480,9 Hz par les deux voies ; vent compté deux fois : 479,6 Hz | ✅ | 440 × 353/323 = 480,87 Hz ; 440 × 363/333 = 479,64 Hz (recalculé) ; vitesses à prendre par rapport au milieu | calcul · [OpenStax § 17.4](https://courses.lumenlearning.com/suny-physics/chapter/17-4-doppler-effect-and-sonic-booms/) |
| K34.5 | Sirène et auditeur fixes dans un vent uniforme : aucun décalage, seul le temps de trajet change (686 m en 1,94 s au lieu de 2,00 s) | ✅ | 686/353 = 1,943 s ; 686/343 = 2,000 s (recalculé) ; la source indique l'absence de Doppler entre deux personnes immobiles dans le vent | calcul · [OpenStax § 17.4](https://courses.lumenlearning.com/suny-physics/chapter/17-4-doppler-effect-and-sonic-booms/) |
| K34.6 | Vers Mach 1 la formule diverge ; au-delà, les fronts s'accumulent en ondes de choc, bang entendu au sol tout le long de la trajectoire | ✅ | Accumulation des fronts et cône de Mach ; bang continu, pas un « mur » franchi une fois | [Penn State, D. Russell — Doppler](https://www.acs.psu.edu/drussell/Demos/doppler/doppler.html) · [NASA — X-59, bang sonique](https://www.nasa.gov/blogs/quesst/2026/08/10/nasa-x-59-explainer-science-of-sonic-booms/) |
| K34.7 | Doppler pulsé, 5 MHz, PRF 5 kHz : v_max ≈ 0,385 m/s ; un sang à 0,60 m/s (3 896 Hz) se replie à −1 104 Hz, lu −0,17 m/s | ✅ | 1 540 × 5 000/(4 × 5×10⁶) = 0,385 m/s ; Δf = 3 896,1 Hz ; 3 896 − 5 000 = −1 104 Hz ⇒ −0,170 m/s (recalculé) ; limite de Nyquist = PRF/2 | calcul · [Radiopaedia — Nyquist limit](https://radiopaedia.org/articles/nyquist-limit) |
| K34.8 | Profondeur maximale c/(2 PRF) ≈ 15,4 cm à 5 kHz ; pour 6 cm, PRF ≈ 12,8 kHz et v_max ≈ 1 m/s | ✅ | 1 540/10 000 = 0,154 m ; 1 540/0,12 = 12 833 Hz ; v_max = 0,988 m/s (recalculé) ; dépendance à la profondeur citée par la source | calcul · [Radiopaedia — Nyquist limit](https://radiopaedia.org/articles/nyquist-limit) |
| K34.9 | Angle réel 55° au lieu de 60° : vitesse surestimée d'environ 15 % ; 65° : sous-estimée d'environ 15 % | ✅ | cos 55°/cos 60° = 1,147 ; cos 65°/cos 60° = 0,845, soit −15,5 % (recalculé) | calcul |

### F35 — L'oreille moyenne transforme, la cochlée amplifie

**Place :** chapitre de l'oreille, après le trajet oreille externe → tympan → osselets · [lire la clé](../provoxys/son/index.html#cle-f35)
**Comptes :** 8 ✅ · 1 ⚠️ · 1 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K35.1 | Interface plane air/eau en incidence normale : environ 0,1 % de la puissance transmise (τ ≈ 1,1×10⁻³, −29,5 dB) | ✅ | 4 × 413 × 1,48×10⁶/(413 + 1,48×10⁶)² = 1,116×10⁻³, soit −29,52 dB (recalculé) ; la clé précise que ce n'est pas un modèle de la cochlée | calcul (formule de transmission en incidence normale, voir clé F05) |
| K35.2 | Gain de pression vestibule/conduit d'environ 20 dB (×10) entre 0,5 et 2 kHz, mesuré sur os temporaux de cadavres | ✅ | Résumé de l'article : 20 dB de 500 Hz à 2 kHz, sur quatre oreilles | DOI [10.1121/1.418563](https://doi.org/10.1121/1.418563) |
| K35.3 | Maximum moyen de 23,5 dB (×15) vers 1,2 kHz ; pentes d'environ ±6 dB par octave | ✅ | Résumé : 23,5 dB à 1,2 kHz, +6 dB/octave de 0,1 à 1,2 kHz, −6 dB/octave au-delà (12 os temporaux frais) ; 10^(23,5/20) = 14,96 | DOI [10.1016/s0378-5955(00)00240-9](https://doi.org/10.1016/s0378-5955%2800%2900240-9) |
| K35.4 | Le gain réel varie avec la fréquence, d'environ 26 dB à presque rien ; le transformateur idéal ne prédit pas cette dépendance | ✅ | Gain normal variant de 26 à 0 dB selon la bande | DOI [10.1007/s10162-025-00997-y](https://doi.org/10.1007/s10162-025-00997-y) |
| K35.5 | 60 dB SPL à 1 kHz (0,020 Pa) donnent environ 0,25 Pa dans le vestibule, avec un gain estimé à ≈ 22 dB à 1 kHz (maximum de 23,5 dB vers 1,2 kHz) | ⚠️ | **Corrigé dans la clé (sept. 2026)** : la clé appliquait à 1 kHz le maximum de 23,5 dB (×15, 0,30 Pa). Le résumé d’Aibara et coll. ne chiffre que le maximum (1,2 kHz) et les pentes (±6 dB/octave) : 23,5 − 6 log₂ 1,2 = 21,9 dB, soit ≈ 22 dB (×12,6) et 0,020 × 12,6 = 0,25 Pa ; la courbe, arrondie près du pic, peut donner jusqu’à 23 dB (×14, 0,28 Pa). La clé présente la valeur comme une estimation ; la figure marque les deux points (23,5 dB à 1,2 kHz, ≈ 22 dB à 1 kHz). Nakajima et coll. (2009) trouvent un maximum d’environ 20 dB près de 1 kHz sur six os | calcul · DOI [10.1016/s0378-5955(00)00240-9](https://doi.org/10.1016/s0378-5955%2800%2900240-9) · DOI [10.1007/s10162-008-0150-y](https://doi.org/10.1007/s10162-008-0150-y) |
| K35.6 | Platine à 0,33 mm/s par pascal à 1 kHz : 6,6 µm/s, déplacement ≈ 1,0 nm ; particules d'air à 60 dB : ≈ 7,7 nm | ✅ | 0,020 × 0,33 mm/s = 6,6 µm/s ; ÷ 2π×1 000 = 1,05 nm ; 0,020/(413 × 2π × 1 000) = 7,71 nm (recalculé) ; 0,33 mm·s⁻¹/Pa à 1,0 kHz dans le résumé | calcul · DOI [10.1016/s0378-5955(00)00240-9](https://doi.org/10.1016/s0378-5955%2800%2900240-9) |
| K35.7 | Impédance d'entrée cochléaire ≈ 21,1×10⁹ Pa·s/m³, presque résistive ; puissance entrante ≈ 3×10⁻¹² W, soit une onde de 60 dB sur ≈ 3 mm² | ✅ | Résumé : module plat à 21,1 GΩ acoustiques de 0,1 à 5 kHz, phase proche de 0° de 0,5 à 5 kHz ; 0,25²/21,1×10⁹ = 2,96×10⁻¹² W ; 60 dB ⇒ 9,69×10⁻⁷ W/m² ⇒ 3,1 mm² (recalculé après la correction de K35.5 ; la clé donnait 4×10⁻¹² W et 4 mm² avec 0,30 Pa) | calcul · DOI [10.1016/s0378-5955(00)00240-9](https://doi.org/10.1016/s0378-5955%2800%2900240-9) |
| K35.8 | La pression dans le vestibule est la grandeur la plus proche d'une constante au seuil d'audition (petit nombre d'oreilles) | ✅ | Résumé : parmi pression, puissance et mouvement de l'étrier, la pression vestibulaire est la plus constante au seuil | DOI [10.1121/1.418563](https://doi.org/10.1121/1.418563) |
| K35.9 | Cellules ciliées externes et prestine apportent une amplification active ; son efficacité aux plus hautes fréquences reste discutée | 🔶 | Électromotilité établie chez les mammifères ; limite en fréquence débattue, comme la clé l'indique | DOI [10.1152/physrev.00044.2006](https://doi.org/10.1152/physrev.00044.2006) |
| K35.10 | Conduction osseuse : l'inertie des liquides cochléaires est la contribution principale, à côté des osselets et du conduit | ✅ | Cinq contributions décrites, l'inertie des liquides étant la plus importante | DOI [10.1097/01.mao.0000187236.10842.d5](https://doi.org/10.1097/01.mao.0000187236.10842.d5) |

### F36 — Des nombres à la membrane, et ce que la FFT ne peut pas inventer

**Place :** chapitre du numérique, après le compromis temps-fréquence d'un bloc de durée donnée · [lire la clé](../provoxys/son/index.html#cle-f36)
**Comptes :** 7 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K36.1 | Rendement typique d'un haut-parleur de l'ordre de 1 %, variable avec la fréquence | ✅ | Hi-fi et studio : 0,2 % à 2 % (Sengpiel) ; l'exemple de la clé (87 dB/W/m) donne 0,3 %, dans la fourchette ; sensibilité = 112 + 10 log₁₀(rendement). **Source ajoutée aux Appuis de la clé (sept. 2026)** | calcul · [Sengpiel — rendement et sensibilité](https://sengpielaudio.com/calculator-efficiency.htm) |
| K36.2 | Raies à 1 000 et 1 006 Hz, Hann : 0,1 s donne un seul lobe (b_w/T ≈ 20 Hz) ; il faut T ≳ 0,33 s ; à 0,6 s, creux d'environ −22 dB | ✅ | 2/0,1 = 20 Hz ; 2/6 = 0,333 s ; simulation à 48 kHz, 0,6 s, Hann : creux de −22,5 dB à phases nulles (−21 à −25 dB selon la phase relative) | calcul · DOI [10.1109/PROC.1978.10837](https://doi.org/10.1109/PROC.1978.10837) |
| K36.3 | Ajouter des zéros interpole le spectre sans rétrécir le lobe principal | ✅ | Le lobe principal reste celui de la fenêtre, fixé par la durée observée | [J. O. Smith — Filling the FFT Input Buffer](https://www.dsprelated.com/freebooks/sasp/Filling_FFT_Input_Buffer.html) |
| K36.4 | Hann : gain cohérent 0,5 (−6 dB), largeur équivalente de bruit 1,5 case ; premier lobe secondaire −13,3 dB (rectangulaire), −31,5 dB (Hann) | ⚠️ | Recalculé : −13,26 dB et −31,47 dB ; gain cohérent 0,4995 ; ENBW 1,501 case (N = 1 024). Contrôle d'échantillon : la table I de Harris (p. 55) arrondit au dB, **−13 et −32 dB** ; les décimales viennent du calcul, pas de la source ; gain cohérent 0,50 et ENBW 1,50 conformes | calcul · DOI [10.1109/PROC.1978.10837](https://doi.org/10.1109/PROC.1978.10837) |
| K36.5 | −20 dBFS (0,1 V), ampli 26 dB, 8 Ω : 0,5 W ; sensibilité 87 dB : 84 dB SPL à 1 m, 72 dB SPL à 4 m | ✅ | 0,1 × 20 = 2 V ; 2²/8 = 0,5 W ; 87 + 10 log 0,5 = 83,99 dB ; − 20 log 4 = 71,95 dB (recalculé), hypothèses de champ libre annoncées | calcul |
| K36.6 | 87 dB SPL (1 W, 1 m) correspond à un rendement d'environ 0,3 % en demi-espace | ✅ | 10⁻¹² × 10^8,7 × 2π = 3,15×10⁻³ W acoustiques pour 1 W (recalculé) | calcul |
| K36.7 | Rapport signal sur bruit de quantification d'une sinusoïde pleine échelle : 6,02 n + 1,76 dB | ✅ | 20 log 2 = 6,0206 ; 10 log 1,5 = 1,7609 (recalculé) ; hypothèse d'erreur uniforme annoncée | calcul |
| K36.8 | Dither triangulaire ±1 pas : puissance q²/6, total q²/4, plancher relevé d'environ 4,8 dB | ✅ | 10 log 3 = 4,77 dB (recalculé) | calcul |

### F37 — Moduler, battre, mélanger — cinq transformations à ne pas confondre

**Place :** chapitre des battements et de la perception, après le battement binaural (Oster 1973) · [lire la clé](../provoxys/son/index.html#cle-f37)
**Comptes :** 9 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K37.1 | AM : porteuse 1 000 Hz, modulation 4 Hz, m = 0,5 : raies à 996, 1 000, 1 004 Hz d'amplitudes 0,25, 1, 0,25 ; amplitude de 0,5 à 1,5 | ✅ | Identité du produit de cosinus ; m/2 = 0,25 (recalculé) | calcul |
| K37.2 | Battement 440 + 442 Hz : deux raies seulement, enveloppe de 0 à 2, deux fois par seconde, aucune raie à 2 Hz ni à 441 Hz | ✅ | cos a + cos b = 2 cos((a−b)/2) cos((a+b)/2) : réécriture, spectre inchangé (recalculé) | calcul |
| K37.3 | Le carré de ce battement contient une constante et des composantes à 2, 880, 882 et 884 Hz | ✅ | Développement de (cos a + cos b)² : 1 + ½cos 2a + ½cos 2b + cos(a−b) + cos(a+b) (recalculé) | calcul |
| K37.4 | Hétérodyne à 43 kHz : 45 kHz → 2 kHz (88 kHz filtré), 90 kHz → 47 kHz ; 41 et 45 kHz donnent la même sortie | ✅ | Différences recalculées ; la source décrit somme et différence, écoute de la différence (50 − 49 kHz = 1 kHz) | calcul · [BCT — hétérodyne](https://www.bats.org.uk/about-bats/bat-detectors-1/heterodyne) |
| K37.5 | Expansion de temps ×10 : 45 kHz → 4,5 kHz, harmonique 90 → 9 kHz, 5 ms → 50 ms ; détecteur sourd pendant la relecture | ✅ | Relecture en général dix fois plus lente, 50 kHz → 5 kHz selon la source | calcul · [BCT — expansion de temps](https://www.bats.org.uk/about-bats/bat-detectors-1/time-expansion-bat-detectors) |
| K37.6 | Division de fréquence, en général par 10, en temps réel ; moins de détails captés | ✅ | Conforme à la source | [BCT — division de fréquence](https://www.bats.org.uk/about-bats/bat-detectors-1/frequency-division-bat-detectors) |
| K37.7 | Cri descendant de 60 à 30 kHz, hétérodyne à 45 kHz : sortie de 15 kHz à 0 puis remontée à 15 kHz | ✅ | 60 − 45 = 15 ; 45 − 45 = 0 ; 45 − 30 = 15 kHz (recalculé) | calcul |
| K37.8 | Vibrato de ±6 Hz à 5,5 Hz sur un la 440 : indice de modulation ≈ 1,1 | ✅ | β = 6/5,5 = 1,09 (recalculé) | calcul |
| K37.9 | La synthèse FM est associée à Chowning | ✅ | J. M. Chowning, « The Synthesis of Complex Audio Spectra by Means of Frequency Modulation », J. Audio Eng. Soc. 21 (7), 526–534, 1973 ; pas de DOI Crossref (AES e-library 1954). **Source ajoutée aux Appuis de la clé (sept. 2026)** | [CCRMA Stanford — Chowning 1973](https://ccrma.stanford.edu/sites/default/files/user/jc/fm_synthesis_paper.pdf) · [AES e-library 1954](https://aes.org/publications/elibrary-page/?id=1954) · DOI non trouvé |

### F38 — Du mode de vibration au phonon

**Place :** chapitre des phonons, après « Limite de l'image » et la chaîne de masses et de ressorts · [lire la clé](../provoxys/son/index.html#cle-f38)
**Comptes :** 7 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K38.1 | Chaîne monoatomique : ω = 2√(κ/m) · \|sin(ka/2)\|, vitesse du son c = a√(κ/m) à grande longueur d'onde | ✅ | Relation de dispersion standard, limite linéaire | [TU Delft — Electrons and phonons in 1D](https://solidstate.quantumtinkerer.tudelft.nl/7_tight_binding/) |
| K38.2 | Chaîne diatomique : branches acoustique et optique ; branche optique à √(2κs) en k = 0, bande interdite en bord de zone | ✅ | Formule retrouvée (s = 1/m₁ + 1/m₂) | [TU Delft — Many atoms per unit cell](https://solidstate.quantumtinkerer.tudelft.nl/8_many_atoms/) · [MIT OCW 3.23, cours 8](https://ocw.mit.edu/courses/3-23-electrical-optical-and-magnetic-properties-of-materials-fall-2007/6f349951d2f95813100f1a5c119f8ca4_clean8.pdf) |
| K38.3 | Quantum d'un mode à 1 kHz ≈ 6,6×10⁻³¹ J ; agitation thermique à 300 K ≈ 4,1×10⁻²¹ J | ✅ | h × 10³ = 6,626×10⁻³¹ J ; k_B × 300 = 4,14×10⁻²¹ J (recalculé, constantes SI) | calcul |
| K38.4 | L'agitation thermique à 300 K est environ six milliards de fois plus grande que le quantum à 1 kHz (≈ 6,25×10⁹) | ⚠️ | **Corrigé dans la clé (sept. 2026)** : la clé disait « dix milliards de fois » (dans « Comprendre » et « Vérifier »). Recalculé : k_B × 300 / (h × 10³) = 4,14×10⁻²¹ / 6,626×10⁻³¹ = 6,25×10⁹, cohérent avec le tableau de la clé (≈ 6×10⁹ phonons thermiques) | calcul |
| K38.5 | 1 mJ de vibration à 1 kHz contient ≈ 1,5×10²⁷ phonons | ✅ | 10⁻³/6,626×10⁻³¹ = 1,51×10²⁷ (recalculé) | calcul |
| K38.6 | Mode à 6,175 GHz à 25 mK : hf/k_BT ≈ 11,9, occupation thermique ≈ 7×10⁻⁶ | ✅ | hf/k_BT = 11,85 ; n̄ = 7,1×10⁻⁶ (recalculé) | calcul |
| K38.7 | O'Connell et coll. (2010) : résonateur à 6,175 GHz sous 25 mK, occupation < 0,07 (état fondamental > 93 %), phonons créés un par un | ✅ | Refroidissement à l'état fondamental par cryogénie classique et création contrôlée de phonons uniques (résumé et corps de l'article) | DOI [10.1038/nature08967](https://doi.org/10.1038/nature08967) |
| K38.8 | Niveaux (n + ½)hf, énergie ħω/2 au fondamental, occupation de Bose–Einstein | ✅ | Modèle de l'oscillateur quantique | [TU Delft — modèle d'Einstein](https://solidstate.quantumtinkerer.tudelft.nl/1_einstein_model/) |

### F39 — Étoiles, fluide primordial, plasmas — trois rappels différents

**Place :** chapitre des sons de l'espace, après la classification des familles d'ondes (ultrasons animaux en famille A) · [lire la clé](../provoxys/son/index.html#cle-f39)
**Comptes :** 6 ✅ · 3 ⚠️ · 1 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K39.1 | Dans une étoile, c_s² = Γ₁P/ρ ; Γ₁ ≈ 5/3 pour un gaz ionisé idéal, plus bas dans les zones d'ionisation (signature de l'hélium) | ✅ | Conforme à la revue citée | DOI [10.1007/s41116-020-00028-3](https://doi.org/10.1007/s41116-020-00028-3) · [arXiv 2007.06488](https://arxiv.org/abs/2007.06488) |
| K39.2 | Prendre 1,4 au lieu de 5/3 sous-estime la célérité d'un facteur ≈ 0,92, soit ≈ 8 % | ✅ | √(1,4/1,667) = 0,9165 (recalculé) | calcul |
| K39.3 | Δν ≈ 135 µHz donne ∫dr/c_s ≈ 3 700 s et une vitesse moyenne ≈ 190 km/s de la surface au centre | ✅ | 1/(2 × 135×10⁻⁶) = 3 704 s ; 696 000/3 704 = 188 km/s (recalculé) ; relation asymptotique des modes p | calcul · DOI [10.1007/s41116-020-00028-3](https://doi.org/10.1007/s41116-020-00028-3) |
| K39.4 | Modes solaires amortis, excités par la convection ; détection des modes g dans le Soleil débattue | 🔶 | Excitation stochastique établie ; modes g solaires encore discutés, comme la clé le dit | DOI [10.1007/s41116-020-00028-3](https://doi.org/10.1007/s41116-020-00028-3) |
| K39.5 | R ≈ 30 Ω_bh² (z/10³)⁻¹ ≈ 0,62 avec Ω_bh² ≈ 0,0224 et z ≈ 1 090 ; c_s ≈ 0,45 c au lieu de 0,58 c | ✅ | R = 0,617 ; 1/√(3 × 1,617) = 0,454 ; 1/√3 = 0,577 (recalculé) ; Ω_bh² = 0,0224 ± 0,0001 (Planck 2018) | calcul · DOI [10.1146/annurev.astro.40.060401.093926](https://doi.org/10.1146/annurev.astro.40.060401.093926) · DOI [10.1051/0004-6361/201833910](https://doi.org/10.1051/0004-6361/201833910) |
| K39.6 | Fréquence des oscillations du premier pic de l'ordre de 4×10⁻¹⁴ Hz (demi-période en ≈ 380 000 ans) | ⚠️ | 1/(7,6×10⁵ × 3,156×10⁷ s) = 4,2×10⁻¹⁴ Hz (recalculé) ; estimation de modèle simplifié, annoncée comme telle | calcul · [W. Hu — Baryon loading](https://background.uchicago.edu/~whu/intermediate/baryons.html) |
| K39.7 | f_pe ≈ 8,98 kHz √n_e : 20 kHz ↔ ≈ 5 cm⁻³ ; 2–3 kHz (Voyager) ↔ 0,05–0,11 cm⁻³ | ✅ | (20/8,98)² = 4,96 ; (2/8,98)² = 0,050 ; (3/8,98)² = 0,112 cm⁻³ (recalculé) | calcul · [Fitzpatrick — Langmuir](https://farside.ph.utexas.edu/teaching/plasma/lectures/node90.html) |
| K39.8 | Électrons à 10 eV (≈ 116 000 K), protons nettement plus froids (1 eV, T_e = 10 T_i) : c_ia ≈ 31 km/s ; λ = 1 km ⇒ ≈ 31 Hz | ⚠️ | Calcul juste : 30,9 km/s, 116 045 K, 31 Hz (recalculé). **Corrigé dans la clé (sept. 2026)** : l'exemple disait « protons et électrons à 10 eV » (T_e = T_i, régime où l'onde est fortement amortie selon la note de la clé) ; il pose désormais T_e = 10 T_i et signale que le terme ionique négligé relèverait la vitesse de 5 à 15 % (√(11/10) = 1,049 à √(13/10) = 1,140 ; 32 à 35 km/s) | calcul · [Fitzpatrick — ondes ion-acoustiques](https://farside.ph.utexas.edu/teaching/plasma/lectures1/node93.html) |
| K39.9 | Langmuir : ω² ≈ ω_pe²(1 + 3k²λ_D²) ; amortissement de Landau fort quand la longueur d'onde approche λ_D | ✅ | Conforme à la source | [Fitzpatrick — Langmuir](https://farside.ph.utexas.edu/teaching/plasma/lectures/node90.html) |
| K39.10 | Les modes p (ordre du mHz) doivent être transposés d'au moins treize octaves environ pour être joués (3 mHz × 2¹³ ≈ 25 Hz) | ⚠️ | **Corrigé dans la clé (sept. 2026)** : la clé disait « au moins une quinzaine d'octaves ». Recalculé : log₂(20 Hz / 3 mHz) = 12,7 octaves pour le pic à 3 mHz (14,3 pour 1 mHz, 12,0 pour 5 mHz) ; 3 mHz × 2¹³ = 24,6 Hz | calcul |

### F40 — Une observation, son modèle et son incertitude

**Place :** chapitre des expériences et ateliers, après « Aucune durée. Chaque expérience est un plateau possible » · [lire la clé](../provoxys/son/index.html#cle-f40)
**Comptes :** 8 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K40.1 | Mur à 17,0 ± 0,1 m, délai 100,0 ± 1,0 ms : c = 340 m/s, incertitude relative ≈ 1,2 %, soit ± 3,9 m/s | ✅ | 34/0,100 = 340 m/s ; √((0,1/17)² + 0,01²) = 1,16 % ⇒ ± 3,94 m/s (recalculé) ; composition quadratique du GUM | calcul · [BIPM, JCGM — publications](https://www.bipm.org/en/committees/jc/jcgm/publications) |
| K40.2 | Un enregistrement à 48 kHz date chaque échantillon à 21 µs près | ✅ | 1/48 000 = 20,8 µs (recalculé) | calcul |
| K40.3 | Avec c ∝ √T et 343,2 m/s à 20 °C, la célérité vaut ≈ 337,3 m/s à 10 °C, soit 6 m/s d'écart | ✅ | 343,2 × √(283,15/293,15) = 337,3 m/s (recalculé) | calcul |
| K40.4 | Source et micro écartés de 2 m à 17 m du mur : trajet 34,06 m, biais de 0,17 % (≈ 0,6 m/s) | ✅ | 2√(17² + 1²) = 34,059 m ; biais 0,173 % (recalculé) | calcul |
| K40.5 | Schéma centré 1D à cΔt = Δx/2 : vitesse numérique 0,9876 c (10 points/λ) et 0,9969 c (20 points/λ) ; retards ≈ 1,2 et 0,3 λ après 100 λ | ✅ | 0,98759 et 0,99691 ; retards 1,26 λ et 0,31 λ (recalculés à partir de la relation de dispersion) | calcul · [Schneider — FDTD, chap. 7](https://eecs.wsu.edu/~schneidj/ufdtd/chap7.pdf) |
| K40.6 | Doubler la résolution divise l'erreur de vitesse par quatre (schéma du second ordre) | ✅ | 1,241/0,309 = 4,0 (recalculé) | calcul · [Schneider — FDTD, chap. 7](https://eecs.wsu.edu/~schneidj/ufdtd/chap7.pdf) |
| K40.7 | Incertitude-type, biais et règles de composition sont définis par le GUM (JCGM 100:2008) et le VIM (JCGM 200:2012) | ✅ | Références et numéros conformes à la page du BIPM | [BIPM, JCGM — publications](https://www.bipm.org/en/committees/jc/jcgm/publications) |
| K40.8 | Une animation montre ce que prévoient les équations, un film ce qui s'est réellement passé | ✅ | Idée exposée par les auteurs de Physclips | [UNSW Physclips — What is Physclips?](https://animations.physics.unsw.edu.au/jw/what_is_physclips.html) |

### F41 — Comment fabrique-t-on un son ?

**Place :** chapitre musique, après les cordes frottées et le mouvement imposé par l'archet (Helmholtz) · [lire la clé](../provoxys/son/index.html#cle-f41)
**Comptes :** 9 ✅ · 0 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K41.1 | Mi aigu de guitare (329,63 Hz, 0,65 m, acier Ø 0,254 mm) : μ ≈ 3,98×10⁻⁴ kg/m, v ≈ 428,5 m/s, tension ≈ 73 N (≈ 7,4 kg) | ✅ | 3,978×10⁻⁴ kg/m ; 428,52 m/s ; 73,0 N ; 7,45 kg (recalculé) | calcul |
| K41.2 | Monter d'une octave demande de quadrupler la tension ou de diviser la longueur par deux | ✅ | f ∝ √T/L (recalculé) | calcul |
| K41.3 | Haut-parleur à ≈ 1 % : 0,99 W en chaleur ; 0,01 W en demi-espace donnent 1,6×10⁻³ W/m² et ≈ 92 dB à 1 m | ✅ | 0,01/2π = 1,59×10⁻³ W/m² ; 92,0 dB (recalculé), cohérent avec la relation sensibilité = 112 + 10 log₁₀(0,01) = 92 dB. Rendement de 1 % dans la fourchette hi-fi de 0,2 à 2 %. **Source ajoutée aux Appuis de la clé (sept. 2026)** | calcul · [Sengpiel — rendement et sensibilité](https://sengpielaudio.com/calculator-efficiency.htm) |
| K41.4 | Corde seule à 330 Hz : λ ≈ 1,04 m, ka ≈ 7,7×10⁻⁴ ; elle rayonne mal, d'où la table | ✅ | 343/330 = 1,039 m ; 2π × 0,127 mm/1,039 m = 7,68×10⁻⁴ (recalculé) ; la source décrit le faible transfert de puissance d'une corde seule | calcul · [UNSW, J. Wolfe — Musical instruments](https://newt.phys.unsw.edu.au/jw/musical-sounds-musical-instruments.html) |
| K41.5 | Do grave de la flûte (261,6 Hz) : λ ≈ 1,31 m, longueur acoustique ≈ 0,66 m | ✅ | 343/261,63 = 1,311 m ; demi-onde 0,656 m (recalculé) ; la source indique une longueur d'onde double de la flûte | calcul · [UNSW, J. Wolfe — Flute acoustics](https://newt.phys.unsw.edu.au/jw/fluteacoustics.html) |
| K41.6 | Le jet du flûtiste est continu ; l'onde du tuyau le fait basculer en phase pour entretenir l'oscillation | ✅ | Conforme à la source | [UNSW, J. Wolfe — Flute acoustics](https://newt.phys.unsw.edu.au/jw/fluteacoustics.html) |
| K41.7 | Corde frottée : cycle adhérence–glissement, coude qui parcourt la corde (mouvement de Helmholtz) | ✅ | Conforme à la source | [UNSW, J. Wolfe — Bows and strings](https://newt.phys.unsw.edu.au/jw/Bows.html) |
| K41.8 | Membrane circulaire idéale : premiers modes à 1 ; 1,593 ; 2,135 ; 2,295 fois le fondamental | ✅ | Zéros de Bessel : 1 ; 1,593 ; 2,136 ; 2,295 (recalculé, 2,1355 arrondi) ; valeurs affichées par la source | calcul · [Penn State, D. Russell — membrane circulaire](https://www.acs.psu.edu/drussell/Demos/MembraneCircle/Circle.html) |
| K41.9 | Corde idéale pincée au cinquième de sa longueur : ni 5ᵉ ni 10ᵉ harmonique | ✅ | sin(nπ/5) = 0 pour n multiple de 5 (recalculé, excitation ponctuelle) | calcul |

### F41b — D'où vient un son : la chaîne complète

**Place :** chapitre de physique de base, après la définition « un son est une perturbation mécanique qui se propage dans un milieu matériel » · [lire la clé](../provoxys/son/index.html#cle-f41b)
**Comptes :** 3 ✅ · 1 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| K41b.1 | Tout son suit une chaîne énergie → excitation → vibration → couplage → onde → réception, avec des pertes à chaque étape | ✅ | Synthèse cohérente avec la source (apport d'énergie, résonateur, rayonnement) | [UNSW, J. Wolfe — Musical instruments](https://newt.phys.unsw.edu.au/jw/musical-sounds-musical-instruments.html) |
| K41b.2 | Une caisse de résonance aide l'énergie à passer dans l'air sans en fabriquer ; une corde seule transmet peu de puissance | ✅ | Rôle d'adaptation d'impédance des corps d'instruments décrit par la source | [UNSW, J. Wolfe — Musical instruments](https://newt.phys.unsw.edu.au/jw/musical-sounds-musical-instruments.html) |
| K41b.3 | Pour les sources entretenues, un apport continu devient une oscillation, sans une bouffée par période | ✅ | Conversion d'un apport continu en oscillation décrite par la source | [UNSW, J. Wolfe — Musical instruments](https://newt.phys.unsw.edu.au/jw/musical-sounds-musical-instruments.html) |
| K41b.4 | Dans un claquement de mains, la perturbation vient surtout de l'air comprimé puis chassé entre les paumes, dont la cavité résonne un instant (Helmholtz) avant d'être amortie par les tissus ; impulsion sans note stable | ⚠️ | **Précisé dans la clé (sept. 2026)** : la résonance de la cavité des paumes, qui colore brièvement l'impulsion, est ajoutée. Fu et al. (2025) : fréquence du clap prédite par un résonateur de Helmholtz, excitation par l'écoulement d'air, amortissement rapide par les tissus mous, collision des peaux secondaire. Source ajoutée aux Appuis | DOI [10.1103/PhysRevResearch.7.013259](https://doi.org/10.1103/PhysRevResearch.7.013259) · [Cornell Chronicle, mars 2025](https://news.cornell.edu/stories/2025/03/dynamic-acoustics-hand-clapping-elucidated) |

## Glossaire complémentaire (audit de complétude, sept. 2026)

**Place :** glossaire de la page ; le fichier `complements/glossaire.md` ajoute ou remplace 73 définitions. Quinze portent un chiffre, une loi ou une attribution et sont vérifiées ici ; les autres sont des définitions sans valeur à contrôler.
**Lien :** [lire le glossaire](../provoxys/son/index.html#glossaire)
**Comptes :** 11 ✅ · 4 ⚠️ · 0 🔶 · 0 ❌

| # | Affirmation | Verdict | Valeur de référence / nuance | Sources |
|---|---|---|---|---|
| G.1 | Compression / raréfaction, linéarisation : à 94 dB SPL la raréfaction retire au plus 1,4 Pa aux 101 325 Pa ; à 120 dB, p = 20 Pa, soit 0,02 % de P₀ | ✅ | 20 µPa × 10^(94/20) = 1,002 Pa efficace, crête √2 × 1,002 = 1,42 Pa ; 20 µPa × 10^6 = 20,0 Pa = 0,0197 % de 101 325 Pa (recalculé) | calcul · [ISO 1683:2015, extrait](https://cdn.standards.iteh.ai/samples/64648/cfb8cf9ac504466aafc2683db4c3b782/ISO-1683-2015.pdf) (clé F28) · [Rienstra & Hirschberg — An Introduction to Acoustics](https://sjoerdr.win.tue.nl/papers/boek.pdf) (clé F01) |
| G.2 | Vitesse particulaire : 1 Pa efficace ⇒ u ≈ 2,4 mm/s ; à 1 kHz, en onde plane, déplacement efficace d'environ 8 pm au seuil à environ 0,4 µm à 94 dB (en crête : 11 pm et 0,55 µm) | ⚠️ | u = 1/413 = 2,42 mm/s. ξ = p/(ρ₀c·ω) : 7,7 pm efficace (10,9 pm crête) à 0 dB ; 0,39 µm efficace (0,55 µm crête) à 94 dB (recalculé). **Corrigé dans le glossaire (sept. 2026)** : l'entrée « ξ, u, c » comparait une crête (« une dizaine de picomètres ») à une valeur efficace (0,4 µm) ; les deux bornes sont désormais efficaces, les crêtes données à part | calcul · [UNSW Physclips — impédance et intensité](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) (clé F01) |
| G.3 | Milieu continu : libre parcours moyen d'environ 70 nm dans l'air au sol ; le modèle cesse de valoir vers le gigahertz | ⚠️ | Valeur usuelle de la théorie cinétique : 66 à 68 nm (Jennings 1988 ; 67,3 nm à 300 K et 1 atm). Des simulations de dynamique moléculaire (2023–2024) proposent 38,5 nm, valeur discutée. À 1 GHz, λ = 343 nm, soit 5 à 9 fois le libre parcours : la conclusion tient dans les deux cas | DOI [10.1016/0021-8502(88)90219-4](https://doi.org/10.1016/0021-8502%2888%2990219-4) · DOI [10.5194/ar-3-231-2025](https://doi.org/10.5194/ar-3-231-2025) · calcul |
| G.4 | Adiabatique : γ ≈ 1,40 pour l'air ; l'hypothèse isotherme de Newton donne une célérité trop faible d'environ 16 % | ✅ | c_iso = c/√γ = 343,2/√1,4 = 290 m/s, écart 1 − 1/√1,4 = 15,5 % (recalculé). La valeur publiée par Newton (≈ 298 m/s) était trop basse d'environ 13–15 %, ses données d'entrée différant | calcul · [Princeton (K. McDonald) — Speed of sound and specific heats, Lab 8](http://kirkmcd.princeton.edu/examples/ph103_2010/Lab_8.pdf) · [UNSW Physclips — l'équation d'onde](https://animations.physics.unsw.edu.au/jw/sound-wave-equation.htm) (clé F03) |
| G.5 | Impédance caractéristique ≈ 413 rayls (air, 20 °C) et 1,5 × 10⁶ (eau) ; c = 343 et 1 480 m/s ; ρ₀ ≈ 1,2 et 1 000 kg/m³ | ✅ | ρ₀ = 1,204 kg/m³ et c = 343,2 m/s à 20 °C ⇒ 413 rayls ; 1 000 × 1 480 = 1,48 × 10⁶ rayls (recalculé) | calcul · [UNSW Physclips — impédance et intensité](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) (clés F01, F05) · [MIT OCW 2.682, cours 2](https://ocw.mit.edu/courses/2-682-acoustical-oceanography-spring-2012/58540cfbbdd42be15697f7a1523f343b_MIT2_682S12_bglec02.pdf) (clé F05) |
| G.6 | Directivité : un haut-parleur de 10 cm est presque omnidirectionnel à 200 Hz (λ ≈ 1,7 m) et directif à 10 kHz (λ ≈ 3,4 cm) | ✅ | λ = 1,715 m et 3,43 cm ; ka = 0,18 à 200 Hz et 9,2 à 10 kHz pour un rayon de 5 cm (recalculé) : régime ka ≪ 1 contre ka ≫ 1 | calcul · [Penn State (D. Russell) — Baffled piston](https://www.acs.psu.edu/drussell/Demos/BaffledPiston/BaffledPiston.html) (clé F12) |
| G.7 | Transmission : loi de masse, environ +6 dB par doublement de la masse surfacique ou de la fréquence | ✅ | R = 20 log₁₀(π f m″/ρ₀c) ⇒ +20 log₁₀ 2 = +6,02 dB par doublement (recalculé) ; paroi simple, sous la fréquence de coïncidence | calcul · formule de la [clé sur la transmission par les parois](../provoxys/son/index.html#cle-f19) |
| G.8 | Premières réflexions : repère de 50 ms pour la clarté de la parole, 80 ms pour la musique | ✅ | C₅₀ et C₈₀ de l'ISO 3382-1 (annexe A) : rapport d'énergie avant et après 50 ms (parole) ou 80 ms (musique) | [ISO 3382-1:2009, extrait](https://cdn.standards.iteh.ai/samples/40979/b0e9f87f3d9f4df6b18f767e3439bfb6/ISO-3382-1-2009.pdf) (clé F21 ; l'extrait public ne montre que le sommaire de l'annexe A) · DOI [10.3389/fpsyg.2020.00344](https://doi.org/10.3389/fpsyg.2020.00344) |
| G.9 | Distance critique ≈ 0,057 √(V/T₆₀) : de l'ordre d'un mètre pour une classe de 200 m³ à T₆₀ = 0,6 s | ✅ | √(0,161/16π) = 0,0566 ; 0,057 × √(200/0,6) = 1,04 m (recalculé) ; source omnidirectionnelle, champ diffus | calcul · [Arup (Strutt) — Critical distance](https://strutt.arup.com/help/Electroacoustics/DCritical.htm) (clé F21) |
| G.10 | Niveau de référence : 120 dB re 1 µPa et 94 dB re 20 µPa désignent la même pression, 1 Pa ; un calibreur délivre 94 dB SPL, soit 1 Pa, à 1 kHz | ✅ | 20 log₁₀(20) = 26,02 dB entre les deux références ; 20 µPa × 10^(94/20) = 1,002 Pa (recalculé) | calcul · [ISO 1683:2015, extrait](https://cdn.standards.iteh.ai/samples/64648/cfb8cf9ac504466aafc2683db4c3b782/ISO-1683-2015.pdf) (clé F28) · [Brüel & Kjær — Measurement microphones](https://www.bksv.com/de/knowledge/blog/sound/measurement-microphones) (clé F30) |
| G.11 | Décibel : 0 dB SPL correspond à peu près au seuil d'audition vers 1 kHz ; +10 dB donnent environ « deux fois plus fort » | ⚠️ | 20 µPa ≈ limite de sensibilité de l'oreille dans sa zone sensible ; +10 dB ≈ doublement de la sonie au-dessus d'environ 40 phones seulement. Le glossaire le présente bien comme ordre de grandeur | [UNSW Physclips — décibels](https://animations.physics.unsw.edu.au/jw/dB.htm) (clé F06) |
| G.12 | Rapport signal sur bruit : la quantification en donne environ 6 dB par bit | ✅ | 20 log₁₀ 2 = 6,02 dB par bit ; SNR = 6,02 n + 1,76 dB pour un sinus pleine échelle (recalculé ; 16 bits ⇒ 98,1 dB) | calcul · [Iowa State EE 435, cours 33 — bruit de quantification](http://class.ece.iastate.edu/ee435/lectures/EE%20435%20Lect%2033%20Spring%202019.pdf) · dérivation de la [clé F36](../provoxys/son/index.html#cle-f36) |
| G.13 | Portée non ambiguë d_max = c/(2 f_rép) : environ 15 cm pour un échographe à 5 000 impulsions par seconde | ✅ | 1 540/(2 × 5 000) = 0,154 m (recalculé ; 0,150 m avec 1 500 m/s) | calcul · [Radiopaedia — Pulse repetition frequency](https://radiopaedia.org/articles/pulse-repetition-frequency) (clé F31) |
| G.14 | Sonification : Persée remonté de 57 ou 58 octaves ; fond diffus cosmologique d'environ 50 octaves | ⚠️ | Persée : 57 et 58 octaves, facteurs 2⁵⁷ ≈ 1,44 × 10¹⁷ et 2⁵⁸ ≈ 2,88 × 10¹⁷ (Chandra 2022) ✅. CMB : de 10⁻¹² à 10⁻¹³ Hz jusqu'à 440 Hz, 48,6 à 52,0 octaves (recalculé) ; chiffre qui dépend du modèle et de l'époque choisis | [Chandra — sonifications 2022](https://chandra.harvard.edu/photo/2022/sonify5/) · calcul |
| G.15 | Dans le fluide primordial, c_s vaut au plus c/√3, environ 58 % de la vitesse de la lumière | ✅ | 1/√3 = 0,577 (recalculé) pour un fluide de rayonnement pur ; avec la charge des baryons (R ≈ 0,62), c_s ≈ 0,45 c (clé F39) | calcul · [W. Hu — Baryon loading](https://background.uchicago.edu/~whu/intermediate/baryons.html) (clé F39) |

**Écarts relevés (sans erreur) :** G.2 comparait une crête (≈ 11 pm au seuil) à une valeur efficace (0,39 µm à 94 dB) — corrigé le 24 septembre 2026 : les deux bornes sont données en efficace (8 pm, 0,4 µm), les crêtes à part ; G.3 retient la valeur classique du libre parcours moyen, contestée depuis 2023 par des simulations moléculaires (38,5 nm), sans conséquence sur la conclusion.

## Corrections complémentaires C02–C15 (audit de complétude, sept. 2026)

**Origine :** §13 de l'audit de complétude physique (`provoxys/son/audit-completude-physique.md`, « Registre des corrections précises »). Dix corrections de texte ont été appliquées au script le 24 septembre 2026 (C02, C03, C04, C07, C08, C11–C15) ; leurs sources sont listées dans la section « Sources des corrections complémentaires » du script. Les autres lignes du registre (C01, C05, C06, C09, C10) portent sur les textes d'ateliers interactifs et relèvent de leur revue ; elles ne sont pas reprises ici. Chaque source ci-dessous a été rouverte le 24 septembre 2026 et les valeurs recalculées en Python (formule d'Ainslie et McColm, maximum de la courbe de Sethares, octaves de la sonification du fond diffus).

**Comptes :** 10 corrections appliquées (formulations trop larges, contradictoires ou trompeuses, remplacées) ; le texte corrigé est vérifié ✅ pour les 10 ; aucune erreur ne subsiste.

| # | Avant (repère du §13) | Après (texte appliqué) | Vérification | Sources |
|---|---|---|---|---|
| C02 | Résonance : la réponse maximale est assimilée à la fréquence propre (« répond fort si on l'excite **à** cette fréquence ») | Réponse forte **près** d'une fréquence propre ; position et largeur du pic dépendent de l'amortissement et de la grandeur observée : le déplacement culmine un peu sous la fréquence propre, la vitesse exactement à celle-ci | ✅ oscillateur amorti forcé : pic d'amplitude à ω₀√(1 − 2ζ²), pic de vitesse à ω₀ | [HyperPhysics — oscillateur forcé](http://hyperphysics.phy-astr.gsu.edu/hbase/oscdr.html) |
| C03 | Sources non corrélées : « on additionne les intensités moyennes » | On additionne les **pressions quadratiques moyennes** p²ₑff au même point ; la formule d'addition vaut pour des niveaux Lp de même référence et de même pondération ; ce n'est pas la somme des modules d'intensités vectorielles dans un champ quelconque | ✅ propriété de la moyenne d'un produit de signaux décorrélés (termes croisés nuls) | [UNSW Physclips — décibels](https://animations.physics.unsw.edu.au/jw/dB.htm) · [UNSW — Music Acoustics FAQ (+3 ou +6 dB)](https://www.phys.unsw.edu.au/jw/musFAQ.html) · clé F06 |
| C04 | Absorption de l'air « négligeable dans une pièce » | Souvent faible sur un court trajet intérieur aux fréquences moyennes, elle compte aux hautes fréquences et sur les trajets cumulés de réverbération ; ajout du cas de l'eau de mer : ~0,06 dB/km à 1 kHz, ~1 dB/km à 10 kHz | ✅ Ainslie & McColm recalculé (10 °C, S = 35, pH 8, surface) : **0,061** et **0,99** dB/km | DOI [10.1121/1.421258](https://doi.org/10.1121/1.421258) · clé F16 |
| C07 | Timbale : on la tend « pour rapprocher certains modes » | Membrane idéale : la tension multiplie toutes les fréquences propres par le même facteur (f ∝ √τ) et laisse leurs rapports inchangés ; c'est surtout la **charge de l'air** qui rapproche (1,1)…(4,1) des rapports 2 : 3 : 4 : 5 | ✅ Christian et al. 1984 : effet de la masse d'air sur les modes de la timbale | DOI [10.1121/1.391449](https://doi.org/10.1121/1.391449) · clé F14 |
| C08 | Glose de la courbe de Sethares : quand f_min monte, « le pic se resserre en hertz » (contradiction avec la formule) | Quand f_min monte, s diminue : la courbe s'étale en hertz et son maximum s'éloigne (≈ 19 Hz d'écart à 100 Hz, ≈ 37 Hz à 1 kHz) ; en intervalle relatif, il passe d'environ 19 % à moins de 4 % | ✅ maximum en s·Δf = 0,2204 ; avec les coefficients de Sethares : 19,3 Hz à 100 Hz, 36,4 Hz à 1 kHz (36,7 Hz avec les coefficients arrondis de la page) ; 19,3 % et 3,6 % | [W. Sethares — code de la courbe de dissonance](https://sethares.engr.wisc.edu/comprog.html) |
| C11 | Doppler : quand v_s → c, « f′ part à l'infini », puis front de Mach | La formule idéalisée devient **singulière** : on sort de son domaine de validité, aucun son réel de fréquence infinie n'est émis ; le régime transsonique puis supersonique se décrit par des fronts et des chocs | ✅ limite de validité (petites amplitudes, source subsonique) ; reformulation sans chiffre nouveau | clés F25 et F34 |
| C12 | Vent « ajouté » aux vitesses puis à c (double comptage possible) | Un seul référentiel : vitesses relatives à l'air **ou** célérité effective c + w avec vitesses au sol ; contre-exemple : source et observateur fixes dans un vent uniforme ⇒ f′ = f | ✅ Physics Van : pas de décalage de fréquence entre deux points fixes, la longueur d'onde change | [Physics Van, université de l'Illinois — Doppler et vent](https://van.physics.illinois.edu/ask/listing/31590) · clé F34 |
| C13 | Héliosismologie : « même formule que dans l'air », c_s = √(γP/ρ) | c_s² = Γ₁P/ρ, Γ₁ = (∂ln P/∂ln ρ)_ad ; Γ₁ = 5/3 pour un gaz monoatomique entièrement ionisé (et non 1,4), abaissé dans les zones d'ionisation, ce qui mesure l'hélium de l'enveloppe | ✅ | DOI [10.1016/j.physrep.2007.12.002](https://doi.org/10.1016/j.physrep.2007.12.002) · [J. Christensen-Dalsgaard — notes de cours](https://users-phys.au.dk/jcd/oscilnotes/) · clé F39 |
| C14 | Fond diffus : les pics sont « les harmoniques de cette cavité » | Les pics angulaires conservent la signature statistique des oscillations acoustiques du fluide ; position et amplitude dépendent de son évolution (baryons, matière noire, amortissement) et de la projection géométrique ; « fondamental » et « harmoniques » = analogie nommée comme telle | ✅ | [Wayne Hu — pics acoustiques](https://background.uchicago.edu/~whu/intermediate/driving.html) · clé F39 |
| C15 | Convertir ces modes en hertz « n'a aucun sens opérationnel » | On peut définir des fréquences dans un modèle et à une époque précisés : une oscillation toutes les quelques dizaines à centaines de milliers d'années, ~10⁻¹² à 10⁻¹³ Hz, une cinquantaine d'octaves sous le la 440 ; toute sonification annonce sa transformation (Whittle : ~50 octaves, choix « arbitraire ») | ✅ période 10⁴–10⁵ ans ⇒ 47 à 50 octaves sous 440 Hz (recalculé) ; Whittle : onde typique ~50 000 ans, transposition d'environ 50 octaves dont il dit le décalage arbitraire | [M. Whittle — Big Bang Acoustics (communiqué)](https://markwhittle.uvacreate.virginia.edu/sounds/aas/press_release.pdf) · clé F39 |

## Contrôle d'échantillon indépendant (clés de physique, 24 septembre 2026)

Dix-huit affirmations chiffrées ont été **tirées au hasard** (graine fixée) parmi les 97 affirmations des clés qui reposent sur une source externe plutôt que sur un pur calcul, puis confiées à trois agents `verif-claims` (effort élevé) qui n'avaient pas participé à la rédaction : chacun a **ouvert la source** (texte intégral, PDF, résumé PubMed ou version auteur quand l'éditeur bloque) et vérifié qu'elle soutient le chiffre tel qu'il est écrit.

**Résultat : 14 ✅ · 4 ⚠️ · 0 ❌.** Aucun chiffre faux ; quatre sources ne portent qu'une partie de ce que la clé leur fait dire. Les verdicts correspondants ont été reportés dans les tableaux ci-dessus.

| # | Affirmation | Verdict | Ce que dit la source | Source ouverte |
|---|---|---|---|---|
| K01.5 | 343 m/s dans l'air sec à 20 °C | ⚠️ | 343 m/s et 1,2 kg/m³, **sans température** ; 343,2 m/s par √(γRT) | [UNSW Physclips](https://www.animations.physics.unsw.edu.au/jw/sound-impedance-intensity.htm) · [HyperPhysics](https://hyperphysics.gsu.edu/hbase/Sound/souspe.html) |
| K05.5 | z₂ = 2z₁ : r = 1/3, T = 8/9 | ✅ | Exemple 6.1 : R = 1/3, R_I = 1/9, T = 4/3, T_I = 8/9 (notes de M. Oelze, hébergées par J. T. Allen) | [Illinois ECE/TAM 373, chap. 6a](https://jontallen.ece.illinois.edu/uploads/473.F18/Lectures/Chapter_6a.pdf) |
| K10.2 | Corrections d'extrémité 0,85a côté cavité, 0,61a côté extérieur | ⚠️ | 0,85a bridé (éq. 5.43), 0,61a non bridé (éq. 5.44), 0,61a ≤ δ ≤ 0,85a (éq. 6.95), § 5.2.3.1 ; la répartition cavité/extérieur n'y figure pas | [Rienstra & Hirschberg](https://sjoerdr.win.tue.nl/papers/boek.pdf) |
| K18.7 | Eau de mer : 1 450 à 1 550 m/s | ✅ | « 1450 to 1550 metres per second in saltwater », environ 4,5 fois l'air | [Pêches et Océans Canada](https://www.dfo-mpo.gc.ca/oceans/noise-bruit/about-a-propos/index-eng.html) |
| K21.1 | T20 : −5 à −25 dB ; T30 : −5 à −35 dB | ✅ | Définition 3.5, note 2 ; dynamique de 35 et 45 dB au-dessus du bruit | [ISO 3382-1:2009, extrait](https://cdn.standards.iteh.ai/samples/40979/b0e9f87f3d9f4df6b18f767e3439bfb6/ISO-3382-1-2009.pdf) |
| K23.4 | ERB ≈ 240 Hz à 2 kHz | ✅ | 24,7 (4,37 × 2 + 1) = 240,6 Hz ; formule de Glasberg et Moore reprise par PubMed/CCRMA (article payant) | DOI [10.1016/0378-5955(90)90170-T](https://doi.org/10.1016/0378-5955%2890%2990170-T) · [CCRMA](https://ccrma.stanford.edu/~jos/bbt/Equivalent_Rectangular_Bandwidth.html) |
| K26.5 | Bulle de 1 mm : Minnaert vers 3,3 kHz | ✅ | 3 287 Hz recalculé (γ = 1,4) ; règle « f·a ≈ 3 » de Leighton et Walton 1987 | DOI [10.1080/14786443309462277](https://doi.org/10.1080/14786443309462277) · [Leighton & Walton 1987](https://resource.isvr.soton.ac.uk/staff/pubs/PubPDFs/Pub2490.pdf) |
| K27.1 | Pression de radiation I/c, force P/c (cible absorbante) | ⚠️ | Physique juste ; le résumé de Gélat et Shaw ne donne pas la formule (texte fermé) et traite de l'écart pour les faisceaux focalisés ; P = cF dans la note A*STAR | DOI [10.1016/j.ultrasmedbio.2014.09.021](https://doi.org/10.1016/j.ultrasmedbio.2014.09.021) · [A*STAR/NMC](https://oar.a-star.edu.sg/storage/o/o13no0z05y/realization-of-medical-ultrasound-power-measurement-by-radiation-force-balance-method.pdf) |
| K30.6 | Effet de proximité : plus de 20 dB (bidirectionnel très proche) | ✅ | « boosted by more than 20dB at 100Hz » pour un micro en huit à 5 cm | [Sound On Sound](https://www.soundonsound.com/techniques/proximity-effect) |
| K30.9 | Graisse ≈ 1 440 m/s contre 1 540 supposés | ✅ | IT'IS : 1 440,2 ± 21,9 m/s (16 mesures, 1 412–1 490) ; la convention des 1 540 m/s est chez Radiopaedia, pas chez IT'IS | [IT'IS](https://itis.swiss/virtual-population/tissue-properties/database/acoustic-properties/speed-of-sound) · [Radiopaedia](https://radiopaedia.org/articles/speed-displacement-artifact-1) |
| K31.7 | Profondeur non ambiguë c/(2 PRF) ≈ 15 cm à 5 kHz | ✅ | Formule R = 0,5 c/PRF ; 15,4 cm recalculé | [Radiopaedia](https://radiopaedia.org/articles/pulse-repetition-frequency) |
| K32.5 | Pas ≤ λ/2 pour un balayage complet sans lobe de réseau | ✅ | § 3.2 : « less than or equal to half of the wavelength » (λ si focalisation dans l'axe seulement) | DOI [10.1088/0031-9155/61/17/R206](https://doi.org/10.1088/0031-9155/61/17/R206) · [PMC5022373](https://pmc.ncbi.nlm.nih.gov/articles/PMC5022373/) |
| K35.3 | Gain moyen maximal 23,5 dB à 1,2 kHz, pentes ±6 dB/octave | ✅ | Résumé : 23,5 dB à 1,2 kHz, +6 dB/oct de 0,1 à 1,2 kHz, −6 dB/oct au-dessus (12 os temporaux) | [PubMed 11223285](https://pubmed.ncbi.nlm.nih.gov/11223285/) |
| K35.7 | Impédance cochléaire ≈ 21,1 GΩ, plate de 0,1 à 5 kHz, phase ≈ 0 | ✅ | « virtually flat with a value of 21.1 acoustic GOmega MKS », phase proche de 0 de 0,5 à 5 kHz | [PubMed 11223285](https://pubmed.ncbi.nlm.nih.gov/11223285/) |
| K36.4 | Lobes −13,3 / −31,5 dB ; gain 0,5 ; ENBW 1,5 case | ⚠️ | Table I (p. 55) : −13 et −32 dB (arrondis au dB), gain 0,50, ENBW 1,50 ; décimales exactes par calcul | DOI [10.1109/PROC.1978.10837](https://doi.org/10.1109/PROC.1978.10837) |
| K39.1 | Γ₁ ≈ 5/3 pour un gaz ionisé idéal | ✅ | Éq. (12) : Γ₁ ≃ 5/3 pour un gaz parfait **totalement** ionisé | [arXiv:2007.06488](https://arxiv.org/abs/2007.06488) |
| K39.9 | Langmuir : ω² ≈ ω_pe²(1 + 3k²λ_D²) | ✅ | Même relation (Bohm-Gross), pour kλ_D ≪ 1 | [R. Fitzpatrick, UT Austin](https://farside.ph.utexas.edu/teaching/plasma/lectures/node90.html) |
| K41.8 | Membrane circulaire : 1 ; 1,593 ; 2,135 ; 2,295 | ✅ | Mêmes rapports ; recalcul par les zéros de Bessel : 1,5933 ; 2,1355 ; 2,2954 | [Penn State (D. Russell)](https://www.acs.psu.edu/drussell/Demos/MembraneCircle/Circle.html) |

---

## Synthèse

**Bilan : 609 affirmations — 489 ✅ · 109 ⚠️ · 5 🔶 · 4 ❌ · 2 non vérifiées ; 264 DOI distincts, tous résolus sur Crossref** (dont 10 affirmations et 2 DOI pour la fiche 21 du compagnon *Portraits*, et 362 affirmations et 42 DOI pour les clés de physique et le glossaire complémentaire de septembre 2026 ; plus 10 corrections complémentaires C02–C15).

| Lot | Thème | ✅ | ⚠️ | 🔶 | ❌ | Non vérifié |
|---|---|---|---|---|---|---|
| 01 | Physique, maths & phénomènes | 20 | 5 | 0 | 0 | 0 |
| 02 | Préhistoire, Antiquité, XVIIe siècle & Mersenne | 15 | 7 | 0 | 1 | 0 |
| 03 | XVIIIe–XIXe siècles, musique, accords & battements | 17 | 8 | 0 | 1 | 1 |
| 04 | Psychoacoustique, localisation & sociétés | 18 | 3 | 0 | 0 | 0 |
| 05 | Enregistrement, transduction & numérique | 13 | 7 | 0 | 0 | 0 |
| 06 | Sonar, Langevin, ultrasons & Doppler | 18 | 4 | 0 | 0 | 0 |
| 07 | Oreille, sécurité auditive, voix & salles | 13 | 7 | 0 | 0 | 0 |
| 08 | Bioacoustique & infrasons | 16 | 6 | 1 | 0 | 0 |
| 09 | Ultrasons chez les animaux | 7 | 10 | 0 | 2 | 1 |
| 10 | Bruit, industrie, art & intox | 11 | 7 | 1 | 0 | 0 |
| 11 | Phonons, espace & astronomie | 12 | 5 | 0 | 0 | 0 |
| P21 | Compagnon *Portraits* — Bob Marley et les ingénieurs du dub | 9 | 1 | 0 | 0 | 0 |
| F01–F41b | Clés de physique (audit de complétude, 42 clés) | 309 | 35 | 3 | 0 | 0 |
| Gl. | Glossaire complémentaire | 11 | 4 | 0 | 0 | 0 |
| **Total** | | **489** | **109** | **5** | **4** | **2** |

### ❌ Erreurs corrigées dans le dossier (4 ❌, plus une erreur de calcul classée ⚠️)

1. **Épidaure (2.9)** : « ~14 000 puis ~17 000 places » → environ **6 000 places** au IVe siècle av. n. è., puis **13 000–14 000** après l'extension du IIe siècle (Éphorie d'Argolide, Diazoma).
2. **Musaraignes (9.17)** : « cris de 30 à 100 kHz » → gazouillis tonals **surtout audibles**, premier harmonique vers 4–8 kHz, énergie sous 20 kHz (Siemers et al. 2009, `10.1098/rsbl.2009.0378`).
3. **Odorrana tormota (9.19)** : chez Shen et al. 2008, ce sont **les femelles qui émettent** l'appel de cour et **les mâles qui le localisent** (à moins de 1°), pas l'inverse (`10.1038/nature06719`).
4. **Rameau et Sauveur (3.17)** : Rameau n'a pas lu Sauveur en écrivant le *Traité de l'harmonie* (1722) ; il le découvre ensuite, ce qui nourrit la *Génération harmonique* (1737).
5. **Emoto, 0,02 Pa (10.11, classé ⚠️ mais corrigé)** : « vingt millionièmes de la pression atmosphérique » → **deux dix-millionièmes** (2 × 10⁻⁷) ; le chiffre du script était cent fois trop grand.

### 🔶 Débattus

- **Infrasons des grands animaux (8.17)** : alligator et hippopotame, publiés ; tigre, communications de congrès ; **girafe retirée** — Baotic et al. 2015 enregistrent des fredonnements nocturnes sans composante sous 20 Hz.
- **Battements binauraux (10.9)** : la méta-analyse de 2019 trouve un effet moyen (g ≈ 0,45) mais très dépendant des protocoles ; la revue EEG de 2023 ne démontre pas d'entraînement cérébral. Formulation retenue : « effet mesurable sur certaines tâches, entraînement du cerveau non démontré ».

### ⚠️ Corrections de chiffre, de date ou d'attribution appliquées

- **Physique** : un 50 kHz s'éteint en quelques **dizaines** de mètres d'air (et non « quelques mètres ») ; ISO 9613-1 à 20 °C et 70 % : **5 / 23 / 78 dB/km** (les valeurs 30 et 100 sont celles de 50 % d'humidité) ; écho distinct = mur à **~9–14 m** ; pavillon : « quelques centimètres, au-dessus de 3–4 kHz » ; tonnerre grave « **en partie** » par absorption ; Lueg : brevet déposé en 1933, délivré en 1936.
- **Histoire** : Jurine (1794) montre le rôle de l'oreille chez la chauve-souris, Spallanzani confirme ; Langevin et Chilowsky = émetteur **capacitif** en 1915, quartz = Langevin seul en 1917 ; Buys Ballot fait jouer des **cornistes** ; Chladni en tournée à Paris en 1808, prix de l'Institut à **Sophie Germain** en 1816 ; Zarlino **codifie** la tierce 5/4 ; Sauveur nomme l'acoustique en 1701 ; Boyle : c'est le tic-tac d'une **montre** qui s'éteint, la cloche est seulement affaiblie ; vitesse du son : Cimento, Cassini (1677), Derham, 337–351 m/s, Mersenne dispersé ; hertz : CEI dans les années 1930 ; « laiton » et « or » retirés des cordes de Mersenne (absents du texte lu).
- **Musique** : Sethares 1998 (2ᵉ éd. 2005) ; 1 200 tr/min = 40 explosions/s demande **quatre cylindres** ; tempo spontané ~85–120 bpm ; seuil pouls/rugosité ~15–30 Hz ; rugosité jusqu'à ~300 Hz, hauteur dès ~30 Hz ; /s/ « riche en aigu (4–10 kHz) » ; convention d'octave harmonisée (la3 = 440 Hz).
- **Psychoacoustique** : ISO 226 (2003, réédition 2023) ; RASTI retiré en 2011 au profit de STIPA ; indicateur européen **Lnight**.
- **Numérique** : Wente chez **Western Electric** ; RCA PB-31 (1931) puis 44A ; Denon, premiers enregistrements numériques en janvier 1971, DN-023R en 1972 ; borne de Gabor 1/(4π) avec des écarts-types ; Opus co-développé avec Skype ; « Exxon » retiré (prospection sismique pétrolière).
- **Oreille** : implants commercialisés dans les années 1980 (FDA 1984–1985) ; OMS 53 dB Lden = seuil de **gêne forte**, risque cardiaque +8 % par tranche de 10 dB ; seuil de douleur 120–140 dB ; fondamentale masculine ~90–155 Hz ; Sabine **conseiller acoustique** du Symphony Hall ; régie 0,2–0,3 s.
- **Vivant** : audiogrammes Heffner (souris ~2–85 kHz ; dauphin mesuré sous l'eau, hors Heffner) ; grillon jusqu'à ~100 kHz ; moustique femelle ~400–500 Hz, mâle ~600 ; canons à air 220–230 dB **crête par canon** ; ncpaprop ; sub-bass 20–70 Hz, orgue de 32 pieds à 16 Hz ; ~1 500 espèces de chauves-souris ; Griffin et Galambos 1941–1942 ; **cris** (pas clics) de 120–140 dB SPL à 10 cm ; Blest, Collett et Pye 1963 ; faisceau du grand dauphin ~10°, lèvres phoniques sous le melon ; buzz jusqu'à ~500 clics/s ; guacharo = Suthers et Hector 1985, salanganes = Griffin et Suthers 1970, Griffin et Thompson 1982 ; fovéa du rhinolophe ~83 kHz.
- **Intox** : *Healing Codes* de Horowitz et Puleo daté 1999 ; Iaccarino 2016 = **lumière**, Martorell 2019 = son ; essai HOPE achevé à l'été 2026, résultats non publiés au 23 septembre 2026 ; sonification du Soleil ×42 000 ≈ **une quinzaine d'octaves** ; Maxim 1909 = silencieux d'**arme** ; citation « 3-6-9 » attribuée à Tesla sans source ni date ; état des lieux du « syndrome de La Havane » daté (NIH/JAMA 2024, ODNI 2025).
- **Compagnon Portraits (fiche 21)** : *House of Joy* est le sound system de Roy Johnson, pas le nom des caissons de Hedley Jones (qui construisait amplis et enceintes).
- **Espace** : phonon = concept de Tamm (1930), mot de Frenkel (1932) ; instrument de Voyager = *Plasma Wave Subsystem*, PI Scarf puis Gurnett (1988) ; ~300–400 Hz dans l'héliogaine ; whistlers de Jupiter = l'une des **deux** preuves d'éclairs, avec les images de nuit ; modes p ~1–5 mHz, pic ~3 mHz, précision ≈ 3 × 10⁻⁶ ; fréquence plasma de centaines de MHz dans la **basse couronne** (pas la photosphère) ; Fabian, Sanders et al. 2003 (Churazov n'est pas coauteur).

### Non vérifié (marqué tel quel, reformulé en ordre de grandeur)

- **3.21** — règle des orchestrateurs sur les intervalles graves (Adler, Piston) : aucune page ouverte ; reformulée en ordres de grandeur, avec la convention d'octave fixée.
- **9.20** — répulsifs à ultrasons : « habituation en 3 à 7 jours » et « plus de 160 dB » non retrouvés ; reformulés (« quelques jours », « niveaux sans rapport avec un appareil domestique »). L'inefficacité, elle, est documentée (FTC, Cochrane, études de 1982–1984).
- Restés sans source chiffrée à l'intérieur de fiches par ailleurs vérifiées : bande « 30–90 kHz » des clics de *Melese* ; 228 dB crête à crête du grand dauphin ; pics 115 / 250 kHz du dauphin à bec blanc ; « 103 dB SPL à 10 cm » des petits rongeurs ; audiogramme « 1,5–92 kHz » de la souris ; dimension du pavillon (~3 cm) ; « 6 000 francs » de Napoléon à Chladni ; « grêle des anneaux » de Cassini. Le dossier les présente comme des ordres de grandeur.

### Graphies et attributions corrigées

Louis Jurine · Terfenol-D · Iégor Reznikoff · Polyclète · Lnight · partiels inharmoniques · ncpaprop · ter Hofstede · Krigar-Menzel (tube de Rubens) · Håkansson et al. 2022 · *Odorrana tormota* · *Plasma Wave Subsystem* · Fabian, Sanders et al. 2003 · Zheleznyakov (une seule translittération) · glissando de Shepard-Risset.

### Clés de physique, glossaire et corrections complémentaires (sept. 2026)

- **Aucune erreur (0 ❌)** dans les 42 clés ni dans le glossaire : tous les exemples calculables ont été recalculés et tombent juste, à l'arrondi près. Les **10 corrections C02–C15** du script sont vérifiées (sources rouvertes, valeurs recalculées : Ainslie et McColm 0,061 et 0,99 dB/km ; maximum de Sethares à 19 Hz et 37 Hz ; ~50 octaves pour le fond diffus).
- **🔶 (3)** : exploitation par l'audition de la finesse des cris FM larges des chauves-souris (K31.8) ; efficacité de l'amplification par la prestine aux plus hautes fréquences (K35.9) ; détection des modes g solaires (K39.4). Les trois clés le présentent comme ouvert.
- **Écarts d'arrondi ou de formulation relevés au recalcul — corrigés dans les fichiers `complements/` (24 septembre 2026)** : F02, pente 0,52 → **0,51 Pa/m** ; F11, rapport 0,95 / −0,2 dB → **0,944 / −0,25 dB** ; F14, les deux jeux de célérités de l'acier sont nommés (5 860 / 3 130 m/s calculés avec E = 200 GPa, ν = 0,30 ; **5 920 / 3 240 m/s mesurés**, ISO 2400 et Evident, retenus pour les angles et la figure) ; F17, absorption à 40 kHz donnée **selon l'humidité** (0,46 dB/m à 10 %, 0,78 à 20 %, plus de 1 dB/m au-delà d'environ 30 %, maximum ≈ 1,3 dB/m vers 50–60 %, ISO 9613-1 recalculé) ; F24, longueur vibrante **32,5 à 33 cm** (Pirastro) ; F35, gain **≈ 22 dB à 1 kHz** (estimé sur les pentes publiées ; 23,5 dB reste le maximum vers 1,2 kHz), d'où 0,25 Pa, 3 × 10⁻¹² W et 3 mm², figure complétée ; F38, **environ six milliards** (6,25 × 10⁹) ; F39, électrons à 10 eV et **ions nettement plus froids** (T_e = 10 T_i), et **au moins treize octaves** environ (12,7 pour 3 mHz) ; glossaire, déplacement particulaire donné **en efficace aux deux bornes** (8 pm et 0,4 µm ; crêtes 11 pm et 0,55 µm). Aussi : F09, Q ≈ 4 000 présenté comme choix de modèle (Q typique d'un diapason ≈ 1 000) ; F26, nettoyage « environ 20–80 kHz ».
- **Contrôle d'échantillon (18 affirmations, source ouverte) : 14 ✅, 4 ⚠️, 0 ❌** — la page UNSW ne précise pas « 20 °C » pour 343 m/s (K01.5) ; Rienstra et Hirschberg donnent 0,85a (bridé) et 0,61a (non bridé) mais pas leur répartition cavité/extérieur (K10.2, § 5.2.3.1) ; le résumé de Gélat et Shaw ne donne pas F = P/c (K27.1 ; source ouverte ajoutée) ; Harris arrondit les lobes à −13 et −32 dB (K36.4).
- **Affirmations exactes que les « Appuis » de leur clé ne couvraient pas — sources ajoutées (24 septembre 2026)** : Γ₁ stellaire (F03, Christensen-Dalsgaard 2021) ; Q d'un diapason (F09, *Acoustics Today*) ; rendement d'un haut-parleur de 0,2 à 2 % (F11, F36, F41 : Sengpiel ; F11 aussi Aarts 2005) ; faible dispersion de l'air et tonnerre (F15 : ECCC, Chen et Xiang d'après Blackstock) ; nettoyage et soudure par ultrasons (F26 : Kanegsberg, NPL, Villegas 2019) ; conventions dBFS (F28 : B. Katz, AES17) ; cri de 130 dB SPL à 10 cm et 1,2 dB/m à 40 kHz (F33 : Surlykke et Kalko 2008, Bass et al. 1995) ; synthèse FM (F37 : Chowning 1973) ; claquement de mains (F41b : Fu et al. 2025). DOI vérifiés sur Crossref ; Chowning 1973 et AES17 n'ont pas de DOI.
- **Modèles annoncés comme tels (⚠️ sans correction à faire)** : loi de masse en incidence normale, gain « d'une dizaine de points » du CNRC, α uniforme, distance critique et champ diffus, zone d'ombre et effet de sol en géométrie de rayons, onde plane sans pertes pour la distance de choc, échauffement adiabatique en borne haute, lévitation d'une petite sphère non visqueuse, graisse sur tout le trajet, bruit de mer de Stojanovic.

### DOI

220 DOI distincts, tous vérifiés sur Crossref par les agents puis de nouveau le 24 septembre 2026 : aucun ne manque, aucun n'a été retiré. Deux DOI s'y ajoutent pour la fiche 21 du compagnon *Portraits*, résolus sur Crossref le même jour (Henriques 2011, `10.5040/9781501382895` ; Cameron et al. 2022, `10.1016/j.cub.2022.09.035`), soit **222 DOI distincts**. Quatre sont signalés « non lus » (existence et métadonnées vérifiées, texte non consulté) et un comme appui secondaire. Deux DOI candidats avaient été **écartés dès la vérification** et ne figurent nulle part : celui d'un article d'histoire de l'Auto-Tune qui n'a pas pu être ouvert, et celui d'un article de Huron (2008) dont les métadonnées Crossref ne concordaient pas avec la revue citée. Seebeck 1841, Schouten 1940, Haas 1951, Feddersen 1957 et Gerzon 1973 : **DOI non trouvé** — cités sans DOI.

**Septembre 2026, audit de complétude.** Les clés de physique citent 42 DOI distincts (9 déjà présents, dont Glasberg et Moore 1990 au lot 04 ; **33 nouveaux**), les corrections complémentaires 3 (dont **2 nouveaux** : Ainslie et McColm 1998, Basu et Antia 2008), et la vérification du glossaire en a ajouté **3** (Jennings 1988, Cai et Kulmala 2025, Taghipour et al. 2020, ce dernier comme appui secondaire). La vérification des clés a ensuite fait ajouter **4 DOI** : Chen et Xiang 2024, Villegas 2019 et Fu et al. 2025 aux Appuis des clés F15, F26 et F41b, et Nakajima et al. 2009, cité ici pour K35.5 ; Surlykke et Kalko 2008, désormais dans les Appuis de F33, figurait déjà au lot 09. Les **42 nouveaux DOI** ont été résolus sur `api.crossref.org/works/<doi>` le 24 septembre 2026 ; titre, auteurs, revue, volume et pages concordent pour tous : **aucun rejeté**. Total : **264 DOI distincts**.

## Complément — valeurs employées par les ateliers interactifs (vérifiées le 24 septembre 2026)

| # | Valeur | Verdict | Référence | Sources |
|---|---|---|---|---|
| A.1 | Ondes de pression de l'amas de Persée : période ≈ 9,6 Ma, si bémol « 57 octaves » sous le do médian | ⚠️ | Période juste ; le calcul donne ≈ 56,1 octaves, « 57 » est l'arrondi du communiqué Chandra | [Chandra 2003](https://chandra.harvard.edu/press/03_releases/press_090903.html) · DOI 10.1046/j.1365-8711.2003.06902.x |
| A.2 | Voyager 1 : ~2,1–2,2 kHz (oct.–nov. 2012), ~2,6 kHz (avr. 2013) ; héliopause le 25 août 2012 | ✅ | n_e ≈ 0,06 puis 0,08 cm⁻³ | [UIowa](https://space.physics.uiowa.edu/plasma-wave/plasma-wave/voyager/v1pws_interstellar_epo.html) · DOI 10.1126/science.1241681 |
| A.3 | GW150914 : masse de chirp ≈ 30 M☉, 35 → 250 Hz | ✅ | 30 M☉ au détecteur (≈ 28 dans le référentiel de la source) | DOI 10.1103/PhysRevLett.116.061102 |
| A.4 | Échographie : atténuations graisse ~0,6, foie 0,5–0,9, muscle ~1 (1,1–3,3), liquide ~0, os 7–20 dB/cm/MHz | ⚠️ | Dans les fourchettes de la littérature ; muscle anisotrope | [Radiopaedia](https://radiopaedia.org/articles/attenuation-coefficient) · DOI non trouvé (manuel Hedrick) |
| A.5 | Force de cible d'un papillon de nuit −30 dB ; cri de *Myotis* 110–120 dB SPL à 10 cm | ⚠️ / ✅ | La TS dépend de la distance de référence : −20 à −5 dB à 10 cm (≈ −40 à −25 à 1 m) | DOI 10.1371/journal.pone.0002036 · 10.1098/rspb.2008.1505 |
| A.6 | Grand rhinolophe : CF ≈ 83 kHz, cris de 30–65 ms, compensation Doppler | ✅ | Environ un cri par battement d'ailes | DOI 10.1007/BF00645356 |
| A.7 | DIN 18041:2016 : T_soll A1 = 0,45 lg V + 0,07 ; A3 = 0,32 lg V − 0,17 ; A4 = 0,26 lg V − 0,14 | ✅ | Domaines : A1 30–1 000 m³, A3 30–5 000 m³, A4 30–500 m³ | [Nocke 2016](https://akustikbuero-ol.de/images/akustikbuero-ol/pdf/Laermbekaempfung_02_2016_S.50-55.pdf) |
| A.8 | Modes p solaires : Δν ≈ 135 µHz | ⚠️ | Δν est l'écart entre modes ; le pic est νmax ≈ 3,09 mHz | DOI 10.3389/fspas.2020.00003 · 10.1088/0004-637x/743/2/143 |
