const { Builder, By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const testData = require("../config/testdata.json");

// Accessing test data
const validUser = testData.validUser;
const url = testData.urls;
const loginLocators = testData.login;

class LoginPage extends BasePage {
  // Define locators and methods specific to the Login page
  constructor(driver) {
    super(driver);
    this.url = url.loginUrl;
    this.username = By.id(loginLocators.username);
    this.password = By.id(loginLocators.password);
    this.btn = By.css(loginLocators.submit);
  }

  async logIn() {
    await this.navigate(this.url);
    await this.sleep(1000);

    await this.sendKeys(this.username, validUser.username);
    await this.sleep(1000);

    await this.sendKeys(this.password, validUser.password);
    await this.sleep(1000);

    await this.clickBtn(this.btn);
    await this.sleep(1000);
  }
}

module.exports = LoginPage;
