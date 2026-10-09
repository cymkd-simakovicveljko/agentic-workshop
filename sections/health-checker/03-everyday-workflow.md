# 4. SDLC: the everyday workflow

## Before we bring in the agent

Think about the last feature you shipped. Someone had to work out what people needed, decide how it would fit the system, build it, check it, and get it into use. After release, someone still had to answer questions and fix problems.

Writing code was part of that work. Not all of it.

**SDLC means software development lifecycle.** It is the whole life of a piece of software: deciding whether to build it, creating it, running it, changing it, and eventually replacing or retiring it.

The name sounds formal. The questions are familiar.

<figure class="course-diagram course-diagram-wide">
<a href="/diagrams/software-development-lifecycle.webp"><img src="/diagrams/software-development-lifecycle.webp" width="1568" height="882" alt="Software development lifecycle shown as a cycle: Plan, Design, Develop, Test, Deploy, then Operate and Improve. User feedback and monitoring feed the next round of planning. Supporting principles are solving real problems, building securely, keeping it simple, iterating continuously, and creating impact at scale." /></a>
<figcaption>The lifecycle at a glance. These activities overlap: testing, security, and feedback belong throughout the work, not only in the box where they appear. <a href="/diagrams/software-development-lifecycle.webp">Open the image at full size.</a></figcaption>
</figure>

## One small feature, the whole lifecycle

Suppose colleagues can book meeting rooms, but they have to contact support to cancel a booking. We want to let them cancel it themselves.

“Add a cancel button” sounds like a small coding task. Before you read on, name one decision the button cannot make for us.

### Understand the need

