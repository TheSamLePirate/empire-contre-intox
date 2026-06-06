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

---

## 7. ⚠️ OBLIGATOIRE — Formules mathématiques en LaTeX (KaTeX), écrites ET expliquées

**Règle :** dès qu'un dossier énonce, rappelle ou a besoin d'expliquer une formule
(équation prononcée à l'oral — « E égale m c carré » —, loi physique, réaction
chimique, relation utile à rappeler), elle doit être **rendue en vrai LaTeX via
KaTeX** *et* **expliquée** (variables + sens physique). Jamais de formule laissée
en texte brut ASCII/Unicode (`P = (1/2) m_dot v_e²`, `dP/dV = |ψ|²`) : on la
typographie. Deux niveaux :

- **inline** `.imath` — une formule glissée au fil de la phrase (à l'endroit exact
  où l'oral la prononce) ;
- **bloc expliqué** `.formula-block` — une stèle gravée (titre + formule(s) en
  display + note explicative) pour chaque formule importante, à sa **première
  occurrence**. Les occurrences suivantes peuvent rester en `.imath`.

Exemple de référence déjà livré : `provoxys/Artemis2.html` (Voie B, accents orange)
et `jorge-zalex/elements.html` (Voie A, accents or).

### a) Charger KaTeX (dans le `<head>`, après les Google Fonts)
```html
<!-- KaTeX — rendu des vraies formules mathématiques -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" crossorigin="anonymous"></script>
```

### b) Script de rendu (juste avant `</body>`)
```html
<script>
  function renderMath() {
    document.querySelectorAll(".imath[data-tex], .formula[data-tex]").forEach((node) => {
      const tex = node.getAttribute("data-tex");
      const display = node.classList.contains("formula");
      if (window.katex) {
        try { katex.render(tex, node, { throwOnError: false, displayMode: display }); return; }
        catch (e) { /* repli ci-dessous */ }
      }
      node.textContent = tex; // repli lisible si KaTeX indisponible
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderMath);
  else renderMath();
  window.addEventListener("load", renderMath); // filet de sécurité (CDN lent)
</script>
```

### c) CSS — Voie A (codex/or). En Voie B, remplacer `--gold*` par les accents de la page hôte.
```css
/* Inline : formule au fil du texte */
.imath { display:inline-block; line-height:1; vertical-align:-.16em; }
.imath .katex { font-size:1.02em; color:var(--gold-bright); }
.imath:empty { display:none; }
/* Bloc « stèle gravée » : formule rappelée ou expliquée */
.formula-block { margin:26px 0; position:relative; border:1px solid var(--line); border-radius:3px; overflow:hidden;
  background:
    radial-gradient(120% 140% at 0% 0%, rgba(214,172,85,.12), transparent 55%),
    radial-gradient(120% 140% at 100% 100%, rgba(95,210,230,.07), transparent 55%),
    linear-gradient(180deg, rgba(14,26,46,.58), rgba(7,12,26,.66));
  box-shadow:var(--shadow); }
.formula-block::before { content:""; position:absolute; inset:0; pointer-events:none;
  background-image:linear-gradient(rgba(214,172,85,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(214,172,85,.05) 1px, transparent 1px);
  background-size:38px 38px; opacity:.5; }
.formula-block > * { position:relative; z-index:1; }
.formula-block .fb-head { display:flex; align-items:center; gap:12px; padding:11px 22px; border-bottom:1px solid var(--line);
  background:rgba(5,8,17,.42); font-family:var(--roman); font-size:.62rem; font-weight:700; letter-spacing:.24em; text-transform:uppercase; color:var(--gold); }
.formula-block .fb-head::before { content:"ƒ"; display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; flex:none;
  border:1px solid var(--gold); border-radius:50%; font-family:var(--serif); font-style:italic; font-size:13px; letter-spacing:0; color:var(--gold-bright); background:rgba(214,172,85,.08); }
.formula-block .fb-head .fb-tag { margin-left:auto; color:var(--soft); letter-spacing:.14em; }
.formula { display:block; margin:0; padding:24px 22px; text-align:center; overflow-x:auto; }   /* cible KaTeX display */
.formula .katex { font-size:1.42rem; color:var(--gold-bright); }
.formula + .formula { padding-top:0; }
.formula:empty { display:none; }
.formula-block .fb-note { padding:2px 22px 18px; margin:0; font-family:var(--serif); font-size:.96rem; line-height:1.62; color:var(--muted); }
.formula-block .fb-note b { color:var(--ink); font-weight:600; }
.formula-block .fb-note .imath .katex { font-size:1em; color:var(--quanta); }
@media (max-width:640px){ .formula .katex{ font-size:1.12rem; } .formula-block .fb-head{ padding:10px 16px; } .formula,.formula-block .fb-note{ padding-left:16px; padding-right:16px; } }
```

### d) Markup
```html
<!-- inline, à l'endroit exact où l'oral prononce la formule -->
… la puissance se calcule par <span class="imath" data-tex="P=\tfrac12\,\dot m\,v_e^{2}"></span> où …

<!-- bloc expliqué (titre + 1..n formules display + note variables/sens) -->
<div class="formula-block">
  <div class="fb-head">Équation de vis-viva <span class="fb-tag">Mécanique orbitale</span></div>
  <div class="formula" data-tex="v=\sqrt{\mu\left(\dfrac{2}{r}-\dfrac{1}{a}\right)}"></div>
  <p class="fb-note">Vitesse <b>v</b> à la distance <b>r</b>, sur une orbite de demi-grand axe <b>a</b>,
     avec <span class="imath" data-tex="\mu=GM"></span> le paramètre gravitationnel. …</p>
</div>
```
- `katex.render` **remplace** le contenu du nœud : le titre/la note vont dans
  `.fb-head` / `.fb-note` (frères), **jamais** dans le `.formula[data-tex]`.
- Note **fidèle** : n'expliquer que des valeurs présentes dans le transcript ou des
  constantes standard ; ne jamais inventer un chiffre. Si la page d'origine porte
  une coquille de formule, la **corriger** et la signaler (cf. §6).

### e) Vérifier (obligatoire) — 0 erreur de rendu
```bash
# équilibrage accolades + \left/\right (rapide)
python3 - <<'PY'
import re,html
s=open("<equipe>/<dossier>/index.html",encoding="utf-8").read()
for t in re.findall(r'data-tex="([^"]*)"',s):
    u=html.unescape(t)
    assert u.count("{")==u.count("}"), u
print("accolades OK")
PY
# rendu réel de CHAQUE expression (échoue si une formule est invalide)
cd /tmp && mkdir -p kx && cd kx && npm i katex@0.16.11 --no-save --silent && node -e '
const fs=require("fs"),katex=require("katex");
const s=fs.readFileSync(process.argv[1],"utf8");
const dec=t=>t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,"\"");
let n=0,bad=0;for(const m of s.matchAll(/data-tex="([^"]*)"/g)){n++;try{katex.renderToString(dec(m[1]),{throwOnError:true});}catch(e){bad++;console.log("FAIL:",m[1]);}}
console.log(`rendered ${n}, ${bad} failures`);' <chemin absolu>/index.html
```
Boucler jusqu'à **0 failure**. `check-coverage.py` reste vert : `data-tex` est un
attribut, son contenu n'est pas du texte rendu — le verbatim transcrit autour reste
intact (on **enveloppe** la formule, on ne la supprime pas).

### f) Aide-mémoire LaTeX (constructions KaTeX éprouvées sur ces dossiers)
`\dfrac{a}{b}` · `\tfrac12` · `\sqrt{}` · `x^{2}` `x_{n}` · `\Delta v` · `\propto`
· `\rightarrow` `\Longrightarrow` `\xrightarrow{\ \text{électrolyse}\ }` ·
indices nucléaires `{}^{A}_{Z}\mathrm{X}` · `\bar{\nu}_e` · `\hat{H}\psi=E\psi` ·
`\bigl|\psi\bigr|^{2}` · `\sum_{\ell=0}^{n-1}` · `\underbrace{…}_{\text{…}}` ·
`\mathrm{kg}` pour les unités · décimales françaises `931{,}5` (la virgule entre
accolades garde l'espacement correct). Lettres grecques : `\mu \nu \lambda \psi
\alpha \beta \gamma \Phi \Omega`.
