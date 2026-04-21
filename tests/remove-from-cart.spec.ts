import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { config } from '../utils/config';

test.describe('Remove Product From Cart', () => {
  test('testRemoveFromCart_WhenProductExists_ShouldEmptyCart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const productName = 'Sauce Labs Backpack';

    await loginPage.goto();
    await loginPage.login(config.standardUser, config.standardPassword);

    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openCart();

    await cartPage.removeItem(productName);
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(0);
  });
});
