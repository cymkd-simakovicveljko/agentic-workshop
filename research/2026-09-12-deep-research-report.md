# Agentic Engineering at HireRight: An Evergreen Zero-to-Hero Course Blueprint

## Executive recommendation

The course should **not** primarily teach “how to use an AI coding CLI.” It should teach **agentic software engineering as an engineering discipline**, with **OMP / Oh My Pi** as the reference implementation.

I verified that the project you mean by “OMP / Oh My Pie” is currently **Oh My Pi**, invoked as `omp`. Its current project positioning is unusually well suited to your goal: OMP describes itself as a coding agent with the IDE wired in, supports more than 60 model providers, exposes built-in development tools, LSP/debugging capabilities, subagents, and extensibility rather than tying the workflow to one model vendor. citeturn15search0

My strongest recommendation is therefore:

> **Teach the engineering model first; teach OMP as the lab environment second.**

The durable curriculum should revolve around this loop:

```text
Intent
  ↓
Discover context
  ↓
Specify
  ↓
Plan
  ↓
Execute
  ↓
Observe ground truth
  ↓
Verify
  ↓
Review / correct
  ↓
Deliver
  ↓
Improve the harness
```

That mental model will survive changes in model vendors and coding agents. It also aligns closely with broader agent-engineering guidance: agents work best when they repeatedly obtain ground truth from their environment, when tools have clear interfaces, when the simplest adequate workflow is chosen, and when human checkpoints and stopping conditions are explicit. citeturn16search0turn19search8

For HireRight, I would organize the material into three conceptual layers:

| Layer | What engineers learn | Expected lifetime |
|---|---|---|
| **Engineering fundamentals** | context, specification, planning, verification, decomposition, tool design, security, evaluation | years |
| **Open interoperability layer** | AGENTS.md, Agent Skills, MCP, structured schemas | likely years, though specifications evolve |
| **OMP adapter layer** | current commands, model configuration, plan mode, task/subagents, OMP-specific workflows | months to a year between meaningful refreshes |

This distinction is crucial. Agent Skills now has an open specification built around `SKILL.md`; AGENTS.md is an open project-instruction format; and MCP has a formal current protocol specification dated July 28, 2026. These are much better foundations for a long-lived enterprise curriculum than teaching a collection of vendor-specific prompt tricks. citeturn18search0turn18search1turn15search2

I would target roughly **16–20 hours of self-paced coursework**, plus three practical clinics and one capstone. Every engineer should complete the first six modules. Staff engineers, architects, platform engineers and interested senior engineers should take the enterprise-harness modules as well.

A useful graduation ladder would be:

| Level | Engineer can… |
|---|---|
| **Agentic User** | safely explore, plan, implement and verify a bounded code change |
| **Agentic Practitioner** | write reusable skills, use specs, structure context and delegate work appropriately |
| **Agentic Engineer** | design tools, evaluations, MCP integrations and reliable multi-agent workflows |
| **Agentic Architect** | build organization-wide context, security and execution infrastructure across thousands of repositories |

The real end state is therefore not “300 engineers know OMP.” It is:

> **300 engineers understand how to engineer reliable human-agent software-development systems, and OMP is the common laboratory in which they learn it.**

## What should remain stable when the tools change

The field is changing extremely quickly, but the underlying architecture is becoming clearer. As of **September 12, 2026**, several developments point in the same direction.

GitHub has published controlled harness evaluations that hold model and task relatively constant while changing the agent harness, demonstrating that the orchestration/tooling layer itself is something that can be independently measured for task resolution, token usage and variability. citeturn19search2turn20search7 OpenAI has similarly started using the explicit term **“harness engineering”**, describing an approach in which repository knowledge, architectural constraints, plans, validation and agent legibility become part of the engineering system rather than merely part of a prompt. citeturn20search2 Its newly announced Agents API on September 10, 2026 likewise foregrounds harness-managed context, tools, durable sessions, sandboxes and subagents. citeturn20search3turn20search6

Those products may change. The architectural lesson probably will not:

> **The model is one component. The harness determines what the model can see, what it can do, how work is constrained, how state survives, and how correctness is demonstrated.**

That should become the central theme of your course.

**Context engineering is replacing “prompt engineering” as the more useful abstraction.** An agent cannot reason effectively about 2,500 repositories by shoving them into one prompt. The objective is to expose the smallest high-signal context necessary for the current decision and let the agent retrieve more just in time. Anthropic describes precisely this progression from prompt engineering toward context engineering and recommends dynamically retrieving relevant context rather than front-loading everything. citeturn19search0

**Agent-readable repository knowledge is becoming infrastructure.** AGENTS.md now provides an open convention for repository instructions such as build commands, testing, conventions and boundaries; nested files can provide increasingly local instructions. citeturn18search1 OpenAI's harness-engineering case study makes a particularly useful pedagogical point: a giant instruction file becomes stale and difficult to verify, so they use a short AGENTS.md as a map into a structured repository knowledge base instead. citeturn20search2

