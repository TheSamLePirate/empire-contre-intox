#!/usr/bin/env python3
# Enrichit le dossier Obsidian « Dossier XXV — Entropie » avec les
# fonctionnalités natives d'Obsidian : aliases, tags imbriqués, liens profonds
# vers les titres, identifiants de blocs (^formule-N), diagrammes Mermaid,
# fichier Base (.base) et Canvas (.canvas).
# À lancer APRÈS entropie_to_obsidian.py et portraits_formulaire_to_obsidian.py.
import os, re, json

OUT = '/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/Dossier XXV — Entropie'
MOC = "Dossier XXV — L'entropie, le temps et l'Univers"
GALERIE = "Portraits — la galerie des savants"
FORMULAIRE = "Formulaire — toutes les formules du dossier"
CANVAS = "Les bâtisseurs — frise"
BASE = "Portraits des savants"

def rd(p):
    return open(os.path.join(OUT, p), encoding='utf-8').read()

def wr(p, s):
    open(os.path.join(OUT, p), 'w', encoding='utf-8').write(s)

def files():
    out = []
    for root, dirs, fs in os.walk(OUT):
        dirs[:] = [d for d in dirs if d != '_assets']
        for f in fs:
            if f.endswith('.md'):
                out.append(os.path.relpath(os.path.join(root, f), OUT))
    return sorted(out)

ACTE_NOTES = sorted(f for f in files() if re.match(r'0\d — ', f))

# fiche → (fichier, acte romain, n° fiche, aliases)
SAVANTS = [
    ('Sadi Carnot', 'I', 1, ['Carnot']),
    ('Julius Robert von Mayer', 'I', 2, ['Mayer', 'Robert Mayer']),
    ('James Prescott Joule', 'I', 3, ['Joule']),
    ('Hermann von Helmholtz', 'I', 4, ['Helmholtz']),
    ('Rudolf Clausius', 'II', 5, ['Clausius']),
    ('William Thomson, Lord Kelvin', 'II', 6, ['Kelvin', 'Lord Kelvin', 'William Thomson']),
    ("L'Énoncé de Kelvin-Planck", 'II', 7, ['Kelvin-Planck', 'Énoncé de Kelvin-Planck']),
    ('James Clerk Maxwell', 'II', 8, ['Maxwell']),
    ('Ludwig Boltzmann', 'III', 9, ['Boltzmann']),
    ('Josiah Willard Gibbs', 'III', 10, ['Gibbs']),
    ('Claude Shannon', 'IV', 11, ['Shannon']),
    ('Alfréd Rényi', 'IV', 12, ['Rényi', 'Renyi']),
    ('Jacob Bekenstein', 'V', 13, ['Bekenstein']),
    ('Stephen Hawking', 'V', 14, ['Hawking']),
    ('Roger Penrose', 'V', 15, ['Penrose']),
    ('Lee Smolin', 'V', 16, ['Smolin']),
]
ACTES_PORTRAITS = {
    'I': 'Acte I — Les fondateurs de la thermodynamique',
    'II': 'Acte II — Le mot, les lois et le démon',
    'III': 'Acte III — La révolution statistique',
    'IV': "Acte IV — L'entropie de l'information",
    'V': "Acte V — L'entropie, la gravité et le cosmos",
}

def yaml_list(items):
    return '[' + ', '.join(f'"{i}"' for i in items) + ']'

# ---------------------------------------------------------------- 1. frontmatter
def edit_front(path, aliases=None, extra=None, rename=None):
    s = rd(path)
    m = re.match(r'^---\n(.*?)\n---\n', s, re.S)
    if not m:
        return
    fm = m.group(1)
    fm = fm.replace('tags: [empire-contre-intox,', 'tags: [empire-contre-intox/dossier-xxv,')
    for old, new in (rename or {}).items():
        fm = re.sub(rf'^{old}:', f'{new}:', fm, flags=re.M)
    add = []
    if aliases and 'aliases:' not in fm:
        add.append(f'aliases: {yaml_list(aliases)}')
    for k, v in (extra or {}).items():
        if f'{k}:' not in fm:
            add.append(f'{k}: {v}')
    fm = fm + ('\n' + '\n'.join(add) if add else '')
    wr(path, f'---\n{fm}\n---\n' + s[m.end():])

