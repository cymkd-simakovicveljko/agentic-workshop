# 2.7 Skills

**Point:** a skill is a named, reusable set of guidance that OMP can discover and load when a task needs it. Use one to make a recurring judgment more consistent—not to hide a test, permission boundary, hook, or autonomous program behind a markdown file.

## When a skill earns a home

Start with a one-off prompt when the task is new or the inputs are still being discovered. Keep a short procedure in the task when the judgment is useful but not stable enough to route automatically. Package a skill after a repeated omission survives a normal request and the procedure has a clear counterexample.

For a health-check review, the recurring judgment is:

> Does the checker's source and recorded evidence support its claimed behavior?

That has recognizable inputs and an inspectable result: the accepted contract, current checker, and actual run records. The procedure should not repair the program, bake in one prepared defect, or pretend that an unobserved command ran.

A skill is passive guidance. A test can show what an assertion did; a skill can ask whether that assertion exercised the accepted behavior. A tool executes an operation, and a hook intercepts an event. Keep those roles separate.

Use the right mechanism for the need:

| Need | Start here | Health-checker example |
| --- | --- | --- |
| State what must be built | Task brief and acceptance criteria | One URL, status `200`, literal body substring, timeout, and exit-code rules |
| Preserve repository-wide conventions | `AGENTS.md` and linked project docs | Learner's language, run command, and output format |
| Perform a deterministic operation | Program, test, or script | Run the checker against `/healthy`, `/wrong-body`, and `/slow` |
| Repeat a judgment | Skill or short procedure | Compare implementation and evidence with the contract |
| Enforce a boundary | Host policy, tool policy, or OS permissions | Approval rules, filesystem permissions, and network policy |

## What to load, and when

Choose one recurring difficulty, then choose one skill. These are source-reviewed recommendations, not claims that an upstream package always produces better work:

