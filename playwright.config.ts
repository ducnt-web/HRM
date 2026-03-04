import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: 'html',
  use: {
    headless: true,
    trace: 'on-first-retry',
  },
});