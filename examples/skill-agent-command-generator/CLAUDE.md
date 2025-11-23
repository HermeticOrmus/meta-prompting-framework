# CLAUDE.md - Skill-Agent-Command Generator System

> Self-contained meta-prompting system for generating Claude Code artifacts

---

## System Overview

This is a **self-contained artifact generation system** built on the 7-level functional programming skill architecture. It provides:

- **7 Skills** (L1-L7) - Progressive functional programming capabilities
- **3 Agents** - SkillComposer, QualityGuard, EvolutionEngine
- **4 Commands** - /generate, /compose, /validate, /evolve
- **Integration Layer** - Wiring everything together

## Directory Structure

```
.claude/
├── skills/                    # 7-level skill definitions
│   ├── L1-option-type.md      # Type safety
│   ├── L2-result-type.md      # Error handling
│   ├── L3-pipeline.md         # Composition
│   ├── L4-effect-isolation.md # Side effects
│   ├── L5-context-reader.md   # Dependency injection
│   ├── L6-lazy-stream.md      # Lazy evaluation
│   └── L7-meta-generator.md   # Emergence
│
├── agents/                    # Autonomous agents
│   ├── skill-composer.md      # Composes skills
│   ├── quality-guard.md       # Validates quality
│   └── evolution-engine.md    # Improves system
│
├── commands/                  # User-facing commands
│   ├── generate.md            # Generate artifacts
│   ├── compose.md             # Compose skills
│   ├── validate.md            # Validate quality
│   └── evolve.md              # Improve system
│
├── settings/
│   └── config.json            # System configuration
│
└── INTEGRATION.md             # How everything connects
```

---

## Quick Reference

### Generate an Artifact
```
/generate "<description>" [--type=skill|agent|command]
```

### Compose Skills
```
/compose <skill1> <skill2> [--pattern=sequential|parallel|fallback]
```

### Validate Quality
```
/validate <path> [--deep] [--fix]
```

### Evolve System
```
/evolve <analyze|update|report>
```

---

## Skills (L1-L7)

| Level | Skill | Purpose | Cognitive Load |
|-------|-------|---------|----------------|
| L1 | OptionType | Eliminate null/nil errors | O(1) |
| L2 | ResultType | Context-rich error handling | O(1) |
| L3 | Pipeline | Composable data transformation | O(n) |
| L4 | EffectIsolation | Separate pure from impure | O(n) |
| L5 | ContextReader | Implicit dependency threading | O(n²) |
| L6 | LazyStream | Infinite sequence handling | O(∞) |
| L7 | MetaGenerator | Self-improving generation | O(emergent) |

### Skill Composition Chain
```
L1 → L2 → L3 → L4 → L5 → L6 → L7
Each level builds on the previous.
```

---

## Agents

### SkillComposer
**Purpose**: Compose multiple skills into unified workflows
**Model**: Sonnet
**Modes**: Analysis, Composition, Validation

**Use**: When you need to combine skills
```
Task("Compose OptionType and ResultType", subagent_type="skill-composer")
```

### QualityGuard
**Purpose**: Validate artifact quality against thresholds
**Model**: Haiku (fast)
**Modes**: Quick Check, Deep Analysis, Batch Validation

**Use**: Before deploying any artifact
```
Task("Validate all skills", subagent_type="quality-guard")
```

### EvolutionEngine
**Purpose**: Improve generation templates over time
**Model**: Opus (deep analysis)
**Modes**: Analysis, Evolution, Monitoring

**Use**: Periodically to improve the system
```
Task("Analyze patterns and update templates", subagent_type="evolution-engine")
```

---

## Commands

### /generate
Generate new artifacts from natural language descriptions.

```bash
# Auto-detect type
/generate "Create a capability for rate limiting"

# Force type
/generate "Rate limiting" --type=skill

# Specify level
/generate "Error handling skill" --level=2

# Preview only
/generate "Caching" --dry-run
```

### /compose
Compose multiple skills into unified workflows.

```bash
# Sequential composition
/compose option-type result-type

# Parallel composition
/compose rate-limiter cache-manager --pattern=parallel

# Analysis only
/compose skill-a skill-b --analyze
```

### /validate
Validate artifact quality.

```bash
# Single file
/validate .claude/skills/L3-pipeline.md

# Directory
/validate .claude/skills/

# Deep analysis with fix suggestions
/validate broken-skill.md --deep --fix
```

### /evolve
Improve the generation system.

```bash
# Analyze patterns
/evolve analyze

# Update templates
/evolve update

# Show trends
/evolve report
```

---

## Quality Thresholds

### Skills
| Metric | Threshold |
|--------|-----------|
| Specificity | ≥ 0.70 |
| Composability | ≥ 0.70 |
| Testability | ≥ 0.80 |
| Documentability | ≥ 0.80 |
| **Overall** | ≥ 0.75 |

### Agents
- Mission clarity: One sentence
- Plane coverage: 3/3 (Mental, Physical, Spiritual)
- Mode count: ≥ 2
- Ethics: Explicit

### Commands
- Example count: 8-12
- Error cases: ≥ 5
- Argument docs: 100%

---

## Fundamental Grammar

All artifacts follow the same fundamental grammar:

```
ARTIFACT := CONTEXT × CAPABILITY × CONSTRAINT × COMPOSITION
```

| Type | Context | Capability | Constraint | Composition |
|------|---------|------------|------------|-------------|
| Skill | Domain | Function | Invariant | Combinator |
| Agent | Purpose | Goal | Ethics | Coordination |
| Command | Interface | Action | Validation | Workflow |

---

## Integration Flows

### Generate → Validate → Deploy
```
/generate "..." → QualityGuard validates → Output to .claude/
```

### Compose → Validate → Deploy
```
/compose ... → SkillComposer composes → QualityGuard validates → Output
```

### Analyze → Update → Improve
```
/evolve analyze → EvolutionEngine mines patterns → /evolve update → Better templates
```

---

## Self-Referential Design

This system demonstrates what it teaches:

| Principle | How System Uses It |
|-----------|-------------------|
| L1 Type Safety | All artifacts have explicit types |
| L2 Error Handling | Errors propagate with context |
| L3 Composition | Skills, agents, commands compose |
| L4 Effect Isolation | Agents handle IO, skills stay pure |
| L5 Context Reader | Environment flows through generation |
| L6 Lazy Evaluation | Only generate what's needed |
| L7 Emergence | System improves through use |

---

## Working in This Directory

When Claude works in this directory:

1. **Read INTEGRATION.md** for system architecture
2. **Check config.json** for current settings
3. **Use commands** for artifact operations
4. **Invoke agents** for complex tasks
5. **Apply skills** following the 7-level progression

---

## Generation Protocol

When asked to generate an artifact:

1. **Detect Type**: skill, agent, or command
2. **Load Meta-Prompt**: from meta-prompts/ directory
3. **Apply 7 Iterations**: Construct → Deconstruct → Reconstruct
4. **Validate Quality**: via QualityGuard
5. **Output**: to appropriate .claude/ subdirectory

---

## Evolution Protocol

The system improves over time:

1. **Collect**: Track artifact quality and usage
2. **Analyze**: Mine patterns from successful artifacts
3. **Update**: Integrate patterns into templates
4. **Validate**: Ensure no regression
5. **Deploy**: Use improved templates

---

## Version

- **System Version**: 1.0.0
- **Skills**: 7 (L1-L7)
- **Agents**: 3
- **Commands**: 4
- **Status**: Production Ready
- **Last Updated**: 2025-11-23
