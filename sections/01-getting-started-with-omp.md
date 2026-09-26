# 1. Getting started with OMP

**Goal:** install OMP, learn how a session works, make one visible change in a
working app, and decide on evidence, not on the agent's summary, whether to
accept it. This is not a React lesson.

**You'll leave able to:** connect your subscriptions and pick models for each
job, start and resume a session, read what the agent is
doing, steer or stop it, control what it may do without asking, write a bounded
request, and review the result yourself.

## Understand

### What OMP is

OMP is a terminal-first coding agent. You start it inside a project, describe
an outcome in ordinary language, and it can search the code, edit files, run
commands and explain what it did, all in one saved session. It uses the model
provider you choose; it isn't tied to one vendor.

Two facts matter from the first minute:

- **It acts on your real machine.** Edits land in your working tree as it goes
(never committed unless you ask), and commands run with your user account's
access.
- **Your prompts and the context it gathers go to the provider.** File contents,
command output and your messages become model input. Only use code and data
you're allowed to send to that provider.



### The agent loop

```text
 you: request ──▶ model decides ──▶ tool call (read / edit / run) ──▶ result
                       ▲                                              │
                       └──────────── result becomes new context ◀─────┘
                                  ... until it answers and stops
```

The model never touches your files directly. It *asks* OMP to run a tool; OMP
runs it (or asks you first) and hands the result back. The model uses that
result to choose its next step. That's why the same request can take different
paths on different runs, and why you watch the **tool results**, not just the
final message.

You supervise that loop. You own the desired behavior, what the agent may touch,
and the final accept decision. A better model doesn't take those over.

### Vocabulary


| Term         | Meaning                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| Provider     | The account serving models (Anthropic, OpenAI, a gateway, a local model…). You sign in per provider. |
| Model        | The AI that reads your request and chooses the next response or tool call.                           |
| Role         | A named job (`default`, `smol`, `slow`, `plan`, `advisor`) that points at a model you choose.        |
| Profile      | A separate set of logins, sessions and settings, e.g. one for work and one for personal use.         |
| Tool         | One capability: read, search, edit, run a shell command, open a browser.                             |
| Tool card    | How each tool call appears on screen: what ran, its status and result.                               |
| Turn         | One run of the loop, from your message until the agent yields.                                       |
| Session      | The saved conversation for a project. Resumable after you exit.                                      |
| Context      | Everything the model sees this turn: instructions, your messages, tool results. It's finite.         |
| Context file | A Markdown file such as `AGENTS.md` that OMP loads automatically as standing instructions.           |




### The screen


| Region          | What it shows                                                          | Why you care                                                                   |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Transcript**  | Your messages, the agent's replies and tool cards.                     | The audit trail: what was read, changed and run.                               |
| **Composer**    | The box where you type the next message.                               | Pickers and questions open here too.                                           |
| **Status line** | Model, thinking level, mode, directory, Git branch, context use, cost. | Check it before assuming the agent is in the right place with the right model. |




### Writing a request the agent can meet

A good request has three parts: an **outcome**, **boundaries**, and a **check**.


| Weak                  | Better                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| "Add a counter."      | "Show how many tasks are unfinished. It must stay correct after add, complete, delete and refresh." |
| "Fix the tests."      | "The login test fails with a timeout. Find the root cause; don't change the test's assertions."     |
| "Clean up this file." | "Rename `x` to `taskCount` in `App.jsx` only. Run `npm test`."                                      |


Useful phrases: *"Investigate, but don't edit"* when you want an explanation
first. *"Don't commit"* to keep Git history in your hands. *"If you need a
wider change, stop and explain"* to catch scope creep early. For large or risky
work, `/plan` gives you a read-only planning turn to review first; you won't
need it for today's small change.

### A narrow prompt is not a security boundary

"Read first" and "only change the count" limit the *request*. They don't remove
the agent's ability to write files or run commands. That's the job of the
**approval mode**:


