#!/usr/bin/env python3
"""Dossier VII → Obsidian : les passerelles vers le reste du coffre.

Le Dossier VII est un dossier de **méthode** : il définit deux opérateurs que
trois autres dossiers déjà exportés utilisent sans les définir. Les passerelles
sont donc denses, et toutes bidirectionnelles.
"""
import os, re

VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
ECI = os.path.join(VAULT, 'Empire contre Intox')
VII = os.path.join(ECI, 'Dossier VII — Champs de vecteurs')

FORMU, TORN, ENTRO = ('Dossier XIV — Formules', 'Dossier XII — Tornades',
                      'Dossier XXV — Entropie')
ACTE_III = '03 — Acte III — Champs & lumière'
ACTE_IV = '04 — Acte IV — Atmosphère & vortex'
ACTE_V = '05 — Acte V — Information, mémoire et démon de Maxwell'
FORM_XII = 'Formulaire — les trois formules du dossier'
LEX_XII = 'Lexique — les mots de la tempête'
MOC7 = 'Dossier VII — Le langage des champs'

CH = {3: "03 — Chapitre III — Et si c'était un fluide",
      4: '04 — Chapitre IV — La divergence',
      5: '05 — Chapitre V — Le rotationnel',
      6: '06 — Atelier I — Lâchez une brindille dans le fluide',
      7: '07 — Chapitre VI — Le langage de Maxwell',
      8: "08 — Chapitre VII — L'espace des phases",
      9: '09 — Chapitre VIII — Produit scalaire & vectoriel'}


def insert_before_nav(path, block):
    """Insère un bloc juste avant le pied de navigation (dernier `---`)."""
    t = open(path, encoding='utf-8').read()
    if block.split('\n')[0] in t:
        print('   = déjà présent :', os.path.basename(path))
        return False
    i = t.rfind('\n---\n')
    t = (t[:i] + '\n\n' + block + '\n' + t[i:]) if i >= 0 \
        else t.rstrip('\n') + '\n\n' + block + '\n'
    open(path, 'w', encoding='utf-8').write(t)
    print('   +', os.path.basename(path))
    return True


# ══════════════════════════════════ dans le Dossier VII
B = [
    (3, f'''> [!tip] 🔗 Passerelle — Dossier XIV « Les Formules de l'Empire »
> Le gradient de ce chapitre a son **atelier à curseurs** dans l'atlas du collectif : [[{ACTE_III}#Le gradient|Acte III — Le gradient]]. On y déforme la colline et l'on regarde les flèches se réorienter — la même idée, mais qu'on tire à la main.'''),
    (4, f'''> [!tip] 🔗 Passerelle — Dossier XIV « Les Formules de l'Empire »
> Les deux écritures de la divergence, et celle du rotationnel du chapitre suivant, sont mises en atelier dans [[{ACTE_III}#Divergence & rotationnel|Acte III — Divergence & rotationnel]] : on y choisit un champ, on déplace le point, et les deux nombres se recalculent sous les doigts.'''),
    (5, f'''> [!tip] 🔗 Passerelle — Dossier XII « Tornades, Typhons & Ouragans »
> Ce chapitre définit le rotationnel sur un fluide imaginé ; le Dossier XII l'applique à un vrai. La **vorticité** y est définie mot pour mot comme ici — « à quel point ça tourne en chaque point de l'espace » — et l'**hélicité**, le paramètre qui sépare l'orage ordinaire de l'orage tornadique, s'écrit $H=\\int \\mathbf v\\cdot(\\nabla\\times\\mathbf v)\\,dz$ : c'est le produit scalaire du chapitre VIII appliqué au rotationnel de ce chapitre-ci, empilé sur la verticale. Voir [[{FORM_XII}#2 — L'hélicité, la rotation déjà là|L'hélicité, la rotation déjà là]] et [[{LEX_XII}#Le vortex — anatomie et dynamique|Le vortex — anatomie et dynamique]].
>
> Et le **cisaillement** — flux lent en bas, rapide en haut — n'y est plus un exemple d'école : c'est l'écart de vent entre le sol et 6 km d'altitude qui met la supercellule en rotation.'''),
    (7, f'''> [!tip] 🔗 Passerelle — Dossier XXV « L'entropie, le temps et l'Univers »
> Le Maxwell des quatre équations est le même homme que celui du **démon** : [[{ACTE_V}#Chapitre 18 — Le démon de Maxwell|Acte V — Le démon de Maxwell]], la créature imaginaire qui trie les molécules rapides et semble violer le second principe. Sa fiche est dans la galerie du Dossier XXV : [[James Clerk Maxwell]]. Deux legs du même homme, à quinze ans d'écart — et la même méthode : inventer une fiction pour rendre une équation lisible.

> [!tip] 🔗 Passerelle — Dossier XIV « Les Formules de l'Empire »
> Les quatre équations, une par une et avec leurs curseurs : [[{ACTE_III}#Les équations de Maxwell|Acte III — Les équations de Maxwell]].'''),
    (8, f'''> [!tip] 🔗 Passerelle — Dossier XIV « Les Formules de l'Empire »
> Le système proie-prédateur de ce chapitre a son atelier : [[{ACTE_III}#Lotka-Volterra|Acte III — Lotka-Volterra]]. On y règle $\\alpha$, $\\beta$, $\\gamma$, $\\delta$ et l'on voit l'équilibre $(\\gamma/\\delta\\,;\\,\\alpha/\\beta)$ se déplacer avec eux.'''),
    (9, f'''> [!tip] 🔗 Passerelle — Dossier XIV « Les Formules de l'Empire »
> Les deux produits — scalaire et vectoriel — et leur lien avec ∇· et ∇× : [[{ACTE_III}#Produit scalaire & vectoriel|Acte III — Produit scalaire & vectoriel]]. C'est là que la notation du chapitre VIII devient manipulable.'''),
]
print('Dossier VII :')
for n, block in B:
    insert_before_nav(os.path.join(VII, CH[n] + '.md'), block)

