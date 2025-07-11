import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.{ts,tsx}', 'src/**/*.tests.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
});
