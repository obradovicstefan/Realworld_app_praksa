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

  // async waitExplicit(condition, timeout = 10000) {
  //   const wait = new WebDriverWait(this.driver, timeout);
  //   return await wait.until(condition);
  // }

  async waitForElementVisible(locator, timeout = 1000) {
    await this.driver.wait(
      until.elementIsVisible(this.driver.findElement(locator)),
      timeout
    );
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

  async assertElementDisplayed(element, message = "") {
    const isDisplayed = await element.isDisplayed();
    expect(isDisplayed, message).to.be.true;
  }
}

module.exports = BasePage;
