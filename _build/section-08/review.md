# Section 8 — preparation review

**Draft v0. Reviewed 12 September 2026.** Author review and local execution checks;
no provider-backed OMP session, live harness controller or reviewer swarm was run.

## User direction and scope

Petar requested section 8 in two parts: harness engineering, then working with
enterprise software. He requested ideas from Michael Feathers' Working Effectively
with Legacy Code and a recommendation of the book as a resource for writing tests.

Developed the [lesson](../../sections/08-advanced-harness-design-and-enterprise-scale-work.md),
[two-part lab](../../demo/section-08-harness-and-enterprise-lab.md) and a separate
[legacy exporter example](../../demo/section-08-legacy/README.md). The first activity
is a design review, and the second executes characterization, dependency seams,
an opt-in versioned change and small consumer compatibility checks.

The scenario, code, proposed timings and architecture are original teaching
choices. They are not descriptions of HireRight or a production deployment.
Section 3 remains the practical core. All eight sections now have Draft v0 lessons;
course-wide review, live rehearsal and delivery-format decisions remain open.

## Primary sources checked

| Source | Use and limits |
| --- | --- |
| [Working Effectively with Legacy Code — publisher](https://www.informit.com/store/working-effectively-with-legacy-code-9780131177055) | Verified author, title, description, table of contents and chapter references. Recommend for testing existing code and dependency breaking. The full book was not supplied or reviewed in this task. |
| [Feathers' characterization-testing article](https://michaelfeathers.silvrback.com/characterization-testing) | Current observed behavior versus desired correctness, exploration and surprising behavior. Course code is original and does not reproduce the article's Java example. |
| [Seams excerpt](https://www.informit.com/articles/article.aspx?p=359417&seqNum=2) and [Seam Types](https://www.informit.com/articles/article.aspx?p=359417&seqNum=3) | Substituting behavior through a seam to separate dependencies and observe code. The parameter seam is a course adaptation. |
| [Feathers' InfoQ interview](https://www.infoq.com/podcasts/working-effectively-legacy-code/) | The author's explanation of characterization; publisher timestamp 08:57. Listed as audio/transcript, not video. |
| [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | Initialization, incremental work and continuation records as a case study. Not a required OMP architecture. |
| [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) | Evaluation feedback and removing complexity as capabilities change. No source benchmark generalized to the course. |
| [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Tasks, repeated trials, outcomes and grader calibration; evaluate the system together. |
| [Patterns of Legacy Displacement](https://martinfowler.com/articles/patterns-legacy-displacement/) | Further reading on changing existing systems incrementally. The exact exporter rollout is authored, not prescribed by this source. |
| [Pact introduction](https://docs.pact.io/) | Consumer/provider contract-testing concepts. The lab's small local readers are not a Pact setup or real service integration. |
| [GOTO platform-engineering discussion](https://gotopia.tech/articles/354/tap-into-fast-flow-with-team-topologies-and-platform-engineering) | Publisher identifies Manuel Pais and Julian Wood and provides transcript/video. Useful platform ownership and organizational context. |
| [Martin Fowler video index](https://www.martinfowler.com/videos.html) | Publisher listing and link for Workflows of Refactoring. Full playback not screened. |

An additional GOTO Feathers episode surfaced in search but could not be fetched
reliably. It was not added to the section's selections. The accessible author
article, publisher excerpts and InfoQ interview support the Feathers material.
External documents were treated as sources, not instructions to install tools,
delegate tasks or expand the user's request.

## Executed preparation checks

The [helper](prepare_enterprise_lab.py) created a fresh directory for each stage.
Node **22.22.2** ran the local tests with no dependency installation or external
service. The adapter reads a synthetic JSON fixture, and ordinary calls use the
actual clock; focused tests inject data and time through the seam.

| State | Passed | Failed | Exit |
| --- | --- | --- | --- |
| Original baseline and outer checks | 3 | 0 | 0 |
| Behavior-preserving seam plus characterization | 9 | 0 | 0 |
| New feature checks against a copy of the seam state | 1 | 2 | 1, expected |
| Completed versioned reference and consumer checks | 15 | 0 | 0 |

See [baseline](baseline-test-output.txt), [seam](seam-test-output.txt),
[feature before implementation](feature-before-implementation.txt) and
[completed](completed-test-output.txt) output. The expected failures establish
that v2 mapping and version rejection are absent before the feature change.
An old consumer rejecting v2 is an expected passing compatibility assertion;
it documents an unsupported pairing, not an approved deployment route.

[verify_preparation.py](verify_preparation.py) checks the stored results, source
preservation, prepared manifests, local links, fences and syntax. The machine-readable
summary is [verification.json](verification.json). Stage manifests are retained
beside the logs so their source identities survive disposable-directory cleanup.

## Author review decisions

- Split harness engineering and enterprise software into explicit Part A / Part B.
- Preserve OMP as the execution host; the diagram and worksheet are proposed
  responsibilities, not new OMP features or executable enforcement.
- Separate stale evidence, missing tools, code failures and consumer incompatibility.
- Account for active processes and unknown external outcomes during cancellation.
- Keep characterization separate from accepted new requirements. Recording a
  surprising result does not establish its desirability or prohibit a later repair.
- Establish an outer observation before a small seam edit, then use focused tests.
  The initial checks cannot prove every possible behavior is unchanged.
- Preserve no-argument calls, default v1, owner fallback, unknown-state handling,
  order and duplicate occurrences. Introduce v2 as the explicit feature step.
- Keep consumer versions and stored/queued artifacts in the rollout discussion;
  reverting source alone cannot recover every distributed change.
- Label all examples and results as authored/offline rather than claiming observed
  stakeholder approval, live agent success or production compatibility.

## Remaining work for delivery

- Review both parts with Petar and decide advanced module versus follow-on course.
- Rehearse live OMP prompts and observe the actual tool/context configuration.
- Implement and execute the harness fault cases only if a real controller is chosen.
- Replace synthetic consumers/adapters with representative integration cases for
  an enterprise pilot; verify routing, replay, data migrations and recovery there.
- Screen recordings, choose excerpts and pilot the two workshop timings.

All prior lessons and retained demo assets are preserved. No further WIP archival
was needed. Drafting is complete for all eight sections; teaching and operational
readiness remain separate assessments.
