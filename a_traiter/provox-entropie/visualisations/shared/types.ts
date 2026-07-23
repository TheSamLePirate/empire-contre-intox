import type { ComponentType } from "react";

export type VisualizationProps = {
  className?: string | undefined;
  seed?: number | undefined;
};

export type VisualizationDefinition = {
  id: `V${number}`;
  slug: string;
  title: string;
  act: string;
  component: ComponentType;
};

export type Point = { x: number; y: number };
