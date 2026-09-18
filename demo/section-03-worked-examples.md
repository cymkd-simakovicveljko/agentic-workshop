# Section 3 — worked examples on the same todo app

The workflow transfers because the decisions recur, not because every task needs
six prompts. These examples stay in `demo/todo-app`: no fictional API, second demo,
new test harness or invented package script is required. Feature and bug cases use
the supplied exercise branches; optional investigation cases describe a situation
to investigate, not a claim that the current app has that defect.

## Understand

For each case, identify the situation, the consequential decision, a short request,
the evidence that would support acceptance, and a meaningful follow-up. The prompt
starts the work; it does not replace inspecting the real branch and its checks.

Before any branch change, start at the **course root**:

```sh
cd demo/todo-app
git rev-parse --show-toplevel
git status --short --branch
```

Confirm this is the standalone todo-app repository. Preserve dirty work on its
existing branch or use a separate copy before continuing; never reset, clean or
force-switch to make an example work. Choose unused learner branch names. The
[setup guide](section-01-setup.md) explains the nested-repository route.

Each example's branch commands run from **`demo/todo-app`**. After choosing a
branch, record `git rev-parse HEAD` as the starting revision. If setup is missing,
run `npm install` and `npx playwright install` there. The ordinary checks are
`npm test` and `npm run test:e2e`; the interactive app is `npm run dev`. The browser
suite manages its own server according to `playwright.config.js`. Use the URL
printed by the development server for manual checks, keep other working copies
off the test server's configured port, and use synthetic localStorage data.

If you use an already configured OMP installation, run `omp` from that same app
directory and enter the prompts as ordinary requests. Otherwise do the reasoning
and edits yourself and label the route accordingly. The examples do not require
provider setup, publication or dependency installation beyond normal app setup.

## Watch or try

### 1. Small feature: remaining-task count

**Situation.** A user wants to see how many tasks remain. Work on the independent
count exercise, not on top of a half-finished filter:

```sh
# cwd: demo/todo-app; only after preserving existing work
git switch exercise/remaining-count
git switch -c my-count-practice
```

**Decisions.** Count unfinished tasks, not every stored task. Start with zero for an
empty collection. Add increases the count; completing decreases it; uncompleting
increases it. Deleting a completed task should not change it, while deleting an
unfinished task should. Use the current task data rather than storing a separate
counter that every action must synchronize. Do not silently bring the filter into
this branch.

```text
Add a visible remaining-task count using the current tasks. Count unfinished
items, including after add, complete, uncomplete, delete and reload. Keep task
behavior unchanged; no separate counter store or dependency. Inspect first,
make the smallest change, and report the checks you actually ran.
```

**Evidence.** Run the existing suites, then use two tasks: complete one, delete the
completed one, and observe that one still remains. Delete the unfinished one and
observe zero. Reload after a mixed completed/unfinished collection and compare the
count with the saved tasks. A test that asserts only an initial zero can pass with
a hard-coded label.

**Useful follow-up.**

```text
Which check distinguishes remaining tasks from total tasks? Show the observation
for deleting a completed item, not just adding a new one.
```

**Review decision.** Accept the count only if it follows current data and the
reported evidence exercises mutations. Wording should be clear, but a test that
pins incidental punctuation is less valuable than one that catches a stale or
incorrect count. Compare with `solution/remaining-count` after your own attempt;
preserve your work before running another branch.

### 2. Reported defect: whitespace-only tasks

**Situation.** Submitting spaces creates an empty-looking task. This is the supplied
bug exercise, explored more deeply in section 6:

```sh
# cwd: demo/todo-app; only after preserving existing work
git switch exercise/blank-task-bug
git switch -c my-blank-task-investigation
```

**Decision.** No task should be created from whitespace-only input. Normal titles
should still be trimmed and added; existing IDs, completion and persistence must
remain intact. The visible form is a caller of shared creation logic, not the only
place a task can be created.

