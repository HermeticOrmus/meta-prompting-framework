#!/usr/bin/env python3
"""
DisCoPy Pattern Analysis 1: Monoidal Category Basics

Explore how DisCoPy implements monoidal categories and extract
reusable patterns for meta-prompting composition.
"""

from discopy.monoidal import Ty, Box, Id
import json

print("=" * 70)
print("DisCoPy Monoidal Category Pattern Analysis")
print("=" * 70)

# ==============================================================================
# PATTERN 1: Type System as Compositional Interface
# ==============================================================================
print("\n[PATTERN 1] Type System as Compositional Interface")
print("-" * 70)

# In DisCoPy: Types constrain composition
Task = Ty('Task')
Prompt = Ty('Prompt')
ImprovedPrompt = Ty('ImprovedPrompt')
Result = Ty('Result')

print(f"Task type: {Task}")
print(f"Prompt type: {Prompt}")
print(f"ImprovedPrompt type: {ImprovedPrompt}")

# Lesson for meta-prompting:
# Types ensure compositional correctness - only compatible operations compose
print("\nAnalogy for Meta-Prompting:")
print("- Task: Input specification (what needs to be done)")
print("- Prompt: First-order prompt (direct instruction)")
print("- ImprovedPrompt: Meta-level prompt (instruction about instructions)")
print("- Result: Execution output")

# ==============================================================================
# PATTERN 2: Sequential Composition (>>)
# ==============================================================================
print("\n[PATTERN 2] Sequential Composition (>>)")
print("-" * 70)

# Define operations as boxes (morphisms)
generate = Box('generate', Task, Prompt)
improve = Box('improve', Prompt, ImprovedPrompt)
execute = Box('execute', ImprovedPrompt, Result)

# Sequential composition: f >> g means "f then g"
pipeline = generate >> improve >> execute

print(f"generate: {generate.dom} → {generate.cod}")
print(f"improve: {improve.dom} → {improve.cod}")
print(f"execute: {execute.dom} → {execute.cod}")
print(f"\nComposed pipeline: {pipeline.dom} → {pipeline.cod}")
print(f"Pipeline boxes: {[box.name for box in pipeline.boxes]}")

# Lesson for meta-prompting:
print("\nAnalogy for Meta-Prompting:")
print("generate >> improve >> execute")
print("  = 'Create prompt, then improve it, then execute it'")
print("This is the CORE meta-prompting pattern!")

# ==============================================================================
# PATTERN 3: Parallel Composition (@)
# ==============================================================================
print("\n[PATTERN 3] Parallel Composition (@)")
print("-" * 70)

# Define parallel operations
analyze_syntax = Box('analyze_syntax', Prompt, Result)
analyze_semantics = Box('analyze_semantics', Prompt, Result)

# Parallel composition: f @ g means "f and g simultaneously"
parallel = analyze_syntax @ analyze_semantics

print(f"analyze_syntax: {analyze_syntax.dom} → {analyze_syntax.cod}")
print(f"analyze_semantics: {analyze_semantics.dom} → {analyze_semantics.cod}")
print(f"\nParallel composition:")
print(f"  Input types: {parallel.dom}")
print(f"  Output types: {parallel.cod}")

# Lesson for meta-prompting:
print("\nAnalogy for Meta-Prompting:")
print("analyze_syntax @ analyze_semantics")
print("  = 'Check syntax AND semantics in parallel'")
print("Enables multi-aspect prompt evaluation!")

# ==============================================================================
# PATTERN 4: Identity Morphisms
# ==============================================================================
print("\n[PATTERN 4] Identity Morphisms")
print("-" * 70)

# Identity: Does nothing, but maintains types
id_prompt = Id(Prompt)
id_task = Id(Task)

print(f"Id(Prompt): {id_prompt.dom} → {id_prompt.cod}")
print(f"Id(Task): {id_task.dom} → {id_task.cod}")

# Identity laws
pipeline_with_id = generate >> Id(Prompt) >> improve
print(f"\ngenerate >> Id(Prompt) >> improve")
print(f"  Same as: generate >> improve")
print(f"  Boxes: {[box.name for box in pipeline_with_id.boxes]}")

# Lesson for meta-prompting:
print("\nAnalogy for Meta-Prompting:")
print("Identity = 'Pass through unchanged'")
print("Useful for conditional composition or placeholder operations")

# ==============================================================================
# PATTERN 5: Associativity (Categorical Law)
# ==============================================================================
print("\n[PATTERN 5] Associativity (Free from Category Theory)")
print("-" * 70)

# Composition is associative: (f >> g) >> h == f >> (g >> h)
left_assoc = (generate >> improve) >> execute
right_assoc = generate >> (improve >> execute)

