# Skill: OptionType (L1)

> Level 1: Type Safety - O(1) Cognitive Load

---

## Metadata

```yaml
name: OptionType
level: 1
domain: type_safety
version: 1.0.0
cognitive_load: O(1)
dependencies: []
provides: [safe_value_access, null_elimination]
```

## Grammar

| Element | Definition |
|---------|------------|
| **Context** | Any value that may or may not be present |
| **Capability** | Wrap values to make presence explicit |
| **Constraint** | Must unwrap before accessing value |
| **Composition** | Chain with Map, FlatMap, OrElse |

## Purpose

Eliminate null/nil pointer errors by making value presence explicit at the type level. Instead of checking `if value != nil`, wrap values in Option and handle both cases explicitly.

## Interface

### Core Operations

```
Some[T](value: T) → Option[T]         // Wrap present value
None[T]() → Option[T]                  // Represent absence
IsPresent() → bool                     // Check presence
Unwrap() → T                           // Get value (panics if None)
UnwrapOr(default: T) → T              // Get value or default
```

### Composition Operations

```
Map[U](fn: T → U) → Option[U]          // Transform if present
FlatMap[U](fn: T → Option[U]) → Option[U]  // Chain options
Filter(pred: T → bool) → Option[T]     // Keep if predicate
OrElse(alt: () → Option[T]) → Option[T]    // Fallback
```

## Patterns

### Pattern 1: Safe Access
```
// BEFORE: Unsafe
user := getUser(id)
name := user.Name  // panic if nil

// AFTER: Safe
userOpt := getUserOption(id)
name := userOpt.Map(u => u.Name).UnwrapOr("Unknown")
```

### Pattern 2: Chaining
```
// Chain multiple optional operations
result := getUserOption(id)
    .FlatMap(user => user.GetProfile())
    .FlatMap(profile => profile.GetAvatar())
    .Map(avatar => avatar.URL)
    .UnwrapOr("/default-avatar.png")
```

### Pattern 3: Filtering
```
// Only keep if condition met
adminUser := getUserOption(id)
    .Filter(user => user.IsAdmin)
```

## Anti-Patterns

| Anti-Pattern | Problem | Correct |
|--------------|---------|---------|
| `Unwrap()` without check | Panic on None | Use `UnwrapOr` or `Match` |
| Nested Options | `Option[Option[T]]` | Use `FlatMap` to flatten |
| Ignoring None case | Logic errors | Handle both cases |

## Quality Metrics

| Metric | Score | Threshold |
|--------|-------|-----------|
| Specificity | 0.95 | ≥0.7 |
| Composability | 0.98 | ≥0.7 |
| Testability | 0.95 | ≥0.8 |
| Documentability | 0.90 | ≥0.8 |
| **Overall** | **0.95** | ≥0.75 |

## Mastery Signal

You have mastered L1 when:
- You never write `if x != nil` checks
- You can explain Option to a novice in 2 minutes
- You chain 3+ operations without mental strain
