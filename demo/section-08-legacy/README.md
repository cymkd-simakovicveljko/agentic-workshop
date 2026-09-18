# Section 8 — legacy ticket exporter

**Original synthetic teaching example, retained for the current section 8.**
This exporter is separate from the sections 1–7 todo app and the historical
project-directory app. Follow the
[direct POSIX-shell/Node lab](../section-08-harness-and-enterprise-lab.md#part-b--prepare-fresh-copies-with-ordinary-tools)
to prepare and run it.

The producer loads a local fixture, stamps an export and maps internal states to
consumer-facing statuses. Its real enterprise analogue might use a database;
this fixture uses no network, credentials or production data. The two consumer
modules simulate compatibility boundaries inside one folder, not separate services.

| Prepared stage | Exporter | Checks supplied in the disposable lab |
| --- | --- | --- |
| `baseline` | Original code in [src/exporter.mjs](src/exporter.mjs) | Three outer baseline checks |
| `seam` | [Dependency seam](reference/seam-exporter.mjs); behavior preserved | Baseline plus six characterization checks |
| `completed` | [Versioned reference](reference/completed-exporter.mjs) | Baseline, characterization, new feature and consumer compatibility checks |

The lab uses `mktemp` and `cp` to prepare a **new** directory for each stage,
then runs the supplied checks with `node --test`. Reference exporters replace
`src/exporter.mjs` only in fresh disposable copies, preserving earlier work.
No preparation helper, Python or checkpoint machinery is required. The three
source versions and test files under `reference-tests/` are authored worked
answers, not observed agent output.

## Teaching contract

Default calls preserve format v1: `CLOSED` maps to `closed`; other states map to
`open`; falsy owners become `unassigned`; rows sort by identifier. The default
data adapter and current clock remain available after the seam is introduced.

The new requirement adds opt-in `formatVersion: 2`, mapping exact state `HOLD` to
`paused`. Unknown states continue to map to `open`; that behavior is recorded, not
endorsed as a universal product rule. Only versions 1 and 2 are supported.

The old consumer accepts v1 only. The upgraded consumer accepts both versions
and counts paused items separately. The lab implements no route selection,
queue, database migration or rollout controller. Those remain worksheet decisions.

Do not silently replace default semantics, regenerate expectations from a broken
candidate or infer production compatibility from this small fixture. The
[historical preparation review](../../_build/section-08/review.md) records the
earlier helper-based checks, not a run of today's direct commands. See the
[content-restoration receipt](../../_build/todo-demo/2026-09-18-content-restoration-verification.md)
for the newer author-side verification and its limits; record your own local
outcomes separately.
