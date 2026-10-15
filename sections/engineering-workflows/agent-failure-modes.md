# 3.2 Agent failure modes

You're trying to fix an import that creates duplicate records. The agent claims an existing `dedupeRows()` helper will solve it—but no such helper exists. Its next attempt suppresses the duplicate error. Then it relaxes a test and offers to tidy the import pipeline.

This is a prepared scenario, not a recorded run. After several edits, you have more code but no explanation of whether the input was duplicated, an event was replayed, or two writes raced. Continuing now makes the original failure harder to isolate.

## Stop the speculative fix loop

Our recommendation: stop at the first unsupported move. Preserve the current evidence, name competing explanations, and take one next step that can distinguish them. Retry only when you have new evidence or a changed question.

## A short prepared exchange

This exchange is prepared for practice; it is not an agent transcript.

> **Ticket:** “The same order appears twice after an import retry.”
>
> **Agent:** “I'll use the existing `dedupeRows()` helper to fix it and update the duplicate test.”
>
> **Pause. Choose the next evidence before reading the reveal.** Which step best separates the plausible explanations?
>
> **A.** Ask the agent to try the helper with a different name.
>
> **B.** Inspect the exact input or event identifiers, timestamps, current callers, and the database constraint or error from the failing case.
>
> **C.** Change the test to accept either one or two rows.
>
> **D.** Read a general article about import deduplication.

<details>
<summary><strong>Reveal and reasoning</strong></summary>

**B** is the useful next step. First verify the claimed helper rather than building on an invented premise. Then compare the failing input and event history with the write path: repeated rows within one input, repeated delivery of an event, and concurrent writes suggest different causes. These observations help distinguish them; they do not guarantee a diagnosis. A deduplication helper assumes the problem is in the rows. A relaxed test hides the contract. General advice does not establish what this repository does.

</details>

## Common failures and specific recovery

### Invented APIs or conventions

An agent may mention a helper, configuration key, command, or internal service that sounds plausible but is absent. Treat the name as a hypothesis, not a fact. Search for the symbol and inspect the nearest existing convention. If it is not there, ask the agent to explain the claim with a source location; otherwise remove it from the plan and choose a real seam. Do not create an abstraction merely to make the invented name true.

### Fixing the symptom

Returning an empty result, swallowing an exception, or ignoring a duplicate can make one screen look better while preserving the cause. Reproduce the observable failure, then trace the data and failure path. State what must be true after the change and what error behavior must remain visible. Change the boundary that explains the failure, not the output that hides it.

### Weakening a test

Changing “two records must not be created” to “the import completes” is not a repair if preventing duplicates is still the agreed contract. Preserve that assertion and identify the behavior it protects. If the assertion is itself wrong, resolve the requirement before changing it. Add a focused case when the investigation reveals a missing boundary, such as a replayed event.

### Scope drift

Cleanup, a new abstraction, a neighboring refactor, and unrelated formatting can arrive under the banner of the ticket. Re-state the requested behavior, list what is out of scope, and inspect the diff against that list. Leave unrelated work alone. If the agent already changed it, separate the changes for review; do not delete or revert files you did not create without knowing who owns those changes.

### Stale evidence

Old logs, a previous test result, or a handoff written before the latest edit describes an earlier state. Tie each claim to the current file, input, and result. Re-read the changed path and rerun the smallest relevant check when the change could affect it. Mark anything not rerun as unchecked; a remembered “passed” is not current proof.

### Retrying without new evidence

Repeating the same prompt can produce a different patch, not a better explanation. Keep the failure output and reproduction steps, write down the current hypotheses, and ask for one discriminating observation. If no new observation is available, stop and narrow the problem instead of accumulating attempts.

## Interruption is not undo

Interrupting an OMP turn is not rollback. Switching an OMP conversation branch or starting a new session does not undo files either, and a child process may still be running. Before resuming, inspect the working tree, actual diff, and any process the task started. Identify pre-existing changes and preserve them. If ownership is unclear, pause for a human decision rather than “tidying” the tree.

Do not use destructive cleanup, reset, delete, or overwrite actions as routine recovery. Check the exact target and scope before any consequential action, and require approval where the action can destroy work or data. A read-only request is a boundary for the agent, not proof that no edit happened; inspect the result.

## One lightweight recovery exercise

Use the prepared exchange above, or apply the same method to one small failure in a repository you own. Write two competing hypotheses, then choose one source, log, input, or check that would distinguish them. Inspect that evidence before asking for another change. Your answer is complete when you can say what the evidence ruled in, ruled out, or left unknown.

<details>
<summary><strong>Optional own-repository application</strong> — keep it read-only and bounded.</summary>

Pick one recent agent suggestion that you did not accept. Spend one short pass checking its cited API, assumption, or test against the current files. Record the smallest recovery: keep, replace, or investigate—and the evidence for that choice. Do not broaden the ticket while doing this exercise.

</details>

For the relationship between current files and stale conversation context, see [Context](../foundations/context.md#manage-what-stays-in-context). For prompts that demand evidence instead of confidence, see [Prompting](../foundations/prompting.md#ask-for-evidence-not-confidence).

## Before you move on

Can you name the unsupported assumption and choose evidence that would change the next step? Continue when you have that evidence. If it is unavailable, report the blocker instead of disguising uncertainty with another patch.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Recognize failing agent loops, premature completion, and lost context—and choose a recovery.</span></summary>

- [Best practices for Claude Code: avoid common failure patterns](https://code.claude.com/docs/en/best-practices#avoid-common-failure-patterns) — Anthropic. Read the specific patterns: irrelevant context accumulating, repeated failed corrections, overloaded instructions, plausible but unchecked implementations, and unbounded exploration. Compare their recovery moves with the failure you observed rather than treating another retry as progress.
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Justin Young, Anthropic Engineering. Start with “The long-running agent problem” and “Testing”: agents attempting too much, leaving incomplete work for the next session, declaring success early, and marking features complete without end-to-end checks. The failure-and-solution table connects these observations to smaller increments, durable progress records, and verification.

Borrow the failure patterns, not another harness's controls. Claude Code's reset and rewind commands are not OMP recovery instructions; use [our session guidance](../foundations/sessions.md). The long-running-agent article describes a particular web-app experiment, not a requirement to add its whole initializer workflow to every task.
</details>
</div>
