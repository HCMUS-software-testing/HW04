const { test, expect } = require("@playwright/test");
const loginCases = require("./data/fr02-login-lockout.json");
const {
  DEFAULT_USER,
  apiUrl,
  getDb,
  login,
  resetDefaultUserState,
  safeJson,
  setUserLockState,
} = require("./helpers/api");
const { WEB_BASE_URL, getCustomerLoginFieldTypes } = require("./helpers/auth");

async function postLogin(request, email, password) {
  const response = await request.post(apiUrl("/api/login"), {
    data: { email, password },
  });
  return { response, body: await safeJson(response) };
}

async function getUserByEmail(email) {
  return getDb(
    "SELECT id, email, role, login_attempts, locked_until FROM users WHERE email = ?",
    [email],
  );
}

async function expectStatus(response, expected) {
  if (expected.status) {
    expect(response.status()).toBe(expected.status);
  }
  if (expected.acceptedStatuses) {
    expect(expected.acceptedStatuses).toContain(response.status());
  }
}

function expectNoPasswordLeak(body) {
  expect(body).toBeTruthy();
  expect(body.user || body).not.toHaveProperty("password");
}

async function assertRequiredFieldBlocksSubmit(page, input, blankField) {
  let loginRequestSent = false;
  await page.route("**/api/login", (route) => {
    loginRequestSent = true;
    route.continue();
  });

  await page.goto(`${WEB_BASE_URL}/login`);
  const form = page.locator("form");
  const emailInput = form.locator("input").nth(0);
  const passwordInput = form.locator("input").nth(1);

  await emailInput.fill(input.email);
  await passwordInput.fill(input.password);
  await form.getByRole("button", { name: /sign in/i }).click();

  const targetInput = blankField === "email" ? emailInput : passwordInput;
  expect(await targetInput.evaluate((element) => element.checkValidity())).toBe(
    false,
  );
  expect(loginRequestSent).toBe(false);
}

async function assertMalformedEmailBlocksSubmit(page, input, expected) {
  let loginRequestSent = false;
  await page.route("**/api/login", (route) => {
    loginRequestSent = true;
    route.continue();
  });

  await page.goto(`${WEB_BASE_URL}/login`);
  const form = page.locator("form");
  const emailInput = form.locator("input").nth(0);
  const passwordInput = form.locator("input").nth(1);
  const fieldTypes = await getCustomerLoginFieldTypes(page);

  expect(fieldTypes.emailType).toBe(expected.emailInputType);
  await emailInput.fill(input.email);
  await passwordInput.fill(input.password);
  await form.getByRole("button", { name: /sign in/i }).click();

  expect(await emailInput.evaluate((element) => element.checkValidity())).toBe(
    false,
  );
  expect(loginRequestSent).toBe(expected.requestShouldBeSent);
}

async function runApiLoginCase(request, testCase) {
  const { input, expected } = testCase;
  const { response, body } = await postLogin(
    request,
    input.email,
    input.password,
  );

  await expectStatus(response, expected);

  if (expected.errorContains) {
    expect(body && body.error).toContain(expected.errorContains);
  }
  if (expected.errorMentionsValidation) {
    expect(body && JSON.stringify(body).toLowerCase()).toMatch(
      /email|format|invalid|validation/,
    );
  }
  if (expected.hasToken) {
    expect(body && body.token).toEqual(expect.any(String));
  }
  if (expected.userPasswordMustBeHidden) {
    expectNoPasswordLeak(body);
  }
}

async function runLoginAttemptBoundaryCase(request, testCase) {
  const { input, expected } = testCase;
  await setUserLockState(input.email, input.failedAttemptsBefore, null);

  const { response, body } = await postLogin(
    request,
    input.email,
    input.password,
  );
  await expectStatus(response, expected);

  const user = await getUserByEmail(input.email);
  if (expected.hasToken) {
    expect(body && body.token).toEqual(expect.any(String));
  }
  if (expected.locked === false) {
    expect(user.locked_until).toBeNull();
  }
  if (expected.loginAttemptsAfter !== undefined) {
    expect(user.login_attempts).toBe(expected.loginAttemptsAfter);
  }
  if (expected.lockedAfterRequest) {
    expect(user.locked_until).toBeTruthy();
  }
}

