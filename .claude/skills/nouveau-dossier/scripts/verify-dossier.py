#!/usr/bin/env python3
"""
verify-dossier.py — TOUS les contrôles de fin de dossier en UNE commande.

Regroupe ce que la checklist de SKILL.md demandait en six ou sept commandes
séparées : verbatim, formules, structure de page, liens locaux, ancres, JS,
index (numérotation + compteurs), manifeste public, RSS, empreintes de cache,
appareil critique. Sort un rapport unique PASS / WARN / FAIL et un code retour
(0 si aucun FAIL). À lancer DEPUIS LA RACINE du dépôt.

Usage :
    python3 .claude/skills/nouveau-dossier/scripts/verify-dossier.py \
        <equipe>/<dossier>/index.html [transcript1.txt ...] [options]

Options :
    --no-build    ne pas lancer `npx tsx scripts/prepare-legacy.ts` (~20 s)
    --no-katex    ne pas rendre les formules avec katex (npm requis)
    --no-verbatim dossier SANS transcription (le dire dans le récap)

Ce que le script NE fait PAS (à faire en navigateur, étape 9 de la skill) :
balayage de largeurs 360 → 3840 px, révélation des sections hautes, erreurs
console à l'exécution, jugement visuel des images.
"""
import html
import json
import os
import re
import subprocess
import sys
import tempfile
import xml.dom.minidom
from html.parser import HTMLParser

ROOT = os.getcwd()
HERE = os.path.dirname(os.path.abspath(__file__))
REPORT = []          # (level, section, message)
FORBIDDEN_EXT = {".doc", ".docx", ".odt", ".pptx", ".txt"}

def rep(level, section, msg):
    REPORT.append((level, section, msg))

def roman_to_int(s):
    vals = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100}
    total, prev = 0, 0
    for ch in reversed(s):
        v = vals[ch]
        total = total - v if v < prev else total + v
        prev = max(prev, v)
    return total

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)

# ----------------------------------------------------------------- arguments
args = [a for a in sys.argv[1:] if not a.startswith("--")]
flags = {a for a in sys.argv[1:] if a.startswith("--")}
if not args or not os.path.isfile(args[0]):
    print(__doc__); sys.exit(2)
page = os.path.normpath(args[0])
transcripts = [a for a in args[1:] if os.path.isfile(a)]
page_dir = os.path.dirname(page)
page_src = read(page)
rel_dir = page_dir.replace(os.sep, "/")           # ex. ymir-lalie/rome
rel_page = page.replace(os.sep, "/")              # ex. ymir-lalie/rome/index.html
# formes sous lesquelles l'index / le RSS / les sources peuvent pointer la page
page_forms = {rel_page, rel_dir + "/"} if os.path.basename(page) == "index.html" else {rel_page}

# --------------------------------------------------------------- 1. verbatim
if "--no-verbatim" in flags:
    rep("WARN", "verbatim", "dossier déclaré sans transcription : check-coverage.py non appliqué — le dire dans le récapitulatif")
elif not transcripts:
    rep("FAIL", "verbatim", "aucun transcript fourni (passer les .txt en argument, ou --no-verbatim pour un dossier sans transcription)")
else:
    r = run([sys.executable, os.path.join(HERE, "check-coverage.py"), page] + transcripts)
    m = re.search(r"TOTAL manquants : (\d+)", r.stdout)
    missing = int(m.group(1)) if m else -1
    n_coq = sum(int(x) for x in re.findall(r"\.md : (\d+) correction", r.stdout))
    stale = re.findall(r"entrée introuvable dans le transcript[^\n]*", r.stdout)
    if r.returncode == 0 and missing == 0:
        rep("PASS", "verbatim", f"{len(transcripts)} transcript(s), 0 segment manquant" + (f" ({n_coq} correction(s) appliquée(s) depuis coquilles.md / grammalecte.md)" if n_coq else ""))
    else:
        tail = "\n".join(r.stdout.strip().splitlines()[-12:])
        rep("FAIL", "verbatim", f"{missing} segment(s) manquant(s) — verbatim à réintroduire, ou coquille corrigée à consigner dans {rel_dir}/coquilles.md\n{tail}")
    for st in stale:
        rep("WARN", "verbatim", "coquilles.md : " + st)
