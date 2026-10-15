# 5.1 Voice input

**Say the rough thought. Check it before sending.** Dictation is useful when explaining a problem is easier than typing it. The transcript does not have to sound polished; it has to preserve what you meant.

## Use native dictation when it is worth the setup

OMP's speech-to-text is disabled by default. In a session, open `/settings` → **Interaction** → **Speech**, or enable it from a shell:

```sh
omp config set stt.enabled true
```

The current OMP default is a local Parakeet speech model (about 680 MB) downloaded on first use. Allow the download, local disk space, microphone permission, and a working microphone. If you do not want that setup, use your operating system's dictation and paste the result into OMP.

With speech-to-text enabled, **hold Space to record and release it to transcribe**. The default `stt.submitTrigger` is `never`, so the transcript stays in the editor for inspection instead of being sent immediately. Press `Enter` only after checking it.

`Ctrl+L` is different: it starts or stops `/live`, a continuous voice conversation. Current OMP live transport uses the `openai-codex` OAuth connection, microphone and speaker access, and a network connection. Do not treat live voice as a cheaper spelling shortcut; use push-to-talk when you need a reviewable draft.

## Dictate, inspect, structure, submit

1. **Dictate the raw request.** Say the goal and important boundaries without trying to sound like a prompt engineer.
2. **Inspect the transcription.** Check paths, filenames, numbers and units, URLs, punctuation, and especially negation. “Do not install packages” becoming “install packages” changes what you authorized.
3. **Tidy only what needs it.** Remove transcription mistakes and resolve ambiguous words. For a longer request, separate the goal, useful context, and boundaries; a short clear sentence can stay a sentence.
4. **Submit only the corrected request.** Read the response and inspect the resulting files and evidence as usual.

## One safe example

Use the course checkout for this read-only example. A useful dictated draft might be:

```text
Read README.md and package.json. Do not edit files or install packages.
Find the command that starts the HTML reader and tell me whether the docs
and package scripts agree. Quote the source paths.
```

Before submitting, verify the filenames `README.md` and `package.json`, and **do not** before “edit files or install packages.” Then structure it:

```text
Goal: identify the HTML reader's start command.
Context: README.md and package.json in the course checkout.
Constraints: read only; no edits, package installation, or server startup.
Done when: report the documented command, the script it invokes, and any disagreement.
```

If the transcript changed a path or dropped “not,” stop and correct it before OMP sees it. The harness can execute an incorrectly transcribed instruction just as readily as a correctly typed one.

## Sources

- [OMP keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md) — Space push-to-talk and `Ctrl+L` live voice.
- [OMP speech settings](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/stt/settings.ts) — `stt.enabled` and submit behavior.
- [OMP speech model registry](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/stt/models.ts) — local model choices and sizes.
- [OMP live transport](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/live/transport.ts) — `openai-codex` authentication and realtime connection.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Keep dictation reviewable, configurable, and separate from live voice.</span></summary>

- [Keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md) — OMP project documentation. Check the current push-to-talk, live-voice, and remapping actions instead of relying on a shortcut copied from another terminal.
- [Settings](https://github.com/can1357/oh-my-pi/blob/main/docs/settings.md) — OMP project documentation. Learn how `omp config set` writes settings and how profile and project precedence affect a speech configuration.
</details>
</div>

[Back to Key productivity tips](index.md) · [Previous: Productivity tips overview](index.md) · [Next: Keyboard controls and steering](keyboard-and-steering.md)
