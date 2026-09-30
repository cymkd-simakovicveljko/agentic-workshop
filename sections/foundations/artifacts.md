# 2.6 Artifacts

**Point:** an artifact is produced work you can inspect, preserve, or hand to another person or session. In this course that includes code, reports, plans, diagrams, traces, logs, configuration, and other files—not a specific vendor feature.

## Get useful work out of the chat

A plan you want to reuse belongs in a file. So does a report another engineer needs to review. Give the agent an explicit destination:

```text
Save the agreed plan to docs/checker-plan.md in this exercise repository.
Include the decisions, acceptance checks, and open questions. Read the saved
file back and tell me its path. Do not implement the plan yet.
```

Then open the file yourself. Reuse an existing project document when it already serves that purpose; avoid creating a second competing plan. In the next session, name the file and ask OMP to read it. Saving it does not make it automatic context.

## Report is not evidence

A report describes what someone believes happened. Evidence is the file state, command, output, exit status, or observation that supports the claim.

| Claim | Evidence that could support it |
| --- | --- |
| “The checker was created.” | The expected file exists and its contents are readable. |
| “The command passed.” | The exact command, working directory, output, and exit status. |
| “All acceptance checks passed.” | Current files plus the expected pass or failure result for every required route. |
| “The implementation handles timeouts.” | Source inspection and a current timeout result with no invented status. |

A successful write proves that a write happened. A successful command proves that a process exited as reported. Neither proves that the behavior satisfies the contract. Results from before the latest edit do not verify the latest version.

Treat generated files as work to review, including untracked files. `git diff` alone can hide a new source file. Inspect `git status --short`, the diff, and the paths reported by `git ls-files --others --exclude-standard`; then open the files that matter.

## Prepared trace: useful, but labelled

If a provider-backed transcript is unavailable, this compact trace can help you practise annotation:

```text
Engineer: Build a one-URL checker with status, literal body, timeout, no redirects.
Model:    I will inspect the repository and create a small program.
Tool:     read/list repository
Result:   no source files; instructions and the request are available.
Tool:     write checker source and a standard project file
Result:   files created successfully.
Tool:     run /healthy
Result:   status 200, expected text found, exit 0.
Model:    Inspect the files and run the remaining cases before accepting.
```

This is a course-authored prepared trace, not a captured provider transcript and not private reasoning. It supports only the visible requests, tool activity, and returned results shown. It does not prove that the remaining cases passed or that the generated code is safe.

## One small handoff artifact

After a real run, write a compact note another engineer can check:

```text
Goal and scope:
Code state and changed files:
Actual commands, working directory, and observed results:
Checks not run:
Claims still unverified:
Decision: accept / needs another change
Next action:
```

Put durable behavior and decisions in the right home: project guidance for current commands, the accepted fixture guide for the contract, a handoff for unfinished work, and a referenced log or report for detailed output. Do not put a one-off timeout result into permanent instructions and call it current truth.

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Sessions and memory](sessions.md) · [Next: Skills](skills.md)

## Sources

- [Health-checker fixture contract](../../demo/health-checker/README.md)
- [The checker example](../health-checker/01-getting-started.md) — inspect generated files and compare claims with actual checks.
