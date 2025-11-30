# Level 1: Foundation Builder 🏗️

> *"Every expert was once a beginner. You're taking the first step."*

## Overview

**Duration**: 2-3 weeks
**Time Commitment**: 15-20 hours/week
**Complexity**: ▓░░░░░░ (Beginner-friendly)

### What You'll Build
By the end of Level 1, you'll have:
- ✅ Universal LLM client supporting 3+ providers
- ✅ Smart Summarizer with quality evaluation
- ✅ Token tracking and cost dashboard
- ✅ Production-ready error handling

### Skills You'll Acquire
| Skill | Description | Mastery Indicator |
|-------|-------------|-------------------|
| **LLM API Integration** | Direct calls to Claude, GPT-4, open models | Can switch providers in <1 hour |
| **Token Economics** | Understanding costs, context windows, limits | Estimate costs within 10% |
| **Error Handling** | Retry logic, exponential backoff, fallbacks | Zero unhandled API failures |
| **Quality Evaluation** | Measuring output quality systematically | Can score outputs 0.0-1.0 |
| **Version Control for AI** | Logging outputs, prompt versioning | All experiments reproducible |

---

## Learning Objectives

### Week 1: API Fundamentals
**Goal**: Make reliable API calls to multiple LLM providers

By end of Week 1, you can:
- [ ] Call Claude API with system + user prompts
- [ ] Call OpenAI GPT-4 API
- [ ] Integrate at least one open-source model
- [ ] Handle API errors gracefully
- [ ] Track token usage and costs

### Week 2: Production Patterns
**Goal**: Build production-ready LLM applications

By end of Week 2, you can:
- [ ] Implement retry logic with exponential backoff
- [ ] Create unified interface for multiple providers
- [ ] Add structured logging
- [ ] Build simple evaluation system
- [ ] Version prompts and track experiments

### Week 3: Real Application
**Goal**: Ship a complete working system

By end of Week 3, you can:
- [ ] Build end-to-end application
- [ ] Evaluate quality automatically
- [ ] Optimize for cost and latency
- [ ] Document and share your work
- [ ] Debug common issues independently

---

## Prerequisites

### Required Knowledge
- ✅ Basic Python (functions, classes, dictionaries, loops)
- ✅ Command line basics (cd, ls, pip, git)
- ✅ Can read documentation and debug errors
- ✅ Comfortable with async/await (helpful but can learn)

### Required Tools
```bash
# Check Python version (need 3.10+)
python --version

# Check pip
pip --version

# Check git
git --version
```

### Required API Keys
- **Anthropic Claude**: https://console.anthropic.com/
- **OpenAI**: https://platform.openai.com/api-keys
- **Budget**: $10-20 for Level 1 experiments

---

## Project 1: Universal LLM Client

### Objective
Create a single interface that works with multiple LLM providers.

### Features
- [ ] Supports Claude (Anthropic)
- [ ] Supports GPT-4 (OpenAI)
- [ ] Supports at least one open-source model (optional)
- [ ] Unified API regardless of provider
- [ ] Automatic retry with exponential backoff
- [ ] Token counting and cost tracking
- [ ] Structured logging

### Success Criteria
```python
# Should be able to do this:
client = LLMClient(provider="claude")
response = client.call(
    system="You are a helpful assistant",
    user="Explain quantum computing in one sentence"
)
print(response)
print(f"Cost: ${client.total_cost:.4f}")

# And switch provider with one line:
client = LLMClient(provider="openai")
# Everything else works the same!
```

### Time Estimate
- Basic version: 4-6 hours
- With retry logic: 8-10 hours
- With cost tracking: 10-12 hours
- Polished + tested: 15-20 hours

