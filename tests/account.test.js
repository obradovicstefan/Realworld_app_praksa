const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const AccountPage = require("../pages/AccountPage");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Create account test", async function () {
  let driver;
  let loginPage;
  let accountPage;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    accountPage = new AccountPage(driver);
  });

  it("Create account and delete test", async function () {
    await loginPage.logIn();
    await accountPage.createAccount();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(
      accountPage.url,
      "Account creation was not successful"
    );
    await accountPage.deleteAccount();
  });

  afterEach(async function () {
    await driver.quit();
  });
});
