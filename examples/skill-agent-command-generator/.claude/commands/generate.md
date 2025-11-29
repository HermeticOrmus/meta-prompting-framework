---
description: Generate skills, agents, or commands from natural language descriptions
args:
  - name: description
    description: Natural language description of what to generate
    required: true
  - name: type
    description: Force artifact type (skill, agent, command)
    required: false
allowed-tools: [Read, Write, Glob, Grep, Task, TodoWrite]
---

# /generate

Generate Claude Code artifacts (skills, agents, commands) from natural language descriptions.

## What This Command Does

Analyzes your description, determines the appropriate artifact type, and generates a complete, high-quality artifact using the 7-iteration refinement process.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| description | string | Yes | - | What you want to generate |
| --type | string | No | auto | Force: `skill`, `agent`, or `command` |
| --level | int | No | auto | For skills: L1-L7 |
| --output | string | No | auto | Output path |
| --dry-run | bool | No | false | Preview without creating |
| --validate | bool | No | true | Run quality validation |

## Workflow

### Step 1: Parse and Detect Type
```
IF --type provided:
  use specified type
ELSE:
  analyze description for signals:
    skill: "capability", "function", "compose"
    agent: "autonomous", "monitor", "goal"
    command: "user", "run", "execute"
```

### Step 2: Load Meta-Prompt
```
Read appropriate meta-prompt:
  skill  → meta-prompts/SKILL-GENERATOR.md
  agent  → meta-prompts/AGENT-GENERATOR.md
  command → meta-prompts/COMMAND-GENERATOR.md
```

### Step 3: 7-Iteration Refinement
```
FOR iteration IN 1..7:
  CONSTRUCT: Build current understanding
  DECONSTRUCT: Find gaps, patterns, tensions
  RECONSTRUCT: Improve based on insights
```

### Step 4: Validate Quality
```
IF --validate:
  Run QualityGuard agent
  IF score < 0.75:
    Show recommendations
    EXIT with error
```

### Step 5: Output Artifact
```
IF --dry-run:
  Display preview
ELSE:
  Write to appropriate directory:
    skills  → .claude/skills/
    agents  → .claude/agents/
    commands → .claude/commands/
```

## Examples

### Example 1: Generate a Skill (Auto-Detect)
```
/generate "Create a capability for rate limiting API calls"
```
**Type Detected**: skill (signals: "capability")
**Output**: `.claude/skills/rate-limiter.md`

### Example 2: Generate an Agent (Auto-Detect)
```
/generate "Create an autonomous code reviewer"
```
**Type Detected**: agent (signals: "autonomous")
**Output**: `.claude/agents/code-reviewer.md`

### Example 3: Generate a Command (Auto-Detect)
```
/generate "Create a user interface for running tests"
```
**Type Detected**: command (signals: "user interface", "running")
**Output**: `.claude/commands/test.md`

### Example 4: Force Type
```
/generate "Rate limiting" --type=skill
```
**Type**: skill (forced)
**Output**: `.claude/skills/rate-limiter.md`

### Example 5: Specify Level (Skills)
```
/generate "JSON validation skill" --type=skill --level=2
```
**Type**: skill at L2 (error handling level)
**Output**: `.claude/skills/L2-json-validator.md`

### Example 6: Dry Run
```
/generate "Caching capability" --dry-run
```
**Output**: Preview of artifact (not written)

### Example 7: Skip Validation
```
/generate "Quick prototype skill" --validate=false
```
**Output**: Artifact without quality check (use carefully)

### Example 8: Custom Output Path
```
/generate "Custom skill" --output=./my-skills/custom.md
```
**Output**: `./my-skills/custom.md`

### Example 9: Complex Skill
```
/generate "Create an L5 skill for dependency injection using Reader monad pattern with full integration to L1-L4"
```
**Output**: `.claude/skills/L5-reader-monad.md` with integration

### Example 10: Multi-Mode Agent
```
/generate "Create a monitoring agent with alerting, reporting, and advisory modes that watches system health"
```
**Output**: `.claude/agents/health-monitor.md` with 3 modes

## Error Handling

### Error: Empty Description
```
❌ Error: Description required

Usage: /generate "<description>" [--type=<type>]
```

### Error: Unknown Type
```
❌ Error: Cannot determine artifact type

Add signals or use --type flag:
  /generate "..." --type=skill
  /generate "..." --type=agent
  /generate "..." --type=command
```

### Error: Quality Failure
```
❌ Error: Quality validation failed (0.62 < 0.75)

Issues:
  - Specificity: 0.55 (needs narrower domain)
  - Examples: 3 (needs 8-12)

Fix and retry, or use --validate=false
```

## Output Format

### Success
```
✅ Generated: .claude/skills/rate-limiter.md

Type: skill (L3)
Quality: 0.88

Metrics:
  Specificity:     0.85 ✓
  Composability:   0.92 ✓
  Testability:     0.88 ✓
  Documentability: 0.85 ✓

Next steps:
  - Review: cat .claude/skills/rate-limiter.md
  - Validate: /validate .claude/skills/rate-limiter.md
  - Compose: /compose rate-limiter other-skill
```

### Dry Run
```
🔍 Preview: rate-limiter.md

Type: skill (L3)
Quality: 0.88 (estimated)

[First 50 lines of artifact...]

To create: Remove --dry-run flag
```

---

**Version**: 1.0.0
**Status**: Production Ready
