# Installation Guide

## Quick Install (< 2 minutes)

### Claude Code Plugin

```bash
# 1. Clone
git clone https://github.com/manutej/meta-prompting-framework.git
cd meta-prompting-framework

# 2. Install
./install-plugin.sh

# 3. Configure
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# 4. Test
# In Claude Code:
Skill: "meta-prompt-iterate"
Task: "Write a hello world function"
```

Done! You now have:
- ✅ 7+ skills
- ✅ 4+ agents (meta2, MARS, MERCURIO)
- ✅ 3+ commands (/grok, /meta-command)
- ✅ 6+ workflows
- ✅ Python meta-prompting engine

---

## Installation Options

### Global Installation (All Projects)

```bash
./install-plugin.sh
# Installs to ~/.claude/
```

### Project-Specific Installation

```bash
./install-plugin.sh /path/to/project
# Installs to /path/to/project/.claude/
```

### Manual Installation

```bash
# Copy resources
cp -r skills/* ~/.claude/skills/
cp -r agents/* ~/.claude/agents/
cp -r commands/* ~/.claude/commands/
cp -r workflows/* ~/.claude/workflows/

# Install Python dependencies
pip3 install -r requirements.txt

# Copy engine
mkdir -p ~/.claude/python-packages
cp -r meta_prompting_engine ~/.claude/python-packages/
```

---

## Verification

```bash
# Check skills
ls ~/.claude/skills/meta-prompt-iterate

# Check agents
ls ~/.claude/agents/meta2

# Check commands
ls ~/.claude/commands/grok.md

# Test Python engine
python3 -c "from meta_prompting_engine.core import MetaPromptingEngine; print('OK')"
```

---

## Uninstall

```bash
./uninstall-plugin.sh
```

---

## What Gets Installed

### Skills
1. `meta-prompt-iterate` - Full recursive workflow
2. `analyze-complexity` - Complexity analysis (0.0-1.0)
3. `extract-context` - Pattern extraction
4. `assess-quality` - Quality scoring
5. `category-master` - Category theory
6. `discopy-categorical-computing` - String diagrams
7. `nexus-tui-generator` - Terminal UI generation

### Agents
1. `meta2` - Meta-meta-prompt generator (7 levels)
2. `MARS` - Multi-Agent Research Synthesis
3. `MERCURIO` - Mixture of Experts
4. `mercurio-orchestrator` - Expert orchestrator

### Commands
1. `/grok` - Interactive meta-prompting
2. `/meta-command` - Command generation
3. `/meta-agent` - Agent generation

### Workflows
1. `meta-framework-generation` - Framework generation
2. `quick-meta-prompt` - Quick improvement
3. `research-project-to-github` - Publishing workflow
4. `research-spec-generation` - Spec creation
5. `startup-execution-plan` - Project planning

### Python Engine
- `MetaPromptingEngine` - Core recursive loop
- `ComplexityAnalyzer` - Complexity scoring
- `ContextExtractor` - Context extraction
- `ClaudeClient` - API integration

---

## Requirements

- Python 3.8+
- pip3
- Anthropic API key
- Claude Code CLI

---

## First Steps After Installation

### 1. Try a Skill
```
Skill: "meta-prompt-iterate"
Task: "Create a function to validate email addresses"
```

### 2. Launch an Agent
```
Task: subagent_type="meta2"
Prompt: "Generate a 5-level meta-prompting framework for code review"
```

### 3. Run a Command
```
/grok --mode deep --turns 3
```

### 4. Execute a Workflow
```
/workflows
# Select: quick-meta-prompt
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `install-plugin.sh: Permission denied` | Run `chmod +x install-plugin.sh` |
| `API key not found` | Export: `export ANTHROPIC_API_KEY=sk-ant-...` |
| `Python module not found` | Run: `pip3 install -r requirements.txt` |
| `Skills not loading` | Check: `ls ~/.claude/skills/` |

---

## Documentation

- **Quick Start**: [README.md](README.md)
- **Plugin Guide**: [PLUGIN_README.md](PLUGIN_README.md)
- **Quick Reference**: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **API Docs**: [meta_prompting_engine/README.md](meta_prompting_engine/README.md)

---

## Support

- **Issues**: https://github.com/manutej/meta-prompting-framework/issues
- **Discussions**: https://github.com/manutej/meta-prompting-framework/discussions

---

**Version**: 1.0.0 | **License**: MIT
