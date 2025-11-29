# Skill: AgentSpawning

> Derived from 7-iteration meta-prompting on agentic architectures

---

## Metadata

```yaml
name: AgentSpawning
domain: agentic_systems
version: 1.0.0
cognitive_load: O(n)
dependencies: [ResultType, EffectIsolation, ContextReader]
provides: [agent_creation, capability_matching, resource_allocation, lifecycle_management]
```

## Grammar

| Element | Definition |
|---------|------------|
| **Context** | Need to create and manage agent instances |
| **Capability** | Spawn agents with appropriate capabilities |
| **Constraint** | Resource budgets, capability bounds |
| **Composition** | Integrates with coordination patterns |

## Purpose

Create and manage agent instances with appropriate capabilities for tasks. Handles agent definition, instantiation, resource allocation, and lifecycle management.

## Interface

### Agent Definition

```
AgentDefinition := {
  identity: {
    name: string,
    purpose: string,
    version: semver
  },

  capability: {
    level: L1_REACTIVE | L2_STATEFUL | L3_PLANNING | L4_ADAPTIVE | L5_META,
    skills: Skill[],
    tools: Tool[]
  },

  planes: {
    mental: MentalCapabilities,
    physical: PhysicalCapabilities,
    spiritual: EthicalConstraints
  },

  resources: {
    token_budget: int,
    time_budget: Duration,
    memory_limit: Bytes
  },

  constraints: {
    allowed_actions: Action[],
    forbidden_actions: Action[],
    escalation_triggers: Condition[]
  }
}
```

### Core Operations

```
// Definition
Define(spec: AgentSpec) → Result[AgentDefinition]
Validate(def: AgentDefinition) → Result[ValidationReport]

// Instantiation
Spawn(def: AgentDefinition, context: Context) → Result[Agent]
SpawnPool(def: AgentDefinition, count: int) → Result[AgentPool]

// Lifecycle
Pause(agent: Agent) → Result[Unit]
Resume(agent: Agent) → Result[Unit]
Terminate(agent: Agent) → Result[Unit]

// Resource management
GetUsage(agent: Agent) → ResourceUsage
SetBudget(agent: Agent, budget: Budget) → Result[Unit]
```

### Capability Matching

```
// Find best agent for task
Match(task: Task, available: []AgentDefinition) → Result[AgentDefinition]

// Check if agent can handle task
CanHandle(agent: AgentDefinition, task: Task) → bool

// Required capability level for task
RequiredLevel(task: Task) → CapabilityLevel
```

## Patterns

### Pattern 1: Basic Agent Spawn
```
// Define and spawn a single agent
reviewerDef := Define(AgentSpec{
    name: "CodeReviewer",
    purpose: "Review code for quality and security",
    level: L3_PLANNING,
    skills: [codeAnalysis, securityAudit],
    token_budget: 10000,
})

reviewer := Spawn(reviewerDef, taskContext)
```

### Pattern 2: Agent Pool
```
// Spawn pool of workers for parallel execution
workerDef := Define(AgentSpec{
    name: "Worker",
    purpose: "Execute subtasks",
    level: L2_STATEFUL,
})

pool := SpawnPool(workerDef, 5)
// Now have 5 workers ready for task assignment
```

### Pattern 3: Capability Matching
```
// Find best agent for complex task
task := Task{
    description: "Refactor authentication module",
    requires: [planning, code_generation, testing],
    complexity: high,
}

// System finds agent with sufficient capabilities
bestAgent := Match(task, availableAgents)
```

### Pattern 4: Dynamic Scaling
```
// Scale agent pool based on workload
func AutoScale(pool: AgentPool, workload: Workload) {
    current := pool.Size()
    needed := estimateNeeded(workload)

    if needed > current:
        pool.Grow(needed - current)
    else if needed < current:
        pool.Shrink(current - needed)
}
```

### Pattern 5: Resource-Bounded Spawn
```
// Spawn with strict resource limits
limitedAgent := Spawn(
    definition.WithBudget(Budget{
        tokens: 5000,
        time: 30.seconds,
        memory: 100.MB,
    }),
    context,
)

// Agent automatically terminates if limits exceeded
```

## Agent Templates

### L1 Reactive Agent
```yaml
name: ReactiveAgent
level: L1_REACTIVE
capabilities:
  - single_operation
  - no_planning
  - no_memory
use_for:
  - Validation
  - Formatting
  - Simple transformations
token_budget: 1000
```

### L3 Planning Agent
```yaml
name: PlanningAgent
level: L3_PLANNING
capabilities:
  - multi_step_planning
  - session_memory
  - tool_use
use_for:
  - Code generation
  - Research
  - Analysis
token_budget: 10000
```

### L5 Meta Agent
```yaml
name: MetaAgent
level: L5_META
capabilities:
  - hierarchical_planning
  - episodic_memory
  - self_improvement
  - agent_coordination
use_for:
  - Orchestration
  - Complex workflows
  - System optimization
token_budget: 50000
```

## Anti-Patterns

| Anti-Pattern | Problem | Correct |
|--------------|---------|---------|
| Over-provisioning | Wasted resources | Match capability to task |
| Under-provisioning | Task failure | Validate before spawn |
| No resource limits | Runaway consumption | Always set budgets |
| Orphaned agents | Resource leak | Proper lifecycle management |

## Quality Metrics

| Metric | Score | Threshold |
|--------|-------|-----------|
| Specificity | 0.85 | ≥0.7 |
| Composability | 0.88 | ≥0.7 |
| Testability | 0.90 | ≥0.8 |
| Documentability | 0.85 | ≥0.8 |
| **Overall** | **0.87** | ≥0.75 |

## Mastery Signal

You have mastered AgentSpawning when:
- You match agent capabilities to task requirements
- All agents have appropriate resource bounds
- Agent lifecycles are properly managed
