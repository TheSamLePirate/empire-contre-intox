#!/usr/bin/env python3
"""Dossier III « Artemis II » → Obsidian — MOC, Formulaire, Lexique, Portraits."""
from __future__ import annotations

import re
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

REPO = Path("/Users/olivierveinand/Documents/DEV/empire-contre-intox")
SRC = REPO / "provoxys/Artemis2.html"
OUT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/Dossier III — Artemis II")
PORTRAITS = OUT / "Portraits"

SITE = "https://empire-contre-intox.com"
PAGE = f"{SITE}/provoxys/Artemis2.html"
SIM = "https://thesamlepirate.github.io/NebulaSim/artemis2-multistage.fr.html"
MOC = "Dossier III — Artemis II, l'Odyssée Lunaire"
FORMULAIRE = "Formulaire — les formules d'Artemis II"
LEXIQUE = "Lexique — les mots d'Artemis II"
SOURCES = "Sources — la vérification d'Artemis II"
GALERIE = "Portraits — l'équipage d'Artemis II"
TDB = "Tableau de bord — Artemis II"
IMPORTE = "2026-08-26"

NOTES = [
    "00 — Ouverture — Introduction au live",
    "01 — Chapitre 1 — Genèse et histoire, d'Apollo à Artemis",
    "02 — Chapitre 2 — Financements, coûts et technologies de base",
    "03 — Chapitre 3 — Missions Artemis I et II",
    "04 — Chapitre 4 — Alunissage, Gateway et préparations futures",
    "05 — Chapitre 5 — Expériences scientifiques, partenariats et défis",
    "06 — Chapitre 6 — Synthèse, impacts et perspectives futures",
    "07 — Chapitre 7 — Le pas de tir LC-39B et le lancement",
    "08 — Sam prend l'antenne — Le voyage en vingt minutes",
]

# ─────────────────────────── inline (identique au script 1) ───────────────────────────


def inline(node) -> str:
    if isinstance(node, NavigableString):
        return str(node)
    if not isinstance(node, Tag):
        return ""
    cls = node.get("class") or []
    if node.name == "br":
        return "\n"
    if "imath" in cls and node.get("data-tex"):
        return f"${node['data-tex'].strip()}$"
    if node.name in ("b", "strong"):
        inner = "".join(inline(c) for c in node.children).strip()
        return f"**{inner}**" if inner else ""
    if node.name in ("em", "i"):
        inner = "".join(inline(c) for c in node.children).strip()
        return f"*{inner}*" if inner else ""
    if node.name == "sub":
        return f"_{node.get_text(strip=True)}"
    if node.name == "sup":
        return f"^{node.get_text(strip=True)}"
    return "".join(inline(c) for c in node.children)


def txt(node) -> str:
    s = inline(node).replace("​", "")
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r" *\n *", "\n", s)
    return s.strip()


# ─────────────────────────── Formulaire ───────────────────────────


