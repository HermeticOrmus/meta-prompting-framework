# Skill: LazyStream (L6)

> Level 6: Lazy Evaluation - O(∞) Cognitive Load

---

## Metadata

```yaml
name: LazyStream
level: 6
domain: lazy_evaluation
version: 1.0.0
cognitive_load: O(∞)
dependencies: [OptionType, ResultType, Pipeline, EffectIsolation, ContextReader]
provides: [infinite_sequences, memory_efficiency, stream_fusion, demand_driven]
```

## Grammar

| Element | Definition |
|---------|------------|
| **Context** | Large or infinite data sequences |
| **Capability** | Compute values on-demand, not upfront |
| **Constraint** | Pull-based - only compute what's consumed |
| **Composition** | Fuse operations into single pass |

## Purpose

Work with infinite sequences and large datasets without exhausting memory. Values are computed lazily when needed, and multiple transformations fuse into a single pass. The "data structure" is actually a computation waiting to happen.

## Core Insight

```
Eager: Compute ALL values, THEN transform
Lazy:  Compute EACH value AS needed

Streams are blueprints, not containers.
```

## Interface

### Core Operations

```
Stream.Empty[T]() → Stream[T]                    // Empty stream
Stream.Single[T](v: T) → Stream[T]               // One element
Stream.Cons[T](head: T, tail: () → Stream[T]) → Stream[T]  // Construct
Stream.Iterate[T](init: T, fn: T → T) → Stream[T]  // Generate from function
Stream.Unfold[S, T](init: S, fn: S → Option[(T, S)]) → Stream[T]  // Stateful generation
```

### Consumption Operations

```
Head() → Option[T]                    // First element
Tail() → Stream[T]                    // Rest of stream
Take(n: int) → []T                    // First n as list
TakeWhile(pred: T → bool) → []T       // While predicate true
Drop(n: int) → Stream[T]              // Skip first n
Find(pred: T → bool) → Option[T]      // First matching
ForEach(fn: T → void)                 // Consume with side effect
```

### Transformation Operations

```
Map[U](fn: T → U) → Stream[U]                     // Transform lazily
Filter(pred: T → bool) → Stream[T]                 // Filter lazily
FlatMap[U](fn: T → Stream[U]) → Stream[U]         // Chain lazily
Zip[U](other: Stream[U]) → Stream[(T, U)]         // Pair lazily
ZipWithIndex() → Stream[(T, int)]                  // Add indices
Interleave(other: Stream[T]) → Stream[T]          // Alternate elements
```

## Patterns

### Pattern 1: Infinite Sequences
```
// Natural numbers (infinite)
naturals := Stream.Iterate(0, n => n + 1)

// Fibonacci sequence (infinite)
fibs := Stream.Unfold((0, 1), (a, b) => Some((a, (b, a+b))))

// Only compute what we need
first10Fibs := fibs.Take(10)  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### Pattern 2: Stream Fusion
```
// These DON'T create intermediate collections
result := Stream.Iterate(1, n => n + 1)  // 1, 2, 3, 4, ...
    .Map(n => n * n)                      // 1, 4, 9, 16, ...
    .Filter(n => n % 2 == 0)              // 4, 16, 36, ...
    .Take(5)                              // [4, 16, 36, 64, 100]

// Single pass through data!
```

### Pattern 3: Large File Processing
```
// Process huge file without loading into memory
lines := Stream.FromFile("huge.csv")     // Lazy line reading
    .Drop(1)                              // Skip header
    .Map(parseLine)                       // Parse each line
    .Filter(row => row.IsValid())         // Keep valid
    .Map(row => transform(row))           // Transform
    .ForEach(row => db.Insert(row))       // Insert one at a time

// Memory: O(1), not O(file_size)
```

### Pattern 4: Pagination
```
// Paginated API as infinite stream
func allPages[T](fetch: int → []T) Stream[T] {
    return Stream.Unfold(0, page => {
        items := fetch(page)
        if len(items) == 0 {
            return None
        }
        return Some((Stream.FromSlice(items), page + 1))
    }).FlatMap(s => s)
}

// Use like infinite collection
allUsers := allPages(page => api.GetUsers(page))
first100 := allUsers.Take(100)  // Only fetches needed pages
```

### Pattern 5: Generator Pattern
```
// Prime number sieve (infinite)
func sieve(s Stream[int]) Stream[int] {
    return s.Head().Map(prime =>
        Stream.Cons(prime, () =>
            sieve(s.Tail().Filter(n => n % prime != 0))))
    .UnwrapOr(Stream.Empty())
}

primes := sieve(Stream.Iterate(2, n => n + 1))
first100Primes := primes.Take(100)
```

## Integration with L1-L5

```
// Stream of Options
validUsers := userStream
    .Map(id => findUser(id))              // Stream[Option[User]]
    .Filter(opt => opt.IsPresent())
    .Map(opt => opt.Unwrap())

// Stream of Results
results := idStream
    .Map(id => fetchUser(id))             // Stream[Result[User]]

// Stream in Reader context
func streamUsers() Reader[Env, Stream[User]] {
    return Reader.Asks(env =>
        Stream.Unfold(0, page =>
            env.UserRepo.GetPage(page).Map(users =>
                if len(users) > 0 {
                    (Stream.FromSlice(users), page + 1)
                } else {
                    None
                })))
}
```

## Anti-Patterns

| Anti-Pattern | Problem | Correct |
|--------------|---------|---------|
| `Collect()` on infinite | Hangs forever | Use `Take(n)` first |
| Side effects in Map | Unpredictable timing | Use `ForEach` for effects |
| Storing stream | Memory leak | Consume or let GC |
| Multiple traversals | Recomputes everything | Collect if needed twice |

## Quality Metrics

| Metric | Score | Threshold |
|--------|-------|-----------|
| Specificity | 0.82 | ≥0.7 |
| Composability | 0.90 | ≥0.7 |
| Testability | 0.85 | ≥0.8 |
| Documentability | 0.80 | ≥0.8 |
| **Overall** | **0.84** | ≥0.75 |

## Mastery Signal

You have mastered L6 when:
- You can reason about infinite sequences
- You understand that Stream is computation, not data
- Memory usage doesn't grow with input size
