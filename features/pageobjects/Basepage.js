import { config } from "../../wdio.conf.js";
import * as pageHelpers from "../../utils/pageHelpers.js";
export default class BasePage {
  async navigateTo(
    path,
    expectedElementOrLocator,
    timeout = config.customTimeouts.pageLoad
  ) {
    const url = await pageHelpers.buildUrl(path);
    try {
      await pageHelpers.runAllureStep(
        `Open ${url}`,
        async () => await browser.url(url)
      );
      await pageHelpers.waitForDocumentReady(timeout);
      await pageHelpers.waitForDisplayed(expectedElementOrLocator, timeout);
    } catch (error) {
      await pageHelpers.takeScreenshot(`Screenshot on open path (${url})`);
      await pageHelpers.getPageSource(`Page source on failure (${url})`);
      throw error;
    }
  }
  async click(
    expectedElementOrLocator,
    timeout = config.customTimeouts.pageLoad
  ) {
    const expectedElement = await pageHelpers.resolveElement(
      expectedElementOrLocator
    );
    try {
      await pageHelpers.waitForElementReady(expectedElementOrLocator, timeout);
      try {
        await pageHelpers.runAllureStep(
          `Click ${expectedElement.selector}`,
          async () => await expectedElement.click()
        );
      } catch (error) {
        await pageHelpers.runAllureStep(
          `JS fallback click on ${expectedElement.selector}`,
          async () => {
            await browser.execute((el) => el.click(), expectedElement);
          }
        );
      }
    } catch (error) {
      await pageHelpers.takeScreenshot(
        `Screenshot of page where should be ${expectedElement.selector}`
      );
      await pageHelpers.getPageSource(
        `Page source of page where should be ${expectedElement.selector}`
      );
      throw error;
    }
  }
  async getText(
    expectedElementOrLocator,
    timeout = config.customTimeouts.pageLoad
  ) {
    const expectedElement = await pageHelpers.resolveElement(
      expectedElementOrLocator
    );
    try {
      await pageHelpers.waitForExist(expectedElementOrLocator, timeout);
      await pageHelpers.waitForDisplayed(expectedElementOrLocator, timeout);
      return pageHelpers.runAllureStep(
        `Get text of element ${expectedElement.selector}`,
        async () => (await expectedElement.getText()).trim()
      );
    } catch (error) {
      await pageHelpers.takeScreenshot(
        `Screenshot of page where should be ${expectedElement.selector}`
      );
      await pageHelpers.getPageSource(
        `Page source of page where should be ${expectedElement.selector}`
      );
      throw error;
    }
  }
}
