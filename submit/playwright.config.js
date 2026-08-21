const { defineConfig, devices } = require("@playwright/test");

const studentId = "23127326";
const runTimestamp = process.env.HW04_RUN_TIMESTAMP || new Date().toISOString();

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
        title: `HW04 Automation - Run by: ${studentId} - ${runTimestamp}`,
      },
    ],
  ],
  metadata: {
    studentId,
    runBy: `Run by: ${studentId}`,
    runTimestamp,
    sut: "eshop-sut",
    backendUrl: "http://localhost:3000",
    webUrl: "http://localhost:5173",
    adminUrl: "http://localhost:5174",
  },
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  outputDir: "test-results",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
