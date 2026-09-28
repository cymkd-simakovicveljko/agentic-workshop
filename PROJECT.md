# Guided projects and starting states

Start with the [main outline](OUTLINE.md), [Introduction](sections/introduction.md), and [Get Ready](sections/01-get-ready.md). The main course follows the first commit's eight-section progression with a website health checker as the shared project.

## Main course: bring a familiar language

Learners build a website health checker: request a URL, check its HTTP status and expected body text, measure elapsed time, and report success or failure. The [local fixture guide](demo/health-checker/README.md) defines the shared endpoints and acceptance rules. Keep that fixture unchanged and separate from the learner's checker repository.

Everyone follows the same brief and checks the same behavior. Each learner chooses a language they can review and uses its normal run and test tools. There are no separate language tracks or supplied starter implementations. Later exercises build on the program they created.

The shared setup is Git, Bun for OMP and the fixture server, OMP itself, and approved model access. A working compiler or runtime for the learner's chosen language is also needed. Section 1 creates the single-target checker; section 3 extends it to several configured targets. Later practical exercises use that reviewed program. Complete those core sections before skipping ahead; there are no supplied language-specific solution branches. Live model runs and classroom pacing still need rehearsal.

## Older alternative: todo app prerequisite

The section numbers and exercise branches below belong only to the [retained eight-section alternative](alternatives/eight-section-outline.md). Its missing app does not block the new main route.

The canonical app belongs at `demo/todo-app`. Its intended baseline adds, completes and deletes tasks, then persists them in browser `localStorage`. It has no accounts, backend, routing, UI library or state-management layer.

**The canonical repository is absent from this checkout.** Git records a nested-repository commit, but its source and exercise branches are unavailable. Recover the original repository or a bundle containing its branches before running app exercises. Do not recreate its history from prose or replace it with the historical app under `demo/public`.

| Section | Situation | Independent starting state |
| --- | --- | --- |
| 1 | Add a remaining-task count | `exercise/remaining-count`; reference `solution/remaining-count` |
| 2 | Explain the first run and interpret usage | Observed run or explicitly prepared trace in the [agent-loop companion](demo/section-02-agent-loop.md) |
| 3 | Choose a host/session action | [Host-operation companion](demo/section-03-working-with-omp.md); disposable state, not unfinished app work |
| 4 | Show only unfinished tasks | `exercise/unfinished-filter`; reference `solution/unfinished-filter` |
| 5 | Repair guidance and evaluate a skill | [Context and handoff](demo/section-05-context-and-handoff.md) and [skill lab](demo/section-05-skill-lab.md) |
| 6 | Repair blank-task acceptance and assess enforcement | `exercise/blank-task-bug`; reference `solution/blank-task-bug`; [recovery lab](demo/section-06-recovery-lab.md) |
| 7 | Coordinate dependent work after a requirement changes | [Coordination lab](demo/section-07-coordination-lab.md), independently of section 8 |
| 8 | Evaluate a harness design or preserve consumer compatibility | [Harness and enterprise lab](demo/section-08-harness-and-enterprise-lab.md), with a separate exporter starting state |

Branch names stay tied to behaviors, not section numbers. Once the app is recovered, use its own setup guide, preserve unfinished work before switching, and create a learner work branch from the stated exercise branch. The documented app commands are `npm install`, `npm run dev`, `npm test` and `npm run test:e2e`; their availability must be checked against the recovered source. They have not been exercised here during this revision.

## Retained eight-section alternative: exporter and evidence

The [legacy exporter](demo/section-08-legacy/README.md) is present. In this
alternative, section 7 uses a larger-change coordination case; section 8 Part B
teaches characterization, seams and consumer compatibility. Start each lab
independently. Part A of section 8 is a harness design assessment, not an
implemented orchestrator.

The [revision plan](2026-09-22-course-review-and-action-plan.md) records scope and verification limits. Historical [restoration evidence](_build/todo-demo/2026-09-18-content-restoration-verification.md) does not prove that the missing app or revised exercises run in this checkout. Local tests prove only the behavior they exercise, not provider-backed teaching, deployment readiness or classroom timing.
