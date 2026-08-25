#!/usr/bin/env python3
# Extrait de sources/sources.html tout ce qui concerne le Dossier XXV (Entropie) :
# les 24 fiches de vérification (donnée → résumé → verdict → sources) et le groupe
# de références DOI — et en fait une note Obsidian câblée au reste du dossier.
import os, re, json, shutil, glob
from bs4 import BeautifulSoup

REPO = '/Users/olivierveinand/Documents/DEV/empire-contre-intox'
SRC = os.path.join(REPO, 'sources', 'sources.html')
OUT = '/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/Dossier XXV — Entropie'
MOC = "Dossier XXV — L'entropie, le temps et l'Univers"
DASH = "Tableau de bord — Entropie"
NOTE = "Sources — la vérification du dossier"
SITE_ROOT = 'https://empire-contre-intox.com/'
QS = r'"((?:[^"\\]|\\.)*)"'

def rd(p): return open(os.path.join(OUT, p), encoding='utf-8').read()
def wr(p, s): open(os.path.join(OUT, p), 'w', encoding='utf-8').write(s)
def js(raw): return json.loads(f'"{raw}"')

html = open(SRC, encoding='utf-8').read()

# ---------------------------------------------------------------- fiches ENTROPIE
i = html.find('const ENTROPIE = [')
arr = html[i:html.find('];', i)]
fiches = []
for chunk in re.split(r'\n\s*\{ t:', arr)[1:]:
    chunk = 't:' + chunk
    g = lambda k: (lambda m: js(m.group(1)) if m else '')(re.search(rf'\b{k}:{QS}', chunk))
    src = []
    msrc = re.search(r'src:\[(.*?)\]', chunk, re.S)
    if msrc:
        for mn in re.finditer(r'\{n:' + QS + r',\s*u:' + QS + r'\}', msrc.group(1)):
            src.append((js(mn.group(1)), js(mn.group(2))))
    fiches.append({'t': g('t'), 'd': g('d'), 'v': re.search(r'\bv:"(\w+)"', chunk).group(1),
                   's': g('s'), 'src': src})
assert len(fiches) == 24, len(fiches)

# ---------------------------------------------------------------- refs DOI du groupe XXV
i = html.find('{ g:"Dossier XXV · L\'Entropie')
nxt = html.find('{ g:"', i + 10)
grp_title = js(re.search(r'g:' + QS, html[i:i+200]).group(1))
grp = html[i:nxt if nxt > 0 else html.find('];', i)]
refs = []
for chunk in re.split(r'\n\s*\{ a:', grp)[1:]:
    chunk = 'a:' + chunk
    g = lambda k: (lambda m: js(m.group(1)) if m else '')(re.search(rf'\b{k}:{QS}', chunk))
    refs.append({'a': g('a'), 't': g('t'), 'j': g('j'), 'k': g('k'),
                 'doi': g('doi'), 'ab': g('ab')})
assert len(refs) == 14, len(refs)

# DOI distincts (groupe + fiches)
dois = {r['doi'] for r in refs if r['doi']}
for f in fiches:
    for n, u in f['src']:
        m = re.search(r'doi\.org/(.+)$', u)
        if m:
            dois.add(m.group(1))
n_doi = len(dois)

# ---------------------------------------------------------------- intro de la section
soup = BeautifulSoup(html[:html.find('<script')], 'html.parser')
sec = soup.select_one('#entropie .sec-head')
intro_p = [p for p in sec.find_all('p') if 'kick' not in (p.get('class') or [])][0]
def inl(el):
    out = ''
    for c in el.children:
        if c.name in ('b', 'strong'):
            out += f'**{c.get_text()}**'
        elif c.name:
            out += c.get_text()
        else:
            out += str(c)
    return re.sub(r'\s+', ' ', out).strip()
intro = inl(intro_p)

# ---------------------------------------------------------------- PDF Shannon dans le coffre
pdf = 'Shannon-Mathematical-theory-of-communication.pdf'
shutil.copy2(os.path.join(REPO, 'provoxys', 'entropie', pdf),
             os.path.join(OUT, '_assets', pdf))

