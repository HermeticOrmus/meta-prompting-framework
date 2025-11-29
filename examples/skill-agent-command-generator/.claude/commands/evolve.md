---
description: Improve the artifact generation system by mining patterns and updating templates
args:
  - name: action
    description: Action to perform (analyze, update, report)
    required: true
allowed-tools: [Read, Write, Glob, Grep, Task, TodoWrite]
---

# /evolve

Improve the artifact generation system over time.

## What This Command Does

Invokes the EvolutionEngine agent to analyze patterns from successful artifacts, update generation templates, and track improvement trends.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| action | string | Yes | - | `analyze`, `update`, or `report` |
| --min-artifacts | int | No | 10 | Minimum artifacts for analysis |
| --threshold | float | No | 0.85 | Quality threshold for "successful" |
| --dry-run | bool | No | false | Preview changes without applying |

## Actions

### analyze
Mine patterns from successful artifacts without making changes.

### update
Mine patterns AND update templates based on findings.

### report
Show improvement trends over time.

## Workflow

### For `analyze`:
```
1. Load all artifacts
2. Filter by quality threshold
3. Extract patterns from high-quality artifacts
4. Compare to patterns in low-quality artifacts
5. Rank patterns by impact
6. Report findings
```

### For `update`:
```
1. Run analysis
2. Select high-impact patterns
3. Integrate into templates (--dry-run previews)
4. Validate updated templates
5. Version and archive old templates
6. Deploy new templates
```

### For `report`:
```
1. Load historical quality data
2. Compute trends
3. Identify anomalies
4. Project future quality
5. Display report
```

## Examples

### Example 1: Analyze Patterns
```
/evolve analyze
```
**Output**:
```
Pattern Analysis Report
━━━━━━━━━━━━━━━━━━━━━━━

Artifacts Analyzed: 15
High Quality (≥0.85): 8
Low Quality (<0.70): 2

Top Success Patterns:

1. EXPLICIT_TYPE_ANNOTATIONS
   Impact: 0.92
   Found in: 100% high-quality, 20% low-quality
   Recommendation: Require in interface section

2. CONCRETE_ANTI_PATTERNS
   Impact: 0.85
   Found in: 87% high-quality, 10% low-quality
   Recommendation: Add template examples

3. PROGRESSIVE_EXAMPLES
   Impact: 0.78
   Found in: 75% high-quality, 30% low-quality
   Recommendation: Structure basic → advanced

4. INTEGRATION_SECTION
   Impact: 0.71
   Found in: 62% high-quality, 15% low-quality
   Recommendation: Add to template

To apply: /evolve update
```

### Example 2: Update Templates
```
/evolve update
```
**Output**:
```
Template Evolution
━━━━━━━━━━━━━━━━━

Applying 4 patterns to templates...

SKILL-GENERATOR.md:
  ✅ Added type annotation requirement
  ✅ Added anti-pattern examples
  ✅ Restructured examples section
  ✅ Added integration section

AGENT-GENERATOR.md:
  ✅ Added mode transition examples
  ✅ Enhanced ethics section

COMMAND-GENERATOR.md:
  ✅ Added progressive example structure

Validation:
  All templates valid ✓
  Test generation passed ✓

Versions:
  SKILL-GENERATOR: 1.0.0 → 1.1.0
  AGENT-GENERATOR: 1.0.0 → 1.1.0
  COMMAND-GENERATOR: 1.0.0 → 1.1.0

Previous versions archived to iterations/
```

### Example 3: Dry Run Update
```
/evolve update --dry-run
```
**Output**:
```
🔍 DRY RUN - Preview Only

Would apply to SKILL-GENERATOR.md:

--- a/meta-prompts/SKILL-GENERATOR.md
+++ b/meta-prompts/SKILL-GENERATOR.md
@@ -45,6 +45,10 @@
 ## Interface
+
+### Type Requirements
+All inputs and outputs MUST have explicit type annotations.
+

Would update version: 1.0.0 → 1.1.0

To apply: Remove --dry-run flag
```

