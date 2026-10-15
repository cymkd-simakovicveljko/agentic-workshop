# 2.5 Sessions and memory

**Treat a session as a conversation record plus live runtime state, not as a rewind button.** OMP can rebuild model context from a saved transcript, but it does not undo edits, roll back a database, or stop a process that is already running.

## Choose the operation deliberately

| Need | Operation | What changes |
| --- | --- | --- |
| Continue an existing conversation | `/resume` | OMP switches the active runtime to a selected session and rebuilds its messages, settings, and model context. It does not create a new session file. |
| Start unrelated work | `/new` | OMP starts an empty conversation with a new session identity and, in persistent mode, a new transcript path. |
| Retry from an earlier message | `/branch` | OMP moves back within the current session and keeps the old path as another branch. Selecting a user request puts its text back in the editor so you can change it before sending. |
| Return to another conversation path | `/tree` | OMP shows the session tree and rebuilds context from the point you select. It stays in the same session. |
| Try a competing approach | `/fork` | OMP creates a new persisted session from the current one and switches to it. The copied entries keep the earlier reasoning available while the branch can diverge. |
| Keep the conversation but reset provider stream state | `/fresh` | OMP rotates provider-facing state while retaining the local transcript and visible conversation. |
| Clear the live context without deleting history | `/clear` | OMP rebuilds from a reset boundary; the transcript and pre-reset history remain on disk. |
| Make room while continuing the same task | `/compact` | OMP reduces older context without starting a new session. The exact method depends on your configuration; don't assume every original detail remains in the model's input. |

Use `/resume` when the original task is still the task. Use `/branch` to retry an earlier request and `/tree` to return to another path. Use `/fork` when you want a separate session for an alternative approach, and `/new` when the old conversation would be more confusing than useful. `/fork` requires a persisted session; an in-memory `--no-session` run cannot be forked.

After closing OMP, return to the project directory and run `omp --continue` for the most recent session, or `omp --resume` to choose one. **Forking a conversation does not fork your Git working tree.** Two sessions can still edit the same files.

When `/tree` offers a summary of the branch you're leaving, choose it if those findings are useful on the new path. Skip it for a retry that should not carry that detour forward. The branches stay in the session record either way; the summary determines whether some of the abandoned path also reaches the model.

## Context is not persisted history

The **transcript** is the durable session record: messages, tool calls, results, metadata, and compaction entries. **Context** is the subset OMP rebuilds and sends to the model for the current turn. A resumed session can therefore contain more history on disk than the model sees in one request. A file on disk is not current model context until OMP or a tool reads it; a transcript claim is not proof that the current workspace still matches it.

When the context grows, `/compact` or automatic maintenance reduces older history. Depending on your configuration, this can use a summary or another supported compaction method. The reduced context is not a guarantee that every detail survives. Preserve decisions that must survive compaction in source files, project guidance, or a short handoff artifact. After resuming or compacting, inspect the current files and rerun the check that matters instead of trusting an old “passed” message.

The same boundary applies to the world outside the transcript. `/branch`, `/tree`, `/new`, `/resume`, `/fork`, `/clear`, and compaction do not revert files. Ending OMP does not imply that a fixture, server, child process, or browser closed. If the next decision depends on either state, inspect the filesystem and process separately.

## Retrieval: bring the right information back

**Start with files and search. Add a retrieval service when those stop finding the evidence you need.** A saved conversation helps you resume work; a searchable knowledge base helps you find information that may never have appeared in that conversation.

Try this in a project you know:

```text
Find the current instructions for running this project's checks.
Read the relevant documentation and command definitions, then tell me which
commands apply. Cite the file paths and flag any disagreement between them.
Do not change files or run the checks yet.
```

Before sending it, predict where the answer lives. Then inspect the agent's tool calls and cited files. Did it read the current source, or repeat an old conversation claim? This is the habit we want: **retrieve evidence, use it, and keep the source available for checking.**

### RAG is a workflow, not a database

**Retrieval-augmented generation (RAG)** means retrieving relevant information and supplying it to a model so it can answer using that material. The basic flow is:

**Question → retrieve relevant material → put it in context → generate an answer with sources.**

