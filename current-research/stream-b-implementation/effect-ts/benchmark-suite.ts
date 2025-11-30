/**
 * Comprehensive Benchmarking Suite
 *
 * Benchmarks categorical meta-prompting implementation on consumer hardware:
 * - Memory usage (heap allocation tracking)
 * - Latency (end-to-end, per-iteration)
 * - API costs (token usage, USD estimates)
 * - Quality convergence (iterations to target)
 * - Provider comparison (OpenAI vs Anthropic)
 *
 * Hardware Profile:
 * - CPU: Consumer-grade (M1/M2/Intel i5+)
 * - RAM: 8GB+ available
 * - Network: Standard broadband
 */

import { Effect, pipe, Layer, Schedule, Duration } from "effect"
import {
  type Task,
  type Prompt,
  type BenchmarkMetrics,
  benchmarkPipeline,
  metaPipeline,
  AIService,
  BenchmarkService,
  createOpenAILayer,
  createBenchmarkLayer
} from "./categorical-meta-poc"

// ============================================================================
// Benchmark Configuration
// ============================================================================

export interface BenchmarkConfig {
  readonly tasks: ReadonlyArray<Task>
  readonly targetQualities: ReadonlyArray<number>
  readonly runs: number // Number of runs per configuration
  readonly warmupRuns: number // Warmup iterations to stabilize
}

export interface BenchmarkResult {
  readonly config: {
    readonly taskDomain: string
    readonly targetQuality: number
    readonly run: number
  }
  readonly metrics: BenchmarkMetrics
  readonly hardware: HardwareProfile
  readonly timestamp: Date
}

export interface HardwareProfile {
  readonly platform: string
  readonly arch: string
  readonly cpuModel?: string
  readonly totalMemoryMB: number
  readonly nodeVersion: string
}

export interface AggregatedResults {
  readonly totalRuns: number
  readonly averageLatencyMs: number
  readonly medianLatencyMs: number
  readonly p95LatencyMs: number
  readonly p99LatencyMs: number
  readonly averageMemoryMB: number
  readonly averageIterations: number
  readonly averageFinalQuality: number
  readonly totalCostUSD: number
  readonly averageCostPerRun: number
}

// ============================================================================
// Hardware Profiling
// ============================================================================

const getHardwareProfile = (): HardwareProfile => {
  if (typeof process === "undefined") {
    return {
      platform: "browser",
      arch: "unknown",
      totalMemoryMB: 0,
      nodeVersion: "n/a"
    }
  }

  const os = require("os") as typeof import("os")

  return {
    platform: process.platform,
    arch: process.arch,
    cpuModel: os.cpus()[0]?.model,
    totalMemoryMB: os.totalmem() / 1024 / 1024,
    nodeVersion: process.version
  }
}

// ============================================================================
// Standard Benchmark Tasks
// ============================================================================

export const STANDARD_TASKS: ReadonlyArray<Task> = [
  {
    domain: "software-engineering",
    objective: "Design API for user authentication service",
    constraints: [
      "RESTful architecture",
      "JWT-based authentication",
      "Support OAuth2",
      "Rate limiting required"
    ],
    context: {
      scale: "10K daily active users",
      compliance: "GDPR compliant"
    }
  },
  {
    domain: "machine-learning",
    objective: "Build recommendation system for e-commerce",
    constraints: [
      "Collaborative filtering",
      "Real-time inference (<100ms)",
      "Handle cold-start problem",
      "Personalization required"
    ],
    context: {
      catalog: "100K products",
      users: "1M monthly active"
    }
  },
  {
    domain: "data-engineering",
    objective: "Design ETL pipeline for analytics",
    constraints: [
      "Process 10GB daily",
      "Sub-hourly latency",
      "Idempotent operations",
      "Schema evolution support"
    ],
    context: {
      sources: ["PostgreSQL", "S3", "Kafka"],
      destination: "Snowflake"
    }
  },
  {
    domain: "devops",
    objective: "Create CI/CD pipeline for microservices",
    constraints: [
      "Multi-stage deployment",
      "Automated testing",
      "Blue-green deployments",
      "Rollback capability"
    ],
    context: {
      services: 15,
      environments: ["dev", "staging", "prod"]
    }
  }
]

export const DEFAULT_CONFIG: BenchmarkConfig = {
  tasks: STANDARD_TASKS,
  targetQualities: [0.75, 0.85, 0.90],
  runs: 3, // 3 runs per configuration for statistical validity
  warmupRuns: 1
}

// ============================================================================
// Single Benchmark Run
// ============================================================================

