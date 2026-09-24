# Section 2 — agent-loop worksheet

## Understand

Explain a run, not another feature. Use the self-contained case below or your
section 1 transcript without switching branches or disturbing work. The prepared
route needs no OMP installation, provider account, repository or browser.

**Every event and number below is synthetic, invented for teaching.** This is a
sanitized conceptual request/response sequence, not captured OMP output, an API
payload, actual usage or a course-author execution receipt. Tool names describe
operations, not a required wire format. No headers, credentials, private source or
raw session exports are needed.

The accepted behavior is the remaining-task count: unfinished tasks only,
including zero; correct after add, complete, reopen and delete; consistent with
saved tasks after reload. Existing task behavior must remain intact. This supplies
an independent start even while the canonical `demo/todo-app` is unavailable.

## Watch or try

### 1. Annotate the request sequence

Treat each R row as exactly one provider request/response pair in this simplified
case. Each T row is one tool operation. Real systems may group or encode them
differently; use observed boundaries, not this numbering, on a real transcript.

| ID | Prepared event |
| --- | --- |
| U1 | User requests the accepted remaining-count behavior. No dependencies, unrelated features or commits are authorized. |
| R1 | Harness supplies task, applicable instructions and tool definitions. Model requests one source read and one read of available tests/scripts. |
| T1 | Source read returns current component/task logic: completion is stored as `done`. |
| T2 | Test/script read returns helper tests, a baseline browser scenario and `npm test` / `npm run test:e2e`. No existing assertion checks the new counter. |
| R2 | Harness supplies relevant earlier context plus T1/T2. Model says it will derive the count from unfinished tasks and check it, then requests one component edit. |
| T3 | Effective policy permits the edit. Result reports the component changed. Test files remain unchanged. No human approval prompt is recorded. |
| R3 | Harness supplies the edit result with relevant context. Model requests the two test commands. |
| T4 | `npm test` executes in the app directory. Existing task-helper assertions pass; these do not render or assert the counter. |
| T5 | `npm run test:e2e` executes in the same directory. The browser executable is unavailable; no app assertion runs. |
| R4 | Harness supplies T4/T5 with relevant history. Model replies: “All tests pass. The count updates correctly after add, complete, delete and reload. Ready to use.” |

Label each event as **intention**, **request/action**, **result** or **conclusion**.
An event can contain more than one. Then answer before reading the worked answer:

1. How many user turns, provider requests and tool calls are stipulated? Which
   request first receives repository evidence rather than only the task?
2. What does T3 prove? Does the absence of a human prompt identify the policy mode
   or mean nobody applied policy?
3. What should T5 change about R4? Rewrite the final answer without inventing a
   later browser check.
4. Suppose R4 receives only “the edit was applied,” with the acceptance criteria
   and test results omitted. What information must be supplied or retrieved before
   making a completion claim? Why is “the model already knows” insufficient?

### 2. Interpret usage, not a bill

The following is a **synthetic normalized ledger** for those four requests. For
this exercise only, input totals include cached input as a subset; output already
includes all output tokens we will charge. Do not assume your provider uses these
same field definitions.

| Request | Total input tokens | Of those, cached input | Output tokens |
| --- | ---: | ---: | ---: |
| R1 | 1,000 | 0 | 100 |
| R2 | 2,000 | 800 | 200 |
| R3 | 2,500 | 1,600 | 100 |
| R4 | 3,000 | 2,000 | 200 |

Use these **invented rates**, not a provider price list: uncached input $2 per
million tokens, cached input $0.50 per million, output $8 per million. Calculate
uncached input, cached input and output totals, then an illustrative total cost.

Would the largest input row be the cumulative input usage? Would the cumulative
input total be the current context-window size? If another request retries after
an error, can you infer that it is free? Finally, name what information you would
need before treating a real display as a bill.

### 3. Compare two attempts

**Prepared contrast:** attempt A reads both relevant source files together;
attempt B reads one, notices an imported helper, then reads the other. Both
produce the same accepted implementation. A's helper suite passes but its browser
cannot start. B has an observed current-code browser sequence covering all agreed
transitions. No timing or usage comparison is supplied for these attempts.

