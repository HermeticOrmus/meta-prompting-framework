# Skill: ResultType (L2)

> Level 2: Error Handling - O(1) Cognitive Load

---

## Metadata

```yaml
name: ResultType
level: 2
domain: error_handling
version: 1.0.0
cognitive_load: O(1)
dependencies: [OptionType]
provides: [error_context, railway_programming, error_composition]
```

## Grammar

| Element | Definition |
|---------|------------|
| **Context** | Operations that can succeed or fail |
| **Capability** | Encapsulate success/failure with context |
| **Constraint** | Must handle both paths |
| **Composition** | Railway-oriented programming |

## Purpose

Replace scattered `if err != nil` checks with composable error handling. Errors become first-class values that carry context and can be transformed, mapped, and composed.

## Interface

### Core Operations

```
Ok[T](value: T) → Result[T]           // Success
Err[T](error: Error) → Result[T]      // Failure with context
IsOk() → bool                          // Check success
IsErr() → bool                         // Check failure
Unwrap() → T                           // Get value (panics on Err)
UnwrapErr() → Error                    // Get error (panics on Ok)
```

### Composition Operations

```
Map[U](fn: T → U) → Result[U]                  // Transform success
MapErr(fn: Error → Error) → Result[T]          // Transform error
AndThen[U](fn: T → Result[U]) → Result[U]      // Chain results
OrElse(fn: Error → Result[T]) → Result[T]      // Error recovery
Match(onOk: T → U, onErr: Error → U) → U       // Pattern match
```

### Context Operations

```
Context(msg: string) → Result[T]       // Add error context
WithContext(fn: () → string) → Result[T]  // Lazy context
Wrap(msg: string) → Result[T]          // Wrap error with message
```

## Patterns

### Pattern 1: Railway-Oriented Programming
```
// Errors automatically short-circuit
result := parseConfig(path)
    .AndThen(validateConfig)
    .AndThen(initializeApp)
    .MapErr(e => fmt.Errorf("startup failed: %w", e))

// Only handle result once at the end
result.Match(
    onOk: app => app.Run(),
    onErr: err => log.Fatal(err)
)
```

### Pattern 2: Error Context Enrichment
```
// Add context at each layer
func LoadUser(id string) Result[User] {
    return fetchFromDB(id)
        .Context("loading user")
        .MapErr(e => fmt.Errorf("user %s: %w", id, e))
}
```

### Pattern 3: Recovery
```
// Try primary, fall back to secondary
result := fetchFromCache(key)
    .OrElse(_ => fetchFromDB(key))
    .OrElse(_ => fetchFromRemote(key))
```

### Pattern 4: Combining Results
```
// All must succeed
func CreateOrder(userId, productId string) Result[Order] {
    return Combine(
        getUser(userId),
        getProduct(productId),
        getInventory(productId),
    ).AndThen((user, product, inv) =>
        buildOrder(user, product, inv)
    )
}
```

## Integration with L1 (Option)

```
// Convert Option to Result
userOpt.OkOr(errors.New("user not found"))

// Convert Result to Option (discarding error)
userResult.Ok()  // → Option[User]
```

## Anti-Patterns

| Anti-Pattern | Problem | Correct |
|--------------|---------|---------|
| `_, _ = fn()` | Ignoring errors | Always handle Result |
| Empty error messages | No context | Add meaningful context |
| Panic on Err | Uncontrolled crash | Use Match or OrElse |
| Deep nesting | Hard to read | Use AndThen chains |

## Quality Metrics

| Metric | Score | Threshold |
|--------|-------|-----------|
| Specificity | 0.92 | ≥0.7 |
| Composability | 0.95 | ≥0.7 |
| Testability | 0.90 | ≥0.8 |
| Documentability | 0.88 | ≥0.8 |
| **Overall** | **0.91** | ≥0.75 |

## Mastery Signal

You have mastered L2 when:
- You think in "happy path" vs "error track"
- You never swallow errors without logging
- Error messages tell you exactly what went wrong and where
