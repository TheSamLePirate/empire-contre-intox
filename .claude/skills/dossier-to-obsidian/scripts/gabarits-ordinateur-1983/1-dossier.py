#!/usr/bin/env python3
# Dossier XXVII « L'Ordinateur de 1983 » → notes Obsidian (MOC + 15 chapitres).
import os, re, json, shutil
from bs4 import BeautifulSoup, NavigableString

REPO = '/Users/olivierveinand/Documents/DEV/empire-contre-intox/samlepirate/ordinateur-1983'
SRC = os.path.join(REPO, 'index.html')
VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
OUT = os.path.join(VAULT, 'Empire contre Intox', 'Dossier XXVII — Ordinateur 1983')
ASSETS = os.path.join(OUT, '_assets')
SITE = 'https://empire-contre-intox.com/samlepirate/ordinateur-1983/'
MOC = "Dossier XXVII — L'Ordinateur de 1983"
FORM = 'Formulaire — les formules de la machine'
ISAN = "Jeu d'instructions — les 62 ordres de la machine"
BANC = "Le banc d'essai — les quinze expériences"
PROG = 'Les programmes de la machine — assembleur et C'
SOURCES = "Sources — la vérification de l'Ordinateur de 1983"
DASH = 'Tableau de bord — Ordinateur 1983'
TODAY = '2026-08-25'

os.makedirs(ASSETS, exist_ok=True)
soup = BeautifulSoup(open(SRC, encoding='utf-8').read(), 'html.parser')

# ---------------------------------------------------------------- helpers
def sanitize(name):
    return re.sub(r' +', ' ', re.sub(r'[:/\\|#^\[\]?*"<>]', '', name)).strip()

def resolve(href, text):
    if not href:
        return text
    if href.startswith('#'):
        return f'[{text}]({SITE}{href})'
    if href.startswith('http'):
        return f'[{text}]({href})'
    if href == '../../index.html':
        return f'[{text}](https://empire-contre-intox.com/)'
    if href.startswith('../../'):
        return f'[{text}](https://empire-contre-intox.com/{href[6:]})'
    if href.startswith('../'):
        return f'[{text}](https://empire-contre-intox.com/samlepirate/{href[3:]})'
    return f'[{text}]({SITE}{href})'

def inline(el):
    if isinstance(el, NavigableString):
        return str(el)
    parts = []
    for c in el.children:
        if isinstance(c, NavigableString):
            parts.append(str(c)); continue
        cls = c.get('class', []) or []
        if c.name in ('b', 'strong'):
            t = inline(c).strip()
            if t: parts.append(f'**{t}**')
        elif c.name in ('em', 'i'):
            t = inline(c).strip()
            if t: parts.append(f'*{t}*')
        elif c.name == 'code':
            t = re.sub(r'\s+', ' ', c.get_text()).strip()
            if t: parts.append(f'`{t}`')
        elif c.name == 'span' and 'imath' in cls:
            parts.append(f"${c.get('data-tex','').strip()}$")
        elif c.name == 'a':
            parts.append(resolve(c.get('href', ''), inline(c).strip()))
        elif c.name == 'br':
            parts.append(' ')
        elif c.name in ('sub', 'sup'):
            parts.append(f'<{c.name}>{inline(c).strip()}</{c.name}>')
        else:
            parts.append(inline(c))
    s = ''.join(parts)
    s = re.sub(r'[ \t\n]+', ' ', s)
    s = re.sub('\xa0 +', '\xa0', s)
    s = re.sub(' +\xa0', '\xa0', s)
    return s.strip()

def itext(el):
    return inline(el).strip() if el is not None else ''

def callout(kind, title, bodies, fold=''):
    lines = [f'> [!{kind}]{fold} {title}'.rstrip()]
    for b in bodies:
        if not b: continue
        for ln in b.split('\n'):
            lines.append(('> ' + ln).rstrip())
        lines.append('>')
    while lines and lines[-1] == '>':
        lines.pop()
    return '\n'.join(lines)

