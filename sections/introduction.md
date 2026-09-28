# Introduction

**This course will bring you up to date with agentic engineering and show you how to use AI to save time in your day-to-day work.**

If you are new to AI or mostly use autocomplete, we will start there. You will learn how to give a coding agent a task, guide its work, and check the result.

An agent can help you find your way through unfamiliar code, implement a feature, or track down a bug. It can read files, make edits, and run tests without you directing every step. The skill is knowing which work to hand over and when doing it yourself is simpler.

**Less typing does not mean less engineering.** You still decide what to build, what must not break, and whether the change is ready.

## Where this fits your work

Think about the work on your plate. These are the kinds of tasks we will learn to approach with an agent.

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

We will start by creating a small website health checker in a language you already know. Everyone gets the same task and controlled local endpoints. Then we will use your checker for changes, debugging, and review.

You will make a change, fix a bug, write a skill, and try working with subagents. Each time, you get less step-by-step help.

No AI experience needed. Bring your knowledge of code, Git, and tests. We will use OMP in the terminal; keep your usual editor.

## Why this matters in 2026

**People who built the tools you use are trying this too.**

Researchers, framework authors, and open-source maintainers are changing how they work with AI. They do not all use it the same way—or trust it with the same tasks.

These are selected firsthand accounts, not a survey of the industry or endorsements of this course.

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

[Sources, context, and photo credits](../research/2026-09-27-community-voices.md).

You do not have to copy their workflow. This course helps you try the tools on your own work and decide what is worth keeping.

## This is agentic engineering

Simon Willison [describes agentic engineering](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/) as developing software with the help of coding agents. His definition of an agent is useful:

> “Agents run tools in a loop to achieve a goal.”

That loop makes the difference. A chatbot can suggest a fix. A coding agent can apply it, run a test, see what happened, and decide what to try next—using the tools and permissions it has been given.

You can ask it to investigate a bug, implement a feature, or compare two approaches. You no longer need to choose every file read or write every edit yourself.

<section class="judgment-callout">
<p class="judgment-kicker">Before you hand over the work</p>
<h2>Abstractions matter.</h2>
<p class="judgment-lead">Less typing does not mean less engineering.</p>
<p>An agent can handle the steps without you writing every line. You still need to understand the important decisions and know how to check the result.</p>
<p><strong>You are responsible for the code you ship and the systems you build—not the LLM.</strong></p>
<p>We will work through this in <a href="health-checker/03-everyday-workflow.md">The everyday workflow</a>.</p>
</section>

[Next: Get Ready](01-get-ready.md)
