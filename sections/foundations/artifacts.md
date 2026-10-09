# 2.6 Artifacts

**An artifact is useful work saved outside the conversation—usually as a file.** A source file, Markdown plan, CSV result, diagram, or verification log all count. For this workshop, the important move is simple: **put the result somewhere you can open, review, update, and use again.** No special artifact system is required.

## Get useful work out of the chat

Pick something worth keeping from a real session: an agreed plan, an investigation result, or a decision with its reasons. Ask the agent to save the result, not the entire conversation:

```text
Save the agreed outcome of this discussion in the existing change note.
If there isn't one, use docs/current-change.md.
Include the goal, decisions and reasons, open questions, and next action.
Separate checks actually run from checks still needed. Link supporting files.
Read the saved file back and tell me its path. Do not implement anything yet.
```

Then open the file yourself. Does it capture what you agreed, including what remains unresolved? “I've saved it” is a claim; the readable file is the result. If the useful output is already a code file or report, that is the artifact—you do not need a second document describing that it exists.

## Files are a simple form of external memory

The [Sessions and memory lesson](sessions.md#retrieval-bring-the-right-information-back) distinguished storage from retrieval. Artifacts give us something durable to retrieve:

**Useful result → saved file → read it in a later session → relevant material enters context.**

That file can outlive a compacted conversation or a fresh session. A colleague can review it, and version control can preserve its changes. But **saved does not mean loaded, and loaded does not mean correct**. An ordinary file is not automatically model context; the agent must read it, or a configured mechanism must supply it. A progress note can also be stale.

In a later session, point to the actual path:

```text
Read docs/current-change.md and the source files it references.
Tell me the agreed goal, what the current files support, and the next
unfinished step. Flag disagreements before continuing. Do not edit yet.
```

Use the path you actually saved if it differs. Check whether the agent read the files and noticed anything that changed. You do not need vector search to retrieve a file whose location you already know. OMP's [optional memory backends](sessions.md#what-omp-already-has) can help carry information between sessions, but they are not a replacement for the shared record you and your colleagues review.

## Different files answer different questions

**An artifact's job matters more than its filename.** These distinctions keep the desired behavior, the chosen approach, and the current state of work from getting mixed together:

| Kind of artifact | Question it answers | What to keep in it |
| --- | --- | --- |
| **Specification** | What should the result do? | Scope, constraints, observable behavior, and acceptance criteria. Make clear whether it describes proposed or current behavior. |
| **Design or implementation plan** | How will we achieve it? | The chosen approach, affected components, dependencies, and implementation sequence. |
| **Decision record / ADR** | Why did we choose this? | Context, alternatives, the decision, its status, and consequences. An **architecture decision record (ADR)** preserves a consequential architectural choice—not every small coding preference. |
| **Tasks** | What work remains? | Concrete units of work, dependencies, and how each will be checked. A checked box is a status claim, not verification evidence. |
| **Progress or handoff note** | Where did this run stop? | Completed and unfinished work, blockers, current file state, checks and results, and the next action. Update it as work moves. |
| **Verification output** | What was actually observed? | Commands or scenarios, relevant output, date or revision, and limitations. Link the underlying evidence instead of writing only “passed.” |

For a small change, these can be headings in **one existing note**. Split them when their audience, lifetime, or workflow differs. An architectural decision may matter years later; “next, rerun the failing check” belongs in the current handoff. Keep routine decisions in the change note; write an ADR when a significant tradeoff would otherwise be lost.

## Spec-driven workflows organize these artifacts differently

**Spec-driven development uses the written specification to guide implementation and judge the result.** The supporting files make that work inspectable: requirements feed a plan, tasks organize execution, and progress and evidence show what actually happened. Writing the documents alone does not establish that the code follows them.

Different workflows and skills choose different places and lifecycles for those files. These are examples to recognize, not folder trees to install together:

| Workflow or skill | How it organizes the work |
| --- | --- |
| [**OpenSpec**](https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md) | `openspec/specs/` describes current behavior. A folder under `openspec/changes/` groups a proposal, spec changes, design, and tasks. Archiving merges spec changes into the current specs and preserves the completed change. |
| [**Kiro's spec workflow**](https://kiro.dev/blog/from-chat-to-specs-deep-dive/) | Separates `requirements.md`, `design.md`, and `tasks.md`: what to build, how it should work, and the work to carry out. Those distinctions let you review requirements separately from implementation choices. |
| [**GitHub Spec Kit**](https://github.com/github/spec-kit) | Separates project-wide principles in a constitution from each feature's specification, plan, and tasks. Its bug-fix and idea-assessment processes produce different reports rather than forcing every job into a feature spec. |
| [**Superpowers: writing plans**](https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md) | Saves implementation plans under `docs/superpowers/plans/` by default, links the source spec, and uses concrete tasks and checkboxes. The skill supplies the writing and handoff procedure; the saved plan is its output. |
| [**Pocock: domain modeling**](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/domain-modeling/SKILL.md) | The linked revision keeps domain terms in `GLOSSARY.md` and consequential architectural decisions in `docs/adr/`. It creates those records when needed, not as empty paperwork. |

The Kiro walkthrough is from July 2025; the linked tools and skills can evolve. Follow the conventions of the version and workflow your project actually uses.

The distinction is useful: **a skill describes the procedure; an artifact is the work that procedure produces or consumes.** A skill might write a spec, update a task list, or save a review report. A later skill can read that same artifact instead of reconstructing the decision from chat. The skill file is itself a file, but it has a different job from the per-change output.

**Reuse the project's existing organization.** If a workflow already owns the spec and tasks, update those instead of creating a competing `plan.md` and `progress.md` elsewhere. Link the spec from the tasks and the evidence from the progress note. When the plan changes, update the affected tasks; when a decision is superseded, mark it and link its replacement.

For a deeper comparison, continue to [Spec-driven development](../health-checker/07-optional-flavors.md). The [Skills lesson](skills.md#four-skill-packs-four-starting-points) shows how reusable procedures guide this work. Neither a folder convention nor a skill's instructions enforce approval or prove completion on their own.

## Report is not evidence

A report describes what someone believes happened. Evidence is the file state, command, output, exit status, or observation that supports the claim.

| Claim | Evidence that could support it |
| --- | --- |
| “The checker was created.” | The expected file exists and its contents are readable. |
| “The command passed.” | The exact command, working directory, output, and exit status. |
| “All acceptance checks passed.” | Current files plus the expected pass or failure result for every required route. |
| “The implementation handles timeouts.” | Source inspection and a current timeout result with no invented status. |

A successful write proves that a write happened. A successful command proves that a process exited as reported. Neither proves that the behavior satisfies the contract. Results from before the latest edit do not verify the latest version.

Treat generated files as work to review, including untracked files. `git diff` alone can hide a new source file. Inspect `git status --short`, the diff, and the paths reported by `git ls-files --others --exclude-standard`; then open the files that matter.

## Prepared trace: useful, but labelled

The optional [health-checker example](../health-checker/01-getting-started.md) gives us a small trace to inspect without requiring that project for this lesson:

```text
Engineer: Build a one-URL checker with status, literal body, timeout, no redirects.
Model:    I will inspect the repository and create a small program.
Tool:     read/list repository
Result:   no source files; instructions and the request are available.
Tool:     write checker source and a standard project file
Result:   files created successfully.
Tool:     run /healthy
Result:   status 200, expected text found, exit 0.
Model:    Inspect the files and run the remaining cases before accepting.
```

This is a course-authored prepared trace, not a captured provider transcript and not private reasoning. It supports only the visible requests, tool activity, and returned results shown. It does not prove that the remaining cases passed or that the generated code is safe.

## One small handoff artifact

After a real run, write a compact note another engineer can check:

```text
Goal and scope:
Code state and changed files:
Actual commands, working directory, and observed results:
Checks not run:
Claims still unverified:
Decision: accept / needs another change
Next action:
```

Put durable behavior and decisions in the right home: project guidance for current commands, a spec for the agreed behavior, an ADR for a consequential architectural choice, and a handoff for unfinished work. Preserve detailed output in a linked log or report. Do not turn a one-off result into a permanent instruction or leave yesterday's progress note claiming today's state.

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Sessions and memory](sessions.md) · [Next: Skills](skills.md)

## Sources

- [Health-checker fixture contract](../../demo/health-checker/README.md)
- [The checker example](../health-checker/01-getting-started.md) — inspect generated files and compare claims with actual checks.
- [Sessions and memory](sessions.md) — saved history, retrieval, and optional OMP memory backends.
- [OpenSpec core concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md) — current specs, pending changes, and archiving.
- [Kiro: From chat to specs](https://kiro.dev/blog/from-chat-to-specs-deep-dive/) — the requirements/design/tasks file split.
- [GitHub Spec Kit](https://github.com/github/spec-kit) — shared principles and process-specific artifacts.
- [Superpowers: writing plans](https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md) — plan location, structure, and handoff.
- [Pocock: domain modeling, inspected revision](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/domain-modeling/SKILL.md) — glossary and ADR conventions.
