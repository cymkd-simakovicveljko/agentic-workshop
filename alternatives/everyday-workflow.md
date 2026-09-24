# The everyday workflow

Someone asks you to add a filter. Show unfinished tasks. A checkbox, probably.

You could hand that sentence to a coding agent and wait for a diff. On a small app, it might work. But suppose the checkbox hides the completed tasks by deleting them from state, and the app helpfully saves the shortened list. The screen looks right. The data is gone.

That's the sort of mistake this lesson is about. Not because filtering is difficult, but because producing something that looks finished is easier than noticing what it broke.

We're going to take that request through an ordinary working session: understand the code, settle the behavior, build a small piece, try to break it, and decide whether to accept the result. There will be some planning. There will also be a point where more planning is just avoiding the work.

((((((((()))))))))
This is an alternative reading version of [the everyday-workflow lesson](../sections/04-the-everyday-workflow.md), not a replacement for the active course. The companion [lab](../demo/section-04-workflow-lab.md) holds the setup and full acceptance sequence. The canonical todo repository is still missing from this checkout, so you can work through the reasoning now, but the app exercise needs that repository recovered first. The scenarios below are teaching examples, not stories about runs that happened.
((((((((()))))))))

## Before you ask for code

My default is to let the agent investigate before letting it edit, especially in a repository I don't know. Not every time. If the task is changing a label and we both know where it lives, making the agent produce a research report would be ridiculous.

The useful question is: what am I uncertain about that could make this change go wrong?

For the filter, it's where the tasks live, how the app saves them, and how a row's buttons identify the task they operate on. Those are worth inspecting. The entire routing architecture probably isn't.

You might start with:

> Find the task state, rendering and persistence paths. We're adding an unfinished-task filter. Explain where a view change could accidentally lose data, and what the existing tests would catch. Don't edit yet.

Notice that this asks for an explanation of a risk, not a tour of the repository. A list of filenames is easy to produce and surprisingly easy to mistake for understanding.

Read enough of the answer's source references to check it. If the agent says a helper saves the whole collection, open that helper and its callers. If it claims the browser tests cover filtering, find the assertion. Ask it to walk through one actual interaction when the explanation gets vague.

This is also when you establish a baseline. Which branch are you on? Is someone else's work already in the tree? Do the relevant checks run before any edits? Use the project's actual scripts rather than asking the agent to guess commands that sound conventional. For this course's app, the documented routes are `npm test` and `npm run test:e2e`, subject to confirmation after recovery.

A browser that cannot start is a setup problem. It is not a failed filter test, and changing application code won't fix it.

Keep the environment small, too. A local filter doesn't need production credentials. A request to avoid external systems is useful guidance, but it doesn't remove access to those systems. Permissions and isolation belong to the environment, not to the optimism of your prompt.

## Get specific about the change, not about every line of code

“Show unfinished tasks” leaves quite a lot unsaid.

Do completed tasks come back when the filter is off? Does completing a visible task make it disappear immediately? What happens after refresh? Can you still add a task while the list is filtered?

These aren't pedantic questions. Their answers change what you build.

For our exercise, the filter is a temporary view. It starts off on a fresh page, and switching it off restores every task that hasn't actually been deleted. Adding, completing and deleting keep working. Saved task data behaves as before; the checkbox preference itself is not saved.

Now make the requirement harder to misunderstand with a short story:

> Add “Write outline” and “Review draft.” Complete the first task. Turn the filter on: only “Review draft” remains visible. Turn it off: both tasks return, and “Write outline” is still completed.

That example already rejects the destructive implementation from the introduction. Add one more: while the first task is hidden, delete the second task. When you turn the filter off, the first task must still be there.

We'll come back to why that matters.

Matt Pocock's public workflow material puts considerable weight on clarifying requirements before execution, using PRDs and breaking larger work into small vertical slices. The useful part isn't the document name. It's settling the decisions that would otherwise be made accidentally during implementation.

A PRD—a product requirements document—can be useful when several people need to agree on a substantial feature. For this checkbox, a brief with a few examples is enough. Requiring a PRD for every change is how a useful practice becomes administrative clutter.

You still need boundaries. We're not adding search, sorting, a remaining count or a new state library. If the agent proposes one, ask which part of the request requires it. Sometimes it has spotted a real dependency. Sometimes it has simply found more code to write.

## The first plan should be small enough to criticize

Here is a reasonable approach: keep one full collection of tasks, add local state for the checkbox, and derive the visible rows from the collection. Continue identifying tasks by their stable IDs. Test that hiding is reversible and that actions still target the right record.

That's most of the plan.

You could ask the agent to name the likely files and checks before editing. What you're looking for isn't an impressive answer. You want to catch a bad decision while changing it is still cheap.

For example, a second state variable holding “the filtered tasks” sounds harmless. But now every add, completion, deletion and filter toggle must keep two collections synchronized. Why take that on when the visible list can be calculated from the current tasks?

Or the agent proposes changing the shared persistence helper. Maybe necessary, but I would challenge it. This is a view change. Show me the requirement that needs different storage behavior.

