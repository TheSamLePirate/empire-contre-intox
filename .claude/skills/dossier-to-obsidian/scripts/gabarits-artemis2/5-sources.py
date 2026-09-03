#!/usr/bin/env python3
"""Dossier III « Artemis II » → note Sources, EXTRAITE de sources/sources.html.

Extrait `const ARTEMIS = [...]` (fiches) et le groupe REFS
« Science lunaire (Artemis II) », plus le bilan de sources/dossier-III-artemis2.md.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

REPO = Path("/Users/olivierveinand/Documents/DEV/empire-contre-intox")
SOURCES_HTML = REPO / "sources/sources.html"
AUDIT = REPO / "sources/dossier-III-artemis2.md"
REFS_MD = REPO / "sources/refs-doi-5-lune-artemis.md"
OUT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/Dossier III — Artemis II")

SITE = "https://empire-contre-intox.com"
PAGE = f"{SITE}/provoxys/Artemis2.html"
SOURCES_PAGE = f"{SITE}/sources/sources.html#artemis"
MOC = "Dossier III — Artemis II, l'Odyssée Lunaire"
NOTE = "Sources — la vérification d'Artemis II"
TDB = "Tableau de bord — Artemis II"
IMPORTE = "2026-08-26"

VERDICT = {
    "ok": ("[!success]", "✅", "Confirmé"),
    "warn": ("[!warning]", "⚠️", "À nuancer"),
    "fresh": ("[!warning]", "⚠️", "Nuance appliquée"),
    "deb": ("[!help]", "🔶", "Débattu"),
    "err": ("[!failure]", "❌", "Erroné — corrigé"),
}


def js_array(src: str, name: str) -> list[dict]:
    """Extrait `const NAME = [ … ];` et l'évalue en JSON via node."""
    m = re.search(r"const\s+" + name + r"\s*=\s*(\[.*?\n    \]);", src, re.S)
    if not m:
        raise SystemExit(f"tableau {name} introuvable")
    js = m.group(1)
    out = subprocess.run(
        ["node", "-e", f"const HER=new Proxy({{}},{{get:(_,k)=>String(k)}});"
                       f"const EL='',SO='';console.log(JSON.stringify({js}))"],
        capture_output=True, text=True, cwd=REPO,
    )
    if out.returncode:
        raise SystemExit(out.stderr[:500])
    return json.loads(out.stdout)


def refs_group(src: str, label: str) -> list[dict]:
    m = re.search(
        r'\{\s*g:"' + re.escape(label) + r'",\s*items:\s*(\[.*?\n      \])\s*\}',
        src, re.S,
    )
    if not m:
        raise SystemExit(f"groupe REFS « {label} » introuvable")
    out = subprocess.run(
        ["node", "-e", f"console.log(JSON.stringify({m.group(1)}))"],
        capture_output=True, text=True,
    )
    if out.returncode:
        raise SystemExit(out.stderr[:500])
    return json.loads(out.stdout)


def audit_bilan() -> tuple[int, dict[str, int]]:
    """Compte les verdicts du fichier d'audit."""
    if not AUDIT.exists():
        return 0, {}
    t = AUDIT.read_text(encoding="utf-8")
    entries = re.findall(r"^\*\*Verdict :\*\*\s*(.+)$", t, re.M)
    counts: dict[str, int] = {}
    for e in entries:
        for sym in ("✅", "⚠️", "🔶", "❌"):
            if sym in e:
                counts[sym] = counts.get(sym, 0) + 1
                break
    n_claims = len(re.findall(r"^## \d+\.", t, re.M))
    return n_claims, counts


def audit_sections() -> dict[str, list[str]]:
    """Récupère les listes à puces de la « ## Synthèse » de l'audit, par intertitre."""
    if not AUDIT.exists():
        return {}
    t = AUDIT.read_text(encoding="utf-8")
    syn = t.split("## Synthèse", 1)[-1]
    out: dict[str, list[str]] = {}
    cur = None
    for line in syn.splitlines():
        if line.startswith("**") and line.rstrip().endswith(("**", ":", "**\n")) and not line.startswith("- "):
            cur = line.strip().strip("*").rstrip(" :")
            out.setdefault(cur, [])
        elif line.startswith("- ") and cur:
            out[cur].append(line[2:].strip())
    return out


def claims_by_verdict() -> list[tuple[str, str, str]]:
    """(titre, verdict, référence courte) pour chaque affirmation numérotée."""
    if not AUDIT.exists():
        return []
    t = AUDIT.read_text(encoding="utf-8")
    blocks = re.split(r"^## (?=\d+\.)", t, flags=re.M)[1:]
    rows = []
    for b in blocks:
        title = b.splitlines()[0].strip()
        vm = re.search(r"^\*\*Verdict :\*\*\s*(.+)$", b, re.M)
        verdict = vm.group(1).strip() if vm else ""
        sym = next((s for s in ("✅", "⚠️", "🔶", "❌") if s in verdict), "")
        rows.append((re.sub(r"^\d+\.\s*", "", title), sym, verdict))
    return rows


