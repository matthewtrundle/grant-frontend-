# Visual Testing Action Items

## Priority: CRITICAL 🔴

### 1. Fix Missing Asset (404 Error)
**Issue:** `grid-pattern.svg` is missing from `/public/` directory
**Impact:** About page hero section background pattern not displaying
**Location:** About page (`/about`)
**Action:**
```bash
# Create the SVG file
touch /Users/matthewrundle/Documents/grant-automation/frontend/public/grid-pattern.svg
```
Then add appropriate SVG content for the grid background pattern.

**Assignee:** Frontend/Design Team
**Estimated Time:** 15 minutes

---

## Priority: HIGH 🟡

### 2. Decide on Design System Consistency
**Issue:** Landing page uses alternating section backgrounds, but other pages don't
**Current State:**
- Landing page: `section-light` → `section-dark` → `section-light` → `section-dark` ✅
- Pricing page: All transparent sections ❌
- About page: All transparent sections ❌
- Contact page: All transparent sections ❌

**Decision Needed:**
- [ ] **Option A:** Apply alternating pattern to ALL marketing pages
- [ ] **Option B:** Document that landing page is unique; other pages intentionally different

**Action Items if Option A:**
```tsx
// Update /app/(marketing)/pricing/page.tsx
// Update /app/(marketing)/about/page.tsx
// Update /app/(marketing)/contact/page.tsx

// Wrap sections in:
<section className="section-light py-24 px-4 border-t border-gray-200">
  {/* Light section content */}
</section>

<section className="section-dark py-24 px-4 border-t border-gray-800">
  {/* Dark section content */}
</section>
```

**Assignee:** Design Lead + Frontend Team
**Estimated Time:** 2-4 hours (if implementing Option A)

---

### 3. Update Deprecated Clerk Props
**Issue:** Using deprecated `afterSignInUrl` and `afterSignUpUrl` props
**Impact:** Console warnings, will break in future Clerk versions
**Location:** `/app/layout.tsx` or Clerk provider component

**Action:**
```tsx
// BEFORE (deprecated):
<ClerkProvider
  afterSignInUrl="/dashboard"
  afterSignUpUrl="/dashboard"
>

// AFTER (current):
<ClerkProvider
  fallbackRedirectUrl="/dashboard"
>
```

**Reference:** https://clerk.com/docs/guides/custom-redirects#redirect-url-props

**Assignee:** Frontend Team
**Estimated Time:** 10 minutes

---

## Priority: MEDIUM 🟢

### 4. Review Protected Page Access Strategy
**Issue:** Most marketing pages require authentication
**Pages Affected:**
- All feature pages (`/features/*`)
- All solution pages (`/solutions/*`)
- Documentation (`/docs`, `/docs/*`)
- Blog (`/blog`)
- Case studies (`/case-studies`)

**Questions:**
- Are these pages intended to be public or gated?
- If public: Remove authentication requirement
- If gated: Is this the right UX for lead generation?

**SEO Impact:** Protected pages cannot be indexed by search engines

**Action Items:**
- [ ] Review product strategy: Should feature/solution pages be public?
- [ ] Consider: Hybrid approach (preview + gated full content)
- [ ] Update middleware to allow public access if needed

**Assignee:** Product Manager + Engineering Lead
**Estimated Time:** 1-2 hours (discussion + implementation)

---

### 5. Test Protected Pages
**Issue:** Cannot visually test feature, solution, docs, blog, case study pages
**Blocker:** Requires authentication

**Action Items:**
- [ ] Create test authentication flow for visual testing
- [ ] Run same visual regression tests on protected pages
- [ ] Verify design consistency across all pages
- [ ] Document any additional inconsistencies

**Assignee:** QA Engineer
**Estimated Time:** 2-3 hours

---

### 6. Cross-Browser Testing
**Issue:** Only tested in Chromium (via Playwright)
**Missing Coverage:** Firefox, Safari/WebKit

