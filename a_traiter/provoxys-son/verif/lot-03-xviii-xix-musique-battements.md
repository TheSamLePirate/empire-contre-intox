# Rapport de vérification — Lot 03 (XVIIIe–XIXe, musique, accords, battements)

Agent `verif-claims`, 23 septembre 2026. Claims : `claims/03-xviii-xix-musique-battements.md`. Sections : `#xviii`, `#musique`, `#accords`, `#battements`. Cents et battements recalculés en Python.

**Comptes** : 16 ✅ · 9 ⚠️ · **1 ❌** (n° 17) · 1 non vérifié (n° 21).

| # | Affirmation | Verdict | Référence / nuance | Sources | DOI |
|---|---|---|---|---|---|
| 1 | Taylor 1713 ; d'Alembert 1747 ; Bernoulli 1738 | ✅ | Taylor trouve le mode fondamental, pas l'EDP ; Hydrodynamica = fluides, le rapprochement est rétrospectif (acoustique de D. Bernoulli : 1750–60) | royalsocietypublishing.org ; persee.fr (dhs 1984) ; mathshistory.st-andrews.ac.uk | 10.1098/rstl.1713.0004 |
| 2 | Chladni 1787, 1802 ; Napoléon le fait venir ; l'Institut le couronne | ⚠️ | Tournée européenne, Paris **1808** ; Napoléon finance la traduction (1809) et fait ouvrir un concours → prix à **Sophie Germain 1816**, pas à Chladni ; « souvent dit » père de l'acoustique | en.wikipedia.org/wiki/Ernst_Chladni ; encyclopedia.com (DSB) ; lindahall.org | — |
| 3 | Kundt 1866 ; Rubens 1905 | ✅ | Rubens **& Krigar-Menzel** | Crossref | 10.1002/andp.18662030402 ; 10.1002/andp.19053220608 |
| 4 | Fourier 1807/1822 ; Ohm 1843 | ✅ | Mémoire 21 déc. 1807 non publié ; Ohm contesté par Seebeck 1844 | mathshistory ; france-memoire.fr | 10.1002/andp.18431350802 |
| 5 | Helmholtz 1863 ; Békésy corrige | ✅ | « partiellement confirmé, partiellement réfuté » | nobelprize.org (Békésy lecture) | — |
| 6 | Doppler 1842 ; Buys Ballot 1845 | ✅ | Cornistes ; voulait réfuter Doppler | muurformules.sites.uu.nl | 10.1002/andp.18451421102 |
| 7 | Rayleigh, Nobel 1904 argon, Theory of Sound, rayl | ✅ | Ondes de Rayleigh 1885 | en.wikipedia.org/wiki/Rayl | 10.1112/plms/s1-17.1.4 ; 10.1017/CBO9781139058087 ; 10.1017/CBO9781139058094 |
| 8 | Laennec 1816 | ✅ | Necker ; traité 1819 | hekint.org | — |
| 9 | Écarts 12-TET vs juste | ✅ | −1,96 ; +1,96 ; +13,69 ; −15,64 ; −3,91 ; −11,73 | calcul | — |
| 10 | Comma 1,0136, 23,5 cents | ✅ | 23,46 | calcul | — |
| 11 | Zarlino introduit 5/4 ; Werckmeister, Kirnberger ; 12-TET XIXe | ⚠️ | Zarlino **codifie** (1558 ; déjà Ramos 1482) ; Werckmeister 1691 ; Kirnberger 1771/79 ; 12-TET dominant en théorie dès le XVIIIe | medieval.org/emfaq/zarlino ; teoria.com | — |
| 12 | Pélog, slendro, shruti, quarts de ton, lü | ✅ | Congrès du Caire 1932 (24 quarts, sans consensus) ; Shiji ch. 25 | en.wikipedia.org (Slendro, Shruti, Cairo Congress, Shi'er lü) | — |
| 13 | Inharmonicité, Railsback | ✅ | JASA 9 (1938) ; Giordano 2015 | pubs.aip.org | 10.1121/1.1902056 ; 10.1121/1.4931439 |
| 14 | Fant source-filtre | ✅ | 1960 ; garder « dans une large mesure » | en.wikipedia.org/wiki/Gunnar_Fant | 10.1515/9783110873429 |
| 15 | Schaeffer 1948 ; Chowning 1967–73 ; Risset ; spectralisme | ✅ | Cinq études 5 oct. 1948 ; JAES 1973 ; « glissando de Shepard-Risset » | ccrma.stanford.edu | — |
| 16 | Triades 4:5:6, 10:12:15, 7/4 à 31 cents | ✅ | 386,31 ; 701,96 ; 315,64 ; 968,83 (−31,17) | calcul | — |
| 17 | Rameau 1722 fonde sur la triade et **lit Sauveur** | ❌ | Rameau ne connaissait pas Sauveur en 1722 ; il le découvre ensuite → Génération harmonique 1737 | en.wikipedia.org/wiki/Traité_de_l'harmonie… ; gallica (Génération harmonique) | — |
| 18 | Plomp & Levelt 25 % ; Sethares formule | ✅ | 25 % confirmé ; paramètres exacts 0,24 / 0,0207 / 18,96 / −3,51 / −5,75 ; livre **1998, 2e éd. 2005** | mpi.nl (PDF 1965) ; sethares.engr.wisc.edu/comprog.html | 10.1121/1.1909741 ; 10.1121/1.408175 |
| 19 | Terhardt 1974 ; Parncutt 1989 | ✅ | JASA 55 | pubmed 4833699 | 10.1121/1.1914648 ; 10.1007/978-3-642-74831-8 |
| 20 | Fritz 2009 ; Huron 2008 | ✅ | Curr. Biol. 19 ; EMR 3(2) (DOI Crossref discordant, ne pas afficher) | stefan-koelsch.de (PDF) ; doaj.org | 10.1016/j.cub.2009.02.058 |
| 21 | Règle des orchestrateurs (tierce sous la2, seconde sous la3) | non vérifié | Aucune page ouverte ; à sourcer (Adler, Piston) ; **convention d'octave** à fixer | — | — |
| 22 | Kontakte 1960 ; moteur 1200 tr/min = 40 explosions/s | ⚠️ | Kontakte exact ; moteur : 10/s par cylindre → **4 cylindres** nécessaires ; 40 Hz ≈ mi0 (E1 41,2 Hz) | en.wikipedia.org/wiki/Kontakte ; stockhausenspace.blogspot.com | — |
| 23 | Tempo 100–120 bpm (Fraisse) ; Hirsh 2 ms / 20 ms | ⚠️ | Fraisse : 500–700 ms = **86–120 bpm** ; Hirsh exact (15–20 ms) | frontiersin.org fpsyg.2023.1135988 ; pubs.aip.org | 10.1016/b978-0-12-213562-0.50010-3 ; 10.1121/1.1907782 |
| 24 | Formule des battements ; rugosité > 15–20/s | ⚠️ | Formule exacte ; seuil **~15–30/s selon le registre** | animations.physics.unsw.edu.au/jw/beats.htm | 10.1121/1.1909741 |
| 25 | 0,25 Hz ; 659,3 / 1,5 Hz ; 554,4 / 17,5 Hz ; fa3–la3 14 Hz ; fa2–la2 7 Hz | ⚠️ | Tous les nombres exacts (0,254 ; 1,49 ; 17,46 ; 13,86 ; 6,93) mais **convention d'octave incohérente** : « la4 = 440 » (scientifique) vs « fa3–la3 » (française, la3 = 440). Harmoniser. | en.wikipedia.org/wiki/Piano_key_frequencies | — |
| 26 | Oster 1973 | ✅ | Sci. Am. 229(4) | scientificamerican.com | 10.1038/scientificamerican1073-94 |
| 27 | « s » proche de l'ultra ; consonnes = transitoires | ⚠️ | /s/ culmine **4–8 kHz**, énergie jusqu'à ~10 kHz → « riche en aigu (4–10 kHz) » | home.cc.umanitoba.ca/~krussll ; Shadle 2023 | 10.1121/10.0021075 |

## Synthèse
- **❌** : 17 (Rameau / Sauveur → « il lira Sauveur peu après ; Génération harmonique 1737 »).
- **⚠️** : 2 (Chladni 1808, prix Germain), 11 (codifie), 18 (1998/2005), 22 (4 cylindres), 23 (85–120), 24 (15–30), 25 (convention d'octave), 27 (4–10 kHz) ; non vérifié 21.
- **Crédits** : Otto Krigar-Menzel ; glissando de Shepard-Risset.

## DOI vérifiés
10.1098/rstl.1713.0004 · 10.1002/andp.18662030402 · 10.1002/andp.19053220608 · 10.1002/andp.18431350802 · 10.1002/andp.18451421102 · 10.1112/plms/s1-17.1.4 · 10.1017/CBO9781139058087 · 10.1017/CBO9781139058094 · 10.1121/1.1902056 · 10.1121/1.4931439 · 10.1121/1.1909741 · 10.1121/1.408175 · 10.1121/1.1914648 · 10.1007/978-3-642-74831-8 · 10.1016/j.cub.2009.02.058 · 10.1121/1.1907782 · 10.1016/b978-0-12-213562-0.50010-3 · 10.1038/scientificamerican1073-94 · 10.1515/9783110873429 · 10.1121/10.0021075
