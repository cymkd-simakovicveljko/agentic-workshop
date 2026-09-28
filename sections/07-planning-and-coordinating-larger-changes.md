# 7. Planning and coordinating larger changes

**Main outcome:** keep a change on course when one increment depends on another
and a requirement changes after work has landed. You will choose an approach,
deliver a first local increment, identify what the new requirement invalidates,
and decide what to accept, defer or stop.

This is not a lesson in producing more tickets. The bounded workflow from
[section 4](04-the-everyday-workflow.md) still applies; the additional work is
keeping decisions, ownership and evidence consistent across dependent increments.
Use one maintained note or your existing tracker. No planning framework,
coordinator service or provider call is required.

## Understand

### Begin with an outcome that can be disputed

The separate ticket exporter gives us a small but real dependency. It maps
internal ticket states into a versioned report that another module reads. Today,
the baseline represents `HOLD` as `open`. A reporting owner wants paused tickets
counted separately. Changing the producer is not enough if the selected reader
cannot consume its output.

The [coordination lab](../demo/section-07-coordination-lab.md) starts from the
existing baseline in a fresh disposable directory. It does not use the missing
todo app, the section 6 scratch directory or work completed in section 8. All
sources are local, and the consumers are modules, not deployed services. The
course-authored delivery decisions below make their dependency concrete without
pretending that the fixture has production infrastructure.

First write the intent in ordinary prose: paused work needs its own count, while
closed and unknown-state behavior must remain understood. Define what is excluded:
no database, routing service, queue, deployment, owner cleanup or extra format.
Then name the question that changes the approach: **must the old reader keep
working with ordinary no-argument exports?** An agent cannot infer the answer
from the existence of `consumer-v1.mjs` alone. It must come from the accepted
scope, and that scope can change.

A proportionate specification carries enough examples to distinguish success
from a plausible wrong implementation. Here, the fixture already gives us three:
`T-03` is closed, `T-20` is on hold, and `T-09` has the unknown `MYSTERY` state.
Moving `T-20` to paused must not move every non-closed ticket there. The timestamp,
owner fallback and identifier order remain part of the preserved behavior.

### A design decision creates work and makes assumptions visible

There are two reasonable approaches under different requirements:

| Approach | When it fits | Consequence to plan for |
| --- | --- | --- |
| Make v2 the default and adopt the upgraded reader together | Every intended caller can move in the same controlled cutover | Existing no-argument callers receive a different version; an old reader will reject it. |
| Keep v1 as the default and make v2 explicit | An old path must continue unchanged while a new path opts in | The new path must request v2 deliberately; two supported paths need evidence. |

Neither is universally safer or simpler. A coordinated replacement can be small
when all callers are known and movable. If that premise is false, an in-place
default change is a compatibility break. Record the premise beside the choice so
that a later requirement has something concrete to invalidate.

In the lab's first packet, the owner authorizes a controlled local cutover to v2
and says the old reader need not remain supported on that intended path. This is
an explicit teaching decision, not a claim about an actual deployment. The first
increment therefore makes v2 the default in a disposable candidate. Only after
that increment is inspected and exercised does a second packet require the old
no-argument path to remain. The point is to replan honestly, not to guess the
second packet in advance and claim the first decision was never made.

### Order increments by the uncertainty they remove

A file list is not a delivery plan. “Edit exporter, edit consumer, write tests”
misses the dependency and the acceptance boundary. Instead, identify the riskiest
assumption and arrange feedback before dependent work becomes expensive.

For this case, first inspect the existing producer and both readers. The old
reader accepts only v1; the upgraded reader accepts v1 and v2, but accepts
`paused` only in a v2 report. This establishes the technical constraint before
any edits. Then prepare and check the producer candidate. Consumer adoption
follows the agreed report contract, and combined acceptance must exercise the
actual producer-to-reader call, not two unrelated success messages.

| Increment | Exit evidence | What depends on it |
| --- | --- | --- |
| Establish the current contract and choose the cutover approach | Baseline assertions, inspected reader restrictions and an explicit default-version decision | Both implementation and consumer-use expectations |
| Deliver the first producer candidate locally | Actual report version and rows, preserved mappings, and the known old-reader rejection | Adoption of that report by the intended reader |
| Integrate the consumer use | Actual producer output read by the chosen consumer; no silently unsupported intended path | Acceptance of the combined local behavior |

These increments exist because a result changes what can safely happen next.
They are not sized by line count, context-window size or a target number of
agents. The first producer candidate can be accepted **as an increment** without
being accepted as the final integrated change. Say which claim you mean.

### Ownership is responsibility for a boundary

One engineer can own all the roles. Naming them still helps: someone must decide
the requirement, someone must produce the report, someone must verify the
reader's use, and one integrator must reconcile the combined candidate and its
evidence. An assignment should say what the recipient may change, what they must
preserve, what they depend on and what result returns to the integrator.

