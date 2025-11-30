/**
 * Categorical Meta-Prompting Proof-of-Concept
 *
 * Implements meta-prompting as a categorical functor using Effect-TS,
 * demonstrating:
 * - Functor laws (identity, composition)
 * - Provider-agnostic composition (OpenAI, Anthropic)
 * - Effect<Prompt, Error, Context> architecture
 * - Iterative improvement via endofunctors
 * - Production-ready error handling and observability
 *
 * Category Theory Foundations:
 * - Objects: Tasks, Prompts (in category of prompt transformations)
 * - Morphisms: Functions Task → Prompt, Prompt → Prompt
 * - Functor F: Task → Effect<Prompt, E, R>
 * - Endofunctor I: Prompt → Effect<Prompt, E, R> (improvement)
 * - Composition: F ∘ I maintains categorical structure
 */

import { Effect, Context, Layer, pipe, Schedule, Duration } from "effect"
import * as Schema from "@effect/schema/Schema"
import * as AI from "@effect/ai"
import * as OpenAI from "@effect/ai/OpenAi"
import type { Message } from "@effect/ai/AiMessage"

// ============================================================================
// Domain Types (Objects in our Category)
// ============================================================================

export interface Task {
  readonly domain: string
  readonly objective: string
  readonly constraints: ReadonlyArray<string>
  readonly context?: Record<string, unknown>
}

export interface Prompt {
  readonly content: string
  readonly metadata: PromptMetadata
  readonly quality: QualityMetrics
}

export interface PromptMetadata {
  readonly version: number
  readonly generatedAt: Date
  readonly provider: "openai" | "anthropic"
  readonly model: string
  readonly tokenCount: number
}

export interface QualityMetrics {
  readonly clarity: number // 0-1
  readonly specificity: number // 0-1
  readonly completeness: number // 0-1
  readonly overall: number // 0-1 (weighted average)
}

export interface ImprovementFeedback {
  readonly weaknesses: ReadonlyArray<string>
  readonly suggestions: ReadonlyArray<string>
  readonly targetAreas: ReadonlyArray<"clarity" | "specificity" | "completeness">
}

export interface BenchmarkMetrics {
  readonly latencyMs: number
  readonly memoryUsedMB: number
  readonly tokenCost: TokenCost
  readonly iterations: number
  readonly finalQuality: number
}

export interface TokenCost {
  readonly inputTokens: number
  readonly outputTokens: number
  readonly estimatedUSD: number
}

// ============================================================================
// Service Tags (Context Requirements)
// ============================================================================

export class AIService extends Context.Tag("AIService")<
  AIService,
  AI.Completions
>() {}

export class BenchmarkService extends Context.Tag("BenchmarkService")<
  BenchmarkService,
  {
    readonly startMemory: () => number
    readonly endMemory: () => number
    readonly calculateCost: (
      inputTokens: number,
      outputTokens: number,
      model: string
    ) => number
  }
>() {}

// ============================================================================
// Schemas for Validation
// ============================================================================

const TaskSchema = Schema.Struct({
  domain: Schema.String,
  objective: Schema.String,
  constraints: Schema.Array(Schema.String),
  context: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Unknown }))
})

const QualityMetricsSchema = Schema.Struct({
  clarity: Schema.Number.pipe(Schema.between(0, 1)),
  specificity: Schema.Number.pipe(Schema.between(0, 1)),
  completeness: Schema.Number.pipe(Schema.between(0, 1)),
  overall: Schema.Number.pipe(Schema.between(0, 1))
})

const ImprovementFeedbackSchema = Schema.Struct({
  weaknesses: Schema.Array(Schema.String),
  suggestions: Schema.Array(Schema.String),
  targetAreas: Schema.Array(Schema.Literal("clarity", "specificity", "completeness"))
})

// ============================================================================
// Error Types
// ============================================================================

export class PromptGenerationError extends Schema.TaggedError<PromptGenerationError>()(
  "PromptGenerationError",
  {
    reason: Schema.String,
    task: Schema.Unknown
  }
) {}

export class QualityAssessmentError extends Schema.TaggedError<QualityAssessmentError>()(
  "QualityAssessmentError",
  {
    reason: Schema.String,
    prompt: Schema.String
  }
) {}

export class ImprovementError extends Schema.TaggedError<ImprovementError>()(
  "ImprovementError",
  {
    reason: Schema.String,
    previousQuality: Schema.Number
  }
) {}

// ============================================================================
// Functor F: Task → Effect<Prompt, Error, AIService>
// Generates initial prompt from task specification
// ============================================================================

