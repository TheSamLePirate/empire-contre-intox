#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Génère rss.xml (flux RSS 2.0 riche) à partir des cartes de dossiers de index.html.
Chaque item : titre, lien, résumé, image (enclosure + media:content/thumbnail),
auteurs (dc:creator), catégories (tags + rubrique), date (1er commit git), contenu HTML riche.

Usage : python3 scripts/generate-rss.py   (depuis la racine du dépôt)
"""
import re, html, os, subprocess
from xml.sax.saxutils import escape
from datetime import datetime, timezone

BASE = "https://empire-contre-intox.com/"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_TITLE = "Empire contre Intox — Dossiers"
SITE_DESC = ("Archives publiques d'Empire contre Intox : dossiers scientifiques sur le temps "
             "profond, transcriptions structurées et esprit critique. Veritas omnia vincit.")
LICENSE_URL = "https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr"
LICENSE_LABEL = "CC BY-NC-ND 4.0"
FALLBACK_DATE = "2026-05-30T00:00:00+02:00"

MIME = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
        ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml"}


def strip_tags(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or "").strip())


def rfc822(iso):
    """ISO 8601 -> RFC 822 (format exigé par RSS)."""
    try:
        dt = datetime.fromisoformat(iso)
    except ValueError:
        dt = datetime.fromisoformat(FALLBACK_DATE)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")


def git_added(path):
    """Date du 1er commit ayant ajouté le fichier (ordering stable du flux)."""
    if not path or path.startswith("http"):
        return None
    p = path.split("#")[0]
    try:
        out = subprocess.run(
            ["git", "log", "--diff-filter=A", "--format=%aI", "--", p],
            cwd=ROOT, capture_output=True, text=True, timeout=10).stdout.strip()
        lines = [l for l in out.splitlines() if l.strip()]
        return lines[-1] if lines else None
    except Exception:
        return None


def parse_cards(src):
    cards = []
    for b in re.findall(r'<article class="dossier[^"]*"[^>]*>(.*?)</article>', src, re.S):
        img = re.search(r'<img src="([^"]+)" alt="([^"]*)"', b)
        no = re.search(r'class="dossier-no">([^<]+)<', b)
        badge = re.search(r'class="badge">([^<]+)<', b)
        title = re.search(r'<h3>(.*?)</h3>', b, re.S)
        desc = re.search(r'<div class="dossier-body">.*?<p>(.*?)</p>', b, re.S)
        tags = [strip_tags(t) for t in re.findall(r'class="tag">(.*?)<\/span>', b, re.S)]
        who = re.search(r'class="who">.*?<strong>(.*?)</strong>(?:\s*<span class="note">(.*?)</span>)?', b, re.S)
        link = re.search(r'class="dossier-link" href="([^"]+)"', b)
        if not (title and link):
            continue
        author = strip_tags(who.group(1)) if who else "Empire contre Intox"
        note = strip_tags(who.group(2)) if (who and who.group(2)) else ""
        cards.append({
            "no": strip_tags(no.group(1)) if no else "",
            "title": strip_tags(title.group(1)),
            "link": link.group(1),
            "img": img.group(1) if img else "",
            "alt": strip_tags(img.group(2)) if img else "",
            "badge": strip_tags(badge.group(1)) if badge else "",
            "desc": strip_tags(desc.group(1)) if desc else "",
            "tags": tags,
            "author": author,
            "note": note,
        })
    return cards


def absolute(url):
    return url if url.startswith("http") else BASE + url.lstrip("./")


def filesize(rel):
    if rel.startswith("http"):
        return None
    p = os.path.join(ROOT, rel.split("#")[0])
    return os.path.getsize(p) if os.path.exists(p) else None


def build_item(c):
    link = absolute(c["link"])
    img = absolute(c["img"]) if c["img"] else ""
    ext = os.path.splitext(c["img"])[1].lower()
    mime = MIME.get(ext, "image/png")
    size = filesize(c["img"])
    iso = git_added(c["link"]) or FALLBACK_DATE
    pub = rfc822(iso)

    full_author = c["author"] + (f" ({c['note']})" if c["note"] else "")
    title = (f"{c['no']} — {c['title']}" if c["no"] else c["title"])

    cats = "".join(f"\n      <category>{escape(t)}</category>" for t in (c["tags"] + ([c["badge"]] if c["badge"] else [])))

    # contenu HTML riche (CDATA)
    rich = []
    if img:
        rich.append(f'<p><img src="{img}" alt="{escape(c["alt"])}" '
                    f'style="max-width:100%;height:auto;border-radius:4px" /></p>')
    if c["badge"]:
        rich.append(f'<p><strong>{escape(c["badge"])}</strong></p>')
    rich.append(f'<p>{escape(c["desc"])}</p>')
    rich.append(f'<p><em>Réalisé par {escape(full_author)}.</em></p>')
    if c["tags"]:
        rich.append('<p>' + " · ".join(escape(t) for t in c["tags"]) + '</p>')
    rich.append(f'<p><a href="{link}">Consulter le dossier →</a></p>')
    rich.append(f'<p><small>Licence de contenu : <a href="{LICENSE_URL}">{LICENSE_LABEL}</a> — partage autorisé avec attribution, sans usage commercial ni modification.</small></p>')
    content = "".join(rich)

    media = ""
    if img:
        ml = f' fileSize="{size}"' if size else ""
        media = (f'\n      <media:content url="{img}" medium="image" type="{mime}"{ml} />'
                 f'\n      <media:thumbnail url="{img}" />')
    enclosure = f'\n      <enclosure url="{img}" type="{mime}" length="{size or 0}" />' if img else ""

    return f"""    <item>
      <title>{escape(title)}</title>
      <link>{link}</link>
      <guid isPermaLink="true">{link}</guid>
      <pubDate>{pub}</pubDate>
      <dc:creator>{escape(full_author)}</dc:creator>{cats}
      <description>{escape(c["desc"])}</description>
      <content:encoded><![CDATA[{content}]]></content:encoded>{enclosure}{media}
    </item>"""


def main():
    src = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    cards = parse_cards(src)
    # plus récent d'abord (convention RSS)
    items = []
    for c in cards:
        iso = git_added(c["link"]) or FALLBACK_DATE
        items.append((iso, build_item(c)))
    items.sort(key=lambda x: x[0], reverse=True)
    body = "\n".join(it for _, it in items)

    now = rfc822(max((i for i, _ in items), default=FALLBACK_DATE))
    logo = BASE + "ymir-lalie/assets/logo-eci.jpg"
    feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:creativeCommons="http://backend.userland.com/creativeCommonsRssModule">
  <channel>
    <title>{escape(SITE_TITLE)}</title>
    <link>{BASE}</link>
    <atom:link href="{BASE}rss.xml" rel="self" type="application/rss+xml" />
    <description>{escape(SITE_DESC)}</description>
    <language>fr-FR</language>
    <copyright>{escape('Empire contre Intox — contenu sous licence ' + LICENSE_LABEL)}</copyright>
    <creativeCommons:license>{LICENSE_URL}</creativeCommons:license>
    <lastBuildDate>{now}</lastBuildDate>
    <generator>generate-rss.py</generator>
    <image>
      <url>{logo}</url>
      <title>{escape(SITE_TITLE)}</title>
      <link>{BASE}</link>
    </image>
{body}
  </channel>
</rss>
"""
    out = os.path.join(ROOT, "rss.xml")
    open(out, "w", encoding="utf-8").write(feed)
    print(f"rss.xml généré : {len(cards)} items -> {out}")


if __name__ == "__main__":
    main()
