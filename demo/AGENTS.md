# Historical project-directory training application

All records are synthetic. The accepted change is openspec/changes/filter-projects/.
Read proposal.md, specs/project-filter/spec.md, design.md and tasks.md before implementing.
Read public/filter.mjs, public/projects.mjs and tests/filter.test.mjs for this task.
Keep the feature local. Edit only public/filter.mjs for the implementation exercise.
Do not alter acceptance tests to make a failure disappear. Explain any contract conflict.
No external services or new application dependencies are needed.

Commands (run from demo/):
- `npm start`: local web application at http://127.0.0.1:4173. Ctrl+C stops the server.
- `npm run test:baseline`: starter behavior and HTTP smoke checks.
- `npm test`: baseline plus accepted new behavior; intentionally red on starter.
- `node scripts/harness.mjs begin`: begin a human-approved work budget.
- `node scripts/harness.mjs check`: capture tests and accurate progress.
- `node scripts/harness.mjs status`: inspect saved evidence.
- `npm run preflight`: check local package structure; not host behavior.

Report actual commands and results, uncompleted work and next action. Never claim tests passed without running them.
Stop after two repeated failures or eight minutes and hand off .runs/progress.json plus its referenced log.
The wrapper enforces its check limits, but it cannot stop a separately running assistant.
The presenter owns acceptance and may run checkpoint scripts to load explicitly prepared examples.
