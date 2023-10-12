const { until } = require("selenium-webdriver");
const { expect } = require("chai");
const fs = require("fs");
const path = require('path');

// BasePage class for common Selenium WebDriver actions
class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  // Navigate to the specified URL
  async navigate(url) {
    await this.driver.get(url);
  }

  // Click a button located by a given locator with an optional timeout
  async clickBtn(locator, timeout = 10000) {
    await this.driver.wait(until.elementLocated(locator), timeout).click();
  }

  // Wait for an element to become visible, specified by a locator with an optional timeout
  async waitForElementVisible(locator, timeout = 2000) {
    await this.driver.wait(
      until.elementIsVisible(this.driver.findElement(locator)),
      timeout
    );
  }

  // Find an element specified by a locator
  async findElement(locator) {
    await this.driver.findElement(locator);
  }

  // Compare the text of an element with the expected text
  async waitWithTimeout(checkFunction, timeout) {
    return new Promise((resolve, reject) => {
      const checkInterval = 100; // Time interval between checks
  
      const check = async () => {
        try {
          const result = await checkFunction();
          if (result) {
            resolve(result);
          } else if (timeout <= 0) {
            reject(new Error('Timeout'));
          } else {
            setTimeout(check, checkInterval);
            timeout -= checkInterval;
          }
        } catch (error) {
          reject(error);
        }
      };
  
      check();
    });
  }

  async expectTextToEqual(element, expectedText, timeout) {
    const checkFunction = async () => {
      const actualText = await element.getText();
      return {
        match: actualText === expectedText,
        actualText
      };
    };
  
    return this.waitWithTimeout(checkFunction, timeout)
      .then(() => {
        return;// Text matches, resolve the promise
      })
      .catch((error) => {
        // Handle the timeout or other errors
        if (error.message === 'Timeout') {
          throw (new Error(`Timeout: Text did not match "${expectedText}" within the specified time.`));
        } else {
          throw error;
        }
      });
  }

  // Wait for the URL to match a given URL with an optional timeout
  async waitForUrl(url, timeout = 10000) {
    await this.driver.wait(until.urlIs(url), timeout);
  }

  // Send a sequence of characters to an element specified by a locator
  async sendKeys(locator, characters) {
    await this.driver.findElement(locator).sendKeys(characters);
  }

  // Delete a bank account by clicking a delete button specified by a locator
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
  
   // Capture a screenshot and save it with a timestamp and a test title
  async takeScreenshot(testTitle, screenshotDir) {
    if (this.driver) {
      const timestamp = new Date().toISOString().replace(/[-T:.]/g, '_');
      const screenshot = await this.driver.takeScreenshot();
      const fileName = `Screenshot-${timestamp}_${testTitle}.png`;
      const filePath = path.join(screenshotDir, fileName);
      fs.writeFileSync(filePath, screenshot, "base64");
    }
  }
}

module.exports = BasePage;
