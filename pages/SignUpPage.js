const { By, WebDriver, WebDriverWait, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const testData = require("../config/testdata.json");

// Accessing test data
const validSignUp = testData.validSignUp;
const url = testData.urls;
const signUpLocators = testData.signUp;

class SignUpPage extends BasePage {
  // Define locators and methods specific to the Login page
  constructor(driver, WebDriverWait) {
    super(driver, WebDriverWait);
    this.url = url.signUpUrl;
    this.firstName = By.id(signUpLocators.firstName);
    this.lastName = By.id(signUpLocators.lastName);
    this.username = By.id(signUpLocators.username);
    this.password = By.id(signUpLocators.password);
    this.confirm = By.id(signUpLocators.confirmPassword);
    this.btn = By.css(signUpLocators.signUpBtn);
  }

  async signUp() {
    await this.navigate(this.url);

    await this.waitForElementVisible(this.firstName);
    await this.sendKeys(this.firstName, validSignUp.firstName);

    await this.waitForElementVisible(this.lastName);
    await this.sendKeys(this.lastName, validSignUp.lastName);
    
    await this.waitForElementVisible(this.username);
    await this.sendKeys(this.username, validSignUp.username);

    await this.waitForElementVisible(this.password);
    await this.sendKeys(this.password, validSignUp.password);

    await this.waitForElementVisible(this.confirm);
    await this.sendKeys(this.confirm, validSignUp.confirmPassword);

    await this.clickBtn(this.btn);
    await this.driver.wait(until.urlIs(url.loginUrl), 8000);
  }
}

module.exports = SignUpPage;
