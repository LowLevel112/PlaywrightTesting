import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('#checkout');
    this.cartItems = page.locator('.cart_item');
  }

  async removeItem(productName: string) {
    const item = this.page.locator(`.cart_item:has-text("${productName}")`);
    await item.locator('button').click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }
}
