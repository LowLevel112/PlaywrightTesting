import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../utils/config';

test.describe('Login Functionality', () => {
  test('Login with Valid Credentials - Should Redirect to Inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(config.standardUser, config.standardPassword);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Login with Locked User - Should Show Error Message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(config.lockedUser, config.standardPassword);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('locked out');
  });
});