import BasePage from "./Basepage.js";
import urls from "../../config/urls.js";
import allureReporter from "@wdio/allure-reporter";
class MainPage extends BasePage {
  get mainPageHeader() {
    return $("#main-page-header");
  }
  get addingToCartButton() {
    return $(".adding-button");
  }

  async open() {
    await super.open(urls.home, this.mainPageHeader);
  }
  async addingToCart() {}
}
export default new MainPage();
