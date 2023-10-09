const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const SignUpPage = require("../pages/SignUpPage");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { describe, it, before, after } = require("mocha");

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Sign Up test", async function () {
  let driver;
  let signUpPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    signUpPage = new SignUpPage(driver);
  });

  it("Validate SignUp success", async function () {
    await signUpPage.signUp();

    const currentUrl = await driver.getCurrentUrl();
    assert.isTrue(
      currentUrl === signUpPage.loginUrl,
      "Sign up was not successful"
    );
  });

  it("Validate SignUp fail", async function () {
    await signUpPage.invalidSignUp();

    const button = await driver.findElement(signUpPage.btn);
    assert.isTrue(
      (await button.getAttribute("disabled")) === "true",
      "Button is not disabled"
    );
  });

  after(async function () {
    await driver.quit();
  });
});
