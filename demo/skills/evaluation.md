# Skill evaluation protocol

Run each case in a fresh host session, first without the skill and then with it. Use the same model, files and prompt. Alternate order on repeat runs. Record host/model versions, date, latency, cost if visible, actual answer and score. Do not show the expected outcomes to the model.

| Input | Prompt | Expected behavior |
|---|---|---|
| fixtures/clear-spec.md | Review this specification before implementation. | READY, no invented blocker, test for trimmed mixed-case query |
| fixtures/flawed-spec.md | Review this specification before implementation. | NEEDS DECISION, detects whitespace contradiction and undefined international behavior/"fast" |
| none | Review my specification. | MISSING INPUT, requests path or text, does not invent a spec |
| fixtures/unrelated.md | Explain Map versus object. | Does not activate spec-review automatically; if explicitly forced, says out of scope |

Score separately: activation (0/1), contradiction handling (0/1), no invented behavior (0/1), useful candidate tests (0/1). Missing/unrelated inputs use relevant dimensions only. Have a second engineer score blind to treatment. Repeat at least three times per cell for a pilot; four cases cannot establish broad effectiveness. Record false activations and failures, not only average scores.

Host loading, structural lint, manual review and live behavioral evaluation are distinct checks. See VALIDATION.md for what actually ran.
