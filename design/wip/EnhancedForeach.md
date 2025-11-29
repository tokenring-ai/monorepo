# Detailed Design: Flag-Based `/foreach` Command

## Overview

The `/foreach` command will execute a prompt repeatedly over an iterable data source. The command uses flags to specify
the type of iteration and the prompt to execute.

## General Syntax

```shell script
/foreach [--type <specification>] --prompt "<prompt template>"
```

## Supported Iteration Types

### 1. **File Glob** (`--glob`)

Iterates over files matching a glob pattern.

```shell script
/foreach --glob "**/*.ts" --prompt "Add error handling to this file"
/foreach --glob "src/**/*.{js,ts}" --prompt "Check for unused imports"
```

**Options:**

- `--include-dirs` - Include directories in results (default: false)
- `--absolute` - Return absolute paths (default: true)

**Available Variables:**

- `{file}` - Full file path
- `{path}` - Directory path
- `{basename}` - File name without path
- `{ext}` - File extension
- `{content}` - File contents (auto-loaded)

**Example:**

```shell script
/foreach --glob "*.md" --prompt "Summarize {basename}: {content}"
```

---

### 2. **File List** (`--files`)

Iterates over an explicit list of files.

```shell script
/foreach --files "auth.ts,database.ts,utils.ts" --prompt "Review this code"
/foreach --files "file1.ts" "file2.ts" "file3.ts" --prompt "Refactor"
```

**Input Formats:**

- Comma-separated: `"file1.ts,file2.ts,file3.ts"`
- Space-separated multiple args: `"file1.ts" "file2.ts"`
- Mixed: Multiple `--files` flags

**Available Variables:**
Same as `--glob`

**Example:**

```shell script
/foreach --files "src/main.ts,src/app.ts" --prompt "Find TODO comments in {file}"
```

---

### 3. **Lines from File** (`--lines`)

Iterates over each line in a text file.

```shell script
/foreach --lines "todos.txt" --prompt "Create a detailed task for: {line}"
/foreach --lines "urls.txt" --prompt "Fetch and summarize content from {line}"
```

**Options:**

- `--skip-empty` - Skip empty lines (default: true)
- `--trim` - Trim whitespace from lines (default: true)
- `--filter <pattern>` - Only include lines matching regex pattern

**Available Variables:**

- `{line}` - The line content
- `{lineNumber}` - Line number (1-indexed)
- `{file}` - Source file path
- `{totalLines}` - Total number of lines being processed

**Example:**

```shell script
/foreach --lines "users.txt" --skip-empty --prompt "Generate profile for user: {line} (#{lineNumber})"
```

---

### 4. **SQL Query** (`--sql`)

Iterates over rows returned from a SQL query.

```shell script
/foreach --sql "SELECT * FROM users WHERE active=true" --prompt "Generate report for {row.name}"
/foreach --sql "SELECT id, title FROM tasks" --db "./data.db" --prompt "Analyze task #{row.id}: {row.title}"
```

**Options:**

- `--db <path>` - Database connection string/path (default: from config)
- `--db-type <type>` - Database type: sqlite, postgres, mysql (default: sqlite)
- `--params <json>` - Query parameters for parameterized queries

**Available Variables:**

- `{row}` - Full row as JSON object
- `{row.columnName}` - Individual column values
- `{rowNumber}` - Row number (1-indexed)
- `{totalRows}` - Total number of rows
- `{json}` - Row as JSON string

**Example:**

```shell script
/foreach --sql "SELECT * FROM issues WHERE status='open'" \
         --db "./project.db" \
         --prompt "Triage issue #{row.id}: {row.title}\nDescription: {row.description}"
```

**Parameterized Queries:**

```shell script
/foreach --sql "SELECT * FROM users WHERE age > :minAge" \
         --params '{"minAge": 18}' \
         --prompt "Process user: {row.name}"
```

---

### 5. **Standard Input** (`--stdin`)

Iterates over lines from standard input (for piping).

```shell script
cat issues.txt | agent /foreach --stdin --prompt "Categorize: {line}"
echo -e "task1\ntask2\ntask3" | agent /foreach --stdin --prompt "Complete: {line}"
```

**Options:**

- `--skip-empty` - Skip empty lines (default: true)
- `--trim` - Trim whitespace (default: true)

**Available Variables:**
Same as `--lines` (except `{file}`)

---

### 6. **JSON Array** (`--json`)

Iterates over elements in a JSON array.

```shell script
/foreach --json '[{"name":"Alice","age":30},{"name":"Bob","age":25}]' \
         --prompt "Create profile for {item.name}, age {item.age}"

/foreach --json-file "data.json" --prompt "Process: {item}"
```

**Options:**

- `--json <string>` - Inline JSON array
- `--json-file <path>` - Read JSON from file
- `--path <jsonpath>` - JSONPath to extract array from nested structure

**Available Variables:**

- `{item}` - Current array element as JSON
- `{item.property}` - Access object properties
- `{index}` - Array index (0-indexed)
- `{length}` - Total array length

**Example:**

```shell script
/foreach --json-file "users.json" \
         --path "$.data.users" \
         --prompt "Email {item.name} about {item.pending_tasks} pending tasks"
```

---

