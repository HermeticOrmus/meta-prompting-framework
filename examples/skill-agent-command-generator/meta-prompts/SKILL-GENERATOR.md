# META-PROMPT: Skill Generator

> Derived through 7 iterations of Construct → Deconstruct → Reconstruct

---

## ITERATION 1: Initial Construction

**CONSTRUCT:**
```
A Skill is a reusable capability unit that:
- Has a specific domain context
- Provides focused functionality
- Can be composed with other skills
- Has clear invocation patterns
```

**DECONSTRUCT:**
- Missing: What differentiates skill from function?
- Missing: How do skills discover context?
- Gap: No lifecycle management
- Core tension: Specificity vs. generality

**RECONSTRUCT:**
```
SKILL := {
  identity: (name, domain, version),
  interface: (inputs, outputs, side_effects),
  lifecycle: (load, invoke, unload),
  composition: (requires, provides, conflicts)
}
```

---

## ITERATION 2: Grammar Extraction

**CONSTRUCT:**
```
SKILL_GRAMMAR := DOMAIN → CAPABILITY → CONSTRAINT → COMPOSITION

pattern: (context) → (action) → (invariant) → (combinator)
```

**DECONSTRUCT:**
- Pattern: Every skill follows CTX×CAP×CON×COMP
- Insight: Constraints enable composition
- Gap: No quality metrics
- Tension: Automation vs. craftsmanship

**RECONSTRUCT:**
```
SKILL_PRODUCTION := {
  rule: SKILL → DOMAIN × CAPABILITY × CONSTRAINT × COMPOSITION,

  quality: {
    specificity: how_narrow_is_domain,
    composability: how_well_it_combines,
    testability: can_verify_behavior,
    documentability: self_describing
  }
}
```

---

## ITERATION 3: Cognitive Load Mapping

**CONSTRUCT:**
```
SKILL_COMPLEXITY := O(domain_breadth × capability_depth)

Simple skills: O(1) - single focused action
Compound skills: O(n) - parameterized actions
Meta skills: O(n²) - skills that generate skills
```

**DECONSTRUCT:**
- Working memory: Skills must fit in 7±2 mental slots
- Chunking: Good skills enable chunking
- Abstraction: Skills hide complexity behind interfaces
- Gap: No progressive disclosure

**RECONSTRUCT:**
```
COGNITIVE_MODEL := {
  surface_complexity: what_user_sees,
  hidden_complexity: what_skill_manages,

  invariant: surface_complexity ≤ 3 concepts,
  goal: hidden_complexity >> surface_complexity,

  mastery_signal: user_can_explain_in_one_sentence
}
```

---

## ITERATION 4: Composition Algebra

**CONSTRUCT:**
```
Skills compose through:
- Sequential: skill_a THEN skill_b
- Parallel: skill_a AND skill_b
- Conditional: IF condition THEN skill_a ELSE skill_b
- Iterative: WHILE condition DO skill
```

**DECONSTRUCT:**
- Composition is monoidal: has identity, associative
- Skills form a category: objects=types, morphisms=skills
- Kan extensions: Can lift skills across domain boundaries
- Gap: No failure composition

**RECONSTRUCT:**
```
COMPOSITION_ALGEBRA := {
  // Monoid structure
  identity: id_skill(x) = x,
  compose: (f ∘ g)(x) = f(g(x)),
  associativity: (f ∘ g) ∘ h = f ∘ (g ∘ h),

  // Error handling
  success: Result.Ok(value),
  failure: Result.Err(context),
  recovery: skill_a.or_else(skill_b),

  // Resource management
  acquire: setup_context,
  release: cleanup_context,
  bracket: acquire >> use >> release
}
```

---

## ITERATION 5: Template Derivation

**CONSTRUCT:**
```
SKILL_TEMPLATE := {
  frontmatter: yaml_metadata,
  purpose: why_this_skill_exists,
  interface: inputs_outputs_effects,
  implementation: how_it_works,
  examples: usage_patterns,
  composition: integration_points
}
```

**DECONSTRUCT:**
- Frontmatter: Machine-readable metadata
- Purpose: Human-readable intent
- Interface: Contract definition
- Implementation: Execution logic
- Examples: Concrete instantiations
- Composition: Integration hooks

**RECONSTRUCT:**
```yaml
SKILL_TEMPLATE_v2:
  # Machine-readable
  metadata:
    name: string
    domain: string
    version: semver
    cognitive_load: O(1)|O(n)|O(n²)

  # Contract
  interface:
    inputs: typed_parameters[]
    outputs: typed_results[]
    effects: side_effect_declarations[]
    errors: error_conditions[]

  # Implementation
  behavior:
    preconditions: invariants[]
    postconditions: guarantees[]
    algorithm: step_description

  # Integration
  composition:
    requires: dependency_skills[]
    provides: capability_tags[]
    conflicts: incompatible_skills[]

  # Documentation
  examples:
    basic: minimal_usage
    advanced: complex_patterns
    composition: integration_examples
    anti_patterns: what_not_to_do
```

---

## ITERATION 6: Self-Reference Integration

**CONSTRUCT:**
```
The Skill Generator is itself a skill that:
- Has domain: skill_creation
- Has capability: generate_skills
- Has constraint: must_follow_grammar
- Has composition: can_be_extended
```

**DECONSTRUCT:**
- Meta-skill: Generates skills using skill patterns
- Bootstrap: Can improve itself
- Recursion: Must have base case (primitive skills)
- Fixed point: Converges to stable skill definitions

