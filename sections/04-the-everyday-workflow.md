# 4. The everyday workflow

**Practical core.** Take an ordinary request through to a change you can explain
and accept. The example is small enough to understand end to end: add a checkbox
that shows only unfinished tasks in the todo app. The difficulty is not producing
a checkbox. It is preserving the tasks, acting on the right row, and knowing what
the evidence actually establishes.

**Starting-state boundary:** the canonical `demo/todo-app` checkout is currently
missing from this course distribution. The app paths, branch names and implementation
details below describe the prepared course exercise, not inspected source in this
checkout. Follow [setup](../demo/section-01-setup.md) to recover the canonical app
before running them, then confirm the brief, files and scripts. Do not reconstruct
it from the excerpts or substitute the historical `demo/public` app. You can study
the acceptance examples and review packet now; that is prepared practice, not an
app, provider or classroom rehearsal.

## Understand

### Six decisions, not six compulsory prompts

| Stage | Question | Useful output |
| --- | --- | --- |
| Explore | What happens now, and where? | The relevant state/rendering path, current checks and consequential unknowns |
| Specify | What should change, and what must remain true? | Observable examples, boundaries and resolved product decisions |
| Plan | What is the smallest coherent route? | A few edits linked to reasons and checks |
| Implement | Does the change follow that route without widening the job? | Focused code and checks for plausible mistakes |
| Verify | What did we actually observe on this code state? | Automated results and direct interaction evidence |
| Review | Does this deserve acceptance? | A decision based on the request, diff and remaining uncertainty |

These are thinking stages, not six meetings or a required prompt sequence. A
familiar correction can fit in one request. An unfamiliar feature benefits from
an inspection-only turn before implementation. If verification contradicts your
assumption, return to exploration; if the requirement was incomplete, return to
specification. Repeating a failed command is not a substitute for either decision.

Together these decisions form a small **software development lifecycle (SDLC)**:
intent and design lead to implementation, verification, review, delivery and
maintenance. The arrows are not one-way. A wrong-row browser result sends us back
to the state and identity path; a request to remember the filter changes the
specification and the checks before more implementation. Delivery here means an
accepted local change with a factual handoff. The lab does not deploy a service,
publish a package or prove production readiness.

“Show only unfinished tasks” sounds precise until you ask what happens to completed
tasks. Are they hidden or deleted? Can you still add tasks? Does completing a
visible task make it disappear immediately? What should a refresh preserve? The
engineer owns these decisions even when an agent supplies the code.

### Outcome, implementation and evidence are different

For this task, the outcome is a reversible view of the same task collection.
“Completed tasks return when I turn the filter off” is acceptance behavior.
“Derive a visible list from `tasks`” is an implementation choice supported by this
app. “I checked it with two tasks in a browser” is evidence for a particular case,
not proof of every interaction.

Keep these distinctions in conversation. An agent can build a tidy implementation
of the wrong behavior. A test can faithfully repeat that misunderstanding. A green
baseline can protect existing behavior while exercising none of the new feature.

### Choose a thin, verifiable slice

Our first slice runs through the whole interaction: checkbox → visible rows →
completed task returns when unchecked. It is not “build the state layer now and
wire the UI later.” An early end-to-end check exposes whether the state and UI
agree before more code accumulates. Then challenge that slice with completion,
deletion, all-completed and reload cases before accepting it.

This adapts the thin-vertical-slice idea in Matt Pocock's *Full Walkthrough:
Workflow for AI Coding*: agree the destination, take a small end-to-end step,
and use feedback to choose the next step. It is course guidance, not an OMP mode,
a prescribed document framework or permission to stop after the happy path.

## Watch or try

Use the [lab companion](../demo/section-04-workflow-lab.md) for the complete browser
sequence and evidence sheet. You can start independently of section 1.

### Prepare the right repository without losing work

The commands below start at the **course root**. `demo/todo-app` is its own Git
repository, not the course repository. Inspect before switching:

```sh
cd demo/todo-app
git rev-parse --show-toplevel
git status --short --branch
```

The repository root must be the todo app. If Git reports the outer course root,
stop and use the [setup guide](../demo/section-01-setup.md); do not create exercise
branches in the wrong repository. If status shows existing work, preserve it on
its current branch or make a separate working copy before continuing. Do not use
reset, clean or forced switching to make these instructions succeed. Choose a
fresh branch name if `my-unfinished-filter` already exists.

Once the app working tree is ready, run from **`demo/todo-app`**:

