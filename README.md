# Agentic engineering course

This repository contains an HTML course reader and Markdown lessons for practical
agentic engineering with OMP. Each lesson uses focused examples rather than one
mandatory course-wide project.

Start with the [Introduction](sections/introduction.md), then [Getting started with OMP](sections/01-getting-started-with-omp.md),
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
| [Getting started with OMP](sections/01-getting-started-with-omp.md) | Harness introduction, terminal choice, installation, and model connection |
| [Health-checker build example](sections/health-checker/01-getting-started.md) | Optional source material for lessons using the checker |
| [Foundations](sections/health-checker/02-foundations.md) | Eight topics: models and roles, context, prompting, tools, sessions, artifacts, skills, and extensions |
| [Key productivity tips](sections/working-with-omp/index.md) | Voice input, keyboard controls, phone access, and managing agents |
| `sections/health-checker/` | Guided exercises, foundations overview, and the later engineering lessons |
| [Skill-building workshop](sections/health-checker/05-skills.md) | Create and evaluate a reusable review procedure after learning the foundations |
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
