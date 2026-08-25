import { expect, Page, test } from '@playwright/test';
import testData from '../test-data/FR-07.json';

type CartCase = (typeof testData.testCases)[number];
const cartCases = testData.testCases as CartCase[];

async function openCart(page: Page) {
  await page.goto('/cart');
  await expect(page).toHaveURL(/\/cart/i);
}

function productCard(page: Page, productName: string) {
  return page.getByText(productName, { exact: true }).first().locator('..');
}

async function addProduct(page: Page, productName: string, quantity = 1) {
  await page.goto('/');
  const card = productCard(page, productName);
  await expect(card).toBeVisible();
  const addButton = card.getByRole('button', { name: /thêm vào giỏ|add to cart/i });
  await expect(addButton).toBeEnabled();
  for (let index = 0; index < quantity; index += 1) await addButton.click();
  await openCart(page);
  await expect(page.getByText(productName, { exact: true })).toBeVisible();
}

function quantityInput(page: Page) {
  return page.locator('input[type="number"]').first();
}

async function assertCartSummary(page: Page, expected: Record<string, unknown>) {
  const totalLabel = expected.totalLabel ?? expected.totalLabelExact;
  if (typeof totalLabel === 'string') {
    await expect(page.getByText(totalLabel, { exact: true })).toBeVisible();
  }
  if (typeof expected.invalidLabelNotPresent === 'string') {
    await expect(page.getByText(expected.invalidLabelNotPresent, { exact: true })).not.toBeVisible();
  }
  if (typeof expected.totalAmount === 'number') {
    await expect(page.locator('body')).toContainText(String(expected.totalAmount));
  }
  if (await quantityInput(page).count() > 0) await expect(quantityInput(page)).toBeEditable();
}

async function runCartCase(page: Page, testCase: CartCase) {
  const input = testCase.input as Record<string, any>;
  const expected = testCase.expected as Record<string, any>;

  switch (testCase.action) {
    case 'view_empty_cart':
      await openCart(page);
      await expect(page.getByText(expected.emptyMessage, { exact: true })).toBeVisible();
      break;
    case 'add_product':
      await addProduct(page, input.productName, input.quantity);
      await assertCartSummary(page, expected);
      break;
    case 'add_same_product_twice':
      await addProduct(page, input.productName, 2);
      await expect(page.getByText(input.productName, { exact: true })).toHaveCount(expected.rowCount);
      await assertCartSummary(page, expected);
      break;
    case 'add_multiple_products':
      for (const item of input.items) await addProduct(page, item.productName, item.quantity);
      await assertCartSummary(page, expected);
      break;
    case 'increase_quantity_button':
    case 'decrease_quantity_button': {
      await addProduct(page, 'Sản phẩm A', input.initialQuantity);
      const buttonName = testCase.action === 'increase_quantity_button' ? /\+|tăng/i : /-|giảm/i;
      const quantityButton = page.getByRole('button', { name: buttonName }).first();
      await expect(quantityButton).toBeEnabled();
      for (let index = 0; index < input.clicks; index += 1) await quantityButton.click();
      await expect(quantityInput(page)).toHaveValue(String(expected.newQuantity));
      await assertCartSummary(page, expected);
      break;
    }
    case 'edit_quantity_input':
      await addProduct(page, 'Sản phẩm A');
      await quantityInput(page).fill(String(input.newQuantity));
      await quantityInput(page).press('Enter');
      await expect(quantityInput(page)).toHaveValue(String(expected.newQuantity));
      await assertCartSummary(page, expected);
      break;
    case 'continue_shopping':
      await openCart(page);
      await page.getByRole('button', { name: /tiếp tục mua sắm|continue shopping/i }).click();
      await expect(page).toHaveURL(new RegExp(expected.redirectUrl));
      break;
    case 'delete_item_confirm':
    case 'delete_item_cancel': {
      await addProduct(page, 'Sản phẩm A');
      await page.getByRole('button', { name: /xóa|delete|remove/i }).first().click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      const confirmation = dialog.getByRole('button', {
        name: input.confirmDelete ? /xác nhận|confirm|yes/i : /hủy|cancel|no/i,
      });
      await expect(confirmation).toBeEnabled();
      await confirmation.click();
      if (input.confirmDelete) await expect(page.getByText('Sản phẩm A', { exact: true })).toHaveCount(0);
      else await expect(page.getByText('Sản phẩm A', { exact: true })).toBeVisible();
      break;
    }
    case 'decrease_below_min':
      await addProduct(page, 'Sản phẩm A', input.initialQuantity);
      await expect(page.getByRole('button', { name: /-|giảm/i }).first()).toBeDisabled();
      await expect(quantityInput(page)).toHaveValue(String(expected.quantity));
      break;
    case 'enter_invalid_quantity':
      await addProduct(page, 'Sản phẩm A');
      await quantityInput(page).fill(String(input.invalidValue));
      await quantityInput(page).press('Enter');
      await expect(page.getByText(expected.errorMessage, { exact: true })).toBeVisible();
      await expect(quantityInput(page)).toHaveValue(String(expected.resetQuantity));
      break;
    case 'verify_total_label':
      await openCart(page);
      await assertCartSummary(page, expected);
      break;
    case 'clear_all_items':
      await openCart(page);
      for (let index = 0; index < input.initialItemCount; index += 1) {
        await page.getByRole('button', { name: /xóa|delete|remove/i }).first().click();
        await page.getByRole('dialog').getByRole('button', { name: /xác nhận|confirm|yes/i }).click();
      }
      await expect(page.getByText(expected.emptyMessage, { exact: true })).toBeVisible();
      break;
    default:
      throw new Error(`Unsupported FR-07 action: ${testCase.action}`);
  }
}

test.describe('FR-07: Shopping Cart', () => {
  for (const testCase of cartCases) {
    test(`${testCase.id} - ${testCase.description}`, async ({ page }) => runCartCase(page, testCase));
  }
});
