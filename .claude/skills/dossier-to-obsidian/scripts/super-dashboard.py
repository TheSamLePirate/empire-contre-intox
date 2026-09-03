#!/usr/bin/env python3
# Le niveau supérieur du coffre : super tableau de bord + index des dossiers +
# carte de l'Empire, construits depuis index.html (28 dossiers, 7 parcours,
# décret, manifeste) — avec les images de cartes et les avatars du site.
import os, re, json, shutil, glob
from bs4 import BeautifulSoup

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
def txt(el, sep=''):
    """Texte d'un élément. sep='' respecte les espaces du source (contenu inline) ;
    sep=' ' sépare des blocs. On recolle la ponctuation avalée par les balises."""
    if not el:
        return ''
    s = re.sub(r'[ \t\n\r]+', ' ', el.get_text(sep)).strip()
    s = re.sub(r' +([.,…])', r'\1', s)          # « vertigineux . » → « vertigineux. »
    return re.sub(r"([’'])\s+", r"\1", s)       # « l' Empire » → « l'Empire »
def esc(s): return (s or '').replace('|', '\\|')

R2I = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
def r2i(r):
    n = p = 0
    for ch in reversed(r):
        v = R2I.get(ch, 0)
        n = n - v if v < p else n + v
        p = max(p, v)
    return n

def slug(href):
    h = href.strip('/').split('?')[0]
    seg = [s for s in h.split('/') if s]
    last = seg[-1] if seg else 'dossier'
    last = re.sub(r'\.html?$', '', last)
    if last in ('index', ''):
        last = seg[-2] if len(seg) > 1 else 'dossier'
    return re.sub(r'[^a-z0-9-]+', '-', last.lower()).strip('-')

def copy_asset(src_rel, dst_name):
    """Copie un fichier du dépôt dans _assets/ du coffre. Renvoie le nom ou ''."""
    src = os.path.join(REPO, src_rel.lstrip('/'))
    if not os.path.exists(src):
        print('  ⚠ image absente :', src_rel)
        return ''
    shutil.copy2(src, os.path.join(ASSETS, dst_name))
    return dst_name

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

# ---------------------------------------------------------------- avatars du site
AVATARS = {}        # src -> dict(file, name)
for im in soup.select('article.dossier .byline .avatars img'):
    src = im.get('src', '')
    if not src or src in AVATARS:
        continue
    alt = (im.get('alt') or '').strip()
    name = re.sub(r"^(?:Avatar (?:de |d')|Sceau )", '', alt) or os.path.splitext(os.path.basename(src))[0]
    f = copy_asset(src, 'avatar-' + os.path.basename(src))
    AVATARS[src] = {'file': f, 'name': name}
print(f'{len(AVATARS)} avatars copiés')

# ---------------------------------------------------------------- extraction des cartes
groups = []
for g in soup.select('.dossier-group'):
    head = g.select_one('.group-head')
    roman = txt(head.select_one('.group-roman'))
    title = txt(head.select_one('h3'))
    desc = txt(head.select_one('.group-head > p'))
    count = txt(head.select_one('.group-count'))
    accent = (re.search(r'--group-accent:\s*([^;"]+)', g.get('style', '')) or [None, ''])[1].strip()
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
        media = art.select_one('.dossier-media img')
        img = media.get('src', '') if media else ''
        alt = (media.get('alt') or '').strip() if media else ''
        cacc = (re.search(r'--accent:\s*([^;"]+)', art.get('style', '')) or [None, ''])[1].strip()
        avs = [AVATARS[a.get('src')] for a in art.select('.byline .avatars img') if a.get('src') in AVATARS]
        agenda = not re.fullmatch(r'Dossier [IVXLC]+', no or '')
        roman_no = '' if agenda else no.replace('Dossier ', '')
        n = r2i(roman_no) if roman_no else 0
        vimg = copy_asset(img, ('carte-calendrier-lives.webp' if agenda
                                else f'dossier-{n:02d}-{slug(href)}' + os.path.splitext(img)[1])) if img else ''
        cards.append({'no': '' if agenda else no, 'label': no, 'roman': roman_no, 'n': n,
                      'badge': badge, 'title': t, 'desc': d, 'tags': tags, 'who': who,
                      'note': note, 'href': href, 'img': img, 'alt': alt, 'accent': cacc or accent,
                      'avatars': avs, 'vimg': vimg, 'agenda': agenda,
                      'group': f'{roman} · {title}', 'group_roman': roman})
    groups.append({'roman': roman, 'title': title, 'desc': desc, 'count': count,
                   'accent': accent, 'cards': cards})

