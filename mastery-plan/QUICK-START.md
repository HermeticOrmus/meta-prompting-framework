# AI ENGINEER MASTERY: QUICK START GUIDE

> Get from zero to shipping AI systems in 30 days

## Overview

This guide gives you a concrete 30-day path to go from beginner to competent AI engineer. No fluff, just practical steps.

---

## Prerequisites

### Required
- [ ] Basic Python programming (functions, classes, loops)
- [ ] Command line comfort (cd, ls, pip, git)
- [ ] Can read documentation and debug errors
- [ ] 2+ hours daily commitment

### Helpful but not required
- Understanding of APIs and HTTP
- Familiarity with async/await
- Experience with data structures

---

## Week 1: Foundation (Level 1)

### Day 1: Environment Setup
```bash
# 1. Install Python 3.10+
python --version  # Should be 3.10 or higher

# 2. Create project directory
mkdir ai-mastery && cd ai-mastery
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# 3. Install core libraries
pip install anthropic openai python-dotenv

# 4. Get API keys
# - Anthropic: https://console.anthropic.com/
# - OpenAI: https://platform.openai.com/api-keys

# 5. Create .env file
cat > .env << EOF
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
EOF
```

**Goal**: Make your first successful API call

```python
# test_api.py
import os
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

response = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain what you are in one sentence."}
    ]
)

print(response.content[0].text)
```

**Success criteria**: You see Claude's response printed

---

### Day 2: Build Universal LLM Client

**Goal**: Create one interface that works with multiple providers

```python
# llm_client.py
from abc import ABC, abstractmethod
from anthropic import Anthropic
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class LLMClient(ABC):
    @abstractmethod
    def call(self, system: str, user: str, temperature: float = 0.7) -> str:
        pass

class ClaudeClient(LLMClient):
    def __init__(self):
        self.client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    def call(self, system: str, user: str, temperature: float = 0.7) -> str:
        response = self.client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=4096,
            temperature=temperature,
            system=system,
            messages=[{"role": "user", "content": user}]
        )
        return response.content[0].text

class OpenAIClient(LLMClient):
    def __init__(self):
        self.client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    def call(self, system: str, user: str, temperature: float = 0.7) -> str:
        response = self.client.chat.completions.create(
            model="gpt-4",
            temperature=temperature,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user}
            ]
        )
        return response.choices[0].message.content

# Usage
claude = ClaudeClient()
openai = OpenAIClient()

prompt = "Write a haiku about AI"

print("Claude:", claude.call("You are a poet", prompt))
print("OpenAI:", openai.call("You are a poet", prompt))
```

**Success criteria**: Can switch providers with one line change

---

### Day 3: Add Retry Logic & Token Tracking

**Goal**: Handle failures gracefully and track costs

```python
# enhanced_client.py
import time
import tiktoken
from typing import Optional

class EnhancedLLMClient(LLMClient):
    def __init__(self, base_client: LLMClient):
        self.client = base_client
        self.total_tokens = 0
        self.total_cost = 0.0

    def call_with_retry(
        self,
        system: str,
        user: str,
        temperature: float = 0.7,
        max_retries: int = 3
    ) -> str:
        for attempt in range(max_retries):
            try:
                result = self.client.call(system, user, temperature)
                self._track_usage(system + user + result)
                return result
            except Exception as e:
                if attempt == max_retries - 1:
                    raise
                wait_time = 2 ** attempt  # Exponential backoff: 1s, 2s, 4s
                print(f"Retry {attempt + 1}/{max_retries} after {wait_time}s")
                time.sleep(wait_time)

    def _track_usage(self, text: str):
        # Rough token estimation (accurate for OpenAI, approximate for Claude)
        encoding = tiktoken.get_encoding("cl100k_base")
        tokens = len(encoding.encode(text))
        self.total_tokens += tokens

        # Rough cost (adjust based on your model)
        self.total_cost += tokens / 1000 * 0.003  # $0.003 per 1K tokens

    def get_stats(self):
        return {
            "total_tokens": self.total_tokens,
            "total_cost": f"${self.total_cost:.4f}"
        }

# Usage
base = ClaudeClient()
client = EnhancedLLMClient(base)

response = client.call_with_retry(
    system="You are a helpful assistant",
    user="Explain quantum computing briefly"
)

print(response)
print(client.get_stats())
```

