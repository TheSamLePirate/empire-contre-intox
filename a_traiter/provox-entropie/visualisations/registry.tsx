import { V01FlecheDuTemps } from "./components/V01FlecheDuTemps";
import { V02MachineThermique } from "./components/V02MachineThermique";
import { V03CycleCarnotSynchronise } from "./components/V03CycleCarnotSynchronise";
import { V04ExperienceJoule } from "./components/V04ExperienceJoule";
import { V05LaboratoireFrontieres } from "./components/V05LaboratoireFrontieres";
import { V06MelangeCalorimetrique } from "./components/V06MelangeCalorimetrique";
import { V07GrilleConfigurations } from "./components/V07GrilleConfigurations";
import { V08DeuxCompartiments } from "./components/V08DeuxCompartiments";
import { V09EinsteinSolids } from "./components/V09EinsteinSolids";
import { V10GibbsDistribution } from "./components/V10GibbsDistribution";
import { V11Fluctuations } from "./components/V11Fluctuations";
import { V12ProductionLocale } from "./components/V12ProductionLocale";
import { V13ChangementsPhase } from "./components/V13ChangementsPhase";
import { V14ExergieSankey } from "./components/V14ExergieSankey";
import { V15OrganismeOuvert } from "./components/V15OrganismeOuvert";
import { V16ModeleIsing } from "./components/V16ModeleIsing";
import { V17CodageShannon } from "./components/V17CodageShannon";
import { V18DemonMaxwell } from "./components/V18DemonMaxwell";
import { V19BitLandauer } from "./components/V19BitLandauer";
import { V20PaireQuantique } from "./components/V20PaireQuantique";
import { V21CoarseGraining } from "./components/V21CoarseGraining";
import { V22GravitationComparative } from "./components/V22GravitationComparative";
import { V23CalculateurTrouNoir } from "./components/V23CalculateurTrouNoir";
import { V24CourbePage } from "./components/V24CourbePage";
import { V25FriseCosmique } from "./components/V25FriseCosmique";
import { V26CarteEntropies } from "./components/V26CarteEntropies";
import type { VisualizationDefinition } from "./shared/types";

export const entropyVisualizations: VisualizationDefinition[] = [
  {
    id: "V1",
    slug: "fleche-du-temps",
    title: "Reconnaître la flèche du temps",
    act: "Ouverture",
    component: V01FlecheDuTemps,
  },
  {
    id: "V2",
    slug: "machine-thermique",
    title: "Machine thermique et flux",
    act: "Machines",
    component: V02MachineThermique,
  },
  {
    id: "V3",
    slug: "cycle-carnot",
    title: "Cycle de Carnot synchronisé",
    act: "Machines",
    component: V03CycleCarnotSynchronise,
  },
  {
    id: "V4",
    slug: "experience-joule",
    title: "Expérience de Joule",
    act: "Machines",
    component: V04ExperienceJoule,
  },
  {
    id: "V5",
    slug: "frontieres-systemes",
    title: "Laboratoire des frontières",
    act: "Thermodynamique",
    component: V05LaboratoireFrontieres,
  },
  {
    id: "V6",
    slug: "melange-calorimetrique",
    title: "Mélange calorimétrique",
    act: "Thermodynamique",
    component: V06MelangeCalorimetrique,
  },
  {
    id: "V7",
    slug: "grille-configurations",
    title: "Grille de configurations",
    act: "Statistique",
    component: V07GrilleConfigurations,
  },
  {
    id: "V8",
    slug: "deux-compartiments",
    title: "Gaz à deux compartiments",
    act: "Statistique",
    component: V08DeuxCompartiments,
  },
  {
    id: "V9",
    slug: "solides-einstein",
    title: "Deux solides d’Einstein",
    act: "Statistique",
    component: V09EinsteinSolids,
  },
  {
    id: "V10",
    slug: "distribution-gibbs",
    title: "Façonner une distribution",
    act: "Statistique",
    component: V10GibbsDistribution,
  },
  {
    id: "V11",
    slug: "fluctuations",
    title: "Marche aléatoire et fluctuations",
    act: "Statistique",
    component: V11Fluctuations,
  },
  {
    id: "V12",
    slug: "production-locale",
    title: "Carte de production d’entropie",
    act: "Matière",
    component: V12ProductionLocale,
  },
  {
    id: "V13",
    slug: "changements-phase",
    title: "Changements de phase",
    act: "Matière",
    component: V13ChangementsPhase,
  },
  {
    id: "V14",
    slug: "exergie",
    title: "Sankey énergie/exergie",
    act: "Matière",
    component: V14ExergieSankey,
  },
  {
    id: "V15",
    slug: "organisme-ouvert",
    title: "Bilan d’un organisme",
    act: "Matière",
    component: V15OrganismeOuvert,
  },
  {
    id: "V16",
    slug: "modele-ising",
    title: "Modèle d’Ising",
    act: "Matière",
    component: V16ModeleIsing,
  },
  {
    id: "V17",
    slug: "codage-shannon",
    title: "Atelier de codage",
    act: "Information",
    component: V17CodageShannon,
  },
  {
    id: "V18",
    slug: "demon-maxwell",
    title: "Démon de Maxwell",
    act: "Information",
    component: V18DemonMaxwell,
  },
  {
    id: "V19",
    slug: "bit-landauer",
    title: "Un bit physique",
    act: "Information",
    component: V19BitLandauer,
  },
  {
    id: "V20",
    slug: "paire-quantique",
    title: "Paire quantique simplifiée",
    act: "Information",
    component: V20PaireQuantique,
  },
  {
    id: "V21",
    slug: "coarse-graining",
    title: "Deux descriptions du même système",
    act: "Temps",
    component: V21CoarseGraining,
  },
  {
    id: "V22",
    slug: "gravitation",
    title: "Gaz et matière autogravitante",
    act: "Cosmos",
    component: V22GravitationComparative,
  },
  {
    id: "V23",
    slug: "trou-noir",
    title: "Calculateur de trou noir",
    act: "Cosmos",
    component: V23CalculateurTrouNoir,
  },
  {
    id: "V24",
    slug: "courbe-page",
    title: "Courbe de Page conceptuelle",
    act: "Cosmos",
    component: V24CourbePage,
  },
  {
    id: "V25",
    slug: "frise-cosmique",
    title: "Frise de l’entropie cosmique",
    act: "Cosmos",
    component: V25FriseCosmique,
  },
  {
    id: "V26",
    slug: "carte-entropies",
    title: "Carte des entropies",
    act: "Synthèse",
    component: V26CarteEntropies,
  },
];
