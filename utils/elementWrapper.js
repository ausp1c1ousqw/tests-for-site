import * as pageHelpers from "./pageHelpers.js";
import { config } from "../wdio.conf.js";
class ElementWrapper {
  constructor(elementOrLocator) {
    this.elementOrLocator = elementOrLocator;
  }
  async get() {
    return typeof this.elementOrLocator === "string"
      ? $(this.elementOrLocator)
      : await this.elementOrLocator;
  }
  async waitForExist(timeout = config.customTimeouts.waitforTimeout) {
    const el = await this.get();
    await pageHelpers.runAllureStep(
      `Verify element exists (${el.selector})`,
      async () => {
        await el.waitForExist({
          timeout,
          timeoutMsg: `Element not exist after ${timeout}ms (${el.selector})`,
        });
      }
    );
  }
  async waitForDisplayed(timeout = config.customTimeouts.waitforTimeout) {
    const el = await this.get();
    await pageHelpers.runAllureStep(
      `Check element is displayed (${el.selector})`,
      async () => {
        await el.waitForDisplayed({
          timeout,
          timeoutMsg: `Element not displayed after ${timeout}ms (${el.selector})`,
        });
      }
    );
  }
  async waitForClickable(timeout = config.customTimeouts.waitforTimeout) {
    const el = await this.get();
    await pageHelpers.runAllureStep(
      `Check element to be clickable (${el.selector})`,
      async () => {
        await el.waitForClickable({
          timeout,
          timeoutMsg: `Element not clickable after ${timeout}ms (${el.selector})`,
        });
      }
    );
  }
  async safeClick() {
    const el = await this.get();
    try {
      await pageHelpers.runAllureStep(
        `Click element (${el.selector})`,
        async () => await el.click()
      );
    } catch (error) {
      await pageHelpers.runAllureStep(
        `JS fallback click on element due to error: ${error.message} (${el.selector})`,
        async () => {
          await browser.execute((el) => el.click(), el);
        }
      );
    }
  }
  async getText() {
    const el = await this.get();
    return pageHelpers.runAllureStep(
      `Get text of element (${el.selector})`,
      async () => (await el.getText()).trim()
    );
  }
}
export default ElementWrapper;
