const path = require("node:path");
const { createRequire } = require("node:module");

const repoRoot = path.resolve(__dirname, "../../..");
const backendDir = path.join(repoRoot, "eshop-sut", "backend");
const backendRequire = createRequire(path.join(backendDir, "package.json"));
const sqlite3 = backendRequire("sqlite3").verbose();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const DEFAULT_USER = {
  email: "test@eshop.com",
  password: "Test1234!",
};
const DEFAULT_ADMIN = {
  email: "admin@eshop.com",
  password: "Admin123!",
};
const dbPath = path.join(backendDir, "database.sqlite");

function apiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
}

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function login(request, credentials = DEFAULT_USER) {
  const response = await request.post(apiUrl("/api/login"), {
    data: {
      email: credentials.email,
      password: credentials.password,
    },
  });
  const body = await safeJson(response);
  return {
    response,
    body,
    token: body && body.token,
    user: body && body.user,
  };
}

async function loginAsUser(request) {
  return login(request, DEFAULT_USER);
}

async function loginAsAdmin(request) {
  return login(request, DEFAULT_ADMIN);
}

async function applyCoupon(request, payload, token) {
  const response = await request.post(apiUrl("/api/apply-coupon"), {
    data: payload,
    headers: authHeaders(token),
  });
  return { response, body: await safeJson(response) };
}

async function listCoupons(request, token) {
  const response = await request.get(apiUrl("/api/coupons"), {
    headers: authHeaders(token),
  });
  return { response, body: await safeJson(response) };
}

async function createCoupon(request, token, payload) {
  const response = await request.post(apiUrl("/api/admin/coupons"), {
    data: payload,
    headers: authHeaders(token),
  });
  return { response, body: await safeJson(response) };
}

async function deleteCoupon(request, token, id) {
  const response = await request.delete(apiUrl(`/api/admin/coupons/${id}`), {
    headers: authHeaders(token),
  });
  return { response, body: await safeJson(response) };
}

function openDb() {
  return new sqlite3.Database(dbPath);
}

function runDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.run(sql, params, function onRun(err) {
      db.close();
      if (err) {
        reject(err);
        return;
      }
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function getDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.get(sql, params, (err, row) => {
      db.close();
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

function allDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.all(sql, params, (err, rows) => {
      db.close();
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

async function resetDefaultUserState(email = DEFAULT_USER.email) {
  await runDb(
    "UPDATE users SET login_attempts = 0, locked_until = NULL WHERE email = ?",
    [email],
  );
}

async function setUserLockState(email, loginAttempts, lockedUntil) {
  await runDb(
    "UPDATE users SET login_attempts = ?, locked_until = ? WHERE email = ?",
    [loginAttempts, lockedUntil, email],
  );
}

async function setCouponActive(code, isActive) {
  await runDb("UPDATE coupons SET is_active = ? WHERE code = ?", [
    isActive ? 1 : 0,
    code,
  ]);
}

async function getCouponByCode(code) {
  return getDb("SELECT * FROM coupons WHERE code = ?", [code]);
}

async function clearCouponUsage(code, userId) {
  await runDb(
    `DELETE FROM coupon_usage
     WHERE user_id = ?
       AND coupon_id IN (SELECT id FROM coupons WHERE code = ?)`,
    [userId, code],
  );
}

async function recordCouponUsage(code, userId, count = 1) {
  const coupon = await getCouponByCode(code);
  if (!coupon) {
    throw new Error(`Cannot record usage: coupon ${code} not found`);
  }
  for (let index = 0; index < count; index += 1) {
    await runDb("INSERT INTO coupon_usage (coupon_id, user_id) VALUES (?, ?)", [
      coupon.id,
      userId,
    ]);
  }
}

async function deleteCouponsByCodePrefix(prefix) {
  await runDb("DELETE FROM coupons WHERE code LIKE ?", [`${prefix}%`]);
}

module.exports = {
  API_BASE_URL,
  DEFAULT_ADMIN,
  DEFAULT_USER,
  allDb,
  apiUrl,
  applyCoupon,
  authHeaders,
  clearCouponUsage,
  createCoupon,
  deleteCoupon,
  deleteCouponsByCodePrefix,
  getCouponByCode,
  getDb,
  listCoupons,
  login,
  loginAsAdmin,
  loginAsUser,
  recordCouponUsage,
  resetDefaultUserState,
  runDb,
  safeJson,
  setCouponActive,
  setUserLockState,
};
