import * as pageHelpers from "../../utils/pageHelpers.js";
import { expect } from "chai";
export default class BasePage {
  async navigateTo(path, elementOrLocator) {
    const url = await pageHelpers.buildUrl(path);
    try {
      await pageHelpers.runAllureStep(
        `Open ${url}`,
        async () => await browser.url(url)
      );
      await pageHelpers.waitForDocumentReady();
      await pageHelpers.waitForDisplayed(elementOrLocator);
    } catch (error) {
      await pageHelpers.takeScreenshot();
      await pageHelpers.getPageSource();
      throw error;
    }
  }
  async click(elementOrLocator) {
    const element = await pageHelpers.resolveElement(elementOrLocator);
    try {
      await pageHelpers.waitForExist(elementOrLocator);
      await pageHelpers.waitForDisplayed(elementOrLocator);
      await pageHelpers.waitForClickable(elementOrLocator);
      try {
        await pageHelpers.runAllureStep(
          `Click element (${element.selector})`,
          async () => await element.click()
        );
      } catch (error) {
        await pageHelpers.runAllureStep(
          `JS fallback click on element (${element.selector})`,
          async () => {
            await browser.execute((el) => el.click(), element);
          }
        );
      }
    } catch (error) {
      await pageHelpers.takeScreenshot();
      await pageHelpers.getPageSource();
      throw error;
    }
  }
  async getText(elementOrLocator) {
    const element = await pageHelpers.resolveElement(elementOrLocator);
    try {
      await pageHelpers.waitForExist(elementOrLocator);
      await pageHelpers.waitForDisplayed(elementOrLocator);
      return pageHelpers.runAllureStep(
        `Get text of element (${element.selector})`,
        async () => (await element.getText()).trim()
      );
    } catch (error) {
      await pageHelpers.takeScreenshot();
      await pageHelpers.getPageSource();
      throw error;
    }
  }
  async expectWithAllure(message, actual, expected, type) {
    try {
      await pageHelpers.runAllureStep(message, async () => {
        switch (type) {
          case "equal":
            expect(actual).to.equal(expected);
            break;
          case "contain":
            expect(actual).to.contain(expected);
            break;
          case "true":
            expect(actual).to.be.true;
            break;
          case "false":
            expect(actual).to.be.false;
            break;
          case "custom":
            if (typeof expected === "function") {
              expected(actual, expect);
            } else {
              throw new Error(
                "For custom type you should paste callback as expected value"
              );
            }
            break;
          default:
            throw new Error("Unknown type of check");
        }
      });
    } catch (error) {
      await pageHelpers.takeScreenshot();
      await pageHelpers.getPageSource();
      throw error;
    }
  }
}
