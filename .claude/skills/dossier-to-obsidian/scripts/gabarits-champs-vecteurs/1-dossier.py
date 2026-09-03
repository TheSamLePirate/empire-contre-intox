#!/usr/bin/env python3
"""Dossier VII « Le langage des champs » → Obsidian : MOC + notes de lecture.

Gabarit adapté de `gabarits-ordinateur-1983/1-dossier.py` au cas d'un dossier
en **identité invitée** (voie B) : une `<section class="wrap chapter">` par
chapitre, `.body` + `.panel` + `.diagram` + `.formula-block`, deux ateliers
`<canvas>` dont le contenu vit dans le JavaScript.
"""
import os, re, json, shutil
from bs4 import BeautifulSoup, NavigableString, Tag

REPO = '/Users/olivierveinand/Documents/DEV/empire-contre-intox'
SRC = os.path.join(REPO, 'samlepirate/champs-vecteurs.html')
VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
OUT = os.path.join(VAULT, 'Empire contre Intox', 'Dossier VII — Champs de vecteurs')
ASSETS = os.path.join(OUT, '_assets')
URL = 'https://empire-contre-intox.com/samlepirate/champs-vecteurs.html'
MOC = 'Dossier VII — Le langage des champs'
TODAY = '2026-08-25'

os.makedirs(ASSETS, exist_ok=True)
html = open(SRC, encoding='utf-8').read()
soup = BeautifulSoup(html, 'html.parser')
main = soup.find('main')

# ───────────────────────────────────────────── images
IMG = {
    'assets/champ-vecteurs-grille.jpg': 'champs-grille.jpg',
    'assets/colline-gradient.jpg': 'champs-colline.jpg',
    'assets/maxwell-onde.jpg': 'champs-maxwell.jpg',
    'assets/phase-renards-lapins.jpg': 'champs-phases.jpg',
}
for src, dst in list(IMG.items()) + [('assets/champs-vecteurs-hero.jpg', 'champs-hero.jpg')]:
    p = os.path.join(REPO, 'samlepirate', src)
    if os.path.exists(p):
        shutil.copy2(p, os.path.join(ASSETS, dst))
shutil.copy2(os.path.join(REPO, 'samlepirate/samlepirate.jpeg'),
             os.path.join(ASSETS, 'avatar-samlepirate.jpeg'))

# ───────────────────────────────────────────── conversion en ligne
def clean(t):
    """Espaces insécables → espace simple ; on ne touche à rien d'autre."""
    return t.replace('\xa0', ' ').replace('\u202f', ' ')

def inline(node):
    """HTML en ligne → Markdown. N'ajoute jamais d'espace : le source a les siens."""
    if isinstance(node, NavigableString):
        return re.sub(' +', ' ', clean(str(node)))
    if not isinstance(node, Tag):
        return ''
    cls = node.get('class') or []
    if node.name == 'br':
        return '\n'
    if 'imath' in cls:
        tex = node.get('data-tex', '').strip()
        return f'${tex}$' if tex else ''
    inner = ''.join(inline(c) for c in node.children)
    if node.name in ('b', 'strong'):
        return f'**{inner.strip()}**' if inner.strip() else ''
    if node.name in ('i', 'em', 'cite') or {'w-flow', 'w-sink', 'w-curl', 'w-iris'} & set(cls):
        return f'*{inner.strip()}*' if inner.strip() else ''
    if node.name == 'a':
        href = node.get('href', '')
        if href.startswith('#'):
            return inner
        if href.startswith('http'):
            return f'[{inner.strip()}]({href})'
        if href.startswith('../'):
            return f'[{inner.strip()}](https://empire-contre-intox.com/{href[3:]})'
        return inner
    return inner

def txt(node):
    return re.sub(' +', ' ', inline(node)).strip()

def quote(body, marker='> '):
    out = []
    for chunk in body:
        for line in chunk.split('\n'):
            out.append((marker + line).rstrip())
        out.append('>')
    while out and out[-1] == '>':
        out.pop()
    return '\n'.join(out)

