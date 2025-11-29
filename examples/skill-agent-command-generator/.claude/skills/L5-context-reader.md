# Skill: ContextReader (L5)

> Level 5: Dependency Injection - O(n²) Cognitive Load

---

## Metadata

```yaml
name: ContextReader
level: 5
domain: dependency_injection
version: 1.0.0
cognitive_load: O(n²)
dependencies: [OptionType, ResultType, Pipeline, EffectIsolation]
provides: [reader_monad, implicit_context, hexagonal_architecture, testability]
```

## Grammar

| Element | Definition |
|---------|------------|
| **Context** | Operations requiring shared dependencies |
| **Capability** | Thread environment implicitly through computation |
| **Constraint** | Dependencies must be explicit at type level |
| **Composition** | Compose readers to build larger computations |

## Purpose

Eliminate "parameter drilling" - passing configuration and dependencies through many function layers. The Reader monad makes dependencies implicit in the computation while keeping them explicit in the type signature.

## The Problem

```
// Without Reader: Parameter drilling
func processOrder(
    logger Logger,      // Passed everywhere
    db Database,        // Passed everywhere
    config Config,      // Passed everywhere
    cache Cache,        // Passed everywhere
    order Order,
) Result[Receipt] {
    validateOrder(logger, config, order)        // Drilling
    saveOrder(logger, db, cache, order)         // Drilling
    notifyCustomer(logger, config, order)       // Drilling
}
```

## Interface

### Core Operations

```
Reader[Env, A] = Env → A                   // Reader is a function from Env

Reader.Pure[Env, A](a: A) → Reader[Env, A]       // Wrap value
Reader.Ask[Env]() → Reader[Env, Env]             // Get environment
Reader.Asks[Env, A](fn: Env → A) → Reader[Env, A]  // Extract from env
Reader.Run[Env, A](r: Reader[Env, A], env: Env) → A  // Execute
```

### Composition Operations

```
Map[B](fn: A → B) → Reader[Env, B]               // Transform result
FlatMap[B](fn: A → Reader[Env, B]) → Reader[Env, B]  // Chain readers
Local[Env2](fn: Env2 → Env) → Reader[Env2, A]    // Modify environment
```

## Patterns

### Pattern 1: Clean Dependency Threading
```
// Define environment
type AppEnv struct {
    Logger   Logger
    Database Database
    Config   Config
    Cache    Cache
}

// Functions only take what they need (Order)
// Environment is implicit
func processOrder(order Order) Reader[AppEnv, Result[Receipt]] {
    return Reader.Ask[AppEnv]().FlatMap(env =>
        validateOrder(order).FlatMap(_ =>
            saveOrder(order).FlatMap(_ =>
                notifyCustomer(order))))
}

// Run with environment at the edge
result := processOrder(order).Run(appEnv)
```

### Pattern 2: Selective Access
```
// Only access what you need
func getLogger() Reader[AppEnv, Logger] {
    return Reader.Asks(env => env.Logger)
}

func log(msg string) Reader[AppEnv, Unit] {
    return getLogger().Map(logger => logger.Info(msg))
}
```

### Pattern 3: Environment Modification
```
// Temporarily modify environment
func withTimeout(duration Duration) Reader[AppEnv, A] → Reader[AppEnv, A] {
    return reader.Local(env => AppEnv{
        ...env,
        Config: env.Config.WithTimeout(duration),
    })
}

// Use modified environment
result := withTimeout(5*time.Second)(
    fetchData(id)
).Run(env)
```

### Pattern 4: Combining with IO (ReaderT)
```
// Reader + IO = ReaderIO
type ReaderIO[Env, A] = Reader[Env, IO[A]]

func fetchUser(id string) ReaderIO[AppEnv, User] {
    return Reader.Asks(env =>
        IO.Effect(() => env.Database.Query("SELECT * FROM users WHERE id = ?", id))
    )
}

// Compose ReaderIO
program := fetchUser(userId)
    .FlatMap(user => updateUser(user))
    .FlatMap(_ => notifyUser(userId))

// Run: first provide env, then execute IO
program.Run(appEnv).Run()
```

## Hexagonal Architecture Support

```
// Ports (interfaces in env)
type Ports struct {
    UserRepo     UserRepository
    OrderRepo    OrderRepository
    Notifier     Notifier
    PaymentGW    PaymentGateway
}

// Use case only knows about ports
func PlaceOrder(order Order) Reader[Ports, Result[Receipt]] {
    return Reader.Ask[Ports]().FlatMap(ports =>
        ports.UserRepo.Find(order.UserId).FlatMap(user =>
            ports.PaymentGW.Charge(user, order.Total).FlatMap(payment =>
                ports.OrderRepo.Save(order).Map(_ =>
                    Receipt{order, payment}))))
}

// Adapters provided at runtime
prodPorts := Ports{
    UserRepo:  PostgresUserRepo{db},
    OrderRepo: PostgresOrderRepo{db},
    Notifier:  EmailNotifier{smtp},
    PaymentGW: StripeGateway{client},
}

testPorts := Ports{
    UserRepo:  InMemoryUserRepo{},
    OrderRepo: InMemoryOrderRepo{},
    Notifier:  MockNotifier{},
    PaymentGW: MockPaymentGW{},
}

// Same code, different environments
PlaceOrder(order).Run(prodPorts)
PlaceOrder(order).Run(testPorts)
```

## Integration with L1-L4

```
// Full stack: Reader[Env, IO[Result[Option[T]]]]
func findAndProcess(id string) Reader[AppEnv, IO[Result[Option[User]]]] {
    return Reader.Ask[AppEnv]().Map(env =>
        IO.Effect(() =>
            env.Database.FindUser(id)  // → Result[Option[User]]
        ).Map(result =>
            result.Map(opt =>
                opt.Map(user => process(user)))))
}
```

## Anti-Patterns

| Anti-Pattern | Problem | Correct |
|--------------|---------|---------|
| Global variables | Hidden dependencies | Use Reader explicitly |
| Huge Env type | Too many deps | Split into focused Envs |
| Run() in middle | Loses context | Only Run at edge |
| Accessing full Env | Over-coupling | Use Asks for specific fields |

## Quality Metrics

| Metric | Score | Threshold |
|--------|-------|-----------|
| Specificity | 0.80 | ≥0.7 |
| Composability | 0.88 | ≥0.7 |
| Testability | 0.95 | ≥0.8 |
| Documentability | 0.78 | ≥0.8 |
| **Overall** | **0.85** | ≥0.75 |

## Mastery Signal

You have mastered L5 when:
- Business logic has zero infrastructure imports
- You can swap implementations by changing Env
- Tests run without any real databases/services
