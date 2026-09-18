# Owner search — shared workshop brief

**Status: new request; decisions below are constraints, not a completed feature.**
Give this entire brief to every comparison route. All records are synthetic.

## Request

Let people search by owner as well. Someone remembers a team or person's name
but cannot recall the project name. Preserve existing name-only behavior as the
default; make any broader matching an explicit user choice.

## Current state

The prepared app has a working name filter. Read `contract.md`,
`public/projects.mjs`, `public/filter.mjs`, `public/app.mjs`, `public/index.html`
and `tests/` in the disposable lab. The current contract is the baseline.

| Project | Owner |
| --- | --- |
| Atlas | Mira |
| Atlas API | Leo |
| Borealis | Atlas team |
| Café | Nina |

The filter trims the query, uses JavaScript `toLowerCase()` and literal substring
matching, preserves source order and duplicates, and does not modify the input.
An empty normalized query shows all records. Accent folding is outside scope.

## Facts and constraints available to every route

- **Product:** Owner discovery is useful, but existing default searches must keep
  their name-only results. A broader default requires a separate product decision
  outside this exercise. No ranking, fuzzy search or extra data is requested.
- **UX:** Users need a visible, keyboard-operable way to choose broader matching.
  Changing that choice should reuse the current text and update results and count
  immediately. There is no requested persistence across reloads or sessions.
- **Engineering:** Existing two-argument filter callers must retain their behavior.
  Matching should remain local. Preserve normalization, literal matching, source
  order, duplicates and non-mutation. No new application dependency is needed.

These constraints expose a choice of interaction, not permission for the agent to
invent a different default. A checkbox, select or another justified accessible
control can meet them. The reference answer chooses a checkbox.

## Acceptance examples independent of the chosen control

| Mode | Query or action | Expected result |
| --- | --- | --- |
| Default name-only | `team` | None |
| Broader name-or-owner | `team` | Borealis |
| Default name-only | `Atlas` | Atlas, Atlas API |
| Broader name-or-owner | `Atlas` | Atlas, Atlas API, Borealis |
| Broader name-or-owner | `  mIrA  ` | Atlas |
| Broader name-or-owner | `.*` or `cafe` | None for this dataset |
| Either | Empty or whitespace-only query | All four in source order |
| Start name-only with `team` | Enable broader mode, then disable it | Borealis, then none; query remains `team`; count and empty feedback follow the list |

A record matching both fields appears once per occurrence in the input. Duplicate
input records stay duplicated. Counts use the existing `N of 4 projects` format;
the polite live region and conditional `No projects found.` message remain.

## Workshop output

Produce a proposed specification, the reason for the interaction choice, remaining
questions and a verification plan. Label assumptions and unperformed checks.
Do not implement the feature during the core workshop. An implementation extension
requires the learner to choose the proposed specification and authorize that work.
