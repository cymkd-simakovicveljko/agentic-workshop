import { copyFile, mkdir, readdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { assets, contentRoots, rootDocuments, documentPolicy } from "./site.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
await rm(output, { recursive: true, force: true });

async function publish(source, target) {
  const path = await realpath(resolve(root, source));
  if (!path.startsWith(root + sep)) throw new Error(`Source outside checkout: ${source}`);
  const destination = resolve(output, target);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(path, destination);
}

async function publishDocuments(directory) {
  for (const entry of await readdir(resolve(root, directory), { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await publishDocuments(path);
    else if (entry.isFile() && extname(entry.name) === ".md") {
      await publish(path, `content/${path}`);
    }
  }
}

for (const [url, [source]] of assets) {
  await publish(source, url === "/" ? "index.html" : url.slice(1));
}
for (const document of rootDocuments) await publish(document, `content/${document}`);
for (const directory of contentRoots) await publishDocuments(directory);

// Pages cannot set our server's response headers; a meta policy protects the reader.
const index = resolve(output, "index.html");
const html = await readFile(index, "utf8");
await writeFile(index, html.replace(
  '<meta charset="utf-8" />',
  `<meta charset="utf-8" />\n    <meta http-equiv="Content-Security-Policy" content="${documentPolicy}" />`,
));
await writeFile(resolve(output, ".nojekyll"), "");
console.log("Static reader built in dist/");