def build_formulaire(soup: BeautifulSoup) -> int:
    blocks = soup.find_all(class_="formula-block")
    # dans quelle note vit chaque bloc ?
    secs = soup.find_all("section", class_=["chapter", "sam-chapter"])
    where = {}
    for i, sec in enumerate(secs):
        for fb in sec.find_all(class_="formula-block"):
            where[id(fb)] = i

    body = [
        "---",
        'aliases: ["Formulaire Artemis", "Les formules d\'Artemis II", "Formulaire III"]',
        "projet: Empire contre Intox",
        "dossier: Dossier III",
        "numero: 3",
        "type: appareil",
        "auteurs: [Provoxys, Samlepirate]",
        f"source: {PAGE}",
        "licence: CC BY-NC-ND 4.0",
        f"importe: {IMPORTE}",
        "tags:",
        "  - empire-contre-intox",
        "  - empire-contre-intox/dossier-3",
        "  - formulaire",
        "---",
        "",
        "# Formulaire — les formules d'Artemis II",
        "",
        f"> [!info] Les **{len(blocks)} blocs de formule** du dossier, dans l'ordre de lecture.",
        "> Chaque entrée porte sa lecture orale (**Se lit**), la glose des symboles qui se",
        "> prononcent mal, la note de la page, et le lien vers la note où elle apparaît.",
        "",
        f"⌂ [[{MOC}|Sommaire du dossier]] · [[{LEXIQUE}|Lexique]] · [[{SOURCES}|Sources]]",
        "",
        "---",
        "",
    ]

    n = 0
    for fb in blocks:
        n += 1
        head = fb.find(class_="fb-head")
        tag = head.find(class_="fb-tag")
        tag_txt = tag.get_text(" ", strip=True) if tag else ""
        if tag:
            tag.extract()
        title = head.get_text(" ", strip=True)
        note_i = where[id(fb)]

        body.append(f"## {n}. {title}")
        body.append("")
        if tag_txt:
            body.append(f"*{tag_txt}*")
            body.append("")
        for f in fb.find_all(class_="formula"):
            if f.get("data-tex"):
                body.append(f"$${f['data-tex'].strip()}$$")
                body.append("")

        say = fb.find(class_="fb-say")
        if say:
            t = say.find(class_="say-t")
            x = say.find(class_="say-x")
            if x:
                x.extract()
            body.append(f"> [!quote] 🗣️ Se lit")
            body.append(f"> {txt(t)}")
            if x:
                body.append(">")
                body.append(f"> {txt(x)}")
            body.append("")

        note = fb.find(class_="fb-note")
        if note:
            body.append("> [!note]- Ce qu'elle dit")
            for para in txt(note).split("\n"):
                body.append(f"> {para}" if para else ">")
            body.append("")

        body.append(f"→ [[{NOTES[note_i]}]] · `^formule-{n}`")
        body.append("")
        body.append("---")
        body.append("")

    body.append(f"⌂ [[{MOC}|Retour au sommaire]] · [[{TDB}|Tableau de bord]]")
    body.append("")
    (OUT / f"{FORMULAIRE}.md").write_text("\n".join(body), encoding="utf-8")
    return n


# ─────────────────────────── Lexique ───────────────────────────

