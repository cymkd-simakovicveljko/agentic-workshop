# 6. Reliable execution

**Main outcome:** reproduce a health-check failure, classify its cause, repair only the shared cause when one exists, and prove the final behavior without losing useful work. The loop is **failing check → root cause → fix → proof**. A confident agent summary is not a proof.

**Prerequisites:** complete sections 1–5 and keep the reviewed health-checker program, its run command, and any batch-config support. Earlier sections should have established OMP, Git, Bun and an approved runtime for your chosen language. Do not install a new language, package, browser or provider for this lesson.

Start the shared fixture **from the course root**, in a separate terminal:

```sh
bun demo/health-checker/server.mjs
```

It listens only on `127.0.0.1:4175`. The fixture is a separate course-owned process. Do not edit it to make a check pass, and do not point the checker at public or production systems.

## Understand

### Failure is evidence, not a diagnosis

“The check failed” can mean a wrong assertion, a fixture mistake, a loopback/network problem, a missing runtime, or a process that never reached the request. First capture the exact command, working directory, input, expected result, actual result, exit code and code state.

| Observation | Likely class | Distinguishing check |
| --- | --- | --- |
| `/wrong-body` returns HTTP 200 and the checker passes | App defect: status-only acceptance | Read body matching and run the same endpoint with the literal expected text |
| `/slow` returns success after about two seconds despite a 1000 ms limit | App defect: timeout does not cover request/body completion | Inspect timeout scope and compare elapsed time with the configured limit |
| Every route is connection-refused | Fixture/process/environment problem | Check the server terminal, working directory, port and process ownership before editing the checker |
| A response arrives with an unexpected status | Application or fixture behavior | Record the observed status; compare route contract and status handling |
| No status exists and the program reports a transport/timeout failure | Network/transport outcome | Do not invent an HTTP status; inspect URL, loopback access and timeout error |
| The command fails before running, or the runtime is missing | Environment/setup | Read the startup error and establish whether any request occurred |

A repeated red result is not automatically flaky. The same input can repeatedly expose a deterministic defect or a persistent setup error. A retry is useful only when it changes a known condition and is safe. Do not retry a write or external action whose first outcome is unknown.

Use a small investigation:

1. **Hypothesis:** name one cause that predicts an observable difference.
2. **Distinguishing check:** choose the smallest run or source inspection that could disprove it.
3. **Observation:** record what actually happened, including unknowns.
4. **Decision:** repair, repair the environment, gather evidence, or stop for a requirement decision.

If the explanation cannot predict a different observation, it is not ready to justify an edit.

### The canonical failure cases

The fixture provides a safe matrix. With the common contract—status `200` and expected text `Workshop service ready`—only `/healthy` should pass:

| Route | Fixture behavior | Correct checker result |
| --- | --- | --- |
| `/healthy` | 200 and expected text | Pass, exit 0 |
| `/wrong-body` | 200 and `Maintenance in progress` | Failed check, exit 1 |
| `/missing` | 404 | Failed check, exit 1 and report 404 |
| `/error` | 500 | Failed check, exit 1 and report 500 |
| `/redirect` | 302 with `Location: /healthy` | Failed check; redirects are not followed |
| `/slow` | waits 2000 ms, then 200 and expected text | Timeout/failure under a 1000 ms timeout; no invented HTTP status |

The expected table is a contract to test, not a fabricated run record. Your output should report observed status when a response exists, match/pass or fail with a reason, and elapsed milliseconds measured monotonically through body completion or failure. Do not assert an exact duration.

For an array config, the whole input must be prevalidated before any request. Entries are exactly `{name,url,expectedStatus,expectedText,timeoutMs}`; names are nonempty and unique, URLs are HTTP(S), status is an integer from 100 through 599, text is a nonempty string, and timeout is a positive integer. Empty or malformed config exits 2 and sends no requests. Valid entries run sequentially; one failed check does not skip later valid targets. All pass is 0; any completed failure is 1; invalid input/config is 2.

### Approval is not a sandbox

OMP 18.2.9 separates tool tier, tool policy and user policy. Its documented modes include `always-ask`, `write`, and `yolo`; approval controls whether a tool call proceeds, not what an approved process can reach. An approved command still has its ambient filesystem, network and subprocess access. A `bash` rule does not automatically constrain code run through another execution tool. Headless subagents use `yolo` for ordinary tier prompts; parent task approval and user deny/prompt policies still matter.

Read the primary source before relying on a setting:

[OMP 18.2.9 approval-mode guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/approval-mode.md)

For this lesson, keep the target loopback-only and review every requested edit. Never place credentials, production URLs or destructive commands in the exercise packet. A prompt saying “only inspect” is scope guidance, not filesystem enforcement.