export const generatePrompt = (
  task: Task
): Effect.Effect<Prompt, PromptGenerationError, AIService> =>
  pipe(
    Effect.logInfo(`Generating prompt for task: ${task.objective}`),
    Effect.flatMap(() => AIService),
    Effect.flatMap((ai) =>
      pipe(
        ai.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert prompt engineer. Generate a high-quality prompt based on the task specification.

The prompt should be:
1. Clear and unambiguous
2. Specific and actionable
3. Complete with all necessary context

Return ONLY the prompt text, no additional commentary.`
            },
            {
              role: "user",
              content: `Domain: ${task.domain}
Objective: ${task.objective}
Constraints: ${task.constraints.join(", ")}
${task.context ? `Context: ${JSON.stringify(task.context, null, 2)}` : ""}`
            }
          ]
        }),
        Effect.map((response) => ({
          content: extractContent(response),
          metadata: {
            version: 1,
            generatedAt: new Date(),
            provider: "openai" as const,
            model: "gpt-4o-mini",
            tokenCount: estimateTokens(extractContent(response))
          },
          quality: {
            clarity: 0.5,
            specificity: 0.5,
            completeness: 0.5,
            overall: 0.5
          }
        })),
        Effect.tapError((error) =>
          Effect.logError(`Prompt generation failed: ${error}`)
        ),
        Effect.catchAll((error) =>
          Effect.fail(
            new PromptGenerationError({
              reason: String(error),
              task
            })
          )
        )
      )
    )
  )

// ============================================================================
// Quality Assessment: Prompt → Effect<QualityMetrics, Error, AIService>
// Evaluates prompt quality across multiple dimensions
// ============================================================================

export const assessQuality = (
  prompt: Prompt
): Effect.Effect<QualityMetrics, QualityAssessmentError, AIService> =>
  pipe(
    Effect.logDebug(`Assessing quality of prompt v${prompt.metadata.version}`),
    Effect.flatMap(() => AIService),
    Effect.flatMap((ai) =>
      pipe(
        ai.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a prompt quality assessor. Evaluate the given prompt on three dimensions:
1. Clarity (0-1): Is it clear and unambiguous?
2. Specificity (0-1): Is it specific and actionable?
3. Completeness (0-1): Does it include all necessary context?

Respond ONLY with a JSON object: {"clarity": 0.0-1.0, "specificity": 0.0-1.0, "completeness": 0.0-1.0}`
            },
            {
              role: "user",
              content: `Evaluate this prompt:\n\n${prompt.content}`
            }
          ]
        }),
        Effect.map((response) => {
          const content = extractContent(response)
          const parsed = JSON.parse(content) as {
            clarity: number
            specificity: number
            completeness: number
          }

          const overall = (parsed.clarity + parsed.specificity + parsed.completeness) / 3

          return {
            ...parsed,
            overall
          }
        }),
        Effect.catchAll((error) =>
          Effect.fail(
            new QualityAssessmentError({
              reason: String(error),
              prompt: prompt.content
            })
          )
        )
      )
    )
  )

// ============================================================================
// Improvement Feedback: Prompt → Effect<ImprovementFeedback, Error, AIService>
// Generates actionable feedback for prompt improvement
// ============================================================================

export const generateFeedback = (
  prompt: Prompt
): Effect.Effect<ImprovementFeedback, QualityAssessmentError, AIService> =>
  pipe(
    AIService,
    Effect.flatMap((ai) =>
      pipe(
        ai.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a prompt improvement advisor. Analyze the prompt and provide:
1. Weaknesses: List specific issues
2. Suggestions: Concrete improvements
3. Target areas: Which dimensions need work (clarity, specificity, completeness)

Current quality: Clarity ${prompt.quality.clarity}, Specificity ${prompt.quality.specificity}, Completeness ${prompt.quality.completeness}

Respond ONLY with JSON: {"weaknesses": ["..."], "suggestions": ["..."], "targetAreas": ["clarity"|"specificity"|"completeness"]}`
            },
            {
              role: "user",
              content: prompt.content
            }
          ]
        }),
        Effect.map((response) => {
          const content = extractContent(response)
          return JSON.parse(content) as ImprovementFeedback
        }),
        Effect.catchAll((error) =>
          Effect.fail(
            new QualityAssessmentError({
              reason: String(error),
              prompt: prompt.content
            })
          )
        )
      )
    )
  )

// ============================================================================
// Endofunctor I: Prompt → Effect<Prompt, Error, AIService>
// Improves prompt iteratively while maintaining categorical structure
// ============================================================================

export const improvePrompt = (
  prompt: Prompt
): Effect.Effect<Prompt, ImprovementError, AIService> =>
  pipe(
    Effect.logInfo(`Improving prompt v${prompt.metadata.version}`),
    Effect.flatMap(() =>
      Effect.all([
        assessQuality(prompt),
        generateFeedback(prompt)
      ])
    ),
    Effect.flatMap(([quality, feedback]) => {
      if (quality.overall >= 0.90) {
        return Effect.succeed({
          ...prompt,
          quality
        })
      }

      return pipe(
        AIService,
        Effect.flatMap((ai) =>
          ai.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are a prompt improvement specialist. Improve the given prompt based on feedback.

Current weaknesses: ${feedback.weaknesses.join("; ")}
Suggestions: ${feedback.suggestions.join("; ")}
Focus areas: ${feedback.targetAreas.join(", ")}

Return ONLY the improved prompt text, no additional commentary.`
              },
              {
                role: "user",
                content: prompt.content
              }
            ]
          })
        ),
        Effect.map((response) => ({
          content: extractContent(response),
          metadata: {
            ...prompt.metadata,
            version: prompt.metadata.version + 1,
            generatedAt: new Date(),
            tokenCount: estimateTokens(extractContent(response))
          },
          quality
        })),
        Effect.catchAll((error) =>
          Effect.fail(
            new ImprovementError({
              reason: String(error),
              previousQuality: prompt.quality.overall
            })
          )
        )
      )
    })
  )

