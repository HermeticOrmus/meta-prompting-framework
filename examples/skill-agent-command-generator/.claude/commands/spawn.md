---
description: Spawn a single agent for a focused task
args:
  - name: agent
    description: Agent name or capability level
    required: true
  - name: task
    description: Task for the agent to perform
    required: true
allowed-tools: [Read, Task, TodoWrite]
---

# /spawn

Spawn a single agent for a focused task.

## What This Command Does

Creates and executes a single agent instance matched to the task requirements. Simpler than /orchestrate for tasks that don't require multi-agent coordination.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| agent | string | Yes | - | Agent name or level (L1-L5) |
| task | string | Yes | - | Task description |
| --budget | int | No | 10000 | Token budget |
| --timeout | duration | No | 2m | Maximum time |

## Examples

### Example 1: Named Agent
```
/spawn quality-guard "Validate the new skill definition"
```
**Output**:
```
🚀 Spawning: quality-guard

Task: Validate the new skill definition
Budget: 10K tokens
Timeout: 2m

Executing...
  ✓ Complete (2.3K tokens, 15s)

Result:
  Status: PASS
  Score: 0.87
  Details: validation_report.md
```

### Example 2: By Capability Level
```
/spawn L3 "Generate unit tests for the User class"
```
**Output**:
```
🚀 Spawning: L3 Planning Agent

Capability: L3_PLANNING
  - Multi-step planning
  - Session memory
  - Tool use

Executing...
  Planning: 3 test categories
  Generating: 12 test cases
  ✓ Complete

Result: user_test.go (12 tests)
```

### Example 3: Constrained
```
/spawn security-reviewer "Quick security check" --budget=3000 --timeout=30s
```
**Output**:
```
🚀 Spawning: security-reviewer (constrained)

Constraints:
  Budget: 3K tokens
  Timeout: 30s

Executing (fast mode)...
  ✓ Complete (2.1K tokens, 18s)

Result: No critical issues found
```

## Agent Levels

| Level | Name | Use For |
|-------|------|---------|
| L1 | Reactive | Validation, formatting |
| L2 | Stateful | Simple transformations |
| L3 | Planning | Code generation, analysis |
| L4 | Adaptive | Complex reasoning |
| L5 | Meta | Orchestration |

---

**Version**: 1.0.0
