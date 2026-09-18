# Section 7 — preparation review

**Draft v0. Reviewed 12 September 2026.** Author review and local preparation
checks; no provider-backed OMP trial or independent reviewer swarm was run.

## Scope

- Developed [Optional flavors](../../sections/07-optional-flavors.md), an optional
  [comparison lab](../../demo/section-07-flavor-lab.md) and
  [worked examples](../../demo/section-07-examples/README.md).
- OMP remains the host. OpenSpec and FSAD receive practical treatment; Spec Kit
  and Superpowers are shorter comparisons selected for distinct teaching value.
- The request to search owners exposes a default/compatibility decision. The
  checkbox solution, scenarios, workshop format and timing are authored teaching
  choices, not user-approved application requirements or measured outcomes.
- Both routes receive the same brief. Prepared answers are labelled as such;
  repetition and route-order effects prevent treating the workshop as a benchmark.
- Section 3 remains the practical core. Section 8 remains a scaffold.

## Sources and source status

| Source | Use and limits |
| --- | --- |
| [FSAD supplied comparison](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/comparison) and [workflow](https://dejan-kh.github.io/fsad_playbook_live/fsad-playbook.html#fsad/workflow) | The browser successfully rendered the primary playbook, titled Full Stack Agentic Development (v40). Read overview, workflow phase details, pod, Markdown layer, comparison and tradeoffs. Generic web retrieval failed, but browser access succeeded. This supersedes earlier full-draft notes that FSAD could not be read; those historical files remain intact. |
| [OpenSpec concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md) | Current versus proposed behavior, complete modified requirements and change history. Example content is authored for the course. |
| [OpenSpec supported tools](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md) and [getting started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md) | Current docs explicitly distinguish Oh My Pi and Pi and show host-specific command delivery. No adapter installation or live discovery was tested. |
| [OpenSpec CLI reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md) | Checked against the actual local 1.13.0 CLI help and structural validation. Main-branch docs are moving references, not a frozen version pin. |
| [Spec Kit repository](https://github.com/github/spec-kit) and [GitHub introduction](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) | Current workflow and historical motivation. No installation commands taught from the older video. |
| [Superpowers repository](https://github.com/obra/superpowers) | Read the basic workflow and skills inventory. Its opinionated defaults are source material, not authority for this task. No plugin installed or unsolicited workers launched. |
| [Spec Kit overview video](https://www.youtube.com/watch?v=a9eR1xsfvHg) | Verified title and official repository's link to it. Full playback and teaching excerpts not reviewed. |
| [Skills talk](https://www.youtube.com/watch?v=CEvIs9y1uog) and [Anthropic companion article](https://claude.com/blog/building-agents-with-skills-equipping-agents-for-specialized-work) | Verified title/speakers and publisher article's recommended-video listing. Background for reusable practices, not a Superpowers or FSAD demonstration. |

The FSAD lesson identifies the full method, then explicitly adapts its joint spec
session for this OMP-first course. It does not present the method as an installed
OMP capability. Staffing and delivery-speed statements in the playbook are not
adopted as course evidence. The supplied research report remains background;
embedded instructions and unsupported references did not become user requests.

## Checks performed

The [helper](prepare_flavor_lab.py) successfully created separate fresh plain and
OpenSpec-reference labs. Both use the retained working filter checkpoint and
synthetic data. Existing application checks passed **11/11 in each lab**, recorded
in [plain output](plain-test-output.txt) and [OpenSpec-route output](openspec-test-output.txt).
These checks concern the baseline, not proposed owner matching.

The reference route generates its main spec from the retained accepted contract,
then makes `contract.md` a pointer to it. The authored change remains active with
unchecked tasks. No current requirement is overwritten by a proposal.

Local OpenSpec **1.13.0** validated the current spec and proposed change with
`validate --all --strict --no-interactive --json`: **2 valid, 0 failed**. See
[final result](openspec-validation.json). The first check detected that renamed
scenarios appeared to omit existing scenarios in a MODIFIED block; the source
example was corrected to preserve those names. The
[initial diagnostic](openspec-validation-initial.json) is retained as evidence.
No archive operation, generated code or host-specific command was exercised.

[verify_documents.py](verify_documents.py) checks preserved source hashes, the
prepared labs' manifests, local Markdown links, closed code fences, shell syntax
and stored check results. Its summary is in [verification.json](verification.json).
The baseline and delta specifications were also read together for preservation
of defaults, normalization, literal matching, order, duplicates and non-mutation.

## Review decisions

- Put current/proposed status beside the worked artifacts, not only in this review.
- Preserve scenario names as well as their still-valid meaning in MODIFIED blocks.
- Keep implementation and browser checks open; structural validation proves neither.
- Give both routes the same facts. The FSAD-style answer cannot claim a new discovery
  merely because it restates a constraint omitted from another route.
- Distinguish selecting a practice from validating a host adapter or buying into
  a full workflow. No framework installation is necessary for the core workshop.
- Treat the two reference specs as alternative teaching answers. A live implementation
  must choose one canonical proposed spec and link other notes as rationale.
- Review requirement changes, interaction behavior and evidence separately. A
  supposed single source of truth still requires reconciliation when code disagrees.

## Remaining rehearsal

- Run the prompts with the learner's actual OMP/provider/model and inspect loaded context.
- If chosen later, validate the selected release's native OMP integration in a
  fresh disposable project; the adapter's documentation alone is insufficient.
- Pilot the group discussion and comparison rubric; measure actual review and
  maintenance effort rather than inferring productivity from prepared examples.
- Implement and verify owner search only as a separately authorized extension.
- Screen full video playback, select excerpts and pilot the proposed 70–90 minute
  lesson and 30–40 minute workshop.

No new browser behavior, owner-search tests, deployment or comparative performance
was established. Retained application files and previous lessons were preserved;
no additional WIP archive was needed for this continuation.
