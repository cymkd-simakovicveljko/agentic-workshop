# 7. Optional flavors: one requirement, three records

**Main outcome:** compare three ways to make one small change explicit without
mistaking a document shape for a working feature. You will use the same bounded
requirement throughout:

> Add an optional JSON report beside the health checker's existing text output.
> Keep the old invocation and exit statuses unchanged.

This lesson is about choosing structure because it fixes a recurring problem, not
because a framework name is fashionable. Plain OMP, an FSAD-style discussion and
an OpenSpec-shaped change are **course adaptations**. We do not install or claim
to execute those frameworks here.

## Before you choose a flavor

Start from the learner checker you built in sections 1–6. The shared fixture is
started from the course root, in a separate terminal:

```sh
bun demo/health-checker/server.mjs
```

It listens on `127.0.0.1:4175`. Keep the fixture process separate from the
learner's checker repository. Read the [fixture README](../../demo/health-checker/README.md)
for the route list. Do not edit the fixture to make a check pass, and do not send
requests to an endpoint you do not own or have permission to test.

This extension applies to the **single-URL invocation** from section 1. The multi-target command from section 3 must still work unchanged without the new flag. Passing the new report flag to batch mode is invalid input for this exercise: exit `2` before requests and leave the destination untouched. A batch report is a separate possible requirement.

