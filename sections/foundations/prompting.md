# 2.3 Prompting

Prompting shapes a request so an LLM can do useful work: explain, compare, build, critique, or coordinate steps. Different tasks call for different approaches.

## Don’t leave the important choices unstated

An LLM generates responses from learned patterns and the available context, so the same request can produce different answers. Training data does not tell it what structure, focus, or output you want.


**If a choice matters to the outcome, make it visible in the request.**

Instead of:

```text
Improve this checkout handler.
```

Try:

```text
Simplify this checkout handler so a teammate can follow its control flow.
Preserve its behavior and public API. Reuse existing patterns and add no
dependencies. Run the checkout checks and report anything not verified.
```

We have not prescribed every implementation step. We have defined what “better” means, what must stay true, and how we will check the result.

Before sending a request, ask yourself:

- **What result do I want?** An explanation, a decision, a changed behavior, or a usable document?
- **What does the agent need to know?** Point it to the relevant code, requirement, example, or observed failure.
- **What must stay true?** Name the compatibility rule, scope boundary, or behavior it must preserve.
- **How will I judge the result?** A source I can inspect, a criterion it must meet, or a check I can run?

These are a check on your thinking, not four headings you must paste into every prompt. A small request can be one sentence.

That is where prompting skills help. **Structure, examples, constraints, and output formats reduce ambiguity and give us something concrete to judge.** They can make results more consistent and useful, but they do not guarantee correctness.

Open-ended questions still have a place. Use them when you want to explore possibilities. When you need a particular outcome, make the consequential decisions explicit, then verify what the agent actually delivers.

Keep consequential thinking and decisions yours. Ask the model to surface options, assumptions, and evidence, then decide what to accept and do.

The linked Kent Beck talk explores this boundary.

<a class="video-card" href="https://www.youtube.com/watch?v=F8fBgDCf2Y4">
<span class="video-card-preview">
<img src="https://i.ytimg.com/vi/F8fBgDCf2Y4/hqdefault.jpg" width="480" height="360" alt="" loading="lazy" referrerpolicy="no-referrer">
<span class="video-card-play" aria-hidden="true">▶</span>
</span>
<span class="video-card-body">
<span class="video-card-label">Further viewing · Prodacity 2026</span>
<strong>Kent Beck: Software Engineering in the Age of AI</strong>
<span>Rise8</span>
<span class="video-card-action">Watch on YouTube ↗</span>
</span>
</a>

## Prompting techniques you can use today

**Start with a direct request. Add examples, a review perspective, or separate stages when the task needs them.** These techniques can be combined.

Open a relevant example below. Each gives you a copyable prompt and something to inspect afterward. Replace bracketed text before sending it.

<figure class="course-diagram course-diagram-wide">
<a href="/diagrams/prompting-strategies.webp"><img src="/diagrams/prompting-strategies.webp" width="1568" height="653" alt="Eight prompting strategies: direct prompting, clarification-first, role or perspective, example-based prompting, critique and refinement, output-format prompting, decomposition and chaining, and chain-of-thought. Each panel illustrates its inputs, result, and an example prompt." /></a>
<figcaption>A visual overview of the techniques. Panel 8’s “think step by step” advice is not a universal recommendation, particularly for reasoning models; see the guidance below. <a href="/diagrams/prompting-strategies.webp">Open the full-size image.</a></figcaption>
</figure>

<div class="setup-platforms">
<details>
<summary><strong>Direct prompting / zero-shot: ask for the result</strong><span>Use when the outcome is settled and no demonstration is needed.</span></summary>

“Zero-shot” means you have not supplied worked examples of the task. You can still provide context, constraints, and success criteria.

```text
Change [specific behavior] so that [observable result]. Read the relevant
code and callers first. Keep [public interface or compatibility rule]
unchanged, and leave [out-of-scope area] alone.

Check [representative case] and [likely failure case]. Report what changed,
what you actually ran, and what remains unchecked.
```

**Notice:** did the agent preserve the boundary, or “improve” unrelated code? Inspect the change and the check results before accepting it. A confident completion message is not enough.

</details>
<details>
<summary><strong>Clarification-first: resolve the important choices</strong><span>Use when you know the problem but have not chosen the solution.</span></summary>

