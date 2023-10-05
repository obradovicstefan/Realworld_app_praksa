const { Builder, By, until, WebDriverWait } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const testData = require("../config/testdata.json");

// Accessing test data
const invalidUser = testData.invalidUser;
const url = testData.urls;
const loginLocators = testData.login;

class InvalidLogInPage extends BasePage {
  // Define locators and methods specific to the Login page
  constructor(driver) {
    super(driver);
    this.url = url.loginUrl;
    this.username = By.id(loginLocators.username);
    this.password = By.id(loginLocators.password);
    this.invalidBtnLog = By.css(loginLocators.submit);
    this.text = By.css(loginLocators.errorMessage);
  }

  async invalidLogIn() {
    await this.navigate(this.url);

    await this.waitForElementVisible(this.username);
    await this.sendKeys(this.username, invalidUser.username);

    await this.waitForElementVisible(this.password);
    await this.sendKeys(this.password, invalidUser.password);
    
    await this.clickBtn(this.invalidBtnLog);
  }
}

module.exports = InvalidLogInPage;