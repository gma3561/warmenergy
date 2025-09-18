const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({
    headless: false,  // Set to true for headless mode
    slowMo: 100      // Slow down actions for visibility
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('📍 Navigating to website...');
    // Wait for GitHub Pages to be ready (may take a minute after deployment)
    await page.goto('https://gma3561.github.io/warmenergy/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✅ Website loaded successfully');

    // Scroll to contact form
    console.log('📝 Filling out the contact form...');
    await page.evaluate(() => {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });

    await page.waitForSelector('#contactForm', { timeout: 5000 });

    // Fill form fields using more specific selectors
    await page.fill('input#company', '테스트 회사');
    await page.fill('input#name', '테스트 담당자');
    await page.fill('input#position', '팀장');
    await page.fill('input#phone', '010-1234-5678');
    await page.fill('input#email', 'test@warmguys.com');
    await page.fill('input#location', '서울시 강남구 테스트동 123-45');
    await page.fill('input#electric-bill', '300만원');
    await page.fill('textarea#message', '전기요금 절감 컨설팅이 필요합니다. 연락 부탁드립니다.');

    // Check privacy agreement
    await page.check('input[name="privacy"]');

    console.log('✅ Form filled successfully');

    // Click submit button
    console.log('🚀 Submitting form...');

    // Set up dialog handler for confirm dialog
    page.on('dialog', async dialog => {
      console.log(`📢 Dialog message: ${dialog.message()}`);
      if (dialog.type() === 'confirm') {
        // Choose GitHub submission
        await dialog.accept();
        console.log('✅ Chose GitHub submission method');
      } else {
        await dialog.accept();
      }
    });

    await page.click('.submit-btn');

    // Wait for new tab/window to open (GitHub Issue page)
    console.log('⏳ Waiting for GitHub Issue page to open...');
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      // The click has already happened above
    ]);

    await newPage.waitForLoadState('networkidle');

    console.log('✅ GitHub Issue page opened');
    console.log(`📎 URL: ${newPage.url()}`);

    // Check if we're on the GitHub Issue creation page
    if (newPage.url().includes('github.com') && newPage.url().includes('issues/new')) {
      console.log('✅ Successfully redirected to GitHub Issue creation page');
      console.log('📝 Form data has been pre-filled in the issue');

      // Take a screenshot as evidence
      await newPage.screenshot({ path: 'github-issue-form.png', fullPage: true });
      console.log('📸 Screenshot saved as github-issue-form.png');

      // Extract the pre-filled content
      const issueTitle = await newPage.inputValue('input[name="issue[title]"]');
      const issueBody = await newPage.inputValue('textarea[name="issue[body]"]');

      console.log('\n📋 Pre-filled Issue Details:');
      console.log(`Title: ${issueTitle}`);
      console.log(`Body preview: ${issueBody.substring(0, 200)}...`);

      console.log('\n✅ TEST PASSED! Form submission works correctly.');
      console.log('💡 Note: To complete submission, user would need to:');
      console.log('   1. Log in to GitHub (if not already)');
      console.log('   2. Click "Submit new issue" button');
      console.log('   3. GitHub Actions will then process the submission');
    } else {
      console.log('⚠️ Unexpected redirect URL:', newPage.url());
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    // Take screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('📸 Error screenshot saved as error-screenshot.png');
  } finally {
    // Keep browser open for 5 seconds to see the result
    console.log('\n⏰ Keeping browser open for 5 seconds...');
    await page.waitForTimeout(5000);

    await browser.close();
    console.log('🔒 Browser closed');
  }
})();