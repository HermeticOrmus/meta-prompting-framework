# Skill: AgentCoordination

> Derived from 7-iteration meta-prompting on agentic architectures

---

## Metadata

```yaml
name: AgentCoordination
domain: agentic_systems
version: 1.0.0
cognitive_load: O(n²)
dependencies: [ResultType, Pipeline, EffectIsolation, ContextReader]
provides: [agent_spawning, coordination_patterns, failure_handling, state_management]
```

## Grammar

| Element | Definition |
|---------|------------|
| **Context** | Multi-agent task requiring coordination |
| **Capability** | Spawn, coordinate, and manage agents |
| **Constraint** | Resource budgets, capability bounds, ethical limits |
| **Composition** | Hierarchical orchestration with parallel execution |

## Purpose

Enable coordinated multi-agent workflows where autonomous agents collaborate to achieve complex goals. Provides patterns for spawning agents, coordinating their work, managing shared state, and handling failures.

## Core Concepts

### Agent Capability Levels

| Level | Name | Planning | Memory | Learning | Coordination |
|-------|------|----------|--------|----------|--------------|
| L1 | Reactive | None | None | None | Receives commands |
| L2 | Stateful | None | Session | None | Receives commands |
| L3 | Planning | Single-task | Session | None | Peer-to-peer |
| L4 | Adaptive | Multi-task | Persistent | Feedback | Negotiation |
| L5 | Meta | Hierarchical | Episodic | Self-improve | Orchestration |

### Coordination Patterns

| Pattern | Use When | Latency | Complexity |
|---------|----------|---------|------------|
| Sequential | Order matters | High | Low |
| Parallel | Independent tasks | Low | Medium |
| Hierarchical | Complex decomposition | Medium | Medium |
| Swarm | Exploration/optimization | Variable | High |
| Race | Multiple approaches | Lowest | Medium |

## Interface

### Core Operations

```
// Agent lifecycle
Spawn(definition: AgentDef, context: Context) → Result[RunningAgent]
Terminate(agent: RunningAgent) → Result[Unit]
Checkpoint(agent: RunningAgent) → Result[Snapshot]
Restore(snapshot: Snapshot) → Result[RunningAgent]

// Coordination
Coordinate(agents: []Agent, pattern: Pattern) → Coordinator
Execute(coordinator: Coordinator, task: Task) → Result[Output]
Monitor(coordinator: Coordinator) → Stream[Status]
```

### Pattern Operations

```
// Sequential: A → B → C
Sequential(agents: []Agent) → Pipeline[Agent]

// Parallel: A | B | C → merge
Parallel(agents: []Agent, merge: []Output → Output) → ParallelGroup

// Hierarchical: Manager → Workers
Hierarchical(manager: Agent, workers: []Agent) → Hierarchy

// Race: First to complete wins
Race(agents: []Agent, timeout: Duration) → Racer

// Swarm: Emergent coordination
Swarm(agents: []Agent, objective: Objective) → Swarm
```

### State Operations

```
// Layered state access
GetContext() → ImmutableContext
GetLocal(agent: Agent) → MutableState
AppendArtifact(artifact: Artifact) → Result[Unit]
WithCoordination(fn: CoordState → Result[A]) → Result[A]
```

## Patterns

### Pattern 1: Sequential Pipeline
```
// Agents process in order, each receiving previous output
pipeline := Sequential([
    parserAgent,
    validatorAgent,
    transformerAgent,
    outputAgent,
])

result := pipeline.Execute(input)
// input → parser → validator → transformer → output
```

### Pattern 2: Parallel Fan-Out/Fan-In
```
// Multiple agents work independently, results merged
parallel := Parallel([
    researchAgent,
    codeReviewAgent,
    securityAgent,
], mergeReports)

result := parallel.Execute(codebase)
// codebase → [research, review, security] → merge → report
```

