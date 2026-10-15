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

### [Working with agents in a real codebase](../sections/engineering-workflows/index.md#go-deeper)

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

## Section 3 lesson additions — 15 October 2026

The five new lessons follow the existing ending pattern: retain their lightweight practice and closing decision, then offer two readings and an optional embedded video where the topic fit is strong. No new installation or course-wide exercise project is required.

### Reading selections

| Lesson | Sources and reason |
| --- | --- |
| [Codebase investigation](../sections/engineering-workflows/codebase-investigation.md#go-deeper) | Revised after content review: Anthropic's [codebase-understanding workflows](https://code.claude.com/docs/en/common-workflows#understand-new-codebases) and original [`code-explorer` prompt](https://github.com/anthropics/claude-code/blob/main/plugins/feature-dev/agents/code-explorer.md) directly teach agentic discovery. These replace the general Julia Evans source-reading article and the broader Fowler-site case study in the two-reading shortlist. |
| [Agent failure modes](../sections/engineering-workflows/agent-failure-modes.md#go-deeper) | Revised after content review: Anthropic's [common failure patterns](https://code.claude.com/docs/en/best-practices#avoid-common-failure-patterns) directly covers correction loops, context pollution, overloaded instructions, verification gaps, and endless exploration. [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) reports premature completion, incomplete handoffs, and insufficient end-to-end checks, with concrete mitigations. |
| [Verification strategy](../sections/engineering-workflows/verification-strategy.md#go-deeper) | Expanded around anti-slop review and verification. The ending now selects Addy Osmani's [Code Review in the Age of AI](https://addyo.substack.com/p/code-review-in-the-age-of-ai) and OpenAI's [Harness engineering](https://openai.com/index/harness-engineering/). Simon Willison's testing guides, original review prompts, and tool documentation appear beside the practices they support in the main lesson. |
| [Security and data boundaries](../sections/engineering-workflows/security-and-data-boundaries.md#go-deeper) | Simon Willison's [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) traces private data, untrusted content, and external communication. [OWASP Excessive Agency](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM06_ExcessiveAgency.md) distinguishes functionality, permissions, and autonomy and recommends controls outside model judgment. |
| [Team integration](../sections/engineering-workflows/team-integration.md#go-deeper) | Addy Osmani's [Code Agent Orchestra](https://addyosmani.com/blog/code-agent-orchestra/) supplies agent-specific decomposition, file ownership, and dependency-handoff examples. [GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) explains enforceable reviews and status checks. Coordination practices are selected without adopting the article's performance or optimal-agent-count claims. |

The selected source bodies were read. Recommendations describe their relevant sections, not independently reproduced results.

### Video selections and evidence

| Lesson | Pick | Verification and scope |
| --- | --- | --- |
| Codebase investigation | No video | Keep this lesson focused on the local feature-slice investigation, runtime trace, and wiki-writing prompts. |
| Agent failure modes | No video | Removed the general ACCU C++ debugging talk: it does not directly teach coding-agent failure modes. The two targeted readings are a better fit than a loosely related video. |
| Verification strategy | Inline: [Generation Is Cheap, Review Is Expensive: How to Stop Shipping AI Slop](https://www.youtube.com/watch?v=6qkzlT962es), Gabriel Martinez / AI Engineer. Ending: [Engineering practices that make coding agents work](https://www.youtube.com/watch?v=owmJyKVu5f8), Simon Willison / The Pragmatic Engineer. | Replaces the Sonar-centered ending with a practice-talk pair: review burden and unresolved decisions in the body, testing/manual demonstrations/code quality at the end. Publisher descriptions, oEmbed metadata, and author/publisher chapter links verified. See the anti-slop expansion record below. |
| Security and data boundaries | Inline: [Your Insecure MCP Server Won't Survive Production](https://www.youtube.com/watch?v=BurJvbqFr4c), Tun Shwe and Jeremy Frenay / AI Engineer. Ending: [Breaking LLM Apps — Advances in Prompt Injection Exploitation](https://www.youtube.com/watch?v=jGSs4tiH7WM), Johann Rehberger / MSRC BlueHat 2024. | Publisher pages and oEmbed verify the pair. The inline segment covers minimal returned data and narrow permissions; the ending provides historical attack demonstrations. Neither proves a current deployment secure or currently vulnerable. |
| Team integration | Inline: [How I Review AI-Generated Code](https://www.youtube.com/watch?v=As2xy_cSx00), Owain Lewis. Ending: [Engineering practices that make coding agents work](https://www.youtube.com/watch?v=owmJyKVu5f8), Simon Willison / The Pragmatic Engineer. | Metadata and publisher/author descriptions checked. Inline review layers lead to repository controls; the ending revisits evidence artifacts and maintainability. It explicitly tells readers who watched the same talk in Verification that they need not repeat it. |

The remaining videos were selected from metadata, publisher descriptions, and supporting pages—not watched in full. Those three lessons use the existing `data-youtube-embed` route and retain a direct watch link; codebase investigation and agent failure modes are reading-only.

Initial reader verification, before the investigation lesson's video was removed: all five lessons rendered two reading links, one privacy-enhanced YouTube player, and one direct watch link at 1440px and 390px widths. Both resource disclosures on each page were exercised with the keyboard at both widths; expanded pages had no horizontal overflow. Desktop and mobile screenshots confirmed the resource presentation. Full playback and learner/provider exercises were not run.

## Codebase investigation source review — 15 October 2026

The first shortlist over-weighted general code reading. The revised lesson uses agent builders' documented procedures, original prompts, and interactive tools with explicit evidence and access boundaries. The core remains a bounded investigation in OMP; optional tools do not become installation prerequisites.

### Procedures and prompt sources

- [Anthropic best practices: explore first, then plan, then code](https://code.claude.com/docs/en/best-practices#explore-first-then-plan-then-code) separates discovery from implementation. [Common workflows](https://code.claude.com/docs/en/common-workflows#understand-new-codebases) supplies overview, feature-location, execution-flow, project-vocabulary, and code-navigation prompts. The lesson adapts the sequence, not Claude Code commands.
- [Anthropic's original `code-explorer` agent](https://github.com/anthropics/claude-code/blob/main/plugins/feature-dev/agents/code-explorer.md) specifies discovery, call/data-flow tracing, architectural layers, side effects, and cited output. The lesson adds files actually inspected to its bounded source-map prompt.
- [pstack `how`](https://github.com/cursor/plugins/blob/main/pstack/skills/how/SKILL.md) gates parallel exploration by complexity; its [explorer template](https://github.com/cursor/plugins/blob/main/pstack/skills/how/references/explorer-prompt.md) explicitly requests Components Found, Flow, Files Read, Boundaries, Non-Obvious Things, and Open Questions. Both current source bodies were read. Cursor-specific agent/model configuration is not presented as an OMP feature.
- [Anthropic's official Playground skill](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/playground/skills/playground/SKILL.md) and [code-map template](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/playground/skills/playground/templates/code-map.md) specify single-file HTML, SVG maps, layer/connection filters, zoom, component comments, and prompt output. The course's eight-component, evidence-bearing explorer request is a deliberately smaller adaptation, not a claim that the plugin is installed or tested in OMP.
- [VS Code's debugging guide](https://code.visualstudio.com/docs/debugtest/debugging) was read for breakpoint, call-stack, selected-frame variable inspection, and stepping behavior. The lesson uses the learner's existing runtime/debug setup rather than prescribing a new installation or an unverified OMP command.
- The feature-slice and wiki-writing prompts are workshop recommendations: investigate one behavior across relevant layers, distinguish static relationships from observed execution, and save checked findings in the existing documentation structure. They are not recorded agent, debugger, or wiki-generation runs.

### Interactive options and boundaries

| Option | Primary evidence | Selection boundary |
| --- | --- | --- |
| GitDiagram | [Source repository](https://github.com/ahmedkhaleel2004/gitdiagram), [architecture document](https://github.com/ahmedkhaleel2004/gitdiagram/blob/main/docs/architecture.md), and [generated React artifact](https://gitdiagram.com/facebook/react.md) | Clickable architecture generated from bounded source samples; cached output is not a complete or continuously current call graph. Hosted private access requires a token and external processing; not used in the exercise. |
| Google Code Wiki | [Google's official launch post](https://developers.googleblog.com/introducing-code-wiki-accelerating-your-code-understanding/) and [public Gemini CLI route](https://codewiki.google/github.com/google-gemini/gemini-cli) linked by the project's README | Documentation, Gemini chat, source links, and architecture/class/sequence diagrams are documented. The launch post describes a public-repository preview and a proposed private/local extension; it is not evidence of current general private availability. |

Source authority and adoption are separate. The shortlist favors original maintainers and official engineering documentation. GitDiagram's first-party GitHub metadata showed 18,232 stars and 1,404 forks during research, and the live site displayed about 18.2k stars; those are public-interest signals, not correctness or service-usage measurements. No independent popularity ranking is claimed for the hosted wiki products.

### What was exercised

- The public [GitDiagram React page](https://gitdiagram.com/facebook/react) rendered an interactive graph. Enabling zoom changed its control to “Exit zoom” with `aria-pressed=true`. The React components node linked to `packages/react/src/ReactClient.js` on GitHub. This checks navigation and source-link output, not every diagram relationship.
- The Code Wiki route returned its application shell; chat and generated diagrams were not exercised. The lesson offers the local OMP activity if a hosted service is unavailable.
- No code was uploaded, private repository token supplied, indexing/regeneration requested, external package installed, or hosted Q&A query submitted. The local HTML explorer prompt is a teaching adaptation, not a recorded provider-backed generation.
- The existing `.menu-toggle` transform transition was checked in the running reader: computed duration `0.9s`, with a live hover `CSSTransition` duration of `900` milliseconds. No CSS change was needed.

## Agent failure modes source correction — 15 October 2026

Removed MIT's general debugging reading and METR's early-2025 productivity study from this lesson's shortlist. Both are legitimate sources, but neither is a direct guide to recognizing and recovering from coding-agent failure modes. Removed the general C++ debugging video for the same reason; no replacement video is required to complete the lesson.

Read the replacement source bodies:

- [Anthropic: Avoid common failure patterns](https://code.claude.com/docs/en/best-practices#avoid-common-failure-patterns) names kitchen-sink sessions, repeated corrections, oversized instructions, the trust-then-verify gap, and infinite exploration. Its adjacent session guidance describes corrective actions. The course links these as patterns to adapt, not a universal retry threshold or a claim that Claude Code rewind/reset behavior applies to OMP.
- [Justin Young: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), published 26 November 2025, reports failures in Anthropic's coding-agent web-app experiment: over-large attempts, half-finished undocumented work, premature declarations of completion, and missing end-to-end checks. It discusses incremental work, feature/progress records, and testing as mitigations. The lesson does not generalize those observations to measured failure rates across all agents or prescribe its entire harness.

The existing lesson activities and recovery guidance remain unchanged. These sources support the selected failure patterns; they do not certify a learner's run.

Checked the revised ending in the HTML reader at 1440px and 390px: the reading disclosure responds to keyboard activation, both replacement external links render, the removed video is absent, and expanded content has no horizontal overflow. This verifies presentation, not the results of following the linked workflows.

## Verification strategy: anti-slop expansion — 15 October 2026

The lesson now connects review, tests, runtime evidence, and maintainability rather than treating a green command as the whole quality check. “Anti-slop” refers to observable problems—unsupported behavior, needless complexity, weak assertions, and misleading claims—not a detector of AI authorship. The cache exercise retains its original acceptance criteria and adds explicitly prepared diff notes to distinguish a design question from a weakened behavioral check.

### Sources used in the teaching flow

- [Ryan Lopopolo, OpenAI: Harness engineering](https://openai.com/index/harness-engineering/), especially “Enforcing architecture and taste” and “Entropy and garbage collection.” The source describes copied poor patterns and replacing repeated cleanup with explicit rules. The course does not adopt its throughput claims, autonomous merging, or entire architecture.
- [Addy Osmani: Code Review in the Age of AI](https://addyo.substack.com/p/code-review-in-the-age-of-ai), especially “The PR Contract” and “Core Principles.” Used for intent, proof, risk, small changes, and targeted human judgment. Survey/vendor figures and universal coverage thresholds are not taught as workshop facts.
- [Anthropic code-review procedure](https://github.com/anthropics/claude-code/blob/main/plugins/code-review/commands/code-review.md) and [PR test-analyzer agent](https://github.com/anthropics/claude-code/blob/main/plugins/pr-review-toolkit/agents/pr-test-analyzer.md). The actual source prompts were read. Borrowed scoped review, validation of findings, behavioral coverage, and meaningful regression questions—not fixed model counts, automatic PR comments, or host-specific commands.
- Simon Willison's [First run the tests](https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/) and [Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/). Moved from an ending-only recommendation into the baseline-check and runtime-evidence sections. These are the author's working practices, not controlled measurements of agent reliability.

### Tool selection

| Tool | Primary source and scope | Limitation retained in the lesson |
| --- | --- | --- |
| Dillon Mulroy's anti-slop rules | [Original README](https://github.com/dmmulroy/anti-slop), read directly from source. Opinionated JS/TS rules using Oxlint AST and lexical-scope APIs; intended to be vendored. | No official npm package; not a TypeScript checker, behavior proof, or universal policy. Read and adapt rules before installation; no package was installed. |
| Knip | [How Knip works](https://knip.dev/explanations/how-knip-works) and [handling issues](https://knip.dev/guides/handling-issues). Entry/import graph analysis for files, exports, dependencies. | Configuration and dynamic/generated entry points affect findings. Verify reachability before deleting. |
| Stryker | [Documentation](https://stryker-mutator.io/docs/), [mutant states](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/), and [equivalent mutants](https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/). Mutate source and observe whether tests fail. | Scope the cost; a surviving mutation can be equivalent, not automatically a bug. No universal 100% target. |
| Semgrep | [Semgrep Code overview](https://semgrep.dev/docs/semgrep-code/overview). Configured syntactic/data-flow findings. | Analysis scope depends on product/configuration. Findings need inspection; no claim that a clean scan proves correct authorization or complete security. |
| Playwright | [Trace Viewer](https://playwright.dev/docs/trace-viewer-intro), [best practices](https://playwright.dev/docs/best-practices). User-visible flows plus action/DOM/network evidence. | Evidence covers the exercised browser/environment, not all paths. Existing OMP/browser checks remain the default. |
| Showboat | [Original README and help](https://github.com/simonw/showboat), read directly. `exec` captures command/output; `verify` reruns code blocks and compares output. | Editable document, executable replay, and side effects. Inspect before replay; captured output still needs to support the intended claim. |

The browser alternatives linked from Willison's guide—[Playwright CLI](https://github.com/microsoft/playwright-cli), [agent-browser](https://github.com/vercel-labs/agent-browser), and [Rodney](https://github.com/simonw/rodney)—illustrate agent-accessible browser control, not a requirement to add three tools to OMP. No external quality tool, plugin, or agent skill was installed or exercised in this course repository.

### Inline and ending videos

- **Inline:** [Generation Is Cheap, Review Is Expensive: How to Stop Shipping AI Slop](https://www.youtube.com/watch?v=6qkzlT962es), Gabriel Martinez, G2i; AI Engineer World's Fair 2026. YouTube oEmbed confirms title and publisher **AI Engineer**. The [publisher's talk page](https://ai.engineer/talks/6qkzlT962es-generation-is-cheap-review-is-expensive-stop) gives 17:17 and links its prototype-versus-readiness section at **5:25**. The lesson rounds duration to 17 minutes and asks which important decision or check the polished output leaves unresolved. The talk's ORC workflow is not a prerequisite or a measured guarantee.
- **Ending:** [Engineering practices that make coding agents work — The Pragmatic Summit](https://www.youtube.com/watch?v=owmJyKVu5f8), Simon Willison; The Pragmatic Engineer. YouTube metadata gives 28:20; the lesson rounds to 28 minutes. [Willison's own companion notes](https://simonwillison.net/2026/Mar/14/pragmatic-summit/) supply **6:13** (TDD), **7:06** (manual testing/Showboat), and **10:04** (code quality). This video also appears in Introduction; it is embedded only once on this lesson page, here with a specific verification focus.

The prior Sonar video is a legitimate vendor demonstration but was not kept as the main teaching resource. The new pair addresses judgment and practical verification without making a product installation the lesson. Selection used source bodies, publisher/author notes, and metadata—not full viewing or a controlled evaluation of the speakers' workflows.

Reader verification: the revised lesson was exercised at 1440px and 390px. All six disclosures toggled by keyboard; expanded content had no horizontal page overflow. The two copyable prompt blocks, three scrollable tables, two selected ending readings, and local heading links rendered. Two distinct video players appeared in the intended locations—Gabriel inline, Simon in the ending—with both previews visually confirmed and chapter URLs checked against the publisher/author notes. Full playback, learner/provider exercises, and the external quality tools were not run.

## Security and team-integration expansion — 15 October 2026

### Security: decisions before tools get access

The synthetic-log exercise now asks whether denying an outgoing search can undo a credential already sent to a model. It cannot. The main lesson distinguishes context minimization, approval, filesystem/network containment, downstream credentials, retained transcripts, and integration consent.

- [OMP approval-mode source](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md), read directly: `always-ask` normally auto-approves reads and prompts for write/exec, subject to tool/user policies. Bash pattern rules are approval controls, not containment, and do not automatically govern another tool's shell access. The lesson does not advertise a new OMP sandbox mode.
- [Anthropic's sandboxing engineering article](https://www.anthropic.com/engineering/claude-code-sandboxing): used for the filesystem-plus-network distinction, not its reduction-in-prompts number or a guarantee that every tool or injection is contained. The lesson requires checking the actual covered process/tool path.
- [MCP security best practices](https://modelcontextprotocol.io/docs/draft/tutorials/security/security_best_practices): read the local-server execution, consent, token handling, and authorization material. The course turns it into a preflight check of executable/endpoint, data, identity/scope, exact action, and stop/revocation path. No MCP server was installed or connected.
- Existing [lethal-trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) and [OWASP Excessive Agency](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM06_ExcessiveAgency.md) readings remain directly relevant. They are not treated as prompts that enforce access boundaries.

The new inline video is [Your Insecure MCP Server Won't Survive Production](https://www.youtube.com/watch?v=BurJvbqFr4c), published by AI Engineer. Its [publisher record](https://ai.engineer/talks/BurJvbqFr4c-your-insecure-mcp-server-wont-survive-production) credits Tun Shwe and Jeremy Frenay and supplies the **6:26** chapter on small responses and narrow permissions. YouTube metadata reports 24:33 and the publisher page 24:34; the lesson rounds to 25 minutes rather than claiming false precision. The ending retains Johann Rehberger's BlueHat talk as historical evidence of prompt-injection/exfiltration patterns. Neither video was watched in full; no payload was executed or real credential submitted.

### Team integration: ownership and enforceable review

The parallel lesson revision adds scoped delegation, separate worktrees for concurrent editing, evidence-bearing handoffs, bounded review, onboarding/context transfer, and GitHub merge controls. A branch name alone is explicitly not isolation for concurrent edits in one directory. Optional worktree commands require an agreed existing base and unused names; cleanup requires preserving work, with no routine force removal.

Primary sources read:

- [Git worktree documentation](https://git-scm.com/docs/git-worktree): separate working trees/HEAD/index with shared repository objects; not a filesystem, credential, network, or shared-service sandbox.
- [GitHub PR reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews), [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches), and [merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue). The lesson separates requested reviews from required approvals, current-revision checks from copied green badges, and merge gates from deployment authority. It notes bypass roles and the Actions `merge_group` event.
- [Anthropic code-review procedure](https://github.com/anthropics/claude-code/blob/main/plugins/code-review/commands/code-review.md) and [PR test analyzer](https://github.com/anthropics/claude-code/blob/main/plugins/pr-review-toolkit/agents/pr-test-analyzer.md): high-signal, validated findings and behavioral coverage; source procedures, not installed OMP commands.
- [Addy Osmani: The Code Agent Orchestra](https://addyosmani.com/blog/code-agent-orchestra/): selected ownership, independent-slice, and dependency-handoff examples. The course does not endorse fixed agent counts, reported speedups, universal multi-agent superiority, or the listed tools' current availability.
- [Google CL descriptions](https://google.github.io/eng-practices/review/developer/cl-descriptions.html) informed the handoff shape but is no longer a headline ending recommendation; the ending now leads with agentic coordination and repository enforcement.

Owain Lewis's [How I Review AI-Generated Code](https://www.youtube.com/watch?v=As2xy_cSx00) moves into the body. YouTube page/oEmbed verify the title/channel; metadata reports 14:20, rounded to 14 minutes. The description separates deterministic checks, local agent review, PR automation, and human judgment. The ending uses Simon Willison's [Pragmatic Summit talk](https://www.youtube.com/watch?v=owmJyKVu5f8) and his [own notes](https://simonwillison.net/2026/Mar/14/pragmatic-summit/) for **7:06** (manual testing/Showboat) and **10:04** (code quality). Readers are told not to rewatch if they already used it in Verification.

No worktree, branch rule, CI configuration, credential, deployment, or external integration was changed while authoring these lessons. Optional commands and workflows are grounded in source documentation, not a completed classroom or provider-backed run.

### Security control shortlist: verified limits

The final shortlist was checked directly against original documentation:

- [Sandbox Runtime README](https://github.com/anthropic-experimental/sandbox-runtime): standalone process wrapping with OS filesystem/network restrictions; a research preview. Its read policy is broadly permissive by default, so sensitive read restrictions must be configured. Controls on a wrapped process tree are not automatically controls on separate agent tools or model traffic. No sandbox was installed or configured.
- [Gitleaks README](https://github.com/gitleaks/gitleaks): `git`, `dir`, and `stdin` scan modes plus redaction support. The current maintainer notice says feature-complete/security-patch maintenance and points to Betterleaks for future work. The lesson recommends the existing scanner where suitable, highlights maintenance when selecting a new one, and does not equate secret-pattern detection with arbitrary confidential-data classification. No repository or credential scan was run.
- [GitHub push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection): supported repository-write paths, distinct repository/user protection, enablement requirements, and bypass privileges. This is not a filter on model context, searches, MCP payloads, or transcript sharing.

Team-integration reader verification: at 1440px and 390px, all four disclosures toggled by keyboard, expanded content had no horizontal page overflow, seven command/prompt blocks rendered with copy controls, and the ending retained two selected readings. Two distinct players appeared in the intended inline/ending positions. The inline preview and repository-control table were visually inspected; local heading anchors resolved. Worktree commands, repository rules, CI events, and provider-backed workflows were not executed.

Security reader verification: at 1440px and 390px, all six disclosures toggled by keyboard, expanded content had no horizontal page overflow, five prompt/example blocks rendered with copy controls, and the ending retained two selected readings. Two distinct players appeared inline and at the end; the new MCP talk's preview and the control-comparison section were visually inspected. Local heading links resolved and the chapter link retained `t=386s`. No sandbox, scanner, token, MCP integration, incident workflow, or provider-backed exercise was executed.
