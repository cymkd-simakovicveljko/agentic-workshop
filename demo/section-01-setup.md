# Section 1 — setup

## Understand

The intended `demo/todo-app` runs without OMP. Its recorded prerequisites are
Node.js 22.12 or later, npm and Git; browser checks also need Playwright's browser
installation. OMP plus an authorized provider are needed only for a live agent.

**Distribution blocker:** the canonical app is absent from this checkout. The
course records gitlink `6f79e772c11d2dd3431b445282f180e212d138f4`, but has no
recoverable app remote or `.gitmodules` entry. Obtain the original repository or
Git bundle containing `main`, `exercise/remaining-count` and
`solution/remaining-count` from the course maintainer. No download command can
honestly be supplied until that source exists. Do not initialize a replacement,
invent its history, or use the historical public app.

All app commands below are **conditional learner procedures**, not rehearsed
results. If the app is missing, skip to the no-app route. If only the provider is
missing, the prepared implementation route remains usable once the app is supplied.

`demo/todo-app` is a **standalone nested Git repository**. Its `main` branch is the
working add/complete/delete/localStorage baseline. `exercise/remaining-count`
starts from that behavior with a feature brief; it does not already display the
new remaining count. `solution/remaining-count` is a prepared implementation.
Start your own work branch rather than editing an exercise or solution branch.

Browser data is separate from Git. Changing branches does not erase tasks saved
for the same browser origin. Use disposable course tasks and keep the same Vite
URL when checking refresh persistence. A different port or browser profile may
have different saved tasks.

## Watch or try

### Prepare your work branch without losing work

**Terminal — from the course root:**

```sh
cd demo/todo-app
git rev-parse --show-toplevel
git status --short
git diff
git diff --cached
git ls-files --others --exclude-standard
```

The root printed by Git must be `demo/todo-app`, not the surrounding course
repository. If it is wrong or the exercise branch is absent, stop and obtain the
canonical standalone repository; do not create an empty replacement history.

If there are changes, inspect them before continuing. Commit only your intended
files on your own branch, or preserve the work with a stash:

```sh
git stash push -u -m "my work before section 1"
git stash list
git status --short
```

`-u` includes untracked files; plain `git stash` does not. Ignored files are not
included, so separately preserve any ignored files you care about. Do not use a
reset or cleanup command to remove inconvenient work. Record the branch and
stash entry you used. To restore later, return to that original branch, inspect
`git stash list`, and use `git stash apply` with the recorded entry. Keep the stash
until you have checked the restoration; do not blindly apply it to the solution.

**Terminal — once the working tree is clean:**

```sh
git switch -c my-remaining-count exercise/remaining-count
npm install
npx playwright install
npm test
npm run test:e2e
```

Use a fresh personal branch name if `my-remaining-count` already exists. These
are ordinary project commands, not course wrappers. Read a failure before
continuing: a missing browser installation or runtime requirement is a setup
problem, not a reason to weaken a test. Existing green tests do not prove the
not-yet-implemented count.

### Open the app

**Terminal A — inside `demo/todo-app`:**

```sh
npm run dev
```

Leave this foreground process running. Open the URL Vite prints; do not assume a
port if another server is already using it. Add two sample tasks, complete one,
refresh, then delete the sample tasks when you no longer need them. Confirm the
baseline works before the agent changes it. Stop Vite with `Ctrl+C` in this
terminal when finished; commands entered after `npm run dev` cannot run there
until the server stops. Use a second terminal for OMP and another for review.

### Prepare OMP access

Install OMP using the [18.2.9 installation reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install).
There is no custom course profile, helper or configuration file to install.
Follow your organization's provider policy; repository content and tool results
can become model context, so use only material permitted for that provider.

If first-run onboarding is needed, the official onboarding entry point is
**a terminal command**:

```sh
omp setup
```

This is separate from installing the todo app. You do not need optional OMP
features for this lesson. Do not put API keys, login callbacks or credentials in
a task prompt, repository file, classroom screenshot or completion note.

Before launch, compare your local surface with the teaching reference:

```sh
omp --version
omp --help
```

The source review observed `omp/18.2.9` and help text, not working authentication
or interactive controls. A different version needs its matching documentation;
do not update a managed installation just to match the course.

**Terminal B — inside `demo/todo-app`:**

```sh
omp --approval-mode always-ask
```

Inside OMP, use `/login` only if authorized authentication is still needed. It
opens the supported provider OAuth/key selector; complete credentials there,
not by sending them as an ordinary message. Being signed in to one provider does
not sign you in to another.

**OMP input — enter commands individually, not into your shell:**

```text
/login
```

```text
/model
```

```text
/hotkeys
```

Skip `/login` when already configured. Select an available authorized model and
record the provider/model identity; there is no mandatory model for this small
task. If no model is available, check the provider setup with the facilitator or
use the prepared route below rather than borrowing credentials.

`/hotkeys` shows active bindings, including remaps. `Ctrl+O` normally expands tool
output. `Escape` is the app-level interrupt, but a menu or Vim editing state can
consume it first; familiarize yourself with your active controls. Interrupting
is not an undo operation. Inspect files and still-running processes afterward.

