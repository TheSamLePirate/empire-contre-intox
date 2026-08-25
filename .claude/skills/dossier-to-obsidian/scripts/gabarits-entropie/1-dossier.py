#!/usr/bin/env python3
# Convertit provoxys/entropie/index.html en notes Markdown pour Obsidian.
import os, re, shutil
from bs4 import BeautifulSoup, NavigableString, Tag

REPO = '/Users/olivierveinand/Documents/DEV/empire-contre-intox/provoxys/entropie'
SRC = os.path.join(REPO, 'index.html')
VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
OUT = os.path.join(VAULT, 'Empire contre Intox', 'Dossier XXV — Entropie')
ASSETS = os.path.join(OUT, '_assets')
SITE = 'https://empire-contre-intox.com/provoxys/entropie/'
MOC = "Dossier XXV — L'entropie, le temps et l'Univers"
LEX = "Lexique — cinquante-cinq mots définis simplement"
TODAY = '2026-08-25'

os.makedirs(ASSETS, exist_ok=True)
soup = BeautifulSoup(open(SRC, encoding='utf-8').read(), 'html.parser')

# ---------------------------------------------------------------- helpers
def sanitize(name):
    name = re.sub(r'[:/\\|#^\[\]?*"<>]', '', name)
    return re.sub(r'\s+', ' ', name).strip()

def resolve(href, text):
    if not href:
        return text
    if href.startswith('#lex'):
        return f'[[{LEX}|{text}]]'
    if href.startswith('#'):
        return f'[{text}]({SITE}{href})'
    if href.startswith('http'):
        return f'[{text}]({href})'
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
    # recolle la ponctuation aspiree par les espaces ordinaires ajoutes autour
    # des ** / $ $ - sans toucher aux espaces insecables (\xa0) du texte source
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

def conv_formula(fb):
    head = fb.find(class_='fb-head')
    tag = head.find(class_='fb-tag') if head else None
    tag_t = itext(tag) if tag else ''
    if tag:
        tag.extract()
    title = itext(head) if head else 'Formule'
    if tag_t:
        title += f' · {tag_t}'
    body = []
    f = fb.find(class_='formula')
    if f and f.get('data-tex'):
        body.append(f"$${f['data-tex'].strip()}$$")
    say = fb.find(class_='fb-say')
    if say:
        st = say.find(class_='say-t')
        sx = st.find(class_='say-x') if st else None
        if sx:
            sx.extract()
        if st:
            body.append(f'**Se lit** : {itext(st)}')
        if sx:
            body.append(itext(sx))
    note = fb.find(class_='fb-note')
    if note:
        body.append(itext(note))
    return callout('abstract', title, body)

def conv_box(c):
    cls = c.get('class', []) or []
    if 'antiintox' in cls:
        kind = 'warning'
    elif 'lesson-block' in cls:
        kind = 'important'
    elif 'question-block' in cls:
        kind = 'question'
    else:
        kind = 'info'
    title = ''
    if c.name == 'details':
        s = c.find('summary')
        fn = s.find(class_='faq-note') if s else None
        if fn:
            fn.extract()
        ta = s.find(class_='tag-act') if s else None
        if ta:
            ta.extract()
        title = itext(s).lstrip('◆').strip() + ' — la réponse du live'
        s.extract()
    else:
        lbl = c.find(class_='blk-label')
        if lbl:
            ta = lbl.find(class_='tag-act')
            ta_t = itext(ta) if ta else ''
            if ta:
                ta.extract()
            title = itext(lbl).lstrip('◆').strip()
            if ta_t:
                title += f' · {ta_t}'
            lbl.extract()
    return callout(kind, title, conv_blocks(c))

def conv_viz(vm):
    lede = vm.find(class_='viz-lede')
    vid = lede.find(class_='vid')
    vid_t = vid.get_text(strip=True)
    vid.extract()
    return (f'> [!example]- 🧪 Labo {vid_t} · {itext(lede)}\n'
            f'> Expérience interactive jouable sur [la page du dossier]({SITE}#labos).')

def conv_figure(fig):
    cap = fig.find('figcaption')
    cap_t = itext(cap) if cap else ''
    img = fig.find('img')
    if img:
        src = img.get('src', '')
        name = os.path.basename(src)
        src_path = os.path.join(REPO, src)
        if os.path.exists(src_path):
            shutil.copy2(src_path, os.path.join(ASSETS, name))
        out = f'![{img.get("alt","")}](_assets/{name})'
        if cap_t:
            out += f'\n*{cap_t}*'
        return out
    svg = fig.find('svg')
    if svg:
        label = svg.get('aria-label', 'Schéma de la page')
        return callout('example', '🗺️ Schéma (sur la page en ligne)', [label, cap_t])
    return cap_t

