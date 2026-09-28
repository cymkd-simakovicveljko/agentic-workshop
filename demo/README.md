# Demo material

## Main route

The active course follows the [original eight-section progression](../OUTLINE.md), after [Introduction](../sections/introduction.md) and [Get Ready](../sections/01-get-ready.md).

Learners build a website health checker in a familiar language. The [health-checker fixture guide](health-checker/README.md) provides controlled local endpoints, startup instructions, and shared acceptance rules. It uses Bun, already installed for OMP; the learner's checker does not have to use Bun.

Run the fixture from the course repository and create the checker in a separate learner workspace. The lessons are sequential and reuse the learner's reviewed program. The older numbered companions below are not prerequisites for this route.

## Retained eight-section alternative

The numbered companions and branches below follow the [eight-section alternative](../alternatives/eight-section-outline.md). Its canonical todo repository is missing; the [project guide](../PROJECT.md) records what must be recovered before running those exercises. Do not substitute the historical `demo/public` app.

- `main`: add, complete, delete and persist tasks.
- `exercise/remaining-count` and `solution/remaining-count`: section 1.
- `exercise/unfinished-filter` and `solution/unfinished-filter`: section 4.
- `exercise/blank-task-bug` and `solution/blank-task-bug`: section 6.

Every lab states its own starting point. Prepared traces, inline examples and
disposable fixtures are labelled; working through them does not demonstrate that
the missing app or a live agent ran.

## Numbered companions

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

## Retained alternative: exporter example

The [legacy ticket exporter](section-08-legacy/README.md) is present for the
alternative route and independent of the todo app. The coordination and
compatibility labs may reuse its domain, but each begins from its own copy.
Section 7 assesses sequencing and replanning; section 8 Part B assesses
characterization, seams and supported producer/consumer combinations.

Section 8 Part A is a separate harness-design route. Its worksheet can expose a
missing control, but it cannot demonstrate enforcement by a working harness. The
exporter route uses ordinary POSIX tools and Node; it needs neither Python
preparation helpers nor an earlier learner's edits.

## Historical project-directory material

The older app (`public/`, `server.mjs` and the demo-root `package.json`), `checkpoints/`, `scripts/`, custom profiles/plugins/skills, OpenSpec artifacts, `SETUP.md` and `PRESENTER.md` preserve the pre-simplification route. The [section 7 example archive](section-07-examples/README.md) also belongs to that older example. The exercise instructions in demo-root `AGENTS.md` and `CLAUDE.md` describe that historical app, not the current course-authoring task or a learner's new workspace.

Those assets and their receipts are historical references, not current setup instructions. Their validation does not apply to `todo-app` or establish a live OMP rehearsal.