ALL = [c for g in groups for c in g['cards']]
BYNUM = {c['no']: c for c in ALL if c['no']}
n_num = sum(1 for c in ALL if c['no'])
n_agenda = sum(1 for c in ALL if not c['no'])
print(f'{len(groups)} parcours · {n_num} dossiers numérotés · {n_agenda} carte(s) agenda · '
      f'{sum(1 for c in ALL if c["vimg"])} images de cartes')

# décret
decret = []
for it in soup.select('#decret .step, #decret li, #decret article'):
    strong = it.find(['h3', 'h4', 'strong', 'b'])
    label = re.sub(r'^[IVX]+\s*', '', txt(strong))
    ref = it.select_one('a.step-ref')
    ref_txt = txt(ref).rstrip(' →') if ref else ''
    ref_href = ref.get('href', '') if ref else ''
    if ref:
        ref.extract()                           # le renvoi devient un lien, pas une queue de phrase
    body = re.sub(r'^[IVX]+\s*', '', txt(it, ' '))
    if label and body.startswith(label):        # le libellé se répète en tête du corps
        body = body[len(label):].lstrip(' .·—')
    decret.append((label or f'Geste {len(decret)+1}', body,
                   f'[{ref_txt} →]({SITE}{ref_href.lstrip("/")})' if ref_txt else ''))
lead = txt(soup.select_one('.hero .lead'))
sec_kicker = txt(soup.select_one('#dossiers .sec-head .kicker'))
sec_title = txt(soup.select_one('#dossiers .sec-head h2'))
sec_head = txt(soup.select_one('#dossiers .sec-head > p'))
eyebrow = txt(soup.select_one('.hero .eyebrow'))
h1 = txt(soup.select_one('.hero h1'))
creds = [txt(s) for s in soup.select('.hero .credentials span') if txt(s)]
devise = txt(soup.select_one('.emblem textPath')) or '· VERITAS OMNIA VINCIT · AD ASTRA PER ASPERA'
manif_h = txt(soup.select_one('#manifeste .kicker'))
manif_p = txt(soup.select_one('#manifeste .manifesto-cta'))
decret_h = txt(soup.select_one('#decret h2'))
decret_kicker = txt(soup.select_one('#decret .kicker'))
decret_lead = txt(soup.select_one('#decret .decree-lead'))

# image d'accueil
og = copy_asset('assets/og-index.jpg', 'og-index.jpg')

