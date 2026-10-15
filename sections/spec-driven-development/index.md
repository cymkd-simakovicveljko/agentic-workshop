# 4. Spec-driven development

<!-- Draft notes retained for the author:
Spec driven d je u sutstini framework koji ima asne komadne cermonije i korake.

Engineering workflow readiti girll i spec da b ismo imali bolji pristup
-->

[Rules for working with agents](../engineering-workflows/index.md) sets expectations for how agents should work. Here, we turn an agreed change into a spec, a plan, and a checked result.

## 1. What spec-driven development changes

**Write down the behavior you agree on, then use it to direct and check the work.** That's the practice. Frameworks can give it commands and review steps, but you don't need one to start.

Pick a small change you actually want to make. In OMP, opened in that repo, ask:

```text
Help me specify this change: [describe it].
Read the relevant code, tests, and existing planning conventions first.

Draft a short spec using this repo's convention. Include:
- the problem and intended outcome;
- the behavior we want, including important failure cases;
- what must stay unchanged and what is out of scope;
- observable acceptance criteria;
- unresolved decisions, clearly marked rather than guessed.

Ask me about decisions you can't resolve from the repo.
Don't plan the implementation or change code yet.
```

Read the draft. Did the agent turn an assumption into a requirement? Did it add a feature? Resolve those points before agreeing to the spec. If the repo has no convention, one Markdown note is enough.

The difference from a long prompt is what happens next: **the agreed spec remains the reference for planning, implementation, and review.** It isn't discarded once code starts appearing.

## 2. Spec, plan, and tasks have different jobs

- **Spec — what and why:** clearing a search query restores the full lesson list so readers can browse again.
- **Plan — how:** keep the full list and derive the visible items from the query.
- **Tasks — remaining work:** connect the input to the filter; check clearing and keyboard use.

A design can change without changing the intended behavior. Keep that distinction visible, even if all three parts are headings in one file.

**Check your spec:** could someone decide whether each acceptance criterion passed by observing the product? “Implement the filter function” describes work, not success.

## 3. Follow a simple working loop

**Clarify → specify → review → plan → implement → verify.** This is the loop we'll use, not a requirement to specify the whole project up front.

1. **Clarify.** Establish the outcome and constraints. Let the agent investigate repo facts; involve the people who own unresolved product or compatibility decisions.
2. **Specify.** Record the agreed behavior, exclusions, and acceptance criteria. Your draft above is the starting point.
3. **Review.** Challenge the spec before approving it. Check a normal case, a failure case, and something that must not change. Settle decisions that affect the next piece of work.
4. **Plan.** Have the agent read the approved spec and propose the smallest complete slices, affected code, and checks. Review the approach before implementation: does every task serve the spec, and is any required behavior missing?
5. **Implement.** Authorize one slice. Let the agent choose local implementation details within the agreed boundaries. Stop if it needs a new requirement or a consequential design change.
6. **Verify.** Run the relevant checks and exercise the changed behavior. Compare the result with the spec—not just the task list. You decide whether to accept it, request a repair, or revisit a requirement.

After reviewing the plan, use a bounded follow-up:

```text
Implement [approved slice] from [plan], following [spec].
Preserve its constraints and leave unrelated code alone.
Run the planned checks and exercise the changed behavior.
Report actual results, anything unchecked, and remaining work.
Stop for my review before starting the next slice.
```

**Now run the result yourself.** Pick an acceptance criterion and a case the agent didn't demonstrate. Inspect the diff too. A checked task box tells you about reported progress, not whether the behavior is right.

