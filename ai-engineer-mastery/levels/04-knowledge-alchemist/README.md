# Level 4: Knowledge Alchemist 📚

> *"Transform raw data into refined intelligence"*

## Overview

**Duration**: 4-5 weeks
**Time Commitment**: 15-20 hours/week
**Complexity**: ▓▓▓▓░░░
**Prerequisites**: Level 3 complete

### What You'll Build
- ✅ GraphRAG system (35% better than vector-only)
- ✅ Hybrid retrieval (dense + sparse + reranking)
- ✅ Knowledge graph with entity extraction
- ✅ Agentic RAG with multi-step reasoning

---

## Core Skills

| Skill | Description | Mastery Indicator |
|-------|-------------|-------------------|
| **Advanced RAG** | GraphRAG, Agentic RAG, CRAG | 35%+ precision improvement |
| **Knowledge Graphs** | Neo4j, NetworkX ontologies | Can build domain ontologies |
| **Embedding Mastery** | Vector spaces, similarity | Can explain embedding geometry |
| **Hybrid Retrieval** | Dense + Sparse + Reranking | Optimal for any domain |
| **Chunking Strategies** | Semantic, hierarchical | Context-aware chunking |
| **Evaluation Frameworks** | RAGAS, custom metrics | Quantified RAG performance |

---

## RAG Evolution Path

```
Traditional RAG    Self-RAG         Corrective RAG    Agentic RAG       GraphRAG
      │               │                   │                │                │
      ▼               ▼                   ▼                ▼                ▼
┌──────────┐    ┌───────────┐    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Vector   │    │+ Self     │    │+ Dynamic     │  │+ Multi-step  │  │+ Knowledge   │
│ Search   │    │  Critique │    │  Evaluation  │  │  Planning    │  │  Graph       │
│ Only     │    │+ Retrieval│    │+ Query       │  │+ Tool Use    │  │+ Traversal   │
│          │    │  Decision │    │  Refinement  │  │              │  │              │
│ 50% acc  │    │ 65% acc   │    │ 75% acc      │  │ 82% acc      │  │ 85%+ acc     │
└──────────┘    └───────────┘    └──────────────┘  └──────────────┘  └──────────────┘

You'll implement: →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→ ALL OF THESE
```

---

## Learning Path

### Week 1: RAG Fundamentals
**Focus**: Vector search and embeddings

**Topics**:
- Embedding models (sentence-transformers, OpenAI)
- Vector databases (ChromaDB, Pinecone, Weaviate)
- Similarity search
- Semantic chunking

**Project**: Basic RAG (vector search only)

### Week 2: Hybrid Retrieval
**Focus**: Combine multiple retrieval methods

**Architecture**:
```
Query
  ├──→ Dense Retrieval (vector similarity)
  ├──→ Sparse Retrieval (BM25, keyword)
  └──→ Reranking (cross-encoder)
       ↓
   Final Top-K Results
```

**Project**: Hybrid RAG with reranking

### Week 3: GraphRAG & Knowledge Graphs
**Focus**: Structured knowledge representation

**Microsoft GraphRAG Approach**:
1. Build knowledge graph from documents
2. Retrieve via graph traversal + vector search
3. Generate with graph context

**Project**: GraphRAG implementation

### Week 4: Agentic RAG
**Focus**: Multi-step reasoning with retrieval

**Pattern**:
```
Question → Agent Plans → Agent Retrieves → Agent Reasons → Answer
             ↓              ↓                   ↓
        Decomposes      Multiple        Synthesizes
         question      retrievals         results
```

**Project**: Agentic RAG system

---

## Major Projects

### Project 1: Enterprise GraphRAG
**Objective**: Build production RAG with 80%+ accuracy

**Architecture**:
```
Documents
    ↓
┌─────────────────────────────────────┐
│   Document Processing               │
│ 1. Semantic chunking                │
│ 2. Entity extraction                │
│ 3. Relationship detection           │
└──────┬──────────────────────────────┘
       │
    ┌──┴──────────────┐
    ▼                 ▼
┌──────────┐    ┌──────────────┐
│ Vector   │    │ Knowledge    │
│ Store    │    │ Graph        │
│(ChromaDB)│    │ (Neo4j)      │
└────┬─────┘    └──────┬───────┘
     │                 │
     │    Query        │
     ▼                 ▼
┌────────────────────────────┐
│   Hybrid Retrieval         │
│ 1. Vector similarity       │
│ 2. Graph traversal         │
│ 3. Reranking               │
└──────┬─────────────────────┘
       ▼
┌────────────────────────────┐
│   Generation               │
│ - Context from both sources│
│ - Citation tracking        │
│ - Hallucination detection  │
└────────────────────────────┘
```

**Features**:
- Semantic chunking (300-500 tokens with overlap)
- Knowledge graph (entities + relationships)
- Hybrid retrieval (dense + sparse + graph)
- Reranking with cross-encoder
- Citation tracking
- Evaluation with RAGAS

**Success Criteria**:
- 80%+ answer accuracy
- Proper citations
- <2s latency for queries
- Handles 10,000+ documents

### Project 2: Agentic RAG System
**Objective**: Multi-step reasoning with retrieval

