# Introduction

This workshop is about using coding agents for the engineering work you already do: investigating unfamiliar code, fixing bugs, making changes, and checking whether the result is ready.

**Producing code is getting cheaper. Understanding what it does, whether it solves the right problem, and what it might break still takes engineering judgment.**

We’ll practise directing the work, giving the agent useful context, and reviewing what it produces. The goal is not to accept more generated code. It is to complete useful work while staying in control of the decisions and the result.

## This is agentic engineering

Simon Willison [describes agentic engineering](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/) as developing software with the help of coding agents. His definition of an agent is useful:

> “Agents run tools in a loop to achieve a goal.”

That loop makes the difference. A chatbot can suggest a fix. A coding agent can apply it, run a test, see what happened, and decide what to try next—using the tools and permissions it has been given.

## The model is only part of the story

To talk to a model, you don’t need a coding agent. You can call an API or run a model locally and send it input.

In the coding interaction we’re discussing, the model produces text—including structured requests to use tools. **It cannot take action on your computer by itself.** Generating a command is not the same as running it.

That is where the **harness**, also called a **coding agent**, comes in. Claude Code, Codex CLI, and OMP are examples. We’ll use both terms for these tools; you don’t need to treat them as two separate products.

Here’s what happens when you send a prompt:

1. **The harness sends your request to the model.** Along with your prompt and relevant context, it provides definitions of the tools available for that interaction.
2. **The model responds.** Its response can include text, tool calls, or both. A tool call requests an action: read a file, create one, change some code, or run a command on your computer.
3. **The harness looks for tool calls.** If there are any, it handles the required permission checks and executes the allowed calls. The harness does the work—not the model.
4. **The harness sends the tool results back to the model.** The model can now see what the file contained, whether the command succeeded, or what error came back.
5. **The model responds again.** It may request more tool calls, which repeat the loop, or give you an answer without further actions.

This is the **agent loop**. One prompt can lead to several rounds of reading, editing, and running commands before the final reply.

## Why we’re using OMP

