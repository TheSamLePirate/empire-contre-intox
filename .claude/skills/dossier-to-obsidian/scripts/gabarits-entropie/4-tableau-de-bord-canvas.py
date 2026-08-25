#!/usr/bin/env python3
# Ajoute au dossier Obsidian « Dossier XXV — Entropie » :
#  - un canvas « Carte du dossier » (vue d'ensemble navigable),
#  - un tableau de bord (accès rapide, chiffres, progression, transclusions),
#  - une base « lecture » listant les notes du dossier,
#  - des identifiants ^retenir-N sur les 7 « À retenir » (transclusion).
import os, re, json, glob

OUT = '/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/Dossier XXV — Entropie'
VPATH = 'Empire contre Intox/Dossier XXV — Entropie'
MOC = "Dossier XXV — L'entropie, le temps et l'Univers"
FORMULAIRE = "Formulaire — toutes les formules du dossier"
GALERIE = "Portraits — la galerie des savants"
LEXIQUE = "Lexique — cinquante-cinq mots définis simplement"
DASH = "Tableau de bord — Entropie"
CARTE = "Carte du dossier — Entropie"
FRISE = "Les bâtisseurs — frise"
LBASE = "Dossier XXV — lecture"
SITE = 'https://empire-contre-intox.com/provoxys/entropie/'

def rd(p): return open(os.path.join(OUT, p), encoding='utf-8').read()
def wr(p, s): open(os.path.join(OUT, p), 'w', encoding='utf-8').write(s)

os.chdir(OUT)
READ_NOTES = sorted(f[:-3] for f in glob.glob('0* — *.md'))
short = {n: n.split(' — ', 1)[1] for n in READ_NOTES}

# ---------------------------------------------------------------- 1. ^retenir-N sur les « À retenir »
retenir = []          # (note, id, roman)
for n in READ_NOTES:
    s = rd(n + '.md')
    lines = s.split('\n')
    out, i = [], 0
    changed = False
    while i < len(lines):
        out.append(lines[i])
        m = re.match(r"> \[!important\] À retenir — l'acte ([IVX]+) en une phrase", lines[i])
        if m:
            i += 1
            while i < len(lines) and lines[i].startswith('>'):
                out.append(lines[i]); i += 1
            num = len(retenir) + 1
            rid = f'retenir-{num}'
            retenir.append((n, rid, m.group(1)))
            if i < len(lines) and lines[i].startswith('^retenir-'):
                out.append(lines[i]); i += 1
            else:
                out.append(f'^{rid}'); changed = True
            continue
        i += 1
    if changed:
        wr(n + '.md', '\n'.join(out))
print(f'✔ ^retenir-1 … ^retenir-{len(retenir)} posés sur les « À retenir »')

# ---------------------------------------------------------------- 2. chiffres réels
all_md = glob.glob('**/*.md', recursive=True)
chapitres = sum(len(re.findall(r'^## Chapitre \d+', rd(f), re.M)) for f in all_md)
mots = sum(len(rd(n + '.md').split()) for n in READ_NOTES)
lecture = f'≈ {round(mots / 180 / 15) * 15} min' if mots / 180 < 90 else f'≈ {mots / 180 / 60:.0f} h'
stats = {'notes': len(all_md) + 1, 'chapitres': chapitres, 'formules': 18,
         'termes': 55, 'portraits': 16, 'labos': 26, 'lecture': f'≈ 2 h'}

# ---------------------------------------------------------------- 3. base « lecture »
wr(LBASE + '.base', f'''filters:
  and:
    - file.inFolder("{VPATH}")
    - '!file.hasTag("portrait")'
views:
  - type: table
    name: Notes du dossier
    order:
      - file.name
      - acte
      - ordre
    sort:
      - property: ordre
        direction: ASC
''')
print('✔ Base « Dossier XXV — lecture »')

