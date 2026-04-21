import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../utils/config';

test.describe('Android WebView Tests', () => {
  test('Android - Open Sauce Demo and Login', async ({ page }) => {
    // Dùng fixture page thông thường (Playwright sẽ tự động chạy trên Android qua project config)
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(config.standardUser, config.standardPassword);
    
    // Kiểm tra URL
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});