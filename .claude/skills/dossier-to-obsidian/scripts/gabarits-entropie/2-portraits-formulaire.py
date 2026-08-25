#!/usr/bin/env python3
# Ajoute au coffre Obsidian : les 16 fiches de portraits.html, une note-galerie,
# et un formulaire rassemblant les 18 formules du dossier XXV.
# À lancer APRÈS entropie_to_obsidian.py (il patche le sommaire généré).
import os, re, shutil
from bs4 import BeautifulSoup, NavigableString

REPO = '/Users/olivierveinand/Documents/DEV/empire-contre-intox/provoxys/entropie'
VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
OUT = os.path.join(VAULT, 'Empire contre Intox', 'Dossier XXV — Entropie')
PORTRAITS_DIR = os.path.join(OUT, 'Portraits')
ASSETS = os.path.join(OUT, '_assets')
SITE = 'https://empire-contre-intox.com/provoxys/entropie/'
MOC = "Dossier XXV — L'entropie, le temps et l'Univers"
GALERIE = "Portraits — la galerie des savants"
FORMULAIRE = "Formulaire — toutes les formules du dossier"
TODAY = '2026-08-25'

os.makedirs(PORTRAITS_DIR, exist_ok=True)
os.makedirs(ASSETS, exist_ok=True)

# ---------------------------------------------------------------- helpers (identiques au 1er script)
def sanitize(name):
    name = re.sub(r'[:/\\|#^\[\]?*"<>]', '', name)
    return re.sub(r'\s+', ' ', name).strip()

def resolve(href, text):
    if not href:
        return text
    if href.startswith('#'):
        return f'[{text}]({SITE}portraits.html{href})'
    if href.startswith('http'):
        return f'[{text}]({href})'
    if href == 'index.html':
        return f'[[{MOC}|{text}]]'
    if href == '../../index.html':
        return f'[{text}](https://empire-contre-intox.com/)'
    return f'[{text}]({SITE}{href})'

def inline(el):
    if isinstance(el, NavigableString):
        return str(el)
    parts = []
    for c in el.children:
        if isinstance(c, NavigableString):
            parts.append(str(c))
            continue
        cls = c.get('class', []) or []
        if c.name in ('b', 'strong'):
            t = inline(c).strip()
            if t:
                parts.append(f'**{t}**')
            parts.append(' ')
        elif c.name in ('em', 'i'):
            t = inline(c).strip()
            if t:
                parts.append(f'*{t}*')
            parts.append(' ')
        elif c.name == 'span' and 'imath' in cls:
            parts.append(f" ${c.get('data-tex','').strip()}$ ")
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
    s = re.sub(r' +([,.)\]])', r'\1', s)
    s = re.sub(r'([(\[]) +', r'\1', s)
    s = re.sub('\xa0 +', '\xa0', s)
    s = re.sub(' +\xa0', '\xa0', s)
    return s

def itext(el):
    return inline(el).strip()

def callout(kind, title, bodies, fold=''):
    lines = [f'> [!{kind}]{fold} {title}'.rstrip()]
    for b in bodies:
        if not b:
            continue
        for ln in b.split('\n'):
            lines.append(('> ' + ln).rstrip())
        lines.append('>')
    while lines and lines[-1] == '>':
        lines.pop()
    return '\n'.join(lines)

def formula_parts(fb):
    """Extrait (titre, tag, tex, se-lit, glose, note) d'un .formula-block."""
    head = fb.find(class_='fb-head')
    tag = head.find(class_='fb-tag') if head else None
    tag_t = itext(tag) if tag else ''
    if tag:
        tag.extract()
    title = itext(head) if head else 'Formule'
    f = fb.find(class_='formula')
    tex = f['data-tex'].strip() if f and f.get('data-tex') else ''
    say_t = glose = ''
    say = fb.find(class_='fb-say')
    if say:
        st = say.find(class_='say-t')
        sx = st.find(class_='say-x') if st else None
        if sx:
            sx.extract()
            glose = itext(sx)
        if st:
            say_t = itext(st)
    note = fb.find(class_='fb-note')
    note_t = itext(note) if note else ''
    return title, tag_t, tex, say_t, glose, note_t

