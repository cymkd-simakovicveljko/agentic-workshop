# Who is using coding agents—and where they draw the line

Research checked on 27 September 2026. This is a source shortlist for the introduction, not an endorsement wall. The [main introduction](../sections/introduction.md) now shows nine short quotations with portraits and roles; the five-part course is now the promoted main route at [OUTLINE.md](../OUTLINE.md).

## Recommendation

Show that this discussion reaches well beyond AI vendors. Use recognizable builders, a concrete example of their work, and the limit they describe. Treat the selection as individual accounts, not evidence of an industry-wide adoption rate.

Suggested heading: **People who built the tools you use are trying this too.**

Suggested lead: **Researchers, framework authors, and open-source maintainers are changing how they work with AI. They do not all use it the same way—or trust it with the same tasks.**

These sources support broad experimentation and adoption. They do not establish universal enthusiasm, a guaranteed productivity gain, or the end of programming. Using a tool is not the same as endorsing every claim about it.

## Five profiles to show first

The summaries below are paraphrases, not quotations. Dates belong to the cited account, not a claim that the person's position is unchanged today.

| Person | Why engineers may know them | Concrete account | Limit to show beside it |
| --- | --- | --- | --- |
| **Andrew Ng** | Stanford adjunct professor; Google Brain founding lead; DeepLearning.AI founder | In [June 2026](https://x.com/AndrewYNg/status/2071988145667928442), described an agent building a typing app for his daughter and repeatedly checking it in a browser during an approximately hour-long run. | A personal prototype. He still changed the design and user flow, and says humans have important product and user context the agent lacks. |
| **Kent Beck** | Extreme Programming and test-driven development | In [June 2025](https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes), described building a B+ tree library with AI, tests, review, and several attempts. In [April 2026](https://newsletter.kentbeck.com/p/genie-lessons-nobody-wants-agents), described trying a multi-agent system on a Go data structure. | Early attempts stalled in complexity. His later multi-agent trial created coordination work rather than simply removing work. |
| **Linus Torvalds** | Linux and Git | A [January 2026 README commit](https://github.com/torvalds/AudioNoise/commit/71b256a7fcb0aa1250625f79838ab71b2b77b9ff) says his AudioNoise Python visualizer was largely written using Google Antigravity. | A hobby audio project, explicitly described as a learning exercise. This is not evidence that Linux is being written by agents. |
| **Mitchell Hashimoto** | HashiCorp co-founder; Ghostty creator | In [February 2026](https://mitchellh.com/writing/my-ai-adoption-journey), described moving from disappointing chatbot results to scoped agent tasks, background research, and verification tools. | Learning took effort. Knowing when not to use an agent was part of the improvement; he did not want agents running just to keep them busy. |
| **David Heinemeier Hansson (DHH)** | Ruby on Rails creator; 37signals co-owner and CTO | In [January 2026](https://world.hey.com/dhh/promoting-ai-agents-3ee04945), reported using terminal agents for bugs, substantial features, and drafts of larger initiatives. | Called this supervised collaboration. Said he was nowhere near claims of agents writing 90%+ of code while preserving his quality and cohesion standards. |

This selection covers research, engineering practice, operating systems, developer tools, and a coding founder. It is an editorial sample, not a representative sample of programmers.

## More useful voices

| Person | Account and date | What it adds | What not to imply |
| --- | --- | --- | --- |
| **Guido van Rossum — Python creator** | [Original interview, 10 Oct 2025](https://www.odbms.org/blog/2025/10/beyond-the-ai-hype-guido-van-rossum-on-pythons-philosophy-simplicity-and-the-future-of-programming/); [typeagent post, Mar 2026](https://x.com/gvanrossum/status/2029021031219052768) | Uses agent-written code while keeping architecture, APIs, and review human-controlled. His interview explicitly calls AI over-hyped and voices wider ethical concerns. | Do not portray him as an unqualified AI enthusiast or say CPython is agent-written. |
| **Salvatore Sanfilippo (antirez) — Redis creator** | [Redis Array development, 4 May 2026](https://antirez.com/news/164); [agent-driven QA, 7 Jun 2026](https://antirez.com/news/168). Exact dates checked through [his RSS](https://antirez.com/rss). | A substantial systems-programming case: handwritten specification, agent implementation, line-by-line review, rewrites, and stress testing. He says he accomplished more in the same period, not that the entire project took less time. | At publication, the Array work was a PR awaiting acceptance. Do not turn it into a shipped-feature claim or a hands-off success story. |
| **Simon Willison — Django co-creator; Datasette creator** | [Agentic Engineering Patterns, 23 Feb 2026](https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/); [review/accountability reflection, 6 May 2026](https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/) | Reports real agent-built software and explains why the author remains accountable as agents become more capable. | Low-stakes personal tools and software for other people have different requirements. Improved outputs can encourage over-trust. |
| **Andrej Karpathy — AI researcher and educator** | [January workflow notes](https://x.com/karpathy/status/2015883857489522876); [February dashboard account](https://x.com/karpathy/status/2026731645169185220) | A vivid shift from manual/autocomplete coding toward delegation and review. Already appears in the current introduction. | His before/after percentages and time comparison are personal reports, not measured population effects. His home-infrastructure permissions are not a workshop default. |
| **Paul Goldsmith-Pinkham — Yale finance professor** | [Researcher's setup guide, 29 Mar 2026](https://paulgp.substack.com/p/getting-started-with-claude-code) | Shows adoption outside software companies: research scripts, data work, and debugging. Explicit cautions on sensitive data and statistical edge cases. | He is a finance researcher, not a computing professor. His approximate 90% usage figure is self-reported and does not establish correctness. |
| **Russ Cox — long-time Go maintainer** | [Gaby announcement, 8 Jun 2024](https://github.com/golang/go/discussions/67901); [dated OSCAR README, 12 Nov 2024](https://github.com/golang/oscar/commit/8d2c29a7581ce744d06b730bb4ef95f3cf111da3) | A useful alternative: agents reduce maintenance toil by working with deterministic tools. | This is older context, not a 2026 adoption claim. OSCAR explicitly says automating away coding is not its goal. |

## Adoption data: stronger evidence of breadth than famous names

### JetBrains, August 2026 — excluded from the introduction

[AI Coding Agents: Adoption Trends](https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/) reports on more than 15,000 professional developers surveyed in May–July 2026. It reports **90% weekly use of coding agents** and **68% daily use**. Its estimates use regional quotas and weighting for region, employment, programming language, and familiarity with JetBrains products.

The user rejected JetBrains as the introduction's adoption source because of its commercial interest. These notes preserve what was checked, not a recommendation to publish its figures. Do not restore them without approval.

JetBrains sells AI development tools, including products discussed in the article. Its 2026 post links to a methodology page labelled 2025; that page explains weighting and remaining bias, but its 2025 dates and sample size must not be presented as 2026 details.

The [companion article](https://blog.jetbrains.com/research/2026/08/how-much-code-do-developers-really-let-agents-write/) reports that only about **22%** say agents generate over 80% of their code. That is a useful contrast: frequent use does not mean handing over all implementation.

Avoid presenting the companion article's average code shares as a pie chart. Its approximate shares add to more than 100%; the author explains that they derive from separate bucketed self-reports. They are not measured shares of all code written worldwide.

### Stack Overflow, 2025: historical context, not this year's result

The [2025 survey](https://survey.stackoverflow.co/2025/ai/) reports 84% using **or planning to use** AI development tools, and about 51% of professional respondents using AI tools daily. It also reports 46% distrusting accuracy versus 33% trusting it. The agent-specific section says agents were not yet mainstream in that sample.

[Methodology](https://survey.stackoverflow.co/2025/methodology/): 49,009 accepted responses from 177 countries, collected 29 May–23 June 2025, mostly recruited through Stack Overflow channels. Individual questions have smaller response counts.

Do not label these figures 2026, drop “planning,” or turn “AI tools” into “coding agents.” Do not draw a growth curve between Stack Overflow and JetBrains: they use different samples and definitions. The attempted 2026 Stack Overflow AI page returned 404; search summaries claiming a 2026 result repeated 2025 numbers and were not used.

### Productivity is a separate question

[METR's May 2026 survey](https://metr.org/blog/2026-05-11-ai-usage-survey/) covers 349 technical workers and reports perceived gains, while warning about selection bias and the difficulty of estimating counterfactual productivity. Its median self-reported value gains are not a demonstrated multiplier for this course's participants.

[DORA's 2025 summary](https://dora.dev/research/2025/dora-report/) describes AI as amplifying an organization's existing strengths and weaknesses. The summary supports explaining why process matters; it does not supply a universal speedup.

## Published format

The user asked to replace the five expandable stories with more people, small portraits, clear roles, and short quotations. The [main introduction](../sections/introduction.md) now shows nine profiles: DHH, Sanfilippo, van Rossum, Beck, Hashimoto, Willison, Karpathy, Ng, and Torvalds.

Each profile has a public portrait, name, role, direct excerpt, dated source link, and a short scope note. At the user's request, profiles are ordered oldest to youngest: van Rossum (1956), Beck (1961), Torvalds (1969), Ng (1976), Sanfilippo (1977), Hansson (1979), Willison (1981), Karpathy (1986), and Hashimoto (1989). Birth years are used only for ordering, not displayed as credentials. Torvalds remains explicitly labelled as personal-project use, not Linux kernel development. The surrounding text distinguishes personal views from course endorsements.

The JetBrains figures were removed at the user's request. No replacement adoption statistic was added. The introduction now explicitly labels the profiles as selected firsthand accounts, not an industry survey.

Checked in the browser: all nine images decoded, all nine profiles have quotations and external source links, and desktop/mobile layouts render without horizontal overflow. No learner evaluation has run.

## Photo credits

Images are loaded from the public sources below, not copied into this repository. Names remain readable without images. Requests use `no-referrer`; images still require an internet connection and contact the source hosts.

| Person | Public photo source |
| --- | --- |
| David Heinemeier Hansson | [GitHub profile](https://github.com/dhh) · [avatar](https://avatars.githubusercontent.com/u/2741?v=4&s=96) |
| Salvatore Sanfilippo | [GitHub profile](https://github.com/antirez) · [avatar](https://avatars.githubusercontent.com/u/65632?v=4&s=96) |
| Guido van Rossum | [GitHub profile](https://github.com/gvanrossum) · [avatar](https://avatars.githubusercontent.com/u/2894642?v=4&s=96) |
| Kent Beck | [GitHub profile](https://github.com/KentBeck) · [avatar](https://avatars.githubusercontent.com/u/46154?v=4&s=96) |
| Mitchell Hashimoto | [GitHub profile](https://github.com/mitchellh) · [avatar](https://avatars.githubusercontent.com/u/1299?v=4&s=96) |
| Simon Willison | [GitHub profile](https://github.com/simonw) · [avatar](https://avatars.githubusercontent.com/u/9599?v=4&s=96) |
| Andrej Karpathy | [Personal site](https://karpathy.ai/) · [portrait](https://karpathy.ai/assets/me_new.jpg) |
| Andrew Ng | [Personal site](https://www.andrewng.org/) · [portrait](https://www.andrewng.org/images/andrew-ng-about-page.jpg) |
| Linus Torvalds | [GitHub profile](https://github.com/torvalds) · [avatar](https://avatars.githubusercontent.com/u/1024025?v=4&s=96) |

GitHub avatar URLs were checked against its public user API. Public availability is not a blanket reuse license; image reuse rights have not been established for commercial publication. Review those rights before publishing beyond this local draft.

## Source checks and interests

The parent checked the main candidate source pages for Ng, Beck, Torvalds, Hashimoto, DHH, and van Rossum directly. Independent research agents checked the supporting records, dates, and role sources. No software artifacts were executed and no claimed productivity gains were reproduced.

Role sources include [Ng's official bio](https://www.andrewng.org/), [Beck's site](https://kentbeck.com/), [Hashimoto's about page](https://mitchellh.com/about), DHH's article bio, [Willison's about page](https://simonwillison.net/about/), [Redis's return announcement](https://redis.io/blog/welcome-back-to-redis-antirez/), and [Goldsmith-Pinkham's Yale page](https://economics.yale.edu/people/paul-goldsmith-pinkham).

Relevant context: Ng sells AI education and has AI business interests. Beck discloses Augment sponsorship, including the April session. Hashimoto states he has no employment, investment, or advisory relationship with an AI company in his February account. DHH's account discusses his own developer-tool ecosystem. Sanfilippo is associated with Redis. Van Rossum's interview places him at Microsoft. Willison discloses vendor previews/free credits and one paid OpenAI preview appearance. These are useful firsthand accounts, not independent benchmark reports.

X posts were available through the read tool's Nitter mirror. Use canonical source links when publishing. Torvalds' longer 2025 interview was checked by a research agent through auto-generated captions; the proposed row relies on his own pinned README instead. No qualifying firsthand Rust-creator example was found; none was invented to fill that category.
