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

## Four ways to keep context useful

Compaction makes existing context smaller. Notes and subagents help keep everything from piling into one conversation in the first place.

- **Summarize with an LLM.** Replace older conversation with a shorter account of decisions, progress, and open questions. Useful for continuing a long task, but summaries can miss details.
- **Keep notes or a handoff document.** Save important decisions, file paths, and next steps, then load what you need later. A document only helps if it stays current and the agent reads it.
- **Delegate to subagents.** Let a separate agent investigate a focused question and return findings with source references, rather than its entire transcript. This keeps the main context smaller, but adds model calls and can lose detail in the handoff.
- **Clear stale tool results.** Remove old logs and superseded file reads from active context. Keep a way to retrieve the originals when they matter again.

**Keep the decisions and evidence you still need, not every step it took to find them.**

Read: Anthropic’s [context engineering guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) and [context editing and memory overview](https://claude.com/blog/context-management).

Watch: [Claude plays Catan: Managing agent context with Sonnet 4.5](https://www.youtube.com/watch?v=BER3EhUIyz0), an official Anthropic demo of context management, not an OMP setup tutorial.

## What reaches the model

**Your message is only part of the context.** Instructions, tool definitions, loaded files, and conversation history take up space too. Opening a repository does not load all its files.

<aside class="judgment-callout">
<p class="judgment-kicker">Try this now</p>
<h3>See what is taking up space</h3>
<pre><code>/context</code></pre>
<p>Run this in OMP to see an <strong>estimated context-usage breakdown</strong>. Look at the largest categories, not just the total percentage.</p>
<ol>
<li><strong>Check a fresh session.</strong> Notice how much context is used before you ask anything.</li>
<li><strong>Check again after an investigation.</strong> What grew after the agent read files and used tools?</li>
<li><strong>Question the overhead.</strong> Are you carrying instructions or integrations this task does not need?</li>
</ol>
<p>This is a usage view, not a complete dump of everything sent to the provider.</p>
</aside>

<aside class="judgment-callout">
<p class="judgment-kicker">After bulky tool output</p>
<h3>Shake out the extra weight</h3>
<pre><code>/shake</code></pre>
<p><strong>Use this when large tool results or code blocks are crowding the session.</strong> It trims eligible content rather than asking an LLM to summarize the conversation, keeping recoverable text behind artifact references.</p>
<p>Check <code>/context</code> before and after. Manual shaking can also trim recent material, so the agent may need to retrieve details again. It is not a substitute for preserving important decisions.</p>
<p><a href="https://github.com/can1357/oh-my-pi/blob/main/docs/compaction.md#shake-method">How OMP’s shake method works.</a></p>
</aside>

<aside class="judgment-callout">
<p class="judgment-kicker">When the conversation needs reducing</p>
<h3>Compact or make a handoff</h3>
<p><strong><code>/compact</code></strong> manually triggers context compaction using OMP’s configured methods. Use it to make room before continuing a long task. For a focused LLM summary, select <code>soft</code> and add instructions: <code>/compact soft Preserve the API decisions and failing test details</code>.</p>
<p><strong><code>/handoff</code></strong> generates a handoff document and uses it to compact the current session in place. Use it when you want a structured continuation brief covering the goal, constraints, progress, decisions, and next steps. It does not start a new session or automatically create a standalone Markdown file; the document is stored as the session’s compaction summary.</p>
<p>Both reduce what the model carries forward, so check that important decisions survived. See <a href="https://github.com/can1357/oh-my-pi/blob/main/docs/compaction.md">OMP’s compaction reference</a> and <a href="sessions.md">Sessions and memory</a> for the details.</p>
</aside>

### The usual suspects

- **[AGENTS.md and CLAUDE.md](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md):** project and personal guidance. OMP loads applicable files automatically according to its discovery rules. Keep them useful, not encyclopedic. Run **`/extensions`** to inspect discovered context files, their source, and their current state.
- **[Skills](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md):** OMP normally lists names and descriptions first, then loads the full instructions when a skill is used. Installing a skill does not mean its entire body is always in context.
- **[MCP servers](https://github.com/can1357/oh-my-pi/blob/main/docs/mcp-config.md):** exposed tool definitions, server instructions, and returned results can all add context. Connecting a server does not load its whole database, but a large tool catalog can still add overhead before any calls.
- **System instructions and built-in tools:** the harness supplies the model’s operating instructions and tool definitions. They are context too. The harness itself is the software that runs the tools, not the text describing them.
- **Your conversation:** prompts, attachments, earlier answers, and summaries. Old plans still take up space if they remain in the active context.
- **Retrieved material:** source code, documentation, logs, test output, and loaded memory notes. A path or link is only a pointer until its contents are retrieved.

### Progressive disclosure: load details when needed

**Show what is available first. Load the detail when the task calls for it.** That is progressive disclosure, and skills are a good example:

1. The agent sees a skill’s name and short description.
2. If it fits the task, the agent reads its instructions.
3. It opens supporting references only when needed.

Use the same approach for project knowledge: short guidance pointing to focused documents beats loading every document at startup. Keep essential constraints visible; defer the detailed reference material. [Anthropic’s context engineering guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) explains this approach to retrieving context as the agent works.

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

## Stay vigilant about context

Be stricter with context than feels necessary. Old assumptions, irrelevant output, and abandoned plans pile up easily. Keep the evidence you need, but do not carry everything forward just because it is already there.

> **Remember, every word matters.**

## Try it: watch your context grow

Open a repository you know and start a fresh OMP session.

1. Run **`/context`** and note the usage.
2. Give the agent the task below, replacing the feature or endpoint.
3. Run **`/context`** again. What grew?
4. Run **`/shake`**, then **`/context`** once more. How much space did it recover?
5. Ask a specific follow-up about the code. Does the agent still have the detail, or does it need to read a file again?

```text
Trace how [feature or endpoint] works, from its entry point through
the main dependencies and tests. Use tools to inspect the code and
explain what you find. Do not change files.
```

**The takeaway:** context grows as the agent works. Reducing it can save space, but some details may need to be fetched again. If `/shake` saves little, there may not be much eligible content to trim.

Next, we will turn that information into a clear request in [Prompting](prompting.md).

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Models and roles](models.md) · [Next: Prompting](prompting.md)
