# 6. Reliable execution

**Draft v0 — for review.** Debugging, boundaries, stopping, recovery and deliberate use of subagents.

The agent has made two changes. The crash is gone. Eleven checks now pass.
One accepted behavior still fails, and a useful untracked note is sitting beside
the code. Do you ask it to try again, undo everything, or pause?

In this section, you learn to make that decision from evidence. Reliable
execution means you can explain the current state, control the next action and
recover useful work when a run stops. Failures are part of engineering; losing
the ability to reason about them is the problem we want to prevent.

Section 3 gave us the everyday workflow. Section 4 made the state transferable,
and section 5 packaged a review practice. We will now use those habits when a
repair is incomplete and when another agent might help.

## What you will learn

By the end, you should be able to:

- Turn a failure report into a reproducible observation and a testable hypothesis.
- Distinguish code defects, environment problems, tool failures and unclear requirements.
- Set a useful boundary and explain what actually enforces it.
- Stop deliberately, preserve evidence and account for unfinished actions.
- Resume or restore selected work without discarding unrelated changes.
- Decide whether to delegate, write a bounded assignment and verify the result.

**Proposed format:** 75–90 minutes, including a 30–40 minute recovery lab.
Allow another 15–20 minutes for the optional delegation exercise. These estimates
need a pilot. The [lab guide](../demo/section-06-recovery-lab.md) supplies a fresh
prepared repository and copyable prompts; no prior lab state is required.

## 1. Identify what failed before changing anything

“The agent failed” can describe several different problems. They require
different responses.

| Observation | First useful action |
| --- | --- |
| A check ran and an assertion disagreed with its expected value | Read the expected behavior, actual value and relevant implementation. |
| The process could not start or bind its local test server | Resolve the execution environment before drawing a conclusion about the feature. |
| An edit tool rejected an outdated match | Reread the current file and reconcile the intended edit with its present contents. |
| A tool returned a timeout after submitting an operation | Establish whether the operation took effect before deciding to repeat it. |
| Code and tests disagree with two conflicting requirements | Resolve which behavior is accepted and where that decision came from. |
| The agent says “all fixed,” but supplies no check record | Request the evidence and its code state; do not promote the statement into a result. |

Begin with a compact failure report:

```text
Goal and accepted behavior:
Current repository/revision and relevant uncommitted changes:
Exact action or command, working directory and input:
Expected result:
Actual result, exit code and evidence location:
What changed since the last known working state:
What remains unknown:
```

Do not paste an entire terminal history if a named assertion, its actual values
and the relevant stack location explain the failure. Preserve the detailed log
and point to it. Google's [Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/)
is useful for forming a problem report, testing explanations and matching the
response to the impact of the problem.

**Quick decision:** a test suite never reaches its assertions because a port
cannot open. Would changing the filter improve the evidence? Explain the
environment check you would make first.

## 2. Debug one explanation at a time

An agent can produce plausible explanations faster than you can verify them.
Give each proposed cause an observable consequence.

```text
Hypothesis:
Evidence supporting it:
Smallest check that would distinguish it from another explanation:
Predicted result:
Actual result:
Next decision:
```

The section 6 fixture introduces an unnecessary sort into our name filter.
The accepted contract still requires source order and input preservation.
We keep the same familiar app so the reasoning, rather than another codebase,
is the new work.

### Worked example: the crash disappears, but the task is unfinished

The helper prepares and checks three states. These are **authored teaching
examples with real local check records**, not a transcript of an agent's work.

| State | Implementation idea | Recorded full-suite result |
| --- | --- | --- |
| Working baseline | Filter the source array without sorting it | 12 pass, 0 fail. |
| First attempt | Sort the source array in place, then filter | 1 pass, 11 fail: the frozen input cannot be sorted in place. |
| Second attempt, current state | Copy the source array, sort the copy, then filter | 11 pass, 1 fail: matching results are reordered. |

Many failures in the first attempt share one cause. They do not require eleven
independent fixes. Copying the array removes that mutation failure, but preserves
the unwanted sorting behavior. “Fewer failures” is useful progress information;
it is not the acceptance condition.

