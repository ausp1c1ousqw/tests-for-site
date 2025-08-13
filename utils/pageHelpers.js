import allureReporter from "@wdio/allure-reporter";
import { config } from "../wdio.conf.js";
export async function waitForExist(
  expectedElementOrLocator,
  timeout = config.customTimeouts.pageLoad
) {
  await this.runAllureStep("Verify element exists", async () => {
    if (expectedElementOrLocator) {
      const expectedElement = await this.resolveElement(
        expectedElementOrLocator
      );
      await expectedElement.waitForExist({
        timeout,
        timeoutMsg: `Element ${expectedElement.selector} not exist after ${timeout}ms`,
      });
    }
  });
}
export async function waitForElementReady(
  expectedElementOrLocator,
  timeout = config.customTimeouts.pageLoad
) {
  await this.waitForExist(expectedElementOrLocator, timeout);
  await this.waitForDisplayed(expectedElementOrLocator, timeout);
  await this.waitForClickable(expectedElementOrLocator, timeout);
}
export async function takeScreenshot(messageForAllure) {
  try {
    const screenshot = await browser.takeScreenshot();
    allureReporter.addAttachment(
      messageForAllure,
      Buffer.from(screenshot, "base64"),
      "image/png"
    );
  } catch (e) {}
}
export async function getPageSource(messageForAllure) {
  try {
    const pageSource = await browser.getPageSource();
    allureReporter.addAttachment(messageForAllure, pageSource, "text/html");
  } catch (e) {}
}
export async function waitForDocumentReady(
  timeout = config.customTimeouts.pageLoad
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
  expectedElementOrLocator,
  timeout = config.customTimeouts.pageLoad
) {
  await this.runAllureStep("Check element is displayed", async () => {
    if (expectedElementOrLocator) {
      const expectedElement = await this.resolveElement(
        expectedElementOrLocator
      );
      await expectedElement.waitForDisplayed({
        timeout,
        timeoutMsg: `Element ${expectedElement.selector} not displayed after ${timeout}ms`,
      });
    }
  });
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
  expectedElementOrLocator,
  timeout = config.customTimeouts.pageLoad
) {
  await this.runAllureStep("Check element to be clickable", async () => {
    if (expectedElementOrLocator) {
      const expectedElement = await this.resolveElement(
        expectedElementOrLocator
      );
      await expectedElement.waitForClickable({
        timeout,
        timeoutMsg: `Element ${expectedElement.selector} not clickable after ${timeout}ms`,
      });
    }
  });
}
export async function resolveElement(expectedElementOrLocator) {
  const expectedElement =
    typeof expectedElementOrLocator === "string"
      ? $(expectedElementOrLocator)
      : await expectedElementOrLocator;
  return expectedElement;
}
