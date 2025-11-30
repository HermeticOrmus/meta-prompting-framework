# Level 1: Week-by-Week Breakdown

> Daily tasks with time estimates, learning objectives, and deliverables

---

## Week 1: API Fundamentals

**Goal**: Make reliable API calls to multiple LLM providers
**Total Time**: ~17 hours

### Monday - Day 1 (2 hours)

#### Morning: Environment Setup (1h)
**Tasks**:
- [ ] Install Python 3.10+ (if needed)
- [ ] Create project directory: `mkdir ai-mastery-level-1 && cd ai-mastery-level-1`
- [ ] Set up virtual environment: `python -m venv venv && source venv/bin/activate`
- [ ] Install core packages: `pip install anthropic openai python-dotenv`
- [ ] Get API keys from Anthropic and OpenAI
- [ ] Create `.env` file with keys

**Deliverable**: Working Python environment with API keys configured

#### Afternoon: First API Call (1h)
**Tasks**:
- [ ] Create `test_api.py`
- [ ] Import Anthropic client
- [ ] Make first successful Claude API call
- [ ] Print response
- [ ] Celebrate! 🎉

**Code to write**:
```python
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

**Resources**:
- [Anthropic Quickstart](https://docs.anthropic.com/en/api/getting-started)
- [Environment Variables Tutorial](https://python-dotenv-tutorial.com/)

**Expected output**: Claude's response printed to terminal

---

### Tuesday - Day 2 (2 hours)

#### Build Basic LLM Wrapper Class

**Objective**: Create abstraction layer for LLM calls

**Tasks**:
- [ ] Create `llm_client.py`
- [ ] Design `LLMClient` abstract base class
- [ ] Implement `ClaudeClient`
- [ ] Implement `OpenAIClient`
- [ ] Test both clients

**Code structure**:
```python
from abc import ABC, abstractmethod

class LLMClient(ABC):
    @abstractmethod
    def call(self, system: str, user: str, temperature: float = 0.7) -> str:
        """Make LLM API call"""
        pass

class ClaudeClient(LLMClient):
    def __init__(self):
        # Implementation here
        pass

    def call(self, system: str, user: str, temperature: float = 0.7) -> str:
        # Implementation here
        pass

class OpenAIClient(LLMClient):
    # Similar structure
    pass
```

**Deliverable**: Can switch between Claude and GPT-4 by changing one line

**Test**:
```python
# Switch providers easily
client = ClaudeClient()
# client = OpenAIClient()  # Just uncomment!

response = client.call(
    system="You are a helpful assistant",
    user="What is 2+2?"
)
print(response)
```

**Resources**:
- [ABC Module Documentation](https://docs.python.org/3/library/abc.html)
- [OpenAI Python SDK](https://github.com/openai/openai-python)

---

### Wednesday - Day 3 (3 hours)

#### Add Error Handling and Retries

**Objective**: Make your client robust against failures

**Tasks**:
- [ ] Add try-except blocks for API errors
- [ ] Implement exponential backoff
- [ ] Test retry logic
- [ ] Add logging

**Pattern to implement**:
```python
import time
from typing import Optional

def call_with_retry(
    self,
    system: str,
    user: str,
    temperature: float = 0.7,
    max_retries: int = 3
) -> str:
    """Call LLM with automatic retry on failure"""

    for attempt in range(max_retries):
        try:
            # Make API call
            return self.call(system, user, temperature)

        except Exception as e:
            if attempt == max_retries - 1:
                # Last attempt failed
                raise

            # Exponential backoff: 1s, 2s, 4s
            wait_time = 2 ** attempt
            print(f"Retry {attempt + 1}/{max_retries} after {wait_time}s...")
            time.sleep(wait_time)
```

**Error types to handle**:
- `RateLimitError`: Too many requests
- `APIConnectionError`: Network issues
- `AuthenticationError`: Invalid API key
- `BadRequestError`: Invalid parameters

**Deliverable**: Client that handles failures gracefully

**Test scenarios**:
1. Disconnect internet → should retry → reconnect → should succeed
2. Invalid API key → should fail with clear message
3. Rate limit hit → should wait and retry

**Resources**:
- [Error Handling Best Practices](https://realpython.com/python-exceptions/)
- [Exponential Backoff Explained](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)

---

### Thursday - Day 4 (2 hours)

#### Implement Token Tracking

**Objective**: Understand and track token usage/costs

**Tasks**:
- [ ] Install `tiktoken`: `pip install tiktoken`
- [ ] Add token counting function
- [ ] Track cumulative tokens
- [ ] Calculate estimated costs
- [ ] Display stats

**Code to add**:
```python
import tiktoken