The extra check uses this deliberately unsorted input:

```text
Source:       Zebra (z1), Alpha (a), Zebra (z2)
Query:        a
Expected IDs: z1, a, z2
Actual IDs:   a, z1, z2
```

Every name matches. The only disagreement is ordering. The original duplicate
name test used two equal names, while the app's usual records were already in
name order; those examples did not expose this particular sort. The added check
exercises an existing requirement with a discriminating input.

Possible explanations now become easy to compare:

| Hypothesis | Discriminating evidence |
| --- | --- |
| Whitespace normalization is wrong | This query contains no surrounding spaces; inspect the passing whitespace checks. |
| Sorting violates the accepted order | The comparator moves `Alpha` ahead of `Zebra`; compare with the contract and expected IDs. |
| The new check asks for an unsupported behavior | Read the original source-order requirement before changing the expectation. |

The smallest correct repair removes the unwanted sorting. A special case for
these three IDs would pass the fixture for the wrong reason. Changing the test
to expect alphabetical order would silently revise the contract.

### A diagnosis prompt

```text
Investigate the current failure before editing.
Read the accepted behavior, current diff and actual failed assertion.
State a hypothesis and the smallest check that could disprove it.
Explain which evidence distinguishes an implementation defect from a bad
test expectation or an environment problem. Do not repair yet.
```

During a repair, make one coherent change and run the relevant check. Once the
focused case passes, run the appropriate broader checks and inspect the final
diff. Repeating a suite without a change or a new hypothesis usually adds little
information to a deterministic failure.

## 3. Choose whether to retry, repair or restart

These are different actions:

- **Retry:** repeat an operation when a temporary failure is plausible and
  repetition is appropriate. Record why a retry might now succeed.
- **Repair:** change the implementation or environment in response to evidence,
  then test the explanation.
- **Restart the session:** change the conversation context while preserving and
  explicitly reconciling external state.
- **Restore selected files:** replace known work with a recorded version after
  inspecting and preserving what would be lost.

A fresh conversation will not remove the sort, restore an untracked note or
stop a server. A restored file will not undo an external action.

For example, if an upload times out, an immediate repeat may create another
object. First inspect the destination or operation record to establish what
happened. For a failed assertion with the same code and inputs, identify what
you will learn from another run. “Try harder” does not supply that information.

**Discuss:** the agent proposes changing models after the same assertion fails
twice. What useful evidence should travel with the task regardless of which
model investigates next?

## 4. Put boundaries where they can work

A task should define its goal, permitted changes, checks and stopping conditions.
The surrounding environment determines what the process can actually access.

| Boundary | Example | What enforces it |
| --- | --- | --- |
| Task scope | Repair `public/filter.mjs`; preserve accepted tests and data | Instructions guide the agent; review checks compliance. |
| Tool availability | Give a reviewer reading tools without editing tools | Host tool configuration, subject to the actual exposed tool set. |
| Operation approval | Inspect a proposed command before it runs | The host's configured approval policies. |
| Filesystem and network access | Limit a process to a disposable workspace and permitted destinations | Operating-system or execution-environment controls. |
| Work separation | Separate checkouts for concurrent edits | Version-control/workspace setup; it does not isolate credentials or network access. |
| Time or spend | Stop when the agreed investigation budget is exhausted | A human checkpoint or a verified runtime/account limit, depending on setup. |

OMP's [approval documentation](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md)
describes how mode, tool and user policies interact. The course uses
`always-ask`; under its normal tier rules, reads proceed and writes or execution
request approval. Check the effective configuration rather than assuming that
one flag overrides everything.

For the lab, a disposable copy and a small tool set are enough to make the work
inspectable. They are not a claim of complete containment. Keep real secrets,
production services and unrelated repositories out of a teaching exercise that
does not need them.

## 5. Make stopping a useful action

Stop because a meaningful condition has been reached. Useful conditions include:

