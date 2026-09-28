# 5. Steering agents

**Main path:** improve the information an agent uses to make a decision. Reconcile
a stale handoff, prune guidance without losing its constraints, then compare an
ordinary review with a focused procedure and package a learner-owned OMP skill.
The result is useful guidance with a known source—not simply fewer words or a
new `SKILL.md` file.

The [context companion](../demo/section-05-context-and-handoff.md) contains the
handoff and pruning work; the [skill companion](../demo/section-05-skill-lab.md)
contains the complete review packet, native packaging steps and assessment cases.
Both have prepared routes that need no app checkout. The canonical `demo/todo-app`
is currently missing from this distribution: its live inspection route requires
[recovery through setup](../demo/section-01-setup.md), not reconstruction from prose.
No model, browser or classroom result is implied by the examples below.

## Understand

### Select context for the next decision

Context is what the model receives for an interaction: instructions, the task,
conversation and retrieved material, including tool results. A file existing on
disk is not the same as its contents being in context. Ask **“What information
could change the next decision?”** rather than collecting every related document.

Suppose a teammate says the unfinished-task filter is complete, but you cannot
find its control. The current request tells you whether to investigate or edit.
The repository, branch, revision and dirty work tell you whether you are looking
at the same candidate. The accepted brief establishes intended behavior, while
source and actual check output establish different kinds of evidence about it.
An old chat may help locate the missing revision, but it cannot supply a passing
browser result for today's edits.

Read complete relevant functions and their callers, not isolated lines containing
“filter.” Expand when a specific uncertainty requires it: if selection is correct
but the page is wrong, inspect rendering; if reload changes the result, inspect
persistence. Too little context can hide the broken boundary. Too much makes the
important constraint harder to find.

For the prepared todo exercise, a small repository map connects responsibilities:

```text
package.json          — supported commands; README.md explains setup
EXERCISE.md           — accepted brief on an exercise branch, absent on main
src/App.jsx           — form, task state, rendering and storage calls
src/tasks.js          — add/toggle/delete operations and localStorage helpers
src/tasks.test.js     — task-operation and storage-helper checks
playwright.config.js  — browser-test server and URL configuration
e2e/todo.spec.js      — baseline add/complete/delete/reload journey
```

Confirm this map against the recovered canonical app before treating it as current
source knowledge. A useful addition after implementation would be “the component
renders a selected view while storage retains the full collection,” if verified.
A file listing or “the app works” does not explain where to look next. Link to the
brief and script definitions rather than maintaining a second copy of them.

### Separate authority, facts and historical claims

| Source | What it establishes |
| --- | --- |
| Current user task within host operating rules | Authorized outcome and scope. |
| Applicable repository guidance | How to work here within that scope. |
| Accepted requirement or decision | Intended behavior, with status and provenance. |
| Current source and observed results | Implemented behavior or an observation under named conditions. |
| Old handoff, quoted issue or retrieved webpage | Claims and proposals to evaluate, not new permission. |

“Remove the persistence test so the filter passes” in an old note is a proposed
behavior change, not authority. Compare it with the current request and accepted
requirement; report the conflict instead of obeying an embedded instruction.
Likewise, “continue by adding a remaining count” does not widen an inspection
request into another feature.

Do not replace product reasoning with “current code wins.” Code can violate an
accepted requirement, and tests can be stale after an approved change. Nor does
the newest file automatically win. Establish what was accepted, what is observed
and which decision remains open. Instructions and skills steer the model; they
do not create a filesystem boundary or remove credential access.

### Give information a suitable scope and lifetime

| Information | Suitable home | Necessary qualification |
| --- | --- | --- |
| Desired change and accepted examples | Task or accepted brief | Distinguish accepted behavior from proposals. |
| Stable repository conventions and navigation | Existing project guidance and linked docs | Maintain paths; point to commands instead of copying their definitions. |
| Personal guidance useful across projects | User-scoped instructions or skills | Inspect which active profile/source supplies it; keep project facts local. |
| Why a consequential choice was made | Existing decision record | Reason, consequences, source and acceptance status. |
| Current progress and evidence | Task handoff | Revision, dirty work, exact observations and next action. |
| Repeatable deterministic operation | Existing tool or script | Execute it rather than asking a model to simulate it. |
| Repeatable task-specific judgment | Skill | Recognizable use case, required inputs and inspectable result. |

