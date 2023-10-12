// Import necessary modules and classes
const { Builder, until, By} = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const AccountPage = require("../pages/AccountPage");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const screenshotDir = "./screenshots";

// Use Chai with Chai as Promised for assertions
chai.use(chaiAsPromised);
const expect = chai.expect;

// Describe a test suite for Sign Up
describe("Create account test", async function () {
  let driver;
  let loginPage;
  let accountPage;

  // Before running the test suite, set up the WebDriver and pages
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    accountPage = new AccountPage(driver);
  });

  // After each test case, check if it failed and take a screenshot
  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await accountPage.takeScreenshot(this.currentTest.title, screenshotDir);
    }
  });

   // After running the test suite, quit the WebDriver
   after(async function () {
    await driver.quit();
  });

  // Test case: Successfully create new bank account
  it("Create account test", async function () {
    await loginPage.logIn();
    await accountPage.createAccount();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(
      accountPage.url,
      "Account creation was not successful"
    );
  });

  // Test case: Successfully delete new bank account
  it("Delete account test", async function () {
      await accountPage.deleteAccount();
  
      const pElement = await driver.wait(until.elementLocated(accountPage.pText));
      const text = await pElement.getText();
      const expectedText = "Koch, Bergstrom and Turner Bank (Deleted)";

      expect(text).to.equal(expectedText);
  });
});
