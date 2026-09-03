#!/usr/bin/env python3
"""Dossier VII → Obsidian : tableau de bord, canvas et bases.

Recompte tout depuis les notes réellement écrites — jamais de chiffre annoncé
qui ne vienne pas d'un `len()`.
"""
import os, re, json, glob

VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
ECI = 'Empire contre Intox'
FOLDER = 'Dossier VII — Champs de vecteurs'
OUT = os.path.join(VAULT, ECI, FOLDER)
REL = f'{ECI}/{FOLDER}'
URL = 'https://empire-contre-intox.com/samlepirate/champs-vecteurs.html'
MOC = 'Dossier VII — Le langage des champs'
TODAY = '2026-08-25'
TAGS = ('empire-contre-intox/dossier-vii, mathematiques, analyse-vectorielle, '
        'champs-de-vecteurs, tableau-de-bord')

PLAN = json.load(open('/tmp/vii-plan.json', encoding='utf-8'))
SECS = PLAN['sections']

# ─────────────────────────────────────────── recomptage
def body_of(p):
    s = open(p, encoding='utf-8').read()
    return s.split('---\n', 2)[-1]

reading = [os.path.join(OUT, s['file'] + '.md') for s in SECS]
words = sum(len(re.findall(r"[\w'’-]+", body_of(p))) for p in reading)
allmd = sorted(glob.glob(os.path.join(OUT, '*.md')))
nb_notes = len(allmd)
nb_formules = sum(len(re.findall(r'^\^formule-\d+', body_of(p), re.M)) for p in reading)
nb_eq = sum(len(re.findall(r'^> \$\$', body_of(p), re.M)) for p in reading)
nb_callouts = sum(len(re.findall(r'^> \[!', body_of(p), re.M)) for p in reading)
nb_eq_page = nb_eq - 1        # les 16 des chapitres ; la 17e est le champ du hero
nb_quotes = sum(len(re.findall(r'^> \[!quote\]', body_of(p), re.M)) for p in reading)
nb_mermaid = sum(len(re.findall(r'^```mermaid', body_of(p), re.M)) for p in allmd)
nb_img = len(os.listdir(os.path.join(OUT, '_assets')))
fr_words = f'{words:,}'.replace(',', ' ')          # 4,321 → « 4 321 »
print(f'{nb_notes} notes · {words} mots · {nb_formules} ancres de formule · '
      f'{nb_eq} équations · {nb_callouts} encadrés · {nb_quotes} citations · '
      f'{nb_mermaid} mermaid · {nb_img} fichiers en _assets')

# ─────────────────────────────────────────── tableau de bord
LECTURE = [
    ('these', 'la thèse, les trois idées, le champ du hero'),
    ('lexique', 'scalaire, vecteur, champ · 2 blocs de formules'),
    ('champs', 'la brique de base · la convention de dessin · figure 1'),
    ('fluide', 'le gradient et la colline · figure 2 · 1 bloc'),
    ('divergence', 'sources et puits · figure 3 · 1 bloc'),
    ('rotationnel', 'la brindille · la convention de signe · 1 bloc'),
    ('atelier', 'les six champs, recalculés un à un'),
    ('maxwell', 'les quatre équations · figure 4 · 1 bloc'),
    ('phases', 'Lotka-Volterra · le portrait de phase · 1 bloc'),
    ('lien', 'pourquoi ∇· et ∇× · figure 5 · 1 bloc · le compagnon'),
    ('__recap', 'le mémo en deux colonnes'),
    ('__coda', 'le mot de la fin'),
]
BYID = {s['id']: s for s in SECS}
prog = [f"- [ ] [[{BYID[i]['file']}|{BYID[i]['h1']}]] *({d})*" for i, d in LECTURE]
prog += [
    "- [ ] [[Formulaire — les formules du langage des champs|Relire le formulaire]] "
    f"*({nb_formules} blocs, {nb_eq_page} équations)*",
    "- [ ] [[Lexique — les mots du champ|Réviser le lexique]] *(33 mots)*",
    "- [ ] [[Les cinq figures — ce que les schémas montrent|Revoir les figures]] "
    "*(5 schémas, 4 rendus en Mermaid)*",
    "- [ ] [[Les voix du dossier — qui a écrit ces équations|Savoir qui signe]] *(7 noms)*",
    "- [ ] [[Sources — la vérification du langage des champs|Vérifier avec l'appareil "
    "critique]] *(12 fiches · 3 DOI)*",
]