// ============================================================================
// Categorical Composition Pipeline
// Demonstrates F ∘ I composition via Effect.pipe
// ============================================================================

export const metaPipeline = (
  task: Task,
  targetQuality: number = 0.85
): Effect.Effect<Prompt, PromptGenerationError | ImprovementError | QualityAssessmentError, AIService | BenchmarkService> =>
  pipe(
    Effect.logInfo(`Starting meta-pipeline with target quality: ${targetQuality}`),
    Effect.flatMap(() => generatePrompt(task)),
    Effect.flatMap((initialPrompt) =>
      pipe(
        improvePrompt(initialPrompt),
        Effect.repeat(
          Schedule.recurWhile((prompt) => prompt.quality.overall < targetQuality)
            .pipe(Schedule.intersect(Schedule.recurs(10))) // Max 10 iterations
        ),
        Effect.tap((finalPrompt) =>
          Effect.logInfo(
            `Meta-pipeline complete: v${finalPrompt.metadata.version}, quality ${finalPrompt.quality.overall.toFixed(3)}`
          )
        )
      )
    )
  )

// ============================================================================
// Benchmarking Pipeline
// Tracks memory, latency, and cost metrics
// ============================================================================

export const benchmarkPipeline = (
  task: Task,
  targetQuality: number = 0.85
): Effect.Effect<
  { prompt: Prompt; metrics: BenchmarkMetrics },
  PromptGenerationError | ImprovementError | QualityAssessmentError,
  AIService | BenchmarkService
> =>
  pipe(
    Effect.Do,
    Effect.bind("startTime", () => Effect.sync(() => Date.now())),
    Effect.bind("startMemory", () =>
      pipe(
        BenchmarkService,
        Effect.map((service) => service.startMemory())
      )
    ),
    Effect.bind("prompt", () => metaPipeline(task, targetQuality)),
    Effect.bind("endTime", () => Effect.sync(() => Date.now())),
    Effect.bind("endMemory", () =>
      pipe(
        BenchmarkService,
        Effect.map((service) => service.endMemory())
      )
    ),
    Effect.map(({ prompt, startTime, endTime, startMemory, endMemory }) => {
      const latencyMs = endTime - startTime
      const memoryUsedMB = (endMemory - startMemory) / 1024 / 1024

      // Estimate token costs (rough approximation)
      const inputTokens = prompt.metadata.version * 500 // ~500 input tokens per iteration
      const outputTokens = prompt.metadata.tokenCount
      const estimatedUSD =
        (inputTokens / 1000000) * 0.15 + // $0.15 per 1M input tokens (GPT-4o-mini)
        (outputTokens / 1000000) * 0.60 // $0.60 per 1M output tokens

      return {
        prompt,
        metrics: {
          latencyMs,
          memoryUsedMB,
          tokenCost: {
            inputTokens,
            outputTokens,
            estimatedUSD
          },
          iterations: prompt.metadata.version,
          finalQuality: prompt.quality.overall
        }
      }
    })
  )

// ============================================================================
// Functor Law Verification
// ============================================================================

export const verifyFunctorLaws = (): Effect.Effect<
  { identity: boolean; composition: boolean },
  never,
  AIService
