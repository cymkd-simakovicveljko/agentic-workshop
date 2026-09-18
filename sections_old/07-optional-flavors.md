# 7. Optional flavors

**Draft v0 — for review.** OpenSpec, FSAD and other approaches, introduced through the problems they solve.

“Let people search by owner as well.”

It sounds like a small change to our project directory. An agent could add an
extra condition to the filter in minutes. But the current contract explicitly
excludes owners. Should everyone get different search results tomorrow? Does the
interface need to explain the change? Who decides, and where does that decision live?

We already have a way to answer: explore, specify, plan, implement, verify and
review. Optional approaches can make parts of that work easier to repeat or
coordinate. This section asks you to choose one because it addresses a problem
you can describe and observe.

## What you will learn

By the end, you should be able to:

- Explain which part of your workflow an approach changes.
- Use an OpenSpec change to distinguish existing behavior from proposed behavior.
- Run a short joint specification discussion using selected FSAD practices.
- Compare these with Spec Kit and a workflow skill collection such as Superpowers.
- Evaluate the extra structure, including its maintenance and exit cost.

**Proposed format:** 70–90 minutes, including a 30–40 minute comparison workshop.
These timings need a pilot. OpenSpec and FSAD receive the main demonstrations;
the other approaches are short comparisons. The [optional lab](../demo/section-07-flavor-lab.md)
works with Markdown and a prepared application. Implementation is an extension.

## 1. Start with the recurring difficulty

Imagine three teams using the same capable model and OMP:

| Team's observation | A useful first experiment |
| --- | --- |
| “We keep confusing a proposed requirement with something already shipped.” | Give current behavior and proposed changes distinct homes and statuses. |
| “Product, design and engineering discover their disagreement during review.” | Bring those perspectives into the same specification discussion earlier. |
| “Every task starts with us explaining the same planning and review procedure.” | Package that procedure and check whether it activates appropriately. |

These are different problems. Installing the same framework everywhere is
unlikely to tell us which intervention helped. Ask for an example from a recent
change: a missed decision, duplicated requirement, unnecessary retry or expensive
handoff. Name what would have prevented it.

For a tiny, well-understood change, a short task brief and existing checks may
already be sufficient. Keeping the section 3 workflow is a valid selection.

**Pause and discuss:** In the owner-search request, what is missing: a better
model, a product decision, a place to record the change, or all three? Identify
the evidence you would need before choosing each answer.

## 2. Separate the layers before comparing names

Here is our teaching map. It groups approaches by the problem we will explore;
their actual capabilities can overlap.

| Layer | Question | Example in this section |
| --- | --- | --- |
| Execution | What runs the agent and provides tools, context and controls? | OMP remains our course host. |
| Collaboration | Who resolves the intent, interaction and feasibility together? | A joint spec session adapted from FSAD. |
| Change records | How do we distinguish accepted behavior, a proposed change and its history? | An OpenSpec change folder. |
| Repeatable workflow | How do we give tasks a consistent sequence and expected outputs? | Spec Kit's spec/plan/task workflow. |
| Reusable practices | How does the agent apply a known procedure when relevant? | Skills, including the Superpowers collection. |

You can use a useful collaboration practice while OMP executes the task. You can
also combine collaboration with a structured change record. That composition
needs deliberate ownership of the documents and a check of the host integration.
Similar-looking Markdown files do not establish compatibility.

The transferable foundation remains the same: understand the repository, resolve
important uncertainty, authorize a bounded change, inspect the result and record
what was actually verified.

## 3. OpenSpec: make the change visible

OpenSpec separates current specifications in `openspec/specs/` from proposed
changes in `openspec/changes/<change-name>/`. A change can contain a proposal,
design, tasks and specification deltas. Deltas express added, modified or removed
requirements; archiving normally merges them into the main specifications and
retains the change history. Its workflow allows iteration as understanding
changes. [OpenSpec concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)

