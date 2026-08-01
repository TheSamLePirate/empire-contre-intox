# Images à générer — Dossier XXVII « L'Ordinateur de 1983 »

Toutes les images vont dans `samlepirate/ordinateur-1983/assets/`.

**Charte visuelle commune** — identité « Codex scientifique impérial » d'Empire
contre Intox, déclinée en **registre technique / rétro-informatique** :

- Dominante **nuit profonde** (#050811 → #0e1a2e), atmosphère cérémonielle,
  planche gravée de codex scientifique.
- Accent maître **or** (#d6ac55 / #f3d98a) — filets, encadrements, inscriptions.
- Accents secondaires : **vert phosphore CRT** (#6ee7a0) pour tout ce qui « brille
  comme un écran de 1983 », et **bleu signal** (#60a5fa) pour les fils actifs
  (c'est exactement la couleur des fils qui portent un `1` dans le simulateur).
- Rendu : **illustration/gravure de codex**, semi-réaliste, macro-photographique
  quand il s'agit de silicium, lumière volumétrique douce, grain léger, léger
  effet de scanline/phosphore là où c'est pertinent.
- **Pas** de texte incrusté, pas de lettres lisibles, pas de logo, pas de
  watermark, pas de marque d'ordinateur réelle identifiable, pas de visage.
- Zone sombre réservée (tiers gauche du hero) pour superposer du texte clair.
- Aucune image ne doit ressembler à une capture d'écran d'interface moderne :
  on veut de la **matière** (silicium, cuivre, verre, phosphore), pas des fenêtres.

---

## 1. `ordinateur-1983-hero.png` — Image héro (et vignette d'index)

**Format :** paysage large, ~2400×1500 px (ratio ~16:10), tiers gauche sombre.

**Prompt :**
> Cinematic codex plate: a small 1980s home computer, seen three-quarters in deep
> darkness, dissolving on its right side into a vast luminous lattice of logic
> gates and etched circuit traces that extend like a cathedral vault into the
> background. Deep midnight blue-black palette (#050811 to #0e1a2e), master
> accent antique gold (#d6ac55) on the engraved frame lines and the machine's
> edges, CRT phosphor green (#6ee7a0) glowing softly from the screen and from the
> distant gate lattice, electric signal blue (#60a5fa) running along a few active
> traces like current. Faint engraved grid and star field in the background.
> Volumetric soft light, fine film grain, high detail, elegant and reverent, like
> a scientific engraving reinterpreted in light. The left third stays very dark
> and uncluttered for overlaid title text. No text, no readable letters, no logo,
> no watermark, no brand.

---

## 2. `ordinateur-1983-transistor.png` — Chapitre « Le bit et l'interrupteur »

**Format :** 16:9, ~2000×1125 px.

**Prompt :**
> Extreme macro codex plate of a single semiconductor switch: a stylised
> transistor rendered as a polished gate of dark silicon and gold contacts,
> sitting on a wafer surface whose etched geometry recedes into darkness. One
> incoming trace glows electric blue (#60a5fa) and stops at the gate; a second
> trace beyond it is dark, showing the switch is closed or open. Midnight
> background (#050811), antique gold (#d6ac55) rim light on the metal contacts,
> a faint phosphor green (#6ee7a0) haze in the far background. Volumetric light,
> shallow depth of field, fine grain, engraved-plate elegance. No text, no logo,
> no watermark.

---

## 3. `ordinateur-1983-additionneur.png` — Chapitre « Compter : l'additionneur »

**Format :** 16:9, ~2000×1125 px.

**Prompt :**
> Codex engraving of an eight-stage ripple-carry adder rendered as an
> architectural frieze: eight identical golden modules aligned left to right,
> each a small engraved pavilion of XOR/AND/OR symbols, linked by a single
> continuous carry line that runs through all eight and grows brighter as it
> travels, ending in a flare at the far end. Deep midnight background, antique
> gold (#d6ac55) structure lines, electric signal blue (#60a5fa) for the
> propagating carry, faint phosphor green (#6ee7a0) glow underneath. Symmetrical,
> ceremonial, like a plate from an 18th-century treatise on machines but lit by
> electricity. Volumetric light, fine grain. No text, no numbers, no logo,
> no watermark.

---

## 4. `ordinateur-1983-memoire.png` — Chapitre « Se souvenir »

**Format :** 16:9, ~2000×1125 px.

**Prompt :**
> Codex plate of digital memory: a vast regular grid of tiny cells receding into
> darkness, like an engraved honeycomb of storage. In the foreground, one single
> cell is opened and magnified, revealing two cross-coupled gates facing each
> other in a closed loop of light — a ring of current chasing itself, the visual
> metaphor of a bit that remembers. Midnight palette, antique gold (#d6ac55)
> engraved cell borders, phosphor green (#6ee7a0) for the trapped circulating
> light, electric blue (#60a5fa) on the write line entering the cell.
> Volumetric soft light, fine grain, hypnotic symmetry. No text, no logo,
> no watermark.

---

## 5. `ordinateur-1983-architecture.png` — Chapitre « Architecture de la machine »

**Format :** 16:9, ~2000×1125 px.

**Prompt :**
> Codex architectural plate of a von Neumann machine drawn as a temple floor
> plan seen in three-quarter perspective: on the left a tall narrow tower
> (the program counter) with a stair of light climbing it, in the centre a long
> vaulted hall of identical cells (the memory), on the right a heavy octagonal
> forge glowing hot (the arithmetic unit), and below, a row of five small annexes
> (the peripherals). Golden engraved lines define the plan; a single luminous
> circuit of electric blue (#60a5fa) flows from the tower through the hall to the
> forge and loops back, showing the fetch-decode-execute cycle as a closed
> processional path. Deep midnight background, phosphor green (#6ee7a0)
> highlights in the annexes. Ceremonial, precise, awe-inspiring. No text, no
> labels, no logo, no watermark.

---

## 6. `ordinateur-1983-terminal.png` — Chapitre « Le système / le disque »

**Format :** 16:9, ~2000×1125 px.

**Prompt :**
> Codex plate of a phosphor terminal in a dark room: an amber-free, pure green
> CRT screen (#6ee7a0) seen slightly from the side, its glass curved, scanlines
> visible, glowing onto a golden engraved frame and onto a stack of small storage
> platters beside it. The screen shows only abstract glowing horizontal light
> bars — never readable characters. Behind the terminal, an engraved schematic of
> a filesystem directory drawn as a golden tree of nested rectangles fading into
> the midnight background. Electric blue (#60a5fa) accents on the cable running
> to the disk. Volumetric light, dust in the beam, fine grain, nostalgic and
> reverent. No text, no readable letters, no logo, no watermark.

---

## Après génération

1. Vérifier visuellement chaque image (charte, absence de texte incrusté).
2. Le hero est déjà câblé (CSS `--hero` + carte d'index + fiches `sources.html`).
   Les 5 autres sont intégrées en `<figure class="chapter-figure">` dans leur
   chapitre.
3. Optimiser : `scripts/optimize-pngs.sh samlepirate/ordinateur-1983/assets/`.
