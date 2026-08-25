#!/usr/bin/env python3
# Le niveau supérieur du coffre : super tableau de bord + carte de l'Empire,
# construits depuis index.html (28 dossiers, 7 parcours, décret, manifeste).
import os, re, json, shutil, glob
from bs4 import BeautifulSoup, NavigableString

REPO = '/Users/olivierveinand/Documents/DEV/empire-contre-intox'
VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
ECI = os.path.join(VAULT, 'Empire contre Intox')
VPATH = 'Empire contre Intox'
ASSETS = os.path.join(ECI, '_assets')
SITE = 'https://empire-contre-intox.com/'
DASH = 'Empire contre Intox — tableau de bord'
CARTE = "Empire contre Intox — la carte de l'Empire"
UMB = "Empire contre Intox — l'index des dossiers"
BASE = 'Empire contre Intox — toutes les notes'
TODAY = '2026-08-25'

os.makedirs(ASSETS, exist_ok=True)
soup = BeautifulSoup(open(os.path.join(REPO, 'index.html'), encoding='utf-8').read(), 'html.parser')

def wr(name, s): open(os.path.join(ECI, name), 'w', encoding='utf-8').write(s)
def rd(name): return open(os.path.join(ECI, name), encoding='utf-8').read()
def txt(el, sep=' '): return re.sub(r'\s+', ' ', el.get_text(sep, strip=True)).strip() if el else ''

# ---------------------------------------------------------------- dossiers déjà exportés
EXPORTED = {}       # "Dossier V" -> dict(moc, dash, folder)
for folder in sorted(glob.glob(os.path.join(ECI, 'Dossier *'))):
    if not os.path.isdir(folder):
        continue
    base = os.path.basename(folder)
    num = base.split(' — ')[0].replace('Dossier ', '')
    mocs = [os.path.splitext(os.path.basename(p))[0]
            for p in glob.glob(os.path.join(folder, f'Dossier {num} — *.md'))]
    dashes = [os.path.splitext(os.path.basename(p))[0]
              for p in glob.glob(os.path.join(folder, 'Tableau de bord*.md'))]
    canv = [os.path.basename(p) for p in glob.glob(os.path.join(folder, '*.canvas'))]
    notes = len(glob.glob(os.path.join(folder, '**', '*.md'), recursive=True))
    if mocs:
        EXPORTED[f'Dossier {num}'] = {'moc': mocs[0], 'dash': dashes[0] if dashes else None,
                                      'folder': base, 'notes': notes, 'canvas': canv}
print('déjà exportés :', list(EXPORTED))

# ---------------------------------------------------------------- extraction des cartes
groups = []
for g in soup.select('.dossier-group'):
    head = g.select_one('.group-head')
    roman = txt(head.select_one('.group-roman'))
    title = txt(head.select_one('h3'))
    desc = txt(head.select_one('.group-head > p'))
    count = txt(head.select_one('.group-count'))
    cards = []
    for art in g.select('article.dossier'):
        no = txt(art.select_one('.dossier-no'))
        badge = txt(art.select_one('.badge'))
        t = txt(art.select_one('h3'))
        d = txt(art.select_one('.dossier-body > p'))
        tags = [txt(x) for x in art.select('.tags .tag')]
        who = txt(art.select_one('.byline .who strong'))
        note = txt(art.select_one('.byline .note'))
        href = (art.select_one('a.dossier-link') or {}).get('href', '').lstrip('/')
        img = (art.select_one('.dossier-media img') or {}).get('src', '')
        if no and not re.fullmatch(r'Dossier [IVXLC]+', no):
            no = ''          # carte d'agenda : pas un dossier numéroté
        cards.append({'no': no, 'badge': badge, 'title': t, 'desc': d, 'tags': tags,
                      'who': who, 'note': note, 'href': href, 'img': img})
    groups.append({'roman': roman, 'title': title, 'desc': desc, 'count': count, 'cards': cards})

n_num = sum(1 for g in groups for c in g['cards'] if c['no'])
n_agenda = sum(1 for g in groups for c in g['cards'] if not c['no'])
print(f'{len(groups)} parcours · {n_num} dossiers numérotés · {n_agenda} carte(s) agenda')

# décret
decret = []
for it in soup.select('#decret .step, #decret li, #decret article'):
    strong = it.find(['h3', 'h4', 'strong', 'b'])
    label = txt(strong)
    full = txt(it)
    label = re.sub(r'^[IVX]+\s*', '', label)
    body = re.sub(r'^[IVX]+\s*', '', full)
    if label and body.startswith(label):        # le libellé se répète en tête du corps
        body = body[len(label):].lstrip(' .·—')
    decret.append((label or f'Geste {len(decret)+1}', body))
lead = txt(soup.select_one('.lead'))
sec_head = txt(soup.select_one('.sec-head'))

