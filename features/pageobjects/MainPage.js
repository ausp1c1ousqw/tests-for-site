import BasePage from "./Basepage.js";
import urls from "../../config/urls.js";
import { expect } from "chai";
import mainPage from "./selectors/mainPageSelectors.js";

class MainPage extends BasePage {
  get mainPageHeader() {
    return $(mainPage.mainPageHeader);
  }

  addingToCartButton(nameOfItem) {
    return $(mainPage.addingToCartButton(nameOfItem));
  }

  cartItem(nameOfItem) {
    return $(mainPage.cartItem(nameOfItem));
  }

  cartItemQuantity(nameOfItem) {
    return $(mainPage.cartItemQuantity(nameOfItem));
  }

  async navigateTo() {
    await super.navigateTo(urls.home, this.mainPageHeader);
  }
  async addingToCart(nameOfItem) {
    await this.click(this.addingToCartButton(nameOfItem));
  }
  async checkAbscenceInCart(nameOfItem) {
    const textOfItem = await this.getText(this.cartItem(nameOfItem));
    expect(textOfItem).to.equal(nameOfItem);
  }
  async checkQuantity(nameOfItem, quantityOfItem) {
    const textOfQuantity = await this.getText(
      this.cartItemQuantity(nameOfItem)
    );
    expect(textOfQuantity).to.equal(quantityOfItem);
  }
}
export default new MainPage();
