#!/usr/bin/env python3
"""
DisCoPy Pattern Analysis 2: Functor Patterns

Explore how DisCoPy implements functors (interpretations) and extract
patterns for evaluating meta-prompting pipelines.

KEY INSIGHT: Functors map abstract diagrams to concrete implementations.
For meta-prompting: Diagram = Prompt Structure, Functor = Execution Strategy
"""

from discopy.monoidal import Ty, Box, Id
from discopy.tensor import Functor
import numpy as np
import json

print("=" * 70)
print("DisCoPy Functor Pattern Analysis")
print("=" * 70)

# ==============================================================================
# PATTERN 1: Syntax-Semantics Separation
# ==============================================================================
print("\n[PATTERN 1] Syntax-Semantics Separation")
print("-" * 70)

# Step 1: Build abstract diagram (SYNTAX)
Task = Ty('Task')
Prompt = Ty('Prompt')
Result = Ty('Result')

generate = Box('generate', Task, Prompt)
execute = Box('execute', Prompt, Result)

# This is pure structure - no computation yet!
pipeline = generate >> execute

print("SYNTAX (Abstract Structure):")
print(f"  Diagram: {pipeline.dom} → {pipeline.cod}")
print(f"  Boxes: {[box.name for box in pipeline.boxes]}")
print(f"  No computation performed yet!")

# Step 2: Define functor (SEMANTICS)
print("\nSEMANTICS (Concrete Interpretation):")

# Map types to dimensions (vector spaces)
F = Functor(
    ob={Task: 3, Prompt: 5, Result: 2},  # Dimensions
    ar={
        generate: np.random.rand(5, 3),  # Task(3) -> Prompt(5)
        execute: np.random.rand(2, 5)     # Prompt(5) -> Result(2)
    }
)

print(f"  Task → {F.ob[Task]}-dimensional space")
print(f"  Prompt → {F.ob[Prompt]}-dimensional space")
print(f"  Result → {F.ob[Result]}-dimensional space")
print(f"  generate: {F.ar[generate].shape} matrix")
print(f"  execute: {F.ar[execute].shape} matrix")

# Step 3: Evaluate diagram with functor
result = F(pipeline)
print(f"\nEVALUATION:")
print(f"  F(pipeline) shape: {result.array.shape}")
print(f"  Composed matrix: Task(3) → Result(2)")

# Lesson for meta-prompting:
print("\n" + "=" * 70)
print("LESSON FOR META-PROMPTING:")
print("=" * 70)
print("1. BUILD prompt pipeline (syntax) - structure only")
print("2. DEFINE evaluation strategy (functor) - how to execute")
print("3. EVALUATE pipeline with strategy - get results")
print("\nBENEFIT: Same prompt structure, multiple execution strategies!")
print("  - GPT-4 functor")
print("  - Claude functor")
print("  - Llama functor")
print("  - Mock functor (testing)")
print("=" * 70)

# ==============================================================================
# PATTERN 2: Multiple Functors = Multiple Interpretations
# ==============================================================================
print("\n[PATTERN 2] Multiple Interpretations of Same Diagram")
print("-" * 70)

# Same diagram, different semantics
print("Same pipeline, THREE different functors:\n")

# Functor 1: Large embeddings (GPT-4 style)
F_gpt4 = Functor(
    ob={Task: 10, Prompt: 100, Result: 50},
    ar={
        generate: np.random.rand(100, 10),
        execute: np.random.rand(50, 100)
    }
)

# Functor 2: Small embeddings (efficient model)
F_small = Functor(
    ob={Task: 2, Prompt: 8, Result: 4},
    ar={
        generate: np.random.rand(8, 2),
        execute: np.random.rand(4, 8)
    }
)

# Functor 3: Symbolic (just count operations)
F_symbolic = Functor(
    ob={Task: 1, Prompt: 1, Result: 1},
    ar={
        generate: np.array([[1.0]]),  # Identity-like
        execute: np.array([[1.0]])
    }
)