# image d'accueil
og = os.path.join(REPO, 'assets', 'og-index.jpg')
if os.path.exists(og):
    shutil.copy2(og, os.path.join(ASSETS, 'og-index.jpg'))

# ---------------------------------------------------------------- plan des passerelles à faire
# (recoupements identifiés : dossiers d'origine des formules + thèmes croisés)
PLAN = [
    ('Dossier III', 'Artemis II', ['Dossier XIV'],
     "vis-viva, Tsiolkovsky, transfert de Hohmann — les 8 formules d'astrodynamique de l'atlas viennent d'ici"),
    ('Dossier XII', 'Tornades, Typhons & Ouragans', ['Dossier XIV'],
     "les 3 formules de vortex de l'atlas (Acte IV « Atmosphère & vortex ») viennent d'ici"),
    ('Dossier VII', 'Champs de vecteurs', ['Dossier XIV'],
     "les 5 formules de l'Acte III « Champs & lumière » viennent d'ici"),
    ('Dossier XVII', 'Atmosphères & Mondes Lointains', ['Dossier XIV'],
     "les 8 formules de l'Acte XV « Atmosphères & exoplanètes » viennent d'ici"),
    ('Dossier IV', "L'Horloge de l'Univers", ['Dossier V', 'Dossier XXV'],
     "nucléosynthèse et recombinaison (Mouvement III) ; flèche du temps et mort thermique (Acte VII)"),
    ('Dossier XIX', 'Les Sondes', ['Dossier XIV', 'Dossier III'],
     "mécanique orbitale et assistance gravitationnelle"),
    ('Dossier XXVII', "L'Ordinateur de 1983", ['Dossier XXV', 'Dossier XIV'],
     "limite de Landauer (Acte V), algorithmes et complexité (Acte XIV de l'atlas)"),
    ('Dossier XXVIII', 'Les Sources', ['Dossier V', 'Dossier XIV', 'Dossier XXV'],
     "l'appareil critique commun — chaque note « Sources » du coffre en est un extrait"),
    ('Dossier VI', 'La Vie de la Terre', ['Dossier IV', 'Dossier V'],
     "échelle des temps, abondance des éléments dans la croûte"),
]
EXPORTED_NUMS = set(EXPORTED)

# ---------------------------------------------------------------- SUPER TABLEAU DE BORD
d = [f'''---
projet: Empire contre Intox
type: tableau-de-bord-global
site: {SITE}
importé: {TODAY}
tags: [empire-contre-intox, tableau-de-bord, index]
aliases: ["ECI", "Tableau de bord ECI", "⌂ Empire contre Intox", "Accueil du coffre"]
---

# ⌂ Empire contre Intox — tableau de bord

![Le hero de l'accueil|600](_assets/og-index.jpg)

> [!info] Le fonds documentaire du collectif
> {lead}
>
> **{n_num} dossiers** en **{len(groups)} parcours thématiques**, publiés sur [empire-contre-intox.com]({SITE}) et sur le [miroir GitHub Pages](https://thesamlepirate.github.io/empire-contre-intox/). Devise : *Veritas omnia vincit*.

## L'Empire en chiffres

| Dossiers publiés | Parcours | Exportés dans Obsidian | Notes du coffre | Canvas | Bases |
| --- | --- | --- | --- | --- | --- |
| {n_num} | {len(groups)} | **{len(EXPORTED)}** | {{NOTES}} | {{CANVAS}} | {{BASES}} |

## Les dossiers exportés
''']
for num, info in sorted(EXPORTED.items(), key=lambda kv: len(kv[0])):
    card = next((c for g in groups for c in g['cards'] if c['no'] == num), None)
    t = card['title'] if card else info['moc']
    who = card['who'] if card else ''
    d.append(f'### 📦 {num} — [[{info["moc"]}|{t}]]\n')
    if card:
        d.append(f'*{card["desc"]}*\n')
        d.append(f'**{who}** · {" · ".join(card["tags"])} · badge « {card["badge"]} »\n')
    links = []
    if info['dash']:
        links.append(f'[[{info["dash"]}|⌂ son tableau de bord]]')
    for c in info['canvas']:
        links.append(f'[[{c}|🗺️ {os.path.splitext(c)[0].split("— ")[-1]}]]')
    links.append(f'[🌐 en ligne]({SITE}{card["href"] if card else ""})')
    d.append(f'{info["notes"]} notes · ' + ' · '.join(links) + '\n')

d.append('## Avancement des exports\n')
d.append(f"À cocher au fil des exports (skill `dossier-to-obsidian`) — **{len(EXPORTED)}/{n_num}** faits :\n")
for g in groups:
    d.append(f'\n**{g["roman"]} · {g["title"]}**\n')
    for c in g['cards']:
        if not c['no']:
            continue
        if c['no'] in EXPORTED:
            d.append(f'- [x] {c["no"]} — [[{EXPORTED[c["no"]]["moc"]}|{c["title"]}]]')
        else:
            d.append(f'- [ ] {c["no"]} — **{c["title"]}** *({c["who"]})* — [en ligne]({SITE}{c["href"]})')

