const { Builder, WebDriver } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const BasePage = require("../pages/BasePage");
const LoginPage = require("../pages/LoginPage");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { describe, it, before, after } = require("mocha");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Login test", async function () {
  let driver;
  let loginPage;
  let basePage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    basePage = new BasePage(driver);
  });

  it("Login fail test", async function () {
    await loginPage.invalidLogIn();

    const errorMessageElement = await driver.findElement(loginPage.text);

    await basePage.expectTextToEqual(errorMessageElement, "Username or password is invalid");
  });

  it("Login succes test", async function () {
    await loginPage.logIn();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(loginPage.baseUrl, "Log in was not successful");
  });

  after(async function () {
    await driver.quit();
  });
});