```text
Submitting spaces creates an empty task. Reproduce that behavior, trace the
shared creation path and its callers, and fix the root cause. Preserve normal
trimmed task creation and existing behavior. Keep a regression that fails for
this defect, run the unit and browser suites, and report actual results.
```

**Evidence.** Preserve an existing task, submit spaces, and show that no extra task
is created. Submit `  Write tests  ` and show that `Write tests` is created normally.
The shared operation needs evidence as well as the form: a form-only rejection can
leave another caller broken. After the fix, reload to check that valid tasks still
persist. Record the pre-fix symptom and post-fix behavior, not merely “tests green.”

**Useful follow-up.**

```text
Does the shared creation function reject blanks without relying on the form?
Identify the evidence for that boundary and check that a valid padded title
still creates a task. Do not add a second competing validation rule.
```

**Review decision.** A special case in the browser handler is insufficient if the
shared task operation remains wrong. Do not weaken an accepted regression to fit
the bug. If a command never starts because dependencies are missing, diagnose
setup separately rather than calling it a reproduced application failure.

### 3. Focused refactoring: rendering without changing task behavior

**Situation.** On a completed filter attempt, a review discovers that visible rows
are kept in a second state variable and updated by several handlers. The feature
works for the tested sequence, but this duplicated state can drift. This is a
conditional review scenario: if your implementation already derives visible rows,
there is no refactoring to do.

Stay on your preserved filter work branch; do not overwrite it with a reference
branch just to manufacture the example.

**Decision.** Preserve observable behavior while simplifying the representation.
No new filtering semantics, sorting, storage schema or saved preference belongs in
a refactor. First locate all readers and writers of the duplicated state; otherwise
removing one update path may leave another stale.

```text
Inspect whether the visible task list duplicates state that can be derived from
tasks and the checkbox. If it does, simplify that representation while preserving
our filter examples and existing task behavior. Do not extract a new framework or
add features. Report what changed and the evidence of preserved behavior.
```

**Evidence.** Use the existing hide/show regression, then filter a mixed collection,
add a task, complete it, delete a visible task and reload. The same selected IDs
must change and hidden tasks must survive. A before/after check is useful here:
the purpose is preservation, not making a formerly absent feature appear.

**Useful follow-up.**

```text
Which observable behavior did you hold constant? Show how the checks cover an
add or completion while filtered, rather than only the initial list.
```

**Review decision.** Accept the simpler data flow only if it preserves the agreed
behavior. Renaming a variable or moving the same synchronization into a new helper
is not the same as removing duplicated state. Conversely, do not extract a row
component just to make the diff look like a refactoring exercise.

### 4. Test design: a filter regression with hidden identity

**Situation.** Your filter implementation appears correct, but its new browser test
only checks that a completed task disappears. The task is improving evidence for
a plausible defect, not adding application behavior. Use your existing filter work
branch and its current test conventions.

**Decision.** The check must distinguish hiding from deletion and stable identity
from visible position. Create a completed earlier task and an unfinished later
task, then act on the later task while the earlier one is hidden. This counterexample
is stronger than adding five labels to the same happy-path assertion.

```text
Improve the filter regression to challenge reversibility and identity: hide an
earlier completed task, delete the visible later task, turn filtering off and
reload. Assert which task remains and its completion state. Reuse the existing
browser test setup and accessible locators; do not change app behavior.
```

**Evidence.** The hidden completed task returns and stays completed; the selected
deleted task stays absent after reload. If the assertion fails, report a product
bug with the sequence rather than silently changing the expected result. Where
practical during test development, demonstrate that the check rejects the actual
faulty behavior it is meant to defend; do not keep intentionally broken app code.

**Useful follow-up.**

```text
Would this test fail if filtering saved only visible rows? Would it fail if Delete
used a visible index? Explain which user-visible assertion catches each mistake.
```

