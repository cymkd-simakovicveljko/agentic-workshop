# Course content restoration verification — 2026-09-18

## Scope and evidence

This receipt records author-side execution and documentation checks performed on
2026-09-18. It supplements, and does not replace, the unchanged
[2026-09-17 app verification](verification.md).

The authored surface is the eight active lessons and their demo companions,
with navigation/overview integration. Restored material covers decisions,
failure cases, ordinary commands, and workplace transfer guidance. Sections 1–7
retain the independent branches of the nested `demo/todo-app` repository;
section 8 remains a separate legacy-exporter lesson. No todo-app or exporter
source changes are claimed by this restoration.

Source provenance is recorded in each lesson's **Sources and adaptation** notes:

- `sections_old/` supplied teaching concepts, not the active tooling or route.
  Its content and historical receipts remain unchanged.
- Current official OMP documentation supplied product claims: README, CLI
  reference, approval mode, context files, skills, keybindings, session
  operations, task tool, and Agent Hub. Provider, framework, and Feathers sources
  were also reviewed for the relevant material.
- Matt Pocock's *Full Walkthrough: Workflow for AI Coding* informed optional
  workflow framing in sections 3 and 4, not OMP commands or classroom claims.
- The todo-app exercises, prompts, acceptance sequences, and adaptations are
  course-authored teaching material, not evidence of a provider-backed run.

## Documentation gates

- Parent content/source review passed for all eight restored lessons.
- Lesson-stage local-link scan passed across **18 lesson/companion files**:
  **77 local links**, **10 anchors**, no reported link or anchor errors.
- Review corrected the section 3 link, aligned **Show unfinished tasks** with
  the solution UI, and identified branch-only `EXERCISE.md` as section 4's
  requirement source rather than `README.md`.
- Final integrated local-link scan passed across **28 active lesson, companion,
  navigation, plan, and receipt files**: **143 local links**, **11 anchors**,
  no reported link or anchor errors.
- All **55 lesson/companion shell blocks** passed `bash -n` syntax checks.
  Syntax checks alone do not establish runtime behavior; observed executions
  are recorded below.
- All **six documented exercise/solution branches** exist. The canonical
  todo-app repository remains clean on `main`, with all seven branches retained.

## Fresh learner checkout: observed command results

A fresh local clone of `demo/todo-app` was created with `git clone --no-hardlinks`.
Node reported **v22.22.2**; `npm install` and `npx playwright install` both exited 0.

Ordinary Git commands successfully inspected repository root, branch, HEAD,
working-tree/staged diffs, untracked files, and exercise/solution content. All
three exercise branches and their solution branches were switched successfully;
learner branches were created for remaining count, unfinished filter, blank-task
repair, and context handoff. `git stash push -u`, `git stash list`, and
`git stash apply` succeeded; applying the stash restored the untracked
`learner-note.txt`. This is command-path evidence, not an agent recovery rehearsal.

Observed suites used `npm test` and `npm run test:e2e`:

| Branch state | Unit result | Browser-suite result |
| --- | --- | --- |
| `exercise/remaining-count` on `my-remaining-count` | 4 passed | 1 passed |
| `exercise/blank-task-bug` on `my-blank-task-fix` | 2 passed, 2 intended failures; exit 1 | Not run in this evidence |
| `solution/blank-task-bug` | 4 passed | 1 passed |
| `solution/remaining-count` | 4 passed | 1 passed |
| `solution/unfinished-filter` | 4 passed | 2 passed |

The seeded bug failures concern blank-task rejection and trim preservation.
Passing browser suites exercised the existing add/complete/delete/persist test;
the filter solution also passed its existing unfinished-task visibility test.
These results verify existing branch behavior, not every newly described lesson
acceptance sequence. No fresh `main` suite or production build is claimed here.

## Separate legacy route: observed command results

The new direct route used `mktemp`, `mkdir`, `cp -R`/`cp`, and `node --test` under
Node v22.22.2, copying existing source and reference material into a temporary
lab. It did not use Python or the historical helper.

| Copied stage | Passed | Failed | Exit |
| --- | ---: | ---: | ---: |
| Baseline | 3 | 0 | 0 |
| Seam plus characterization | 9 | 0 | 0 |
| Feature tests against seam (intended red stage) | 1 | 2 | 1 |
| Completed reference, including compatibility | 15 | 0 | 0 |

The learner baseline copy also succeeded. These are local reference-stage
results, not a learner-authored repair, production integration, or rollout.

## Manual smoke, OMP checks, and limits

The parent launched the fresh remaining-count learner checkout with
`npm run dev -- --host 127.0.0.1 --port 5198 --strictPort`. A browser screenshot
confirmed **Tasks** rendered and **Course command smoke** was added as an unchecked
row. The tab and server were then closed. This manual smoke covered launch/add
only; it did not manually rehearse all new acceptance scenarios.

`omp --help` returned installed **v18.2.4**, including
`--approval-mode always-ask|write|yolo`; official documentation was checked.
No OMP TUI or provider-backed teaching rehearsal was performed. There was no
live skill comparison, framework adapter/validator trial, implemented harness
enforcement, production integration, or classroom timing rehearsal. Described
prompts, comparisons, recovery procedures, acceptance sequences, and expected
outcomes remain teaching instructions except where an observed result is
explicitly recorded above. This receipt does not claim complete classroom
acceptance.
