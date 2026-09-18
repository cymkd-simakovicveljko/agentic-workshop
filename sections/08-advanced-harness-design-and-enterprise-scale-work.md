# 8. Advanced harness design and enterprise-scale work

**Main path:** first design the responsibilities around an agent run; then change
an unfamiliar component without breaking its consumers. This section uses the
separate [legacy ticket exporter](../demo/section-08-legacy/README.md). The todo app
is not expanded into an enterprise simulator.

Imagine two failures. An agent tests a patch, edits it again, and presents the old
passing result as evidence. Another agent correctly implements a new export status,
but a nightly importer cannot read it. The first is a coordination and evidence
problem. The second is a software-contract problem. More confident prompting does
not solve either one by itself.

## Understand

### Part A — harness engineering

#### Start with a responsibility, not another framework

A harness is the software around the model: it supplies context, exposes tools,
coordinates execution and carries results back into the next decision. Harness
engineering improves that system for a named workload. Here the workload is
“prepare a bounded exporter change that an engineer can review and reproduce,”
not “let agents modernize the enterprise.”

OMP already provides an execution host and agent tools. Before building another
controller, ask which failure the existing environment cannot handle. A CI job
that binds checks to a candidate may solve your problem without a new agent
framework. A separate service is justified only when it owns a real responsibility
such as issuing short-lived credentials or reconciling external jobs.

The following is a **design worksheet, not an implemented controller or an OMP
configuration**:

| Responsibility | Concrete mechanism to choose | What would establish that it works? |
| --- | --- | --- |
| Scope | Named repository, allowed change and exclusions | Reviewer can distinguish the intended patch from unrelated work. |
| Context | Current contracts and repository guidance with source identity | Stale notes are checked against code rather than silently obeyed. |
| Execution controls | Approval policy plus environment-level access restrictions | An out-of-scope action is denied in a disposable exercise. |
| State | Candidate identity, unfinished work and active-operation records | A new session can find the actual files and reconcile ongoing work. |
| Verification | Checks bound to the tested candidate and environment | A passing result cannot approve a later, different patch. |
| Cancellation | Process supervision and external-operation reconciliation | No child or remote operation is unaccounted for after stopping. |
| Acceptance | Named engineer reviewing diff, results and unresolved risk | Acceptance names the same candidate that the evidence covers. |

The important question is not “did the agent say done?” It is “what component
establishes that this candidate is eligible for review?” The answer might be a
human and ordinary CI. Do not label a proposed mechanism as an existing guarantee.

#### Approval, isolation and authorization are different

An instruction to avoid production guides the model. It does not remove a
production credential from its environment. A separate Git worktree separates
working files; it is not a security boundary for the network, secrets or shared
services. Execution restrictions need an enforcing mechanism and an owner.

Current [OMP approval documentation](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md)
distinguishes `read`, `write` and `exec` tool tiers. Its documented default is
`yolo`, which auto-approves the tiers unless an applicable explicit policy changes
the decision. `always-ask` prompts for write and execution tiers; `write` prompts
for execution. Tool and user policies also affect the result. Do not assume that
starting an ordinary session means every edit waits for approval.

Approval is not containment. The same documentation explicitly says that an
approved shell command retains ambient filesystem, network and subprocess access.
A shell-pattern restriction does not cover equivalent execution through `eval`.
Subagents run headless with tier-based `yolo` behavior; per-tool deny/prompt
policies remain authoritative, and an unsatisfiable headless prompt rejects the
call. Review the delegation boundary rather than assuming a child will ask you
before each action.

For organizational work, agree which repositories, credentials, network targets
and operations are actually available. Then test the boundary in a disposable
environment. For this course, use only synthetic local data and a disposable copy;
there is no reason to expose production systems to the exercise.

#### Evidence must describe the candidate that exists

“Tests passed” omits three crucial questions: which tests, against what code, in
which environment? A commit identifier alone is insufficient if tests ran against
uncommitted changes. Include the patch and relevant new files, or identify an
immutable artifact. Preserve the starting dirty state so pre-existing work is not
mistaken for the agent's contribution.

A useful record has these fields; this is a **template, not a recorded run**:

```text
Task and exclusions: opt-in exporter v2; no delivery infrastructure changes
Base: source revision and initial working-tree state
Candidate: exact patch plus relevant new files, or immutable artifact identity
Environment: runtime/dependencies and relevant host/model/configuration versions
Checks: command, tested candidate, completion/exit status and output location
Outstanding: consumer ownership and routing/replay evidence
Operations: active identifiers, known outcomes and unknown outcomes
Next action and owner: who can resolve the remaining acceptance decision
```