result_gpt4 = F_gpt4(pipeline)
result_small = F_small(pipeline)
result_symbolic = F_symbolic(pipeline)

print(f"1. GPT-4 functor:     {result_gpt4.array.shape} (high-dimensional)")
print(f"2. Small functor:     {result_small.array.shape} (efficient)")
print(f"3. Symbolic functor:  {result_symbolic.array.shape} (counting only)")

print("\nLESSON: Build pipeline ONCE, evaluate with MULTIPLE models!")

# ==============================================================================
# PATTERN 3: Functor Composition
# ==============================================================================
print("\n[PATTERN 3] Functor Composition (Chaining Interpretations)")
print("-" * 70)

# Create a two-stage functor: text -> embedding -> classification
Text = Ty('Text')
Embedding = Ty('Embedding')
Class = Ty('Class')

embed = Box('embed', Text, Embedding)
classify = Box('classify', Embedding, Class)

text_pipeline = embed >> classify

# Functor 1: Text -> Embedding
F_embed = Functor(
    ob={Text: 1, Embedding: 128},
    ar={embed: np.random.rand(128, 1)}
)

# Functor 2: Embedding -> Class
F_classify = Functor(
    ob={Embedding: 128, Class: 3},
    ar={classify: np.random.rand(3, 128)}
)

# Compose functors (if both map same diagram)
# In DisCoPy, we apply sequentially:
print("Two-stage functor application:")
print(f"  Text(1) -> embed -> Embedding(128)")
print(f"  Embedding(128) -> classify -> Class(3)")

# Combined functor
F_combined = Functor(
    ob={Text: 1, Embedding: 128, Class: 3},
    ar={
        embed: F_embed.ar[embed],
        classify: F_classify.ar[classify]
    }
)

result_combined = F_combined(text_pipeline)
print(f"\nCombined evaluation: {result_combined.array.shape}")

print("\nLESSON: Functors compose like functions!")
print("  F_classify ∘ F_embed = F_combined")

# ==============================================================================
# PATTERN 4: Parameterized Functors (Learnable)
# ==============================================================================
print("\n[PATTERN 4] Parameterized Functors (Learnable Weights)")
print("-" * 70)

class LearnableFunctor:
    """Functor with trainable parameters."""

    def __init__(self, type_dims, seed=42):
        np.random.seed(seed)
        self.type_dims = type_dims

        # Initialize random weights
        self.weights = {}

    def add_box(self, box, input_dim, output_dim):
        """Add a learnable box."""
        self.weights[box.name] = np.random.randn(output_dim, input_dim)
        return self

    def to_functor(self, boxes):
        """Convert to DisCoPy functor."""
        return Functor(
            ob=self.type_dims,
            ar={box: self.weights[box.name] for box in boxes}
        )

    def update_weights(self, box_name, delta):
        """Gradient update (simplified)."""
        self.weights[box_name] -= 0.01 * delta

# Create learnable functor
learnable = LearnableFunctor({Task: 3, Prompt: 5, Result: 2})
learnable.add_box(generate, 3, 5)
learnable.add_box(execute, 5, 2)

F_learnable = learnable.to_functor([generate, execute])
result_learnable = F_learnable(pipeline)

print("Learnable functor created:")
print(f"  generate weights: {learnable.weights['generate'].shape}")
print(f"  execute weights: {learnable.weights['execute'].shape}")
print(f"  Result: {result_learnable.array.shape}")

print("\nLESSON: Functors can be LEARNED from data!")
print("  - Initialize with random weights")
print("  - Optimize via gradient descent")
print("  - Same diagram, optimized interpretation")

# ==============================================================================
# PATTERN 5: Functor as Execution Strategy
# ==============================================================================
print("\n[PATTERN 5] Functor as Execution Strategy")
print("-" * 70)

# Abstract: Prompt optimization pipeline
Input = Ty('Input')
Draft = Ty('Draft')
Critique = Ty('Critique')
Refined = Ty('Refined')