- The acceptance checks and review support completion.
- The next step needs a requirement decision or access the task does not provide.
- Repeated repairs fail the same accepted behavior without improving the explanation.
- The run starts changing unrelated files or weakening checks to produce a pass.
- The agreed investigation budget expires and the remaining uncertainty needs a new plan.

For a teaching round, you might agree: **pause after two unsuccessful repair
attempts or ten minutes without new evidence, whichever happens first**. This is
an example to tune, not a universal threshold. A failing test is normal feedback;
it is not automatically a reason to abandon an otherwise productive investigation.

OMP's CLI advertises `--max-time` for a session duration limit. Rehearse its
behavior on the installed version before relying on it. A timer for one session
does not by itself establish a combined cost cap or cancellation of every
separately running process and worker.

### Stop, account for actions, preserve the state

1. Interrupt the active turn using the host's current controls and confirm it stopped.
2. Inspect any active command, background job or child agent. Record whether it
   completed, was cancelled, is still running or has an unknown outcome.
3. Wait for or stop the relevant writers before taking a consistent snapshot.
4. Save the code comparison, new files, failure evidence and current revision.
5. Write the remaining uncertainty and the next useful action into the handoff.

OMP documents active controls through `/hotkeys`; the usual abort binding is
Escape, but menus or editing modes can consume it. See
[keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md).
Use the tool or process state as confirmation. Pressing a key is an attempted
interrupt, not proof that every action stopped.

Do not stop unrelated processes simply because they share a name. In the course
lab, you own the terminal running the app server, so stopping that foreground
process is straightforward. More complex process supervision belongs in section 8.

### A checkpoint prompt

```text
Pause further implementation. Report the current goal and accepted behavior,
changes made, actual check results, unresolved hypothesis, and next useful action.
Identify active commands or child tasks and their observed state.
Preserve failed-attempt evidence. Do not describe unknown outcomes as cancelled.
```

The optional lab pauses deliberately after diagnosis. A separate brief interrupt
drill is available; the prepared failure history does not pretend a real live
interruption occurred.

## 6. Recover the work you mean to keep

Before restoring anything, inspect three categories:

| State | Why it matters |
| --- | --- |
| Tracked changes, including staged edits | A comparison with the recorded base identifies the code you might replace. |
| Untracked files | They may contain valuable work and are absent from an ordinary tracked-file diff. |
| Running processes and external effects | They may continue or remain even after a checkout changes. |

In the lab, `notes/keep-me.md` is intentionally untracked. It belongs to another
piece of learner work. A recovery that repairs the filter but deletes this note
has failed the exercise.

