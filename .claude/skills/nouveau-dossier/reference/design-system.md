# Système de design — Codex scientifique impérial (Voie A)

Référence opérationnelle pour les pages de dossier. Le système complet est décrit
dans `AGENT.md` (« Style visuel ») ; ce fichier rassemble les éléments qu'on
**copie/colle** et les pièges qu'on a appris à éviter.

> **Méthode la plus rapide et la plus fiable :** copier le `<style>` complet et la
> structure d'un dossier récent et abouti — **`ymir-lalie/esclavage/index.html`**
> (le plus évolué : framework codex + figures + dataviz) ou
> `ymir-lalie/ancetres-genetiques/index.html` — puis adapter les **accents
> secondaires** et le contenu. Ne pas réécrire le CSS de zéro.

---

## 1. Jetons de couleur (`:root`)

```css
--void:#050811; --abyss:#070c1a; --navy:#0e1a2e;
--ink:#f4ecd8; --parch:#e7dcc1; --muted:#c0b59a; --soft:#8f8c78;
--gold:#d6ac55; --gold-bright:#f3d98a; --gold-deep:#9c7228;
--line:rgba(214,172,85,.20);   /* filets or */
--line-2:rgba(244,236,216,.10); /* filets neutres */
--glass:rgba(7,12,26,.72);
--shadow:0 40px 120px rgba(0,0,0,.55);
--serif:"Fraunces",Georgia,"Times New Roman",serif;   /* corps */
--roman:"Cinzel",Georgia,serif;                       /* titres/labels/nav, MAJUSCULES */
--max:1180px; --ease:cubic-bezier(.22,1,.36,1);
--hero:url("assets/<nom>-hero.png");
```

Polices (Google Fonts) :
`Cinzel:wght@400;500;600;700;800;900` + `Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600`.
**INTERDITS :** Inter, Roboto, Arial, Space Grotesk, polices système.

### Accent(s) secondaire(s) — UN par dossier, en écho au hero
Chaque dossier ajoute 1 (parfois 2–3) accents thématiques. Exemples réels :
- Édiacarien : `--verd #3a8f86`, `--algae #9fbf6e`
- Ancêtres génétiques : `--helix #4aa6b8`, `--rose #d78a8a`
- Politique 2026 : `--civic #5b8fb0`, `--rep #c76b62`, gauche/droite codés couleur
- Esclavage : `--ocean #3f6b78`, `--ember #b3503e`, `--iron #7c8794`

Les encadrés (`.science-block`, `.question-block`…) reprennent ces accents.

---

## 2. Structure de page (ordre)

```
.atmos / .grain / .frame / .progress-top      (atmosphère fixe)
header.hero (#top)   eyebrow « Dossier N · … » + h1 .foil + lead + actions + signal-board
nav.topbar (sticky)  sceau ECI + lien Accueil + nav ancres + .progress + mobile-menu
main#transcription
  section.intro-band (#…)        manifesto + timeline (fil conducteur)
  section.learning-panel          3 objectifs pédagogiques
  [VISUEL pleine largeur optionnel : frise interactive…]
  [section.act-band si dossier multi-parties → « Partie I/II/III »]
  section.chapter (×N)            chapter-head (kicker + h2 + chapter-number) + .transcript (.prose + aside.side-note)
  section.credit-band             avatars + « Réalisé par … »   (après le sommaire)
  …chapitres…
  section.closing                 phrase de clôture
  section.collective-footer       sceau ECI + texte + actions + devise « Veritas omnia vincit »
footer > main                     note technique courte
script                            progression + nav active + mobile menu + REVEAL (voir §4)
```

Composants prêts (classes) : `.script-block`, `.science-block` (accent), `.question-block`
(accent), `.lesson-block`, `.dialogue-block` (citations orales du live), `.article-noir`
(articles de loi cités), `.dtable` (tableaux), `.pillar` (sommaire), `.chapter-figure`
(image + figcaption), `.sub` (sous-titres), `.group-title`.

**Encadré « Anti-intox »** = un `.science-block` (ou `.side-note`) qui porte les
**nuances vérifiées** (fourchettes, dates exactes, « estimation », corrections de
coquilles) SANS modifier le texte transcrit.

---

## 3. Chemins relatifs (depuis `equipe/<dossier>/index.html`)

