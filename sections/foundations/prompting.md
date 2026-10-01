# 2.3 Prompting

**Start with the work you want done, not a prompt formula.** We can ask an agent to explain, compare, investigate, challenge a proposal, or turn rough notes into something another person can use. Writing code is one option, not the whole conversation.

## Try it: make an explanation useful for the next person

Open a repository you know. Choose one small feature or endpoint you can check yourself. You can reuse the investigation from [Context](context.md), or start with this request. Replace the text in brackets before sending it.

```text
Read the code for [feature or endpoint] and explain how it works to a
teammate new to this repository. Point to the entry point, important
dependencies, and relevant tests. Do not change files.
```

Read the answer. **Could you check its claims without repeating the investigation?** Open a cited source and compare it with the explanation. If the answer has no useful references, ask for them.

Now ask for a different kind of result:

```text
Turn that investigation into a Markdown table:
Behavior | Source location | Supporting evidence | Unknown or unchecked

Separate what you read in the code from what you actually ran. Mark
anything not established as unknown. Do not invent results or add claims
just to fill the table. Do not change files.
```

Check one behavior and one boundary or failure case against the sources. Reading a test tells you what it checks; it does not mean the test passed.

**Decide which answer you would send to a teammate.** The table may make gaps easier to spot. The explanation may be easier to understand. Keep whichever serves the next task, or combine them. We are not trying to make every answer longer.

“Do not change files” tells the agent what we want. It is not a permission control. Keep reviewing proposed actions; we cover that distinction in [Tools and permissions](tools-and-permissions.md).

## Ask for the work, not just an answer

Prompting is how we direct the model's work. A useful request says what we need and gives it enough room to choose a sensible approach.

“Explain this function” is fine when an explanation is what you need. But you can also ask:

- **Extract:** which requirements are stated in these notes, and which are still undecided?
- **Compare:** how do these two approaches differ on compatibility and maintenance cost?
- **Challenge:** what evidence would make us reject this proposal?
- **Transform:** turn this investigation into a change brief for a teammate.
- **Implement:** make this bounded change and show the checks you actually ran.

Those are different jobs, not clever ways to phrase the same question. Choose the job before polishing the wording.

### Make the important decisions visible

Before sending a request, ask yourself:

- **What result do I want?** An explanation, a decision, a changed behavior, or a usable document?
- **What does the agent need to know?** Point it to the relevant code, requirement, example, or observed failure.
- **What must stay true?** Name the compatibility rule, scope boundary, or behavior it must preserve.
- **How will I judge the result?** A source I can inspect, a criterion it must meet, or a check I can run?

These are a check on your thinking, not four headings you must paste into every prompt. A small request can be one sentence. An unresolved product decision may need a conversation before we ask for code.

**Add the detail that could change the result.** “Keep the public API unchanged” matters. Prescribing every local variable usually does not. A long prompt can still leave the important decision unstated.

## Choose a shape you can use

Think of the result as a Lego piece. A question and answer can be useful on their own, but we can ask for other shapes that fit into the next piece of work: a comparison for a decision, a checklist for a review, or a brief for implementation.

This is more than decoration. Asking for **claim, evidence, and unknown** tells the model to separate things that a paragraph might blend together.

| If the next step is… | Ask for… | Look for… |
| --- | --- | --- |
| Understand a behavior | A short explanation or ordered sequence | The important steps and their connections |
| Choose an approach | A comparison and recommendation | Shared criteria and a real tradeoff |
| Check an investigation | An evidence table | Sources and visible gaps |
| Accept a change | A checklist | Observable pass or fail conditions |
| Continue the work elsewhere | A change brief | Decisions, constraints, and open questions |
| Feed a program | Data in its expected format | Valid structure and correct values |

**Pick the consumer before the format.** A teammate may need a paragraph and a small table. A program may need JSON. Neither is automatically better.

<aside class="judgment-callout">
<p class="judgment-kicker">When a neat answer looks finished</p>
<p><strong>Check the content, not just the shape.</strong> A source column can contain a bad reference. A checklist can omit the important failure case. Leave room for “unknown” and “not applicable” rather than asking the agent to fill every box with a plausible answer.</p>
</aside>

