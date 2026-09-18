# Section 3 — Draft v0 preparation review

**Date:** 12 September 2026. **Status:** Ready for Petar's review.

Petar identified the everyday workflow as the most important section and asked
for many examples and resources. The draft develops all six stages through a
Clear filter feature, with a runnable optional lab and seven transfer scenarios.
Navigation now points to section 3 for review; sections 4–8 remain scaffolds.

## Teaching and scope review

- Each stage connects a decision, prompt, useful artifact and check. Prediction
  questions, deliberately wrong implementations and review comments support discussion.
- The starting app passes all 11 existing checks without a Clear button. The
  lesson uses this concrete example to distinguish regression coverage from
  evidence that a new interaction works.
- The lab explicitly authorizes its own UI files and preserves the existing
  matching contract. Normal feature work can include relevant new tests; the
  lab's unchanged-test rule is not presented as a general engineering rule.
- The prepared reference is identified as authored code, not a live agent result.
  The other repositories and requirements are labelled fictional scenarios.
- The optional Playwright example states its prerequisites and is kept separate
  from the demo's Node test files. Controls use accessible names; the row locator
  uses the existing results container, without depending on list-item roles in
  the browser's accessibility representation.
- Resources are curated at the bottom of the lesson, with starting recommendations,
  purposes and video discussion prompts. They are a reference library, not a
  requirement to read everything during the workshop.
- The six stages are flexible thinking steps. Extra plan-review pauses are
  explicit teaching choices, and already-authorized work can continue.

## Executed checks

The [validation script](validate_lab.py) runs the actual setup block from the lab
guide, applies the exact reference snippets in a disposable copy, and records
results in [validation.json](validation.json). No retained demo implementation,
tests or dependencies were changed.

- Actual setup produced a working baseline: **11 passed, 0 failed**.
- The Clear control was absent before applying the reference.
- Prepared reference JavaScript syntax and the existing suite passed:
  **11 passed, 0 failed**.
- The complete tracked diff changed only `public/index.html` and `public/app.mjs`;
  the whitespace check passed.
- A failed preparation in an unrelated temporary directory stopped before
  creating a Git repository.
- The optional Playwright snippet passed a JavaScript syntax check. It was not
  run through the Playwright test runner and no browser-test dependencies were installed.

The prepared reference also ran at `http://127.0.0.1:4178/` in the Codex in-app
browser. UI observations confirmed:

- Empty initial input, a disabled Clear button and four results in source order.
- `Atlas` produced two results; clicking Clear restored four and input focus.
- `team` produced the empty message; Tab then Enter cleared it and restored focus.
- Spaces left Clear enabled; Tab then Space emptied the field and disabled it.
- Selecting and deleting the query restored the list and disabled the button.
- Padded `ATLAS` returned two results; `.*` and `cafe` returned none; `Café` and
  `Borealis` each returned the expected single project.

An empty-string fill operation through the browser tool left the previous input
unchanged. The manual deletion check therefore used actual Select All and
Backspace keys, whose resulting state was observed. That attempted fill is not
counted as a successful check. The temporary server and browser tab were stopped
after verification.

## Sources and resource checks

Primary sources were inspected on 12 September 2026. The lesson links directly
to the authors' or maintainers' material:

- Simon Willison's agentic engineering patterns for baseline tests, red/green TDD
  and manual testing; these support practices, not a guarantee of model reliability.
- Gojko Adzic on key examples; Google's engineering-practices pages on review,
  small changes and change descriptions; Fowler's refactoring reference.
- Anthropic's Claude Code workflow guidance for transferable ideas. Its product
  commands are not offered as OMP commands.
- MDN's input-event, button and focus documentation; Git's diff reference;
  the Node 22 test-runner documentation; Playwright's locators, assertions and
  testing guidance.

The OMP launch settings are reused from the verified section 1 setup. The local
version check returned OMP 18.0.6; Node returned 22.22.2. This preparation did
not start a provider-backed OMP session.

The [Willison podcast page](https://simonwillison.net/2026/Apr/2/lennys-podcast/)
supports the selected chapter boundaries. The
[Adzic speaker page](https://gojko.net/2014/09/04/specification-by-example/)
links the recording. Fowler's
[video index](https://www.martinfowler.com/videos.html) links the selected YouTube
recording and lists its approximate 27-minute duration. Direct playback of the
embedded Willison and Adzic recordings was not verified; the lesson deliberately
links their author pages. Full video screening remains presenter preparation.

## Limits and next step

This is an author review, not a new swarm review. The earlier swarm request
concerned section 1. Sections 1, 2 and 4–8 were checked for unintended edits.

The browser observations cover selected interaction checks in one browser.
The network-log procedure, visual focus-indicator inspection, full accessibility
and cross-browser checks remain to be rehearsed. No live model behavior,
interruption procedure or classroom pacing was measured. The Mermaid diagram
was inspected as source rather than rendered.

The proposed two workshops of 75–90 minutes need a pilot. Next: review section 3
with Petar before developing section 4.