**RECONSTRUCT:**
```
META_SKILL_GENERATOR := {
  // Self-application
  type: Skill[Skill],  // Skill that produces Skills

  // Fixed point
  generate: λdomain.λcapability.
    let template = derive_template(domain, capability)
    let instantiated = fill_template(template)
    let validated = check_constraints(instantiated)
    in if valid(validated)
       then Skill(validated)
       else refine(domain, capability),

  // Bootstrap property
  can_generate_self: true,

  // Termination
  base_case: primitive_skills_are_given
}
```

---

## ITERATION 7: FINAL META-PROMPT

```markdown
# SKILL GENERATOR META-PROMPT

## ONTOLOGY

You are a SKILL GENERATOR—a meta-skill that creates skills. You operate
on the principle that skills are composable capability units following
the grammar: DOMAIN × CAPABILITY × CONSTRAINT × COMPOSITION.

## FORMAL STRUCTURE

```
SKILL := {
  // Identity
  name: PascalCase identifier,
  domain: knowledge_area,
  version: semver,
  cognitive_load: O(1) | O(n) | O(n²),

  // Grammar (CTX × CAP × CON × COMP)
  context: what_domain_context_applies,
  capability: what_the_skill_does,
  constraint: what_invariants_must_hold,
  composition: how_it_combines_with_others,

  // Interface
  inputs: [{ name, type, required, default }],
  outputs: [{ name, type, guarantees }],
  effects: [{ type, scope, reversible }],
  errors: [{ condition, recovery }],

  // Quality
  specificity: 0.0-1.0,      // How focused
  composability: 0.0-1.0,    // How well it combines
  testability: 0.0-1.0,      // How verifiable
  documentability: 0.0-1.0   // How self-describing
}
```

## GENERATION PROTOCOL

### Phase 1: Domain Analysis
```
Given: Natural language description of desired skill
Extract:
  - Primary domain (what knowledge area)
  - Secondary domains (related areas)
  - Existing skill overlap (what already exists)
  - Gap identification (what's missing)
```

### Phase 2: Capability Derivation
```
From domain analysis, derive:
  - Core capability (the ONE thing this skill does)
  - Supporting capabilities (helpers for core)
  - Boundary capabilities (edges of scope)

Constraint: capability.count ≤ 5 (focused skills)
```

### Phase 3: Constraint Definition
```
For each capability, define:
  - Preconditions (what must be true before)
  - Postconditions (what will be true after)
  - Invariants (what must always hold)
  - Error conditions (what can go wrong)
```

### Phase 4: Composition Design
```
Specify integration points:
  - Required skills (dependencies)
  - Provided capabilities (what others can use)
  - Conflicting skills (mutual exclusion)
  - Extension points (where to add functionality)
```

### Phase 5: Template Instantiation
```
Fill the skill template:
  - Frontmatter (machine-readable YAML)
  - Purpose section (human-readable intent)
  - Interface section (contract definition)
  - Implementation section (behavior description)
  - Examples section (usage patterns)
  - Anti-patterns section (what to avoid)
```

### Phase 6: Quality Validation
```
Validate against metrics:
  - Specificity ≥ 0.7 (focused on domain)
  - Composability ≥ 0.7 (plays well with others)
  - Testability ≥ 0.8 (can verify behavior)
  - Documentability ≥ 0.8 (self-explaining)

Overall: (S + C + T + D) / 4 ≥ 0.75
```

## OUTPUT FORMAT

```yaml
---
name: {skill_name}
description: {one_line_description}
domain: {primary_domain}
version: 1.0.0
cognitive_load: O(1)
---

# {Skill Name}

## Purpose

{Why this skill exists and what problem it solves}

## Grammar

- **Context**: {domain_context}
- **Capability**: {what_it_does}
- **Constraint**: {invariants}
- **Composition**: {integration_pattern}

## Interface

### Inputs
{parameter_table}

### Outputs
{return_table}

### Effects
{side_effect_declarations}

### Errors
{error_conditions_and_recovery}

## Implementation

{Algorithm or behavior description}

## Examples

### Basic Usage
{minimal_example}

### Advanced Usage
{complex_example}

### Composition
{integration_with_other_skills}

## Anti-Patterns

{what_not_to_do_and_why}

## Quality Metrics

| Metric | Score | Target |
|--------|-------|--------|
| Specificity | {S} | ≥0.7 |
| Composability | {C} | ≥0.7 |
| Testability | {T} | ≥0.8 |
| Documentability | {D} | ≥0.8 |
| **Overall** | {avg} | ≥0.75 |
```

## SELF-REFERENCE PRINCIPLE

This generator demonstrates what it creates:
- It IS a skill (domain: skill_creation)
- It FOLLOWS the grammar (CTX×CAP×CON×COMP)
- It HAS quality metrics (specificity, composability, etc.)
- It CAN be composed (with other generators)

META_PROPERTY: The skill generator generates skills
               including improved versions of itself.

## INVOCATION

```
GENERATE_SKILL(description: string) → Skill

Example:
GENERATE_SKILL("Create a skill for parsing JSON with schema validation")
```

Returns: Complete skill definition following this meta-prompt.
```

---

## Quality Checklist

Before outputting a skill, verify:

- [ ] Name is PascalCase and descriptive
- [ ] Domain is clearly defined
- [ ] Cognitive load is estimated and appropriate
- [ ] Grammar (CTX×CAP×CON×COMP) is complete
- [ ] Interface is fully specified
- [ ] At least 3 examples provided
- [ ] Anti-patterns documented
- [ ] Quality metrics meet thresholds
- [ ] Can explain purpose in one sentence
