# 3.1 Codebase investigation

You pick up a ticket in a service you haven't touched before: “Requests for a renamed account return not found.” The agent finds `resolveAccount` and proposes a change. The function name fits—but does the failing request actually reach it?

This is a prepared scenario, not a recorded run. The question matters because a plausible patch in the wrong path can pass its tests while leaving the user's problem unchanged.

## Approach the code by feature slice

**Follow one behavior across the codebase, not one directory at a time.** A feature slice connects a user action or input to its result through the layers that matter. For the renamed-account ticket, trace how the request supplies an identifier, how it is interpreted, where the account is looked up, and how “not found” becomes the response.

That slice might cross a screen, an HTTP handler, a domain function, and storage. Include a layer because it affects the behavior—not because every diagram needs that box. Ask “How does looking up a renamed account work?” rather than “Explain the accounts folder.”

Keep unrelated features out of the investigation, but inspect other callers of shared code before proposing a change. A queue consumer or scheduled import may pass different identifiers into the same function. A feature slice is a way to bound the question, not permission to ignore the impact of a shared change.

## Let the agent discover, then check its map

**Separate orientation, investigation, and implementation.** Anthropic's [explore → plan → code guidance](https://code.claude.com/docs/en/best-practices#explore-first-then-plan-then-code) makes this separation explicit. Its [codebase-understanding recipes](https://code.claude.com/docs/en/common-workflows#understand-new-codebases) move from an overview to relevant files and then an execution trace. We can use that progression in OMP without adopting another harness.

If the repository is new to you, ask for the entry points, major subsystems, project vocabulary, and existing check commands first. Then pick one question that matters to your task. A directory-by-directory summary is not yet an explanation of how the system works.

**Use navigation, not just more context.** Start with OMP's search and targeted reads; use symbol definitions and references when available to follow wrappers, re-exports, and callers. Text search helps locate a feature, but a name match is not a call relationship. Check configuration and dynamic dispatch separately when static references cannot establish the path.

## A bounded trace

Write the behavior in observable terms first: the input or action, the result today, the result expected, and the failure case that makes the ticket important. Then trace in this order:

1. **Find entry points and callers.** Search for the route, event, command, job, or user-visible message as well as the obvious symbol. Read each relevant caller, using symbol references when available. A definition shows that code exists; a call site shows a possible connection. Conditions and runtime configuration determine whether a request takes it.
2. **Follow data and control flow.** Note validation, conversions, defaults, feature flags, retries, and persistence boundaries. Record where an error is returned, translated, swallowed, retried, or turned into a fallback result.
3. **Inspect local conventions and checks.** Read a neighboring implementation, the relevant configuration, and the tests or fixtures that exercise the path. Check whether a test reaches the same entry point or only calls a lower-level helper.
4. **Separate evidence types.** An **observation** is visible in source or configuration: “the queue consumer calls `resolveAccount`.” An **inference** is a conclusion from those facts: “the consumer probably sees the same bug.” **Runtime proof** is an actual command, request, or check and its observed result. Do not present an inference as a run result.

Stop when you can answer: which entry points can produce the behavior; what data reaches the suspected boundary; how the important failure path behaves; which existing check covers it; and what remains unknown. If another search would not change the next decision, it is research for its own sake.

## Ask for investigation, not a speculative patch

