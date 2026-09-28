# 1. Getting started with OMP

**Main path:** make one visible change in a working app, watch what the agent
actually does, then decide whether to accept it. This is not a React lesson.

## Understand

### One small change, three things to distinguish

The course's canonical `demo/todo-app` exercise is a small app that adds, completes
and deletes tasks, saving them with `localStorage`. Our change is a visible count
of **unfinished** tasks. On `exercise/remaining-count`, that count is a requirement
to implement, not a feature you should already see.

**App prerequisite is currently missing.** This checkout records a Git link, but
does not supply the standalone repository or a recoverable source URL. Obtain the
canonical repository or bundle with its exercise and solution branches before
running the app route. Do not reconstruct it from this prose or substitute the
historical app. The [setup companion](../demo/section-01-setup.md) separates this
blocker from provider access and supplies a no-app reasoning route.

By the end, distinguish **what you requested**, **what happened on the computer**
and **what evidence supports accepting the result**. Those can disagree. An
agent can implement a plausible count that counts completed tasks too; tests can
pass without ever checking the new label; a correct change can be hidden by a
browser connected to a different development server.

| Term | Meaning in this lesson |
| --- | --- |
| OMP | The terminal application that gives the model context and executes its tool requests. |
| Model | The AI selected to interpret your task and propose a response or tool action. |
| Provider | The account/backend serving that model. Authentication is provider-specific. |
| Tool | An operation such as reading a file, applying an edit or running a command. |

The interesting moment is not just when code appears. A tool returns information,
and the model can use it to choose its next action. You supervise that loop. You
own the desired behavior, permission to use the environment and the final
acceptance decision; choosing a capable model does not transfer those duties.

### A narrow prompt is not a security boundary

“Inspect first” gives you a useful pause before implementation. “Only change the
count” limits the requested work. Neither instruction removes filesystem or
network permissions from a tool.

OMP 18.2.9 documentation says the default approval mode is `yolo`: ordinary
read, write and execution calls are allowed without a tier-based prompt. This
lesson instead launches with `--approval-mode always-ask`, which normally allows
reads and prompts for write/exec calls. Explicit tool and user policies also
participate, so **do not assume every action will ask you first**. An edit preview
or an agent's own “Accept” operation is not necessarily a human permission gate.

Approvals are not a sandbox. An approved command retains the shell's ambient
access; restricting shell patterns does not contain code executed by another
tool such as `eval`. Use the small course repository, no production credentials
or private data, and only a provider authorized for the material you send. Do not
approve an unexplained action merely to keep the demonstration moving.

## Watch or try

### 1. Start in the right repository

Complete the [setup companion](../demo/section-01-setup.md) for prerequisites,
provider setup, safe restart and the no-provider route. After obtaining the
canonical app, run its Git commands inside its **standalone nested repository**
at `demo/todo-app`, not the course root. Start independently from the exercise
branch; this lesson requires no earlier learner edits.

**Terminal A — from the course root:**

```sh
cd demo/todo-app
git rev-parse --show-toplevel
git status --short
```

The Git root must be the `todo-app` directory. If it is a parent directory, stop
and obtain the standalone app repository described in the course setup; do not
initialize a replacement history or improvise exercise branches.

If status shows work, preserve it on your own branch before switching. Review
tracked and new files; commit the intended files, or use the companion's stash
route, which includes untracked files. Do not reset or discard work to make this
lesson easier. With a clean working tree:

```sh
git switch -c my-remaining-count exercise/remaining-count
npm install
npx playwright install
npm test
npm run test:e2e
npm run dev
```

Choose another personal branch name if that name already exists. Open the URL
Vite prints and leave Terminal A running. The two test commands establish your
starting evidence; passing existing tests does not mean the missing count
exists. If setup fails, resolve that environment problem before asking the agent
to implement the feature. Do not ask it to bypass failing checks.

In the browser, try adding, completing and deleting a task, then refresh. The
baseline should preserve the remaining rows and their completion state. Browser
storage survives a Git branch switch: a non-empty list is not automatically a
fixture or an agent-created change. Use a separate browser profile for disposable
course data, or remove only the sample tasks you no longer need through the UI.
Do not clear unrelated browser storage.

### 2. Predict the new behavior

The rule is **the count equals the number of stored tasks whose completion state
is unfinished**. It is not the number of rows, not a fixed starting value and not
an independent counter that merely increments on clicks.