Keep the single-URL rules: expected status `200`, literal text `Workshop service ready`, a `1000ms` request-plus-body deadline, no redirects, and the original exit codes. Use the [fixture contract](../../demo/health-checker/README.md#canonical-checker-contract) rather than inventing new networking behavior.

The extension in this lesson adds an optional report file. A command without the
new option must retain its old text and exit behavior. With the option, it still
prints the text and writes a report in the following shape. This is an illustrative document, not recorded output; `18` is an example duration.

```json
{
  "schemaVersion": 1,
  "target": {
    "url": "http://127.0.0.1:4175/healthy",
    "expectedStatus": 200,
    "expectedText": "Workshop service ready",
    "timeoutMs": 1000
  },
  "result": {
    "outcome": "pass",
    "status": 200,
    "matched": true,
    "reason": "status and expected text matched",
    "elapsedMs": 18
  },
  "exitStatus": 0
}
```

`outcome` is `pass`, `fail`, or `invalid`. `status` is an integer `100..599`
when an HTTP response was received, otherwise `null`. `matched` is `true` or
`false` when a body was inspected, otherwise `null`. `reason` is a stable,
human-readable explanation. `elapsedMs` is a non-negative measured integer when
an attempt ran, otherwise `null`. `exitStatus` is exactly `0`, `1`, or `2`.
Do not put the entire response body in the report by default; a body can contain
secrets or instructions intended to mislead a reader.

For invalid target input, a successfully written report has `target: null`, `result.outcome: "invalid"`, null result status/match/elapsed fields, a validation reason, and `exitStatus: 2`. A valid target retains the object shown above. Missing or malformed report arguments fail before any request.

Use a **new report path**. Create the destination exclusively; never overwrite an existing file. If creation or writing fails, report the output error on stderr and exit `2`, without claiming the report was saved. Preserve existing files; remove only a partial file this invocation created. Successful report writing preserves the check's original exit status. This explicit output-error case avoids reporting success when a requested artifact is missing.

For compatibility comparisons, preserve labels, fields, order, stdout/stderr roles, and exit codes. Elapsed numbers naturally vary between real requests. Compare those as non-negative durations rather than byte-identical text; an exact snapshot needs a fixed test clock at a suitable seam.

The report is an output contract, not permission to add retries, concurrency,
authentication, cookies, redirect following or arbitrary query configuration.
Those remain out of scope.

## Understand: compare the layers, not the labels

All three routes can express the same acceptance examples. They differ in where
decisions live and how much maintenance they demand.

| Route | It is good at | Its risk | What it is here |
| --- | --- | --- | --- |
| Plain OMP | A short bounded request with repository context | Important decisions stay in chat unless copied out | An ordinary OMP prompt specimen |
| FSAD-style | Surfacing product, UX and engineering disagreement early | Role-play can look like agreement | An adapted live-spec worksheet |
| OpenSpec-shaped | Separating current behavior from a proposed change and tasks | More files can become stale ceremony | A Markdown change folder |

Do not compare one route after giving it more facts than the others. Feed each
route the same existing CLI observations, report schema and acceptance matrix.
For a tiny, already-agreed change, keeping the normal section 3 workflow is a
valid result.

### Route A — plain OMP, no new framework

The OMP host executes a bounded request; it does not decide the product contract
for you. From the learner checker repository, an approved OMP session may be
opened using the locally installed command. Check the installed version before
copying flags, and use the pinned [OMP 18.2.9 approval documentation](https://raw.githubusercontent.com/can1357/oh-my-pi/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)
for the meaning of approval modes. No provider call is required for this lesson;
the prompt below is a specimen for a paper exercise.

```text
Inspect the existing health checker and its observed CLI behavior. Add an
optional --report-json PATH output without changing the old invocation, text
output, HTTP rules, or exit statuses. Use the exact report schema below.

First list the current entry point, renderer, transport boundary, and callers.
Separate facts from proposals. Do not edit until the compatibility matrix is
clear. After implementation, run the local fixture cases and report each actual
command, exit status, output path, and observed result. Do not add retries,
redirect following, credentials, or external requests.
```

The useful artifact is not the prompt. It is the resulting decision record: the
old behavior, the new opt-in flag, the schema, the checks and any unresolved
risk. If the prompt is repeated next week, the engineer still needs those facts.

### Route B — FSAD-style live specification adaptation

FSAD's playbook describes phases that include intent/discovery, a live spec
session, implementation planning, execution and human review. Here we borrow only
the practice of making competing perspectives explicit. This is **not** an
official FSAD run, an OMP plugin or a claim that independent people agreed.

Write three short voices against the same brief:

```text
Product: A machine-readable result should feed a small dashboard without
breaking scripts that already use the text and exit code.

UX/operations: A report must say whether the server answered, whether text
matched, and why a timeout has no HTTP status. It should not copy arbitrary body
content into durable logs.

Engineering: The existing command is a consumer-facing interface. The new flag
must be opt-in, the JSON schema versioned, and the report written only after the
result is known. Invalid configuration must still exit 2 before any request.
```
 
For a concrete artifact comparison, save the voices as
`fsad-style/live-spec.md` and the resolved choice as
`fsad-style/decision.md`. Those filenames are course scaffolding, not official
FSAD commands. The acceptance check is whether a reader can find the default,
the compatibility constraint and the next implementation check without replaying
the conversation.

Resolve the disagreement in one decision note. For this lesson, choose:
`--report-json PATH` is optional; old text remains on stdout; the report contains
the fields above; successful report generation preserves exit `0/1/2`, while a
report-output error exits `2`. Record why raw bodies, silent status coercion, and overwriting existing files were rejected.

A solo learner can take each role in sequence. Mark it as role-play, then ask a
real reviewer about any product or operational decision that matters. A live
spec conversation can expose a missing requirement; it cannot grant authority
that the participants do not have.

### Route C — OpenSpec-shaped change, without OpenSpec installation

Use the familiar separation between current requirements and a proposed change.
The following is a shape for comparison, not official OpenSpec syntax and not a
claim that a validator was run:

```text
openspec/
  changes/add-json-report/
    proposal.md
    spec.md
    tasks.md
```

`proposal.md` records why scripts need structured output and why compatibility
matters. `spec.md` records scenarios. `tasks.md` connects implementation to
observable checks. Keep the current checker contract in the repository's normal
lesson notes; do not overwrite it with a future proposal.
 
The matching `proposal.md` can stay short:

```markdown
# Add an opt-in JSON report

Problem: scripts need structured results, but existing text and exit statuses
are already consumed.
Scope: add one report path and schema version 1; preserve the current request
rules and default invocation.
Non-goals: retries, redirects, concurrent targets, credentials, and raw-body
archival.
Acceptance: the six fixture routes produce the documented status/null and exit
observations, and the old command's output remains compatible apart from measured durations.
```

A role-play `live-spec.md` can link this decision to the product, operations and
engineering voices above. It should not repeat the schema in a second location;
the proposed `spec.md` remains the canonical acceptance record.


A realistic `spec.md` excerpt is:

```markdown
## Scenario: opt-in report preserves a passing invocation
GIVEN the learner runs the existing command with /healthy
WHEN --report-json report.json is added
THEN stdout keeps the existing text, report.json has schemaVersion 1,
     result.outcome is pass, status is 200, matched is true, and exit is 0

## Scenario: timeout is not an HTTP status
GIVEN the target is /slow and timeoutMs is 1000
WHEN the check completes
THEN outcome is fail, status is null, matched is null, reason identifies timeout,
     elapsedMs is measured, and exit is 1

## Scenario: invalid configuration makes no request
GIVEN the target URL uses the unsupported file: scheme
WHEN the command starts
THEN outcome is invalid, exit is 2, and the fixture receives no request
```

A compact `tasks.md` is enough:

```markdown
- [ ] Characterize old stdout and exit statuses on /healthy and /wrong-body.
- [ ] Add the opt-in report path at the existing result boundary.
- [ ] Preserve status/null and matched/null rules for transport and timeout.
- [ ] Run all six fixture routes and parse every generated report.
- [ ] Run the old command without the flag; compare text and exit codes, allowing measured durations to vary.
```

The value is the current/proposed distinction and traceable checks. The cost is
three files to maintain, plus the temptation to mark tasks complete from prose.
A passing document check never proves that the learner's program implements it.

## Watch or try: one learner experiment

The comparison above is a **conceptual paper exercise**. Do not report it as a
framework run. The following is the executed learner experiment; it uses only the
local fixture and the checker you already own.

1. Freeze a baseline record. Run the old command against `/healthy`,
   `/wrong-body`, `/missing`, `/error`, `/redirect`, and `/slow`. Capture stdout,
   stderr and exit status. Record the actual language-specific invocation; do not
   replace it with a Node command.
2. Choose one route above and write its decision/specimen artifacts beside your
   learner work. Label them `adapted`, not official framework output.
3. Implement the optional JSON report in the existing checker. Keep the old command
   path unchanged. Use the runtime's JSON library or an already-installed encoder;
   if neither exists, agree on the dependency rather than hand-writing JSON.
4. Run the new option on all six fixture routes, using a different unused report
   path for each run. Inspect every document with a real JSON parser or small assertion script.
5. Run the old command again without the flag, including the existing batch path. Compare
   text and exit statuses with the baseline, allowing measured durations to vary.

Expected observations:

| Route | Expected outcome | Status | Exit |
| --- | --- | ---: | ---: |
| `/healthy` | pass; text matches | 200 | 0 |
| `/wrong-body` | fail; text mismatch | 200 | 1 |
| `/missing` | fail; report observed status | 404 | 1 |
| `/error` | fail; report observed status | 500 | 1 |
| `/redirect` | fail; do not follow | 302 | 1 |
| `/slow` | fail; timeout has no invented status | null | 1 |

The exact elapsed values are intentionally not asserted. The report must show a measured non-negative value when a request ran. If `/slow` passes, investigate the timeout implementation and actual environment; do not dismiss it as ordinary timing variation. Also check invalid target input, a pre-existing report path, an unwritable destination, and a report flag combined with batch mode. Each must follow the explicit error rules above.

Acceptance is complete when a reviewer can see the old capture, the new reports,
the schema decision, and a command-by-command explanation of any difference.
Do not claim a provider-backed rehearsal, framework validation or external
network check.

## Use at work: choose the smallest structure that pays

Bring one real maintenance request and ask five questions:

1. Which decision is currently being lost: behavior, ownership, compatibility,
   or evidence?
2. Which one artifact will remain authoritative after implementation?
3. Which check would fail if the proposed behavior were accidentally omitted?
4. Who can reject an incompatible default or schema?
5. What will you delete when the experiment stops earning its maintenance cost?

Use plain OMP for a small, unambiguous change with a strong existing test path.
Use the FSAD-style discussion when product and engineering disagree about the
behavior. Use the OpenSpec-shaped record when reviewers repeatedly confuse
current and proposed requirements or when several people need a durable handoff.
Combining them is allowed, but choose one home for each fact; duplicated specs
drift.

## Go deeper: compare evidence, not document volume

Score each route from your actual experiment on four observations: decision clarity,
compatibility coverage, reviewer effort and stale-document risk. Do not turn the
scores into a benchmark; they are a local selection record. A useful conclusion
might be: “The live-spec adaptation exposed the exit-status constraint, while the
three-file change record was unnecessary for this one-person patch.”

Read the primary descriptions before treating names as commands: [OpenSpec
concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md) and
the [FSAD workflow](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/workflow).
Neither source makes these adaptations official OMP integrations. For OMP host,
approval and tool behavior, use the pinned [18.2.9 README](https://raw.githubusercontent.com/can1357/oh-my-pi/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md)
and [approval docs](https://raw.githubusercontent.com/can1357/oh-my-pi/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md),
then verify the local installation. Documentation is not runtime evidence.

[Previous: reliable execution](06-reliable-execution.md) · [Next: advanced engineering](08-advanced-engineering.md) · [Back to outline](../../OUTLINE.md)
