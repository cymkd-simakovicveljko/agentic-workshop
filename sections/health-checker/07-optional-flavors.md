# 5. Optional flavors

A prompt plus a short spec is our default. Add more structure only when a real change is hard to keep aligned, split safely, or resume. The five approaches below put that structure in different places. They are not five versions of one product, and this is not a setup guide.

<aside class="judgment-callout">
<p class="judgment-kicker">Start small</p>
<p><strong>Do not install a framework to prove that structure helps.</strong> Baseline one bounded change, inspect the approach's real artifacts and documentation, then borrow one practice or adopt a tool only when the cost buys a problem you actually have. Complexity can move from chat into specs, prompts, files, orchestration, configuration, or human coordination; it does not automatically disappear.</p>
</aside>

## The exercise: assess one real change

Choose a small change in a repository you own: add an opt-in JSON output mode to an existing CLI while preserving its default text output and exit statuses. Record the real command and contract from that repository. You are assessing how to organize the change, not committing to implement it during this comparison.

You will not install FSAD, OpenSpec, Kiro, Spec Kit, or BMAD. You will inspect their primary documentation and sample artifacts, then decide whether one idea belongs in your change.

### 1. Capture the lightweight baseline

Before asking for a plan, record:

- the current revision or explicit uncommitted state;
- the current command and its public output/exit behavior on one success and one failure;
- the files and consumer, if any, that must not change;
- the one sentence that would make the change accepted;
- the evidence you will collect afterward.

A baseline can be this small:

```text
Change: add opt-in JSON output to an existing CLI.
Preserve: default text output, exit statuses, and existing command behavior.
Success: a consumer can parse the successful result in JSON mode.
Failure: a failed operation remains distinguishable from a successful empty result.
Out of scope: unrelated behavior changes, new services, a new framework.
Evidence: baseline stdout/exit; proposed acceptance checks for both modes.
```

Run the existing command on a known success and failure before assessing the approaches. If you do not have a suitable CLI, use this as a paper scenario and label the baseline hypothetical; do not invent run evidence.

### 2. Inspect, do not imitate

Open the source-backed examples below. Look at the artifact names, the handoff or review points, and the commands that are actually documented. For each approach, ask:

```text
I am assessing this bounded change: [paste the change and baseline].
Read the linked primary source and inspect its real example artifacts.
Return only:
1. documented mechanics (quote or link the relevant section),
2. assumptions you infer, labelled as interpretation,
3. what would become the source of truth if files and code disagree,
4. what is guidance, what is a tool action, what is a check, and what still needs a human,
5. the smallest practice I could borrow without installing the full approach,
6. one adoption condition and one rejection condition for this change.
Do not claim that a stage, role, template, diagram, or prompt enforces behavior.
Do not install anything or edit my repository.
```

The prompt is a comparison aid, not a substitute for reading the source. Check every quoted claim against the linked page.

### 3. Make one decision

Write one sentence in your change notes:

> For this change, I will **[borrow/adopt/reject] [practice]** because **[observed difficulty]**; I will check **[evidence]** and will not add **[unneeded structure]**.

Then give the agent the smallest useful artifact. For example, a short acceptance note with scenarios may be enough; a full framework is not required. If the change is still clear after the baseline, keep the prompt/spec and skip the rest.

The detailed topology and authority questions belong in [SDLC: the everyday workflow](03-everyday-workflow.md). This lesson compares how structure is described; it does not turn a diagram or a role name into a controller.

## Overview: different categories, similar questions

