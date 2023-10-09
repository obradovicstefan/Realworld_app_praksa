const { By} = require("selenium-webdriver");
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
  // Define locators and methods specific to the Login page
  constructor(driver) {
    super(driver);
    this.url = url.signUpUrl;
    this.loginUrl = url.loginUrl;
    this.firstName = By.id(signUpLocators.firstName);
    this.lastName = By.id(signUpLocators.lastName);
    this.username = By.id(signUpLocators.username);
    this.password = By.id(signUpLocators.password);
    this.confirm = By.id(signUpLocators.confirmPassword);
    this.btn = By.css(signUpLocators.signUpBtn);
  }

  async signUp() {
    await this.navigate(this.url);

    await this.sendKeys(this.firstName, validSignUp.firstName);
    await this.sendKeys(this.lastName, validSignUp.lastName);
    await this.sendKeys(this.username, validSignUp.username);
    await this.sendKeys(this.password, validSignUp.password);
    await this.sendKeys(this.confirm, validSignUp.confirmPassword);

    await this.clickBtn(this.btn);
    await this.waitForUrl(url.loginUrl);
  }

  async invalidSignUp() {
    await this.navigate(this.url);

    await this.sendKeys(this.firstName, invalidSignUp.firstName);
    await this.sendKeys(this.lastName, invalidSignUp.lastName);
    await this.sendKeys(this.username, invalidSignUp.username);
    await this.sendKeys(this.password, invalidSignUp.password);
    await this.sendKeys(this.confirm, invalidSignUp.confirmPassword);
  }
}

module.exports = SignUpPage;
