---
name: JsonSchemaValidator
description: Parse and validate JSON data against JSON Schema specifications
domain: data_validation
version: 1.0.0
cognitive_load: O(n)
---

# JsonSchemaValidator

## Purpose

A reusable capability for parsing JSON data and validating it against JSON Schema specifications. This skill eliminates invalid data at system boundaries, ensuring downstream components receive well-formed, contract-compliant data.

## Grammar

- **Context**: Data ingestion points where JSON is received from external sources
- **Capability**: Parse JSON strings and validate against schema definitions
- **Constraint**: Schema must be valid JSON Schema draft-07 or later; invalid input returns structured errors
- **Composition**: Chains with transformers, serializers, and data pipeline skills

## Interface

### Inputs

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| json_data | string \| object | Yes | - | Raw JSON string or parsed object |
| schema | object | Yes | - | JSON Schema definition |
| options | ValidationOptions | No | {} | Validation configuration |

### Outputs

| Name | Type | Guarantees | Description |
|------|------|------------|-------------|
| result | ValidationResult | Always present | Contains valid flag, data or errors |
| valid | boolean | Always present | Quick check for validity |
| errors | ValidationError[] | Empty if valid | Detailed error information |
| data | T | Present if valid | Typed, validated data |

### Effects

| Type | Scope | Reversible | Description |
|------|-------|------------|-------------|
| None | - | - | Pure function, no side effects |

### Errors

| Condition | Recovery | Description |
|-----------|----------|-------------|
| PARSE_ERROR | Return error result | JSON syntax is invalid |
| SCHEMA_INVALID | Return error result | Schema itself is malformed |
| VALIDATION_FAILED | Return error with details | Data doesn't match schema |
| TYPE_MISMATCH | Return error with path | Field type doesn't match |
| REQUIRED_MISSING | Return error with field | Required field is absent |

## Implementation

```
VALIDATE(json_data, schema, options) := {
  // Step 1: Parse if string
  parsed = typeof(json_data) == "string"
    ? TRY_PARSE(json_data)
    : json_data

  IF parsed.is_error THEN
    RETURN ValidationResult.Error(PARSE_ERROR, parsed.error)

  // Step 2: Validate schema itself
  schema_valid = VALIDATE_SCHEMA(schema)
  IF NOT schema_valid THEN
    RETURN ValidationResult.Error(SCHEMA_INVALID, schema_valid.errors)

  // Step 3: Validate data against schema
  validation = SCHEMA_VALIDATE(parsed.value, schema, options)

  IF validation.valid THEN
    RETURN ValidationResult.Ok(parsed.value)
  ELSE
    RETURN ValidationResult.Error(VALIDATION_FAILED, validation.errors)
}
```

## Examples

### Basic Usage

```go
schema := map[string]interface{}{
    "type": "object",
    "properties": map[string]interface{}{
        "name": map[string]interface{}{"type": "string"},
        "age":  map[string]interface{}{"type": "integer", "minimum": 0},
    },
    "required": []string{"name"},
}

jsonData := `{"name": "Alice", "age": 30}`

result := JsonSchemaValidator.Validate(jsonData, schema)
// result.Valid == true
// result.Data == {name: "Alice", age: 30}
```

### Advanced Usage with Options

```go
options := ValidationOptions{
    CoerceTypes:     true,
    RemoveAdditional: true,
    UseDefaults:     true,
}

schema := map[string]interface{}{
    "type": "object",
    "properties": map[string]interface{}{
        "count": map[string]interface{}{
            "type": "integer",
            "default": 10,
        },
    },
    "additionalProperties": false,
}

jsonData := `{"count": "5", "extra": "field"}`

result := JsonSchemaValidator.Validate(jsonData, schema, options)
// result.Valid == true
// result.Data == {count: 5}  // "5" coerced to 5, "extra" removed
```

### Composition with Pipeline

```go
// Chain with other skills
pipeline := Pipeline.New().
    Add(JsonSchemaValidator.Skill(userSchema)).
    Add(Sanitizer.Skill()).
    Add(Normalizer.Skill()).
    Add(Persister.Skill(db))

result := pipeline.Process(rawUserJson)
```

### Error Handling

```go
jsonData := `{"name": 123, "age": -5}`

result := JsonSchemaValidator.Validate(jsonData, schema)
// result.Valid == false
// result.Errors == [
//   {path: "/name", message: "expected string, got number"},
//   {path: "/age", message: "must be >= 0"}
// ]
```

## Anti-Patterns

### Validating After Processing
```go
// WRONG: Validate after using data
user := ParseUser(jsonData)
DoSomethingWith(user)
result := Validate(jsonData, schema)  // Too late!

// CORRECT: Validate before using
result := Validate(jsonData, schema)
if result.Valid {
    user := result.Data
    DoSomethingWith(user)
}
```

### Ignoring Validation Errors
```go
// WRONG: Ignoring errors
result := Validate(jsonData, schema)
useData(jsonData)  // Using original, not validated!

// CORRECT: Use validated data or handle errors
result := Validate(jsonData, schema)
if result.Valid {
    useData(result.Data)
} else {
    handleErrors(result.Errors)
}
```

### Over-Broad Schemas
```go
// WRONG: Schema too permissive
schema := map[string]interface{}{
    "type": "object",
    // No properties defined, accepts anything
}

// CORRECT: Define expected structure
schema := map[string]interface{}{
    "type": "object",
    "properties": {...},
    "required": [...],
    "additionalProperties": false,
}
```

## Quality Metrics

| Metric | Score | Target |
|--------|-------|--------|
| Specificity | 0.85 | ≥0.7 |
| Composability | 0.90 | ≥0.7 |
| Testability | 0.95 | ≥0.8 |
| Documentability | 0.88 | ≥0.8 |
| **Overall** | 0.90 | ≥0.75 |

## Composition Points

### Requires
- None (standalone capability)

### Provides
- `json_validation`: Validate JSON against schema
- `json_parsing`: Parse JSON strings safely
- `error_reporting`: Structured validation errors

### Conflicts
- None (composes with all)

### Extension Points
- Custom format validators
- Custom keywords
- Error message customization
