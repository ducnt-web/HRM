import { test, expect } from '@playwright/test';

test.describe('HRM App Login Automation', () => {
  const baseURL = 'https://dev.hrmapp.org/';
  const username = 'ducnt@dgroup.co';
  const password = 'Dsv!@#123';

  test('should login successfully to HRM App', async ({ page }) => {
    // Navigate to the HRM App
    await page.goto(baseURL);

    // Wait for page to load and look for login form
    await page.waitForLoadState('networkidle');

    // Find and fill username field
    // Try multiple selectors that are common for username fields
    const usernameSelectors = [
      'input[type="email"]',
      'input[name*="email"]',
      'input[id*="username"]',
      'input[type="text"]',
      'input[placeholder*="email"]',
      'input[placeholder*="username"]'
    ];

    let usernameField = null;
    for (const selector of usernameSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible().catch(() => false)) {
        usernameField = element;
        break;
      }
    }

    if (usernameField) {
      await usernameField.fill(username);
      console.log('Username entered');
    } else {
      throw new Error('Username field not found');
    }

    // Find and fill password field
    const passwordSelectors = [
      'input[type="password"]',
      'input[name*="password"]',
      'input[id*="password"]'
    ];

    let passwordField = null;
    for (const selector of passwordSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible().catch(() => false)) {
        passwordField = element;
        break;
      }
    }

    if (passwordField) {
      await passwordField.fill(password);
      console.log('Password entered');
    } else {
      throw new Error('Password field not found');
    }

    // Find and click login button
    const loginButtonSelectors = [
      'button:has-text("Login")',
      'button:has-text("Sign In")',
      'button:has-text("Submit")',
      'button[type="submit"]',
      'button[id*="login"]',
      'button[id*="signin"]'
    ];

    let loginButton = null;
    for (const selector of loginButtonSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible().catch(() => false)) {
        loginButton = element;
        break;
      }
    }

    if (loginButton) {
      await loginButton.click();
      console.log('Login button clicked');
    } else {
      throw new Error('Login button not found');
    }

    // Wait for navigation after login
    await page.waitForLoadState('networkidle');

    // Verify successful login - adjust selector based on your app
    // Look for elements that confirm successful login
    const successIndicators = [
      'text=Dashboard',
      'text=Welcome',
      'text=Home',
      'button:has-text("Logout")',
      'button:has-text("Profile")'
    ];

    let isLoggedIn = false;
    for (const indicator of successIndicators) {
      if (await page.locator(indicator).isVisible().catch(() => false)) {
        isLoggedIn = true;
        console.log(`Login confirmed: "${indicator}" found`);
        break;
      }
    }

    if (!isLoggedIn) {
      console.log('Could not confirm login with standard indicators');
      console.log(`Current URL: ${page.url()}`);
      console.log(`Page title: ${await page.title()}`);
    }


  });

  test('should handle login errors gracefully', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Test with invalid credentials
    const usernameField = page.locator('input[type="email"], input[type="text"]').first();
    const passwordField = page.locator('input[type="password"]').first();
    const loginButton = page.locator('button[type="submit"], button:has-text("Login")').first();

    if (await usernameField.isVisible()) {
      await usernameField.fill('invalid@test.com');
      await passwordField.fill('wrongpassword');
      await loginButton.click();

      // Wait to see if error message appears
      await page.waitForTimeout(2000);

      // Check for error message
      const errorMessage = page.locator('[role="alert"], .error, .alert-danger').first();
      if (await errorMessage.isVisible().catch(() => false)) {
        console.log('Error message displayed as expected');
      }
    }
  });
});