# terme → (définition ancrée dans la page, note où il apparaît en premier)
LEX: list[tuple[str, str, str, int]] = [
    ("Accords Artemis", "Accords Artemis",
     "Cadre diplomatique lancé en 2020 pour une exploration lunaire pacifique et coordonnée. "
     "Le dossier compte **67 signataires**, dont le Paraguay le 7 mai 2026. La Chine, qui prépare "
     "sa propre base lunaire, ne les a pas signés.", 5),
    ("ARCHER", "ARCHER",
     "Capteur de radiation embarqué sur Orion. Le dossier lui attribue un flux mesuré de "
     "**1,8 particule par cm² et par seconde** de rayons cosmiques galactiques.", 2),
    ("AxEMU", "AxEMU",
     "Combinaison d'exploration lunaire de nouvelle génération (Axiom), testée en gravité 1/6, "
     "en mobilité et en protection contre la poussière.", 4),
    ("BioSentinel", "BioSentinel",
     "CubeSat embarquant des **levures génétiquement modifiées** pour mesurer les dommages à l'ADN "
     "causés par les rayons cosmiques.", 5),
    ("Blue Moon Mk2", "Blue Moon Mk2",
     "Atterrisseur lunaire habité de Blue Origin, second concurrent du HLS aux côtés de Starship.", 4),
    ("CubeSat", "CubeSats",
     "Nanosatellite standardisé emporté en charge secondaire. Le dossier cite **BioSentinel** (ADN "
     "sous radiation), **EQUULEUS** (magnétosphère) et **LunaH-Map** (hydrogène polaire).", 5),
    ("delta-v", "delta-v",
     "Le « budget de vitesse » d'une manœuvre : la variation de vitesse qu'un moteur doit fournir. "
     "C'est la monnaie de la mécanique orbitale — 3,1 km/s pour l'injection translunaire.", 1),
    ("Diviner", "Diviner",
     "Radiomètre de la sonde LRO qui cartographie les températures de surface — il repère les "
     "pièges froids polaires où la glace peut subsister.", 1),
    ("EVA", "EVA",
     "*Extravehicular activity* — sortie extravéhiculaire. Le dossier envisage des EVA quotidiennes "
     "depuis la future base lunaire.", 4),
    ("free-return", "free-return",
     "Trajectoire de retour libre : la géométrie du survol lunaire est choisie pour que la gravité "
     "de la Lune renvoie seule le vaisseau vers la Terre, **sans allumer de moteur**. C'est le "
     "filet de sécurité d'Artemis II.", 8),
    ("GAO", "GAO",
     "*Government Accountability Office*, le Bureau de la responsabilité gouvernementale — l'auditeur "
     "du Congrès américain. Il chiffre les dépassements du programme à **6,8–7 milliards de dollars**.", 2),
    ("Gateway", "Gateway",
     "Station orbitale lunaire en construction, placée en orbite NRHO. Ses deux premiers modules — "
     "**PPE** (propulsion et énergie) et **HALO** (habitat) — sont intégrés en mai 2026.", 4),
    ("GCR", "GCR",
     "*Galactic Cosmic Rays*, rayons cosmiques galactiques : particules de haute énergie venues "
     "d'au-delà du système solaire. Avec les particules solaires, c'est le risque de radiation "
     "majeur du vol au-delà de l'orbite basse.", 1),
    ("HLS", "HLS",
     "*Human Landing System*, le système d'alunissage habité. Deux véhicules sont retenus : "
     "**Starship** (SpaceX) et **Blue Moon Mk2** (Blue Origin).", 1),
    ("ICPS", "ICPS",
     "*Interim Cryogenic Propulsion Stage* — le deuxième étage du SLS, motorisé par un RL-10. "
     "C'est lui qui circularise l'orbite basse puis exécute l'injection translunaire.", 8),
    ("Impulsion spécifique", "impulsion spécifique",
     "Le rendement d'un moteur-fusée, en secondes : plus elle est élevée, moins il faut d'ergols "
     "pour un même delta-v. Les RS-25 atteignent **452 s dans le vide**.", 1),
    ("ISRU", "ISRU",
     "*In-Situ Resource Utilization* — l'utilisation des ressources sur place. Fabriquer sur la Lune "
     "l'eau, l'oxygène et le carburant qu'on n'aura pas à emporter depuis la Terre.", 1),
    ("LC-39B", "LC-39B",
     "*Launch Complex 39B*, le pas de tir du Kennedy Space Center modernisé pour le SLS : tour mobile "
     "de 122 m, tranchée à flammes, déluge d'eau de **1,1 million de litres par minute**.", 1),
    ("LEND", "LEND",
     "*Lunar Exploration Neutron Detector*, instrument de LRO qui traque l'hydrogène — donc la glace — "
     "sous la surface polaire.", 1),
    ("LEO", "LEO",
     "*Low Earth Orbit*, l'orbite basse terrestre. On l'atteint à **7,8 km/s** ; c'est le palier "
     "d'où part toute mission lointaine.", 1),
    ("LRO", "LRO",
     "*Lunar Reconnaissance Orbiter*, l'orbiteur de reconnaissance lunaire en service depuis 2009 — "
     "la source des cartes polaires qui guident le choix des sites d'alunissage.", 1),
    ("Max Q", "Max Q",
     "La pression dynamique maximale subie par le lanceur, atteinte **~60 s après le décollage vers "
     "13 km d'altitude**. Les moteurs sont bridés à ce moment-là pour ménager la structure.", 7),
    ("NRHO", "NRHO",
     "*Near-Rectilinear Halo Orbit* — l'orbite très elliptique autour de la Lune retenue pour "
     "Gateway : peu coûteuse à tenir, et toujours en vue de la Terre.", 4),
    ("OIG", "OIG",
     "*Office of Inspector General*, le Bureau de l'inspecteur général de la NASA — l'audit interne "
     "de l'agence, cité pour les coûts par lancement.", 2),
    ("Orion", "Orion",
     "La capsule habitée du programme, avec son **module de service européen** fourni par l'ESA. "
     "L'exemplaire d'Artemis II est baptisé *Integrity*.", 1),
    ("Propergol", "propergol",
     "L'ergol embarqué — ici un mélange cryogénique d'**hydrogène liquide et d'oxygène liquide**. "
     "Sa masse domine celle du lanceur, ce que dit l'équation de Tsiolkovsky.", 1),
    ("Régolithe", "régolithe",
     "La poussière lunaire : abrasive, électrostatique, elle abîme les visières, les joints et les "
     "poumons. C'est l'une des trois grandes leçons d'Apollo, avec la radiation et la durabilité.", 1),
    ("RS-25", "RS-25",
     "Les quatre moteurs principaux du SLS, hérités des navettes spatiales : **2 280 kN** de poussée "
     "au sol chacun, **452 s** d'impulsion spécifique dans le vide.", 1),
    ("Shackleton", "Shackleton",
     "Cratère du pôle Sud lunaire dont le fond, en **ombre permanente**, piège la glace d'eau — "
     "site de référence pour l'ISRU.", 1),
    ("SLS", "SLS",
     "*Space Launch System*, le système de lancement spatial de la NASA — le lanceur lourd d'Artemis, "
     "standardisé en mars 2026.", 1),
    ("Starship (HLS)", "Starship",
     "La version d'alunissage du Starship de SpaceX, retenue comme premier HLS. Elle impose le "
     "**ravitaillement en orbite**, verrou technique du programme.", 4),
    ("TLI", "TLI",
     "*Trans-Lunar Injection*, l'injection translunaire : la mise à feu qui quitte l'orbite terrestre "
     "pour la Lune, d'un delta-v d'environ **3,1 km/s**.", 1),
    ("VAB", "VAB",
     "*Vehicle Assembly Building*, le bâtiment d'assemblage du Kennedy Space Center. Le lanceur "
     "monté en sort pour un **rollout de 5,5 km** jusqu'au pas de tir.", 7),
    ("Vis-viva", "vis-viva",
     "L'équation qui relie la vitesse d'un vaisseau à sa distance et à son orbite. Elle fixe le "
     "delta-v de chaque mise à feu.", 1),
    ("Wet Dress Rehearsal", "Wet Dress",
     "Répétition générale humide : on remplit réellement les réservoirs et on déroule le compte à "
     "rebours **sans allumer**. C'est elle qui a révélé la fuite d'hydrogène de février 2026.", 1),
]