### Keep minimum authority before the first edit

The launch flag uses `always-ask`, which normally permits reads and prompts for
writes/execution. Explicit policies still participate. Review each approval;
neither it nor an “only read” prompt is a sandbox. Keep production credentials
and unrelated private data out of the exercise. Section 1 explains the
[permission boundary](../sections/01-getting-started-with-omp.md#a-narrow-prompt-is-not-a-security-boundary);
section 3 owns the [control reference](../sections/03-working-with-omp.md).

Return to [section 1](../sections/01-getting-started-with-omp.md#3-start-omp-and-ask-it-to-look-first)
for the inspect-first prompt, implementation request and observation steps. You
should now have the app visible, OMP in the correct repository, a selected model
and a way to interrupt work.

### Prepared example when provider access is unavailable

You can still learn prediction, diff inspection and verification without a live
model. Stop the current agent turn and the Vite server before switching branches.
First review the reference without changing your working tree:

```sh
git diff exercise/remaining-count solution/remaining-count
```

Then preserve any current work using the earlier instructions. With a clean
working tree, create a separate personal branch for the prepared implementation:

```sh
git switch -c my-remaining-count-reference solution/remaining-count
npm install
npm test
npm run test:e2e
npm run dev
```

Use another branch name if needed. This assumes the earlier Playwright browser
installation succeeded; otherwise run `npx playwright install` before the e2e
check. Open the URL printed by this server and perform the lesson's browser
sequence, including deletion of both completed and unfinished tasks and refresh.

Call this a **prepared example** in your notes. The reference diff is real source
to inspect, and your checks produce real local evidence; neither is proof that an
agent performed this run. If provider access failed halfway through a live
attempt, preserve its partial changes and distinguish that attempt from the
prepared result. Do not narrate a saved solution as a successful live recovery.

### No-app route: predict and reject an incorrect count

This is a **prepared reasoning exercise**, not app execution. On paper, start with
`Read the brief` unfinished and `Review the diff` completed. Predict the count,
delete the completed task, complete the remaining task, then reload.

The expected counts are **1, 1, 0, 0**, assuming the saved state matches each
preceding action. A count derived from total rows would start at 2 and decrease
when the completed row is deleted; that is the plausible wrong implementation
your sequence rejects. Explain why a separate stored counter could drift from
restored tasks. Then annotate the prepared tool sequence in
[section 2's worksheet](section-02-agent-loop.md).

Record “reasoning completed; app and browser behavior unverified.” Do not copy
predicted values into a browser-result column. The live exit condition in section
1 remains blocked until the canonical app is available.

### Restart safely from the exercise branch

Restarting the conversation is not restarting the exercise. First interrupt the
agent and confirm the turn stopped; identify any remaining writers and wait or
stop only those you own. Stop the Vite server with `Ctrl+C` in its terminal.
Review staged, unstaged and untracked work using the commands at the top of this
companion. Preserve it with an intentional commit on your own branch or the
recorded stash route; keep ignored material separately if needed.

Only with a clean worktree, use a new personal branch:

```sh
git switch -c my-remaining-count-retry exercise/remaining-count
npm test
npm run test:e2e
npm run dev
```

This assumes dependencies and browsers were installed earlier; setup failures
still need diagnosis. Open the newly printed URL, not an old tab's guessed port.
Use a disposable browser profile or remove only course sample tasks through the
UI. A branch switch does not clear `localStorage`; record the starting tasks
before predicting counts. Start a new OMP conversation in the app directory
using [section 3's controls](../sections/03-working-with-omp.md), then supply the
accepted brief again. Do not apply an old stash over the clean retry unless you
intentionally want those changes back.

Success is a known starting branch, preserved prior work, one identified server
and understood browser data—not an empty conversation alone.

## Use at work

Before asking an agent to edit, establish the repository, preserve existing work,
confirm the program can run and decide which account may receive its context.
These checks prevent you from confusing setup trouble with a feature defect.

Afterward, review staged and unstaged diffs separately and open untracked files.
Record actual test outcomes and browser observations, not just the agent's
summary. Treat an unavailable provider as an unavailable dependency: preserve
state and use an explicitly labelled alternative, rather than inventing evidence
or weakening access policy.

## Go deeper

### Sources and adaptation

The branch route, prompts and todo-app checks are course-authored. This companion
uses ordinary npm and Git commands; it does not reinstate the historical lab
preparation machinery. It describes a learner procedure, not a provider-backed
rehearsal receipt.

Official OMP references for the controls and safety statements above:

- [Installation](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install)
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md)
  — `omp`, `omp setup`, version/help and `--approval-mode`.
- [Providers](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/providers.md)
  — provider-specific availability and `/login`.
- [README model selection](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md)
  — `/model`.
- [Approval mode](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)
  — defaults, policy precedence and containment limits.
- [Keybindings](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/keybindings.md)
  — `/hotkeys`, output expansion and interrupt behavior.

These references use the reviewed 18.2.9 commit. Source review, your local app
checks, a provider-backed run and a classroom rehearsal are separate evidence.

[Back to section 1](../sections/01-getting-started-with-omp.md)