[OMP](https://github.com/can1357/oh-my-pi) is a fork of [Pi](https://github.com/badlogic/pi-mono), an extensible agent harness. We’re using it for two reasons:

- **Open source:** we can read the implementation, investigate its behavior, and change it.
- **Extensible:** we can add tools and workflows. OMP includes code navigation, execution, browser tools, debugging, and delegation, so we can start working before customizing the environment.

Pi and OMP make their own documentation available to the agent, so it can help write extensions for the harness it is running in.

OMP is our workshop choice, not a requirement for every project. Models, interfaces, and available tools will keep changing. We’ll learn the OMP controls we need, but the habits we practise—defining useful work, managing context, setting boundaries, and checking results—apply beyond this particular harness.

## Where this fits your work

<div class="scenario-grid">
<section class="scenario-card">
<h3>Adding a feature?</h3>
<p>Find where it belongs, plan the change, and check that existing behavior still works.</p>
</section>
<section class="scenario-card">
<h3>Fixing a bug?</h3>
<p>Reproduce it, give the agent useful evidence, and check that the fix addresses the cause.</p>
</section>
<section class="scenario-card">
<h3>Exploring a new codebase?</h3>
<p>Trace how it works. Ask focused questions and check the answers against the code before editing.</p>
</section>
<section class="scenario-card">
<h3>Starting a new project?</h3>
<p>Turn an idea into a small first version. Decide what to build before asking the agent to write code.</p>
</section>
<section class="scenario-card">
<h3>Automating work?</h3>
<p>Turn a review or routine task into a skill or script. Decide what can run on its own and what needs your approval.</p>
</section>
</div>

We will start by installing OMP and connecting a model, then use focused examples to practise different kinds of work. There is no shared project to build or carry between lessons.

You will make a change, fix a bug, write a skill, and try working with subagents. Each time, you get less step-by-step help.

## Before you start

No AI experience needed. Bring your knowledge of code, Git, and tests. We will use OMP in the terminal; keep your usual editor.

You do not need to understand transformer mathematics before starting. The optional background at the end introduces how language models generate text and how attention uses context. Start there if those ideas are unfamiliar, or return to it after your first OMP session.

## How we will work

Each practical lesson starts with a short explanation, then shows how to use the idea in OMP. You’ll try a focused task, inspect what happened, and decide whether the result is good enough. Deeper reading and videos are there when you want more background.

[Working with agents in a real codebase](engineering-workflows/index.md) connects investigation, failure recovery, verification, security, and team review through small actions and prepared examples. [Spec-driven development](spec-driven-development/index.md) takes a change from agreed requirements through planning, implementation, and verification, with supporting tools as optional depth.

## Why this matters in 2026

These selected firsthand accounts show different ways engineers use agents—not a survey of the industry or endorsements of this course.

<div class="community-voices">
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/2894642?v=4&amp;s=96" alt="" width="48" height="48" referrerpolicy="no-referrer"><div><strong>Guido van Rossum</strong><span>Creator of Python</span></div></figcaption>
<blockquote>“Some of our code is written by a so-called ‘agent’. But we don’t use ‘vibe coding’ — we stay in control where it comes to architecture and API design.”</blockquote>
<p class="voice-source"><a href="https://www.odbms.org/blog/2025/10/beyond-the-ai-hype-guido-van-rossum-on-pythons-philosophy-simplicity-and-the-future-of-programming/">October 2025</a> · Uses agents while openly criticizing AI hype.</p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/46154?v=4&amp;s=96" alt="" width="48" height="48" referrerpolicy="no-referrer"><div><strong>Kent Beck</strong><span>Creator of Extreme Programming · Pioneer of test-driven development</span></div></figcaption>
<blockquote>“I make more consequential programming decisions per hour, fewer boring vanilla decisions.”</blockquote>
<p class="voice-source"><a href="https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes">June 2025</a> · On AI-assisted development. The article discloses Augment sponsorship.</p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/1024025?v=4&amp;s=96" alt="" width="48" height="48" referrerpolicy="no-referrer"><div><strong>Linus Torvalds</strong><span>Creator of Linux and Git</span></div></figcaption>
<blockquote>“the python visualizer tool has been basically written by vibe-coding.”</blockquote>
<p class="voice-source"><a href="https://github.com/torvalds/AudioNoise/blob/71b256a7fcb0aa1250625f79838ab71b2b77b9ff/README.md">January 2026</a> · A personal audio project—not the Linux kernel.</p>
</figure>
</div>

<details>
<summary>Six more firsthand accounts</summary>

<div class="community-voices">
<figure class="voice-card">
<figcaption><img src="https://www.andrewng.org/images/andrew-ng-about-page.jpg" alt="" width="48" height="48" referrerpolicy="no-referrer"><div><strong>Andrew Ng</strong><span>Stanford adjunct professor · Founder of DeepLearning.AI · Google Brain founding lead</span></div></figcaption>
<blockquote>“This allows us to make higher-level product decisions, such as what key features to offer, where the UI needs improvement, and so on.”</blockquote>
<p class="voice-source"><a href="https://x.com/AndrewYNg/status/2071988145667928442">June 2026</a> · On agents checking their own code. Ng runs an AI education business.</p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/65632?v=4&amp;s=96" alt="" width="48" height="48" referrerpolicy="no-referrer"><div><strong>Salvatore Sanfilippo</strong><span>Creator of Redis · Known as antirez</span></div></figcaption>
<blockquote>“What changed is that in the same time span, I was able to do a lot more.”</blockquote>
<p class="voice-source"><a href="https://antirez.com/news/164">May 2026</a> · On Redis Array development, with close review and testing.</p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/2741?v=4&amp;s=96" alt="" width="48" height="48" referrerpolicy="no-referrer"><div><strong>David Heinemeier Hansson</strong><span>Creator of Ruby on Rails · Co-owner and CTO of 37signals</span></div></figcaption>
<blockquote>“They're fully capable of producing production-grade contributions to real-life code bases.”</blockquote>
<p class="voice-source"><a href="https://world.hey.com/dhh/promoting-ai-agents-3ee04945">January 2026</a> · On supervised work with coding agents.</p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/9599?v=4&amp;s=96" alt="" width="48" height="48" referrerpolicy="no-referrer"><div><strong>Simon Willison</strong><span>Co-creator of Django · Creator of Datasette</span></div></figcaption>
<blockquote>“I’m finding the scope of challenges I can take on has gone up by a significant amount because I’ve got the support of these tools.”</blockquote>
<p class="voice-source"><a href="https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/">May 2026</a> · He also warns about over-trusting agent output.</p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://karpathy.ai/assets/me_new.jpg" alt="" width="48" height="48" referrerpolicy="no-referrer"><div><strong>Andrej Karpathy</strong><span>Founding member of OpenAI · Former Director of AI at Tesla</span></div></figcaption>
<blockquote>“You're spinning up AI agents, giving them tasks in English and managing and reviewing their work in parallel.”</blockquote>
<p class="voice-source"><a href="https://twitter.com/karpathy/status/2026731645169185220">February 2026</a> · He stresses direction, oversight, and testable tasks.</p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/1299?v=4&amp;s=96" alt="" width="48" height="48" referrerpolicy="no-referrer"><div><strong>Mitchell Hashimoto</strong><span>Co-founder of HashiCorp · Creator of Ghostty</span></div></figcaption>
<blockquote>“If you give an agent a way to verify its work, it more often than not fixes its own mistakes and prevents regressions.”</blockquote>
<p class="voice-source"><a href="https://mitchellh.com/writing/my-ai-adoption-journey">February 2026</a> · His experience, not a guarantee for every task.</p>
</figure>
</div>

</details>

[Sources, context, and photo credits](../research/2026-09-27-community-voices.md).

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Keep the useful parts of agentic engineering and skip the hype.</span></summary>

- [What is agentic engineering?](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/) — Simon Willison. Define the agent loop and the human work of specifying, inspecting, and verifying software instead of treating generated code as finished.
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic Engineering. Compare workflows with agents, start with the simplest design, and use tool results and evaluation to keep autonomous work grounded.

</details>
<details>
<summary><strong>Optional watch: Engineering practices that make coding agents work</strong><span>Hear a practical coding-agent workflow from Simon Willison, with emphasis on review and verification.</span></summary>

<a data-youtube-embed href="https://www.youtube.com/watch?v=owmJyKVu5f8"><strong>Simon Willison: Engineering practices that make coding agents work - The Pragmatic Summit</strong></a> — The Pragmatic Engineer.

</details>
<details>
<summary><strong>Optional background: how language models work</strong><span>Understand the model underneath the agent: transformers first, then attention.</span></summary>

These explain the model underneath the agent. They are background for the workshop, not instructions for operating OMP. Start with the transformer overview; continue to attention if you want to understand how tokens exchange information from their context.

### Transformers, the tech behind LLMs

<a data-youtube-embed href="https://www.youtube.com/watch?v=wjZofJX0v4M"><strong>Transformers, the tech behind LLMs | Deep Learning Chapter 5</strong></a> — 3Blue1Brown.

A visual introduction to tokens, embeddings, and next-token prediction. [Read the illustrated lesson](https://www.3blue1brown.com/lessons/gpt/).

### Attention in transformers, step-by-step

<a data-youtube-embed href="https://www.youtube.com/watch?v=eMlx5fFNoYc"><strong>Attention in transformers, step-by-step | Deep Learning Chapter 6</strong></a> — 3Blue1Brown.

How attention updates token representations using surrounding context. [Read the illustrated lesson](https://www.3blue1brown.com/lessons/attention/).

</details>
</div>