Do not run dependent edits in parallel merely because tools can spawn workers.
The producer's default and the intended reader cannot be decided independently.
Once that contract is agreed, an independent reader-constraint review can run
while the implementer prepares the producer. Two writers changing the same
exporter or acceptance record still collide even if each works in a separate
checkout; the integrator eventually has to choose a coherent result.

OMP children do not inherit the parent's whole conversation. Give them the
accepted packet, exact candidate, owned files, constraints and return criteria.
Inspect effective permissions when a read-only boundary matters; the words
“inspect only” are guidance, not containment. Section 3 owns the
[host controls](03-working-with-omp.md); section 6 owns
[interruption and recovery](06-reliable-execution.md). Here we use those controls
in service of dependency management, rather than teaching another command list.

## Watch or try

### Work through the staged packet

Use the [full lab](../demo/section-07-coordination-lab.md) in order. Its first
packet gives current behavior, requested behavior, constraints and acceptance
examples. Before opening the worked answer, write your approach and identify the
producer-to-reader dependency. Explain why the first increment earns its place.

The provider-free route copies existing reference source into a disposable
candidate and changes one documented default. It is a prepared implementation
route, not evidence that an agent independently found or implemented the design.
A learner implementation may use the same accepted packet in that directory;
either route still has to make and defend the coordination decisions.

Run the first increment and record the candidate and output. Do not open the
changed requirement merely after writing a plan. There must be something real
to reconsider: code with a v2 default, checks that expect it, and pending work
built on the premise that the old reader can be retired.

### Reopen decisions when intent changes

The second packet says an existing no-argument caller and its v1 reader must
remain unchanged. Paused reporting is still wanted, but only the new use may opt
in. This is not a failed implementation of the first packet. It changes accepted
intent after the first local increment.

Pause dependent work long enough to classify the consequences:

| Item | What the changed requirement does to it |
| --- | --- |
| Decision to make all ordinary exports v2 | Invalidates it for the now-required old path |
| Implemented default of `formatVersion = 2` | Requires a code change, not just a note |
| First-increment check expecting v2 from `exportTickets()` | Becomes historical evidence for the old packet, not an acceptance check for the revised one |
| Mapping exact `HOLD` to `paused` in explicit v2 | Remains useful and should be retained |
| Work to retire the old reader | Must be cancelled or deferred explicitly, not left active in a stale task list |
| Evidence for the integrated final state | Must be obtained again after the default and consumer-use decisions change |

Do not delete the old result or rewrite history to say it never passed. Its
claim changed: it explains what the earlier candidate did under the earlier
requirement. Likewise, do not retain the old expectation as a permanent failing
test and call the revised implementation broken. Keep useful checks, replace
invalid expectations because the accepted contract changed, and preserve why.

The new plan retains the v2 mapping, restores default v1, and makes the new
reader's call explicit. The old baseline assertions become useful regression
evidence again. An explicit v2 call must produce the paused count in the upgraded
reader; sending that same report to the old reader must still reject. Rejection
proves an unsupported combination is detected, not that using it is safe.

### Make a decision, not a status summary

“Most work complete” does not answer whether anything should be accepted. Name
the candidate, the requirement revision and the evidence boundary:

- **Accept** the combined local change only when the preserved no-argument path
  and the explicit-v2 path have both been exercised on the revised candidate.
  Local acceptance is not authorization to deploy.
- **Defer** retirement of the old reader because it conflicts with the new
  requirement. Defer deployment claims because this example has no deployment
  path to exercise. These are different reasons and need different next owners.
- **Stop** if the packet demands that the same unchanged v1 reader accept a
  `paused` report labelled v1, or requires changing a caller while forbidding its
  change. Surface the contradiction; do not remove validation or relabel the
  data to manufacture agreement.

A fresh reader then tries to continue from your maintained record. Use the
[section 5 handoff](../demo/section-05-context-and-handoff.md), with links to the
current requirement, dependency decisions and candidate evidence. If the reader
selects the obsolete default-v2 candidate, the record failed even if every task
has a checked box. Fresh-session continuity tests the coordination record; it is
not the purpose of the change.

## Use at work

### Integrate evidence as deliberately as code

A producer check can establish a report shape. A reader check can establish what
an accepted input does. Only the integrated call establishes that the chosen
producer output is accepted by that reader at the recorded candidate. Preserve
the checks that exercise old behavior as well; a new successful path can coexist
with a broken old one.

When several contributors work independently, name the integration owner before
dispatch. Agree interfaces and ownership first, collect actual results, resolve
conflicts against the current requirement, then run the combined checks once the
candidate is stable. If another edit changes the candidate afterward, determine
which evidence is stale. “Everyone passed their tests” does not reconcile
incompatible assumptions.

