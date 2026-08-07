# Knowledge Graph — RBTTrainingAI SaaS

## Purpose
The Knowledge Graph connects ABA/BACB concepts into a typed, weighted directed graph, enabling prerequisite-aware retrieval, learning-path planning, and concept comparison capabilities for the AI Tutor.

## Graph Model
- **Nodes** (`KnowledgeGraphNode`): Topics, Concepts, Questions, Flashcards, Definitions, Scenarios.
- **Edges** (`KnowledgeGraphEdge`): `related_to`, `prerequisite_of`, `example_of`, `contrasts_with`, `part_of` — weighted 0.0–1.0.

## Related Files
- [lib/rag-engine.ts](file:///g:/RBT/lib/rag-engine.ts) — `getKnowledgeGraph()`
- [database/rag-schema.sql](file:///g:/RBT/database/rag-schema.sql) — `knowledge_graph_nodes`, `knowledge_graph_edges`