**Success criteria**: Handles API failures and shows cost tracking

---

### Day 4: Build Simple Evaluation System

**Goal**: Measure quality systematically

```python
# evaluator.py
from typing import List, Dict
import json

class SimpleEvaluator:
    def __init__(self, client: LLMClient):
        self.client = client

    def evaluate_response(
        self,
        response: str,
        expected_criteria: List[str]
    ) -> Dict[str, float]:
        """Score a response on multiple criteria"""

        eval_prompt = f"""
        Evaluate this response on the following criteria.
        Score each from 0.0 to 1.0.

        Response: {response}

        Criteria:
        {chr(10).join(f"- {c}" for c in expected_criteria)}

        Return ONLY a JSON object with scores:
        {{"criterion_1": 0.0-1.0, "criterion_2": 0.0-1.0, ...}}
        """

        result = self.client.call(
            system="You are an objective evaluator. Return only valid JSON.",
            user=eval_prompt,
            temperature=0.0
        )

        # Extract JSON from response
        try:
            return json.loads(result)
        except:
            # Fallback if model doesn't return pure JSON
            return {"error": "Could not parse evaluation"}

# Usage
client = ClaudeClient()
evaluator = SimpleEvaluator(client)

response_to_eval = "Quantum computing uses qubits instead of bits..."

scores = evaluator.evaluate_response(
    response=response_to_eval,
    expected_criteria=[
        "Clarity: Is it understandable?",
        "Accuracy: Is it technically correct?",
        "Completeness: Does it cover key concepts?"
    ]
)

print(json.dumps(scores, indent=2))
```

**Success criteria**: Can score responses automatically

---

### Day 5-7: First Real Project - Smart Summarizer

**Goal**: Build end-to-end app using everything you've learned

```python
# smart_summarizer.py
from enhanced_client import EnhancedLLMClient, ClaudeClient
from evaluator import SimpleEvaluator
import sys

class SmartSummarizer:
    def __init__(self):
        self.client = EnhancedLLMClient(ClaudeClient())
        self.evaluator = SimpleEvaluator(ClaudeClient())

    def summarize(self, text: str, style: str = "concise") -> Dict:
        system_prompts = {
            "concise": "Summarize in 2-3 sentences. Be direct.",
            "detailed": "Provide comprehensive summary with key points.",
            "eli5": "Explain like I'm 5 years old. Use simple words."
        }

        summary = self.client.call_with_retry(
            system=system_prompts.get(style, system_prompts["concise"]),
            user=f"Summarize this:\n\n{text}",
            temperature=0.3
        )

        # Auto-evaluate quality
        scores = self.evaluator.evaluate_response(
            response=summary,
            expected_criteria=[
                "Captures main points",
                "Appropriate length",
                "Clear language"
            ]
        )

        return {
            "summary": summary,
            "quality_scores": scores,
            "stats": self.client.get_stats()
        }

# CLI interface
if __name__ == "__main__":
    summarizer = SmartSummarizer()

    if len(sys.argv) < 2:
        print("Usage: python smart_summarizer.py <file_path> [style]")
        sys.exit(1)

    with open(sys.argv[1], 'r') as f:
        text = f.read()

    style = sys.argv[2] if len(sys.argv) > 2 else "concise"

    result = summarizer.summarize(text, style)

    print("SUMMARY:")
    print(result["summary"])
    print("\nQUALITY SCORES:")
    print(json.dumps(result["quality_scores"], indent=2))
    print("\nSTATS:")
    print(result["stats"])
```

**Test it**:
```bash
echo "Long article text here..." > article.txt
python smart_summarizer.py article.txt concise
python smart_summarizer.py article.txt eli5
```