Keep facts with different lifetimes separate. The accepted behavior is maintained
until a decision changes it. A design assumption remains conditional. A command
result describes one candidate at one time. Current operation state can become
stale immediately. Linking these in one record is useful; copying them into a
brief, tracker and handoff as three authoritative versions is not.

### Assess the connected decisions

The lab is complete when you can defend intent, approach/order, ownership,
evidence and replanning together. A reviewer should be able to point from a
requirement to the decision it shaped, the increment that implemented it and the
check that supports acceptance. Then they should see what the second packet
invalidated and why your final accept/defer/stop decision follows.

No score is awarded for ticket counts, framework folders, agent counts or a
polished plan. A learner who stops on a genuine contradiction with precise
evidence has exercised better judgment than one who completes a weakened
requirement. Reading a worked answer is preparation; making and testing the
staged decisions is the exercise.

## Go deeper

### Optional: borrow collaboration and change-record practices

FSAD's useful contribution here is its collaborative discovery–specification–
planning loop. Product intent, user consequences and engineering constraints
meet before dependent implementation. In the lab, a reporting owner may want a
single new format while a legacy-consumer owner cannot move. A discussion that
reveals that conflict can prevent a wrong cutover decision. One agent speaking
in several roles is preparation, not evidence that those owners agreed.

OpenSpec separates the maintained current contract from a proposed change. That
helps here because a v2-default proposal, a completed local increment and a
revised opt-in-v2 proposal are not the same state. A delta can modify the default
requirement while retaining the v2 mapping. Archiving a proposal or checking a
task box does not establish runtime acceptance; maintain status from evidence.

The [optional lab comparison](../demo/section-07-coordination-lab.md#optional-framework-comparison)
uses this same changed requirement, not a second filter-writing exercise. A plain
note is a serious baseline. Give every representation the same facts and judge
whether it exposes a contradiction or makes stale work easier to find. If it
adds only duplicated requirements, keep the plain note.

OMP is the host, FSAD a methodology, and OpenSpec a specification/change workflow.
They can inform one another without an official integration being implied. No
installation is part of this course path. If you separately trial a tool, inspect
its current host-specific setup and generated instructions; documentation for Pi
is not proof of identical OMP support. Record adoption and removal costs, and
keep one owner for the canonical decision.

### Keep section 8 distinct

This section uses an existing implementation to practice coordination under a
changed requirement. [Section 8](08-advanced-harness-design-and-enterprise-scale-work.md)
starts independently. Its existing-system route teaches characterization,
behavior-preserving seams, implementation of opt-in v2 and a broader compatibility
matrix. Its other route examines harness controls. Completing this coordination
exercise establishes neither of those advanced outcomes.

### Sources and adaptation

- The [supplied exporter baseline](../demo/section-08-legacy/src/exporter.mjs),
  [old reader](../demo/section-08-legacy/src/consumer-v1.mjs),
  [upgraded reader](../demo/section-08-legacy/src/consumer-v2.mjs) and
  [completed reference](../demo/section-08-legacy/reference/completed-exporter.mjs)
  ground the local contract. The staged requirement changes and role assignments
  are authored teaching decisions, not recovered stakeholder or production facts.
- [OMP 18.2.9 task-tool documentation](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/tools/task.md)
  grounds child context and isolation caveats. The course makes no provider-run
  or effective-permission claim from that documentation alone.
- [FSAD workflow](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/workflow)
  and [comparison](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/comparison)
  describe the methodology and its author's claims. Borrowing a discussion
  practice does not establish its staffing or speed claims.
- [OpenSpec concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
  describes specifications, deltas and the change lifecycle. Its
  [supported-tools reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)
  is optional, moving integration documentation, not a verified classroom install.
- Further optional comparisons: [Spec Kit](https://github.com/github/spec-kit)
  connects specifications, plans and tasks; [Superpowers](https://github.com/obra/superpowers)
  packages practices such as planning, debugging and review. Adopt a practice for
  a demonstrated omission, not merely because another course uses its name.
  Retained supplementary videos are [Spec Kit overview](https://www.youtube.com/watch?v=a9eR1xsfvHg)
  and [Don't Build Agents, Build Skills Instead](https://www.youtube.com/watch?v=CEvIs9y1uog);
  neither is command authority or required viewing.

All packets, prompts and worked responses are course-authored. Source inspection,
executing a prepared local route, an independent implementation, provider-backed
work and a classroom rehearsal are separate kinds of evidence. The lab tells you
what to run; it does not claim you already ran it.

[Previous: verification, diagnosis and recovery](06-reliable-execution.md) · [Next: advanced routes](08-advanced-harness-design-and-enterprise-scale-work.md) · [Back to alternative outline](../alternatives/eight-section-outline.md)
