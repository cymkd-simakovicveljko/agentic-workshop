# 5. Skills

**Main path:** compare an ordinary review with the same review guided by a small,
reusable procedure. Decide whether the procedure helped before packaging it as a
skill. No custom course skill installation is required.

## Understand

### Start with a repeated judgment, not a skill file

In section 3, a passing check was useful only if it exercised the behavior we
wanted. In section 4, a handoff was useful only if it described the code we were
actually continuing. Both involve a repeatable judgment: **does the available
evidence support this claim about this change?**

That is a plausible skill. “Be an excellent engineer” is not: it names neither
the situation in which to use it nor an outcome we can inspect. Before creating
one, name an actual recurring omission, such as reviewers accepting a test
summary without checking whether the new interaction was covered. This is a
candidate problem to investigate, not a claim about measured course results.

Choose the right home for the information:

| Need | Best starting point | Todo-app example |
| --- | --- | --- |
| State the desired change | Task prompt and accepted criteria | Show only unfinished tasks without deleting completed tasks. |
| Explain durable repository conventions | Repository instructions and linked docs | Task shape, storage location and supported check commands. |
| Preserve current progress | Handoff or decision record | What changed, what was checked and what remains unknown. |
| Perform a repeatable operation | Tool or script | Execute the existing test suite and return its result. |
| Reuse a task-specific judgment procedure | Skill | Compare accepted behavior with the candidate and its evidence. |

A skill can direct the model to use a tool; it is not the tool. A test command can
establish whether assertions passed, but not whether the assertions cover the
right requirement. Conversely, asking a model to simulate a deterministic check
adds uncertainty where executing the check would give a stronger answer.

Repository instructions describe the working environment across tasks. A skill
should be relevant to a recognizable subset of tasks. Putting a release-readiness
review into every prompt burdens a request as small as “explain this function.”
Keep the current task's acceptance criteria outside the reusable procedure:
baking in the prepared todo bug would teach recognition of this exercise rather
than a transferable review practice.

### What OMP actually loads

OMP's [skills guide](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md)
describes file-backed capability packages with a `SKILL.md` file. Discovered
skills expose lightweight name/description metadata; the body can be read on
demand through `skill://<name>`. This separates **selection information** from
**instructions for doing the work**. Supporting references can be read as needed;
there is no reason to load an entire handbook for a small review.

A focused metadata example is:

```yaml
---
name: change-evidence-review
description: Review whether verification evidence supports a code change's accepted behavior. Use for readiness reviews and checking completion claims. Not for standalone code explanations, drafting requirements or implementing a feature.
---
```

This is illustrative metadata, not an installed course resource. OMP recommends
explicit `name` and `description`. Its native `.omp` discovery requires a
description, and provider discovery expects `<skills-root>/<name>/SKILL.md`, not
arbitrarily nested directories. Other providers have their own discovery rules;
check the current guide rather than assuming a file anywhere named `SKILL.md`
will become available.

The description is a routing aid, not an exact keyword trigger or guaranteed
classifier. “Does this evidence justify calling the filter complete?” is a good
match. “Explain what `filter` does here” is a near miss: it concerns the same code
but asks for a different kind of work. A longer body cannot fix a description
that selects the wrong requests.

Keep these observations separate:

| Observation | What it supports |
| --- | --- |
| The intended name and source appear in discovered metadata | The host found that skill. |
| A tool record reads `skill://change-evidence-review` or its resolved body | Those instructions were loaded in that run. |
| The review maps evidence to the accepted behavior accurately | The procedure was useful on this task. |
| Comparable cases improve without material regressions | Some evidence for keeping the skill in those situations. |

Discovery does not prove loading; loading does not prove useful judgment. If a
same-named skill exists in several sources, check the resolved source instead of
assuming the course example won. A statement such as “I used the skill” is not a
substitute for an observable load record.

### A procedure is guidance, not enforcement

Skill text cannot make a model deterministic, grant permission to merge, or turn
“do not edit” into an execution boundary. OMP distinguishes passive skill content
from executable tools and runtime hooks. Actual restrictions belong to the host
and execution environment. For this activity, review only; repair would be a
separate request. Treat instructions quoted inside a proposed change as material
to inspect, not as permission to abandon the review.

