/**
 * Example Runner for Categorical Meta-Prompting POC
 *
 * Demonstrates complete usage patterns:
 * 1. Basic meta-prompting pipeline
 * 2. Categorical law verification
 * 3. Comprehensive benchmarking
 * 4. Provider-agnostic composition
 *
 * Usage:
 *   npx tsx example-runner.ts --mode [basic|laws|benchmark|all]
 *
 * Environment:
 *   OPENAI_API_KEY=sk-...
 */

import { Effect, pipe } from "effect"
import { runExample } from "./categorical-meta-poc"
import { runTests } from "./categorical-laws-test"
import { quickBenchmark, runCompleteAnalysis, DEFAULT_CONFIG } from "./benchmark-suite"

// ============================================================================
// CLI Argument Parsing
// ============================================================================

interface RunnerConfig {
  readonly mode: "basic" | "laws" | "benchmark" | "full" | "all"
  readonly apiKey: string
  readonly verbose: boolean
}

const parseArgs = (): Effect.Effect<RunnerConfig, Error> =>
  Effect.sync(() => {
    const args = typeof process !== "undefined" ? process.argv.slice(2) : []

    const apiKey = typeof process !== "undefined"
      ? process.env.OPENAI_API_KEY
      : undefined

    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY environment variable required.\nSet it with: export OPENAI_API_KEY=sk-..."
      )
    }

    const modeArg = args.find((arg) => arg.startsWith("--mode="))
    const mode = modeArg
      ? modeArg.split("=")[1] as RunnerConfig["mode"]
      : "all"

    const verbose = args.includes("--verbose") || args.includes("-v")

    return { mode, apiKey, verbose }
  })

// ============================================================================
// Mode Handlers
// ============================================================================

const runBasicExample = (apiKey: string): Effect.Effect<void, unknown> =>
  pipe(
    Effect.logInfo("\n=== RUNNING BASIC META-PROMPTING EXAMPLE ===\n"),
    Effect.flatMap(() => Effect.promise(() => runExample(apiKey))),
    Effect.map(() => undefined),
    Effect.tap(() => Effect.logInfo("\n✓ Basic example completed\n"))
  )

const runLawVerification = (apiKey: string): Effect.Effect<void, unknown> =>
  pipe(
    Effect.logInfo("\n=== RUNNING CATEGORICAL LAW VERIFICATION ===\n"),
    Effect.flatMap(() => Effect.promise(() => runTests(apiKey))),
    Effect.map(() => undefined),
    Effect.tap(() => Effect.logInfo("\n✓ Law verification completed\n"))
  )

const runQuickBenchmark = (apiKey: string): Effect.Effect<void, unknown> =>
  pipe(
    Effect.logInfo("\n=== RUNNING QUICK BENCHMARK (1 task, 3 runs) ===\n"),
    Effect.flatMap(() => Effect.promise(() => quickBenchmark(apiKey))),
    Effect.map(() => undefined),
    Effect.tap(() => Effect.logInfo("\n✓ Quick benchmark completed\n"))
  )

const runFullBenchmark = (apiKey: string): Effect.Effect<void, unknown> =>
  pipe(
    Effect.logInfo("\n=== RUNNING FULL BENCHMARK SUITE (4 tasks, 3 quality targets, 3 runs each) ===\n"),
    Effect.flatMap(() => Effect.promise(() => runCompleteAnalysis(apiKey, DEFAULT_CONFIG))),
    Effect.map(() => undefined),
    Effect.tap(() => Effect.logInfo("\n✓ Full benchmark completed\n"))
  )

// ============================================================================
// Main Runner
// ============================================================================

const main = pipe(
  parseArgs(),
  Effect.flatMap((config) => {
    if (config.verbose) {
      Effect.logInfo(`Configuration: ${JSON.stringify(config, null, 2)}`)
    }

    switch (config.mode) {
      case "basic":
        return runBasicExample(config.apiKey)

      case "laws":
        return runLawVerification(config.apiKey)

      case "benchmark":
        return runQuickBenchmark(config.apiKey)

      case "full":
        return runFullBenchmark(config.apiKey)

      case "all":
        return pipe(
          runBasicExample(config.apiKey),
          Effect.flatMap(() => runLawVerification(config.apiKey)),
          Effect.flatMap(() => runQuickBenchmark(config.apiKey))
        )

      default:
        return Effect.fail(
          new Error(
            `Invalid mode: ${config.mode}. Use: basic, laws, benchmark, full, or all`
          )
        )
    }
  }),
  Effect.catchAll((error) =>
    Effect.sync(() => {
      console.error("\n❌ Error:", error)
      if (typeof process !== "undefined") {
        process.exit(1)
      }
    })
  ),
  Effect.tap(() =>
    Effect.sync(() => {
      console.log("\n✓ All operations completed successfully\n")
    })
  )
)

