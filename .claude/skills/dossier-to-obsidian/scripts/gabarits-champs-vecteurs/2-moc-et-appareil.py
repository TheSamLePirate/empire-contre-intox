#!/usr/bin/env python3
"""Dossier VII → Obsidian : le MOC et l'appareil du dossier.

Produit :
  - le sommaire (MOC) avec liens profonds, mermaid du fil conducteur et crédits ;
  - `Formulaire — les formules du langage des champs` (les 8 blocs, 16 formules) ;
  - `Lexique — les mots du champ` (les termes que le dossier définit lui-même) ;
  - `Les cinq figures — ce que les schémas montrent` (SVG perdus → Mermaid) ;
  - `Les voix du dossier — qui a écrit ces équations` (attributions).
"""
import os, re, json
from bs4 import BeautifulSoup

REPO = '/Users/olivierveinand/Documents/DEV/empire-contre-intox'
SRC = os.path.join(REPO, 'samlepirate/champs-vecteurs.html')
OUT = ('/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/'
       'Dossier VII — Champs de vecteurs')
URL = 'https://empire-contre-intox.com/samlepirate/champs-vecteurs.html'
MOC = 'Dossier VII — Le langage des champs'
TODAY = '2026-08-25'
TAGS = ('empire-contre-intox/dossier-vii, mathematiques, analyse-vectorielle, '
        'champs-de-vecteurs, physique')

soup = BeautifulSoup(open(SRC, encoding='utf-8'), 'html.parser')
PLAN = json.load(open('/tmp/vii-plan.json', encoding='utf-8'))
N = {s['id']: s['file'] for s in PLAN['sections']}
H = {s['id']: s['h1'] for s in PLAN['sections']}


def say_of(fb):
    """La ligne « Se lit » d'un bloc : la phrase, et la glose des symboles."""
    say = fb.find(class_='fb-say')
    if not say:
        return {'say': '', 'gloss': ''}
    st = say.find(class_='say-t')
    sx = st.find(class_='say-x') if st else None
    gloss = inline_md(sx) if sx else ''
    if sx:
        sx.extract()
    return {'say': inline_md(st), 'gloss': gloss}


def inline_md(node):
    """Texte d'un noeud, avec <b>/<i> en Markdown et les .imath en $…$."""
    from bs4 import NavigableString, Tag
    if isinstance(node, NavigableString):
        return re.sub(' +', ' ', str(node).replace('\xa0', ' '))
    if not isinstance(node, Tag):
        return ''
    cls = node.get('class') or []
    if 'imath' in cls:
        t = node.get('data-tex', '').strip()
        return f'${t}$' if t else ''
    inner = ''.join(inline_md(c) for c in node.children)
    if node.name in ('b', 'strong'):
        return f'**{inner.strip()}**' if inner.strip() else ''
    if node.name in ('i', 'em'):
        return f'*{inner.strip()}*' if inner.strip() else ''
    return inner


def front(alias, ordre, extra=''):
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
            + extra + f'ordre: {ordre}\n---\n\n')


def write(name, body):
    open(os.path.join(OUT, name + '.md'), 'w', encoding='utf-8').write(body)
    print('  +', name)


LIC = ('\n\n---\n\n> [!quote] Licence\n'
       '> Contenu **Empire contre Intox** sous licence [CC BY-NC-ND 4.0]'
       '(https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr) — partage avec '
       'attribution, sans usage commercial ni modification. Réalisé par '
       '**Samlepirate**, d\'après l\'épisode *« Divergence & rotationnel »* de '
       '**3Blue1Brown** (Grant Sanderson).\n')

# ═══════════════════════════════════════════════════ FORMULAIRE
blocks = []
for fb in soup.find('main').find_all(class_='formula-block'):
    sec = fb.find_parent('section')
    head = fb.find(class_='fb-head')
    tag = fb.find(class_='fb-tag')
    title = head.get_text().replace(tag.get_text(), '').strip()
    blocks.append(dict(
        title=re.sub(r'\s+', ' ', title).replace('\xa0', ' '),
        tag=re.sub(r'\s+', ' ', tag.get_text()).replace('\xa0', ' ').strip(),
        tex=[f.get('data-tex').strip() for f in fb.find_all(class_='formula')
             if f.get('data-tex')],
        **say_of(fb),
        sec=sec.get('id')))