edit_front(MOC + '.md', aliases=['Dossier XXV', 'Entropie — Dossier XXV'])
edit_front(FORMULAIRE + '.md', aliases=['Formulaire entropie', 'Les 18 formules'])
edit_front(GALERIE + '.md', aliases=["Les Bâtisseurs de l'Entropie", 'Portraits des savants'])
edit_front('Lexique — cinquante-cinq mots définis simplement.md', aliases=['Lexique entropie'])
for f in ACTE_NOTES:
    m = re.match(r'0(\d) — (.*)\.md$', f)
    ordre = int(m.group(1))
    titre = m.group(2)
    am = re.match(r'Acte ([IVX]+)', titre)
    extra = {'ordre': ordre}
    if am:
        extra['acte'] = f'"{am.group(1)}"'
    edit_front(f, aliases=[f'Entropie — {titre.split(" — ")[0]}' if ' — ' in titre else titre],
               extra=extra)
for name, acte, num, aliases in SAVANTS:
    edit_front(os.path.join('Portraits', name + '.md'),
               aliases=aliases, extra={'acte': f'"{acte}"', 'fiche': num},
               rename={'épithète': 'epithete'})
print('✔ frontmatter : aliases, tags imbriqués, propriétés acte/fiche/ordre')

# ---------------------------------------------------------------- 2. ^formule-N dans les notes d'acte + portraits
def tag_formulas(path, start):
    s = rd(path)
    lines = s.split('\n')
    out, n, i = [], start, 0
    while i < len(lines):
        out.append(lines[i])
        if lines[i].startswith('> [!abstract]'):
            i += 1
            while i < len(lines) and lines[i].startswith('>'):
                out.append(lines[i])
                i += 1
            n += 1
            out.append(f'^formule-{n}')
            continue
        i += 1
    wr(path, '\n'.join(out))
    return n

count = 0
for f in ACTE_NOTES:
    count = tag_formulas(f, count)
count = tag_formulas('Portraits/James Prescott Joule.md', count)
count = tag_formulas('Portraits/Ludwig Boltzmann.md', count)
print(f'✔ identifiants de blocs ^formule-1 … ^formule-{count}')

# ---------------------------------------------------------------- 3. Formulaire : liens profonds + ^eq-N + tip transclusion
s = rd(FORMULAIRE + '.md')
s = re.sub(r'\[\[(\d\d — [^\]|]+)\|([^\]]+)\]\] · chapitre (\d+), ([^\n]+)',
           r'[[\1#Chapitre \3 — \4|\2 · chapitre \3 — \4]]', s)
# ^eq-N après chaque équation $$…$$
lines = s.split('\n')
out, n = [], 0
for ln in lines:
    out.append(ln)
    if ln.startswith('$$') and ln.rstrip().endswith('$$'):
        n += 1
        out.append(f'^eq-{n}')
s = '\n'.join(out)
tip = ("> [!tip]- Transclusion — réutiliser une formule ailleurs\n"
       "> Chaque formule porte deux identifiants de bloc : `^formule-N` dans sa note d'origine "
       "(le bloc complet, avec « Se lit » et la note) et `^eq-N` ici (l'équation seule). "
       "Pour l'embarquer dans n'importe quelle note du coffre : "
       "`![[01 — Acte I — Transformer la chaleur en travail#^formule-1]]` ou "
       f"`![[{FORMULAIRE}#^eq-1]]`.\n")
