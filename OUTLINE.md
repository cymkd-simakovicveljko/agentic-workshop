# From Autocomplete to Agentic Engineering

**Use a coding agent to build something, understand its work, and check the result.**

For engineers who are new to AI or mainly use autocomplete. We use OMP in a terminal alongside your usual editor, with practical examples for each lesson.

Start with the introduction, then install and connect OMP in section 1. There is no mandatory course-wide project.

## Start here

<div class="course-lessons">

1. **[Introduction](sections/introduction.md)** — What changes when an agent can read files, edit code, and run commands.

## The six sections

1. **[Getting started with OMP](sections/01-getting-started-with-omp.md)** — Choose a terminal, install OMP, and connect a model.
2. **[Agentic engineering foundations](sections/foundations/index.md)** — Understand the parts behind agentic work.
   1. **[Models and roles](sections/foundations/models.md)** — Choose models and assign them to jobs in OMP.
   2. **[Context](sections/foundations/context.md)** — What the model sees, what persists, and what to keep.
   3. **[Prompting](sections/foundations/prompting.md)** — Give direction, supply examples, and refine a request.
   4. **[Tools and permissions](sections/foundations/tools-and-permissions.md)** — Understand tool calls, approvals, and actual execution.
   5. **[Sessions and memory](sections/foundations/sessions.md)** — Manage conversations, retrieve context, and understand OMP memory, RAG, and retrieval stores.
   6. **[Artifacts](sections/foundations/artifacts.md)** — Save results as files, reuse them as memory, and organize specs, decisions, tasks, and progress.
   7. **[Skills](sections/foundations/skills.md)** — Reuse a procedure, compare four engineering skill packs, and evaluate what helps.
   8. **[MCP, plugins, and extensions](sections/foundations/mcp-and-plugins.md)** — Connect capabilities and understand how they are packaged.
3. **[Engineering workflows](sections/engineering-workflows/index.md)** — Connect lifecycle responsibilities to FSAD, then practise workflow control, dependencies, bounded loops, and enforced gates.
4. **[Spec-driven development](sections/spec-driven-development/index.md)** — Apply FSAD’s shared-spec practices, distinguish FSD tooling, and compare support for specifications, plans, and tasks.
5. **[Advanced harness design and enterprise-scale work](sections/advanced-engineering/index.md)** — Examine harness boundaries and changes to existing systems.
6. **[Key productivity tips](sections/working-with-omp/index.md)** — Voice input, keyboard controls, phone access, and managing agents.
   1. **[Voice input](sections/working-with-omp/voice-input.md)** — Say the rough thought, check the transcription, then submit.
   2. **[Keyboard controls and steering](sections/working-with-omp/keyboard-and-steering.md)** — Direct, queue, interrupt, and inspect work.
   3. **[Working from your phone](sections/working-with-omp/phone-access.md)** — Connect to work running on your computer.
   4. **[Managing several agents](sections/working-with-omp/managing-agents.md)** — Organize sessions, attention, and independent tasks.

</div>


## Practical examples

Each lesson uses a focused example to make its idea concrete. There is no shared course project. Install additional tools only when that lesson’s example needs them. The MCP lesson connects to Microsoft Learn's public, no-authentication documentation server; no additional service credentials or production changes are needed for the guided route.

## How we learn

A short explanation comes before the first run; deeper mechanics follow once there is a real run to discuss. Each lesson combines explanation, guided work, observable checks, and a connection to day-to-day engineering.

<div class="course-flow" aria-label="The workflow we practice">
<span>Understand</span><span aria-hidden="true">→</span><span>Specify</span><span aria-hidden="true">→</span><span>Plan</span><span aria-hidden="true">→</span><span>Execute</span><span aria-hidden="true">→</span><span>Verify</span><span aria-hidden="true">→</span><span>Accept or revise</span>
</div>

Use the amount of planning the change needs. A small, clear request does not need a planning document. A larger or ambiguous change needs decisions before code.

**Done means evidence, not an agent's summary.** Read generated files, run the program, compare its behavior with the request, and identify what has not been checked.

## Teaching and verification limits

Prepared traces and expected results are labelled. They are not recordings of a provider-backed run. Model access, fresh OS installation, learner-generated implementations, and classroom pacing still need rehearsal with the intended audience.

