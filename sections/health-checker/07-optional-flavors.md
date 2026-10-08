# 5. Optional flavors

## How do you note down a change in your repo?

You agree on a change in chat, start working, and discover something that changes the plan. Where do you put that decision so you—or the next agent—can pick it up tomorrow?

**Start with a short change note.** Use the repo's existing issue, spec, or planning convention. If there isn't one, a Markdown file is enough. You need a place to keep the intent, decisions, and remaining work—not a transcript of the conversation.

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

For example, a note for this course could look like this:

```text
Change: let readers search lesson titles.
Why: finding a lesson through the sidebar takes too long.
Behavior: typing filters the lesson list; clearing shows it again.
Keep: existing lesson URLs and keyboard navigation.
Decide: should search include headings inside lessons?
Check: matching titles, no matches, clearing, and keyboard use.
```

Read the note before accepting it. Did the agent make a decision you haven't made? Did it add work you didn't ask for? Fix those parts now, before they become code.

As you work, update decisions that change and leave the next unfinished step clear. Before handing off, ask: **could someone continue from this note without reading our chat?** Point the next session to the file; saving it does not mean an agent will read it.

## What the different approaches add

FSAD, OpenSpec, Kiro, Spec Kit, and BMAD all give this work more structure, but in different ways. Some organize files; others organize tools or people. You don't need to adopt one to borrow a useful idea.

| Approach | What it adds | What you take on |
| --- | --- | --- |
| **FSAD** | Product, design, and engineering work from a shared spec | Shared decisions and review of parallel work |
| **OpenSpec** | Separate files for current behavior and proposed changes | Keeping specs and change folders in sync |
| **Kiro specs** | Requirements, design, and tasks inside Kiro | An IDE workflow and its project files |
| **GitHub Spec Kit** | Reusable processes and templates for coding agents | Tool setup, templates, and project rules |
| **BMAD Method** | Planning paths for work of different sizes | Choosing a path and maintaining its plans |

Open the one that matches a problem you have. The descriptions come from the linked docs; **“Use it when” is our recommendation**, not a claim that we've run the tool.

<div class="setup-platforms">
<details>
<summary><strong>FSAD: agree on the change together</strong><span>Useful when product, design, and engineering need to make decisions together.</span></summary>

The [FSAD playbook](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html) describes a small cross-functional team writing a shared Markdown spec, planning tasks, delegating work to agents, and reviewing the result. Its examples include `spec.md`, `plan.md`, task files, and separate worktrees for parallel work.

**Use it when** the difficult part is agreement across people, especially on new or cross-cutting features. Skip the full process for a clear local fix.

The cost is coordination: someone must keep the spec and tasks current and review the combined result. If the requirement changes, agree on the new spec before sending agents down different paths. On a handoff, check which tasks actually landed in the code.

**Borrow this:** write the change note together before splitting the work. Give each task a clear owner and a result you can check. A named reviewer still needs to review; a role in a playbook does not enforce that step.

</details>
<details>
<summary><strong>OpenSpec: separate what exists from what will change</strong><span>Useful when proposed behavior keeps getting confused with current behavior.</span></summary>

