# Facilitator guide — Draft v0

> **Earlier full-draft reference.** Current development follows the [agreed eight-section outline](OUTLINE.md), one section at a time. This document’s detailed content and timing are not the agreed curriculum.

Pair this with [the course](COURSE.md) and [OMP setup](OMP.md). These notes contain exercise answers. Keep them out of the learner's initial agent context; they are review aids, not secret assessment infrastructure.

## Delivery pattern

Begin each session by retrieving one idea from the previous one. Explain a small concept, request a prediction from everyone, run the exercise, then discuss the mismatch between prediction and evidence. Ask for a file, requirement or observed result when an answer is vague.

Use the session allocations in the course. For a 90-minute block without a more specific timetable, use 10 minutes of retrieval, 15 explanation/reading, 20 guided work, five break, 25 independent or pair work, 10 individual explanation and five feedback. For the 60-minute delegation workshop, use 10 retrieval, 10 examples, 20 worker briefs, 15 integration review and five exit question. These are draft allocations to adjust after rehearsal.

If many learners make the same mistake, revisit the contract with a contrasting example. If one person needs help, offer the next hint rather than the complete implementation. Pair success does not replace individual explanation.

## Before a cohort

Confirm the selected OMP release, model access and classroom budget. Create a fresh foundation lab; run starter, broken and solution checks. Rehearse actual instruction and skill discovery, cancellation, child-process behavior and browser interactions on the teaching machine. Prepare a saved, sanitized live-run trace only after a real run exists; do not invent a transcript.

The default capstone has a complete contract in the course. Optional role-specific repositories and the enterprise simulator need additional preparation. No delivery date, course owner or organizational adoption is presumed by this draft.

## Answer guide and hints

| Session | Expected reasoning | Hint ladder |
| --- | --- | --- |
| 0 | Padded Atlas returns atlas/atlas-api; team and literal .* return none; blank returns all four in source order | Which fields match? What happens before matching? Which observable result would refute the answer? |
| 1 | Model proposes, tool executes, harness controls the surface, engineer interprets and accepts | Point to a read, an edit and a test result; distinguish their roles |
| 2 | Owner search violates name-only intent even when candidate tests agree | Compare tested expectations with the contract; choose an owner-only query |
| 3 | package.json and fresh results refute stale handoff claims | Locate available scripts; inspect current filter; reproduce the failure |
| 4 | Behavior decisions precede implementation details; task state cannot resolve ambiguity | Ask for an exact outcome, then separate how it might be implemented |
| 5 | Current state plus actual checks determine the next action | Find the tested revision, failed requirement and unfinished work |
| 6 | Discovery, activation and useful behavior are separate | Compare irrelevant/missing-input cases and retain raw outputs |
| 7 | Independence and integration cost justify delegation | Name each worker's inputs, output contract and shared resources |
| 8 | Falsey values can be valid IDs; tests must preserve type and order | Compare null/undefined exclusion with truthiness; inspect first-occurrence behavior |

### Retry workshop answers

Assume adequate deadline budget unless the scenario states otherwise.

- GET 429 then 200: return 200 after two calls; one delay using valid Retry-After or the 100 ms fallback.
- Three GET 429s with no valid Retry-After: make three calls, wait 100 then 200 ms, and return the third response. Do not wait again.
- POST 429: return immediately after one call.
- GET 500: return immediately after one call.
- Valid Retry-After exceeding or equalling remaining time: return timeout; do not shorten the delay or start another request.
- Malformed or HTTP-date Retry-After: use the stated fallback, subject to the deadline.
- Transport error: use the existing error path; no retry under this classroom contract.

A learner should recognize how incomplete such a policy would be without an explicit decision on these cases. Do not infer that the classroom policy is the right production policy.

### Capstone reference and review challenge

One implementation satisfying the bounded `uniqueById` contract is:

```js
export function uniqueById(records) {
  const seen = new Set();
  return records.filter(record => {
    const id = record.id;
    if (id === null || id === undefined || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}
```

A plausible wrong implementation uses `if (!record.id)`. It discards valid `0` and `""` records. Another converts IDs to strings and incorrectly merges `1` with `"1"`. Ask learners to identify a distinguishing case before revealing these examples.

Meaningful review cases include empty input; missing/null/undefined IDs; repeated zero and empty string; numeric versus string IDs; order; first-record identity; new output array; frozen input unchanged. The contract excludes NaN, infinities and non-string/non-number IDs, so do not introduce those as surprise required behavior.

If using a changed requirement for assessment, state it explicitly. For example, keeping the last record requires a new agreed ordering rule; “keep the last” alone leaves output order ambiguous.

## Prepared fallback, labelled as such

If provider access fails or an attempt stalls, stop the run and say: “We are using a prepared implementation. We can still evaluate its behavior and review the evidence.” Do not call it a live model result.

1. Show the contract, data and starter. Have everyone write predictions.
2. Show the reference filter from `checkpoints/solution/filter.mjs` as a file, then load it in the disposable lab and run `npm test`.
3. Show the diff and explain `trim`, `toLowerCase`, `includes` and array filtering. Test the UI if a browser is available.
4. Load the prepared broken checkpoint. Have learners diagnose before revealing that it omits trimming. Run the same checks; the two whitespace cases fail.
5. Load the solution again and rerun checks. Record what was prepared and what was executed locally.
6. Finish with an individual explanation of why structural validation or a green summary cannot establish behavior.

If local execution is also unavailable, use the observed checkpoint counts in [OMP.md](OMP.md) as prior reference evidence and conduct a code review on paper. Record local execution as not run. This preserves the reasoning activity but does not complete a live OMP lab.

## Assessment and feedback

Use the rubric in Session 8. Record hints, prior experience, variant and incomplete work. Have two facilitators score a small shared sample before grading a cohort. Resolve disagreement with artifacts, not confidence or fluency.

Learners may retry a missing capability. Successful use of a known reference solution does not demonstrate transfer. Change the reasoning problem while keeping setup and technical difficulty comparable.

After the pilot, review setup failures, support minutes, exercise completion, causal explanations, review effort and unresolved defects. Ask what was confusing, then distinguish conceptual difficulty from broken instructions or infrastructure. Do not claim the curriculum improves delivery until evidence supports that conclusion.
