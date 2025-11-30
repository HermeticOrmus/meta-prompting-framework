# Level 3: Agent Conductor 🎭

> *"One model follows instructions. Many models solve problems."*

## Overview

**Duration**: 4-5 weeks
**Time Commitment**: 15-20 hours/week
**Complexity**: ▓▓▓░░░░
**Prerequisites**: Level 2 complete

### What You'll Build
- ✅ Multi-agent research system (4+ agents)
- ✅ LangGraph workflow orchestration
- ✅ Custom MCP server for tools
- ✅ Agent swarm with shared memory

---

## Core Skills

| Skill | Description | Mastery Indicator |
|-------|-------------|-------------------|
| **Multi-Agent Design** | Orchestrating specialized agents | 5+ agent architectures |
| **LangGraph Mastery** | Graph-based workflows | Production-ready state machines |
| **CrewAI Implementation** | Role-based teams | 5.76x faster than baseline |
| **Tool Integration** | Function calling, APIs | Zero-shot tool usage 90%+ |
| **MCP Protocol** | Model Context Protocol | Can build custom servers |
| **Memory Systems** | Short/long-term memory | Agents remember across sessions |

---

## Learning Path

### Week 1: LangGraph Foundations
**Focus**: State machines for agent workflows

**Key Concepts**:
- Nodes, edges, state
- Conditional routing
- Error recovery
- Message passing

**Project**: 2-node agent (research → summarize)

### Week 2: Multi-Agent Patterns
**Focus**: Multiple agents working together

**Patterns**:
- **Pipeline**: Agent1 → Agent2 → Agent3
- **Supervisor**: Controller delegates to specialists
- **Collaborative**: Agents debate and refine
- **Swarm**: Many agents, emergent behavior

**Project**: 4-agent research team

### Week 3: Tool Integration & MCP
**Focus**: Agents that use tools

**Topics**:
- Function calling
- MCP server/client architecture
- Custom tool creation
- Tool selection strategies

**Project**: Agent with 5+ custom tools

### Week 4: Production Agent Systems
**Focus**: Robust, scalable agents

**Topics**:
- State management at scale
- Error handling across agents
- Monitoring and observability
- Cost optimization

**Project**: Production-ready agent swarm

---

## Major Projects

### Project 1: Research Agent Swarm
**Architecture**:
```
User Query
    ↓
┌────────────────────────────────────────┐
│         Router Agent                   │
│  (Analyzes query, plans approach)      │
└──────────────┬─────────────────────────┘
               │
    ┌──────────┼──────────┬──────────┐
    ▼          ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Searcher│ │Analyzer│ │ Critic │ │Synth.  │
└────────┘ └────────┘ └────────┘ └────────┘
    │          │          │          │
    └──────────┴──────────┴──────────┘
                  ↓
         ┌─────────────────┐
         │ Shared Memory   │
         │ (Vector Store)  │
         └─────────────────┘
                  ↓
            Final Report
```

**Features**:
- 4 specialized agents
- Shared memory via vector store
- Autonomous task decomposition
- Quality scoring
- Iterative refinement

**Success Criteria**:
- Human-competitive research summaries
- Handles multi-hop questions
- Cites sources accurately

### Project 2: Custom MCP Server
**Objective**: Build tool server for your domain

**Example**: Code analysis MCP server
```python
# mcp_server.py
from mcp.server import Server

server = Server("code-analyzer")

@server.tool()
def analyze_complexity(code: str) -> dict:
    """Analyze code complexity"""
    # Implementation
    return {
        "cyclomatic_complexity": 5,
        "cognitive_complexity": 3,
        "maintainability_index": 75
    }

@server.tool()
def suggest_refactoring(code: str) -> list:
    """Suggest refactoring opportunities"""
    # Implementation
    return ["Extract method", "Reduce nesting"]
```

---

## Key Frameworks

### LangGraph (Production-Ready)
**Why**: Graph-based orchestration, lowest latency
**When**: Complex workflows, state management

```python
from langgraph.graph import StateGraph

# Define state
class AgentState(TypedDict):
    messages: list
    next_action: str

# Build graph
workflow = StateGraph(AgentState)
workflow.add_node("research", research_node)
workflow.add_node("analyze", analyze_node)
workflow.add_edge("research", "analyze")
workflow.add_conditional_edges(
    "analyze",
    should_continue,
    {"continue": "research", "end": END}
)

app = workflow.compile()
```

