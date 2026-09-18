# Draft v0 review and source decisions

> **Earlier full-draft reference.** Current development follows the [agreed eight-section outline](OUTLINE.md), one section at a time. This document’s detailed content and timing are not the agreed curriculum.

Reviewed and consolidated on **12 September 2026**. The user requested a first Markdown course draft, OMP first, foundations before optional approaches, engaging delivery, and archival of superseded WIP material.

## Scope and provenance

The review inventories **141 course-owned and generated files** present before drafting, excluding installed `node_modules` dependency contents and operating-system metadata. It covers both curricula, both research/review documents, the project navigation, demo documentation, source/tests/checkpoints, specs, skill/plugin examples, hidden host integration files, generation scripts, presentation content/notes, build structures, logs and validation receipts. Generated host instructions and large presentation snapshots were inspected as supporting/generated material; they are not newly activated instructions or independent research sources. This was a curriculum review, not a security audit of all installed third-party code or a pixel-by-pixel slide-layout review.

The per-file inventory and hashes are in [_build/draft-v0/source-inventory.json](_build/draft-v0/source-inventory.json). The [supplied report](research/2026-09-12-deep-research-report.md) is preserved byte-for-byte from Downloads. Its recommendations are source material, not instructions to install tools, create integrations, assign organizational owners or adopt a methodology.

The report's exported citation tokens lack a bibliography that resolves them. Draft v0 uses direct links to primary documentation for current product claims. It does not convert inaccessible citation markers into invented sources or inherit unverified organizational counts as facts.

## What changed in the curriculum

| Source finding | Draft decision |
| --- | --- |
| Two curricula start with OpenSpec; OMP was optional and the demo favored Claude plugin packaging | OMP is the common environment. The foundation uses a standalone lab with ordinary Markdown and no framework dependency. |
| Main curriculum, alternate foundation and decks overlap | One canonical COURSE.md, clearly labelled Draft v0. Superseded curricula and decks are archived. |
| Teaser introduces too much machinery | One contract, bounded implementation, prepared failure and review decision in 30 minutes. |
| Verification arrives after framework setup | Meaningful checks and execution boundaries appear before framework workshops. |
| Existing exercises could be followed without independent understanding | Predictions, green-test trap, stale handoff, individual explanations and a different capstone problem. |
| New report adds skills, enterprise context and harness thinking | Core skill-evaluation lesson; separate advanced studios for distribution, enterprise context and harness evaluation. |
| Different documents imply different durations | Explicit 13-hour core; 70 minutes setup/practice; six optional extension hours. Timing remains a proposal. |
| Earlier filter document/decks mention permissions absent from the demo | Synthetic app explicitly has no authorization system. No claim that its tests establish access control. |
| Sample retry policy leaves timeout and Retry-After choices underspecified | Explicit synthetic policy, deterministic fallback, total-attempt count and deadline behavior; production suitability is not assumed. |
| A many-repository gateway is a proposed architecture | Tabletop exercise with uncertainty and incomplete coverage; no claim that HireRight has those tools or that an executable simulator ships. |
| Framework enthusiasm can lead to competing task/spec state | Optional OpenSpec, FSAD, Spec Kit, GSD and Superpowers, each with a problem, trial and removal decision. |

Both old PowerPoint files contain 26 slides and 26 note parts. Their normalized teaching text and speaker notes are identical; layout differences do not create separate curricula. The intermediate candidate also belongs to the older slide build. Old reference images and JSON snapshots are presentation/build assets, not additional lesson sources.

## Current demo evidence supersedes the earlier failure report

The September 11 review recorded syntax errors in preflight and harness scripts. The inspected September 12 files contain corrected newline handling. A saved September 12 execution receipt already showed successful automated validation. This review reran the retained validator in a disposable copy and preserved the original receipt.