s = s.replace('\n\n## Acte I', f'\n\n{tip}\n## Acte I', 1)
# carte des entropies en Mermaid
mermaid_map = '''## La carte des entropies

```mermaid
flowchart TD
  C["Clausius · 1865<br/>dS = δQ_rev / T<br/>(J/K)"] -->|"compter au lieu de mesurer"| B["Boltzmann · 1877<br/>S = k_B ln Ω<br/>(J/K)"]
  B -->|"états non équiprobables"| G["Gibbs · 1902<br/>S = −k_B Σ p ln p<br/>(J/K)"]
  G -->|"même forme, autre objet"| S["Shannon · 1948<br/>H = −Σ p log₂ p<br/>(bits)"]
  G -->|"états quantiques"| N["von Neumann · 1932<br/>S = −k Tr(ρ ln ρ)<br/>(J/K)"]
  N -->|"horizon des trous noirs"| BH["Bekenstein-Hawking · 1972-74<br/>S = k_B c³ A / 4Għ<br/>(J/K)"]
  S -.->|"Landauer : effacer coûte"| N
```

*Une famille de concepts reliés sans être identiques — le fil rouge de la [[08 — Conclusion — Ce que mesure vraiment l'entropie|conclusion]].*
'''
s = s.replace('## Acte I', mermaid_map + '\n## Acte I', 1)
wr(FORMULAIRE + '.md', s)
print(f'✔ Formulaire : liens profonds vers les chapitres, ^eq-1…^eq-{n}, carte Mermaid')

# ---------------------------------------------------------------- 4. Mermaid : carte des potentiels (acte IV)
f4 = next(f for f in ACTE_NOTES if f.startswith('04'))
s = rd(f4)
pot = '''
```mermaid
flowchart LR
  U["U — énergie interne<br/>variables : S, V"] -->|"+ PV (pression imposée)"| H["H — enthalpie<br/>variables : S, P"]
  U -->|"− TS (température imposée)"| F["F — énergie libre de Helmholtz<br/>variables : T, V<br/>ΔF ≤ 0"]
  H -->|"− TS"| G["G — enthalpie libre de Gibbs<br/>variables : T, P<br/>ΔG ≤ 0"]
  F -->|"+ PV"| G
```
'''
anchor = re.search(r'> \[!example\] 🗺️ Schéma \(sur la page en ligne\)\n> Carte des quatre potentiels[^\n]*\n(?:>[^\n]*\n)*', s)
if anchor and '```mermaid' not in s[anchor.start():anchor.end() + 200]:
    s = s[:anchor.end()] + pot + s[anchor.end():]
    wr(f4, s)
    print('✔ Acte IV : carte des quatre potentiels en Mermaid')

# ---------------------------------------------------------------- 5. Liens automatiques vers les fiches (1re occurrence par note)
LINK_TARGETS = [(alias, name) for name, _, _, aliases in SAVANTS for alias in [aliases[0]]]
LINK_TARGETS.sort(key=lambda t: -len(t[0]))          # Kelvin-Planck avant Kelvin

def linkable(line, in_math):
    st = line.strip()
    return not (st.startswith('#') or st.startswith('^') or st.startswith('```')
                or st.startswith('$$') or in_math or st.startswith('!['))

def spans_to_skip(line):
    spans = [(m.start(), m.end()) for m in re.finditer(r'\[\[.*?\]\]', line)]
    spans += [(m.start(), m.end()) for m in re.finditer(r'\]\(.*?\)', line)]
    spans += [(m.start(), m.end()) for m in re.finditer(r'\$[^$]*\$', line)]
    spans += [(m.start(), m.end()) for m in re.finditer(r'`[^`]*`', line)]
    return spans

TARGET_FILES = ACTE_NOTES + ['Lexique — cinquante-cinq mots définis simplement.md',
                             FORMULAIRE + '.md', MOC + '.md'] \
               + [os.path.join('Portraits', n + '.md') for n, _, _, _ in SAVANTS]
linked = 0
for path in TARGET_FILES:
    s = rd(path)
    body_start = s.find('---', 4) + 4 if s.startswith('---') else 0
    lines = s[body_start:].split('\n')
    self_name = os.path.basename(path)[:-3]
    done = set()
    fence = False
    for alias, target in LINK_TARGETS:
        if target == self_name or alias in done:
            continue
        pat = re.compile(rf'(?<![\w\[\|/–-]){re.escape(alias)}(?![\w\]\|–-])')
        placed = False
        fence = False
        for i, ln in enumerate(lines):
            if ln.strip().startswith('```'):
                fence = not fence
                continue
            if not linkable(ln, fence):
                continue
            skip = spans_to_skip(ln)
            for m in pat.finditer(ln):
                if any(a <= m.start() < b for a, b in skip):
                    continue
                lines[i] = ln[:m.start()] + f'[[{target}|{alias}]]' + ln[m.end():]
                placed = True
                linked += 1
                break
            if placed:
                break
        if placed:
            done.add(alias)
    wr(path, s[:body_start] + '\n'.join(lines))
