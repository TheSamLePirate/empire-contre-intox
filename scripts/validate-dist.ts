import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface LegacyConfig {
  manifest: string;
  requiredFiles: string[];
  forbiddenSegments: string[];
  forbiddenExtensions: string[];
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const canonicalOrigin = "https://empire-contre-intox.com";
const githubMirror = "https://thesamlepirate.github.io/empire-contre-intox";
const config = JSON.parse(await readFile(path.join(root, "config/legacy-public.json"), "utf8")) as LegacyConfig;
const manifest = JSON.parse(await readFile(path.join(root, config.manifest), "utf8")) as string[];

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolute = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(absolute) : [path.relative(dist, absolute).split(path.sep).join("/")];
    }),
  );
  return nested.flat();
}

const outputFiles = await walk(dist);
const outputSet = new Set(outputFiles);

function metaContent(html: string, attribute: "property" | "name", key: string): string | undefined {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.match(new RegExp(`<meta\\s+${attribute}=["']${escapedKey}["']\\s+content=["']([^"']+)["']`, "i"))?.[1];
}

for (const relativePath of manifest) {
  if (!outputSet.has(relativePath)) throw new Error(`Build omitted legacy file: ${relativePath}`);
}

for (const requiredFile of config.requiredFiles) {
  if (!outputSet.has(requiredFile)) throw new Error(`Build omitted required file: ${requiredFile}`);
}

for (const relativePath of outputFiles) {
  const segments = relativePath.split("/");
  if (segments.some((segment) => config.forbiddenSegments.includes(segment))) {
    throw new Error(`Forbidden path leaked into dist: ${relativePath}`);
  }
  if (config.forbiddenExtensions.includes(path.extname(relativePath).toLowerCase())) {
    throw new Error(`Forbidden extension leaked into dist: ${relativePath}`);
  }

  if (path.extname(relativePath).toLowerCase() === ".html") {
    const html = await readFile(path.join(dist, relativePath), "utf8");
    const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
    const openGraphUrl = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i)?.[1];
    if (!canonical?.startsWith(canonicalOrigin)) {
      throw new Error(`Missing primary-domain canonical URL in ${relativePath}`);
    }
    if (openGraphUrl !== canonical) {
      throw new Error(`og:url does not match canonical URL in ${relativePath}`);
    }
  }
}

const rss = await readFile(path.join(dist, "rss.xml"), "utf8");
if (rss.includes(githubMirror)) throw new Error("RSS still contains the GitHub Pages mirror URL");
if (!rss.includes(`<atom:link href="${canonicalOrigin}/rss.xml"`)) {
  throw new Error("RSS self URL does not use the primary domain");
}

const indexStats = await stat(path.join(dist, "index.html"));
if (!indexStats.isFile() || indexStats.size === 0) throw new Error("dist/index.html is empty");

const indexHtml = await readFile(path.join(dist, "index.html"), "utf8");
const socialPages = new Set(["index.html"]);
for (const match of indexHtml.matchAll(/<a\s+class=["']dossier-link["']\s+href=["']([^"']+)["']/gi)) {
  const href = match[1];
  if (!href || href.startsWith("/")) continue;
  const documentPath = href.endsWith("/") ? `${href}index.html` : href;
  if (documentPath.endsWith(".html")) socialPages.add(documentPath);
}

for (const relativePath of socialPages) {
  const html = await readFile(path.join(dist, relativePath), "utf8");
  const openGraphImage = metaContent(html, "property", "og:image");
  const twitterCard = metaContent(html, "name", "twitter:card");
  const twitterImage = metaContent(html, "name", "twitter:image");
  if (!openGraphImage?.startsWith(`${canonicalOrigin}/`)) {
    throw new Error(`Missing absolute social image in ${relativePath}`);
  }
  if (twitterCard !== "summary_large_image" || twitterImage !== openGraphImage) {
    throw new Error(`Twitter large-image metadata is incomplete in ${relativePath}`);
  }

  const imagePath = new URL(openGraphImage).pathname.replace(/^\//, "");
  if (!outputSet.has(imagePath)) throw new Error(`Social image is absent from dist: ${imagePath}`);
}

console.log(`Validated ${outputFiles.length} dist files; ${manifest.length} legacy files preserved.`);