def url(u, label):
    if u.startswith('http'):
        return f'[{label}]({u})'
    if pdf in u:
        return f'[[{pdf}|{label}]]'
    return f'[{label}]({SITE_ROOT}{u.lstrip("./")})'

V = {'ok': ('success', '✅', 'Confirmé'), 'warn': ('warning', '⚠️', 'À nuancer'),
     'deb': ('help', '🔶', 'Débattu')}
counts = {v: sum(1 for f in fiches if f['v'] == v) for v in V}

# ---------------------------------------------------------------- la note
d = [f'''---
projet: Empire contre Intox
dossier: XXV
titre-dossier: "L'entropie, le temps et l'Univers"
source: https://empire-contre-intox.com/sources/sources.html
importé: 2026-08-25
tags: [empire-contre-intox/dossier-xxv, entropie, sources, verification]
aliases: ["Sources entropie", "Vérification du dossier XXV"]
---

# Sources — la vérification du dossier

> [!info] Dossier XXVIII « Les Sources » · section Entropie
> {intro}

Chaque affirmation du dossier a reçu un verdict : **{counts['ok']} ✅ confirmées**, **{counts['warn']} ⚠️ à nuancer** (encadrés anti-intox), **{counts['deb']} 🔶 débattues** — et **{n_doi} DOI distincts vérifiés** via Crossref apparaissent ci-dessous. Rien n'est affirmé sans preuve traçable : c'est la règle du [Décret méthodologique](https://empire-contre-intox.com/#decret).

## Les fiches de vérification
''']
for f in fiches:
    kind, emo, lbl = V[f['v']]
    body = [f'> [!{kind}]{"-" if False else ""} {emo} {f["t"]}']
    body.append(f'> **Donnée :** {f["d"]} · *{lbl}*')
    body.append('>')
    body.append(f'> {f["s"]}')
    if f['src']:
        body.append('>')
        body.append('> **Sources :** ' + ' · '.join(url(u, n) for n, u in f['src']))
    d.append('\n'.join(body) + '\n')

d.append(f'## Références à comité de lecture\n')
d.append(f'*{grp_title}* — chaque DOI a été résolu et confronté à Crossref '
         f'(titre, auteurs, revue) avant d\'être cité. Dépliez pour l\'apport de chaque article.\n')
KIND = {'primary': 'source primaire', 'review': 'revue de synthèse'}
for r in refs:
    d.append(f'> [!cite]- {r["a"]} — *{r["t"]}*\n'
             f'> {r["j"]} · {KIND.get(r["k"], r["k"])} · [doi:{r["doi"]}](https://doi.org/{r["doi"]})\n'
             f'>\n'
             f'> {r["ab"]}\n')

d.append(f'''## Aller plus loin

- 🔎 [La page « Les Sources » en ligne]({SITE_ROOT}sources/sources.html) — moteur de recherche sur toutes les fiches de tous les dossiers ;
- 📄 [Audit complet du dossier XXV]({SITE_ROOT}sources/dossier-25-entropie.md) — affirmation → verdict → valeur de référence → source, avec synthèse des corrections ;
- 📄 [Références DOI complètes]({SITE_ROOT}sources/refs-doi-25-entropie.md) — la liste intégrale des références primaires du dossier ;
- 📕 [[{pdf}|Shannon (1948), texte intégral]] — l'article fondateur, lisible directement dans Obsidian.

---
[[{MOC}|⌂ Sommaire du dossier]] · [[{DASH}|Tableau de bord]] · [[Formulaire — toutes les formules du dossier|Formulaire]]
''')
os.makedirs(os.path.join(OUT, '_assets'), exist_ok=True)
wr(NOTE + '.md', '\n'.join(d))
print(f'✔ {NOTE}.md — {len(fiches)} fiches, {len(refs)} références, {n_doi} DOI distincts')

# ---------------------------------------------------------------- liens auto vers les fiches savants
SAVANTS = ['Kelvin-Planck', 'Carnot', 'Mayer', 'Joule', 'Helmholtz', 'Clausius', 'Kelvin',
           'Maxwell', 'Boltzmann', 'Gibbs', 'Shannon', 'Rényi', 'Bekenstein', 'Hawking',
           'Penrose', 'Smolin']