```sh
git switch exercise/unfinished-filter
git switch -c my-unfinished-filter
git rev-parse HEAD
npm install
npx playwright install
npm test
npm run test:e2e
```

Record the starting revision and actual baseline results. The install steps are
normal local setup; skip them if the existing dependencies and browser binaries
are already ready. Inspect any resulting lockfile change rather than quietly
folding it into the feature. A missing browser executable or unavailable package
registry is a setup limitation, not a failing filter acceptance test.

In another terminal, also at **`demo/todo-app`**, start the app:

```sh
npm run dev
```

Open the URL Vite prints. Use a disposable browser profile or only synthetic tasks:
localStorage belongs to the browser origin and survives reloads and Git branch
switches. Branches do not give you separate browser data. The existing Playwright
configuration starts its own local server; keep an unrelated server off its
configured port so you do not test a different working copy.

If OMP is already set up, open a third terminal in **`demo/todo-app`** and run:

```sh
omp --approval-mode always-ask
```

`omp` starts the interactive TUI; the explicit launch flag requests the course's
approval mode. Check the effective controls from
[section 3](03-working-with-omp.md), because configuration and rules still matter.
The prompts below are ordinary requests, not special commands or a sandbox.
Keep this exercise local in the environment established in
[section 1](01-getting-started-with-omp.md). The feature needs no credentials,
remote publication or additional tool installation.

### Explore: find the path, not every file

Begin with the existing behavior: add a task, complete it, reload, and delete it.
Then ask:

```text
Inspect this todo app and its tests for an unfinished-task filter. Do not edit
files yet. Trace task state, rendering and persistence; explain what the current
checks cover and what decision would change the approach. Keep it concise.
```

A useful result connects files to behavior rather than listing filenames:

- `src/App.jsx` owns task state and renders rows. Task-changing actions use
  `changeTasks`, which updates state and saves the full collection.
- `src/tasks.js` supplies creation, completion, deletion and storage behavior.
  Completion and deletion identify tasks by `id`, not by displayed position.
- `src/tasks.test.js` exercises task operations and storage behavior. It does not
  click a new filter checkbox.
- `e2e/todo.spec.js` exercises the existing add/complete/reload/delete journey.
  Read its current assertions; do not assume it already proves filtering.
- `package.json` defines `npm test` and `npm run test:e2e`; the latter uses
  `playwright.config.js` for its app server.

This is a reading guide, not a transcript or a claim that checks passed in your
session. Confirm it against your branch. Exploration is sufficient when you can
trace an action from the control through state to the rendered result, identify
where data is saved, and say which checks would detect a regression. You do not
need an architecture report for this app.

If the agent reports only “React app, tests present,” a useful follow-up is:

```text
Where would a filter accidentally overwrite the saved tasks? Trace that path,
and identify whether any current test would catch it. Still no edits.
```

### Specify: pick examples that distinguish correct from plausible wrong behavior

The initial request is short:

> Add a checkbox to show only unfinished tasks. Turning it off should show all
> tasks again.

For the exercise, use these acceptance decisions. Share the table as context if
it is not already in the conversation; a short prompt is not a reason to omit the
requirements it refers to.

| Situation/action | Expected result | Why this case matters |
| --- | --- | --- |
| Open a fresh page load | A labelled **Show unfinished tasks** checkbox is off; all saved tasks are visible in their existing order. | A filter preference is not part of the saved task model. |
| Add `Write outline`, then `Review draft`; complete `Write outline`; turn the filter on | Only `Review draft` is visible. | The checkbox controls the view rather than completion itself. |
| Turn the filter off | Both tasks return in their original relative order; `Write outline` is still completed. | Hiding is reversible and does not rewrite task data. |
| With the filter on, complete a visible unfinished task | That task immediately disappears; it returns completed when filtering is off. | The visible list must follow current state, not a stale snapshot. |
| Hide the first task, then delete a later visible task | Only the selected task is deleted; hidden tasks are unchanged. | Visible positions differ from positions in the full collection. |
| With filtering on, add a valid task | The new unfinished task appears and uses the existing save behavior. | Filtering must not freeze or replace the underlying collection. |
| All stored tasks are completed and filtering is on | No task rows are visible, but the filter remains available; turning it off restores the completed rows. | “No visible tasks” is not “no stored tasks.” |
| The collection is genuinely empty | Turning filtering on or off is harmless; adding a task still works. | Empty data is a valid state, not an exception. |
| Reload after changing tasks while filtering is on | Task titles, completion and deletions persist as before; the fresh view starts with filtering off. | Saving a visible subset would silently lose hidden tasks. |
| Reach the checkbox with Tab and toggle with Space | The same filtering occurs; the control has an accessible name and visible focus. | A pointer-only imitation is not an adequate checkbox. |

