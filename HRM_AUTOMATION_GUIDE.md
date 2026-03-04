# HRM App Automation Guide

Complete automation workflow for HRM App login at https://dev.hrmapp.org/

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Login Tests
```bash
# Run all HRM tests
npx playwright test tests/hrm-login*.spec.ts

# Run in headed mode (see the browser)
npx playwright test tests/hrm-login-workflow.spec.ts --headed

# Run with debugging
npx playwright test tests/hrm-login-workflow.spec.ts --debug

# Run in interactive UI mode
npx playwright test tests/hrm-login-workflow.spec.ts --ui
```

## Test Files

### Main Test Suite
**Location**: `tests/hrm-login-workflow.spec.ts`

Contains 4 test scenarios:
1. **Complete login flow** - Full workflow from navigation to dashboard verification
2. **Verify form elements** - Checks username, password, and button visibility
3. **Page load validation** - Detects console errors
4. **Credentials verification** - Tests with the provided credentials

### Page Object Model
**Location**: `tests/pages/HRMLoginPage.ts`

Provides clean interface for:
- `goto()` - Navigate to login page
- `enterUsername(username)` - Fill username field
- `enterPassword(password)` - Fill password field
- `clickLogin()` - Submit login form
- `login(username, password)` - Complete login workflow
- `isLoginSuccessful()` - Verify successful login
- `getCurrentURL()` - Get current page URL
- `getPageTitle()` - Get page title

## Credentials

- **Username**: `ducnt@dgroup.co`
- **Password**: `Dsv!@#123`
- **URL**: `https://dev.hrmapp.org/`

## Environment Variables (Optional)

Copy `.env.example` to `.env` to customize:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
HRM_USERNAME=your_email@example.com
HRM_PASSWORD=your_password
HRM_BASE_URL=https://dev.hrmapp.org/
```

## Test Results

Tests generate:
- **Reports**: `test-results/`
  - HTML report with detailed results
  - Video recordings (if configured)
- **Reports**: `test-results/`
  - HTML report with detailed results
  - Video recordings (if configured)

### View HTML Report
```bash
npx playwright show-report
```

## Advanced Commands

### Run Specific Test
```bash
npx playwright test hrm-login-workflow.spec.ts -g "Complete login flow"
```

### Run with Specific Browser
```bash
npx playwright test tests/hrm-login-workflow.spec.ts --project=chromium
npx playwright test tests/hrm-login-workflow.spec.ts --project=firefox
npx playwright test tests/hrm-login-workflow.spec.ts --project=webkit
```

### Debug Mode with Inspector
```bash
npx playwright test tests/hrm-login-workflow.spec.ts --debug
```

### Run Tests in Parallel
```bash
npx playwright test tests/hrm-login*.spec.ts --workers=2
```

### Generate Test Report
```bash
npx playwright test tests/hrm-login-workflow.spec.ts --reporter=html
npx playwright test tests/hrm-login-workflow.spec.ts --reporter=json
```

## Troubleshooting

### Test Fails to Find Elements
1. Run in headed mode to see what's happening: `--headed`
2. Check if element selectors match current page structure
4. Update selectors in `HRMLoginPage.ts`

### Authentication Fails
1. Verify credentials in `.env` file
2. Check if account is active/not locked
3. Verify URL is correct: `https://dev.hrmapp.org/`
4. Look for any 2FA or additional security prompts

### Timeout Issues
1. Increase timeout in tests if page loads slowly
2. Check network conditions
3. Run with `--debug` to inspect step-by-step

## Configuration

**Playwright Config** (`playwright.config.ts`):
- Set `timeout: 30000` for test timeout
- Configure `retries` for CI environments
- Set `use.baseURL` if needed

## Project Structure

```
playwright-project/
├── tests/
│   ├── pages/
│   │   └── HRMLoginPage.ts          # Page object model
│   ├── hrm-login.spec.ts             # Initial login test
│   ├── hrm-login-workflow.spec.ts   # Main test suite
│   └── login.spec.ts                 # Basic login test
├── .env.example                      # Environment variables template
├── playwright.config.ts              # Test configuration
├── package.json                      # Dependencies
└── tsconfig.json                     # TypeScript config
```

## Best Practices

1. **Use Page Object Model** - Keep tests DRY and maintainable
2. **Environment Variables** - Never hardcode sensitive credentials
3. **Wait for Elements** - Use `waitFor()` instead of fixed delays
4. **Meaningful Assertions** - Clear test descriptions and expectations
6. **Error Handling** - Gracefully handle missing elements

## CI/CD Integration

For GitHub Actions or other CI systems:
```bash
# Install dependencies
npm install

# Run tests in CI mode
npx playwright test --reporter=json

# Generate coverage
npm run test:coverage
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
