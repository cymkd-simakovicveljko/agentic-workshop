# Section 4 — context and factual handoffs

Recover the state of the [todo app](todo-app/README.md) from an unreliable note.
This is a context exercise, not another feature implementation. No custom setup,
helper, instruction profile or deliberately introduced defect is needed.

## Understand

A fictional teammate leaves:

```text
The unfinished-task filter is complete. Tests passed. Continue by adding a
remaining count. Run npm run check if you need confirmation.
```

That note mixes four different things: a completion claim, a historical test claim,
a proposed next task and a command. None supplies the branch, revision or dirty
changes it describes. The command is intentionally wrong: this app has no `check`
script. The correct response is to inspect and repair the record, not add a script
or change application code to make the old note look accurate.

The source of truth depends on the question. Git identifies the checkout; source
shows implementation; the accepted exercise brief establishes intended behavior;
actual output establishes a particular check result. A historical plan cannot stand
in for all four. Even a solution branch containing a working filter would not prove
that your checkout contains it or that anyone tested your local edits.

## Watch or try

### 1. Establish the right repository and preserve work

From the **course root**, enter its standalone nested Git repository:

```sh
cd demo/todo-app
pwd
git rev-parse --show-toplevel
git branch --show-current
git rev-parse HEAD
git status --short --branch
git diff
git diff --cached
```

These are read-only inspections. The Git root must be `demo/todo-app`, not just the
outer course directory. Read both diffs: unstaged and staged changes are different,
and neither includes the contents of untracked files. Inspect any relevant untracked
files separately. A clean outer repository does not establish a clean nested one.

Before switching, preserve unfinished work on its existing learner branch with an
intentional commit, or use `git stash push -u -m "before context exercise"` if a stash
is appropriate. The `-u` includes untracked files, not ignored files; preserve any
important ignored material separately. Do not blindly commit secrets or unrelated
files. Return to the original branch before restoring its stash. Do not reset,
clean or overwrite work simply to match a teaching state.

Once the working tree is clean, create your own branch directly from the independent
exercise start:

```sh
git switch -c my-context-handoff exercise/unfinished-filter
```

Choose another personal name if that branch already exists; do not delete the old
one to reuse its name. This is the only required checkout change. The investigation
below does not change tracked files, install dependencies or execute application code.
Do not switch to `solution/unfinished-filter` as a substitute for investigating the
exercise state.

### 2. Inspect the claim against current files

Run these commands from `demo/todo-app`:

```sh
git branch --show-current
git rev-parse HEAD
git status --short --branch
cat README.md
cat EXERCISE.md
cat package.json
cat src/App.jsx
cat src/tasks.js
cat src/tasks.test.js
cat playwright.config.js
cat e2e/todo.spec.js
```

`README.md` covers setup; `EXERCISE.md` supplies the unfinished-filter brief on
the exercise branch. That branch-specific file is not present on `main`.

Read the complete relevant functions and tests. If the brief or implementation
points elsewhere, follow that reference to resolve a named uncertainty rather than
loading the whole repository. If your work branch already has changes, the current
files—not just committed versions—are the state under investigation.

You can inspect a named branch without switching the working tree:

```sh
git show exercise/unfinished-filter:EXERCISE.md
git show exercise/unfinished-filter:package.json
git diff exercise/unfinished-filter -- src/App.jsx src/tasks.js src/tasks.test.js e2e/todo.spec.js
```

The last command compares those working-tree paths with the exercise starting
commit. It does not show untracked files or every path in the repository; use it
alongside `git status`, not as proof of a universally clean tree. Inspecting a
reference branch with `git show` does not run its code and does not verify your
current checkout.

Write down what each claim needs:

| Stale claim | Question to resolve |
| --- | --- |
| “Filter complete” | Is the control and selection behavior present on this state, and does it satisfy this branch's brief? |
| “Tests passed” | Which command, on which revision plus dirty changes, with what result? Does its coverage include the feature? |
| “Add remaining count” | Does the current request authorize this separate exercise? |
| “Run `npm run check`” | What scripts actually appear in `package.json`? |

Do not manufacture a failure. The exercise start can have passing baseline checks
without a completed filter. Existing tests can describe expected behavior without
having been run in this session. “A test exists,” “a test passed previously” and
“this check passed on this state” are three different claims.

### 3. Keep optional execution separate from inspection

You can complete the handoff exercise without running the app or tests: state
plainly that they were not run. If you choose to collect fresh execution evidence,
the ordinary route is:

```sh
npm install
npm test
npx playwright install
npm run test:e2e
```

Installation can access the network and write dependencies/browser downloads;
tests can write artifacts. This is **not** the read-only phase. Use the installed
Node version required by the app's README. Do not install anything automatically
just because a handoff suggests it. The scripts are defined in `package.json`;
`npm test` runs the unit suite, while `npm run test:e2e` operates a browser using
the Playwright configuration. Record setup failure as setup failure, not as a
feature failure or a passing check.

