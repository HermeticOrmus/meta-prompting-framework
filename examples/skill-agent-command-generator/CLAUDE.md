# CLAUDE.md - Skill-Agent-Command Generator System

> System configuration for the unified artifact generation framework

---

## System Identity

This is the **Skill-Agent-Command Generator**, a self-contained meta-prompting system that generates Claude Code artifacts through iterative refinement.

## Core Capabilities

When working in this directory, you have access to three generation capabilities:

### 1. Skill Generation
**Purpose**: Create reusable capability units
**Grammar**: DOMAIN × CAPABILITY × CONSTRAINT × COMPOSITION
**Meta-Prompt**: `meta-prompts/SKILL-GENERATOR.md`

### 2. Agent Generation
**Purpose**: Create autonomous entities with goals
**Grammar**: PURPOSE × GOAL × ETHICS × COORDINATION
**Meta-Prompt**: `meta-prompts/AGENT-GENERATOR.md`

### 3. Command Generation
**Purpose**: Create user-facing interfaces
**Grammar**: INTERFACE × ACTION × VALIDATION × WORKFLOW
**Meta-Prompt**: `meta-prompts/COMMAND-GENERATOR.md`

## Generation Protocol

When asked to generate an artifact:

### Step 1: Type Detection
```
IF description mentions "user invokes" or "run" or "execute" → COMMAND
IF description mentions "autonomous" or "goal" or "monitor" → AGENT
IF description mentions "capability" or "compose" or "reuse" → SKILL
ELSE → Ask user to clarify
```

### Step 2: Load Meta-Prompt
Read the appropriate meta-prompt from `meta-prompts/` directory.

### Step 3: Apply 7-Iteration Refinement
```
For each iteration 1-7:
  CONSTRUCT: Build current understanding
  DECONSTRUCT: Identify gaps and patterns
  RECONSTRUCT: Improve based on insights
```

### Step 4: Generate Output
Create the artifact following the template in the meta-prompt.

### Step 5: Validate Quality
Check against quality thresholds before outputting.

### Step 6: Save to Outputs
Save generated artifact to appropriate `outputs/` subdirectory.

## Quality Thresholds

### Skills
- Specificity ≥ 0.7
- Composability ≥ 0.7
- Testability ≥ 0.8
- Documentability ≥ 0.8
- Overall ≥ 0.75

### Agents
- Mission clarity: One sentence
- Planes: All three defined
- Modes: At least 2
- Ethics: Explicit constraints
- Examples: At least 3

### Commands
- Examples: 8-12
- Error cases: At least 5
- Arguments: 100% documented
- Output: Copy-pasteable

## File Conventions

### Naming
- Skills: `kebab-case.md` (e.g., `json-validator.md`)
- Agents: `kebab-case.md` (e.g., `code-reviewer.md`)
- Commands: `kebab-case.md` (e.g., `run-tests.md`)

### Output Locations
- Skills → `outputs/skills/`
- Agents → `outputs/agents/`
- Commands → `outputs/commands/`

### Iteration Logs
- Log all refinement iterations to `iterations/evolution-log.md`

## Available Tools

For generation tasks, use:
- `Read` - Load meta-prompts and existing artifacts
- `Write` - Create new artifacts
- `Glob` - Find existing artifacts
- `Grep` - Search for patterns
- `TodoWrite` - Track generation progress

## Self-Improvement Protocol

This system can improve itself:

1. **Track Success**: Log which generated artifacts are used
2. **Mine Patterns**: Extract successful patterns
3. **Update Meta-Prompts**: Improve generators
4. **Raise Thresholds**: Increase quality bars

## Quick Reference

### Generate a Skill
```
User: "Create a skill for X"
You:
1. Read meta-prompts/SKILL-GENERATOR.md
2. Apply 7-iteration refinement
3. Generate skill following template
4. Validate quality metrics
5. Save to outputs/skills/
```

### Generate an Agent
```
User: "Create an agent for X"
You:
1. Read meta-prompts/AGENT-GENERATOR.md
2. Apply 7-iteration refinement
3. Generate agent following template
4. Validate three planes + modes
5. Save to outputs/agents/
```

### Generate a Command
```
User: "Create a command for X"
You:
1. Read meta-prompts/COMMAND-GENERATOR.md
2. Apply 7-iteration refinement
3. Generate command following template
4. Validate examples + errors
5. Save to outputs/commands/
```

## Fundamental Distinctions

Always remember:
- **Skills** are CAPABILITIES (what the system CAN DO)
- **Agents** are ENTITIES (what pursues GOALS)
- **Commands** are INTERFACES (how users ACCESS the system)

## Version

- **System Version**: 1.0.0
- **Framework**: Skill-Agent-Command Generator
- **Status**: Production Ready
