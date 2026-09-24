# Section 7 — coordinate a change, then change the requirement

Deliver one local increment before reopening its design. The exercise uses the
existing ticket exporter because its producer/reader dependency is real and
runnable without the unavailable todo app. You will not build a tracker, deploy
anything or invent a larger system around the fixture.

Use the packets in order. A facilitator should reveal Packet B only after the
learner has delivered and checked the first increment. A solo learner can cover
that section until then. The worked responses are authored examples, not captured
agent output, product approval or results from your run.

## Understand

### The independent starting state

The existing files under `section-08-legacy/` supply everything this exercise
needs. Their directory name does not make section 8 a prerequisite. Start from
`src/`, not a previous learner's modified copy. Section 8 later starts afresh and
teaches characterization, a dependency seam and compatibility implementation;
this lab uses prepared code to concentrate on decisions and dependencies under
change.

Read these files before choosing the approach:

| Source | What it establishes |
| --- | --- |
| [exporter.mjs](section-08-legacy/src/exporter.mjs) | No-argument v1 export; exact `CLOSED` becomes `closed`; other states become `open`; falsy owners become `unassigned`; rows sort by ID. |
| [data-adapter.mjs](section-08-legacy/src/data-adapter.mjs) and [tickets.json](section-08-legacy/src/tickets.json) | Real local JSON loading, with `T-03/CLOSED`, `T-20/HOLD` and `T-09/MYSTERY`; no service, queue or database. |
| [consumer-v1.mjs](section-08-legacy/src/consumer-v1.mjs) | `readV1` rejects any non-v1 report and accepts only `open`/`closed` statuses. |
| [consumer-v2.mjs](section-08-legacy/src/consumer-v2.mjs) | `readV2` accepts v1 and v2; `paused` is valid only in a v2 report. |
| [baseline.test.mjs](section-08-legacy/reference-tests/baseline.test.mjs) | Three existing assertions for fixture rows, version/timestamp and old-reader consumption. |
| [completed-exporter.mjs](section-08-legacy/reference/completed-exporter.mjs) | Supplied implementation of explicit v1/v2, with default v1, exact `HOLD → paused` in v2 and unsupported-version rejection. |

The completed reference is replacement source for `src/exporter.mjs`; importing
it in place from `reference/` would use the wrong relative adapter path. Read its
`load`/`now` parameters as supplied implementation details here. Designing and
characterizing that seam belongs to section 8, not this coordination exercise.

### What counts as evidence

Source inspection establishes the contract represented by these files. Running
the prepared route establishes what that candidate does locally. It does not
establish an independent implementation, a provider-backed OMP interaction,
production consumer agreement or a classroom timing result. Keep those labels
in your record; none can be inferred from a passing Node command.

## Watch or try

### Prepare a fresh baseline — shell block 1

Use a POSIX shell and Node with the built-in test runner. No npm installation,
credentials or network is needed. Start at the **course root**, and keep the same
terminal and `COORD` value through the six shell blocks. Stop if setup fails;
never continue with an empty directory variable.

```sh
node --version
COORD=$(mktemp -d)
printf 'Coordination directory: %s\n' "$COORD"
mkdir "$COORD/baseline"
cp -R demo/section-08-legacy/src "$COORD/baseline/src"
mkdir "$COORD/baseline/tests"
cp demo/section-08-legacy/reference-tests/baseline.test.mjs "$COORD/baseline/tests/"
node --test "$COORD/baseline/tests/baseline.test.mjs"
```

Expect three assertions to pass. Record the actual output and runtime. These
checks describe the current fixture; they do not prove every possible ticket
input. Save the printed directory if you will return later, and preserve useful
work outside temporary storage before relying on it for a future session.

### Packet A — agreed intent before implementation

The reporting owner supplies this course-authored brief:

> Show paused work separately from open work. For this controlled local cutover,
> ordinary exports will become v2 and the intended reporting use will adopt the
> supplied upgraded reader. The old reader is outside the intended supported
> path after that cutover. Deliver a producer increment first, then integrate the
> upgraded-reader use before accepting the combined change. No deployment is
> authorized or represented here.

The old reader's exclusion is an explicit requirement for Packet A, not a fact
you should invent in a real project. You may challenge it, but do not silently
change the exercise to a different requirement. The product decision is given so
we can later see exactly what a changed decision invalidates.

