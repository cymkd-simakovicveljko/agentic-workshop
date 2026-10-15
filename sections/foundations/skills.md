# 2.7 Skills

A skill packages instructions the agent can load when needed: how to investigate a failure, review a design, build an interface, or explain a result.

This lesson builds a small handoff skill, compares it with an ordinary request, and then examines skills for other work.

## First, make a handoff you can trust

Imagine a teammate needs to continue your work. They need to know what changed, what was checked, and what remains uncertain. A polished summary that quietly turns “should work” into “verified” is a bad handoff.

### 1. Try an ordinary request

Start OMP in a scratch project you own. Use a fresh session, keep your chosen model and effort setting, and send this prepared example:

```text
Turn these work notes into a short handoff for a teammate.
Use only the notes; do not run commands or change files.

Notes:
- Changed CSV export to quote fields containing commas.
- Ran npm test -- csv; it exited 0.
- The download should work in Safari now, but I did not try it.
- Older clients have not been checked. Preserve the current CSV columns.
```

**Predict before reading:** which claim must remain unverified? Then save or copy the answer somewhere you can compare it later. These notes are exercise inputs, not a record of commands we ran.

### 2. Package the procedure

In the same scratch project, create the skill directory from your terminal:

```sh
mkdir -p .omp/skills/handoff-brief
```

Create `.omp/skills/handoff-brief/SKILL.md` in your editor with this content. If that path already contains your work, use a different skill name and directory rather than replacing it.

```markdown
---
name: handoff-brief
description: Turn supplied work notes into a handoff with evidence and open questions.
disable-model-invocation: true
---

# Handoff brief

Use only the supplied notes. This is a writing task; do not run commands,
change files, or infer missing results.

1. Identify what changed and which observations support it.
2. Separate completed checks from planned checks and unverified claims.
3. Write four short sections: Changed, Evidence, Unknowns, Next action.
4. For missing information, say "not recorded". Keep exact commands,
   errors, and compatibility constraints when provided.
5. Propose the smallest next action supported by the unknowns. If the
   notes establish no remaining work, say so rather than inventing a task.

Before finishing, check that every claimed success has an observation
in the supplied notes. "Should pass" is not a recorded pass.
```

The procedure belongs in the skill. Today's CSV notes do not. Keeping the inputs separate lets you reuse the same skill for a deployment handoff or a bug investigation.

### 3. Invoke it explicitly

Exit OMP and start it again from the scratch project so it discovers the new skill. Use a fresh conversation with the same model and effort setting. Enter this **inside OMP**, not your shell:

```text
/skill:handoff-brief Turn these work notes into a short handoff for a teammate.
Use only the notes; do not run commands or change files.

Notes:
- Changed CSV export to quote fields containing commas.
- Ran npm test -- csv; it exited 0.
- The download should work in Safari now, but I did not try it.
- Older clients have not been checked. Preserve the current CSV columns.
```

If the command is missing, check the troubleshooting section below before rewriting the skill. Skill commands must be enabled in OMP.

### 4. Compare the useful differences

Do not grade the headings. Check the content:

- Did it preserve the exact test command and its recorded result?
- Did Safari and older-client compatibility remain unverified?
- Did it preserve the constraint on CSV columns?
- Can the next person tell what to check without reconstructing the conversation?

The ordinary request may already do this well. That is a valid result: a skill earns its place through useful reuse, not by making every first answer look worse. This small comparison is a learning exercise, not a controlled model benchmark.

<div class="setup-platforms">
<details>
<summary><strong>Try the awkward case</strong><span>Does the procedure preserve missing evidence instead of filling it in?</span></summary>

Invoke the same skill with these notes:

```text
The export fix is ready. Tests should pass. No command output was saved.
```

**Notice:** “ready” is the author's claim; there is no recorded test pass. The handoff should expose the missing evidence, not invent a command, result, or bug. Now try notes that genuinely establish completion. Does it stop, or invent more work because it has a “Next action” heading?

If it mishandles either case, change the relevant instruction and repeat both cases. Keep the revision only if it addresses the problem without losing useful behavior.

</details>
</div>

## What you just built

The simplest package is a directory containing `SKILL.md`; larger ones can include references, examples, and scripts.

In OMP, there are three separate events:

<div class="course-flow" aria-label="Skill discovery and use">
<span>Discover metadata</span><span aria-hidden="true">→</span><span>Load instructions</span><span aria-hidden="true">→</span><span>Apply to the task</span>
</div>

