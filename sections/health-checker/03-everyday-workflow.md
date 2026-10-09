# 4. Engineering workflows

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

## From the lifecycle to a controlled workflow

**The useful question is not “Can an agent do the steps?” It is “Who is allowed to move the work to the next step?”**

We will make that distinction concrete with a small, local workflow. First, ask an agent to follow a procedure. Then run the same rule through a program that can actually block its dependent step. The example is deliberately boring: a learner-owned text artifact must contain one exact line before a second file may be written.

This exercises part of the lifecycle: specify a result, choose a small design, implement it, check the behavior, review the change, and accept it only when the evidence is good enough.

## 1. Start with a bounded exercise

Use Node.js from the course setup and a Bash or Zsh terminal. Create a fresh scratch directory; do not run this in a repository with valuable files. If you try the optional agent step, open OMP in this directory too.

```sh
cd "$(mktemp -d /tmp/workflow-control-demo.XXXXXX)"
printf 'DRAFT\n' > artifact.txt
rm -f published.txt
```

The rule is specific:

- `artifact.txt` is accepted only when its complete contents are exactly `READY\n`.
- A successful check may write `published.txt`.
- A missing, malformed, or different artifact must not write `published.txt`.

### Ask for the procedure first

If you have an OMP session available, paste this request. It needs no provider-specific tool or framework:

```text
In this scratch directory, perform one bounded procedure.

1. Read artifact.txt.
2. Treat it as accepted only when its complete contents are exactly the
   single line READY followed by a newline.
3. If accepted, write published.txt with a short record of the accepted
   artifact. If it is missing or does not match exactly, do not write
   published.txt.

Do not edit artifact.txt, install packages, touch another directory, or
claim that a file was written unless you inspected it afterward. Report the
exact files you read or wrote and the observed result.
```

**Predict before you look:** if the agent says the artifact is rejected, is `published.txt` impossible to create? No. The prompt asks for a rule; it does not enforce the rule. The agent might follow it, misunderstand it, or report a result without changing the filesystem. A prompt is a request to a controller, not a controller.

Inspect the directory after the run. If an agent was unavailable, skip this optional run and continue; the deterministic exercise below is the required part. In either case, reset the downstream output before running the program:

```sh
rm -f published.txt
```

### Put the gate in code

Save this as `workflow-gate.mjs`:

```js
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const artifactPath = "artifact.txt";
const downstreamPath = "published.txt";

function revision(contents) {
  return createHash("sha256").update(contents).digest("hex").slice(0, 12);
}

async function main() {
  let contents;
  try {
    contents = await readFile(artifactPath, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    console.log(`GATE BLOCKED: missing ${artifactPath}`);
    console.log(`DOWNSTREAM SKIPPED: ${downstreamPath} was not written`);
    process.exitCode = 1;
    return;
  }

  const id = revision(contents);
  if (contents !== "READY\n") {
    console.log(
      `GATE BLOCKED: ${artifactPath} is not exactly READY followed by a newline`,
    );
    console.log(`OBSERVED REVISION: ${id}`);
    console.log(`DOWNSTREAM SKIPPED: ${downstreamPath} was not written`);
    process.exitCode = 1;
    return;
  }

  console.log(`GATE PASSED: ${artifactPath} revision ${id}`);
  await writeFile(downstreamPath, `published revision ${id}\n`, "utf8");
  console.log(`DOWNSTREAM ALLOWED: wrote ${downstreamPath}`);
}

main().catch((error) => {
  console.error(`WORKFLOW ERROR: ${error.message}`);
  process.exitCode = 2;
});
```

Run the failed branch. The shell commands below make the expected decision observable rather than trusting the program's prose:

```sh
node workflow-gate.mjs
gate_exit=$?
printf 'exit status: %s\n' "$gate_exit"
test "$gate_exit" -eq 1 &&
  test ! -e published.txt &&
  echo "confirmed: failed gate blocked downstream"
```

Expected shape of the output:

```text
GATE BLOCKED: artifact.txt is not exactly READY followed by a newline
OBSERVED REVISION: <12 hexadecimal characters>
DOWNSTREAM SKIPPED: published.txt was not written
exit status: 1
confirmed: failed gate blocked downstream
```