def build_lexique() -> int:
    body = [
        "---",
        'aliases: ["Lexique Artemis", "Les mots d\'Artemis II", "Lexique III"]',
        "projet: Empire contre Intox",
        "dossier: Dossier III",
        "numero: 3",
        "type: appareil",
        "auteurs: [Provoxys, Samlepirate]",
        f"source: {PAGE}",
        "licence: CC BY-NC-ND 4.0",
        f"importe: {IMPORTE}",
        "tags:",
        "  - empire-contre-intox",
        "  - empire-contre-intox/dossier-3",
        "  - lexique",
        "---",
        "",
        "# Lexique — les mots d'Artemis II",
        "",
        f"> [!info] **{len(LEX)} termes**, tous définis d'après ce que le dossier en dit lui-même.",
        "> Le programme Artemis parle par sigles : les voici en clair, avec le chiffre que la",
        "> page leur associe quand elle en donne un.",
        "",
        f"⌂ [[{MOC}|Sommaire du dossier]] · [[{FORMULAIRE}|Formulaire]] · [[{SOURCES}|Sources]]",
        "",
        "---",
        "",
    ]
    for terme, _key, definition, note_i in sorted(LEX, key=lambda x: x[0].lower()):
        body.append(f"## {terme}")
        body.append("")
        body.append(definition)
        body.append("")
        body.append(f"→ [[{NOTES[note_i]}]]")
        body.append("")
    body.append("---")
    body.append("")
    body.append(f"⌂ [[{MOC}|Retour au sommaire]] · [[{TDB}|Tableau de bord]]")
    body.append("")
    (OUT / f"{LEXIQUE}.md").write_text("\n".join(body), encoding="utf-8")
    return len(LEX)


