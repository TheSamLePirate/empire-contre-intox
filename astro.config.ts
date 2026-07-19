import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

const deploymentBase = process.env.SITE_BASE?.trim() || "/";

export default defineConfig({
  site: "https://empire-contre-intox.com",
  base: deploymentBase,
  output: "static",
  build: {
    format: "preserve",
  },
  publicDir: ".legacy-public",
  integrations: [mdx(), react()],
});
