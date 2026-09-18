# Section 5 — preparation review

**Draft v0. Reviewed 12 September 2026.** This is an author preparation record,
not a report of a live OMP skill evaluation or a measured classroom trial.

## Scope

- Developed [section 5](../../sections/05-skills.md) around selecting, writing and
  evaluating a focused skill for a repeated engineering practice.
- Added the [comparison lab](../../demo/section-05-skill-lab.md), a reusable
  [change-evidence-review skill](../../demo/skills/change-evidence-review/SKILL.md),
  and [the disposable preparation helper](prepare_skill_lab.py).
- Kept section 3 as the workflow core, OMP as the teaching host, and resources
  at the bottom of the lesson. Sections 6–8 remain scaffolds.
- Updated course navigation. No global skill, plugin or new framework was installed.

## Source checks

Primary sources used for technical guidance and resource selection:

| Source | Checked use |
| --- | --- |
| [Agent Skills specification](https://agentskills.io/specification) | Required metadata, directory convention and optional supporting files. |
| [OMP skills documentation](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md) | Project location, discovery, read-based loading, CLI filters and optional explicit commands. The raw file was also read. |
| [Anthropic's Agent Skills introduction](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) | Progressive disclosure and capability packaging. |
| [Authoring guidance](https://agentskills.io/skill-creation/best-practices) | Coherent scope and useful instructions. |
| [Evaluation guidance](https://agentskills.io/skill-creation/evaluating-skills) | Baseline comparisons and output assessment. |
| [Description guidance](https://agentskills.io/skill-creation/optimizing-descriptions) | Natural requests and negative selection cases. |
| [Anthropic's talk companion](https://claude.com/blog/building-agents-with-skills-equipping-agents-for-specialized-work) | Publisher link for “Don't Build Agents, Build Skills Instead.” Direct video retrieval encountered a Google challenge; it was not bypassed. |
| [DeepLearning.AI course](https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/) | Publisher search-index content identifies Elie Schoppik and the selected 16- and 7-minute lessons. Direct page fetch was blocked; no enrollment or full playback was performed. |

Local `omp --help` on **18.0.6** confirms the documented profile, tool-selection,
skill-filter, skill-disable and session flags. This is a CLI check, not evidence
that an interactive provider-backed run selected the sample.

## Observed preparation checks

The helper completed successfully in a new temporary directory. It prepared the
working filter baseline, committed it locally, added the incomplete Clear filter
candidate and captured an actual `npm test` run: **11 passed, 0 failed, exit 0**.
The skill body is absent from the prepared lab until the learner adds it.

The [verification script](validate_preparation.py) checks the candidate's hashes,
saved diff, starting Git manifest, JavaScript syntax, preserved course files,
sample skill metadata and local Markdown links. Its result and runtime versions
are in [verification.json](verification.json). The captured
[test output](candidate-test-output.txt), [evidence metadata](candidate-evidence.json)
and [candidate diff](candidate.diff) are retained here independently of the
temporary lab's lifetime.

The skill-creator quick validator could not execute because neither available
Python runtime had PyYAML installed. No dependency was installed for this check.
Instead, the preparation validator uses the existing Bun YAML parser and checks
the sample's required fields, naming, directory match and nonempty body. This
does not claim to be the full upstream validator or a behavioral test.

### Browser observation

In a background in-app browser, opened the prepared app at local port 4185:

1. Initial state: empty input, disabled Clear filter, four projects displayed.
2. Typed `team`: input contained `team`, count was `0 of 4 projects`, no-results
   text was visible and Clear filter was enabled.
3. Clicked Clear filter: input became empty, but the count stayed at zero and
   no-results text remained visible. The button stayed enabled and focused.

This confirms the prepared click-path defect. No keyboard-specific activation,
cross-browser or complete accessibility audit was performed. The temporary tab
was closed and its server stopped afterward.

The learner's evidence bundle deliberately contains only the captured Node run;
its `browser_checks_run: false` describes that bundle. This separate author-side
browser observation must not be passed into the baseline or skill review as an
unrecorded extra input.

## Author review decisions

- Separate discovery, body loading, correct task performance and improvement
  over a baseline. Explicit invocation is a separate diagnostic.
- Keep the exact request, application state and evidence the same for both
  reviews. Keep the skill absent until after the baseline, and save responses
  and discussion notes outside the lab.
- Allow a correct baseline and a tie. Do not manufacture an improvement claim.
- Distinguish a source-supported defect from missing verification and from an
  actually observed browser result.
- Make missing-input and near-miss cases self-contained so the unrelated course
  contract cannot accidentally supply their answers.
- Keep the skill reusable: no project names, expected test count, specific
  defect, fixed verdict or instruction to repair the application.

## Remaining rehearsal

- Observe actual OMP discovery and body loading with the intended learner setup.
- Run the fresh-session baseline and skill comparison using a named model and
  recorded settings; evaluate natural selection separately from explicit loading.
- Try the boundary cases and a different change to assess transfer and regressions.
- Screen recordings and pilot the proposed teaching timings.

No model run, skill-quality improvement, classroom duration or learner outcome
is claimed by the preparation checks. This drafting turn used local author review;
no new review swarm was launched.
