# Section 4 — unfinished-task filter lab

Build one reversible view of the existing todo collection. Use this companion
beside [the workflow lesson](../sections/04-the-everyday-workflow.md); the lesson
explains the decisions, while this lab gives you concrete actions and evidence.

**App route blocked in this distribution:** `demo/todo-app` is missing its canonical
source and branches. Recover it through [setup](section-01-setup.md) before using
the commands below, then confirm its brief and scripts. App-specific descriptions
are prepared exercise assumptions until checked there. The written sequence can
be studied now; neither it nor the reference description is execution evidence.
Do not recreate the app from prose or use the historical public app.

## Understand

The checkbox is **Show unfinished tasks**. It starts off on a fresh page load.
When checked, completed tasks disappear from the view, not from the stored
collection. Unchecking restores them with their titles, completion state and
relative order intact. Adding, completing and deleting still act on the full
collection by stable task ID. Existing task persistence and error handling remain.

Do not add a remaining count, sorting, search, a backend, a state library or a
saved filter preference. A blank visible list is valid when all tasks are
completed; the checkbox must remain available. New empty-state wording is not
required. If introduced, it must distinguish hidden tasks from an empty collection.

**Predict before coding:** the stored collection is `[A completed, B unfinished]`.
After filtering, B is at visible index zero. What would an index-based delete
handler remove? What would saving only the displayed rows do to A?

The answers explain why “the checkbox hides a row” is insufficient acceptance
evidence. The lab must exercise what happens after filtering, not only the first
render.

## Watch or try

### 1. Establish a safe starting point

Start at the **course root**:

```sh
cd demo/todo-app
git rev-parse --show-toplevel
git status --short --branch
```

The root must be `demo/todo-app`, its standalone nested repository. If it is the
outer course directory, stop and follow the [setup guide](section-01-setup.md).
If there are changes, preserve them on their current branch or use a separate
working copy; do not discard them to prepare this exercise. Choose a different
work-branch name if the example name already exists.

With a ready working tree, continue in **`demo/todo-app`**:

```sh
git switch exercise/unfinished-filter
git switch -c my-unfinished-filter
git rev-parse HEAD
npm install
npx playwright install
npm test
npm run test:e2e
```

Record the revision and actual outputs. The dependency and browser installation
steps are only needed when setup is missing. Treat a package download or browser
launch failure separately from an application assertion failure. Read and account
for any lockfile change; it is not automatically part of the feature.

In a second terminal at **`demo/todo-app`**:

```sh
npm run dev
```

Open the exact URL printed by Vite. Keep this app instance tied to your work
branch. The Playwright configuration manages a separate app server for its checks;
an existing process on that configured port must not point to a different copy.
Use synthetic tasks in a disposable browser profile. Git switching does not reset
localStorage, and changing browser origin changes which stored tasks you see.

In a third terminal at **`demo/todo-app`**, if OMP is available:

```sh
omp --approval-mode always-ask
```

Without provider access, perform the same investigation and implementation by
hand, or inspect the reference after making your own plan. Label that route
honestly; it exercises the engineering decisions but is not a provider-backed OMP
run. No new OMP setup or remote publication is part of this lab.

### 2. Explore, then agree the behavior

```text
Inspect the task state, rendering, persistence and existing tests for this filter.
Do not edit yet. Identify where a view change could accidentally lose stored tasks,
and which current checks would detect that. Keep the report focused.
```

Read `src/App.jsx`, `src/tasks.js`, their relevant tests and `package.json`.
Explain the path from a task checkbox to `changeTasks` and storage. An acceptable
report distinguishes “the current test checks reload” from “the current test checks
reload while filtered.” Those are not interchangeable claims.

Use the full acceptance table in the main lesson. The short version you must be
able to explain is: off initially; on hides completed tasks; off restores them;
completion while on immediately hides the completed row; adding and deleting still
work; hidden rows survive reload and other row actions; all-completed leaves an
empty view with a usable filter; native keyboard operation works.

### 3. Plan and implement the first complete slice