**Skills are becoming portable capability packages rather than clever prompt snippets.** The Agent Skills specification defines a skill as a directory containing `SKILL.md` metadata and instructions, with optional scripts, references and assets. Full skill content can be loaded only when relevant, supporting progressive disclosure. citeturn18search0turn18search4 OMP's current skill system follows the same general model: lightweight skill metadata is discoverable up front while the full file-backed capability can be read on demand, and OMP supports multiple skill discovery layouts rather than forcing everything into one proprietary directory. citeturn17search1

**Specification is becoming the contract between intent and execution.** GitHub Spec Kit's current standard workflow is explicitly `Spec → Plan → Tasks → Implement`, producing structured Markdown artifacts from one stage to the next. citeturn15search3 Kiro independently follows a similar requirements/design/tasks approach, which is useful evidence that this is a pattern rather than a single product feature. The course should therefore teach the artifact flow rather than particular Spec Kit commands.

**Multi-agent is maturing from “spawn lots of agents” into controlled distributed work.** GitHub's recent engineering guidance argues that multi-agent workflows need explicit state, typed schemas, validation and constrained actions. citeturn20search1 More importantly, a June 2026 production A/B test found that making delegation **more selective** reduced tool failures and waiting time without a quality regression in that environment. GitHub's conclusion is exactly the lesson I would teach: delegate when specialization or genuine parallelism creates leverage, not merely because subagents exist. citeturn20search0

OMP already contains primitives for this advanced part of the curriculum. Its current architecture includes first-class subagents, task isolation/worktrees, and persistent worker sessions, while its skill system and tooling support much more sophisticated harness design than basic chat-and-edit behavior. citeturn15search0turn17search2turn17search7

**Long-running state is moving out of chat and into durable artifacts.** Research on long-running coding agents has found that compaction alone is insufficient; successful workflows leave progress, setup, decisions and repository state in artifacts that a subsequent session can inspect. citeturn18search6turn19search4 This maps beautifully onto spec-driven development: a good `spec.md`, `plan.md`, task list, decision log and test evidence become not bureaucracy but **external working memory for humans and agents**.

Finally, **the productivity story remains sufficiently uncertain that your course should teach measurement rather than promise productivity multipliers**. DORA's 2025 research describes AI as an amplifier of existing organizational strengths and weaknesses and argues that returns depend on the surrounding software-delivery system, not merely the AI tool. citeturn19search3 METR's 2026 work also illustrates how difficult it remains to obtain stable productivity estimates: its survey found large self-reported gains but explicitly warns that perceived gains may overstate actual gains, while its updated controlled-experiment work changed methodology because the rapidly changing environment made reliable estimation difficult. citeturn18search3turn18search7

That leads to a good philosophical statement for the course:

> **Do not teach engineers to believe agents are productive. Teach engineers how to determine when an agentic workflow is productive.**

## Recommended format, tone and course structure

### The tone

I would make this feel like a **staff engineer's field manual**, not an AI certification course.

The writing should be:

**Engineer-to-engineer.** Assume skepticism and intelligence. Avoid “AI will transform everything” language.

**Evidence-first.** Every important workflow ends with observable evidence: test result, typecheck, lint result, diff, benchmark, reproduction, screenshot, deployment check or human review.

**Anti-magic.** Whenever something impressive happens, explain the mechanism:

```text
Not:
"The agent understands your architecture."

Instead:
"The harness gave the agent:
- repository ownership metadata,
- symbol search,
- the local AGENTS.md,
- three relevant files,
- the failing test,
- and a bounded editing tool."
```

**Comparative rather than dogmatic.** Explain why OMP does something, then ask students how they would reproduce the same pattern in another harness.

**Occasionally adversarial.** Give engineers broken instructions, misleading repository documentation, enormous search spaces, flaky tests and malicious tool output. Real competence is the ability to detect when the agent is confidently doing the wrong thing.

The recurring voice should be:

> **“Show me the evidence.”**

### The format

I would **deliver HTML but author Markdown/MDX**.

Do not author the curriculum directly in HTML.

Keep the course itself in Git:

```text
agentic-engineering-course/
├── README.md
├── course/
│   ├── foundations/
│   ├── context/
│   ├── skills/
│   ├── specs/
│   ├── execution/
│   ├── orchestration/
│   ├── enterprise-harness/
│   └── evaluation-security/
├── labs/
├── examples/
├── adapters/
│   └── omp/
├── resources/
└── CHANGELOG.md
```

Render those pages into searchable static HTML through whichever documentation generator fits your internal platform. Markdown/MDX gives you code review, Git history, automated link checking, contributions from engineers and easy migration to another documentation platform.

Every chapter should use essentially the same template:

| Part | Purpose |
|---|---|
| **The problem** | Concrete engineering scenario |
| **Mental model** | Durable concept independent of OMP |
| **Read / watch** | 10–20 minutes of external material |
| **OMP mapping** | How OMP implements the concept today |
| **Lab** | 30–60 minutes of real work |
| **Failure exercise** | Something deliberately goes wrong |
| **Evidence** | How correctness is demonstrated |
| **Transfer question** | “How would you do this without OMP?” |
| **Enterprise note** | Permissions, data, scale, review implications |
| **Further reading** | Optional deeper sources |

At the top of every document I would add metadata such as:

```yaml
title: Planning before execution
level: core
owner: Developer Productivity
last_verified: 2026-09-12
concept_stability: high
omp_dependency: medium
estimated_minutes: 75
prerequisites:
  - context-engineering
  - repository-instructions
```

The particularly important field is **concept stability**. It tells maintainers which pages need quarterly verification and which probably do not.

I would use a rough content ratio of:

```text
70% durable engineering concepts
20% OMP implementation
10% current frontier / experimentation
```

The exact percentages are less important than explicitly separating the three.

### The curriculum

A practical zero-to-hero sequence for HireRight would look like this:

| Module | Outcome | Main lab | Approx. time |
|---|---|---|---:|
| **Agentic Engineering Fundamentals** | Understand agent loop, model, harness, tools, context and feedback | Solve one bounded issue manually and with OMP; inspect every tool call | 1.5 h |
| **Context and Repository Legibility** | Give agents discoverable, minimal, correct context | Add/repair AGENTS.md and compare behavior | 2 h |
| **Portable Skills** | Package repeatable engineering procedures | Build `verify-change` and `investigate-failure` skills | 2 h |
| **Specification and Planning** | Convert vague intent into acceptance criteria and an executable plan | Direct implementation versus spec→plan→execute | 2.5 h |
| **Execution and Verification** | Make evidence part of the implementation loop | Change code, run focused verification, inspect diff, review evidence | 2 h |
| **Subagents and Controlled Swarms** | Decompose only where parallelism/specialization helps | Parallel investigation of independent modules | 2 h |
| **Enterprise Context and Tooling** | Navigate hundreds/thousands of repositories without context explosion | Mock 20-repository enterprise + catalog/search/dependency tools | 3 h |
| **Harness Engineering, Security and Evaluation** | Design reliable organization-wide agent systems | Capstone with bounded tools, threat test and evaluation suite | 3–5 h |

OMP is particularly appropriate for the early modules because its current README describes broad provider support and integrated tools rather than requiring a particular model vendor. citeturn15search0 Its current skill documentation makes skills file-backed capabilities with lightweight discovery and on-demand loading, which maps cleanly onto the skills module. citeturn17search1

For planning, teach **OMP's plan mode as one implementation of a general safety pattern**: exploration and design occur under restricted/read-oriented operations, followed by an explicit transition into execution. OMP's plan-mode implementation blocks destructive shell operations while planning and separates analysis from execution state. citeturn17search0

Do not call the next phase “the `/perform` command” unless OMP actually exposes that command in the version you pin. Conceptually, I would teach:

```text
EXPLORE → SPECIFY → PLAN → APPROVE → PERFORM → VERIFY
```

Here, **perform** means returning to a write-capable execution phase after the plan is accepted. That terminology stays valid even when the CLI syntax changes.

Then introduce subagents. OMP can isolate task execution through worktrees and other isolation backends, making it possible to demonstrate that parallelism is also an **isolation problem**, not merely a prompting problem. citeturn17search2turn17search6

Only near the end would I introduce OMP's more advanced orchestration capabilities such as persistent worker sessions or highly agentic modes. This prevents students from learning “swarm everything” before they understand decomposition, contracts and verification. OMP's current Vibe machinery provides persistent addressable worker sessions and differentiated worker roles, illustrating how far the orchestration layer can go. citeturn17search7

### What to do with Caveman

I would **include Caveman, but explicitly as an optional early case study rather than a foundational HireRight skill**.

Caveman is now a real, fairly substantial third-party skill ecosystem centered on reducing conversational/output verbosity. Its current `SKILL.md` is an excellent compact artifact to inspect because engineers can immediately understand how a skill's frontmatter, activation conditions and behavioral instructions affect an agent. citeturn21search0turn21search2

Its repository publishes claims about large token reductions in its own benchmarks, but these are project-authored measurements and should be treated as such rather than as enterprise evidence. citeturn21search1

Use it for a 20-minute exercise called:

> **“Anatomy of a Skill: Why Caveman Works”**

Then immediately move to more engineering-relevant starter skills.

My recommended **HireRight Starter Skill Pack** would be:

| Skill | Purpose |
|---|---|
| `repo-orient` | Determine project layout, instructions, ownership, build/test entrypoints and relevant components |
| `spec-to-plan` | Turn approved requirements into an implementation sequence |
| `investigate-failure` | Reproduce, gather evidence, identify likely root cause; do not modify code |
| `verify-change` | Inspect diff and run the appropriate focused checks |
| `code-review` | Review against correctness, security, maintainability and local conventions |
| `dependency-impact` | Investigate consumers/dependencies before changing an API |

These skills should follow the portable Agent Skills shape instead of depending on model-specific prompt APIs. The current open specification requires the core `SKILL.md` with YAML metadata plus Markdown instructions and supports optional scripts, references and assets. citeturn18search0 OMP can discover skills from multiple sources, including layouts intended for interoperability. citeturn17search1

That is a much better long-term lesson than teaching twenty trendy community skills.

## Curated reading, documentation and video library

I would keep the required reading intentionally small. Engineers generally will not complete a course composed of fifty external articles. Use roughly **one canonical source per major concept**, followed by optional deeper reading.

