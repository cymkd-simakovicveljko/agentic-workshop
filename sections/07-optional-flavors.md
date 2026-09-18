# 7. Optional flavors

**Main path:** describe the same unfinished-task filter three ways, then decide
whether the extra structure earns its upkeep. OMP remains the host. No framework
installation, generated command pack or additional app is needed.

## Understand

“Show only unfinished tasks” is a small request, but it still contains decisions.
Does the app hide completed tasks or delete them? What happens when you complete
one while the filter is on? Can someone reading a proposal tell whether the
checkbox exists today? A capable model cannot settle these product questions by
choosing a framework name.

The everyday workflow already gives us exploration, specification, planning,
implementation, verification and review. An optional practice should improve a
particular weak point, not replace that responsibility.

| Recurring observation | Practice worth trying | What it does not establish |
| --- | --- | --- |
| People disagree about the interaction only after code review | Bring product, UX and engineering into a joint specification discussion | That the people represented actually agreed, if one agent simulated all three |
| Reviewers mistake proposed behavior for shipped behavior | Separate current requirements from a proposed change | That either document matches the running app |
| The same planning or review questions are repeatedly omitted | Reuse an explicit workflow or focused skill | That every template or worker is useful for every task |
| A short brief and current checks already resolve the change | Keep plain OMP and the everyday workflow | That simplicity means skipping verification |

### Different layers, not competing models

**OMP is the execution host:** it supplies the interactive agent and tools. In
this lesson, plain OMP means an ordinary task prompt without installing a new
methodology. Plain prompting can still have excellent examples and a durable
brief; it is not the deliberately weak control group.

**FSAD (Full Stack Agentic Development) is a methodology.** Its playbook describes
cross-functional pods, shared Markdown specifications and a five-phase loop:
intent and discovery, live specification, implementation planning, agent
execution, and human review and shipping. We borrow the joint specification
conversation, not its entire rollout or parallel-execution prescription.

**OpenSpec is a specification/change workflow.** Its concepts separate current
specifications in `openspec/specs/` from proposals in `openspec/changes/`. A change
can contain a proposal, behavioral deltas, design and tasks. Deltas describe
added, modified or removed requirements. Its lifecycle connects completed changes
back to the maintained specifications and preserves history. Here we borrow that
visible separation; the examples are not an installed or CLI-validated project.

These practices can compose. A discussion could resolve a decision directly in a
change proposal while OMP handles the repository work. Similar Markdown does not
prove official integration, however, and copying the same rule into three active
specifications creates three opportunities for drift.

## Watch or try

### Hold the task and evidence constant