| ID | Accepted behavior for Packet A |
| --- | --- |
| A1 | `exportTickets()` returns format v2. `T-20` is `paused`; `T-03` remains `closed`; unknown-state `T-09` remains `open`. |
| A2 | Identifier order, owner fallback and a valid generated timestamp remain intact. No fixture-data cleanup is authorized. |
| A3 | `readV2(await exportTickets())` produces `{open: 1, closed: 1, paused: 1}` for the fixture. |
| A4 | Sending that v2 report to `readV1` rejects. Record the unsupported path; do not weaken the reader or label paused data as v1. |
| A5 | The producer increment alone is not whole-change acceptance. Review the intended reader and integrated call before accepting the local cutover. |

**Non-goals:** no new report fields, formats, UI, database, route selector,
deployment controller, queue, persisted export storage or dependency. The data
adapter remains local. We do not know anything about production callers because
the example has none to inspect.

Before implementing, write one proportionate specification/design note in your
existing notes or tracker. Explain the accepted behavior, the default-version
choice, the assumption that permits it, and a dependency-ordered plan. Assign a
requirement owner, producer owner, consumer-use reviewer and integration owner;
one learner may hold all four roles. State which evidence each increment returns.
Use the [section 5 handoff](section-05-context-and-handoff.md) for continuity, not
another artifact schema.

A useful agent prompt, if you have authorized provider access, is:

```text
Read Packet A and the supplied baseline, readers and completed reference before
editing. Propose the smallest approach and dependency-ordered increments. Name
the default-version decision, what could invalidate it, each ownership boundary
and the evidence for combined acceptance. Do not claim a deployment or invent
callers. Keep all implementation work in the new disposable candidate.
```

#### Worked response: initial approach and ownership

A defensible response is: “Packet A authorizes a coordinated local replacement,
so choose default v2 rather than preserve a default that the accepted path no
longer wants. Inspect both readers before editing because version compatibility
is the main risk. Deliver the producer candidate with v2 rows and the known
old-reader rejection. Then verify the real upgraded reader consuming that
candidate. The integrator accepts only the combined local result.”

The contract owner confirms the default and the old-reader exclusion. The
producer owner changes only the candidate's exporter. The reader reviewer owns
the consumption evidence and checks that the selected reader really handles
paused data. The integrator owns the stable candidate, combined results and
acceptance note. Keep these roles serial for a solo learner. If two people are
available, a read-only review of reader constraints is independent of preparing
the producer after the contract is agreed; competing edits to the exporter or
acceptance record are not.

The risky boundary is visible: an unknown or non-movable old caller would
invalidate the coordinated-cutover premise. The plan should say so, rather than
bury that assumption in a final “risks” paragraph.

### Deliver increment 1 — shell block 2

The provider-free route below uses the real completed reference, changing only
its default from v1 to v2 in a **new disposable candidate**. It does not alter the
preserved course source or section 8's reference. This is a prepared
implementation, not a code scaffold that the learner is asked to finish.

```sh
cp -R "$COORD/baseline" "$COORD/increment-1"
cp demo/section-08-legacy/reference/completed-exporter.mjs "$COORD/increment-1/src/exporter.mjs"
node --input-type=module - "$COORD/increment-1/src/exporter.mjs" <<'NODE'
import assert from 'node:assert/strict';
import {readFileSync, writeFileSync} from 'node:fs';
const path = process.argv[2];
const source = readFileSync(path, 'utf8');
assert.ok(source.includes('  formatVersion = 1,'), 'Expected reference default');
writeFileSync(path, source.replace('  formatVersion = 1,', '  formatVersion = 2,'));
NODE
```

Read the resulting exporter. The first increment now has a real decision in
code, not only a proposed task. If you prefer an independent implementation,
start a separate fresh copy from the baseline and implement A1–A4 there; do not
copy the answer over your attempt. The same acceptance reasoning applies, and
your record must distinguish your implementation from the prepared route.

### Check the increment and its intended reader — shell block 3

This command calls the real producer and both real reader modules. It checks
specific rows, not merely that an array exists. The integration owner should
inspect the source and results before accepting the local increment.

```sh
node --input-type=module - "$COORD/increment-1" <<'NODE'
import assert from 'node:assert/strict';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const root = process.argv[2];
const {exportTickets} = await import(pathToFileURL(join(root, 'src/exporter.mjs')));
const {readV1} = await import(pathToFileURL(join(root, 'src/consumer-v1.mjs')));
const {readV2} = await import(pathToFileURL(join(root, 'src/consumer-v2.mjs')));
const report = await exportTickets();
assert.equal(report.formatVersion, 2);
assert.ok(Number.isFinite(Date.parse(report.generatedAt)));
assert.deepEqual(report.rows, [
  {id: 'T-03', status: 'closed', owner: 'Mira'},
  {id: 'T-09', status: 'open', owner: 'unassigned'},
  {id: 'T-20', status: 'paused', owner: 'unassigned'},
]);
assert.deepEqual(readV2(report), {open: 1, closed: 1, paused: 1});
assert.throws(() => readV1(report), /Unsupported format/);
console.log('Increment 1: default v2; upgraded reader accepts; old reader rejects.');
NODE
```