Now satisfy the same acceptance rule and run the success branch:

```sh
printf 'READY\n' > artifact.txt
node workflow-gate.mjs &&
  test -f published.txt &&
  cat published.txt
```

Expected shape:

```text
GATE PASSED: artifact.txt revision <12 hexadecimal characters>
DOWNSTREAM ALLOWED: wrote published.txt
published revision <the same 12 hexadecimal characters>
```

The exact hash depends on the artifact bytes. The observable contract is the branch: a failed check exits nonzero and does not write the dependent file; a passing check writes it. The commands above were checked locally in Bash and Zsh. Run them yourself to inspect the files rather than taking the output text on trust.

<aside class="judgment-callout">
<p class="judgment-kicker">The hinge</p>
<h2>Authorship and control are different axes.</h2>
<p>An agent can author <code>workflow-gate.mjs</code>, but once reviewed code runs, the program controls this branch. A human can write a prompt that says “run the check before publishing,” while the agent still controls progression if nothing else enforces that order. Ask two separate questions: who produced the instruction or code, and who can move the workflow forward?</p>
</aside>

## 2. The two axes we use to design workflows

### Axis one: arrangement

Arrangement describes the shape of dependencies. It does not say whether an agent, a program, or a person decides the next transition.

<div class="course-flow" aria-label="Workflow arrangement">
<span>Specify</span><span aria-hidden="true">→</span><span>Arrange dependencies</span><span aria-hidden="true">→</span><span>Execute branches</span><span aria-hidden="true">→</span><span>Join evidence</span><span aria-hidden="true">→</span><span>Accept or repair</span>
</div>

| Arrangement | Use it when | Minimum control rule | Common failure |
| --- | --- | --- | --- |
| **Sequential** | The next step depends on the previous result, or the work is small | Do not start step B until A has completed and its evidence is current | Treating “the agent said A is done” as evidence |
| **Parallel fanout/join** | Branches are genuinely independent | Give each branch an owned input/output; the join waits for every required branch and checks each result | Two workers edit the same file, or the join counts completion rather than success |
| **Conditional** | A known observation selects one of several paths | Define the observed condition and the behavior for missing or unknown evidence | Letting a vague model judgment choose a consequential branch |
| **DAG** | Several steps depend on earlier steps, with branches converging later | Make dependencies explicit; a failed branch blocks every dependent node | Hiding a cycle or forgetting one dependency at the join |
| **Bounded repair loop** | A check can produce a focused fix, then be rerun | Set a maximum attempt count and an escalation path before starting | Retrying forever, or weakening the check until it passes |

**Our default is sequential.** Use parallelism when branches can work independently, without conflicting edits, shared mutable state, or an unresolved shared decision. Parallel execution is not autonomy: four directed workers can still be one tightly controlled workflow. It is an execution arrangement, not a transfer of authority.

An independent branch needs more than a separate prompt. Name its input, output, and acceptance evidence. The join should fail closed when a required branch is missing, malformed, stale, or failed. “Three workers finished” is not the same as “the three required results passed.”

<div class="setup-platforms">
<details>
<summary><strong>Sequential: start here</strong><span>Use when dependency is real or the change is small.</span></summary>

Prompt:

```text
Inspect the current behavior and write down the acceptance criteria first.
Do not edit implementation files until I confirm the criteria. After I
confirm, make the smallest change, run the named check, and report the
command and result before proposing the next step.
```

Failure mode: a long sequence can serialize unrelated work. Split only after you can name independent inputs and a join that can check all outputs.

</details>
<details>
<summary><strong>Parallel fanout and join</strong><span>Use when branches own separate files or artifacts.</span></summary>

Prompt:

```text
Work on only your assigned file: src/a.js. Do not edit shared files.
Return the file path, the check you ran, and its observed result. The join
will not accept a summary without that evidence.
```

Join checklist:

1. Every required branch returned.
2. Every branch names the revision or input it checked.
3. Every branch passed its own acceptance check.
4. The join ran the integration check after all branches completed.

Failure mode: shared mutable files turn “parallel” into a race. Use separate worktrees or serialize the shared edit; a terminal tab is not file isolation.

