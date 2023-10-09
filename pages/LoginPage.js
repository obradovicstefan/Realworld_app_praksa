const { Builder, By, until, WebDriverWait } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const urldata = require("../config/urldata.json");
const credentials = require("../config/credentials.json");
const locators = require("../config/locators.json");

// Accessing test data
const validUser = credentials.validUser;
const invalidUser = credentials.invalidUser;
const url = urldata.urls;
const loginLocators = locators.login;

class LoginPage extends BasePage {
  // Define locators and methods specific to the Login page
  constructor(driver) {
    super(driver);
    this.url = url.loginUrl;
    this.baseUrl = url.baseUrl
    this.username = By.css(loginLocators.username);
    this.password = By.css(loginLocators.password);
    this.btn = By.css(loginLocators.submit);
    this.text = By.css(loginLocators.errorMessage);
  }

  async logIn() {
    await this.navigate(this.url);

    await this.sendKeys(this.username, validUser.username);
    await this.sendKeys(this.password, validUser.password);
    
    await this.clickBtn(this.btn);
    await this.waitForUrl(url.baseUrl);
  }

  async invalidLogIn() {
    await this.navigate(this.url);
   
    await this.sendKeys(this.username, invalidUser.username);
    await this.sendKeys(this.password, invalidUser.password);
  
    await this.clickBtn(this.btn);
  }  
}

module.exports = LoginPage;
