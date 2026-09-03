#!/usr/bin/env python3
# Dossier XXVII : tableau de bord, deux canvas, deux bases.
import os, re, json, glob

VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
FOLDER = 'Dossier XXVII — Ordinateur 1983'
OUT = os.path.join(VAULT, 'Empire contre Intox', FOLDER)
VP = f'Empire contre Intox/{FOLDER}'
SITE = 'https://empire-contre-intox.com/samlepirate/ordinateur-1983/'
MOC = "Dossier XXVII — L'Ordinateur de 1983"
FORM = 'Formulaire — les formules de la machine'
ISAN = "Jeu d'instructions — les 62 ordres de la machine"
BANC = "Le banc d'essai — les quinze expériences"
PROG = 'Les programmes de la machine — assembleur et C'
SOURCES = "Sources — la vérification de l'Ordinateur de 1983"
DASH = 'Tableau de bord — Ordinateur 1983'
CARTE = 'Carte du dossier — Ordinateur 1983'
FRISE = 'Du transistor au système — frise'
BASE = 'Dossier XXVII — lecture'
BASE2 = 'Les expériences de la machine'
TODAY = '2026-08-25'

D = json.load(open('/tmp/xxvii-data.json', encoding='utf-8'))
S = json.load(open('/tmp/xxvii-sources.json', encoding='utf-8'))
CH = {c['n']: c for c in D['chapters']}
ORD = ['premier', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième',
       'huitième', 'neuvième', 'dixième', 'onzième', 'douzième', 'treizième', 'quatorzième', 'quinzième']

# ---------------------------------------------------------------- chiffres réels
def words(p):
    t = re.sub(r'^---.*?---', '', open(p, encoding='utf-8').read(), flags=re.S)
    t = re.sub(r'```.*?```', '', t, flags=re.S)
    t = re.sub(r'\$\$?[^$]*\$\$?', '', t)
    t = re.sub(r'[#>*`\[\]|^]', ' ', t)
    return len(t.split())

notes = sorted(glob.glob(os.path.join(OUT, '*.md')))
n_notes = len(notes)
n_mots = sum(words(p) for p in notes if re.match(r'^\d\d — ', os.path.basename(p)))
n_img = len(glob.glob(os.path.join(OUT, '_assets', '*')))
n_tables = sum(open(p, encoding='utf-8').read().count('\n| --- |') for p in notes)
n_steles = sum(open(p, encoding='utf-8').read().count('> [!note] 🗒️') for p in notes)
n_marges = sum(open(p, encoding='utf-8').read().count('> [!note] 📎 En marge') for p in notes)

EXP_PAR_CH = {}
for n, chap, no, title, kind, hint, foot, anchor in D['labs']:
    EXP_PAR_CH.setdefault(chap, []).append((n, title))
FORM_PAR_CH = {}
for n, chap, *_ in D['formulas']:
    FORM_PAR_CH.setdefault(chap, []).append(n)

# ---------------------------------------------------------------- TABLEAU DE BORD
d = [f'''---
projet: Empire contre Intox
dossier: XXVII
titre-dossier: "L'Ordinateur de 1983"
auteurs: [Samlepirate]
source: {SITE}
licence: CC BY-NC-ND 4.0
importé: {TODAY}
tags: [empire-contre-intox/dossier-xxvii, informatique, tableau-de-bord]
ordre: 99
aliases: ["Tableau de bord", "Dashboard Ordinateur 1983", "⌂ Ordinateur 1983"]
---
''']
d.append(f'\n# ⌂ {DASH}\n')
d.append('![Hero du dossier|550](_assets/ordinateur-1983-hero.png)\n')
d.append('> [!info] Dossier XXVII — « L\'Ordinateur de 1983 »\n'
         '> Un interrupteur qui laisse passer le courant, ou pas. À la fin, une machine 8 bits qui compile du C, '
         'démarre un système, édite des fichiers et va chercher une page sur Internet. **Quinze chapitres, quinze '
         'expériences**, et un vrai processeur qui s\'exécute dans la page. Premier dossier du site écrit non pas '
         'd\'après un live, mais d\'après un **objet** : le *Simulateur Logique Nodal* de Samlepirate — dont le '
         '**code source** fait foi, y compris contre sa propre documentation.\n')