**Understand the person, not just the request.** Stanford’s d.school calls this [*Empathize* and *Define*](https://dschool.stanford.edu/tools/design-thinking-bootleg): learn how people experience a problem, then decide which problem to solve.

For our booking feature, ask a colleague to walk through the last time their plans changed. What did they do? Where did they get stuck? Look at the support request and what happened afterward. This tells us more than asking, “Would you use a cancel button?”

“Add a cancel button” is one possible solution. First, we need to understand what makes cancelling difficult and whether it is worth addressing now.

Before committing to a solution, check it from four angles. [Silicon Valley Product Group calls these the four product risks](https://www.svpg.com/four-big-risks/):

- **Value:** will people choose to use it?
- **Usability:** can they figure out how to use it?
- **Feasibility:** can we build it with the technology, skills, and time we have?
- **Business viability:** does it work for the organization, including its costs and obligations?

Product, design, and engineering should explore these together. A feature can be easy to build and still be the wrong thing to build.

Then agree on the behavior. Who can cancel: the person who booked, anyone invited, or an office administrator? Should everyone receive a notification?

This is **planning and requirements**: deciding why to do the work, what it should achieve, and what is outside its scope.

**Using an agent?** It can help organize research and suggest questions. Its guesses about users are not user research.

### Choose an approach

Should cancellation delete the booking or keep a record marked “cancelled”? How does the room become available again? Can we reuse the existing permission checks?

This is **design**. We decide how the change fits the system before those choices become harder to undo.

<details>
<summary>When an idea needs a quick test: the Google / GV Design Sprint</summary>

If we are unsure whether an approach will help people, we can test a prototype before building the full feature. The [GV Design Sprint](https://www.gv.com/sprint/) gives this work a five-day structure: understand the challenge, sketch alternatives, choose an approach, build a prototype, and test it with customers.

For our booking feature, we could let colleagues try a cancellation flow in a prototype and watch where they hesitate. That can expose confusing choices before we implement them; it does not prove that the underlying system will work.

We do not need a full sprint for every small change. Borrow the habit: test the uncertain part before making an expensive commitment.

</details>

### Build and check it

Now we implement the change. The button, the cancellation logic, the permission check, and any agreed notifications need to work together.

Then try the cases that matter. Can the booking owner cancel? Is another person's booking protected? What happens if someone clicks twice?

This is **implementation and testing**. Testing is not just finding broken code. It also helps us discover that a requirement was unclear or that we built the wrong behavior. We can write checks before or alongside the code; they do not have to wait until everything is built.

### Put it into use

Passing local checks does not make the feature available to colleagues. We still need to release it, check it in the live system, and know how to recover if it causes trouble.

This is **delivery**. Installing a change and making it available to users can be separate decisions.

### Look after it

Are cancellations working? Are support requests dropping? Did a calendar integration stop receiving updates?

This is **operation and maintenance**: keep the software useful and reliable, and feed what we learn into the next change. Eventually, if the booking system is replaced, we also need to move or retain the right data and switch the old system off.

**Release is not the end of the lifecycle.**

Teams use different names and divide these activities differently. The important thing is that the work gets done—not whether your diagram has six boxes or seven.

## A lifecycle is not a recipe

It is tempting to draw the work as a straight line:

**Understand → design → build → check → release → maintain**

That is a useful map. It is not a promise that we will visit each step only once.

While checking cancellation, we might discover that a shared calendar still shows the room as booked. That could send us back to design. Watching a colleague use the button might reveal that they need to cancel one meeting in a recurring series, not the whole series. That sends us back to the requirements.

**SDLC describes the work. A development approach describes how we organize it.** Waterfall and Agile are different ways of organizing that work; neither is another name for the lifecycle itself.

## A little history: when do we find out we were wrong?

That question connects much of software development's history. We need enough planning to work together, but we also need chances to discover what our plans missed.

### Stages made large projects easier to organize

In a phase-based approach, often called **waterfall**, teams aim to settle requirements, then design, then implementation and testing. Each stage gives people something to review before committing to the next.

There is a useful idea here: make decisions visible, coordinate the work, and know what is being handed over. The risk is waiting too long to try the things we are uncertain about. Discovering a wrong assumption near release can mean changing much more than a few lines of code.

This concern is not new. Winston Royce's **1970** paper, often associated with waterfall, already warned about the risks of a simple one-pass sequence. It included feedback between stages, early trial work, and customer involvement. “People used to plan everything once, then Agile invented iteration” is too neat a version of the history.

### Shorter cycles brought feedback closer

The **2001 [Agile Manifesto](https://agilemanifesto.org/)** put more weight on working software, collaboration, and responding to change. Its [principles](https://agilemanifesto.org/principles.html) call for frequent delivery and close work between business people and developers.

For our booking feature, that could mean delivering cancellation for a single booking, watching people use it, and using what we learn before tackling recurring bookings. We still need requirements, design, testing, and delivery. We do them in smaller pieces and revisit them as we learn.

Agile does not mean “no plan” or “no documentation.” The manifesto explicitly says those things have value. It changes their priority when following the original plan would stop us responding to new information.

### Delivery and operations became part of the same conversation

Smaller changes still get stuck if developers finish their work and leave another team to figure out how to release and run it.

**DevOps** emphasizes collaboration between the people building software and the people running it, supported by practices such as automated checks, repeatable releases, and monitoring. The first **DevOpsDays in 2009** is one early landmark: its [program](https://legacy.devopsdays.org/events/2009-ghent/program/) brought together deployment pipelines, infrastructure, monitoring, and cooperation across those roles.

For our feature, the question is no longer only “Does cancellation work on my machine?” It is also “How do we release it safely, and how will we know if it stops working?”

These approaches did not neatly replace one another. A team can plan a migration carefully, build it in small increments, and use automated delivery. We should choose practices because they address a real need, not because they belong to the newest label.

<details>
<summary>A short reading trail</summary>

- **Royce and waterfall:** this [university teaching summary of the 1970 paper](https://www.cs.huji.ac.il/w~feit/sem/se09/Waterfall.pdf) shows the feedback loops, early trial work, and customer involvement. It is a later presentation, not the original paper.
- **Agile:** read the [four values](https://agilemanifesto.org/) and then the [twelve principles](https://agilemanifesto.org/principles.html). Notice how much they say about collaboration, good design, and useful software—not ceremonies.
- **DevOps:** browse the [2009 event program](https://legacy.devopsdays.org/events/2009-ghent/program/). The problems are recognizable even though the tools have changed.

</details>

## What we will carry into agentic work

**Our recommendation: keep the whole lifecycle in view, but work in small changes you can check.** Spend more time up front when a decision is expensive to reverse or several teams must agree. Try something early when the uncertainty is whether it will help the user.

An agent can help us investigate, plan, write code, test, and review. It does not make the underlying questions disappear. Generating the cancel button faster does not decide who should be allowed to use it.

Before moving on, take a recent change of your own. Where did you discover something important: while discussing it, building it, testing it, or after release? Could a smaller experiment or an earlier conversation have exposed it sooner?

That is the habit we will build on: use agents across the work, while keeping decisions and results open to inspection.

## Where this section goes next

- **Specifications and spec-driven development:** turn an idea into clear requirements, examples, and acceptance criteria; use the spec to guide and review implementation.
- **Design patterns:** recognize useful patterns, reuse what fits, and avoid adding architecture the problem does not need.
- **Test-driven development:** define behavior with a failing test, implement it, then refactor. Use the agent without letting it weaken the test to get a pass.
- **Code quality:** readability, maintainability, code review, refactoring, and keeping changes focused.
- **Putting it together:** short practical examples of moving from a request to a change we can explain and verify.

We'll use focused examples for these topics, rather than one shared course project.

### Optional watch: put a specification to work

[**Full Course: Spec-Driven Development with Coding Agents**](https://www.youtube.com/watch?v=hy8UstR2NEg) — Paul Everitt, DeepLearning.AI with JetBrains · **62 minutes**.

Use this as a longer follow-on when you want to explore spec-driven development (SDD). The course description covers a project constitution, planning and validating features against a Markdown spec, introducing SDD to existing code, and packaging the workflow as a reusable skill. It is optional, not a prerequisite for this workshop.

**Watch with one change of your own in mind:** what belongs in its specification, and what evidence would show that the implementation meets it? Borrow the procedure; we will continue using OMP rather than requiring another tool setup.

For a contrasting, use-case-driven approach to business applications, see [Simon Martinelli's talk in Optional flavors](07-optional-flavors.md#optional-watch-a-use-case-driven-approach).

[Previous: Key productivity tips](../working-with-omp/index.md) · [Next: Optional flavors](07-optional-flavors.md) · [Back to the outline](../../OUTLINE.md)
