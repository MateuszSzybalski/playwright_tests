import { Page } from "playwright";
import { expect } from "playwright/test";

export class ProductsPage {
  constructor(private page: Page) {}

  itemName: string = "[data-test='inventory-item-name']";
  addToCartButton: string = "[data-test='add-to-cart']";
  shoppingCart: string = "[data-test='shopping-cart-link']";
  shoppingCartBadge: string = "[data-test='shopping-cart-badge']";
  itemPrice: string = "[data-test='inventory-item-price']";

  async selectItemByName(item_name: string) {
    const item = this.page.locator(this.itemName).filter({ hasText: item_name });
    await item.click();
  };

  async addItemIntoBasket() {
    const addToCart_button = this.page.locator(this.addToCartButton);
    await addToCart_button.click();
  };

  async checkIfBasketIsNotEmpty(number: string) {
    const shoppingCart_badge = this.page.locator(this.shoppingCartBadge);
    await expect(shoppingCart_badge).toHaveText(number);
  };

  async clickShoppinghCart() {
    const shopping_cart = this.page.locator(this.shoppingCart);
    await shopping_cart.click();
  };

  async getItemName() {
    return await this.page.locator(this.itemName).textContent();
  };

  async getItemPrice() {
    return await this.page.locator(this.itemPrice).textContent();
  };
}