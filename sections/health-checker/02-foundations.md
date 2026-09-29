# 2. Agentic engineering foundations

**Main path:** understand the pieces behind agentic work, then use them to make better requests and judge the results.

Section 1 got OMP connected. The pages here use concrete examples, including a website health checker, to explain the mechanics. You do not need to have built that checker to read them; the [guided example](01-getting-started.md) is available when you want to try it.

By the end, you should be able to:

- explain what the model, provider, harness, agent, prompt, context, tool, and feedback each contribute;
- separate a proposed action, an executed action, an observed result, and a conclusion;
- choose useful context instead of dumping every file into a request;
- choose a model by availability, task fit, evidence quality, cost, and effort;
- treat code, reports, plans, diagrams, and other produced files as artifacts that need inspection.

## The eight topics

Read these in order. Each page stands alone, but each one uses the same health-checker boundary and links to the next decision.

1. [Models and roles](../foundations/models.md) — Choose a model for the job and assign models to OMP roles.
2. [Context](../foundations/context.md) — Select information that changes the next decision.
3. [Prompting](../foundations/prompting.md) — Give clear goals, examples, and boundaries.
4. [Tools and permissions](../foundations/tools-and-permissions.md) — Distinguish requested actions from executed work.
5. [Sessions and memory](../foundations/sessions.md) — Continue, reset, branch, and hand off work without losing the important parts.
6. [Artifacts](../foundations/artifacts.md) — Keep useful outputs in files and inspect what was produced.
7. [Skills](../foundations/skills.md) — Reuse procedures and know when to create one.
8. [MCP, plugins, and extensions](../foundations/mcp-and-plugins.md) — Connect tools and understand what an installed package adds.

## Apply the map to an example

For a run you have observed—or the [prepared example in Artifacts](../foundations/artifacts.md)—find one model request, one tool action, one returned result, and one claim in the final report. Ask:

- Did the model propose the action, and did OMP actually execute it?
- Which context reached that interaction: the request, instructions, files, or command output?
- Is the claim backed by a current command and the current files, or is it only a report?

If you have no saved transcript, use a clearly labelled prepared trace from [Artifacts](../foundations/artifacts.md). It is a teaching example, not a provider recording and not private model reasoning.

Keep the exercise contract in view: `/healthy` is the passing baseline, `/wrong-body` proves that status alone is insufficient, `/redirect` must not be followed, and `/slow` is a timeout/transport failure rather than an invented HTTP status. The [fixture guide](../../demo/health-checker/README.md) remains the source of truth.

## A compact loop

The engineer sets the goal and authority. The model proposes a response or action from the supplied context. OMP, the harness, applies its policy and invokes tools when permitted. Tool results become feedback for the next model step. You inspect the changed files and run the relevant checks before accepting the result.

<figure class="course-diagram">
<a href="/diagrams/agent-loop.svg"><img src="/diagrams/agent-loop.svg" alt="Agent loop: the engineer supplies a goal; OMP sends context to the model, executes permitted tool requests, and returns tool results for the next model response." /></a>
<figcaption>The model requests an action; the harness executes it and returns the result.</figcaption>
</figure>

The exact order can differ. A model may inspect first, write first, be denied a tool, or stop at a limit. Describe only the visible request, tool activity, returned result, and files; never claim to have inspected private reasoning.

Then move to [Key productivity tips](../working-with-omp/index.md) for voice input, keyboard controls, phone access, and managing agents. Foundations explains what is happening; that section helps you get comfortable doing it.

## Sources and adaptation

The definitions and examples build on the health-checker run and its local [fixture contract](../../demo/health-checker/README.md). Each topic links to the relevant OMP documentation. These pinned **18.2.9** references provide the original course baseline:

- [OMP README and installation](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install)
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md)
- [Providers and model selection](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/providers.md)
- [Context files and discovery](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md)
- [Approval modes and limits](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)

These sources describe documented behavior for that pinned source. They do not certify provider access, model quality, local permissions, or a learner's run.

[Back to Getting started with OMP](../01-getting-started-with-omp.md) · [Optional checker example](01-getting-started.md) · [Next: Models and roles](../foundations/models.md) · [Back to the outline](../../OUTLINE.md)
