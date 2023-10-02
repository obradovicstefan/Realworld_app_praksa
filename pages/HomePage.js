const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = 'https://www.example.com';
    this.searchInput = { name: 'q' };
  }

  async performSearch(query) {
    const searchBox = await this.driver.findElement(this.searchInput);
    await searchBox.sendKeys(query, Key.RETURN);
  }
}

module.exports = HomePage;
