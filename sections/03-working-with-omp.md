# 3. Working with OMP

**Main path:** choose a host action for the state you actually need to change.
This is a short bridge to the everyday workflow, not a catalogue of OMP features.
The [host exercise](../demo/section-03-working-with-omp.md) starts independently in
a disposable directory or on paper; it needs no todo-app changes.

## Understand

### Conversation state is not environment state

Suppose an agent has edited a file, a development server is still running, and
its conversation has become confused. Starting an empty conversation may help it
reason again. It does not undo the edit or tell you which code that server serves.

Keep four kinds of state separate:

| State | What it contains | How to establish it |
| --- | --- | --- |
| **Local conversation and session** | Saved history, identity and the conversation OMP currently presents. | Inspect the active session and its history; old claims still need checking. |
| **Model context and provider state** | Information supplied for the next interaction, summaries and provider continuation/cache state. | Inspect reported context/maintenance and relevant supplied material; visible scrollback alone is insufficient. |
| **Files and repository** | Current source, staged/unstaged edits, untracked files and saved notes. | Inspect the directory, revision, diff and actual files. A branch name does not save dirty work. |
| **Processes and external effects** | Servers, workers, browser storage, requests and remote operations. | Check the responsible process or system. A stopped response is not a rollback receipt. |

A file may exist without being loaded. A summary may be loaded without being
correct. A test may have passed before the latest edit. Before continuing, ask
which fact is missing rather than choosing the most dramatic reset.

### Inspect the effective controls first

This lesson uses the **OMP 18.2.9 source revision** reviewed in the
[course source review](../research/2026-09-22-omp-course-source-review.md). That review
observed version/help text only. Commands below are documented procedures;
configuration, model support, account state and key remaps can change your surface.

In a terminal, `omp --version` and `omp --help` identify the installed version and
launch controls. Inside OMP, `/hotkeys` shows current bindings. The defaults use
`Ctrl+O` to expand tool output and `Escape` to interrupt, but menus and Vim editing
states can consume Escape first. Confirm the response stopped; don't infer it
from the keypress. Do not keep pressing keys blindly if a menu has focus.

| Decision | Surface and condition | What to inspect |
| --- | --- | --- |
| Choose an authorized model | `/model` inside OMP; `/login` only when approved authentication is needed. | Actual provider/model, not an assumed account or a mandatory course model. |
| Choose reasoning effort | Terminal launch flag `--thinking low` is one documented level; `off`, `minimal`, `medium`, `high`, `xhigh`, `max`, `auto` are also documented. Model/provider support matters. | Whether the effective model supports the setting and whether it helps the task; more effort does not replace missing evidence. |
| Inspect discovered context | `/extensions` inside OMP, without toggling settings. | Source, level and state of discovered files; then explicitly read missing relevant material. |
| Inspect resources | `omp stats` and `omp usage` in a terminal, optional and authorized only. | Statistics scope versus provider/account limits. Empty or unavailable results are possible; no particular cost or balance is promised. |
| Set minimum course approval policy | `omp --approval-mode always-ask` at launch. | Reads normally proceed; writes/execution normally prompt. Explicit policies still participate. |

