#!/usr/bin/env python3
"""Valide un dossier Obsidian généré par la skill dossier-to-obsidian.

Usage : python3 check-vault-links.py "<chemin du dossier dans le coffre>"

Vérifie, sur toutes les notes .md du dossier (récursif, `_assets/` exclu) :
  - que chaque wikilink / embed `[[cible]]` pointe vers une note, un canvas,
    une base ou un fichier d'_assets existant (alias `\|` des tables compris) ;
  - que chaque fragment `#Titre` correspond à un titre réel de la cible ;
  - que chaque fragment `#^bloc` correspond à un identifiant de bloc réel ;
  - que chaque .canvas est un JSON valide dont les nœuds fichiers existent ;
  - qu'aucun lien `[[X|X]]` redondant ne subsiste.
Sort avec un code ≠ 0 si quelque chose est cassé.
"""
import sys, os, re, glob, json

if len(sys.argv) != 2:
    sys.exit(__doc__)
ROOT = sys.argv[1].rstrip('/')
VAULT = ROOT
while os.path.basename(os.path.dirname(VAULT)) and not \
        os.path.isdir(os.path.join(os.path.dirname(VAULT), '.obsidian')):
    VAULT = os.path.dirname(VAULT)
    if VAULT == '/':
        VAULT = ROOT
        break
VAULT = os.path.dirname(VAULT) if os.path.isdir(os.path.join(os.path.dirname(VAULT), '.obsidian')) else VAULT
os.chdir(ROOT)

mds = [p for p in glob.glob('**/*.md', recursive=True) if not p.startswith('_assets')]
names = {os.path.splitext(os.path.basename(p))[0] for p in mds}
for pat in ('*.canvas', '*.base'):
    names |= {os.path.basename(p) for p in glob.glob(pat)}
names |= {os.path.basename(p) for p in glob.glob('_assets/*')}

headings, blocks = {}, {}
for p in mds:
    s = open(p, encoding='utf-8').read()
    k = os.path.splitext(os.path.basename(p))[0]
    headings[k] = set(re.findall(r'^#+ (.*)$', s, re.M))
    blocks[k] = set(re.findall(r'^\^([\w-]+)', s, re.M))

bad, redundant = [], []
for p in mds:
    s = open(p, encoding='utf-8').read()
    if re.search(r'\[\[([^\]|]+)\|\1\]\]', s):
        redundant.append(p)
    for m in re.finditer(r'!?\[\[(.+?)\]\]', s):
        inner = re.split(r'\\\||(?<!\\)\|', m.group(1), 1)[0]
        target, _, frag = inner.partition('#')
        target = target.strip()
        if target and target not in names:
            bad.append((p, target))
            continue
        if not frag:
            continue
        if frag.startswith('^'):
            if frag[1:] not in blocks.get(target, set()):
                bad.append((p, inner))
        elif frag not in headings.get(target, set()):
            bad.append((p, inner))

canvas_missing = []
for c in glob.glob('*.canvas'):
    try:
        cv = json.load(open(c, encoding='utf-8'))
    except Exception as e:
        bad.append((c, f'JSON invalide : {e}'))
        continue
    for n in cv.get('nodes', []):
        if n.get('type') == 'file' and not os.path.exists(os.path.join(VAULT, n['file'])):
            canvas_missing.append((c, n['file']))

print(f'{len(mds)} notes · {len(glob.glob("*.canvas"))} canvas · {len(glob.glob("*.base"))} bases')
for label, items in (('liens/embeds cassés', bad), ('nœuds canvas manquants', canvas_missing),
                     ('alias redondants [[X|X]]', redundant)):
    print(f'{label} : ' + ('aucun' if not items else ''))
    for it in items:
        print('  ✗', it)
if bad or canvas_missing:
    sys.exit(1)
print('✔ tout est valide')
