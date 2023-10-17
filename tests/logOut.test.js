// Import necessary modules and classes
const DriverFactory = require('../config/driverFactory');
const LoginPage = require("../pages/LoginPage");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { describe, it, before, after } = require("mocha");
const screenshotDir = './screenshots';

// Use Chai with Chai as Promised for assertions
chai.use(chaiAsPromised);
const expect = chai.expect;

// Describe a test suite for Sign Up
describe("Logout test", async function () {
    let driver;
    let loginPage;
  
    // Before running the test suite, set up the WebDriver and pages
    before(async function () {
      driver = await DriverFactory.getDriver('chrome');
      loginPage = new LoginPage(driver);
    });

    // After each test case, check if it failed and take a screenshot
  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await loginPage.takeScreenshot(this.currentTest.title, screenshotDir);
    }
  });


  it("Logout succes test", async function () {
    await loginPage.logIn();
    await loginPage.logOut();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(loginPage.loginUrl, "Logout was not successful");
  });

   // After running the test suite, quit the WebDriver
   after(async function () {
    await driver.quit();
  });
});