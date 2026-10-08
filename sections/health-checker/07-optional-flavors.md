# 5. Optional flavors

## How do you note down a change in your repo?

You agree on a change in chat, start working, and discover something that changes the plan. Where do you put that decision so you—or the next agent—can pick it up tomorrow?

**Start with a short change note.** Use the repo's existing issue, spec, or planning convention. If there isn't one, a Markdown file is enough. Keep the intent, decisions, and remaining work—not a transcript of the conversation.

We'll follow a note as the work changes, then look at five approaches that organize this process: FSAD, OpenSpec, Kiro, GitHub Spec Kit, and BMAD. The point is to understand what each adds, not to install five tools.

### Try it with your next change

Pick something you already intend to change. Ask OMP:

```text
Help me write a short note for this change: [describe it].
First look for how this repo already records planned changes.
Use that convention; don't introduce a new folder structure.

Include:
- why we want the change;
- what should behave differently;
- what must stay the same;
- decisions we still need to make;
- how we'll check it works.

Keep it short. Ask about missing decisions rather than inventing answers.
Don't implement the change yet.
```

For the examples below, imagine a course reader that does not yet have search. Its first note might be:

```text
Change: let readers search lesson titles.
Why: finding a lesson through the sidebar takes too long.
Behavior: typing filters the lesson list; clearing shows it again.
Keep: existing lesson URLs and keyboard navigation.
Decide: should search include headings inside lessons?
Check: matching titles, no matches, clearing, and keyboard use.
```

**Notice:** did the agent make a decision you haven't made? Did it add work you didn't ask for? Fix those parts before they become code. Keep your own note nearby; we'll return to it as we explore the approaches.

## A spec, a plan, and a task list answer different questions

“Spec” can sound more formal than it needs to be. Here, it means a description of the behavior we intend to build. A short note can be a spec if it makes that behavior clear enough to discuss and check.

It is not the same as a plan:

| Part | Question it answers | Search example |
| --- | --- | --- |
| **Intent** | Why do this? | Readers need to find a lesson without scanning the sidebar. |
| **Requirement** | What must be true? | Clearing the query restores every lesson. |
| **Design decision** | How will we achieve it? | Filter the existing lesson list in the browser. |
| **Task** | What work remains? | Connect the search input to the lesson filter. |
| **Result** | What did we observe? | A record of the case tried and what happened—not a planned check. |

This separation keeps a proposed implementation from quietly becoming a requirement. “Use a search service” chooses a design. “Find lessons by title” describes behavior. You can change the design while keeping the requirement.

You do not need five files. Start with headings in the same note. Split it when different people need to review different parts, or when one part has a different lifetime.

<aside class="judgment-callout">
<p class="judgment-kicker">Spec-driven does not mean settled forever</p>
<p><strong>Use the spec to guide implementation and review. Update it when an agreed decision changes.</strong> Writing a spec first is useful because it exposes assumptions before they spread into code. It does not mean you can discover every requirement before trying the product.</p>
</aside>

### Turn an open question into a decision

In our example, “Should search include headings?” is still open. Suppose we decide to search titles only. Replace the question with a decision and its reason:

```text
Decision: search lesson titles only.
Reason: this change helps readers find a lesson, not a passage within it.
Out of scope: heading and full-text search.
Revisit if: readers still cannot find known lessons by their titles.
```

The reason matters. Without it, the next agent may add full-text search as an obvious “improvement.” With it, the agent can see that the smaller scope was deliberate.

**Try this on your note:** choose one open question. Resolve it yourself or with the person who owns the decision. Record the answer and the reason, not the whole discussion.

## Keep the note useful while the work changes

A note is easiest to trust when it distinguishes **agreed**, **proposed**, and **observed**. These are different states, even when the same agent writes all three.

### When implementation reveals a problem

**Was the note wrong, or did the code fail to follow it?** If the note says clearing search restores every lesson but the code does not, fix the code. If nobody agreed what clearing should do, settle that first. Don't rewrite the requirement to excuse a bug.

Suppose a keyboard check reveals that filtering hides the link that currently has focus. “Preserve keyboard navigation” was too vague to tell us what should happen next.

Do not ask the agent to silently choose and rewrite the requirement to match its code. Ask for the decision first:

```text
We found this while checking [change]: [observed problem].
Read the change note and the affected implementation.
Explain which requirement is unclear or no longer fits.
Recommend the smallest adjustment and name the behavior it changes.
Don't change the agreed requirement or implementation until I decide.
```

