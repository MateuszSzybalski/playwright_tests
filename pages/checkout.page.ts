import { Page } from "playwright";

export class CheckoutPage {
  constructor(private page: Page) {}

  firstName: string = '[data-test="firstName"]';
  lastName: string = '[data-test="lastName"]';
  postalCode: string = '[data-test="postalCode"]';
  continueButton: string = '[data-test="continue"]';
  itemName: string = "[data-test='inventory-item-name']";
  itemPrice: string = "[data-test='inventory-item-price']";
  subTotalPrice: string = "[data-test='subtotal-label']";
  finishButton: string = "[data-test='finish']";

  async fillTheForm(firstName: string, lastName: string, postalCode: string) {
    const first_name = this.page.locator(this.firstName);
    const last_name = this.page.locator(this.lastName);
    const postal_code = this.page.locator(this.postalCode);
    await first_name.click();
    await first_name.fill(firstName);
    await last_name.click();
    await last_name.fill(lastName);
    await postal_code.click();
    await postal_code.fill(postalCode);
  };

  async clickContinueButton() {
    const continue_button = this.page.locator(this.continueButton);
    await continue_button.click();
  };

  async clickFinishButton() {
    const continue_button = this.page.locator(this.finishButton);
    await continue_button.click();
  };

  async getItemNameInCheckout() {
    return await this.page.locator(this.itemName).textContent();
  };

  async getItemPriceInCheckout() {
    return await this.page.locator(this.itemPrice).textContent();
  };
}