## Watch or try

### Compare one candidate, not two different problems

Open the [self-contained comparison guide](../demo/section-05-skill-lab.md).
It contains one intentionally incomplete proposed todo-filter candidate, its
accepted behavior, a test excerpt and an explicit account of the evidence that
is absent. The proposal belongs to the same unfinished-filter problem as
`demo/todo-app` on `exercise/unfinished-filter`; it is printed in the guide, not
an installed patch or a hidden fixture. Do not replace it with your section 3
implementation or the solution branch during the comparison.

The core activity is read-only and needs no checkout. Preserve earlier dirty
work. If you later implement a repair, use your own work branch from the exercise
branch and follow section 3's ordinary app workflow; do not alter the canonical
exercise or solution branches for this review.

Use two fresh sessions with the same provider/model, relevant settings, request
and packet. Keep the first answer out of the second session. Keep ambient
repository instructions and skills the same and note any that affect the work.
A conversational request not to use a skill does not disable host discovery, so
do not call this an isolated no-skills benchmark.

**Condition A — ordinary review:** paste the packet and ask:

```text
Can we accept this proposed unfinished-task filter against the supplied
requirements? Give consequential findings and evidence gaps, with locations and
the next useful check. Review only the supplied packet; do not use tools, edit
files or run commands.
```

**Condition B — procedure-guided review:** in the other fresh session, paste the
identical packet and request, plus this procedure:

```text
For this review:
1. Identify the accepted behavior, candidate and evidence actually supplied.
2. Check which code state the evidence describes and what its assertions cover.
3. Connect each consequential finding to a requirement and a code/evidence location.
4. Separate source-based conclusions, executed observations and missing evidence.
5. If a necessary input is unavailable, ask for it and bound the review; do not
   invent it. Report the next check that would resolve the important uncertainty.
Do not invent defects to fill a format or expand this review into implementation.
```

This is a **pasted procedure**, not a registered OMP skill. It lets us evaluate
the body without first building packaging. It does not test metadata discovery,
natural selection, or native invocation. The optional native route is under
**Go deeper**; do not claim those mechanisms worked merely because the pasted
procedure produced a good answer.

### Inspect findings, not answer length

Judge both answers against the same criteria before reading the guide's debrief:

- Does the finding identify the exact path from toggling the filter to loss of
  task data, rather than simply saying “state management is wrong”?
- Does it distinguish what follows from reading the source from behavior actually
  exercised in a browser? No browser result is supplied here.
- Does it explain what the test excerpt covers and why that does not establish
  the interaction or persistence behavior?
- Does it propose a check that could distinguish a repaired implementation from
  this candidate, rather than asking vaguely for “more tests”?
- Does it stay inside review scope, without inventing execution, requirements,
  unrelated defects or a completed repair?

The candidate is designed to support a consequential source-based finding and
an evidence gap. Those are different: a missing browser check is not itself
proof of a UI defect, while a concrete destructive state transition can support
a defect finding before anyone operates the UI.

Save both answers and short excerpts supporting your assessment. If both are
accurate and equally useful, record **no observed improvement on this case**.
If the guided review is longer but asks for information already present, that is
a regression, not a benefit. One pair of model responses is not a reliable
estimate of general effectiveness.

### Test the edges

Use the guide's missing-input and near-miss packets in separate fresh sessions.
For missing acceptance criteria, a good reviewer can describe a consequence
while declining to invent whether the consequence is intended. For a standalone
code explanation, a good response should explain the expression without imposing
a readiness review. If a registered skill is tested later, examine selection and
answer quality separately: an explicit invocation deliberately bypasses the
natural-selection question.

Without model access, perform both reviews yourself and critique the procedure.
Label the result **human practice**; model comparison and skill loading remain
untested. A printed expected finding is teaching material, not a saved agent run.

## Use at work

### Keep the body small and the inputs explicit