# ───────────────────────────────────────────── blocs
FORMULA_N = [0]

def formula_block(fb):
    """.formula-block → callout [!abstract] + ^formule-N."""
    FORMULA_N[0] += 1
    n = FORMULA_N[0]
    head = fb.find(class_='fb-head')
    tag = head.find(class_='fb-tag')
    title = txt(head).replace(txt(tag), '').strip() if tag else txt(head)
    label = f'{title} · {txt(tag)}' if tag else title
    body = ['$$' + f.get('data-tex').strip() + '$$'
            for f in fb.find_all(class_='formula') if f.get('data-tex')]
    # la ligne « Se lit » : la phrase, puis la glose des symboles
    say = fb.find(class_='fb-say')
    if say:
        st = say.find(class_='say-t')
        sx = st.find(class_='say-x') if st else None
        gloss = txt(sx) if sx else ''
        if sx:
            sx.extract()
        body.append(f'**Se lit** — {txt(st)}')
        if gloss:
            body.append(f'*{gloss}*')
    note = fb.find(class_='fb-note')
    if note:
        body.append(txt(note))
    return f'> [!abstract] 🧮 {label}\n' + quote(body) + f'\n^formule-{n}', n

PANEL_KIND = {
    'La leçon': ('important', '💡'),
    'Définition opératoire': ('info', '📐'),
    'Précision honnête': ('info', '📐'),
    'Garde-fou — la convention de signe': ('warning', '⚠️'),
    'Esprit critique': ('warning', '⚠️'),
}

def panel(p):
    pl = txt(p.find(class_='pl')) if p.find(class_='pl') else ''
    h5 = p.find('h5')
    kind, emo = PANEL_KIND.get(pl, ('info', '📐'))
    title = f'{emo} {txt(h5)}' if h5 else f'{emo} {pl}'
    body = [txt(x) for x in p.find_all('p', recursive=False)]
    body = [b for b in body if b]
    if h5 and pl:
        body.append(f'*{pl}*')
    return f'> [!{kind}] {title}\n' + quote(body)

def blockquote(bq):
    src = bq.find(class_='src')
    body = [txt(p) for p in bq.find_all('p')]
    out = '> [!quote] ' + (txt(src) if src else 'Citation')
    return out + '\n' + quote(body)

def plate(fig):
    img = fig.find('img')
    tag = fig.find(class_='tag')
    if not img:
        return ''
    dst = IMG.get(img.get('src', ''), os.path.basename(img.get('src', '')))
    alt = clean(img.get('alt', ''))
    out = f'![{alt}](_assets/{dst})'
    if tag:
        out += f'\n*{txt(tag)}*'
    return out

def diagram(dg, anchor):
    cap = dg.find(class_='cap')
    svg = dg.find('svg')
    aria = clean(svg.get('aria-label', '')) if svg else ''
    labels = [clean(t.get_text()).strip() for t in dg.find_all('text')]
    labels = [l for l in labels if l]
    title = txt(cap) if cap else 'Figure'
    title = title.replace('**', '')
    body = []
    if aria:
        body.append(f'*Ce que montre le schéma* — {aria}.')
    if labels:
        body.append('*Étiquettes* — ' + ' · '.join(f'« {l} »' for l in labels) + '.')
    body.append(f'Figure vectorielle **dessinée en direct** par la page : '
                f'[la voir dans le dossier]({URL}#{anchor}).')
    return f'> [!note] 📐 {title}\n' + quote(body)