A typical document system splits files into smaller passages, indexes them, and retrieves selected passages for each question. An agent can also search and read files just in time, choosing its next lookup from what it finds. Neither approach requires loading the whole knowledge base into every request. See [Anthropic's explanation of context retrieval and agentic search](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

Retrieval does **not** train the model or make the retrieved text true. A confident answer can still use the wrong document, an outdated version, or a passage that only sounds relevant.

### Keyword, vector, and graph retrieval

| Approach | What it finds | When it helps |
| --- | --- | --- |
| **Keyword search** | Matching terms and identifiers. | An exact error message, function name, ticket number, or product code. |
| **Vector search** | Nearby **embeddings**: numerical representations used to compare similarity. | “Login expires too soon” might find a passage about “session timeout” without matching those words. Similarity is not proof that the passage answers the question. |
| **Graph retrieval** | Entities and explicit relationships, such as service → depends on → database or team → owns → service. | “Which teams depend on this database?” needs connected facts, not just similar passages. |

A **vector database** stores vectors and supports similarity search; vector search can also be a feature of a database you already use. A **graph database** stores and queries entities and relationships. Neither is an LLM, and neither automatically remembers your conversations.

These approaches can work together. **Hybrid search** combines keyword and vector retrieval; graph relationships can help select or expand the evidence. **GraphRAG** uses graph-structured information in retrieval and generation. It is not simply a new name for a graph database.

**Our recommendation:** use exact search for exact identifiers; consider hybrid search for a larger document collection; add graph retrieval when relationship questions justify building and maintaining those relationships. Don't introduce a database just to give an agent “memory.”

Keep the access boundary in the retrieval system: return only material the requester may read, not a larger result set with instructions for the model to hide some of it. Keep source links, versions, updates, and deletions connected to the index. Treat retrieved instructions as document content—not permission to change the task.

## What OMP already has

**Saved sessions and autonomous memory are separate features.** In the [OMP source snapshot checked for this lesson](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/memory.md), `memory.backend` defaults to `off`. You can resume a transcript without enabling a memory backend.

That snapshot's package version is **18.8.7**; it is not a claim about your installed build. Check `omp --version` in your terminal and the memory options in `/settings` before following backend-specific guidance.

| Backend | What it keeps and retrieves |
| --- | --- |
| `off` | No autonomous memory backend. Saved sessions, files, and ordinary search remain separate capabilities. |
| `local` | Project-scoped summary and lesson files derived from persisted sessions. Relevant summary material is injected into later sessions; this backend does not offer structured `recall` search. |
| `mnemopi` | Local SQLite memory with full-text and vector-based retrieval. It can retain completed turns and recall relevant memories into context; visibility is per-project by default. |
| `hindsight` | Memory in a separately running Hindsight server. OMP connects to that service; the service may be local or remote. |
| `sharpshooter` | Project decision files for architecture, product, and style, with background consolidation. This is another memory mode, not a general document-search database. |

For a first inspection, run this **inside OMP**:

```text
/memory view
```

It shows the current backend's memory injection payload, not every stored memory or the whole active context. If memory is disabled, do not enable a backend just to complete this lesson. **Don't use `/memory clear` to look around:** it mutates backend state, and deletion behavior differs by backend.

<details>
<summary><strong>Does OMP contain vector and graph storage?</strong></summary>

With **Mnemopi selected**, yes: it uses embedded SQLite storage for memories, full-text search, and embeddings. It also has SQLite-backed fact and graph structures. This does not mean OMP starts a separate Pinecone or Neo4j service.

The default recall path combines full-text, vector, and importance signals. `mnemopi.noEmbeddings: true` selects full-text-only recall. Graph-related options `mnemopi.proactiveLinking` and `mnemopi.polyphonicRecall` both default to `false`; don't assume graph enrichment and graph-enhanced recall are active.

Selecting Mnemopi makes `retain`, `recall`, `reflect`, and `memory_edit` tools available. A recall result can be a clipped preview; the agent can read `memory://<memory-id>` for the full stored item. Tool availability depends on the backend, so these are not universal OMP capabilities in every configuration.

**Local storage does not mean all processing stays local.** Memory extraction can call the configured model, embeddings can use a configured remote endpoint, and Hindsight has its own service boundary. Check those settings before enabling retention of sensitive material.

Read the [pinned Mnemopi integration guide](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/mnemosyne-memory-backend.md) for configuration and scope. These features manage agent memories; selecting them does not automatically index an entire repository or company knowledge base.

</details>

For this workshop, keep important decisions in inspectable [artifacts](artifacts.md) and ask the agent to read them when needed. Optional memory can help retrieve prior work, but **current files and current instructions take precedence over a stale recollection**. A new conversation is not proof that separate memory data has been erased.

## External options: choose by the retrieval problem

You do not need to install any of these for this workshop. This is a shortlist of established options, **not a market-share ranking or a claim that one wins every workload**.

| Option and official documentation | When we would consider it |
| --- | --- |
| [**pgvector**](https://github.com/pgvector/pgvector) | We already use PostgreSQL and want vector search alongside relational data. It is an extension, not another database service; indexing and query tuning are still our job. |
| [**Qdrant**](https://qdrant.tech/documentation/overview/) | We want a dedicated vector-search service with metadata filtering and self-hosted or managed deployment. We still need an ingestion and update process. |
| [**Weaviate**](https://docs.weaviate.io/weaviate) | We want an open-source vector database with semantic and hybrid search, self-hosted or managed. Choose it against actual retrieval and operational needs, not a promise of automatic understanding. |
| [**Pinecone**](https://docs.pinecone.io/guides/get-started/overview) | We want managed vector retrieval rather than operating that infrastructure ourselves. Account for service costs and where indexed data goes. |
| [**Azure AI Search**](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview) | We need managed full-text and vector retrieval with Azure data integration. Configure access filtering and keep the index current; these are not model responsibilities. |
| [**Neo4j**](https://neo4j.com/docs/neo4j-graphrag-python/current/) | Entities and relationships are central to the questions, and we need graph traversal alongside retrieval. Building and maintaining a trustworthy graph is additional work. |
| [**Amazon Neptune**](https://docs.aws.amazon.com/neptune/latest/userguide/intro.html) | We need a managed graph database in AWS, using property-graph or RDF queries. It supplies the graph store; we still build the retrieval and generation workflow around it. |

If we are building on OpenAI's Responses API, [**hosted file search**](https://developers.openai.com/api/docs/guides/tools-file-search) is another route: upload files to a vector store and use its semantic and keyword retrieval. This is a provider API capability, not something that every OMP conversation automatically uses.

<details>
<summary><strong>Read further: RAG, hybrid search, and GraphRAG</strong></summary>

- [**AWS: What is RAG?**](https://aws.amazon.com/what-is/retrieval-augmented-generation/) — start here for external knowledge, retrieval, prompt augmentation, and source attribution.
- [**Microsoft: Vector search overview**](https://learn.microsoft.com/en-us/azure/search/vector-search-overview) — how embeddings and vector queries fit into a search system.
- [**Microsoft: Hybrid search overview**](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview) — why keyword and vector results can complement each other.
- [**Microsoft GraphRAG**](https://microsoft.github.io/graphrag/) — a graph-based indexing and query pipeline, including entity relationships and summaries for broader questions across a collection. It is not a graph database and does not inherently require Neo4j. Its extraction and summarization stages add model calls and cost.
- [**Neo4j: Graph database concepts**](https://neo4j.com/docs/getting-started/appendix/graphdb-concepts/) — nodes, relationships, and traversals, before adding an LLM.
- [**Microsoft: Document-level access control**](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview) — enforcing retrieval permissions and keeping indexed permissions synchronized.

</details>

## Sources

- [OMP session operations: new, resume, fork, fresh, and clear (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/session-operations-export-share-fork-resume.md)
- [OMP compaction and branch summaries (current source)](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/compaction.md)
- [OMP branch, tree, and fork command definitions (current source)](https://github.com/can1357/oh-my-pi/blob/main/packages/coding-agent/src/slash-commands/builtin-session.ts)
- [Context in this workshop](context.md)
- [OMP autonomous memory (pinned source snapshot)](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/memory.md)
- [OMP Mnemopi integration (same snapshot)](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/mnemosyne-memory-backend.md)
- [Research notes: RAG, retrieval stores, and agent memory](../../research/2026-10-09-rag-and-agent-memory.md) — source evidence, selection boundaries, and verification limits.

Session-operation links follow OMP's current `main`; memory details are pinned to the source snapshot above. Commands, defaults, and backend availability can differ in your installed release.

## Go deeper

<div class="setup-platforms">
<details>
<summary><strong>Read next</strong><span>Know what survives a session change and what the next agent needs to check.</span></summary>

- [Session Operations: export, dump, share, fresh, clear, fork, resume/continue](https://github.com/can1357/oh-my-pi/blob/main/docs/session-operations-export-share-fork-resume.md) — Oh My Pi. Use the operation matrix to see which commands switch identity, rebuild context, or leave the transcript and working tree untouched.
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Anthropic Engineering. Learn why compaction alone is not continuity, and how incremental work, progress records, and clean-state checks help the next session continue safely.
</details>
</div>

[Back to foundations](index.md) · [Previous: Tools and permissions](tools-and-permissions.md) · [Next: Artifacts](artifacts.md)