**Action Items:**
- [ ] Run visual tests in Firefox
- [ ] Run visual tests in WebKit (Safari)
- [ ] Document browser-specific rendering issues
- [ ] Fix any cross-browser compatibility issues

**Assignee:** QA Engineer
**Estimated Time:** 1-2 hours

---

## Priority: LOW 🔵

### 7. Add Input Autocomplete Attributes
**Issue:** Password fields missing `autocomplete="current-password"` attribute
**Impact:** Browser autofill may not work optimally (UX issue)
**Location:** Clerk sign-in form components

**Action:**
This is likely a Clerk component issue. Check if there's a prop to enable autocomplete attributes, or file an issue with Clerk if it's their responsibility.

**Assignee:** Frontend Team
**Estimated Time:** 30 minutes (research + implementation if possible)

---

### 8. Accessibility Audit
**Issue:** No formal accessibility testing performed
**Needed:**
- [ ] Run Lighthouse accessibility audit
- [ ] Run Axe DevTools scan
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Verify keyboard navigation (Tab order)
- [ ] Check color contrast ratios (WCAG AA/AAA)
- [ ] Verify ARIA labels and roles

**Assignee:** Accessibility Specialist / QA Engineer
**Estimated Time:** 4-6 hours

---

### 9. Set Up Automated Visual Regression Testing
**Issue:** Manual visual testing is time-consuming
**Goal:** Automate visual testing in CI/CD pipeline

**Action Items:**
- [ ] Set up Playwright visual comparison in CI
- [ ] Store baseline screenshots in Git LFS or visual testing service
- [ ] Configure automatic screenshot comparison on PR creation
- [ ] Set failure thresholds for pixel differences
- [ ] Integrate with GitHub Actions / CI pipeline

**Tools to Consider:**
- Playwright built-in visual comparison
- Percy (visual testing service)
- Chromatic (Storybook integration)
- Argos CI (open source)

**Assignee:** DevOps + Frontend Lead
**Estimated Time:** 4-8 hours (setup + documentation)

---

### 10. Performance Monitoring
**Issue:** No performance metrics captured during visual testing
**Goal:** Track Core Web Vitals and performance over time

**Action Items:**
- [ ] Add Lighthouse CI to test pipeline
- [ ] Monitor Core Web Vitals (LCP, FID, CLS)
- [ ] Set up performance budgets
- [ ] Configure alerts for performance regressions
- [ ] Add Real User Monitoring (RUM) in production

**Assignee:** Performance Engineer / DevOps
**Estimated Time:** 6-8 hours (setup + monitoring dashboard)

---

## Summary of Time Estimates

| Priority | Tasks | Est. Time |
|----------|-------|-----------|
| 🔴 Critical | 1 task | 15 minutes |
| 🟡 High | 3 tasks | 4-7 hours |
| 🟢 Medium | 3 tasks | 5-8 hours |
| 🔵 Low | 3 tasks | 15-23 hours |
| **TOTAL** | **10 tasks** | **24-38 hours** |

### Immediate Sprint (This Week)
Focus on Critical + High priority items:
- Fix missing SVG (15 min)
- Design system decision (2-4 hours)
- Update Clerk props (10 min)
- Review protected page strategy (1-2 hours)

**Sprint Estimate:** 4-7 hours

---

## Notes

1. **Design System Decision is Blocking:** Must decide on section background approach before proceeding with broader design updates.

2. **Protected Pages Limit Testing:** Consider creating a test auth account specifically for QA/visual testing purposes.

3. **Screenshots Are Stored:** All screenshots are in `/tmp/playwright-output/` in the Docker container. Consider copying to project directory for long-term storage.

4. **Console Warnings Are Expected:** Development mode Clerk warnings are normal and won't appear in production.

5. **No Pixel-Perfect Comparison:** This initial test establishes a baseline. Future tests can use these screenshots for pixel-level comparison.

---

**Report Generated:** 2025-10-26T21:45:00Z
**Next Review:** After implementing Critical + High priority items