# ---------------------------------------------------------------- plan des passerelles à faire
# (recoupements identifiés : dossiers d'origine des formules + thèmes croisés)
PLAN = [
    ('Dossier III', 'Artemis II', ['Dossier XIV'],
     "vis-viva, Tsiolkovsky, transfert de Hohmann — les 8 formules d'astrodynamique de l'atlas viennent d'ici"),
    ('Dossier XII', 'Tornades, Typhons & Ouragans', ['Dossier XIV'],
     "les 3 formules de vortex de l'atlas (Acte IV « Atmosphère & vortex ») viennent d'ici"),
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
# passerelles déjà posées dans le coffre (dossier A, dossier B, ce qu'elles relient)
POSEES = [
    ('Dossier XXV', 'Dossier V', 'fond diffus · spin · quanta · états quantiques'),
    ('Dossier XIV', 'Dossier V', 'Bohr · Rydberg · Born · Klechkowski mis en ateliers'),
    ('Dossier XIV', 'Dossier XXV', 'Carnot · Boltzmann · le Maxwell des quatre équations'),
    ('Dossier XII', 'Dossier XIV', 'CAPE · hélicité · Coriolis, dites au micro'),
    ('Dossier XII', 'Dossier XXV', 'le cyclone comme moteur de Carnot · Rankine'),
    ('Dossier VII', 'Dossier XIV', "gradient · divergence & rotationnel · produits "
     "scalaire et vectoriel · Maxwell · Lotka-Volterra, mis en ateliers"),
    ('Dossier VII', 'Dossier XII', 'le rotationnel appliqué à un vrai fluide : '
     'vorticité · cisaillement de vent · hélicité'),
    ('Dossier VII', 'Dossier XXV', "l'autre Maxwell : les quatre équations d'un côté, "
     'le démon de l\'autre'),
    ('Dossier XVII', 'Dossier XIV', "les 8 formules de l'Acte XV « Atmosphères & "
     'exoplanètes » viennent d\'ici — hydrostatique · gaz parfaits · barométrique · '
     'transfert radiatif · transit · Doppler · vitesses radiales · température d\'équilibre'),
    ('Dossier XVII', 'Dossier V', 'les raies spectrales : ce que Bohr explique, '
     'le JWST le lit dans une atmosphère à 700 années-lumière'),
    ('Dossier XVII', 'Dossier XII', "le même effet Doppler — sur une étoile qui tangue, "
     'et sur l\'écho radar d\'un mésocyclone ; et la même physique d\'atmosphère'),
    ('Dossier XVII', 'Dossier XXV', "l'effet de serre et l'habitabilité comme bilan "
     'radiatif : visible concentré à l\'entrée, infrarouge tiède à la sortie'),
]
EXPORTED_NUMS = set(EXPORTED)

def statut(c):
    return '📦' if c['no'] in EXPORTED else ('📅' if c['agenda'] else '🌐')

def lien_coffre(c, alias=None):
    """Wikilink vers le MOC si le dossier est exporté, sinon lien vers le site."""
    if c['no'] in EXPORTED:
        return f'[[{EXPORTED[c["no"]]["moc"]}|{alias or c["title"]}]]'
    return f'[{alias or c["title"]}]({SITE}{c["href"]})'

# ================================================================ INDEX DES DOSSIERS
u = [f'''---
projet: Empire contre Intox
type: index-des-dossiers
site: {SITE}
dossiers: {n_num}
parcours: {len(groups)}
exportés: {len(EXPORTED)}
importé: {TODAY}
tags: [empire-contre-intox, index, catalogue]
aliases: ["Index des dossiers", "Catalogue ECI", "Les dossiers de l'Empire", "Empire contre Intox"]
---

# Empire contre Intox — l'index des dossiers

![[{og or 'og-index.jpg'}|760]]

> [!quote] {eyebrow}
> ## {h1}
> {lead}
>
> **{" · ".join(creds)}**
> *{devise.strip(' ·')}*

> [!tip] Le poste de pilotage
> [[{DASH}|⌂ Tableau de bord de l'Empire]] · [[{CARTE}.canvas|🗺️ La carte de l'Empire]] · [[{BASE}.base|🗃️ Toutes les notes]]

> [!abstract] {sec_kicker} — {sec_title}
> {sec_head}

Le catalogue complet reprend, dossier par dossier, **tout ce que porte la carte de l'accueil** : vignette, numéro, badge, résumé, mots-clés, autrices et auteurs. Les dossiers **déjà exportés dans Obsidian** sont marqués 📦 et ouvrent leur sommaire dans le coffre ; les autres (🌐) ouvrent leur page en ligne, en attendant leur export par la skill `dossier-to-obsidian`.

## Les {n_num} dossiers en un coup d'œil

| # | Dossier | Parcours | Badge | Réalisé par | Coffre |
| --: | --- | --- | --- | --- | :-: |''']
for c in sorted([x for x in ALL if x['no']], key=lambda x: x['n']):
    av = ' '.join(f'![[{a["file"]}\\|20]]' for a in c['avatars'] if a['file'])
    u.append(f'| {c["roman"]} | {esc(lien_coffre(c))} | {esc(c["group"])} | {esc(c["badge"])} '
             f'| {av} {esc(c["who"])} | {statut(c)} |')
for c in [x for x in ALL if x['agenda']]:
    av = ' '.join(f'![[{a["file"]}\\|20]]' for a in c['avatars'] if a['file'])
    u.append(f'| 📅 | [{esc(c["title"])}]({SITE}{c["href"]}) | {esc(c["group"])} | {esc(c["badge"])} '
             f'| {av} {esc(c["who"])} | 📅 |')
u.append('')

# ---- les parcours, carte par carte
for g in groups:
    u.append(f'## {g["roman"]} · {g["title"]}\n')
    u.append(f'> [!info] {g["count"]} — accent `{g["accent"]}`\n> *{g["desc"]}*\n')
    for c in g['cards']:
        head = f'{c["label"]} — {c["title"]}' if not c['agenda'] else f'📅 {c["title"]}'
        u.append(f'### {statut(c)} {head}\n')
        if c['vimg']:
            u.append(f'![[{c["vimg"]}|620]]')
            u.append(f'*{c["alt"]}*\n' if c['alt'] else '')
        u.append(f'> [!abstract] {c["badge"]}\n> {c["desc"]}\n>')
        u.append('> 🏷️ ' + ' · '.join(f'`{t}`' for t in c['tags']))
        av = ' '.join(f'![[{a["file"]}|22]]' for a in c['avatars'] if a['file'])
        note = f' *({c["note"]})*' if c['note'] else ''
        u.append(f'> ✍️ {av} **{c["who"]}**{note}')
        links = [f'[🌐 Lire en ligne]({SITE}{c["href"]})']
        if c['no'] in EXPORTED:
            info = EXPORTED[c['no']]
            links.insert(0, f'[[{info["moc"]}|📦 Le dossier dans le coffre]]')
            if info['dash']:
                links.append(f'[[{info["dash"]}|⌂ son tableau de bord]]')
            for cv in info['canvas']:
                links.append(f'[[{cv}|🗺️ {os.path.splitext(cv)[0].split("— ")[-1]}]]')
        u.append('> 🔗 ' + ' · '.join(links))
        u.append(f'>\n> 🎨 accent `{c["accent"]}`\n')

# ---- index par autrice / auteur
u.append('## Le catalogue par autrice & auteur\n')
by_person = {}
for c in ALL:
    for a in c['avatars']:
        by_person.setdefault(a['name'], {'file': a['file'], 'cards': []})['cards'].append(c)
u.append('| | Contributeur | Dossiers | Numéros |')
u.append('| :-: | --- | --: | --- |')
for name, info in sorted(by_person.items(), key=lambda kv: (-len(kv[1]['cards']), kv[0])):
    nums = ' · '.join((c['roman'] or '📅') for c in sorted(info['cards'], key=lambda x: x['n']))
    av = f'![[{info["file"]}\\|28]]' if info['file'] else ''
    u.append(f'| {av} | **{name}** | {len(info["cards"])} | {nums} |')
u.append('')

# ---- index par mot-clé
u.append('## Le catalogue par mot-clé\n')
by_tag = {}
for c in ALL:
    for t in c['tags']:
        by_tag.setdefault(t, []).append(c)
multi = {t: v for t, v in by_tag.items() if len(v) > 1}
solo = {t: v for t, v in by_tag.items() if len(v) == 1}
u.append(f'{len(by_tag)} mots-clés distincts sur les {len(ALL)} cartes de l\'accueil — '
         f'{len(multi)} reviennent sur plusieurs dossiers.\n')
u.append('| Mot-clé | Dossiers | Lesquels |')
u.append('| --- | --: | --- |')
for t, v in sorted(multi.items(), key=lambda kv: (-len(kv[1]), kv[0])):
    who = ' · '.join(esc(lien_coffre(c, c['roman'] or '📅')) for c in sorted(v, key=lambda x: x['n']))
    u.append(f'| `{esc(t)}` | {len(v)} | {who} |')
u.append('')
u.append('**Mots-clés propres à un seul dossier** — ' +
         ' · '.join(f'`{t}` ({v[0]["roman"] or "📅"})' for t, v in sorted(solo.items())) + '\n')

# ---- manifeste, décret, ressources
if manif_h:
    u.append(f'## {manif_h}\n')
    u.append(f'> [!quote] Le manifeste vidéo de l\'accueil\n> {manif_p}\n> \n'
             f'> ▶️ [Voir le manifeste sur le site]({SITE}#manifeste)\n')
u.append(f'## {decret_kicker or "Le décret méthodologique"}\n')
u.append(f'**{decret_h}** *{decret_lead}*\n')
for i, (label, body, ref) in enumerate(decret, 1):
    u.append(f'{i}. **{label}** — {body}' + (f' — {ref}' if ref else ''))
u.append('')
u.append('## Ressources\n\n'
         f'| | |\n| --- | --- |\n'
         f'| 🌐 [Le site]({SITE}) | 🪞 [Miroir GitHub Pages](https://thesamlepirate.github.io/empire-contre-intox/) |\n'
         f'| 📡 [Flux RSS]({SITE}rss.xml) | 📜 [Licence CC BY-NC-ND 4.0]({SITE}LICENCE-CONTENU.md) |\n'
         f'| 🔬 [Dossier XXVIII · Les Sources]({SITE}sources/sources.html) | 📅 [Calendrier des lives]({SITE}empire-calendrier) |\n'
         f'| ⌂ [[{DASH}\\|Le tableau de bord de l\'Empire]] | 🗺️ [[{CARTE}.canvas\\|La carte de l\'Empire]] |\n')
u.append('---\n*Exports réalisés avec la skill `dossier-to-obsidian` — chaque dossier exporté apporte '
         'son sommaire, son tableau de bord, son formulaire, ses sources vérifiées et ses passerelles '
         f'vers les dossiers voisins.*\n\n*{devise.strip(" ·")}*')
wr(UMB + '.md', '\n'.join(u) + '\n')
print(f'✔ {UMB}.md — {n_num} fiches, {len(by_person)} contributeurs, {len(by_tag)} mots-clés')

# ================================================================ SUPER TABLEAU DE BORD
d = [f'''---
projet: Empire contre Intox
type: tableau-de-bord-global
site: {SITE}
importé: {TODAY}
tags: [empire-contre-intox, tableau-de-bord, index]
aliases: ["ECI", "Tableau de bord ECI", "⌂ Empire contre Intox", "Accueil du coffre"]
---

# ⌂ Empire contre Intox — tableau de bord

![[og-index.jpg|600]]

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
for num, info in sorted(EXPORTED.items(), key=lambda kv: r2i(kv[0].split()[-1])):
    card = BYNUM.get(num)
    t = card['title'] if card else info['moc']
    d.append(f'### 📦 {num} — [[{info["moc"]}|{t}]]\n')
    if card:
        if card['vimg']:
            d.append(f'![[{card["vimg"]}|420]]\n')
        d.append(f'*{card["desc"]}*\n')
        note = f' *({card["note"]})*' if card['note'] else ''
        d.append(f'**{card["who"]}**{note} · {" · ".join(card["tags"])} · badge « {card["badge"]} »\n')
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
for a, b, why in POSEES:
    ta = BYNUM[a]['title'] if a in BYNUM else a
    tb = BYNUM[b]['title'] if b in BYNUM else b
    d.append(f'- **{a} ↔ {b}** — {why} *({ta} ↔ {tb})* ;')
d.append('')

d.append('## Le décret méthodologique\n')
d.append(f'**{decret_h}** *{decret_lead}*\n')
for i, (label, body, ref) in enumerate(decret, 1):
    d.append(f'{i}. **{label}** — {body}' + (f' — {ref}' if ref else ''))
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
n_notes = len({p for p in glob.glob(os.path.join(ECI, '**', '*.md'), recursive=True)
                if '_assets' not in p} | {os.path.join(ECI, DASH + '.md')})
n_canvas = len(glob.glob(os.path.join(ECI, '**', '*.canvas'), recursive=True)) + 1
n_bases = len(glob.glob(os.path.join(ECI, '**', '*.base'), recursive=True))
body = '\n'.join(d).replace('{NOTES}', str(n_notes)).replace('{CANVAS}', str(n_canvas)) \
                   .replace('{BASES}', str(n_bases))
wr(DASH + '.md', body + '\n')
print(f'✔ {DASH}.md')

# ================================================================ CARTE DE L'EMPIRE (canvas)
NW, IMG_H, VGAP, CARD_H = 420, 260, 16, 340
CELL_H = IMG_H + VGAP + CARD_H
GAP, PADX, PADY = 44, 44, 104
COLS = 4
nodes, edges = [], []
nodes.append({'id': 'hub', 'type': 'file', 'file': f'{VPATH}/{DASH}.md',
              'x': 44, 'y': 40, 'width': 640, 'height': 460, 'color': '3'})
nodes.append({'id': 'umb', 'type': 'file', 'file': f'{VPATH}/{UMB}.md',
              'x': 724, 'y': 40, 'width': 520, 'height': 460})
if og:
    nodes.append({'id': 'hero', 'type': 'file', 'file': f'{VPATH}/_assets/{og}',
                  'x': 1284, 'y': 40, 'width': 520, 'height': 285})
nodes.append({'id': 'devise', 'type': 'text', 'x': 1284, 'y': 345, 'width': 520, 'height': 155,
              'color': '3',
              'text': f"# Empire contre Intox\n**{n_num} dossiers · {len(groups)} parcours**\n\n"
                      "📦 sommaire dans le coffre · 🌐 en ligne seulement · "
                      "➜ trait plein = passerelle posée, pointillé = à poser\n\n"
                      "**Veritas omnia vincit**"})
y = 560
node_of = {}            # "Dossier V" -> id du nœud carte
for g in groups:
    cards = g['cards']
    rows = (len(cards) + COLS - 1) // COLS
    gh = PADY + rows * (CELL_H + GAP) + GAP
    gw = PADX * 2 + COLS * (NW + GAP)
    gid = f'g{g["roman"]}'
    nodes.append({'id': gid, 'type': 'group', 'x': 44, 'y': y, 'width': gw, 'height': gh,
                  'color': g['accent'] or '6',
                  'label': f'{g["roman"]} · {g["title"]} — {g["count"]}'})
    edges.append({'id': f'e-{gid}', 'fromNode': 'hub', 'toNode': gid,
                  'fromSide': 'bottom', 'toSide': 'top', 'label': g['title']})
    for i, c in enumerate(cards):
        r, col = divmod(i, COLS)
        x = 44 + PADX + col * (NW + GAP)
        yy = y + PADY + r * (CELL_H + GAP)
        nid = f'{gid}-{i}'
        if c['vimg']:
            nodes.append({'id': nid + '-img', 'type': 'file', 'file': f'{VPATH}/_assets/{c["vimg"]}',
                          'x': x, 'y': yy, 'width': NW, 'height': IMG_H, 'color': c['accent'] or None})
        cy = yy + IMG_H + VGAP
        if c['no'] in EXPORTED:
            nodes.append({'id': nid, 'type': 'file',
                          'file': f'{VPATH}/{EXPORTED[c["no"]]["folder"]}/{EXPORTED[c["no"]]["moc"]}.md',
                          'x': x, 'y': cy, 'width': NW, 'height': CARD_H, 'color': c['accent'] or '4'})
        else:
            no = c['label'] or '📅 Carte agenda'
            who = c['who'] + (f' ({c["note"]})' if c['note'] else '')
            nodes.append({'id': nid, 'type': 'text', 'x': x, 'y': cy, 'width': NW, 'height': CARD_H,
                          'color': c['accent'] or None,
                          'text': f'### {no} · 🌐\n**{c["title"]}** — *{c["badge"]}*\n\n{c["desc"]}\n\n'
                                  f'✍️ {who}\n🏷️ {" · ".join(c["tags"])}\n\n'
                                  f'[🌐 Lire en ligne]({SITE}{c["href"]})'})
        if c['no']:
            node_of[c['no']] = nid
        if c['vimg']:
            edges.append({'id': f'e-img-{nid}', 'fromNode': nid + '-img', 'toNode': nid,
                          'fromSide': 'bottom', 'toSide': 'top'})
    y += gh + 80

# les nœuds sans couleur explicite : retirer la clé plutôt que la laisser à null
for n in nodes:
    if n.get('color') is None:
        n.pop('color', None)

# passerelles : trait continu pour celles qui existent, pointillé (gris) pour le plan
for a, b, why in POSEES:
    if a in node_of and b in node_of:
        edges.append({'id': f'p-{a}-{b}'.replace(' ', ''), 'fromNode': node_of[a], 'toNode': node_of[b],
                      'fromSide': 'right', 'toSide': 'left', 'color': '4', 'label': f'🔗 {why}'})
for num, title, targets, why in PLAN:
    if num in EXPORTED_NUMS or num not in node_of:
        continue
    for t in targets:
        if t in node_of:
            edges.append({'id': f'q-{num}-{t}'.replace(' ', ''), 'fromNode': node_of[num],
                          'toNode': node_of[t], 'fromSide': 'right', 'toSide': 'left',
                          'label': f'à poser · {why[:60]}…'})
json.dump({'nodes': nodes, 'edges': edges},
          open(os.path.join(ECI, CARTE + '.canvas'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print(f'✔ {CARTE}.canvas — {len(nodes)} nœuds ({sum(1 for n in nodes if n["id"].endswith("-img"))} images), '
      f'{len(edges)} arêtes')

# ---------------------------------------------------------------- câblage : MOC des dossiers
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
