# 4. SDLC: the everyday workflow

**The useful question is not “Can an agent do the steps?” It is “Who is allowed to move the work to the next step?”**

We will make that distinction concrete with a small, local workflow. First, ask an agent to follow a procedure. Then run the same rule through a program that can actually block its dependent step. The example is deliberately boring: a learner-owned text artifact must contain one exact line before a second file may be written.

This is the software development lifecycle (SDLC) in miniature: specify a result, choose a small design, implement it, check the behavior, review the change, and accept it only when the evidence is good enough.

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

[Previous: Key productivity tips](../working-with-omp/index.md) · [Next: Optional flavors](07-optional-flavors.md) · [Back to the outline](../../OUTLINE.md)