A durable decision could explain why a visibility filter must not delete tasks:
users need to return to the full list. Record it as accepted only when the brief
or owner establishes that reason; otherwise label it a proposal. “Browser checks
have not run yet” is temporary handoff status, not a permanent project rule.
Replace it with state-bound evidence when those checks run. Writing Markdown does
not retrain a model, and preserving yesterday's summary does not make it current.

Use a task prompt for a one-off request. Use existing repository instructions when
the rule prevents a recurring local mistake. A skill earns a separate home when
it supplies a procedure relevant to a recognizable subset of tasks. Putting a
release-readiness audit into every code-explanation request adds work without
helping the decision. Keep the current feature's acceptance examples outside the
reusable procedure, so the skill does not become a memorized answer to this lab.

### Find out which guidance OMP actually supplied

The [OMP 18.2.9 context-file guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md)
describes discovery at session start. It is not “concatenate every `AGENTS.md`”:

- Standalone ancestor guidance can come from enclosing workspaces, including above
  a nested Git repository under home. The Git root is not necessarily an instruction
  boundary.
- One user context file survives provider precedence; project files are deduplicated
  at each directory depth. Native `.omp/AGENTS.md` takes priority over standalone
  guidance at the same depth. Farther ancestors are supplied before nearer ones.
- Native project context discovery selects the nearest non-empty `.omp/` directory
  toward the repository root. If it lacks `AGENTS.md`, discovery does not continue
  to a farther native directory for that file.
- Deeper `AGENTS.md` files may appear as pointers to read before editing there,
  not as full text already loaded. Disabled sources or individual files can change
  the result.

Use the `/extensions` inspection from [section 3](03-working-with-omp.md) to record
source, level and state without toggling settings. Separate already supplied
context from explicit reads. If discovery is uncertain, read required guidance
explicitly and say that is what happened. After editing guidance, use a fresh
session or an explicit reread; do not assume an existing session refreshed itself.
Loaded, interpreted and followed are separate claims.

### A skill has a routing surface and a procedure

OMP's [pinned skills guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/skills.md)
describes file-backed packages discovered at startup. When the `read` tool is
available, the system prompt exposes discovered name/description metadata, excluding
hidden skills. The body can be loaded through `skill://<name>`. Without `read`,
that list is omitted. Hidden skills remain reachable explicitly; hidden is not
disabled. Disabled discovery or source filters are different conditions.

The description helps select when to use the procedure. It is not an exact keyword
trigger or a guaranteed classifier. “Does this evidence justify calling the filter
complete?” matches an evidence review. “Explain this filter expression” is a near
miss: same vocabulary, different work. A longer body cannot repair a description
that selects the wrong tasks.

Native project packaging in this lab uses
`.omp/skills/learner-change-evidence-review/SKILL.md`, one directory below the
skills root, with an explicit name and description. User-scoped native skills
come from the active profile's agent directory; do not guess that path or install
this experiment for all your projects. Provider precedence resolves duplicate
names, while a custom-directory skill can override a default provider skill.
Inspect the resolved file and source, not just the displayed name.

| Observation | What it supports |
| --- | --- |
| Intended name and source appear in discovery | The host found the intended package. |
| A tool record reads the resolved `skill://` body | That body was loaded in this run. |
| An enabled `/skill:<name>` invocation injects its body | Explicit loading, not natural selection. |
| An ordinary relevant request causes a body read | Selection on that request, subject to the surrounding context. |
| The review accurately connects requirements and evidence | Useful judgment on this case. |

