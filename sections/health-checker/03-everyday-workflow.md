# 3. The everyday workflow

**Practical core.** Take a small request from an incomplete sentence to a change you can explain, run, and review. You will extend the health checker you built in section 1 from one URL to a validated list of URLs. The checker stays deliberately small: one process, sequential requests, local fixture data, and exit codes that a caller can use.

This is a course-authored exercise. It is not a prepared implementation and it is not a provider-backed rehearsal. Bring the program you actually wrote, its real run command, and its current tests.

## Understand

### Six decisions, not six compulsory prompts

| Stage | Question | Useful result |
| --- | --- | --- |
| Explore | What happens now, and where? | The current entry point, request path, output, checks, and unknowns. |
| Specify | What should change, and what must remain true? | Observable examples, validation boundaries, and decisions. |
| Plan | What is the smallest coherent route? | A short sequence connecting edits to checks. |
| Implement | Can the change stay inside that route? | Focused code with no unrelated refactor. |
| Verify | What did we observe on this code state? | Actual results for passes, failures, and invalid input. |
| Review | Does the result deserve acceptance? | A decision tied to the request, diff, and evidence. |

These are thinking stages, not six required prompts. A familiar change may fit in
one request. An unfamiliar change benefits from an inspection-only turn. If a
check contradicts an assumption, return to exploration or specification instead of
repeating the same command.

<figure class="course-diagram">
<a href="/diagrams/workflow.svg"><img src="/diagrams/workflow.svg" alt="Engineering workflow: understand, specify, plan, execute, and verify. Accept when evidence meets the request; otherwise return to the decision or implementation that needs revision." /></a>
<figcaption>Verification can send you back. These are decisions to make, not a requirement to send six separate prompts. Open the diagram for a full-size view.</figcaption>
</figure>

### The shared fixture is the boundary

Read the [health-checker fixture guide](../../demo/health-checker/README.md) before
writing examples. Start the fixture from the **course root**, in a separate
terminal, and leave it running while you work:

```sh
bun demo/health-checker/server.mjs
```

It listens at `http://127.0.0.1:4175`. The guide is the source of truth for the
routes. The six baseline checks below are intentionally deterministic:

| Route | Response | Result with the common expectation |
| --- | --- | --- |
| `/healthy` | 200 and `Workshop service ready` | pass |
| `/wrong-body` | 200 and `Maintenance in progress` | fail: text mismatch |
| `/missing` | 404 | fail: status mismatch |
| `/error` | 500 | fail: status mismatch |
| `/redirect` | 302 with `Location: /healthy` | fail: status mismatch; do not follow |
| `/slow` | 200 after a 2,000 ms delay | fail: timeout at 1,000 ms |

A timeout is a transport/check failure, not an invented HTTP status. Do not claim
that `/slow` returned 408 or 504 unless your program actually received that status
from a server. The fixture is local synthetic data, not a production monitor.

### Outcome, implementation, and evidence are different

“The list reports six independent checks” is the outcome. “Use an array and a
for-loop” is an implementation choice. “This run reported one pass and five
failures from the six fixture routes” is evidence tied to one code state and one
configuration. A tidy implementation of the wrong timeout or redirect policy is
still wrong. A passing test that never reaches the new path proves nothing about it.

## Practical prompting techniques

A useful prompt makes four things visible:

| Part | Health-check example |
| --- | --- |
| **Goal** | Extend the one-target checker to report independent results for a list of targets. |
| **Context** | The current entry point, real run command, existing checks, and the actual path to the fixture guide in the separate course checkout. |
| **Constraints** | Prevalidate the whole JSON array, run valid targets sequentially, keep redirects disabled, and do not add retries, concurrency, or dependencies. |
| **Done when** | `/wrong-body` reports observed status `200` plus a text mismatch; an invalid later config entry exits `2` before any target request; valid later targets still run after a failure. |

This is a checklist, not a form to fill out every time. Add the parts that could
change the result. A short wording correction may need only a direct request; this
extension needs examples because status, body, ordering, and validation are easy to
interpret differently.

### Weak versus bounded

**Weak:**  
`Make the checker support multiple URLs and make it production ready.`

