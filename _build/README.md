# Course build and verification material

User-facing material lives one level above. This directory keeps author-side
receipts, prepared examples and retained historical helpers.

| Material | Purpose and evidence boundary |
| --- | --- |
| [Original todo-app receipt](todo-demo/verification.md) | Canonical todo-app behavior and fresh-checkout rehearsal; retained unchanged |
| [Content-restoration receipt](todo-demo/2026-09-18-content-restoration-verification.md) | Restoration source review, route verification and explicitly recorded rehearsal limits |
| `section-01` through `section-07` | Historical pre-simplification lesson and project-directory preparation evidence; not validation of the active todo-app route |
| [Section 8 preparation review](section-08/review.md) | Retained enterprise-exporter evidence from the earlier helper-based preparation, including baseline, seam, feature and consumer checks |
| `draft-v0` | Historical foundation-lab helper and older source inventory |

The old core helpers and checkpoints are superseded; they are not part of the
active learner route and do not validate `demo/todo-app`. Section 8's separate
legacy exporter remains current teaching material, but its old preparation
helper is not required. The [current enterprise lab](../demo/section-08-harness-and-enterprise-lab.md)
uses direct POSIX-shell copying and Node commands. Its historical receipts retain
their original scope and date; they are not evidence that those newer commands
were run. Consult the content-restoration receipt for the newer verification.

A verification receipt records only the command or interaction actually performed.
Provider-backed OMP runs and classroom timing require their own rehearsals; passing
app tests does not establish either.
