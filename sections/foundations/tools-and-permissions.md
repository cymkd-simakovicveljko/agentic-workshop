# 2.4 Tools and permissions

**A model requests an operation; the harness executes it if the applicable policy allows it.** Keep those steps separate. “I edited the file” is a model message. The file changing is a result you can inspect.

## Try denying a harmless edit

Use a Bash or Zsh terminal and the connected OMP setup from section 1. Create a fresh scratch folder, away from private code and credentials:

```sh
cd "$(mktemp -d /tmp/permission-demo.XXXXXX)"
printf 'ORIGINAL\n' > permission-demo.txt
pwd
omp --approval-mode always-ask
```

Keep the printed directory path. In a second terminal, change into that same directory; use it to inspect the file without asking the agent.

Send this request in OMP:

```text
Read permission-demo.txt with the built-in read tool, then use a built-in
file-editing tool to replace its entire contents with CHANGED followed by
one newline. Do not run commands, touch other files, or delegate the work.
If the edit is denied, stop; do not retry or use another tool.
```

**First, deny the edit.** Inspect the tool name, target path, and proposed change before choosing deny. Reads normally need no approval in `always-ask`; the file edit should prompt unless an existing policy overrides it. If it runs without a prompt, stop and inspect the active mode and per-tool policies before retrying in a fresh scratch folder. Do not count an automatic edit as an approval exercise.

After the turn stops, run this in your second terminal:

```sh
printf 'ORIGINAL\n' | cmp - permission-demo.txt &&
  echo "confirmed: denied edit left the file unchanged"
```

**Now approve one edit.** Send the same request again. Approve only the call targeting this scratch file with the intended contents—not a broader permission grant. After the turn finishes, check independently:

```sh
printf 'CHANGED\n' | cmp - permission-demo.txt &&
  echo "confirmed: approved edit changed the file"
```

If either comparison fails, inspect the file and tool result before continuing. Denial blocks that call; approval permits execution but does not guarantee it succeeded. The two comparisons let you distinguish the requested change, your decision, and the actual result.

## Follow the request through execution

A normal tool call has this shape:

1. The model emits a tool name and arguments.
2. OMP resolves the tool's approval tier and any argument-dependent policy.
3. The active mode, user policy, or an interactive approval decides whether the call may proceed.
4. OMP executes the operation and returns its result to the model.
5. You inspect the changed file, command output, or external effect before accepting the claim.

Current OMP tools use three approval tiers:

| Tier | Meaning | Typical example |
| --- | --- | --- |
| `read` | Reads data or updates UI-only session metadata. | Reading a source file. |
| `write` | Mutates workspace or session state without executing arbitrary code. | Editing a file. |
| `exec` | Executes code, shells out, drives a browser, or spawns agents. | Running a shell command. |

The modes control what runs without an approval prompt: `always-ask` normally allows reads, `write` allows reads and file edits, and `yolo` allows all three tiers. Individual policies can override those defaults.

For this workshop, keep using `omp --approval-mode always-ask`. Read the proposed path, diff, or command before approving. Deny a request that doesn't fit the task and explain what should happen instead. A narrower prompt helps communicate intent; it does not enforce a filesystem boundary.

A tool without a valid approval declaration is treated as `exec`. MCP server tools declare `write`; that tier still describes the tool call, not the real-world consequence of what the server does.

## Approval is not containment

An approved shell command retains the shell's ambient filesystem, network, and subprocess access. Approval is a checkpoint, not a sandbox. OMP's direct safety rules can force a prompt for critical patterns, but a pattern rule for `bash` does not contain the shell or automatically govern the shell reachable through another tool such as `eval`. Consequential actions still need a point-of-risk check: exact target, scope, and values. Text shown by a webpage, tool result, or model cannot override your direct authorization.

Start with OMP's built-in read, search, edit, and command tools. Add a custom tool, plugin, or MCP server only when a recurring operation needs a real executable interface that the built-ins cannot provide. A skill is passive guidance; it does not grant permissions or execute its own scripts. When you add executable capability, inspect its source, approval tier, network behavior, and write scope before using it.

## Sources

- [OMP tool approval modes and safety rules (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/approval-mode.md)
- [OMP skills, tools, and hooks distinctions (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/skills.md)

These links follow OMP's current `main` documentation rather than a pinned release; the installed version controls the available tools and settings.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Separate approval prompts from the security boundaries that must still hold at runtime.</span></summary>

- [Tool approval mode](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md) — Oh My Pi. Trace how tool tiers, user policies, overrides, and safety checks are resolved for the arguments that will actually execute.
- [LLM06:2025 Excessive Agency](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM06_ExcessiveAgency.md) — OWASP GenAI Security Project. Apply least privilege, narrow tool functionality, downstream authorization, and human approval instead of trusting the model to enforce its own boundary.
</details>
</div>

[Back to foundations](index.md) · [Previous: Prompting](prompting.md) · [Next: Sessions](sessions.md)
