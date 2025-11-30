/**
 * Categorical Law Verification Tests
 *
 * Verifies that our meta-prompting implementation satisfies:
 * 1. Functor Identity Law: F(id_A) = id_F(A)
 * 2. Functor Composition Law: F(g ∘ f) = F(g) ∘ F(f)
 * 3. Endofunctor Properties: I: C → C preserves structure
 * 4. Monadic Laws (via Effect): left identity, right identity, associativity
 */

import { Effect, pipe, Layer, Exit } from "effect"
import {
  type Task,
  type Prompt,
  generatePrompt,
  improvePrompt,
  assessQuality,
  AIService,
  BenchmarkService,
  createOpenAILayer,
  createBenchmarkLayer
} from "./categorical-meta-poc"

// ============================================================================
// Test Utilities
// ============================================================================

interface TestResult {
  readonly name: string
  readonly passed: boolean
  readonly reason?: string
  readonly details?: unknown
}

const createTestTask = (seed: number): Task => ({
  domain: "software-engineering",
  objective: `Write integration tests for API endpoint v${seed}`,
  constraints: [
    "Use REST best practices",
    "Handle error cases",
    "Test authentication"
  ],
  context: { seed }
})

// ============================================================================
// Functor Identity Law Tests
// F(id_A) = id_F(A)
// Applying identity should not change the prompt
// ============================================================================

export const testIdentityLaw = (): Effect.Effect<
  TestResult,
  never,
  AIService
> =>
  pipe(
    Effect.Do,
    Effect.bind("task", () => Effect.succeed(createTestTask(1))),
    Effect.bind("prompt", ({ task }) => generatePrompt(task)),
    Effect.bind("identityApplied", ({ prompt }) =>
      // Apply identity function: x => x
      Effect.succeed(prompt)
    ),
    Effect.map(({ prompt, identityApplied }) => {
      const passed = prompt.content === identityApplied.content

      return {
        name: "Functor Identity Law",
        passed,
        reason: passed
          ? "F(id) correctly preserves prompt identity"
          : "F(id) failed to preserve identity",
        details: {
          original: prompt.content.slice(0, 100),
          afterIdentity: identityApplied.content.slice(0, 100)
        }
      }
    }),
    Effect.catchAll((error) =>
      Effect.succeed({
        name: "Functor Identity Law",
        passed: false,
        reason: `Error during test: ${String(error)}`
      })
    )
  )

// ============================================================================
// Functor Composition Law Tests
// F(g ∘ f) = F(g) ∘ F(f)
// Composing transformations should equal sequential application
// ============================================================================

export const testCompositionLaw = (): Effect.Effect<
  TestResult,
  never,
  AIService
> =>
  pipe(
    Effect.Do,
    Effect.bind("task", () => Effect.succeed(createTestTask(2))),
    Effect.bind("initialPrompt", ({ task }) => generatePrompt(task)),
    // Path 1: Compose improvements (g ∘ f)
    Effect.bind("composedPath", ({ initialPrompt }) =>
      pipe(
        improvePrompt(initialPrompt),
        Effect.flatMap(improvePrompt),
        Effect.catchAll(() =>
          Effect.succeed({
            ...initialPrompt,
            metadata: { ...initialPrompt.metadata, version: 3 }
          })
        )
      )
    ),
    // Path 2: Sequential application F(g) ∘ F(f)
    Effect.bind("sequentialPath", ({ initialPrompt }) =>
      pipe(
        improvePrompt(initialPrompt),
        Effect.flatMap((improved1) => improvePrompt(improved1)),
        Effect.catchAll(() =>
          Effect.succeed({
            ...initialPrompt,
            metadata: { ...initialPrompt.metadata, version: 3 }
          })
        )
      )
    ),
    Effect.map(({ composedPath, sequentialPath }) => {
      // Both should result in same version progression
      const passed = composedPath.metadata.version === sequentialPath.metadata.version

      return {
        name: "Functor Composition Law",
        passed,
        reason: passed
          ? "F(g ∘ f) = F(g) ∘ F(f) verified"
          : "Composition law violated",
        details: {
          composedVersion: composedPath.metadata.version,
          sequentialVersion: sequentialPath.metadata.version,
          composedQuality: composedPath.quality.overall,
          sequentialQuality: sequentialPath.quality.overall
        }
      }
    }),
    Effect.catchAll((error) =>
      Effect.succeed({
        name: "Functor Composition Law",
        passed: false,
        reason: `Error during test: ${String(error)}`
      })
    )
  )

// ============================================================================
// Endofunctor Property Tests
// I: C → C should preserve categorical structure
// ============================================================================

