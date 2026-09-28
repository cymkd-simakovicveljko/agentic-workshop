# Course review and action plan

## Purpose and scope

Keep eight sections, but organize them around what engineers need to do—not around another course's headings or individual OMP controls. The current course already teaches bounded changes, evidence, recovery and compatibility. The main additions are model/request literacy, practical host operation, complete skill authoring, and coordination across larger changes.
**Promotion note (2026-09-27):** The five-part route is now the main course at [OUTLINE.md](OUTLINE.md). This action plan retains the earlier eight-section map, preserved in [alternatives/eight-section-outline.md](alternatives/eight-section-outline.md).

This document records the revision's rationale and acceptance criteria. The user subsequently approved implementing it in the [eight-section outline](alternatives/eight-section-outline.md), lessons and companions. It does not authorize provider-backed runs. The earlier [restoration plan](2026-09-18-content-restoration-plan.md) remains historical; its section numbers differ from the revised route.

**Scope revised 2026-09-23** after the [adversarial curriculum review](research/2026-09-23-adversarial-course-scope-review.md). Section 7 teaches planning and coordinating larger changes; a fresh session is one test of that work, not its purpose. Section 8 has two advanced routes. The implementation uses the existing exporter for section 7's coordination case because its producer/consumer dependency is real within the fixture; section 8 starts independently and teaches characterization, seams and compatibility. The missing todo repository remains a blocker for completing and rehearsing the learner route, although it did not block migration of the written material.

**Written migration completed:** the active outline, eight lessons, ten companions and project/demo navigation now use this structure. Section 5 has the maintained handoff format, pruning packet and native skill-authoring route. Section 6 adds a runnable mechanical-check exercise; section 7 adds the staged coordination case; section 8 separates its assessments. Superseded active lesson and companion paths were moved or merged, without aliases.

The [migration receipt](_build/curriculum-migration-verification.json) records the new checks: 224 local links across 23 active documents resolve; 69 shell blocks parse; the synthetic usage calculation is correct; and the section 6, 7 and 8 prepared shell routes reached their expected passing and deliberately failing outcomes. Temporary execution copies were removed. OMP version/help were inspected without starting a model session. These checks establish document integrity and those local routes, not app recovery, native skill selection, interactive controls, fresh-reader transfer or classroom readiness.

The comparison used the user's two supplied outlines—especially the second outline's 60 lesson titles—against the eight current `sections/` documents and their nine active companions. A lesson title shows what another course advertises, not how well it teaches. Historical drafts and old demo infrastructure do not count as active coverage.

## Learning progression and material map

Sections 1–4 build the everyday workflow. Learners make one supervised change, examine what happened, learn the host controls they need, then deliver a bounded change on their own. Sections 2 and 3 are short bridges. They should not delay section 4.

Later sections raise the difficulty. Section 5 keeps context and reusable guidance useful. Section 6 deals with misleading evidence, failures and interrupted work. Section 7 coordinates changes too large for one bounded task. Section 8 offers two advanced routes: harness engineering, and changing an existing system without breaking its consumers.

Each concept should follow a small observed run. Learners see an agent act before they study the theory.

In the table, **old** refers to the pre-migration structure reviewed in September; **new** is the revised active destination. The source column records where material came from, not a second set of learner paths. "Learn first" lists knowledge, not a working tree to carry forward: every exercise keeps its own starting point.