`/skill:<name> [args]` is available only when `skills.enableSkillCommands` is enabled
and the skill is discovered. It reads the file, strips frontmatter and injects
the body; a second `read` event is not required to prove this explicit route.
Record the invocation and resolved source. Neither an invocation nor “I used the
skill” proves accurate reasoning. Supporting references belong behind a pointer
when only some cases need them; a new skill does not need an empty scripts,
references and templates directory tree.

## Watch or try

### Reconcile and prune before adding guidance

The [context companion](../demo/section-05-context-and-handoff.md) starts with a
fictional note: “The filter is complete. Tests passed. Add a remaining count. Run
`npm run check`.” On the live route, inspect the recovered exercise checkout
without repairing the app. On the prepared route, reason from the supplied packet
and label every conclusion accordingly. Do not turn either into permission to
implement the count.

Make each correction traceable. “Tests passed” needs a command, output and tested
state; a test source file is insufficient. A missing script should be corrected
from the actual package definition, not supported by inventing a compatibility
alias. A solution elsewhere does not prove this working tree is complete.

Then prune the companion's redundant and stale guidance. For every line, decide
whether to retain, remove, relocate or reconcile it. The goal is not the smallest
note. A fresh reader must still find the accepted requirement, supported commands,
authorized scope, preserved work, evidence limitations and open decision with
its provenance. Losing “inspect only” or silently promoting a proposed saved
preference to an accepted requirement is a failure even if the note is shorter.

