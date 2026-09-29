# 2.2 Context

**Context is the model’s working material.** Think of it as attention and short-term memory rolled into one, not literal consciousness. It contains the information the model has to work with right now.

Like ingredients in a good dish, what you put in matters. Even a capable model can struggle with missing facts, stale information, or too much noise. Choosing useful context is one of the most important skills in working well with LLMs.

<figure class="course-diagram course-diagram-wide">
<a href="/diagrams/context-harness.webp"><img src="/diagrams/context-harness.webp" width="1568" height="784" alt="The harness selects information from the user, conversation, files, knowledge sources, tools, memory, and environment to assemble context for the LLM. Responses and permitted tool actions return results to the outside world." /></a>
<figcaption>The harness assembles the context. The model responds and requests tools; the harness executes permitted actions and returns their results. Memory and external integrations depend on the setup. <a href="/diagrams/context-harness.webp">Open the full-size image.</a></figcaption>
</figure>

## Larger doesn’t mean better

Be selective about what you put into context. A model may offer hundreds of thousands of tokens, or even a million, but that is capacity, not a target to fill. Your instructions, conversation, and tool results all take up space, and the response needs room too.

Research such as [Chroma’s Context Rot](https://www.trychroma.com/research/context-rot) and [RULER](https://arxiv.org/abs/2404.06654) found performance dropping as inputs grew on the models and tasks they tested. There is no single cutoff that works for every model: 128K, 200K, or half the window is not a universal sweet spot. **Giving a model more information does not automatically make it perform better.**

<figure class="course-diagram">
<a href="https://www.trychroma.com/img/context_rot/hero_plot.png"><img src="https://www.trychroma.com/img/context_rot/hero_plot.png" width="1189" height="790" alt="Chroma’s repeated-words test: reproduction scores generally fall as input length increases for Claude Sonnet 4, GPT-4.1, Qwen3-32B, and Gemini 2.5 Flash. The horizontal axis shows input tokens on a logarithmic scale." loading="lazy" referrerpolicy="no-referrer" /></a>
<figcaption>Chroma, July 2025: four models copying repeated-word sequences. Higher scores mean more accurate copying. The horizontal axis is input tokens, not percentage filled. This is a specific test, not a coding benchmark or proof of a universal compaction cutoff. <a href="https://www.trychroma.com/research/context-rot">Read the study.</a><a href="https://www.trychroma.com/img/context_rot/hero_plot.png">Open the full-size chart.</a></figcaption>
</figure>

<aside class="judgment-callout">
<p class="judgment-kicker">Make this a habit</p>
<p><strong>Manage context throughout the task, not just when it fills up.</strong> Keep useful evidence, drop stale material, and make room before the conversation becomes cluttered. Compaction reduces older context, often by summarizing it, so the agent can keep working. We’ll cover the details in <a href="sessions.md">Sessions and memory</a>.</p>
</aside>

### Set your context threshold in OMP

**Our starting recommendation: try 40%, experiment with 30–40%, and treat 60% as the upper end until your own tasks justify more.** This is a workshop recommendation, not a research-proven optimum. Earlier compaction can lose details and add overhead, so lower is not always better either.

1. Start OMP, run `/settings`, and open the **Context** tab.
2. Keep **Auto-Compact** enabled.
3. Set **Context threshold** to **40%**. In the current source, this setting is labelled **Compaction Threshold**. It controls when OMP should start context maintenance.
4. Leave **Context tokens** at **Default** to use the percentage. For a fixed token budget, choose a value such as **100K** instead. The current source calls this **Compaction Token Limit**; a positive token limit overrides the percentage.

The distinction matters: **40% of a 1M window is still 400K tokens.** Use a fixed token limit if you want a consistent trigger across models with different window sizes. This is a maintenance trigger, not a guarantee that every request stays below that number.

Watch whether the agent keeps the important decisions and makes fewer mistakes. If compaction repeatedly drops facts you still need, adjust the setting rather than chasing the lowest number. See [OMP’s threshold settings](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/session/context-settings.ts) and [compaction documentation](https://github.com/can1357/oh-my-pi/blob/main/docs/compaction.md) for the current behavior.

## What reaches the model

Opening OMP in a repository gives the agent somewhere to work. It does not put every file into the model’s context.

<div class="scenario-grid">
<section class="scenario-card">
<h3>What you supply</h3>
<p>Your request, examples, pasted output, and supported attachments. Include the facts the agent cannot discover from the repository, such as the behavior you agreed with the team.</p>
</section>
<section class="scenario-card">
<h3>What the harness supplies</h3>
<p>System instructions, available tool definitions, applicable project guidance, and conversation history or summaries. The exact contents depend on the harness and its configuration.</p>
</section>
<section class="scenario-card">
<h3>What tools bring back</h3>
<p>File contents, search results, command output, and fetched documentation. Each result gives the model information it can use to decide what to do next.</p>
</section>
</div>

**A path is a starting point, not the file’s contents.** “Look at `src/auth`” helps the agent find the code. Reading that code is what brings it into context. The same goes for a link to a ticket or documentation page.

OMP automatically loads applicable context files such as `AGENTS.md` according to its discovery rules. Ordinary source files still need to be retrieved. See [OMP’s context-file documentation](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/context-files.md) for the exact loading rules.

## Give it a useful starting point

You do not need to assemble the whole investigation yourself. Give the agent enough to start in the right place, then let it follow the evidence.

Compare these two requests:

> Find out why access is broken. Do not edit anything yet.

Versus:

> Find out why an editor gets a 403 when saving a draft. Viewing the same draft works. Start with the save endpoint and its permission checks, then inspect the relevant tests. Editors should be allowed to save their own drafts, but not publish them. Report what explains the failure and what is still uncertain. Do not edit anything yet.

The second request adds an observed failure, a useful contrast, and the intended behavior. It does not prescribe the fix. If you know the endpoint, file, failing command, or exact error, include it. Remove credentials and personal data from logs before sharing them.

**Tell it what you know. Let it investigate what it can find.** That is a better division of work than either a vague request or a pasted copy of the entire repository.

## Choose what earns its place

Long logs, unrelated files, and abandoned plans can make the important information harder to pick out. Do not cut a necessary dependency just to save tokens, but do not add a hundred files because they might matter.

<aside class="judgment-callout">
<p class="judgment-kicker">Before you add more</p>
<h2>Could this change the next decision?</h2>
<p>A failing input, a relevant caller, or a constraint can change the investigation. Another page of unrelated logs probably will not.</p>
<p><strong>Give the agent enough evidence to work, not everything you have.</strong> Ask it to fetch more when it reaches a specific gap.</p>
</aside>

This is the practical idea behind <a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">context engineering</a>: choosing and maintaining useful information throughout the task, not just writing a clever opening prompt.

## Keep the evidence current

A file can change after the agent reads it. A summary can leave something out. A confident statement from an earlier session can simply be wrong.

- **Missing information?** Point to the relevant source, provide the fact, or let the agent ask. Do not reward a plausible guess.
- **Changed code?** Ask it to reread the affected files before relying on the old result. A passing test from before the change does not verify the new code.
- **Conflicting information?** Separate what the code does from what the requirement says it should do. Ask the agent to show the mismatch rather than silently choosing one.

Treat fetched pages, logs, and pasted text as material to inspect, not new instructions to obey. A line in a tool result telling the agent to ignore your request is not authority to do so. We will cover that boundary in [Tools and permissions](tools-and-permissions.md).

<div class="setup-platforms">
<details>
<summary><strong>Read more: context is not permanent memory</strong><span>What stays on disk and what the model can currently see are different things.</span></summary>

A saved note only helps when it is loaded. Model training does not update because you had a conversation, and a saved session does not guarantee that every earlier message is included in the next request.

Harnesses can summarize older history to make room. That keeps a task moving, but a summary can lose details. Keep important decisions and constraints in maintained project guidance, and check the original source when a detail matters.

In OMP, context-file discovery depends on where the session starts and which sources are enabled. Deeper guidance files may be listed for later reading rather than included in full. Use the [context-file reference](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/context-files.md) when something is not being loaded as expected.

For when to resume, start fresh, or compact, see [Sessions and memory](sessions.md). We do not need to configure all of that to start giving the agent better context.

</details>
</div>

## Try it: change the context, not the model

Open a repository you know. Pick one function with two or three branches and a concrete input whose result you can check yourself. Find a relevant caller or test before starting.

1. **Run a baseline in a fresh session.** Use the prompt below with your function, path, and input. Keep the answer and note which files the agent inspected.
2. **Repeat in another fresh session with the same model and effort.** Keep the repository, instructions, and available tools unchanged. Use the same prompt, but add the relevant caller or test path and any actual output you have for that input. Do not give it the first answer.
3. **Check both explanations against the code.** Did they identify the right branch, result, and error behavior? Did either invent missing details? Compare unnecessary searches and corrections, not just answer length.

```text
Explain what happens when [concrete input] is passed to [function name]
in [file path]. Use the available tools to inspect the code and its
relevant dependencies. Identify the branch taken, the result or error,
and the files supporting your explanation. Say what you could not verify.
Do not change any files.
```

**Finish with one observation:** which added fact helped, or did the agent already find it on its own? Both runs may succeed. The point is to notice which context saves useful work, not to force the first run to fail.

Next, we will turn that information into a clear request in [Prompting](prompting.md).

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Models and roles](models.md) · [Next: Prompting](prompting.md)