**Implementation**:
```python
class AgenticRAG:
    def __init__(self, retriever, llm):
        self.retriever = retriever
        self.llm = llm

    def answer(self, question: str) -> dict:
        # 1. Plan: Decompose question
        subquestions = self.decompose_question(question)

        # 2. Retrieve: Get context for each
        contexts = []
        for subq in subquestions:
            ctx = self.retriever.retrieve(subq, k=5)
            contexts.append(ctx)

        # 3. Reason: Synthesize answer
        answer = self.synthesize(question, contexts)

        # 4. Verify: Check quality
        verified = self.verify_answer(answer, contexts)

        return {
            "answer": verified,
            "subquestions": subquestions,
            "sources": contexts,
            "confidence": self.calculate_confidence()
        }
```

---

## Key Techniques

### Semantic Chunking
**Why**: Better than fixed-size chunks
**How**: Split at semantic boundaries

```python
def semantic_chunk(text: str) -> list[str]:
    """Chunk at paragraph/section boundaries"""
    # 1. Parse document structure
    # 2. Chunk at semantic boundaries
    # 3. Add overlap for context
    # 4. Target 300-500 tokens per chunk
```

### Graph Construction
**Microsoft GraphRAG Approach**:
```
Document → Extract Entities → Detect Relationships → Build Graph

Example:
"Apple released iPhone 15 in September 2023"
    ↓
Entities: [Apple (Company), iPhone 15 (Product), September 2023 (Date)]
Relations: [released(Apple, iPhone 15), date(release, Sep 2023)]
    ↓
Graph: (Apple)--[released]->(iPhone 15)--[date]->(Sep 2023)
```

### Hybrid Retrieval
```
Query: "What caused the 2008 financial crisis?"

Dense (Vector):
  - "The 2008 crisis was caused by..." (similarity: 0.89)
  - "Financial markets collapsed..." (similarity: 0.85)

Sparse (BM25):
  - Document with "2008" + "financial" + "crisis" (score: 12.3)
  - Document with "crisis" + "cause" (score: 8.7)

Reranking:
  - Cross-encoder scores all candidates
  - Final ranking: [doc1, doc5, doc2, doc8...]
```

---

## Advanced Patterns

### Self-RAG
**Concept**: LLM decides when to retrieve

```python
def self_rag(question: str) -> str:
    # 1. Should I retrieve?
    if should_retrieve(question):
        docs = retrieve(question)
        # 2. Is retrieval relevant?
        if is_relevant(docs, question):
            answer = generate_with_context(docs)
            # 3. Is answer supported?
            if is_supported(answer, docs):
                return answer
            else:
                # Retrieve more
                return self_rag(refined_question)
    else:
        return generate_without_retrieval()
```

### Corrective RAG (CRAG)
**5-Agent System**:
1. Context Retrieval Agent
2. Relevance Evaluation Agent
3. Query Refinement Agent
4. External Knowledge Agent (web search)
5. Response Synthesis Agent

---

## Resources

### Essential Papers
1. **GraphRAG** (Microsoft, 2024) - 35% improvement
2. **Self-RAG** (Asai et al., 2023)
3. **CRAG** (Yan et al., 2024)
4. **RAG Survey** (Gao et al., 2024)

### Tools & Frameworks
- **Vector DBs**: ChromaDB, Pinecone, Weaviate, FAISS
- **Knowledge Graphs**: Neo4j, NetworkX, RDFLib
- **RAG Frameworks**: LlamaIndex, LangChain, Haystack
- **Evaluation**: RAGAS, TruLens

### Datasets for Practice
- MS MARCO (retrieval)
- Natural Questions
- HotpotQA (multi-hop)
- Your own documents!

---

## Evaluation Frameworks

### RAGAS Metrics
```python
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall
)

results = evaluate(
    dataset,
    metrics=[
        faithfulness,
        answer_relevancy,
        context_precision,
        context_recall
    ]
)
```

**Target Scores**:
- Faithfulness: >0.8 (no hallucinations)
- Answer Relevancy: >0.85
- Context Precision: >0.75
- Context Recall: >0.80

---

## Common Pitfalls

### "Retrieval returns irrelevant docs"
**Fix**:
- Better chunking (semantic boundaries)
- Hybrid retrieval (dense + sparse)
- Reranking with cross-encoder
- Query expansion

### "Answers hallucinate"
**Fix**:
- Enforce citation requirements
- Use Self-RAG pattern
- Prompt: "Only use provided context"
- Evaluate faithfulness

### "Too slow"
**Fix**:
- Cache embeddings
- Approximate nearest neighbor search
- Smaller top-k, then rerank
- Async retrieval

---

## Assessment

### Project Rubric
**Enterprise GraphRAG**:
- [ ] 80%+ answer accuracy (30%)
- [ ] Proper citations (20%)
- [ ] Knowledge graph implemented (20%)
- [ ] Hybrid retrieval (15%)
- [ ] <2s query latency (10%)
- [ ] Documentation (5%)

**Passing**: ≥80% total

### Diagnostic Test
**[Level 4 Assessment →](../../assessments/diagnostics/level-4-diagnostic.md)**

**Tasks**:
- Design RAG architecture (30 min)
- Implement chunking strategy (25 min)
- Evaluate retrieval quality (25 min)

---

## Next Steps

### When Ready for Level 5:
```bash
python cli.py assess-level --level=4
python cli.py start-level 5
```

### Preview of Level 5: Reasoning Engineer
- Fine-tuning with LoRA/QLoRA
- Test-time compute scaling
- DPO and RLHF
- Reasoning benchmarks (MATH, AIME)
- Project: Fine-tuned reasoning model

---

**Start Level 4** → [Week-by-Week Guide](./week-by-week.md) *(Coming Soon)*

*Level 4 v1.0 | GraphRAG achieves 35% better precision than vector-only RAG*
