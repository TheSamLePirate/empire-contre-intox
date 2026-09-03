#!/usr/bin/env python3
"""Dossier XVII — passerelles bidirectionnelles + « Dossiers liés » au MOC.

Recoupements réels trouvés dans le coffre (grep -ril, puis lecture) :
  XVII ↔ XIV — l'acte XV « Atmosphères & exoplanètes » des Formules de l'Empire
               tient les HUIT équations de ce dossier, chacune avec son atelier ;
  XVII ↔ V   — lire une atmosphère à distance, c'est lire des raies spectrales,
               donc les transitions électroniques du Mouvement VI ;
  XVII ↔ XII — la même physique d'atmosphère (gradient de pression) et le même
               effet Doppler, ici sur une étoile, là au radar météo ;
  XVII ↔ XXV — l'effet de serre est un bilan radiatif : la Terre reçoit du visible
               concentré et renvoie de l'infrarouge tiède (chapitre 15 de l'Entropie).
"""
from __future__ import annotations

from pathlib import Path

VAULT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox")
D17 = VAULT / "Dossier XVII — Mondes Lointains"
D5 = VAULT / "Dossier V — Tableau Périodique"
D12 = VAULT / "Dossier XII — Tornades"
D14 = VAULT / "Dossier XIV — Formules"
D25 = VAULT / "Dossier XXV — Entropie"

MARK = "🔗 Passerelle — Dossier"
MARK17 = "Passerelle — Dossier XVII «"
MARK_RENVOI = "🔗 Renvois"

MOC17 = "Dossier XVII — Atmosphères & Mondes Lointains"
ACTE_XV = "15 — Acte XV — Atmosphères & exoplanètes"


def insert_before_footer(path: Path, block: str, marker: str) -> bool:
    if not path.exists():
        print(f"   ✗ absent : {path.name}")
        return False
    t = path.read_text(encoding="utf-8")
    if marker in t:
        print(f"   = déjà posé : {path.name}")
        return False
    i = t.rfind("\n---\n")
    t = (t.rstrip() + "\n\n" + block + "\n") if i == -1 else (t[: i + 1] + block + "\n" + t[i + 1:])
    path.write_text(t, encoding="utf-8")
    print(f"   ✓ {path.name}")
    return True


P: list[tuple[Path, str, str]] = []

# ── XVII → XIV : la statique de l'atmosphère ──
P.append((
    D17 / "01 — Chapitre 1 — Les atmosphères planétaires.md",
    f"> [!tip] {MARK} XIV « Les Formules de l'Empire »\n"
    "> Les trois équations de ce chapitre ne sont pas propres aux exoplanètes : elles ont chacune\n"
    "> leur fiche autonome — et leur atelier à curseurs — dans l'atlas des formules.\n"
    f"> [[{ACTE_XV}#Équilibre hydrostatique|L'équilibre hydrostatique]],\n"
    f"> [[{ACTE_XV}#Loi des gaz parfaits|la loi des gaz parfaits]] et\n"
    f"> [[{ACTE_XV}#Le profil barométrique|le profil barométrique]] y sont démontés un à un ;\n"
    f"> [[{ACTE_XV}#Température d'équilibre|la température d'équilibre]] y chiffre l'effet de serre\n"
    "> dont l'encadré anti-intox parle ici. **Ici elles décrivent des mondes, là-bas on tourne les boutons.**\n",
    f"{MARK} XIV «",
))

# ── XVII → XIV : les méthodes de détection ──
P.append((
    D17 / "02 — Chapitre 2 — Les télescopes au sol.md",
    f"> [!tip] {MARK} XIV « Les Formules de l'Empire »\n"
    "> Le « balancement » que HARPS et ESPRESSO traquent a une équation, et elle est jouable :\n"
    f"> [[{ACTE_XV}#L'effet Doppler & le décalage spectral|l'effet Doppler & le décalage spectral]]\n"
    f"> puis [[{ACTE_XV}#Les vitesses radiales|les vitesses radiales]], qui disent pourquoi la méthode\n"
    "> ne livre qu'une **masse minimale** — le fameux $M\\sin i$ — tant que l'inclinaison de l'orbite\n"
    "> reste inconnue.\n",
    f"{MARK} XIV «",
))

# ── XVII → XII : Doppler, d'une étoile à un mésocyclone ──
P.append((
    D17 / "02 — Chapitre 2 — Les télescopes au sol.md",
    f"> [!tip] {MARK} XII « Tornades, typhons, ouragans »\n"
    "> Le principe qui pèse une exoplanète est celui qui sauve des vies en Oklahoma. Un spectrographe\n"
    "> lit le décalage Doppler de la **lumière** d'une étoile qui tangue de quelques mètres par seconde ;\n"
    "> un radar météo lit le décalage Doppler de son propre **écho radio** et voit, dans un couplet de\n"
    "> vitesses rouge/vert, la rotation d'un mésocyclone avant que la tornade ne touche le sol :\n"
    "> [[01 — Partie 1 — Les Tornades#Chapitre 7 — Surveillance — avec quels outils ?|Chapitre 7 — Surveillance]].\n",
    f"{MARK} XII «",
))