**Success criteria**:
- [ ] Can summarize any text file
- [ ] Supports multiple styles
- [ ] Auto-evaluates output quality
- [ ] Tracks token usage and cost

---

## Week 2: Prompt Engineering (Level 2)

### Day 8-9: Chain-of-Thought Prompting

**Concept**: Make the model show its reasoning steps

```python
# cot_prompts.py

def solve_math_problem(client: LLMClient, problem: str) -> str:
    """Use Chain-of-Thought for math problems"""

    prompt = f"""
    Solve this problem step by step.

    Problem: {problem}

    Let's approach this systematically:
    1. First, identify what we know
    2. Then, determine what we need to find
    3. Finally, work through the solution step by step

    Show your work:
    """

    return client.call(
        system="You are a math tutor. Always show your reasoning.",
        user=prompt,
        temperature=0.1  # Low temp for deterministic reasoning
    )

# Test
client = ClaudeClient()

problem = "If a train travels 120 km in 2 hours, then 180 km in 3 hours, what is its average speed?"

solution = solve_math_problem(client, problem)
print(solution)
```

**Key insight**: Adding "Let's think step by step" improves accuracy by 20%+

---

### Day 10-11: Tree-of-Thought & Multi-Path Reasoning

**Concept**: Explore multiple reasoning paths

```python
# tot_prompts.py

def solve_with_multiple_approaches(
    client: LLMClient,
    problem: str,
    num_approaches: int = 3
) -> Dict:
    """Generate multiple solution approaches and pick the best"""

    # Step 1: Generate multiple approaches
    approaches_prompt = f"""
    Generate {num_approaches} different approaches to solve this problem.
    For each approach, briefly describe the strategy (2-3 sentences).

    Problem: {problem}

    Format:
    Approach 1: [strategy description]
    Approach 2: [strategy description]
    ...
    """

    approaches = client.call(
        system="You are a creative problem solver.",
        user=approaches_prompt,
        temperature=0.8  # Higher temp for diversity
    )

    # Step 2: Evaluate each approach
    eval_prompt = f"""
    Here are different approaches to solve a problem:

    {approaches}

    Evaluate each approach on:
    - Likelihood of success
    - Computational efficiency
    - Clarity

    Which approach is best? Explain why.
    """

    evaluation = client.call(
        system="You are an analytical thinker.",
        user=eval_prompt,
        temperature=0.2
    )

    # Step 3: Solve using best approach
    solve_prompt = f"""
    Problem: {problem}

    Based on this analysis:
    {evaluation}

    Solve the problem using the recommended approach.
    """

    solution = client.call(
        system="You are a methodical problem solver.",
        user=solve_prompt,
        temperature=0.3
    )

    return {
        "approaches": approaches,
        "evaluation": evaluation,
        "solution": solution
    }

# Test
problem = "Design a caching strategy for an API that handles 10,000 requests/sec"
result = solve_with_multiple_approaches(ClaudeClient(), problem)

for key, value in result.items():
    print(f"\n{key.upper()}:\n{value}\n{'-'*50}")
```

**Success criteria**: Generates diverse solutions and picks the best

---

### Day 12-14: Build Complexity Router

**Goal**: Auto-select prompting strategy based on task difficulty

This is a key project from Level 2. See: `/mastery-plan/levels/02-PROMPT-CRAFTSMAN.md`