The **name and description** help identify and select the skill. The **body** describes the procedure. The **current task** supplies the actual inputs. Finding a skill does not mean its body was loaded; loading it does not prove the agent followed it.

Our example uses `disable-model-invocation: true` so we choose when to apply it. OMP hides it from the model-facing catalog, but it remains explicitly accessible. That flag is not a permission boundary.

### Put guidance in the right place

| You need… | Use… | Example |
| --- | --- | --- |
| A result once | An ordinary prompt | Explain this error. |
| A reusable prompt shortcut | A Markdown command | Insert a familiar task brief with arguments. |
| Conventions across this repository | `AGENTS.md` and project documentation | Which build command and compatibility rules apply. |
| A procedure for a recognizable task | A skill | Turn work notes into an evidence-based handoff. |
| A repeatable operation or enforced check | A script, test, or tool | Parse a file or reject an invalid record. |
| Access to an external system | A suitable tool or integration | Read an issue from the tracker. |

**Skills can guide tool use; they do not create the tool or grant access.** Our handoff skill is text-only. A document-generation skill may ask the agent to run Python, and a deployment skill may ask it to publish something. Inspect those actions before adopting the package.

## Four skill packs, four starting points

Once a procedure helps, it is natural to ask what other engineers have packaged. We will look at four: **Matt Pocock's skills, Addy Osmani's Agent Skills, Lauren Tan's pstack, and Jesse Vincent's Superpowers.** This is our shortlist, not an industry ranking.

These packs connect to the **software development lifecycle (SDLC)**: understanding a need, designing a solution, building it, checking it, delivering it, and looking after it. The [Rules for working with agents](../engineering-workflows/index.md) chapter turns selected ideas into expectations for everyday work. Here, we are looking at how people package those ideas as instructions for agents.

**Start with the failure you want to prevent.** Are you building the wrong thing, skipping checks, or losing track of a long change? Read the relevant procedure before adopting the author's whole workflow.

