# Level 1 Diagnostic Assessment: Foundation Builder

**Duration**: 45-60 minutes
**Passing Score**: 80% (32/40 points)
**Format**: Code review + Implementation + Conceptual questions

---

## Part 1: Code Review (15 points)

### Task
Review this code and identify ALL issues. For each issue, explain:
1. What's wrong
2. Why it's a problem
3. How to fix it

```python
import openai

def ask_ai(question):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": question}]
    )
    return response.choices[0].message.content

# Ask multiple questions
questions = [
    "What is AI?",
    "Explain machine learning",
    "What is deep learning?"
]

for q in questions:
    answer = ask_ai(q)
    print(answer)
```

### Scoring Rubric (15 points total)

**Critical Issues** (must identify to pass):
- [ ] **API key hardcoding/missing** (3 points)
  - Problem: No API key configuration
  - Fix: Use environment variables

- [ ] **No error handling** (3 points)
  - Problem: Will crash on any API error
  - Fix: Try-except blocks

- [ ] **Missing import** (2 points)
  - Problem: `openai` not imported properly
  - Fix: `from openai import OpenAI`

**Important Issues**:
- [ ] **No retry logic** (2 points)
  - Problem: Single failure kills entire process
  - Fix: Exponential backoff retry

- [ ] **No token tracking** (2 points)
  - Problem: Unknown cost
  - Fix: Count tokens, track cost

- [ ] **Sequential processing** (2 points)
  - Problem: Slow for multiple questions
  - Fix: Could use async/concurrent requests

- [ ] **No response validation** (1 point)
  - Problem: Assumes response is always valid
  - Fix: Check response structure

**Bonus**:
- Mentioned logging (+1)
- Mentioned caching (+1)
- Suggested system prompt (+1)

---

## Part 2: Implementation Task (15 points)

### Task
Implement a function that:
1. Calls an LLM API with retry logic
2. Tracks token usage
3. Handles errors gracefully
4. Returns both response and metadata

**Signature**:
```python
def call_llm_with_tracking(
    prompt: str,
    max_retries: int = 3
) -> dict:
    """
    Call LLM with retry logic and tracking

    Returns:
        {
            "response": str,
            "tokens": int,
            "cost": float,
            "retries_used": int,
            "success": bool
        }
    """
    pass
```

### Scoring Rubric (15 points)

**Core Functionality** (10 points):
- [ ] Makes API call correctly (2 points)
- [ ] Implements retry with exponential backoff (3 points)
- [ ] Tracks tokens accurately (2 points)
- [ ] Calculates cost correctly (2 points)
- [ ] Returns correct dictionary structure (1 point)

**Error Handling** (3 points):
- [ ] Catches API errors (1 point)
- [ ] Provides error messages (1 point)
- [ ] Sets success=False on failure (1 point)

**Code Quality** (2 points):
- [ ] Type hints present (1 point)
- [ ] Clean, readable code (1 point)

### Example Test Cases

```python
# Test 1: Successful call
result = call_llm_with_tracking("What is 2+2?")
assert result["success"] == True
assert "response" in result
assert result["tokens"] > 0
assert result["cost"] > 0

# Test 2: Error handling
# (Mock network failure)
result = call_llm_with_tracking("test", max_retries=2)
# Should not crash, should return success=False
```

---

## Part 3: Conceptual Questions (10 points)

### Question 1: Token Economics (3 points)

**Scenario**: You're building an app that summarizes user documents.
- Average document: 5,000 words (~6,600 tokens)
- Expected summaries: ~200 tokens
- You estimate 1,000 users/day

**Part A** (1.5 points): Calculate daily cost using:
- Claude Sonnet: $0.003/1K input, $0.015/1K output

**Part B** (1.5 points): What optimizations would reduce costs by 50%?

**Answers**:
- Part A:
  - Input: 1,000 * 6,600 = 6.6M tokens = $19.80
  - Output: 1,000 * 200 = 200K tokens = $3.00
  - Total: ~$23/day

- Part B (any 3 of these):
  - Use caching (dedupe similar docs)
  - Use cheaper model (Claude Haiku)
  - Reduce prompt length
  - Batch processing
  - Compress prompts

---

### Question 2: Error Handling (2 points)

**Question**: Rank these errors by how you should handle them (1 = retry, 2 = fail fast, 3 = fallback):

- [ ] `RateLimitError` (too many requests)
- [ ] `AuthenticationError` (invalid API key)
- [ ] `APIConnectionError` (network timeout)
- [ ] `BadRequestError` (invalid parameters)