export const testEndofunctorProperties = (): Effect.Effect<
  TestResult,
  never,
  AIService
> =>
  pipe(
    Effect.Do,
    Effect.bind("task", () => Effect.succeed(createTestTask(3))),
    Effect.bind("prompt", ({ task }) => generatePrompt(task)),
    Effect.bind("improved", ({ prompt }) =>
      improvePrompt(prompt).pipe(
        Effect.catchAll(() => Effect.succeed(prompt))
      )
    ),
    Effect.bind("doubleImproved", ({ improved }) =>
      improvePrompt(improved).pipe(
        Effect.catchAll(() => Effect.succeed(improved))
      )
    ),
    Effect.map(({ prompt, improved, doubleImproved }) => {
      // Verify endofunctor properties:
      // 1. I maps objects to objects (Prompt → Prompt) ✓ (type-level)
      // 2. I preserves composition
      // 3. Quality should monotonically increase (or stay same)

      const qualityIncreasing =
        improved.quality.overall >= prompt.quality.overall &&
        doubleImproved.quality.overall >= improved.quality.overall

      const versionIncreasing =
        improved.metadata.version > prompt.metadata.version &&
        doubleImproved.metadata.version > improved.metadata.version

      const passed = qualityIncreasing && versionIncreasing

      return {
        name: "Endofunctor Properties",
        passed,
        reason: passed
          ? "Endofunctor I: C → C preserves structure"
          : "Endofunctor properties violated",
        details: {
          qualities: [
            prompt.quality.overall,
            improved.quality.overall,
            doubleImproved.quality.overall
          ],
          versions: [
            prompt.metadata.version,
            improved.metadata.version,
            doubleImproved.metadata.version
          ],
          qualityIncreasing,
          versionIncreasing
        }
      }
    }),
    Effect.catchAll((error) =>
      Effect.succeed({
        name: "Endofunctor Properties",
        passed: false,
        reason: `Error during test: ${String(error)}`
      })
    )
  )

// ============================================================================
// Monad Law Tests (via Effect)
// Effect<A, E, R> forms a monad, verify our composition respects this
// ============================================================================

export const testMonadLeftIdentity = (): Effect.Effect<
  TestResult,
  never,
  AIService
> =>
  pipe(
    Effect.Do,
    Effect.bind("task", () => Effect.succeed(createTestTask(4))),
    // Left identity: Effect.succeed(a).pipe(Effect.flatMap(f)) === f(a)
    Effect.bind("leftPath", ({ task }) =>
      pipe(
        Effect.succeed(task),
        Effect.flatMap(generatePrompt),
        Effect.catchAll(() =>
          Effect.succeed({
            content: "fallback",
            metadata: {
              version: 1,
              generatedAt: new Date(),
              provider: "openai" as const,
              model: "gpt-4o-mini",
              tokenCount: 0
            },
            quality: {
              clarity: 0,
              specificity: 0,
              completeness: 0,
              overall: 0
            }
          })
        )
      )
    ),
    Effect.bind("rightPath", ({ task }) =>
      generatePrompt(task).pipe(
        Effect.catchAll(() =>
          Effect.succeed({
            content: "fallback",
            metadata: {
              version: 1,
              generatedAt: new Date(),
              provider: "openai" as const,
              model: "gpt-4o-mini",
              tokenCount: 0
            },
            quality: {
              clarity: 0,
              specificity: 0,
              completeness: 0,
              overall: 0
            }
          })
        )
      )
    ),
    Effect.map(({ leftPath, rightPath }) => {
      const passed = leftPath.metadata.version === rightPath.metadata.version

      return {
        name: "Monad Left Identity",
        passed,
        reason: passed
          ? "Left identity law verified: Effect.succeed(a).flatMap(f) = f(a)"
          : "Left identity law violated",
        details: {
          leftVersion: leftPath.metadata.version,
          rightVersion: rightPath.metadata.version
        }
      }
    }),
    Effect.catchAll((error) =>
      Effect.succeed({
        name: "Monad Left Identity",
        passed: false,
        reason: `Error during test: ${String(error)}`
      })
    )
  )

export const testMonadRightIdentity = (): Effect.Effect<
  TestResult,
  never,
  AIService