### Core required resources

| Topic | Resource | Why it belongs |
|---|---|---|
| Agent mental model | **Anthropic — Building Effective AI Agents** citeturn16search0turn19search8 | Probably the best concise foundation for workflows vs. agents, orchestration patterns, tool feedback and “start simple.” |
| OMP | **Oh My Pi README and docs** citeturn15search0turn17search1 | Current reference for the course's implementation environment and skills. |
| Project instructions | **AGENTS.md** citeturn18search1 | Open, tool-independent convention for repository instructions. |
| Skills | **Agent Skills Specification** citeturn18search0turn18search4 | Portable capability format rather than product-specific prompt files. |
| Context | **Anthropic — Effective Context Engineering for AI Agents** citeturn19search0 | Directly relevant to large repositories and progressive disclosure. |
| Specs | **GitHub Spec Kit** citeturn15search3 | Concrete implementation of Spec → Plan → Tasks → Implement. |
| Tool design | **Anthropic — Writing Effective Tools for Agents** citeturn18search2 | Excellent guidance for designing the internal HireRight tool surface. |
| Long-running work | **Anthropic — Effective Harnesses for Long-Running Agents** citeturn18search6 | Explains durable state, incremental progress and repository artifacts. |
| Integration | **MCP specification** citeturn15search2turn15search6 | Current protocol layer for tools, resources and agent integrations. |
| Harness engineering | **OpenAI — Harness Engineering** citeturn20search2 | Strong case study on agent-readable repos, durable plans and organizational constraints. |
| Multi-agent | **GitHub — Multi-agent workflows often fail** citeturn20search1 | Useful corrective to simplistic “swarm” enthusiasm. |
| Delegation | **GitHub — Selective delegation** citeturn20search0 | Production evidence that subagents should be deliberately chosen. |
| Measurement | **DORA 2025 AI-assisted Software Development** citeturn19search3 | Organizational lens instead of tool-level hype. |
| Security | **OWASP MCP Security Cheat Sheet** citeturn16search3 | Practical enterprise threat model for tool-connected agents. |

There are two especially good pedagogical combinations.

First:

> **Building Effective Agents → OMP**

Students read the general pattern first and then identify how OMP implements the agent loop, tools and subagent patterns. This stops OMP terminology from becoming the mental model itself. citeturn16search0turn15search0

Second:

> **Context Engineering → AGENTS.md → Agent Skills → MCP**

This teaches four different scopes:

```text
Context engineering
    = What should the agent know right now?

AGENTS.md
    = What should an agent know about this repository/path?

Skill
    = How should an agent repeatedly perform this class of work?

MCP/tool
    = What external capability/data should an agent be allowed to invoke?
```

The distinction is one of the most valuable ideas in the entire course. The relevant standards and guidance now explicitly support these concepts: AGENTS.md provides repository guidance; Agent Skills package reusable capability instructions/resources; MCP exposes context and capabilities through a protocol; and modern context-engineering guidance recommends retrieval only as needed. citeturn18search1turn18search0turn15search2turn19search0

### Advanced resources for staff/platform engineers

Aider's **Repository Map** documentation is worth including even though the course does not use Aider. It demonstrates an enduring design pattern: extract important symbols, represent dependencies as a graph, rank relevant portions and only inject what fits the context budget. citeturn19search1turn19search5

Backstage's Software Catalog is useful for the organizational level. Its core model is a centralized catalog of software ownership and metadata backed by source-controlled metadata, and its documentation explicitly targets organizations managing thousands of components. citeturn16search1turn16search5

Sourcegraph's Batch Changes documentation is useful as a design reference for cross-repository execution: first identify affected repositories/code with search, express the intended transformation declaratively, preview changes, produce individual reviewable changesets and then track their checks/review state. citeturn16search2turn16search6

These do not mean HireRight needs to buy or adopt Aider, Backstage or Sourcegraph. They are **reference architectures** students can analyze.

### Video component

Video should be supplementary rather than the canonical source because videos date faster and are harder to update.

I would use three types:

**Spec-driven development demo.** Microsoft's/GitHub's Spec Kit material gives students a visible end-to-end example of moving from specification through implementation. citeturn10search1

**MCP orientation.** Anthropic's MCP presentation gives engineers who do not want to begin with a protocol specification an easier introduction before reading the actual current spec. citeturn10search2

**OMP orientation.** A short community demonstration can help people get comfortable with the terminal UX, but label it **“orientation only — commands may differ from the pinned course version.”** citeturn10search7

For videos especially, never embed important conceptual knowledge only in the recording. The HTML course page should contain the durable explanation.

## Designing the enterprise harness for 2,500 repositories

This should be the signature advanced part of the HireRight curriculum.

The wrong architecture is:

```text
Engineer:
"Find everywhere this API is used across HireRight and migrate it."

Agent:
clone repo 1
grep
clone repo 2
grep
clone repo 3
...
clone repo 2,500
...
context explodes
...
guess
```

The right architecture is **progressive organizational discovery**.

