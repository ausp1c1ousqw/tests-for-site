import { Given, When, Then } from "@wdio/cucumber-framework";
import MainPage from "../pageobjects/MainPage.js";
import { expect } from "chai";

Given("I open the pizza menu page", async () => {
  await MainPage.navigateTo();
});
When("I add {string} pizza to the cart", async (nameOfItem) => {
  await MainPage.addingToCart(nameOfItem);
});
Then(
  "the cart should contain {string} with quantity {string}",
  async (nameOfItem, quantityOfItem) => {
    await MainPage.checkAbscenceInCart(nameOfItem);
    await MainPage.checkQuantity(nameOfItem, quantityOfItem);
  }
);
