# OMP lab guide — Draft v0

> **Earlier full-draft reference.** Current development follows the [agreed eight-section outline](OUTLINE.md), one section at a time. This document’s detailed content and timing are not the agreed curriculum.

Use this adapter with [the course](COURSE.md). Commands are preparation details; learning outcomes live in the curriculum.

## What was checked

On 12 September 2026, the installed executable reported `omp/18.0.6`. Its help lists the tool, profile, skill, approval and time-limit flags used below. Official OMP installation, context, skills and marketplace documentation was inspected. No paid model call, provider login, live skill activation, cancellation rehearsal or full OMP classroom run was performed for this draft.

The local runtime used for the course's automated rehearsal is recorded in [the review](REVIEW.md). A successful CLI help check establishes syntax availability, not runtime enforcement or host/model quality.

## Prepare before class

1. Install Git, Python 3 and Node >=22.12 through your normal approved distribution. Python is needed only for the disposable-lab helper; the application and tests use Node built-ins.
2. Install one reviewed OMP release. The [official repository](https://github.com/can1357/oh-my-pi) documents installation options. Its Bun route requires Bun >=1.3.14; a release pin matching this inspection is `bun install -g @oh-my-pi/pi-coding-agent@18.0.6`. Installation was not repeated during this draft.
3. Record `omp --version`, `node --version` and the operating system. Check `omp --help` before copying flags into another version.
4. Set up an approved provider and select a model before class. OMP documents `/login` and `/model`; record the full provider/model identifier. Keep credentials in the approved credential mechanism. The course does not prescribe a provider, account entitlement or model spend.
5. Verify instruction discovery, exposed tools and stop behavior on the training machine. A named profile separates OMP state but does not by itself isolate files, network access or imported configuration from other hosts.

## Create the foundation lab

From the course project directory, run:

```sh
python3 _build/draft-v0/prepare_core_lab.py
```

It prints a new temporary directory. Open that directory in your editor and terminal. Each invocation creates a new location and leaves earlier work intact. The helper copies only the synthetic app, tests, checkpoints and checkpoint loader; it adds a plain contract, local instructions and dependency-free package scripts. It copies no framework commands, skills, plugins, credentials or installed dependencies.

Run these commands **inside the printed lab directory**:

```sh
node --version
npm run test:baseline
npm test
npm start
```

The baseline has two tests. The complete starter suite is intentionally red: 5 pass and 6 fail out of 11. The browser opens at [the local lab](http://127.0.0.1:4173). Stop the server with Ctrl+C. No `npm install` is needed for this foundation lab. If port 4173 is occupied, stop your earlier lab server or select another port with `PORT=4174 npm start` on a POSIX shell.

The standalone lab is disposable scratch work. Save submissions in a learner-selected persistent location before cleanup or restart. Facilitators should place useful cohort outputs under the project’s `_build/` or a dedicated cohort project rather than relying on a temporary directory.

### Track the diff

If Git identity is configured, initialize Git only in the new lab directory, review the staged synthetic files, and create a baseline commit before implementation:

```sh
git init
git add .
git commit -m "Training baseline"
```

Do not run these baseline commands in the original personal workspace. During review, use `git status --short` and `git diff`; inspect untracked files too. If Git setup is unavailable, compare the filter with its prepared starter and use `baseline-hashes.json` to identify changed original files:

```sh
git diff --no-index checkpoints/starter/filter.mjs public/filter.mjs
```

Exit 1 means differences were found for this file comparison. That result does not scan other files, so review the full file listing as well.

## Launch OMP for the foundation

Start from the printed lab directory. The following command exposes read/search tools for exploration:

```sh
omp --profile course-v0 --tools read,grep,glob --no-lsp --no-extensions --no-rules --no-skills --approval-mode always-ask --max-time 8m
```

This is a limited built-in tool surface. It is not a complete sandbox configuration or a claim that imported external tools are disabled. Check actual loaded integrations, instructions and tools; use a clean training account/environment when isolation is required. Do not infer isolation from the profile name.

For the authorized implementation phase, start a session with:

```sh
omp --profile course-v0 --tools read,grep,glob,edit,write,bash --no-lsp --no-extensions --no-rules --no-skills --approval-mode always-ask --max-time 8m
```

Select the approved model interactively, or add `--model 'provider/exact-model-id'` after replacing that example with the recorded identifier. Run the prompts in Session 1. A permitted shell can reach whatever the process is allowed to reach; use external boundaries for stronger restrictions.

The `--max-time` option advertises a session duration limit. Rehearse the actual stop and any child-process behavior before relying on it. The eight-minute setting is for individual attempts, not the full lesson. A facilitator supervises the teaching budget and preserves evidence before a retry.

### Planning and stopping

Do not mistake `--plan` for a read-only toggle: the installed help describes it as a planning-model selection. The foundation uses explicit exploration and implementation phases. If teaching OMP's native plan mode, verify entry, permitted writes, approval and exit behavior against the pinned release first. Do not invent a `/perform` command; “perform” is an ordinary name for execution.

The retained setup documentation describes Escape as turn cancellation, with input-mode caveats. Confirm the actual keybindings on the training machine and whether subprocesses stop. If a model stalls, cancel and switch to the labelled prepared walkthrough in [the facilitator guide](FACILITATOR.md).

## Checkpoints

From a disposable lab only:

```sh
node scripts/checkpoint.mjs starter
node scripts/checkpoint.mjs broken
node scripts/checkpoint.mjs solution
```

Choose the checkpoint called for by the exercise; do not run all three before attempting the task. The loader saves the previous filter under `.runs/backups/`. It changes only `public/filter.mjs`, leaving other edits and evidence in place. Create a fresh lab for a genuinely clean start.

| Checkpoint | Full suite expected result |
| --- | --- |
| starter | 5 pass, 6 fail |
| broken | 9 pass, 2 fail; whitespace cases |
| solution | 11 pass, 0 fail |

The reference result is not evidence for a participant's edited version. Run the participant's actual code and browser checks.

## Skills and later flavors

In Session 6, add the reviewed skill in `.omp/skills/verify-change/SKILL.md` and remove `--no-skills` from the launch command. Verify discovery from that directory. OMP documents `/skill:verify-change` when skill commands are enabled; otherwise explicitly request the named skill and verify which file was read. Use the no-skills launch as the baseline. [OMP skills](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md).

Current [context discovery](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md) can select the nearest non-empty native `.omp` directory and shadow other conventions at the same scope. Verify applicable instructions after adding configuration directories.

The retained `demo/` is the optional OpenSpec/plugin reference, with historical setup instructions and known missing presenter files. Do not use that setup as the default foundation. Its host/plugin behavior requires a separate rehearsal before the corresponding workshop. [Current review](REVIEW.md).