### Example 4: Quality Trend Report
```
/evolve report
```
**Output**:
```
Evolution Report
━━━━━━━━━━━━━━━━

Quality Trend (last 20 artifacts):

  Score
  1.0 │
  0.9 │      ●●●●●●●
  0.8 │  ●●●●
  0.7 │●●
  0.6 │
      └─────────────────
        1         10        20

Average by generation:
  Gen 1-5:   0.78
  Gen 6-10:  0.84
  Gen 11-15: 0.87
  Gen 16-20: 0.89

Trend: ↑ +0.11 improvement
Rate: +0.006 per artifact

Template Updates:
  - v1.0.0 → v1.1.0 (Gen 10): +0.04 avg
  - v1.1.0 → v1.2.0 (Gen 15): +0.03 avg

Projection:
  Gen 25: ~0.91
  Gen 30: ~0.93

Status: ✅ Healthy evolution
```

### Example 5: Analyze with Custom Threshold
```
/evolve analyze --threshold=0.90
```
**Output**:
```
Pattern Analysis (threshold: 0.90)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

High Quality (≥0.90): 4 artifacts

Patterns in top-tier artifacts:
1. EXHAUSTIVE_EXAMPLES (12+ examples)
2. TYPED_ERROR_CONDITIONS
3. COMPOSITION_TESTS
4. MASTERY_SIGNALS

These patterns distinguish exceptional from good.
```

### Example 6: Minimum Artifact Check
```
/evolve analyze --min-artifacts=20
```
**Output**:
```
⚠️ Insufficient artifacts for analysis

Required: 20
Available: 15

Generate 5 more artifacts before analysis.
Or use: /evolve analyze --min-artifacts=15
```

### Example 7: Show All Historical Versions
```
/evolve report --history
```
**Output**:
```
Template History
━━━━━━━━━━━━━━━

SKILL-GENERATOR.md:
  v1.0.0 (2024-01-01) - Initial release
  v1.1.0 (2024-01-15) - Added type requirements
  v1.2.0 (2024-02-01) - Enhanced examples

Quality impact:
  v1.0.0: avg 0.78
  v1.1.0: avg 0.84 (+0.06)
  v1.2.0: avg 0.88 (+0.04)
```

### Example 8: Rollback Check
```
/evolve report --check-regression
```
**Output**:
```
Regression Check
━━━━━━━━━━━━━━━

Comparing last 10 artifacts to previous 10:

  Previous avg: 0.86
  Current avg:  0.88

Status: ✅ No regression detected

If regression occurred:
  /evolve rollback --to=v1.1.0
```

## Error Handling

### Error: Insufficient Data
```
❌ Error: Need at least 10 artifacts for analysis

Current count: 7

Generate more artifacts or lower threshold:
  /evolve analyze --min-artifacts=7
```

### Error: Template Validation Failed
```
❌ Error: Updated template validation failed

Issue: Template generates invalid artifacts

Changes not applied. Review patterns and retry.
```

### Error: Regression Detected
```
⚠️ Warning: Quality regression detected

Previous avg: 0.85
Current avg:  0.81

Investigate recent changes or rollback:
  /evolve rollback --to=v1.1.0
```

## Output Format

### Analysis
```
Pattern Analysis Report
━━━━━━━━━━━━━━━━━━━━━━━

Artifacts: {count}
High Quality: {count} ({percent}%)

Top Patterns:
  1. {pattern_name}
     Impact: {score}
     Found in: {high}% high, {low}% low
```

### Update
```
Template Evolution
━━━━━━━━━━━━━━━━━

{template}:
  ✅ {change}
  ...

Versions: {old} → {new}
```

### Report
```
Evolution Report
━━━━━━━━━━━━━━━━

Trend: {direction} {delta}
Rate: {rate} per artifact
Status: {status}
```

---

**Version**: 1.0.0
**Status**: Production Ready