| Mode                      | Runs without asking       | Asks first                           |
| ------------------------- | ------------------------- | ------------------------------------ |
| `yolo` (built-in default) | Reads, edits and commands | Nothing based on tier alone          |
| `write`                   | Reads and file edits      | Commands, browser control, subagents |
| `always-ask`              | Reads                     | Edits and commands                   |


The default is `yolo`, so a fresh install asks for almost nothing. This lesson
launches with `--approval-mode always-ask` so you see every edit and command
before it runs. Per-tool policies can still change what prompts, so don't
assume every action will ask.

An approved command runs with your full user access: **approvals are not a
sandbox.** Approval means "I authorize this call," not "this is correct." Use
only the course repo, no production credentials or private data, and never
approve an action you can't explain just to keep things moving.

### Three questions you'll answer at the end

1. **What did I ask for?** A count of unfinished tasks, correct after every change.
2. **What actually happened?** The files read, edits applied, commands run.
3. **Why accept it?** Checks and browser behavior you saw yourself.

These can disagree. An agent can count completed tasks too; tests can pass
without checking the new label; the browser can be showing a different dev
server. Each is a real way for "done" to be wrong.

## Watch or try

**Part A** sets OMP up once: install, subscriptions and models. **Part B**
teaches the controls without changing any code. **Part C** is the exercise.
From Part B on, use three terminals, all in `demo/todo-app`: **A** runs the
app, **B** runs OMP, **C** is for your own review.

### Part A — Set up OMP (once)



#### 1. Install

