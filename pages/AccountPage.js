const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const urldata = require("../config/urldata.json");
const credentials = require("../config/credentials.json");
const locators = require("../config/locators.json");

const newAccount = credentials.newAccount;
const url = urldata.urls;
const createAccLocators = locators.createAccount;

class AccountPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = url.bankAcc;
    this.baseUrl = url.baseUrl;
    this.bankName = By.css(createAccLocators.bankName);
    this.accNumber = By.css(createAccLocators.accNumber);
    this.routNumber = By.css(createAccLocators.routingNum);
    this.bankAccBtn = By.css(createAccLocators.bankAccBtn);
    this.createBtn = By.css(createAccLocators.createBtn);
    this.saveBtn = By.css(createAccLocators.saveBtn);
    this.deleteBtn = By.css(createAccLocators.deleteBtn);
    this.ul = By.css(createAccLocators.ul);
  }

  async createAccount() {
    await this.clickBtn(this.bankAccBtn);
    await this.clickBtn(this.createBtn);

    const { bankName, accountNumber, routingNumber } = newAccount;

    await this.sendKeys(this.bankName, bankName);
    await this.sendKeys(this.accNumber, accountNumber);
    await this.sendKeys(this.routNumber, routingNumber);

    await this.clickBtn(this.saveBtn);
    await this.waitForUrl(url.bankAcc);
  }

  async deleteAccount() {
    await this.deleteBankAccount(this.deleteBtn);
  }
}
module.exports = AccountPage;
