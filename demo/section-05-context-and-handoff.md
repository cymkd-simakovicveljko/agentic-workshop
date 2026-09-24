# Section 5 — context, pruning and factual handoffs

Recover the state behind an unreliable note, then remove stale or redundant
guidance without losing the information a fresh reader needs. This is a context
exercise, not another feature implementation.

**Choose your evidence route.** The canonical `demo/todo-app` source and branches
are missing from this distribution. The live inspection in steps 1–3 requires
[recovery through setup](section-01-setup.md); all app file, script and branch
descriptions below are prepared assumptions until confirmed there. Do not
reconstruct the app or use the historical public app. Without that checkout, use
the prepared note and pruning packet below. Label the result prepared analysis,
not observed source, app execution or a provider-backed run.

## Understand

A fictional teammate leaves:

```text
The unfinished-task filter is complete. Tests passed. Continue by adding a
remaining count. Run npm run check if you need confirmation.
```

That note mixes four different things: a completion claim, a historical test claim,
a proposed next task and a command. None supplies the branch, revision or dirty
changes it describes. In this prepared exercise the command is intentionally wrong:
the described app has no `check` script. Confirm the real scripts after recovery.
Inspect and repair the record, rather than adding a script or changing app code
to make an old note accurate.

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

### Handoff template

This is the course's single maintained format. Use it in an existing issue or one
task note for a delivered change, an interrupted investigation or a coordinated
increment. Fill only relevant detail, but keep an explicit “unknown” or “not run”
where silence would imply a result. Link to the authoritative requirement instead
of maintaining a second copy.

```text
Task and status:
Goal, authorized scope and non-goals:
Accepted requirement/decision links, source and status:
Repository/cwd, branch, starting revision and current revision:
Relevant dirty/staged/untracked work; where it is preserved:
Current implementation or investigation findings, with source locations:
Evidence: exact command/action, cwd, tested revision plus dirty state,
          actual result and output location; source inference kept separate:
Unrun/blocked checks and the prerequisite each needs:
Active processes, working copies, browser data or external effects to reconcile:
Open decisions and hypotheses, provenance/owner, what would resolve them:
Review/acceptance decision and remaining limitation:
Next authorized action and its owner:
Supersedes or updates which earlier note:
```

A commit alone does not identify tested state when relevant edits were dirty.
An interrupted action can have an unknown outcome; record what needs inspecting
before a retry. Keep secrets and unrelated private content out of the note. The
template stores enough state to resume, not every line of the old conversation.

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

### 5. Prune a deliberately messy guidance packet

This independent **prepared exercise** needs no todo checkout. Work in your notes;
do not install the packet as `AGENTS.md`. Its labelled sources supply the facts
for this exercise only, so you can practice provenance without inventing a run.

**Authoritative source packet**

- **R — accepted exercise brief, revision R1:** the filter is a reversible view.
  Completed records and their IDs must remain intact. A fresh page starts with
  the filter off. Adding a remaining count is outside this task.
- **U — current user request:** inspect the proposal and correct its handoff.
  No app edits, installs or check execution are authorized in this inspection.
  Existing learner work must remain untouched.
- **P — prepared package-source excerpt:** scripts are `test`, `test:e2e` and
  `dev`. This is a provided source fact, not a command result or a recovered file.
- **S — prepared candidate summary:** the proposal calls `changeTasks` with only
  unfinished tasks when filtering is enabled. Its supplied array-selection test
  has no execution output. The full review packet is in the skill companion.
- **Q — unaccepted product question:** someone proposed remembering the filter
  after reload. No owner has approved it; the next product decision would need to
  supersede R1 explicitly. Source: proposed follow-up Q, not an accepted brief.

**Messy note to prune**

```text
1. Write excellent code and be thorough.
2. Filter must keep completed records and stable IDs. Source: accepted R1.
3. Do not lose hidden tasks; preserve their identity. Source: accepted R1.
4. Run npm run check. Source: old teammate note, no revision.
5. Tests passed and filter is complete. Source: old note, no output or tested state.
6. Next add a remaining count. Source: old teammate suggestion.
7. Inspect only: no edits, installs or checks; preserve learner work. Source: U.
8. Use package.json for command definitions. Source: repository navigation.
9. Remember filter after reload. Source: Q, proposed, not accepted.
10. Fresh load starts with filter off. Source: accepted R1.
11. All future instructions must repeat every test command. Source: personal idea.
12. Current evidence: candidate source plus test source; no run output. Source: S.
```

First give each numbered line one disposition: retain, remove, relocate or
reconcile. Explain the decision in terms of its source and lifetime. Then draft
a smaller guidance fragment and a corrected handoff using the template above.
Keep durable navigation in guidance, current status in the handoff, and accepted
behavior behind a precise pointer to R1. You need not create three files to
demonstrate those distinctions: labelled sections in your notes are enough.

Now give a fresh reader only U, the authoritative packet and your revised material.
Ask them to identify the accepted behavior, supported commands, action boundary,
preserved work, evidence gap and unresolved product question. They must be able to
trace each answer to R, U, P, S or Q without seeing the messy note. Ask one close
negative question: “May we persist the filter now because Q is newer?” The answer
is no: Q is unaccepted, while R1 still controls the current behavior.

**Expected reasoning, not a saved learner result:** merge lines 2–3 into one
constraint or a clear R1 pointer; remove the generic praise in 1 and invented
repetition rule in 11. Correct line 4 using P without adding an alias. Reconcile
5 against S as an unsupported historical claim rather than rewriting it as a
passing result. Exclude the count suggestion from authorized next work. Preserve
U's restrictions and work-preservation rule. Keep Q visible as an open decision,
not an instruction; retain R1's current off-on-load behavior. Command definitions
remain in their source, reached through line 8's pointer.

A short result that drops U or Q's unaccepted status fails this exercise. A long
result that copies all the contradictions also fails. Success is a fresh reader
making the right next decision with less irrelevant material, not hitting a word
count. If the reader misses a constraint, repair its pointer and repeat that
question before calling the pruning successful.

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

- [OMP 18.2.9 context-file documentation](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md)
  documents automatic discovery, shadowing and `/extensions`. This exercise does
  not require installing an instruction file or modifying discovery settings;
  documentation is source evidence, not a local loading observation.
- [Matt Pocock's Full Walkthrough: Workflow for AI Coding, AI Engineer, 2026-04-24](https://www.youtube.com/watch?v=-QFHIoCo-Ko)
  informs the stale-document discussion. The adaptation is to reconcile and maintain
  useful records, not delete documentation indiscriminately or adopt his framework.
- The stale note, corrected-note example and pruning packet are **course-authored
  teaching material**, not captured execution. App command descriptions must be
  confirmed against the recovered canonical repository before use. Actual outcomes
  must come from the learner's run, not the prepared answers.

[Back to section 5](../sections/05-steering-agents.md)
