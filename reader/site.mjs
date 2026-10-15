// The local server and static build publish the same files.
export const assets = new Map([
  ["/", ["reader/index.html", "text/html"]],
  ["/reader.css", ["reader/reader.css", "text/css"]],
  ["/reader.js", ["reader/reader.js", "text/javascript"]],
  ["/images/hireright.png", ["reader/images/hireright.png", "image/png"]],
  ["/diagrams/agent-loop.svg", ["reader/diagrams/agent-loop.svg", "image/svg+xml"]],
  ["/diagrams/llm-context.png", ["reader/diagrams/llm-context.png", "image/png"]],
  ["/diagrams/model-tradeoffs.webp", ["reader/diagrams/model-tradeoffs.webp", "image/webp"]],
  ["/diagrams/omp-model-picker.webp", ["reader/diagrams/omp-model-picker.webp", "image/webp"]],
  ["/diagrams/prompting-strategies.webp", ["reader/diagrams/prompting-strategies.webp", "image/webp"]],
  ["/diagrams/sdd-approaches.svg", ["reader/diagrams/sdd-approaches.svg", "image/svg+xml"]],
  ["/diagrams/software-development-lifecycle.webp", ["reader/diagrams/software-development-lifecycle.webp", "image/webp"]],
  [
    "/fonts/inter.woff2",
    [
      "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
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
export const contentRoots = new Set(["sections", "research"]);
export const rootDocuments = new Set(["README.md", "OUTLINE.md"]);
export const documentPolicy = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https:; connect-src 'self'; frame-src https://www.youtube-nocookie.com; object-src 'none'; base-uri 'none'";