# ---------------------------------------------------------------- 4. tableau de bord
d = []
d.append(f'''---
projet: Empire contre Intox
dossier: XXV
titre-dossier: "L'entropie, le temps et l'Univers"
importé: 2026-08-25
tags: [empire-contre-intox/dossier-xxv, entropie, tableau-de-bord]
aliases: ["Tableau de bord", "Dashboard entropie", "⌂ Entropie"]
---

# ⌂ Tableau de bord — Entropie

![Hero du dossier|550](_assets/entropie-hero.png)

> [!info] Dossier XXV — « L'entropie, le temps et l'Univers »
> Le grand live de **Provoxys × Samlepirate** converti en notes reliées. Ce tableau de bord est le poste de pilotage du dossier : accès rapide, chiffres clés, progression de lecture et l'essentiel en transclusion.

## Accès rapide

|  |  |
| --- | --- |
| 📜 [[{MOC}\\|Sommaire du dossier]] | 🗺️ [[{CARTE}.canvas\\|Carte du dossier (canvas)]] |
| 🧮 [[{FORMULAIRE}\\|Formulaire — les 18 formules]] | 🖼️ [[{FRISE}.canvas\\|Frise des seize savants (canvas)]] |
| 📖 [[{LEXIQUE}\\|Lexique — 55 mots]] | 👤 [[{GALERIE}\\|Galerie des Bâtisseurs]] |
| 🌐 [Page en ligne]({SITE}) | 🎛️ [Simulateur de dynamique physique](https://thesamlepirate.github.io/simulation-chimie/) |

## Le dossier en chiffres

| Notes | Chapitres | Formules | Termes du lexique | Portraits | Labos (en ligne) | Lecture |
| --- | --- | --- | --- | --- | --- | --- |
| {stats['notes']} | {stats['chapitres']} | [[{FORMULAIRE}\\|{stats['formules']}]] | [[{LEXIQUE}\\|{stats['termes']}]] | [[{GALERIE}\\|{stats['portraits']}]] | [{stats['labos']}]({SITE}#labos) | {stats['lecture']} |

## Progression de lecture
''')
for n in READ_NOTES:
    d.append(f'- [ ] [[{n}|{short[n]}]]')
d.append(f'- [ ] [[{FORMULAIRE}|Réviser les 18 formules]]')
d.append(f'- [ ] [[{GALERIE}|Parcourir les 16 portraits]]')
d.append('\n## Le dossier en sept phrases\n')
d.append("Les « À retenir » des sept actes, transclus depuis leur note d'origine :\n")
for n, rid, roman in retenir:
    d.append(f'![[{n}#^{rid}]]')
d.append(f"\n## L'entropie en cinq idées\n")
d.append(f"![[{MOC}#L'entropie en cinq idées]]")
d.append('\n## La carte des entropies\n')
d.append(f'![[{FORMULAIRE}#La carte des entropies]]')
d.append('\n## Toutes les notes du dossier\n')
d.append(f'![[{LBASE}.base]]')
d.append('\n## Les seize savants\n')
d.append('![[Portraits des savants.base]]')
d.append(f'\n---\n[[{MOC}|⌂ Sommaire du dossier]] · *Veritas omnia vincit*')
wr(DASH + '.md', '\n'.join(d) + '\n')
print('✔ Tableau de bord — Entropie.md')

# ---------------------------------------------------------------- 5. canvas « Carte du dossier »
NW, NH = 420, 480
nodes, edges = [], []
nodes.append({'id': 'titre', 'type': 'text', 'x': 40, 'y': 10, 'width': 2260, 'height': 150,
              'color': '3',
              'text': "# Dossier XXV — L'entropie, le temps et l'Univers\n"
                      "**Provoxys × Samlepirate** — 7 actes · 26 chapitres · 18 formules · *Veritas omnia vincit*"})
