# From a small specification to a tested change—with a reusable skill and a reliable harness

This is a **30-minute presentation plan**. Automated rehearsal durations and live-host limitations are in [VALIDATION.md](VALIDATION.md). Do not describe the whole presentation as timed successfully until you have rehearsed it with a stopwatch on the presentation machine.

Prepare three views: browser at `http://127.0.0.1:4173`, editor with the change/skill/test files, and two terminals (server and assistant/checks). Use a new extracted copy. Complete [SETUP.md](SETUP.md) beforehand. Keep [FALLBACK.md](FALLBACK.md) open. All commands below run from `demo/`.

## Before the clock

```sh
node scripts/checkpoint.mjs starter
npm run test:baseline
npx --no-install openspec validate filter-projects --strict
npm start
```

In the second terminal start `claude --plugin-dir ./plugins/spec-coach`, or the limited OMP command in SETUP.md. Verify the model and loaded skill beforehand. If you want a Git diff, initialize Git only in this standalone extracted `demo/` copy and create a baseline commit before presenting. Otherwise use the supplied file-to-file comparison below.

The app, tests, accepted OpenSpec change, skill, plugin and three checkpoints are **prepared**. The short implementation and specification-review response can be **live**. Say which path you are using. No cloud resources are created. No messages are sent to teammates.

## 0–3 minutes: the application and request

Say: “We have four synthetic projects. The request is ‘make projects searchable.’ Before we ask an agent to code, we need to decide what the user should observe.”

Show the starter. Type `Atlas`: all four records remain because filtering is unfinished. Show `AGENTS.md`, `public/filter.mjs`, and the real commands in `package.json`. Introduce model, agent and tool in one sentence each.

Ask the audience to predict `  ATLAS  `. Use the prepared decision table in lesson 2 to choose name-only, literal substring, case-insensitive, trimmed input and blank restoration. Do not expand the feature.

**Time boundary:** At minute 3 move to the specification even if discussion continues.

## 3–8 minutes: organize a small OpenSpec change

Show actual scaffolding in a separate scratch directory:

```sh
node scripts/scaffold-example.mjs
```

This creates a fresh `.work/scaffold-<timestamp>/openspec/changes/filter-projects/` using the installed CLI, then prints its location. It does not overwrite the prepared change. Show the scaffold metadata, then switch back to the populated teaching change.

Open proposal, spec, design and tasks. Explain their separate purposes. Read the mixed-case, whitespace and no-results examples. Run:

```sh
npx --no-install openspec status --change filter-projects
npx --no-install openspec validate filter-projects --strict
```

Expected: four planning artifacts complete and a valid change. Emphasize: “Planning artifacts complete does not mean implementation complete.” The unchecked tasks show the difference.

Optional live authoring prompt, only if rehearsal leaves time:

```text
Review the prepared filter-projects change. Restate the observable behavior in five sentences. Do not edit code or add requirements. Identify any unresolved decision that would change a test result.
```

In a longer lab, a fresh project can use `/opsx:propose` (Claude) or `/opsx-propose` (OMP) to draft these files. The teaser uses prepared content to keep the behavior consistent across deliveries.

**Fallback at minute 7:** Open the files directly if the CLI fails. State that validation did not run on this machine.

## 8–12 minutes: skill review and a decision

Show `fixtures/flawed-spec.md`. It claims surrounding spaces are ignored but its example says a padded Atlas query returns nothing.

Claude prompt:

```text
/spec-coach:spec-review fixtures/flawed-spec.md
```

OMP prompt:

```text
/skill:spec-review fixtures/flawed-spec.md
```

If OMP skill commands are disabled, use: “Use the spec-review skill to review fixtures/flawed-spec.md. Do not edit files.” Confirm it reads the skill. Expected: NEEDS DECISION, a located whitespace contradiction and a question about undefined “all languages”/“fast” behavior. The exact wording may vary.

Say: “We decide that surrounding whitespace is removed and accent folding is outside this change.” Show the accepted spec with the explicit examples. Open `SKILL.md` and point out name, description, missing-input behavior and narrow review scope. The flawed fixture remains unchanged as an evaluation fixture; do not imply it is the accepted spec.

**Fallback at minute 10:** If no useful result arrives within 60–90 seconds, stop the run and show the labelled prepared review in FALLBACK.md. Do not call it model output.

## 12–20 minutes: implement one small task

```sh
node scripts/harness.mjs begin
```

Exact live prompt:

```text
Read the repository instructions and openspec/changes/filter-projects/{proposal.md,design.md,tasks.md,specs/project-filter/spec.md}. Implement task 1.1 only, by editing public/filter.mjs. Inspect the existing data and tests. Keep the accepted tests and other files unchanged. Run node scripts/harness.mjs check and report the actual result and unfinished review work. Do not mark human acceptance or archive the change. Stop if the requirement is unclear or after repeated failures.
```

Observe tool use: reading, editing, test execution, feedback. If permissions require confirmation, explain what action the host is asking to run. Keep the change bounded. Do not approve unrelated installations or network access.

Expected: the solution normalizes query whitespace and case and filters names. Eleven automated tests pass, and the wrapper reports `checks-passed-awaiting-review`. Show that the agent still owes browser review and acceptance.

At **minute 18**, if work is unfinished, stop the agent and say you will use the prepared reference:

```sh
node scripts/checkpoint.mjs solution
node scripts/harness.mjs check
```

If the work budget has stopped, inspect the saved result and explicitly start a reviewed new budget first. Never silently reset it to hide repeated failures.

## 20–25 minutes: a deliberate failure and recovery

Say: “This next defect is prepared. It lets us rehearse recovery even if the live implementation was correct.” Stop any still-running agent before replacing the file.

```sh
node scripts/checkpoint.mjs broken
node scripts/harness.mjs begin
node scripts/harness.mjs check
node scripts/harness.mjs status
```

Expected: two whitespace tests fail. The log contains expected IDs versus an empty result, and progress remains failed. Read the log path printed in the state. If time permits, run the same check once more and a third attempt to show the repeated-failure stop (exit 3).

Fresh-session recovery prompt:

```text
Read AGENTS.md, .runs/progress.json and its referenced check log, then the accepted project-filter specification. Explain what is unfinished and propose the smallest repair. Do not reset the budget or edit tests. We will start a new budget after reviewing your diagnosis.
```

Accept the diagnosis “trim the query before lowercasing.” Begin a reviewed budget and either ask the live agent to apply that one fix or use the prepared recovery:

```sh
node scripts/harness.mjs begin
node scripts/checkpoint.mjs solution
node scripts/harness.mjs check
```

Expected: eleven checks pass, human acceptance remains false. The history files retain the earlier failure. Explain that the wrapper constrains its own checks and does not secure the assistant's shell or meter provider spend.

## 25–28 minutes: review and completion

Show the code change:

```sh
git diff --no-index checkpoints/starter/filter.mjs public/filter.mjs
```

Exit 1 means files differ; it is expected for this comparison. In a standalone Git checkout, also use `git diff` to catch unexpected files. Review the three-line solution against the spec and tests.

Refresh the browser and check:

| Input | Expected visible state |
|---|---|
| `aTlAs` | Atlas, Atlas API; `2 of 4 projects` |
| `  ATLAS  ` | Same two results |
| `team` or `.*` | Empty list; `0 of 4 projects`; no-results message |
| Clear input | Four projects, no empty message |

Use Tab to reach the input and verify focus. A screen-reader audit is beyond this short demo; do not claim one.

After performing those checks, the presenter can record acceptance:

```sh
node scripts/harness.mjs accept "Presenter: reviewed filter diff, unchanged acceptance tests and browser cases at this rehearsal"
```

Fill `completion.md` with actual evidence and mark only completed tasks. Use the prepared archive exercise if live editing would exceed time:

```sh
node scripts/archive-example.mjs
```

It archives in a disposable copy using prepared completed tasks, clearly labelled as a lifecycle demonstration. Show the resulting main spec. It does not certify the participant's work or auto-approve it.

## 28–30 minutes: skills, plugins and larger frameworks

Show the tiny plugin folder and manifest. Explain that a skill is reusable guidance, a plugin distributes host capabilities, and the harness governs execution and feedback. An MCP server is an integration endpoint; none is needed here.

Explain that GSD Core could coordinate a larger multi-phase task and FSAD could organize joint product/design/engineering decisions. They would add unnecessary work to this filter alone. Close with three audience checks: What was agreed? What evidence did we run? What remained a human decision?

## Rehearsal record

Before delivery record date, machine/OS, Node/OpenSpec/host/model versions, plugin load result, each segment's actual start/end, provider delays, fallback used and observations. The timed plan totals 30 minutes, but live agent latency is variable. Reserve the hard fallbacks above and schedule questions after the teaser.
