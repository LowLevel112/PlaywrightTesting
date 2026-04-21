import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { config } from '../utils/config';

test.describe('Logout Functionality', () => {
  test('testLogout_WhenClickLogout_ShouldRedirectToLoginPage', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(config.standardUser, config.standardPassword);

    await inventoryPage.logout();

    // Kiểm tra quay lại trang login bằng cách check sự xuất hiện của nút login
    await expect(loginPage.loginButton).toBeVisible();
    // Hoặc kiểm tra URL không còn là inventory
    await expect(page).not.toHaveURL(/.*inventory.html/);
  });
});