**Review decision.** Keep the test if it protects a real invariant. Do not assert
internal state variable names, implementation calls or the number of times a
helper ran. A test that echoes a mock's configured return value is not evidence
that the real list survives the sequence.

### 5. Documentation correction: commands must be executable

**Situation.** A learner reports that the app README names a setup or test command
that is not in `package.json`. Treat this as a reported documentation task, not an
assertion that the current README contains such a mistake.

For independent practice, start from `main` on a new branch after preserving work:

```sh
# cwd: demo/todo-app
git switch main
git switch -c my-docs-practice
```

**Decision.** Correct the instructions to the actual supported route. Do not create
a compatibility script merely to make stale documentation true. Distinguish running
from the course root from running inside the standalone app repository.

```text
Compare the reported README command with package.json and the app setup. Correct
only the inaccurate instructions and directly related links. Give explicit working
directories. Exercise the documented route where available and report any step
that could not be run; do not add scripts to preserve a stale instruction.
```

**Evidence.** Show the documented command, its actual script definition and the
result of invoking it from the documented directory. For the browser route, reach
the rendered app and perform an add/complete interaction. A successful text search
for the new command does not show that the instructions work.

**Useful follow-up.**

```text
Where must the reader start, and what should they see after the command? Check
that the route does not accidentally operate on the outer course Git repository.
```

**Review decision.** If the reported mismatch does not exist on the inspected
revision, report that fact and the version discrepancy rather than making a
cosmetic change. Do not claim a provider-backed rehearsal merely because the
README describes OMP.

### 6. Failing or slow browser check: diagnose before changing tests

**Situation.** On your work branch, `npm run test:e2e` fails to reach the app or a
browser assertion intermittently times out. These symptoms are not equivalent.
A missing browser executable, occupied server port, wrong app instance and a
stale UI all need different corrections.

**Decision.** Capture the first actual failure and determine the failing boundary:
process setup, browser launch, navigation, interaction or assertion. Inspect
`playwright.config.js` and the failing test before modifying timeouts or retry
settings. This example does not assume the repository has a CI configuration.

```text
Investigate this npm run test:e2e failure before changing code. Use the command,
working directory and output below. Identify the failing boundary, inspect the
relevant configuration and test, then propose one bounded diagnostic step. Do not
add retries, weaken assertions or increase timeouts just to make it green.
```

Attach the actual output; the prompt alone is not a failure report.

**Evidence.** If the configured port serves another working copy, identify that
instance and correct the local run setup; do not kill an unidentified process.
If the browser cannot launch, address or report that prerequisite. If a task row
never appears, reproduce the interaction against the intended code state and
inspect the responsible path. For slowness, record comparable observations and
conditions rather than announcing a speedup after one lucky run.

**Useful follow-up.**

```text
What observation would distinguish your hypothesis from the next plausible one?
Run that one diagnostic step and explain what its result rules in or out.
```

**Review decision.** A passing retry shows that a run passed; it does not explain
why the previous run failed. Accept a repair when the cause and the relevant
before/after evidence agree. If no code change is needed, a factual diagnosis is a
valid deliverable.

### 7. Narrow dependency update: the target is part of the requirement

**Situation.** An authorized ticket asks to update one existing todo-app dependency
to an exact release. The shipped package manifest uses broad `latest` ranges, so
read both `package.json` and the resolved `package-lock.json` to establish what is
actually installed. This is an optional workplace scenario, not an instruction to
upgrade the course environment.

Start on a fresh branch from the agreed base after preserving prior work. Do not
run update commands until the package and target version are known.

**Decisions.** Is the requested release compatible with the app's Node requirement,
bundler, React usage or test runner as appropriate? Does it require a migration,
or only a resolution change? A ticket saying “make it current” is not an exact
target. Official release notes are inputs to the decision, not a substitute for
exercising the affected behavior.

```text
Inspect the requested package's current resolved version, the exact target in the
ticket and its official migration notes. Explain the affected app/test path before
editing. Keep the update limited to that package and necessary lockfile changes;
report any required wider migration rather than silently upgrading the stack.
```