d.append('\n## Les sept parcours\n')
for g in groups:
    d.append(f'### {g["roman"]} · {g["title"]}\n')
    d.append(f'*{g["desc"]}* — {g["count"]}\n')
    d.append('| Dossier | Sujet | Auteurs | Tags |')
    d.append('| --- | --- | --- | --- |')
    for c in g['cards']:
        no = c['no'] or '📅 Agenda'
        if c['no'] in EXPORTED:
            name = f'📦 [[{EXPORTED[c["no"]]["moc"]}\\|{c["title"]}]]'
        else:
            name = f'[{c["title"]}]({SITE}{c["href"]})'
        who = c['who'] + (f' *({c["note"]})*' if c['note'] else '')
        d.append(f'| {no} | {name} | {who} | {" · ".join(c["tags"])} |')
    d.append('')

d.append('## Les liens à faire — le plan des passerelles\n')
d.append('Ce que chaque futur export devra relier à ce qui existe déjà dans le coffre '
         '(étape 8 de la skill). Les dossiers **déjà exportés** sont en gras : c\'est vers eux que '
         'pointeront les passerelles.\n')
d.append('| Dossier à exporter | Reliera à | Pourquoi |')
d.append('| --- | --- | --- |')
for num, title, targets, why in PLAN:
    if num in EXPORTED_NUMS:
        continue
    tg = []
    for t in targets:
        if t in EXPORTED:
            tg.append(f'**[[{EXPORTED[t]["moc"]}\\|{t}]]**')
        else:
            tg.append(t)
    d.append(f'| {num} — {title} | {" · ".join(tg)} | {why} |')
d.append('')
d.append('Les passerelles **déjà posées** dans le coffre :\n')
d.append('- **Dossier XXV ↔ Dossier V** — fond diffus (Acte VII ↔ Mouvement III), spin (Acte IV ↔ Mouvement I), '
         'quanta (Acte III ↔ Mouvement VI), états quantiques (Acte V ↔ Mouvement V) ;\n'
         '- **Dossier XIV ↔ Dossier V** — Bohr, Rydberg, Born, Klechkowski mis en ateliers ;\n'
         '- **Dossier XIV ↔ Dossier XXV** — Carnot, Boltzmann, et le Maxwell des quatre équations '
         'distingué du démon de Maxwell.\n')

d.append('## Le décret méthodologique\n')
d.append('*Comprendre le réel avant de débattre du faux. Nos dossiers ne demandent pas qu\'on les croie : '
         'ils montrent **comment on sait**.*\n')
for i, (label, body) in enumerate(decret, 1):
    d.append(f'{i}. **{label}** — {body}')
d.append('')

d.append('## Ressources du projet\n\n'
         f'| | |\n| --- | --- |\n'
         f'| 🌐 [Le site]({SITE}) | 🪞 [Miroir GitHub Pages](https://thesamlepirate.github.io/empire-contre-intox/) |\n'
         f'| 📡 [Flux RSS]({SITE}rss.xml) | 📜 [Licence CC BY-NC-ND 4.0]({SITE}LICENCE-CONTENU.md) |\n'
         f'| 🔬 [Dossier XXVIII · Les Sources]({SITE}sources/sources.html) | 📅 [Calendrier des lives]({SITE}empire-calendrier) |\n'
         f'| 🗂️ [[{UMB}\\|L\'index détaillé des dossiers]] | 🗺️ [[{CARTE}.canvas\\|La carte de l\'Empire (canvas)]] |\n')

d.append('## Toutes les notes du coffre\n')
d.append(f'![[{BASE}.base]]')
d.append('\n---\n*Veritas omnia vincit · Ad astra per aspera*')

# ---------------------------------------------------------------- base globale
wr(BASE + '.base', f'''filters:
  and:
    - file.inFolder("{VPATH}")
views:
  - type: table
    name: Toutes les notes
    order:
      - file.name
      - dossier
      - ordre
    sort:
      - property: dossier
        direction: ASC
      - property: ordre
        direction: ASC
  - type: table
    name: Les sommaires
    filters:
      and:
        - file.name.startsWith("Dossier ")
    order:
      - file.name
      - dossier
      - auteurs
''')

# compteurs du coffre (après création de la base, avant écriture du dashboard)
n_notes = len([p for p in glob.glob(os.path.join(ECI, '**', '*.md'), recursive=True)
               if '_assets' not in p]) + 1
