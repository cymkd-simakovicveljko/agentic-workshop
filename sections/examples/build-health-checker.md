# Example: build a health checker

**Optional example: “It returns 200. Is it actually working?”**

You have just shipped a change. The website responds, but does it show what users expect? Let’s ask OMP to build a small tool that can tell the difference.

This standalone example turns a plain-language request into a working tool. You will watch OMP work, try what it builds, and ask for a change. [Foundations](../foundations/index.md) explains the model, context, and tools behind the run.

Your job is to stay involved: read what OMP asks permission to do, try the result, and tell it what needs changing. The commands and outputs in your run may differ from someone else’s. Follow the outcome, not an exact transcript.

## 1. Take the controls

For this optional example, use [Git](https://git-scm.com/downloads), [Bun](https://bun.sh/docs/installation) for the local fixture, and a language/runtime you already know. Create a new empty folder outside the course checkout and your other repositories, open it in your terminal, and run `git init` there. Install and connect OMP using [Getting started with OMP](../01-getting-started-with-omp.md) if needed. We are building a normal program with OMP, not putting an AI model inside the checker.

Start OMP from the exercise repository:

```sh
omp --approval-mode always-ask
```

**Choose the model.** Inside OMP, enter:

```text
/model
```

Select the provider and model you connected during setup. Note their names. This is the model OMP will ask to work on your request.

**Find the stop control before you need it.** Enter:

```text
/hotkeys
```

Find how to interrupt the current turn in your installed version. You do not need to memorize the other shortcuts.

**Read before approving.** `always-ask` is a supervised setting, not a sandbox. Inspect the command and path before allowing an operation; an approved process still has the access its environment grants it. Keep credentials and private repositories out of this exercise. Interrupting a turn does not undo edits or guarantee that a child process ended.

### Give the checker somewhere safe to test

We supply a tiny local website with predictable responses. This is the **fixture**: a teaching aid, not another app you need to build.

Use a second terminal. Change to the **course root**, not your empty learner repository, and start it:

```sh
bun demo/health-checker/server.mjs
```

Keep this terminal running. The fixture listens on `127.0.0.1:4175`, separately from OMP and your checker. Its [guide](../../demo/health-checker/README.md) defines the route behavior. Bun runs the fixture; your checker can use your familiar language.

**Check:** the terminal should report `Health-checker fixture ready at http://127.0.0.1:4175`. If it cannot start, expand the troubleshooting section below before continuing. Keep the fixture unchanged and use only its local endpoints during this exercise.

## 2. Give OMP the mission

**Make a prediction:** will OMP explain how to build the tool, or actually create and run it?

Replace `<your language>` below, then send the request in OMP. The detailed rules give everyone the same result to check. You do not need to memorize them; the [fixture guide](../../demo/health-checker/README.md#canonical-checker-contract) remains the reference.

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

## 3. Watch it work

Look for three things in your actual run:

- **Files changing.** Which source or project files did OMP create?
- **Commands running.** Did it execute the checker, or only suggest a command?
- **Evidence coming back.** What did those commands report?

This is the difference from asking a chatbot for a code sample: OMP can use tools to act in your workspace. A file on disk is not proof that the model read it, and a successful write is not proof that the program works.

If OMP asks a question, answer it. If it asks for an unagreed package, edits outside the exercise, or expands into a bigger project, interrupt and restate the boundary. Prefer an available HTTP client rather than implementing one; agree any necessary dependency with the host before proceeding.

Your run may succeed immediately or need a correction. Do not manufacture a failure. Compare the final report with the actual commands and results, and note anything not checked.

## 4. Try what you built

Use a separate terminal in your **learner repository** after OMP finishes. Replace `<your run command>` with the command for the generated checker—not the fixture command.

### First, the healthy page

```sh
<your run command> http://127.0.0.1:4175/healthy
```

**Check:** the result should be a pass, with status 200, matching text, elapsed milliseconds, and exit code 0. Run it yourself even if OMP already ran it.

### Now, the misleading page

```sh
<your run command> http://127.0.0.1:4175/wrong-body
```

This page also returns HTTP 200. **Should your checker pass it?** Read its output and make your decision before opening the answer.

<details>
<summary><strong>Reveal the expected result</strong></summary>

It should **fail**, with exit code 1. The page responds, but its body says `Maintenance in progress`, not the expected `Workshop service ready`.

That is why we built the checker: a successful HTTP status alone does not establish that the page contains what users need. If your checker passes this case, give OMP the command, actual result, and expected result. Ask it to fix the cause, then rerun both cases.

</details>

<details>
<summary><strong>How do I see the exit code?</strong></summary>

Immediately after each checker command, use `echo $?` in Bash or Zsh, or `$LASTEXITCODE` in PowerShell for a native program. Record it before running another command. Use the checker command directly, without a pipeline that could hide its exit status.

</details>

## 5. Make it yours

Open the generated source files in your editor. Then write **one follow-up request of your own**:

> Make the result easier for a teammate to understand. What would you change about the report?

Choose a concrete improvement—a clearer failure reason or a more readable arrangement of the existing fields. Tell OMP what you want. Keep the same checks, required information, exit codes, and one-URL interface; do not add a dashboard or another feature.

Run `/healthy` and `/wrong-body` again. **Did the output improve, and did the checker still make the right decisions?** If the report was already clear, choose a small wording or layout preference rather than inventing a bug.

You have now directed a build, used the result, and steered a revision. Next, decide whether it is ready to keep.

## 6. Decide whether it is ready

Two cases are a start, not the whole contract. Check the remaining routes:

```sh
<your run command> http://127.0.0.1:4175/missing
<your run command> http://127.0.0.1:4175/error
<your run command> http://127.0.0.1:4175/redirect
<your run command> http://127.0.0.1:4175/slow
```

Write down each observed status, body-match result, elapsed milliseconds, reason, and exit code. Compare all six results—including the two you reran after your improvement—with this table.

<details>
<summary><strong>Check the six expected results</strong></summary>

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

</details>

### Inspect what you are keeping

Review the files independently. Run these from the learner repository:

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

<details>
<summary><strong>Something did not work?</strong></summary>

- **No response from OMP:** check the selected authorized provider/model and the OMP session directory. Do not paste credentials into the prompt.
- **Fixture connection refused:** check that the fixture is still running from the course root and that the URL uses `127.0.0.1:4175`.
- **The checker asks to install a package:** check whether the current runtime already supplies an HTTP client. Approve a dependency only if it is needed and agreed with the host.
- **`/redirect` passes:** check for automatic redirect following, disable it, and rerun that case.
- **`/slow` reports 200:** inspect whether the timeout is missing, uses the wrong units, or ends too early. This fixture delays the response; it does not separately prove that a deadline covers a slowly arriving body.
- **A response has no status:** do not label it 500 or 0. For a valid URL, report the transport or timeout failure and exit 1; reserve exit 2 for invalid input or configuration.

An interrupt stops a turn; it does not undo edits or guarantee that a child process ended. Check the fixture terminal and Git status after stopping.

</details>

## What just happened?

You described an outcome, watched OMP act through tools, ran the product yourself, and gave a follow-up request. You also checked a case where a successful HTTP response was not enough.

The useful part is not just that code appeared. You could direct the work and compare the result with what you asked for. The same pattern applies to a feature, a bug fix, or a small automation at work.

**Would you accept this tool?** Name one thing you verified and one thing you still would not claim about it. Keep a short note outside the source files:

```text
Selected provider/model:
My checker command:
My follow-up request:
Six observed results after the change:
Files I reviewed, including untracked files:
Decision: accept / needs another change / unable to verify
What I have not verified:
```

Keep the checker only if you want to continue with the optional checker examples. No main-route lesson requires it. Stop the fixture with **Ctrl+C** in its terminal when you are finished.

If you could not make a provider-backed run, use the request and expected results as a prepared walkthrough. Label it as prepared, not executed.

In [Foundations](../foundations/index.md), we unpack the model, prompt, context, and tools behind a run. [Prompting](../foundations/prompting.md) gives you more practice writing your own requests.

## Sources and adaptation

The fixture, routes, and expected results are course-authored. This guided mission uses a real learner run; the expected results above are not a recorded provider-backed demonstration.

OMP command details are tied to the course's pinned **18.2.9** references:

- [OMP installation and introduction](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install)
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md)
- [Provider setup and `/model`](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/providers.md)
- [Approval modes and their limits](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)
- [Keybindings and interruption](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/keybindings.md)

Read the official pages for the pinned release when a command matters. Other agents and providers may expose different commands; do not silently transfer OMP controls to them.

[Getting started with OMP](../01-getting-started-with-omp.md) · [Foundations](../foundations/index.md) · [Example guide](health-checker-guide.md) · [Back to the outline](../../OUTLINE.md)
