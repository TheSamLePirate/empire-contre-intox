import { resolve, relative } from "node:path";
import { readFile, writeFile, readdir, rm } from "node:fs/promises";
const root = resolve(import.meta.dir, "..");
const chunkPattern = /^eci-lives-chunk-[\w-]+\.js$/;
const publicBuild = await Bun.build({
  entrypoints: [resolve(root, "web/lives/public.ts")],
  target: "browser",
  format: "esm",
  splitting: true,
  minify: true,
  outdir: resolve(root, "assets"),
  naming: { entry: "eci-lives.js", chunk: "eci-lives-chunk-[hash].js" },
});
if (!publicBuild.success)
  throw new AggregateError(publicBuild.logs, "Compilation publique impossible");
const outputs = new Set(
  publicBuild.outputs.map((output) => relative(root, output.path)),
);
for (const file of await readdir(resolve(root, "assets")))
  if (chunkPattern.test(file) && !outputs.has(`assets/${file}`))
    await rm(resolve(root, "assets", file));
const adminBuild = await Bun.build({
  entrypoints: [resolve(root, "web/lives/admin.ts")],
  target: "browser",
  minify: true,
});
if (!adminBuild.success)
  throw new AggregateError(
    adminBuild.logs,
    "Compilation administration impossible",
  );
await Bun.write(
  resolve(root, "empire-calendrier/admin/lives-admin.js"),
  adminBuild.outputs[0],
);
const manifestPath = resolve(root, "config/legacy-public-manifest.json");
const manifest: string[] = JSON.parse(await readFile(manifestPath, "utf8"));
const updated = [
  ...new Set([
    ...manifest.filter(
      (path) => !chunkPattern.test(path.replace(/^assets\//, "")),
    ),
    ...outputs,
  ]),
].sort();
await writeFile(manifestPath, JSON.stringify(updated, null, 2) + "\n");
