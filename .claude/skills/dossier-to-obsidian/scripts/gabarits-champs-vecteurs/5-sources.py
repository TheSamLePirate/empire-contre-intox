#!/usr/bin/env python3
"""Dossier VII → Obsidian : la note « Sources », extraite de sources.html.

Depuis le 25/08/2026, `sources/sources.html` porte une section `#champs-vecteurs`
et un groupe de références DOI pour ce dossier : la note n'est donc plus écrite à
la main, elle est **extraite** comme pour les autres dossiers — le tableau JS
`const CHAMPS = [...]` et le groupe `Dossier VII` de `REFS`.
"""
import os, re, json

REPO = '/Users/olivierveinand/Documents/DEV/empire-contre-intox'
SRC = os.path.join(REPO, 'sources/sources.html')
OUT = ('/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/'
       'Dossier VII — Champs de vecteurs')
NAME = 'Sources — la vérification du langage des champs'
MOC = 'Dossier VII — Le langage des champs'
GH = 'https://github.com/TheSamLePirate/empire-contre-intox/blob/main/sources/'
TODAY = '2026-08-25'

html = open(SRC, encoding='utf-8').read()


def js_array(name):
    """Extrait `const NAME = [ … ];` et le rend en objets Python."""
    i = html.index(f'const {name} = [')
    j = html.index('\n    ];', i)
    body = html[i + len(f'const {name} = '):j + len('\n    ]')]
    body = re.sub(r'\bCV\+', '"../samlepirate/assets/"+', body)
    # JSON-ifier : clés nues → clés entre guillemets, concaténations → littéraux
    body = re.sub(r'([{,]\s*)(\w+):', r'\1"\2":', body)
    body = re.sub(r'"([^"]*)"\s*\+\s*"([^"]*)"', lambda m: '"%s%s"' % m.groups(), body)
    body = re.sub(r',(\s*[\]}])', r'\1', body)      # virgule finale : JSON n'en veut pas
    return json.loads(body)


FICHES = js_array('CHAMPS')

# le groupe REFS du dossier VII
gi = html.index('{ g:"Dossier VII · Le langage des champs (4 DOI)", items:[')
gj = html.index('\n      ]},', gi)
REFS = re.findall(
    r'\{ a:"(.*?)", t:"(.*?)", j:"(.*?)", k:"(.*?)", doi:"(.*?)",\s*\n\s*ab:"(.*?)" \}',
    html[gi:gj], re.S)
assert len(FICHES) == 12 and len(REFS) == 4, (len(FICHES), len(REFS))

VERDICT = {'ok': ('success', '✅ Confirmé'), 'warn': ('warning', '⚠️ À nuancer'),
           'deb': ('help', '🔶 Débattu'), 'fresh': ('warning', '🛠️ Corrigé après audit')}


def unesc(x):
    return (x.replace('\\u00e9', 'é').encode().decode('unicode_escape')
            if '\\u' in x else x).replace('\\"', '"')


def link(u):
    """Une source de la page → une URL utilisable depuis le coffre."""
    if u.startswith('http'):
        return u
    if u.startswith('../'):
        return 'https://empire-contre-intox.com/' + u[3:]
    return GH + u


rows = ['| Verdict | Affirmation | Ce que dit la vérification |', '| --- | --- | --- |']
cards = []
for f in FICHES:
    kind, label = VERDICT[f['v']]
    t = unesc(f['t'])
    rows.append(f"| {label} | [[{NAME}#{t}\\|{t}]] | {unesc(f['d'])} |")
    srcs = ' · '.join(f"[{unesc(s['n'])}]({link(s['u'])})" for s in f['src'])
    cards.append(f"### {t}\n\n> [!{kind}] {label} — {t}\n> **{unesc(f['d'])}**\n>\n"
                 f"> {unesc(f['s'])}\n>\n> **Sources :** {srcs}")

refs = []
for a, t, j, k, doi, ab in REFS:
    a, t, j, ab = map(unesc, (a, t, j, ab))
    refs.append(f"> [!cite]- {a} — *{t}*\n> **{j}**\n> "
                f"{'Article primaire' if k == 'primary' else 'Revue'} · "
                f"DOI : [{doi}](https://doi.org/{doi}) — **vérifié via Crossref**\n>\n> {ab}")

n_ok = sum(1 for f in FICHES if f['v'] == 'ok')
n_warn = sum(1 for f in FICHES if f['v'] == 'warn')
n_fresh = sum(1 for f in FICHES if f['v'] == 'fresh')