</details>
<details>
<summary><strong>Conditional and DAG</strong><span>Use explicit edges, not implied conversation order.</span></summary>

**Conditional routing** chooses a path from an observed result. A controller around this demo could use exit `0` to permit acceptance, exit `1` to request a bounded artifact repair, and exit `2` to stop for an execution error. A missing result or an unknown exit code must also stop; neither means success. An agent can suggest a route for ambiguous work, but code should validate the prerequisite before a consequential action.

A **DAG** combines dependent paths:

```text
spec ──→ implementation ──→ unit-check ──→ acceptance
   └──→ design-review ────────────────┘
```

Implementation and design review can start independently after `spec`; the unit check waits for implementation. `acceptance` waits for both the unit check and design review. If `unit-check` fails, acceptance is blocked; if `design-review` is missing, acceptance is blocked. A DAG is acyclic by definition: it has no path that returns to an earlier node.

Failure mode: a “repair” edge from acceptance back to implementation is a loop, not a DAG. Model it as a bounded outer loop with an attempt counter, or keep the DAG for one attempt and let a separate controller schedule the next attempt.

</details>
<details>
<summary><strong>Bounded repair loop</strong><span>Use when a focused failure can guide a limited repair.</span></summary>

Prompt:

```text
Run the named check. If it fails, explain the observed failure, make one
small repair that addresses that failure, and run the same check again.
Allow at most two repair attempts. Do not weaken, delete, or broaden the
assertion. If it still fails, stop and escalate with the evidence.
```

Failure mode: “try again until green” rewards a changed test or a fabricated success. Keep the assertion stable, record each attempt, and stop at the bound.

</details>
</div>

### Axis two: controller

The controller is whoever or whatever decides whether a transition is allowed.

| Controller | Strength | Limit | Good fit |
| --- | --- | --- | --- |
| **Agent** | Handles ambiguity and can choose a useful next investigation | A prompt can be ignored, misunderstood, or satisfied with a claim | Exploration, diagnosis, draft plans, bounded local edits |
| **Code** | Repeats explicit checks and can stop a dependent action deterministically | It cannot decide whether a weak check is conceptually sufficient; it can be changed by whoever controls it | Status checks, file invariants, dependency ordering, attempt limits |
| **Hybrid** | Code owns deterministic transitions; an agent proposes or repairs; a person decides the judgment call | The seam must be explicit, or the agent quietly becomes the real controller | Most production engineering workflows |
| **Human approval** | A person owns a consequential judgment or release decision | A chat “yes” is not enough if it is not bound to the exact revision | Deployments, data changes, accepting ambiguous evidence |

The author of a controller does not change its kind. Agent-generated code is still a code controller after it is reviewed and executed. Human-written prompts are still agent-controlled if the agent can decide to skip, reinterpret, or reorder the steps.

The practical recommendation is **hybrid**: let the agent handle interpretation and small repairs; let code enforce objective prerequisites; require human approval for the judgment that code cannot settle. Keep the handoff visible:

```text
agent proposes → code checks → human approves revision → controlled action
```

## 3. Gates: permission to continue, not proof of truth

A deterministic gate answers **may the workflow continue?** It does not answer **is the result wise or sufficient for the real goal?**

Use a gate for facts that can be checked:

- every required check completed;
- evidence exists and has the required shape;
- evidence refers to the current revision, not an earlier one;
- every required branch passed;
- repair attempts remain below the bound;
- required approval is present and tied to the same revision.

Treat the judgment behind `approved=true` separately. A reviewer can approve a poor design, a test can encode the wrong requirement, and an agent can produce a convincing but incomplete report. The gate can enforce that an approval exists; it cannot make the approval correct.

### Evidence must be current

Bind evidence and approval to a revision identifier: a commit SHA, content digest, or other stable identity. If the artifact changes, invalidate the evidence and approval. A green result from revision A is not a green result for revision B.

The demo prints a short content revision so you can see this relationship. It does not implement a durable approval store, and it is intentionally not a security boundary. A user who can edit the program, the artifact, or the output directory can bypass it. That is useful for learning control flow, not for protecting production changes.

### A gate agent is not enforcement

