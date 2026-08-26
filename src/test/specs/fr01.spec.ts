import { test, expect } from '@playwright/test';
import { gotoRegister } from '../helpers/eshop';
import testData from '../test-data/FR-01.json';

// Type definition matching FR-01.json structure
interface RegistrationTestCase {
  id: string;
  description: string;
  category: 'positive' | 'negative' | 'edge';
  input: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  expected: {
    success: boolean;
    redirectUrl?: string;
    message?: string;
    errorMessage?: string;
  };
}

const cases = testData.testCases as RegistrationTestCase[];

test.describe('FR-01: Account Registration', () => {
  test.describe.configure({ mode: 'serial' });

  for (const tc of cases) {
    test(`${tc.id} - ${tc.description}`, async ({ page }) => {
      await gotoRegister(page);

      // ──────────────────────────────────────────────────────
      // Fill form fields
      // ──────────────────────────────────────────────────────
      // Register.jsx renders three unlabeled textboxes in this stable order:
      // name, email, and password. The visible labels are not associated
      // with their inputs through for/id, so getByLabel() cannot be used.
      const textboxes = page.getByRole('textbox');
      const nameInput = textboxes.nth(0);
      const emailInput = textboxes.nth(1);
      const passwordInput = textboxes.nth(2);

      await nameInput.fill(tc.input.name);
      await emailInput.fill(tc.input.email);
      await passwordInput.fill(tc.input.password);

      // ──────────────────────────────────────────────────────
      // Submit the form
      // ──────────────────────────────────────────────────────
      await page.getByRole('button', { name: /đăng ký/i }).click();

      // ──────────────────────────────────────────────────────
      // ASSERTION PATTERN 1: URL Assertion
      // ──────────────────────────────────────────────────────
      if (tc.expected.success && tc.expected.redirectUrl) {
        // Spec: after successful registration, user is redirected to Login page
        await expect(page).toHaveURL(new RegExp(tc.expected.redirectUrl), {
          timeout: 10_000,
        });
      } else if (!tc.expected.success) {
        // On failure, user should remain on the registration page
        await expect(page).toHaveURL(/register/i);
      }

      // ──────────────────────────────────────────────────────
      // ASSERTION PATTERN 2: Visible Text Assertion
      // ──────────────────────────────────────────────────────
      if (tc.expected.errorMessage) {
        // Error message should be visible on the page
        const errorDiv = page.locator('.bg-red-100.text-red-700');
        await expect(errorDiv).toBeVisible({ timeout: 5_000 });
        await expect(errorDiv).toContainText(tc.expected.errorMessage);
      }

      // ──────────────────────────────────────────────────────
      // ASSERTION PATTERN 3: Control State Assertion
      // ──────────────────────────────────────────────────────
      if (!tc.expected.success) {
        // On failed registration, form controls should still be editable
        // (user can correct their input and re-submit)
        await expect(nameInput).toBeEditable();
        await expect(emailInput).toBeEditable();
        await expect(passwordInput).toBeEditable();
        // Submit button should still be enabled
        await expect(page.getByRole('button', { name: /đăng ký/i })).toBeEnabled();
      }
    });
  }
});