<div class="community-voices">
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/28293365?v=4&amp;s=96" alt="" width="48" height="48" loading="lazy" referrerpolicy="no-referrer"><div><strong>Matt Pocock</strong><span>Creator of Total TypeScript · Author of mattpocock/skills</span></div></figcaption>
<p><strong>Start by agreeing on what we are building.</strong> Pocock's <a href="https://github.com/mattpocock/skills">pack</a> favors small procedures you can combine and adapt. Grilling exposes unresolved decisions; domain modeling establishes shared terminology and records consequential choices in architecture decision records (ADRs). The collection also covers implementation, debugging, tests, and review—it is not only an interview toolkit.</p>
<p><strong>We would start here when:</strong> a request sounds clear until we ask about duplicates, permissions, or partial failure. Read the underlying <a href="https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md">grilling procedure</a>, not just its <code>grill-me</code> wrapper.</p>
<p><a data-youtube-embed href="https://www.youtube.com/watch?v=-QFHIoCo-Ko"><strong>Full Walkthrough: Workflow for AI Coding — Matt Pocock</strong></a> — AI Engineer. A hands-on workshop on turning requirements into plans, building vertical slices, and working with coding agents using TDD.</p>
<p class="voice-source"><a href="https://github.com/mattpocock">Creator profile and portrait source</a></p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/110953?v=4&amp;s=96" alt="" width="48" height="48" loading="lazy" referrerpolicy="no-referrer"><div><strong>Addy Osmani</strong><span>Former engineering director at Google · Author of Agent Skills</span></div></figcaption>
<p><strong>Make the steps and checks explicit.</strong> Osmani's <a href="https://github.com/addyosmani/agent-skills">Agent Skills</a> uses a familiar sequence: Define, Plan, Build, Verify, Review, Ship. Specifications lead to small implementation tasks, with checks between slices. Supporting skills cover areas such as performance, observability, and migration.</p>
<p><strong>We would start here when:</strong> a team needs a recognizable workflow and wants to inspect what each stage should produce. Its <a href="https://github.com/addyosmani/agent-skills/blob/main/skills/doubt-driven-development/SKILL.md">doubt-driven development</a> procedure also asks a fresh-context reviewer to challenge an artifact against its requirements during the work—not only at the final review.</p>
<p><a data-youtube-embed href="https://www.youtube.com/watch?v=2fyPnxKu8ZM"><strong>From Chrome DevTools to AI Engineering, with Addy Osmani</strong></a> — <a href="https://newsletter.pragmaticengineer.com/p/from-chrome-devtools-to-ai-engineering">The Pragmatic Engineer</a>. On agent workflows, feedback loops, and retaining human judgment. <a href="https://www.youtube.com/watch?v=2fyPnxKu8ZM&amp;t=3783">The agent discussion starts at 1:03:03.</a></p>
<p class="voice-source"><a href="https://github.com/addyosmani">Creator profile and portrait source</a></p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://react.dev/images/team/lauren.jpg" alt="" width="48" height="48" loading="lazy" referrerpolicy="no-referrer"><div><strong>Lauren Tan, known as poteto</strong><span>Engineer at Cursor · React Compiler contributor</span></div></figcaption>
<p><strong>Investigate deeply and show that the result works.</strong> Tan's <a href="https://github.com/cursor/plugins/tree/main/pstack">pstack</a> routes tasks through engineering playbooks. It combines code investigation, architecture, implementation, runtime verification, and review. Arenas compare alternative attempts; multi-model reviews use different models to examine the work.</p>
<p><strong>We would start here when:</strong> a change has unclear consequences or a difficult bug needs evidence rather than another guess. It is not just a post-build checker: <a href="https://github.com/cursor/plugins/blob/main/pstack/skills/architect/SKILL.md">architect</a> works on the design before implementation. Its larger workflow is built around Cursor; selected procedures need adaptation for OMP.</p>
<p><strong>Video interview:</strong> <a data-youtube-embed href="https://www.youtube.com/watch?v=MN9dGgmLyso">Lauren Tan on working with coding agents</a> — a live conversation with Matt Pocock about using agents to deliver engineering work. This is an interview rather than an audio podcast episode.</p>
<p class="voice-source"><a href="https://react.dev/community/team#lauren-tan">React team profile and portrait source</a></p>
</figure>
<figure class="voice-card">
<figcaption><img src="https://avatars.githubusercontent.com/u/45416?v=4&amp;s=96" alt="" width="48" height="48" loading="lazy" referrerpolicy="no-referrer"><div><strong>Jesse Vincent</strong><span>Creator of Superpowers · Co-founder of Keyboardio</span></div></figcaption>
<p><strong>Follow a connected workflow instead of jumping straight to code.</strong> Vincent's <a href="https://github.com/obra/superpowers">Superpowers</a> links design conversations and approval, implementation plans, test-driven development, review, and verification. Its <a href="https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md">verification-before-completion</a> procedure asks for fresh evidence before claiming success.</p>
<p><strong>We would start here when:</strong> we want a more prescribed path from an idea to a reviewed change. The tradeoff is more workflow to understand and adapt. Its <a href="https://github.com/obra/superpowers/blob/main/docs/porting-to-a-new-harness.md">porting guide</a> distinguishes reusable instructions from the hooks and tool mappings needed to make the full system work in another harness.</p>
<p><a data-youtube-embed href="https://www.youtube.com/watch?v=6YltXh12W-g"><strong>Superpowers: How Jesse Built the #1 AI Claude Code/Codex Plugin — and Stopped Writing Code</strong></a> — Larridin · 49 minutes. On the workflow behind Superpowers: specifications, brainstorming, review loops, and subagents checking each other's work.</p>
<p class="voice-source"><a href="https://blog.fsck.com/about/">Creator biography</a> · <a href="https://github.com/obra">Portrait source</a></p>
</figure>
</div>

### How the approaches differ

All four care about requirements, code quality, and verification. The distinction is emphasis, not exclusive ownership of a stage.

| Pack | What we would borrow first | What to check before using it in OMP |
| --- | --- | --- |
| **Pocock** | Clarify decisions and establish shared language before implementing. | Some entry points call other skills through a host-specific tool. Spec workflows may also need issue-tracker setup. |
| **Osmani** | A lifecycle with explicit outputs and checks between small changes. | Keep shared reference files as well as skill bodies. Command wrappers and reviewer roles depend on the host. |
| **pstack** | Investigate the code, compare approaches, and verify the real result. | Cursor modes, model configuration, subagents, and companion tools do not transfer just because the instructions are Markdown. |
| **Superpowers** | A connected design, approval, planning, TDD, and review workflow. | Copying skill files is not the same as installing its session-start integration and adapting its tool calls. |

