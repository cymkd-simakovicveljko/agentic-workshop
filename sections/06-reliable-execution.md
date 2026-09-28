# 6. Verification, diagnosis and recovery

**Main outcome:** distinguish a real repair from reassuring evidence, enforce one
mechanical standard, and recover a trustworthy state without losing useful work.
The blank-task case teaches shared-cause diagnosis. A separate disposable
exporter exercise makes the mechanical check runnable without the todo app.

**Starting-state boundary:** the canonical `demo/todo-app` checkout and exercise
branches are currently unavailable. Its recorded defect and checks below are a
prepared diagnosis case, not newly inspected source or an observed run. Follow
the [setup prerequisite](../demo/section-01-setup.md) before attempting that route;
do not substitute the historical `demo/public` app. The
[mechanical-check route](../demo/section-06-recovery-lab.md#run-a-mechanical-standard-without-the-todo-app)
needs only Git, Node and the supplied exporter files. Completing it does not
complete the blank-task repair or browser verification.

## Understand

A command fails. The agent changes something. Fewer assertions fail. Is the task
finished? Not necessarily: progress and acceptance are different judgments.
Reliable execution means you can explain the current state, choose the next
useful action, and preserve work if the run stops. It does not mean keeping an
agent busy until its final message sounds confident.

### Diagnose before choosing a recovery action

“The agent failed” hides several different problems. Start with the exact action,
working directory, input, expected behavior and actual result. Record the branch,
revision and relevant uncommitted changes: a passing result belongs to the code
that was checked, not whatever happens to be on disk now.

| Evidence | Decision | Useful next action | Tempting mistake |
| --- | --- | --- | --- |
| An assertion consistently fails with the same code and input | **Diagnose, then repair** | Read expected versus actual values; form one hypothesis and a check that could disprove it. | Re-run unchanged code and hope for a different result. |
| A dependency is missing or a server cannot start | **Repair the environment** | Read the startup error and establish whether any assertions ran. | Change task logic to fix a command that never reached it. |
| A network/provider operation fails temporarily | **Consider a bounded retry** | Establish why it might now succeed and whether repeating it is safe. | Treat every failure as transient or retry forever. |
| A write/upload times out with an unknown outcome | **Inspect before retrying** | Check the destination or operation record for the first action's effects. | Repeat an action that may already have completed. |
| An edit is rejected because its file context is stale | **Reconcile state** | Reread the current file and diff before constructing the edit again. | Force the old patch onto newer work. |
| Two accepted requirements conflict | **Pause for a decision** | Surface the conflict and the evidence for each interpretation. | Silently rewrite tests to match the latest guess. |
| Conversation context is confused, but the repository state is understandable | **Restart the reasoning context** | Preserve evidence and start from a factual handoff. | Expect a fresh conversation to undo files or stop servers. |
| The agent says “fixed” without a check record | **Verify** | Request actual command results and inspect the current diff. | Promote a summary into evidence. |

A **deterministic failure** repeats because the same inputs meet the same defect.
For example, a task-creation function that always accepts spaces will keep doing
so until its behavior changes. A **transient failure** depends on a temporary
condition, such as an unavailable provider. Neither label comes from the color
of the terminal output. Repeated failures can also mean a persistent setup error,
not a flaky test. State what new information another run would provide.

Keep the investigation small: **hypothesis → distinguishing check → observation
→ decision**. If your explanation cannot predict an observable difference, it is
not yet useful enough to justify a repair.

### Fewer failures can hide an incomplete fix

The recorded defect contract says the shared `addTask` function accepts raw input
without normalizing or rejecting it. Once the canonical checkout is available,
confirm the helper and its callers before editing. Consider three repairs:

| Proposed repair | What it fixes | What remains wrong |
| --- | --- | --- |
| Reject only `text === ''` | An empty string | Spaces still create a task; padded valid titles remain untrimmed. |
| Trim the title but always append | Padded valid titles | Whitespace becomes an empty title and still creates a task. |
| Reject blanks only in the form | That UI path | The shared function still violates its contract; other callers and unit checks remain exposed. |

The correct place to restore the existing contract is the shared creation path:
normalize the title, reject a normalized blank, and preserve valid task creation.
Read its callers too. Here the form uses an unchanged task-list reference to
recognize rejection and display an error. Returning a new but equal array is not
equivalent for that caller. This is a concrete reason to inspect an interface,
not a rule to assert object identity in every test.

Do not “repair” the test to expect blank tasks, delete its failing assertion, or
special-case the example string. Those changes remove the warning without
restoring the behavior.

### Instructions are not enforcement

“Only edit the task helper” is useful scope guidance, but it is not a filesystem
permission. Separate what you ask from what the environment can prevent:

| Boundary | What it actually does |
| --- | --- |
| Prompt scope and stop conditions | Guide the agent; human review checks whether it complied. |
| Exposed tools and per-tool policies | Restrict calls through the configured tool surface; inspect the effective settings. |
| OMP approval prompts | Gate tool calls according to mode and tool/user policy, not according to whether the result is correct. |
| OS/container filesystem, network and credential restrictions | Enforce environmental access boundaries when actually configured. |
| Separate branches or worktrees | Separate work for review/integration; do not isolate credentials or network access. |

The [host lesson](03-working-with-omp.md) explains effective approval controls and
their limits. Approval is not a sandbox, and instructions do not enforce scope.
Keep secrets and production systems out of this exercise; it needs no new
approval configuration.

### A mechanical check rejects a narrow class of mistakes

A repository instruction can say “resolve merge conflicts before review.” Git can
also detect conflict markers in a tracked diff, and Node can reject a module that
does not parse. These checks have observable failure conditions; the instruction
alone does not. Neither check establishes that a correctly parsed change preserves
the intended behavior.

In the companion, introduce a conflict between the exporter's existing
`CLOSED → closed` mapping and an alternative that maps every ticket to `open`.
`git diff --check` must fail because unresolved conflict markers were introduced;
`node --check` must fail because they are not valid JavaScript. Resolve the
conflict, then run the existing baseline assertions. Merely keeping the
all-`open` alternative removes the mechanical errors but violates the known
closed-ticket behavior. That separation is the point: syntax, repository
standards and behavior need different evidence.

Running a check once is detection, not a permanent gate. A reviewed CI or
pre-commit configuration can require it at a chosen boundary, but this lab does
not install one. Even a gate covers only the files and rules it actually checks.
Do not describe it as an agent safety boundary or a proof of product correctness.

## Watch or try

Start with the [mechanical standards exercise](../demo/section-06-recovery-lab.md#run-a-mechanical-standard-without-the-todo-app).
It supplies commands, an intentional failure, a tempting incorrect resolution and
the existing behavioral check that rejects it. Record your output before using
the worked explanation.

The following blank-task route is independent and **blocked until the canonical
app is restored**. Its commands and expected observations are retained so the
exercise can be rehearsed against that source, not reconstructed from prose.

### 1. Establish the starting state

From the course root:

```sh
cd demo/todo-app
git status --short --branch
```

This is a **standalone nested Git repository**. If there are existing edits,
preserve them on their current work branch before switching. Include untracked
files in that decision; a normal diff does not contain them. Do not discard work
to obtain a clean exercise. If you have already started this lab, return to your
own branch rather than recreating it.

Once the checkout is ready, create your own work branch from the defect:

```sh
git switch exercise/blank-task-bug
git switch -c my-blank-task-fix
npm install
npm test
```

Use a different new branch name if that one already exists. The starting
`npm test` is **expected to fail assertions**, not expected to fail setup. The
existing tests exercise rejection of spaces and trimming a padded valid title;
both expose the deliberate defect. A missing executable, unsupported Node
version or import/startup error is a different problem. The app requires Node
22.12.0 or later. Read the output before deciding what to repair.

In another terminal in `demo/todo-app`, run `npm run dev` and open the URL it
prints. Use a disposable browser profile/session so existing localStorage data
is not mistaken for a fresh result. Submit an empty input, then spaces. Observe
whether a new blank row appears. Also try `  Write tests  `: accepting meaningful
text and trimming its edges is part of the same contract. Record observations
rather than treating these instructions as an already-executed trace.

### 2. Diagnose, then make one coherent repair

Launch `omp` from the app directory. Begin with a bounded investigation:

```text
Investigate the blank-task failure before editing. Read the failed assertions,
addTask and its callers. Explain one root-cause hypothesis and how the empty,
spaces-only and padded-valid inputs distinguish it from a form-only problem.
```

Compare the explanation with `src/tasks.js`, `src/tasks.test.js` and
`src/App.jsx`. Then authorize the repair:

```text
Fix the smallest shared cause. Empty and whitespace-only submissions must add
nothing and show the existing input error; valid titles must be trimmed. Preserve
add, complete, delete and localStorage behavior. Do not weaken tests or refactor
unrelated code. Run the unit and browser checks; report actual results and limits.
```

The [lab companion](../demo/section-06-recovery-lab.md) gives the full command and
evidence route, including an optional pause after diagnosis. The core task does
not need delegation, new tooling or a recovery framework.

### 3. Verify the repair, not just the explanation

In the app directory, run:

```sh
npm test
npx playwright install
npm run test:e2e
```

The browser installation is needed if Playwright's browsers are not available.
The configured end-to-end command starts its own local Vite server on port 4173;
check that any server it reuses belongs to this checkout. A missing browser or
failed server startup is not a passing or failing blank-input assertion.

Use each form of evidence for what it actually covers:

| Evidence | What it establishes | What it does not establish alone |
| --- | --- | --- |
| Existing unit assertions | Shared blank rejection and trimming, plus other task/storage checks | The form displays the right feedback in a real browser. |
| Existing browser suite | Add, complete, reload persistence and delete work through the UI | Empty and whitespace submissions are rejected; the existing suite does not exercise them. |
| Manual browser check | Empty/spaces input adds no row and shows an error; padded valid input adds a trimmed title | Every helper or storage failure path is covered. |
| Diff and caller review | The patch restores the shared contract without widening scope | Runtime behavior without executing it. |

In a fresh disposable browser session, submit empty input and spaces again.
Confirm the task list is unchanged and the input error is visible. Then add a
padded valid title, complete it, reload, and delete it. Do not require old blank
records created during reproduction to disappear: prevention of new bad input
is not a migration of previously saved data. Keep those two tasks separate.

Review `git diff`, `git diff --cached` and `git status --short`. Explain why the
repair addresses all three inputs and why the form still recognizes rejection.
If browser verification is unavailable, report that gap rather than claiming
end-to-end recovery. Compare with `solution/blank-task-bug` only after your own
attempt; the companion shows a read-only comparison that does not switch away
from unfinished work.

## Use at work

### Stop deliberately and account for what is still running

Pause when the next action needs an unresolved requirement, scope widens, the
agent weakens checks to get a pass, or another repair would repeat an explanation
already contradicted by evidence. A red test alone is not a reason to abandon a
productive investigation. Agree a bounded investigation in advance: for example,
pause after two repairs fail the same accepted behavior without new evidence.
This is a decision aid, not a universal limit or an OMP-enforced guarantee.

Use the interruption controls from [Working with OMP](03-working-with-omp.md)
and confirm the turn actually stopped. A keypress is not evidence that every
subprocess or worker stopped, nor does interruption roll back completed edits.

Before taking a stable snapshot:

1. Identify active commands and children. Record **completed**, **cancelled**,
   **still running** or **unknown**, based on observed state.
2. Stop or wait for relevant writers; do not snapshot while another worker is
   still changing the same files. Stop only processes you can identify as yours.
3. Preserve staged and unstaged edits, useful untracked files and failure output.
   A branch name identifies commits; it does not save uncommitted changes.
4. Record the stopping reason, remaining hypothesis and next discriminating
   action. Keep detailed logs locally and link them; do not flood the handoff.

A short prompt is enough:

```text
Pause implementation. Summarize the accepted behavior, current changes, actual
check results, unresolved hypothesis and next useful action. Identify active
commands or workers and their observed state. Preserve the failure evidence;
mark unknown outcomes as unknown.
```

### Resume context without confusing it with repository recovery

Choose the appropriate session action using the
[host reference](03-working-with-omp.md). No session action restores files,
reconciles browser storage or accounts for external effects. A saved conversation
is history, not today's inventory; check the working directory after a resume.

Use the single [handoff format from section 5](../demo/section-05-context-and-handoff.md)
to preserve the accepted behavior, exact candidate, evidence, unresolved
hypothesis and operation states. Do not maintain a competing recovery template.
Carry failure output as evidence, not just the claim that a test failed:

```text
Read this handoff and inspect the current files before editing. Reconcile the
recorded branch, revision, diff, untracked work and check results with today's
state. State the next action and why it will reduce the remaining uncertainty.
```

If selected code really must be replaced with a known version, first inspect and
preserve precisely what would be lost, then choose the files deliberately. A red
test does not justify repository-wide cleanup. Recovery succeeds only when both
the accepted behavior and unrelated useful work survive.

## Go deeper

### Optional: bounded delegation and parent integration

A small shared function with a clear failing assertion is usually easier to
inspect directly. Delegation earns its cost when there is an independent question,
a complete assignment, useful work for the parent meanwhile, and a verifiable
result. “Another agent might know” is not enough.

On this same app, freeze the code after diagnosis. A reader can assess which
blank/trim behaviors the tests cover while the parent writes the recovery handoff
from actual command output. No concurrent edits are needed:

```text
Inspect src/tasks.test.js, e2e/todo.spec.js and the creation/form callers at the
recorded code state. Return a table: accepted behavior, relevant assertion and
coverage gap. Read only; do not edit, run commands or delegate further. Stop after
one pass or report an essential missing input. Do not approve or repair the fix.
```

That prompt defines intent. If read-only access is required as an enforced
boundary, also inspect the child's effective tool permissions. OMP's `task` tool
supports subagents, but children do not inherit the parent's conversation
history. Supply the code state and requirements explicitly. Non-isolated workers
can share the working directory; isolation is a configuration-dependent option,
not an assumption you can make from the word “subagent.”

The reviewed OMP 18.2.9 approval docs say headless children run in `yolo` mode,
with parent task approval as the authorization boundary. Per-tool user policies remain
authoritative: `deny` blocks a tool, and an unsatisfiable headless `prompt` rejects
the call. Do not expect the parent's interactive approval prompts to reappear in
the child. No custom agent definition is required for this optional discussion.

The parent checks that findings cite the right files and code state, resolves
conflicting claims against requirements or an experiment, and accepts the final
result. “Child done” means a deliverable is available, not that the whole task is
accepted. Cross-increment dependencies, edit ownership and combined acceptance
belong to [section 7](07-planning-and-coordinating-larger-changes.md); this optional
read-only review is not a reason to split a tiny repair among writers.

### Completion questions

Can you show the original failing assertion, explain why retrying alone would not
repair it, and distinguish the real fix from the tempting partial fixes? Can you
show a mechanical check rejecting its intended fault, then explain why a green
mechanical check still permits wrong behavior? Another engineer must also be able
to locate preserved work, account for active operations and identify which evidence
belongs to the final candidate. If the app is unavailable, state that the diagnosis
was a prepared analysis and leave the live repair unclaimed.

### Sources and adaptation

- [OMP 18.2.9 keybindings](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/keybindings.md)
  and [session operations](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/session-operations-export-share-fork-resume.md):
  product controls, taught in section 3 and applied here during recovery.
- [OMP 18.2.9 approval modes](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)
  and [task tool](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/tools/task.md):
  effective policy, child context, isolation and headless approval limits.
- [Git diff `--check`](https://git-scm.com/docs/git-diff) and
  [Node `--check`](https://nodejs.org/api/cli.html#-c---check):
  conflict/whitespace detection and syntax checking, respectively.

The todo defect, alternative repairs, prompts, decision table and lab are
**course-authored examples**, not an OMP incident trace or a claimed live
provider-backed rehearsal. They adapt the historical lesson's troubleshooting,
preservation and delegation concepts without its profiles, preparation scripts
or checkpoint machinery. Expected observations are instructions to verify, not
fabricated run results. The optional [Google SRE troubleshooting chapter](https://sre.google/sre-book/effective-troubleshooting/)
provides broader background on hypotheses and useful evidence; it is not
required to run this lab.

[Previous: steering agents](05-steering-agents.md) · [Next: planning and coordinating larger changes](07-planning-and-coordinating-larger-changes.md) · [Back to alternative outline](../alternatives/eight-section-outline.md)
