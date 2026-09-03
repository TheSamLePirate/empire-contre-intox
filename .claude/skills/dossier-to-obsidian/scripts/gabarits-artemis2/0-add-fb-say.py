#!/usr/bin/env python3
"""Insère les 10 lignes « Se lit » dans provoxys/Artemis2.html.

Chaque ligne se pose juste après la dernière <div class="formula"> de son
bloc, avant le <p class="fb-note">. Jetons de la page hôte (voie B).
"""
import re
import sys
from pathlib import Path

SRC = Path("provoxys/Artemis2.html")

# (fragment identifiant le bloc via son fb-head, phrase, glose)
SAY = [
    (
        "Équation de vis-viva",
        "«&nbsp;v égale racine carrée de mu multiplié par, deux sur r moins un sur a&nbsp;»",
        "La lettre grecque <b>μ</b> se dit «&nbsp;mu&nbsp;»&nbsp;: c'est le paramètre "
        "gravitationnel <span class=\"imath\" data-tex=\"\\mu = GM\"></span>, pas une masse. "
        "La parenthèse dit jusqu'où va la racine&nbsp;: <em>tout</em> ce qu'elle contient est "
        "sous le radical. La barre de fraction se lit «&nbsp;sur&nbsp;».",
    ),
    (
        "S'extraire de l'attraction terrestre",
        "«&nbsp;v indice orb égale racine de G M sur r, environ sept virgule huit kilomètres par "
        "seconde&nbsp;; v indice lib égale racine de deux G M sur r, égale racine de deux fois "
        "v orb, environ onze virgule deux kilomètres par seconde&nbsp;»",
        "L'indice se dit «&nbsp;indice&nbsp;»&nbsp;: <b>v<sub>orb</sub></b> «&nbsp;v indice orb&nbsp;» "
        "(vitesse orbitale), <b>v<sub>lib</sub></b> «&nbsp;v indice lib&nbsp;» (vitesse de libération). "
        "<b>GM</b> se lit «&nbsp;G M&nbsp;», la constante de gravitation multipliée par la masse de la "
        "Terre. Le signe <b>≈</b> se dit «&nbsp;environ&nbsp;», et «&nbsp;km/s&nbsp;» «&nbsp;kilomètres "
        "par seconde&nbsp;».",
    ),
    (
        "Électrolyse de l'eau lunaire",
        "«&nbsp;deux H deux O donnent, par électrolyse, deux H deux qui dégage plus O deux qui "
        "dégage&nbsp;»&nbsp;; «&nbsp;un kilogramme d'eau donne zéro virgule onze kilogramme "
        "d'hydrogène et zéro virgule quatre-vingt-neuf kilogramme d'oxygène&nbsp;»",
        "<b>H₂O</b> se dit «&nbsp;H deux O&nbsp;». Attention aux deux «&nbsp;deux&nbsp;»&nbsp;: le "
        "chiffre <em>devant</em> la molécule est un coefficient (deux molécules), l'indice "
        "<em>dans</em> H₂ compte les atomes. La flèche vers le haut <b>↑</b> ne se prononce pas comme "
        "un mot&nbsp;: elle note un dégagement gazeux, «&nbsp;qui dégage&nbsp;».",
    ),
    (
        "Poussée → accélération",
        "«&nbsp;F égale m a, donc a égale F sur m, égale trente-neuf mille kilonewtons sur quatre "
        "fois dix puissance six kilogrammes, environ neuf virgule huit mètres par seconde au "
        "carré&nbsp;»",
        "Le double trait <b>⟹</b> se dit «&nbsp;donc&nbsp;» (ou «&nbsp;implique&nbsp;»)&nbsp;; ce n'est "
        "pas un égal. <b>kN</b> se lit «&nbsp;kilonewtons&nbsp;», et <b>m/s²</b> «&nbsp;mètres par "
        "seconde au carré&nbsp;» — jamais «&nbsp;mètres seconde deux&nbsp;».",
    ),
    (
        "Équation de Tsiolkovsky",
        "«&nbsp;delta v égale I indice s p, fois g indice zéro, fois logarithme népérien de "
        "m indice zéro sur m indice f&nbsp;»",
        "<b>Δ</b> est le delta majuscule&nbsp;: il note une variation, et <b>Δv</b> se dit "
        "«&nbsp;delta v&nbsp;». <b>I<sub>sp</sub></b> («&nbsp;I indice s p&nbsp;») est l'impulsion "
        "spécifique, <b>g₀</b> («&nbsp;g indice zéro&nbsp;») la pesanteur de référence. <b>ln</b> se "
        "dit «&nbsp;logarithme népérien&nbsp;», jamais «&nbsp;L N&nbsp;»&nbsp;; <b>m₀</b> est la masse "
        "au départ, <b>m<sub>f</sub></b> la masse finale.",
    ),
    (
        "Puissance cinétique de l'échappement",
        "«&nbsp;P égale un demi, m point, v e au carré&nbsp;; avec m point environ mille cinq cents "
        "kilogrammes par seconde et v e environ deux mille six cent cinquante mètres par "
        "seconde&nbsp;»",
        "Le point <em>au-dessus</em> de la lettre change tout&nbsp;: "
        "<span class=\"imath\" data-tex=\"\\dot m\"></span> se dit «&nbsp;m point&nbsp;» et désigne un "
        "<b>débit</b> — une masse <em>par seconde</em>, pas une masse. "
        "<span class=\"imath\" data-tex=\"v_e\"></span> se lit «&nbsp;v indice e&nbsp;», la vitesse "
        "d'éjection des gaz.",
    ),
    (
        "Loi de Fourier",
        "«&nbsp;vecteur q égale moins k, vecteur nabla T&nbsp;»",
        "La flèche au-dessus d'une lettre dit que la grandeur est un <b>vecteur</b>&nbsp;: "
        "<span class=\"imath\" data-tex=\"\\vec q\"></span> se dit «&nbsp;vecteur q&nbsp;» (ou "
        "«&nbsp;q vecteur&nbsp;»). Le symbole <b>∇</b> est la lettre <b>nabla</b>&nbsp;; "
        "<span class=\"imath\" data-tex=\"\\vec\\nabla T\"></span> se lit «&nbsp;nabla T&nbsp;» ou "
        "«&nbsp;gradient de T&nbsp;». Le signe moins n'est pas décoratif&nbsp;: il dit que la chaleur "
        "<em>descend</em> le gradient, du chaud vers le froid.",
    ),
    (
        "Flux &amp; dose des rayons cosmiques",
        "«&nbsp;phi environ un virgule huit particule par centimètre carré et par seconde&nbsp;»&nbsp;; "
        "«&nbsp;N égale phi A t, donc D égale E N sur m&nbsp;»",
        "<b>Φ</b> est le phi majuscule grec, qui se dit «&nbsp;fi&nbsp;»&nbsp;: c'est le flux. Les "
        "exposants négatifs se lisent «&nbsp;par&nbsp;»&nbsp;: <b>cm⁻²</b> «&nbsp;par centimètre "
        "carré&nbsp;», <b>s⁻¹</b> «&nbsp;par seconde&nbsp;». Dans la seconde ligne, <b>D</b> est la "
        "dose, <b>E</b> l'énergie déposée par particule, <b>m</b> la masse exposée.",
    ),
    (
        "Atténuation des ondes sismiques",
        "«&nbsp;A de r est proportionnel à un sur r au carré&nbsp;; pics au pas de tir, zéro virgule "
        "cinq à un g&nbsp;»",
        "<b>A(r)</b> se lit «&nbsp;A de r&nbsp;» — A <em>en fonction de</em> r, pas A multiplié par r. "
        "Le symbole <b>∝</b> se dit «&nbsp;est proportionnel à&nbsp;» et n'est pas un égal&nbsp;: il "
        "donne la <em>forme</em> de la décroissance, pas sa valeur. Le <b>g</b> final est "
        "l'accélération de la pesanteur prise comme unité.",
    ),
    (
        "Transfert de Hohmann vers la Lune",
        "«&nbsp;delta v indice tot égale racine de mu sur r un, multiplié par, racine de deux r deux "
        "sur r un plus r deux, moins un&nbsp;; plus racine de mu sur r deux, multiplié par, un moins "
        "racine de deux r un sur r un plus r deux&nbsp;»&nbsp;; «&nbsp;gamma égale pi multiplié par, "
        "un moins, r un plus r deux sur deux r deux, le tout à la puissance trois demis&nbsp;»",
        "<b>r₁</b> et <b>r₂</b> se disent «&nbsp;r un&nbsp;» et «&nbsp;r deux&nbsp;»&nbsp;: le rayon de "
        "départ et le rayon d'arrivée. <b>γ</b> est la lettre grecque <b>gamma</b> (l'angle d'avance), "
        "<b>π</b> se dit «&nbsp;pi&nbsp;». L'exposant <b>3/2</b> se lit «&nbsp;trois demis&nbsp;», et "
        "«&nbsp;le tout à la puissance&nbsp;» dit que l'exposant porte sur toute la fraction, pas sur "
        "le seul r deux.",
    ),
]