Expect exit 0 and the printed conclusion only if all assertions succeed. Record
that result with the candidate directory and changed source. This is real local
producer/reader evidence, not evidence of a deployed route. The reader was
already supplied; choosing and exercising its use is the integration work here.

### Inspect the displaced baseline contract — shell block 4

Keep the original baseline assertions and run them against the first increment.
Do not regenerate them from its output or delete them to get a green summary.

```sh
node --test "$COORD/increment-1/tests/baseline.test.mjs"
printf 'Displaced-baseline exit: %s\n' "$?"
```

**Expected red:** three failures, command exit 1. The old row expectation calls
`T-20` open, the old version expectation requires v1, and the old reader rejects
the v2 report. These are the intended contract differences under Packet A, not
missing imports or a broken setup. Running the block in an ordinary interactive
shell lets you read the nonzero exit without stopping the whole exercise.

This does not authorize a blanket “the old tests are obsolete.” Each failure has
to map to an approved change. Owner handling, sorting and unknown-state mapping
remain required. The first increment's specific assertions preserve those
behaviors even though the combined old row assertion now fails.

**Stop here before Packet B.** The learner must have a delivered candidate,
actual command outcomes, the default-version decision and pending-work ownership
recorded. Otherwise there is no implemented decision to replan.

### Packet B — changed requirement after the increment

The requirement owner now changes the brief:

> The old reporting use must remain available through its existing no-argument
> `exportTickets()` call and unchanged `readV1` reader. Do not ask its owner to
> upgrade this cycle. Paused counts are still required for the new reporting use,
> which may explicitly request v2 and use `readV2`. Preserve the first increment
> for review, but do not accept it as the revised final candidate.

This introduces a real constraint, not merely a new documentation format. The
same no-argument producer call cannot default to v2 for one unchanged reader and
v1 for another without an explicit selection point. There is no routing layer in
this source; adding one would evade the exercise and widen scope.

| ID | Revised acceptance, replacing conflicting Packet A expectations |
| --- | --- |
| B1 | No-argument export remains v1; the unchanged old reader still counts two open and one closed ticket. |
| B2 | `exportTickets({formatVersion: 2})` produces the paused `T-20` report; `readV2` counts one open, one closed and one paused ticket. |
| B3 | Existing owner/order/timestamp behavior remains intact. Unknown `MYSTERY` remains open in both paths. |
| B4 | The old reader still rejects v2. The new use, not a weakened old reader or mislabeled report, owns explicit selection. |
| B5 | Accept the combined local change only after B1–B4 hold on the revised candidate. No production rollout, queued artifact or recovery claim is implied. |

Before reading the response below, identify **decisions, code, checks and pending
work** made stale by this packet. Explain what you will retain. Then revise the
order and ownership, and state whether to continue, defer or stop. “Update the
plan” without named consequences is not an answer.

A prompt for this stage is:

```text
Pause dependent work. Compare Packet B with Packet A and the delivered increment.
Identify invalidated decisions, code, checks and pending work; distinguish them
from behavior worth retaining. Revise ownership, order and whole-change evidence.
Do not edit until the revised approach is agreed. Do not erase historical results
or claim that an old passing check proves the new requirement.
```

#### Worked response: impact and replanning

The v2-default decision depended on retiring the old use. Packet B removes that
permission, so the default `formatVersion = 2` in `increment-1/src/exporter.mjs`
must change. The existing explicit-v2 mapping is still useful. No change to
`consumer-v1.mjs`, the fixture, owner fallback or sorting is justified.

The shell-block-3 assertion that a no-argument call is v2 is now stale as an
acceptance expectation. Its observed pass remains a truthful historical result
for Packet A and increment 1. The old baseline failures now indicate a blocker,
not an approved displacement. They should pass again after the revised default.
The explicit-v2 paused rows and upgraded-reader count remain needed, but must be
exercised through explicit selection on the revised candidate.