Preserve existing blank-input handling, add/complete/delete semantics and storage
error behavior. Do not add sorting, search, a remaining count, a backend, a new
state library or persistence for the filter preference. An empty list is a valid
all-completed presentation for this exercise; a new empty-state message is not
required. If you add one, it must not falsely say that no tasks exist while
completed tasks are merely hidden.

Ask about decisions that change the behavior or scope, not every ordinary code
choice. At work, filter persistence might be a real product question. Here it is
settled so the learner can concentrate on reversible filtering.

```text
Check these acceptance examples against the app. Point out contradictions or
missing decisions that would change the design. Do not add features or code yet.
```

### Plan: connect edits to checks

A proportionate plan for this change is:

1. Add local checkbox state and a labelled native checkbox in `src/App.jsx`.
2. Derive the rendered rows from the full task collection. Keep existing handlers
   operating on the full collection with stable task IDs.
3. Add a browser regression for hide/show reversibility and an interaction with a
   hidden earlier row. Reuse the current test setup and accessible locators.
4. Run the existing unit and browser suites, execute the remaining acceptance
   cases in the browser, and review the complete change.

These are likely edits, not a decree that every file must change. Task persistence
and ID-based operations already exist; do not refactor them merely to accommodate
a view. Change styling only if needed for a usable control and focus state.

```text
Propose the smallest plan for those examples. Name each likely file, why it needs
to change, and what check would reject a wrong implementation. No code yet.
```

Reject a plan that introduces a second saved task list or “prepares for future
filters” with a state library. Ask which accepted behavior needs it. Conversely,
a plan consisting only of “add checkbox” is too small: it omits the state/data
boundary and verification. Small means coherent, not incomplete.

The deliberate planning pause is useful here because learners can critique the
approach. On familiar work, authorize exploration, implementation and verification
in one request; pause only for a consequential ambiguity or scope expansion.

### Implement: preserve the source of truth

```text
Implement the agreed filter with the reviewed plan. Preserve task identity and
all baseline behavior; no dependencies or unrelated refactor. Add the focused
browser checks, run npm test and npm run test:e2e, and report actual results.
Continue through ordinary corrections; pause if the agreed scope must change.
```

This prompt relies on the agreed examples. In a new conversation, include them
again or point to the single current work note. Do not assume the new agent has
read the earlier conversation.

Two conceptual fragments show the central distinction; they are not complete
patches to paste into the app:

```js
// Wrong: a view change replaces the full collection with a subset.
changeTasks(tasks.filter((task) => !task.done))
```

This can look correct while the filter is on. But this app's `changeTasks` also
attempts to save tasks. Completed records are gone from in-memory state regardless
of whether `saveTasks` succeeds; unchecking the filter cannot recover them. If the
storage write succeeds, they are also gone from storage, so reloading exposes the
persistent data loss. If it fails, the previously stored collection remains.

```js
// Right boundary: choose what to render without replacing stored tasks.
const visibleTasks = showUnfinished
  ? tasks.filter((task) => !task.done)
  : tasks
```

The full `tasks` collection remains authoritative. Do not put `visibleTasks` into
a second state variable and try to synchronize it with every add, completion,
deletion and toggle; derive it from current state when rendering. A small list
needs neither a new selector framework nor speculative caching.

**Identity is the second trap.** Suppose the full list is `[A completed, B
unfinished, C unfinished]`. Filtering displays `[B, C]`. Visible index `0` means
`B`, not `A`. Keep `key={task.id}` and pass `task.id` to the existing operations
on the full list. Index-based handlers can change the wrong task; applying an
operation to only the visible subset can discard hidden ones. Neither mistake
is exposed by a test containing only one unfinished task.

When the browser test is written before the feature, run it and confirm it fails
because the intended behavior is absent, not because the app failed to start.
Then implement and rerun it. This is a useful red/green check of the test itself.
Do not assert internal variable names or that `.filter()` was called: a consumer
cares that the right tasks disappear and return unchanged.

If the first slice succeeds, do not widen it. Challenge its boundaries:

```text
Now check the sequence with a completed first row and an unfinished second row.
Delete the visible second row while filtered, then turn filtering off. Which
stored task remains? Report the observation, not just a code-reading prediction.
```

### Verify: evidence must match the claim

The baseline app has no filter, so a green baseline suite cannot demonstrate that
a new filter works. It is regression evidence. New assertions and direct browser
observations must cover the new behavior.

