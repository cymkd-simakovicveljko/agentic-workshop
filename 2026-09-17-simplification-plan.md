# Course simplification plan

**Status:** Agreed direction from Petar's Q1–Q12 interview; implementation not started. Petar requested this plan before changes to the demo or lessons.

**Goal:** Help engineers start using OMP in daily work. Preserve the [eight-section outline](alternatives/eight-section-outline.md); distil the teaching and make the examples concrete, not redesign the curriculum. Section 3 remains the practical core.
**Promotion note (2026-09-27):** The five-part route is now the main course at [OUTLINE.md](OUTLINE.md). This plan records the earlier eight-section direction.

## Agreed boundaries

- One tiny React + Vite todo app. No backend, accounts, routing, UI library, or state-management library.
- Working baseline: add a task, mark it done, delete it, and persist across refreshes in browser `localStorage`. Nothing else.
- Unit tests with Vitest and end-to-end tests with Playwright. Normal test commands, not a custom verification framework.
- Independent exercise starting points on Git branches. No prerequisite exercise completion, checkpoint system, or custom preparation commands for learners.
- Short, natural prompts with follow-ups at real decision points. Important constraints and expected behavior stay explicit; teaching explanations stay outside prompts.
- Each section offers a sufficient-to-start main path and optional depth. Keep the theory/practice mix and curated resources.
- Section 8 retains its separate enterprise example and Michael Feathers material. Do not expand the todo app to simulate enterprise architecture.

## Implementation sequence

### 1. Build the working todo baseline

Create the canonical app at `demo/todo-app/`, with one screen and plain CSS. Use standard Vite structure and keep state in the app; extract only logic that is useful to test independently. Do not introduce generic repositories, services, providers, or a design system.

Include labelled controls, keyboard operation, stable task identity, and ordinary browser-storage handling. Blank tasks should be rejected in the working baseline; a later bug exercise deliberately changes that behavior. A storage failure must not crash the UI or falsely imply that changes were saved.

Document only the normal prerequisites and startup route: supported Node version, `npm install`, and `npm run dev`. Do not require Python or special OMP profiles to run the core demo. Explain OMP installation and authorized provider access separately, preserving essential safety guidance without copying the old isolation machinery.

**Exit condition:** The browser can add, complete, and delete tasks, and refresh preserves the resulting state. No exercise feature has been added to the baseline.

### 2. Add straightforward unit and end-to-end coverage

Use `npm test` for the unit suite and `npm run test:e2e` for the browser suite. Document Playwright's browser-install command once. Let Playwright's standard web-server configuration manage its test server.

- Unit tests defend observable task behavior and meaningful boundaries, including blank-input rejection and changing the intended task without changing another.
- End-to-end tests exercise the real page: add, complete, delete, and reload to verify persistence. Isolate browser storage between tests.
- Keep tests deterministic and focused; do not assert component structure, internal state copies, or incidental text.
- Exercise reference solutions add checks for their new behavior. A bug exercise includes a reproducer that fails before the fix and passes after it.

**Exit condition:** Both suites pass on the baseline; the app has also been exercised visually. Tests support the lesson rather than becoming a separate course infrastructure project.

### 3. Prepare independent exercise branches

The current `demo/` belongs to the Pepe workspace Git repository, not a standalone app repository. Create a dedicated repository for `demo/todo-app/`; do not put course exercise branches on the workspace repository or mix its history into learner material. Record this repository boundary in the course navigation. Publishing to a remote is not authorized or required by this plan.

Keep `main` as the working baseline. Each code exercise gets an `exercise/<topic>` branch with its own brief and complete starting state. Provide a corresponding `solution/<topic>` branch for presenters and self-review. Use ordinary Git, not branch-generation or checkpoint tooling. A worksheet can reuse an existing branch rather than creating a branch for every section.

Learners switch to the named starting branch and create their own work branch. Explain once how to preserve unfinished changes before switching; do not prescribe destructive resets. Bug branches clearly identify expected failures so learners can distinguish a teaching defect from broken setup.

Proposed exercise mapping, to be checked against each section's learning purpose during editing:

| Section | Concrete teaching example | Starting state / learner action |
|---|---|---|
| 1. Getting started | Add a remaining-task count | Working baseline; one visible change, check it and inspect the diff. |
| 2. Foundations | Explain the agent loop from section 1 | Reuse an observed run or clearly labelled prepared trace; no additional feature required. |
| 3. Everyday workflow | Show only unfinished tasks | Independent baseline; clarify behavior, plan, implement, test, and review. Turning the filter off restores the full list without deleting tasks. |
| 4. Context and repository knowledge | Resume work from a stale handoff | A small todo-related discrepancy; correct the guidance and produce a useful handoff. Avoid a separate setup puzzle. |
| 5. Skills | Review a proposed unfinished-task filter | A prepared candidate with one understandable issue; use a focused review skill and compare it with an ordinary review. |
| 6. Reliable execution | Fix acceptance of blank tasks | An isolated seeded defect; reproduce, fix, run unit and browser checks, and review. Keep richer recovery/delegation scenarios optional. |
| 7. Optional flavors | Specify the same unfinished-task filter | Compare plain OMP, FSAD-style discussion, and OpenSpec using identical requirements. No mandatory framework installation for the core app. |
| 8. Harness and enterprise work | Existing separate legacy example | Preserve its distinct code and teaching purpose; polish explanations and prompts without porting it to React. |

**Exit condition:** Each advertised code exercise can start without completing another. Every solution is runnable and demonstrates its advertised behavior. The baseline and solutions pass their relevant suites; deliberately broken branches fail only in the documented way.

### 4. Distil the lessons and companion material

Use section 1 as the style reference, review it with Petar, then apply the pattern section by section. This preserves the agreed collaborative review process; the target remains all eight sections, not only the introductory lesson.

Each section's main path should contain:

1. **Understand:** the concept and why an engineer needs it.
2. **Watch or try:** one concrete situation, natural prompt, and observable result.
3. **Use at work:** how the practice transfers to a real repository.
4. **Go deeper:** advanced variations and existing reading, videos, and links.

Keep section 3 deeper than the others, but move secondary examples and long explanations out of its main walkthrough. Shorten prompts by removing repeated orchestration and report templates, not by removing essential requirements. Do not force every small task through an elaborate six-prompt ceremony; use follow-ups when an actual decision arises.

For example:

> Add a checkbox to show only unfinished tasks. Turning it off should show all tasks again.

The lesson explains why reversible filtering matters. A follow-up is appropriate if the proposed behavior is ambiguous or a check is missing, not merely because the script needs another step.

Retain useful workplace transfer examples, making each concrete with a situation, opening prompt, and expected result. Avoid introducing another application or tool stack for each example.

**Files in scope:** `sections/01-*.md` through `sections/08-*.md`; `demo/section-01-setup.md` through the section 8 companion material; section 3 worked examples; section 7 worked examples; demo skills and agent instructions wherever they refer to the replaced app. Read affected files before editing; preserve section 8's runnable enterprise behavior.

Update `PROJECT.md`, `demo/README.md`, the course `README.md`, and current status references in `OUTLINE.md` to identify the actual new route. Remove obsolete preparation steps from active lessons. Keep historical review records truthful: prior validation receipts do not validate the new demo. After the new route is demonstrated, retain superseded material as clearly labelled history and update affected links; do not delete unrelated work or rewrite old evidence as if it described the new app.

**Exit condition:** No active core lesson sends learners to the old project-directory app, custom preparation helpers, or checkpoints. Theory and useful resources remain available without obstructing the main path.

### 5. Rehearse the delivered route

- Start from a fresh learner checkout and execute the documented install, startup, branch-selection, and test commands.
- Exercise the baseline and visible feature changes in a real browser; verify persistence across refresh and filtering without data loss.
- Run the baseline and solution unit/e2e suites. Confirm the intentional bug reproduces on its exercise branch and is fixed on its solution branch.
- Rehearse section 1 and section 3 with OMP and an authorized provider when available. Label prepared examples and report any unavailable live-provider verification explicitly; automated tests are not evidence of a successful OMP teaching run.
- Check updated local links, branch names, commands, and references. Preserve the separate enterprise example's existing behavior if any executable material changes.
- Save concise verification receipts and any necessary author-side build material under `_build/todo-demo/`, not in the learner path. Do not claim classroom timing without a timed rehearsal.

**Exit condition:** A learner can follow the written core route without hidden setup or a previous exercise's state. Verification distinguishes app behavior, OMP rehearsal, and classroom readiness.

## Completion criteria

- A working, deliberately small todo app with passing unit and end-to-end tests.
- Independent, documented starting Git branches and usable reference solutions.
- Concrete, shorter prompts and a clear main path across all eight sections.
- Preserved theoretical depth, resources, and separate enterprise teaching material.
- Current navigation and examples point to the same canonical app and branch names.
- Evidence supports the tested behaviors; remaining live-rehearsal limits are stated.

## Not included

A curriculum redesign, React training, new course-duration commitments, backend services, authentication, CI infrastructure, deployment, remote publication, or claims that the course is classroom-ready. None is necessary to deliver this refinement.