def trace_pairs(path, header_words):
    """Lignes (avant, après) des tables dont l'en-tête contient tous les mots donnés."""
    pairs, active = [], False
    lines = read(path).splitlines()
    for i, line in enumerate(lines):
        if not line.strip().startswith("|"):
            active = False; continue
        cells = [c.strip().strip("`").strip() for c in line.strip().strip("|").split("|")]
        nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
        if re.match(r"^\|\s*:?-{2,}", nxt):
            low = " ".join(cells).lower()
            active = all(w in low for w in header_words); continue
        if not active or len(cells) < 2 or set(cells[0]) <= set("-: "):
            continue
        if cells[0].isdigit():
            cells = cells[1:]
        if len(cells) >= 2 and cells[0]:
            pairs.append((cells[0], cells[1]))
    return pairs
page_text_raw = re.sub(r"<[^>]+>", " ", page_src)
for name in ("coquilles.md", "grammalecte.md"):
    tp = os.path.join(page_dir, name)
    if not os.path.isfile(tp):
        continue
    rep("PASS", "verbatim", f"{name} présent")
    prs = trace_pairs(tp, ("transcript", "page"))
    if name == "grammalecte.md":
        prs += trace_pairs(tp, ("avant", "après"))
    for avant, apres in prs:
        if avant in page_text_raw or avant in page_src:
            rep("FAIL", "verbatim", f"{name} : la page contient encore « {avant[:60]} » consigné comme corrigé")
# la page ne commente jamais une coquille : la trace est coquilles.md
page_text = re.sub(r"<(script|style).*?</\1>", " ", page_src, flags=re.S)
page_text = re.sub(r"<[^>]+>", " ", page_text)
if re.search(r"coquilles?\b[^.]{0,60}\b(déroulé|live|transcript|conservée|corrigée|typo)|(déroulé|live|transcript)[^.]{0,60}\bcoquilles?\b", page_text, re.I):
    rep("WARN", "verbatim", "la page commente une coquille du déroulé — une correction de coquille ne se dit pas dans la page (trace : coquilles.md)")

# --------------------------------------------------------------- 2. formules
n_fb = page_src.count('class="formula-block"')
n_say = page_src.count('class="fb-say"')
texs = [html.unescape(t) for t in re.findall(r'data-tex="([^"]*)"', page_src)]
if n_fb == 0 and not texs:
    rep("PASS", "formules", "aucune formule dans la page")
