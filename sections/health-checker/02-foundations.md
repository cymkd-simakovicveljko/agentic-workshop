# 2. Foundations: read the run as a system

**Main path:** explain the checker run you just observed. Do not build a second feature.

The first lesson gave you a concrete loop: a model received a bounded request, OMP exposed tools, files and processes changed, and you checked six fixture routes. This lesson gives names to those mechanics so that a wrong result has somewhere to start. If you have no saved transcript, use the clearly labelled prepared trace below. It is not a provider recording and it does not expose private model reasoning.

By the end you can:

- name the model, tool, harness, agent, prompt, context, and feedback in a real run;
- separate a proposed action, an executed action, and an observed outcome;
- explain why an empty repository still has instructions and why all files are not automatic context;
- distinguish model knowledge, session history, persistent files, and live processes;
- choose an authorized model using task fit, availability, cost, and effort rather than rankings.

## Start with the evidence you have

Take the notes from section 1. Find one read, one edit or write, one checker command, and one result. If a model report says “all routes pass,” compare that sentence with your six command outputs. The report is an account to inspect, not the evidence itself.

The local fixture is intentionally useful here: `/healthy` returns the expected status and body, `/wrong-body` returns status 200 with the wrong body, `/redirect` returns 302 without a second request, and `/slow` exceeds the one-second request-plus-body deadline. See the [fixture contract](../../demo/health-checker/README.md) when you need the exact route behavior.

## Parts of one run

Terminology differs across products. Use these working definitions for this course:

| Part | Meaning | In the health-checker run |
| --- | --- | --- |
| **Model** | The trained system that generates a response from supplied information, including a request for a tool action. | Proposes an implementation, requests a file read, or interprets a timeout result. |
| **Provider** | The service or account backend through which the model is accessed. | Supplies the selected model and applies its authentication, quota, and billing rules. |
| **Tool** | A callable operation with inputs, a result, and sometimes a side effect. | Reads the repository, writes the checker, or starts the learner's run command. |
| **Harness** | Software around the model that assembles interactions, exposes tools, applies execution policy, and returns results. | OMP manages the session, tool calls, approvals, and returned output. |
| **Agent** | The running system in which a model can choose actions, receive feedback, and continue toward a goal. | The OMP session working on the checker through successive tool calls. |
| **Prompt** | The request you authored for this interaction. | The bounded first-checker request with the status, body, timeout, redirect, and exit-code contract. |
| **Context** | Information actually supplied to the model for the current interaction. | Prompt, applicable instructions, tool descriptions, files read, prior messages, and command results. |
| **Feedback** | Information returned after an action that can guide the next step. | A file's contents, a process exit code, status 302, or a timeout error. |

The engineer is not replaced by any row. You own the desired behavior, authority to use the environment, the quality bar, and the decision to accept the result. Changing the model inside OMP does not change the fixture contract, the files, or the evidence required.

## Follow one lap of the loop

<figure class="course-diagram">
<a href="/diagrams/agent-loop.svg"><img src="/diagrams/agent-loop.svg" alt="Agent feedback loop: the engineer supplies a goal; OMP sends context to the model, applies policy to tool requests, and returns tool results to later model calls. The engineer checks the reported result." /></a>
<figcaption>The model requests actions; OMP and its tools carry them out when permitted. Returned evidence can change the next action. Open the diagram for a full-size view.</figcaption>
</figure>

The loop stops when the agent reports a result, reaches a limit, or is interrupted. You still decide whether to accept the work.

For the checker, a possible lap looks like this:

1. You state the one-URL contract and the local boundary in the prompt.
2. The model requests a file listing or reads existing files.
3. OMP dispatches the read tool and returns its result to the session.
4. The model requests a write; OMP applies the effective policy and the file changes if allowed.
5. The model requests your language's run command; the process returns status, body, elapsed time, or an error.
6. That result becomes feedback. The model may correct the code or report a limit.
7. You run the six acceptance cases independently and decide whether the evidence supports acceptance.

The exact order can differ. A model may write immediately, inspect more files, or stop when a tool is denied. Do not make up a failure to produce a dramatic teaching trace.

### Proposal, action, result, conclusion

These four statements are not interchangeable:

| Statement | What it is | Evidence needed |
| --- | --- | --- |
| “I will run `/slow`.” | Intention | The model's visible message only |
| “The checker command ran for `/slow`.” | Executed action | The command, working directory, output, and exit status |
| “The deadline expired before a response body arrived.” | Observed result | Returned timeout or elapsed/error evidence |
| “The checker handles the timeout contract.” | Engineering conclusion | A relevant result on the current files, plus inspection of the implementation |

