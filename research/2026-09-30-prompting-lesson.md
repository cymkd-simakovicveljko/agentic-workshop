# Prompting: research and lesson proposal

Research checked on 30 September 2026. This is a proposal for [2.3 Prompting](../sections/foundations/prompting.md), not a published lesson rewrite. Ten parallel research passes covered courses, task definition, output structure, prompting styles, coding agents, contrary evidence, templates, examples and evaluation, OMP affordances, and lesson design. Main synthesis selected the material below rather than treating agent agreement as evidence.

## Recommendation

Teach prompting as more than asking questions: **direct the work, choose a useful output shape, and refine it against evidence.** Keep natural conversation as a valid starting point. Show the range of possible work before introducing reusable patterns.

The author's Lego analogy is useful: a free-form answer may solve an immediate question; a comparison, evidence table, change brief, or checklist can become a piece another person or later task can use. The deeper move is not decorating prose. Asking for `Claim | Evidence | Unknown` requests different relationships than asking for a general explanation.

Three distinctions must stay clear:

- **Input formatting** separates instructions, examples, and source material.
- **Output design** specifies what relationships, decisions, or artifacts the response should expose.
- **Enforced structure** is an API or validator capability, not something a chat instruction guarantees.

Formatting is not proof of truth or improved reasoning. A clean table can contain invented evidence. We have not found direct evidence establishing a general improvement in coding-agent review speed or accuracy from the proposed output shapes.

Treat the author's observation that prompting becomes familiar and template-like with practice as personal experience. The lesson should encourage a repertoire, not a universal template.

## Proposed lesson order

| Section | What it should teach | Visible example or activity |
| --- | --- | --- |
| **You can ask for more than an answer** | Explain, extract, compare, challenge, transform, plan, or implement. The useful operation depends on what happens next. | One code investigation expressed as an explanation, an evidence table, and a change brief. |
| **Define what matters, leave room for judgment** | Outcome, relevant context, consequential constraints, and evidence of done. These are questions to consider, not mandatory headings. | A short settled request beside a request that needs clarification. |
| **Choose how to work together** | Direct delegation, conversational exploration, examples, comparison, critique and revision. Styles can be combined. | Dropdowns with use-when guidance and original prompts. |
| **Choose the shape of the result** | A timeline exposes order; a table supports comparison; a checklist supports acceptance; a brief supports continuation. Pick the consumer before the format. | The author's Lego analogy plus one concrete before/after. |
| **Refine using what actually happened** | Identify a factual gap, missing boundary, poor shape, or failed behavior. Correct the relevant part instead of saying “try harder.” | One evidence-based follow-up. |
| **Keep patterns that earn their place** | Reuse stable instructions with changing inputs. Recheck assumptions when the task or model changes. | One optional OMP Markdown command; link to Skills rather than packaging a skill here. |
| **Try it: one investigation, two useful outputs** | Observe the effect of structure and verify the content. | Familiar repository, read-only investigation, structured follow-up, source check. |

Keep one short research takeaway visible. Put detailed studies and extra formats in optional reading. Do not turn the page into seven long essays. The current health-checker-specific table and follow-up should be replaced, not supplemented with another mandatory project.

## Six expandable prompt examples

Use the existing native `details`/`summary` styling, with copyable code blocks. Each example needs: **use when**, **prompt**, and **what to inspect**. These are original proposed examples, not transcripts or measured model results. Replace bracketed inputs before running.

### 1. A direct request is enough

Use when the goal is clear and small.

```text
Read the implementation of [feature] and explain how it works to a teammate
new to this repository. Point to the entry point and the important dependencies.
Do not change files.
```

Inspect: does the answer describe this repository, or generic knowledge about similar systems? A concise direct prompt is not an inferior form of prompting.

### 2. Let the conversation define the task

Use when the desired change is still ambiguous.

```text
I want to improve [specific behavior], but I have not decided the approach.
Inspect the relevant code first. Tell me what it does now and which unresolved
decisions would materially change the behavior, risk, or scope.
Ask about those decisions before proposing an implementation. Do not edit yet.
```

Inspect: does the agent ask about real choices, or ask questions it could answer from the repository? The human must still notice missing assumptions; models are not reliable ambiguity detectors.

### 3. Turn an explanation into evidence you can inspect

Use when a prose answer is hard to check or reuse.

