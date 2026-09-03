#!/usr/bin/env python3
# Dossier XXVII → note « Sources », depuis sources/sources.html (fiches + DOI).
import os, re, json

REPO = '/Users/olivierveinand/Documents/DEV/empire-contre-intox'
SRC = os.path.join(REPO, 'sources', 'sources.html')
VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
OUT = os.path.join(VAULT, 'Empire contre Intox', 'Dossier XXVII — Ordinateur 1983')
ASSETS = os.path.join(OUT, '_assets')
SITE = 'https://empire-contre-intox.com/samlepirate/ordinateur-1983/'
SRCSITE = 'https://empire-contre-intox.com/sources/'
MOC = "Dossier XXVII — L'Ordinateur de 1983"
DASH = 'Tableau de bord — Ordinateur 1983'
SOURCES = "Sources — la vérification de l'Ordinateur de 1983"
BANC = "Le banc d'essai — les quinze expériences"
PROG = 'Les programmes de la machine — assembleur et C'
TODAY = '2026-08-25'

raw = open(SRC, encoding='utf-8').read()

def jstr(s):
    return json.loads('"' + s + '"')

def unesc(s):
    return jstr(s.replace('\\/', '/'))

# ------------------------------------------------------------ fiches
block = re.search(r'const ORDINATEUR = \[(.*?)\n    \];', raw, re.S).group(1)
entries = []
for m in re.finditer(r'\{ t:"(.*?)", d:"(.*?)", v:"(\w+)", img:ORD\+"(.*?)",\s*\n\s*s:"(.*?)",\s*\n\s*src:\[(.*?)\] \},', block, re.S):
    t, d, v, img, s, srcs = m.groups()
    links = [(unesc(a), unesc(b)) for a, b in re.findall(r'\{n:"(.*?)",u:"(.*?)"\}', srcs)]
    entries.append({'t': unesc(t), 'd': unesc(d), 'v': v, 'img': img, 's': unesc(s), 'src': links})

# ------------------------------------------------------------ références DOI
gm = re.search(r'\{ g:"Dossier XXVII · L\'Ordinateur de 1983 \((\d+) DOI vérifiés\)", items:\[(.*?)\n      \]\},', raw, re.S)
refs = []
for m in re.finditer(r'\{ a:"(.*?)", t:"(.*?)", j:"(.*?)", k:"(\w+)", doi:"(.*?)",\s*\n\s*ab:"(.*?)" \}', gm.group(2), re.S):
    a, t, j, k, doi, ab = m.groups()
    refs.append({'a': unesc(a), 't': unesc(t), 'j': unesc(j), 'k': k, 'doi': unesc(doi), 'ab': unesc(ab)})

VERD = {'ok': ('success', '✅', 'Confirmé'), 'warn': ('warning', '⚠️', 'À nuancer'),
        'deb': ('help', '🔶', 'Débattu'), 'fresh': ('tip', '🛠️', 'Corrigé après audit')}
KIND = {'primary': 'article primaire', 'review': 'synthèse', 'book': 'ouvrage'}

def resolve_u(u):
    if u.startswith('http'):
        return u
    if u.startswith('../samlepirate/ordinateur-1983/'):
        return SITE + u[len('../samlepirate/ordinateur-1983/'):]
    if u.startswith('../'):
        return 'https://empire-contre-intox.com/' + u[3:]
    return SRCSITE + u

counts = {}
for e in entries:
    counts[e['v']] = counts.get(e['v'], 0) + 1

o = [f'''---
projet: Empire contre Intox
dossier: XXVII
titre-dossier: "L'Ordinateur de 1983"
auteurs: [Samlepirate]
source: {SRCSITE}#ordinateur-1983
licence: CC BY-NC-ND 4.0
importé: {TODAY}
tags: [empire-contre-intox/dossier-xxvii, sources, verification, doi]
aliases: ["Sources Ordinateur 1983", "Vérification du dossier XXVII", "Audit Ordinateur 1983"]
ordre: 95
fiches: {len(entries)}
doi: {len(refs)}
---
''']
o.append(f'\n# {SOURCES}\n')
o.append("L'extrait du **Dossier XXVIII « Les Sources »** qui concerne l'Ordinateur de 1983 — "
         f"{len(entries)} fiches de vérification et {len(refs)} DOI vérifiés via Crossref.\n")
o.append('> [!info] La méthode, ici, n\'est pas la recherche web\n'
         "> Ce dossier n'est pas écrit d'après une transcription de live mais d'après un **objet technique** : "
         "le *Simulateur Logique Nodal*. La source primaire est donc le **code source lui-même**, pas la "
         "documentation du projet — et quand les deux divergent, **c'est le code qui tranche**. La vérification "
         "s'est faite par **exécution** : sept programmes assembleur et trois compilations C ont été passés dans "
         "le vrai assembleur, le vrai compilateur et le vrai processeur, puis leurs sorties comparées octet pour "
         "octet à ce qu'affiche la page.\n>\n"
         "> **42 affirmations auditées : 39 ✅, 3 ⚠️, 0 ❌** · **2 divergences documentation/code corrigées** "
         "· **3 DOI vérifiés**.\n")

