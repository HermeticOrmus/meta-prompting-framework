---
description: Run database migrations with support for up, down, step control, and dry-run preview
args:
  - name: direction
    description: Migration direction (up or down)
    required: false
    default: up
  - name: step
    description: Number of migrations to run
    required: false
    default: all
allowed-tools: [Read, Bash, Glob, Grep, TodoWrite]
---

# /migrate

Run database migrations safely with preview, step control, and rollback support.

## What This Command Does

The `/migrate` command manages database schema changes through migration files. It provides:
- Forward (up) and backward (down) migration execution
- Step-by-step or full migration runs
- Dry-run preview before actual changes
- Status reporting of pending migrations
- Safe execution with transaction support

## Arguments

### Positional Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| direction | string | No | up | Migration direction: `up` or `down` |

### Named Arguments

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| --step | integer | all | Number of migrations to run |
| --to | string | - | Migrate to specific version |
| --db | string | default | Database connection name |

### Boolean Flags

| Flag | Default | Description |
|------|---------|-------------|
| --dry-run | false | Preview migrations without executing |
| --status | false | Show migration status only |
| --force | false | Force migration even if dirty |
| --verbose | false | Show detailed output |
| --help | false | Show help message |

## Workflow

### Step 1: Parse Arguments

```
Extract from $ARGUMENTS:
- direction: "up" | "down" (default: "up")
- --step: integer | "all"
- --to: version string
- --dry-run: boolean
- --status: boolean
```

### Step 2: Validate Input

```
Validations:
- direction must be "up" or "down"
- --step must be positive integer or "all"
- --to must match existing migration version
- Database connection must be valid
```

### Step 3: Execute

```
IF --status THEN
  Show current migration status
  EXIT

IF --dry-run THEN
  Show migrations that WOULD run
  Show SQL that WOULD execute
  EXIT

Run migrations:
1. Lock migration table
2. Execute each migration in transaction
3. Update migration table
4. Release lock
```

### Step 4: Format Output

```
Format results as table:
- Migration version
- Name
- Status (applied/pending/failed)
- Duration
- SQL statements (if verbose)
```

### Step 5: Report Results

```
Display:
- Summary of migrations run
- Any errors encountered
- Suggested next steps
- Rollback command if needed
```

## Examples

### Example 1: Run All Pending Migrations

```bash
/migrate
```

**What Happens**: Runs all pending migrations in order
**Output**:
```
Running migrations...

  ✓ 001_create_users_table (12ms)
  ✓ 002_add_email_index (8ms)
  ✓ 003_create_orders_table (15ms)

Applied 3 migrations in 35ms

Database is now at version: 003
```

### Example 2: Migrate Up One Step

```bash
/migrate up --step=1
```

**What Happens**: Runs only the next pending migration
**Output**:
```
Running 1 migration...

  ✓ 004_add_shipping_address (10ms)

Applied 1 migration in 10ms

Database is now at version: 004
Next pending: 005_create_products_table
```

### Example 3: Rollback Last Migration

```bash
/migrate down --step=1
```

**What Happens**: Reverts the most recently applied migration
**Output**:
```
Rolling back 1 migration...

  ↩ 004_add_shipping_address (8ms)

Rolled back 1 migration in 8ms

Database is now at version: 003
```

### Example 4: Dry Run Preview

```bash
/migrate --dry-run
```

**What Happens**: Shows what WOULD happen without making changes
**Output**:
```
DRY RUN - No changes will be made

Would apply 2 migrations:

  • 004_add_shipping_address
    SQL: ALTER TABLE users ADD COLUMN shipping_address TEXT;

  • 005_create_products_table
    SQL: CREATE TABLE products (
           id SERIAL PRIMARY KEY,
           name VARCHAR(255) NOT NULL,
           price DECIMAL(10,2)
         );

To apply: /migrate
```

### Example 5: Check Migration Status

```bash
/migrate --status
```

**What Happens**: Shows current migration state
**Output**:
```
Migration Status

  Version | Name                    | Status    | Applied At
  --------|-------------------------|-----------|-------------------
  001     | create_users_table      | Applied   | 2024-01-15 10:30
  002     | add_email_index         | Applied   | 2024-01-15 10:30
  003     | create_orders_table     | Applied   | 2024-01-16 14:22
  004     | add_shipping_address    | Pending   | -
  005     | create_products_table   | Pending   | -

Current version: 003
Pending migrations: 2
```

