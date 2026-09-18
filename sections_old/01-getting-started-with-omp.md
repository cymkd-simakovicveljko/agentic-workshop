# 1. Getting started with OMP

**Draft v0 — ready for discussion.** The section is agreed; this lesson and its optional project are proposed for review.

One small task, watching how the agent works.

## Your first change

You open a project directory, type “Atlas” into its search box, and nothing happens. Four projects remain on screen. Your task is to make the filter work.

It is a small feature on purpose. By the end, you should be able to point to what you asked for, what the agent did, and the evidence that the result works. Those three things will remain useful as the tasks get larger.

We will use **Oh My Pi (OMP)**, a terminal application for working with a coding agent. You give it a task; the selected model can request tools that read files, edit code and run commands. OMP carries out those actions and returns their results to the model. You can follow the activity as it happens. See the [official introduction](https://github.com/can1357/oh-my-pi).

You need only three terms for now:

| Term | In this lesson |
| --- | --- |
| OMP | The application you interact with in the terminal. |
| Model | The AI you select to interpret the task and propose actions. |
| Tool | An operation the agent can request, such as reading a file or running a test. |

The interesting part starts when a tool returns a result: the agent can use that feedback to decide what to do next. Your job is to keep the task clear and judge the outcome.

## What you will be able to do

- Identify the selected model and follow an OMP session in a small project; in the hands-on route, start and operate it yourself.
- Give a bounded request and follow the agent's reading, editing and testing.
- Inspect the code changes and check the behavior yourself.
- Explain one decision you still own, even when the agent writes the code.

**Suggested format:** a short presenter demonstration, followed by an optional individual or paired attempt. Allow roughly 40–50 minutes with a prepared environment; this is a planning estimate to test in a pilot. Setup happens before the session.

Basic familiarity with code, a terminal and tests is enough. The example uses a few lines of JavaScript; nobody needs to know a framework.

During the walkthrough, the presenter operates OMP; everyone predicts results and records evidence. The optional project repeats the task in your own fresh lab.

## Before you begin

For hands-on work, complete the [section 1 setup guide](../demo/section-01-setup.md). It prepares a disposable copy of the app, a starting Git snapshot and an OMP session with a small set of tools. You will need an available model through your chosen provider. If access is not ready, follow the presenter and write down your predictions and checks.

Open the app and OMP side by side. Confirm the session is in your disposable lab folder, the intended model is selected, and you know the interrupt key. The guide explains approvals and stopping. Treat “please only read” as a request to the agent; it does not itself restrict the computer's permissions.

## 1. See the problem before asking for a fix

The app contains four synthetic projects:

| Project | Owner |
| --- | --- |
| Atlas | Mira |
| Atlas API | Leo |
| Borealis | Atlas team |
| Café | Nina |

Type `Atlas`. In the starter, all four projects remain visible. The interface is already wired up, but its filtering function returns everything.

Here is the behavior we want: match project names, ignore letter case, and ignore spaces around the query. Clearing the search restores all projects. The existing page already handles the count and the empty state.

**Predict before running:** what should appear for `  ATLAS  `? What about `team`? Make your prediction before looking at the checks below. That owner called “Atlas team” is there for a reason.

## 2. Ask OMP to look first

The prepared lab includes `AGENTS.md` for working instructions and `contract.md` for the expected filter behavior. We will explore repository instructions later.

Send this first message:

```text
Help me understand this small project before changing it.
Read AGENTS.md, contract.md, package.json, public/filter.mjs,
public/projects.mjs, public/app.mjs and the tests.
Explain why typing Atlas still shows every project and identify
the smallest change needed. Do not edit files or run commands yet.
```

Watch for actual file reads. Does the explanation refer to the function and data it inspected? Can you open `public/filter.mjs` and confirm its explanation?

The useful answer is short: the filter currently returns every project; the name-matching logic belongs in that function. If the agent proposes rebuilding the UI or adding a search service, bring it back to the small task.

This first pause gives you a chance to correct a misunderstanding before it becomes a code change. We will develop that habit into a fuller workflow in section 3.

## 3. Give it one change to make

Send the implementation request:

```text
Implement the project-name filter described in contract.md.
Match a literal substring of the name, ignoring letter case and
leading/trailing query whitespace. An empty query returns all projects.
Search names only; preserve order, duplicates and the original data.
Use JavaScript lowercase matching; do not add accent folding.

For this task, edit only public/filter.mjs. Keep the existing tests
unchanged and add no dependencies. Run npm test from the lab root.
If a check fails, investigate it. Stop and explain if the same failure
persists after one correction, or if the task needs a wider change.

Finish with what changed, the actual test result and what I should
check in the browser. Then stop.
```

The request gives the agent a target, a boundary and a way to check its work. It also tells the agent when to hand the task back. These instructions guide behavior; you still supervise the run.

When an approval appears, read the proposed file change or command. For this exercise, expect an edit to `public/filter.mjs` and tests from the lab directory. Pause on an unexpected action and ask why it is needed.

## 4. Watch the work, not just the final message

Follow three kinds of event in the session:

| Event | What to look for | What it tells you |
| --- | --- | --- |
| Read | The file or search result returned by a tool. | What information the agent actually obtained. |
| Edit | The proposed and applied change. | Whether the implementation fits the request. |
| Test | The command, output and exit result. | What was checked and whether that check passed. |

The exact order and wording will vary between runs. The agent might inspect more files or encounter a failed test. It might also solve the task immediately. Do not manufacture a failure to make the demonstration more dramatic.

**Pause and point:** find one tool result that affected the next action. If the first implementation passed, use the test result that led the agent to finish. A displayed explanation is useful context; the tool output shows what happened on the computer.

If the agent drifts into unrelated work, interrupt it, inspect any changes already made, and restate the remaining task. Interruption does not undo edits. If the same failure returns after one attempted correction, use the stopping point in your request and review the evidence together.

## 5. Check the result yourself

After the agent finishes, use a separate terminal in the same lab folder:

```sh
git status --short
git diff HEAD -- public/filter.mjs
git diff HEAD --stat
npm test
```

`git status` also reveals new files; investigate anything beyond the expected filter change. Read the implementation and trace how the padded query `  ATLAS  ` becomes a match. Then read your own test output. The supplied solution passes all 11 automated checks; the starter intentionally fails six. If your environment reports a different result, investigate it rather than accepting the number as a script to reproduce.

Refresh the browser so it loads the changed JavaScript. Try these inputs:

| Input | Expected visible result |
| --- | --- |
| `aTlAs` | Atlas and Atlas API, in that order; `2 of 4 projects`. |
| `  ATLAS  ` | The same two results. |
| `team` | No rows; `0 of 4 projects` and `No projects found.` |
| Clear the input after `team` | All four projects; `4 of 4 projects`; empty message disappears. |
| Spaces only | All four projects. |
| `cafe` | No results. Accent folding is outside this task. |

Use the keyboard to reach and operate the input too. The automated checks cover the function and a basic HTTP response; they do not prove that the page updates correctly in a real browser or provide a complete accessibility assessment.

Return to your prediction about `team`. Matching the owner's name would be a different feature. The engineer decides which behavior is wanted and checks that the implementation follows it.

## Optional project: take the controls

Work alone or in pairs using a fresh lab from the [setup guide](../demo/section-01-setup.md). In pairs, one person operates OMP while the other predicts results and watches the scope; swap roles for verification.

Write your own implementation request instead of copying ours. Keep the accepted behavior and the one-file boundary. Before sending it, include a concrete example of success and what you want reported at the end.

Keep a short completion note outside the app's source files:

```text
My request:
What the agent changed:
One tool result I inspected:
Checks I ran and their actual results:
My decision: accept / needs another change / unable to verify
Reason:
```

If model access fails, the presenter can load the clearly labelled prepared solution using the setup guide. You can still inspect the diff, predict results and run checks. Record that route as a prepared example; a live agent run remains a separate exercise.

## Before you move on

Explain the change to a partner in one minute, or write a short answer:

1. Where did the behavior change, and why was that enough?
2. Which evidence supports accepting it? What did the tests leave for you to check?
3. What would you do if OMP reported success but the browser still showed all four projects for `Atlas`?

A good answer connects the filter to the already-wired interface, cites real test and browser results, and investigates a mismatch—for example, reloading the page and checking the served file—before declaring success.

You have now seen a complete small task. Section 2 gives names and structure to the pieces you just used: models, agents, tools, context and harnesses.

[Back to the outline](../OUTLINE.md) · [Next: Agentic engineering foundations](02-agentic-engineering-foundations.md)

## Resources, videos and links

### Reading

- **Start here:** [OMP introduction and installation](https://github.com/can1357/oh-my-pi#install). Skim the introduction and setup instructions; the larger feature catalogue can wait.
- **For this exercise:** [OMP tool approvals](https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md). Read the Modes table and User overrides to understand the approvals you see.

### Videos

Optional maintainer captures show the same action-and-feedback pattern in larger tasks. They are previews of OMP capabilities, rather than recordings of this course exercise.

- [Preview, then accept — OMP capture](https://omp.sh/clips/codemod.mp4). Watch how a proposed edit and its application are represented separately. Here the agent resolves the staged edit; its “Accept” card is distinct from the human permission prompts in our exercise. Structural editing is beyond this lesson.
- [Drives a real debugger — OMP capture](https://omp.sh/clips/dap.mp4). Look for a tool result the agent can use while investigating a running program. Debugger setup can wait until later.

These clips are linked from the [maintainer's README](https://github.com/can1357/oh-my-pi). Durations and teaching timestamps have not yet been reviewed.

### Useful links

- [Section 1 setup and prepared-example fallback](../demo/section-01-setup.md) — the optional local lab.
- [OMP provider setup](https://github.com/can1357/oh-my-pi/blob/main/docs/providers.md) — connect the provider you will use.
- [OMP keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md) — controls and customization; use `/hotkeys` to see your active bindings.
- [Shared project proposal](../PROJECT.md) — how this small app might support later sections.