def conv_formula(fb):
    title, tag_t, tex, say_t, glose, note_t = formula_parts(fb)
    if tag_t:
        title += f' · {tag_t}'
    body = [f'$${tex}$$'] if tex else []
    if say_t:
        body.append(f'**Se lit** : {say_t}')
    if glose:
        body.append(glose)
    if note_t:
        body.append(note_t)
    return callout('abstract', title, body)

def conv_question(c):
    lbl = c.find(class_='blk-label')
    title = itext(lbl).lstrip('◆').strip() if lbl else ''
    if lbl:
        lbl.extract()
    body = [itext(p) for p in c.find_all('p') if itext(p)]
    return callout('question', title, body)

FRONT_BASE = f"""projet: Empire contre Intox
dossier: XXV
titre-dossier: "L'entropie, le temps et l'Univers"
licence: CC BY-NC-ND 4.0
importé: {TODAY}"""

# ================================================================ PORTRAITS
psoup = BeautifulSoup(open(os.path.join(REPO, 'portraits.html'), encoding='utf-8').read(), 'html.parser')
main = psoup.find('main') or psoup.body

# groupes d'actes
act_titles = {}
for band in main.find_all('section', class_='act-band'):
    num = band.find(class_='act-num').get_text(strip=True)
    act_titles[band.get('id')] = (num, itext(band.find('h2')))

fiches = []   # (fname, name, dates, epithet, acte_label, num)
cur_act = ('', '')
for sec in main.find_all('section', recursive=False):
    cls = sec.get('class', []) or []
    if 'act-band' in cls:
        cur_act = act_titles.get(sec.get('id'), cur_act)
        continue
    if 'chapter' not in cls:
        continue
    ch = sec.find(class_='chapter-head')
    h2 = ch.find('h2')
    dates_span = h2.find('span')
    dates = itext(dates_span) if dates_span else ''
    if dates_span:
        dates_span.extract()
    name = itext(h2)
    num = sec.find(class_='chapter-number').get_text(strip=True)
    kicker = ch.find(class_='kicker').get_text(' ', strip=True)

    aside = sec.find(class_='fiche-aside')
    img = aside.find('img')
    img_md = ''
    if img:
        src = img.get('src', '')
        base = os.path.basename(src)
        dst = f'portrait-{base}'
        sp = os.path.join(REPO, src)
        if os.path.exists(sp):
            shutil.copy2(sp, os.path.join(ASSETS, dst))
        img_md = f'![{img.get("alt","")}](../_assets/{dst})'
    rows = []
    for row in aside.find_all(class_='row'):
        dt = row.find('dt'); dd = row.find('dd')
        rows.append(f'- **{itext(dt)}** : {itext(dd)}')

    body = sec.find(class_='fiche-body')
    epithet_el = body.find(class_='epithet')
    epithet = itext(epithet_el) if epithet_el else ''
    if epithet_el:
        epithet_el.extract()
    blocks = []
    for c in body.children:
        if isinstance(c, NavigableString):
            continue
        ccls = c.get('class', []) or []
        if c.name == 'h3':
            blocks.append(f'## {itext(c)}')
        elif 'formula-block' in ccls:
            blocks.append(conv_formula(c))
        elif 'question-block' in ccls:
            blocks.append(conv_question(c))
        elif c.name == 'p':
            t = itext(c)
            if t:
                blocks.append(t)
        elif c.name in ('div', 'aside'):
            for p in c.find_all('p'):
                t = itext(p)
                if t:
                    blocks.append(t)

    acte_label = f'Acte {cur_act[0]} — {cur_act[1]}' if cur_act[0] else kicker
    fname = sanitize(name)
    fiches.append({'fname': fname, 'name': name, 'dates': dates, 'epithet': epithet,
                   'acte': acte_label, 'num': num, 'img': img_md, 'rows': rows, 'blocks': blocks})

