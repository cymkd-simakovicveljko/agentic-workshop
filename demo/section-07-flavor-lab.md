# Section 7 — one requirement, three representations

Compare plain OMP, an FSAD-style discussion and an OpenSpec-shaped change record
without changing the task or installing a framework. All examples below are
course-authored. They are proposed work, not captured agent output or a validated
framework installation. Reading and annotating them is a complete comparison;
implementation is an optional continuation of section 3.

## Understand

The useful question is not “which framework has more files?” It is “what failure
did this extra structure prevent?” Plain OMP can carry a precise specification.
A live discussion may reveal a decision nobody wrote down. A change record can
keep proposed behavior from masquerading as a shipped contract. None proves the
app works, and none removes human ownership of product choices.

We hold the baseline, goal, acceptance examples and repository access constant.
Only the representation and collaboration practice change. Do not deprive the
plain brief of a constraint and then credit another route for discovering it.

## Watch or try

### Start from the same baseline

From the course root, enter the **standalone nested repository**:

```sh
cd demo/todo-app
git status --short --branch
```

If there is unfinished work, stop before switching. Preserve it on your own branch
with a reviewed commit, or stash it with an identifiable message such as
`git stash push -u -m "before section 7 comparison"`. Remember where that work
belongs; do not automatically apply it to this exercise branch. Do not reset or
clean away earlier exercises.

When the working tree is safe to switch, create your own branch rather than
editing the prepared exercise branch:

```sh
git switch exercise/unfinished-filter
git switch -c my-flavor-comparison
npm install
npm run dev
```

Choose another unused learner branch name if that one already exists. Open the
URL Vite prints. The baseline supports adding, completing, deleting and persisting
tasks; it does not yet have the unfinished-task filter. Inspect the current app
and tests before treating that description as observed evidence.

In another terminal in `demo/todo-app`, the ordinary checks are:

```sh
npm test
npx playwright install
npm run test:e2e
```

The Playwright browser installation is needed only if browsers are not already
available. It is unrelated to installing FSAD or OpenSpec. For an agent-assisted
comparison, launch `omp` in this app directory and paste a selected brief and
prompt. Use your existing authorized provider setup. For an offline comparison,
read the examples below and write your review in personal notes instead.

“No edits” in a prompt states the task boundary; do not treat prose as technical
isolation. This exercise needs no credentials in files, publication, framework
installation or generated configuration.

### The shared requirement and acceptance examples

**Current baseline:** all stored tasks are visible; task data and completion
states persist in `localStorage`; there is no unfinished-only checkbox.

**Proposed:** add an initially unchecked, keyboard-operable checkbox labeled
“Show unfinished tasks.” Checking it hides completed tasks without deleting them.
Unchecking it restores the full list. Add, complete, delete and task persistence
remain intact. The filter is local view state and starts off on a fresh page load;
do not persist a filter preference. No backend, new dependency, storage migration
or unrelated redesign is required.

Every route receives the following examples, not only its own excerpts:

| ID | Given / action | Expected observation |
| --- | --- | --- |
| A1 | Start with unfinished “Write brief” and completed “Send invite.” | Both are visible; the filter is unchecked. |
| A2 | Check and then uncheck the filter. | Only “Write brief” is visible while checked. Both return when unchecked, with completion states unchanged. |
| A3 | With filtering on, complete “Write brief.” | It disappears immediately; turning filtering off reveals it completed. |
| A4 | With filtering on, add a task; then delete a visible unfinished task. | The new task appears. The intended task is deleted and stays deleted after toggling and reloading; hidden completed tasks remain. Include a completed row before the visible row to catch actions aimed at the wrong task. |
| A5 | Reload after changing task completion or deletion. | Task changes persist, including completed tasks hidden before reload. The filter starts off; the full remaining collection is visible. |
| A6 | Use an empty collection, then an all-completed collection; operate the checkbox by keyboard. | Neither collection crashes. Filtering can produce an empty view without deleting tasks. Turning filtering off restores completed tasks; the labeled control is reachable and operable. |

No new empty-state wording is prescribed. The important distinction is that “no
visible unfinished tasks” is not “no stored tasks.” The same examples must survive
any proposed wording change.

### Route A: plain OMP brief

This is a complete small work brief without a framework folder. It can live in an
issue or one maintained note; “plain” does not mean keeping decisions only in chat.