## Different ways to get there

Start direct when you know what you want. Explore together when you do not. Use examples when a distinction is easier to show than describe. You can change styles halfway through a task.

These are starting points, not scripts to memorize. Replace bracketed text, keep the parts that matter, and check what comes back.

<div class="setup-platforms">
<details>
<summary><strong>Ask directly for a bounded change</strong><span>Use when the outcome is settled and you can name how to check it.</span></summary>

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
<summary><strong>Talk through an uncertain request</strong><span>Use when you know the problem but have not chosen the solution.</span></summary>

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
<summary><strong>Compare options and make a recommendation</strong><span>Use when a list of possibilities would leave you with the same decision.</span></summary>

```text
For [specific change], compare the existing approach with one plausible
alternative. Use compatibility, failure behavior, and maintenance cost
as the criteria.

Return a small comparison table, your recommendation, and the evidence
that would change your recommendation. Mark assumptions. Do not edit files.
```

**Notice:** are the criteria the ones we actually care about? Replace them if not. Ask for the reason behind a tradeoff, not invented scores that make the comparison look precise.

</details>
<details>
<summary><strong>Show the distinction with examples</strong><span>Use when “make it consistent” leaves too much room for interpretation.</span></summary>

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
<summary><strong>Challenge a proposal before building it</strong><span>Use when you need a review, not encouragement.</span></summary>

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
<summary><strong>Turn findings into a reusable change brief</strong><span>Use when someone needs to continue the work without reconstructing the conversation.</span></summary>

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

</details>
</div>

## Habits that keep you out of trouble

Good wording helps, but you also need to recognize how an agent can let you down. We recommend these habits even when the answer looks convincing.

### Treat the first result as a draft

**Do not confuse the first complete answer with the best answer.** Once there is a real diff, plan, or document to inspect, you can ask much better questions about it. What is missing? Which assumption is unsupported? What could we remove?

That does not mean every first answer is wrong or every revision is better. Keep a result that meets the goal. Ask for a specific improvement when you can name a gap, not another rewrite just because the agent can produce one.

### Agreement is not a review

Agents can be too agreeable. “This is a good approach, right?” invites endorsement when what you need is judgment. This tendency to match a user's view rather than prioritize correctness is called **sycophancy**.

**Give the agent permission to disagree, and ask for evidence.** Instead of asking it to validate your preferred solution, try:

```text
Assess this proposal against [requirements]. Which assumptions are supported,
which are uncertain, and what evidence would make us reject it?
Do not agree merely because I proposed it. Do not manufacture objections either.
```

An instruction to be critical is not a cure. Check the reasoning and sources. An agent that always objects is no more useful than one that always agrees.

### Do not rely on “we already discussed this”

Agents can lose track of constraints. A detail may still be in the conversation but get missed, or it may no longer be included after context maintenance. A saved note is not useful unless it gets read.

**Restate the consequential boundary when the job changes.** Before a review or fix, point back to the original goal and ask the agent to reread the current result. For example: “Keep the public API unchanged; review the implementation against the original acceptance criteria.” You do not need to repeat the whole conversation.

If this keeps happening, inspect the context rather than making the prompt louder. The [Context lesson](context.md) covers stale material, summaries, and what actually reaches the model.

### A confident explanation is not execution evidence

An agent can describe why a change should work without having run it. “The tests should pass” and “I ran this command and it passed” are different claims.

**Ask for the command and its result, including what was not checked.** For factual writing, open the cited source. For code, exercise the changed behavior. Another AI review does not replace either.

### Improvement can drift away from the goal

A review can suggest a different design, more abstraction, or another round of wording changes without identifying a problem worth fixing.

**Keep success fixed.** Do not let a revision weaken a test, drop a requirement, or expand scope just to make the result look better. “Could be different” is not the same as “needs improvement.”

## Make it, critique it, fix it