def conv_table(wrap):
    table = wrap.find('table')
    head = [itext(th) for th in table.thead.find_all('th')]
    lines = ['| ' + ' | '.join(head) + ' |', '|' + ' --- |' * len(head)]
    for tr in table.tbody.find_all('tr'):
        cells = []
        for td in tr.find_all('td'):
            t = itext(td).replace('|', '\\|')
            if 'mono-sample' in (td.get('class') or []):
                t = f'`{t}`'
            cells.append(t)
        lines.append('| ' + ' | '.join(cells) + ' |')
    return '\n'.join(lines)

def conv_blocks(el):
    out = []
    for c in el.children:
        if isinstance(c, NavigableString):
            continue
        cls = c.get('class', []) or []
        if c.name == 'p' and 'speaker' in cls:
            emoji = '🔥' if 'speaker--provoxys' in cls else '🧊'
            out.append(f'**{emoji} {itext(c)}**')
        elif c.name == 'p':
            t = itext(c)
            if t:
                out.append(t)
        elif 'formula-block' in cls:
            out.append(conv_formula(c))
        elif 'science-block' in cls or 'question-block' in cls or 'lesson-block' in cls:
            out.append(conv_box(c))
        elif 'viz-mount' in cls:
            out.append(conv_viz(c))
        elif 'chapter-figure' in cls or c.name == 'figure':
            out.append(conv_figure(c))
        elif 'dtable-wrap' in cls:
            out.append(conv_table(c))
        elif c.name == 'h3':
            out.append(f'### {itext(c)}')
        elif 'chapter-head' in cls:
            h2 = c.find('h2')
            if h2 is not None:
                out.append(f'## {itext(h2)}')
        elif c.name == 'svg':
            continue
        elif c.name in ('div', 'aside', 'section', 'main'):
            out.extend(conv_blocks(c))
    return out

def conv_chapter(sec):
    parts = []
    ch = sec.find(class_='chapter-head')
    title = None
    if ch:
        kick = ch.find(class_='kicker').get_text(' ', strip=True)
        h2 = itext(ch.find('h2'))
        m = re.search(r'Chapitre\s+(\d+)', kick)
        title = h2
        if m:
            parts.append(f'## Chapitre {m.group(1)} — {h2}')
        else:
            parts.append(f'## {h2}')
        ch.extract()
    prose = sec.find(class_='prose')
    if prose:
        parts.extend(conv_blocks(prose))
    return parts, title

# ---------------------------------------------------------------- walk
main = soup.find('main') or soup.body
sections = [c for c in (soup.body.find_all(['header', 'section', 'footer'], recursive=False)
            if not soup.find('main') else
            [soup.body.find('header')] + soup.find('main').find_all('section', recursive=False))]

notes = []          # (filename_sans_ext, title, [md blocks])
moc = {'tldr': [], 'timeline': [], 'manifesto': [], 'objectifs': [], 'videos': [],
       'devise': '', 'quote': '', 'lead': '', 'pillars': []}
chapters_by_note = {}
current = None

def start_note(fname, title, header_blocks):
    global current
    current = (fname, title, list(header_blocks))
    notes.append(current)
    chapters_by_note[fname] = []

