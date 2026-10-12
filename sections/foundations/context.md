# 2.2 Context

**Context is the information supplied to the model for the current interaction:** instructions, messages, tool results, and supported images or other inputs.

The **context window** limits how much the model can process at once. A saved conversation can contain more history than the model receives on the next turn.

## What reaches the model

<figure class="course-diagram course-diagram-wide">
<a href="/diagrams/llm-context.png"><img src="/diagrams/llm-context.png" width="1787" height="880" alt="Six inputs combined into an LLM's context: system instructions, conversation history, current user input, retrieved context, tool and function schemas, and formatting or output instructions." /></a>
</figure>

Context can include:
- the current message and earlier turns, 
- applicable instructions (Agent.md, Claude.md), 
- Harness (OMP or other) tool descriptions and working directory (System instructions), 
- supported context files,
- files or command results returned by explicit reads and runs. 

**Remember:** A path mentioned in a prompt is not proof that the model read it. A file on disk is not automatically current context. Retrieved text is evidence to inspect. It does not become authority just because it was pasted into the conversation.

Ask: **what information could change the next decision?** If you're investigating a bug, start with the exact failing command and its output, the relevant code, and what you expected to happen. Add more when the investigation needs it—not the whole repository just in case.

## Context changes the quality of the work

**A larger window means more room, not guaranteed better answers.** Relevant code, requirements, and examples can improve the result. Unrelated logs, stale decisions, and repeated output can make useful information harder to use. A constraint can be present in the conversation and still get missed.

The practical goal is not the shortest prompt. It is **enough current evidence to do the job, without unnecessary history**. If the agent lacks the failing command or an important requirement, removing more context will not help.

### How much should we fill it?

Don't aim for a percentage. The research linked below does not establish a universal “safe below 50%” or “bad above 80%” rule; results depend on the model, task, and information supplied.

- **Start with the goal and constraints.** Let the agent inspect relevant files rather than preload the whole repository.
- **Keep exact details when they matter.** Preserve error messages, API contracts, and acceptance criteria—not just a summary saying “it failed.”
- **Use `/context` when the session gets long.** Inspect what's taking up space. It estimates usage; it does not measure understanding.
- **Leave room to continue.** The next response and tool results need space too. Compact relevant history or start fresh for unrelated work; the command guide below explains the choices.

## Four kinds of “memory”

| Thing | Persists | Does not prove |
| --- | --- | --- |
| **Model knowledge** | Patterns learned before this run | Knowledge of your current files or latest edit |
| **Session** | Conversation messages and tool results while it remains available | Permanent storage or model retraining; summaries can omit details |
| **File** | Source, notes, metadata, and generated output on disk | That the model read it or that it is current in the session |
| **Process** | A running fixture, server, compiler, or child command | That stopping OMP stopped it or that its result proves source correctness |

A saved note helps a later session only when that session finds and loads it. A fixture can keep listening after an OMP session ends; a file can remain after the fixture process exits. Check both states when the distinction matters.

## What about agents that run for hours?

**Long-running work does not require keeping every earlier turn in active context.** A harness can continue across context windows using recent history, summaries, and files it reads when needed. The saved record grows; each request does not have to include all of it.

At a useful stopping point or before a fresh session:

1. **Save what the next step needs:** the goal, decisions and reasons, changed files, checks and their results, open questions, and next action. Reuse an existing progress note if you have one.
2. **Have the continuing agent read it and inspect the current files.** A note saying “tests passed” describes an earlier state, not necessarily today's code.

Keep useful history while it still helps. Compaction can drop a subtle constraint; repeated fresh starts can force the same investigation again. **Preserve progress, not every turn.**

## Manage what stays in context

You don't have to carry every wrong turn into the next request. Keep the context that helps with the task, and change direction when it stops helping.

| When this happens | What to use | What to notice |
| --- | --- | --- |
| The conversation took an unhelpful turn | `/branch` | Go back to an earlier message and try a different request. The old path stays in the session as another branch. |
| You want to return to another conversation path | `/tree` | Browse the session tree and choose where to continue. You're changing the active history, not merging every branch into context. |
| You want a separate attempt with the same starting history | `/fork` | Copy the current conversation into a separate session. Use this when you want to keep the attempts separate, rather than navigate within one session. |
| The task is still relevant, but the conversation is getting long | `/compact` | Reduce older context and keep working in the same session. Don't assume every detail survives; keep important decisions in a file you can read again. |
| You're starting unrelated work | `/new` | Start a new conversation instead of carrying the previous task along. The old session stays saved. |

**Our recommendation:** use `/branch` to retry a request from an earlier point, `/fork` for a separate attempt, and `/new` for a different task. Compact when you still need the conversation—not to keep an unrelated one alive.

**The catch:** these commands change conversation context, not your files. Going back to a message does not undo edits made afterward. Check the working tree before asking the agent to continue from an earlier point.

When `/tree` offers to summarize the branch you're leaving, keep that summary only if its findings help the next attempt. A summary brings some of that branch back into context; it is not a completely clean retry.

For resuming work, clearing context, and the full command reference, see [Sessions and memory](sessions.md#choose-the-operation-deliberately).

[Back to foundations](index.md) · [Previous: Models and roles](models.md) · [Next: Prompting](prompting.md)

## Sources

- [OMP context files and discovery, pinned 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md)
- [OMP session operations: new, resume, fork, fresh, and clear (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/session-operations-export-share-fork-resume.md)
- [OMP compaction and branch summaries (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/compaction.md)
- [OMP branch, tree, and fork command definitions (current source)](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/slash-commands/builtin-session.ts)
- [Chroma: Context Rot](https://www.trychroma.com/research/context-rot) — measured performance changes across input lengths; not a universal intelligence or occupancy rule.
- [Many-Shot In-Context Learning](https://arxiv.org/abs/2404.11018) — evidence that additional relevant examples can improve results.
- [Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — continuity through progress records and verification across sessions.
- [OMP context usage report (current source)](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/slash-commands/helpers/context-report.ts)
- [Research notes: context quality and long-running agents](../../research/2026-10-09-context-quality-and-long-running-agents.md) — evidence, limitations, and the reasoning behind our recommendations.