For a meaningful piece of work, separate producing the result from judging it. **Our starting rule: one implementation pass, one focused critique-and-fix cycle, then verification.** Repeat only if a substantive problem remains.

A small correction does not need this whole sequence. If an explanation missed one failure path, ask for that path and its evidence. If code failed, provide the exact command, actual output, and expected behavior.

For work that needs a review, send the prompts below **separately**. Read each result before continuing. Use the same goal, boundaries, and success criteria throughout; a new review pass is not permission to change them.

<div class="setup-platforms">
<details>
<summary><strong>1. Make one inspectable result</strong><span>Set the target, produce bounded work, then pause.</span></summary>

```text
Goal: [what I want]
Scope: [files, feature, or document]
Boundaries: [what must not change]
Success evidence: [observable outcomes or checks]

Read the relevant existing material. Produce the smallest complete result
that meets this goal. Reuse existing patterns; do not add unrequested features.
Save it in [location].

Report what changed and any unresolved assumptions. If a missing decision
would materially change the result or risk, ask before proceeding.
Stop for review; do not start a refinement pass yet.
```

The result should be something you can inspect: a diff, draft, plan, or prototype. “I considered several approaches” is not a substitute for the requested work.

</details>
<details>
<summary><strong>2. Switch explicitly to reviewer</strong><span>Pick one review question. Do not edit while finding problems.</span></summary>

```text
Stop implementing. Review the saved result without editing.
Reread it and the original goal, boundaries, and success criteria.

Focus on [correctness / unnecessary complexity / test quality / clarity].
Report concrete problems: location, why it matters to the goal,
supporting evidence, and the smallest useful correction.

Do not invent findings to fill a list. If there are no substantive
problems, say so.
```

Replace the bracketed focus with the concern that matters now:

| Concern | Review question |
| --- | --- |
| Correctness | What requested behavior is missing or wrong? |
| Complexity | What can we remove without losing behavior? |
| Tests | What plausible bug would these tests miss? |
| Writing | What is unclear, unsupported, or repetitive? |

A second review is useful when it answers a genuinely different question or checks an unresolved problem. A fresh agent is optional; it still needs the original goal, constraints, and current result. Changing agents does not make a finding true.

</details>
<details>
<summary><strong>3. Fix only justified findings</strong><span>Check the review before accepting its suggestions.</span></summary>

```text
Check each finding against the actual artifact before changing it.
Fix valid findings with the smallest appropriate change.
For a mistaken finding or a preference that does not help the goal,
explain why and leave the artifact unchanged.

Preserve the original scope, boundaries, and success criteria.
Do not weaken tests or redefine success.
Save the revised result. Report findings fixed, rejected, or unresolved.
```

The reviewer can be wrong too. Ask what problem a proposed change solves before accepting it. If a finding requires a product decision, make that decision rather than letting the agent quietly choose.

</details>
<details>
<summary><strong>4. Verify the result and stop deliberately</strong><span>Check whether the revision helped, not just whether it changed something.</span></summary>

```text
Verify the result against the original success criteria.
Check that the corrections address the supported findings and preserve
the required behavior.

For code, run relevant checks and exercise the changed behavior.
For factual material, check the claims against their sources.
For writing or design, assess the stated criteria and flag decisions
that still need my judgment.

Separate verified results from inference and anything not checked.
If the criteria are met and no substantive problems remain, stop.
Otherwise identify the remaining problem and the next concrete action.
Do not begin another polishing pass.
```

If the review found nothing worth fixing, skip the fix, not the verification. Keep the earlier version when a revision is worse. Ask for another cycle only when you can name what remains wrong.

</details>
</div>

This is a workflow you can run with ordinary prompts. A [skill](skills.md) can package the procedure later; it does not enforce that every step happens. Start manually so you learn what a useful review and a justified fix look like.