# renvoi du lexique
insert_before_nav(os.path.join(VII, 'Lexique — les mots du champ.md'),
                  f'''> [!tip] 🔗 Renvois — les mêmes mots, ailleurs dans le coffre
> Trois entrées de ce lexique vivent une seconde fois dans un dossier de terrain. **Rotationnel**, **cisaillement** et **flux** y deviennent la vorticité, le cisaillement de vent et l'hélicité d'un orage réel : [[{LEX_XII}]] *(Dossier XII)*. Et **gradient**, **divergence**, **rotationnel**, **produits scalaire et vectoriel** et **Lotka-Volterra** ont chacun leur atelier à curseurs dans [[{ACTE_III}|Acte III — Champs & lumière]] *(Dossier XIV)*.''')

# ══════════════════════════════════ retours vers le Dossier VII
print('Retours depuis les autres dossiers :')
insert_before_nav(os.path.join(ECI, FORMU, ACTE_III + '.md'),
                  f'''> [!tip] 🔗 Passerelle — Dossier VII « Le langage des champs »
> Cet acte est la **mise en atelier** d'un dossier entier : ses cinq formules — gradient, divergence & rotationnel, produits scalaire et vectoriel, Maxwell, Lotka-Volterra — viennent toutes de [[{MOC7}]], et l'audit du Dossier XIV le dit en toutes lettres (« Reprend le dossier Le langage des champs »). Pour comprendre *pourquoi* ∇· pose la question « ça sort ou ça entre ? » et ∇× la question « ça tourne ? », c'est là-bas que ça se joue : [[{CH[4]}|La divergence]], [[{CH[5]}|Le rotationnel]], [[{CH[9]}|Produit scalaire & vectoriel]].
>
> Le dossier VII a aussi son propre atelier, avec **six champs analytiques** dont les deux nombres ont été recalculés un à un : [[{CH[6]}|Atelier I — Lâchez une brindille dans le fluide]].''')

insert_before_nav(os.path.join(ECI, FORMU, ACTE_IV + '.md'),
                  f'''> [!tip] 🔗 Passerelle — Dossier VII « Le langage des champs »
> L'hélicité de cet acte, $H=\\int \\mathbf v\\cdot(\\nabla\\times\\mathbf v)\\,dz$, empile deux opérations définies ailleurs : le **rotationnel** ∇× et le **produit scalaire**. Les deux sont construits de zéro, avec une brindille qu'on lâche dans le fluide, dans [[{CH[5]}|Chapitre V — Le rotationnel]] et [[{CH[9]}|Chapitre VIII — Produit scalaire & vectoriel]].''')