| New section and learner outcome | Learn first | Exercise and exit condition | Source material |
| --- | --- | --- | --- |
| **1. Getting started:** set up a safe environment and accept or reject one small change. | Basic Git, terminal and JavaScript; an authorized provider for the live route. | Remaining-task count. The learner confirms the right repository, runs baseline checks, reviews the diff and checks count transitions. Prepared fallback work is labelled. | Old 1 and `demo/section-01-setup.md`. |
| **2. How agents work:** explain how a request, a tool result and supplied context shape the next model call. | The run from new 1, observed or prepared. | Annotate a sanitized request/response sequence from that run. Separate user turns, provider requests and tool calls. Read usage without treating an estimate as a bill. | Old 2 and `demo/section-02-agent-loop.md`, as a short debrief. |
| **3. Working with OMP:** operate the host, and tell conversation state apart from files, processes and external effects. | Setup; the model/harness distinction. | Inspect the effective controls, interrupt safely and compare session/context actions. The learner explains what changed, what did not, and what to check before continuing. | Tool controls from old 1, context controls from old 4, session commands from old 6. |
| **4. The everyday workflow:** take one bounded change from intent to evidence-backed acceptance. | Basic OMP operation; acceptance criteria versus implementation choices. | Unfinished-task filter. Derive a reversible view that keeps records and identity intact, then demonstrate the acceptance behavior. Name one plausible wrong implementation and the check that rejects it. | Old 3, the workflow lab and the worked examples. |
| **5. Steering agents:** choose and maintain the context, instructions and reusable guidance that improve an agent's decisions. | One completed bounded workflow; basic context handling. | Compare ordinary review with a focused procedure, then package a learner-owned skill. Check its source and loading, then its usefulness: a relevant request, a near miss, missing input. Prune guidance without losing a necessary constraint. | Old 4's instructions, navigation and information lifetimes; old 5; their companions. |
| **6. Verification, diagnosis and recovery:** judge evidence, find the cause of a failure and restore a trustworthy state without losing work. | The verification and review loop from 4; guidance versus enforcement. | Blank-task defect. Reject a tempting partial fix, repair the shared cause and check every caller. Run one existing mechanical check. Reconcile active work after an interruption. | Old 6's diagnosis and recovery; old 3's evidence and diagnostic examples. |
| **7. Planning and coordinating larger changes:** keep a change on course across dependent increments and a changed requirement. | One bounded delivery cycle; maintained context; verification and recovery. | Plan a change with a real dependency and deliver its first increment. Then a requirement changes: find the decisions, code and checks it makes stale, and replan. | Old 3's scope-change reasoning, old 4's knowledge lifetimes, old 7's collaborative specification and current/proposed contract. |
| **8. Advanced routes:** harness engineering, or existing-system change and compatibility. Each route has its own evidence. | Both: evidence, authority, ownership. Harness: tool and session boundaries. Existing system: bounded changes, diagnosis, dependencies. | Harness: test a named workload against authority, stale-evidence and cancellation cases, and say which controls are only proposed. Existing system: characterize the exporter, add a seam, implement opt-in v2 and verify the consumer matrix; name the rollout boundaries left untested. | Old 8 and its companion: Part A (harness) and Part B (enterprise/exporter). |

### What each section adds