Supply the actual package, target and ticket context. Missing target information
is a real prerequisite; inventing a version does not resolve it.

**Evidence.** Review the manifest and lockfile diff for unrelated churn, then run
`npm test` and `npm run test:e2e` from `demo/todo-app`. Exercise the app with
`npm run dev` and the existing add/complete/delete/reload journey; if the updated
package affects filtering on your branch, exercise that too. An install that exits
successfully proves dependency resolution, not runtime compatibility.

**Useful follow-up.**

```text
Which changed lockfile entries are required by this one update, and which observed
behavior exercises the affected dependency? Separate install success from app
verification.
```

**Review decision.** Avoid folding unrelated “latest” upgrades into the requested
change. If the exact target requires a broader migration, make that decision
visible before expanding the work. Do not invent a migration or add speculative
compatibility layers when the release does not need them.

## Use at work

### Compare what each task actually needs

| Kind of work | Most important early decision | Evidence to resist substituting |
| --- | --- | --- |
| Feature | Agree distinguishing acceptance examples | Baseline tests alone for new behavior |
| Bug fix | Reproduce and locate the violated boundary | A form workaround for a broken shared operation |
| Refactor | Name the behavior that must remain unchanged | A smaller diff without behavioral checks |
| Test improvement | Identify the plausible bug the test rejects | Assertions about internal wiring |
| Documentation | Establish the reader's executable route | Correct-looking prose with unrun commands |
| Investigation | Choose a diagnostic that separates hypotheses | A lucky retry for an explanation |
| Dependency update | Agree exact target and compatibility scope | Successful installation for runtime correctness |

One concise prompt can cover several stages when the scope is clear. Separate
turns earn their place when they expose a real decision: an unknown storage
contract, unclear target version, incompatible requirement or failure with multiple
plausible causes. Do not create ceremony merely because the table has six stages.

### Handoff with enough state to continue

For any example, record repository and branch, starting revision, changed files,
actual commands with cwd and results, direct browser observations, unverified
cases, and the next action. Explain any intentional unchanged behavior. Review
tracked changes against the recorded base, not only `HEAD`, and inspect untracked
files listed by status.

The acceptance decision is yours. “The agent says done” is not a state of the
product; “the requested mutation preserves the hidden record after reload, and the
remaining limitation is keyboard coverage” is a reviewable claim. If evidence is
missing, name the gap without pretending the feature has failed or passed.

## Go deeper

Try rewriting one example into a single small request and another into an
inspection-only first turn. Explain the uncertainty that justifies the difference.
For each, name the cheapest observation that could prove your first hypothesis
wrong. Use [the main filter lab](section-03-workflow-lab.md) when you want the full
browser sequence rather than an additional feature.

### Sources and adaptation

All situations, prompts, acceptance decisions and counterexamples here are
course-authored. Conditional scenarios are not claims of current repository bugs,
and none of the examples is a live OMP transcript. The official
[OMP README entry-point reference](https://github.com/can1357/oh-my-pi/blob/main/README.md#four-entry-points-interactive-one-shot-rpc-and-acp)
supports the `omp` interactive launch used here; ordinary prompts do not create a
special workflow mode. See the official
[approval documentation](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md)
for the distinction between instructions, approval and actual containment.

The main lesson's thin end-to-end slice adapts
[Matt Pocock's Full Walkthrough: Workflow for AI Coding](https://www.youtube.com/watch?v=-QFHIoCo-Ko)
as workflow inspiration, not as authority for OMP controls or a mandatory process.
[Key examples](https://gojko.net/2014/05/05/focus-on-key-examples/),
[red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/)
and [Playwright best practices](https://playwright.dev/docs/best-practices)
provide further reading on distinguishing cases and observable verification.

[Back to section 3](../sections/03-the-everyday-workflow.md)