**Correct Answer** (2 points if all correct, 1 point if 3/4 correct):
1. **Retry**: RateLimitError (wait and retry)
2. **Retry**: APIConnectionError (temporary network issue)
3. **Fail fast**: AuthenticationError (won't fix itself)
4. **Fail fast**: BadRequestError (code bug, need to fix)

---

### Question 3: Model Selection (3 points)

**Question**: For each task, which model would you choose and why?

**Tasks**:
A. Classify email as spam/not spam (returns "spam" or "not spam")
B. Write a creative marketing blog post (500 words)
C. Answer complex technical question requiring deep reasoning

**Models Available**:
- Claude Haiku: $0.00025/1K input, Fast, Good for simple tasks
- Claude Sonnet: $0.003/1K input, Balanced, Good general purpose
- GPT-4: $0.03/1K input, Expensive, Best reasoning

**Correct Answers** (1 point each):
- A: **Haiku** - Simple classification, cheap, fast
- B: **Sonnet** - Creative but not needing deep reasoning
- C: **GPT-4** - Complex reasoning worth the cost

---

### Question 4: Quality Evaluation (2 points)

**Question**: You're evaluating summary quality. Rank these evaluation methods from most to least reliable:

- [ ] Manual human review
- [ ] LLM-as-judge (use another LLM to score)
- [ ] Simple heuristics (length, keyword presence)
- [ ] User feedback ratings

**Correct Order** (2 points if all correct, 1 point if 3/4 correct):
1. **Manual human review** - Most accurate but doesn't scale
2. **User feedback ratings** - Real-world measure
3. **LLM-as-judge** - Scales well, generally accurate
4. **Simple heuristics** - Fastest but least reliable

---

## Part 4: Bonus Challenge (Optional, +5 points)

### Task: Cost Optimization

Given this code:
```python
def process_documents(documents: List[str]):
    summaries = []
    for doc in documents:
        summary = client.call(
            system="Summarize this",
            user=doc
        )
        summaries.append(summary)
    return summaries
```

**Challenge**: Rewrite to reduce costs by at least 40% while maintaining quality.

**Possible Solutions** (5 points for implementing 3+):
- [ ] Add caching for duplicate documents
- [ ] Use cheaper model for simple docs
- [ ] Batch similar documents
- [ ] Compress prompts
- [ ] Use async for parallel processing (reduces time, not cost, but shows skill)

---

## Scoring

| Section | Points | Your Score |
|---------|--------|------------|
| Part 1: Code Review | 15 | |
| Part 2: Implementation | 15 | |
| Part 3: Conceptual | 10 | |
| **Total** | **40** | |
| Bonus Challenge | +5 | |

**Grading**:
- **32-40 points (80%+)**: ✅ Pass - Ready for Level 2
- **28-31 points (70-79%)**: ⚠️ Review weak areas, retake in 1 week
- **Below 28 points (<70%)**: ❌ Spend more time on Level 1, retake in 2 weeks

---

## Solutions & Explanations

### Part 1: Code Review - Sample Answer

```python
import os
from openai import OpenAI
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

def ask_ai(question: str, max_retries: int = 3) -> str:
    """
    Ask AI with retry logic and error handling

    Issues fixed:
    1. ✅ API key from environment
    2. ✅ Proper error handling
    3. ✅ Retry with exponential backoff
    4. ✅ Type hints
    5. ✅ Logging/tracking could be added
    """
    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are helpful"},
                    {"role": "user", "content": question}
                ]
            )
            return response.choices[0].message.content

        except Exception as e:
            if attempt == max_retries - 1:
                raise

            wait_time = 2 ** attempt
            print(f"Retry {attempt + 1} after {wait_time}s")
            time.sleep(wait_time)

# Rest of code...
```

### Part 2: Implementation - Sample Answer

```python
import os
from anthropic import Anthropic
import tiktoken
import time

def call_llm_with_tracking(
    prompt: str,
    max_retries: int = 3
) -> dict:
    client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    encoding = tiktoken.get_encoding("cl100k_base")

    for attempt in range(max_retries):
        try:
            # Make API call
            response = client.messages.create(
                model="claude-sonnet-4-5-20250929",
                max_tokens=1024,
                messages=[{"role": "user", "content": prompt}]
            )

            # Extract response text
            response_text = response.content[0].text

            # Count tokens
            input_tokens = len(encoding.encode(prompt))
            output_tokens = len(encoding.encode(response_text))
            total_tokens = input_tokens + output_tokens

            # Calculate cost (Claude Sonnet pricing)
            cost = (input_tokens / 1000 * 0.003 +
                    output_tokens / 1000 * 0.015)

            return {
                "response": response_text,
                "tokens": total_tokens,
                "cost": cost,
                "retries_used": attempt,
                "success": True
            }

        except Exception as e:
            if attempt == max_retries - 1:
                return {
                    "response": "",
                    "tokens": 0,
                    "cost": 0.0,
                    "retries_used": attempt,
                    "success": False,
                    "error": str(e)
                }

            wait_time = 2 ** attempt
            time.sleep(wait_time)
```

---

## What's Next?

### If You Passed (≥80%):
Congratulations! You're ready for Level 2.

```bash
# Start Level 2
python cli.py start-level 2
```

**Level 2 Preview**: Prompt Craftsman
- Chain-of-Thought prompting
- Tree-of-Thought reasoning
- Complexity routing
- Meta-prompting basics

### If You Need More Practice (<80%):

**Focus areas by score**:
- **Code Review (<10/15)**: Review error handling patterns, best practices
- **Implementation (<10/15)**: Build more projects, study retry logic
- **Conceptual (<6/10)**: Study token economics, model selection

**Resources**:
- Review [Level 1 Week-by-Week](../../levels/01-foundation-builder/week-by-week.md)
- Study [Smart Summarizer example](../../examples/01-smart-summarizer/)
- Join office hours for help

**Retake**: Schedule retake after addressing weak areas (1-2 weeks)

---

*Assessment v1.0 | Level 1: Foundation Builder | AI Engineer Mastery*
