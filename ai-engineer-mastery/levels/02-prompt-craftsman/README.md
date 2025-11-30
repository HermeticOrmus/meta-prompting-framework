# Level 2: Prompt Craftsman ✍️

> *"Words are your only tool. Wield them precisely."*

## Overview

**Duration**: 3-4 weeks
**Time Commitment**: 15-20 hours/week
**Complexity**: ▓▓░░░░░
**Prerequisites**: Level 1 complete

### What You'll Build
- ✅ Chain-of-Thought prompting system
- ✅ Tree-of-Thought reasoning engine
- ✅ Complexity router with auto-strategy selection
- ✅ Meta-prompt library with 50+ templates

---

## Core Skills

| Skill | Description | Mastery Indicator |
|-------|-------------|-------------------|
| **Chain-of-Thought (CoT)** | Step-by-step reasoning prompts | 20%+ accuracy improvement |
| **Tree-of-Thought (ToT)** | Multi-path exploration | Solve complex planning problems |
| **Chain-of-Draft (CoD)** | Minimalist reasoning | Same accuracy, 92% fewer tokens |
| **Few-Shot Learning** | Example-driven prompting | Consistent format 95%+ |
| **Structured Output** | JSON/XML generation | Zero parsing errors |
| **Meta-Prompting** | Structure over content | Reusable across domains |

---

## Learning Path

### Week 1: Chain-of-Thought Mastery
**Focus**: Make LLMs show their reasoning

**Key Concepts**:
- Zero-shot CoT: "Let's think step by step"
- Few-shot CoT: Provide example reasoning chains
- Self-consistency: Generate multiple chains, vote
- Measuring improvement

**Project**: Math problem solver with CoT
```python
def solve_with_cot(problem: str) -> dict:
    """Solve with visible reasoning steps"""
    prompt = f"""
    Solve this step-by-step:

    Problem: {problem}

    Let's approach this systematically:
    1. Identify what we know
    2. Determine what we need
    3. Work through the solution

    Show your work:
    """
    # Implementation...
```

### Week 2: Tree-of-Thought & Multi-Path Reasoning
**Focus**: Explore multiple solution paths

**Key Concepts**:
- Generating diverse approaches
- Evaluating each path
- Backtracking when stuck
- Selecting optimal solution

**Project**: Multi-approach problem solver
```python
def solve_with_tot(problem: str, num_paths: int = 3) -> dict:
    """Generate and evaluate multiple solution approaches"""
    # 1. Generate N different approaches
    # 2. Evaluate each approach
    # 3. Select best approach
    # 4. Solve using best approach
```

### Week 3: Complexity Routing
**Focus**: Auto-select best prompting strategy

**Project**: Complexity-aware prompt router
```python
def route_by_complexity(task: str) -> str:
    """Route to optimal strategy based on task complexity"""
    complexity = analyze_complexity(task)  # 0.0-1.0

    if complexity < 0.3:
        return direct_execution(task)
    elif complexity < 0.7:
        return multi_approach_synthesis(task)
    else:
        return autonomous_evolution(task)
```

### Week 4: Meta-Prompting
**Focus**: Reusable prompt templates

**Project**: Meta-prompt library with 50+ templates

---

## Major Projects

### Project 1: Enhanced Problem Solver
**Objective**: Solve problems with multiple strategies

**Features**:
- Chain-of-Thought for reasoning
- Tree-of-Thought for complex problems
- Self-consistency for accuracy
- Automatic strategy selection

**Success Criteria**:
- 30%+ improvement over basic prompts
- Handles math, logic, planning problems
- Quality scores ≥0.85

### Project 2: Complexity Router
**Objective**: Auto-route tasks to optimal strategy

**Features**:
- Complexity analysis (4 factors)
- Strategy selection (simple/medium/complex)
- Quality measurement
- Cost tracking

**Success Criteria**:
- Correctly routes 90%+ of tasks
- 15%+ quality improvement vs. one-size-fits-all
- Documented decision logic

---

## Key Techniques

### Chain-of-Thought Pattern
```
Standard Prompt:
"What is 25% of 80?"
→ "20" (no reasoning shown)

Chain-of-Thought:
"What is 25% of 80? Let's think step by step."
→ "First, 25% = 1/4. Then 80 ÷ 4 = 20. Answer: 20"

Improvement: Same answer, but verifiable reasoning
```

### Tree-of-Thought Pattern
```
Problem: Design caching system for 10K req/sec

Approach 1: Redis in-memory cache
  ✓ Fast reads
  ✗ Memory limits
  ✓ Easy to implement

Approach 2: CDN edge caching
  ✓ Global distribution
  ✓ Handles scale
  ✗ Cache invalidation complex

Approach 3: Multi-tier (local + Redis + CDN)
  ✓ Best performance
  ✓ Scales well
  ✗ Most complex

Selected: Approach 3 (best for requirements)
```

### Meta-Prompting Pattern
```
Instead of:
"Summarize this document about AI"

Meta-prompt:
"[TASK: Summarize] [DOMAIN: {domain}] [STYLE: {style}] [LENGTH: {length}]

Document: {text}"

Benefits:
- Reusable structure
- Clear parameters
- Consistent output
- Easy to modify
```

---

## Resources

### Essential Reading
1. **Chain-of-Thought Prompting** (Wei et al., 2022)
2. **Tree of Thoughts** (Yao et al., 2023)
3. **Chain-of-Draft** (February 2025)
4. **Meta-Prompting Guide** (Anthropic)

### Tools & Libraries
- **DSPy**: Prompt optimization framework
- **LangChain**: Prompt templates
- **Guidance**: Structured generation

### Practice Problems
See [resources/prompt-challenges.md](../../resources/prompt-challenges.md)

---

## Assessment

### Self-Assessment Checklist
- [ ] CoT improves accuracy by 20%+
- [ ] Can generate multiple solution paths
- [ ] Complexity router works on diverse tasks
- [ ] Built 50+ prompt templates
- [ ] Understand when to use each technique

### Diagnostic Test
**[Level 2 Assessment →](../../assessments/diagnostics/level-2-diagnostic.md)**

**Format**:
- Prompt engineering challenge (30 min)
- Complexity analysis task (20 min)
- Meta-prompt design (20 min)

**Passing**: 80%

---

## Common Pitfalls

### "CoT doesn't help"
**Why**: Not all tasks benefit from CoT
**Solution**: Use for reasoning, logic, math. Skip for simple lookups.

### "Too many tokens with ToT"
**Why**: Multiple paths = more tokens
**Solution**: Use Chain-of-Draft or limit paths to 2-3

### "Complexity router is wrong"
**Why**: Needs calibration
**Solution**: Test on diverse tasks, adjust thresholds

---

## Next Steps

### When Ready for Level 3:
```bash
python cli.py assess-level --level=2
python cli.py start-level 3
```

### Preview of Level 3: Agent Conductor
- Multi-agent systems
- LangGraph workflows
- Agent orchestration
- MCP protocol
- Project: Research agent swarm

---

**Start Level 2** → [Week-by-Week Guide](./week-by-week.md)

*Level 2 v1.0 | Coming Soon: Full weekly breakdown*