# ─────────────────────────── Portraits ───────────────────────────

CREW = [
    {
        "nom": "Reid Wiseman",
        "role": "Commandant",
        "agence": "NASA",
        "epithete": "Celui qui a entendu l'alarme à 402 000 km",
        "recit": (
            "Commandant d'Artemis II, Reid Wiseman raconte avec humour la **« surprise »** du "
            "détecteur de fumée qui s'est déclenché à **402 000 km de la Terre** — plus loin de "
            "chez soi qu'aucun équipage depuis Apollo 17 — en lançant un *« I'm telling you right "
            "now »* resté mémorable. L'analyse post-vol a rattaché l'incident à des problèmes "
            "mineurs de bouclier thermique, résolus par des ajustements de matériau.\n\n"
            "C'est aussi lui qui donne au programme sa formule la plus large, quand on lui oppose "
            "le coût du vol : **« Tout le monde sur Terre fait partie d'Artemis II. »**"
        ),
        "cites": [(3, "l'alarme du détecteur de fumée"), (2, "« Tout le monde sur Terre… »")],
    },
    {
        "nom": "Victor Glover",
        "role": "Pilote",
        "agence": "NASA",
        "epithete": "Celui qui a vu la Terre comme un miroir minuscule",
        "recit": (
            "Pilote d'Artemis II, Victor Glover décrit la Terre vue de l'espace profond comme un "
            "*« impossibly small mirror »* — un miroir impossiblement petit. La phrase dit en cinq "
            "mots ce que le dossier appelle l'effet de surplomb : la planète entière tenant dans "
            "un hublot.\n\n"
            "De la rentrée atmosphérique, à environ **40 000 km/h**, il ne retient pas la physique "
            "mais la sensation : *« like diving off skyscraper backwards 10x wild »*."
        ),
        "cites": [(6, "« impossibly small mirror »"), (3, "la rentrée à 40 000 km/h")],
    },
    {
        "nom": "Christina Koch",
        "role": "Spécialiste de mission",
        "agence": "NASA",
        "epithete": "La « space plumber » qui a mesuré ce que le vol fait au corps",
        "recit": (
            "Spécialiste de mission, Christina Koch évoque ses **rêves de flottement** et une "
            "camaraderie qu'elle chiffre elle-même — *« teamwork 100 % »* — avant de se rebaptiser "
            "**« space plumber »** pour avoir géré les toilettes du vaisseau.\n\n"
            "Son vol est aussi un jeu de données : prélèvements de salive et analyses d'urine ont "
            "suivi les biomarqueurs de stress oxydatif, avec une **hausse de 15 % après dix jours** "
            "en espace profond. Ce sont ces mesures qui alimentent les modèles de perte osseuse "
            "pour les séjours longs."
        ),
        "cites": [(6, "« teamwork 100 % » et la « space plumber »"), (5, "les données de santé")],
    },
    {
        "nom": "Jeremy Hansen",
        "role": "Spécialiste de mission",
        "agence": "Agence spatiale canadienne (CSA)",
        "epithete": "Le premier non-Américain parti vers la Lune",
        "recit": (
            "Premier non-Américain à voyager vers la Lune, Jeremy Hansen parle de la face cachée "
            "comme d'une *« otherworldly eclipse »* — une éclipse d'un autre monde.\n\n"
            "C'est lui qui referme les témoignages de l'équipage par la phrase que le dossier "
            "retient comme la plus poétique du vol : **« We are a mirror reflecting you »**, "
            "« nous sommes un miroir qui vous reflète » — dite pour toute l'équipe, et adressée "
            "au sol."
        ),
        "cites": [(6, "« otherworldly eclipse » et « we are a mirror reflecting you »")],
    },
]


