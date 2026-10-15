# Lesson reading and video picks

Initial check: 14 October 2026, covering all 19 published course pages, including overviews. Updated 15 October: replaced the Artifacts toolkit recommendation, focused Skills on iteration and evals, and made video recommendations inline players without repeating a video within a lesson.

## Selection

Each lesson ends with two readings and, where there is a strong fit, an optional watch. Prefer original authors, official engineering guides, and established technical publishers. These are editorial recommendations, not a ranking by shares or views. Technical references remain separate from the curated picks.

Source bodies were checked against the descriptions below. Video verification used publisher pages, descriptions, and YouTube metadata; no claim is made that the videos were watched in full. Another tool's workflow is not an OMP command reference. Dated comparisons and model prices are explicitly identified where they affect how a reader should use the resource.

## Readings by lesson

### [Introduction](../sections/introduction.md#go-deeper)

- [What is agentic engineering?](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/) — Simon Willison. Define the agent loop and the human work of specifying, inspecting, and verifying software instead of treating generated code as finished.
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic Engineering. Compare workflows with agents, start with the simplest design, and use tool results and evaluation to keep autonomous work grounded.

### [Getting started with OMP: from answers to action](../sections/01-getting-started-with-omp.md#go-deeper)

- [Oh My Pi README](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/README.md#install) — Oh My Pi project. See the installation options and built-in tools, and how OMP differs from the model behind it.
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md) — Oh My Pi project. Follow how omp launches and resumes sessions, selects models, and applies tool and approval settings.

### [Agentic engineering foundations](../sections/foundations/index.md#go-deeper)

- [How coding agents work](https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/) — Simon Willison. Trace the harness around an LLM, from tool definitions through returned results and the loop that lets the model continue.
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic Engineering. See the augmented-LLM building block, the workflow-versus-agent distinction, and why tool results provide ground truth for each step.

### [Models and roles](../sections/foundations/models.md#go-deeper)

