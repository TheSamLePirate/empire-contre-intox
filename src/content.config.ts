import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const parcours = z.enum([
  "temps-profond",
  "vivant-evolution",
  "physique-espace",
  "societes-pouvoirs",
  "civilisations-memoire",
  "droits-societe",
  "methode-sources",
]);

const authors = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/content/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      avatar: image(),
      note: z.string().optional(),
    }),
});

const dossiers = defineCollection({
  loader: glob({ pattern: "**/index.mdx", base: "./src/content/dossiers" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      summary: z.string().min(1),
      route: z.string().startsWith("/"),
      order: z.number().int().positive(),
      parcours,
      authors: z.array(z.string()).min(1),
      hero: image(),
      heroAlt: z.string().min(1),
      tags: z.tuple([z.string(), z.string(), z.string()]),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      theme: z.object({
        accent: z.string().regex(/^#[0-9a-f]{6}$/i),
        accentSecondary: z.string().regex(/^#[0-9a-f]{6}$/i).optional(),
        variant: z.enum(["codex", "creator"]).default("codex"),
      }),
    }),
});

const sources = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/content/sources" }),
  schema: z.object({
    dossierId: z.string().min(1),
    claims: z.array(
      z.object({
        id: z.string().min(1),
        statement: z.string().min(1),
        verdict: z.enum(["ok", "nuance", "debated", "false"]),
        explanation: z.string().min(1),
        references: z.array(z.string()).min(1),
      }),
    ),
    references: z.array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        url: z.url(),
        doi: z.string().optional(),
        verifiedAt: z.coerce.date().optional(),
      }),
    ),
  }),
});

export const collections = { authors, dossiers, sources };