This is where Pocock's tracer-bullet idea helps: build the smallest path through the system that can answer an important question. For our app, that means the checkbox actually affects rendered rows, and switching it off brings the same records back. Not “finish the state layer” today and discover tomorrow that the UI can't use it.

On a larger feature, the first slice might carry one real record through an API, storage and a screen. It needn't handle every option yet, but it should expose the risky integration instead of postponing it behind three layers of individually finished code.

A caveat: don't choose the easiest slice just because it's easy to finish. If permissions are the uncertain part, a beautiful screen with fake permissions tells you very little. Build something that teaches you whether the approach can work.

## Let the agent work, but give it something better than “make it good”

Once the behavior and approach are clear, stop interrupting ordinary implementation decisions. You don't need to approve each variable name.

A useful request could be:

> Implement the agreed reversible filter. Keep task identity and persistence behavior intact, use the existing test setup, and add a check that catches deleting the wrong task while filtered. Run the relevant checks and inspect the actual UI. Continue through ordinary fixes; stop if you need to change the agreed behavior or add a dependency.

That is not a magic prompt. It works only if the agent has the agreed examples and can access the tools it needs. In a fresh session, supply the brief again or point to its current location. Don't assume yesterday's conversation came along.

For this feature, a browser regression is worth writing before the implementation. First watch it fail because the checkbox or behavior is absent. Then implement the change and watch it pass. Simon Willison describes this red/green pattern as a particularly useful fit for coding agents.

The red step matters. If the new test passes before the feature exists, what exactly is it checking?

Don't turn that into “every edit needs another test file,” though. Changing a sentence may need a visual check. Fixing a parser boundary probably needs a focused regression. Choose feedback that could reject a plausible mistake, rather than generating tests to make the diff look responsible.

Here's the central code distinction, stripped of the app around it:

```js
// A view derived from current data. The full collection stays available.
const visibleTasks = showUnfinished
  ? tasks.filter((task) => !task.done)
  : tasks;
```

Compare that with passing the filtered subset into a function that replaces and saves the task collection. Both can make completed rows disappear. Only one lets them come back without recovering lost data.

The fragment isn't a complete React patch. It illustrates the boundary to preserve; the implementation still needs a labelled native checkbox, current state and the existing handlers. Use the native control rather than recreating a checkbox with a clickable div and then discovering you've also volunteered to implement keyboard behavior.

## Now try the thing most likely to be wrong

Let's return to the hidden first row. The full collection is:

```text
A — completed
B — unfinished
C — unfinished
```

The filtered screen shows B and C. B now occupies visible position zero, but position zero in the full collection is A.

If a delete button passes its displayed index into an operation on the original array, you can click B and delete A. The filtering code may be perfectly fine. The bug sits at the boundary between the view and the mutation.

This is why “the checkbox works” is such a weak conclusion.

Try the sequence in the actual app: hide A, delete B, turn the filter off, and check that A remains completed while C remains unfinished. Then reload. If A disappears only after reload, inspect what was saved. If the wrong row changes immediately, follow the identity passed to the handler. Those observations point to different places.

Check adding and completing while filtered as well. A stale stored copy of the visible rows can look correct on the first toggle and stop following later changes. Complete every task: an empty filtered view is fine, but the checkbox must remain available so you can get back to the completed tasks. Try an actually empty collection too. And reach the checkbox with the keyboard; a feature isn't finished because the author's mouse can operate it.

You're not trying random inputs until you feel reassured. Each interaction targets a plausible failure.

The existing helper tests still matter. They protect behavior below the interface. But a helper test cannot show that your checkbox controls the rendered list unless it actually exercises that boundary. Likewise, one successful browser sequence doesn't prove every storage error case. Say what you checked without inflating the claim.

## When the agent starts going in circles

Suppose deletion still affects the wrong row. You report the sequence. The agent adds a guard. It still fails. Next it suggests memoizing the visible list.

Why would memoization fix an identity error?

At this point, “try again” is not enough direction. Ask for the competing explanations and one observation that separates them:

> Reproduce the hidden-first-row failure. Trace the ID or index from the clicked button into the mutation. Explain the cause before another edit. Don't change unrelated state handling.

If the task ID is correct at the button but wrong at the mutation, inspect the translation between them. If the mutation removes the right ID and the screen still looks wrong, inspect rendering and keys. Get evidence at the boundary where your explanation becomes uncertain.

You can make this worse by changing the model, the prompt, the implementation and the test at once. Even if the next attempt works, you've learned little about the cause. Change what the evidence points to first.

Sometimes a fresh context helps because the conversation has accumulated abandoned approaches and incorrect assumptions. Keep a short record of the current requirement, relevant files, exact failing sequence and what has already been ruled out, then let a new session inspect the actual state. [Section 3](../sections/03-working-with-omp.md) explains the host controls. Clearing a conversation isn't a repair, and it doesn't stop an old worker from editing your files.

What about another agent? Useful if it can investigate a distinct question—for example, inspect whether the tests cover reload while the implementer fixes the handler. Less useful if both agents edit the same component and you spend the next half hour reconciling their ideas. Give parallel work explicit ownership. Someone still has to integrate and verify the result.

