import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const findingsDir = process.env.FINDINGS_DIR || 'findings/fr01-local';
const baseURL = process.env.BASE_URL || 'http://localhost:5173';

export default defineConfig({
  testDir: './test',
  fullyParallel: false,
  workers: 1,
  timeout: 15_000,
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'msedge',
        ...(process.env.EDGE_EXECUTABLE_PATH
          ? { executablePath: process.env.EDGE_EXECUTABLE_PATH }
          : {}),
      },
    },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
  reporter: [
    ['list'],
    ['html', {
      outputFolder: path.resolve(findingsDir, 'playwright-report'),
      open: 'never',
      title: `FR-01 | Run by: ${process.env.STUDENT_ID || 'unspecified'} | ${new Date().toISOString()}`,
    }],
  ],
  outputDir: path.resolve(findingsDir, 'test-results'),
});
