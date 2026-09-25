import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";

// A local reader must serve source documents without exposing Git or dotfiles.
test(
  "serves the real outline and rejects private paths and writes",
  { timeout: 10000 },
  async (t) => {
    const child = spawn(
      process.execPath,
      [new URL("./server.mjs", import.meta.url).pathname],
      {
        env: { ...process.env, PORT: "0" },
        stdio: ["ignore", "pipe", "inherit"],
      },
    );
    t.after(async () => {
      const exited = once(child, "exit");
      child.kill();
      await exited;
    });
    const [output] = await once(child.stdout, "data");
    const base = output.toString().match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];
    assert.ok(base, "Server reports its listening address");
    const response = await fetch(`${base}/content/OUTLINE.md`);
    assert.equal(response.status, 200);
    assert.equal(
      await response.text(),
      await readFile(new URL("../OUTLINE.md", import.meta.url), "utf8"),
    );
    for (const path of [
      "/content/.git/config",
      "/content/demo/.env",
      "/content/demo/%2e%2e%2f.git/config",
      "/package.json",
    ]) {
      assert.equal((await fetch(base + path)).status, 404, path);
    }
    assert.equal(
      (
        await fetch(`${base}/content/OUTLINE.md`, {
          method: "POST",
          body: "replace",
        })
      ).status,
      405,
    );
  },
);
