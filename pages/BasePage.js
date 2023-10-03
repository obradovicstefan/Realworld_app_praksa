class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigate(url) {
    await this.driver.get(url);
  }
  async clickBtn(locator) {
    await this.driver.findElement(locator).click();
  }

  async sleep(s) {
    await this.driver.sleep(s);
  }

  async sendKeys(locator, characters) {
    await this.driver.findElement(locator).sendKeys(characters);
  }
}

module.exports = BasePage;
