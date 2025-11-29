# Skill: EffectIsolation (L4)

> Level 4: Side Effects - O(n) Cognitive Load

---

## Metadata

```yaml
name: EffectIsolation
level: 4
domain: side_effects
version: 1.0.0
cognitive_load: O(n)
dependencies: [OptionType, ResultType, Pipeline]
provides: [io_monad, pure_core, effect_tracking, testability]
```

## Grammar

| Element | Definition |
|---------|------------|
| **Context** | Operations interacting with external world |
| **Capability** | Isolate side effects from pure logic |
| **Constraint** | Effects described, not executed until edge |
| **Composition** | Build effect descriptions, interpret at boundary |

## Purpose

Separate WHAT to do (description) from WHEN to do it (execution). Side effects (IO, network, database) are wrapped in an IO type that describes the action without performing it. This makes code testable, composable, and easier to reason about.

## Core Insight

```
Building a computation description is PURE.
Executing the description is IMPURE.

Keep the impure part as small as possible (at the edge).
```

## Interface

### Core Operations

```
IO.Pure[T](value: T) → IO[T]              // Wrap pure value
IO.Effect[T](fn: () → T) → IO[T]          // Wrap side effect
IO.Run[T](io: IO[T]) → T                  // Execute (impure!)
```

### Composition Operations

```
Map[U](fn: T → U) → IO[U]                  // Transform result
FlatMap[U](fn: T → IO[U]) → IO[U]         // Chain effects
Zip[U](other: IO[U]) → IO[(T, U)]         // Parallel effects
Sequence(ios: []IO[T]) → IO[[]T]          // All effects
```

### Error Integration

```
IO.FromResult[T](r: Result[T]) → IO[T]    // Lift Result to IO
Attempt() → IO[Result[T]]                  // Catch errors
Recover(fn: Error → IO[T]) → IO[T]        // Error recovery
```

## Patterns

### Pattern 1: Pure Core, Impure Shell
```
// PURE: Business logic (easily testable)
func calculateDiscount(order Order, rules []Rule) Discount {
    // Pure computation, no side effects
    return applyRules(order, rules)
}

// IMPURE: Wrapped in IO
func fetchOrder(id string) IO[Order] {
    return IO.Effect(() => db.Query("SELECT * FROM orders WHERE id = ?", id))
}

// COMPOSITION: Build the program
program := fetchOrder(orderId)
    .Map(order => calculateDiscount(order, rules))  // Pure!
    .FlatMap(discount => saveDiscount(discount))    // Effect

// EXECUTION: At the very edge
program.Run()  // Only place effects happen
```

### Pattern 2: Effect Description
```
// These don't DO anything - they DESCRIBE what to do
readFile := IO.Effect(() => os.ReadFile(path))
parseJSON := readFile.Map(bytes => json.Unmarshal(bytes))
validate := parseJSON.FlatMap(data => validateSchema(data))

// Nothing happens until Run()
result := validate.Run()
```

### Pattern 3: Parallel Effects
```
// Describe parallel operations
program := IO.Zip3(
    fetchUser(userId),
    fetchOrders(userId),
    fetchPreferences(userId),
).Map((user, orders, prefs) => UserDashboard{user, orders, prefs})

// Execute all in parallel
dashboard := program.Run()
```

### Pattern 4: Error Handling in IO
```
// Errors are effects too
program := readConfig(path)
    .Attempt()                          // → IO[Result[Config]]
    .FlatMap(result => result.Match(
        onOk: config => initApp(config),
        onErr: _ => IO.Pure(DefaultConfig()),
    ))
```

## Testing with IO

```
// Easy to test - no mocking needed!
func TestCalculateDiscount(t *testing.T) {
    // Pure function - just call it
    discount := calculateDiscount(testOrder, testRules)
    assert.Equal(t, expected, discount)
}

// For IO, provide test interpreters
func TestProgram(t *testing.T) {
    // Replace real effects with test effects
    mockFetch := IO.Pure(testOrder)
    result := program(mockFetch).Run()
    assert.Equal(t, expected, result)
}
```

## Integration with L1-L3

```
// Option in IO
findUser := IO.Effect(() => db.FindUser(id))  // → IO[Option[User]]
    .FlatMap(opt => opt.Match(
        some: user => IO.Pure(user),
        none: () => IO.Fail(errors.New("not found")),
    ))

// Result in IO
program := fetchData()                         // → IO[Result[Data]]
    .FlatMap(result => result.Match(
        ok: data => processData(data),
        err: e => IO.Fail(e),
    ))

// Pipeline in IO
processAll := IO.Sequence(
    Pipeline.From(ids).Map(id => fetchItem(id)).Collect()
)  // → IO[[]Item]
```

## Anti-Patterns

| Anti-Pattern | Problem | Correct |
|--------------|---------|---------|
| `Run()` in middle of logic | Effects escape | Only Run at edge |
| Side effects in Map | Breaks purity | Use FlatMap for effects |
| Ignoring IO result | Effect not executed | Always Run or compose |
| Testing with real IO | Slow, flaky | Use pure functions + mock IO |

## Quality Metrics

| Metric | Score | Threshold |
|--------|-------|-----------|
| Specificity | 0.85 | ≥0.7 |
| Composability | 0.92 | ≥0.7 |
| Testability | 0.98 | ≥0.8 |
| Documentability | 0.82 | ≥0.8 |
| **Overall** | **0.89** | ≥0.75 |

## Mastery Signal

You have mastered L4 when:
- You can identify pure vs impure code instantly
- Your business logic has zero imports from IO packages
- Tests run in milliseconds with no mocks