| Cible | Depuis `equipe/dossier/` (folder) | Depuis `equipe/page.html` (fichier) |
|---|---|---|
| Index racine | `../../index.html` | `../index.html` |
| Sceau ECI | `../../ymir-lalie/assets/logo-eci.jpg`* | `../ymir-lalie/assets/logo-eci.jpg` |
| Avatars (copiés dans le dossier) | `lalie.jpeg`, `ymir.jpeg`, … | `../lalie.jpeg` |
| Hero / images | `assets/<nom>-hero.png` | `assets/<nom>-hero.png` |
| Sources | `../../sources/sources.html` | `../sources/sources.html` |

\* Si le dossier est dans `ymir-lalie/<dossier>/`, le sceau est à `../assets/logo-eci.jpg`.
**Toujours** copier les avatars de l'équipe dans le dossier (ne pas pointer ailleurs).

---

## 4. ⚠️ CORRECTIF CRITIQUE — révélation au défilement des sections hautes

Le bug qui nous a piégés : l'`IntersectionObserver` avec `threshold: 0.12` ne se
déclenche **jamais** sur une section plus haute que ~8× la fenêtre (un chapitre
qui contient tout un transcript). Résultat : la section reste à `opacity:0` →
**invisible**. Toujours utiliser ce JS (threshold **0** + filet de sécurité) :

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { threshold: 0, rootMargin: "0px 0px -6% 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Filet de sécurité : toute section .reveal restée masquée dont le haut a
// dépassé 90 % de la fenêtre est révélée (cas des sections très hautes).
function revealTall() {
  const vh = window.innerHeight;
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
    if (el.getBoundingClientRect().top < vh * 0.9) { el.classList.add("in"); io.unobserve(el); }
  });
}
document.addEventListener("scroll", revealTall, { passive: true });
window.addEventListener("resize", revealTall, { passive: true });
revealTall();
```

Et garder le `@media (prefers-reduced-motion:reduce)` qui force `.reveal{opacity:1}`.

**Vérifier en navigateur** (Chrome headless via playwright-core, channel:'chrome')
que les chapitres les plus hauts reçoivent `.in` et `opacity:1`.

---

## 5. Dataviz SVG interactives (optionnel mais fort)

On peut illustrer le propos avec des SVG faits main, **dans le langage codex** et
**factuellement exacts**. Patterns éprouvés (cf. esclavage) :

- **Carte / réseau cliquable** (commerce triangulaire) : nœuds + jambes (path) ;
  une `path.hit` transparente large pour cliquer, une `path.route` visible, une
  `path.flow` (dash animée). JS : `.active` sur la jambe + carte + panneau détail.
- **Frise chronologique** : nœuds générés en JS, bande de fond segmentée (couleur =
  état réel par intervalle), `data` = `{année, type, titre, desc}`.
- **Graphique en barres** : valeurs **qualitatives** clairement étiquetées si les
  chiffres exacts varient.
- **Schéma à curseur** (plan du Brookes) : un toggle modifie un paramètre et
  recalcule l'affichage — sert à rendre un encadré « anti-intox » interactif.

Règles : `role`/`tabindex`/`focus` pour l'accessibilité ; couper les animations en
`prefers-reduced-motion` ; aucune dépendance externe ; sujets sensibles =
**représentation abstraite et digne** (jamais de corps suppliciés, jamais de gore) ;
toujours une légende de source + une note « schématique / qualitatif » si simplifié.
CSS/JS de référence : copier depuis `ymir-lalie/esclavage/index.html` (blocs `.viz`).

---

## 6. Règles de contenu & dignité

- Transcription **visible et intégrale** ; jamais réduite à un résumé.
- Ne pas corriger le texte transcrit (sauf coquilles évidentes : `$CO_2$`→CO₂,
  accents, espaces, fautes de frappe manifestes) — **signaler** ces corrections.
- Préfixes de numérotation et libellés de titres : **garder le verbatim** (c'est
  ce qui fait échouer `check-coverage.py`).
- Marqueurs de prudence : fourchettes, « probablement », « selon les estimations ».
- Sujets sensibles (esclavage, mémoire, religion, politique) : registre **grave,
  respectueux, non moralisateur, non partisan** ; encadrés « anti-intox » factuels.