For our exercise, the interesting distinction is **current versus proposed**.
The working filter searches names. The new request is not evidence that owner
search already exists, nor permission to silently replace the current contract.

### Work through the owner-search example

Suppose the people responsible for the product agree on this teaching decision:

> Keep name-only search as the default. Add an unchecked “Include owners” checkbox.
> When selected, match the query against either the name or the owner. Changing
> the checkbox reuses the existing query immediately.

This is an authored course example. In real work, the relevant decision makers
must resolve the choice; the framework cannot do that on their behalf.

Our prepared change has these files:

```text
openspec/
  specs/project-filter/spec.md                 # current behavior, in the lab
  changes/include-project-owners/
    proposal.md                               # why this change is useful
    design.md                                 # how we intend to implement it
    tasks.md                                  # work and verification still to do
    specs/project-filter/spec.md               # proposed requirement changes
```

The main specification belongs to the working baseline. The delta says what we
intend to change. Its scenarios must preserve existing expectations that remain
valid. In particular, replacing a requirement with a shortened “also search
owners” sentence could lose literal matching, source order and duplicate handling.

An excerpt from our proposed delta illustrates the decision:

```markdown
#### Scenario: Owner does not match
- **GIVEN** Include owners is unchecked
- **WHEN** the query is `team`
- **THEN** no projects appear

#### Scenario: Owner matching is enabled
- **GIVEN** Include owners is checked
- **WHEN** the query is `team`
- **THEN** only Borealis appears
```

Keep the existing scenario names when carrying them forward; the pinned CLI also
checks for accidental scenario loss in a modified requirement.

The full [worked change](../demo/section-07-examples/openspec/changes/include-project-owners/specs/project-filter/spec.md)
also handles switching mode, preserving the query, mixed case, whitespace and
result feedback. Read it alongside the existing contract. A reviewer should be
able to explain both what changes and what still holds.

### Follow the information into implementation

The [proposal](../demo/section-07-examples/openspec/changes/include-project-owners/proposal.md)
explains the user problem and scope. The
[design](../demo/section-07-examples/openspec/changes/include-project-owners/design.md)
proposes a backwards-compatible optional filter argument and a native checkbox.
The [tasks](../demo/section-07-examples/openspec/changes/include-project-owners/tasks.md)
connect implementation to checks. All tasks remain unchecked because this pack
specifies a change that has not been implemented.

During the exercise, ask OMP to review the artifacts against the repository before
editing code. An artifact validator can catch structural problems. A human can
catch an unwanted product decision. Tests and browser observations can establish
specific behavior. Keep these forms of evidence distinct.

The lab includes an optional structural check using the course's local OpenSpec
CLI, version **1.13.0**. A passing result does not make the owner-search feature
complete. Do not archive this unfinished example just to produce a tidy folder.
For a real completed change, inspect the resulting specification update and keep
the verification evidence linked to the implementation reviewed.

**Try this review question:** If the mode changes while `team` is already in the
input, which task checks the visible list and which checks the count? If neither
does, an impressive-looking specification pack still has a practical gap.

### OMP integration is a separate check

Current OpenSpec documentation lists an **Oh My Pi** adapter, with project skills
and command files under `.omp/`. It distinguishes OMP from Pi and documents
host-specific invocation names. Do not copy another assistant's slash commands
into OMP and assume they exist. Read the generated setup guidance for the version
you select. [Supported tools](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)

Our core exercise uses ordinary prompts and explicit file paths. It does not
require installing an adapter. A later integration trial should inspect generated
files, confirm discovery in a fresh session, exercise one command, and identify
which skills or instructions affect the run. See the
[setup guide](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md)
for that separate task.

## 4. FSAD: resolve the decision together

FSAD means **Full Stack Agentic Development**. The supplied playbook, labelled
**v40**, proposes small cross-functional pods, live Markdown specification work
and five phases. [FSAD playbook](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/workflow)