Suppose we agree on this policy for our example: if a filter update would hide the focused lesson link, move focus to the search input before hiding it. Otherwise, leave focus alone. This gives the reader a way to change the query without sending them to an arbitrary lesson.

The decision now changes four parts of the note:

| Part | Updated note |
| --- | --- |
| **Requirement** | A filter update must not leave focus on a hidden lesson. If the focused lesson disappears, focus returns to the search input. |
| **Design** | Before hiding links, check whether the active element is a lesson link that will disappear. Move focus only in that case. |
| **Remaining task** | Add that focus handling to the existing filter update. Keep completed title matching and clearing behavior. |
| **Check** | With a lesson link focused, apply a query that excludes it: focus should reach the input. Repeat with a query that keeps the link: focus should stay on it. |

The second check matters: moving focus to the input on *every* update would pass the first check while introducing a different problem. Also try normal typing in the search input; focus should remain there. These are proposed checks, not reported results.

This is one policy for the hypothetical reader, not a universal accessibility rule. In your product, first establish how a filter update can occur while a lesson link has focus. If that state cannot occur, do not add handling just to match this example.

**Notice:** does the revised plan retain completed work and unchanged constraints? A freshly generated plan can look tidy while losing both.

### When another session takes over

“Search is mostly done” is not enough to continue safely. Leave a handoff that names the remaining action:

```text
Agreed: title search only; existing lesson URLs stay unchanged.
Focus decision: return to the search input only if the focused link will hide.
Work to inspect: [branch or commit and relevant files].
Checks run: [actual cases and results, or "not run"].
Remaining: implement the focus decision and run both focus cases.
Next: inspect the filter update; retain completed matching and clearing work.
```

This is a template, not a claim that the example has been implemented. Fill it from the actual work. Point the next session to the note and ask it to compare the note with the current files before continuing. The [Context lesson](../foundations/context.md) explains why saving a file does not mean an agent has read it.

That is the basic loop: agree, build, learn, update, continue. The approaches below give parts of that loop more structure.

## Five approaches, five useful differences

These are not five competing Markdown templates. FSAD organizes collaboration; OpenSpec organizes changes; Kiro integrates spec work into an IDE; Spec Kit packages reusable processes; BMAD helps choose a planning path.

| Approach | Where to look first | What you take on |
| --- | --- | --- |
| **FSAD** | Shared decisions across product, design, and engineering | Coordination and review of parallel work |
| **OpenSpec** | Current behavior versus proposed changes | Spec updates and change-folder maintenance |
| **Kiro specs** | Requirements, design, and tasks in the IDE | Kiro and its project documents |
| **GitHub Spec Kit** | Repeatable processes across changes | Tool setup, templates, and shared rules |
| **BMAD Method** | Planning depth and division of larger work | Skill setup, path selection, and saved plans |

Open the approach closest to a problem you have. Each section explains documented behavior, then applies it to our example. **The search examples and adoption advice are ours; they are not outputs from running these tools.**

<div class="setup-platforms">
<details>
<summary><strong>FSAD: agree on the change together</strong><span>Look here when the difficult part is agreement across people.</span></summary>

[Full Stack Agentic Development](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html) is a playbook for small cross-functional teams, called pods. Product, design, and engineering co-author a living spec. They then plan tasks, delegate implementation to agents, and review the result together.

The playbook describes five phases: intent, a live spec session, implementation planning, parallel execution, and human review. Its examples include `spec.md`, `plan.md`, task files, and isolated Git worktrees.

### What that changes in our example

The search question is not handed from one role to the next with a different interpretation each time. The people with different concerns resolve it together:

- **Product:** are readers finding a lesson or searching for a passage?
- **Design:** how will someone recover from no results, including with a keyboard?
- **Engineering:** can the existing lesson list support this without a new service?

Suppose product chooses “find a lesson,” design agrees that clearing the query restores the list, and engineering confirms the existing list can be filtered locally. The note now says **title search, a clear action, and no new service**. Implementation tasks can follow those decisions; neither a full-text index nor a new search endpoint belongs in the plan.

Parallel work comes later, once the boundaries are clear. UI work and an independent review may be separable; two agents rewriting the same filter are not independent just because their prompts differ.

This live agreement is worth the coordination when several people own consequential decisions. For a clear local fix, use the existing issue instead. If intent changes after work splits, the people assigning tasks must identify which assignments are now invalid.

