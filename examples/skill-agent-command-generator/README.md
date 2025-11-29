# Skill-Agent-Command Generator

> A self-contained meta-prompting system for generating Claude Code artifacts

## Overview

This system provides a unified framework for generating three types of Claude Code artifacts through iterative meta-prompting:

| Artifact | Purpose | Grammar |
|----------|---------|---------|
| **Skill** | Reusable capability | DOMAIN × CAPABILITY × CONSTRAINT × COMPOSITION |
| **Agent** | Autonomous entity | PURPOSE × GOAL × ETHICS × COORDINATION |
| **Command** | User interface | INTERFACE × ACTION × VALIDATION × WORKFLOW |

## Quick Start

### Generate a Skill

```
"Create a skill for parsing JSON with schema validation"
```

1. Read `meta-prompts/SKILL-GENERATOR.md`
2. Apply 7-iteration refinement
3. Output to `outputs/skills/`

### Generate an Agent

```
"Create an autonomous agent for security-focused code review"
```

1. Read `meta-prompts/AGENT-GENERATOR.md`
2. Apply 7-iteration refinement
3. Output to `outputs/agents/`

### Generate a Command

```
"Create a command for running database migrations"
```

1. Read `meta-prompts/COMMAND-GENERATOR.md`
2. Apply 7-iteration refinement
3. Output to `outputs/commands/`

## File Structure

```
skill-agent-command-generator/
├── README.md                 # This file
├── CLAUDE.md                 # System configuration
├── FRAMEWORK.md              # Unified framework documentation
│
├── meta-prompts/             # Generation templates
│   ├── SKILL-GENERATOR.md    # Skill generation meta-prompt
│   ├── AGENT-GENERATOR.md    # Agent generation meta-prompt
│   └── COMMAND-GENERATOR.md  # Command generation meta-prompt
│
├── generators/               # Generation logic
│   └── unified-generator.md  # Single entry point
│
├── outputs/                  # Generated artifacts
│   ├── skills/
│   │   └── json-schema-validator.md
│   ├── agents/
│   │   └── security-reviewer.md
│   └── commands/
│       └── migrate.md
│
└── iterations/               # Evolution logs
    └── evolution-log.md
```

## The 7-Iteration Refinement Process

Each artifact is generated through 7 iterations of **Construct → Deconstruct → Reconstruct**:

| Iteration | Focus | Activity |
|-----------|-------|----------|
| 1 | Initial Construction | Build first understanding |
| 2 | Pattern Extraction | Identify structures |
| 3 | Cognitive Load | Ensure fits 7±2 model |
| 4 | Composition Design | Define integration |
| 5 | Template Derivation | Create formal structure |
| 6 | Self-Reference | Apply principles to self |
| 7 | Final Synthesis | Complete artifact |

## Unified Grammar

All three artifact types share a common grammar pattern:

```
ARTIFACT := CONTEXT × CAPABILITY × CONSTRAINT × COMPOSITION
```

This grammar ensures:
- **Context**: Where the artifact operates
- **Capability**: What it can do
- **Constraint**: What invariants it maintains
- **Composition**: How it integrates with others

## Quality Standards

### Skills
- Specificity ≥ 0.7
- Composability ≥ 0.7
- Testability ≥ 0.8
- Documentability ≥ 0.8

### Agents
- Mission clarity (one sentence)
- Three planes defined (Mental, Physical, Spiritual)
- At least 2 operational modes
- Explicit ethical constraints

### Commands
- 8-12 usage examples
- At least 5 error cases
- 100% argument documentation
- Copy-pasteable output

## Key Distinctions

```
SKILL:   What the system CAN DO     (capability)
AGENT:   What pursues GOALS         (entity)
COMMAND: How users ACCESS           (interface)
```

- **Skills** are tools used by the system
- **Agents** use tools to pursue objectives
- **Commands** let users invoke skills/agents

## Self-Referential Design

This framework demonstrates what it teaches:

- **As a Skill**: Provides artifact generation capability
- **As an Agent**: Autonomously improves through feedback
- **As a Command**: Responds to user generation requests

## Integration with 7-Level Architecture

| Level | Application |
|-------|-------------|
| L1 Type Safety | All artifacts have explicit types |
| L2 Error Handling | Generation failures are first-class |
| L3 Composition | Artifacts compose via grammar |
| L4 Side Effects | Generation is pure until output |
| L5 DI | Context flows through generation |
| L6 Lazy Eval | Generate only what's needed |
| L7 Emergence | Framework improves through use |

## Example Outputs

### Generated Skill: JsonSchemaValidator
- **Domain**: Data validation
- **Capability**: Parse and validate JSON
- **Quality Score**: 0.90

### Generated Agent: SecurityReviewer
- **Purpose**: Security-focused code review
- **Planes**: Mental (analysis), Physical (remediation), Spiritual (user protection)
- **Modes**: Deep Review, Quick Scan, Advisory, Monitoring

### Generated Command: /migrate
- **Purpose**: Database migration management
- **Examples**: 10 comprehensive use cases
- **Error Cases**: 5 documented scenarios

## Usage

### With Claude Code

Reference the CLAUDE.md file when working in this directory:

```
# Claude will use CLAUDE.md for context
cd examples/skill-agent-command-generator
```

### Manual Generation

1. Identify artifact type (skill/agent/command)
2. Read appropriate meta-prompt
3. Apply 7-iteration refinement
4. Validate against quality standards
5. Save to outputs directory

## Version

- **Framework Version**: 1.0.0
- **Status**: Production Ready
- **Last Updated**: 2025-11-23
