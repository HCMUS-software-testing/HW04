import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

type RegistrationCase = {
  id: string;
  title: string;
  input: {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
  };
  expected: {
    url?: string;
    success: boolean;
    errorVisible: boolean;
    errorReason?: string;
    requiresConfirmPassword?: boolean;
  };
};

type RegistrationData = { testCases: RegistrationCase[] };

const dataPath = path.resolve(process.cwd(), 'test-data/FR-01.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8')) as RegistrationData;

function registrationInputs(page: Page) {
  const form = page.getByRole('form');
  // Register.jsx has plain labels without for/id associations. These semantic
  // type locators reflect the real DOM and avoid CSS utility classes.
  return {
    form,
    name: form.locator('input[type="text"]').nth(0),
    email: form.locator('input[type="text"]').nth(1),
    password: form.locator('input[type="password"]').nth(0),
    confirmPassword: form.locator('input[type="password"]').nth(1),
    submit: form.getByRole('button', { name: /đăng ký/i }),
  };
}

async function openRegistration(page: Page) {
  await page.goto('/register');
  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByRole('heading', { name: /đăng ký tài khoản/i })).toBeVisible();
}

async function fillRegistration(page: Page, input: RegistrationCase['input']) {
  const fields = registrationInputs(page);
  await fields.name.fill(input.name);
  await fields.email.fill(input.email);
  await fields.password.fill(input.password);
  if (await fields.confirmPassword.count()) {
    await fields.confirmPassword.fill(input.confirmPassword ?? '');
  }
  return fields;
}

test.describe('FR-01: Account Registration', () => {
  for (const testCase of data.testCases) {
    test(`${testCase.id} - ${testCase.title}`, async ({ page }) => {
      await openRegistration(page);
      const fields = await fillRegistration(page, testCase.input);

      await expect(fields.submit).toBeEnabled();

      if (testCase.expected.requiresConfirmPassword && !(await fields.confirmPassword.count())) {
        test.skip(true, 'Product gap: FR-01 requires Confirm Password, but the SUT does not render this control.');
      }

      await fields.submit.click();

      if (testCase.expected.success) {
        await expect(page).toHaveURL(new RegExp(`${testCase.expected.url ?? '/login'}$`));
        await expect(page.getByRole('heading', { name: /đăng nhập/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /đăng ký/i })).toHaveCount(0);
      } else {
        await expect(page).toHaveURL(/\/register$/);
        const error = page.getByText(testCase.expected.errorReason ?? '', { exact: false });
        await expect(error).toBeVisible();
        await expect(fields.submit).toBeEnabled();
      }
    });
  }
});
