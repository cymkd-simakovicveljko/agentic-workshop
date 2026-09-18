# Section 6 — preparation review

**Draft v0. Reviewed 12 September 2026.** This record describes authored fixtures
and local checks, not a live OMP recovery or subagent performance result.

## Scope and teaching choices

- Developed [Reliable execution](../../sections/06-reliable-execution.md) and the
  [recovery lab](../../demo/section-06-recovery-lab.md).
- Selected a two-attempt filter example: in-place sorting crashes on frozen
  input; copying before sorting removes that crash but violates source order.
- Added one meaningful order test only in disposable labs. Retained application
  files and tests are preserved.
- Included a pause, preservation of an untracked note, fresh-session resumption,
  and two explicit recovery routes: bounded repair or selected-file restore.
- Added a [narrow OMP reader example](../../demo/agents/course-contract-auditor.md)
  for an optional independent coverage audit. No global agent was installed.
- Kept section 3 as the practical core. Sections 7–8 remain scaffolds.

## Sources checked

| Primary source | Use and limits |
| --- | --- |
| [Google SRE: Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/) | Problem reports, hypothesis testing and impact-sensitive response. Our code example and stopping rule are original teaching choices. |
| [OMP keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md) | Active controls through `/hotkeys`; no live abort outcome claimed. |
| [OMP approval modes](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md) | Parent policy and headless child behavior must be distinguished. |
| [OMP task tool](https://github.com/can1357/oh-my-pi/blob/main/docs/tools/task.md) and [agent discovery](https://github.com/can1357/oh-my-pi/blob/main/docs/task-agent-discovery.md) | Worker assignment, source selection, explicit tools and spawn lists. Main-branch documentation may differ from the installed release. |
| [GitHub's selective-delegation case study](https://github.blog/ai-and-ml/how-we-made-github-copilot-cli-more-selective-about-delegation/) | Motivates choosing independent useful work; no product benchmark is generalized to this course. |
| [Anthropic's multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) | Coordination, independent investigations and resource trade-offs. |
| [Anthropic's long-running-agent harness](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | Incremental progress and recoverable records; full architecture deferred. |
| [Git restore](https://git-scm.com/docs/git-restore) and [worktrees](https://git-scm.com/docs/git-worktree) | Path-specific restoration and separate working trees; neither represents a complete security boundary. |
| [David Amin's SREcon23 presentation](https://www.usenix.org/conference/srecon23americas/presentation/amin) | Publisher page identifies speaker, topic, slides and presentation-video section. |
| [Annie Zhou and Sophie Zhang's SREcon26 presentation](https://www.usenix.org/conference/srecon26americas/presentation/zhou-annie) | Publisher page identifies speakers, topic and video link. Performance claims remain the presenters' case-study claims. |

The supplied research report was consulted as background. Its embedded
recommendations and unresolved citation markers were not treated as user
instructions or independent verification.

## Prepared states and checks

The [helper](prepare_recovery_lab.py) completed in a fresh temporary repository
and captured actual checks for each state:

| State | Pass | Fail | Exit |
| --- | --- | --- | --- |
| Working baseline | 12 | 0 | 0 |
| In-place sort | 1 | 11 | 1 |
| Copy then sort; learner starting state | 11 | 1 | 1 |

The extra test uses an unsorted sequence of different matching names and checks
source order. The previous checks alone do not expose sorting this particular
copied array. The new assertion checks existing accepted behavior.

[validate_preparation.py](validate_preparation.py) checks the source/evidence
hashes, runs the lab's documented diagnosis, snapshot, restore and final-check
blocks, verifies preservation of the unrelated note and accepted tests, parses
the agent frontmatter, and checks local Markdown links. Its recorded outcome is
in [verification.json](verification.json). Logs and snapshots are retained under
`validation/` independently of the temporary lab's lifetime.

Local OMP **18.0.6** advertises the profile, tool-list, approval, skill-disable
and maximum-time flags. `omp agents --help` identifies project agent export into
`.omp/agents`. This checks the CLI surface; it does not establish interactive
discovery of the custom reader, its resolved model, effective tools, concurrency
or cancellation.

## Author review decisions

- State failing counts accurately; “eleven pass” must not hide a twelfth failure.
- Keep environment errors distinct from intended assertion failures.
- Label all prepared attempts as authored fixtures, with actual per-state logs.
- Make pause, live interrupt, fresh-session recovery and selected-file restore
  separate observations. No unbounded interrupt demonstration is required.
- Preserve both a tracked patch and the untracked note contents; a filename list
  alone is not a backup. The snapshot's coverage is explicitly limited to named
  lab material.
- Keep one parent responsible for integration. The optional child investigates
  coverage while the parent drafts a handoff, with the app/test state held fixed.
- Do not assume child approval policies match the parent or that a worktree
  isolates network access and credentials.
- Avoid claiming that delegation improves this tiny task; direct work is valid.

## Remaining rehearsal

- Run the diagnosis and recovery prompts with the actual learner provider/model.
- Observe a live interrupt and account for tool, process and worker completion.
- Verify the optional custom reader's discovery, resolved model, effective tool
  set, completion and cancellation on the installed OMP version.
- Observe fresh-session reconstruction from a learner-authored handoff.
- Screen full video playback and choose excerpts; pilot teaching timings.

No provider-backed model or subagent was run during drafting. Browser behavior,
production rollback, cross-platform setup and measured learner outcomes are
outside these preparation checks. The lesson's 75–90 minute estimate and optional
extension timing remain proposals.
