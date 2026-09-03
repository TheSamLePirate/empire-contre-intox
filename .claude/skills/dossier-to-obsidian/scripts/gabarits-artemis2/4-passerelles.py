#!/usr/bin/env python3
"""Dossier III « Artemis II » — passerelles bidirectionnelles + « Dossiers liés ».

Recoupements réels trouvés dans le coffre :
  III ↔ XIV  — 9 des 10 blocs de formule d'Artemis ont leur jumeau dans
               « Les Formules de l'Empire » (Acte I pour 8, Acte II pour l'électrolyse) ;
  III ↔ VII  — la loi de Fourier est un champ de vecteurs : q = −k∇T ;
  III ↔ XXV  — les RS-25 sont des moteurs thermiques, donc bornés par Carnot.
"""
from __future__ import annotations

from pathlib import Path

VAULT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox")
D3 = VAULT / "Dossier III — Artemis II"
D7 = VAULT / "Dossier VII — Champs de vecteurs"
D14 = VAULT / "Dossier XIV — Formules"
D25 = VAULT / "Dossier XXV — Entropie"

MARK = "🔗 Passerelle — Dossier"
MARK3 = "Passerelle — Dossier III «"
MARK_RENVOI = "🔗 Renvois"


def insert_before_footer(path: Path, block: str, marker: str) -> bool:
    """Insère `block` avant le dernier `---` de la note. Idempotent sur `marker`."""
    if not path.exists():
        print(f"   ✗ absent : {path.name}")
        return False
    t = path.read_text(encoding="utf-8")
    if marker in t:
        print(f"   = déjà posé : {path.name}")
        return False
    i = t.rfind("\n---\n")
    if i == -1:
        t = t.rstrip() + "\n\n" + block + "\n"
    else:
        t = t[: i + 1] + block + "\n" + t[i + 1 :]
    path.write_text(t, encoding="utf-8")
    print(f"   ✓ {path.name}")
    return True


# ─────────────────────────── les passerelles ───────────────────────────

P: list[tuple[Path, str, str]] = []

# ── III → XIV (les équations) ──
P.append((
    D3 / "01 — Chapitre 1 — Genèse et histoire, d'Apollo à Artemis.md",
    f'> [!tip] {MARK} XIV « Les Formules de l\'Empire »\n'
    "> Sept des équations de ce chapitre ont leur fiche autonome — et leur atelier à curseurs —\n"
    "> dans l'atlas des formules : [[01 — Acte I — Espace & mécanique|Acte I — Espace & mécanique]]\n"
    "> pose [[01 — Acte I — Espace & mécanique#Équation de vis-viva|vis-viva]],\n"
    "> [[01 — Acte I — Espace & mécanique#Orbite & libération|orbite & libération]],\n"
    "> [[01 — Acte I — Espace & mécanique#2ᵉ loi de Newton|la 2ᵉ loi de Newton]],\n"
    "> [[01 — Acte I — Espace & mécanique#Équation de Tsiolkovsky|Tsiolkovsky]],\n"
    "> [[01 — Acte I — Espace & mécanique#Puissance d'échappement|la puissance d'échappement]] et\n"
    "> [[01 — Acte I — Espace & mécanique#Loi de Fourier|la loi de Fourier]] ;\n"
    "> [[02 — Acte II — Atome & quantique#Électrolyse de l'eau|Acte II]] pose l'électrolyse.\n"
    "> **Ici elles font voler une mission ; là-bas on peut tourner les boutons.**\n",
    MARK,
))

# ── III → XXV (le moteur thermique) ──
P.append((
    D3 / "07 — Chapitre 7 — Le pas de tir LC-39B et le lancement.md",
    f'> [!tip] {MARK} XXV « L\'entropie, le temps et l\'Univers »\n'
    "> Les quatre RS-25 qui s'allument ici sont des **moteurs thermiques** : ils prennent de la\n"
    "> chaleur à la combustion hydrogène-oxygène et en tirent du travail. Leur rendement n'est donc\n"
    "> pas une affaire d'ingénierie seule — il bute sur une limite que la thermodynamique fixe\n"
    "> d'avance : [[01 — Acte I — Transformer la chaleur en travail#Chapitre 2 — Le cycle de Carnot|le cycle de Carnot]].\n"
    "> Les 452 s d'impulsion spécifique disent, en langage fusée, jusqu'où on s'en approche.\n",
    MARK,
))

# ── III → XIV (Hohmann, chez Sam) ──
P.append((
    D3 / "08 — Sam prend l'antenne — Le voyage en vingt minutes.md",
    f'> [!tip] {MARK} XIV « Les Formules de l\'Empire »\n'
    "> La mise à feu que Sam commente à T+7:45 porte un nom et une formule :\n"
    "> [[01 — Acte I — Espace & mécanique#Transfert de Hohmann|le transfert de Hohmann]].\n"
    "> Ce que la simulation montre comme une trace qui s'étire, l'atlas le donne comme un budget de\n"
    "> vitesse — **la même manœuvre, vue de la trajectoire puis vue du calcul**.\n",
    MARK,
))

