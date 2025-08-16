import * as pageHelpers from "../../utils/pageHelpers.js";
import { expect } from "chai";
export default class BasePage {
  /**
   * Open page with specified URL and check readiness
   * @param {string} path - URL
   * @param {*} el - DOM element
   */
  async navigateTo(path, el) {
    return pageHelpers.safeAction(async () => {
      const url = await pageHelpers.buildUrl(path);
      await pageHelpers.runAllureStep(
        `Open ${url}`,
        async () => await browser.url(url)
      );
      await pageHelpers.waitForDocumentReady();
      await el.waitForDisplayed();
    });
  }
  async click(el) {
    return pageHelpers.safeAction(async () => {
      await el.waitForExist();
      await el.waitForDisplayed();
      await el.waitForClickable();
      await el.safeClick();
    });
  }
  async getText(el) {
    return pageHelpers.safeAction(async () => {
      await el.waitForExist();
      await el.waitForDisplayed();
      return el.getText();
    });
  }
  async verifyText(message, actualText, expectedText) {
    await pageHelpers.expectWithAllure(message, async () => {
      expect(actualText).to.equal(expectedText);
    });
  }
}
