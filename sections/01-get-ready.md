# Get Ready

**Get the tools working before asking an agent to change code.**

By the end, OMP should answer a message and you should be able to run code in a language you already know. Keep your usual editor. No plugins, Docker, or local AI model needed.

## Our setup is opinionated

We have picked one setup for the guided exercises: **OMP in a terminal, alongside your usual editor.** It keeps the agent's actions visible and lets us follow the same instructions. It is a teaching choice, not a claim that these are the best tools for every team.

You will learn two things throughout the course:

- **Our chosen tools:** installing and using OMP, its commands, permissions, and session controls. These instructions are specific to our setup.
- **Workflows you can take elsewhere:** writing specs, choosing context, planning changes, checking results, and delegating work. You can apply these practices with Claude Code, Codex, and IDE-based agents too.

The practices transfer. The exact commands and available features may not.

### Choose your terminal and editor

| System | Terminal for this course |
| --- | --- |
| macOS | The built-in Terminal app |
| Linux | Your usual terminal, with Bash or Zsh |
| Windows | Windows Terminal with a PowerShell tab |

Keep VS Code, Cursor, Neovim, or whichever editor you already use. An editor's integrated terminal works too—just use the shell listed above. **Terminal-first does not mean editor-free.**

Use OMP for the guided exercises. You do not need to install a second harness or an editor plugin to follow along.

**Choose a language you can review confidently.** Everyone gets the same task and expected behavior, but your implementation and test tools can differ. There are no separate language tracks or starter apps to download.

## 1. Install the tools

The shared tools are **Git**, **Bun**, and **OMP**. Git tracks changes. Bun installs and runs OMP—it does not determine the language you use for the exercises.

This lesson uses **OMP 18.2.9**. If your machine already has a managed installation, check with the host before replacing it.

We use OMP's Bun package route because the 18.2.9 prebuilt release downloads are currently unavailable. Bun must be **1.3.14 or newer**.

Choose your operating system. Run commands in the terminal—not inside OMP.

<div class="setup-platforms">
<details>
<summary><strong>macOS</strong><span>Use Terminal or your editor's terminal.</span></summary>

**Install Git if needed.** First check:

```sh
git --version
```

If Git is missing, install Apple's Command Line Tools:

```sh
xcode-select --install
```

Finish the installer, then check Git again.

