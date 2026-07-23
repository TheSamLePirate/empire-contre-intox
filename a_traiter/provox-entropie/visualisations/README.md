# Visualisations interactives du dossier « Entropie »

Bibliothèque React autonome préparée avant l’intégration au futur dossier. Les modules sont numérotés `V1` à `V26` selon `../entropie-plan.md` et exposés par `index.ts`.

## Contrat

- Chaque visualisation est un composant React sans dépendance de routage.
- Les calculs scientifiques réutilisables se trouvent dans `shared/`.
- Les styles sont isolés sous la racine `.entropy-gallery`.
- Chaque module expose la question étudiée, les contrôles utiles, les valeurs vivantes et la limite du modèle.
- Les générateurs aléatoires acceptent une graine pour reproduire une expérience.
- Les graphiques sont en SVG ou en HTML/CSS ; aucun appel réseau n’est nécessaire.
- L’interface adopte l’identité scientifique nocturne ECI : grille discrète, typographie éditoriale, accents dorés, états actifs contrastés et repli responsive jusqu’à 320 px.
- Les grandeurs sont accompagnées d’unités, d’axes, de bilans ou de probabilités lorsque le modèle le permet ; les proxies restent explicitement distingués des grandeurs physiques.

## Intégration future

Importer `styles.css` une fois dans la page hôte, puis importer le composant souhaité depuis `index.ts`. La galerie de prévisualisation assemble tous les modules sans les inscrire dans la navigation ou l’index public du site.

```tsx
import "./visualisations/styles.css";
import { V09EinsteinSolids } from "./visualisations";

export function Exemple() {
  return (
    <div className="entropy-gallery">
      <V09EinsteinSolids seed={42} />
    </div>
  );
}
```

Pour une prévisualisation éditoriale, importer `EntropyVisualizationsGallery`. Le sélecteur s’appuie sur `entropyVisualizations`, le registre ordonné de V1 à V26.

## Répartition des modules

- V1–V6 : flèche du temps, machines et thermodynamique classique.
- V7–V11 : micro-états, distributions et fluctuations statistiques.
- V12–V16 : production locale, phases, exergie, vivant et Ising.
- V17–V21 : Shannon, démon de Maxwell, Landauer, quantique et granularité de description.
- V22–V25 : gravitation, trous noirs et cosmologie.
- V26 : carte de synthèse des principales notions d’entropie.

## Validation effectuée

- compilation TypeScript stricte des 26 composants ;
- tests numériques des fonctions partagées ;
- contrôle de l’ordre et de l’unicité V1–V26 ;
- rendu statique de chaque composant et présence de sa limite de modèle ;
- contrôle manuel des états interactifs et du rendu responsive de V1, V9, V18 et V26 ;
- seconde passe de contrôle après enrichissement sur V1, V3, V17, V20, V23 et V26, dont un test à 390 px sans débordement horizontal ;
- absence d’erreur dans la console lors de la prévisualisation.

Commandes reproductibles depuis la racine du projet :

```sh
npx tsc -p a_traiter/provox-entropie/visualisations/tsconfig.json
npm test -- --run tests/entropy-visualizations.test.ts
```
