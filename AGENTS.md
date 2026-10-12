# Agentic workshop

## Goal

Build a strongly opinionated internal course on agentic engineering with OMP for engineers in an organization of roughly 3,000 people. Help colleagues move from limited use or skepticism to useful, repeatable practice. It should feel like an experienced engineer helping a colleague—not a personal brand, a sales course, or corporate training boilerplate.

This is a practitioner's workshop, not an academic survey. Teach a way of working we believe in. The reader should leave with something they built and tricks they can use tomorrow—not just a vocabulary for discussing AI.

## Voice and point of view

- Lead with a recommendation. Say what we would do, why, and the concrete circumstance that would change our mind. Avoid turning every decision into an equally weighted menu.
- Write colleague-to-colleague: “Here’s the approach we’ll use,” “Use this when…,” “This is where people get stuck.” Use “we” for the workshop and “you” for the learner. Reserve first-person anecdotes for genuine experience that adds a useful lesson; keep the instructor out of the spotlight.
- Be direct, conversational, and specific. Short explanations, real commands, concrete examples. Have a point and get to it.
- Give the course a recognizable personality. Challenge bad habits and unnecessary complexity. Strong opinions need reasons, not theatrical certainty or insults.
- Earn adoption through useful results, specific advice, and evidence—not hype, pressure, or criticism of people who have not adopted agents.
- Speak from inside the organization to our colleagues. Own our recommendation: “We’re using OMP.” Never use outsider boilerplate such as “use what your organization authorizes” or “check with your organization.” When a real access or data constraint matters, give the concrete instruction; do not invent internal policy or substitute a generic disclaimer.
- Keep facts accurate and recommendations clearly ours. Verify commands against the relevant OMP version. Do not invent personal experience, anecdotes, measurements, or successful runs to sound authoritative.
- Put a caveat beside the action only when it changes what the learner should do. Explain consequential risks plainly; keep background qualifications out of the main flow.

## Teach through the experience

- Experience first, explanation afterward. Start with a useful mission, get something running, then name the concepts behind what happened.
- Use focused practical examples for each lesson, not one cumulative course project. Introduce tools or prerequisites only when that lesson's example needs them. Section 1 is OMP installation and connection, not exercise-project preparation.
- Introduce commands when they solve the learner's immediate problem. Put deeper command references and optional configuration after the guided experience.
- Make the learner participate: predict a result, run the product, inspect a surprising case, choose an improvement, and decide whether to accept the work.
- Use the actual run as the teaching material. Agent behavior varies; teach what to observe rather than promising a scripted sequence of tool calls or failures.
- Keep the first build bounded, but make its value obvious. The payoff is directing meaningful work, not merely watching code appear.
- Keep the learner in control. Working directory, permissions, secrets, interruption, and independent result checks belong at the relevant action—not in a detached safety lecture.

## Tips and tricks are core content

Give readers practical details that save frustration: a useful shortcut, a better follow-up prompt, a misleading success signal, a recovery move, or a setting worth changing. Prefer relevant tips throughout the lesson over a giant list at the beginning.

A useful tip answers: **when do I need this, what do I do, and what should I notice?** Explain the catch when there is one. Distinguish a documented behavior from an author's preference or an untested suggestion.

Example of the desired specificity: “Before asking for another fix, get the exact failing command and its output. Otherwise you're giving the agent another chance to guess.”

## Format and course continuity

- Text-first for now: copyable commands and prompts, short guided steps, and expandable answers or troubleshooting. Videos and GIFs are not prerequisites.
- When editing lessons, read `OUTLINE.md` for the current route and neighboring lessons for continuity. Use each lesson's focused example and introduce only the prerequisites it needs.
- Preserve the current HTML reader and resources linked by the workshop. Keep course navigation and repository instructions aligned with the published lessons.
- When changing rendered lesson content, check it in the HTML reader, including links and interactive disclosures. For reader startup and existing checks, use `README.md` and `package.json`.

## Before calling a lesson ready

Can the learner tell what they are building, take the next action, check the result, and explain why our recommended approach helps? Did they learn a useful working habit or trick? Does the writing sound like a capable colleague with a point of view, rather than a neutral reference manual or an instructor promoting themselves?