assert len(blocks) == 8, len(blocks)

rows = ['| # | Formule | Chapitre |', '| --- | --- | --- |']
body = []
FNAME = 'Formulaire — les formules du langage des champs'
for i, b in enumerate(blocks, 1):
    h = f"{i} · {b['title']} · {b['tag']}"
    note, htitle = N[b['sec']], H[b['sec']]
    short = htitle.split(' — ', 1)[0] if htitle.startswith('Chapitre') else htitle
    rows.append(f"| {i} | [[{FNAME}#{h}\\|{b['title']}]] | [[{note}\\|{short}]] |")
    tex = '\n\n'.join(f'$${t}$$' for t in b['tex'])
    say = ''
    if b['say']:
        say = f"\n\n> [!quote] 🗣️ Se lit\n> {b['say']}"
        if b['gloss']:
            say += f"\n>\n> *{b['gloss']}*"
    body.append(f'## {h}\n\n{tex}{say}\n\n'
                f'→ [[{note}|{htitle}]] · [[{note}#^formule-{i}|voir en contexte, '
                'avec son commentaire]]')

nb_tex = sum(len(b['tex']) for b in blocks)
write(FNAME, front(['Formulaire', 'Formulaire Champs de vecteurs',
                    'Les formules du langage des champs'], 90,
                   f'formules: 8\nequations: {nb_tex}\n')
      + f'# Formulaire — les formules du langage des champs\n\n'
      f'Les **huit blocs de formules** du dossier — **{nb_tex} équations affichées** '
      "— dans l'ordre où la page les pose. Chacune renvoie au chapitre qui "
      "l'introduit, où son commentaire est déplié.\n\n"
      + '\n'.join(rows) + '\n\n' + '\n\n'.join(body) + '\n\n'
      '## En prime — le champ qui dessine le hero\n\n'
      "L'image d'accueil n'est pas une illustration : c'est un neuvième champ, "
      "celui que la page calcule elle-même image par image. Il n'apparaît nulle "
      "part dans le texte — il est dans le code.\n\n"
      '$$\\theta(x,y,t)=\\pi\\Bigl[\\sin(0{,}0042\\,x+0{,}18\\,t)'
      '+\\cos(0{,}0039\\,y-0{,}13\\,t)'
      '+0{,}6\\sin\\bigl(0{,}0026\\,(x+y)+0{,}09\\,t\\bigr)\\Bigr]$$\n\n'
      f"→ [[{N['these']}|{H['these']}]] · "
      f"[[{N['these']}#^formule-hero|voir en contexte]]\n\n"
      '> [!tip] 🗣️ Chaque formule se dit à voix haute\n'
      "> Les huit blocs portent leur ligne **« Se lit »** — la lecture orale en "
      "français, plus la glose des symboles qui se prononcent mal. C'est là que se "
      "règlent les pièges du dossier : le $\\partial$ qui se dit « **d rond** » et jamais "
      "« delta » ; le $d$ droit de $dx/dt$ qui se dit « **dé** », parce que la dérivée y "
      "est ordinaire et non partielle ; le point qui se dit « **scalaire** » et la croix "
      "« **vectoriel** », jamais « fois » ; et le $\\partial A$ de la divergence, où le d "
      "rond ne veut plus dire « dérivée » mais « **le bord de** ».\n"
      ">\n"
      "> Elles ont été écrites et posées dans la page le 25 août 2026 — le dossier VII "
      "était antérieur à la règle de la charte qui les impose. Voir "
      "[[Sources — la vérification du langage des champs]]." + LIC)

