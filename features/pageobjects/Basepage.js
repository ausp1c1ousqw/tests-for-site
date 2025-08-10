import allureReporter from "@wdio/allure-reporter";
import { config } from "../../wdio.conf.js";
export default class BasePage {
  async open(
    path,
    expectedElementOrLocator,
    timeout = config.customTimeouts.pageLoad
  ) {
    const url = await this.createUrl(path);
    try {
      await this.allureCasualStep(
        `Open ${url}`,
        async () => await browser.url(url)
      );
      await this.waitReadyState(timeout);
      await this.waitForDisplayed(expectedElementOrLocator, timeout);
    } catch (error) {
      await this.takeScreenshot(`Screenshot on open path (${url})`);
      await this.getPageSource(`Page source on failure (${url})`);
      throw error;
    }
  }
  async takeScreenshot(messageForAllure) {
    try {
      const screenshot = await browser.takeScreenshot();
      allureReporter.addAttachment(
        messageForAllure,
        Buffer.from(screenshot, "base64"),
        "image/png"
      );
    } catch (e) {}
  }
  async getPageSource(messageForAllure) {
    try {
      const pageSource = await browser.getPageSource();
      allureReporter.addAttachment(messageForAllure, pageSource, "text/html");
    } catch (e) {}
  }
  async waitReadyState(timeout = config.customTimeouts.pageLoad) {
    await this.allureCasualStep(`Check document.readyState`, async () => {
      await browser.waitUntil(
        async () =>
          (await browser.execute(() => document.readyState)) === "complete",
        {
          timeout,
          timeoutMsg: `Page did not load within ${timeout}ms`,
        }
      );
    });
  }
  async createUrl(path) {
    return this.allureCasualStep("Create URL", async () => {
      const baseUrl = config.baseUrl;
      if (!baseUrl) {
        throw new Error("baseUrl is not set in config");
      }
      const url = path.startsWith("http")
        ? path
        : new URL(path, baseUrl).toString();
      return url;
    });
  }
  async waitForDisplayed(
    expectedElementOrLocator,
    timeout = config.customTimeouts.pageLoad
  ) {
    await this.allureCasualStep("Check key element for displayed", async () => {
      if (expectedElementOrLocator) {
        const expectedElement =
          typeof expectedElementOrLocator === "string"
            ? $(expectedElementOrLocator)
            : await expectedElementOrLocator;

        await expectedElement.waitForDisplayed({
          timeout,
          timeoutMsg: `Key element ${expectedElement.selector} not displayed after ${timeout}ms`,
        });
      }
    });
  }
  async allureCasualStep(message, func) {
    allureReporter.startStep(message);
    try {
      const result = await func();
      allureReporter.endStep("passed");
      return result;
    } catch (error) {
      allureReporter.endStep("failed");
      throw error;
    }
  }
}
