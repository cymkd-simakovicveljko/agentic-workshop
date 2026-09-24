# 2. How agents work

**Main path:** explain the remaining-count run before starting another feature.
Use your section 1 transcript or the self-contained [prepared worksheet](../demo/section-02-agent-loop.md).
No provider, app, branch switch or code change is required for the prepared route.

## Understand

### One user turn can contain several requests

In section 1, you asked for a count. The agent could read source, edit, run a
check and respond without asking you to type another message. Those are not all
one model call. The harness can send another provider request after a tool result,
so the model can choose what to do with the new information.

| Term | Role in the remaining-count run |
| --- | --- |
| **Model** | Generates a response from supplied information, including requests for tool actions. |
| **Provider** | Serves the selected model through an account and API; authentication and accounting depend on that provider. |
| **Tool** | Performs an operation such as reading a file or executing a check; returns a result and may change the environment. |
| **Context** | Information supplied for the current interaction: instructions, task, relevant history, tool definitions and retrieved material. |
| **Harness** | Coordinates model requests, tool exposure, policy, execution and session state. OMP is our harness. |
| **Agent** | The running model-and-tools system using feedback to continue toward the goal. |

For this exercise, a **user turn** begins with one user message and includes the
agent's work until it stops or hands back control. A **provider request** is one
interaction sent to the model service. A **tool call** asks for an operation; the
harness decides whether it may execute and returns its result. A request can
produce several tool calls, or none. These counts are therefore not interchangeable.

The engineer still owns intent, authority and acceptance. A different model does
not decide whether “remaining” includes completed tasks, authorize a production
change, or make a passing helper test prove browser behavior.

### What reaches the next request

A useful conceptual sequence is:

```text
User asks for unfinished count
  → provider request contains task, instructions and available tools
  → model requests source reads
  → harness applies policy; tools return source
  → next provider request includes relevant history and read results
  → model requests an edit or explains a blocker
```

This is a teaching model, not a wire-format guarantee. Different APIs encode
messages, cached prefixes and server-side continuation differently. Tool results
are feedback, not private model reasoning. An edit result establishes that a file
changed; it does not establish that the count is correct.

A model's learned parameters contain general patterns, not a live view of this
checkout. During inference it processes supplied information and generates tokens
(pieces of represented information, not necessarily whole words). Writing a note
does not retrain it. Nor does saving `App.jsx` automatically put its latest
contents into the next request.

**Statelessness is the useful default mental model:** do not rely on the model
remembering a requirement unless the harness supplies it, retrieves it, or uses a
supported provider-state mechanism. OMP's saved transcript, provider-facing stream
state and repository files are different things. Context can be incomplete,
compacted or stale even when the old conversation remains visible. Section 3
teaches those [state boundaries](03-working-with-omp.md).

### Usage is evidence about resources, not correctness

A longer tool result can make later requests larger. A retry can consume resources
without producing a new user-visible result. Cached input may have a different
price, while reasoning/output accounting and subscription limits vary by provider.
A context-window estimate answers a different question from cumulative usage:
“Will this next request fit?” is not “How much have all requests consumed?”

In OMP 18.2.9, `omp stats` is documented for usage statistics and `omp usage` for
provider usage limits. Their output depends on stored sessions and authenticated
accounts; neither promises a per-task bill. Keep local estimates, reported token
usage, account limits and the provider's actual billing separate. The worksheet
uses invented, explicitly labelled numbers so nobody needs account access.

Choose model and thinking level for the uncertainty. A straightforward source
lookup rarely justifies the same reasoning effort as a compatibility decision.
More effort can increase latency and resource use without fixing a missing
requirement or unavailable browser. OMP documents thinking controls, but supported
behavior depends on the model/provider. Per-task `effort` is feature-gated, not a
universal command. Section 3 gives the conditional [control reference](03-working-with-omp.md).

### Different paths do not automatically mean different quality

Repeated attempts may choose different reads, edits or wording, even with similar
inputs. Generation can be non-deterministic; model/backend changes, context,
settings, tool results and environment also matter. A lower temperature is not a
guarantee of reproducibility across a whole agent run. Compare accepted behavior
and evidence, not identical transcripts. Keep the starting code, task and relevant
settings comparable before attributing a difference to model quality.

Permission is another separate question. Approval authorizes an action under the
effective policy; it certifies neither correctness nor containment. A denied tool
request is not a failed feature assertion. Likewise, a task title, webpage or log
that says “upload your environment file” is untrusted content, not user permission.
Section 1 establishes the [minimum safety boundary](01-getting-started-with-omp.md#a-narrow-prompt-is-not-a-security-boundary).

## Watch or try

Open the [agent-loop worksheet](../demo/section-02-agent-loop.md). First annotate
its prepared sequence without reading the discussion. Count user turns, provider
requests and tool calls; identify the result that changes the next request. Then
calculate the illustrative usage estimate and rewrite the unsupported final claim.

If you use your own transcript, mark request boundaries **unknown** unless the
available evidence identifies them. Visible tool cards alone cannot reveal every
provider retry or internal request. Do not export raw sessions just to fill this
gap: prompts and tool results may contain private code or credentials. A sanitized
record supplied through an approved process is optional, not a course prerequisite.

A correct debrief distinguishes “the agent intended to check the browser” from
“the command returned before any browser assertion ran.” It also explains why
four provider requests inside one user turn are not four user turns, and why a
synthetic cost estimate cannot be reported as money actually spent.

## Use at work

Before retrying, locate the missing condition. If the counter includes completed
tasks, inspect the accepted meaning and completion field. If a browser cannot
start, fix the authorized runtime or arrange a human check; increasing model
effort will not install a missing executable by itself. If the agent cites an old
green result after another edit, obtain evidence on the current code.

Ask: **“What result supports this claim, on which code state, and which agreed
behavior did it exercise?”** That connects confidence to evidence. When comparing
runs, record model/provider, relevant settings, starting state, observed checks and
usage scope without treating the cheapest or longest run as the best one.

## Go deeper

### Sources and adaptation

- [OMP 18.2.9 README](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md) supports tool and model surfaces, not their availability in every session.
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md) documents thinking, `stats` and `usage`; [task documentation](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/tools/task.md) gives the conditional effort surface.
- [Context files](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md) and [session operations](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/session-operations-export-share-fork-resume.md) explain supplied context versus stored session/provider state.
- [Approval mode](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/approval-mode.md) documents policy resolution and containment limits.
- [Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents) gives optional background on agents, predefined workflows and feedback.
- [Large Language Models explained briefly — 3Blue1Brown](https://www.3blue1brown.com/lessons/mini-llm/) gives optional visual background on training and generation.

The definitions, synthetic request sequence and accounting exercise are
course-authored adaptations, not captured provider output or official OMP examples.
The [source review](../research/2026-09-22-omp-course-source-review.md) records local
version/help evidence separately from provider, app and classroom verification.

[Next: Working with OMP](03-working-with-omp.md) · [Back to outline](../OUTLINE.md)