# ═══════════════════════════════════════════════════ LEXIQUE
LEX = [
    ('Le vocabulaire de départ', 'lexique', [
        ('scalaire', "Une grandeur qui tient en **un seul nombre**, entièrement décrite "
         "par sa valeur et son unité — *aucune direction*. La température, la masse, "
         "l'altitude, la pression, le temps."),
        ('vecteur', "Une grandeur qui a une intensité **et** une direction : une "
         "**flèche**. Sa longueur dit « combien », son orientation dit « vers où ». "
         "La vitesse, une force, un déplacement."),
        ('composantes', "Les nombres qui rangent un vecteur : en deux dimensions, "
         "$v_x$ (de combien il avance horizontalement) et $v_y$ (verticalement). "
         "Elles situent la pointe de la flèche."),
        ('norme', "La **longueur** de la flèche, c'est-à-dire l'intensité du vecteur : "
         "$\\lVert\\vec v\\rVert=\\sqrt{v_x^{2}+v_y^{2}}$. Un scalaire n'a que cette "
         "information — jamais le « vers où »."),
        ('champ', "Une **fonction** qui prend un point de l'espace en entrée et rend "
         "une grandeur en sortie. Le mot ne dit rien de la nature de cette grandeur ; "
         "c'est l'adjectif qui suit qui la précise."),
        ('champ scalaire', "Un nombre attaché à **chaque point** : une carte de "
         "températures, le relief d'une colline, la pression dans une pièce. "
         "On le lit en couleurs ou en **lignes de niveau**."),
        ('champ de vecteurs', "Une **flèche** attachée à chaque point. C'est l'objet "
         "de tout le dossier : vitesse d'un fluide, force de gravité, champ magnétique "
         "— le même dessin pour des mondes différents."),
        ('champ statique', "Un champ qu'on regarde figé, hors du temps, comme un "
         "régime permanent. Les champs réels changent — le vent vient par rafales — "
         "mais le dossier s'en tient volontairement à des champs statiques, en 2D."),
    ]),
    ('La convention de dessin', 'champs', [
        ('raccourcissement', "Le « petit mensonge » utile du chapitre II : on "
         "**écrase artificiellement** les flèches trop longues pour qu'elles "
         "n'encombrent pas le dessin — dans l'atelier, selon "
         "$L \\propto m/(1+0{,}6\\,m)$."),
        ('codage par la couleur', "Ce qu'on rend au dessin après l'avoir raccourci : "
         "la **couleur** redonne une idée de la longueur réelle. Turquoise pour le "
         "flux rapide, ambre pour l'intermédiaire, corail pour le lent."),
    ]),
    ('La colline et la pente', 'fluide', [
        ('gradient', "Le champ de vecteurs qui pointe partout vers la plus forte "
         "**montée** d'un champ scalaire : $\\nabla f=(\\partial f/\\partial x,\\ "
         "\\partial f/\\partial y)$. Son opposé dévale la pente."),
        ('potentiel', "La « colline » dont un écoulement serait la descente. Un champ "
         "**dérive d'un potentiel** quand il s'écrit $\\vec F=-\\nabla V$ — et l'on "
         "sait alors déjà énormément de lui."),
        ('ligne de niveau', "Une courbe qui joint les points de même valeur d'un champ "
         "scalaire — les courbes d'altitude d'une carte. Le gradient leur est partout "
         "perpendiculaire."),
    ]),
    ('Ce qui sort et ce qui entre', 'divergence', [
        ('divergence', "En un point, la tendance du fluide imaginé à **sortir** des "
         "petites régions voisines ou à **y entrer** : "
         "$\\nabla\\cdot\\vec F=\\partial F_x/\\partial x+\\partial F_y/\\partial y$. "
         "Un seul nombre, l'analogue d'une dérivée."),
        ('source', "Un point de divergence **positive** : le fluide y jaillit du néant. "
         "Il n'est pas nécessaire que *tout* s'en écarte — il suffit que ce qui arrive "
         "soit plus lent que ce qui repart."),
        ('puits', "Un point de divergence **négative** : une petite région y reçoit "
         "plus qu'elle ne laisse partir. Le fluide disparaît dans le néant."),
        ('incompressible', "Se dit d'un fluide dont la divergence est **nulle en tout "
         "point** — l'eau, par exemple. Une contrainte forte : le fluide ne fait que "
         "passer, sans jamais s'accumuler ni se raréfier."),
        ('flux', "Ce qui traverse le bord d'une région. La seconde écriture de la "
         "divergence est le flux **net** sortant divisé par l'aire, quand la région se "
         "réduit à un point."),
    ]),
    ('Ce qui tourne', 'rotationnel', [
        ('rotationnel', "En un point, la tendance du fluide à **tourner** : lâchez-y "
         "une brindille fixée par son centre, tournera-t-elle ? En 2D, un simple "
         "nombre : $(\\nabla\\times\\vec F)_z=\\partial F_y/\\partial x-\\partial F_x/"
         "\\partial y$."),
        ('brindille', "L'instrument de mesure mental du rotationnel : un petit bâton "
         "libre de pivoter mais pas de dériver. C'est aussi, dans l'atelier, le trait "
         "doré qui tourne au centre de l'écran."),
        ('cisaillement', "Un flux **lent d'un côté, rapide de l'autre**. Aucune "
         "circulation en boucle, et pourtant un rotationnel non nul : l'écart de "
         "vitesse suffit à faire tourner la brindille."),
        ('convention de signe', "Le piège du chapitre V. 3Blue1Brown appelle "
         "**positif** le sens horaire (axe vertical inversé à l'écran) ; la convention "
         "mathématique usuelle, celle des ateliers du dossier, appelle positif "
         "l'**antihoraire**. Même physique, signe opposé."),
        ('règle de la main droite', "La convention qui oriente le vrai rotationnel, "
         "tridimensionnel : il associe à chaque point un **vecteur** dont l'axe est "
         "celui de la rotation et la longueur l'intensité. La variante 2D du dossier "
         "n'en garde que le nombre."),
    ]),
    ('Le langage de la physique', 'maxwell', [
        ('équations de Maxwell', "Les **quatre** équations qui contiennent toute "
         "l'électricité et tout le magnétisme, écrites dans le langage de la "
         "divergence et du rotationnel."),
        ('loi de Gauss', "La divergence du champ électrique en un point est "
         "proportionnelle à la **densité de charge** qui s'y trouve : les régions "
         "positives sont des sources, les négatives des puits, et le vide s'écoule "
         "comme de l'eau."),
        ('monopôle magnétique', "Un pôle nord ou sud **isolé** — rien d'analogue aux "
         "charges électriques. $\\nabla\\cdot\\vec B=0$ partout dit exactement qu'il "
         "n'en existe pas : ni source, ni puits."),
        ('fiction utile', "Le fluide électrique n'existe pas. Le modèle source/puits "
         "est une **image**, choisie parce qu'elle rend l'équation lisible et juste — "
         "et savoir dire laquelle est la métaphore, c'est tout l'art de vulgariser "
         "sans tromper."),
    ]),
    ("Au-delà de l'espace", 'phases', [
        ('espace des phases', "Un plan dont chaque point est un **état complet** du "
         "système — ici, le couple (nombre de lapins, nombre de renards). Le champ n'y "
         "est plus spatial : il dit comment, et à quelle vitesse, l'état change."),
        ('flot de phase', "L'écoulement associé au champ de l'espace des phases. Dans "
         "le modèle proie-prédateur, il tourne en **boucles fermées** autour d'un "
         "équilibre : les cycles."),
        ('Lotka-Volterra', "Le système d'équations différentielles du chapitre VII : "
         "$\\dot x=\\alpha x-\\beta xy$ et $\\dot y=\\delta xy-\\gamma y$. Son "
         "équilibre tombe en $(\\gamma/\\delta\\,;\\,\\alpha/\\beta)$."),
    ]),
    ('Pourquoi cette notation', 'lien', [
        ('nabla', "Le triangle renversé $\\nabla$ : un **vecteur d'opérateurs de "
         "dérivation**, $(\\partial/\\partial x,\\ \\partial/\\partial y,\\ "
         "\\partial/\\partial z)$. Ce n'est pas qu'un symbole décoratif."),
        ('produit scalaire', "La mesure de l'**alignement** de deux vecteurs : "
         "$\\vec a\\cdot\\vec b=\\lVert\\vec a\\rVert\\lVert\\vec b\\rVert\\cos\\theta$. "
         "Un pas aligné avec le changement qu'il provoque, c'est de la divergence."),
        ('produit vectoriel', "La mesure de la **perpendicularité** : "
         "$\\lVert\\vec a\\times\\vec b\\rVert=\\lVert\\vec a\\rVert\\lVert\\vec b"
         "\\rVert\\sin\\theta$. Un changement perpendiculaire au pas, c'est de la "
         "rotation."),
    ]),
]

