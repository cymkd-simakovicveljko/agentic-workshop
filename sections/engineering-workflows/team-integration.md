# 3.5 Team integration

You've finished a change with an agent and opened a pull request: “Fixed the export bug. Tests pass. Please review.” Your teammate asks which input failed, whether the output format changed, and what you actually ran. Now they're repeating the investigation you just finished.

This is a prepared situation, not a real pull request. The patch may be correct, but the handoff has transferred avoidable work to the reviewer. Faster implementation helps the team only if the result is also understandable and reviewable.

**Own the outcome even when an agent owns the keystrokes.** Keep the change bounded, make its evidence inspectable, and give the next human a decision—not another investigation.

## Name ownership before opening a PR

Delegation changes who performs steps; it does not change who must understand the result. Name these roles before work starts:

- **Author or decision owner:** the human who understands the request, checks the result, answers reviewer questions, and decides whether the change is ready for acceptance.
- **Agent or contributor:** the worker that investigates or edits within the agreed files, branch, tools, and stopping point.
- **Reviewer:** the person who gives an independent judgment about the current change, with special attention to behavior, constraints, and risk the author may have missed.
- **Merge or release owner:** whoever controls the protected branch, merge queue, deployment, migration, or other consequential next step.

One person can hold more than one role on a small change, but do not let the labels disappear. An agent's completion message is not an approval. A review approval is not permission to merge, deploy, or change data.

Before delegating, give the agent a short boundary:

```text
Goal: [observable outcome]
Must remain true: [compatibility, failure behavior, or untouched area]
Owned files: [paths or subsystem]
Out of scope: [explicit exclusions]
Source of truth: [branch/worktree and current revision]
Stop for review before: [merge, push, deploy, migration, or the next slice]
```

If a requirement or public interface changes, stop and surface that decision. Do not let an agent turn an implementation guess into a team convention.

## Give parallel agents separate ground

Parallel work only helps when ownership is clear. Give each editing agent a bounded slice and its own worktree with a dedicated branch. Two branches in the same working directory do not isolate concurrent edits.

<details>
<summary><strong>Optional: create a separate Git worktree</strong> — no need to run this for the lesson.</summary>

This example assumes an existing `origin/main` reference is the agreed starting point and that the directory and branch names are unused. Substitute your team's actual base; the command does not fetch updates or approve work on that branch.

```sh
git worktree add -b agent/export ../repo-export origin/main
git worktree list
```