const runSingleBenchmark = (
  task: Task,
  targetQuality: number,
  runNumber: number
): Effect.Effect<
  BenchmarkResult,
  unknown,
  AIService | BenchmarkService
> =>
  pipe(
    Effect.logInfo(
      `Running benchmark: ${task.domain}, target=${targetQuality}, run=${runNumber}`
    ),
    Effect.flatMap(() => benchmarkPipeline(task, targetQuality)),
    Effect.map(({ metrics }) => ({
      config: {
        taskDomain: task.domain,
        targetQuality,
        run: runNumber
      },
      metrics,
      hardware: getHardwareProfile(),
      timestamp: new Date()
    })),
    Effect.tap((result) =>
      Effect.logInfo(
        `Completed: ${result.metrics.latencyMs}ms, ${result.metrics.iterations} iterations, quality=${result.metrics.finalQuality.toFixed(3)}`
      )
    )
  )

// ============================================================================
// Warmup Phase
// ============================================================================

const warmupPhase = (
  task: Task
): Effect.Effect<void, unknown, AIService | BenchmarkService> =>
  pipe(
    Effect.logInfo("Starting warmup phase..."),
    Effect.flatMap(() => metaPipeline(task, 0.70)),
    Effect.map(() => undefined),
    Effect.tap(() => Effect.logInfo("Warmup complete"))
  )

// ============================================================================
// Full Benchmark Suite
// ============================================================================

export const runBenchmarkSuite = (
  config: BenchmarkConfig = DEFAULT_CONFIG
): Effect.Effect<
  ReadonlyArray<BenchmarkResult>,
  unknown,
  AIService | BenchmarkService
> =>
  pipe(
    Effect.logInfo("=== CATEGORICAL META-PROMPTING BENCHMARK SUITE ==="),
    Effect.flatMap(() => Effect.logInfo(`Hardware: ${JSON.stringify(getHardwareProfile(), null, 2)}`)),
    Effect.flatMap(() => Effect.logInfo(`Configuration: ${JSON.stringify(
      {
        tasks: config.tasks.length,
        targetQualities: config.targetQualities,
        runs: config.runs,
        warmupRuns: config.warmupRuns
      },
      null,
      2
    )}`)),
    Effect.flatMap(() => {
      // Warmup
      if (config.warmupRuns > 0) {
        return warmupPhase(config.tasks[0]!)
      }
      return Effect.succeed(undefined)
    }),
    Effect.flatMap(() => {
      // Generate all benchmark configurations
      const benchmarks: Array<Effect.Effect<BenchmarkResult, unknown, AIService | BenchmarkService>> = []

      for (const task of config.tasks) {
        for (const targetQuality of config.targetQualities) {
          for (let run = 1; run <= config.runs; run++) {
            benchmarks.push(runSingleBenchmark(task, targetQuality, run))
          }
        }
      }

      // Run benchmarks sequentially to avoid API rate limits
      return Effect.all(benchmarks, { concurrency: 1 })
    }),
    Effect.tap((results) =>
      Effect.logInfo(`\nCompleted ${results.length} benchmark runs`)
    )
  )

// ============================================================================
// Statistical Analysis
// ============================================================================

export const analyzeResults = (
  results: ReadonlyArray<BenchmarkResult>
): AggregatedResults => {
  const latencies = results.map((r) => r.metrics.latencyMs).sort((a, b) => a - b)
  const memories = results.map((r) => r.metrics.memoryUsedMB)
  const iterations = results.map((r) => r.metrics.iterations)
  const qualities = results.map((r) => r.metrics.finalQuality)
  const costs = results.map((r) => r.metrics.tokenCost.estimatedUSD)

  const percentile = (arr: ReadonlyArray<number>, p: number): number => {
    const index = Math.ceil(arr.length * p) - 1
    return arr[Math.max(0, index)] ?? 0
  }

  const average = (arr: ReadonlyArray<number>): number =>
    arr.reduce((sum, val) => sum + val, 0) / arr.length

  return {
    totalRuns: results.length,
    averageLatencyMs: average(latencies),
    medianLatencyMs: percentile(latencies, 0.5),
    p95LatencyMs: percentile(latencies, 0.95),
    p99LatencyMs: percentile(latencies, 0.99),
    averageMemoryMB: average(memories),
    averageIterations: average(iterations),
    averageFinalQuality: average(qualities),
    totalCostUSD: costs.reduce((sum, c) => sum + c, 0),
    averageCostPerRun: average(costs)
  }
}

// ============================================================================
// Results Reporting
// ============================================================================

