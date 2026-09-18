# Include project owners in search

## Why

People may remember an owner rather than a project name. Offer that discovery
path while preserving existing default name searches and filter callers.

## What Changes

- Add an unchecked “Include owners” checkbox.
- In the selected mode, match names or owners and rerender on mode changes.
- Preserve query text, default behavior and the existing result feedback contract.
- Add function checks and browser verification for the new behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `project-filter`: add optional owner matching and mode-dependent feedback updates.

## Impact

Expected implementation files are `public/filter.mjs`, `public/app.mjs` and
`public/index.html`, with targeted checks under `tests/`. Existing callers should
remain compatible. No new dependency, data source, sorting, fuzzy search, accent
folding, storage or filtering network request is proposed.

**Status:** Authored teaching proposal. Implementation and acceptance remain open.