### Pattern 3: Hierarchical Decomposition
```
// Manager decomposes, workers execute, manager synthesizes
hierarchy := Hierarchical(
    manager: orchestratorAgent,
    workers: [implAgent1, implAgent2, implAgent3],
)

result := hierarchy.Execute(complexTask)
// task → decompose → [worker1, worker2, worker3] → synthesize → result
```

### Pattern 4: Racing Alternatives
```
// Multiple approaches, first valid result wins
race := Race([
    fastApproximateAgent,
    slowExactAgent,
    heuristicAgent,
], timeout: 30.seconds)

result := race.Execute(problem)
// Whichever finishes first with valid result
```

### Pattern 5: Adaptive Coordination
```
// Select pattern based on task characteristics
func Coordinate(task: Task) → Coordinator {
    if task.isParallelizable():
        return Parallel(selectAgents(task))
    if task.isHierarchical():
        return Hierarchical(manager, selectWorkers(task))
    if task.isExploratory():
        return Swarm(selectAgents(task), task.objective)
    return Sequential(selectAgents(task))
}
```

### Pattern 6: Failure Recovery
```
// Retry with fallback and escalation
func ExecuteResilient(coord: Coordinator, task: Task) → Result[Output] {
    return coord.Execute(task)
        .Retry(3, exponentialBackoff)
        .OrElse(_ => fallbackCoordinator.Execute(task))
        .OrElse(_ => escalateToHuman(task))
}
```

## State Management

### Layered State Model

```
LAYERED_STATE := {
  // Layer 1: Immutable context (read-only)
  context: {
    task: what_to_accomplish,
    constraints: resource_and_capability_bounds,
    environment: available_tools_and_services
  },

  // Layer 2: Agent-local state (private)
  local: {
    working_memory: current_reasoning,
    plans: intended_actions,
    hypotheses: tentative_conclusions
  },

  // Layer 3: Shared artifacts (append-only)
  artifacts: {
    outputs: generated_content,
    logs: execution_trace,
    metrics: performance_data
  },

  // Layer 4: Coordination state (transactional)
  coordination: {
    assignments: which_agent_owns_what,
    locks: exclusive_access_grants,
    progress: completion_status
  }
}
```

## Resilience

### Circuit Breaker Pattern
```
CircuitBreaker := {
  states: {
    CLOSED: normal_operation,
    OPEN: fast_fail_all_requests,
    HALF_OPEN: probe_for_recovery
  },

  transitions: {
    CLOSED → OPEN: when failure_count > threshold,
    OPEN → HALF_OPEN: after cooldown_period,
    HALF_OPEN → CLOSED: when probe_succeeds,
    HALF_OPEN → OPEN: when probe_fails
  }
}
```

### Retry Strategy
```
RetryStrategy := {
  maxAttempts: 3,
  backoff: exponential(base: 1.second, max: 30.seconds),
  jitter: random(0, 500.millis),
  retryOn: [Timeout, Transient, ResourceExhausted],
  failFast: [InvalidInput, PermissionDenied]
}
```

## Anti-Patterns

| Anti-Pattern | Problem | Correct |
|--------------|---------|---------|
| Unbounded parallelism | Resource exhaustion | Limit concurrent agents |
| Shared mutable state | Race conditions | Use layered state model |
| No failure handling | Cascading failures | Circuit breakers + retries |
| Tight coupling | Brittle system | Message-based coordination |
| God orchestrator | Single point of failure | Hierarchical delegation |

## Quality Metrics

| Metric | Score | Threshold |
|--------|-------|-----------|
| Specificity | 0.82 | ≥0.7 |
| Composability | 0.90 | ≥0.7 |
| Testability | 0.85 | ≥0.8 |
| Documentability | 0.88 | ≥0.8 |
| **Overall** | **0.86** | ≥0.75 |

## Mastery Signal

You have mastered AgentCoordination when:
- You select the right coordination pattern for each task
- Your multi-agent systems handle failures gracefully
- State flows cleanly through layered boundaries
