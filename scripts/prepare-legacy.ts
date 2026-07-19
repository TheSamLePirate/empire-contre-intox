import { cp, mkdir, readFile, rm, stat } from "node:fs/promises";
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

for (const relativePath of manifest) {
  assertSafeRelativePath(relativePath);
  const source = path.join(root, relativePath);
  const destination = path.join(destinationRoot, relativePath);
  const sourceStats = await stat(source).catch(() => undefined);
  if (!sourceStats?.isFile()) throw new Error(`Missing public legacy file: ${relativePath}`);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

for (const requiredFile of config.requiredFiles) {
  if (!manifest.includes(requiredFile)) throw new Error(`Required legacy file absent from manifest: ${requiredFile}`);
}

console.log(`Prepared ${manifest.length} allowlisted legacy files in ${config.outputDirectory}.`);