| Playbook phase | What to notice |
| --- | --- |
| Intent & Discovery | Establish the problem, outcomes and constraints. |
| Live Spec Session | Product, UX and engineering coauthor decisions. |
| Implementation Planning | Ground the plan in the repository before execution. |
| Parallel Agent Execution | Coordinate implementation and verification work. |
| Human Review & Ship | Review code, design and acceptance before delivery. |

The playbook presents validated checkpoints between phases and separates human
responsibilities from agent execution. For this section we borrow its live spec
session. **This is an adaptation of selected practices**, not a full FSAD rollout
or an OMP plugin. Parallel execution remains optional and subject to section 6's
delegation judgment.

### A short session with three perspectives

Give everyone the [same shared brief](../demo/section-07-examples/shared-brief.md).
Three people can take the product, UX and engineering perspectives. A solo learner
can work through them explicitly, while recognizing that role-play cannot replace
feedback from actual stakeholders.

**Product:** “Someone remembers Atlas team, but not the project name. Help them
find the project. Existing name searches should remain predictable.”

**UX:** “If `Atlas` suddenly returns Borealis, a user may think search is broken.
We need to communicate the extra matching. Should we label a mode, group results,
or explain every match?”

**Engineering:** “The filter already has a name-only contract and callers that
use two arguments. We can preserve those callers and make owner search explicit.
We also need to rerender when the mode changes, not only when text changes.”

Together, compare two reasonable options:

| Option | Benefit | Cost or unresolved issue |
| --- | --- | --- |
| Search names and owners all the time | No extra control | Changes the default results and requires an explicit compatibility decision. |
| Add an opt-in owner mode | Preserves the default and makes intent visible | Adds a control whose state, label and keyboard behavior need verification. |

For the worked example, choose the second. Record the reason and acceptance
examples in one proposed specification. The
[FSAD-style reference](../demo/section-07-examples/fsad-session.md) includes the
decision, an implementation handoff and the evidence still needed.

Notice what made progress: someone surfaced a compatibility constraint, someone
explained a confusing interaction, and the group resolved the trade-off. Calling
the meeting a “live spec session” does not guarantee those events. A useful session
ends with fewer consequential unknowns, visible disagreements and a clear next
action. If the group cannot resolve a decision, record it and stop dependent work.

### Let OMP assist with the discussion

OMP can help identify contradictions and turn decisions into examples. Here is
a bounded prompt for the prepared lab:

```text
Read contract.md, workshop/brief.md and the application and tests they reference.
Review the owner-search request from product, UX and engineering perspectives.
Distinguish facts in the brief from your suggestions.

Present the decision that affects existing behavior and two plausible options.
Explain their consequences. Do not choose on behalf of the product owner.
Do not edit files yet. End with the questions that prevent a clear specification.
```

Once the learner resolves the choice, ask for a draft in `workshop/spec.md` and
review each scenario. Using one agent to simulate perspectives can help prepare
a discussion; it does not establish that independent experts agreed.

### Read the FSAD comparison critically

The supplied [FSAD versus Agile comparison](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/comparison)
argues for fewer handoffs and faster delivery. Its speed and staffing claims
should be treated as the author's claims, not course benchmarks. Compare the
practices with your team's actual workflow; the comparison's portrayal of Agile
does not describe every team.

For our trial, ask concrete questions. Did the discussion expose the owner-search
default before implementation? Can someone absent from the session reconstruct
the decision? When an acceptance rule changes, who updates it and checks the
implementation? A Markdown file stays useful through that maintenance work.

## 5. Two other approaches worth recognizing

### Spec Kit: a repeatable path from intent to work

