# Vitest to Bun Test Migration Plan

## Overview

This document outlines the plan to migrate the entire TokenRing codebase from Vitest to Bun's built-in test runner. The project currently uses vitest across ~70 packages with ~111 test files. Since the app depends on Bun-native features, all tests already function under `bun test`, making this migration straightforward.

## Scope

- **75 vitest.config.ts files** to delete
- **~70 package.json files** to update
- **~111 test files** (*.test.ts, *.test.tsx) to update
- **1 root package.json** to update
- **1 frontend setup file** to update
- **~50+ documentation files** to update (Phase 8)

## Vitest Features Currently in Use

| Feature | Vitest API | Bun Test Equivalent | Count |
|---------|------------|---------------------|-------|
| Core APIs | `describe`, `it`, `expect`, `beforeEach`, `afterEach` | Same | ~111 files |
| Mock functions | `vi.fn()` | `mock.fn()` | ~100+ files |
| Module mocking | `vi.mock("module", factory)` | `mock.module("module", factory)` | ~30 files |
| Spy on methods | `vi.spyOn(obj, "method")` | `mock.spyOn(obj, "method")` | ~50 files |
| Mock type assertion | `vi.mocked(fn)` | `fn` (types carried automatically) | ~20 files |
| Mock cleanup | `vi.clearAllMocks()` | `mock.clearAllMocks()` | 72 files |
| Fake timers | `vi.useFakeTimers()` | `mock.useFakeTimers()` | 9 files |
| Timer advancement | `vi.advanceTimersByTime(ms)` | `mock.advanceTimersByTime(ms)` | 9 files |
| Test modifiers | `it.skip()`, `describe.skip()` | Same | 6 files |
| Matchers | `toEqual`, `toThrow`, `toHaveLength`, etc. | Same | ~530 files |
| Setup files | `setupFiles` in config | `preload` in bunfig.toml | 1 file |
| Environment | `jsdom` for React tests | `jsdom` (auto-detected for .tsx) | 8 files |

---

## Phase 1: Update Script Configuration

### 1.1 Modify `scripts/generate-package-files.ts`

✅ **COMPLETED** - Updated to use bun test instead of vitest

### 1.2 Delete `scripts/boilerplate/vitest.config.ts`

✅ **COMPLETED** - Created bun.config.ts instead

### 1.3 Run the Updated Script

✅ **COMPLETED** - Successfully updated all package.json files

### 1.4 Remove vitest.config.ts files

✅ **COMPLETED** - All vitest.config.ts files removed from packages and root

---

## Phase 2: Remove Vitest Dependencies

### 2.1 Remove vitest from root package.json

✅ **COMPLETED** - vitest devDependency removed

### 2.2 Remove vitest from workspace packages

✅ **COMPLETED** - Script automatically handles this (no vitest in devDependencies)

---

### 2.2 Handle Special Cases Manually

#### `frontend/one/package.json`

```json
{
  "devDependencies": {
    // REMOVE: "vitest": "^4.1.1"
    // REMOVE: "@vitest/coverage-v8": "^4.1.1"
    // KEEP: "@testing-library/jest-dom", "@testing-library/react", "jsdom"
  },
  "scripts": {
    "test": "bun test",
    "test:watch": "bun test --watch",
    "test:coverage": "bun test --coverage"
  }
}
```

**Status:** [ ]

#### `pkg/tasks/package.json`

Has additional test scripts:
```json
{
  "scripts": {
    "test": "bun test",
    "test:run": "bun test",
    "test:watch": "bun test --watch",
    "test:coverage": "bun test --coverage"
    // REMOVE: "test:ui" (not available in bun test)
  }
}
```

**Status:** [ ]

#### Packages with Custom Test Scripts

`pkg/filesystem`, `pkg/ghost-io`:
```json
{
  "scripts": {
    "test": "bun test",
    "test:integration": "bun test bash.integration.test.ts",
    "test:e2e": "bun test bash.e2e.test.ts",
    "test:all": "bun test && node test/integration-runner.ts",
    "test:coverage": "bun test --coverage"
  }
}
```

**Status:** [ ]

---

## Phase 3: Delete Vitest Configuration Files

Delete all 75 `vitest.config.ts` files:

```bash
# Packages
find pkg -name "vitest.config.ts" -delete

# Frontend
rm frontend/one/vitest.config.ts

# App
rm app/one/vitest.config.ts
```

**Status:** [ ]

---

## Phase 4: Update Root package.json