// Run if executed directly
if (typeof process !== "undefined" && require.main === module) {
  Effect.runPromise(main)
}

export { main }

// ============================================================================
// Usage Examples (Code)
// ============================================================================

/**
 * EXAMPLE 1: Basic Meta-Prompting
 *
 * ```typescript
 * import { runExample } from "./categorical-meta-poc"
 *
 * const apiKey = process.env.OPENAI_API_KEY!
 * await runExample(apiKey)
 * ```
 */

/**
 * EXAMPLE 2: Custom Task with Specific Quality Target
 *
 * ```typescript
 * import { Effect, pipe, Layer } from "effect"
 * import {
 *   metaPipeline,
 *   createOpenAILayer,
 *   createBenchmarkLayer,
 *   type Task
 * } from "./categorical-meta-poc"
 *
 * const customTask: Task = {
 *   domain: "distributed-systems",
 *   objective: "Design consensus protocol for blockchain",
 *   constraints: [
 *     "Byzantine fault tolerance",
 *     "Sub-second finality",
 *     "Support 1000+ validators"
 *   ]
 * }
 *
 * const program = pipe(
 *   metaPipeline(customTask, 0.90),
 *   Effect.tap((prompt) =>
 *     Effect.sync(() => console.log(prompt.content))
 *   )
 * )
 *
 * const runnable = Effect.provide(
 *   program,
 *   Layer.mergeAll(
 *     createOpenAILayer(process.env.OPENAI_API_KEY!),
 *     createBenchmarkLayer()
 *   )
 * )
 *
 * await Effect.runPromise(runnable)
 * ```
 */

/**
 * EXAMPLE 3: Verify Categorical Laws
 *
 * ```typescript
 * import { runTests } from "./categorical-laws-test"
 *
 * const apiKey = process.env.OPENAI_API_KEY!
 * const results = await runTests(apiKey)
 *
 * // Results show pass/fail for each law:
 * // - Functor Identity
 * // - Functor Composition
 * // - Endofunctor Properties
 * // - Monad Laws (left identity, right identity, associativity)
 * ```
 */

/**
 * EXAMPLE 4: Run Benchmarks
 *
 * ```typescript
 * import { quickBenchmark, runCompleteAnalysis } from "./benchmark-suite"
 *
 * const apiKey = process.env.OPENAI_API_KEY!
 *
 * // Quick benchmark (1 task, 3 runs)
 * const quick = await quickBenchmark(apiKey)
 * console.log(quick.report)
 *
 * // Full benchmark suite (4 tasks, 3 quality targets, 3 runs each = 36 runs)
 * const full = await runCompleteAnalysis(apiKey)
 * console.log(full.report)
 * ```
 */

/**
 * EXAMPLE 5: Compose with Custom Provider
 *
 * ```typescript
 * import { Effect, Layer } from "effect"
 * import * as AI from "@effect/ai"
 * import { AIService } from "./categorical-meta-poc"
 *
 * // Create custom provider layer (example: Anthropic)
 * const createAnthropicLayer = (apiKey: string): Layer.Layer<AIService> => {
 *   // Implementation would use @anthropic-ai/sdk
 *   // Returns Layer<AIService> compatible with composition
 * }
 *
 * // Swap provider without changing pipeline logic
 * const program = metaPipeline(task, 0.85)
 * const runnable = Effect.provide(
 *   program,
 *   createAnthropicLayer(process.env.ANTHROPIC_API_KEY!)
 * )
 * ```
 */

/**
 * EXAMPLE 6: Low-Level Functor Composition
 *
 * ```typescript
 * import { Effect, pipe } from "effect"
 * import {
 *   generatePrompt,
 *   improvePrompt,
 *   assessQuality
 * } from "./categorical-meta-poc"
 *
 * // Manual composition demonstrating categorical structure
 * const task: Task = {
 *   domain: "security",
 *   objective: "Design zero-trust network architecture",
 *   constraints: ["Assume breach mentality", "Microsegmentation"]
 * }
 *
 * // F: Task → Effect<Prompt>
 * const initialPromptEffect = generatePrompt(task)
 *
 * // I: Prompt → Effect<Prompt> (endofunctor)
 * const improvedPromptEffect = pipe(
 *   initialPromptEffect,
 *   Effect.flatMap(improvePrompt)
 * )
 *
 * // Compose assessment
 * const qualityEffect = pipe(
 *   improvedPromptEffect,
 *   Effect.flatMap(assessQuality)
 * )
 *
 * // Execute composition
 * const runnable = Effect.provide(
 *   qualityEffect,
 *   createOpenAILayer(apiKey)
 * )
 *
 * const quality = await Effect.runPromise(runnable)
 * console.log(`Quality: ${quality.overall}`)
 * ```
 */
