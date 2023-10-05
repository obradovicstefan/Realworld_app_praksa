const { Builder, By } = require("selenium-webdriver");
const InvalidSignUpPage = require("../pages/InvalidSignUpPage");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { describe, it, before, after } = require("mocha");

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Sign Up test fail", async function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    invalidSignUp = new InvalidSignUpPage(driver);
  });

  it("Validate SignUp fail", async function () {
    await invalidSignUp.invalidSignUp();

    const button = await driver.findElement(invalidSignUp.invalidSignUpBtn);
    assert.isTrue(await button.getAttribute("disabled") === "true", 'Button is not disabled');
  });

  after(async function () {
    await driver.quit();
  });
});
