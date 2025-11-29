# Skill: Pipeline (L3)

> Level 3: Composition - O(n) Cognitive Load

---

## Metadata

```yaml
name: Pipeline
level: 3
domain: composition
version: 1.0.0
cognitive_load: O(n)
dependencies: [OptionType, ResultType]
provides: [data_transformation, functional_composition, declarative_processing]
```

## Grammar

| Element | Definition |
|---------|------------|
| **Context** | Collections and sequences of data |
| **Capability** | Transform through composable operations |
| **Constraint** | Immutable - no mutation in pipeline |
| **Composition** | Chain Map, Filter, Reduce, FlatMap |

## Purpose

Build complex data transformations from simple, composable operations. Replace imperative loops with declarative pipelines that are easier to reason about, test, and maintain.

## Interface

### Core Operations

```
Map[T, U](fn: T → U) → Pipeline[U]           // Transform each element
Filter[T](pred: T → bool) → Pipeline[T]       // Keep matching elements
Reduce[T, U](init: U, fn: (U, T) → U) → U    // Fold to single value
FlatMap[T, U](fn: T → []U) → Pipeline[U]     // Transform and flatten
```

### Aggregation Operations

```
First() → Option[T]                    // First element
Last() → Option[T]                     // Last element
Count() → int                          // Element count
Sum() → T                              // Sum (for numeric)
Any(pred: T → bool) → bool             // At least one matches
All(pred: T → bool) → bool             // All match
```

### Partitioning Operations

```
Take(n: int) → Pipeline[T]             // First n elements
Drop(n: int) → Pipeline[T]             // Skip first n
TakeWhile(pred: T → bool) → Pipeline[T]  // Take while true
GroupBy[K](fn: T → K) → Map[K, []T]    // Group by key
Partition(pred: T → bool) → ([]T, []T) // Split by predicate
```

### Composition Operations

```
Pipe[U](fn: Pipeline[T] → Pipeline[U]) → Pipeline[U]  // Custom step
Tap(fn: T → void) → Pipeline[T]        // Side-effect without transform
Chunk(size: int) → Pipeline[[]T]       // Group into chunks
Zip[U](other: Pipeline[U]) → Pipeline[(T, U)]  // Pair elements
```

## Patterns

### Pattern 1: Basic Transformation
```
// Transform and filter
result := Pipeline.From(users)
    .Filter(u => u.IsActive)
    .Map(u => u.Email)
    .Collect()
```

### Pattern 2: Aggregation
```
// Calculate statistics
stats := Pipeline.From(orders)
    .Filter(o => o.Status == "completed")
    .Map(o => o.Total)
    .Reduce(Stats{}, (stats, total) => stats.Add(total))
```

### Pattern 3: Grouping
```
// Group by category
byCategory := Pipeline.From(products)
    .GroupBy(p => p.Category)

// Result: Map["electronics" → [...], "books" → [...]]
```

### Pattern 4: Flattening
```
// Flatten nested structures
allTags := Pipeline.From(posts)
    .FlatMap(post => post.Tags)
    .Unique()
    .Collect()
```

### Pattern 5: Complex Pipeline
```
// Multi-stage processing
report := Pipeline.From(transactions)
    .Filter(t => t.Date.After(startDate))
    .GroupBy(t => t.Category)
    .Map((category, txns) => CategoryReport{
        Category: category,
        Total: Pipeline.From(txns).Map(t => t.Amount).Sum(),
        Count: len(txns),
    })
    .Filter(r => r.Total > threshold)
    .SortBy(r => -r.Total)
    .Take(10)
    .Collect()
```

## Integration with L1-L2

```
// Pipeline with Option results
validEmails := Pipeline.From(users)
    .Map(u => u.GetEmail())           // → Pipeline[Option[string]]
    .Filter(opt => opt.IsPresent())
    .Map(opt => opt.Unwrap())
    .Collect()

// Pipeline with Result (fail-fast)
results := Pipeline.From(ids)
    .Map(id => fetchUser(id))         // → Pipeline[Result[User]]
    .Sequence()                        // → Result[[]User]
```

## Anti-Patterns

| Anti-Pattern | Problem | Correct |
|--------------|---------|---------|
| Mutation in Map | Side effects | Keep Map pure |
| Multiple iterations | Performance | Chain operations |
| Collect too early | Memory waste | Lazy until needed |
| Ignoring intermediate errors | Silent failures | Use Sequence for Results |

## Quality Metrics

| Metric | Score | Threshold |
|--------|-------|-----------|
| Specificity | 0.88 | ≥0.7 |
| Composability | 0.98 | ≥0.7 |
| Testability | 0.92 | ≥0.8 |
| Documentability | 0.85 | ≥0.8 |
| **Overall** | **0.91** | ≥0.75 |

## Mastery Signal

You have mastered L3 when:
- You think in transformations, not loops
- You can mentally trace a 5-step pipeline
- Imperative code feels verbose
