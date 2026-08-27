import { defineConfig, devices } from '@playwright/test';

const studentId = process.env.STUDENT_ID ?? '23127075';
const timestamp = new Date().toISOString();
const findingsDir = process.env.FINDINGS_DIR ?? 'findings/latest';

export default defineConfig({
  testDir: './test/specs',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  outputDir: `${findingsDir}/test-results`,
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['html', {
      outputFolder: `${findingsDir}/playwright-report`,
      open: 'never',
      title: `HW04 Automation Testing - Run by: ${studentId} - ${timestamp}`,
    }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  metadata: {
    runBy: studentId,
    timestamp,
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'msedge',
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