Before implementation, predict these cases:

- Two unfinished tasks and one completed task: what count should appear?
- Delete the completed task: should that count change?
- Mark an unfinished task complete, then mark it unfinished again: what changes?
- Refresh while unfinished tasks remain: should the count reset to zero?

An empty list implies zero. A browser with saved tasks does not. Keeping the
count derived from task state avoids a second value drifting out of sync after
deletions, toggles or loading saved data. Let the agent inspect the code before
you prescribe where that calculation belongs.

### 3. Start OMP and ask it to look first

**Terminal B — open another terminal in `demo/todo-app`:**

```sh
omp --approval-mode always-ask
```

**OMP input, not a shell command:**

```text
/model
```

Choose an available authorized model and note its provider/model identity. The
setup companion covers `/login` if needed and the minimum controls to interrupt.
Check active bindings before sending work. Section 3 is the teaching home for
[host and context controls](03-working-with-omp.md); an interrupt does not undo
changes already made.

**OMP input — first request:**

```text
Inspect this todo app and its tests. Explain where tasks are stored and updated,
and the smallest change needed to show the number of unfinished tasks. Read first;
do not edit or run commands yet. Point to the relevant files, then stop.
```

Watch for actual reads rather than accepting “I inspected the app” at face value.
Open the cited files yourself. Does the answer connect add, toggle, delete and
loading saved tasks? If it proposes a database, a new state library or a UI
rewrite, bring it back to the existing app. This pause catches a misunderstanding
before it becomes a larger diff; it is not a promise of technical read-only
isolation.

### 4. Give one bounded implementation request

**OMP input:**

```text
Add a visible count of unfinished tasks, derived from the current task list.
An empty list shows 0; saved unfinished tasks count immediately after refresh.
Adding increases it, completing decreases it, reopening increases it, deleting
an unfinished task decreases it, and deleting a completed task leaves it unchanged.
Keep existing task behavior. No dependencies or unrelated refactors.
Add focused checks using the existing tests, then run npm test and npm run test:e2e.
If blocked or a wider change is needed, stop and explain. Report changed files,
actual check results and what remains for me to verify in the browser. Do not commit.
```

This prompt supplies an outcome, boundary and check without dictating every edit.
“Add a counter” alone leaves deletion and refresh ambiguous. Naming a single
source file before inspection can be too narrow if the visible behavior and its
checks live in different files. Keep scope tied to the behavior, not an arbitrary
line limit.

### 5. Observe decisions, not a scripted performance

| Event | Inspect | What it establishes |
| --- | --- | --- |
| Read/search | The returned content and file paths. | What the agent actually obtained, rather than what it guessed. |
| Approval, when shown | The exact path, command, arguments and reason. | What you are authorizing, not whether it is correct. |
| Applied edit | The actual change and surrounding code. | Whether it uses current task state and preserves existing behavior. |
| Test execution | The command, working directory, output and exit result. | Which checks ran and whether they passed, failed or could not start. |

Find one result that influenced the next action. A missing browser executable is
an environment failure, not evidence that count logic is broken. A failed count
assertion is behavior evidence to investigate, not a reason to delete the check.
A first attempt may simply pass; there is no need to manufacture a failure or
expect a fixed trace.

If the agent drifts into unrelated changes, interrupt it, inspect what has already
changed and restate the remaining task. If it repeats a failing approach without
new evidence, ask for the failing output and diagnosis before another edit.
Stopping is not rollback, and a final “done” message is not verification.

### 6. Review tracked changes, new files and real behavior

**Terminal C — in the same `demo/todo-app` repository, after the agent stops:**

```sh
git status --short
git diff
git diff --cached
git ls-files --others --exclude-standard
npm test
npm run test:e2e
```

`git diff` shows unstaged tracked changes. `git diff --cached` shows staged
changes. Neither displays the contents of untracked files: use the last Git
command to list them, then open each relevant file in your editor. `git status`
shows the overall state, including unexpected new files. Ignored files are not
covered by this review; do not assume an empty diff inventories everything a tool
could have touched.

Read how the count is calculated. Does it inspect completion state, or only use
the total list length? Is a second stored counter unnecessary? Are existing checks
weakened to get green output? Explain any package or configuration changes rather
than accepting them as incidental. Compare your actual output with the agent's
report, not with an expected test-count total.

