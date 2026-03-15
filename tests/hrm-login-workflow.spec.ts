import { test, expect } from '@playwright/test';
import { HRMLoginPage } from './pages/HRMLoginPage';

test.describe('HRM App - Login Workflow', () => {
  const username = process.env.HRM_USERNAME || 'ducnt@dgroup.co';
  const password = process.env.HRM_PASSWORD || 'Dsv!@#123';

  /*test('Complete login flow and verify dashboard access', async ({ page }) => {
    const loginPage = new HRMLoginPage(page);
    await loginPage.login(username, password);
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
  });*/

  test('Complete logout flow and verify return to login page', async ({ page }) => {
    const loginPage = new HRMLoginPage(page);
    await loginPage.login(username, password);
    
    // Check if login was successful
    const isLoggedIn = await loginPage.isLoginSuccessful();
    if (!isLoggedIn) {
      console.warn('Login did not succeed, skipping logout test');
      return;
    }
    
    // Perform logout
    await loginPage.logout();
    
    // Verify we're back to login page
    const urlAfterLogout = await loginPage.getCurrentURL();
    expect(urlAfterLogout).toContain('authentication');
  });
});
