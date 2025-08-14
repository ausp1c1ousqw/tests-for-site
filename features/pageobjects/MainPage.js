import BasePage from "./Basepage.js";
import urls from "../../config/urls.js";
import mainPage from "./selectors/mainPageSelectors.js";

class MainPage extends BasePage {
  get mainPageHeader() {
    return $(mainPage.mainPageHeader);
  }

  addToCartButton(name) {
    return $(mainPage.addingToCartButton(name));
  }

  cartItem(name) {
    return $(mainPage.cartItem(name));
  }

  cartItemQuantity(name) {
    return $(mainPage.cartItemQuantity(name));
  }

  async navigateTo() {
    await super.navigateTo(urls.home, this.mainPageHeader);
  }
  async addItemToCart(name) {
    await this.click(this.addToCartButton(name));
  }
  async checkItemPresenceInCart(name) {
    const text = await this.getText(this.cartItem(name));
    this.expectWithAllure(
      `Compare actual - ${text} and expected - ${name}`,
      text,
      name,
      "equal"
    );
  }
  async checkItemQuantity(name, quantity) {
    const textOfQuantity = await this.getText(this.cartItemQuantity(name));
    this.expectWithAllure(
      `Compare actual - ${textOfQuantity} and expected - ${quantity}`,
      textOfQuantity,
      quantity,
      "equal"
    );
  }
}
export default new MainPage();
