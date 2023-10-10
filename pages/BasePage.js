const { By, until, WebDriverWait } = require("selenium-webdriver");
const { expect } = require("chai");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigate(url) {
    await this.driver.get(url);
  }
  async clickBtn(locator, timeout = 10000) {
    await this.driver.wait(until.elementLocated(locator), timeout).click();
  }

  async waitForElementVisible(locator, timeout = 1000) {
    await this.driver.wait(
      until.elementIsVisible(this.driver.findElement(locator)),
      timeout
    );
  }

  async findElement(locator) {
    await this.driver.findElement(locator);
  }

  async expectTextToEqual(element, expectedText) {
    const actualText = await element.getText();
    expect(actualText).to.equal(expectedText);
  }

  async waitForUrl(url, timeout = 1000) {
    await this.driver.wait(until.urlIs(url), timeout);
  }

  async sendKeys(locator, characters) {
    await this.driver.findElement(locator).sendKeys(characters);
  }

  async deleteBankAccount(deleteBtnLocator) {
    const deleteButton = await this.driver.wait(
      until.elementLocated(deleteBtnLocator)
    );

    if (deleteButton) {
      await this.driver.wait(until.elementIsVisible(deleteButton));
      await this.driver.wait(until.elementIsEnabled(deleteButton));
      await deleteButton.click();
    }
  }
}

module.exports = BasePage;
