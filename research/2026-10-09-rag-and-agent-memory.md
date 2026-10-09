# RAG, retrieval stores, and agent memory

Research checked on 9 October 2026 for [Sessions and memory](../sections/foundations/sessions.md). The lesson separates the conversation record, active model context, persistent memory, and retrieval infrastructure.

## Recommendation

Start with current files and targeted search. Add indexed retrieval when direct lookup no longer finds the right evidence with acceptable effort or latency. A vector database is not a prerequisite for agent memory or RAG. Graph retrieval earns its place when questions depend on relationships or graph-derived summaries, not because it sounds more capable.

The external shortlist covers deployment and data-model choices. It is not a measured popularity ranking, benchmark, or procurement recommendation. We did not collect market-share evidence.

## Concepts and evidence

| Claim | Primary source | Qualification |
| --- | --- | --- |
| RAG retrieves external material and adds it to generation context without retraining the model. | [AWS: What is RAG?](https://aws.amazon.com/what-is/retrieval-augmented-generation/), [AWS SageMaker RAG](https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-customize-rag.html) | Retrieval does not establish that the source is current, correct, or sufficient. |
| Keyword, vector, and hybrid retrieval are choices within a RAG system. | [Microsoft: RAG overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview), [hybrid search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview) | Hybrid search is worth evaluating on identifier-heavy and natural-language queries; it is not a guaranteed improvement on every dataset. |
| Embeddings are numerical representations used in similarity search. | [Microsoft: vector search](https://learn.microsoft.com/en-us/azure/search/vector-search-overview) | Similarity and relevance are not identity or truth. Chunking, embedding choice, and retrieval settings affect results. |
| Agents can retrieve context just in time through file paths, search, and tools. | [Anthropic: effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | This is vendor engineering guidance. Direct search avoids maintaining a separate index but can require more runtime exploration. |
| Graph databases model entities, relationships, properties, and traversals. | [Neo4j: graph database concepts](https://neo4j.com/docs/getting-started/appendix/graphdb-concepts/) | The graph inside an HNSW vector index is not a domain knowledge graph. Its proximity links do not encode ownership or dependency facts. |
| Microsoft GraphRAG is an indexing and query pipeline, not a graph database. | [GraphRAG overview](https://microsoft.github.io/graphrag/), [indexing architecture](https://microsoft.github.io/graphrag/index/architecture/), [query overview](https://microsoft.github.io/graphrag/query/overview/) | Graph-derived entities, relationships, communities, and reports can support local and global questions. Microsoft GraphRAG does not inherently require Neo4j. |
| Graph construction adds extraction, resolution, and model-cost concerns. | [Microsoft GraphRAG getting started](https://microsoft.github.io/graphrag/get_started/), [Neo4j knowledge-graph builder](https://neo4j.com/docs/neo4j-graphrag-python/current/user_guide_kg_builder.html) | A graph does not repair incorrect extracted relationships. Keep provenance and evaluate the questions it must answer. |

## External options and selection boundaries

| Option | Official source | Why it is included |
| --- | --- | --- |
| pgvector | [Project README](https://github.com/pgvector/pgvector) | Vector similarity search inside PostgreSQL; a practical starting point when Postgres already exists. Not a separate managed ingestion system. |
| Qdrant | [Overview](https://qdrant.tech/documentation/overview/), [hybrid queries](https://qdrant.tech/documentation/search/hybrid-queries/) | Dedicated vector retrieval, payload filtering, and self-hosted or managed deployment. |
| Weaviate | [Documentation](https://docs.weaviate.io/weaviate), [vector indexing](https://docs.weaviate.io/weaviate/concepts/vector-index) | Open-source vector database with semantic/hybrid search and deployment flexibility. |
| Pinecone | [Overview](https://docs.pinecone.io/guides/get-started/overview) | Managed vector retrieval; infrastructure operation is traded for service cost and coupling. |
| Azure AI Search | [Hybrid search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview), [integrated vectorization](https://learn.microsoft.com/en-us/azure/search/vector-search-integrated-vectorization) | Managed keyword/vector search and Azure data ingestion. Embedding and enrichment calls can incur additional cost or quota limits. |
| Neo4j | [GraphRAG Python](https://neo4j.com/docs/neo4j-graphrag-python/current/) | Relationship-first retrieval and graph traversal; this package, unlike GraphRAG as a general approach, requires Neo4j. |
| Amazon Neptune | [User guide introduction](https://docs.aws.amazon.com/neptune/latest/userguide/intro.html) | Managed graph database supporting property-graph queries and RDF/SPARQL. A graph store, not a turnkey RAG workflow. |
| OpenAI file search | [Responses API file-search guide](https://developers.openai.com/api/docs/guides/tools-file-search) | Hosted keyword and semantic retrieval over uploaded files. Distinct from using a model through OMP; setup and data upload are explicit. |

## OMP implementation evidence

OMP claims below are pinned to commit `5aafbec7a2f03c836fe2b938b3adfbbd46e8482e`. Its package manifests report **18.8.7**; this does not establish the learner's installed version or active settings. The session-operation links elsewhere in the course still follow current `main`.

| Verified behavior | Pinned evidence | Lesson boundary |
| --- | --- | --- |
| `memory.backend` defaults to `off`; one backend is selected. | [Settings](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/packages/coding-agent/src/memory-backend/settings.ts), [memory guide](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/memory.md) | Do not imply that session persistence means autonomous memory is enabled. |
| `local` consolidates persisted sessions into summary/lesson files and injects selected material into later sessions. It does not support structured recall. | [Memory guide](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/memory.md), [local backend](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/packages/coding-agent/src/memory-backend/local-backend.ts) | Files such as `MEMORY.md`, `memory_summary.md`, and `learned.md` are curated memory artifacts, not a general document index. |
| Mnemopi uses local SQLite with full-text and vector retrieval; per-project scoping and automatic recall/retain are defaults once it is selected. | [Integration guide](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/mnemosyne-memory-backend.md), [recall implementation](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/packages/mnemopi/src/core/beam/recall.ts) | It is embedded retrieval, not a separately provisioned vector database service. Automatic retention is scheduled, not a guarantee that every fact is retained. |
| Mnemopi has SQLite-backed graph structures, but proactive linking and polyphonic recall default to false. | [Episodic graph](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/packages/mnemopi/src/core/episodic-graph.ts), [OMP settings](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/packages/coding-agent/src/mnemopi/settings.ts) | Do not describe graph-enhanced recall as the normal default. |
| Mnemopi permits full-text-only recall, configurable embeddings, and model-backed processing. | [Integration guide](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/mnemosyne-memory-backend.md) | `mnemopi.noEmbeddings: true` selects FTS-only recall but does not itself disable LLM calls. Local SQLite storage is not proof of local-only processing. |
| Hindsight uses a separately running server; Sharpshooter uses project decision files. | [Memory modes](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/memory.md) | A server endpoint can be local or remote. Keep these modes separate from the Mnemopi implementation. |
| `/memory view` displays the current backend injection payload. | [Command documentation](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/docs/memory.md), [command controller](https://github.com/can1357/oh-my-pi/blob/5aafbec7a2f03c836fe2b938b3adfbbd46e8482e/packages/coding-agent/src/modes/controllers/command-controller.ts) | It is an inspection action, not a complete memory-bank export. Clear/reset and enqueue/rebuild mutate state and are not inspection exercises. |

Mnemopi recall can return clipped previews; `memory://<id>` reads the full row. The `memory://root` file-backed summary paths belong to `local`, not all backends. Hindsight's `/memory clear` does not delete the remote bank. These differences are reasons to consult the selected backend's guide before editing or deleting memories.

## Operational boundaries

- **Authorization precedes model context.** [Microsoft's document-level access-control guide](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview) explains security filters and token-based approaches. Several native integrations are preview features. Query-time enforcement uses indexed permission metadata, so permission synchronization matters; do not describe it as an instantaneous mirror of source permissions.
- **Source changes must reach the retrieval store.** Stable source and chunk identifiers support updates and deletions. See [Pinecone deletion](https://docs.pinecone.io/guides/manage-data/delete-data) and [Azure integrated vectorization](https://learn.microsoft.com/en-us/azure/search/vector-search-integrated-vectorization). A source deletion does not by itself prove an independently maintained index was cleaned up.
- **Retrieved content remains evidence, not authority.** A passage can contain irrelevant or hostile instructions. Keep the task and access boundary outside retrieved document text. The workshop's [MCP lesson](../sections/foundations/mcp-and-plugins.md) already teaches this distinction.
- **Evaluate retrieval separately from generation.** Check whether the correct, authorized, current passage was retrieved before rewriting the answer prompt. This is our engineering recommendation, not a result from a benchmark run for this workshop.

## Verification limits

This research inspected official documentation and source material. No external database was provisioned, no corpus was uploaded, and no comparative retrieval or model benchmark was run. The lesson's file-search prompt is a learner activity, not a claimed captured OMP run.

The published Sessions additions were checked in the HTML reader: memory and external-option tables, both interactive disclosures, and the research-note reader link. This verifies presentation and navigation, not the behavior of an enabled OMP memory backend.
