const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the page
  console.log('Navigating to http://localhost:3000/digilab-test...');
  await page.goto('http://localhost:3000/digilab-test', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Wait a bit for R3F to initialize
  await page.waitForTimeout(3000);

  // Check for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Wait a bit more to catch any errors
  await page.waitForTimeout(2000);

  // Check for R3F-specific errors
  const hasR3FErrors = errors.some(err =>
    err.includes('Cannot read properties of undefined') ||
    err.includes('react-reconciler') ||
    err.includes('@react-three/fiber')
  );

  console.log('\n=== Test Results ===');
  console.log(`Total console errors: ${errors.length}`);
  console.log(`R3F-specific errors: ${hasR3FErrors ? 'YES ❌' : 'NO ✓'}`);

  if (errors.length > 0) {
    console.log('\nErrors found:');
    errors.forEach(err => console.log(`  - ${err.substring(0, 200)}`));
  } else {
    console.log('\n✓ No errors detected! Page loaded successfully.');
  }

  await browser.close();
  process.exit(hasR3FErrors ? 1 : 0);
})();