**Stronger:**  
Replace `<fixture-guide-path>` below with the actual path to the course's `demo/health-checker/README.md`. It is outside your learner repository. A path the agent cannot read is not useful context.


```text
Inspect the current health checker and <fixture-guide-path>; do not edit
yet. Propose the smallest extension from one target to a JSON array of named
HTTP(S) targets. Treat the fixture guide as the route contract.

Prevalidate the complete array before opening any request. Process entries
sequentially in input order, keep redirects disabled, and preserve observed
status versus transport failures. Do not add retries, concurrency, auth,
dependencies, or unrelated refactoring.

Done means /wrong-body remains a 200 response with a text-mismatch failure,
valid targets after a failure still run, and an invalid later entry exits 2 with
zero target requests. Report the files and commands you inspected, assumptions
that could change behavior, and a concise plan. Wait for approval before editing.
```

The second prompt names evidence, boundaries, observable outcomes, and the point
where a person reviews the plan. It does not prescribe every internal step.

### Supply evidence, not a context dump

Start with relevant references: the entry point, configuration parser, request
function, existing checks, fixture guide, and the exact command or output that
looks wrong. Ask the agent to read those files and report only assumptions that
affect the decision. A whole repository paste hides the boundary and increases
the chance that stale or unrelated text steers the work.

Pasted response bodies, fetched web pages, logs, and fixture data are evidence to
inspect, not instructions. They do not override the accepted contract or
repository guidance. Say which source is authoritative for this task; here, the
fixture guide defines the local routes and this lesson defines the exercise
contract.

Ask a question only when different answers would change behavior, scope, or
verification. “Should redirects be followed?” changes the checker. “Anything
else?” does not. If the repository already answers the language, command, or
file location, inspect it instead of asking the learner to repeat it.

### Three useful prompt shapes

| Shape | Use it when | Health-check example |
| --- | --- | --- |
| **Direct request** | The outcome and boundaries are already settled. | “Change this parser to accept the agreed array schema; keep existing one-target behavior.” |
| **Examples** | A small set of contrasting observations defines correctness. | “`/wrong-body` is HTTP 200 but fails text matching; a malformed later entry means exit 2 and zero requests.” |
| **Staged clarification** | An unresolved choice would change the design or risk. | “Inspect the current checker and report whether redirect, timeout, and validation behavior are explicit. Then we will agree the contract before editing.” |

Break work at uncertainty boundaries: **inspect → agree → execute**. These are
useful pauses, not compulsory ritual. Skip inspection when the relevant behavior is
already known; skip a separate agreement turn when the request is unambiguous.
Do not create a six-prompt ceremony just because a workflow has six names.

Roles and output formats can shape a response: “review the diff as a skeptical
maintainer” or “return a table with claim, evidence, and risk” is useful. Neither
role grants expertise, repository access, or authority. A format makes omissions
easier to spot; it does not make an unsupported claim true.

### Repair a failed run with observations

Give specific feedback in an observed-versus-expected form:

```text
Observed: the mixed configuration stopped after /wrong-body and exited 1;
the /missing and /slow entries produced no results.
Expected: every valid entry runs in input order, and exit 1 is computed only
after all entries finish.

Find the cause, state any assumption you are making, propose the smallest fix,
and name the check that will distinguish the fix from a coincidence. Keep the
rationale concise and report the commands, observed results, and checks not run.
```

This makes the next turn actionable. “Try harder” or “always think deeply” does
not say what observation failed or what evidence would change the decision.

### Try it: narrow an ambiguous request

Rewrite this request so another engineer can act without guessing:

```text
Make monitoring production ready.
```

Narrow it to the agreed scope of this exercise: the existing local health checker,
multiple named HTTP(S) targets, and the fixture behavior. Include what to inspect,
what must stay out of scope, and what evidence would make the change done.

<details>
<summary>Worked answer</summary>