If the candidate changes after checks, affected evidence becomes stale. Do not
silently reuse it. A summary should point to execution facts, not replace them.
Similarly, zero failed tests is not enough if no required tests were discovered.
A missing runner is an environment blocker, not proof that the code is broken or
that the checks passed.

#### Stopping is a lifecycle, not a label

A tool request can be pending, started, completed, failed or of unknown outcome.
A timeout may mean the local process ended, or only that the controller stopped
waiting for a remote operation. Those are different states. Before retrying an
operation that could publish or mutate data, reconcile its identifier and outcome;
the same prompt does not make the operation idempotent.

A real controller needs decisions about per-operation limits, total run limits
and usage limits, plus the mechanism that acts when each is reached. Cancellation
must account for children and delegated workers. Marking a record “cancelled”
does not stop a process or reverse a write that already happened.

OMP exposes agent observation and control through
[Agent Hub](https://github.com/can1357/oh-my-pi/blob/main/docs/agent-hub.md): `Alt+A`
opens the roster, and the selected agent can be inspected or steered. Its documented
`x` action aborts a running turn if needed and kills/releases that agent instance.
While focused on a subagent, `Esc` returns to the main session; it does **not**
interrupt that subagent. These controls are useful, but do not establish that an
external job was cancelled or that persisted side effects were undone. Verify the
operations that matter rather than treating a UI state as universal cancellation.

#### Evaluate the whole system and assign ownership

Evaluate the model, instructions, tools and environment together. Use representative
tasks and repeated trials because agent behavior varies. Direct checks establish
observable outcomes; human review handles judgments the checks cannot settle.
A model grader needs calibration against known outcomes rather than trust in its
confidence. Keep some cases outside prompt tuning so the evaluation does not
become a rehearsal of the exact answers.

The companion tests the design against six cases: valid evidence, a later patch,
a missing tool, hostile instructions inside source data, cancellation during work,
and a failing consumer contract. A tabletop answer establishes design intent.
Only executed fault cases can establish that an implemented controller behaves
as intended. We do not implement that controller in this lesson.

Platform owners can maintain execution environments and evidence capture.
Repository owners still own behavior and acceptance criteria. Name who handles
upgrades, incidents and rollback; retain a known working configuration. Measure
accepted outcomes, regressions, review/rework effort and cost including abandoned
attempts, not generated lines or the number of simultaneous agents. Remove an
orchestration layer when it no longer addresses an observed problem.

### Part B — enterprise changes under characterization

#### Discover the system around the checkout

Enterprise work is not just a larger repository. Consumers may deploy on different
schedules, replay old data, or belong to another team. Searching this checkout can
find callers; it cannot prove that every downstream user has been found.

Our fictional product request is to distinguish tickets on hold. The legacy
exporter maps exact `CLOSED` to `closed` and every other state to `open`. One
consumer accepts only the old format; an upgraded consumer understands the new
one. The example represents those boundaries with two local modules, not live
services or facts about any organization.

Before planning a real change, investigate:

| Boundary | Evidence to seek | What remains unknown in this lab? |
| --- | --- | --- |
| Producer | Mapping, default version, adapter and baseline behavior | Real data access and production failure modes |
| Consumers | Accepted versions/statuses and responsible owners | Unlisted consumers outside the folder |
| Delivery | Version selection, retries and replay paths | Routing, queues and stored-file inventory |
| Environment | Runtime, dependencies, baseline failures and test data | Representative integration environment |
| Ownership | Who accepts the contract and enables each rollout step | Real team approval and operational responsibility |

Write unknowns as unknowns. An agent's inferred diagram is a discovery aid, not an
inventory approved by every consumer owner. Separate generated artifacts from
source and distinguish baseline environment failures from regressions introduced
by the candidate.

#### Characterization records behavior, not correctness

**Recommended book: [Working Effectively with Legacy Code — Michael Feathers](https://www.informit.com/store/working-effectively-with-legacy-code-9780131177055).**
If your work involves adding tests to existing code, this is the central further
reading for this section. It helps you establish feedback and break awkward
dependencies without making a wholesale rewrite a prerequisite for every change.

A characterization test records what existing code does for selected inputs.
That is valuable when no reliable specification exists, but it does not declare
every observed behavior desirable. In this exporter, characterize at least:

| Input or condition | Existing behavior to preserve during preparation |
| --- | --- |
| Exact `CLOSED` versus lowercase `closed` | Only exact `CLOSED` becomes `closed`. |
| `HOLD` or unknown `MYSTERY` | Both become `open` in v1. |
| Empty/null owner versus whitespace owner | Empty/null become `unassigned`; whitespace is preserved. |
| Unsorted rows with repeated identifiers | Output sorts by identifier and retains occurrences. |
| Empty input or failed data loading | Empty rows, or propagation of the loading error—not invented data. |

An agent might “clean up” unknown states by throwing an error or trim owner values.
That changes the contract. Record the behavior, then ask its owner whether to
change it. When a defect repair is authorized, add the desired expectation and
change the affected behavior deliberately; characterization is not a promise to
preserve defects forever.

Feathers describes using an exploratory expectation to reveal an actual result,
then naming a meaningful test after inspecting the observation. That is a learning
technique, not permission to regenerate established expectations from a failing
candidate. Blind snapshot updates can bless a regression as effectively as a
manual assertion change. Normalize only fields irrelevant to the contract, and
explain why.

#### Introduce the smallest seam that gives useful feedback

A seam lets a test substitute behavior without repeatedly editing the place where
that behavior is used. Here the difficult collaborators are data loading and the
clock. The prepared seam accepts `load` and `now` parameters while keeping the
ordinary defaults. Tests can supply selected rows and a fixed time while still
exercising the real exporter mapping.

Compare the [baseline exporter](../demo/section-08-legacy/src/exporter.mjs) with
the [seam reference](../demo/section-08-legacy/reference/seam-exporter.mjs).
The preparation should not change status mapping, owner fallback, sorting, output
version or the no-argument call. Do not replace the mapping with a fake and then
claim its tests establish the real behavior.

Adding a seam is itself a code change. First establish an outer observation through
the existing entry point, make the dependency edit small, then compare default
behavior. Afterward, use the seam for focused characterization. The baseline
checks cover selected observations, not every possible input. If the baseline
cannot run, report that limitation rather than calling a mechanical-looking diff
proven safe.

Retain an adapter check alongside injected tests. A fake loader proves nothing
about a real database query, credentials or wire format. This lab's outer checks
exercise only the local JSON adapter; they do not stand in for production
integration.

#### Separate preparation, feature and compatibility decisions

The agreed feature is deliberately narrow: opt-in `formatVersion: 2` maps exact
`HOLD` to `paused`. Omitted or explicit v1 preserves existing behavior. Unknown
states still map to `open`; unsupported versions are rejected before data loading.

Review the seam before adding this behavior. Otherwise a broad “modernize the
exporter” assignment can mix dependency restructuring, new mapping and unrelated
cleanup into a patch whose failures are difficult to explain.

| Produced report | Old consumer | Upgraded consumer |
| --- | --- | --- |
| Default/explicit v1; `HOLD` is `open` | Supported | Supported |
| Opt-in v2; `HOLD` is `paused` | Unsupported | Supported |
| `paused` incorrectly labelled v1 | Rejected | Rejected |

A check asserting that the old consumer rejects v2 can pass. That documents an
unsupported combination; it is not permission to send v2 to that consumer. A
producer's green tests are only one layer of the evidence. Routing, replay and
stored artifacts require their own checks where those mechanisms exist.

## Watch or try

### Part A — review a proposed harness

Use the [companion worksheet](../demo/section-08-harness-and-enterprise-lab.md)
to name scope, candidate identity, enforcement mechanisms, evidence, cancellation
and acceptance ownership. Work through the six failure cases before adding any
infrastructure. For each proposed guarantee ask: “What would I execute to falsify
this, and what artifact would prove the outcome?”

A short discussion prompt is enough:

> Review this exporter-run design for stale evidence, execution boundaries and
> cancellation gaps. Name the responsible component and an observable failure case
> for each gap. Do not implement a controller or treat the worksheet as enforcement.

Your output is a design with explicitly unimplemented controls, not a claimed
sandbox or production-ready harness.

### Part B — inspect and run the separate exporter

The companion supplies a direct local Node route using fresh copies of the existing
sources and prepared references. No course helper, Python, dependency installation
or todo-app branch is involved. It shows the baseline, behavior-preserving seam,
feature expectations before implementation, and completed reference in order.

For an agent-assisted attempt, use a separate learner copy and begin with:

> Inspect the exporter, adapter, fixture and consumers. Explain the status change
> point, current behavior and the smallest useful seam. Separate observations from
> assumptions. Do not edit yet.

Then authorize only the seam and focused characterization. Once reviewed, authorize
the versioned feature with the contract above. Keep all edits inside the learner
copy, preserve unrelated work, and do not copy a reference over an attempted
solution. Ask for actual commands and outcomes, not a reconstructed success story.

At the end, explain why the old-consumer rejection is expected, which checks ran
against which candidate, and what the exercise cannot establish. The historical
[preparation review](../_build/section-08/review.md) records prior author-side
checks; it is not evidence that you ran the new route, that OMP completed the
change, or that a real enterprise integration is ready.

## Use at work

### Part A — put evidence and operation ownership into the workflow

Start with one bounded maintenance task and existing CI/review facilities. Record
the candidate actually tested, including dirty changes when applicable. Treat
missing tools, stale evidence, test failures and unknown operation outcomes as
different states with different next actions. Do not retry a consequential action
until its previous outcome is reconciled.

Before delegating, define non-overlapping ownership, shared interfaces, required
checks and a handoff format. One integration owner evaluates the combined result.
Parallel work is helpful when tasks are independent; extra workers cannot remove
a dependency between a producer contract and its consumers.

### Part B — deliver through compatible states

A plausible rollout design is to deploy the producer while leaving v1 as default,
upgrade and verify a consumer while it still reads v1, then enable v2 only on that
consumer's route. Observe rejected records, counts and replay behavior. Expand
only when remaining consumers and owners are identified and verified. This is a
proposal for a real delivery system, not functionality implemented by the lab.

Rollback is more than reverting source. Disabling v2 output does not remove v2
files already stored or queued. Decide who retains a compatible reader, quarantines
incompatible artifacts, or approves conversion/replay. For a database change,
ask whether old code can read data written by new code. Separate repositories
also cannot be assumed to deploy atomically.

Use a small acceptance record: preserved behavior, intentional change, supported
consumer pairs, exact evidence, unknown boundaries, rollout owner and recovery
procedure. The central platform team cannot accept business behavior on behalf of
repository or consumer owners. A safe handoff makes those limits visible rather
than hiding them behind “all tests pass.”

## Go deeper

### Sources and adaptation

- **Official OMP sources:** [README tool inventory](https://github.com/can1357/oh-my-pi/blob/main/README.md),
  [Tool approval mode](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md),
  and [Agent Hub](https://github.com/can1357/oh-my-pi/blob/main/docs/agent-hub.md).
  These ground the host, approval and agent-control statements above. Capabilities
  depend on the installed version/configuration; none implements this worksheet
  merely because it is written down.
- **Feathers:** [recommended book](https://www.informit.com/store/working-effectively-with-legacy-code-9780131177055),
  [Characterization Testing](https://michaelfeathers.silvrback.com/characterization-testing),
  [Seams excerpt](https://www.informit.com/articles/article.aspx?p=359417&seqNum=2),
  and [Seam Types](https://www.informit.com/articles/article.aspx?p=359417&seqNum=3).
  The concepts are adapted to an original JavaScript example; no full-book
  reproduction or claim to have reviewed every chapter is intended.
- The harness worksheet, exporter, local consumers, prompts and rollout scenario
  are **course-authored teaching examples**. Prepared source stages and historical
  results are worked examples, not live agent traces or enterprise evidence.

### Harness and enterprise reading

- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — compare initialization, incremental progress and continuation records with your actual needs; not a required OMP architecture.
- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — tasks, repeated trials, outcome checks and grader calibration.
- [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) — further case-study reading on evaluator feedback and revisiting orchestration; do not generalize its performance results to this course.
- [Patterns of Legacy Displacement](https://martinfowler.com/articles/patterns-legacy-displacement/) — incremental replacement across technical and organizational boundaries.
- [Pact documentation](https://docs.pact.io/) — consumer/provider contract-testing concepts. The two local reader modules are not a Pact deployment.

### Optional viewing and listening

- [Michael Feathers: Looking Back at Working Effectively with Legacy Code](https://www.infoq.com/podcasts/working-effectively-legacy-code/) — audio and transcript; listen for the distinction between observed behavior and correctness.
- [Workflows of Refactoring — Martin Fowler](https://www.youtube.com/watch?v=vqEg37e4Mkw), listed on the [speaker's video index](https://www.martinfowler.com/videos.html) — identify preparation that helps the requested feature versus unrelated cleanup.
- [Tap into Fast Flow with Team Topologies & Platform Engineering](https://gotopia.tech/articles/354/tap-into-fast-flow-with-team-topologies-and-platform-engineering) — Manuel Pais and Julian Wood; discuss platform responsibility versus product-team ownership.

No recording is required for the lab. Resource inclusion is not a claim that full
playback or a classroom rehearsal has been completed.

[Companion lab](../demo/section-08-harness-and-enterprise-lab.md) · [Back to outline](../OUTLINE.md)