doc = f'''---
projet: Empire contre Intox
dossier: VII
titre-dossier: "Le langage des champs"
auteurs: [Samlepirate]
d-apres: "3Blue1Brown (Grant Sanderson)"
source: https://empire-contre-intox.com/sources/sources.html#champs-vecteurs
licence: CC BY-NC-ND 4.0
importé: {TODAY}
tags: [empire-contre-intox/dossier-vii, sources, verification, doi]
aliases: ["Sources Champs de vecteurs", "Vérification du dossier VII", "Audit Champs de vecteurs"]
ordre: 95
fiches: {len(FICHES)}
doi: {len(REFS)}
---


# Sources — la vérification du langage des champs

L'extrait du **Dossier XXVIII « Les Sources »** qui concerne *Le langage des champs* — {len(FICHES)} fiches de vérification et {len(REFS)} DOI vérifiés via Crossref.

> [!info] La méthode, ici : le calcul avant la recherche web
> Ce dossier est un dossier de **mathématiques** : il n'affirme presque aucun fait du monde, il pose des **définitions**, des **identités** et des **exemples analytiques**. L'essentiel de la vérification s'est donc faite **en recalculant**, pas en cherchant une source qui dise la même chose — la même politique qu'au [[Dossier XXVII — L'Ordinateur de 1983|Dossier XXVII]], où la source primaire était le code et la vérification une exécution.
>
> Les **six champs de l'atelier** ont été dérivés symboliquement et confrontés aux deux nombres que la page affiche ; l'**équilibre proie-prédateur** recalculé sur les coefficients réellement câblés dans le JavaScript, et l'existence d'orbites **fermées** démontrée par l'invariant du système ; les **constantes d'affichage** relevées dans le code. Seules l'histoire des quatre équations, l'état de la recherche sur les monopôles et la source elle-même ont demandé une recherche documentaire.
>
> **39 affirmations auditées : 34 ✅, 3 ⚠️, 1 🔶, 1 ❌ corrigé** · **{len(REFS)} DOI vérifiés Crossref**.

## Ce que l'audit a changé dans la page

- **Une erreur factuelle, une seule.** La description du champ *Cisaillement*, dans le code de l'atelier, renvoyait au « chapitre IV » — or le chapitre IV traite de la **divergence**, et ce champ a précisément une divergence *nulle*. C'est l'exemple du **chapitre V**. Corrigé.
- **Les huit lignes « Se lit »** que la charte impose sous toute formule affichée ont été écrites et posées — le dossier VII était antérieur à cette règle. Elles sont rendues dans les jetons de la page hôte et vérifiées sans débordement de 360 à 3840 px. Voir [[Formulaire — les formules du langage des champs]].
- **Trois nuances (⚠️)** restent à porter dans le texte, de préférence en encadré « anti-intox » : les monopôles « n'existent pas » → *n'ont jamais été détectés* ; les « quatre équations de Maxwell » → forme de **Heaviside** (1884) ; les sept citations sont des **traductions**, pas des citations littérales.

## Les fiches de vérification

{chr(10).join(rows)}

{chr(10).join(chr(10).join([c, '']) for c in cards)}
## Références scientifiques (DOI vérifiés Crossref)

{(chr(10) + chr(10)).join(refs)}

> [!warning] ⚠️ Anti-hallucination
> Quatre DOI, quatre vérifications Crossref effectives (titre, auteurs, revue, année, pages). **Aucun DOI n'a été deviné.** Pour *Elements of Physical Biology* (Lotka, 1925) et pour les travaux d'**Oliver Heaviside** — qui a donné aux quatre équations la forme que le dossier affiche —, la mention est « **DOI non trouvé — ouvrages** », et non un identifiant fabriqué.

> [!info] 📐 Ce qui ne demande pas de DOI
> Les douze identités mathématiques du dossier — norme d'un vecteur, gradient, divergence sous ses deux formes, rotationnel 2D et 3D, produits scalaire et vectoriel, théorème de la divergence, équation de continuité — sont des résultats de manuel. L'audit indique pour chacune le **résultat recalculé** plutôt qu'une référence : quand une affirmation peut être *refaite*, la refaire vaut mieux que la sourcer.

## L'audit complet

- [`sources/dossier-VII-champs-vecteurs.md`]({GH}dossier-VII-champs-vecteurs.md) — les 39 affirmations, une par une, avec leur verdict ;
- [`sources/refs-doi-VII-champs-vecteurs.md`]({GH}refs-doi-VII-champs-vecteurs.md) — les {len(REFS)} références primaires ;
- [la section « Le langage des champs »](https://empire-contre-intox.com/sources/sources.html#champs-vecteurs) du Dossier XXVIII, en ligne.

## Source primaire du dossier

Le dossier est le **portage français** d'un épisode de 3Blue1Brown, cité sept fois entre guillemets et crédité partout — hero, bandeau de crédit, pied de page, carte d'index : *« Divergence and curl: The language of Maxwell's equations, fluid flow, and more »*, Grant Sanderson, **21 juin 2018** — [3blue1brown.com](https://www.3blue1brown.com/lessons/divergence-and-curl/) · [YouTube](https://www.youtube.com/watch?v=rB83DpBJQsE).

---

[[{MOC}|⌂ Sommaire du dossier]] · [[Tableau de bord — Champs de vecteurs|⌂ Tableau de bord]] · [[Les voix du dossier — qui a écrit ces équations|🗣️ Les voix du dossier]]

---

> [!quote] Licence
> Contenu **Empire contre Intox** sous licence [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr) — partage avec attribution, sans usage commercial ni modification. Réalisé par **Samlepirate**, d'après l'épisode *« Divergence & rotationnel »* de **3Blue1Brown** (Grant Sanderson).
'''
open(os.path.join(OUT, NAME + '.md'), 'w', encoding='utf-8').write(doc)
print(f'  + {NAME}')
print(f'    {len(FICHES)} fiches ({n_ok} ✅, {n_warn} ⚠️, {n_fresh} 🛠️) · {len(REFS)} DOI')