Cancel the pending retirement of the old reader. The producer owner restores
default v1 in a new candidate while retaining explicit v2. The new-use owner
verifies the explicit call and upgraded reader; the old-use reviewer verifies the
unchanged call with `readV1`. The integrator waits for both results, inspects the
combined candidate and accepts only that local scope. The fixture is small enough
that serial implementation and combined verification are simpler than parallel
writers. An independent read-only check of the revised acceptance record remains
possible, but adds no authority to ship.

This is a proportionate replan: retain the useful first-increment behavior, undo
one invalidated default, revise its affected check and replace obsolete pending
work. It is not a restart of every discovery step or an excuse to build routing
infrastructure.

### Prepare the revised candidate — shell block 5

The existing completed reference already implements the revised producer
contract. Copy it into a new stage so the first increment and its failures remain
available. In an independent implementation route, make the equivalent minimal
default correction in your own new candidate instead.

```sh
cp -R "$COORD/increment-1" "$COORD/revised"
cp demo/section-08-legacy/reference/completed-exporter.mjs "$COORD/revised/src/exporter.mjs"
node --test "$COORD/revised/tests/baseline.test.mjs"
```

Expect three baseline assertions to pass again. This restores evidence for the
old path, but says nothing by itself about the new explicit-v2 use. Do not stop
at this green result and call the whole revised change accepted.

### Verify the combined revised change — shell block 6

```sh
node --input-type=module - "$COORD/revised" <<'NODE'
import assert from 'node:assert/strict';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const root = process.argv[2];
const {exportTickets} = await import(pathToFileURL(join(root, 'src/exporter.mjs')));
const {readV1} = await import(pathToFileURL(join(root, 'src/consumer-v1.mjs')));
const {readV2} = await import(pathToFileURL(join(root, 'src/consumer-v2.mjs')));
const oldReport = await exportTickets();
assert.equal(oldReport.formatVersion, 1);
assert.deepEqual(readV1(oldReport), {open: 2, closed: 1});
const newReport = await exportTickets({formatVersion: 2});
assert.equal(newReport.formatVersion, 2);
assert.ok(Number.isFinite(Date.parse(newReport.generatedAt)));
assert.deepEqual(newReport.rows, [
  {id: 'T-03', status: 'closed', owner: 'Mira'},
  {id: 'T-09', status: 'open', owner: 'unassigned'},
  {id: 'T-20', status: 'paused', owner: 'unassigned'},
]);
assert.deepEqual(readV2(newReport), {open: 1, closed: 1, paused: 1});
assert.throws(() => readV1(newReport), /Unsupported format/);
console.log('Revised integration: old default-v1 path and explicit-v2 path accepted locally.');
NODE
```

Expect exit 0 and the printed local conclusion only after all assertions pass.
The negative assertion establishes that the old reader still rejects an
unsupported report. It does not make that combination a supported delivery path.
The tests and inline checks are focused evidence for this coordination case;
section 8 separately teaches broader characterization and the consumer matrix.

## Use at work

### Accept, defer or stop

Write an actual disposition using the observed results, not the expected results
above. An authored worked disposition would be: “If the revised baseline and
integration checks pass and the diff matches Packet B, accept the revised local
candidate. Retain the first increment as historical evidence, not the delivered
default. Defer old-reader retirement because the new requirement forbids it.
Deployment remains unperformed because the example has no deployment mechanism.”

Now challenge the conclusion with a final, **non-implementation** question:

> What if the owner also forbids an explicit version argument on the new call,
> keeps the old reader unchanged, and requires paused data from that same ordinary
> call to be accepted by both readers?

The current contract cannot satisfy that combination. Stop the dependent work
and ask the owner to change one constraint. Do not relabel paused as v1, remove
reader validation or invent an unseen routing service. This decision is assessed
by the contradiction and evidence you can explain, not by whether every item in
a tracker says “done.”

### Test continuity with a fresh reader

Update your existing [section 5 handoff](section-05-context-and-handoff.md). Link
Packet B as current intent, identify the revised candidate, preserve the first
increment's history and record actual evidence and remaining limits. Include
which old work was cancelled or deferred and who owns the new explicit call.
Do not create a second handoff template or copy the requirements into several
competing authoritative notes.

Give the record to a fresh human reader or an authorized fresh OMP session.
Before editing, ask them to locate the correct candidate, explain why no-argument
v2 is obsolete, name the next unperformed action and distinguish local acceptance
from deployment. They must inspect the current files and results rather than
trusting the note alone. Choosing `increment-1` as current work reveals a stale
record. Merely reopening a session does not establish successful continuity.

If you did not perform this exchange, mark continuity untested. A solo prepared
run can still establish the local commands and support an impact analysis; it
cannot claim another reader understood the handoff. Preserve useful temporary
files before closing the exercise. No command here deletes your work.