else:
    if n_fb == n_say:
        rep("PASS", "formules", f"{n_fb} formula-block, {n_say} fb-say (compte juste)")
    else:
        rep("FAIL", "formules", f"{n_fb} formula-block mais {n_say} fb-say — chaque bloc doit porter sa ligne « Se lit »")
    unbalanced = [t for t in texs if t.count("{") != t.count("}")]
    if unbalanced:
        rep("FAIL", "formules", f"{len(unbalanced)} expression(s) aux accolades déséquilibrées : " + " | ".join(unbalanced[:3]))
    else:
        rep("PASS", "formules", f"{len(texs)} expressions data-tex, accolades équilibrées")
    # caractères combinants (macron, etc.) laissés en Unicode dans une glose
    comb = re.findall(r'[A-Za-z][̀-ͯ]', page_src)
    if comb:
        rep("WARN", "formules", f"{len(comb)} caractère(s) combinant(s) en Unicode (ex. {comb[0]!r}) — les rendre en KaTeX (\\bar{{T}})")
    if texs and "--no-katex" not in flags:
        kx = os.path.join(tempfile.gettempdir(), "eci-katex")
        os.makedirs(kx, exist_ok=True)
        if not os.path.isdir(os.path.join(kx, "node_modules", "katex")):
            run(["npm", "i", "katex@0.16.11", "--no-save", "--silent", "--prefix", kx], cwd=kx)
        js = r'''
const fs=require("fs"),katex=require(process.argv[2]);
const s=fs.readFileSync(process.argv[1],"utf8");
const dec=t=>t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace(/&#39;/g,"'");
let n=0,bad=[];for(const m of s.matchAll(/data-tex="([^"]*)"/g)){n++;try{katex.renderToString(dec(m[1]),{throwOnError:true});}catch(e){bad.push(m[1]);}}
console.log(JSON.stringify({n,bad}));'''
        r = run(["node", "-e", js, "--", os.path.abspath(page), os.path.join(kx, "node_modules", "katex")])
        try:
            res = json.loads(r.stdout.strip().splitlines()[-1])
            if res["bad"]:
                rep("FAIL", "formules", f"KaTeX : {len(res['bad'])} échec(s) de rendu : " + " | ".join(res["bad"][:3]))
            else:
                rep("PASS", "formules", f"KaTeX : {res['n']} expressions rendues sans erreur")
        except Exception:
            rep("WARN", "formules", "rendu KaTeX non exécuté (npm/node indisponible ?) : " + (r.stderr.strip()[-200:] or "sans détail"))

# -------------------------------------------------------- 3. structure page
def has(pattern, flags_=0):
    return re.search(pattern, page_src, flags_) is not None

checks = [
    (r'<html[^>]*\blang="fr', "attribut lang=\"fr\" sur <html>"),
    (r'<title>[^<]{3,}', "balise <title> remplie"),
    (r'<link[^>]*rel="license"[^>]*creativecommons\.org/licenses/by-nc-nd/4\.0', "<link rel=\"license\"> CC BY-NC-ND 4.0"),
    (r'<meta[^>]*name="rights"', "<meta name=\"rights\">"),
    (r'class="[^"]*\beci-license\b', "cartouche .eci-license"),
    (r'LICENCE-CONTENU\.md', "lien relatif vers LICENCE-CONTENU.md"),
    (r'data-visit-counter', "compteur de visites [data-visit-counter]"),
    (r'visit-counter\.js', "script visit-counter.js"),
    (r'logo-eci\.jpg', "sceau ECI (logo-eci.jpg)"),
    (r'Veritas omnia vincit', "devise « Veritas omnia vincit »"),
]
for pat, label in checks:
    rep("PASS" if has(pat) else "FAIL", "page", label)
if has(r'Page HTML autonome cr'):
    rep("FAIL", "page", "mention technique obsolète « Page HTML autonome créée… » encore présente")
# bloc grands écrans : présent, et dernier <style> avant </head>
head_end = page_src.find("</head>")
head = page_src[:head_end] if head_end > 0 else page_src
styles = [m.start() for m in re.finditer(r"<style\b", head)]
wide = head.find('<style id="eci-wide-style">')
if wide < 0:
    rep("FAIL", "page", "bloc <style id=\"eci-wide-style\"> absent (largeurs d'écran, design-system §9)")
elif styles and styles[-1] != wide:
    rep("FAIL", "page", "eci-wide-style n'est pas le DERNIER <style> du <head> : il perd la cascade")
else:
    rep("PASS", "page", "eci-wide-style présent, dernier <style> du <head>")
if not (has(r"Cinzel") and has(r"Fraunces")):
    rep("WARN", "page", "Cinzel/Fraunces absentes : voie B (identité invitée) ? sinon, retomber sur le codex")
for bad_font in ("Inter", "Roboto", "Space Grotesk"):
    if re.search(r'family=' + bad_font.replace(" ", r"\+"), page_src):
        rep("FAIL", "page", f"police interdite chargée : {bad_font}")
