# Filter projects by name

## Why
An engineer wants to find a project in the local directory without scanning the list.

## What Changes
Add a literal, case-insensitive substring filter over project names. Trim the query. Keep source order.

## Capabilities
### New Capabilities
- `project-filter`: local name filtering, blank and empty-result behavior.
### Modified Capabilities
None. Initial directory behavior remains intact.

## Impact
Implement public/filter.mjs. The input, rendering and synthetic data already exist.
No API, persistence, dependency, permissions or deployment changes.
