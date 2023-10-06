const { Builder, WebDriver } = require("selenium-webdriver");
const assert = require("assert");
const InvalidLogInPage = require("../pages/InvalidLogInPage");
const { expect } = require("chai");
const { describe, it, before, after } = require("mocha");

// chai.use(chaiAsPromised);
// const expect = chai.expect;

describe("Login test fail", async function () {
  let driver;
  let invalidlogin;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    invalidlogin = new InvalidLogInPage(driver);
  });

  it("Validate login fail", async function () {
    await invalidlogin.invalidLogIn();

    const errorMessageElement = await driver.findElement(invalidlogin.text);

    const errorMessageText = await errorMessageElement.getText();

    expect(errorMessageText).to.equal("Username or password is invalid");
  });

  after(async function () {
    await driver.quit();
  });
});
