# 1. Getting started with OMP: from answers to action

## Harnesses you’ll hear about

<details>
<summary>Other harnesses and where OMP fits</summary>

The same idea shows up in terminal tools, editors, and desktop apps. Here are a few worth recognizing—not a ranking or an installation checklist.

<div class="harness-grid">
<a class="harness-card" href="https://code.claude.com/docs/en/overview">
<img src="https://code.claude.com/docs/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon/android-chrome-192x192.png" alt="" width="44" height="44" referrerpolicy="no-referrer">
<span><strong>Claude Code</strong><small>Anthropic’s     coding agent, available in the terminal and other development surfaces.</small></span>
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

</details>

<details>
<summary>How the harness affects cost: a benchmark example</summary>

<p>Here’s one interesting comparison: <a href="https://x.com/matei_zaharia/status/2074943612631273730">Matei Zaharia shared Databricks’ internal coding-agent benchmark</a>. On their sampled tasks, Pi reached comparable success rates to vendor harnesses with Opus and GPT 5.5 at roughly half the cost. Zaharia attributed the difference mainly to smaller inputs to the model.</p>
<figure class="course-diagram">
<a href="https://x.com/matei_zaharia/status/2074943612631273730"><img src="https://pbs.twimg.com/media/HMvDKk1WgAA1o9E.jpg?name=orig" alt="Benchmark scatter plot comparing overall pass rate with mean cost per task across Pi, Claude Code, and Codex configurations. Several Pi configurations achieve competitive pass rates at lower cost; results vary by model and reasoning setting." width="1413" height="917" referrerpolicy="no-referrer"></a>
<figcaption>Source: Databricks, shared by Matei Zaharia. Pass rate versus mean cost per task on their internal benchmark. Open the chart for his original thread.</figcaption>
</figure>
<p>This chart measures cost, not token counts. Model, task, reasoning settings, caching, and run-to-run variation all matter. It does not establish that Pi always uses fewer tokens—or that OMP inherits the same savings.</p>

</details>

## Pick a terminal and keep moving

Keep your usual editor; ours is [Neovim](https://neovim.io/). OMP runs in a terminal beside it.

**We recommend [Kitty](https://sw.kovidgoyal.net/kitty/) on macOS and Linux if you want customizable tabs and keyboard controls.** An existing terminal is fine for this lesson; you do not need a multi-agent workspace manager such as [Herdr](https://herdr.dev/).

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

Open your terminal in an empty scratch folder, away from private code and credentials.

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

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Understand what OMP starts, runs, and controls after installation.</span></summary>

- [Oh My Pi README](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install) — Oh My Pi project. See the installation options and built-in tools, and how OMP differs from the model behind it.
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md) — Oh My Pi project. Follow how `omp` launches and resumes sessions, selects models, and applies tool and approval settings.

</details>
</div>

[Back to the outline](../OUTLINE.md) · [Next: Agentic engineering foundations](foundations/index.md)
