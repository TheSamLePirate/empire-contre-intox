#!/usr/bin/env python3
# Les quatre notes d'appareil du Dossier XXVII : formulaire, jeu d'instructions,
# banc d'essai (15 expériences), programmes (assembleur + C).
import os, re, json
from bs4 import BeautifulSoup

exec(open(os.path.join(os.path.dirname(__file__), '1-dossier.py'), encoding='utf-8')
     .read().split('# ---------------------------------------------------------------- extraction')[0]
     .replace("os.makedirs(ASSETS, exist_ok=True)", "pass"))

D = json.load(open('/tmp/xxvii-data.json', encoding='utf-8'))
CH = {c['n']: c for c in D['chapters']}
ORD = ['premier', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième',
       'huitième', 'neuvième', 'dixième', 'onzième', 'douzième', 'treizième', 'quatorzième', 'quinzième']

def front(tags, aliases, extra=''):
    return f'''---
projet: Empire contre Intox
dossier: XXVII
titre-dossier: "L'Ordinateur de 1983"
auteurs: [Samlepirate]
source: {SITE}
licence: CC BY-NC-ND 4.0
importé: {TODAY}
tags: [empire-contre-intox/dossier-xxvii, {tags}]
aliases: {json.dumps(aliases, ensure_ascii=False)}
{extra}---
'''

def nav(extra=''):
    return ('\n---\n' + f'[[{MOC}|⌂ Sommaire du dossier]] · [[{DASH}|⌂ Tableau de bord]]'
            + (' · ' + extra if extra else '') + '\n')

def chlink(n, label=None):
    c = CH[n]
    return f'[[{c["file"]}|{label or ("Chapitre " + ORD[n-1] + " — " + c["title"])}]]'

# ═══════════════════════════════════════════════════ 1 · FORMULAIRE
f = [front('formules, mathematiques, logique', ['Formulaire', 'Formulaire Ordinateur 1983',
                                                'Les formules de la machine'], 'ordre: 90\nformules: 13\n')]
f.append(f'\n# {FORM}\n')
f.append("Les **treize formules** du dossier, dans l'ordre où elles apparaissent. Chacune renvoie au chapitre "
         "qui l'introduit, et son commentaire y est replié.\n")
f.append('| # | Formule | Chapitre |')
f.append('| --- | --- | --- |')
for n, chap, title, texs, note in D['formulas']:
    f.append(f'| {n} | [[{FORM}#{n} · {title}\\|{title}]] | {chlink(chap, "Ch. " + str(chap))} |')
f.append('')
for n, chap, title, texs, note in D['formulas']:
    f.append(f'## {n} · {title}\n')
    for t in texs:
        f.append(f'$${t}$$\n')
    if note:
        f.append(callout('note', 'Ce que dit la formule', [note], fold='-') + '\n')
    c = CH[chap]
    f.append(f'→ {chlink(chap)} · [[{c["file"]}#^formule-{n}|voir en contexte]]\n')
f.append(callout('warning', '⚠️ Une réserve sur cet export', [
    "Les blocs de formule de la page d'origine ne portent pas encore leur ligne « **Se lit** » "
    "(la lecture orale en français exigée par la charte du site). Elle manque donc aussi ici : "
    "ce formulaire ne l'a pas inventée. Les treize formules restent reproduites telles quelles, "
    "avec leur note d'origine."]))
f.append(nav(f'[[{ISAN}|📖 Jeu d\'instructions]]'))
open(os.path.join(OUT, FORM + '.md'), 'w', encoding='utf-8').write('\n'.join(f))
print('✔', FORM)

# ═══════════════════════════════════════════════════ 2 · JEU D'INSTRUCTIONS
soup = BeautifulSoup(open(SRC, encoding='utf-8').read(), 'html.parser')
isa_sec = soup.find('section', id='isa')
tables = isa_sec.select('.table-scroll')
isa_table = conv_table(tables[0])
steles = isa_sec.select('.stele')
enc = conv_stele(steles[0])

arch = soup.find('section', id='architecture')
regs = conv_table(arch.select('.table-scroll')[0])

alu = soup.find('section', id='alu')
alu_tables = alu.select('.table-scroll')
alu_ops = conv_table(alu_tables[0]) if alu_tables else ''

cmp_sec = soup.find('section', id='comparer')
cmp_tables = cmp_sec.select('.table-scroll')
flags = conv_table(cmp_tables[0]) if cmp_tables else ''

rows = re.findall(r'^\| `(0x[^`]+)` \| `([^`]+)` \| (\d) \|', isa_table, re.M)
n_lignes = len(rows)