```python
# complexity_router.py

class ComplexityRouter:
    def __init__(self, client: LLMClient):
        self.client = client

    def analyze_complexity(self, task: str) -> float:
        """Return complexity score 0.0-1.0"""

        analysis_prompt = f"""
        Analyze the complexity of this task on a scale of 0.0 to 1.0.

        Consider:
        - Word count and length
        - Ambiguity (vague vs. specific)
        - Dependencies (steps that depend on other steps)
        - Domain expertise required

        Task: {task}

        Return ONLY a number between 0.0 and 1.0
        """

        result = self.client.call(
            system="You are a task complexity analyzer.",
            user=analysis_prompt,
            temperature=0.0
        )

        try:
            return float(result.strip())
        except:
            return 0.5  # Default to medium

    def route(self, task: str) -> str:
        """Route to appropriate strategy based on complexity"""

        complexity = self.analyze_complexity(task)

        if complexity < 0.3:
            return self._simple_strategy(task)
        elif complexity < 0.7:
            return self._medium_strategy(task)
        else:
            return self._complex_strategy(task)

    def _simple_strategy(self, task: str) -> str:
        """Direct execution for simple tasks"""
        return self.client.call(
            system="Execute this task clearly and concisely.",
            user=task,
            temperature=0.5
        )

    def _medium_strategy(self, task: str) -> str:
        """Multi-approach for medium complexity"""
        return solve_with_multiple_approaches(self.client, task, num_approaches=2)

    def _complex_strategy(self, task: str) -> str:
        """Full Tree-of-Thought for complex tasks"""
        return solve_with_multiple_approaches(self.client, task, num_approaches=3)

# Usage
router = ComplexityRouter(ClaudeClient())

simple_task = "Capitalize the first letter of 'hello'"
complex_task = "Design a distributed rate limiter handling 100,000 requests/sec"

print("Simple task result:", router.route(simple_task))
print("\nComplex task result:", router.route(complex_task))
```

**Week 2 Success Criteria**:
- [ ] Implemented Chain-of-Thought prompting
- [ ] Built multi-path reasoning system
- [ ] Created working complexity router
- [ ] Measured 15%+ quality improvement vs. basic prompts

---

## Week 3: Agents (Level 3)

### Day 15-16: Install LangGraph & Build First Agent

```bash
pip install langgraph langchain langchain-anthropic
```

```python
# first_agent.py
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
import operator

# Define state
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    next_step: str

# Initialize LLM
llm = ChatAnthropic(model="claude-sonnet-4-5-20250929")

# Define agent nodes
def research_node(state: AgentState):
    """Research information"""
    query = state["messages"][-1]
    result = llm.invoke(f"Research: {query}")
    return {
        "messages": [f"Research findings: {result.content}"],
        "next_step": "analyze"
    }

def analyze_node(state: AgentState):
    """Analyze research"""
    research = state["messages"][-1]
    result = llm.invoke(f"Analyze these findings: {research}")
    return {
        "messages": [f"Analysis: {result.content}"],
        "next_step": "end"
    }

# Build graph
workflow = StateGraph(AgentState)
workflow.add_node("research", research_node)
workflow.add_node("analyze", analyze_node)

workflow.set_entry_point("research")
workflow.add_edge("research", "analyze")
workflow.add_edge("analyze", END)

# Compile
app = workflow.compile()

# Run
result = app.invoke({
    "messages": ["What are the latest trends in AI agents?"],
    "next_step": "research"
})

for message in result["messages"]:
    print(message)
    print("-" * 50)
```

**Success criteria**: Agent completes multi-step workflow

---

### Day 17-21: Build Research Agent Swarm

**Goal**: 4-agent system that researches topics comprehensively

See full implementation in: `/mastery-plan/levels/03-AGENT-CONDUCTOR.md`

**Architecture**:
```
User Query → Searcher Agent → Analyzer Agent → Critic Agent → Synthesizer Agent → Final Report
```

**Week 3 Success Criteria**:
- [ ] Built first LangGraph agent
- [ ] Created 4-agent research swarm
- [ ] Implemented shared memory
- [ ] Produced human-competitive research summaries

---

## Week 4: Knowledge Systems (Level 4)

### Day 22-23: Vector Database Setup

```bash
pip install chromadb sentence-transformers
```

