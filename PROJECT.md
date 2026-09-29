# Health-checker example guide

The course uses focused examples rather than one mandatory project. This guide
defines the website health checker used in some of the retained examples.
Start the course with [Getting started with OMP](sections/01-getting-started-with-omp.md); use this guide only when working through a checker example.

## Build the health checker

The checker requests a URL, checks its HTTP status and expected body text,
measures elapsed time, and reports pass or failure. Start with one URL; later
lessons add a configuration for several targets. Use a language and toolchain
you already know. There are no supplied implementations or language-specific
solution branches.

The [health-checker fixture](demo/health-checker/README.md) provides controlled
local endpoints for healthy, wrong-body, missing, error, redirect, and slow
responses. Its first contract expects a `GET`, status `200`, the literal
`Workshop service ready` body text, and a `1000` ms timeout for the whole
operation. Do not follow redirects or add retries, concurrency, authentication,
or cookies to that first checker. Report an observed status when a response
exists; report the transport or timeout reason otherwise.

## Workspace and fixture

Keep the learner's checker in a new, empty repository, separate from this
course checkout, the fixture process, company repositories, and private data.
Verify the folder before initializing Git:

```sh
git init
git rev-parse --show-toplevel
git status --short
omp --approval-mode always-ask
```

Run the fixture from the course root, not from the learner repository:

```sh
bun demo/health-checker/server.mjs
```

It listens on `127.0.0.1:4175`; `node demo/health-checker/server.mjs` is also
supported. Stop it with **Ctrl+C**. Bun runs the fixture and OMP, but does not
determine the language used for the checker.

## Safety and verification limits

Use only the local fixture or systems you own or are authorized to check. Keep
credentials out of prompts and course files. Approval prompts help keep actions
visible but are not a sandbox; inspect generated files, run the checker, and
compare its behavior with the contract.

The fixture tests and reader tests prove only their documented local behavior.
They do not prove a learner implementation, provider-backed interaction, every
language setup, a fresh OS installation, or classroom pacing. Prepared traces
and expected results are not recordings of a provider-backed run.
