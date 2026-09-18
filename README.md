# Agentic engineering course

**Current route:** the small React + Vite app in [demo/todo-app](demo/todo-app/).
It is a dedicated local Git repository: its learner branches do not include this
workspace's history, and nothing is published remotely. Teaching depth is restored:
the lessons explain decisions, tradeoffs and failure cases alongside executable
ordinary commands and source/adaptation notes. Section 3 remains the practical
core; section 8 keeps its separate enterprise example.

Start with the [outline](OUTLINE.md), then [run the todo app](demo/todo-app/README.md).
Sections 1–7 use the todo app and ordinary Git/`npm` commands where execution is needed.
OMP setup and an authorized provider are required only when a lesson asks learners to observe or
try an agent; credentials never belong in prompts or course files.

| Material | Purpose |
| --- | --- |
| [Outline](OUTLINE.md) | Eight-section route and current status |
| [Todo app](demo/todo-app/README.md) | Baseline, test commands, branch workflow |
| [Section 1](sections/01-getting-started-with-omp.md) | A first visible change: remaining-task count |
| [Section 2](sections/02-agentic-engineering-foundations.md) | Explain the observed agent loop |
| [Section 3](sections/03-the-everyday-workflow.md) | Unfinished-task filter from request to review |
| [Section 4](sections/04-context-and-repository-knowledge.md) | Correct a stale handoff about the todo app |
| [Section 5](sections/05-skills.md) | Compare ordinary review with an inline candidate and focused procedure; no installed course skill |
| [Section 6](sections/06-reliable-execution.md) | Reproduce and fix the blank-task defect |
| [Section 7](sections/07-optional-flavors.md) | Compare inline plain, FSAD-style and OpenSpec-shaped artifacts for the same filter |
| [Section 8](sections/08-advanced-harness-design-and-enterprise-scale-work.md) | Harness and enterprise work; separate legacy exporter |
| [Demo guide](demo/README.md) | Active companions and the boundary around historical demo material |
| [Earlier full draft](sections_old/) | Historical source for restored teaching depth, not an active learner route |
| [Simplification plan](2026-09-17-simplification-plan.md) | The agreed scope and completion criteria |
| [Content restoration plan](2026-09-18-content-restoration-plan.md) | Implemented source-led restoration and preserved agreed decisions |
| [Restoration verification](_build/todo-demo/2026-09-18-content-restoration-verification.md) | Author-side evidence and limits; separate from the original app receipt |

The earlier full draft, legacy project-directory demo, checkpoints and preparation
helpers remain historical material. Their old receipts do not validate the
todo app or restored lessons. No provider-backed teaching rehearsal or classroom
timing rehearsal was performed for this restoration; the course is not claimed
classroom-ready.

## Repository and publishing

This course is its own Git repository and is intended to be a submodule of the
surrounding Pepe repository. Its `origin` is configured as
`git@github.com:cymkd-simakovicveljko/agentic-workshop.git`.
As of 2026-09-18, GitHub reports "Repository not found" for the current SSH
account; no push has occurred and the parent submodule relationship has not yet
been configured. The nested `demo/todo-app` repository has its own exercise and
solution branches; its publishing arrangement is also pending. The course's
staged entry for that folder is not yet a configured submodule.

The course ignore file excludes dependencies, environment values, caches,
application builds, local agent runs, and test output. Course documents,
lockfiles, reusable agent configuration, and `_build/` scripts and receipts
remain eligible for version control.
