import { Page } from "playwright";
import { expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginInput: string = "#user-name";
  passwordInput: string = "#password";
  loginButton: string = "#login-button";
  login: string = 'standard_user';
  password: string = 'secret_sauce';

  async logIntoThePortal() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.locator(this.loginInput).click();
    await this.page.locator(this.loginInput).fill('standard_user');
    await this.page.locator(this.passwordInput).click();
    await this.page.locator(this.passwordInput).fill('secret_sauce');
    await this.page.locator(this.loginButton).click();
  };

  //Podejscie zalecane przez playwright
  // async logIntoThePortal() {
  //   await this.page.goto('https://www.saucedemo.com/');
  //   const login = this.page.locator(this.loginInput);
  //   await login.click();
  //   await login.fill(this.login)
  //   const password = this.page.locator(this.passwordInput);
  //   await password.click();
  //   await password.fill(this.password)
  //   const login_button = this.page.locator(this.loginButton);
  //   await login_button.click();
  // };
}