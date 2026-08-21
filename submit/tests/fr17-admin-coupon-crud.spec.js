const { test, expect } = require("@playwright/test");
const couponCrudCases = require("./data/fr17-admin-coupon-crud.json");
const {
  createCoupon,
  deleteCoupon,
  deleteCouponsByCodePrefix,
  getCouponByCode,
  listCoupons,
  loginAsAdmin,
  loginAsUser,
  resetDefaultUserState,
} = require("./helpers/api");
const { loginAdmin } = require("./helpers/auth");

const RUN_ID = `${Date.now()}`;
const AUTO_PREFIX = "AUTO";

function materialize(value, testInfo) {
  if (typeof value === "string") {
    return value.replace(
      "${runId}",
      `${RUN_ID}_${testInfo.project.name.toUpperCase()}_${testInfo.workerIndex}`,
    );
  }
  if (Array.isArray(value)) {
    return value.map((item) => materialize(item, testInfo));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        materialize(item, testInfo),
      ]),
    );
  }
  return value;
}

async function resolveToken(request, tokenKind) {
  if (!tokenKind) {
    return null;
  }
  if (tokenKind === "admin") {
    const login = await loginAsAdmin(request);
    expect(login.token).toEqual(expect.any(String));
    return login.token;
  }
  if (tokenKind === "user") {
    const login = await loginAsUser(request);
    expect(login.token).toEqual(expect.any(String));
    return login.token;
  }
  return tokenKind;
}

async function expectStatus(response, expected) {
  if (expected.status) {
    expect(response.status()).toBe(expected.status);
  }
  if (expected.acceptedStatuses) {
    expect(expected.acceptedStatuses).toContain(response.status());
  }
}

function expectErrorMentions(body, expected) {
  if (!expected.errorMentions) {
    return;
  }
  const serialized = JSON.stringify(body || {}).toLowerCase();
  const normalized = expected.errorMentions.toLowerCase();
  expect(serialized).toContain(normalized);
}

async function openCouponAdmin(page) {
  await loginAdmin(page);
  await page.locator("li").filter({ hasText: "Mã Giảm Giá" }).click();
  await expect(page.getByRole("heading", { name: "Quản lý Mã Giảm Giá" }))
    .toBeVisible();
}

async function createCouponViaUi(page, coupon) {
  await page.getByPlaceholder("Mã coupon (VD: SAVE10)").fill(coupon.code);
  await page.locator("select").selectOption(coupon.type);
  await page
    .getByPlaceholder(
      coupon.type === "percent" ? "Giá trị % (VD: 10)" : "Số tiền (VD: 50000)",
    )
    .fill(String(coupon.discount_value));
  await page
    .getByPlaceholder("Đơn tối thiểu (₫)")
    .fill(String(coupon.min_order_amount));
  await page.getByPlaceholder("Ngày hết hạn").fill(coupon.expired_at);
  await page
    .getByPlaceholder("Số lần dùng tối đa/người")
    .fill(String(coupon.max_uses_per_user));
  await page.getByRole("button", { name: "Tạo mã" }).click();
}

function couponRow(page, code) {
  return page.locator("tbody tr").filter({ hasText: code });
}

async function runListCase(request, page, testCase) {
  const token = await resolveToken(request, testCase.input.token);
  const { response, body } = await listCoupons(request, token);
  await expectStatus(response, testCase.expected);
  const codes = body.map((coupon) => coupon.code);
  for (const code of testCase.expected.containsCodes) {
    expect(codes).toContain(code);
  }

  await openCouponAdmin(page);
  for (const code of testCase.expected.containsCodes) {
    await expect(couponRow(page, code)).toBeVisible();
  }
}

async function runCreateApiCase(request, testCase) {
  const token = await resolveToken(request, testCase.input.token);
  const { response, body } = await createCoupon(
    request,
    token,
    testCase.input.coupon,
  );
  await expectStatus(response, testCase.expected);

  if (response.ok()) {
    expect(body.message).toContain(testCase.expected.messageContains);
    expect(body.id).toEqual(expect.any(Number));
    const coupon = await getCouponByCode(testCase.input.coupon.code);
    expect(coupon).toBeTruthy();
  } else {
    expectErrorMentions(body, testCase.expected);
  }
}

async function runCreateUiCase(page, testCase) {
  await openCouponAdmin(page);
  await createCouponViaUi(page, testCase.input.coupon);
  await expect(couponRow(page, testCase.input.coupon.code)).toBeVisible();
}

async function runDeleteApiCase(request, testCase) {
  const token = await resolveToken(request, testCase.input.token);
  const { response, body } = await deleteCoupon(
    request,
    token,
    testCase.input.coupon_id,
  );
  await expectStatus(response, testCase.expected);
  if (response.ok()) {
    expect(body.message).toContain(testCase.expected.messageContains);
  } else {
    expectErrorMentions(body, testCase.expected);
  }
}

async function runDeleteUiCase(request, page, testCase) {
  const token = await resolveToken(request, "admin");
  const code = testCase.input.couponCode;
  const seed = await createCoupon(request, token, {
    code,
    type: "fixed",
    discount_value: 10000,
    min_order_amount: 0,
    expired_at: "2099-12-31",
    max_uses_per_user: 1,
  });
  expect(seed.response.status()).toBe(200);

  await openCouponAdmin(page);
  const row = couponRow(page, code);
  await expect(row).toBeVisible();
  await row.getByRole("button", { name: "Xóa" }).click();
  await expect(row).toHaveCount(0);

  const deleted = await getCouponByCode(code);
  expect(deleted).toBeUndefined();
}

async function runCase(request, page, rawCase, testInfo) {
  const testCase = materialize(rawCase, testInfo);
  const { operation } = testCase.input;

  if (operation === "list") {
    await runListCase(request, page, testCase);
    return;
  }

  if (operation === "create" && testCase.mode === "hybrid") {
    await runCreateUiCase(page, testCase);
    return;
  }

  if (operation === "create") {
    await runCreateApiCase(request, testCase);
    return;
  }

  if (operation === "delete" && testCase.mode === "hybrid") {
    await runDeleteUiCase(request, page, testCase);
    return;
  }

  if (operation === "delete") {
    await runDeleteApiCase(request, testCase);
    return;
  }

  throw new Error(`Unsupported FR17 operation: ${operation}`);
}

test.describe("FR-17 Admin coupon CRUD", () => {
  test.describe.configure({ mode: "serial" });

  for (const testCase of couponCrudCases) {
    test(`${testCase.id} ${testCase.title}`, async ({
      request,
      page,
    }, testInfo) => {
      test.info().annotations.push(
        { type: "feature", description: "FR-17" },
        { type: "caseId", description: testCase.id },
        { type: "hw02Reference", description: testCase.hw02Reference },
        { type: "mode", description: testCase.mode },
      );

      await resetDefaultUserState();
      await deleteCouponsByCodePrefix(AUTO_PREFIX);
      try {
        await runCase(request, page, testCase, testInfo);
      } finally {
        await deleteCouponsByCodePrefix(AUTO_PREFIX);
      }
    });
  }
});