for i, f in enumerate(fiches):
    front = (f"---\n{FRONT_BASE}\n"
             f"page: \"Les Bâtisseurs de l'Entropie (portraits)\"\n"
             f"auteur-fiche: Lalie\n"
             f"source: {SITE}portraits.html\n"
             f"dates: \"{f['dates']}\"\n"
             f"épithète: \"{f['epithet']}\"\n"
             f"tags: [empire-contre-intox, entropie, portrait, histoire-des-sciences]\n---\n")
    parts = [front]
    parts.append(f"# {f['name']}" + (f" ({f['dates']})" if f['dates'] else ''))
    parts.append(f"*{f['epithet']}* — fiche {f['num']}/16 · {f['acte']}")
    if f['img']:
        parts.append(f['img'])
    if f['rows']:
        parts.append("## Fiche d'identité\n\n" + '\n'.join(f['rows']))
    parts.extend(f['blocks'])
    nav = [f'[[{GALERIE}|⌂ Galerie des savants]]', f'[[{MOC}|Dossier XXV]]']
    if i > 0:
        nav.append(f"← [[{fiches[i-1]['fname']}|{fiches[i-1]['name']}]]")
    if i < len(fiches) - 1:
        nav.append(f"[[{fiches[i+1]['fname']}|{fiches[i+1]['name']}]] →")
    body_md = '\n\n'.join(parts) + '\n\n---\n' + ' · '.join(nav) + '\n'
    with open(os.path.join(PORTRAITS_DIR, f['fname'] + '.md'), 'w', encoding='utf-8') as fh:
        fh.write(body_md)
    print('✔ Portraits/' + f['fname'] + '.md')

# ---- note galerie
lead = psoup.find(class_='lead')
man = psoup.find(class_='manifesto')
g = [f"---\n{FRONT_BASE}\n"
     f"auteur-fiche: Lalie\n"
     f"source: {SITE}portraits.html\n"
     f"tags: [empire-contre-intox, entropie, portrait, histoire-des-sciences]\n---\n"]
g.append("# Les Bâtisseurs de l'Entropie\n")
if lead is not None:
    g.append(f'*{itext(lead)}*\n')
if man is not None:
    g.append(itext(man) + '\n')
tl = psoup.find(class_='timeline')
if tl:
    g.append('## Cinq âges de l\'entropie\n')
    for li in tl.find_all('li'):
        b = li.find('b')
        spans = [s for s in li.find_all('span')]
        g.append(f'- **{itext(b)}** — {itext(spans[-1]) if spans else ""}')
    g.append('')
g.append('## Les seize fiches\n')
cur = None
n = 0
for f in fiches:
    if f['acte'] != cur:
        cur = f['acte']
        g.append(f'\n### {cur}\n')
    n += 1
    d = f" *({f['dates']})*" if f['dates'] else ''
    g.append(f"{n}. [[{f['fname']}|{f['name']}]]{d} — {f['epithet']}")
g.append('\n## Crédits\n')
g.append("Galerie de portraits réalisée par **Lalie** pour le dossier XXV "
         f"« [[{MOC}|L'Entropie, le temps et l'Univers]] » — Provoxys × Samlepirate. "
         f"[Page en ligne]({SITE}portraits.html). Licence CC BY-NC-ND 4.0.")
with open(os.path.join(OUT, GALERIE + '.md'), 'w', encoding='utf-8') as fh:
    fh.write('\n'.join(g) + '\n')
print('✔', GALERIE + '.md')

# ================================================================ FORMULAIRE
isoup = BeautifulSoup(open(os.path.join(REPO, 'index.html'), encoding='utf-8').read(), 'html.parser')
imain = isoup.find('main') or isoup.body

fm = [f"---\n{FRONT_BASE}\n"
      f"auteurs: [Provoxys, Samlepirate]\n"
      f"source: {SITE}\n"
      f"tags: [empire-contre-intox, entropie, thermodynamique, formules]\n---\n"]
fm.append('# Formulaire — toutes les formules du dossier\n')
fm.append("Les **18 formules** du dossier XXV (16 dans le dossier, 2 dans les portraits), "
          "dans l'ordre du live, chacune avec sa lecture orale « Se lit » et sa note. "
          "Le lien sous chaque titre renvoie à la note où la formule vit en contexte.\n")

