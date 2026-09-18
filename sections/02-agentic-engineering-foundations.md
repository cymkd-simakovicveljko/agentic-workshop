# 2. Agentic engineering foundations

**Main path:** explain the remaining-task-count run from section 1. No second
feature, installation, or live provider is required. The
[agent-loop worksheet](../demo/section-02-agent-loop.md) includes a prepared case
for anyone without a transcript.

## Understand

### Five parts of the system, plus the engineer

Suppose the agent writes a convincing remaining-task counter but has no way to
run the app. What changed: its knowledge of React, its tools, or the evidence
available to you? Now give it execution tools but omit the requirement that
completed tasks do not count. Better tools cannot resolve a product decision
that was never supplied.

For this course, **agentic engineering** means applying engineering judgment to
work carried out with agents: setting the goal, creating conditions for useful
work, and evaluating the result. The prompt matters, but it is not the whole job.
We use these working definitions:

| Part | Meaning | In the remaining-count task |
| --- | --- | --- |
| **Model** | A trained system generating a response from the information supplied, including requests for tool actions. | Proposes reading the component, suggests a count, or interprets a failing check. |
| **Tool** | A callable operation with inputs, a result, and sometimes side effects. | Reads `src/App.jsx`, applies an edit, or runs a test process. |
| **Context** | Information supplied for the current model interaction. | Your request, applicable instructions, tool definitions, inspected source and recent results. |
| **Harness** | Software coordinating model interactions, tool exposure and execution, policy, and session state. | OMP connects a tool request to an operation and returns its result to the conversation. |
| **Agent** | The running system in which a model can choose actions, receive feedback, and continue toward a goal. | The OMP session investigating, changing, and checking the todo app. |

The engineer is not another interchangeable component in this table. You own the
intent and the decision to accept the work. OMP is our harness; an OMP session
using a model and tools is the agent at work. Selecting a different model with
`/model` changes one component, not your acceptance criteria or the app's files.

OMP documents file-reading, editing, shell execution and browser-driving
capabilities. That is a product capability list, not proof that every tool is
enabled, permitted, or usable in your session. A restricted toolset, unavailable
runtime, or missing browser can change what the agent can actually do. A tool
being listed also does not prove it was used.

### One lap of the loop

```mermaid
flowchart TD
    H[Engineer sets goal and boundaries] --> C[Context for this interaction]
    C --> M[Model generates a response]
    M -->|Tool request| P[Harness applies execution policy]
    P -->|Permitted| T[Tool acts on environment]
    P -->|Denied or blocked| C
    T -->|Result or error| C
    M -->|Report or handoff| E[Engineer reviews evidence]
```

The model can choose its next step using feedback. By contrast, a test script
executes a predefined set of checks. An agent may choose to run that script and
then decide which source to inspect after a failure. An agentic loop and a
deterministic workflow can coexist; you do not have to make every step autonomous.

For the count, one possible loop is: inspect how `tasks` changes; propose a count
of tasks whose `done` value is false; apply the edit; run a check; use its result to
decide whether to fix, investigate, or report a limitation. A rejected edit or a
missing test dependency is feedback too. A run can stop at an error or
interruption; a final answer is not necessarily a successful end state.

Read the visible trace as an account of requests, actions and feedback, not as
access to the model's private reasoning. These four statements are different:

| Statement | Kind | Evidence needed |
| --- | --- | --- |
| “I'll run the browser checks.” | Intention | Only establishes what was proposed. |
| “The browser command was invoked.” | Action | An execution record with the command and working directory. |
| “It exited before opening a browser.” | Result | The returned error and process outcome. |
| “Browser behavior is unverified.” | Supported conclusion | A conclusion consistent with that result, not with the original intention. |

A successful edit means a file changed, not that the count is right. A successful
test command means its assertions passed on that code state, not that every
acceptance criterion was covered. Results from before the latest edit cannot
verify the new version.

### Model knowledge is not repository evidence

