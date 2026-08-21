const { test, expect } = require("@playwright/test");
const couponCases = require("./data/fr09-coupon-checkout.json");
const {
  applyCoupon,
  clearCouponUsage,
  loginAsUser,
  recordCouponUsage,
  resetDefaultUserState,
  setCouponActive,
} = require("./helpers/api");
const { WEB_BASE_URL } = require("./helpers/auth");

async function resolveToken(request, tokenKind) {
  if (!tokenKind) {
    return null;
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

function expectMoneyFields(body, expected) {
  if (expected.discount_amount !== undefined) {
    expect(body.discount_amount).toBe(expected.discount_amount);
  }
  if (expected.final_amount !== undefined) {
    expect(body.final_amount).toBe(expected.final_amount);
  }
}

function expectError(body, expected) {
  if (expected.errorContains) {
    expect(body && body.error).toContain(expected.errorContains);
  }
  if (expected.errorMentionsAuth) {
    expect(JSON.stringify(body || {}).toLowerCase()).toMatch(
      /unauthorized|forbidden|token|auth|đăng nhập/,
    );
  }
  if (expected.errorMentionsInvalidTotal) {
    expect(JSON.stringify(body || {}).toLowerCase()).toMatch(
      /total|amount|số tiền|tổng|không hợp lệ|invalid/,
    );
  }
}

async function prepareCase(testCase) {
  const { id, input } = testCase;
  await resetDefaultUserState();
  await setCouponActive("SAVE10", true);
  await clearCouponUsage("SAVE10", input.user_id || 1);
  await clearCouponUsage("BIGBUY", input.user_id || 1);
  await clearCouponUsage("VIP100", input.user_id || 1);

  if (id === "FR09-TC04") {
    await setCouponActive("SAVE10", false);
  }
  if (id === "FR09-TC08") {
    await recordCouponUsage("SAVE10", input.user_id, 1);
  }
  if (id === "FR09-BVA02") {
    await recordCouponUsage("VIP100", input.user_id, 1);
  }
}

async function cleanupCase(testCase) {
  const userId = testCase.input.user_id || 1;
  await setCouponActive("SAVE10", true);
  await clearCouponUsage("SAVE10", userId);
  await clearCouponUsage("BIGBUY", userId);
  await clearCouponUsage("VIP100", userId);
}

async function runApiCase(request, testCase) {
  const token = await resolveToken(request, testCase.input.token);
  const payload = {
    code: testCase.input.code,
    total_amount: testCase.input.total_amount,
    user_id: testCase.input.user_id,
  };

  const { response, body } = await applyCoupon(request, payload, token);
  await expectStatus(response, testCase.expected);

  if (response.ok()) {
    expect(body.success).toBe(true);
    expect(body.coupon_id).toEqual(expect.any(Number));
    expect(body.message).toContain("Áp dụng thành công");
    expectMoneyFields(body, testCase.expected);
  } else {
    expectError(body, testCase.expected);
  }
}

async function setCustomerToken(page, token) {
  await page.goto(WEB_BASE_URL);
  await page.evaluate((value) => {
    window.localStorage.setItem("token", value);
  }, token);
}

async function runCheckoutUiCase(request, page, testCase) {
  const { input, expected } = testCase;
  const token = await resolveToken(request, input.token);

  if (token) {
    await setCustomerToken(page, token);
  }

  let applyRequestSent = false;
  await page.route("**/api/apply-coupon", (route) => {
    applyRequestSent = true;
    route.continue();
  });

  await page.goto(`${WEB_BASE_URL}/checkout`);
  await page.locator('input[type="number"]').fill(String(input.total_amount));
  await page.getByPlaceholder("Nhập mã giảm giá...").fill(input.code);

  const applyButton = page.getByRole("button", { name: /áp dụng/i });
  if (expected.uiApplyButtonDisabled) {
    await expect(applyButton).toBeDisabled();
    expect(applyRequestSent).toBe(false);

    const apiToken = await resolveToken(request, input.token);
    const { response, body } = await applyCoupon(
      request,
      {
        code: input.code,
        total_amount: input.total_amount,
        user_id: input.user_id,
      },
      apiToken,
    );
    await expectStatus(response, expected);
    expectError(body, expected);
    return;
  }

  await applyButton.click();

  if (expected.status === 200) {
    await expect(page.getByText(/Áp dụng thành công/)).toBeVisible();
    await expect(page.getByText(/Tiết kiệm:/)).toContainText(
      expected.discount_amount.toLocaleString(),
    );
    await expect(page.getByText(/Thành tiền:/)).toContainText(
      expected.final_amount.toLocaleString(),
    );
  } else {
    await expect(page.locator(".text-red-600")).toContainText(
      expected.errorContains,
    );
  }
}

async function runCase(request, page, testCase) {
  if (testCase.mode === "hybrid") {
    await runCheckoutUiCase(request, page, testCase);
    return;
  }
  await runApiCase(request, testCase);
}

test.describe("FR-09 Coupon checkout", () => {
  test.describe.configure({ mode: "serial" });

  for (const testCase of couponCases) {
    test(`${testCase.id} ${testCase.title}`, async ({ request, page }) => {
      test.info().annotations.push(
        { type: "feature", description: "FR-09" },
        { type: "hw02Reference", description: testCase.hw02Reference },
        { type: "mode", description: testCase.mode },
      );

      await prepareCase(testCase);
      try {
        await runCase(request, page, testCase);
      } finally {
        await cleanupCase(testCase);
      }
    });
  }
});
