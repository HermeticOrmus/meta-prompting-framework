# Meta-Prompting Framework - Claude Code Plugin

**Transform AI outputs from good to great through recursive improvement**

[![Status](https://img.shields.io/badge/status-production--ready-green)]()
[![Plugin](https://img.shields.io/badge/plugin-claude--code-blue)]()
[![Python](https://img.shields.io/badge/python-3.8%2B-blue)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

---

## What This Plugin Provides

### Skills (7)
- `meta-prompt-iterate` - Full recursive improvement workflow
- `analyze-complexity` - Determine optimal meta-prompting strategy (0.0-1.0)
- `extract-context` - Extract patterns and success indicators from outputs
- `assess-quality` - Score output quality against requirements
- `category-master` - Expert-level category theory for rigorous reasoning
- `discopy-categorical-computing` - Compositional computing with string diagrams
- `nexus-tui-generator` - Terminal UI generation

### Agents (4+)
- `meta2` - Universal meta-meta-prompt generator with 7-level architecture
- `MARS` - Multi-Agent Research Synthesis orchestrator
- `MERCURIO` - Mixture of Experts for complex decisions
- `mercurio-orchestrator` - Expert multi-perspective agent

### Commands (3)
- `/grok` - Interactive meta-prompting session
- `/meta-command` - Generate new commands with meta-prompting
- `/meta-agent` - Generate new agents with meta-prompting

### Workflows (6)
- `meta-framework-generation` - Complete framework generation
- `quick-meta-prompt` - Rapid prompt improvement
- `research-project-to-github` - Research project publishing
- `research-spec-generation` - Research specification creation
- `startup-execution-plan` - Project startup planning

### Python Engine
- **MetaPromptingEngine** - Recursive loop with quality thresholds
- **ComplexityAnalyzer** - 4-factor complexity scoring
- **ContextExtractor** - 7-phase context extraction
- **ClaudeClient** - Real Anthropic API integration

---

## Quick Installation

### Option 1: Global Installation (Recommended)

```bash
# Clone the repository
git clone https://github.com/manutej/meta-prompting-framework.git
cd meta-prompting-framework

# Run the installer
./install-plugin.sh

# Configure API key
export ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Option 2: Project-Specific Installation

```bash
# Clone the repository
git clone https://github.com/manutej/meta-prompting-framework.git
cd meta-prompting-framework

# Install to a specific project directory
./install-plugin.sh /path/to/your/project
```

### Option 3: Manual Installation

```bash
# Copy resources to Claude Code configuration
cp -r skills/* ~/.claude/skills/
cp -r agents/* ~/.claude/agents/
cp -r commands/* ~/.claude/commands/
cp -r workflows/* ~/.claude/workflows/

# Install Python dependencies
pip3 install -r requirements.txt

# Copy Python engine
mkdir -p ~/.claude/python-packages
cp -r meta_prompting_engine ~/.claude/python-packages/
```

---

## Verification

After installation, verify the plugin is loaded:

```bash
# In Claude Code, run:
/crew meta2

# Or list all skills:
ls ~/.claude/skills/

# Or check agents:
ls ~/.claude/agents/
```

---

## Quick Start

### 1. Use a Skill

```
Skill: "meta-prompt-iterate"
Task: "Write a function to validate email addresses with comprehensive error handling"
```

Claude Code will:
1. Analyze task complexity
2. Generate initial output
3. Extract patterns and context
4. Iteratively improve until quality threshold met

### 2. Launch an Agent

```
Task: subagent_type="meta2"
Prompt: "Generate a 5-level meta-prompting framework for code optimization"
```

The meta2 agent will:
1. Discover domain primitives
2. Design level architecture
3. Generate meta-prompts for each level
4. Provide theoretical justification

### 3. Run a Command

```
/grok --mode deep --turns 3
```

Interactive meta-prompting session with:
- Multiple iterations
- Quality assessment
- Context extraction

### 4. Execute a Workflow

```
/workflows
# Select: meta-framework-generation
```

Orchestrated multi-agent workflow for complete framework generation.

---

## Configuration

### Environment Variables

```bash
# Required
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# Optional
export DEFAULT_MODEL=claude-sonnet-4-5-20250929
export DEFAULT_TEMPERATURE=0.7
export DEFAULT_MAX_TOKENS=2000
export META_PROMPT_MAX_ITERATIONS=3
export META_PROMPT_QUALITY_THRESHOLD=0.90
```

### Python Usage

```python
from meta_prompting_engine.llm_clients.claude import ClaudeClient
from meta_prompting_engine.core import MetaPromptingEngine

# Create engine
llm = ClaudeClient(api_key="your-key")
engine = MetaPromptingEngine(llm)

# Execute with meta-prompting
result = engine.execute_with_meta_prompting(
    skill="python-programmer",
    task="Create a function to validate email addresses",
    max_iterations=3,
    quality_threshold=0.90
)

print(f"Quality: {result.quality_score:.2f}")
print(f"Iterations: {result.iterations}")
print(result.output)
```

---

## Features

### Recursive Improvement
- Real LLM integration (not simulations)
- Context extraction from each iteration
- Quality-driven stopping conditions
- Token usage tracking

### Complexity-Based Strategies

| Complexity | Strategy | Approach |
|------------|----------|----------|
| **< 0.3** (Simple) | Direct Execution | Clear reasoning steps |
| **0.3-0.7** (Medium) | Multi-Approach | Generate 2-3 approaches, evaluate, choose best |
| **> 0.7** (Complex) | Autonomous Evolution | Hypothesis generation, testing, iterative refinement |

### Quality Assessment
- Automated scoring (0.0-1.0)
- Completeness analysis
- Error handling evaluation
- Best practices validation

### Context Extraction
- Domain primitives identification
- Pattern recognition
- Constraint detection
- Success indicator analysis
- Error pattern tracking

---

## Examples

### Example 1: Simple Task
```
Skill: "meta-prompt-iterate"
Task: "Write function to calculate factorial"

Result:
- Iterations: 1 (early stop - quality threshold met)
- Quality: 0.85
- Complexity: 0.15 (SIMPLE)
- Strategy: direct_execution
```

### Example 2: Medium Task
```
Skill: "meta-prompt-iterate"
Task: "Create a priority queue class with efficient insert/extract-min"

Result:
- Iterations: 2
- Quality: 0.91
- Complexity: 0.52 (MEDIUM)
- Strategy: multi_approach_synthesis
- Improvement: +0.15
```

### Example 3: Complex Task
```
Skill: "meta-prompt-iterate"
Task: "Design distributed rate-limiting for API gateway (100k req/s)"

Result:
- Iterations: 3
- Quality: 0.93
- Complexity: 0.78 (COMPLEX)
- Strategy: autonomous_evolution
- Improvement: +0.21
```

---

## Testing

### Validate Installation

```bash
# Mock validation (no API key needed)
python3 validate_implementation.py

# Real API tests
python3 test_real_api.py

# Show actual Claude responses
python3 show_claude_responses.py
```

### Run Tests

```bash
# All tests
pytest tests/ -v

# Specific test
pytest tests/test_core_engine.py -v
```

---

## Architecture

```
meta-prompting-framework/
├── skills/                        # Claude Code skills
│   ├── meta-prompt-iterate/       # Full workflow
│   ├── analyze-complexity/        # Complexity analysis
│   ├── extract-context/           # Context extraction
│   ├── assess-quality/            # Quality assessment
│   ├── category-master/           # Category theory
│   └── discopy-categorical-computing/  # Compositional computing
│
├── agents/                        # Claude Code agents
│   ├── meta2/                     # Meta-meta-prompt generator
│   ├── MARS.md                    # Research synthesis
│   ├── MERCURIO.md                # Mixture of experts
│   └── mercurio-orchestrator.md   # Expert orchestrator
│
├── commands/                      # Claude Code commands
│   ├── grok.md                    # Interactive session
│   ├── meta-command.md            # Command generation
│   └── meta-agent.md              # Agent generation
│
├── workflows/                     # Orchestration workflows
│   ├── meta-framework-generation.yaml
│   ├── quick-meta-prompt.yaml
│   └── research-project-to-github.yaml
│
├── meta_prompting_engine/         # Python engine
│   ├── core.py                    # MetaPromptingEngine
│   ├── complexity.py              # ComplexityAnalyzer
│   ├── extraction.py              # ContextExtractor
│   └── llm_clients/
│       ├── base.py                # Abstract interface
│       └── claude.py              # Claude API client
│
├── install-plugin.sh              # Installation script
├── plugin.json                    # Plugin manifest
└── PLUGIN_README.md               # This file
```

---

## Performance

### Benchmarks (Real Claude API)

| Task | Iterations | Tokens | Time | Quality | Cost |
|------|-----------|--------|------|---------|------|
| Factorial | 1 | 850 | 3.2s | 0.85 | ~$0.01 |
| Priority queue | 2 | 2,400 | 9.5s | 0.91 | ~$0.04 |
| Rate limiter | 3 | 4,200 | 18.3s | 0.93 | ~$0.08 |

**Pricing** (Claude Sonnet 4.5):
- Input: $3 per million tokens
- Output: $15 per million tokens

**Typical range**: $0.01-0.10 per task

---

## Troubleshooting

### Plugin Not Loading

```bash
# Check installation
ls ~/.claude/skills/meta-prompt-iterate
ls ~/.claude/agents/meta2
ls ~/.claude/commands/grok.md

# Re-run installer
./install-plugin.sh
```

### API Key Issues

```bash
# Verify key is set
echo $ANTHROPIC_API_KEY

# Test API connection
python3 test_real_api.py
```

### Python Engine Issues

```bash
# Verify Python version
python3 --version  # Should be >= 3.8

# Reinstall dependencies
pip3 install -r requirements.txt

# Verify engine installation
python3 -c "from meta_prompting_engine.core import MetaPromptingEngine; print('OK')"
```

---

## Uninstallation

### Global Uninstall

```bash
# Remove plugin resources
rm -rf ~/.claude/skills/meta-prompt-iterate
rm -rf ~/.claude/skills/analyze-complexity
rm -rf ~/.claude/skills/extract-context
rm -rf ~/.claude/skills/assess-quality
rm -rf ~/.claude/skills/category-master
rm -rf ~/.claude/skills/discopy-categorical-computing
rm -rf ~/.claude/agents/meta2
rm -rf ~/.claude/agents/MARS.md
rm -rf ~/.claude/agents/MERCURIO.md
rm -rf ~/.claude/agents/mercurio-orchestrator.md
rm -rf ~/.claude/commands/grok.md
rm -rf ~/.claude/commands/meta-command.md
rm -rf ~/.claude/commands/meta-agent.md
rm -rf ~/.claude/workflows/meta-framework-generation.yaml
rm -rf ~/.claude/workflows/quick-meta-prompt.yaml
rm -rf ~/.claude/python-packages/meta_prompting_engine

# Or remove all at once
rm -rf ~/.claude/plugins/meta-prompting-framework
```

---

## Support

- **Issues**: [GitHub Issues](https://github.com/manutej/meta-prompting-framework/issues)
- **Documentation**: [Main README](README.md)
- **Quick Start**: [Quick Start Guide](README_QUICKSTART.md)
- **API Reference**: [Engine Documentation](meta_prompting_engine/README.md)

---

## License

MIT - see [LICENSE](LICENSE) file

---

## Credits

Built with real meta-prompting, not simulations.

**Author**: manutej
**Repository**: https://github.com/manutej/meta-prompting-framework
**Version**: 1.0.0

---

*Recursive improvement for better AI outputs.*
