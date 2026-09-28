# Agentic engineering course

This repository contains the current HTML course reader and Markdown lessons for
using OMP to build and review a website health checker. It is course source, not
the learner's exercise workspace.

Start with the [Introduction](sections/introduction.md), then [Get Ready](sections/01-get-ready.md),
and follow the [outline](OUTLINE.md). The course is language-agnostic: use a
language and normal run/test tools you can review confidently. The
[health-checker fixture](demo/health-checker/README.md) provides predictable
local endpoints; keep the checker you build in a separate, empty learner-owned
repository.

OMP and an approved provider are needed for live agent exercises. Keep
credentials out of prompts and course files. Use only local, owned, or
authorized endpoints.

## Read in the browser

Use Node 22.12 or newer to host the reader. From the course root:

```sh
npm install
npm start
```

Open **http://127.0.0.1:4173**. The reader renders the Markdown course from this
checkout, including the outline in `OUTLINE.md`. It binds to loopback, has no
build step, account, database, or copied content, and uses the installed
`marked` and `DOMPurify` packages. Refresh after editing a document. Stop it
with **Ctrl+C**; if port 4173 is occupied, use `PORT=4174 npm start`.

## Course material

| Material | Purpose |
| --- | --- |
| [Outline](OUTLINE.md) | Course route and lesson sequence |
| [Introduction](sections/introduction.md) | Course framing and agentic engineering basics |
| [Get Ready](sections/01-get-ready.md) | OMP setup, model access, language tools, and a separate workspace |
| `sections/health-checker/` | Eight lessons using the shared health-checker project |
| [Health-checker fixture](demo/health-checker/README.md) | Local endpoints, startup instructions, and acceptance rules |
| [Project guide](PROJECT.md) | Checker contract, workspace guidance, safety, and verification limits |

## Verification

Run the focused local checks with the reader-hosting Node runtime:

```sh
node --test demo/health-checker/server.test.mjs reader/server.test.mjs
```

These tests cover the fixture's fixed HTTP behavior and the reader's
file-serving boundary. They do not prove a learner-generated checker,
provider-backed interaction, every language toolchain, fresh OS installation,
or classroom pacing.

## Diagrams, prompting, and skills

The health-checker lessons include static diagrams, practical prompting
techniques, and source-reviewed skill recommendations. No third-party skills
are installed by the course.

The reader serves three allowlisted SVG diagrams and does not load a diagram
JavaScript library. Regenerate a compact SVG with:

```sh
node reader/diagrams/derive-course-svg.mjs context reader/diagrams/context.svg
```

The command also accepts `agent-loop` and `workflow` with their corresponding
output paths. Recheck the rendered image after changing its layout.
