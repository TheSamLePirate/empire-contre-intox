#!/usr/bin/env python3
# Étape 8 : passerelles bidirectionnelles entre le Dossier XXVII et le reste du coffre.
import os, re, json

VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
ECI = os.path.join(VAULT, 'Empire contre Intox')
XXVII = os.path.join(ECI, 'Dossier XXVII — Ordinateur 1983')
D = json.load(open('/tmp/xxvii-data.json', encoding='utf-8'))
CH = {c['n']: c['file'] for c in D['chapters']}

ENTRO = 'Dossier XXV — Entropie'
FORMU = 'Dossier XIV — Formules'
TABLE = 'Dossier V — Tableau Périodique'
ACTE_V = '05 — Acte V — Information, mémoire et démon de Maxwell'
ACTE_XIV = '14 — Acte XIV — Informatique & algorithmes'
MVT_VII = '07 — Mouvement VII — La structure du Tableau périodique'
MOC27 = "Dossier XXVII — L'Ordinateur de 1983"

def insert_before_nav(path, block):
    """Insère un bloc juste avant le pied de navigation (--- final)."""
    t = open(path, encoding='utf-8').read()
    if block.split('\n')[0] in t:
        print('   = déjà présent :', os.path.basename(path)); return False
    i = t.rfind('\n---\n')
    if i < 0:
        t = t.rstrip('\n') + '\n\n' + block + '\n'
    else:
        t = t[:i] + '\n\n' + block + '\n' + t[i:]
    open(path, 'w', encoding='utf-8').write(t)
    print('   +', os.path.basename(path))
    return True

# ─────────────────────────────────────────── dans le Dossier XXVII
B = [
    (1, f'''> [!tip] 🔗 Passerelle — Dossier XXV « L'entropie, le temps et l'Univers »
> Ce chapitre définit le bit par ce qu'un fil peut porter ; l'Acte V de l'Entropie le définit par ce qu'il **coûte**. Chez Shannon, un bit est la quantité d'information qui lève une incertitude à deux issues : [[{ACTE_V}#Chapitre 17 — Shannon : mesurer l'incertitude|Shannon — mesurer l'incertitude]]. Chez Landauer, ce même bit est un **objet physique** : l'effacer dissipe au minimum $k_B T \\ln 2$ de chaleur — [[{ACTE_V}#Chapitre 19 — Landauer : un bit est un objet physique|Landauer — un bit est un objet physique]]. Les 8 192 octets du chapitre dixième ont donc, en principe, une facture thermodynamique.

> [!tip] 🔗 Passerelle — Dossier V « Le Tableau Périodique »
> Le transistor de ce chapitre est en **silicium** — l'élément 14, configuration `[Ne] 3s² 3p²`. C'est cette couche p à demi remplie qui en fait un semi-conducteur, ni isolant ni métal, et donc un interrupteur commandable : [[{MVT_VII}|Mouvement VII — La structure du Tableau périodique]].'''),
    (4, f'''> [!tip] 🔗 Passerelle — Dossier XIV « Les Formules de l'Empire »
> Le prix de la retenue qui traverse — $t_{{\\text{{total}}}} \\approx n \\times t_{{\\text{{étage}}}}$, et le $\\log n$ de l'anticipation de retenue — se dit dans la langue de la complexité algorithmique : [[{ACTE_XIV}#Complexité — la notation grand O|Acte XIV — la notation grand O]]. C'est le même écart que celui qui sépare une recherche linéaire d'une recherche dichotomique.'''),
    (9, f'''> [!tip] 🔗 Passerelle — Dossier XXV « L'entropie, le temps et l'Univers »
> Le von Neumann de ce chapitre — celui du rapport sur l'EDVAC, qui range code et données dans la même mémoire — est aussi celui qui a donné son nom à l'entropie des états quantiques : [[{ACTE_V}#Chapitre 20 — Entropie de von Neumann|Acte V — Entropie de von Neumann]]. Deux legs du même homme, à dix ans d'écart.'''),
    (15, f'''> [!tip] 🔗 Passerelle — Dossier XXV « L'entropie, le temps et l'Univers »
> « Rien ne plante, rien n'avertit — le programme continue avec un nombre faux » : la retenue perdue est de l'information **effacée**, et l'effacement a un coût physique irréductible. C'est le théorème de Landauer : [[{ACTE_V}#Chapitre 19 — Landauer : un bit est un objet physique|Landauer — un bit est un objet physique]]. Le débordement d'entier est le versant informatique de l'irréversibilité.'''),
]
print('Dossier XXVII :')
for n, block in B:
    insert_before_nav(os.path.join(XXVII, CH[n] + '.md'), block)