Run from **`demo/todo-app`** after the edits:

```sh
npm test
npm run test:e2e
```

Use the browser served from this same working copy for the manual cases. Distinguish
an actual interaction, a passing automated assertion, and a source-code inference.

| Claim | Appropriate evidence | Plausible error it catches |
| --- | --- | --- |
| Baseline task operations still work | Current unit suite and existing browser journey | Changing shared task semantics while adding a view |
| Filtering is reversible | Complete one of two tasks; check and uncheck the filter; assert the same completed task returns | Destructive filtering or lost completion state |
| Actions target the correct record | Hide an earlier row, then complete/delete a visible later row; inspect the full list afterward | Using visible index or a filtered collection for mutations |
| The view follows changing data | With filtering on, add a task and complete it | Cached visible rows that do not track task changes |
| All-completed is not data loss | Complete every task, filter, then unfilter | Hiding the control with the rows or confusing empty view with empty data |
| Stored data survives the view | Reload after filtering and after a task mutation while filtered | Persisting only the visible subset |
| The control is keyboard-operable | Tab to the named checkbox, press Space, inspect rows and focus | Pointer-only control or missing focus visibility |
| The change remains focused | Review tracked diff and all untracked files | Unrelated rewrites, lockfile churn, weakened tests |

Keyboard checks are not a full accessibility audit. A reload in one local browser
is not a claim about every browser or concurrent tabs. State the useful evidence
without enlarging its meaning.

```text
Compare the observed results with our examples. Mark each verified, failed or
not checked, with its evidence. Separate unit results from browser interaction.
Do not change expectations just to match the implementation.
```

When a check fails, preserve the sequence and relevant output, identify which
expectation it contradicts, then correct the cause and repeat the affected case.
Do not delete the failing assertion to get green. If the browser could not run,
mark those cases not checked and give the next executable action; “implementation
complete” is not the same as “ready to accept.”

### Review: read the request, diff and evidence together

From **`demo/todo-app`**, if the exercise branch is still the unchanged recorded
starting point, compare against it so committed and uncommitted work are included:

```sh
git status --short
git diff exercise/unfinished-filter --stat
git diff exercise/unfinished-filter --
git diff exercise/unfinished-filter --check
```

If that branch has moved, use the starting revision you recorded instead. `git
diff HEAD` alone omits changes already committed on your work branch. Diff output
also omits untracked file contents: use status to identify and open them. A clean
whitespace check does not establish behavior.

Review for likely errors rather than asking whether the code “looks good”:

- Is the persisted collection still the full collection, even after adding or
  deleting while filtered?
- Are keys and operations tied to stable IDs? Does a hidden earlier row change
  which record the visible control acts on?
- Is visible state derived from current tasks, or can it drift after mutations?
- Can users escape an all-completed filtered view with the checkbox still present?
- Do tests challenge reversibility and identity, or merely assert that a checkbox
  exists? Have existing expectations been weakened to match the new code?
- Does every changed file serve this request? Are the reported checks from the
  final code, not an earlier intermediate state?

```text
Review this diff against the agreed examples without editing. Focus on data
loss, row identity, changing task state, keyboard use and evidence gaps. For each
finding give a location, observable consequence and reproducing sequence.
Separate defects from optional ideas; state what your review did not verify.
```

An agent review is useful feedback, not an independent guarantee. You remain
responsible for the acceptance decision. Turn “state seems wrong” into something
falsifiable: “With the first task hidden, deleting the visible second task also
removes the first after reload.” Turn “add more tests” into the missing scenario
that could expose that defect.

Only after your attempt, inspect the reference without switching away from dirty
work. From **`demo/todo-app`**:

```sh
git diff exercise/unfinished-filter solution/unfinished-filter -- src/App.jsx e2e/todo.spec.js
```

The reference is a comparison aid, not evidence for your implementation and not a
requirement to reproduce its exact code. If you want to run the solution branch,
first preserve your changes and use a clean working tree or separate copy. Do not
switch branches underneath a still-running development server and call the old
browser observation evidence for the new state.

## Use at work

### Scale the pauses with uncertainty

| Work | Sensible approach |
| --- | --- |
| A clear wording correction | Confirm the intended text, edit the location, view the result; no separate specification document. |
| This unfinished filter | Brief exploration, distinguishing examples, small plan, an end-to-end slice and boundary checks. |
| A production filter over paginated data | Resolve whether filtering happens before pagination, what totals mean, and which layer owns the contract before implementation. |
| A slow or failing check | Gather the actual failure and plan one diagnostic experiment; the code change is not known yet. |