```text
Goal: Focus on unfinished tasks without losing completed ones.
Status: Proposed; not implemented or verified by this brief.

Current: The app shows all tasks and persists task data locally.
Change: Add an initially unchecked “Show unfinished tasks” checkbox.
It hides completed tasks without changing the stored collection. Unchecking
restores all tasks. Completing a task while filtering hides it immediately.
Adding/deleting still affects the intended tasks; task persistence stays intact.
The checkbox is keyboard-operable and resets off on a fresh page load.

Acceptance: A1–A6 in the shared requirement above, unchanged.
Scope: Existing todo app; no new dependency, backend, storage format or persisted
filter preference. Preserve unrelated learner work.

Plan to review: Inspect task state, rendering, actions and persistence. Derive
visible tasks from the full collection and local filter state. Keep actions tied
to task identity. Connect A1–A6 to automated checks and browser observations.

Evidence: None yet. A plan or generated test is not an observed result.
```

Give OMP the brief **and the A1–A6 table**, then ask:

```text
Review this brief against the app and tests without editing files. Identify
current behavior, proposed changes and unresolved decisions. Give the smallest
plan and checks for A1–A6. Do not claim any check ran unless it actually did.
```

**What a good review notices:** saving a filtered array could erase hidden tasks;
using visible row positions could make delete affect the wrong task; checking only
“one row remains” would not prove the completed task survives. These are review
questions and potential bugs, not claims that the baseline contains them.

**Cost and benefit:** one brief is easy to read and keep current. The author must
make status and decisions explicit; if the brief grows into many competing
versions, its lack of a formal home may become a real handoff problem.

### Route B: FSAD-style discussion and decision record

The FSAD playbook describes live specification with product, UX and engineering.
We adapt that practice here; this is not a rollout of its complete methodology.
Give all participants the same shared brief and A1–A6. The following is an
illustrative authored conversation, not evidence that a team held it.

**Product:** “Keep completed tasks available. The user asked for focus, not
permanent cleanup. Hiding and deleting are different promises.”

**UX:** “When I finish the last visible task, it disappears. Keep the filter
control available so I can get the full list back. A blank visible list must not
imply that completed tasks were lost. Keyboard users need the same interaction.”

**Engineering:** “We should derive visibility from the stored task collection.
If visible positions become task identities, a completed row hidden earlier in
the list can shift the target of complete or delete. The checks must exercise
that mixed-list case.”

**Product:** “Should the app remember that I selected the filter?”

**UX:** “Remembering might be convenient, but it could reopen an apparently empty
list with completed tasks hidden. A fresh full view is predictable for this change.”

**Engineering:** “Persisting the preference would be another contract and another
storage decision. The shared brief already excludes it; changing that requires
agreement and the same update to every comparison route.”

The resulting record should capture the decision, not three flattering summaries:

```text
Decision: Use the initially unchecked checkbox view described in A1–A6.
Rejected: Deleting completed tasks; violates reversible visibility and persistence.
Deferred/out of scope: Remembering filter preference across page loads.
Reason: Focus on unfinished work while preserving access to completed history.

Interaction: Complete while filtered -> row disappears immediately.
Filter off -> all remaining tasks return with current completion states.
An empty visible list is allowed; it does not authorize clearing stored data.

Acceptance: A1–A6 unchanged. Product choice is recorded for this course example.
Implementation handoff: Keep full task data separate from view selection; preserve
identity-based actions and existing persistence; use the app's existing patterns.
Evidence needed: Transition, identity, persistence and keyboard checks below.
Status: Decision recorded; implementation and checks still unperformed.
```

Prompt for agent assistance:

```text
Using the shared brief and A1–A6, surface a product, UX or engineering disagreement
that would matter. Separate facts from suggestions; do not invent consensus.
Do not edit files. Draft a decision record only after I resolve open choices.
```

**Cost and benefit:** a joint conversation can reveal incompatible mental models
before code is written. Scheduling, facilitation and maintaining the decision
record cost effort. Role-play by one agent is useful preparation, not independent
expert review. If the discussion changes no decision and reveals no missing
constraint, say so rather than manufacturing a benefit.

### Route C: OpenSpec-shaped change record

These are **inline teaching artifacts**, not files already installed in the app.
Their paths illustrate current versus proposed ownership. We have not run an
OpenSpec validator or adapter against them, and the lab does not ask you to do so.
The same brief and A1–A6 still apply.

**Current — `openspec/specs/task-list/spec.md`:**

```markdown
# Task List Specification

## Purpose
Manage a local task list while preserving tasks across page loads.

## Requirements

### Requirement: Task visibility
The app SHALL display both unfinished and completed stored tasks.

#### Scenario: Mixed collection
- GIVEN unfinished “Write brief” and completed “Send invite”
- WHEN the app is opened
- THEN both tasks are displayed with their completion states

### Requirement: Task lifecycle
The app SHALL allow adding, completing and deleting individual tasks and persist
the remaining tasks and their completion states across page loads.

#### Scenario: Completion persists
- GIVEN an unfinished task
- WHEN it is completed and the app is reloaded
- THEN that task remains completed

#### Scenario: Deletion persists
- GIVEN a stored task
- WHEN it is deleted and the app is reloaded
- THEN it remains absent and the other tasks remain
```

