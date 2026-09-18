# Section 1 — setup

## Understand

The [todo app](todo-app/README.md) runs without OMP. It needs Node.js 22.12 or
later, npm and Git; browser checks also need Playwright's browser installation.
OMP plus an authorized provider are needed only for the live agent route.

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

Install OMP using the [official platform instructions](https://github.com/can1357/oh-my-pi#install).
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

### Know what the approval setting does

The official approval modes are:

| Mode | Ordinary tier-based behavior, before explicit policies |
| --- | --- |
| `always-ask` | Reads allowed; writes and execution prompt. |
| `write` | Reads and writes allowed; execution prompts. |
| `yolo` (default) | Reads, writes and execution allowed without tier-based prompts. |

Our launch flag overrides the mode for this session without creating a custom
profile. Explicit user/tool policies affect individual calls, so it is not a
promise that every edit or command waits for your confirmation. Review the exact
operation whenever an approval appears; reject unexplained scope expansion.

This is **not process or filesystem containment**. An approved shell command has
ambient filesystem, network and subprocess access. The official docs also warn
that shell-pattern restrictions do not cover the same command executed through
`eval`. A request to “only read” is an instruction, not a technical permission
boundary. Keep production secrets and unrelated data out of the exercise, and do
not approve broader access to solve a classroom setup problem.

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

- [Installation](https://github.com/can1357/oh-my-pi#install)
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md)
  — `omp`, `omp setup` and `--approval-mode`.
- [Providers](https://github.com/can1357/oh-my-pi/blob/main/docs/providers.md)
  — provider-specific availability and `/login`.
- [README model selection](https://github.com/can1357/oh-my-pi)
  — `/model`.
- [Approval mode](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md)
  — defaults, policy precedence and containment limits.
- [Keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md)
  — `/hotkeys`, output expansion and interrupt behavior.

[Back to section 1](../sections/01-getting-started-with-omp.md)
