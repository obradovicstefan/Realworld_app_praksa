const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const urldata = require("../config/urldata.json");
const credentials = require("../config/credentials.json");
const locators = require("../config/locators.json");

// Accessing test data
const newTransactions = credentials.transactionInputs;
const transactionLocators = locators.newTransaction;
const url = urldata.urls;

class TransactionPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.transactionUrl = url.makeTransactionUrl;
        this.amount = By.css(transactionLocators.amountInput);
        this.addNote = By.css(transactionLocators.noteInput);
        this.btnPay = By.css(transactionLocators.payBtn);
        this.reqBtn = By.css(transactionLocators.requestBtn);
        this.btnNew = By.css(transactionLocators.newBtn);
        this.userList = By.css(transactionLocators.paymentList);
        this.alertText = By.css(transactionLocators.snackbarText);
        this.return = By.css(transactionLocators.return);
    }

    // Creates a new transaction by filling out required fields and clicking pay
    async payTransaction() {
        await this.clickBtn(this.btnNew);
        await this.waitForUrl(this.transactionUrl);

        await this.clickBtn(this.userList);

        await this.sendKeys(this.amount, newTransactions.amount);
        await this.sendKeys(this.addNote, newTransactions.note);

        
        await this.clickBtn(this.btnPay);
    }

    async requestTransaction() {
        await this.clickBtn(this.return);
        
        await this.clickBtn(this.btnNew);
        await this.waitForUrl(this.transactionUrl)

        await this.clickBtn(this.userList);

        await this.sendKeys(this.amount, newTransactions.amount);
        await this.sendKeys(this.addNote, newTransactions.note);

        await this.clickBtn(this.reqBtn);
    }
}

module.exports = TransactionPage;