For comparison, `write` normally permits reads/writes and prompts for execution;
`yolo` is the documented default allowing those tiers without a prompt. This is
policy resolution, not isolation. Section 1 explains [why approval is not a
sandbox](01-getting-started-with-omp.md#a-narrow-prompt-is-not-a-security-boundary).
Do not change policy to make a blocked classroom action proceed.

Context discovery has scope and precedence, not “load every file.” A deeper
`AGENTS.md` may be a pointer to read rather than already-loaded text, and a nearer
or higher-priority source can shadow another. `/extensions` helps establish
provenance; it does not prove the model followed the guidance. Section 5 owns
[context and guidance maintenance](05-steering-agents.md).

### Choose the state change

These are **interactive OMP commands**, except the explicitly named terminal
alternatives. Do not turn slash commands into invented flags.

| Situation | Appropriate control | Limit that changes the decision |
| --- | --- | --- |
| Useful conversation is growing beyond practical context | `/compact [instructions]` | Reduces/reorganizes model context; it does not inventory current files or guarantee every constraint survives. Directed summarization can need a provider. |
| Provider stream/cache state appears wedged, but the conversation is useful | `/fresh` | Retains local and model-facing conversation, resets provider-facing stream state. Rejected while streaming: wait or interrupt first. It will not remove a mistaken requirement. |
| Want empty model/live conversation but retain session identity/history on disk | `/clear` | Clears live/model context in place and records a reset boundary. Rejected during streaming or foreground execution; it is not secure deletion of history or external rollback. |
| Want an independent empty conversation and new identity | `/new` | Starts a new session, not a clean working tree. Supply accepted requirements and inspect current files again. |
| Want to return to a saved conversation | `/resume`; terminal alternative `omp --resume` | Picker starts in current-folder scope; all-projects selection is deliberate. Cross-project resume can change cwd. Reconcile today's environment before acting. |
| Want the previous session at launch | Terminal `omp --continue` | Selects a previous session (or starts one if none exists); inspect which one rather than assuming. |
| Need to relaunch the OMP application itself | `/restart` | Relaunches with original flags and resumes the current session. Not a new reasoning context or a general process cleanup. |

`/clear` also cancels this agent's queued continuation and async jobs in the
reviewed implementation. That still does not establish the outcome of every
subprocess or external request. Inspect relevant operations independently. None
of these controls reconciles browser data, remote effects or arbitrary files.

Compaction is context maintenance. The documented mechanisms can summarize older
entries while retaining selected recent entries; other configured strategies may
reduce content differently. Automatic maintenance can follow overflow, incomplete
output, configured thresholds (including mid-turn) or idle maintenance. Whether
it runs depends on settings, model compatibility and actual context. Do not force
an overflow to demonstrate it or claim it happened without an observed event.

After compaction, inspect the summary and retrieve the accepted constraint from
its authoritative source. If “deleting a completed task leaves the remaining
count unchanged” disappeared, “continue” is unsafe even if the context meter is
smaller. A smaller request is not proof of preserved intent. Use the single
[handoff format](../demo/section-05-context-and-handoff.md) for durable continuation;
a compaction summary is not a second handoff standard.

## Watch or try

In the [host exercise](../demo/section-03-working-with-omp.md), first predict what
will happen to a marker file, a separate foreground process and an accepted
constraint. Then compare a prepared compaction/reset packet or, with authorized
provider access, exercise the controls in a disposable session. The no-provider
route includes worked observations but never labels them as your runtime results.

A useful bounded request for the optional session is:

```text
Read the practice brief. Explain the accepted behavior and the next useful check.
Do not edit files, run commands or contact external systems. If a required fact
is absent, name it rather than filling it in.
```

Interrupt during the response if it is still active. Inspect what actually
stopped before choosing a context action. A response that finishes before your
keypress does not demonstrate cancellation; record natural completion instead.

The exit condition is not “I tried every command.” Explain which control fits
context pressure, provider stream trouble and an independent task; identify what
still needs a file/process check. Reject the prepared continuation that forgets
the accepted count rule, and distinguish a predicted state from an observation.

## Use at work

Choose the smallest action that fixes the diagnosed layer. If the request is
missing a requirement, supply it. If the source read is stale, reread it. If a
provider stream is wedged, consider `/fresh` after stopping; if the conversation
is misleading, start new context with a factual handoff. Do not reset context to
avoid investigating a repeatable code failure.

After any session switch, check the directory before the next tool action. Before
accepting work after interruption, reconcile files and active operations. Section
6 applies these controls to [diagnosis and recovery](06-reliable-execution.md)
without repeating their definitions.

## Go deeper

### Sources and adaptation

All OMP links below use commit `8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75`, the
reviewed 18.2.9 source, rather than moving `main` links.

- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md): launch flags, thinking levels, `stats`, `usage` and session selectors.
- [Keybindings](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/keybindings.md): active binding inspection, expansion and interrupt caveats.
- [Context files](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md): discovery, shadowing and `/extensions`.
- [Session operations](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/session-operations-export-share-fork-resume.md): reset, fresh, resume, continue and restart boundaries.
- [Compaction](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/compaction.md): manual and conditional automatic maintenance, retained context and display transcript.
- [Approval mode](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md): policy resolution and containment limits.

This lesson relocates host controls from the earlier getting-started, context and
recovery lessons. Its practice cases are course-authored. Editor integration is
optional and outside this exercise; a documented integration is not a verified
local editor setup. Source-backed controls are not provider or classroom receipts.

[Next: The everyday workflow](04-the-everyday-workflow.md) · [Back to alternative outline](../alternatives/eight-section-outline.md)
