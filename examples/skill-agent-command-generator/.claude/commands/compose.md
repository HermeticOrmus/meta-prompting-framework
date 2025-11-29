---
description: Compose multiple skills into unified workflows using the SkillComposer agent
args:
  - name: skills
    description: Space-separated list of skill names to compose
    required: true
  - name: pattern
    description: Composition pattern (sequential, parallel, fallback)
    required: false
allowed-tools: [Read, Write, Glob, Grep, Task, TodoWrite]
---

# /compose

Compose multiple skills into unified workflows.

## What This Command Does

Analyzes skill interfaces, detects compatibility, and generates a composed skill that combines the capabilities of multiple input skills using the specified composition pattern.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| skills | string[] | Yes | - | Skills to compose (space-separated) |
| --pattern | string | No | sequential | `sequential`, `parallel`, `fallback` |
| --name | string | No | auto | Name for composed skill |
| --output | string | No | auto | Output path |
| --analyze | bool | No | false | Analysis only, don't create |

## Composition Patterns

### Sequential (default)
```
A >> B >> C
Output of A feeds B, output of B feeds C
```

### Parallel
```
A & B & C
All execute independently, results combined
```

### Fallback
```
A || B || C
Try A, if fails try B, if fails try C
```

## Workflow

### Step 1: Load Skills
```
FOR each skill name:
  Load skill definition from .claude/skills/
  Extract interface (inputs, outputs, effects)
```

### Step 2: Analyze Compatibility
```
Invoke SkillComposer agent in analysis mode
Check type compatibility between skills
Identify required adapters
```

### Step 3: Generate Composition
```
IF --analyze:
  Show compatibility report
  EXIT
ELSE:
  Generate adapter functions
  Create composition glue
  Build composed skill
```

### Step 4: Validate
```
Check composed skill quality
Verify constraint preservation
Ensure no capability leakage
```

## Examples

### Example 1: Sequential Composition
```
/compose option-type result-type
```
**Output**:
```
✅ Composed: safe-value.md

Composition: OptionType >> ResultType
Pattern: sequential

Interface:
  Input: T | nil
  Output: Result[T]

Generated adapters:
  - Option.toResult(error)
```

### Example 2: Parallel Composition
```
/compose rate-limiter cache-manager --pattern=parallel
```
**Output**:
```
✅ Composed: optimized-access.md

Composition: RateLimiter & CacheManager
Pattern: parallel

Both execute for each request:
  - Rate limiter checks quota
  - Cache manager checks cache
  Results combined
```

### Example 3: Fallback Composition
```
/compose cache-fetch db-fetch api-fetch --pattern=fallback
```
**Output**:
```
✅ Composed: resilient-fetch.md

Composition: CacheFetch || DBFetch || APIFetch
Pattern: fallback

Execution order:
  1. Try cache (fast)
  2. If miss, try database (medium)
  3. If miss, try API (slow)
```

### Example 4: Full Stack (L1-L6)
```
/compose L1-option-type L2-result-type L3-pipeline L4-effect-isolation L5-context-reader L6-lazy-stream
```
**Output**:
```
✅ Composed: full-stack.md

Composition: L1 >> L2 >> L3 >> L4 >> L5 >> L6
Pattern: sequential (layered)

Interface:
  Input: Reader[Env, Stream[T]]
  Output: Reader[Env, IO[Stream[Result[Option[U]]]]]

This creates the complete functional stack.
```

### Example 5: Analysis Only
```
/compose skill-a skill-b --analyze
```
**Output**:
```
Composition Analysis
━━━━━━━━━━━━━━━━━━━

Skills: skill-a, skill-b

Compatibility:
  skill-a.output → skill-b.input: ✓ Compatible

Required Adapters:
  - typeAdapter(A.Out, B.In)

Suggested Pattern: sequential

Quality Estimate: 0.85

To compose: Remove --analyze flag
```

### Example 6: Custom Name
```
/compose validator transformer --name=validated-transformer
```
**Output**: `.claude/skills/validated-transformer.md`

### Example 7: Incompatible Skills
```
/compose incompatible-a incompatible-b
```
**Output**:
```
❌ Error: Incompatible skills

skill-a.output: string
skill-b.input:  int

Cannot compose: type mismatch
No adapter available

Suggestions:
  - Add type conversion skill
  - Modify skill interfaces
  - Use different skills
```

### Example 8: Three-Way Sequential
```
/compose parse validate transform
```
**Output**:
```
✅ Composed: parse-validate-transform.md

Pipeline:
  Raw → [Parse] → Parsed → [Validate] → Valid → [Transform] → Output
```

## Error Handling

### Error: Skill Not Found
```
❌ Error: Skill not found: unknown-skill

Available skills:
  - L1-option-type
  - L2-result-type
  - ...

Check: ls .claude/skills/
```

### Error: Incompatible Types
```
❌ Error: Type mismatch

skill-a outputs: User
skill-b expects: Order

Cannot compose without adapter.
```

### Error: Circular Dependency
```
❌ Error: Circular dependency detected

A → B → C → A

Cannot compose circular dependencies.
```

## Output Format

### Success
```
✅ Composed: {name}.md

Composition: {skill-a} {op} {skill-b} ...
Pattern: {pattern}

Interface:
  Input: {combined-input-type}
  Output: {combined-output-type}

Generated:
  - Adapters: {count}
  - Glue functions: {count}
  - Quality: {score}

Location: .claude/skills/{name}.md
```

---

**Version**: 1.0.0
**Status**: Production Ready
