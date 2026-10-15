# From Autocomplete to Agentic Engineering

**Use a coding agent to build something, understand its work, and check the result.**

For engineers who are new to AI or mainly use autocomplete. We use OMP in a terminal alongside your usual editor, with practical examples for each lesson.

Start with the introduction, then install and connect OMP in section 1. There is no mandatory course-wide project.

## Start here

<div class="course-lessons">

1. **[Introduction](sections/introduction.md)** — What changes when an agent can read files, edit code, and run commands.

## The five sections

1. **[Getting started with OMP](sections/01-getting-started-with-omp.md)** — Choose a terminal, install OMP, and connect a model.
2. **[Agentic engineering foundations](sections/foundations/index.md)** — Understand the parts behind agentic work.
   1. **[Models and roles](sections/foundations/models.md)** — Choose models and assign them to jobs in OMP.
   2. **[Context](sections/foundations/context.md)** — What the model sees, what persists, and what to keep.
   3. **[Prompting](sections/foundations/prompting.md)** — Give direction, supply examples, and refine a request.
   4. **[Tools and permissions](sections/foundations/tools-and-permissions.md)** — Understand tool calls, approvals, and actual execution.
   5. **[Sessions and memory](sections/foundations/sessions.md)** — Manage conversations, retrieve context, and understand OMP memory, RAG, and retrieval stores.
   6. **[Artifacts](sections/foundations/artifacts.md)** — Save results as files, reuse them as memory, and organize specs, decisions, tasks, and progress.
   7. **[Skills](sections/foundations/skills.md)** — Reuse a procedure, compare four engineering skill packs, and evaluate what helps.
   8. **[Evals](sections/foundations/evals.md)** — Check AI answers against clear criteria, then check whether the judge gets them right.
   9. **[MCP, plugins, and extensions](sections/foundations/mcp-and-plugins.md)** — Connect capabilities and understand how they are packaged.
3. **[Working with agents in a real codebase](sections/engineering-workflows/index.md)** — Investigate behavior, recognize failures, verify changes, protect boundaries, and work with teammates.
   1. **[Codebase investigation](sections/engineering-workflows/codebase-investigation.md)** — Trace one feature slice, check its running call stack, and turn verified findings into a source-linked wiki.
   2. **[Agent failure modes](sections/engineering-workflows/agent-failure-modes.md)** — Recognize unproductive approaches and recover using new evidence.
   3. **[Verification strategy](sections/engineering-workflows/verification-strategy.md)** — Review agent-generated code for unnecessary complexity and weak tests, then verify its behavior with appropriate tools.
   4. **[Security and data boundaries](sections/engineering-workflows/security-and-data-boundaries.md)** — Inspect data flow, permissions, and containment before enabling agent tools or approving actions.
   5. **[Team integration](sections/engineering-workflows/team-integration.md)** — Coordinate bounded agent work, preserve ownership, and make evidence and merge controls explicit.
4. **[Spec-driven development](sections/spec-driven-development/index.md)** — Turn agreed requirements into a spec, a plan, and a checked result; explore supporting tools as optional depth.
5. **[Key productivity tips](sections/working-with-omp/index.md)** — Voice input, keyboard controls, phone access, and managing agents.
   1. **[Voice input](sections/working-with-omp/voice-input.md)** — Say the rough thought, check the transcription, then submit.
   2. **[Keyboard controls and steering](sections/working-with-omp/keyboard-and-steering.md)** — Direct, queue, interrupt, and inspect work.
   3. **[Working from your phone](sections/working-with-omp/phone-access.md)** — Connect to work running on your computer.
   4. **[Managing several agents](sections/working-with-omp/managing-agents.md)** — Organize sessions, attention, and independent tasks.

</div>


## Practical examples

Each lesson uses a focused example to make its idea concrete. There is no shared course project. Install additional tools only when that lesson’s example needs them. The MCP lesson connects to Microsoft Learn's public, no-authentication documentation server; no additional service credentials or production changes are needed for the guided route.

## How we learn

A short explanation introduces each focused example; deeper mechanics follow once there is a result to discuss. In section 3, recognizable situations lead to a small action, an inspected example, or a decision before revealing the explanation. Optional activities connect the approach to your own repo.

<div class="course-flow" aria-label="The workflow we practice">
<span>Understand</span><span aria-hidden="true">→</span><span>Specify</span><span aria-hidden="true">→</span><span>Plan</span><span aria-hidden="true">→</span><span>Execute</span><span aria-hidden="true">→</span><span>Verify</span><span aria-hidden="true">→</span><span>Accept or revise</span>
</div>

Use the amount of planning the change needs. A small, clear request does not need a planning document. A larger or ambiguous change needs decisions before code.

**Done means evidence, not an agent's summary.** Read generated files, run the program, compare its behavior with the request, and identify what has not been checked.

## Teaching and verification limits

Prepared traces and expected results are labelled. They are not recordings of a provider-backed run. Model access, fresh OS installation, learner-generated implementations, and classroom pacing still need rehearsal with the intended audience.