d.append('## Accès rapide\n')
d.append('|  |  |')
d.append('| --- | --- |')
d.append(f'| 📜 [[{MOC}\\|Sommaire du dossier]] | 🗺️ [[{CARTE}.canvas\\|Carte du dossier (canvas)]] |')
d.append(f'| 🧮 [[{FORM}\\|Formulaire — les 13 formules]] | 🪜 [[{FRISE}.canvas\\|Du transistor au système (canvas)]] |')
d.append(f'| 📖 [[{ISAN}\\|Jeu d\'instructions — 62 ordres]] | 🧪 [[{BANC}\\|Le banc d\'essai — 15 expériences]] |')
d.append(f'| 💻 [[{PROG}\\|Les programmes — asm & C]] | 🔬 [[{SOURCES}\\|Sources & vérification]] |')
d.append(f'| 🖥️ [Le simulateur embarqué]({SITE}simulateur/) | 🌐 [Le dossier en ligne]({SITE}) |')
d.append('')

d.append('## Le dossier en chiffres\n')
d.append('| Notes | Chapitres | Mots | Expériences | Formules | Encadrés « en marge » |')
d.append('| --- | --- | --- | --- | --- | --- |')
d.append(f'| {n_notes} | 15 | ~{n_mots:,} | {len(D["labs"])} | {len(D["formulas"])} | {n_marges} |'.replace(',', ' '))
d.append('')
d.append('| Instructions | Programmes exécutés | Plaques ASCII | Tableaux | Fiches de vérification | DOI vérifiés | Images |')
d.append('| --- | --- | --- | --- | --- | --- | --- |')
d.append(f'| [[{ISAN}\\|62]] | [[{PROG}\\|10]] | {n_steles} | {n_tables} | [[{SOURCES}\\|{S["fiches"]}]] | '
         f'[[{SOURCES}\\|{S["doi"]}]] | {n_img} |')
d.append('')

d.append('## Progression de lecture\n')
NIV = {1: 'niveau 0-1 · le bit et le transistor', 2: 'niveau 2 · les six portes', 3: 'niveau 2 · la porte universelle',
       4: 'niveau 3 · la première machine qui calcule', 5: 'niveau 3 · comparer', 6: 'niveau 5 · l\'ALU',
       7: 'niveau 4 · la mémoire', 8: 'niveau 4 · l\'horloge', 9: 'niveau 6 · l\'architecture',
       10: 'niveau 6 · la carte mémoire', 11: 'niveau 7 · le langage de la machine',
       12: 'niveau 7 · la machine qui tourne', 13: 'niveau 7 · le C', 14: 'niveau 7 · le système',
       15: 'la leçon des limites'}
for n in range(1, 16):
    c = CH[n]
    extras = []
    if n in EXP_PAR_CH:
        extras.append(f'{len(EXP_PAR_CH[n])} expérience' + ('s' if len(EXP_PAR_CH[n]) > 1 else ''))
    if n in FORM_PAR_CH:
        extras.append(f'{len(FORM_PAR_CH[n])} formule' + ('s' if len(FORM_PAR_CH[n]) > 1 else ''))
    tail = ' · '.join([NIV[n]] + extras)
    d.append(f'- [ ] [[{c["file"]}|Chapitre {ORD[n-1]} — {c["title"]}]] *({tail})*')
d.append(f'- [ ] [[{FORM}|Lire le formulaire]] *(13 formules)*')
d.append(f'- [ ] [[{ISAN}|Apprendre le vocabulaire]] *(62 instructions)*')
d.append(f'- [ ] [[{PROG}|Lire les dix programmes]] *(7 en assembleur, 3 en C)*')
d.append(f'- [ ] [[{BANC}|Passer au banc d\'essai]] *(15 expériences, jouables en ligne)*')
d.append(f'- [ ] [[{SOURCES}|Vérifier avec l\'appareil critique]] *({S["fiches"]} fiches · {S["doi"]} DOI)*')
d.append('')

d.append('## Le dossier en trois phrases\n')
d.append('Les trois « à retenir » du dossier, tels quels.\n')
for n, chap, _ in D['retain']:
    d.append(f'![[{CH[chap]["file"]}#^retenir-{n}]]\n')

d.append('## Les trois encadrés anti-intox\n')
d.append("Ce que le dossier corrige à voix haute — la documentation du simulateur contre son code, "
         "et le piège classique de l'assembleur.\n")
d.append('| # | L\'encadré | Dans |')
d.append('| --- | --- | --- |')
for n, chap, title, _ in D['intox']:
    d.append(f'| {n} | [[{CH[chap]["file"]}#^intox-{n}\\|{title}]] | Chapitre {chap} |')
d.append('')

d.append('## Les quinze expériences\n')
d.append('| # | Expérience | Nature | Chapitre |')
d.append('| --- | --- | --- | --- |')
for n, chap, no, title, kind, hint, foot, anchor in D['labs']:
    d.append(f'| {no.replace("EXP ", "")} | [[{BANC}#{no} — {title}\\|{title}]] | {kind} | '
             f'[[{CH[chap]["file"]}\\|Ch. {chap}]] |')
d.append('')

