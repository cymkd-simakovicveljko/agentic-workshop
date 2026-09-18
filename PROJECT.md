# Guided project — todo app

**Status:** Implemented local demo route with restored teaching depth, executable
ordinary commands and source/adaptation notes. The app lives in
[`demo/todo-app`](demo/todo-app/), a standalone local Git repository nested in the
course workspace. `main` is the working baseline; no remote publication is part of
this course material. Section 3 remains the practical core.

The baseline does exactly four things: add, complete and delete tasks, then persist
them in browser `localStorage`. It deliberately has no accounts, backend, routing,
UI library or state-management layer.

| Section | Situation | Branch or material |
| --- | --- | --- |
| 1 | Add a remaining-task count | `exercise/remaining-count` → `solution/remaining-count` |
| 2 | Explain the loop from section 1 | An observed run or labelled prepared trace |
| 3 | Show only unfinished tasks | `exercise/unfinished-filter` → `solution/unfinished-filter` |
| 4 | Resume from a stale handoff | [Context and handoff companion](demo/section-04-context-and-handoff.md); no setup puzzle |
| 5 | Review a proposed unfinished filter | [Inline candidate and focused procedure](demo/section-05-skill-lab.md); no installed course skill |
| 6 | Fix acceptance of blank tasks | `exercise/blank-task-bug` → `solution/blank-task-bug` |
| 7 | Specify the unfinished filter | [Inline comparative artifacts](demo/section-07-flavor-lab.md): plain OMP / FSAD-style / OpenSpec-shaped |
| 8 | Work at enterprise scale | Separate [legacy exporter lab](demo/section-08-harness-and-enterprise-lab.md), using direct POSIX/Node commands |

Each exercise starts independently from its named branch. Learners create their own
work branch and preserve unfinished work before switching. See the [todo README](demo/todo-app/README.md)
for commands and normal test setup.

The [restoration plan](2026-09-18-content-restoration-plan.md) records the implemented
teaching changes; the [new verification receipt](_build/todo-demo/2026-09-18-content-restoration-verification.md)
records author-side evidence and limits without replacing the original app receipt.
The [earlier full draft](sections_old/) is historical source, not the active route.

This project is a vehicle for engineering practice, not React training. A passing
unit or browser suite is evidence for app behavior, not a live OMP run. No
provider-backed teaching or classroom timing rehearsal was performed for this
restoration; whole-course classroom readiness remains unclaimed.