def main() -> None:
    src = SOURCES_HTML.read_text(encoding="utf-8")
    fiches = js_array(src, "ARTEMIS")
    refs = refs_group(src, "Science lunaire (Artemis II)")
    n_claims, counts = audit_bilan()

    bilan = " · ".join(f"{sym} **{n}**" for sym, n in sorted(counts.items(), key=lambda x: "✅⚠️🔶❌".index(x[0])))

    body = [
        "---",
        'aliases: ["Sources Artemis", "Vérification d\'Artemis II", "Sources III"]',
        "projet: Empire contre Intox",
        "dossier: Dossier III",
        "numero: 3",
        "type: appareil",
        "auteurs: [Provoxys, Samlepirate]",
        f"source: {PAGE}",
        f"audit: {SOURCES_PAGE}",
        "licence: CC BY-NC-ND 4.0",
        f"importe: {IMPORTE}",
        "tags:",
        "  - empire-contre-intox",
        "  - empire-contre-intox/dossier-3",
        "  - sources",
        "---",
        "",
        "# Sources — la vérification d'Artemis II",
        "",
        "> [!info] Ce que dit l'appareil critique",
        f"> L'audit du dossier — `sources/dossier-III-artemis2.md` — passe en revue "
        f"**{n_claims} affirmations**{' : ' + bilan if bilan else ''}.",
        f"> La page publique en surface **{len(fiches)} fiches** et **{len(refs)} références à DOI vérifié**.",
        ">",
        "> Particularité de ce dossier : il est écrit comme un **live post-mission**. Provoxys parle",
        "> d'Artemis II au passé, avec les témoignages de l'équipage — ce qui est cohérent, la mission",
        "> ayant volé du **1ᵉʳ au 10 avril 2026**. Les faits sont donc vérifiables, pas prospectifs.",
        "",
        f"⌂ [[{MOC}|Sommaire du dossier]] · 🌐 [La page « Les Sources »]({SOURCES_PAGE})",
        "",
        "---",
        "",
        "## Les fiches de vérification",
        "",
    ]

    for f in fiches:
        callout, sym, label = VERDICT.get(f.get("v", "ok"), VERDICT["ok"])
        body.append(f"> {callout} {sym} {f['t']} — *{f['d']}*")
        body.append(f"> {f['s']}")
        srcs = f.get("src") or []
        if srcs:
            body.append(">")
            body.append("> " + " · ".join(f"[{s['n']}]({s['u']})" for s in srcs))
        body.append("")

    # ── l'audit complet, affirmation par affirmation ──
    rows = claims_by_verdict()
    if rows:
        body += [
            "---",
            "",
            "## L'audit, affirmation par affirmation",
            "",
            f"*Les {len(rows)} affirmations passées en revue dans `sources/dossier-III-artemis2.md`.*",
            "",
            "| | Affirmation | Verdict |",
            "| --- | --- | --- |",
        ]
        for title, sym, verdict in rows:
            v = verdict.replace(sym, "").strip().lstrip("*").strip()
            t_ = title.replace("|", "—")
            body.append(f"| {sym} | {t_} | {v} |")
        body.append("")

    # ── les nuances de la synthèse ──
    sections = audit_sections()
    nuances = {k: v for k, v in sections.items() if v and ("🔶" in k or "⚠️" in k)}
    if nuances:
        body += [
            "> [!warning] Ce qu'il ne faut pas survendre",
            "> Aucun fait central n'est erroné — mais l'audit isole des points **évolutifs,",
            "> illustratifs ou invérifiables** qu'il serait abusif de citer comme des mesures.",
            "",
        ]
        for head, items in nuances.items():
            label = "🔶 Évolutifs ou invérifiables" if "🔶" in head else "⚠️ Approximations mineures"
            body.append(f"### {label}")
            body.append("")
            for it in items:
                body.append(f"- {it}")
            body.append("")

    body += [
        "---",
        "",
        "## Références scientifiques",
        "",
        f"*{len(refs)} articles à comité de lecture, DOI vérifiés — la science lunaire sur laquelle",
        "le dossier s'appuie pour la glace d'eau et les ressources polaires.*",
        "",
    ]
    for r in refs:
        kind = {"primary": "article primaire", "review": "revue de synthèse"}.get(r.get("k", ""), r.get("k", ""))
        body.append(f"> [!cite]- {r['a']} — *{r['t']}*")
        body.append(f"> **{r['j']}** · {kind}")
        body.append(f"> DOI : [{r['doi']}](https://doi.org/{r['doi']})")
        body.append(">")
        body.append(f"> {r['ab']}")
        body.append("")

    body += [
        "---",
        "",
        "## Les fichiers d'audit",
        "",
        "| Fichier | Contenu |",
        "| --- | --- |",
        f"| [`sources/dossier-III-artemis2.md`]({SITE}/sources/dossier-III-artemis2.md) | "
        f"l'audit affirmation par affirmation ({n_claims} entrées) |",
        f"| [`sources/refs-doi-5-lune-artemis.md`]({SITE}/sources/refs-doi-5-lune-artemis.md) | "
        "les références primaires, DOI contrôlés contre Crossref |",
        f"| [`sources/sources.html#artemis`]({SOURCES_PAGE}) | la page publique du Dossier XXVIII |",
        "",
        "> [!tip] Aucun DOI n'est deviné",
        "> Chaque DOI de ce dossier a été contrôlé contre la notice de l'éditeur (Science, PNAS,",
        "> Nature Astronomy, Annual Reviews) et recoupé avec NASA ADS ou PubMed — titre, auteurs,",
        "> année, volume et pages concordants. C'est la règle absolue de la charte ECI.",
        "",
        "---",
        "",
        f"⌂ [[{MOC}|Retour au sommaire]] · [[{TDB}|Tableau de bord]]",
        "",
    ]

    (OUT / f"{NOTE}.md").write_text("\n".join(body), encoding="utf-8")
    print(f"✓ {NOTE}.md")
    print(f"   {len(fiches)} fiches · {len(refs)} références DOI · audit : {n_claims} affirmations {bilan}")


if __name__ == "__main__":
    main()
