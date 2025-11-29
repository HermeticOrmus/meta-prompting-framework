# Integration Layer

> How skills, agents, and commands work together as a coherent system

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│  /generate    /compose    /validate    /evolve                  │
└─────────────────────────────┬───────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                        AGENTS                                    │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────┐          │
│  │ SkillComposer│ │ QualityGuard │ │ EvolutionEngine │          │
│  │   (compose)  │ │  (validate)  │ │    (improve)    │          │
│  └──────┬──────┘ └──────┬───────┘ └────────┬────────┘          │
└─────────┼───────────────┼──────────────────┼────────────────────┘
          │               │                  │
┌─────────┼───────────────┼──────────────────┼────────────────────┐
│         │          SKILLS                   │                    │
│  ┌──────┴─────────────────────────────────┴────────────┐       │
│  │                   L7: MetaGenerator                  │       │
│  │                   (generates artifacts)              │       │
│  └──────────────────────────┬──────────────────────────┘       │
│  ┌──────────────────────────┴──────────────────────────┐       │
│  │                   L6: LazyStream                     │       │
│  │                   (infinite sequences)               │       │
│  └──────────────────────────┬──────────────────────────┘       │
│  ┌──────────────────────────┴──────────────────────────┐       │
│  │                   L5: ContextReader                  │       │
│  │                   (dependency injection)             │       │
│  └──────────────────────────┬──────────────────────────┘       │
│  ┌──────────────────────────┴──────────────────────────┐       │
│  │                   L4: EffectIsolation                │       │
│  │                   (side effect management)           │       │
│  └──────────────────────────┬──────────────────────────┘       │
│  ┌──────────────────────────┴──────────────────────────┐       │
│  │                   L3: Pipeline                       │       │
│  │                   (data transformation)              │       │
│  └──────────────────────────┬──────────────────────────┘       │
│  ┌──────────────────────────┴──────────────────────────┐       │
│  │                   L2: ResultType                     │       │
│  │                   (error handling)                   │       │
│  └──────────────────────────┬──────────────────────────┘       │
│  ┌──────────────────────────┴──────────────────────────┐       │
│  │                   L1: OptionType                     │       │
│  │                   (null safety)                      │       │
│  └─────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Dependency Graph

### Skills (Layered)
```
L1-option-type
    ↓
L2-result-type (depends on L1)
    ↓
L3-pipeline (depends on L2)
    ↓
L4-effect-isolation (depends on L3)
    ↓
L5-context-reader (depends on L4)
    ↓
L6-lazy-stream (depends on L5)
    ↓
L7-meta-generator (depends on L1-L6)
```

### Agents (Collaborative)
```
SkillComposer ←→ QualityGuard ←→ EvolutionEngine
     ↓              ↓                ↓
   compose       validate          improve
     ↓              ↓                ↓
    SKILLS        SKILLS          TEMPLATES
```

### Commands (User-Facing)
```
/generate → MetaGenerator → QualityGuard → Output
/compose → SkillComposer → QualityGuard → Output
/validate → QualityGuard → Report
/evolve → EvolutionEngine → Templates
```

---

## Integration Flows

### Flow 1: Generate Artifact
```
User: /generate "rate limiting capability"
  ↓
Command: Parse description, detect type (skill)
  ↓
MetaGenerator: Load SKILL-GENERATOR meta-prompt
  ↓
MetaGenerator: Run 7-iteration refinement
  ↓
MetaGenerator: Generate artifact
  ↓
QualityGuard: Validate quality ≥ 0.75
  ↓
Output: .claude/skills/rate-limiter.md
```

### Flow 2: Compose Skills
```
User: /compose L1-option-type L2-result-type
  ↓
Command: Load skill definitions
  ↓
SkillComposer: Analyze interfaces
  ↓
SkillComposer: Check type compatibility
  ↓
SkillComposer: Generate adapters
  ↓
SkillComposer: Create composition glue
  ↓
QualityGuard: Validate composed skill
  ↓
Output: .claude/skills/safe-value.md
```

### Flow 3: Validate Artifacts
```
User: /validate .claude/skills/
  ↓
Command: Find all skill files
  ↓
QualityGuard: Load each artifact
  ↓
QualityGuard: Score each dimension
  ↓
QualityGuard: Compare to thresholds
  ↓
Output: Validation report
```

