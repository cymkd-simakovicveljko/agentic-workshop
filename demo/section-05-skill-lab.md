# Section 5 — review-skill comparison

Compare ordinary review with a focused procedure using **the same proposed
unfinished-task filter**. The packet below is the complete input: no vanished
fixture, legacy project, custom installed skill or saved test run is needed.

## Understand

This activity tests whether a reusable review procedure improves useful judgment.
It does not test whether an OMP skill was discovered or selected: pasting
instructions is not registering a skill. The lesson's optional native route
separately explains how to investigate those mechanisms.

The proposal uses the `id`, `title` and `done` task shape from `demo/todo-app`.
It is a deliberately incomplete candidate for the `exercise/unfinished-filter`
problem, not the implementation on that branch or `solution/unfinished-filter`.
Review the printed candidate, not whichever code is currently checked out.

The exercise is read-only. Leave your own branch and dirty work untouched; do not
apply this candidate or switch branches to perform the comparison. If you later
choose to repair it, preserve current work and create your own work branch from
`exercise/unfinished-filter` using the section 3 workflow. Do not repair the
canonical exercise or solution branch in place.

## Watch or try

### 1. Copy the review packet unchanged

Give **only this packet and the relevant request/procedure** to each review
session. Do not ask the agent to read this entire guide: the debrief below would
leak the expected findings. Keep the same provider/model, relevant settings,
available tools and ambient instructions across conditions. Note anything that
makes the comparison less controlled, including existing review skills.

**Start of review packet**

**R — accepted behavior**

- R1: The checkbox is labeled “Show unfinished tasks” and begins unchecked.
- R2: When checked, completed tasks are hidden; unfinished tasks remain visible.
- R3: Unchecking restores the full task list with the same task identities,
  titles and completion states. Filtering is a view operation, not deletion.
- R4: Filtering alone must not change the saved task data. Reloading must retain
  all tasks. The filter setting itself does not need to survive reload.

**C — proposed implementation excerpts**

These are the proposed additions and relevant existing behavior within the
component. Ordinary add/complete/delete controls are omitted from this packet;
no claim about their implementation can be established from their omission.
`tasks` is React state initialized with the persisted task list. The initial
example list contains both unfinished and completed tasks.

```jsx
// C1 — existing task state and persistence path
const [tasks, setTasks] = useState(() => loadTasks(window.localStorage))
const [storageError, setStorageError] = useState('')

function changeTasks(nextTasks) {
  setTasks(nextTasks)
  setStorageError(
    saveTasks(nextTasks, window.localStorage)
      ? ''
      : 'Changes are only saved in this tab.',
  )
}

// C2 — proposed filter state and change handler
const [showUnfinished, setShowUnfinished] = useState(false)

function changeFilter(event) {
  const checked = event.target.checked
  setShowUnfinished(checked)
  if (checked) {
    changeTasks(tasks.filter((task) => !task.done))
  }
}

// C3 — proposed view selection
const visibleTasks = showUnfinished
  ? tasks.filter((task) => !task.done)
  : tasks

// C4 — proposed checkbox; the existing list now maps visibleTasks
<label>
  <input
    type="checkbox"
    checked={showUnfinished}
    onChange={changeFilter}
  />
  Show unfinished tasks
</label>
// Existing list rendering uses visibleTasks.map(...).
```

For this proposal, `saveTasks` has the following behavior, consistent with the
app's task-storage helper. It writes the supplied list, not a merged copy of old
and new tasks:

```js
// C5 — storage helper
function saveTasks(tasks, storage) {
  try {
    storage.setItem('todo-app-tasks', JSON.stringify(tasks))
    return true
  } catch {
    return false
  }
}
```

**T — supplied proposed test excerpt**

```js
// T1 — an assertion about array selection, not the component interaction
const tasks = [
  { id: 'a', title: 'Write proposal', done: false },
  { id: 'b', title: 'Read requirements', done: true },
]
assert.deepEqual(
  tasks.filter((task) => !task.done).map((task) => task.id),
  ['a'],
)
```

**E — available execution evidence**

No execution output is supplied. T1 is test source, not a passing-test record.
There is no browser interaction, storage inspection, or code revision attached
to a run. No checks have been run as part of this packet. A reviewer may reason
from C and T, but must not say the feature was tested or that a browser symptom
was observed.

**End of review packet**

### 2. Run the ordinary review

Start a fresh OMP session using your existing setup. Paste the packet and:

```text
Can we accept this proposed unfinished-task filter against the supplied
requirements? Give consequential findings and evidence gaps, with locations and
the next useful check. Review only the supplied packet; do not use tools, edit
files or run commands.
```

Save the answer before continuing. “Do not use tools” is the requested scope,
not a claim about enforced host permissions. This ordinary condition means no
extra course procedure was supplied; it does not prove that all ambient skills
or instructions were disabled. If the trace shows additional skill loading or
unexpected actions, record that and qualify the comparison.

### 3. Repeat with the procedure

In a different fresh session, paste the identical packet and request, then add:

```text
For this review:
1. Identify the accepted behavior, candidate and evidence actually supplied.
2. Check which code state the evidence describes and what its assertions cover.
3. Connect each consequential finding to a requirement and a code/evidence location.
4. Separate source-based conclusions, executed observations and missing evidence.
5. If a necessary input is unavailable, ask for it and bound the review; do not
   invent it. Report the next check that would resolve the important uncertainty.
Do not invent defects to fill a format or expand this review into implementation.
```

Do not paste the first answer, debrief or expected diagnosis. This condition
isolates the addition of a procedure as far as a small classroom comparison can;
it is not a provider benchmark. Record it as **pasted procedure**, not “native
skill loaded.” An installed skill with different instructions is a different
comparison, even if its name sounds similar.