act_idx = 0
for sec in sections:
    if sec is None:
        continue
    sid = sec.get('id', '')
    cls = sec.get('class', []) or []

    if sec.name == 'header':                       # hero
        lead = sec.find(class_='lead')
        moc['lead'] = itext(lead) if lead else ''
        hq = sec.find(class_='hero-quote')
        if hq:
            src = hq.find(class_='hq-src'); plain = hq.find(class_='hq-plain')
            src_t = itext(src) if src else ''
            plain_t = itext(plain) if plain else ''
            for x in (src, plain):
                if x: x.extract()
            moc['quote'] = f'> {itext(hq)}\n> {src_t}\n\n*{plain_t}*'
        continue
    if sid in ('hero-simulation', 'retain-digest', 'labos'):
        continue
    if sid == 'intro':
        man = sec.find(class_='manifesto')
        moc['manifesto'] = [itext(man)] if man else []
        nxt = man.find_next_sibling('p') if man else None
        if nxt:
            moc['manifesto'].append(itext(nxt))
        tl = sec.find(class_='timeline')
        if tl:
            for li in tl.find_all('li'):
                b = li.find('b'); dur = li.find(class_='tdur')
                spans = [s for s in li.find_all('span') if 'tdur' not in (s.get('class') or [])]
                desc = itext(spans[-1]) if spans else ''
                moc['timeline'].append(f'- **{itext(b)}** *({itext(dur)})* — {desc}')
        tldr = sec.find(class_='tldr')
        if tldr:
            for i, li in enumerate(tldr.find('ol').find_all('li'), 1):
                moc['tldr'].append(f'{i}. {itext(li)}')
        continue
    if sec.find(class_='learn-grid') is not None:
        for card in sec.find_all(class_='learn-card'):
            h4 = card.find('h4'); p = card.find('p')
            moc['objectifs'].append(f'- **{itext(h4)}** — {itext(p)}')
        continue
    if sid == 'lexique':
        parts = []
        bh = sec.find(class_='bench-head')
        if bh:
            parts.append(itext(bh.find('p')))
        for grp in sec.find_all(class_='lex-group'):
            h3 = grp.find('h3')
            sub = h3.find('span')
            sub_t = itext(sub).lstrip('· ').strip() if sub else ''
            if sub:
                sub.extract()
            parts.append(f'## {itext(h3)}' + (f' *({sub_t})*' if sub_t else ''))
            items = []
            for it in grp.find_all(class_='lex-item'):
                s = it.find('summary')
                act = s.find(class_='act')
                act_t = itext(act) if act else ''
                if act:
                    act.extract()
                term = itext(s)
                defi = itext(it.find('p'))
                items.append(f'- **{term}** *({act_t})* — {defi}')
            parts.append('\n'.join(items))
        start_note(sanitize(LEX), LEX, parts)
        current = None
        continue
    if sec.find(class_='credit-band') is not None and sid == '':
        continue
    if sid == 'ouverture':
        parts, _ = conv_chapter(sec)
        # retire le premier '## …' : le titre de la note suffit
        title = 'Ouverture — Le film qui ne passe que dans un sens'
        start_note(f'00 — {sanitize(title)}', title, parts[1:] if parts and parts[0].startswith('##') else parts)
        continue
    if 'act-band' in cls and sid.startswith('acte'):
        act_idx += 1
        wrap = sec.find(class_='wrap')
        num = wrap.find(class_='act-num').get_text(strip=True)
        h2 = itext(wrap.find('h2'))
        ps = wrap.find_all('p', recursive=False)
        header = []
        for p in ps:
            t = itext(p)
            if 'act-note' in (p.get('class') or []):
                header.append(f'*{t}*')
            else:
                header.append(t)
        title = f'Acte {num} — {h2}'
        start_note(f'{act_idx:02d} — {sanitize(title)}', title, header)
        continue
    if 'act-band' in cls and sid == 'conclusion':
        wrap = sec.find(class_='wrap')
        h2 = itext(wrap.find('h2'))
        ps = [itext(p) for p in wrap.find_all('p', recursive=False)]
        title = f'Conclusion — {h2}'
        start_note(f'08 — {sanitize(title)}', title, ps)
        continue
    if 'chapter' in cls and sid == 'coulisses':
        parts, _ = conv_chapter(sec)
        title = 'Coulisses — Interludes et questions du chat'
        start_note(f'09 — {sanitize(title)}', title, parts[1:] if parts and parts[0].startswith('##') else parts)
        current = None
        continue
    if 'chapter' in cls:
        if current is None:
            continue
        parts, ch_title = conv_chapter(sec)
        current[2].extend(parts)
        if ch_title:
            chapters_by_note[current[0]].append(ch_title)
        continue
    if sid == 'vraie-vie':
        for pil in sec.find_all(class_='pillar'):
            pn = pil.find(class_='pn'); h4 = pil.find('h4'); p = pil.find('p')
            moc['pillars'].append(f'- **{itext(h4)}** *({itext(pn)})* — {itext(p)}')
        continue
    if sid == 'ressources':
        for vc in sec.find_all(class_='vcard'):
            fac = vc.find(class_='vfacade')
            yt = fac.get('data-yt') if fac else None
            chan = itext(vc.find(class_='vchan'))
            vt = itext(vc.find(class_='vtitle'))
            if yt:
                moc['videos'].append(f'- **{chan}** — [{vt}](https://www.youtube.com/watch?v={yt})')
        continue
    if 'closing' in cls:
        dv = sec.find(class_='devise')
        if dv:
            moc['devise'] = itext(dv)
        continue
    # section « libre » (ex. figure seule entre deux chapitres) : on la rattache
    # à la note en cours
    if current is not None and sec.find(class_='chapter-figure') is not None:
        for fig in sec.find_all(class_='chapter-figure'):
            current[2].append(conv_figure(fig))
        continue