This baseline record intentionally does **not** describe a checkbox that has not
been implemented. It summarizes the relevant contract, not every possible app
behavior; check it against the selected baseline before adoption.

**Proposal — `openspec/changes/unfinished-filter/proposal.md`:**

```markdown
# Proposal: Unfinished-task filter

## Why
Users need to focus on unfinished work without losing completed task history.

## What changes
Add a reversible, initially unchecked “Show unfinished tasks” checkbox.
Modify task visibility; preserve the existing task lifecycle and persistence.
Use shared acceptance examples A1–A6 without weakening them.

## Non-goals
No deletion of hidden tasks, backend, dependency, storage migration, persisted
filter preference or unrelated redesign.

## Status
Proposed only. Implementation and verification have not been performed.
```

**Proposed delta — `openspec/changes/unfinished-filter/specs/task-list/spec.md`:**

```markdown
## MODIFIED Requirements

### Requirement: Task visibility
The app SHALL initially display all stored tasks. It SHALL provide an initially
unchecked, labeled, keyboard-operable “Show unfinished tasks” checkbox.
When checked, only unfinished tasks SHALL be displayed. Unchecking SHALL restore
all remaining tasks with their current completion states. Visibility changes
SHALL NOT mutate the stored task collection. The filter SHALL start off on a
fresh page load. The existing task lifecycle and persistence SHALL remain intact.

#### Scenario: Mixed collection
- GIVEN unfinished “Write brief” and completed “Send invite”
- WHEN the app is opened
- THEN both tasks are displayed with their completion states
- AND the filter is unchecked (A1)

#### Scenario: Reversible filtering
- GIVEN the mixed collection
- WHEN the filter is checked
- THEN only “Write brief” is displayed
- WHEN the filter is unchecked
- THEN both tasks return with completion states unchanged (A2)

#### Scenario: Completion while filtering
- GIVEN “Write brief” is visible with the filter checked
- WHEN it is completed
- THEN it immediately disappears from the filtered view
- AND it reappears completed when the filter is unchecked (A3)

#### Scenario: Adding and deleting while filtering
- GIVEN a completed stored task precedes a visible unfinished task
- AND the filter is checked
- WHEN a task is added
- THEN the new unfinished task is visible
- WHEN a visible unfinished task is deleted
- THEN only the intended task is removed
- AND it stays absent after toggling and reloading
- AND the hidden completed task is retained (A4)

#### Scenario: Reloading preserves task data
- GIVEN task changes were made while the filter was checked
- WHEN the page is reloaded
- THEN task changes persist, including hidden completed tasks
- AND the filter is unchecked and all remaining tasks are visible (A5)

#### Scenario: Empty views and keyboard control
- GIVEN an empty or all-completed collection
- WHEN the filter is operated with the keyboard
- THEN the app remains usable and the labeled checkbox can be toggled
- AND filtering an all-completed collection shows no task rows
- AND unchecking restores completed tasks without data loss (A6)
```

Why **MODIFIED**, not only **ADDED**? “Display all tasks” is no longer an
unconditional rule. Keeping it unchanged next to “hide completed tasks” would
leave two conflicting requirements. Keep the old mixed-collection scenario and
extend it; do not lose the preserved default while documenting the new case.
The lifecycle requirement remains in the current spec, not duplicated as a
separate competing proposal.

**Design — `openspec/changes/unfinished-filter/design.md`:**

```text
Keep the existing task collection and persistence path. Represent the checkbox
as local view state, initially false; derive visible tasks rather than replacing
the collection with a subset. Preserve identity-based actions and existing UI
patterns. Use a labeled native checkbox. No new state library or saved preference.
Inspect the actual implementation before choosing exact edit locations.
```

**Tasks — `openspec/changes/unfinished-filter/tasks.md`:**

```markdown
- [ ] Inspect baseline task state, actions, rendering, persistence and tests.
- [ ] Review the proposed visibility delta against A1–A6 and resolve mismatches.
- [ ] Implement the checkbox and derived view without changing stored task data.
- [ ] Check default, on/off restoration and completion while filtered (A1–A3).
- [ ] Check add/delete identity with a hidden earlier row, then reload (A4–A5).
- [ ] Check empty/all-completed collections and keyboard operation (A6).
- [ ] Run existing app tests and review the complete diff; record actual results
      and any unperformed observations before accepting the change.
```

