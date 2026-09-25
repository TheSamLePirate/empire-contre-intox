# -*- coding: utf-8 -*-
"""Balisage commun du composant « formule survolable » (mêmes classes partout, CSS/JS : assets/eci-formules.*)."""
import html
import json
import re


def esc(s):
    return html.escape(s or "", quote=False)


def attr(s):
    return html.escape(s or "", quote=True)


def md_inline(text):
    """Markdown léger pour les fiches : **gras**, *italique*, $TeX$ (→ span.imath), HTML existant conservé."""
    maths = []

    def keep(m):
        maths.append(m.group(1)); return f"\x00{len(maths) - 1}\x00"
    s = re.sub(r"(?<![\\$])\$(?!\$)(.+?)(?<![\\])\$", keep, text or "")
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"(?<![*\w])\*(?!\s)([^*]+?)(?<!\s)\*(?![*\w])", r"<em>\1</em>", s)
    s = re.sub(r"\x00(\d+)\x00", lambda m: f'<span class="imath" data-tex="{attr(maths[int(m.group(1))])}">{esc(maths[int(m.group(1))])}</span>', s)
    return s


def dit_html(dit_html_text):
    """Encadré « Ce qu'elle dit » (le texte est déjà en HTML)."""
    if not dit_html_text:
        return ""
    return f'<div class="fb-dit" data-fsym-gen><p class="fb-k">Ce qu’elle dit</p><p class="fb-note">{dit_html_text}</p></div>'


def legend_html(syms, fmt=md_inline, fallback=None):
    """Rangée « Les symboles » : une fiche par symbole (tex, définition, unité, remarque).
    fmt met en forme les textes (Markdown léger par défaut) ; fallback donne le texte affiché avant KaTeX."""
    if not syms:
        return ""
    items = []
    for k, sy in enumerate(syms):
        t, n = sy[0], sy[1]
        u = sy[2] if len(sy) > 2 else ""
        v = sy[3] if len(sy) > 3 else ""
        items.append(f'<li data-k="{k}" tabindex="0"><span class="fs-t"><span class="imath" data-tex="{attr(t)}">{esc(fallback(t) if fallback else t)}</span></span> '
                     f'<span class="fs-n">{fmt(n)}</span>'
                     + (f' <span class="fs-u">{fmt(u)}</span>' if u else "")
                     + (f' <span class="fs-v">{fmt(v)}</span>' if v else "") + "</li>")
    return (f'<div class="fb-syms" data-fsym-gen><p class="fb-k">Les symboles. <span>Survolez la formule ou un symbole.</span></p>'
            f'<ul>{"".join(items)}</ul></div>')


def syms_attr(syms):
    return attr(json.dumps([list(x) for x in syms], ensure_ascii=False)) if syms else ""