### CrewAI (Role-Based)
**Why**: 5.76x faster, role-based design
**When**: Team-like agent collaborations

```python
from crewai import Crew, Agent, Task

# Define agents
researcher = Agent(
    role="Research Analyst",
    goal="Find relevant information",
    tools=[search_tool, scrape_tool]
)

writer = Agent(
    role="Content Writer",
    goal="Create compelling content",
    tools=[grammar_tool]
)

# Create crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process="sequential"
)

result = crew.kickoff()
```

### MCP (Universal Protocol)
**Why**: Standard for tool integration
**When**: Building reusable tools

**Architecture**:
```
Resources (app-controlled)
    ↓
MCP Server (your tools)
    ↓
MCP Client (LLM agent)
    ↓
Tools (model-controlled)
```

---

## Advanced Patterns

### ReAct (Reasoning + Acting)
```
Thought: I need to find the latest GDP data
Action: search("US GDP 2024")
Observation: GDP is $27.4 trillion
Thought: Now I should analyze the trend
Action: analyze_trend(gdp_data)
Observation: Growing at 2.1% annually
Thought: I have enough information
Final Answer: US GDP is $27.4T, growing 2.1%
```

### Reflection Pattern
```
Agent 1: Draft response
    ↓
Agent 2: Critique (find flaws)
    ↓
Agent 1: Revise based on critique
    ↓
Agent 2: Final review
    ↓
Output (higher quality)
```

### Hierarchical Agents
```
Manager Agent
    ├── Research Team Lead
    │   ├── Data Gatherer
    │   └── Fact Checker
    ├── Analysis Team Lead
    │   ├── Statistician
    │   └── Trend Analyzer
    └── Writing Team Lead
        ├── Drafter
        └── Editor
```

---

## Resources

### Essential Reading
1. **ReAct: Reasoning and Acting** (Yao et al., 2023)
2. **LangGraph Documentation** (LangChain)
3. **Model Context Protocol** (Anthropic, Nov 2024)
4. **Multi-Agent Survey** (2024)

### Frameworks
- **LangGraph**: Graph-based orchestration
- **CrewAI**: Role-based collaboration
- **AutoGen**: Flexible agent behaviors
- **OpenAI Swarm**: Simple, lightweight

### Example Repositories
- [LangGraph Examples](https://github.com/langchain-ai/langgraph/tree/main/examples)
- [CrewAI Examples](https://github.com/joaomdmoura/crewAI-examples)

---

## Assessment

### Project Evaluation Rubric
**Research Agent Swarm**:
- [ ] 4+ agents working together (25%)
- [ ] Shared memory implemented (20%)
- [ ] End-to-end task completion (25%)
- [ ] Quality ≥ human baseline (20%)
- [ ] Documentation & tests (10%)

**Passing**: All criteria met, total ≥80%

### Diagnostic Test
**[Level 3 Assessment →](../../assessments/diagnostics/level-3-diagnostic.md)**

**Tasks**:
- Design multi-agent architecture (40 min)
- Implement LangGraph workflow (30 min)
- Debug agent failure scenario (20 min)

---

## Common Pitfalls

### "Agents loop infinitely"
**Fix**: Add max iterations, clear termination conditions

### "State management is confusing"
**Fix**: Use TypedDict, log state transitions, start simple

### "Too expensive with multiple agents"
**Fix**: Cache shared work, use cheaper models for simple agents

### "Agents don't collaborate well"
**Fix**: Shared memory, explicit handoffs, clear roles

---

## Next Steps

### When Ready for Level 4:
```bash
python cli.py assess-level --level=3
python cli.py start-level 4
```

### Preview of Level 4: Knowledge Alchemist
- GraphRAG implementation
- Hybrid retrieval systems
- Knowledge graph construction
- Agentic RAG patterns
- Project: Enterprise knowledge system

---

**Start Level 3** → [Week-by-Week Guide](./week-by-week.md) *(Coming Soon)*

*Level 3 v1.0 | Framework Comparison: LangGraph vs CrewAI*