COUNT = {'formule': 0, 'retenir': 0, 'exp': 0, 'intox': 0}
FORMULAS = []          # (n, chapitre_no, titre, [tex], note)
LABS = []              # (n, chapitre_no, no, titre, kind, hint, foot, anchor)
RETAIN = []            # (n, chapitre_no, texte)
INTOX = []             # (n, chapitre_no, titre, texte)

def conv_formula(fb, chap):
    COUNT['formule'] += 1
    n = COUNT['formule']
    head = fb.find(class_='fb-head')
    tag = head.find(class_='fb-tag') if head else None
    tag_t = itext(tag) if tag else ''
    if tag: tag.extract()
    title = itext(head) if head else 'Formule'
    texs = [f['data-tex'].strip() for f in fb.find_all(class_='formula') if f.get('data-tex')]
    note = fb.find(class_='fb-note')
    note_t = itext(note) if note else ''
    body = [f'$${t}$$' for t in texs]
    if note_t: body.append(note_t)
    full = title + (f' · {tag_t}' if tag_t else '')
    FORMULAS.append((n, chap, full, texs, note_t))
    return callout('abstract', f'🧮 {full}', body) + f'\n^formule-{n}'

def conv_box(c, chap):
    cls = c.get('class', []) or []
    lbl = c.find(class_='block-label')
    title = itext(lbl) if lbl else ''
    if lbl: lbl.extract()
    body = conv_blocks(c, chap)
    if 'lesson-block' in cls:
        COUNT['retenir'] += 1
        RETAIN.append((COUNT['retenir'], chap, ' '.join(body)))
        t2 = title or "Ce qu'il faut retenir"
        return callout('important', f'📌 {t2}', body) + f'\n^retenir-{COUNT["retenir"]}'
    if 'question-block' in cls:
        kind = 'warning' if title.lower().startswith('anti-intox') else 'question'
        emoji = '⚠️' if kind == 'warning' else '❓'
        COUNT['intox'] += 1
        INTOX.append((COUNT['intox'], chap, title, ' '.join(body)))
        return callout(kind, f'{emoji} {title}', body) + f'\n^intox-{COUNT["intox"]}'
    if 'dialogue-block' in cls:
        return callout('quote', 'Le mot de Samlepirate', body)
    return callout('info', f'🔬 {title or "Encadré scientifique"}', body)

def conv_stele(c):
    head = c.find(class_='st-head')
    tag = head.find(class_='st-tag') if head else None
    tag_t = itext(tag) if tag else ''
    if tag: tag.extract()
    title = itext(head) if head else ''
    pre = c.find('pre')
    txt = pre.get_text().strip('\n') if pre else ''
    full = title + (f' · {tag_t}' if tag_t else '')
    return callout('note', f'🗒️ {full}', ['```\n' + txt + '\n```'])

def conv_figure(fig):
    cap = fig.find('figcaption')
    cap_t = itext(cap) if cap else ''
    img = fig.find('img')
    if img:
        name = os.path.basename(img.get('src', ''))
        p = os.path.join(REPO, img.get('src', ''))
        if os.path.exists(p):
            shutil.copy2(p, os.path.join(ASSETS, name))
        out = f'![{img.get("alt","")}](_assets/{name})'
        if cap_t: out += f'\n*{cap_t}*'
        return out
    return cap_t

MONO_TD = {'hex', 'op'}

def conv_table(wrap):
    table = wrap.find('table') if wrap.name != 'table' else wrap
    out = []
    cap = table.find('caption')
    if cap:
        out.append(f'*{itext(cap)}*')
        cap.extract()
    head = [itext(th) for th in table.thead.find_all('th')]
    lines = ['| ' + ' | '.join(head) + ' |', '|' + ' --- |' * len(head)]
    for tr in table.tbody.find_all('tr'):
        cells = []
        for td in tr.find_all('td'):
            t = itext(td).replace('|', '\\|')
            if MONO_TD & set(td.get('class') or []):
                t = f'`{t}`'
            cells.append(t)
        lines.append('| ' + ' | '.join(cells) + ' |')
    out.append('\n'.join(lines))
    return '\n\n'.join(out)