lex_body = []
for gtitle, sec, terms in LEX:
    lex_body.append(f'## {gtitle}\n\n*Les mots posés par [[{N[sec]}|{H[sec]}]].*\n')
    for t, d in terms:
        lex_body.append(f'- **{t}** — {d}')
    lex_body.append('')
nb_terms = sum(len(t) for _, _, t in LEX)

write('Lexique — les mots du champ',
      front(['Lexique', 'Lexique Champs de vecteurs', 'Les mots du champ'], 91,
            f'termes: {nb_terms}\n')
      + '# Lexique — les mots du champ\n\n'
      f'Les **{nb_terms} mots** dont le dossier a besoin, dans l\'ordre où il les '
      'pose, et définis comme il les définit. Rien ici qui ne soit dans la page.\n\n'
      + '\n'.join(lex_body).rstrip() + LIC)

# ═══════════════════════════════════════════════════ LES CINQ FIGURES
FIGS = [
    (1, 'champs', 'La convention de dessin',
     "La même rangée de vecteurs, dessinée honnêtement à gauche puis « avec un petit "
     "mensonge » utile à droite. À l'échelle, les longues flèches encombrent tout ; "
     "raccourcies et colorées, la rangée redevient lisible.", None),
    (2, 'fluide', 'La colline et sa pente',
     "Les courbes de niveau d'un potentiel, et les flèches qui suivent la plus grande "
     "pente. L'écoulement « est » la descente d'une colline.",
     'flowchart LR\n'
     '  V["Colline de potentiel<br/>V(x,y) — un nombre par point"]\n'
     '  G["∇V<br/>la flèche qui monte le plus fort"]\n'
     '  F["F = −∇V<br/>l\'écoulement qui dévale"]\n'
     '  V -- "dériver dans les deux directions" --> G\n'
     '  G -- "changer de signe" --> F'),
    (3, 'divergence', 'La source et le puits',
     "Le fluide jaillit à gauche, s'engouffre à droite. La divergence lit ce solde, "
     "point par point.",
     'flowchart TD\n'
     '  D{"∇·F en ce point"}\n'
     '  D -- "> 0" --> S["Source<br/>il sort plus qu\'il n\'entre"]\n'
     '  D -- "= 0" --> I["Incompressible<br/>il ne fait que passer"]\n'
     '  D -- "< 0" --> P["Puits<br/>il entre plus qu\'il ne sort"]'),
    (4, 'maxwell', 'E et B se relancent',
     "Champ électrique et champ magnétique, perpendiculaires et en quadrature : de "
     "leur va-et-vient naît la lumière.",
     'flowchart LR\n'
     '  E["∇×E = −∂B/∂t"]\n'
     '  B["∇×B = μ₀J + μ₀ε₀ ∂E/∂t"]\n'
     '  E -- "un E qui varie fait tourner B" --> B\n'
     '  B -- "un B qui varie fait tourner E" --> E\n'
     '  B --> L(["La lumière<br/>une onde qui se relance elle-même"])'),
    (5, 'lien', 'Le pas et le changement',
     "Un petit pas, et le changement du champ qu'il provoque : alignés, ils signent la "
     "divergence ; perpendiculaires, le rotationnel.",
     'flowchart TD\n'
     '  P["Un petit pas<br/>d\'un point au point voisin"]\n'
     '  C["Le changement du champ<br/>que ce pas provoque"]\n'
     '  P --> C\n'
     '  C -- "aligné · produit scalaire · cos θ" --> DIV["Divergence"]\n'
     '  C -- "perpendiculaire · produit vectoriel · sin θ" --> ROT["Rotationnel"]'),
]