d.append('## Ce que l\'appareil critique corrige\n')
d.append(f'![[{SOURCES}#Ce que l\'audit a corrigé — l\'essentiel]]\n')

d.append('## Le fil conducteur\n')
d.append(f'![[{MOC}#Le fil conducteur — huit niveaux]]\n')

d.append('## Toutes les notes du dossier\n')
d.append(f'![[{BASE}.base]]\n')

d.append(f'---\n[[{MOC}|⌂ Sommaire du dossier]] · [[Empire contre Intox — tableau de bord|⌂ Tableau de bord de l\'Empire]] · *Veritas omnia vincit*\n')

open(os.path.join(OUT, DASH + '.md'), 'w', encoding='utf-8').write('\n'.join(d))
print('✔', DASH, f'({n_notes} notes · ~{n_mots} mots · {n_tables} tableaux · {n_steles} plaques)')

# ---------------------------------------------------------------- CARTE DU DOSSIER
def fnode(nid, name, x, y, w=520, h=340, color=None):
    n = {'id': nid, 'type': 'file', 'file': f'{VP}/{name}.md', 'x': x, 'y': y, 'width': w, 'height': h}
    if color: n['color'] = color
    return n

nodes, edges = [], []
nodes.append({'id': 'titre', 'type': 'text', 'x': 40, 'y': 0, 'width': 4200, 'height': 140, 'color': '5',
              'text': "# Dossier XXVII — L'Ordinateur de 1983\n"
                      "**15 chapitres · 15 expériences · 62 instructions · un processeur 8 bits qui tourne dans la page** — "
                      "Samlepirate, d'après son *Simulateur Logique Nodal* · *Veritas omnia vincit*"})
nodes.append(fnode('moc', MOC, 40, 190, 560, 420, '5'))
nodes.append(fnode('dash', DASH, 660, 190, 560, 420, '5'))

X0, Y0, W, H, GAP = 40, 700, 500, 360, 60
for i in range(1, 16):
    c = CH[i]
    col = (i - 1) % 5
    row = (i - 1) // 5
    nodes.append(fnode(f'ch{i:02d}', c['file'], X0 + col * (W + GAP), Y0 + row * (H + 120), W, H,
                       '4' if i <= 3 else ('2' if i <= 8 else ('1' if i <= 12 else '3'))))
for i in range(1, 15):
    edges.append({'id': f'e{i}', 'fromNode': f'ch{i:02d}', 'toNode': f'ch{i+1:02d}',
                  'fromSide': 'right' if i % 5 else 'bottom',
                  'toSide': 'left' if i % 5 else 'top'})
LBL = {1: 'des bits côte à côte', 3: 'une seule porte suffit', 4: 'la machine qui calcule',
       6: 'huit opérations', 8: 'au bon instant', 9: 'tout brancher', 11: 'le vocabulaire',
       12: 'et ça tourne', 14: 'un système'}
for e in edges:
    k = int(e['fromNode'][2:])
    if k in LBL:
        e['label'] = LBL[k]
edges.append({'id': 'e-moc', 'fromNode': 'moc', 'toNode': 'ch01', 'fromSide': 'bottom', 'toSide': 'top',
              'label': 'le dossier commence'})

GY = Y0 + 3 * (H + 120) - 60
nodes.append({'id': 'g-app', 'type': 'group', 'x': X0 - 30, 'y': GY, 'width': 2 * (W + GAP) + 60, 'height': 460,
              'label': 'Appareil du dossier'})
nodes.append(fnode('form', FORM, X0, GY + 70, W, 340, '6'))
nodes.append(fnode('isa', ISAN, X0 + W + GAP, GY + 70, W, 340, '6'))
nodes.append({'id': 'g-comp', 'type': 'group', 'x': X0 + 2 * (W + GAP) + 30, 'y': GY,
              'width': 2 * (W + GAP) + 60, 'height': 460, 'label': 'Le compagnon exécutable'})
nodes.append(fnode('banc', BANC, X0 + 2 * (W + GAP) + 60, GY + 70, W, 340, '3'))
nodes.append(fnode('prog', PROG, X0 + 3 * (W + GAP) + 60, GY + 70, W, 340, '3'))
nodes.append({'id': 'g-crit', 'type': 'group', 'x': X0 + 4 * (W + GAP) + 90, 'y': GY,
              'width': W + 60, 'height': 460, 'label': 'Appareil critique'})
nodes.append(fnode('src', SOURCES, X0 + 4 * (W + GAP) + 120, GY + 70, W, 340, '1'))
for a, b, lab in (('moc', 'form', 'les 13 formules'), ('moc', 'banc', 'les 15 expériences'),
                  ('isa', 'prog', 'le vocabulaire → les programmes'), ('prog', 'src', 'vérifié par exécution')):
    edges.append({'id': f'ex-{a}-{b}', 'fromNode': a, 'toNode': b, 'fromSide': 'right', 'toSide': 'left', 'label': lab})

