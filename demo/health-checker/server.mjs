import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const HOST = "127.0.0.1";
const PORT = 4175;
const SLOW_DELAY_MS = 2000;
const READY_BODY = "Workshop service ready";

const ROOT_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Health-checker fixture</title>
  </head>
  <body>
    <main>
      <h1>Health-checker fixture</h1>
      <p>Synthetic local endpoints for the workshop. Every route is loopback-only.</p>
      <ul>
        <li><a href="/healthy"><code>GET /healthy</code></a> — 200, <code>Workshop service ready</code></li>
        <li><a href="/wrong-body"><code>GET /wrong-body</code></a> — 200, <code>Maintenance in progress</code></li>
        <li><a href="/missing"><code>GET /missing</code></a> — 404</li>
        <li><a href="/error"><code>GET /error</code></a> — 500</li>
        <li><a href="/redirect"><code>GET /redirect</code></a> — 302 to <code>/healthy</code></li>
        <li><a href="/slow"><code>GET /slow</code></a> — 200 after a two-second delay, <code>Workshop service ready</code></li>
      </ul>
    </main>
  </body>
</html>`;

function send(response, status, body, contentType = "text/plain") {
  if (response.destroyed || response.writableEnded) return;
  response.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": `${contentType}; charset=utf-8`,
  });
  response.end(body);
}

function sendSlowResponse(request, response) {
  let timer;

  const cancel = () => {
    if (timer === undefined) return;
    clearTimeout(timer);
    timer = undefined;
    request.removeListener("aborted", cancel);
    response.removeListener("close", cancel);
  };

  const finish = () => {
    if (timer === undefined) return;
    timer = undefined;
    request.removeListener("aborted", cancel);
    response.removeListener("close", cancel);
    send(response, 200, READY_BODY);
  };

  request.once("aborted", cancel);
  response.once("close", cancel);
  timer = setTimeout(finish, SLOW_DELAY_MS);
  if (request.aborted || response.destroyed) cancel();
}

export function createServer() {
  return http.createServer((request, response) => {
    if (request.method !== "GET") {
      send(response, 405, "Method Not Allowed");
      return;
    }

    let pathname;
    try {
      pathname = new URL(request.url ?? "/", `http://${HOST}`).pathname;
    } catch {
      send(response, 400, "Invalid URL");
      return;
    }

    switch (pathname) {
      case "/":
        send(response, 200, ROOT_HTML, "text/html");
        return;
      case "/healthy":
        send(response, 200, READY_BODY);
        return;
      case "/wrong-body":
        send(response, 200, "Maintenance in progress");
        return;
      case "/missing":
        send(response, 404, "Not Found");
        return;
      case "/error":
        send(response, 500, "Synthetic server error");
        return;
      case "/redirect":
        response.writeHead(302, {
          "Cache-Control": "no-store",
          Location: "/healthy",
        });
        response.end("Redirecting to /healthy");
        return;
      case "/slow":
        sendSlowResponse(request, response);
        return;
      default:
        send(response, 404, "Not Found");
    }
  });
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  const server = createServer();
  server.once("error", (error) => {
    const detail =
      error.code === "EADDRINUSE"
        ? "port is already in use"
        : error instanceof Error
          ? error.message
          : String(error);
    console.error(
      `Health-checker fixture could not start at http://${HOST}:${PORT}: ${detail}`,
    );
    process.exitCode = 1;
  });
  server.listen(PORT, HOST, () => {
    console.log(`Health-checker fixture ready at http://${HOST}:${PORT}`);
  });
}