def build_portraits() -> int:
    PORTRAITS.mkdir(exist_ok=True)
    for c in CREW:
        al = ", ".join(f'"{a}"' for a in [c["nom"], c["nom"].split()[-1]])
        body = [
            "---",
            f"aliases: [{al}]",
            "projet: Empire contre Intox",
            "dossier: Dossier III",
            "numero: 3",
            "type: portrait",
            f'personne: "{c["nom"]}"',
            f'role: "{c["role"]}"',
            f'agence: "{c["agence"]}"',
            f'epithete: "{c["epithete"]}"',
            "mission: Artemis II",
            f"source: {PAGE}",
            "licence: CC BY-NC-ND 4.0",
            f"importe: {IMPORTE}",
            "tags:",
            "  - empire-contre-intox",
            "  - empire-contre-intox/dossier-3",
            "  - portrait",
            "---",
            "",
            f"# {c['nom']}",
            "",
            f"> [!quote] {c['epithete']}",
            f"> **{c['role']}** · {c['agence']} · équipage d'**Artemis II**",
            "",
            "| | |",
            "| --- | --- |",
            f"| **Rôle** | {c['role']} |",
            f"| **Agence** | {c['agence']} |",
            "| **Mission** | Artemis II — 1ᵉʳ au 10 avril 2026 |",
            "| **Vol** | survol lunaire habité, sans alunissage |",
            "",
            "## Ce que le dossier en dit",
            "",
            c["recit"],
            "",
            "## Où le lire",
            "",
        ]
        for note_i, quoi in c["cites"]:
            body.append(f"- [[{NOTES[note_i]}]] — {quoi}")
        body += [
            "",
            "---",
            "",
            f"⌂ [[{GALERIE}|La galerie de l'équipage]] · [[{MOC}|Sommaire du dossier]]",
            "",
        ]
        (PORTRAITS / f"{c['nom']}.md").write_text("\n".join(body), encoding="utf-8")

    # galerie
    g = [
        "---",
        'aliases: ["Équipage Artemis II", "La galerie de l\'équipage", "Portraits Artemis"]',
        "projet: Empire contre Intox",
        "dossier: Dossier III",
        "numero: 3",
        "type: appareil",
        f"source: {PAGE}",
        "licence: CC BY-NC-ND 4.0",
        f"importe: {IMPORTE}",
        "tags:",
        "  - empire-contre-intox",
        "  - empire-contre-intox/dossier-3",
        "  - portrait",
        "---",
        "",
        "# Portraits — l'équipage d'Artemis II",
        "",
        "> [!info] **Quatre personnes** ont fait le voyage du 1ᵉʳ au 10 avril 2026 —",
        "> le premier équipage au-delà de l'orbite basse depuis Apollo 17, en décembre 1972.",
        "> Le dossier les cite par leurs mots, recueillis après le splashdown.",
        "",
        f"⌂ [[{MOC}|Sommaire du dossier]] · [[{LEXIQUE}|Lexique]] · [[{SOURCES}|Sources]]",
        "",
        "| Personne | Rôle | Agence | Ce qu'iel en retient |",
        "| --- | --- | --- | --- |",
    ]
    for c in CREW:
        g.append(
            f"| [[{c['nom']}]] | {c['role']} | {c['agence']} | {c['epithete']} |"
        )
    g += ["", "---", ""]
    for c in CREW:
        g.append(f"## {c['nom']}")
        g.append("")
        g.append(f"*{c['role']} · {c['agence']}*")
        g.append("")
        g.append(c["recit"].split("\n\n")[0])
        g.append("")
        g.append(f"→ [[{c['nom']}|Fiche complète]]")
        g.append("")
    g.append("---")
    g.append("")
    g.append(f"⌂ [[{MOC}|Retour au sommaire]] · [[{TDB}|Tableau de bord]]")
    g.append("")
    (OUT / f"{GALERIE}.md").write_text("\n".join(g), encoding="utf-8")
    return len(CREW)