### Flow 4: Evolve System
```
User: /evolve analyze
  ↓
Command: Trigger EvolutionEngine
  ↓
EvolutionEngine: Load all artifacts
  ↓
EvolutionEngine: Segment by quality
  ↓
EvolutionEngine: Extract patterns
  ↓
EvolutionEngine: Rank by impact
  ↓
Output: Pattern analysis report

User: /evolve update
  ↓
EvolutionEngine: Load patterns
  ↓
EvolutionEngine: Update meta-prompts
  ↓
QualityGuard: Validate new templates
  ↓
Output: Updated templates
```

---

## Type Compatibility Matrix

### Skills

| Skill | Input Type | Output Type |
|-------|------------|-------------|
| L1-OptionType | T \| nil | Option[T] |
| L2-ResultType | T, Error | Result[T] |
| L3-Pipeline | []T | []U |
| L4-EffectIsolation | () → T | IO[T] |
| L5-ContextReader | Env → T | Reader[Env, T] |
| L6-LazyStream | () → (T, Stream) | Stream[T] |
| L7-MetaGenerator | string | Artifact |

### Composition Compatibility

```
L1 → L2: Option.toResult(error)
L2 → L3: Pipeline.From(result)
L3 → L4: IO.Map(pipeline)
L4 → L5: Reader.Map(io)
L5 → L6: Stream.Map(reader)
L6 → L7: MetaGenerator.FromStream(stream)
```

---

## Quality Propagation

When skills compose, quality metrics propagate:

```
COMPOSED_QUALITY := {
  specificity: min(component specificities),
  composability: product(component composabilities),
  testability: min(component testabilities),
  documentability: average(component documentabilities)
}
```

Example:
```
L1 (0.95) + L2 (0.91) = Composed:
  specificity: min(0.95, 0.92) = 0.92
  composability: 0.98 × 0.95 = 0.93
  testability: min(0.95, 0.90) = 0.90
  documentability: (0.90 + 0.88) / 2 = 0.89
  overall: 0.91
```

---

## Agent Coordination Protocol

### Handoff Pattern
```
Agent A completes task → Passes result to Agent B → Agent B continues

Example:
SkillComposer generates composed skill
    ↓ handoff
QualityGuard validates composed skill
    ↓ handoff
EvolutionEngine tracks for pattern mining
```

### Supervisor Pattern
```
QualityGuard supervises all artifact creation:
  - Before: Check inputs are valid
  - After: Check outputs meet quality
  - Escalate: Flag issues for human review
```

### Swarm Pattern
```
For large-scale operations:
  - Multiple SkillComposers work in parallel
  - QualityGuard validates batches
  - EvolutionEngine aggregates patterns
```

---

## Error Propagation

Errors flow through the system with context:

```
L1: OptionError (None when Some expected)
    ↓ wraps
L2: ResultError (with context)
    ↓ wraps
L3: PipelineError (with position in pipeline)
    ↓ wraps
L4: EffectError (with IO context)
    ↓ wraps
L5: ReaderError (with environment context)
    ↓ wraps
L6: StreamError (with position in stream)
    ↓ wraps
L7: GenerationError (full trace)
```

---

## Usage Patterns

### Pattern 1: Full Generation Flow
```bash
# Generate a new skill
/generate "caching capability" --type=skill --level=3

# Validate it
/validate .claude/skills/cache-manager.md

# Compose with existing skill
/compose rate-limiter cache-manager

# Evolve based on new artifacts
/evolve analyze
```

### Pattern 2: Quality Improvement Flow
```bash
# Check all artifacts
/validate .claude/

# Find patterns in successful ones
/evolve analyze --threshold=0.90

# Update templates with patterns
/evolve update

# Regenerate failing artifacts
/generate "..." --validate
```

### Pattern 3: Composition Flow
```bash
# Analyze compatibility
/compose skill-a skill-b --analyze

# Compose with custom name
/compose skill-a skill-b --name=combined-skill

# Validate composition
/validate .claude/skills/combined-skill.md
```

---

## Version Compatibility

All artifacts include version information for compatibility tracking:

```yaml
# In artifact frontmatter
version: 1.0.0
requires:
  - L1-option-type: ">=1.0.0"
  - L2-result-type: ">=1.0.0"
```

The system checks version compatibility before composition.

---

## Self-Reference

This integration layer itself follows the patterns it describes:
- It's **typed** (clear interfaces)
- It **handles errors** (propagation with context)
- It **composes** (skills + agents + commands)
- It **isolates effects** (agents handle IO)
- It **injects context** (environment flows through)
- It **evaluates lazily** (only compute what's needed)
- It **evolves** (improves through use)
