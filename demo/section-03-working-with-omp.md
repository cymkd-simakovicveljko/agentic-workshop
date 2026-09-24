# Section 3 — host and context state exercise

## Understand

Choose a control because of the state it changes, not because its name sounds
like a clean start. The required reasoning route below is self-contained: no
provider, app, OMP session, branch change or earlier learner work is needed. The
optional local route exercises actual controls in a disposable directory.

**Evidence boundary:** prepared observations below are invented teaching data.
Commands and predicted effects come from the reviewed OMP 18.2.9 documentation;
none claims that these controls, a provider or a classroom were exercised by the
course author. Keep your own results separate from the prepared packet.

## Watch or try

### 1. Choose actions before seeing the worked answer

Here is the **prepared starting state**:

- The accepted brief says: “Count unfinished tasks. Deleting a completed task
  leaves the count unchanged. Do not change persistence.”
- A file named `operator-note.txt` contains “Preserve this note.” Its contents are
  not an automatically loaded instruction file.
- A separate foreground terminal process is printing a heartbeat. It was started
  by the human, outside OMP.
- The conversation includes the brief, several irrelevant explanations and a
  failed browser startup. No browser assertion has run.

For each decision, name one suitable action and one fact to inspect afterward:

| Situation | Your action | What must still be checked? |
| --- | --- | --- |
| Useful history is large; the next decision only needs the brief and latest evidence. | | |
| The provider stream appears wedged, but the conversation is still relevant. | | |
| You want an independent review without the earlier mistaken explanation. | | |
| You return tomorrow to a saved session. | | |
| You interrupt while the assistant is responding. | | |

Now consider a **prepared compaction summary**:

> Add a task counter. An edit was applied; unit tests passed. Continue checking
> deletion. Preserve the current storage approach.

A continuation proposes to subtract one on every deletion. What did the summary
lose? Is a smaller context enough to justify proceeding? Write a corrected next
request, not a claim that the app has been fixed.

### 2. Compare the prepared observations

Reveal these only after predicting:

| Prepared action/result | Interpretation to test |
| --- | --- |
| `/compact` finishes; its summary is the incomplete one above. The old scrollback remains visible. | Did the important constraint survive in the material guiding the next request? |
| `/fresh` finishes after streaming stops. The conversation is retained. | Would it remove the mistaken “subtract on every deletion” interpretation? |
| `/new` starts an empty conversation with a new identity. | Did it reset the file or the human-started heartbeat? |
| `/resume` selects a session from another project and reports that directory. | Which cwd should the next operation use? |
| The operator presses Escape; the assistant stops. The separate terminal still prints. | What was cancelled, and what was not? |

Do not add a file deletion, process exit, browser result or provider charge that
is not in this packet. An unknown outcome stays unknown. Explain your choices to
a partner before reading the worked interpretation below.

### 3. Optional local host inspection

You can run only these two terminal commands without starting a model session:

```sh
omp --version
omp --help
```

Compare them with the [version-pinned lesson reference](../sections/03-working-with-omp.md).
If OMP is absent, use the prepared packet; don't install or authenticate merely
to finish this reasoning exercise. If your version differs, use matching docs
before trying version-sensitive controls.

For actual interactive practice, use an authorized installation/provider and a
new disposable directory containing no private material. Startup, extensions and
context maintenance may perform work beyond the message you type; this route is
not represented as a guaranteed no-network or zero-cost mode. Respect your
organization's environment policy.

**Terminal A:** use `mktemp -d` to obtain a new empty directory, record its exact
path, then `cd` to that printed path. Do not reuse a directory with existing work.
In your editor, create `practice-brief.txt` with the three accepted sentences from
the packet and `operator-note.txt` containing “Preserve this note.” These are
exercise data, not new repository instructions. Record their contents.

If Node is already installed, start this bounded-purpose foreground process in
Terminal A; otherwise skip it and mark process behavior unexercised:

```sh
node -e 'setInterval(() => console.log("host-state exercise"), 2000)'
```

The expected observation is one line every two seconds until stopped. Keep the
terminal open so you know exactly which process you own. It writes only stdout;
there is no app server, port, background worker or network operation to configure.

**Terminal B:** enter the same recorded directory and launch:

```sh
omp --approval-mode always-ask
```

Inside OMP, enter `/hotkeys`, then `/extensions` separately. Record the active
interrupt/expand bindings and any context file's reported source/state without
changing settings. No discovered file is a valid observation; do not create an
`AGENTS.md` just to make the display interesting. Inspect applicable guidance
before sending a request, because even a disposable directory can have ancestor
or user-level context.

Select an authorized model with `/model`. Then submit:

```text
Read practice-brief.txt. Explain the accepted count behavior and propose the
smallest check that rejects subtracting one on every deletion. Do not edit files,
run commands or contact external systems. Name missing evidence, then stop.
```

While the response is active, use the observed interrupt binding once and confirm
its effect. If it finishes too quickly, record **completed before interruption**;
don't invent a cancellation result or create a long-running model task just to
catch it. Inspect the visible tool results for any completed actions. Compare the
marker contents in your editor and the heartbeat in Terminal A afterward.

