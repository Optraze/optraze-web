import { defineConfig } from 'vitest/config'

// Content contract tests do not need production Nitro/TanStack build hooks.
export default defineConfig({
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
})