insert_before_nav(os.path.join(ECI, TORN, FORM_XII + '.md'),
                  f'''> [!tip] 🔗 Passerelle — Dossier VII « Le langage des champs »
> Le $\\nabla\\times$ de l'hélicité — « le rotationnel », qui mesure à quel point le vent tourne sur lui-même en un point — a un dossier entier pour lui seul : [[{CH[5]}|Chapitre V — Le rotationnel]]. On y arrive par une brindille qu'on lâche dans le fluide, et l'on y trouve le **cisaillement** comme cas d'école : lent en bas, rapide en haut, rotationnel non nul — exactement le cisaillement de vent qui met une supercellule en rotation. Le produit scalaire $\\cdot$ de la formule y est construit aussi : [[{CH[9]}|Chapitre VIII — Produit scalaire & vectoriel]].''')

insert_before_nav(os.path.join(ECI, TORN, LEX_XII + '.md'),
                  f'''> [!tip] 🔗 Renvoi — d'où viennent « vorticité » et « rotationnel »
> La **vorticité** de ce lexique est le rotationnel du champ de vitesse, et le **cisaillement** est l'exemple qui sert à l'introduire. Les deux sont définis à partir de rien dans [[{MOC7}]] — [[{CH[5]}|Chapitre V — Le rotationnel]] — avec un atelier où l'on choisit son champ et où la brindille tourne sous les yeux.''')

insert_before_nav(os.path.join(ECI, ENTRO, ACTE_V + '.md'),
                  f'''> [!tip] 🔗 Passerelle — Dossier VII « Le langage des champs »
> Le Maxwell de cet acte — celui du démon — est aussi celui des **quatre équations** de l'électromagnétisme, écrites dans le langage de la divergence et du rotationnel : [[{CH[7]}|Chapitre VI — Le langage de Maxwell]]. Même homme, même méthode : une fiction (le démon là-bas, le fluide électrique ici) posée pour rendre une équation lisible — et, dans les deux cas, un encadré pour rappeler que la fiction n'est pas le fait.''')

# ══════════════════════════════════ « Dossiers liés »
def add_linked(moc_path, line):
    t = open(moc_path, encoding='utf-8').read()
    if 'Dossier VII' in t:
        print('   = déjà lié :', os.path.basename(moc_path))
        return
    m = re.search(r'\n## Dossiers liés\n', t)
    if not m:
        print('   ! pas de section « Dossiers liés » :', os.path.basename(moc_path))
        return
    t = t[:m.end()] + '\n' + line + '\n' + t[m.end():]
    open(moc_path, 'w', encoding='utf-8').write(t)
    print('   +', os.path.basename(moc_path))


print('Sections « Dossiers liés » :')
add_linked(os.path.join(ECI, FORMU, "Dossier XIV — Les Formules de l'Empire.md"),
           f"- [[{MOC7}]] — l'**Acte III « Champs & lumière »** en est la mise en "
           "atelier : gradient, divergence, rotationnel, Maxwell et Lotka-Volterra y "
           "sont d'abord construits, un chapitre chacun ;")
add_linked(os.path.join(ECI, TORN, 'Dossier XII — Tornades, typhons, ouragans.md'),
           f"- [[{MOC7}]] — d'où viennent la **vorticité** et le **rotationnel** de "
           "l'hélicité : le même opérateur, sur un fluide imaginé, avec une brindille "
           "qu'on lâche dedans ;")
add_linked(os.path.join(ECI, ENTRO, "Dossier XXV — L'entropie, le temps et l'Univers.md"),
           f"- [[{MOC7}]] — l'**autre Maxwell** : celui des quatre équations, écrites "
           "dans le langage de la divergence et du rotationnel ;")

# le VII pointe en retour
p = os.path.join(VII, MOC7 + '.md')
t = open(p, encoding='utf-8').read()
if 'Dossier XII — Tornades' not in t:
    t = t.replace(
        "- [[Empire contre Intox — tableau de bord]] · ",
        "- [[Dossier XII — Tornades, typhons, ouragans]] — le rotationnel appliqué à "
        "un vrai fluide : vorticité, cisaillement de vent et hélicité d'un orage "
        "tornadique ;\n"
        "- [[Dossier XXV — L'entropie, le temps et l'Univers]] — l'autre Maxwell, "
        "celui du **démon** qui trie les molécules — et la fiche "
        "[[James Clerk Maxwell]] de sa galerie de savants ;\n"
        "- [[Empire contre Intox — tableau de bord]] · ")
    open(p, 'w', encoding='utf-8').write(t)
    print('   + Dossiers liés du MOC VII')