## Review isn't asking the author whether they're pleased with it

“The implementation is clean and all tests pass.” Fine. Open the diff.

What changed besides the checkbox? Did an existing test disappear? Did the new test assert only that a label exists? Did the patch replace a working helper with a larger abstraction? Are the reported results from the latest code, or from before the final “small cleanup”?

I would rather review a small, slightly boring patch whose behavior I can explain than an elegant rewrite attached to a task that never asked for one.

An agent can help with review, especially when you ask it to look for concrete failure modes:

> Review without editing. Focus on hidden-task data loss, stable identity, state changes while filtered and keyboard use. For each defect, give the location, consequence and a sequence that would expose it. Keep optional improvements separate.

A fresh reviewer may notice something the implementer missed. It can also share the same mistaken assumption, so agreement between two agents isn't independent proof. Follow a finding back to the code or reproduce it. Do the same with a confident dismissal.

Review the whole candidate, not just whatever is currently uncommitted. If the agent already committed half the work, a diff against `HEAD` misses it. Compare against the starting revision, inspect untracked files separately, and leave unrelated work alone. A clean working tree tells you that changes were recorded; it says nothing about whether they were correct.

## “Could we also remember the filter?”

Yes, perhaps. But that changes the requirement that a fresh page starts with filtering off.

It introduces a storage decision and new checks. Does the preference survive closing the browser? Is it per device? What happens if reading the stored value fails? You don't need to turn a small request into a design summit, but you do need to notice that it isn't cosmetic.

If the owner wants it in this change, update the accepted examples and the affected plan before implementing. The old fresh-page test may now need to change because the requirement changed—not because it was inconveniently failing.

If it can wait, leave it out. Finishing the original request is a legitimate outcome.

The same judgment applies before any code is written. If a user asks for a new export because they can't find an existing report, showing them the report may solve the problem. Agentic engineering doesn't require an agent to generate a patch every time someone asks for help.

## What can you honestly call finished?

For this local exercise, you want a focused diff, checks that exercise the relevant behavior, and an explanation of why the change is acceptable. If the browser wouldn't run, write that. It leaves a specific gap; it doesn't make all the other work worthless.

A useful completion note might say, **if those observations actually happened**:

> Added the reversible filter. Checked hide/show, deletion with an earlier hidden row, completion and addition while filtered, empty states, reload and keyboard operation. Existing unit and browser suites passed on the final candidate. Filter preference isn't saved, as agreed.

If only the unit tests ran, the note should be shorter and less reassuring. Don't copy the example as evidence.

Use the [shared handoff](../demo/section-05-context-and-handoff.md#handoff-template) when someone else will continue. Include the code state, remaining questions and actual results, not a transcript of every idea the agent considered. Preserve work before switching branches, account for the server or workers you started, and remove temporary diagnostics once they have served their purpose. Keep a regression that would catch the wrong-row bug coming back.

A local acceptance decision is not a deployment. In a real service, you may still need review approval, rollout checks, monitoring and a recovery plan. In a database change, reverting code may not undo changed data. Let the consequences of the work determine those steps; don't invent a deployment process for a checkbox exercise.

## Use the workflow without becoming obedient to it

A typo needs a tiny loop. An unfamiliar feature needs exploration and a few explicit decisions. A production bug needs a reproduction and a diagnosis, not a speculative implementation plan. An uncertain integration might deserve a throwaway prototype before anyone commits to the architecture.

That's why I wouldn't memorize six prompts and call them a workflow. The order changes as you learn. A failed test sends you back to the implementation—or reveals that the requirement never made sense. A review catches an assumption you should have questioned earlier. You update your understanding and continue.

The useful habit is to ask, throughout the work: **what do we know now that we didn't know before, and is it enough to take the next step?**

Try it with the [filter lab](../demo/section-04-workflow-lab.md) once its checkout is available. Before you ask the agent to implement anything, write down two ways the feature could look correct while being wrong. Then choose the smallest checks that would expose them. You already have two candidates in this lesson: destructive filtering and visible-index deletion.

## Where these ideas come from

Matt Pocock's [Full Walkthrough: Workflow for AI Coding](https://www.youtube.com/watch?v=-QFHIoCo-Ko) is an influence, not a script reproduced here. Its public description covers clarifying briefs into requirements, tracer-bullet vertical slices, TDD, human-in-the-loop work and later autonomous runs. His [AI Coding for Real Engineers syllabus](https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w) also describes exploration, planning, context management, steering and feedback loops. Those public sources informed this adaptation; no complete video transcript or paid lesson was available for this draft.

Simon Willison's [red/green TDD chapter](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) explains why observing the initial failure matters. This lesson applies that idea to a regression worth keeping, rather than prescribing a new test for every edit.

The todo scenarios, prompts, mistakes and judgments are original course material. For exact setup, acceptance cases and command references, use the [active lesson](../sections/04-the-everyday-workflow.md) and its companions. The smaller plans and cautions about unnecessary process are this lesson's recommendations, not quotations or claims that either author endorses every choice here.
