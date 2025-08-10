import { Given, When, Then } from "@wdio/cucumber-framework";
import MainPage from "../pageobjects/MainPage.js";
import { expect } from "chai";

Given("I open the pizza menu page", async () => {
  await MainPage.open();
});