def conv_memmap(mm):
    lines = ['| Adresses | Zone | Taille |', '| --- | --- | --- |']
    for row in mm.find_all(class_='memrow'):
        a = itext(row.find(class_='ma'))
        b = row.find(class_='mb')
        name = itext(b.find('span'))
        size = itext(b.find('i'))
        lines.append(f'| `{a}` | {name} | {size} |')
    return '\n'.join(lines)

def conv_list(el, ordered=False):
    out = []
    for i, li in enumerate(el.find_all('li', recursive=False), 1):
        t = itext(li)
        out.append(f'{i}. {t}' if ordered else f'- {t}')
    return '\n'.join(out)

# --- les trois traductions C → assembleur, extraites du JS de la page
EXJS = re.search(r'const EX = (\{.*?\n      \});', open(SRC, encoding='utf-8').read(), re.S)
EX = {}
if EXJS:
    raw = EXJS.group(1)
    for key, label in (('somme', 'Une addition'), ('boucle', 'Une boucle for'), ('fact', 'Une fonction récursive')):
        m = re.search(key + r':\s*\{\s*size:\s*"(.*?)",\s*c:\s*"(.*?)",\s*asm:\s*"(.*?)",\s*\}', raw, re.S)
        if m:
            EX[key] = {'label': label, 'size': m.group(1),
                       'c': json.loads('"' + m.group(2) + '"'),
                       'asm': json.loads('"' + m.group(3) + '"')}

def conv_cc():
    out = []
    for key in ('somme', 'boucle', 'fact'):
        e = EX.get(key)
        if not e: continue
        out.append(callout('example', f'💻 {e["label"]} · {e["size"]}',
                           ['**Source C**\n```c\n' + e['c'] + '\n```',
                            '**Assembleur produit par le compilateur**\n```asm\n' + e['asm'] + '\n```'], fold='-'))
    return out

def conv_blocks(el, chap):
    out = []
    skip_next_labcols = False
    for c in el.children:
        if isinstance(c, NavigableString):
            continue
        cls = c.get('class', []) or []
        if c.get('id') == 'cc-tabs':
            out.extend(conv_cc()); skip_next_labcols = True; continue
        if 'lab-cols' in cls and skip_next_labcols:
            skip_next_labcols = False; continue
        if c.name == 'p' and 'lede' in cls:
            t = itext(c)
            if t: out.append(t)
        elif c.name == 'p':
            t = itext(c)
            if t: out.append(t)
        elif 'formula-block' in cls:
            out.append(conv_formula(c, chap))
        elif {'science-block', 'question-block', 'lesson-block', 'dialogue-block'} & set(cls):
            out.append(conv_box(c, chap))
        elif 'stele' in cls:
            out.append(conv_stele(c))
        elif 'memmap' in cls:
            out.append(conv_memmap(c))
        elif 'table-scroll' in cls or c.name == 'table':
            out.append(conv_table(c))
        elif 'chapter-figure' in cls or c.name == 'figure':
            out.append(conv_figure(c))
        elif c.name == 'ul':
            out.append(conv_list(c))
        elif c.name == 'ol':
            out.append(conv_list(c, ordered=True))
        elif c.name == 'h3':
            out.append(f'### {itext(c)}')
        elif c.name == 'h4':
            out.append(f'#### {itext(c)}')
        elif c.name == 'svg':
            continue
        elif c.name in ('div', 'aside', 'section'):
            out.extend(conv_blocks(c, chap))
    return out

def conv_sidenote(aside, chap):
    h3 = aside.find('h3')
    title = itext(h3) if h3 else 'En marge'
    if h3: h3.extract()
    tags = [itext(t) for t in aside.select('.tag-list .tag')]
    for tl in aside.select('.tag-list'):
        tl.extract()
    body = conv_blocks(aside, chap)
    if tags:
        body.append('*' + ' · '.join(tags) + '*')
    return callout('note', f'📎 En marge — {title}', body)