### Example 6: Migrate to Specific Version

```bash
/migrate --to=002
```

**What Happens**: Migrates (up or down) to reach version 002
**Output**:
```
Migrating to version 002...

Current version: 003
Target version: 002
Direction: down

  ↩ 003_create_orders_table (12ms)

Database is now at version: 002
```

### Example 7: Verbose Output

```bash
/migrate --verbose
```

**What Happens**: Shows detailed migration information
**Output**:
```
Running migrations with verbose output...

  Migration: 004_add_shipping_address
  File: migrations/004_add_shipping_address.sql
  SQL:
    ALTER TABLE users ADD COLUMN shipping_address TEXT;
  Duration: 10ms
  Status: ✓ Applied

  Migration: 005_create_products_table
  ...
```

### Example 8: Force Migration (Dirty State)

```bash
/migrate --force
```

**What Happens**: Forces migration even if previous migration failed
**Output**:
```
⚠️  Database is in dirty state (migration 003 failed previously)

Forcing migration...

  ✓ 003_create_orders_table (retry) (15ms)
  ✓ 004_add_shipping_address (10ms)

Applied 2 migrations in 25ms
Dirty state cleared.
```

### Example 9: Different Database

```bash
/migrate --db=analytics up
```

**What Happens**: Runs migrations on the analytics database
**Output**:
```
Using database: analytics

Running migrations...

  ✓ 001_create_events_table (20ms)

Applied 1 migration in 20ms
```

### Example 10: Show Help

```bash
/migrate --help
```

**What Happens**: Displays comprehensive help
**Output**:
```
/migrate - Database Migration Tool

USAGE:
  /migrate [direction] [flags]

ARGUMENTS:
  direction    up or down (default: up)

FLAGS:
  --step=N     Run N migrations
  --to=VER     Migrate to specific version
  --db=NAME    Database connection name
  --dry-run    Preview without executing
  --status     Show migration status
  --force      Force even if dirty
  --verbose    Detailed output
  --help       Show this help

EXAMPLES:
  /migrate                  Run all pending
  /migrate down --step=1    Rollback last
  /migrate --dry-run        Preview changes
  /migrate --status         Check status
```

## Error Handling

### Error: No Pending Migrations

**Message**:
```
No pending migrations found.

Database is already at latest version: 005
```
**Resolution**: Database is up to date, no action needed

### Error: Migration Failed

**Message**:
```
❌ Migration 004_add_shipping_address failed

Error: column "shipping_address" already exists

Database marked as dirty. To retry:
  /migrate --force

To rollback:
  /migrate down --step=1
```
**Resolution**: Fix migration file or use --force to retry

### Error: Invalid Direction

**Message**:
```
❌ Error: Invalid direction "sideways"

Valid directions: up, down
```
**Resolution**: Use `up` or `down`

### Error: Database Connection Failed

**Message**:
```
❌ Error: Cannot connect to database

Connection string: postgres://localhost:5432/myapp
Error: connection refused

Check:
  - Database is running
  - Connection string is correct
  - Credentials are valid
```
**Resolution**: Verify database is accessible

### Error: Migration File Not Found

**Message**:
```
❌ Error: Migration file not found

Expected: migrations/004_add_shipping_address.sql
Found migrations directory: Yes
Files in directory: 001, 002, 003

Resolution: Create missing migration file
```
**Resolution**: Add missing migration file

## Output Format

### Success
```
Running migrations...

  ✓ {version}_{name} ({duration}ms)
  ...

Applied {N} migrations in {total}ms

Database is now at version: {version}
```

### Dry Run
```
DRY RUN - No changes will be made

Would apply {N} migrations:

  • {version}_{name}
    SQL: {sql_preview}
  ...

To apply: /migrate
```

### Status
```
Migration Status

  Version | Name | Status | Applied At
  --------|------|--------|----------
  ...

Current version: {version}
Pending migrations: {count}
```

## Tips

- Always run `--dry-run` first in production
- Keep migrations small and focused
- Use transactions for safety (automatic)
- Test rollbacks before deploying
- Back up database before major migrations
- Use `--status` to verify state after deployment

---

**Version**: 1.0.0
**Status**: Production Ready
