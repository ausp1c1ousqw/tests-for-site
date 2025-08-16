import { Given, When, Then } from "@wdio/cucumber-framework";
import MainPage from "../pageobjects/MainPage.js";

Given("I open the main page", async () => {
  await MainPage.navigateTo();
});
When("I add to cart {string}", async (name) => {
  await MainPage.addToCart(name);
});
When("I increase quantity of {string} by {string}", async (name, number) => {
  await MainPage.increaseQuantity(name, number);
});
When("I clear cart", async () => {
  await MainPage.clearCart();
});
Then(
  "I should see {string} in the cart with quantity {string}",
  async (name, quantity) => {
    await MainPage.verifyName(name);
    await MainPage.verifyQuantity(name, quantity);
  }
);
Then("I should see {string}", async (label) => {
  await MainPage.isCartEmpty(label);
});
Then("Total price should be {string}", async (price) => {
  await MainPage.verifyTotalPrice(price);
});
