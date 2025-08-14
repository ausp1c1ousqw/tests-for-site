export const config = {
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  customTimeouts: {
    pageLoadTimeout: 10000,
    waitforTimeout: 5000,
  },
  runner: "local",

  specs: ["./features/**/*.feature"],

  maxInstances: 1,

  capabilities: [
    {
      browserName: "chrome",
    },
  ],

  logLevel: "silent",

  bail: 0,

  waitforTimeout: 10000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  framework: "cucumber",

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        useCucumberStepReporter: true,
      },
    ],
  ],

  cucumberOpts: {
    require: ["./features/step-definitions/*.js"],
    backtrace: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