Aider's repository-map design already demonstrates the smaller-scale principle: a whole repository may be too large, so it builds a symbol/dependency representation and returns only the most relevant pieces within a context budget. citeturn19search1 Anthropic's context-engineering guidance independently advocates just-in-time retrieval and keeping high-signal context small. citeturn19search0 At organization scale, a software catalog can provide ownership, component metadata and dependency relationships without first opening repository contents. citeturn16search5

I would therefore teach students to think in **context levels**:

```text
Organization
     ↓
Domain / product
     ↓
Repository
     ↓
Subsystem
     ↓
File
     ↓
Symbol
     ↓
Exact lines / tests / runtime evidence
```

Every downward transition costs context and compute. The harness should descend only when necessary.

### Recommended HireRight context gateway

This is a recommended architecture inferred from the catalog, repository-map, MCP and tool-design patterns above rather than a claim that these exact tools already exist at HireRight. citeturn16search5turn19search1turn18search2turn15search2

```text
                        ┌───────────────────┐
                        │ Engineer / Agent  │
                        └─────────┬─────────┘
                                  │
                           task / spec
                                  │
                       ┌──────────▼──────────┐
                       │ Enterprise Context │
                       │      Gateway       │
                       └──────────┬──────────┘
                                  │
       ┌──────────────────────────┼────────────────────────────┐
       │                          │                            │
┌──────▼───────┐          ┌──────▼───────┐            ┌──────▼───────┐
│Software      │          │Cross-repo    │            │Dependency    │
│catalog       │          │code/symbol   │            │graph         │
│owner/domain  │          │search        │            │              │
└──────┬───────┘          └──────┬───────┘            └──────┬───────┘
       └──────────────────────────┼────────────────────────────┘
                                  │
                          relevant repos
                                  │
                       ┌──────────▼──────────┐
                       │ Repo context       │
                       │ AGENTS + docs      │
                       │ build/test/symbols │
                       └──────────┬──────────┘
                                  │
                               plan
                                  │
                      dependency-aware waves
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
      ┌──────▼──────┐      ┌─────▼───────┐     ┌─────▼───────┐
      │isolated     │      │isolated     │     │isolated     │
      │repo worker A│      │repo worker B│     │repo worker C│
      └──────┬──────┘      └─────┬───────┘     └─────┬───────┘
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  │
                           checks + evidence
                                  │
                            draft PRs
                                  │
                           human review
```

The organization should expose **high-level, intent-oriented tools**, not give every agent an unrestricted universal shell over 2,500 repositories.

Anthropic's tool-design research specifically recommends choosing tools around meaningful tasks, designing clear boundaries and returning relevant filtered information instead of large raw datasets. citeturn18search2

A good internal tool surface might look like:

```text
catalog.search(
  query,
  owner?,
  domain?,
  language?,
  lifecycle?
)

repo.overview(
  repository
)

code.search(
  query,
  repositories,
  kind = "text" | "symbol" | "reference",
  limit
)

symbol.context(
  repository,
  symbol
)

dependencies.neighbors(
  component,
  direction = "upstream" | "downstream",
  depth <= 2
)

instructions.resolve(
  repository,
  path?
)

checks.run(
  repository,
  profile = "focused" | "pr"
)

change.propose(
  repository,
  patch,
  evidence
)
```

Contrast that with:

```text
enterprise_shell(repo, arbitrary_command)
```

The second one is extremely powerful but poorly bounded. OWASP's current MCP security guidance explicitly warns against passing arbitrary model-generated shell commands or unsanitized file paths and recommends strict validation, authentication, least privilege, resource controls and treating tool output as untrusted input. citeturn16search3

MCP is useful here not because “everything should be MCP,” but because it gives you a standardized host/client/server protocol for exposing resources and tools. The July 2026 MCP specification explicitly covers tools, resources, prompts, authorization-related mechanisms and user-consent/security considerations. citeturn15search2turn15search6

### Make the catalog the first search, not Git

With 2,500 repositories, the first question should not be:

> “Which source files mention `FooClient`?”

It should be:

> “Which software components are likely in the affected domain, who owns them, what lifecycle are they in, and which depend on the changed component?”

Backstage is one example of the underlying pattern: a software catalog can make thousands of components discoverable and attach ownership and dependency metadata. citeturn16search1turn16search5

Then use cross-repository code search.

Then retrieve local repository instructions.

Then retrieve symbols.

Only then retrieve source files.

That produces an extremely useful course mnemonic:

> **Catalog → Search → Map → Read → Act**

### Separate discovery from execution

At enterprise scale, I would teach a two-stage architecture.

**Stage A — scope.**

```text
Goal:
"Upgrade shared auth library from v4 to v5."

Output:
- 76 candidate repositories
- 34 direct dependencies
- 21 actually affected by changed APIs
- owners
- relevant migration pattern
- dependency ordering
- estimated verification profiles
```

No writes.

**Stage B — execute.**

```text
Wave 1:
shared foundational libraries

Wave 2:
independent services

Wave 3:
downstream integrations

Wave 4:
stragglers / exceptional cases
```

Every repo worker returns a typed result:

```json
{
  "repository": "example-service",
  "status": "changed",
  "files_changed": [
    "src/auth/client.ts",
    "test/auth/client.test.ts"
  ],
  "checks": [
    {
      "name": "unit-tests",
      "status": "passed"
    },
    {
      "name": "typecheck",
      "status": "passed"
    }
  ],
  "risks": [],
  "needs_human_review": false
}
```

This is consistent with current multi-agent engineering guidance emphasizing typed schemas and explicit boundaries rather than free-form agent-to-agent prose. citeturn20search1

Sourcegraph's Batch Changes architecture is useful classroom material because it demonstrates the same broad separation: use search to establish scope, represent the transformation as a spec, create per-repository changesets, preview them and track each through review/checks. citeturn16search2turn16search6

### Do not make “swarm” the default

For the course, explicitly define the decision rule:

```text
One agent:
- small coherent change
- tightly coupled files
- one repository
- sequential investigation
- shared state matters

Subagents:
- independent research questions
- independent repositories
- specialist review
- genuinely parallel verification
- context separation is beneficial

Do not delegate:
- merely because the task is "big"
- when the parent already has the required context
- when worker B requires worker A's unfinished answer
- for a trivial single-file edit
```

This lesson is supported by recent production experience: GitHub reported that selectively reducing unnecessary delegation lowered tool failures while preserving quality in its Copilot CLI experiment. citeturn20search0

OMP provides a useful lab for this because it already supports task isolation and worker/subagent mechanisms. citeturn17search2turn17search7

### Build safety into the harness, not into a disclaimer

The enterprise track should make the default progression:

```text
READ
  ↓
PLAN
  ↓
LOCAL WRITE
  ↓
SANDBOX VERIFY
  ↓
DRAFT CHANGE
  ↓
HUMAN APPROVAL
  ↓
PUBLISH PR
```

and not:

```text
agent has developer's entire credential set
             +
 unrestricted shell
             +
 production access
             +
 "please be careful"
```

MCP's current specification explicitly treats user consent, data privacy and tool safety as protocol concerns, while OWASP recommends authentication, least privilege, sandboxing, validation and treating retrieved/tool-provided text as untrusted. citeturn15search2turn16search3

That security model should be mandatory course material, not an appendix.

## Sample chapters

### Sample chapter: From vague ticket to verified change

**Scenario**

A ticket says:

> “The downstream profile service occasionally rate limits us. Add retries.”

The exercise begins by deliberately asking students **not to write code**.

The first lesson is that this request is underspecified:

```text
Which status codes?
Which operations are safe to retry?
Maximum retries or attempts?
Backoff?
Jitter?
Retry-After?
Timeout interaction?
Logging?
Metrics?
What is observable acceptance?
```

The student uses OMP in the planning/exploration phase to inspect the repository, relevant client, tests and local instructions. OMP's plan-mode pattern exists specifically to separate planning-oriented work from destructive execution. citeturn17search0

The resulting specification might be:

```markdown
# Retry rate-limited profile requests

## Behavior

For idempotent GET requests:

- Retry HTTP 429 responses.
- Maximum 3 total attempts.
- Respect Retry-After when valid.
- Otherwise use bounded exponential backoff.
- Do not retry other 4xx responses.
- Preserve the existing overall timeout budget.

For non-idempotent requests:

- Existing behavior remains unchanged.

## Acceptance criteria

- Unit test: GET returns 429 then 200 -> succeeds after retry.
- Unit test: GET returns three 429 responses -> final 429 returned.
- Unit test: POST returning 429 -> no retry.
- Existing client tests remain green.
```

The implementation plan then says:

```markdown
## Files likely affected

- Profile HTTP client
- Retry policy
- Client unit tests

## Steps

1. Confirm current retry/timeout abstraction.
2. Add policy for eligible requests.
3. Add deterministic test clock/backoff mechanism if required.
4. Add success, exhausted and non-idempotent tests.
5. Run focused unit tests.
6. Run standard repository checks.
7. Review diff specifically for accidental retry behavior.
```

Only after the student reviews the plan does the exercise move to **perform**.

The critical educational distinction is:

```text
Spec:
What must be true?

Plan:
How do we intend to make it true?

Implementation:
What did we change?

Verification:
What evidence demonstrates that it is true?
```

GitHub Spec Kit's current workflow is a useful external reference because it institutionalizes essentially this progression as Spec → Plan → Tasks → Implement. citeturn15search3

After implementation, require a compact completion report:

```markdown
## Change
Added bounded 429 retries for idempotent profile GET requests.

## Evidence
- 7 focused client tests passed
- repository typecheck passed
- repository lint passed
- existing integration suite passed

## Diff review
No retry behavior added to POST/PUT.
No public API change.

## Residual risk
Retry-After with HTTP-date format is not currently supported.
```

The chapter closes with:

> **An agent saying “done” is not completion. Evidence is completion.**

That framing follows the broader agent pattern of obtaining ground truth from the environment rather than trusting the model's internal belief about progress. citeturn16search0

### Sample chapter: Build your first portable engineering skill

Start with an intentionally simple skill:

```text
verify-change
```

The objective is not “learn SKILL.md syntax.” It is to understand the distinction between **instructions, tools and skills**.