fig_body = []
for n, sec, title, desc, mer in FIGS:
    fig_body.append(f'## Figure {n} — {title}\n\n{desc}\n')
    if mer:
        fig_body.append('```mermaid\n' + mer + '\n```\n')
    else:
        fig_body.append('*Ce schéma est une comparaison de deux dessins : il n\'a pas '
                        'd\'équivalent en diagramme. Il se regarde.*\n')
    fig_body.append(f'→ [[{N[sec]}|{H[sec]}]] · '
                    f'[la figure animée dans le dossier]({URL}#{sec})\n')

write('Les cinq figures — ce que les schémas montrent',
      front(['Les cinq figures', 'Figures Champs de vecteurs', 'Les schémas du dossier'],
            92, 'figures: 5\n')
      + '# Les cinq figures — ce que les schémas montrent\n\n'
      "Les cinq schémas du dossier sont des **SVG dessinés en direct par le "
      "JavaScript de la page** : le HTML ne contient que des `<g>` vides, et rien de "
      "tout cela n'arrive jusqu'au Markdown. Cette note rend ce que chacun montre, et "
      "le redessine en Mermaid quand la figure porte une **structure** plutôt qu'une "
      "géométrie.\n\n" + '\n'.join(fig_body).rstrip() + LIC)

# ═══════════════════════════════════════════════════ LES VOIX DU DOSSIER
write('Les voix du dossier — qui a écrit ces équations',
      front(['Les voix du dossier', 'Attributions Champs de vecteurs',
             'Qui a écrit ces équations'], 93, 'voix: 7\n')
      + "# Les voix du dossier — qui a écrit ces équations\n\n"
      "Le dossier nomme peu de monde : il montre des équations plutôt que des "
      "biographies. Cette note rassemble les **attributions qu'il donne**, et celles "
      "que l'audit du [[Dossier XIV — Les Formules de l'Empire|Dossier XIV]] ajoute "
      "comme référence canonique. Rien de plus — pas de notice biographique inventée.\n\n"
      "| Nom | Ce qu'il signe dans ce dossier | Où |\n| --- | --- | --- |\n"
      "| **Grant Sanderson** *(3Blue1Brown)* | L'épisode « Divergence & rotationnel » "
      "dont ce dossier est le portage français — sept citations, et la thèse du fluide "
      f"imaginé | tout le dossier |\n"
      "| **[[James Clerk Maxwell]]** | Les **quatre équations** "
      "de l'électromagnétisme (1865) — la forme moderne, à quatre équations "
      f"vectorielles, est due à Heaviside | [[{N['maxwell']}\\|{H['maxwell']}]] |\n"
      "| **Oliver Heaviside** | La réécriture des vingt équations de Maxwell en les "
      "**quatre** que le dossier affiche, dans le langage vectoriel de ∇ | "
      f"[[{N['maxwell']}\\|{H['maxwell']}]] |\n"
      "| **Carl Friedrich Gauss** | La **loi de Gauss** : la divergence du champ "
      f"électrique est proportionnelle à la densité de charge | [[{N['maxwell']}\\|"
      f"{H['maxwell']}]] |\n"
      "| **Michael Faraday** | La troisième équation : un champ magnétique qui varie "
      f"fait **tourner** le champ électrique | [[{N['maxwell']}\\|{H['maxwell']}]] |\n"
      "| **André-Marie Ampère** | La quatrième, dite **Ampère-Maxwell** : courant et "
      f"champ électrique variable font tourner le champ magnétique | [[{N['maxwell']}"
      f"\\|{H['maxwell']}]] |\n"
      "| **Alfred Lotka** *(1925)* **& Vito Volterra** *(1926)* | Le système "
      "proie-prédateur du chapitre VII, dont le champ tourne en boucles fermées | "
      f"[[{N['phases']}\\|{H['phases']}]] |\n\n"
      "> [!info] 📐 Une seule fiche de portrait, et elle existe déjà\n"
      "> Le coffre tient une galerie de savants dans le [[Dossier XXV — L'entropie, le "
      "temps et l'Univers|Dossier XXV]] : c'est là qu'est la fiche "
      "[[James Clerk Maxwell]], écrite pour le **démon** de Maxwell. Le Maxwell des "
      "quatre équations est le même homme — les notes de ce dossier pointent donc "
      "vers cette fiche plutôt que d'en créer une seconde.\n"
      ">\n"
      "> Les six autres noms n'ont **pas** de fiche : ce dossier ne dit rien d'eux que "
      "leur signature au bas d'une équation, et ce coffre n'invente pas de biographie."
      "\n\n"
      "> [!warning] ⚠️ Heaviside n'est pas un détail\n"
      "> Les **quatre** équations que le dossier affiche ne sont pas la rédaction de "
      "Maxwell : son mémoire de 1865 en compte une vingtaine, écrites en composantes. "
      "C'est **Heaviside** qui, en 1884, les ramène à quatre équations vectorielles — "
      "avec le calcul vectoriel, et donc la notation $\\nabla\\cdot$ et "
      "$\\nabla\\times$, qu'il venait lui-même de forger. Le groupe fut longtemps appelé "
      "« équations de Hertz-Heaviside ».\n"
      ">\n"
      "> Ce n'est pas une erreur — l'usage universel dit « équations de Maxwell » — mais "
      "la précision compte d'autant plus que le **chapitre VIII parle justement de cette "
      "notation-là**. L'audit la porte en nuance ⚠️ : "
      "[[Sources — la vérification du langage des champs]]. Les dates et les DOI de "
      "cette table en viennent, et non de la page." + LIC)

