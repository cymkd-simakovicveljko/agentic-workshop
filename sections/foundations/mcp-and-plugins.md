# 2.9 MCP, plugins, and extensions

**MCP lets OMP connect to tools and data provided by another program.** For example, a documentation service can give OMP tools to search its pages and read the results.

We will connect Microsoft Learn, ask one question, and check the answer. You need OMP with a connected model and internet access. No Azure account, access token, or deployment is needed.

## First, get an answer you can check

An HTTP endpoint works on your laptop without an access key. Once deployed to Azure, it requires one. Why?

We will use the Azure Functions documentation to find out. You do not need to build anything. The result should be a short explanation with a source you can open.

**Make a prediction:** does “it worked locally without a key” prove that anyone can call the deployed endpoint?

### 1. Connect Microsoft Learn

Use a scratch project directory. Create `.omp/mcp.json` in your editor:

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

If the file already exists, add only the `learn` entry inside `mcpServers`. Do not replace your other settings. Review any existing server entries before starting OMP; some can launch programs on your machine.

This connects to the [Microsoft Learn MCP server](https://github.com/MicrosoftDocs/mcp). It needs no login, but your search queries go to Microsoft. Use the public question below—not private code or customer details.

Start OMP from that directory:

```sh
omp
```

Then run these commands **inside OMP**, not in your terminal shell:

```text
/mcp list
/mcp test learn
```

Check that `learn` appears, that it comes from the file you edited, and that the connection test succeeds. A saved configuration is not proof of a working connection.

**Already running OMP?** Run `/mcp reload` after editing the file. You can also use `/mcp add` for guided setup instead of editing JSON. If your build offers different commands, check `/mcp` and the [OMP configuration guide](https://github.com/can1357/oh-my-pi/blob/main/docs/mcp-config.md).

### 2. Ask the question

```text
Use the Microsoft Learn MCP server to answer this:

Why can an Azure Functions HTTP endpoint work without an access key locally,
but require one after deployment?

Search the docs, then fetch the relevant page. Check the exceptions for
local containers and Core Tools' --enableAuth option.

Give me a short answer with source links. Do not create or change anything.
If this MCP server is unavailable, say so. Do not silently use another tool
or answer from memory.
```

Watch for calls to `microsoft_docs_search` and `microsoft_docs_fetch`. OMP may add a server prefix to their names.

**Check the tool call, not just the answer.** If the agent uses ordinary web access, it might still answer correctly—but it has not tested this MCP connection.

### 3. Open the source

Open the cited [HTTP trigger documentation](https://learn.microsoft.com/azure/azure-functions/functions-bindings-http-webhook-trigger#authorization-level). Does it support the answer, including the local-development exceptions?

<div class="setup-platforms">
<details>
<summary><strong>Compare your answer</strong><span>Open after checking the source yourself.</span></summary>

**No: a successful local request does not prove the deployed endpoint allows access without a key.**

Normal local development skips the key check by default. Once published to Azure, the function's authorization setting applies:

- `anonymous`: no access key required.
- `function`: a function key is required; the docs also describe using host keys.
- `admin`: the master key is required.

Two local exceptions matter: the HTTP trigger docs say keys are still required in local containers, and the [local-development guide](https://learn.microsoft.com/azure/azure-functions/functions-run-local) documents `--enableAuth` to turn on local authorization checks.

So “local functions never need keys” is too broad. These docs explain the behavior; they do not test your own deployment.

</details>
</div>

**If the answer is vague:** ask, “Fetch the full page. Show the local-development rule and its exceptions.” Search snippets can leave out the part that changes the answer.

## What just happened

The model asked for a documentation search. OMP sent the request to Microsoft's server, received the result, and passed it back to the model to help answer you.

<div class="course-flow" aria-label="Documentation lookup through MCP">
<span>Model requests a search</span><span aria-hidden="true">→</span><span>OMP calls the server</span><span aria-hidden="true">→</span><span>Server returns docs</span><span aria-hidden="true">→</span><span>Model uses the result</span>
</div>

Three terms describe the connection:

- **MCP** means **Model Context Protocol**. It defines how an agent app and a server exchange requests and results.
- **An MCP server** is a program that offers tools or data. Microsoft's server offers documentation search and page retrieval.
- **A tool** is one action the server offers, such as “search these docs.” Connecting a server makes its tools available; the agent still has to call them.

**MCP is not another model.** The model can still misread a result, so check the source yourself.

<details>
<summary>Terms you may see in MCP documentation</summary>

**Host** means the agent app—OMP in this lesson. The **client** is the part of OMP that talks to an MCP server. You do not need to run a separate client for this exercise.

A server can offer three kinds of things:

- **Tools:** actions to call, such as searching docs or creating an issue.
- **Resources:** content to read, such as a document or a database description.
- **Prompts:** reusable prompt templates supplied by the server.

Both the server and the client need to support the feature you want. This exercise uses tools only.

</details>

## Where does the server run?

- **On your machine (`stdio`):** OMP starts a program and sends messages through its standard input and output. If the configuration says `npx`, `uvx`, or `docker`, it runs software—not just opens a link.
- **Behind a URL (`http`):** OMP sends requests over the network. Microsoft Learn works this way.

A local server can still read files or contact the internet. A remote server receives the arguments you send it, even when the tool only reads data.

For a remote connection, use the publisher's current **Streamable HTTP** setup. You may see **SSE** in older configurations; follow the publisher's instructions rather than copying an old example.

## MCP, skill, extension, or plugin?

These solve different problems:

- **MCP server:** gives OMP access to another program's tools or data. For example, read an issue from GitHub.
- **Skill:** tells the agent how to do a task. For example, follow a checklist when reviewing that issue.
- **Extension:** runs code inside OMP. For example, add a custom command to start a review.
- **Plugin:** packages additions so you can install them together. For example, bundle the review skill and MCP configuration.

A plugin can include an extension, but it does not have to. You can also use an MCP server or a skill without installing a plugin.

**Start with what OMP already has.** For a known web page, use its existing reader. For a service you already use through a suitable CLI, try that before adding MCP. Add a server when it gives you access you need or makes the task easier—not because a connection is available.

Our documentation question also works without MCP. That is useful: you can compare the two approaches with the same question.

**Treat installed code as code.** Extensions run inside OMP, and plugins may contain executable code. Neither is automatically sandboxed. A separate OMP profile separates settings and credentials, not filesystem or network access.

## Other integrations to try later

Pick one only when you have a task for it. You do not need these for this lesson.

<div class="setup-platforms">
<details>
<summary><strong>Context7: library documentation</strong><span>When you need guidance for the version your project uses.</span></summary>

[Context7](https://github.com/upstash/context7) supplies library documentation and examples. Ask the agent to identify your installed version before looking up an API. Check that the result covers that version; “latest” is not always what your project needs.

The hosted service currently allows anonymous use and recommends an API key for higher limits. Check its setup guide before connecting. Keep secrets and proprietary code out of queries.

</details>
<details>
<summary><strong>GitHub MCP: issues and pull requests</strong><span>When the missing information lives in GitHub.</span></summary>

The [GitHub MCP server](https://github.com/github/github-mcp-server) needs authentication. Start with read-only access and ask for a summary of one issue, linked to its source. Compare it with your existing GitHub CLI workflow.

Reading an issue and posting a comment need different access. Check the enabled tools and credential permissions. Do not give write access for a reading task or put tokens in a prompt or committed configuration.

</details>
<details>
<summary><strong>Playwright MCP: browser interaction</strong><span>Only when OMP's built-in browser does not cover your task.</span></summary>

[Playwright MCP](https://github.com/microsoft/playwright-mcp) lets an agent interact with a browser. OMP already has browser tools; try those first.

OMP normally filters out recognized browser MCP servers while its built-in browser and Eval are active. If you deliberately choose Playwright MCP instead, follow the [OMP configuration guide](https://github.com/can1357/oh-my-pi/blob/main/docs/mcp-config.md), including its `browser.enabled: false` setting.

Try one action in a local app using a browser without personal logins. Inspect the rendered page as well as the tool's text description. A browser logged into an account can act as that account; a separate browser context is not a security sandbox.

</details>
<details>
<summary><strong>Registry and Inspector: find or debug a server</strong><span>When you need the publisher's setup or a clearer error.</span></summary>

The [MCP Registry](https://registry.modelcontextprotocol.io/) helps you find servers. Follow the listing to the publisher's source; being listed is not a security review.

The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) lets you try a server call without a model. If the same call fails there, check the server, credentials, and inputs. If it works there but fails in OMP, compare the settings and arguments.

Follow Inspector's setup guide and keep its local interface private.

</details>
</div>

## Decide whether to keep it

Check three things in order:

1. **Connected:** `/mcp test learn` can reach the server and discover its tools.
2. **Used:** the agent actually calls a tool, and the call succeeds.
3. **Useful:** you check the source and find that it answers your question.

Then ask the same question using OMP's existing web reader, keeping the same model. Did MCP save enough work to justify another connection to maintain?

**Read-only still needs care.** Queries can disclose private data. Returned text can also contain instructions meant to redirect the agent. Treat it as material to check—not permission to change the task. A server's “read-only” label is not an enforced access limit.

For tools that write, confirm the target and change before execution. Then inspect the result in the actual service. “Created successfully” is not proof that the right item was created.

When you finish the trial, remove only the `learn` entry you added. Run `/mcp reload`, then `/mcp list`. If `learn` still appears, check which file supplies it before deleting anything else.

## When it does not work

| What you see | What to do next |
| --- | --- |
| `learn` is missing | Check your working directory and JSON, then run `/mcp reload`. |
| The wrong settings are being used | Use `/mcp list` to find their source. OMP can also load MCP settings from other tools and plugins. |
| A local server exits immediately | Read the startup error. Check that its executable and required runtime are installed. |
| A remote server returns 401 or 403 | Check its login setup and permissions. Do not paste credentials into chat. |
| The Learn URL returns 405 in a browser | It is a tool endpoint, not a web page. Test it through OMP. |
| Tools appear, but a call fails | Read that call's arguments and error. A connection test does not test every operation. |
| The agent answers without a tool call | Ask it to use this server explicitly, then check the calls. |
| A result covers the wrong product or version | Narrow the search and fetch the full source page. |

**Get the exact error before changing settings.** A longer timeout will not fix a wrong URL or missing permission.

## Before you move on

You should have a sourced answer and have seen the server handle the lookup.

Can you explain **what OMP connected to, what data you sent, and how you checked the result**? Those are the useful habits—not collecting more servers.

Next, [Working with agents in a real codebase](../engineering-workflows/index.md) connects these capabilities to investigation, failure recovery, verification, security, and team review.

## Sources and verification scope

- [OMP MCP configuration](https://github.com/can1357/oh-my-pi/blob/main/docs/mcp-config.md): setup, discovery, and commands.
- [OMP plugin management](https://github.com/can1357/oh-my-pi/blob/main/docs/plugin-manager-installer-plumbing.md) and [extensions](https://github.com/can1357/oh-my-pi/blob/main/docs/extensions.md): packaging and code that runs inside OMP.
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture): host, client, server, tools, resources, and prompts.
- The linked publisher repositories provide setup details for the optional integrations; they do not prove that every feature works in OMP.

An earlier workshop check exercised the Microsoft Learn endpoint directly: connecting, listing tools, searching docs, and fetching a page. The page included the local-development and container exceptions. That checked the MCP service—not a model using it through OMP, and not an Azure deployment. The installed OMP reported 18.2.9 at that check; the commands above follow the linked current OMP guide.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Keep the protocol boundary separate from the host integration around it.</span></summary>

- [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) — Model Context Protocol. Separates host, client, and server, then explains the data and transport layers so protocol semantics do not get confused with OMP integration.
- [Build an MCP server](https://modelcontextprotocol.io/docs/develop/build-server) — Model Context Protocol. Walks from a weather server to configuring Claude for Desktop as host, making the integration boundary and user-approval path concrete.
</details>
<details>
<summary><strong>Optional watch: Building Agents with Model Context Protocol</strong><span>See a complete MCP workshop from an Anthropic engineer.</span></summary>

<a data-youtube-embed href="https://www.youtube.com/watch?v=kQmXtrmQ5Zg"><strong>Building Agents with Model Context Protocol - Full Workshop with Mahesh Murag of Anthropic</strong></a> — AI Engineer, with Mahesh Murag of Anthropic. 1 hour 44 minutes 11 seconds. The verified description covers what MCP is, building with it, and agent use cases, with chapters for each part.
</details>
</div>