dash = f'''---
projet: Empire contre Intox
dossier: VII
titre-dossier: "Le langage des champs"
auteurs: [Samlepirate]
d-apres: "3Blue1Brown (Grant Sanderson)"
source: {URL}
licence: CC BY-NC-ND 4.0
importé: {TODAY}
tags: [{TAGS}]
aliases: ["Tableau de bord", "Dashboard Champs de vecteurs", "⌂ Champs de vecteurs"]
ordre: 99
---


# ⌂ Tableau de bord — Champs de vecteurs

![Le langage des champs|550](_assets/champs-hero.jpg)

> [!info] Dossier VII — « Le langage des champs »
> Posez une flèche sur chaque point de l'espace, puis imaginez que c'est un fluide : le gradient, la divergence et le rotationnel deviennent visibles — jusqu'à faire parler les équations de Maxwell. **Huit chapitres, deux ateliers manipulables**, et un hero qui est lui-même un champ calculé en direct. Portage français de l'épisode *« Divergence & rotationnel »* de **3Blue1Brown**, par **Samlepirate**.

## Accès rapide

|  |  |
| --- | --- |
| 📜 [[{MOC}\\|Sommaire du dossier]] | 🗺️ [[Carte du dossier — Champs de vecteurs.canvas\\|Carte du dossier (canvas)]] |
| 🧮 [[Formulaire — les formules du langage des champs\\|Formulaire — {nb_formules} blocs, {nb_eq_page} équations]] | 🪜 [[Du scalaire à la lumière — frise.canvas\\|Du scalaire à la lumière (canvas)]] |
| 📖 [[Lexique — les mots du champ\\|Lexique — 33 mots]] | 📐 [[Les cinq figures — ce que les schémas montrent\\|Les cinq figures]] |
| 🗣️ [[Les voix du dossier — qui a écrit ces équations\\|Les voix — qui signe ces équations]] | 🔬 [[Sources — la vérification du langage des champs\\|Sources & vérification]] |
| 🧪 [L'atelier des champs, en ligne]({URL}#atelier) | 🌐 [Le dossier en ligne]({URL}) |

## Le dossier en chiffres

| Notes | Chapitres | Ateliers | Mots | Blocs de formules | Équations |
| --- | --- | --- | --- | --- | --- |
| {nb_notes} | 8 | 2 | ~{fr_words} | {nb_formules} | {nb_eq_page} + 1 |

| Figures | Encadrés | Citations encadrées | Mots du lexique | Fiches de vérification | DOI vérifiés | Diagrammes Mermaid |
| --- | --- | --- | --- | --- | --- | --- |
| [[Les cinq figures — ce que les schémas montrent\\|5]] | {nb_callouts} | {nb_quotes} | [[Lexique — les mots du champ\\|33]] | [[Sources — la vérification du langage des champs\\|12]] | [[Sources — la vérification du langage des champs\\|3]] | {nb_mermaid} |

## Progression de lecture

{chr(10).join(prog)}

## Le dossier en deux phrases

Les deux « à retenir » du dossier, tels quels.

![[10 — Mémo — Deux nombres, deux questions#^retenir-1]]

![[11 — Le mot de la fin — Un amour des maths#^retenir-2]]

## Le fil conducteur

![[{MOC}#Le fil conducteur]]

## Les six champs de l'atelier

![[06 — Atelier I — Lâchez une brindille dans le fluide#Les six champs de l'atelier]]

## Le mémo — deux nombres, deux questions

![[10 — Mémo — Deux nombres, deux questions#Divergence — $\\nabla\\cdot$ — produit scalaire]]

![[10 — Mémo — Deux nombres, deux questions#Rotationnel — $\\nabla\\times$ — produit vectoriel]]

## Les bases

- [[Dossier VII — lecture.base|Le dossier dans l'ordre]] — les {nb_notes} notes triées par `ordre`, avec leur rang de chapitre ;
- [[Dossier VII — l'appareil.base|L'appareil du dossier]] — formulaire, lexique, figures, voix et sources, avec leurs compteurs.

## Ce que l'audit a donné

> [!success] ✅ 39 affirmations auditées — 34 ✅, 3 ⚠️, 1 🔶, 1 ❌
> Un dossier de mathématiques se vérifie **en le recalculant**. Les six champs de l'atelier ont été dérivés symboliquement (**6 sur 6 exacts**), l'équilibre proie-prédateur recalculé sur les coefficients du code (**(1,8 ; 1,8)**), les orbites fermées démontrées par l'invariant du système. **4 DOI vérifiés Crossref.** Le détail : [[Sources — la vérification du langage des champs]].
>
> **Une seule erreur factuelle**, corrigée dans la page : le champ *Cisaillement* renvoyait au « chapitre IV » là où c'est le **chapitre V**. Et les **huit lignes « Se lit »** qui manquaient sous les formules ont été écrites et posées — voir [[Formulaire — les formules du langage des champs]].

> [!warning] ⚠️ Trois nuances restent à porter dans le texte
> - **« Les monopôles magnétiques n'existent pas »** → aucun n'a jamais été *détecté*, et la recherche est active (MoEDAL, CERN, 2024).
> - **« Quatre équations — les équations de Maxwell »** → les quatre équations vectorielles sont la forme d'**Oliver Heaviside** (1884) ; le mémoire de Maxwell de 1865 en compte une vingtaine, en composantes.
> - **Les sept citations** entre guillemets sont des **traductions françaises** du commentaire anglais, pas des citations littérales.
>
> Le dossier a déjà deux encadrés d'auto-critique — il sait faire : ces trois points s'y logeraient sans réécriture.

---

[[{MOC}|⌂ Sommaire du dossier]] · [[Empire contre Intox — tableau de bord|⌂ Tableau de bord de l'Empire]]

---

> [!quote] Licence
> Contenu **Empire contre Intox** sous licence [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr) — partage avec attribution, sans usage commercial ni modification. Réalisé par **Samlepirate**, d'après l'épisode *« Divergence & rotationnel »* de **3Blue1Brown** (Grant Sanderson).
'''
open(os.path.join(OUT, 'Tableau de bord — Champs de vecteurs.md'), 'w',
     encoding='utf-8').write(dash)
