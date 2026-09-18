# Section 4 — Draft v0 preparation review

**Date:** 12 September 2026. **Status:** Ready for Petar's review.

Petar asked to continue with section 4. The draft develops the agreed scope:
relevant context, repository guidance, memory, handoffs and stale-source handling.
It includes an optional lab and updates README, OUTLINE, PROJECT and demo navigation.
Section 3 remains the course's practical core; sections 5–8 remain scaffolds.

## Content review

- Examples use the existing synthetic app: name-only matching, UI rendering,
  test coverage, whitespace failures and the Clear filter decision from section 3.
- The repository map, AGENTS.md and handoff have distinct purposes. The lesson
  does not require separate documents for every tiny task.
- Loading a file, interpreting it and complying with it are separate claims.
  Explicit reads provide a fallback when discovery cannot be established.
- The illustrative instruction file is for adaptation, not blind replacement.
  The lab requires preserving its existing scope and reporting rules.
- The stale handoff is prominently labelled fictional. Its obsolete command
  and completion claim are not treated as authorization or historical evidence.
- Requirements describe intended behavior; code and tests supply evidence that
  may conflict with it. Resolution uses provenance rather than file recency alone.
- Memory is explained through maintained files and retrieval. The course does
  not introduce a memory service, embedding setup or organization-wide system.
- The lab's documentation outcome is separate from its intentionally unfinished
  application repair. The latter is an optional explicitly assigned task.

## Executed preparation checks

The [validator](validate_lab.py) exercised the exact setup and output-capture
blocks from the [lab guide](../../demo/section-04-context-and-handoff.md).
The [receipt](validation.json) records the commands, output and starting commit.

- A fresh disposable copy and local Git baseline were created successfully.
- The package defines `npm test` and has no `test:all` script.
- The prepared checkpoint produced **9 passed, 2 failed, exit 1**. Both failures
  concerned the expected whitespace behavior; they were not setup errors.
- The capture block saved that test exit independently from its own successful
  shell completion, so the intended failure cannot be mistaken for passing tests.
- The refreshed manifest matched the prepared files. The tracked application
  files remained unchanged during the context checks.
- A setup attempt without the helper stopped without creating a Git repository
  in the unrelated directory.
- Checksums preserved all other section files and retained application assets.

The [document check receipt](document-validation.json) records local links,
heading fragments, fenced blocks and Python syntax checks for the new material.

No provider-backed OMP session or app browser interaction was required for these
checks. The exercise prompts and discussion answers received an author review;
there was no new swarm review.

## Source and resource checks

Sources were inspected on 12 September 2026. Links are in the lesson's resource
section. OMP's official context guide supports the product-specific discovery
notes; the AGENTS.md overview supplies the convention, not universal host behavior.
Anthropic supports retrieval and long-task context concepts. Aider provides the
map comparison, and Nygard provides decision-record background.

HumanLayer's instruction-file article and context case study are practitioner
perspectives. Their model-specific limits, productivity anecdotes and wider
workflows are not adopted as course requirements.

The author's [resource index](https://www.humanlayer.dev/blog/humanlayer-resources)
links both selected recordings, including their titles and topics. Direct YouTube
fetches returned cache-miss errors. These are verified outbound author links,
not evidence of completed playback. Full screening, useful excerpts and runtimes
remain presenter preparation.

## Remaining rehearsal and next step

Live OMP discovery on the learner's installed version, the fresh-session handoff
test, learner performance and the proposed 60–75 minute pacing remain to rehearse.
No claim is made that the new guidance measurably improves agent performance.
Next: review section 4 with Petar before developing section 5.