```text
I want to improve [specific behavior], but I have not decided the approach.
Inspect the relevant code first. Explain what it does now and identify
unresolved decisions that would change the behavior, risk, or scope.
Ask me about those decisions before proposing an implementation.
Do not edit files yet.
```

**Notice:** useful questions expose a choice you need to make. Questions answered by the repository usually call for inspection, not another interview. Do not assume the agent will discover every missing requirement; check its assumptions yourself.

</details>
<details>
<summary><strong>Role or perspective: focus on a particular concern</strong><span>Use when you need the viewpoint of a consumer, maintainer, or reviewer.</span></summary>

```text
Review [API change] from the perspective of someone maintaining an existing
client. Read the old and new interfaces and relevant callers.
Focus on compatibility: what could stop working, and under what conditions?
Support findings with source locations. Do not edit files.
```

**Notice:** a role directs attention; it does not grant expertise. “You are a world-class engineer” tells the agent less than a concrete concern such as compatibility. Check that its findings apply to real callers, not hypothetical problems unrelated to this change.

</details>
<details>
<summary><strong>Example-based / few-shot: show the distinction</strong><span>Use when “make it consistent” leaves too much room for interpretation.</span></summary>

“Few-shot” means supplying a small set of examples of the desired task behavior. Include a missing-information or failure case, not just successful outputs.

```text
Turn each run note into one line:
Check | Outcome | Evidence

Use passed, failed, not run, or unknown. Preserve observed facts.
If the note does not establish an outcome, use unknown.

Input: "Ran the parser checks; the command exited 0."
Output: Parser checks | passed | command exited 0

Input: "Skipped the browser check because no browser was available."
Output: Browser check | not run | no browser available

Input: "The import check exited 1: expected 3 records, got 2."
Output: Import check | failed | exit 1; expected 3 records, got 2

Input: "The parser checks should pass now."
Output: Parser checks | unknown | no execution result reported

Now transform these notes:
[paste actual notes]
```

**Notice:** “should pass” is not “passed.” Try a note that is ambiguous or unlike the examples. If the model forces it into the wrong category, improve the rule or add a contrasting example. Examples show the intended distinction; they do not guarantee it will hold for every input.

</details>
<details>
<summary><strong>Critique and refinement: check a concrete result</strong><span>Use when you need a review, not encouragement.</span></summary>

```text
Review this proposal against [requirements or acceptance criteria].
Identify assumptions that could make it fail, and point to evidence
that supports or contradicts them. Distinguish a confirmed problem from
a question worth investigating. Do not invent findings to meet a quota.

Recommend the smallest revision that addresses the supported problems.
Do not implement it yet.

Proposal:
[paste proposal]
```

**Notice:** a second opinion from the model is still a model output. Check the cited source, try the disputed case, or run the relevant check. Asking the same agent to review itself does not make the review independent.

</details>
<details>
<summary><strong>Output-format prompting: make the result reusable</strong><span>Use when someone needs to continue the work without reconstructing the conversation.</span></summary>

Think of the result as a Lego piece. Ask for a shape that fits into the next piece of work: a comparison for a decision, a checklist for a review, or a brief for implementation.

**Pick the consumer before the format.** A teammate may need a paragraph and a small table. A program may need JSON. Neither is automatically better.

```text
Turn the findings about [feature] into a short change brief:

## Current behavior
## Requested change
## Behavior to preserve
## Acceptance checks
## Open questions

Link to the source locations inspected. Separate confirmed facts from
proposals. Leave unresolved decisions open, and mark checks as proposed
unless they were actually run. Do not implement the change.
```

**Notice:** could a teammate use this without guessing a missing decision? Check the brief before passing it on. A reusable document can carry a mistake forward just as easily as a useful fact.

**Check the content, not just the shape.** A source column can contain a bad reference. A checklist can omit the important failure case. Leave room for “unknown” and “not applicable” rather than asking the agent to fill every box with a plausible answer.

</details>
<details>
<summary><strong>Decomposition and chaining: work in inspectable stages</strong><span>Use when the next step depends on findings you should check first.</span></summary>

Decomposition splits the work into smaller tasks. Chaining uses one task's result as input to the next. Send these separately so you can inspect the findings before continuing.

**First, investigate:**

