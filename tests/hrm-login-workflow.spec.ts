import { test, expect } from '@playwright/test';
import { HRMLoginPage } from './pages/HRMLoginPage';

test.describe('HRM App - Login Workflow', () => {
  const username = process.env.HRM_USERNAME || 'ducnt@dgroup.co';
  const password = process.env.HRM_PASSWORD || 'Dsv!@#123';

  test('Complete login flow and verify dashboard access', async ({ page }) => {
    const loginPage = new HRMLoginPage(page);
    await loginPage.login(username, password);
    const url = await loginPage.getCurrentURL();
    expect(url).not.toContain('login');
  });
});
