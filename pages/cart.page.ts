import { Page } from "playwright";

export class CartPage {
  constructor(private page: Page) {}

  itemName: string = "[data-test='inventory-item-name']";
  itemPrice: string = "[data-test='inventory-item-price']";
  checkoutButton: string = "[data-test='checkout']";
  removeButton: string = "[data-test='remove-sauce-labs-backpack']";


  async selectItemByName(item_name: string) {
    const item = this.page.locator(this.itemName).filter({ hasText: item_name });
    await item.click();
  };

  async clickCheckoutButton() {
    const shopping_cart = this.page.locator(this.checkoutButton);
    await shopping_cart.click();
  };

  async clickRemoveButton() {
    const shopping_cart = this.page.locator(this.removeButton);
    await shopping_cart.click();
  };

  async getItemNameInCart() {
    return await this.page.locator(this.itemName).textContent();
  };

  async getItemPriceInCart() {
    return await this.page.locator(this.itemPrice).textContent();
  };
}