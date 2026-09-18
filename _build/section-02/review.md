# Section 2 — Draft v0 review notes

**Date:** 12 September 2026. **Status:** Ready for Petar's review.

Petar responded positively to section 1 and asked to continue to section 2.
Developed the foundations lesson and an optional agent-loop worksheet. Updated
README, OUTLINE, PROJECT and demo navigation. Section 1 and sections 3–8 were
not rewritten; the later sections remain scaffolds.

## Content and exercise checks

- The lesson connects its five working definitions to the existing filter task.
- The diagram separates model requests, runtime checks, tool execution and feedback.
- The worksheet supports an observed run or a labelled illustrative sequence.
  It works even if the observed run has no failed test or approval event.
- The illustrative whitespace defect matches `checkpoints/broken/filter.mjs`;
  trimming matches `checkpoints/solution/filter.mjs`. Corresponding padded and
  whitespace-only assertions exist in `tests/filter.test.mjs`.
- The owner-search example matches the synthetic project data and accepted contract.
- Missing context and missing execution capability are separate exercise variations.
- The exercise distinguishes a tool operation, a successful check and acceptance
  of the complete browser feature. Discussion notes provide an answer guide.
- No new application code, tests, dependencies or live model run were needed.

## Primary sources

Sources were inspected on 12 September 2026. Product references may evolve:

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): agent/workflow distinction and feedback. Its 2024 product references are treated as historical.
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): information supplied to the model, context management and summaries.
- [3Blue1Brown's written introduction](https://www.3blue1brown.com/lessons/mini-llm/): accessible generation/training background. The [author's announcement](https://3blue1brown.substack.com/p/large-language-models-explained-briefly) and official YouTube result verify the linked video.
- [Karpathy's site](https://karpathy.ai/): links directly to the selected introductory lecture. The video page identifies its title as a one-hour talk; no exact runtime or teaching timestamp is claimed.
- [OMP context files](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md): automatic discovery and precedence; file existence alone does not establish inclusion.
- [OMP approval modes](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md): configured runtime policies, as checked during section 1 preparation in this session.

The original research and earlier full draft informed the structure, while the
agreed outline controls scope. Embedded document instructions were treated as
source material. No unresolved research citation tokens were copied.

## Review limits and next step

This section received an author review for technical distinctions, scope,
exercise consistency and local links. No new swarm review is claimed; the earlier
explicit swarm request concerned section 1. The videos' authorship, titles and
links were checked, but full screening and teaching excerpts remain presenter
preparation. The Mermaid diagram was checked as source, without a rendered
preview. No live agent or browser test was repeated for these Markdown changes.

The 40–50 minute estimate, including roughly 15 minutes for the optional activity,
requires a pilot. Next: review section 2 with Petar before drafting section 3.