## Watch or try

### 1. Establish the state without erasing work

From the learner repository, inspect its state using your normal language-specific commands. Keep the fixture running in its separate course-root terminal. Record:

```text
working directory:
branch/revision (if using Git):
staged and unstaged files:
untracked files:
checker invocation:
fixture process and terminal:
```

Preserve existing edits. If the earlier program is missing, complete the earlier core lesson instead of using a fictional prepared branch. If the fixture is not running, fix that setup first; do not change checker logic to compensate.

Run one clean baseline with the six routes using the invocation established in section 3. A language-neutral description is:

```text
<your-checker-command> <one target or config>
```

Use the checker’s own output format. Save a compact record of endpoint, expected status/text, observed status if any, match result, reason, elapsed milliseconds and exit code. Do not claim results until you have run the command.

### 2. Reproduce one hidden failure before editing

Start with `/wrong-body` if your checker might accept status alone. Use `/slow` if the timeout path is uncertain. Ask OMP for investigation only:

```text
Reproduce one health-check failure against the local fixture before editing.
Use /wrong-body or /slow and the accepted contract. Read the checker and its
callers. Report the exact command, expected and observed result, exit code,
whether an HTTP status existed, and one root-cause hypothesis. Distinguish app,
fixture, transport/network and environment causes. Do not edit files or invent a
run result.
```

The critical distinction is 200 with the wrong body versus no response. `/wrong-body` should be a completed failed check with observed status 200, not a transport error. `/slow` should fail because the 1000 ms deadline covers request and body completion; it is not a successful 200 merely because a response eventually arrives.

If the program already handles both cases correctly, do not force a bug. Prove the existing behavior with source inspection and the route matrix, then record **no repair needed; failure behavior already correct**. The exercise is diagnosis and proof, not manufacturing a diff.

### 3. Fix the shared cause only when the evidence supports it

If a real defect appears, give precise feedback. Include the failing input, observed output, contract clause, likely source location and a check that could disprove the hypothesis:

```text
The /wrong-body run exited 0 although the fixture returned status 200 and body
"Maintenance in progress". The contract requires a case-sensitive substring
"Workshop service ready". Inspect the shared response-validation path and its
callers. Explain why status-only acceptance is the cause before editing. Then
make the smallest fix that preserves status reporting, timeout behavior,
redirect handling, exit codes and later batch entries. Do not weaken checks or
change the fixture. Report the exact files changed and run evidence.
```

For a timeout defect, replace the first paragraph with the actual `/slow` output and require the deadline to cover request plus body completion. Do not turn every slow result into a made-up status. Do not add retries, concurrency, auth, cookies or bounded-body behavior unless the accepted contract explicitly asks for them.

A shared validation path is usually the right repair site. A form-only or route-only patch can make one reproduction green while leaving another caller wrong. Read every caller before editing. A test change that deletes the failing assertion or changes expected behavior is not a repair.

### 4. Keep going after one batch target fails

If section 3’s batch path is in scope, use a valid config with at least one passing target followed by a failing target and another valid target. The fixture routes make a concrete sequence:

```text
healthy → wrong-body → missing
```

The checker must run all three sequentially, report an independent result for each, and exit 1 because at least one completed check failed. Then use an invalid whole config—such as a duplicate name or non-integer timeout—and prove it exits 2 **before any request**. A program that stops after `/wrong-body`, silently skips `/missing`, or starts requests before discovering an invalid entry has not met the contract.

Record whether each target was completed, failed, skipped by a valid rule, or not reached because the entire config was invalid. “The batch failed” is not enough feedback to repair the right branch.

### 5. Prove the repair or existing correctness

Run the same reproducer after the repair, then run the full local matrix. A useful proof table is:

| Evidence | Establishes | Does not establish alone |
| --- | --- | --- |
| `/wrong-body` result | 200 is not accepted without the required body substring | Timeout or redirect behavior |
| `/slow` result and elapsed time | Deadline rejects this delayed response | A deadline also covers a slowly arriving body; inspect that boundary separately |
| Six-route matrix | Baseline pass/fail and status reporting | Array prevalidation unless config was exercised |
| Batch with later valid target | Failures do not stop later valid entries | Invalid config makes zero requests |
| Invalid whole config | Exit 2 and no target results | Zero requests; inspect the validation order or capture actual request calls |
| Source and caller review | Fix is at the shared cause and scope is controlled | Runtime behavior without a run |
| Diff/status record | Exact code state associated with evidence | Correctness of unexecuted paths |