**These are instructions, not enforcement.** A skill that says “do not continue until tests pass” can guide an agent. It does not replace a CI check that actually blocks a merge. Nor does adding another reviewer guarantee that the reviewers have different blind spots.

### Match the process to the stakes

For this workshop, we would use:

- **A small, low-risk edit:** a clear request and a direct check of the result.
- **A bounded feature:** settle the uncertain behavior, implement a small slice, and check it.
- **A large or fuzzy change:** agree the scope and design, split the work, and verify each part before continuing.
- **A security-sensitive or hard-to-reverse change:** add the relevant specialist review, explicit approval, and recovery plan.

The stakes matter more than the line count. A one-line permission change can need more scrutiny than a new page.

**Installing is not the same as loading.** OMP normally exposes lightweight skill metadata and loads a body when needed. Installing a collection does not automatically put every instruction into context. Loading overlapping workflows can still add cost and conflicting directions; dependencies and selection rules also need attention.

Rob Shocks's comparison, “Pocock vs Pstack vs Osmani: Which Skill Pack Wins?”, prompted this section; Superpowers is an additional comparison. [Research notes, inspected revisions, and portrait credits](../../research/2026-10-09-engineering-skill-packs.md) record the primary sources behind it. We have not benchmarked these four packs against one another.

## Choose another kind of skill

Read the linked source before installing a recipe. These examples are source-based, not benchmarks of every package or its author.

<div class="setup-platforms">
<details>
<summary><strong>Communication: make explanations easier to act on</strong><span>Use when the answer is correct but hard to read or use.</span></summary>

