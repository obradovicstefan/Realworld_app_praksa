const { Builder } = require("selenium-webdriver");
const assert = require("assert");
const SignUpPage = require("../pages/SignUpPage");
const { expect } = require("chai");
const { describe, it, before, after } = require("mocha");

// chai.use(chaiAsPromised);
// const expect = chai.expect;

describe("Sign Up test", async function () {
  let driver;
  let signUpPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    signUpPage = new SignUpPage(driver);
  });

  it("Validate SignUp", async function () {
    await signUpPage.signUp();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("http://localhost:3000/signin");
  });

  after(async function () {
    await driver.quit();
  });
});
