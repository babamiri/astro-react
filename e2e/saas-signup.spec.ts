import { test, expect } from '@playwright/test';

test.describe('SaaS Signup Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render signup form correctly', async ({ page }) => {
    // Check if the form is visible
    await expect(page.locator('text=نام دامنه دلخواه')).toBeVisible();
    await expect(page.locator('text=پلن موردنظر')).toBeVisible();
    
    // Check if all three plans are visible
    await expect(page.locator('text=پلن پایه')).toBeVisible();
    await expect(page.locator('text=پلن حرفه‌ای')).toBeVisible();
    await expect(page.locator('text=پلن سازمانی')).toBeVisible();
    
    // Check if pricing is displayed
    await expect(page.locator('text=$19')).toBeVisible();
    await expect(page.locator('text=$49')).toBeVisible();
    await expect(page.locator('text=$99')).toBeVisible();
  });

  test('should disable submit button when domain is empty', async ({ page }) => {
    const submitButton = page.locator('button:has-text("شروع آزمایش رایگان ۱۴ روزه")');
    await expect(submitButton).toBeDisabled();
  });

  test('should enable submit button when domain is entered', async ({ page }) => {
    const domainInput = page.locator('input[placeholder="mycoolstartup"]');
    const submitButton = page.locator('button:has-text("شروع آزمایش رایگان ۱۴ روزه")');
    
    await domainInput.fill('testdomain');
    await expect(submitButton).toBeEnabled();
  });

  test('should show validation error for empty domain', async ({ page }) => {
    const domainInput = page.locator('input[placeholder="mycoolstartup"]');
    const submitButton = page.locator('button:has-text("شروع آزمایش رایگان ۱۴ روزه")');
    
    // Try to submit without entering domain
    await domainInput.fill('');
    await domainInput.blur(); // Trigger validation
    await submitButton.click();
    
    // Should show error message
    await expect(page.locator('text=لطفاً یک دامنه وارد کنید')).toBeVisible();
  });

  test('should show validation error for invalid domain', async ({ page }) => {
    const domainInput = page.locator('input[placeholder="mycoolstartup"]');
    const submitButton = page.locator('button:has-text("شروع آزمایش رایگان ۱۴ روزه")');
    
    // Enter invalid domain (too short)
    await domainInput.fill('ab');
    await submitButton.click();
    
    // Should show error message
    await expect(page.locator('text=دامنه وارد شده معتبر نیست')).toBeVisible();
  });

  test('should allow plan selection', async ({ page }) => {
    // Check if basic plan is selected by default
    await expect(page.locator('input[value="basic"]')).toBeChecked();
    
    // Select pro plan
    await page.locator('text=پلن حرفه‌ای').click();
    await expect(page.locator('input[value="pro"]')).toBeChecked();
    
    // Select enterprise plan
    await page.locator('text=پلن سازمانی').click();
    await expect(page.locator('input[value="enterprise"]')).toBeChecked();
  });

  test('should complete signup flow successfully', async ({ page }) => {
    const domainInput = page.locator('input[placeholder="mycoolstartup"]');
    const submitButton = page.locator('button:has-text("شروع آزمایش رایگان ۱۴ روزه")');
    
    // Fill in domain
    await domainInput.fill('mytestdomain');
    
    // Select pro plan
    await page.locator('text=پلن حرفه‌ای').click();
    
    // Submit form
    await submitButton.click();
    
    // Should show loading state
    await expect(page.locator('text=در حال پردازش...')).toBeVisible();
    
    // Wait for success message
    await expect(page.locator('text=آزمون شما فعال شد!')).toBeVisible({ timeout: 10000 });
    
    // Check if domain and plan are shown correctly
    await expect(page.locator('text=mytestdomain.example.com')).toBeVisible();
    await expect(page.locator('text=پلن حرفه‌ای')).toBeVisible();
  });

  test('should allow returning to form from success screen', async ({ page }) => {
    const domainInput = page.locator('input[placeholder="mycoolstartup"]');
    const submitButton = page.locator('button:has-text("شروع آزمایش رایگان ۱۴ روزه")');
    
    // Complete signup flow
    await domainInput.fill('testdomain');
    await submitButton.click();
    
    // Wait for success screen
    await expect(page.locator('text=آزمون شما فعال شد!')).toBeVisible({ timeout: 10000 });
    
    // Click back button
    await page.locator('text=بازگشت به صفحه اصلی').click();
    
    // Should return to form
    await expect(page.locator('text=نام دامنه دلخواه')).toBeVisible();
    await expect(page.locator('input[placeholder="mycoolstartup"]')).toHaveValue('');
    await expect(page.locator('input[value="basic"]')).toBeChecked();
  });

  test('should work on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if form is responsive
    await expect(page.locator('text=نام دامنه دلخواه')).toBeVisible();
    await expect(page.locator('text=پلن موردنظر')).toBeVisible();
    
    // Check if plans are stacked vertically on mobile
    const plansContainer = page.locator('div:has(text="پلن پایه")').first();
    await expect(plansContainer).toBeVisible();
    
    // Test mobile interaction
    const domainInput = page.locator('input[placeholder="mycoolstartup"]');
    await domainInput.fill('mobiledomain');
    
    const submitButton = page.locator('button:has-text("شروع آزمایش رایگان ۱۴ روزه")');
    await expect(submitButton).toBeEnabled();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through form elements
    await page.keyboard.press('Tab');
    await expect(page.locator('input[placeholder="mycoolstartup"]')).toBeFocused();
    
    // Enter domain using keyboard
    await page.keyboard.type('keyboarddomain');
    
    // Tab to plan selection
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Use arrow keys to change plan selection
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('input[value="pro"]')).toBeChecked();
    
    // Tab to submit button and press Enter
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Should show loading state
    await expect(page.locator('text=در حال پردازش...')).toBeVisible();
  });

  test('should show proper error states', async ({ page }) => {
    const domainInput = page.locator('input[placeholder="mycoolstartup"]');
    const submitButton = page.locator('button:has-text("شروع آزمایش رایگان ۱۴ روزه")');
    
    // Test various invalid domains
    const invalidDomains = ['', 'a', 'ab', 'invalid@domain', 'domain.com', '123'];
    
    for (const domain of invalidDomains) {
      await domainInput.fill(domain);
      await submitButton.click();
      
      // Should show some error message
      const errorVisible = await page.locator('text=لطفاً یک دامنه وارد کنید').isVisible() ||
                          await page.locator('text=دامنه وارد شده معتبر نیست').isVisible();
      
      expect(errorVisible).toBeTruthy();
      
      // Clear the error by entering valid domain
      await domainInput.fill('validdomaintest');
      await page.waitForTimeout(100); // Small delay for state update
    }
  });
}); 