- **1:** Repair the app distribution prerequisite. Provide one safe restart route covering files, processes and browser data. Teach minimum permissions before the first edit.
- **2:** Make statelessness and non-determinism explicit. Teach model, effort and cost as decisions, not as a provider catalogue. No second implementation exercise.
- **3:** Keep it short, with a version-pinned command reference. Teach compaction, automatic compaction and context/usage inspection where they change a decision. Editor integration stays optional until verified.
- **4:** Name the SDLC stages—explore, specify, plan, implement, verify, review—and end with a factual handoff. Plan in proportion to risk; there is no compulsory prompt ritual. This is the complete workflow, not a preview of section 7.
- **5:** Teach user and project scope, and where guidance came from. A skill can be found, loaded and selected yet still give poor judgment, so test each claim separately.
- **6:** Teach checks and enforcement through concrete failures, not promises of reliability. Delegate only when a question is truly independent.
- **7:** New exercise; see [section 7 acceptance](#section-7-coordination-not-paperwork). Local notes or an existing tracker are enough.
- **8:** Keep both routes as advanced depth. Neither certifies the other, and no learner has to build an orchestrator.

## Lifecycle and teaching ownership

The **software development lifecycle (SDLC)** runs from intent and design through implementation, verification, delivery and maintenance. It loops. A failed check can expose a design mistake; a changed requirement can invalidate a plan or a test expectation. Section 4 teaches that loop on a small change. Section 6 applies it when evidence fails, section 7 across dependent increments, and section 8 at system boundaries. Delivery and maintenance stay visible, but the local labs do not exercise a production deployment, and the course should not imply otherwise.

Each practice gets one teaching home. Later sections use it under harder conditions instead of introducing another template.

| Home | Taught there first | Used later |
| --- | --- | --- |
| **3. Host operation** | Effective controls; conversation state versus environment state. | 6 uses the controls during recovery. 7 tests continuity without becoming a command lesson. |
| **4. Bounded delivery** | Behavioral requirements, proportionate planning, thin implementation, verification, review and acceptance. | 6 questions the evidence after a failure. 7 coordinates decisions and checks across increments. 8 tests wider boundaries. |
| **5. Context and guidance** | Where information comes from and how long it stays true; instructions and skills; the handoff format. | 6 records a recovered or unresolved state. 7 records scope, dependencies and decisions in the same format. |
| **6. Verification and recovery** | Diagnosis that separates possible causes; misleading or insufficient checks; shared-cause repair; mechanical enforcement. | 7 chooses enough evidence for the combined change. 8 separates local behavior, compatibility and operational evidence. |
| **7. Larger-change coordination** | Sequencing by risk, consequential design choices, ownership and dependencies, replanning after intent changes. | 8 applies these to a harness workload or a producer/consumer change. No second planning process. |

Safety stays where the danger is. Section 1 sets minimum authority and review rules before the first edit. Section 2 explains why permission is neither containment nor correctness. Later sections apply that point with a short reminder instead of repeating it.

## Exercise acceptance for sections 7 and 8

### Section 7: coordination, not paperwork

Section 7 teaches learners to coordinate a change that no longer fits one bounded task. They choose an approach, order dependent work and decide how to verify the combined result.

Then a requirement changes. The learner must find the decisions, code and checks that are now stale, revise the plan, and decide whether the work continues. A fresh session tests whether the record is usable. It does not define success.

The scenario needs a real dependency and a design or compatibility decision with consequences. Arbitrary tickets around the tiny filter would not qualify. Keep the small app unless the scenario needs another existing example, and add no infrastructure just to create complexity. Check the runnable scenario against the recovered source before publishing it. Portfolio planning, staffing and speculative architecture are out of scope.

A learner passes by showing five connected decisions:

1. **Intent:** outcome, non-goals, constraints, accepted behavior and open questions, with a specification sized to the risk.
2. **Approach and order:** a technical approach, with increments ordered by risk, dependency and feedback—not by file count or context size.
3. **Ownership:** who owns each increment and the integration. Work stays serial unless independence justifies running it in parallel.
4. **Evidence:** how each increment's checks support acceptance of the whole change, including integration and regression risk and what remains uncertain.
5. **Change:** after the requirement changes, what is stale, how the record changes, and whether to accept, defer or stop.

Stopping can be the right engineering call. A complete set of ticket files proves nothing by itself. Reuse the testing and handoff practices from earlier sections; do not require a tracker, a new artifact schema or a general coordinator.

FSAD's collaborative discovery–specification–planning loop and OpenSpec's split between the current contract and a proposed delta both illustrate this work. Teach the ideas in plain form first. Comparing or installing the frameworks stays optional, because learners are assessed on intent, coordination and evidence—not on which tool they adopt.

### Section 8: two routes, two kinds of evidence

**Harness engineering (Part A).** The learner works out who or what supplies context, authorizes actions, isolates execution, tracks which candidate and evidence belong together, and handles cancellation or an unknown outcome. The current worksheet can show design reasoning, including a missing control or an untested claim. It cannot show enforcement; only an implemented, exercised control can. Completing the course should not require building a new harness.

**Existing-system change and compatibility (Part B).** The learner preserves observed behavior while adding a useful seam, makes an intentional contract change, and explains which producer/consumer combinations are supported. Keep the exporter lab and its separate starting state. Rollout, replay, stored artifacts and recovery ownership have no implementation in the lab, so they stay explicit design questions. Local compatibility checks are not deployment evidence.

Keep the Part A/Part B labels while planning so source references stay unambiguous. The learner outline should state the route choice and each route's prerequisites. Completing one route does not count for the other.

## Editing decisions

Keep the small todo app and the separate exporter. Another course having a database, a second learner app, Discord setup, a request-logging service or a framework installation is not a reason to add one. A sanitized provider request can teach request mechanics without a new dependency. Live capture stays optional and needs a safe, verified route that excludes secrets and private repository content.

Move existing content before writing new content. The everyday workflow stays the practical core, now in section 4. Instructions and skills share section 5 because both steer behavior, though they differ in scope and loading. Section 3 stays short so host detail does not hold up the workflow.

Merge repeated reference material, but keep necessary safety reminders. Explain permission versus containment fully once, then remind briefly at dangerous actions. The handoff format lives in section 5 and is reused in 6 and 7. Keep the reasoning for why a check supports a claim; a checklist in its place would weaken the course.

Pruning should be a real exercise, not a synonym for shorter prompts. Learners get redundant or stale guidance, remove or relocate it, and check that a fresh reader can still find the accepted requirement, commands, boundaries and open decisions.

## Matt Pocock's teaching skill

The upstream skill is named **`teach`**, not `teach-me`. At the [pinned source revision](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/teach/SKILL.md), it builds a multi-session teaching workspace: a mission, curated resources, HTML lessons and references, learning records and shared assets. It does not simply explain the code on screen. This assessment covers that revision only; which version the reference course used is unknown.

Its teaching pattern is worth borrowing: start from a practical goal, ground explanations in sources, teach one concept, have the learner retrieve or apply it, and carry what they demonstrated into the next session. Use those ideas in our prose and exercises. Do not import its HTML/component workspace or require installing it. That would add a second teaching system without closing the code-delivery gaps.

Recommendation: an optional case study in new section 5, linked to durable records in new section 7. If a live pilot is wanted, compare plain teaching with `teach` in separate disposable workspaces, using the same goal, packet and learner questions, and let both keep notes. Judge what the learner understood and whether they could continue—not how much material was generated or how polished it looks. Check output locations explicitly, because upstream reports confusion between skill-asset paths and learner-workspace paths. Nothing was installed or invoked. The [assessment](research/2026-09-22-teach-skill-assessment.md) has source links, licensing limits and the pilot design.

## Technical review

The [OMP source review](research/2026-09-22-omp-course-source-review.md) pins documentation to `v18.2.9`, the locally observed CLI version. It found no material command contradiction in the passages reviewed. The problems lie elsewhere: references to a moving `main`, missing runtime conditions, and no practical exercises. During the rewrite, pin references to the chosen teaching release. Upstream documentation does not prove local behavior.

The versioned sources document `/compact`, automatic context maintenance, thinking controls and usage displays that the new lessons can use. Whether they are available, and what they do, depends on configuration and provider state. Keep `/new`, `/fresh`, `/restart`, `/resume` and compaction distinct; none of them restores files or reconciles running processes. For skills, keep the existing caveat about slash-command configuration, add the conditions for metadata visibility, and inspect the resolved source when names collide. Per-task effort is feature-gated, so do not present it as universal.

## Action sequence

### 1. Establish a reproducible teaching baseline

Recover the canonical todo repository, with its exercise and solution branches, before claiming sections 1–7 are runnable. Record how a learner gets it and test that route from a fresh checkout. Do not rebuild its missing history from prose or quietly swap in the historical project-directory app. Choose the OMP release to teach, and record the provider and model behind each live example. This review observed `omp/18.2.9` locally.

**Exit condition:** a fresh checkout has the documented branches and runs the baseline commands, and the blank-task defect fails for its documented reason. Source review, app execution, agent execution and classroom rehearsal are separate kinds of evidence; none stands in for another.

### 2. Restructure existing material without losing its teaching substance

Move and merge sections and companions using the map and the ownership table. Prose carries the essential explanation: the concept, how its parts interact, and the condition that changes the decision. Tables hold contrasts; code blocks hold commands. Each lesson needs one main outcome, a concrete attempt and an observable exit condition. Keep **Understand → Watch or try → Use at work → Go deeper** where it helps. Keep sections 2 and 3 short, and give the two section 8 routes their own introductions and assessments.

Update `README.md`, `OUTLINE.md`, `PROJECT.md`, `demo/README.md`, previous/next links and lesson-to-companion links in one pass, so two active outlines never coexist. Keep historical records and source/adaptation notes. Do not rename exercise branches just to match new section numbers.

**Exit condition:** every main lesson points to the right starting state and companion, and none depends on an earlier learner's edits. The active route uses one numbering scheme. Each repeated concept has one teaching home, section 7 visibly goes beyond the bounded workflow, and each section 8 route has its own completion claim.

### 3. Close the substantive gaps with bounded exercises

Add request and usage interpretation to new 2 and context-state decisions to new 3. Finish the skill packaging and scope exercise in new 5. Add a mechanical standards check to new 6 and the larger-change exercise to new 7. Reuse existing examples where they can prove the capability; do not stretch the tiny filter into a fictitious enterprise project.

Every addition must separate a plausible failure from success. Examples: a constraint lost after compaction, a skill loaded from the wrong source, an audit triggered by an unrelated request, or a changed requirement whose dependent work and evidence were never reconciled. Pin product commands to reviewed sources and test them on the teaching installation before publishing them.

**Exit condition:** each gap has an executable learner route or is marked optional or out of scope. Reading an explanation or copying a prepared result does not count as exercising the capability.

### 4. Rehearse the complete route and then tighten it

Run setup and every main exercise from its stated starting point. Record the environment, starting code state, exact checks, observations and blockers. Rehearse the live OMP path and skill loading separately from prepared answers. In section 7, watch whether learners trace the consequences of the changed requirement or just copy a plan. Assess each section 8 route against its own claims. Keep a labelled no-provider route, but it does not prove that provider-backed interactions work.

Only then measure pacing. Current sections run from about 2,300 to 4,000 whitespace-delimited words each, excluding companions. That is size, not duration, and nothing yet shows the proposed content fits a given workshop length. If time is short, keep new 1–4 as the essential route and mark later sections as optional depth rather than rushing every topic.

**Exit condition:** a learner rehearsal records misunderstandings, assistance and elapsed time. Cut repetition where learners actually struggle, not by trimming every explanation to the same length.

## Executed checks and current limits

The local CLI reports **OMP 18.2.9** and **Node v24.16.0**. `omp --help` was read without starting a model session; advertised flags do not prove interactive behavior. No provider or account usage was queried, and no credentials were read.

The section 8 direct POSIX-shell route was run from the first five documented shell blocks, in fresh temporary copies:

- Baseline: **3 passed**.
- Seam plus characterization: **9 passed**.
- Feature expectations against the seam: **1 passed, 2 failed**, exit 1. These are the intended failures for missing v2 behavior and version rejection.
- Completed reference: **15 passed**.

The temporary copies were deleted after the results were recorded. The [rehearsal receipt](_build/section-08/2026-09-22-course-review-rehearsal.json) keeps the output and source hashes. This proves the prepared local route works. It does not prove an agent implementation, a deployment or a timed class.

A scan of local link targets in 21 active lesson, companion and navigation documents found **10 links to the missing `demo/todo-app/README.md`** and no other missing file targets. It did not check URL reachability, Markdown fragment anchors, or files named only in prose or code blocks.

The todo directory is empty. Git tracks commit `6f79e772c11d2dd3431b445282f180e212d138f4` there as a gitlink, but that commit is not in this repository's object store, and no `.gitmodules` file records its source. The setup and planning records describe a local, unpublished repository; the path history shows only the course's initial commit. Recovery needs the canonical repository or a bundle with its branches. This review did not fabricate a replacement.

Still not done: a todo-app browser check, a provider-backed teaching run, a `teach` trial and a classroom timing rehearsal. These limit the corresponding claims; the optional `teach` trial is not a prerequisite for the core course. Written-material migration can proceed without them, but the missing repository still blocks a complete learner-route rehearsal. Later verification must identify the exact migrated source it exercised rather than reuse the earlier results above.