def phase_lab(pw):
    """.phase-wrap → les paragraphes de commentaire + l'atelier II en callout."""
    note = pw.find(class_='phase-note')
    out = [txt(p) for p in note.find_all('p')] if note else []
    ax = [txt(a) for a in pw.find_all(class_='ax')]
    al, be, ga, de = (float(LV[k]) for k in ('al', 'be', 'ga', 'de'))
    tex = lambda v: f'{v:g}'.replace('.', '{,}')      # 0.9 → 0{,}9 (virgule française)
    eq = f'({tex(ga / de)} ; {tex(al / be)})'.replace('{,}', ',')
    out.append(
        "> [!example]- 🧪 Atelier II — le portrait de phase, jouable en ligne\n"
        f"> Trois cents trajectoires lâchées au hasard dans le carré "
        f"$[0\\,;{MX.replace('.', '{,}')}]^2$ "
        "dérivent selon Lotka-Volterra, avec les coefficients réellement câblés dans "
        f"la page : $\\alpha={tex(al)}$, $\\beta={tex(be)}$, $\\gamma={tex(ga)}$, "
        f"$\\delta={tex(de)}$. "
        f"L'équilibre $(\\gamma/\\delta\\,;\\,\\alpha/\\beta)$ tombe donc en **{eq}** — "
        "c'est le point ambre autour duquel tout tourne, et il est marqué à l'écran.\n"
        ">\n"
        f"> Les axes sont ceux du dossier : {' et '.join(ax)}. Une trajectoire est "
        "**corail** quand les renards l'emportent en nombre sur les lapins, "
        "**turquoise** dans le cas contraire — on voit ainsi la bascule tourner autour "
        "de la diagonale.\n"
        ">\n"
        f"> ▶ **[Ouvrir le portrait de phase]({URL}#phases)**.\n"
        '^atelier-2')
    return '\n\n'.join(out)


def cards(triad):
    out = []
    for c in triad.find_all('article', class_='card'):
        ic = txt(c.find(class_='ic'))
        h4 = txt(c.find('h4'))
        sym = txt(c.find(class_='sym'))
        p = txt(c.find('p'))
        out.append(f'> [!note] {h4}  ·  `{sym}`\n> **{ic}** — {p}')
    return '\n\n'.join(out)

# ───────────────────────────────────────────── le contenu vivant du JavaScript
script = next(s.get_text() for s in soup.find_all('script') if 'const F={' in s.get_text())

FIELDS = re.findall(
    r"(\w+):\{nom:'([^']*)',u:\(x,y\)=>([^,]+),v:\(x,y\)=>([^,]+),"
    r"div:(-?\d+),curl:(-?\d+),d:'(.*?)'\}(?:,|\s*\})", script)
assert len(FIELDS) == 6, f'champs de l\'atelier : {len(FIELDS)} trouvés'

HERO_FIELD = re.search(r'const field=\(x,y,t\)=> (.+?);', script).group(1)
LV = dict(re.findall(r'(al|be|ga|de)=([\d.]+)', script))
MX = re.search(r'MX=([\d.]+)', script).group(1)

def md_field(f):
    key, nom, u, v, div, curl, d = f
    desc = BeautifulSoup(d, 'html.parser')
    return dict(key=key, nom=nom, u=u.strip(), v=v.strip(),
                div=int(div), curl=int(curl), d=txt(desc))

FLD = [md_field(f) for f in FIELDS]
json.dump({'fields': FLD, 'hero': HERO_FIELD, 'lv': LV, 'mx': MX},
          open('/tmp/vii-data.json', 'w'), ensure_ascii=False, indent=1)