An agent can be asked to “check the gate” and then rewrite the check, delete the evidence, or bypass its own failure. If the same writer controls the rule, the evidence, and the action, the rule is advisory.

Real enforcement puts the transition outside the writer's authority: for example, required CI checks and repository permissions can prevent a merge when checks fail. Configure the platform deliberately: GitHub accepts successful, skipped, or neutral conclusions for required status checks, and administrators may bypass protection unless restrictions apply to them. Require evidence that the intended check actually executed; “CI exists” is not proof that the author cannot bypass it. The platform's current settings and audit trail are the evidence.

### Restart and retry without inventing a framework

Persist the smallest useful state: revision, required checks, evidence locations, approval identity, and attempt number. On restart, reload it and revalidate it against the current revision. Do not resume from “green” merely because a status file exists.

Retries need a second question: was the previous side effect completed? Repeating a non-idempotent write, deployment, payment, or migration can do the action twice when the first result was lost. Prefer an idempotency key, an atomic temporary-file-and-rename pattern, or a manual check before retrying. Do not hide this risk behind a generic retry loop.

## 4. Apply the model to the SDLC

The workflow shape changes with the work, but the engineering obligations do not disappear when an agent does the typing.

### Specify: make “done” observable

Start with a small specification:

```text
Goal: accept a learner artifact only when its complete contents are READY\n.

Inputs:
- artifact.txt, owned by this exercise

Acceptance:
- exact bytes READY followed by one newline → pass
- missing, malformed, or different bytes → fail
- failure does not write published.txt
- success writes published.txt and records the checked revision

Out of scope:
- network calls
- package installation
- deployment
- treating an agent's report as evidence
```

This is enough to drive a small implementation. It names the boundary, success and failure, side effects, and what we are not building. Add detail when a decision is genuinely ambiguous; do not create a planning ceremony for a settled one.

Useful prompt:

```text
Turn this request into a small acceptance table. Include one passing case,
missing input, malformed input, and a case that looks successful but should
still fail. Do not propose architecture yet. Ask about only decisions that
change the contract.
```

### Design: reuse patterns before inventing architecture

Look for the existing repository convention, standard library primitive, and platform capability before adding a framework. The demo uses Node's standard file and hash APIs because the lesson needs one local gate, not a workflow engine.

Ask:

```text
Find the closest existing pattern for this behavior. Explain what it
already guarantees, what our acceptance criteria still require, and the
smallest change that reuses it. Do not add an abstraction for a single
caller or a future provider.
```

The design decision is not “agent or no agent.” It is which decisions need flexible interpretation and which transitions must be explicit, repeatable, and reviewable.

### Test first: fail for the right reason

For a settled behavior, write or state the failing check before asking for the repair:

```text
Add a test that fails because a malformed artifact is accepted. Keep the
assertion exact: malformed input must block the downstream write. Run it
and show the failure. Then make the smallest implementation change that
causes that same assertion to pass. Do not weaken, delete, or rewrite the
assertion to match the current behavior.
```

The sequence is **failing behavior → implementation → same check passes → refactor**. An agent that edits the test until it turns green has changed the contract, not fixed the implementation. Ask for the failing output and inspect the diff.

### Implement: keep the control point obvious

Put the gate where the dependent action is attempted. In the demo, `writeFile(published.txt)` is reachable only after the exact-content check. That locality matters: a reviewer can trace the branch without reconstructing a framework.

For a larger change, ask the agent to report:

```text
Name the transition that each check protects. For every downstream action,
show the exact evidence that permits it. If a check is advisory rather than
enforced, label it advisory.
```

### Review: check behavior and shape

Review two different things:

1. **Behavior:** Does the implementation meet the specification for pass, fail, missing, malformed, and stale cases?
2. **Shape:** Is the code readable, focused, and consistent with nearby patterns? Did it add speculative flexibility, duplicate an existing helper, or hide the control point?

Use a concrete review request:

```text
Review this change against the acceptance table and the repository's nearby
patterns. Return findings only when you can point to a behavior, a missing
failure case, a stale-evidence risk, or unnecessary complexity. Include the
file and line, why it matters, and the smallest repair. Do not rewrite the
whole change.
```