| Check on 12 September | Observed result | Limit |
| --- | --- | --- |
| OMP version/help | 18.0.6; named flags present | No live provider/model or permission-behavior test |
| New standalone foundation lab, starter | 11 tests: 5 pass, 6 fail | Intentional incomplete implementation |
| Same lab, broken | 11 tests: 9 pass, 2 fail | Prepared whitespace defect |
| Same lab, solution | 11 tests: 11 pass | Supplied behavior and HTTP checks only |
| Retained demo validator in copied package | Passed preflight, expected regressions, repeated-failure stop, recovery and solution | Interruption is simulated by state injection; not a killed live process |

Runtime: Node **22.22.2**, macOS. Fresh receipts are [lab-validation.json](_build/draft-v0/lab-validation.json) and [retained-demo-validation.json](_build/draft-v0/retained-demo-validation.json). Successful automated execution is not a timed classroom rehearsal, browser accessibility audit, learner assessment or live OMP run.

The new helper assembles selected existing assets into a disposable foundation lab. The active demo remains a retained OpenSpec/plugin reference; its old setup and presenter script are not the v0 foundation instructions.

## Remaining delivery work

- Rehearse a full live OMP implementation, skill discovery/activation and cancellation on the teaching machine with the selected provider/model. Record actual environment permissions and loaded integrations.
- Perform browser typing/clearing/count/focus checks and decide the accessibility evidence required for delivery.
- Pilot timings and the individual rubric. Do not label the curriculum classroom-validated before that work occurs.
- Prepare optional role-specific executable repositories, OMP-native distribution rehearsal and the enterprise simulator if selecting those extensions. V0 supplies written exercises and a complete default capstone contract.
- The retained demo still lacks `PARTICIPANT.md`, `FALLBACK.md`, `VALIDATION.md`, `scripts/scaffold-example.mjs` and `scripts/archive-example.mjs` referenced by its older documentation. The new OMP and facilitator guides replace the foundation-facing need, but the old presenter sequence still needs revision before use.
- The earlier research appendix claims an included maintenance script that is absent. No such script or automated freshness process is claimed in v0.
- The old demo generator hard-codes OpenSpec 1.11.0 while the current demo package uses 1.13.0; its Python string literals can regenerate the previously broken JavaScript newlines. It is archived as historical build material and must not regenerate the active demo.
- The wrapper's allowed edit paths and model spend fields are descriptive rather than enforced controls. Its local acceptance command cannot authenticate who invoked it. The course explains these limits instead of presenting the wrapper as a security system.

## Source checks

Primary pages inspected for this draft: [OMP](https://github.com/can1357/oh-my-pi), [context](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md), [skills](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md), [marketplace](https://github.com/can1357/oh-my-pi/blob/main/docs/marketplace.md), [Agent Skills](https://agentskills.io/specification), [AGENTS.md](https://agents.md/), [MCP architecture](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture), [OpenSpec](https://github.com/Fission-AI/OpenSpec) and [concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md), [Spec Kit](https://github.com/github/spec-kit), [GSD Core](https://github.com/open-gsd/gsd-core), [Superpowers](https://github.com/obra/superpowers), [Aider repository maps](https://aider.chat/docs/repomap.html), and [Backstage catalog](https://backstage.io/docs/features/software-catalog/).

Conceptual readings checked: Anthropic's [agent patterns](https://www.anthropic.com/engineering/building-effective-agents), [context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), [long-running harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), and [tool design](https://www.anthropic.com/engineering/writing-tools-for-agents). These are engineering guidance, not proof that this course improves outcomes. The earlier suggestions provide the retained learning-research rationale; this synthesis does not repeat its effect sizes as course forecasts.

Direct FSAD retrieval failed twice. Its description is carried forward from the earlier review and explicitly labelled. Caveman remains an optional unverified reading lead, not an installed course dependency. No videos were watched or new product compatibility claims established by this draft.

## Historical material

See the [pre-v0 archive](../../40-archive/2026-09-12-agentic-course-pre-v0/README.md) for the old curricula, research/review documents, slides and build assets, with a migration map and preserved originals. The project remains active. Archiving WIP does not mark the course, demo or remaining rollout work complete.