# ───────────────────────────────────────────── plan des notes
SECTIONS = [
    dict(id='these',      file='00 — Ouverture — Une flèche sur chaque point',
         h1='Ouverture — Une flèche sur chaque point',
         alias=['Ouverture', 'Une flèche sur chaque point'], ancre='these'),
    dict(id='lexique',    file='01 — Chapitre I — Scalaire, vecteur, champ',
         h1='Chapitre I — Scalaire, vecteur, champ',
         alias=['Chapitre I', 'Scalaire, vecteur, champ', 'Le vocabulaire'], ancre='lexique'),
    dict(id='champs',     file='02 — Chapitre II — Les champs de vecteurs',
         h1='Chapitre II — Les champs de vecteurs',
         alias=['Chapitre II', 'Les champs de vecteurs'], ancre='champs'),
    dict(id='fluide',     file="03 — Chapitre III — Et si c'était un fluide",
         h1="Chapitre III — Et si c'était un fluide ?",
         alias=['Chapitre III', 'Le gradient', "Et si c'était un fluide"], ancre='fluide'),
    dict(id='divergence', file='04 — Chapitre IV — La divergence',
         h1='Chapitre IV — La divergence',
         alias=['Chapitre IV', 'La divergence', 'Sources & puits'], ancre='divergence'),
    dict(id='rotationnel', file='05 — Chapitre V — Le rotationnel',
         h1='Chapitre V — Le rotationnel',
         alias=['Chapitre V', 'Le rotationnel', 'La brindille qui tourne'], ancre='rotationnel'),
    dict(id='atelier',    file='06 — Atelier I — Lâchez une brindille dans le fluide',
         h1='Atelier I — Lâchez une brindille dans le fluide',
         alias=['Atelier I', 'Atelier des champs', 'Lâchez une brindille'], ancre='atelier'),
    dict(id='maxwell',    file='07 — Chapitre VI — Le langage de Maxwell',
         h1='Chapitre VI — Le langage de Maxwell',
         alias=['Chapitre VI', 'Le langage de Maxwell', 'Les quatre équations'], ancre='maxwell'),
    dict(id='phases',     file="08 — Chapitre VII — L'espace des phases",
         h1="Chapitre VII — L'espace des phases",
         alias=['Chapitre VII', "L'espace des phases", 'Lotka-Volterra'], ancre='phases'),
    dict(id='lien',       file='09 — Chapitre VIII — Produit scalaire & vectoriel',
         h1='Chapitre VIII — Produit scalaire & vectoriel',
         alias=['Chapitre VIII', 'Produit scalaire & vectoriel', 'Le lien profond'], ancre='lien'),
    dict(id='__recap',    file='10 — Mémo — Deux nombres, deux questions',
         h1='Mémo — Deux nombres, deux questions',
         alias=['Mémo', 'Deux nombres, deux questions'], ancre='lien'),
    dict(id='__coda',     file="11 — Le mot de la fin — Un amour des maths",
         h1='Le mot de la fin — Un amour des maths',
         alias=['Le mot de la fin', 'Coda'], ancre='lien'),
]

TAGS = ('empire-contre-intox/dossier-vii, mathematiques, analyse-vectorielle, '
        'champs-de-vecteurs, physique')

def front(extra, alias, ordre):
    a = ', '.join(f'"{x}"' for x in alias)
    return ('---\n'
            'projet: Empire contre Intox\n'
            'dossier: VII\n'
            'titre-dossier: "Le langage des champs"\n'
            'auteurs: [Samlepirate]\n'
            'd-apres: "3Blue1Brown (Grant Sanderson)"\n'
            f'source: {URL}\n'
            'licence: CC BY-NC-ND 4.0\n'
            f'importé: {TODAY}\n'
            f'tags: [{TAGS}]\n'
            f'aliases: [{a}]\n'
            + extra +
            f'ordre: {ordre}\n'
            '---\n\n')

# ───────────────────────────────────────────── rendu d'une section de chapitre
def render_chapter(sec, meta):
    """Parcourt les enfants directs de la section dans l'ordre du DOM."""
    out, heads = [], []
    head = sec.find(class_='chap-head')
    lede = head.find(class_='lede') if head else None
    n = head.find(class_='n') if head else None
    if n:
        # « Chapitre IV — Sources & puits » → « Sources & puits » (le H1 dit déjà le rang)
        out.append('*' + re.sub(r'^Chapitre [IVX]+ — ', '', txt(n)) + '*')
    if lede:
        out.append(f'**{txt(lede)}**')
    for child in sec.find_all(recursive=False):
        cls = child.get('class') or []
        if 'chap-head' in cls:
            continue
        if 'plate' in cls:
            out.append(plate(child))
        elif 'triad' in cls:
            out.append(cards(child))
        elif 'diagram' in cls:
            out.append(diagram(child, meta['ancre']))
        elif 'companion' in cls:
            a = child.find('a')
            lbl = clean(a.get_text()).replace('↗', '').strip()
            out.append('> [!example]- 🧰 ' + txt(child.find('h4')) +
                       f" · *{txt(child.find(class_='cl'))}*\n" +
                       quote([txt(child.find('p')),
                              f'▶ **[{lbl}]({a["href"]})** — application externe, '
                              'hors du coffre.']))
        elif 'phase-wrap' in cls:
            out.append(phase_lab(child))
        elif 'body' in cls:
            for el in child.find_all(recursive=False):
                ec = el.get('class') or []
                if el.name == 'p' and not ec:
                    out.append(txt(el))
                elif 'formula-block' in ec:
                    blk, num = formula_block(el)
                    out.append(blk)
                elif 'panel' in ec:
                    out.append(panel(el))
                elif el.name == 'blockquote':
                    out.append(blockquote(el))
                elif 'triad' in ec:
                    out.append(cards(el))
                elif 'diagram' in ec:
                    out.append(diagram(el, meta['ancre']))
    return out, heads