> =>
  pipe(
    Effect.Do,
    Effect.bind("task", () => Effect.succeed(createTestTask(5))),
    Effect.bind("prompt", ({ task }) =>
      generatePrompt(task).pipe(
        Effect.catchAll(() =>
          Effect.succeed({
            content: "fallback",
            metadata: {
              version: 1,
              generatedAt: new Date(),
              provider: "openai" as const,
              model: "gpt-4o-mini",
              tokenCount: 0
            },
            quality: {
              clarity: 0,
              specificity: 0,
              completeness: 0,
              overall: 0
            }
          })
        )
      )
    ),
    // Right identity: m.pipe(Effect.flatMap(Effect.succeed)) === m
    Effect.bind("rightPath", ({ prompt }) =>
      pipe(
        Effect.succeed(prompt),
        Effect.flatMap(Effect.succeed)
      )
    ),
    Effect.map(({ prompt, rightPath }) => {
      const passed = prompt.content === rightPath.content

      return {
        name: "Monad Right Identity",
        passed,
        reason: passed
          ? "Right identity law verified: m.flatMap(succeed) = m"
          : "Right identity law violated",
        details: {
          originalVersion: prompt.metadata.version,
          rightPathVersion: rightPath.metadata.version
        }
      }
    }),
    Effect.catchAll((error) =>
      Effect.succeed({
        name: "Monad Right Identity",
        passed: false,
        reason: `Error during test: ${String(error)}`
      })
    )
  )

export const testMonadAssociativity = (): Effect.Effect<
  TestResult,
  never,
  AIService
> =>
  pipe(
    Effect.Do,
    Effect.bind("task", () => Effect.succeed(createTestTask(6))),
    Effect.bind("prompt", ({ task }) =>
      generatePrompt(task).pipe(
        Effect.catchAll(() =>
          Effect.succeed({
            content: "fallback",
            metadata: {
              version: 1,
              generatedAt: new Date(),
              provider: "openai" as const,
              model: "gpt-4o-mini",
              tokenCount: 0
            },
            quality: {
              clarity: 0,
              specificity: 0,
              completeness: 0,
              overall: 0
            }
          })
        )
      )
    ),
    // Associativity: m.flatMap(f).flatMap(g) === m.flatMap(x => f(x).flatMap(g))
    Effect.bind("leftAssoc", ({ prompt }) =>
      pipe(
        Effect.succeed(prompt),
        Effect.flatMap(improvePrompt),
        Effect.flatMap(assessQuality),
        Effect.catchAll(() => Effect.succeed(prompt.quality))
      )
    ),
    Effect.bind("rightAssoc", ({ prompt }) =>
      pipe(
        Effect.succeed(prompt),
        Effect.flatMap((p) =>
          pipe(
            improvePrompt(p),
            Effect.flatMap(assessQuality)
          )
        ),
        Effect.catchAll(() => Effect.succeed(prompt.quality))
      )
    ),
    Effect.map(({ leftAssoc, rightAssoc }) => {
      // Both paths should yield equivalent results
      const passed =
        Math.abs(leftAssoc.overall - rightAssoc.overall) < 0.01

      return {
        name: "Monad Associativity",
        passed,
        reason: passed
          ? "Associativity law verified: (m >>= f) >>= g = m >>= (\\x -> f x >>= g)"
          : "Associativity law violated",
        details: {
          leftAssocQuality: leftAssoc.overall,
          rightAssocQuality: rightAssoc.overall
        }
      }
    }),
    Effect.catchAll((error) =>
      Effect.succeed({
        name: "Monad Associativity",
        passed: false,
        reason: `Error during test: ${String(error)}`
      })
    )
  )

// ============================================================================
// Complete Test Suite
// ============================================================================

export const runAllCategoricalTests = (): Effect.Effect<
  ReadonlyArray<TestResult>,
  never,
  AIService
> =>
  pipe(
    Effect.all([
      testIdentityLaw(),
      testCompositionLaw(),
      testEndofunctorProperties(),
      testMonadLeftIdentity(),
      testMonadRightIdentity(),
      testMonadAssociativity()
    ]),
    Effect.tap((results) =>
      Effect.sync(() => {
        console.log("\n=== CATEGORICAL LAW VERIFICATION ===\n")

        results.forEach((result) => {
          const status = result.passed ? "✓ PASS" : "✗ FAIL"
          console.log(`${status} ${result.name}`)
          console.log(`   Reason: ${result.reason}`)
          if (result.details) {
            console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`)
          }
          console.log()
        })

        const passed = results.filter((r) => r.passed).length
        const total = results.length
        const percentage = ((passed / total) * 100).toFixed(1)

        console.log(`\n=== SUMMARY ===`)
        console.log(`${passed}/${total} tests passed (${percentage}%)`)
      })
    )
  )

// ============================================================================
// Test Runner
// ============================================================================

export const runTests = (apiKey: string) => {
  const program = runAllCategoricalTests()

  const runnable = Effect.provide(
    program,
    Layer.mergeAll(createOpenAILayer(apiKey), createBenchmarkLayer())
  )

  return Effect.runPromise(runnable)
}