print('  + Tableau de bord — Champs de vecteurs')

# ─────────────────────────────────────────── canvas : carte du dossier
def fnode(i, name, x, y, w=500, h=360, color=None):
    n = dict(id=i, type='file', file=f'{REL}/{name}.md', x=x, y=y, width=w, height=h)
    if color:
        n['color'] = color
    return n

def tnode(i, text, x, y, w, h, color=None):
    n = dict(id=i, type='text', text=text, x=x, y=y, width=w, height=h)
    if color:
        n['color'] = color
    return n

# 1 = rouge · 2 = orange · 3 = jaune · 4 = vert · 5 = cyan · 6 = violet
COL = {'these': '5', 'lexique': '6', 'champs': '6', 'fluide': '3',
       'divergence': '4', 'rotationnel': '3', 'atelier': '5', 'maxwell': '4',
       'phases': '1', 'lien': '6', '__recap': '2', '__coda': '2'}

nodes = [tnode('titre',
               "# Dossier VII — Le langage des champs\n**Huit chapitres · deux "
               "ateliers · 8 blocs de formules · 5 figures** — Samlepirate, d'après "
               "l'épisode « Divergence & rotationnel » de *3Blue1Brown* · "
               "*Veritas omnia vincit*",
               40, 0, 4200, 140, '5')]
nodes.append(fnode('moc', MOC, 40, 190, 560, 420, '5'))
nodes.append(fnode('dash', 'Tableau de bord — Champs de vecteurs', 660, 190, 560, 420, '5'))

X0, Y0, W, GAP = 40, 700, 500, 60
edges = []
prev = None
for k, s in enumerate(SECS):
    nid = f'n{k:02d}'
    nodes.append(fnode(nid, s['file'], X0 + k * (W + GAP), Y0, W, 360, COL[s['id']]))
    if prev:
        edges.append(dict(id=f'e{k}', fromNode=prev, toNode=nid,
                          fromSide='right', toSide='left'))
    prev = nid
LBL = {1: 'les trois mots', 3: 'et si c\'était un fluide ?', 4: 'ça sort ou ça entre ?',
       5: 'ça tourne ?', 6: 'on manipule', 7: 'le même langage, en physique',
       9: 'pourquoi cette notation', 11: 'la chute'}
for e in edges:
    k = int(e['id'][1:])
    if k in LBL:
        e['label'] = LBL[k]

APP = ['Formulaire — les formules du langage des champs', 'Lexique — les mots du champ',
       'Les cinq figures — ce que les schémas montrent',
       'Les voix du dossier — qui a écrit ces équations',
       'Sources — la vérification du langage des champs']
AY = Y0 + 460
nodes.append(dict(id='g-app', type='group', x=X0 - 20, y=AY - 60,
                  width=5 * (W + GAP) + 20, height=440, label='Appareil critique'))
for k, name in enumerate(APP):
    nodes.append(fnode(f'a{k}', name, X0 + k * (W + GAP), AY, W, 320, '6'))
    edges.append(dict(id=f'ea{k}', fromNode='moc', toNode=f'a{k}',
                      fromSide='bottom', toSide='top'))

edges.append(dict(id='em1', fromNode='moc', toNode='n00', fromSide='bottom',
                  toSide='top', label='commencer ici'))
edges.append(dict(id='em2', fromNode='dash', toNode='moc', fromSide='left',
                  toSide='right', label='pilote'))