# ── XVII → V : lire une atmosphère, c'est lire des raies ──
P.append((
    D17 / "04 — Chapitre 4 — Lire une atmosphère, la spectroscopie.md",
    f"> [!tip] {MARK} V « Le Tableau Périodique des éléments »\n"
    "> Pourquoi le CO₂ laisse-t-il une empreinte reconnaissable dans un spectre pris à 700 années-lumière ?\n"
    "> Parce qu'une molécule et un atome n'absorbent que des quantités d'énergie **précises** — celles qui\n"
    "> font sauter un électron d'un niveau à l'autre. C'est le modèle de Bohr, puis la mécanique quantique,\n"
    "> qui expliquent enfin les **raies spectrales** :\n"
    "> [[06 — Mouvement VI — La structure électronique des atomes|Mouvement VI — La structure électronique des atomes]].\n"
    "> Sans cette quantification, la spectroscopie de transmission n'aurait rien à lire.\n",
    f"{MARK} V «",
))

# ── XVII → XIV : le transfert radiatif et le transit ──
P.append((
    D17 / "Formulaire — les formules des atmosphères.md",
    f"> [!tip] {MARK} XIV « Les Formules de l'Empire »\n"
    "> Ce formulaire est court parce que le dossier n'affiche que deux blocs — mais l'acte XV des\n"
    "> Formules de l'Empire tient **les huit équations** de l'exoplanétologie, chacune avec son atelier :\n"
    f"> [[{ACTE_XV}#Équilibre hydrostatique|hydrostatique]] · [[{ACTE_XV}#Loi des gaz parfaits|gaz parfaits]] ·\n"
    f"> [[{ACTE_XV}#Le profil barométrique|profil barométrique]] · [[{ACTE_XV}#Le transfert radiatif|transfert radiatif]] ·\n"
    f"> [[{ACTE_XV}#La profondeur de transit|profondeur de transit]] ·\n"
    f"> [[{ACTE_XV}#L'effet Doppler & le décalage spectral|effet Doppler]] ·\n"
    f"> [[{ACTE_XV}#Les vitesses radiales|vitesses radiales]] · [[{ACTE_XV}#Température d'équilibre|température d'équilibre]].\n",
    f"{MARK} XIV «",
))

# ── XVII → XXV : l'effet de serre est un bilan radiatif ──
P.append((
    D17 / "08 — Chapitre 8 — La zone habitable & les mondes habitables.md",
    f"> [!tip] {MARK} XXV « L'entropie, le temps et l'Univers »\n"
    "> « Habitable » n'est pas seulement une affaire de température : c'est une affaire de **flux**.\n"
    "> Une planète tempérée reçoit de son étoile un rayonnement concentré, venu d'une source très chaude,\n"
    "> et en renvoie un autre, infrarouge et tiède — et c'est cet écart de qualité, pas l'énergie elle-même,\n"
    "> qui permet à des structures complexes de tenir debout :\n"
    "> [[04 — Acte IV — Matière, machines réelles et vivant#Chapitre 15 — Le vivant et les systèmes ouverts|Chapitre 15 — Le vivant et les systèmes ouverts]].\n"
    "> La zone habitable est le domaine où ce moteur tourne avec de l'eau liquide comme fluide.\n",
    f"{MARK} XXV «",
))

# ── XVII : renvois du lexique ──
P.append((
    D17 / "Lexique — les mots des mondes lointains.md",
    f"> [!tip] {MARK_RENVOI} — les mêmes mots, ailleurs dans le coffre\n"
    "> L'**effet Doppler** a une seconde vie en météorologie : il est défini, radar à l'appui, dans\n"
    "> [[Lexique — les mots de la tempête]] *(Dossier XII)*. L'**effet de serre** et l'**albédo** trouvent\n"
    "> leur cadre thermodynamique dans [[Lexique — cinquante-cinq mots définis simplement]] *(Dossier XXV)*.\n"
    "> Et les **raies spectrales** qui portent la **spectroscopie de transmission** viennent des transitions\n"
    "> électroniques du [[06 — Mouvement VI — La structure électronique des atomes|Mouvement VI]] *(Dossier V)*.\n",
    MARK_RENVOI,
))

# ── XIV → XVII (retour) ──
P.append((
    D14 / f"{ACTE_XV}.md",
    f"> [!tip] {MARK} XVII « Atmosphères & Mondes Lointains »\n"
    "> Les huit formules de cet acte ont un dossier entier pour terrain d'application. L'hydrostatique,\n"
    "> les gaz parfaits et le profil barométrique y décrivent quatre atmosphères réelles —\n"
    "> [[01 — Chapitre 1 — Les atmosphères planétaires|Chapitre 1]] ; l'effet Doppler et les vitesses\n"
    "> radiales y pèsent des planètes depuis le Chili —\n"
    "> [[02 — Chapitre 2 — Les télescopes au sol|Chapitre 2]] ; le transfert radiatif y sert à lire du CO₂\n"
    "> à 700 années-lumière — [[04 — Chapitre 4 — Lire une atmosphère, la spectroscopie|Chapitre 4]].\n"
    "> **Ici on tourne les boutons ; là-bas, les mêmes équations décrivent 6 298 mondes.**\n",
    MARK17,
))