Remove vitest from root devDependencies:

```json
{
  "devDependencies": {
    // REMOVE: "vitest": "^4.1.9"
  }
}
```

**Status:** [ ]

---

## Phase 5: Update Test File Imports

### 5.1 Update Imports (Bulk Operation)

For all ~111 test files, replace:

```typescript
// FROM:
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

// TO:
import { describe, expect, it, beforeEach, afterEach, mock } from "bun:test";
```

**Variations to handle:**
- Some files import only subset: `import { describe, expect, it } from "vitest";`
- Some files have additional imports: `import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";`

**Status:** [ ]

### 5.2 Update API Calls (Bulk Operation)

| Old (Vitest) | New (Bun Test) |
|--------------|----------------|
| `vi.fn()` | `mock.fn()` |
| `vi.mock("module", factory)` | `mock.module("module", factory)` |
| `vi.spyOn(obj, "method")` | `mock.spyOn(obj, "method")` |
| `vi.mocked(fn)` | `fn` (mocks carry types automatically) |
| `vi.clearAllMocks()` | `mock.clearAllMocks()` |
| `vi.useFakeTimers()` | `mock.useFakeTimers()` |
| `vi.useRealTimers()` | `mock.useRealTimers()` |
| `vi.advanceTimersByTime(ms)` | `mock.advanceTimersByTime(ms)` |
| `vi.advanceTimersByTimeAsync(ms)` | `mock.advanceTimersByTimeAsync(ms)` |
| `// @vitest-environment node` | `// @bun-environment node` |

**Status:** [ ]

### 5.3 Update Frontend Setup File

`frontend/one/src/test/setup.ts`:

```typescript
// FROM:
import "@testing-library/jest-dom/vitest";

// TO:
import "@testing-library/jest-dom";
```

**Status:** [ ]

---

## Phase 6: Create Frontend Bun Test Configuration

Create `frontend/one/bunfig.toml`:

```toml
[test]
preload = ["./src/test/setup.ts"]
```

This explicitly configures the setup file for frontend tests.

**Status:** [ ]

---

## Phase 7: Verification

### 7.1 Run All Tests

```bash
bun test
```

**Status:** [ ]

### 7.2 Run with Coverage

```bash
bun test --coverage
```

**Status:** [ ]

### 7.3 Run Specific Package Tests

```bash
bun test pkg/google/test/
bun test pkg/template/tests/
```

**Status:** [ ]

### 7.4 Run Frontend Tests

```bash
cd frontend/one && bun test
```

**Status:** [ ]

### 7.5 Fix Any Failures

Address any test failures that arise from the migration.

**Status:** [ ]

---

## Phase 8: Documentation Updates

Update all documentation files to reference bun test instead of vitest:

- Replace "vitest" with "bun test"
- Update test commands (`vitest run` → `bun test`)
- Update code examples in docs
- Update README files in each package

**Files to update:**
- `docs/docs/plugins/*.md` (~50 files)
- `pkg/*/README.md` (~70 files)

**Status:** [ ]

---

## API Reference: Vitest to Bun Test

### Imports

```typescript
// Vitest
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Bun Test
import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
```

### Mocking

| Purpose | Vitest | Bun Test |
|---------|--------|----------|
| Create mock function | `vi.fn()` | `mock.fn()` |
| Mock module | `vi.mock("module", factory)` | `mock.module("module", factory)` |
| Spy on method | `vi.spyOn(obj, "method")` | `mock.spyOn(obj, "method")` |
| Clear all mocks | `vi.clearAllMocks()` | `mock.clearAllMocks()` |
| Type-safe mock access | `vi.mocked(fn)` | `fn` (types carried) |

### Timers

| Purpose | Vitest | Bun Test |
|---------|--------|----------|
| Use fake timers | `vi.useFakeTimers()` | `mock.useFakeTimers()` |
| Use real timers | `vi.useRealTimers()` | `mock.useRealTimers()` |
| Advance timers | `vi.advanceTimersByTime(ms)` | `mock.advanceTimersByTime(ms)` |
| Advance timers async | `vi.advanceTimersByTimeAsync(ms)` | `mock.advanceTimersByTimeAsync(ms)` |

### Environment

```typescript
// Vitest - per-file environment override
// @vitest-environment node

// Bun Test - per-file environment override
// @bun-environment node
```

---

## Evaluation Criteria

The migration is considered complete when all of the following criteria are met:

### ✅ Configuration Files

