#!/usr/bin/env python3
# Les schémas SVG du dossier sont interactifs et ne survivent pas au Markdown.
# On rend en Mermaid les trois qui sont *structurels* (câblage figé, pas d'état).
import os, json

VAULT = '/Users/olivierveinand/Documents/Obsidian Vault'
OUT = os.path.join(VAULT, 'Empire contre Intox', 'Dossier XXVII — Ordinateur 1983')
D = json.load(open('/tmp/xxvii-data.json', encoding='utf-8'))
CH = {c['n']: c['file'] for c in D['chapters']}

BLOCS = {
3: ('''> [!note] 🗺️ Les trois montages, en schéma
> Le câblage exact des trois reconstructions — chaque boîte est un **NON-ET**, et rien d'autre.

```mermaid
flowchart LR
  subgraph NON["L'inverseur · 1 porte"]
    A1(["A"]) --> D1["NON-ET"]
    A1 --> D1
    D1 --> S1(["NON A"])
  end
  subgraph ET["Le ET · 2 portes"]
    A2(["A"]) --> D2["NON-ET"]
    B2(["B"]) --> D2
    D2 --> D3["NON-ET<br/>(en inverseur)"]
    D3 --> S2(["A ET B"])
  end
  subgraph OU["Le OU · 3 portes"]
    A3(["A"]) --> D4["NON-ET<br/>(en inverseur)"]
    B3(["B"]) --> D5["NON-ET<br/>(en inverseur)"]
    D4 --> D6["NON-ET"]
    D5 --> D6
    D6 --> S3(["A OU B"])
  end
```
''', '**L\'inverseur** — on branche la même entrée'),

4: ('''> [!note] 🗺️ L'additionneur complet, en schéma
> Les **cinq** portes réellement présentes dans le code du simulateur — deux OU-X, deux ET, un OU. C'est le décompte du code, pas celui de sa documentation.

```mermaid
flowchart LR
  A(["A"]) --> X1["OU-X"]
  B(["B"]) --> X1
  X1 --> X2["OU-X"]
  CIN(["Cin"]) --> X2
  X2 --> S(["S — la somme"])
  X1 --> E1["ET"]
  CIN --> E1
  A --> E2["ET"]
  B --> E2
  E1 --> O1["OU"]
  E2 --> O1
  O1 --> COUT(["Cout — la retenue"])
```

> [!note] 🗺️ La chaîne de retenue, en schéma
> Huit additionneurs complets bout à bout : la retenue sortante de chacun devient la retenue entrante du suivant. C'est pourquoi le bit 7 attend les sept étages précédents.

```mermaid
flowchart LR
  CIN(["Cin = 0"]) --> B0["bit 0"] --> B1["bit 1"] --> B2["bit 2"] --> B3["…"] --> B7["bit 7"] --> COUT(["Cout — le débordement"])
```
''', 'Huit étages, une retenue qui traverse'),

9: ('''> [!note] 🗺️ L'architecture de von Neumann, en schéma
> Une **mémoire unique** qui contient à la fois le code et les données — c'est là toute l'idée, et toutes ses conséquences.

```mermaid
flowchart LR
  MEM[("Mémoire — 8 192 octets<br/>code ET données")]
  PC["PC — compteur ordinal"]
  IR["IR — registre d'instruction"]
  DEC["Décodeur"]
  ALU["ALU"]
  AB["Registres A et B"]
  FL["Drapeaux Z · C · N"]
  IO["Console · écran · disque · réseau"]
  PC -->|adresse| MEM
  MEM -->|opcode| IR --> DEC
  DEC --> ALU
  DEC --> PC
  AB <--> ALU
  ALU --> FL
  FL --> DEC
  AB <--> MEM
  AB --> IO
```

> [!note] 🗺️ La boucle éternelle, en schéma
> Chercher, décoder, exécuter, avancer — et recommencer jusqu'au `HLT`.

```mermaid
flowchart LR
  F["1 · Chercher<br/>lire MEM[PC]"] --> D["2 · Décoder<br/>quelle instruction ?"]
  D --> E["3 · Exécuter<br/>calculer, ranger, sauter"]
  E --> A["4 · Avancer<br/>PC += taille"]
  A --> F
  E -.->|"HLT"| H(["Arrêt"])
  E -.->|"saut : PC ← cible"| F
```
''', 'La boucle éternelle'),
}

for n, (bloc, after) in BLOCS.items():
    p = os.path.join(OUT, CH[n] + '.md')
    t = open(p, encoding='utf-8').read()
    if '```mermaid' in t:
        print('   = déjà présent :', CH[n]); continue
    i = t.find(after)
    if i < 0:
        print('   ! ancre introuvable dans', CH[n], '→', after[:40]); continue
    # on insère juste avant le paragraphe/titre qui porte l'ancre
    j = t.rfind('\n\n', 0, i)
    t = t[:j] + '\n\n' + bloc.rstrip() + t[j:]
    open(p, 'w', encoding='utf-8').write(t)
    print('   +', CH[n], f'({bloc.count("```mermaid")} diagramme(s))')