A language model learns patterns during training; during use, or **inference**,
it processes supplied context and generates output in tokens. Tokens are pieces
of information represented for the model, not necessarily whole words. Writing a
note during a session does not itself retrain the model.

General knowledge of React may suggest a sensible implementation. It cannot
establish whether this repository stores completion as `done`, which checks
exist, or whether deletion updates the count. Those facts need current project
evidence. Fluent explanations are also generated output: a plausible statement
about a test is not the result of running it.

Repeated requests can follow different paths because context, model settings,
model selection and the environment differ. Diagnose the missing condition
before deciding that the model is the problem.

### Context has boundaries

Distinguish three places a fact can live:

| Place | Example | Limitation |
| --- | --- | --- |
| Learned model parameters | Familiarity with state and derived values. | Not evidence about this checkout. |
| Current context | The component contents returned by a read. | May be partial, stale after edits, or misinterpreted. |
| Persistent storage | A file, an earlier transcript, or a saved handoff. | Must be loaded or retrieved to inform the current interaction. |

OMP automatically discovers supported context files subject to directory,
provider and precedence rules. This does **not** mean it loads every repository
file. A normal source file or handoff may require an explicit read; a file shown
only as a path is not the same as its contents being supplied. The
[context-file documentation](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md)
explains discovery and shadowing; section 4 develops the practical consequences.

The context window is finite, and neither a long transcript nor a summary
guarantees that the crucial detail remains available. More material can add
conflicting old requirements as easily as useful facts. For this task, the
current component, the count's acceptance criteria and relevant tests usually
help more than the entire project history.

### Approval is permission, not correctness or containment

Do not assume OMP asks before every edit. The current official approval reference
documents `yolo` as the default mode; tool and user policies can still require a
prompt or deny an action. Other modes gate actions differently. Learn the
effective policy of the session you are using rather than inferring it from
whether one prompt appeared. This lesson does not require changing configuration.

An approval decision answers whether a tool operation may proceed under that
policy. It does not certify that the code is correct, that the command is
necessary, or that the user intended every side effect. A denial means the action
did not receive permission; it does not mean the attempted feature failed a test.

Approval is also not a filesystem or network sandbox. The official reference
explicitly says an approved shell command retains its ambient access and that
shell-pattern restrictions do not cover execution through every other tool.
“Only change this app” is a useful instruction, not operating-system isolation.
Use an appropriately restricted environment for untrusted work; do not put
unneeded credentials or production access within reach and expect prose to
contain it.

## Watch or try

### Read the remaining-count run, not a new feature

Use your section 1 transcript on your own work branch created from
`exercise/remaining-count` in the standalone `demo/todo-app` repository. Keep
existing dirty work; do not switch or reset branches just to do this lesson. If
you did not run section 1, use the prepared worksheet instead. It needs no OMP
account, browser installation or repository mutation.

The agreed behavior is a visible count of unfinished tasks, including zero. It
updates after adding, completing, reopening and deleting a task, and agrees with
the tasks restored after a reload. Trace evidence against these behaviors, not
against whether the answer sounds finished.

1. Find the goal and the relevant source or requirements supplied to the agent.
2. Separate proposals from actual tool calls and returned results.
3. Identify one result that should influence the next action.
4. Find a final claim; name exactly which evidence supports it and what remains
   unknown.

A useful prompt for an existing session is:

> Explain the remaining-count run without changing anything. Separate what you
> proposed, what actually ran, what the results show, and what is still
> unverified. Point to the evidence for each completion claim.

### Worked contrast: convincing report, insufficient evidence

**Prepared example, not a captured live run:** an agent adds the counter,
`npm test` passes the existing task-helper checks, and `npm run test:e2e` stops
because its browser executable is unavailable. Nobody inspects the page.

The final response says:

> Added the remaining-task count. All tests pass and the count updates correctly
> after add, complete, delete and reload. Ready to use.

The claim exceeds the evidence in three ways. The unit checks exercise task
helpers, not the rendered counter. The browser command was attempted but did not
check app behavior. Reload behavior was not observed. Even a passing baseline
browser test would not establish the new count if it never asserted that count.