# ═══════════════════════════════════════════════════ MOC
these = soup.find('section', id='these')
intro = these.find_all('p', recursive=False)[1].get_text()
intro = re.sub(r'\s+', ' ', intro).replace('\xa0', ' ').strip()
credit = soup.find('section', class_='credit')
note = re.sub(r'\s+', ' ', credit.find(class_='note').get_text()).strip()

somm = []
for s in PLAN['sections']:
    somm.append(f"- [[{s['file']}|{s['h1']}]]")

write(MOC, front(['Dossier VII', 'Le langage des champs', 'Champs de vecteurs',
                  'Divergence & rotationnel'], 0)
      + '# Dossier VII — Le langage des champs — Divergence & rotationnel\n\n'
      '![Le langage des champs — un écoulement de vecteurs, sources, puits et '
      'tourbillons](_assets/champs-hero.jpg)\n\n'
      '*Dossier VII · Mathématiques + atelier · Samlepirate, d\'après 3Blue1Brown*\n\n'
      "*Posez une **flèche** sur chaque point de l'espace, puis imaginez que c'est un "
      "**fluide** : le gradient, la divergence et le rotationnel deviennent visibles — "
      "jusqu'à faire parler les équations de Maxwell.*\n\n"
      '> [!quote] Le geste de départ\n'
      "> « Tout commence par un geste minuscule : associer à chaque point une "
      "*flèche*. Tout finit par la lumière. »\n\n"
      '> [!info] Accès rapide\n'
      f'> [[Tableau de bord — Champs de vecteurs|⌂ Tableau de bord du dossier]] · '
      f'[[Carte du dossier — Champs de vecteurs.canvas|🗺️ Carte du dossier]] · '
      f'[[{FNAME}|🧮 Formulaire]] · '
      '[[Lexique — les mots du champ|📖 Lexique]] · '
      '[[Les cinq figures — ce que les schémas montrent|📐 Les cinq figures]] · '
      '[[Les voix du dossier — qui a écrit ces équations|🗣️ Les voix]] · '
      '[[Sources — la vérification du langage des champs|🔬 Sources]]\n\n'
      '## Le dossier en un coup d\'œil\n\n'
      '| Chapitres | Ateliers | Blocs de formules | Équations | Figures | Mots du lexique |\n'
      '| --- | --- | --- | --- | --- | --- |\n'
      f'| 8 | 2 | 8 | {nb_tex} | 5 | {nb_terms} |\n\n'
      '## De quoi il retourne\n\n' + intro + '\n\n'
      '## Le fil conducteur\n\n'
      "Un seul objet — le champ — et deux questions qu'on lui pose. Tout le reste "
      "en découle, jusqu'à la lumière.\n\n"
      '```mermaid\n'
      'flowchart TD\n'
      '  S["Scalaire<br/>un nombre"] --> CH["Le champ<br/>une grandeur par point"]\n'
      '  V["Vecteur<br/>un nombre + une direction"] --> CH\n'
      '  CH --> CS["Champ scalaire<br/>une colline"]\n'
      '  CH --> CV["Champ de vecteurs<br/>un écoulement"]\n'
      '  CS -- "gradient ∇f" --> CV\n'
      '  CV --> Q1{"Deux questions<br/>en chaque point"}\n'
      '  Q1 -- "ça sort ou ça entre ?" --> DIV["Divergence ∇·F<br/>sources et puits"]\n'
      '  Q1 -- "ça tourne ?" --> ROT["Rotationnel ∇×F<br/>la brindille"]\n'
      '  DIV --> MX["Les quatre équations<br/>de Maxwell"]\n'
      '  ROT --> MX\n'
      '  MX --> LU(["La lumière"])\n'
      '  DIV --> PH["L\'espace des phases<br/>lapins et renards"]\n'
      '  ROT --> PH\n'
      '  DIV --> LI["Produit scalaire ↔ divergence<br/>produit vectoriel ↔ rotationnel"]\n'
      '  ROT --> LI\n'
      '```\n\n'
      '## Ce que vous saurez faire en refermant ce dossier\n\n'
      "- **Lire un champ** — reconnaître d'un coup d'œil une source, un puits, un "
      "tourbillon, un cisaillement et une selle — et savoir que l'œil se trompe, mais "
      "pas les deux nombres.\n"
      "- **Changer de métaphore à volonté** — voir un champ électrique comme un "
      "écoulement, un écoulement comme la descente d'une colline, et savoir ce que "
      "chaque lampe éclaire.\n"
      "- **Lire les équations de Maxwell** — savoir dire, en français, ce que chacune "
      "des quatre affirme, et pourquoi les deux dernières engendrent la lumière.\n"
      "- **Sortir de l'espace** — appliquer les mêmes deux questions à un système qui "
      "n'a rien de spatial : deux populations, un plan de phases, des cycles.\n\n"
      '## Sommaire\n\n' + '\n'.join(somm) + '\n\n'
      '### L\'appareil du dossier\n\n'
      f'- [[{FNAME}|Formulaire — les 8 blocs, {nb_tex} équations]]\n'
      f'- [[Lexique — les mots du champ|Lexique — {nb_terms} mots du champ]]\n'
      '- [[Les cinq figures — ce que les schémas montrent|Les cinq figures — les schémas rendus]]\n'
      '- [[Les voix du dossier — qui a écrit ces équations|Les voix — qui signe ces équations]]\n'
      '- [[Sources — la vérification du langage des champs|Sources — la vérification]]\n'
      '- [[Dossier VII — lecture.base|Base — le dossier dans l\'ordre]] · '
      "[[Dossier VII — l'appareil.base|Base — l'appareil]]\n\n"
      '## Dossiers liés\n\n'
      "- [[Dossier XIV — Les Formules de l'Empire]] — son **Acte III « Champs & "
      "lumière »** est la mise en atelier de ce dossier-ci : gradient, divergence, "
      "rotationnel, Maxwell et Lotka-Volterra, chacun avec ses curseurs ;\n"
      '- [[Empire contre Intox — tableau de bord]] · '
      "[[Empire contre Intox — l'index des dossiers]] — le coffre entier.\n\n"
      '## Crédits\n\n'
      '![Avatar de Samlepirate|80](_assets/avatar-samlepirate.jpeg)\n\n'
      '**Réalisé par Samlepirate.** ' + note + '\n\n'
      '> [!quote] Empire contre Intox\n'
      '> Archives publiques du collectif : des transcriptions de lives devenues pages '
      'immersives, où la science répond, fait par fait, aux récits de l\'intox.\n'
      '>\n'
      '> *Veritas omnia vincit · Ad astra per aspera.*\n\n'
      f'🌐 **[Le dossier en ligne]({URL})**' + LIC)

print(f'\nFormulaire : 8 blocs · {nb_tex} équations · Lexique : {nb_terms} termes')
