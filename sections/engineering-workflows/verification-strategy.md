# 3.3 Verification strategy

You ask for a small retry fix. The agent comes back with a new retry framework, a fallback that hides the original error, and “All tests passed.” The patch looks organized. You're about to accept it, then notice that the report never says whether a failed request was retried at all.

This is a prepared example, not a recorded run. Two questions remain: does the behavior work, and did the agent add code we should not have to maintain?

**Review what belongs in the change, then verify what it does.** That's our anti-slop approach: catch unsupported behavior, unnecessary complexity, weak tests, and misleading completion claims. We judge observable quality—not whether code looks AI-written. Handwritten code can have the same problems.

## Reject unnecessary work before verifying more of it

A formatter can make a needless abstraction look consistent. A passing suite can miss a new error-swallowing fallback. Neither decides whether the change serves the request.

| What you notice in the diff | What to ask before accepting it |
| --- | --- |
| A new framework, dependency, or wrapper for one use | Which requirement needs it? Does an existing helper already solve the problem? A deliberate boundary may be useful; a hypothetical future use is not enough. |
| A cast, ignored error, or success-shaped fallback | Did we remove the failure, or just make it harder to observe? Check the original contract and the trust boundary. |
| New tests alongside weakened or deleted assertions | Which plausible wrong behavior would now pass? Compare the tests with the requirement, not just with the generated implementation. |
| Unrelated rewrites, duplicate helpers, or comments that restate the code | What does this add to the requested change? Remove supported redundancy without erasing useful rationale or someone else's work. |

OpenAI's [harness-engineering account](https://openai.com/index/harness-engineering/) describes agents copying existing patterns—including poor ones—and the move from repeated manual cleanup to explicit, mechanically checked rules. Borrow that response to a recurring defect, not the whole team's architecture or autonomy model.

**Keep validation, security checks, and intentional compatibility behavior.** “Simplify this” is not permission to delete safeguards. Name the unnecessary part and the evidence before asking for its removal.


### Optional watch: why polished output can still be slop

<a data-youtube-embed href="https://www.youtube.com/watch?v=6qkzlT962es"><strong>Generation Is Cheap, Review Is Expensive: How to Stop Shipping AI Slop</strong></a> — Gabriel Martinez, G2i · AI Engineer World's Fair 2026 · **17 minutes**.

