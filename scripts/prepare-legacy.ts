import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface LegacyConfig {
  manifest: string;
  outputDirectory: string;
  requiredFiles: string[];
  forbiddenSegments: string[];
  forbiddenExtensions: string[];
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "config/legacy-public.json");
const config = JSON.parse(await readFile(configPath, "utf8")) as LegacyConfig;
const manifestPath = path.join(root, config.manifest);
const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as string[];
const destinationRoot = path.join(root, config.outputDirectory);
const canonicalOrigin = "https://empire-contre-intox.com";

interface SocialPreview {
  imagePath: string;
  imageAlt: string;
  description?: string;
}

function escapeAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function decodeHtmlEntities(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extractTitle(source: string): string | undefined {
  const title = source.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  return title ? decodeHtmlEntities(title) : undefined;
}

function extractDescription(source: string): string | undefined {
  const description = source.match(/<meta\s+name=(["'])description\1\s+content=(["'])(.*?)\2[^>]*>/i)?.[3]?.trim();
  return description ? decodeHtmlEntities(description) : undefined;
}

function buildSocialPreviews(indexSource: string, publicFiles: Set<string>): Map<string, SocialPreview> {
  const previews = new Map<string, SocialPreview>([
    ["index.html", {
      imagePath: "manifest-poster.jpg",
      imageAlt: "Empire contre Intox — archives publiques et dossiers scientifiques",
    }],
  ]);
  const cards = indexSource.matchAll(/<article\s+class=["'][^"']*\bdossier\b[^"']*["'][^>]*>([\s\S]*?)<\/article>/gi);

  for (const cardMatch of cards) {
    const card = cardMatch[1];
    if (!card) continue;
    const href = card.match(/<a\s+class=(["'])dossier-link\1\s+href=(["'])(.*?)\2/i)?.[3];
    const image = card.match(/<img\s+src=(["'])(.*?)\1\s+alt=(["'])(.*?)\3/i);
    const cardImage = image?.[2];
    const imageAlt = image?.[4];
    if (!href || href.startsWith("/") || !cardImage || imageAlt === undefined) continue;

    const fullSizeCandidates = [
      cardImage.replace(/\.index\.webp$/i, ".png"),
      cardImage.replace(/\.index\.webp$/i, ".jpg"),
      cardImage,
    ];
    const imagePath = fullSizeCandidates.find((candidate) => publicFiles.has(candidate));
    if (!imagePath) throw new Error(`Missing social image for dossier: ${href}`);
    const cardDescription = card.match(/<div\s+class=(["'])dossier-body\1[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/i)?.[2]
      ?.replace(/<[^>]+>/g, "")
      .trim();
    previews.set(href, {
      imagePath,
      imageAlt: decodeHtmlEntities(imageAlt),
      ...(cardDescription ? { description: decodeHtmlEntities(cardDescription) } : {}),
    });
  }

  return previews;
}

function canonicalUrl(relativePath: string): string {
  const publicPath = relativePath === "index.html"
    ? "/"
    : `/${relativePath.replace(/index\.html$/i, "")}`;
  return new URL(publicPath, canonicalOrigin).href;
}

function addCanonicalMetadata(source: string, relativePath: string, socialPreview?: SocialPreview): string {
  const canonical = canonicalUrl(relativePath);
  const title = extractTitle(source);
  const sourceDescription = extractDescription(source);
  const description = sourceDescription ?? socialPreview?.description;
  const socialImage = socialPreview ? new URL(`/${socialPreview.imagePath}`, canonicalOrigin).href : undefined;
  const metadata = [
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:url" content="${canonical}">`,
    ...(!sourceDescription && description ? [`<meta name="description" content="${escapeAttribute(description)}">`] : []),
    ...(socialImage && title && description && socialPreview ? [
      `<meta property="og:type" content="${relativePath === "index.html" ? "website" : "article"}">`,
      `<meta property="og:site_name" content="Empire contre Intox">`,
      `<meta property="og:title" content="${escapeAttribute(title)}">`,
      `<meta property="og:description" content="${escapeAttribute(description)}">`,
      `<meta property="og:image" content="${socialImage}">`,
      `<meta property="og:image:secure_url" content="${socialImage}">`,
      `<meta property="og:image:alt" content="${escapeAttribute(socialPreview.imageAlt)}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${escapeAttribute(title)}">`,
      `<meta name="twitter:description" content="${escapeAttribute(description)}">`,
      `<meta name="twitter:image" content="${socialImage}">`,
      `<meta name="twitter:image:alt" content="${escapeAttribute(socialPreview.imageAlt)}">`,
    ] : []),
  ].map((line) => `  ${line}`).join("\n");
  const output = source.replace(/<head\b[^>]*>/i, (head) => `${head}\n${metadata}`);
  if (output === source) throw new Error(`Missing <head> in legacy HTML file: ${relativePath}`);
  return output;
}

function assertSafeRelativePath(relativePath: string): void {
  if (path.isAbsolute(relativePath) || relativePath.includes("..")) {
    throw new Error(`Unsafe legacy manifest path: ${relativePath}`);
  }

  const segments = relativePath.split("/");
  if (segments.some((segment) => config.forbiddenSegments.includes(segment))) {
    throw new Error(`Forbidden legacy path: ${relativePath}`);
  }

  if (config.forbiddenExtensions.includes(path.extname(relativePath).toLowerCase())) {
    throw new Error(`Forbidden legacy extension: ${relativePath}`);
  }
}

await rm(destinationRoot, { recursive: true, force: true });
await mkdir(destinationRoot, { recursive: true });

const publicFiles = new Set(manifest);
const indexSource = await readFile(path.join(root, "index.html"), "utf8");
const socialPreviews = buildSocialPreviews(indexSource, publicFiles);

for (const relativePath of manifest) {
  assertSafeRelativePath(relativePath);
  const source = path.join(root, relativePath);
  const destination = path.join(destinationRoot, relativePath);
  const sourceStats = await stat(source).catch(() => undefined);
  if (!sourceStats?.isFile()) throw new Error(`Missing public legacy file: ${relativePath}`);
  await mkdir(path.dirname(destination), { recursive: true });
  if (path.extname(relativePath).toLowerCase() === ".html") {
    const html = await readFile(source, "utf8");
    await writeFile(destination, addCanonicalMetadata(html, relativePath, socialPreviews.get(relativePath)), "utf8");
  } else {
    await cp(source, destination);
  }
}

for (const requiredFile of config.requiredFiles) {
  if (!manifest.includes(requiredFile)) throw new Error(`Required legacy file absent from manifest: ${requiredFile}`);
}

console.log(`Prepared ${manifest.length} allowlisted legacy files in ${config.outputDirectory}.`);