def conv_lab(lab, chap):
    COUNT['exp'] += 1
    n = COUNT['exp']
    head = lab.find(class_='lab-head')
    no = itext(head.find(class_='lab-no'))
    title = itext(head.find(class_='lab-title'))
    kind = itext(head.find(class_='lab-kind'))
    hint = lab.find(class_='lab-hint')
    foot = lab.find(class_='lab-foot')
    anchor = lab.get('id', '')
    hint_t = itext(hint) if hint else ''
    foot_t = itext(foot) if foot else ''
    LABS.append((n, chap, no, title, kind, hint_t, foot_t, anchor))
    body = []
    if hint_t: body.append(hint_t)
    if foot_t: body.append(foot_t)
    body.append(f'▶ **Expérience jouable** sur [la page du dossier]({SITE}#{anchor}) — rien de tout cela ne survit au Markdown.')
    return callout('example', f'🧪 {no} — {title} · *{kind}*', body, fold='-') + f'\n^exp-{n}'

# ---------------------------------------------------------------- extraction
main = soup.find('main')
hero = soup.find('header', class_='hero')
HERO = {
    'eyebrow': itext(hero.find(class_='eyebrow')),
    'title': itext(hero.find('h1')),
    'lead': itext(hero.find(class_='hero-lead')),
    'quote': itext(hero.find(class_='hero-quote')),
}
POST = []
for pl in hero.select('.post-line'):
    POST.append((itext(pl.find(class_='pk')), itext(pl.find(class_='pv')), itext(pl.find(class_='ps'))))

intro = main.find('section', id='intro')
MANIF = [itext(p) for p in intro.select('.manifesto > p') if 'section-kicker' not in (p.get('class') or [])]
MANIF_H = itext(intro.select_one('.manifesto h2'))
TIMELINE = []
for row in intro.select('.timeline-row'):
    TIMELINE.append((itext(row.find('time')), itext(row.find('p'))))

lp = main.find('section', class_='learning-panel')
OBJ_H = itext(lp.find('h2'))
OBJ = [(itext(it.find('span')), itext(it.find('p'))) for it in lp.select('.learning-item')]

cb = main.find('section', class_='credit-band')
CREDIT = itext(cb.find(class_='credit-text'))

closing = main.find('section', class_='closing')
CLOSE_H = itext(closing.find('h2'))
CLOSE_P = itext(closing.find('p'))

ORD = ['premier', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième',
       'huitième', 'neuvième', 'dixième', 'onzième', 'douzième', 'treizième', 'quatorzième', 'quinzième']

chapters = []   # (n, id, kicker, titre, [blocs], [group-titles])
for i, sec in enumerate(main.find_all('section', class_='chapter'), 1):
    ch = sec.find(class_='chapter-head')
    kicker = itext(ch.find(class_='section-kicker'))
    title = itext(ch.find('h2'))
    prose = sec.find(class_='prose')
    aside = sec.find(class_='side-note')
    lab = sec.find(class_='lab')
    groups = [itext(h) for h in prose.find_all('h3', class_='group-title')]
    blocks = conv_blocks(prose, i)
    if aside is not None:
        blocks.append(conv_sidenote(aside, i))
    for lb in sec.find_all(class_='lab'):
        blocks.append(conv_lab(lb, i))
    chapters.append({'n': i, 'id': sec.get('id'), 'kicker': kicker, 'title': title,
                     'blocks': blocks, 'groups': groups})

hero_png = os.path.join(REPO, 'assets', 'ordinateur-1983-hero.png')
shutil.copy2(hero_png, os.path.join(ASSETS, 'ordinateur-1983-hero.png'))