Try [clear-cut](https://github.com/cymkd-simakovicveljko/clear-cut) for compact explanations that retain connections, uncertainty, and decisions you own. Its package is a single instruction file with no runtime dependencies.

Two alternatives emphasize different things: [i-have-adhd](https://github.com/ayghri/i-have-adhd) asks for action-first, focused answers; [caveman](https://github.com/JuliusBrussee/caveman) emphasizes compressed wording. Inspect the skill itself rather than installing an entire plugin or proxy just to change the writing style.

**Try:** ask for an explanation of a real retry, caching, or timeout decision, then repeat with one communication skill in a fresh session. Keep the same question and supporting material.

**Notice:** can you still see why the recommendation works and when it would be wrong? A shorter answer that drops an important condition is not an improvement. Select one voice at a time rather than stacking conflicting preferences.

</details>
<details>
<summary><strong>Clarification: expose decisions before implementation</strong><span>Use when you know the problem but have not settled the approach.</span></summary>

Start with Matt Pocock's [grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) for an interview about a plan. Its [grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) entry point only calls a host-specific `Skill` tool to load `grilling`; copying that wrapper alone into OMP is not enough. Load the underlying procedure with OMP's skill mechanism.

**Try:** bring a real proposal such as “add bulk import” and ask the agent to inspect the existing behavior before interviewing you. Decide how duplicates, partial failures, and retries should work before authorizing implementation.

**Notice:** good questions uncover choices that change the result. Asking you to recite facts already available in the repository is not useful clarification. Skip an extensive interview when the behavior and boundaries are already settled.

</details>
<details>
<summary><strong>Debugging: stop accumulating guesses</strong><span>Use when successive fixes have not explained a real failure.</span></summary>

The [diagnosing-bugs skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md) structures investigation around evidence and hypotheses rather than another speculative edit.

**Try:** supply a real failing command, its output, and the expected behavior. Ask for a reproducible case and a discriminating check before a fix. If you do not have a failure, choose a different recipe instead of inventing one for the exercise.

**Notice:** did a check rule a hypothesis in or out? Did the final check exercise the original failure? More logging and a confident explanation are not evidence that the cause was found.

</details>
<details>
<summary><strong>Test-first work: define behavior before building it</strong><span>Use when an observable rule is settled but its implementation is not.</span></summary>

The [tdd skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md) gives a test-first procedure with supporting reference material. It asks you to agree the public boundaries under test and references `codebase-design` when those boundaries need design work; preserve those dependencies and adapt host-specific skill calls.

**Try:** choose a small real behavior change, such as rejecting duplicate identifiers during import. Agree the observable contract, then ask the agent to demonstrate a relevant failing check before implementing the behavior.

**Notice:** would that check fail for a plausible incorrect implementation? A test that only echoes a mock or checks an internal helper call can pass while the user's problem remains. The skill cannot decide an unresolved product rule for you.

</details>
<details>
<summary><strong>Review: check a change against something concrete</strong><span>Use when you have a real baseline and requirements to review against.</span></summary>

The [code-review skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md) separates repository standards from the requested behavior.

**Try:** supply an existing commit or branch baseline and the originating issue or specification. Ask for findings with source locations and consequences, including “none found” when appropriate.

**Notice:** did it inspect the intended changes and real callers? This workflow compares the fixed point with committed `HEAD`, excluding staged, uncommitted, and untracked work, and uses parallel subagents for standards and specification reviews. Choose it when those inputs and capabilities are available. A finding must survive inspection; it is not automatically a repair instruction.

</details>
<details>
<summary><strong>Frontend work: compare design guidance with performance guidance</strong><span>Use when building or reviewing an actual interface.</span></summary>

Anthropic's [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) addresses visual design and implementation. Vercel's [React best practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) addresses React and Next.js performance. These solve different problems.

**Try:** use a disposable branch to improve one existing screen. Give it a user task and preserve the current behavior. Choose design guidance for a weak visual hierarchy, or performance guidance for a relevant React/Next.js problem.

**Notice:** run the screen, try its main action, and check keyboard use and a narrow viewport. For a performance claim, inspect the affected loading or rendering behavior rather than accepting a cleaner-looking diff. Do not apply framework-specific rules to an unrelated stack.

</details>
<details>
<summary><strong>Documents: produce a real deliverable outside the codebase</strong><span>Use when someone needs a Word document, not another chat response.</span></summary>

Anthropic's [docx skill](https://github.com/anthropics/skills/tree/main/skills/docx) covers creating, reading, and editing Word files. This is a useful contrast with our text-only handoff skill: it includes scripts and has runtime dependencies.

**Try:** turn an agreed decision into a one-page Word memo with headings and a small comparison table. Work on a disposable output file. Inspect the required tooling first: its different paths use tools such as the Node `docx` package, Python, Pandoc, LibreOffice, and Poppler.

**Notice:** open or render the actual document. Check page breaks, table layout, and whether the content preserves the decision. A successful file write does not prove that the document is usable. If a required tool is missing, resolve that prerequisite or choose another recipe; do not quietly substitute Markdown for the requested Word file. Check the package's own license before adapting it.

</details>
</div>

## Other repositories worth exploring

Beyond the four engineering packs above, these collections offer useful examples for particular tasks. Start at one skill's source, not the collection's install button.

| Repository | Why we would open it | What to watch |
| --- | --- | --- |
| [anthropics/skills](https://github.com/anthropics/skills) | Examples spanning frontend design, document work, and skill creation. | Document skills can include executable helpers and dependencies. An official example is not automatic OMP compatibility. |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Focused frontend guidance, especially React/Next.js and web-interface review. | Framework and version assumptions matter; a performance recommendation needs a relevant case. |
| [cymkd-simakovicveljko/clear-cut](https://github.com/cymkd-simakovicveljko/clear-cut) | A small, readable example of packaging a communication preference. | It changes presentation and interaction, not the correctness of the underlying work. |

The [Agent Skills specification](https://agentskills.io/specification) explains the shared package format. It is a useful reference when comparing repositories, but hosts differ in discovery paths, optional metadata, tools, and invocation commands.

### Explore Poteto's pstack

Start with a specific task rather than enabling the whole `poteto-mode` workflow:

- **[`teach`](https://github.com/cursor/plugins/blob/main/pstack/skills/teach/SKILL.md):** explain how a subsystem works and why it was built that way. It builds on `how`, `why`, and `unslop`; preserve those dependencies and check what tools they require.
- **[`blast-radius`](https://github.com/cursor/plugins/blob/main/pstack/skills/blast-radius/SKILL.md):** investigate what a change could break beyond its immediate callers, then run real code to check the facts its safety depends on. This is not a read-only review: it can write and run a verification script, and references other pstack procedures.
- **[`unslop`](https://github.com/cursor/plugins/blob/main/pstack/skills/unslop/SKILL.md):** revise writing to remove filler, vague claims, and formulaic phrasing while preserving meaning. Its style rules are opinionated; keep the terminology and qualifications your audience needs.

**Try:** inspect `unslop`, load it using OMP's skill mechanism, and ask it to revise a copy of one paragraph from a real handoff or PR description. Compare the versions: is the action clearer, and did every technical fact and uncertainty survive?

**Then explore:** use `teach` for an unfamiliar subsystem or `blast-radius` for a small-looking change with compatibility risk, after reviewing their dependencies. The [pstack guide](https://github.com/cursor/plugins/tree/main/pstack/docs/guide) explains the larger workflow. Its Cursor setup is reference material, not an OMP installation recipe.

### Inspect one package before adopting it

Ask the agent to help inspect a candidate, then open the relevant files yourself:

```text
Inspect [skill source URL or local directory] without installing or executing it.
Explain when it activates, what it instructs the agent to do, and what files,
other skills, tools, scripts, or external services it requires.
Identify repository writes, network access, and publication or deployment steps.
Point to the source for each consequential behavior.
Separate portable instructions from assumptions about a particular host.
```

**Install the reviewed package, not a remembered name.** For a text-only skill, place its directory under `.omp/skills/` in your project. Preserve required references and companion files. A single copied `SKILL.md` is insufficient when it points to scripts or other skills.

Start project-local so the trial does not affect every repository. Record the upstream URL and commit you inspected. Review updates before replacing your copy. Follow the upstream license when copying or adapting it.

An installer is software too: inspect its source, destination, and selected packages before running it. A command documented for Claude Code is not automatically an OMP command. We use manual placement in the first exercise so the package and its destination stay visible.

## How OMP loads it, and where to look when it does not

<div class="setup-platforms">
<details>
<summary><strong>Layout, invocation, and supporting files</strong><span>Open this when adding a skill or troubleshooting discovery.</span></summary>

Use the simple project-local layout:

```text
.omp/
  skills/
    handoff-brief/
      SKILL.md
```

The current [OMP skills guide](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md) describes startup discovery, lightweight metadata, and loading the body through `skill://<name>` or `/skill:<name>` when skill commands are enabled.

Use explicit `name` and `description` frontmatter. Keep the name aligned with the directory. A model-selectable description should say **what the skill does and when to use it**, not “helpful engineering assistant.” Omit `disable-model-invocation: true` if you want it in the model-facing catalog. A description makes selection possible; it does not guarantee selection.

For an explicit-only skill, keep that flag. OMP also documents `hide: true`; neither spelling is access control. `skills.enableSkillCommands` is an OMP setting, not a frontmatter field.

Supporting files can be addressed through paths such as `skill://handoff-brief/references/examples.md`. Keep references relative to the skill package and tell the agent when it needs them. Neighboring files do not all become context automatically.

Restart OMP after changing discovery metadata. Duplicate names can resolve to a different provider's copy, so inspect the resolved source instead of assuming the file you edited won.

Keep skill directories directly under `.omp/skills/`. Adding a grouping level such as `.omp/skills/reviews/handoff-brief/SKILL.md` prevents normal native discovery.

From the project directory, this terminal command lets you inspect resource resolution without sending a model request:

```sh
omp read skill://handoff-brief
```

Check that it prints the file you intended. This isolates discovery from whether the model follows the procedure.

</details>
</div>

| What you notice | What to do next |
| --- | --- |
| `/skill:handoff-brief` is missing | Check the project directory, filename, frontmatter, startup refresh, and `skills.enableSkillCommands`. |
| The model never selects a skill | Check whether it is explicit-only, then inspect the description and the resolved source. Try explicit invocation before changing the procedure. |
| Changes to the skill seem ignored | Check for a duplicate name and restart after metadata changes. Use a fresh session so earlier instructions do not obscure the comparison. |
| The skill loads but a command or tool is unavailable | Inspect its host assumptions and dependencies. Rewrite the procedure for available tools or choose a compatible package. |
| Two skills pull in different directions | Test one at a time. Resolve the contradictory instructions instead of adding a third set of rules. |
| The output has the right shape but wrong facts | Check its inputs and evidence. Formatting compliance is not task success. |

**Fallback for learning:** ask OMP to read `.omp/skills/handoff-brief/SKILL.md` directly and apply its procedure to the supplied notes. That can exercise the instructions, but it does not verify skill discovery or slash invocation. Keep that distinction in your notes.

## Evaluate the skill, not just one answer

Writing a skill proposes a way of working. Compare the same task with and without it, using fresh sessions and the same model, effort, and inputs.

<div class="setup-platforms">
<details>
<summary><strong>More guidance isn't always better</strong><span>Keep an extra instruction because it helps, not because it sounds sensible.</span></summary>

> **Our takeaway:** Make every added instruction earn its place.

In an [early code-generation study by Austin et al.](https://arxiv.org/abs/2108.07732), results depended on the examples in the prompt. Adding a third example didn't improve on two in one tested setup.

That wasn't a study of modern skill packages, so it doesn't tell us how your skill will perform. It does give us a useful habit to borrow.

**Try this:** run the same task with and without the extra guidance. What became more accurate or useful—and did anything get worse?

</details>
</div>

**Check the result, not the appearance of obedience.** The right headings do not prove that a skill helps. Check preserved facts, unsupported claims, useful next steps, and unnecessary work.

The next lesson, [Evals](evals.md), shows how to build a small evaluation and check its judge before trusting the scores. Use the same ideas when assessing your skills.

### Check selection separately from execution

**Loading and helping are different checks.** Our handoff skill is explicit-only, so the exercise checks execution, not automatic selection.

For a model-selectable skill, try both:

- **A relevant request:** does the agent read the skill when it should?
- **A near miss:** does it leave the skill alone when it is not needed?

Inspect the actual reads. A successful explicit invocation does not tell you whether the description works as a trigger.


## Keep the skills that earn their place

**Make a skill from a repeated useful procedure, not from every good prompt.**

A one-line preference may belong in the request. A deterministic operation may belong in a script. Use a skill when the agent needs reusable guidance while still adapting to the task.

Maintain it from observed failures:

- **An important step was skipped:** make its completion condition checkable.
- **It applied to unrelated work:** narrow the description and try a near-miss request.
- **It buried the task in background material:** move optional detail into a reference with a clear instruction about when to read it.
- **It invented work after success:** make the stopping condition explicit.
- **It added no useful difference:** keep the ordinary request and remove the trial skill.

Fix the observed failure, then check that other cases still work. Use the approach in [Evals](evals.md) rather than accumulating instructions after every disappointing response.

Removing a skill file stops future discovery after restart; it does not erase instructions already present in an existing conversation. Use a fresh session when checking that a trial is no longer affecting the work.

## Before you move on

Keep it, revise it against a concrete failure, or remove it.

Can you explain **what the skill adds, how it gets loaded, what it depends on, and how you checked its result**? Those questions matter more than how many skills you have installed.

Next, [Evals](evals.md) checks whether a change to your instructions actually helps.

## Sources and verification scope

- [OMP skills guide](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md): current discovery and invocation documentation; check your installed version when behavior differs.
- [Agent Skills specification](https://agentskills.io/specification): package structure and portable metadata.
- The linked repository sources describe the recommended procedures. They are not evidence that those procedures improved a particular learner's result.

The local example was resolved with `omp read skill://handoff-brief` in an isolated scratch directory using OMP 18.2.9. That checks file discovery and reading, not a provider-backed comparison or successful slash-command execution. Run the guided comparison with your own connected model.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Use failures, feedback, and evals to improve a skill—not just make it longer.</span></summary>

- [Improving skill-creator: Test, measure, and refine Agent Skills](https://claude.com/resources/articles/improving-skill-creator-test-measure-and-refine-agent-skills) — Anthropic. See how test cases, skill-versus-baseline comparisons, and trigger checks help you decide whether a skill needs a change and whether that change helped.
- [Skill Creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) — Anthropic's working procedure. Follow the loop of running cases, collecting human feedback, revising the skill, and comparing again with its previous version. Borrow the method; its Claude-specific commands are not OMP commands.

In this workflow, “learning” means updating the saved instructions or scripts from observed results—not training the model. Review the change and compare results before keeping it.
</details>
<details>
<summary><strong>Optional watch: improve a skill with Skill Creator</strong><span>Compare an existing skill with a revision, then inspect what actually improved.</span></summary>

<a data-youtube-embed href="https://www.youtube.com/watch?v=WplS5lycPHM"><strong>Build Better AI Agent Skills With Skill Creator v2 from Anthropic</strong></a> — Debbie O’Brien · **34 minutes**.

Follow a README-writing skill through test cases, baseline comparisons, feedback, and trigger tuning. The demo uses VS Code; watch for the improvement loop rather than copying its setup into OMP.
</details>
</div>


[Back to foundations](index.md) · [Previous: Artifacts](artifacts.md) · [Next: Evals](evals.md)
