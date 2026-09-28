# 1. Getting started with OMP

**Goal:** get productive with OMP in your first session, skip the mistakes that
catch almost everyone, and learn to accept a change on evidence rather than on
the agent's summary. This is not a React lesson.

**You'll leave able to:** connect your subscriptions and pick models for each
job, start and resume a session, read what the agent is doing, steer or stop it,
control what it may do without asking, write a bounded request, and review the
result yourself.

**How to use this section:**

1. **[Quick start](#quick-start)**, about 15 minutes: install, sign in and
   finish a first task in a repo you know.
2. **[Gotchas from experience](#gotchas-from-experience)**: read these before
   your first real task. They're what experienced users wish they'd known on
   day one.
3. **Reference**: skim now, come back when you need it.
   [How OMP works](#how-omp-works) ·
   [Asking and reviewing](#asking-and-reviewing) ·
   [Everyday controls](#everyday-controls) ·
   [Subscriptions, models and roles](#level-up-subscriptions-models-and-roles) ·
   [When something goes wrong](#when-something-goes-wrong) ·
   [Use it at work](#use-it-at-work)
4. **Practice** on the course todo app: the [demo](#demo-tour-the-controls)
   tours the controls, and the
   [exercise](#exercise-add-a-remaining-task-count) makes one real change that
   you review yourself.

## Quick start

This follows the official [Quickstart](https://omp.sh/docs/quickstart), plus
the few things experienced users set up on day one.

### 1. Install

**macOS**

```sh
brew install can1357/tap/omp          # Homebrew
# or
curl -fsSL https://omp.sh/install | sh
```

**Linux** (and inside WSL)

```sh
curl -fsSL https://omp.sh/install | sh
```

**Windows: use WSL2.** OMP runs natively on Windows
(`irm https://omp.sh/install.ps1 | iex` in PowerShell), but every command in
this course (Git, npm, Playwright, shell scripts) assumes a Linux or macOS
shell. With **WSL2 and Ubuntu, opened in Windows Terminal**, you follow the same
instructions as everyone else:

1. In an admin PowerShell: `wsl --install`, then restart and open *Ubuntu*.
2. Inside Ubuntu, install Git and Node, then OMP with the Linux command above.
3. Keep repos in the Linux home folder (`~/code/...`), not under `/mnt/c/...`.
   Files on the Windows drive are much slower from WSL.
4. For the exercise, install Playwright's browsers with
   `npx playwright install --with-deps`.

If a browser sign-in can't reach back into WSL, choose the device-code or
paste-code option OMP offers.

**Check it worked:**

```sh
omp --version
```

If `omp` isn't found, follow the PATH hint the installer printed and open a new
terminal.

> **Tip:** use a modern terminal such as [Ghostty](https://ghostty.org),
> [iTerm2](https://iterm2.com), [WezTerm](https://wezterm.org) or
> [Kitty](https://sw.kovidgoyal.net/kitty/). OMP relies on the Kitty keyboard
> protocol for key combinations. In macOS Terminal.app, `Shift+Enter` may not
> register; use `Ctrl+J` for a new line.

### 2. Open a project you know

Pick a repository you know well and are allowed to send to your model provider:
everything the agent reads becomes model input.

```sh
cd ~/code/my-project
git status --short               # ideally empty
omp --approval-mode always-ask
```

- **The directory you launch from becomes the project root** for the session.
- **Start from a clean working tree.** OMP edits your files directly and has no
  undo button. Git is your undo, so commit or stash first.
- **`--approval-mode always-ask`** makes OMP ask before every edit and command.
  Out of the box it asks for almost nothing, so keep this on for your first
  sessions. [Why this matters](#a-narrow-prompt-is-not-a-security-boundary).

Using an API key instead of a subscription? Export it in this terminal before
launching, for example `export ANTHROPIC_API_KEY=...`.

### 3. Sign in and choose a model

The first launch opens a setup wizard:

1. On **Set up your providers**, keep **Sign in** selected, choose your
   provider and press `Enter`. Finish the browser login, then return to the
   terminal. You can sign in to several providers.
2. If you exported an API key instead, it's already available: press `Esc`.
   Press `Esc` too when you're done connecting providers.
3. On **Choose your default model**, type to search, highlight a model and
   press `Enter`. OMP saves it for new sessions.
4. Finish the appearance prompts; each previews before you save it.

Later launches go straight to the prompt. Use `/login` to sign in to another
provider and `/model` to change models.

> **Gotcha: a subscription and its API are different providers.** This is the
> most common setup mistake. If you pay for a chat plan, sign in to the
> subscription provider, not the API one.

| You pay for               | Provider ID         | Not this       |
| ------------------------- | ------------------- | -------------- |
| ChatGPT Plus / Pro        | `openai-codex`      | `openai` (API) |
| Claude Pro / Max          | `anthropic` (login) | —              |
| GitHub Copilot            | `github-copilot`    | —              |
| Gemini via Google account | `google-gemini-cli` | `google` (API) |
| SuperGrok / X Premium+    | `xai-oauth`         | `xai` (API)    |

Confirm what you can use:

```sh
omp models                  # every model available to you right now
omp models openai-codex     # just one provider
```

Paste keys and login codes only into OMP's sign-in prompt, never into a chat
message, a repo file or a screenshot. No provider access at all? The
[setup companion](../demo/section-01-setup.md#prepare-omp-access) covers that
route.

### 4. Ask a question, then give it a small task

Start with a read-only question so you can see how it works:

```text
In a few sentences, what does this project do, and how do I run its tests?
```

Each file the agent reads appears as a **tool card**. Press `Ctrl+O` to expand
one and see what the agent actually got back; that's what the answer is based
on.

Now a small, real task:

```text
Find one small bug or inconsistency you can verify locally. Explain it, make
the smallest safe fix, and run the most relevant check. Don't commit.
```

Because you launched with `always-ask`, each edit and command pauses with an
approval prompt showing the path, diff or command. Read it, then approve or
deny. Denying is normal: tell the agent why and it adjusts. If it heads the
wrong way, press `Esc` to interrupt and say what you want instead.

### 5. Review, then follow up

```text
Show me the diff and explain each changed file. Don't make more changes.
```

Then check for yourself in a second terminal: `git status`, `git diff`, and the
project's tests. The agent's summary is a claim; the diff and the test output
are evidence.

Continue in the same session, as you would with a teammate:

```text
Looks good. Run the check once more and summarize any remaining risk.
```

Happy with it? Commit it yourself. Not happy? Say exactly what's wrong, or
discard the change with Git.

### 6. Exit and resume

Press `Ctrl+D` or type `/exit`. OMP saves the session automatically. From the
same project directory:

```sh
omp -c --approval-mode always-ask   # continue the most recent session
omp -r --approval-mode always-ask   # pick from earlier sessions
```

That's the whole loop: ask, watch, review, follow up. The rest of this section
makes it safer and faster.

## Gotchas from experience

These catch nearly everyone in their first week. Each is one or two lines; the
links go to the details.

### Safety and undo

- **It won't ask before acting unless you tell it to.** The default approval
  mode, `yolo`, runs edits and commands without asking. Launch with
  `--approval-mode always-ask` until you trust it, then
  [pick a default on purpose](#use-it-at-work).
- **Approval is not a sandbox.** An approved command runs with your full user
  access, and "only read the code" in a prompt doesn't stop it writing.
  [Details](#a-narrow-prompt-is-not-a-security-boundary).
- **There's no undo button.** Edits land in your working tree as it goes. `Esc`
  stops the turn but keeps edits already made; `/new` starts a new conversation
  but doesn't revert files. Commit or stash before each task so Git can undo.
- **Everything it reads goes to your provider.** File contents, command output
  and your messages become model input. Keep secrets and production credentials
  out of the repo and out of the shell you launch it from.
- **Your local OMP data is sensitive.** Logins live in `~/.omp/agent/agent.db`,
  which isn't encrypted. Sessions in `~/.omp/agent/sessions/` contain code and
  command output. Protect both like SSH keys.

### Accounts and models

- **Subscription isn't API.** ChatGPT Plus is `openai-codex`, not `openai`. See
  the [provider table](#3-sign-in-and-choose-a-model).
- **A stored login beats an exported key.** `export ANTHROPIC_API_KEY=...`
  won't override a login. `/logout <provider>` removes one account.
- **Check the status line after any switch.** It shows the active model,
  thinking level, mode, directory, Git branch, context use and cost. Most "why
  is it doing that?" moments are answered there.
- **Thinking defaults to `high`.** Good for hard problems; slow and costly for
  quick questions. `Shift+Tab` lowers it.
- **You don't need to configure roles on day one.** Unassigned roles fall back
  to models you're signed in to. Come back to
  [roles](#level-up-subscriptions-models-and-roles) when you hit a usage limit
  or want cheaper background work.

### Asking and reviewing

- **"Done" is a claim, not verification.** A green tool card means that one
  action succeeded, not that the task is right. Read the test card's output and
  exit status, and run the checks yourself.
- **Let it look before it edits.** For anything non-trivial, start with
  "Investigate, but don't edit or run anything yet." A wrong plan is cheaper to
  fix than a wrong diff.
- **Say why you attached something.** An `@file` or screenshot gives context,
  not intent. "The screenshot is the error users see" beats a bare path.
- **Never ask it to "make the tests pass".** That invites weakened or deleted
  tests. Ask for the root cause and say the assertions must not change.
- **If it repeats a failing approach, stop it.** Ask for the exact error and a
  diagnosis before any more edits.
- **One task per session.** Long sessions get slower, pricier and more
  confused. Use `/new` when the task is done; the old session stays saved.

### Controls that surprise people

- **`Enter` while it's working steers the current turn.** To add something for
  after it finishes, queue it with `Ctrl+Q`. `Alt+Up` (or `Shift+Up`) pulls a
  queued message back to edit.
- **`Esc` closes a menu before it interrupts anything.** If keys move a list
  instead of typing, a menu has focus. `Esc` never exits OMP.
- **`Ctrl+C` clears your draft; a second quick press exits.** Leave with
  `Ctrl+D` instead: it keeps an unsent draft for when you resume.
- **`!` shares output with the model; `!!` doesn't.** Neither is sandboxed:
  both run immediately with your permissions. `! cd somewhere` also moves OMP's
  working directory.
- **OMP may load instruction files you didn't write.** In a repo nested under
  your home folder, it can pick up `AGENTS.md` files from parent folders. Check
  `/extensions` → *Context Files* in every new repo.
- **If it refuses to edit, or keeps going on its own, check the mode.** Plan,
  Goal and Loop modes show in the status line. Leave the mode with its command
  instead of arguing with repeated prompts.

## How OMP works

### What OMP is

OMP is a terminal-first coding agent. You start it inside a project, describe
an outcome in ordinary language, and it can search the code, edit files, run
commands and explain what it did, all in one saved session. It uses the model
provider you choose; it isn't tied to one vendor.

It acts on your real machine. Edits land in your working tree as it goes (never
committed unless you ask), and commands run with your user account's access.

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

### Your loop

While the agent runs its loop, you run yours:

1. **State the outcome and boundaries:** the behavior you want, what must not
   change, and the check that should pass.
2. **Let it investigate.** Each read, command and edit appears as a tool card.
3. **Step in when needed:** steer it, answer its question, or reject an unsafe
   action.
4. **Review the evidence:** changed paths, diffs, command exit status and test
   output, not just the final message.
5. **Refine in the same session:** "Keep the public signature," "Add the missing
   edge case," "Revert the change to `cache.ts`."

You own the desired behavior, what the agent may touch, and the final accept
decision. A better model doesn't take those over.

### The screen

| Region          | What it shows                                                          | Why you care                                                                   |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Transcript**  | Your messages, the agent's replies and tool cards.                     | The audit trail: what was read, changed and run.                               |
| **Composer**    | The box where you type the next message.                               | Pickers and questions open here too.                                           |
| **Status line** | Model, thinking level, mode, directory, Git branch, context use, cost. | Check it before assuming the agent is in the right place with the right model. |

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

## Asking and reviewing

### Write a request the agent can meet

A good request has three parts: an **outcome**, **boundaries**, and a **check**.

| Weak                  | Better                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| "Add a counter."      | "Show how many tasks are unfinished. It must stay correct after add, complete, delete and refresh." |
| "Fix the tests."      | "The login test fails with a timeout. Find the root cause; don't change the test's assertions."     |
| "Clean up this file." | "Rename `x` to `taskCount` in `App.jsx` only. Run `npm test`."                                      |

Phrases worth memorizing:

- *"Investigate, but don't edit"* when you want an explanation first.
- *"Don't commit"* to keep Git history in your hands.
- *"If you need a wider change, stop and explain"* to catch scope creep early.

You can mix prose, `@file` mentions, pasted text and images (`Ctrl+V`) in one
message. Say what each attachment is for:

```text
Compare @src/auth/refresh.ts with @test/auth/refresh.test.ts. The attached
screenshot is the production error. Fix the race without changing the token
format, then run the focused test.
```

For large or risky work, `/plan` gives you a read-only planning turn to review
before any edit. You won't need it for today's small change.

### A narrow prompt is not a security boundary

"Read first" and "only touch this file" limit the *request*. They don't remove
the agent's ability to write files or run commands. That's the job of the
**approval mode**:

| Mode                      | Runs without asking       | Asks first                           |
| ------------------------- | ------------------------- | ------------------------------------ |
| `yolo` (built-in default) | Reads, edits and commands | Nothing based on tier alone          |
| `write`                   | Reads and file edits      | Commands, browser control, subagents |
| `always-ask`              | Reads                     | Edits and commands                   |

The default is `yolo`, so a fresh install asks for almost nothing. This course
launches with `--approval-mode always-ask` so you see every edit and command
before it runs; you can also choose it in `/settings` under
**Interaction → Approvals**. Per-tool policies can still change what prompts, so
don't assume every action will ask.

An approved command runs with your full user access: **approvals are not a
sandbox.** Approval means "I authorize this call," not "this is correct." Read
the command, target and diff, not just the title. Pressing `Esc` on an approval
prompt cancels it; dismissing never approves. Use only the course repo for the
exercise, no production credentials or private data, and never approve an
action you can't explain just to keep things moving.

### Before you accept: three questions

1. **What did I ask for?** The behavior, and what the agent was allowed to
   touch.
2. **What actually happened?** The files read, edits applied and commands run,
   including staged and new files, not just the final summary.
3. **Why accept it?** Checks and behavior you saw yourself. Name what's still
   unverified.

These can disagree. The agent can solve a slightly different problem; tests
can pass without covering the new behavior; the app in your browser can be a
different server or branch. Each is a real way for "done" to be wrong.

## Everyday controls

Keep this page open for your first few sessions. `/hotkeys` shows the keys in
your terminal, and typing `/` lists every command.

**Write and send**

| Key / input                            | What it does                                                        |
| -------------------------------------- | ------------------------------------------------------------------- |
| `Enter`                                | Send.                                                               |
| `Shift+Enter`, `Ctrl+J` or `Alt+Enter` | New line without sending. In Windows Terminal, prefer `Alt+Enter`.  |
| `@path`                                | Attach a file: type to fuzzy-search, `Tab` to accept.               |
| `Ctrl+V`                               | Paste an image, such as a screenshot of a broken UI.                |
| `Ctrl+G`                               | Write a long prompt in your `$EDITOR`; save and close to return.    |
| `! cmd` / `!! cmd`                     | Run a shell command yourself, with / without sharing the output.    |
| `Ctrl+R`                               | Search your prompt history.                                         |

**Steer a running turn**

| Key / input            | What it does                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `Enter`                | While the agent works, sends a correction into the current turn ("don't touch the tests"). |
| `Ctrl+Q`               | Queue a follow-up for after the turn finishes.                                             |
| `Alt+Up` or `Shift+Up` | Pull the last queued message back into the composer to edit it.                            |
| `Esc`                  | Interrupt the turn (or close a menu). **Doesn't undo** edits already applied.              |
| `.` or `c`             | Continue after an interrupt.                                                               |
| `Alt+R` or `/retry`    | Retry the last failed turn.                                                                |
| `Ctrl+O`               | Expand or collapse a tool card's output or diff.                                           |
| `Ctrl+Shift+O`         | Hide or show tool activity for a prose-only view.                                          |

**Manage context**

The model sees a limited window. Long sessions get slower, pricier and more
confused, so keep the context clean.

| Command            | Use it when                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `/context`         | You want to see what's filling the window.                                                                                    |
| `/btw <question>`  | You have a quick side question; the exchange isn't added to the saved conversation.                                           |
| `/handoff [focus]` | You're switching phases or coming back after a break: it replaces old history with a brief of goal, decisions and next steps. |
| `/compact [focus]` | You just need room: it summarizes older history in place.                                                                     |
| `/new`             | The task is done. Start fresh; the old session stays saved.                                                                   |

OMP also compacts automatically as the window fills. `/handoff` and `/compact`
keep the same session; use `/new` when you want a truly clean start.

**Sessions**

| Command               | What it does                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `omp -c`              | Reopen the most recent session in this directory.                                           |
| `omp -r` or `/resume` | Pick an earlier session.                                                                    |
| `/branch` / `/tree`   | Branch from an earlier message to try another direction; `/tree` switches between branches. |
| `/fork`               | Copy the conversation into a new session before trying a separate approach.                 |
| `/rename <title>`     | Name the session so you can find it later.                                                  |
| `Ctrl+D` or `/exit`   | Exit. Everything is saved, including an unsent draft.                                       |

**Models and modes**

| Key / command        | What it does                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `Ctrl+P`             | Cycle the `slow`, `default` and `smol` role models (`Shift+Ctrl+P` goes backward).                   |
| `/switch` or `Alt+P` | Change the model for this session only.                                                              |
| `/model` or `Alt+M`  | Change models and roles, saved for next time.                                                        |
| `Shift+Tab`          | Change thinking effort.                                                                              |
| `Ctrl+T`             | Show or hide thinking blocks. This changes what you see, not how hard it thinks.                     |
| `/plan [task]`       | Read-only planning: OMP investigates and drafts a plan you approve before any edit.                  |
| `/goal <objective>`  | Let OMP keep working across turns until a clear, checkable goal is met. Set `/goal budget <tokens>`. |

Use `/plan` for risky or multi-file changes and `/goal` only for large work
with a clear finish line (for example "all importer tests and typecheck
pass"). Neither replaces your review. You won't need them for today's
exercise.

**Look around**

| Command       | What it shows                                                                  |
| ------------- | ------------------------------------------------------------------------------ |
| `/hotkeys`    | The key bindings in your terminal.                                             |
| `/extensions` | Which instruction files, skills and extensions loaded (*Context Files* tab).  |
| `/tools`      | What the agent can use right now.                                              |
| `/usage`      | How much of your plan's limits you've used.                                    |
| `/settings`   | Every setting, searchable.                                                     |

## Level up: subscriptions, models and roles

None of this is needed for your first session. Come back when you hit a usage
limit, want to use several subscriptions, or want cheaper background work.
Meanwhile, watch cost: the status line shows what the session has cost, and
`omp usage` shows how much of your plan is left.

### Use the subscriptions you already have

This is where OMP shines. It isn't tied to one vendor: it can use the coding
subscriptions you already pay for (ChatGPT Plus/Pro, Claude Pro/Max, GitHub
Copilot, Cursor, Gemini and more), plus API keys, company gateways and local
models, all from the same tool.

```text
/login                  # choose from the list
/login openai-codex     # or go straight to one provider
```

**Use several subscriptions.** Sign in to as many providers as you like. You
can then put different models on different jobs (see roles below), and spread
work across plans instead of burning through one.

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

### Put the right model on each job: roles

You don't pick a model for every request. Instead, OMP has **roles**: named
jobs that each point at a model. Features use their role automatically.

**How OMP moves between roles.** Your conversation runs on one active model,
normally `default`. It only changes when something asks for a different job:

- **You switch it:** `Ctrl+P` cycles through `slow`, `default` and `smol`;
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

- **`vision`:** reading images, such as a screenshot of a broken UI. Set it
  only if your `default` model can't read images.
- **`commit`:** writing commit messages. Point it at a cheap model; it's a
  small, frequent job.
- **`task`:** subagents that OMP spins up for delegated work, like auditing
  several folders in parallel. A cheaper model here keeps parallel work
  affordable.
- **`designer`:** the designer subagent for UI and visual work. Use a model
  that's good at frontend design.

**You don't have to configure anything.** Unassigned roles are filled
automatically from the models you're signed in to; `smol` and `slow` may just
reuse `default`. Pin a role when you want predictable cost or quality.

**Set roles in the app:** `/model` (or `Alt+M`) → *Roles* → pick a role → pick
a model and thinking level. That saves it for future sessions.

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

| Control                     | Effect                                                      |
| --------------------------- | ----------------------------------------------------------- |
| `/model` or `Alt+M`         | Change models and roles; saved for next time.               |
| `/switch` or `Alt+P`        | Change the model for this session only.                     |
| `Ctrl+P`                    | Cycle the `slow`, `default` and `smol` models this session. |
| `omp --model ...` at launch | Use a model for this run without saving it.                 |

### The advisor: a second pair of eyes

The advisor is a second model that reviews the main agent's work as it goes,
and flags missed requirements, risky code or weak checks. It's off by default.
It costs extra and sends your session to its provider too, so save it for long
or high-stakes work:

```text
/advisor on        # this session only
/advisor status    # which model, how much it has cost
```

To keep it on, set `advisor.enabled: true` in your config. Put reviewer-only
priorities in a `WATCHDOG.md` file in your repo. More in the
[Advisor docs](https://omp.sh/docs/advisor).

### When a model runs out of quota

A fallback chain lets OMP move on instead of stopping:

```yaml
retry:
  fallbackChains:
    default:
      - openai-codex/gpt-5.5
      - anthropic/claude-sonnet-4-6
```

## When something goes wrong

| What you see                             | Do this                                                                                            |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `omp: command not found`                 | Follow the installer's PATH hint; open a new terminal.                                             |
| No models to choose                      | `/login` for your provider, or check the exported API key in *this* terminal.                      |
| Your subscription's models aren't listed | Wrong provider ID (e.g. `openai` instead of `openai-codex`). Then `omp models refresh`.            |
| The wrong account or key is used         | A stored login beats an exported key. `/logout <provider>` removes one account.                    |
| You hit a usage limit                    | `omp usage`; add a second account or a [fallback chain](#when-a-model-runs-out-of-quota).          |
| Keys move a list instead of typing       | A menu has focus. Read its footer or press `Esc`.                                                  |
| A queued message is wrong                | `Alt+Up` or `Shift+Up` brings it back to edit; submit again.                                       |
| The agent is taking the wrong path       | Steer with `Enter`. If continuing would do harm, `Esc`, check what already changed, then restate.  |
| You stopped a good turn by accident      | Send `.` to continue.                                                                              |
| A response failed                        | Read the error card; `Alt+R` retries, or change model with `/model`.                               |
| Output or diff looks cut off             | `Ctrl+O` to expand the card.                                                                       |
| Screen garbled after resize              | `Alt+L` repaints.                                                                                  |
| Agent inspects but won't edit            | Check the status line for Plan mode and look for a pending approval prompt.                        |
| Context use is near its limit            | Finish the current thought, then `/compact`.                                                       |
| Terminal closed                          | Return to the project directory and run `omp -c`.                                                  |
| Tests fail before you asked for anything | Environment problem. Fix setup first; don't hand it to the agent to "make green".                  |

## Use it at work

**Keep going on your own repo.** Pick small, well-understood changes with a
clear check, not your hardest problem. In each new repo, ask it to explain the
code before asking it to change anything.

**Give it standing instructions with `AGENTS.md`.** Put one at your repo root
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
`/extensions` → *Context Files*. To check the agent understood it, ask:
"Summarize the repository instructions that apply to this task and name their
source files." [Section 5](05-steering-agents.md) covers context files in depth.

**Pick an approval mode on purpose.** `always-ask` while you're learning or in
sensitive repos; `write` once you trust routine edits but still want to see
commands. Save a default in `~/.omp/agent/config.yml`:

```yaml
tools:
  approvalMode: write
```

`yolo` belongs in disposable environments or automation where you've decided
what the agent may not do. Whatever the mode, keep production credentials out
of the shell you launch it from.

**Get a strict second opinion before committing.** `/review` → *Review
uncommitted changes* runs a read-only review of your staged and unstaged diff.
It reports only evidence-backed problems, each with a priority and a
confidence, and edits nothing. New files aren't in a Git diff until you
`git add` them. A clean verdict doesn't replace your own checks; you decide
which findings to act on.

**Transfer the shape, not the todo wording.** "Show open incidents" is vague;
"show incidents with status open, correct after a status change and after
reload, keep the existing list" gives the agent a target you can judge.

**Answer the [three questions](#before-you-accept-three-questions) on every
real task.** A local UI change doesn't authorize a production migration. Write
a short note outside the app: your request, what changed, one tool result you
inspected, checks run and their results, and **accept / needs another change /
can't verify**, with a reason.

## Demo: tour the controls

A presenter can run this live, or you can do it alone. Nothing here changes
code: it repeats the quick start on the course app and adds every control
you'll use in the exercise.

Use three terminals, all in `demo/todo-app`: **A** runs the app, **B** runs
OMP, **C** is for your own review.

### 1. Open OMP in the app

`demo/todo-app` is its **own Git repository** (branches `main`, `exercise/*`,
`solution/*`), separate from the course repo. If your copy of the course doesn't
include it, get it from the course maintainer; don't recreate it.

**Terminal B:**

```sh
cd demo/todo-app
git rev-parse --show-toplevel   # must end in /todo-app
omp --approval-mode always-ask
```

Read the status line: right model, right directory, `main` branch.

### 2. Try each control

**Ask a question and read the tool cards:**

```text
In two sentences, what does this app do and where is task data saved?
```

Each file the agent reads appears as a card. Press `Ctrl+O` to expand one and
see the actual content it got back.

**Point at a file with `@`:** type `@` and start typing `tasks` to fuzzy-pick
`src/tasks.js`, then add a question:

```text
@src/tasks.js Which function would I change to stop blank tasks being added?
```

**Run a command yourself with `!`:**

```text
! git status
```

The output shows in the transcript and is shared with the model. Use `!!`
instead to keep the output out of the model's context. Either way it runs with
your permissions immediately; no approval is involved.

**Check which instruction files loaded:** enter `/extensions` and open
*Context Files*. Because the app is nested inside the course folder, OMP may
also pick up instruction files from parent directories. If you see one you
don't recognize, such as a file from the course folder describing a different
app, note it: the agent is following those instructions too. `Esc` closes the
panel.

**Look around:** `/tools` lists what the agent can use, `/context` shows how
the context budget is being spent, and `/hotkeys` shows your key bindings.
Typing `/` alone opens autocomplete for every command.

**Steer and queue:** send `Summarize every file in src/ one by one.` While it
works, type `Just list the file names.` and press `Enter`: that steers the
current turn. Then type `Which file has the tests?` and press `Ctrl+Q`: that
waits until the turn ends.

**Interrupt and continue:** send the summary request again and press `Esc`
mid-way. The turn stops. Send `.` (or `c`) to let it carry on, or type a
correction instead.

**Exit and come back:**

```text
/exit
```

```sh
omp -c --approval-mode always-ask
```

`-c` reopens the most recent session in this directory with its history.
`omp -r` lets you pick from earlier ones. Start a clean session for the
exercise with `/new`.

## Exercise: add a remaining-task count

You'll add one visible feature, then decide on evidence whether to accept it.
At the end, answer the [three questions](#before-you-accept-three-questions)
for this change:

1. **What did I ask for?** A count of unfinished tasks, correct after every
   change.
2. **What actually happened?** The files read, edits applied, commands run.
3. **Why accept it?** Checks and browser behavior you saw yourself.

Watch for the ways they can disagree here: an agent can count completed tasks
too; tests can pass without checking the new label; the browser can be showing
a different dev server. In pairs, one person drives while the other predicts
and watches scope; swap for review.

### 1. Start the app on the exercise branch

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

### 2. Predict before you prompt

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

### 3. Ask it to look first

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

### 4. Ask for the change

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

### 5. Watch the loop, not the script

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
- **It says "done":** that's a claim, not verification. Go to step 6.

### 6. Review it yourself

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

For an optional second opinion, stage the new files and run `/review` →
*Review uncommitted changes*. Its findings are input to your decision, not a
verdict.

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

### 7. Accept, ask again, or start over

- **Accept:** commit it yourself (`git add` the files you reviewed, then
  `git commit`). You're the one vouching for it.
- **Needs another change:** say exactly what's wrong in the same session:
  "Deleting a completed task changes the count; it shouldn't. Fix that and add
  a test for it."
- **Start over:** OMP has no undo button, and `Esc` or `/new` doesn't revert
  files. Git is your undo. Follow the companion's
  [safe restart](../demo/section-01-setup.md#restart-safely-from-the-exercise-branch)
  to preserve or discard work deliberately, then begin on a fresh branch.

### You're done when you can explain

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
- [Code review](https://omp.sh/docs/review): `/review` scopes and how to read
  its findings.
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

The quick start adapts the official [Quickstart](https://omp.sh/docs/quickstart);
the loop, controls and troubleshooting tables draw on
[Using omp](https://omp.sh/docs/using), [Keybindings](https://omp.sh/docs/keybindings)
and [Slash commands](https://omp.sh/docs/slash). The gotchas, todo example,
prompts, acceptance sequence and review guidance are course-authored; product
behavior in them comes from the linked docs. No transcript or expected result
above claims a provider-backed run happened. OMP facts come from the official
docs at [omp.sh/docs](https://omp.sh/docs), checked 2026-09-26; the installed
CLI reported `omp v18.2.4` and its `--approval-mode` flag. Check `omp --version`
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
