# Owner-search design — proposed

## Context

The prepared baseline searches names through `filterProjects(projects, query)`.
The shared exercise brief requires an explicit broader mode and backwards
compatibility. Inspect source and tests before implementing this design.

## Goals and non-goals

Enable optional owner matching and immediate, understandable feedback. Keep the
existing local app, literal normalization, order, duplicates and non-mutation.
Exclude persistence, ranking, fuzzy search and new dependencies.

## Decisions

1. Propose a third boolean argument, `includeOwners = false`. Omitted and false
   keep current name-only behavior; true matches either name or owner. Use one
   array filter with an OR condition so a single entry matching both fields is
   returned once. Missing owner on a synthetic check fixture can behave as empty
   text. Broader input-schema design is outside this exercise.
2. Use a native checkbox with an associated visible “Include owners” label.
   Default unchecked. A select is also plausible; the checkbox keeps this binary
   choice compact. Always-on broader search would violate the default constraint.
3. Let one render function read the query and checkbox state. Call it on the
   text input's input event and checkbox's change event. Preserve the query value.
4. Keep the count, live region and empty feedback derived from the same result
   list. Do not add storage or network matching.

## Risks and checks

- Silently changing the default would break accepted behavior: check old callers.
- Listening only to text events would leave mode changes stale: exercise both
  mode transitions with `team` already entered in the browser.
- Concatenating separate name/owner result arrays could duplicate an entry:
  include a fixture whose entry matches both fields, alongside repeated entries.
- Sorting output could accidentally reorder records: use an unsorted fixture.

## Implementation and completion

Follow tasks.md only after the learner accepts the proposed requirements and
authorizes implementation. Run old and new checks, inspect browser behavior and
review the resulting diff. Keep the change active until the work is complete;
archiving is not part of this specification-only workshop.
