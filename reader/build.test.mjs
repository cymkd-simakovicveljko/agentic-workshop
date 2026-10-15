import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

// Static hosting has no request-time allowlist: excluded files must never reach dist.
test("publishes Markdown without hidden files, source code, symlinks, or stale output", async (t) => {
  const root = new URL("../", import.meta.url);
  const fixture = await mkdtemp(new URL("sections/reader-boundary-", root));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  await mkdir(join(fixture, ".private"));
  await writeFile(join(fixture, ".private", "secret.md"), "private note");
  await writeFile(join(fixture, ".secret.md"), "private note");
  await writeFile(join(fixture, "private.mjs"), "private source");
  await writeFile(join(fixture, "lesson.md"), "# Published lesson\n");
  await symlink(join(fixture, ".secret.md"), join(fixture, "linked.md"));
  await symlink(join(fixture, ".private"), join(fixture, "linked-directory"));
  await mkdir(new URL("dist/", root), { recursive: true });
  await writeFile(new URL("dist/stale.md", root), "obsolete publication");

  execFileSync(process.execPath, [new URL("build.mjs", import.meta.url).pathname]);

  const output = new URL("dist/", root);
  assert.deepEqual(await readdir(new URL(`content/sections/${basename(fixture)}/`, output)), ["lesson.md"]);
  assert.equal(await readFile(new URL(`content/sections/${basename(fixture)}/lesson.md`, output), "utf8"), "# Published lesson\n");
  assert.deepEqual((await readdir(output)).sort(), [
    ".nojekyll", "content", "diagrams", "fonts", "images", "index.html", "reader.css", "reader.js", "vendor",
  ]);
  assert.equal(await readFile(new URL("content/OUTLINE.md", output), "utf8"),
    await readFile(new URL("OUTLINE.md", root), "utf8"));
});
