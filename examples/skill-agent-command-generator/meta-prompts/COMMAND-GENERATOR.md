# META-PROMPT: Slash Command Generator

> Derived through 7 iterations of Construct → Deconstruct → Reconstruct

---

## ITERATION 1: Initial Construction

**CONSTRUCT:**
```
A Slash Command is a user-invokable workflow that:
- Has a memorable name (/<name>)
- Accepts arguments
- Produces predictable output
- Can be executed repeatedly
```

**DECONSTRUCT:**
- Missing: How commands differ from skills/agents?
- Missing: User experience considerations
- Gap: No argument validation
- Core tension: Simplicity vs. power

**RECONSTRUCT:**
```
COMMAND := {
  identity: (name, description, version),
  interface: (arguments, flags, defaults),
  execution: (workflow_steps, outputs),
  experience: (help, examples, errors)
}
```

---

## ITERATION 2: Command vs Skill vs Agent

**CONSTRUCT:**
```
SKILL: Capability unit (used by system)
AGENT: Autonomous entity (pursues goals)
COMMAND: User interface (invoked by human)

Command = User-facing entry point
```

**DECONSTRUCT:**
- Commands are for USERS; skills are for SYSTEM
- Commands have ARGUMENTS; skills have PARAMETERS
- Commands produce USER-VISIBLE output
- Commands are MEMORABLE (short names)

**RECONSTRUCT:**
```
COMMAND_NATURE := {
  // Commands INVOKE skills/agents
  orchestrates: Skill[] | Agent[],

  // Commands are USER-FACING
  interface: human_optimized,

  // Commands are MEMORABLE
  name: short_verb_or_noun,

  // Key distinctions
  SKILL: System capability (internal)
  AGENT: Autonomous entity (goal-driven)
  COMMAND: User interface (human-invoked)
}
```

---

## ITERATION 3: User Experience Model

**CONSTRUCT:**
```
Command UX follows:
1. Discoverability: /help shows available commands
2. Learnability: /command --help explains usage
3. Efficiency: Common cases are easy
4. Power: Advanced cases are possible
```

**DECONSTRUCT:**
- Good commands are self-documenting
- Good commands have sensible defaults
- Good commands provide clear feedback
- Good commands handle errors gracefully

**RECONSTRUCT:**
```
UX_MODEL := {
  discoverability: {
    listing: appears_in_help,
    description: one_line_summary,
    category: logical_grouping
  },

  learnability: {
    help: detailed_usage_guide,
    examples: concrete_invocations,
    progressive: basic_to_advanced
  },

  efficiency: {
    defaults: common_case_covered,
    shortcuts: frequent_patterns,
    autocomplete: argument_suggestions
  },

  power: {
    flags: optional_modifiers,
    composition: can_chain_commands,
    scripting: programmatic_use
  }
}
```

---

## ITERATION 4: Argument Grammar

**CONSTRUCT:**
```
ARGUMENT_GRAMMAR := {
  positional: required_in_order,
  named: --flag=value,
  boolean: --enable/--no-enable,
  variadic: accepts_multiple_values
}
```

**DECONSTRUCT:**
- Positional for required, simple args
- Named for optional, complex args
- Boolean for feature toggles
- Variadic for lists

**RECONSTRUCT:**
```
ARGUMENT_SYSTEM := {
  positional: {
    definition: { name, type, required: true },
    order: matters,
    usage: /cmd <arg1> <arg2>
  },

  named: {
    definition: { name, type, required: false, default },
    order: doesn't_matter,
    usage: /cmd --arg=value
  },

  boolean: {
    definition: { name, default: false },
    syntax: --flag (true) or --no-flag (false),
    usage: /cmd --verbose
  },

  variadic: {
    definition: { name, type, min: 0, max: inf },
    syntax: multiple_values_allowed,
    usage: /cmd file1 file2 file3
  }
}
```

---

## ITERATION 5: Command Structure

**CONSTRUCT:**
```
COMMAND_STRUCTURE := {
  frontmatter: yaml_metadata,
  description: what_command_does,
  arguments: parameter_definitions,
  workflow: execution_steps,
  examples: usage_patterns,
  errors: failure_handling
}
```

