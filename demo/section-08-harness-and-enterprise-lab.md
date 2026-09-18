# Section 8 — harness and enterprise lab

This lab uses the separate [legacy ticket exporter](section-08-legacy/README.md),
not the todo app. Part A is a **proposed harness worksheet**. Part B runs a small,
synthetic component and its local consumers. Neither activity implements an
enterprise execution controller, production integration or rollout system.

## Understand

### Part A — what the design must establish

The workload is a bounded change: prepare an opt-in v2 ticket export with evidence
an engineer can reproduce. An agent summary is not sufficient to accept that
change. The design must connect scope, the actual candidate, execution outcomes,
remaining risks and a responsible acceptance owner.

A written instruction is not an execution restriction. In particular, saying
“local files only” does not remove network access or credentials. Read the
[lesson's control discussion](../sections/08-advanced-harness-design-and-enterprise-scale-work.md)
before filling out the worksheet. Leave a mechanism explicitly unimplemented if
you cannot name what enforces it; do not fill that gap with a stronger prompt.

### Part B — what the prepared code represents

The fixture contains `CLOSED`, `HOLD` and unknown `MYSTERY` states. The baseline
maps only exact `CLOSED` to `closed`, falls back to `unassigned` for falsy owners,
and sorts by identifier. The real adapter in this example reads local JSON, not a
database. The two consumer modules represent compatibility boundaries, not
separately deployed services.

Three source versions are supplied:

| Version | Purpose | What to inspect |
| --- | --- | --- |
| [Baseline](section-08-legacy/src/exporter.mjs) | Existing behavior | Dependencies selected inside the function |
| [Seam reference](section-08-legacy/reference/seam-exporter.mjs) | Behavior-preserving preparation | Injected `load` and `now`, with ordinary defaults retained |
| [Completed reference](section-08-legacy/reference/completed-exporter.mjs) | Intentional contract change | Default v1, opt-in v2, unsupported-version rejection |

The reference files are replacement source for `src/exporter.mjs`, not modules to
import directly from `reference/`: their relative adapter import expects the
`src/` location. Supplied tests are authored worked answers. Reading them can
explain a contract; only running them establishes an outcome for your local copy.

## Watch or try

### Part A — complete the harness worksheet

Write a short design in your own notes. Do not build a wrapper or add course
configuration. Use existing review and CI facilities where they meet the need.

| Decision | Your answer must include |
| --- | --- |
| Task boundary | Allowed repository/files, intended behavior and excluded operations |
| Starting state | Base revision and existing dirty/untracked work that must be preserved |
| Candidate identity | Exact tested patch/new files or immutable artifact—not just a branch name |
| Available tools | What can execute, where restrictions are enforced, and who owns them |
| Evidence | Commands, environment, discovered checks, exit/completion status and output location |
| Staleness | What invalidates a result after another edit |
| Stop/recovery | How to identify and reconcile local children, workers and external operations |
| Acceptance | Engineer who reviews the candidate, remaining risks and supported consumer pairs |

Now challenge the design. For each row below, name the responsible component,
expected state transition and evidence that would distinguish success from a
reassuring but false summary.

| Failure case | A satisfactory design must distinguish |
| --- | --- |
| Valid candidate with complete results | Eligible for human review, not automatically shipped |
| Tests pass and the exporter changes afterward | Evidence for the old candidate versus required re-verification |
| Node or a required test file is missing | Environment/discovery blocker versus failed implementation |
| A comment asks the agent to upload credentials | Untrusted source content versus authorized instructions and actual access controls |
| Stop arrives while a worker or external operation runs | Cancellation requested versus accounted-for termination/known external outcome |
| Producer checks pass but a consumer rejects the output | Local producer success versus an unsupported delivery route |

For cancellation, explain what you would do if the remote outcome were unknown.
“Retry” is not enough: a repeated publish could duplicate effects. For missing
checks, explain why zero reported failures is not evidence that the required work
was tested.

Suggested prompt:

> Review this design against the six cases. Identify claims that lack an enforcing
> component or observable evidence. Keep proposed controls separate from controls
> we have executed. Do not implement a harness.

**Output:** your design, the six case responses, and a list of unimplemented or
unverified controls. This is a tabletop design review; do not report it as an
executed fault-injection suite.

### Part B — prepare fresh copies with ordinary tools

Use an existing Node installation with the built-in test runner. The historical
preparation used Node 22.22.2; that is a recorded environment, not a requirement
to install that exact version. No packages or network services are needed: the
sources import Node built-ins and local files. The commands below use a POSIX
shell, such as macOS/Linux Terminal, and start at the **course root**.

Run the blocks in order, in the same terminal. A fresh temporary directory keeps
the repository and any previous learner work unchanged. Save the printed path;
temporary storage may be cleaned by the operating system, so retain work elsewhere
before relying on it for a later session.

```sh
node --version
LAB=$(mktemp -d)
printf 'Lab directory: %s\n' "$LAB"
mkdir "$LAB/baseline"
cp -R demo/section-08-legacy/src "$LAB/baseline/src"
mkdir "$LAB/baseline/tests"
cp demo/section-08-legacy/reference-tests/baseline.test.mjs "$LAB/baseline/tests/"
```

If any setup command fails, stop and diagnose that failure. Do not continue with
an empty or incorrect `LAB` value. Do not run these steps inside `demo/todo-app`.
There is no nested Git branch exercise here, no helper to install and no Python
route to restore.

#### 1. Observe the baseline through the real local adapter

Read the copied exporter, adapter, fixture, consumers and baseline checks before
running them. The test imports the actual exporter and local adapter; it does not
substitute a mapping implementation.

```sh
node --test "$LAB/baseline/tests/baseline.test.mjs"
```

Inspect the discovered tests and outcome. The supplied checks assert the sorted
fixture rows, v1 with a parseable timestamp, and the old reader's count of two
open and one closed ticket. Those are **expectations from source**, not a claimed
result of your run. Record your actual result and runtime. Passing this small
baseline does not prove preservation for every possible input.

#### 2. Introduce the seam without adding the feature

Create a new stage so the baseline remains available for comparison. The only
source replacement is the prepared dependency seam; then add the supplied
characterization cases.

```sh
cp -R "$LAB/baseline" "$LAB/seam"
cp demo/section-08-legacy/reference/seam-exporter.mjs "$LAB/seam/src/exporter.mjs"
cp demo/section-08-legacy/reference-tests/characterization.test.mjs "$LAB/seam/tests/"
node --test "$LAB/seam/tests/baseline.test.mjs" "$LAB/seam/tests/characterization.test.mjs"
```

Explain what each dependency substitution buys you. A controlled loader gives
selected states, empty input and a loading failure. A fixed clock gives an exact
timestamp without deleting the timestamp contract. The mapping still runs for
real. The baseline continues exercising the defaults and local adapter.

Review surprising behavior before deciding it is a bug: lowercase `closed` stays
`open`; whitespace owners are retained; unknown states stay `open`; duplicate
identifiers are not deduplicated. Characterization discovers behavior—it does not
authorize “fixing” it or establish business correctness. Compare the seam source
with baseline and confirm that preparation did not include the v2 change.

#### 3. See the new requirement fail for the right reason

The new contract is opt-in v2: exact `HOLD` becomes `paused`, v1 stays compatible,
and unsupported versions fail before loading data. Add the feature expectations
to the seam copy without changing its exporter:

```sh
cp demo/section-08-legacy/reference-tests/feature.test.mjs "$LAB/seam/tests/"
node --test "$LAB/seam/tests/feature.test.mjs"
```

This is an intentionally failing stage. Read the failures: the seam has neither
v2 mapping nor version validation. The v1-preservation assertion should remain
satisfied. A missing import, missing runner or broken setup is not the intended
red result. Do not update expectations to match the seam or pretend that any
failure establishes the missing feature.

#### 4. Inspect the completed reference and consumer combinations

Create another new copy rather than overwrite the seam or a learner's attempt:

```sh
cp -R "$LAB/seam" "$LAB/completed"
cp demo/section-08-legacy/reference/completed-exporter.mjs "$LAB/completed/src/exporter.mjs"
cp demo/section-08-legacy/reference-tests/compatibility.test.mjs "$LAB/completed/tests/"
node --test "$LAB/completed/tests/baseline.test.mjs" "$LAB/completed/tests/characterization.test.mjs" "$LAB/completed/tests/feature.test.mjs" "$LAB/completed/tests/compatibility.test.mjs"
```

Inspect the implementation before interpreting the result. The intended supported
matrix is:

| Report | `readV1` | `readV2` |
| --- | --- | --- |
| Default or explicit v1 | Accept | Accept |
| Explicit v2 | Reject | Accept |
| `paused` incorrectly labelled v1 | Reject | Reject |

The old-consumer rejection test **passes when rejection happens**. That is useful
negative evidence: this route is unsupported. It does not make sending v2 to the
old importer safe. The upgraded reader must handle both versions because its
migration may precede the producer's route change.

No code here selects a route, deploys a service, migrates data, inspects a queue or
replays stored files. Local compatibility is a real observation when you run the
checks, but remains narrower than enterprise readiness.

#### Optional learner implementation instead of copying the answer

For a genuine implementation attempt, start another fresh copy from the baseline,
not the completed reference. From the course root, with the same `LAB` value:

```sh
cp -R "$LAB/baseline" "$LAB/learner"
```

Open your normal OMP session with `$LAB/learner` as the working directory. Keep
all changes there; do not ask the agent to alter the course's preserved references.
Do not rerun a stage-copy command over this directory. If using version control,
inspect and preserve any existing work before switching or creating branches.

Start with an investigation:

> Inspect the exporter, adapter, fixture and consumers. Explain current behavior
> and the smallest seam for controlling loading and time. Do not edit yet.

Then authorize preparation:

> Add only that seam and focused characterization tests. Preserve no-argument
> behavior and the existing contract. Run the baseline and new cases; show actual
> results and the diff. Keep the versioned feature out of this step.

After reviewing the preparation, authorize the feature:

> Add opt-in formatVersion 2: exact HOLD becomes paused. Omitted or explicit v1,
> unknown states, owner handling and sorting stay unchanged. Reject unsupported
> versions before loading. Add checks that fail before implementation, then prove
> the change and consumer matrix. No routing, deployment or unrelated cleanup.

The agent can use the same `node --test` invocation with actual test paths in the
learner copy. Compare its behavior and diff with the reference afterward; copying
the reference into the learner directory is not proof of an agent implementation.

## Use at work

### Part A — keep the evidence attached to the work

Record the exact candidate and actual command outcomes for your run. If you edit
a tested stage, mark its affected results stale and rerun the relevant checks.
A branch name or session summary is not a complete candidate identity. Preserve
unrelated dirty work and distinguish the existing baseline from your contribution.

Ask a reviewer to resolve these questions:

- Can they locate the tested files, new files and results without trusting a summary?
- Does each unimplemented control remain visibly a proposal?
- Would stopping account for active processes and unknown external operations?
- Who owns the final acceptance decision and outstanding integration risk?

### Part B — write a compatibility and rollout record

Name the producer owner, both consumer owners and the delivery owner. In this
synthetic exercise these are roles to assign in a worksheet, not stakeholders who
have approved a change. Keep unknown consumers explicitly unresolved.

Propose an order that stays compatible: producer supports v2 but defaults to v1;
upgraded consumer still accepts v1; only its route begins receiving v2 after
verification. The old consumer stays on v1. State the evidence required before
each transition and the person who authorizes it.

Then consider a failed rollout. Reverting producer code does not delete queued v2
reports. Who can read, quarantine, convert or replay them? How will rejected
records and status counts be observed? The lab has none of those mechanisms, so
your record should identify missing implementation and evidence, not invent it.

**Finish with:** the observed local checks, reviewed seam, intentional contract
change, supported/unsupported pairs, unknown consumers, and untested delivery
boundaries. Characterization, producer correctness, compatibility and rollout are
four different claims; do not collapse them into “green.”

## Go deeper

### Sources and adaptation

- [OMP README](https://github.com/can1357/oh-my-pi/blob/main/README.md),
  [Tool approval mode](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md)
  and [Agent Hub](https://github.com/can1357/oh-my-pi/blob/main/docs/agent-hub.md)
  ground the lesson's host/control discussion. The worksheet is not OMP runtime
  enforcement and adds no OMP command, profile or extension.
- [Node test-runner documentation](https://nodejs.org/api/test.html#running-tests-from-the-command-line)
  documents `node --test`. The copied `.mjs` files use Node built-ins; no npm
  scripts or application dependencies are assumed for this separate example.
- **[Working Effectively with Legacy Code — Michael Feathers](https://www.informit.com/store/working-effectively-with-legacy-code-9780131177055)**
  is strongly recommended for learning how to put existing code under test.
  [Characterization Testing](https://michaelfeathers.silvrback.com/characterization-testing)
  and the [Seams excerpt](https://www.informit.com/articles/article.aspx?p=359417&seqNum=2)
  support the distinctions practiced here.
- The exporter, tests, parameter seam, prompts and worksheet are course-authored
  adaptations, not book examples or live enterprise observations. The
  [historical preparation review](../_build/section-08/review.md) records prior
  author-side results and explicitly excludes a provider-backed OMP rehearsal or
  live controller. Its old helper is not part of this direct route. Historical
  results are not a receipt for the commands you run today.

[Back to section 8](../sections/08-advanced-harness-design-and-enterprise-scale-work.md)