async function runCase(request, page, testCase) {
  const { id, input, expected } = testCase;

  switch (id) {
    case "FR02-TC01": {
      const apiResult = await login(request, {
        email: input.email,
        password: input.password,
      });
      await expectStatus(apiResult.response, expected);
      expect(apiResult.body.token).toEqual(expect.any(String));
      expectNoPasswordLeak(apiResult.body);

      await page.goto(`${WEB_BASE_URL}/login`);
      const form = page.locator("form");
      await form.locator("input").nth(0).fill(input.email);
      await form.locator("input").nth(1).fill(input.password);
      await form.getByRole("button", { name: /sign in/i }).click();
      await expect(page).toHaveURL(`${WEB_BASE_URL}${expected.redirectPath}`);
      break;
    }

    case "FR02-TC03":
      await assertMalformedEmailBlocksSubmit(page, input, expected);
      break;

    case "FR02-TC04":
      await assertRequiredFieldBlocksSubmit(page, input, "email");
      break;

    case "FR02-TC06":
      await assertRequiredFieldBlocksSubmit(page, input, "password");
      break;

    case "FR02-TC05": {
      const before = await getUserByEmail(input.email);
      await runApiLoginCase(request, testCase);
      const after = await getUserByEmail(input.email);
      expect(after.login_attempts - before.login_attempts).toBe(
        expected.loginAttemptsIncrementBy,
      );
      break;
    }

    case "FR02-TC07": {
      for (let attempt = 0; attempt < input.failedAttempts; attempt += 1) {
        await postLogin(request, input.email, input.wrongPassword);
      }
      const lockedLogin = await postLogin(
        request,
        input.email,
        input.correctPassword,
      );
      await expectStatus(lockedLogin.response, {
        status: expected.statusWhenLocked,
      });
      expect(lockedLogin.body.error).toContain(expected.errorContains);

      const user = await getUserByEmail(input.email);
      expect(user.locked_until).toBeTruthy();
      const secondsRemaining = Math.round(
        (new Date(user.locked_until).getTime() - Date.now()) / 1000,
      );
      expect(secondsRemaining).toBeGreaterThan(0);
      expect(secondsRemaining).toBeLessThanOrEqual(
        expected.lockDurationSeconds + 5,
      );
      break;
    }

    case "FR02-TC08": {
      const attempts = await Promise.all(
        Array.from({ length: input.parallelRequests }, () =>
          postLogin(request, input.email, input.password),
        ),
      );
      const statuses = attempts.map(({ response }) => response.status());
      expect(statuses).toContain(expected.someStatusesInclude);

      const user = await getUserByEmail(input.email);
      expect(Boolean(user.locked_until)).toBe(expected.accountLockedAfterRun);
      break;
    }

    case "FR02-TC09": {
      const initialLogin = await login(request, DEFAULT_USER);
      expect(initialLogin.token).toEqual(expect.any(String));

      await postLogin(request, input.email, "WrongPassword!");
      await postLogin(request, input.email, "WrongPassword!");

      const response = await request.get(apiUrl(input.protectedEndpoint), {
        headers: { Authorization: `Bearer ${initialLogin.token}` },
      });
      const body = await safeJson(response);
      await expectStatus(response, expected);
      if (expected.responseMustNotExposePassword) {
        expectNoPasswordLeak(body);
      }
      break;
    }

    case "FR02-BVA01":
    case "FR02-BVA02":
    case "FR02-BVA03":
      await runLoginAttemptBoundaryCase(request, testCase);
      break;

    case "FR02-BVA04": {
      const pastLock = new Date(Date.now() - 1000).toISOString();
      await setUserLockState(input.email, 3, pastLock);
      await runApiLoginCase(request, testCase);
      break;
    }

    default:
      await runApiLoginCase(request, testCase);
  }
}

test.describe("FR-02 Login and account lockout", () => {
  for (const testCase of loginCases) {
    test(`${testCase.id} ${testCase.title}`, async ({ request, page }) => {
      test.info().annotations.push(
        { type: "feature", description: "FR-02" },
        { type: "hw02Reference", description: testCase.hw02Reference },
        { type: "mode", description: testCase.mode },
      );

      await resetDefaultUserState(DEFAULT_USER.email);
      try {
        await runCase(request, page, testCase);
      } finally {
        await resetDefaultUserState(DEFAULT_USER.email);
      }
    });
  }
});