# ───────────────────────────────────────────── sections spéciales
def render_these(sec, meta):
    out = []
    pull = sec.find(class_='pull')
    out.append(f'> [!quote] Le geste de départ\n> {txt(pull)}')
    for p in sec.find_all('p', recursive=False):
        if 'pull' in (p.get('class') or []):
            continue
        out.append(txt(p))
    out.append('## Les trois idées maîtresses')
    out.append(cards(sec.find(class_='triad')))
    out.append('## Le hero est lui-même un champ')
    out.append("L'image d'accueil du dossier n'est pas un dessin : c'est un champ de "
               "vecteurs **calculé image par image**, dans lequel dérivent près de "
               "1 700 particules qui laissent leur trace. L'angle de la flèche en "
               "chaque point du plan vaut, à l'instant $t$ :")
    out.append('> [!abstract] 🧮 Le champ génératif du hero · trois ondes superposées\n'
               '> $$\\theta(x,y,t)=\\pi\\Bigl[\\sin(0{,}0042\\,x+0{,}18\\,t)'
               '+\\cos(0{,}0039\\,y-0{,}13\\,t)'
               '+0{,}6\\sin\\bigl(0{,}0026\\,(x+y)+0{,}09\\,t\\bigr)\\Bigr]$$\n'
               '>\n'
               "> Trois sinusoïdes de longueurs d'onde et de vitesses différentes, "
               "additionnées puis multipliées par $\\pi$ : c'est tout. Les tourbillons, "
               "les couloirs rapides et les zones mortes qu'on croit reconnaître à "
               "l'écran ne sont écrits nulle part — ils **émergent** de cette somme. "
               "Le dossier s'ouvre donc sur une démonstration silencieuse de sa propre "
               "thèse : une règle par point suffit à faire un monde.\n"
               '>\n'
               "> *Relevé dans le code de la page* (`const field=(x,y,t)=>…`), "
               f"[à voir en direct]({URL}).\n"
               '^formule-hero')
    return out, []