GitHub's Spec Kit supplies a spec-driven workflow with project principles,
specification, technical planning and tasks. Its current documentation also
describes extensions and checks against the resulting implementation. Consult
the current workflow rather than treating older video command syntax as fixed.
[Spec Kit documentation](https://github.com/github/spec-kit)

**Problem to try it on:** Different teams repeatedly omit the same planning
questions, and reviewers cannot find the decisions behind a task list.

For owner search, useful project principles might require explicit acceptance
examples and verification of keyboard interactions. The feature specification
describes the mode's behavior; the plan explains the implementation; tasks point
to checks. These are recognizable responsibilities from section 3.

**Cost to watch:** The agent fills every template while leaving the actual default
unresolved. Read for decisions and contradictions, not document volume. Existing
projects can use specification practices too; “OpenSpec for existing code, Spec
Kit only for new code” would be an unnecessarily rigid distinction.

### Superpowers: a coordinated collection of engineering practices

Superpowers packages skills for activities such as brainstorming, planning,
test-driven development, systematic debugging and review. Its documented workflow
also includes worktrees and delegated or batched execution. It is an opinionated
collection with host-specific setup. [Superpowers repository](https://github.com/obra/superpowers)

**Problem to try it on:** You repeatedly remind the agent to investigate before
patching or verify before declaring completion, despite having clear requirements.

In our example, a review practice might expose the missing checkbox interaction
check. Section 5's small review skill is also a candidate; compare the actual
procedure and its activation behavior before adopting a larger collection.

**Cost to watch:** Overlapping skills create contradictory instructions or extra
ceremony. Inspect what the collection asks the agent to do, including delegation
and branch handling. A documented Pi integration is not proof that the same
setup works unchanged in OMP. This course does not install Superpowers.

The skill or framework never becomes the authority for the product decision.
The engineer still owns scope, permissions and acceptance.

## 6. Combine practices without multiplying competing truth

Suppose a team likes FSAD's joint discussion and OpenSpec's change record. A
reasonable **course-designed composition** could use the meeting to settle intent
and write the proposed behavior directly into the change's delta specification.
The proposal explains why; design records implementation decisions; tasks track
work; evidence records what happened. OMP executes within the agreed scope.

There is no need for an additional standalone `spec.md` that repeats every
requirement. A meeting note can link to the canonical requirement and preserve
the reason for a decision. This composition is a workflow design to evaluate,
not a claim of an official FSAD/OpenSpec integration.

| Information | Choose one maintained home |
| --- | --- |
| Current accepted behavior | Current contract or main specification |
| Proposed behavior | The chosen change specification |
| Why a trade-off was chosen | Decision note or proposal, linking to that requirement |
| Implementation approach and remaining work | Plan/design and task record |
| Observed results | Evidence tied to the reviewed code state |
| Durable repository guidance | Relevant repository instructions, linked where useful |

If code and the current specification disagree, investigate. The document tells
you intended behavior; the implementation and observations tell you what occurs.
Neither disagreement nor a framework label automatically authorizes changing one
to match the other.

## 7. Run a small, honest comparison

Use the [comparison lab](../demo/section-07-flavor-lab.md). First make a short
baseline decision/specification using the everyday OMP workflow. Then try either
the FSAD-style discussion or the OpenSpec artifact route with the same brief.
The prepared examples support a presenter-led version without a model call.

Judge the result against questions that matter:

1. Does it resolve the default behavior and explain the trade-off?
2. Can a new reader distinguish implemented behavior from proposed behavior?
3. Can they connect each important scenario to a planned or observed check?
4. What did people have to read, maintain, repeat or correct?
5. What becomes easier or harder on the next change?

Give both routes all the same facts and acceptance constraints. Do not withhold a
product constraint from the baseline and credit the framework for introducing it
later. Repeating the same task also creates a learning advantage for the second
attempt. Classroom observations are useful feedback, not a performance benchmark.
For a stronger evaluation, rotate order across groups, use comparable tasks and
record model, context, configuration, human effort and actual results.

A defensible conclusion might be:

> The joint discussion exposed our disagreement about defaults. We will try that
> practice on the next two ambiguous requests. We have not measured delivery speed.
> For this small change, one proposed spec was enough; a larger artifact pack added
> maintenance we did not yet need.

Or it might favor OpenSpec because reviewers repeatedly confused current and
proposed behavior. State the observed reason. Keep, revise or remove the added
structure after the trial; preserve useful decisions and history when removing it.

## Check your understanding

Discuss these before opening the reference answers:

- All OpenSpec checks pass, but owner search is unimplemented. Is the change ready?
- A live spec session produces three different descriptions of the default. What next?
- A skill collection asks for four workers on this tiny task. What determines whether to delegate?
- Your current brief and checks already resolve the work clearly. Must you add a flavor?

**Review notes:** Structural validity does not establish implemented behavior.
Resolve the contradictory default in the canonical proposed spec before dependent
work. Delegate only within the authorized scope when independent useful work
justifies it. Keeping the existing workflow is a complete answer when additional
structure has no demonstrated benefit.

Bring one selection record to the discussion: the problem, the practice tried,
the evidence, its cost and the next decision. Section 8 takes the wider questions
of harness design and organizational scale; its final delivery format remains open.

[Previous: Reliable execution](06-reliable-execution.md) ·
[Next: Advanced harness design and enterprise-scale work](08-advanced-harness-design-and-enterprise-scale-work.md) ·
[Back to the agreed outline](../OUTLINE.md)

## Resources, videos and links

Sources checked on **12 September 2026**. Start with the FSAD workflow and OpenSpec
concepts, then choose the material relevant to your trial. Main-branch docs evolve;
the optional local structural check uses OpenSpec **1.13.0**.

### Reading

| Resource | Read it for |
| --- | --- |
| [FSAD playbook — workflow](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/workflow) | The five phases and the responsibilities around the live spec session. Open the phase cards. |
| [FSAD — comparison](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/comparison) | Petar's supplied entry point. Separate proposed practices from claims requiring evaluation. |
| [OpenSpec concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md) | Current specs, proposed changes, deltas and archive lifecycle. |
| [OpenSpec CLI reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md) | Structural validation and version-specific command behavior. |
| [Spec Kit](https://github.com/github/spec-kit) | The maintained workflow, templates and current documentation entry point. |
| [GitHub's Spec Kit introduction](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) | The motivation behind the toolkit; distinguish the approach from historical setup examples. |
| [Superpowers](https://github.com/obra/superpowers) | Inspect the included practices and workflow commitments before considering adoption. |

### Videos

| Selection | Viewing task |
| --- | --- |
| [The ONLY guide you'll need for GitHub Spec Kit — Den Delimarsky](https://www.youtube.com/watch?v=a9eR1xsfvHg) | The overview linked by the official Spec Kit repository. Follow how intent becomes artifacts; identify one decision that still needs a human. Use current docs for commands. |
| [Don't Build Agents, Build Skills Instead — Barry Zhang and Mahesh Murag](https://www.youtube.com/watch?v=CEvIs9y1uog) | Revisit the talk linked by [Anthropic's companion article](https://claude.com/blog/building-agents-with-skills-equipping-agents-for-specialized-work). Compare one reusable practice with adopting an entire workflow collection. It is background for the skills comparison, not a Superpowers tutorial. |

Videos are optional; full playback and teaching excerpts remain presenter
preparation. No dedicated FSAD recording is asserted here. Use the playbook's
interactive workflow as the FSAD walkthrough.

### Useful links

- [Comparison lab](../demo/section-07-flavor-lab.md) — setup, prompts and selection worksheet.
- [Worked example pack](../demo/section-07-examples/README.md) — shared brief, FSAD-style session and proposed OpenSpec change.
- [OpenSpec supported tools](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md) — distinguish OMP, Pi and host-specific invocation.
- [Everyday workflow](03-the-everyday-workflow.md), [skills](05-skills.md) and [reliable execution](06-reliable-execution.md) — the foundations every flavor still depends on.
- [Preparation review](../_build/section-07/review.md) — checks performed and remaining live-session rehearsal.
