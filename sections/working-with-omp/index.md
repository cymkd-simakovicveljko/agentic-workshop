# 5. Key productivity tips

**Foundations explain the agent loop. This section makes the loop usable at a keyboard, from a phone, and across a small number of delegated workers.**

These examples match the current OMP 18.4.3 docs and source. Your build can remap keys or add extension bindings, so `/hotkeys` is the final word for the session you have open.

## The four practical moves

Read these in order. Each page has one small action to try; stop when the action is useful in your own work.

1. [Voice input](voice-input.md) — Enable local speech-to-text, inspect the transcript, and understand how live voice differs from dictation.
2. [Keyboard controls and steering](keyboard-and-steering.md) — Submit, queue, revise, and interrupt without memorizing the whole TUI.
3. [Working from your phone](phone-access.md) — Join a running session from a browser while the host computer does the work.
4. [Managing several agents](managing-agents.md) — Organize independent sessions and inspect bounded subagents.

## The operating rule

Give the agent one clear next decision, then watch what it actually does. Queue a correction when the current turn is still useful; interrupt when it is heading toward an unsafe or irrelevant action. Neither action replaces inspecting the files and evidence afterward.

Start with [Voice input](voice-input.md), then continue through the keyboard controls. The phone and Agent Hub pages are optional when you need remote access or delegated work.

## Sources

- [OMP 18.4.3 package metadata](https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/coding-agent/package.json)
- [OMP keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md)
- [OMP collaboration](https://github.com/can1357/oh-my-pi/blob/main/docs/collab.md)
- [OMP Agent Hub](https://github.com/can1357/oh-my-pi/blob/main/docs/agent-hub.md)

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>See how the tools around a model affect the work you can delegate.</span></summary>

- [We improved 15 LLMs at coding in one afternoon. Only the harness changed.](https://stencil.so/blog/the-harness-problem) — Can Bölük, Stencil Labs. Read the author's experiment changing the edit interface while keeping the models fixed, and consider what a better tool could change in your own workflow.
- [OMP (Oh My Pi): AI Coding Agent with LSP, DAP Debugger, and Hashline Edits](https://betterstack.com/community/guides/ai/oh-my-pi-ai-coding-agent/) — Better Stack. Get a readable overview of OMP's integrated tools and how they fit the plan–implement–verify loop before you use the narrower controls in this section.
</details>
</div>