A possible teaching artifact:

```markdown
---
name: verify-change
description: >
  Verify a completed source-code change before review.
  Use after implementation or immediately before opening a pull request.
---

# Verify Change

Do not modify source code during verification.

## Inspect

1. Read the applicable AGENTS.md instructions.
2. Inspect the complete diff.
3. Identify the languages and build systems affected.
4. Determine the smallest appropriate verification set.

## Verify

Run, where applicable:

- focused tests for changed behavior
- type checking
- static analysis
- formatting checks
- repository-required checks

Do not claim a check passed unless its output confirms success.

## Review

Inspect the diff for:

- unrelated changes
- missing tests
- error handling regressions
- security-sensitive changes
- public API changes
- generated files that should not be committed

## Return

Report:

- changed areas
- checks run
- pass/fail status
- checks not run and why
- remaining risks
```

That uses the essential Agent Skills model: YAML metadata identifies the capability and activation conditions, while Markdown contains the procedure; additional scripts and references can be added later. citeturn18search0

Then make the student improve it.

Iteration one discovers multiple ecosystems:

```text
Node
Java
.NET
Python
```

The student should **not** put every HireRight build command into the skill.

Instead:

```text
verify-change skill
        ↓
read local AGENTS.md
        ↓
discover repo-specific checks
        ↓
execute appropriate checks
```

This is the key compositional insight.

AGENTS.md contains **local project knowledge**. citeturn18search1

The skill contains **reusable procedure**. citeturn18search0

Tools provide **capabilities**. citeturn18search2

The harness controls **permissions, context and execution**.

Students then compare:

```text
Run A: "Check my change."

Run B: use verify-change skill.
```

They score:

```text
Did it inspect the whole diff?
Did it find local instructions?
Did it choose appropriate tests?
Did it hallucinate test results?
Did it detect unrelated changes?
How many tool calls?
How many irrelevant tokens?
```

That tiny experiment introduces evaluation almost for free.

At the end, show Caveman as another `SKILL.md` and ask:

> What is fundamentally different between a presentation-style skill such as Caveman and an engineering-procedure skill such as `verify-change`?

Caveman's current skill is sufficiently compact to make this comparison concrete. citeturn21search0

The intended realization is:

> A good enterprise skill should usually encode **organizational expertise or a repeatable engineering procedure**, not simply personality.

### Sample chapter: The 2,500-repository problem

Start with the question:

> “We are removing `LegacyIdentityClient`. What will break?”

Students receive a simulation containing twenty repositories rather than 2,500, plus:

```text
catalog.json
dependencies.json
code-search tool
repo-context tool
20 small repositories
```

The naïve instruction:

```text
Search every repository.
Read whatever looks relevant.
Tell me what needs to change.
```

should perform badly enough that students feel the problem.

Then introduce the architecture:

```text
Step 1
Find the LegacyIdentity component in the software catalog.

Step 2
Get direct downstream dependencies.

Step 3
Search those repositories for LegacyIdentityClient references.

Step 4
Classify hits:
- runtime dependency
- tests only
- documentation
- obsolete/dead code

Step 5
Read instructions and relevant symbols only for runtime consumers.

Step 6
Produce an impact specification.

Step 7
Build dependency-aware migration waves.

Step 8
Only now create isolated execution workers.
```

Students should produce something like:

```yaml
change: remove LegacyIdentityClient

affected:
  - repo: candidate-api
    owner: candidate-platform
    impact: runtime
    dependency_depth: 1
    migration: replace-with-identity-gateway

  - repo: report-service
    owner: reporting
    impact: runtime
    dependency_depth: 2
    blocked_by:
      - candidate-api

not_affected:
  - repo: old-load-tests
    reason: references only archived fixture
```

The second lab asks them to design the tools.

Bad:

```text
search_all_the_things(prompt: string)
```

Better:

```text
catalog.search
dependencies.neighbors
code.search
repo.overview
symbol.context
checks.run
```

The external reading for this chapter is deliberately heterogeneous: Aider demonstrates token-budgeted repository maps and symbol ranking; Backstage demonstrates catalog/ownership metadata at thousands-of-component scale; Sourcegraph demonstrates declarative multi-repository changes; and Anthropic's tool-design article explains why narrower, task-oriented interfaces are easier for agents to use reliably. citeturn19search1turn16search5turn16search6turn18search2

The chapter closes with an architectural principle:

> **Never teach an agent to search 2,500 repositories when you can teach the organization to answer which 12 repositories matter.**

## Rollout, maintenance and measurement

For 300+ engineers I would avoid a single giant “AI training week.” Use a staged rollout.

A sensible structure is:

| Audience | Content | Delivery |
|---|---|---|
| All engineers | fundamentals through controlled subagents | self-paced + team labs |
| Senior/staff | enterprise context, tools, MCP and evaluations | deeper cohort |
| Platform/DevEx | harness implementation and internal skill/tool registry | working group |
| Security | threat modeling, permissions, MCP/tool approval | dedicated lab |
| Engineering managers | measurement, review capacity and adoption patterns | short briefing |