- [ ] All 75 `vitest.config.ts` files have been deleted
- [ ] `scripts/boilerplate/vitest.config.ts` has been deleted
- [ ] `scripts/generate-package-files.ts` has been updated to use bun test
- [ ] `frontend/one/bunfig.toml` has been created

### ✅ Package Dependencies

- [ ] Root `package.json` no longer lists vitest in devDependencies
- [ ] All package `package.json` files no longer list vitest in devDependencies
- [ ] All package `package.json` files no longer list @vitest/coverage-v8 in devDependencies
- [ ] All test scripts use `bun test` instead of `vitest run`
- [ ] All test:watch scripts use `bun test --watch` instead of `vitest`
- [ ] All test:coverage scripts use `bun test --coverage` instead of `vitest run --coverage`
- [ ] `test:ui` scripts have been removed from all packages

### ✅ Test Files

- [ ] All ~111 test files import from `"bun:test"` instead of `"vitest"`
- [ ] All `vi.fn()` calls have been replaced with `mock.fn()`
- [ ] All `vi.mock()` calls have been replaced with `mock.module()`
- [ ] All `vi.spyOn()` calls have been replaced with `mock.spyOn()`
- [ ] All `vi.mocked()` calls have been removed (types carried automatically)
- [ ] All `vi.clearAllMocks()` calls have been replaced with `mock.clearAllMocks()`
- [ ] All `vi.useFakeTimers()` calls have been replaced with `mock.useFakeTimers()`
- [ ] All `vi.advanceTimersByTime()` calls have been replaced with `mock.advanceTimersByTime()`
- [ ] All `// @vitest-environment node` comments have been updated to `// @bun-environment node`

### ✅ Frontend Tests

- [ ] `frontend/one/src/test/setup.ts` imports from `@testing-library/jest-dom` (not `/vitest`)
- [ ] All frontend test files import from `"bun:test"` instead of `"vitest"`
- [ ] Frontend tests run successfully with `bun test`

### ✅ Test Execution

- [ ] `bun test` runs successfully with no errors
- [ ] All existing tests pass (no test failures from migration)
- [ ] `bun test --coverage` generates coverage reports
- [ ] `bun test --watch` works correctly

### ✅ Documentation (Phase 8)

- [ ] All README files reference bun test instead of vitest
- [ ] All documentation files in `docs/docs/plugins/` reference bun test
- [ ] All code examples in documentation use bun test syntax

---

## Notes

### Bun Test Coverage

Bun test coverage outputs to `coverage/` directory by default with text and/or lcov formats:

```bash
bun test --coverage              # Text report (default)
bun test --coverage --reporter=lcov  # LCOV report
```

### Test Discovery

Bun test auto-discovers files matching:
- `*.test.ts`
- `*.test.tsx`
- `*.spec.ts`
- `*.spec.tsx`
- `test/**/*`
- `tests/**/*`

No configuration file is needed for basic test discovery.

### Environment Detection

Bun test automatically uses:
- **node environment** for `.ts` files
- **jsdom environment** for `.tsx` files (React components)

For explicit node environment in `.tsx` files, use:
```typescript
// @bun-environment node
```

---

## Timeline

| Phase | Description | Estimated Time |
|-------|-------------|----------------|
| 1 | Update script configuration | 15 min |
| 2 | Update package.json files | 10 min |
| 3 | Delete vitest.config.ts files | 5 min |
| 4 | Update root package.json | 5 min |
| 5 | Update test file imports | 30 min (bulk operations) |
| 6 | Create frontend config | 5 min |
| 7 | Verification and fixes | 30-60 min |
| 8 | Documentation updates | 60 min |

**Total Estimated Time:** 2.5 - 3 hours

---

## Rollback Plan

If issues arise during migration, rollback by:

1. Restore vitest.config.ts files from git
2. Restore package.json files from git
3. Restore test file imports from git
4. Reinstall vitest: `bun install`

---

## Related Files

- `scripts/generate-package-files.ts` - Script to automate package.json updates
- `scripts/boilerplate/` - Boilerplate files for packages
- `pkg/*/vitest.config.ts` - Vitest configuration (to be deleted)
- `pkg/*/package.json` - Package configurations (to be updated)
- `pkg/**/*.test.ts` - Test files (to be updated)
- `frontend/one/vitest.config.ts` - Frontend vitest config (to be deleted)
- `frontend/one/src/test/setup.ts` - Frontend test setup (to be updated)