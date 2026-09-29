# 1. Getting started with OMP: from answers to action

We’ll start with the tool: what it does, why we’re using it, and how to install and connect it. Each lesson will use its own practical examples; there is no single project you need to build throughout the course.

## The model is only part of the story

To talk to a model, you don’t need a coding agent. You can call an API or run a model locally and send it input.

But talking to a model and getting useful work done are different things.

In the coding interaction we’re discussing, the model produces text—including structured requests to use tools. **It cannot take action on your computer by itself.** Generating a command is not the same as running it.

That is where the **harness**, also called a **coding agent**, comes in. Claude Code, Codex CLI, and OMP are examples. We’ll use both terms for these tools; you don’t need to treat them as two separate products.

Here’s what happens when you send a prompt:

1. **The harness sends your request to the model.** Along with your prompt and relevant context, it provides definitions of the tools available for that interaction.
2. **The model responds.** Its response can include text, tool calls, or both. A tool call requests an action: read a file, create one, change some code, or run a command on your computer.
3. **The harness looks for tool calls.** If there are any, it handles the required permission checks and executes the allowed calls. The harness does the work—not the model.
4. **The harness sends the tool results back to the model.** The model can now see what the file contained, whether the command succeeded, or what error came back.
5. **The model responds again.** It may request more tool calls, which repeat the loop, or give you an answer without further actions.

That is the basic **agent loop**. One prompt can lead to several rounds of reading, editing, and running commands before you get the final reply. **The model requests actions; the harness executes them and feeds back the results.**

That is a large part of the shift from asking AI for advice to asking it to do work. You still own the result.

## Harnesses you’ll hear about

The same idea shows up in terminal tools, editors, and desktop apps. Here are a few worth recognizing—not a ranking or an installation checklist.

<div class="harness-grid">
<a class="harness-card" href="https://code.claude.com/docs/en/overview">
<img src="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon/android-chrome-192x192.png" alt="" width="44" height="44" referrerpolicy="no-referrer">
<span><strong>Claude Code</strong><small>Anthropic’s coding agent, available in the terminal and other development surfaces.</small></span>
</a>
<a class="harness-card" href="https://github.com/openai/codex">
<img src="https://github.com/openai.png?size=96" alt="" width="44" height="44" referrerpolicy="no-referrer">
<span><strong>Codex CLI</strong><small>OpenAI’s open-source terminal agent for working on a local codebase.</small></span>
</a>
<a class="harness-card" href="https://cursor.com/product">
<img src="https://cursor.com/marketing-static/icon-192x192.png" alt="" width="44" height="44" referrerpolicy="no-referrer">
<span><strong>Cursor</strong><small>An agent-powered editor, with a CLI for working from the terminal too.</small></span>
</a>
<a class="harness-card" href="https://github.com/github/copilot-cli">
<img src="https://raw.githubusercontent.com/primer/octicons/main/icons/copilot-24.svg" alt="" width="44" height="44" referrerpolicy="no-referrer">
<span><strong>GitHub Copilot CLI</strong><small>Terminal-based coding assistance connected to GitHub repositories, issues, and pull requests.</small></span>
</a>
<a class="harness-card" href="https://opencode.ai/">
<img src="https://opencode.ai/favicon-96x96-v3.png" alt="" width="44" height="44" referrerpolicy="no-referrer">
<span><strong>OpenCode</strong><small>An open-source coding agent with multiple model providers and terminal, desktop, and IDE interfaces.</small></span>
</a>
<a class="harness-card" href="https://github.com/cline/cline">
<img src="https://raw.githubusercontent.com/cline/cline/main/assets/icons/icon.png" alt="" width="44" height="44" referrerpolicy="no-referrer">
<span><strong>Cline</strong><small>An open-source agent that edits files and runs commands in your IDE, terminal, or desktop.</small></span>
</a>
<a class="harness-card" href="https://github.com/badlogic/pi-mono">
<img src="https://pi.dev/logo-auto.svg" alt="" width="44" height="44" referrerpolicy="no-referrer">
<span><strong>Pi</strong><small>An extensible, open-source harness—the foundation OMP was built on.</small></span>
</a>
<a class="harness-card harness-choice" href="https://github.com/can1357/oh-my-pi">
<img src="https://raw.githubusercontent.com/can1357/oh-my-pi/main/assets/icon.svg" alt="" width="44" height="44" referrerpolicy="no-referrer">
<span><strong>Oh My Pi (OMP)</strong><em>Our workshop choice</em><small>A Pi fork with built-in code navigation, execution, debugging, and more.</small></span>
</a>
</div>