Keep people involved without making them switch tools. Product can review the goal in an existing ticket; engineers can keep code details in the repo. Link the two. If several repos are involved, keep one shared goal and give each repo its own work item. The [InfoQ article on enterprise adoption](https://www.infoq.com/articles/enterprise-spec-driven-development/) walks through this approach.

**Read with a question:** in the playbook's “Markdown Layer,” inspect the notification-preferences example. Which lines describe user needs, which choose a design, and which need review by a different person? Its cycle-time claims are the author's claims, not workshop measurements.

</details>
<details>
<summary><strong>OpenSpec: separate what exists from what will change</strong><span>Look here when planned behavior keeps getting mistaken for shipped behavior.</span></summary>

[OpenSpec's core concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md) distinguish current specs from pending changes. `openspec/specs/` describes current behavior. Each folder under `openspec/changes/` holds a proposal, spec changes, design, and tasks for one change.

A simplified layout for our example would be:

```text
openspec/
  specs/
    navigation/        # agreed current behavior
  changes/
    add-lesson-search/ # proposed behavior and implementation work
```

The important idea is the **delta**: describe what is added, modified, or removed rather than rewriting the entire system description. For our example, the distinction is:

```text
Current: readers browse the lesson list and follow lesson links.
Added: readers can filter that list by title.
Preserved: existing lesson URLs and keyboard access.
```

That is an illustration of the distinction, not OpenSpec syntax to paste into a spec file.

### The change has a closing step

The documented flow is proposal → specs → design → tasks → implementation. Archiving folds the spec changes into the main specs and moves the completed change into an archive. This answers a question a loose collection of notes often leaves open: **when does proposed behavior become the description of the system?**

Before archiving, check the implemented behavior and resolve differences. If you decide to include headings after all, revise the pending change first; don't leave one document saying “titles only” while another silently expands it.

OpenSpec calls its artifacts “enablers, not gates.” You can revisit the proposal or design as you learn. That flexibility requires someone to keep the change coherent.

This separation earns its upkeep when several contributors need to distinguish shipped behavior from unfinished proposals. Someone still has to maintain the current specs after shipping; the CLI and coding-tool integration do not remove that responsibility.

**Read with a question:** follow the two-folder picture and archive explanation in the core-concepts guide. Where would you look for what works today? Where would you look for an unfinished proposal? Compare those answers with your own repo.

</details>
<details>
<summary><strong>Kiro: review requirements before implementation choices</strong><span>Look here when what to build and how to build it keep getting mixed together.</span></summary>

Kiro brings spec work into its IDE. Its [official walkthrough](https://kiro.dev/blog/from-chat-to-specs-deep-dive/) describes three Markdown files: `requirements.md`, `design.md`, and `tasks.md`. You can review and edit them before implementation. The walkthrough also shows project-context documents for existing codebases.

Here is how one part of our example could move through that separation:

```text
requirements.md
When the query is cleared, show every lesson again.

design.md
Keep the full lesson list; derive the visible list from the query.

tasks.md
Connect clearing the input to the filter update.
Check that the full list returns and links still work.
```

### Review each part for a different reason

In requirements, ask whether the behavior is right. In design, ask whether the approach fits the codebase. In tasks, ask whether the work will deliver and check that behavior.

Now suppose the reader moves from a static page to a server-rendered application. “Clearing the query restores every lesson” can remain valid while “derive the visible list in the browser” needs revision. That is the benefit of separating requirements from design: a technical change need not reopen an agreed product decision.

You do not always need to start with new requirements. For a change to an existing API, first check what callers already depend on. This [AWS community article](https://builder.aws.com/content/3CqAvQIUtbv3TbYaWitncAz9TGQ/beyond-prompt-to-code-why-enterprise-ai-coding-needs-spec-driven-development) shows why through an order-service example: adding an endpoint must not bypass login checks or break existing clients.

Kiro's walkthrough describes editing specs and regenerating the plan. Check which tasks the new design invalidates; document edits do not undo code already written. If you work in Kiro, these files provide convenient review points. In OMP, start with the same distinctions as headings in the existing note.

**Read with a question:** in the walkthrough's spec examples, find one user-facing requirement and follow it into design and tasks. Could you change the design without changing the requirement? The walkthrough is from July 2025; use the [current feature-spec docs](https://kiro.dev/docs/specs/feature-specs/) for current UI behavior.

</details>
<details>
<summary><strong>GitHub Spec Kit: reuse a process across changes</strong><span>Look here when the same planning and review decisions keep coming up.</span></summary>

[Spec Kit](https://github.com/github/spec-kit) is a toolkit of processes, templates, and agent skills. Its current README offers three independent entry points: feature development, bug fixing, and idea assessment. They are alternatives for different jobs, not three phases every change must complete.

For feature work, the documented sequence is:

```text
Project constitution: shared principles

Per feature:
specify → plan → tasks → implement → converge
```

“Converge” is the toolkit's step for checking the result and identifying remaining work. The README describes repeating implementation and convergence; our recommendation is to set an attempt limit and inspect unresolved problems rather than repeat indefinitely.

### Keep project rules separate from feature decisions

A constitution is meant to carry principles across changes. In our search example, these statements have different lifetimes:

| Statement | Where it belongs |
| --- | --- |
| New reader controls must work with a keyboard. | A shared project rule, if the team agrees it applies throughout the reader. |
| This change searches titles, not lesson bodies. | This feature's spec. |
| Connect the input to the existing list. | This feature's plan or tasks. |

Putting all three in permanent instructions would make future work inherit an old feature's scope. Putting all three only in chat would lose the reusable rule.

Spec Kit makes those shared rules and per-change processes reusable through its CLI, templates, and supported-agent integrations. That is useful when a team repeatedly needs the same review expectations. Assign someone to maintain the project rules, or future features will inherit stale guidance.

**Read with a question:** compare the feature, bug-fix, and idea-assessment examples in the README. Which would you use for a new search feature, a broken clear button, or uncertainty about whether search is needed at all? Notice how the outputs differ.

</details>
<details>
<summary><strong>BMAD: choose the planning the work needs</strong><span>Look here when a fixed process is too much for small changes and too little for larger ones.</span></summary>

[BMAD's planning-path guide](https://docs.bmad-method.org/plan/choose-a-planning-path/) starts with a question: is the intent well defined? If not, use the planning activity that fills the gap. Research, product, UX, and architecture work are independent options, not mandatory stages.

A clear intent can go to `bmad-spec`. Work that fits one build session can continue to `bmad-build`; larger work can use `bmad-ticket` to split and order stories. The guide describes saved specs, tickets, and build plans, with human review of story order and completion.

### Size the process by the unresolved problem

Consider two changes:

- **Rename a private helper across forty files.** The behavior is settled, callers are known, and existing checks cover the affected paths. A mechanical plan may be enough despite the large diff.
- **Rename one field in a public API response.** The patch may be one line, but consumers could depend on the old name. Before planning the replacement, identify those consumers and decide who owns the compatibility commitment.

For the API change, suppose a client cannot update until next month. The decision might be to add the new field while retaining the old one until an agreed removal date. That produces different work: support both fields, check the old client still works, coordinate migration, then remove the old field after confirming consumers have moved. If all consumers can change together, an atomic cutover may be simpler.

The point is not that every API change needs a migration program. **An unresolved compatibility decision changes the plan; a large file count may not.** This is where BMAD's choice of planning activities is useful: investigate the missing dependency before splitting implementation into stories.

The guide recommends updating the spec and re-slicing remaining stories when a missing constraint emerges. Its installable skills and saved plans provide structure, but choosing the right activity remains your job.

**Read with a question:** use the guide's “Get to a Well-Defined Intent” table. Name the gap in your own change, then find the activity that addresses it. If there is no gap, do not add an activity just because it appears in the table.

</details>
</div>

## Compare the choices, not the number of features

Choose by the problem that keeps costing you time. These approaches overlap; we are choosing a first practice, not a permanent allegiance.

### “We cannot tell which proposal actually shipped”

Suppose two search proposals exist: titles only and titles plus headings. A new agent reads the larger proposal and treats it as current behavior.

**We would start with OpenSpec's current-versus-pending distinction.** Check the implementation and the accepted decision, update the current behavior description, and mark the other proposal as superseded. Future work has an explicit starting point.

FSAD's shared discussion would not, by itself, solve this stale-record problem. If an existing issue tracker already makes acceptance and current documentation clear, use that instead of adding another change system.

### “Product and engineering keep implementing different interpretations”

Suppose product expects readers to find passages, but engineering has planned title filtering. Both have written clear documents; the documents disagree.

**We would borrow FSAD's shared decision session before generating more tasks.** Resolve what readers need to find, record the decision, then use Kiro's requirements/design/tasks separation to review the resulting plan. Adding an archive would preserve the disagreement, not settle it.

If the behavior is already agreed and the recurring problem is mixing project rules with feature scope, Spec Kit's separation is a better fit. If nobody knows whether search addresses the real problem, follow BMAD's advice to investigate that gap before planning a build.

**Try the comparison on your note:** name the recurring failure, choose one practice, and say what evidence would make you choose differently.

### Where do decisions live—and who can change them?

A spec records intended behavior; code and a running product reveal actual behavior. If they disagree, “source of truth” is not a shortcut to deciding which is right.

In the search example, code that searches headings could be a bug, or it could reflect an agreed change that never reached the note. Find the decision. If there wasn't one, bring the scope choice back to its owner.

**Let the agent propose changes, not silently approve its own new requirements.** Name the decisions it can make locally and the ones that need your input. This is particularly important when several agents read copies of the plan.

### Who takes on the upkeep?

Shared specs need updates; parallel work needs integration review; templates need maintenance. Before adopting tooling, name who will maintain what it adds. A practice that helps one author is not yet a process a team can rely on.

### What actually prevents a skipped step?

There are three different things to inspect:

- **Guidance:** a prompt or task list says to run the check.
- **Automation:** a tool runs a command or creates a file.
- **Enforcement:** a controller refuses the next action unless the required result is present.

A method can contain all three. A diagram or an agent role does not tell you which is in use. If approval matters, ask what blocks the action, who can bypass it, and whether approval still applies after the code changes. [Prompting: put code in charge when the rules must hold](../foundations/prompting.md#2-put-code-in-charge-when-the-rules-must-hold) explains the distinction between agent-directed and code-controlled workflows.

## Try one useful idea without migrating the repo

Choose one problem in your note: an unclear decision, mixed current and proposed behavior, a weak handoff, or repeated project guidance. Use the matching idea above to improve it.

```text
Read [change note] and the relevant repository conventions.
The problem I want to address is [specific gap].
Apply [one practice] to that problem without adding a framework.
Preserve agreed decisions and completed work.
Show what changed and what still needs my decision.
Don't implement the feature.
```

**Check the difference:** can you now answer something that was unclear before? Can another person find the agreed behavior, remaining work, and unresolved decision? More headings alone are not an improvement.

If a practice helps repeatedly, then consider its tooling. Try one real change using the tool's supported integration, review the files it creates, and carry that change through to completion. We are using OMP in this workshop; don't assume another product's slash commands work here unchanged.

## Finish the change, not just the task list

Return to the search example. Once the behavior is checked and accepted, the note has served its planning purpose. Some information should remain; some should stop directing new work.

| Keep current | Close or archive |
| --- | --- |
| How search behaves and how to use it | The implementation checklist |
| A design decision future changes need to respect | Superseded proposals, clearly marked as superseded |
| Checks that protect meaningful behavior | Run-specific results linked from the completed change |

Use the repo's existing convention. In OpenSpec, archiving has a defined role in updating main specs. With an ordinary issue and change note, you need to decide where lasting behavior belongs and link it from the completed work. Don't leave an abandoned proposal looking like current instructions.

Before closing your change, ask the agent:

```text
Compare [change note] with the current implementation and check results.
Identify unmet requirements, outdated statements, and unfinished work.
Propose which information belongs in lasting docs and which should be
closed or archived under this repo's convention.
Don't mark unrun checks as passed or declare the change accepted for me.
```

You make the acceptance decision. For this lesson, you do not need to implement the example or install a framework: finish with a reviewed note for your own change and one deliberate choice about how to maintain it.

## Sources

The questions beside each approach suggest what to inspect. These primary sources explain intended mechanics; they are not independent evidence that one method is faster or more reliable.

[FSAD playbook](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html) · [OpenSpec core concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md) · [Kiro walkthrough](https://kiro.dev/blog/from-chat-to-specs-deep-dive/) · [Spec Kit README](https://github.com/github/spec-kit) · [BMAD planning paths](https://docs.bmad-method.org/plan/choose-a-planning-path/)

<details>
<summary>Source versions and what was checked</summary>

FSAD's reviewed page labels itself v40. The Kiro walkthrough is dated July 15, 2025; consult current docs for current controls. OpenSpec and Spec Kit links follow their default branches, and BMAD's docs are mutable.

The examples in this lesson illustrate the ideas; the five tools and methods were not installed, run, or benchmarked for this comparison. File and workflow descriptions are source-based. Adoption advice and the search scenario are course recommendations and teaching examples.

</details>

[Previous: SDLC — the everyday workflow](03-everyday-workflow.md) · [Next: Advanced engineering](08-advanced-engineering.md) · [Back to the outline](../../OUTLINE.md)