These prompts express review boundaries; they do not enforce permissions. Use [tool policies](../foundations/tools-and-permissions.md#follow-the-request-through-execution) where an action must require approval.

## 4. Keep the spec and code aligned

When they disagree, first decide what kind of problem you have:

- **The code violates an agreed requirement:** fix the code. Don't weaken the spec to make the check pass.
- **The requirement is unclear or needs to change:** have the agent propose the change and its consequences. The decision owner agrees it before implementation continues.

After an agreed change, update the spec, affected plan and tasks, and acceptance checks together. Preserve completed work that still fits. Tell any other workers what changed; editing a shared file doesn't mean they have read it.

For a fresh session, point the agent to the current spec, remaining work, and actual check results. Have it inspect the files before continuing. See [context handoffs](../foundations/context.md).

When the change is accepted, update lasting documentation and close or archive the work using the repo's convention. Mark superseded proposals clearly so the next agent doesn't mistake them for current requirements.

## 5. Know when the process earns its cost

Use a spec when ambiguity, risk, or coordination makes an incorrect assumption expensive: a new feature, a compatibility change, or work spanning people or sessions.

For an obvious, low-risk edit, a clear request and verification may be enough. A typo fix doesn't need a planning ceremony. A one-line change to a public API might.

**Use the smallest process that resolves the uncertainty.** If the next step is already clear, another document isn't progress.

## 6. Tools that support the process

We are using **OMP and the repo's existing conventions**. No additional installation is needed for this lesson.

The approaches below add structure to different parts of the work. Open one only if it addresses a problem you have. These are documented mechanics, not comparative performance claims or workshop-tested integrations.

<div class="setup-platforms">
<details>
<summary><strong>FSAD and FSD: a collaboration method and a separate toolbox</strong><span>When shared decisions need to survive delegation.</span></summary>

[Full Stack Agentic Development (FSAD)](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html) brings product, design, and engineering together to co-author a living spec. Its playbook moves from intent through specification and planning to agent execution and human review.

Use its shared-decision practice when several people own the outcome. Agree before splitting the work; more agents cannot resolve conflicting requirements for you.

[FSD](https://github.com/tbeack/fsd/blob/2cc13c63d7ed08aa16f686126dff7ddfa7052e23/README.md) is a separate **Claude Code plugin** providing skills, agents, commands, and structured spec, plan, and task artifacts. It is not an OMP plugin or an installation prerequisite. Schema validation checks document structure, not whether the product meets the spec.

</details>
<details>
<summary><strong>OpenSpec: separate current behavior from proposed changes</strong><span>When unfinished proposals keep looking like shipped requirements.</span></summary>

[OpenSpec](https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md) keeps current specs in `openspec/specs/` and pending work in `openspec/changes/`. A change contains its proposal, spec changes, design, and tasks. Archiving merges the spec changes into the current specs.

Borrow the distinction even without the tool: make it clear what exists today, what is proposed, and what was accepted. OpenSpec describes its artifacts as “enablers, not gates”; keeping them accurate still requires review.

</details>
<details>
<summary><strong>Kiro: separate requirements, design, and tasks</strong><span>When implementation choices keep being mistaken for requirements.</span></summary>

[Kiro's feature specs](https://kiro.dev/docs/specs/feature-specs/) support requirements-first and design-first workflows. The requirements-first path moves through requirements, design, and tasks, with opportunities to review the artifacts. Its Quick Spec option runs those phases without approval gates between them.

The useful distinction is what you review: desired behavior in requirements, technical choices in design, and coverage of the work in tasks. In OMP, you can make those distinctions in your existing note without adopting another editor.

</details>
<details>
<summary><strong>GitHub Spec Kit: reuse a process across changes</strong><span>When a team repeatedly needs the same planning and review structure.</span></summary>

[Spec Kit](https://github.com/github/spec-kit) supplies structured processes, templates, and agent integrations. Its feature workflow separates a project constitution from per-feature specification, planning, tasks, implementation, and convergence checks. Bug fixing and idea assessment are separate entry points, not mandatory feature-development stages.

Keep reusable project rules separate from one feature's scope. Before adopting the tooling, check its supported integration and assign someone to maintain the guidance. Its commands are not built-in OMP commands.

</details>
<details>
<summary><strong>BMAD: choose the planning the work needs</strong><span>When one fixed process is too much for small changes and too little for larger ones.</span></summary>

[BMAD's planning guide](https://docs.bmad-method.org/plan/choose-a-planning-path/) starts with whether the intent is well defined. Research, product, UX, and architecture work fill specific gaps; they are not mandatory stages. Larger work can be split into ordered stories, with plans and review around each build.

Borrow the sizing decision: investigate the missing constraint before generating more tasks. When a new constraint appears, revise the spec and remaining work rather than blindly continuing the original plan.

</details>
<details>
<summary>Comparison diagram and further reading</summary>

<figure class="course-diagram course-diagram-wide">
<a href="/diagrams/sdd-approaches.svg"><img src="/diagrams/sdd-approaches.svg" width="760" height="706" alt="Five different emphases: FSAD agrees before splitting work; OpenSpec separates current behavior from proposed changes; Kiro separates requirements, design, and tasks; GitHub Spec Kit carries project rules into each change; BMAD chooses planning based on what is unclear." /></a>
<figcaption>Different emphases, not a ranking. <a href="/diagrams/sdd-approaches.svg">Open the full-size diagram.</a></figcaption>
</figure>

For more on existing systems and team adoption: [InfoQ on enterprise spec-driven development](https://www.infoq.com/articles/enterprise-spec-driven-development/), [the AWS community's order-service example](https://builder.aws.com/content/3CqAvQIUtbv3TbYaWitncAz9TGQ/beyond-prompt-to-code-why-enterprise-ai-coding-needs-spec-driven-development), and [Kiro's July 2025 walkthrough](https://kiro.dev/blog/from-chat-to-specs-deep-dive/).

**Source scope:** the FSAD page labels itself v40; the linked FSD README is pinned to version 0.15.0. Other tool links follow mutable documentation. Their descriptions were checked against those sources, not by installing or running the tools. The working loop and adoption advice above are our recommendations.

</details>
</div>

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Understand the different meanings of “spec-driven” before adopting a toolkit.</span></summary>

- [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) — Birgitta Böckeler, on Martin Fowler's site. Read the distinctions between spec-first, spec-anchored, and spec-as-source, and her concerns about review overhead. The tool comparison reflects October 2025, not their current feature sets.
- [Spec-driven development with AI: Get started with a new open source toolkit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) — Den Delimarsky, GitHub. Follow the separation of specification, plan, tasks, and implementation, with human review at each step. Its commands are for Spec Kit, not OMP.

</details>
<details>
<summary><strong>Optional watches: spec-driven development</strong><span>Two perspectives on turning agreed behavior into checked software.</span></summary>

### Optional watch: a use-case-driven approach

<a data-youtube-embed href="https://www.youtube.com/watch?v=odbNXv9xXjc"><strong>Lessons from Spec-driven Development</strong></a> — Simon Martinelli, AI Native DevCon · **32 minutes**.

An existing-system perspective: describe behavior with use cases, establish a domain model, and combine them with architecture guidance. Watch for the difference between extracting what today's system does and agreeing what its replacement should do. An extracted spec still needs review.

### Optional watch: put a specification to work

<a data-youtube-embed href="https://www.youtube.com/watch?v=hy8UstR2NEg"><strong>Full Course: Spec-Driven Development with Coding Agents</strong></a> — Paul Everitt, DeepLearning.AI with JetBrains · **62 minutes**.

Optional depth on planning and checking work against a spec. Watch with your own change in mind. We'll keep using OMP.

</details>
</div>

[Previous: Rules for working with agents](../engineering-workflows/index.md) · [Next: Key productivity tips](../working-with-omp/index.md) · [Back to the outline](../../OUTLINE.md)