Leave these unchecked while they are only a proposal. The headings and checkboxes
organize work; they are not evidence that it happened. Current OpenSpec describes
sync/archive workflows for maintaining specifications and history. Do not apply
that lifecycle merely to give this unfinished teaching example a tidy ending.

Prompt for a review, not adapter invocation:

```text
Compare these current and proposed artifacts with the shared A1–A6 brief and the
app. Do not edit files or install anything. Identify conflicting requirements,
lost baseline behavior and checks that would not prove their claimed outcome.
Distinguish structural issues, product decisions and missing runtime evidence.
```

**Cost and benefit:** status and change boundaries are visible even to a new
reviewer, and the decision history has a home. There are more artifacts to keep
consistent. For this small feature, that extra maintenance may not be worthwhile;
it becomes a stronger candidate when several proposals or cross-team contracts
must be reviewed independently.

### Connect each route to the same verification

A proposal comparison can stop before implementation. If continuing, choose **one
canonical brief**, review its plan, and use the implementation and review route in
[section 3](../sections/03-the-everyday-workflow.md). Do not build the feature three
times just to fill a framework scorecard.

| Contract | Useful evidence after implementation | Weak substitute |
| --- | --- | --- |
| A1–A2 default and restoration | Observe both named tasks, toggle on/off, confirm labels and completion states | Only count visible rows while on |
| A3 live transition | Complete while the filter is already checked and observe immediate disappearance, then restore | Complete first, then enable filter |
| A4 correct task identity | Hide an earlier completed row, delete a later visible task, confirm the intended task alone is gone | Delete the first row in an all-unfinished list |
| A5 persistence | Reload after changes; inspect restored task identities and states | Trust that storage code was untouched |
| A6 empty view and keyboard | Exercise empty/all-completed data, reach and operate the labeled checkbox with keyboard | Only a screenshot or a test that an input exists |

Run `npm test` and `npm run test:e2e` for the selected implementation and inspect
what those checks actually cover. Record remaining browser observations honestly;
passing tests is not a complete accessibility audit. Preserve your work before any
comparison with `solution/unfinished-filter`; do not switch away from a dirty
learner branch.

## Use at work

### Make a selection record

Fill this out using observations, not invented gains:

| Question | Record something specific |
| --- | --- |
| What recurring problem motivated a flavor? | A real missed decision, ambiguous status or repeated handoff failure |
| What did plain prompting already resolve? | The exact rule or example; do not pretend the baseline was empty |
| What did the alternative add? | A disagreement surfaced, contradiction found or clearer current/proposed boundary |
| What remains unsupported? | Unimplemented behavior, unrun checks, absent stakeholders or untested integration |
| What did it cost? | Extra reading, discussion, duplication, generated instructions and upkeep |
| What happens on the next change or on removal? | Name the owner of the canonical decision and how useful history is retained |
| What will you keep? | The lightest useful practice, with a reason to reconsider later |

You may combine the FSAD-style discussion with one OpenSpec-shaped record, but
write the decision into that record rather than also maintaining an identical
plain brief. This is a course-designed composition, not a claim of official
FSAD/OpenSpec integration. Framework choice does not decide scope or authorize
parallel execution.

### Discuss the failure cases

- **The artifact validator passes, but the checkbox does not exist.** The record
  may be structurally valid; the feature is still unimplemented.
- **The discussion ends with one person expecting persistence and another expecting
  a fresh full view.** Resolve it in the canonical proposal before dependent work.
- **A generated task list asks for several workers on this tiny feature.** Judge
  independent useful work and integration cost; the template is not authority.
- **The plain brief resolves every uncertainty.** Keeping it is a complete answer.

## Go deeper

### Sources and adaptation

- [OMP README — entry points](https://github.com/can1357/oh-my-pi/blob/main/README.md#four-entry-points-interactive-one-shot-rpc-and-acp) documents `omp` as the interactive TUI. The prompts here are ordinary course-authored instructions, not new OMP commands.
- [FSAD workflow](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/workflow) describes its phases and cross-functional live specification; [comparison](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/comparison) contains the author's claims to examine critically. This lab adapts only the discussion practice and makes no speed or staffing claim.
- [OpenSpec concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md) describes specifications, deltas and change records. The inline artifacts illustrate those distinctions but have not been installed or validated as an OpenSpec project.
- [OpenSpec supported tools](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md) lists Oh My Pi separately from Pi. Follow its current host-specific guidance if conducting a separate integration trial; none is required or claimed here.

The examples and comparison criteria are authored teaching material, not official
framework examples or measured results. A later attempt benefits from familiarity
with the task; one classroom comparison cannot establish productivity. The
retained files under `section-07-examples/` are historical owner-search material,
not an active todo-app dependency.

[Back to section 7](../sections/07-optional-flavors.md)
