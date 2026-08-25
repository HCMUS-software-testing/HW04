import { defineConfig, devices } from '@playwright/test';

const studentId = process.env.STUDENT_ID ?? '23127075';
const timestamp = new Date().toISOString();

export default defineConfig({
  testDir: './test/specs',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
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
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
