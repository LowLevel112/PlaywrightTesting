import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { config } from '../utils/config';

test.describe('Product Sorting', () => {
  test('testSortProducts_WhenPriceLowToHigh_ShouldDisplaySortedPrices', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(config.standardUser, config.standardPassword);

    await inventoryPage.sortProducts('Price (low to high)');
    const prices = await inventoryPage.getAllProductPrices();
    
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });
});