A successful write means a file was written. A successful command means that process exited as reported. Neither one proves the behavior is correct. A result from before the latest edit does not verify the latest version.

A visible transcript can show messages, tool requests, tool results, and edits. It cannot show a model's private reasoning. Describe only what the trace and files support; do not claim to have inspected hidden thoughts.

## Prompt and context are different

The **prompt** is the request you wrote. The **context** is the larger set of information supplied for a model interaction. Context may contain:

- your current message and earlier turns in the session;
- user instructions and applicable instructions inherited from an ancestor directory or host;
- OMP tool descriptions and the effective working directory;
- files that OMP discovers under its supported context-file rules;
- files and command results returned by explicit reads or runs.

Prompt and context overlap, but they are not synonyms. A short prompt can be accompanied by useful repository context. A detailed prompt can still fail if the model never receives the relevant file or receives stale instructions.

An empty Git repository still has context. User and ancestor instructions apply even when the repository contains no source files. OMP may discover supported instruction files according to its directory and precedence rules, but it does **not** load every file in every directory automatically. A normal source file is not context until the model or harness reads it and returns the content. A path mentioned in a message is not proof of a read.

Keep these distinctions visible:

| Claim | What would support it |
| --- | --- |
| “The contract file exists.” | A directory listing or filesystem check |
| “The model read the contract.” | A read request and returned contents |
| “The implementation follows the contract.” | Source inspection plus behavior checks |
| “The checker is safe to run on this endpoint.” | An authorization decision, not a model suggestion |

The first prompt included the complete contract because guessing whether redirects should be followed or whether timeout covers the body would create a different checker. In a larger repository, provide the relevant contract and ask the model to read the specific implementation and checks; do not dump every file by habit.

## Memory, session, files, and processes

People often say “the agent remembers” when four different things are involved:

| Thing | What persists | What it does not prove |
| --- | --- | --- |
| **Model knowledge** | Patterns learned before this run | Knowledge of your current files, route ownership, or latest edit |
| **Session** | Conversation messages and tool results while the OMP interaction remains available | Permanent storage or model retraining; summaries can omit details |
| **File** | Source, project metadata, notes, or generated output on disk | That the model read it, or that its contents are current in the session |
| **Process** | A running fixture, compiler, server, or child command with its own state | That stopping OMP stopped the process, or that a process result proves source correctness |

The fixture is a good boundary example. You start `bun demo/health-checker/server.mjs` in one terminal. OMP can stop, the session can be summarized, and the fixture can keep listening. Conversely, a file can remain after a process exits. Check both the process terminal and Git status when interrupting a run.

Writing a note does not retrain the model. A later session benefits only if that note is loaded or supplied. A saved transcript is not the same as active context until the harness or you bring it into the interaction.

## Choose a model without ranking models

The course does not prescribe a best model. Choose from the models your organization authorizes and your provider account can actually use. Then evaluate fit against this short list:

1. **Availability:** the exact provider/model identity is enabled, and the request can be made without sharing credentials in chat.
2. **Tool fit:** it can follow the harness's tool protocol and work within the tools and runtime you expose.
3. **Task fit:** it can understand the bounded contract and produce code you can review in your language.
4. **Cost and effort:** latency, quota, and spend are acceptable for the task; a larger or slower model is not automatically better.
5. **Evidence quality:** it reports commands and uncertainty rather than inventing results.

A small checker may not need the most capable available model. A difficult repository may justify more capability if the task and budget warrant it. That is a decision about this task and environment, not a public ranking. Record the exact model so that later comparisons do not confuse a changed model with a changed prompt or code state.

## Prepared trace: a case to annotate

**Prepared trace — not a captured provider transcript and not private reasoning.** Use it when you have no saved section 1 transcript. The messages below represent visible requests, tool activity, and results that a learner can evaluate.

```text
Engineer: Build the one-URL checker with status 200, literal body text,
          one-second request-plus-body timeout, no redirects, and exit codes.
Model:    I will inspect the empty repository and create a small standard-library program.
Tool:     read/list repository
Result:   no source files; the inherited course instructions and prompt are available.
Tool:     write checker source and one language-standard project file
Result:   files created successfully.
Tool:     run checker against /healthy
Result:   status 200, expected text found, exit 0.
Tool:     run checker against /wrong-body
Result:   status 200, expected text absent, exit 1.
Tool:     run checker against /slow
Result:   timeout while waiting for completion, no HTTP status, exit 1.
Model:    The first implementation handles these observed cases; inspect the files
          and run /missing, /error, and /redirect before accepting it.
```