Use `demo/todo-app` on a learner branch starting at
`exercise/unfinished-filter`. It is a standalone Git repository nested inside the
course, not a directory whose branches belong to the outer repository. Follow the
[safe setup in the comparison lab](../demo/section-07-flavor-lab.md#start-from-the-same-baseline).
If your section 3 implementation already exists, preserve it rather than resetting
it to manufacture a fresh attempt.

**Current baseline:** add, complete and delete tasks; persist task data in
`localStorage`; display both unfinished and completed tasks. The filter is a
proposal, not baseline behavior. Inspect the selected branch before asserting
what it currently does.

All three routes receive this same requirement and acceptance examples:

> Add a labeled checkbox to show only unfinished tasks. It is off initially.
> Turning it on hides completed tasks; turning it off restores the full list
> without deleting or changing them. Existing add, complete, delete and task
> persistence behavior stays intact. Do not add a persisted filter preference.

| ID | Acceptance example shared by every route |
| --- | --- |
| A1 | With unfinished “Write brief” and completed “Send invite,” initial view shows both and the filter is unchecked. |
| A2 | Check the filter: only “Write brief” is visible. Uncheck it: both return with their original completion states. |
| A3 | With the filter on, complete “Write brief”: it disappears immediately. Turn the filter off: it returns completed. |
| A4 | Add a task while filtering: the new unfinished task appears. Delete a visible task: it remains deleted after toggling the filter and reloading. |
| A5 | Reload after task changes: tasks and completion states persist, including completed tasks hidden by the filter. The checkbox starts off again. |
| A6 | Empty and all-completed collections do not crash. Filtering an all-completed list leaves no visible tasks; turning filtering off restores them. A labeled checkbox is usable with the keyboard. |

These are course-authored product choices, not rules imposed by FSAD or OpenSpec.
In particular, persisting task data does not imply persisting a new view
preference. A real team could choose otherwise, but it would change the brief for
**all** routes before comparing them.

### Route 1: a plain OMP brief is a serious baseline

Here is a useful brief, not merely “add a filter”:

> **Proposed:** Help me focus on unfinished tasks without losing completed ones.
> Add an initially unchecked “Show unfinished tasks” checkbox. It changes the
> visible list, not stored tasks. Apply A1–A6 above. Keep the existing app and
> dependencies; no backend, new storage format or persisted filter preference.
> First inspect the app and tests, then propose the smallest change and checks.
> Implementation has not been authorized or verified yet.

Open OMP with `omp` in the app repository and give it the shared examples plus:

```text
Review this filter brief against the app and its tests. Do not edit files.
Separate current behavior, proposed behavior and unresolved questions.
Give a small plan and map A1–A6 to automated checks or browser observations.
```

A useful answer would explain how task state survives a view change, identify the
existing rendering and persistence paths, and propose checking a full toggle
cycle. An answer saying “add a filter, test it” has not resolved the problem.
More documents would not fix that missing reasoning by themselves.

### Route 2: an FSAD-style conversation exposes a decision

This is an **authored illustration**, not a transcript of a live team or model
run. The participants have the same A1–A6 brief; no route gets secret extra facts.

**Product:** “The goal is focus, not cleanup. Completed tasks must still exist
when I return to the full list.”

**UX:** “Completing the last visible task will make the list empty. That is not
proof the user has no tasks. The checkbox must remain visible so they can restore
the full list, and its label must explain what is hidden.”

**Engineering:** “If we save the filtered array as task state, hidden tasks may be
lost on reload. Keep the collection and derive what is visible. We also need to
check completion while the filter is already on, not only toggling it afterward.”

| Option considered | Benefit | Cost or conflict |
| --- | --- | --- |
| Remove completed tasks from the collection | A shorter list without a view control | Violates A2 and A5; this is deletion, not the requested filter |
| Hide them through an explicit checkbox | Preserves history and restores the full list | Adds control state and an interaction that needs keyboard and transition checks |
| Also remember the filter across reloads | Preserves a user's last view | Changes A5 and adds a preference; outside this agreed change |

The decision is the checkbox-only view. Record its reason next to the shared
acceptance examples, with implementation and verification still pending. The
benefit of the discussion is the surfaced distinction between **empty view** and
**empty data**, not the number of perspectives spoken aloud.

A short prompt can help prepare the discussion:

```text
Review the same A1–A6 brief from product, UX and engineering perspectives.
Surface contradictions and consequences, not three votes. Do not edit files or
invent stakeholder agreement. Which decisions still require a human answer?
```

A solo learner can use these perspectives as questions. That does not replace
consulting actual users, designers or maintainers. If people disagree, record the
disagreement and stop the dependent implementation; do not let a polished
agent-written summary silently choose a winner.

### Route 3: OpenSpec-shaped current and proposed behavior

The [lab's full inline example](../demo/section-07-flavor-lab.md#route-c-openspec-shaped-change-record)
contains current requirements, proposed deltas, rationale, design and unchecked
tasks. The file names below show their roles; you do not need to create them.

```text
openspec/specs/task-list/spec.md                  current baseline
openspec/changes/unfinished-filter/proposal.md    why and scope
openspec/changes/unfinished-filter/design.md      implementation approach
openspec/changes/unfinished-filter/tasks.md       work not yet performed
openspec/changes/unfinished-filter/specs/task-list/spec.md
                                                proposed behavioral delta
```

The important contrast is concrete:

```markdown
Current requirement: Task visibility
The app SHALL display both unfinished and completed stored tasks.

Proposed MODIFIED requirement: Task visibility
The app SHALL initially display all stored tasks. When “Show unfinished tasks”
is checked, it SHALL display only unfinished tasks without changing stored data.
Unchecking it SHALL restore all tasks with their current completion states.

Scenario A2: Reversible filtering
- GIVEN unfinished “Write brief” and completed “Send invite”
- WHEN the filter is checked and then unchecked
- THEN the completed task is hidden only while checked
- AND both tasks retain their completion states
```

The old “always display all tasks” rule needs modification, not an additional rule
that contradicts it. Do not replace it with “support filtering” and accidentally
drop the default and restoration behavior. The complete delta carries A1–A6;
this excerpt is not the entire requirement.

Use OMP as a reviewer without invoking an adapter:

```text
Review this current specification and proposed delta against the same A1–A6
brief and repository. Do not edit files. Find contradictions, lost baseline
behavior and acceptance examples with no planned check. Keep proposed behavior
separate from anything actually implemented or observed.
```

Structural validity, product agreement and working software are different forms
of evidence. A correctly shaped spec can describe the wrong interaction. A
completed task checkbox can be unearned. A passing automated check can still
leave keyboard behavior unobserved. Do not archive an unimplemented teaching
proposal just to make its status look complete.

### Compare results, not labels

Read each output as someone absent from its creation. Can you reconstruct the
default, the state transition, the preservation rule and what remains untested?
Point to an actual difference: an omitted example, resolved disagreement, extra
maintenance burden or clearer status boundary.

The [comparison lab](../demo/section-07-flavor-lab.md) provides all three worked
representations and a selection record. It can be completed by reading and
annotating them without a provider call. No route implements the app by default.

## Use at work

Choose the lightest intervention for a failure you have observed. If people
already agree, a meeting may add nothing. If reviewers repeatedly confuse future
and current contracts, a separate proposed-change record can earn its cost. If
requirements are clear but the agent repeatedly skips investigation, a focused
practice from [section 5](05-skills.md) may be more relevant than a spec framework.

Give each kind of information one maintained home. Keep current behavior in the
accepted contract, proposed behavior in the chosen brief or delta, reasoning next
to the decision, and evidence tied to the reviewed code state. A meeting note can
link to the requirement instead of copying it. When code and specification
disagree, investigate rather than automatically declaring either one correct.

Evaluate both adoption and exit cost: who updates scenarios after a decision
changes, reviews generated instructions, removes obsolete requirements and keeps
history usable when the framework is removed? You can borrow a discussion practice
without committing every future feature to a new toolchain.

A defensible selection record might say: “The discussion made the data-loss risk
explicit, but the plain brief already resolved the product choice. Keep that
brief and add the reversible-filter check to review. Trial a separate change
record when more than one proposed behavior needs coordination.” This is an
illustrative conclusion, not a claimed classroom result.

## Go deeper

### Evaluate a framework claim critically

The FSAD comparison promotes shorter handoffs and faster delivery. Treat its
speed and staffing claims as the author's claims, not course measurements or a
universal description of Agile teams. Shared Markdown does not stay current by
itself; somebody must reconcile it with decisions and implementation.

A fair comparison gives every route identical facts, acceptance constraints and
access to the repository. The second attempt benefits from learning the task. If
you want evidence beyond a classroom discussion, rotate order across groups and
record model, context, configuration, human intervention and actual outcomes. A
single successful attempt does not establish a productivity advantage.

### Other approaches worth recognizing

[Spec Kit](https://github.com/github/spec-kit) supplies structured processes and
templates; its feature workflow connects specification, plan, tasks,
implementation and convergence. Try it when teams repeatedly lose the reasoning
between intent and task lists. Watch for templates filled out without the crucial
default being decided. Its official docs support existing projects too; “only for
new apps” is not a useful dividing line.

[Superpowers](https://github.com/obra/superpowers) packages practices including
brainstorming, planning, TDD, debugging and review. Try a relevant practice when
the missing step is execution discipline rather than product intent. Inspect its
workflow commitments and activation before adopting a collection. Overlapping
skills can add contradictions and unnecessary delegation. A documented Pi setup
is not proof of identical OMP support. Neither tool is installed in this lesson.

OpenSpec's [supported-tools reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)
currently lists Oh My Pi separately from Pi, including `.omp/` skill and command
paths. That is documentation of an adapter, not evidence that this course has
installed or rehearsed it. Any later integration trial should follow current
[setup guidance](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md),
inspect generated files and confirm discovery and invocation in the selected
host/version. Do not copy another host's slash commands into OMP.

### Sources and adaptation

- [Official OMP README — entry points and tools](https://github.com/can1357/oh-my-pi/blob/main/README.md#four-entry-points-interactive-one-shot-rpc-and-acp): source for `omp` launching the TUI and the host/tool distinction. This lesson introduces no framework slash commands or approval/sandbox guarantees.
- [FSAD playbook — workflow](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/workflow) and [comparison](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/comparison): primary description of the methodology; we adapt only selected collaboration practices.
- [OpenSpec concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md): current/proposed separation, requirement scenarios, deltas and lifecycle. [Supported tools](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md) documents host-specific integration; [CLI reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md) is optional reading, not a lab command requirement.
- [Spec Kit introduction](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) and [maintained repository](https://github.com/github/spec-kit): motivation versus current workflow. [Superpowers repository](https://github.com/obra/superpowers): inspect individual practices and host requirements.
- Optional videos retained from the earlier lesson: [Spec Kit overview — Den Delimarsky](https://www.youtube.com/watch?v=a9eR1xsfvHg) for how intent becomes artifacts; [Don't Build Agents, Build Skills Instead](https://www.youtube.com/watch?v=CEvIs9y1uog) for the distinction between a reusable practice and a larger system. These are supplementary resources, not OMP command authority or required viewing.

Primary OMP, FSAD, OpenSpec, Spec Kit and Superpowers documentation was consulted
for this restoration. The todo requirements, discussion, prompts and inline
artifact examples are **course-authored adaptations**. They are not framework
certification, a captured live run, an installed integration or measured results.
The historical owner-search pack is not the active exercise.

[Next: harness and enterprise work](08-advanced-harness-design-and-enterprise-scale-work.md) · [Back to outline](../OUTLINE.md)
