# What comes after OMP setup?

**Recommendation:** introduce model choice, prompts, and context briefly, then use them in one small task. Do not make learners finish three theory lessons before their first run. Equally, do not ask them to copy a prompt without understanding what it authorizes.

Reviewed 2026-09-27. This is a proposal, not an approved lesson rewrite. No main-course lesson or outline was changed during this investigation.

## Where the repository already stands

- [Get Ready](../sections/01-get-ready.md#2-connect-a-model) already connects an approved provider, uses `/model`, checks a response, and introduces approval and interrupt limits. Its exit state is an empty Git repository and working tools for a familiar language—not an existing app.
- [The outline](../OUTLINE.md#the-five-parts) currently puts Make Your First Change next, followed by Understand What Happened. Its first exercise is an in-memory task list: add, complete, list. Deeper prompting/context work belongs to Part 2.
- The [older first lesson](../sections/01-getting-started-with-omp.md#watch-or-try) has useful supervision and verification material, but its existing-app inspection prompt, npm commands, persistence checks, and prepared branches do not fit the new route.
- The [older mechanics lesson](../sections/02-agentic-engineering-foundations.md#understand) supplies useful distinctions between model, harness, context, tools, and evidence. Its request ledger and accounting detail are unnecessary before a first small run.

## What the primary sources actually say

| Source | Observed guidance or sequence | Limit for this workshop |
| --- | --- | --- |
| Anthropic: [Quickstart](https://code.claude.com/docs/en/quickstart), [Best practices](https://code.claude.com/docs/en/best-practices) | Quickstart asks about an existing project before a small change. Best practices stresses runnable verification and explicitly permits skipping plan mode for clear, small changes. | Existing-project exploration does not transfer directly to an empty folder. Vendor practice guidance does not establish the best teaching sequence. |
| OpenAI: [Codex best practices](https://learn.chatgpt.com/guides/best-practices) | A useful request includes goal, context, constraints, and “done when.” Plan first for complex or ambiguous tasks. Keep durable instructions practical and add rules after repeated mistakes. Model-effort advice is model-specific. | Codex defaults, sandboxing, commands, and effort settings are not OMP controls. Do not copy them into this course as universal instructions. |
| AI Hero: [AI Coding Crash Course](https://www.aihero.dev/workshops/ai-coding-crash-course), [cohort schedule](https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w) | The public course description puts LLM concepts, harness understanding, and the engineering loop in that order. The cohort puts tool familiarity before Week 1 fundamentals, steering, and planning. | Public titles/descriptions are not full lesson transcripts or learning-outcomes evidence. This does not support claiming that all comparable courses are action-first. |
| DeepLearning.AI / Anthropic: [Claude Code course](https://www.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant) | Public order includes What is Claude Code?, Setup & Codebase Understanding, Adding Features, then Testing/Error Debugging/Refactoring. | Intermediate course, with Python/Git prerequisites and existing projects. It supports orientation before feature work, not a direct copy of its exercises. |
| Stanford: [CS146S](https://themodernsoftware.dev/), [Week 1 assignment](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week1/assignment.md) | The public first assignment captures and dissects agent traffic, including tools, prompts, context, and recovery, rather than building a new program. | Programming prerequisites and proxy/trace analysis make it a poor first exercise for this workshop. Do not introduce traffic capture or potentially sensitive transcript exports here. |

**Synthesis [INFERENCE]:** a short orientation, guided task, and evidence-based review fits our audience better than either a long theory block or unexplained copy/paste. The sources show different instructional choices; they do not prove which produces better learning.

## Proposed Lesson 2: Your First Agent Task

Working title only. The objective is: **give the agent a bounded request, observe its actions, and decide whether the result meets the request.**

### 1. Explain what the learner is controlling

Use a short explanation before the first prompt:

- **Model:** generates responses and requests for tool actions. Confirm the approved coding model selected in setup; keep it fixed for this exercise. Defer brand rankings and reasoning-effort comparisons.
- **Prompt:** the request you write. Say what to build, which tools/language are available, what is out of scope, and what result would count as correct.
- **Context:** information supplied to the model, including the request, instructions, relevant conversation, and tool results. The model does not automatically see every file on disk.
- **OMP and tools:** OMP coordinates the interaction and executes permitted tool actions. A written instruction is not a sandbox; keep the setup lesson's approval policy and disposable workspace.

An empty project is not an empty context. OMP can load user and ancestor instruction files automatically. Its pinned [context-file guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md) documents that behavior; its [provider guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/providers.md) distinguishes provider from model. Explain the distinction without making learners configure instruction files now.

### 2. Turn the task-list brief into a request

The learner supplies their familiar language/runtime. The request names add, complete, and list behavior, with completion state visible. Keep the task data in memory, with no database, web interface, persistence, or new dependencies.

Include concrete expected behavior before implementation: start empty, add two tasks, complete one, then list both tasks with exactly one complete. The learner should be able to predict this result without reading generated code.

The final lesson must specify how to exercise the program. A small terminal interaction is one suitable proposal; an executable demonstration is another. Whichever is chosen, perform the sequence within one process so in-memory data survives between operations. Do not accidentally require separate command invocations to retain state.

No mandatory plan document or separate planning turn for this bounded task. If genuine ambiguity appears, resolve it before editing rather than treating “action-first” as permission to guess.

### 3. Observe the run

Ask learners to identify actual edits and command results, and inspect any approval request before allowing it. Do not promise a fixed tool sequence or manufacture a failure. Stop unrelated work; check what already happened before continuing.

### 4. Check independently

Run the program or its small executable check, compare it with the predicted behavior, and read the generated source. Review new files as well as tracked changes: ordinary `git diff` alone does not show untracked file contents in a new repository. A final “done” message is not proof.

A full test framework is unnecessary for this first exercise. The check must exercise real task state, not just print a hard-coded expected transcript.

### 5. Explain what happened

Connect one visible tool result to a subsequent action or conclusion. Ask what came from the learner's request, what was supplied by tools, and what remains unverified. If the result is wrong, give one concrete correction with observed output; if it is right, do not invent a bug.

Keep the next planned lesson, Understand What Happened, for the fuller model/harness loop and session-state distinctions. Part 2 can then teach sharper prompts and context selection against actual files the learner now has.

## Defer, rather than omit

Model comparisons and cost/latency tradeoffs; context-window accounting and compaction; persistent instruction authoring; skills/subagents/MCP/hooks; formal spec/plan files and full testing strategy. Introduce these when a later task creates a reason to use them.

## Evidence and remaining decisions

Repository material and the linked primary pages were inspected. No paid course content was accessed, no learner trial was run, and no fresh model-provider run was performed. The sequence is a recommendation, not a measured learning result. Before publication, settle the exercise interaction shape, rehearse the brief with the workshop's approved model and representative learner tools, and check that learners can verify the result without trusting the agent's summary.