### 4. Compare before reading the debrief

Use the following criteria for both answers. Mark each **supported**, **missed**
or **unsupported claim**, and quote the answer's relevant sentence. More words
or more findings do not earn a better result.

| Criterion | What a useful answer must establish |
| --- | --- |
| Consequential diagnosis | Connect the checkbox handler, task replacement and persistence to an accepted behavior. |
| Traceable support | Cite C/R/T/E locations rather than a generic warning about React state. |
| Evidence limits | Distinguish source reasoning from executed observations; do not invent a passing suite or browser run. |
| Test relevance | Explain what T1 checks and what it never invokes. |
| Useful next check | Describe an interaction and observations capable of detecting this failure. |
| Scope discipline | No edits, commands, invented requirements or unrelated review checklist. |

If neither answer gains a meaningful advantage, record that. If the procedure
improves one finding but introduces false claims, record both. Keep the actual
answers so that another learner can inspect your assessment.

### 5. Debrief: expected reasoning, not a recorded run

**Source-based defect:** C2 passes only unfinished tasks to C1. C1 replaces the
state list and calls C5, which attempts to overwrite the saved list. C3 can only
select from the now-reduced state. Unchecking therefore cannot restore the
completed tasks required by R3. If the storage write succeeds, reloading also
loses those tasks, contrary to R4. A failed storage write does not rescue the
in-memory loss; it only changes the persistence consequence.

This is not an in-place mutation of the original array: `filter` creates a new
array. The defect is replacing the authoritative task data with a display
subset. Being precise about that distinction helps identify the repair boundary:
view selection must not use the task-update/persistence path merely because the
checkbox changed.

**Evidence gap:** T1 exercises an array expression on fixed input. It does not
call `changeFilter`, render the checkbox, toggle it off, or inspect storage. Even
if T1 later passes, that would not establish R3 or R4. Here, E does not even supply
a test execution result. A reviewer should not turn the gap into a second claim
that the browser was observed to fail.

**Next useful check:** start with a known list containing one completed and one
unfinished task. Toggle the filter on and off through the actual checkbox;
confirm the same task identities, titles and completion states return. Compare
the saved task data before and after filtering, then reload and confirm both
tasks remain. Record the code state and observed result. That checks this defect
rather than merely repeating the array expression. Performing a repair or this
browser check is a separate task, not something the review session was asked to
do secretly.

A short answer making these distinctions can be stronger than a long review.
An answer that finds the data-loss path but claims to have reproduced it still
contains an important false observation.

## Use at work

### Boundary case A: genuinely missing acceptance criteria

Use a fresh session for each condition. **Do not include the earlier packet,
requirements or debrief.** Supply only this bounded packet and request; tools and
repository lookup are out of scope, so there is no hidden contract to discover:

```text
Review packet: a proposed helper and test source; no product requirements or
execution records are available for this case.

function selectTasks(tasks, unfinishedOnly) {
  return unfinishedOnly ? tasks.filter((task) => !task.done) : []
}

const input = [{ id: 'a', title: 'Write proposal', done: false }]
assert.deepEqual(selectTasks(input, true), input)

Is this ready to accept? Review only this packet; do not use tools, edit or run
commands. Identify what can be concluded and what necessary input is missing.
```

For the procedure condition, add the same five-step procedure, not the expected
answer. Desired behavior: explain that `false` returns an empty list, identify
that the test only covers `true`, and ask for the intended off-state behavior
before making an acceptance decision. It may describe a conditional defect
(“if off means show all…”), but must not invent that requirement or claim a test
run. Asking for a necessary missing contract is good; refusing to explain any
source behavior is unnecessarily unhelpful.

### Boundary case B: a close negative request

In another fresh session, use:

```text
Explain what this expression returns for checked and unchecked states:
const visibleTasks = showUnfinished
  ? tasks.filter((task) => !task.done)
  : tasks
This is a code explanation, not a readiness review. Do not use tools, edit or
run commands.
```

Expected behavior: explain the selected subset versus the full list, and that
this expression itself does not update state or storage. Do not demand a release
contract or manufacture readiness findings. For a pasted-procedure boundary
check, include the procedure as available guidance with “Use it only for a
readiness review; this request is an explanation.” That tests task scoping, not
automatic selection. For an already registered skill, use the ordinary request
without explicitly invoking it and observe selection separately; see the lesson.

### Turn observations into a maintenance decision

Save the input, model/settings, exact procedure or skill source, answer excerpts,
correct findings, misses, false claims and scope violations for all cases.
Decide **keep**, **revise**, **try another case**, or **remove**. Keep selection
failures separate from reasoning failures. A more precise description may fix
wrong routing; adding pages to the body is unlikely to do so.

Change one failing element and try an unseen case before concluding that the
procedure generalizes. If both conditions already work, a normal prompt may be
the right maintained solution. No measured gain or deterministic behavior follows
from this activity.

## Go deeper

The [lesson](../sections/05-skills.md#optional-evaluate-a-real-omp-skill) explains
metadata, loading evidence and optional documented native invocation. Packaging
is worth testing only after the procedure earns its place. Without model access,
perform a human review and procedure critique, explicitly leaving model
comparison and native loading untested.

### Sources and adaptation

- [Official OMP skills documentation](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md)
  establishes the distinction between discovered file-backed skills, on-demand
  body loading and optional explicit invocation. The pasted route above claims
  none of those mechanisms were exercised.
- All packets, code excerpts, procedures and expected findings are
  **course-authored teaching material**, adapted to the current todo-app task
  shape. The candidate is intentionally incomplete and unexecuted, not a live
  OMP transcript, an applied app patch, or a saved test result.

[Back to section 5](../sections/05-skills.md)
