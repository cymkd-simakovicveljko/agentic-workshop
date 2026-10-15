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

The local reader serves the Markdown in this checkout on loopback without a build step, account, or database. You do not need OMP or model access just to read the lessons. For the live exercises, [section 1](sections/01-getting-started-with-omp.md) walks through installing OMP and connecting a provider and model. Install other tools only when a lesson needs them.

## Publish on GitHub Pages

**Check visibility before publishing.** A private repository does not automatically give you a private Pages site. [Private Pages hosting requires GitHub Enterprise Cloud](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site). The deployment includes the course and supporting research notes; only publish publicly if that material can be public.

1. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
2. Push the publishing changes to `main`, or run **Publish course reader** from the Actions tab after the workflow is on `main`.
3. Open the URL reported by the deployment. The reader works at either a domain root or a repository path such as `/agentic-workshop/`; no base-path setting is needed.

To generate the same static files locally:

```sh
npm ci
npm run build
```

The build replaces `dist/` with the reader, allowlisted assets, `README.md`, `OUTLINE.md`, and non-hidden Markdown files under `sections/` and `research/`. It skips symlinked content and does not publish the checkout, server code, or all of `node_modules`. The workflow checks the serving and publishing boundaries before uploading only `dist/`.

Pages does not run our Node server or preserve its custom response headers. The static reader includes a content-security policy in its HTML, but that cannot enforce the local server's `frame-ancestors` restriction or its separate SVG sandbox header. Exercise commands still run on the learner's machine.

## Workshop route

The [full outline](OUTLINE.md) includes the individual lessons and their sequence.

| Section | What you will work on |
| --- | --- |
| [1. Getting started with OMP](sections/01-getting-started-with-omp.md) | Choose a terminal, install OMP, connect a model, and learn how to interrupt it. |
| [2. Agentic engineering foundations](sections/foundations/index.md) | Models and roles, context, prompting, tools and permissions, sessions and memory, artifacts, skills, evals, and MCP/extensions. |
| [3. Working with agents in a real codebase](sections/engineering-workflows/index.md) | Investigate code, recognize agent failure modes, choose verification, protect security and data boundaries, and prepare reviewable changes for teammates. |
| [4. Spec-driven development](sections/spec-driven-development/index.md) | Specify, plan, implement, and verify a change; keep the spec aligned as decisions change. |
| [5. Key productivity tips](sections/working-with-omp/index.md) | Voice input, keyboard controls, remote access from your phone, and managing several agents. |

## How we work

Give the agent a bounded task, observe what it actually does, and check the result yourself. A small change may need only a clear request; a larger or ambiguous change needs decisions before code.

**An agent's summary is not proof.** Inspect the files, run the relevant checks, and distinguish what was observed from what was merely claimed. The lessons teach working habits alongside the mechanics: useful follow-up prompts, context handoffs, interruption, and recovery when a run goes off track.

Keep credentials out of prompts and repository files. The setup lesson starts in a scratch folder with supervised tool approvals; it explains what those approvals do and do not protect.

## Working on the material

- `OUTLINE.md` defines the route and populates the **Lessons** drawer and previous/next cards. Keep navigation there rather than adding manual footer links to lessons.
- `sections/` contains the published lessons and their source links.
- `research/` contains supporting notes linked from the lessons and the [reading and video selection record](research/2026-10-14-lesson-reading-and-video-picks.md).
- `reader/` contains the local server, static build, shared publishing allowlist, browser reader, styles, and diagrams.

Edit the Markdown directly, refresh the reader, and check the changed lesson—including links and expandable sections. There is no need to restart the server after a Markdown edit. Refresh preserves your scroll position and expanded sections in the same browser tab when session storage is available. Read the neighboring lessons so prerequisites and next steps still line up.

Run the reader's file-serving and static-publishing security checks with:

```sh
node --test reader/server.test.mjs reader/build.test.mjs
```

For browser regressions, open the local or published reader in a foreground tab and paste the contents of `reader/browser-check.js` into the browser's developer console. Run it once at desktop width and once at a mobile width of 900px or less. It navigates between lessons and checks staggered lesson and drawer fades, Back/Forward positions, disclosure progress, heading navigation, drawer keyboard focus, and recovery from a simulated failed document load. Repeat with `prefers-reduced-motion: reduce` enabled in the browser's rendering tools to check that content appears immediately instead of fading. It also opens and closes a temporary tab to check scroll position and disclosures across refresh; allow popups for this check. A failure throws an error; success logs `Reader checks passed`.

These checks cover the reader and publication boundary, not GitHub account settings, provider access, fresh-machine installation, or the results of a learner's agent session. Prepared traces in the lessons are labelled examples, not recordings of live runs.

<details>
<summary>Maintaining diagrams and video embeds</summary>

The reader serves explicitly allowlisted images; it does not load a diagram JavaScript library. Regenerate the agent-loop diagram with:

```sh
node reader/diagrams/derive-course-svg.mjs reader/diagrams/agent-loop.svg
```

Check the rendered image after changing its layout.

Embed recommended YouTube videos in the lesson, keeping a direct link as a fallback. Use each video once per page rather than repeating it in the further-reading section. Add `data-youtube-embed` to a link of the form `https://www.youtube.com/watch?v=VIDEO_ID`. The reader validates the host and video ID, then creates a player on `www.youtube-nocookie.com`; arbitrary iframe markup remains blocked.

</details>
