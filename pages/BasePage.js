const { Key, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require('path');

// BasePage class for common Selenium WebDriver actions
class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  // Navigate to the specified URL
  async navigate(url) {
    try {
      await this.driver.get(url);
    } catch (error) {
      // Handle any errors that occur during navigation
      throw new Error(`Error navigating to ${url}: ${error.message}`);
    }
  }

  // Click a button located by a given locator with an optional timeout
  async clickBtn(locator, timeout = 10000) {
    const clickFunction = async () => {
      const element = await this.driver.findElement(locator);
      await element.click();
      return true; // Click successful, resolve the promise
    };
  
    if (await clickFunction()) {
      return; // Click was successful immediately, resolve the promise
    }
  
    try {
      await this.waitWithTimeout(clickFunction, timeout);
    } catch (error) {
      // Handle the error when the click action fails or times out
      throw new Error(`Timeout: Unable to click the element located by ${locator} within the specified time.`);
    }
  }

  // Wait for an element to become visible, specified by a locator with an optional timeout
  async waitForElementVisible(locator, timeout = 2000) {
    const isVisibleFunction = async () => {
      const element = this.driver.findElement(locator);
      const isVisible = await element.isDisplayed();
      if (isVisible) {
        return true; // Element is visible, resolve the promise
      }
      return false;
    };
  
    if (await isVisibleFunction()) {
      return; // Element is visible immediately, resolve the promise
    }
  
    try {
      await this.waitWithTimeout(isVisibleFunction, timeout);
    } catch (error) {
      // Handle the error when the element doesn't become visible within the specified timeout
      throw new Error(`Timeout: Element located by ${locator} did not become visible within the specified time.`);
    }
  }

  // Find an element specified by a locator
  async findElement(locator) {
    try {
      const element = await this.driver.findElement(locator);
      return element;
    } catch (error) {
      // Handle any errors that occur when attempting to find the element
      throw new Error(`Element located by ${locator} not found: ${error.message}`);
    }
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
    const checkFunction = async () => {
      const currentUrl = await this.driver.getCurrentUrl();
      return currentUrl === url;
    };
  
    return this.waitWithTimeout(checkFunction, timeout)
      .then(() => {
        return; // URL matches, resolve the promise
      })
      .catch((error) => {
        // Handle the timeout or other errors
        if (error.message === 'Timeout') {
          throw new Error(`Timeout: URL did not match "${url}" within the specified time.`);
        } else {
          throw error;
        }
      });
  }

  async clearInputField(locator) {
    return new Promise(async (resolve, reject) => {
      try {
        const inputField = await this.driver.findElement(locator);
        await inputField.sendKeys(Key.chord(Key.CONTROL, 'a')); // Select all text
        await inputField.sendKeys(Key.BACK_SPACE);  // Delete selected text
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Send a sequence of characters to an element specified by a locator
  async sendKeys(locator, characters) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.driver.findElement(locator).sendKeys(characters);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
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