```text
Rework the investigation as a Markdown table:
Behavior | Source location | Supporting evidence | Unknown or unchecked

Separate code observations from test results. Cite the source for each factual
claim. Mark anything not established as unknown. Do not invent test outcomes
or make new claims merely to fill the table. Do not change files.
```

Inspect: open a cited source and check a claim. A source column is a request for evidence, not evidence by itself. Do not require a fixed number of rows that encourages padding.

### 4. Compare choices instead of listing possibilities

Use when a decision has real tradeoffs.

```text
For [specific change], compare the existing approach with one plausible alternative.
Use these criteria: compatibility, failure behavior, and maintenance cost.
Return a small comparison table, your recommendation, and the evidence that
would change your recommendation. Mark assumptions. Do not edit files.
```

Inspect: are the criteria relevant, and is the recommendation grounded? Avoid fake precision such as invented numeric scores. This is a review lens, not a claim that a role label grants expertise.

### 5. Show the distinction with examples

Use when the output rule is easier to demonstrate than describe. This self-contained example has no repository prerequisite.

```text
Turn each run note into one line:
Check | Outcome | Evidence
Use passed, failed, or not run. Preserve observed facts; do not infer execution.

Input: “Ran the parser checks; the command exited 0.”
Output: Parser checks | passed | command exited 0

Input: “The browser check was skipped because no browser was available.”
Output: Browser check | not run | no browser available

Input: “Ran the import check; exit 1, expected 3 records but got 2.”
Output: Import check | failed | exit 1; expected 3 records, got 2

Now transform these notes:
[paste actual notes]
```

Inspect: try an ambiguous note as well as a clear success. If the note does not establish whether a check ran, the prompt needs an explicit unknown case rather than forcing a false classification. Show that refinement as a useful boundary discovery, not a promised failure.

### 6. Produce a piece another task can use

Use when an investigation should become a change brief.

```text
Turn the findings about [feature] into a short change brief with these headings:
Current behavior, Requested change, Behavior to preserve, Acceptance checks,
Open questions.

Link back to the source locations already inspected. Distinguish confirmed
facts from proposals and leave unresolved choices open. Do not implement it.
```

Inspect: could a teammate act on it without guessing the missing decisions? Reuse the brief only after checking it; a summary can propagate a false assumption into later work.

A separate optional note can show JSON when a program is the consumer. Do not make machine-readable output the climax of the lesson: the author's central point is wider than JSON.

## What to borrow from other courses

All recommendations here are adaptations, not copied course prose or exercises.

### DeepLearning.AI and OpenAI: develop a prompt through observed defects

The [Iterative lesson](https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/so7ui/iterative) develops a product description from a fact sheet. It adjusts length, audience, included identifiers, and eventually an HTML table. The transcript explicitly distinguishes a first attempt from a prompt evaluated across multiple cases.

**Borrow:** show a useful first request, inspect its actual output, then revise the part that matters. Its progression from prose to structured HTML is a concrete teaching demonstration of output flexibility.

**Limit:** this is a course demonstration, not a controlled study proving a productivity or accuracy improvement. Public transcript reviewed; no gated notebook or quiz was executed.

### Anthropic: teach one distinction at a time

The [official interactive tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) includes exercises, hints, answer keys, and playgrounds. Useful lesson patterns include separating data from instructions and showing contrasting input/output examples.

**Borrow:** make the learner notice one gap and inspect one correction. Use a few relevant examples rather than a catalog of prompting acronyms.

**Limit:** the reviewed notebooks use older Claude/API patterns. Do not import prefilling, particular XML conventions, or older reasoning instructions as timeless requirements.

### Google: make the output form and conflicting requirements visible

The official [prompt-design strategies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/prompt-design-strategies) discuss ambiguity, examples, context, and response format.

**Borrow:** use a short diagnostic question when an answer disappoints: was the task unclear, was evidence missing, did requirements conflict, or was the output wrong for its consumer?

**Limit:** vendor guidance, not independent effectiveness evidence. Google's public course preview was available, but the research did not inspect its gated hands-on labs.

### Microsoft: compare a draft and its revision

