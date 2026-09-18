# Demo material

## Current learner route

Use the canonical [todo app](todo-app/README.md). It is a small React + Vite app
with normal `npm` commands, Vitest unit tests and Playwright browser tests. Its
nested Git repository owns all learner exercise branches; the surrounding Pepe
workspace does not.

- `main` — working add/complete/delete/persist baseline.
- `exercise/remaining-count` and `solution/remaining-count` — section 1.
- `exercise/unfinished-filter` and `solution/unfinished-filter` — section 3.
- `exercise/blank-task-bug` and `solution/blank-task-bug` — section 6.

Read the [app guide](todo-app/README.md) for Node, installation, Playwright and
safe branch-switching instructions. OMP installation and an authorized provider are
separate from running the app.

## Current lesson companions

Sections 1–7 use the todo app above. These companions are part of the current
learner route, not the historical project-directory demo:

| Section | Companion |
| --- | --- |
| 1. Getting started | [Setup and first change](section-01-setup.md) |
| 2. Foundations | [Observe the agent loop](section-02-agent-loop.md) |
| 3. Everyday workflow | [Workflow lab](section-03-workflow-lab.md) and [worked examples](section-03-worked-examples.md) |
| 4. Context and repository knowledge | [Context and handoff](section-04-context-and-handoff.md) |
| 5. Skills | [Skill lab](section-05-skill-lab.md) |
| 6. Reliable execution | [Recovery lab](section-06-recovery-lab.md) |
| 7. Optional flavors | [Flavor lab](section-07-flavor-lab.md) |

## Separate section 8 example

The [harness and enterprise lab](section-08-harness-and-enterprise-lab.md) uses the
[legacy ticket exporter](section-08-legacy/README.md), not the todo app. Its direct
POSIX-shell/Node route makes fresh copies with ordinary tools; no Python helper,
checkpoint machinery or todo-app branch is required. The exporter remains the
distinct enterprise teaching example, not superseded material to port to React.

## Historical project-directory material

The older project-directory app (`public/`, `server.mjs` and the demo-root
`package.json`), `checkpoints/`, `scripts/`, custom profiles/plugins/skills,
OpenSpec artifacts, `SETUP.md` and `PRESENTER.md` preserve the pre-simplification
route. The [section 7 example archive](section-07-examples/README.md) also belongs
to that older example, not the current todo-app flavor lab.

Those assets and their preparation receipts are historical references, not setup
instructions for the current route. Their validation does not apply to `todo-app`
or establish a current OMP rehearsal.
