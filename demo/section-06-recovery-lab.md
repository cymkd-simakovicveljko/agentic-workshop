# Section 6 — evidence, mechanical checks and recovery

Run a mechanical standards check on a disposable copy, then distinguish its
success from correct behavior. The blank-task route preserves the deeper
shared-cause repair exercise, but needs the unavailable canonical todo checkout.
Both routes ask you to preserve work and tie evidence to the checked candidate.
These are authored exercises, not transcripts of previous agent runs.

## Understand

**Available now:** the Git/Node exercise below uses existing exporter source and
baseline assertions; no app, package installation, provider or network service is
needed. **Blocked:** blank-task implementation and browser verification require
the canonical app repository and its `exercise/blank-task-bug` branch. Follow
[section 1's prerequisite](section-01-setup.md); do not reconstruct the app or use
the historical project-directory example as a substitute.

The following blank-task description is its recorded teaching contract, awaiting
inspection against the recovered source.

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

### Run a mechanical standard without the todo app

Use a POSIX shell, Git and a Node version with the built-in test runner. Start at
the course root. The supplied exporter maps exact `CLOSED` to `closed`, other
states to `open`, and supplies the old consumer with two open tickets and one
closed ticket in the fixture. This route copies the **baseline**, not section 8's
seam or completed answer.

Run each command block in the same terminal. If setup fails, stop rather than
continuing with an empty path variable:

```sh
STANDARD=$(mktemp -d)
printf 'Mechanical-check directory: %s\n' "$STANDARD"
cp -R demo/section-08-legacy/src "$STANDARD/src"
mkdir "$STANDARD/tests"
cp demo/section-08-legacy/reference-tests/baseline.test.mjs "$STANDARD/tests/"
git -C "$STANDARD" init -q
git -C "$STANDARD" add src tests
node --test "$STANDARD/tests/baseline.test.mjs"
```

The source supplies three baseline assertions. Expect them to pass before
injecting a fault; record your actual outcome. The staged files provide Git's
comparison baseline without requiring a commit or author identity. Nothing here
changes the course repository or an existing learner branch.

Now introduce an unresolved merge in the copied status mapping. One side keeps
the accepted mapping; the other would label every ticket open. This Node command
only prepares the deliberate failure in your copy:

```sh
node --input-type=module - "$STANDARD/src/exporter.mjs" <<'NODE'
import assert from 'node:assert/strict';
import {readFileSync, writeFileSync} from 'node:fs';
const path = process.argv[2];
const source = readFileSync(path, 'utf8');
const mapping = "    status: ticket.state === 'CLOSED' ? 'closed' : 'open',";
assert.ok(source.includes(mapping), 'Expected untouched baseline status mapping');
writeFileSync(path, source.replace(mapping, [
  '<<<<<<< accepted-contract',
  mapping,
  '=======',
  "    status: 'open',",
  '>>>>>>> all-open-proposal',
].join('\n')));
NODE
git -C "$STANDARD" diff --check
printf 'Git check exit: %s\n' "$?"
node --check "$STANDARD/src/exporter.mjs"
printf 'Node syntax exit: %s\n' "$?"
```

Run this in an ordinary interactive shell, not a script configured to stop at
the first nonzero exit. Both check commands are **intended to fail**. Git should
identify leftover conflict markers; Node should report a syntax error. A missing
file, unavailable executable or failed preparation assertion is not that result.
Save the actual diagnostics before changing anything.

The standard “do not submit unresolved merges” now has an executable check.
Git inspects the changed lines, not a model's promise to resolve them. Node checks
JavaScript parsing without running the module. Neither knows which side of the
merge expresses the accepted ticket behavior.

#### A mechanically clean but incorrect resolution

Try the tempting wrong resolution in this disposable copy. Start again from the
known source and choose the all-open mapping:

```sh
cp demo/section-08-legacy/src/exporter.mjs "$STANDARD/src/exporter.mjs"
node --input-type=module - "$STANDARD/src/exporter.mjs" <<'NODE'
import assert from 'node:assert/strict';
import {readFileSync, writeFileSync} from 'node:fs';
const path = process.argv[2];
const source = readFileSync(path, 'utf8');
const mapping = "    status: ticket.state === 'CLOSED' ? 'closed' : 'open',";
assert.ok(source.includes(mapping), 'Expected baseline status mapping');
writeFileSync(path, source.replace(mapping, "    status: 'open',"));
NODE
git -C "$STANDARD" diff --check
node --check "$STANDARD/src/exporter.mjs"
node --test "$STANDARD/tests/baseline.test.mjs"
```

The mechanical checks should now succeed. The baseline should not: `T-03` is
closed, and the old reader must count one closed ticket. A syntactically valid
all-open export violates those assertions. The timestamp check can still pass.
Explain the failure from expected versus actual values; do not change the fixture
or expectations to make the count green.

Resolve to the existing contract, then check the same candidate through all three
surfaces:

```sh
cp demo/section-08-legacy/src/exporter.mjs "$STANDARD/src/exporter.mjs"
git -C "$STANDARD" diff --check
node --check "$STANDARD/src/exporter.mjs"
node --test "$STANDARD/tests/baseline.test.mjs"
```

All should now succeed, with three baseline assertions passing. These are
expected outcomes, not a receipt for your run. The explicit copy is safe here
because this is your new disposable fixture and the exercise deliberately
replaces only its exporter; it is not a general recovery command for a dirty
repository.

In your existing notes, connect each result to its claim: marker detection,
syntax validity, and preserved fixture behavior. Include the exact path and
candidate. Running checks manually does not install a pre-commit or CI gate;
do not claim ongoing enforcement. You also have not checked unknown inputs,
production consumers or provider behavior.

**Recovery extension:** pause after the wrong-resolution failure, before the last
block. Preserve the copy and actual diagnostics using the
[section 5 handoff](section-05-context-and-handoff.md). Record these Node/Git
commands as completed only after their exits are observed, and account separately
for any editor, OMP turn or other writer you started. Ask a fresh reader to
identify the next repair from that record, inspect the files and then continue.
This can be done without a provider; reading the worked resolution alone does not
prove the fresh-reader exercise.

### Blank-task route: prerequisite and starting point

The rest of this lab is runnable only after the canonical app and exercise
branches are recovered. Expected assertions and UI behavior below come from the
recorded contract, not a current app run.

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

Record your outcome using the maintained
[handoff format in section 5](section-05-context-and-handoff.md), rather than
creating another template. Its evidence must distinguish the reproduction,
shared-cause repair, unit results, normal browser-suite coverage and manual
blank-input observations. Include the actual candidate, preserved unrelated
work, active operations and unperformed checks; a “fixed” summary cannot replace
any of those facts.

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

For an active-turn interruption, use the
[section 3 host reference](../sections/03-working-with-omp.md) and confirm the turn
stopped. Account separately for commands and workers. In the terminal you own,
stop the foreground dev server with Ctrl+C if it is no longer needed and observe
its exit. Do not claim cancellation for an operation whose outcome is unknown.

Save the exact failure output locally, both staged and unstaged diffs, useful
untracked files, and the next action. Copying a diff does not preserve new files;
a branch name does not save a dirty working tree. Use a reviewed local commit or
a separate local backup as appropriate, without publishing logs or secrets.
Wait for relevant writers to stop before treating the snapshot as consistent.

Use the single [section 5 handoff](section-05-context-and-handoff.md#handoff-template)
in your existing notes. Put the remaining hypothesis under open decisions, record
operation states under active processes, and link the actual diagnostics under
evidence rather than copying the whole transcript.

Choose a session action from [Working with OMP](../sections/03-working-with-omp.md).
Before further edits, reconcile the handoff with live files, diffs, browser state
and running processes. Check the working directory. Old test output is not proof
for new code, and a fresh conversation is not a code rollback.

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
tested. Larger-change dependencies and integration are practiced in
[section 7](section-07-coordination-lab.md), not by dividing this small repair
among concurrent writers.

### Sources and adaptation

The blank-task case and recovery prompts are authored teaching material from
[section 6](../sections/06-reliable-execution.md). Product controls are pinned to
the reviewed [OMP 18.2.9 keybindings](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/keybindings.md),
[session operations](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/session-operations-export-share-fork-resume.md),
[approval modes](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)
and [task-tool reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/tools/task.md).
The mechanical exercise uses the real supplied exporter baseline with deliberate
copy-local faults; [Git's diff reference](https://git-scm.com/docs/git-diff) and
[Node's syntax-check reference](https://nodejs.org/api/cli.html#-c---check) explain
the two narrow checks. Commands and expected outcomes are a learner route,
not a claim of an app, provider-backed or classroom rehearsal.

[Back to section 6](../sections/06-reliable-execution.md)
