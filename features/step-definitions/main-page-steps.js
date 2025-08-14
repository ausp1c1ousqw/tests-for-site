import { Given, When, Then } from "@wdio/cucumber-framework";
import MainPage from "../pageobjects/MainPage.js";

Given("I open the pizza menu page", async () => {
  await MainPage.navigateTo();
});
When("I add {string} pizza to the cart", async (name) => {
  await MainPage.addItemToCart(name);
});
Then(
  "the cart should contain {string} with quantity {string}",
  async (name, quantity) => {
    await MainPage.checkItemPresenceInCart(name);
    await MainPage.checkItemQuantity(name, quantity);
  }
);