def render_atelier(sec, meta):
    band = sec.find(class_='band')
    out = [f"*{txt(band.find(class_='n'))}*", f"**{txt(band.find(class_='lede'))}**"]
    out.append("L'atelier est une page vivante : six champs analytiques que l'on "
               "choisit d'un clic, 440 particules qui dérivent dans le flux, une "
               "brindille dorée qui tourne au rythme du rotationnel et un anneau "
               "pointillé qui respire au rythme de la divergence. Le Markdown n'en "
               "garde que la table — mais cette table dit l'essentiel : **quel champ, "
               "quels deux nombres, et ce qu'on voit.**")
    out.append('## Les six champs de l\'atelier')
    rows = ['| Champ | $\\vec F(x,y)$ | $\\nabla\\cdot\\vec F$ | $(\\nabla\\times\\vec F)_z$ | Ce qu\'on voit |',
            '| --- | --- | --- | --- | --- |']
    for f in FLD:
        sign = lambda v: ('+' if v > 0 else '') + str(v)
        rows.append(f"| **{f['nom']}** | $({f['u']},\\ {f['v']})$ | `{sign(f['div'])}` | "
                    f"`{sign(f['curl'])}` | {f['d']} |")
    out.append('\n'.join(rows))
    out.append('> [!tip] 🧭 Comment lire la table\n'
               '> Les deux colonnes du milieu sont les **deux questions du dossier**, '
               'posées au même champ. La *selle* est le cas instructif : elle a l\'air '
               'agitée, et pourtant ses deux nombres sont nuls — ce qui sort à droite '
               'et à gauche est exactement ce qui entre en haut et en bas, et rien ne '
               'tourne en moyenne. **L\'œil n\'est pas un bon juge ; les deux nombres, si.**')
    out.append('> [!success] ✅ Les six champs, recalculés un à un\n'
               "> Les douze nombres de la colonne du milieu ne sont pas recopiés : ils ont "
               "été **redérivés symboliquement** et confrontés à ce que la page affiche. "
               "**Six sur six tombent juste.** Le détail est dans "
               "[[Sources — la vérification du langage des champs#Les six champs de "
               "l'atelier|la fiche de vérification]].\n"
               '>\n'
               "> L'audit du 25 août 2026 a aussi relevé ici la **seule erreur factuelle "
               "du dossier** : la description du champ *Cisaillement* renvoyait au "
               "« chapitre IV » alors que le cisaillement est l'exemple du **chapitre V**, "
               "celui du rotationnel — ce champ a justement une divergence nulle. "
               "**Corrigé dans la page**, et reproduit corrigé ci-dessus.")
    out.append("## La carte des six champs")
    out.append("Les deux nombres de chaque champ font deux coordonnées : la divergence "
               "en abscisse, le rotationnel en ordonnée. Les six champs de l'atelier se "
               "rangent alors d'eux-mêmes — et l'on voit d'un coup ce que l'écran met "
               "six clics à montrer.")
    q = ['```mermaid', 'quadrantChart',
         "    title Les six champs de l'atelier, rangés par leurs deux nombres",
         '    x-axis "ça entre (div < 0)" --> "ça sort (div > 0)"',
         '    y-axis "ça tourne dans un sens" --> "ça tourne dans l\'autre"',
         '    quadrant-1 "ça sort en tournant"', '    quadrant-2 "ça entre en tournant"',
         '    quadrant-3 "ça entre sans tourner"', '    quadrant-4 "ça sort sans tourner"']
    for f in FLD:                       # div et curl ∈ [−2,2] → ramenés sur [0,1]
        q.append(f'    "{f["nom"]}": [{(f["div"] + 2.5) / 5:.2f}, '
                 f'{(f["curl"] + 2.5) / 5:.2f}]')
    q.append('```')
    out.append('\n'.join(q))
    out.append("*Échelle : divergence et rotationnel vont de $-2$ à $+2$, ramenés sur "
               "$[0\\,;1]$ ; le centre du carré est donc le point où les deux nombres "
               "sont nuls — c'est là qu'est la **selle**, au milieu de tout, sans rien "
               "faire.*")
    out.append('## Ce que la page affiche et que le texte ne peut pas rendre')
    out.append('- **440 particules** dérivent dans le champ et laissent une traînée, '
               'colorée par leur vitesse — turquoise pour le flux rapide, ambre pour '
               "l'intermédiaire, corail pour le lent.\n"
               "- Une grille de **14 × 14 flèches** rappelle le champ lui-même, "
               "raccourcies selon la convention du chapitre II "
               "($L \\propto m/(1+0{,}6\\,m)$) pour que les longues n'écrasent pas les "
               "courtes.\n"
               "- La **brindille** dorée, fixée par son centre, tourne à une vitesse "
               "proportionnelle au rotationnel ; l'**anneau** pointillé grandit et "
               "rétrécit au rythme de la divergence, turquoise si elle est positive, "
               "corail si elle est négative.\n"
               "- Trois cases à cocher permettent d'éteindre séparément les particules, "
               "les flèches et la brindille — pour isoler ce que chacune raconte.")
    out.append('> [!example]- 🧪 Atelier I — jouable en ligne uniquement\n'
               '> Choisir un champ, regarder le flux, lire la divergence et le '
               'rotationnel en direct : rien de tout cela ne survit au Markdown.\n'
               '>\n'
               f'> ▶ **[Ouvrir l\'atelier]({URL}#atelier)** *(convention '
               'mathématique : axe $y$ vers le haut, antihoraire positif)*.\n'
               '^atelier-1')
    return out, []