The course repository itself should become an example of good agentic engineering. It should have an AGENTS.md, portable skills, CI validation, link checking, versioned labs, change history and explicit owners. AGENTS.md is designed precisely as a predictable location for agent-facing build and repository instructions, while the Skills format gives you a portable way to distribute course-specific procedures. citeturn18search1turn18search0

Most importantly, separate content into:

```text
/core
    context-engineering.md
    specification.md
    planning.md
    verification.md
    delegation.md
    tool-design.md
    evaluation.md
    security.md

/adapters/omp
    installation.md
    providers.md
    plan-mode.md
    skills.md
    task-subagents.md
    current-orchestration.md
```

Review **core material annually** unless evidence changes.

Review the **OMP adapter quarterly**.

Record exactly what was tested:

```yaml
omp_version: "..."
agent_skills_spec: "..."
mcp_spec: "2026-07-28"
verified: "2026-09-12"
```

That structure prevents a renamed OMP command from making the entire course obsolete.

I would also add an automated “freshness budget”:

```text
Course CI

✓ links resolve
✓ example skills validate
✓ sample repositories build
✓ OMP smoke-test labs execute
✓ referenced command names still exist
✓ pages have owner
✓ pages have last-reviewed date
✗ adapter pages > 120 days without review
```

Finally, build an **internal evaluation set before broad rollout**.

Do not evaluate whether engineers “like AI.”

Construct perhaps 20–40 representative, sanitized engineering tasks spanning the environment:

```text
simple bug
test addition
API modification
dependency update
debugging task
legacy code comprehension
multi-module refactor
cross-repository impact analysis
security-sensitive change
documentation/configuration task
```

For each task, compare approaches such as:

```text
human baseline
OMP direct
OMP + repo instructions
OMP + spec/plan
OMP + approved skill
OMP + selective subagents
```

Measure:

| Metric | Why |
|---|---|
| **Task success** | Did the result actually satisfy acceptance criteria? |
| **Engineer active minutes** | Human attention is often more valuable than elapsed agent time |
| **Elapsed time** | Important but insufficient alone |
| **Review minutes** | Agent throughput is not useful if reviewers become the bottleneck |
| **Rework** | Did implementation create subsequent correction work? |
| **Escaped defects** | Quality cannot be traded away unnoticed |
| **Tool failures** | Indicates harness/tool-interface weakness |
| **Unnecessary context/tool calls** | Measures harness efficiency |
| **Token/cost** | Useful after quality is acceptable |
| **Policy/security violations** | Hard safety signal |
| **Engineer confidence** | Useful secondary measure, not a substitute for observed outcomes |

This measurement-first position is consistent with DORA's finding that AI outcomes depend strongly on the broader organizational system rather than on tool adoption alone. citeturn19search3 It also protects HireRight from over-indexing on rapidly changing external productivity studies whose results and methodologies are still evolving. citeturn18search3turn18search7

The course's capstone should therefore not be:

> “Build something impressive using five agents.”

It should be:

> **Take one genuine HireRight engineering workflow. Make it legible to an agent. Specify its inputs and success criteria. Provide only the context and tools it requires. Implement reusable skills where procedural knowledge exists. Introduce parallelism only where justified. Put dangerous operations behind explicit boundaries. Build an evaluation. Then demonstrate, with evidence, whether the resulting harness is better than the baseline.**

That brings the entire program together:

```text
                           AGENTIC ENGINEERING

                  ┌──────────────────────────────┐
                  │       Human intent          │
                  └──────────────┬───────────────┘
                                 │
                    SPECIFICATION / CONTRACT
                                 │
                  ┌──────────────▼───────────────┐
                  │   Context + instructions    │
                  │ AGENTS / docs / catalog     │
                  └──────────────┬───────────────┘
                                 │
                             PLANNING
                                 │
             ┌───────────────────▼───────────────────┐
             │             AGENT HARNESS             │
             │                                       │
             │ model     skills     tools     state  │
             │              permissions              │
             └───────────────────┬───────────────────┘
                                 │
                     selective decomposition
                                 │
               ┌─────────────────┼─────────────────┐
               │                 │                 │
           worker A          worker B          worker C
               │                 │                 │
               └─────────────────┼─────────────────┘
                                 │
                            VERIFICATION
                                 │
                      tests / lint / runtime
                      evidence / review / eval
                                 │
                  ┌──────────────▼───────────────┐
                  │     Reviewable change       │
                  └──────────────┬───────────────┘
                                 │
                           OBSERVATIONS
                                 │
                 improve docs / skills / tools
                                 │
                                 └──────► next task
```

That feedback loop is the most durable lesson you can give the organization. **When the agent struggles, do not merely write a longer prompt. Ask what the engineering environment is missing: a specification, repository knowledge, better retrieval, a reusable skill, a safer tool, a clearer boundary, stronger verification, or a better evaluation.** Current work on context engineering, tool design, long-running harnesses and agent-readable repositories all points toward that system-level approach. citeturn19search0turn18search2turn18search6turn20search2

That is the course I would build for HireRight: **OMP-centered, but not OMP-dependent; practical from the first hour, but designed around principles that should remain useful long after today's model names, commands and fashionable agent frameworks have changed.**