Watch for the decisions a convincing implementation can hide. If you want a shorter starting point, the [prototype-versus-readiness section at 5:25](https://www.youtube.com/watch?v=6qkzlT962es&t=325s) connects directly to our opening scenario. **What still needs deciding or checking before this output belongs in the product?**

The [publisher's talk notes](https://ai.engineer/talks/6qkzlT962es-generation-is-cheap-review-is-expensive-stop) connect small changes, conventions, and visible ownership to review cost. Those are useful practices; the talk's named workflow is not a course requirement or a measured guarantee.

## Start with the claim, not the command

Our recommendation: write the changed requirement as an observable claim, then choose the smallest check that could expose a plausible wrong implementation. For example:

| Claim | Evidence that could support it | What it still would not prove |
| --- | --- | --- |
| A failed request retries once | A focused check observes two attempts, then the expected result | Every production dependency handles retry timing correctly |
| A successful request is not duplicated | A check observes one attempt on success | Behavior under a process crash after sending |
| Existing callers keep their behavior | Relevant unit or integration cases pass against the current interface | Unused callers or undocumented integrations |
| The change is present in the current source | Diff and source inspection at the current commit | Runtime behavior without exercising it |

The key question is not “What checks do we usually run?” It is “What would a wrong change look like, and which check would catch it?” Include an unchanged constraint: a retry fix can pass its new failure case while changing successful requests.

## Know what each check can and cannot say

Use the existing checks first, but do not give them credit for claims outside their reach.

- **Static checks**—types, compilation, and selected lint rules—catch certain code and interface defects without executing the affected behavior. Formatting checks establish style consistency, not correctness. Neither establishes the business requirement.
- **Unit checks** isolate a component and its boundaries, but mocks can hide wiring, configuration, and real-dependency differences.
- **Integration checks** expose wiring, serialization, and configuration problems across real pieces, but cover only their selected paths.
- **Runtime checks**—a command, smoke run, or manual exercise—show behavior in an environment and can reveal packaging or startup issues; one path is not broad coverage.
- **Human review** can catch omitted requirements, unsafe scope, or misleading tests, but only if the reviewer reads the current source and diff.
- **Model review** can suggest cases quickly, but it is a hypothesis source, not independent proof.

Current version matters. A command run before an affected edit is evidence about an earlier state; a cached CI result needs a valid connection to the current inputs. Record the commit or source state, command, relevant environment, and observed result. If you cannot establish that connection, say **unknown** or **not run** instead of upgrading a proposal to a result.

## Use a bounded review and a real feedback loop

Start with the repository's own checks. Simon Willison's [First run the tests](https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/) makes a useful point: establish what the existing suite exercises before treating a new green result as evidence of improvement. Preserve known failures; don't let the agent change an unrelated assertion to make the run green.

For a substantial change, work through this sequence:

1. **Compare the diff with the request.** Include new files and dependency/configuration changes. Identify the desired behavior, a likely failure, and something that must stay unchanged.
2. **Review for supported problems.** Give a fresh reviewer the request, diff, and relevant conventions—not the author's defense of the patch. Inspect its findings before authorizing repairs.
3. **Check the tests themselves.** Ask which assertion fails if the key branch is removed, the wrong error is returned, or an external action runs twice. Executing a line is not the same as checking its effect.
4. **Exercise the changed behavior.** Use the actual CLI, API, or UI when the risk lives in wiring, configuration, or the user interaction. Keep exact commands, inputs, outcomes, and relevant source state.
5. **Repair only demonstrated gaps.** If a justified simplification changes the code, rerun the affected checks. Stop when the agreed behavior is supported and substantive findings are resolved—not when every reviewer has produced another suggestion.

Anthropic's original [code-review procedure](https://github.com/anthropics/claude-code/blob/main/plugins/code-review/commands/code-review.md) separates candidate findings from their validation. Its [test-analyzer prompt](https://github.com/anthropics/claude-code/blob/main/plugins/pr-review-toolkit/agents/pr-test-analyzer.md) focuses on behavioral gaps and meaningful regressions rather than a coverage percentage. Borrow those habits; their plugin commands, model choices, and PR-posting workflow are not OMP prerequisites.

<div class="setup-platforms">
<details>
<summary><strong>A review prompt worth keeping</strong><span>Ask for consequences and evidence, not an automatic cleanup pass.</span></summary>

```text
Review [current diff or explicit baseline] against [request/spec] and the
repo's existing conventions. Read relevant callers and tests. Do not edit.

Look for introduced behavior bugs, weakened checks, violated constraints,
and added complexity that has no supported purpose in this change.
For each finding, give the location, triggering scenario or maintenance
cost, supporting evidence, and the smallest repair or check needed.
Distinguish confirmed findings from questions. "No findings" is valid.
Do not invent a quota, nitpick style, or broaden into unrelated cleanup.
```

If the agent says a wrapper is unnecessary, ask which existing boundary replaces it. If it says a test is weak, ask which incorrect behavior would pass. A second opinion directs investigation; it does not independently prove the implementation works.

</details>
</div>

Use the amount of review the risk needs. A low-risk mechanical change may need source inspection and existing focused checks, not another agent. Security-sensitive or hard-to-undo behavior needs stronger evidence and human judgment.

## Activity: repair the evidence map

The following is a prepared change and report. No command was actually run for this example.

**Change:** `loadProfile(id)` now returns a cached profile for 30 seconds. On a cache miss, it fetches the profile and stores the result. A missing profile must still return the existing not-found error. Existing callers and cache-disabled configuration must remain unchanged.

**Report:**

> Static checks passed. Unit suite passed. The cache works, missing profiles are handled, and the service is safe to deploy. CI ran on the latest code.

**Prepared diff notes:** the agent also added a cache factory with only one implementation and replaced a specific not-found assertion with “returns a value.” These are facts supplied for this exercise, not findings from a real repository.

Write one sentence for each:

1. What would you challenge in the diff before asking for more checks?
2. Which behavioral claim remains unproved, and what small check would expose a plausible wrong implementation?
3. What must the report disclose before you could accept the change?

<details>
<summary><strong>Check your reasoning</strong></summary>

The report does not show which assertions support cache reuse, expiry, the missing-profile error, or unchanged cache-disabled behavior. It also gives no revision for CI.

Challenge the weakened not-found assertion: the agreed error behavior still matters. Ask whether the factory serves a real boundary or duplicates an existing cache facility; one implementation alone is not proof that it should be deleted. Keep that design question separate from whether caching is correct.

Choose one gap rather than designing an entire suite. For the **30-second lifetime**, use a controlled clock: load a profile, change the source value, check that a second read before expiry uses the saved value, then advance beyond expiry and check that a read gets the new value. A cache that never expires would fail this check. Avoid a real 30-second sleep when the existing test setup can control time.

That check still does not establish not-found handling or cache-disabled behavior. If those were not exercised, name them as unchecked. Give the actual command and source state for what did run. “Safe to deploy” is an acceptance decision, not a test result.

</details>

## Choose tools for a specific evidence gap

**Use what the repo and OMP already provide first.** A new tool earns its setup and maintenance cost when it catches a recurring problem the existing checks miss. These are choices for different gaps, not a required stack or an installation exercise.

<div class="setup-platforms">
<details>
<summary><strong>Anti-slop checks beyond “the tests passed”</strong><span>Choose one tool based on the failure you need to expose.</span></summary>

| Gap | Tool or procedure | What the result does—and does not—tell you |
| --- | --- | --- |
| Generated JS/TS repeatedly bypasses useful contracts | [Dillon Mulroy's `anti-slop` Oxlint rules](https://github.com/dmmulroy/anti-slop) | Finds configured patterns such as chained type assertions and selected unnecessary copies. It is an opinionated, vendored ruleset, not an AI detector or universal style standard. Read the rules and adapt the policy; its syntax/scope analysis is not a TypeScript type checker. |
| New files, exports, or dependencies appear unused | [Knip](https://knip.dev/explanations/how-knip-works) | Finds code outside its configured entry/import graph. Verify entry points, generated code, and dynamic loading before deleting anything. “Unreachable in this graph” is not automatically “safe to remove.” |
| A green test might accept a wrong implementation | [Stryker mutation testing](https://stryker-mutator.io/docs/) | Changes code and reruns tests to see which mutations they catch. Scope it to important changed logic. A survivor deserves inspection; it can also be equivalent behavior, so don't chase a universal 100% score. |
| A change may introduce an unsafe input-to-operation path | [Semgrep](https://semgrep.dev/docs/semgrep-code/overview) | Configured rules and supported data-flow analysis find patterns worth investigating. Inspect the rule and actual flow; a clean scan is not proof that authorization or every runtime path is safe. |
| The UI passes unit tests but the journey might fail | [Playwright and Trace Viewer](https://playwright.dev/docs/trace-viewer-intro) | Exercise user-visible behavior and inspect DOM snapshots, network, console, and actions from the run. One browser journey does not establish every error state. Start with OMP's browser tools or the repo's existing browser checks. |

The `anti-slop` project explicitly describes its rules as the author's preferences and has no official npm package. Its installer changes a repo's lint configuration and dependencies; inspecting it is not permission to install it here. The other tools also need configuration appropriate to the project. None is required to finish this lesson.

</details>
<details>
<summary><strong>Make the agent show the running result</strong><span>Turn “I checked it” into commands, observations, and an inspectable artifact.</span></summary>

Willison's [Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/) covers short runtime experiments, browser automation, and evidence capture. Browser-oriented options include [Microsoft's Playwright CLI](https://github.com/microsoft/playwright-cli), [Vercel's agent-browser](https://github.com/vercel-labs/agent-browser), and his [Rodney](https://github.com/simonw/rodney). They are alternatives when your harness lacks the needed capability, not three additions to OMP.

```text
Use this repo's existing run/check commands and available tools to exercise
[changed behavior]. Check [normal case], [failure case], and [constraint].
For a UI, perform the action and inspect the visible result, not just startup.
Record what you ran, the relevant source state, and what you observed.
Keep proposed checks and unverified claims separate from completed checks.
Don't install tools or touch external services without asking.
```

For a reusable demo record, [Showboat](https://github.com/simonw/showboat) captures executed commands and their output in Markdown; its verification operation reruns recorded code and compares outputs. That's stronger than asking the model to write a convincing report, but the document is editable and replay can have side effects. Inspect the commands, use safe data, and check the source state before rerunning it. A captured output still needs to demonstrate the right claim.

</details>
</div>

## Optional repo practice

Pick a small change. Write three claims: new behavior, likely failure, and one unchanged constraint. Review the diff for unsupported additions, then choose a check that would fail for a plausible bad implementation. Use an existing tool first; the catalog above is optional. Record the result and limits. If a check cannot run, say so rather than “should pass.”

## Before you move on

Can you explain why the change is needed, which plausible defect your checks would catch, and what remains unknown? Accept consequential claims only with current, relevant evidence. Neither a polished diff nor a clean tool report makes the acceptance decision for you.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Make evidence part of the change, and prevent recurring low-quality patterns.</span></summary>

- [Code Review in the Age of AI](https://addyo.substack.com/p/code-review-in-the-age-of-ai) — Addy Osmani. Start with “The PR Contract” and “Core Principles”: intent, proof, risk, focused human review, and small changes. Use those practices rather than importing a universal coverage threshold or assuming the article's cited productivity figures apply to your team.
- [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) — Ryan Lopopolo, OpenAI. Read “Enforcing architecture and taste” and “Entropy and garbage collection” for turning recurring review findings into explicit checks. This is one team's experience; borrow enforceable invariants, not its throughput claims, automatic merging, or entire infrastructure.

The main lesson links the corresponding review prompts, test-quality procedure, and tool documentation where you would use them. Choose the source that addresses the gap you found; reading every resource is not part of the exercise.
</details>
<details>
<summary><strong>Optional watch: testing, demonstrations, and code quality</strong><span>See how a coding agent can expose what a passing suite missed.</span></summary>

<a data-youtube-embed href="https://www.youtube.com/watch?v=owmJyKVu5f8"><strong>Engineering practices that make coding agents work — The Pragmatic Summit</strong></a> — Simon Willison · The Pragmatic Engineer · **28 minutes**.

Start with [test-driven development at 6:13](https://www.youtube.com/watch?v=owmJyKVu5f8&t=373s), [manual testing and Showboat at 7:06](https://www.youtube.com/watch?v=owmJyKVu5f8&t=426s), or [code quality at 10:04](https://www.youtube.com/watch?v=owmJyKVu5f8&t=604s). These chapter links come from [Willison's own notes](https://simonwillison.net/2026/Mar/14/pragmatic-summit/).

Ask which short runtime check would expose something the passing tests leave unknown. This is his practice, not a controlled comparison or a promise that tests are maintenance-free. Focus on the verification routine and keep the workshop's supervised permissions.
</details>
</div>
