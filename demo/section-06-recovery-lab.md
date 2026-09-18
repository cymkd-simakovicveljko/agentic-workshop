# Section 6 — blank-task recovery lab

Repair the deliberate defect in the familiar todo app. The goal is not merely a
passing command: preserve useful work, explain the failure mechanism, and show
what the unit and browser evidence actually establishes. This is a course-authored
exercise, not a transcript of a previous agent run.

## Understand

On `exercise/blank-task-bug`, task creation accepts raw input. Empty and
whitespace-only submissions can create blank rows, and meaningful titles retain
surrounding spaces. The intended contract is already exercised in the unit tests:
blank input must be rejected and valid text trimmed. The form recognizes rejection
when the shared function returns the unchanged task list and then shows the input
error. Inspect both the helper and its caller before choosing a fix.

Do not bring the remaining-count or unfinished-filter exercise into this repair.
This branch starts independently from the baseline add/complete/delete/localStorage
app. The defect belongs in the shared creation path, not only in the browser form.
The existing end-to-end test covers the normal task lifecycle, not the blank-input
cases, so a green browser suite alone is insufficient evidence.

## Watch or try

### Prepare without losing previous work

From the course root:

```sh
cd demo/todo-app
git status --short --branch
git diff
git diff --cached
```

All Git commands here act in the **standalone nested app repository**, not the
course repository. Read the status before switching. If it lists work from an
earlier exercise, preserve it on its existing work branch using your normal
reviewed local commit or backup practice. Inspect untracked files as well: neither
a branch name nor the tracked-file diff saves their contents. Do not discard them
for the sake of starting this lab. Resume an existing lab branch if you already
created one.

Once the checkout is ready:

```sh
git switch exercise/blank-task-bug
git switch -c my-blank-task-fix
npm install
npm test
```

Choose a unique work-branch name if this one exists. Node must be 22.12.0 or later.
Run the commands one at a time so you can classify each result.

**Expected red:** the unit runner reaches assertions. `rejects a blank task`
exposes spaces being accepted; `adds trimmed tasks and deletes by identity`
exposes the untrimmed title. Keep the command output, including the actual and
expected values. Do not reinterpret every nonzero exit as the deliberate defect:
missing dependencies, incompatible Node or a module that fails to load means
setup has not reached the teaching assertion. Resolve that first without
changing the accepted behavior.

Record the code state alongside the result:

```sh
git branch --show-current
git rev-parse HEAD
git status --short
```

A commit ID identifies the base. The diff and untracked files identify what was
actually present when a command ran.

### Observe the defect in the UI

In a second terminal in `demo/todo-app`:

```sh
npm run dev
```

Open the printed URL in a disposable browser profile or session. This avoids
mixing earlier localStorage records with today's experiment. Do not clear unrelated
browser data to prepare the exercise.

1. Submit the empty **New task** field. Record whether a blank row appears.
2. Enter spaces and submit again. Record the task-list change and any feedback.
3. Enter `  Write tests  ` and submit. Ordinary HTML can visually collapse spaces,
   so use the unit assertion/source inspection rather than appearance alone to
   decide whether the stored title was trimmed.

Do not describe the expected defect as observed until you have seen it. If your
starting results differ, reconcile the branch, files, server and browser origin
before asking an agent to repair something else.

### Diagnose, authorize, repair

Launch `omp` from the app directory and ask:

```text
Investigate before editing. Read the failed assertions, shared task-creation
function and form caller. Explain the cause and why empty, spaces-only and
padded-valid inputs distinguish it from a UI-only defect.
```

Read `src/tasks.js`, `src/tasks.test.js` and `src/App.jsx` yourself. Would rejecting
only `''` solve spaces? Would trimming without rejection prevent an empty title?
Would returning a new array on rejection still let this form show its error?
These questions distinguish a root-cause repair from a green-looking partial fix.

Then give the bounded implementation task:

```text
Repair the shared creation path: reject empty/whitespace-only input, trim valid
titles, and preserve the form's rejection signal. Keep existing tests and normal
add/complete/delete/localStorage behavior. Avoid unrelated changes. Run npm test
and npm run test:e2e; report actual results and anything not checked.
```

No helper script, custom profile or subagent is needed. Keep existing assertions;
changing them to accept blank tasks would change the requirement, not repair it.

### Prove the final state

In the app directory:

```sh
npm test
npx playwright install
npm run test:e2e
```

Install Playwright's browser binaries if they are not already available. Its
configuration starts a local server on port 4173. If a server is already there,
verify it belongs to this checkout; the local configuration can reuse it. Do not
stop an unidentified process to free a port. A browser download error or server
startup error is an environment limitation, not evidence for the feature.

In a fresh disposable browser session at the dev-server URL, check:

| Action | Expected observation after repair |
| --- | --- |
| Submit empty input | No new row; input error visible. |
| Submit spaces | No new row; input error visible. |
| Submit a padded meaningful title | One valid task; the unit check confirms trimming. |
| Complete the valid task and reload | Completion persists. |
| Delete the task and reload | Deletion persists. |

