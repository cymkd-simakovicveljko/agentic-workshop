# Agentic engineering course — agreed outline

**Status:** The eight-section structure remains agreed. The active teaching route
uses the small [todo app](demo/todo-app/README.md). Teaching depth is restored across
the understand → watch or try → use at work → go deeper path, with decision criteria,
failure cases, executable ordinary commands and source/adaptation notes.
Section 3 is the practical core. Section 8 remains a separate harness and
enterprise example. See the [implemented restoration plan](2026-09-18-content-restoration-plan.md)
and [verification receipt](_build/todo-demo/2026-09-18-content-restoration-verification.md).

## Sections

1. **[Getting started with OMP](sections/01-getting-started-with-omp.md)** — Add a remaining-task count and inspect the result.
2. **[Agentic engineering foundations](sections/02-agentic-engineering-foundations.md)** — Models, agents, tools, context and harnesses through that observed run.
3. **[The everyday workflow](sections/03-the-everyday-workflow.md)** — Specify, implement, verify and review an unfinished-task filter.
4. **[Context and repository knowledge](sections/04-context-and-repository-knowledge.md)** — Repair a stale handoff about the same app.
5. **[Skills](sections/05-skills.md)** — Compare ordinary review with an inline candidate and focused procedure, not an installed course skill.
6. **[Reliable execution](sections/06-reliable-execution.md)** — Reproduce and repair a deliberate blank-task defect.
7. **[Optional flavors](sections/07-optional-flavors.md)** — Compare inline plain OMP, FSAD-style and OpenSpec-shaped artifacts for one requirement; no framework installation required.
8. **[Advanced harness design and enterprise-scale work](sections/08-advanced-harness-design-and-enterprise-scale-work.md)** — Harness engineering plus enterprise change work informed by Michael Feathers.

## Current route

Run `npm install`, `npm run dev`, `npm test`, and `npm run test:e2e` from
`demo/todo-app`. Install Playwright's browser once with `npx playwright install`.
The app is a standalone nested Git repository with `main`, `exercise/<topic>`,
and `solution/<topic>` branches. Learners never need an earlier exercise to begin
the next one. Section 8 instead uses its [separate exporter lab](demo/section-08-harness-and-enterprise-lab.md)
with direct POSIX `mktemp`/`cp` and Node commands, not a course helper or Python.

Use OMP only with an authorized provider, keep credentials out of course material,
and review requested edits and commands. A prepared trace is labelled as prepared;
automated tests are not proof of a provider-backed teaching run.

Resources, source/adaptation notes and optional depth remain in each section.
The [earlier full draft](sections_old/) is historical source, not an active route;
earlier project-directory assets and their receipts also remain historical.
This restoration includes no provider-backed teaching or classroom timing
rehearsal and does not establish whole-course classroom readiness.
