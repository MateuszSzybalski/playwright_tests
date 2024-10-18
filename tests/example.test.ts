import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductsPage } from "../pages/products.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";

test.describe("UI tests", () => {
  
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    //Perform login into portal
    await loginPage.logIntoThePortal();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Clear basket", async ({ page }) => {
    await productsPage.selectItemByName("Sauce Labs Backpack");
    const itemName = await productsPage.getItemName();
    const getItemPrice = await productsPage.getItemPrice();
    await productsPage.addItemIntoBasket();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");
    await productsPage.clickShoppinghCart();
    const itemNameInCart = await cartPage.getItemNameInCart();
    const getItemPriceInCart = await cartPage.getItemPriceInCart();
    expect(itemName).toBe(itemNameInCart);
    expect(getItemPrice).toBe(getItemPriceInCart);
    await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1");
    await cartPage.clickCheckoutButton();
    await checkoutPage.fillTheForm("Test", "Tester", "97-300");
    await checkoutPage.clickContinueButton();
    const itemNameInCheckout = await checkoutPage.getItemNameInCheckout();
    const getItemPriceInCheckout = await checkoutPage.getItemPriceInCheckout();
    expect(itemNameInCart).toBe(itemNameInCheckout);
    expect(getItemPriceInCart).toBe(getItemPriceInCheckout);
    await expect(page.locator("[data-test='subtotal-label']")).toHaveText("Item total: " + getItemPriceInCheckout);
    await checkoutPage.clickFinishButton();
    await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Complete!");
    await expect(page.locator('[data-test="complete-header"]')).toHaveText("Thank you for your order!");
  });

  test("Remove item from the basket", async ({ page }) => {
    await productsPage.selectItemByName("Sauce Labs Backpack");
    await productsPage.addItemIntoBasket();
    await productsPage.clickShoppinghCart();
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");
    await cartPage.clickRemoveButton();
    await expect(page.locator('[data-test="inventory-item"]')).not.toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });
});