- [Model selection](https://developers.openai.com/api/docs/guides/model-selection) — OpenAI API documentation. Compare models with the same inputs and keep the lightest setting that meets your quality bar, while accounting for workflow frequency and response time.
- [A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) — OpenAI. Establish a quality baseline with a capable model, then test smaller models against evals before trading quality for lower cost or latency.

### [Context](../sections/foundations/context.md#go-deeper)

- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Anthropic Engineering. Learn how system instructions, tools, history, and just-in-time retrieval become the context available to an agent at each step.
- [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://www.trychroma.com/research/context-rot) — Chroma Technical Report. See measured degradation across longer inputs and why adding more tokens is not automatically adding useful context.

### [Prompting](../sections/foundations/prompting.md#go-deeper)

- [Anthropic's Interactive Prompt Engineering Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) — Anthropic. Work through exercises on clear instructions, examples, output formats, and hallucination checks instead of collecting prompt gimmicks.
- [Reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices) — OpenAI. Compare direct instructions, delimiters, examples, and explicit constraints, including why “think step by step” is not a universal fix for reasoning models.

### [Tools and permissions](../sections/foundations/tools-and-permissions.md#go-deeper)

- [Tool approval mode](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md) — Oh My Pi. Trace how tool tiers, user policies, overrides, and safety checks are resolved for the arguments that will actually execute.
- [LLM06:2025 Excessive Agency](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM06_ExcessiveAgency.md) — OWASP GenAI Security Project. Apply least privilege, narrow tool functionality, downstream authorization, and human approval instead of trusting the model to enforce its own boundary.

### [Sessions and memory](../sections/foundations/sessions.md#go-deeper)

- [Session Operations: export, dump, share, fresh, clear, fork, resume/continue](https://github.com/can1357/oh-my-pi/blob/main/docs/session-operations-export-share-fork-resume.md) — Oh My Pi. Use the operation matrix to see which commands switch identity, rebuild context, or leave the transcript and working tree untouched.
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Anthropic Engineering. Learn why compaction alone is not continuity, and how incremental work, progress records, and clean-state checks help the next session continue safely.

### [Artifacts](../sections/foundations/artifacts.md#go-deeper)

- [Architectural Decision Records (ADRs)](https://adr.github.io/) — ADR GitHub organization. Learn when a decision record should preserve rationale, alternatives, tradeoffs, and consequences instead of turning every preference into paperwork.
- [Context Engineering for AI Agents: Lessons from Building Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) — Yichao “Peak” Ji, Manus. “Use the File System as Context” describes saving information in files and retaining paths to retrieve it; the next section explains an updated task file. This replaces Spec Kit here because the purpose is durable work and retrieval, not adopting an SDD toolkit.

### [Skills](../sections/foundations/skills.md#go-deeper)

- [Improving skill-creator: Test, measure, and refine Agent Skills](https://claude.com/resources/articles/improving-skill-creator-test-measure-and-refine-agent-skills) — Anthropic, 3 March 2026. Explains test cases, blind comparisons between skill versions or against no skill, benchmarking, and activation checks. Its reported trigger improvements are product claims, not an independently reproduced benchmark.
- [Skill Creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) — Anthropic's practical procedure. Defines realistic cases, a no-skill or old-version baseline, human feedback, revisions, repeated comparisons, and separate trigger optimization. The explicit train/test split applies to trigger optimization, not the whole output-quality loop. Its host-specific commands need adaptation for OMP.

“Learning” in this procedure updates saved skill instructions, descriptions, scripts, and evaluation records—not model weights. Keep changes because observed results justify them, not because the agent produced more instructions.

### [Evals](../sections/foundations/evals.md#go-deeper)

- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Anthropic. Separates tasks, trials, transcripts, outcomes, and code/model/human graders, then explains why capability and regression suites need different expectations.
- [Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/) — Hamel Husain. Follow a real product's progression from cheap assertions to human review and model judges, including why the judge needs its own ongoing checks.

### [MCP, plugins, and extensions](../sections/foundations/mcp-and-plugins.md#go-deeper)

- [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) — Model Context Protocol. Separates host, client, and server, then explains the data and transport layers so protocol semantics do not get confused with OMP integration.
- [Build an MCP server](https://modelcontextprotocol.io/docs/develop/build-server) — Model Context Protocol. Walks from a weather server to configuring Claude for Desktop as host, making the integration boundary and user-approval path concrete.

### [Rules for working with agents](../sections/engineering-workflows/index.md#go-deeper)

- [Vibe engineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/) — Simon Willison. Read how testing, code review, manual QA, and clear instructions become more important when an agent can produce changes quickly.
- [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey) — Mitchell Hashimoto. Start with “Reproduce Your Own Work” and “Engineer the Harness” for a practical account of learning what to delegate and giving agents ways to check themselves.

### [Spec-driven development](../sections/spec-driven-development/index.md#go-deeper)

- [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) — Birgitta Böckeler, on Martin Fowler's site. Read the distinctions between spec-first, spec-anchored, and spec-as-source, and her concerns about review overhead. The tool comparison reflects October 2025, not their current feature sets.
- [Spec-driven development with AI: Get started with a new open source toolkit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) — Den Delimarsky, GitHub. Follow the separation of specification, plan, tasks, and implementation, with human review at each step. Its commands are for Spec Kit, not OMP.

### [Key productivity tips](../sections/working-with-omp/index.md#go-deeper)

- [We improved 15 LLMs at coding in one afternoon. Only the harness changed.](https://stencil.so/blog/the-harness-problem) — Can Bölük, Stencil Labs. Read the author's experiment changing the edit interface while keeping the models fixed, and consider what a better tool could change in your own workflow.
- [OMP (Oh My Pi): AI Coding Agent with LSP, DAP Debugger, and Hashline Edits](https://betterstack.com/community/guides/ai/oh-my-pi-ai-coding-agent/) — Better Stack. Get a readable overview of OMP's integrated tools and how they fit the plan–implement–verify loop before you use the narrower controls in this section.

### [Voice input](../sections/working-with-omp/voice-input.md#go-deeper)

- [Keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md) — OMP project documentation. Check the current push-to-talk, live-voice, and remapping actions instead of relying on a shortcut copied from another terminal.
- [Settings](https://github.com/can1357/oh-my-pi/blob/main/docs/settings.md) — OMP project documentation. Learn how omp config set writes settings and how profile and project precedence affect a speech configuration.

### [Keyboard controls and steering](../sections/working-with-omp/keyboard-and-steering.md#go-deeper)

- [Keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md) — OMP project documentation. Use /hotkeys, action names, and remap rules as the source of truth when a terminal or extension changes a chord.
- [Tool approval mode](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md) — OMP project documentation. See how approval prompts, Escape, Ctrl+Q, and tool tiers interact when a turn is waiting for permission.

### [Working from your phone](../sections/working-with-omp/phone-access.md#go-deeper)

- [Collab: Live Session Sharing](https://github.com/can1357/oh-my-pi/blob/main/docs/collab.md) — OMP project documentation. Follow the browser join flow and review the difference between view-only and full-control links, including the link-as-secret trust boundary.
- [CLI reference](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md) — OMP project documentation. Compare browser access with omp join and the launch/session flags that keep the host working directory and authentication on the host.

### [Managing several agents](../sections/working-with-omp/managing-agents.md#go-deeper)

- [Agent Hub](https://github.com/can1357/oh-my-pi/blob/main/docs/agent-hub.md) — OMP project documentation. Use the roster, inspector, transcript, revive, and kill details to watch a bounded worker instead of trusting a completion label.
- [The Code Agent Orchestra - what makes multi-agent coding work](https://addyosmani.com/blog/code-agent-orchestra/) — Addy Osmani. Read the subagent sections for independent file ownership, dependency handoffs, and the review and coordination cost that makes “more agents” a decision rather than a default.

## Video decisions

| Lesson | Pick and verification | Treatment |
| --- | --- | --- |
| Introduction | [Simon Willison: Engineering practices that make coding agents work](https://www.youtube.com/watch?v=owmJyKVu5f8), The Pragmatic Engineer. Title and channel verified through YouTube oEmbed; no duration claimed. | New optional player. |
| Introduction: optional model background | [Transformers, the tech behind LLMs](https://www.youtube.com/watch?v=wjZofJX0v4M), 3Blue1Brown. The [illustrated lesson](https://www.3blue1brown.com/lessons/gpt/) covers tokens, embeddings, transformer structure, and next-token prediction; YouTube oEmbed confirms title and publisher. | Embedded in the approved optional background section, not required before starting OMP. |
| Introduction: optional attention background | [Attention in transformers, step-by-step](https://www.youtube.com/watch?v=eMlx5fFNoYc), 3Blue1Brown. The [illustrated lesson](https://www.3blue1brown.com/lessons/attention/) explains how attention updates token representations using context; YouTube oEmbed confirms title and publisher. | Embedded after the transformer overview in the same optional section. |
| Models | [Balancing accuracy, latency, and cost at scale](https://www.youtube.com/watch?v=Bx6sUDRMx-8), OpenAI DevDay 2024. Title and channel verified through oEmbed. Historical model names and prices are called out. | New optional player. |
| Prompting | [The Unreasonable Effectiveness of Prompt Learning](https://www.youtube.com/watch?v=pP_dSNz_EdQ), Aparna Dhinakaran, AI Engineer; existing lesson identifies Arize and 10:56. | Move the existing recommendation to the ending and embed it once. The separate Kent Beck talk remains in the lesson and is also now embedded rather than thumbnail-only. |
| Skills | [Build Better AI Agent Skills With Skill Creator v2 from Anthropic](https://www.youtube.com/watch?v=WplS5lycPHM), Debbie O’Brien, 34:25. The creator's metadata and [companion article](https://dev.to/debs_obrien/i-used-skill-creator-v2-to-improve-one-of-my-agent-skills-in-vs-code-fhd) describe an existing README Wizard skill, baseline comparisons, evals, review, and trigger tuning. | New inline player instead of repeating Matt Pocock's walkthrough. All four author players remain above. This is the creator's demonstration, not an Anthropic-hosted video or a general performance benchmark. |
| Evals | [Evals in AI: A Deep Dive — Tejas Kumar, IBM](https://www.youtube.com/watch?v=NdrSPm6NCdk), AI Engineer, 59:49. Metadata and the publisher's talk description match the cheap-check, judge, and calibration progression. | New optional player; retain the lesson's qualifications about agreement and thresholds. |
| MCP | [Building Agents with Model Context Protocol](https://www.youtube.com/watch?v=kQmXtrmQ5Zg), Mahesh Murag, AI Engineer, 1:44:11. Metadata and description identify the full workshop and its MCP-building topics. | New optional player; not presented as an OMP setup tutorial. |
| Rules | [Mitchell Hashimoto’s new way of writing code](https://www.youtube.com/watch?v=WjckELpzLOU), The Pragmatic Engineer, 1:58:23. The [publisher's chapter guide](https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto) identifies “How Mitchell uses AI” at 1:19:13. | New optional player with a direct chapter link. |
| Spec-driven development | [Lessons from Spec-driven Development](https://www.youtube.com/watch?v=odbNXv9xXjc), Simon Martinelli, AI Native DevCon; [Full Course: Spec-Driven Development with Coding Agents](https://www.youtube.com/watch?v=hy8UstR2NEg), Paul Everitt, DeepLearning.AI with JetBrains. Both were already verified and selected for this lesson. | Preserve both players and group them under Go deeper. |

No new video was selected for the other 11 pages. The scoped search did not establish a stronger, directly relevant full video from a primary publisher than the selected readings. In particular, generic vendor setup, keyboard, or remote-access videos would teach controls that do not belong to OMP. This is not a claim that no suitable videos exist.

## Scope of the checks

The initial 14 October check covered all 19 endings and their two reading links, with 27 resource disclosures exercised by keyboard. On 15 October, the revised Artifacts, Skills, and Prompting endings were checked on desktop and mobile; the expanded content had no horizontal overflow. Before the Introduction revision, the eight lessons recommending videos rendered 14 players, with no missing embeds or duplicate players within a page. The approved Introduction revision adds two background players; its disclosure, desktop rendering, and mobile layout were checked, and all nine community cards and five scenario cards remained present. The moved sections were absent from Getting Started while installation, connection instructions, and the harness gallery remained. Players use the existing lazy-loaded, privacy-enhanced YouTube renderer. Player rendering is not a full playback or transcript review.