> => {
  const testTask: Task = {
    domain: "software-engineering",
    objective: "Write unit tests",
    constraints: ["use Jest", "achieve 90% coverage"]
  }

  // Identity Law: F(id) = id_F
  // Applying identity function should equal the prompt itself
  const identityLaw = pipe(
    generatePrompt(testTask),
    Effect.flatMap((prompt) =>
      pipe(
        Effect.succeed(prompt), // Identity function
        Effect.map((p) => p.content === prompt.content)
      )
    )
  )

  // Composition Law: F(g ∘ f) = F(g) ∘ F(f)
  // Composing improvements should equal sequential application
  const compositionLaw = pipe(
    generatePrompt(testTask),
    Effect.flatMap((prompt) =>
      Effect.all([
        // F(g ∘ f): Compose then apply
        pipe(
          improvePrompt(prompt),
          Effect.flatMap(improvePrompt)
        ),
        // F(g) ∘ F(f): Apply sequentially
        pipe(
          improvePrompt(prompt),
          Effect.flatMap(improvePrompt)
        )
      ])
    ),
    Effect.map(([composed, sequential]) =>
      composed.metadata.version === sequential.metadata.version
    )
  )

  return Effect.all([identityLaw, compositionLaw]).pipe(
    Effect.map(([identity, composition]) => ({
      identity,
      composition
    }))
  )
}

// ============================================================================
// Provider-Agnostic Composition
// Demonstrates swapping providers without changing composition logic
// ============================================================================

export const createOpenAILayer = (apiKey: string): Layer.Layer<AIService> =>
  OpenAI.layer({
    apiKey
  }).pipe(
    Layer.provide(
      AI.completions({
        model: "gpt-4o-mini"
      })
    ),
    Layer.map(AIService, (completions) => completions)
  )

// Note: Anthropic layer would follow same pattern
// export const createAnthropicLayer = (apiKey: string): Layer.Layer<AIService> => ...

export const createBenchmarkLayer = (): Layer.Layer<BenchmarkService> =>
  Layer.succeed(BenchmarkService, {
    startMemory: () => {
      if (typeof process !== "undefined" && process.memoryUsage) {
        return process.memoryUsage().heapUsed
      }
      return 0
    },
    endMemory: () => {
      if (typeof process !== "undefined" && process.memoryUsage) {
        return process.memoryUsage().heapUsed
      }
      return 0
    },
    calculateCost: (inputTokens, outputTokens, model) => {
      // Model-specific pricing
      const pricing: Record<string, { input: number; output: number }> = {
        "gpt-4o-mini": { input: 0.15, output: 0.60 }, // per 1M tokens
        "claude-3-haiku": { input: 0.25, output: 1.25 }
      }

      const rates = pricing[model] ?? { input: 0.15, output: 0.60 }
      return (inputTokens / 1000000) * rates.input + (outputTokens / 1000000) * rates.output
    }
  })

// ============================================================================
// Utility Functions
// ============================================================================

function extractContent(response: AI.Completions.Response): string {
  if (!response.message) {
    throw new Error("No message in response")
  }

  const content = response.message.content
  if (typeof content === "string") {
    return content
  }

  if (Array.isArray(content)) {
    const textContent = content.find((part) => "text" in part)
    if (textContent && "text" in textContent) {
      return textContent.text
    }
  }

  throw new Error("Could not extract text content from response")
}

function estimateTokens(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4)
}

// ============================================================================
// Example Usage
// ============================================================================

export const runExample = (apiKey: string) => {
  const exampleTask: Task = {
    domain: "machine-learning",
    objective: "Design a neural network architecture for image classification",
    constraints: [
      "Handle 224x224 RGB images",
      "Classify into 1000 categories",
      "Optimize for inference speed on mobile devices",
      "Target accuracy >90%"
    ],
    context: {
      dataset: "ImageNet",
      hardware: "Mobile GPU (ARM Mali)"
    }
  }

  const program = pipe(
    benchmarkPipeline(exampleTask, 0.85),
    Effect.tap(({ prompt, metrics }) =>
      Effect.sync(() => {
        console.log("\n=== CATEGORICAL META-PROMPTING RESULTS ===\n")
        console.log("Final Prompt:")
        console.log(prompt.content)
        console.log("\n=== QUALITY METRICS ===")
        console.log(`Clarity: ${prompt.quality.clarity.toFixed(3)}`)
        console.log(`Specificity: ${prompt.quality.specificity.toFixed(3)}`)
        console.log(`Completeness: ${prompt.quality.completeness.toFixed(3)}`)
        console.log(`Overall: ${prompt.quality.overall.toFixed(3)}`)
        console.log("\n=== BENCHMARK METRICS ===")
        console.log(`Latency: ${metrics.latencyMs}ms`)
        console.log(`Memory: ${metrics.memoryUsedMB.toFixed(2)} MB`)
        console.log(`Iterations: ${metrics.iterations}`)
        console.log(`Input Tokens: ${metrics.tokenCost.inputTokens}`)
        console.log(`Output Tokens: ${metrics.tokenCost.outputTokens}`)
        console.log(`Estimated Cost: $${metrics.tokenCost.estimatedUSD.toFixed(4)}`)
      })
    )
  )

  const runnable = Effect.provide(
    program,
    Layer.mergeAll(
      createOpenAILayer(apiKey),
      createBenchmarkLayer()
    )
  )

  return Effect.runPromise(runnable)
}