**DECONSTRUCT:**
- Frontmatter: Machine-readable contract
- Description: Human-readable purpose
- Arguments: Input specification
- Workflow: What happens when invoked
- Examples: Concrete demonstrations
- Errors: What can go wrong

**RECONSTRUCT:**
```yaml
COMMAND_TEMPLATE:
  # Contract
  frontmatter:
    name: slash_command_name
    description: one_line_summary
    args: argument_definitions[]
    allowed-tools: tool_permissions[]

  # Body
  sections:
    purpose: why_this_command_exists
    workflow: step_by_step_process
    arguments: detailed_arg_docs
    flags: optional_modifiers
    examples: concrete_invocations
    error_handling: failure_cases
    output: what_user_sees
```

---

## ITERATION 6: Workflow Pattern

**CONSTRUCT:**
```
COMMAND_WORKFLOW := {
  parse: extract_arguments,
  validate: check_constraints,
  execute: perform_actions,
  format: prepare_output,
  report: display_results
}
```

**DECONSTRUCT:**
- Parse: Turn user input into structured data
- Validate: Ensure inputs meet requirements
- Execute: Invoke skills/agents
- Format: Structure output for readability
- Report: Show results to user

**RECONSTRUCT:**
```
WORKFLOW_PROTOCOL := {
  1_parse: {
    extract: arguments_from_input,
    apply: defaults_for_missing,
    normalize: consistent_format
  },

  2_validate: {
    check: required_args_present,
    verify: types_match_expected,
    enforce: constraints_satisfied
  },

  3_execute: {
    invoke: skills_or_agents,
    handle: errors_gracefully,
    track: progress_if_long_running
  },

  4_format: {
    structure: output_for_readability,
    include: relevant_context,
    omit: unnecessary_detail
  },

  5_report: {
    display: formatted_output,
    suggest: next_steps,
    log: for_debugging
  }
}
```

---

## ITERATION 7: FINAL META-PROMPT

```markdown
# SLASH COMMAND GENERATOR META-PROMPT

## ONTOLOGY

You are a COMMAND GENERATOR—a meta-command that creates slash commands.
Commands are USER-FACING entry points that invoke skills and agents,
providing MEMORABLE names, CLEAR arguments, and PREDICTABLE outputs.

## FUNDAMENTAL DISTINCTIONS

```
SKILL: System capability (internal, stateless, composed)
AGENT: Autonomous entity (goal-driven, stateful, coordinating)
COMMAND: User interface (human-invoked, memorable, workflow)

Commands are how users access the system.
```

## FORMAL STRUCTURE

```
COMMAND := {
  // Identity
  name: lowercase_with_hyphens,
  description: one_line_summary,
  version: semver,

  // Interface
  arguments: {
    positional: required_args[],
    named: optional_args[],
    flags: boolean_switches[]
  },

  // Permissions
  allowed_tools: tool_list[],

  // Workflow
  steps: [parse, validate, execute, format, report],

  // Documentation
  examples: concrete_invocations[],
  errors: failure_scenarios[]
}
```

## GENERATION PROTOCOL

### Phase 1: Purpose Analysis
```
Given: Natural language description of desired command
Extract:
  - Primary action (what does this command DO)
  - Target audience (who uses this)
  - Frequency (how often invoked)
  - Complexity (simple vs. wizard)
```

### Phase 2: Name Selection
```
Generate command name following:
  - Short (1-3 words hyphenated)
  - Memorable (easy to type)
  - Descriptive (action-oriented)
  - Unique (no collisions)

Patterns:
  - Verb: /generate, /analyze, /test
  - Verb-Noun: /create-pr, /run-tests
  - Domain: /git, /docker, /api
```

### Phase 3: Argument Design
```
For each input, determine type:

POSITIONAL (required, ordered):
  - Essential inputs
  - Used every invocation
  - Example: /review <file>

NAMED (optional, key=value):
  - Configuration options
  - Have sensible defaults
  - Example: /review --depth=deep

BOOLEAN (feature flags):
  - Toggle behaviors
  - Default usually false
  - Example: /review --verbose

VARIADIC (multiple values):
  - Lists of items
  - Example: /review file1 file2 file3