# ── V → XVII (retour) ──
P.append((
    D5 / "06 — Mouvement VI — La structure électronique des atomes.md",
    f"> [!tip] {MARK} XVII « Atmosphères & Mondes Lointains »\n"
    "> Les raies spectrales que Bohr explique enfin ont, un siècle plus tard, un usage vertigineux :\n"
    "> elles servent de **signature chimique à distance**. Quand une planète passe devant son étoile,\n"
    "> son atmosphère prélève exactement les longueurs d'onde de ses molécules, et le JWST relit ces\n"
    "> manques pour nommer les gaz — CO₂, SO₂, H₂O — d'un monde qu'on ne verra jamais de près :\n"
    "> [[04 — Chapitre 4 — Lire une atmosphère, la spectroscopie|Chapitre 4 — Lire une atmosphère]].\n",
    MARK17,
))

# ── XII → XVII (retour) ──
P.append((
    D12 / "01 — Partie 1 — Les Tornades.md",
    f"> [!tip] {MARK} XVII « Atmosphères & Mondes Lointains »\n"
    "> Le radar Doppler et le spectrographe d'un observatoire font le même geste : mesurer un décalage\n"
    "> de fréquence pour en déduire une vitesse. L'un lit la rotation d'un mésocyclone à quelques\n"
    "> kilomètres, l'autre le balancement d'une étoile à cinquante années-lumière — et c'est ainsi qu'on\n"
    "> a pesé la première exoplanète : [[02 — Chapitre 2 — Les télescopes au sol|Chapitre 2 — Les télescopes au sol]].\n"
    "> La physique d'atmosphère est la même aussi : gradient de pression, gaz parfaits, hauteur d'échelle —\n"
    "> [[01 — Chapitre 1 — Les atmosphères planétaires|Chapitre 1 — Les atmosphères planétaires]].\n",
    MARK17,
))

# ── XXV → XVII (retour) ──
P.append((
    D25 / "04 — Acte IV — Matière, machines réelles et vivant.md",
    f"> [!tip] {MARK} XVII « Atmosphères & Mondes Lointains »\n"
    "> Le bilan radiatif de la biosphère — visible concentré à l'entrée, infrarouge tiède à la sortie —\n"
    "> a un nom en astronomie : la **température d'équilibre**. Sans atmosphère, la Terre serait à\n"
    "> ≈ −18 °C au lieu de +15 °C ; Vénus, avec 92 bar de CO₂, tient sa surface à ≈ 464 °C. C'est le même\n"
    "> raisonnement, appliqué à des mondes entiers :\n"
    "> [[01 — Chapitre 1 — Les atmosphères planétaires|Chapitre 1 — Les atmosphères planétaires]] et\n"
    "> [[08 — Chapitre 8 — La zone habitable & les mondes habitables|Chapitre 8 — La zone habitable]].\n",
    MARK17,
))


LIES = """## Dossiers liés

- [[Dossier XIV — Les Formules de l'Empire]] — son **acte XV** tient les huit équations de l'exoplanétologie, chacune avec son atelier à curseurs.
- [[Dossier V — Le Tableau Périodique des éléments]] — d'où viennent les raies spectrales qui rendent la spectroscopie possible.
- [[Dossier XII — Tornades, typhons, ouragans]] — la même physique d'atmosphère, et le même effet Doppler, sur la seule planète où l'on peut aller voir.
- [[Dossier XXV — L'entropie, le temps et l'Univers]] — l'effet de serre et l'habitabilité comme bilan de flux.
- [[Dossier III — Artemis II, l'Odyssée Lunaire]] — l'autre grand dossier spatial de **Provoxys**, côté vol habité.
- [[Empire contre Intox — tableau de bord|Le tableau de bord de l'Empire]] · [[Empire contre Intox — l'index des dossiers|L'index des dossiers]]
"""


def add_dossiers_lies() -> bool:
    p = D17 / f"{MOC17}.md"
    t = p.read_text(encoding="utf-8")
    if "## Dossiers liés" in t:
        print("   = déjà posé : Dossiers liés")
        return False
    t = t.replace("## Crédits", LIES + "\n## Crédits", 1)
    p.write_text(t, encoding="utf-8")
    print("   ✓ Dossiers liés (MOC)")
    return True


def main() -> None:
    print("Passerelles :")
    n = sum(1 for path, block, marker in P if insert_before_footer(path, block, marker))
    add_dossiers_lies()
    print(f"\n{n} passerelles posées sur {len(P)} prévues.")


if __name__ == "__main__":
    main()
