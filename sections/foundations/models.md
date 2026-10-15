# 2.1 Models and roles

Choose a model by capability, speed, cost, and where it runs.

## Pick the model for the job

Think in three workload buckets—not three permanent classes of model:

| Workload | Examples | What matters most |
| --- | --- | --- |
| **Frontier / difficult reasoning** | Untangling a subtle bug, comparing architectural options, reviewing a risky change. | Getting the reasoning right, even if the run takes longer or costs more. |
| **Everyday workhorse** | Implementing a bounded feature, reading unfamiliar code, writing a useful first draft. | Reliable results at a cost and pace we can use all day. |
| **Lightweight work** | Extracting fields, classifying requests, summarizing a short document, producing a commit message. | Low latency and low cost, with enough capability for the narrow task. |

The useful triangle is **capability, cost, and speed**. 

- A stronger model may spend more time reasoning. 
- A small model may answer quickly but need several attempts. 
- A newer release can improve all three, so this is a comparison tool—not a law that says we can only have two.

<figure class="course-diagram">
<a href="/diagrams/model-tradeoffs.webp"><img src="/diagrams/model-tradeoffs.webp" width="894" height="610" alt="Speed, cost, and quality form a triangle. Its edges are labelled substandard, expensive, and slow. A purple arrow asks ‘Why not here?’ and points to a spot inside the triangle." /></a>
<figcaption>Can we get enough quality, quickly, at a cost worth paying? The purple dot is a discussion prompt, not a measured model ranking; the answer depends on the task.</figcaption>
</figure>

Don’t assume pricier means better. A cheaper model thinking harder can match a pricier one thinking less. Compare them on the same task and context, and pay for results, not the model’s reputation.

<aside class="judgment-callout">
<p class="judgment-kicker">Find the right level</p>
<ol>
<li><strong>Start in the middle.</strong> Pick a workhorse model at medium effort.</li>
<li><strong>Check the work.</strong> Is it correct, do the relevant tests pass, and does it actually resolve the task? A confident explanation is not enough.</li>
<li><strong>Try spending less.</strong> If it works well, compare low effort, then a lighter model. Change one thing at a time.</li>
<li><strong>Turn it up when needed.</strong> If the results fall short, try higher effort first, then a frontier model. Missing context still needs fixing; a bigger model cannot recover facts it never received.</li>
<li><strong>Compare fairly.</strong> Give cheaper and more expensive models the same prompt, starting context, and tool access. Compare correctness, corrections needed, time, and total cost—not just how polished the answer sounds. Repeat close calls before settling on a default.</li>
</ol>
</aside>

## Use benchmarks to inform yourself