# marqueurs d'autonomie : pas de CDN autre que Google Fonts / KaTeX
cdns = set(re.findall(r'(?:src|href)="(https?://[^/"]+)', page_src))
allowed = {"https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net", "https://creativecommons.org", "https://empire-contre-intox.com", "https://thesamlepirate.github.io"}
ext = sorted(c for c in cdns if c not in allowed)
if ext:
    rep("WARN", "page", "hôtes externes référencés (vérifier que c'est voulu) : " + ", ".join(ext[:6]))

# ------------------------------------------------------ 4. liens et ancres
ids = set(re.findall(r'\bid="([^"]+)"', page_src))
missing_anchor, missing_file = [], []
for attr, val in re.findall(r'\b(src|href|poster|data-src)="([^"]+)"', page_src):
    v = html.unescape(val).strip()
    if not v or v.startswith(("http://", "https://", "mailto:", "tel:", "data:", "javascript:", "//")) or "${" in v:
        continue  # gabarits JS `${…}` : chemins construits à l'exécution, non vérifiables ici
    if v.startswith("#"):
        if v[1:] and v[1:] not in ids:
            missing_anchor.append(v)
        continue
    path = v.split("#")[0].split("?")[0]
    if not path:
        continue
    target = os.path.normpath(os.path.join(page_dir, path))
    if path.endswith("/"):
        target = os.path.join(target, "index.html")
    if not os.path.exists(target):
        missing_file.append(v)