Once streaming and relevant activity have stopped, use `/fresh` and inspect the
reported reset alongside retained conversation. Then use `/new` for an independent
conversation. Inspect the marker and heartbeat again. A new conversation still
needs the brief explicitly supplied/read; the file name alone is not its contents.
Stop the heartbeat with `Ctrl+C` in Terminal A when finished. Confirm that terminal
returns to its prompt before closing it.

This run distinguishes provider-state reset from conversation reset and external
state. It does not prove cancellation if you never observed an active response
stop, and it does not prove a code feature: no todo app was edited or exercised.

### 4. Optional compaction and resource inspection

If you already have an authorized disposable session with enough useful history,
inspect any available context-size/maintenance indication, recording its label
and whether it is an estimate. You do not need to generate extra history or force
an automatic threshold. When a directed summary is authorized, inside OMP use:

```text
/compact Preserve the accepted unfinished-count rule, completed-task deletion behavior, no-persistence-change boundary, and actual verification gaps.
```

This can require a provider request. Inspect the actual result and summary,
expanding the compaction entry with the active output-expansion binding if
available. Compare with `practice-brief.txt`; explicitly reread a missing or
uncertain constraint before continuing. A refusal, no-op or unavailable provider
is a result to record, not a reason to fabricate a summary or weaken policy.
Automatic compaction is conditional; no observed maintenance means **not observed**.

`omp stats` and `omp usage` are optional **terminal** actions, only with approval
to inspect local/account usage. The latter can query authenticated providers.
Do not run it in the no-provider route or display account identifiers publicly.
Record the scope and units actually shown, not a promised field or assumed bill.
Return to [section 2's synthetic ledger](section-02-agent-loop.md#2-interpret-usage-not-a-bill)
if usage data is unavailable. Per-task effort settings and editor integrations are
not needed here.

## Use at work

Keep the result in your own notes: which control you chose, why, what you observed
changing, and what stayed unchanged or unknown. If another person will continue,
use the course's single [handoff format](section-05-context-and-handoff.md) rather
than creating a second template. Include no credentials or raw private context.

Before a resumed session does anything consequential, confirm its cwd and inspect
current files, dirty work and relevant operations. The saved transcript describes
what someone knew then; it is not a current-state inventory. A reliable restart
may need a new conversation **and** a preserved worktree **and** a deliberately
stopped/restarted server. None implies the others.

For the optional practice route, retain only notes you need. After stopping the
known heartbeat and ending the disposable OMP session, remove only the practice
files/directory you created if desired. Do not delete OMP session history as an
assumed cleanup step or run a broad process-kill/temporary-directory cleanup.

## Go deeper

### Worked interpretation

For useful but large context, compaction is a plausible maintenance action. The
prepared summary is insufficient because it drops **unfinished** and the rule that
deleting a completed task leaves the count unchanged. It also mentions “unit tests
passed” without saying that rendered behavior is unverified. The browser never
started. Restoring those distinctions matters more than a lower context reading.

A corrected request is:

> Reread the accepted brief before changing anything. Count unfinished tasks;
> deleting a completed task leaves the count unchanged, and persistence must not
> change. The browser failed before assertions, so rendered behavior remains
> unverified. Compare the proposed deletion rule with these requirements and name
> the missing check. Do not edit yet.

`/fresh` fits provider-stream trouble after streaming stops, not removal of a bad
interpretation: it retains the conversation. `/new` fits an independent review;
`/clear` would instead clear live/model context while preserving session identity
and on-disk history. Neither resets an arbitrary file or the human's separate
foreground process. Supply the accepted brief and inspect current state again.

Resume chooses historical context; after a cross-project selection, verify the
new cwd rather than issuing a command intended for the old project. `/restart`
would relaunch OMP and resume its current session, not create a new reasoning
start. Interruption stops the observed response in the prepared case, but the
heartbeat continuing proves why cancellation and environmental cleanup cannot be
collapsed into one claim.

**Success:** you select controls for distinct causes, catch the lost constraint,
and report the external state separately. **Failure:** you treat `/fresh` as an
empty conversation, resume into an unchecked directory, infer that Escape undid an
edit, or accept a smaller summary that changes the requirement. Completing the
paper route demonstrates those decisions, not working interactive controls.

### Sources and adaptation

- [OMP 18.2.9 session operations](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/session-operations-export-share-fork-resume.md): exact fresh/clear/new/resume/restart boundaries.
- [Compaction](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/compaction.md): conditional maintenance and visible versus model-facing history.
- [CLI](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/cli-reference.md), [keybindings](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/keybindings.md) and [context files](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/context-files.md): launch/inspection surfaces and their conditions.

The packet, marker/heartbeat exercise and worked answers are course-authored
procedures, not observed OMP output. Source review, your local host exercise,
provider execution and classroom rehearsal remain separate evidence.

[Back to section 3](../sections/03-working-with-omp.md) · [Next: The everyday workflow](../sections/04-the-everyday-workflow.md)
