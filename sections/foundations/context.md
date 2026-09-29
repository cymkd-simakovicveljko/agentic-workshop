# 2.2 Context

**Point:** the prompt is the request you wrote; context is everything supplied to the model for this interaction. Good work depends on selecting the information that can change the next decision, not on dumping the repository into the session.

## What reaches the model

Context can include the current message and earlier turns, applicable instructions, OMP tool descriptions and working directory, supported context files, and files or command results returned by explicit reads and runs. A path mentioned in a prompt is not proof that the model read it. A file on disk is not automatically current context.

Retrieved text is evidence to inspect. It does not become authority just because it was pasted into the conversation. The accepted checker contract still comes from the fixture guide and the current request; a stale handoff cannot silently replace either one.

Ask: **what information could change the next decision?** For a redirect bug, start with the fixture contract, Git state and diff, the checker entry point, the request path, and the relevant command output. Defer unrelated modules and old chat until a named uncertainty makes them relevant.

## Four kinds of “memory”

| Thing | Persists | Does not prove |
| --- | --- | --- |
| **Model knowledge** | Patterns learned before this run | Knowledge of your current files or latest edit |
| **Session** | Conversation messages and tool results while it remains available | Permanent storage or model retraining; summaries can omit details |
| **File** | Source, notes, metadata, and generated output on disk | That the model read it or that it is current in the session |
| **Process** | A running fixture, server, compiler, or child command | That stopping OMP stopped it or that its result proves source correctness |

A saved note helps a later session only when that session finds and loads it. A fixture can keep listening after an OMP session ends; a file can remain after the fixture process exits. Check both states when the distinction matters.

For the practical choices—when to resume, start fresh, fork, or compact—use [Sessions and memory](sessions.md). Context is what reaches the model now; a saved session is the conversation you can return to.

## One focused investigation

When a handoff says “all endpoints passed” but `/redirect` seems wrong, submit an inspection-only request like this:

```text
Reconcile this claim with the current health-checker repository. Read the
canonical fixture guide, applicable project guidance, Git state, the actual
checker entry point, and the relevant checks. Do not edit or run external
requests. Report what the contract requires, what the current code does, which
claims are unsupported, and the smallest next action.
```

The result should identify evidence gaps rather than inherit the old claim. If the checker source was read before the latest edit, reread it; context can be stale even when the file is not.

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Models and roles](models.md) · [Next: Prompting](prompting.md)

## Sources

- [OMP context files and discovery, pinned 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md)
- [OMP session operations, pinned 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/session-operations-export-share-fork-resume.md)
- [OMP compaction, pinned 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/compaction.md)
- [Health-checker fixture contract](../../demo/health-checker/README.md)