The trace supports that three commands ran and what those commands returned. It does **not** support “all six pass,” “the model used private reasoning X,” or “the generated file is safe” without your review. In particular, `/wrong-body` proves why status alone is insufficient, and `/slow` proves why transport failure must not be labelled as an HTTP status.

### Worked answers

Use these answers to check your own annotations after writing yours:

- **What fed the next model step?** The returned file listing and command results. They are feedback in the session context; the model did not learn them permanently.
- **Why is `/wrong-body` a failure?** Its status is 200, but the literal expected substring is absent. Status and body are separate acceptance conditions.
- **What should `/slow` report?** A bounded timeout or transport failure, elapsed time, and no invented HTTP status. The fixture's eventual 200 after two seconds does not make a request that already timed out pass.
- **Can this trace prove the final files are acceptable?** No. A write result proves creation. You must read the files, inspect generated paths, and run the missing cases.
- **Can an OMP approval prove correctness?** No. Approval is permission under policy. It does not certify necessity, safety, or behavior, and it is not a filesystem or network sandbox.

## Try it on your own run

Annotate your actual transcript, or the prepared trace, with these labels:

1. **Goal:** the exact behavior you agreed to check.
2. **Context:** one instruction or file that reached the model.
3. **Tool:** one operation the model requested.
4. **Feedback:** one returned output or error.
5. **Decision:** what you accepted, rejected, or left unverified.

Then answer:

- If the model read the checker source but never ran `/redirect`, what remains unknown?
- If `/healthy` passed before an edit and failed after it, which result applies to the current code?
- If OMP reports an approval prompt for a command, what does accepting that prompt establish?

Worked answers: the redirect behavior remains unverified; the post-edit result is the relevant one for the current version; accepting the prompt establishes permission for that operation under the effective policy, not correctness or containment. If the command was never allowed, say it was blocked rather than calling the check a failed HTTP response.

## Use the pattern at work

When an internal service check fails, first locate the layer:

| Symptom | First question | Better next move |
| --- | --- | --- |
| Status is right but body is wrong | Was the body contract supplied and checked literally? | Inspect the response and contract before changing networking code. |
| The model reports a pass with no command | Is there execution evidence on the current files? | Run the check yourself or leave it unverified. |
| A route unexpectedly follows a redirect | Did the tool or client apply a default? | Inspect the runtime option and rerun with redirects disabled. |
| The timeout has no status | Did a response arrive before the deadline? | Report transport/timeout failure; do not invent a status. |
| A generated file is absent from `git diff` | Is it untracked? | Use `git status` and `git ls-files --others --exclude-standard`. |

This is agentic engineering in a small form: you set intent and authority, select useful context, observe the loop, and accept only claims supported by evidence. The model can propose a repair; it cannot turn an omitted requirement or missing execution result into proof.

## Before moving on

Answer these without the table:

1. What changes when you select another model in the same OMP session, and what stays the same?
2. Why does a prompt naming `server.mjs` not prove that the model read it?
3. How can the fixture process outlive an OMP session?
4. Why is “the file exists,” “the model read it,” and “the behavior passed” three different claims?
5. What would you record before comparing two model runs?

A strong answer keeps the contract and acceptance criteria stable, identifies the actual context and tool results, separates disk state from process state, and records provider/model identity, prompt, context, environment, and observed checks.

## Sources and adaptation

The definitions and loop adapt the original sections 1 and 2 to the health-checker run. The prepared trace is course-authored and labelled because no provider-backed transcript is assumed. The fixture's behavior is defined in the [local README](../../demo/health-checker/README.md), not inferred from a model response.

OMP command and capability claims use the pinned **18.2.9** sources:

- [OMP README and installation](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install)
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md)
- [Providers and model selection](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/providers.md)
- [Context files and discovery](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md)
- [Approval modes and limits](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md)

The links describe OMP's documented behavior for that pinned source. They do not certify a learner's provider access, model quality, local permissions, or classroom rehearsal.

[Previous: Getting started](01-getting-started.md) · [Next: Everyday workflow](03-everyday-workflow.md) · [Back to the outline](../../OUTLINE.md)