**Install Bun, then OMP.** [Bun's official guide](https://bun.sh/docs/installation) explains the installer below. It downloads and runs a script; review it first, or use your company's approved installation route.

```sh
curl -fsSL https://bun.com/install | bash
```

Reopen the terminal so it picks up Bun's PATH entry, then run:

```sh
bun --version
bun install -g @oh-my-pi/pi-coding-agent@18.2.9
omp --version
```

Expect `omp/18.2.9`. If Bun or OMP is not found, follow the [Bun PATH instructions](https://bun.sh/docs/installation#add-bun-to-your-path), then reopen the terminal.

</details>
<details>
<summary><strong>Linux</strong><span>Use Bash or Zsh in your usual terminal.</span></summary>

**Install Git, curl, and unzip** using your distribution's package manager. Bun's installer needs unzip.

Ubuntu or Debian:

```sh
sudo apt update
sudo apt install git curl unzip
```

Fedora:

```sh
sudo dnf install git curl unzip
```

For another distribution, use its approved packages. These are alternatives; do not run both sets.

**Install Bun, then OMP.** Follow the [official Bun installation guide](https://bun.sh/docs/installation). Review the downloaded script before running it, or use your approved software channel:

```sh
curl -fsSL https://bun.com/install | bash
```

Reopen the terminal, then run:

```sh
bun --version
bun install -g @oh-my-pi/pi-coding-agent@18.2.9
omp --version
```

Expect `omp/18.2.9`. If Bun or OMP is not found, follow the guide's PATH instructions. The commands above target common Ubuntu/Debian and Fedora setups; check Bun's support before using a different distribution.

</details>
<details>
<summary><strong>Windows</strong><span>Use a PowerShell tab in Windows Terminal. WSL is not required.</span></summary>

**Install Git for Windows** from [git-scm.com](https://git-scm.com/download/win). Keep Git available from the command line.

Close and reopen your terminal after installation. In PowerShell, check:

```powershell
git --version
```

**Install Bun, then OMP.** Bun requires Windows 10 version 1809 or newer. Use Windows PowerShell 5.1 or PowerShell 7. Review the [official Bun installation guide](https://bun.sh/docs/installation) before running its installer:

```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

This downloads and runs an install script. If company policy blocks it, use your approved software channel or ask IT. Do not disable security settings to get through the lesson.

Reopen PowerShell, then run:

```powershell
bun --version
bun install -g @oh-my-pi/pi-coding-agent@18.2.9
omp --version
```

Expect `omp/18.2.9`. If a command is missing, follow Bun's Windows PATH instructions and reopen the terminal.

**Already using WSL?** You can follow the Linux route inside WSL instead. Keep Git, OMP, your language tools, and your exercise folder in that same environment; do not switch between Windows and WSL commands halfway through setup.

</details>
</div>

## 2. Connect a model

OMP is the tool, not the model subscription. You need an approved provider account with access to a model. A chat subscription does not automatically include API access; use the login method your provider and organization allow.

Create an empty practice folder and open your terminal there. Use it for this connection check—not a work repository containing private code.

Start onboarding:

```sh
omp setup
```

Follow the prompts for your approved provider and model. Skip optional features for now. Then start OMP:

```sh
omp --approval-mode always-ask
```

The commands below go **inside OMP**, one at a time:

- `/login` — sign in if onboarding did not already connect your account. Enter credentials only in the login flow, never as a normal message.
- `/model` — choose an available, approved model. Note which provider and model you picked.
- `/hotkeys` — find the current interrupt and exit shortcuts.

Send this small connection check. It may use your provider's paid quota:

```text
Reply with “Ready”. Do not use tools or change any files.
```

A response confirms that a model request worked. It does not prove that the agent can safely edit a project.

**Keep control:** `always-ask` normally allows reads and asks before edits or commands, but tool and user policies can override that behavior. Approvals are not a sandbox. Keep private data and production credentials out of the practice workspace. Escape normally interrupts a turn; it does not undo edits or guarantee that every process has stopped.

## 3. Check your usual language tools

Use a language you already know. You need its compiler or runtime and a way to run checks—not a new framework.

Before class, run a tiny program with those tools and confirm that you can check its output or run a test. Use the commands you normally use. If they fail, fix the setup before bringing in the agent.

There is no required application language. Installing Bun for OMP does not mean you have to write your program with it.

## 4. Prepare an empty workspace

Create a new, empty folder for the exercise. Open it in your editor and terminal. Keep it separate from company repositories and private data.

Check your terminal's location:

macOS or Linux:

```sh
pwd
```

Windows PowerShell:

```powershell
Get-Location
```

Once you are sure this is the new exercise folder, initialize Git:

```sh
git init
git rev-parse --show-toplevel
git status --short
```

The Git root should be this folder, and the working tree should be clean. If Git shows another project or unexpected files, stop and check your location. Do not reset or delete existing work.

Start the agent in this folder:

```sh
omp --approval-mode always-ask
```

Confirm the selected model. Do not ask it to build anything yet.

In the next lesson, you will build a website health checker in your chosen language. It will request one URL, check the HTTP status and expected text, and report the result and elapsed time. We provide controlled local endpoints so you can check healthy responses and failures without relying on public websites. Bun runs that shared fixture; it does not determine your implementation language.

## 5. Check that you are ready

Before the first exercise, confirm:

- Git, Bun, and OMP respond to their version commands.
- Your approved model answers a message.
- You can run and check a small program in your chosen language.
- You have an empty exercise repository open in your editor and terminal.
- You know where OMP is working, when it asks for approval, and how to interrupt it.

<details>
<summary><strong>Something did not work?</strong></summary>

| Problem | What to check |
| --- | --- |
| `bun` or `omp` is not found | Follow Bun's PATH instructions and reopen the terminal. Check that you are using the same Windows or WSL environment where you installed it. |
| Your program will not run | Check your chosen compiler or runtime using its normal setup instructions. Ask the host before adding unfamiliar tools. |
| No model, login failure, or quota error | Check the selected provider, account entitlement, and billing with the host. Do not share or borrow credentials. |
| Git shows unexpected files | Check your folder. Start in a new, empty exercise folder rather than deleting existing work. |

</details>

<details>
<summary><strong>Sources and what has been checked</strong></summary>

OMP instructions use the [18.2.9 source reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install), its [provider guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/providers.md), and [approval rules](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md). The [project guide](../PROJECT.md) separates the main course from the older prebuilt-app exercises.

The pinned package exists in the [npm registry](https://registry.npmjs.org/@oh-my-pi%2Fpi-coding-agent/18.2.9) and requires Bun >=1.3.14. The `v18.2.9` GitHub release lookup returned 404, so this lesson does not use its missing binary downloads. The [Bun installation guide](https://bun.sh/docs/installation) supplies the OS install and PATH steps.

Local macOS checks confirmed OMP 18.2.9, its CLI/setup help, Bun 1.3.14, and Git 2.39.5. Fresh installation, Windows/Linux execution, and provider login have not been exercised. The learner-created exercises still need rehearsal; this lesson does not claim that every language setup has been tested.

</details>

[Back to the introduction](introduction.md) · [Next: 1. Getting started with OMP](health-checker/01-getting-started.md)