print(f"(generate >> improve) >> execute:")
print(f"  {left_assoc.dom} → {left_assoc.cod}")
print(f"\ngenerate >> (improve >> execute):")
print(f"  {right_assoc.dom} → {right_assoc.cod}")
print(f"\nEquivalent? {left_assoc == right_assoc}")

# Lesson for meta-prompting:
print("\nAnalogy for Meta-Prompting:")
print("No need to worry about grouping - composition 'just works'!")
print("This is a GIFT from category theory - guaranteed by structure")

# ==============================================================================
# PATTERN 6: Type Mismatch = Composition Failure
# ==============================================================================
print("\n[PATTERN 6] Type Safety (Compositional Correctness)")
print("-" * 70)

# This would fail: improve >> generate
# Because: improve.cod = ImprovedPrompt, generate.dom = Task
# ImprovedPrompt ≠ Task, so composition is impossible

print("Attempting to compose incompatible operations:")
print(f"improve.cod = {improve.cod}")
print(f"generate.dom = {generate.dom}")
print("improve >> generate would FAIL (types don't match)")

try:
    invalid = improve >> generate
    print("Composed successfully (unexpected!)")
except Exception as e:
    print(f"Composition failed: {type(e).__name__}")

# Lesson for meta-prompting:
print("\nAnalogy for Meta-Prompting:")
print("Type system PREVENTS invalid prompt compositions!")
print("e.g., Can't execute a task before generating a prompt")

# ==============================================================================
# PATTERN 7: Diagram Inspection
# ==============================================================================
print("\n[PATTERN 7] Diagram Introspection")
print("-" * 70)

# Diagrams are first-class objects that can be inspected
print(f"Pipeline structure:")
print(f"  Domain: {pipeline.dom}")
print(f"  Codomain: {pipeline.cod}")
print(f"  Number of boxes: {len(pipeline.boxes)}")
print(f"  Box names: {[box.name for box in pipeline.boxes]}")
print(f"  Box types: {[(box.dom, box.cod) for box in pipeline.boxes]}")

# Lesson for meta-prompting:
print("\nAnalogy for Meta-Prompting:")
print("Prompts-as-diagrams can be ANALYZED before execution!")
print("- Count steps")
print("- Identify bottlenecks")
print("- Verify type correctness")
print("- Optimize composition order")

# ==============================================================================
# PATTERN SUMMARY: Core Abstractions for Meta-Prompting
# ==============================================================================
print("\n" + "=" * 70)
print("PATTERN SUMMARY: Reusable Abstractions for Meta-Prompting")
print("=" * 70)

patterns = {
    "1. Type System": {
        "DisCoPy": "Ty('X') - Objects in category",
        "Meta-Prompting": "TaskType, PromptType, ResultType - Compositional interfaces",
        "Benefit": "Type safety prevents invalid compositions"
    },
    "2. Sequential Composition": {
        "DisCoPy": "f >> g - Sequential application",
        "Meta-Prompting": "generate >> improve >> execute - Prompt pipeline",
        "Benefit": "Clear dataflow, guaranteed composability"
    },
    "3. Parallel Composition": {
        "DisCoPy": "f @ g - Parallel application",
        "Meta-Prompting": "Multi-aspect evaluation (syntax @ semantics)",
        "Benefit": "Concurrent processing, modular analysis"
    },
    "4. Identity": {
        "DisCoPy": "Id(X) - Pass-through",
        "Meta-Prompting": "No-op placeholder in conditional pipelines",
        "Benefit": "Uniform composition interface"
    },
    "5. Associativity": {
        "DisCoPy": "(f >> g) >> h == f >> (g >> h)",
        "Meta-Prompting": "No parentheses needed - composition 'just works'",
        "Benefit": "Cognitive simplicity, guaranteed by category theory"
    },
    "6. Type Safety": {
        "DisCoPy": "Composition fails if types don't match",
        "Meta-Prompting": "Prevent invalid prompt sequences at construction time",
        "Benefit": "Fail fast, clear error messages"
    },
    "7. Introspection": {
        "DisCoPy": "diagram.boxes, diagram.dom, diagram.cod",
        "Meta-Prompting": "Analyze prompt structure before execution",
        "Benefit": "Optimization, debugging, verification"
    }
}

for pattern, details in patterns.items():
    print(f"\n{pattern}")
    for key, value in details.items():
        print(f"  {key}: {value}")

# ==============================================================================
# Export patterns for documentation
# ==============================================================================
with open('monoidal_patterns.json', 'w') as f:
    json.dump(patterns, f, indent=2)

print("\n" + "=" * 70)
print("Patterns exported to: monoidal_patterns.json")
print("=" * 70)