Which attempt has stronger acceptance evidence? Does that prove its model is
always better, its trace is more efficient, or its cost is lower? Explain what a
fair comparison would hold constant and what it would actually measure.

## Use at work

Use actual records when available, but keep missing facts marked **unknown**. A
visible tool card does not identify every provider request, retry or billing
category. Do not use `/dump` or `/share` as a casual capture shortcut: session
content can include raw context and secrets, and sharing adds a disclosure step.
Use only a reviewed, authorized, sanitized record if your organization provides
one. The exercise does not require capturing a real request.

For a completion claim, retain the criterion, relevant code state, actual action
and result, and the remaining gap. A test filename or a confident report is not
execution evidence. A green helper test and an unavailable browser are two
different observations; neither should be silently converted into the other.

## Go deeper

### Worked interpretation

**Counts:** one user turn, four provider requests and five tool calls. R2 is the
first request supplied with the source/test results. R3 can use edit feedback;
R4 must account for both test outcomes. Tool execution happens between model
requests; the model does not need a new user message for each step.

**Evidence:** R2's promise to check is an intention. T3 includes a request, policy
decision and edit result; it proves a file changed in the prepared case, not that
a correct count appeared. No prompt does not identify the approval mode. T4's
helper assertions could pass even if the counter used total list length. T5 is a
runtime failure before browser assertions, not a failed count assertion.

A justified final answer is:

> The component edit is applied and existing task-helper tests passed. Browser
> assertions did not run because the executable was unavailable. The displayed
> count, its transitions and reload behavior remain unverified. Obtain an
> authorized browser check before accepting the feature.

Do not repeatedly edit count logic to fix an unavailable browser. Restore the
authorized runtime or request a human check, then report its actual result. If
relevant code changes after a green check, reassess the evidence on that new state.

**Missing context:** supply the accepted meaning of unfinished, the transition
criteria, current source and actual test outcomes. A saved transcript may help
retrieve them, but its existence does not prove those facts reach R4. This is why
statelessness is a useful mental model even when a provider supports continuation
or cached prefixes: identify which system carries the information.

**Accounting:** total input is 8,500 tokens, including 4,400 cached; uncached input
is therefore 4,100. Output totals 600. The illustrative calculation is:

```text
(4,100 × $2 + 4,400 × $0.50 + 600 × $8) / 1,000,000 = $0.0152
```

Charging all 8,500 input tokens at the uncached rate and adding the cached charge
would double-count the cached subset. Summing input across requests can count
repeated context several times; it is not the size of the final context window.
The largest input row is 3,000, not the 8,500 cumulative total. A retry may incur
usage even if it fails, so inspect provider accounting rather than guessing.

A real estimate needs the provider/model, applicable rates and billing arrangement,
field definitions (including cache and reasoning categories), time range and
included sessions/requests. Limits may be subscription quotas rather than money.
This invented $0.0152 is neither an observed OMP statistic nor an invoice.

**Comparison:** B supports acceptance more strongly because its observations cover
the behavior on current code. That says nothing about cost or elapsed time here,
and one run does not establish general model superiority. Compare multiple
attempts from comparable starting states and requirements; record actual quality,
latency and resource use. Different tool order is not itself a defect. An agentic
loop can choose actions while the test script it runs remains deterministic.

### Sources and adaptation

- [OMP 18.2.9 CLI](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md): documented model/thinking and `stats`/`usage` surfaces, not a universal accounting schema.
- [Context files](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md): how supported instructions reach context, including scope and precedence.
- [Approval mode](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md): effective permission and containment limits.
- [Session operations](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/session-operations-export-share-fork-resume.md): provider/local state and the sensitive contents of dump/export/share.

The case preserves the earlier worksheet's distinction between intention, action,
result and supported conclusion, adding request and usage interpretation. All
stipulated events and rates remain course-authored, not measured results.

[Back to section 2](../sections/02-agentic-engineering-foundations.md) · [Next: host exercise](section-03-working-with-omp.md)