```text
Inspect the current one-target health checker, its existing checks, and
<fixture-guide-path>. Do not edit yet; report the real entry point,
configuration format, run/test commands, and any behavior that is currently
ambiguous.

We are agreeing only on this bounded extension: one JSON array of named HTTP(S)
targets, complete validation before the first request, sequential requests in
input order, redirects disabled, and independent result reporting. Preserve the
current one-target behavior where it remains valid. Exit 0 means all targets
pass, 1 means valid input with at least one failed target, and 2 means invalid
configuration. Do not add retries, concurrency, authentication, cookies,
dependencies, or deployment work.

After the contract is confirmed, implement the smallest focused change. Done
means the mixed fixture run reports one pass and five failures, later valid
targets still run after a failure, `/slow` is a timeout without an invented HTTP
status, and an invalid later entry exits 2 before any target request. Report the
actual commands, observed results, assumptions, and checks not run.
```

</details>

The answer turns “production ready” into a reviewable local contract. Real
production monitoring may require a separate decision about ownership, secrets,
alerting, rollout, and authorized endpoints; do not smuggle those requirements
into this exercise.


## Watch or try

### 1. Establish the real starting point

Do not replace these placeholders with a language chosen by the lesson. First find
your own invocation and inspect the files that actually exist:

```text
Inspect the health checker I wrote in section 1. Do not edit yet.
Find the real entry point, configuration/input format, request code, timeout and
exit-code handling. Read the repository guidance and the existing checks. Report
the exact run/test commands you found, the current one-URL behavior, and any
assumption that would change a multi-target design. Do not list unrelated files.
```

Record the command and working directory. Run your existing one-target check against
`/healthy`, then the other five routes, using the same expected status, text, and
1,000 ms timeout. Replace `<your command>` with your actual language-specific
command; do not assume `node`, `bun`, `python`, or a package script exists:

```sh
<your command> <one-target-input-for-/healthy>
<your command> <one-target-input-for-/wrong-body>
<your command> <one-target-input-for-/missing>
<your command> <one-target-input-for-/error>
<your command> <one-target-input-for-/redirect>
<your command> <one-target-input-for-/slow>
```

The expected observations are not a copied test result. They are the acceptance
shape you should compare with your actual output: only `/healthy` passes; the
redirect is not followed; `/slow` times out without a fabricated HTTP status; each
completed check reports its observed status when a response exists, a match/pass-or-
fail decision, a reason, and elapsed milliseconds. If your current one-target tool
cannot express this contract, record the gap before planning the extension.

### 2. Write a short specification before changing code

Use this contract for the extension. Keep the first-check behavior intact, then add
multiple targets with one configuration document. Each entry has **exactly** these
keys:

```json
{
  "name": "healthy",
  "url": "http://127.0.0.1:4175/healthy",
  "expectedStatus": 200,
  "expectedText": "Workshop service ready",
  "timeoutMs": 1000
}
```

The full configuration is a JSON array. `name` is a nonempty unique string. `url`
is an HTTP(S) URL. `expectedStatus` is an integer from 100 through 599.
`expectedText` is a nonempty string. `timeoutMs` is a positive integer. The whole
configuration must be validated before the first request. An empty array is invalid.

A concrete mixed-result configuration:

```json
[
  {"name":"healthy","url":"http://127.0.0.1:4175/healthy","expectedStatus":200,"expectedText":"Workshop service ready","timeoutMs":1000},
  {"name":"wrong-body","url":"http://127.0.0.1:4175/wrong-body","expectedStatus":200,"expectedText":"Workshop service ready","timeoutMs":1000},
  {"name":"missing","url":"http://127.0.0.1:4175/missing","expectedStatus":200,"expectedText":"Workshop service ready","timeoutMs":1000},
  {"name":"error","url":"http://127.0.0.1:4175/error","expectedStatus":200,"expectedText":"Workshop service ready","timeoutMs":1000},
  {"name":"redirect","url":"http://127.0.0.1:4175/redirect","expectedStatus":200,"expectedText":"Workshop service ready","timeoutMs":1000},
  {"name":"slow","url":"http://127.0.0.1:4175/slow","expectedStatus":200,"expectedText":"Workshop service ready","timeoutMs":1000}
]
```

The checker processes entries sequentially. A failed target does not skip later
valid targets. Exit `0` means every target passed; exit `1` means the configuration
was valid and at least one target failed; exit `2` means invalid input/configuration.
No retries, concurrency, authentication, cookies, or redirect following belong in
this slice. Only local or owned/authorized endpoints are appropriate.

