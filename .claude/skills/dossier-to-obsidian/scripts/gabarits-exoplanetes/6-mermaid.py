#!/usr/bin/env python3
"""Dossier XVII — deux diagrammes Mermaid, là où un atelier interactif a été perdu.

La page ne contient aucune figure SVG (toutes ses illustrations sont des PNG, donc
reprises telles quelles). Ce qui ne survit pas au Markdown, ce sont les **six ateliers
interactifs**. Deux d'entre eux portaient une idée structurante que Mermaid peut rendre :

  · la chaîne « détecter → mesurer → caractériser » (ateliers transit + vitesses
    radiales + spectre) → note 09, « Vue d'ensemble » ;
  · le bestiaire des mondes rangés par rayon (atelier masse-rayon) → note 07.

Aucune donnée n'est inventée : les seuils (1,2 / 2 / 4 R⊕, creux à 1,5–2,0 R⊕) et les
exemples viennent du texte du dossier et de ses tableaux.

À lancer APRÈS 1-dossier.py (qui réécrit les notes). Idempotent.
"""
from __future__ import annotations

from pathlib import Path

OUT = Path("/Users/olivierveinand/Documents/Obsidian Vault/Empire contre Intox/Dossier XVII — Mondes Lointains")
MOC = "Dossier XVII — Atmosphères & Mondes Lointains"
MARK = "%% eci-mermaid"

CHAINE = """## Schéma — la chaîne de l'exoplanétologie

*Ce que chaque méthode livre, et ce qu'il faut en croiser pour obtenir une composition.
Le schéma remplace ici les ateliers interactifs de la page, qui ne survivent pas au Markdown.*

```mermaid
%% eci-mermaid · chaine
flowchart LR
  S["Une étoile,<br/>un point de lumière"]

  S --> T["Transit<br/><i>la lumière baisse</i>"]
  S --> V["Vitesses radiales<br/><i>l'étoile tangue</i>"]
  S --> I["Imagerie directe<br/><i>on masque l'étoile</i>"]
  S --> M["Microlentille<br/><i>l'étoile-loupe</i>"]

  T --> R["Rayon<br/>profondeur = (Rp/R*)²"]
  T --> P["Période orbitale"]
  V --> Mm["Masse minimale<br/>M·sin i"]
  I --> Ph["Spectre de la planète<br/><i>jeunes géantes éloignées</i>"]
  M --> Va["Planètes vagabondes<br/><i>sans étoile hôte</i>"]

  R --> D["Masse vraie + rayon<br/>= densité"]
  Mm --> D
  D --> Co["Composition d'ensemble<br/>fer · roche · eau · H/He"]

  T --> Tr["Spectroscopie de transmission<br/><i>l'atmosphère filtre la lumière</i>"]
  Tr --> Mo["Molécules<br/>CO2 · SO2 · H2O · CH4"]
  T --> Ec["Éclipse secondaire<br/>et courbe de phase"]
  Ec --> Te["Température<br/>et contraste jour / nuit"]

  Mo --> B["Biosignature ?<br/><i>un déséquilibre chimique,<br/>jamais une preuve seule</i>"]
  Te --> B
  Co --> B

  classDef meth fill:#0e1a2e,stroke:#5fb9d4,color:#e7dcc1
  classDef mes fill:#070c1a,stroke:#d6ac55,color:#f4ecd8
  classDef fin fill:#0e1a2e,stroke:#e0883f,color:#f3d98a
  class T,V,I,M meth
  class R,P,Mm,Ph,Va,D,Tr,Ec mes
  class Co,Mo,Te,B fin
```

> [!warning] 🛡 Ce que le schéma ne dit pas
> Une **biosignature** n'est jamais une preuve à elle seule : c'est un indice, typiquement un
> déséquilibre chimique. Le cas du **DMS de K2-18 b** le rappelle — signal faible, contesté,
> non confirmé par des réanalyses indépendantes.
"""