Take YouTube, Reddit, and benchmarks with a grain of salt. Look across sources such as [Artificial Analysis](https://artificialanalysis.ai/leaderboards/models) and [LiveBench](https://livebench.ai/), and patterns start to emerge: which models are capable, fast, or good value. But there are too many moving parts for a ranking to tell you what will work best for you. Use it to get informed, then test the models on your own work. That’s the comparison that matters.

### A dated comparison

The following is a **selected snapshot retrieved on 29 September 2026**, not a permanent top-five ranking. These are rows from the Artificial Analysis model leaderboard, with its reasoning filter set to **All** and status set to **Current**. Preserve the effort labels when comparing them.

| Model and evaluated setting | AA Intelligence Index | Cost per AA task, USD | Median output tokens/s |
| --- | ---: | ---: | ---: |
| Claude Opus 5.5 — max with fallback | 58 | $5.98 | 93 |
| GPT-6 Astra — max | 53 | $3.26 | 59 |
| MiMo-V2.6-Pro | 46 | $0.13 | 41 |
| GLM-5.3 — max | 45 | $2.01 | 87 |
| Qwen3.8 Max — 0902 | 45 | $5.41 | 38 |

Source: [Artificial Analysis leaderboard](https://artificialanalysis.ai/leaderboards/models) and [Intelligence Index methodology, v4.3.2](https://artificialanalysis.ai/methodology/intelligence-benchmarking). The page is live; the retrieval date above identifies this snapshot.

<aside class="judgment-callout">
<p class="judgment-kicker">Don’t shop by the top score</p>
<p><strong>Similar scores can come with very different bills and waiting times.</strong> MiMo and GLM are good reminders not to dismiss open-weight models.</p>
<ul>
<li><strong>Score:</strong> a weighted mix of benchmark results, not an intelligence percentage.</li>
<li><strong>Cost:</strong> the average AA task, not the price of fixing your bug.</li>
<li><strong>Speed:</strong> output once it starts, not the whole wait for reasoning and tools.</li>
</ul>
<p>These are hosted API results, not laptop speeds. And familiar benchmark questions can end up in training data, flattering the scores. Fresh tests help, but <strong>your own work is still the deciding test.</strong></p>
</aside>

<div class="setup-platforms">
<details>
<summary><strong>Read more: model labs, open weights, and local inference</strong><span>Optional background on the model landscape and what it takes to run models yourself.</span></summary>

### Know the labs and what “open” means

For hosted proprietary models, the familiar families include [OpenAI's GPT models](https://platform.openai.com/docs/models), [Anthropic's Claude models](https://www.anthropic.com/claude), and [Google's Gemini models](https://deepmind.google/models/gemini/). Names such as Opus, Sonnet, Haiku, Pro, Flash, and mini suggest different product positions, but they are not a universal grading system across labs.

There is also a substantial open-weight ecosystem. Chinese labs such as [Qwen](https://qwen.ai/), [Z.ai](https://z.ai/), and [Moonshot](https://www.moonshot.ai/) are part of it; so are [OpenAI](https://openai.com/index/introducing-gpt-oss/), [Google](https://ai.google.dev/gemma), and European labs such as [Mistral](https://mistral.ai/). The exact release matters more than the lab's nationality or a family-level label.

| Lab / family | Concrete open-weight example | Useful distinction |
| --- | --- | --- |
| **Alibaba / Qwen** | [Qwen3.6-27B](https://huggingface.co/Qwen/Qwen3.6-27B) | A real 27B dense multimodal checkpoint, under Apache 2.0. Not every Qwen-branded hosted model has downloadable weights. |
| **Z.ai / GLM** | [GLM-4.5](https://huggingface.co/zai-org/GLM-4.5) | MIT-licensed weights; the large model is server-scale, not automatically laptop-friendly. |
| **Moonshot AI / Kimi** | [Kimi K2](https://huggingface.co/moonshotai/Kimi-K2-Instruct) | A large mixture-of-experts model. Its modified MIT license has an additional attribution condition. |
| **OpenAI / gpt-oss** | [gpt-oss-20b and 120b](https://openai.com/index/introducing-gpt-oss/) | Open-weight models under Apache 2.0; separate from the proprietary GPT models served through the API. |
| **Google / Gemma** | [Gemma 4](https://ai.google.dev/gemma/docs/core) | Downloadable models from mobile-oriented sizes upward. **Gemma is not Gemini Flash**, which is a hosted Gemini API model. |
| **Mistral AI** | [Mistral Small 3.1](https://mistral.ai/news/mistral-small-3-1/) | A European lab's 24B open-weight model, with Base and Instruct versions under Apache 2.0. |

These are examples, not a claim that each is its lab's newest release. **Open weights means access to the model parameters.** It does not automatically mean unrestricted licensing, public training data, reproducible training, or a model that fits on our hardware. Check the exact checkpoint and license, not just the family name.

Open models can be competitive on particular tasks. There is no dependable “always two months behind” rule: the gap changes by task, model size, release, and evaluation.

#### Hugging Face: a hub, not one model

Think of [Hugging Face Hub](https://huggingface.co/docs/hub/models-the-hub) as a repository hub for models and related artifacts. A search result may be:

- **An original/base checkpoint** from the lab, before instruction-oriented post-training.
- **An instruction-tuned model or a fine-tune**, adapted for conversation or a particular domain. It may be a complete checkpoint or an adapter that needs the base model.
- **A quantized version**, storing weights at lower precision to reduce memory requirements. It may come from the lab or a community publisher.

A quantized copy is not automatically a new, smarter model; a fine-tune is not automatically better at every task. Read the [model card](https://huggingface.co/docs/hub/model-cards): publisher, base model, license, intended use, format, and supported runtime. Being hosted on Hugging Face is not itself a quality or licensing guarantee.

### What local inference actually needs

**32 GB of VRAM is not a universal minimum.** Memory depends on parameter count, precision, architecture, context length, concurrency, and the runtime. System RAM, dedicated GPU VRAM, and a Mac's shared memory are also different budgets.

A rough weight-only estimate is:

```text
weight memory ≈ parameter count × bits per parameter ÷ 8

32 billion parameters at 16 bits ≈ 64 GB
32 billion parameters at  4 bits ≈ 16 GB
```

Those are decimal-GB arithmetic estimates, not runnable memory requirements. Quantization metadata, runtime workspaces, and the **KV cache** need room too. The KV cache holds attention state for the sequence; longer contexts and more simultaneous requests increase its memory use. Quantizing weights does not automatically quantize that cache.

Concrete reference points:

- OpenAI documents **gpt-oss-20b at about 16 GB of memory** with its supported quantized setup. That is not a guarantee for every backend, context length, or batch size.
- Google's [Gemma 4 memory table](https://ai.google.dev/gemma/docs/core) lists **E2B at 2.9 GB and E4B at 4.5 GB** for Q4_0 GPU/TPU loading. Those estimates include loading overhead but exclude KV cache and other software memory.
- Mistral says Small 3.1 can run on an RTX 4090 or a Mac with **32 GB RAM**. That is a deployment example, not a blanket 32 GB VRAM requirement.

Be especially careful with **mixture-of-experts (MoE)** models. Kimi K2 has roughly **1 trillion total parameters but 32 billion active per token**. The active count describes computation; it does not make the other weights disappear. A low active-parameter number can still mean a very large deployment.

Small models already make sense on phones, particularly for narrow tasks such as speech transcription. [Moonshine](https://github.com/moonshine-ai/moonshine) provides on-device speech tooling for iOS and Android, and Gemma includes mobile-oriented models. That does not mean every model runs well on every phone: language, noise, latency, battery use, and runtime support still need checking. A dedicated speech model can be a better fit than a general-purpose LLM.

Local inference buys control and can avoid sending prompts to a remote inference provider. It does not make compute free: hardware, electricity, setup, and maintenance still count. Start hosted unless local execution solves a real need—privacy, offline use, predictable volume, or experimentation.

</details>
</div>

## Pay for completed work, not the cheapest token

**Compare the cost of completing the task, not the price per token.** Models use different numbers of tokens to get the same job done, so a model with pricier tokens can still cost less overall.

## Understand prompt caching

In an agent session, the next request often repeats a large prefix: instructions, tool definitions, and earlier conversation, followed by new material. **Prompt caching reuses computation for that unchanged prefix.** It does not retrieve a saved final answer; the model still generates a new response.

```text
First call:  [instructions + tools + earlier conversation] + question A
Next call:   [same exact prefix] + new conversation and question B
              potentially reusable                       newly processed
```

Being in the same session does not guarantee a cache hit. The prefix must match, the model must support caching, the entry must still be available, and minimum-length rules apply. Changing instructions or tool definitions near the start can invalidate reuse farther down the prompt.

### Caching rules vary by provider

OpenAI handles caching automatically on supported models. Anthropic lets the API client request it through `cache_control`. Prices and expiry times vary by model, so check the [OpenAI](https://developers.openai.com/api/docs/guides/prompt-caching) or [Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) docs for the exact rules.

**Keep repeated instructions and tool definitions stable, and put new information afterward.** Reusing that context can save money, but some models charge extra to create the cache, so it only pays off if you reuse it. Check actual cache usage rather than assuming it worked, and don’t keep outdated context just for the discount.

## Don’t judge a model on one answer

The same model can nail a task today and struggle tomorrow. Context, settings, updates, and randomness all play a part, so one bad answer does not mean the provider made it less capable.

**Repeat a few real tasks with the same setup before changing your default.** Note the model version and effort, then compare correctness, time, and cost. Look for a pattern, not one brilliant or terrible result.

For examples, see [DailyBench’s repeat-testing approach](https://github.com/jacobphillips99/daily-bench) and [LiveBench’s regularly refreshed benchmarks](https://livebench.ai/).

## Put those choices into OMP roles

A role is a **routing assignment**, not a persona. It tells OMP which model to use when a particular workload runs.
Model routing isn’t unique to OMP. Other harnesses expose it through per-agent settings or dedicated planning, editing, and lightweight models. OMP makes these assignments explicit through named model roles.

| Control | What it changes | What it does not do |
| --- | --- | --- |
| **Model** | The model used for inference. | Grant tool permissions or prove the answer correct. |
| **Provider** | The backend/account serving it, with its pricing and limits. | Guarantee identical speed across endpoints. |
| **Model role** | Which model selector a workload uses. | Make several models collaborate merely by assigning them. |
| **Persona / instructions** | Requested behavior, priorities, voice, and format. | Switch to a stronger model or execute a command. |

Useful starting assignments:

| Role | Job | Sensible starting choice |
| --- | --- | --- |
| `default` | Main conversation and everyday coding. | A capable workhorse. |
| `smol` | Lightweight background work. | A fast, cheaper model that can handle the actual task. |
| `slow` | Difficult reasoning. | A stronger model when the extra wait and cost are worthwhile. |
| `plan` | Planning workloads. | Often the same model as `slow`; assigning it does not enter plan mode. |
| `task` | Delegated work, subject to agent-specific settings. | Match the delegated task; not every subagent should be cheap. |
| `advisor` | Alongside-the-main-agent review when enabled. | A capable reviewer, optionally a different model. |

Configure them when those workloads matter.

A practical split might be: **strong model to reason through a tricky change, workhorse to implement it, small model to summarize the result**. An advisor can provide another review, but it adds cost and can share the same blind spots. This improves the allocation of work; it does not literally add the models' intelligence together.

Open `/model` to inspect available choices.

<figure class="course-diagram">
<a href="/diagrams/omp-model-picker.webp"><img src="/diagrams/omp-model-picker.webp" width="1568" height="923" alt="OMP model picker showing provider filters on the left, model kinds across the top, and available models with context limits, pricing, and performance metadata." /></a>
<figcaption>Browse by provider or model kind, then inspect the model details. This is one configured setup; your available models and displayed figures may differ. <a href="/diagrams/omp-model-picker.webp">Open the screenshot at full size.</a></figcaption>
</figure>

Role selectors live under `modelRoles` in `config.yml`; provider definitions and model metadata live in `models.yml`. After choosing a concrete model for `slow`, a role alias can reuse it:

```yaml
modelRoles:
  plan: "@slow"
```

For the full setup, see [OMP’s model and role documentation](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/models.md).

## Try it: can a cheaper model do the same job?

Open 2–4 tabs or terminals, and in all of them:

- open a repository you already know. Think of a class, module or a feature. Choose something you can verify yourself without tracing half the codebase.

Use this prompt, replacing the function name and file path:

> Inspect `[function name]` in `[file path]`. Use the available tools to read its dependencies and existing tests as needed. Explain its inputs, outputs, branches, and error cases, then suggest three tests with concrete inputs and expected results. Base your answer on the code and point to the relevant files. If something is unclear, say so rather than guessing. Do not change any files.

1. **In the first instance: Run it with your workhorse at medium effort**, if supported. Start a fresh session in the repository. Note the model, provider, and effort setting, and keep the answer.
2. **In each additional instance, repeat with a cheaper or different model in another fresh session.** Use exactly the same prompt, repository state, instructions, and available tools. Do not include the first model’s answer. Note this model’s settings too.
3. **Check both answers against the code.** Did they explain every branch correctly? Are all three expected test results right? Did either invent behavior or miss an error case? Count an answer as correct only when these checks pass.
4. **Compare total cost and completion time**, including any follow-up needed to correct the answer. Record those corrections too. Different tool choices are part of the comparison, so count the whole run, not just the final response. If your provider does not expose cost, mark it as unavailable rather than guessing.

**Make a choice:** would you trust the cheaper model with this kind of explanation again? Write down your choice and one reason based on the results. One task is a starting point, not proof that either model wins at everything.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Choose a model by measured task quality, latency, and cost.</span></summary>

- [Model selection](https://developers.openai.com/api/docs/guides/model-selection) — OpenAI API documentation. Compare models with the same inputs and keep the lightest setting that meets your quality bar, while accounting for workflow frequency and response time.
- [A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) — OpenAI. Establish a quality baseline with a capable model, then test smaller models against evals before trading quality for lower cost or latency.

</details>
<details>
<summary><strong>Optional watch: Balancing accuracy, latency, and cost at scale</strong><span>See why an operational tradeoff beats shopping by one leaderboard number.</span></summary>

<a data-youtube-embed href="https://www.youtube.com/watch?v=Bx6sUDRMx-8"><strong>OpenAI DevDay 2024 | Balancing accuracy, latency, and cost at scale</strong></a> — OpenAI.

The model names and prices are historical; focus on how to measure the tradeoffs, not which 2024 model to choose.

</details>
</div>
