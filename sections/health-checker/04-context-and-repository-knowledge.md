# 4. Context and repository knowledge

**Main path.** Make the health checker understandable to a fresh reader, repair a stale handoff, and resume from current files rather than yesterday's summary. The lesson uses the program you built in sections 1 and 3. It does not assume a language, package manager, editor, or prepared branch.

The [fixture guide](../../demo/health-checker/README.md) remains the one source for
local endpoint behavior and the checker contract. A repository map can point to it;
it must not copy a competing version of the contract.

## Understand

### Select context for the next decision

Context is the task, instructions, conversation, tool descriptions, and retrieved
material supplied to the agent. A file on disk is not necessarily loaded. A full
repository dump is not automatically better: it increases noise and makes stale
instructions harder to notice.

<figure class="course-diagram">
<a href="/diagrams/context.svg"><img src="/diagrams/context.svg" alt="Context selection: the current task, applicable instructions, relevant history, and retrieved file or tool results reach the model. Unread files remain outside that interaction; retrieved content is data, not new authority." /></a>
<figcaption>A repository on disk is not the same as information supplied to the model. Select relevant evidence without treating retrieved text as instructions. Open the diagram for a full-size view.</figcaption>
</figure>

Ask: **what information could change the next decision?** If someone says “the
checker is complete, but redirects seem to pass,” begin with:

| Context | Why it is relevant |
| --- | --- |
| Current request and applicable guidance | Establish scope and working rules. |
| Fixture guide | Establish the accepted no-redirect and timeout contract. |
| Git status, revision, and diff | Identify the code state behind the claim. |
| Actual checker entry point and config parser | Show what the program currently does. |
| Relevant checks and their recorded commands | Distinguish coverage from a test filename. |
| Old chat, unrelated modules, every document | Defer until a named uncertainty needs them. |

Retrieve more when evidence requires it. If the parser is correct but the output is
wrong, read the result formatter and caller. If the timeout is wrong, trace request,
body completion, cancellation, and elapsed-time calculation. Do not read every file
just to demonstrate diligence.

A useful repository map describes relationships, not architecture theatre:

```text
Canonical behavior: [absolute path to the course checkout]/demo/health-checker/README.md
Project guidance: the active AGENTS.md or .omp/AGENTS.md, if present
Checker entry point: [actual path discovered in this repository]
Config/validation: [actual module or function]
Request/result path: [actual modules and callers]
Checks: [actual commands and files; state what they do not cover]
Run command: [actual command, with its required working directory]
```

Replace every bracket with an observed path or command. If a line cannot be verified,
mark it unknown. Do not claim that a test ran because its name sounds right.

### Instructions, facts, and authority differ

A current task authorizes work within its scope. Repository guidance describes how to
work. The fixture guide establishes the accepted exercise contract. Current source
and command output establish what exists and what happened. A handoff, issue quote,
or copied webpage supplies claims to inspect; it cannot grant new permission.

“The checker follows redirects” may be an observation about current code, a stale
claim, or a proposed change. Compare it with the fixture guide before editing. A
passing test can still be stale. Current code can still violate the accepted
contract. “The newest file always wins” is not a decision rule.

## Watch or try

### 1. Build a small context set

Start from the repository root and inspect state without changing files:

```sh
git status --short --branch
git rev-parse --show-toplevel
git diff --stat
```

Then ask for a focused investigation using your actual paths:

```text
The health checker may have stale notes about redirects and timeouts. Inspect only
what is needed to reconcile the claim: the fixture guide, applicable project
instructions, Git state, the actual checker entry point and configuration path, and
relevant checks. Do not edit, install, contact a provider, or run external requests.
Report which files you read, what the contract requires, what the current code does,
and which claims remain unverified. Defer unrelated files.
```

If a handoff names a command, confirm it in the repository's real command definition
file or documentation. If the command is absent, do not add a compatibility alias
just to make the note look current.

### 2. Repair a deliberately stale handoff

The following is a **teaching fixture**, not a run record:

