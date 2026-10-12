# 2.8 MCP, plugins, and extensions

This lesson connects OMP to a public documentation service, tests a concrete question, and checks whether the integration earns its place.

No cloud account, access token, or deployment is needed for this exercise. You need OMP with a connected model and network access to Microsoft Learn.

## First, get an answer you can check

You are reviewing an HTTP endpoint. It works locally without an access key, but someone says the deployed version requires one. Is that a contradiction?

We will use Azure Functions documentation to investigate. You do not need to build or run an Azure Function. The deliverable is a short, sourced explanation that distinguishes local behavior from deployed behavior.

**Predict before you search:** does a successful local request prove that the deployed endpoint allows anonymous access?

### 1. Connect one documentation server

Use a scratch project directory, not a repository whose integrations you have not inspected. Create `.omp/mcp.json` in your editor with this configuration:

```json
{
  "mcpServers": {
    "learn": {
      "type": "http",
      "url": "https://learn.microsoft.com/api/mcp"
    }
  }
}
```

If that file already exists, add the `learn` entry inside its existing `mcpServers` object rather than replacing the file.

This is Microsoft's [Microsoft Learn MCP server](https://github.com/MicrosoftDocs/mcp). It provides documentation search and retrieval. The endpoint requires no authentication; your queries still leave your machine. Use the public question below, not private code or customer details.

Start OMP in that directory:

```sh
omp
```

Then enter these commands **inside OMP**, not in your shell:

```text
/mcp list
/mcp test learn
```

Look for the `learn` server and the configuration source you intended. Inspect the test result rather than treating the presence of a configuration entry as a successful connection.

**Already running OMP?** After editing the configuration, use `/mcp reload`. `/mcp add` is the guided alternative to editing JSON. The exact commands here follow OMP's current documentation; check `/mcp` in your installed build if its interface differs.

### 2. Ask for a sourced explanation

```text
Use the Microsoft Learn MCP server to check Azure Functions HTTP trigger
access-key authorization.

Explain anonymous, function, and admin authorization levels. Does a successful
request without a key during local development prove the deployed endpoint
allows anonymous access? Check whether local containers or Core Tools'
--enableAuth option change the answer.

Search the documentation, then fetch the relevant page. Give me a short answer
with source links and the conditions that change the result. Do not create,
deploy, or modify anything. If the MCP server is unavailable, say so rather
than silently answering from memory or another tool.
```

Watch the actual tool calls. The server advertises tools including `microsoft_docs_search` and `microsoft_docs_fetch`; OMP may display them with a server prefix.

**A correct answer is not enough to prove MCP worked.** Check that the agent used this server, then open the cited page yourself. If it used ordinary web access instead, you may still have a useful answer, but you have not exercised this integration.

### 3. Check the important exception

