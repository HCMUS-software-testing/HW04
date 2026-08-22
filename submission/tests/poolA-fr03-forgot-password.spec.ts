import { test, expect } from '@playwright/test';
import testData from './data/poolA-fr03-forgot-password.json';

const studentId = process.env.STUDENT_ID || '23127185';
const timestamp = process.env.RUN_TIMESTAMP || new Date().toISOString();

test.describe(`FR-03: Forgot Password & Password Reset (Pool A) | Run by: ${studentId} | Timestamp: ${timestamp}`, () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to forgot password page
    await page.goto('/forgot-password');
  });

  for (const tc of testData) {
    test(`${tc.id}: ${tc.title}`, async ({ page }) => {
      // Set up dialog listener to capture alerts
      let dialogMessage = '';
      page.on('dialog', async (dialog) => {
        dialogMessage = dialog.message();
        await dialog.dismiss();
      });

      if (tc.step === 1) {
        // Step 1: Request OTP
        const emailInput = page.locator('input[type="text"]').first();

        if (tc.email !== '') {
          await emailInput.fill(tc.email);
        } else {
          await emailInput.clear();
        }

        const submitBtn = page.getByRole('button', { name: /lấy mã otp|yêu cầu otp|gửi|submit/i });
        await submitBtn.click();

        // Assertion Patterns used:
        if (tc.assertionPattern === 'validationMessage' || tc.id === 'TC3') {
          // 1. Form / Control State Assertion (HTML5 Validation or Input State)
          const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
          expect(validationMessage).toBeTruthy();
        } else if (tc.assertionPattern === 'visibleText') {
          // 2. Visible Text / Notification Message Assertion (Dialog or Page Alert or OTP banner)
          if (dialogMessage) {
            expect(dialogMessage).toMatch(/lỗi|mã otp|không hợp lệ|chưa được đăng ký/i);
          } else {
            const messageElement = page.getByText(new RegExp(tc.expectedMessage, 'i'))
              .or(page.locator('div:has-text("Mã OTP của bạn là:")'))
              .or(page.locator('.alert, .message, .error, .toast')).first();

            await expect(messageElement).toBeVisible();

            // TC1: Bổ sung kiểm tra OTP phải đủ 6 chữ số (BUG-002)
            if (tc.id === 'TC1') {
              const otpBanner = page.locator('div:has-text("Mã OTP của bạn là:")').first();
              const bannerText = await otpBanner.innerText();
              const otpMatch = bannerText.match(/(\d+)/);
              expect(otpMatch, 'OTP phải được hiển thị dạng số').toBeTruthy();
              expect(otpMatch![1].length, 'OTP phải có đúng 6 chữ số').toBe(6);
            }
          }
        }
      } else if (tc.step === 2) {
        // Step 2: Reset Password with OTP
        const emailInput = page.locator('input[type="text"]').first();
        if (await emailInput.isVisible()) {
          await emailInput.fill(tc.email);
          const requestOtpBtn = page.getByRole('button', { name: /lấy mã otp|yêu cầu otp|gửi|submit/i });
          await requestOtpBtn.click();
        }

        // Extract reset token from Step 2 message if available
        let tokenToUse = tc.otp;
        const messageBox = page.locator('div:has-text("Mã OTP của bạn là:")').first();
        if (await messageBox.isVisible()) {
          const msgText = await messageBox.innerText();
          const match = msgText.match(/Mã OTP của bạn là:\s*(\w+)/);
          if (match && match[1]) {
            tokenToUse = match[1];
          }
        }

        // Fill OTP
        const otpInput = page.locator('input[type="text"]').first();
        await otpInput.fill(tokenToUse);

        // Fill New Password
        const newPasswordInput = page.locator('input[type="password"]').first();
        await newPasswordInput.fill(tc.newPassword);

        // Fill Confirm Password if field exists
        const confirmPasswordInput = page.getByPlaceholder(/xác nhận mật khẩu|confirm password/i).or(page.getByLabel(/xác nhận mật khẩu|confirm password/i));
        // Assert trường Xác nhận mật khẩu phải tồn tại (SUT BUG-001: thiếu trường này)
        await expect(confirmPasswordInput).toBeVisible({ timeout: 3000 });
        await confirmPasswordInput.fill(tc.confirmPassword);

        const resetBtn = page.getByRole('button', { name: /đặt lại mật khẩu|reset password|xác nhận/i });
        await resetBtn.click();

        // Assertion Pattern used:
        if (tc.assertionPattern === 'urlState') {
          // Expect navigation to login page on successful reset
          await expect(page).toHaveURL(/login|reset-success/i, { timeout: 3000 });
        } else {
          // Expect visible success message
          const messageElement = page.getByText(new RegExp(tc.expectedMessage, 'i')).first();
          await expect(messageElement).toBeVisible({ timeout: 3000 });
        }
      }
    });
  }
});
