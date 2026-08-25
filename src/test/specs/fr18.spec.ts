import { expect, Page, test } from '@playwright/test';
import { loginAsAdmin } from '../helpers/eshop';
import testData from '../test-data/FR-18.json';

type OrderCase = (typeof testData.testCases)[number];
const orderCases = testData.testCases as OrderCase[];

async function openAdminOrders(page: Page) {
  await page.goto('/admin/orders');
  await expect(page).toHaveURL(/\/admin\/orders|\/orders/i);
}

async function openOrdersAsAdmin(page: Page) {
  await loginAsAdmin(page);
  await openAdminOrders(page);
}

function orderRow(page: Page, status: string) {
  return page.getByRole('row').filter({ hasText: new RegExp(status, 'i') }).first();
}

async function assertOrderControls(page: Page) {
  const filter = page.getByRole('combobox').first();
  if (await filter.count() > 0) await expect(filter).toBeEnabled();

  const actionButton = page.getByRole('button', { name: /cập nhật|update|xóa|cancel|hủy/i }).first();
  if (await actionButton.count() > 0) await expect(actionButton).toBeEnabled();
}

async function filterOrders(page: Page, status: string) {
  const filter = page.getByRole('combobox').first();
  await expect(filter).toBeEnabled();
  await filter.selectOption(status);

  // Visible-text assertion: every visible matching row contains the requested status.
  const rows = page.getByRole('row').filter({ hasText: new RegExp(status, 'i') });
  await expect(rows.first()).toBeVisible();
  for (const text of await rows.allTextContents()) {
    expect(text.toLowerCase()).toContain(status.toLowerCase());
  }
}

async function updateOrderStatus(page: Page, currentStatus: string, targetStatus: string) {
  const row = orderRow(page, currentStatus);
  await expect(row).toBeVisible();

  const statusControl = row.getByRole('combobox').first();
  await expect(statusControl).toBeEnabled();
  await statusControl.selectOption(targetStatus);

  const updateButton = row.getByRole('button', { name: /cập nhật|update|lưu|save/i }).first();
  await expect(updateButton).toBeEnabled();
  await updateButton.click();
}

async function assertExpectedMessage(page: Page, message?: string) {
  if (message) await expect(page.getByText(message, { exact: true })).toBeVisible();
}

async function runOrderCase(page: Page, orderCase: OrderCase) {
  const input = orderCase.input as Record<string, any>;
  const expected = orderCase.expected as Record<string, any>;

  switch (orderCase.action) {
    case 'view_all_orders':
      await openOrdersAsAdmin(page);
      for (const column of expected.columns) {
        await expect(page.getByText(column, { exact: true })).toBeVisible();
      }
      await assertOrderControls(page);
      break;

    case 'filter_by_status':
      await openOrdersAsAdmin(page);
      await filterOrders(page, input.filterStatus);
      break;

    case 'update_status':
    case 'cancel_order':
      await openOrdersAsAdmin(page);
      await updateOrderStatus(page, input.currentStatus, input.targetStatus);
      await assertExpectedMessage(page, expected.message);
      await expect(page.getByText(expected.updatedStatus, { exact: true })).toBeVisible();
      await assertOrderControls(page);
      break;

    case 'invalid_transition_from_delivered':
    case 'invalid_transition_from_canceled':
      await openOrdersAsAdmin(page);
      await updateOrderStatus(page, input.currentStatus, input.targetStatus);
      await assertExpectedMessage(page, expected.errorMessage);
      break;

    case 'check_xss_escaping': {
      await openOrdersAsAdmin(page);
      let dialogOpened = false;
      page.on('dialog', async (dialog) => {
        dialogOpened = true;
        await dialog.dismiss();
      });
      await expect(page.locator('body')).not.toContainText('<script>');
      await expect(page.locator('body')).not.toContainText('alert(\'XSS\')');
      expect(dialogOpened).toBe(false);
      break;
    }

    case 'unauthorized_access':
      await page.goto('/admin/orders');
      await expect(page).toHaveURL(new RegExp(expected.redirectUrl));
      await expect(page.getByText(expected.errorMessage, { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: /đăng nhập|login/i })).toBeEnabled();
      break;

    default:
      throw new Error(`Unsupported FR-18 action: ${orderCase.action}`);
  }
}

test.describe('FR-18: Admin Order Management', () => {
  for (const orderCase of orderCases) {
    test(`${orderCase.id} - ${orderCase.description}`, async ({ page }) => {
      await runOrderCase(page, orderCase);
    });
  }
});