[OpenSpec](https://github.com/Fission-AI/OpenSpec/blob/main/docs/overview.md) keeps current behavior in `openspec/specs/` and proposed work in `openspec/changes/`. A change holds a proposal, spec changes, design, and tasks. When it is archived, its spec changes are merged into the main specs.

**Use it when** several people need to understand a change to an existing system. Skip it if one short note already makes the difference clear. Its CLI and AI-tool integration add setup; the folders need ongoing care.

While work is in progress, edit the change rather than presenting planned behavior as already shipped. Before archiving, compare the code with the proposal and resolve any mismatch. The saved folder helps you resume, but it doesn't tell you which checks are still current. OpenSpec calls its artifacts “enablers, not gates.”

**Borrow this:** give your note two headings: **Current behavior** and **What changes**. That distinction often helps more than a longer plan.

</details>
<details>
<summary><strong>Kiro: separate requirements, design, and tasks</strong><span>Useful when you need to settle what to build before discussing how.</span></summary>

[Kiro specs](https://kiro.dev/docs/specs/feature-specs/) guide feature work inside Kiro. The [official walkthrough](https://kiro.dev/blog/from-chat-to-specs-deep-dive/) describes three files: `requirements.md`, `design.md`, and `tasks.md`. You can review and edit them as the feature develops.

**Use it when** you already work in Kiro and a feature needs several rounds of clarification. Don't switch IDEs just to turn a clear issue into three documents.

The useful separation is **what users need → how we'll build it → what to do next**. The maintenance cost is keeping those parts aligned. When a requirement changes, revisit the design and remaining tasks; don't assume edited docs have updated or undone the code. Before resuming, compare the task list with what is actually implemented.

**Borrow this:** use those three headings in one note. Review requirements before discussing implementation. The IDE guides the work; you still need to inspect the changes and run the checks.

</details>
<details>
<summary><strong>GitHub Spec Kit: reuse a process across changes</strong><span>Useful when the same planning and review decisions keep coming up.</span></summary>

[Spec Kit](https://github.com/github/spec-kit) provides templates and agent skills, with separate paths for feature development, bug fixing, and idea assessment. Its feature path moves from project rules—a “constitution”—through specification, planning, tasks, implementation, and a final check of the result.

**Use it when** the team wants a repeatable process for a recurring kind of work and someone will maintain it. A one-off change rarely needs the CLI, integration, and template setup.

Project rules can save repeated explanation, but stale rules affect every later change. When requirements shift, update the spec and plan, then check the implementation again. To resume, read the saved work and check what remains; a completion message is not a substitute for the actual results.

**Borrow this:** write down the few project rules you keep repeating, using the repo's existing convention. Keep change-specific decisions in the change note, not in permanent instructions.

</details>
<details>
<summary><strong>BMAD: choose how much planning the work needs</strong><span>Useful when your work ranges from small fixes to multi-stage features.</span></summary>

[BMAD's planning guide](https://docs.bmad-method.org/plan/choose-a-planning-path/) offers different paths: a clear task can go straight to a spec or build; unclear work can start with research, product, or architecture planning. Larger work can be split into stories. Skills save specs, tickets, and build plans for later sessions.

**Use it when** deciding how much planning to do is itself a recurring problem. Skip the wider method when the next action is already clear. You take on skill setup, path selection, and the resulting files.

The guide recommends updating the spec and splitting the remaining stories again when implementation reveals new constraints. Keep completed work visible so a new plan doesn't repeat it. Its human checkpoints still need someone to inspect and accept the work.

**Borrow this:** ask “What is still unclear?” Add research for an unanswered question, design for a real technical decision, or separate tasks for a handoff. Don't add all three by default.

</details>
</div>

## Keep the note useful

Whichever approach you choose, settle three things:

- **Where do decisions live?** Link to the existing issue or spec rather than maintaining competing copies.
- **Who updates it?** When code and notes disagree, decide whether the implementation is wrong or the plan changed. Update the right one before handing off.
- **What happens when the work is done?** Keep lasting behavior in the repo's docs or specs. Close or archive the change note using the existing convention.

One distinction matters across all five: **a written process is not an enforced check.** An agent can follow a task list, but a required CI check or protected approval needs separate configuration. See [the workflow lesson](03-everyday-workflow.md) for that boundary.

For your next change, start with the note. Add a tool or process when you can name what the note is failing to solve.

<details>
<summary>About the sources</summary>

These comparisons are based on the linked primary docs, not local installations or benchmarks. FSAD's page labels itself v40; the Kiro walkthrough is dated July 15, 2025. Repository and documentation links can change. Check the version and supported coding tools before adopting setup commands.

</details>

[Previous: SDLC — the everyday workflow](03-everyday-workflow.md) · [Next: Advanced engineering](08-advanced-engineering.md) · [Back to the outline](../../OUTLINE.md)