o.append('## Ce que l\'audit a corrigé — l\'essentiel\n')
o.append('- **L\'additionneur complet ne compte pas 6 portes mais 5** (2 OU-X, 2 ET, 1 OU) — donc **40 portes** '
         'pour l\'additionneur 8 bits, et non 48. La documentation du simulateur comptait une porte de trop.')
o.append('- **Le disque externe fait 64 Ko, pas 8 Ko** — `DRIVE_SIZE = 65536` dans `isa.ts`, soit 256 pages '
         'de 256 octets. La mention « 8 Ko » était un vestige d\'une version antérieure.')
o.append('- **Ariane 501** : la perte du guidage survient 37 secondes après l\'**allumage du moteur principal**, '
         'soit 30 secondes après le décollage — la première rédaction confondait les deux, et citait un montant '
         'financier non sourcé.')
o.append('- **L\'ASCII imprimable date bien de 1963, mais pas ses minuscules** — elles n\'arrivent qu\'à la '
         'révision X3.4-1967.')
o.append('- **L\'universalité du NON-ET** revient à Sheffer (1913), mais **Peirce l\'avait établie dès 1880**, '
         'dans un manuscrit resté inédit jusqu\'en 1933.')
o.append('- **Le disque « Linux-like »** contient 7 fichiers et 20 programmes — une première version n\'en '
         'énumérait que quinze.\n')

o.append('## Les fiches de vérification\n')
o.append('| Verdict | Affirmation | Ce que dit la vérification |')
o.append('| --- | --- | --- |')
for e in entries:
    cal, emo, lab = VERD[e['v']]
    anchor = re.sub(r'[#\[\]|^]', '', e['t'])
    o.append(f'| {emo} {lab} | [[{SOURCES}#{anchor}\\|{e["t"]}]] | {e["d"]} |')
o.append('')
for e in entries:
    cal, emo, lab = VERD[e['v']]
    anchor = re.sub(r'[#\[\]|^]', '', e['t'])
    o.append(f'### {anchor}\n')
    body = [f'**{e["d"]}**', e['s']]
    srcl = ' · '.join(f'[{n}]({resolve_u(u)})' for n, u in e['src'])
    if srcl:
        body.append('**Sources** — ' + srcl)
    o.append(f'> [!{cal}] {emo} {lab}\n' + '\n'.join(
        '\n'.join(('> ' + ln).rstrip() for ln in b.split('\n')) + '\n>' for b in body).rstrip('\n>').rstrip() + '\n')

o.append('## Références scientifiques\n')
o.append(f'{len(refs)} DOI, tous vérifiés via Crossref (résolution + concordance titre / auteurs / revue / pages).\n')
for r in refs:
    o.append(f'> [!cite]- 📄 {r["a"]} — *{r["t"]}*\n'
             f'> {r["j"]} · {KIND.get(r["k"], r["k"])}\n'
             f'> [doi:{r["doi"]}](https://doi.org/{r["doi"]})\n>\n'
             + '\n'.join(('> ' + ln).rstrip() for ln in r['ab'].split('\n')) + '\n')

o.append('## L\'audit complet, en ligne\n')
o.append(f'- 📋 [`dossier-XXVII-ordinateur-1983.md`](https://github.com/TheSamLePirate/empire-contre-intox/blob/main/sources/dossier-XXVII-ordinateur-1983.md) — les 42 affirmations, une par une : citation → verdict → valeur de référence → source')
o.append(f'- 📚 [`refs-XXVII-ordinateur-1983.md`](https://github.com/TheSamLePirate/empire-contre-intox/blob/main/sources/refs-XXVII-ordinateur-1983.md) — les références primaires et leurs DOI')
o.append(f'- 🔬 [La page « Les Sources » du site]({SRCSITE}#ordinateur-1983) — les fiches avec leur image, et la recherche plein texte')
o.append(f'- 💾 [Le code source du simulateur](https://github.com/TheSamLePirate/Simulateur-Logique-Nodal) — la source primaire du dossier\n')

o.append('## Les réserves assumées dans la page\n')
o.append("Trois choses que le dossier dit lui-même, plutôt que de laisser croire le contraire :\n")
o.append("- la machine est un **objet pédagogique**, pas la reconstitution d'un ordinateur de 1983 ayant existé "
         "(jeu d'instructions original, multiplication et division câblées, pont HTTP) ;")
o.append("- son interface réseau est un **pont vers le `fetch()` du navigateur**, pas une pile TCP/IP en portes "
         "logiques — ce que le projet écrit lui-même ;")
o.append("- son shell est un système d'exploitation au sens minimal : ni multitâche, ni processus, ni protection "
         "mémoire.\n")

o.append(f'\n---\n[[{MOC}|⌂ Sommaire du dossier]] · [[{DASH}|⌂ Tableau de bord]] · [[{PROG}|💻 Les dix programmes exécutés]] · '
         f'[[{BANC}|🧪 Le banc d\'essai]]\n')

open(os.path.join(OUT, SOURCES + '.md'), 'w', encoding='utf-8').write('\n'.join(o))
print('✔', SOURCES, f'({len(entries)} fiches · {len(refs)} DOI)', counts)
json.dump({'fiches': len(entries), 'doi': len(refs), 'counts': counts},
          open('/tmp/xxvii-sources.json', 'w'), ensure_ascii=False)
