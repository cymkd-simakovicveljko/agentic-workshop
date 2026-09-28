# 1. Getting started: one small health checker

**Main path:** make one bounded checker, watch OMP work, then decide whether the result is acceptable.

This is a first-value exercise, not an advanced networking course. You will use a local HTTP fixture so that the request, response, timeout, and review are visible. You bring a language and runtime you already know. Everyone shares the behavior contract; nobody needs the same implementation.

By the end you can:

- identify the selected, authorized model before sending work;
- distinguish your prompt from the context available to the model;
- launch the local fixture and run a real checker against it;
- judge status, body, timeout, exit code, changed files, and untracked files yourself.

## Before you ask for code

### 1. Confirm the model and the place you are working

Open the empty exercise repository created in **Get Ready**. Confirm that you can still run a tiny program with your usual language tools. The checker does not exist yet. Bun is installed for OMP and for the shared fixture; it does not choose your implementation language.

Start OMP from the exercise repository:

```sh
omp --approval-mode always-ask
```

Inside OMP, use `/model` and record the exact provider/model identity you selected. Choose a model your organization authorizes and that your account can use. This lesson does not rank models. A model name is not evidence that a request was made or that a result is correct.

Also use `/hotkeys` so you know how to interrupt the current turn. `always-ask` is a supervised setting, not a sandbox: a prompt may ask permission for an operation, but an approved process still has the access its environment grants it. Read the proposed command and path before allowing it. Do not place credentials or private repositories in this exercise.

### 2. Start the fixture from the course root

Use a second terminal. Change to the **course root**, not the empty learner repository, and start the fixture there:

```sh
bun demo/health-checker/server.mjs
```

Keep this terminal running. The fixture listens on `127.0.0.1:4175`; it is a separate process from OMP and from your checker. Its route contract is in the [health-checker fixture README](../../demo/health-checker/README.md). Open `http://127.0.0.1:4175/` in a browser if you want to see the route index.

Run the checker only against the local fixture for this lesson. Keep the fixture unchanged. The checker needs no provider API, cookies, authentication, retries, concurrency, or redirect following.

### 3. Notice the three inputs to the first run

Before you send the task, write one sentence for each:

- **Model:** the selected system that generates a response or requests an operation.
- **Prompt:** the bounded request you are about to send.
- **Context:** the instructions, tool descriptions, files, command results, and conversation material that actually reach the model for this interaction.

In simple terms, the model generates the next response from the information in its context. That response may be prose, code, or a structured request for a tool. It cannot inspect your files by magic; OMP must run a read or command and return the result. A fluent response can still be wrong, which is why the fixture and your independent checks matter.

An empty repository does not mean an empty context. User and applicable ancestor instructions still matter. Conversely, a file existing somewhere does not prove the model read it. In this first exercise, make the contract explicit instead of asking the model to infer it from a large directory.

## The first checker request

Replace `<your language>` with your familiar language before sending this request. Prefer its standard HTTP library or an already-installed client. If neither is available, agree on a small HTTP dependency with the host before proceeding; do not turn the exercise into implementing an HTTP client.

```text
Build the smallest runnable website health checker in <your language> in this empty Git repository.
Use the standard library or an already-installed HTTP client. If neither can do the job,
stop and explain what is missing. Do not install packages, edit outside this repository, or commit.

The first version has one input: one HTTP(S) URL. It uses this fixed check:
- expected HTTP status: 200
- expected text: the literal, case-sensitive substring "Workshop service ready"
- timeout: 1000 ms for the request and response body together
- do not follow redirects

Measure elapsed time with a monotonic clock through completion or failure. Report pass/fail and
the URL, observed HTTP status when a response exists, whether the status and body matched,
elapsed milliseconds, and a useful reason. A timeout or transport failure is not an invented
HTTP status. Exit 0 only when the check passes; exit 1 for a valid URL whose check fails,
including timeout or transport failure; exit 2 for invalid input or configuration.

Keep the implementation small and readable. Create only the source and the language-standard
project files needed to run it. Do not add a test framework. Read the files you create after
writing them and tell me the exact run command.

The local fixture is already running at http://127.0.0.1:4175.
Run your actual checker command against /healthy, /wrong-body, and /slow on that server.
The checker must not call provider APIs or other hosts. Report changed files, actual
commands and results, and anything I still need to verify. Never claim an unrun case passed.
```

The request states behavior without dictating function names or file layout. You should be able to review the implementation because you chose the language. If it needs a package you have not agreed to, follows redirects, or grows into a broad refactor, stop and bring it back to this contract.

