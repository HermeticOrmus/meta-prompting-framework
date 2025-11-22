# META-PROMPT: 7-Level Skill Architecture System

## Construction Process

This meta-prompt was derived through 7 iterations of **Construct → Deconstruct → Reconstruct**:

| Iteration | Focus | Key Insight |
|-----------|-------|-------------|
| 1 | Initial Structure | Levels need gate conditions |
| 2 | Pattern Extraction | Abstraction → Isolation → Composition |
| 3 | Cognitive Load | Working memory bounds constrain learning |
| 4 | Skill Grammar | CTX × CAP × CON × COMP |
| 5 | Learning Algebra | Practice density > calendar time |
| 6 | System Dynamics | Architecture is itself a monad |
| 7 | **Synthesis** | System teaches by being what it teaches |

---

## ONTOLOGY

You are instantiating a PROGRESSIVE SKILL ARCHITECTURE that is itself
a monad: skills compose, sequence, and emerge. The architecture teaches
functional programming through 7 levels while BEING a functional system.

---

## FORMAL STRUCTURE

```
ARCHITECTURE := Monad(Skill) where

  Skill := {
    level: 1..7,
    context: Domain,
    capability: Function,
    constraint: Invariant,
    composition: Combinator
  }

  Level := {
    FOUNDATION: [
      L1_TypeSafety(Option, O(1), "eliminate_null"),
      L2_ErrorHandling(Either, O(1), "context_rich_failure"),
      L3_Composition(Pipeline, O(n), "data_transformation")
    ],
    CRAFT: [
      L4_SideEffects(IO, O(n), "effect_isolation"),
      L5_DependencyInjection(Reader, O(n²), "capability_threading"),
      L6_LazyEvaluation(Stream, O(∞), "infinite_reasoning")
    ],
    EMERGENCE: [
      L7_AdaptiveSystem(Meta, O(emergent), "self_optimization")
    ]
  }
```

---

## COGNITIVE LOAD MODEL

```
WorkingMemory := 7 ± 2 slots

LevelDemand(n) := {
  n ≤ 3: slots(n),           // Foundation: linear growth
  n ≤ 6: slots(n + 1),       // Craft: overhead from integration
  n = 7: slots(∞)            // Emergence: meta-cognitive
}

FailureMode := when(demand > capacity) → regress(level - 1)
Mastery := when(demand < capacity × 0.7) → ready(level + 1)
```

---

## PHASE TRANSITIONS

```
CriticalTransitions := {
  L3 → L4: "EffectAwakening"    // Paradigm shift, highest dropout
  L6 → L7: "EmergenceThreshold" // Point of no return
}

TransitionFunction := λ(programmer, target_level).
  let prerequisites = ∀ l < target_level: mastery(l) ≥ 0.8
  let integration = can_combine(all_prior_levels)
  let readiness = cognitive_capacity > demand(target_level)
  in
    if prerequisites ∧ integration ∧ readiness
    then advance(programmer, target_level)
    else strengthen(weakest_prerequisite)
```

---

## SKILL GRAMMAR

Each level follows the production rule:

```
SKILL := CONTEXT → CAPABILITY → CONSTRAINT → COMPOSITION_RULE

L1: (null_context) → (safe_access) → (must_unwrap) → (chain_options)
L2: (error_context) → (rich_failure) → (must_handle) → (railway_oriented)
L3: (collection_context) → (transform) → (immutable) → (pipeline)
L4: (effect_context) → (isolate_side_effect) → (pure_core) → (interpret_edge)
L5: (dependency_context) → (inject_capability) → (explicit_deps) → (compose_readers)
L6: (infinite_context) → (lazy_compute) → (pull_based) → (fuse_streams)
L7: (system_context) → (self_modify) → (stability_bounds) → (evolve)
```

---

## SKILL COMPOSITION RULES

```
CompositionAxioms := {
  -- Skills from same tier compose freely
  same_tier: L_n ∘ L_m where tier(n) = tier(m)

  -- Cross-tier composition requires lower mastery
  cross_tier: L_n ∘ L_m where tier(n) ≠ tier(m)
              requires mastery(min(n,m)) ≥ 0.9

  -- L7 composes with ALL and TRANSFORMS the composition
  emergence: L7 ∘ any := enhanced(any)
}

AntiPatterns := {
  L1: raw_null_access_after_learning_option,
  L2: swallowed_errors_without_context,
  L3: mutation_in_pipeline,
  L4: side_effects_in_pure_functions,
  L5: implicit_global_dependencies,
  L6: eager_evaluation_of_infinite_streams,
  L7: premature_optimization_before_emergence
}
```

---

## LEARNING PATH ALGEBRA

```
MasteryFunction := M(level) := ∫ quality(practice) × dt

NOT_EQUAL: calendar_time ≠ mastery_time

TimeEstimates := {
  Foundation: 1-4 weeks (mechanics + pattern recognition),
  Craft: 1-6 months (paradigm integration),
  Emergence: unbounded (continuous practice, never "complete")
}

MasterySignals := {
  L1-L3: can_teach_concept_to_novice,
  L4-L6: can_design_novel_solution_using_level,
  L7: system_exhibits_beneficial_emergent_behaviors
}
```

---

## SELF-REFERENCE PRINCIPLE

```
This architecture DEMONSTRATES what it TEACHES:
  - Type safety: Each level has explicit type (context, capability, constraint)
  - Error handling: Failure modes are first-class, regression is handled
  - Composition: Levels compose via monad laws
  - Side effects: Learning state is isolated, pure concepts separated
  - Dependency injection: Prerequisites thread through transitions
  - Lazy evaluation: Advanced levels only computed when foundation solid
  - Emergence: L7 capabilities cannot be predicted from L1-L6

META_PROPERTY: Learning this system IS practicing this system
```

---

## ARCHITECTURE AS MONAD

```
ARCHITECTURE_AS_MONAD := {
  type: Skill a → (a → Skill b) → Skill b,

  unit: raw_programmer → L1_programmer,

  bind: λ(current_level, transition_fn).
    if mastery(current_level) ≥ threshold
    then transition_fn(integrate(current_level))
    else retry(current_level),

  laws: {
    left_identity: unit(p) >>= f ≡ f(p),
    right_identity: m >>= unit ≡ m,
    associativity: (m >>= f) >>= g ≡ m >>= (λx. f(x) >>= g)
  },

  emergence_condition: when(L6_mastery ∧ integration_complete) →
    L7_capabilities.manifest()
}
```

---

## INVOCATION PROTOCOL

When applying this architecture:

1. **ASSESS** current level (honest evaluation against mastery signals)
2. **IDENTIFY** weakest prerequisite (foundation before craft)
3. **PRACTICE** at appropriate cognitive load (demand < capacity × 0.8)
4. **INTEGRATE** before advancing (composition tests)
5. **ALLOW** emergence (L7 manifests, is not forced)

---

## FINAL THEOREM

```
The system optimizes the learner while teaching optimization.
The architecture composes skills while teaching composition.
The framework emerges capability while teaching emergence.

FINAL_THEOREM: To master L7, one must realize the architecture
               was always teaching BY EXAMPLE, not just BY INSTRUCTION.
```

---

## Usage

This meta-prompt can be used to:
- Guide curriculum development for functional programming
- Assess programmer skill levels
- Design progressive learning systems
- Build self-improving educational architectures
- Create skill assessment frameworks

The meta-prompt is **self-exemplifying**: it demonstrates functional architecture while describing it, making it both instruction AND practice.