TARGET = {'Kelvin-Planck': "L'Énoncé de Kelvin-Planck", 'Carnot': 'Sadi Carnot',
          'Mayer': 'Julius Robert von Mayer', 'Joule': 'James Prescott Joule',
          'Helmholtz': 'Hermann von Helmholtz', 'Clausius': 'Rudolf Clausius',
          'Kelvin': 'William Thomson, Lord Kelvin', 'Maxwell': 'James Clerk Maxwell',
          'Boltzmann': 'Ludwig Boltzmann', 'Gibbs': 'Josiah Willard Gibbs',
          'Shannon': 'Claude Shannon', 'Rényi': 'Alfréd Rényi',
          'Bekenstein': 'Jacob Bekenstein', 'Hawking': 'Stephen Hawking',
          'Penrose': 'Roger Penrose', 'Smolin': 'Lee Smolin'}
s = rd(NOTE + '.md')
lines = s.split('\n')
for alias in SAVANTS:
    pat = re.compile(rf'(?<![\w\[\|/–-]){re.escape(alias)}(?![\w\]\|–-])')
    placed = False
    for i, ln in enumerate(lines):
        if ln.startswith('#') or ln.startswith('---') or ln.startswith('^'):
            continue
        skip = [(m.start(), m.end()) for m in re.finditer(r'\[\[.*?\]\]|\]\(.*?\)', ln)]
        for m in pat.finditer(ln):
            if any(a <= m.start() < b for a, b in skip):
                continue
            lines[i] = ln[:m.start()] + f'[[{TARGET[alias]}|{alias}]]' + ln[m.end():]
            placed = True
            break
        if placed:
            break
wr(NOTE + '.md', '\n'.join(lines))
print('✔ liens vers les fiches des savants posés')

# ---------------------------------------------------------------- câblage MOC + tableau de bord + canvas
s = rd(MOC + '.md')
if NOTE not in s:
    s = s.replace('- [[Formulaire — toutes les formules du dossier|Formulaire — les 18 formules du dossier]]',
                  '- [[Formulaire — toutes les formules du dossier|Formulaire — les 18 formules du dossier]]\n'
                  f'- [[{NOTE}|Sources — {len(fiches)} fiches vérifiées · {n_doi} DOI]]')
    wr(MOC + '.md', s)
    print('✔ Sommaire : lien Sources')

s = rd(DASH + '.md')
if NOTE not in s:
    s = s.replace('| 🌐 [Page en ligne]',
                  f'| 🔬 [[{NOTE}\\|Sources & vérification]] | 📚 [Dossier XXVIII en ligne]({SITE_ROOT}sources/sources.html) |\n| 🌐 [Page en ligne]')
    s = s.replace('| Notes | Chapitres | Formules | Termes du lexique | Portraits | Labos (en ligne) | Lecture |',
                  '| Notes | Chapitres | Formules | Termes du lexique | Portraits | Labos (en ligne) | DOI vérifiés | Lecture |')
    s = s.replace('| --- | --- | --- | --- | --- | --- | --- |\n| 31 ',
                  '| --- | --- | --- | --- | --- | --- | --- | --- |\n| 32 ')
    s = re.sub(r'(\| \[26\]\([^)]*\) )\| (≈ 2 h \|)', rf'\1| [[{NOTE}\\|{n_doi}]] | \2', s)
    wr(DASH + '.md', s)
    print('✔ Tableau de bord : accès rapide + colonne DOI')

cv_path = os.path.join(OUT, 'Carte du dossier — Entropie.canvas')
cv = json.load(open(cv_path, encoding='utf-8'))
if not any(n.get('id') == 'srcs' for n in cv['nodes']):
    for n in cv['nodes']:
        if n['id'] == 'g-app':
            n['height'] += 310
        if n['id'] in ('g-bat', 'gal', 'frise'):
            n['y'] += 320
    cv['nodes'].append({'id': 'srcs', 'type': 'file',
                        'file': f'Empire contre Intox/Dossier XXV — Entropie/{NOTE}.md',
                        'x': 2440, 'y': 1500, 'width': 440, 'height': 280})
    json.dump(cv, open(cv_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('✔ Canvas « Carte du dossier » : nœud Sources ajouté à l\'appareil critique')
