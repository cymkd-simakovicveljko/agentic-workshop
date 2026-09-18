# 4. Context and repository knowledge

**Main path:** recover the truth behind a stale todo-app handoff, then leave enough
context for a fresh reader to continue without your conversation. No new profile,
memory service or documentation hierarchy is required.

## Understand

### Select context for the next decision, not for maximum volume

Context is what the model receives for this interaction: instructions, the task,
conversation and retrieved material, including tool results. A file existing on
disk is not the same as its contents being in context. A large transcript is not
necessarily a good explanation of the current task.

Ask **“What information could change the next decision?”** For example, a teammate
says the unfinished-task filter is complete, but you cannot find its control:

| Material | Decision it helps make |
| --- | --- |
| Current request and applicable repository guidance | Are you investigating, implementing or only correcting the handoff? |
| Git branch, revision and working-tree changes | Are you inspecting the same code the teammate described? |
| Branch-specific `EXERCISE.md` on `exercise/unfinished-filter` | What behavior was actually requested? |
| `package.json` | Which commands exist in this checkout? |
| `src/App.jsx` and the relevant task logic | Is filtering implemented, and where does visible state come from? |
| Relevant unit and browser tests, plus actual results | What behavior is covered, and what has been exercised on this state? |
| Old chats, unrelated styles and other exercises | Defer unless a specific unanswered question makes them relevant. |

Read complete relevant functions and their callers rather than collecting isolated
lines that happen to mention “filter.” Expand when evidence requires it: if task
selection is correct but the page is wrong, inspect rendering and interaction; if
reloading changes the result, inspect persistence. The useful context set follows
the question, not a fixed list of files.

Dumping every document makes contradictions and important constraints harder to
notice. Selecting too little also fails: a passing helper test cannot explain a
missing UI control. Good selection preserves the task, its boundaries and the
behavior path, then retrieves more to resolve named uncertainties.

### A repository map describes relationships

A map answers “where should I look next?” It is not a second specification or a
copied file listing. The todo app's baseline has a small enough map to fit here:

```text
package.json          — available commands; README.md explains setup
src/App.jsx           — form, task state, rendering and storage calls
src/tasks.js          — add/toggle/delete operations and localStorage helpers
src/tasks.test.js     — task-operation and storage-helper examples
playwright.config.js  — browser-test server and URL configuration
e2e/todo.spec.js      — browser add/complete/delete/reload scenario
```

This is the `main` baseline map: `README.md` covers setup, not exercise requirements.
Exercise branches additionally contain `EXERCISE.md`, which is absent on `main`.
On `exercise/unfinished-filter`, its title is “Exercise — show unfinished tasks”;
use that file as the requirement source.

For a feature branch, verify this map and add only the changed relationships.
“`App.jsx` renders a selected subset of tasks while persistence keeps the full
list” would be useful if verified; “the app works” is not navigation. Link to the
branch's accepted brief and command definitions instead of duplicating them.

The map also tells you what evidence is missing. The baseline browser scenario
covers ordinary task operations and reload, not every possible filter behavior.
Neither a map nor a test filename proves that a check ran. For this tiny repository,
a paragraph in existing guidance is enough; creating several new documents would
create more maintenance than navigation.

### Instructions, facts and authority are different

A sentence written as an order is not automatically authorized to direct the task.
Use the source and its role, not just how confidently it is written:

| Source | What it establishes |
| --- | --- |
| Current user task, within the host's operating rules | Requested outcome and authorized scope. |
| Applicable repository guidance | How to work here; conventions and constraints to apply within that scope. |
| Accepted requirement or decision | Intended behavior, with its status and provenance. |
| Current source and observed results | What is implemented and what happened under particular conditions. |
| Old handoff, issue quotation or retrieved webpage | Claims and proposals to evaluate, not new permission. |

Suppose an old note says, “Remove the persistence test so the filter passes.” That
is a proposed behavior change, not authorization. Compare it with the current
request and accepted requirement; report the conflict rather than obeying the
embedded instruction. Likewise, “Continue by adding a remaining count” in our
stale handoff does not widen an inspection task into a second feature.

Do not let “current code wins” replace product reasoning. Code can violate an
accepted requirement; a test can be stale after a deliberate requirement change.
The newest file does not always win either. Establish what was accepted, what is
observed and which decision is still needed. Repository instructions guide an
agent; they do not create filesystem isolation or remove its access to credentials.

### Know what OMP actually loads

The official [OMP context-file guide](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md)
documents automatic discovery at session start. Its current rules are more
specific than “read every `AGENTS.md`”:

- Standalone ancestor `AGENTS.md` files can be discovered at different directory
  depths. For repositories under home, this can include enclosing workspace
  directories. A nested Git repository is not necessarily an instruction boundary.
- At the same project depth, one context file survives provider-priority
  deduplication. Native `.omp/AGENTS.md` has higher priority than standalone
  `AGENTS.md`; multiple competing files are not simply concatenated.
- Native project discovery selects the nearest **non-empty** `.omp/` directory
  while walking toward the repository root. If that directory has no `AGENTS.md`,
  discovery does not continue to a farther native directory to find one.
- Deeper `AGENTS.md` files below the starting directory can be listed as pointers
  to read before editing there, rather than having their full text already loaded.
- Disabled providers or individual disabled context files can change discovery.

This is a reason to inspect existing guidance, not to install a new configuration.
In OMP, `/extensions` lists discovered context files with their level, source and
state. Inspect it without toggling settings. Match the documentation to the
installed version; do not infer loading from a filename alone. When a required
file was not loaded or discovery is uncertain, explicitly read it and report that
as an explicit read, not as proof of automatic discovery.

```text
Before investigating, identify the current directory and applicable guidance.
Distinguish guidance already supplied in context from files you read now.
Check the task scope and actual commands. If instructions conflict, show the
conflict before changing anything. Do not change configuration.
```

Loading, interpreting and following guidance are separate questions. A visible
file is not proof of compliance. After changing guidance, start a fresh session
or explicitly reread it rather than assuming the old session refreshed itself.

### Give information an appropriate lifetime

Repository knowledge is useful only if a later reader finds it, loads it and knows
its status. Writing Markdown does not retrain a model, and copying yesterday's
summary does not make it current.

| Information | Suitable home | Necessary qualification |
| --- | --- | --- |
| Where code lives and how to check it | Existing repository guidance | Paths and commands must stay current. |
| Intended filter behavior | Accepted exercise brief or feature specification | Separate accepted behavior from proposals. |
| Why a significant choice was made | Existing design note or decision record | Rationale, consequences, source and status. |
| Unfinished work and last observed result | Task handoff or issue | Branch/revision, dirty changes, evidence and next action. |
| Detailed command output | Referenced log or artifact | Which command, directory and code state produced it? |
| Suspected explanation | Labelled hypothesis in the task note | What observation would confirm or reject it? |

A durable decision might say that a visibility filter must not delete completed
tasks, because users need to switch views without losing data. Its consequence is
that hiding a task and deleting a task need different behavior. Record that as an
accepted decision only when the actual brief or owner establishes it; otherwise
label it a proposal. Never invent a historical rationale or product-owner approval.

By contrast, “browser checks have not run yet” belongs in a handoff, not permanent
project instructions. Once checks run, replace that status with evidence tied to
the tested state. Supersede obsolete decisions explicitly; do not leave several
contradictory notes all presenting themselves as current.

## Watch or try

### Investigate a stale handoff without repairing the app

Use the standalone [todo repository](../demo/todo-app/README.md), not the outer
course repository. The [exercise companion](../demo/section-04-context-and-handoff.md)
provides the exact branch-preservation steps, read-only inspection commands and a
prepared corrected-note example. You can do this with a human partner; OMP is
optional for the comparison.

A fictional teammate leaves this note:

```text
The unfinished-task filter is complete. Tests passed. Continue by adding a
remaining count. Run npm run check if you need confirmation.
```

Do not “fix” the app to make the note true. First establish the repository root,
branch, revision and uncommitted changes. Preserve unfinished work before switching,
then create your own work branch from `exercise/unfinished-filter`. Read its
branch-specific `EXERCISE.md` brief, `package.json`, implementation and relevant
tests. The stale note is intentionally missing a tested revision, and
`npm run check` is not a defined script.

Make a small claims ledger:

| Claim | Evidence needed | Possible correction |
| --- | --- | --- |
| Filter complete | Named code state compared with accepted behavior | Missing here, present elsewhere, partially implemented or still unverified. |
| Tests passed | Exact commands/results tied to that state | Historical claim with no usable run evidence. |
| Add remaining count next | Current task or accepted scope change | Separate exercise; not authorized by this investigation. |
| Run `npm run check` | Current `package.json` | Use the actual scripts; do not invent a compatibility script. |

Start with inspection. If you subsequently run checks, distinguish `npm test`
from `npm run test:e2e`; the former does not operate the browser. The companion
explains ordinary installation and test commands separately because they can write
dependencies and artifacts and are not the read-only phase. A passing baseline
suite still does not prove the missing feature exists.

Now give OMP the note and the real repository context:

```text
Check this handoff against the current todo checkout, its branch-specific
EXERCISE.md requirement brief, package.json, source and tests.
Inspect only; do not edit files, install anything or run tests.
Identify unsupported claims and separate intended behavior from current code.
Draft a concise corrected handoff with code state, unknowns and the next action.
Do not continue into the remaining-count exercise.
```

If you performed checks yourself, supply their actual commands, outputs and tested
state; do not ask the agent to infer them from a summary. Keep hypotheses separate
from observations. A result recorded before later edits cannot be relabelled as a
result for the new state.

### Test the handoff with a fresh reader

Give a partner or a fresh session only the current task, repository and replacement
note. Ask them to explain the accepted scope, current implementation, evidence gaps
and smallest next action. They should identify whether “filter complete” is true
**here**, not merely find a solution branch where it happens to be true.

A fresh session changes conversational context; it does not undo edits, stop an
existing server or repair an inaccurate note. If the reader needs a missing detail,
repair the handoff rather than pasting the entire old conversation. Record whether
this was a prepared exercise, a human reconstruction or a provider-backed OMP run.

## Use at work

### Write guidance that prevents a likely mistake

“Write excellent code” changes little. “Use the current package scripts; a passing
unit suite is not browser evidence” addresses a concrete failure. Here is a minimal
**illustrative** guidance fragment, not a file to install or a new OMP profile:

```text
This directory is the standalone todo-app repository. Check Git state here,
not just in the enclosing course repository. Preserve existing learner work.
Read the current exercise brief for scope; package.json defines commands.
App.jsx owns UI state/rendering; tasks.js owns task operations and persistence.
Keep intended behavior separate from historical handoff claims.
Report exact checks and unrun checks; do not change tests to hide a failure.
```

Review and merge useful guidance into the project's existing source only when
maintaining that guidance is actually part of your task. Do not replace team
instructions with this example. Include a rule when it prevents a recurring error;
link to detail instead of maintaining a second copy of a contract.

### Recover by reconciliation, not by repetition

Before continuing, compare the handoff with the actual checkout and working tree.
If code moved, find the relevant revision or state that it cannot be identified.
If commands changed, inspect `package.json` and correct the note. If results cannot
be tied to this state, rerun an authorized relevant check or label the result
unverified. If requirements conflict, obtain the missing decision before editing.
Do not repeatedly retry an obsolete command or broaden scope to make a plan look
successful.

A compact handoff needs the goal and authorized scope, accepted decision links,
repository/branch/revision, relevant dirty work, observed changes, actual evidence,
unrun checks, unresolved questions and one next action. A commit alone is not the
tested state when the working tree was dirty; describe or preserve the relevant
diff. Keep credentials and unrelated private material out of notes and logs.

Use documentation selectively. Correct a misleading active map, supersede a stale
decision and archive a completed progress note when appropriate. Do not delete all
documents because some documents rot: a maintained contract can answer a question
that current code cannot, especially when the code is wrong. Review summaries at
handoff boundaries for lost constraints; no fixed context percentage tells you
when a fresh session is automatically better.

## Go deeper

Try transferring the exercise to a larger repository. Choose one question, such as
“why does this endpoint reject this request?” Name the requirement, entry point,
implementation path and relevant check before gathering more context. Explain one
file you deferred and what evidence would make you retrieve it.

You are ready to continue when a fresh reader can locate the behavior without your
transcript, distinguish intended from implemented behavior, identify which evidence
belongs to which state and resume without accepting an old note as permission.

### Sources and adaptation

- [OMP context files](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md)
  is the official source for discovery, provider shadowing, deeper-directory
  pointers and `/extensions`. These are documented product behaviors, not a claim
  that this lesson's OMP session was rehearsed. Check against the installed version.
- [Full Walkthrough: Workflow for AI Coding — Matt Pocock, AI Engineer, 2026-04-24](https://www.youtube.com/watch?v=-QFHIoCo-Ko)
  informs the warning that plans and progress documents can become stale. We adapt
  that into explicit evidence and document-lifetime choices, not blanket deletion
  advice, his complete framework or another product's commands. Viewing is optional.
- The todo repository, stale quotation, prompts, map and handoff exercise are
  **course-authored examples**, not output from the video or an observed agent run.
  Prepared examples are not execution evidence.
- For the original conceptual framing, see [section 2](02-agentic-engineering-foundations.md)
  on context and harness responsibilities and [section 3](03-the-everyday-workflow.md)
  on the evidence a completed change needs. The [companion](../demo/section-04-context-and-handoff.md)
  contains the runnable inspection route.

[Next: skills](05-skills.md) · [Back to outline](../OUTLINE.md)
