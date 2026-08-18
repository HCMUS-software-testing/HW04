import { test, expect } from '@playwright/test';
import testData from './data/poolA-fr03-forgot-password.json';

test.describe('FR-03: Forgot Password & Password Reset (Pool A)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to forgot password page
    await page.goto('/forgot-password');
  });

  for (const tc of testData) {
    test(`${tc.id}: ${tc.title}`, async ({ page }) => {
      if (tc.step === 1) {
        // Step 1: Request OTP
        const emailInput = page.getByPlaceholder(/email/i).or(page.getByLabel(/email/i));
        
        if (tc.email !== '') {
          await emailInput.fill(tc.email);
        } else {
          await emailInput.clear();
        }

        const submitBtn = page.getByRole('button', { name: /yêu cầu otp|gửi|submit/i });
        await submitBtn.click();

        // Assertion Patterns used:
        if (tc.assertionPattern === 'validationMessage') {
          // 1. Form / Control State Assertion (HTML5 Validation or Input State)
          const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
          expect(validationMessage).toBeTruthy();
        } else if (tc.assertionPattern === 'visibleText') {
          // 2. Visible Text / Notification Message Assertion
          const messageElement = page.getByText(new RegExp(tc.expectedMessage, 'i')).or(page.locator('.alert, .message, .error, .toast'));
          await expect(messageElement).toBeVisible();
        }
      } else if (tc.step === 2) {
        // Step 2: Reset Password with OTP
        // First navigate or proceed to Step 2 form if needed
        const emailInput = page.getByPlaceholder(/email/i).or(page.getByLabel(/email/i));
        if (await emailInput.isVisible()) {
          await emailInput.fill(tc.email);
          const requestOtpBtn = page.getByRole('button', { name: /yêu cầu otp|gửi|submit/i });
          await requestOtpBtn.click();
        }

        // Fill OTP
        const otpInput = page.getByPlaceholder(/otp|mã/i).or(page.getByLabel(/otp|mã/i));
        await otpInput.fill(tc.otp);

        // Fill New Password
        const newPasswordInput = page.getByPlaceholder(/mật khẩu mới|new password/i).or(page.getByLabel(/mật khẩu mới|new password/i));
        await newPasswordInput.fill(tc.newPassword);

        // Fill Confirm Password if field exists
        const confirmPasswordInput = page.getByPlaceholder(/xác nhận mật khẩu|confirm password/i).or(page.getByLabel(/xác nhận mật khẩu|confirm password/i));
        if (await confirmPasswordInput.isVisible()) {
          await confirmPasswordInput.fill(tc.confirmPassword);
        }

        const resetBtn = page.getByRole('button', { name: /đặt lại mật khẩu|reset password|xác nhận/i });
        await resetBtn.click();

        // Assertion Pattern used:
        if (tc.assertionPattern === 'urlState') {
          // 3. URL / Navigation State Assertion
          await expect(page).toHaveURL(/login|success|reset-success/i);
        } else {
          // Fallback Visible Text Assertion
          const messageElement = page.getByText(new RegExp(tc.expectedMessage, 'i'));
          await expect(messageElement).toBeVisible();
        }
      }
    });
  }
});
