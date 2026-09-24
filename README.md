# Agentic engineering course

Start with the [outline](OUTLINE.md). The active course now follows the revised
eight-section structure: the everyday workflow is section 4, larger-change
coordination is section 7, and section 8 offers separate harness and compatibility routes.
The [revision plan](2026-09-22-course-review-and-action-plan.md) explains the decisions.

**The todo repository is missing from this checkout.** Its app exercises need the
canonical repository and branches before they can be run. The [project guide](PROJECT.md)
records those starting states. Prepared traces and inline exercises remain labelled
as such; the separate exporter is available for coordination and compatibility work.

OMP setup and an authorized provider are required only for live agent exercises.
Keep credentials out of prompts and course files. Written lessons, local checks,
provider-backed interaction and classroom rehearsal are separate evidence.

| Material | Purpose |
| --- | --- |
| [Outline](OUTLINE.md) | Eight-section route and current status |
| [Project guide](PROJECT.md) | Required starting states and the missing todo-repository prerequisite |
| [Section 1](sections/01-getting-started-with-omp.md) | A first visible change: remaining-task count |
| [Section 2](sections/02-agentic-engineering-foundations.md) | Explain the observed agent loop |
| [Section 3](sections/03-working-with-omp.md) | Session/context controls and environment state |
| [Section 4](sections/04-the-everyday-workflow.md) | Unfinished-task filter from intent to acceptance |
| [Section 5](sections/05-steering-agents.md) | Context, guidance, skill packaging and useful judgment |
| [Section 6](sections/06-reliable-execution.md) | Verification, shared-cause diagnosis, enforcement and recovery |
| [Section 7](sections/07-planning-and-coordinating-larger-changes.md) | Dependencies, ownership and replanning after changed requirements |
| [Section 8](sections/08-advanced-harness-design-and-enterprise-scale-work.md) | Separate harness-design and existing-system compatibility routes |
| [Demo guide](demo/README.md) | Active companions and the boundary around historical demo material |
| [Earlier full draft](sections_old/) | Historical source for restored teaching depth, not an active learner route |
| [Simplification plan](2026-09-17-simplification-plan.md) | The agreed scope and completion criteria |
| [Content restoration plan](2026-09-18-content-restoration-plan.md) | Implemented source-led restoration and preserved agreed decisions |
| [Restoration verification](_build/todo-demo/2026-09-18-content-restoration-verification.md) | Author-side evidence and limits; separate from the original app receipt |

The earlier full draft, legacy project-directory demo, checkpoints and preparation
helpers remain historical. Their receipts do not validate the revised course.
The lesson migration is not a claim of classroom readiness: todo-app execution,
provider-backed exercises and classroom pacing still need rehearsal.

## Repository and publishing

This course is its own Git repository and is intended to be a submodule of the
surrounding Pepe repository. Its `origin` is configured as
`git@github.com:cymkd-simakovicveljko/agentic-workshop.git`.
As of 2026-09-18, GitHub reports "Repository not found" for the current SSH
account; no push has occurred and the parent submodule relationship has not yet
been configured. The canonical nested todo repository's exercise and solution
branches are required but unavailable in this checkout; its publishing arrangement
is also unresolved. The recorded gitlink is not a configured submodule source.

The course ignore file excludes dependencies, environment values, caches,
application builds, local agent runs, and test output. Course documents,
lockfiles, reusable agent configuration, and `_build/` scripts and receipts
remain eligible for version control.