[Generative AI for Beginners, fundamentals](https://github.com/microsoft/generative-ai-for-beginners/blob/main/04-prompt-engineering-fundamentals/README.md) and [advanced prompting](https://github.com/microsoft/generative-ai-for-beginners/blob/main/05-advanced-prompts/README.md) use iterative and self-refinement activities.

**Borrow:** ask whether the revision is actually better under stated criteria.

**Do not borrow uncritically:** treating the model's critique as verification or allowing a small revision to expand into unrelated features. Our version requires observable evidence and preserves the original boundaries.

## Evidence and case studies worth linking

### The main-page shortlist

1. **A course demonstration: output shape changes with the task.** Use the DeepLearning.AI iterative lesson above. It is an accessible example of the progression the author describes, not proof that formatted prompts improve reasoning.
2. **A real engineering account: prompts as scoped work requests.** [How OpenAI uses Codex](https://openai.com/business/guides-and-resources/how-openai-uses-codex/) describes repository investigations, issue-like requests, iteration, and planning larger changes. Label it a vendor's internal account based on interviews and usage, not an independent causal study. Its product modes and research-preview language are historical; do not present them as OMP commands.
3. **An empirical counterweight: formatting has tradeoffs.** [Tam et al., EMNLP Industry 2024](https://aclanthology.org/2024.emnlp-industry.91/) studied format-constrained versus free-form generation and found reasoning degradation in several tested conditions. This does not show that Markdown tables are harmful or that modern structured-output APIs should be avoided. It rules out a blanket claim that stricter output is always better.

### Supporting research, mostly optional

| Source | Finding relevant to the lesson | Boundary on the claim |
| --- | --- | --- |
| [Sclar et al., ICLR 2024](https://arxiv.org/abs/2310.11324) | Meaning-preserving changes to input prompt formatting produced substantial performance variation in tested few-shot settings. Good formats did not transfer reliably between models. | Input separators and labels are not the same intervention as asking for an evidence table. Older models and benchmark tasks, not OMP repository work. |
| [Lu et al., ACL 2022](https://aclanthology.org/2022.acl-long.556/) | Reordering the same demonstrations could substantially change classification results, and strong orderings did not transfer reliably between models. | Historical GPT-family classification experiments. Teaches that examples and order are choices to check, not that learners must optimize permutations. |
| [Liu et al., DeeLIO 2022](https://aclanthology.org/2022.deelio-1.10/) | Retrieved relevant demonstrations outperformed random selection in the evaluated settings. | This compares selection methods, not long versus short prompts or modern agent productivity. |
| [Zhang and Choi, Findings of NAACL 2025](https://aclanthology.org/2025.findings-naacl.306/) | Clarification has an interaction cost; identifying requests likely to benefit from clarification matters. | QA, translation, and inference with benchmark clarification setups, not a controlled developer workflow comparison. |
| [CLAMBER, ACL 2024](https://aclanthology.org/2024.acl-long.578/) | Tested models struggled to identify ambiguity and ask useful clarification questions. | Older information-seeking benchmarks. Do not rely on the model to discover every missing requirement. |
| [What Prompts Don't Say](https://arxiv.org/html/2505.13360) | Explicit and implicit requirements interact; adding many requirements did not yield perfect adherence in the tested tasks. | Preprint with selected models/tasks and assisted validation. Not a universal optimal prompt length. |
| [Self-Refine, NeurIPS 2023](https://proceedings.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html) and [Huang et al., ICLR 2024](https://arxiv.org/abs/2310.01798) | Iterative self-feedback improved some evaluated tasks, while intrinsic self-correction without external feedback failed or harmed accuracy in other reasoning setups. | Different tasks and protocols. Neither “self-review always works” nor “self-review is useless” follows. It is another model output, not independent verification. |
| [JSONSchemaBench](https://arxiv.org/html/2501.10868v2) | Evaluates schema coverage, efficiency, and output quality separately; some constrained-decoding quality results are positive. | Framework/model-specific results. Together with Tam et al., supports task-dependent evaluation rather than a universal benefit or penalty. |

No headline percentage belongs in this lesson unless the task, comparator, model, and source date travel with it. No reviewed source establishes a universal best prompting style for current OMP models.

## Structure, correctness, and verification

[OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) distinguishes schema adherence from ordinary JSON prompting and explicitly notes that structured outputs can still contain mistakes. Refusals and incomplete responses need separate handling. [Google's structured-output documentation](https://ai.google.dev/gemini-api/docs/structured-output) likewise requires semantic validation.

Teach three separate checks:

1. Is the output in the requested shape?
2. Are its claims or values correct?
3. Was the evidence actually inspected or the stated check actually run?

This is a better foundation than adding a confidence percentage column. A model's confidence or citation is still a claim. For machine consumers, validate the structure and values. For human consumers, use the smallest useful format.

A two-stage answer-then-format workflow is an option when strict machine output gets in the way. It is not another required prompting ceremony and introduces an additional conversion step that can lose information.

## OMP tidbits to include without duplicating other lessons

The research checked current upstream documentation/source, not the workshop's installed runtime. Before publishing exact shortcuts, confirm them with `/hotkeys` on that build.

- **Compose a multiline prompt:** current defaults include `Shift+Enter` or `Ctrl+J` for a newline; `Ctrl+G` opens the draft in the configured external editor. Link to [keybindings](https://github.com/can1357/oh-my-pi/blob/main/docs/keybindings.md) and the existing [keyboard lesson](../sections/working-with-omp/keyboard-and-steering.md). Keep this to one practical tip.
- **Point to or attach evidence deliberately:** interactive `@` completion and CLI `omp @requirements.md "Draft a small implementation plan"` are documented affordances. Do not confuse CLI attachments, file references, and `@` imports inside context files. [CLI reference](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md).
- **Save a repeated request as a Markdown command:** use one mechanism, not parallel tutorials for commands, prompt templates, and skills. Current native commands can live in `<cwd>/.omp/commands/*.md` and use `$ARGUMENTS`. They are text expansion, not enforcement. Commands are discovered during startup and explicit refresh flows, not continuously watched. [Slash-command reference](https://github.com/can1357/oh-my-pi/blob/main/docs/slash-command-internals.md).

Optional example file `.omp/commands/change-brief.md`:

```markdown
---
description: Build an evidence-backed change brief
---
Inspect the code relevant to this request: $ARGUMENTS
Do not edit files.
Return: Current behavior, Requested change, Behavior to preserve,
Acceptance checks, Open questions.
Cite inspected sources and mark unknowns. Do not invent execution results.
```

Invoke `/change-brief [specific request]` after discovery. Check that the chosen name is not already reserved or shadowed. This is a proposed example, not an installed command. The final lesson can keep the idea without requiring learners to create a file.

Do not teach plan-mode flags, provider settings, raw slash-command precedence, approval configuration, or skill packaging here. A request such as “do not edit” communicates scope but is not technical containment; link to [Tools and permissions](../sections/foundations/tools-and-permissions.md).

## One bounded exercise

Use a familiar repository and one small function, feature, or endpoint the learner can verify. No new fixture or provider API project is required.

1. Ask for a plain-language explanation of the chosen behavior, with source references and no file changes.
2. Identify one thing that is missing or difficult to use. It may be an unsupported claim, a hidden assumption, or simply an unsuitable output shape. Do not promise the first response will fail.
3. Ask for an evidence table or change brief using one of the examples above. Preserve the established facts and mark unknowns.
4. Open a referenced source. Check one factual claim and one claimed boundary or failure case against the code or existing checks. Reading a test is not running it.
5. Decide whether the structured version is more useful for the next task. If it only adds bulk, keep the simpler version. Save a reusable pattern only if the same need recurs.

This is a local learning observation, not an A/B experiment proving a causal effect: the second turn has additional history and instructions. A serious comparison would control task, evidence, model, and settings and use multiple representative cases.

For a recurring template, propose a small separate check with a normal case, a likely failure, and an ambiguous or out-of-scope case. This is a workshop heuristic, not a research-proven magic number. [Anthropic evaluation guidance](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) supports explicit criteria and realistic cases without requiring an eval service.

## Editorial boundaries and completion criteria

Keep: the author's perspective, flexible styles, output composition, contrasting examples, selective clarification, evidence-based revision, a small reuse tip, and one exercise.

Drop: mandatory health-checker setup, prompt acronyms, persona-as-expertise claims, magical phrases, exhaustive checklists, forced private reasoning requests, universal JSON, and promises that better wording fixes missing tools or evidence. Avoid importing model-version-specific advice into permanent prose.

The page is ready when a learner can choose an appropriate interaction style and output shape, write or refine a bounded request, inspect a real source, distinguish a well-formatted answer from a correct one, and decide whether a pattern deserves reuse.

Research-only deliverable: the published prompting page has not been changed. No proposed prompt was executed against a model, no course lab was run, and no performance improvement is claimed. Exact OMP affordances remain subject to installed-version verification before lesson publication.
