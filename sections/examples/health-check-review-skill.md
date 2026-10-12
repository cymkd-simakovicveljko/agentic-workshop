# Skill workshop: build and evaluate a review skill

**Outcome:** create a focused health-check review package, compare an ordinary request with a procedure-guided request, and verify what OMP actually discovered or loaded. You will not pretend that a file was discovered or invoked when you did not observe that.

This is a companion workshop, not a numbered main-route section. Read [Skills](../foundations/skills.md) first for what skills are, when to use them, current OMP loading behavior, and recommendations. This page keeps the bounded create-and-evaluate exercise, including its loader warnings and source evidence.

**For this example:** use a health-checker program implementing the [fixture guide's single-URL and multi-target contracts](../../demo/health-checker/README.md). The [guided checker example](build-health-checker.md) covers the single-URL starting point. Read [Skills](../foundations/skills.md) before creating the review procedure. Start the local fixture from the **course root**, in a separate terminal:

```sh
bun demo/health-checker/server.mjs
```

The fixture listens on `127.0.0.1:4175`. It is not part of your learner repository and is not changed by this exercise. Use only this loopback fixture or an endpoint you own and have permission to test.

The candidate below is intentionally review-only. Its inputs stay in the task packet: the accepted contract, current checker, changed files, and actual run records. It must not edit the checker, call endpoints, or claim that a command ran without evidence.

## Choose how the skill loads

**Discovery, loading the body, and following the procedure are separate events.** OMP first discovers a file. For model-selectable skills, it advertises the name and description in the model's skill catalog when the `read` tool is available. The full instructions are read when selected; the catalog is not the complete skill body.

The frontmatter choice is **`disable-model-invocation`**:

| Intended use | Frontmatter | OMP 18.2.9 behavior |
| --- | --- | --- |
| Let the model select the skill when relevant | `disable-model-invocation: false`, or omit the key | The skill can appear in the model-facing catalog. Its description helps the model decide when to read it. You can still invoke it explicitly. |
| Opt in yourself; keep it out of that catalog | `disable-model-invocation: true` | The discovered skill is hidden from the catalog. You can load it with `/skill:<name>` when skill commands are enabled. |

Use YAML booleans `true` and `false`, not a prose instruction such as “manual only.” Omitting the key is valid: it keeps the model-discoverable default.

**For this exercise, choose manual-first.** You should decide when the review starts and supply its evidence packet. For an automatic candidate, write a description with a clear trigger and scope:

```yaml
---
name: health-check-review
description: >-
  Review health-checker changes against their accepted HTTP behavior and run evidence.
  Use when reviewing readiness or investigating a reported check failure.
disable-model-invocation: false
---
```

This header is an **alternative**, not a second skill to install beside the manual version below. A discoverable description is a routing hint, not a guarantee that the model loads or follows the body. Test a relevant request and an unrelated request instead of assuming the trigger works.

### What the flag does not enforce

In this pinned OMP implementation, `disable-model-invocation: true` is normalized to the hidden-skill behavior. It **does not disable access**: a discovered hidden skill remains reachable through `skill://health-check-review`, including when its name is explicitly supplied elsewhere. “Manual-first” describes the intended use and catalog visibility, not an access-control boundary.

Keep `description` even for the manual version. The native `.omp` skill scanner requires it; use a short human-facing summary instead of an automatic trigger list. OMP also supports `hide: true` for catalog hiding. Use one convention here—`disable-model-invocation`—rather than combining switches.

OMP's `skills.enableSkillCommands` setting controls slash-command availability. It is a host setting, not a `SKILL.md` frontmatter field. Hiding a skill from the model catalog does not remove its manual command.

The reviewed loader does not turn a skill's `alwaysApply` or `globs` metadata into automatic full-body injection. Do not borrow `user-invocable` or `allowed-tools` from another host and assume OMP enforces it: accepting metadata is not the same as implementing a control. Always-present project guidance belongs in the context/rule mechanisms appropriate to the host, not in an invented skill-loading flag.

### Package and load are different operations

Use this project-local layout:

```text
.omp/
  skills/
    health-check-review/
      SKILL.md
```

If needed later, put `references/` or `scripts/` inside that skill's directory. Keep the skill itself one level below `skills/`; `.omp/skills/reviews/health-check-review/SKILL.md` is not found by the normal non-recursive scan. Keep `name` aligned with the directory name.

Reference supporting files relative to the skill directory, or through `skill://health-check-review/references/<file>`, not relative to the learner project's working directory. Loading a skill does not automatically run its scripts or load every reference. State when a reference or script is needed and what it may do.

After adding or changing a skill's name, description, or invocation mode, **exit and relaunch OMP from the learner repository** for this exercise, then check the resolved source. Do not assume `/new` refreshes the discovery catalog. A slash invocation reads the current file body, but that does not prove cached discovery metadata has been refreshed. Updating a file also does not retract text already loaded into a conversation.

For a persistent communication skill such as `i-have-adhd`, its documented stop phrase changes the requested behavior; it does not erase earlier context or undo tool effects. A fresh session avoids carrying that prior conversation into a comparison.

## Build a focused review skill

### The small procedure to package

Start with the body, not the filename. Use this procedure as a candidate. It is intentionally review-only:

```markdown
---
name: health-check-review
description: Review a health-checker change against its accepted behavior and supplied evidence.
disable-model-invocation: true
---

# Review health-check evidence

Review the supplied checker, accepted contract and run records. The engineer owns
acceptance; this procedure does not edit or repair the program.

1. Locate the contract, checker code, changed files and run records. If an
   essential input is missing, name it and bound the review instead of guessing.
2. Trace one request from URL validation through request, redirect handling,
   status/body checks, timeout, elapsed-time measurement and result/exit code.
   Check the array path separately when it is in scope.
3. For each material claim, connect the requirement to a source location and to
   evidence for the current code state. A claimed pass is not a run record.
4. Separate source inference, observed fixture output, and unverified behavior.
   Do not turn a missing check into a defect without a concrete consequence.
5. Report only consequential findings. For each, give requirement, location,
   consequence or counterexample, and the next check that would resolve it.

Review only. Do not edit, commit, publish, call an external endpoint, or claim
that a command ran when the supplied material does not show it.
```

This is a prepared example, not a course-installed skill and not a provider-backed result. Its wording is deliberately general: the contract belongs in the task packet, not permanently in the skill. If you add “`/wrong-body` must fail” to the package, it may memorize this lesson while missing the same status/body mistake in another service.

### What OMP can and cannot prove

The pinned OMP 18.2.9 skills guide describes file-backed skills discovered at startup, lightweight name/description metadata, on-demand `skill://` reads, and optional `/skill:<name>` commands. It also documents the native project shape `.omp/skills/<name>/SKILL.md`, explicit `name` and `description`, and one-level discovery under a skills root:

[OMP 18.2.9 skills guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/skills.md)

Keep four observations distinct:

| Observation | What it proves |
| --- | --- |
| The file exists at the documented project path | You saved a candidate package |
| OMP lists its name/source at startup | The host discovered that package |
| A successful `skill://health-check-review` read or slash invocation injects the expected body | The body was loaded; command visibility or acceptance alone is not proof |
| The review cites the right source and evidence | The procedure was useful on this case |

One row never proves the next. A good review produced by a pasted paragraph does not prove discovery. Discovery does not prove the procedure improved the judgment. If you cannot observe the source or invocation, label it **unknown** or **manual reading**.

## Watch or try

### 1. Write the candidate without installing it yet

Save the manual-first example above as `health-check-review-candidate.md` in your learner repository, **outside every skill-discovery directory**. Keep it out of the ordinary review packet and do not ask the ordinary reviewer to read it. Leave installation until after the comparison so both conditions share the same discovery state.

The checker already performs the deterministic HTTP operation, so the candidate needs no script. Its job is review procedure.

If the earlier program is missing, stop this exercise and complete the earlier core lesson. Do not invent a prepared branch or claim that the package reviewed a program you do not have.

### 2. Prepare one identical review packet

Use the checker source, its stated contract, and recorded outputs from your own runs. Include enough to identify the current code state, but do not paste a provider transcript or secrets. A compact packet can contain:

```text
Contract: GET one HTTP(S) URL; expected status 200; expected text is the
case-sensitive substring "Workshop service ready"; timeout is 1000 ms for the
request and body; redirects are not followed; report observed status when there
is a response; exit 0 pass, 1 completed failed check, 2 invalid input/config.

Code state: <branch/revision or explicit uncommitted state>
Checker source: <paths and relevant excerpts>
Observed records: <commands, endpoint, exit code, status/body/result and timing>
Question: Can this change be accepted for the supplied contract?
```

Use the same packet and request in both conditions. A review without actual run records can still identify a source-level problem, but it must call the runtime behavior unverified.

### 3. Compare ordinary request and procedure

Run two fresh OMP sessions only if you have approved model access. Keep model, settings, packet and request identical, and do not show one answer to the other. Condition A is the ordinary request:

```text
Review this health-checker change against the supplied contract and evidence.
Report consequential findings with locations, distinguish source conclusions from
observed runs and missing evidence, and do not edit files or run commands.
```

Condition B uses the same request and packet, with the candidate's procedure body pasted inline. Both conditions remain uninstalled at this point. This is a **manual procedure comparison**, not proof of native skill discovery or invocation:

```text
Apply this review procedure to the identical packet. [paste the candidate body]
```

Compare findings, not text length, headings, or matching phrases. Use this table:

| Question | Ordinary | Procedure-guided |
| --- | --- | --- |
| Does it trace status, body, timeout and redirect behavior to source? |  |  |
| Does it cite the exact requirement and location for each material finding? |  |  |
| Does it distinguish observed output from source inference and missing evidence? |  |  |
| Does it propose a check that would discriminate an uncertain cause? |  |  |
| Does it stay review-only and avoid invented runs or unrelated defects? |  |  |

A longer answer is not automatically better. If both reviews are accurate and equally useful, record **no observed improvement on this case**. If the guided review asks for a missing input that the packet already supplied, that is a regression. If a model is unavailable, do both readings yourself and label the result **human practice; model comparison not tested**.

### 4. Verify OMP invocation or use the fallback honestly

After the comparison, move the candidate into `.omp/skills/health-check-review/SKILL.md` in the learner repository. Keep `disable-model-invocation: true`. Exit and relaunch OMP there, then check the discovered name and source. If `skills.enableSkillCommands` is enabled in OMP's settings, invoke the following **inside OMP**, not in the shell:

```text
/skill:health-check-review Review the supplied health-checker packet; review only.
```

Confirm that the expected body was actually injected and applied to the supplied packet. A slash invocation reads the file, strips the frontmatter, and supplies the body with its skill-directory context; it does not execute the body as a script or grant tool permissions. A `read` of `skill://health-check-review` is a separate explicit loading route, not a shell command.

If the command is unavailable, the package is not listed, or your host uses a different supported setup, do not say “the skill ran.” Read the saved `SKILL.md` yourself and paste the procedure into the ordinary request. Record **manual reading fallback** and the reason. Check the pinned guide before changing layout or configuration; do not copy controls from Codex, Claude, or another host.

### 5. Check the loading choice

| Check | What to observe |
| --- | --- |
| Manual-first header | It is hidden from the model-facing catalog, but an explicit invocation can load it. Absence from the catalog alone does not prove discovery. |
| Automatic header, if you choose to try it | Change to `false`, give the description useful triggers, relaunch OMP, and verify catalog visibility. Test relevant and unrelated requests; record whether the body was actually read. |
| Missing input | Ask for a review without run records. It should distinguish source findings from unverified runtime claims, not invent results. |
| Duplicate name or unavailable command | Inspect the winning source, skill filters, and `skills.enableSkillCommands`; do not conclude that a familiar name means your file loaded. |
| Stop or remove the trial | Remove or disable only your trial copy and relaunch. Keep the source record so another engineer knows which version was evaluated. |

Keep mode changes separate from the ordinary-versus-procedure comparison. Otherwise you cannot tell whether different results came from the procedure, discovery state, or another setting.

## Apply the result

Use [Skills](../foundations/skills.md) for the one-off prompt versus procedure versus skill decision and the maintenance rules. This workshop's decision is local: keep, revise, try another case, or remove the candidate based on the evidence you recorded.

## Go deeper

Read the pinned guide when you need to reason about collisions, source precedence, custom directories, hidden skills, or the difference between a skill and a tool or hook. The guide says discovery happens at startup and that duplicate names can come from several providers; therefore inspect the resolved source instead of trusting a familiar name.

**Explicit autoload is another mechanism.** Custom subagent definitions can use `autoloadSkills` to inject named skill bodies when the child starts. That field belongs in **agent frontmatter**, not this `SKILL.md`; it is different from advertising a skill for the model to select. The [pinned skills guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/docs/skills.md#interactive-skillname-commands) describes this distinction. We do not configure a subagent to complete this lesson.

A useful completion record is:

```text
Case and exact packet:
Procedure revision and saved path:
OMP version/provider/model/settings, if used:
Mode: ordinary / pasted procedure / native discovery / explicit invocation / manual
Body loading: observed / absent / unknown / not tested
Correct findings and supporting locations:
Missed or invented findings:
Checks actually run; checks not run:
Decision: keep / revise / try another case / remove
```

The record should let another engineer reproduce the comparison without unsafe targets or a transcript dump. A package existing is not completion evidence; a bounded, evidence-backed judgment is.

### Sources and adaptation

- [OMP 18.2.9 skills guide](https://github.com/can1357/oh-my-pi/blob/8cd6f8c/docs/skills.md) — discovery layout, frontmatter, `skill://`, `/skill:<name>`, source collisions, and skill/tool boundaries.
- [Pinned skill loader](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/packages/coding-agent/src/extensibility/skills.ts) — catalog hiding, retained direct access, and which fields reach the runtime skill object.
- [Pinned skill frontmatter type](https://github.com/can1357/oh-my-pi/blob/8cd6f8c619e89e935b6c6c5c91f6a4d20f6d7a75/packages/coding-agent/src/capability/skill.ts) — `hide` and normalized `disableModelInvocation`; additional metadata is not necessarily an enforced control.
- The health-check contract and loopback fixture are course-owned. `demo/health-checker/README.md` is the source of route behavior; expected observations in this lesson are instructions to check, not claims that a run occurred.

[Back to Skills foundation](../foundations/skills.md)