BESTIAIRE = """## Schéma — le bestiaire des mondes, rangé par rayon

*L'atelier masse-rayon de la page est interactif et se perd en Markdown ; voici sa leçon,
avec les seuils et les exemples du dossier.*

```mermaid
%% eci-mermaid · bestiaire
flowchart TB
  R["Rayon mesuré<br/>en rayons terrestres (R⊕)"]

  R --> A["&lt; 1,2 R⊕<br/><b>Tellurique</b>"]
  R --> B["1,2 à 2 R⊕<br/><b>Super-Terre</b>"]
  R --> C["2 à 4 R⊕<br/><b>Mini-Neptune / sous-Neptune</b>"]
  R --> D["&gt; 4 R⊕<br/><b>Géante</b>"]

  A --> A1["TRAPPIST-1 e — 0,92<br/>TOI-700 d — 1,07<br/>Kepler-186 f — 1,17<br/>Proxima b — ~1,0 (estimé)"]
  B --> B1["TOI-715 b — 1,55<br/>LHS 1140 b — 1,73<br/>55 Cancri e — 1,88"]
  C --> C1["π Mensae c — 2,0<br/>K2-18 b — 2,6<br/>GJ 1214 b — 2,7"]
  D --> D1["Géantes de glace<br/>Neptune 3,88 · Uranus 4,01"]
  D --> D2["Jupiters chauds<br/>51 Peg b · HD 209458 b<br/>WASP-39 b · WASP-121 b"]

  V["<b>La vallée des rayons</b><br/>creux entre 1,5 et 2,0 R⊕<br/><i>Fulton et al. 2017</i>"]
  B -.-> V
  C -.-> V

  classDef petit fill:#0e1a2e,stroke:#5fb9d4,color:#e7dcc1
  classDef grand fill:#0e1a2e,stroke:#e0883f,color:#f3d98a
  classDef ex fill:#070c1a,stroke:#403d34,color:#c0b59a
  classDef val fill:#070c1a,stroke:#d6ac55,color:#f3d98a
  class A,B petit
  class C,D grand
  class A1,B1,C1,D1,D2 ex
  class V val
```

> [!note] Pourquoi cette taille compte
> Le rayon seul ne dit pas de quoi un monde est fait — c'est la **densité**, donc le rayon
> *croisé* à la masse, qui tranche. Mais la seule distribution des rayons révèle déjà une
> structure physique : le creux de la vallée sépare les rocheuses dépouillées de leur
> enveloppe des mondes qui ont gardé la leur. Et il rappelle la correction du dossier :
> **TRAPPIST-1 e n'est pas une super-Terre** — 0,92 R⊕, c'est une taille terrestre.
"""


def insert(path: Path, block: str, marker: str) -> bool:
    t = path.read_text(encoding="utf-8")
    if marker in t:
        print(f"   = déjà posé : {path.name}")
        return False
    i = t.rfind("\n---\n")
    t = (t.rstrip() + "\n\n" + block + "\n") if i == -1 else (t[: i + 1] + block + "\n" + t[i + 1:])
    path.write_text(t, encoding="utf-8")
    print(f"   ✓ {path.name}")
    return True


LIEN = """## Les deux schémas

*Ce que les ateliers interactifs de la page disent, remis en diagrammes.*

- [[09 — Chapitre 9 — Diversité des systèmes & statistiques 2026#Schéma — la chaîne de l'exoplanétologie|La chaîne de l'exoplanétologie]] — ce que chaque méthode livre, et ce qu'il faut croiser.
- [[07 — Chapitre 7 — Super-Terres, mini-Neptunes & rocheuses#Schéma — le bestiaire des mondes, rangé par rayon|Le bestiaire des mondes]] — les familles par rayon, et la vallée qui les sépare.
"""


def main() -> None:
    print("Diagrammes Mermaid :")
    n = 0
    n += insert(OUT / "09 — Chapitre 9 — Diversité des systèmes & statistiques 2026.md",
                CHAINE, f"{MARK} · chaine")
    n += insert(OUT / "07 — Chapitre 7 — Super-Terres, mini-Neptunes & rocheuses.md",
                BESTIAIRE, f"{MARK} · bestiaire")
    p = OUT / f"{MOC}.md"
    t = p.read_text(encoding="utf-8")
    if "## Les deux schémas" not in t:
        p.write_text(t.replace("## Dossiers liés", LIEN + "\n## Dossiers liés", 1), encoding="utf-8")
        print("   ✓ renvoi depuis le MOC")
    print(f"\n{n} diagramme(s) posé(s).")


if __name__ == "__main__":
    main()