Now use the browser at the same Vite URL. For this sequence, start with only
disposable course tasks and an empty list; record any different starting state.
The numbers below are **predicted acceptance results**, not a recorded live run.

| Action | Expected count and visible behavior |
| --- | --- |
| Open an empty list | 0 unfinished. |
| Add `Read the brief`, then `Review the diff` | 2 unfinished; both rows visible. |
| Complete `Read the brief` | 1 unfinished; completed row remains visible. |
| Refresh this same URL | Still 1; both tasks and completion state survive. |
| Reopen `Read the brief` | 2 unfinished. |
| Complete it again, then delete that completed row | Still 1 after deletion. |
| Delete unfinished `Review the diff` | 0; no tasks remain. |
| Refresh again | Still 0 and no tasks. |

Use the keyboard to reach the input, checkbox and delete button as well. This is
a small interaction check, not a complete accessibility audit. Unit checks can
prove data behavior without proving the label updates; browser automation proves
only the scenarios it actually covers. Your own browser inspection confirms the
served UI, wording and interactions you just exercised.

If tests pass but the screen disagrees, do not accept the feature. Check the URL,
running server directory, current branch and saved task state; reload, then
investigate the specific mismatch. Only after reviewing your own work, inspect
the prepared implementation without changing branches:

```sh
git diff exercise/remaining-count solution/remaining-count
```

That is a reference diff, not evidence that your worktree passes. If provider
access fails but the canonical app is available, the
[prepared route](../demo/section-01-setup.md#prepared-example-when-provider-access-is-unavailable)
lets you inspect and run the reference. If the app itself is absent, only the
labelled reasoning route is available. Neither is live agent output.

## Use at work

Transfer the shape, not the todo wording. “Show open incidents” is ambiguous;
“show incidents whose status is open, update after a status change and after
reload, preserve the existing list” gives the agent something you can judge.
Inspect first when the relevant state or constraints are uncertain. Once those
are clear, a short implementation request is more useful than a long ceremony.

Use the same three evidence questions on a real task:

1. **What did I authorize?** Identify the behavior and the systems the agent may
   touch. A local UI change does not authorize a production migration.
2. **What actually happened?** Inspect tool results and the full change set,
   including new and staged files. Do not rely on the final summary alone.
3. **Why accept it?** Connect a concrete example to the checks and manual behavior
   you observed. Say what remains unverified rather than upgrading an assumption
   into evidence.

Keep a short note outside the app's source files: your request, changed behavior,
one tool result you inspected, checks and actual results, and **accept / needs
another change / unable to verify** with a reason. For a prepared-example route,
say so explicitly. In pairs, one person can operate while the other predicts and
watches scope; swap for review.

Before moving on, explain why deleting a completed task does not reduce the
remaining count, why refresh is a separate check, and what you would do if the
agent reported success while the browser contradicted it. Those answers matter
more than remembering an OMP shortcut.

## Go deeper

### Sources and adaptation

This todo example, prompts, acceptance sequence and review guidance are
course-authored. They adapt the earlier lesson's inspect–change–observe–review
teaching pattern, not its old application or custom setup machinery. No transcript
or expected result above claims that a provider-backed run happened.

OMP product facts are grounded in the reviewed **18.2.9** source revision, not a
claim about every installation:

- [Introduction and installation](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install) —
  terminal entry point, models and tool capabilities. Use the official installer
  appropriate to your platform; the app itself does not require OMP.
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md)
  — the interactive launch and `--approval-mode always-ask` override.
- [Providers](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/providers.md) —
  provider/model distinction, availability and `/login`. Credentials belong in
  the supported authentication flow, not prompts, screenshots or course files.
- [Tool approval mode](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)
  — mode defaults, explicit policies and the limits of approval as protection.
- [Keybindings](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/keybindings.md) —
  active bindings and Escape behavior, including the Vim-mode caveat.
- [Course source review](../research/2026-09-22-omp-course-source-review.md)
  records version/help evidence separately from unperformed provider and classroom
  checks. Check `omp --version` and `omp --help` against the teaching version.

Read the [setup companion](../demo/section-01-setup.md) for the executable route
and [Vitest guide](https://vitest.dev/guide/) if the unit-test structure is new to
you. Section 2 explains the run; section 3 teaches host operation; section 4
develops the full bounded workflow without making every small change a planning
project.

[Next: How agents work](02-agentic-engineering-foundations.md) · [Back to alternative outline](../alternatives/eight-section-outline.md)