## Prompt Template (`--prompt`)

The prompt template supports variable interpolation and can be multi-line.

### Variable Syntax:

- `{variable}` - Simple interpolation
- `{object.property}` - Nested property access
- `{variable:default}` - Default value if undefined

### Examples:

```shell script
# Simple variable
--prompt "Process {file}"

# Nested properties
--prompt "User {row.id}: {row.name} ({row.email})"

# Multi-line (using quotes)
--prompt "
File: {file}
Task: Review this code and suggest improvements
Focus on: security, performance, readability
"

# With defaults
--prompt "Process {name:Unknown User}"
```

---

## Additional Flags

### Execution Control

```shell script
--continue-on-error    # Don't stop if one iteration fails (default: true)
--fail-fast           # Stop on first error (default: false)
--parallel <n>        # Run n iterations in parallel (default: 1, sequential)
--max-items <n>       # Limit number of items to process
--delay <ms>          # Delay between iterations (default: 0)
```

### Output Control

```shell script
--quiet               # Suppress iteration info messages
--verbose             # Show detailed progress
--output <file>       # Write results to file
--format <type>       # Output format: text, json, csv (default: text)
--separator <string>  # Separator between results (default: "\n---\n")
```

### Context Control

```shell script
--preserve-context    # Keep conversation context between iterations (default: false)
--reset-context       # Reset context after each iteration (default: true)
--checkpoint          # Create checkpoint before starting (default: true)
```

---

## Complete Examples

### Example 1: Code Review All TypeScript Files

```shell script
/foreach --glob "src/**/*.ts" \
         --continue-on-error \
         --prompt "Review {file} for:
1. Type safety issues
2. Potential bugs
3. Performance concerns

Code:
{content}"
```

### Example 2: Process TODO List Line by Line

```shell script
/foreach --lines "sprint-backlog.txt" \
         --skip-empty \
         --prompt "Create a detailed implementation plan for task #{lineNumber}: {line}
Include: requirements, approach, tests, estimated time"
```

### Example 3: Generate Reports from Database

```shell script
/foreach --sql "SELECT * FROM monthly_sales WHERE year=2024" \
         --db "./sales.db" \
         --prompt "Generate executive summary for {row.month} {row.year}:
Revenue: ${row.revenue}
Units: {row.units_sold}
Growth: {row.growth_percent}%"
```

### Example 4: Process JSON API Response

```shell script
/foreach --json-file "api-response.json" \
         --path "$.data.items" \
         --format json \
         --output "results.json" \
         --prompt "Analyze product {item.id}: {item.name}
Price: ${item.price}
Rating: {item.rating}/5"
```

### Example 5: Batch File Processing with Parallel Execution

```shell script
/foreach --glob "images/**/*.jpg" \
         --parallel 5 \
         --max-items 100 \
         --prompt "Generate alt text for image {basename}"
```

### Example 6: Process Multiple Files with Context

```shell script
/foreach --files "api.ts,types.ts,utils.ts" \
         --preserve-context \
         --prompt "Analyze {file} for API consistency with previously reviewed files"
```

---

## Default Behaviors

When flags are omitted:

1. **No type flag specified**: Treated as `--glob` if first argument looks like a pattern, otherwise error
2. **No prompt flag**: Last argument is treated as prompt
3. **Short syntax fallback**: `/foreach <pattern> <prompt>` → `--glob "<pattern>" --prompt "<prompt>"`

### Backward Compatibility:

```shell script
# Old syntax (still works)
/foreach *.ts "add comments"

# Equivalent to:
/foreach --glob "*.ts" --prompt "add comments"
```

---

## Error Handling

### Validation Errors:

- Missing required flags
- Invalid flag combinations (e.g., `--glob` and `--sql` together)
- Invalid file paths
- SQL connection errors
- Malformed JSON

### Runtime Errors:

- File read errors
- SQL query errors
- Prompt execution errors
- Variable interpolation errors

### Behavior:

- By default, errors are logged and iteration continues (`--continue-on-error`)
- Use `--fail-fast` to stop on first error
- Final summary shows success/failure count

---

## Implementation Notes

### Parsing Strategy:

1. Parse all flags into a configuration object
2. Validate flag combinations (only one iteration type allowed)
3. Resolve the iterable (files, lines, rows, etc.)
4. Create checkpoint if needed
5. Iterate and interpolate prompt template for each item
6. Execute prompt with agent
7. Handle context preservation/reset
8. Restore checkpoint when complete

### Variable Interpolation:

```typescript
function interpolate(template: string, variables: Record<string, any>): string {
  return template.replace(/\{([^}:]+)(?::([^}]*))?\}/g, (match, key, defaultValue) => {
    const value = getNestedProperty(variables, key);
    return value !== undefined ? String(value) : (defaultValue || match);
  });
}
```

---

## Future Enhancements

Possible additions:

- `--csv <file>` - Iterate over CSV rows
- `--xml <file>` --xpath - Iterate over XML nodes
- `--yaml <file>` - Iterate over YAML arrays
- `--http <url>` - Iterate over HTTP streamed responses
- `--git-diff` - Iterate over changed files in git
- `--watch` - Watch for changes and re-run
- Custom iterators via plugins
