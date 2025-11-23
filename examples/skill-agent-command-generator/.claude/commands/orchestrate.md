---
description: Run multi-agent orchestrated workflows for complex tasks
args:
  - name: task
    description: Natural language description of the complex task
    required: true
  - name: pattern
    description: Coordination pattern (auto, sequential, parallel, hierarchical)
    required: false
allowed-tools: [Read, Write, Task, Glob, Grep, TodoWrite]
---

# /orchestrate

Run multi-agent orchestrated workflows for complex tasks.

## What This Command Does

Invokes the Orchestrator agent to decompose complex tasks, spawn appropriate sub-agents, coordinate their execution, handle failures, and synthesize results into a coherent output.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| task | string | Yes | - | Task description |
| --pattern | string | No | auto | `auto`, `sequential`, `parallel`, `hierarchical`, `race` |
| --max-agents | int | No | 5 | Maximum agents to spawn |
| --budget | int | No | 50000 | Token budget for entire workflow |
| --timeout | duration | No | 5m | Maximum execution time |
| --dry-run | bool | No | false | Plan only, don't execute |
| --verbose | bool | No | false | Show detailed progress |

## Workflow

### Step 1: Task Analysis
```
Parse task description
Identify subtasks and dependencies
Estimate complexity and resources
Select coordination pattern (if auto)
```

### Step 2: Agent Selection
```
Match subtasks to available agents
Check capability requirements
Verify resource availability
Create execution plan
```

### Step 3: Execution
```
Initialize coordination state
Spawn required agents
Execute coordination pattern
Monitor progress
Handle failures
Collect results
```

### Step 4: Synthesis
```
Aggregate agent outputs
Validate completeness
Synthesize into coherent result
Generate execution report
```

## Examples

### Example 1: Auto-Orchestration
```
/orchestrate "Comprehensive code review of the authentication module"
```
**Output**:
```
🎯 Orchestrating: Comprehensive code review

Planning:
  Pattern: parallel (auto-selected)
  Subtasks: 4
  Agents: [linter, security, performance, synthesizer]
  Estimated: 25K tokens, ~2min

Executing:
  ✓ static_analysis (linter) - 3.2K tokens, 12s
  ✓ security_audit (security) - 8.1K tokens, 45s
  ✓ perf_review (performance) - 5.4K tokens, 28s
  ✓ synthesis (synthesizer) - 4.8K tokens, 22s

Result:
  Status: completed
  Total: 21.5K tokens, 107s
  Output: code_review_report.md

Review found:
  - 3 security issues (1 high, 2 medium)
  - 5 performance suggestions
  - 12 style improvements
```

### Example 2: Sequential Pipeline
```
/orchestrate "Parse, validate, and transform the config file" --pattern=sequential
```
**Output**:
```
🎯 Orchestrating: Config processing pipeline

Planning:
  Pattern: sequential (specified)
  Subtasks: 3
  Pipeline: parser → validator → transformer

Executing:
  ✓ Step 1/3: parse_config - 1.2K tokens
  ✓ Step 2/3: validate_config - 2.1K tokens
  ✓ Step 3/3: transform_config - 1.8K tokens

Result: transformed_config.json
```

### Example 3: Parallel Fan-Out
```
/orchestrate "Research trends in Go, Rust, and Zig concurrency" --pattern=parallel
```
**Output**:
```
🎯 Orchestrating: Multi-language research

Planning:
  Pattern: parallel (specified)
  Subtasks: 3 (independent)
  Agents: [researcher×3]

Executing:
  ⟳ go_research (researcher-1)
  ⟳ rust_research (researcher-2)
  ⟳ zig_research (researcher-3)
  ...
  ✓ All complete (45s)

Merging results...
  ✓ Synthesis complete

Result: concurrency_trends_report.md
```

### Example 4: Hierarchical Delegation
```
/orchestrate "Refactor the entire data layer" --pattern=hierarchical --max-agents=8
```
**Output**:
```
🎯 Orchestrating: Data layer refactoring

Planning:
  Pattern: hierarchical
  Manager: orchestrator
  Workers: [analyzer, refactorer×4, tester×2, documenter]

Executing:
  Manager: Analyzing structure...
  Manager: Delegating subtasks...
    → worker-1: models/
    → worker-2: repositories/
    → worker-3: migrations/
    → worker-4: tests/

  Progress: [████████░░] 80%

  Manager: Validating results...
  Manager: Synthesizing output...

Result:
  Files modified: 23
  Tests: 45 passing
  Documentation: updated
```

