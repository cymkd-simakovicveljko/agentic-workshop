# Demo material

## Current learner route

The todo app is the intended source for the remaining-count, unfinished-filter and blank-task exercises. **Its canonical repository is missing from this checkout.** Recover it at `demo/todo-app` before following those app commands; the [project guide](../PROJECT.md) records the prerequisite. The historical `demo/public` app is not a substitute.

The required todo branches remain behavior-based:

- `main`: add, complete, delete and persist tasks.
- `exercise/remaining-count` and `solution/remaining-count`: section 1.
- `exercise/unfinished-filter` and `solution/unfinished-filter`: section 4.
- `exercise/blank-task-bug` and `solution/blank-task-bug`: section 6.

Every lab states its own starting point. Prepared traces, inline examples and disposable fixtures are labelled; working through them does not demonstrate that the missing app or a live agent ran.

## Current lesson companions

| Section | Companion |
| --- | --- |
| 1. Getting started | [Setup and first change](section-01-setup.md) |
| 2. How agents work | [Requests, tools and usage](section-02-agent-loop.md) |
| 3. Working with OMP | [Host operation and state](section-03-working-with-omp.md) |
| 4. Everyday workflow | [Workflow lab](section-04-workflow-lab.md) and [worked examples](section-04-worked-examples.md) |
| 5. Steering agents | [Context and maintained handoff](section-05-context-and-handoff.md), then [skill packaging and evaluation](section-05-skill-lab.md) |
| 6. Verification, diagnosis and recovery | [Recovery and enforcement lab](section-06-recovery-lab.md) |
| 7. Planning and coordinating larger changes | [Coordination lab](section-07-coordination-lab.md) |
| 8. Advanced routes | [Harness design and existing-system compatibility](section-08-harness-and-enterprise-lab.md) |

## Separate exporter example

The [legacy ticket exporter](section-08-legacy/README.md) is present and independent of the todo app. The coordination and compatibility labs may reuse its domain, but each begins from its own copy. Section 7 assesses sequencing and replanning; section 8 Part B assesses characterization, seams and supported producer/consumer combinations.

Section 8 Part A is a separate harness-design route. Its worksheet can expose a missing control, but it cannot demonstrate enforcement by a working harness. The exporter route uses ordinary POSIX tools and Node; it needs neither Python preparation helpers nor an earlier learner's edits.

## Historical project-directory material

The older app (`public/`, `server.mjs` and the demo-root `package.json`), `checkpoints/`, `scripts/`, custom profiles/plugins/skills, OpenSpec artifacts, `SETUP.md` and `PRESENTER.md` preserve the pre-simplification route. The [section 7 example archive](section-07-examples/README.md) also belongs to that older example. The exercise instructions in demo-root `AGENTS.md` and `CLAUDE.md` describe that historical app, not the current course-authoring task or a learner's new workspace.

Those assets and their receipts are historical references, not current setup instructions. Their validation does not apply to `todo-app` or establish a live OMP rehearsal.