Use the [section 4 handoff](04-context-and-repository-knowledge.md) to preserve
accepted behavior, code state, evidence and the next action. Add the stopping
reason and any unfinished process or worker state. Anthropic's
[long-running-agent case study](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
illustrates why progress records and version history help a fresh session
reconstruct work; its full harness is optional background.

### Resume from evidence

```text
Read the saved handoff and linked evidence, then inspect the current files.
Reconcile the recorded revision, relevant changes and current failure.
Identify any untracked work that must survive.
State the next action and its reason before changing the implementation.
Do not treat a previous passing result as proof for a different code state.
```

Then choose the recovery route. You can finish a bounded repair in the current
checkout, or restore a specific file from a verified starting state and recheck
it. The lab supports both. Avoid repository-wide cleanup as a reflex; it can
discard work unrelated to the failure.

The [Git restore reference](https://git-scm.com/docs/git-restore) distinguishes
the source version, selected paths, working tree and index. The lab's restore
route names one file and preserves a copy first. It is a training alternative
chosen explicitly by the learner, not an automatic response to a red test.

## 7. Delegate only a useful independent question

A subagent is another agent session assigned part of the work. It needs enough
context to investigate, a clear output and a way to return its findings. It does
not inherit your understanding merely because it belongs to the same run.

Ask these questions before creating one:

1. Can I state a bounded question with a useful deliverable?
2. Can it proceed without waiting for my next intermediate result?
3. Is there useful work I can do while it investigates?
4. Can we avoid conflicting edits and shared mutable state?
5. Can I verify and integrate the result within a reasonable cost and time?

| Situation | Sensible default |
| --- | --- |
| One small function with a clear failing assertion | Investigate directly. |
| Two separable repository areas require reading | Consider independent investigations with defined questions. |
| A test review can proceed while another person drafts the handoff | Consider a bounded reader; keep the code state stable. |
| Two agents would edit the same function at once | Give one agent ownership, or sequence the work. |
| The proposed child needs a decision the parent has not made | Resolve the dependency before dispatching it. |

GitHub's [selective-delegation case study](https://github.blog/ai-and-ml/how-we-made-github-copilot-cli-more-selective-about-delegation/)
shows why handoff and waiting costs matter. Anthropic's
[multi-agent research report](https://www.anthropic.com/engineering/multi-agent-research-system)
describes benefits for independent research directions and the additional
coordination and resource use. These are particular systems and tasks; they do
not establish that multiple agents improve every coding change.

### Give the child a complete assignment

```text
Question: Which accepted filter behaviors do the current tests exercise,
and what does the section 6 order check add?
Input: contract.md, tests/, public/projects.mjs and the recorded code state.
Scope: inspect only; do not edit, run commands or delegate again.
Deliverable: criterion → test/assertion → coverage limit, with file locations.
Stop: after one pass, or report an essential missing input.
Return findings and uncertainties to the parent; do not approve or repair the change.
```

Meanwhile, the parent can draft the recovery handoff from its actual execution
records. The child supplies a coverage assessment. Those outputs can be combined
without two agents editing the same file. For our tiny fixture, this is a
coordination demonstration; direct review will often be simpler.

OMP supports task agents through its [task tool](https://github.com/can1357/oh-my-pi/blob/main/docs/tools/task.md).
Inspect the child's effective tools, model, workspace and lifecycle before a
live exercise. Its [approval guide](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md#subagents)
specifically documents headless children using a different approval mode, with
the parent task approval as the boundary. Do not assume that the parent’s
interactive prompts will recur inside a child.

The optional lab includes a narrow
[OMP agent-definition example](../demo/agents/course-contract-auditor.md).
It is a host configuration example, distinct from section 5's reusable skill.
Its live discovery, effective tool exposure and cancellation need rehearsal on
the actual learner setup.

## 8. Integrate results and verify the combined state

The parent remains responsible for the whole task. A child returning “done”
means a result is available to inspect, not that the original task is complete.

Check whether the result answers the assigned question, references the right
code state and distinguishes evidence from speculation. Read the relevant source
before accepting a consequential finding. If two reviewers disagree, resolve
the disagreement with a requirement or a discriminating check. A vote is not a
substitute for that evidence.

For delegated edits in larger work:

- Give each worker an explicit area and name one integrator.
- Use separate checkouts when concurrent writes require separation. Git
  [worktrees](https://git-scm.com/docs/git-worktree) provide separate working trees;
  they are not separate credentials or network environments.
- Review each patch against its base, reconcile shared interfaces and inspect conflicts.
- Run the relevant checks on the integrated result, even if each isolated change passed.
- Account for remaining workers before declaring the run finished.

Two locally correct edits can produce a broken combination—for example, one
changes a function's return shape while another adds a caller expecting the old
shape. Integration is engineering work, not merely collecting responses.

After recovery, record the failure mechanism, the successful correction and the
check that distinguishes it from the tempting incomplete fix. Update repository
guidance or a skill only if the lesson is reusable. Temporary incident details
belong with the task evidence.

## Optional practice and completion criteria

In the [recovery lab](../demo/section-06-recovery-lab.md), diagnose the remaining
order failure, pause, save a recovery bundle, and resume in a fresh session.
Repair the filter or deliberately restore its verified baseline, preserve the
untracked note, and verify the result. Add the independent audit only if you
choose the optional delegation exercise.

You are ready to move on when you can demonstrate:

1. A hypothesis connected to an actual failure and a discriminating check.
2. A clear separation between instructions and enforced execution controls.
3. A stop or pause record that accounts for unfinished actions honestly.
4. A recoverable snapshot containing relevant tracked and untracked work.
5. A verified repair with the accepted tests and unrelated note preserved.
6. A justified delegation decision and a plan for checking its result, even if
   the decision is to complete the small task directly.

**Final challenge:** a colleague arrives after you leave. Can they tell what is
still running, which changes are worth keeping, which result is current and what
to do next? Make those answers visible before handing over.

Section 7 will introduce optional approaches through the problems they solve.
Use this section's criteria to judge whether an added workflow improves control,
verification and recovery in your situation.

[Previous: Skills](05-skills.md) · [Back to the outline](../OUTLINE.md) · [Next: Optional flavors](07-optional-flavors.md)

## Resources, videos and links

Start with troubleshooting and the relevant OMP controls. Read the longer system
case studies selectively; building a custom harness is not required here.

### Reading

| Resource | Use it for |
| --- | --- |
| [Effective Troubleshooting — Google SRE](https://sre.google/sre-book/effective-troubleshooting/) | **Start here:** problem reports, hypotheses and useful experiments. Apply the reasoning to the small lab before considering production incidents. |
| [OMP keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md) and [approval modes](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md) | Check interrupt controls and effective approval behavior, including the subagent section. |
| [How we made GitHub Copilot CLI more selective about delegation](https://github.blog/ai-and-ml/how-we-made-github-copilot-cli-more-selective-about-delegation/) | Examine coordination costs and when an independent helper is worthwhile. Its product findings are not OMP performance claims. |
| [How we built our multi-agent research system — Anthropic](https://www.anthropic.com/engineering/multi-agent-research-system) | Compare independent investigations, bounded assignments and result synthesis. Treat measured gains as specific to that research setup. |
| [Effective harnesses for long-running agents — Anthropic](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | Read the progress, incremental work and testing sections; save the full architecture for section 8. |
| [Git restore](https://git-scm.com/docs/git-restore) and [Git diff](https://git-scm.com/docs/git-diff) | Understand exactly which code state a recovery or comparison touches. |

### Videos

| Recording | Suggested focus and follow-up |
| --- | --- |
| [Avoiding Cachepocalypse in the Land of the Monolith — David Amin, SREcon23](https://www.usenix.org/conference/srecon23americas/presentation/amin) | Follow the debugging feedback loop and coordination under uncertain ownership. Identify one observation that should change an investigator's next action. The publisher page includes the presentation video and slides. |
| [How We Debug 1000s of Databases with AI — Annie Zhou and Sophie Zhang, SREcon26](https://www.usenix.org/conference/srecon26americas/presentation/zhou-annie) | Optional larger-scale example: distinguish collected evidence, an agent's explanation and a proposed action. Discuss which practices transfer to our lab; retain the platform design for section 8. |

Publisher pages and recording availability were checked on 12 September 2026.
Full playback and teaching excerpts still need screening. The scheduled talk
slots are not asserted as recording runtimes, and the speakers' performance
claims are not expected outcomes for this course.

### Useful links

- [Recovery lab](../demo/section-06-recovery-lab.md) — preparation, diagnosis, pause, preservation, resumption and optional delegation.
- [OMP contract-auditor example](../demo/agents/course-contract-auditor.md) — a narrow reader for the optional exercise.
- [OMP task tool](https://github.com/can1357/oh-my-pi/blob/main/docs/tools/task.md) and [agent discovery](https://github.com/can1357/oh-my-pi/blob/main/docs/task-agent-discovery.md) — inspect actual worker configuration and behavior before rehearsal.
- [Git worktrees](https://git-scm.com/docs/git-worktree) — reference for later exercises needing separate checkouts.
- [Section 3 workflow](03-the-everyday-workflow.md), [section 4 handoffs](04-context-and-repository-knowledge.md) and [section 5 skills](05-skills.md) — the practices used during recovery.
- [Preparation review](../_build/section-06/review.md) — observed checks and remaining live-host validation.