# ── III → VII (Fourier est un champ de vecteurs) ──
P.append((
    D3 / "Formulaire — les formules d'Artemis II.md",
    f'> [!tip] {MARK} VII « Le langage des champs »\n'
    "> La loi de Fourier $\\vec q=-k\\vec\\nabla T$ n'est pas qu'une formule de bouclier thermique :\n"
    "> c'est un **champ de vecteurs**. Le $\\nabla T$ est le gradient de température — une flèche en\n"
    "> chaque point, pointant vers le plus chaud — et le signe moins dit que la chaleur descend cette\n"
    "> pente. Le mécanisme est démonté dans\n"
    "> [[Formulaire — les formules du langage des champs#3 · Le gradient · la pente d'une colline|Le gradient · la pente d'une colline]].\n",
    MARK,
))

# ── III → VII (lexique) ──
P.append((
    D3 / "Lexique — les mots d'Artemis II.md",
    f'> [!tip] {MARK_RENVOI} — les mêmes mots, ailleurs dans le coffre\n'
    "> Le **gradient** et le **nabla** de la loi de Fourier ont leur définition complète — et leur\n"
    "> prononciation — dans [[Lexique — les mots du champ]] *(Dossier VII)*. Le **delta-v**, la\n"
    "> **vis-viva**, le **transfert de Hohmann** et l'**impulsion spécifique** ont chacun leur fiche\n"
    "> et leur atelier dans [[01 — Acte I — Espace & mécanique|Acte I — Espace & mécanique]]\n"
    "> *(Dossier XIV)*.\n",
    MARK_RENVOI,
))

# ── XIV → III (retour) ──
P.append((
    D14 / "01 — Acte I — Espace & mécanique.md",
    f'> [!tip] {MARK} III « Artemis II, l\'Odyssée Lunaire »\n'
    "> Huit des dix formules de cet acte volent pour de bon dans un dossier voisin. Vis-viva,\n"
    "> orbite & libération, Newton, Tsiolkovsky, la puissance d'échappement, l'inverse du carré et\n"
    "> Fourier sont les équations du programme Artemis :\n"
    "> [[01 — Chapitre 1 — Genèse et histoire, d'Apollo à Artemis|Chapitre 1 — D'Apollo à Artemis]].\n"
    "> Et le [[01 — Acte I — Espace & mécanique#Transfert de Hohmann|transfert de Hohmann]] se regarde\n"
    "> s'exécuter, minute par minute, dans\n"
    "> [[08 — Sam prend l'antenne — Le voyage en vingt minutes|la simulation que Sam déroule en direct]].\n",
    MARK3,
))

# ── XIV Acte II → III (électrolyse) ──
P.append((
    D14 / "02 — Acte II — Atome & quantique.md",
    f'> [!tip] {MARK} III « Artemis II, l\'Odyssée Lunaire »\n'
    "> L'**électrolyse de l'eau** a un débouché très concret à 384 000 km d'ici : c'est le cœur de\n"
    "> l'**ISRU**, qui veut fabriquer sur la Lune l'oxygène et le carburant qu'on n'aura pas à y\n"
    "> emporter. Un kilogramme de glace polaire y devient 0,11 kg d'hydrogène et 0,89 kg d'oxygène :\n"
    "> [[01 — Chapitre 1 — Genèse et histoire, d'Apollo à Artemis|Chapitre 1 — D'Apollo à Artemis]].\n",
    MARK3,
))

# ── XXV → III (retour) ──
P.append((
    D25 / "01 — Acte I — Transformer la chaleur en travail.md",
    f'> [!tip] {MARK} III « Artemis II, l\'Odyssée Lunaire »\n'
    "> Le moteur thermique a aussi une version qui décolle. Les quatre **RS-25** du SLS brûlent de\n"
    "> l'hydrogène et de l'oxygène liquides pour arracher 2 600 tonnes à la gravité — et leur mérite\n"
    "> se chiffre en **impulsion spécifique** (452 s dans le vide), qui est au fusée ce que le\n"
    "> rendement est à la machine à vapeur :\n"
    "> [[07 — Chapitre 7 — Le pas de tir LC-39B et le lancement|Chapitre 7 — Le pas de tir LC-39B]].\n",
    MARK3,
))

# ── VII → III (retour, formulaire) ──
P.append((
    D7 / "Formulaire — les formules du langage des champs.md",
    f'> [!tip] {MARK} III « Artemis II, l\'Odyssée Lunaire »\n'
    "> Le gradient a un emploi de terrain dans le bouclier thermique d'Orion : la **loi de Fourier**\n"
    "> $\\vec q=-k\\vec\\nabla T$ dit que le flux de chaleur est un champ de vecteurs qui dévale le\n"
    "> gradient de température — exactement le « moins gradient » de la fiche 3, appliqué à une\n"
    "> capsule qui rentre à 40 000 km/h :\n"
    "> [[Formulaire — les formules d'Artemis II|le formulaire d'Artemis II]].\n",
    MARK3,
))


def main() -> None:
    print("Passerelles :")
    n = 0
    for path, block, marker in P:
        if insert_before_footer(path, block, marker):
            n += 1
    print(f"\n{n} passerelles posées sur {len(P)} prévues.")


if __name__ == "__main__":
    main()
