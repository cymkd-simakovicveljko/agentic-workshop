# 6.2 Keyboard controls and steering

**Use a few controls deliberately; do not memorize the whole catalog.** Run `/hotkeys` in your installed OMP build first. It includes remaps and extension bindings.

## The small set that pays for itself

| Key | Use it for |
| --- | --- |
| `Enter` | Submit the current draft. |
| `Escape` | Interrupt the current operation when the editor has no higher-priority mode to finish. |
| `Ctrl+Q` or `Ctrl+Enter` | Queue a follow-up while the agent is working. |
| `Alt+Up` or `Shift+Up` | Pull the queued follow-up back into the editor. |
| `Ctrl+C` then `Up` | Clear an unsent draft, then recall it for editing. |
| `Ctrl+O` | Expand or collapse tool output when you need to inspect what happened. |
| `Alt+A` | Open Agent Hub for task subagents. |

The exact action names and defaults are in the [keybindings reference](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md). On a terminal that swallows `Ctrl+Enter`, use `Ctrl+Q`.

## Queue, steer, interrupt

A queued follow-up waits for the current turn; it is not a second agent and it does not rewrite a tool call already in flight. Dequeue it if your understanding changes. When inspecting the course checkout, a useful queued message narrows the next decision:

```text
After the current inspection, report the HTML reader's entry point and run
command. Do not edit or start the server. If README.md and package.json
disagree, quote both paths and stop.
```

Use `Escape` when the turn is heading somewhere wrong. Interrupting stops the current operation; it is not rollback. A command or edit that already ran still needs inspection, and an interrupted turn can leave partial work. Ask the agent to inspect the current files before continuing.

When a focused subagent is active, type a message and press `Enter` to steer that subagent. `Escape` with an empty editor returns to the main session; it does not interrupt the subagent. See [Managing agents](managing-agents.md) before using Agent Hub.

## A bounded loop

1. Submit an inspection-only request.
2. While it runs, queue one acceptance condition with `Ctrl+Q`.
3. If the condition becomes wrong, recall it with `Alt+Up`, edit, and resubmit.
4. If the agent starts an unsafe or unrelated action, press `Escape`, inspect the files and process state, then decide whether to resume.

Add a remap only when a terminal or accessibility constraint makes one of these chords unreliable; keep `/hotkeys` as the source of truth after remapping.

[Back to Key productivity tips](index.md) · [Previous: Voice input](voice-input.md) · [Next: Phone access](phone-access.md)

## Sources

- [OMP keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md)
- [OMP approval modes](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md)
- [OMP CLI reference](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md)
