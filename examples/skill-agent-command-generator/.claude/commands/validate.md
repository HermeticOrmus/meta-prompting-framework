---
description: Validate artifact quality against thresholds using the QualityGuard agent
args:
  - name: path
    description: Path to artifact or directory to validate
    required: true
allowed-tools: [Read, Glob, Grep, Task]
---

# /validate

Validate artifact quality against established thresholds.

## What This Command Does

Runs the QualityGuard agent to check artifact(s) against quality thresholds. Provides detailed metrics, identifies issues, and gives actionable recommendations.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| path | string | Yes | - | Artifact path or directory |
| --deep | bool | No | false | Deep analysis with recommendations |
| --json | bool | No | false | Output as JSON |
| --fix | bool | No | false | Show auto-fix suggestions |

## Workflow

### Step 1: Resolve Path
```
IF path is file:
  validate single artifact
ELSE IF path is directory:
  find all artifacts in directory
  validate each
```

### Step 2: Run Validation
```
Invoke QualityGuard agent:
  - Quick check: pass/fail + score
  - Deep analysis: detailed metrics + recommendations
```

### Step 3: Report Results
```
Format results based on --json flag
Show pass/fail status
List issues and recommendations if any
```

## Examples

### Example 1: Single File Validation
```
/validate .claude/skills/L3-pipeline.md
```
**Output**:
```
✅ PASS: L3-pipeline.md

Score: 0.91
  Specificity:     0.88 ✓
  Composability:   0.98 ✓
  Testability:     0.92 ✓
  Documentability: 0.85 ✓
```

### Example 2: Directory Validation
```
/validate .claude/skills/
```
**Output**:
```
Validation Report: .claude/skills/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files: 7
Passed: 7 (100%)
Failed: 0 (0%)

Results:
  ✅ L1-option-type.md     0.95
  ✅ L2-result-type.md     0.91
  ✅ L3-pipeline.md        0.91
  ✅ L4-effect-isolation.md 0.89
  ✅ L5-context-reader.md  0.85
  ✅ L6-lazy-stream.md     0.84
  ✅ L7-meta-generator.md  0.83

Average: 0.88
Status: All artifacts meet quality standards
```

### Example 3: Failed Validation
```
/validate my-broken-skill.md
```
**Output**:
```
❌ FAIL: my-broken-skill.md

Score: 0.58
  Specificity:     0.45 ✗ (threshold: 0.70)
  Composability:   0.60 ✗ (threshold: 0.70)
  Testability:     0.70 ✗ (threshold: 0.80)
  Documentability: 0.55 ✗ (threshold: 0.80)

Issues:
  1. Domain too broad: "data processing"
  2. Missing output type annotations
  3. Only 2 examples (need 8+)
  4. No anti-patterns section
```

### Example 4: Deep Analysis
```
/validate .claude/skills/L3-pipeline.md --deep
```
**Output**:
```
Deep Analysis: L3-pipeline.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall: ✅ PASS (0.91)

SPECIFICITY: 0.88 ✓
  ✓ Domain clearly defined: "composition"
  ✓ Single responsibility: data transformation
  △ Could narrow to specific data types

COMPOSABILITY: 0.98 ✓
  ✓ All inputs typed
  ✓ All outputs typed
  ✓ Composition section present
  ✓ Integration examples provided

TESTABILITY: 0.92 ✓
  ✓ 5 pattern examples
  ✓ Pure core (no side effects)
  ✓ Clear preconditions
  △ Could add property-based test hints

DOCUMENTABILITY: 0.85 ✓
  ✓ All sections present
  ✓ Anti-patterns documented
  ✓ Quality metrics included
  △ Could expand integration section

RECOMMENDATIONS:
  1. [Low] Add property-based testing hints
  2. [Low] Expand integration examples
```

### Example 5: JSON Output
```
/validate .claude/skills/ --json
```
**Output**:
```json
{
  "path": ".claude/skills/",
  "total": 7,
  "passed": 7,
  "failed": 0,
  "results": [
    {
      "file": "L1-option-type.md",
      "score": 0.95,
      "passed": true,
      "metrics": {
        "specificity": 0.95,
        "composability": 0.98,
        "testability": 0.95,
        "documentability": 0.90
      }
    }
  ]
}
```

### Example 6: With Fix Suggestions
```
/validate broken-skill.md --fix
```
**Output**:
```
❌ FAIL: broken-skill.md (0.58)

ISSUES AND FIXES:

1. Specificity: 0.45 ✗
   Issue: Domain "data processing" too broad
   Fix: Change to specific domain like "json_parsing" or "csv_transformation"

2. Composability: 0.60 ✗
   Issue: Output type missing
   Fix: Add to interface section:
     outputs:
       - name: result
         type: Result[TransformedData]

3. Testability: 0.70 ✗
   Issue: Only 2 examples
   Fix: Add examples for:
     - Basic usage
     - Error case
     - Edge case
     - Composition

4. Documentability: 0.55 ✗
   Issue: No anti-patterns section
   Fix: Add section:
     ## Anti-Patterns
     | Anti-Pattern | Problem | Correct |
     |--------------|---------|---------|
     | ... | ... | ... |
```

### Example 7: Validate All Artifacts
```
/validate .claude/
```
**Output**:
```
Full Validation Report
━━━━━━━━━━━━━━━━━━━━━

Skills: 7/7 passed
Agents: 3/3 passed
Commands: 4/4 passed

Total: 14/14 (100%)

All artifacts meet quality standards.
```

### Example 8: Agent Validation
```
/validate .claude/agents/skill-composer.md
```
**Output**:
```
✅ PASS: skill-composer.md

Agent Metrics:
  Mission clarity:  ✓ (one sentence)
  Plane coverage:   ✓ (3/3)
  Mode count:       ✓ (3 modes)
  Ethics explicit:  ✓
  Example count:    ✓ (3 examples)

Status: Production ready
```

## Error Handling

### Error: Path Not Found
```
❌ Error: Path not found: unknown.md

Check path and try again.
```

### Error: Invalid Artifact
```
❌ Error: Invalid artifact format

File does not appear to be a valid skill/agent/command.
Check that it has proper frontmatter and sections.
```

## Output Format

### Pass
```
✅ PASS: {filename}

Score: {score}
  {metric}: {value} ✓
  ...
```

### Fail
```
❌ FAIL: {filename}

Score: {score}
  {metric}: {value} ✗ (threshold: {threshold})
  ...

Issues:
  1. {issue description}
  ...
```

---

**Version**: 1.0.0
**Status**: Production Ready
