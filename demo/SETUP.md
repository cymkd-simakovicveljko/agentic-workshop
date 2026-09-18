# Setup before the demonstration

Run all commands from `demo/` unless stated otherwise. Use a fresh extracted copy for each presenter or participant. Do not run the exercise in a production repository. No account is needed for the app, tests, OpenSpec CLI or provider-free fallback.

## Local application

Tested runtime: **Node 22.22.2** on macOS. The package declares Node >=22.12.0. The app itself has no dependencies; OpenSpec is a development dependency pinned at **1.13.0**. Install Node and Git through your organization's approved distribution. Windows users can run the Node scripts from PowerShell; the shell prompts below assume a POSIX shell unless noted. Windows/Linux have not been executed in this package validation.

```sh
node --version
git --version
npm ci --ignore-scripts
npm run preflight
npm run test:baseline
npx --no-install openspec --version
npx --no-install openspec validate filter-projects --strict
npm start
```

Open [the local application](http://127.0.0.1:4173). It initially shows four records. Filtering is intentionally unfinished. `npm test` is expected to fail on the starter. Stop the server with Ctrl+C. If port 4173 is occupied, stop the previous demo or choose a port: `PORT=4174 npm start` on POSIX; in PowerShell set `$env:PORT=4174` before `npm start`.

Set `OPENSPEC_TELEMETRY=0` in the process environment if your policy disables CLI telemetry. Do not use global OpenSpec installation during class; `npx --no-install` selects the prepared local dependency. The current public install guidance uses `npm install -g @fission-ai/openspec@latest`; this package intentionally pins a tested release. [Official CLI reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md).

Generated Claude and OMP OpenSpec integrations are included. To regenerate after an intentional upgrade:

```sh
npx --no-install openspec init --tools claude,oh-my-pi --no-animation
```

This was executed with 1.13.0 and generated six core workflows. `verify` is not in that set. Use `openspec config profile` and `openspec update` during preparation if you want expanded workflows. Do not change profiles during the timed demonstration.

## Claude Code presenter route

Install through your organization's approved mechanism. Current official guidance supports the native installer or package-manager routes. For example, on macOS with Homebrew:

```sh
brew install --cask claude-code
claude --version
claude
```

Complete sign-in before class. An eligible Claude account, organization seat or supported API/provider configuration is needed. Consumer chat access alone should not be assumed to grant every model, quota or enterprise permission. API charges and subscription allowances are different. Use the model your organization approves and record the exact host/model in the rehearsal record. [Claude quickstart](https://code.claude.com/docs/en/quickstart), [setup](https://code.claude.com/docs/en/setup).

Start the workshop session:

```sh
claude --plugin-dir ./plugins/spec-coach
```

Inspect loaded instructions with `/memory`, the plugin manager with `/plugin`, and invoke `/spec-coach:spec-review fixtures/flawed-spec.md`. Confirm the namespaced command resolves and reports the whitespace contradiction. This is a preparation gate, not something to troubleshoot on stage. Use normal approval prompts. Do not use bypass-permissions flags for this course.

## OMP alternative

The current official repository is [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi). It links to `omp.sh`. The documented Bun route requires **Bun >=1.3.14**:

```sh
bun install -g @oh-my-pi/pi-coding-agent
omp --version
```

For the locally checked executable version, pin `@oh-my-pi/pi-coding-agent@18.0.6` instead of installing a floating version. Native installers and Homebrew are alternatives in the official README; do not run every installation route. Avoid assuming npm and Bun are interchangeable for this runtime.

Launch `omp`, run `/login` for an approved provider, then select an available model using `/model`. Record the full provider/model identifier. Alternatively supply the provider's documented environment variable through your approved secret manager. A key is not committed, echoed or put on a command line. OMP's provider configuration is separate from its instruction-discovery providers. [Provider guide](https://github.com/can1357/oh-my-pi/blob/main/docs/providers.md).

The package contains `.omp/skills/spec-review/SKILL.md`. Use this limited interactive surface:

```sh
omp --tools read,grep,glob,edit,write,bash --no-lsp --no-extensions --no-rules --approval-mode always-ask --max-time 8m
```

After selecting the approved model during rehearsal, add `--model 'provider/exact-model-id'` using that recorded identifier. Do not paste the placeholder literally. The flags above were checked in the installed 18.0.6 CLI help. Tool limits reduce available entry points; `bash` still has the process's filesystem/network access.

Use `/skill:spec-review fixtures/flawed-spec.md` if skill commands are enabled in your settings. Otherwise ask “Use the spec-review skill to review fixtures/flawed-spec.md” and verify it reads the loaded skill. Generated OpenSpec commands use `/opsx-propose` and `/opsx-apply` on OMP, not Claude's colon form. Native `.omp` context and imported conventions can shadow each other: confirm the repository's `AGENTS.md` is loaded. [Skills](https://github.com/can1357/oh-my-pi/blob/main/docs/skills.md), [context files](https://github.com/can1357/oh-my-pi/blob/main/docs/context-files.md).

Escape normally aborts the active turn. If Vim input mode is enabled, Escape may first change editor mode; disable Vim mode for the presentation or verify the actual binding. Ctrl+C/Ctrl+D behavior also depends on editor state. Rehearse stopping a harmless run before class and verify subprocesses stopped. `--max-time 8m` bounds the OMP session, while the local wrapper separately bounds its checks. [Keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md).

The prepared distributable plugin targets Claude Code. OMP's support for importing foreign plugin conventions is an adapter capability, not universal compatibility. For an OMP-native distribution project, follow its current [marketplace guide](https://github.com/can1357/oh-my-pi/blob/main/docs/marketplace.md) and test every packaged capability separately.

## Presenter readiness gate

Before the event, complete `node scripts/validate-demo.mjs`, review `VALIDATION.md`, run one live specification review and one bounded implementation with the chosen host, verify stop controls, test the browser examples and walk through the script with a stopwatch. Keep the fallback open. If host authentication, plugin loading or model access fails, select the prepared walkthrough before the audience arrives.

Checkpoints modify only `public/filter.mjs` and save the previous contents under `.runs/backups/`. They do not reset specifications, generated instructions or the saved harness history. For a full clean start, extract the delivered archive into a new directory. Do not use a destructive Git reset in a participant's working repository.
