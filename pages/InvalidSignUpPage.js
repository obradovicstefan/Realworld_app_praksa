const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const testData = require("../config/testdata.json");

// Accessing test data
const invalidSignUp = testData.invalidSignUp;
const url = testData.urls;
const signUpLocators = testData.signUp;

class InvalidSignUpPage extends BasePage {
  // Define locators and methods specific to the Login page
  constructor(driver) {
    super(driver);
    this.url = url.signUpUrl;
    this.firstName = By.id(signUpLocators.firstName);
    this.lastName = By.id(signUpLocators.lastName);
    this.username = By.id(signUpLocators.username);
    this.password = By.id(signUpLocators.password);
    this.confirm = By.id(signUpLocators.confirmPassword);
    this.invalidSignUpBtn = By.css(signUpLocators.signUpBtn);
  }

  async invalidSignUp() {
    await this.navigate(this.url);

    await this.waitForElementVisible(this.firstName);
    await this.sendKeys(this.firstName, invalidSignUp.firstName);

    await this.waitForElementVisible(this.lastName);
    await this.sendKeys(this.lastName, invalidSignUp.lastName);
    
    await this.waitForElementVisible(this.username);
    await this.sendKeys(this.username, invalidSignUp.username);

    await this.waitForElementVisible(this.password);
    await this.sendKeys(this.password, invalidSignUp.password);

    await this.waitForElementVisible(this.confirm);
    await this.sendKeys(this.confirm, invalidSignUp.confirmPassword);
  }
}

module.exports = InvalidSignUpPage;
