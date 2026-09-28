import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "./server.mjs";

async function startEphemeralServer() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  return { server, base: `http://127.0.0.1:${address.port}` };
}

async function stopServer(server) {
  if (!server.listening) return;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

test("serves fixed status, body, redirect, and unknown-path boundaries", async (t) => {
  const { server, base } = await startEphemeralServer();
  t.after(() => stopServer(server));

  for (const [path, status, body] of [
    ["/healthy", 200, "Workshop service ready"],
    ["/wrong-body", 200, "Maintenance in progress"],
    ["/missing", 404, "Not Found"],
    ["/error", 500, "Synthetic server error"],
    ["/unknown", 404, "Not Found"],
  ]) {
    const response = await fetch(`${base}${path}`, { redirect: "manual" });
    assert.equal(response.status, status, path);
    assert.equal(await response.text(), body, path);
  }

  const redirect = await fetch(`${base}/redirect`, { redirect: "manual" });
  assert.equal(redirect.status, 302);
  assert.equal(redirect.headers.get("location"), "/healthy");
});

test("slow route exceeds the checker deadline but eventually responds", { timeout: 8000 }, async (t) => {
  const { server, base } = await startEphemeralServer();
  t.after(() => stopServer(server));

  await assert.rejects(
    fetch(`${base}/slow`, { signal: AbortSignal.timeout(1000) }),
    { name: "TimeoutError" },
  );

  const response = await fetch(`${base}/slow`, { redirect: "manual" });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "Workshop service ready");
});