For manual UI inspection, run `npm run dev` and open the URL it prints. Record the
specific interaction you tried and what happened; stop that server with Ctrl+C
when finished. Do not infer filtering behavior from the ordinary add/complete/delete
scenario alone. After execution, inspect Git state again so any changed lockfile or
other relevant change is not omitted from the tested-state description.

### 4. Draft a corrected handoff

Keep the replacement in your exercise notes; no application edit is required.
Give it a status, not just a confident title. Here is a **prepared example, not an
observed run or a provider-backed transcript**. It illustrates an inspection-only
handoff for an unchanged exercise starting point. Learners must replace its state
fields and conclusions with their own evidence, not copy it as a receipt.

```text
Unfinished-task filter — prepared inspection-only handoff

Goal/scope: reconcile the stale note. No feature implementation, test execution
or remaining-count work authorized by this inspection.

Repository: demo/todo-app, its own Git repository.
Starting point: exercise/unfinished-filter; personal branch my-context-handoff.
Code state for this illustration: unchanged exercise start, no learner edits.
No concrete commit or working-tree observation is claimed by this prepared note.
A real continuation note must supply both from the learner's checkout.

Requirement source: EXERCISE.md on the exercise/unfinished-filter branch.
Prepared-state finding: the starting app adds, completes, deletes and persists
tasks; the unfinished-task filter is still the exercise to implement. A filter
on a separate solution branch would not make this starting state complete.

Correction: package.json defines test and test:e2e, not check. Do not add a
check alias to support the old note. The old "tests passed" claim supplies no
command, tested state or output and cannot serve as current verification.

Evidence status: prepared teaching material only. No current test or browser
result is recorded here. Existing baseline tests alone would not establish
that the unfinished-task filter is complete.

Unresolved: whether the teammate referred to a different branch or local edits.
No historical run can be recovered from the stale note's unsupported claim.

Next action: reconcile this prepared description with the actual checkout and
record the source findings. If the implementation exercise is then authorized,
use the unfinished-filter brief; do not start the separate remaining count.

Supersedes: the fictional "filter complete / npm run check" note above.
```

A **live** handoff should be more concrete than that prepared example: include the
actual revision, dirty changes and source findings. If you ran checks, include exact
commands, working directory, outcome and any saved output location. If you did not,
write “not run.” Do not replace missing evidence with invented passing test counts.
Link to the accepted brief instead of copying a partial version of its requirements.

Try this short prompt after supplying the note and real checkout:

```text
Inspect this stale handoff against the current branch, brief, scripts, source and
tests. Do not edit files, install anything or run checks. Draft a corrected note
that separates observed code from intended behavior and unverified claims.
Name the smallest next action; do not start another feature.
```

If OMP is available, inspect `/extensions` without toggling settings to see the
reported sources and states of discovered context files. Ask which guidance was
already provided and which files it explicitly read. A loaded instruction is not
a test result or proof that the instruction was followed.

## Use at work

Give a fresh reader the task and your corrected note, not your entire conversation.
Can they answer: which state is this about, what behavior is accepted, what evidence
exists, what remains unknown and what may I do next? Have them reconcile the note
with the checkout before acting. Mark your actual exercise as a human reconstruction,
a prepared illustration or a provider-backed run, whichever it was.

A stale note is useful when it exposes a maintenance boundary. Keep stable navigation
in existing repository guidance; keep temporary progress in the task handoff. Keep
important reasons in a decision record only when their provenance is known. If a
feature's accepted behavior changes, update or supersede the old requirement rather
than quietly leaving two current versions.

Typical recovery choices:

- **Wrong command:** read script definitions and correct the note; do not add an
  unnecessary command to preserve the note.
- **Wrong branch:** identify the state the claim describes; preserve local work
  before any switch. A solution branch is a reference, not evidence for your branch.
- **Unknown result:** collect an authorized relevant result or mark it unverified.
- **Code/requirement disagreement:** explain intended versus actual behavior and
  the missing decision; do not silently change either side to force agreement.
- **Repeated irrelevant reading:** provide a small repository map and a specific
  unanswered question rather than another document dump.

## Go deeper

Take the instruction “the filter is finished” and turn it into an evidence question.
Then take “the filter must not delete hidden tasks” and identify what source would
make that an accepted requirement. Explain why source inspection alone answers
neither a historical test-result question nor a product-authority question.

### Sources and adaptation

- [Official OMP context-file documentation](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md)
  documents automatic discovery, shadowing and `/extensions`. This exercise does
  not require creating an instruction file or modifying discovery settings.
- [Matt Pocock's Full Walkthrough: Workflow for AI Coding, AI Engineer, 2026-04-24](https://www.youtube.com/watch?v=-QFHIoCo-Ko)
  informs the stale-document discussion. The adaptation is to reconcile and maintain
  useful records, not delete documentation indiscriminately or adopt his framework.
- The stale note, corrected-note example and exercise are **course-authored teaching
  material**, not captured execution. App command definitions come from the current
  todo repository's `package.json`; actual outcomes must come from the learner's run.

[Back to section 4](../sections/04-context-and-repository-knowledge.md)