class TokenTracker:
    def __init__(self):
        self.total_tokens = 0
        self.total_cost = 0.0
        self.encoding = tiktoken.get_encoding("cl100k_base")

    def count_tokens(self, text: str) -> int:
        """Count tokens in text"""
        return len(self.encoding.encode(text))

    def track_call(self, system: str, user: str, response: str, model: str):
        """Track token usage and cost"""
        input_tokens = self.count_tokens(system + user)
        output_tokens = self.count_tokens(response)
        total = input_tokens + output_tokens

        # Pricing (as of 2025-01)
        prices = {
            "claude-sonnet": {"input": 0.003, "output": 0.015},
            "gpt-4": {"input": 0.03, "output": 0.06}
        }

        price = prices.get(model, {"input": 0.01, "output": 0.01})
        cost = (input_tokens / 1000 * price["input"] +
                output_tokens / 1000 * price["output"])

        self.total_tokens += total
        self.total_cost += cost

        return {
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "total_tokens": total,
            "cost": cost
        }

    def get_stats(self):
        return {
            "total_tokens": self.total_tokens,
            "total_cost": f"${self.total_cost:.4f}"
        }
```

**Deliverable**: Client that shows token usage and cost after each call

**Expected output**:
```
Response: [Claude's answer]

Stats:
- Input tokens: 24
- Output tokens: 156
- Total tokens: 180
- This call: $0.0027
- Session total: $0.0154
```

**Resources**:
- [Tiktoken Documentation](https://github.com/openai/tiktoken)
- [Token Counting Guide](https://help.openai.com/en/articles/4936856)
- [LLM Pricing Comparison](https://docsbot.ai/tools/gpt-openai-api-pricing-calculator)

---

### Friday - Day 5 (3 hours)

#### Multi-Provider Support

**Objective**: Support 3+ LLM providers with unified interface

**Tasks**:
- [ ] Refactor to factory pattern
- [ ] Add provider selection
- [ ] Test all providers
- [ ] Document usage

**Factory pattern**:
```python
class LLMClientFactory:
    @staticmethod
    def create(provider: str, **kwargs) -> LLMClient:
        providers = {
            "claude": ClaudeClient,
            "openai": OpenAIClient,
            "local": LocalModelClient  # Optional
        }

        if provider not in providers:
            raise ValueError(f"Unknown provider: {provider}")

        return providers[provider](**kwargs)

# Usage
client = LLMClientFactory.create("claude")
response = client.call(system="...", user="...")
```

**Optional**: Add support for local models (Llama, Mistral)
```python
from ollama import Client as OllamaClient

class LocalModelClient(LLMClient):
    def __init__(self, model: str = "llama2"):
        self.client = OllamaClient()
        self.model = model

    def call(self, system: str, user: str, temperature: float = 0.7) -> str:
        # Implementation for Ollama
        pass
```

**Deliverable**: Can switch providers with one line: `create("claude")` → `create("openai")`

**Resources**:
- [Factory Pattern in Python](https://realpython.com/factory-pattern-python/)
- [Ollama Python SDK](https://github.com/ollama/ollama-python) (optional)

---

### Weekend - Days 6-7 (5 hours total)

#### Project 1: Universal LLM Client (Complete Implementation)

**Objective**: Bring everything together into a polished package

**Tasks**:
- [ ] Refactor code into clean modules
- [ ] Add comprehensive documentation
- [ ] Write tests (at least basic smoke tests)
- [ ] Create example usage scripts
- [ ] Write README

**File structure**:
```
project-1-llm-client/
├── README.md
├── requirements.txt
├── .env.example
├── src/
│   ├── __init__.py
│   ├── base.py           # Abstract base class
│   ├── claude_client.py  # Claude implementation
│   ├── openai_client.py  # OpenAI implementation
│   ├── factory.py        # Factory pattern
│   └── token_tracker.py  # Token tracking
├── tests/
│   ├── test_claude.py
│   └── test_openai.py
└── examples/
    ├── basic_usage.py
    └── compare_providers.py
```

**Features to include**:
- ✅ Multi-provider support (Claude, OpenAI, +1 optional)
- ✅ Retry logic with exponential backoff
- ✅ Token tracking and cost calculation
- ✅ Structured logging
- ✅ Type hints
- ✅ Documentation
- ✅ Tests

**Example usage**:
```python
from src.factory import LLMClientFactory

# Create client
client = LLMClientFactory.create("claude")

# Make call
response = client.call(
    system="You are a helpful coding assistant",
    user="Explain list comprehensions in Python"
)

print(f"Response: {response}")
print(f"Stats: {client.get_stats()}")
```

**Deliverable**: Complete, documented, tested Universal LLM Client

**Self-review checklist**:
- [ ] Can switch providers easily
- [ ] Handles errors gracefully
- [ ] Tracks tokens and costs
- [ ] Has clear documentation
- [ ] Includes example scripts
- [ ] No hardcoded secrets

---

## Week 2: Production Patterns

**Goal**: Build production-ready LLM applications
**Total Time**: ~17 hours

### Monday - Day 8 (2 hours)

#### Logging and Observability

**Objective**: Add structured logging for debugging and monitoring

**Tasks**:
- [ ] Set up Python logging
- [ ] Log all API calls
- [ ] Log token usage
- [ ] Log errors with context
- [ ] Create log analysis script

**Logging setup**:
```python
import logging
import json
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('llm_calls.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

class LoggingLLMClient(LLMClient):
    def call(self, system: str, user: str, temperature: float = 0.7) -> str:
        # Log request
        logger.info(f"LLM Call", extra={
            "provider": self.provider,
            "system_prompt_length": len(system),
            "user_prompt_length": len(user),
            "temperature": temperature,
            "timestamp": datetime.now().isoformat()
        })

        try:
            response = super().call(system, user, temperature)

            # Log success
            logger.info(f"LLM Response", extra={
                "response_length": len(response),
                "success": True
            })

            return response

        except Exception as e:
            # Log failure
            logger.error(f"LLM Error", extra={
                "error_type": type(e).__name__,
                "error_message": str(e)
            })
            raise
```

**Deliverable**: All API calls logged with timestamps, costs, and outcomes

**Log analysis**:
```python
# analyze_logs.py
import json

total_calls = 0
total_cost = 0.0
errors = 0

with open('llm_calls.log') as f:
    for line in f:
        if 'LLM Call' in line:
            total_calls += 1
        if 'LLM Error' in line:
            errors += 1

print(f"Total calls: {total_calls}")
print(f"Error rate: {errors/total_calls:.1%}")
```

---

### Tuesday - Day 9 (2 hours)

#### Quality Evaluation Framework

**Objective**: Systematically measure output quality

**Tasks**:
- [ ] Define quality metrics
- [ ] Build evaluator class
- [ ] Test on sample outputs
- [ ] Create evaluation rubric

**Evaluator implementation**:
```python
class QualityEvaluator:
    def __init__(self, llm_client: LLMClient):
        self.client = llm_client

    def evaluate(self, response: str, criteria: List[str]) -> Dict[str, float]:
        """
        Evaluate response quality on multiple criteria

        Returns scores 0.0-1.0 for each criterion
        """

        eval_prompt = f"""
        Evaluate this response on the following criteria.
        Score each from 0.0 to 1.0.

        Response: {response}

        Criteria:
        {chr(10).join(f"- {c}" for c in criteria)}

        Return ONLY a JSON object with scores:
        {{"criterion_name": 0.0-1.0, ...}}
        """

        result = self.client.call(
            system="You are an objective evaluator. Return only valid JSON.",
            user=eval_prompt,
            temperature=0.0  # Low temp for consistency
        )

        try:
            scores = json.loads(result)
            return scores
        except json.JSONDecodeError:
            return {"error": "Could not parse evaluation"}

    def evaluate_summary(self, original: str, summary: str) -> Dict[str, float]:
        """Specialized evaluator for summaries"""
        criteria = [
            "Captures main points",
            "Appropriate length",
            "Clear language",
            "No hallucinations"
        ]
        return self.evaluate(summary, criteria)
```

**Deliverable**: Can automatically score outputs on custom criteria

---

### Wednesday - Day 10 (3 hours)

#### Structured Output Generation

**Objective**: Generate JSON, XML, and structured formats reliably

**Tasks**:
- [ ] Implement JSON output parser
- [ ] Add schema validation
- [ ] Handle malformed outputs
- [ ] Test edge cases

**Structured output pattern**:
```python
from pydantic import BaseModel
from typing import List
import json

class StructuredOutputGenerator:
    def __init__(self, llm_client: LLMClient):
        self.client = llm_client

    def generate_json(
        self,
        prompt: str,
        schema: BaseModel,
        max_retries: int = 3
    ) -> BaseModel:
        """Generate structured JSON output matching schema"""

        system = f"""
        You are a structured data generator.
        Return ONLY valid JSON matching this schema:
        {schema.schema_json(indent=2)}

        No additional text. Just the JSON.
        """

        for attempt in range(max_retries):
            response = self.client.call(
                system=system,
                user=prompt,
                temperature=0.0
            )

            try:
                # Parse and validate against schema
                data = json.loads(response)
                return schema(**data)

            except (json.JSONDecodeError, ValueError) as e:
                if attempt == max_retries - 1:
                    raise ValueError(f"Failed to generate valid JSON: {e}")
                continue

# Example usage
class MovieReview(BaseModel):
    title: str
    rating: float
    summary: str
    tags: List[str]

generator = StructuredOutputGenerator(client)
review = generator.generate_json(
    prompt="Generate a review for The Matrix",
    schema=MovieReview
)
print(review.model_dump_json(indent=2))
```

**Deliverable**: Reliable structured output generation with validation

---

### Thursday - Day 11 (2 hours)

#### Caching Strategies

**Objective**: Reduce costs and latency with smart caching

**Tasks**:
- [ ] Implement simple cache (dict-based)
- [ ] Add cache key generation
- [ ] Test cache hits/misses
- [ ] Measure cost savings

**Simple cache**:
```python
import hashlib
from typing import Optional

class CachedLLMClient(LLMClient):
    def __init__(self, base_client: LLMClient):
        self.client = base_client
        self.cache = {}
        self.hits = 0
        self.misses = 0

    def _cache_key(self, system: str, user: str, temperature: float) -> str:
        """Generate cache key from inputs"""
        content = f"{system}|{user}|{temperature}"
        return hashlib.md5(content.encode()).hexdigest()

    def call(self, system: str, user: str, temperature: float = 0.7) -> str:
        key = self._cache_key(system, user, temperature)

        # Check cache
        if key in self.cache:
            self.hits += 1
            return self.cache[key]

        # Cache miss - call API
        self.misses += 1
        response = self.client.call(system, user, temperature)
        self.cache[key] = response

        return response

    def get_cache_stats(self):
        total = self.hits + self.misses
        hit_rate = self.hits / total if total > 0 else 0
        return {
            "hits": self.hits,
            "misses": self.misses,
            "hit_rate": f"{hit_rate:.1%}",
            "cost_savings": f"~{hit_rate * 100:.0f}%"
        }
```

**Deliverable**: Caching system reducing redundant API calls

---

### Friday - Day 12 (3 hours)

#### Cost Optimization

**Objective**: Minimize costs while maintaining quality

**Strategies to implement**:
1. Prompt compression
2. Model selection (use cheaper models for simple tasks)
3. Batching
4. Smart caching

**Model router**:
```python
class CostOptimizedClient:
    def __init__(self):
        self.cheap_client = LLMClientFactory.create("claude-haiku")
        self.expensive_client = LLMClientFactory.create("claude-sonnet")

    def call(self, system: str, user: str, complexity: str = "auto") -> str:
        """Route to appropriate model based on complexity"""

        if complexity == "auto":
            complexity = self._estimate_complexity(user)

        if complexity == "simple":
            return self.cheap_client.call(system, user)
        else:
            return self.expensive_client.call(system, user)

    def _estimate_complexity(self, prompt: str) -> str:
        """Simple heuristic for complexity"""
        # Simple rules (will improve in Level 2!)
        if len(prompt) < 100 and "explain" not in prompt.lower():
            return "simple"
        return "complex"
```

**Deliverable**: Cost-optimized client routing to appropriate models

---

### Weekend - Days 13-14 (5 hours)

#### Refine Project 1

**Tasks**:
- [ ] Integrate all Week 2 patterns
- [ ] Add comprehensive examples
- [ ] Write full documentation
- [ ] Create comparison benchmarks
- [ ] Optimize performance

**Benchmark script**:
```python
# benchmark.py
import time

providers = ["claude", "openai"]
prompts = [
    "What is 2+2?",
    "Explain quantum computing",
    "Write a Python function to reverse a string"
]

for provider in providers:
    client = LLMClientFactory.create(provider)

    print(f"\n{provider.upper()} Benchmark:")
    for prompt in prompts:
        start = time.time()
        response = client.call("You are helpful", prompt)
        elapsed = time.time() - start

        print(f"  - Latency: {elapsed:.2f}s")
        print(f"  - Length: {len(response)} chars")
        print(f"  - Cost: ${client.last_call_cost:.4f}")
```

**Final deliverable**: Production-ready Universal LLM Client v1.0

---

## Week 3: Real Application

**Goal**: Ship a complete, polished system
**Total Time**: ~17 hours

### Days 15-16 (4 hours)

#### Build Smart Summarizer Core

**Tasks**:
- [ ] Create `summarizer.py`
- [ ] Implement multiple styles
- [ ] Add prompt templates
- [ ] Test on various documents

**Core implementation**:
```python
class SmartSummarizer:
    def __init__(self, client: LLMClient):
        self.client = client
        self.evaluator = QualityEvaluator(client)

    STYLE_PROMPTS = {
        "concise": "Summarize in 2-3 sentences. Be direct and clear.",
        "detailed": "Provide comprehensive summary with key points as bullets.",
        "eli5": "Explain like I'm 5 years old. Use simple words and analogies.",
        "academic": "Professional academic summary with proper terminology.",
        "bullet": "Summarize as bullet points only. 5-7 bullets max."
    }

    def summarize(
        self,
        text: str,
        style: str = "concise",
        evaluate: bool = True
    ) -> Dict:
        """Summarize text in specified style"""

        if style not in self.STYLE_PROMPTS:
            raise ValueError(f"Unknown style: {style}")

        system = self.STYLE_PROMPTS[style]
        user = f"Summarize this:\n\n{text}"

        summary = self.client.call(system, user, temperature=0.3)

        result = {"summary": summary}

        if evaluate:
            scores = self.evaluator.evaluate_summary(text, summary)
            result["quality_scores"] = scores

        result["stats"] = self.client.get_stats()

        return result
```

---

### Day 17 (3 hours)

#### Add Quality Evaluation

**Tasks**:
- [ ] Integrate evaluator
- [ ] Add custom evaluation criteria
- [ ] Test evaluation accuracy
- [ ] Display scores nicely

---

### Day 18 (2 hours)

#### CLI Interface

**Tasks**:
- [ ] Install `typer`: `pip install typer rich`
- [ ] Create CLI with subcommands
- [ ] Add progress bars
- [ ] Pretty output formatting

**CLI structure**:
```python
import typer
from rich.console import Console

app = typer.Typer()
console = Console()

@app.command()
def summarize(
    file_path: str,
    style: str = "concise",
    evaluate: bool = True
):
    """Summarize a document"""

    with open(file_path) as f:
        text = f.read()

    summarizer = SmartSummarizer(client)

    with console.status("[bold green]Summarizing..."):
        result = summarizer.summarize(text, style, evaluate)

    console.print("\n[bold]Summary:[/bold]")
    console.print(result["summary"])

    if evaluate:
        console.print("\n[bold]Quality Scores:[/bold]")
        for criterion, score in result["quality_scores"].items():
            console.print(f"  - {criterion}: {score:.2f}")

if __name__ == "__main__":
    app()
```

---

### Day 19 (3 hours)

#### Testing and Documentation

**Tasks**:
- [ ] Write unit tests
- [ ] Test edge cases
- [ ] Write comprehensive README
- [ ] Add usage examples
- [ ] Create demo video (optional)

---

### Weekend - Days 20-21 (5 hours)

#### Polish and Deployment

**Tasks**:
- [ ] Final code review
- [ ] Performance optimization
- [ ] Add error messages
- [ ] Package for distribution
- [ ] Deploy (optional: PyPI, Docker)

**Final self-assessment**:
- [ ] Both projects working flawlessly
- [ ] Code is clean and documented
- [ ] Can explain all concepts
- [ ] Ready for Level 2

---

## Graduation Checklist

Before moving to Level 2, verify:

### Knowledge
- [ ] Can explain how LLM APIs work
- [ ] Understand token economics
- [ ] Know when to use different models
- [ ] Can debug API failures
- [ ] Understand prompt engineering basics

### Skills
- [ ] Built working multi-provider client
- [ ] Implemented error handling
- [ ] Created evaluation system
- [ ] Optimized costs
- [ ] Deployed complete application

### Projects
- [ ] Project 1: Universal LLM Client (complete)
- [ ] Project 2: Smart Summarizer (complete)

### Assessment
- [ ] Took Level 1 diagnostic test
- [ ] Scored ≥80%
- [ ] Reviewed all code
- [ ] Documented learnings

**Congratulations! You're ready for Level 2!** 🎉

---

*Continue to [Level 2: Prompt Craftsman →](../02-prompt-craftsman/README.md)*
