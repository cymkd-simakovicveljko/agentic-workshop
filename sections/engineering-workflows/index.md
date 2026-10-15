# 3. Rules for working with agents

The agent can do the work. You still set the boundaries and decide whether to accept it.

## 1. Surface assumptions before implementing

Before a non-trivial change, have the agent state its assumptions about requirements, design, and scope. Don’t let guesses become requirements.

If instructions conflict, stop. Name the conflict, explain the tradeoff, and settle it before continuing. Facts the agent can look up are its job—not questions for you.

## 2. Build in thin, verifiable slices

One logical change at a time. Implement the smallest complete piece, test it, run it, then move on. Keep the system working between increments.

Reuse existing code. Leave unrelated cleanup alone. Prefer the boring, obvious solution over abstractions for hypothetical future requirements.

## 3. Verify, don’t assume

“Looks right” is not evidence. Require the actual commands, results, and a check of the running behavior.

A skipped check is still unchecked. Recheck after changes that could affect the result—not repeatedly against unchanged code.

Read the diff yourself. Passing tests do not prove that the agent built what you wanted.

## 4. Challenge consequential decisions

A confident answer can still be wrong. For a consequential decision, give a fresh reviewer the work and its requirements—not the author’s explanation of why it is correct.

Ask for concrete failures, unsupported assumptions, and missed cases. Require evidence.

Treat findings as information, not a verdict. Check them before making repairs, and stop when there are no substantive issues left. Don’t run an endless review loop.

## 5. Match the process to the risk

Skip an extensive interview for a clear, mechanical edit. Spend more time on unclear requirements, unfamiliar code, security-sensitive changes, and actions that are hard to undo.

Use only the steps that help with the current task. More planning, more agents, and more reviews are not automatically better.

## 6. Stop and diagnose

When something breaks, stop adding changes. Preserve the error output and reproduction steps.

Reproduce the failure, narrow down where it happens, and reduce it to a small case. Fix the root cause—not the symptom. Keep a regression check and resume only after verification passes.

No speculative edit after edit. Each attempt needs new evidence.

## 7. Delegate outcomes, not keystrokes

State the goal, constraints, and success criteria. Let the agent choose implementation steps within those boundaries—not invent new requirements.

Expect pushback when an approach has clear problems. The agent should name the downside and suggest an alternative, not agree and build something it knows is wrong. You make the informed decision.

## 8. Give the right context at the right time

Have the agent read the relevant code, tests, interfaces, and an existing example before editing. Supply the current error, not pages of unrelated logs. Keep secrets out.

Before starting fresh, preserve decisions, changed files, verification results, open questions, and the next task. The new session should inspect the actual files, not trust the handoff blindly.

**Resetting the conversation does not reset the working tree.** See [context controls](../foundations/context.md#manage-what-stays-in-context).

## 9. Make authority explicit

Decide which local actions the agent may take and which need approval. Require approval before pushing, deploying, deleting data, or other destructive actions.

Use [tool policies and access controls](../foundations/tools-and-permissions.md#follow-the-request-through-execution) to enforce consequential boundaries. A prompt cannot do that alone.

Inspect the exact command, target, and scope before approving. An approved shell command is not a sandbox.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>How experienced engineers keep control while delegating the work.</span></summary>

- [Vibe engineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/) — Simon Willison. Read how testing, code review, manual QA, and clear instructions become more important when an agent can produce changes quickly.
- [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey) — Mitchell Hashimoto. Start with “Reproduce Your Own Work” and “Engineer the Harness” for a practical account of learning what to delegate and giving agents ways to check themselves.

</details>
<details>
<summary><strong>Optional watch: Mitchell Hashimoto’s new way of writing code</strong><span>A working engineer's approach to delegation, review, and learning the tools.</span></summary>

<a data-youtube-embed href="https://www.youtube.com/watch?v=WjckELpzLOU"><strong>Mitchell Hashimoto’s new way of writing code</strong></a> — The Pragmatic Engineer · **1 hour 58 minutes**.

The full interview also covers HashiCorp and Ghostty. For this lesson, start with [how Mitchell uses AI at 1:19:13](https://www.youtube.com/watch?v=WjckELpzLOU&t=4753s), then compare his division of planning, coding, and review with your own workflow.

</details>
</div>

[Previous: MCP, plugins, and extensions](../foundations/mcp-and-plugins.md) · [Next: Spec-driven development](../spec-driven-development/index.md) · [Back to the outline](../../OUTLINE.md)
