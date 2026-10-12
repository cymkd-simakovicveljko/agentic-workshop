# Agentic engineering course

This repository contains an HTML course reader and Markdown lessons for practical
agentic engineering with OMP. Each lesson uses a focused example rather than one
mandatory course-wide project.

Start with the [Introduction](sections/introduction.md), then [Getting started with OMP](sections/01-getting-started-with-omp.md),
and follow the [outline](OUTLINE.md). The course is language-agnostic: use a
language and normal run/test tools you can review confidently. Later lessons
name any example-specific prerequisites; the health-checker fixture is only for
the optional checker examples that use it.

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

Selected lessons embed YouTube talks and retain a direct link as a fallback.
To opt in, add `data-youtube-embed` to a link with the form
`https://www.youtube.com/watch?v=VIDEO_ID`. The reader validates the host and
video ID, then creates a responsive player on `www.youtube-nocookie.com`.
Arbitrary iframe markup remains blocked.

## Course material

| Material | Purpose |
| --- | --- |
| [Outline](OUTLINE.md) | Course route and lesson sequence |
| [Introduction](sections/introduction.md) | Course framing and agentic engineering basics |
| [Getting started with OMP](sections/01-getting-started-with-omp.md) | Harness introduction, terminal choice, installation, and model connection |
| [Foundations](sections/foundations/index.md) | Models, context, prompting, tools, sessions, artifacts, skills, and extensions |
| [Key productivity tips](sections/working-with-omp/index.md) | Voice input, keyboard controls, phone access, and managing agents |
| [Engineering workflows](sections/engineering-workflows/index.md) | Workflow control, dependencies, bounded loops, and enforced gates |
| [Spec-driven development](sections/spec-driven-development/index.md) | Shared specifications, plans, tasks, and supporting tools |
| [Advanced engineering](sections/advanced-engineering/index.md) | Harness boundaries and changes to existing systems |
| [Build a health checker](sections/examples/build-health-checker.md) | Optional focused example for turning a plain-language request into a tool |
| [Health-check review skill](sections/examples/health-check-review-skill.md) | Optional workshop for creating and evaluating a review procedure |
| [Advanced health-checker example](sections/examples/advanced-health-checker.md) | Optional examples for harness boundaries and compatibility |
| [Health-checker example guide](sections/examples/health-checker-guide.md) | Contract and workspace guidance for the retained checker examples |
| [Health-checker fixture](demo/health-checker/README.md) | Local endpoints used by checker examples |

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

The lessons include static diagrams, practical prompting techniques,
and source-reviewed skill recommendations. No third-party skills
are installed by the course.

The reader serves explicitly allowlisted SVG diagrams and raster images; it
does not load a diagram JavaScript library. Regenerate a compact SVG with:

```sh
node reader/diagrams/derive-course-svg.mjs context reader/diagrams/context.svg
```

The command also accepts `agent-loop` and `workflow` with their corresponding
output paths. Recheck the rendered image after changing its layout.