```text
Plan the smallest change for the agreed examples: a labelled checkbox, derived
visible rows, and unchanged full-list ID-based actions. Connect each edit to a
check. No implementation until I review the plan.
```

Look for one source of truth, not two synchronized task stores. A checkbox and a
derived visible list belong in the existing component. A shared task helper need
not change just because rendering selects fewer rows.

```text
Implement the reviewed plan without dependencies or unrelated refactoring. Add a
browser regression proving that a completed task disappears while filtered and
returns unchanged when unfiltered. Run npm test and npm run test:e2e and report
actual results, including any checks that could not run.
```

If the agent has browser access, ask it to exercise the actual app and report the
observations. If it does not, perform the next sequence yourself. A claimed browser
check without an interaction or automated result is not evidence. These prompts
communicate scope; they do not enforce isolation or guarantee an approval pause.

### 4. Challenge the slice in the browser

Use three distinct labels so row identity is easy to see. Begin with an empty
**synthetic** collection by deleting your disposable tasks through the app, or use
a fresh disposable profile. Do not clear unrelated browser storage.

#### A. Reversibility and order

1. Add `Write outline`, `Review draft`, then `Send notes`, in that order.
2. Complete `Write outline`. Before filtering, confirm all three rows exist and
   only that task is checked as completed.
3. Check **Show unfinished tasks**. The last two rows should remain in their
   original order; `Write outline` should not be visible.
4. Uncheck the filter. All three return in the original order, and `Write outline`
   remains completed.

This is the first thin end-to-end slice. If it fails, diagnose now rather than
building more behavior on an incorrect state boundary.

#### B. Identity with hidden earlier rows

1. Turn filtering on again. `Review draft` is now the first visible row, but it is
   not the first stored task.
2. Delete `Review draft` using its row's Delete button.
3. Turn filtering off. `Write outline` must still exist and be completed;
   `Send notes` must still exist and be unfinished. Only `Review draft` is gone.
4. Turn filtering on and complete `Send notes`. It must disappear immediately.
5. Turn filtering off. Both surviving tasks must exist and be completed.

If the wrong row changed, inspect the handler's identity and the collection passed
to the task operation. Do not patch the example labels or special-case index zero.
The invariant is “an action affects the selected stable ID,” regardless of position.

#### C. All-completed, adding and empty data

1. With both surviving tasks completed, turn filtering on. There should be no
   visible task rows, but the checkbox and add form must remain usable.
2. Uncheck, confirm both completed rows return, then check again.
3. Add `Publish summary`. It should appear immediately as unfinished. Complete it;
   it should disappear while filtering remains checked.
4. Uncheck. All three stored tasks should be visible and completed.
5. After the persistence check below, delete these synthetic rows through the app.
   Toggle the filter with a genuinely empty collection; add `Start again` and
   confirm normal creation still works.

“No visible rows” must not cause the app to erase tasks or render an unrecoverable
empty screen. Do not require extra empty-state copy just to make the test pass.

#### D. Persistence is independent of the view

Before deleting the synthetic rows in C:

1. Turn filtering on with all three completed rows hidden and reload the page.
2. Confirm the fresh checkbox is off and all three completed rows are present.
   `Review draft`, which you deleted in B, must still be absent.
3. Filter again and add `Check storage`. Leave it unfinished and reload.
4. Confirm the completed rows and the new unfinished row all remain, with filtering
   off. This distinguishes saving the full collection from saving only visible
   rows after a mutation.

A no-mutation hide/show test alone can miss a bug that saves the filtered subset
only when another task is added or deleted.

#### E. Keyboard and focus

1. Tab to **Show unfinished tasks** without using the pointer. Confirm a visible
   focus indicator and a meaningful checkbox label.
2. Press Space to toggle it on and off. Observe the same row changes as above.
3. Tab to a task checkbox with filtering on and complete that row. Notice where
   focus goes when the row disappears; record any obstacle to continued keyboard
   use instead of assuming a passing pointer check covers it.

These checks support keyboard usability; they do not constitute a comprehensive
accessibility audit or prescribe a new focus-management architecture for this lab.