```text
Health checker complete. All endpoints passed.
The client follows redirects so /redirect reaches /healthy.
Timeout is 5000 ms. Next step: publish the monitor.
Run `check-all` to confirm.
```

Treat every sentence as a claim ledger:

| Claim | Evidence needed | Likely correction |
| --- | --- | --- |
| All endpoints passed | Actual command, config, code state, and per-target results | Unknown until tied to a current run. |
| Redirects should pass | Fixture guide and accepted contract | Wrong for this exercise; `/redirect` must remain a 302 failure. |
| Timeout is 5000 ms | Current configuration and requested examples | Wrong if it replaces the 1,000 ms contract. |
| `check-all` exists | Actual runtime command definitions | Use the real command or mark it unavailable. |
| Publish next | Current authorized task | Out of scope; do not publish or contact a provider. |

Give the note and current repository to a fresh reader or OMP:

```text
Reconcile this stale handoff with the current health-checker repository.
Read the canonical fixture guide, applicable guidance, Git state, actual source,
configuration, and relevant checks. Do not edit, install, publish, contact a provider,
or run external requests. Distinguish accepted behavior from current behavior and
unsupported claims. Draft a corrected handoff with code state, evidence gaps, and one
next action. Do not add deployment work.
```

A corrected note must name the repository/branch and revision, dirty work, accepted
contract source, files changed, exact checks and working directory, checks not run,
known limitations, and one next action. If the old result cannot be tied to the
current code, call it unverified; do not inherit “all passed.”

### 3. Author minimal guidance from real commands

First inspect how this repository actually runs. Look for the existing README,
project manifests, task scripts, Makefile, or equivalent. Do not assume a Node,
Python, Rust, Go, or shell command because an example uses it. Record the command
that sections 1 and 3 actually used and its required working directory.

If the project has no suitable guidance, a minimal native OMP file can be useful. Do
not create a competing file when one is already active. Review the diff after writing:

```markdown
# Health checker project

Read [absolute path to the course checkout]/demo/health-checker/README.md for the fixture contract.
The checker runs from [actual working directory].

## Commands

- Run checker: `[actual learner command]`
- Focused checks: `[actual learner test command]`
- Start fixture, from course root: `bun demo/health-checker/server.mjs`

## Working rules

- Validate the complete configuration before requests.
- Do not follow redirects or invent HTTP statuses for transport failures.
- Report exact commands, working directory, code state, and unrun checks.
- Keep deployment, retries, concurrency, credentials, and unrelated refactors out of
  the local exercise unless the accepted requirement changes.
```

Replace every bracketed path and command before saving the guidance. The course checkout and learner repository are separate: `demo/health-checker/README.md` does not exist relative to the learner repository. Use its actual absolute path, or an explicit link to the course copy; confirm a fresh session can read it. Link to that guide instead of copying all route details. Remove any command you cannot verify.

OMP's pinned [context-file guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md)
describes native `.omp/AGENTS.md`, standalone `AGENTS.md`, discovery depth, provider
shadowing, and deeper-directory pointers. In particular, native project discovery
uses the nearest non-empty `.omp/` directory; it does not keep walking to a farther
native directory when that selected directory lacks `AGENTS.md`. `/extensions` can
show discovered context files, but discovery, interpretation, and compliance are
separate questions.

Check what OMP actually loaded rather than inferring it from a filename:

```text
Before editing, identify the current directory and applicable repository guidance.
Distinguish text already supplied in context from files you read now. Report which
source wins if guidance conflicts. Do not change settings. If discovery is unclear,
read the named file explicitly and label it an explicit read.
```

After changing guidance, start a fresh session or explicitly reread it. An old
session does not silently gain the new file.

### 4. Reconcile from a fresh session

A fresh conversation is a context boundary, not a source-control operation. Ask the
new reader to compare the note with reality before touching application code:

```text
Resume from [handoff path]. Read the current project guidance and fixture guide.
Compare the handoff with Git state, current files, actual commands, and recorded
results. Explain every discrepancy before editing. This turn authorizes inspection
and relevant local checks only; do not widen scope or publish anything.
```