# ─────────────────────────── MOC ───────────────────────────


def build_moc(soup: BeautifulSoup, n_formules: int, n_lex: int, n_crew: int) -> None:
    secs = soup.find_all("section", class_=["chapter", "sam-chapter"])
    rows = []
    for i, sec in enumerate(secs):
        num_el = sec.find(class_="num") or sec.find(class_="head-num")
        chapitre = num_el.get_text(" ", strip=True)
        h2 = sec.find("h2")
        titre = re.sub(r" +([,.])", r"\1", txt(h2).replace("\n", " "))
        titre = titre.replace("**", "").replace("*", "").rstrip(".")
        nfb = len(sec.find_all(class_="formula-block"))
        nparts = len(sec.find_all("div", class_="part"))
        mots = len(sec.get_text(" ", strip=True).split())
        rows.append((i, chapitre, titre, nparts, nfb, mots))

    body = [
        "---",
        'aliases: ["Dossier III", "Artemis II", "L\'Odyssée Lunaire", "Artemis"]',
        "projet: Empire contre Intox",
        "dossier: Dossier III",
        "numero: 3",
        "type: MOC",
        "auteurs: [Provoxys, Samlepirate]",
        'realise-par: "Provoxys, avec la participation de Samlepirate"',
        f"source: {PAGE}",
        f"compagnon: {SIM}",
        "licence: CC BY-NC-ND 4.0",
        f"importe: {IMPORTE}",
        "tags:",
        "  - empire-contre-intox",
        "  - empire-contre-intox/dossier-3",
        "  - MOC",
        "  - artemis",
        "  - exploration-lunaire",
        "---",
        "",
        "# Dossier III — Artemis II, l'Odyssée Lunaire",
        "",
        "![[artemis2-hero.png]]",
        "",
        "> [!abstract] De la genèse à Mars",
        "> L'intégralité de l'émission Provoxys, **mot pour mot** — ponctuée par les interventions",
        "> de **Sam**, développeur de *Nebula Orbit*, qui fait tourner en parallèle la simulation",
        "> multi-étages de la mission. Le voyage simulé dure exactement **20 minutes**.",
        "",
        f"▶ **[Lancer la simulation Nebula Orbit]({SIM})** · 🌐 [Lire le dossier en ligne]({PAGE})",
        "",
        "---",
        "",
        "## Le fil conducteur",
        "",
        "Le dossier part d'un silence : **décembre 1972**, Gene Cernan pose le dernier pas humain",
        "sur la Lune, et pendant près de quarante ans plus personne n'y retourne. Ce qui rouvre la",
        "porte n'est pas une découverte mais une décision — la *Space Policy Directive 1* de 2017,",
        "puis le plan Artemis de 2020. Et la différence tient en une phrase : Apollo était un",
        "sprint, Artemis veut **rester**.",
        "",
        "De là, tout s'enchaîne. Rester suppose de l'eau, donc les cratères en ombre permanente du",
        "pôle Sud ; de l'eau suppose l'**ISRU**, donc l'électrolyse sur place ; l'électrolyse suppose",
        "de l'énergie, donc Gateway et les réacteurs de surface. Chaque chapitre creuse un maillon",
        "de cette chaîne — les coûts que le GAO chiffre, les technologies que le SLS impose, le pas",
        "de tir qu'il a fallu reconstruire — avant que **Sam ne fasse voler la mission** dans",
        "*Nebula Orbit*, vingt minutes en temps réel, du décollage à l'amerrissage.",
        "",
        "> [!tip] Deux voix, deux registres",
        "> **🎙️ Provoxys** déroule l'émission — 86 prises de parole, huit chapitres, le programme",
        "> vu du sol. **🛰️ Sam** répond par la géométrie : la même mission, jouée dans une simulation",
        "> orbitale, 38 manœuvres enchaînées. Le dossier est la rencontre des deux.",
        "",
        "---",
        "",
        "## Sommaire",
        "",
        f"→ **[[{TDB}]]** — le poste de pilotage : chiffres, progression de lecture, cartes et bases.",
        "",
        "| # | Chapitre | Titre | Parties | Formules |",
        "| --- | --- | --- | --- | --- |",
    ]
    for i, chapitre, titre, nparts, nfb, mots in rows:
        short = NOTES[i].split(" — ", 1)[1]
        body.append(
            f"| {i:02d} | {chapitre} | [[{NOTES[i]}\\|{short}]] | {nparts or '—'} | {nfb or '—'} |"
        )
    body += [
        "",
        "### Le détail des chapitres",
        "",
    ]
    # liens profonds vers les titres de section
    idx_file = Path("/private/tmp/claude-501/-Users-olivierveinand-Documents-DEV-empire-contre-intox/48033732-fb9f-4e70-84c7-fb0018ea55c5/scratchpad") / "_index.txt"
    if idx_file.exists():
        for line in idx_file.read_text(encoding="utf-8").splitlines():
            parts = line.split("\t")
            name, heads = parts[0], [h for h in parts[1:] if h]
            if not heads:
                continue
            body.append(f"**[[{name}|{name.split(' — ',1)[1]}]]**")
            body.append("")
            for h in heads:
                body.append(f"- [[{name}#{h}|{h}]]")
            body.append("")

    body += [
        "---",
        "",
        "## L'appareil du dossier",
        "",
        f"- **[[{FORMULAIRE}]]** — les **{n_formules} blocs de formule**, avec leur lecture orale.",
        f"- **[[{LEXIQUE}]]** — **{n_lex} termes** : le programme parle par sigles, les voici en clair.",
        f"- **[[{GALERIE}]]** — les **{n_crew} membres d'équipage**, par leurs propres mots.",
        f"- **[[{SOURCES}]]** — la vérification du dossier, fiche par fiche.",
        "",
        "### Cartes & bases",
        "",
        "- [[Carte du dossier — Artemis II.canvas|🗺️ Carte du dossier]]",
        "- [[Le vol en vingt minutes — frise.canvas|🚀 Le vol en vingt minutes]]",
        "- [[Dossier III — lecture.base|📖 Base — lecture]]",
        "- [[Portraits de l'équipage.base|👥 Base — équipage]]",
        "",
        "---",
        "",
        "## Dossiers liés",
        "",
        "- [[Empire contre Intox — tableau de bord|⌂ Le tableau de bord de l'Empire]] · "
        "[[Empire contre Intox — l'index des dossiers|l'index des dossiers]]",
        "",
        "---",
        "",
        "## Crédits",
        "",
        "**Réalisé par Provoxys**, avec la participation de **Samlepirate** (*Nebula Orbit*).",
        "",
        "![[avatar-provoxys.jpeg|80]] ![[avatar-samlepirate.jpeg|80]]",
        "",
        f"Transcription intégrale du live « Artemis — L'Odyssée Lunaire : De la Genèse à Mars ».",
        "Sources citées par l'émission : NASA.gov, OIG, GAO, interviews de l'équipage d'Artemis II.",
        "",
        "> [!info] Licence",
        "> Contenu sous **CC BY-NC-ND 4.0** — partage avec attribution, sans usage commercial",
        "> ni modification. [Détails](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr)",
        "",
    ]
    (OUT / f"{MOC}.md").write_text("\n".join(body), encoding="utf-8")


def main() -> None:
    soup = BeautifulSoup(SRC.read_text(encoding="utf-8"), "html.parser")
    n_formules = build_formulaire(BeautifulSoup(SRC.read_text(encoding="utf-8"), "html.parser"))
    n_lex = build_lexique()
    n_crew = build_portraits()
    build_moc(soup, n_formules, n_lex, n_crew)
    print(f"✓ {FORMULAIRE}.md   ({n_formules} formules)")
    print(f"✓ {LEXIQUE}.md   ({n_lex} termes)")
    print(f"✓ {GALERIE}.md + Portraits/ ({n_crew} fiches)")
    print(f"✓ {MOC}.md")


if __name__ == "__main__":
    main()