# hero image pour le sommaire
hero_src = os.path.join(REPO, 'assets', 'entropie-hero.png')
if os.path.exists(hero_src):
    shutil.copy2(hero_src, os.path.join(ASSETS, 'entropie-hero.png'))

# ---------------------------------------------------------------- write
FRONT = f"""---
projet: Empire contre Intox
dossier: XXV
titre-dossier: "L'entropie, le temps et l'Univers"
auteurs: [Provoxys, Samlepirate]
source: {SITE}
licence: CC BY-NC-ND 4.0
importé: {TODAY}
tags: [empire-contre-intox, entropie, thermodynamique, physique]
---
"""

content_notes = [n for n in notes if n[0] != sanitize(LEX)]
for i, (fname, title, blocks) in enumerate(notes):
    body = FRONT + f'\n# {title}\n\n' + '\n\n'.join(blocks) + '\n'
    if fname != sanitize(LEX):
        idx = content_notes.index((fname, title, blocks))
        nav = [f'[[{MOC}|⌂ Sommaire du dossier]]']
        if idx > 0:
            nav.append(f'← [[{content_notes[idx-1][0]}|{content_notes[idx-1][1]}]]')
        if idx < len(content_notes) - 1:
            nav.append(f'[[{content_notes[idx+1][0]}|{content_notes[idx+1][1]}]] →')
        body += '\n---\n' + ' · '.join(nav) + '\n'
    else:
        body += '\n---\n' + f'[[{MOC}|⌂ Sommaire du dossier]]' + '\n'
    with open(os.path.join(OUT, fname + '.md'), 'w', encoding='utf-8') as f:
        f.write(body)
    print('✔', fname + '.md', f'({len(body)//1000} k)')

# ---- MOC
m = [FRONT]
m.append(f"# {MOC}\n")
m.append('![Hero du dossier](_assets/entropie-hero.png)\n')
m.append(f"*{moc['lead']}*\n")
if moc['quote']:
    m.append(moc['quote'] + '\n')
m.append("## L'entropie en cinq idées\n\n" + '\n'.join(moc['tldr']) + '\n')
m.append('## Le fil conducteur\n\n' + '\n\n'.join(moc['manifesto']) + '\n')
m.append('\n'.join(moc['timeline']) + '\n')
m.append('## Ce que ce dossier vous apprend\n\n' + '\n'.join(moc['objectifs']) + '\n')
m.append('## Sommaire\n')
toc = []
for fname, title, _ in content_notes:
    toc.append(f'- [[{fname}|{title}]]')
    for ch in chapters_by_note.get(fname, []):
        toc.append(f'\t- {ch}')
toc.append(f'- [[{sanitize(LEX)}|{LEX}]]')
m.append('\n'.join(toc) + '\n')
m.append('## Les 26 laboratoires et la simulation\n\n'
         f'La page en ligne fait tourner **26 laboratoires interactifs** (curseurs, bilans recalculés en direct) '
         f'et une simulation WebGL du lait dans le café — rien de tout cela ne survit au Markdown : '
         f'[le banc d\'essai]({SITE}#labos) · [portraits des savants]({SITE}portraits.html) · '
         f'[simulateur de dynamique physique](https://thesamlepirate.github.io/simulation-chimie/).\n')
m.append("## Et dans la vraie vie ?\n\n" + '\n'.join(moc['pillars']) + '\n')
m.append('## Pour en savoir plus — vidéos\n\n' + '\n'.join(moc['videos']) + '\n')
m.append('## Crédits\n\n'
         'Réalisé par **Provoxys**, avec la participation de **Samlepirate** — récit scientifique & visualisations interactives. '
         'Dossier XXV du site [Empire contre Intox](https://empire-contre-intox.com/). '
         'Contenu sous licence [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr).\n')
if moc['devise']:
    m.append(f"> [!quote] Le mot de la fin\n> {moc['devise']}\n")
with open(os.path.join(OUT, sanitize(MOC) + '.md'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(m))
print('✔', sanitize(MOC) + '.md')
print('\nDossier de sortie :', OUT)