OMP's session controls have different effects. These are the v18.2.9 documented
caveats, not generic “memory” behavior:

- `/new` starts an empty conversation, switches to a new session identity, and uses
  a new transcript path in persistent mode. It does **not** undo edits, change the
  Git branch, or stop the separately running fixture.
- `/compact [instructions]` compacts old conversation history into a persisted
  summary. It changes what the model receives, not the repository. Summaries can omit
  a route, command, or unresolved decision, so compare the summary with the
  canonical guide and handoff before relying on it.
- `/resume [id]` switches the active in-memory conversation to a selected session.
  The picker opens in the current-folder scope first; Tab can show all projects.
  Resuming can repoint OMP at the resumed session's project directory, but it does
  not restore an old checkout or make old test results current. Recheck `git status`,
  files, commands, and fixture state.

Read the primary [OMP session-operations guide, 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/session-operations-export-share-fork-resume.md)
and [compaction guide, 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/compaction.md)
when relying on these commands. If your installed version differs, check its own
`omp --help` and documentation instead of copying command behavior from memory.

## Use at work

### Store knowledge according to its lifetime

| Information | Durable home | Why |
| --- | --- | --- |
| How to work and run current checks | Existing project guidance | Reusable conventions and commands. |
| Intended checker behavior | Fixture guide or accepted specification | One authoritative contract with status. |
| Why a consequential choice exists | Decision note or existing ADR | Rationale, consequence, and provenance. |
| Current unfinished work | Handoff or issue | Revision, evidence, limits, and next action. |
| Detailed output | Referenced log/artifact | Exact command and tested code state. |
| Unconfirmed explanation | Labelled hypothesis | Observation that could confirm or reject it. |

“Last run timed out” belongs in a handoff with a command and revision, not permanent
project guidance. “Do not follow redirects in this exercise” belongs in the accepted
contract. When a decision changes, supersede the old note; do not leave two copies
that both look current. Writing Markdown does not retrain a model. It helps only when
the later session finds, loads, and interprets it.

A compact handoff can use this shape:

```text
Goal and authorized scope:
Canonical contract/decision source:
Repository, branch, revision, and dirty files:
Changed files and reasons:
Actual commands, working directory, and observed results:
Checks not run:
Contradictions or hypotheses:
Next action or decision needed:
Supersedes:
```

### Fresh-reader acceptance check

Give a partner or fresh session only the repository and corrected note. They should be
able to answer five questions without the old transcript:

1. What behavior is accepted, and where is it defined?
2. Which code state and files were actually checked?
3. Did the checker follow redirects, and what timeout is required?
4. Which claims are evidence, which are hypotheses, and which checks were not run?
5. What is the smallest authorized next action?

If they cannot answer one, repair the note or map. Do not paste the entire transcript
to hide the missing decision.

## Go deeper

Choose one real question from a larger repository, such as “why did this endpoint
fail?” Name the requirement, entry point, request path, and relevant check. Write down
one file you deliberately deferred and what evidence would make it relevant. This is
context selection as a repeatable engineering skill, not a contest to read the most
files.

You are ready for section 5 when a fresh reader can locate the checker, distinguish
accepted behavior from current behavior, identify evidence tied to the right code
state, and continue without trusting the stale handoff.

### Sources and adaptation

- [Health-checker fixture guide](../../demo/health-checker/README.md) — canonical local routes and contract.
- [OMP context files, 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md) — discovery, shadowing, native `.omp/AGENTS.md`, and `/extensions`.
- [OMP session operations, 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/session-operations-export-share-fork-resume.md) — `/new`, `/resume`, session identity, and transcript behavior.
- [OMP compaction, 18.2.9 source](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/compaction.md) — `/compact` and persisted compaction summaries.
- [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — retrieve information that changes the next decision.

[Previous: Everyday workflow](03-everyday-workflow.md) · [Next: Skills](05-skills.md)