The linked [refinement-loop skill](https://github.com/lexler/skill-factory/blob/main/output_skills/practices/refinement-loop/SKILL.md) provides a related artifact-based approach: save, reread, critique, and revise. It recommends exhaustive repeated polishing. **We use a bounded version here:** stop when the goal is met and the evidence supports it, not when the agent runs out of suggestions.

## Keep the patterns that help

As you work this way, you will recognize requests you make repeatedly. Keep the wording that helps, but leave the task-specific inputs visible. A pattern for comparing designs might keep the criteria and output shape while changing the proposal under review.

**Save a template after it has been useful, not because a template looks more professional.** Before reusing it, check whether its assumptions still fit. Try it on a normal case and a case where information is missing; the second one often exposes instructions that encourage guessing.

OMP supports reusable Markdown commands with arguments. The [command reference](https://github.com/can1357/oh-my-pi/blob/main/docs/slash-command-internals.md) explains how to package a repeated prompt when you need that shortcut. We do not need to configure one for this exercise. [Skills](skills.md) cover reusable procedures later.

## Prompting is an entry point to workflows

So far, we have given one agent a sequence of jobs. We can go a step further: ask it to coordinate other agents, or put code in charge of the sequence.

### 1. Ask the main agent to direct other agent loops

When the harness provides delegation tools, the main agent can start **subagents**: separate agent loops working on bounded assignments. It passes each worker instructions and relevant context, then uses the returned results to decide what happens next. Do not assume a worker sees the whole conversation.

You can describe branches and repetition in ordinary language: **if** a review finds a supported problem, fix it; **otherwise**, verify and stop. That is the beginning of an agent-driven workflow.

For example, after producing a change brief:

```text
Delegate a read-only review of [brief path] to a subagent.
Give it the original goal, boundaries, and success criteria.
Ask it to return concrete gaps with evidence, or say none were found,
then stop its review. It must not edit files.

Check its findings yourself. If a finding is valid, revise the brief;
otherwise leave it unchanged. Verify the result against the original goal.
Use at most one review-and-fix cycle. If a decision is missing, ask me.
```

The main agent interprets these conditions. They are instructions, not executable `if` statements. A worker returning its result also does not necessarily mean its session has been destroyed: completion, parking, cancellation, and release are harness behavior. See [Managing several agents](../working-with-omp/managing-agents.md) for the OMP controls.

### 2. Put code in charge when the rules must hold

In a **code-controlled workflow**, a program decides which step can run next. It can require a check result, enforce an iteration limit, or wait for human approval rather than let the main agent decide whether to continue.

The control rules can be deterministic even though the agents' answers are not. We can also combine the two: code enforces the boundaries while an agent chooses how to complete a step.

**Start with prompts to learn the useful sequence. Use code when a consequential rule needs enforcement.** The same patterns can appear in either approach: chains, conditional routes, independent workers, and review loops.

We develop those patterns in [Advanced: workflow control](../health-checker/08-advanced-engineering.md#workflow-control-agents-and-code), including **directed acyclic graphs (DAGs)** for dependencies without cycles. A repeating review-and-fix loop has a cycle, so not every agent workflow is a DAG.

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
- **Self-correction is not guaranteed improvement.** [Huang et al., 2023](https://arxiv.org/abs/2310.01798) found that self-correction without external feedback could fail or degrade reasoning results. That is different from revising against an actual failing check. Our review loop asks for evidence and keeps a stopping rule.

Our recommendation is practical: choose a shape that helps you inspect or reuse the work, then check its contents. We are not claiming that Markdown headings make a model smarter.

For more exercises, see [Anthropic's interactive prompting tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial). Borrow the practice of trying and checking; some model-specific techniques in older tutorials will not apply to your current setup.

</details>
</div>

## Before you move on

Take the investigation from the opening exercise and turn it into the change brief above. You do not need to invent a feature request: if the next change is undecided, leave it as an open question.

Use that brief for one focused review from the sequence above. **Can you trace a claim to its source, tell what remains unknown, and choose the next action?** Fix a supported problem if you find one, then verify the correction. If the brief already meets the goal, keep it. Do not invent a finding to complete the exercise.

Next, we will look at what happens when the agent turns those instructions into tool calls in [Tools and permissions](tools-and-permissions.md).

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Context](context.md) · [Next: Tools and permissions](tools-and-permissions.md)