### 5. Automate a revealing regression, not every click

The existing browser suite already has a per-test localStorage reset. Reuse its
isolation and role/label locator style. A useful new regression creates a completed
earlier task and an unfinished later task, filters, acts on the later task, then
unfilters and reloads to inspect what remains. That sequence can reject destructive
filtering and wrong identity; a test asserting only that the control exists cannot.

If developing test-first, verify the new assertion fails for the missing behavior,
then passes after the implementation. Keep the existing baseline journey. Do not
assert that `visibleTasks` exists or that a particular helper is called.

Run from **`demo/todo-app`** on the final code:

```sh
npm test
npm run test:e2e
```

A browser executable missing at launch is not a red assertion. Report it as a
setup gap and resume the affected check when the prerequisite is available.

### 6. Review and decide

From **`demo/todo-app`**, compare against the unchanged exercise branch (or replace
it with your recorded starting revision if that branch moved):

```sh
git status --short
git diff exercise/unfinished-filter --stat
git diff exercise/unfinished-filter --
git diff exercise/unfinished-filter --check
```

Open any untracked files listed by status; their contents are absent from the diff.
Review both new behavior and what did not need to change: task schema, persistence,
existing IDs and unrelated dependencies. A clean diff check only addresses
whitespace errors, not acceptance.

```text
Review without editing. Can filtering or an action while filtered lose a hidden
task, act on a different ID, or strand an all-completed view? Give concrete
reproducing sequences for defects, and distinguish missing evidence from defects.
```

After your attempt, compare with the reference without switching branches:

```sh
# cwd: demo/todo-app
git diff exercise/unfinished-filter solution/unfinished-filter -- src/App.jsx e2e/todo.spec.js
```

This does not test your work or require matching the solution line for line. To
run the reference itself, first preserve your work and use a clean tree or separate
copy. Stop/restart the relevant app server when changing code states.

## Use at work

### Produce a factual handoff

Use the [single handoff template](section-05-context-and-handoff.md#handoff-template).
For this lab, attach the actual baseline and final command outputs, identify the
working copy and browser URL, and mark sequences A–E verified, failed or not checked.
Explain whether each result is source reasoning, an automated assertion or direct
browser observation. Record the decision to accept, correct or wait, and leave the
server and synthetic browser data in a stated condition. The template is shared
with later recovery and coordination exercises; there is no second evidence format
to keep synchronized.

Someone continuing the work should not need your chat history to know whether
“tested” means source inspection, unit assertions or direct browser interaction.
They should also know whether the browser still contains your synthetic data.

A good completion explanation names the state boundary: “Filtering changes which
rows render; task actions and storage still use the full collection by ID.” It
then supplies evidence rather than treating that explanation as proof. For larger
products, transfer the same questions about identity, hidden data and persistence,
not an assumption that client-side filtering is always appropriate.

## Go deeper

Pair exercise: one learner proposes a deliberately plausible wrong implementation
and the other designs the shortest observable sequence that rejects it. Try a
cached visible list, index-based deletion, saving only visible tasks, or hiding the
whole list area including the filter when there are no visible rows. Explain which
existing test would miss the defect.

### Sources and adaptation

This is a course-authored todo-app lab, not a live agent transcript. OMP's
[`omp` interactive entry point](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#four-entry-points-interactive-one-shot-rpc-and-acp)
and [approval boundaries](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)
are documented by the official project; ordinary prompts are not security controls.
The first end-to-end slice adapts the workflow idea from
[Matt Pocock's Full Walkthrough: Workflow for AI Coding](https://www.youtube.com/watch?v=-QFHIoCo-Ko),
not its tools or full process. [Playwright locators](https://playwright.dev/docs/locators)
and [assertions](https://playwright.dev/docs/test-assertions) describe the existing
browser-testing approach. The complete source/adaptation context is in the
[main lesson](../sections/04-the-everyday-workflow.md#sources-and-adaptation).

[Back to section 4](../sections/04-the-everyday-workflow.md)