| Skill and source | When it helps | Try it on the health checker |
| --- | --- | --- |
| [`i-have-adhd`](https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md), from `ayghri/i-have-adhd` | The answer is hard to act on: long preambles, mixed-up steps, or too many tangents. It changes communication, not correctness or permissions. | Ask for the next action after a failed check. Can you find the action, reason, and remaining uncertainty without hunting through an essay? |
| [`grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) with [`grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md), from Matt Pocock | The request contains unresolved decisions. The interview explores those decisions before implementation. | “Check several sites” leaves questions about expected content, timeouts, and whether one failure stops the batch. Use the interview to settle those—not to ask facts the repository can answer. |
| [`tdd`](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md), from Matt Pocock | You need a behavior check that can fail before implementing the fix. | Write a check that catches accepting `/wrong-body` solely because it returned 200. If the checker is already correct, use a genuinely new behavior rather than breaking it to stage a demonstration. |
| [`diagnosing-bugs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md), from Matt Pocock | Repeated edits are not explaining a failure. The procedure establishes a reproducible signal, tests hypotheses, and verifies the repair. | Investigate a checker that accepts `/slow` despite the agreed deadline. Distinguish a missing deadline from a wrong URL or a fixture that was never started. |
| [`code-review`](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md), from Matt Pocock | You have a committed change and want separate checks against repository standards and requested behavior. | Review the multi-target change against its specification. Supply a real Git baseline and the spec; inspect whether invalid later entries can trigger earlier requests. |

A useful starting choice is `i-have-adhd` for action-first communication, `grill-me` for unclear requirements, or `diagnosing-bugs` for a real failure. Add `tdd` for a test-first loop. Save the upstream `code-review` workflow for a repository with a usable committed baseline: its documented comparison is against `HEAD`, not a complete review of untracked first-exercise files.

These skills are opinionated. `grilling` can conduct an extensive interview, while `tdd` asks you to agree the testing boundaries. That structure can help uncertain work and be unnecessary for a small, settled change. Read the instructions and adapt them deliberately; do not treat a popular author's preferences as universal rules.

You can try an action-first communication preference without installing a skill:

```text
Lead with the next action. Use numbered steps when order matters.
Keep the main answer focused, but retain the reason, risks, and what is unverified.
Do not add unrelated suggestions.
```

Compare the result by whether the action, reason, evidence, and uncertainty are visible—not by whether the answer is shorter. Keep warnings that change the decision, and try one communication style at a time; stacking contradictory style skills makes the result harder to judge.

Compare these prepared rewrites, not recorded model output:

> **Hard to act on:** “There are several possible causes, including networking configuration and timeout handling. It might be worth investigating how the request is made and perhaps reviewing the code before trying again.”

> **Action-first:** “Inspect where the 1000 ms deadline is applied. `/slow` passed after two seconds; we do not yet know why. Check the timer units and whether the deadline remains active until the response finishes. Rerun that case after a supported fix.”

## How OMP discovers and loads skills

The current OMP skills guide describes file-backed skills discovered at startup. Discovery, loading the body, and following the procedure are separate events:

1. OMP discovers a `SKILL.md` and exposes lightweight name/description metadata to the model when the `read` tool is available.
2. The full body is read on demand through `skill://<name>` or through an enabled `/skill:<name>` command.
3. The model follows the loaded guidance in the current task. Loading a skill does not execute its scripts, grant tool permissions, or prove that its procedure improved a result.

For the project-local layout, keep each skill one level below `.omp/skills/`:

```text
.omp/
  skills/
    health-check-review/
      SKILL.md
```

Use explicit `name` and `description` frontmatter. The native `.omp` provider and custom-directory scanning require a description; the directory name is the fallback for `name`. A useful description helps a model choose a skill, but it is a routing hint, not a guarantee that the body will be loaded or followed.

The current guide supports `hide: true` and the Agent Skills spelling `disable-model-invocation: true` (normalized internally). Both hide a discovered skill from the model-facing catalog; neither is an access-control boundary. A hidden skill remains reachable through `skill://<name>` and `/skill:<name>` when skill commands are enabled. `skills.enableSkillCommands` is a host setting, not a `SKILL.md` field.

Discovery is non-recursive under a skills root. `.omp/skills/reviews/health-check-review/SKILL.md` is not found by the normal scan; use `.omp/skills/health-check-review/SKILL.md` or configure a custom directory that points at the nested parent. Duplicate names are resolved by provider precedence, so inspect the winning source instead of trusting a familiar name.

Discovery happens at startup. After changing a skill's name, description, or invocation mode, exit and relaunch OMP from the learner repository before checking the catalog. A slash invocation reads the current file body and strips frontmatter, but it does not prove that cached discovery metadata was refreshed.

## One explicit invocation

The [companion Skill workshop](../health-checker/05-skills.md) creates a review-only `health-check-review` package and supplies the contract and run records it needs. After moving that candidate to `.omp/skills/health-check-review/SKILL.md`, relaunch OMP with `skills.enableSkillCommands` enabled and enter this inside OMP:

```text
/skill:health-check-review Review the supplied health-checker packet; review only.
```

The current guide also documents `skill://health-check-review/references/<file>` for files kept inside the skill directory. Resolve references from that directory, and say when a script or reference needs to be loaded; a skill does not load every neighboring file automatically.

## Inspect before installing

1. **Read the source and dependencies.** A skill may refer to supporting skills, references, or scripts. In the source versions reviewed for this course, `grill-me` delegates to `grilling`, `tdd` includes supporting references, and `diagnosing-bugs` has a helper for its human-assisted branch. Keep required files and referenced skills, not just a copied name.
2. **Check what it may do.** Inspect scripts, hooks, network operations, repository writes, and assumed tools. A skill file is guidance; a plugin may also install executable behavior.
3. **Check host compatibility.** Claude plugin commands are not OMP commands. Use OMP's documented layout and verify the resolved source and invocation.
4. **Try it on disposable work.** Use the same task and evidence with and without the procedure. Keep it only if it improves the outcome you care about; one useful response is not a benchmark.
5. **Record the source and revision.** Reinspect updates, avoid loading two copies with the same name, and keep a way to remove the trial.

Matt Pocock's [current installation guide](https://github.com/mattpocock/skills#installation-30-second-setup) offers this optional upstream command:

```sh
npx skills@latest add mattpocock/skills
```

It requires Node/npm and downloads code. Review it first, select only what you need, and verify support for OMP. Learners can instead place reviewed skill folders and their dependencies under the native `.omp/skills/` layout; no Node requirement is added to the checker implementation language. For `i-have-adhd`, use its own [installation guide](https://github.com/ayghri/i-have-adhd/blob/main/INSTALL.md), not Matt's installer.

The collection's [`setup-matt-pocock-skills`](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md) writes repository guidance for issue tracking and domain documents. Follow that setup only when adopting workflows that require it, after reviewing the proposed changes; do not silently add those files for a one-off skill demonstration. The linked upstream files can change, so keep the source and revision you evaluated.

## Keep the package useful

Keep the accepted contract, changed files, current run records, source links, and the decision the engineer still owns outside the skill. The package should describe how to review, not become a generic autonomous-agent charter. If it starts implementing checks, editing files, or calling endpoints, move that work back to the program or an explicitly authorized task.

Maintain it from concrete failures:

| Observed problem | Smallest response |
| --- | --- |
| Relevant requests never load the body | Check the invocation flag and winning source first; improve description triggers only for a model-selectable skill. |
| The review trusts a green summary | Require inspection of assertions and current code state. |
| It invents a timeout or status | Require separation of observed status, transport failure, and missing evidence. |
| It audits unrelated code | Add a near-miss example and narrow the description. |
| It finds only `/wrong-body` | Remove fixture-specific hints and retry with another contract. |
| It adds no useful signal | Keep the ordinary request or delete the skill. |

Change one thing, repeat the case that exposed it, then try a different case. Keep a small record of package revision, OMP version, mode, source, findings, and checks actually run. Do not treat one model comparison as a broad effectiveness claim.

## Continue with the workshop

The [Skill workshop](../health-checker/05-skills.md) turns this map into a bounded exercise: create a review candidate, compare an ordinary request with a procedure-guided one, verify discovery or use a manual fallback, and record what the evidence supports. It retains the loader warnings and source evidence needed to reason about OMP 18.2.9, while this page follows the current OMP skills guide rather than silently treating that pinned snapshot as today's runtime.

## Sources

- [Current OMP skills guide](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md) — discovery layout, frontmatter, catalog exposure, `skill://`, `/skill:<name>`, precedence, and skill/tool boundaries.
- [Health-checker fixture contract](../../demo/health-checker/README.md)
- [OMP 18.2.9 sources retained in the companion workshop](../health-checker/05-skills.md#sources-and-adaptation)

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Artifacts](artifacts.md) · [Next: MCP and plugins](mcp-and-plugins.md)
