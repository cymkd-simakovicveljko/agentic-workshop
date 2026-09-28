# From Autocomplete to Agentic Engineering

**Use a coding agent to build something, understand its work, and check the result.**

For engineers who are new to AI or mainly use autocomplete. We use OMP in a terminal alongside your usual editor. Use a programming language you already know; the shared exercise defines behavior, not a required implementation.

The introduction and setup are prerequisites for the eight sections. The shared exercise is a **website health checker**.

## Start here

<div class="course-lessons">

1. **[Introduction](sections/introduction.md)** — What changes when an agent can read files, edit code, and run commands.
2. **[Get Ready](sections/01-get-ready.md)** — Connect OMP to an approved model and prepare an empty exercise workspace with your familiar language tools.

## The eight sections

1. **[Getting started with OMP](sections/health-checker/01-getting-started.md)** — Build a checker for one URL. Observe the actions and verify the result yourself.
2. **[Agentic engineering foundations](sections/health-checker/02-foundations.md)** — Explain that run: model, provider, prompt, context, tools, harness, and evidence.
3. **[The everyday workflow](sections/health-checker/03-everyday-workflow.md)** — Specify, plan, implement, verify, and review support for several URLs. This is the practical core.
4. **[Context and repository knowledge](sections/health-checker/04-context-and-repository-knowledge.md)** — Choose useful context, correct stale instructions, and resume from current evidence.
5. **[Skills](sections/health-checker/05-skills.md)** — Turn a repeated review procedure into a focused skill and check whether it helps.
6. **[Reliable execution](sections/health-checker/06-reliable-execution.md)** — Reproduce a failure, fix its cause, preserve the check, and recover interrupted work.
7. **[Optional flavors](sections/health-checker/07-optional-flavors.md)** — Compare plain OMP, FSAD-style, and OpenSpec-shaped approaches to the same requirement. No framework installation required.
8. **[Advanced harness design and enterprise-scale work](sections/health-checker/08-advanced-engineering.md)** — Examine harness authority boundaries, or preserve a real consumer while changing an existing system. Two independent advanced routes.

</div>

## The shared project

**“The server returned 200” does not necessarily mean the page works.** Build a tool that checks a URL's HTTP status and expected text, measures elapsed time, and reports whether the check passed.

The [local fixture guide](demo/health-checker/README.md) supplies controlled healthy, missing, error, wrong-content, redirect, and slow endpoints. The fixture uses Bun, already installed for OMP. The checker itself uses your chosen language. Keep its workspace separate from the course repository.

Start with one URL. Add a configuration file for several targets in section 3. Later work uses the same reviewed program; no hidden starter branches or separate language tracks are required. These are sequential exercises: if you skip ahead without a checker, complete sections 1 and 3 first.

Use only the local fixtures or systems you own or are authorized to check. No credentials, production changes, retries, scheduled monitoring, or external integrations are needed for the guided route.

## How we learn

A short explanation comes before the first run; deeper mechanics follow once there is a real run to discuss. Each lesson combines explanation, guided work, observable checks, and a connection to day-to-day engineering.

<div class="course-flow" aria-label="The workflow we practice">
<span>Understand</span><span aria-hidden="true">→</span><span>Specify</span><span aria-hidden="true">→</span><span>Plan</span><span aria-hidden="true">→</span><span>Execute</span><span aria-hidden="true">→</span><span>Verify</span><span aria-hidden="true">→</span><span>Accept or revise</span>
</div>

Use the amount of planning the change needs. A small, clear request does not need a planning document. A larger or ambiguous change needs decisions before code.

**Done means evidence, not an agent's summary.** Read generated files, run the program, compare its behavior with the request, and identify what has not been checked.

## Teaching and verification limits

The lessons and local fixture are course material, not a hosted monitoring service. Prepared traces and expected results are labelled. They are not recordings of a provider-backed run. Model access, fresh OS installation, learner-generated implementations, and classroom pacing still need rehearsal with the intended audience.

The [project guide](PROJECT.md) explains starting states.
