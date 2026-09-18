# Todo demo verification — 2026-09-17

## App behavior

- Baseline unit suite: `npm test` — 4 passing tests.
- Baseline browser suite: `npm run test:e2e` — 1 passing test.
- Production build: `npm run build` — passed.
- Visual browser check on the Vite app: added **Visual check**, reloaded and found it
  persisted, completed it, then deleted it. Labelled input, checkbox and delete
  control were present throughout.

## Fresh learner checkout

A new local clone of `demo/todo-app` ran `npm ci` successfully. The following all
exited 0 with their unit and browser suites:

- `main`
- `solution/remaining-count`
- `solution/unfinished-filter`
- `solution/blank-task-bug`

On `exercise/blank-task-bug`, `npm test` exited 1 as documented: blank-task
rejection and trim-preservation assertions failed. This is the intended seeded
defect, not a setup failure.

## Limits

No provider-backed OMP teaching run or timed classroom rehearsal was performed.
The browser tests and visual check establish app behavior; they do not establish
those separate claims.
