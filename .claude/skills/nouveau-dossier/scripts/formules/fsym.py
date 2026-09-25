# -*- coding: utf-8 -*-
"""Symboles des formules : annotation du TeX pour le survol (définition + unité de chaque élément).

Chaque formule reçoit une liste de symboles : (tex, nom, unité, [valeur ou remarque]).
`annotate(tex, syms)` enveloppe chaque occurrence de chaque symbole dans \\htmlData{sym=k}{…}
(KaTeX, option trust) ; la page affiche alors, au survol ou au toucher, la fiche du symbole.

Règles d'appariement (sur des jetons TeX, pas sur du texte brut) :
- les indices et exposants d'un seul jeton sont normalisés (p_0 ≡ p_{0}, \\hat p ≡ \\hat{p}) ;
- le plus long symbole d'abord ; un jeton déjà annoté ne l'est pas deux fois ;
- rien n'est annoté dans l'argument de \\text, \\mathrm, \\operatorname… sauf si le symbole
  lui-même commence par cette commande (ex. « \\mathrm{d}t ») ;
- un symbole qui n'apparaît pas dans la formule est signalé (`missing`), de même que les lettres
  et lettres grecques restées sans définition (`uncovered`).
"""
import re

TOK = re.compile(r"\\[A-Za-z]+|\\.|\s+|.", re.S)
PROTECT = {r"\text", r"\mathrm", r"\operatorname", r"\textrm", r"\textit", r"\textbf", r"\mbox", r"\mathrm*"}
ACCENTS = {r"\hat", r"\bar", r"\vec", r"\dot", r"\ddot", r"\tilde", r"\overline", r"\widehat", r"\mathbf", r"\boldsymbol", r"\mathcal", r"\mathit"}
GREEK = {"alpha", "beta", "gamma", "delta", "epsilon", "varepsilon", "zeta", "eta", "theta", "vartheta", "iota", "kappa", "lambda",
         "mu", "nu", "xi", "pi", "rho", "varrho", "sigma", "tau", "upsilon", "phi", "varphi", "chi", "psi", "omega",
         "Gamma", "Delta", "Theta", "Lambda", "Xi", "Pi", "Sigma", "Upsilon", "Phi", "Psi", "Omega", "ell", "hbar", "partial", "nabla"}
# symboles mathématiques qui n'ont pas besoin de définition (opérateurs, constantes de notation)
NEUTRAL = {"pi", "partial", "nabla", "Delta"}   # Δ : « variation de », expliqué par le symbole qui suit


def tokens(tex):
    return [t for t in TOK.findall(tex)]


def _group_end(toks, i):
    """toks[i] == '{' : indice du '}' correspondant."""
    d = 0
    for j in range(i, len(toks)):
        if toks[j] == "{": d += 1
        elif toks[j] == "}":
            d -= 1
            if d == 0: return j
    return len(toks) - 1


def canon(toks):
    """Normalise : supprime les espaces, met entre accolades l'argument d'un seul jeton de _, ^ et des accents."""
    # les espaces ne comptent pas en mode mathématique, mais ils comptent dans \text{…} : on les y garde
    t, i, prot_end = [], 0, -1
    while i < len(toks):
        x = toks[i]
        if x in PROTECT and i + 1 < len(toks) and toks[i + 1] == "{":
            t.append(x); j = _group_end(toks, i + 1); t += toks[i + 1:j + 1]; i = j + 1; continue
        if not x.isspace(): t.append(x)
        i += 1
    # {\rm X} ≡ \mathrm{X} (même rendu) : on réécrit la forme à bascule
    u, i = [], 0
    while i < len(t):
        if t[i] == "{" and i + 1 < len(t) and t[i + 1] in (r"\rm", r"\textrm"):
            j = _group_end(t, i)
            u += ["{", r"\mathrm", "{"] + t[i + 2:j] + ["}", "}"]; i = j + 1; continue
        u.append(t[i]); i += 1
    t = u
    # passe 1 : \sqrt et \frac à arguments d'un seul jeton → accolades (sans sauter le contenu des groupes)
    ARG2 = {r"\frac", r"\dfrac", r"\tfrac", r"\binom"}
    wrap = set()
    for i, x in enumerate(t):
        if x == r"\sqrt" and i + 1 < len(t) and t[i + 1] not in ("{", "["):
            wrap.add(i + 1)
        elif x in ARG2 and i + 1 < len(t):
            a = i + 1
            if t[a] == "{": a = _group_end(t, a) + 1
            else: wrap.add(a); a += 1
            if a < len(t) and t[a] != "{": wrap.add(a)
    t = [y for k, x in enumerate(t) for y in (["{", x, "}"] if k in wrap else [x])]
    # passe 2 : indices, exposants et accents d'un seul jeton
    out, i = [], 0
    while i < len(t):
        x = t[i]; out.append(x)
        if (x in ("_", "^") or x in ACCENTS) and i + 1 < len(t) and t[i + 1] != "{":
            out += ["{", t[i + 1], "}"]; i += 2; continue
        i += 1
    return out