draft_prompt = Box('draft', Input, Draft)
critique = Box('critique', Draft, Critique)
refine = Box('refine', Critique, Refined)

optimization_pipeline = draft_prompt >> critique >> refine

print(f"Abstract pipeline: {optimization_pipeline.dom} → {optimization_pipeline.cod}")

# Strategy 1: Fast (small models)
F_fast = Functor(
    ob={Input: 10, Draft: 20, Critique: 15, Refined: 25},
    ar={
        draft_prompt: np.random.rand(20, 10),
        critique: np.random.rand(15, 20),
        refine: np.random.rand(25, 15)
    }
)

# Strategy 2: Accurate (large models)
F_accurate = Functor(
    ob={Input: 100, Draft: 500, Critique: 300, Refined: 600},
    ar={
        draft_prompt: np.random.rand(500, 100),
        critique: np.random.rand(300, 500),
        refine: np.random.rand(600, 300)
    }
)

result_fast = F_fast(optimization_pipeline)
result_accurate = F_accurate(optimization_pipeline)

print(f"\nFast strategy:     {result_fast.array.shape}")
print(f"Accurate strategy: {result_accurate.array.shape}")

print("\nLESSON: Functor = Execution Strategy!")
print("  - Same logical flow (diagram)")
print("  - Different resource trade-offs (functor)")
print("  - Choose strategy at runtime")

# ==============================================================================
# PATTERN SUMMARY
# ==============================================================================
print("\n" + "=" * 70)
print("FUNCTOR PATTERN SUMMARY FOR META-PROMPTING")
print("=" * 70)

patterns = {
    "1. Syntax-Semantics Separation": {
        "Pattern": "Build diagram (syntax), then evaluate with functor (semantics)",
        "Meta-Prompting": "Design prompt flow, then choose execution backend",
        "Code": "diagram = f >> g >> h; result = functor(diagram)",
        "Benefit": "Decouple structure from execution"
    },
    "2. Multiple Interpretations": {
        "Pattern": "Same diagram, multiple functors",
        "Meta-Prompting": "One prompt pipeline, test with GPT-4 / Claude / Llama",
        "Code": "F_gpt4(pipeline), F_claude(pipeline), F_llama(pipeline)",
        "Benefit": "A/B testing, model comparison, fallback strategies"
    },
    "3. Functor Composition": {
        "Pattern": "Chain functors like functions",
        "Meta-Prompting": "Embed >> Transform >> Classify",
        "Code": "F_combined = F1 >> F2 >> F3",
        "Benefit": "Modular interpretation, reusable components"
    },
    "4. Parameterized Functors": {
        "Pattern": "Learnable functor weights",
        "Meta-Prompting": "Optimize prompt templates via gradient descent",
        "Code": "LearnableFunctor -> train -> optimized interpretation",
        "Benefit": "Data-driven prompt optimization"
    },
    "5. Execution Strategy": {
        "Pattern": "Functor = how to execute diagram",
        "Meta-Prompting": "Fast vs. accurate vs. cost-optimized execution",
        "Code": "F_fast(pipeline) vs F_accurate(pipeline)",
        "Benefit": "Runtime strategy selection, resource trade-offs"
    }
}

for pattern, details in patterns.items():
    print(f"\n{pattern}")
    for key, value in details.items():
        print(f"  {key}: {value}")

# Export
with open('functor_patterns.json', 'w') as f:
    json.dump(patterns, f, indent=2)

print("\n" + "=" * 70)
print("KEY INSIGHT: Functor = 'How to Run the Prompt'")
print("=" * 70)
print("Diagram = WHAT to do (logical structure)")
print("Functor = HOW to do it (execution strategy)")
print("\nThis separation enables:")
print("  - Model-agnostic prompt design")
print("  - Easy A/B testing")
print("  - Runtime strategy selection")
print("  - Optimization without changing logic")
print("=" * 70)
