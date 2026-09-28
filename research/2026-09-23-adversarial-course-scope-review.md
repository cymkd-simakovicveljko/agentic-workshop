# Adversarial review: course scope and section boundaries

## Verdict

**The course is not broadly mis-scoped. The proposal needs a clearer hierarchy of capabilities, subtopics and exercises, especially around sections 7 and 8.** A fresh context is a constraint on delivery, not the purpose of delivery. Conversely, calling a chapter “strategic SDLC” would not make it more useful if it simply repeats planning, specification and testing already taught elsewhere.

My recommendation was to keep the eight-section proposal, reframe 7 as **Planning and coordinating larger changes**, and give section 8 two advanced routes with separate outcomes. Keep the software development lifecycle (SDLC) visible throughout rather than introducing it late. The review itself did not change learner material.

**Implementation follow-through:** the user subsequently approved migrating the lessons and navigation to the [revised scope map](../2026-09-22-course-review-and-action-plan.md#learning-progression-and-material-map). The [five-part outline](../OUTLINE.md) is the learner entry point; the eight-section route reviewed here is preserved in [the alternative outline](../alternatives/eight-section-outline.md). This report and its comparative notes preserve the findings about the earlier proposal; section numbers and quoted coverage below describe that reviewed snapshot, not a fresh audit of the migrated course. Migration does not establish runtime or classroom readiness.

The earlier [action plan](../2026-09-22-course-review-and-action-plan.md) was too quick to treat its proposed map as settled. Its section 7 exercise includes useful dependency and requirement-change work, but its headline and exit condition overemphasize conversation continuity. Its section 8 row preserves two parts without adequately resolving their different audiences.

## What was checked

Four independent reviewers ran in parallel: one challenged the proposed boundaries, one defended them, one researched coding-agent courses, and one researched agent-product engineering courses as a contrast. I then checked the active lessons, framework sources and selected first-party course material, and reconciled the disagreements. This is adversarial review, not four votes establishing truth.

The audit used the proposed numbering below. Active section 3 is the everyday workflow; proposed section 3 is OMP operation and proposed section 4 is the everyday workflow. Historical `COURSE.md`, `FACILITATOR.md` and old demo packs were not credited as active coverage. One review mixed active and proposed numbering; its findings were normalized before synthesis.

The public comparison includes Stanford CS146S, Anthropic Academy's Claude Code in Action, DeepLearning.AI's separate Claude Code course, AI Hero's crash course/cohort, DeepLearning.AI's Agentic AI, Hugging Face's Agents Course, and FSDL's LLM Bootcamp. These are representative established sources, not a measured popularity ranking. Public syllabi establish advertised coverage; accessible assignments establish requested practice, not learning effectiveness. Gated lessons were not accessed, and the 2023 FSDL material is historical.

## What the external evidence actually supports

| First-party evidence | What it supports | What it does not establish |
| --- | --- | --- |
| [AI Hero cohort schedule](https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w): fundamentals/context, steering, PRDs, architectural tracer bullets, multi-phase planning, feedback loops and autonomy | Larger-change engineering connects planning, decomposition, feedback and continuation. Context-sized work is a technique within that progression. | That all these responsibilities should live in one late chapter, or that copying its tool stack will improve our course. |
| [Stanford CS146S](https://themodernsoftware.dev/): product requirements, specifications, iterative human/agent development, testing and deployment goals | An AI-assisted engineering course can make the broader lifecycle explicit without being organized as one chapter per SDLC phase. | Its current landing page does not expose a detailed teaching sequence. |
| Stanford's public [security assignment](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week6/assignment.md) and [code-review assignment](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week7/assignment.md), identified as Fall 2025 by the instructor repository | Narrow, tool-led exercises can teach substantial transferable capabilities: triage and repair, test evidence, manual review and critique of AI review. | That Semgrep or Graphite must become course requirements, or that a detailed assignment demonstrates learner transfer. |
| [Anthropic Academy: Claude Code in Action](https://www.coursera.org/learn/claude-code-in-action) and [DeepLearning.AI: Claude Code](https://www.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant) | Tool capabilities and project-based practice are legitimate organizing choices. The first separates steering/configuration/automation/verification; the second includes feature work, testing, debugging and refactoring through projects. | These are different courses. Their public catalogues do not prove detailed assessment quality or a full operations curriculum. |
| [DeepLearning.AI Agentic AI](https://www.deeplearning.ai/courses/agentic-ai), [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction), [FSDL LLM Bootcamp](https://fullstackdeeplearning.com/llm-bootcamp/) | Building agent-powered systems introduces distinct design, evaluation and operational responsibilities. This supports separating the harness-builder route from ordinary code-change practice. | Their framework, benchmark, RAG or deployment inventories are not missing requirements for a course about using coding agents. |

Detailed evidence and dissenting recommendations are in the [coding-course comparison](2026-09-23-coding-course-comparison.md) and [agent-engineering comparison](2026-09-23-agent-engineering-course-comparison.md). The researchers favored a narrower continuation chapter than my proposed title for 7. Their strongest objection is preserved below: broadening must not move the basic lifecycle into a late catch-all.

## The scoping rule

A **section** should own a learner capability or decision. A **subtopic** explains a mechanism needed for that decision. A **lab** supplies a concrete situation in which the learner can demonstrate it.

For example, “coordinate a larger change without losing intent or accepting stale evidence” is a capability. A specification, dependency list, handoff or fresh context can support it. Updating three ticket files is an activity, not evidence that the capability was learned.

A vertical slice through software is different from a curriculum section. The filter exercise can correctly span specification, implementation, tests and review while remaining one thin product change. Those responsibilities may recur later at greater uncertainty or scale. Repetition becomes waste when the later exercise adds no new decision, not merely when the same word appears again.

Two counterexamples test section 7's boundary. A one-file repair resumed tomorrow spans sessions but may need only section 3's controls and section 6's recovery. A multi-component change planned in one conversation can still need dependency, design-risk and acceptance coordination. **Conversation count is therefore not a sufficient measure of engineering scope.**

## All eight proposed sections

These are recommended boundaries, not a replacement outline. Subtopics are grouped by the decision they serve; they are not a mandatory list of separate lessons.

| Proposed section | Judgment and recommended capability | Core subtopics | Boundary and observable check |
| --- | --- | --- | --- |
| **1. Getting started** | **Keep.** Make and assess a first supervised change safely. | Correct workspace; minimum authority; inspect before acting; bounded edit; diff and behavior evidence. | Not a complete Git/security/tool course. Learner can accept or reject the count change and explain why. Put installation troubleshooting in the companion. |
| **2. How agents work** | **Keep as a compact conceptual debrief.** Explain what affected an agent's action and what its result establishes. | Model versus harness; supplied context; tool loop; variable behavior; model/effort/cost trade-offs. | Not an ML course or provider catalogue. Reuse section 1's trace without repeating its lab. Learner distinguishes a proposed action, an executed tool call and verified behavior. |
| **3. Working with OMP** | **Narrow.** Operate the host without mistaking conversation changes for changes to the environment. | Inspect effective controls; interrupt; choose context/session actions; inspect usage; distinguish files/processes from conversation state. | A short operating bridge, not an exhaustive command tour before the everyday workflow. Versioned syntax belongs in a reference. Learner explains exactly what changed and what remained. |
| **4. The everyday workflow** | **Keep as the practical core.** Deliver one bounded change from intent to acceptance. | Explore; specify behavior/non-goals; choose a proportionate plan; implement a thin slice; test; review; handle scope changes. | First home for the basic SDLC loop, not postponed to 7. Learner maps requirements to rejecting checks and makes an evidence-based acceptance decision. |
| **5. Steering agents** | **Keep, tighten the purpose.** Select and maintain context, instructions and reusable guidance that improve a decision. | Repository knowledge/provenance; instruction scope; context selection; procedure design; skills and pruning; useful-output evaluation. | Not a packaging tutorial or a duplicate project tracker. An OMP course can retain a small native-skill exercise, but a loaded file is not proof of better judgment. Learner chooses the right information home and justifies keeping, revising or removing guidance. |
| **6. Reliable execution** | **Reframe more precisely as Verification, diagnosis and recovery.** Decide what evidence is sufficient and repair failures without hiding them or losing work. | Meaningful tests/review; diagnosis by discriminating evidence; shared-cause repair; an existing mechanical check; interruption/recovery. | Do not imply one blank-input fix proves general reliability. Session-command mechanics stay in 3; project dependency coordination stays in 7. Learner rejects a plausible partial fix, proves the repair and identifies unresolved state. |
| **7. Shipping across sessions** | **Reframe as Planning and coordinating larger changes.** Preserve intent and acceptance across multiple increments, dependencies and changed decisions. | Proportionate specification/design; risk-first sequencing; dependency and ownership boundaries; verification strategy; changed requirements and durable work state. | Apply the lifecycle at a larger scale rather than teach it for the first time. Fresh contexts and tickets are mechanisms. Learner replans a consequential requirement change and identifies which code, decisions, checks and remaining work are now stale. |
| **8. Advanced harness design and enterprise work** | **Separate the two learner contracts.** Advanced route A: change an unfamiliar system safely. Route B: design/evaluate the system that runs agents. | A: characterization, seams, contracts, compatible increments and rollout limits. B: authority, isolation, evidence freshness, cancellation and agent-workflow evaluation. | The active lesson already has Part A/Part B; the outline and assessment must preserve that distinction. Keep the exporter for compatibility practice. A harness worksheet is not a working controller, and local consumer tests are not deployment proof. |

The audit does **not** justify forcing equal section lengths or keeping eight sections at any cost. In particular, 2 and 3 can be short bridges. There is no classroom evidence yet that they need merging or that placing the workflow fourth causes a delay; the risk is turning either bridge into a long prerequisite catalogue.

## Section 7: broader purpose, bounded responsibility

The proposed outcome is: **given a change larger or less certain than one bounded task, decide how to specify, sequence, delegate, verify and adapt it without losing the accepted goal.** “Strategic” should mean consequential engineering choices at this scale, not portfolio roadmaps, staffing, estimation ceremonies or speculative architecture.

### Core decisions

1. **Frame the outcome and uncertainty.** Identify the user problem, non-goals, constraints, unresolved product decisions and accepted versus proposed behavior. Decide how much specification the risk needs; do not require a large PRD for every change.
2. **Choose increments that reduce risk.** Compare technical approaches where they matter, expose dangerous assumptions early, and order work by dependencies and feedback. A small prototype or end-to-end increment can answer a design question before full implementation.
3. **Coordinate bounded work.** Define ownership, interfaces and integration responsibility. Choose serial work unless independence justifies parallelism. Use issues, tickets or local notes when they help; preserve the accepted decisions across people and sessions.
4. **Plan verification across the change.** Reuse the testing skills learned earlier, but decide how evidence from individual increments supports the whole change. Identify integration/regression risks, missing checks, human acceptance and what remains unproven about delivery.
5. **Replan and close deliberately.** When a requirement or observation changes, update its specification, design decisions, remaining work and affected checks. Record what was accepted, what was deferred and who owns the next action. Preserve rationale for subsequent maintenance.

This is not five new process documents. One maintained brief can hold several of these decisions. It is also not a claim to teach the complete deployment/operations lifecycle: release and recovery decisions belong in the reasoning, while unimplemented infrastructure remains explicitly unverified. Section 8 deepens compatibility and operational boundaries.

### A lab that proves the broader outcome

Keep the proposed multi-increment exercise, but choose a change with a real dependency and an unresolved design or compatibility decision. The todo app can support it only if those decisions are genuine; do not invent distributed infrastructure to make it look larger. If a suitable exercise cannot be demonstrated, retain 7 as a narrower continuation practice instead of promising larger-change leadership.

The learner first justifies scope, approach, increments and verification. After one increment, introduce a consequential requirement change. Ask which assumptions, code, tasks and test expectations must change, and which evidence still holds. A later session or second person should be able to continue from the maintained state; that is one stress test, not the whole assessment.

Passing requires coherent reprioritization and evidence-backed acceptance or a justified stop. It does not require a particular ticket count, tracker, number of agents, framework or conversation count. The decisive distinction from section 4 is coordination across increments and uncertainty; from section 6 it is changed intent/dependencies rather than only a failing implementation.

### FSAD and OpenSpec: core ideas, optional implementations

The distinction matters more than whether the brand names are “optional.” **Collaborative specification, clear behavioral contracts, design rationale, change control and verification are core engineering practices.** FSAD and OpenSpec are ways to organize some of them; using both frameworks is not a prerequisite for learning them.

The [FSAD playbook](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html) explicitly describes intent/discovery, live specification, implementation planning, agent execution and human review/shipping. That makes it a useful lifecycle case study, not merely a fresh-context technique. Borrow cross-functional decision questions without claiming an agent simulating Product/UX/Engineering has obtained real stakeholder agreement. Its speed and staffing claims remain author claims, not our evidence.

[OpenSpec's concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md) separate behavior specifications from implementation plans, current contracts from proposed deltas, and implementation from archived change history. Its progressive-rigor guidance favors light specifications for ordinary work. Use that to illustrate maintained intent and changing requirements, not to teach its folder layout as the purpose of section 7. An archived change does not itself prove shipped behavior.

Keep one plain implementation of these responsibilities in the main route. Compare FSAD/OpenSpec after learners understand the problem each addresses. A framework installation can be optional while its underlying engineering responsibility remains mandatory.

## Where the SDLC already exists—and what is weak

The literal acronym `SDLC` is absent from the eight active lesson files. Its absence was checked separately from the actual content. The current course is not missing specification or testing.

| Lifecycle responsibility | Active evidence | Scope judgment |
| --- | --- | --- |
| Intent, requirements and a proportionate plan | [Everyday workflow, now section 4](../sections/04-the-everyday-workflow.md#six-decisions-not-six-compulsory-prompts), reviewed lines 11–26, 162–230 | Explicit and substantial for one small feature. Larger design uncertainty and dependency sequencing need more visible treatment, not a first introduction in 7. |
| Implementation, tests, review and acceptance | Same lesson, [verification](../sections/04-the-everyday-workflow.md#verify-evidence-must-match-the-claim) and [review](../sections/04-the-everyday-workflow.md#review-read-the-request-diff-and-evidence-together), reviewed lines 232–390 | Strong recurring practice. Keep it throughout the course rather than assigning all testing to one later section. |
| Changed intent and maintained decisions | [Scope changes](../sections/04-the-everyday-workflow.md#handle-scope-changes-deliberately), reviewed lines 408–423; current/proposed specifications in the former optional-flavors lesson, reviewed lines 152–203 ([maintained treatment](../sections/07-planning-and-coordinating-larger-changes.md#optional-borrow-collaboration-and-change-record-practices)) | Present. The new opportunity is an exercise where a change affects several dependent increments and their evidence. |
| Continuation and failure recovery | Former context lesson, reviewed lines 213–218, 247–267 ([maintained treatment](../sections/05-steering-agents.md#reconcile-and-prune-before-adding-guidance)); [reliable execution](../sections/06-reliable-execution.md#stop-deliberately-and-account-for-what-is-still-running), reviewed lines 189–249 | Already substantial. A second handoff exercise alone would not justify a new major outcome. |
| Delivery, compatibility and maintenance | [Enterprise changes](../sections/08-advanced-harness-design-and-enterprise-scale-work.md#part-b--deliver-through-compatible-states), lines 313–331; [harness ownership/evaluation](../sections/08-advanced-harness-design-and-enterprise-scale-work.md#evaluate-the-whole-system-and-assign-ownership), lines 125–145 | Compatibility is concrete; rollout, incident ownership and recovery are discussed, not executed. Do not claim complete delivery/operations training. |

Line ranges above identify the pre-migration review snapshot. Links now lead to maintained teaching locations in the preserved eight-section route, whose wording and line numbers have changed; they are navigation, not immutable evidence of the earlier text.

Name the lifecycle explicitly in the everyday workflow, explain that it is iterative, and show where later chapters revisit its decisions at greater risk or scope. Basic testing should appear from the first change; testing strategy across increments can deepen in 7 without relocating the basics there. Agent-workflow evaluation is a separate question from application regression tests and from assessment of the learner.

## Adversarial disagreements and resolution

| Challenge | Strongest defense | Resolution |
| --- | --- | --- |
| Merge 1 and 2 because they reuse the same count example. | Doing something before explaining its mechanics is a useful teaching sequence; interpretation is a different activity from implementation. | Keep the sequence and a short debrief. Do not duplicate the run or assume that two headings imply two equally long units. No forced merger without learner evidence. |
| Remove the OMP-specific operating chapter and native skill packaging. | This is an OMP-based course; learners need concrete host skills, not only portable concepts. | Keep practical host examples subordinate to the capability. A proposed native-loading exercise being unimplemented is an implementation gap, not proof it should be optional. Do not claim a pasted procedure tests loading. |
| Broaden 7 into strategic SDLC. | Planning, specs and testing already have earlier homes. A large lifecycle chapter could duplicate them and become generic project management. | Broaden the outcome to larger-change coordination, not the inventory to “all SDLC.” Keep continuation as a stress test. Retain the narrower chapter if no distinct larger-change assessment can be built. |
| Split 8 completely. | Both halves concern evidence and ownership, and the active material already separates them into parts. | Preserve both subjects but label separate advanced routes and assessments. Making both mandatory is an audience/time decision, not a consequence of shared terminology. |
| The tiny app makes the whole course too narrow. | A small app exposes errors learners can understand end to end; concrete does not mean non-transferable. | Keep it for foundations and bounded delivery. Require later exercises to introduce genuinely new uncertainty or boundaries, with the exporter as one distinct case. Do not turn every topic into the same filter with new documents. |

The reviewers agreed more strongly on preserving concrete practice than on broadening 7. The larger-change framing is my synthesis, conditional on its distinct assessment—not a unanimous result or an externally proven optimum. The strongest shared structural concern is 8's audience split. The strongest shared warning is against hiding repeated content under broader headings.

## Recommended action, before lesson rewrites

1. **Revise the scope map, not the whole course yet.** Make the SDLC relationship explicit, update 7's outcome and mark 8's two routes. Keep the current active outline until that map is accepted.
2. **Assign each repeated topic one teaching home.** Section 3 owns host state controls; 5 owns durable guidance; 6 owns diagnosis/recovery; 7 owns coordination across increments. Reuse one handoff format and earlier testing practices rather than teaching them anew.
3. **Design the distinguishing exercise for 7.** Require a consequential dependency or design choice, a changed requirement, and a justified update to the verification/acceptance plan. If it adds no decision beyond the existing handoff/recovery labs, narrow or merge it.
4. **Rehearse transfer before adding more topics.** Check whether a learner can explain and apply the decisions to a changed scenario, not merely reproduce a reference answer. Measure time and assistance in that rehearsal; neither course popularity nor this review can establish pacing.

No learner lessons, outline, branch structures, skills or provider configuration were changed by this review. The missing canonical todo repository remains a runnable-course prerequisite, but it does not prevent this source-level scope audit. No new runtime, classroom or learning-effectiveness claim is made.
