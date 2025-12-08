# Meta-Prompting Framework - Quick Reference Card

## Installation

```bash
# One-line install
./install-plugin.sh

# Uninstall
./uninstall-plugin.sh
```

## Skills

| Skill | Use Case |
|-------|----------|
| `meta-prompt-iterate` | Full recursive improvement workflow |
| `analyze-complexity` | Determine optimal strategy (0.0-1.0) |
| `extract-context` | Extract patterns from outputs |
| `assess-quality` | Score quality (0.0-1.0) |
| `category-master` | Category theory reasoning |
| `discopy-categorical-computing` | String diagrams & quantum NLP |

**Usage:**
```
Skill: "meta-prompt-iterate"
Task: "Your task here"
```

## Agents

| Agent | Use Case |
|-------|----------|
| `meta2` | Universal meta-meta-prompt generator (7 levels) |
| `MARS` | Multi-Agent Research Synthesis |
| `MERCURIO` | Mixture of Experts for complex decisions |
| `mercurio-orchestrator` | Expert multi-perspective analysis |

**Usage:**
```
Task: subagent_type="meta2"
Prompt: "Generate framework for X"
```

## Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/grok` | Interactive meta-prompting | `/grok --mode deep --turns 3` |
| `/meta-command` | Generate new commands | `/meta-command --type research` |
| `/meta-agent` | Generate new agents | `/meta-agent --domain "X"` |

## Workflows

| Workflow | Purpose |
|----------|---------|
| `meta-framework-generation` | Complete framework generation |
| `quick-meta-prompt` | Rapid prompt improvement |
| `research-project-to-github` | Research → GitHub publishing |
| `research-spec-generation` | Research spec creation |

**Usage:**
```
/workflows
# Select workflow from list
```

## Python API

```python
from meta_prompting_engine.llm_clients.claude import ClaudeClient
from meta_prompting_engine.core import MetaPromptingEngine

# Initialize
llm = ClaudeClient(api_key="your-key")
engine = MetaPromptingEngine(llm)

# Execute
result = engine.execute_with_meta_prompting(
    skill="python-programmer",
    task="Your task",
    max_iterations=3,
    quality_threshold=0.90
)

# Results
print(f"Quality: {result.quality_score}")
print(f"Iterations: {result.iterations}")
print(result.output)
```

## Complexity Strategies

| Score | Level | Strategy | Approach |
|-------|-------|----------|----------|
| < 0.3 | Simple | Direct Execution | Clear reasoning steps |
| 0.3-0.7 | Medium | Multi-Approach | 2-3 approaches, evaluate |
| > 0.7 | Complex | Autonomous Evolution | Hypothesis → Test → Refine |

## Quality Thresholds

| Score | Meaning | Action |
|-------|---------|--------|
| 0.90+ | Excellent | Use in production |
| 0.85-0.90 | Good | Minor improvements |
| 0.80-0.85 | Acceptable | Review and refine |
| < 0.80 | Needs work | Continue iteration |

## Configuration

```bash
# Environment variables
export ANTHROPIC_API_KEY=sk-ant-your-key
export DEFAULT_MODEL=claude-sonnet-4-5-20250929
export DEFAULT_TEMPERATURE=0.7
export DEFAULT_MAX_TOKENS=2000
export META_PROMPT_MAX_ITERATIONS=3
export META_PROMPT_QUALITY_THRESHOLD=0.90
```

## Testing

```bash
# Mock validation (no API key)
python3 validate_implementation.py

# Real API test
python3 test_real_api.py

# Show responses
python3 show_claude_responses.py
```

## Common Patterns

### Pattern 1: Quick Improvement
```
Skill: "meta-prompt-iterate"
Task: "Improve this prompt: [original prompt]"
```

### Pattern 2: Framework Generation
```
Task: subagent_type="meta2"
Prompt: "Generate 5-level framework for [domain]"
```

### Pattern 3: Research Synthesis
```
Task: subagent_type="MARS"
Prompt: "Research and synthesize [topic]"
```

### Pattern 4: Complex Decision
```
Skill: "moe"
Task: "Analyze decision: Should we [X or Y]?"
```

## Pricing (Claude Sonnet 4.5)

| Item | Cost |
|------|------|
| Input tokens | $3 per million |
| Output tokens | $15 per million |
| Simple task (1 iter) | ~$0.01 |
| Medium task (2 iter) | ~$0.04 |
| Complex task (3 iter) | ~$0.08 |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Plugin not loading | Check `ls ~/.claude/skills/` |
| API key error | `echo $ANTHROPIC_API_KEY` |
| Python import error | `pip3 install -r requirements.txt` |
| Permission denied | `chmod +x install-plugin.sh` |

## Directory Structure

```
~/.claude/
├── skills/meta-prompt-iterate/
├── agents/meta2/
├── commands/grok.md
├── workflows/meta-framework-generation.yaml
└── python-packages/meta_prompting_engine/
```

## Support

- **Issues**: https://github.com/manutej/meta-prompting-framework/issues
- **Docs**: [README.md](README.md) | [PLUGIN_README.md](PLUGIN_README.md)
- **API**: [meta_prompting_engine/README.md](meta_prompting_engine/README.md)

---

**Version**: 1.0.0 | **License**: MIT | **Author**: manutej