Read every changed and untracked file. A clean agent summary is not a code review, and a passing check is not proof that the intended behavior was checked.

### Accept: make a decision from evidence

Acceptance is a human judgment informed by checks:

- the current revision is identified;
- required checks ran against that revision;
- failures blocked dependent work;
- the evidence is understandable and current;
- the change remains within scope;
- any remaining uncertainty is named.

Record what you actually observed:

```text
Revision:
Required checks and observed results:
Evidence locations:
Approval bound to:
Failed or skipped branches:
Remaining uncertainty:
Decision: accept / repair / escalate
```

Do not turn “the agent said it passed” into a substitute for the command, file, or review that would let another person reach the same conclusion.

<aside class="judgment-callout">
<p class="judgment-kicker">Use the smallest controller that holds</p>
<p class="judgment-lead">A prompt is enough for a reversible exploratory step. Add a code gate when a dependent action must not happen after a known failure. Add protected permissions or human approval when the writer must not be able to bypass the transition.</p>
</aside>

## 5. What to try next

Take the demo one step further without turning it into a framework:

1. Remove `published.txt`, then delete `artifact.txt` and run the gate. Confirm that missing input creates no downstream file.
2. Keep `published.txt` absent and change the artifact to `READY` without a final newline. Confirm that exact acceptance still fails.
3. Run the success case, edit `artifact.txt`, and inspect whether the existing `published.txt` still names the old revision. It does; that is stale output, not fresh approval.
4. Add a second check that reads the current revision and refuses to reuse stale output. Keep the check local and bounded.
5. Ask an agent to propose the change, then inspect its diff and run the same cases yourself.

The last step matters most: the agent may author the code, but the workflow should make its permitted transitions visible. If the change affects a real repository, move enforcement to the CI or review system that the author cannot rewrite, and verify the actual permissions and required checks.

## Sources and execution limits

**Source facts:**

- GitHub Actions documents `jobs.<job_id>.needs` as a dependency: a job waits for its prerequisites, and a failed or skipped prerequisite causes dependent jobs to be skipped unless an explicit condition changes that behavior. See [Using jobs in a workflow](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-jobs).
- GitHub documents required status checks, required reviews, stale-review dismissal, and bypass permissions as separate protected-branch settings. See [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) and [Dismissing a pull request review](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/dismissing-a-pull-request-review).
- The Bash reference describes the exit status of a command and the shell's use of a nonzero status for failure. See [Exit Status](https://www.gnu.org/software/bash/manual/bash.html#Exit-Status).

**Course recommendations:** sequential by default, explicit ownership for parallel branches, revision-bound evidence, bounded repair, and hybrid control are our engineering recommendations. They are not guarantees supplied by an agent or by this local script.

**Execution limits:** the Node example uses only standard-library file and hash APIs and was exercised locally: the draft, missing input, missing newline, and extra-content cases blocked the write; the exact accepted input wrote the matching revision. The displayed failure/success commands also ran in Bash and Zsh. This demonstrates control flow, not tamper-resistant security, durable approvals, crash recovery, or a production deployment. Provider access is optional, and no provider-backed run is claimed here.

## Optional watch: put a specification to work

[**Full Course: Spec-Driven Development with Coding Agents**](https://www.youtube.com/watch?v=hy8UstR2NEg) — Paul Everitt, DeepLearning.AI with JetBrains · **62 minutes**.

Use this as a longer follow-on when you want to explore spec-driven development (SDD). The course description covers a project constitution, planning and validating features against a Markdown spec, introducing SDD to existing code, and packaging the workflow as a reusable skill. It is optional, not a prerequisite for this workshop.

**Watch with one change of your own in mind:** what belongs in its specification, and what evidence would show that the implementation meets it? Borrow the procedure; we will continue using OMP rather than requiring another tool setup.

For a contrasting, use-case-driven approach to business applications, see [Simon Martinelli's talk in Spec-driven development](07-optional-flavors.md#optional-watch-a-use-case-driven-approach).

[Previous: Key productivity tips](../working-with-omp/index.md) · [Next: Spec-driven development](07-optional-flavors.md) · [Back to the outline](../../OUTLINE.md)