# ─────────────────────────────────────────── retours vers le XXVII
print('Retours depuis les autres dossiers :')
insert_before_nav(os.path.join(ECI, ENTRO, ACTE_V + '.md'), f'''> [!tip] 🔗 Passerelle — Dossier XXVII « L'Ordinateur de 1983 »
> Le bit de Shannon et celui de Landauer ont une incarnation : un fil sur lequel il y a du courant, ou pas. Le Dossier XXVII construit toute la machine à partir de là — [[{CH[1]}|Chapitre premier — Le bit]] — et son [[{CH[15]}|chapitre quinzième]] montre l'effacement à l'œuvre : à 255 + 1, le neuvième bit part dans un drapeau et l'information est perdue en silence. Le von Neumann de l'EDVAC y a aussi son chapitre : [[{CH[9]}|Assembler la machine]].''')

insert_before_nav(os.path.join(ECI, FORMU, ACTE_XIV + '.md'), f'''> [!tip] 🔗 Passerelle — Dossier XXVII « L'Ordinateur de 1983 »
> Le grand O de cet acte a un cas d'école matériel : l'additionneur à propagation de retenue coûte $O(n)$, l'anticipation de retenue $O(\\log n)$ — [[{CH[4]}|Chapitre quatrième — La première machine qui calcule]]. Et pour voir un algorithme devenir des octets, la chaîne complète C → assembleur → machine est dans [[Les programmes de la machine — assembleur et C]].''')

insert_before_nav(os.path.join(ECI, TABLE, MVT_VII + '.md'), f'''> [!tip] 🔗 Passerelle — Dossier XXVII « L'Ordinateur de 1983 »
> Le silicium (14, `[Ne] 3s² 3p²`) n'est pas seulement une case du tableau : sa couche p à demi remplie en fait le semi-conducteur dont on tire l'interrupteur commandable. Voir ce qu'on en fabrique — [[{CH[1]}|Chapitre premier — Le bit, ou l'art de ne rien savoir dire]] et sa porte NON-ET en quatre transistors.''')

# ─────────────────────────────────────────── « Dossiers liés » des MOC voisins
def add_linked(moc_path, line):
    t = open(moc_path, encoding='utf-8').read()
    if 'Dossier XXVII' in t:
        print('   = déjà lié :', os.path.basename(moc_path)); return
    m = re.search(r'\n## Dossiers liés\n', t)
    if not m:
        print('   ! pas de section « Dossiers liés » :', os.path.basename(moc_path)); return
    body_start = m.end()
    t = t[:body_start] + '\n' + line + '\n' + t[body_start:]
    open(moc_path, 'w', encoding='utf-8').write(t)
    print('   +', os.path.basename(moc_path))

print('Sections « Dossiers liés » :')
add_linked(os.path.join(ECI, ENTRO, "Dossier XXV — L'entropie, le temps et l'Univers.md"),
           f"- [[{MOC27}]] — l'**incarnation** du bit de Shannon et de Landauer : un fil, un transistor, "
           "puis toute une machine 8 bits ;")
add_linked(os.path.join(ECI, FORMU, "Dossier XIV — Les Formules de l'Empire.md"),
           f"- [[{MOC27}]] — l'**Acte XIV « Informatique & algorithmes »** y trouve son cas d'école matériel : "
           "la retenue qui traverse en $O(n)$, l'anticipation en $O(\\log n)$ ;")
add_linked(os.path.join(ECI, TABLE, 'Dossier V — Le Tableau Périodique des éléments.md'),
           f"- [[{MOC27}]] — ce qu'on fabrique avec l'**élément 14** : un interrupteur commandable, "
           "puis un ordinateur complet ;")
