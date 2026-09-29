# 2.5 Sessions and memory

**Treat a session as a conversation record plus live runtime state, not as a rewind button.** OMP can rebuild model context from a saved transcript, but it does not undo edits, roll back a database, or stop a process that is already running.

## Choose the operation deliberately

| Need | Operation | What changes |
| --- | --- | --- |
| Continue an existing conversation | `/resume` | OMP switches the active runtime to a selected session and rebuilds its messages, settings, and model context. It does not create a new session file. |
| Start unrelated work | `/new` | OMP starts an empty conversation with a new session identity and, in persistent mode, a new transcript path. |
| Try a competing approach | `/fork` | OMP creates a new persisted session from the current one and switches to it. The copied entries keep the earlier reasoning available while the branch can diverge. |
| Keep the conversation but reset provider stream state | `/fresh` | OMP rotates provider-facing state while retaining the local transcript and visible conversation. |
| Clear the live context without deleting history | `/clear` | OMP rebuilds from a reset boundary; the transcript and pre-reset history remain on disk. |

Use `/resume` when the original task is still the task. Use `/fork` before asking for an incompatible implementation or experiment. Use `/new` when carrying the old conversation would be more confusing than useful. `/fork` requires a persisted session; an in-memory `--no-session` run cannot be forked.

After closing OMP, return to the project directory and run `omp --continue` for the most recent session, or `omp --resume` to choose one. **Forking a conversation does not fork your Git working tree.** Two sessions can still edit the same files.

## Context is not persisted history

The **transcript** is the durable session record: messages, tool calls, results, metadata, and compaction entries. **Context** is the subset OMP rebuilds and sends to the model for the current turn. A resumed session can therefore contain more history on disk than the model sees in one request. A file on disk is not current model context until OMP or a tool reads it; a transcript claim is not proof that the current workspace still matches it.

When the context grows, `/compact` or automatic maintenance turns older messages into a persisted summary and keeps a later boundary of messages. The summary is a handoff, not a perfect replay. Preserve decisions that must survive summarization in source files, project guidance, or a short handoff artifact. After resuming or compacting, inspect the current files and rerun the check that matters instead of trusting an old “passed” message.

The same boundary applies to the world outside the transcript. `/new`, `/resume`, `/fork`, `/clear`, and compaction do not revert files. Ending OMP does not imply that a fixture, server, child process, or browser closed. If the next decision depends on either state, inspect the filesystem and process separately.

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Tools and permissions](tools-and-permissions.md) · [Next: Artifacts](artifacts.md)

## Sources

- [OMP session operations: new, resume, fork, fresh, and clear (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/session-operations-export-share-fork-resume.md)
- [OMP compaction and branch summaries (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/compaction.md)
- [Context in this workshop](context.md)

These links follow OMP's current `main` documentation rather than a pinned release; session details and command availability can differ in an older installed build.