Review regression boundaries: `/healthy` still passes; `/wrong-body` fails despite 200; 404 and 500 retain observed status; redirect is not followed; `/slow` times out at the configured limit; elapsed time is monotonic and reported without exact-timing assertions; invalid input exits 2; later valid batch targets still run. Report checks not run.

## Use at work

### Continue failures without thrashing

Stop and reframe when the next action needs an unresolved requirement, the agent is weakening a check to get green, the fixture/environment diagnosis is incomplete, or repeated edits produce the same failure without new evidence. A red check alone is not a reason to abandon the investigation. Agree a bounded next experiment, not an arbitrary retry count.

Use precise feedback instead of “try again.” Name:

1. the exact command and current code state;
2. expected behavior and actual output;
3. whether an HTTP status existed;
4. one hypothesis and the observation that would disprove it;
5. the smallest requested next action and its stop condition.

Keep failure output locally and transfer a distilled record. Do not paste provider transcripts, credentials or unrelated logs into a handoff.

### Interrupted files and processes

A keypress can interrupt OMP’s turn without stopping a child command or rolling back an edit. OMP documents `/hotkeys`; Escape is commonly the app interrupt but editing modes and terminal mappings can consume it:

[OMP 18.2.9 keybindings guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/keybindings.md)

After an interruption, inspect current files and process state before resuming:

- identify commands and children that are completed, cancelled, still running or unknown;
- stop or wait only for processes you can identify as yours;
- preserve staged, unstaged and untracked work plus failure output;
- record the stopping reason, remaining hypothesis and next discriminating check;
- do not snapshot while another writer is changing the same file.

Session operations are not repository recovery. `/resume` selects a saved conversation; `/new` starts an empty one; `/fresh` resets provider-facing stream state while retaining local conversation; `/restart` relaunches OMP with its original flags. None of these restores files, stops arbitrary processes, reconciles fixture state or proves a command ran. Re-read the current code, diff and fixture terminal after any session change.

[OMP 18.2.9 session operations guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/session-operations-export-share-fork-resume.md)

A useful handoff is short:

```text
Accepted behavior:
Current code state and uncommitted files:
Exact failing command and observed output:
Root-cause hypothesis and distinguishing check:
Processes/workers and their observed states:
Next action and stop condition:
```

### Review the result as an engineer

Before calling the work complete, compare the patch with the contract and route matrix. Check that the fix did not move validation only into one caller, follow redirects by default, convert transport errors into HTTP statuses, add unsafe retries, or hide a failure by altering expected output. Check that unrelated edits and useful untracked files survived. If the program was already correct, the final record should show the evidence that earned “no change,” not an invented patch.

## Go deeper

### Optional: subagents with explicit ownership

A small health-check branch with one clear reproducer is often faster to inspect directly. Delegation earns its cost only for an independent, bounded question with a verifiable result. For example, after freezing code and before editing, a read-only child could map contract clauses to source locations and coverage gaps. Supply the exact code state and packet; do not assume the child shares conversation history. A child result is evidence to review, not approval to merge.

OMP’s task guide documents child context, batch inputs, isolation, lifecycle and output artifacts. It also states that isolated execution is configuration-dependent and is a workspace mechanism, not a credential or network boundary:

[OMP 18.2.9 task tool guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/tools/task.md)

If you delegate, use a bounded prompt:

```text
Read only the current health-checker source and supplied contract. Map each
status/body/timeout/redirect/exit-code clause to a source location and state
which route evidence is missing. Do not edit, run commands, call endpoints,
approve a repair or delegate further. Mark unknowns explicitly.
```

No child result removes the parent’s duty to inspect the combined state. Do not add a subagent just to make a small failing check look more sophisticated.

### Completion questions

Can you show the original failing observation, explain the root cause, identify the smallest repair or prove no repair was needed, and show post-change route evidence? Can another engineer tell whether a missing status means transport failure, whether a valid batch continued, what was running at interruption, and which code state the evidence describes? If not, the recovery record is not ready for handoff.

### Sources and adaptation

- [OMP 18.2.9 approval-mode guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/approval-mode.md) — approval tiers, policy precedence, ambient access and headless subagents.
- [OMP 18.2.9 keybindings guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/keybindings.md) — `/hotkeys`, Escape and editing-mode behavior.
- [OMP 18.2.9 session operations guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/session-operations-export-share-fork-resume.md) — `/resume`, `/new`, `/fresh` and `/restart` boundaries.
- [OMP 18.2.9 task tool guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/tools/task.md) — child context, isolation, lifecycle and output.
- The route matrix and expected outputs are course-authored adaptation of the shared loopback fixture. They are not observed run results; record your own command output.

[Previous: skills](05-skills.md) · [Next: optional flavors](07-optional-flavors.md) · [Back to outline](../../OUTLINE.md)