pos = {}
for i, n in enumerate(READ_NOTES):
    row, col = divmod(i, 5)
    x, y = 40 + col * 460, 230 + row * 540
    nid = f'n{i:02d}'
    nodes.append({'id': nid, 'type': 'file', 'file': f'{VPATH}/{n}.md',
                  'x': x, 'y': y, 'width': NW, 'height': NH})
    pos[nid] = (row, col)
    if i:
        p = f'n{i-1:02d}'
        same = pos[p][0] == row
        edges.append({'id': f'e{i}', 'fromNode': p, 'toNode': nid,
                      'fromSide': 'right' if same else 'bottom',
                      'toSide': 'left' if same else 'top'})
X2 = 2400
nodes.append({'id': 'g-app', 'type': 'group', 'label': 'Appareil critique',
              'x': X2, 'y': 190, 'width': 520, 'height': 1320, 'color': '6'})
for j, (nid, fname) in enumerate([('moc', MOC), ('dash', DASH),
                                  ('form', FORMULAIRE), ('lex', LEXIQUE)]):
    nodes.append({'id': nid, 'type': 'file', 'file': f'{VPATH}/{fname}.md',
                  'x': X2 + 40, 'y': 260 + j * 310, 'width': 440, 'height': 280})
nodes.append({'id': 'g-bat', 'type': 'group', 'label': 'Les bâtisseurs (par Lalie)',
              'x': X2, 'y': 1570, 'width': 520, 'height': 700, 'color': '2'})
nodes.append({'id': 'gal', 'type': 'file', 'file': f'{VPATH}/{GALERIE}.md',
              'x': X2 + 40, 'y': 1640, 'width': 440, 'height': 280})
nodes.append({'id': 'frise', 'type': 'file', 'file': f'{VPATH}/{FRISE}.canvas',
              'x': X2 + 40, 'y': 1950, 'width': 440, 'height': 280})
edges += [
    {'id': 'e-moc', 'fromNode': 'moc', 'toNode': 'n00', 'fromSide': 'left', 'toSide': 'right',
     'label': 'commencer ici'},
    {'id': 'e-form', 'fromNode': 'n08', 'toNode': 'form', 'fromSide': 'right', 'toSide': 'left',
     'label': 'les 18 formules réunies'},
    {'id': 'e-gal', 'fromNode': 'n09', 'toNode': 'gal', 'fromSide': 'right', 'toSide': 'left',
     'label': 'les visages du live'},
]
wr(CARTE + '.canvas', json.dumps({'nodes': nodes, 'edges': edges}, ensure_ascii=False, indent=1))
print('✔ Canvas « Carte du dossier — Entropie »')

# ---------------------------------------------------------------- 6. MOC : liens tableau de bord + carte
s = rd(MOC + '.md')
if DASH not in s:
    s = s.replace('## Sommaire\n', f'## Sommaire\n\n- [[{DASH}|⌂ Tableau de bord du dossier]]', 1)
if CARTE not in s:
    s = s.replace(f'- [[{FRISE}.canvas|Frise visuelle des seize savants (canvas)]]',
                  f'- [[{FRISE}.canvas|Frise visuelle des seize savants (canvas)]]\n'
                  f'- [[{CARTE}.canvas|Carte du dossier (canvas)]]')
wr(MOC + '.md', s)
print('✔ Sommaire : liens tableau de bord + carte')

# ---------------------------------------------------------------- 7. validation
json.load(open(CARTE + '.canvas'))
names = {os.path.splitext(os.path.basename(p))[0] for p in glob.glob('**/*.md', recursive=True)}
names |= {FRISE + '.canvas', CARTE + '.canvas', 'Portraits des savants.base', LBASE + '.base'}
bad = []
for p in glob.glob('**/*.md', recursive=True):
    for m in re.finditer(r'!?\[\[([^\]|#]+)', rd(p)):
        t = m.group(1).strip()
        if t not in names:
            bad.append((p, t))
canvas_files = [n['file'] for n in nodes if n.get('type') == 'file']
missing = [f for f in canvas_files
           if not os.path.exists(os.path.join('/Users/olivierveinand/Documents/Obsidian Vault', f))]
print('liens cassés :', bad if bad else 'aucun', '· fichiers canvas manquants :', missing if missing else 'aucun')