| Approach and category | Problem it targets | Complexity you take on |
| --- | --- | --- |
| [FSAD](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html) — methodology/playbook | Cross-functional product work with agent execution and shared context | Pod coordination, markdown upkeep, parallel execution, review |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) — repository spec framework and CLI | Agreeing on a brownfield change while preserving current behavior | Change artifacts, delta reconciliation, CLI/tool integration |
| [Kiro specs](https://kiro.dev/docs/specs/feature-specs/) — IDE workflow | Turning a feature request into reviewable requirements, design, and tasks | IDE dependency, generated docs, steering/context maintenance |
| [GitHub Spec Kit](https://github.com/github/spec-kit) — process and template toolkit | Spec-driven feature work, bug fixing, or idea assessment | Project constitution, templates, agent skills, extensions |
| [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) — method with installable skills | Right-sizing planning and delivery for clear or unclear intent | Path selection, skill instructions, artifacts, human checkpoints |

The table is a map, not a ranking. Each source describes its own intended use. The comparisons below separate **documented mechanics** from **our interpretation** so a stage, template, agent role, or diagram is not mistaken for deterministic enforcement.

<div class="setup-platforms">
<details>
<summary><strong>1. FSAD — a playbook for a cross-functional pod</strong><span>Borrow the shared-spec loop when handoffs, not syntax, are the recurring problem.</span></summary>

### Documented mechanics

The [FSAD playbook](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html) labels itself **Full Stack Agentic Development (v40)** and presents a methodology for R&amp;D teams. Its central claims are a Markdown spec as the primary artifact, a small cross-functional pod, and agent-delegated execution. The workflow section names five phases and example artifacts:

1. **Intent and discovery** → `problem.md`, user stories, constraints.
2. **Live spec session** → `spec.md`, design decisions, and project instructions such as `AGENTS.md`.
3. **Implementation planning** → `plan.md`, `tasks/`, and a test plan.
4. **Parallel agent execution** → code/tests/logs, isolated Git worktrees, a coordinator or human, and a verifier role.
5. **Human review and ship** → review against the spec and acceptance criteria.

The playbook also describes pod shapes, including a small PM/UX/Engineer triad, a PM/Engineer builder duo, an engineering platform pod, and a discovery pod for throwaway prototypes. It explicitly calls out non-deterministic agents and says human review is critical. Those are descriptions of the method, not evidence that a particular host will create worktrees, run checks, or enforce the roles.

### Our reading of the assumptions

**Interpretation:** FSAD assumes the work benefits from simultaneous product, design, and engineering decisions, and that the team can co-author a living spec in real time. It is most naturally aimed at new or cross-cutting product work, although the playbook also names bug fixes, refactors, platform work, and brownfield context as possible pod shapes. It assumes access to capable coding-agent tools and enough human attention to review parallel results. It does not supply a universal runtime or make a prompt into a policy boundary.

### Where complexity lives

The code may become faster to produce, but the coordination surface grows: keep `spec.md`, `AGENTS.md`, plans, task files, worktrees, logs, and acceptance criteria coherent. A disagreement between code and the playbook's stated model is not resolved by the diagram. Our practical source-of-truth rule would be: the accepted contract and observed behavior decide the current change; update the spec deliberately when intent changes, then re-check the code. That rule is ours, not a guarantee stated by FSAD.

### Enforcement, change, and recovery

The playbook documents checkpoints, coordinator/verifier roles, isolated worktrees, and human review. It does **not** by itself establish that a host will block execution until a checkpoint passes, that a verifier's result is independent, or that a worktree contains secrets or network access. If requirements change mid-change, the living-spec idea suggests editing the spec and replanning the remaining tasks; the source does not define one recovery protocol for every host. Resume means reopening the repository artifacts and reconciling actual files and evidence, not trusting a role label or stale log.

### Adopt, reject, or borrow

**Adopt FSAD-shaped coordination when:** one change spans product/UX/engineering decisions, several agents can work independently, and a named human can review each result against acceptance criteria.

**Reject the full method when:** the change is one clear local edit, no cross-functional decision is pending, or parallel work would create more merge and review cost than value.

**Borrow without installing:** write one shared change brief with problem, constraints, acceptance scenarios, and explicit out-of-scope items; split only genuinely independent tasks; require each result to cite files and checks. You do not need pod charts, a coordinator agent, or parallel worktrees for a two-file change.

### Learner decision and check

After reading the [workflow and pod examples](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html), decide whether the hard part of your bounded change is handoff/coordination or simply an underspecified requirement. Check the decision by comparing your baseline and final evidence:

- Can one person state the accepted contract without opening several chat threads?
- Did the borrowed brief prevent one concrete ambiguity or compatibility mistake?
- If no, delete the extra role/task structure and keep the lightweight spec.

</details>

<details>
<summary><strong>2. OpenSpec — a change folder with deltas</strong><span>Use it when an existing system needs an explicit, reviewable change package.</span></summary>

### Documented mechanics

OpenSpec describes itself as a lightweight agreement layer and a spec framework. Its [core concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md) define two persistent areas:

- `openspec/specs/` describes how the system behaves now, with requirements and concrete scenarios.
- `openspec/changes/` contains one change folder: proposal, delta specs, design, and tasks.

The documented artifact flow is `proposal → specs → design → tasks → implement`; archiving merges the delta specs into the main specs and moves the change folder to `changes/archive/`. Delta specs use `ADDED`, `MODIFIED`, and `REMOVED` requirements rather than rewriting the whole current system. OpenSpec calls these artifacts “enablers, not gates”: you can revisit them when implementation teaches you something.

The current README documents an optional `/opsx:explore`, then `/opsx:propose`, `/opsx:apply`, and `/opsx:archive` path. It also documents an expanded profile with commands such as `/opsx:continue` and `/opsx:verify`; the exact invocation spelling depends on the integrated tool. Setup is a Node CLI (`openspec init`), not a required step for this lesson.

### Our reading of the assumptions

**Interpretation:** OpenSpec assumes a repository is a useful shared place for current behavior and proposed changes, especially in a brownfield codebase where a full rewrite of requirements would be wasteful. It assumes a person will review and edit Markdown artifacts and will decide when a change is ready to apply or archive. It is less dependent on a particular IDE than Kiro, but still depends on a CLI and an AI-tool integration for its commands.

### Where complexity lives

OpenSpec moves complexity into the delta model and its lifecycle: a maintainer must know whether a statement belongs in current `specs/`, a pending change, or an archive, and must reconcile manual edits before archiving. That is useful when several contributors need the same behavior contract; it is needless bookkeeping for a one-line local fix. If code, a pending delta, and current specs disagree, do not silently choose the most recent-looking file. Identify which artifact is accepted intent, inspect current behavior, and resolve the discrepancy before archiving. The source describes the shape; that resolution policy is our engineering judgment.

### Enforcement, change, and recovery

The docs explicitly say artifacts are not rigid phase gates. The CLI can create or update files, but the documentation does not prove that a host blocks edits, verifies code independently, or prevents an agent from skipping a task. Human review remains necessary. Mid-change recovery is one of the design points: edit the proposal, specs, design, or tasks and continue; the expanded profile documents a continue command. A saved change folder gives a resume point, not proof that the repository still matches it.

### Adopt, reject, or borrow

**Adopt OpenSpec when:** you repeatedly lose the “what is true now” versus “what this change proposes” distinction, or a change spans consumers and needs a durable delta package.

**Reject the full framework when:** one owner can state the behavior and check it directly, or the repository has no need for a long-lived spec inventory.

**Borrow without installing:** use a tiny change note with `Why`, `Current behavior`, `ADDED/MODIFIED/REMOVED`, `Design decision`, `Tasks`, and `Checks`. Keep it beside the change only while it is active; do not create a permanent artifact tree until the team has a maintenance owner.

### Learner decision and check

Compare your bounded change with the [dark-mode sample artifacts in OpenSpec's README](https://github.com/Fission-AI/OpenSpec#see-it-in-action) and the [core-concepts example](https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md). Decide whether a delta is clearer than a short acceptance note. Check by asking:

- Can you state exactly what is added, modified, and preserved?
- Can a reviewer locate the current behavior and the proposed change without reading chat history?
- If the answer is already yes with one page, stop there; adopting the directory and archive lifecycle has not earned its cost.

</details>

<details>
<summary><strong>3. Kiro specs — an IDE-centered requirements, design, and task flow</strong><span>Use it when the feature needs structured refinement inside Kiro, not because three filenames are automatically better.</span></summary>

### Documented mechanics

Kiro's [Feature Specs documentation](https://kiro.dev/docs/specs/feature-specs/) and the official [specs deep dive](https://kiro.dev/blog/from-chat-to-specs-deep-dive/) describe a feature-spec workflow in the Kiro IDE. The deep dive names three main Markdown artifacts:

- `requirements.md` — requirements analysis, user stories, and acceptance criteria;
- `design.md` — architecture, technology choices, and implementation approach;
- `tasks.md` — development phases and tasks.

The documentation describes a requirements-first path and a design-first path for cases where an architecture is already constrained. The deep dive also describes project-context documents for an existing codebase: `structure.md`, `tech.md`, and `product.md`. It says the specification files are saved in the project, can be reviewed and edited before code is written, and can be regenerated after requirements change. The official feature-spec page is the current mechanics link; the blog is dated July 15, 2025, so verify names and UI labels against the current docs before teaching a command.

### Our reading of the assumptions

**Interpretation:** Kiro assumes a developer is working inside Kiro and wants the IDE to help turn a feature prompt into a sequence of reviewable documents. It suits feature work with enough ambiguity to justify requirements and design, and its documented existing-codebase context makes brownfield use plausible. The tool dependency is stronger than the other options: the workflow is presented as a Kiro IDE capability, not a repository-only convention.

### Where complexity lives

Complexity shifts into IDE workflow and project context upkeep. `requirements.md`, `design.md`, `tasks.md`, and steering/context files can preserve useful decisions, but they can also multiply sources of truth. If code contradicts a generated design, treat the contradiction as a decision to resolve—not as evidence that the IDE's file is authoritative. The Kiro docs say files are reviewable and editable; they do not establish that every change to code automatically updates them.

### Enforcement, change, and recovery

Kiro documents analysis and review points before code, plus task execution from the resulting files. That is a guided workflow, not proof of a hard gate, a deterministic requirements checker, or an independent test run. The official materials say you can modify specification files and regenerate the plan without losing the whole conversation. That gives a practical recovery path for changed requirements: edit the requirement, reconsider design/tasks, then inspect the resulting diff and run the real check. It does not prove that already-written code was reverted or that every dependent artifact was updated.

### Adopt, reject, or borrow

**Adopt Kiro when:** the team already works in Kiro, feature requirements and design need several review passes, and the project will maintain the resulting files.

**Reject the full workflow when:** the feature is a small brownfield fix, the team does not use Kiro, or the three documents would merely restate a clear issue.

**Borrow without installing:** use the sequence `requirements → design decision → tasks → evidence` as headings in one Markdown file. Keep requirements about observable behavior, put implementation choices in design, and make each task point to a check. This is the useful separation; Kiro itself is optional.

### Learner decision and check

Inspect the [feature-spec examples](https://kiro.dev/docs/specs/feature-specs/) and the [existing-codebase context example](https://kiro.dev/blog/from-chat-to-specs-deep-dive/#1-understand-your-existing-codebase). Decide whether your baseline has a real requirements/design split. Check by asking:

- Does separating “what must be true” from “how we will change this repository” expose a decision you otherwise would have missed?
- Can you update one requirement and identify every affected task and check?
- If not, keep one short spec and avoid importing an IDE-specific workflow.

</details>

<details>
<summary><strong>4. GitHub Spec Kit — a toolkit with independent processes</strong><span>Use one process when its problem fits; do not confuse a toolkit's templates with an automatic gate.</span></summary>

### Documented mechanics

The [Spec Kit README](https://github.com/github/spec-kit) calls Spec Kit an open-source toolkit of structured processes, reusable templates, and documented outcomes for AI coding agents. It explicitly offers three independent entry points:

- **Spec-Driven Development** for building a feature or application;
- **Bug fixing** for assessed cause, scoped fix, and recorded verification;
- **Idea assessment** for an evidence-backed go, clarify, or stop decision.

For the SDD path, the README shows a project constitution followed by `/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`, and `/speckit-converge`. It says to review each result and repeat implement/converge until convergence reports “Converged.” The bug and assessment extensions have their own assess/fix/test or intake/research/define/shape/decide commands. The README also documents `specify init`, existing-project guidance, extensions, presets, workflows, and bundles.

The [SDD methodology](https://github.com/github/spec-kit/blob/main/spec-driven.md) explains the source's strong specification-first philosophy and its templates/checklists. That page contains methodology claims and examples; it is not evidence that every listed check is executable in every integration.

### Our reading of the assumptions

**Interpretation:** Spec Kit assumes a project is willing to carry a reusable process and, often, a project constitution. Its independent entry points make it suitable for more than greenfield feature development, but the CLI and supported-agent integration add setup cost. It assumes someone will review generated specifications, plans, tasks, and convergence evidence rather than treating slash-command output as approval.

### Where complexity lives

Complexity moves into project initialization, constitution/template maintenance, command sequencing, and optional extensions. That can make recurring decisions visible; it can also create a large Markdown surface and a false sense that a checklist guarantees completeness. If the plan and code disagree, the requirement and actual consumer behavior still need a human decision. The toolkit supplies process artifacts, not a universal organizational source of truth.

### Enforcement, change, and recovery

The README documents process commands, generated artifacts, and an explicit convergence result. It does not establish that a model cannot skip a step, that “Converged” means production correctness, or that every check ran independently. Requirement changes are handled by revising the relevant spec/plan and using the documented implement/converge loop; existing-project and evolving-spec guides are the places to inspect for the current route. Resume/recovery depends on the files and integration state you actually have. Preserve the original failure and rerun the relevant check after a changed requirement.

### Adopt, reject, or borrow

**Adopt one Spec Kit process when:** you have a recurring class of work—feature delivery, bug diagnosis, or idea assessment—and the team will maintain the project templates and review outputs.

**Reject the full toolkit when:** you need one bounded change now, have no recurring process owner, or the CLI/integration setup costs more than the ambiguity it removes.

**Borrow without installing:** use one constitution-like paragraph of non-negotiables, a requirements/plan/tasks split, and a convergence note that records which checks actually ran. Do not copy all extensions or a project-wide constitution for one feature.

### Learner decision and check

Inspect the [feature, bug-fix, and assessment examples](https://github.com/github/spec-kit#choose-your-process) and the [SDD command sequence](https://github.com/github/spec-kit#spec-driven-development). Decide whether your bounded change is a recurring work class or a one-off. Check by asking:

- Does the selected process produce evidence you will reuse next month?
- Is there a named owner for updating its templates and interpreting a failed/partial result?
- If not, the lightweight brief is the more honest choice.

</details>

<details>
<summary><strong>5. BMAD Method — right-sized skills and delivery paths</strong><span>Borrow the sizing judgment before you borrow the skill catalog.</span></summary>

### Documented mechanics

The [BMAD Method README](https://github.com/bmad-code-org/BMAD-METHOD) describes an Agile AI-Driven Development method that keeps decisions explicit, carries context forward, and sizes the process to the work. The official [planning-path guide](https://docs.bmad-method.org/plan/choose-a-planning-path/) is concrete about the mechanics:

- A well-defined intent can go to `bmad-spec`; a one-session result can go to `bmad-build`.
- Epic-sized work can use `bmad-spec`, `bmad-ticket`, one build per story, then integration and retrospective.
- Unclear intent can use independent analysis skills such as brainstorming, research, product brief, PRD, UX, or architecture before `bmad-spec`.
- Skills produce durable files such as `spec-<slug>.md`, `architecture-<slug>.md`, `tickets.toml`, and build plans; output lives in an initiative folder or `_bmad-output` by default.
- The guide says to update the spec and re-slice remaining stories when earlier work reveals a missing constraint, better division, or conflict.

The README documents setup through skills or coding-tool plugins and says BMad can be used end to end or carried into an existing workflow. This is a method with installable skills, not a single IDE or just a folder convention.

### Our reading of the assumptions

**Interpretation:** BMAD assumes the main difficulty is choosing the right depth of intent discovery, specification, architecture, story slicing, and build—not forcing every change through one fixed pipeline. It can fit greenfield and established codebases, but it asks the team to learn and maintain a skill set and output layout. The method depends on a coding tool that can use those skills; its human checkpoints remain important because generated artifacts are still proposals.

### Where complexity lives

Complexity moves into path selection, skill instructions, artifact naming, initiative folders, ticket ordering, and the discipline to retain plans after closure. That can reduce over-planning if the sizing judgment is used well; it can also become a catalog to maintain. If an architecture document conflicts with a current consumer or approved requirement, do not let the skill name settle it. Resolve the decision, update the authoritative artifact you choose, and verify the code.

### Enforcement, change, and recovery

The planning guide documents review of proposed ticket order, checkpoints, human marking of stories done, and re-slicing after discovery. These are workflow instructions, not proof that a plugin blocks the next skill or independently validates the result. The explicit update-and-re-slice guidance is useful recovery for mid-change requirements. Resume from the saved spec/tickets/build plan and current code, then identify stale evidence; do not assume a preserved plan means the implementation is current.

### Adopt, reject, or borrow

**Adopt BMAD when:** work varies from a trivial change to a multi-epic initiative, and the team needs a repeatable way to choose how much discovery, architecture, and story tracking to add.

**Reject the full method when:** the change is already clear and independently checkable, or no one will maintain the skills and output files.

**Borrow without installing:** ask “What is the smallest planning path that makes this safe?” Use a one-page spec for one coherent session; add story slicing only when several sessions or contributors need an ordered handoff; add research/architecture only when uncertainty or system reach demands it.

### Learner decision and check

Inspect the [choose-a-planning-path guide](https://docs.bmad-method.org/plan/choose-a-planning-path/) and its [planning-skills output table](https://docs.bmad-method.org/plan/choose-a-planning-path/#planning-skills-and-what-they-produce). Decide which, if any, BMAD-sized path your bounded change needs. Check by asking:

- What concrete uncertainty or coordination cost does the extra path remove?
- Can you name the file, person, and check that will keep the resulting artifact useful?
- If you cannot, keep the short prompt/spec and skip the skill catalog.

</details>
</div>

## A practical comparison record

Use these questions for your selected approach; repeat for a second approach only if the choice is still unclear. Label each answer **observed** (with its source) or **interpretation**. Do not fill blanks with confident guesses.

| Lens | What to record |
| --- | --- |
| Problem targeted | Which recurring difficulty is named? |
| Assumptions | Requirements stability; greenfield/brownfield; roles; tool dependency |
| Complexity location | Prompts, specs, docs, orchestration, config, or human coordination |
| Source of truth | What happens when current code, plan, and spec disagree? |
| Enforcement | Guidance, tool action, executable check, or human approval? Who can override? |
| Mid-change requirements | Which artifact changes, and what gets reconsidered? |
| Recovery/resume | What persisted state can be reopened, and what evidence must be refreshed? |
| Adoption cost | Concrete setup, files, roles, process owner, and ongoing upkeep |
| Useful partial adoption | One practice worth borrowing without the full stack |

**Do not infer enforcement from appearance.** A phase diagram is not a state machine. A task list is not a completed check. An agent role is not an independent reviewer. A generated report is not evidence until its source, candidate revision, command, and output have been inspected.

## The recommendation we use

Start with the smallest artifact that makes the next decision and check unambiguous:

- a direct prompt for a clear, local change;
- a short spec with current behavior, requested behavior, constraints, and acceptance checks when agreement matters;
- a change folder, IDE workflow, toolkit, or method only when the concrete difficulty is recurring and the team will maintain it.

Extra structure is justified by a specific failure: lost requirements, conflicting consumers, unsafe parallelism, repeated recovery work, or a change too large for one review loop. It is not justified by a diagram that looks mature or by a framework's number of stages. For topology and progression gates, return to [the workflow lesson](03-everyday-workflow.md); for authority, cancellation, and existing consumers, continue to [Advanced engineering](08-advanced-engineering.md).

## Sources and verification scope

This lesson reviewed the linked primary materials and examples; it did **not** install, invoke, benchmark, or measure any of the five approaches. The links point to mutable documentation or default branches unless a page states otherwise. The FSAD page currently labels itself v40. The Kiro deep-dive source is dated July 15, 2025; verify current UI labels and file behavior before turning them into course commands. OpenSpec, Spec Kit, and BMAD repository links target `main`, so inspect the release/tag you intend to use before adopting commands or file layouts.

Before adopting anything, verify the exact current version and one real path in your environment:

1. record the source URL, revision/tag, and date reviewed;
2. inspect the generated artifacts and command output rather than trusting a summary;
3. run the bounded change's baseline and acceptance checks on the same candidate revision;
4. record what remained unexecuted—especially human approval, permissions, network boundaries, cancellation, and consumer compatibility.

[Previous: SDLC — the everyday workflow](03-everyday-workflow.md) · [Next: Advanced engineering](08-advanced-engineering.md) · [Back to the outline](../../OUTLINE.md)