### Assessment: five connected decisions

| Area | Evidence the learner must show | A response that is insufficient |
| --- | --- | --- |
| Intent | Packet A's outcome, exclusions, accepted default and the assumption behind it; Packet B's changed constraint | A generic “upgrade reports” task list |
| Approach and order | The real producer/reader dependency and why its risk is checked before combined acceptance | Splitting by file count or creating arbitrary parallel tickets |
| Ownership | Requirement authority, producer and consumer-use boundaries, one integration owner and explicit handling of dependent work | “The agents coordinate” without a responsible integrator |
| Evidence | Actual baseline, first-increment and revised results tied to their candidates; combined calls plus preserved behavior | Expected outputs copied as observed results, or green producer checks alone |
| Change | Named stale decision, code, check and pending work; retained useful behavior; justified accept/defer/stop disposition | Rewording a plan while leaving the v2 default or old expectations active |

The worked answer is one valid response to the supplied constraints, not a
required folder structure. An honest blocker or stop can be correct. A claim of
completed implementation without an executed first increment does not meet the
core exercise; reading the packet remains a labelled preparation route.

## Go deeper

### Optional framework comparison

Only do this if you want to compare a recurring coordination problem, not to earn
extra completion credit. Keep the same packets, candidate and observed evidence
for every route. Do not give a framework additional facts and credit it for
finding a problem withheld from the plain note.

**Plain record:** the note you already maintained can express the current
contract, proposal, decision, dependency and evidence. If a fresh reviewer can
find Packet B and the revised candidate, it is a serious baseline, not a weak
control group.

**FSAD-style discussion:** use collaborative discovery, specification and planning
to surface the incompatible expectations before dependent work. In an authored
example, the reporting owner says, “Paused counts still matter”; the old-use
owner says, “Our no-argument v1 path cannot change”; engineering responds,
“Then default v2 is invalidated, but explicit v2 retains the useful increment.”
The resulting decision belongs in the maintained note. Simulating these roles
with one agent does not establish stakeholder agreement, and the discussion
alone is not evidence that code changed.

**OpenSpec-shaped current/proposed separation:** a current-contract record would
state that ordinary exports are v1. Packet A proposes modifying that default to
v2. A local candidate and passing checks do not automatically make it the shipped
current contract. Packet B supersedes the proposed default change while retaining
an added explicit-v2 behavior. A compact delta might say:

```text
Current: No-argument exports remain v1 and are consumed by readV1.
Superseded proposal: Make every ordinary export v2 and retire the old use.
Revised proposal: Preserve the default; add explicit v2 for the upgraded use.
Scenario: No argument -> v1 -> readV1 counts open 2, closed 1.
Scenario: Explicit v2 -> readV2 counts open 1, closed 1, paused 1.
Status: Proposal until the recorded candidate's checks and review justify acceptance.
```

These are teaching artifacts, not installed files or a CLI-validated OpenSpec
project. The useful distinction is current versus proposed behavior and the
history of a changed decision, not the presence of `openspec/` directories.
Archive/sync actions should reflect accepted work rather than manufacture a tidy
ending for an unfinished change.

Compare a concrete benefit: did a discussion expose a conflict earlier, or did a
separate proposed delta stop a reviewer treating increment 1 as current? Also
name the upkeep: duplicate requirements, extra reading and responsibility for
removing superseded decisions. Keep one canonical record even if you borrow
both practices. A framework validator can check artifact structure, not prove
that the old consumer still works.

### Sources and adaptation

- The source table above links the actual exporter, adapter, fixture, readers and
  prepared reference used by the executable route. No course source is changed.
  All staged requirements and worked decisions are course-authored.
- [Node's test-runner reference](https://nodejs.org/api/test.html#running-tests-from-the-command-line)
  documents the built-in runner. Inline assertions call the real copied modules;
  they do not substitute a fake producer or consumer.
- [FSAD workflow](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/workflow)
  and [comparison](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/comparison)
  support the optional methodology discussion, not measured productivity claims.
- [OpenSpec concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
  supports current/proposed separation and deltas. Its
  [supported-tools reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)
  is optional integration reading; no framework is installed or invoked here.
- The earlier owner-search material under `section-07-examples/` is historical,
  not an active dependency or a second source of this exercise's requirements.

[Back to section 7](../sections/07-planning-and-coordinating-larger-changes.md) · [Next: independent advanced routes](section-08-harness-and-enterprise-lab.md)