export const generateReport = (
  results: ReadonlyArray<BenchmarkResult>
): string => {
  const stats = analyzeResults(results)
  const hardware = results[0]?.hardware

  let report = "\n"
  report += "=".repeat(70) + "\n"
  report += "CATEGORICAL META-PROMPTING BENCHMARK REPORT\n"
  report += "=".repeat(70) + "\n\n"

  // Hardware Information
  report += "HARDWARE PROFILE\n"
  report += "-".repeat(70) + "\n"
  if (hardware) {
    report += `Platform:        ${hardware.platform} (${hardware.arch})\n`
    report += `CPU:             ${hardware.cpuModel ?? "Unknown"}\n`
    report += `Total Memory:    ${hardware.totalMemoryMB.toFixed(0)} MB\n`
    report += `Node Version:    ${hardware.nodeVersion}\n`
  }
  report += "\n"

  // Performance Metrics
  report += "PERFORMANCE METRICS\n"
  report += "-".repeat(70) + "\n"
  report += `Total Runs:      ${stats.totalRuns}\n`
  report += `Avg Latency:     ${stats.averageLatencyMs.toFixed(0)} ms\n`
  report += `Median Latency:  ${stats.medianLatencyMs.toFixed(0)} ms\n`
  report += `P95 Latency:     ${stats.p95LatencyMs.toFixed(0)} ms\n`
  report += `P99 Latency:     ${stats.p99LatencyMs.toFixed(0)} ms\n`
  report += `Avg Memory:      ${stats.averageMemoryMB.toFixed(2)} MB\n`
  report += `Avg Iterations:  ${stats.averageIterations.toFixed(1)}\n`
  report += `Avg Quality:     ${stats.averageFinalQuality.toFixed(3)}\n`
  report += "\n"

  // Cost Analysis
  report += "COST ANALYSIS\n"
  report += "-".repeat(70) + "\n"
  report += `Total Cost:      $${stats.totalCostUSD.toFixed(4)}\n`
  report += `Avg Cost/Run:    $${stats.averageCostPerRun.toFixed(4)}\n`

  const totalTokens = results.reduce(
    (sum, r) => sum + r.metrics.tokenCost.inputTokens + r.metrics.tokenCost.outputTokens,
    0
  )
  report += `Total Tokens:    ${totalTokens.toLocaleString()}\n`
  report += "\n"

  // Per-Configuration Breakdown
  report += "PER-CONFIGURATION BREAKDOWN\n"
  report += "-".repeat(70) + "\n"

  const byConfig = new Map<string, BenchmarkResult[]>()
  for (const result of results) {
    const key = `${result.config.taskDomain}-${result.config.targetQuality}`
    const existing = byConfig.get(key) ?? []
    byConfig.set(key, [...existing, result])
  }

  for (const [key, configResults] of byConfig.entries()) {
    const [domain, quality] = key.split("-")
    const avgLatency = average(configResults.map((r) => r.metrics.latencyMs))
    const avgIterations = average(configResults.map((r) => r.metrics.iterations))
    const avgQuality = average(configResults.map((r) => r.metrics.finalQuality))

    report += `\n${domain} (target=${quality}):\n`
    report += `  Latency:     ${avgLatency.toFixed(0)} ms\n`
    report += `  Iterations:  ${avgIterations.toFixed(1)}\n`
    report += `  Quality:     ${avgQuality.toFixed(3)}\n`
  }

  report += "\n"
  report += "=".repeat(70) + "\n"

  return report
}

// ============================================================================
// Main Benchmark Runner
// ============================================================================

export const runCompleteAnalysis = (
  apiKey: string,
  config: BenchmarkConfig = DEFAULT_CONFIG
) => {
  const program = pipe(
    runBenchmarkSuite(config),
    Effect.map((results) => {
      const report = generateReport(results)
      console.log(report)
      return { results, report, stats: analyzeResults(results) }
    })
  )

  const runnable = Effect.provide(
    program,
    Layer.mergeAll(createOpenAILayer(apiKey), createBenchmarkLayer())
  )

  return Effect.runPromise(runnable)
}

// ============================================================================
// Quick Benchmark (Single Task, Single Quality Target)
// ============================================================================

export const quickBenchmark = (apiKey: string) => {
  const quickConfig: BenchmarkConfig = {
    tasks: [STANDARD_TASKS[0]!], // Just one task
    targetQualities: [0.85],
    runs: 3,
    warmupRuns: 1
  }

  return runCompleteAnalysis(apiKey, quickConfig)
}

// Helper function for average calculation
function average(arr: ReadonlyArray<number>): number {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length
}
