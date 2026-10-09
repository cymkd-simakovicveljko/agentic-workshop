# Four engineering skill packs: source notes

The [Skills lesson](../sections/foundations/skills.md) compares four packs as workflow choices, not a leaderboard. The starting point was the user-supplied transcript of Rob Shocks's “Pocock vs Pstack vs Osmani: Which Skill Pack Wins?” Superpowers was added to the comparison. Claims below come from primary sources, not the video's performance claims.

Research scope: repository documentation and representative skill bodies. No head-to-head benchmark or end-to-end OMP installation of these packs was performed. The lesson's recommendations are ours; prescribed behavior is not proof that an agent follows it.

## Matt Pocock

Inspected revision: [`b0618bc436ad893b3c5e84e55fba86586d34a404`](https://github.com/mattpocock/skills/tree/b0618bc436ad893b3c5e84e55fba86586d34a404).

- [Grilling](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/productivity/grilling/SKILL.md) asks about currently answerable design decisions, recommends answers, and waits for the user's choices. Facts available from the environment are for the agent to discover.
- [Grill with docs](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/grill-with-docs/SKILL.md) combines grilling with domain modeling. [Domain modeling](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/domain-modeling/SKILL.md) sharpens terminology and records consequential choices.
- [To spec](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/to-spec/SKILL.md) synthesizes an existing conversation rather than conducting another interview. It needs repository issue-tracker configuration.
- [Invocation conventions](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/.agents/invocation.md) use a named Skill tool for composition. Copying a wrapper without its dependencies is insufficient.

Interpretation: alignment and composable procedures are useful distinguishing features, not the entire scope of the collection.

## Addy Osmani

Inspected revision: [`1401c8b8030e023baeebb31781a6653fe8e93026`](https://github.com/addyosmani/agent-skills/tree/1401c8b8030e023baeebb31781a6653fe8e93026).

- [Using Agent Skills](https://github.com/addyosmani/agent-skills/blob/1401c8b8030e023baeebb31781a6653fe8e93026/skills/using-agent-skills/SKILL.md) routes work through Define, Plan, Build, Verify, Review, Ship. This is a pack's workflow, not a universal definition of SDLC.
- [Spec-driven development](https://github.com/addyosmani/agent-skills/blob/1401c8b8030e023baeebb31781a6653fe8e93026/skills/spec-driven-development/SKILL.md) asks for human approval before planning or coding. [Incremental implementation](https://github.com/addyosmani/agent-skills/blob/1401c8b8030e023baeebb31781a6653fe8e93026/skills/incremental-implementation/SKILL.md) prescribes implementation, tests, verification, and a commit per slice.
- [Doubt-driven development](https://github.com/addyosmani/agent-skills/blob/1401c8b8030e023baeebb31781a6653fe8e93026/skills/doubt-driven-development/SKILL.md) passes an artifact and contract to a fresh-context reviewer. It explicitly excludes the author's claim and reasoning. This is not inspection of private model reasoning.
- [Other hosts](https://github.com/addyosmani/agent-skills/blob/1401c8b8030e023baeebb31781a6653fe8e93026/docs/other-hosts.md) documents an OMP installation route. We did not run it. [Getting started](https://github.com/addyosmani/agent-skills/blob/1401c8b8030e023baeebb31781a6653fe8e93026/docs/getting-started.md) and [issue 361](https://github.com/addyosmani/agent-skills/issues/361) identify missing shared references in individual-skill installs. Preserve those dependencies when adapting procedures.

Interpretation: explicit lifecycle stages and checks are the distinguishing emphasis. Instructions to stop are not host-enforced gates.

## Lauren Tan / pstack

Inspected revision: [`df581122cde17e6e27686b5a448bde23e4ad4318`](https://github.com/cursor/plugins/tree/df581122cde17e6e27686b5a448bde23e4ad4318/pstack).

- [Manifest](https://github.com/cursor/plugins/blob/df581122cde17e6e27686b5a448bde23e4ad4318/pstack/.cursor-plugin/plugin.json) identifies Lauren Tan as author. [README](https://github.com/cursor/plugins/blob/df581122cde17e6e27686b5a448bde23e4ad4318/pstack/README.md) describes the poteto identity, playbooks, multi-model setup, and companion-plugin dependencies.
- [Poteto mode](https://github.com/cursor/plugins/blob/df581122cde17e6e27686b5a448bde23e4ad4318/pstack/skills/poteto-mode/SKILL.md) routes work from task start. [Investigation](https://github.com/cursor/plugins/blob/df581122cde17e6e27686b5a448bde23e4ad4318/pstack/skills/poteto-mode/playbooks/investigation.md) is read-only; [architect](https://github.com/cursor/plugins/blob/df581122cde17e6e27686b5a448bde23e4ad4318/pstack/skills/architect/SKILL.md) explores designs before implementation. The pack is not confined to post-build work.
- [Prove It Works](https://github.com/cursor/plugins/blob/df581122cde17e6e27686b5a448bde23e4ad4318/pstack/skills/principle-prove-it-works/SKILL.md) requires direct evidence from the real artifact, preferably rerunnable.
- [Setup](https://github.com/cursor/plugins/blob/df581122cde17e6e27686b5a448bde23e4ad4318/pstack/skills/setup-pstack/SKILL.md) configures Cursor-specific rules and model roles. Some workflows require the separate Cursor Team Kit. These are not automatically OMP capabilities.

Interpretation: broad engineering investigation and real-result verification, with parallel and model-diverse work. “Multi-model” means multiple models, not “multimodal.” Planning is available even though it is not the pack's default for every task.

## Jesse Vincent / Superpowers

Inspected revision: [`8ca22dba9a94f28898bbce59f2537ff4d87c747d`](https://github.com/obra/superpowers/tree/8ca22dba9a94f28898bbce59f2537ff4d87c747d).

- [Brainstorming](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/brainstorming/SKILL.md) distinguishes spike, bounded, and architectural work and asks for design approval before implementation.
- [Writing plans](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/writing-plans/SKILL.md) converts a design into concrete tasks. [TDD](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/test-driven-development/SKILL.md) requires a failing test before production code.
- [Requesting review](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/requesting-code-review/SKILL.md) calls for a fresh reviewer. [Receiving review](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/receiving-code-review/SKILL.md) requires checking feedback rather than accepting it automatically.
- [Verification before completion](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/skills/verification-before-completion/SKILL.md) requires fresh evidence for completion claims.
- [Porting guide](https://github.com/obra/superpowers/blob/8ca22dba9a94f28898bbce59f2537ff4d87c747d/docs/porting-to-a-new-harness.md) separates portable skill instructions from bootstrap, discovery, tools, and host integration. Copying Markdown alone is not equivalent to a complete port.

Interpretation: a connected, more prescribed development process. Like the other packs, it supports work inside the SDLC rather than replacing the lifecycle, ongoing operations, or human accountability.

## Creator and portrait credits

The lesson uses public GitHub profile images and Lauren Tan's React team photograph, following the reader's existing creator-card pattern. Images are remotely hosted, may change, and are not bundled in this repository. Source attribution does not establish a reuse license; repository code licenses are not assumed to cover profile photographs.

| Creator | Biography source | Portrait source |
| --- | --- | --- |
| Matt Pocock | [GitHub profile](https://github.com/mattpocock), identifying Total TypeScript | [GitHub avatar](https://avatars.githubusercontent.com/u/28293365?v=4) |
| Addy Osmani | [GitHub profile](https://github.com/addyosmani), identifying his former Google director role | [GitHub avatar](https://avatars.githubusercontent.com/u/110953?v=4) |
| Lauren Tan | [React team profile](https://react.dev/community/team#lauren-tan), identifying Cursor and Compiler work | [React team photograph](https://react.dev/images/team/lauren.jpg) |
| Jesse Vincent | [Official biography](https://blog.fsck.com/about/), identifying Superpowers and Keyboardio | [GitHub avatar](https://avatars.githubusercontent.com/u/45416?v=4) |

The lifecycle illustration in the SDLC lesson was supplied by the course author and included unchanged. It was not sourced from any of these packs.
