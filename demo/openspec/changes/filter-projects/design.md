# Design

## Context
The HTML input, rendering and input listener already exist. The current pure filter returns a copy of the entire array.

## Goals / Non-Goals
Implement the accepted local filter. No fuzzy matching, sorting, debouncing, network, persistence or locale library.

## Decisions
Use trim(), toLowerCase(), includes() and filter(). At four records, no indexing is warranted.
Keep matching as a pure function so edge behavior is cheap to test. Use textContent in the existing view.

## Risks / Trade-offs
JavaScript lowercasing is not a complete international search policy. Changing that policy needs a new requirement.
Unit tests cover matching; the presenter also checks input, count, empty state and keyboard behavior in a browser.

## Migration Plan
No data migration. Roll back by restoring the previous implementation. This is a local exercise only.

## Open Questions
None after the example decisions. Real stakeholders must approve their own search rules.