print(f'✔ {linked} liens automatiques vers les fiches des savants')

# ---------------------------------------------------------------- 6. MOC : liens profonds des chapitres du sommaire
s = rd(MOC + '.md')
for f in ACTE_NOTES:
    note = f[:-3]
    body = rd(f)
    heads = re.findall(r'^## (Chapitre \d+ — (.*))$', body, re.M)
    for full, title in heads:
        bullet = f'\t- {title}'
        deep = f'\t- [[{note}#{full}|{title}]]'
        if bullet in s:
            s = s.replace(bullet + '\n', deep + '\n', 1)
wr(MOC + '.md', s)
print('✔ Sommaire : chapitres en liens profonds [[note#Chapitre N]]')

# ---------------------------------------------------------------- 7. Base « Portraits des savants »
base = f'''filters:
  and:
    - file.inFolder("Empire contre Intox/Dossier XXV — Entropie/Portraits")
views:
  - type: table
    name: Les seize fiches
    order:
      - file.name
      - dates
      - epithete
      - acte
      - fiche
    sort:
      - property: fiche
        direction: ASC
  - type: cards
    name: Galerie
    order:
      - file.name
      - dates
    sort:
      - property: fiche
        direction: ASC
'''
wr(BASE + '.base', base)
s = rd(GALERIE + '.md')
if BASE not in s:
    s = s.replace('## Les seize fiches\n',
                  f'## Les seize fiches\n\n![[{BASE}.base]]\n')
    wr(GALERIE + '.md', s)
print('✔ Base « Portraits des savants » (table + cartes), embarquée dans la galerie')

# ---------------------------------------------------------------- 8. Canvas : frise des bâtisseurs
NW, NH, GAP, GPAD = 400, 500, 40, 80
nodes, edges = [], []
prev = None
groups = {}
for name, acte, num, _ in SAVANTS:
    groups.setdefault(acte, []).append((name, num))
y = 0
gcolors = {'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5'}
pos = {}
for acte, members in groups.items():
    gw = len(members) * (NW + GAP) + GAP
    nodes.append({'id': f'group-{acte}', 'type': 'group', 'label': ACTES_PORTRAITS[acte],
                  'x': 0, 'y': y, 'width': gw, 'height': NH + GPAD + GAP,
                  'color': gcolors[acte]})
    for j, (name, num) in enumerate(members):
        nid = f'fiche-{num:02d}'
        x = GAP + j * (NW + GAP)
        nodes.append({'id': nid, 'type': 'file',
                      'file': f'Empire contre Intox/Dossier XXV — Entropie/Portraits/{name}.md',
                      'x': x, 'y': y + GPAD, 'width': NW, 'height': NH})
        pos[nid] = (x, y)
        if prev:
            same_row = pos[prev][1] == y
            edges.append({'id': f'edge-{prev}-{nid}', 'fromNode': prev, 'toNode': nid,
                          'fromSide': 'right' if same_row else 'bottom',
                          'toSide': 'left' if same_row else 'top'})
        prev = nid
    y += NH + GPAD + GAP + 120
canvas = {'nodes': nodes, 'edges': edges}
wr(CANVAS + '.canvas', json.dumps(canvas, ensure_ascii=False, indent=1))
print('✔ Canvas « Les bâtisseurs — frise » (16 fiches, 5 actes, chaîne des idées)')

# ---------------------------------------------------------------- 9. MOC : référencer canvas + base
s = rd(MOC + '.md')
if CANVAS not in s:
    s = s.replace(
        "- [[Portraits — la galerie des savants|Portraits — Les Bâtisseurs de l'Entropie (16 fiches, par Lalie)]]",
        "- [[Portraits — la galerie des savants|Portraits — Les Bâtisseurs de l'Entropie (16 fiches, par Lalie)]]\n"
        f"- [[{CANVAS}.canvas|Frise visuelle des seize savants (canvas)]]")
    wr(MOC + '.md', s)
    print('✔ Sommaire : lien vers le canvas')