The official instructions are in the [Quickstart](https://omp.sh/docs/quickstart).
Pick your platform:

**macOS**

```sh
brew install can1357/tap/omp          # Homebrew
# or
curl -fsSL https://omp.sh/install | sh
```

Use a modern terminal: [Ghostty](https://ghostty.org),
[iTerm2](https://iterm2.com), [WezTerm](https://wezterm.org) or
[Kitty](https://sw.kovidgoyal.net/kitty/). OMP uses the Kitty keyboard
protocol for key combinations. The built-in Terminal.app works, but keys such
as `Shift+Enter` may not register there (use `Ctrl+J` instead).

**Windows: use WSL2**

OMP does run natively on Windows
(`irm https://omp.sh/install.ps1 | iex` in PowerShell). This course still
recommends **WSL2 with Ubuntu, opened in Windows Terminal**, because every
command in the course (Git, npm, Playwright, shell scripts) assumes a Linux or
macOS shell. With WSL you follow the same instructions as everyone else.

1. In an admin PowerShell: `wsl --install`, then restart and open *Ubuntu*.
2. Inside Ubuntu, install Git and Node, then OMP with the Linux command below.
3. Keep your repos in the Linux home folder (`~/code/...`), not under
  `/mnt/c/...`. Files on the Windows drive are much slower from WSL.
4. For the exercise, install Playwright's browsers with
  `npx playwright install --with-deps`.

If a browser sign-in can't reach back into WSL, choose the device-code or
paste-code option OMP offers.

**Linux (and inside WSL)**

```sh
curl -fsSL https://omp.sh/install | sh
```

**Check it worked:**

```sh
omp --version
```

If `omp` isn't found, follow the PATH hint the installer printed and open a new
terminal.

#### 2. Connect your subscriptions

This is where OMP shines. It isn't tied to one vendor: it can use the coding
subscriptions you already pay for (ChatGPT Plus/Pro, Claude Pro/Max, GitHub
Copilot, Cursor, Gemini and more), plus API keys, company gateways and local
models, all from the same tool.

**Sign in.** The first time you run `omp`, a setup wizard asks you to sign in
and pick a default model. Afterwards, sign in from inside OMP at any time:

```text
/login                  # choose from the list
/login openai-codex     # or go straight to one provider
```

Follow the browser prompt. Paste keys and login codes only into that prompt,
never into a chat message, a repo file or a screenshot.

**Subscription and API are different providers.** This is the most common
setup mistake:


| You pay for               | Provider ID         | Not this       |
| ------------------------- | ------------------- | -------------- |
| ChatGPT Plus / Pro        | `openai-codex`      | `openai` (API) |
| Claude Pro / Max          | `anthropic` (login) | —              |
| GitHub Copilot            | `github-copilot`    | —              |
| Gemini via Google account | `google-gemini-cli` | `google` (API) |
| SuperGrok / X Premium+    | `xai-oauth`         | `xai` (API)    |


Check what you can use after signing in:

```sh
omp models                  # every model available to you right now
omp models openai-codex     # just one provider
```

**Use several subscriptions.** Sign in to as many providers as you like. You
can then put different models on different jobs (step 3), and spread work
across plans instead of burning through one.

**Rotate accounts on one provider.** Run `/login <provider>` again to add a
second account or workspace. OMP keeps both and can rotate between them. To
have it switch *before* you hit a limit, turn on usage-aware fallback:

```yaml
# ~/.omp/agent/config.yml
retry:
  usageAwareFallback: true     # move to the next account, then fallback models
  usageReservePolicy: confirm  # ask before switching (or: auto)
```

This works for coding plans that report their quota. Check your remaining
limits any time with `omp usage`.

**Keep work and personal apart.** A profile has its own logins, sessions and
settings:

```sh
omp --profile work --alias omp-work   # creates an `omp-work` shortcut
```

**Good to know:**

- A stored login beats an exported key, so `export ANTHROPIC_API_KEY=...` won't
override a login. Use `/logout <provider>` to remove one account.
- Logins are stored in `~/.omp/agent/agent.db`, which is **not encrypted**.
Protect that folder like your SSH keys.
- No provider access? The
[setup companion](../demo/section-01-setup.md#prepare-omp-access) covers
that route.



#### 3. Choose models and roles

You don't pick a model for every request. Instead, OMP has **roles**: named
jobs that each point at a model. Features use their role automatically.

**How OMP moves between roles.** Your conversation runs on one active model,
normally `default`. It only changes when something asks for a different job:

- **You switch it:** `Ctrl+P` cycles through `smol`, `default` and `slow`;
`/switch` picks any model. The next turn uses the new model.
- **You enter plan mode:** `/plan` runs on the `plan` model.
- **Background chores** go to cheap roles without touching your conversation:
session titles to `tiny`/`smol`, commit messages to `commit`.
- **Subagents** run on `task` (or the role their agent asks for).
- **The advisor** runs *alongside* the main model, on its own role.
- **Quota runs out:** a fallback chain (below) moves to the next model and
returns when the limit resets.

The status line always shows the active model, so check it after any switch.


| Role      | What it does                                          | Rule of thumb for choosing                                                                        |
| --------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `default` | Your main model: everything you type in a session.    | The best coding model your subscription covers comfortably. Thinking `medium` or `high`.          |
| `smol`    | Fast, cheap utility work (titles, lookups, handoffs). | The cheapest fast model you have. Thinking `off`. Speed matters more than depth.                  |
| `slow`    | Hard reasoning and review, where waiting is fine.     | The strongest reasoning model you can access, thinking `high`. Used rarely, so cost matters less. |
| `plan`    | Plan mode (`/plan`).                                  | Same as `slow`. A bad plan wastes more than a slow one.                                           |
| `advisor` | An independent reviewer watching the main agent.      | A strong model from a *different vendor* than `default`, so it doesn't share its blind spots.     |


The other roles cover specific jobs:

- `vision`**:** reading images, such as a screenshot of a broken UI. Set it
only if your `default` model can't read images.
- `commit`**:** writing commit messages. Point it at a cheap model; it's a
small, frequent job.
- `task`**:** subagents that OMP spins up for delegated work, like auditing
several folders in parallel. A cheaper model here keeps parallel work
affordable.
- `designer`**:** the designer subagent for UI and visual work. Use a model
that's good at frontend design.

**You don't have to configure anything.** Unassigned roles are filled
automatically from the models you're signed in to; `smol` and `slow` may just
reuse `default`. Pin a role when you want predictable cost or quality.

**Set roles in the app:** `/model` (or `Alt+M`) → *Roles* → pick a role →
pick a model and thinking level. That saves it for future sessions.

**Or in YAML**, which is handy for setting several at once:

```yaml
# ~/.omp/agent/config.yml
modelRoles:
  default: anthropic/claude-sonnet-4-6
  smol: anthropic/claude-haiku-4-5
  slow: openai-codex/gpt-5.5:high      # ":high" sets the thinking level
  plan: anthropic/claude-opus-4-6:high
```

These IDs are examples. Copy real ones from `omp models find sonnet` (or
whatever you're looking for). Mixing providers across roles, as above, is how
you use several subscriptions at once.

**Switch while you work:**


| Control                     | Effect                                            |
| --------------------------- | ------------------------------------------------- |
| `/model` or `Alt+M`         | Change models and roles; saved for next time.     |
| `/switch` or `Alt+P`        | Change the model for this session only.           |
| `Ctrl+P`                    | Cycle `smol` → `default` → `slow` in the session. |
| `omp --model ...` at launch | Use a model for this run without saving it.       |


**The advisor** is a second model that reviews the main agent's work as it
goes, and flags missed requirements, risky code or weak checks. It's off by
default. It costs extra and sends your session to its provider too, so save it
for long or high-stakes work:

```text
/advisor on        # this session only
/advisor status    # which model, how much it has cost
```

To keep it on, set `advisor.enabled: true` in your config. Put reviewer-only
priorities in a `WATCHDOG.md` file in your repo. More in the
[Advisor docs](https://omp.sh/docs/advisor).

**When a model runs out of quota**, a fallback chain lets OMP move on instead
of stopping:

```yaml
retry:
  fallbackChains:
    default:
      - openai-codex/gpt-5.5
      - anthropic/claude-sonnet-4-6
```



#### 4. Worth knowing before you start

- **Out of the box, OMP runs edits and commands without asking** (`yolo`
mode). This lesson turns that off; see
[A narrow prompt is not a security boundary](#a-narrow-prompt-is-not-a-security-boundary).
- **Thinking level** defaults to `high`. `Shift+Tab` lowers it for quick
questions; more thinking is slower and costs more.
- **Watch cost:** the status line shows what the session has cost, and
`omp usage` shows how much of your plan is left.
- **Every setting** is searchable in `/settings`.



### Part B — OMP basics



#### 5. Get the app and open OMP in it

`demo/todo-app` is its **own Git repository** (branches `main`, `exercise/`*,
`solution/*`), separate from the course repo. If your copy of the course doesn't
include it, get it from the course maintainer; don't recreate it.

**Terminal B:**

```sh
cd demo/todo-app
git rev-parse --show-toplevel   # must end in /todo-app
omp --approval-mode always-ask
```

The directory you launch from becomes the session's project root. Read the
status line: right model, right directory, `main` branch.

#### 6. Warm-up: learn the controls on a read-only question

Try each of these. Nothing here changes code.

**Ask a question and read the tool cards:**

```text
In two sentences, what does this app do and where is task data saved?
```

Each file the agent reads appears as a card. Press `Ctrl+O` to expand one and
see the actual content it got back. That's what the answer is based on.

**Point at a file with** `@`**:** type `@` and start typing `tasks` to fuzzy-pick
`src/tasks.js`, then add a question:

```text
@src/tasks.js Which function would I change to stop blank tasks being added?
```

**Run a command yourself with** `!`**:**

```text
! git status
```

The output shows in the transcript and is shared with the model. Use `!!`
instead to keep the output out of the model's context. Either way it runs with
your permissions immediately; no approval is involved.

**Check which instruction files loaded:** enter `/extensions` and open
*Context Files*. OMP loads `AGENTS.md`-style files automatically, and in a repo
nested inside other folders it may also pick up files from parent directories.
If you see an instruction file you don't recognize, such as one from a parent
course folder describing a different app, note it: the agent is following those
instructions too. `Esc` closes the panel.

**Look around:** `/tools` lists what the agent can use, `/context` shows how the
context budget is being spent, and `/hotkeys` shows your key bindings. Typing
`/` alone opens autocomplete for every command.

**Interrupt and continue:** send a request that takes a while, such as
`Summarize every file in src/ one by one.`, and press `Esc` mid-way. The turn
stops. Send `.` (or `c`) to let it carry on, or type a correction instead.

**Exit and come back:**

```text
/exit
```

```sh
omp -c --approval-mode always-ask
```

`-c` reopens the most recent session in this directory with its history. `omp -r` lets you pick from earlier ones. Sessions save automatically and live under
`~/.omp/agent/sessions/`; they can contain code and command output, so treat
them like source code. Start a clean session for Part C with `/new`.

#### Everyday controls

Keep this page open for your first few sessions. `/hotkeys` shows the keys in
your terminal, and typing `/` lists every command.

**Write and send**


| Key / input                  | What it does                                                   |
| ---------------------------- | -------------------------------------------------------------- |
| `Enter`                      | Send.                                                          |
| `Shift+Enter` or `Ctrl+J`    | New line without sending.                                      |
| `@path`                      | Attach a file to your message.                                 |
| `! cmd` / `!! cmd`           | Run a shell command yourself, with / without sharing the output. |
| `Ctrl+R`                     | Search your prompt history.                                    |


**Steer a running turn**


| Key / input   | What it does                                                                          |
| ------------- | ------------------------------------------------------------------------------------- |
| `Enter`       | While the agent works, sends a correction into the current turn ("don't touch the tests"). |
| `Ctrl+Q`      | Queue a follow-up for after the turn finishes.                                        |
| `Esc`         | Interrupt the turn (or close a menu). **Doesn't undo** edits already applied.         |
| `.` or `c`    | Continue after an interrupt.                                                          |
| `/retry`      | Retry the last failed turn.                                                           |
| `Ctrl+O`      | Expand or collapse a tool card's output or diff.                                      |


**Manage context**

The model sees a limited window. Long sessions get slower, pricier and more
confused, so keep the context clean.


| Command            | Use it when                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `/context`         | You want to see what's filling the window.                                  |
| `/btw <question>`  | You have a quick side question that shouldn't clutter the conversation.     |
| `/handoff [focus]` | You're switching phases or coming back after a break: it replaces old history with a brief of goal, decisions and next steps. |
| `/compact [focus]` | You just need room: it summarizes older history in place.                   |
| `/new`             | The task is done. Start fresh; the old session stays saved.                 |


OMP also compacts automatically as the window fills. `/handoff` and `/compact`
keep the same session; use `/new` when you want a truly clean start.

**Sessions**


| Command               | What it does                                             |
| --------------------- | -------------------------------------------------------- |
| `omp -c`              | Reopen the most recent session in this directory.        |
| `omp -r` or `/resume` | Pick an earlier session.                                 |
| `/branch` / `/tree`   | Branch from an earlier message to try another direction; `/tree` switches between branches. |
| `/rename <title>`     | Name the session so you can find it later.               |
| `Ctrl+D` or `/exit`   | Exit. Everything is saved.                               |


**Models and modes**


| Key / command            | What it does                                                        |
| ------------------------ | ------------------------------------------------------------------- |
| `Ctrl+P`                 | Cycle role models (`smol` → `default` → `slow`).                    |
| `/switch` or `Alt+P`     | Change the model for this session only.                             |
| `/model` or `Alt+M`      | Change models and roles, saved for next time.                       |
| `Shift+Tab`              | Change thinking effort.                                             |
| `/plan [task]`           | Read-only planning: OMP investigates and drafts a plan you approve before any edit. |
| `/goal <objective>`      | Let OMP keep working across turns until a clear, checkable goal is met. Set `/goal budget <tokens>`. |
| `/usage`                 | See how much of your plan's limits you've used.                     |


Use `/plan` for risky or multi-file changes and `/goal` only for large work
with a clear finish line (for example "all importer tests and typecheck
pass"). Neither replaces your review. You won't need them for today's
exercise.




### Part C — the exercise



#### 7. Start the app on the exercise branch

**Terminal A:**

```sh
cd demo/todo-app
git status --short              # must be empty; otherwise commit or stash first
git switch -c my-remaining-count exercise/remaining-count
cat EXERCISE.md
npm install
npx playwright install
npm test && npm run test:e2e
npm run dev
```

`EXERCISE.md` is the brief. Green tests here are your **baseline**: they prove
the existing behavior works, not that the count exists. If setup fails, fix the
environment before involving the agent, and never ask it to bypass a failing
check. The companion has a
[safe stash route](../demo/section-01-setup.md#prepare-your-work-branch-without-losing-work)
if you have uncommitted work.

Open the URL Vite prints and leave Terminal A running. Add a task, complete it,
delete it, refresh. Saved tasks live in the browser, not Git, so they survive
branch switches; a non-empty list isn't necessarily the agent's doing. Use a
separate browser profile if you want a clean slate.

#### 8. Predict before you prompt

**Rule:** the count is the number of tasks whose `done` is false. It isn't the
number of rows, and it isn't a separate counter bumped on clicks.

Write down your answers:

- Two unfinished and one completed task: what count?
- Delete the completed one: does the count change?
- Complete a task, then reopen it?
- Refresh with unfinished tasks saved: does it reset to zero?

Deriving the count from the task list keeps it correct after deletes, toggles
and reloads. A second stored number would drift out of sync. Predictions give
you something to check the agent against instead of accepting whatever appears.

#### 9. Ask it to look first

In Terminal B (after `/new`), confirm the status line now shows your
`my-remaining-count` branch, then send:

```text
Read EXERCISE.md, the app and its tests. Where are tasks stored and updated,
and what's the smallest change to show how many tasks are unfinished? Don't
edit or run anything yet.
```

Expand the read cards and open the cited files yourself. Does the answer cover
add, toggle, delete *and* loading saved tasks? If it proposes a new library, a
database or a rewrite, pull it back. This pause catches a misunderstanding
before it becomes a diff; it isn't a technical read-only mode.

#### 10. Ask for the change

```text
Add a visible count of unfinished tasks, derived from the task list. It must
stay correct after add, complete, reopen, delete and refresh. No new
dependencies or refactors. Add focused tests, run npm test and npm run test:e2e,
and report what changed. Don't commit.
```

Outcome, boundary, check, without dictating the edit. Because you're in
`always-ask`, each edit and command pauses with an approval prompt showing the
path, diff or command. Read it, then approve or deny. Denying isn't failure:
tell the agent why and it will adjust.

#### 11. Watch the loop, not the script


| You see             | Check                           | It tells you                                                      |
| ------------------- | ------------------------------- | ----------------------------------------------------------------- |
| Read or search card | Paths and returned content      | What the agent actually knows, versus what it guessed             |
| Approval prompt     | Exact path, diff or command     | What you're authorizing                                           |
| Edit card           | The diff and the code around it | Whether it uses task state and keeps existing behavior            |
| Test card           | Command, output and exit status | Which checks ran and whether they passed, failed or never started |


Find **one result that changed the agent's next move**, such as a failing test
it then fixed. A missing Playwright browser is an environment problem, not a
logic bug. A failing count assertion is evidence to investigate, not a reason
to delete the test. A clean first pass is fine; don't manufacture a failure.

When to step in:

- **It drifts** (touching unrelated files): press `Enter` with a correction, or
`Esc`, check what already changed, then restate the task.
- **It repeats a failing approach:** ask for the exact error and a diagnosis
before any further edit.
- **It says "done":** that's a claim, not verification. Go to step 12.



#### 12. Review it yourself

Ask for a walkthrough without more edits:

```text
Show me the diff and explain each changed file. Don't make more changes.
```

Then check independently in **Terminal C:**

```sh
cd demo/todo-app
git status --short
git diff
git diff --cached
git ls-files --others --exclude-standard
npm test && npm run test:e2e
```

`git diff` misses staged changes (`--cached` shows those) and never shows new
files; the last command lists those so you can open them. Now read the code:

- Does the count check `done`, or just use the list length?
- Is there a second stored counter that could drift?
- Did any existing test get weakened or deleted?
- Any unexplained package or config change?

**Browser check** at the same Vite URL, starting from an empty list. These are
the expected results, not a recorded run:


| Action                                       | Expected                           |
| -------------------------------------------- | ---------------------------------- |
| Empty list                                   | 0                                  |
| Add `Read the brief`, then `Review the diff` | 2                                  |
| Complete `Read the brief`                    | 1; the completed row stays visible |
| Refresh                                      | Still 1, completion state kept     |
| Reopen `Read the brief`                      | 2                                  |
| Complete it again, then delete it            | 1                                  |
| Delete `Review the diff`                     | 0                                  |
| Refresh                                      | Still 0, no tasks                  |


Repeat a couple of steps with only the keyboard. If tests pass but the screen
disagrees, **don't accept**: check the URL, the branch, the running server's
directory and saved tasks, then investigate.

After your own review, compare with the reference:

```sh
git diff exercise/remaining-count solution/remaining-count
```

That's a reference, not proof your version works. No provider access? The
companion's
[prepared route](../demo/section-01-setup.md#prepared-example-when-provider-access-is-unavailable)
walks through the reference implementation instead.

#### 13. Accept, ask again, or start over

- **Accept:** commit it yourself (`git add` the files you reviewed, then
`git commit`). You're the one vouching for it.
- **Needs another change:** say exactly what's wrong in the same session:
"Deleting a completed task changes the count; it shouldn't. Fix that and add
a test for it."
- **Start over:** OMP has no undo button, and `Esc` or `/new` doesn't revert
files. Git is your undo. Follow the companion's
[safe restart](../demo/section-01-setup.md#restart-safely-from-the-exercise-branch)
to preserve or discard work deliberately, then begin on a fresh branch.



### When something goes wrong


| What you see                             | Do this                                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------- |
| `omp: command not found`                 | Follow the installer's PATH hint; open a new terminal.                                  |
| No models to choose                      | `/login` for your provider, or check the exported API key in *this* terminal.           |
| Your subscription's models aren't listed | Wrong provider ID (e.g. `openai` instead of `openai-codex`). Then `omp models refresh`. |
| The wrong account or key is used         | A stored login beats an exported key. `/logout <provider>` removes one account.         |
| You hit a usage limit                    | `omp usage`; add a second account or a fallback chain (Part A, steps 2–3).              |
| Keys move a list instead of typing       | A menu has focus. Read its footer or press `Esc`.                                       |
| You stopped a good turn by accident      | Send `.` to continue.                                                                   |
| A response failed                        | Read the error card; `Alt+R` retries, or change model with `/model`.                    |
| Output or diff looks cut off             | `Ctrl+O` to expand the card.                                                            |
| Screen garbled after resize              | `Alt+L` repaints.                                                                       |
| Agent inspects but won't edit            | Check the status line for Plan mode and look for a pending approval prompt.             |
| Terminal closed                          | Return to the project directory and run `omp -c`.                                       |
| Tests fail before you asked for anything | Environment problem. Fix setup first; don't hand it to the agent to "make green".       |




## Use at work

**Start with your own repo.** Pick a small, well-understood change with a clear
check, not your hardest problem. First session: ask it to explain the code
before asking it to change anything.

**Give it standing instructions with** `AGENTS.md`**.** Put one at your repo root
and OMP loads it every session, so you stop repeating build commands and rules
in prompts. Keep it short and concrete; every line costs context:

```md
# Project instructions

## Build and test
- Install: `npm ci`
- Unit tests: `npm test`
- Run locally: `npm run dev`

## Rules
- Never edit files under `src/generated/`.
- Keep public API changes backward compatible.
- Before finishing, run the narrowest test that covers the change.
```

After editing it, start a `/new` session and confirm it loaded in
`/extensions` → Context Files. Section 4 covers context files in depth.

**Pick an approval mode on purpose.** `always-ask` while you're learning or in
sensitive repos; `write` once you trust routine edits but still want to see
commands. Save a default in `~/.omp/agent/config.yml`:

```yaml
tools:
  approvalMode: write
```

`yolo` belongs in disposable environments or automation where you've decided
what the agent may not do. Whatever the mode, keep production credentials out of
the shell you launch it from.

**Transfer the shape, not the todo wording.** "Show open incidents" is vague;
"show incidents with status open, correct after a status change and after
reload, keep the existing list" gives the agent a target you can judge.

**Answer the three questions on every real task:**

1. **What did I authorize?** Which behavior, which systems. A local UI change
  doesn't authorize a production migration.
2. **What actually happened?** Tool results and the full change set, including
  staged and new files, not just the final summary.
3. **Why accept it?** A concrete example tied to checks and behavior you saw.
  Name what's still unverified.

Write a short note outside the app: your request, what changed, one tool result
you inspected, checks run and their results, and **accept / needs another change
/ can't verify**, with a reason. In pairs, one person drives while the other
predicts and watches scope; swap for review.

**Before moving on,** you should be able to explain:

- why deleting a completed task leaves the count unchanged;
- why refresh is a separate check;
- what `Esc` does and doesn't do;
- the difference between `always-ask`, `write` and `yolo`;
- what you'd do if the agent reported success but the browser disagreed.



## Go deeper



### Official OMP docs

- [Overview](https://omp.sh/docs) and [Quickstart](https://omp.sh/docs/quickstart):
install, sign-in, first task, resume.
- [Using omp](https://omp.sh/docs/using): the screen, tool cards, steering,
queueing, interrupting, local commands and stuck states.
- [Tool approvals](https://omp.sh/docs/approvals): modes, per-tool overrides,
and why approval is not a sandbox.
- [Providers](https://omp.sh/docs/providers): subscriptions, API keys, local
models and the full list of provider IDs.
- [Secrets and auth](https://omp.sh/docs/secrets): multiple accounts, which
credential wins, sign-out and key rotation.
- [Model roles](https://omp.sh/docs/roles): every role, switching, and retry
fallback chains.
- [Advisor](https://omp.sh/docs/advisor): the reviewer model, `WATCHDOG.md`
and its cost.
- [Settings](https://omp.sh/docs/settings): `/settings`, `omp config`, and
global versus project config.
- [Sessions](https://omp.sh/docs/sessions): resume, branch, fork, export.
- [Context files](https://omp.sh/docs/context-files): `AGENTS.md` discovery and
how to verify what loaded.
- [Tools](https://omp.sh/docs/tools): what the agent can do and how to restrict it.
- [Keybindings](https://omp.sh/docs/keybindings) and
[slash commands](https://omp.sh/docs/slash).
- [Plan mode](https://omp.sh/docs/plan): review an approach before any edit.
- [Goal mode](https://omp.sh/docs/goal) and [Handoff](https://omp.sh/docs/handoff):
long-running objectives and clean continuation briefs.
- [Run modes](https://omp.sh/docs/modes): one-shot `omp -p`, `/loop`, `/fast`.



### Sources and adaptation

The todo example, prompts, acceptance sequence and review guidance are
course-authored. No transcript or expected result above claims a
provider-backed run happened. OMP facts come from the official docs at
[omp.sh/docs](https://omp.sh/docs), checked 2026-09-26; the installed CLI
reported `omp v18.2.4` and its `--approval-mode` flag. Check `omp --version`
against the docs if your behavior differs. The Homebrew route and native
Windows support come from the
[upstream README](https://github.com/can1357/oh-my-pi). Recommending WSL2 on
Windows and a modern macOS terminal is course guidance, not an OMP
requirement. Model IDs in the YAML examples are illustrations; copy real ones
from `omp models`. The
[course source review](../research/2026-09-22-omp-course-source-review.md)
records earlier version evidence.

Section 2 explains what happened inside the run; section 3 teaches
[host and context controls](03-working-with-omp.md) in depth.

[Next: How agents work](02-agentic-engineering-foundations.md) · [Back to outline](../OUTLINE.md)