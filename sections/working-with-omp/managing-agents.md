# 6.4 Managing several agents

**Keep the main session for decisions and integration. Give a subagent one bounded, independent job.** A separate `omp` process is a separate session; it is not automatically a child in Agent Hub. A `task` subagent belongs to the current session and appears there. A Collab guest is a client of the host session, not another local worker.

## Give each session a home

For independent sessions, use separate terminal tabs labelled with the repository and task: `reader · inspect`, `docs · review`, or `docs · outline`. Keep a note of which session is working, waiting for your input, or ready for review. A quiet terminal does not prove the task is finished.

Keep edits to the same files in one session. If two sessions must implement independently in the same repository, use separate Git worktrees and review their changes before integration. Tabs organize your attention; they do not isolate files.

Subagents are different: the main session delegates a bounded job and collects its result. That is where Agent Hub becomes useful.

## Start with one worker

Use a small read-only request before delegating edits. For example, in the course checkout:

```text
Inspect README.md, package.json, and the reader startup code. Do not edit or
start a process. Return the entry point, run command, and any startup
prerequisite that the documentation leaves unclear. Cite source paths.
```

If the work is independent, ask OMP to dispatch one task agent. Do not start ten workers to make a small change: parallel workers add context, review, and merge work. Use another worker only when the slices do not touch the same files or depend on each other's decisions.

## Watch and steer in Agent Hub

Press `Alt+A` to open Agent Hub. Select a row with `j`/`k` or the arrow keys; `Enter` opens its transcript and editor. Then:

- type a message and press `Enter` to steer a running agent or prompt an idle one;
- press `r` only to revive a parked agent;
- press `x` to abort and release a running agent when you intend to discard that instance;
- press `Esc` to close the inspector or return to the main session.

The inspector shows the current tool, activity, context use when available, output and patch paths, and isolated-worktree metadata. Read that information before assuming a worker changed your checkout. A worker's report is not acceptance evidence; inspect the reported files and run the relevant check in the working directory you own.

## Keep sessions and directories straight

Start the main session in the repository it should work on, or say it explicitly. Replace this example path with your course checkout:

```sh
omp --cwd ~/code/agentic-workshop
```

Use `--add-dir` only when the task needs another workspace directory. `/resume` and `/fork` change session history and identity; they do not turn an independent session into a subagent. Agent Hub is for workers attached to the current session. `/jobs` is a status snapshot, not a transcript or a control surface.


[Back to Key productivity tips](index.md) · [Previous: Phone access](phone-access.md) · [Back to the outline](../../OUTLINE.md)

## Sources

- [OMP Agent Hub](https://github.com/can1357/oh-my-pi/blob/main/docs/agent-hub.md) — roster controls, transcripts, steering, revive, and kill.
- [OMP task-agent discovery](https://github.com/can1357/oh-my-pi/blob/main/docs/task-agent-discovery.md) — task agents, working directories, and spawn constraints.
- [OMP CLI reference](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md) — `--cwd`, `--add-dir`, and session commands.
- [OMP session operations](https://github.com/can1357/oh-my-pi/blob/main/docs/session-operations-export-share-fork-resume.md) — `/resume`, `/fork`, and session identity.
