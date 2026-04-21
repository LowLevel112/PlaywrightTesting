import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    // Sử dụng class selector để tăng tính tương thích
    this.sortDropdown = page.locator('.product_sort_container');
    this.productPrices = page.locator('.inventory_item_price');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async addProductToCart(productName: string) {
    const productLocator = this.page.locator(`.inventory_item:has-text("${productName}") button`);
    await productLocator.click();
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.cartBadge;
    if (await badge.isVisible()) {
      const countText = await badge.textContent();
      return countText ? parseInt(countText, 10) : 0;
    }
    return 0;
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortProducts(optionValueOrLabel: string) {
    // Chờ cho dropdown xuất hiện trước khi tương tác
    await this.sortDropdown.waitFor({ state: 'visible' });
    
    // Thử chọn theo value trước (lohi, hilo, az, za), nếu không được mới chọn theo label
    try {
        await this.sortDropdown.selectOption(optionValueOrLabel);
    } catch (e) {
        await this.sortDropdown.selectOption({ label: optionValueOrLabel });
    }
  }

  async getAllProductPrices(): Promise<number[]> {
    await this.page.waitForTimeout(500); // Chờ một chút để UI cập nhật sau khi sort
    const prices = await this.productPrices.allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
