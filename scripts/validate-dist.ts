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
}

const indexStats = await stat(path.join(dist, "index.html"));
if (!indexStats.isFile() || indexStats.size === 0) throw new Error("dist/index.html is empty");

console.log(`Validated ${outputFiles.length} dist files; ${manifest.length} legacy files preserved.`);