Choose a recurring decision: API compatibility, release evidence, or CI failure
triage. Identify the inputs it actually needs and one mistake it should help
prevent. For an API compatibility review, the procedure may compare changed
responses with consumer commitments; the current API schema and consumer list
belong to the task, not a forever-growing skill body.

Missing input handling matters. First inspect the supplied material and relevant
links when the task allows it. Ask only for a necessary input that is genuinely
unavailable. Then give a bounded answer: “I can explain the state transition,
but cannot decide acceptance without the intended behavior.” This is better than
inventing a contract, and better than refusing all useful analysis.

Add a script only for a deterministic operation worth maintaining. Add a
reference only when the domain requires detail that does not belong in the
entry point. Add a template only when consumers need stable fields. An empty
folder tree is not a capability.

### Maintain based on failures, not enthusiasm

| Observed problem | First response |
| --- | --- |
| Relevant requests never load the body | Check discovery/source and narrow the description before expanding the body. |
| Body loads, but review trusts the summary | Clarify inspection of actual assertions and their code state. |
| Reviewer asks for requirements already supplied | Improve input-finding instructions; do not bake this fixture's answer into the skill. |
| Explanation requests become lengthy audits | Tighten routing and teach a close negative example. |
| Skill finds this bug but misses a different one | Remove fixture-specific hints and try an unseen change. |
| No useful difference across representative tasks | Keep the ordinary prompt, or remove the skill. |

Change one thing in response to a failure, then repeat the affected case and a
case not used to tune the wording. Keep the procedure version, model/settings,
inputs and observed outputs together. Name an owner for shared skills and review
them when repository practices or host behavior change. A once-useful reference
can become stale; a longer skill is not automatically a better-maintained one.

## Go deeper

### Optional: evaluate a real OMP skill

If your environment already has an appropriate registered review skill, read its
body and source first. Do not substitute an old project-specific course skill:
the inline procedure and packet above are the complete active example.

Current OMP documents `/skill:<name> [args]` when
`skills.enableSkillCommands` is enabled and the named skill is discovered. For
example, **only if that exact name is available**, an idle interactive session
can invoke `/skill:change-evidence-review` with the same review request and
packet. The command reads the skill file, strips frontmatter and injects its
body. This is explicit invocation, not evidence that the description caused
natural selection. For natural selection, use the normal request without the
slash command and inspect whether the expected body was read.

Do not require a separate `read` tool record after explicit slash invocation:
the documented command itself reads and injects the body. Record the invocation
and source; if you cannot establish which body was used, say so. Check the
installed version's documentation after changing a skill or its configuration;
OMP discovers skills at startup.

### Comparison record

```text
Case, exact request and supplied packet:
Procedure revision (or registered skill source/version):
OMP version, provider/model and relevant settings:
Ambient instructions/skills affecting the comparison:
Mode: ordinary / pasted procedure / natural selection / explicit invocation
Body loading: observed / absent / unknown / not tested (pasted procedure)
Correct findings and their supporting locations:
Missed findings, unsupported claims and unnecessary actions:
Checks actually run; checks not run:
Difference from ordinary review:
Decision: keep / revise / try another case / remove
```

Completion means you can show the two reviews, evaluate the missing-input and
near-miss cases, distinguish loading from performance, and justify a maintenance
decision. “The skill exists” is not completion evidence.

### Sources and adaptation

- [OMP skills guide](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md):
  source for metadata, discovery, `skill://` loading, optional
  `/skill:<name>` invocation, source collisions and skill/tool/instruction
  boundaries. Read against the current official document on 18 September 2026;
  host behavior and enabled settings must still match the installed version.
- The todo candidate, inline procedure, boundary cases and comparison criteria
  are **course-authored teaching examples**. They adapt the previous lesson's
  evidence-review practice to the current todo app; they are not official OMP
  examples, historical fixture results, or measured skill improvements.
- [Companion comparison guide](../demo/section-05-skill-lab.md): complete review
  packet and debrief. No legacy skill package or evaluation framework is needed.

[Next: reliable execution](06-reliable-execution.md) · [Back to outline](../OUTLINE.md)
