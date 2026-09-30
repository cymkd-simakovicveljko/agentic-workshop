# 2.8 MCP, plugins, and extensions

**A skill gives instructions. A tool does something. MCP connects capabilities. A plugin packages them.** Learn that distinction before adding another integration.

## Name the mechanism

| Mechanism | What it is | Where it runs |
| --- | --- | --- |
| **MCP server** | A protocol endpoint that advertises tools, resources, or prompts to OMP. | As a local stdio process or a remote HTTP/SSE service. |
| **Custom tool** | An executable API with a schema that OMP can expose to the model. | In the OMP runtime or a loaded package. |
| **Skill** | File-backed guidance loaded as context when selected. | As text read by OMP; it is not a permission boundary. |
| **Extension** | A TS/JS module whose factory registers tools, commands, handlers, renderers, or shortcuts. | In-process with OMP. |
| **Plugin** | An installable package and enablement boundary that can bundle skills, tools, hooks, commands, rules, prompts, MCP configuration, agents, and extensions. | Its declared capabilities are discovered after the package is enabled. |

A plugin can contain an extension, but a plugin is not the extension itself. An MCP tool is not the same as a built-in or custom tool merely because the model sees a callable schema. The source, transport, approval tier, and side effects still differ.

## One example: reviewing an issue

Imagine a team package for reviewing work against an issue:

- A **skill** describes how to compare the change with the issue's acceptance criteria.
- An **MCP server** provides a tool for reading the issue tracker.
- A **plugin** distributes the skill and MCP configuration together.
- An **extension** could add an OMP command or UI behavior around that process.

These pieces can work together without becoming the same thing. You can use a skill without a plugin, or configure an MCP server directly.

In OMP, `/mcp list` shows configured servers and their sources. `/mcp add` offers guided setup; `/mcp test <name>` checks a configured server. Connecting a local server starts its configured process, while a remote server talks to an external service. Read the configuration and access it needs before connecting it.

## Add capability only when it earns its place

Start with OMP's built-in tools. Add MCP when an external service or reusable protocol endpoint is the real dependency. Add a plugin when several capabilities need to ship and be enabled together. Add an extension when in-process event handling, UI, a slash command, or a custom tool is the actual need. Add a skill when the missing piece is repeatable instructions, not executable behavior.

Plugin code and runtime extensions can execute code without a sandbox. A separate profile can keep selected settings and logins apart, but it does not isolate your filesystem or network. Inspect executable additions as software, not as a harmless bundle of prompts.

[Back to foundations](../health-checker/02-foundations.md) · [Previous: Skills](skills.md) · [Next: Key productivity tips](../working-with-omp/index.md)

## Sources

- [OMP MCP configuration and discovery (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/mcp-config.md)
- [OMP plugin manager and capability loading (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/plugin-manager-installer-plumbing.md)
- [OMP runtime extensions (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/extensions.md)
- [OMP skills and custom-tool distinctions (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/skills.md)

These links follow OMP's current `main` documentation rather than a pinned release; validate command availability against the installed build before adopting a newer mechanism.