# ---------------------------------------------------------------- écriture
def front(extra='', tags='informatique, logique, processeur, ordinateur', aliases=None):
    al = json.dumps(aliases or [], ensure_ascii=False)
    return f'''---
projet: Empire contre Intox
dossier: XXVII
titre-dossier: "L'Ordinateur de 1983"
auteurs: [Samlepirate]
source: {SITE}
licence: CC BY-NC-ND 4.0
importé: {TODAY}
tags: [empire-contre-intox/dossier-xxvii, {tags}]
aliases: {al}
{extra}---
'''

names = []
for c in chapters:
    fname = f'{c["n"]:02d} — {sanitize(c["title"])}'
    names.append((fname, c))

BRIDGES = {}   # rempli par 5-passerelles.py

for idx, (fname, c) in enumerate(names):
    h1 = f'Chapitre {ORD[c["n"]-1]} — {c["title"]}'
    aliases = [f'Chapitre {c["n"]}', f'EXP {c["n"]}' if False else c['title'], c['id'].capitalize()]
    extra = (f'chapitre: {c["n"]}\nordre: {c["n"]}\nancre: {c["id"]}\n')
    body = front(extra, aliases=[f'Chapitre {c["n"]}', c['title']])
    body += f'\n# {h1}\n\n' + '\n\n'.join(c['blocks']) + '\n'
    nav = [f'[[{MOC}|⌂ Sommaire du dossier]]']
    if idx > 0:
        nav.append(f'← [[{names[idx-1][0]}|Chapitre {names[idx-1][1]["n"]}]]')
    if idx < len(names) - 1:
        nav.append(f'[[{names[idx+1][0]}|Chapitre {names[idx+1][1]["n"]}]] →')
    body += '\n---\n' + ' · '.join(nav) + '\n'
    open(os.path.join(OUT, fname + '.md'), 'w', encoding='utf-8').write(body)
    print('✔', fname + '.md', f'({len(body)//1000} k)')

# ---------------------------------------------------------------- MOC
m = [front('ordre: 0\n', aliases=['Dossier XXVII', "L'Ordinateur de 1983", 'Ordinateur 1983', 'Dossier Ordinateur'])]
m.append(f'\n# {MOC} — Du transistor au système d\'exploitation\n')
m.append('![L\'ordinateur de 1983, en codex ECI](_assets/ordinateur-1983-hero.png)\n')
m.append(f'*{HERO["eyebrow"]}*\n')
m.append(f'*{HERO["lead"]}*\n')
m.append(callout('quote', 'Le fil rouge du dossier', [HERO['quote']]) + '\n')
m.append(callout('info', 'Accès rapide', [
    f'[[{DASH}|⌂ Tableau de bord du dossier]] · [[Carte du dossier — Ordinateur 1983.canvas|🗺️ Carte du dossier]] · '
    f'[[{FORM}|🧮 Formulaire]] · [[{ISAN}|📖 Jeu d\'instructions]] · [[{BANC}|🧪 Le banc d\'essai]] · '
    f'[[{PROG}|💻 Les programmes]] · [[{SOURCES}|🔬 Sources]]']) + '\n')

m.append('## L\'autotest de la machine\n')
m.append('| Poste | Relevé | État |')
m.append('| --- | --- | --- |')
for k, v, s in POST[:5]:
    m.append(f'| {k} | {v} | {s} |')
m.append('')

m.append(f'## {MANIF_H}\n')
m.append('\n\n'.join(MANIF) + '\n')

m.append('## Le fil conducteur — huit niveaux\n')
for lvl, txt in TIMELINE:
    m.append(f'- **{lvl}** — {txt}')
m.append('')
m.append('```mermaid\nflowchart TD\n' + '\n'.join(
    [f'  N{i}["{lvl}<br/>{re.sub(chr(96)+"|"+chr(34), "", re.sub(r"[*_]", "", txt)).split(" — ")[0].strip()}"]'
     for i, (lvl, txt) in enumerate(TIMELINE)]) + '\n' +
    '\n'.join([f'  N{i} --> N{i+1}' for i in range(len(TIMELINE) - 1)]) + '\n```\n')