def main() -> int:
    html = SRC.read_text(encoding="utf-8")
    if 'class="fb-say"' in html:
        print("✗ des .fb-say sont déjà présentes — rien à faire", file=sys.stderr)
        return 1

    # Découpe en blocs de formule pour insérer au bon endroit.
    blocks = list(re.finditer(r'<div class="formula-block">.*?</div>\s*\n\s*</div>', html, re.S))
    # Repli : découper sur le marqueur d'ouverture, puis trouver le fb-note.
    out = html
    done = []
    for head, phrase, glose in SAY:
        # Localise le bloc par son fb-head
        m = re.search(
            r'(<div class="formula-block">\s*<div class="fb-head">\s*'
            + re.escape(head)
            + r'.*?)(\s*<p class="fb-note">)',
            out,
            re.S,
        )
        if not m:
            print(f"✗ bloc introuvable : {head}", file=sys.stderr)
            return 2
        say = (
            '\n      <p class="fb-say"><span class="say-k">Se lit</span>'
            f'<span class="say-t">{phrase}'
            f'<span class="say-x">{glose}</span></span></p>'
        )
        out = out[: m.end(1)] + say + out[m.end(1) :]
        done.append(head)

    SRC.write_text(out, encoding="utf-8")
    print(f"✓ {len(done)} lignes « Se lit » insérées")
    for d in done:
        print("   ·", d)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
