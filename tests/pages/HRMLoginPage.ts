import { Page, Locator } from '@playwright/test';

export class HRMLoginPage {
  readonly page: Page;
  readonly baseURL = 'https://dev.hrmapp.org/';
  // Selectors for login form elements
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Do not cache locators that may not exist; resolve at use time instead
    this.usernameInput = page.locator('input[placeholder="Enter your email here"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  /**
   * Navigate to the HRM App login page
   */
  async goto() {
    try {
      
      await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to navigate to ${this.baseURL}: ${error}`);
    }
    
    // Verify form exists before proceeding
    try {
      await this.page.waitForSelector(
        'input[type="email"], input[type="text"], input[type="password"], button[type="submit"], button:has-text("Login")',
        { state: 'attached', timeout: 10000 }
      );
    } catch (error) {
      throw new Error(`Login form failed to load at ${this.page.url()}: ${error}`);
    }
  }

  /**
   * Enter username in the username field
   */
  async enterUsername(username: string) {
    // try primary locator first
    try {
      await this.usernameInput.first().waitFor({ state: 'visible', timeout: 5000 });
      await this.usernameInput.first().fill(username);
      return;
    } catch {
      // fallback to alternative patterns
    }

    const altSelectors = [
      'input[name*="email"]',
      'input[id*="username"]',
      'input[placeholder*="email"]',
      'input[placeholder*="username"]',
      // some pages use generic text inputs or aria-labels
      'input[type="text"]',
      'input[aria-label*="email"]',
    ];
    for (const sel of altSelectors) {
      const elem = this.page.locator(sel).first();
      if (await elem.isVisible().catch(() => false)) {
        await elem.fill(username);
        return;
      }
    }
    // field not found - log warning instead of throwing
    console.warn('Username field not found - page may not have loaded properly');
  }

  /**
   * Enter password in the password field
   */
  async enterPassword(password: string) {
    try {
      await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.passwordInput.fill(password);
      return;
    } catch {
      // fallback to alternative patterns
    }

    const altSelectors = [
      'input[name*="password"]',
      'input[id*="password"]',
      'input[placeholder*="password"]',
      'input[placeholder*="mật khẩu"]',
      'input[aria-label*="password"]',
    ];
    for (const sel of altSelectors) {
      const elem = this.page.locator(sel).first();
      if (await elem.isVisible().catch(() => false)) {
        await elem.fill(password);
        return;
      }
    }
    // field not found - throw error instead of silently failing
    throw new Error('Password field not found - unable to locate input with type="password" or fallback selectors');
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    try {
      await this.loginButton.first().waitFor({ state: 'visible', timeout: 5000 });
      await this.loginButton.first().click();
      return;
    } catch {
      // fallback selectors
    }

    const altSelectors = [
      'button:has-text("Login")',
      'button:has-text("Sign In")',
      'button:has-text("Sign in")',
      'button:has-text("Đăng nhập")',
      'button[type="submit"]',
      'input[type="submit"]',
      'input[type="button"][value*="Log" i]',
      'form button',           // any button inside form as final fallback
      'button[class*="login"]',
      'button[class*="sign-in"]'
    ];
    for (const sel of altSelectors) {
      const elem = this.page.locator(sel).first();
      if (await elem.isVisible().catch(() => false)) {
        // Special check for "Sign In" to avoid "Sign In with Microsoft" or "Sign in with Google"
        if (sel === 'button:has-text("Sign In")') {
          const text = await elem.textContent();
          if (text && (text.trim() !== 'Sign In' || text.includes('with'))) {
            continue; // skip if not exactly "Sign In" or contains "with"
          }
        }
        await elem.click();
        return;
      }
    }
    // button not found - log warning instead of throwing
    console.warn('Login button not found - page may not have loaded properly');
  }

  /**
   * Perform complete login flow
   */
  async login(username: string, password: string) {
    await this.goto();
    await this.enterUsername(username);
    await this.page.waitForTimeout(1000); // Pause 5 seconds after filling username
    await this.enterPassword(password);
    await this.page.waitForTimeout(1000); // Pause 5 seconds after filling password
    await this.clickLogin();
    await this.page.waitForTimeout(500);
    // Wait for navigation after login - allow to timeout gracefully
    await this.page.waitForLoadState('networkidle').catch(() => {
      console.warn('Post-login page did not reach networkidle');
    });
  }

  /**
   * Check if login was successful
   */
  async isLoginSuccessful(): Promise<boolean> {
    const successIndicators = [
      'text=Welcome to HRM!',
      'text=Calendar',
      'text=Account Management',
      'text=Employee',
      'button:has-text("Logout")',
      'text=Profile'
    ];
    await this.page.waitForTimeout(1000);
    for (const indicator of successIndicators) {
      if (await this.page.locator(indicator).isVisible({ timeout: 10000 }).catch(() => false)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get current page URL
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    try {
      return await this.page.title();
    } catch {
      return '';
    }
  }

  /**
   * Perform logout by clicking user profile icon and then logout button
   */
  async logout() {
    // Step 5: Click the user profile icon in the top right corner
    console.log('Performing action: click the user profile icon in the top right corner');
    const profileIcon = this.page.locator('xpath=/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/img[1]');
    await profileIcon.waitFor({ state: 'visible', timeout: 5000 });
    await profileIcon.click();

    // Step 6: Click the Logout button
    console.log('Performing action: click the Logout button');
    const logoutButton = this.page.locator('xpath=/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[2]/div[5]/p[1]');
    await logoutButton.waitFor({ state: 'visible', timeout: 5000 });
    await logoutButton.click();

    // Wait for navigation back to login page
    await this.page.waitForLoadState('networkidle').catch(() => {
      console.warn('Post-logout page did not reach networkidle');
    });
  }
}


