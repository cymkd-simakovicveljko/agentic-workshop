# 5. Optional flavors

Different teams put different amounts of structure around agentic development. These are approaches and tools worth discussing—not a stack we need to install together.

## Approaches to explore

- **[FSAD — Full Stack Agentic Development](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html):** cross-functional teams working from shared specs, with agent execution and human review.
- **[OpenSpec](https://github.com/Fission-AI/OpenSpec):** organize a change around a proposal, requirements, design, and implementation tasks.
- **[Kiro](https://kiro.dev/docs/specs/):** a development tool with a structured spec workflow for turning features into implementation plans.
- **[GitHub Spec Kit](https://github.com/github/spec-kit):** a toolkit of processes and templates for spec-driven work with coding agents.
- **[BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD):** structured AI-assisted development with product, architecture, development, and testing perspectives.

## What we want to compare

- What problem does each approach solve?
- Which decisions and artifacts does it make explicit?
- How much setup and ongoing process does it introduce?
- When is a clear prompt and a small spec enough?
- Which ideas can we borrow without adopting the whole framework?

**Take the useful parts. Extra structure has to earn its place.** These are discussion notes, not an installation guide or a framework exercise.

## Optional watch: a use-case-driven approach

[**Lessons from Spec-driven Development**](https://www.youtube.com/watch?v=odbNXv9xXjc) — Simon Martinelli, AI Native DevCon · **32 minutes**.

Watch this for an enterprise and existing-system perspective, rather than another toolkit walkthrough. Martinelli presents his **AI Unified Process**: describe behavior with system use cases, establish a domain model, and combine those specifications with architecture guidance and stack-specific skills. In his workflow, these guide implementation directly rather than going through a separate generated plan-and-task sequence.

His modernization example starts by extracting use cases and a model from existing code, tests, and documentation, then having business stakeholders review them. The useful distinction is between **what the current system does** and **what the replacement should do**. An extracted specification is a starting point for that conversation, not automatically the right requirement.

**Watch for three things:**

- How actors, preconditions, success scenarios, alternative flows, and postconditions make a use case reviewable.
- Why a specification still needs architecture context, implementation guidance, and checks of the result.
- How he chooses review effort according to the consequences of failure, and works use case by use case rather than specifying everything up front.

**Our takeaway:** try describing one behavior this way and ask a colleague who knows the domain to challenge it. His choices about team size, architecture, and avoiding pull requests are reports from his projects—not defaults we need to adopt.

For a longer guided introduction first, see the [DeepLearning.AI SDD course linked from SDLC](03-everyday-workflow.md#optional-watch-put-a-specification-to-work).

[Previous: SDLC — the everyday workflow](03-everyday-workflow.md) · [Next: Advanced engineering](08-advanced-engineering.md) · [Back to the outline](../../OUTLINE.md)