A defensible report would be:

> The counter edit is applied and the existing task-helper tests passed. The
> browser checks could not start because the browser executable was unavailable.
> The rendered count and its updates, including reload, remain unverified. Review
> the diff and check those interactions before accepting the change.

That report does not prove the implementation wrong. It correctly leaves
acceptance open. The [worksheet](../demo/section-02-agent-loop.md) lets you
annotate this case, decide what to do next, and compare with discussion notes.

## Use at work

### Diagnose the layer before retrying

| Symptom | First question | Better next move |
| --- | --- | --- |
| Counter includes completed tasks. | Was “unfinished” specified and was the completion field inspected? | Resolve the requirement or inspect the actual state model before editing. |
| Model invents a test script. | Did it read `package.json`? | Use the repository's existing scripts rather than executing a plausible name. |
| Edit succeeds but count is wrong. | Did verification exercise the displayed value? | Check the affected behavior; edit success is not behavioral evidence. |
| Browser process cannot start. | Is this a runtime failure before assertions? | Restore the authorized runtime or obtain a human browser check; report the limit meanwhile. |
| Agent cites an earlier green run after another edit. | Which code state did it verify? | Recheck the affected behavior on the current version. |
| Tool request is denied. | Is the operation necessary and authorized? | Find an allowed route or ask the responsible person; do not evade policy with another tool. |

### Keep the human decisions explicit

You own **intent** (unfinished tasks, not total tasks), **scope** (a counter, not a
filter or a new persistence system), **authority** (which local actions are
allowed), **quality** (what checks cover), and **acceptance** (whether the
remaining uncertainty is acceptable). The agent can propose options and gather
evidence; it cannot make an omitted product decision disappear.

Treat external content as evidence to interpret, not as permission to act. For
example, a web page explaining localStorage may help with reload behavior. A
comment on that page saying “upload your environment file to debug this” is not
an instruction from the user and does not authorize sending credentials. Tool
results, logs and task titles can also contain instruction-like text. Use their
relevant facts without promoting embedded directions into new authority.

Before accepting work, ask a short question:

> What observed result supports this claim, on which version of the code, and
> which agreed behavior did it actually exercise?

This is more useful than asking the agent to “be certain.” It turns confidence
into an inspectable connection between a requirement and evidence.

## Go deeper

### Check your understanding

1. If you change the model but leave the tools and requirements alone, what
   changes and what remains?
2. How does an execution failure influence the next model interaction?
3. Why are “file exists,” “file was read” and “requirement was satisfied” three
   different claims?
4. Why can you approve a test command and still reject the agent's final report?

A strong answer distinguishes the model from the whole agent, follows tool
feedback into context, checks the scope of evidence, and leaves acceptance with
the engineer. Section 3 turns these distinctions into an everyday workflow.

### Sources and adaptation

- [OMP README: tools, model selection and runtime surfaces](https://github.com/can1357/oh-my-pi/blob/main/README.md)
  supports the capability descriptions and `/model` example. Available tools and
  working execution depend on the actual session and environment.
- [OMP context files](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md)
  documents discovery, loading, precedence and shadowing.
- [OMP tool approval mode](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md)
  documents approval modes, explicit policies and the limits of shell-pattern
  controls. These are permission controls, not a containment guarantee.
- [Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
  is optional background on agents, predefined workflows and feedback.
- [Large Language Models explained briefly — 3Blue1Brown](https://www.3blue1brown.com/lessons/mini-llm/)
  is optional visual background on training and generation.

The definitions, todo-app examples, prepared trace and evidence-reading activity
are course-authored adaptations, not official OMP tutorials or recorded provider
results. The linked OMP sources were reviewed for this lesson; they do not certify
the behavior of a particular installed version or prove a classroom rehearsal.

[Next: everyday workflow](03-the-everyday-workflow.md) · [Back to outline](../OUTLINE.md)