i = [front("jeu-d-instructions, assembleur, processeur",
           ["Jeu d'instructions", 'ISA', 'Les 62 instructions', 'Opcodes'],
           'ordre: 91\ninstructions: 62\n')]
i.append(f'\n# {ISAN}\n')
i.append("Le **contrat entre le matériel et tout ce qui tournera dessus** : la liste des octets qui veulent dire "
         f"quelque chose, avec leur signification exacte. Relevé dans `src/cpu/isa.ts` — {n_lignes} lignes de "
         "tableau pour 62 instructions, certaines lignes en regroupant plusieurs. Extrait du "
         f"{chlink(11)}.\n")
i.append('## L\'encodage — un ou trois octets\n')
i.append(enc + '\n')
i.append("Si le bit 7 de l'opcode vaut 1, il y a un opérande de 16 bits, rangé en **petit-boutiste** "
         "(poids faible d'abord). Le décodeur n'a qu'un seul bit à regarder pour connaître la longueur "
         "de l'instruction.\n")
i.append('## Les registres\n')
i.append(regs + '\n')
if flags:
    i.append('## Les drapeaux, et ce qu\'ils décident\n')
    i.append(flags + '\n')
if alu_ops:
    i.append('## Les opérations de l\'ALU\n')
    i.append(alu_ops + '\n')
i.append('## Le vocabulaire complet\n')
i.append(isa_table + '\n')
i.append(callout('warning', "⚠️ Le piège n° 1 de l'assembleur", [
    "Certaines instructions modifient les drapeaux et d'autres non. `STA` ne les touche pas ; "
    "`POP`, `LDM`, `INC`, `DEC` les modifient tous. Glisser un `POP` entre un `CMP` et un `JZ` détruit "
    "silencieusement la comparaison — le programme ne plante pas, il se trompe. "
    f"Voir {chlink(6, 'le chapitre sixième')} et {chlink(11, 'le chapitre onzième')}."]) + '\n')
i.append(nav(f'[[{PROG}|💻 Les programmes]] · [[{FORM}|🧮 Formulaire]]'))
open(os.path.join(OUT, ISAN + '.md'), 'w', encoding='utf-8').write('\n'.join(i))
print('✔', ISAN, f'({n_lignes} lignes de jeu d\'instructions)')

# ═══════════════════════════════════════════════════ 3 · LE BANC D'ESSAI
b = [front('experiences, interactif, banc-d-essai',
           ["Le banc d'essai", 'Les quinze expériences', 'Expériences', 'Labos'],
           'ordre: 92\nexperiences: 15\n')]
b.append(f'\n# {BANC}\n')
b.append("Quinze instruments jalonnent le dossier — interrupteurs, afficheurs, chronogrammes, tubes. "
         "**Rien de tout cela ne survit au Markdown** : chaque expérience est conservée ici avec sa consigne "
         "et sa conclusion, et le lien ouvre l'instrument à sa place exacte dans la page.\n")
b.append('| # | Expérience | Nature | Chapitre | Jouer |')
b.append('| --- | --- | --- | --- | --- |')
for n, chap, no, title, kind, hint, foot, anchor in D['labs']:
    b.append(f'| {no.replace("EXP ", "")} | [[{BANC}#{no} — {title}\\|{title}]] | {kind} | '
             f'{chlink(chap, "Ch. " + str(chap))} | [↗]({SITE}#{anchor}) |')
b.append('')
for n, chap, no, title, kind, hint, foot, anchor in D['labs']:
    b.append(f'## {no} — {title}\n')
    b.append(f'*{kind}* · {chlink(chap)}\n')
    if hint:
        b.append(callout('example', '🧪 La consigne', [hint]) + '\n')
    if foot:
        b.append(callout('success', '✅ Ce que l\'expérience établit', [foot]) + '\n')
    c = CH[chap]
    b.append(f'▶ [Ouvrir l\'instrument]({SITE}#{anchor}) · [[{c["file"]}#^exp-{n}|dans le chapitre]]\n')
b.append(callout('info', '🖥️ Et la machine complète', [
    f"La quatorzième expérience fait tourner un **vrai processeur 8 bits** dans la page — assembleur deux passes, "
    f"8 192 octets de mémoire, pile, registres, drapeaux, console. Ses sept programmes sont conservés dans "
    f"[[{PROG}]]. Pour les périphériques (graphique, clavier, disque, réseau), c'est le "
    f"[simulateur complet]({SITE}simulateur/) qu'il faut ouvrir."]))