**Detailed specs**: See [Project 1 Specifications](./projects.md#project-1)

---

## Project 2: Smart Summarizer

### Objective
Build a document summarizer with automatic quality evaluation.

### Features
- [ ] Multiple summarization styles (concise, detailed, ELI5)
- [ ] Automatic quality scoring
- [ ] Token/cost tracking
- [ ] CLI interface
- [ ] Handles various document formats

### Success Criteria
```bash
# Should work like this:
python summarizer.py article.txt --style concise

# Output:
# SUMMARY: [2-3 sentence summary]
# QUALITY SCORES:
#   - Captures main points: 0.92
#   - Appropriate length: 0.88
#   - Clear language: 0.95
# STATS:
#   - Tokens used: 1,247
#   - Cost: $0.0037
#   - Time: 2.3s
```

### Time Estimate
- Basic summarization: 3-4 hours
- Multiple styles: 5-6 hours
- Quality evaluation: 7-9 hours
- Polish + CLI: 10-15 hours

**Detailed specs**: See [Project 2 Specifications](./projects.md#project-2)

---

## Week-by-Week Breakdown

### Week 1: API Fundamentals
**[Detailed daily plan →](./week-by-week.md#week-1)**

- **Day 1** (2h): Environment setup + first API call
- **Day 2** (2h): Build basic LLM wrapper class
- **Day 3** (3h): Add error handling and retries
- **Day 4** (2h): Implement token tracking
- **Day 5** (3h): Multi-provider support
- **Weekend** (5h): Project 1 implementation

### Week 2: Production Patterns
**[Detailed daily plan →](./week-by-week.md#week-2)**

- **Day 1** (2h): Logging and observability
- **Day 2** (2h): Quality evaluation framework
- **Day 3** (3h): Structured output generation
- **Day 4** (2h): Caching strategies
- **Day 5** (3h): Cost optimization
- **Weekend** (5h): Refine Project 1

### Week 3: Real Application
**[Detailed daily plan →](./week-by-week.md#week-3)**

- **Day 1-2** (4h): Build Smart Summarizer core
- **Day 3** (3h): Add quality evaluation
- **Day 4** (2h): CLI interface
- **Day 5** (3h): Testing and documentation
- **Weekend** (5h): Polish and deployment

---

## Resources

### Essential Reading
1. **[Anthropic API Documentation](https://docs.anthropic.com/)**
   - Focus: Messages API, system prompts, streaming
2. **[OpenAI API Documentation](https://platform.openai.com/docs/)**
   - Focus: Chat completions, function calling
3. **[Python AsyncIO Tutorial](https://realpython.com/async-io-python/)**
   - For handling concurrent API calls

### Recommended Videos
- [LLM APIs Explained (15 min)](https://youtube.com/...)
- [Token Economics 101 (10 min)](https://youtube.com/...)
- [Error Handling Best Practices (20 min)](https://youtube.com/...)

### Tools & Libraries
- **anthropic**: Official Anthropic Python SDK
- **openai**: Official OpenAI Python SDK
- **tiktoken**: Token counting
- **python-dotenv**: Environment variables
- **rich**: Beautiful terminal output

**[Complete resource list →](./resources.md)**

---

## Assessment

### Self-Assessment Checklist
Before advancing to Level 2, verify you can:

**API Integration** (Must complete all)
- [ ] Call Claude API without errors
- [ ] Call OpenAI API without errors
- [ ] Switch between providers easily
- [ ] Explain the difference between system and user prompts
- [ ] Handle rate limits appropriately

**Error Handling** (Must complete all)
- [ ] Implement retry logic with exponential backoff
- [ ] Catch and log all API errors
- [ ] Provide meaningful error messages
- [ ] Test failure scenarios

**Token Economics** (Must complete 4/5)
- [ ] Calculate cost before making API call
- [ ] Track cumulative token usage
- [ ] Explain context window limits
- [ ] Optimize prompts to reduce tokens
- [ ] Choose appropriate model for task (GPT-4 vs GPT-3.5 etc)

**Quality & Evaluation** (Must complete 3/4)
- [ ] Measure output quality systematically
- [ ] Compare different prompts quantitatively
- [ ] Identify when output is poor quality
- [ ] Iterate to improve quality

**Projects** (Must complete both)
- [ ] Project 1: Universal LLM Client working
- [ ] Project 2: Smart Summarizer complete

### Code Review Checklist
Submit your code for review. It should have:
- [ ] Clear documentation (README)
- [ ] Type hints on functions
- [ ] Error handling
- [ ] Tests (at least basic smoke tests)
- [ ] Requirements.txt
- [ ] .env.example with instructions
- [ ] No hardcoded API keys

### Practical Assessment
**Take the [Level 1 Diagnostic Test →](../../assessments/diagnostics/level-1-diagnostic.md)**

- Duration: 30-45 minutes
- Format: Code review + implementation task
- Passing score: 80%

---

## Common Pitfalls & Troubleshooting

### "My API calls are failing"
**Symptoms**: Errors, timeouts, 401/403 responses

**Debug checklist**:
1. Is API key set correctly in .env?
2. Is .env loaded (use `load_dotenv()`)?
3. Check API key has credits
4. Verify rate limits not exceeded
5. Check internet connection

**Solution**: See [Troubleshooting Guide](./troubleshooting.md#api-failures)

### "Costs are higher than expected"
**Symptoms**: Burning through credits quickly

**Debug checklist**:
1. Are you using GPT-4 for everything? (expensive)
2. Check prompt length (reduce if possible)
3. Are you caching responses?
4. Look for accidental infinite loops

**Solution**: See [Cost Optimization Guide](./cost-optimization.md)

### "Don't understand async/await"
**Symptoms**: Confused by `async def` and `await`

**Fix**: You don't need async for Level 1! Use synchronous calls:
```python
# Sync (easier, fine for Level 1)
response = client.messages.create(...)

# Async (more advanced, skip for now)
response = await async_client.messages.create(...)
```

---

## Next Steps

### When you're ready for Level 2:
```bash
# Check completion
python cli.py assess-level

# Start Level 2
python cli.py start-level 2
```

### Before advancing, ensure:
- ✅ Both projects complete and working
- ✅ Self-assessment checklist 100%
- ✅ Diagnostic test passed (≥80%)
- ✅ Can explain concepts to someone else
- ✅ Code is clean and documented

### What's next in Level 2:
- Chain-of-Thought prompting
- Tree-of-Thought reasoning
- Complexity routing
- Meta-prompting basics

---

## Additional Resources

- **[Week-by-Week Detailed Plan](./week-by-week.md)** - Daily tasks with time estimates
- **[Project Specifications](./projects.md)** - Detailed requirements
- **[Resource Library](./resources.md)** - Papers, tutorials, tools
- **[Troubleshooting Guide](./troubleshooting.md)** - Common issues & fixes
- **[Code Examples](../../examples/01-foundation/)** - Reference implementations

---

## Community & Support

**Stuck?** Don't stay stuck!

1. **Check troubleshooting guide** (5 min)
2. **Ask in Discord** #level-1 channel (30 min response)
3. **Office hours** Tuesday/Thursday 6-7pm
4. **Use the Learning Advisor**:
   ```bash
   python cli.py ask-advisor "your question"
   ```

**Tip**: When asking for help, share:
- What you're trying to do
- What you expected to happen
- What actually happened
- Relevant code snippet
- Error message (if any)

---

**Ready to start?** → [Begin Week 1](./week-by-week.md#week-1)

*Last updated: 2025-01-29 | Level 1 v1.0*