def render_recap(sec, meta):
    out = ['*Mémo — à garder en tête*',
           '**Deux opérations, deux questions posées au même point du même champ.**']
    for col in sec.find_all(class_='col'):
        h3 = txt(col.find('h3'))
        tag = txt(col.find(class_='tag'))
        out.append(f'## {h3} — {tag}')
        rows = ['| | |', '| --- | --- |']
        for div in col.find_all('div'):
            dt, dd = div.find('dt'), div.find('dd')
            if dt and dd:
                rows.append(f'| **{txt(dt)}** | {txt(dd)} |')
        out.append('\n'.join(rows))
    out.append('> [!important] 🎯 À retenir\n'
               "> La divergence répond à « **ça sort ou ça entre ?** », le rotationnel "
               "à « **ça tourne ?** ». Deux nombres par point, calculés sur un voisinage "
               "infiniment petit — donc deux **dérivées**. Tout le reste du dossier, "
               "Maxwell compris, n'est que la conséquence de ces deux questions posées "
               "à des champs différents.\n"
               '^retenir-1')
    return out, []

def render_coda(sec, meta):
    inner = sec.find(class_='inner')
    bq = inner.find('blockquote')
    out = [f"*{txt(inner.find(class_='n'))}*",
           f'> [!quote] 3Blue1Brown — Divergence & rotationnel\n> {txt(bq)}']
    for p in inner.find_all('p'):
        out.append(txt(p))
    out.append('> [!important] 🎯 À retenir\n'
               "> Le dossier ne demande pas qu'on le croie : il donne les deux "
               "questions, les six champs d'essai et le bouton pour les manipuler. "
               "**Montrer plutôt qu'affirmer** — c'est la méthode, et c'est aussi la "
               "réponse de l'Empire à l'intox.\n"
               '^retenir-2')
    return out, []

RENDER = {'these': render_these, 'atelier': render_atelier,
          '__recap': render_recap, '__coda': render_coda}

# ───────────────────────────────────────────── écriture
secs = {}
for s in main.find_all('section', recursive=False):
    sid = s.get('id')
    if sid:
        secs[sid] = s
secs['__recap'] = main.find('section', class_='recap')
secs['__coda'] = main.find('section', class_='coda')

written = []
for i, meta in enumerate(SECTIONS):
    sec = secs[meta['id']]
    body, _ = RENDER.get(meta['id'], render_chapter)(sec, meta)
    extra = ''
    if meta['id'] not in ('these', '__recap', '__coda', 'atelier'):
        extra = f"chapitre: {i}\n"
    extra += f"ancre: {meta['ancre']}\n"
    prev_ = SECTIONS[i - 1] if i else None
    next_ = SECTIONS[i + 1] if i + 1 < len(SECTIONS) else None
    nav = [f'[[{MOC}|⌂ Sommaire du dossier]]']
    if prev_:
        nav.append(f"← [[{prev_['file']}|{prev_['h1']}]]")
    if next_:
        nav.append(f"[[{next_['file']}|{next_['h1']}]] →")
    doc = (front(extra, meta['alias'], i)
           + f"# {meta['h1']}\n\n"
           + '\n\n'.join(x for x in body if x)
           + '\n\n---\n\n' + ' · '.join(nav) + '\n')
    open(os.path.join(OUT, meta['file'] + '.md'), 'w', encoding='utf-8').write(doc)
    written.append(meta['file'])
    print('  +', meta['file'])

print(f'\n{len(written)} notes · {FORMULA_N[0]} blocs de formule numérotés')
json.dump({'sections': SECTIONS, 'formules': FORMULA_N[0]},
          open('/tmp/vii-plan.json', 'w'), ensure_ascii=False, indent=1)
