# FSAD-style session — owner search

**Draft v0 reference answer. Imagined discussion, not a transcript or approval.**

This adapts the live specification practice in the
[FSAD playbook](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/workflow).
It does not implement the playbook's full execution or shipping process.
The [shared brief](shared-brief.md) is available to all perspectives.

## Intent and decision

Help people locate a project using a remembered owner while preserving the
default search. Product requires unchanged default results. UX needs the broader
scope to be visible and keyboard operable. Engineering needs compatibility with
existing filter callers and immediate updates on both text and mode changes.

**Proposed decision:** Add an unchecked native checkbox labelled “Include owners”.
Its state applies to the current page only. Checking it searches either field;
unchecking it restores name-only matching. The text input keeps its contents.

A select control could also meet the brief. A checkbox is the reference choice
because there are two modes and its label can state the extra behavior directly.
Always-on owner search conflicts with the default constraint and is rejected for
this exercise. This is an authored example of a resolved decision; a real session
needs the actual participants' agreement.

## Proposed behavior

1. On page load, the checkbox is unchecked. Existing two-argument filter calls
   still search names only. With `team`, no project matches in this mode.
2. When enabled, a project matches if its name **or** owner contains the normalized
   query. `team` returns Borealis; `Atlas` returns Atlas, Atlas API and Borealis;
   `  mIrA  ` returns Atlas.
3. Both modes trim the query and use JavaScript `toLowerCase()` and literal
   substring matching. `.*` and `cafe` return none for the supplied data. No accent
   folding, ranking, fuzzy matching or locale-specific behavior is added.
4. Preserve source order, duplicate input entries and the input array. Matching
   both fields does not duplicate one input entry in the result. Empty or
   whitespace-only input returns all entries in source order in either mode.
5. Text input and checkbox changes immediately update the visible list, the
   `N of 4 projects` polite live region and the conditional empty message. With
   `team` entered, enable then disable: counts are 1 then 0 and the query persists.
6. The checkbox has the visible associated label “Include owners” and is operable
   with keyboard focus and Space. Keep the existing labelled text input. Reload
   starts in name-only mode; do not add storage or filtering network requests.

## Engineering handoff

Inspect the current filter and event handling before drafting the implementation
plan. A possible design adds an optional boolean filter argument with default
`false`; callers that omit it retain current behavior. Use one render path that
reads both input and checkbox state. This is a proposed design, not current code.

If source inspection reveals a conflict, return it to the learner with evidence.
Do not silently weaken the behavior specification or alter tests to conceal it.

## Verification to perform after implementation

| Behavior | Planned evidence |
| --- | --- |
| Default remains compatible | Existing checks plus explicit omitted/false argument cases |
| Owner mode and normalization | New function checks for team, Atlas, padded mixed-case owner, punctuation and accents |
| Order, duplicates and purity | Frozen unsorted fixture with duplicate occurrences and an entry matching both fields |
| Empty input in both modes | Function checks returning the full ordered input |
| Mode changes with existing query | Browser observation of list, text, count and empty message during both transitions |
| Keyboard use and labelling | Browser keyboard check and label association inspection |
| No added persistence or network matching | Code inspection; reload and observed filtering behavior |

**Evidence status:** All owner-search checks above are planned, not run. Existing
baseline checks cover a different behavior. The core workshop ends with a reviewed
proposal and open implementation tasks, not a shipping claim.

## Session review

Have a reader who missed the discussion explain the default and mode transition.
If they cannot, improve the proposed spec before handing off. Record unresolved
decisions explicitly; do not fill them with invented stakeholder agreement.

For an OpenSpec route, put the proposed requirements in its delta specification
and retain this discussion only as linked rationale. Do not maintain two active
copies of the same requirements.
