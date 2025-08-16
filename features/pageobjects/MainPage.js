import BasePage from "./Basepage.js";
import urls from "../../config/urls.js";
import selectors from "./selectors/mainPageSelectors.js";
import ElementWrapper from "../../utils/elementWrapper.js";

class MainPage extends BasePage {
  get mainPageHeader() {
    return new ElementWrapper($(selectors.mainPageHeader));
  }
  get clearCartButton() {
    return new ElementWrapper($(selectors.clearCartButton));
  }
  get cartTotalPrice() {
    return new ElementWrapper($(selectors.cartTotalPrice));
  }
  get emptyCartLabel() {
    return new ElementWrapper($(selectors.emptyCartLabel));
  }
  cartItem(name) {
    return {
      name: new ElementWrapper($(selectors.cartItemName(name))),
      reduceQuantityButton: new ElementWrapper(
        $(selectors.reduceQuantityButton(name))
      ),
      increaseQuantityButton: new ElementWrapper(
        $(selectors.increaseQuantityButton(name))
      ),
      price: new ElementWrapper($(selectors.cartItemPrice(name))),
      quantity: new ElementWrapper($(selectors.cartItemQuantity(name))),
    };
  }
  menuItem(name) {
    return {
      name: new ElementWrapper($(selectors.menuItemName(name))),
      addToCartButton: new ElementWrapper($(selectors.addToCartButton(name))),
    };
  }

  async clearCart() {
    await this.click(this.clearCartButton);
  }
  async increaseQuantity(name, number) {
    for (let i = 1; i <= number; i++) {
      await this.click(this.cartItem(name).increaseQuantityButton);
    }
  }
  async reduceQuantity(name, number) {
    for (let i = 1; i <= number; i++) {
      await this.click(this.cartItem(name).reduceQuantityButton);
    }
  }
  async addToCart(name) {
    await this.click(this.menuItem(name).addToCartButton);
  }
  async navigateTo() {
    await super.navigateTo(urls.home, this.mainPageHeader);
  }
  async verifyQuantity(name, expected) {
    const actual = await this.getText(this.cartItem(name).quantity);
    await this.verifyText(
      `Compare actual quantity: "${actual}" to expected: "${expected}"`,
      actual,
      expected
    );
  }
  async verifyName(name) {
    const actual = await this.getText(this.cartItem(name).name);
    await this.verifyText(
      `Compare actual name: "${actual}" to expected: "${name}"`,
      actual,
      name
    );
  }
  async isCartEmpty(expected) {
    const actual = await this.getText(this.emptyCartLabel);
    await this.verifyText(
      `Compare actual empty cart label: "${actual}" to expected: "${expected}"`,
      actual,
      expected
    );
  }
  async verifyTotalPrice(expected) {
    const actual = await this.getText(this.cartTotalPrice);
    await this.verifyText(
      `Compare actual total price: "${actual}" to expected: "${expected}"`,
      actual,
      expected
    );
  }
}
export default new MainPage();