Before editing, ask an agent or a peer to challenge the examples:

```text
Review this multi-target health-check specification against the fixture guide and
my current one-target program. Find contradictions, missing observable behavior,
or scope that would change the design. Pay special attention to whole-config
prevalidation, redirect handling, timeout meaning, independent later targets, and
exit codes. Do not edit or invent a provider-backed run.
```

### 3. Review a flawed plan

Here is a deliberately flawed proposal. Mark each problem before you write your own
plan:

1. Start one asynchronous request per target so the checker is “ready for scale.”
2. Follow redirects so `/redirect` gets the healthy body.
3. Validate each target immediately before requesting it; stop at the first invalid one.
4. Convert a timeout into status 504 so every result has an HTTP status.
5. Add a monitoring dependency and rewrite the current one-target path around it.

The proposal violates the contract in five different ways: concurrent requests
remove deterministic sequence; redirect following changes the required observation;
partial validation can make a malformed later entry trigger network work; 504 is not
an observed response; and dependency/refactor work is unrelated. A short plan that
fits this task is:

1. Find the current input/configuration boundary and preserve the existing one-target
   request behavior where it remains valid.
2. Parse and validate the complete array, including duplicate names and an empty
   array, before opening any request.
3. Run validated entries in input order, with redirects disabled, a request-plus-body
   timeout, monotonic elapsed timing, and independent result reporting.
4. Aggregate the specified exit code without hiding per-target results or changing
   unrelated commands and files.
5. Run the existing checks and deterministic fixture scenarios, then review the diff.

Ask for a plan like this, not a framework migration:

```text
Propose the smallest implementation plan for the reviewed health-check contract.
Name the actual files and the real run/test commands you found. Explain where whole
configuration validation happens, how sequential requests preserve order, how a
failure still permits later valid targets, and how you will check exit codes.
Do not add dependencies, retries, redirect following, concurrency, or unrelated
refactoring. Do not implement yet.
```

### 4. Implement one coherent slice

Once the plan is accepted, authorize the change against your actual repository:

```text
Implement the reviewed multi-target health-check plan in this repository.
Use the fixture guide as the source of endpoint behavior and keep the current
runtime/language. Prevalidate the complete JSON array before any request. Process
valid targets sequentially, do not follow redirects, measure request-plus-body time
with a monotonic clock, and report observed status only when a response exists.
Preserve the exact result fields, reasons, and exit-code contract we agreed.
Update only checks and guidance that directly cover this behavior. Add no dependency,
retry, concurrency, authentication, cookie, provider call, or unrelated refactor.
Run only the repository's existing relevant checks and report their actual command,
working directory, result, and unrun checks. Stop if the scope must widen.
```

Use the implementation you actually get. Do not paste a fictional solution from this
lesson. If your language/runtime already handles one requirement correctly, prove it
with a focused check instead of changing working code to manufacture a failure.

## Verify

### Deterministic scenarios

Run the real command against the concrete configuration after implementation. The
mixed fixture configuration must produce five completed failures and one pass,
regardless of output formatting. It must still attempt the later entries after
`/wrong-body`, `/missing`, `/error`, and `/redirect`; inspect the named result order
and reasons. The `/slow` result must be a timeout/transport failure, not a made-up
status.
Then run smaller scenarios:

- `[healthy]` exits `0` and reports a text match.
- `[error]` exits `1` and reports status 500 without treating the body as healthy.
- `[wrong-body]` exits `1`, reports status 200, and reports a text mismatch.
- `[missing]` exits `1`, reports status 404, and does not report a text match as if the status passed.
- `[redirect]` exits `1`, reports status 302, and does not make a second `/healthy` request.
- `[slow]` exits `1` after its 1,000 ms timeout; elapsed time is reported but not asserted to an exact value.
- An empty array, duplicate names, an empty expected text, status 99 or 600, a non-positive/non-integer timeout, a non-HTTP(S) URL, or an extra object key exits `2` before target results are emitted.

