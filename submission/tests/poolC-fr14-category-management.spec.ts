import { test, expect } from '@playwright/test';
import testData from './data/poolC-fr14-category-management.json';

const studentId = process.env.STUDENT_ID || '23127185';
const timestamp = process.env.RUN_TIMESTAMP || new Date().toISOString();
const API_BASE = process.env.API_BASE || 'http://localhost:3000/api';

/**
 * Helper function to login and get authentication token
 */
async function getAuthToken(request: any, email: string, password: string): Promise<string> {
  const loginRes = await request.post(`${API_BASE}/login`, {
    data: { email, password }
  });
  const body = await loginRes.json();
  return body.token;
}

/**
 * Helper function to create a dummy category for testing update/delete operations
 */
async function createCategoryHelper(request: any, adminToken: string, name: string): Promise<number> {
  const res = await request.post(`${API_BASE}/categories`, {
    headers: { Authorization: `Bearer ${adminToken}` },
    data: { name }
  });
  const body = await res.json();
  return body.id;
}

test.describe(`FR-14: Category Management (Pool C) | Run by: ${studentId} | Timestamp: ${timestamp}`, () => {

  for (const tc of testData) {
    test(`${tc.id}: ${tc.title}`, async ({ page, request }) => {

      if (tc.id === 'TC1') {
        // Positive Case: Admin creating a valid category
        const adminToken = await getAuthToken(request, 'admin@eshop.com', 'Admin123!');
        const createRes = await request.post(`${API_BASE}/categories`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          data: { name: tc.categoryName }
        });

        // 1. Assertion Pattern: stateTransition (HTTP 200 OK & Category created in DB)
        expect(createRes.status()).toBe(tc.expectedStatusCode);

        const listRes = await request.get(`${API_BASE}/categories`);
        const categories = await listRes.json();
        const createdCat = categories.find((c: any) => c.name === tc.categoryName);
        expect(createdCat).toBeDefined();

        // Cleanup: xóa danh mục test TC1 để giữ DB sạch
        if (createdCat) {
          await request.delete(`${API_BASE}/categories/${createdCat.id}`, {
            headers: { Authorization: `Bearer ${adminToken}` }
          });
        }

      } else if (tc.id === 'TC2') {
        // Positive Case: Public GET /api/categories without auth
        const listRes = await request.get(`${API_BASE}/categories`);

        // 1. Assertion Pattern: stateTransition (HTTP 200 OK & Array response)
        expect(listRes.status()).toBe(tc.expectedStatusCode);
        const categories = await listRes.json();
        expect(Array.isArray(categories)).toBe(true);

      } else if (tc.id === 'TC3') {
        // Positive Case: Admin updating category name
        const adminToken = await getAuthToken(request, 'admin@eshop.com', 'Admin123!');
        const categoryId = await createCategoryHelper(request, adminToken, 'Temp Cat TC3');

        const updateRes = await request.put(`${API_BASE}/categories/${categoryId}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          data: { name: tc.categoryName }
        });

        // 1. Assertion Pattern: stateTransition (HTTP 200 OK & Updated in DB)
        expect(updateRes.status()).toBe(tc.expectedStatusCode);

        const listRes = await request.get(`${API_BASE}/categories`);
        const categories = await listRes.json();
        const updatedCat = categories.find((c: any) => c.id === categoryId);
        expect(updatedCat?.name).toBe(tc.categoryName);

        // Cleanup: xóa danh mục test TC3 để giữ DB sạch
        if (categoryId) {
          await request.delete(`${API_BASE}/categories/${categoryId}`, {
            headers: { Authorization: `Bearer ${adminToken}` }
          });
        }

      } else if (tc.id === 'TC4') {
        // Positive Case: Admin deleting a category
        const adminToken = await getAuthToken(request, 'admin@eshop.com', 'Admin123!');
        const categoryId = await createCategoryHelper(request, adminToken, tc.categoryName);

        const deleteRes = await request.delete(`${API_BASE}/categories/${categoryId}`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });

        // 1. Assertion Pattern: stateTransition (HTTP 200 OK & Removed from DB)
        expect(deleteRes.status()).toBe(tc.expectedStatusCode);

        const listRes = await request.get(`${API_BASE}/categories`);
        const categories = await listRes.json();
        const deletedCat = categories.find((c: any) => c.id === categoryId);
        expect(deletedCat).toBeUndefined();

      } else if (tc.id === 'TC5') {
        // Negative Case: Unauthenticated request to create category
        const createRes = await request.post(`${API_BASE}/categories`, {
          data: { name: tc.categoryName }
        });

        // 2. Assertion Pattern: statusCode (Expect 401 Unauthorized)
        expect(createRes.status()).toBe(tc.expectedStatusCode);

      } else if (tc.id === 'TC6') {
        // Negative Case: Request with invalid token
        const createRes = await request.post(`${API_BASE}/categories`, {
          headers: { Authorization: 'Bearer invalid_token_xyz_123' },
          data: { name: tc.categoryName }
        });

        // 2. Assertion Pattern: statusCode (Expect 403 Forbidden)
        expect(createRes.status()).toBe(tc.expectedStatusCode);

      } else if (tc.id === 'TC7') {
        // Negative Case: User (non-admin) attempting to create category
        const userToken = await getAuthToken(request, 'test@eshop.com', 'Test1234!');
        const createRes = await request.post(`${API_BASE}/categories`, {
          headers: { Authorization: `Bearer ${userToken}` },
          data: { name: tc.categoryName }
        });

        // 2. Assertion Pattern: statusCode (Expect 403 Forbidden for non-admin)
        // Note: SUT has an RBAC bug where non-admin user token is accepted (returns 200), causing assertion to fail.
        expect(createRes.status()).toBe(tc.expectedStatusCode);

      } else if (tc.id === 'TC8') {
        // Negative Case: User (non-admin) attempting to update category
        const adminToken = await getAuthToken(request, 'admin@eshop.com', 'Admin123!');
        const userToken = await getAuthToken(request, 'test@eshop.com', 'Test1234!');
        const categoryId = await createCategoryHelper(request, adminToken, 'Temp Cat TC8');

        const updateRes = await request.put(`${API_BASE}/categories/${categoryId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
          data: { name: tc.categoryName }
        });

        // 2. Assertion Pattern: statusCode (Expect 403 Forbidden for non-admin)
        // Note: SUT has an RBAC bug where non-admin user token is accepted (returns 200), causing assertion to fail.
        expect(updateRes.status()).toBe(tc.expectedStatusCode);

      } else if (tc.id === 'TC9') {
        // Negative Case: User (non-admin) attempting to delete category
        const adminToken = await getAuthToken(request, 'admin@eshop.com', 'Admin123!');
        const userToken = await getAuthToken(request, 'test@eshop.com', 'Test1234!');
        const categoryId = await createCategoryHelper(request, adminToken, 'Temp Cat TC9');

        const deleteRes = await request.delete(`${API_BASE}/categories/${categoryId}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });

        // 2. Assertion Pattern: statusCode (Expect 403 Forbidden for non-admin)
        // Note: SUT has an RBAC bug where non-admin user token is accepted (returns 200), causing assertion to fail.
        expect(deleteRes.status()).toBe(tc.expectedStatusCode);

      } else if (tc.id === 'TC10') {
        // Boundary Case: Admin attempting to create category with empty string name
        const adminToken = await getAuthToken(request, 'admin@eshop.com', 'Admin123!');
        const createRes = await request.post(`${API_BASE}/categories`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          data: { name: tc.categoryName }
        });

        // Cleanup: xóa danh mục rác nếu SUT tạo thành công (BUG-006)
        const responseStatus = createRes.status();
        if (responseStatus === 200) {
          try {
            const body = await createRes.json();
            if (body.id) {
              await request.delete(`${API_BASE}/categories/${body.id}`, {
                headers: { Authorization: `Bearer ${adminToken}` }
              });
            }
          } catch { /* cleanup best-effort */ }
        }

        // 2. Assertion Pattern: statusCode (Expect 400 Bad Request for empty name)
        // Note: SUT lacks validation for empty category name (returns 200), causing assertion to fail.
        expect(responseStatus).toBe(tc.expectedStatusCode);

      } else if (tc.id === 'TC11') {
        // Boundary Case: Admin creating category with maximum string length (255 chars)
        const adminToken = await getAuthToken(request, 'admin@eshop.com', 'Admin123!');
        const createRes = await request.post(`${API_BASE}/categories`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          data: { name: tc.categoryName }
        });

        // 1. Assertion Pattern: stateTransition (HTTP 200 OK & Boundary name stored)
        expect(createRes.status()).toBe(tc.expectedStatusCode);

        const listRes = await request.get(`${API_BASE}/categories`);
        const categories = await listRes.json();
        const boundaryCat = categories.find((c: any) => c.name === tc.categoryName);
        expect(boundaryCat).toBeDefined();

        // Cleanup: xóa danh mục boundary test TC11 để giữ DB sạch
        if (boundaryCat) {
          await request.delete(`${API_BASE}/categories/${boundaryCat.id}`, {
            headers: { Authorization: `Bearer ${adminToken}` }
          });
        }

      } else if (tc.id === 'TC12') {
        // Coc Coc / Web UI Case: Admin adding category through frontend-admin UI
        await page.goto('http://localhost:5174');

        // Log in via Admin UI form (http://localhost:5174)
        await page.getByPlaceholder('Email').fill('admin@eshop.com');
        await page.getByPlaceholder('Password').fill('Admin123!');
        await page.getByRole('button', { name: 'Login' }).click();

        // Navigate to Category Tab
        const catTab = page.getByText('Danh mục', { exact: true });
        await expect(catTab.first()).toBeVisible({ timeout: 10000 });
        await catTab.first().click();

        // Fill new category input and submit
        const nameInput = page.getByPlaceholder(/Tên danh mục mới/i);
        await nameInput.fill(tc.categoryName);

        const addBtn = page.getByRole('button', { name: /Thêm mới/i });
        await addBtn.click();

        // 3. Assertion Pattern: visibleText (Category name rendered in UI table)
        const categoryCell = page.getByText(tc.categoryName);
        await expect(categoryCell.first()).toBeVisible({ timeout: 5000 });
      }
    });
  }
});
