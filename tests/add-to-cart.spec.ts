import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { config } from '../utils/config';

test.describe('Cart Functionality', () => {
  test('Add to Cart - Valid Product Should Increase Cart Badge', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(config.standardUser, config.standardPassword);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });
});