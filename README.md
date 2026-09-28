# Agentic engineering course

Start with the [Introduction](sections/introduction.md), then [Get Ready](sections/01-get-ready.md). The [main outline](OUTLINE.md) follows the first commit's eight-section progression: first task, foundations, everyday workflow, context, skills, reliable execution, optional flavors, and advanced work.

The shared project is a website health checker. The [previous revised eight-section course](alternatives/eight-section-outline.md) remains available as historical alternative material; its [revision plan](2026-09-22-course-review-and-action-plan.md) preserves earlier decisions.

The main course is language-agnostic. Learners create the checker in a familiar language and use their normal run and test tools. The [local fixture](demo/health-checker/README.md) supplies predictable endpoints using Bun, already installed for OMP. There are no separate language tracks or supplied checker implementations.

The [older alternative](alternatives/eight-section-outline.md) still depends on a missing todo repository for its app exercises. The [project guide](PROJECT.md) keeps those prerequisites separate.

OMP setup and an authorized provider are required only for live agent exercises.
Keep credentials out of prompts and course files. Written lessons, local checks,
provider-backed interaction and classroom rehearsal are separate evidence.

## Read in the browser

To host the HTML reader locally, use Node 22.12 or newer. This is a reader-hosting requirement, not a required language for the exercises:

```sh
npm install
npm start
```

Open **http://127.0.0.1:4173**. The local HTML reader takes its left-hand outline
from `OUTLINE.md` and renders the original Markdown files, including companion
links and the retained historical alternative. Refresh after editing a document.
There is no build step, account, database or copied content. Marked parses Markdown;
DOMPurify sanitizes the resulting HTML. Both are installed locally, not loaded from a CDN.

The reader is a local preview, inspired by the dark Three.js Journey lesson layout,
with course-specific branding and no copied media. It binds only to loopback and
serves a restricted set of course files; it is not a public hosting configuration.
Stop it with Ctrl+C. If port 4173 is occupied, use `PORT=4174 npm start`.
Run `node --test reader/server.test.mjs` for its read-only file-serving boundary check.

## Course material

| Material | Purpose |
| --- | --- |
| [Outline](OUTLINE.md) | Introduction, setup, and eight sections following the original progression |
| [Introduction](sections/introduction.md) | Main-route course framing and agentic engineering basics |
| [Get Ready](sections/01-get-ready.md) | Terminal, OMP, model access, and a learner-owned workspace |
| [Health-checker fixture](demo/health-checker/README.md) | Local endpoints, startup instructions, and shared acceptance rules |
| [Eight-section alternative](alternatives/eight-section-outline.md) | Retained later revision and its numbered companion material; not the current route |
| [Project guide](PROJECT.md) | Main exercise approach and separate prerequisites for the older alternative |
| [Demo guide](demo/README.md) | Main-route links, alternative companions and the boundary around historical demo material |
| Earlier full draft: `sections_old/` in the checkout | Historical source for restored teaching depth, not an active learner route or a browser-served directory |
| [Simplification plan](2026-09-17-simplification-plan.md) | The agreed scope and completion criteria |
| [Content restoration plan](2026-09-18-content-restoration-plan.md) | Implemented source-led restoration and preserved agreed decisions |
| [Restoration verification](_build/todo-demo/2026-09-18-content-restoration-verification.md) | Author-side evidence and limits; separate from the original app receipt |

The legacy project-directory demo, todo lessons, checkpoints, and preparation helpers remain historical. Their receipts do not validate the health-checker route. Local fixture verification does not establish provider-backed interaction, every learner-language implementation, or classroom pacing.

## Verification of this route

Run the focused local checks with the reader-hosting Node runtime:

```sh
node --test demo/health-checker/server.test.mjs reader/server.test.mjs
```

All three tests passed locally. A separate smoke run against the Bun-hosted fixture observed the expected six cases: healthy pass, body mismatch, HTTP 404, HTTP 500, un-followed HTTP 302, and a timeout under the one-second deadline. This checks the fixture and a temporary request probe—not a learner-generated checker.

The introduction, setup, and eight lesson pages were opened in the HTML reader at desktop and mobile widths; no page-level horizontal overflow was observed. No paid provider run, fresh Windows/Linux installation, classroom rehearsal, or implementation in every learner language is claimed.

## Diagrams, prompting, and skills

Sections 2–4 contain static diagrams for the agent loop, engineering workflow, and context selection. Section 3 adds [practical prompting techniques](sections/health-checker/03-everyday-workflow.md#practical-prompting-techniques); section 5 adds [source-reviewed skill recommendations](sections/health-checker/05-skills.md#skills-worth-trying), including `i-have-adhd` and Matt Pocock's engineering skills. No third-party skills are installed by the course.

The reader serves only the three allowlisted SVG images under `/diagrams/`; it does not load a diagram JavaScript library. Compact, system-font images are generated by `reader/diagrams/derive-course-svg.mjs`. For example:

```sh
node reader/diagrams/derive-course-svg.mjs context reader/diagrams/context.svg
```

The same command accepts `agent-loop` or `workflow` with the corresponding output path. Recheck the rendered image after changing its layout. The directory also retains Archify source specifications, standalone HTML, and `*.export-receipt.json` records. Their 9/9 showcase and automated browser receipts describe the canonical HTML, **not** the compact derivative SVGs.

The final course images were inspected in the real reader at 1440px and 390px widths. Browser geometry checks found no node text outside its box, no edges outside the canvas or through unrelated nodes, and no page-level horizontal overflow. Derivative receipts bind those checks to the served SVG hashes. The reader boundary test also covers SVG MIME/CSP and rejects non-allowlisted diagram paths. These checks do not establish prompting effectiveness or successful installation of an upstream skill.

## Repository and publishing

This course is its own Git repository and is intended to be a submodule of the
surrounding Pepe repository. Its `origin` is configured as
`git@github.com:cymkd-simakovicveljko/agentic-workshop.git`.
As of 2026-09-18, GitHub reports "Repository not found" for the current SSH
account; no push has occurred and the parent submodule relationship has not yet
been configured. The canonical nested todo repository's exercise and solution
branches are required but unavailable in this checkout; its publishing arrangement
is also unresolved. The recorded gitlink is not a configured submodule source.

The course ignore file excludes dependencies, environment values, caches,
application builds, local agent runs, and test output. Course documents,
lockfiles, reusable agent configuration, and `_build/` scripts and receipts
remain eligible for version control.
