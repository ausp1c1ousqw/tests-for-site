import allureReporter from "@wdio/allure-reporter";
import { config } from "../wdio.conf.js";
export async function waitForExist(
  elementOrLocator,
  timeout = config.customTimeouts.waitforTimeout
) {
  const element = await this.resolveElement(elementOrLocator);
  await this.runAllureStep(
    `Verify element exists (${element.selector})`,
    async () => {
      await element.waitForExist({
        timeout,
        timeoutMsg: `Element not exist after ${timeout}ms (${element.selector})`,
      });
    }
  );
}

export async function takeScreenshot(
  messageForAllure = "Screenshot of page on failure"
) {
  try {
    const screenshot = await browser.takeScreenshot();
    allureReporter.addAttachment(
      messageForAllure,
      Buffer.from(screenshot, "base64"),
      "image/png"
    );
  } catch (e) {}
}
export async function getPageSource(
  messageForAllure = "Page source on failure"
) {
  try {
    const pageSource = await browser.getPageSource();
    allureReporter.addAttachment(messageForAllure, pageSource, "text/html");
  } catch (e) {}
}
export async function waitForDocumentReady(
  timeout = config.customTimeouts.pageLoadTimeout
) {
  await this.runAllureStep(`Check document.readyState`, async () => {
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
export async function buildUrl(path) {
  return this.runAllureStep("Build URL", async () => {
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
export async function waitForDisplayed(
  elementOrLocator,
  timeout = config.customTimeouts.waitforTimeout
) {
  const element = await this.resolveElement(elementOrLocator);
  await this.runAllureStep(
    `Check element is displayed (${element.selector})`,
    async () => {
      await element.waitForDisplayed({
        timeout,
        timeoutMsg: `Element not displayed after ${timeout}ms (${element.selector})`,
      });
    }
  );
}
export async function runAllureStep(message, func) {
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
export async function waitForClickable(
  elementOrLocator,
  timeout = config.customTimeouts.waitforTimeout
) {
  const element = await this.resolveElement(elementOrLocator);
  await this.runAllureStep(
    `Check element to be clickable (${element.selector})`,
    async () => {
      await element.waitForClickable({
        timeout,
        timeoutMsg: `Element not clickable after ${timeout}ms (${element.selector})`,
      });
    }
  );
}
export async function resolveElement(elementOrLocator) {
  const element =
    typeof elementOrLocator === "string"
      ? $(elementOrLocator)
      : await elementOrLocator;
  return element;
}
