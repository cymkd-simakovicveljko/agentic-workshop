# Evaluation claims: evidence and limits

This note supports the [Evals lesson](../sections/foundations/evals.md). The starting point was a user-supplied transcript of an evals workshop. No original video URL or verified speaker attribution was supplied. We checked the transcript's claims and our proposed corrections, rather than treating either as authoritative.

Three independent research passes covered evaluator calibration, judge bias, and evaluation scope/security. Sources were inspected, not experimentally replicated. Publication status matters: research papers, vendor guidance, reported incidents, and logical deductions are distinguished below. Findings about older models are not measurements of today's OMP setup.

## 1. Does fixed skill text remove the need for evaluation?

**Claim:** skills do not need evals because their instructions are deterministic and the harness provider has already evaluated them.

**Verdict: the conclusion does not follow.** A fixed file is an input, not a guarantee about the model's interpretation, skill selection, tool choices, or resulting work. Even a repeatable output can be consistently wrong.

[Austin et al., *Program Synthesis with Large Language Models* (2021, arXiv preprint)](https://arxiv.org/abs/2108.07732), §4.3 and Table 1, study the effect of prompt examples on generated programs graded by execution. They report that “few-shot performance is quite sensitive to the particular examples given in the prompt.” This is evidence that instruction context can change measured performance. It is not a direct evaluation of modern `SKILL.md` packages or a universal estimate of their benefit.

**Our recommendation:** compare the custom procedure with a baseline on representative tasks. Test skill selection separately from behavior after loading. This is an engineering inference from the dependence on instructions and context, supported by [Anthropic's first-party skill evaluation guidance](https://claude.com/resources/articles/improving-skill-creator-test-measure-and-refine-agent-skills). It does not imply that every preference needs a large eval framework.

## 2. Can deterministic tests evaluate an agent?

**Claim:** evals are necessarily fuzzy because ordinary tests cannot grade nondeterministic systems.

**Verdict: contradicted by executable benchmarks.** Generation may vary while the success condition remains mechanically checkable.

- [Chen et al., *Evaluating Large Language Models Trained on Code* (2021, arXiv preprint)](https://arxiv.org/abs/2107.03374), §§1–2.3: HumanEval evaluates generated programs through unit tests. The [official harness](https://github.com/openai/human-eval) also warns that executing generated code requires a robust sandbox.
- [Jimenez et al., *SWE-bench: Can Language Models Resolve Real-World GitHub Issues?* (ICLR 2024, peer-reviewed conference paper)](https://proceedings.iclr.cc/paper_files/paper/2024/hash/edac78c3e300629acfe6cbe9ca88fb84-Abstract-Conference.html), §2.2: model-generated repository patches are applied and graded using unit/system tests.
- [Liu et al., *AgentBench: Evaluating LLMs as Agents* (ICLR 2024, peer-reviewed conference paper)](https://proceedings.iclr.cc/paper_files/paper/2024/file/e9df36b21ff4ee211a8b71ee8b7e9f57-Paper-Conference.pdf), §§3.1 and 4.1: interactive environments use outcome metrics such as success rate, reward, and action validity.

**Limit:** passing executable checks establishes the checked behavior, not every requirement, maintainability property, or security property. We recommend checking outcomes before prescribing an exact tool-call sequence; a different valid route should not fail merely because it differs from the author's trace.

## 3. Is 80–85% agreement a universal target?

**Claims:** a judge becomes production-ready at 80–85% human agreement; humans normally agree about 80% of the time.

**Verdict: a benchmark result was generalized too far.**

[Zheng et al., *Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena* (NeurIPS 2023, peer-reviewed conference paper)](https://arxiv.org/abs/2306.05685), §4 and Table 5, report 85% GPT-4–human agreement and 81% human–human agreement under their S2 setup, which excludes ties and inconsistent votes. Their all-vote setup gives different results. These are chatbot-preference experiments with specific questions, models, annotators, and aggregation rules—not a general acceptance threshold.

[Bavaresco et al., *LLMs instead of Human Judges? A Large Scale Empirical Study across 20 NLP Evaluation Tasks* (ACL 2025, peer-reviewed conference paper)](https://aclanthology.org/2025.acl-short.20/) reports substantial variation across tasks and models. Its agreement/correlation measures cannot simply be exchanged for MT-Bench's percentage agreement.

**Our recommendation:** choose the metric and threshold from the task and error costs, then validate on representative data. Report false approvals separately from false rejections. This is not a claim that an 80% threshold is never appropriate; it is a rejection of a universal threshold.

## 4. Does 100% agreement prove overfitting?

**Claim:** a judge with 100% agreement should fail CI because it must have overfit.

**Verdict: incorrect.** Perfect agreement on a finite set is compatible with an easy task, a good judge, leakage, or overfitting. The number alone does not distinguish them.

[Cawley and Talbot, *On Over-fitting in Model Selection and Subsequent Selection Bias in Performance Evaluation* (JMLR 2010, peer-reviewed journal paper)](https://jmlr.org/papers/v11/cawley10a.html), particularly §4, explain how optimizing a selection criterion on a finite sample can overfit that criterion and bias the reported performance. The paper concerns general model selection, not specifically prompt engineering; applying its separation of tuning and evaluation to judge prompts is our methodological recommendation.

MT-Bench also reports agreement approaching 100% as the quality gap between compared systems grows (§4.2, Table 7). High agreement can reflect an easier distinction, not necessarily overfitting.

**Safe conclusion:** 100% on examples used to tune the judge does not establish generalization, but it does not prove overfitting either. Freeze the configuration and evaluate on new, representative, human-checked cases. Do not fail a release simply because a valid score reaches 100%. There is no universal replacement for the talk's suggested 30-example starting set; required evidence depends on the claim and consequence.

## 5. Are judge agreement and agent success the same metric?

**Verdict: no—a distinction between definitions, not an empirical hypothesis.**

- **Judge agreement:** how often judge labels match the human/reference labels.
- **Agent success:** how often agent outcomes satisfy the task.
- **Judge-reported success:** how often the judge says the agent succeeded; this can differ from reference success.

If humans and a judge both label four failed outputs as failures, agreement is 100% and agent success is 0%. This is a logical counterexample, not an observed benchmark result.

[Lù et al., *AgentRewardBench* (2025, arXiv preprint)](https://arxiv.org/abs/2504.08942), §§3.1 and 4.2, separately define human task-success labels and evaluate reward/judge predictions against them using metrics such as precision and recall. This supports the distinction; it does not establish that a model judge is always better than a rule-based evaluator.

**Our recommendation:** validate the grader and evaluate the application as separate checks. High grader agreement cannot substitute for a task-success requirement.

## 6. Is pairwise judging inherently inferior?

**Claims:** pairwise judging is generally worse than pointwise; it is “39% more vulnerable,” while pointwise fails only single-digit times.

**Verdict: conditional evidence, not a universal ordering. The quoted number is not a defensible general statistic.**

[Tripathi et al., *Pairwise or Pointwise? Evaluating Feedback Protocols for Bias in LLM-Based Evaluation* (2025)](https://arxiv.org/abs/2504.14716) report: “Pairwise preferences flip in about 35% of the cases, compared to only 9% for absolute scores.” Their experiments add distractors such as assertiveness, verbosity, and sycophancy. In the MT-Bench setup, flips measure changes from a baseline judgment—not an overall task-error rate. The study's absolute scores use a rating scale, not merely a binary pass/fail prompt.

Our research pass found 39.0% in one model/distractor cell of Table 2, not as the aggregate result. That may explain the transcript's number, but we cannot establish which source the speaker intended. “35% versus 9% in this setup” is also not the same mathematical claim as “39% more vulnerable.”

[Jeong et al., *The Comparative Trap: Pairwise Comparisons Amplifies Biased Preferences of LLM Evaluators* (BlackboxNLP 2025, peer-reviewed workshop paper)](https://aclanthology.org/2025.blackboxnlp-1.5/), §3.3/Table 2 and §5.1/Table 3, find different tradeoffs on adversarial LLMBar and ordinary MT-Bench comparisons. Their hybrid PRePair method combines pointwise reasoning with pairwise decisions.

**Our correction needs that qualification:** pairwise can benefit from direct comparative context, while pointwise can be more robust to some distractors. Choose the protocol for the question and validate it. The restaurant-menu analogy and claims about how neural networks resemble human brains are not evidence for choosing one protocol.

## 7. Do judges always favor the first, longest, nicest, or same-family answer?

**Verdict: observed risks, overstated as universal behavior.**

Zheng et al. (NeurIPS 2023), §3.3, investigate position, verbosity, and self-enhancement. Their results differ across judges and setups; they do not establish that every judge always chooses the first or longest answer.

[Panickssery, Bowman, and Feng, *LLM Evaluators Recognize and Favor Their Own Generations* (NeurIPS 2024, peer-reviewed conference paper)](https://proceedings.neurips.cc/paper_files/paper/2024/hash/7f1f0218e45f5414c79c0679633e47bc-Abstract-Conference.html) study self-recognition and self-preference, including controlled summarization experiments. This is substantive evidence for self-preference, not proof that every current judge favors every output from its model family.

[Spiliopoulou et al., *Play Favorites: A Statistical Method to Measure Self-Bias in LLM-as-a-Judge* (2025, arXiv preprint)](https://arxiv.org/abs/2508.06709), §5.2, examine family-level effects and find differences across model families and evaluation dimensions. This is more directly relevant to the transcript's family claim, but remains scoped to its studied models and tasks.

Tripathi et al.'s controlled sycophancy distractors also support a narrower claim: agreeable or flattering framing can change verdicts. Sycophancy is not simply politeness, and a longer answer is not necessarily a worse answer.

**Our recommendation:** test swapped order, irrelevant verbosity/style changes, and self/family comparisons against an independent reference. A different-family judge is one possible control, not a guarantee against position, style, or rubric errors.

### Does adding policy or RAG fix the judge?

An explicit policy can resolve missing information. It does not ensure correct retrieval, interpretation, or application.

[Chen et al., *LLMs are Biased Evaluators But Not Biased for Fact-Centric Retrieval Augmented Generation* (Findings of ACL 2025, peer-reviewed)](https://aclanthology.org/2025.findings-acl.1369/) find that fact-centric relevance prompts can reduce self-preference in their RAG setups, while other effects and limitations remain. That supports task-specific grounding, not a universal debiasing claim.

For a reproducible eval, record which policy and retrieved evidence each run used. The agent and judge need the same authoritative rule; giving both the same faulty retrieved fragment can also make them agree for the wrong reason.

## 8. Do evals or harnesses guarantee security?

**Verdict: no blanket guarantee follows.** A finite suite provides evidence for tested tasks and conditions. A harness can enforce particular runtime boundaries; it does not make every permitted action correct.

SWE-bench's limitations (§7) caution that its execution-based checks are insufficient to guarantee reliable model generations. HumanEval treats generated programs as untrusted and requires containment even when running their tests.

**Logical deduction:** a passing sample does not prove all untested attacks will fail. Runtime authorization must validate the requester, target, and action independently of whether a model recommended that action. The workshop recommendation is layered: evaluation, authorization/validation, isolation where needed, and review of consequential actions.

### What we could verify about the Instagram story

**Verdict: the underlying incident is corroborated by reporting; several transcript details are overstated or contradicted by later reporting.**

The linked [Maine Attorney General filing](https://www.maine.gov/agviewer/content/ag/985235c7-cb95-4be2-8792-a1252b4f8318/686120c8-63be-4e3c-b7ed-466d65b672f5.html) returned HTTP 403 in both the reader and a browser; the browser reported a geographic access restriction. We could not inspect the original filing directly. Do not present the following as our independent verification of its contents.

[SecurityWeek, June 8, 2026](https://www.securityweek.com/meta-says-20000-instagram-accounts-hacked-via-ai-tool-abuse/) quotes Meta's filing: a bug in a separate code path failed to verify that a requested password-reset email matched the account's email. A reset link could be sent to an unassociated address. The quoted statement says unauthorized login was possible **if the account holder had not enabled 2FA**.

The same report says **20,225 potentially affected individuals**, with some access possibly belonging to legitimate owners. That is not 20,225 confirmed unauthorized takeovers.

[Krebs on Security, June 1, 2026](https://krebsonsecurity.com/2026/06/hackers-used-metas-ai-support-bot-to-seize-instagram-accounts/) describes the early attacker video, including apparent VPN use near a target's location. It also reports the attackers' statement that their exploit failed against accounts with MFA enabled. This does not establish a VPN bypass of enabled 2FA.

The reporting supports a lesson about account-recovery verification. It does **not** establish which evals Meta had, whether a specific proposed eval would have prevented the incident, or that the root cause was prompt injection. We leave the incident out of the main guided exercise rather than speculate about an unseen internal process.

## What the lesson recommends—not a paper's universal prescription

Start with a small task and an explicit success condition. Use code for observable contracts, humans to establish and review judgments, and model graders where useful. Keep cases out of tuning, inspect critical mistakes separately, and rerun after meaningful changes. A tiny green result is a starting point for investigation, not a reliability certificate.

The lesson's return policy and prepared answers are teaching examples used to check a model judge against human labels. They do not measure a customer-support agent's success rate. Any observed OMP run results are labeled separately from the cited research; the papers were not replicated here.