# chemins dans le CSS (--hero: url(...), background url(...))
for u in re.findall(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', page_src):
    if u.startswith(("http", "data:", "#", "%23")) or "${" in u:
        continue
    target = os.path.normpath(os.path.join(page_dir, u.split("?")[0]))
    if not os.path.exists(target):
        missing_file.append("url(" + u + ")")
missing_anchor = sorted(set(missing_anchor)); missing_file = sorted(set(missing_file))
rep("PASS" if not missing_anchor else "FAIL", "liens", "ancres internes : " + ("toutes résolues" if not missing_anchor else f"{len(missing_anchor)} sans id : " + ", ".join(missing_anchor[:8])))
rep("PASS" if not missing_file else "FAIL", "liens", "fichiers locaux : " + ("tous présents" if not missing_file else f"{len(missing_file)} introuvable(s) : " + ", ".join(missing_file[:8])))
if not has(r'href="(\.\./)+index\.html"'):
    rep("FAIL", "liens", "pas de lien de retour vers l'index (../index.html)")

# ------------------------------------------------------------- 5. balisage
class Bal(HTMLParser):
    TRACK = {"main", "section", "article", "aside", "header", "footer", "nav", "figure", "div"}
    def __init__(self):
        super().__init__(); self.open = {t: 0 for t in self.TRACK}; self.close = {t: 0 for t in self.TRACK}
    def handle_starttag(self, tag, attrs):
        if tag in self.TRACK: self.open[tag] += 1
    def handle_endtag(self, tag):
        if tag in self.TRACK: self.close[tag] += 1
b = Bal(); b.feed(page_src)
unb = [f"{t} ({b.open[t]} ouvertes / {b.close[t]} fermées)" for t in sorted(Bal.TRACK) if b.open[t] != b.close[t]]
rep("PASS" if not unb else "FAIL", "balisage", "balises de structure équilibrées" if not unb else "déséquilibre : " + ", ".join(unb))
if b.open["main"] > 2:
    rep("WARN", "balisage", f"{b.open['main']} <main> (attendu : 1, ou 2 avec le <footer><main>)")

# ------------------------------------------------------- 6. scripts inline
scripts = re.findall(r'<script\b([^>]*)>(.*?)</script>', page_src, re.S)
bad_js = 0
with tempfile.TemporaryDirectory() as td:
    for i, (attrs, body) in enumerate(scripts):
        if 'src=' in attrs or not body.strip():
            continue
        typ = re.search(r'type="([^"]+)"', attrs)
        if typ and typ.group(1) not in ("text/javascript", "module", "application/javascript"):
            continue
        ext_ = ".mjs" if typ and typ.group(1) == "module" else ".js"
        fp = os.path.join(td, f"s{i}{ext_}")
        with open(fp, "w", encoding="utf-8") as f:
            f.write(body)
        r = run(["node", "--check", fp])
        if r.returncode != 0:
            bad_js += 1
            rep("FAIL", "javascript", f"script inline #{i} : " + r.stderr.strip().splitlines()[-1][:200])
if not bad_js:
    rep("PASS", "javascript", f"{len([s for s in scripts if 'src=' not in s[0] and s[1].strip()])} script(s) inline analysés par node --check")

# ---------------------------------------------------------------- 7. index
idx = read("index.html")
card = None
for m in re.finditer(r'<article class="dossier[^"]*"[^>]*>(.*?)</article>', idx, re.S):
    if any(f'href="{f}"' for f in page_forms if f'href="{f}"' in m.group(1)):
        card = m.group(1); break
if not card:
    rep("FAIL", "index", "aucune carte de l'index ne pointe vers la page (" + " ou ".join(sorted(page_forms)) + ")")
else:
    mn = re.search(r'Dossier ([IVXLC]+)', card)
    pn = re.search(r'Dossier ([IVXLC]+)', page_src)
    if mn and pn and mn.group(1) == pn.group(1):
        rep("PASS", "index", f"carte présente, numéro cohérent index ↔ page : Dossier {mn.group(1)}")
    else:
        rep("FAIL", "index", f"numéro : carte = {mn.group(1) if mn else '?'} / page = {pn.group(1) if pn else '?'}")
    img = re.search(r'<img src="([^"]+)"', card)
    if img and not os.path.exists(img.group(1)):
        rep("FAIL", "index", f"image de carte introuvable : {img.group(1)}")
    if "Réalisé par" not in card:
        rep("FAIL", "index", "byline « Réalisé par » absente de la carte")
    n_tags = len(re.findall(r'class="tag"', card))
    if n_tags != 3:
        rep("WARN", "index", f"{n_tags} tags sur la carte (convention : 3)")
nums = [roman_to_int(r) for r in re.findall(r'class="dossier-no">Dossier ([IVXLC]+)', idx)]
n_max = max(nums) if nums else 0
dups = sorted({n for n in nums if nums.count(n) > 1})
gaps = sorted(set(range(1, n_max + 1)) - set(nums))
if dups or gaps:
    rep("FAIL", "index", f"numérotation des cartes : doublons {dups or '—'}, trous {gaps or '—'}")
else:
    rep("PASS", "index", f"{n_max} cartes numérotées I → {n_max}, sans trou ni doublon")
hero = re.search(r'<b>([IVXLC]+)</b> dossiers', idx)
if hero and roman_to_int(hero.group(1)) == n_max:
    rep("PASS", "index", f"compteur du hero = {hero.group(1)}")
else:
    rep("FAIL", "index", f"compteur du hero ({hero.group(1) if hero else '?'}) ≠ dernier numéro ({n_max})")
# « Les Sources » doit rester le dernier numéro
last_card = re.findall(r'<article class="dossier[^"]*"[^>]*>(.*?)</article>', idx, re.S)
src_card = [c for c in last_card if 'sources/sources.html' in c]
if src_card:
    sn = re.search(r'Dossier ([IVXLC]+)', src_card[0])
    if sn and roman_to_int(sn.group(1)) == n_max:
        rep("PASS", "index", "« Les Sources » porte bien le dernier numéro")
    else:
        rep("FAIL", "index", f"« Les Sources » = {sn.group(1) if sn else '?'}, attendu {n_max}")
    ssrc = read("sources/sources.html")
    se = re.search(r'Dossier ([IVXLC]+)', ssrc)
    if se and roman_to_int(se.group(1)) != n_max:
        rep("FAIL", "index", f"eyebrow de sources/sources.html = {se.group(1)}, attendu {n_max}")
gsum = sum(int(x) for x in re.findall(r'class="group-count">(\d+) dossiers?', idx))
if gsum and gsum != n_max:
    rep("WARN", "index", f"somme des group-count des parcours = {gsum}, cartes numérotées = {n_max} (incrémenter le parcours du dossier ?)")
elif gsum:
    rep("PASS", "index", f"somme des group-count = {gsum}")

# ------------------------------------------------------------ 8. manifeste
mp = "config/legacy-public-manifest.json"
manifest = set(json.load(open(mp, encoding="utf-8")))
cfg = json.load(open("config/legacy-public.json", encoding="utf-8"))
bad_ext, bad_seg = set(cfg.get("forbiddenExtensions", FORBIDDEN_EXT)), set(cfg.get("forbiddenSegments", []))
absent = []
for root_, dirs, files in os.walk(page_dir):
    dirs[:] = [d for d in dirs if d not in bad_seg and not d.startswith(".")]
    for f in files:
        if f.startswith(".") or os.path.splitext(f)[1].lower() in bad_ext:
            continue
        r_ = os.path.join(root_, f).replace(os.sep, "/")
        if f in ("coquilles.md", "grammalecte.md"):
            continue  # traces internes, versionnées mais non publiées
        if r_ not in manifest:
            absent.append(r_)
if card:
    img = re.search(r'<img src="([^"]+)"', card)
    if img and img.group(1) not in manifest:
        absent.append(img.group(1) + "  (image de carte → build cassé)")
    if img:
        full = re.sub(r'\.index\.webp$', '', img.group(1))
        cands = [full + e for e in (".png", ".jpg", ".jpeg", ".webp") if (full + e) in manifest]
        if not cands and img.group(1).endswith(".index.webp"):
            rep("WARN", "manifeste", f"image pleine taille du hero ({full}.png/.jpg) absente du manifeste → pas d'og:image")
referenced = set()
for attr, val in re.findall(r'\b(src|href|poster|data-src)="([^"]+)"', page_src):
    v = html.unescape(val).strip().split("#")[0].split("?")[0]
    if v and not v.startswith(("http", "mailto:", "tel:", "data:", "javascript:", "//", "#")) and "${" not in v:
        referenced.add(os.path.normpath(os.path.join(page_dir, v)).replace(os.sep, "/"))
for u in re.findall(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', page_src):
    if not u.startswith(("http", "data:", "#", "%23")) and "${" not in u:
        referenced.add(os.path.normpath(os.path.join(page_dir, u.split("?")[0])).replace(os.sep, "/"))
must = [a for a in absent if a.split("  ")[0] in referenced or "(image de carte" in a]
other = [a for a in absent if a not in must]
if rel_page not in manifest:
    must.insert(0, rel_page + "  (la page elle-même)")
rep("PASS" if not must else "FAIL", "manifeste", "la page et tout ce qu'elle référence sont déclarés" if not must else f"{len(must)} fichier(s) référencé(s) mais non déclaré(s) : " + ", ".join(must[:8]))
if other:
    rep("WARN", "manifeste", f"{len(other)} fichier(s) du dossier non déclaré(s), donc non publié(s) — voulu ? : " + ", ".join(other[:8]))
if "--no-build" not in flags:
    r = run(["npx", "--yes", "tsx", "scripts/prepare-legacy.ts"])
    ok = r.returncode == 0
    prepared = re.search(r'Prepared \d+ allowlisted[^\n]*', r.stdout + r.stderr)
    if ok:
        rep("PASS", "manifeste", "prepare-legacy.ts passe : " + (prepared.group(0) if prepared else "ok"))
    else:
        rep("FAIL", "manifeste", "prepare-legacy.ts ÉCHOUE : " + (r.stderr.strip().splitlines()[-1] if r.stderr.strip() else r.stdout.strip()[-200:]))
    if ok:
        outp = os.path.join(".legacy-public", rel_page)
        if os.path.exists(outp):
            og = re.search(r'og:image" content="([^"]*)"', read(outp))
            rep("PASS" if og and og.group(1) else "WARN", "manifeste", "og:image câblée : " + (og.group(1) if og else "absente"))
    subprocess.run(["rm", "-rf", ".legacy-public"])

# ------------------------------------------------------------------ 9. RSS
try:
    dom = xml.dom.minidom.parse("rss.xml")
    links = [n.firstChild.data for n in dom.getElementsByTagName("link") if n.parentNode.tagName == "item" and n.firstChild]
    hit = [l for l in links if any(l.endswith("/" + f) for f in page_forms)]
    rep("PASS" if hit else "FAIL", "rss", f"rss.xml bien formé, {len(links)} items" + (", le dossier y est" if hit else " — le dossier N'Y EST PAS : python3 scripts/generate-rss.py"))
except Exception as e:
    rep("FAIL", "rss", f"rss.xml mal formé : {e}")

# ----------------------------------------------------------- 10. empreintes
r = run([sys.executable, "scripts/stamp-assets.py", "--check"])
rep("PASS" if r.returncode == 0 else "FAIL", "cache", "empreintes ?v= à jour" if r.returncode == 0 else "empreintes périmées → python3 scripts/stamp-assets.py, puis committer les pages avec la ressource")

# -------------------------------------------------------------- 11. sources
ssrc = read("sources/sources.html")
if any(("../" + f) in ssrc for f in page_forms) or ("../" + rel_dir + "/") in ssrc:
    rep("PASS", "sources", "sources.html référence le dossier")
else:
    rep("FAIL", "sources", "sources.html ne référence pas le dossier (section + fiches + compteurs, sources-and-index.md §C)")
slug = os.path.basename(rel_dir) if os.path.basename(page) == "index.html" else os.path.splitext(os.path.basename(page))[0]
audits = [f for f in os.listdir("sources") if f.startswith("dossier-") and slug.split("-")[0] in f]
rep("PASS" if audits else "WARN", "sources", ("audit trouvé : " + ", ".join(audits)) if audits else f"aucun sources/dossier-*{slug.split('-')[0]}*.md — l'audit par dossier manque ?")
if slug not in read("sources/README.md"):
    rep("WARN", "sources", "sources/README.md ne mentionne pas le dossier")

# ----------------------------------------------------------- 12. grammalecte
gm = os.path.join(page_dir, "grammalecte.md")
if os.path.isfile(gm):
    b = re.search(r"Bilan\s*:\s*([^\n]+)", read(gm))
    rep("PASS", "grammalecte", "passe consignée — " + (b.group(1)[:140] if b else "sans ligne « Bilan »"))
else:
    rep("WARN", "grammalecte", "aucun grammalecte.md : lancer grammalecte-check.py puis l'agent tri-grammalecte (skill, « Orthographe & grammaire »)")

# --------------------------------------------------------------- rapport
order = {"FAIL": 0, "WARN": 1, "PASS": 2}
counts = {k: sum(1 for l, _, _ in REPORT if l == k) for k in order}
print(f"\n=== verify-dossier · {rel_page} ===\n")
cur = None
for level, section, msg in REPORT:
    if section != cur:
        print(f"[{section}]"); cur = section
    mark = {"PASS": "✅", "WARN": "⚠️ ", "FAIL": "❌"}[level]
    first, *rest = msg.split("\n")
    print(f"  {mark} {first}")
    for line in rest:
        print("     " + line)
print(f"\nBILAN : {counts['PASS']} PASS · {counts['WARN']} WARN · {counts['FAIL']} FAIL")
print("Reste à faire en navigateur : balayage 360 → 3840 px, révélation, console, images (skill étape 9).")
sys.exit(1 if counts["FAIL"] else 0)