```text
For [proposed change], identify the affected entry points, callers,
and existing checks. Read the relevant code and return source locations,
compatibility risks, and open questions. Do not edit or propose a patch yet.
```

**After checking those findings, continue:**

```text
Using the confirmed findings, propose the smallest implementation plan
for [change]. Preserve [required behavior]. Tie each step to an affected
area and name the check that would show it worked. Do not implement yet.
```

**Notice:** did the second step preserve the confirmed facts and boundaries? A mistaken finding can spread through the chain. Split the task where inspecting an intermediate result helps, not to turn a one-line change into a ceremony.

</details>
</div>

### What about “think step by step”?

**Chain-of-thought prompting** is a well-known technique for eliciting intermediate reasoning before an answer. Do not treat “think step by step” as a universal improvement button. Reasoning models already perform internal reasoning; [OpenAI's guidance for its reasoning models](https://developers.openai.com/api/docs/guides/reasoning-best-practices) recommends direct instructions rather than that extra prompt.

Our recommendation: ask for **assumptions, a concise rationale, relevant calculations, and checks you can inspect**. A longer explanation is not proof of better reasoning.

Two other names you will encounter are **self-consistency**, which compares multiple sampled solutions, and **ReAct**, which combines reasoning with tool actions and observations. Agreement between answers still does not prove correctness. We connect these ideas to voting, agent loops, and [workflow patterns in Advanced](../advanced-engineering/index.md#workflow-control-agents-and-code), rather than treat them as phrases to paste into every request.

**Try one now:** choose an example above, use it on a small task in a repository you know, and check the result against its “Notice” guidance. Keep the result for a focused review later in this lesson.

“Do not change files” is an instruction, not a permission control. Keep reviewing proposed actions; we cover that distinction in [Tools and permissions](tools-and-permissions.md).

### Model-specific prompting

**Keep the goal and acceptance criteria; adjust the guidance when you change models.** The same prompt can produce different verbosity, initiative, and tool use. Even effort settings can change the behavior.

- **OpenAI GPT-6 Astra:** OpenAI reports detailed, heavily formatted replies and a tendency to ask clarifying questions. Specify the answer length and which decisions require your input. See the [GPT-6 prompting guide](https://developers.openai.com/api/docs/guides/latest-model#prompting-best-practices).
- **Anthropic Claude Fable 5.1 / Mythos 5.1:** Anthropic documents dense prose and less frequent search at low effort. Ask for concise explanations and explicitly require source lookup when current facts matter. See the [model-specific prompting guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) and [guides for other current Claude models](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#model-specific-guidance).

These are documented tendencies, not fixed personalities. Use the guide for your exact model, then try one adjustment on a real task. Do not accumulate workarounds for models you no longer use.

## Tips and tricks

Use these habits when the agent sounds convincing, misses a boundary, or gives you an answer that is hard to work with. Better wording helps, but it does not replace checking the result.

### Leave room to iterate

**Treat the first result as a candidate, not a finished deliverable.** Allow time to inspect it: what is missing, which assumption is unsupported, and what could we remove?

Sometimes the first result meets the goal; another rewrite can make it worse. Ask for a specific improvement when you can name a gap, not another revision just because the agent can produce one.

### Ask for judgment, not agreement

Agents can be too agreeable. “This is a good approach, right?” invites endorsement when what you need is judgment. This tendency to match a user's view rather than prioritize correctness is called **sycophancy**.

**Ask for objective, candid judgment rather than confrontation.** We want supported disagreement, not automatic opposition:

```text
Be direct and honest. Assess my proposal rather than validate it.
Challenge unsupported assumptions and explain consequential tradeoffs.
Distinguish facts, inferences, and unknowns. If you disagree, give evidence.
Do not invent objections to appear critical.
```

An instruction to be critical is not a cure. Check the reasoning and sources. An agent that always objects is no more useful than one that always agrees.

### Do not rely on “we already discussed this”

Agents can lose track of constraints. A detail may still be in the conversation but get missed, or it may no longer be included after context maintenance. A saved note is not useful unless it gets read.

**Restate the consequential boundary when the job changes.** Before a review or fix, point back to the original goal and ask the agent to reread the current result. For example: “Keep the public API unchanged; review the implementation against the original acceptance criteria.” You do not need to repeat the whole conversation.

If this keeps happening, inspect the context rather than making the prompt louder. The [Context lesson](context.md) covers stale material, summaries, and what actually reaches the model.

### Ask for evidence, not confidence

Agents can give plausible but false answers, invent references, or describe checks they never ran. “The tests should pass” and “I ran this command and it passed” are different claims. “Be truthful” alone is not enough.

```text
Support factual claims with sources I can inspect.
For checks, report the command and observed result.
Say what remains unverified. Do not present an inference as an observation.
```

Open the cited source. For code, exercise the changed behavior. Another AI review does not replace either.

### Put checkpoints before consequential decisions

Agents can skip requirements or choose an approach without making the choice visible. Name the decisions where they must pause:

```text
Inspect the existing behavior first. Before changing the public API,
data model, or scope, show me the proposed decision and its tradeoff.
Wait for my choice before implementing that change.
```

Choose boundaries that matter to your task. That is more useful than prescribing every implementation step. A prompting checkpoint is still an instruction, not an enforced permission boundary.

### Improvement can drift away from the goal

A review can suggest a different design, more abstraction, or another round of wording changes without identifying a problem worth fixing.

**Keep success fixed.** Do not let a revision weaken a test, drop a requirement, or expand scope just to make the result look better. “Could be different” is not the same as “needs improvement.”

<aside class="judgment-callout">
<p class="judgment-kicker">Voice and tone</p>
<h3>Make the answer easier to read</h3>
<p>Ask for a language, tone, structure, and level of detail that helps you work. You can ask for another language while keeping code identifiers and commands unchanged, or use this starting point:</p>
<pre><code class="language-text">Lead with the recommendation. Use the principles of ASD-STE100
Simplified Technical English: short sentences, direct instructions,
and consistent terminology.
Preserve exact technical terms, code identifiers, commands, and
important caveats. Explain unfamiliar terms once.
Use bullets for actions and tables when they clarify a comparison.
Avoid hype and filler.</code></pre>
<p><a href="https://www.asd-ste100.org/">ASD-STE100</a> is a controlled language for technical documentation. This prompt borrows its principles; naming the standard does not guarantee compliance with its vocabulary and writing rules.</p>
<p><strong>Change the presentation without asking it to hide uncertainty.</strong> Try the style on a real answer. If it becomes too terse to act on, ask for the missing explanation rather than abandoning the useful structure.</p>
<p><strong>Use visual markers for things you need to notice.</strong> A star can flag a decision waiting for you; a checkpoint marker can flag a pause before the agent proceeds. Give each marker a consistent meaning so you can scan a long conversation:</p>
<pre><code class="language-text">Use ⭐ Decision needed when you need me to choose.
Use 🛑 Checkpoint before an action that requires my approval.
State the decision or proposed action in words beside the marker.
At a checkpoint, wait for my response before proceeding.
Reserve these markers for those situations, not decoration.</code></pre>
<p>If everything is highlighted, nothing stands out. Keep the text labels so the meaning does not depend on recognizing the emoji. The marker helps you notice a checkpoint; it does not enforce one.</p>
<p>In the <a href="skills.md">Skills lesson</a>, we’ll look at turning repeated guidance into reusable skills. Communication skills such as <a href="https://github.com/ayghri/i-have-adhd"><code>i-have-adhd</code></a> for action-first answers and <a href="https://github.com/JuliusBrussee/caveman"><code>caveman</code></a> for highly compressed wording are examples of how to package voice and concision preferences. Try one style at a time, and judge it by whether you can act on the answer, not just how short it is.</p>
<p><a href="https://github.com/cymkd-simakovicveljko/clear-cut"><code>clear-cut</code></a> asks for compact, direct explanations that preserve the reasoning and uncertainty, challenge unsupported assumptions, and leave decisions with you.</p>
</aside>

## Check the result, then decide what needs changing

Start by checking the result against what you asked for. For code, inspect the change and exercise the affected behavior. For an explanation, follow its source references. For a proposal, check its assumptions and tradeoffs.

If you find a gap, give the agent concrete feedback: the failing command, the missing requirement, the unsupported claim, or an example of the behavior you expected. Ask it to address that gap while preserving the original boundaries.

```text
I checked [specific behavior or claim].
Expected: [required outcome].
Observed: [actual result, command output, or conflicting source].

Investigate the cause and correct the supported problem.
Preserve [original behavior and scope boundaries].
Repeat the check that exposed it and check the affected behavior.
Report what you verified and anything still unresolved.
```

**Notice:** did the correction address the original problem, or just change the explanation or weaken the check? Inspect the result yourself. If your expectation was mistaken, resolve that against the requirement rather than asking the agent to force a match.

Use an agent review when you have a specific concern worth investigating, such as compatibility or error handling. Name that concern, ask for evidence, and check the findings before acting on them. A critique is another assessment, not verification; asking the same model again does not necessarily expose its mistakes.

**Keep a result that meets the goal. Revise because there is a supported problem, not because another prompting step is available.**

**Use OMP’s native controls when the work needs automatic continuation.** You do not need a separate skill just to repeat a prompt or keep an objective active:

- **[`/loop`](https://omp.sh/docs/modes)** resubmits a prompt after each yield. Bound the repetition by a count or duration, or use a command’s exit status as the continuation condition.
- **[`/goal`](https://omp.sh/docs/goal)** maintains a persistent objective for the session, with controls to set a token budget, pause, resume, or drop it.

A skill can supply reusable instructions for the work; these commands control continuation. Neither proves the result is correct. Define a checkable outcome and appropriate limits instead of asking for endless polishing.

## Keep the patterns that help

As you work this way, you will recognize requests you make repeatedly. Keep the wording that helps, but leave the task-specific inputs visible. A pattern for comparing designs might keep the criteria and output shape while changing the proposal under review.

**Save a template after it has been useful, not because a template looks more professional.** Before reusing it, check whether its assumptions still fit. Try it on a normal case and a case where information is missing; the second one often exposes instructions that encourage guessing.

OMP supports reusable Markdown commands with arguments. The [command reference](https://github.com/can1357/oh-my-pi/blob/main/docs/slash-command-internals.md) explains how to package a repeated prompt when you need that shortcut.

<a class="video-card" href="https://www.youtube.com/watch?v=pP_dSNz_EdQ">
<span class="video-card-preview">
<img src="https://i.ytimg.com/vi/pP_dSNz_EdQ/maxresdefault.jpg" width="1280" height="720" alt="" loading="lazy" referrerpolicy="no-referrer">
<span class="video-card-play" aria-hidden="true">▶</span>
<span class="video-card-duration">10:56</span>
</span>
<span class="video-card-body">
<span class="video-card-label">Further viewing · AI Engineer</span>
<strong>The Unreasonable Effectiveness of Prompt Learning</strong>
<span>Aparna Dhinakaran · Arize</span>
<span class="video-card-action">Watch on YouTube ↗</span>
</span>
</a>

The talk’s description outlines a system-prompt learning loop that uses reviews, feedback, and evaluations to update instructions. Watch it as an example of improving reusable prompts from evidence, not as proof that a particular wording always works.

## Prompting is an entry point to workflows

So far, we have given one agent a sequence of jobs. We can go a step further: ask it to coordinate other agents, or put code in charge of the sequence.

### 1. Ask the main agent to direct other agent loops

When the harness provides delegation tools, the main agent can start **subagents**: separate agent loops working on bounded assignments. It passes each worker instructions and relevant context, then uses the returned results to decide what happens next. Do not assume a worker sees the whole conversation.

You can describe branches and repetition in ordinary language: **if** a review finds a supported problem, fix it; **otherwise**, verify and stop. That is the beginning of an agent-driven workflow.

For example, if a change brief leaves you concerned about compatibility:

```text
Delegate a read-only review of [brief path] to a subagent.
Give it the original goal, boundaries, and success criteria.
Ask it to investigate compatibility risks in the proposed change and return
concrete gaps with evidence, or say none were found. It must not edit files.

Check its findings yourself. If a finding is valid, revise the brief;
otherwise leave it unchanged. Verify the result against the original goal.
Use at most one review-and-fix cycle. If a decision is missing, ask me.
```

The main agent interprets these conditions. They are instructions, not executable `if` statements. A worker returning its result also does not necessarily mean its session has been destroyed: completion, parking, cancellation, and release are harness behavior. See [Managing several agents](../working-with-omp/managing-agents.md) for the OMP controls.

### 2. Put code in charge when the rules must hold

In a **code-controlled workflow**, a program decides which step can run next. It can require a check result, enforce an iteration limit, or wait for human approval rather than let the main agent decide whether to continue.

The control rules can be deterministic even though the agents' answers are not. We can also combine the two: code enforces the boundaries while an agent chooses how to complete a step.

**Start with prompts to learn the useful sequence. Use code when a consequential rule needs enforcement.** The same patterns can appear in either approach: chains, conditional routes, independent workers, and review loops.

We develop those patterns in [Advanced: workflow control](../advanced-engineering/index.md#workflow-control-agents-and-code), including **directed acyclic graphs (DAGs)** for dependencies without cycles. A repeating review-and-fix loop has a cycle, so not every agent workflow is a DAG.

## What the courses and research add

The [DeepLearning.AI iterative prompting lesson](https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/so7ui/iterative) demonstrates the habit we want: start with a request, inspect the result, then adjust the audience, details, or output format. Its product-description example eventually becomes structured HTML with a table. That is a teaching demonstration, not a measured productivity claim.

[OpenAI's account of how its teams use Codex](https://openai.com/business/guides-and-resources/how-openai-uses-codex/) describes code investigations and scoped, issue-like requests. It is a useful engineering case study, but it is the vendor's own account. We borrow the working habits, not its historical product controls or a promise of the same results.

<div class="setup-platforms">
<details>
<summary><strong>Read more: structure helps us inspect, but does not prove correctness</strong><span>What the evidence supports, and where the recommendation is ours.</span></summary>

- **Strict output formats have tradeoffs.** [Tam et al., EMNLP 2024](https://aclanthology.org/2024.emnlp-industry.91/) found that format restrictions reduced reasoning performance in several tested conditions. Those results are not a reason to avoid tables. They are a reason not to assume that stricter output always improves the answer.
- **Examples are choices to check.** [Lu et al., ACL 2022](https://aclanthology.org/2022.acl-long.556/) found that reordering the same examples could substantially change classification results. These were older benchmark settings, not today's OMP tasks. Do not treat an example set as universally reliable.
- **A requested format is not an enforced schema.** Asking for JSON in chat does not guarantee it. API features such as [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) enforce supported schemas, but values can still be wrong, and refusals or incomplete responses need handling.
- **Agreement can come at the expense of accuracy.** [Sharma et al., 2023](https://arxiv.org/abs/2310.13548) found sycophancy across five assistants and several tasks. This supports checking endorsement rather than trusting it; it does not establish how often your current model will agree incorrectly.
- **Available context is not always used reliably.** [Lost in the Middle](https://arxiv.org/abs/2307.03172) found that the position of relevant information affected retrieval and question-answering performance. This is not literal human forgetfulness, but it is a reason to keep important constraints accessible rather than assume an earlier mention is enough.
- **Self-correction is not guaranteed improvement.** [Huang et al., 2023](https://arxiv.org/abs/2310.01798) found that self-correction without external feedback could fail or degrade reasoning results. That is different from revising against an actual failing check. Our recommendation is to check the result and revise against supported problems, not require a self-critique cycle.

Our recommendation is practical: choose a shape that helps you inspect or reuse the work, then check its contents. We are not claiming that Markdown headings make a model smarter.

For more exercises, see [Anthropic's interactive prompting tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial). Borrow the practice of trying and checking; some model-specific techniques in older tutorials will not apply to your current setup.

</details>
</div>

## Before you move on

Take the result from the technique you tried and review it against your original goal, boundaries, and success criteria. If you skipped the practical step, choose one example above and run it now.

**Can you trace a claim to its source, tell what remains unknown, and choose the next action?** Check the relevant source or exercise the affected behavior. If you find a supported problem, use the feedback prompt above and verify the correction. If the result already meets the goal, keep it. An extra agent review is not required to complete the exercise.

Next, we will look at what happens when the agent turns those instructions into tool calls in [Tools and permissions](tools-and-permissions.md).

[Back to foundations](index.md) · [Previous: Context](context.md) · [Next: Tools and permissions](tools-and-permissions.md)