b.append(nav(f'[[{PROG}|💻 Les programmes]]'))
open(os.path.join(OUT, BANC + '.md'), 'w', encoding='utf-8').write('\n'.join(b))
print('✔', BANC, f'({len(D["labs"])} expériences)')

# ═══════════════════════════════════════════════════ 4 · LES PROGRAMMES
raw = open(SRC, encoding='utf-8').read()
progs_js = re.search(r'const PROGS = \{(.*?)\n      \};', raw, re.S).group(1)
LABELS = [('bonjour', 'Bonjour', '22 octets · 8 instructions'),
          ('compteur', "Compter jusqu'à 9", '18 octets · 62 instructions'),
          ('fibonacci', 'Fibonacci', '48 octets · 168 instructions'),
          ('table', 'Table de 7', '31 octets · 103 instructions'),
          ('factorielle', 'Factorielle', '37 octets · 47 instructions'),
          ('sousprog', 'Sous-programme', '24 octets · 16 instructions'),
          ('debordement', 'Débordement', '16 octets · 28 instructions')]
PROGS = {}
for key, label, size in LABELS:
    m = re.search(re.escape(key) + r':\s*\n\s*"(.*?)",\s*(?:\n|$)', progs_js, re.S)
    if m:
        PROGS[key] = json.loads('"' + m.group(1) + '"')

p = [front('assembleur, langage-c, compilateur, programmes',
           ['Les programmes', 'Programmes assembleur', 'Assembleur et C'],
           'ordre: 93\nprogrammes: 10\n')]
p.append(f'\n# {PROG}\n')
p.append("Les **sept programmes assembleur** que le processeur de la page exécute réellement, et les "
         "**trois traductions C → assembleur** produites par le compilateur du simulateur. Tailles et "
         "nombres d'instructions relevés à l'exécution, pas estimés — c'est l'un des points vérifiés de "
         f"[[{SOURCES}|l'audit du dossier]].\n")
p.append("## Les sept programmes assembleur\n")
p.append(f"Chargeables un par un dans la machine du {chlink(12)}.\n")
p.append('| Programme | Taille | Ce qu\'il montre |')
p.append('| --- | --- | --- |')
SHOWS = {'bonjour': "le plus petit programme qui parle — sept `OUT` et un `HLT`",
         'compteur': "une boucle avec test de sortie, et le décalage ASCII des chiffres",
         'fibonacci': "le débordement traité comme une condition d'arrêt (`JC fin`)",
         'table': "la multiplication câblée du processeur (`MULB`)",
         'factorielle': "pourquoi `STA` ne touche pas aux drapeaux — et pourquoi ça sauve la boucle",
         'sousprog': "`CALL` / `RET`, la pile et l'adresse de retour",
         'debordement': "255 + 1 = 0, et la retenue comme seule trace"}
for key, label, size in LABELS:
    p.append(f'| [[{PROG}#{label}\\|{label}]] | {size} | {SHOWS[key]} |')
p.append('')
for key, label, size in LABELS:
    if key not in PROGS: continue
    p.append(f'### {label}\n')
    p.append(f'*{size}*\n')
    p.append('```asm\n' + PROGS[key] + '\n```\n')
p.append("## Les trois traductions C → assembleur\n")
p.append("Sortie **littérale** du compilateur du simulateur — rien n'a été écrit à la main. "
         f"Détail de la chaîne dans le {chlink(13)}.\n")
for key in ('somme', 'boucle', 'fact'):
    e = D['ex'].get(key)
    if not e: continue
    p.append(f'### {e["label"]} — {e["size"]}\n')
    p.append('**Source C**\n')
    p.append('```c\n' + e['c'] + '\n```\n')
    p.append('**Assembleur produit**\n')
    p.append('```asm\n' + e['asm'] + '\n```\n')
p.append(callout('important', "📌 Ce que ces dix programmes prouvent", [
    "Ils n'illustrent pas le dossier : ils le **vérifient**. Les sept programmes assembleur ont été passés "
    "dans le vrai assembleur et le vrai processeur du simulateur, les trois exemples C dans son vrai "
    "compilateur, et les sorties comparées octet pour octet à ce que la page affiche. "
    f"C'est la méthode du dossier — voir [[{SOURCES}]]."]))
p.append(nav(f'[[{ISAN}|📖 Jeu d\'instructions]] · [[{BANC}|🧪 Le banc d\'essai]]'))
open(os.path.join(OUT, PROG + '.md'), 'w', encoding='utf-8').write('\n'.join(p))
print('✔', PROG, f'({len(PROGS)} programmes asm · {len(D["ex"])} traductions C)')