### Example 5: Racing Alternatives
```
/orchestrate "Optimize the search algorithm" --pattern=race --timeout=2m
```
**Output**:
```
🎯 Orchestrating: Algorithm optimization (race)

Planning:
  Pattern: race
  Alternatives: [heuristic, exact, ml_based]
  Timeout: 2m

Racing:
  ⟳ heuristic_optimizer - running
  ⟳ exact_optimizer - running
  ⟳ ml_optimizer - running

  Winner: heuristic_optimizer (23s)

Validating winning solution...
  ✓ Correctness verified
  ✓ Performance: 3.2x improvement

Result: optimized_search.go
```

### Example 6: Dry Run (Planning Only)
```
/orchestrate "Complete system audit" --dry-run
```
**Output**:
```
🔍 DRY RUN - Planning Only

Task: Complete system audit

Proposed Plan:
  Pattern: hierarchical (auto-selected)
  Reason: Complex task with multiple domains

  Subtasks:
    1. security_audit
       Agent: security-reviewer
       Est: 15K tokens, 60s

    2. performance_audit
       Agent: perf-analyzer
       Est: 12K tokens, 45s

    3. code_quality_audit
       Agent: quality-guard
       Est: 8K tokens, 30s

    4. dependency_audit
       Agent: dep-scanner
       Est: 5K tokens, 20s

    5. synthesis
       Agent: report-generator
       Est: 10K tokens, 40s

  Total Estimate:
    Tokens: ~50K
    Time: ~3-4min
    Agents: 5

To execute: Remove --dry-run flag
```

### Example 7: Verbose Progress
```
/orchestrate "Generate API documentation" --verbose
```
**Output**:
```
🎯 Orchestrating: API documentation generation

[00:00] Analyzing task...
[00:02] Pattern selected: sequential
[00:02] Agents selected: [scanner, analyzer, generator, formatter]

[00:03] Spawning agent: api-scanner
        Capability: L2_STATEFUL
        Budget: 5000 tokens
[00:03] Agent spawned successfully

[00:03] Executing: api-scanner
[00:15] Progress: Scanned 23 endpoints
[00:18] Complete: api-scanner (2.1K tokens, 15s)
        Output: endpoint_list.json

[00:18] Spawning agent: schema-analyzer
...

[02:34] Synthesis complete
[02:35] Cleanup: All agents terminated

Result:
  Output: api_documentation/
  Files: 12
  Total: 18.3K tokens, 155s
```

### Example 8: Resource Constrained
```
/orchestrate "Quick code lint" --budget=5000 --max-agents=2 --timeout=30s
```
**Output**:
```
🎯 Orchestrating: Quick lint (constrained)

Constraints Applied:
  Budget: 5000 tokens
  Max agents: 2
  Timeout: 30s

Adjusted Plan:
  Pattern: sequential (resource-optimized)
  Agents: [fast-linter, reporter]

Executing with constraints...
  ✓ lint - 2.8K tokens, 12s
  ✓ report - 1.1K tokens, 5s

Result:
  Tokens used: 3.9K / 5K budget
  Time: 17s / 30s timeout
  Output: lint_report.txt
```

## Error Handling

### Error: Budget Exceeded
```
⚠️ Budget warning at 80%

Entering degraded mode...
  Skipping: optional_documentation
  Reducing: analysis_depth

Completed with reduced scope.
```

### Error: Agent Failure
```
❌ Agent failed: security-reviewer

Recovery:
  Strategy: retry with backoff
  Attempt: 2/3

  ✓ Retry successful

Continuing workflow...
```

### Error: Timeout
```
⏱️ Timeout reached (5m)

Partial results available:
  ✓ static_analysis - complete
  ✓ security_audit - complete
  ⟳ performance_review - 60% complete
  ○ synthesis - not started

Returning partial results...
```

### Error: Unrecoverable
```
❌ Unrecoverable error after 3 retries

Error: External service unavailable

Options:
  1. Retry later: /orchestrate ... --retry-failed
  2. Skip failed step: /orchestrate ... --skip=security
  3. Escalate to human review

Partial work saved: .orchestrator/failed_task_123/
```

## Output Format

### Success
```
🎯 Orchestrating: {task}

Planning:
  Pattern: {pattern}
  Subtasks: {count}
  Agents: [{agent_list}]

Executing:
  {progress_updates}

Result:
  Status: completed
  Tokens: {used} / {budget}
  Time: {duration}
  Output: {output_location}
```

### Partial Success
```
⚠️ Orchestration partially completed

Completed:
  ✓ {completed_subtasks}

Failed:
  ✗ {failed_subtasks}

Partial output: {location}
```

---

**Version**: 1.0.0
**Status**: Production Ready
