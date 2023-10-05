const { Builder, WebDriver } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/LoginPage");
const { expect } = require("chai");
const { describe, it, before, after } = require("mocha");

// chai.use(chaiAsPromised);
// const expect = chai.expect;

describe("Login test", async function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
  });

  it("Validate login", async function () {
    await loginPage.logIn();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("http://localhost:3000/");
  });

  after(async function () {
    await driver.quit();
  });
});

