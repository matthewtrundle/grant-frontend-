# 🧪 Comprehensive Testing Strategy for Custom Clerk Authentication

**Project:** Grant Automation Platform
**Components:** Custom Sign-In & Sign-Up (Clerk Headless)
**Date:** 2025-11-25
**Status:** Ready for Testing

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Manual Testing Checklist](#manual-testing-checklist)
3. [Automated Testing Strategy](#automated-testing-strategy)
4. [Test Data Setup](#test-data-setup)
5. [Visual Regression Testing](#visual-regression-testing)
6. [Security Testing](#security-testing)
7. [Performance Testing](#performance-testing)
8. [Accessibility Testing](#accessibility-testing)
9. [Integration Points](#integration-points)

---

## 🚀 Quick Start

### Prerequisites
```bash
# 1. Ensure dev server is running
npm run dev

# 2. Verify Clerk is configured
# Check .env.local has:
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - CLERK_SECRET_KEY
```

### Test URLs
- Sign In: `http://localhost:3009/sign-in`
- Sign Up: `http://localhost:3009/sign-up`
- Dashboard: `http://localhost:3009/dashboard`
- Onboarding: `http://localhost:3009/onboarding`

---

## 📝 Manual Testing Checklist

### Sign-In Component Testing

#### ✅ Happy Path
- [ ] Navigate to `/sign-in`
- [ ] Verify circuit pattern background loads
- [ ] Verify glassmorphic card displays correctly
- [ ] Enter valid email: `test@example.com`
- [ ] Enter valid password: `TestPassword123!`
- [ ] Click "Sign In" button
- [ ] **Expected:** Loading spinner appears
- [ ] **Expected:** Redirect to `/dashboard`
- [ ] **Expected:** User session is active (check header/user button)

#### ❌ Error Scenarios

**Test 1: Empty Form Submission**
- [ ] Leave both fields empty
- [ ] Click "Sign In"
- [ ] **Expected:** Error message: "Please fill in all fields"
- [ ] **Expected:** No API call made

**Test 2: Invalid Email Format**
- [ ] Enter: `notanemail`
- [ ] Enter password: `Test123!`
- [ ] Click "Sign In"
- [ ] **Expected:** Error message: "Please enter a valid email address"

**Test 3: Invalid Credentials**
- [ ] Enter: `wrong@example.com`
- [ ] Enter: `WrongPassword123!`
- [ ] Click "Sign In"
- [ ] **Expected:** Error message: "Invalid email or password"
- [ ] **Expected:** No redirect occurs

**Test 4: Account Not Found**
- [ ] Enter email that doesn't exist in Clerk
- [ ] Enter any password
- [ ] **Expected:** Error message: "No account found with this email address"

**Test 5: Rate Limiting**
- [ ] Attempt sign-in 10+ times with wrong password
- [ ] **Expected:** Error message: "Too many attempts. Please try again later"

#### 🎨 UI/UX Testing

- [ ] Password show/hide toggle works
- [ ] Error messages clear when user starts typing
- [ ] Loading state shows spinner and disables button
- [ ] "Sign up instead" link navigates to `/sign-up`
- [ ] Form is responsive on mobile (test 375px, 768px, 1024px)
- [ ] Circuit background visible on all screen sizes
- [ ] Gradient orbs animate smoothly

---

### Sign-Up Component Testing

#### ✅ Happy Path - Step 1 (Email & Password)

- [ ] Navigate to `/sign-up`
- [ ] Verify "Step 1 of 2" indicator shows
- [ ] Enter email: `newuser@example.com`
- [ ] Enter password: `SecurePass123!`
- [ ] **Expected:** Password strength meter shows "Strong" (green)
- [ ] Enter confirm password: `SecurePass123!`
- [ ] **Expected:** Green border on confirm password field
- [ ] Click "Continue"
- [ ] **Expected:** Smooth transition to Step 2
- [ ] **Expected:** "Step 2 of 2" indicator shows

#### ✅ Happy Path - Step 2 (Email Verification)

- [ ] **Expected:** Message shows "We've sent a verification code to {email}"
- [ ] Check email for 6-digit code (e.g., `123456`)
- [ ] Enter verification code in individual digit inputs
- [ ] **Expected:** Auto-focus moves to next digit as you type
- [ ] **Expected:** All 6 digits filled
- [ ] Click "Verify Email"
- [ ] **Expected:** Loading spinner appears
- [ ] **Expected:** Redirect to `/onboarding`
- [ ] **Expected:** User session is active
- [ ] **Expected:** Clerk publicMetadata includes `onboardingComplete: false`

#### ❌ Error Scenarios - Step 1

**Test 1: Weak Password**
- [ ] Enter password: `123`
- [ ] **Expected:** Strength meter shows "Too short" (red)
- [ ] **Expected:** Continue button disabled

**Test 2: Password Mismatch**
- [ ] Enter password: `SecurePass123!`
- [ ] Enter confirm: `DifferentPass123!`
- [ ] **Expected:** Red border on confirm field
- [ ] **Expected:** Error text: "Passwords don't match"
- [ ] **Expected:** Continue button disabled

**Test 3: Email Already Exists**
- [ ] Enter email of existing user
- [ ] Enter valid password
- [ ] Click Continue
- [ ] **Expected:** Error message from Clerk about existing account

**Test 4: Invalid Email**
- [ ] Enter: `notanemail`
- [ ] **Expected:** Form validation prevents submission

#### ❌ Error Scenarios - Step 2

**Test 1: Invalid Verification Code**
- [ ] Enter wrong code: `000000`
- [ ] Click "Verify Email"
- [ ] **Expected:** Error message: "Invalid verification code"
- [ ] **Expected:** Inputs cleared for retry

**Test 2: Expired Code**
- [ ] Wait 10+ minutes after receiving code
- [ ] Enter original code
- [ ] **Expected:** Error about expired code
- [ ] **Expected:** Resend button available

**Test 3: Resend Code**
- [ ] Click "Resend code"
- [ ] **Expected:** New email sent
- [ ] **Expected:** 60-second countdown begins
- [ ] **Expected:** Resend button disabled during countdown
- [ ] **Expected:** After 60s, resend button re-enables

**Test 4: Back Button**
- [ ] Click "← Back to email entry"
- [ ] **Expected:** Return to Step 1
- [ ] **Expected:** Form data preserved (email, password)
- [ ] **Expected:** Smooth transition animation

#### 🎨 UI/UX Testing - Sign-Up

**Password Strength Meter**
- [ ] Enter `123` → **Expected:** Red, "Too short"
- [ ] Enter `password` → **Expected:** Orange, "Weak"
- [ ] Enter `Password123` → **Expected:** Yellow, "Fair"
- [ ] Enter `Password123!` → **Expected:** Green, "Strong"

**Verification Code Input**
- [ ] Type single digit in first field → **Expected:** Auto-focus next
- [ ] Press Backspace on empty field → **Expected:** Focus previous
- [ ] Paste 6-digit code → **Expected:** All fields populated
- [ ] Tab navigation → **Expected:** Moves through fields correctly

**Responsive Design**
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1024px+ width)
- [ ] Verify step indicator responsive
- [ ] Verify verification code inputs stack properly

---

## 🤖 Automated Testing Strategy

### Recommended Tools

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev jest jest-environment-jsdom
npm install --save-dev @playwright/test
```

### Unit Tests (Jest + React Testing Library)

#### Sign-In Component Tests

```typescript
// __tests__/auth/sign-in.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CustomSignInForm from '@/app/(auth)/sign-in/[[...sign-in]]/page';

jest.mock('@clerk/nextjs');
jest.mock('next/navigation');

describe('CustomSignInForm', () => {
  const mockSignIn = jest.fn();
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useSignIn as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
    });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders sign-in form', () => {
    render(<CustomSignInForm />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows error for empty form submission', async () => {
    render(<CustomSignInForm />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
    });
  });

  it('shows error for invalid email format', async () => {
    render(<CustomSignInForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'notanemail' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('calls Clerk API on valid submission', async () => {
    mockSignIn.create.mockResolvedValue({
      status: 'complete',
      createdSessionId: 'sess_123',
    });

    render(<CustomSignInForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn.create).toHaveBeenCalledWith({
        identifier: 'test@example.com',
        password: 'Test123!',
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('toggles password visibility', () => {
    render(<CustomSignInForm />);

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /show\/hide password/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
```

#### Sign-Up Component Tests

```typescript
// __tests__/auth/sign-up.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSignUp } from '@clerk/nextjs';
import CustomSignUpForm from '@/app/(auth)/sign-up/[[...sign-up]]/page';

jest.mock('@clerk/nextjs');

describe('CustomSignUpForm', () => {
  const mockSignUp = {
    create: jest.fn(),
    prepareEmailAddressVerification: jest.fn(),
    attemptEmailAddressVerification: jest.fn(),
  };

  beforeEach(() => {
    (useSignUp as jest.Mock).mockReturnValue({
      isLoaded: true,
      signUp: mockSignUp,
      setActive: jest.fn(),
    });
  });

  it('shows step 1 initially', () => {
    render(<CustomSignUpForm />);
    expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('validates password strength', () => {
    render(<CustomSignUpForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);

    fireEvent.change(passwordInput, { target: { value: '123' } });
    expect(screen.getByText(/too short/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    expect(screen.getByText(/strong/i)).toBeInTheDocument();
  });

  it('validates password match', () => {
    render(<CustomSignUpForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmInput, { target: { value: 'Different!' } });

    expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
  });

  it('proceeds to step 2 on valid submission', async () => {
    mockSignUp.create.mockResolvedValue({ status: 'missing_requirements' });
    mockSignUp.prepareEmailAddressVerification.mockResolvedValue({});

    render(<CustomSignUpForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText(/step 2 of 2/i)).toBeInTheDocument();
    });
  });
});
```

### Integration Tests (Playwright)

```typescript
// e2e/auth-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('complete sign-up flow', async ({ page }) => {
    // Navigate to sign-up
    await page.goto('/sign-up');

    // Step 1: Fill form
    await page.fill('[id="email"]', 'newuser@example.com');
    await page.fill('[id="password"]', 'SecurePass123!');
    await page.fill('[id="confirmPassword"]', 'SecurePass123!');

    // Verify password strength indicator
    await expect(page.locator('text=Strong')).toBeVisible();

    // Submit step 1
    await page.click('button:has-text("Continue")');

    // Step 2: Verify step indicator changed
    await expect(page.locator('text=Step 2 of 2')).toBeVisible();

    // Enter verification code (you'd need to mock or retrieve from test email)
    const codeInputs = page.locator('input[type="text"][maxlength="1"]');
    await codeInputs.nth(0).fill('1');
    await codeInputs.nth(1).fill('2');
    await codeInputs.nth(2).fill('3');
    await codeInputs.nth(3).fill('4');
    await codeInputs.nth(4).fill('5');
    await codeInputs.nth(5).fill('6');

    // Submit verification (mock would need to accept test code)
    await page.click('button:has-text("Verify Email")');

    // Verify redirect to onboarding
    await expect(page).toHaveURL('/onboarding');
  });

  test('sign-in with existing user', async ({ page }) => {
    await page.goto('/sign-in');

    await page.fill('[id="email"]', 'test@example.com');
    await page.fill('[id="password"]', 'TestPassword123!');

    await page.click('button:has-text("Sign In")');

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');

    // Verify user is authenticated (check for user menu or name)
    await expect(page.locator('[data-testid="user-button"]')).toBeVisible();
  });
});
```

---

## 🎭 Test Data Setup

### Test User Accounts

Create these test accounts in Clerk Dashboard:

```typescript
// Test data configuration
export const TEST_USERS = {
  VALID_USER: {
    email: 'test@example.com',
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User',
  },
  ADMIN_USER: {
    email: 'admin@example.com',
    password: 'AdminPass123!',
    role: 'admin',
  },
};

export const TEST_VERIFICATION_CODES = {
  VALID: '424242', // Configure in Clerk test mode
  INVALID: '000000',
  EXPIRED: '111111',
};
```

### Mock Clerk Responses

```typescript
// __mocks__/@clerk/nextjs.ts
export const useSignIn = jest.fn(() => ({
  isLoaded: true,
  signIn: {
    create: jest.fn(),
    setActive: jest.fn(),
  },
}));

export const useSignUp = jest.fn(() => ({
  isLoaded: true,
  signUp: {
    create: jest.fn(),
    prepareEmailAddressVerification: jest.fn(),
    attemptEmailAddressVerification: jest.fn(),
    createdSessionId: 'sess_test_123',
  },
  setActive: jest.fn(),
}));
```

---

## 📸 Visual Regression Testing

### Chromatic / Percy Setup

```bash
npm install --save-dev @chromatic-com/storybook
```

### Screenshots to Capture

**Sign-In Page:**
- [ ] Initial state (empty form)
- [ ] Filled form (before submission)
- [ ] Error state (invalid credentials)
- [ ] Loading state
- [ ] Mobile view (375px)
- [ ] Tablet view (768px)
- [ ] Desktop view (1440px)

**Sign-Up Page:**
- [ ] Step 1 - Empty
- [ ] Step 1 - Weak password
- [ ] Step 1 - Strong password
- [ ] Step 1 - Password mismatch
- [ ] Step 2 - Verification view
- [ ] Step 2 - Invalid code error
- [ ] Resend countdown active

### Responsive Breakpoints

```typescript
const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};
```

---

## 🔒 Security Testing

### Checklist

- [ ] **XSS Prevention:** Enter `<script>alert('xss')</script>` in all inputs
  - **Expected:** Rendered as text, not executed

- [ ] **SQL Injection:** Enter `' OR '1'='1` in inputs
  - **Expected:** Treated as literal string

- [ ] **Password Visibility:** Verify password is masked by default

- [ ] **HTTPS Enforcement:** Check production uses HTTPS

- [ ] **Session Security:** Verify JWT tokens are httpOnly cookies

- [ ] **CSRF Protection:** Clerk handles this automatically

- [ ] **Rate Limiting:** Test multiple failed login attempts
  - **Expected:** Temporary lockout after 5-10 attempts

- [ ] **Password Requirements:** Verify minimum 8 characters enforced

---

## ⚡ Performance Testing

### Metrics to Track

```typescript
// Add to components for performance monitoring
import { useEffect } from 'react';

useEffect(() => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart);
}, []);
```

### Benchmarks

- [ ] **Initial Page Load:** < 2 seconds
- [ ] **Time to Interactive:** < 3 seconds
- [ ] **Form Submission Response:** < 1 second
- [ ] **Step Transition Animation:** < 300ms
- [ ] **Lighthouse Score:** > 90 (Performance)

### Tools

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=http://localhost:3009/sign-in

# Bundle Analyzer
npm install @next/bundle-analyzer
```

---

## ♿ Accessibility Testing

### WCAG 2.1 AA Compliance

#### Keyboard Navigation
- [ ] Tab through all form fields in correct order
- [ ] Enter key submits form
- [ ] Escape key clears errors (if implemented)
- [ ] Arrow keys navigate verification code inputs

#### Screen Reader Testing
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] All form labels announced correctly
- [ ] Error messages announced with `aria-live`
- [ ] Button states announced (loading, disabled)
- [ ] Step indicator announced

#### Color Contrast
- [ ] All text meets 4.5:1 contrast ratio
- [ ] Error messages have sufficient contrast
- [ ] Focus indicators clearly visible
- [ ] Password strength colors distinguishable

#### Tools

```bash
# Install axe DevTools browser extension
# Run automated accessibility scan
npm install --save-dev @axe-core/react
```

### Automated Accessibility Tests

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<CustomSignInForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 🔗 Integration Points to Verify

### Clerk API Integration

- [ ] **Sign-In API Call:**
  ```typescript
  await signIn.create({ identifier, password })
  ```
  - Verify network request in DevTools
  - Check request payload
  - Verify response structure

- [ ] **Sign-Up API Calls:**
  ```typescript
  await signUp.create({ emailAddress, password })
  await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
  await signUp.attemptEmailAddressVerification({ code })
  ```

- [ ] **Session Management:**
  - Verify `setActive({ session })` called on success
  - Check session cookie set in browser
  - Verify session persists on page reload

### Navigation/Routing

- [ ] **Sign-In Success:** Redirects to `/dashboard`
- [ ] **Sign-Up Success:** Redirects to `/onboarding`
- [ ] **Sign-Up Link:** Navigates from sign-in to sign-up
- [ ] **Sign-In Link:** Navigates from sign-up to sign-in
- [ ] **Protected Routes:** Unauthenticated users redirect to sign-in

### Onboarding Flow Handoff

- [ ] User data passed correctly to onboarding
- [ ] Clerk `publicMetadata` updated with:
  ```typescript
  {
    companyName: string,
    profileId: string,
    trl: number,
    technologySummary: string,
    uploadedFiles: string[],
    onboardingComplete: boolean
  }
  ```

---

## 📊 Test Execution Schedule

### Pre-Production Checklist

**Day 1: Manual Testing**
- [ ] Run all manual test scenarios
- [ ] Document any bugs found
- [ ] Create bug tickets

**Day 2: Automated Tests**
- [ ] Write unit tests for both components
- [ ] Achieve >80% code coverage
- [ ] Set up CI/CD to run tests

**Day 3: Integration & E2E**
- [ ] Write Playwright E2E tests
- [ ] Test complete user journeys
- [ ] Verify cross-browser compatibility

**Day 4: Performance & Security**
- [ ] Run Lighthouse audits
- [ ] Perform security testing
- [ ] Load test with 100+ concurrent users

**Day 5: Accessibility & Polish**
- [ ] Full accessibility audit
- [ ] Visual regression testing
- [ ] Final UAT with stakeholders

---

## ✅ Definition of Done

All tests must pass before production deployment:

- [ ] ✅ All manual test scenarios passed
- [ ] ✅ Unit test coverage > 80%
- [ ] ✅ E2E tests passing
- [ ] ✅ No accessibility violations
- [ ] ✅ Lighthouse score > 90
- [ ] ✅ Security checklist completed
- [ ] ✅ Cross-browser tested (Chrome, Firefox, Safari)
- [ ] ✅ Mobile responsive verified
- [ ] ✅ Error handling tested thoroughly
- [ ] ✅ UAT sign-off received

---

## 🐛 Bug Report Template

```markdown
## Bug Report

**Title:** [Brief description]

**Environment:**
- Browser: [Chrome 120, Safari 17, etc.]
- Device: [Desktop, iPhone 14, etc.]
- URL: [/sign-in or /sign-up]

**Steps to Reproduce:**
1. Navigate to /sign-in
2. Enter email: test@example.com
3. Click submit
4. ...

**Expected Behavior:**
Should redirect to /dashboard

**Actual Behavior:**
Error message appears: "..."

**Screenshots:**
[Attach screenshot]

**Console Errors:**
```
[Paste any console errors]
```

**Severity:**
- [ ] Critical (blocking)
- [ ] High (major functionality broken)
- [ ] Medium (workaround exists)
- [ ] Low (minor issue)
```

---

## 📚 Resources

### Documentation
- [Clerk Custom Flows](https://clerk.com/docs/custom-flows/overview)
- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles)
- [Playwright Documentation](https://playwright.dev)

### Tools Used
- Jest - Unit testing
- React Testing Library - Component testing
- Playwright - E2E testing
- axe - Accessibility testing
- Lighthouse - Performance auditing

---

**Next Steps:**
1. ✅ Fix syntax error (completed)
2. 🔄 Run through manual testing checklist
3. 📝 Set up automated tests
4. 🚀 Deploy to staging for QA

---

**Document Version:** 1.0
**Last Updated:** 2025-11-25
**Owner:** Development Team