The [Git worktree documentation](https://git-scm.com/docs/git-worktree) describes linked working trees with their own `HEAD` and index, while repository objects remain shared. Remove the temporary worktree only after stopping its agent/processes, integrating or otherwise preserving its work, and checking that it has no uncommitted or untracked work you need:

```sh
git worktree remove ../repo-export
```

If removal refuses because the tree is dirty, inspect and preserve the changes; do not add `--force` as routine cleanup. Removing a worktree is not the same as deleting its branch.

</details>

A worktree is isolation from another checkout, not a security boundary. Do not check out the same branch in two worktrees. A worktree does not create new permissions, hide credentials, restrict network access, or protect a shared remote. Two agents can still collide through generated output, an external service, or an unreviewed push. Use the repository's existing access controls and the security lesson's [information and authority boundaries](security-and-data-boundaries.md).

Prefer one owner for a shared interface or generated file. If another slice depends on it, have the first owner report the checked contract and revision before the dependent agent starts. Addy Osmani's [Code Agent Orchestra](https://addyosmani.com/blog/code-agent-orchestra/) describes this pattern—separate file scope, isolated worktrees, and explicit handoffs—alongside tool-specific team features. Borrow the coordination discipline, not its tools, team sizes, or claimed workflow results.

## Keep the change small enough to review

Before handing work over, state the smallest complete slice. After it returns, inspect the exact diff yourself, including unreported files and dependency or configuration changes. A small diff is not automatically safe; every changed line still needs a reason tied to the agreed outcome.

Use a prompt like this for an implementation slice:

```text
Implement only [one logical slice] for [request].
Read [relevant files, callers, tests, and repo conventions] first.
Preserve [unchanged behavior and constraints]. Do not change [out-of-scope paths].
Work only in [branch/worktree]. Do not merge, deploy, publish, or modify shared
policy files.

Before editing, state assumptions and the files you expect to touch.
After editing, report the exact diff paths, revision, commands and observed
results, the behavior you exercised, and what remains unchecked.
Stop for my review before starting another slice.
```

“One logical slice” does not mean one arbitrary line count. Split when the change adds a separate decision, risk, interface, or reviewer question. Keep the system understandable between slices.

## Put evidence in the handoff

A reviewable description lets a teammate decide without guessing:

1. **What changed?** Describe observable before-and-after behavior, not agent activity.
2. **What must remain true?** Name compatibility, failure behavior, data boundaries, and untouched areas.
3. **What evidence exists?** Give the exact commands, observed results, current revision, job scope, environment, and relevant configuration.
4. **What is unknown?** Mark checks not run, unreproduced environments, assumptions, and blockers.
5. **Who owns the next decision?** Name the author, reviewer, service owner, or release owner and the next action.

Use this compact handoff shape:

```text
Change: [observable behavior and why]
Scope: [files, current revision, and anything intentionally untouched]
Evidence: [command or runtime scenario] → [observed result], on [revision/environment]
Limits: [what the evidence does not establish; checks not run]
Next owner: [person/role] — [smallest next decision or action]
```

“CI passed” is incomplete without the revision and check scope. A result from an earlier commit, a different branch, or a different configuration is evidence about that state—not the current diff. If the status cannot be tied to the current source, say **unknown** or **not run** and identify the smallest missing check.

The same discipline applies to onboarding and handoff between sessions. Leave the source-of-truth branch or worktree, current revision, goal and non-goals, changed files, checks and limits, relevant conventions, open questions, and next owner. A transcript can provide context; it does not replace inspecting the current files and diff.

## Ask reviewers for judgment, not a second implementation

The author should remove obvious uncertainty before requesting review. Let automation handle deterministic formatting, types, and repository checks where those checks exist. Ask a human to focus on:

- whether the change solves the requested behavior rather than a nearby problem;
- whether the important failure and compatibility cases still hold;
- whether the design fits the existing callers and conventions;
- whether the change creates operational, data, or ownership risk;
- whether the evidence actually supports the claims in the handoff.

Use a fresh reviewer with the request, current diff, relevant source, and conventions—not only the author's explanation. Keep the pass bounded:

```text
Review the current diff at [revision] against [request/spec] and the repo's
relevant conventions. Read the affected callers and checks. Do not edit,
merge, deploy, or broaden the task.

Look only for introduced behavior bugs, weakened checks, violated constraints,
unsafe scope, or complexity without a supported purpose in this change.
For each finding, give its location, triggering scenario or maintenance cost,
supporting evidence, and the smallest repair or check needed.
Separate confirmed findings from questions. “No findings” is valid.
Do not invent a finding quota, nitpick style, or propose unrelated cleanup.
```

This is a review request, not an enforcement boundary. Anthropic's original [code-review procedure](https://github.com/anthropics/claude-code/blob/main/plugins/code-review/commands/code-review.md) uses high-signal candidate findings, a separate validation step, and an explicit no-issues result. Its GitHub command allowlist, agent names, and comment-posting flow are Claude Code-specific; adapt the review discipline rather than treating the plugin as an OMP command. Its [PR test analyzer](https://github.com/anthropics/claude-code/blob/main/plugins/pr-review-toolkit/agents/pr-test-analyzer.md) similarly asks about behavioral gaps and meaningful regressions, not a universal coverage percentage.

### Optional watch: a layered review workflow

<a data-youtube-embed href="https://www.youtube.com/watch?v=As2xy_cSx00"><strong>How I Review AI-Generated Code</strong></a> — Owain Lewis · **14 minutes**.

The publisher's description separates four layers: deterministic checks, a fresh local agent review, automated checks on every pull request, and human judgment about architecture and business logic. Compare those responsibilities with the controls your repository actually enforces. The video demonstrates the author's configuration; it is not a required installation or proof that any particular tool catches every defect.

## Let repository controls enforce what prose cannot

A prompt can state ownership. Repository settings can block some actions. Inspect which controls are actually enabled rather than describing a desired policy as if it were a gate:

| Control | What it can enforce when configured | What it does not decide for us |
| --- | --- | --- |
| [Pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) | Records comments, approvals, and change requests for a proposed diff. Branch rules can make approvals a merge prerequisite. | Whether the reviewer understood the requirement, whether the evidence is sufficient, or whether approval should trigger release. |
| [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) | Requests owners for files changed by a non-draft PR. With protected-branch settings, it can require approval from a code owner. The file is read from the PR's base branch; users need write access, and teams must be visible with write access. | That the named owner is available, that the rule matches the intended path, or that an owner has inspected runtime behavior. A review request alone is not a required approval. |
| [Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) | Can require reviews, code-owner approval, conversation resolution, and named status checks; it can dismiss stale approvals or require approval after the latest reviewable push. Strict checks can require the branch to be up to date. | That a green check proves the product behavior. Administrators or bypass roles may be exempt unless the repository applies the restriction to them. |
| [Merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) | Rechecks queued changes against the latest base and other queued PRs before merging. GitHub Actions must report required checks for the `merge_group` event, or the queue cannot receive them. | Human acceptance, release readiness, or deployment authorization. It only reasons about the checks and rules configured for the target branch. |

For CI, record the exact check name, provider, base and head revision, configuration, and result. A required status context is a merge gate only because the repository configured it; duplicate job names or a check reported for another revision can mislead or block the queue. Review the current source and the relevant job, not a green badge copied from an earlier handoff.

Keep approvals distinct from merge and deployment. A code owner can approve a file while a service owner still decides whether a migration runs. A merge queue can combine and merge approved changes while a release owner controls production. If the agent can perform any of those actions, use the tool policy or platform permission that enforces the boundary; a prompt cannot do it alone.

## Carry conventions and handoffs forward

At the start of a new session or when onboarding a teammate, point to the current source and ask for a short orientation:

```text
Read [handoff, repo conventions, CODEOWNERS, affected files, and current diff].
Before editing, summarize:
- the intended behavior and explicit non-goals;
- the owner and current branch/worktree/revision;
- conventions and checks that apply;
- open questions, unknown evidence, and the next decision owner.
Do not infer approval from the previous session. Do not edit until the current
files and diff agree with that handoff.
```

Use existing `AGENTS.md`, `CONTRIBUTING`, test commands, and review conventions as the source of truth. If a pattern is missing and several changes need it, propose a small, separately reviewable convention change. Do not let an implementation agent silently rewrite shared rules inside an unrelated feature PR. A shared convention is useful when it removes repeated reviewer questions; it is not useful as a speculative instruction pile.

## Activity: make the handoff reviewable

Here is a prepared vague PR and supplied facts. Do not invent missing evidence.

**Request:** prevent duplicate email sends when a worker retries a job.

**Facts available:**

- The agent changed `jobs/send-email.ts` and one test file.
- The current diff is at commit `d91e7a2`; it is 42 lines, and no other files are reported changed. The report is not an independent working-tree inspection.
- A unit command exited 0 on that commit in local Node 22. The exact command was not recorded.
- The test asserts that a retry returns the existing message ID. It does not establish whether another email was sent.
- No worker process was started, no provider call was made, and CI status for the current branch is not available.
- The idempotency key format is an existing interface, but no reviewer has yet inspected its callers.

**Vague PR:**

> Prevented duplicate sends. Tests pass. Safe and ready to merge.

Rewrite it as a handoff in six lines or fewer. Include the changed behavior, evidence and scope, what remains unknown, and the next owner/action. Then decide whether “ready to merge” follows from the supplied facts.

<details>
<summary><strong>Compare your answer</strong></summary>

One concise answer could be:

> This change aims to prevent duplicate email sends on retries. The reported edits are `jobs/send-email.ts` and one test file. A unit command exited 0 on current commit `d91e7a2` in local Node 22, but its exact invocation is missing. The assertion covers the returned message ID, not the number of sends. Worker/provider behavior, key-format callers, and current-branch CI remain unchecked or unknown. Author: recover the command, inspect the actual diff and callers, and add evidence for duplicate-send prevention before requesting acceptance.

“Ready to merge” does not follow: a plausible duplicate-send path remains unchecked. Do not turn a test assertion into a claim about the implementation or invent a CI result. The reviewer still reviews the change; the author should not delegate missing verification to them by default.

</details>

## Optional repo practice

Take a real small diff—or a clearly labelled prepared diff—and draft its handoff in six lines or fewer. Name the source revision, one behavior the change must preserve, the evidence you actually have, one unknown, and the next owner. Ask a teammate or fresh session to use the bounded review prompt above. “No findings” is a valid answer; revise only where the evidence warrants it.

## Before you move on

Can your teammate see what changed, what supports it, what remains unknown, and who owns the next action? Can you tell which repository rules actually block a merge, rather than repeating a policy someone wrote in a prompt? Keep responsibility for the work you submit. Approval is judgment—not a trigger for an unrequested merge or deployment.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Coordinate agent work, then inspect the rules that can block a merge.</span></summary>

- [The Code Agent Orchestra](https://addyosmani.com/blog/code-agent-orchestra/) — Addy Osmani. Start with “Pattern 1: Subagents” for independent slices, file ownership, and dependency handoffs. Use those coordination ideas where the work genuinely splits; the article's agent counts, tool rankings, and performance claims are not workshop defaults or independently verified results.
- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — GitHub Docs. Check which reviews, code-owner approvals, current status checks, stale-approval rules, and merge-queue requirements are real gates on the target branch.

The first source helps structure delegated work; the second distinguishes a stated team practice from a repository rule that can block an unreviewed or unchecked change. Keep one agent when coordination would cost more than it saves.

</details>
<details>
<summary><strong>Optional watch: testing, demonstrations, and code quality</strong><span>See why a passing suite still needs a small, inspectable demonstration.</span></summary>

<a data-youtube-embed href="https://www.youtube.com/watch?v=owmJyKVu5f8"><strong>Simon Willison: Engineering practices that make coding agents work - The Pragmatic Summit</strong></a> — Simon Willison · The Pragmatic Engineer · **28 minutes**.

If you watched this talk in [Verification strategy](verification-strategy.md), you do not need to repeat it. For team handoff, revisit [manual testing and Showboat at 7:06](https://www.youtube.com/watch?v=owmJyKVu5f8&t=426s) and [code quality at 10:04](https://www.youtube.com/watch?v=owmJyKVu5f8&t=604s), using [Willison's companion notes](https://simonwillison.net/2026/Mar/14/pragmatic-summit/) for context. Ask what small artifact would let your teammate inspect the claim without reconstructing your investigation. These are working practices, not a controlled comparison or permission to replace human acceptance with an agent's report.

</details>
</div>
