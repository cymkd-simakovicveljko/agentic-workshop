# Context quality and long-running agents

Research checked on 9 October 2026. This note investigates context quality, how full a context window should get, and how long-running agents handle accumulating history. A concise adaptation is now published in [2.2 Context](../sections/foundations/context.md), alongside the practical session-command guide. Detailed evidence and limitations stay here.

## Recommendation

Teach **context capacity, useful information, and task performance as different things**. A larger window lets the model receive more material; it does not guarantee that it will use all of it reliably. Relevant additional evidence can improve results. Extra history, distractors, and even increased input length under controlled conditions can make results worse. Neither “more is better” nor “less is always better” survives the evidence below.

For the workshop: **give the agent enough current evidence to do the job, keep unrelated history out, and leave room for the next response and tool results.** Do not invent a universal “stay below 50%” or “compact at 80%” rule. The reviewed sources do not establish one.

A long-running agent need not carry its entire history in every request. It can work across bounded context windows, preserving useful state through files, summaries, selected recent history, and retrieval. This is continuity management, not unlimited memory. Compaction and fresh starts can lose important details too.

These are our practical recommendations, informed by the measured findings and vendor guidance distinguished below—not a benchmark result for this workshop's OMP setup.

## Course coverage before this addition

| Location | Existing coverage | Missing piece |
| --- | --- | --- |
| [2.1 Models and roles](../sections/foundations/models.md#pick-the-model-for-the-job) | Missing context needs fixing; a bigger model cannot recover facts it never received. | Capability versus the conditions under which we use that capability. |
| [2.2 Context](../sections/foundations/context.md) | What reaches the model, selecting decision-relevant material, memory distinctions, and practical session commands. | Capacity versus reliable use; how much to load; why lengthy agent work does not require an ever-growing active prompt. |
| [2.3 Prompting — Do not rely on “we already discussed this”](../sections/foundations/prompting.md#do-not-rely-on-we-already-discussed-this) | Constraints can get missed or disappear during context maintenance; reread the current result and restate consequential boundaries. | A direct explanation of length and task-quality tradeoffs. |
| [2.3 Prompting — optional research](../sections/foundations/prompting.md) | Cites Lost in the Middle for positional effects on retrieval and question answering. | The evidence is tucked away rather than connected to a context-management habit. |
| [2.5 Sessions and memory](../sections/foundations/sessions.md#context-is-not-persisted-history) | Transcript versus active context; compaction can lose details; saved history does not prove current workspace state. | The long-running workflow that uses those distinctions deliberately. |

Put the conceptual explanation in **2.2 Context**, before “Manage what stays in context.” Keep command mechanics in **2.5 Sessions and memory**. Do not duplicate a paper survey across both pages.

## What measured research supports

| Primary source | What it found | What we can teach—and the limit |
| --- | --- | --- |
| [Liu et al., Lost in the Middle, 2023/2024](https://arxiv.org/html/2307.03172) | In multi-document QA and key-value retrieval, performance often depended strongly on where relevant information appeared; middle positions could perform worse than beginning/end positions. Adding retrieved documents did not translate proportionally into better answers. | Being inside the window does not guarantee reliable use. These were particular tasks and mostly 2023 models, not a permanent curve for every current coding model. |
| [Hsieh et al., RULER, 2024](https://arxiv.org/html/2404.06654) | Thirteen synthetic tasks tested retrieval, tracing, aggregation, and QA. Models that did well on simple needle retrieval could degrade on more complex tasks as length increased. | Advertised capacity is not demonstrated effective length. The paper's effective-length cutoff is a benchmark convention, not a universal safety threshold. |
| [Hong et al., Chroma Context Rot, 2025](https://www.trychroma.com/research/context-rot) | This original vendor technical report evaluated 18 models, varying input length, semantic matching, distractors, and haystack structure, plus conversational-memory and repetition tasks. It found nonuniform performance and degradation with longer inputs in its evaluations. | Context rot is a useful label for a performance risk, not a measurement of lost intelligence. Much of the evaluation is deliberately synthetic; focused versus full-history comparisons also change retrieval difficulty. |
| [Du et al., Context Length Alone Hurts LLM Performance Despite Perfect Retrieval, 2025](https://arxiv.org/html/2510.05381) | Controlled math, QA, and coding tasks showed that extracting the relevant evidence and solving with it are different capabilities. Performance could decline with longer inputs even with accurate extraction, whitespace padding, or masked distractors. Results differed substantially across models and tasks, including stable or improved conditions. | Avoid explaining every long-context failure as simply “the model could not find the fact.” This is a controlled preprint study, not a universal degradation rate for production agent sessions. |
| [Agarwal et al., Many-Shot In-Context Learning, 2024](https://arxiv.org/html/2404.11018) | Relevant demonstrations improved Gemini 1.5 Pro performance on several tasks as example counts grew; other task/configuration curves peaked and then declined. | More useful context can help. Minimizing token count is not the goal if it removes necessary evidence or helpful examples. This is one model family and selected task/example designs, not accumulated arbitrary chat. |
| [Fan et al., An Empirical Study of Harness Design for Coding Agents, 2026](https://arxiv.org/html/2609.20804) | Across four models, SWE-Bench Verified and Terminal-Bench 2.1, and 32K–128K budgets, context management helped most when the budget was tight. The authors attributed most benefit to preventing overflow and premature termination. Staged tool-output elision followed by summarization was efficient in their harness. | Long-run reliability also involves staying operational, not just retrieval quality. This is a recent preprint with one harness and four models. Its 60%/85% maintenance thresholds were experimental implementation choices, not established optimal occupancy limits. |

The coding-agent study is especially useful for separating two claims: **management can prevent a run from exhausting its window**, while **the model can still make reasoning errors within a legal window**. Solving one does not prove the other solved.

### “Intelligence” is too broad for the claim

These studies measure retrieval accuracy, task accuracy, successful code changes, and related outcomes. They do not establish a law that a model loses a fixed percentage of general intelligence as a context meter fills up.

The learner-facing version is simpler: **the same model can do better or worse work depending on the context we give it.** Missing facts, buried constraints, irrelevant material, and difficult long-range reasoning are different problems. Turning up model size or reasoning effort is not a substitute for supplying the right evidence.

## How much should we fill the window?

**Our recommendation: use what the task needs, not what the window can hold.**

1. Start with the goal, consequential constraints, and what would count as success. Point to the relevant files or evidence; let the agent inspect them.
2. Add material that resolves a concrete uncertainty. Do not preload the repository, every log, and the entire earlier discussion just because they fit.
3. Preserve exact content when exactness matters: error text, API contracts, an important sequence of events, and acceptance criteria. A shorter but incomplete summary can be worse than longer source material.
4. Inspect context use when a session becomes long or tool-heavy. In current OMP, `/context` reports an estimated usage breakdown. It is a budget diagnostic, not a measurement of the model's understanding. [OMP implementation](https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/coding-agent/src/slash-commands/helpers/context-report.ts)
5. Leave room for continuation. New tool results and output need space; reasoning-token accounting is model/provider-specific. OpenAI explicitly documents that reasoning tokens consume context and output budget. Its suggested starting reserve is provider guidance, not a number to prescribe to every OMP learner. [OpenAI reasoning guide](https://developers.openai.com/api/docs/guides/reasoning)
6. Review what should carry forward at a meaningful task boundary. Keep a useful conversation, compact long but relevant history, or start a new one for unrelated work. Do not reset solely because a timer elapsed or an arbitrary percentage was reached.

A nearly full window can be mechanically risky without a known quality cliff. Conversely, a mostly empty window can contain entirely the wrong information. Occupancy alone does not answer whether the agent has what it needs.

If a team wants a numerical operating threshold, compare representative tasks on its actual model and harness at several context lengths. Track correctness, corrections, constraint retention, overflow, latency, and cost. Any resulting threshold is a local policy, not a model-independent fact. This comparison was not performed for this note.

## How long-running agents handle accruing context

### Long runtime is not one infinitely growing request

A useful distinction:

- **Active context:** what is supplied for the current model request.
- **Transcript:** the conversation and tool history the harness stores.
- **Artifacts and workspace:** code, outputs, decisions, and progress records that can survive a session.

The transcript and workspace can accumulate while the active input is rebuilt from a selected subset. Stored information helps only when the next request actually reads, retrieves, or receives it.

[Anthropic's context-engineering guidance](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) recommends just-in-time retrieval, compact tool results, compaction, structured notes, and bounded subagents. Its stated aim is a small set of high-signal tokens, not filling every available slot. This is vendor engineering guidance, not an independently measured optimal token budget.

[Anthropic's long-running harness report](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) describes work across fresh sessions using explicit progress records, an actionable feature list, incremental changes, and verification. It explicitly identifies compaction alone as insufficient in its experiments. The evidence is a vendor's particular coding setup, not proof that every task should restart its session regularly.

[OpenAI's GPT-5.1-Codex-Max report](https://openai.com/index/gpt-5-1-codex-max/) likewise describes operation across multiple context windows through compaction. Its reported long runtimes are product-specific internal results. “Millions of tokens over a run” does not mean “millions of tokens simultaneously in active context.”

### Our recommended continuity pattern

For a long job, keep the next step recoverable:

1. Work on one bounded piece and verify it.
2. At a useful handoff or phase boundary, record the current goal, decisions and reasons, changed files, checks actually run and their results, unresolved questions, and the next action. Reuse existing task notes rather than generate a new memory system.
3. Keep bulky logs and source material in files; retrieve the relevant parts when needed. Keep enough provenance to find the originals.
4. Continue with recent useful context plus a summary, or start a fresh context that reads the handoff and relevant current files.
5. Recheck the current workspace. “Tests passed” in a note is a historical claim, not proof about files edited afterward.

Use a subagent for genuinely separate work, with a bounded assignment and a useful result returned to the main conversation. Delegation does not help if every worker's full transcript is copied back, or if the split removes dependencies the worker needs. These are workflow recommendations, not universal benchmark conclusions.

### What can go wrong with context management itself?

- A summary can omit a subtle constraint, turn a hypothesis into an apparent fact, or lose why an approach failed.
- Repeated fresh starts can discard useful reasoning and force the same investigation again.
- External storage preserves bytes, but does not guarantee that the agent will know what to retrieve.
- A long debugging sequence may be relevant evidence rather than clutter. Keep it when the causal order matters.
- Missed constraints or repeated mistakes justify inspecting context; they do not prove context length caused the failure.

Compaction is a tradeoff, not a repair for every bad answer. Anthropic's context-engineering article warns about losing critical information through aggressive compression. The coding-agent harness study also found that adding a recall mechanism did not automatically improve results: models rarely used it in that setup.

## OMP-specific boundaries

Current [OMP compaction documentation](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/compaction.md) separates the visible transcript from rebuilt model context and describes multiple maintenance methods. Do not teach that every `/compact` invocation always creates the same kind of readable summary.

Automatic maintenance thresholds reserve space and trigger implementation behavior; they are not evidence of where model intelligence drops. Current OMP threshold logic and settings are inspectable in [agent compaction](https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/agent/src/compaction/compaction.ts) and [context settings](https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/coding-agent/src/session/context-settings.ts). The course should teach the purpose and the diagnostic before exposing settings or defaults that can change.

Provider-native compacted state is not necessarily a portable summary. For example, the [OpenAI compaction API](https://developers.openai.com/api/docs/guides/compaction) documents opaque compaction items and specific continuation requirements. Keep that API detail out of the beginner lesson; it matters to harness implementers.

## Draft wording used for the lesson adaptation

### More context does not automatically mean better answers

A bigger context window means the model can receive more information. It does not mean it will use every part equally well. The same model can miss a constraint buried in a long conversation that it follows in a focused request.

But less context is not automatically better either. If we leave out the failing command, the relevant code, or an important requirement, we are asking it to guess. Our job is to give it enough current information to do the work without carrying every unrelated detail along.

### How full should we let it get?

Don't treat the context window as a target to fill. Start with what the task needs, then add information as the investigation needs it. Use `/context` to see what's taking up space, and leave room for the next response and tool results.

There isn't a reliable rule that every model works well below 50% and badly above it. The model, the task, and what's in the context all matter. A useful question is: **does this material still help with the next decision?** Keep the source detail you need; compact or leave behind history you no longer need.

### What about agents that run for hours?

A long run does not have to be one endlessly growing conversation. The agent can keep working across context windows, using current files, progress notes, and summaries to continue.

Before a handoff, keep the goal, important decisions, checks and their results, unresolved questions, and next action somewhere the next session can read. Then have it check those notes against the current files. A summary helps it resume; it does not prove that the old conclusions are still right.

The published lesson uses a shorter adaptation of these paragraphs. Detailed research stays here so it does not interrupt the practical guidance.

## Verification and limits

Primary papers, vendor engineering material, API documentation, and current OMP source were inspected. Source-specific methods and limitations are recorded above. No model comparison, long-duration agent experiment, or provider-backed OMP command run was performed for this research. The published Context additions were checked in the HTML reader, including the supporting research link. That rendering check does not validate model behavior.
