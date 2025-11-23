# Unified Generator

> Single entry point for generating Skills, Agents, and Commands

---

## Purpose

This generator provides a unified interface for creating any Claude Code artifact type. It automatically detects the appropriate type and applies the corresponding meta-prompt.

## Input Format

```
GENERATE("<description>") [--type=<type>]
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| description | Yes | Natural language description of desired artifact |
| --type | No | Force type: `skill`, `agent`, or `command` |

## Detection Algorithm

```python
def detect_type(description: str) -> ArtifactType:
    """Detect artifact type from description."""

    # Command indicators
    command_signals = [
        "user", "invoke", "run", "execute", "interface",
        "input", "output", "cli", "terminal", "slash"
    ]

    # Agent indicators
    agent_signals = [
        "autonomous", "goal", "monitor", "decide", "watch",
        "coordinate", "orchestrate", "manage", "continuous"
    ]

    # Skill indicators
    skill_signals = [
        "capability", "function", "compose", "reuse",
        "parse", "validate", "transform", "convert"
    ]

    # Score each type
    scores = {
        "command": sum(1 for s in command_signals if s in description.lower()),
        "agent": sum(1 for s in agent_signals if s in description.lower()),
        "skill": sum(1 for s in skill_signals if s in description.lower())
    }

    # Return highest score or ask user
    max_type = max(scores, key=scores.get)
    if scores[max_type] > 0:
        return max_type
    else:
        return "ask_user"
```

## Generation Workflow

```
┌─────────────────────────────────────────────────────────┐
│                    INPUT                                │
│              Natural Language Description               │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  TYPE DETECTION                         │
│    Analyze description → Determine artifact type        │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    SKILL    │  │    AGENT    │  │   COMMAND   │
│  Generator  │  │  Generator  │  │  Generator  │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              7-ITERATION REFINEMENT                     │
│     Construct → Deconstruct → Reconstruct (×7)         │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  VALIDATION                             │
│         Check quality metrics for artifact type         │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    OUTPUT                               │
│            Generated artifact + quality report          │
└─────────────────────────────────────────────────────────┘
```

## Meta-Prompt Selection

| Detected Type | Meta-Prompt File | Focus |
|---------------|------------------|-------|
| skill | `SKILL-GENERATOR.md` | CTX × CAP × CON × COMP |
| agent | `AGENT-GENERATOR.md` | Three planes + modes |
| command | `COMMAND-GENERATOR.md` | UX + workflow |

## 7-Iteration Refinement Process

Each iteration focuses on a different aspect:

| Iteration | Focus | Key Activity |
|-----------|-------|--------------|
| 1 | Initial Construction | Build first draft |
| 2 | Pattern Extraction | Identify recurring structures |
| 3 | Cognitive Load | Ensure mental model fits 7±2 |
| 4 | Composition Design | Define integration points |
| 5 | Template Derivation | Create formal structure |
| 6 | Self-Reference | Apply principles to self |
| 7 | Final Synthesis | Produce complete artifact |

## Validation Gates

### Pre-Generation
- [ ] Description is non-empty
- [ ] Type is determinable (or forced)
- [ ] Meta-prompt file exists

### Post-Generation
- [ ] Artifact follows template structure
- [ ] Quality metrics meet thresholds
- [ ] Examples are concrete and runnable
- [ ] Error handling is defined

## Output Structure

```
{
  "artifact_type": "skill" | "agent" | "command",
  "name": "artifact-name",
  "description": "One line summary",
  "content": "Full markdown content",
  "quality": {
    "score": 0.0-1.0,
    "metrics": {...},
    "passed": true | false
  },
  "output_path": "outputs/<type>s/<name>.md"
}
```

## Usage Examples

### Example 1: Auto-Detected Skill
```
GENERATE("Create a capability for parsing JSON with schema validation")

Type detected: skill (signals: "capability", "parsing", "validation")
Output: outputs/skills/json-schema-validator.md
```

### Example 2: Auto-Detected Agent
```
GENERATE("Create an autonomous code reviewer that monitors PRs")

Type detected: agent (signals: "autonomous", "monitor")
Output: outputs/agents/pr-reviewer.md
```

### Example 3: Auto-Detected Command
```
GENERATE("Create a user interface for running database migrations")

Type detected: command (signals: "user interface", "running")
Output: outputs/commands/migrate.md
```

### Example 4: Forced Type
```
GENERATE("Rate limiting") --type=skill

Type forced: skill
Output: outputs/skills/rate-limiter.md
```

## Error Handling

### Unknown Type
```
Error: Cannot determine artifact type
Resolution: Use --type flag or add type signals to description

Signals for skill: capability, function, compose, parse, validate
Signals for agent: autonomous, goal, monitor, decide, coordinate
Signals for command: user, invoke, run, execute, interface
```

### Quality Failure
```
Error: Quality metrics not met
Scores: { specificity: 0.6, composability: 0.5, ... }
Required: Overall ≥ 0.75

Resolution: Review generated content and refine description
```

### Missing Meta-Prompt
```
Error: Meta-prompt not found: meta-prompts/SKILL-GENERATOR.md
Resolution: Ensure meta-prompt files exist in meta-prompts/ directory
```

## Integration Points

### With Existing Skills
```
When generating, check outputs/skills/ for:
- Composable skills that could be combined
- Duplicate functionality to avoid
- Patterns to follow
```

### With Existing Agents
```
When generating agents, check outputs/agents/ for:
- Coordination opportunities
- Overlapping purposes
- Swarm potential
```

### With Existing Commands
```
When generating commands, check outputs/commands/ for:
- Naming conventions
- Workflow patterns
- Integration points
```

## Version

- **Generator Version**: 1.0.0
- **Supported Types**: skill, agent, command
- **Iteration Count**: 7