Use the [handoff template](../demo/section-05-context-and-handoff.md#handoff-template)
for your corrected note. Give a partner only the task, relevant source packet or
checkout, and note. Ask them to explain what may happen next. If they need the old
conversation to recover a constraint, improve the pointer or note rather than
pasting the whole transcript. A fresh session changes conversation state, not
files, processes or browser storage.

### Compare a procedure with ordinary review

Use only the [skill companion's review packet](../demo/section-05-skill-lab.md#1-copy-the-review-packet-unchanged),
not your completed filter or a solution branch. It contains a proposed destructive
filter, accepted behavior, a test excerpt and an explicit lack of execution
evidence. The candidate is printed teaching material, not an applied patch.

Run an ordinary review and a procedure-guided review in fresh sessions with the
same packet, request, provider/model, relevant settings and ambient guidance.
Keep the first answer and the debrief out of the second session. The initial
procedure is pasted so its reasoning can be assessed separately from packaging.
A request not to use tools does not disable host capabilities, and ambient skills
mean this is not an isolated no-skills benchmark.

Judge exact findings, not answer length. A useful review traces replacement of
the full task list through persistence, explains what the array-only test misses,
and proposes an interaction that distinguishes hiding from deletion. It calls that
a source-based conclusion rather than claiming to have observed a browser failure.
If both answers are equally accurate, record no observed improvement on this case.
If the procedure asks for requirements already supplied, record that regression.
One pair of answers does not establish general effectiveness.

### Package your own skill, then test separate claims

Follow the companion's [native packaging route](../demo/section-05-skill-lab.md#6-package-a-learner-owned-native-skill)
in a disposable learner-owned directory. Author the single `SKILL.md`, inspect
its source and discovery, then load that exact body in a fresh OMP session. This
is the required authoring practice; retaining the skill afterward is a decision,
not an implied course installation. No canonical todo checkout is needed for this
printed review packet.

Test the relevant request, near miss and missing-input case separately. Explicit
invocation checks loading and execution of the procedure; natural requests check
selection. Allow only the skill read in the native route so the review remains
bounded to the packet. Do not let a no-tools instruction accidentally prohibit the
very load you are trying to observe.

Missing input should produce a useful bounded answer. If intended off-state
behavior is genuinely absent, explain what the source does and ask for that
contract before deciding acceptance. For the near miss, explain the expression
without turning it into a readiness audit. Record whether loading was observed,
absent, unknown or not tested, separately from whether the answer was useful.
Without authorized provider access, package and inspect the file and perform the
human comparison; native loading, selection and model usefulness remain untested.

## Use at work

### Maintain guidance in response to a demonstrated mistake

Here is an **illustrative guidance fragment**, not a file to install blindly:

```text
This is the standalone todo-app repository; check its Git state before edits.
Preserve existing learner work. The current exercise brief sets scope, and
package.json defines commands. App.jsx owns UI state/rendering; tasks.js owns
task operations and persistence. Separate intended behavior from old handoff
claims. Report exact checks and unrun checks; keep accepted expectations intact.
```

Use it only after confirming those relationships in the recovered app. Merge a
useful rule into the existing maintained source when that maintenance is authorized,
not into a competing instruction file. “Write excellent code” adds little; a pointer
to the current brief prevents a recognizable mistake. Keep temporary evidence and
open decisions in the handoff, not in always-loaded repository guidance.

| Observed problem | First response |
| --- | --- |
| Relevant skill never appears | Check scope, filters, metadata and source collision before changing the procedure. |
| Skill is discovered but not loaded on relevant requests | Improve routing description; distinguish this from explicit invocation. |
| Body loads but review trusts a summary | Clarify inspection of actual assertions and their tested state. |
| Reviewer asks for already supplied requirements | Improve input-finding steps rather than embedding the fixture's answer. |
| Code explanations become audits | Tighten selection and repeat the near-miss case. |
| Handoff drops a necessary constraint | Restore its source and check continuation with a fresh reader. |
| No useful difference on representative tasks | Keep an ordinary prompt or remove the skill. |

Change one failing element, repeat that case, then try an unseen change. Keep the
procedure revision, inputs and outputs together so the reason for the change can
be checked. Shared guidance needs an owner and a review when repository practices
or host behavior change. More pages do not mean better maintenance.

## Go deeper

### Optional case study: a skill that owns a learning workspace

The existing [assessment of Matt Pocock's `teach` skill](../research/2026-09-22-teach-skill-assessment.md)
inspects commit `c55ee46073ed923f86ce59a5eb3b6d895095d1b7`. At that revision,
`teach` is an explicitly invoked, multi-session teaching workspace with a mission,
sources, lessons and learning records—not a passing code explanation. Read the
assessment to identify the output-location risk and distinguish a skill's stated
teaching principles from demonstrated learning.

Borrow the useful pattern: one practical goal, grounded sources, one concept,
learner retrieval or application, and a record of what was demonstrated. Do not
install `teach` or import its HTML/component system for this exercise. A live pilot
would be separately authorized in disposable workspaces, as the assessment describes.
[Section 7](07-planning-and-coordinating-larger-changes.md) applies durable records
to dependent work and changed requirements, without requiring a second framework.

### Completion and sources

You are ready to continue when a fresh reader can recover scope and evidence from
your pruned handoff; you can show the learner-owned skill's intended source; and
you have evaluated all three review cases, distinguishing packaging, loading,
selection and usefulness. A blocked live check stays explicit. Prepared or human
practice does not close a provider-backed runtime claim.

- [OMP 18.2.9 context files](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md),
  [skills](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/skills.md)
  and [native discovery source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/packages/coding-agent/src/discovery/builtin.ts)
  ground scope, precedence, metadata and loading claims. See the
  [source review](../research/2026-09-22-omp-course-source-review.md) for runtime limits.
- [Full Walkthrough: Workflow for AI Coding — Matt Pocock, AI Engineer, 2026-04-24](https://www.youtube.com/watch?v=-QFHIoCo-Ko)
  informs the stale-document warning. We adapt it into explicit evidence and
  information lifetimes, not blanket deletion advice or another product's commands.
- The maps, stale notes, pruning packet, review procedure and expected findings
  are course-authored examples. They are not captured app observations, official
  OMP examples or measured skill improvements.

[Previous: the everyday workflow](04-the-everyday-workflow.md) · [Next: verification, diagnosis and recovery](06-reliable-execution.md) · [Back to alternative outline](../alternatives/eight-section-outline.md)