json.dump({'nodes': nodes, 'edges': edges}, open(os.path.join(OUT, CARTE + '.canvas'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('✔', CARTE + '.canvas', f'({len(nodes)} nœuds · {len(edges)} arêtes)')

# ---------------------------------------------------------------- FRISE DES NIVEAUX
NIVEAUX = [
    ('Niveau 0', 'Le bit', 'il y a du courant, ou il n\'y en a pas', [1]),
    ('Niveau 1', 'Le transistor', 'un interrupteur commandé par un autre fil', [1]),
    ('Niveau 2', 'Les portes', 'six décisions élémentaires sur un ou deux bits', [2, 3]),
    ('Niveau 3', 'L\'additionneur', 'la première machine qui calcule', [4, 5]),
    ('Niveau 4', 'La mémoire', 'une boucle de courant qui se souvient d\'elle-même', [7, 8]),
    ('Niveau 5', 'L\'ALU', 'huit opérations, trois drapeaux, une décision', [6]),
    ('Niveau 6', 'Le processeur', 'chercher, décoder, exécuter, recommencer', [9, 10]),
    ('Niveau 7', 'Le langage', 'assembleur, puis C, puis un système', [11, 12, 13, 14]),
]
fn, fe = [], []
fn.append({'id': 'ftitre', 'type': 'text', 'x': 40, 'y': 0, 'width': 3400, 'height': 130, 'color': '5',
           'text': "# Du transistor au système d'exploitation\n"
                   "**Les huit niveaux de la pile**, et les chapitres qui les construisent. "
                   "*« Aucune étape n'est magique. C'est l'empilement qui devient intelligent. »*"})
COLS = ['4', '4', '2', '2', '6', '6', '1', '3']
for i, (lvl, name, desc, chaps) in enumerate(NIVEAUX):
    x = 40 + i * 420
    fn.append({'id': f'g-n{i}', 'type': 'group', 'x': x - 20, 'y': 180, 'width': 400,
               'height': 200 + len(chaps) * 300, 'label': f'{lvl} — {name}'})
    fn.append({'id': f'n{i}', 'type': 'text', 'x': x, 'y': 240, 'width': 360, 'height': 140, 'color': COLS[i],
               'text': f'## {name}\n{desc}'})
    for j, ch in enumerate(chaps):
        fn.append({'id': f'n{i}c{ch}', 'type': 'file', 'file': f'{VP}/{CH[ch]["file"]}.md',
                   'x': x, 'y': 420 + j * 300, 'width': 360, 'height': 260, 'color': COLS[i]})
    if i:
        fe.append({'id': f'fe{i}', 'fromNode': f'n{i-1}', 'toNode': f'n{i}', 'fromSide': 'right', 'toSide': 'left'})
fn.append({'id': 'fend', 'type': 'text', 'x': 40 + 8 * 420, 'y': 240, 'width': 400, 'height': 200, 'color': '5',
           'text': "## Et au bout ?\nUne machine de **8 192 octets** qui compile du C, démarre un système, "
                   "édite des fichiers sur un disque de 64 Ko et va chercher une page sur Internet.\n\n"
                   "→ *Chapitre quinzième : ce que 255 nous a appris.*"})
fe.append({'id': 'fe-end', 'fromNode': 'n7', 'toNode': 'fend', 'fromSide': 'right', 'toSide': 'left'})
json.dump({'nodes': fn, 'edges': fe}, open(os.path.join(OUT, FRISE + '.canvas'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('✔', FRISE + '.canvas', f'({len(fn)} nœuds · {len(fe)} arêtes)')

# ---------------------------------------------------------------- BASES
open(os.path.join(OUT, BASE + '.base'), 'w', encoding='utf-8').write(f'''filters:
  and:
    - file.inFolder("{VP}")
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
print('✔', BASE + '.base')

open(os.path.join(OUT, BASE2 + '.base'), 'w', encoding='utf-8').write(f'''filters:
  and:
    - file.inFolder("{VP}")
    - file.hasTag("empire-contre-intox/dossier-xxvii")
views:
  - type: table
    name: L'appareil du dossier
    filters:
      and:
        - 'ordre >= 90'
    order:
      - file.name
      - ordre
      - formules
      - experiences
      - instructions
      - fiches
      - doi
    sort:
      - property: ordre
        direction: ASC
  - type: cards
    name: Les chapitres
    filters:
      and:
        - 'chapitre != null'
    order:
      - file.name
      - chapitre
    sort:
      - property: chapitre
        direction: ASC
''')
print('✔', BASE2 + '.base')
