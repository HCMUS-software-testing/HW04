import { expect, Page } from '@playwright/test';

/**
 * Navigate to the EShop home page.
 */
export async function gotoHome(page: Page) {
  await page.goto('/');
  await expect(page).toHaveURL(/./);
}

/**
 * Navigate to the registration page.
 */
export async function gotoRegister(page: Page) {
  await page.goto('/register');
}

/**
 * Log in with the given credentials.
 */
export async function login(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/mật khẩu|password/i).fill(password);
  await page.getByRole('button', { name: /đăng nhập|login/i }).click();
}

/**
 * Log in as admin using the default admin credentials.
 */
export async function loginAsAdmin(page: Page) {
  await login(page, 'admin@eshop.com', 'Admin123!');
}

/**
 * Assert that a given text is visible on the page.
 */
export async function expectVisibleText(page: Page, text: RegExp | string) {
  await expect(page.getByText(text)).toBeVisible();
}

/**
 * Assert that a given text is NOT visible on the page.
 */
export async function expectTextNotVisible(page: Page, text: RegExp | string) {
  await expect(page.getByText(text)).not.toBeVisible();
}
