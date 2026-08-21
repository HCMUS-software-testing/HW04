const WEB_BASE_URL = process.env.WEB_BASE_URL || "http://localhost:5173";
const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL || "http://localhost:5174";

const DEFAULT_USER = {
  email: "test@eshop.com",
  password: "Test1234!",
};
const DEFAULT_ADMIN = {
  email: "admin@eshop.com",
  password: "Admin123!",
};

function normalizeCredentials(emailOrCredentials, password, fallback) {
  if (!emailOrCredentials) {
    return fallback;
  }
  if (typeof emailOrCredentials === "object") {
    return {
      email: emailOrCredentials.email,
      password: emailOrCredentials.password,
    };
  }
  return { email: emailOrCredentials, password };
}

async function loginWeb(page, emailOrCredentials, password) {
  const credentials = normalizeCredentials(
    emailOrCredentials,
    password,
    DEFAULT_USER,
  );
  await page.goto(`${WEB_BASE_URL}/login`);
  const form = page.locator("form");
  await form.locator("input").nth(0).fill(credentials.email);
  await form.locator("input").nth(1).fill(credentials.password);
  await form.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL(`${WEB_BASE_URL}/`, { timeout: 5000 });
}

async function loginAdmin(page, emailOrCredentials, password) {
  const credentials = normalizeCredentials(
    emailOrCredentials,
    password,
    DEFAULT_ADMIN,
  );
  await page.goto(ADMIN_BASE_URL);
  await page.getByPlaceholder("Email").fill(credentials.email);
  await page.getByPlaceholder("Password").fill(credentials.password);
  await page.getByRole("button", { name: /^login$/i }).click();
  await page.waitForFunction(
    () => Boolean(window.localStorage.getItem("adminToken")),
    null,
    { timeout: 5000 },
  );
}

async function getCustomerLoginFieldTypes(page) {
  await page.goto(`${WEB_BASE_URL}/login`);
  const inputs = page.locator("form input");
  return {
    emailType: await inputs.nth(0).getAttribute("type"),
    passwordType: await inputs.nth(1).getAttribute("type"),
  };
}

async function clearWebAuth(page) {
  await page.goto(WEB_BASE_URL);
  await page.evaluate(() => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("adminToken");
  });
}

module.exports = {
  ADMIN_BASE_URL,
  DEFAULT_ADMIN,
  DEFAULT_USER,
  WEB_BASE_URL,
  clearWebAuth,
  getCustomerLoginFieldTypes,
  loginAdmin,
  loginWeb,
};
