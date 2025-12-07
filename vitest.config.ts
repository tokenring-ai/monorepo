import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      'pkg/*/vitest.config.ts',
      "app/*/vitest.config.ts",
    ],
  },
})
