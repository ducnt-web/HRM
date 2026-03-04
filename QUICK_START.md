# 🚀 HRM App Automation - Setup Complete!

## ✅ What Has Been Created

### 1. Page Object Model
**File**: `tests/pages/HRMLoginPage.ts`
- Reusable page object for HRM login interactions
- Methods: `login()`, `enterUsername()`, `enterPassword()`, etc.
- Best practice pattern for maintainable tests

### 2. Test Suites

#### Main Test Suite
**File**: `tests/hrm-login-workflow.spec.ts`
- ✓ Complete login flow automation
- ✓ Form element verification
- ✓ Page load error detection
- ✓ Dashboard access confirmation

#### Advanced Tests
**File**: `tests/hrm-advanced-scenarios.spec.ts`
- ✓ Multi-account login testing (data-driven)
- ✓ Invalid credential handling
- ✓ Empty credential validation
- ✓ Session persistence
- ✓ Password field masking
- ✓ Performance testing
- ✓ Keyboard navigation testing
- ✓ API interception testing

#### Additional Tests
- `tests/hrm-login.spec.ts` - Basic login test
- `tests/login.spec.ts` - General login test

### 3. Configuration Files
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore patterns
- `playwright.config.ts` - Test configuration
- `tsconfig.json` - TypeScript configuration

### 4. Documentation
- `HRM_AUTOMATION_GUIDE.md` - Complete guide with all commands
- `QUICK_START.md` - This file
- `run-hrm-tests.sh` - Linux/Mac automation script
- `run-hrm-tests.bat` - Windows automation script

## 🔐 Credentials

```
Username: ducnt@dgroup.co
Password: Dsv!@#123
URL: https://dev.hrmapp.org/
```

## 🚀 Quick Start Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests with Automatic Report
These commands run tests **and automatically open the HTML report** in your browser:
```bash
npm run test:report                # All tests
npm run test:hrm:report            # Only HRM tests
npm run test:workflow:report       # Only workflow test
```

### 3. Run Tests Only (without report)
```bash
npm run test                       # All tests
npm run test:hrm                   # Only HRM tests
npm run test:workflow              # Only workflow test
```

### 4. Interactive & Debug Modes
```bash
npm run test:ui                    # Interactive Test UI
npm run test:debug                 # Step-by-step debugging
```

### 5. View Report (if already run)
```bash
npm run report                     # Open HTML report in browser
```

### 6. Advanced Commands
```bash
npx playwright test tests/hrm-login-workflow.spec.ts --headed    # Run in browser
npx playwright test tests/hrm-advanced-scenarios.spec.ts  --headed    # Run in browser
npx playwright test tests/hrm-login-workflow.spec.ts -g "search" # Search by test name
```

## 📁 Project Structure

```
playwright-project/
├── tests/
│   ├── pages/
│   │   └── HRMLoginPage.ts                 # Page Object Model
│   ├── hrm-login.spec.ts                   # Basic test
│   ├── hrm-login-workflow.spec.ts          # Main test suite
│   ├── hrm-advanced-scenarios.spec.ts      # Advanced scenarios
│   └── login.spec.ts                       # General login test
├── src/
│   └── mcp-server.ts                       # MCP server (separate feature)
├── .env.example                            # Environment template
├── .gitignore                              # Git ignore patterns
├── HRM_AUTOMATION_GUIDE.md                 # Full documentation
├── play wright.config.ts                   # Test configuration
├── package.json                            # Dependencies
├── tsconfig.json                           # TypeScript config
├── run-hrm-tests.sh                        # Linux/Mac script
└── run-hrm-tests.bat                       # Windows script
```

## 🎯 Test Coverage

### Login Workflow Tests
- ✅ Navigate to HRM App
- ✅ Enter username
- ✅ Enter password
- ✅ Submit login form
- ✅ Wait for page load
- ✅ Verify dashboard access

### Form Validation Tests
- ✅ Username field visibility
- ✅ Password field visibility
- ✅ Login button visibility
- ✅ Password masking
- ✅ Empty credential handling
- ✅ Invalid credential handling

### Advanced Tests
- ✅ Multiple account testing
- ✅ Session persistence
- ✅ Performance metrics
- ✅ Keyboard navigation
- ✅ API response validation
- ✅ Error handling

## 🎮 Different Ways to Run Tests

### Run Specific Test
```bash
npx playwright test hrm-login-workflow.spec.ts -g "Complete login flow"
```

### Run Against Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run with Specific Timeout
```bash
npx playwright test --timeout=60000
```

### Run with Video Recording
```bash
npx playwright test --headed --video=on
```

### Generate Different Reports
```bash
npx playwright test --reporter=json      # JSON format
npx playwright test --reporter=html      # HTML report
npx playwright test --reporter=list      # List format
npx playwright test --reporter=junit     # JUnit format
```

## 🔧 Customization

### Change Credentials
Edit `.env` file or update test files directly:
```typescript
const username = 'your-email@example.com';
const password = 'your-password';
```

### Update Selectors
If form element selectors change, update `HRMLoginPage.ts`:
```typescript
this.usernameInput = page.locator('YOUR_SELECTOR');
this.passwordInput = page.locator('YOUR_SELECTOR');
this.loginButton = page.locator('YOUR_SELECTOR');
```

### Add More Test Scenarios
Create new `.spec.ts` files in `tests/` directory:
```typescript
import { test } from '@playwright/test';
import { HRMLoginPage } from './pages/HRMLoginPage';

test('Your test name', async ({ page }) => {
  const loginPage = new HRMLoginPage(page);
  // Your test code
});
```

## 📊 Results and Artifacts

After running tests, you'll find:
  - `after-login.png` - Another post-login state
- **HTML Report**: `playwright-report/`
- **JSON Report**: `test-results/`

View results:
```bash
npx playwright show-report
```

## 🐛 Troubleshooting

### Tests Can't Find Elements
1. Run with `--headed` to see the browser
2. Run with `--debug` for step-by-step inspection
3. Check if page structure matches your selectors

### Element Selectors Not Working
Update in `HRMLoginPage.ts`:
```typescript
// Try different selectors
page.locator('input[name="email"]')
page.locator('input[id="username"]')
page.locator('[data-testid="username"]')
page.locator('text=Username')
```

### Login Fails
1. Verify credentials are correct
2. Check if website is accessible
3. Look for 2FA or additional security prompts
4. Run in headed mode: `--headed`

### Timeout Issues
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

## 📚 Learn More

- [Playwright Documentation](https://playwright.dev)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Debugging Guide](https://playwright.dev/docs/debug)

## ✨ Next Steps

1. **Run Initial Test**
   ```bash
   npx playwright test tests/hrm-login-workflow.spec.ts --headed
   ```


3. **Customize for Your Needs**
   - Update selectors if form structure is different
   - Add more test scenarios
   - Integrate with CI/CD

4. **Extend Tests**
   - Navigate to dashboard features
   - Test different user roles
   - Create end-to-end workflows
   - Add performance monitoring

## 🎉 You're All Set!

Your Playwright automation is ready to use. Run the tests and watch them automate your HRM app login flow!

**Questions?** Refer to `HRM_AUTOMATION_GUIDE.md` for detailed documentation.