For the last case, use one invalid entry alongside a valid fixture entry. The
observable requirement is exit `2` and no target results from a partially executed
configuration. The fixture intentionally has no request log; do not claim you proved
network absence from server output. Code inspection or a local runtime trace may be
additional evidence, labelled as such.

Use a result table tied to your actual run:

| Claim | Evidence to record | A plausible mistake it catches |
| --- | --- | --- |
| Whole config is valid before requests | invalid input run, exit `2`, plus validation-order inspection or captured request calls | partial validation and accidental network work; no output alone is insufficient proof |
| Order and independence hold | mixed run, all named results in input order | stop-on-first-failure or concurrent reordering |
| HTTP semantics are preserved | status/text results for wrong body, missing, error, redirect | body-only checks or redirect following |
| Timeout is honest | slow run with timeout reason and no invented status | treating transport failure as HTTP response |
| Exit codes are usable | separate all-pass, any-fail, invalid runs | one generic nonzero code or swallowed failure |
| Scope stayed focused | `git diff` and status from your real repository | dependency churn and unrelated refactoring |

Do not assert exact milliseconds. A monotonic duration is evidence that a check was
timed; local scheduling makes a precise value unstable. Do not call the implementation
ready if the relevant scenario could not run; mark it not checked and name the next
executable action.

### Review the request, diff, and evidence together

```text
Review my final health-checker change against the fixture guide and the accepted
multi-target examples. Focus on prevalidation, exact schema, sequential order,
redirects, timeout/error distinctions, status reporting, exit codes, and scope.
For each finding give the observable consequence and a reproducing input. Separate
real defects from optional future ideas. Compare claims with the actual commands and
code state; do not call an unrun check passed.
```

Accept only when the requested behavior is demonstrated, existing one-target
behavior remains correct, the diff is focused, and remaining uncertainty is explicit.
A green language test suite that never starts the fixture is not evidence for the
HTTP scenarios. A source-code inference is not an interaction result.

## Use at work

Scale the pauses with uncertainty. A wording correction may need one inspection and
one check. This health checker needs a short specification because status, body,
timeout, redirect, ordering, and exit code all have plausible wrong interpretations.
A production checker would also require ownership, authentication, rate limits,
secret handling, observability, and rollout decisions; none belong in this local
exercise by implication.

Leave a handoff another engineer can use:

```text
Goal and authorized scope:
Accepted contract/source:
Repository, revision, and dirty-work state:
Changed files and why:
Actual commands, working directory, and observed results:
Checks not run:
Known limitations or hypotheses:
Next action or decision needed:
```

Transfer the method, not the fixture's architecture: inspect the real program, write
examples that distinguish wrong behavior, plan the smallest coherent slice, run
observable checks, and review the claim against evidence. Keep one canonical contract
in the fixture guide; link to it rather than copying a second competing specification.

## Go deeper

If you want one bounded extension, add an explicit output format for machine readers
only after the current human-readable contract is accepted. Keep the same per-target
semantics and exit codes. Do not add retries or concurrency until a new requirement
states their ordering, timeout, cancellation, and evidence rules.

The next section uses this actual program and its evidence to practice selecting
repository context, writing durable guidance, repairing a stale handoff, and resuming
without trusting a summary blindly.

### Sources and adaptation

- [Health-checker fixture guide](../../demo/health-checker/README.md) — canonical local routes and checker contract.
- [OMP context-file documentation, 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md) — primary source for project guidance discovery; verify against the installed `omp --version`.
- [OMP approval-mode documentation, 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md) — approval is not a network or filesystem sandbox; prompts in this lesson are scope requests, not enforcement.
- [Anthropic, Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) — official guidance covering clear instructions, relevant examples, context, roles, and output formats.
- [OpenAI, Codex prompting](https://developers.openai.com/codex/prompting) — official prompting guidance on goals, context, outputs, boundaries, and follow-up refinement.
- [Focus on key examples — Gojko Adzic](https://gojko.net/2014/05/05/focus-on-key-examples/) — why a few revealing examples beat an exhaustive list.
- [Red/green TDD — Simon Willison](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) — use a failing behavior check to test the check itself, then implement.

[Previous: Foundations](02-foundations.md) · [Next: Context and repository knowledge](04-context-and-repository-knowledge.md)