SWITCH = {r"\rm", r"\it", r"\bf", r"\sf", r"\tt"}


def _protected_mask(t):
    """True pour les jetons situés dans l'argument d'une commande de texte (\\text{…}, {\\rm …})."""
    mask = [False] * len(t)
    i = 0
    while i < len(t):
        if t[i] in SWITCH:                      # bascule de police : protège jusqu'à la fin du groupe courant
            d, j = 0, i + 1
            while j < len(t):
                if t[j] == "{": d += 1
                elif t[j] == "}":
                    if d == 0: break
                    d -= 1
                mask[j] = True; j += 1
            i = j; continue
        if t[i] in PROTECT and i + 1 < len(t) and t[i + 1] == "{":
            j = _group_end(t, i + 1)
            for k in range(i + 1, j + 1): mask[k] = True
            i = j + 1; continue
        i += 1
    return mask


def _k(x):
    """Clé de comparaison : \\text, \\textrm et \\mathrm s'équivalent."""
    return r"\mathrm" if x in (r"\text", r"\textrm") else x


def _balanced(seq):
    d = 0
    for x in seq:
        if x == "{": d += 1
        elif x == "}":
            d -= 1
            if d < 0: return False
    return d == 0


def annotate(tex, syms):
    """Retourne (tex_annoté, missing, uncovered). syms = liste de tuples (tex_symbole, …)."""
    t = canon(tokens(tex))
    mask = _protected_mask(t)
    used = [False] * len(t)
    wraps = []                                   # (début, fin exclue, k)
    order = sorted(range(len(syms)), key=lambda k: -len(canon(tokens(syms[k][0]))))
    missing = []
    for k in order:
        pat = canon(tokens(syms[k][0]))
        if not pat or not _balanced(pat):
            missing.append(syms[k][0]); continue
        starts_protected = pat[0] in PROTECT
        found = False
        i = 0
        while i + len(pat) <= len(t):
            if [_k(x) for x in t[i:i + len(pat)]] == [_k(x) for x in pat] and not any(used[i:i + len(pat)]) and (starts_protected or not mask[i]):
                if pat[-1] in ("_", "^"):
                    i += 1; continue
                wraps.append((i, i + len(pat), k))
                for j in range(i, i + len(pat)): used[j] = True
                found = True
                i += len(pat); continue
            i += 1
        if not found:
            missing.append(syms[k][0])
    # reconstruction
    starts = {a: (b, k) for a, b, k in wraps}
    out, i = [], 0
    while i < len(t):
        if i in starts:
            b, k = starts[i]
            out.append(r"\htmlData{sym=%d}{" % k + _join(t[i:b]) + "}")
            i = b; continue
        out.append(t[i]); i += 1
    # lettres et grecques non couvertes (hors arguments de texte, hors indices numériques)
    unc = []
    for i, x in enumerate(t):
        if used[i] or mask[i]: continue
        name = x[1:] if x.startswith("\\") else None
        nxt = t[i + 1] if i + 1 < len(t) else ""
        if x == r"\mu" and nxt in PROTECT: continue                      # préfixe d'unité : µHz, µPa, µs
        if x == "d" and (nxt[:1].isalpha() or (nxt.startswith("\\") and nxt[1:] in GREEK)): continue   # différentielle dt, dx, dτ
        if (len(x) == 1 and x.isalpha()) or (name and name in GREEK and name not in NEUTRAL):
            # une lettre en indice d'un symbole couvert est couverte ; « d » droit d'une dérivée aussi
            unc.append(x)
    return _join(out), missing, sorted(set(unc))


def _join(seq):
    s = ""
    for x in seq:
        if s and s[-1].isalpha() and x[:1].isalpha() and re.search(r"\\[A-Za-z]+$", s):
            s += " "                              # « \rho x » : ne pas coller une lettre à un nom de commande
        s += x
    return s