Anthropic publishes the actual [code-explorer agent prompt](https://github.com/anthropics/claude-code/blob/main/plugins/feature-dev/agents/code-explorer.md): discover a feature, trace its execution, map its layers, and return file-and-line references plus essential files to read. The request below is our bounded adaptation, not an OMP command or a verbatim copy of that plugin.

```text
Investigate one feature slice: [observable behavior] in [repository/path].
Do not edit files.

Trace the input through its entry point, data transformations, storage or
external calls, and visible result, including the important failure path.
Inspect other callers of shared code, one neighboring implementation, and
the existing checks or configuration that matter. Leave unrelated features
out. Follow wrappers until the next caller would not change the decision.

Return:
- a short behavior statement;
- a source map with paths, symbols, and line references;
- the normal and important failure paths;
- observations, inferences, and unknowns labelled separately;
- one existing check and what it actually reaches;
- the files actually inspected and the few essential files I should read;
- the smallest next investigation or change, with a reason to stop.

Do not invent APIs, references, or runtime results. Do not propose a fix until
this map is checked.
```

The useful constraint is not the exact wording. It is the stop rule: inspect enough connected evidence to make the next decision, then hand control back to you.

<div class="setup-platforms">
<details>
<summary><strong>Two useful discovery follow-ups</strong><span>Choose the missing question, not another general overview.</span></summary>

**When you don't know where to start:**

```text
Orient me in this repository without changing it. Identify its entry points,
major subsystems, project-specific terms, and existing check commands.
Cite the files you actually read. Give me a short reading order and suggest
one behavior worth tracing next. Don't explain every directory.
```

**When a proposed change looks deceptively local:**

```text
Before changing [symbol or behavior], find its callers, consumers, relevant
configuration, and tests. Which contracts could change? Show the evidence
for each affected path and distinguish confirmed relationships from guesses.
Do not implement anything. End with unresolved decisions, not a patch.
```

These adapt Anthropic's overview → files → flow recipes to two common investigation decisions. For a reusable explanation procedure, read [pstack's `how` workflow](https://github.com/cursor/plugins/blob/main/pstack/skills/how/SKILL.md) and its [explorer prompt](https://github.com/cursor/plugins/blob/main/pstack/skills/how/references/explorer-prompt.md). Its useful handoff fields include **Files Read, Boundaries, Non-Obvious Things, and Open Questions**.

Keep a small question in one session. For genuinely independent questions across layers, split read-only investigation by responsibility, then have the main agent inspect the cited files and reconcile disagreements. More explorers add cost and can repeat the same mistaken assumption. The linked plugins use Claude Code or Cursor-specific configuration; borrow their procedures, not their slash commands or model settings.

</details>
</div>

## One lightweight investigation

Choose one small behavior in a repository you already know: a CLI option, a validation rule, a request handler, or a file-format conversion. Keep the investigation read-only. Use the prompt above with a narrow path or symbol, then check **one actual cited connection** yourself: open the cited caller and verify that it invokes the cited symbol and passes the data the investigation claims.

Record three lines:

- **Observation:** what the source directly shows.
- **Inference:** what you think follows, labelled as a conclusion.
- **Check:** the source location you opened and what connection it confirmed (or what it failed to confirm).

If source reading leaves a consequential question about which implementation or branch runs, use the runtime trace below. One observed run does not cover alternate callers. If you do not run one, say “runtime behavior not checked.”

No suitable repository? Use this prepared source map instead. It is a teaching example, not a real repository or recorded execution:

```text
api/orders.ts:18              POST /orders -> createOrder(request.body)
domain/create-order.ts:7      validate input; store the order; return its id
jobs/replay-orders.ts:10      replay event -> createOrder(event.order)
adapters/order-store.ts:29    duplicate key becomes DuplicateOrder
tests/create-order.test.ts:42 calls createOrder with request-shaped input
```

**Decide before revealing:** does the listed test establish that replay events work correctly? Name one missing connection you would inspect next.

<details>
<summary><strong>Compare your reasoning</strong> — what the source map supports, and what it doesn't.</summary>

A sufficient map says there are two entry points, both reach the same domain function, and the adapter turns a duplicate-key failure into a domain error. The test cited is evidence that the domain function is exercised with one input shape; it does **not** prove that replay events or the API route behave correctly. The next useful check is to open the two callers and compare their input construction. Do not claim a runtime result from this map.

</details>

For more on curating current evidence, see [Context](../foundations/context.md#what-reaches-the-model). For staged investigation prompts, see [Prompting](../foundations/prompting.md#prompting-techniques-you-can-use-today).

## Follow the running call stack

**Use a real run to check the path you inferred from source.** Ask OMP to find the repository's existing launch command, debug configuration, and suitable local test input. Check what that input can change before running it; use disposable local data rather than a production request.

1. **Pause on the relevant path.** Set a breakpoint at the entry point or suspected shared function, then trigger the original action. Calling a helper directly skips the request handling you are trying to understand.
2. **Inspect the call stack and values.** Select the caller frames and inspect the arguments and relevant locals. For the renamed-account example, compare the identifier in the request handler with the one reaching lookup. If they differ, find the transformation before changing the lookup.
3. **Step through the decision.** Step into the call whose implementation matters, step over unrelated work, and follow the return or error back to the boundary that produces the visible result. Record which branch actually ran.
4. **Keep the evidence.** Save the launch configuration or command, input, relevant frames, observed values with secrets removed, and result. Distinguish the path you observed from paths you only read.

Use OMP's debugger tools when available in the session. Otherwise, use your editor's debugger and give OMP the relevant, sanitized stack and values to compare with its source map. The [VS Code debugging guide](https://code.visualstudio.com/docs/debugtest/debugging) shows breakpoints, frame selection, variable inspection, and stepping; the repository's runtime and debugger determine the exact setup.

**A call stack is a snapshot, not the whole feature flow.** A queue, another process, or an asynchronous handoff may start a different stack. Correlate the producer and consumer using an existing request/event identifier and logs or traces; inspect each side separately. Do not draw an uninterrupted call chain across that boundary without evidence.

**Breakpoint not hit?** Check the process, input, active configuration, current build/source mapping, and whether the debugger bound the breakpoint before concluding that the function is unused.

```text
Check the source map of [feature slice] against a local run.
Do not edit product code.

First find the existing debug setup and propose the smallest input.
Explain any state it changes before running it.
With the approved setup, pause at [entry point or suspected boundary].
Inspect the actual caller frames, relevant arguments, and return/error path.

Report the command/configuration, input, observed path, and result.
Compare them with the source map. Mark unobserved branches and async/process
boundaries. Redact secrets. If debugging is unavailable, name the missing
prerequisite rather than inventing a stack or a successful run.
```

## Turn checked feature slices into a codebase wiki

**We can have OMP create the wiki, not just read one.** Start with one useful feature page in the repository's existing documentation or wiki. If there is no structure yet, a Markdown index and one linked page are enough; a new documentation framework is not the task.

For the account-lookup slice, the page should explain the behavior, entry points, important data transformations, normal and failure paths, and the checks someone can run. Link the important claims to source paths and symbols. Include the inspected revision or working-tree state, the date checked, and what remains unknown. Use revision-pinned source links where available; line numbers alone drift.

```text
Turn our checked trace of [feature slice] into a wiki page at [docs path].
Use the existing documentation format and link it from the existing index.
If neither exists, create only a small Markdown index and this feature page.
Do not change product code or add a documentation framework.

Explain the behavior, entry points, important rules, data flow, and failure
path. Link each important connection to its source files and symbols.
Include the actual run/check instructions and observed results; mark anything
not run. Record the source revision or local changes and date inspected.
Keep unknowns visible. Do not fill gaps with plausible architecture.
```

Open the page yourself. Follow one source link and use its instructions to find the entry point or repeat the check. If it only lists filenames, it is not yet a useful feature explanation.

Grow the wiki one checked slice at a time, linking related features and shared concepts. Update the affected page when behavior changes. Before making a code change, have the agent reopen the linked source: the wiki is a guide to the code, not authority over it. See [Artifacts](../foundations/artifacts.md#one-small-handoff-artifact) for keeping durable evidence useful to the next session.

## Choose an interactive view when it helps

**Start with the cited trace in OMP.** Add an interactive view when it makes a relationship easier to inspect or gives a teammate a useful way to explore. A generated diagram is another claim to verify, not evidence that the agent understood the whole repository.

<div class="setup-platforms">
<details>
<summary><strong>Build a local code explorer</strong><span>Turn a checked source map into a small interactive artifact.</span></summary>

Anthropic's official [Playground skill](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/playground/skills/playground/SKILL.md) includes a [code-map template](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/playground/skills/playground/templates/code-map.md). It specifies a single HTML file with an SVG map, layer and relationship filters, zoom, and component comments that become a copyable follow-up prompt. This is an inspectable generation procedure—not a prebuilt repository index or a built-in OMP command.

You do not need to install the plugin to try a smaller version. After checking the source map, use this optional prompt in OMP:

```text
Turn the checked map of [one behavior] into a self-contained HTML explorer
at [scratch output path]. Write only that artifact; leave product code alone.
Use at most eight important components. Let me select a component to see
its responsibility, file paths, symbols, and evidence for its connections.
Include a normal-path view and one failure-path view. Mark unknown edges.
Show the repository revision or source state used.
Use inline assets, no external dependencies or network requests.
Do not upload source. Do not invent a connection to make the diagram tidy.
```

Open the artifact, select one component, and check one displayed relationship against the source. If the map only repeats names without exposing its evidence, it has not made investigation easier. Keep the text trace when it is already sufficient.

Local HTML means the output can be viewed locally; it does **not** mean that generating it with a hosted model keeps the model input on your machine. Follow the [data-boundary guidance](security-and-data-boundaries.md) before including private code.

</details>
<details>
<summary><strong>Explore an existing public repository</strong><span>Choose a source-linked wiki or a clickable graph—not a new installation checklist.</span></summary>

| Tool | When we would use it | What to check |
| --- | --- | --- |
| [GitDiagram](https://github.com/ahmedkhaleel2004/gitdiagram) | A graph-first overview with components that link to GitHub files or directories. Useful for choosing the next area to inspect. | Its generated maps use bounded source samples and can be cached. Check the generation date and verify an edge; it is not a complete call graph or a general Q&A wiki. |
| [Google Code Wiki](https://developers.googleblog.com/introducing-code-wiki-accelerating-your-code-understanding/) | An alternative combining generated documentation, Gemini chat, code links, and architecture/class/sequence diagrams. | Google's launch guide describes a public-repository preview. Check current access and refresh status; do not assume private/local support from the launch announcement. |

For a lightweight visual alternative to the earlier exercise, open the existing [React diagram in GitDiagram](https://gitdiagram.com/facebook/react). Enable zoom, choose one component, and follow its source link. Record the same three lines: **Observation, Inference, Check**. A working source link establishes where to investigate—not that every arrow is correct. You do not need to regenerate the diagram or provide a token.

If you prefer wiki Q&A, ask one narrow question in an already indexed public repository and check one cited connection. If the service is unavailable or asks you to index/upload something, return to OMP and the earlier local-repository exercise. Don't send private source, credentials, or internal logs to a public service for this lesson.

</details>
</div>

## Before you move on

Can you explain one feature slice, point to its source, and distinguish what you observed at runtime from what you inferred? If you created a wiki page, can another engineer use its links and check instructions? That is enough to choose the next investigation. It is not yet proof that a proposed fix works.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Borrow investigation prompts from the people building and using coding agents.</span></summary>

- [Common workflows: understand new codebases](https://code.claude.com/docs/en/common-workflows#understand-new-codebases) — Anthropic. Follow the progression from overview to feature discovery and execution flow, including domain vocabulary and precise code navigation. Use the prompt patterns in OMP; Claude Code's launch commands and plugins are separate.
- [The `code-explorer` agent prompt](https://github.com/anthropics/claude-code/blob/main/plugins/feature-dev/agents/code-explorer.md) — Anthropic. Read the actual procedure and output contract: entry points, data transformations, layers, side effects, file-and-line citations, and essential files to inspect. Narrow its scope to your question rather than requesting a whole-repository audit.
</details>
</div>
