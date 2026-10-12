# From autocomplete to agentic engineering

A practical workshop for engineers learning to direct coding agents, inspect their work, and decide whether a change is ready. We use [Oh My Pi (OMP)](https://github.com/can1357/oh-my-pi) in the terminal alongside your usual editor.

You do not need prior AI experience. Bring your knowledge of code, Git, and tests. Each lesson uses a focused example rather than one project you must carry through the course.

**Start with the [Introduction](sections/introduction.md), then [Getting started with OMP](sections/01-getting-started-with-omp.md).** Read the Markdown here on GitHub, or run the browser reader below for lesson navigation, search, and an on-page contents list.

## Run the reader

Use Node.js **22.12 or newer**. From the repository root:

```sh
npm ci
npm start
```

Open **http://127.0.0.1:4173**. Stop the reader with **Ctrl+C**. If the port is occupied, use `PORT=4174 npm start`.

The reader serves the Markdown in this checkout on loopback; there is no build step, account, or database. You do not need OMP or model access just to read the lessons. For the live exercises, [section 1](sections/01-getting-started-with-omp.md) walks through installing OMP and connecting a provider and model. Install other tools only when a lesson needs them.

## Workshop route

The [full outline](OUTLINE.md) includes the individual lessons and their sequence.

| Section | What you will work on |
| --- | --- |
| [1. Getting started with OMP](sections/01-getting-started-with-omp.md) | Choose a terminal, install OMP, connect a model, and learn how to interrupt it. |
| [2. Agentic engineering foundations](sections/foundations/index.md) | Models and roles, context, prompting, tools and permissions, sessions and memory, artifacts, skills, and MCP/extensions. |
| [3. Key productivity tips](sections/working-with-omp/index.md) | Voice input, keyboard controls, remote access from your phone, and managing several agents. |
| [4. Engineering workflows](sections/engineering-workflows/index.md) | Apply Full Stack Agentic Development (FSAD) across the delivery lifecycle, with dependencies, bounded loops, and enforced gates. |
| [5. Spec-driven development](sections/spec-driven-development/index.md) | Keep specifications, plans, and tasks useful as work changes; compare the tools that support them. |
| [6. Advanced engineering](sections/advanced-engineering/index.md) | Reason about harness boundaries, cancellation, stale work, compatibility, and changes to existing systems. |

## How we work

Give the agent a bounded task, observe what it actually does, and check the result yourself. A small change may need only a clear request; a larger or ambiguous change needs decisions before code.

**An agent's summary is not proof.** Inspect the files, run the relevant checks, and distinguish what was observed from what was merely claimed. The lessons teach working habits alongside the mechanics: useful follow-up prompts, context handoffs, interruption, and recovery when a run goes off track.

Keep credentials out of prompts and repository files. The setup lesson starts in a scratch folder with supervised tool approvals; it explains what those approvals do and do not protect.

## Working on the material

- `OUTLINE.md` defines the route and drives the reader's sidebar.
- `sections/` contains the published lessons and their source links.
- `research/` contains supporting notes linked from the lessons.
- `reader/` contains the local server, browser reader, styles, and diagrams.

Edit the Markdown directly, refresh the reader, and check the changed lesson—including links and expandable sections. Read the neighboring lessons so prerequisites and next steps still line up.

Run the reader's file-serving and security checks with:

```sh
node --test reader/server.test.mjs
```

These checks cover the local reader, not provider access, fresh-machine installation, or the results of a learner's agent session. Prepared traces in the lessons are labelled examples, not recordings of live runs.

<details>
<summary>Maintaining diagrams and video embeds</summary>

The reader serves explicitly allowlisted images; it does not load a diagram JavaScript library. Regenerate the agent-loop diagram with:

```sh
node reader/diagrams/derive-course-svg.mjs reader/diagrams/agent-loop.svg
```

Check the rendered image after changing its layout.

Selected lessons embed YouTube talks and retain a direct link as a fallback. Add `data-youtube-embed` to a link of the form `https://www.youtube.com/watch?v=VIDEO_ID` to opt in. The reader validates the host and video ID, then creates a player on `www.youtube-nocookie.com`; arbitrary iframe markup remains blocked.

</details>