Transfer the decisions, not the demo architecture. A local array is sufficient in
this app; it does not establish how a server-backed list should filter or preserve
access controls. Likewise, a small local feature does not justify a parallel swarm.
Where production work has genuinely independent pieces, define their interfaces
and integration owner before splitting them.

### Handle scope changes deliberately

“Also remember the filter after refresh” changes this exercise's reload behavior.
“Also clear completed tasks” introduces a destructive action where there was only
a view. Neither is a styling refinement. Agree the new examples and update the
scope before implementing; if deferred, keep the current behavior and record the
separate request. Do not silently change a failing test to accommodate scope creep.

```text
Remembering the filter changes our fresh-load example. Describe the additional
behavior and storage decision without editing yet, so we can decide whether it
belongs in this change.
```

If the owner has already clearly authorized the new behavior, use that decision;
do not ask them to repeat it. Still make its effect on the evidence explicit.

### Deliver a factual handoff, then maintain the right things

Use the [shared handoff template](../demo/section-05-context-and-handoff.md#handoff-template)
in the existing issue or one short work note. It preserves the accepted scope,
code state and evidence without creating a competing specification. Link to the
current brief and fill the note from your actual work; section 5 explains how to
keep that information useful across readers and sessions.

Fill this with your actual run, not a copied “all passed.” A narrow observation
such as “the hidden completed task returned after deleting the other row and
reloading” helps a reviewer more than “everything works.” Drafting a change
description does not authorize pushing, publishing or merging it.

Before calling the local change delivered, decide whether to accept it, correct a
named defect, or wait for specific evidence. Leave the tree and active server in
a stated condition, and stop the server you started when it is no longer needed.
Keep a regression when it rejects a plausible failure such as deleting the wrong
hidden-row ID. Update affected user guidance if behavior changed; do not retain
temporary debug code or stale “tests not run” notes after collecting the result.
If a later report contradicts acceptance, preserve the report and return to the
relevant stage. Maintenance continues the same loop rather than starting a second
process.

Choose a [companion worked example](../demo/section-04-worked-examples.md) to
practice proportionate prompting on the same app. You are ready to move on when
you can explain one plausible wrong implementation, the check that rejects it,
and why the final change is acceptable—or exactly what evidence is still missing.

## Go deeper

- [Unfinished-filter lab](../demo/section-04-workflow-lab.md): executable route once
  the canonical app is recovered, identity challenge and all-completed case.
- [Worked examples](../demo/section-04-worked-examples.md): remaining count,
  whitespace defect, focused refactoring, documentation, test diagnosis and
  dependency work without changing apps.
- [Focus on key examples — Gojko Adzic](https://gojko.net/2014/05/05/focus-on-key-examples/):
  choose cases that settle a real decision rather than an exhaustive variation list.
- [Red/green TDD — Simon Willison](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/)
  and [agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/):
  challenge both the test and the running implementation.
- [Playwright locators](https://playwright.dev/docs/locators) and
  [assertions](https://playwright.dev/docs/test-assertions): prefer accessible,
  user-visible behavior over implementation selectors.
- [What to look for in review — Google](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
  and [Git diff](https://git-scm.com/docs/git-diff): review behavior and complexity,
  and know which code state your comparison actually includes.

### Sources and adaptation

OMP facts here are source-reviewed against the **18.2.9** teaching release:
[README's entry-point reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#four-entry-points-interactive-one-shot-rpc-and-acp)
(`omp` starts the TUI) and
[tool approval documentation](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)
(approval mode and the distinction between approval and containment).
These sources do not establish local interactive behavior; see the
[source review](../research/2026-09-22-omp-course-source-review.md).
The stage names and prompts are ordinary course guidance, not OMP workflow
commands or a claim that a prompt enforces a read-only boundary.

[Full Walkthrough: Workflow for AI Coding — Matt Pocock, AI Engineer, 2026-04-24](https://www.youtube.com/watch?v=-QFHIoCo-Ko)
informs the destination-before-journey framing and thin verifiable slices. We
adapt those ideas to a small local todo app; we do not import the recording's
framework, product-specific commands or automation assumptions. Watching it is
optional. The app examples, acceptance decisions, failure cases and prompts in
this section and its companions are course-authored. They are not live OMP
transcripts or measured performance claims.

[Previous: working with OMP](03-working-with-omp.md) · [Next: steering agents](05-steering-agents.md) · [Back to outline](../OUTLINE.md)
