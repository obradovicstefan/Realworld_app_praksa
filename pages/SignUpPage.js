const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const urldata = require("../config/urldata.json");
const credentials = require("../config/credentials.json");
const locators = require("../config/locators.json");

// Accessing test data
const validSignUp = credentials.validSignUp;
const invalidSignUp = credentials.invalidSignUp;
const url = urldata.urls;
const signUpLocators = locators.signUp;

class SignUpPage extends BasePage {
  // Locators and methods specific to the Login page
  constructor(driver) {
    super(driver);
    this.signUpUrl = url.signUpUrl;
    this.loginUrl = url.loginUrl;
    this.firstName = By.css(signUpLocators.firstName);
    this.lastName = By.css(signUpLocators.lastName);
    this.username = By.css(signUpLocators.username);
    this.password = By.css(signUpLocators.password);
    this.confirm = By.css(signUpLocators.confirmPassword);
    this.btn = By.css(signUpLocators.signUpBtn);
  }

  // SignUp function that fills in input fields with set credentials
  async signUp() {
    await this.navigate(this.signUpUrl);

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
    await this.waitForUrl(this.loginUrl);
  }

  // Invalid Signup function that fills in input fields with set credentials
     
  async invalidSignUp() {
    await this.navigate(this.signUpUrl);

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

module.exports = SignUpPage;