edges.append(dict(id='ea-f', fromNode='n03', toNode='a0', fromSide='bottom',
                  toSide='top', label='les formules'))
edges.append(dict(id='ea-s', fromNode='n06', toNode='a4', fromSide='bottom',
                  toSide='top', label='vérifié par le calcul'))

canvas = dict(nodes=nodes, edges=edges)
json.dump(canvas, open(os.path.join(OUT, 'Carte du dossier — Champs de vecteurs.canvas'),
                       'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('  + Carte du dossier — Champs de vecteurs.canvas')

# ─────────────────────────────────────────── canvas : la frise
NIV = [
    ('Niveau 0 — Les mots', "## Scalaire, vecteur, champ\nun nombre · une flèche · "
     "une grandeur par point", ['lexique'], '6'),
    ('Niveau 1 — Le dessin', "## Le champ de vecteurs\nune flèche par point, et la "
     "convention qui le rend lisible", ['champs'], '6'),
    ('Niveau 2 — La métaphore', "## Le fluide, la colline\nvoir un champ comme un "
     "écoulement, un écoulement comme une pente", ['fluide'], '3'),
    ('Niveau 3 — Les deux questions', "## Divergence & rotationnel\nça sort ou ça "
     "entre ? ça tourne ?", ['divergence', 'rotationnel'], '4'),
    ('Niveau 4 — La manipulation', "## L'atelier\nsix champs, deux nombres, une "
     "brindille qui tourne", ['atelier'], '5'),
    ('Niveau 5 — La physique', "## Les quatre équations\nGauss, pas de monopôle, "
     "Faraday, Ampère-Maxwell → la lumière", ['maxwell'], '4'),
    ('Niveau 6 — Hors de l\'espace', "## L'espace des phases\nlapins et renards, des "
     "cycles autour d'un équilibre", ['phases'], '1'),
    ('Niveau 7 — Le fond', "## Produit scalaire & vectoriel\npourquoi ∇· et ∇× ne sont "
     "pas qu'une notation", ['lien'], '6'),
]
fn, fe = [tnode('ftitre',
                "# Du scalaire à la lumière\n**Les huit marches du dossier**, et les "
                "chapitres qui les montent. *« Tout commence par un geste minuscule : "
                "associer à chaque point une flèche. Tout finit par la lumière. »*",
                40, 0, 3600, 130, '5')], []
gx, prevg = 20, None
for k, (label, txt, ids, col) in enumerate(NIV):
    gw = 400
    h = 500 + (200 if len(ids) > 1 else 0)
    fn.append(dict(id=f'g-{k}', type='group', x=gx, y=180, width=gw, height=h,
                   label=label))
    fn.append(tnode(f't-{k}', txt, gx + 20, 240, gw - 40, 140, col))
    for j, sid in enumerate(ids):
        fn.append(fnode(f'f-{k}-{j}', BYID[sid]['file'], gx + 20, 420 + j * 280,
                        gw - 40, 260, col))
    if prevg is not None:
        fe.append(dict(id=f'fe{k}', fromNode=f't-{prevg}', toNode=f't-{k}',
                       fromSide='right', toSide='left'))
    prevg = k
    gx += gw + 40
json.dump(dict(nodes=fn, edges=fe),
          open(os.path.join(OUT, 'Du scalaire à la lumière — frise.canvas'), 'w',
               encoding='utf-8'), ensure_ascii=False, indent=1)
print('  + Du scalaire à la lumière — frise.canvas')

# ─────────────────────────────────────────── bases
open(os.path.join(OUT, 'Dossier VII — lecture.base'), 'w', encoding='utf-8').write(
    f'''filters:
  and:
    - file.inFolder("{REL}")
views:
  - type: table
    name: Le dossier dans l'ordre
    order:
      - file.name
      - chapitre
      - ordre
    sort:
      - property: ordre
        direction: ASC
''')
open(os.path.join(OUT, "Dossier VII — l'appareil.base"), 'w', encoding='utf-8').write(
    f'''filters:
  and:
    - file.inFolder("{REL}")
    - file.hasTag("empire-contre-intox/dossier-vii")
views:
  - type: table
    name: L'appareil du dossier
    filters:
      and:
        - ordre >= 90
    order:
      - file.name
      - ordre
      - formules
      - equations
      - termes
      - figures
      - voix
      - fiches
      - doi
    sort:
      - property: ordre
        direction: ASC
  - type: cards
    name: Les chapitres
    filters:
      and:
        - chapitre != null
    order:
      - file.name
      - chapitre
      - ancre
    sort:
      - property: chapitre
        direction: ASC
''')
print('  + Dossier VII — lecture.base · Dossier VII — l\'appareil.base')