The answer should distinguish the deployed authorization setting from local development behavior. Search excerpts may omit a condition, so inspect the full [HTTP trigger documentation](https://learn.microsoft.com/azure/azure-functions/functions-bindings-http-webhook-trigger#authorization-level).

<div class="setup-platforms">
<details>
<summary><strong>Compare your answer with the documentation</strong><span>Open after making your own prediction.</span></summary>

The documentation describes `anonymous` as requiring no access key, `function` as requiring a function key, and `admin` as requiring the master key. The page also explains which function or host keys requests can use.

**The local exception matters.** Local development bypasses HTTP authorization by default. After publishing to Azure, the trigger's authorization setting is enforced. The HTTP trigger documentation separately notes that keys are still required when running locally in a container.

The [local-development guide](https://learn.microsoft.com/azure/azure-functions/functions-run-local) adds another condition: Core Tools' `--enableAuth` option enables local authorization checks. “Locally” alone is not enough to describe the environment.

A local success therefore does not establish deployed anonymous access. Keep these conditions in the explanation rather than compressing them into “local functions do not need keys.” This is documentation evidence, not a test of your own deployment.

</details>
</div>

**If the result is vague:** ask, “Fetch the page behind that claim. Show the local-development exception and the container exception separately.” More tools are not the first fix for an incomplete reading.

## What just happened

MCP, the **Model Context Protocol**, gives an agent application a standard way to connect to servers that expose capabilities. OMP is the host application; its MCP client connects to the server. The model requests a tool call, and OMP handles execution and returns the result.

<div class="course-flow" aria-label="Documentation lookup through MCP">
<span>OMP requests a tool</span><span aria-hidden="true">→</span><span>Server searches docs</span><span aria-hidden="true">→</span><span>Result returns to OMP</span><span aria-hidden="true">→</span><span>You check the source</span>
</div>

**MCP is a connection protocol, not another model.** It does not make retrieved content correct, grant safe permissions, or guarantee that the agent uses the right tool.

Servers can expose more than tools:

- **Tools** perform operations, such as searching documentation or creating an issue.
- **Resources** expose content an application can read, such as a document or data record.
- **Prompts** provide reusable prompt templates offered by the server.

What a server offers and what a particular client exposes are separate questions. Our exercise uses tools; it does not require resource or prompt support.

### Local process or remote service?

**A stdio server runs as a local process.** OMP starts the configured executable and exchanges protocol messages over its standard input and output. A configuration containing `npx`, `uvx`, or `docker` is an instruction to run software, not just a bookmark.

**An HTTP server runs behind a URL.** OMP connects over the network, as it did with Microsoft Learn. Prefer the publisher's current Streamable HTTP setup for new remote connections; SSE-only configurations also exist, particularly in older integrations.

Local does not mean offline or isolated. A local process may read files and contact external services. A remote read-only tool still receives the arguments you send it.

## Choose the smallest mechanism that works

| Need | Start with | Why |
| --- | --- | --- |
| Read a known documentation URL | OMP's existing web-reading capability | No new server is needed for a page you can already retrieve. |
| Search a service's domain-specific data or act through its API | An MCP server, or an existing suitable CLI | Choose based on the actual operation, authentication, and controls. MCP is not automatically better than a CLI. |
| Repeat a review or writing procedure | A skill | Instructions guide work; they do not supply missing API access. |
| Add in-process tools, events, commands, or UI behavior to OMP | An extension | The change belongs inside the host runtime. |
| Distribute related capabilities together | A plugin | Packaging and enablement are the need, not a new protocol. |

Our documentation question can also be answered from the linked page without MCP. That is intentional: compare the integration against a real alternative rather than assuming setup effort proves value.

### How plugins and extensions fit

**A plugin packages capabilities. An extension executes inside OMP.** A plugin can bundle an extension alongside skills, commands, hooks, agents, or MCP configuration. It does not have to contain all of them.

Imagine an issue-review package: a skill supplies the review procedure, an MCP server reads the issue tracker, and a plugin distributes them together. An extension is only needed if you also want custom host behavior, such as a command or event handler.

You can configure an MCP server without installing a plugin. You can use a skill without either one. Keep these decisions separate.

**Inspect executable additions as software.** OMP extensions and plugin code are not sandboxed merely because they are installed through a package manager. A separate OMP profile separates selected state and credentials; it is not filesystem or network isolation.

## Other integrations worth inspecting

Choose one integration for a task. Each example is source-backed; none is a ranking or recommendation to install the whole list.

<div class="setup-platforms">
<details>
<summary><strong>Library documentation: Context7</strong><span>Use when the installed version matters more than a plausible code example.</span></summary>

[Context7](https://github.com/upstash/context7) provides library documentation and examples. Its hosted MCP endpoint currently accepts anonymous use; the publisher recommends an API key for higher limits. Check the current setup before connecting, and do not include proprietary code or secrets in documentation queries.

**Try:** ask a question about a library and version actually used by your project. Have the agent identify the package version before retrieving guidance.

**Notice:** a working documentation tool does not guarantee the returned example matches your installed version. Check the library identity, version coverage, and original documentation. If the version is unavailable, keep that limitation explicit rather than substituting the latest API silently.

</details>
<details>
<summary><strong>Repository work: GitHub MCP server</strong><span>Use when issues, pull requests, or repository data are the missing input.</span></summary>

The [GitHub MCP server](https://github.com/github/github-mcp-server) exposes GitHub operations. It needs authentication, and the available tools and credential permissions determine what the agent can do.

**Try:** begin with read-only access to one repository and ask for a summary of one issue's acceptance criteria, linked to its source. Compare this with your existing GitHub CLI workflow before adding another integration.

**Notice:** reading an issue and posting a comment are different permissions and consequences. Inspect the server's read-only configuration and selected toolsets. Do not give broad write access for a reading task, or paste a token into the prompt or a committed configuration file.

</details>
<details>
<summary><strong>Browser interaction: Playwright MCP</strong><span>Use when a task needs a real page interaction and your current browser tools do not cover it.</span></summary>

Microsoft's [Playwright MCP](https://github.com/microsoft/playwright-mcp) lets agents interact with browsers, including through accessibility snapshots. OMP already has browser tooling, so first identify what this additional server would provide.

**OMP-specific catch:** current OMP filters recognized Playwright/browser MCP configurations when its built-in browser and Eval are enabled under the default tool configuration. If you deliberately choose Playwright MCP instead, follow the [OMP configuration guide](https://github.com/can1357/oh-my-pi/blob/main/docs/mcp-config.md), which documents `browser.enabled: false`. Do not disable the existing browser merely to collect another integration.

**Try:** on a local app, ask the agent to complete one user action and show its visible result. Use a disposable browser context without personal logins.

**Notice:** an accessibility snapshot helps locate controls but is not a visual layout check. Inspect the rendered page too. Browser isolation is not automatically a security sandbox, and a logged-in browser can perform actions as that account.

</details>
<details>
<summary><strong>Discovery and debugging: registry and Inspector</strong><span>Use when finding a publisher or separating a server problem from an agent problem.</span></summary>

Start discovery with the [official MCP Registry](https://registry.modelcontextprotocol.io/) and follow entries to the publisher's source. A listing is not a security audit or proof that the package works with OMP.

The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) is a development tool for connecting to servers and inspecting their capabilities and calls independently of the model.

**Try:** if a server connects but an operation fails, reproduce that one call in Inspector with the same transport and relevant inputs. Follow its current setup instructions and keep its local UI and proxy private.

**Notice:** if the call fails there too, investigate the server, credentials, or inputs. If it succeeds there but not in OMP, compare client configuration and the actual arguments. Inspector does not judge whether the model chose a useful operation.

</details>
</div>

## Evaluate the integration, not the green status

**Connected, callable, and useful are three different checks.** `/mcp test` checks the connection and tool discovery; it does not execute your documentation search. The actual call tests the operation, and your independent result check establishes whether it was useful.

For the documentation example, record whether the server was actually used, whether the cited page supports the answer, and whether the local/container distinction survived. Then try the known-page route using OMP's existing reader. Keep the same question and model so the comparison is meaningful.

Before keeping a more powerful integration, check:

- **A normal task:** can it retrieve or change the intended item, with evidence from the actual system?
- **A boundary case:** does it distinguish missing data, denied access, and an empty result instead of guessing?
- **The access boundary:** are credentials and enabled operations limited to what the task needs?
- **The overhead:** does it reduce work enough to justify another process, login, failure mode, and tool catalogue?

**Read-only is not “no risk.”** Tool arguments can disclose data, and returned documents can contain instructions intended to redirect the agent. Treat retrieved content as evidence, not authority to change the task or expand access. Server-provided read-only hints describe intent; they are not enforcement.

For write operations, verify the target and requested change before execution, then inspect the resulting state. An agent saying “created” is not proof that the correct issue, document, or record exists.

## When it does not work

| What you see | Next useful check |
| --- | --- |
| The server is missing | Check the working directory, JSON shape, and `/mcp list` sources. Reload after editing configuration. |
| The wrong configuration wins | Inspect discovery sources before editing another copy. OMP can import configurations from other tools and plugins. |
| A local server exits immediately | Check the executable, runtime prerequisites, and startup error. Starting the process is separate from completing an MCP handshake. |
| A remote server returns 401 or 403 | Check the publisher's authentication setup and credential permissions. Do not put secrets into chat to debug it. |
| Opening the Learn endpoint in a browser returns 405 | It is a protocol endpoint, not a documentation page. Use the MCP client to test it; a browser GET is not a connection test. |
| Tools are listed, but the request fails | Inspect the actual tool arguments and error. Test the specific operation, not just the connection. |
| The agent answers without calling the server | Request that integration explicitly for the exercise and inspect the trace. Do not claim MCP success from answer quality alone. |
| Search finds something close but wrong | Narrow the product or version, then fetch the source page. A nearby result is not evidence for your claim. |

**Avoid making every timeout longer.** First distinguish a failed connection, an authentication problem, and a slow operation. Increasing a deadline does not repair the first two.

When the trial is over, remove only the `learn` entry you added from `.omp/mcp.json`, then reload OMP and check `/mcp list`. Leave any pre-existing configuration intact. If a same-named server still appears, inspect its source rather than deleting unrelated settings.

## Before you move on

You should have a sourced answer, evidence that the server handled the lookup, and a decision about whether this route is useful for your work.

Can you explain **what capability was missing, what ran where, what data left the machine, and how you checked the result**? That is more useful than having a long list of connected servers.

Next, [Key productivity tips](../working-with-omp/index.md) focuses on directing the session at the keyboard, remotely, and across delegated workers.

## Sources and verification scope

- [OMP MCP configuration](https://github.com/can1357/oh-my-pi/blob/main/docs/mcp-config.md): discovery, configuration, and interactive commands.
- [OMP plugin management](https://github.com/can1357/oh-my-pi/blob/main/docs/plugin-manager-installer-plumbing.md) and [extensions](https://github.com/can1357/oh-my-pi/blob/main/docs/extensions.md): packaging and in-process capabilities.
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture): host/client/server roles and protocol primitives.
- The linked publisher repositories document the optional integrations. Their presence here is not evidence of improved results or OMP compatibility for every feature.

The public Microsoft Learn endpoint was exercised directly through MCP initialization, tool listing, documentation search, and page fetch. The fetched HTTP trigger documentation contained both the local-development and local-container conditions. This is protocol-level evidence, not a provider-backed OMP session or an Azure deployment test. The locally installed OMP reported version 18.2.9; command guidance follows the linked current OMP documentation.

[Back to foundations](index.md) · [Previous: Skills](skills.md) · [Next: Key productivity tips](../working-with-omp/index.md)
