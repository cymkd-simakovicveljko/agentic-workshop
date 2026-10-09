import { createServer } from "node:http";
import { readFile, realpath } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assets = new Map([
  ["/", ["reader/index.html", "text/html"]],
  ["/reader.css", ["reader/reader.css", "text/css"]],
  ["/reader.js", ["reader/reader.js", "text/javascript"]],
  ["/diagrams/agent-loop.svg", ["reader/diagrams/agent-loop.svg", "image/svg+xml"]],
  ["/diagrams/workflow.svg", ["reader/diagrams/workflow.svg", "image/svg+xml"]],
  ["/diagrams/context.svg", ["reader/diagrams/context.svg", "image/svg+xml"]],
  ["/diagrams/model-tradeoffs.webp", ["reader/diagrams/model-tradeoffs.webp", "image/webp"]],
  ["/diagrams/omp-model-picker.webp", ["reader/diagrams/omp-model-picker.webp", "image/webp"]],
  ["/diagrams/prompting-strategies.webp", ["reader/diagrams/prompting-strategies.webp", "image/webp"]],
  ["/diagrams/software-development-lifecycle.webp", ["reader/diagrams/software-development-lifecycle.webp", "image/webp"]],
  [
    "/fonts/dm-sans.woff2",
    [
      "node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
      "font/woff2",
    ],
  ],
  [
    "/vendor/marked.js",
    ["node_modules/marked/lib/marked.esm.js", "text/javascript"],
  ],
  [
    "/vendor/purify.js",
    ["node_modules/dompurify/dist/purify.es.mjs", "text/javascript"],
  ],
]);
const contentRoots = new Set(["sections", "demo", "research"]);
const rootDocuments = new Set(["README.md", "OUTLINE.md", "PROJECT.md"]);
const sourceExtensions = new Set([
  ".md",
  ".mjs",
  ".js",
  ".jsx",
  ".json",
  ".py",
  ".yaml",
  ".yml",
]);

const server = createServer(async (request, response) => {
  const send = (status, body, type = "text/plain") => {
    response.writeHead(status, {
      "Content-Type": `${type}; charset=utf-8`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy":
        type === "image/svg+xml"
          ? "default-src 'none'; style-src 'unsafe-inline'; font-src data:; sandbox"
          : "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  };
  if (!["GET", "HEAD"].includes(request.method))
    return send(405, "Read-only server.");
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    let asset = assets.get(pathname);
    if (pathname.startsWith("/content/")) {
      const relative = pathname.slice("/content/".length);
      const parts = relative.split("/");
      if (
        parts.some((part) => !part || part.startsWith(".")) ||
        !(rootDocuments.has(relative) || contentRoots.has(parts[0])) ||
        !sourceExtensions.has(extname(relative))
      )
        return send(404, "Document not available.");
      asset = [relative, "text/plain"];
    }
    if (!asset) return send(404, "Not found.");
    const path = await realpath(resolve(root, asset[0]));
    if (!path.startsWith(root + sep)) return send(404, "Not found.");
    send(200, await readFile(path), asset[1]);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR")
      return send(404, "This file is not present in the checkout.");
    if (error instanceof URIError) return send(400, "Invalid URL.");
    console.error(error);
    send(500, "Unable to read this document.");
  }
}).listen(Number(process.env.PORT || 4173), "127.0.0.1", () => {
  console.log(
    `Course reader ready at http://127.0.0.1:${server.address().port}`,
  );
});
