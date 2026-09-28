# Course content restoration plan

**Status:** Implemented. The agreed decisions and sequence below are retained as
the restoration record. See the [restoration verification receipt](_build/todo-demo/2026-09-18-content-restoration-verification.md)
for author-side evidence and its limits.
**Promotion note (2026-09-27):** The five-part route is now the main course at [OUTLINE.md](OUTLINE.md). This record preserves the earlier eight-section implementation; its route is retained in [the alternative outline](alternatives/eight-section-outline.md).

**Goal:** Restore the strongest teaching substance from `sections_old/` without
restoring its synthetic project-directory app, custom profiles, checkpoint
machinery, timing claims, or unsupported OMP commands. The active course stays
centered on the small React + Vite todo app and its independent Git branches.

## Implementation record

All eight active lessons and their companions now restore concepts, decision
criteria, failure cases and transfer guidance, with executable ordinary commands
and concise source/adaptation notes. Section 3 remains the practical core.
Sections 1–7 retain the independent branches in the standalone nested todo-app
repository; section 8 retains its separate legacy exporter and uses direct POSIX
`mktemp`/`cp` and Node commands, without Python or a course helper.

Section 5 supplies an inline review candidate and focused procedure, not an
installed course skill. Section 7 supplies inline comparative artifacts, not a
required or validated framework installation. The [earlier full draft](sections_old/)
remains untouched historical source, not an active learner route.

The receipt distinguishes source review and author-side execution from teaching
rehearsal. No provider-backed teaching or classroom timing rehearsal was performed;
not every new acceptance sequence was manually rehearsed. Implementation of this
plan is not a claim that the entire course is classroom-ready. Historical receipts,
including the original todo-app receipt, remain unchanged.

## Decisions and boundaries

- Keep the current eight-section structure and the four-part lesson shape:
  **Understand**, **Watch or try**, **Use at work**, and **Go deeper**.
- Keep the todo app as the concrete example for sections 1–7. Section 8 keeps
  its deliberately separate legacy-exporter case study.
- Recover concepts, decision criteria, failure modes, and transfer guidance
  from `sections_old/`; rewrite them for the active route rather than copying
  obsolete paths or tooling.
- Reintroduce only ordinary Git/app commands and OMP commands or capabilities
  verified against current official OMP documentation. Do not reinstate custom
  OMP profiles, preparation scripts, checkpoints, harness wrappers, or core
  course Python.
- Use Matt Pocock's *Full Walkthrough: Workflow for AI Coding* as optional
  workflow inspiration, not as authority for OMP behavior, course process, or
  timing claims.
- Put concise **Sources and adaptation** notes in each section's **Go deeper**
  material. These identify the official OMP documentation for factual product
  claims, the video when it informed a workflow framing, and the course-authored
  status of the todo-app example.

## Section-by-section restoration map

| Section | Restore from the old draft | Active course treatment |
| --- | --- | --- |
| 1. Getting started | First-run observation, scoped prompts, approval and diff inspection, browser evidence, safe fallback guidance. | Make the remaining-task-count exercise the first agent interaction; keep only verified OMP controls and normal app/Git commands. |
| 2. Foundations | Agent/model/tool/context/harness loop, trace reading, context limits, and approval limits. | Explain the observed section 1 run; distinguish what the model proposes from what the harness authorizes. |
| 3. Everyday workflow | Six-stage workflow, acceptance criteria, implementation pitfalls, verification matrix, and review. | Keep the unfinished-task-filter exercise as the practical core. Treat thin, verifiable increments as course guidance, not a mandatory ceremony. |
| 4. Context and repository knowledge | Context selection, instruction authority, repository maps, durable decisions, factual handoffs, and recovery. | Resolve a stale todo-app handoff and show what evidence belongs in a useful continuation note. |
| 5. Skills | Skill boundaries, triggers, baseline comparison, missing inputs, and near misses. | Compare an ordinary review of the proposed filter with a focused skill; do not require custom course skills. |
| 6. Reliable execution | Diagnose-versus-retry choices, stop/preserve/resume behavior, enforcement, and purposeful delegation. | Reproduce and repair the blank-task defect; use unit and browser evidence before declaring recovery complete. |
| 7. Optional flavors | Plain prompting compared with FSAD/OpenSpec-style specification work, including caveats. | Apply each style to the same filter requirement; describe frameworks without making installation part of the core route. |
| 8. Harness and enterprise work | Evidence/state, characterization, seams, compatibility, and rollout. | Preserve the separate legacy-exporter lesson; clarify how its constraints differ from the todo app. |

## Change sequence

### 1. Establish source authority

1. Read the relevant active and old lesson sections in full before rewriting.
2. Read the current official OMP documentation for every command, control,
   approval behavior, provider statement, or capability that will appear in an
   active lesson.
3. Record the video only where it supplies a workflow idea; do not infer OMP
   facts from it.
4. Remove or relabel claims that cannot be supported by these sources.

### 2. Rewrite the active lessons

1. Expand `sections/01-*.md` through `sections/08-*.md` with the restoration
   map above while retaining their existing example branches and paths.
2. Keep each main path executable: a learner can locate the branch, run the
   documented app/test commands, give a short prompt, and inspect observable
   evidence.
3. Move secondary theory, variants, and resources into **Go deeper** rather
   than burying the primary route.
4. Include a short **Sources and adaptation** note in every section.

### 3. Align navigation and companions

1. Update `README.md`, `OUTLINE.md`, `PROJECT.md`, and affected demo companion
   material where the restored lesson purpose or source boundaries need a
   concise pointer.
2. Keep `sections_old/` and historical demo material explicitly historical;
   do not rewrite historical receipts as evidence for the active course.
3. Preserve all todo-app branch names, standalone-repository instructions, and
   section 8's legacy-example boundary.

### 4. Verify the delivered route

1. Check every active local Markdown link and every documented todo-app branch
   name.
2. Execute newly documented ordinary app/Git commands against the canonical
   todo-app repository. Run the relevant unit and browser checks only if the
   app or its documented behavior changes.
3. Verify every OMP command against the linked official documentation; do not
   claim a provider-backed rehearsal unless one was actually performed.
4. Save any new author-side verification receipt under `_build/todo-demo/` and
   state remaining provider or classroom-rehearsal limits plainly.

## Completion criteria

- The active lessons regain concrete concepts, tradeoffs, and recovery guidance
  from the old draft without reintroducing its obsolete infrastructure.
- Sections 1–7 consistently use the current todo app; section 8 clearly keeps
  its separate legacy purpose.
- Every factual OMP command or capability has a current official-source link.
- Every section contains concise source/adaptation provenance outside its main
  walkthrough.
- Navigation, commands, links, and branch references describe the same learner
  route.
- Evidence distinguishes source review, app verification, OMP rehearsal, and
  classroom readiness.

## Not included

A new curriculum structure, a second demo app, custom OMP configuration,
mandatory framework installation, provider credentials, a remote repository,
or classroom-duration claims.
