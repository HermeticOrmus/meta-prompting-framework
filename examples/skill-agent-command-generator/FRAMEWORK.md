# Unified Skill-Agent-Command Generation Framework

> A self-contained system for generating Skills, Agents, and Commands using meta-prompting

---

## Overview

This framework provides a unified approach to generating three types of Claude Code artifacts:

| Type | Purpose | Invocation | State |
|------|---------|------------|-------|
| **Skill** | Reusable capability | Used by system | Stateless |
| **Agent** | Autonomous entity | Task() | Stateful |
| **Command** | User interface | /<name> | Workflow |

## The Generation Triad

```
                    ┌─────────────┐
                    │   COMMAND   │
                    │ (User-facing)│
                    └──────┬──────┘
                           │ invokes
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
       ┌─────────────┐          ┌─────────────┐
       │    AGENT    │          │    SKILL    │
       │ (Autonomous)│   uses   │ (Capability)│
       └──────┬──────┘ ────────▶└─────────────┘
              │
              │ coordinates
              ▼
       ┌─────────────┐
       │   AGENTS    │
       │   (Swarm)   │
       └─────────────┘
```

## Unified Grammar

All three types follow the same fundamental grammar, adapted to their nature:

```
ARTIFACT := CONTEXT × CAPABILITY × CONSTRAINT × COMPOSITION

SKILL:   DOMAIN    × FUNCTION   × INVARIANT   × COMBINATOR
AGENT:   PURPOSE   × GOAL       × ETHICS      × COORDINATION
COMMAND: INTERFACE × ACTION     × VALIDATION  × WORKFLOW
```

## Generation Protocol

### Phase 1: Type Detection

Given a natural language description, determine the appropriate artifact type:

```
DETECT_TYPE(description) := {
  if mentions("user", "invoke", "run", "execute") → COMMAND
  if mentions("autonomous", "goal", "decide", "monitor") → AGENT
  if mentions("capability", "function", "compose", "reuse") → SKILL
  default → ASK_USER
}
```

### Phase 2: Meta-Prompt Selection

Based on type, load the appropriate meta-prompt:

| Type | Meta-Prompt | Focus |
|------|-------------|-------|
| Skill | `SKILL-GENERATOR.md` | CTX×CAP×CON×COMP |
| Agent | `AGENT-GENERATOR.md` | Three planes + modes |
| Command | `COMMAND-GENERATOR.md` | UX + workflow |

### Phase 3: Iterative Refinement

Apply 7 iterations of Construct → Deconstruct → Reconstruct:

```
for iteration in 1..7:
  CONSTRUCT: Build current understanding
  DECONSTRUCT: Identify gaps, tensions, patterns
  RECONSTRUCT: Improve based on insights
```

### Phase 4: Validation

Validate output against quality metrics:

| Type | Metrics |
|------|---------|
| Skill | Specificity ≥0.7, Composability ≥0.7, Testability ≥0.8 |
| Agent | Three planes defined, ≥2 modes, ethical constraints |
| Command | 8-12 examples, error handling, output format |

### Phase 5: Output Generation

Generate the final artifact following the type-specific template.

---

## Self-Referential Architecture

This framework demonstrates what it teaches:

### The Framework IS a Skill
- **Domain**: Artifact generation
- **Capability**: Generate skills, agents, commands
- **Constraint**: Must follow grammar, must validate
- **Composition**: Can generate improved versions of itself

### The Framework IS an Agent
- **Purpose**: Empower users to create Claude Code artifacts
- **Mental Plane**: Understands meta-prompting patterns
- **Physical Plane**: Generates concrete files
- **Spiritual Plane**: Ensures quality and ethics

### The Framework IS a Command
- **Interface**: Natural language description
- **Action**: Generate appropriate artifact
- **Validation**: Quality checks before output
- **Workflow**: Parse → Detect → Generate → Validate → Output

---

## The 7-Level Integration

This framework integrates with the 7-Level Skill Architecture:

| Level | Application |
|-------|-------------|
| L1 Type Safety | All artifacts have explicit types |
| L2 Error Handling | Generation failures are first-class |
| L3 Composition | Artifacts compose via defined rules |
| L4 Side Effects | Generation is isolated, pure until output |
| L5 Dependency Injection | Context flows through generation |
| L6 Lazy Evaluation | Only generate what's needed |
| L7 Emergence | Framework improves through use |

---

## Usage

### Generate a Skill

```
Input: "Create a skill for parsing JSON with schema validation"

Process:
1. Type detected: SKILL
2. Meta-prompt: SKILL-GENERATOR.md
3. Domain: json_parsing
4. Capability: parse_and_validate
5. Constraint: schema_must_be_valid
6. Composition: can_chain_with_transformers

Output: skills/json-schema-validator.md
```

### Generate an Agent

```
Input: "Create an agent for code review with security focus"

Process:
1. Type detected: AGENT
2. Meta-prompt: AGENT-GENERATOR.md
3. Purpose: Security-focused code review
4. Mental: Analyze code for vulnerabilities
5. Physical: Generate reports and suggestions
6. Spiritual: Protect users from security risks

Output: agents/security-reviewer.md
```

### Generate a Command

```
Input: "Create a command for running database migrations"

Process:
1. Type detected: COMMAND
2. Meta-prompt: COMMAND-GENERATOR.md
3. Name: /migrate
4. Arguments: --up, --down, --step, --dry-run
5. Workflow: Parse → Validate → Execute → Report

Output: commands/migrate.md
```

---

## File Structure

```
skill-agent-command-generator/
├── FRAMEWORK.md           # This file
├── CLAUDE.md              # System configuration
├── meta-prompts/
│   ├── SKILL-GENERATOR.md
│   ├── AGENT-GENERATOR.md
│   └── COMMAND-GENERATOR.md
├── generators/
│   ├── unified-generator.md
│   └── type-detector.md
├── outputs/
│   ├── skills/
│   ├── agents/
│   └── commands/
└── iterations/
    └── evolution-log.md
```

---

## Quality Standards

### Skill Quality
| Metric | Threshold | Weight |
|--------|-----------|--------|
| Specificity | ≥0.7 | 25% |
| Composability | ≥0.7 | 25% |
| Testability | ≥0.8 | 25% |
| Documentability | ≥0.8 | 25% |

### Agent Quality
| Metric | Threshold | Weight |
|--------|-----------|--------|
| Mission Clarity | ≥0.8 | 20% |
| Plane Coverage | 3/3 | 30% |
| Mode Definition | ≥2 modes | 20% |
| Ethical Bounds | Explicit | 30% |

### Command Quality
| Metric | Threshold | Weight |
|--------|-----------|--------|
| Example Count | 8-12 | 25% |
| Error Coverage | ≥5 cases | 25% |
| Argument Docs | 100% | 25% |
| Output Clarity | Copy-pasteable | 25% |

---

## Anti-Patterns

### For Skills
- Creating skills that are too broad (violates specificity)
- Creating skills that can't compose (island skills)
- Creating skills without tests (unverifiable)

### For Agents
- Creating agents without clear purpose (wandering)
- Creating agents without ethical constraints (dangerous)
- Creating agents with too many modes (unfocused)

### For Commands
- Creating commands with unclear names (unmemorable)
- Creating commands without examples (unusable)
- Creating commands without error handling (fragile)

---

## Evolution Mechanism

The framework evolves through:

1. **Usage Feedback**: Track which artifacts succeed
2. **Pattern Mining**: Extract successful patterns
3. **Meta-Prompt Updates**: Improve generators
4. **Quality Threshold Adjustment**: Raise bars over time

```
EVOLVE(framework) := {
  patterns = mine_successful_artifacts()
  insights = extract_patterns(patterns)
  updated = integrate_insights(framework, insights)
  return validate(updated) ? updated : framework
}
```

---

## Invocation

```bash
# Generate with automatic type detection
/generate "Create a skill for API rate limiting"

# Force specific type
/generate "API rate limiting" --type=skill
/generate "API rate limiting" --type=agent
/generate "API rate limiting" --type=command
```

---

## Version

- **Framework Version**: 1.0.0
- **Status**: Production Ready
- **Last Updated**: 2025-11-23