```python
# vector_store.py
import chromadb
from chromadb.utils import embedding_functions

class SimpleRAG:
    def __init__(self):
        self.client = chromadb.Client()
        self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
        self.collection = self.client.create_collection(
            name="knowledge_base",
            embedding_function=self.embedding_fn
        )

    def add_documents(self, documents: List[str], ids: List[str]):
        """Add documents to vector store"""
        self.collection.add(
            documents=documents,
            ids=ids
        )

    def search(self, query: str, n_results: int = 5) -> List[str]:
        """Semantic search"""
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results
        )
        return results["documents"][0]

# Usage
rag = SimpleRAG()

# Add knowledge
rag.add_documents(
    documents=[
        "AI agents are autonomous systems that can take actions",
        "RAG combines retrieval with generation for factual responses",
        "Fine-tuning adapts pre-trained models to specific tasks"
    ],
    ids=["doc1", "doc2", "doc3"]
)

# Query
results = rag.search("What are AI agents?")
print(results)
```

---

### Day 24-28: Build Production RAG System

**Features**:
- Semantic chunking
- Hybrid retrieval (dense + sparse)
- Reranking
- Quality evaluation

See full implementation in: `/mastery-plan/levels/04-KNOWLEDGE-ALCHEMIST.md`

**Week 4 Success Criteria**:
- [ ] Set up vector database
- [ ] Implemented semantic chunking
- [ ] Built hybrid retrieval
- [ ] Achieved 80%+ accuracy on domain QA

---

## Week 4 Final Project: End-to-End AI System

**Goal**: Combine everything into one production-ready system

```
User Input
    ↓
Complexity Router (Level 2)
    ↓
Agent Swarm (Level 3)
    ↓
RAG Knowledge Base (Level 4)
    ↓
LLM with Retry & Tracking (Level 1)
    ↓
Auto-Evaluated Output
```

Build this, deploy it, and you're ready for Level 5.

---

## Graduation Criteria: 30-Day Checkpoint

### Technical Skills
- [ ] Can call 3+ LLM APIs with unified interface
- [ ] Implemented CoT, ToT, and complexity routing
- [ ] Built multi-agent system with LangGraph
- [ ] Created RAG with 80%+ accuracy
- [ ] Tracks costs and evaluates quality automatically

### Projects Shipped
- [ ] Smart Summarizer
- [ ] Complexity Router
- [ ] Research Agent Swarm
- [ ] RAG Knowledge System
- [ ] Integrated End-to-End System

### Knowledge Demonstrated
- [ ] Can explain when to use RAG vs. fine-tuning
- [ ] Understands token economics and cost optimization
- [ ] Knows trade-offs between prompt strategies
- [ ] Can debug LLM failures systematically

### Next Steps
- [ ] Read Level 5 material: Reasoning & Fine-Tuning
- [ ] Start QLoRA fine-tuning project
- [ ] Join AI engineering community
- [ ] Begin teaching others what you've learned

---

## Troubleshooting

### "API calls are too expensive"
- Use Claude Haiku for simple tasks ($0.00025/1K tokens)
- Implement caching (30-70% cost reduction)
- Start with smaller context windows
- Use local models (Llama) for development

### "My prompts don't work consistently"
- Lower temperature (0.0-0.3 for consistency)
- Add few-shot examples
- Use Chain-of-Thought
- Implement retry with voting (3 attempts, pick majority)

### "Agents fail unpredictably"
- Add comprehensive error handling
- Log all state transitions
- Implement fallback strategies
- Test edge cases explicitly

### "RAG retrieval is poor"
- Improve chunking (semantic > fixed-size)
- Add reranking step
- Use hybrid search (dense + BM25)
- Tune top-k parameter (try 3, 5, 10, 20)

---

## Resources

### Documentation
- [Anthropic Docs](https://docs.anthropic.com/)
- [OpenAI Docs](https://platform.openai.com/docs/)
- [LangChain Docs](https://python.langchain.com/)
- [LangGraph Docs](https://langchain-ai.github.io/langgraph/)

### Papers to Read
- "Attention Is All You Need" (Vaswani et al., 2017)
- "Chain-of-Thought Prompting" (Wei et al., 2022)
- "ReAct: Reasoning + Acting" (Yao et al., 2023)

### Communities
- LangChain Discord
- Anthropic Discord
- /r/LocalLLaMA
- Hugging Face Forums

---

**You're ready. Start Day 1 now.** → [Set up your environment](#day-1-environment-setup)
