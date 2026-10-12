# 2.4 Tools and permissions

**A model requests an operation; the harness executes it if the applicable policy allows it.** Keep those steps separate. “I edited the file” is a model message. The file changing is a result you can inspect.

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

[Back to foundations](index.md) · [Previous: Prompting](prompting.md) · [Next: Sessions](sessions.md)

## Sources

- [OMP tool approval modes and safety rules (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/approval-mode.md)
- [OMP skills, tools, and hooks distinctions (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/skills.md)

These links follow OMP's current `main` documentation rather than a pinned release; the installed version controls the available tools and settings.