m.append(f'## {OBJ_H}\n')
for t, d in OBJ:
    m.append(f'- **{t}** — {d}')
m.append('')

m.append('## Sommaire\n')
for fname, c in names:
    m.append(f'- [[{fname}|Chapitre {ORD[c["n"]-1]} — {c["title"]}]]')
    for g in c['groups']:
        m.append(f'\t- [[{fname}#{g}|{g}]]')
m.append(f'- [[{FORM}]] — les treize formules du dossier, dans l\'ordre')
m.append(f'- [[{ISAN}]] — le vocabulaire complet du processeur')
m.append(f'- [[{BANC}]] — les quinze expériences interactives, ce qu\'elles montrent')
m.append(f'- [[{PROG}]] — les sept programmes assembleur et les trois traductions C')
m.append(f'- [[{SOURCES}]] — 16 fiches, 3 DOI vérifiés')
m.append('')

m.append('## Le compagnon interactif\n')
m.append('Le dossier n\'est pas écrit d\'après une transcription de live mais d\'après un **objet** : le '
         '*Simulateur Logique Nodal* de Samlepirate — un ordinateur 8 bits complet dans une page web '
         '(portes, processeur, mémoire, assembleur, compilateur C, amorceur, disque, système). '
         'La source primaire est son **code source**, pas sa documentation ; quand les deux divergent, c\'est le code qui tranche.\n')
m.append(f'- 🖥️ [Le simulateur, embarqué dans le site]({SITE}simulateur/) — l\'ordinateur complet, dans le navigateur\n'
         f'- 💾 [Le dépôt du code source](https://github.com/TheSamLePirate/Simulateur-Logique-Nodal)\n'
         f'- 🌐 [Le dossier en ligne]({SITE}) — les quinze expériences y sont jouables\n')

m.append(f'## La conclusion du dossier\n')
m.append(f'**{CLOSE_H}**\n')
m.append(CLOSE_P + '\n')

m.append('## Dossiers liés\n')
m.append("- [[Dossier XXV — L'entropie, le temps et l'Univers]] — l'**Acte V** y définit le *bit* comme unité "
         "d'information (Shannon) et montre qu'effacer un bit coûte de l'énergie (Landauer) : c'est le prolongement "
         "physique du chapitre premier ;")
m.append("- [[Dossier XIV — Les Formules de l'Empire]] — son **Acte XIV « Informatique & algorithmes »** donne la "
         "notation grand O qui chiffre le prix de la retenue qui traverse ;")
m.append("- [[Dossier V — Le Tableau Périodique des éléments]] — le silicium du transistor y est l'**élément 14**, "
         "et sa couche p à demi remplie explique qu'il soit semi-conducteur ;")
m.append('- [[Empire contre Intox — tableau de bord|⌂ Tableau de bord de l\'Empire]] — le poste de pilotage du coffre ;')
m.append("- [[Empire contre Intox — l'index des dossiers|L'index des dossiers]] — les vingt-huit dossiers du site.\n")

m.append('## Crédits\n')
m.append(f'{CREDIT}. Dossier XXVII du site [Empire contre Intox](https://empire-contre-intox.com/). '
         'Contenu sous licence [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr).\n')
m.append(callout('quote', 'La devise du collectif', ['*Veritas omnia vincit*']))

open(os.path.join(OUT, MOC + '.md'), 'w', encoding='utf-8').write('\n'.join(m) + '\n')
print('✔', MOC + '.md')

json.dump({'formulas': FORMULAS, 'labs': LABS, 'retain': RETAIN, 'intox': INTOX,
           'chapters': [{'n': c['n'], 'id': c['id'], 'title': c['title'], 'file': f,
                         'groups': c['groups']} for f, c in names],
           'ex': EX},
          open('/tmp/xxvii-data.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f"\n{COUNT['formule']} formules · {COUNT['exp']} expériences · {COUNT['retenir']} « à retenir » · {COUNT['intox']} encadrés anti-intox")