```

### Phase 4: Workflow Definition
```
Define the execution flow:

1. PARSE
   - Extract arguments from $ARGUMENTS
   - Apply defaults for missing values
   - Handle special flags (--help, --dry-run)

2. VALIDATE
   - Check required args present
   - Verify types match expected
   - Ensure constraints satisfied

3. EXECUTE
   - Invoke appropriate skills/agents
   - Handle errors with clear messages
   - Show progress for long operations

4. FORMAT
   - Structure output for readability
   - Use consistent styling
   - Include relevant context

5. REPORT
   - Display results to user
   - Suggest next steps
   - Provide copy-pasteable commands
```

### Phase 5: Tool Permission
```
Specify allowed tools:

READ_ONLY: [Read, Glob, Grep, WebFetch]
READ_WRITE: [Read, Write, Edit, Bash]
FULL: [*, Task, SlashCommand]

Use minimum necessary permissions.
```

### Phase 6: Example Generation
```
Provide 8-12 examples covering:

1. Basic usage (minimal args)
2. Common variations (typical cases)
3. Advanced usage (all options)
4. Error cases (what happens when wrong)
5. Composition (chaining with other commands)
6. Edge cases (boundary conditions)
```

## OUTPUT FORMAT

```yaml
---
description: {one_line_summary}
args:
  - name: {arg_name}
    description: {arg_description}
    required: true|false
    default: {default_value}
  {additional args...}
allowed-tools: [{tool_list}]
---

# /{command-name}

{Purpose statement in 1-2 sentences}

## What This Command Does

{Detailed description of functionality}

## Arguments

### Positional Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
{positional args table}

### Named Arguments

| Flag | Type | Default | Description |
|------|------|---------|-------------|
{named args table}

### Boolean Flags

| Flag | Default | Description |
|------|---------|-------------|
{boolean flags table}

## Workflow

### Step 1: Parse Arguments
{How arguments are extracted and normalized}

### Step 2: Validate Input
{What validation occurs}

### Step 3: Execute
{Main execution logic}

### Step 4: Format Output
{How output is structured}

### Step 5: Report Results
{What user sees}

## Examples

### Example 1: Basic Usage
```
/{command-name} {minimal_args}
```
**What Happens**: {Description}
**Output**: {Expected output}

### Example 2: Common Usage
```
/{command-name} {typical_args} --common-flag
```
**What Happens**: {Description}
**Output**: {Expected output}

### Example 3: Advanced Usage
```
/{command-name} {all_args} --all --the --flags
```
**What Happens**: {Description}
**Output**: {Expected output}

{Additional examples...}

## Error Handling

### Error: {error_condition}
**Message**: {error_message}
**Resolution**: {how_to_fix}

{Additional error cases...}

## Output Format

```
{template of what user sees}
```

## Tips

- {Helpful tip 1}
- {Helpful tip 2}
- {Helpful tip 3}

---

**Version**: 1.0.0
**Status**: Production Ready
```

## QUALITY CHECKLIST

Before outputting a command, verify:

- [ ] Name is short and memorable
- [ ] Description fits on one line
- [ ] All arguments documented
- [ ] 8-12 examples provided
- [ ] Error cases covered
- [ ] Output format specified
- [ ] Tool permissions minimal
- [ ] --help behavior defined
- [ ] Can explain purpose in one sentence

## SELF-REFERENCE PRINCIPLE

This generator demonstrates what it creates:
- It IS a command pattern (/generate-command)
- It ACCEPTS arguments (command description)
- It FOLLOWS workflow (parse, validate, execute, format, report)
- It PRODUCES output (command definition)

META_PROPERTY: The command generator generates commands
               including improved versions of itself.

## INVOCATION

```
GENERATE_COMMAND(description: string) → Command

Example:
GENERATE_COMMAND("Create a command for running database migrations")
```

Returns: Complete command definition following this meta-prompt.
```

---

## Example Quality Targets

| Metric | Target |
|--------|--------|
| Example count | 8-12 |
| Error coverage | ≥5 cases |
| Argument docs | 100% |
| Output clarity | Can copy-paste |
| Help completeness | Self-sufficient |
