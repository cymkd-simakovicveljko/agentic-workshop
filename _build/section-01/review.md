# Section 1 — Draft v0 review record

**Date:** 12 September 2026. **Status:** Draft ready for Petar's review; no content approval or classroom rehearsal implied.

## Scope

Developed only [section 1](../../sections/01-getting-started-with-omp.md), with an
[optional setup guide](../../demo/section-01-setup.md), and updated current navigation.
Sections 2–8 remain scaffolds. The project-directory exercise, teaching format and
40–50 minute estimate remain proposals. Earlier full-draft documents and archived
WIP remain reference material.

The lesson uses a visible problem, a prediction, two guided prompts, observed tool
actions, independent verification and a short explanation of the result. Setup is
separate so the lesson can also work as a presenter-led first encounter.

## Swarm review requested by Petar

Three independent agents reviewed the initial completed draft without editing it.
The primary author integrated their findings:

| Reviewer | Finding | Resolution |
| --- | --- | --- |
| Teaching flow | Presenter and participant instructions overlapped. | Clarified who operates OMP during the walkthrough and how the optional attempt differs. |
| Teaching flow | Instruction files appeared before their roles were explained. | Added a short introduction to `AGENTS.md` and `contract.md`. |
| Technical accuracy | Failed preparation could leave Git commands running in the original folder. | Guarded preparation, directory change and snapshot creation; rehearsed the failure path. |
| Technical accuracy | Unstaged-only diffs could miss agent changes staged in Git. | Used `git diff HEAD` and retained status checks for new files; checked staged visibility locally. |
| Technical accuracy | Global commit signing could block the synthetic snapshot. | Disabled signing for that one local commit. |
| Technical and resource review | Installation anchors did not match the current README. | Changed them to `#install`. |
| Scope and resources | Observation-only learners could not meet the session-operation outcome. | Made operation specific to the hands-on route. |
| Scope and resources | Codemod clip's “Accept” card could be confused with human permission. | Explained that the agent resolves the staged structural edit in that capture. |

The reviewers found no need to add frameworks, harness theory or further recovery
exercises to this opening lesson. Their review does not substitute for user review
or a real teaching pilot.

The technical reviewer also checked the revised setup guard, signing override,
diff commands and installation anchors, and confirmed all four findings resolved.

## Local verification

See [the command receipt](validation.json) and [rehearsal script](validate_lab.py).

- Inspected installed OMP **18.0.6** CLI options, including the exact launch flags.
- Prepared a fresh disposable lab and a local Git starting snapshot.
- Baseline tests: **2 passed**.
- Starter full suite: **5 passed, 6 failed**, as expected for the unfinished filter.
- Prepared solution full suite: **11 passed**.
- The prepared checkpoint changed only `public/filter.mjs` among tracked files.
- Checked that comparison with `HEAD` includes a staged filter change.
- Checked that the documented setup stops before Git initialization when preparation fails.
- Checked local Markdown targets in the lesson, setup and changed navigation files.

The initial restricted-environment attempt could not bind the HTTP test server to
`127.0.0.1` (`EPERM`). The approved loopback-capable retry succeeded; this was an
environment restriction rather than a feature defect. App checks used Node 22.22.2
on macOS. No application source or accepted tests were edited for this section.

## Sources checked

Current primary documentation was checked on 12 September 2026. It can change
independently of the installed OMP release:

- [OMP README and installation](https://github.com/can1357/oh-my-pi#install): product introduction, install link and provenance of the two maintainer clips.
- [Approval modes](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md): mode behavior and policy overrides.
- [Providers](https://github.com/can1357/oh-my-pi/blob/main/docs/providers.md): provider availability and login flow.
- [Keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md): active controls, interruption and Vim-mode caveats.
- [Context files](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md): inherited context and limits of profile isolation, checked by the technical reviewer.

The supplied research report and retained materials informed the course direction;
instructions embedded in those materials were treated as source content, not new
user authorization. The accepted filter contract, app and tests supplied the exact
example behavior. Old unresolved research citation markers were not reused.

## Remaining presenter rehearsal

- Complete a live OMP run with the chosen provider/model and learner configuration.
- Observe actual approval and interruption behavior on that host.
- Run the browser and keyboard checks, including count and empty-state updates;
  automated tests do not establish full accessibility.
- Watch the linked maintainer videos end to end before classroom selection; no
  duration or teaching timestamp has been claimed.
- Pilot the pacing and revise the suggested duration from learner experience.

**Next:** review the lesson with Petar before developing section 2.