n_canvas = len(glob.glob(os.path.join(ECI, '**', '*.canvas'), recursive=True)) + 1
n_bases = len(glob.glob(os.path.join(ECI, '**', '*.base'), recursive=True))
body = '\n'.join(d).replace('{NOTES}', str(n_notes)).replace('{CANVAS}', str(n_canvas)) \
                   .replace('{BASES}', str(n_bases))
wr(DASH + '.md', body + '\n')
print(f'✔ {DASH}.md')

# ---------------------------------------------------------------- CARTE DE L'EMPIRE (canvas)
NW, NH = 400, 300
GAP, PADX, PADY = 40, 40, 90
COLORS = {'I': '2', 'II': '4', 'III': '5', 'IV': '6', 'V': '3', 'VI': '1', 'VII': '3'}
nodes, edges = [], []
nodes.append({'id': 'hub', 'type': 'file', 'file': f'{VPATH}/{DASH}.md',
              'x': 40, 'y': 40, 'width': 640, 'height': 420, 'color': '3'})
nodes.append({'id': 'umb', 'type': 'file', 'file': f'{VPATH}/{UMB}.md',
              'x': 720, 'y': 40, 'width': 480, 'height': 420})
nodes.append({'id': 'devise', 'type': 'text', 'x': 1240, 'y': 40, 'width': 480, 'height': 420,
              'color': '3',
              'text': "# Empire contre Intox\n\n**28 dossiers · 7 parcours**\n\n"
                      "*Le réel est déjà vertigineux.*\n\n"
                      "📦 = exporté dans Obsidian\n🌐 = encore en ligne seulement\n\n"
                      "**Veritas omnia vincit**"})
y = 560
for g in groups:
    cards = [c for c in g['cards']]
    cols = 4
    rows = (len(cards) + cols - 1) // cols
    gh = PADY + rows * (NH + GAP) + GAP
    gw = PADX * 2 + cols * (NW + GAP)
    gid = f'g{g["roman"]}'
    nodes.append({'id': gid, 'type': 'group', 'x': 40, 'y': y, 'width': gw, 'height': gh,
                  'color': COLORS.get(g['roman'], '6'),
                  'label': f'{g["roman"]} · {g["title"]} — {g["count"]}'})
    edges.append({'id': f'e-{gid}', 'fromNode': 'hub', 'toNode': gid,
                  'fromSide': 'bottom', 'toSide': 'top', 'label': g['title']})
    for i, c in enumerate(cards):
        r, col = divmod(i, cols)
        x = 40 + PADX + col * (NW + GAP)
        yy = y + PADY + r * (NH + GAP)
        nid = f'{gid}-{i}'
        if c['no'] in EXPORTED:
            nodes.append({'id': nid, 'type': 'file',
                          'file': f'{VPATH}/{EXPORTED[c["no"]]["folder"]}/{EXPORTED[c["no"]]["moc"]}.md',
                          'x': x, 'y': yy, 'width': NW, 'height': NH, 'color': '4'})
        else:
            no = c['no'] or '📅 Carte agenda'
            tags = ' · '.join(c['tags'][:3])
            nodes.append({'id': nid, 'type': 'text', 'x': x, 'y': yy, 'width': NW, 'height': NH,
                          'text': f'### {no}\n**{c["title"]}**\n\n{c["desc"][:150]}\n\n'
                                  f'*{c["who"]}*\n{tags}\n\n[🌐 Lire en ligne]({SITE}{c["href"]})'})
    y += gh + 80
json.dump({'nodes': nodes, 'edges': edges},
          open(os.path.join(ECI, CARTE + '.canvas'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print(f'✔ {CARTE}.canvas — {len(nodes)} nœuds, {len(edges)} arêtes')

# ---------------------------------------------------------------- câblage : index + MOC des dossiers
s = rd(UMB + '.md')
if DASH not in s:
    s = s.replace('# Empire contre Intox — l\'index des dossiers\n',
                  "# Empire contre Intox — l'index des dossiers\n\n"
                  f'> [!tip] Le poste de pilotage\n> [[{DASH}|⌂ Tableau de bord de l\'Empire]] · '
                  f'[[{CARTE}.canvas|🗺️ La carte de l\'Empire]]\n', 1)
    wr(UMB + '.md', s)
    print('✔ index parapluie → tableau de bord')

for num, info in EXPORTED.items():
    p = os.path.join(info['folder'], info['moc'] + '.md')
    s = rd(p)
    if DASH in s:
        continue
    s = s.replace(f"- [[{UMB}|⌂ L'index des dossiers]]",
                  f"- [[{DASH}|⌂ Tableau de bord de l'Empire]] — le poste de pilotage du coffre\n"
                  f"- [[{UMB}|L'index des dossiers]] — les vingt-huit dossiers du site")
    wr(p, s)
    print('✔ MOC câblé :', info['moc'])
print('✔ terminé')