Notice four parts: **the goal, relevant context, constraints, and evidence of completion**. This is a starting example, not a magic formula to memorize. In [section 3's prompting practice](03-everyday-workflow.md#practical-prompting-techniques), you will write your own request, resolve ambiguity, use contrasting examples, and give useful feedback when a run goes wrong.

Watch the run, not just its final paragraph:

| Event | What you inspect | What it establishes |
| --- | --- | --- |
| Read or search | The path and returned content | What the model actually obtained |
| Edit or write | The proposed path and resulting file | What changed on disk |
| Shell run | Command, working directory, output, exit status | What really executed |
| Final report | Claims compared with those records | Whether the report is supported |

A displayed plan is a proposal. A successful write proves that a file was written, not that its checker is correct. Do not manufacture a failure for the lesson; your run may take a different route from the examples below.

## Run the six cases yourself

Use a separate terminal or your normal shell after the model stops. Replace only `<your run command>`; keep the URLs exactly as shown.

```sh
<your run command> http://127.0.0.1:4175/healthy
<your run command> http://127.0.0.1:4175/wrong-body
<your run command> http://127.0.0.1:4175/missing
<your run command> http://127.0.0.1:4175/error
<your run command> http://127.0.0.1:4175/redirect
<your run command> http://127.0.0.1:4175/slow
```

Write down each observed status, body-match result, elapsed milliseconds, reason, and exit code before reading the answer table.

| Route | Expected observation | Acceptance |
| --- | --- | --- |
| `/healthy` | Status 200; body contains the exact expected text | Pass; exit 0 |
| `/wrong-body` | Status 200; body does not contain the expected text | Fail; exit 1 |
| `/missing` | Status 404, if the response is received | Fail; exit 1 |
| `/error` | Status 500, if the response is received | Fail; exit 1 |
| `/redirect` | Status 302; the checker must not follow `Location: /healthy` | Fail; exit 1 |
| `/slow` | The 1000 ms request-plus-body deadline expires before the 2000 ms response | Timeout/transport failure; no invented status; exit 1 |

The only pass in this shared contract is `/healthy`. Elapsed time describes the observed run; by itself it does not prove that a deadline is enforced. Inspect the timeout result and implementation too. Scheduling and machine load vary, so do not match an exact duration. If `/slow` passes or `/redirect` reports 200, investigate the timeout or redirect policy before accepting the checker.

The fixture also serves an index at `/`. Unknown paths return 404. Those are useful exploratory checks, but the six routes above are the first acceptance set.

## Review the files, including files Git does not show in a diff

After the six checks, review the work independently. Run these from the learner repository:

```sh
git status --short
git diff --stat
git diff
git diff --cached
git ls-files --others --exclude-standard
```

`git diff` does not show the contents of untracked files. Open every untracked path listed by `git ls-files`, and inspect generated project files, caches, logs, or helper scripts as well as the main source. The expected result is a small, understandable set of files. An unexpected file is a reason to investigate, not a reason to hide it with `git add` or a cleanup command.

Check the implementation against the contract:

1. Does one invocation perform one HTTP(S) request and read the body?
2. Does success require both the expected status and literal body text?
3. Does the timeout include body completion, and does it stop the request?
4. Are redirects rejected rather than followed?
5. Are exit codes and reported reasons separated between a failed check and invalid input?

Run your language's normal compile, type, or syntax check if you already use one. Do not install a new checker just to make the lesson look complete. Stop and fix the implementation when observed behavior contradicts the contract; do not accept a green-looking summary over your own evidence.

## If the run goes wrong

- **No response from OMP:** check the selected authorized provider/model and the OMP session directory. Do not paste credentials into the prompt.
- **Fixture connection refused:** check that the fixture is still running from the course root and that the URL uses `127.0.0.1:4175`.
- **The checker asks to install a package:** check whether the current runtime already supplies an HTTP client. Approve a dependency only if it is needed and agreed with the host.
- **`/redirect` passes:** check for automatic redirect following, disable it, and rerun that case.
- **`/slow` reports 200:** inspect whether the timeout is missing, uses the wrong units, or ends too early. This fixture delays the response; it does not separately prove that a deadline covers a slowly arriving body.
- **A response has no status:** do not label it 500 or 0. For a valid URL, report the transport or timeout failure and exit 1; reserve exit 2 for invalid input or configuration.

An interrupt stops a turn; it does not undo edits or guarantee that a child process ended. Check the fixture terminal and Git status after stopping.

## Use the pattern at work

A health check is a compact version of a wider engineering task: state the observable contract, give the agent a bounded change, watch the evidence, and decide what remains unverified. For an internal service, you would confirm that the endpoint and expected body are authorized and current before asking for code. You would not treat a successful file write or a model's confidence as an uptime signal.

Keep a short note outside the source files:

```text
Selected provider/model:
My checker command:
Prompt boundary:
Six observed results:
Files I reviewed, including untracked files:
Decision: accept / needs another change / unable to verify
Reason:
```

If you could not make a provider-backed run, use this lesson's request and acceptance table as a prepared walkthrough, clearly labelled as prepared. Do not describe it as a captured model run or claim that a provider executed it.

## Before moving on

Answer these without looking back:

1. Why is `/wrong-body` a failed check even though its HTTP status is 200?
2. Why is `/redirect` a failure instead of a second successful request to `/healthy`?
3. What evidence would you need before claiming `/slow` timed out?
4. Which command finds generated files that `git diff` does not display?
5. What would you do if the model's final report disagreed with your six command outputs?

A strong answer names the body mismatch, the no-redirect boundary, a real elapsed/error result, `git ls-files --others --exclude-standard`, and the actual output as the source of truth. Section 2 names the system parts behind that run.

## Sources and adaptation

This exercise adapts the original first lesson's inspect → change → observe → review pattern to a local health checker. The fixture, routes, and expected results are course-authored. They are not evidence of a provider-backed rehearsal.

OMP command details are tied to the course's pinned **18.2.9** references:

- [OMP installation and introduction](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install)
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md)
- [Provider setup and `/model`](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/providers.md)
- [Approval modes and their limits](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)
- [Keybindings and interruption](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/keybindings.md)

Read the official pages for the pinned release when a command matters. Other agents and providers may expose different commands; do not silently transfer OMP controls to them.

[Back to Get Ready](../01-get-ready.md) · [Next: Foundations](02-foundations.md) · [Back to the outline](../../OUTLINE.md)