count = 0
act_idx = 0
cur_note = cur_acte_title = ''
cur_chap = ''
for sec in imain.find_all('section', recursive=False):
    cls = sec.get('class', []) or []
    sid = sec.get('id', '')
    if 'act-band' in cls and sid.startswith('acte'):
        act_idx += 1
        wrap = sec.find(class_='wrap')
        num = wrap.find(class_='act-num').get_text(strip=True)
        h2 = itext(wrap.find('h2'))
        cur_acte_title = f'Acte {num} — {h2}'
        cur_note = f'{act_idx:02d} — {sanitize(cur_acte_title)}'
        fm.append(f'\n## {cur_acte_title}\n')
        continue
    if 'act-band' in cls and sid == 'conclusion':
        cur_acte_title = 'Conclusion'
        wrap = sec.find(class_='wrap')
        cur_note = f"08 — Conclusion — {sanitize(itext(wrap.find('h2')))}"
        continue
    ch = sec.find(class_='chapter-head')
    if ch:
        kick = ch.find(class_='kicker').get_text(' ', strip=True)
        m = re.search(r'Chapitre\s+(\d+)', kick)
        h2 = ch.find('h2')
        cur_chap = (f'chapitre {m.group(1)}, ' if m else '') + (itext(h2) if h2 else '')
    for fb in sec.find_all(class_='formula-block'):
        title, tag_t, tex, say_t, glose, note_t = formula_parts(fb)
        count += 1
        fm.append(f'### {count}. {title}\n')
        ctx = f'*{tag_t}*' if tag_t else ''
        if cur_note:
            ctx += (' — ' if ctx else '') + f'[[{cur_note}|{cur_acte_title}]]' + (f' · {cur_chap}' if cur_chap else '')
        if ctx:
            fm.append(ctx + '\n')
        fm.append(f'$${tex}$$\n')
        if say_t:
            fm.append(f'**Se lit** : {say_t}\n')
        if glose:
            fm.append(glose + '\n')
        if note_t:
            fm.append(callout('note', 'En clair', [note_t], fold='-') + '\n')

# les 2 formules des portraits
fm.append('\n## Dans les portraits\n')
psoup2 = BeautifulSoup(open(os.path.join(REPO, 'portraits.html'), encoding='utf-8').read(), 'html.parser')
for sec in (psoup2.find('main') or psoup2.body).find_all('section', class_='chapter'):
    ch = sec.find(class_='chapter-head')
    h2 = ch.find('h2')
    sp = h2.find('span')
    if sp:
        sp.extract()
    pname = itext(h2)
    for fb in sec.find_all(class_='formula-block'):
        title, tag_t, tex, say_t, glose, note_t = formula_parts(fb)
        count += 1
        fm.append(f'### {count}. {title}\n')
        ctx = f'*{tag_t}*' if tag_t else ''
        ctx += (' — ' if ctx else '') + f'fiche [[{sanitize(pname)}|{pname}]]'
        fm.append(ctx + '\n')
        fm.append(f'$${tex}$$\n')
        if say_t:
            fm.append(f'**Se lit** : {say_t}\n')
        if glose:
            fm.append(glose + '\n')
        if note_t:
            fm.append(callout('note', 'En clair', [note_t], fold='-') + '\n')

fm.append('\n---\n' + f'[[{MOC}|⌂ Sommaire du dossier]] · [[{GALERIE}|Galerie des savants]]\n')
with open(os.path.join(OUT, FORMULAIRE + '.md'), 'w', encoding='utf-8') as fh:
    fh.write('\n'.join(fm))
print('✔', FORMULAIRE + f'.md ({count} formules)')

# ================================================================ patch du sommaire (MOC)
moc_path = os.path.join(OUT, MOC + '.md')
moc = open(moc_path, encoding='utf-8').read()
add = (f'- [[{FORMULAIRE}|Formulaire — les 18 formules du dossier]]\n'
       f'- [[{GALERIE}|Portraits — Les Bâtisseurs de l\'Entropie (16 fiches, par Lalie)]]')
if FORMULAIRE not in moc:
    lex_line = re.search(r'^- \[\[Lexique[^\n]*$', moc, re.M)
    moc = moc[:lex_line.end()] + '\n' + add + moc[lex_line.end():]
    open(moc_path, 'w', encoding='utf-8').write(moc)
    print('✔ Sommaire (MOC) mis à jour')
else:
    print('· Sommaire déjà à jour')
