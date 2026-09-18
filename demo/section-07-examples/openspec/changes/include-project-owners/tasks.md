# Owner search — remaining work

## 1. Review and plan

- [ ] 1.1 Confirm the proposed opt-in behavior and control with the learner.
- [ ] 1.2 Inspect the current contract, app, filter callers and checks; resolve conflicts.

## 2. Implement and check behavior

- [ ] 2.1 Add focused checks for default/false and enabled owner modes, normalization, empty input, literal punctuation and accents.
- [ ] 2.2 Add a frozen unsorted fixture covering source order, duplicate occurrences, non-mutation and an entry matching both fields.
- [ ] 2.3 Implement the optional filter mode while preserving current callers.
- [ ] 2.4 Add the labelled native checkbox and update rendering for input and mode events.
- [ ] 2.5 Run existing and new function checks; record actual results against the reviewed code state.

## 3. Verify the interaction and review

- [ ] 3.1 With `team` entered, enable and disable owner mode in the browser; check list, query preservation, count and empty message at both transitions.
- [ ] 3.2 Verify checkbox keyboard operation, associated label, existing input label and polite result announcement markup; record any assistive-technology checks not run.
- [ ] 3.3 Check reload defaults and inspect that filtering adds no persistence or network request.
- [ ] 3.4 Review the diff against each proposed scenario and record limits before considering the change complete.

All boxes are intentionally unchecked. The reference artifact pack does not
implement the feature, execute these checks or establish approval to ship.