Follow a card to its official site or repository. Product and organization logos load from their publishers; names and links work without them. We’ll use OMP below.

## Why we’re using OMP

We’re using **Oh My Pi—OMP** for two reasons.

### First: open source

We want to understand the software we give access to our code and commands. With OMP, we can read the implementation, investigate how it works, and change it when we need to. We don’t have to stop at what the interface or documentation tells us.

### Second: malleable

The tool should adapt to our work. We want to add tools, change behavior, and build workflows that fit the job—not wait for someone else’s product roadmap. OMP gives us a starting setup we can use immediately and customize as we learn what we need.

## Pi gives you the foundation.<br> OMP gives us a starting setup.

[OMP](https://github.com/can1357/oh-my-pi) is a fork of [Pi](https://github.com/badlogic/pi-mono), an extensible agent harness.

> **Pi is built to extend itself. So is Oh My Pi.**

Their own documentation is available to the agent, so when you ask for a new capability, it can read how the harness works and write an extension for the harness it is running in. You describe the change; the agent can build on its own tools to provide it. That is what makes this more than a collection of settings.

That is powerful. It can also become a project of its own.

Heavy customization takes time. The workshop should get us building useful software, not assembling a coding environment from scratch.

So we’ll start with OMP. It already includes capabilities we can grow into: code navigation, execution, browser tools, debugging, and delegated work. We don’t need to learn or configure all of them today.

**Start with a useful setup. Customize when you have a reason.**

<aside class="judgment-callout">
<p class="judgment-kicker">Worth knowing</p>
<h2>The harness can change the bill—not just the experience.</h2>
<p>Choosing a model is only half the story. The harness also shapes how much context gets sent, which tools run, and how many rounds it takes to finish a task. That makes it worth looking at token usage and cost, not just whether the answer looks good.</p>
<p>Here’s one interesting comparison: <a href="https://x.com/matei_zaharia/status/2074943612631273730">Matei Zaharia shared Databricks’ internal coding-agent benchmark</a>. On their sampled tasks, Pi reached comparable success rates to vendor harnesses with Opus and GPT 5.5 at roughly half the cost. Zaharia attributed the difference mainly to smaller inputs to the model.</p>
<figure class="course-diagram">
<a href="https://x.com/matei_zaharia/status/2074943612631273730"><img src="https://pbs.twimg.com/media/HMvDKk1WgAA1o9E.jpg?name=orig" alt="Benchmark scatter plot comparing overall pass rate with mean cost per task across Pi, Claude Code, and Codex configurations. Several Pi configurations achieve competitive pass rates at lower cost; results vary by model and reasoning setting." width="1413" height="917" referrerpolicy="no-referrer"></a>
<figcaption>Source: Databricks, shared by Matei Zaharia. Pass rate versus mean cost per task on their internal benchmark. Open the chart for his original thread.</figcaption>
</figure>
<p><strong>A useful signal, not a universal discount.</strong> This chart measures cost, not token counts. Model, task, reasoning settings, caching, and run-to-run variation all matter. LLMs can be benchmarked, but one comparison does not establish that Pi always uses fewer tokens—or that OMP inherits the same savings. The practical takeaway: compare the harness as well as the model.</p>
</aside>

## Pick a terminal and keep moving

OMP runs in a terminal. That’s where we talk to it, watch it work, and steer it. Cursor and other graphical tools have their place; our preference is keyboard-first. OMP in one pane and [Neovim](https://neovim.io/) beside it keeps the code close without constantly reaching for the mouse. Keep your usual editor if that works better for you.

**Kitty is our starting recommendation on macOS and Linux when customization matters.** Think ahead to juggling ten agents: which is working, which needs you, and which has new output you haven’t checked? A custom tab bar, connected to agent status hooks, can make those distinctions visible. That takes configuration, but lets you shape the terminal instead of immediately adding a separate workspace manager such as [Herdr](https://herdr.dev/).

Here are a few good options. Choosing a terminal is not the assignment—pick one that works on your operating system.

<div class="terminal-row">
<a class="harness-card terminal-card" href="https://sw.kovidgoyal.net/kitty/"><img src="https://sw.kovidgoyal.net/kitty/_static/kitty.svg" alt="" width="44" height="44" referrerpolicy="no-referrer"><strong>Kitty</strong></a>
<a class="harness-card terminal-card" href="https://ghostty.org/"><img src="https://ghostty.org/favicon-32.png" alt="" width="44" height="44" referrerpolicy="no-referrer"><strong>Ghostty</strong></a>
<a class="harness-card terminal-card" href="https://wezterm.org/"><img src="https://wezterm.org/favicon.png" alt="" width="44" height="44" referrerpolicy="no-referrer"><strong>WezTerm</strong></a>
<a class="harness-card terminal-card" href="https://alacritty.org/"><img src="https://alacritty.org/alacritty-simple.svg" alt="" width="44" height="44" referrerpolicy="no-referrer"><strong>Alacritty</strong></a>
<a class="harness-card terminal-card" href="https://www.warp.dev/"><img src="https://github.com/warpdotdev.png?size=96" alt="" width="44" height="44" referrerpolicy="no-referrer"><strong>Warp</strong></a>
</div>

**P.S. Windows users: we recommend [WSL2 with Ubuntu](https://learn.microsoft.com/en-us/windows/wsl/install), opened in [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/).** Run OMP and your development commands inside Ubuntu. Keep the project in the Linux home directory, such as `~/code`, rather than `/mnt/c`, for better Linux filesystem performance.

## Install OMP

Open your terminal. Pick the instructions for your system and use **one installation method**.

<div class="setup-platforms">
<details>
<summary><strong>macOS</strong><span>Use Homebrew if you already have it.</span></summary>

```sh
brew install can1357/tap/omp
```

No Homebrew? Use the official installer instead:

```sh
curl -fsSL https://omp.sh/install | sh
```

The installer command downloads and runs a shell script. You can [read it first](https://omp.sh/install).

</details>
<details>
<summary><strong>Linux</strong><span>Run this in your terminal.</span></summary>

```sh
curl -fsSL https://omp.sh/install | sh
```

This downloads and runs the [official installation script](https://omp.sh/install). Follow any PATH instructions it prints.

</details>
<details>
<summary><strong>Windows — WSL2 + Ubuntu</strong><span>Install inside Ubuntu, not PowerShell.</span></summary>

If WSL is not installed yet, open **PowerShell as administrator** and run:

```powershell
wsl --install -d Ubuntu
```

Restart if prompted. Open **Ubuntu** in Windows Terminal and finish creating your Linux username and password. See the [WSL installation guide](https://learn.microsoft.com/en-us/windows/wsl/install) if setup needs another step.

Then run this **inside Ubuntu**:

```sh
curl -fsSL https://omp.sh/install | sh
```

This downloads and runs the [official installation script](https://omp.sh/install). Keep using the Ubuntu terminal for the commands below.

</details>
</div>

### Check it worked

```sh
omp --version
```

You should see an OMP version number. Note it—commands and features can change between releases. If you get `command not found`, follow the installer's PATH instructions, open a fresh terminal, and try again.

These installation routes come from the [official OMP installation instructions](https://github.com/can1357/oh-my-pi#install).

## Connect a model

Open your terminal in an empty scratch folder, away from private code and credentials. This connection check needs OMP and model access—not a Git repository, Bun fixture, or application runtime.

Run onboarding:

```sh
omp setup
```

Follow the prompts for a provider account and an available model. OMP is the harness, not the model subscription; a chat subscription does not automatically provide API access. Use the login method your provider supports. Skip optional features for now.

Start OMP with supervised tool approvals:

```sh
omp --approval-mode always-ask
```

Inside OMP, enter these one at a time:

```text
/login
/hotkeys
```

`/login` opens the provider login flow; enter credentials there, never as an ordinary message. Use **Alt+M** to open the model selector and choose an available model—write down its provider and model name. `/hotkeys` shows the controls for this installed build, including interruption and exit shortcuts. See the [provider guide](https://github.com/can1357/oh-my-pi/blob/main/docs/providers.md), [approval-mode guide](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md), and [keybindings guide](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md).

Now make a small connection check. It may use your provider's paid quota:

```text
Reply with “Ready”. Do not use tools or change any files.
```

A reply confirms that a model request worked. It does not prove that the agent can safely edit a project. `always-ask` normally allows reads and prompts before writes or commands; inspect the path and command before approving. Approval is not a sandbox, so keep private data and production credentials out of this workspace. Escape interrupts a running turn; it does not undo edits or guarantee that a child process stopped.

**Exit and resume:** the default exit action is Ctrl+C twice. Later, return to this workspace and run `omp --continue` to resume the previous session. If you are unsure which key does what in your terminal, run `/hotkeys` again.

Before moving on, confirm:

- `omp --version` responds.
- The model answered the connection check.
- You know where OMP is working and how to interrupt it.

Prefer talking to typing? [Voice input](working-with-omp/voice-input.md) shows how to turn a rough explanation into a request without losing important details.

**OMP is installed and connected. Next, let’s understand the pieces behind it.**

[Back to the outline](../OUTLINE.md) · [Next: Agentic engineering foundations](health-checker/02-foundations.md)
