import { createServer } from "node:http";
import { readFile, realpath } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { assets, contentRoots, rootDocuments, documentPolicy } from "./site.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const server = createServer(async (request, response) => {
  const send = (status, body, type = "text/plain") => {
    response.writeHead(status, {
      "Content-Type": `${type}; charset=utf-8`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy":
        type === "image/svg+xml"
          ? "default-src 'none'; style-src 'unsafe-inline'; font-src data:; sandbox"
          : `${documentPolicy}; frame-ancestors 'none'`,
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
        extname(relative) !== ".md"
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