Old blank records saved during reproduction may remain in the old browser
session. The repair prevents new invalid records; it does not add a storage
migration. Do not silently broaden the task into deleting existing data.

Finally inspect:

```sh
git diff
git diff --cached
git status --short
```

Is the shared cause repaired? Are existing tests preserved? Does the caller still
receive its expected rejection signal? Were unrelated files or dependency changes
introduced? Explain them or remove only the changes you deliberately made and no
longer need, preserving all other work.

Use this result format without inventing values:

```text
Reproduction: exact input, expected behavior, observed failure.
Code state: app branch + base revision + relevant current diff/new files.
Cause and repair: mechanism, changed paths, reason partial alternatives fail.
Unit result: actual command outcome and relevant assertions.
Browser suite: actual outcome; normal task lifecycle coverage only.
Manual UI: empty/spaces, valid task, reload and delete observations.
Review: contract/caller preserved; unrelated work preserved.
Limits: checks not run, setup failures, uncertainty or active processes.
```

After your own attempt, inspect the reference without switching branches or
replacing files:

```sh
git show solution/blank-task-bug:src/tasks.js
```

Compare behavior and scope, not just textual similarity. The reference is not
permission to overwrite your uncommitted work, and its existence is not proof
that your branch passed checks.

## Use at work

### Optional pause/resume drill

Pause after diagnosis, before repair, when there is a meaningful hypothesis to
carry forward. A cooperative pause request is:

```text
Pause implementation. Record the failure, current code state, hypothesis, next
useful action, and observed state of active commands/workers. Do not change files.
```

For an active-turn interruption, consult `/hotkeys`; Escape is the usual app
interrupt but editing modes/menus can consume it. Confirm the turn stopped, then
account separately for commands and workers. In the terminal you own, stop the
foreground dev server with Ctrl+C if you no longer need it, and observe that it
exits. Do not claim cancellation for an operation whose outcome is unknown.

Save the exact failure output locally, both staged and unstaged diffs, useful
untracked files, and the next action. Copying a diff does not preserve new files;
a branch name does not save a dirty working tree. Use a reviewed local commit or
a separate local backup as appropriate, without publishing logs or secrets.
Wait for relevant writers to stop before treating the snapshot as consistent.

Write a short factual handoff in your existing notes, for example:

```text
Goal: reject blank input, trim valid titles, retain existing task behavior.
Code: [actual app branch/revision; current tracked and untracked changes].
Evidence: [actual assertion output and browser observations, with locations].
Hypothesis: [cause supported by the read code and failed cases].
Process state: [dev server/OMP work: observed stopped, running or unknown].
Next: [specific distinguishing check or authorized repair].
Preserve: [unrelated edits/new files and where they were saved].
```

Choose `/resume` inside OMP or `omp --resume` at startup to select a saved session.
For a genuinely fresh reasoning context, use `/new` and supply the handoff.
`/fresh` keeps the conversation and resets provider stream state; `/restart`
relaunches OMP and resumes the same session. Neither is a code rollback. Check
OMP's working directory after selecting a session, especially one from another
project. Before further edits, reconcile the handoff with the live files, diffs,
browser state and running processes. Old test output is not proof for new code.

Recovery is complete when the behavior is verified **and** useful unrelated work
survives. The lab has no repository-wide reset or cleanup step.

## Go deeper

### Optional independent coverage reader

For this small defect, direct review is normally simpler. To practice delegation,
keep code stable while a reader checks coverage and you assemble the handoff:

```text
Read the task tests, browser test and creation/form callers at this code state.
Return behavior → assertion → coverage gap with file locations. Inspect only;
do not edit, execute commands or spawn workers. Stop after one pass. Return
uncertainties; do not approve or repair the task.
```

Provide the accepted behavior and actual code state; OMP children do not inherit
the whole parent conversation. Check effective child tools if read-only access
must be enforced; the wording alone is not containment. Headless child approval
differs from the interactive parent's, as described in the linked approval docs.

The parent must inspect the returned findings and own final acceptance. A useful
finding here is that the normal browser lifecycle test does not cover blank
submission; that calls for the manual checks above, not a claim that nothing is
tested. If you later delegate edits, establish ownership and interfaces first,
then review and verify the integrated state after workers finish. A child's
success report is an input to integration, not a substitute for it.

### Sources and adaptation

This companion applies the course-authored todo example and recovery prompts in
[section 6](../sections/06-reliable-execution.md). Its product-specific controls
come from the official [OMP keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md),
[session operations](https://github.com/can1357/oh-my-pi/blob/main/docs/session-operations-export-share-fork-resume.md),
[approval modes](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md)
and [task-tool reference](https://github.com/can1357/oh-my-pi/blob/main/docs/tools/task.md).
The [README](https://github.com/can1357/oh-my-pi/blob/main/README.md) documents
launching the `omp` TUI. Commands and expected outcomes above are a learner route,
not a claim that a provider-backed or classroom rehearsal has taken place.

[Back to section 6](../sections/06-reliable-execution.md)
